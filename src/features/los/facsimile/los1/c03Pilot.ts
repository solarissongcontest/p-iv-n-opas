/**
 * LOS! 1 C03: 14 B5 draft leaves using the actual digital book content.
 * Original Text A is the full eight-turn M-WB-07; Text B REUSES the
 * full four-turn M-COM-02 already introduced in C02. No new audio or
 * fabricated photographed people, folios or publication clearance.
 */
import {LOS_BOOKS} from "../../catalog.ts";
import {LOS_EXERCISES} from "../../exerciseBank.ts";
import {getLosOpenDialogue} from "../../content/los1OpenDialogues.ts";
import {LOS1_M_COM_02_LINES,LOS1_M_COM_02_QUESTIONS,LOS1_M_COM_02_ID}
  from "../../content/los1MCom02.ts";
import {LOS1_CULTURE} from "../../content/los1Culture.ts";
import {getLosChapterSourceGate} from "../../content/sourceRegistry.ts";

export const LOS1_C03_PILOT_ID="los1-c03-b5-draft-1" as const;
export const LOS1_C03_FORMAT={widthMm:176,heightMm:250} as const;
export type LosC03Section=
 "chapter"|"text"|"understand"|"vocabulary"|"grammar"|"text-b"|
 "text-b-understand"|"practice"|"apply"|"culture"|"test"|"appendix";
export type LosC03PrintPage={
  pageId:string;pdfPageIndex:number;printedPageLabel:null;
  physicalSide:"left"|"right";kind:"chapter-open"|"content"|"appendix";
  chapterId:"03";section:LosC03Section;title:string;subtitle:string;
  sourceLineIds:readonly string[];questionIds:readonly string[];
  exerciseIds:readonly string[];contentBlockIds:readonly string[];
  mediaIds:readonly string[];imageIds:readonly string[];status:"draft";
};

const book=LOS_BOOKS.find(b=>b.id===1);
if(!book)throw Error("LOS! 1 puuttuu kirjakatalogista.");
const chapter=book.chapters.find(ch=>ch.id==="03");
if(!chapter)throw Error("LOS! 1 C03 puuttuu kirjakatalogista.");
function requireC03Source(){
  const result=getLosOpenDialogue("03");
  if(!result)throw Error("LOS! 1 C03:n autenttinen lähde puuttuu.");
  return result;
}
const source=requireC03Source();
export const LOS1_C03_PRINT_CHAPTER=chapter;
export const LOS1_C03_SOURCE=source;
export const LOS1_C03_TEXT_A=source.originalLines;
export const LOS1_C03_TEXT_B=LOS1_M_COM_02_LINES;
export const LOS1_C03_SOURCE_QUESTIONS=source.questions;
export const LOS1_C03_TEXT_B_REVIEW_QUESTIONS=LOS1_M_COM_02_QUESTIONS;
export const LOS1_C03_CULTURE=LOS1_CULTURE["03"];
export const LOS1_C03_EXERCISES=LOS_EXERCISES.filter(x=>x.chapterId==="03");
export const LOS1_C03_SOURCE_GATE=getLosChapterSourceGate("03");
export const LOS1_C03_TEXT_B_IS_REUSED_FROM_C02=true as const;

type Draft=Omit<LosC03PrintPage,
  "chapterId"|"pdfPageIndex"|"printedPageLabel"|"physicalSide"|"status">;
const make=(id:string,section:LosC03Section,title:string,subtitle:string,
  extra:Partial<Draft>={}):Draft=>({
    pageId:"c03-"+id,kind:section==="chapter"?"chapter-open":
      section==="appendix"?"appendix":"content",
    section,title,subtitle,sourceLineIds:[],questionIds:[],
    exerciseIds:[],contentBlockIds:["c03-"+id],mediaIds:[],imageIds:[],...extra,
  });
const plan:readonly Draft[]=[
  make("open-left","chapter","03 · Woher kommst du?","Maat ja kotipaikat"),
  make("open-right","chapter","Aloita tästä","Tavoitteet ja johdanto"),
  make("text-a","text","Text A · Lisa Müller","Alkuperäinen kahdeksan repliikin keskustelu",
    {sourceLineIds:source.originalLines.map(l=>l.id),mediaIds:[source.sourceId]}),
  make("verstehen","understand","Verstehen · Ymmärrä","Neljä kysymystä Lisa Müllerin kertomuksesta",
    {questionIds:source.questions.map(q=>q.id)}),
  make("vocabulary","vocabulary","Wortschatz · Maat ja kaupungit","Kappaleen aktiivisanasto"),
  make("grammar","grammar","Grammatik · woher, komme, kommst","Lähtöpaikkakysymys ja kommen"),
  make("text-b","text-b","Text B · Thomas und Takashi","C02:ssa esitelty autenttinen aineisto uudessa harjoituksessa",
    {sourceLineIds:LOS1_M_COM_02_LINES.map(l=>l.id),mediaIds:[LOS1_M_COM_02_ID]}),
  make("text-b-questions","text-b-understand","Verstehen · Text B","C02:n lähdekysymykset uudelleen alkuperäisen tunnistamiseen",
    {questionIds:LOS1_M_COM_02_QUESTIONS.map(q=>q.id)}),
  make("practice-1","practice","Üben · Harjoittele I","Maat, lähtöpaikat ja kommen",
    {exerciseIds:LOS1_C03_EXERCISES.slice(0,6).map(q=>q.id)}),
  make("practice-2","practice","Üben · Harjoittele II","Sanajärjestys ja lähtömaiden muodot",
    {exerciseIds:LOS1_C03_EXERCISES.slice(6,11).map(q=>q.id)}),
  make("apply","apply","Anwenden · Oma kotipaikka","Omien lauseiden kirjoittaminen"),
  make("culture","culture","Land und Leute · DACH","Saksan puhujien maita ja alueita",
    {questionIds:LOS1_CULTURE["03"].questions.map(q=>q.id)}),
  make("test","test","Das kann ich schon!","Kappaleen viimeiset itsearviointitehtävät",
    {exerciseIds:LOS1_C03_EXERCISES.slice(11).map(q=>q.id)}),
  make("sources","appendix","Quellen · Lähteet","Lähteiden lisenssit ja avoimet hyväksyntäportit",
    {mediaIds:[source.sourceId,LOS1_M_COM_02_ID]}),
];
export const LOS1_C03_PRINT_PAGES:readonly LosC03PrintPage[]=plan.map((p,i)=>({
 ...p,chapterId:"03",pdfPageIndex:i,printedPageLabel:null,
 physicalSide:i%2===0?"left":"right",status:"draft",
}));
export function validateLos1C03Print():string[]{
  const issues:string[]=[];
  const printedIds=new Set<string>();
  for(const [index,page] of LOS1_C03_PRINT_PAGES.entries()){
    if(printedIds.has(page.pageId))issues.push("Toistuva sivutunnus: "+page.pageId);
    printedIds.add(page.pageId);
    if(page.pdfPageIndex!==index||page.printedPageLabel!==null||
      page.status!=="draft"||page.chapterId!=="03"||
      page.physicalSide!==(index%2===0?"left":"right"))
      issues.push("Virheellinen luonnossivun metadata: "+page.pageId);
    if(page.imageIds.length>0)
      issues.push("Kuvien käyttöoikeutta ei ole vahvistettu: "+page.pageId);
  }
  if(LOS1_C03_PRINT_PAGES.length!==14||LOS1_C03_PRINT_PAGES[0]?.pageId!=="c03-open-left")
    issues.push("C03:n taitossa pitää olla 14 lehteä ja kahden sivun avaus.");
  const turns=(section:LosC03Section)=>LOS1_C03_PRINT_PAGES
    .filter(p=>p.section===section).flatMap(p=>p.sourceLineIds);
  if(turns("text").join("|")!==source.originalLines.map(l=>l.id).join("|"))
    issues.push("Text A:n kahdeksan vuoroa puuttuvat tai ovat väärässä järjestyksessä.");
  if(turns("text-b").join("|")!==LOS1_M_COM_02_LINES.map(l=>l.id).join("|"))
    issues.push("Text B:n neljä vuoroa puuttuvat tai ovat väärässä järjestyksessä.");
  const exerciseIds=LOS1_C03_PRINT_PAGES.flatMap(p=>p.exerciseIds);
  if(exerciseIds.join("|")!==LOS1_C03_EXERCISES.map(x=>x.id).join("|")||
    new Set(exerciseIds).size!==exerciseIds.length)
    issues.push("C03:n tehtäväpankin tehtävä on lisätty väärin.");
  const questionIds=LOS1_C03_PRINT_PAGES.flatMap(p=>p.questionIds);
  const expected=[...source.questions,...LOS1_M_COM_02_QUESTIONS,
    ...LOS1_CULTURE["03"].questions].map(q=>q.id);
  if(questionIds.join("|")!==expected.join("|")||new Set(questionIds).size!==questionIds.length)
    issues.push("Text A-, Text B- tai DACH-kysymyksiä puuttuu.");
  if(LOS1_C03_SOURCE_GATE.sourceId!==source.sourceId)
    issues.push("Ensisijainen Text A -lähde ei vastaa lähderekisteriä.");
  return issues;
}
