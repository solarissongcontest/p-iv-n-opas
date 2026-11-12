/**
 * LOS! 1 full-book PRINT OUTLINE, not a paginated or published edition.
 * All title/goal data comes from the existing book catalog; source status
 * comes from the existing editorial source registry. NO fake page numbers.
 */
import {LOS_BOOKS} from "../../catalog.ts";
import {getLosChapterSourceGate} from "../../content/sourceRegistry.ts";

export const LOS1_PRINT_SECTIONS=[
  {id:"chapter",label:"Kappaleen avaus ja tavoitteet"},
  {id:"text",label:"Text A"},
  {id:"understand",label:"Ymmärrä"},
  {id:"vocabulary",label:"Sanasto"},
  {id:"grammar",label:"Grammatik"},
  {id:"text-b",label:"Text B"},
  {id:"practice",label:"Harjoittele"},
  {id:"apply",label:"Käytä saksaa"},
  {id:"culture",label:"Land und Leute"},
  {id:"test",label:"Das kann ich schon!"},
] as const;
export type Los1PrintSectionId=typeof LOS1_PRINT_SECTIONS[number]["id"];
export type Los1BookOutlineEntry={
  outlineId:string;
  chapterId:string|null;
  sectionId:Los1PrintSectionId|null;
  title:string;
  subtitle:string;
  /** No finished full-book layout exists yet; never invent page indices. */
  pdfStartIndex:null;
  printedStartPage:null;
  primarySourceId:string|null;
  /** Readiness concerns ONLY the chapter's primary source, not all contents. */
  primarySourceReady:boolean|null;
  primarySourceIssues:readonly string[];
};
const book=LOS_BOOKS.find(entry=>entry.id===1);
if(!book)throw Error("LOS! 1 puuttuu sisältöluettelosta.");

const frontMatter=[
  ["front-cover","Etukansi"],["inside-cover","Etukannen sisäpuoli"],
  ["title","Nimiölehti"],["imprint","Julkaisutiedot"],
  ["welcome","Tervetuloa"],["how-to","Näin käytät kirjaa"],
  ["outcomes","Mitä opit?"],["contents","Sisällysluettelo"],
  ["german-world","Saksankielinen maailma"],
] as const;
const backMatter=[
  ["wrap-up","Du kannst schon viel!"],["grammar-overview","Kielioppikooste"],
  ["vocabulary-index","Sanastohakemisto"],["answers","Vastaukset ja ratkaisut"],
  ["media-index","Mediat ja QR-koodit"],["source-credits","Lähteet ja kuvatiedot"],
  ["topic-index","Aihehakemisto"],["back-cover","Takakansi"],
] as const;
function standalone(id:string,title:string):Los1BookOutlineEntry {
  return {outlineId:"los1-"+id,chapterId:null,sectionId:null,title,subtitle:"",
    pdfStartIndex:null,printedStartPage:null,primarySourceId:null,primarySourceReady:null,primarySourceIssues:[]};
}
function chapterNodes(chapter:typeof book.chapters[number]):Los1BookOutlineEntry[]{
  const gate=getLosChapterSourceGate(chapter.id);
  return LOS1_PRINT_SECTIONS.map(section=>({
    outlineId:"los1-c"+chapter.id+"-"+section.id,
    chapterId:chapter.id,sectionId:section.id,
    title:chapter.id+" · "+chapter.title+" · "+section.label,
    subtitle:chapter.subtitle,
    pdfStartIndex:null,printedStartPage:null,
    primarySourceId:gate.sourceId,primarySourceReady:gate.ready,
    primarySourceIssues:gate.issues,
  }));
}

/** Order is the agreed editorial reading order; the PDF indices do NOT exist. */
export const LOS1_FULL_BOOK_PRINT_OUTLINE:readonly Los1BookOutlineEntry[]=[
  ...frontMatter.map(([id,title])=>standalone(id,title)),
  ...book.chapters.flatMap((chapter,i)=>[
    ...chapterNodes(chapter),
    ...(i===4?[standalone("review-1","Kertaus I · C01–C05"),
      standalone("midterm","Välikoe · C01–C05")]:[]),
  ]),
  standalone("review-2","Kertaus II · C01–C10"),
  standalone("final","Loppukoe"),
  standalone("final-summary","Loppukokeen yhteenveto"),
  ...backMatter.map(([id,title])=>standalone(id,title)),
];
export function getLos1UnreadyChapterGates():Array<{
 chapterId:string;title:string;issues:readonly string[];
}>{
  return book.chapters.flatMap(ch=>{
    const gate=getLosChapterSourceGate(ch.id);
    return gate.ready?[]:[{chapterId:ch.id,title:ch.title,issues:gate.issues}];
  });
}
export function validateLos1FullBookOutline(entries:readonly Los1BookOutlineEntry[]=LOS1_FULL_BOOK_PRINT_OUTLINE):string[]{
  const issues:string[]=[];
  const ids=new Set<string>();
  for(const node of entries){
    if(ids.has(node.outlineId))issues.push("Toistuva tunniste: "+node.outlineId);
    ids.add(node.outlineId);
    if(node.pdfStartIndex!==null||node.printedStartPage!==null)
      issues.push("Taittamattomalle sivulle ei saa keksiä numeroa: "+node.outlineId);
  }
  const chapters=book.chapters.map(c=>c.id);
  if(chapters.length!==10||new Set(chapters).size!==10)
    issues.push("LOS! 1:ssä pitää olla kymmenen eri kappaletta.");
  for(const chapterId of chapters){
    const actual=entries.filter(node=>node.chapterId===chapterId).map(n=>n.sectionId);
    if(actual.join("|")!==LOS1_PRINT_SECTIONS.map(s=>s.id).join("|"))
      issues.push("Kappaleelta puuttuu tai sen osiot ovat väärässä järjestyksessä: "+chapterId);
  }
  for(const required of [...frontMatter,...backMatter]){
    if(!ids.has("los1-"+required[0]))issues.push("Puuttuva alku-/liiteosio: "+required[0]);
  }
  if(!ids.has("los1-midterm")||!ids.has("los1-final")||!ids.has("los1-review-1")||!ids.has("los1-review-2"))
    issues.push("Kertaus tai koe puuttuu taittorungosta.");
  return issues;
}
