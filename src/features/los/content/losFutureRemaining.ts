import type {LosFutureExerciseDraft} from "./losFutureExerciseTypes.ts";
import {LOS_FUTURE_MANUSCRIPTS} from "./losFutureManuscripts.ts";

/** The remaining seven original task types. All content is taken from the
 * same LOS! chapter manuscript. This is NOT speech recognition or grading. */
export type LosFutureRemainingKind="prediction"|"pronunciation"|"question"|"transform"|"writing"|"words"|"summary";
export type LosFutureRemainingField={label:string;lang:"fi"|"de";max:number;rows:number;optional?:boolean};
export type LosFutureRemainingTask={id:string;kind:LosFutureRemainingKind;prompt:string;
  sourceText:string;intro:string;sourceTitle:string;fields:readonly LosFutureRemainingField[]};
const fi=(label:string,max=350,optional=false):LosFutureRemainingField=>({label,lang:"fi",max,rows:max>=600?4:2,optional});
const de=(label:string,max=350,optional=false):LosFutureRemainingField=>({label,lang:"de",max,rows:max>=600?5:2,optional});
/** R04 used to recommend the *first token* (often a person's name) as
 * vocabulary. Recognize only that exact old prompt for the unchanged Text A. */
export const LOS_FUTURE_WORDS_PROMPT="Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Valitse tekstistä kolme merkityksellistä sanaa tai ilmausta; älä poimi automaattisesti tekstin ensimmäistä sanaa tai henkilönnimeä.";
const formerWordsPrompt=(textA:string)=>{
  const first=textA.match(/^[^\p{L}\p{N}]*([\p{L}\p{N}]+)/u)?.[1];
  return first
    ? `Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Aloita sanasta tai ilmauksesta “${first}” vain, jos et tunne sitä.`
    : null;
};
export function losFutureRemainingTask(task:LosFutureExerciseDraft):LosFutureRemainingTask|null{
  const m=task.id.match(/^LOS([2-8])-C(0[1-9]|10)-(T01|T15|T16|T17|T18|R04|R05)$/);
  if(!m)return null;
  const chapter=LOS_FUTURE_MANUSCRIPTS[Number(m[1])]?.[m[2]!];
  if(!chapter)return null;
  const prefix={id:task.id,prompt:task.prompt,intro:""};
  switch(m[3]){
  case "T01":
    if(task.title!=="Ennusta tilanne"||!task.prompt.startsWith("Lue otsikko ")||
      !task.prompt.includes("Kirjoita kaksi asiaa")||!chapter.textA)return null;
    return {...prefix,kind:"prediction",intro:chapter.intro,sourceTitle:"Text A, avautuu ennakoinnin jälkeen",
      sourceText:chapter.textA,fields:[
        fi("Ensimmäinen ennustus: mitä tekstissä voisi tapahtua?"),
        fi("Toinen erilainen ennustus: mitä muuta tekstissä voisi tapahtua?"),
        fi("Lue Text A ja arvioi suomeksi, kumpi ennustus vastasi tekstin sisältöä",500)]};
  case "T15": {
    const note=". Ääntämisen mallia ei ole vielä sisällytetty.";
    if(task.title!=="Harjoittele puheen rytmiä"||
      !task.prompt.startsWith("Lue ääneen kaksi kertaa: ")||
      !task.answerKey.startsWith("Tekstit: ")||!task.answerKey.endsWith(note))return null;
    const texts=task.answerKey.slice("Tekstit: ".length,-note.length).split(" | ");
    if(texts.length!==2||texts.some(text=>!text.trim()))return null;
    return {...prefix,kind:"pronunciation",sourceTitle:"Kaksi alkuperäistä harjoituslausetta",
      sourceText:texts.join("\n"),fields:[
        de("Kirjoita ensimmäinen lause ja merkitse tarkistamasi painot",300),
        de("Kirjoita toinen lause ja merkitse tarkistamasi painot",300),
        fi("Kerro, luitko lauseet kaksi kertaa ja mistä tarkistit ääntämisen. Jos lähde puuttuu, kirjoita se.",450)]};
  }
  case "T16": {
    const begin="Keksi kysymys, johon vastaus voisi olla ";
    const pivot=". Varmista, että kysymys sopii tilaisuuteen ";
    const at=task.prompt.indexOf(pivot);
    if(task.title!=="Rakenna uusi kysymys"||!task.prompt.startsWith(begin)||at<begin.length)return null;
    return {...prefix,kind:"question",sourceTitle:"Annettu vastaus tai lähtöilmaus",
      sourceText:task.prompt.slice(begin.length,at+1),fields:[
        de("Kirjoita oma tilannetta vastaava saksankielinen kysymys",350),
        fi("Tarkista kysymysmerkki, taivutetun verbin paikka ja kysymyksen mielekkyys",350)]};
  }
  case "T17": {
    const begin="Kirjoita mallilause ";
    const pivot=" uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu.";
    const at=task.prompt.indexOf(pivot);
    if(task.title!=="Muokkaa henkilötietoa"||!task.prompt.startsWith(begin)||at<begin.length)return null;
    return {...prefix,kind:"transform",sourceTitle:"Alkuperäinen muokattava lause",
      sourceText:task.prompt.slice(begin.length,at),fields:[
        de("Kirjoita oma muokattu saksankielinen lause",450),
        fi("Mikä henkilö, aika tai paikka vaihtui?",250),
        fi("Muuttuiko verbi tai artikkeli? Kerro miksi tai miksi ei",350)]};
  }
  case "T18":
    if(task.title!=="Tuota kappaleen oma teksti"||
      !task.prompt.includes("Kirjoita ")||!task.prompt.includes("omaa lausetta"))return null;
    return {...prefix,kind:"writing",sourceTitle:"Kappaleen kielioppiaihe",
      sourceText:chapter.grammarTopic,fields:[
        de("Oma ensimmäinen saksankielinen tekstiluonnos",1700),
        fi("Tarkista kielioppi, sanasto, ymmärrettävyys ja tekstilaji. Kirjaa korjattavat asiat.",450),
        de("Kirjoita korjattu oma teksti saksaksi",1700)]};
  case "R04":
    if(task.title!=="vocab-in-context"||
      !task.prompt.startsWith("Etsi päätekstistä kolme sinulle uutta sanaa.")||
      chapter.textA.length<20||chapter.textA.length>2000)return null;
    return {...prefix,kind:"words",sourceTitle:"Alkuperäinen Text A",
      sourceText:chapter.textA,fields:Array.from({length:3},(_,i)=>[
        de("Sana "+(i+1)+" alkuperäisestä tekstistä",160),
        de("Sanan "+(i+1)+" täsmällinen sanayhteys tai tekstikohta",180),
        fi("Sanan "+(i+1)+" päätelty merkitys ja kontekstin antama vihje",220),
      ]).flat()};
  case "R05":
    if(task.title!=="text-summary"||
      !task.prompt.startsWith("Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi.")||
      chapter.textA.length<20||chapter.textA.length>2000)return null;
    return {...prefix,kind:"summary",sourceTitle:"Alkuperäinen Text A",
      sourceText:chapter.textA,fields:[
        de("Tiivistelmän ensimmäinen saksankielinen virke",300),
        de("Tiivistelmän toinen saksankielinen virke",300),
        de("Kolmas saksankielinen virke, jos tarvitset sen",300,true),
        fi("Miten tarkistit pääasian ja kappaleen opitun rakenteen?",350)]};
  }
  return null;
}
export type LosFutureRemainingAnswer={version:1;id:string;kind:LosFutureRemainingKind;
  prompt:string;intro:string;sourceText:string;answers:string[];
  /** UI-only legacy prompt notice; deliberately not included in saved JSON. */
  legacyPromptUpdated?:boolean;};
const empty=(t:LosFutureRemainingTask):LosFutureRemainingAnswer=>({
  version:1,id:t.id,kind:t.kind,prompt:t.prompt,intro:t.intro,
  sourceText:t.sourceText,answers:t.fields.map(()=>"")});
export function readLosFutureRemainingAnswer(raw:string,t:LosFutureRemainingTask):LosFutureRemainingAnswer|null{
  if(!raw)return empty(t);
  try{
    const parsed:unknown=JSON.parse(raw);
    if(!parsed||typeof parsed!=="object"||Array.isArray(parsed))return null;
    const a=parsed as Partial<LosFutureRemainingAnswer>;
    const oldPrompt=t.kind==="words"&&t.prompt===LOS_FUTURE_WORDS_PROMPT
      ? formerWordsPrompt(t.sourceText):null;
    const migrated=Boolean(oldPrompt&&a.prompt===oldPrompt);
    if(Object.keys(a).sort().join(",")!=="answers,id,intro,kind,prompt,sourceText,version"||
      a.version!==1||a.id!==t.id||a.kind!==t.kind||
      (a.prompt!==t.prompt&&!migrated)||
      a.intro!==t.intro||a.sourceText!==t.sourceText||
      !Array.isArray(a.answers)||a.answers.length!==t.fields.length||
      !a.answers.every((v,i)=>typeof v==="string"&&v.length<=t.fields[i]!.max))return null;
    return migrated
      ? {...a,prompt:t.prompt,legacyPromptUpdated:true} as LosFutureRemainingAnswer
      : a as LosFutureRemainingAnswer;
  }catch{return null;}
}
export function writeLosFutureRemainingAnswer(t:LosFutureRemainingTask,answers:readonly string[]):string{
  if(answers.length!==t.fields.length||answers.some((v,i)=>
    typeof v!=="string"||v.length>t.fields[i]!.max))throw Error("Invalid LOS remaining task draft");
  if(answers.every(v=>!v.trim()))return "";
  const raw=JSON.stringify({...empty(t),answers:[...answers]});
  if(raw.length>4800)throw Error("LOS remaining task draft exceeds safe storage limit");
  return raw;
}
export function losFutureRemainingComplete(t:LosFutureRemainingTask,answer:LosFutureRemainingAnswer):boolean{
  return t.fields.every((field,i)=>field.optional||Boolean(answer.answers[i]?.trim()));
}
