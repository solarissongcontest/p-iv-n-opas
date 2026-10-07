import test from "node:test";
import assert from "node:assert/strict";
import type { Course, PlanItem, Session } from "../src/lib/domain.ts";
import { buildProgressTrajectory, pickTrajectoryCourse } from "../src/lib/progress-trajectory.ts";

const course = {
  id: "ke04",
  code: "KE04",
  name: "Kemiallinen tasapaino",
  archived: false,
  start_date: "2026-10-05",
  exam_date: "2026-11-23",
} as unknown as Course;

function planItem(input: Partial<PlanItem> & Pick<PlanItem, "id" | "date">): PlanItem {
  return {
    course_id: "ke04",
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
    target_minutes: 30,
    title: input.id,
    topic_id: null,
    updated_at: `${input.date}T08:00:00Z`,
    ...input,
  } as PlanItem;
}

function session(input: Pick<Session, "id" | "date" | "plan_item_id">): Session {
  return {
    id: input.id,
    date: input.date,
    plan_item_id: input.plan_item_id,
    course_id: "ke04",
    topic_id: null,
    minutes: 30,
    planned_minutes: 30,
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
  } as Session;
}

test("trajectory starts at course start, contains every day, marks today and ends at exam", () => {
  const plan = [
    planItem({ id: "1.1", date: "2026-10-05", status: "completed" }),
    planItem({ id: "1.2", date: "2026-10-07", status: "completed" }),
    planItem({ id: "1.3", date: "2026-10-09" }),
    planItem({ id: "exam", date: "2026-11-23", kind: "exam", target_minutes: 0 }),
  ];
  const sessions = [session({ id: "s1", date: "2026-10-05", plan_item_id: "1.1" }), session({ id: "s2", date: "2026-10-07", plan_item_id: "1.2" })];

  const result = buildProgressTrajectory({ course, plan, sessions, now: "2026-10-07" });
  assert.ok(result);
  assert.equal(result.startDate, "2026-10-05");
  assert.equal(result.endDate, "2026-11-23");
  assert.equal(result.points[0]?.date, "2026-10-05");
  assert.equal(result.points.at(-1)?.date, "2026-11-23");
  assert.ok(result.points.some(point => point.date === "2026-10-06"));
  assert.equal(result.points.some(point => point.date < "2026-10-05"), false);
  assert.equal(result.points.find(point => point.date === "2026-10-07")?.isToday, true);
  assert.equal(result.points.find(point => point.date === "2026-10-08")?.actual, null);
  assert.equal(result.adherencePercent, 100);
  assert.equal(result.deviationStudyDays, 0);
});

test("late completion raises actual progress on the real completion day instead of rewriting history", () => {
  const plan = [
    planItem({ id: "1.1", date: "2026-10-05", status: "completed", updated_at: "2026-10-07T16:00:00Z" }),
    planItem({ id: "1.2", date: "2026-10-06" }),
    planItem({ id: "exam", date: "2026-11-23", kind: "exam", target_minutes: 0 }),
  ];
  const sessions = [session({ id: "s1", date: "2026-10-07", plan_item_id: "1.1" })];
  const result = buildProgressTrajectory({ course, plan, sessions, now: "2026-10-07" });
  assert.ok(result);

  assert.equal(result.points.find(point => point.date === "2026-10-05")?.actual, 0);
  assert.equal(result.points.find(point => point.date === "2026-10-06")?.actual, 0);
  assert.ok((result.points.find(point => point.date === "2026-10-07")?.actual ?? 0) > 0);
});

test("plan moves are exposed as visible revision markers", () => {
  const plan = [
    planItem({ id: "1.1", date: "2026-10-08", moved_from: "2026-10-06" }),
    planItem({ id: "exam", date: "2026-11-23", kind: "exam", target_minutes: 0 }),
  ];
  const result = buildProgressTrajectory({ course, plan, sessions: [], now: "2026-10-07" });
  assert.ok(result);
  assert.equal(result.points.find(point => point.date === "2026-10-06")?.revised, true);
  assert.equal(result.points.find(point => point.date === "2026-10-08")?.revised, true);
});

test("forecast stays hidden with too little evidence and appears after three completion days", () => {
  const plan = [
    planItem({ id: "1.1", date: "2026-10-05", status: "completed" }),
    planItem({ id: "1.2", date: "2026-10-06", status: "completed" }),
    planItem({ id: "1.3", date: "2026-10-07", status: "completed" }),
    planItem({ id: "1.4", date: "2026-10-12" }),
    planItem({ id: "1.5", date: "2026-10-16" }),
    planItem({ id: "exam", date: "2026-11-23", kind: "exam", target_minutes: 0 }),
  ];
  const twoSessions = [session({ id: "s1", date: "2026-10-05", plan_item_id: "1.1" }), session({ id: "s2", date: "2026-10-06", plan_item_id: "1.2" })];
  const threeSessions = [...twoSessions, session({ id: "s3", date: "2026-10-07", plan_item_id: "1.3" })];

  assert.equal(buildProgressTrajectory({ course, plan, sessions: twoSessions, now: "2026-10-07" })?.hasForecast, false);
  const withForecast = buildProgressTrajectory({ course, plan, sessions: threeSessions, now: "2026-10-07" });
  assert.equal(withForecast?.hasForecast, true);
  assert.ok(withForecast?.points.some(point => point.date > "2026-10-07" && point.forecast != null));
});

test("course picker prefers an active course instead of an unrelated historical course", () => {
  const historical = { ...course, id: "old", code: "OLD", start_date: "2026-01-01", exam_date: "2026-02-01" } as Course;
  const future = { ...course, id: "future", code: "NEW", start_date: "2026-12-01", exam_date: "2027-01-01" } as Course;
  const plan = [planItem({ id: "current", date: "2026-10-05" })];
  assert.equal(pickTrajectoryCourse([historical, future, course], plan, "2026-10-07")?.id, "ke04");
});
