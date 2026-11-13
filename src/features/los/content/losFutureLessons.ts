import type { LosFutureLessonContent } from "./losFutureLessonTypes.ts";
import { LOS_FUTURE_LESSONS_2 } from "./losFutureLessons2.ts";
import { LOS_FUTURE_LESSONS_3 } from "./losFutureLessons3.ts";
import { LOS_FUTURE_LESSONS_4 } from "./losFutureLessons4.ts";
import { LOS_FUTURE_LESSONS_5 } from "./losFutureLessons5.ts";
import { LOS_FUTURE_LESSONS_6 } from "./losFutureLessons6.ts";
import { LOS_FUTURE_LESSONS_7 } from "./losFutureLessons7.ts";
import { LOS_FUTURE_LESSONS_8 } from "./losFutureLessons8.ts";

/** 420 lähdekäsikirjoituksen oppituntitekstiä: 350 kappaletuntia sekä 70 kertausta, väli-/loppukokeen ohjetta ja yhteenvetoa.
 * Aineisto on kirjasarjan omaa kielentarkistamatonta pedagogista luonnosta.
 */
export const LOS_FUTURE_LESSONS:Record<number,Record<string,LosFutureLessonContent>>={
  2: LOS_FUTURE_LESSONS_2,
  3: LOS_FUTURE_LESSONS_3,
  4: LOS_FUTURE_LESSONS_4,
  5: LOS_FUTURE_LESSONS_5,
  6: LOS_FUTURE_LESSONS_6,
  7: LOS_FUTURE_LESSONS_7,
  8: LOS_FUTURE_LESSONS_8,
};

export function getLosFutureLesson(bookId:number,number:number):LosFutureLessonContent|null {
  if(!Number.isInteger(number)||number<1||number>60)return null;
  return LOS_FUTURE_LESSONS[bookId]?.[String(number).padStart(3,"0")]??null;
}
