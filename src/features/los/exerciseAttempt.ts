import type {Exercise} from './content.ts';
import type {TextAnchor} from './engine.ts';

/** An attempt only counts if the learner actually supplied a response.
 * Incorrect answers are still legitimate attempts; empty submissions are not.
 * Free writing and speech remain human/self-evaluated, not machine-graded. */
export function hasExerciseAttempt(
 exercise:Exercise,
 answer:string,
 highlight:TextAnchor|null,
 speechConfirmed=false,
):boolean{
 switch(exercise.type){
  case 'highlight':
  case 'find-text':
   return Boolean(highlight&&highlight.blockId===exercise.blockId&&
    Number.isInteger(highlight.start)&&Number.isInteger(highlight.end)&&
    highlight.start>=0&&highlight.end>highlight.start);
  case 'matching':
  case 'article-sort':
  case 'conjugation': {
   try{
    const parsed:unknown=JSON.parse(answer);
    if(!parsed||typeof parsed!=='object'||Array.isArray(parsed))return false;
    const map=parsed as Record<string,unknown>;
    return Boolean(exercise.pairs?.length)&&exercise.pairs!.every(([key])=>
     typeof map[key]==='string'&&Boolean((map[key] as string).trim()));
   }catch{return false;}
  }
  case 'ordering':
   return Boolean(exercise.order?.length)&&
    answer.split(' | ').filter(Boolean).length===exercise.order!.length;
  case 'speech':return speechConfirmed;
  case 'writing':return answer.trim().length>=20;
  case 'choice':
  case 'true-false':
  case 'listen-choice':
  case 'video':
   return Boolean(answer)&&Boolean(exercise.options?.includes(answer))&&
    (exercise.type!=='video'||Boolean(exercise.reviewedMedia));
  default:return answer.trim().length>0;
 }
}


/** A choice can be supplied without sound, but a listening-comprehension
 * receipt exists only after the actual source recording fires onEnded.
 */
export const exerciseAudioProof=(exerciseId:string):string=>
 'media:completed:exercise:'+exerciseId;
export function canSubmitExerciseAttempt(
 exercise:Exercise,answer:string,highlight:TextAnchor|null,
 speechConfirmed=false,audioCompleted=false,
):boolean{
 const valid=hasExerciseAttempt(exercise,answer,highlight,speechConfirmed);
 if(!valid)return false;
 return (exercise.type!=='listen-choice'&&exercise.type!=='listen-write')||audioCompleted;
}
