import test from "node:test";
import assert from "node:assert/strict";
import {
  pendingCount,
  registerOp,
  runOrQueue,
  setOfflineOwner,
} from "../src/lib/offline.ts";

test("known-offline writes are persisted before any network handler runs", async () => {
  const originalNavigator = Object.getOwnPropertyDescriptor(globalThis, "navigator");
  const originalStorage = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  const values = new Map<string, string>();

  Object.defineProperty(globalThis, "navigator", {
    configurable: true,
    value: { onLine: false },
  });
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      getItem(key: string) {
        return values.get(key) ?? null;
      },
      setItem(key: string, value: string) {
        values.set(key, value);
      },
      removeItem(key: string) {
        values.delete(key);
      },
      clear() {
        values.clear();
      },
      key(index: number) {
        return [...values.keys()][index] ?? null;
      },
      get length() {
        return values.size;
      },
    },
  });

  try {
    setOfflineOwner("offline-fast-path-test");
    let handlerCalls = 0;
    registerOp("offline-fast-path-test", async () => {
      handlerCalls += 1;
      return "unexpected-network-result";
    });

    const result = await runOrQueue("offline-fast-path-test", { note: "study log" });

    assert.equal(result, "queued");
    assert.equal(handlerCalls, 0);
    assert.equal(pendingCount(), 1);
  } finally {
    if (originalNavigator) Object.defineProperty(globalThis, "navigator", originalNavigator);
    else Reflect.deleteProperty(globalThis, "navigator");
    if (originalStorage) Object.defineProperty(globalThis, "localStorage", originalStorage);
    else Reflect.deleteProperty(globalThis, "localStorage");
  }
});
