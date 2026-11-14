import type { LosFutureExerciseDraft } from "./losFutureExerciseTypes.ts";

/**
 * All T02 comprehension, T09 translation and T12 grammar checks use one concise written
 * answer. The source's model is withheld until the student's self-review;
 * accepted variants have not been independently checked, so no auto grading.
 * The student's response is still stored under the original task ID.
 */
export type LosFutureShortAnswer = {kind:"reading"|"translation"|"grammar";prompt:string;language?:"de"|"fi"};
export function losFutureShortAnswer(task:LosFutureExerciseDraft):LosFutureShortAnswer|null{
  const reading=/-T02$/.test(task.id)&&task.title==="Tekstin tarkka ydinkysymys";
  const translation=/-T09$/.test(task.id)&&task.title==="Käännä asiayhteydestä";
  const grammar=/-T12$/.test(task.id)&&task.title==="Suljettu kielioppitarkistus";
  if((!reading&&!translation&&!grammar)||!task.prompt.trim()||!task.answerKey.trim()||
      task.answerKey.length>150)return null;
  return {
    kind:reading?"reading":translation?"translation":"grammar",
    prompt:task.prompt,
    // T12 includes both Finnish and German answers: do not pretend that every
    // grammar response is German before editorial language tagging.
    ...(translation?{language:"de" as const}:reading?{language:"fi" as const}:{}),
  };
}
