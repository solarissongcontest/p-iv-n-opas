import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const planCard = readFileSync(
  new URL("../src/features/progress/PlanAdherenceCard.tsx", import.meta.url),
  "utf8",
);
const chart = readFileSync(
  new URL("../src/features/progress/ProgressTrajectoryChart.tsx", import.meta.url),
  "utf8",
);
const engine = readFileSync(
  new URL("../src/lib/progress-trajectory.ts", import.meta.url),
  "utf8",
);

test("progress summary uses the course-bound daily trajectory instead of an 8-week rolling chart", () => {
  assert.match(planCard, /buildProgressTrajectory/);
  assert.match(planCard, /pickTrajectoryCourse/);
  assert.match(planCard, /ProgressTrajectoryChart/);
  assert.match(chart, /Suunnitelmassa pysyminen/);
  assert.match(chart, /Päivittäin/);
  assert.match(chart, /Koko kurssi/);
  assert.match(chart, /TÄNÄÄN/);
  assert.match(chart, /Tavoitealue/);
  assert.match(chart, /Ennuste/);
  assert.match(chart, /deviationStudyDays/);
  assert.doesNotMatch(planCard, /weeklyStudySeries/);
  assert.doesNotMatch(planCard, /8 viikon toteutumisaste/);
});

test("daily trajectory preserves every course day, uses one stable course denominator and never projects actual progress into the future", () => {
  assert.match(engine, /dateRange\(startDate, endDate\)/);
  assert.match(engine, /referenceTotalMinutes/);
  assert.match(engine, /const actual = date <= now/);
  assert.match(engine, /completedMinutesCumulative \/ referenceTotalMinutes/);
  assert.doesNotMatch(engine, /completedMinutesCumulative \/ totalPlannedMinutes/);
  assert.match(engine, /isToday: date === now/);
  assert.match(engine, /isCourseStart: date === startDate/);
  assert.match(engine, /isExam: date === endDate/);
});

test("forecast requires multiple real completion days and legacy plan moves stay visible", () => {
  assert.match(engine, /uniqueCompletionDays\.length >= 3/);
  assert.match(engine, /item\.moved_from/);
  assert.match(engine, /legacy-moved-/);
  assert.match(engine, /eventType: "moved"/);
});
