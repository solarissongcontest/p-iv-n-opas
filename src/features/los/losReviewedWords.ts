import { LOS_BOOKS } from "./catalog.ts";
import type { LosChapterDraft } from "./studyState.ts";
import { losRecallFromVocabulary, validLosRecallCardMap } from "./recallEngine.ts";

/**
 * Count actual, distinct German vocabulary headwords in LOS! 1 with a
 * persisted, structurally valid self-rating. The two card directions and a
 * repeated word in another chapter never inflate the count. A bare key or an
 * invented/imported card ID does not count. This is activity evidence only,
 * not a verified word-recall score.
 *
 * All data is read from existing draft slots. Nothing new is persisted.
 */
export function losCountReviewedWords(
  drafts: Readonly<Record<string, Pick<LosChapterDraft, "recallCards">>>,
): number {
  const words = new Set<string>();
  const book = LOS_BOOKS.find(item => item.id === 1);
  for (const chapter of book?.chapters ?? []) {
    const ratings = drafts[chapter.id]?.recallCards ?? {};
    for (const card of losRecallFromVocabulary(chapter.id, chapter.vocabulary)) {
      const state = ratings[card.id];
      if (!state || !validLosRecallCardMap({ [card.id]: state })) continue;
      words.add(card.german.trim().normalize("NFC").replace(/\\s+/g, " ").toLocaleLowerCase("de"));
    }
  }
  return words.size;
}
