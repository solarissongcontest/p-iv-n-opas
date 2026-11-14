import type { LosFutureExerciseDraft } from "./losFutureExerciseTypes";
import {LOS_FUTURE_R05_MODELS} from "./losFutureR05Models.ts";
import { LOS_FUTURE_EXERCISES_2 } from "./losFutureExercises2.ts";
import { LOS_FUTURE_EXERCISES_3 } from "./losFutureExercises3.ts";
import { LOS_FUTURE_EXERCISES_4 } from "./losFutureExercises4.ts";
import { LOS_FUTURE_EXERCISES_5 } from "./losFutureExercises5.ts";
import { LOS_FUTURE_EXERCISES_6 } from "./losFutureExercises6.ts";
import { LOS_FUTURE_EXERCISES_7 } from "./losFutureExercises7.ts";
import { LOS_FUTURE_EXERCISES_8 } from "./losFutureExercises8.ts";

/** The source-authored task banks stay intact. R05 model summaries are an
 * additive editorial layer so concurrent manuscript fixes are never overwritten. */
function withR05Models(bookId:number,source:Record<string,LosFutureExerciseDraft[]>):
Record<string,LosFutureExerciseDraft[]>{
  const result:Record<string,LosFutureExerciseDraft[]>={};
  for(const [chapterId,tasks] of Object.entries(source)){
    const model=LOS_FUTURE_R05_MODELS[bookId]?.[chapterId];
    result[chapterId]=model
      ? tasks.map(task=>task.id===`LOS${bookId}-C${chapterId}-R05`
        ? {...task,answerKey:model}:task)
      : tasks;
  }
  return result;
}

/** 1 820 lähdekäsikirjoituksen harjoitustehtävää. Ratkaisuluonnokset eivät vielä ole julkaistuja mallivastauksia. */
export const LOS_FUTURE_EXERCISES: Record<number,Record<string,LosFutureExerciseDraft[]>> = {
  2: withR05Models(2,LOS_FUTURE_EXERCISES_2),
  3: withR05Models(3,LOS_FUTURE_EXERCISES_3),
  4: withR05Models(4,LOS_FUTURE_EXERCISES_4),
  5: withR05Models(5,LOS_FUTURE_EXERCISES_5),
  6: withR05Models(6,LOS_FUTURE_EXERCISES_6),
  7: withR05Models(7,LOS_FUTURE_EXERCISES_7),
  8: withR05Models(8,LOS_FUTURE_EXERCISES_8),
};

/** Keskitetty kirjakohtainen haku estää LOS! 1:n tai toisen kirjan aineiston palauttamisen. */
export function losFutureExercisesFor(bookId:number,chapterId:string):LosFutureExerciseDraft[] {
  return LOS_FUTURE_EXERCISES[bookId]?.[chapterId] ?? [];
}
