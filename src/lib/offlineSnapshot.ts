import { getDeviceOwnerId } from "@/lib/deviceSession";

const DB_NAME = "opintopaivakirja-offline";
const DB_VERSION = 1;
const STORE_NAME = "snapshots";

type SnapshotRecord = {
  key: string;
  ownerId: string;
  name: string;
  savedAt: number;
  value: unknown;
};

function ownerId() {
  return getDeviceOwnerId() ?? "signed-out";
}

function snapshotKey(name: string) {
  return ownerId() + ":" + name;
}

function openDb(): Promise<IDBDatabase | null> {
  if (typeof indexedDB === "undefined") return Promise.resolve(null);

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "key" });
        store.createIndex("ownerId", "ownerId", { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Offline-tietokantaa ei voitu avata."));
  });
}

export async function readOfflineSnapshot<T>(name: string): Promise<T | undefined> {
  const db = await openDb().catch(() => null);
  if (!db) return undefined;

  return new Promise((resolve) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const request = transaction.objectStore(STORE_NAME).get(snapshotKey(name));
    request.onsuccess = () => {
      const record = request.result as SnapshotRecord | undefined;
      resolve(record?.value as T | undefined);
    };
    request.onerror = () => resolve(undefined);
    transaction.oncomplete = () => db.close();
    transaction.onerror = () => db.close();
  });
}

export async function writeOfflineSnapshot<T>(name: string, value: T): Promise<void> {
  const db = await openDb().catch(() => null);
  if (!db) return;

  await new Promise<void>((resolve) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    transaction.objectStore(STORE_NAME).put({
      key: snapshotKey(name),
      ownerId: ownerId(),
      name,
      savedAt: Date.now(),
      value,
    } satisfies SnapshotRecord);
    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => {
      db.close();
      resolve();
    };
    transaction.onabort = () => {
      db.close();
      resolve();
    };
  });
}

function isNetworkFailure(error: unknown) {
  if (typeof navigator !== "undefined" && navigator.onLine === false) return true;
  const message = error instanceof Error ? error.message : String(error ?? "");
  return /fetch|network|failed to fetch|networkerror|load failed/i.test(message);
}

/**
 * Preserve the last successful server response for cold offline starts.
 * Permission, validation and server-side application errors still propagate:
 * stale local data must never hide an authorization or integrity failure.
 */
export async function withOfflineSnapshot<T>(
  name: string,
  load: () => Promise<T>,
): Promise<T> {
  try {
    const value = await load();
    void writeOfflineSnapshot(name, value);
    return value;
  } catch (error) {
    if (isNetworkFailure(error)) {
      const cached = await readOfflineSnapshot<T>(name);
      if (cached !== undefined) return cached;
    }
    throw error;
  }
}

export async function clearOfflineSnapshots(): Promise<void> {
  const db = await openDb().catch(() => null);
  if (!db) return;
  const owner = ownerId();

  await new Promise<void>((resolve) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index("ownerId");
    const request = index.openKeyCursor(IDBKeyRange.only(owner));
    request.onsuccess = () => {
      const cursor = request.result;
      if (!cursor) return;
      store.delete(cursor.primaryKey);
      cursor.continue();
    };
    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => {
      db.close();
      resolve();
    };
    transaction.onabort = () => {
      db.close();
      resolve();
    };
  });
}
