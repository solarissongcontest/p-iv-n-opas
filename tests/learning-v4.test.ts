import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import type {
  CapacityProfile,
  Course,
  Mistake,
  PlanItem,
  PracticeAttempt,
  Topic,
} from "../src/lib/domain.ts";
import {
  LEARNING_OS_VERSION,
  adaptiveDayPlanV4,
  learningOsSelfCheckV4,
  masteryModelV4,
  nextBestActionsV4,
  practicePathV4,
  simulateLearningOsV4,
} from "../src/lib/learning-os-v4.ts";

const NOW = "2026-09-29";

const course = {
  id: "11111111-1111-4111-8111-111111111111",
  code: "FY04",
  name: "Fysiikka 4",
  subject: "Fysiikka",
  exam_date: "2026-10-20",
  target_system: "school",
  target_value: "9",
  weekly_minutes: 180,
  archived: false,
} as unknown as Course;

function topic(id: string, name: string, patch: Partial<Topic> = {}): Topic {
  return {
    id,
    owner_id: "owner",
    course_id: course.id,
    name,
    progress: 70,
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
    last_review: "2026-09-20",
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
    forgetting_risk: 0.55,
    exam_relevance: 0.5,
    learning_state_updated_at: null,
    last_retrieval_at: null,
    last_retrieval_result: null,
    last_retrieval_confidence: null,
    last_retrieval_difficulty: null,
    study_minutes: 0,
    ...patch,
  } as unknown as Topic;
}

function attempt(
  id: string,
  topicId: string,
  patch: Partial<PracticeAttempt> = {},
): PracticeAttempt {
  return {
    id,
    owner_id: "owner",
    course_id: course.id,
    topic_id: topicId,
    date: "2026-09-28",
    attempt_type: "free_recall",
    prompt: "Palauta asia muistista.",
    response: "Oma vastaus",
    difficulty: 3,
    result: "independent",
    outcome: "correct",
    confidence: 2,
    hint_used: false,
    hints_used: 0,
    response_time_ms: 30_000,
    source: "practice",
    evidence_quality: 0.82,
    skills: [],
    expected_concepts: [],
    question_payload: {},
    operation_id: null,
    schema_version: 3,
    delay_days: 0,
    created_at: "2026-09-28T12:00:00Z",
    ...patch,
  };
}

const capacity: CapacityProfile = {
  studyWeekdays: [1, 2, 3, 4, 5],
  weekdayMinMinutes: 20,
  weekdayMinutes: 60,
  weekendMinMinutes: 30,
  weekendMinutes: 90,
  busyDates: [],
};

test("Learning OS version is v4", () => {
  assert.equal(LEARNING_OS_VERSION, 4);
});

test("one correct answer cannot create strong mastery", () => {
  const t = topic("t1", "Newton II");
  const model = masteryModelV4(t, [attempt("a1", t.id)], { now: NOW });
  assert.ok(model.level <= 2);
  assert.notEqual(model.label, "Strong");
  assert.ok(model.confidence < 0.7);
});

test("one wrong answer does not collapse established mastery to zero", () => {
  const t = topic("t2", "Energia");
  const strong = [
    attempt("a1", t.id, { date: "2026-09-10", attempt_type: "free_recall", delay_days: 3 }),
    attempt("a2", t.id, { date: "2026-09-14", attempt_type: "explanation", delay_days: 4 }),
    attempt("a3", t.id, { date: "2026-09-18", attempt_type: "application", difficulty: 4, delay_days: 4 }),
    attempt("a4", t.id, { date: "2026-09-23", attempt_type: "simulation", difficulty: 5, delay_days: 5 }),
    attempt("a5", t.id, { date: "2026-09-27", attempt_type: "free_recall", delay_days: 4 }),
  ];
  const before = masteryModelV4(t, strong, { now: NOW });
  const after = masteryModelV4(t, [
    ...strong,
    attempt("bad", t.id, {
      date: NOW,
      result: "not_yet",
      outcome: "incorrect",
      confidence: 1,
      evidence_quality: 0.45,
    }),
  ], { now: NOW });
  assert.ok(after.score > 25);
  assert.ok(after.level >= 2);
  assert.ok(before.score >= after.score);
});

test("repeated evidence increases system confidence", () => {
  const t = topic("t3", "Liikemäärä");
  const one = masteryModelV4(t, [attempt("a1", t.id)], { now: NOW });
  const many = masteryModelV4(t, [
    attempt("a1", t.id, { date: "2026-09-18" }),
    attempt("a2", t.id, { date: "2026-09-21", attempt_type: "explanation" }),
    attempt("a3", t.id, { date: "2026-09-24", attempt_type: "application", difficulty: 4 }),
    attempt("a4", t.id, { date: "2026-09-28", attempt_type: "short_answer" }),
  ], { now: NOW });
  assert.ok(many.confidence > one.confidence);
});

test("delayed success raises retention evidence", () => {
  const t = topic("t4", "Impulssi");
  const immediate = masteryModelV4(t, [
    attempt("i1", t.id, { delay_days: 0 }),
    attempt("i2", t.id, { attempt_type: "short_answer", delay_days: 0 }),
  ], { now: NOW });
  const delayed = masteryModelV4(t, [
    attempt("d1", t.id, { date: "2026-09-20", delay_days: 4 }),
    attempt("d2", t.id, { date: "2026-09-27", attempt_type: "short_answer", delay_days: 7 }),
  ], { now: NOW });
  assert.ok(delayed.dimensions.retention.evidence > immediate.dimensions.retention.evidence);
  assert.ok(delayed.dimensions.retention.score >= immediate.dimensions.retention.score);
});

test("hint-dependent success is weaker and requires independent verification", () => {
  const t = topic("t5", "Kitka");
  const independent = masteryModelV4(t, [
    attempt("i1", t.id, { hints_used: 0, hint_used: false }),
  ], { now: NOW });
  const assistedAttempt = attempt("h1", t.id, {
    hints_used: 2,
    hint_used: true,
    question_payload: { coachUsed: true, scaffoldStage: "guided" },
  });
  const assisted = masteryModelV4(t, [assistedAttempt], { now: NOW });
  assert.ok(independent.confidence > assisted.confidence);
  assert.equal(assisted.verificationRequired, true);
  assert.equal(practicePathV4(t, [assistedAttempt], { now: NOW }).stage, "delayed_verification");
});

test("high-confidence wrong answer creates a blind spot", () => {
  const t = topic("t6", "Voimakuvio");
  const model = masteryModelV4(t, [
    attempt("b1", t.id, {
      result: "not_yet",
      outcome: "incorrect",
      confidence: 3,
      evidence_quality: 0.65,
    }),
    attempt("b2", t.id, {
      date: NOW,
      result: "not_yet",
      outcome: "incorrect",
      confidence: 3,
      evidence_quality: 0.65,
    }),
  ], { now: NOW });
  assert.equal(model.blindSpot, true);
});

test("high application mastery is gated by transfer evidence", () => {
  const t = topic("t7", "Ympyräliike");
  const recallOnly = masteryModelV4(t, [
    attempt("r1", t.id, { date: "2026-09-18", attempt_type: "free_recall" }),
    attempt("r2", t.id, { date: "2026-09-21", attempt_type: "explanation" }),
    attempt("r3", t.id, { date: "2026-09-25", attempt_type: "short_answer" }),
    attempt("r4", t.id, { date: "2026-09-28", attempt_type: "free_recall" }),
  ], { now: NOW });
  assert.ok(recallOnly.dimensions.application.score < 75);
  assert.ok(recallOnly.level < 5);

  const withTransfer = masteryModelV4(t, [
    attempt("r1", t.id, { date: "2026-09-18", attempt_type: "free_recall" }),
    attempt("r2", t.id, { date: "2026-09-21", attempt_type: "explanation" }),
    attempt("r3", t.id, { date: "2026-09-25", attempt_type: "application", difficulty: 4, delay_days: 4 }),
    attempt("r4", t.id, { date: "2026-09-28", attempt_type: "simulation", difficulty: 5, delay_days: 3 }),
  ], { now: NOW });
  assert.ok(withTransfer.dimensions.application.evidence > recallOnly.dimensions.application.evidence);
});

test("downstream failures create prerequisite/root-cause pressure", () => {
  const prerequisite = topic("p1", "Vektorit", {
    progress: 35,
    importance: 5,
    next_review: "2026-09-20",
  });
  const downstream = topic("p2", "Voimien hajottaminen", {
    dependencies: [prerequisite.id],
    progress: 75,
    next_review: "2026-10-10",
  });
  const attempts = [
    attempt("f1", downstream.id, { result: "not_yet", outcome: "incorrect", date: "2026-09-27" }),
    attempt("f2", downstream.id, { result: "not_yet", outcome: "incorrect", date: "2026-09-28" }),
    attempt("f3", downstream.id, { result: "hinted", outcome: "partial", date: NOW }),
  ];
  const actions = nextBestActionsV4({
    courses: [course],
    topics: [prerequisite, downstream],
    plan: [],
    attempts,
    mistakes: [],
    now: NOW,
  });
  const root = actions.find((action) => action.topic?.id === prerequisite.id);
  assert.ok(root);
  assert.match(root!.reason, /esitieto/);
});

test("adaptive daily plan never exceeds capacity", () => {
  const topics = Array.from({ length: 6 }, (_, index) =>
    topic("cap" + index, "Aihe " + index, {
      importance: 5,
      next_review: "2026-09-20",
      progress: 30,
    }),
  );
  const day = adaptiveDayPlanV4({
    courses: [course],
    topics,
    plan: [],
    attempts: [],
    mistakes: [],
    capacity,
    now: NOW,
  });
  assert.ok(day.minimumMinutes <= day.capacity);
  assert.ok(day.recommendedMinutes <= day.capacity);
  assert.ok(day.extraMinutes <= day.capacity);
  assert.ok(day.recommended.length <= 3);
});

test("deterministic simulation stays in sensible bounds", () => {
  const t1 = topic("s1", "Newton II", { next_review: NOW });
  const t2 = topic("s2", "Kitka", { next_review: NOW });
  const input = {
    courses: [course],
    topics: [t1, t2],
    plan: [] as PlanItem[],
    attempts: [] as PracticeAttempt[],
    mistakes: [] as Mistake[],
    capacity,
    days: 60,
    start: NOW,
  };
  const first = simulateLearningOsV4(input);
  const second = simulateLearningOsV4(input);
  assert.deepEqual(first, second);
  for (const row of first) {
    assert.ok(row.meanMastery >= 0 && row.meanMastery <= 100);
    assert.ok(row.meanConfidence >= 0 && row.meanConfidence <= 100);
    assert.ok(row.overloadDays >= 0);
  }
});

test("self-check keeps backlog and mastery invariants bounded", () => {
  const topics = [
    topic("q1", "A", { next_review: "2026-09-10" }),
    topic("q2", "B", { next_review: "2026-09-11" }),
    topic("q3", "C", { next_review: "2026-09-12" }),
    topic("q4", "D", { next_review: "2026-09-13" }),
  ];
  const checks = learningOsSelfCheckV4({
    courses: [course],
    topics,
    plan: [],
    attempts: [],
    mistakes: [],
    capacity,
    now: NOW,
  });
  assert.ok(checks.every((check) => check.ok), JSON.stringify(checks));
});

test("v4 migration contains normalized evidence, graph and event architecture", () => {
  const sql = readFileSync(
    new URL("../supabase/migrations/20260929170000_learning_os_v4.sql", import.meta.url),
    "utf8",
  );
  assert.match(sql, /topic_dependencies/);
  assert.match(sql, /mastery_evidence/);
  assert.match(sql, /learning_events/);
  assert.match(sql, /learning_experiments/);
  assert.match(sql, /study_materials/);
  assert.match(sql, /ai_interactions/);
  assert.match(sql, /PRACTICE_ATTEMPT_COMPLETED/);
  assert.match(sql, /REVIEW_COMPLETED/);
  assert.match(sql, /HINT_USED/);
  assert.match(sql, /SESSION_COMPLETED/);
  assert.match(sql, /TOPIC_ASSESSED/);
  assert.match(sql, /MASTERY_UPDATED/);
  assert.match(sql, /EXAM_CREATED/);
  assert.match(sql, /PLAN_REGENERATED/);
});
