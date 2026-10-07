import type { Course, PlanItem, Session } from "./domain";
import { addDays, diffDays, shortDate } from "./fi.ts";

export type ProgressTrajectoryPoint = {
  date: string;
  label: string;
  planned: number;
  actual: number | null;
  forecast: number | null;
  corridorLower: number;
  corridorUpper: number;
  deviationStudyDays: number | null;
  plannedMinutesToday: number;
  completedMinutesToday: number;
  studiedMinutesToday: number;
  plannedTitles: string[];
  completedTitles: string[];
  isToday: boolean;
  isCourseStart: boolean;
  isExam: boolean;
  revised: boolean;
};

export type ProgressTrajectorySummary = {
  courseId: string;
  startDate: string;
  endDate: string;
  points: ProgressTrajectoryPoint[];
  adherencePercent: number | null;
  deviationStudyDays: number | null;
  behindTasks: number;
  aheadTasks: number;
  plannedMinutesNow: number;
  completedMinutesNow: number;
  forecastFinishDate: string | null;
  projectedAtEnd: number | null;
  hasForecast: boolean;
};

const clamp = (value: number, min = 0, max = 100) => Math.min(max, Math.max(min, value));
const isoDay = (value: string | null | undefined) => value?.slice(0, 10) ?? null;
const workMinutes = (item: PlanItem) => Math.max(1, Number(item.target_minutes || 0));
const isWorkItem = (item: PlanItem) => item.kind !== "exam";

function dateRange(start: string, end: string) {
  const days = Math.max(0, diffDays(end, start));
  return Array.from({ length: days + 1 }, (_, index) => addDays(start, index));
}

function median(values: number[]) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle]! : (sorted[middle - 1]! + sorted[middle]!) / 2;
}

function completionDate(item: PlanItem, sessions: Session[], now: string) {
  const linked = sessions
    .filter(session => session.course_id === item.course_id)
    .filter(session => session.plan_item_id === item.id || (item.session_id != null && session.id === item.session_id))
    .sort((a, b) => a.date.localeCompare(b.date))[0];
  if (linked) return linked.date;
  if (item.status !== "completed") return null;

  const updated = isoDay(item.updated_at);
  if (updated && updated <= now) return updated;
  return item.date <= now ? item.date : now;
}

function signedStudyDayDistance(points: Array<{ plannedMinutesToday: number }>, fromIndex: number, toIndex: number) {
  if (fromIndex === toIndex) return 0;
  if (fromIndex < toIndex) {
    let count = 0;
    for (let index = Math.max(0, fromIndex + 1); index <= toIndex; index += 1) {
      if ((points[index]?.plannedMinutesToday ?? 0) > 0) count += 1;
    }
    return -count;
  }

  let count = 0;
  for (let index = toIndex + 1; index <= fromIndex; index += 1) {
    if ((points[index]?.plannedMinutesToday ?? 0) > 0) count += 1;
  }
  return count;
}

function chooseEquivalentPlanIndex(points: Array<{ planned: number }>, actual: number) {
  let equivalent = -1;
  for (let index = 0; index < points.length; index += 1) {
    if (points[index]!.planned <= actual + 0.0001) equivalent = index;
    else break;
  }
  return equivalent;
}

export function courseTrajectoryBounds(course: Course, plan: PlanItem[]) {
  const coursePlan = plan.filter(item => item.course_id === course.id);
  const workDates = coursePlan.filter(isWorkItem).map(item => item.date).sort();
  const examDates = coursePlan.filter(item => item.kind === "exam").map(item => item.date).sort();
  const startDate = course.start_date ?? workDates[0] ?? course.exam_date ?? examDates[0] ?? null;
  const endDate = course.exam_date ?? examDates[0] ?? workDates.at(-1) ?? startDate;
  return { startDate, endDate };
}

export function pickTrajectoryCourse(courses: Course[], plan: PlanItem[], now: string) {
  const candidates = courses
    .filter(course => !course.archived)
    .map(course => ({ course, ...courseTrajectoryBounds(course, plan) }))
    .filter((row): row is { course: Course; startDate: string; endDate: string } => Boolean(row.startDate && row.endDate));

  if (!candidates.length) return null;

  return [...candidates].sort((a, b) => {
    const aActive = a.startDate <= now && now <= a.endDate;
    const bActive = b.startDate <= now && now <= b.endDate;
    if (aActive !== bActive) return aActive ? -1 : 1;

    const aFuture = now < a.startDate;
    const bFuture = now < b.startDate;
    if (aFuture !== bFuture) return aFuture ? -1 : 1;

    if (aActive && bActive) return a.endDate.localeCompare(b.endDate);
    if (aFuture && bFuture) return a.startDate.localeCompare(b.startDate);
    return b.endDate.localeCompare(a.endDate);
  })[0]!.course;
}

export function buildProgressTrajectory(input: {
  course: Course;
  plan: PlanItem[];
  sessions: Session[];
  now: string;
}): ProgressTrajectorySummary | null {
  const { course, sessions, now } = input;
  const coursePlan = input.plan.filter(item => item.course_id === course.id);
  const workItems = coursePlan.filter(isWorkItem);
  const { startDate, endDate } = courseTrajectoryBounds(course, coursePlan);
  if (!startDate || !endDate || endDate < startDate || !workItems.length) return null;

  const totalMinutes = workItems.reduce((sum, item) => sum + workMinutes(item), 0);
  if (totalMinutes <= 0) return null;

  const sessionDates = new Map<string, string>();
  for (const item of workItems) {
    const completedOn = completionDate(item, sessions, now);
    if (completedOn) sessionDates.set(item.id, completedOn);
  }

  const dailyPlannedMinutes = new Map<string, number>();
  const dailyCompletedMinutes = new Map<string, number>();
  const plannedTitles = new Map<string, string[]>();
  const completedTitles = new Map<string, string[]>();

  for (const item of workItems) {
    const minutes = workMinutes(item);
    dailyPlannedMinutes.set(item.date, (dailyPlannedMinutes.get(item.date) ?? 0) + minutes);
    plannedTitles.set(item.date, [...(plannedTitles.get(item.date) ?? []), item.title || "Opiskelu"]);

    const completedOn = sessionDates.get(item.id);
    if (completedOn) {
      dailyCompletedMinutes.set(completedOn, (dailyCompletedMinutes.get(completedOn) ?? 0) + minutes);
      completedTitles.set(completedOn, [...(completedTitles.get(completedOn) ?? []), item.title || "Opiskelu"]);
    }
  }

  const studyMinutesByDate = new Map<string, number>();
  for (const session of sessions.filter(session => session.course_id === course.id)) {
    studyMinutesByDate.set(session.date, (studyMinutesByDate.get(session.date) ?? 0) + session.minutes);
  }

  const normalStudyDayMinutes = median([...dailyPlannedMinutes.values()].filter(value => value > 0));
  const corridorWidth = clamp((normalStudyDayMinutes / totalMinutes) * 100, 2, 15);
  const revisionDates = new Set<string>();
  for (const item of workItems) {
    if (item.moved_from) {
      revisionDates.add(item.date);
      revisionDates.add(item.moved_from);
    }
  }

  let cumulativePlanned = 0;
  let cumulativeCompleted = 0;
  const raw = dateRange(startDate, endDate).map(date => {
    cumulativePlanned += dailyPlannedMinutes.get(date) ?? 0;
    cumulativeCompleted += dailyCompletedMinutes.get(date) ?? 0;
    const planned = clamp((cumulativePlanned / totalMinutes) * 100);
    const actual = date <= now ? clamp((cumulativeCompleted / totalMinutes) * 100) : null;
    return {
      date,
      label: shortDate(date),
      planned,
      actual,
      forecast: null as number | null,
      corridorLower: clamp(planned - corridorWidth),
      corridorUpper: clamp(planned + corridorWidth),
      deviationStudyDays: null as number | null,
      plannedMinutesToday: dailyPlannedMinutes.get(date) ?? 0,
      completedMinutesToday: dailyCompletedMinutes.get(date) ?? 0,
      studiedMinutesToday: studyMinutesByDate.get(date) ?? 0,
      plannedTitles: plannedTitles.get(date) ?? [],
      completedTitles: completedTitles.get(date) ?? [],
      isToday: date === now,
      isCourseStart: date === startDate,
      isExam: date === endDate,
      revised: revisionDates.has(date),
    } satisfies ProgressTrajectoryPoint;
  });

  const todayIndex = Math.max(0, Math.min(raw.length - 1, diffDays(now, startDate)));
  for (let index = 0; index < raw.length; index += 1) {
    const actual = raw[index]!.actual;
    if (actual == null) continue;
    const equivalent = chooseEquivalentPlanIndex(raw, actual);
    raw[index]!.deviationStudyDays = signedStudyDayDistance(raw, equivalent, index);
  }

  const current = raw[todayIndex] ?? raw.at(-1)!;
  const plannedMinutesNow = workItems
    .filter(item => item.date <= now)
    .reduce((sum, item) => sum + workMinutes(item), 0);
  const completedMinutesNow = workItems
    .filter(item => {
      const completedOn = sessionDates.get(item.id);
      return completedOn != null && completedOn <= now;
    })
    .reduce((sum, item) => sum + workMinutes(item), 0);
  const adherencePercent = plannedMinutesNow > 0
    ? Math.round((completedMinutesNow / plannedMinutesNow) * 100)
    : null;

  const behindTasks = workItems.filter(item => item.date <= now && (sessionDates.get(item.id) ?? "9999-99-99") > now).length;
  const aheadTasks = workItems.filter(item => item.date > now && (sessionDates.get(item.id) ?? "9999-99-99") <= now).length;

  const completionDays = [...new Set([...sessionDates.values()].filter(date => date <= now))].sort();
  const hasForecast = completionDays.length >= 3 && now >= startDate && now < endDate;
  let forecastFinishDate: string | null = null;
  let projectedAtEnd: number | null = null;

  if (hasForecast) {
    const windowStart = addDays(now, -13) > startDate ? addDays(now, -13) : startDate;
    const elapsedDays = Math.max(1, diffDays(now, windowStart) + 1);
    const completedInWindow = workItems
      .filter(item => {
        const completedOn = sessionDates.get(item.id);
        return completedOn != null && completedOn >= windowStart && completedOn <= now;
      })
      .reduce((sum, item) => sum + workMinutes(item), 0);
    const pacePerDay = completedInWindow / elapsedDays;
    const actualNowMinutes = completedMinutesNow;

    for (const point of raw) {
      if (point.date <= now) continue;
      const daysForward = diffDays(point.date, now);
      const projectedMinutes = Math.min(totalMinutes, actualNowMinutes + pacePerDay * daysForward);
      point.forecast = clamp((projectedMinutes / totalMinutes) * 100);
      if (!forecastFinishDate && projectedMinutes >= totalMinutes) forecastFinishDate = point.date;
    }
    projectedAtEnd = raw.at(-1)?.forecast ?? current.actual ?? null;
  }

  return {
    courseId: course.id,
    startDate,
    endDate,
    points: raw,
    adherencePercent,
    deviationStudyDays: current.deviationStudyDays,
    behindTasks,
    aheadTasks,
    plannedMinutesNow,
    completedMinutesNow,
    forecastFinishDate,
    projectedAtEnd,
    hasForecast,
  };
}
