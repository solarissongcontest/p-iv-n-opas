import assert from "node:assert/strict";
import test from "node:test";
import {
  BI05_IIRIS5_TOPICS,
  BI05_EXAM_CHAPTERS,
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
    school_covered: row.chapter <= 3,
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
    fromISO: "2026-10-12",
  } as any;
}

test("BI05 plans both exams and keeps chapters 5, 6 and 8 out of exam 1", () => {
  const drafts = generateBi05TwoExamPlan(bi05Options());

  assert.deepEqual(
    drafts.filter((draft) => draft.kind === "exam").map((draft) => draft.date),
    ["2026-10-29", "2026-11-20"],
  );
  const firstExamPhase = drafts.filter((draft) => draft.date < "2026-10-29");
  assert.equal(firstExamPhase.some((draft) => /Luku (5|6|8):/.test(draft.title)), false);
  assert.equal(drafts.some((draft) => draft.date === "2026-11-19" && draft.kind === "review"), true);
});

test("BI05 treats chapters 1–3 as school-covered review, not new content", () => {
  const drafts = generateBi05TwoExamPlan(bi05Options());
  const exam1Content = drafts.filter((draft) => draft.kind === "study" && draft.date < "2026-10-29");
  assert.deepEqual(exam1Content.map((draft) => draft.title.match(/Luku (\d+):/)?.[1]), ["4", "7"]);
  assert.deepEqual(exam1Content.map((draft) => draft.date), ["2026-10-13", "2026-10-19"]);
  assert.equal(drafts.some((draft) => draft.title.includes("luvut 1–3: aktiivinen palautus")), true);
});

test("BI05 keeps phase two even when Planner has loaded only phase one's scoped topics", () => {
  const firstExamChapters = new Set<number>(BI05_EXAM_CHAPTERS["exam-1"]);
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

  const holidayContent = drafts.filter(
    (draft) => draft.date >= "2026-10-19" && draft.date <= "2026-10-25" && draft.kind === "study",
  );
  assert.equal(holidayContent.length, 1);
  assert.equal(holidayContent[0]?.title.includes("Luku 7:"), true);
  assert.equal(holidayContent[0]?.title.includes("aktiivinen palautus"), true);

  const holidayMinutes = drafts
    .filter((draft) => draft.date >= "2026-10-19" && draft.date <= "2026-10-25")
    .reduce((sum, draft) => sum + draft.target_minutes, 0);
  assert.equal(holidayMinutes, 325);
});

test("BI05 exam-1 plan explicitly trains both named structures and the real exam format", () => {
  const drafts = generateBi05TwoExamPlan(bi05Options());
  const neuron = drafts.find((draft) => draft.date === "2026-10-22");
  const heart = drafts.find((draft) => draft.date === "2026-10-21");
  const simulation = drafts.find((draft) => draft.date === "2026-10-25");
  const exam = drafts.find((draft) => draft.date === "2026-10-29" && draft.kind === "exam");

  assert.equal(neuron?.topic_id, "topic-3.1");
  assert.match(neuron?.title ?? "", /hermosolun rakenne/i);
  assert.equal(heart?.topic_id, "topic-7.2");
  assert.match(heart?.title ?? "", /sydämen rakenne/i);
  assert.match(simulation?.title ?? "", /10 monivalintaa \+ 5 käsitettä \+ 2 × 10 p tehtävää/);
  assert.equal(exam?.start_time, "08:00");
});

test("BI05 continues focused but capacity-aware exam preparation after autumn break", () => {
  const drafts = generateBi05TwoExamPlan(bi05Options());
  const prep = drafts.filter((draft) => draft.kind === "review" && draft.date >= "2026-10-26" && draft.date <= "2026-10-28");
  assert.deepEqual(prep.map((draft) => draft.date), ["2026-10-26", "2026-10-27", "2026-10-28"]);
  assert.deepEqual(prep.map((draft) => draft.target_minutes), [35, 30, 25]);
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
