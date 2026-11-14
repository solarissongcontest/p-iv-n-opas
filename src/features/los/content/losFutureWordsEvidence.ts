import type {LosFutureRemainingTask} from "./losFutureRemaining.ts";

/** Source-location feedback only: no translations, grammar grades or
 * mastery inference. Keep student prose and the v1 answer format unchanged. */
export type LosFutureWordsEvidenceStatus =
  "word-not-found"|"excerpt-not-found"|"word-outside-excerpt"|"duplicate-word"|"located";

/** Spaces and German case are ignored, but letter boundaries are respected:
 * "in" must never count as evidence for "Finnland". */
export function losFutureContainsSourcePhrase(source:string,phrase:string):boolean{
  const hay=source.normalize("NFC").replace(/\s+/gu," ").toLocaleLowerCase("de");
  const needle=phrase.normalize("NFC").replace(/\s+/gu," ").trim().toLocaleLowerCase("de");
  if(!needle)return false;
  const letter=/[\p{L}\p{N}]/u;
  let at=0;
  while((at=hay.indexOf(needle,at))!==-1){
    const before=at>0?hay[at-1]!:"";
    const after=hay[at+needle.length]??"";
    if((!letter.test(needle[0]!)||!before||!letter.test(before))&&
      (!letter.test(needle[needle.length-1]!)||!after||!letter.test(after)))return true;
    at+=1;
  }
  return false;
}

export function losFutureWordsEvidenceStatus(
  task:LosFutureRemainingTask,answers:readonly string[],slot:number,
):LosFutureWordsEvidenceStatus|null{
  if(task.kind!=="words"||!Number.isInteger(slot)||slot<0||slot>=3)return null;
  const word=answers[slot*3]?.trim()??"";
  const excerpt=answers[slot*3+1]?.trim()??"";
  if(!word||!excerpt)return null;
  if(!losFutureContainsSourcePhrase(task.sourceText,word))return "word-not-found";
  if(!losFutureContainsSourcePhrase(task.sourceText,excerpt))return "excerpt-not-found";
  if(!losFutureContainsSourcePhrase(excerpt,word))return "word-outside-excerpt";
  const normalized=word.normalize("NFC").toLocaleLowerCase("de");
  if([0,1,2].some(previous=>previous<slot&&
    answers[previous*3]?.trim().normalize("NFC").toLocaleLowerCase("de")===normalized))
    return "duplicate-word";
  return "located";
}
