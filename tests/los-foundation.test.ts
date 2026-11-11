import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { LOS_BOOKS } from "../src/features/los/books.ts";
import { evaluateExercise } from "../src/features/los/exercises/evaluate.ts";
import { validateBook } from "../src/features/los/model.ts";
import { LOS1_C01_AUTHENTIC_TEXT, LOS1_C01_DIALOGUE_TURNS } from "../src/features/los/los1-c01-source.ts";
import { findGlossarySpans } from "../src/features/los/glossary.ts";
import { LOS_CHAPTER_SECTION_TITLES } from "../src/features/los/chapterSections.ts";

const los1 = LOS_BOOKS[0];
if (!los1) throw new Error("LOS! 1 must exist");

test("LOS! 1 retains 10 chapters and 60 canonical lessons, with three preview lessons", () => {
  assert.equal(los1.chapters.length, 10);
  assert.equal(los1.lessons.length, 60);
  assert.deepEqual(los1.chapters.map(item => item.id), Array.from({ length: 10 }, (_, i) => "C" + String(i + 1).padStart(2, "0")));
  assert.deepEqual(los1.lessons.map(item => item.id), Array.from({ length: 60 }, (_, i) => "L" + String(i + 1).padStart(3, "0")));
  assert.equal(los1.chapters.filter(item => item.publicationStatus === "preview").length, 1);
  assert.equal(los1.chapters.filter(item => item.publicationStatus === "published").length, 0);
  assert.deepEqual(los1.lessons.filter(item => item.publicationStatus === "preview").map(item => item.id), ["L001", "L002", "L003"]);
  assert.ok(los1.lessons.filter(item => item.publicationStatus !== "preview").every(item => !item.steps.length));
  assert.deepEqual(validateBook(los1), []);
});
test("each planned chapter exposes exactly ten routable sections", () => {
  const ids = LOS_CHAPTER_SECTION_TITLES.map(section => section.id);
  assert.equal(ids.length, 10);
  assert.equal(new Set(ids).size, 10);
  for (const chapter of los1.chapters) {
    assert.deepEqual(chapter.sections?.map(section => section.id), ids);
    assert.ok(chapter.sections?.every(section =>
      section.blockIds.every(id => chapter.blockIds.includes(id)) &&
      section.exerciseIds.every(id => chapter.exerciseIds.includes(id))));
  }
  const first = los1.chapters[0];
  assert.ok(first);
  assert.equal(first.sections?.find(section => section.id === "teksti-a")?.blockIds.includes("los1-c01-m-com-01-dialogue"), true);
  assert.equal(first.sections?.find(section => section.id === "teksti-b")?.publicationStatus, "planned");
});
test("L001 begins without prerequisite German and stores an ungraded personal goal", () => {
  const lesson = los1.lessons.find(item => item.id === "L001");
  assert.ok(lesson);
  assert.equal(lesson.publicationStatus, "preview");
  assert.ok(lesson.steps.length >= 5);
  const reflection = lesson.steps.find(step => step.reflectionPromptFi);
  assert.ok(reflection);
  assert.equal(reflection.required, true);
  assert.equal(reflection.blockId, undefined);
  assert.equal(reflection.exerciseId, undefined);
  assert.ok(lesson.steps.some(step => step.blockId === "los1-c01-m-com-01-dialogue"));
  assert.ok(lesson.steps.some(step => step.blockId === "los1-c01-m-com-01-audio"));
});
test("only the verified Wikimedia original is enabled; 22 other sources remain pending", () => {
  assert.equal(los1.sources.length, 23);
  assert.equal(los1.sources.filter(source => source.permittedMode === "pending").length, 22);
  const source = los1.sources.find(item => item.id === "M-COM-01");
  assert.equal(source?.permittedMode, "embed");
  assert.equal(source?.licenseUrl, "https://creativecommons.org/licenses/by-sa/3.0/");
  const dialogue = los1.blocks.find(block => block.kind === "dialogue");
  assert.ok(dialogue && dialogue.kind === "dialogue");
  assert.equal(dialogue.turns.length, 8);
  assert.deepEqual(dialogue.turns.map(turn => turn.text), LOS1_C01_DIALOGUE_TURNS.map(turn => turn.text));
  assert.equal(LOS1_C01_AUTHENTIC_TEXT, LOS1_C01_DIALOGUE_TURNS.map(turn => turn.text).join("\n"));
  assert.ok(los1.blocks.some(block => block.kind === "media" && block.sourceId === "M-COM-01"));
  assert.equal(los1.blocks.filter(block => block.kind === "dialogue").length, 1);
});
test("C01's original editorial vocabulary and four exercises evaluate correctly", () => {
  const c01 = los1.chapters.find(chapter => chapter.id === "C01");
  assert.ok(c01);
  assert.equal(c01.exerciseIds.length, 7);
  assert.ok(c01.blockIds.length >= 8);
  const choice = los1.exercises.find(ex => ex.type === "single-choice");
  const gap = los1.exercises.find(ex => ex.type === "gap-fill");
  const match = los1.exercises.find(ex => ex.type === "matching");
  const highlight = los1.exercises.find(ex => ex.type === "highlight");
  assert.ok(choice && gap && match && highlight);
  assert.equal(evaluateExercise(choice, "morning")?.correct, true);
  assert.equal(evaluateExercise(choice, "night")?.correct, false);
  assert.equal(evaluateExercise(gap, "morgen")?.correct, true);
  assert.equal(evaluateExercise(gap, "abend")?.correct, false);
  assert.equal(evaluateExercise(match, { morgen:"morning", abend:"evening", tag:"day", tschuess:"bye" })?.correct, true);
  assert.equal(evaluateExercise(match, { morgen:"evening", abend:"morning", tag:"day", tschuess:"bye" })?.correct, false);
  assert.equal(evaluateExercise(highlight, highlight.acceptedRanges[0] ?? null)?.correct, true);
});
test("original-source highlighting is tied to the full licensed dialogue", () => {
  const exercise = los1.exercises.find(item => item.id === "los1-c01-text-a-highlight-greeting");
  assert.ok(exercise && exercise.type === "highlight");
  assert.equal(exercise.text, LOS1_C01_AUTHENTIC_TEXT);
  assert.equal(exercise.blockId, "los1-c01-m-com-01-dialogue");
  assert.equal(evaluateExercise(exercise, { start: 0, end: 5 })?.correct, true);
  assert.equal(evaluateExercise(exercise, { start: 0, end: 8 })?.correct, false);
});
test("curated dictionary lookup matches whole words and prioritizes phrases", () => {
  const entries = [
    { id: "hello", de: "hallo", fi: "hei" },
    { id: "i", de: "ich", fi: "minä" },
    { id: "until", de: "bis", fi: "saakka" },
    { id: "soon", de: "bis später", fi: "nähdään myöhemmin" },
  ];
  const spans = findGlossarySpans("Hallo, ich heiße Franz. Bis später!", entries);
  assert.deepEqual(spans.map(span => ({ value: "Hallo, ich heiße Franz. Bis später!".slice(span.start, span.end), id: span.entry.id })), [
    { value: "Hallo", id: "hello" },
    { value: "ich", id: "i" },
    { value: "Bis später", id: "soon" },
  ]);
  assert.deepEqual(findGlossarySpans("nicht", [{ id: "i", de: "ich", fi: "minä" }]), []);
});
test("LOS! cloud schema requires ownership, RLS and idempotent write constraints", () => {
  const sql = readFileSync("supabase/migrations/20261110214000_los_personal_records.sql", "utf8");
  assert.match(sql, /enable row level security/i);
  assert.match(sql, /owner_id\s*=\s*\(select auth.uid\(\)\)/i);
  assert.match(sql, /security invoker/i);
  assert.match(sql, /client_updated_at\s*<=\s*excluded.client_updated_at/i);
  assert.match(sql, /revoke all on table\s+public.los_user_records\s+from anon/i);
});
