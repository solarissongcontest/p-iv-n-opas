import type { Database } from "@/integrations/supabase/types";
import { addDays, diffDays, parseISO, startOfWeek, toISO, today } from "./fi";

export type Course = Database["public"]["Tables"]["courses"]["Row"];
export type Topic = Database["public"]["Tables"]["topics"]["Row"];
export type Session = Database["public"]["Tables"]["study_sessions"]["Row"];
export type Exam = Database["public"]["Tables"]["exams"]["Row"];
export type PlanItem = Database["public"]["Tables"]["plan_items"]["Row"];
export type Mistake = Database["public"]["Tables"]["mistakes"]["Row"];
export type PracticeTest = Database["public"]["Tables"]["practice_tests"]["Row"];
export type NotificationSettings =
  Database["public"]["Tables"]["notification_settings"]["Row"];

export type PlanStatus = "planned" | "in_progress" | "completed" | "skipped" | "overdue";
export type PlanPhase = "content" | "application" | "practice" | "review" | "light" | "exam";

export const MASTERY_LABELS: Record<number, string> = {
  0: "Ei opiskeltu",
  1: "Tunnistan",
  2: "Ymmärrän mallin",
  3: "Osaan perustehtävän itsenäisesti",
  4: "Osaan koetasoisen tehtävän",
  5: "Osaan soveltaa ja selittää",
};

export const PHASE_LABELS: Record<PlanPhase, string> = {
  content: "Sisältö",
  application: "Soveltaminen",
  practice: "Harjoituskoe",
  review: "Kertaus",
  light: "Kevyt kertaus",
  exam: "Koe",
};

export const STATUS_LABELS: Record<PlanStatus, string> = {
  planned: "Suunniteltu",
  in_progress: "Kesken",
  completed: "Tehty",
  skipped: "Ohitettu",
  overdue: "Myöhässä",
};

/** ---------- mastery ---------- */

/**
 * Verified mastery grows only from real evidence. A self-rating can never
 * raise it on its own — it only caps how high evidence is trusted.
 */
export function verifiedLevel(t: Pick<
  Topic,
  "basic_successes" | "exam_successes" | "delayed_successes" | "progress" | "self_level"
>): number {
  let level = 0;
  if (t.progress >= 25) level = 1;
  if (t.progress >= 60 && t.basic_successes >= 1) level = 2;
  if (t.basic_successes >= 2) level = 3;
  if (t.exam_successes >= 1 && t.basic_successes >= 2) level = 4;
  if (t.exam_successes >= 2 && t.delayed_successes >= 1) level = 5;
  return level;
}

export function weightedCoverage(topics: Topic[]): number {
  const w = topics.reduce((s, t) => s + Number(t.weight || 0), 0) || topics.length || 1;
  const sum = topics.reduce((s, t) => s + Number(t.weight || 1) * (t.progress / 100), 0);
  return Math.round((sum / w) * 100);
}

export function weightedMastery(topics: Topic[]): number {
  const w = topics.reduce((s, t) => s + Number(t.weight || 0), 0) || topics.length || 1;
  const sum = topics.reduce((s, t) => s + Number(t.weight || 1) * (t.verified_level / 5), 0);
  return Math.round((sum / w) * 100);
}

export function schoolCoverage(topics: Topic[]): number {
  const w = topics.reduce((s, t) => s + Number(t.weight || 0), 0) || topics.length || 1;
  const sum = topics.reduce((s, t) => s + (t.school_covered ? Number(t.weight || 1) : 0), 0);
  return Math.round((sum / w) * 100);
}

/** ---------- target systems ---------- */

export type TargetSystem = "school" | "yo" | "percent" | "passfail" | "custom";

export const TARGET_SYSTEMS: { value: TargetSystem; label: string; options?: string[] }[] = [
  { value: "school", label: "Kouluarvosana 4–10", options: ["10", "9", "8", "7", "6", "5", "4"] },
  { value: "yo", label: "YO-arvosana", options: ["L", "E", "M", "C", "B", "A", "I"] },
  { value: "percent", label: "Prosentti" },
  { value: "passfail", label: "Hyväksytty / hylätty" },
  { value: "custom", label: "Oma" },
];

/** Target mastery level (0-100) for the chosen evaluation system. */
export function targetMastery(system: string | null, value: string | null): number {
  const v = (value ?? "").trim().toUpperCase();
  switch (system) {
    case "school": {
      const n = Number(v);
      return Number.isFinite(n) ? Math.min(100, Math.max(40, n * 10)) : 80;
    }
    case "yo": {
      const map: Record<string, number> = { L: 95, E: 88, M: 78, C: 68, B: 58, A: 48, I: 30 };
      return map[v] ?? 75;
    }
    case "percent": {
      const n = Number(v.replace("%", ""));
      return Number.isFinite(n) ? Math.min(100, Math.max(0, n)) : 80;
    }
    case "passfail":
      return 55;
    default: {
      const n = Number(v);
      return Number.isFinite(n) && n > 0 ? Math.min(100, n) : 80;
    }
  }
}

/** Course content coverage target is always 100 %. */
export const COVERAGE_TARGET = 100;

/** ---------- readiness (0-100, NOT a grade prediction) ---------- */

export function readiness(input: {
  topics: Topic[];
  tests: PracticeTest[];
  mistakes: Mistake[];
  todayISO?: string;
}): number {
  const { topics, tests, mistakes } = input;
  const now = input.todayISO ?? today();
  if (topics.length === 0) return 0;

  const mastery = weightedMastery(topics); // 0-100
  const coverage = weightedCoverage(topics);

  const scored = tests.filter((t) => t.score != null && t.max_score);
  const testScore = scored.length
    ? Math.round(
        (scored.reduce((s, t) => s + Number(t.score) / Number(t.max_score), 0) / scored.length) *
          100,
      )
    : Math.min(mastery, 50);

  const reviewed = topics.filter((t) => t.last_review);
  const recency = reviewed.length
    ? Math.round(
        (reviewed.reduce((s, t) => {
          const age = Math.abs(diffDays(now, t.last_review!));
          return s + Math.max(0, 1 - age / 21);
        }, 0) /
          topics.length) *
          100,
      )
    : 0;

  const open = mistakes.filter((m) => m.status === "open").length;
  const total = mistakes.length;
  const corrected = total === 0 ? 70 : Math.round(((total - open) / total) * 100);

  const value =
    0.42 * mastery + 0.24 * coverage + 0.14 * testScore + 0.1 * recency + 0.1 * corrected;
  return Math.max(0, Math.min(100, Math.round(value)));
}

/** ---------- progress corridor ---------- */

export type CorridorPoint = {
  date: string;
  label: string;
  lower: number;
  target: number;
  upper: number;
  actual: number | null;
  forecast: number | null;
};

export function corridor(opts: {
  start: string;
  exam: string;
  sessions: Session[];
  topics: Topic[];
  targetLevel: number;
  todayISO?: string;
}): CorridorPoint[] {
  const now = opts.todayISO ?? today();
  const span = Math.max(1, diffDays(opts.exam, opts.start));
  const steps = Math.min(16, Math.max(6, Math.round(span / 7) + 1));
  const points: CorridorPoint[] = [];
  const current = weightedCoverage(opts.topics);
  const elapsed = Math.max(0, Math.min(span, diffDays(now, opts.start)));

  for (let i = 0; i <= steps; i++) {
    const dayOffset = Math.round((span * i) / steps);
    const date = addDays(opts.start, dayOffset);
    const x = dayOffset / span;
    const target = Math.round(Math.pow(x, 0.92) * 100);
    const width = 18 * (1 - x) + 4; // wide early, narrow near the exam
    const lower = Math.max(0, Math.round(target - width));
    const upper = Math.min(100, Math.round(target + width * 0.8));
    const past = dayOffset <= elapsed;
    points.push({
      date,
      label: `${parseISO(date).getDate()}.${parseISO(date).getMonth() + 1}.`,
      lower,
      target,
      upper,
      actual: past ? Math.round((current * Math.max(0.05, dayOffset / Math.max(1, elapsed))) ) : null,
      forecast: past
        ? null
        : Math.min(100, Math.round(current + ((100 - current) * (dayOffset - elapsed)) / Math.max(1, span - elapsed))),
    });
  }
  // continuity between actual and forecast
  const lastPast = [...points].reverse().find((p) => p.actual != null);
  if (lastPast) lastPast.forecast = lastPast.actual;
  return points;
}

export function corridorAdvice(actual: number, point: CorridorPoint | undefined): string {
  if (!point) return "Suunnitelmaa ei ole vielä ajoitettu.";
  if (actual > point.upper)
    return "Olet käytävän ylärajan yläpuolella. Kertaa, syvennä tai pidä palautuspäivä — älä lisää uutta sisältöä.";
  if (actual < point.lower)
    return "Olet käytävän alarajan alapuolella. Suunnitelmaan kannattaa lisätä palautuspäivä ja keventää uutta sisältöä.";
  return "Edistyminen on tavoitekäytävän sisällä.";
}

/** ---------- risks ---------- */

export type Risk = { key: "schedule" | "mastery" | "forgetting"; label: string; level: number; note: string };

export function risks(input: {
  course: Course;
  topics: Topic[];
  plan: PlanItem[];
  examDate: string | null;
  todayISO?: string;
}): Risk[] {
  const now = input.todayISO ?? today();
  const { topics, plan } = input;
  const coverage = weightedCoverage(topics);
  const overdue = plan.filter((p) => p.status === "planned" && p.date < now).length;
  const daysLeft = input.examDate ? diffDays(input.examDate, now) : null;

  const expected =
    input.course.start_date && input.examDate
      ? Math.max(
          0,
          Math.min(
            100,
            Math.round(
              (diffDays(now, input.course.start_date) /
                Math.max(1, diffDays(input.examDate, input.course.start_date))) *
                100,
            ),
          ),
        )
      : coverage;

  const scheduleGap = Math.max(0, expected - coverage);
  const masteryGap = Math.max(0, targetMastery(input.course.target_system, input.course.target_value) - weightedMastery(topics));
  const stale = topics.filter(
    (t) => t.verified_level > 0 && (!t.last_review || Math.abs(diffDays(now, t.last_review)) > 21),
  ).length;

  return [
    {
      key: "schedule",
      label: "Aikatauluriski",
      level: Math.min(100, scheduleGap + overdue * 6),
      note:
        overdue > 0
          ? `${overdue} tekemätöntä tehtävää menneiltä päiviltä.`
          : scheduleGap > 8
            ? `Sisältöä on ${scheduleGap} %-yksikköä jäljessä aikataulusta.`
            : "Aikataulu on hallinnassa.",
    },
    {
      key: "mastery",
      label: "Osaamisriski",
      level: Math.min(100, masteryGap),
      note:
        masteryGap > 10
          ? `Varmistettu osaaminen on ${masteryGap} %-yksikköä tavoitteesta.`
          : "Osaaminen vastaa tavoitetta.",
    },
    {
      key: "forgetting",
      label: "Unohtamisriski",
      level: Math.min(100, stale * 12),
      note:
        stale > 0
          ? `${stale} aihetta ilman kertausta yli kolmeen viikkoon.`
          : "Kertaukset ovat ajan tasalla.",
    },
  ].map((r) => ({
    ...r,
    level: daysLeft != null && daysLeft <= 14 ? Math.min(100, r.level + 8) : r.level,
  })) as Risk[];
}

/** ---------- review scheduling ---------- */

export function nextReviewDate(fromISO: string, level: number): string {
  const gaps = [1, 2, 4, 7, 14, 28];
  return addDays(fromISO, gaps[Math.max(0, Math.min(5, level))]);
}

/** ---------- plan generation ---------- */

export type PlanDraft = {
  course_id: string;
  topic_id: string | null;
  date: string;
  phase: PlanPhase;
  kind: string;
  title: string;
  min_minutes: number;
  target_minutes: number;
  extra_minutes: number;
  start_time: string | null;
};

const PHASE_SHARE: { phase: PlanPhase; share: number }[] = [
  { phase: "content", share: 0.38 },
  { phase: "application", share: 0.2 },
  { phase: "practice", share: 0.14 },
  { phase: "review", share: 0.16 },
  { phase: "light", share: 0.12 },
];

/**
 * Suggested distribution: content -> applications -> practice -> review ->
 * light review -> exam. It's a suggestion; every item stays editable.
 */
export function generatePlan(opts: {
  course: Course;
  topics: Topic[];
  examDate: string;
  studyWeekdays: number[]; // 1 = Monday ... 7 = Sunday
  weeklyMinutes: number;
  fromISO?: string;
}): PlanDraft[] {
  const startISO =
    opts.fromISO ??
    (opts.course.start_date && opts.course.start_date > today() ? opts.course.start_date : today());
  const totalDays = diffDays(opts.examDate, startISO);
  if (totalDays <= 0) return [];

  const dates: string[] = [];
  for (let i = 0; i < totalDays; i++) {
    const iso = addDays(startISO, i);
    const weekday = ((parseISO(iso).getDay() + 6) % 7) + 1;
    if (opts.studyWeekdays.includes(weekday)) dates.push(iso);
  }
  if (dates.length === 0) return [];

  const perDay = Math.max(20, Math.round(opts.weeklyMinutes / Math.max(1, opts.studyWeekdays.length)));
  const ordered = [...opts.topics].sort((a, b) => a.position - b.position);
  const hardest = [...opts.topics].sort(
    (a, b) => b.importance * (5 - b.verified_level) - a.importance * (5 - a.verified_level),
  );

  const drafts: PlanDraft[] = [];
  let contentIdx = 0;
  let reviewIdx = 0;

  const bounds: { phase: PlanPhase; until: number }[] = [];
  let acc = 0;
  for (const p of PHASE_SHARE) {
    acc += p.share;
    bounds.push({ phase: p.phase, until: Math.round(acc * dates.length) });
  }

  dates.forEach((date, i) => {
    const phase = bounds.find((b) => i < b.until)?.phase ?? "light";
    const daysToExam = diffDays(opts.examDate, date);
    let topic: Topic | undefined;
    let kind = "study";
    let title = "";

    if (phase === "content") {
      topic = ordered[Math.min(ordered.length - 1, contentIdx)];
      contentIdx += 1;
      title = topic ? topic.name : "Uusi sisältö";
    } else if (phase === "application") {
      topic = ordered[contentIdx % Math.max(1, ordered.length)];
      contentIdx += 1;
      title = topic ? `${topic.name} – soveltavat tehtävät` : "Soveltavat tehtävät";
    } else if (phase === "practice") {
      kind = "test";
      title = "Harjoituskoe ja virheiden läpikäynti";
      topic = hardest[reviewIdx % Math.max(1, hardest.length)];
      reviewIdx += 1;
    } else if (phase === "review") {
      kind = "review";
      topic = hardest[reviewIdx % Math.max(1, hardest.length)];
      reviewIdx += 1;
      title = topic ? `${topic.name} – kertaus` : "Kertaus";
    } else {
      kind = "review";
      topic = hardest[reviewIdx % Math.max(1, hardest.length)];
      reviewIdx += 1;
      title =
        daysToExam <= 2
          ? "Kevyt palautus: virhelista ja kaavat"
          : topic
            ? `${topic.name} – kevyt kertaus`
            : "Kevyt kertaus";
    }

    const light = daysToExam <= 2;
    drafts.push({
      course_id: opts.course.id,
      topic_id: topic?.id ?? null,
      date,
      phase,
      kind,
      title,
      min_minutes: light ? 10 : Math.round(perDay * 0.55),
      target_minutes: light ? 20 : perDay,
      extra_minutes: light ? 0 : Math.round(perDay * 0.35),
      start_time: null,
    });
  });

  drafts.push({
    course_id: opts.course.id,
    topic_id: null,
    date: opts.examDate,
    phase: "exam",
    kind: "exam",
    title: `${opts.course.code} koe`,
    min_minutes: 0,
    target_minutes: 0,
    extra_minutes: 0,
    start_time: null,
  });

  return drafts;
}

/** ---------- daily / weekly aggregates ---------- */

export function minutesInRange(sessions: Session[], fromISO: string, toISODate: string): number {
  return sessions
    .filter((s) => s.date >= fromISO && s.date <= toISODate)
    .reduce((sum, s) => sum + s.minutes, 0);
}

export function weekMinutes(sessions: Session[], iso = today()): number {
  const from = startOfWeek(iso);
  return minutesInRange(sessions, from, addDays(from, 6));
}

export function studyDaysInWeek(sessions: Session[], iso = today()): number {
  const from = startOfWeek(iso);
  const set = new Set(
    sessions.filter((s) => s.date >= from && s.date <= addDays(from, 6)).map((s) => s.date),
  );
  return set.size;
}

export function effectivePlanStatus(item: PlanItem, now = today()): PlanStatus {
  if (item.status === "planned" && item.date < now) return "overdue";
  return item.status as PlanStatus;
}

/** Exam mode: within 14 days prioritise risks, reviews, mistakes, practice tests. */
export function examMode(examDate: string | null, now = today()): { active: boolean; days: number; finalStretch: boolean } {
  if (!examDate) return { active: false, days: 0, finalStretch: false };
  const days = diffDays(examDate, now);
  return { active: days >= 0 && days <= 14, days, finalStretch: days >= 0 && days <= 2 };
}

export function isBeforeStart(course: Course, now = today()): boolean {
  return !!course.start_date && course.start_date > now;
}

export function rangeDates(fromISO: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => addDays(fromISO, i));
}

export function monthGrid(iso: string): string[] {
  const d = parseISO(iso);
  const first = toISO(new Date(d.getFullYear(), d.getMonth(), 1));
  const gridStart = startOfWeek(first);
  return rangeDates(gridStart, 42);
}
