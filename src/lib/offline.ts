import { onlineManager } from "@tanstack/react-query";
import { getDeviceOwnerId } from "./deviceSession.ts";

/**
 * Small offline write queue. Mutations that matter while studying (sessions,
 * notes, task completion) are queued locally when the network fails and
 * replayed when it comes back.
 */

export type QueuedOp = { id: string; op: string; payload: unknown; at: number };

type QueueChangeDetail = {
  storageKey: string;
  count: number;
};

const OFFLINE_QUEUE_EVENT = "opk:offline-queue-change";

let owner = "signed-out";
const currentOwner = () => getDeviceOwnerId() ?? owner;
const key = () => `opk.pending.v2.${currentOwner()}`;
export function setOfflineOwner(id: string) { owner = id; }
export type OperationHandler = (payload: unknown, operationId: string) => Promise<unknown>;
const handlers = new Map<string, OperationHandler>();
const listeners = new Set<(count: number) => void>();
const inFlightOperationIds = new Set<string>();

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
  const storageKey = key();
  localStorage.setItem(storageKey, JSON.stringify(items));
  listeners.forEach((l) => l(items.length));

  // StudyApp and mutation hooks can live in different lazy chunks. Browser
  // events provide a bundle-independent same-tab signal, while the storage
  // event below handles other tabs/windows. The queue badge must update as
  // soon as durable local persistence succeeds, even if the network request
  // itself is still hanging during an online -> offline transition.
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent<QueueChangeDetail>(OFFLINE_QUEUE_EVENT, {
      detail: { storageKey, count: items.length },
    }));
  }
}

function removeQueued(id: string) {
  const items = read();
  if (!items.some((item) => item.id === id)) return;
  write(items.filter((item) => item.id !== id));
}

export function pendingCount(): number {
  return read().length;
}

export function subscribePending(fn: (count: number) => void) {
  listeners.add(fn);

  const onQueueChange = (event: Event) => {
    const detail = (event as CustomEvent<QueueChangeDetail>).detail;
    if (detail?.storageKey === key()) fn(pendingCount());
  };
  const onStorage = (event: StorageEvent) => {
    if (event.key === key()) fn(pendingCount());
  };

  if (typeof window !== "undefined") {
    window.addEventListener(OFFLINE_QUEUE_EVENT, onQueueChange);
    window.addEventListener("storage", onStorage);
  }

  fn(pendingCount());
  return () => {
    listeners.delete(fn);
    if (typeof window !== "undefined") {
      window.removeEventListener(OFFLINE_QUEUE_EVENT, onQueueChange);
      window.removeEventListener("storage", onStorage);
    }
  };
}

export function enqueue(op: string, payload: unknown, id = crypto.randomUUID()) {
  const items = read();
  if (items.some((item) => item.id === id)) return id;
  items.push({ id, op, payload, at: Date.now() });
  write(items);
  return id;
}

function markQueryLayerOffline() {
  // Browser automation and some OS network transitions can update
  // navigator.onLine before the normal `offline` event reaches TanStack Query.
  // Keep the query layer in the same state before queued mutations resolve so
  // mutation success handlers cannot immediately refetch every active query
  // into an offline loading state.
  onlineManager.setOnline(false);
}

function errorText(error: unknown) {
  if (error instanceof Error) return `${error.name}: ${error.message}`;
  if (typeof error === "string") return error;
  if (!error || typeof error !== "object") return "";

  const record = error as Record<string, unknown>;
  return [record["name"], record["message"], record["details"], record["hint"], record["code"]]
    .filter((value): value is string => typeof value === "string")
    .join(" ");
}

function isNetworkFailure(error: unknown) {
  return /failed to fetch|fetch failed|network|networkerror|load failed|offline|internet|err_network|connection/i.test(
    errorText(error),
  );
}

/**
 * Run an offline-capable write using a local write-ahead queue.
 *
 * Persisting before network dispatch closes a small but real transition race:
 * a browser can lose connectivity between a click and the moment
 * navigator.onLine / TanStack's online manager reflects it. If the process,
 * tab or device disappears after the server request starts, the same operation
 * id can be replayed safely by the existing idempotent handlers.
 */
export async function runOrQueue<T>(op: string, payload: unknown): Promise<T | "queued"> {
  const fn = handlers.get(op);
  if (!fn) throw new Error(`Tuntematon toiminto: ${op}`);
  const operationId = crypto.randomUUID();

  // Durable first, network second. This is intentionally a write-ahead log:
  // successful online writes remove themselves immediately, while interrupted
  // writes remain available after a reload.
  inFlightOperationIds.add(operationId);
  enqueue(op, payload, operationId);

  if (
    (typeof navigator !== "undefined" && navigator.onLine === false) ||
    !onlineManager.isOnline()
  ) {
    markQueryLayerOffline();
    inFlightOperationIds.delete(operationId);
    return "queued";
  }

  try {
    const result = (await fn(payload, operationId)) as T;
    removeQueued(operationId);
    return result;
  } catch (err) {
    // Let browser/network state notifications settle before classifying a
    // failure that happened at the exact online -> offline boundary.
    await Promise.resolve();
    if (
      (typeof navigator !== "undefined" && navigator.onLine === false) ||
      !onlineManager.isOnline() ||
      isNetworkFailure(err)
    ) {
      markQueryLayerOffline();
      return "queued";
    }

    // Validation/authorization/domain failures are not useful to retry forever.
    // Remove the speculative write-ahead entry and surface the real error.
    removeQueued(operationId);
    throw err;
  } finally {
    inFlightOperationIds.delete(operationId);
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
      // A foreground write is already dispatching this exact operation id.
      // Its write-ahead entry only exists for crash/reload durability, so the
      // background flusher must not race it with a duplicate request.
      if (inFlightOperationIds.has(item.id)) continue;

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
        // Keep transient failures in the queue. The watcher below retries with
        // bounded backoff, which matters after an offline reload because the
        // device access token can be renewing at the same moment connectivity
        // returns.
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

  let stopped = false;
  let retryTimer: number | null = null;
  let retryDelayMs = 1_000;

  const clearRetry = () => {
    if (retryTimer === null) return;
    window.clearTimeout(retryTimer);
    retryTimer = null;
  };

  const scheduleRetry = () => {
    if (
      stopped ||
      retryTimer !== null ||
      pendingCount() === 0 ||
      (typeof navigator !== "undefined" && navigator.onLine === false)
    ) return;

    const delay = retryDelayMs;
    retryDelayMs = Math.min(retryDelayMs * 2, 30_000);
    retryTimer = window.setTimeout(() => {
      retryTimer = null;
      syncNow();
    }, delay);
  };

  const syncNow = () => {
    if (stopped) return;
    if (typeof navigator !== "undefined" && navigator.onLine === false) {
      onlineManager.setOnline(false);
      clearRetry();
      return;
    }

    onlineManager.setOnline(true);
    void flushQueue().then((result) => {
      if (stopped) return;
      if (result.synced > 0 || result.conflicts > 0 || result.discarded > 0) onSynced(result);

      if (pendingCount() === 0) {
        retryDelayMs = 1_000;
        clearRetry();
        return;
      }

      // An online event can race device-session renewal after an offline reload.
      // Do not make the user wait for a second online event or a 30 s polling
      // interval before their saved work reaches the server.
      scheduleRetry();
    });
  };

  const handler = () => syncNow();
  window.addEventListener("online", handler);
  window.addEventListener("offline", handler);
  const timer = window.setInterval(syncNow, 30_000);
  syncNow();

  return () => {
    stopped = true;
    clearRetry();
    window.removeEventListener("online", handler);
    window.removeEventListener("offline", handler);
    window.clearInterval(timer);
  };
}
