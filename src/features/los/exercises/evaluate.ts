import type { Exercise, ExerciseAnswer, HighlightRange } from "../model";

export type Evaluation = { correct: boolean; explanationFi: string };
export const normalizeGap = (value: string) => value.normalize("NFC").trim().replace(/\s+/gu, " ");

export function normalizeRange(text: string, range: HighlightRange): HighlightRange {
  let { start, end } = range;
  if (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end > text.length || start >= end)
    return { start: 0, end: 0 };
  while (start < end && /[\s.,!?;:„“"«»]/u.test(text[start] ?? "")) start++;
  while (end > start && /[\s.,!?;:„“"«»]/u.test(text[end - 1] ?? "")) end--;
  return { start, end };
}

export function evaluateExercise(exercise: Exercise, answer: ExerciseAnswer): Evaluation | null {
  if (answer === null) return null;
  let correct = false;
  switch (exercise.type) {
    case "single-choice":
      if (typeof answer !== "string" || !exercise.options.some(option => option.id === answer)) return null;
      correct = answer === exercise.correctOptionId;
      break;
    case "gap-fill":
      if (typeof answer !== "string" || !normalizeGap(answer)) return null;
      correct = exercise.acceptedAnswers.some(expected => exercise.caseSensitive
        ? normalizeGap(answer) === normalizeGap(expected)
        : normalizeGap(answer).toLocaleLowerCase("de-DE") === normalizeGap(expected).toLocaleLowerCase("de-DE"));
      break;
    case "matching":
      if (typeof answer !== "object" || Array.isArray(answer) || "start" in answer) return null;
      if (Object.keys(answer).length !== exercise.left.length) return null;
      correct = exercise.pairs.every(pair => answer[pair.leftId] === pair.rightId)
        && new Set(Object.values(answer)).size === exercise.right.length;
      break;
    case "highlight": {
      if (typeof answer !== "object" || Array.isArray(answer) || !("start" in answer) || !("end" in answer) || typeof answer.start !== "number" || typeof answer.end !== "number") return null;
      const selected = normalizeRange(exercise.text, { start: answer.start, end: answer.end });
      if (selected.start === selected.end) return null;
      correct = exercise.acceptedRanges.some(range => {
        const expected = normalizeRange(exercise.text, range);
        return expected.start === selected.start && expected.end === selected.end;
      });
      break;
    }
  }
  return { correct, explanationFi: exercise.explanationFi };
}
