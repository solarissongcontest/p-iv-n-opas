import type { Book } from "./model";

export type BookVocabularyRow = {
  id: string;
  blockId: string;
  de: string;
  fi: string;
  note?: string;
  chapterId: string | null;
};

export function bookVocabularyRows(book: Book): BookVocabularyRow[] {
  const rows: BookVocabularyRow[] = [];
  for (const block of book.blocks) {
    if (block.kind !== "vocabulary") continue;
    const chapterId = book.chapters.find(chapter => chapter.blockIds.includes(block.id))?.id ?? null;
    for (const entry of block.entries) {
      rows.push({
        id: block.id + ":" + entry.id,
        blockId: block.id,
        de: entry.de, fi: entry.fi,
        chapterId,
        ...(entry.note ? { note: entry.note } : {}),
      });
    }
  }
  return rows.sort((a, b) => a.de.localeCompare(b.de, "de-DE") || a.id.localeCompare(b.id));
}
export function filterBookVocabulary(rows: readonly BookVocabularyRow[], query: string, savedOnly = false, saved: readonly string[] = []): BookVocabularyRow[] {
  const search = query.normalize("NFC").trim().toLocaleLowerCase("fi-FI");
  const savedSet = new Set(saved);
  return rows.filter(row => {
    if (savedOnly && !savedSet.has(row.id)) return false;
    if (!search) return true;
    return [row.de, row.fi, row.note ?? ""].some(value =>
      value.normalize("NFC").toLocaleLowerCase("fi-FI").includes(search));
  });
}
