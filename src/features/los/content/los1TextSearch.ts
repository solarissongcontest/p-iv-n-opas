/**
 * Search the original human-written German source texts and their LOS! Finnish
 * translations already included inside the book, with a direct route back to
 * the actual source reader. This is not an external search service.
 *
 * Only real text lines are indexed. C07's independently made alphabet
 * pronunciation aid is not mislabeled as a verbatim original transcript.
 */
import { LOS1_C01_LINES } from "./los1C01.ts";
import { LOS1_C02_LINES } from "./los1C02.ts";
import { LOS1_M_COM_02_LINES } from "./los1MCom02.ts";
import {
  LOS1_C06_TEXT, LOS1_C08_TEXT, LOS1_C10_TEXT,
  LOS1_OPEN_DIALOGUES,
} from "./los1OpenDialogues.ts";
import { LOS1_TEXT_B_SOURCES } from "./los1TextBAdditional.ts";

export type LosTextSearchLine = {
  id: string;
  chapterId: string;
  section: "text" | "text-b";
  sourceId: string;
  lineId: string;
  heading: string;
  original: string;
  meaning: string;
  speaker: string;
};
type SearchableLine = { id: string; text: string; meaning: string; speaker?: string };
const rows: LosTextSearchLine[] = [];
const seen = new Set<string>();
function add(
  chapterId:string,section:"text"|"text-b",sourceId:string,
  heading:string,lines:readonly SearchableLine[],
){
  for(const line of lines){
    const id=chapterId+":"+section+":"+sourceId+":"+line.id;
    if(seen.has(id))throw new Error("Duplicate LOS! source line ID: "+id);
    seen.add(id);
    rows.push({
      id,chapterId,section,sourceId,lineId:line.id,heading,
      original:line.text,meaning:line.meaning,speaker:line.speaker??"",
    });
  }
}
add("01","text","M-COM-01","Franz ja Jörg tutustuvat",LOS1_C01_LINES);
add("02","text","M-WB-01","Franz ja Greta tutustuvat",LOS1_C02_LINES);
for(const source of [...LOS1_OPEN_DIALOGUES,LOS1_C06_TEXT,LOS1_C08_TEXT,LOS1_C10_TEXT]){
  add(source.chapterId,"text",source.sourceId,source.heading,source.originalLines);
}
add("02","text-b","M-COM-02","Thomas, Takashi ja Peter",LOS1_M_COM_02_LINES);
add("03","text-b","M-COM-02","Thomas, Takashi ja Peter",LOS1_M_COM_02_LINES);
for(const chapter of ["01","04","05","06","07","08","09","10"] as const){
  const source=LOS1_TEXT_B_SOURCES[chapter];
  if(source.transcriptIsExact&&source.lines.length){
    add(chapter,"text-b",source.sourceId,source.title,source.lines);
  }
}
export const LOS1_SEARCHABLE_SOURCE_LINES: readonly LosTextSearchLine[]=rows;
export const LOS1_SEARCHED_TEXT_CHAPTERS: readonly string[]=
  [...new Set(rows.filter(row=>row.section==="text").map(row=>row.chapterId))].sort();
const norm=(s:string)=>s.normalize("NFC").toLocaleLowerCase("fi").trim();
export function searchLos1OriginalTexts(query:string,limit=40):readonly LosTextSearchLine[]{
  const q=norm(query);
  if(!q||!Number.isSafeInteger(limit)||limit<1)return [];
  return rows.filter(row=>norm(
    row.heading+" "+row.original+" "+row.meaning+" "+row.speaker,
  ).includes(q)).slice(0,Math.min(limit,100));
}
export function validateLos1TextSearch():string[]{
  const errors:string[]=[];
  const primary=rows.filter(row=>row.section==="text");
  if(LOS1_SEARCHED_TEXT_CHAPTERS.join(",")!=="01,02,03,04,05,06,07,08,09,10")
    errors.push("All ten Text A chapter sources must be searchable.");
  if(new Set(rows.map(row=>row.id)).size!==rows.length)errors.push("Duplicate source line IDs.");
  if(primary.length<50)errors.push("Original Text A line index is unusually short.");
  if(rows.some(row=>!row.sourceId||!row.original||!row.meaning||!/^[0-9]{2}$/.test(row.chapterId)))
    errors.push("Incomplete or ungrounded source line.");
  if(rows.some(row=>row.chapterId==="07"&&row.section==="text-b"))
    errors.push("C07 learner-authored alphabet aid must not be searchable as an exact original transcript.");
  return errors;
}
