import assert from "node:assert/strict";
import test from "node:test";
import { MAA06A_EXERCISE_SEED, MAA06A_REVIEW_COUNTS } from "../src/data/maa06a-exercises.ts";
import {
  maa06aPace,
  maa06aProgress,
  recommendMaa06aExercises,
  type CourseExercise,
  type CourseExerciseAttempt,
  type CourseExerciseGoal,
} from "../src/lib/maa06a.ts";

function asExercises(): CourseExercise[] {
  return MAA06A_EXERCISE_SEED.map((exercise, index) => ({
    id: `exercise-${index}`,
    course_id: "maa06a",
    topic_id: null,
    code: exercise.code,
    source: exercise.source,
    source_group: exercise.sourceGroup,
    section_code: exercise.section,
    chapter: exercise.chapter,
    level: exercise.level,
    teacher_recommended: exercise.teacherRecommended,
    counts_toward_goal: exercise.countsTowardGoal,
    estimated_load: exercise.estimatedLoad,
    sort_order: exercise.sortOrder,
  }));
}

const goal: CourseExerciseGoal = {
  id: "goal",
  course_id: "maa06a",
  target_count: 130,
  deadline: "2026-11-26",
  buffer_days: 2,
  bonus_points: 8,
  bonus_label: "130 tehtävää → +8 p kokeeseen",
  resource_url: "https://sites.google.com/view/toninmatikkamaailma/etusivu/maa6-alkuosa",
};

test("MAA06A seed contains the canonical normal and review task banks", () => {
  const normal = MAA06A_EXERCISE_SEED.filter((exercise) => exercise.source === "textbook");
  const review = MAA06A_EXERCISE_SEED.filter((exercise) => exercise.source !== "textbook");
  assert.equal(normal.length, 221);
  assert.equal(review.length, 87);
  assert.equal(MAA06A_REVIEW_COUNTS.textbook, 72);
  assert.equal(MAA06A_REVIEW_COUNTS.worksheet, 15);
  assert.equal(MAA06A_EXERCISE_SEED.length, 308);
  assert.equal(normal.filter((exercise) => exercise.teacherRecommended).length, 116);
  assert.equal(new Set(MAA06A_EXERCISE_SEED.map((exercise) => `${exercise.source}:${exercise.code}`)).size, 308);
});

test("review bank preserves the intentionally sparse A/B codes", () => {
  const bookReviewCodes = MAA06A_EXERCISE_SEED
    .filter((exercise) => exercise.source === "textbook_review")
    .map((exercise) => exercise.code);
  assert.equal(bookReviewCodes.includes("A3"), false);
  assert.equal(bookReviewCodes.includes("B1"), false);
  assert.deepEqual(bookReviewCodes.filter((code) => code.startsWith("A")), ["A1","A2","A4","A5","A6","A7","A8","A9","A10"]);
  assert.deepEqual(bookReviewCodes.filter((code) => code.startsWith("B")), ["B2","B3","B4","B7","B8","B10"]);
});

test("130 progress counts a distinct exercise once and accepts class/wrong/helped work", () => {
  const exercises = asExercises().slice(0, 8);
  const attempts: CourseExerciseAttempt[] = [
    { id: "1", course_id: "maa06a", exercise_id: exercises[0]!.id, result: "independent", note: null, attempted_at: "2026-10-07T10:00:00Z" },
    { id: "2", course_id: "maa06a", exercise_id: exercises[0]!.id, result: "incorrect", note: null, attempted_at: "2026-10-08T10:00:00Z" },
    { id: "3", course_id: "maa06a", exercise_id: exercises[1]!.id, result: "class", note: null, attempted_at: "2026-10-07T10:00:00Z" },
    { id: "4", course_id: "maa06a", exercise_id: exercises[2]!.id, result: "helped", note: null, attempted_at: "2026-10-07T10:00:00Z" },
    { id: "5", course_id: "maa06a", exercise_id: exercises[3]!.id, result: "incorrect", note: null, attempted_at: "2026-10-07T10:00:00Z" },
    { id: "6", course_id: "maa06a", exercise_id: exercises[4]!.id, result: "solution_only", note: null, attempted_at: "2026-10-07T10:00:00Z" },
    { id: "7", course_id: "maa06a", exercise_id: exercises[5]!.id, result: "skipped", note: null, attempted_at: "2026-10-07T10:00:00Z" },
  ];
  const progress = maa06aProgress(exercises, attempts, 3);
  assert.equal(progress.uniqueCompleted, 4);
  assert.equal(progress.goalCompleted, 3);
  assert.equal(progress.extraCompleted, 1);
  assert.equal(progress.byResult.class, 1);
  assert.equal(progress.byResult.helped, 1);
  assert.equal(progress.byResult.incorrect, 1);
});

test("pace uses a two-day buffer and never schedules fractional exercises", () => {
  const pace = maa06aPace({
    startDate: "2026-10-06",
    today: "2026-10-07",
    goal,
    completed: 0,
    studyWeekdays: [2,4,5,6,7],
  });
  assert.equal(pace.plannedFinish, "2026-11-24");
  assert.equal(pace.hardFinish, "2026-11-26");
  assert.equal(Number.isInteger(pace.perStudyDay), true);
  assert.ok(pace.perStudyDay >= 1);
});

test("daily recommendation prioritizes teacher recommendations and postpones review bank early", () => {
  const exercises = asExercises();
  const result = recommendMaa06aExercises({
    exercises,
    attempts: [],
    goal,
    startDate: "2026-10-06",
    today: "2026-10-07",
    studyWeekdays: [2,4,5,6,7],
    count: 5,
  });
  assert.equal(result.exercises.length, 5);
  assert.equal(result.exercises.every((exercise) => exercise.source === "textbook"), true);
  assert.equal(result.exercises.some((exercise) => exercise.teacher_recommended), true);
  assert.ok(result.exercises.filter((exercise) => exercise.level === 3).length <= 2);
});

test("review exercises enter the recommendation close to the exam and still count toward 130", () => {
  const exercises = asExercises();
  const normal = exercises.filter((exercise) => exercise.source === "textbook");
  const attempts: CourseExerciseAttempt[] = normal.slice(0, 120).map((exercise, index) => ({
    id: `attempt-${index}`,
    course_id: "maa06a",
    exercise_id: exercise.id,
    result: "independent",
    note: null,
    attempted_at: `2026-11-${String(1 + Math.floor(index / 10)).padStart(2, "0")}T10:00:00Z`,
  }));
  const recommendation = recommendMaa06aExercises({
    exercises,
    attempts,
    goal,
    startDate: "2026-10-06",
    today: "2026-11-20",
    studyWeekdays: [2,4,5,6,7],
    count: 6,
  });
  assert.equal(recommendation.exercises.some((exercise) => exercise.source !== "textbook"), true);
  assert.equal(recommendation.exercises.every((exercise) => exercise.counts_toward_goal), true);
});
