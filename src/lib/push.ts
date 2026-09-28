import { supabase } from "@/integrations/supabase/client";

function base64ToUint8Array(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function authToken() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  const token = data.session?.access_token;
  if (!token) throw new Error("Kirjautunut istunto puuttuu.");
  return token;
}

export function pushSupported() {
  return (
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    "Notification" in window
  );
}

export async function currentPushSubscription() {
  if (!pushSupported()) return null;
  const registration =
    (await navigator.serviceWorker.getRegistration("/")) ??
    (await navigator.serviceWorker.register("/sw.js", { scope: "/" }));
  await navigator.serviceWorker.ready;
  return registration.pushManager.getSubscription();
}

export async function enableBackgroundPush() {
  if (!pushSupported()) {
    throw new Error("Tämä selain ei tue taustailmoituksia.");
  }

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error("Ilmoituslupaa ei annettu.");
  }

  const registration =
    (await navigator.serviceWorker.getRegistration("/")) ??
    (await navigator.serviceWorker.register("/sw.js", { scope: "/" }));
  await navigator.serviceWorker.ready;

  const keyResponse = await fetch("/api/push/public-key");
  const keyPayload = (await keyResponse.json()) as { publicKey?: string; error?: string };
  if (!keyResponse.ok || !keyPayload.publicKey) {
    throw new Error(keyPayload.error ?? "Push-avainta ei saatu.");
  }

  let subscription = await registration.pushManager.getSubscription();
  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64ToUint8Array(keyPayload.publicKey),
    });
  }

  const response = await fetch("/api/push/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await authToken()}`,
    },
    body: JSON.stringify({ subscription: subscription.toJSON() }),
  });
  const payload = (await response.json().catch(() => ({}))) as { error?: string };
  if (!response.ok) {
    throw new Error(payload.error ?? "Push-tilauksen tallennus epäonnistui.");
  }

  return subscription;
}

export async function disableBackgroundPush() {
  if (!pushSupported()) return;

  const registration = await navigator.serviceWorker.getRegistration("/");
  const subscription = await registration?.pushManager.getSubscription();

  const response = await fetch("/api/push/unsubscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await authToken()}`,
    },
    body: JSON.stringify({ endpoint: subscription?.endpoint ?? null }),
  });
  const payload = (await response.json().catch(() => ({}))) as { error?: string };
  if (!response.ok) {
    throw new Error(payload.error ?? "Push-tilauksen poisto epäonnistui.");
  }

  if (subscription) await subscription.unsubscribe();
}

export async function pushIsEnabledOnDevice() {
  if (!pushSupported() || Notification.permission !== "granted") return false;
  return !!(await currentPushSubscription());
}
