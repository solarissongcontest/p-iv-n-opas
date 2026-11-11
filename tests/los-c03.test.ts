import assert from "node:assert/strict";
import test from "node:test";
import { LOS_BOOKS } from "../src/features/los/books.ts";
import { validateBook, type Exercise, type ExerciseAnswer } from "../src/features/los/model.ts";
import { evaluateExercise } from "../src/features/los/exercises/evaluate.ts";
import {
  emptyChapterTestRecord, gradeChapterTest, restartChapterTest, selectedTestExercises,
} from "../src/features/los/chapterTest.ts";
import { LOS1_C03_BERNA_FULL_TRANSCRIPT_WITH_REDACTION, LOS1_C03_BERNA_TURNS } from "../src/features/los/los1-c03-source.ts";
import { LOS1_ARISER_ORIGINAL_TEXT, LOS1_ARISER_ORIGINAL_TURNS } from "../src/features/los/los1-authentic-ariser.ts";

const book = LOS_BOOKS[0];
if (!book) throw Error("LOS! 1 absent");
const chapter = book.chapters.find(row => row.id === "C03");
if (!chapter) throw Error("C03 absent");
const definition = book.chapterTests.find(row => row.chapterId === "C03");
if (!definition) throw Error("C03 test absent");
const questions = selectedTestExercises(definition, book.exercises);

function correctAnswer(exercise: Exercise): ExerciseAnswer {
  switch (exercise.type) {
    case "single-choice": return exercise.correctOptionId;
    case "gap-fill": return exercise.acceptedAnswers[0] ?? "";
    case "true-false": return String(exercise.correctValue);
    case "multiple-choice": return [...exercise.correctOptionIds];
    case "matching": return Object.fromEntries(exercise.pairs.map(pair => [pair.leftId, pair.rightId]));
    case "categorize": return Object.fromEntries(exercise.assignments.map(pair => [pair.itemId, pair.categoryId]));
    case "word-order": return [...exercise.correctOrder];
    case "highlight": return exercise.acceptedRanges[0] ?? null;
  }
}
function completeRecord(writtenResponse = "Hallo! Ich heiße Lena. Ich komme aus Finnland. Woher kommst du?") {
  return {
    ...emptyChapterTestRecord(definition),
    answers: Object.fromEntries(questions.map(question => [question.id, correctAnswer(question)])),
    selfAssessment: Object.fromEntries(definition.speechCriteria.map(item => [item.id, "onnistui" as const])),
    writtenResponse,
  };
}

test("C03 binds ten sections, five lessons and 49 real exercises without dangling IDs", () => {
  assert.deepEqual(validateBook(book), []);
  assert.equal(chapter.publicationStatus, "preview");
  assert.deepEqual(chapter.objectives, ["L1-INT-03", "L1-READ-01", "L1-MED-01"]);
  assert.equal(chapter.sections?.length, 10);
  assert.ok(chapter.sections?.every(row => row.publicationStatus === "preview"));
  assert.equal(chapter.blockIds.length, 20);
  assert.equal(chapter.exerciseIds.length, 49);
  assert.equal(new Set(chapter.exerciseIds).size, 49);
  assert.deepEqual(book.lessons.filter(row => row.chapterId === "C03" && row.publicationStatus === "preview")
    .map(row => row.id), ["L012","L013","L014","L015","L016"]);
  const map = book.blocks.find(item => item.id === "los1-c03-country-schematic");
  assert.ok(map && map.kind === "geo-schematic");
  assert.ok(chapter.sections?.find(row => row.id === "harjoittele")?.blockIds.includes(map.id));
});

test("Berna's source contains all six original Q&A positions with explicitly redacted contact number", () => {
  const source = book.sources.find(item => item.id === "M-DIB-01");
  assert.equal(source?.permittedMode, "hosted");
  assert.equal(source?.licenseUrl, "https://creativecommons.org/licenses/by/4.0/");
  assert.match(source?.modification ?? "", /puhelinnumero on poistettu/);
  assert.equal(LOS1_C03_BERNA_TURNS.length, 12);
  assert.equal(LOS1_C03_BERNA_FULL_TRANSCRIPT_WITH_REDACTION.split("\n").length, 12);
  assert.ok(LOS1_C03_BERNA_FULL_TRANSCRIPT_WITH_REDACTION.includes("Ich komme aus Deutschland."));
  assert.ok(LOS1_C03_BERNA_FULL_TRANSCRIPT_WITH_REDACTION.includes("Ich komme aus Kiel."));
  assert.ok(LOS1_C03_BERNA_FULL_TRANSCRIPT_WITH_REDACTION.includes("Telefonnummer aus Datenschutzgründen entfernt"));
  assert.equal(LOS1_C03_BERNA_FULL_TRANSCRIPT_WITH_REDACTION.includes("512-749-8940"), false);
  assert.equal(LOS1_C03_BERNA_FULL_TRANSCRIPT_WITH_REDACTION.includes("Meine Lieblingsfarbe ist, glaube ich, rot."), true);
  assert.ok(book.blocks.every(block => block.kind !== "media" || block.sourceId !== "M-DIB-01"));
  const text = book.blocks.find(item => item.id === "los1-c03-berna-dialogue");
  assert.ok(text && text.kind === "dialogue");
  assert.equal(text.sourceId, "M-DIB-01");
  assert.deepEqual(text.turns.map(row => row.text), LOS1_C03_BERNA_TURNS.map(row => row.text));
});

test("the full same licensed four-turn Ariser dialogue appears in both C02 and C03, not outside LOS", () => {
  assert.equal(LOS1_ARISER_ORIGINAL_TURNS.length, 4);
  assert.equal(LOS1_ARISER_ORIGINAL_TEXT.split("\n").length, 4);
  for (const chapterId of ["C02","C03"]) {
    const chapter = book.chapters.find(item => item.id === chapterId);
    assert.ok(chapter);
    const original = chapter.blockIds.map(id => book.blocks.find(block => block.id === id))
      .filter(block => block?.kind === "dialogue" && block.sourceId === "M-COM-02");
    assert.equal(original.length, 1);
    const text = original[0];
    assert.ok(text && text.kind === "dialogue");
    assert.deepEqual(text.turns.map(row => row.text), LOS1_ARISER_ORIGINAL_TURNS.map(row => row.text));
  }
});

test("C03 has a genuine 17-item core glossary with grammar and article exceptions", () => {
  const block = book.blocks.find(item => item.id === "los1-c03-core-vocabulary");
  assert.ok(block && block.kind === "vocabulary");
  assert.equal(block.entries.length, 17);
  assert.ok(block.entries.some(row => row.de === "die Schweiz"));
  assert.ok(block.entries.some(row => row.de === "ich komme aus …"));
  assert.ok(block.entries.every(row => row.id.startsWith("los1-c03-word-")));
  const grammar = book.blocks.find(item => item.id === "los1-c03-grammar-aus");
  assert.ok(grammar && grammar.kind === "grammar");
  assert.ok(grammar.examples.some(row => row.de === "Ich komme aus der Schweiz."));
  assert.ok(grammar.examples.some(row => row.de === "Ich komme aus den USA."));
});

test("C03's 15 questions are independently gradable and writing remains unscored", () => {
  assert.equal(questions.length, 15);
  assert.ok(questions.every(row => evaluateExercise(row, correctAnswer(row))?.correct));
  assert.equal(definition.selfAssessmentMode, "writing");
  const ready = completeRecord();
  const result = gradeChapterTest(definition, questions, ready, "2026-11-11T09:00:00Z");
  assert.equal(result?.score, 15);
  assert.equal(result?.maximum, 15);
  assert.equal(result?.writtenResponse, ready.writtenResponse);
  const noText = completeRecord(" ");
  assert.equal(gradeChapterTest(definition, questions, noText, "2026-11-11T09:00:00Z"), null);
  const oneMissing = completeRecord();
  delete oneMissing.answers[questions[0]!.id];
  assert.equal(gradeChapterTest(definition, questions, oneMissing, "2026-11-11T09:00:00Z"), null);
  assert.ok(result);
  const retried = restartChapterTest({ ...ready, submission: result });
  assert.equal(retried.previousResults[0]?.writtenResponse, ready.writtenResponse);
  assert.equal(retried.previousResults[0]?.score, 15);
  assert.equal(retried.submission, null);
});
