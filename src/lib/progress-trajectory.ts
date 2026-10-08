import type { Course, PlanItem, Session } from "./domain";
import type { PlanItemEvent, PlanItemSnapshot } from "./progress-types";
import { addDays, diffDays, shortDate } from "./fi.ts";

export type ProgressRevision = {
  id: string;
  eventType: PlanItemEvent["event_type"];
  changes: string[];
  occurredAt: string;
  oldSnapshot: PlanItemSnapshot | null;
  newSnapshot: PlanItemSnapshot | null;
};

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
  plannedMinutesCumulative: number;
  completedMinutesCumulative: number;
  studiedMinutesCumulative: number;
  totalPlannedMinutes: number;
  plannedTitles: string[];
  completedTitles: string[];
  isToday: boolean;
  isCourseStart: boolean;
  isExam: boolean;
  revised: boolean;
  revisions: ProgressRevision[];
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

type RuntimePlanItem = PlanItem & { completed_at?: string | null };
type SnapshotState = PlanItemSnapshot & { id: string; course_id: string; date: string };
type TrajectoryRow = { id: string; item: SnapshotState };

const clamp = (value: number, min = 0, max = 100) => Math.min(max, Math.max(min, value));
const isoDay = (value: string | null | undefined) => value?.slice(0, 10) ?? null;
const isWorkKind = (kind: string | null | undefined) => kind !== "exam";
const stateMinutes = (item: PlanItemSnapshot) => Math.max(1, Number(item.target_minutes || 0));

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

function currentSnapshot(item: RuntimePlanItem): SnapshotState {
  return {
    id: item.id,
    course_id: item.course_id,
    topic_id: item.topic_id,
    date: item.date,
    start_time: item.start_time,
    phase: item.phase,
    kind: item.kind,
    title: item.title,
    min_minutes: item.min_minutes,
    target_minutes: item.target_minutes,
    extra_minutes: item.extra_minutes,
    status: item.status,
    moved_from: item.moved_from,
    session_id: item.session_id,
    completed_at: item.completed_at ?? null,
  };
}

function validSnapshot(snapshot: PlanItemSnapshot | null | undefined, id: string, courseId: string): SnapshotState | null {
  if (!snapshot?.date) return null;
  return {
    ...snapshot,
    id: String(snapshot.id ?? id),
    course_id: String(snapshot.course_id ?? courseId),
    date: String(snapshot.date),
  };
}

function eventsByItem(events: PlanItemEvent[], courseId: string) {
  const map = new Map<string, PlanItemEvent[]>();
  for (const event of events.filter(row => row.course_id === courseId && row.plan_item_id)) {
    const id = event.plan_item_id!;
    map.set(id, [...(map.get(id) ?? []), event]);
  }
  for (const rows of map.values()) rows.sort((a, b) => a.occurred_at.localeCompare(b.occurred_at));
  return map;
}

function stateAtDate(
  itemId: string,
  date: string,
  current: RuntimePlanItem | undefined,
  history: PlanItemEvent[] | undefined,
  courseId: string,
): SnapshotState | null {
  if (history?.length) {
    let state: SnapshotState | null = null;
    for (const event of history) {
      if (event.event_date > date) break;
      if (event.event_type === "deleted" || !event.new_snapshot) {
        state = null;
      } else {
        state = validSnapshot(event.new_snapshot, itemId, courseId);
      }
    }
    return state;
  }

  if (!current) return null;

  // Legacy rows created before immutable plan history cannot use created_at as an
  // effective-plan timestamp: imports and hydration often wrote that timestamp later.
  // New rows have a real `created` event, so this fallback is intentionally legacy-only.
  const snapshot = currentSnapshot(current);
  if (current.moved_from && current.moved_from !== current.date && date < current.date) {
    return { ...snapshot, date: current.moved_from, moved_from: null };
  }
  return snapshot;
}

function sessionCompletionDate(item: PlanItemSnapshot, itemId: string, sessions: Session[], now: string) {
  const explicit = isoDay(item.completed_at);
  if (explicit) return explicit;

  const linked = sessions
    .filter(session => session.course_id === item.course_id)
    .filter(session => session.plan_item_id === itemId || (item.session_id != null && session.id === item.session_id))
    .sort((a, b) => a.date.localeCompare(b.date))[0];
  if (linked) return linked.date;
  if (item.status !== "completed") return null;
  return item.date && item.date <= now ? item.date : now;
}

function effectiveCompletionDate(
  row: TrajectoryRow,
  sessions: Session[],
  now: string,
  history: PlanItemEvent[] | undefined,
) {
  const completedOn = sessionCompletionDate(row.item, row.id, sessions, now);
  if (!completedOn) return null;

  // Immutable history is authoritative after migration. If a task was reopened,
  // the historical snapshot stops counting it from that day forward even though an
  // older linked session still exists. Legacy rows have no such event trail, so a
  // linked persisted session is accepted as completion evidence when status sync lagged.
  if (row.item.status === "completed") return completedOn;
  if (!history?.length) return completedOn;
  return null;
}

function signedStudyDayDistance(points: Array<{ plannedMinutesToday: number }>, equivalentIndex: number, actualIndex: number) {
  if (equivalentIndex === actualIndex) return 0;
  if (equivalentIndex < actualIndex) {
    let count = 0;
    for (let index = Math.max(0, equivalentIndex + 1); index <= actualIndex; index += 1) {
      if ((points[index]?.plannedMinutesToday ?? 0) > 0) count += 1;
    }
    return -count;
  }

  let count = 0;
  for (let index = actualIndex + 1; index <= equivalentIndex; index += 1) {
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

function currentStateMap(course: Course, plan: PlanItem[], histories: Map<string, PlanItemEvent[]>) {
  const currentItems = new Map(plan.filter(item => item.course_id === course.id).map(item => [item.id, item as RuntimePlanItem]));
  const ids = new Set([...currentItems.keys(), ...histories.keys()]);
  const state = new Map<string, SnapshotState>();
  for (const id of ids) {
    const history = histories.get(id);
    const latest = history?.at(-1);
    const fromHistory = latest && latest.event_type !== "deleted"
      ? validSnapshot(latest.new_snapshot, id, course.id)
      : null;
    const current = currentItems.get(id);
    const value = fromHistory ?? (latest?.event_type === "deleted" ? null : current ? currentSnapshot(current) : null);
    if (value) state.set(id, value);
  }
  return { currentItems, ids, state };
}

export function courseTrajectoryBounds(course: Course, plan: PlanItem[], events: PlanItemEvent[] = []) {
  const coursePlan = plan.filter(item => item.course_id === course.id);
  const workDates = coursePlan.filter(item => isWorkKind(item.kind)).map(item => item.date).sort();
  const eventDates = events
    .filter(event => event.course_id === course.id)
    .flatMap(event => [event.old_snapshot?.date, event.new_snapshot?.date])
    .filter((value): value is string => Boolean(value))
    .sort();
  const examDates = coursePlan.filter(item => item.kind === "exam").map(item => item.date).sort();
  const startDate = course.start_date ?? workDates[0] ?? eventDates[0] ?? course.exam_date ?? examDates[0] ?? null;
  const endDate = course.exam_date ?? examDates[0] ?? workDates.at(-1) ?? eventDates.at(-1) ?? startDate;
  return { startDate, endDate };
}

export function pickTrajectoryCourse(courses: Course[], plan: PlanItem[], now: string, events: PlanItemEvent[] = []) {
  const candidates = courses
    .filter(course => !course.archived)
    .map(course => ({ course, ...courseTrajectoryBounds(course, plan, events) }))
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
  events?: PlanItemEvent[];
  now: string;
}): ProgressTrajectorySummary | null {
  const { course, sessions, now } = input;
  const events = input.events ?? [];
  const coursePlan = input.plan.filter(item => item.course_id === course.id);
  const histories = eventsByItem(events, course.id);
  const { currentItems, ids, state: latestState } = currentStateMap(course, coursePlan, histories);
  const { startDate, endDate } = courseTrajectoryBounds(course, coursePlan, events);
  if (!startDate || !endDate || endDate < startDate) return null;
  if (!ids.size) return null;

  const revisionsByDate = new Map<string, ProgressRevision[]>();
  for (const event of events.filter(row => row.course_id === course.id && row.event_type !== "created")) {
    const revision: ProgressRevision = {
      id: event.id,
      eventType: event.event_type,
      changes: event.changes ?? [],
      occurredAt: event.occurred_at,
      oldSnapshot: event.old_snapshot,
      newSnapshot: event.new_snapshot,
    };
    revisionsByDate.set(event.event_date, [...(revisionsByDate.get(event.event_date) ?? []), revision]);
  }

  // Backwards compatibility for pre-history rows. Modern moves are represented by
  // immutable events above; this marker only keeps legacy moved_from rows visible.
  for (const item of coursePlan as RuntimePlanItem[]) {
    if (!item.moved_from || item.moved_from === item.date) continue;
    if (histories.get(item.id)?.some(event => event.event_type === "moved")) continue;
    const newSnapshot = currentSnapshot(item);
    const oldSnapshot: PlanItemSnapshot = { ...newSnapshot, date: item.moved_from, moved_from: null };
    const revision: ProgressRevision = {
      id: `legacy-moved-${item.id}-${item.date}`,
      eventType: "moved",
      changes: ["date"],
      occurredAt: item.updated_at ?? `${item.date}T00:00:00Z`,
      oldSnapshot,
      newSnapshot,
    };
    revisionsByDate.set(item.date, [...(revisionsByDate.get(item.date) ?? []), revision]);
  }

  const studyMinutesByDate = new Map<string, number>();
  for (const session of sessions.filter(session => session.course_id === course.id)) {
    studyMinutesByDate.set(session.date, (studyMinutesByDate.get(session.date) ?? 0) + session.minutes);
  }

  let cumulativeStudied = 0;
  const raw = dateRange(startDate, endDate).map(date => {
    const states: TrajectoryRow[] = [];
    for (const id of ids) {
      const item = stateAtDate(id, date, currentItems.get(id), histories.get(id), course.id);
      if (item && isWorkKind(item.kind) && item.status !== "skipped") states.push({ id, item });
    }

    const totalPlannedMinutes = states.reduce((sum, row) => sum + stateMinutes(row.item), 0);
    const due = states.filter(row => row.item.date <= date);
    const plannedMinutesCumulative = due.reduce((sum, row) => sum + stateMinutes(row.item), 0);
    const completedRows = states.filter(row => {
      const completedOn = effectiveCompletionDate(row, sessions, now, histories.get(row.id));
      return completedOn != null && completedOn <= date;
    });
    const completedMinutesCumulative = completedRows.reduce((sum, row) => sum + stateMinutes(row.item), 0);
    const plannedToday = states.filter(row => row.item.date === date);
    const completedToday = completedRows.filter(row =>
      effectiveCompletionDate(row, sessions, now, histories.get(row.id)) === date,
    );
    const studiedMinutesToday = studyMinutesByDate.get(date) ?? 0;
    cumulativeStudied += studiedMinutesToday;

    const planned = totalPlannedMinutes > 0 ? clamp((plannedMinutesCumulative / totalPlannedMinutes) * 100) : 0;
    const actual = date <= now && totalPlannedMinutes > 0
      ? clamp((completedMinutesCumulative / totalPlannedMinutes) * 100)
      : null;
    const normalStudyDay = median(states.map(row => row.item.date).filter((value, index, values) => values.indexOf(value) === index).map(day =>
      states.filter(row => row.item.date === day).reduce((sum, row) => sum + stateMinutes(row.item), 0),
    ).filter(value => value > 0));
    const corridorWidth = totalPlannedMinutes > 0 ? clamp((normalStudyDay / totalPlannedMinutes) * 100, 2, 15) : 5;
    const revisions = revisionsByDate.get(date) ?? [];

    return {
      date,
      label: shortDate(date),
      planned,
      actual,
      forecast: null as number | null,
      corridorLower: clamp(planned - corridorWidth),
      corridorUpper: clamp(planned + corridorWidth),
      deviationStudyDays: null as number | null,
      plannedMinutesToday: plannedToday.reduce((sum, row) => sum + stateMinutes(row.item), 0),
      completedMinutesToday: completedToday.reduce((sum, row) => sum + stateMinutes(row.item), 0),
      studiedMinutesToday,
      plannedMinutesCumulative,
      completedMinutesCumulative,
      studiedMinutesCumulative: cumulativeStudied,
      totalPlannedMinutes,
      plannedTitles: plannedToday.map(row => row.item.title || "Opiskelu"),
      completedTitles: completedToday.map(row => row.item.title || "Opiskelu"),
      isToday: date === now,
      isCourseStart: date === startDate,
      isExam: date === endDate,
      revised: revisions.length > 0,
      revisions,
    } satisfies ProgressTrajectoryPoint;
  });

  const boundedToday = now < startDate ? startDate : now > endDate ? endDate : now;
  const todayIndex = Math.max(0, Math.min(raw.length - 1, diffDays(boundedToday, startDate)));
  for (let index = 0; index < raw.length; index += 1) {
    const actual = raw[index]!.actual;
    if (actual == null) continue;
    const equivalent = chooseEquivalentPlanIndex(raw, actual);
    raw[index]!.deviationStudyDays = signedStudyDayDistance(raw, equivalent, index);
  }

  const current = raw[todayIndex] ?? raw.at(-1)!;
  const currentRows: TrajectoryRow[] = [...latestState.entries()]
    .map(([id, item]) => ({ id, item }))
    .filter(row => isWorkKind(row.item.kind) && row.item.status !== "skipped");
  const plannedMinutesNow = currentRows
    .filter(row => row.item.date <= now)
    .reduce((sum, row) => sum + stateMinutes(row.item), 0);
  const completedNowRows = currentRows.filter(row => {
    const completedOn = effectiveCompletionDate(row, sessions, now, histories.get(row.id));
    return completedOn != null && completedOn <= now;
  });
  const completedMinutesNow = completedNowRows.reduce((sum, row) => sum + stateMinutes(row.item), 0);
  const adherencePercent = plannedMinutesNow > 0 ? Math.round((completedMinutesNow / plannedMinutesNow) * 100) : null;
  const behindTasks = currentRows.filter(row => {
    if (row.item.date > now) return false;
    const completedOn = effectiveCompletionDate(row, sessions, now, histories.get(row.id));
    return completedOn == null || completedOn > now;
  }).length;
  const aheadTasks = currentRows.filter(row => {
    if (row.item.date <= now) return false;
    const completedOn = effectiveCompletionDate(row, sessions, now, histories.get(row.id));
    return completedOn != null && completedOn <= now;
  }).length;

  const completionDates = completedNowRows
    .map(row => effectiveCompletionDate(row, sessions, now, histories.get(row.id)))
    .filter((date): date is string => Boolean(date));
  const uniqueCompletionDays = [...new Set(completionDates)].sort();
  const hasForecast = uniqueCompletionDays.length >= 3 && now >= startDate && now < endDate;
  let forecastFinishDate: string | null = null;
  let projectedAtEnd: number | null = null;

  if (hasForecast) {
    const windowStart = addDays(now, -13) > startDate ? addDays(now, -13) : startDate;
    const elapsedDays = Math.max(1, diffDays(now, windowStart) + 1);
    const completedInWindow = currentRows
      .filter(row => {
        const completedOn = effectiveCompletionDate(row, sessions, now, histories.get(row.id));
        return completedOn != null && completedOn >= windowStart && completedOn <= now;
      })
      .reduce((sum, row) => sum + stateMinutes(row.item), 0);
    const pacePerDay = completedInWindow / elapsedDays;
    const currentTotal = currentRows.reduce((sum, row) => sum + stateMinutes(row.item), 0);

    for (const point of raw) {
      if (point.date <= now) continue;
      const daysForward = diffDays(point.date, now);
      const projectedMinutes = Math.min(currentTotal, completedMinutesNow + pacePerDay * daysForward);
      point.forecast = currentTotal > 0 ? clamp((projectedMinutes / currentTotal) * 100) : null;
      if (!forecastFinishDate && projectedMinutes >= currentTotal) forecastFinishDate = point.date;
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
