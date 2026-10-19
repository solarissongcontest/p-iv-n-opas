import test from "node:test";
import assert from "node:assert/strict";
import { onlineManager } from "@tanstack/react-query";
import {
  pendingCount,
  registerOp,
  runOrQueue,
  setOfflineOwner,
} from "../src/lib/offline.ts";

function memoryStorage(values: Map<string, string>) {
  return {
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
  };
}

test("known-offline writes are persisted before any network handler runs", async () => {
  const originalNavigator = Object.getOwnPropertyDescriptor(globalThis, "navigator");
  const originalStorage = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  const originalOnlineState = onlineManager.isOnline();
  const values = new Map<string, string>();

  Object.defineProperty(globalThis, "navigator", {
    configurable: true,
    value: { onLine: false },
  });
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: memoryStorage(values),
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
    assert.equal(
      onlineManager.isOnline(),
      false,
      "queued offline writes must pause TanStack Query before mutation success invalidations run",
    );
  } finally {
    onlineManager.setOnline(originalOnlineState);
    if (originalNavigator) Object.defineProperty(globalThis, "navigator", originalNavigator);
    else Reflect.deleteProperty(globalThis, "navigator");
    if (originalStorage) Object.defineProperty(globalThis, "localStorage", originalStorage);
    else Reflect.deleteProperty(globalThis, "localStorage");
  }
});

test("a write returns queued when connectivity drops just after dispatch starts", async () => {
  const originalNavigator = Object.getOwnPropertyDescriptor(globalThis, "navigator");
  const originalStorage = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  const originalOnlineState = onlineManager.isOnline();
  const values = new Map<string, string>();
  const navigatorState = { onLine: true };

  Object.defineProperty(globalThis, "navigator", {
    configurable: true,
    value: navigatorState,
  });
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: memoryStorage(values),
  });
  onlineManager.setOnline(true);

  try {
    setOfflineOwner("offline-transition-test");
    let handlerCalls = 0;
    registerOp("offline-transition-test", async () => {
      handlerCalls += 1;
      await new Promise((resolve) => setTimeout(resolve, 220));
      throw new Error("Failed to fetch");
    });

    const startedAt = Date.now();
    const pendingResult = runOrQueue("offline-transition-test", { note: "study log" });
    setTimeout(() => {
      navigatorState.onLine = false;
    }, 25);

    const result = await pendingResult;

    assert.equal(result, "queued");
    assert.equal(handlerCalls, 1, "the request may already have started before offline state settles");
    assert.equal(pendingCount(), 1, "the write-ahead entry must remain durable for later replay");
    assert.ok(
      Date.now() - startedAt < 180,
      "the UI must not wait for the network request timeout once the browser reports offline",
    );

    // Let the detached transport failure settle so the test restores globals
    // only after runOrQueue has finished observing the in-flight request.
    await new Promise((resolve) => setTimeout(resolve, 240));
    assert.equal(pendingCount(), 1);
  } finally {
    onlineManager.setOnline(originalOnlineState);
    if (originalNavigator) Object.defineProperty(globalThis, "navigator", originalNavigator);
    else Reflect.deleteProperty(globalThis, "navigator");
    if (originalStorage) Object.defineProperty(globalThis, "localStorage", originalStorage);
    else Reflect.deleteProperty(globalThis, "localStorage");
  }
});
