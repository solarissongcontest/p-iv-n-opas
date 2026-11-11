import assert from "node:assert/strict";
import test from "node:test";
import { LOS_BOOKS } from "../src/features/los/books.ts";
import { evaluateExercise } from "../src/features/los/exercises/evaluate.ts";
import {
  emptyChapterTestRecord, gradeChapterTest, missingChapterTestAnswers,
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
  assert.deepEqual(retry.previousResults, [{ submittedAt: grade.submittedAt, score: 12, maximum: 12 }]);
  const second = gradeChapterTest(definition, questions, draftReady(), "2026-11-11T10:02:00Z");
  assert.equal(second?.maximum, 12);
  assert.equal(restartChapterTest(retry).previousResults.length, 1);
});
