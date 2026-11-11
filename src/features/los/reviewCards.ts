import {chapters,allWords,type Exercise} from './content.ts';
import {allChapterExercises} from './practiceExtras.ts';
import {reviewOneItems} from './reviewOneItems.ts';
import {reviewTwoItems} from './reviewTwoItems.ts';

export type ReviewCardInfo={title:string;solution:string;kind:'word'|'exercise'|'missing'};

const exerciseById=new Map<string,Exercise>([
 ...chapters.flatMap(c=>allChapterExercises(c.id,c.exercises)),
 ...reviewOneItems.map(item=>item.exercise),
 ...reviewTwoItems.map(item=>item.exercise)
].map(ex=>[ex.id,ex] as const));

/** A review card must display an actual question or the vocabulary term.
 * Showing only C08-X19 makes a due exercise impossible to review meaningfully.
 */
export function reviewCardInfo(reviewKey:string):ReviewCardInfo{
 const key=reviewKey.startsWith('review:')?reviewKey.slice(7):reviewKey;
 const word=allWords.find(w=>w.de===key);
 if(word)return {title:word.de,solution:word.fi,kind:'word'};
 const exercise=exerciseById.get(key);
 if(!exercise)return {title:key,solution:'Alkuperäinen tehtävä ei ole enää saatavilla. Kertaa oppikirjan sanasto ja tehtävät ennen itsearviointia.',kind:'missing'};
 const model=exercise.correct??exercise.accepted?.[0]??
  (exercise.order?.join(' ')||exercise.pairs?.map(([a,b])=>a+' = '+b).join('; '))??'';
 return {title:exercise.prompt,solution:[model,exercise.explanation].filter(Boolean).join(' · '),kind:'exercise'};
}
