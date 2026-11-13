import type { LosFutureExerciseDraft } from "./losFutureExerciseTypes";

/** A guarded interactive format for the 70 source T05 matching exercises.
 * Duplicate Finnish meanings remain free-text, not a misleading graded selector. */
export type LosFutureMatchPair = {de:string;fi:string};
export function losFutureMatchingPairs(task:LosFutureExerciseDraft):LosFutureMatchPair[]|null {
  if(!/-T05$/.test(task.id) || task.title!=="Yhdistä uusi sana ja merkitys")return null;
  const chunks=task.answerKey.split(";").map(item=>item.trim());
  if(chunks.length!==4)return null;
  const pairs=chunks.map(chunk=>{
    const separator=chunk.indexOf(" = ");
    if(separator<1 || chunk.indexOf(" = ",separator+3)>=0)return null;
    return {de:chunk.slice(0,separator).trim(),fi:chunk.slice(separator+3).trim()};
  });
  if(pairs.some(pair=>!pair?.de || !pair.fi))return null;
  const valid=pairs as LosFutureMatchPair[];
  if(new Set(valid.map(pair=>pair.de)).size!==4 || new Set(valid.map(pair=>pair.fi)).size!==4)
    return null;
  return valid;
}

/** Reads the old human-readable answer if it is a complete word-to-meaning set.
 * Never discards preexisting free-text answers that use a different structure. */
export function readLosFutureMatchingAnswer(value:string,pairs:readonly LosFutureMatchPair[]):string[]|null {
  if(!value)return pairs.map(()=>"");
  const rows=value.split(";").map(part=>part.trim());
  if(rows.length!==pairs.length)return null;
  const values:string[]=[];
  for(let i=0;i<rows.length;i++){
    const prefix=pairs[i]!.de+" = ";
    if(!rows[i]!.startsWith(prefix))return null;
    const meaning=rows[i]!.slice(prefix.length);
    if(meaning!=="?" && !pairs.some(pair=>pair.fi===meaning))return null;
    values.push(meaning==="?"?"":meaning);
  }
  return values;
}
export function writeLosFutureMatchingAnswer(pairs:readonly LosFutureMatchPair[],answers:readonly string[]):string {
  if(answers.every(answer=>!answer))return "";
  return pairs.map((pair,i)=>pair.de+" = "+(answers[i]||"?")).join("; ");
}
