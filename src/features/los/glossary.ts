/** Deterministic, fully client-side lookup from editorially reviewed book vocabulary.
 * Matches the longest phrase first; never consults an unverified external dictionary.
 * The original text is not modified, translated, or replaced in the reader.
 */
export type GlossaryEntry = { id: string; de: string; fi: string; note?: string };
export type GlossarySpan = { start: number; end: number; entry: GlossaryEntry };

function isWordChar(char: string | undefined) {
  return char !== undefined && /[\p{L}\p{N}]/u.test(char);
}
export function findGlossarySpans(text: string, entries: readonly GlossaryEntry[]): GlossarySpan[] {
  const sorted = [...entries].filter(entry => entry.de.trim()).sort((a, b) => b.de.length - a.de.length);
  const lowercase = text.toLocaleLowerCase("de-DE");
  const spans: GlossarySpan[] = [];
  let index = 0;
  while (index < text.length) {
    const match = sorted.find(entry => {
      const candidate = entry.de.toLocaleLowerCase("de-DE");
      if (!lowercase.startsWith(candidate, index)) return false;
      const end = index + entry.de.length;
      return !isWordChar(text[index - 1]) && !isWordChar(text[end]);
    });
    if (match) {
      spans.push({ start: index, end: index + match.de.length, entry: match });
      index += match.de.length;
    } else index++;
  }
  return spans;
}
