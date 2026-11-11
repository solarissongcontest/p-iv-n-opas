import { LOS1_C01_TEXT_VERSION } from "./los1C01.ts";

export type LosReaderColor = "yellow" | "pink" | "green" | "blue";
export const LOS_READER_COLORS: readonly LosReaderColor[] = ["yellow","pink","green","blue"];
export type LosReaderRange = {
  startToken: number;
  endToken: number;
  color: LosReaderColor;
};
export type LosReaderAnnotation = {
  contentVersion: string;
  ranges: LosReaderRange[];
};
export const LOS_C01_MARK_PREFIX = "los1-c01-m-com-01-";

/** A stable, versioned per-utterance key; older versions remain untouched on edits. */
export function losC01MarkKey(lineId: string): string {
  return `${LOS_C01_MARK_PREFIX}${lineId}`;
}
export function parseLosC01Mark(value: string | undefined): LosReaderAnnotation {
  if (!value) return { contentVersion: LOS1_C01_TEXT_VERSION, ranges: [] };
  try {
    const parsed: unknown = JSON.parse(value);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return { contentVersion: "", ranges: [] };
    const object = parsed as Partial<LosReaderAnnotation>;
    if (typeof object.contentVersion !== "string" || !Array.isArray(object.ranges)) {
      return { contentVersion: "", ranges: [] };
    }
    const ranges: LosReaderRange[] = [];
    for (const item of object.ranges.slice(0,8)) {
      if (!item || typeof item !== "object") continue;
      const itemRange = item as Partial<LosReaderRange>;
      if (
        typeof itemRange.startToken === "number" && Number.isInteger(itemRange.startToken) &&
        itemRange.startToken >= 0 &&
        typeof itemRange.endToken === "number" && Number.isInteger(itemRange.endToken) &&
        itemRange.endToken >= itemRange.startToken &&
        LOS_READER_COLORS.some(color => color === itemRange.color)
      ) {
        ranges.push(itemRange as LosReaderRange);
      }
    }
    return { contentVersion: object.contentVersion, ranges };
  } catch { return { contentVersion: "", ranges: [] }; }
}
export function appendLosC01Range(
  existing: LosReaderAnnotation, start: number, end: number, color: LosReaderColor, tokenCount: number,
): LosReaderAnnotation {
  if (existing.contentVersion !== LOS1_C01_TEXT_VERSION) return existing;
  if (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end < 0 ||
      start >= tokenCount || end >= tokenCount) return existing;
  const startToken = Math.min(start,end), endToken = Math.max(start,end);
  return {
    contentVersion: existing.contentVersion,
    ranges: [...existing.ranges.slice(-7), { startToken, endToken, color }],
  };
}
export function losC01TokenColor(annotation: LosReaderAnnotation, index: number): LosReaderColor | null {
  if (annotation.contentVersion !== LOS1_C01_TEXT_VERSION) return null;
  const matching = annotation.ranges.filter(range => range.startToken <= index && range.endToken >= index);
  return matching[matching.length-1]?.color ?? null;
}
