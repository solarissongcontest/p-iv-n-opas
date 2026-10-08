export * from "./maa06a-core.ts";

import {
  countsAsCompleted,
  effectiveGoalDate,
  maa06aProgress,
  studyDatesBetween as baseStudyDatesBetween,
  type CourseExercise,
  type CourseExerciseAttempt,
  type CourseExerciseGoal,
} from "./maa06a-core.ts";

export const MAA06A_AUTUMN_BREAK_STUDY_DATES = [
  "2026-10-19",
  "2026-10-21",
  "2026-10-23",
  "2026-10-25",
] as const;

const AUTUMN_BREAK_START = "2026-10-19";
const AUTUMN_BREAK_END = "2026-10-25";

function utcDate(iso: string) {
  return new Date(`${iso.slice(0, 10)}T12:00:00Z`);
}

function toISO(date: Date) {
  return date.toISOString().slice(0, 10);
}

function addDays(iso: string, amount: number) {
  const date = utcDate(iso);
  date.setUTCDate(date.getUTCDate() + amount);
  return toISO(date);
}

/**
 * MAA06A deliberately alternates with BI05 during the 2026 autumn break.
 * Normal study weekdays still apply everywhere else. This uses the school-free
 * Monday/Wednesday without piling MAA06A, BI05 and KE04 onto every single day.
 */
export function maa06aStudyDatesBetween(
  start: string,
  end: string,
  studyWeekdays: number[],
  busyDates: string[] = [],
) {
  const busy = new Set(busyDates);
  const normal = baseStudyDatesBetween(start, end, studyWeekdays, busyDates).filter(
    (date) => date < AUTUMN_BREAK_START || date > AUTUMN_BREAK_END,
  );
  const holiday = MAA06A_AUTUMN_BREAK_STUDY_DATES.filter(
    (date) => date >= start && date <= end && !busy.has(date),
  );
  return [...new Set([...normal, ...holiday])].sort();
}

export function maa06aPace(input: {
  startDate: string;
  today: string;
  goal: Pick<CourseExerciseGoal, "target_count" | "deadline" | "buffer_days">;
  completed: number;
  studyWeekdays: number[];
  busyDates?: string[];
}) {
  const { startDate, today, goal, completed, studyWeekdays } = input;
  const busyDates = input.busyDates ?? [];
  const plannedFinish = effectiveGoalDate(goal);
  const hardFinish = goal.deadline;
  const targetFinish = today <= plannedFinish ? plannedFinish : hardFinish;
  const firstRelevant = today < startDate ? startDate : today;
  let remainingDates = maa06aStudyDatesBetween(firstRelevant, targetFinish, studyWeekdays, busyDates);

  if (!remainingDates.length && today <= hardFinish) {
    remainingDates = maa06aStudyDatesBetween(firstRelevant, hardFinish, studyWeekdays, busyDates);
  }

  const remaining = Math.max(0, goal.target_count - completed);
  const sessions = Math.max(1, remainingDates.length);
  const perStudyDay = remaining === 0 ? 0 : Math.ceil(remaining / sessions);
  const nextStudyDate = remainingDates[0] ?? null;

  const planDates = maa06aStudyDatesBetween(startDate, plannedFinish, studyWeekdays, busyDates);
  const elapsedPlanDates = planDates.filter((date) => date <= today).length;
  const expectedByToday = planDates.length
    ? Math.min(goal.target_count, Math.round((elapsedPlanDates / planDates.length) * goal.target_count))
    : 0;

  return {
    plannedFinish,
    hardFinish,
    remaining,
    remainingStudyDays: remainingDates.length,
    perStudyDay,
    nextStudyDate,
    expectedByToday,
    delta: completed - expectedByToday,
  };
}

function latestAttemptMap(attempts: CourseExerciseAttempt[]) {
  const map = new Map<string, CourseExerciseAttempt>();
  for (const attempt of [...attempts].sort((a, b) => a.attempted_at.localeCompare(b.attempted_at))) {
    map.set(attempt.exercise_id, attempt);
  }
  return map;
}

export function recommendMaa06aExercises(input: {
  exercises: CourseExercise[];
  attempts: CourseExerciseAttempt[];
  goal: CourseExerciseGoal;
  startDate: string;
  today: string;
  studyWeekdays: number[];
  busyDates?: string[];
  count?: number;
}) {
  const progress = maa06aProgress(input.exercises, input.attempts, input.goal.target_count);
  const pace = maa06aPace({
    startDate: input.startDate,
    today: input.today,
    goal: input.goal,
    completed: progress.uniqueCompleted,
    studyWeekdays: input.studyWeekdays,
    busyDates: input.busyDates ?? [],
  });
  if (!pace.remaining) return { exercises: [] as CourseExercise[], pace, scheduledDate: pace.nextStudyDate };

  const scheduledDate = pace.nextStudyDate ?? input.today;
  const holidayBoost = MAA06A_AUTUMN_BREAK_STUDY_DATES.includes(scheduledDate as (typeof MAA06A_AUTUMN_BREAK_STUDY_DATES)[number]) ? 1 : 0;
  const wanted = Math.max(1, Math.min(10, (input.count ?? pace.perStudyDay + holidayBoost) || 1));
  const incomplete = input.exercises.filter(
    (exercise) => exercise.counts_toward_goal && !progress.completedExerciseIds.has(exercise.id),
  );
  const latest = latestAttemptMap(input.attempts);
  const daysToHardDeadline = Math.round(
    (utcDate(input.goal.deadline).getTime() - utcDate(scheduledDate).getTime()) / 86_400_000,
  );
  const reviewWindow = daysToHardDeadline <= 14;

  const completedNormal = input.exercises.filter(
    (exercise) =>
      exercise.source === "textbook" &&
      exercise.chapter != null &&
      progress.completedExerciseIds.has(exercise.id),
  );
  const highestStarted = completedNormal.reduce((max, exercise) => Math.max(max, exercise.chapter ?? 1), 1);
  const inHighest = completedNormal.filter((exercise) => exercise.chapter === highestStarted).length;
  const currentChapter = Math.min(17, highestStarted + (inHighest >= 5 ? 1 : 0));
  const allowedChapter = Math.min(17, currentChapter + 1);

  const score = (exercise: CourseExercise) => {
    let value = 0;
    if (exercise.teacher_recommended) value -= 100;

    if (reviewWindow) {
      value += exercise.source === "textbook_review"
        ? 0
        : exercise.source === "review_worksheet"
          ? 5
          : 12;
    } else {
      value += exercise.source === "textbook" ? 0 : 75;
    }

    if (exercise.chapter != null) {
      if (exercise.chapter > allowedChapter) value += 200 + (exercise.chapter - allowedChapter) * 10;
      else value += Math.abs(exercise.chapter - currentChapter) * 5;
    }

    if (exercise.level === 1) value += 0;
    if (exercise.level === 2) value += 2;
    if (exercise.level === 3) value += 8;

    const last = latest.get(exercise.id);
    if (last?.result === "skipped") value += 25;
    if (last?.result === "solution_only") value += 12;

    value += exercise.sort_order / 100_000;
    return value;
  };

  const ranked = [...incomplete].sort((a, b) => score(a) - score(b));
  const picked: CourseExercise[] = [];
  let level3 = 0;
  const maxLevel3 = Math.max(1, Math.ceil(wanted * 0.35));

  if (reviewWindow) {
    const reviewPool = ranked.filter((exercise) => exercise.source !== "textbook");
    const reviewWanted = Math.min(reviewPool.length, Math.max(1, Math.ceil(wanted * 0.4)));
    for (const exercise of reviewPool.slice(0, reviewWanted)) picked.push(exercise);
  }

  for (const exercise of ranked) {
    if (picked.length >= wanted) break;
    if (picked.some((item) => item.id === exercise.id)) continue;
    if (!reviewWindow && exercise.level === 3 && level3 >= maxLevel3) continue;
    picked.push(exercise);
    if (exercise.level === 3) level3 += 1;
  }

  if (picked.length < wanted) {
    for (const exercise of ranked) {
      if (picked.length >= wanted) break;
      if (!picked.some((item) => item.id === exercise.id)) picked.push(exercise);
    }
  }

  return { exercises: picked, pace, scheduledDate };
}

export function maa06aTrajectory(input: {
  exercises: CourseExercise[];
  attempts: CourseExerciseAttempt[];
  goal: CourseExerciseGoal;
  startDate: string;
  studyWeekdays: number[];
  busyDates?: string[];
  throughDate?: string;
}) {
  const busyDates = input.busyDates ?? [];
  const through = input.throughDate && input.throughDate > input.goal.deadline
    ? input.goal.deadline
    : input.throughDate ?? input.goal.deadline;
  const plannedFinish = effectiveGoalDate(input.goal);
  const planStudyDates = maa06aStudyDatesBetween(input.startDate, plannedFinish, input.studyWeekdays, busyDates);
  const eligibleExerciseIds = new Set(
    input.exercises.filter((exercise) => exercise.counts_toward_goal).map((exercise) => exercise.id),
  );

  const firstCompletion = new Map<string, string>();
  for (const attempt of [...input.attempts].sort((a, b) => a.attempted_at.localeCompare(b.attempted_at))) {
    if (
      eligibleExerciseIds.has(attempt.exercise_id) &&
      countsAsCompleted(attempt.result) &&
      !firstCompletion.has(attempt.exercise_id)
    ) {
      firstCompletion.set(attempt.exercise_id, attempt.attempted_at.slice(0, 10));
    }
  }

  const points: Array<{ date: string; planned: number; actual: number }> = [];
  for (let cursor = input.startDate; cursor <= through; cursor = addDays(cursor, 1)) {
    const plannedElapsed = planStudyDates.filter((date) => date <= cursor).length;
    const planned = planStudyDates.length
      ? Math.min(input.goal.target_count, Math.round(plannedElapsed / planStudyDates.length * input.goal.target_count))
      : 0;
    const actual = Math.min(
      input.goal.target_count,
      [...firstCompletion.values()].filter((date) => date <= cursor).length,
    );
    points.push({ date: cursor, planned, actual });
  }
  return points;
}
