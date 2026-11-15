/** LOS! 2–8:n alkuperäisistä kirjakohtaisista v1.0-käsikirjoituksista
 * poimitut luonnoskentät. Tämä ei ole kielen- eikä julkaisuhyväksyntä.
 * Lähde: Los2-5.txt / Los6-8.txt, 12.–13.11.2026.
 */
export type LosFutureManuscript = {
  title: string;
  objective: string;
  intro: string;
  textA: string;
  textB: string;
  dialogue: string[];
  grammarTopic: string;
  grammarExplanation: string;
  vocabulary: { de: string; fi: string; status: string }[];
};
