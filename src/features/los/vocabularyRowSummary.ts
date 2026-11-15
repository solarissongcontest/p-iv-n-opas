/** Counts displayed chapter vocabulary rows without pretending that entries are
 * distinct lemmas, newly introduced words, or approved active vocabulary.
 * Spelling is intentionally case-sensitive: polite Sie is not the pronoun sie.
 */
export type LosVocabularySpelling = {word:string};
export type LosVocabularyRowSummary = {
  rowCount:number;
  distinctWrittenEntries:number;
  repeatedWrittenEntries:readonly {word:string; occurrences:number}[];
};
export function summarizeLosVocabularyRows(rows:readonly LosVocabularySpelling[]):LosVocabularyRowSummary {
  const counts=new Map<string,number>();
  for(const row of rows){
    const spelling=row.word.trim().normalize("NFC");
    if(!spelling)continue;
    counts.set(spelling,(counts.get(spelling)??0)+1);
  }
  return {
    rowCount:rows.length,
    distinctWrittenEntries:counts.size,
    repeatedWrittenEntries:[...counts.entries()]
      .filter(([,occurrences])=>occurrences>1)
      .map(([word,occurrences])=>({word,occurrences})),
  };
}
