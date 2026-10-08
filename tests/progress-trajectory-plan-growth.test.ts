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
  exam_date: "2026-10-23",
} as unknown as Course;

function item(input: Partial<PlanItem> & Pick<PlanItem, "id" | "date">): PlanItem {
  return {
    id: input.id,
    owner_id: "test-owner",
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
    owner_id: "test-owner",
    course_id: "ke04",
    changes: [input.event_type],
    old_snapshot: null,
    new_snapshot: null,
    ...input,
  } as PlanItemEvent;
}

function created(id: string, due: string, eventDate: string, minutes = 30) {
  return event({
    id: `${id}-created`,
    plan_item_id: id,
    event_type: "created",
    event_date: eventDate,
    occurred_at: `${eventDate}T08:00:00Z`,
    new_snapshot: snapshot({ id, date: due, target_minutes: minutes }),
  });
}

test("later future-plan creation cannot turn early course progress into 100 percent", () => {
  const plan = [
    item({ id: "first", date: "2026-10-06", target_minutes: 39, status: "completed" }),
    ...Array.from({ length: 12 }, (_, index) => item({
      id: `future-${index}`,
      date: `2026-10-${String(10 + index).padStart(2, "0")}`,
      target_minutes: 39,
      created_at: "2026-10-07T08:00:00Z",
      updated_at: "2026-10-07T08:00:00Z",
    })),
  ];
  const events: PlanItemEvent[] = [
    created("first", "2026-10-06", "2026-10-05", 39),
    event({
      id: "first-completed",
      plan_item_id: "first",
      event_type: "completed",
      event_date: "2026-10-06",
      occurred_at: "2026-10-06T16:00:00Z",
      old_snapshot: snapshot({ id: "first", date: "2026-10-06", target_minutes: 39 }),
      new_snapshot: snapshot({ id: "first", date: "2026-10-06", target_minutes: 39, status: "completed", completed_at: "2026-10-06T16:00:00Z" }),
    }),
    ...Array.from({ length: 12 }, (_, index) => created(
      `future-${index}`,
      `2026-10-${String(10 + index).padStart(2, "0")}`,
      "2026-10-07",
      39,
    )),
  ];

  const result = buildProgressTrajectory({ course, plan, sessions: [], events, now: "2026-10-08" });
  assert.ok(result);
  const oct6 = result.points.find(point => point.date === "2026-10-06")!;
  const oct7 = result.points.find(point => point.date === "2026-10-07")!;
  const oct8 = result.points.find(point => point.date === "2026-10-08")!;
  assert.ok(oct6.planned > 0 && oct6.planned < 10, `unexpected 6.10 plan ${oct6.planned}`);
  assert.equal(Math.round(oct6.actual ?? -1), Math.round(oct6.planned));
  assert.equal(Math.round(oct7.planned), Math.round(oct6.planned));
  assert.equal(Math.round(oct8.planned), Math.round(oct6.planned));
  assert.ok(result.points.filter(point => point.date <= "2026-10-08").every(point => point.planned < 100));
  assert.equal(result.adherencePercent, 100);
  assert.equal(result.deviationStudyDays, 0);
  assert.equal(result.points.at(-1)?.planned, 100);
});

test("adding future work later does not make a caught-up student look behind", () => {
  const plan = [
    item({ id: "a", date: "2026-10-05", status: "completed" }),
    item({ id: "b", date: "2026-10-10", created_at: "2026-10-07T08:00:00Z", updated_at: "2026-10-07T08:00:00Z" }),
  ];
  const events = [
    created("a", "2026-10-05", "2026-10-05"),
    event({
      id: "a-completed",
      plan_item_id: "a",
      event_type: "completed",
      event_date: "2026-10-05",
      occurred_at: "2026-10-05T16:00:00Z",
      old_snapshot: snapshot({ id: "a", date: "2026-10-05" }),
      new_snapshot: snapshot({ id: "a", date: "2026-10-05", status: "completed", completed_at: "2026-10-05T16:00:00Z" }),
    }),
    created("b", "2026-10-10", "2026-10-07"),
  ];
  const result = buildProgressTrajectory({ course, plan, sessions: [], events, now: "2026-10-08" });
  assert.ok(result);
  assert.equal(result.plannedMinutesNow, 30);
  assert.equal(result.completedMinutesNow, 30);
  assert.equal(result.behindTasks, 0);
  assert.equal(result.adherencePercent, 100);
  assert.equal(result.deviationStudyDays, 0);
  assert.equal(result.points.find(point => point.date === "2026-10-05")?.planned, 50);
});

test("future plan additions cannot rewrite the historical schedule timing", () => {
  const plan = [
    item({ id: "a", date: "2026-10-05", status: "completed" }),
    item({ id: "b", date: "2026-10-06", status: "completed" }),
    item({ id: "c", date: "2026-10-10", created_at: "2026-10-07T08:00:00Z", updated_at: "2026-10-07T08:00:00Z" }),
    item({ id: "d", date: "2026-10-11", created_at: "2026-10-07T08:01:00Z", updated_at: "2026-10-07T08:01:00Z" }),
  ];
  const events = [
    created("a", "2026-10-05", "2026-10-05"),
    event({ id: "a-completed", plan_item_id: "a", event_type: "completed", event_date: "2026-10-05", occurred_at: "2026-10-05T16:00:00Z", old_snapshot: snapshot({ id: "a", date: "2026-10-05" }), new_snapshot: snapshot({ id: "a", date: "2026-10-05", status: "completed", completed_at: "2026-10-05T16:00:00Z" }) }),
    created("b", "2026-10-06", "2026-10-05"),
    event({ id: "b-completed", plan_item_id: "b", event_type: "completed", event_date: "2026-10-06", occurred_at: "2026-10-06T16:00:00Z", old_snapshot: snapshot({ id: "b", date: "2026-10-06" }), new_snapshot: snapshot({ id: "b", date: "2026-10-06", status: "completed", completed_at: "2026-10-06T16:00:00Z" }) }),
    created("c", "2026-10-10", "2026-10-07"),
    created("d", "2026-10-11", "2026-10-07"),
  ];
  const result = buildProgressTrajectory({ course, plan, sessions: [], events, now: "2026-10-08" });
  assert.ok(result);
  const oct5 = result.points.find(point => point.date === "2026-10-05")!;
  const oct6 = result.points.find(point => point.date === "2026-10-06")!;
  assert.equal(oct5.planned, 25);
  assert.equal(oct5.actual, 25);
  assert.equal(oct6.planned, 50);
  assert.equal(oct6.actual, 50);
  assert.equal(oct5.deviationStudyDays, 0);
  assert.equal(oct6.deviationStudyDays, 0);
});

test("finishing known future work early still reports the student ahead", () => {
  const plan = [
    item({ id: "today", date: "2026-10-05", status: "completed" }),
    item({ id: "future", date: "2026-10-07", status: "completed" }),
  ];
  const events = [
    created("today", "2026-10-05", "2026-10-05"),
    created("future", "2026-10-07", "2026-10-05"),
    event({ id: "today-completed", plan_item_id: "today", event_type: "completed", event_date: "2026-10-05", occurred_at: "2026-10-05T16:00:00Z", old_snapshot: snapshot({ id: "today", date: "2026-10-05" }), new_snapshot: snapshot({ id: "today", date: "2026-10-05", status: "completed", completed_at: "2026-10-05T16:00:00Z" }) }),
    event({ id: "future-completed", plan_item_id: "future", event_type: "completed", event_date: "2026-10-05", occurred_at: "2026-10-05T16:01:00Z", old_snapshot: snapshot({ id: "future", date: "2026-10-07" }), new_snapshot: snapshot({ id: "future", date: "2026-10-07", status: "completed", completed_at: "2026-10-05T16:01:00Z" }) }),
  ];
  const result = buildProgressTrajectory({ course, plan, sessions: [], events, now: "2026-10-05" });
  assert.ok(result);
  assert.equal(result.aheadTasks, 1);
  assert.equal(result.adherencePercent, 100);
  assert.equal(result.deviationStudyDays, 1);
  assert.equal(result.completedMinutesNow, 30, "due-work summary must not count early future work twice");
  assert.equal(result.points.find(point => point.date === "2026-10-05")?.actual, 100, "course completion may be ahead of plan when future work is genuinely done");
});
