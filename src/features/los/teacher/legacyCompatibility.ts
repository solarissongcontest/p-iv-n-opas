/**
 * Read-only compatibility with the alternate L004 pilot (#218).
 * This is NOT a second teaching engine. Old records remain in
 * lessonProgress.L004.teacher, as evidence of a historical activity only.
 * Never map historical answers into new independent skill evidence.
 */
export type LegacyTeacherProgress = {
  version: "2.0.0";
  scene: string;
  visited: string[];
  hints: string[];
  answers: Record<string, {
    answer: string; count: number; correct: boolean;
    independent: boolean; revealed: boolean; at: string;
  }>;
  paused: boolean;
  completedAt?: string | null;
};
const object = (v: unknown): v is Record<string,unknown> =>
  v !== null && typeof v === "object" && !Array.isArray(v);
const id = (v: unknown): v is string =>
  typeof v === "string" && /^[a-z0-9-]{1,48}$/i.test(v);
const ids = (v: unknown): v is string[] =>
  Array.isArray(v) && v.length <= 25 && v.every(id) && new Set(v).size === v.length;
const iso = (v: unknown): v is string =>
  typeof v === "string" && v.length <= 40 &&
  /^\d{4}-\d{2}-\d{2}T/.test(v) && Number.isFinite(Date.parse(v));
export function validLegacyTeacherProgress(v: unknown): v is LegacyTeacherProgress {
  if (!object(v) || v['version'] !== "2.0.0" || !id(v['scene']) ||
      !ids(v['visited']) || !ids(v['hints']) || typeof v['paused'] !== "boolean" ||
      !object(v['answers']) || Object.keys(v['answers']).length > 20 ||
      (v['completedAt'] !== undefined && v['completedAt'] !== null && !iso(v['completedAt']))) return false;
  return Object.entries(v['answers']).every(([key, a]) =>
    id(key) && object(a) && typeof a['answer'] === "string" && a['answer'].length <= 40 &&
    Number.isInteger(a['count']) && Number(a['count']) >= 0 && Number(a['count']) <= 10 &&
    typeof a['correct'] === "boolean" && typeof a['independent'] === "boolean" &&
    typeof a['revealed'] === "boolean" && iso(a['at']));
}
