import type { LosFutureExerciseDraft } from "./losFutureExerciseTypes.ts";

/**
 * All T09 translations and T12 short grammar checks use one concise written
 * answer. The source's model is withheld until the student's self-review;
 * accepted variants have not been independently checked, so no auto grading.
 * The student's response is still stored under the original task ID.
 */
export type LosFutureShortAnswer = {kind:"translation"|"grammar";prompt:string;language?:"de"};
export function losFutureShortAnswer(task:LosFutureExerciseDraft):LosFutureShortAnswer|null{
  const translation=/-T09$/.test(task.id)&&task.title==="Käännä asiayhteydestä";
  const grammar=/-T12$/.test(task.id)&&task.title==="Suljettu kielioppitarkistus";
  if((!translation&&!grammar)||!task.prompt.trim()||!task.answerKey.trim()||
      task.answerKey.length>150)return null;
  return {
    kind:translation?"translation":"grammar",
    prompt:task.prompt,
    // T12 includes both Finnish and German answers: do not pretend that every
    // grammar response is German before editorial language tagging.
    ...(translation?{language:"de" as const}:{}),
  };
}
