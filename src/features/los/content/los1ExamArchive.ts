/**
 * Versioned, compact, locally saved objective exam snapshots.
 * The practiceAnswers draft slot already backs up to JSON and supports cloud
 * conflict checks. No schema migration and no destructive retake.
 * Each immutable entry stores the selected options AND the score obtained
 * at submission, so later bank revisions cannot retroactively regrade it.
 */
export type LosExamArchivePrefix="EX-MID"|"EX-FINAL";
export type LosArchiveQuestion={
 id:string;section:string;correctId:"a"|"b"|"c";
 choices:readonly {id:"a"|"b"|"c";text:string}[];
};
export type LosArchivedSection={section:string;correct:number;total:number};
export type LosArchivedExam={
 number:number;submittedAt:string;correct:number;total:number;
 choices:string;sections:readonly LosArchivedSection[];
};
const MAX_ATTEMPTS=99;
const keyFor=(prefix:LosExamArchivePrefix,number:number)=>
 prefix+"-ARCHIVE-"+String(number).padStart(2,"0");
const isNonnegativeInteger=(value:unknown):value is number=>
 typeof value==="number"&&Number.isInteger(value)&&value>=0;
const validIso=(value:unknown):value is string=>
 typeof value==="string"&&value.length<41&&!Number.isNaN(Date.parse(value))&&/\d{4}-\d{2}-\d{2}T/.test(value);

export function losArchivedExamHistory(
 answers:Readonly<Record<string,string>>,prefix:LosExamArchivePrefix,
):readonly LosArchivedExam[]{
 const records:LosArchivedExam[]=[];
 for(const [key,serialized] of Object.entries(answers)){
  const match=key.match(new RegExp("^"+prefix+"-ARCHIVE-([0-9]{2})$"));
  if(!match||typeof serialized!=="string"||serialized.length>500)continue;
  const number=Number(match[1]);
  if(number<1||number>MAX_ATTEMPTS)continue;
  try{
   const raw=JSON.parse(serialized) as Record<string,unknown>;
   if(raw.v!==1||!validIso(raw.at)||typeof raw.choices!=="string"||
     !/^[abc]+$/.test(raw.choices)||!isNonnegativeInteger(raw.correct)||
     !isNonnegativeInteger(raw.total)||raw.correct>raw.total||
     raw.total!==raw.choices.length||!Array.isArray(raw.sections))continue;
   const sections:LosArchivedSection[]=[];
   for(const entry of raw.sections){
    if(!Array.isArray(entry)||entry.length!==3||typeof entry[0]!=="string"||
      entry[0].length>40||!isNonnegativeInteger(entry[1])||
      !isNonnegativeInteger(entry[2])||entry[1]>entry[2])break;
    sections.push({section:entry[0],correct:entry[1],total:entry[2]});
   }
   if(sections.length!==raw.sections.length||
     sections.reduce((n,item)=>n+item.total,0)!==raw.total||
     sections.reduce((n,item)=>n+item.correct,0)!==raw.correct)continue;
   records.push({number,submittedAt:raw.at,correct:raw.correct,total:raw.total,
     choices:raw.choices,sections});
  }catch{ /* Corrupt imported archive is ignored, not used to award points. */ }
 }
 return records.sort((a,b)=>a.number-b.number);
}
export function losArchiveExamAttempt(
 existing:Readonly<Record<string,string>>,prefix:LosExamArchivePrefix,
 questions:readonly LosArchiveQuestion[],
 answers:Readonly<Record<string,string>>,submittedAt:string,
):Record<string,string>{
 if(!validIso(submittedAt))throw new Error("Palautettu koe tarvitsee tallennetun palautusajan.");
 if(![25,50].includes(questions.length)||
   (prefix==="EX-MID"&&questions.length!==25)||
   (prefix==="EX-FINAL"&&questions.length!==50)||
   new Set(questions.map(q=>q.id)).size!==questions.length)
  throw new Error("Koetehtävät eivät vastaa tunnettua koepankkia.");
 if(!questions.every(q=>q.choices.some(option=>option.id===answers[q.id])))
  throw new Error("Aiemman kokeen vastauksia ei voida säilyttää kokonaisina. Älä poista yritystä.");
 const numbers=losArchivedExamHistory(existing,prefix).map(r=>r.number);
 // Include reserved keys even if their imported data is damaged.
 for(const key of Object.keys(existing)){
  const match=key.match(new RegExp("^"+prefix+"-ARCHIVE-([0-9]{2})$"));
  if(match)numbers.push(Number(match[1]));
 }
 const next=Math.max(0,...numbers)+1;
 if(next>MAX_ATTEMPTS||Object.keys(existing).length>=199)
  throw new Error("Koeyritysten arkisto on täynnä. Vie varmuuskopio ennen uusintaa.");
 const choices=questions.map(q=>answers[q.id]).join("");
 const groups=new Map<string,{correct:number;total:number}>();
 for(const q of questions){
  const group=groups.get(q.section)??{correct:0,total:0};
  group.total++;
  if(answers[q.id]===q.correctId)group.correct++;
  groups.set(q.section,group);
 }
 const correct=Array.from(groups.values()).reduce((n,item)=>n+item.correct,0);
 const sections=Array.from(groups,([section,result])=>[section,result.correct,result.total]);
 const packed=JSON.stringify({v:1,at:submittedAt,choices,correct,total:questions.length,sections});
 if(packed.length>500)throw new Error("Koetulos ei mahdu turvalliseen varmuuskopioformaattiin.");
 return {...existing,[keyFor(prefix,next)]:packed};
}
