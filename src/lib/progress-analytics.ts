import type { Course, PlanItem, Session } from "./domain";
import { addDays, diffDays, parseISO, startOfWeek } from "./fi.ts";

export type WeeklyStudyTruthPoint = {
  week: string;
  start: string;
  end: string;
  planned: number;
  actual: number;
  isCurrent: boolean;
};

function workItem(item: PlanItem) {
  return item.kind !== "exam" && item.status !== "skipped" && Number(item.target_minutes || 0) > 0;
}

function courseIsRelevant(course: Course, now: string) {
  if (course.archived) return false;
  if (course.start_date && course.start_date > now) return false;
  return true;
}

function courseContainsDate(course: Course | undefined, date: string) {
  if (!course) return false;
  if (course.start_date && date < course.start_date) return false;
  if (course.exam_date && date > course.exam_date) return false;
  return true;
}

export function progressTimelineStart(input: {
  courses: Course[];
  plan: PlanItem[];
  sessions: Session[];
  now: string;
}) {
  const relevant = input.courses.filter(course => courseIsRelevant(course, input.now));
  const courseById = new Map(relevant.map(course => [course.id, course]));
  const dates = [
    ...relevant.map(course => course.start_date).filter((date): date is string => Boolean(date)),
    ...input.plan
      .filter(item => workItem(item) && item.date <= input.now && courseContainsDate(courseById.get(item.course_id), item.date))
      .map(item => item.date),
    ...input.sessions
      .filter(session => session.date <= input.now && courseContainsDate(courseById.get(session.course_id), session.date))
      .map(session => session.date),
  ].sort();
  return dates[0] ?? input.now;
}

/**
 * Weekly workload truth. `planned` deliberately means the CURRENT planner load
 * assigned to that week; it is not presented as immutable historical adherence.
 * The daily trajectory owns historical plan-vs-actual truth through plan events.
 */
export function buildWeeklyStudyTruth(input: {
  courses: Course[];
  plan: PlanItem[];
  sessions: Session[];
  now: string;
  maxWeeks?: number;
}): WeeklyStudyTruthPoint[] {
  const maxWeeks = Math.max(1, input.maxWeeks ?? 8);
  const relevant = input.courses.filter(course => courseIsRelevant(course, input.now));
  const courseById = new Map(relevant.map(course => [course.id, course]));
  if (!courseById.size) return [];

  const firstDate = progressTimelineStart(input);
  const firstWeek = startOfWeek(firstDate);
  const currentWeek = startOfWeek(input.now);
  const totalWeeks = Math.max(1, Math.floor(diffDays(currentWeek, firstWeek) / 7) + 1);
  const count = Math.min(maxWeeks, totalWeeks);
  const firstShownWeek = addDays(currentWeek, -(count - 1) * 7);

  return Array.from({ length: count }, (_, index) => {
    const start = addDays(firstShownWeek, index * 7);
    const end = addDays(start, 6);
    const planned = input.plan
      .filter(item => workItem(item))
      .filter(item => item.date >= start && item.date <= end)
      .filter(item => courseContainsDate(courseById.get(item.course_id), item.date))
      .reduce((sum, item) => sum + Math.max(0, Number(item.target_minutes || 0)), 0);
    const actual = input.sessions
      .filter(session => courseContainsDate(courseById.get(session.course_id), session.date))
      .filter(session => session.date >= start && session.date <= end && session.date <= input.now)
      .reduce((sum, session) => sum + Math.max(0, Number(session.minutes || 0)), 0);
    return {
      week: `${parseISO(start).getDate()}.${parseISO(start).getMonth() + 1}.`,
      start,
      end,
      planned,
      actual,
      isCurrent: start === currentWeek,
    };
  });
}

export function currentWeekPlanMinutes(input: {
  courses: Course[];
  plan: PlanItem[];
  sessions: Session[];
  now: string;
}) {
  return buildWeeklyStudyTruth({ ...input, maxWeeks: 1 })[0]?.planned ?? 0;
}

export function currentWeekActualMinutes(input: {
  courses: Course[];
  plan: PlanItem[];
  sessions: Session[];
  now: string;
}) {
  return buildWeeklyStudyTruth({ ...input, maxWeeks: 1 })[0]?.actual ?? 0;
}
