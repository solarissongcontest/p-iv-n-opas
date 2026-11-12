/**
 * LOS! 1 · C02 Ich heiße … B5 print chapter pilot.
 * The full six-turn M-WB-01 and full four-turn M-COM-02 are drawn from
 * the EXISTING digital book. Not a released edition, not approved audio.
 * All numbers are local 0-based pilot indices, never official folios.
 */
import {LOS_BOOKS} from "../../catalog.ts";
import {LOS_EXERCISES} from "../../exerciseBank.ts";
import {LOS1_C02_LINES,LOS1_C02_QUESTIONS,LOS1_C02_SOURCE_ID} from "../../content/los1C02.ts";
import {LOS1_M_COM_02_LINES,LOS1_M_COM_02_QUESTIONS,LOS1_M_COM_02_ID} from "../../content/los1MCom02.ts";
import {LOS1_CULTURE} from "../../content/los1Culture.ts";
import {getLosChapterSourceGate} from "../../content/sourceRegistry.ts";

export const LOS1_C02_PILOT_ID="los1-c02-b5-draft-1" as const;
export const LOS1_C02_FORMAT={widthMm:176,heightMm:250} as const;
export type LosC02PrintSection=
  "chapter"|"text"|"understand"|"vocabulary"|"grammar"|
  "text-b"|"text-b-understand"|"practice"|"apply"|"culture"|"test"|"appendix";
export type LosC02PageKind="chapter-open"|"content"|"appendix";
export type LosC02PrintPage={
  pageId:string;
  pdfPageIndex:number;
  printedPageLabel:null;
  physicalSide:"left"|"right";
  kind:LosC02PageKind;
  chapterId:"02";
  section:LosC02PrintSection;
  title:string;
  subtitle:string;
  sourceLineIds:readonly string[];
  questionIds:readonly string[];
  exerciseIds:readonly string[];
  contentBlockIds:readonly string[];
  mediaIds:readonly string[];
  imageIds:readonly string[];
  status:"draft";
};
const book=LOS_BOOKS.find(b=>b.id===1);
if(!book)throw Error("LOS! 1 missing from the book catalog.");
const chapter=book.chapters.find(ch=>ch.id==="02");
if(!chapter)throw Error("LOS! 1 C02 missing from the book catalog.");
export const LOS1_C02_PRINT_CHAPTER=chapter;
export const LOS1_C02_TEXT_A=LOS1_C02_LINES;
export const LOS1_C02_TEXT_B=LOS1_M_COM_02_LINES;
export const LOS1_C02_SOURCE_QUESTIONS=LOS1_C02_QUESTIONS;
export const LOS1_C02_TEXT_B_QUESTIONS=LOS1_M_COM_02_QUESTIONS;
export const LOS1_C02_CULTURE=LOS1_CULTURE["02"];
export const LOS1_C02_EXERCISES=LOS_EXERCISES.filter(ex=>ex.chapterId==="02");
export const LOS1_C02_SOURCE_GATE=getLosChapterSourceGate("02");

type PageDraft=Omit<LosC02PrintPage,
  "pdfPageIndex"|"printedPageLabel"|"physicalSide"|"status"|"chapterId">;
const make=(id:string,section:LosC02PrintSection,title:string,
  subtitle:string,rest:Partial<PageDraft>={}):PageDraft=>({
  pageId:"c02-"+id,kind:section==="chapter"?"chapter-open":
    section==="appendix"?"appendix":"content",
  section,title,subtitle,sourceLineIds:[],questionIds:[],exerciseIds:[],
  contentBlockIds:["c02-"+id],mediaIds:[],imageIds:[],...rest,
});
const draft:readonly PageDraft[]=[
  make("open-left","chapter","02 · Ich heiße …","Nimet ja esittäytyminen",
    {imageIds:[]}), // portrait photo pending license + print-resolution review
  make("open-right","chapter","Aloita tästä","Tavoitteet ja johdanto"),
  make("text-a","text","Text A · Franz und Greta","Koko kuuden repliikin alkuperäisteksti",
    {sourceLineIds:LOS1_C02_LINES.map(l=>l.id),mediaIds:[LOS1_C02_SOURCE_ID]}),
  make("verstehen","understand","Verstehen · Ymmärrä","Neljä kysymystä Text A:sta",
    {questionIds:LOS1_C02_QUESTIONS.map(q=>q.id)}),
  make("vocabulary","vocabulary","Wortschatz · Sanasto","Aktiiviset nimet ja esittäytymisfraasit"),
  make("grammar","grammar","Grammatik · heiße, heißt, bin, bist","Ich ja du ensimmäisissä verbimuodoissa"),
  make("text-b","text-b","Text B · Thomas, Takashi und Peter","Koko alkuperäinen neljän vuoron tekstilitteraatti",
    {sourceLineIds:LOS1_M_COM_02_LINES.map(l=>l.id),mediaIds:[LOS1_M_COM_02_ID]}),
  make("text-b-questions","text-b-understand","Verstehen · Text B","Neljä kysymystä toisesta tekstistä",
    {questionIds:LOS1_M_COM_02_QUESTIONS.map(q=>q.id)}),
  make("practice-1","practice","Üben · Harjoittele I","Nimien ja verbimuotojen harjoitukset",
    {exerciseIds:LOS1_C02_EXERCISES.slice(0,6).map(q=>q.id)}),
  make("practice-2","practice","Üben · Harjoittele II","Kysymys ja vastaus",
    {exerciseIds:LOS1_C02_EXERCISES.slice(6,11).map(q=>q.id)}),
  make("apply","apply","Anwenden · Käytä saksaa","Oma esittäytyminen paperille"),
  make("culture","culture","Land und Leute · Puhuttelu","Herr, Frau ja sukunimi",
    {questionIds:LOS1_CULTURE["02"].questions.map(q=>q.id)}),
  make("test","test","Das kann ich schon!","Kappaleen itsearviointitehtävät",
    {exerciseIds:LOS1_C02_EXERCISES.slice(11).map(q=>q.id)}),
  make("sources","appendix","Quellen · Lähteet","Lähde- ja lisenssitiedot",
    {mediaIds:[LOS1_C02_SOURCE_ID,LOS1_M_COM_02_ID]}),
];
export const LOS1_C02_PRINT_PAGES:readonly LosC02PrintPage[]=draft.map((p,i)=>({
  ...p,chapterId:"02",pdfPageIndex:i,printedPageLabel:null,
  physicalSide:i%2===0?"left":"right",status:"draft",
}));
export function validateLos1C02Print():string[]{
  const errors:string[]=[];
  const pageIds=new Set<string>();
  const actualTextA=LOS1_C02_PRINT_PAGES.filter(p=>p.section==="text").flatMap(p=>p.sourceLineIds);
  const actualTextB=LOS1_C02_PRINT_PAGES.filter(p=>p.section==="text-b").flatMap(p=>p.sourceLineIds);
  const actualQuestions=LOS1_C02_PRINT_PAGES.flatMap(p=>p.questionIds);
  const actualExercises=LOS1_C02_PRINT_PAGES.flatMap(p=>p.exerciseIds);
  for(const [i,p] of LOS1_C02_PRINT_PAGES.entries()){
    if(pageIds.has(p.pageId))errors.push("Duplicate page ID: "+p.pageId);
    pageIds.add(p.pageId);
    if(p.pdfPageIndex!==i||p.printedPageLabel!==null||p.status!=="draft")
      errors.push("Draft claims physical final folio: "+p.pageId);
    if(p.physicalSide!==(i%2===0?"left":"right"))
      errors.push("Incorrect spread order: "+p.pageId);
    if(p.chapterId!=="02")errors.push("Wrong chapter: "+p.pageId);
  }
  if(LOS1_C02_PRINT_PAGES.length!==14)errors.push("Expected fourteen pilot leaves.");
  if(LOS1_C02_PRINT_PAGES.slice(0,2).some(p=>p.kind!=="chapter-open"))
    errors.push("Missing two-leaf chapter opening.");
  if(actualTextA.join("|")!==LOS1_C02_LINES.map(l=>l.id).join("|"))
    errors.push("C02 Text A must contain all six original turns once.");
  if(actualTextB.join("|")!==LOS1_M_COM_02_LINES.map(l=>l.id).join("|"))
    errors.push("C02 Text B must contain all four original turns once.");
  if(actualQuestions.length!==new Set(actualQuestions).size||
     actualQuestions.length!==LOS1_C02_QUESTIONS.length+
      LOS1_M_COM_02_QUESTIONS.length+LOS1_CULTURE["02"].questions.length)
    errors.push("Source or culture questions are missing or duplicated.");
  if(actualExercises.length!==new Set(actualExercises).size||
     actualExercises.join("|")!==LOS1_C02_EXERCISES.map(e=>e.id).join("|"))
    errors.push("C02 task bank is incomplete, duplicated, or reordered.");
  if(!LOS1_C02_SOURCE_GATE.sourceId||LOS1_C02_SOURCE_GATE.sourceId!==LOS1_C02_SOURCE_ID)
    errors.push("Primary-source manifest does not match C02.");
  if(LOS1_C02_PRINT_PAGES.some(p=>p.imageIds.length>0))
    errors.push("Do not mark unapproved stock portraits as licensed images.");
  return errors;
}
