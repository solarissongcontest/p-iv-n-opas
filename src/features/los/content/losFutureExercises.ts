import type { LosFutureExerciseDraft } from "./losFutureExerciseTypes";
import { LOS_FUTURE_EXERCISES_2 } from "./losFutureExercises2.ts";
import { LOS_FUTURE_EXERCISES_3 } from "./losFutureExercises3.ts";
import { LOS_FUTURE_EXERCISES_4 } from "./losFutureExercises4.ts";
import { LOS_FUTURE_EXERCISES_5 } from "./losFutureExercises5.ts";
import { LOS_FUTURE_EXERCISES_6 } from "./losFutureExercises6.ts";
import { LOS_FUTURE_EXERCISES_7 } from "./losFutureExercises7.ts";
import { LOS_FUTURE_EXERCISES_8 } from "./losFutureExercises8.ts";

/** 1 820 lähdekäsikirjoituksen harjoitustehtävää. Ratkaisuluonnokset eivät vielä ole julkaistuja mallivastauksia. */
export const LOS_FUTURE_EXERCISES: Record<number,Record<string,LosFutureExerciseDraft[]>> = {
  2: LOS_FUTURE_EXERCISES_2,
  3: LOS_FUTURE_EXERCISES_3,
  4: LOS_FUTURE_EXERCISES_4,
  5: LOS_FUTURE_EXERCISES_5,
  6: LOS_FUTURE_EXERCISES_6,
  7: LOS_FUTURE_EXERCISES_7,
  8: LOS_FUTURE_EXERCISES_8,
};

/** Keskitetty kirjakohtainen haku estää LOS! 1:n tai toisen kirjan aineiston palauttamisen. */
export function losFutureExercisesFor(bookId:number,chapterId:string):LosFutureExerciseDraft[] {
  return LOS_FUTURE_EXERCISES[bookId]?.[chapterId] ?? [];
}
