import {losIsCorrect,type LosExercise} from "./exerciseBank.ts";

/** Immutable chapter-test snapshots in existing chapter-local JSON backups. */
export type LosChapterExamHistoryItem={
 number:number;submittedAt:string;correct:number;total:number;
 answers:readonly {id:string;answer:string}[];
};
const archivePrefix=(chapter:string)=>"C"+chapter+"-TEST-ARCHIVE-";
const numberKey=(chapter:string,n:number)=>archivePrefix(chapter)+String(n).padStart(2,"0");
const validDate=(value:unknown):value is string=>typeof value==="string"&&
 value.length<41&&!Number.isNaN(Date.parse(value))&&/\d{4}-\d{2}-\d{2}T/.test(value);
const safeNumber=(v:unknown):v is number=>typeof v==="number"&&Number.isInteger(v)&&v>=0;
const MAX_ARCHIVES=99;
const CHUNK_SIZE=440;
/**
 * Imported damaged archive fragments are not silently overwritten or
 * mistaken for graded work. The whole snapshot is recoverable from JSON.
 */
export function losChapterExamHistory(
 practice:Readonly<Record<string,string>>,chapter:string,
):readonly LosChapterExamHistoryItem[]{
 if(!/^\d{2}$/.test(chapter))return [];
 const entries:LosChapterExamHistoryItem[]=[];
 const pattern=new RegExp("^"+archivePrefix(chapter)+"([0-9]{2})$");
 for(const [key,record]of Object.entries(practice)){
  const match=key.match(pattern);if(!match||typeof record!=="string")continue;
  const number=Number(match[1]);if(!number||number>MAX_ARCHIVES)continue;
  try{
   const meta=JSON.parse(record) as Record<string,unknown>;
   if(meta["v"]!==1||!validDate(meta["at"])||!safeNumber(meta["correct"])||
     !safeNumber(meta["total"])||!safeNumber(meta["parts"])||
     meta["parts"]<1||meta["parts"]>20||meta["correct"]>meta["total"])continue;
   let encoded="";
   for(let i=1;i<=meta["parts"];i++){
    const chunk=practice[key+"-P"+String(i).padStart(2,"0")];
    if(typeof chunk!=="string"||chunk.length>CHUNK_SIZE)throw new Error("missing archived data");
    encoded+=chunk;
   }
   const pairs=JSON.parse(encoded) as unknown;
   if(!Array.isArray(pairs)||pairs.length!==meta["total"]||
      !pairs.every(item=>Array.isArray(item)&&item.length===2&&
       typeof item[0]==="string"&&item[0].length<100&&
       typeof item[1]==="string"&&item[1].length<=100))continue;
   const answerPairs=pairs as [string,string][];
   if(new Set(answerPairs.map(x=>x[0])).size!==answerPairs.length)continue;
   entries.push({number,submittedAt:meta["at"],correct:meta["correct"],total:meta["total"],
    answers:answerPairs.map(([id,answer])=>({id,answer}))});
  }catch{ /* A corrupted archive is ignored in the score UI, not rewritten. */ }
 }
 return entries.sort((a,b)=>a.number-b.number);
}
/**
 * Always archive submitted work BEFORE clearing answers for a retake.
 * Fails closed on partial submissions, too-large fields, or exceeded storage.
 */
export function losArchiveChapterExam(
 practice:Readonly<Record<string,string>>,
 chapter:string,exercises:readonly LosExercise[],
 answers:Readonly<Record<string,string>>,submittedAt:string,
):Record<string,string>{
 if(!/^\d{2}$/.test(chapter)||!validDate(submittedAt)||
    exercises.length<12||exercises.length>20||
    exercises.some(ex=>ex.chapterId!==chapter)||
    new Set(exercises.map(ex=>ex.id)).size!==exercises.length)
  throw new Error("Kappaletestin tiedot eivät ole luotettavasti arkistoitavissa.");
 if(exercises.some(ex=>!answers[ex.id]?.trim()||answers[ex.id]!.length>100))
  throw new Error("Vanhan kappaletestin kaikki vastaukset eivät ole tallella. Älä aloita uusintaa.");
 const prefix=archivePrefix(chapter);
 const pattern=new RegExp("^"+prefix+"([0-9]{2})$");
 const existing=Object.keys(practice).map(x=>x.match(pattern)).filter(
  (x):x is RegExpMatchArray=>Boolean(x)).map(x=>Number(x[1]));
 const next=Math.max(0,...existing)+1;
 if(next>MAX_ARCHIVES)throw new Error("Kappaletestissä on liikaa arkistoituja yrityksiä.");
 const key=numberKey(chapter,next);
 const serialized=JSON.stringify(exercises.map(ex=>[ex.id,answers[ex.id]]));
 const parts: string[]=[];
 for(let i=0;i<serialized.length;i+=CHUNK_SIZE)parts.push(serialized.slice(i,i+CHUNK_SIZE));
 if(parts.length>20)throw new Error("Vastaukset eivät mahdu turvalliseen arkistoon.");
 const correct=exercises.filter(ex=>losIsCorrect(ex,answers[ex.id]??"")).length;
 const updated:Record<string,string>={...practice,[key]:JSON.stringify({
  v:1,at:submittedAt,correct,total:exercises.length,parts:parts.length,
 })};
 for(let i=0;i<parts.length;i++)updated[key+"-P"+String(i+1).padStart(2,"0")]=parts[i]!;
 if(Object.keys(updated).length>200||Object.entries(updated).some(([k,v])=>
   k.length>100||v.length>500)||new TextEncoder().encode(JSON.stringify(updated)).length>64000)
  throw new Error("Kappaletestin arkisto on täynnä. Tee JSON-varmuuskopio ennen uusintaa.");
 return updated;
}
/** Reset only current chapter's drill answers, preserving source, culture, and archive evidence. */
export function losWithoutWorkbookAnswers(
 practice:Readonly<Record<string,string>>,exercises:readonly LosExercise[],
):Record<string,string>{
 const drillIds=new Set(exercises.map(ex=>ex.id));
 return Object.fromEntries(Object.entries(practice).filter(([id])=>!drillIds.has(id)));
}
