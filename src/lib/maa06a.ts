export type CourseExerciseResult =
  | "independent"
  | "helped"
  | "incorrect"
  | "class"
  | "skipped"
  | "solution_only";

export type CourseExercise = {
  id: string;
  owner_id?: string;
  course_id: string;
  topic_id: string | null;
  code: string;
  source: "textbook" | "textbook_review" | "review_worksheet";
  source_group: "chapter" | "K" | "A" | "B" | "worksheet";
  section_code: string | null;
  chapter: number | null;
  level: 1 | 2 | 3 | null;
  teacher_recommended: boolean;
  counts_toward_goal: boolean;
  estimated_load: number;
  sort_order: number;
  metadata?: Record<string, unknown>;
};

export type CourseExerciseAttempt = {
  id: string;
  owner_id?: string;
  course_id: string;
  exercise_id: string;
  result: CourseExerciseResult;
  note: string | null;
  attempted_at: string;
};

export type CourseExerciseGoal = {
  id: string;
  owner_id?: string;
  course_id: string;
  target_count: number;
  deadline: string;
  buffer_days: number;
  bonus_points: number | null;
  bonus_label: string | null;
  resource_url: string | null;
};

export type Maa06aProgress = {
  uniqueCompleted: number;
  goalCompleted: number;
  extraCompleted: number;
  remaining: number;
  recommendedCompleted: number;
  recommendedTotal: number;
  bySource: {
    textbook: number;
    textbook_review: number;
    review_worksheet: number;
  };
  byResult: {
    independent: number;
    helped: number;
    incorrect: number;
    class: number;
  };
  completedExerciseIds: Set<string>;
  firstCompletionByExercise: Map<string, CourseExerciseAttempt>;
};

export const COUNTING_RESULTS = new Set<CourseExerciseResult>([
  "independent",
  "helped",
  "incorrect",
  "class",
]);

export function countsAsCompleted(result: CourseExerciseResult) {
  return COUNTING_RESULTS.has(result);
}

function isoDate(value: string) {
  return value.slice(0, 10);
}

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

function isoWeekday(iso: string) {
  const day = utcDate(iso).getUTCDay();
  return day === 0 ? 7 : day;
}

export function maa06aProgress(
  exercises: CourseExercise[],
  attempts: CourseExerciseAttempt[],
  targetCount = 130,
): Maa06aProgress {
  const eligible = new Map(
    exercises.filter((exercise) => exercise.counts_toward_goal).map((exercise) => [exercise.id, exercise]),
  );
  const sorted = [...attempts].sort((a, b) => a.attempted_at.localeCompare(b.attempted_at));
  const firstCompletionByExercise = new Map<string, CourseExerciseAttempt>();

  for (const attempt of sorted) {
    if (!eligible.has(attempt.exercise_id) || !countsAsCompleted(attempt.result)) continue;
    if (!firstCompletionByExercise.has(attempt.exercise_id)) {
      firstCompletionByExercise.set(attempt.exercise_id, attempt);
    }
  }

  const completedExerciseIds = new Set(firstCompletionByExercise.keys());
  const uniqueCompleted = completedExerciseIds.size;
  const bySource = {
    textbook: 0,
    textbook_review: 0,
    review_worksheet: 0,
  };
  let recommendedCompleted = 0;
  const recommendedTotal = exercises.filter(
    (exercise) => exercise.counts_toward_goal && exercise.teacher_recommended,
  ).length;
  const byResult = { independent: 0, helped: 0, incorrect: 0, class: 0 };

  for (const exerciseId of completedExerciseIds) {
    const exercise = eligible.get(exerciseId);
    const attempt = firstCompletionByExercise.get(exerciseId);
    if (!exercise || !attempt) continue;
    bySource[exercise.source] += 1;
    if (exercise.teacher_recommended) recommendedCompleted += 1;
    if (attempt.result in byResult) {
      byResult[attempt.result as keyof typeof byResult] += 1;
    }
  }

  return {
    uniqueCompleted,
    goalCompleted: Math.min(targetCount, uniqueCompleted),
    extraCompleted: Math.max(0, uniqueCompleted - targetCount),
    remaining: Math.max(0, targetCount - uniqueCompleted),
    recommendedCompleted,
    recommendedTotal,
    bySource,
    byResult,
    completedExerciseIds,
    firstCompletionByExercise,
  };
}

export function studyDatesBetween(
  start: string,
  end: string,
  studyWeekdays: number[],
  busyDates: string[] = [],
) {
  if (end < start) return [];
  const weekdays = new Set(studyWeekdays.length ? studyWeekdays : [1, 2, 3, 4, 5, 6, 7]);
  const busy = new Set(busyDates);
  const dates: string[] = [];
  for (let cursor = start; cursor <= end; cursor = addDays(cursor, 1)) {
    if (weekdays.has(isoWeekday(cursor)) && !busy.has(cursor)) dates.push(cursor);
  }
  return dates;
}

export function effectiveGoalDate(goal: Pick<CourseExerciseGoal, "deadline" | "buffer_days">) {
  return addDays(goal.deadline, -Math.max(0, goal.buffer_days || 0));
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
  let remainingDates = studyDatesBetween(firstRelevant, targetFinish, studyWeekdays, busyDates);

  // If today is not a study day, calculate the next real session rather than
  // pretending the student can complete 0.37 of an exercise on a rest day.
  if (!remainingDates.length && today <= hardFinish) {
    remainingDates = studyDatesBetween(firstRelevant, hardFinish, studyWeekdays, busyDates);
  }

  const remaining = Math.max(0, goal.target_count - completed);
  const sessions = Math.max(1, remainingDates.length);
  const perStudyDay = remaining === 0 ? 0 : Math.ceil(remaining / sessions);
  const nextStudyDate = remainingDates[0] ?? null;

  const planDates = studyDatesBetween(startDate, plannedFinish, studyWeekdays, busyDates);
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
    busyDates: input.busyDates,
  });
  if (!pace.remaining) return { exercises: [] as CourseExercise[], pace, scheduledDate: pace.nextStudyDate };

  const scheduledDate = pace.nextStudyDate ?? input.today;
  const wanted = Math.max(1, Math.min(10, (input.count ?? pace.perStudyDay) || 1));
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

  // During the last two weeks, review must actually become mixed practice, not
  // merely a lower-priority label beneath a long tail of chapter exercises.
  // Reserve part of the block for K/A/B or the review worksheet while leaving
  // room for unfinished teacher-recommended chapter work.
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
  const planStudyDates = studyDatesBetween(input.startDate, plannedFinish, input.studyWeekdays, busyDates);
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
      firstCompletion.set(attempt.exercise_id, isoDate(attempt.attempted_at));
    }
  }

  const points: Array<{ date: string; planned: number; actual: number }> = [];
  for (let cursor = input.startDate; cursor <= through; cursor = addDays(cursor, 1)) {
    const plannedElapsed = planStudyDates.filter((date) => date <= cursor).length;
    const planned = planStudyDates.length
      ? Math.min(input.goal.target_count, Math.round((plannedElapsed / planStudyDates.length) * input.goal.target_count))
      : 0;
    const actual = Math.min(
      input.goal.target_count,
      [...firstCompletion.values()].filter((date) => date <= cursor).length,
    );
    points.push({ date: cursor, planned, actual });
  }
  return points;
}

export function exerciseDisplayLabel(exercise: Pick<CourseExercise, "code" | "source">) {
  if (exercise.source === "review_worksheet") return `Moniste ${exercise.code}`;
  return exercise.code;
}

export function exerciseSourceLabel(exercise: Pick<CourseExercise, "source" | "source_group">) {
  if (exercise.source === "textbook") return "Kirja";
  if (exercise.source === "review_worksheet") return "Kertausmoniste";
  return `Kirjan kertaus ${exercise.source_group}`;
}
