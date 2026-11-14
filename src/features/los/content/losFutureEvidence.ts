import type {LosFutureExerciseDraft} from "./losFutureExerciseTypes.ts";
import {LOS_FUTURE_MANUSCRIPTS} from "./losFutureManuscripts.ts";

/** T03 dialogue turn counting and R01 Text A evidence, exactly as source-authored.
 * Two independent responses: text evidence and the student's interpretation.
 * Neither type is scored automatically or treated as a completed assessment. */
export type LosFutureEvidenceTask={
  kind:"dialogue"|"text-evidence";
  sourceText:string;
  id:string;
  prompt:string;
  questions:readonly [string,string];
  languages:readonly ["fi","fi"]|readonly ["de","fi"];
};
export function losFutureEvidenceTask(task:LosFutureExerciseDraft):LosFutureEvidenceTask|null{
  const m=task.id.match(/^LOS([2-8])-C(0[1-9]|10)-(T03|R01)$/);
  if(!m)return null;
  const bookId=Number(m[1]),chapterId=m[2],suffix=m[3];
  const manuscript=LOS_FUTURE_MANUSCRIPTS[bookId]?.[chapterId!];
  if(!manuscript)return null;
  if(suffix==="T03"&&task.title==="Puhujat ja vuorot"&&
    task.prompt.startsWith("Lue saksankielinen tukidialogi.")&&
    manuscript.dialogue.length>=2){
    const sourceText=manuscript.dialogue.join("\n");
    if(!sourceText||sourceText.length>1600)return null;
    return {kind:"dialogue",id:task.id,prompt:task.prompt,sourceText,
      questions:["Kuinka monta puheenvuoroa dialogissa on?",
        "Mitä kukin puhuja tekee ensimmäisessä puheenvuorossaan? Selitä suomeksi."],
      languages:["fi","fi"]};
  }
  if(suffix==="R01"&&task.title==="text-evidence"&&task.prompt.includes("Etsi virke")&&
    manuscript.textA.length>=20&&manuscript.textA.length<=2000){
    return {kind:"text-evidence",id:task.id,prompt:task.prompt,sourceText:manuscript.textA,
      questions:["Kopioi saksankielinen virke, joka osoittaa tekstin lähtötilanteen",
        "Selitä suomeksi, miksi valitsemasi virke kertoo lähtötilanteesta"],
      languages:["de","fi"]};
  }
  return null;
}
/** Keep legacy free text and source revisions intact. */
export function readLosFutureEvidenceAnswer(value:string,task:LosFutureEvidenceTask):string[]|null{
  if(!value)return ["",""];
  try{
    const raw:unknown=JSON.parse(value);
    if(!raw||typeof raw!=="object"||Array.isArray(raw))return null;
    const item=raw as {version?:unknown;id?:unknown;sourceText?:unknown;answers?:unknown};
    if(item.version!==1||item.id!==task.id||item.sourceText!==task.sourceText||
      !Array.isArray(item.answers)||item.answers.length!==2||
      !item.answers.every((answer:unknown)=>typeof answer==="string"&&answer.length<=700))return null;
    return [...item.answers] as string[];
  }catch{return null;}
}
export function writeLosFutureEvidenceAnswer(task:LosFutureEvidenceTask,answers:readonly string[]):string{
  if(answers.length!==2||answers.some(v=>typeof v!=="string"||v.length>700))throw Error("Invalid LOS T03/R01 answer");
  if(answers.every(v=>!v.trim()))return "";
  return JSON.stringify({version:1,id:task.id,sourceText:task.sourceText,answers:[...answers]});
}
