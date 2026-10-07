export type ManualMaa06aSource = "textbook" | "textbook_review" | "review_worksheet";

export type ManualMaa06aParseResult = {
  codes: string[];
  invalid: string[];
};

function normalizeToken(token: string, source: ManualMaa06aSource) {
  const clean = token.trim().replace(/[–—]/g, "-");
  return source === "textbook_review" ? clean.toUpperCase() : clean;
}

function validCode(code: string, source: ManualMaa06aSource) {
  if (source === "textbook") {
    const match = code.match(/^(\d{1,2})\.(\d{1,3})$/);
    if (!match) return false;
    const chapter = Number(match[1]);
    const exercise = Number(match[2]);
    return chapter >= 1 && chapter <= 17 && exercise >= 1;
  }
  if (source === "textbook_review") return /^[KAB][1-9]\d*$/.test(code);
  const number = Number(code);
  return /^\d{1,2}$/.test(code) && number >= 1 && number <= 15;
}

/**
 * Parses the compact list used by the MAA06A quick logger.
 * Examples: "2.15, 2.16 2.17" or "K4, A2, B7".
 * Duplicates are removed while the user's order is preserved.
 */
export function parseManualMaa06aCodes(
  value: string,
  source: ManualMaa06aSource,
): ManualMaa06aParseResult {
  const tokens = value
    .split(/[\s,;]+/)
    .map((token) => normalizeToken(token, source))
    .filter(Boolean);
  const codes: string[] = [];
  const invalid: string[] = [];
  const seen = new Set<string>();

  for (const token of tokens) {
    if (!validCode(token, source)) {
      invalid.push(token);
      continue;
    }
    if (seen.has(token)) continue;
    seen.add(token);
    codes.push(token);
  }

  return { codes, invalid };
}

export function manualMaa06aExerciseDefaults(code: string, source: ManualMaa06aSource) {
  if (source === "textbook") {
    const [chapterText, exerciseText] = code.split(".");
    const chapter = Number(chapterText);
    const exercise = Number(exerciseText);
    return {
      sourceGroup: "chapter" as const,
      chapter,
      sortOrder: 50_000 + chapter * 1_000 + exercise,
    };
  }
  if (source === "textbook_review") {
    const prefix = code[0] as "K" | "A" | "B";
    const number = Number(code.slice(1));
    const base = prefix === "K" ? 60_000 : prefix === "A" ? 70_000 : 80_000;
    return { sourceGroup: prefix, chapter: null, sortOrder: base + number };
  }
  return {
    sourceGroup: "worksheet" as const,
    chapter: null,
    sortOrder: 90_000 + Number(code),
  };
}
