const ALPHANUMERIC = /[\p{L}\p{N}]/u;
const LETTER = /\p{L}/u;

function normalizeForLeakCheck(value: string) {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase("fi-FI")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Very short numeric answers are commonly part of the givens in maths and
 * chemistry, so treating every "2" or "10" as an answer leak would reject
 * perfectly valid questions. Longer textual/formula answers are distinctive
 * enough to check safely.
 */
export function answerIsLeakCandidate(answer: string | null | undefined) {
  if (!answer) return false;
  const normalized = normalizeForLeakCheck(answer);
  if (normalized.length < 4) return false;

  let letters = 0;
  for (const character of normalized) {
    if (LETTER.test(character)) letters += 1;
  }
  return letters >= 3 || normalized.length >= 8;
}

/**
 * Returns true only for a standalone occurrence of the complete answer. This
 * catches e.g. "Elin muodostuu kudoksista" when the answer is "elin", without
 * mistaking the start of "elimistö" for the same answer.
 */
export function questionPromptLeaksAnswer(
  prompt: string,
  correctAnswer: string | null | undefined,
) {
  if (!answerIsLeakCandidate(correctAnswer)) return false;

  const haystack = normalizeForLeakCheck(prompt);
  const needle = normalizeForLeakCheck(correctAnswer!);
  let start = 0;

  while (start <= haystack.length - needle.length) {
    const index = haystack.indexOf(needle, start);
    if (index < 0) return false;

    const before = index > 0 ? haystack[index - 1] ?? "" : "";
    const afterIndex = index + needle.length;
    const after = afterIndex < haystack.length ? haystack[afterIndex] ?? "" : "";
    const startsOnBoundary = !before || !ALPHANUMERIC.test(before);
    const endsOnBoundary = !after || !ALPHANUMERIC.test(after);
    if (startsOnBoundary && endsOnBoundary) return true;

    start = index + 1;
  }

  return false;
}
