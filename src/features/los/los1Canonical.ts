import {LOS_BOOKS} from "./catalog";
import {LOS1_REVISED_AB} from "./content/los1RevisedAB";
import {LOS1_REVISED_C} from "./content/los1RevisedC";
import {LOS1_READING_BANK} from "./content/los1ReadingBank";

/** Canonical LOS!-authored lesson texts. Authentic sources are supplemental and
 * remain in sourceRegistry with their own licensing/publication gates. */
export const LOS1_CANONICAL_VERSION = "2026-11-18.1";
export type LosCanonicalKind = "A"|"B"|"C";
export type LosCanonicalLine = {
  id: string;
  speaker: string;
  text: string;
  sectionTitle?: string;
};

export function los1CanonicalText(chapterId:string,kind:LosCanonicalKind) {
  const id=chapterId.padStart(2,"0");
  const chapter=LOS1_REVISED_AB.chapters.find(c=>c.chapterId==="C"+id);
  const support=LOS1_REVISED_C.chapters.find(c=>c.chapterId===id);
  if(!chapter||!support)return null;
  return kind==="C" ? {
    id:support.sectionId, title:support.title,kind,
    version:LOS1_CANONICAL_VERSION, content:support.contentMarkdown,
    origin:"LOS!:n oma opetuksellinen tukiteksti" as const,
  } : {
    id:kind==="A"?chapter.textA.id:chapter.textB.id,
    title:kind==="A"?chapter.textA.title:chapter.textB.title,
    kind,version:LOS1_CANONICAL_VERSION,
    content:(kind==="A"?chapter.textA:chapter.textB).blocks,
    origin:"LOS!:n oma opetusteksti" as const,
  };
}

/** Stable per-block IDs prevent unrelated annotation migration when the app is updated.
 * Retired historical keys remain in the draft and are never overwritten. */
export function los1CanonicalLines(chapterId:string, kind:"A"|"B"):readonly LosCanonicalLine[] {
  const chapter=LOS1_REVISED_AB.chapters.find(c=>c.chapterId==="C"+chapterId);
  const text=kind==="A"?chapter?.textA:chapter?.textB;
  if(!text)return [];
  let pendingStage:string|undefined;
  return text.blocks.flatMap((block,index):LosCanonicalLine[]=>{
    if(block.kind==="break")return [];
    const raw="text" in block ? block.text : "";
    if(!raw)return [];
    if(block.kind==="stage"){pendingStage=raw;return [];}
    const match=/^\*\*([^*]+):\*\*\s*(.*)$/s.exec(raw);
    const line:LosCanonicalLine={
      id:"b"+String(index).padStart(3,"0"),
      speaker:match?.[1]??"",
      text:(match?.[2]??raw).replace(/\*\*/g,"").replace(/(?<!\*)\*([^*]+)\*(?!\*)/g,"$1").trim(),
      ...(pendingStage?{sectionTitle:pendingStage}:{}),
    };
    pendingStage=undefined;
    return [line];
  });
}

export function validateLos1Canonical():string[] {
  const issues:string[]=[];
  const chapters=LOS_BOOKS[0]?.chapters??[];
  if(chapters.length!==10)issues.push("LOS! 1:n kappaleiden määrä ei ole 10.");
  const ids=new Set<string>();
  for(const chapter of chapters){
    const a=los1CanonicalText(chapter.id,"A");
    const b=los1CanonicalText(chapter.id,"B");
    const c=los1CanonicalText(chapter.id,"C");
    if(!a||!b||!c){issues.push(chapter.id+": pää- tai tukiteksti puuttuu.");continue;}
    for(const text of [a,b,c]){
      if(ids.has(text.id))issues.push("Toistuva tekstin tunniste "+text.id);
      ids.add(text.id);
    }
    for(const kind of ["A","B"] as const){
      const lines=los1CanonicalLines(chapter.id,kind);
      if(lines.length<3)issues.push(chapter.id+kind+" sisältää liian vähän luettavaa tekstiä.");
      if(new Set(lines.map(line=>line.id)).size!==lines.length)issues.push(chapter.id+kind+" lohkotunnisteet toistuvat.");
    }
    const tasks=LOS1_READING_BANK[chapter.id];
    if(!tasks||tasks.A.length!==8||tasks.B.length!==5||tasks.C.length!==2)
      issues.push(chapter.id+" 15 tekstitehtävän järjestelmä puuttuu.");
  }
  if(ids.size!==30)issues.push("Kanonisia tekstiosia odotettiin 30, löytyi "+ids.size);
  return issues;
}
