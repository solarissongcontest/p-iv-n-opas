import test from "node:test";
import assert from "node:assert/strict";
import type { Course, PlanItem, Session } from "../src/lib/domain.ts";
import { buildProgressTrajectory } from "../src/lib/progress-trajectory.ts";

const course = {
  id: "bi05",
  code: "BI05",
  name: "Ihmisen biologia",
  archived: false,
  start_date: "2026-10-05",
  exam_date: "2026-10-29",
} as Course;

function planItem(input: Partial<PlanItem> & Pick<PlanItem, "id" | "date">): PlanItem {
  return {
    id: input.id,
    course_id: "bi05",
    created_at: `${input.date}T08:00:00Z`,
    extra_minutes: 0,
    kind: "study",
    min_minutes: 15,
    moved_from: null,
    owner_id: "arthur",
    phase: "content",
    session_id: null,
    start_time: null,
    status: "planned",
    target_minutes: 40,
    title: input.id,
    topic_id: null,
    updated_at: `${input.date}T08:00:00Z`,
    ...input,
  } as PlanItem;
}

function session(input: Partial<Session> & Pick<Session, "id" | "date">): Session {
  return {
    id: input.id,
    date: input.date,
    plan_item_id: null,
    course_id: "bi05",
    topic_id: null,
    minutes: 20,
    planned_minutes: 20,
    kind: "study",
    competence: 3,
    did: null,
    energy: null,
    focus: null,
    method: null,
    note: null,
    objective: null,
    outcome: null,
    owner_id: "arthur",
    recall: null,
    retrieval_check: null,
    retrieval_confidence: null,
    retrieval_result: null,
    tasks: null,
    unclear: null,
    created_at: `${input.date}T16:00:00Z`,
    ...input,
  } as Session;
}

test("unlinked course study is credited partially to already-due plan work", () => {
  const plan = [
    planItem({ id: "chapter-1", date: "2026-10-10", target_minutes: 40 }),
    planItem({ id: "chapter-2", date: "2026-10-14", target_minutes: 40 }),
  ];
  const sessions = [session({ id: "manual", date: "2026-10-13", minutes: 20 })];

  const result = buildProgressTrajectory({ course, plan, sessions, now: "2026-10-13" });
  assert.ok(result);
  assert.equal(result.points.find(point => point.date === "2026-10-13")?.actual, 25);
  assert.equal(result.adherencePercent, 50);
  assert.equal(result.completedMinutesNow, 20);
  assert.equal(result.behindTasks, 1);
  assert.equal(result.aheadTasks, 0);
});

test("course-level unlinked study does not get guessed onto future tasks", () => {
  const plan = [
    planItem({ id: "chapter-1", date: "2026-10-10", target_minutes: 30 }),
    planItem({ id: "chapter-2", date: "2026-10-14", target_minutes: 30 }),
  ];
  const sessions = [session({ id: "manual", date: "2026-10-13", minutes: 80 })];

  const result = buildProgressTrajectory({ course, plan, sessions, now: "2026-10-13" });
  assert.ok(result);
  assert.equal(result.points.find(point => point.date === "2026-10-13")?.actual, 50);
  assert.equal(result.adherencePercent, 100);
  assert.equal(result.aheadTasks, 0);
});

test("topic-specific unlinked study only credits matching plan rows and can count work done early", () => {
  const plan = [
    planItem({ id: "chapter-1", date: "2026-10-10", target_minutes: 30, topic_id: "t1" }),
    planItem({ id: "chapter-3", date: "2026-10-14", target_minutes: 40, topic_id: "t3" }),
  ];
  const sessions = [session({ id: "manual", date: "2026-10-13", minutes: 20, topic_id: "t3" })];

  const result = buildProgressTrajectory({ course, plan, sessions, now: "2026-10-13" });
  assert.ok(result);
  assert.equal(result.completedMinutesNow, 0);
  assert.ok(Math.abs((result.points.find(point => point.date === "2026-10-13")?.actual ?? 0) - (20 / 70) * 100) < 0.0001);
  assert.equal(result.aheadTasks, 0);
});

test("credited study is capped by plan scope and never exceeds 100 percent", () => {
  const plan = [planItem({ id: "chapter-1", date: "2026-10-10", target_minutes: 30 })];
  const sessions = [
    session({ id: "manual-1", date: "2026-10-10", minutes: 80 }),
    session({ id: "manual-2", date: "2026-10-11", minutes: 80 }),
  ];

  const result = buildProgressTrajectory({ course, plan, sessions, now: "2026-10-13" });
  assert.ok(result);
  assert.equal(result.points.find(point => point.date === "2026-10-13")?.actual, 100);
  assert.equal(result.completedMinutesNow, 30);
  assert.equal(result.adherencePercent, 100);
  assert.equal(result.behindTasks, 0);
});

test("study sessions from another course never affect BI05 progress", () => {
  const plan = [planItem({ id: "chapter-1", date: "2026-10-10", target_minutes: 30 })];
  const sessions = [session({ id: "other", date: "2026-10-10", minutes: 30, course_id: "ke04" })];

  const result = buildProgressTrajectory({ course, plan, sessions, now: "2026-10-13" });
  assert.ok(result);
  assert.equal(result.points.find(point => point.date === "2026-10-13")?.actual, 0);
  assert.equal(result.completedMinutesNow, 0);
});
