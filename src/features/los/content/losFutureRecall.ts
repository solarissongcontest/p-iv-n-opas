import type { LosFutureExerciseDraft } from "./losFutureExerciseTypes.ts";

/**
 * Six individually retrievable words from the source-authored T06 recall task.
 * Answers are drafts, not machine-graded proficiency evidence. No source key is
 * sent into the student's persisted answers or rendered before self-review.
 */
export type LosFutureRecallPair = { de: string; fi: string };
export function losFutureRecallPairs(task: LosFutureExerciseDraft): LosFutureRecallPair[] | null {
  if (!/-T06$/.test(task.id) || task.title !== "Sanastomuisti ilman mallia" ||
      !task.prompt.startsWith("Peitä sanaston saksankielinen puoli")) return null;
  const chunks = task.answerKey.split(";").map(item => item.trim());
  if (chunks.length !== 6) return null;
  const pairs = chunks.map(chunk => {
    const mark = chunk.indexOf(" = ");
    if (mark <= 0 || chunk.indexOf(" = ", mark + 3) >= 0) return null;
    const de = chunk.slice(0, mark).trim();
    const fi = chunk.slice(mark + 3).trim();
    return de && fi ? { de, fi } : null;
  });
  return pairs.every(Boolean) ? pairs as LosFutureRecallPair[] : null;
}

/**
 * Preserve incompatible previous prose verbatim: null signals the UI to show
 * its existing textarea instead of overwriting a student's earlier work.
 * Matching meanings protect drafts from silent remapping on manuscript edits.
 */
export function readLosFutureRecallAnswer(value: string, pairs: readonly LosFutureRecallPair[]): string[] | null {
  if (!value) return pairs.map(() => "");
  try {
    const parsed: unknown = JSON.parse(value);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    const row = parsed as {version?: unknown; meanings?: unknown; answers?: unknown};
    const meanings = row.meanings, answers = row.answers;
    if (row.version !== 1 || !Array.isArray(meanings) || !Array.isArray(answers) ||
        meanings.length !== pairs.length || answers.length !== pairs.length) return null;
    if (!pairs.every((pair, i) => meanings[i] === pair.fi)) return null;
    if (!answers.every((v: unknown) => typeof v === "string" && v.length <= 100)) return null;
    return [...answers] as string[];
  } catch { return null; }
}

export function writeLosFutureRecallAnswer(pairs: readonly LosFutureRecallPair[], answers: readonly string[]): string {
  if (answers.length !== pairs.length || answers.some(answer => answer.length > 100))
    throw new Error("Invalid LOS vocabulary recall answer");
  if (answers.every(answer => !answer.trim())) return "";
  return JSON.stringify({version:1,meanings:pairs.map(pair => pair.fi),answers});
}
