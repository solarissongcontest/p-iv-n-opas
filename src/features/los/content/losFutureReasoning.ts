import type {LosFutureExerciseDraft} from "./losFutureExerciseTypes.ts";
import {LOS_FUTURE_MANUSCRIPTS} from "./losFutureManuscripts.ts";

/** Exact source T11 requires an explanation + German illustration + locating
 * the rule; R03 requires three German statements with *their own* textual
 * evidence. No claims about automated grading or language certification. */
export type LosFutureReasoningPart={label:string;lang:"fi"|"de"};
export type LosFutureReasoningTask={
  id:string;kind:"grammar"|"claims";sourceText:string;
  sourceTitle:string;prompt:string;parts:readonly LosFutureReasoningPart[];
};
export function losFutureReasoningTask(task:LosFutureExerciseDraft):LosFutureReasoningTask|null{
  const m=task.id.match(/^LOS([2-8])-C(0[1-9]|10)-(T11|R03)$/);
  if(!m)return null;
  const book=Number(m[1]),chapter=m[2]!;
  const manuscript=LOS_FUTURE_MANUSCRIPTS[book]?.[chapter];
  if(!manuscript)return null;
  if(m[3]==="T11"&&task.title==="Kieliopin selitys omin sanoin"&&
    task.prompt.startsWith("Selitä suomeksi kappaleen sääntö ")&&
    task.prompt.includes("Osoita saksankielisestä esimerkistä")){
    return {id:task.id,kind:"grammar",sourceTitle:"Kieliopin käsiteltävä sääntö",
      sourceText:manuscript.grammarTopic,prompt:task.prompt,parts:[
        {label:"Selitä kappaleen sääntö omin sanoin suomeksi",lang:"fi"},
        {label:"Kirjoita havainnollistava saksankielinen esimerkkilause",lang:"de"},
        {label:"Selitä suomeksi, mihin esimerkin sanaan tai rakenteeseen sääntö vaikuttaa",lang:"fi"},
      ]};
  }
  if(m[3]==="R03"&&task.title==="reading-inference"&&
    task.prompt.startsWith("Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi.")&&
    manuscript.textA.length>=20&&manuscript.textA.length<=2000){
    const parts:LosFutureReasoningPart[]=[];
    for(let n=1;n<=3;n++){
      parts.push({label:`Väite ${n}: totta oleva asia saksaksi`,lang:"de"});
      parts.push({label:`Väitteen ${n} lähdetodiste: tarkka saksankielinen tekstikohta`,lang:"de"});
    }
    return {id:task.id,kind:"claims",sourceTitle:"Alkuperäinen Text A",
      sourceText:manuscript.textA,prompt:task.prompt,parts};
  }
  return null;
}
/** Fail closed on incompatible manuscripts, leaving earlier prose unmodified. */
export function readLosFutureReasoningAnswer(value:string,task:LosFutureReasoningTask):string[]|null{
  if(!value)return task.parts.map(()=>"");
  try{
    const parsed:unknown=JSON.parse(value);
    if(!parsed||typeof parsed!=="object"||Array.isArray(parsed))return null;
    const row=parsed as {version?:unknown;id?:unknown;kind?:unknown;
      prompt?:unknown;sourceText?:unknown;answers?:unknown};
    if(row.version!==1||row.id!==task.id||row.kind!==task.kind||
      row.prompt!==task.prompt||row.sourceText!==task.sourceText||
      !Array.isArray(row.answers)||row.answers.length!==task.parts.length||
      !row.answers.every((x:unknown)=>typeof x==="string"&&x.length<=350))return null;
    return [...row.answers] as string[];
  }catch{return null;}
}
export function writeLosFutureReasoningAnswer(task:LosFutureReasoningTask,answers:readonly string[]):string{
  if(answers.length!==task.parts.length||
    answers.some(x=>typeof x!=="string"||x.length>350))throw Error("Invalid source reasoning answers");
  if(answers.every(x=>!x.trim()))return "";
  return JSON.stringify({version:1,id:task.id,kind:task.kind,
    prompt:task.prompt,sourceText:task.sourceText,answers:[...answers]});
}
