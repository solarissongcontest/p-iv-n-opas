import type {LosFutureExerciseDraft} from "./losFutureExerciseTypes.ts";

/** Four written dialogue turns from the original manuscript T19/R06 prompts.
 * This is NOT audio, a speaking assessment, or machine-graded fluency. */
export type LosFutureFourTurnTask={
  id:string;kind:"simulation"|"dialogue-production";prompt:string;
  labels:readonly [string,string,string,string];
};
export function losFutureFourTurnTask(task:LosFutureExerciseDraft):LosFutureFourTurnTask|null {
  if(/-T19$/.test(task.id)&&task.title==="Tilannesimulaatio"&&
    task.prompt.includes("neljä vuoroa")){
    return {id:task.id,kind:"simulation",prompt:task.prompt,
      labels:["Henkilö A: aloita uusi keskustelu","Henkilö B: vastaa tilanteeseen",
        "Henkilö A: jatka keskustelua","Henkilö B: päätä tilanne luontevasti"]};
  }
  if(/-R06$/.test(task.id)&&task.title==="dialogue-production"&&
    task.prompt.includes("neljän vuoron keskustelu")){
    return {id:task.id,kind:"dialogue-production",prompt:task.prompt,
      labels:["Henkilö A: ensimmäinen vuoro","Henkilö B: toinen vuoro",
        "Henkilö A: kolmas vuoro","Henkilö B: neljäs vuoro"]};
  }
  return null;
}
export function readLosFutureFourTurnAnswer(value:string,task:LosFutureFourTurnTask):string[]|null {
  if(!value)return ["","","",""];
  try{
    const data:unknown=JSON.parse(value);
    if(!data||typeof data!=="object"||Array.isArray(data))return null;
    const row=data as {version?:unknown;id?:unknown;prompt?:unknown;answers?:unknown};
    if(row.version!==1||row.id!==task.id||row.prompt!==task.prompt||
      !Array.isArray(row.answers)||row.answers.length!==4||
      !row.answers.every((v:unknown)=>typeof v==="string"&&v.length<=450))return null;
    return [...row.answers] as string[];
  }catch{return null;}
}
export function writeLosFutureFourTurnAnswer(task:LosFutureFourTurnTask,answers:readonly string[]):string {
  if(answers.length!==4||answers.some(v=>typeof v!=="string"||v.length>450))
    throw Error("Invalid four-turn dialogue answer");
  if(answers.every(v=>!v.trim()))return "";
  return JSON.stringify({version:1,id:task.id,prompt:task.prompt,answers:[...answers]});
}
