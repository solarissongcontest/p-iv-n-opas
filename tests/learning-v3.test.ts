import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import type { CapacityProfile, Course, PlanItem, PracticeAttempt, Session, Topic } from "../src/lib/domain.ts";
import {
  LEARNING_SCHEMA_VERSION,
  buildRecoveryQueue,
  calibration,
  deriveTopicLearningState,
  examBuffer,
  hintAt,
  learningForecast,
  nextReviewDateV3,
  selectPracticeQuestion,
  todayPriority,
  weeklyLearningReview,
} from "../src/lib/learning-engine.ts";

const NOW = "2026-09-29";
const course = {
  id: "11111111-1111-4111-8111-111111111111",
  code: "FY04",
  name: "Fysiikka 4",
  exam_date: "2026-10-20",
  archived: false,
} as unknown as Course;

function topic(id: string, name: string, patch: Partial<Topic> = {}): Topic {
  return {
    id,
    owner_id: "owner",
    course_id: course.id,
    name,
    progress: 80,
    verified_level: 2,
    self_level: 3,
    weight: 1,
    importance: 4,
    school_covered: true,
    position: 0,
    dependencies: [],
    materials: null,
    basic_successes: 0,
    exam_successes: 0,
    delayed_successes: 0,
    last_review: null,
    next_review: "2026-09-29",
    retrieval_attempts: 0,
    retrieval_failures: 0,
    mastery_uncertainty: 1,
    mastery_confidence: 0,
    evidence_count: 0,
    strong_evidence_count: 0,
    recall_strength: 0,
    application_strength: 0,
    retention_strength: 0,
    forgetting_risk: 1,
    exam_relevance: 0,
    learning_state_updated_at: null,
    last_retrieval_at: null,
    last_retrieval_result: null,
    last_retrieval_confidence: null,
    last_retrieval_difficulty: null,
    ...patch,
  } as unknown as Topic;
}

function attempt(id: string, topicId: string, patch: Partial<PracticeAttempt> = {}): PracticeAttempt {
  return {
    id,
    owner_id: "owner",
    course_id: course.id,
    topic_id: topicId,
    date: "2026-09-28",
    attempt_type: "free_recall",
    prompt: "Palauta asia muistista",
    response: "oma vastaus",
    difficulty: 3,
    result: "independent",
    outcome: "correct",
    confidence: 2,
    hint_used: false,
    hints_used: 0,
    response_time_ms: 45000,
    source: "practice",
    evidence_quality: 0.82,
    skills: [],
    expected_concepts: [],
    question_payload: {},
    operation_id: null,
    schema_version: 3,
    delay_days: 5,
    created_at: "2026-09-28T12:00:00Z",
    ...patch,
  };
}

test("Learning Model schema is v3", () => {
  assert.equal(LEARNING_SCHEMA_VERSION, 3);
});

test("mastery confidence is system confidence, not student confidence", () => {
  const t = topic("t1", "Newton II");
  const rows = [
    attempt("a1", t.id, { confidence: 1, evidence_quality: 0.85 }),
    attempt("a2", t.id, { confidence: 1, attempt_type: "application", evidence_quality: 0.88 }),
    attempt("a3", t.id, { confidence: 1, attempt_type: "short_answer", evidence_quality: 0.83, delay_days: 8 }),
    attempt("a4", t.id, { confidence: 1, attempt_type: "calculation", evidence_quality: 0.86, delay_days: 10 }),
    attempt("a5", t.id, { confidence: 1, attempt_type: "application", evidence_quality: 0.9, delay_days: 12 }),
  ];
  const state = deriveTopicLearningState(t, rows, { now: NOW, examDate: course.exam_date });
  assert.ok(state.masteryConfidence > 0.4);
  assert.ok(state.strongEvidenceCount >= 5);
  assert.ok(state.masteryLevel >= 4);
});

test("one success cannot create fake strong mastery", () => {
  const t = topic("t2", "Kitka");
  const state = deriveTopicLearningState(t, [attempt("a1", t.id)], { now: NOW });
  assert.ok(state.masteryLevel <= 2);
  assert.ok(state.evidenceCount === 1);
  assert.notEqual(state.masteryLabel, "Vahva");
});

test("multiple hints shorten the next review interval", () => {
  const t = topic("t3", "Energia");
  const evidence = [
    attempt("a1", t.id, { evidence_quality: 0.9, delay_days: 8 }),
    attempt("a2", t.id, { evidence_quality: 0.9, attempt_type: "application", delay_days: 8 }),
    attempt("a3", t.id, { evidence_quality: 0.9, attempt_type: "calculation", delay_days: 8 }),
  ];
  const state = deriveTopicLearningState(t, evidence, { now: NOW });
  const independent = attempt("x1", t.id, { date: NOW, hints_used: 0, hint_used: false, delay_days: 8, evidence_quality: 0.9 });
  const hinted = attempt("x2", t.id, { date: NOW, hints_used: 2, hint_used: true, delay_days: 8, evidence_quality: 0.6 });
  const independentDate = nextReviewDateV3(state, independent, { now: NOW });
  const hintedDate = nextReviewDateV3(state, hinted, { now: NOW });
  assert.ok(hintedDate < independentDate);
});

test("recovery queue respects capacity and hides backlog", () => {
  const topics = [
    topic("r1", "A", { verified_level: 1, next_review: "2026-09-20" }),
    topic("r2", "B", { verified_level: 1, next_review: "2026-09-21" }),
    topic("r3", "C", { verified_level: 2, next_review: "2026-09-22" }),
    topic("r4", "D", { verified_level: 2, next_review: "2026-09-23" }),
  ];
  const attempts = topics.map((t, index) =>
    attempt("ra" + index, t.id, { result: "not_yet", outcome: "incorrect", evidence_quality: 0.1 }),
  );
  const queue = buildRecoveryQueue({ topics, attempts, courses: [course], now: NOW, capacityMinutes: 10, maxItems: 3 });
  assert.ok(queue.items.length <= 2);
  assert.ok(queue.estimatedMinutes <= 14);
  assert.ok(queue.hiddenCount > 0);
});

test("adaptive practice blocks first and interleaves after basic mastery", () => {
  const a = topic("p1", "Newton II");
  const b = topic("p2", "Kitka");
  const weak = selectPracticeQuestion({ topics: [a, b], attempts: [], selectedTopicId: a.id, course, index: 1 });
  assert.equal(weak?.topic.id, a.id);
  assert.equal(weak?.interleaved, false);

  const evidence = [
    attempt("p-a1", a.id, { evidence_quality: 0.82 }),
    attempt("p-a2", a.id, { evidence_quality: 0.84, attempt_type: "short_answer" }),
    attempt("p-b1", b.id, { evidence_quality: 0.5 }),
  ];
  const mixed = selectPracticeQuestion({ topics: [a, b], attempts: evidence, selectedTopicId: a.id, course, index: 1 });
  assert.equal(mixed?.topic.id, b.id);
  assert.equal(mixed?.interleaved, true);
});

test("hint ladder exposes only the requested hint level", () => {
  const t = topic("h1", "Liikemäärä");
  const selection = selectPracticeQuestion({ topics: [t], attempts: [], selectedTopicId: t.id, course, index: 0 });
  assert.ok(selection);
  assert.notEqual(hintAt(selection!.question, 1), "");
  assert.notEqual(hintAt(selection!.question, 2), hintAt(selection!.question, 1));
});

test("exam buffer leaves deliberate days before the exam", () => {
  const topics = Array.from({ length: 12 }, (_, index) => topic("e" + index, "Aihe " + index, { verified_level: index < 5 ? 1 : 3 }));
  const capacity: CapacityProfile = {
    studyWeekdays: [1, 2, 3, 4, 5],
    weekdayMinMinutes: 30,
    weekdayMinutes: 60,
    weekendMinMinutes: 60,
    weekendMinutes: 120,
    busyDates: [],
  };
  const buffer = examBuffer({ examDate: "2026-10-20", topics, attempts: [], capacity, now: NOW });
  assert.ok(buffer.contentDeadline < buffer.simulationDate);
  assert.ok(buffer.simulationDate < "2026-10-20");
  assert.equal(buffer.lightDate, "2026-10-19");
  assert.ok(buffer.bufferDays >= 2);
});

test("calibration detects over- and under-confidence without ranking", () => {
  const t = topic("c1", "Kiihtyvyys");
  const over = calibration({
    attempts: [
      attempt("c1", t.id, { confidence: 3, result: "not_yet", outcome: "incorrect" }),
      attempt("c2", t.id, { confidence: 3, result: "hinted", outcome: "partial" }),
      attempt("c3", t.id, { confidence: 3, result: "not_yet", outcome: "incorrect" }),
    ],
  });
  assert.ok(over);
  assert.ok(over!.gap > 0);
  assert.match(over!.label, /korkeampi/);
});

test("forecast returns a range and changes with adherence evidence", () => {
  const t = topic("f1", "Newton II", { progress: 50 });
  const sessions = [
    { id: "s1", owner_id: "o", course_id: course.id, topic_id: t.id, date: "2026-09-10", minutes: 30 },
    { id: "s2", owner_id: "o", course_id: course.id, topic_id: t.id, date: "2026-09-17", minutes: 30 },
    { id: "s3", owner_id: "o", course_id: course.id, topic_id: t.id, date: "2026-09-24", minutes: 30 },
  ] as unknown as Session[];
  const plan = [
    { id: "pl1", course_id: course.id, topic_id: t.id, date: "2026-09-10", kind: "study", status: "completed", target_minutes: 30 },
    { id: "pl2", course_id: course.id, topic_id: t.id, date: "2026-09-17", kind: "study", status: "completed", target_minutes: 30 },
    { id: "pl3", course_id: course.id, topic_id: t.id, date: "2026-09-24", kind: "study", status: "completed", target_minutes: 30 },
  ] as unknown as PlanItem[];
  const forecast = learningForecast({ course, topics: [t], attempts: [attempt("fa1", t.id)], sessions, plan, now: NOW });
  assert.ok(forecast.earliest <= forecast.latest);
  assert.ok(forecast.adherence > 0.9);
  assert.match(forecast.note, /muuttuu/);
});

test("weekly review prioritizes learning evidence over minutes", () => {
  const t = topic("w1", "Newton II");
  const attempts = [
    attempt("w1", t.id, { date: "2026-09-28", evidence_quality: 0.85 }),
    attempt("w2", t.id, { date: "2026-09-29", evidence_quality: 0.82 }),
  ];
  const review = weeklyLearningReview({ courses: [course], topics: [t], attempts, sessions: [], plan: [], now: NOW });
  assert.equal(review.strengthened[0]?.topic.id, t.id);
});

test("today priority explains why the task matters", () => {
  const t = topic("d1", "Kitka", { next_review: "2026-09-20", mastery_uncertainty: 0.9 });
  const item = {
    id: "item",
    course_id: course.id,
    topic_id: t.id,
    date: NOW,
    target_minutes: 20,
    kind: "review",
    status: "planned",
  } as unknown as PlanItem;
  const result = todayPriority({ item, courses: [course], topics: [t], attempts: [attempt("d-a", t.id)], mistakes: [], now: NOW });
  assert.ok(result.score > 0);
  assert.ok(result.reason.length > 8);
});

test("migration includes schema v3, idempotent operation ids and rich evidence", () => {
  const sql = readFileSync(new URL("../supabase/migrations/20260929143000_learning_model_v3.sql", import.meta.url), "utf8");
  assert.match(sql, /learning_schema_version/);
  assert.match(sql, /operation_id/);
  assert.match(sql, /practice_attempts_owner_operation_idx/);
  assert.match(sql, /hints_used/);
  assert.match(sql, /evidence_quality/);
  assert.match(sql, /weekday_capacity_min_minutes/);
});
