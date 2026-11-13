/**
 * Read-only compatibility with alternate L004 (#218) and L005 (#232) pilots.
 * This is NOT a second teaching engine. Old records remain in
 * lessonProgress.L004/L005.teacher as historical activity only.
 * Never map historical answers into new independent skill evidence.
 */
export type LegacyTeacherMediaActivity = {
  sourceId: string;
  playingAt?: string;
  endedAt?: string;
  textOpenedAt?: string;
};
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
  /** Later #218 and #232 records: retained verbatim, never graded by this engine. */
  helpSelections?: Record<string,string>;
  writtenDrafts?: Record<string,string>;
  completedContentRevision?: string;
  completedRevisionAt?: string;
  media?: LegacyTeacherMediaActivity;
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
const optionalIdMap = (v: unknown): boolean =>
  v === undefined || (object(v) && Object.keys(v).length <= 20 &&
    Object.entries(v).every(([key,value]) => id(key) && id(value)));
const optionalWrittenDrafts = (v: unknown): boolean =>
  v === undefined || (object(v) && Object.keys(v).length <= 20 &&
    Object.entries(v).every(([key,value]) =>
      id(key) && typeof value === "string" && value.length <= 40));
const optionalMedia = (v: unknown): boolean =>
  v === undefined || (object(v) && id(v["sourceId"]) &&
    (v["playingAt"] === undefined || iso(v["playingAt"])) &&
    (v["endedAt"] === undefined || iso(v["endedAt"])) &&
    (v["textOpenedAt"] === undefined || iso(v["textOpenedAt"])) &&
    (v["endedAt"] === undefined || v["playingAt"] !== undefined));
export function validLegacyTeacherProgress(v: unknown): v is LegacyTeacherProgress {
  if (!object(v) || v['version'] !== "2.0.0" || !id(v['scene']) ||
      !ids(v['visited']) || !ids(v['hints']) || typeof v['paused'] !== "boolean" ||
      !object(v['answers']) || Object.keys(v['answers']).length > 20 ||
      (v['completedAt'] !== undefined && v['completedAt'] !== null && !iso(v['completedAt'])) ||
      !optionalIdMap(v['helpSelections']) || !optionalWrittenDrafts(v['writtenDrafts']) ||
      !optionalMedia(v['media']) ||
      (v['completedContentRevision'] !== undefined && !id(v['completedContentRevision'])) ||
      (v['completedRevisionAt'] !== undefined && !iso(v['completedRevisionAt'])) ||
      ((v['completedContentRevision'] === undefined) !== (v['completedRevisionAt'] === undefined)) ||
      (v['completedContentRevision'] !== undefined && !iso(v['completedAt']))) return false;
  return Object.entries(v['answers']).every(([key, a]) =>
    id(key) && object(a) && typeof a['answer'] === "string" && a['answer'].length <= 40 &&
    Number.isInteger(a['count']) && Number(a['count']) >= 0 && Number(a['count']) <= 10 &&
    typeof a['correct'] === "boolean" && typeof a['independent'] === "boolean" &&
    typeof a['revealed'] === "boolean" && iso(a['at']));
}
