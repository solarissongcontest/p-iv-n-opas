import test from "node:test";
import assert from "node:assert/strict";
import type { Course, PlanItem, Session } from "../src/lib/domain.ts";
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

const emptySessions: Session[] = [];

test("moving a task does not rewrite the plan shown before the move", () => {
  const current = [item({ id: "a", date: "2026-10-09", moved_from: "2026-10-06", updated_at: "2026-10-07T10:00:00Z" })];
  const events: PlanItemEvent[] = [
    event({ id: "e1", plan_item_id: "a", event_type: "created", event_date: "2026-10-05", occurred_at: "2026-10-05T06:00:00Z", new_snapshot: snapshot({ id: "a", date: "2026-10-06" }) }),
    event({ id: "e2", plan_item_id: "a", event_type: "moved", event_date: "2026-10-07", occurred_at: "2026-10-07T10:00:00Z", old_snapshot: snapshot({ id: "a", date: "2026-10-06" }), new_snapshot: snapshot({ id: "a", date: "2026-10-09", moved_from: "2026-10-06" }) }),
  ];
  const result = buildProgressTrajectory({ course, plan: current, sessions: emptySessions, events, now: "2026-10-07" });
  assert.ok(result);
  assert.equal(result.points.find(point => point.date === "2026-10-06")?.plannedMinutesToday, 30);
  assert.equal(result.points.find(point => point.date === "2026-10-09")?.plannedMinutesToday, 30);
  assert.equal(result.points.find(point => point.date === "2026-10-07")?.revisions[0]?.eventType, "moved");
});

test("resizing a task preserves the old workload before the revision", () => {
  const current = [item({ id: "a", date: "2026-10-06", target_minutes: 60, updated_at: "2026-10-07T10:00:00Z" })];
  const events: PlanItemEvent[] = [
    event({ id: "e1", plan_item_id: "a", event_type: "created", event_date: "2026-10-05", occurred_at: "2026-10-05T06:00:00Z", new_snapshot: snapshot({ id: "a", date: "2026-10-06", target_minutes: 30 }) }),
    event({ id: "e2", plan_item_id: "a", event_type: "resized", event_date: "2026-10-07", occurred_at: "2026-10-07T10:00:00Z", old_snapshot: snapshot({ id: "a", date: "2026-10-06", target_minutes: 30 }), new_snapshot: snapshot({ id: "a", date: "2026-10-06", target_minutes: 60 }) }),
  ];
  const result = buildProgressTrajectory({ course, plan: current, sessions: emptySessions, events, now: "2026-10-07" });
  assert.ok(result);
  assert.equal(result.points.find(point => point.date === "2026-10-06")?.plannedMinutesCumulative, 30);
  assert.equal(result.points.find(point => point.date === "2026-10-07")?.plannedMinutesCumulative, 60);
});

test("completed_at controls the real completion day and reopen removes current completion", () => {
  const current = [item({ id: "a", date: "2026-10-05", status: "planned", updated_at: "2026-10-08T10:00:00Z" })];
  const events: PlanItemEvent[] = [
    event({ id: "e1", plan_item_id: "a", event_type: "created", event_date: "2026-10-05", occurred_at: "2026-10-05T06:00:00Z", new_snapshot: snapshot({ id: "a", date: "2026-10-05" }) }),
    event({ id: "e2", plan_item_id: "a", event_type: "completed", event_date: "2026-10-07", occurred_at: "2026-10-07T16:00:00Z", old_snapshot: snapshot({ id: "a", date: "2026-10-05" }), new_snapshot: snapshot({ id: "a", date: "2026-10-05", status: "completed", completed_at: "2026-10-07T16:00:00Z" }) }),
    event({ id: "e3", plan_item_id: "a", event_type: "reopened", event_date: "2026-10-08", occurred_at: "2026-10-08T10:00:00Z", old_snapshot: snapshot({ id: "a", date: "2026-10-05", status: "completed", completed_at: "2026-10-07T16:00:00Z" }), new_snapshot: snapshot({ id: "a", date: "2026-10-05", status: "planned", completed_at: null }) }),
  ];
  const result = buildProgressTrajectory({ course, plan: current, sessions: emptySessions, events, now: "2026-10-08" });
  assert.ok(result);
  assert.equal(result.points.find(point => point.date === "2026-10-06")?.actual, 0);
  assert.equal(result.points.find(point => point.date === "2026-10-07")?.completedMinutesToday, 30);
  assert.equal(result.points.find(point => point.date === "2026-10-08")?.actual, 0);
  assert.equal(result.behindTasks, 1);
});

test("skipping and deleting tasks change the plan only from the event day onward", () => {
  const current: PlanItem[] = [];
  const events: PlanItemEvent[] = [
    event({ id: "e1", plan_item_id: "a", event_type: "created", event_date: "2026-10-05", occurred_at: "2026-10-05T06:00:00Z", new_snapshot: snapshot({ id: "a", date: "2026-10-06" }) }),
    event({ id: "e2", plan_item_id: "a", event_type: "deleted", event_date: "2026-10-07", occurred_at: "2026-10-07T10:00:00Z", old_snapshot: snapshot({ id: "a", date: "2026-10-06" }), new_snapshot: null }),
  ];
  const result = buildProgressTrajectory({ course, plan: current, sessions: emptySessions, events, now: "2026-10-07" });
  assert.ok(result);
  assert.equal(result.points.find(point => point.date === "2026-10-06")?.plannedMinutesToday, 30);
  assert.equal(result.points.find(point => point.date === "2026-10-07")?.plannedMinutesToday, 0);
  assert.equal(result.points.find(point => point.date === "2026-10-07")?.plannedMinutesCumulative, 0);
  assert.equal(result.points.find(point => point.date === "2026-10-07")?.totalPlannedMinutes, 30, "historical denominator stays stable even after the row is deleted");
});
