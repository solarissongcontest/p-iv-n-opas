import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { LOS_BOOKS } from "../src/features/los/books.ts";
import { evaluateExercise } from "../src/features/los/exercises/evaluate.ts";
import { validateBook } from "../src/features/los/model.ts";

const los1 = LOS_BOOKS[0];
if (!los1) throw new Error("LOS! 1 must exist");

test("LOS! 1 holds precisely ten planned chapters and sixty canonical lessons", () => {
  assert.equal(los1.chapters.length, 10);
  assert.equal(los1.lessons.length, 60);
  assert.deepEqual(los1.chapters.map(item => item.id), Array.from({ length: 10 }, (_, i) => "C" + String(i + 1).padStart(2, "0")));
  assert.deepEqual(los1.lessons.map(item => item.id), Array.from({ length: 60 }, (_, i) => "L" + String(i + 1).padStart(3, "0")));
  assert.ok(los1.chapters.every(item => item.publicationStatus === "planned"));
  assert.ok(los1.lessons.every(item => item.publicationStatus === "planned"));
  assert.ok(los1.lessons.every(item => item.steps.length === 0));
  assert.deepEqual(validateBook(los1), []);
});
test("LOS! 1 research source inventory is not mistaken for published text or media", () => {
  assert.equal(los1.sources.length, 23);
  assert.ok(los1.sources.every(source => source.permittedMode === "pending"));
  assert.equal(los1.blocks.some(block => block.kind === "authenticText" || block.kind === "dialogue"), false);
  assert.equal(los1.blocks.some(block => block.kind === "media"), false);
});
test("C01's original editorial vocabulary and four exercises evaluate correctly", () => {
  const c01 = los1.chapters.find(chapter => chapter.id === "C01");
  assert.ok(c01);
  assert.equal(c01.exerciseIds.length, 4);
  assert.ok(c01.blockIds.length >= 3);
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
test("LOS! cloud schema requires ownership, RLS and idempotent write constraints", () => {
  const sql = readFileSync("supabase/migrations/20261110214000_los_personal_records.sql", "utf8");
  assert.match(sql, /enable row level security/i);
  assert.match(sql, /owner_id\s*=\s*\(select auth.uid\(\)\)/i);
  assert.match(sql, /security invoker/i);
  assert.match(sql, /client_updated_at\s*<=\s*excluded.client_updated_at/i);
  assert.match(sql, /revoke all on table\s+public.los_user_records\s+from anon/i);
});
