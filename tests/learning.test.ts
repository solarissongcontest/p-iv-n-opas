import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  capacityForDate,
  examPhaseStatus,
  findNextStudyDate,
  masteryEvidence,
  masterySummary,
  nextReviewDate,
  practicePrompt,
  recoveryQueue,
  returnFromBreak,
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
    retrieval_attempts: 0,
    retrieval_failures: 0,
    mastery_uncertainty: 1,
    last_retrieval_at: null,
    last_retrieval_result: null,
    last_retrieval_confidence: null,
    last_retrieval_difficulty: null,
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

test("selected study weekdays map exactly to Finnish Monday-Sunday numbering", () => {
  const selected = [2,4,5,6,7]; // ti, to, pe, la, su
  const cases = [
    ["2026-10-05", "2026-10-06"], // ma -> ti
    ["2026-10-06", "2026-10-08"], // ti -> to
    ["2026-10-08", "2026-10-09"], // to -> pe
    ["2026-10-09", "2026-10-10"], // pe -> la
    ["2026-10-10", "2026-10-11"], // la -> su
    ["2026-10-11", "2026-10-13"], // su -> ti, maanantai ei kuulu joukkoon
  ] as const;

  for (const [fromISO, expected] of cases) {
    assert.equal(findNextStudyDate({
      plan: [],
      fromISO,
      studyWeekdays: selected,
      minutes: 30,
    }), expected);
  }
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


test("capacity model distinguishes weekdays, weekends and busy dates", () => {
  const profile = {
    studyWeekdays: [1,2,3,4,5],
    weekdayMinutes: 60,
    weekendMinutes: 120,
    busyDates: ["2026-10-01"],
  };
  assert.equal(capacityForDate(profile, "2026-09-30"), 60);
  assert.equal(capacityForDate(profile, "2026-10-03"), 120);
  assert.equal(capacityForDate(profile, "2026-10-01"), 20);
});

test("capacity-aware rescheduling avoids an overloaded day", () => {
  const date = findNextStudyDate({
    plan: [{
      id: "busy",
      date: "2026-09-30",
      target_minutes: 55,
      status: "planned",
      kind: "study",
    } as PlanItem],
    fromISO: "2026-09-29",
    studyWeekdays: [1,2,3,4,5],
    minutes: 30,
    capacity: {
      studyWeekdays: [1,2,3,4,5],
      weekdayMinutes: 60,
      weekendMinutes: 90,
      busyDates: [],
    },
  });
  assert.equal(date, "2026-10-01");
});

test("return from break surfaces a capped gentle restart", () => {
  const comeback = returnFromBreak({
    sessions: [{ date: "2026-09-20" }] as any,
    topics: [
      topic("a", 2, { next_review: "2026-09-22", importance: 5 }),
      topic("b", 2, { next_review: "2026-09-23", importance: 4 }),
      topic("c", 3, { next_review: "2026-09-24", importance: 3 }),
      topic("d", 1, { next_review: "2026-09-25", importance: 5 }),
    ],
    now: "2026-09-29",
  });
  assert.ok(comeback);
  assert.equal(comeback?.awayDays, 9);
  assert.equal(comeback?.items.length, 3);
  assert.equal(comeback?.estimatedMinutes, 15);
});

test("practice prompts progress from recall toward transfer and recognition", () => {
  const t = topic("newton", 3);
  const types = Array.from({length:5},(_,index)=>practicePrompt(t,index).type);
  assert.deepEqual(types, [
    "free_recall",
    "short_answer",
    "calculation",
    "application",
    "recognition",
  ]);
  assert.match(practicePrompt(t,0).prompt,/ilman muistiinpanoja/i);
});

test("exam mode exposes all six preparation phases", () => {
  const phases = examPhaseStatus({
    topics: [
      topic("a", 4, { progress: 100, basic_successes: 2, exam_successes: 1 }),
      topic("b", 3, { progress: 100, basic_successes: 2 }),
    ],
    tests: [{ score: 8, max_score: 10 }] as any,
    mistakes: [] as any,
  });
  assert.deepEqual(phases.map(phase=>phase.key), [
    "coverage","retrieval","mixed","transfer","simulation","repair",
  ]);
  assert.equal(phases[0]?.done, true);
  assert.equal(phases[4]?.done, true);
});

test("manual self-rating cannot create mastery evidence in the database function", () => {
  const sql = readFileSync(
    new URL("../supabase/migrations/20260929080000_evidence_based_guided_sessions.sql", import.meta.url),
    "utf8",
  );
  const manualStart = sql.indexOf("create or replace function public.log_study_session");
  const guidedStart = sql.indexOf("create or replace function public.log_guided_study_session");
  assert.ok(manualStart >= 0 && guidedStart > manualStart);
  const manual = sql.slice(manualStart, guidedStart);
  assert.doesNotMatch(manual, /basic_successes\s*=\s*.*p_competence/is);
  assert.doesNotMatch(manual, /exam_successes\s*=\s*.*p_competence/is);
  assert.doesNotMatch(manual, /delayed_successes\s*=\s*.*p_competence/is);
  assert.match(manual, /self_level\s*=\s*coalesce\(p_competence/i);
});
