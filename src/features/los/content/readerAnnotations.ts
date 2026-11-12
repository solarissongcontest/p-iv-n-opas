import { LOS_READER_COLORS, type LosReaderAnnotation, type LosReaderColor, type LosReaderRange } from "./c01Annotations.ts";

/** Generalized stable annotation API for the eight-book LOS! series. */
export function losReaderMarkKey(chapterId: string, sourceId: string, lineId: string): string {
  return "los1-c" + chapterId + "-" + sourceId.toLocaleLowerCase("en-US") + "-" + lineId;
}
export function parseLosReaderAnnotation(value: string | undefined, expectedVersion: string): LosReaderAnnotation {
  const empty = { contentVersion: expectedVersion, ranges: [] as LosReaderRange[] };
  if (!value) return empty;
  try {
    const data: unknown = JSON.parse(value);
    if (!data || typeof data !== "object" || Array.isArray(data)) return { contentVersion: "", ranges: [] };
    const parsed = data as Partial<LosReaderAnnotation>;
    if (typeof parsed.contentVersion !== "string" || !Array.isArray(parsed.ranges)) {
      return { contentVersion: "", ranges: [] };
    }
    const ranges = parsed.ranges.slice(0,8).filter((item): item is LosReaderRange => {
      if (!item || typeof item !== "object") return false;
      const r = item as Partial<LosReaderRange>;
      return typeof r.startToken === "number" && Number.isInteger(r.startToken) && r.startToken >= 0 &&
        typeof r.endToken === "number" && Number.isInteger(r.endToken) && r.endToken >= r.startToken &&
        LOS_READER_COLORS.some(color => color === r.color);
    });
    return { contentVersion: parsed.contentVersion, ranges };
  } catch { return { contentVersion: "", ranges: [] }; }
}
export function appendLosReaderRange(annotation: LosReaderAnnotation, start: number, end: number,
  color: LosReaderColor, tokenCount: number, expectedVersion: string): LosReaderAnnotation {
  if (annotation.contentVersion !== expectedVersion || !LOS_READER_COLORS.includes(color) ||
      !Number.isInteger(start) || !Number.isInteger(end) || !Number.isInteger(tokenCount) ||
      start < 0 || end < 0 || start >= tokenCount || end >= tokenCount) return annotation;
  const range: LosReaderRange = { startToken: Math.min(start,end), endToken: Math.max(start,end), color };
  return { contentVersion: annotation.contentVersion, ranges: [...annotation.ranges.slice(-7), range] };
}
export function losReaderTokenColor(annotation: LosReaderAnnotation, index: number,
  expectedVersion: string): LosReaderColor | null {
  if (annotation.contentVersion !== expectedVersion) return null;
  const hit = annotation.ranges.filter(r => r.startToken <= index && r.endToken >= index);
  return hit[hit.length-1]?.color ?? null;
}
