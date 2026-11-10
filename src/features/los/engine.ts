import { LOS_VERSION, type Exercise } from './content.ts';

export type TextAnchor = {blockId:string;start:number;end:number;contentVersion:string};
export type Grade = {status:'correct'|'incorrect'|'self-review';feedback:string};
export const spacedDays = [1,3,7,14,30] as const;
export const normalizeAnswer=(text:string)=>text.normalize('NFC').trim().replace(/\s+/gu,' ');
export const normalizedPhrase=(text:string)=>normalizeAnswer(text).replace(/[.!?]+$/u,'').trim();

export function gradeExercise(exercise:Exercise, response:string|TextAnchor|null):Grade {
 if(exercise.type==='speech'||exercise.type==='writing'){
  return {status:'self-review',feedback:exercise.explanation};
 }
 if(exercise.type==='highlight'||exercise.type==='find-text'){
  if(!response||typeof response==='string')return {status:'incorrect',feedback:'Valitse ensin tekstistä vastauskohta.'};
  // Exact anchor endpoints correspond to the entire source phrase. No fuzzy text acceptance.
  const source = exercise.target ?? '';
  const ref=(exercise as Exercise & {sourceText?:string}).sourceText;
  if(!ref)return {status:'incorrect',feedback:'Tekstiviitteen tarkistamiseen tarvitaan alkuperäinen lohko.'};
  const selected=ref.slice(response.start,response.end);
  const good=response.blockId===exercise.blockId && response.contentVersion===LOS_VERSION && normalizedPhrase(selected)===normalizedPhrase(source);
  return {status:good?'correct':'incorrect',feedback:good?exercise.explanation:'Korostus ei vielä osu pyydettyyn tekstikohtaan. Lue ohje ja etsi koko ilmaus.'};
 }
 if(typeof response!=='string'||!response.trim())return {status:'incorrect',feedback:'Anna vastaus ennen tarkistamista.'};
 if(exercise.type==='video'&&!exercise.reviewedMedia){
  return {status:'self-review',feedback:'Videoaineiston sisältöä ja upotuksen toimintaa ei ole vielä vahvistettu. Tätä tehtävää ei pisteytetä.'};
 }
 if(exercise.type==='matching'||exercise.type==='article-sort'||exercise.type==='conjugation'){
  let provided:Record<string,unknown>;
  try{const value:unknown=JSON.parse(response);if(!value||typeof value!=='object'||Array.isArray(value))throw Error('invalid');provided=value as Record<string,unknown>;}
  catch{return {status:'incorrect',feedback:'Täytä jokainen vastausrivi ennen tarkistamista.'};}
  const pairs=exercise.pairs??[];
  const mistakes=pairs.filter(([left,right])=>typeof provided[left]!=='string'||normalizedPhrase(provided[left] as string)!==normalizedPhrase(right));
  const extra=Object.keys(provided).filter(key=>!pairs.some(([left])=>left===key));
  const correct=mistakes.length===0&&extra.length===0&&pairs.length>0;
  return {status:correct?'correct':'incorrect',feedback:correct?exercise.explanation:
   'Tarkista erityisesti: '+mistakes.map(([left])=>left).join(', ')+'. '+exercise.explanation};
 }

 const correct=exercise.type==='choice'||exercise.type==='true-false'||exercise.type==='listen-choice'||exercise.type==='video'
  ?response===exercise.correct
  :exercise.type==='ordering'
    ?response.split(' | ').join(' ')===exercise.order?.join(' ')
    :(exercise.accepted??[]).some(a=>normalizedPhrase(a)===normalizedPhrase(response));
 return {status:correct?'correct':'incorrect',feedback:correct?exercise.explanation:'Ei vielä oikein. '+exercise.explanation};
}
export function dueDate(previous:Date,success:boolean,stage:number):{date:string;stage:number}{
 const next=success?Math.min(spacedDays.length-1,stage+1):0;
 const delay=success?(spacedDays[Math.min(spacedDays.length-1,Math.max(0,stage))]??30):1;
 const day=new Date(previous);
 day.setUTCDate(day.getUTCDate()+delay);
 return {date:day.toISOString().slice(0,10),stage:next};
}
export function tokenOffsets(text:string):{text:string;start:number;end:number}[]{
 const parts=[...text.matchAll(/\S+/gu)];
 return parts.map(match=>({text:match[0],start:match.index,end:match.index+match[0].length}));
}
