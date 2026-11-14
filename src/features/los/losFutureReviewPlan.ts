import { LOS_FUTURE_MANUSCRIPTS } from "./content/losFutureManuscripts.ts";
import { getLosFutureLesson } from "./content/losFutureLessons.ts";

/**
 * The 56 non-exam book reviews remain strictly formative. The original review
 * manuscripts repeat a broad activity outline; source-specific examples,
 * vocabulary, grammar, Text B and linked actual exercises come from the same
 * book's canonical chapters. No AI, generated keys or fictitious marks.
 */
const REVIEW_CONTENT = {
  1:  {chapterId:"01",compareId:"01",kind:"orientation",tasks:["T02","T06"]},
  27: {chapterId:"05",compareId:"01",kind:"reading",tasks:["T02","T06"]},
  28: {chapterId:"05",compareId:"03",kind:"grammar",tasks:["T12","T09"]},
  29: {chapterId:"05",compareId:"04",kind:"application",tasks:["T09","T20"]},
  56: {chapterId:"10",compareId:"06",kind:"reading",tasks:["T02","T06"]},
  57: {chapterId:"10",compareId:"08",kind:"grammar",tasks:["T12","T09"]},
  58: {chapterId:"10",compareId:"09",kind:"application",tasks:["T09","T20"]},
  60: {chapterId:"10",compareId:"10",kind:"summary",tasks:["T02","T12"]},
} as const;
export const LOS_FUTURE_REVIEW_NUMBERS=[1,27,28,29,56,57,58,60] as const;
type ReviewNumber=typeof LOS_FUTURE_REVIEW_NUMBERS[number];

export function losFutureReviewDraftKeys(id:string){
  return {
    stage:`${id}:review:stage`,
    recall:`${id}:review:recall`,
    transfer:`${id}:review:transfer`,
    reflection:`${id}:review:reflection`,
  };
}
export function losFutureReviewPlan(bookId:number,number:number){
  if(!Number.isInteger(bookId)||bookId<2||bookId>8||!Object.prototype.hasOwnProperty.call(REVIEW_CONTENT,number))
    return null;
  const config=REVIEW_CONTENT[number as ReviewNumber];
  const script=getLosFutureLesson(bookId,number);
  const chapter=LOS_FUTURE_MANUSCRIPTS[bookId]?.[config.chapterId];
  const compare=LOS_FUTURE_MANUSCRIPTS[bookId]?.[config.compareId];
  if(!script||script.kind!=="review"||!chapter||!compare)return null;
  const prefix=`LOS${bookId}-C${config.chapterId}-`;
  return {
    id:script.id,bookId,number,kind:config.kind,chapterId:config.chapterId,
    compareId:config.compareId,chapter,compare,
    objective:script.objective||chapter.objective,
    taskIds:config.tasks.map(task=>prefix+task),
    keys:losFutureReviewDraftKeys(script.id),
  };
}
