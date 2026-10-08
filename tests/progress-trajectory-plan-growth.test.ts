import test from "node:test";
import assert from "node:assert/strict";
import type { Course, PlanItem } from "../src/lib/domain.ts";
import type { PlanItemEvent, PlanItemSnapshot } from "../src/lib/progress-types.ts";
import { buildProgressTrajectory } from "../src/lib/progress-trajectory.ts";

const course = {
  id: "ke04",
  code: "KE04",
  name: "Kemialliset reaktiot",
  archived: false,
  start_date: "2026-10-05",
  exam_date: "2026-10-12",
} as unknown as Course;

function item(input: Partial<PlanItem> & Pick<PlanItem, "id" | "date">): PlanItem {
  return {
    id: input.id,
    owner_id: "arthur",
    course_id: "ke04",
    topic_id: null,
    date: input.date,
    start_time: null,
    phase: "content",
    kind: "study",
    title: input.id,
    min_minutes: 15,
    target_minutes: 30,
    extra_minutes: 0,
    status: "planned",
    moved_from: null,
    session_id: null,
    created_at: "2026-10-05T06:00:00Z",
    updated_at: "2026-10-05T06:00:00Z",
    ...input,
  } as PlanItem;
}

function snapshot(input: Partial<PlanItemSnapshot> & Pick<PlanItemSnapshot, "id" | "date">): PlanItemSnapshot {
  return {
    id: input.id,
    course_id: "ke04",
    topic_id: null,
    date: input.date,
    phase: "content",
    kind: "study",
    title: input.id,
    min_minutes: 15,
    target_minutes: 30,
    extra_minutes: 0,
    status: "planned",
    moved_from: null,
    session_id: null,
    completed_at: null,
    ...input,
  };
}

function event(input: Partial<PlanItemEvent> & Pick<PlanItemEvent, "id" | "plan_item_id" | "event_type" | "event_date" | "occurred_at">): PlanItemEvent {
  return {
    owner_id: "arthur",
    course_id: "ke04",
    changes: [input.event_type],
    old_snapshot: null,
    new_snapshot: null,
    ...input,
  } as PlanItemEvent;
}

test("adding future work later does not make a caught-up student look behind", () => {
  const plan = [
    item({ id: "a", date: "2026-10-05", status: "completed" }),
    item({ id: "b", date: "2026-10-10", created_at: "2026-10-07T08:00:00Z", updated_at: "2026-10-07T08:00:00Z" }),
  ];
  const events = [
    event({
      id: "a-created",
      plan_item_id: "a",
      event_type: "created",
      event_date: "2026-10-05",
      occurred_at: "2026-10-05T06:00:00Z",
      new_snapshot: snapshot({ id: "a", date: "2026-10-05" }),
    }),
    event({
      id: "a-completed",
      plan_item_id: "a",
      event_type: "completed",
      event_date: "2026-10-05",
      occurred_at: "2026-10-05T16:00:00Z",
      old_snapshot: snapshot({ id: "a", date: "2026-10-05" }),
      new_snapshot: snapshot({ id: "a", date: "2026-10-05", status: "completed", completed_at: "2026-10-05T16:00:00Z" }),
    }),
    event({
      id: "b-created",
      plan_item_id: "b",
      event_type: "created",
      event_date: "2026-10-07",
      occurred_at: "2026-10-07T08:00:00Z",
      new_snapshot: snapshot({ id: "b", date: "2026-10-10" }),
    }),
  ];

  const result = buildProgressTrajectory({ course, plan, sessions: [], events, now: "2026-10-08" });
  assert.ok(result);
  assert.equal(result.plannedMinutesNow, 30);
  assert.equal(result.completedMinutesNow, 30);
  assert.equal(result.behindTasks, 0);
  assert.equal(result.adherencePercent, 100);
  assert.equal(result.deviationStudyDays, 0);
});

test("future plan additions cannot rewrite an earlier day's deviation", () => {
  const plan = [
    item({ id: "a", date: "2026-10-05", status: "completed" }),
    item({ id: "b", date: "2026-10-06", status: "completed" }),
    item({ id: "c", date: "2026-10-10", created_at: "2026-10-07T08:00:00Z", updated_at: "2026-10-07T08:00:00Z" }),
    item({ id: "d", date: "2026-10-11", created_at: "2026-10-07T08:01:00Z", updated_at: "2026-10-07T08:01:00Z" }),
  ];
  const events = [
    event({ id: "a-created", plan_item_id: "a", event_type: "created", event_date: "2026-10-05", occurred_at: "2026-10-05T06:00:00Z", new_snapshot: snapshot({ id: "a", date: "2026-10-05" }) }),
    event({ id: "a-completed", plan_item_id: "a", event_type: "completed", event_date: "2026-10-05", occurred_at: "2026-10-05T16:00:00Z", old_snapshot: snapshot({ id: "a", date: "2026-10-05" }), new_snapshot: snapshot({ id: "a", date: "2026-10-05", status: "completed", completed_at: "2026-10-05T16:00:00Z" }) }),
    event({ id: "b-created", plan_item_id: "b", event_type: "created", event_date: "2026-10-05", occurred_at: "2026-10-05T06:01:00Z", new_snapshot: snapshot({ id: "b", date: "2026-10-06" }) }),
    event({ id: "b-completed", plan_item_id: "b", event_type: "completed", event_date: "2026-10-06", occurred_at: "2026-10-06T16:00:00Z", old_snapshot: snapshot({ id: "b", date: "2026-10-06" }), new_snapshot: snapshot({ id: "b", date: "2026-10-06", status: "completed", completed_at: "2026-10-06T16:00:00Z" }) }),
    event({ id: "c-created", plan_item_id: "c", event_type: "created", event_date: "2026-10-07", occurred_at: "2026-10-07T08:00:00Z", new_snapshot: snapshot({ id: "c", date: "2026-10-10" }) }),
    event({ id: "d-created", plan_item_id: "d", event_type: "created", event_date: "2026-10-07", occurred_at: "2026-10-07T08:01:00Z", new_snapshot: snapshot({ id: "d", date: "2026-10-11" }) }),
  ];

  const result = buildProgressTrajectory({ course, plan, sessions: [], events, now: "2026-10-08" });
  assert.ok(result);
  const oct5 = result.points.find(point => point.date === "2026-10-05");
  assert.equal(oct5?.planned, 50);
  assert.equal(oct5?.actual, 50);
  assert.equal(oct5?.deviationStudyDays, 0);
});
