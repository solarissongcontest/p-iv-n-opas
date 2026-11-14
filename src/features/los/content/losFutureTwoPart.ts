import type {LosFutureExerciseDraft} from "./losFutureExerciseTypes.ts";

/** The source manuscript T10 and T13 each ask for two distinct operations.
 * Preserve their original text; no fabricated feedback or machine grade. */
export type LosFutureTwoPartTask={
  kind:"correction"|"text-b";
  sourceText:string;
  questions:readonly [string,string];
  languages:readonly ["de","fi"]|readonly ["fi","fi"];
};
const correctionPrefix="Korjaa virheellinen lause ";
const correctionSuffix=" ja selitä, miksi alkuperäinen muoto ei sovi.";
const textPrefix="Lue Text B: ";
const textPivot=". Etsi siitä kaksi konkreettista asiaa";
export function losFutureTwoPartTask(task:LosFutureExerciseDraft):LosFutureTwoPartTask|null {
  if(/-T10$/.test(task.id)&&task.title==="Korjaa oppijan kielivirhe"&&
    task.prompt.startsWith(correctionPrefix)&&task.prompt.endsWith(correctionSuffix)){
    const sourceText=task.prompt.slice(correctionPrefix.length,-correctionSuffix.length).trim();
    if(!sourceText||sourceText.length>400)return null;
    return {kind:"correction",sourceText,
      questions:["Kirjoita korjattu lause saksaksi","Selitä suomeksi, miksi alkuperäinen lause on virheellinen"],
      languages:["de","fi"]};
  }
  if(/-T13$/.test(task.id)&&task.title==="Erillisen Text B:n tulkinta"&&task.prompt.startsWith(textPrefix)){
    const pivot=task.prompt.indexOf(textPivot,textPrefix.length);
    if(pivot<textPrefix.length)return null;
    const sourceText=task.prompt.slice(textPrefix.length,pivot+1).trim();
    if(!sourceText||sourceText.length>400)return null;
    return {kind:"text-b",sourceText,
      questions:["Poimi Text B:stä ensimmäinen konkreettinen tieto ja selitä se suomeksi",
        "Poimi Text B:stä toinen, eri tieto ja selitä se suomeksi"],
      languages:["fi","fi"]};
  }
  return null;
}
/** Incompatible old prose remains untouched. Return null for legacy drafts. */
export function readLosFutureTwoPartAnswer(value:string,task:LosFutureTwoPartTask):string[]|null{
  if(!value)return ["",""];
  try{
    const parsed:unknown=JSON.parse(value);
    if(!parsed||typeof parsed!=="object"||Array.isArray(parsed))return null;
    const row=parsed as {version?:unknown;kind?:unknown;sourceText?:unknown;answers?:unknown};
    const answers=row.answers;
    if(row.version!==1||row.kind!==task.kind||row.sourceText!==task.sourceText||
      !Array.isArray(answers)||answers.length!==2||
      !answers.every((v:unknown)=>typeof v==="string"&&v.length<=600))return null;
    return [...answers] as string[];
  }catch{return null;}
}
export function writeLosFutureTwoPartAnswer(task:LosFutureTwoPartTask,answers:readonly string[]):string{
  if(answers.length!==2||answers.some(v=>typeof v!=="string"||v.length>600))
    throw Error("Invalid LOS T10/T13 answer");
  if(answers.every(v=>!v.trim()))return "";
  return JSON.stringify({version:1,kind:task.kind,sourceText:task.sourceText,answers:[...answers]});
}
