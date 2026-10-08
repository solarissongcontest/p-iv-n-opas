import assert from "node:assert/strict";
import test from "node:test";
import { BI05_IIRIS5_TOPICS } from "../src/lib/bi05-iiris5.ts";
import {
  BI05_AUTUMN_BREAK_STUDY_DATES,
  generateBi05TwoExamPlan,
} from "../src/lib/bi05-course-plan.ts";
import {
  MAA06A_AUTUMN_BREAK_STUDY_DATES,
  maa06aPace,
  maa06aStudyDatesBetween,
} from "../src/lib/maa06a.ts";

test("BI05 plans both confirmed exams without inventing chapter 5 exam content", () => {
  const topics = BI05_IIRIS5_TOPICS.map((row) => ({
    id: `topic-${row.code}`,
    course_id: "bi05",
    name: row.name,
    position: row.position,
    progress: 0,
    school_covered: row.code === "1.1",
    last_review: null,
  }));
  const drafts = generateBi05TwoExamPlan({
    course: { id: "bi05", code: "BI05", start_date: "2026-10-06" },
    topics,
    examDate: "2026-10-29",
    studyWeekdays: [2, 4, 5, 6, 7],
    weeklyMinutes: 180,
    mistakes: [],
    tests: [],
    capacity: { studyWeekdays: [2, 4, 5, 6, 7], weekdayMinutes: 60, weekendMinutes: 90, busyDates: [] },
    fromISO: "2026-10-08",
  } as any);

  assert.deepEqual(
    drafts.filter((draft) => draft.kind === "exam").map((draft) => draft.date),
    ["2026-10-29", "2026-11-20"],
  );
  const chapterFiveIds = new Set(topics.filter((topic) => topic.name.startsWith("5.")).map((topic) => topic.id));
  assert.equal(drafts.some((draft) => draft.topic_id && chapterFiveIds.has(draft.topic_id)), false);
  assert.equal(drafts.some((draft) => draft.date === "2026-10-27" && draft.kind === "review"), true);
  assert.equal(drafts.some((draft) => draft.date === "2026-11-19" && draft.kind === "review"), true);
});

test("BI05 uses alternating autumn-break days so it does not pile onto MAA06A every day", () => {
  const topics = BI05_IIRIS5_TOPICS.map((row) => ({
    id: `topic-${row.code}`,
    course_id: "bi05",
    name: row.name,
    position: row.position,
    progress: 0,
    school_covered: row.code === "1.1",
    last_review: null,
  }));
  const drafts = generateBi05TwoExamPlan({
    course: { id: "bi05", code: "BI05", start_date: "2026-10-06" },
    topics,
    examDate: "2026-10-29",
    studyWeekdays: [2, 4, 5, 6, 7],
    weeklyMinutes: 180,
    mistakes: [],
    tests: [],
    capacity: { studyWeekdays: [2, 4, 5, 6, 7], weekdayMinutes: 60, weekendMinutes: 90, busyDates: [] },
    fromISO: "2026-10-08",
  } as any);
  const holidayDates = [...new Set(
    drafts.filter((draft) => draft.date >= "2026-10-19" && draft.date <= "2026-10-25").map((draft) => draft.date),
  )];
  assert.deepEqual(holidayDates, BI05_AUTUMN_BREAK_STUDY_DATES);
  assert.equal(drafts.filter((draft) => BI05_AUTUMN_BREAK_STUDY_DATES.includes(draft.date)).every((draft) => draft.title.startsWith("Syysloma · ")), true);
});

test("MAA06A deliberately uses the opposite autumn-break days and keeps the 130-task buffer", () => {
  const holidayDates = maa06aStudyDatesBetween(
    "2026-10-19",
    "2026-10-25",
    [2, 4, 5, 6, 7],
  );
  assert.deepEqual(holidayDates, MAA06A_AUTUMN_BREAK_STUDY_DATES);

  const pace = maa06aPace({
    startDate: "2026-10-06",
    today: "2026-10-08",
    goal: { target_count: 130, deadline: "2026-11-26", buffer_days: 2 },
    completed: 11,
    studyWeekdays: [2, 4, 5, 6, 7],
  });
  assert.equal(pace.plannedFinish, "2026-11-24");
  assert.equal(pace.hardFinish, "2026-11-26");
  assert.equal(pace.remaining, 119);
  assert.equal(pace.remainingStudyDays, 34);
  assert.equal(pace.perStudyDay, 4);
});
