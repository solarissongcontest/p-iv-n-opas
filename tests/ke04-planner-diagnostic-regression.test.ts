import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import type { Course, Topic } from "../src/lib/domain.ts";
import { generatePlan } from "../src/lib/domain.ts";

const COURSE_ID = "11111111-1111-4111-8111-111111111111";
const WEIGHTS = [8, 18, 9, 8, 17, 5, 10, 10, 5, 3, 2, 2, 1, 2];
const NAMES = [
  "1.1 Reaktioyhtälön kirjoittaminen ja tasapainottaminen",
  "1.2 Tasapainotetun reaktioyhtälön käyttö ja reaktion saanto",
  "1.3 Reaktion rajoittava tekijä",
  "1.4 Kaasureaktioiden stoikiometria – ideaalikaasun tilanyhtälö",
  "2.1 Reaktiotyypit",
  "3.1 Substituutioreaktio",
  "3.2 Additio- ja eliminaatioreaktio",
  "3.3 Kondensaatio- ja hydrolyysireaktio",
  "4.1 Polymeerit ja polymeroitumisreaktiot",
  "4.2 Muovit ja tekokuidut ovat polymeerien ja lisäaineiden seoksia",
  "5.1 Hiilihydraatit",
  "5.2 Aminohapot ja proteiinit",
  "5.3 Nukleiinihapot",
  "5.4 Lipidit",
];

function topic(index: number): Topic {
  return {
    id: `22222222-2222-4222-8222-${String(index + 1).padStart(12, "0")}`,
    course_id: COURSE_ID,
    name: NAMES[index],
    position: index + 1,
    weight: WEIGHTS[index],
    importance: index < 5 ? 5 : 3,
    progress: index === 0 ? 17 : 0,
    verified_level: 0,
    self_level: 0,
    next_review: index === 0 ? "2026-10-07" : null,
    last_review: index === 0 ? "2026-10-06" : null,
    school_covered: false,
    dependencies: [],
    basic_successes: 0,
    exam_successes: 0,
    delayed_successes: 0,
    retrieval_attempts: index === 0 ? 3 : 0,
    retrieval_failures: 0,
    mastery_uncertainty: 1,
    last_retrieval_at: index === 0 ? "2026-10-06" : null,
    last_retrieval_result: index === 0 ? "independent" : null,
    last_retrieval_confidence: null,
    last_retrieval_difficulty: null,
  } as unknown as Topic;
}

function course(): Course {
  return {
    id: COURSE_ID,
    code: "KE04",
    name: "Kemialliset reaktiot",
    subject: "Kemia",
    start_date: "2026-10-05",
    exam_date: "2026-11-23",
    weekly_minutes: 195,
  } as unknown as Course;
}

test("KE04 planner advances a due topic instead of repeating 1.1 every day", () => {
  const topics = NAMES.map((_, index) => topic(index));
  const plan = generatePlan({
    course: course(),
    topics,
    examDate: "2026-11-23",
    studyWeekdays: [2, 4, 5, 6, 7],
    weeklyMinutes: 195,
    fromISO: "2026-10-07",
  });
  const study = plan.filter((item) => item.kind !== "exam");
  assert.ok(study.length > 20);

  const oneOne = topics[0]!.id;
  const firstTwo = study.slice(0, 2);
  assert.equal(firstTwo[0]?.topic_id, oneOne, "the already-due 1.1 may be reviewed first");
  assert.notEqual(firstTwo[1]?.topic_id, oneOne, "1.1 must not remain due forever after its planned review");

  const oneOneCount = study.filter((item) => item.topic_id === oneOne).length;
  assert.ok(oneOneCount < study.length / 2, "one due topic must not monopolise the plan");
});

test("KE04 planner covers every textbook subchapter and gives heavy topics more content", () => {
  const topics = NAMES.map((_, index) => topic(index));
  const plan = generatePlan({
    course: course(),
    topics,
    examDate: "2026-11-23",
    studyWeekdays: [2, 4, 5, 6, 7],
    weeklyMinutes: 195,
    fromISO: "2026-10-07",
  });

  const beforeExamMode = plan.filter(
    (item) => item.kind !== "exam" && item.date <= "2026-11-08",
  );
  const covered = new Set(beforeExamMode.filter((item) => item.phase === "content").map((item) => item.topic_id));
  for (const candidate of topics.slice(1)) {
    assert.ok(covered.has(candidate.id), `${candidate.name} should receive a first-pass content session`);
  }

  const content = plan.filter((item) => item.phase === "content");
  const chapter12 = content.filter((item) => item.topic_id === topics[1]!.id).length;
  const chapter53 = content.filter((item) => item.topic_id === topics[12]!.id).length;
  assert.ok(chapter12 > chapter53, "18-point chapter 1.2 should receive more content sessions than 1-point chapter 5.3");
});

test("topic diagnostic is locked to the selected topic and disables interleaving", () => {
  const source = readFileSync(new URL("../src/features/practice/PracticeView.tsx", import.meta.url), "utf8");
  assert.match(source, /diagnosticTopicId/);
  assert.match(source, /effectiveTopicId = diagnosticMode \? \(diagnosticTopicId \?\? topicId\) : topicId/);
  assert.match(source, /diagnosticMode\s*\? "blocked" as const/);
  assert.match(source, /diagnosticMode && effectiveTopicId[\s\S]*candidate\.id === effectiveTopicId/);
  assert.doesNotMatch(source, /courseTopics\[attemptIndex % Math\.max\(1, courseTopics\.length\)\]/);
});
