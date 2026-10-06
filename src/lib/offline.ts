/**
 * Small offline write queue. Mutations that matter while studying (sessions,
 * notes, task completion) are queued locally when the network fails and
 * replayed when it comes back.
 */

export type QueuedOp = { id: string; op: string; payload: unknown; at: number };

let owner = "signed-out";
const key = () => `opk.pending.v2.${owner}`;
export function setOfflineOwner(id: string) { owner = id; }
export type OperationHandler = (payload: unknown, operationId: string) => Promise<unknown>;
const handlers = new Map<string, OperationHandler>();
const listeners = new Set<(count: number) => void>();

export function registerOp(op: string, fn: OperationHandler) {
  handlers.set(op, fn);
}

function read(): QueuedOp[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(key()) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    const seen = new Set<string>();
    return parsed.filter((item): item is QueuedOp => {
      if (!item || typeof item !== "object") return false;
      const candidate = item as Partial<QueuedOp>;
      if (
        typeof candidate.id !== "string" ||
        typeof candidate.op !== "string" ||
        typeof candidate.at !== "number" ||
        !Number.isFinite(candidate.at) ||
        seen.has(candidate.id)
      ) return false;
      seen.add(candidate.id);
      return true;
    });
  } catch {
    return [];
  }
}

function write(items: QueuedOp[]) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(key(), JSON.stringify(items));
  listeners.forEach((l) => l(items.length));
}

export function pendingCount(): number {
  return read().length;
}

export function subscribePending(fn: (count: number) => void) {
  listeners.add(fn);
  fn(pendingCount());
  return () => listeners.delete(fn);
}

export function enqueue(op: string, payload: unknown, id = crypto.randomUUID()) {
  const items = read();
  if (items.some((item) => item.id === id)) return id;
  items.push({ id, op, payload, at: Date.now() });
  write(items);
  return id;
}

/** Run a write; if the network fails, keep it locally and sync later. */
export async function runOrQueue<T>(op: string, payload: unknown): Promise<T | "queued"> {
  const fn = handlers.get(op);
  if (!fn) throw new Error(`Tuntematon toiminto: ${op}`);
  const operationId = crypto.randomUUID();

  // When the browser already knows it is offline, do not start a request that
  // can sit in the networking stack until a timeout. Persist first so study
  // logging stays instant and survives a reload even during a hard outage.
  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    enqueue(op, payload, operationId);
    return "queued";
  }

  try {
    return (await fn(payload, operationId)) as T;
  } catch (err) {
    if (typeof navigator !== "undefined" && navigator.onLine === false) {
      enqueue(op, payload, operationId);
      return "queued";
    }
    const msg = err instanceof Error ? err.message : "";
    if (/fetch|network|Failed to fetch|NetworkError/i.test(msg)) {
      enqueue(op, payload, operationId);
      return "queued";
    }
    throw err;
  }
}

let flushing = false;

export type SyncResult = {
  synced: number;
  conflicts: number;
  discarded: number;
};

function isConflict(error: unknown) {
  return error instanceof Error && error.message.startsWith("SYNC_CONFLICT:");
}

export async function flushQueue(): Promise<SyncResult> {
  if (flushing) return { synced: 0, conflicts: 0, discarded: 0 };
  flushing = true;
  let synced = 0;
  let conflicts = 0;
  let discarded = 0;
  try {
    let items = read();
    for (const item of [...items]) {
      const fn = handlers.get(item.op);
      if (!fn) {
        items = read().filter((i) => i.id !== item.id);
        write(items);
        discarded += 1;
        continue;
      }
      try {
        await fn(item.payload, item.id);
        items = read().filter((i) => i.id !== item.id);
        write(items);
        synced += 1;
      } catch (error) {
        if (isConflict(error)) {
          items = read().filter((i) => i.id !== item.id);
          write(items);
          conflicts += 1;
          continue;
        }
        break;
      }
    }
  } finally {
    flushing = false;
  }
  return { synced, conflicts, discarded };
}

export function startSyncWatcher(onSynced: (result: SyncResult) => void) {
  if (typeof window === "undefined") return () => {};
  const handler = () => {
    void flushQueue().then((result) => {
      if (result.synced > 0 || result.conflicts > 0 || result.discarded > 0) onSynced(result);
    });
  };
  window.addEventListener("online", handler);
  const timer = window.setInterval(handler, 30000);
  handler();
  return () => {
    window.removeEventListener("online", handler);
    window.clearInterval(timer);
  };
}
