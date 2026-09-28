/**
 * Small offline write queue. Mutations that matter while studying (sessions,
 * notes, task completion) are queued locally when the network fails and
 * replayed when it comes back.
 */

export type QueuedOp = { id: string; op: string; payload: unknown; at: number };

let owner = "signed-out";
const key = () => `opk.pending.v2.${owner}`;
export function setOfflineOwner(id: string) { owner = id; }
const handlers = new Map<string, (payload: unknown) => Promise<unknown>>();
const listeners = new Set<(count: number) => void>();

export function registerOp(op: string, fn: (payload: unknown) => Promise<unknown>) {
  handlers.set(op, fn);
}

function read(): QueuedOp[] {
  if (typeof localStorage === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(key()) ?? "[]") as QueuedOp[];
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

export function enqueue(op: string, payload: unknown) {
  const items = read();
  items.push({ id: crypto.randomUUID(), op, payload, at: Date.now() });
  write(items);
}

/** Run a write; if the network fails, keep it locally and sync later. */
export async function runOrQueue<T>(op: string, payload: unknown): Promise<T | "queued"> {
  const fn = handlers.get(op);
  if (!fn) throw new Error(`Tuntematon toiminto: ${op}`);
  try {
    return (await fn(payload)) as T;
  } catch (err) {
    if (typeof navigator !== "undefined" && navigator.onLine === false) {
      enqueue(op, payload);
      return "queued";
    }
    const msg = err instanceof Error ? err.message : "";
    if (/fetch|network|Failed to fetch|NetworkError/i.test(msg)) {
      enqueue(op, payload);
      return "queued";
    }
    throw err;
  }
}

let flushing = false;

export async function flushQueue(): Promise<number> {
  if (flushing) return 0;
  flushing = true;
  let done = 0;
  try {
    let items = read();
    for (const item of [...items]) {
      const fn = handlers.get(item.op);
      if (!fn) continue;
      try {
        await fn(item.payload);
        items = read().filter((i) => i.id !== item.id);
        write(items);
        done += 1;
      } catch {
        break;
      }
    }
  } finally {
    flushing = false;
  }
  return done;
}

export function startSyncWatcher(onSynced: (count: number) => void) {
  if (typeof window === "undefined") return () => {};
  const handler = () => {
    void flushQueue().then((n) => n > 0 && onSynced(n));
  };
  window.addEventListener("online", handler);
  const timer = window.setInterval(handler, 30000);
  handler();
  return () => {
    window.removeEventListener("online", handler);
    window.clearInterval(timer);
  };
}
