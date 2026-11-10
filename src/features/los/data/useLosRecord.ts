import { useCallback, useEffect, useRef, useState, type SetStateAction } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getDeviceOwnerId } from "@/lib/deviceSession";
import { registerOp, runOrQueue } from "@/lib/offline";
import type { BookId } from "../model";

/** Published source content never enters this user-state table. */
export type LosRecordKind = "lesson" | "exercise" | "marks" | "notes" | "bookmark" | "preferences" | "review" | "skill";
export type LosSyncStatus = "loading" | "empty" | "local" | "queued" | "synced" | "conflict" | "error";
type Stored<T> = { value: T; clientUpdatedAt: string };
export type LosWrite = {
  recordKey: string; bookId: BookId; kind: LosRecordKind;
  contentVersion: string; payload: { value: unknown }; clientUpdatedAt: string;
};
export type RemoteRecord<T> = { payload: { value: T }; client_updated_at: string; server_updated_at: string };

// The SQL schema is part of this PR. The generated Supabase Database type will be
// regenerated after migration; the boundary is typed here until then.
const losDb = supabase as unknown as {
  from: (table: string) => {
    select: (columns: string) => {
      eq: (column: string, value: string) => {
        eq: (column: string, value: string) => {
          maybeSingle: () => Promise<{ data: unknown; error: { message: string } | null }>;
        };
      };
    };
  };
  rpc: (fn: string, args: Record<string, unknown>) => Promise<{ data: boolean | null; error: { message: string; code?: string } | null }>;
};

const operation = "los-save-record-v1";
let registered = false;
export function registerLosOperations() {
  if (registered) return;
  registerOp(operation, async (raw) => {
    const input = raw as LosWrite;
    const { data, error } = await losDb.rpc("los_save_record", {
      p_record_key: input.recordKey,
      p_book_id: input.bookId,
      p_kind: input.kind,
      p_content_version: input.contentVersion,
      p_payload: input.payload,
      p_client_updated_at: input.clientUpdatedAt,
    });
    if (error) throw new Error(error.message);
    if (!data) throw new Error("SYNC_CONFLICT: palvelimella on uudempi LOS!-tallenne");
    return true;
  });
  registered = true;
}
function recordKey(bookId: BookId, kind: LosRecordKind, id: string, version: string) {
  return [bookId, kind, id, version].join(":");
}
function localKey(key: string) {
  const owner = getDeviceOwnerId();
  return owner ? "opk:los:v2:" + owner + ":" + key : null;
}
function readCached<T>(key: string): Stored<T> | null {
  try {
    const k = localKey(key);
    if (!k) return null;
    const parsed: unknown = JSON.parse(localStorage.getItem(k) ?? "null");
    if (parsed && typeof parsed === "object" && "value" in parsed && "clientUpdatedAt" in parsed
      && typeof parsed.clientUpdatedAt === "string") return parsed as Stored<T>;
    return null;
  } catch { return null; }
}
function writeCached<T>(key: string, item: Stored<T>) {
  try {
    const k = localKey(key);
    if (!k) return false;
    localStorage.setItem(k, JSON.stringify(item));
    return true;
  } catch { return false; }
}
async function readRemote<T>(key: string): Promise<RemoteRecord<T> | null> {
  const owner = getDeviceOwnerId();
  if (!owner) throw new Error("Laitetunniste puuttuu");
  const { data, error } = await losDb.from("los_user_records")
    .select("payload,client_updated_at,server_updated_at")
    .eq("owner_id", owner)
    .eq("record_key", key)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data as RemoteRecord<T> | null;
}
async function send<T>(bookId: BookId, kind: LosRecordKind, key: string, version: string, item: Stored<T>) {
  registerLosOperations();
  return runOrQueue<boolean>(operation, {
    recordKey: key, bookId, kind, contentVersion: version,
    payload: { value: item.value }, clientUpdatedAt: item.clientUpdatedAt,
  } satisfies LosWrite);
}
export function useLosRecord<T>(
  bookId: BookId, kind: LosRecordKind, id: string, version: string, fallback: T,
) {
  const key = recordKey(bookId, kind, id, version);
  const [value, setValue] = useState<T>(fallback);
  const [status, setStatus] = useState<LosSyncStatus>("loading");
  const current = useRef(value);
  const latestWrite = useRef("");
  const edited = useRef(false);

  useEffect(() => {
    let alive = true;
    edited.current = false;
    const cached = readCached<T>(key);
    if (cached) {
      current.current = cached.value;
      setValue(cached.value);
      setStatus("local");
    } else {
      setStatus("loading");
    }
    void readRemote<T>(key).then((remote) => {
      if (!alive || edited.current) return;
      if (remote && (!cached || remote.client_updated_at >= cached.clientUpdatedAt)) {
        current.current = remote.payload.value;
        setValue(remote.payload.value);
        writeCached(key, { value: remote.payload.value, clientUpdatedAt: remote.client_updated_at });
        setStatus("synced");
      } else if (cached) {
        setStatus("queued");
        void send(bookId, kind, key, version, cached).then((result) => {
          if (alive && !edited.current) setStatus(result === "queued" ? "queued" : "synced");
        }).catch(error => { if (alive && !edited.current) setStatus(String(error).includes("SYNC_CONFLICT") ? "conflict" : "error"); });
      } else setStatus("empty");
    }).catch(() => {
      if (alive && !edited.current) setStatus(cached ? "local" : "error");
    });
    return () => { alive = false; };
  }, [bookId, kind, key, version]);

  const update = useCallback((next: SetStateAction<T>) => {
    const newValue = typeof next === "function"
      ? (next as (previous: T) => T)(current.current) : next;
    // Date.now() can repeat during rapid typing. Strictly increasing client
    // timestamps prevent an older queued autosave from racing the latest one.
    const previousTime = Date.parse(latestWrite.current);
    const stamp = new Date(Math.max(Date.now(), Number.isFinite(previousTime) ? previousTime + 1 : 0)).toISOString();
    const item: Stored<T> = { value: newValue, clientUpdatedAt: stamp };
    latestWrite.current = item.clientUpdatedAt;
    edited.current = true;
    current.current = newValue;
    setValue(newValue);
    const persisted = writeCached(key, item);
    setStatus(persisted ? "queued" : "error");
    // runOrQueue writes the durable existing StudyOS queue before dispatching
    // any network request. A page close cannot erase the pending operation.
    void send(bookId, kind, key, version, item).then(result => {
      if (latestWrite.current !== item.clientUpdatedAt) return;
      setStatus(result === "queued" ? "queued" : "synced");
    }).catch(error => {
      if (latestWrite.current !== item.clientUpdatedAt) return;
      setStatus(String(error).includes("SYNC_CONFLICT") ? "conflict" : "error");
    });
  }, [bookId, kind, key, version]);

  return { value, update, status };
}
export function losSyncMessage(status: LosSyncStatus): string {
  switch (status) {
    case "loading": return "Haetaan tallenteita…";
    case "synced": return "Tallennus vahvistettu pilvessä";
    case "queued": return "Tallennettu laitteelle · synkronoidaan";
    case "local": return "Paikallinen luonnos · yhteys tarkistamatta";
    case "conflict": return "Uudempi tallenne löytyi toiselta laitteelta · paikallinen luonnos säilytetty";
    case "error": return "Tallennusta ei voitu vahvistaa · tarkista yhteys";
    case "empty": return "Ei tallennettuja merkintöjä";
  }
}
