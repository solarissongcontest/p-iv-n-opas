import type {FirstLesson} from './firstLessons.ts';

/** Source-specific playback receipt. An older listen in a different lesson
 * must never satisfy a fresh guided listening requirement. */
export const lessonAudioProof=(lessonId:string,sourceId:string):string=>
 'lesson:'+lessonId+':'+sourceId;

/** Any authored reflection stage requires an actual learner reflection.
 * This is derived from the plan, never from a manually maintained ID list. */
export const lessonRequiresReflection=(plan:FirstLesson):boolean=>
 plan.steps.some(step=>step.kind==='reflection');

/** Structural facts only. This cannot prove audio rights or user-device UX. */
export function validateGuidedLessons(plans:readonly FirstLesson[]):string[]{
 const errors:string[]=[];
 const ids=new Set<string>();
 const expected=Array.from({length:60},(_,i)=>'L'+String(i+1).padStart(3,'0'));
 for(const plan of plans){
  if(ids.has(plan.id))errors.push('Duplikaatti oppitunti: '+plan.id);
  ids.add(plan.id);
  if(plan.steps.length!==5)errors.push('Ei viittä vaihetta: '+plan.id);
  if(plan.steps.reduce((sum,step)=>sum+step.minutes,0)!==30)errors.push('Kesto ei ole 30 min: '+plan.id);
  const stepIds=new Set<string>();
  for(const step of plan.steps){
   if(stepIds.has(step.id))errors.push('Vaihetunniste toistuu: '+step.id);
   stepIds.add(step.id);
   if(!step.id.startsWith(plan.id+'-S'))errors.push('Väärän tunnin vaihe: '+step.id);
   if(!step.instructionFi.trim())errors.push('Tyhjä opetusohje: '+step.id);
  }
  if(plan.steps.some(step=>step.kind==='listen')&&!plan.requiredMediaIds?.length){
   errors.push('Kuuntelutunti ilman todellista mediaehtoa: '+plan.id);
  }
 }
 for(const id of expected)if(!ids.has(id))errors.push('Oppitunti puuttuu: '+id);
 return errors;
}
