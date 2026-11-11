import assert from "node:assert/strict";
import test from "node:test";
import { LOS_BOOKS } from "../src/features/los/books.ts";
import {
  emptyChapterTestRecord, gradeChapterTest, missingChapterTestAnswers,
  restartChapterTest, selectedTestExercises,
} from "../src/features/los/chapterTest.ts";
import { LOS1_C02_EDITORIAL_TURNS, LOS1_C02_EDITORIAL_TEXT } from "../src/features/los/los1-c02-content.ts";
import { evaluateExercise } from "../src/features/los/exercises/evaluate.ts";
import type { Exercise, ExerciseAnswer } from "../src/features/los/model.ts";

const book = LOS_BOOKS[0];
if (!book) throw Error("LOS1 missing");
const chapter = book.chapters.find(item => item.id === "C02");
const def = book.chapterTests.find(item => item.chapterId === "C02");
if (!chapter || !def) throw Error("C02 test missing");
const questions = selectedTestExercises(def, book.exercises);

function correctAnswer(item: Exercise): ExerciseAnswer {
  switch (item.type) {
    case "single-choice": return item.correctOptionId;
    case "gap-fill": return item.acceptedAnswers[0] ?? "";
    case "matching": return Object.fromEntries(item.pairs.map(pair => [pair.leftId, pair.rightId]));
    case "highlight": return item.acceptedRanges[0] ?? null;
    case "multiple-choice": return [...item.correctOptionIds];
    case "true-false": return String(item.correctValue);
    case "word-order": return [...item.correctOrder];
    case "categorize": return Object.fromEntries(item.assignments.map(pair => [pair.itemId, pair.categoryId]));
  }
}
function filled(writtenResponse = "Hallo! Ich heiße Lena. Wie heißt du?") {
  return {
    ...emptyChapterTestRecord(def),
    answers: Object.fromEntries(questions.map(item => [item.id, correctAnswer(item)])),
    selfAssessment: Object.fromEntries(def.speechCriteria.map(item => [item.id, "onnistui" as const])),
    writtenResponse,
  };
}
test("C02 retains ten complete navigable preview sections with no orphan references", () => {
  assert.equal(chapter.sections?.length, 10);
  assert.equal(chapter.sections?.filter(item => item.publicationStatus === "preview").length, 10);
  assert.equal(book.lessons.filter(item => item.chapterId === "C02" && item.publicationStatus === "preview").length, 5);
  assert.equal(chapter.exerciseIds.length, 38);
  assert.ok(chapter.sections?.find(item => item.id === "teksti-b")?.blockIds.includes("los1-c02-m-com-02-dialogue"));
  assert.ok(chapter.sections?.find(item => item.id === "teksti-a")?.blockIds.includes("los1-c02-text-a-editorial"));
  assert.ok(chapter.sections?.find(item => item.id === "teksti-b")?.blockIds.includes("los1-c02-commons-02-audio"));
  assert.ok(chapter.sections?.find(item => item.id === "tarkista")?.exerciseIds.includes("los1-c02-exam-15"));
});
test("complete C02 Text A is original editorial writing with separately identified source", () => {
  assert.equal(LOS1_C02_EDITORIAL_TURNS.length, 8);
  assert.equal(LOS1_C02_EDITORIAL_TEXT, LOS1_C02_EDITORIAL_TURNS.map(line => line.text).join("\n"));
  assert.ok(book.sources.some(source => source.id === "LOS-EDITORIAL-C02"));
  assert.ok(book.sources.some(source => source.id === "M-WB-01" && source.permittedMode === "pending"));
  const dialogue = book.blocks.find(block => block.id === "los1-c02-text-a-editorial");
  assert.ok(dialogue && dialogue.kind === "dialogue");
  assert.equal(dialogue.sourceId, "LOS-EDITORIAL-C02");
  assert.notEqual(dialogue.sourceId, "M-WB-01");
  assert.ok(dialogue.turns.every(line => Boolean(line.translationFi)));
});
test("C02 test grades 15 independent answers only when own written introduction exists", () => {
  assert.equal(questions.length, 15);
  assert.equal(new Set(questions.map(item => item.id)).size, 15);
  assert.equal(def.selfAssessmentMode, "writing");
  assert.ok(questions.every(item => evaluateExercise(item, correctAnswer(item))?.correct));
  const ready = filled();
  const result = gradeChapterTest(def, questions, ready, "2026-11-11T11:00:00.000Z");
  assert.equal(result?.score, 15);
  assert.equal(result?.maximum, 15);
  assert.equal(result?.writtenResponse, ready.writtenResponse);
  const noWriting = filled("  ");
  assert.equal(gradeChapterTest(def, questions, noWriting, "2026-11-11T11:00:00.000Z"), null);
  const incomplete = filled();
  delete incomplete.answers[questions[0]!.id];
  assert.equal(missingChapterTestAnswers(def, questions, incomplete).length, 1);
  assert.equal(gradeChapterTest(def, questions, incomplete, "2026-11-11T11:00:00.000Z"), null);
});
test("C02 retake preserves own written introduction without adding speech or writing points", () => {
  const completed = filled();
  const result = gradeChapterTest(def, questions, completed, "2026-11-11T11:00:00.000Z");
  assert.ok(result);
  const restarted = restartChapterTest({ ...completed, submission: result });
  assert.equal(restarted.writtenResponse, "");
  assert.equal(restarted.submission, null);
  assert.equal(restarted.previousResults[0]?.score, 15);
  assert.equal(restarted.previousResults[0]?.writtenResponse, completed.writtenResponse);
  assert.equal(restarted.previousResults[0]?.outcomes?.length, 15);
  assert.equal(restarted.previousResults[0]?.maximum, 15);
});
test("C02 keeps personal names out of vocabulary flashcards", () => {
  const block = book.blocks.find(item => item.id === "los1-c02-words");
  assert.ok(block && block.kind === "vocabulary");
  assert.equal(block.entries.length, 16);
  assert.ok(block.entries.every(entry => !["Lena", "Ben", "Franz", "Greta", "Takashi", "Peter"].includes(entry.de)));
});
