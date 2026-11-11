import type { Exercise, ExerciseAnswer } from "./model";
import { evaluateExercise } from "./exercises/evaluate.ts";

/** Shared, deterministic test contract. No generative grading or test-score
 * inference from the learner's speaking self-assessment.
 */
export type SpeechAssessment = "onnistui" | "harjoiteltavaa";
export type ChapterTestDefinition = {
  id: string; version: string; chapterId: string; title: string; introductoryFi: string;
  exerciseIds: readonly string[];
  speechCriteria: readonly { id: string; title: string }[];
};
export type ChapterTestResult = {
  submittedAt: string; score: number; maximum: number;
  outcomes: { exerciseId: string; correct: boolean; explanationFi: string }[];
  selfAssessment: Record<string, SpeechAssessment>;
};
export type ChapterTestRecord = {
  testId: string; testVersion: string;
  answers: Record<string, ExerciseAnswer>;
  selfAssessment: Record<string, SpeechAssessment>;
  submission: ChapterTestResult | null;
  previousResults: { submittedAt: string; score: number; maximum: number }[];
};
export function emptyChapterTestRecord(definition: ChapterTestDefinition): ChapterTestRecord {
  return {
    testId: definition.id, testVersion: definition.version,
    answers: {}, selfAssessment: {}, submission: null, previousResults: [],
  };
}
export function selectedTestExercises(definition: ChapterTestDefinition, allExercises: readonly Exercise[]): Exercise[] {
  const byId = new Map(allExercises.map(exercise => [exercise.id, exercise]));
  return definition.exerciseIds.flatMap(id => {
    const match = byId.get(id);
    return match ? [match] : [];
  });
}
export function missingChapterTestAnswers(definition: ChapterTestDefinition,
  exercises: readonly Exercise[], state: ChapterTestRecord): string[] {
  if (exercises.length !== definition.exerciseIds.length ||
      exercises.some((exercise, index) => exercise.id !== definition.exerciseIds[index])) {
    return [...definition.exerciseIds];
  }
  return exercises.filter(exercise => evaluateExercise(exercise, state.answers[exercise.id] ?? null) === null)
    .map(exercise => exercise.id);
}
export function missingSpeechAssessments(definition: ChapterTestDefinition, state: ChapterTestRecord): string[] {
  return definition.speechCriteria.filter(item =>
    state.selfAssessment[item.id] !== "onnistui" &&
    state.selfAssessment[item.id] !== "harjoiteltavaa").map(item => item.id);
}
export function gradeChapterTest(definition: ChapterTestDefinition, exercises: readonly Exercise[],
  state: ChapterTestRecord, submittedAt: string): ChapterTestResult | null {
  if (state.testId !== definition.id || state.testVersion !== definition.version ||
    state.submission || missingChapterTestAnswers(definition, exercises, state).length ||
    missingSpeechAssessments(definition, state).length) return null;
  const outcomes = exercises.map(exercise => {
    const evaluated = evaluateExercise(exercise, state.answers[exercise.id] ?? null);
    // All null/invalid submissions are rejected above, not silently counted wrong.
    if (!evaluated) throw new Error("Invalid chapter test answer");
    return { exerciseId: exercise.id, correct: evaluated.correct,
      explanationFi: evaluated.explanationFi };
  });
  return {
    submittedAt, score: outcomes.filter(item => item.correct).length,
    maximum: outcomes.length, outcomes,
    selfAssessment: Object.fromEntries(definition.speechCriteria.map(item => [
      item.id, state.selfAssessment[item.id],
    ])) as Record<string, SpeechAssessment>,
  };
}
export function restartChapterTest(state: ChapterTestRecord): ChapterTestRecord {
  return {
    ...state, answers: {}, selfAssessment: {}, submission: null,
    previousResults: state.submission ? [
      ...state.previousResults,
      { submittedAt: state.submission.submittedAt, score: state.submission.score,
        maximum: state.submission.maximum },
    ] : state.previousResults,
  };
}
