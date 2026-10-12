import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  BI05_CHAPTERS,
  BI05_COURSE,
  BI05_EXAMS,
  BI05_EXAM_CHAPTERS,
  BI05_EXAM_SCOPE_CONFIDENCE,
  BI05_EXAM1_FORMAT,
  BI05_EXAM1_MUST_KNOW_TOPIC_CODES,
  BI05_EXCLUDED_EXAM_CHAPTERS,
  BI05_IIRIS5_TOPICS,
  bi05ExamKeyForChapter,
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
  assert.equal(BI05_IIRIS5_TOPICS.filter((topic) => topic.schoolCovered).length, 13);
  assert.ok(BI05_IIRIS5_TOPICS.filter((topic) => topic.chapter <= 3).every((topic) => topic.schoolCovered));
  assert.ok(BI05_IIRIS5_TOPICS.filter((topic) => topic.chapter >= 4).every((topic) => !topic.schoolCovered));
});

test("BI05 exam 1 uses the teacher-confirmed scope and explicit exam format", () => {
  assert.deepEqual(BI05_EXAM_CHAPTERS["exam-1"], [1, 2, 3, 4, 7]);
  assert.equal(BI05_EXAM_SCOPE_CONFIDENCE["exam-1"], "confirmed");
  assert.deepEqual(BI05_EXAM1_MUST_KNOW_TOPIC_CODES, ["3.1", "7.2"]);
  assert.deepEqual(BI05_EXAM1_FORMAT, {
    availableTasks: 4,
    answerTasks: 3,
    multipleChoice: { count: 10, pointsEach: 1 },
    concepts: { count: 5, pointsEach: 2 },
    extendedTasks: { count: 2, pointsEach: 10 },
    maxAnsweredPoints: 30,
  });
  assert.equal(bi05ExamKeyForChapter(6), null);
  assert.equal(bi05ExamKeyForChapter(8), null);
});

test("chapter 5 stays course content but is excluded from both course exams", () => {
  assert.deepEqual(BI05_EXCLUDED_EXAM_CHAPTERS, [5]);
  const chapterFive = BI05_IIRIS5_TOPICS.filter((topic) => topic.chapter === 5);
  assert.equal(chapterFive.length, 6);
  assert.ok(chapterFive.every((topic) => topic.examEligible === false));
  assert.ok(chapterFive.every((topic) => bi05ExamKeyForChapter(topic.chapter) === null));
});

test("exam 2 planning scope remains explicitly provisional", () => {
  assert.deepEqual(BI05_EXAM_CHAPTERS["exam-2"], [9, 10, 11, 12, 13, 14]);
  assert.equal(BI05_EXAM_SCOPE_CONFIDENCE["exam-2"], "provisional");
});

test("BI05 confirmed exam-1 migration preserves the new scope and school coverage", () => {
  const migration = readFileSync(
    new URL("../supabase/migrations/20261012204500_bi05_exam1_confirmed_scope.sql", import.meta.url),
    "utf8",
  );
  assert.match(migration, /teacher-confirmed-2026-10-12/);
  assert.match(migration, /in \(1,2,3,4,7\)/i);
  assert.match(migration, /between 1 and 3/i);
  assert.match(migration, /10 monivalintaa \+ 5 käsitettä \+ 2 × 10 p tehtävää/);
  assert.match(migration, /time '08:00'/);
});
