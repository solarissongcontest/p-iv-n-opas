import type { LosFutureLessonContent } from "./losFutureLessonTypes.ts";
import { LOS_FUTURE_MANUSCRIPTS } from "./losFutureManuscripts.ts";
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

/**
 * The original L060 handoff scripts for several books accidentally referenced
 * the NEXT book's C01 lesson as if it were the current book's final recap.
 * The final summary must draw only from its own C10 canonical manuscript,
 * never prematurely assess content that belongs to a later B3 module.
 * The source review/assessment brief remains editorial and ungraded.
 */
export function getLosFutureLesson(bookId:number,number:number):LosFutureLessonContent|null {
  if(!Number.isInteger(number)||number<1||number>60)return null;
  const lesson=LOS_FUTURE_LESSONS[bookId]?.[String(number).padStart(3,"0")]??null;
  if(!lesson||number!==60)return lesson;
  const chapter=LOS_FUTURE_MANUSCRIPTS[bookId]?.["10"];
  if(!chapter)return lesson;
  return {
    ...lesson,
    objective:chapter.objective,
    resource:`LOS! ${bookId} · kappale 10 · Text A, Text B, kielioppi ja omat harjoitukset.`,
    model:chapter.dialogue.slice(0,2).join("\n"),
    guidance:chapter.grammarExplanation,
    teacherTip:`Opeta ensin tämän kirjan kappaleen 10 rakenne: ${chapter.grammarTopic}. Älä sekoita seuraavan kirjan uutta teemaa tähän loppukertaukseen.`,
    exitCheck:"Palauta muistista yhden oman arkitilanteesi sanasto ja yksi tämän kirjan kielioppirakenne. Tarkista muoto kirjasta, kirjaa korjaus ja kerro mitä harjoittelet seuraavaksi.",
    extra:"Tee ensin tämän kirjan kappaleiden 01–10 tehtäviä. Kirjoita lopuksi oma uusi vuoropuhelu ja tarkista sitä itsenäisesti saman kirjan Text A- ja kielioppimallien avulla.",
    reviewTeaching:`${lesson.reviewTeaching}\n\nTämän kirjan kappaleen 10 rakenne: ${chapter.grammarTopic}.\n${chapter.grammarExplanation.split("\n\n")[0]}`,
    reviewTask:`${lesson.reviewTask}\n\nKertaa LOS! ${bookId}:n kappale 10: kirjoita yksi oma esimerkki aiheesta "${chapter.title}" ja vertaa sitä tämän kirjan Text A -tekstiin sekä kielioppiselitykseen.`,
  };
}
