import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const chart = readFileSync(
  new URL("../src/features/progress/PlanAdherenceCard.tsx", import.meta.url),
  "utf8",
);
const engine = readFileSync(
  new URL("../src/lib/progress-trajectory.ts", import.meta.url),
  "utf8",
);

test("progress summary uses the course-bound daily trajectory instead of an 8-week rolling chart", () => {
  assert.match(chart, /buildProgressTrajectory/);
  assert.match(chart, /pickTrajectoryCourse/);
  assert.match(chart, /Päivittäin/);
  assert.match(chart, /Koko kurssi/);
  assert.match(chart, /TÄNÄÄN/);
  assert.match(chart, /Tavoitealue/);
  assert.match(chart, /Ennuste/);
  assert.match(chart, /deviationStudyDays/);
  assert.doesNotMatch(chart, /weeklyStudySeries/);
  assert.doesNotMatch(chart, /8 viikon toteutumisaste/);
});

test("daily trajectory preserves every course day and never projects actual progress into the future", () => {
  assert.match(engine, /dateRange\(startDate, endDate\)/);
  assert.match(engine, /date <= now \? clamp\(\(cumulativeCompleted \/ totalMinutes\) \* 100\) : null/);
  assert.match(engine, /isToday: date === now/);
  assert.match(engine, /isCourseStart: date === startDate/);
  assert.match(engine, /isExam: date === endDate/);
});

test("forecast requires multiple real completion days and plan moves stay visible", () => {
  assert.match(engine, /completionDays\.length >= 3/);
  assert.match(engine, /item\.moved_from/);
  assert.match(engine, /revisionDates\.add\(item\.moved_from\)/);
});
