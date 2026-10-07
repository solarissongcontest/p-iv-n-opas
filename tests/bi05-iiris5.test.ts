import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  BI05_CHAPTERS,
  BI05_COURSE,
  BI05_EXAMS,
  BI05_EXCLUDED_EXAM_CHAPTERS,
  BI05_IIRIS5_TOPICS,
  BI05_PROVISIONAL_EXAM_CHAPTERS,
  bi05ProvisionalExamKeyForChapter,
} from "../src/lib/bi05-iiris5.ts";

test("BI05 canonical Iiris 5 structure has 14 chapters and 63 subchapters", () => {
  assert.equal(BI05_CHAPTERS.length, 14);
  assert.equal(BI05_IIRIS5_TOPICS.length, 63);
  assert.deepEqual(BI05_IIRIS5_TOPICS.map((topic) => topic.position), Array.from({ length: 63 }, (_, i) => i + 1));
  assert.equal(BI05_IIRIS5_TOPICS[0]?.name, "1.1 Kudokset");
  assert.equal(BI05_IIRIS5_TOPICS.at(-1)?.name, "14.6 Raskauteen liittyviä ongelmia");
  assert.ok(Math.abs(BI05_IIRIS5_TOPICS.reduce((sum, topic) => sum + topic.weight, 0) - 100) < 0.000001);
});

test("BI05 fixed course facts match the confirmed school schedule", () => {
  assert.equal(BI05_COURSE.startDate, "2026-10-06");
  assert.equal(BI05_COURSE.targetValue, "10");
  assert.deepEqual(BI05_EXAMS.map((exam) => exam.date), ["2026-10-29", "2026-11-20"]);
  assert.equal(BI05_IIRIS5_TOPICS.filter((topic) => topic.schoolCovered).length, 1);
  assert.equal(BI05_IIRIS5_TOPICS.find((topic) => topic.schoolCovered)?.code, "1.1");
});

test("chapter 5 stays course content but is excluded from both course exams", () => {
  assert.deepEqual(BI05_EXCLUDED_EXAM_CHAPTERS, [5]);
  const chapterFive = BI05_IIRIS5_TOPICS.filter((topic) => topic.chapter === 5);
  assert.equal(chapterFive.length, 6);
  assert.ok(chapterFive.every((topic) => topic.examEligible === false));
  assert.ok(chapterFive.every((topic) => bi05ProvisionalExamKeyForChapter(topic.chapter) === null));
});

test("unconfirmed half-and-half scope remains explicitly provisional", () => {
  assert.deepEqual(BI05_PROVISIONAL_EXAM_CHAPTERS["exam-1"], [1, 2, 3, 4, 6, 7, 8]);
  assert.deepEqual(BI05_PROVISIONAL_EXAM_CHAPTERS["exam-2"], [9, 10, 11, 12, 13, 14]);
  const included = [
    ...BI05_PROVISIONAL_EXAM_CHAPTERS["exam-1"],
    ...BI05_PROVISIONAL_EXAM_CHAPTERS["exam-2"],
  ];
  assert.equal(new Set(included).size, 13);
  assert.ok(!included.includes(5));
});

test("BI05 migration preserves confirmed versus provisional exam-scope semantics", () => {
  const migration = readFileSync(
    new URL("../supabase/migrations/20261007184500_bi05_iiris5_multi_exam.sql", import.meta.url),
    "utf8",
  );
  assert.match(migration, /'excluded', 'confirmed', 'user-confirmed-2026-10-07'/);
  assert.match(migration, /'included', 'provisional', 'planning-estimate-2026-10-07'/);
  assert.match(migration, /split_part\(t\.name,'\.',1\)::integer = 5/);
  assert.match(migration, /'BI05 koe 1','2026-10-29'/);
  assert.match(migration, /'BI05 koe 2','2026-11-20'/);
  assert.match(migration, /revoke all on table public\.exam_topic_scopes from anon/);
  assert.match(migration, /enable row level security/);
});
