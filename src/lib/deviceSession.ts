export type DeviceUser = { id: string };

export const DEVICE_AUTH_KEY = "opk.device-authorized";
export const DEVICE_OWNER_KEY = "opk.owner-id";
export const DEVICE_TOKEN_KEY = "opk.device-token";
export const DEVICE_TOKEN_EXPIRES_KEY = "opk.device-token-expires";

export function storeDeviceSession(input: {
  accessToken: string;
  userId: string;
  expiresAt: number;
}) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(DEVICE_AUTH_KEY, "Arthur");
  localStorage.setItem(DEVICE_OWNER_KEY, input.userId);
  localStorage.setItem(DEVICE_TOKEN_KEY, input.accessToken);
  localStorage.setItem(DEVICE_TOKEN_EXPIRES_KEY, String(input.expiresAt));
}

export function clearDeviceSession() {
  if (typeof localStorage === "undefined") return;
  localStorage.removeItem(DEVICE_AUTH_KEY);
  localStorage.removeItem(DEVICE_OWNER_KEY);
  localStorage.removeItem(DEVICE_TOKEN_KEY);
  localStorage.removeItem(DEVICE_TOKEN_EXPIRES_KEY);
}

export function getDeviceAccessToken() {
  if (typeof localStorage === "undefined") return null;
  const token = localStorage.getItem(DEVICE_TOKEN_KEY);
  const expiresAt = Number(localStorage.getItem(DEVICE_TOKEN_EXPIRES_KEY) ?? "0");
  if (!token || !Number.isFinite(expiresAt) || expiresAt <= Date.now() + 30_000) return null;
  return token;
}

export function getDeviceOwnerId() {
  if (typeof localStorage === "undefined") return null;
  return localStorage.getItem(DEVICE_OWNER_KEY);
}

export function readCachedDeviceUser(): DeviceUser | null {
  if (typeof localStorage === "undefined") return null;
  if (!isTrustedArthurDevice()) return null;
  const userId = localStorage.getItem(DEVICE_OWNER_KEY);
  return userId ? { id: userId } : null;
}

export function requireDeviceOwnerId() {
  const id = getDeviceOwnerId();
  if (!id) throw new Error("Arthur-laitetunnistus puuttuu.");
  return id;
}

export function readDeviceSession(): { user: DeviceUser; accessToken: string; expiresAt: number } | null {
  const accessToken = getDeviceAccessToken();
  const userId = getDeviceOwnerId();
  const expiresAt =
    typeof localStorage === "undefined"
      ? 0
      : Number(localStorage.getItem(DEVICE_TOKEN_EXPIRES_KEY) ?? "0");
  if (!accessToken || !userId || !expiresAt) return null;
  return { user: { id: userId }, accessToken, expiresAt };
}

export function isTrustedArthurDevice() {
  return typeof localStorage !== "undefined" && localStorage.getItem(DEVICE_AUTH_KEY) === "Arthur";
}
