import type { Exercise, ExerciseAnswer } from "./model";
import { evaluateExercise } from "./exercises/evaluate.ts";

/** Shared, deterministic test contract. No generative grading or test-score
 * inference from the learner's speaking self-assessment.
 */
export type SpeechAssessment = "onnistui" | "harjoiteltavaa";
export type ChapterTestDefinition = {
  id: string; version: string; chapterId: string; title: string; introductoryFi: string;
  exerciseIds: readonly string[];
  alternativeExerciseIds?: readonly string[];
  speechCriteria: readonly { id: string; title: string }[];
  selfAssessmentMode?: "speech" | "writing";
  speechExampleDe?: string;
  speechPromptFi?: string;
  writingPromptFi?: string;
  writingModelDe?: string;
  writingModelFi?: string;
  requiredWritingLines?: number;
  maximumWritingLines?: number;
  /** Optional second independent writing product (e.g. EX-FINAL dialogue). */
  secondWritingPromptFi?: string;
  secondWritingModelDe?: string;
  secondWritingModelFi?: string;
  requiredSecondWritingLines?: number;
  maximumSecondWritingLines?: number;
  /** Existing in-app, human-recorded source media for listening groups. */
  listeningBlockIds?: readonly string[];
  examType?: "chapter" | "midterm" | "final";
  scoreGroups?: readonly { id: string; titleFi: string; exerciseIds: readonly string[] }[];
};
export type ChapterTestResult = {
  submittedAt: string; score: number; maximum: number;
  attemptNumber?: number;
  outcomes: { exerciseId: string; correct: boolean; explanationFi: string }[];
  selfAssessment: Record<string, SpeechAssessment>;
  writtenResponse?: string;
  secondWrittenResponse?: string;
  /** Learner attestation: audio played and was heard. NOT a device QA certificate. */
  listeningSelfReported?: boolean;
};
export type ChapterTestRecord = {
  testId: string; testVersion: string;
  attemptNumber?: number;
  answers: Record<string, ExerciseAnswer>;
  selfAssessment: Record<string, SpeechAssessment>;
  writtenResponse?: string;
  secondWrittenResponse?: string;
  listeningSelfReported?: boolean;
  submission: ChapterTestResult | null;
  previousResults: {
    submittedAt: string; score: number; maximum: number;
    attemptNumber?: number;
    outcomes?: ChapterTestResult["outcomes"];
    answers?: Record<string, ExerciseAnswer>;
    selfAssessment?: Record<string, SpeechAssessment>;
    writtenResponse?: string;
    secondWrittenResponse?: string;
    listeningSelfReported?: boolean;
  }[];
};
export function emptyChapterTestRecord(definition: ChapterTestDefinition): ChapterTestRecord {
  return {
    testId: definition.id, testVersion: definition.version,
    attemptNumber: 0,
    answers: {}, selfAssessment: {}, writtenResponse: "", secondWrittenResponse: "",
    listeningSelfReported: false, submission: null, previousResults: [],
  };
}
/** The first attempt uses C01's original twelve questions. Each succeeding
 * attempt chooses a different deterministic blend of two *authored* forms,
 * preserving one question per curriculum objective slot. There are 4096
 * combinations, not merely shuffled answer options. Never reveal the seed
 * or answer key to the exam UI before grading.
 */
export function selectedTestExerciseIds(
  definition: ChapterTestDefinition, attemptNumber = 0,
): string[] {
  const original = [...definition.exerciseIds];
  const alternates = definition.alternativeExerciseIds;
  if (!alternates || !alternates.length || !Number.isSafeInteger(attemptNumber) || attemptNumber <= 0) return original;
  if (alternates.length !== original.length) return [];
  const shift = (attemptNumber * 0x9e3) & 0xfff;
  return original.map((id, index) =>
    ((shift >>> (index % 12)) & 1) === 1 ? alternates[index]! : id);
}
export function selectedTestExercises(
  definition: ChapterTestDefinition, allExercises: readonly Exercise[], attemptNumber = 0,
): Exercise[] {
  const byId = new Map(allExercises.map(exercise => [exercise.id, exercise]));
  return selectedTestExerciseIds(definition, attemptNumber).flatMap(id => {
    const match = byId.get(id);
    return match ? [match] : [];
  });
}
export function missingChapterTestAnswers(definition: ChapterTestDefinition,
  exercises: readonly Exercise[], state: ChapterTestRecord): string[] {
  const chosen = selectedTestExerciseIds(definition, state.attemptNumber ?? 0);
  if (chosen.length !== definition.exerciseIds.length ||
      exercises.length !== chosen.length ||
      exercises.some((exercise, index) => exercise.id !== chosen[index])) {
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
  const writtenLines = (state.writtenResponse ?? "").split(/\r?\n/u)
    .filter(line => line.trim().length > 0).length;
  const secondLines = (state.secondWrittenResponse ?? "").split(/\r?\n/u)
    .filter(line => line.trim().length > 0).length;
  const invalidWriting = definition.selfAssessmentMode === "writing" &&
    (writtenLines < (definition.requiredWritingLines ?? 1) ||
      (definition.maximumWritingLines !== undefined && writtenLines > definition.maximumWritingLines) ||
      (definition.secondWritingPromptFi !== undefined &&
        (secondLines < (definition.requiredSecondWritingLines ?? 1) ||
          (definition.maximumSecondWritingLines !== undefined &&
            secondLines > definition.maximumSecondWritingLines))));
  if (state.testId !== definition.id || state.testVersion !== definition.version ||
    state.submission || missingChapterTestAnswers(definition, exercises, state).length ||
    missingSpeechAssessments(definition, state).length || invalidWriting ||
    (Boolean(definition.listeningBlockIds?.length) && state.listeningSelfReported !== true)) return null;
  const outcomes = exercises.map(exercise => {
    const evaluated = evaluateExercise(exercise, state.answers[exercise.id] ?? null);
    // All null/invalid submissions are rejected above, not silently counted wrong.
    if (!evaluated) throw new Error("Invalid chapter test answer");
    return { exerciseId: exercise.id, correct: evaluated.correct,
      explanationFi: evaluated.explanationFi };
  });
  return {
    submittedAt, attemptNumber: state.attemptNumber ?? 0, score: outcomes.filter(item => item.correct).length,
    ...(definition.listeningBlockIds?.length ? { listeningSelfReported: true } : {}),
    ...(definition.selfAssessmentMode === "writing" ? {
      writtenResponse: state.writtenResponse?.trim() ?? "",
      ...(definition.secondWritingPromptFi ? {
        secondWrittenResponse: state.secondWrittenResponse?.trim() ?? "",
      } : {}),
    } : {}),
    maximum: outcomes.length, outcomes,
    selfAssessment: Object.fromEntries(definition.speechCriteria.map(item => [
      item.id, state.selfAssessment[item.id],
    ])) as Record<string, SpeechAssessment>,
  };
}
export function restartChapterTest(state: ChapterTestRecord): ChapterTestRecord {
  if (!state.submission) return state;
  return {
    ...state, answers: {}, selfAssessment: {}, writtenResponse: "", secondWrittenResponse: "",
    listeningSelfReported: false, submission: null,
    attemptNumber: (state.attemptNumber ?? 0) + 1,
    previousResults: [
      ...state.previousResults,
      { submittedAt: state.submission.submittedAt, score: state.submission.score,
        maximum: state.submission.maximum, attemptNumber: state.submission.attemptNumber ?? 0,
        outcomes: state.submission.outcomes,
        answers: { ...state.answers },
        selfAssessment: { ...state.submission.selfAssessment },
        ...(state.submission.writtenResponse ? { writtenResponse: state.submission.writtenResponse } : {}),
        ...(state.submission.secondWrittenResponse ?
          { secondWrittenResponse: state.submission.secondWrittenResponse } : {}),
        ...(state.submission.listeningSelfReported ?
          { listeningSelfReported: true } : {}),
      },
    ],
  };
}

/** Score separately without exposing keys before the exam is submitted.
 * Retake alternatives are mapped by authored original exercise slot.
 */
export function examScoreGroups(definition: ChapterTestDefinition,
  result: ChapterTestResult | null): { id: string; titleFi: string; score: number; maximum: number }[] {
  if (!result || !definition.scoreGroups) return [];
  const byOriginal = new Map(definition.exerciseIds.map((id, index) => [id, index]));
  const outcomes = result.outcomes;
  return definition.scoreGroups.map(group => {
    const slots = group.exerciseIds.flatMap(id => {
      const index = byOriginal.get(id);
      return index === undefined ? [] : [index];
    });
    return { id: group.id, titleFi: group.titleFi,
      maximum: slots.length,
      score: slots.filter(index => outcomes[index]?.correct).length,
    };
  });
}
