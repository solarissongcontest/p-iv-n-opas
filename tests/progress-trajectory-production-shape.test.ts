import test from "node:test";
import assert from "node:assert/strict";
import type { Course, PlanItem } from "../src/lib/domain.ts";
import type { PlanItemEvent } from "../src/lib/progress-types.ts";
import { buildProgressTrajectory } from "../src/lib/progress-trajectory.ts";

const course = {
  id: "bi05",
  code: "BI05",
  name: "Ihmisen biologia",
  archived: false,
  start_date: "2026-10-06",
  exam_date: "2026-10-29",
} as unknown as Course;

function item(id: string, date: string, targetMinutes: number, kind = "study"): PlanItem {
  return {
    id,
    owner_id: "arthur",
    course_id: "bi05",
    topic_id: null,
    date,
    start_time: null,
    phase: kind === "exam" ? "exam" : "content",
    kind,
    title: id,
    min_minutes: kind === "exam" ? 0 : 15,
    target_minutes: targetMinutes,
    extra_minutes: 0,
    status: "planned",
    moved_from: null,
    session_id: null,
    completed_at: null,
    created_at: "2026-10-07T12:00:00Z",
    updated_at: "2026-10-07T12:00:00Z",
  } as unknown as PlanItem;
}

function createdEvent(planItem: PlanItem): PlanItemEvent {
  return {
    id: `created-${planItem.id}`,
    owner_id: "arthur",
    plan_item_id: planItem.id,
    course_id: "bi05",
    event_type: "created",
    changes: [],
    event_date: "2026-10-07",
    occurred_at: "2026-10-07T12:00:00Z",
    old_snapshot: null,
    new_snapshot: {
      id: planItem.id,
      course_id: "bi05",
      topic_id: null,
      date: planItem.date,
      start_time: null,
      phase: planItem.phase,
      kind: planItem.kind,
      title: planItem.title,
      min_minutes: planItem.min_minutes,
      target_minutes: planItem.target_minutes,
      extra_minutes: planItem.extra_minutes,
      status: planItem.status,
      moved_from: null,
      session_id: null,
      completed_at: null,
    },
  };
}

test("BI05-shaped future plan produces a real rising plan curve even before the first due task", () => {
  const plan = [
    item("1.2", "2026-10-10", 36),
    item("1.3", "2026-10-11", 36),
    item("2.3", "2026-10-16", 36),
    item("1.4", "2026-10-17", 36),
    item("2.4", "2026-10-17", 36),
    item("2.5", "2026-10-18", 36),
    item("1.5", "2026-10-18", 36),
    item("3.1", "2026-10-20", 36),
    item("3.2", "2026-10-22", 36),
    item("3.3", "2026-10-23", 36),
    item("4.1", "2026-10-24", 36),
    item("2.1", "2026-10-24", 36),
    item("4.2", "2026-10-25", 36),
    item("2.2", "2026-10-25", 36),
    item("review", "2026-10-27", 20, "review"),
    item("exam", "2026-10-29", 0, "exam"),
  ];
  const events = plan.map(createdEvent);
  const result = buildProgressTrajectory({ course, plan, sessions: [], events, now: "2026-10-08" });
  assert.ok(result);
  assert.equal(result.startDate, "2026-10-06");
  assert.equal(result.endDate, "2026-10-29");
  assert.equal(result.points.find(point => point.date === "2026-10-08")?.planned, 0);
  assert.ok((result.points.find(point => point.date === "2026-10-10")?.planned ?? 0) > 0);
  assert.ok((result.points.find(point => point.date === "2026-10-11")?.planned ?? 0) > (result.points.find(point => point.date === "2026-10-10")?.planned ?? 0));
  assert.equal(Math.round(result.points.find(point => point.date === "2026-10-27")?.planned ?? 0), 100);
  const distinctFuturePlanValues = new Set(result.points.filter(point => point.date >= "2026-10-08").map(point => Math.round(point.planned)));
  assert.ok(distinctFuturePlanValues.size >= 5, "future plan must contain several visible steps rather than a flat zero series");
});
