import {LOS_FUTURE_MANUSCRIPTS} from "./content/losFutureManuscripts.ts";
import {losRecallFromVocabulary,type LosRecallCard} from "./recallEngine.ts";

/** Reuse LOS! 1's real recognition/production spaced-recall engine.
 * Source vocabulary is editorial draft, not a verified dictionary or a score. */
export function losFutureRecallCardsFor(bookId:number,chapterId:string):LosRecallCard[]{
  if(!Number.isInteger(bookId)||bookId<2||bookId>8||
    !/^(0[1-9]|10)$/.test(chapterId))return [];
  const words=LOS_FUTURE_MANUSCRIPTS[bookId]?.[chapterId]?.vocabulary??[];
  return losRecallFromVocabulary(chapterId,words
    .filter(w=>w.de.trim()&&w.fi.trim())
    .map(w=>w.de+" – "+w.fi));
}
