import type { LosFutureExerciseDraft } from "./losFutureExerciseTypes.ts";

/** One explicit manuscript blank, shown inline without inventing an assessment.
 * The student's original answer remains in the existing practiceAnswers[task.id].
 */
export type LosFutureGapParts = {before:string;after:string};
export function losFutureGapParts(task:LosFutureExerciseDraft): LosFutureGapParts|null {
  const prefix="Täydennä puuttuva sana: ";
  if(!/-T07$/.test(task.id) || task.title!=="Täydennä mallilause" ||
      !task.prompt.startsWith(prefix) || !task.answerKey.trim())return null;
  const sentence=task.prompt.slice(prefix.length);
  const first=sentence.indexOf("_____");
  if(first<0 || sentence.indexOf("_____",first+5)>=0)return null;
  return {before:sentence.slice(0,first),after:sentence.slice(first+5)};
}
