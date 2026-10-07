import { ensureKe04ForCurrentUser as ensureKe04Base } from "./data-base";
import { ensureMaa06aForCurrentUser } from "./maa06a-data";

export * from "./data-base";
export * from "./maa06a-data";

/**
 * App bootstrap kept under the legacy export name so existing call sites do
 * not need to know which canonical courses are provisioned. KE04 remains the
 * first course and MAA06A is repaired immediately afterwards.
 */
export async function ensureKe04ForCurrentUser(): Promise<string> {
  const ke04Id = await ensureKe04Base();
  await ensureMaa06aForCurrentUser();
  return ke04Id;
}
