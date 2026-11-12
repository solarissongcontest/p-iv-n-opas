/**
 * B5 LOS! 1 facsimile prototype, C01 only.
 *
 * All original dialogue lines, exercises, translations and sources are
 * imported from the SAME data used by the interactive book. It is intentionally
 * NOT a published PDF edition: page labels are pilot leaf IDs, not invented
 * printed page numbers, and no image or media permission is implied.
 */
import {LOS1_C01_LINES,LOS1_C01_QUESTIONS,LOS1_C01_SOURCE_ID} from "../../content/los1C01.ts";
import {LOS1_TEXT_B_SOURCES} from "../../content/los1TextBAdditional.ts";
import {LOS1_CULTURE} from "../../content/los1Culture.ts";
import {LOS_EXERCISES} from "../../exerciseBank.ts";
import {LOS_BOOKS} from "../../catalog.ts";

export const LOS1_FACSIMILE_PILOT_ID="los1-c01-b5-draft-1" as const;
export const LOS1_FACSIMILE_FORMAT={widthMm:176,heightMm:250} as const;
export type LosFacsimileSection=
  "overview"|"chapter"|"text"|"understand"|"vocabulary"|
  "grammar"|"text-b"|"practice"|"apply"|"culture"|"test"|"appendix";
export type LosFacsimilePageKind=
  "front-cover"|"inside-cover"|"chapter-open"|"content"|"appendix";
export type LosFacsimilePage={
  pageId:string;
  /** Real physical order in this prototype, NOT final PDF page number. */
  pdfPageIndex:number;
  /** No final printed pages have yet been typeset. */
  printedPageLabel:null;
  physicalSide:"left"|"right"|"single";
  kind:LosFacsimilePageKind;
  section:LosFacsimileSection;
  chapterId:"01"|null;
  title:string;
  subtitle:string;
  sourceLineIds:readonly string[];
  exerciseIds:readonly string[];
  contentBlockIds:readonly string[];
  mediaIds:readonly string[];
  imageIds:readonly string[];
  /** Rights-gated pages are not claimed to be approved or print-ready. */
  status:"draft";
};
const primary=LOS_BOOKS[0]?.chapters.find(ch=>ch.id==="01");
if(!primary)throw new Error("LOS! 1 C01 source chapter not available.");
export const LOS1_C01_FACSIMILE_CHAPTER=primary;
export const LOS1_C01_FACSIMILE_DIALOGUE=LOS1_C01_LINES;
export const LOS1_C01_FACSIMILE_QUESTIONS=LOS1_C01_QUESTIONS;
export const LOS1_C01_FACSIMILE_TEXT_B=LOS1_TEXT_B_SOURCES["01"];
export const LOS1_C01_FACSIMILE_CULTURE=LOS1_CULTURE["01"];
export const LOS1_C01_FACSIMILE_EXERCISES=LOS_EXERCISES.filter(ex=>ex.chapterId==="01");

type PageDraft=Omit<LosFacsimilePage,"pdfPageIndex"|"printedPageLabel"|"physicalSide"|"status">;
const outline:PageDraft[]=[
  {pageId:"cover",kind:"front-cover",chapterId:null,section:"overview",title:"LOS! 1",subtitle:"Tutustu ja ihastu saksan kieleen",sourceLineIds:[],exerciseIds:[],contentBlockIds:["los1-cover"],mediaIds:[],imageIds:["los1-approved-cover"]},
  {pageId:"inside-cover",kind:"inside-cover",chapterId:null,section:"overview",title:"",subtitle:"",sourceLineIds:[],exerciseIds:[],contentBlockIds:[],mediaIds:[],imageIds:[]},
  {pageId:"c01-open-left",kind:"chapter-open",chapterId:"01",section:"chapter",title:"01 · Hallo!",subtitle:"Ensimmäinen kohtaaminen",sourceLineIds:[],exerciseIds:[],contentBlockIds:["c01-chapter-open-left"],mediaIds:[],imageIds:[]},
  {pageId:"c01-open-right",kind:"chapter-open",chapterId:"01",section:"chapter",title:"Aloita tästä",subtitle:"Tavoitteet ja aloitus",sourceLineIds:[],exerciseIds:[],contentBlockIds:["c01-chapter-open-right"],mediaIds:[],imageIds:[]},
  {pageId:"c01-text-a",kind:"content",chapterId:"01",section:"text",title:"Text A · Franz und Jörg",subtitle:"Lue koko kahdeksan repliikin alkuperäinen keskustelu",sourceLineIds:LOS1_C01_LINES.map(l=>l.id),exerciseIds:[],contentBlockIds:["c01-text-a-m-com-01"],mediaIds:["M-COM-01"],imageIds:[]},
  {pageId:"c01-verstehen",kind:"content",chapterId:"01",section:"understand",title:"Verstehen · Ymmärrä",subtitle:"Neljä tekstiin perustuvaa kysymystä",sourceLineIds:[],exerciseIds:LOS1_C01_QUESTIONS.map(q=>q.id),contentBlockIds:["c01-understand"],mediaIds:[],imageIds:[]},
  {pageId:"c01-vocabulary",kind:"content",chapterId:"01",section:"vocabulary",title:"Wortschatz · Sanasto",subtitle:"Tervehtimisen perusilmaukset",sourceLineIds:[],exerciseIds:[],contentBlockIds:["c01-vocabulary"],mediaIds:[],imageIds:[]},
  {pageId:"c01-grammar",kind:"content",chapterId:"01",section:"grammar",title:"Grammatik · Huomaa",subtitle:"Ensimmäiset saksan ääntämishavainnot",sourceLineIds:[],exerciseIds:[],contentBlockIds:["c01-grammar"],mediaIds:[],imageIds:[]},
  {pageId:"c01-text-b-1",kind:"content",chapterId:"01",section:"text-b",title:"Text B · Begrüßungen",subtitle:"Alkuperäinen tervehdysluettelo · osa 1/2",sourceLineIds:LOS1_TEXT_B_SOURCES["01"].lines.slice(0,10).map(l=>l.id),exerciseIds:[],contentBlockIds:["c01-text-b-1"],mediaIds:["M-COM-03"],imageIds:[]},
  {pageId:"c01-text-b-2",kind:"content",chapterId:"01",section:"text-b",title:"Text B · Abschiede",subtitle:"Alkuperäinen tervehdysluettelo · osa 2/2",sourceLineIds:LOS1_TEXT_B_SOURCES["01"].lines.slice(10).map(l=>l.id),exerciseIds:[],contentBlockIds:["c01-text-b-2"],mediaIds:["M-COM-03"],imageIds:[]},
  {pageId:"c01-practice",kind:"content",chapterId:"01",section:"practice",title:"Üben · Harjoittele",subtitle:"Alkuperäisen digikirjan kuusi tehtävää",sourceLineIds:[],exerciseIds:LOS_EXERCISES.filter(e=>e.chapterId==="01").slice(0,6).map(e=>e.id),contentBlockIds:["c01-practice"],mediaIds:[],imageIds:[]},
  {pageId:"c01-apply",kind:"content",chapterId:"01",section:"apply",title:"Anwenden · Käytä saksaa",subtitle:"Oma tervehdys ja hyvästely",sourceLineIds:[],exerciseIds:[],contentBlockIds:["c01-application"],mediaIds:[],imageIds:[]},
  {pageId:"c01-culture",kind:"content",chapterId:"01",section:"culture",title:"Land und Leute",subtitle:"Tervehdys vaihtelee tilanteen ja alueen mukaan",sourceLineIds:[],exerciseIds:LOS1_CULTURE["01"].questions.map(q=>q.id),contentBlockIds:["c01-culture"],mediaIds:[],imageIds:[]},
  {pageId:"c01-test",kind:"content",chapterId:"01",section:"test",title:"Das kann ich schon!",subtitle:"Tarkista osaamisesi kirjallisesti · pilottitehtävät",sourceLineIds:[],exerciseIds:LOS_EXERCISES.filter(e=>e.chapterId==="01").slice(6).map(e=>e.id),contentBlockIds:["c01-test"],mediaIds:[],imageIds:[]},
  {pageId:"c01-source-records",kind:"appendix",chapterId:"01",section:"appendix",title:"Quellen · Lähteet",subtitle:"Alkuperäisaineistojen tekijät ja lisenssit",sourceLineIds:[],exerciseIds:[],contentBlockIds:["c01-sources"],mediaIds:["M-COM-01","M-COM-03"],imageIds:[]},
];
export const LOS1_C01_FACSIMILE_PAGES:readonly LosFacsimilePage[]=outline.map((page,pdfPageIndex)=>({
 ...page,pdfPageIndex,printedPageLabel:null,status:"draft",
 physicalSide:pdfPageIndex===0?"single":pdfPageIndex%2===0?"left":"right",
}));

export function losC01FacsimilePageIndex(pageId:string):number{
 return LOS1_C01_FACSIMILE_PAGES.findIndex(p=>p.pageId===pageId);
}
export function validateLosC01Facsimile():string[]{
 const errors:string[]=[];
 const ids=new Set<string>();
 const lineIds=new Set(LOS1_C01_LINES.map(l=>l.id));
 const textBIds=new Set(LOS1_TEXT_B_SOURCES["01"].lines.map(l=>l.id));
 const exerciseIds=new Set(LOS_EXERCISES.filter(e=>e.chapterId==="01").map(e=>e.id));
 const cultureIds=new Set(LOS1_CULTURE["01"].questions.map(q=>q.id));
 for(const p of LOS1_C01_FACSIMILE_PAGES){
  if(ids.has(p.pageId))errors.push("Duplicate physical page "+p.pageId);
  ids.add(p.pageId);
  if(p.status!=="draft"||p.printedPageLabel!==null)errors.push("Draft cannot claim final folio "+p.pageId);
  if(p.pdfPageIndex<0||p.pdfPageIndex>=outline.length)errors.push("Out of range physical page "+p.pageId);
  if(p.physicalSide!==(p.pdfPageIndex===0?"single":p.pdfPageIndex%2===0?"left":"right"))errors.push("Physical parity "+p.pageId);
  if(p.section==="text"&&p.sourceLineIds.some(x=>!lineIds.has(x)))errors.push("Ungrounded C01 dialogue "+p.pageId);
  if(p.section==="text-b"&&p.sourceLineIds.some(x=>!textBIds.has(x)))errors.push("Ungrounded C01 Text B "+p.pageId);
  if(["understand","practice","test","culture"].includes(p.section)&&p.exerciseIds.some(id=>
    !(exerciseIds.has(id)||cultureIds.has(id)||LOS1_C01_QUESTIONS.some(q=>q.id===id))))
    errors.push("Ungrounded task "+p.pageId);
 }
 if(LOS1_C01_FACSIMILE_PAGES[0]?.kind!=="front-cover")errors.push("Missing approved cover");
 if(LOS1_C01_FACSIMILE_PAGES.length!==15)errors.push("Missing expected pilot pages");
 if(LOS1_C01_FACSIMILE_PAGES.slice(2,4).some(p=>p.kind!=="chapter-open"))errors.push("Chapter opening spread must be two physical pages");
 if(LOS1_C01_FACSIMILE_PAGES.filter(p=>p.section==="text")[0]?.sourceLineIds.length!==8)errors.push("Incomplete original M-COM-01");
 if(LOS1_C01_FACSIMILE_PAGES.filter(p=>p.section==="text-b").flatMap(p=>p.sourceLineIds).length!==20)errors.push("Incomplete original M-COM-03");
 if(new Set(LOS1_C01_FACSIMILE_PAGES.flatMap(p=>p.exerciseIds)).size!==
   LOS1_C01_QUESTIONS.length+LOS1_CULTURE["01"].questions.length+LOS1_C01_FACSIMILE_EXERCISES.length)
   errors.push("Exercise bank or print distribution mismatch");
 return errors;
}
