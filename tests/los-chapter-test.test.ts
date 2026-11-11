import assert from "node:assert/strict";
import test from "node:test";
import { LOS_BOOKS } from "../src/features/los/books.ts";
import { evaluateExercise } from "../src/features/los/exercises/evaluate.ts";
import {
  emptyChapterTestRecord, gradeChapterTest, missingChapterTestAnswers,
  selectedTestExerciseIds,
  missingSpeechAssessments, restartChapterTest, selectedTestExercises,
  type ChapterTestRecord,
} from "../src/features/los/chapterTest.ts";
import type { Exercise, ExerciseAnswer } from "../src/features/los/model.ts";
import { LOS1_C01_SPEECH_CRITERIA } from "../src/features/los/los1-c01-chapter-test.ts";

const book = LOS_BOOKS[0];
if (!book) throw Error("LOS! 1 missing");
const definition = book.chapterTests.find(item => item.chapterId === "C01");
if (!definition) throw Error("C01 test missing");
const questions = selectedTestExercises(definition, book.exercises);

function correctAnswer(exercise: Exercise): ExerciseAnswer {
  switch (exercise.type) {
    case "single-choice": return exercise.correctOptionId;
    case "gap-fill": return exercise.acceptedAnswers[0] ?? "";
    case "matching": return Object.fromEntries(exercise.pairs.map(pair => [pair.leftId, pair.rightId]));
    case "highlight": return exercise.acceptedRanges[0] ?? null;
  }
}
function draftReady(): ChapterTestRecord {
  return {
    ...emptyChapterTestRecord(definition),
    answers: Object.fromEntries(questions.map(item => [item.id, correctAnswer(item)])),
    selfAssessment: Object.fromEntries(LOS1_C01_SPEECH_CRITERIA.map(item => [item.id, "onnistui"])),
  };
}

test("C01 has 12 distinct, independently gradable basic questions and a separate three-item speaking rubric", () => {
  assert.equal(questions.length, 12);
  assert.equal(new Set(questions.map(item => item.id)).size, 12);
  assert.equal(definition.speechCriteria.length, 3);
  assert.ok(questions.every(item => item.hintFi === undefined));
  assert.deepEqual(definition.exerciseIds, questions.map(item => item.id));
  assert.deepEqual(definition.speechCriteria.map(item => item.id), LOS1_C01_SPEECH_CRITERIA.map(item => item.id));
  assert.ok(questions.every(item => evaluateExercise(item, correctAnswer(item))?.correct));
  const lesson6 = book.lessons.find(lesson => lesson.id === "L006");
  assert.equal(lesson6?.publicationStatus, "preview");
  assert.ok(lesson6?.steps.some(step => step.chapterTestId === definition.id));
});

test("no score or solutions are returned for unanswered or invalid attempts", () => {
  const initial = emptyChapterTestRecord(definition);
  assert.equal(missingChapterTestAnswers(definition, questions, initial).length, 12);
  assert.equal(missingSpeechAssessments(definition, initial).length, 3);
  assert.equal(gradeChapterTest(definition, questions, initial, "2026-11-11T10:00:00Z"), null);
  const almost = draftReady();
  delete almost.answers[questions[0]!.id];
  assert.equal(missingChapterTestAnswers(definition, questions, almost).length, 1);
  assert.equal(gradeChapterTest(definition, questions, almost, "2026-11-11T10:00:00Z"), null);
  const speechMissing = draftReady();
  delete speechMissing.selfAssessment[definition.speechCriteria[0]!.id];
  assert.equal(gradeChapterTest(definition, questions, speechMissing, "2026-11-11T10:00:00Z"), null);
  const unexpected = { ...definition, exerciseIds: [...definition.exerciseIds, "missing-question"] };
  assert.equal(gradeChapterTest(unexpected, questions, draftReady(), "2026-11-11T10:00:00Z"), null);
});

test("grade is 12/12 with correct answers and speaking assessment never adds points", () => {
  const ready = draftReady();
  const grade = gradeChapterTest(definition, questions, ready, "2026-11-11T10:00:00Z");
  assert.ok(grade);
  assert.equal(grade.maximum, 12);
  assert.equal(grade.score, 12);
  assert.equal(grade.outcomes.length, 12);
  assert.ok(grade.outcomes.every(item => item.correct && item.explanationFi.length > 0));
  assert.equal(Object.keys(grade.selfAssessment).length, 3);
});

test("incorrect answers receive zero for that question, with correct explanations only after return", () => {
  const ready = draftReady();
  const first = questions[0];
  assert.ok(first && first.type === "single-choice");
  const wrong = first.options.find(option => option.id !== first.correctOptionId);
  assert.ok(wrong);
  ready.answers[first.id] = wrong.id;
  const grade = gradeChapterTest(definition, questions, ready, "2026-11-11T10:00:00Z");
  assert.ok(grade);
  assert.equal(grade.maximum, 12);
  assert.equal(grade.score, 11);
  assert.equal(grade.outcomes.filter(item => !item.correct).length, 1);
  assert.equal(grade.outcomes[0]?.exerciseId, first.id);
  assert.equal(grade.outcomes[0]?.correct, false);
});

test("a returned assessment is locked until explicit retry and previous score is retained", () => {
  const ready = draftReady();
  const grade = gradeChapterTest(definition, questions, ready, "2026-11-11T10:00:00Z");
  assert.ok(grade);
  const completed = { ...ready, submission: grade };
  assert.equal(gradeChapterTest(definition, questions, completed, "2026-11-11T10:01:00Z"), null);
  const retry = restartChapterTest(completed);
  assert.deepEqual(retry.answers, {});
  assert.deepEqual(retry.selfAssessment, {});
  assert.equal(retry.submission, null);
  assert.equal(retry.attemptNumber, 1);
  assert.equal(retry.previousResults[0]?.submittedAt, grade.submittedAt);
  assert.equal(retry.previousResults[0]?.score, 12);
  assert.equal(retry.previousResults[0]?.maximum, 12);
  assert.equal(retry.previousResults[0]?.outcomes?.length, 12);
  assert.deepEqual(retry.previousResults[0]?.answers, ready.answers);
  const second = gradeChapterTest(definition, questions, draftReady(), "2026-11-11T10:02:00Z");
  assert.equal(second?.maximum, 12);
  assert.equal(restartChapterTest(retry).previousResults.length, 1);
});


test("retakes select other authored questions, not just reorder the first answer choices", () => {
  assert.equal(definition.alternativeExerciseIds?.length, 12);
  const variant0 = selectedTestExerciseIds(definition, 0);
  assert.deepEqual(variant0, definition.exerciseIds);
  const seen = new Set<string>();
  for (let attempt = 0; attempt < 32; attempt++) {
    const form = selectedTestExerciseIds(definition, attempt);
    const previous = attempt > 0 ? selectedTestExerciseIds(definition, attempt - 1) : null;
    assert.equal(form.length, 12);
    assert.equal(new Set(form).size, 12);
    assert.ok(form.every(id => book.exercises.some(e => e.id === id)));
    if (previous) assert.notDeepEqual(form, previous);
    seen.add(form.join(","));
  }
  assert.equal(seen.size, 32);
  assert.ok(selectedTestExerciseIds(definition, 1).some((id, i) => id !== variant0[i]));
});

test("a retake grades against the current authored form, never stale first-attempt answers", () => {
  const firstDraft = draftReady();
  const first = gradeChapterTest(definition, questions, firstDraft, "2026-11-11T10:00:00Z");
  assert.ok(first);
  const retry = restartChapterTest({ ...firstDraft, submission: first });
  const nextQuestions = selectedTestExercises(definition, book.exercises, retry.attemptNumber);
  assert.equal(nextQuestions.length, 12);
  assert.ok(nextQuestions.some((question, i) => question.id !== questions[i]?.id));
  assert.equal(gradeChapterTest(definition, questions, retry, "2026-11-12T10:00:00Z"), null);
  const prepared = {
    ...retry,
    answers: Object.fromEntries(nextQuestions.map(question => [question.id, correctAnswer(question)])),
    selfAssessment: Object.fromEntries(definition.speechCriteria.map(item => [item.id, "harjoiteltavaa"])),
  };
  const result = gradeChapterTest(definition, nextQuestions, prepared, "2026-11-12T10:00:00Z");
  assert.equal(result?.score, 12);
  assert.equal(result?.attemptNumber, 1);
  assert.ok(result?.outcomes.every((row, i) => row.exerciseId === nextQuestions[i]?.id));
  assert.equal(result?.maximum, 12);
});
