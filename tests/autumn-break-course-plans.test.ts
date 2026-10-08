import assert from "node:assert/strict";
import test from "node:test";
import {
  BI05_IIRIS5_TOPICS,
  BI05_PROVISIONAL_EXAM_CHAPTERS,
} from "../src/lib/bi05-iiris5.ts";
import {
  BI05_AUTUMN_BREAK_STUDY_DATES,
  generateBi05TwoExamPlan,
} from "../src/lib/bi05-course-plan.ts";
import {
  MAA06A_AUTUMN_BREAK_STUDY_DATES,
  maa06aPace,
  maa06aStudyDatesBetween,
} from "../src/lib/maa06a.ts";

function allBi05Topics() {
  return BI05_IIRIS5_TOPICS.map((row) => ({
    id: `topic-${row.code}`,
    course_id: "bi05",
    name: row.name,
    position: row.position,
    progress: 0,
    school_covered: row.code === "1.1",
    last_review: null,
  }));
}

function bi05Options(topics = allBi05Topics()) {
  return {
    course: { id: "bi05", code: "BI05", start_date: "2026-10-06" },
    topics,
    examDate: "2026-10-29",
    studyWeekdays: [2, 4, 5, 6, 7],
    weeklyMinutes: 180,
    mistakes: [],
    tests: [],
    capacity: { studyWeekdays: [2, 4, 5, 6, 7], weekdayMinutes: 60, weekendMinutes: 90, busyDates: [] },
    fromISO: "2026-10-08",
  } as any;
}

test("BI05 plans both confirmed exams without inventing chapter 5 exam content", () => {
  const drafts = generateBi05TwoExamPlan(bi05Options());

  assert.deepEqual(
    drafts.filter((draft) => draft.kind === "exam").map((draft) => draft.date),
    ["2026-10-29", "2026-11-20"],
  );
  assert.equal(drafts.some((draft) => draft.title.startsWith("Luku 5:") || draft.title.includes("· Luku 5:")), false);
  assert.equal(drafts.some((draft) => draft.date === "2026-11-19" && draft.kind === "review"), true);
});

test("BI05 uses major chapters as the Planner learning unit instead of individual subchapters", () => {
  const drafts = generateBi05TwoExamPlan(bi05Options());
  const exam1Content = drafts.filter((draft) => draft.kind === "study" && draft.date < "2026-10-29");
  const exam2Content = drafts.filter((draft) => draft.kind === "study" && draft.date > "2026-10-29" && draft.date < "2026-11-20");

  assert.equal(exam1Content.length, 7);
  assert.equal(exam2Content.length, 6);
  assert.equal(exam1Content.every((draft) => draft.title.includes("Luku ")), true);
  assert.equal(exam2Content.every((draft) => draft.title.includes("Luku ")), true);
  assert.equal(new Set(exam1Content.map((draft) => draft.date)).size, exam1Content.length);
  assert.equal(new Set(exam2Content.map((draft) => draft.date)).size, exam2Content.length);
  assert.equal(drafts.some((draft) => draft.title === "1.1 Kudokset"), false);
});

test("BI05 keeps phase two even when Planner has loaded only phase one's scoped topics", () => {
  const firstExamChapters = new Set<number>(BI05_PROVISIONAL_EXAM_CHAPTERS["exam-1"]);
  const firstScopeOnly = allBi05Topics().filter((topic) => {
    const chapter = Number(topic.name.split(".")[0]);
    return firstExamChapters.has(chapter);
  });
  const drafts = generateBi05TwoExamPlan(bi05Options(firstScopeOnly));
  const secondPhase = drafts.filter((draft) => draft.date >= "2026-10-30" && draft.date < "2026-11-20" && draft.kind !== "exam");

  assert.equal(secondPhase.some((draft) => draft.title.includes("Luku 9:")), true);
  assert.equal(secondPhase.some((draft) => draft.title.includes("Luku 14:")), true);
  assert.equal(secondPhase.some((draft) => draft.topic_id === null), true);
});

test("BI05 remains the primary course on every autumn-break day before the 29 Oct exam", () => {
  const drafts = generateBi05TwoExamPlan(bi05Options());
  const holidayDates = [...new Set(
    drafts.filter((draft) => draft.date >= "2026-10-19" && draft.date <= "2026-10-25").map((draft) => draft.date),
  )];
  assert.deepEqual(holidayDates, BI05_AUTUMN_BREAK_STUDY_DATES);

  for (const date of BI05_AUTUMN_BREAK_STUDY_DATES) {
    const day = drafts.filter((draft) => draft.date === date);
    assert.equal(day.length >= 1, true, `${date} needs BI05 work`);
    assert.equal(day.every((draft) => draft.title.startsWith("Syysloma · ")), true);
  }

  // Content days combine chapter learning + a recall warm-up rather than stacking
  // a second full review block on the same day.
  const holidayContent = drafts.filter(
    (draft) => draft.date >= "2026-10-19" && draft.date <= "2026-10-25" && draft.kind === "study",
  );
  assert.equal(holidayContent.length, 3);
  assert.equal(holidayContent.every((draft) => draft.title.includes("aktiivinen palautus")), true);

  const holidayMinutes = drafts
    .filter((draft) => draft.date >= "2026-10-19" && draft.date <= "2026-10-25")
    .reduce((sum, draft) => sum + draft.target_minutes, 0);
  assert.equal(holidayMinutes >= 300 && holidayMinutes <= 380, true);
});

test("BI05 continues focused but capacity-aware exam preparation after autumn break", () => {
  const drafts = generateBi05TwoExamPlan(bi05Options());
  const prep = drafts.filter((draft) => draft.kind === "review" && draft.date >= "2026-10-26" && draft.date <= "2026-10-28");
  assert.deepEqual(prep.map((draft) => draft.date), ["2026-10-26", "2026-10-27", "2026-10-28"]);
  assert.deepEqual(prep.map((draft) => draft.target_minutes), [35, 20, 20]);
});

test("BI05 second exam gets spaced review instead of a single day-before cram", () => {
  const drafts = generateBi05TwoExamPlan(bi05Options());
  assert.deepEqual(
    drafts
      .filter((draft) => draft.kind === "review" && draft.date >= "2026-11-15" && draft.date < "2026-11-20")
      .map((draft) => draft.date),
    ["2026-11-15", "2026-11-17", "2026-11-19"],
  );
});

test("MAA06A remains a secondary pace-based course during autumn break and keeps the 130-task buffer", () => {
  const holidayDates = maa06aStudyDatesBetween(
    "2026-10-19",
    "2026-10-25",
    [2, 4, 5, 6, 7],
  );
  assert.deepEqual(holidayDates, MAA06A_AUTUMN_BREAK_STUDY_DATES);
  assert.equal(holidayDates.length < BI05_AUTUMN_BREAK_STUDY_DATES.length, true);

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
