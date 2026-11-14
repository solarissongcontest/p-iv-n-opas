import type {LosFutureExerciseDraft} from "./losFutureExerciseTypes.ts";
import {LOS_FUTURE_MANUSCRIPTS} from "./losFutureManuscripts.ts";

/** T04 highlights a literal source excerpt; T14 compares two source genres.
 * No semantic or speech grading: both are formative self-review tasks. */
export type LosFutureSpanGenreTask={id:string;kind:"span"|"genre";prompt:string;dialogue:readonly string[];
  textB:string;questions:readonly [string,string]};
export type LosFutureSpanGenreAnswer={version:1;id:string;prompt:string;
  dialogue:string[];textB:string;selection:number|null;answers:string[]};
export function losFutureSpanGenreTask(t:LosFutureExerciseDraft):LosFutureSpanGenreTask|null{
  const m=t.id.match(/^LOS([2-8])-C(0[1-9]|10)-(T04|T14)$/);
  if(!m)return null;
  const chapter=LOS_FUTURE_MANUSCRIPTS[Number(m[1])]?.[m[2]!];
  if(!chapter||chapter.dialogue.length<2||chapter.dialogue.some(s=>!s.trim()))return null;
  if(m[3]==="T04"&&t.title==="Etsi täsmällinen ilmaus"&&
    t.prompt.startsWith("Etsi ja korosta tukidialogista kohta")){
    return {id:t.id,kind:"span",prompt:t.prompt,dialogue:chapter.dialogue,textB:"",
      questions:["Kopioi tarkka saksankielinen ilmaus valitsemastasi puheenvuorosta",
        "Selitä suomeksi, miten ilmaus auttaa vastaamaan kysymykseen"]};
  }
  if(m[3]==="T14"&&t.title==="Vertaa tekstilajeja"&&
    t.prompt.startsWith("Vertaa tukidialogia ja Text B -viestiä.")&&chapter.textB.trim()){
    return {id:t.id,kind:"genre",prompt:t.prompt,dialogue:chapter.dialogue,textB:chapter.textB,
      questions:["Havainto 1: vertaa tekstien vastaanottajaa tai tarkoitusta",
        "Havainto 2: vertaa tekstien tyyliä, sanastoa tai rakennetta"]};
  }
  return null;
}
const empty=(t:LosFutureSpanGenreTask):LosFutureSpanGenreAnswer=>({
  version:1,id:t.id,prompt:t.prompt,dialogue:[...t.dialogue],textB:t.textB,
  selection:null,answers:["",""]});
export function readLosFutureSpanGenreAnswer(raw:string,t:LosFutureSpanGenreTask):LosFutureSpanGenreAnswer|null{
  if(!raw)return empty(t);
  try{
    const d:unknown=JSON.parse(raw);
    if(!d||typeof d!=="object"||Array.isArray(d))return null;
    const a=d as Partial<LosFutureSpanGenreAnswer>;
    if(Object.keys(a).sort().join(",")!=="answers,dialogue,id,prompt,selection,textB,version"||
      a.version!==1||a.id!==t.id||a.prompt!==t.prompt||a.textB!==t.textB||
      !Array.isArray(a.dialogue)||a.dialogue.length!==t.dialogue.length||
      !t.dialogue.every((line,i)=>a.dialogue?.[i]===line)||
      !Array.isArray(a.answers)||a.answers.length!==2||
      !a.answers.every(v=>typeof v==="string"&&v.length<=500))return null;
    if(t.kind==="span"){
      if(a.selection!==null&&(!Number.isInteger(a.selection)||typeof a.selection!=="number"||
        a.selection<0||a.selection>=t.dialogue.length))return null;
    }else if(a.selection!==null)return null;
    return a as LosFutureSpanGenreAnswer;
  }catch{return null;}
}
export function writeLosFutureSpanGenreAnswer(
  t:LosFutureSpanGenreTask,selection:number|null,answers:readonly string[]):string{
  if(answers.length!==2||answers.some(v=>typeof v!=="string"||v.length>500)||
    (t.kind==="genre"&&selection!==null)||
    (selection!==null&&(!Number.isInteger(selection)||selection<0||
      selection>=t.dialogue.length)))throw Error("Invalid LOS span/genre draft");
  if(selection===null&&answers.every(v=>!v.trim()))return "";
  const packed=JSON.stringify({...empty(t),selection,answers:[...answers]});
  if(packed.length>4700)throw Error("LOS span/genre draft is too large");
  return packed;
}
export function losFutureExcerptInTurn(t:LosFutureSpanGenreTask,a:LosFutureSpanGenreAnswer):boolean{
  if(t.kind!=="span"||a.selection===null)return false;
  const line=t.dialogue[a.selection],excerpt=a.answers[0]?.trim();
  return Boolean(line&&excerpt&&line.toLocaleLowerCase("de").includes(excerpt.toLocaleLowerCase("de")));
}
export function losFutureSpanGenreComplete(t:LosFutureSpanGenreTask,a:LosFutureSpanGenreAnswer):boolean{
  return a.answers.every(v=>Boolean(v.trim()))&&(t.kind==="genre"||losFutureExcerptInTurn(t,a));
}
