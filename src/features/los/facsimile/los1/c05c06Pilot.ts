/** Shared editorial page-map contract for LOS! 1 C05 and C06.
 * These are DRAFT folios, not numbered or released printed pages.
 * The 12 original C06 source turns are divided only between the two
 * source pages and never abbreviated or rewritten.
 */
import {LOS_BOOKS} from "../../catalog.ts";
import {LOS_EXERCISES} from "../../exerciseBank.ts";
import {getLosOpenDialogue,LOS1_C06_TEXT} from "../../content/los1OpenDialogues.ts";
import {LOS1_TEXT_B_SOURCES} from "../../content/los1TextBAdditional.ts";
import {LOS1_CULTURE} from "../../content/los1Culture.ts";
import {getLosChapterSourceGate} from "../../content/sourceRegistry.ts";

export type SharedChapterId="05"|"06";
export type SharedSection="chapter"|"text"|"understand"|"vocabulary"|"grammar"|
 "text-b"|"text-b-understand"|"practice"|"apply"|"culture"|"test"|"appendix";
export type SharedPage={
 pageId:string;pdfPageIndex:number;printedPageLabel:null;
 physicalSide:"left"|"right";kind:"chapter-open"|"content"|"appendix";
 chapterId:SharedChapterId;section:SharedSection;title:string;subtitle:string;
 sourceLineIds:readonly string[];questionIds:readonly string[];
 exerciseIds:readonly string[];contentBlockIds:readonly string[];
 mediaIds:readonly string[];imageIds:readonly string[];status:"draft";
};
const book=LOS_BOOKS.find(b=>b.id===1);
if(!book)throw Error("LOS! 1 puuttuu kirjakatalogista.");
const requireOpen=(id:"05")=>{
 const source=getLosOpenDialogue(id);
 if(!source)throw Error("C05:n alkuperäislähde puuttuu.");
 return source;
};
const source05=requireOpen("05");
const source06=LOS1_C06_TEXT;
export const LOS1_SHARED_CHAPTERS={
 "05":{
  chapter:book.chapters.find(c=>c.id==="05")!,
  source:source05,
  textB:LOS1_TEXT_B_SOURCES["05"],
  culture:LOS1_CULTURE["05"],
  exercises:LOS_EXERCISES.filter(x=>x.chapterId==="05"),
  gate:getLosChapterSourceGate("05"),
  textBReusedFrom:"02",
 },
 "06":{
  chapter:book.chapters.find(c=>c.id==="06")!,
  source:source06,
  textB:LOS1_TEXT_B_SOURCES["06"],
  culture:LOS1_CULTURE["06"],
  exercises:LOS_EXERCISES.filter(x=>x.chapterId==="06"),
  gate:getLosChapterSourceGate("06"),
  textBReusedFrom:"01",
 },
} as const;
type Draft=Omit<SharedPage,"chapterId"|"pdfPageIndex"|"printedPageLabel"|"physicalSide"|"status">;
function build(id:SharedChapterId):readonly SharedPage[]{
 const config=LOS1_SHARED_CHAPTERS[id];
 const mk=(slug:string,section:SharedSection,title:string,subtitle:string,
   more:Partial<Draft>={}):Draft=>({
  pageId:"c"+id+"-"+slug,
  kind:section==="chapter"?"chapter-open":section==="appendix"?"appendix":"content",
  section,title,subtitle,sourceLineIds:[],questionIds:[],exerciseIds:[],
  contentBlockIds:["c"+id+"-"+slug],mediaIds:[],imageIds:[],...more,
 });
 const a=config.source.originalLines;
 const b=config.textB.lines;
 const e=config.exercises;
 const base:Draft[]=[
   mk("open-left","chapter",id+" · "+config.chapter.title,config.chapter.subtitle),
   mk("open-right","chapter","Aloita tästä","Tavoitteet ja uusi kielitaito"),
 ];
 if(id==="06"){
  base.push(
   mk("text-a-one","text","Text A · Sag mal, wie alt bist du? I",
      "Monika Janickan dialogit 1 ja 2, alkuperäiset repliikit 1–8",
      {sourceLineIds:a.slice(0,8).map(l=>l.id),mediaIds:[config.source.sourceId]}),
   mk("text-a-two","text","Text A · Sag mal, wie alt bist du? II",
      "Dialogit 3 ja 4, alkuperäiset repliikit 9–12",
      {sourceLineIds:a.slice(8).map(l=>l.id),mediaIds:[config.source.sourceId]})
  );
 }else base.push(
   mk("text-a","text","Text A · Heinrich und Karl","Neljä alkuperäistä puheenvuoroa",
     {sourceLineIds:a.map(l=>l.id),mediaIds:[config.source.sourceId]}),
 );
 base.push(mk("understand","understand","Verstehen · Text A",
  "Neljä lähteen ymmärtämiskysymystä",
  {questionIds:config.source.questions.map(q=>q.id)}));
 if(id==="06"){
  base.push(mk("vocabulary-1","vocabulary","Wortschatz · Null bis zwanzig",
   "Aktiivisanaston ensimmäinen puolisko"),
   mk("vocabulary-2","vocabulary","Wortschatz · Alter",
   "Aktiivisanaston toinen puolisko"));
 }else base.push(mk("vocabulary","vocabulary","Wortschatz · Wie geht’s?",
  "Aktiivinen vointisanasto"));
 base.push(
  mk("grammar","grammar",id==="05"?"Grammatik · nicht ja sehr":
    "Grammatik · Zahlen und Alter",
   id==="05"?"Vointifraasit, kielto ja vahvistus":
    "Luvut ja sein-verbin ikäilmaukset"),
  mk("text-b","text-b",id==="05"?"Text B · Franz und Greta":
    "Text B · Franz und Jörg",
    "Aikaisemman kappaleen alkuperäistekstin kertaus",
    {sourceLineIds:b.map(line=>line.id),mediaIds:[config.textB.sourceId]}),
  mk("text-b-understand","text-b-understand","Verstehen · Text B",
   "Neljä lähteen ymmärtämiskysymystä",
   {questionIds:config.textB.questions.map(q=>q.id)}),
 );
 if(id==="06"){
  base.push(
   mk("practice-1","practice","Üben · Zahlen I","Numerot",
    {exerciseIds:e.slice(0,8).map(ex=>ex.id)}),
   mk("practice-2","practice","Üben · Zahlen II","Numerot ja poikkeavat muodot",
    {exerciseIds:e.slice(8,16).map(ex=>ex.id)})
  );
 }else{
  base.push(
   mk("practice-1","practice","Üben · Wie geht’s? I","Vointikysymyksiä",
    {exerciseIds:e.slice(0,5).map(ex=>ex.id)}),
   mk("practice-2","practice","Üben · Wie geht’s? II","Tarkentavia fraaseja",
    {exerciseIds:e.slice(5,9).map(ex=>ex.id)})
  );
 }
 base.push(
  mk("apply","apply","Anwenden · Käytä saksaa",
    id==="05"?"Omat vointikeskustelut":"Kuvitteellisen henkilön ikä"),
  mk("culture","culture","Land und Leute","Kulttuurinen käyttö ja lähdekysymykset",
    {questionIds:config.culture.questions.map(q=>q.id)}),
  mk("test","test","Das kann ich schon!","Kappaleen tarkistustehtävät",
    {exerciseIds:e.slice(id==="05"?9:16).map(ex=>ex.id)}),
  mk("sources","appendix","Quellen · Lähteet",
   "Lähteiden nimet, lisenssit ja avoimet hyväksynnät",
   {mediaIds:[config.source.sourceId,config.textB.sourceId]})
 );
 return base.map((p,i)=>({
  ...p,chapterId:id,pdfPageIndex:i,printedPageLabel:null,
  physicalSide:i%2===0?"left":"right",status:"draft",
 }));
}
export const LOS1_C05_PRINT_PAGES=build("05");
export const LOS1_C06_PRINT_PAGES=build("06");
export const LOS1_SHARED_PRINT_PAGES={
 "05":LOS1_C05_PRINT_PAGES,
 "06":LOS1_C06_PRINT_PAGES,
} as const;
export const LOS1_SHARED_FORMAT={widthMm:176,heightMm:250} as const;
export function validateLos1SharedChapter(id:SharedChapterId):string[]{
 const c=LOS1_SHARED_CHAPTERS[id],pages=LOS1_SHARED_PRINT_PAGES[id];
 const issues:string[]=[];
 if(!c.chapter)issues.push("Kappale puuttuu katalogista.");
 const expectedLen=id==="05"?14:16;
 if(pages.length!==expectedLen)issues.push("Väärä lehden määrä "+id+": "+pages.length);
 const originalIds=c.source.originalLines.map(l=>l.id);
 const printedIds=pages.filter(p=>p.section==="text").flatMap(p=>p.sourceLineIds);
 if(originalIds.join("|")!==printedIds.join("|"))
  issues.push("Text A:n alkuperäinen repliikkijono ei säilynyt.");
 const bIds=pages.filter(p=>p.section==="text-b").flatMap(p=>p.sourceLineIds);
 if(bIds.join("|")!==c.textB.lines.map(l=>l.id).join("|"))
  issues.push("Text B:n alkuperäiset repliikit puuttuvat.");
 const exerciseIds=pages.flatMap(p=>p.exerciseIds);
 if(exerciseIds.join("|")!==c.exercises.map(e=>e.id).join("|")||
    new Set(exerciseIds).size!==exerciseIds.length)
  issues.push("Tehtäväpankki ei ole kokonainen.");
 const qIds=pages.flatMap(p=>p.questionIds);
 const expectedQs=[...c.source.questions,...c.textB.questions,...c.culture.questions].map(q=>q.id);
 if(qIds.join("|")!==expectedQs.join("|")||new Set(qIds).size!==qIds.length)
  issues.push("Lähde- tai kulttuurikysymyksiä puuttuu.");
 if(c.gate.sourceId!==c.source.sourceId)issues.push("Lähdemanifesti ei vastaa Text A:n lähdettä.");
 for(const [i,p] of pages.entries()){
  if(p.chapterId!==id||p.pdfPageIndex!==i||p.printedPageLabel!==null||
     p.status!=="draft"||p.physicalSide!==(i%2===0?"left":"right"))
   issues.push("Luonnossivun tunniste tai pariteetti rikki: "+p.pageId);
  if(p.imageIds.length)issues.push("Hyväksymätön kuvaviite: "+p.pageId);
 }
 if(id==="05"&&c.textB.sourceId!=="M-COM-08")
  issues.push("C05:n Text B:n lähdetunniste on väärä.");
 if(id==="06"&&c.textB.sourceId!=="M-COM-01")
  issues.push("C06:n uudelleen käytetty Text B on väärä.");
 return issues;
}
