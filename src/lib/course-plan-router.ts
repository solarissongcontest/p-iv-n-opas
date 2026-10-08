import { generatePlan, type PlanDraft, type Topic } from "./domain.ts";
import {
  generateKe04Psa2026Plan,
  isKe04Psa2026Plan,
  type CoursePlanOptions,
} from "./ke04-school-plan.ts";
import {
  BI05_EXAMS,
  BI05_IIRIS5_TOPICS,
  BI05_PROVISIONAL_EXAM_CHAPTERS,
} from "./bi05-iiris5.ts";
import {
  effectiveGoalDate,
  exerciseDisplayLabel,
  recommendMaa06aExercises,
  studyDatesBetween,
  type CourseExercise,
  type CourseExerciseAttempt,
  type CourseExerciseGoal,
} from "./maa06a.ts";
import { addDays, today } from "./fi.ts";

export type RoutedCoursePlanOptions = CoursePlanOptions & {
  courseExercises?: CourseExercise[];
  courseExerciseAttempts?: CourseExerciseAttempt[];
  courseExerciseGoal?: CourseExerciseGoal | null;
};

export const AUTUMN_BREAK_2026 = {
  start: "2026-10-19",
  end: "2026-10-25",
} as const;

function courseCode(opts: Pick<RoutedCoursePlanOptions, "course">) {
  return opts.course.code.trim().toUpperCase();
}

export function isBi05TwoExamPlan(opts: Pick<RoutedCoursePlanOptions, "course">) {
  return courseCode(opts) === "BI05" && (!opts.course.start_date || opts.course.start_date === "2026-10-06");
}

export function isMaa06aGoalPlan(opts: Pick<RoutedCoursePlanOptions, "course">) {
  return courseCode(opts) === "MAA06A";
}

function topicChapter(topic: Pick<Topic, "name">) {
  const match = /^(\d{1,2})\./.exec(topic.name.trim());
  return match ? Number(match[1]) : null;
}

function isAutumnBreak(date: string) {
  return date >= AUTUMN_BREAK_2026.start && date <= AUTUMN_BREAK_2026.end;
}

function examDraft(courseId: string, date: string, title: string): PlanDraft {
  return {
    course_id: courseId,
    topic_id: null,
    date,
    phase: "exam",
    kind: "exam",
    title,
    min_minutes: 0,
    target_minutes: 0,
    extra_minutes: 0,
    start_time: null,
  };
}

function reviewDraft(courseId: string, date: string, title: string, minutes: number): PlanDraft {
  return {
    course_id: courseId,
    topic_id: null,
    date,
    phase: "review",
    kind: "review",
    title,
    min_minutes: Math.min(20, minutes),
    target_minutes: minutes,
    extra_minutes: 0,
    start_time: null,
  };
}

function distributeTopicsAcrossDates(topics: Topic[], dates: string[]) {
  if (!topics.length || !dates.length) return [] as Array<{ topic: Topic; date: string }>;
  return topics.map((topic, index) => ({
    topic,
    date: dates[Math.min(dates.length - 1, Math.floor((index * dates.length) / topics.length))]!,
  }));
}

function bi05TopicDraft(opts: RoutedCoursePlanOptions, topic: Topic, date: string): PlanDraft {
  const source = BI05_IIRIS5_TOPICS.find((row) => topic.name.startsWith(`${row.code} `));
  const alreadyKnown = Boolean(topic.school_covered || Number(topic.progress || 0) > 0 || topic.last_review);
  const holiday = isAutumnBreak(date);
  const requested = source?.estimatedMinutes ?? 30;
  // The BI05 planner deliberately uses compact first-pass blocks because two
  // subchapters often share a date and the student's other live courses must
  // still fit inside the daily capacity. Deeper practice comes through Practice.
  const target = Math.max(18, Math.min(24, Math.round(requested * 0.55)));
  return {
    course_id: opts.course.id,
    topic_id: topic.id,
    date,
    phase: alreadyKnown ? "review" : "content",
    kind: alreadyKnown ? "review" : "study",
    title: `${holiday ? "Syysloma · " : ""}${topic.name}${alreadyKnown ? " – vahvistus" : ""}`,
    min_minutes: Math.min(15, target),
    target_minutes: target,
    extra_minutes: 0,
    start_time: null,
  };
}

/**
 * BI05 has two confirmed exam dates but only provisional chapter splits.
 * We therefore pace toward the two exams without inventing school lesson dates.
 * Chapter 5 remains outside both exams and is never scheduled as exam prep.
 */
export function generateBi05TwoExamPlan(opts: RoutedCoursePlanOptions): PlanDraft[] {
  const startISO = opts.fromISO ?? today();
  const byChapter = new Map<number, Topic[]>();
  for (const topic of [...opts.topics].sort((a, b) => a.position - b.position)) {
    const chapter = topicChapter(topic);
    if (!chapter) continue;
    byChapter.set(chapter, [...(byChapter.get(chapter) ?? []), topic]);
  }

  const drafts: PlanDraft[] = [];
  const phases = [
    {
      exam: BI05_EXAMS[0],
      chapters: BI05_PROVISIONAL_EXAM_CHAPTERS["exam-1"],
      contentStart: startISO,
      contentEnd: "2026-10-25",
      reviewDate: "2026-10-27",
    },
    {
      exam: BI05_EXAMS[1],
      chapters: BI05_PROVISIONAL_EXAM_CHAPTERS["exam-2"],
      contentStart: startISO > "2026-10-30" ? startISO : "2026-10-30",
      contentEnd: "2026-11-17",
      reviewDate: "2026-11-19",
    },
  ] as const;

  for (const phase of phases) {
    if (startISO > phase.exam.date) continue;
    const topics = phase.chapters.flatMap((chapter) => byChapter.get(chapter) ?? []);
    const dates = studyDatesBetween(
      phase.contentStart,
      phase.contentEnd,
      opts.studyWeekdays,
      opts.capacity?.busyDates ?? [],
    );
    const assignments = distributeTopicsAcrossDates(topics, dates);
    for (const assignment of assignments) {
      drafts.push(bi05TopicDraft(opts, assignment.topic, assignment.date));
    }

    if (phase.reviewDate >= startISO && phase.reviewDate < phase.exam.date) {
      drafts.push(reviewDraft(
        opts.course.id,
        phase.reviewDate,
        `${phase.exam.name} – sekakertaus ja heikoimmat koealueen kohdat`,
        40,
      ));
    }
    drafts.push(examDraft(opts.course.id, phase.exam.date, phase.exam.name));
  }

  return drafts.sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title));
}

function maaSessionCounts(remaining: number, dates: string[]) {
  if (!dates.length || remaining <= 0) return new Map<string, number>();
  const counts = new Map(dates.map((date) => [date, Math.min(3, remaining)]));
  let assigned = [...counts.values()].reduce((sum, value) => sum + value, 0);

  // The school-free week is useful extra capacity, but not a reason to turn a
  // holiday into a seven-hour worksheet festival. Give its normal study days
  // one extra exercise before spreading the rest evenly.
  for (const date of dates.filter(isAutumnBreak)) {
    if (assigned >= remaining) break;
    counts.set(date, (counts.get(date) ?? 0) + 1);
    assigned += 1;
  }

  let cursor = 0;
  while (assigned < remaining && dates.length) {
    const date = dates[cursor % dates.length]!;
    const current = counts.get(date) ?? 0;
    if (current < 10) {
      counts.set(date, current + 1);
      assigned += 1;
    }
    cursor += 1;
  }

  // When only a few exercises remain, trim any initial over-allocation from
  // the end so the generated blocks sum exactly to the outstanding target.
  for (const date of [...dates].reverse()) {
    while (assigned > remaining && (counts.get(date) ?? 0) > 0) {
      counts.set(date, (counts.get(date) ?? 0) - 1);
      assigned -= 1;
    }
  }
  return counts;
}

function syntheticCompletion(
  exercise: CourseExercise,
  courseId: string,
  date: string,
  index: number,
): CourseExerciseAttempt {
  return {
    id: `planned-${date}-${index}-${exercise.id}`,
    course_id: courseId,
    exercise_id: exercise.id,
    result: "independent",
    note: "planner-simulation",
    attempted_at: `${date}T12:00:00.000Z`,
  };
}

/**
 * MAA06A's planner is the 130-exercise goal. Topic cards remain useful for
 * learning state, but they must not create a second competing study schedule.
 */
export function generateMaa06aGoalPlan(opts: RoutedCoursePlanOptions): PlanDraft[] {
  const exercises = opts.courseExercises ?? [];
  const goal = opts.courseExerciseGoal;
  if (!goal || !exercises.length) return [];

  const startISO = opts.fromISO ?? today();
  const plannedFinish = effectiveGoalDate(goal);
  const dates = studyDatesBetween(
    startISO,
    plannedFinish,
    opts.studyWeekdays,
    opts.capacity?.busyDates ?? [],
  );
  const realAttempts = [...(opts.courseExerciseAttempts ?? [])];
  const completedIds = new Set(
    realAttempts
      .filter((attempt) => ["independent", "helped", "incorrect", "class"].includes(attempt.result))
      .map((attempt) => attempt.exercise_id),
  );
  const remaining = Math.max(0, goal.target_count - completedIds.size);
  const counts = maaSessionCounts(remaining, dates);
  const simulatedAttempts = [...realAttempts];
  const drafts: PlanDraft[] = [];

  for (const date of dates) {
    const count = counts.get(date) ?? 0;
    if (count <= 0) continue;
    const recommendation = recommendMaa06aExercises({
      exercises,
      attempts: simulatedAttempts,
      goal,
      startDate: opts.course.start_date ?? "2026-10-06",
      today: date,
      studyWeekdays: opts.studyWeekdays,
      busyDates: opts.capacity?.busyDates ?? [],
      count,
    });
    const picked = recommendation.exercises.slice(0, count);
    if (!picked.length) continue;

    const labels = picked.map(exerciseDisplayLabel);
    const load = picked.reduce((sum, exercise) => sum + Math.max(0.7, Number(exercise.estimated_load || 1)), 0);
    const target = Math.max(25, Math.min(isAutumnBreak(date) ? 55 : 50, Math.round(load * 8)));
    const reviewHeavy = picked.filter((exercise) => exercise.source !== "textbook").length >= Math.ceil(picked.length / 2);
    const topicIds = [...new Set(picked.map((exercise) => exercise.topic_id).filter((id): id is string => Boolean(id)))];
    drafts.push({
      course_id: opts.course.id,
      topic_id: topicIds.length === 1 ? topicIds[0]! : null,
      date,
      phase: reviewHeavy ? "review" : "application",
      kind: reviewHeavy ? "review" : "study",
      title: `${isAutumnBreak(date) ? "Syysloma · " : ""}130-tavoite: ${picked.length} tehtävää · ${labels.join(", ")}`,
      min_minutes: Math.min(25, target),
      target_minutes: target,
      extra_minutes: 0,
      start_time: null,
    });

    picked.forEach((exercise, index) => {
      simulatedAttempts.push(syntheticCompletion(exercise, opts.course.id, date, index));
    });
  }

  const contingency = "2026-11-26";
  if (contingency >= startISO && contingency < (opts.course.exam_date ?? "9999-12-31")) {
    drafts.push(reviewDraft(
      opts.course.id,
      contingency,
      "MAA06A – kevyt koekertaus · 130-tavoitteen varapäivä vain jos jotain puuttuu",
      30,
    ));
  }
  const examDate = opts.course.exam_date ?? "2026-11-27";
  if (examDate >= startISO) drafts.push(examDraft(opts.course.id, examDate, "MAA06A koe"));
  return drafts.sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title));
}

export function generateCoursePlan(opts: RoutedCoursePlanOptions): PlanDraft[] {
  if (isKe04Psa2026Plan(opts)) return generateKe04Psa2026Plan(opts);
  if (isBi05TwoExamPlan(opts)) return generateBi05TwoExamPlan(opts);
  if (isMaa06aGoalPlan(opts) && opts.courseExerciseGoal && opts.courseExercises?.length) {
    return generateMaa06aGoalPlan(opts);
  }
  return generatePlan(opts);
}
