/**
 * LOS! 1 · C04 Du oder Sie? (16 B5 draft leaves).
 * Text A: all eight original human-authored M-WB-06 Wikibooks turns.
 * Text B: exact full 20-expression M-COM-03 greetings list reused from C01.
 * Text B is NOT a dialogue and has not passed playback QA.
 */
import {LOS_BOOKS} from "../../catalog.ts";
import {LOS_EXERCISES} from "../../exerciseBank.ts";
import {getLosOpenDialogue} from "../../content/los1OpenDialogues.ts";
import {LOS1_TEXT_B_SOURCES} from "../../content/los1TextBAdditional.ts";
import {LOS1_CULTURE} from "../../content/los1Culture.ts";
import {getLosChapterSourceGate} from "../../content/sourceRegistry.ts";

export const LOS1_C04_PILOT_ID="los1-c04-b5-draft-1" as const;
export const LOS1_C04_FORMAT={widthMm:176,heightMm:250} as const;
export type LosC04Section=
  "chapter"|"text"|"understand"|"vocabulary"|"grammar"|"grammar-comparison"|
  "text-b"|"text-b-understand"|"practice"|"apply"|"culture"|"test"|"appendix";
export type LosC04PrintPage={
  pageId:string;pdfPageIndex:number;printedPageLabel:null;
  physicalSide:"left"|"right";kind:"chapter-open"|"content"|"appendix";
  chapterId:"04";section:LosC04Section;title:string;subtitle:string;
  sourceLineIds:readonly string[];questionIds:readonly string[];
  exerciseIds:readonly string[];contentBlockIds:readonly string[];
  mediaIds:readonly string[];imageIds:readonly string[];status:"draft";
};
function requireBook(){
  const found=LOS_BOOKS.find(book=>book.id===1);
  if(!found)throw Error("LOS! 1:n sisältöluettelo puuttuu.");
  return found;
}
function requireSource(){
  const found=getLosOpenDialogue("04");
  if(!found)throw Error("C04:n Wikibooks-lähde puuttuu.");
  return found;
}
const chapter=requireBook().chapters.find(ch=>ch.id==="04");
if(!chapter)throw Error("C04 puuttuu LOS! 1:n sisältöluettelosta.");
const source=requireSource();
const textB=LOS1_TEXT_B_SOURCES["04"];
export const LOS1_C04_PRINT_CHAPTER=chapter;
export const LOS1_C04_SOURCE=source;
export const LOS1_C04_TEXT_A=source.originalLines;
export const LOS1_C04_TEXT_B=textB;
export const LOS1_C04_CULTURE=LOS1_CULTURE["04"];
export const LOS1_C04_EXERCISES=LOS_EXERCISES.filter(ex=>ex.chapterId==="04");
export const LOS1_C04_SOURCE_GATE=getLosChapterSourceGate("04");
export const LOS1_C04_TEXT_B_REUSED_FROM_C01=true as const;

type Draft=Omit<LosC04PrintPage,
 "chapterId"|"pdfPageIndex"|"printedPageLabel"|"physicalSide"|"status">;
const make=(id:string,section:LosC04Section,title:string,subtitle:string,
  extra:Partial<Draft>={}):Draft=>({
  pageId:"c04-"+id,
  kind:section==="chapter"?"chapter-open":section==="appendix"?"appendix":"content",
  section,title,subtitle,sourceLineIds:[],questionIds:[],exerciseIds:[],
  contentBlockIds:["c04-"+id],mediaIds:[],imageIds:[],...extra,
});
const draft:readonly Draft[]=[
  make("open-left","chapter","04 · Du oder Sie?","Sinuttelu ja teitittely"),
  make("open-right","chapter","Aloita tästä","Tavoitteet ja puhuttelutilanteet"),
  make("text-a","text","Text A · Herr Schmidt und Herr Standish",
    "Kahdeksan repliikin alkuperäinen työpaikkakeskustelu",
    {sourceLineIds:source.originalLines.map(x=>x.id),mediaIds:[source.sourceId]}),
  make("verstehen","understand","Verstehen · Text A","Neljä alkuperäistekstin ymmärtämiskysymystä",
    {questionIds:source.questions.map(x=>x.id)}),
  make("vocabulary","vocabulary","Wortschatz · Puhuttelu","Koko C04:n aktiivisanasto"),
  make("grammar","grammar","Grammatik · du und Sie","Persoonapronomini ja kohtelias verbimuoto"),
  make("comparison","grammar-comparison","Du oder Sie? · Vertaa",
    "Nimikysymys, kotipaikka ja hyvän käytöksen ilmaisut"),
  make("text-b-1","text-b","Text B · Grüße und Abschiede I",
    "C01:ssä tutun julkisen domainin alkuperäislistan ilmaukset 1–10",
    {sourceLineIds:textB.lines.slice(0,10).map(x=>x.id),mediaIds:[textB.sourceId]}),
  make("text-b-2","text-b","Text B · Grüße und Abschiede II",
    "Saman alkuperäisen listan ilmaukset 11–20",
    {sourceLineIds:textB.lines.slice(10).map(x=>x.id),mediaIds:[textB.sourceId]}),
  make("text-b-questions","text-b-understand","Verstehen · Text B",
    "Neljä rekisteriä ja tilanteita käsittelevää kysymystä",
    {questionIds:textB.questions.map(q=>q.id)}),
  make("practice-1","practice","Üben · Harjoittele I",
    "Puhuttelu ja nimen kysyminen",
    {exerciseIds:LOS1_C04_EXERCISES.slice(0,5).map(x=>x.id)}),
  make("practice-2","practice","Üben · Harjoittele II",
    "Sie-verbimuodot ja kohtelias asiointi",
    {exerciseIds:LOS1_C04_EXERCISES.slice(5,9).map(x=>x.id)}),
  make("apply","apply","Anwenden · Tilanteet",
    "Rakenna oma tuttavallinen ja kohtelias esittäytyminen"),
  make("culture","culture","Land und Leute · Duzen oder siezen?",
    "Puhuttelun kulttuuriset erot ja lähdekysymykset",
    {questionIds:LOS1_CULTURE["04"].questions.map(x=>x.id)}),
  make("test","test","Das kann ich schon!","Kappaleen itsearvioinnin kolme tehtävää",
    {exerciseIds:LOS1_C04_EXERCISES.slice(9).map(x=>x.id)}),
  make("sources","appendix","Quellen · Lähteet","Lisenssit, C01-toistokäyttö ja hyväksyntäportit",
    {mediaIds:[source.sourceId,textB.sourceId]}),
];

export const LOS1_C04_PRINT_PAGES:readonly LosC04PrintPage[]=draft.map((p,index)=>({
  ...p,chapterId:"04",pdfPageIndex:index,printedPageLabel:null,
  physicalSide:index%2===0?"left":"right",status:"draft",
}));
export function validateLos1C04Print():string[]{
  const errors:string[]=[];
  const ids=new Set<string>();
  for(const [i,page] of LOS1_C04_PRINT_PAGES.entries()){
    if(ids.has(page.pageId))errors.push("Toistuva sivutunnus: "+page.pageId);
    ids.add(page.pageId);
    if(page.pdfPageIndex!==i||page.printedPageLabel!==null||
       page.status!=="draft"||page.chapterId!=="04"||
       page.physicalSide!==(i%2===0?"left":"right"))
      errors.push("Virheellinen keskeneräisen sivun sivukartta: "+page.pageId);
    if(page.imageIds.length>0)
      errors.push("Taittoon on lisätty hyväksymätön kuva: "+page.pageId);
  }
  if(LOS1_C04_PRINT_PAGES.length!==16||
     LOS1_C04_PRINT_PAGES.slice(0,2).some(p=>p.kind!=="chapter-open"))
    errors.push("C04:n avausaukeaman tai 16 luonnoslehden rakenne on rikki.");
  if(LOS1_C04_TEXT_A.length!==8||
     LOS1_C04_PRINT_PAGES.filter(p=>p.section==="text")
      .flatMap(p=>p.sourceLineIds).join("|")!==source.originalLines.map(x=>x.id).join("|"))
    errors.push("Text A:n alkuperäiset kahdeksan repliikkiä puuttuvat.");
  if(textB.lines.length!==20||!textB.transcriptIsExact||
     LOS1_C04_PRINT_PAGES.filter(p=>p.section==="text-b")
      .flatMap(p=>p.sourceLineIds).join("|")!==textB.lines.map(x=>x.id).join("|"))
    errors.push("Text B:n 20 alkuperäistä tervehdystä eivät ole mukana kokonaisina.");
  const questions=LOS1_C04_PRINT_PAGES.flatMap(p=>p.questionIds);
  const expectedQuestions=[...source.questions,...textB.questions,
    ...LOS1_CULTURE["04"].questions].map(q=>q.id);
  if(questions.join("|")!==expectedQuestions.join("|")||
     questions.length!==new Set(questions).size)
    errors.push("Ymmärtämis- tai kulttuurikysymykset puuttuvat.");
  const exercises=LOS1_C04_PRINT_PAGES.flatMap(p=>p.exerciseIds);
  if(exercises.join("|")!==LOS1_C04_EXERCISES.map(x=>x.id).join("|")||
     exercises.length!==new Set(exercises).size)
    errors.push("C04:n tehtäväpankkia ei ole jaettu kokonaan.");
  if(LOS1_C04_SOURCE_GATE.sourceId!==source.sourceId)
    errors.push("Ensisijainen lähde ei vastaa lähdemanifestia.");
  if(textB.sourceId!=="M-COM-03"||!LOS1_C04_TEXT_B_REUSED_FROM_C01)
    errors.push("C04:n Text B:n C01-uudelleenkäyttöä ei ole tunnistettu.");
  return errors;
}
