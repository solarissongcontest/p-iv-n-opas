import test from "node:test";
import assert from "node:assert/strict";
import type { Course, PlanItem, Session } from "../src/lib/domain.ts";
import { buildWeeklyStudyTruth, progressTimelineStart } from "../src/lib/progress-analytics.ts";

function course(id: string, code: string, start: string, exam: string): Course {
  return { id, code, name: code, start_date: start, exam_date: exam, archived: false } as unknown as Course;
}

function planItem(id: string, courseId: string, date: string, minutes: number): PlanItem {
  return {
    id,
    owner_id: "test-owner",
    course_id: courseId,
    topic_id: null,
    date,
    start_time: null,
    phase: "content",
    kind: "study",
    title: id,
    min_minutes: minutes,
    target_minutes: minutes,
    extra_minutes: 0,
    status: "planned",
    moved_from: null,
    session_id: null,
    created_at: `${date}T08:00:00Z`,
    updated_at: `${date}T08:00:00Z`,
  } as PlanItem;
}

function session(id: string, courseId: string, date: string, minutes: number): Session {
  return {
    id,
    owner_id: "test-owner",
    course_id: courseId,
    topic_id: null,
    date,
    minutes,
    plan_item_id: null,
    created_at: `${date}T12:00:00Z`,
  } as unknown as Session;
}

test("weekly workload starts at the first real course week and uses planner minutes, not course budgets", () => {
  const courses = [
    course("ke", "KE04", "2026-10-05", "2026-11-23"),
    course("bi", "BI05", "2026-10-06", "2026-10-29"),
    course("ma", "MAA06A", "2026-10-06", "2026-11-27"),
  ];
  const plan = [
    planItem("ke-1", "ke", "2026-10-06", 39),
    planItem("ke-2", "ke", "2026-10-10", 39),
    planItem("ke-3", "ke", "2026-10-11", 39),
    planItem("bi-1", "bi", "2026-10-10", 36),
    planItem("bi-2", "bi", "2026-10-11", 36),
    planItem("ma-1", "ma", "2026-10-22", 30),
  ];
  const sessions = [
    session("ke-a", "ke", "2026-10-06", 52),
    session("bi-a", "bi", "2026-10-07", 30),
    session("bi-b", "bi", "2026-10-08", 11),
    session("ke-b", "ke", "2026-10-08", 22),
  ];

  assert.equal(progressTimelineStart({ courses, plan, sessions, now: "2026-10-08" }), "2026-10-05");
  const weekly = buildWeeklyStudyTruth({ courses, plan, sessions, now: "2026-10-08", maxWeeks: 8 });
  assert.equal(weekly.length, 1);
  assert.equal(weekly[0]!.start, "2026-10-05");
  assert.equal(weekly[0]!.planned, 189);
  assert.equal(weekly[0]!.actual, 115);
  assert.equal(weekly[0]!.isCurrent, true);
});

test("sessions and plan rows before a course start cannot leak into progress analytics", () => {
  const courses = [course("ke", "KE04", "2026-10-05", "2026-11-23")];
  const plan = [
    planItem("legacy", "ke", "2026-09-01", 999),
    planItem("real", "ke", "2026-10-06", 40),
  ];
  const sessions = [
    session("legacy-session", "ke", "2026-09-01", 500),
    session("real-session", "ke", "2026-10-06", 25),
  ];

  const weekly = buildWeeklyStudyTruth({ courses, plan, sessions, now: "2026-10-08" });
  assert.equal(weekly.length, 1);
  assert.equal(weekly[0]!.start, "2026-10-05");
  assert.equal(weekly[0]!.planned, 40);
  assert.equal(weekly[0]!.actual, 25);
});
