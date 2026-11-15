import {LOS_FUTURE_MANUSCRIPTS} from "./content/losFutureManuscripts.ts";
import {losFutureExercisesFor} from "./content/losFutureExercises.ts";
import type {LosFutureExerciseDraft} from "./content/losFutureExerciseTypes.ts";

/** Independent, formative chapter checks reuse only literal source tasks.
 * There is no separate approved 70-paper test bank. Neither these prompts nor
 * source answers should be labelled a published or supervised exam. */
export const LOS_FUTURE_CHAPTER_CHECK_SUFFIXES=["T02","T07","T09","T12","T18"] as const;
export type LosFutureChapterCheckPlan={
  id:string;bookId:number;chapterId:string;title:string;
  objective:string;readingText:string;tasks:LosFutureExerciseDraft[];
  currentKey:string;previousKeys:string[];
};
export function losFutureChapterCheckPlan(bookId:number,chapterId:string):LosFutureChapterCheckPlan|null {
  if(!Number.isInteger(bookId)||bookId<2||bookId>8||!/^(0[1-9]|10)$/.test(chapterId))return null;
  const manuscript=LOS_FUTURE_MANUSCRIPTS[bookId]?.[chapterId];
  const source=losFutureExercisesFor(bookId,chapterId);
  const prefix="LOS"+bookId+"-C"+chapterId+"-";
  const tasks=LOS_FUTURE_CHAPTER_CHECK_SUFFIXES.map(suffix=>source.find(t=>t.id===prefix+suffix));
  if(!manuscript||!manuscript.textA||tasks.some(task=>!task))return null;
  const id=prefix+"CHECK";
  return {id,bookId,chapterId,title:manuscript.title,
    objective:manuscript.objective,readingText:manuscript.textA,
    tasks:tasks as LosFutureExerciseDraft[],
    currentKey:id+":current",
    previousKeys:[1,2,3].map(number=>id+":previous-"+number),
  };
}
