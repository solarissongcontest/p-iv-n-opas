import test from "node:test";
import assert from "node:assert/strict";
import {
  findNextStudyDate,
  masteryEvidence,
  masterySummary,
  nextReviewDate,
  recoveryQueue,
  todayTaskReason,
  type Course,
  type Mistake,
  type PlanItem,
  type Topic,
} from "../src/lib/domain.ts";

function topic(
  id: string,
  level: number,
  overrides: Partial<Topic> = {},
): Topic {
  return {
    id,
    course_id: "11111111-1111-4111-8111-111111111111",
    name: "Aihe " + id,
    verified_level: level,
    self_level: 0,
    next_review: null,
    last_review: null,
    importance: 3,
    weight: 1,
    progress: level > 0 ? 50 : 0,
    basic_successes: 0,
    exam_successes: 0,
    delayed_successes: 0,
    ...overrides,
  } as unknown as Topic;
}

test("mastery summary is qualitative and separates missing evidence", () => {
  const none = masterySummary([topic("a", 0), topic("b", 0)]);
  assert.equal(none.label, "Ei vielä arvioitu");
  assert.equal(none.unassessed.length, 2);

  const mixed = masterySummary([
    topic("a", 1),
    topic("b", 2),
    topic("c", 3),
    topic("d", 4),
    topic("e", 5),
  ]);
  assert.equal(mixed.practice.length, 1);
  assert.equal(mixed.developing.length, 1);
  assert.equal(mixed.fairlySure.length, 1);
  assert.equal(mixed.strong.length, 2);
  assert.ok(["Kehittyvä", "Melko varma", "Vahva"].includes(mixed.label));
});

test("mastery evidence reports evidence instead of a fake percentage", () => {
  assert.equal(
    masteryEvidence(topic("a", 0)),
    "Ei vielä tarpeeksi näyttöä.",
  );
  const text = masteryEvidence(topic("b", 4, {
    basic_successes: 3,
    exam_successes: 2,
    delayed_successes: 1,
  }));
  assert.match(text, /3 perustehtävän näyttöä/);
  assert.match(text, /2 koetason näyttöä/);
  assert.match(text, /1 onnistunutta viivästettyä kertausta/);
});

test("recovery queue caps backlog and prioritizes urgent important evidence gaps", () => {
  const queue = recoveryQueue([
    topic("ordinary", 4, {
      next_review: "2026-09-28",
      importance: 2,
    }),
    topic("priority", 1, {
      next_review: "2026-09-20",
      importance: 5,
    }),
    topic("third", 2, {
      next_review: "2026-09-27",
      importance: 4,
    }),
    topic("fourth", 3, {
      next_review: "2026-09-25",
      importance: 3,
    }),
    topic("future", 2, {
      next_review: "2026-10-05",
      importance: 5,
    }),
  ], "2026-09-29", 3);

  assert.equal(queue.total, 4);
  assert.equal(queue.items.length, 3);
  assert.equal(queue.hiddenCount, 1);
  assert.equal(queue.items[0]?.id, "priority");
  assert.ok(!queue.items.some((item) => item.id === "future"));
});

test("adaptive next review reacts to confidence and delayed retrieval", () => {
  assert.equal(
    nextReviewDate("2026-09-29", 4, { confidence: 1 }),
    "2026-10-01",
  );
  assert.equal(
    nextReviewDate("2026-09-29", 3, {
      previousReview: "2026-09-15",
      delayedSuccess: true,
      confidence: 4,
    }),
    "2026-10-21",
  );
  assert.equal(
    nextReviewDate("2026-09-29", 3, { examSuccess: true }),
    "2026-10-08",
  );
});

test("next study date respects capacity and selected study weekdays", () => {
  const overloaded = {
    id: "busy",
    date: "2026-09-30",
    target_minutes: 90,
    status: "planned",
    kind: "study",
  } as PlanItem;

  const date = findNextStudyDate({
    plan: [overloaded],
    fromISO: "2026-09-29",
    studyWeekdays: [1, 2, 3, 4, 5],
    minutes: 30,
  });

  assert.equal(date, "2026-10-01");
});

test("today task rationale is transparent without pretending to know a grade", () => {
  const course = {
    id: "11111111-1111-4111-8111-111111111111",
    exam_date: "2026-10-05",
  } as Course;
  const t = topic("22222222-2222-4222-8222-222222222222", 2, {
    next_review: "2026-09-28",
  });
  const item = {
    id: "33333333-3333-4333-8333-333333333333",
    course_id: course.id,
    topic_id: t.id,
  } as PlanItem;
  const mistake = {
    course_id: course.id,
    topic_id: t.id,
    status: "open",
  } as Mistake;

  const reason = todayTaskReason({
    item,
    courses: [course],
    topics: [t],
    mistakes: [mistake],
    now: "2026-09-29",
  });

  assert.match(reason, /kertaus on ajankohtainen/);
  assert.match(reason, /avoin virhe/);
  assert.ok(!/arvosana|todennäköisyys/i.test(reason));
});
