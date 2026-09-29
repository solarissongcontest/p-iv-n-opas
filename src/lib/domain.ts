import type { Database } from "@/integrations/supabase/types";
import { addDays, diffDays, parseISO, startOfWeek, toISO, today } from "./fi.ts";

export type Course = Database["public"]["Tables"]["courses"]["Row"];
export type Topic = Database["public"]["Tables"]["topics"]["Row"];
export type Session = Database["public"]["Tables"]["study_sessions"]["Row"];
export type Exam = Database["public"]["Tables"]["exams"]["Row"];
export type PlanItem = Database["public"]["Tables"]["plan_items"]["Row"];
export type Mistake = Database["public"]["Tables"]["mistakes"]["Row"] & {
  what_happened: string | null;
  solution: string | null;
  retested_at: string | null;
  mastered_at: string | null;
};
export type PracticeTest = Database["public"]["Tables"]["practice_tests"]["Row"];
export type NotificationSettings =
  Database["public"]["Tables"]["notification_settings"]["Row"];
export type WeeklyCheckin = Database["public"]["Tables"]["weekly_checkins"]["Row"] & {
  adherence: number | null;
  hardest_topic_id: string | null;
  went_well: string | null;
  next_focus: string | null;
  load_rating: "light" | "good" | "heavy" | null;
};
export type ProgressEvent = Database["public"]["Tables"]["progress_events"]["Row"];

export type PlanStatus = "planned" | "in_progress" | "completed" | "skipped" | "overdue";
export type PlanPhase = "content" | "application" | "practice" | "review" | "light" | "exam";

export const MASTERY_LABELS: Record<number, string> = {
  0: "Ei vielä arvioitu",
  1: "Harjoittele",
  2: "Kehittyvä",
  3: "Melko varma",
  4: "Vahva",
  5: "Vahva",
};

export function masteryEvidence(t: Pick<
  Topic,
  "basic_successes" | "exam_successes" | "delayed_successes"
>): string {
  const parts: string[] = [];
  if (t.basic_successes > 0) parts.push(`${t.basic_successes} perustehtävän näyttöä`);
  if (t.exam_successes > 0) parts.push(`${t.exam_successes} koetason näyttöä`);
  if (t.delayed_successes > 0) parts.push(`${t.delayed_successes} onnistunutta viivästettyä kertausta`);
  return parts.length ? parts.join(" · ") : "Ei vielä tarpeeksi näyttöä.";
}

export function masterySummary(topics: Topic[]) {
  const groups = {
    unassessed: topics.filter((t) => t.verified_level === 0),
    practice: topics.filter((t) => t.verified_level === 1),
    developing: topics.filter((t) => t.verified_level === 2),
    fairlySure: topics.filter((t) => t.verified_level === 3),
    strong: topics.filter((t) => t.verified_level >= 4),
  };
  if (!topics.length || groups.unassessed.length === topics.length) {
    return { label: "Ei vielä arvioitu", ...groups };
  }
  const internal = weightedMastery(topics);
  const label =
    internal < 30 ? "Harjoittele" :
    internal < 50 ? "Kehittyvä" :
    internal < 70 ? "Melko varma" :
    "Vahva";
  return { label, ...groups };
}

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

  const active = mistakes.filter((m) => m.status !== "mastered").length;
  const total = mistakes.length;
  const corrected = total === 0 ? 70 : Math.round(((total - active) / total) * 100);

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

export function reviewDebt(topics: Topic[], now = today()) {
  const due = topics
    .filter((t) => t.verified_level > 0 && !!t.next_review && t.next_review <= now)
    .sort((a, b) => (a.next_review ?? "").localeCompare(b.next_review ?? ""));
  const overdueDays = due.reduce(
    (sum, t) => sum + Math.max(0, diffDays(now, t.next_review ?? now)),
    0,
  );
  return {
    due,
    count: due.length,
    overdueDays,
    pressure: topics.length
      ? Math.min(100, Math.round((due.length / topics.length) * 75 + Math.min(25, overdueDays * 2)))
      : 0,
  };
}

export function recoveryQueue(topics: Topic[], now = today(), limit = 3) {
  const due = topics
    .filter((t) => t.verified_level > 0 && !!t.next_review && t.next_review <= now)
    .map((topic) => ({
      topic,
      overdueDays: Math.max(0, diffDays(now, topic.next_review ?? now)),
      priority:
        Math.max(0, diffDays(now, topic.next_review ?? now)) * 2 +
        topic.importance * 3 +
        (5 - topic.verified_level) * 2,
    }))
    .sort((a, b) =>
      b.priority - a.priority ||
      (a.topic.next_review ?? "").localeCompare(b.topic.next_review ?? ""),
    );
  const items = due.slice(0, Math.max(0, limit)).map((item) => item.topic);
  return {
    items,
    total: due.length,
    hiddenCount: Math.max(0, due.length - items.length),
    estimatedMinutes: items.length * 5,
  };
}

export function nextReviewDate(
  fromISO: string,
  level: number,
  options: {
    confidence?: number | null;
    previousReview?: string | null;
    delayedSuccess?: boolean;
    examSuccess?: boolean;
  } = {},
): string {
  const baseGaps = [1, 2, 4, 7, 14, 28];
  let gap = baseGaps[Math.max(0, Math.min(5, level))] ?? 1;
  const confidence = options.confidence ?? null;

  if (confidence != null && confidence <= 1) gap = Math.min(gap, 2);
  else if (confidence === 2) gap = Math.min(gap, 4);

  const elapsed = options.previousReview
    ? Math.max(1, diffDays(fromISO, options.previousReview))
    : 0;

  if (options.delayedSuccess && level >= 3) {
    gap = Math.max(gap, Math.round(Math.max(gap, elapsed) * 1.6));
  } else if (options.examSuccess && level >= 3) {
    gap = Math.max(gap, Math.round(gap * 1.25));
  }

  return addDays(fromISO, Math.max(1, Math.min(60, gap)));
}

export function findNextStudyDate(input: {
  plan: Pick<PlanItem, "id" | "date" | "target_minutes" | "status" | "kind">[];
  fromISO: string;
  studyWeekdays: number[];
  minutes: number;
  ignoreItemId?: string;
  latestDate?: string | null;
  maxDailyMinutes?: number;
}): string | null {
  const maxDaily = input.maxDailyMinutes ?? 105;
  const candidates: { date: string; load: number }[] = [];

  for (let offset = 1; offset <= 14; offset += 1) {
    const date = addDays(input.fromISO, offset);
    if (input.latestDate && date > input.latestDate) break;
    const weekday = ((parseISO(date).getDay() + 6) % 7) + 1;
    if (!input.studyWeekdays.includes(weekday)) continue;

    const load = input.plan
      .filter(
        (item) =>
          item.id !== input.ignoreItemId &&
          item.date === date &&
          item.kind !== "exam" &&
          !["completed", "skipped"].includes(item.status),
      )
      .reduce((sum, item) => sum + item.target_minutes, 0);

    candidates.push({ date, load });
    if (load + input.minutes <= maxDaily) return date;
  }

  if (!candidates.length) return null;
  return [...candidates].sort((a, b) => a.load - b.load || a.date.localeCompare(b.date))[0]?.date ?? null;
}

export function todayTaskReason(input: {
  item: PlanItem;
  courses: Course[];
  topics: Topic[];
  mistakes: Mistake[];
  now?: string;
}): string {
  const now = input.now ?? today();
  const course = input.courses.find((candidate) => candidate.id === input.item.course_id);
  const topic = input.topics.find((candidate) => candidate.id === input.item.topic_id);
  const reasons: string[] = [];

  if (topic?.next_review && topic.next_review <= now) {
    reasons.push("kertaus on ajankohtainen");
  }
  if (
    input.mistakes.some(
      (mistake) =>
        mistake.course_id === input.item.course_id &&
        mistake.status !== "mastered" &&
        (!input.item.topic_id || mistake.topic_id === input.item.topic_id),
    )
  ) {
    reasons.push("aiheessa on avoin virhe korjattavana");
  }
  if (course?.exam_date) {
    const days = diffDays(course.exam_date, now);
    if (days >= 0 && days <= 14) reasons.push(`koe on ${days === 0 ? "tänään" : `${days} päivän päästä`}`);
  }
  if (topic && topic.verified_level <= 2) {
    reasons.push("osaamisesta tarvitaan vielä lisää näyttöä");
  }

  return reasons.slice(0, 2).join(" ja ") || "tämä on suunnitelman seuraava tärkeä vaihe";
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
  mistakes?: Mistake[];
  tests?: PracticeTest[];
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

  const perDay = Math.max(
    20,
    Math.round(opts.weeklyMinutes / Math.max(1, opts.studyWeekdays.length)),
  );
  const ordered = [...opts.topics].sort((a, b) => a.position - b.position);
  const progressById = new Map(opts.topics.map((t) => [t.id, t.progress]));
  const eligibleNew = ordered.filter((t) =>
    (t.dependencies ?? []).every((id) => (progressById.get(id) ?? 0) >= 60),
  );
  const activeMistakeTopics = new Set(
    (opts.mistakes ?? []).filter((m) => m.status !== "mastered" && m.topic_id).map((m) => m.topic_id!),
  );
  const ownAheadOfSchool = weightedCoverage(opts.topics) - schoolCoverage(opts.topics) >= 15;
  const priorities = [...opts.topics].sort((a, b) => {
    const score = (t: Topic) => {
      const dueBoost = t.next_review && t.next_review <= startISO ? 8 : 0;
      const mistakeBoost = activeMistakeTopics.has(t.id) ? 12 : 0;
      const schoolBoost = ownAheadOfSchool && t.school_covered ? 5 : 0;
      const unfinished = (100 - t.progress) / 20;
      return t.importance * (6 - t.verified_level) + dueBoost + mistakeBoost + schoolBoost + unfinished;
    };
    return score(b) - score(a);
  });

  const drafts: PlanDraft[] = [];
  let contentIdx = 0;
  let priorityIdx = 0;

  const choosePriority = (date: string) => {
    const due = priorities.filter((t) => t.next_review && t.next_review <= date);
    const pool = due.length ? due : priorities;
    if (!pool.length) return undefined;
    const topic = pool[priorityIdx % pool.length];
    priorityIdx += 1;
    return topic;
  };

  dates.forEach((date, i) => {
    const daysToExam = diffDays(opts.examDate, date);
    const inExamMode = daysToExam <= 14;
    const finalStretch = daysToExam <= 2;

    let phase: PlanPhase;
    let kind = "study";
    let title = "";
    let topic: Topic | undefined;

    if (finalStretch) {
      phase = "light";
      kind = "review";
      topic = choosePriority(date);
      title = topic
        ? `${topic.name} – kevyt palautus`
        : "Kevyt palautus: virhelista, käsitteet ja kaavat";
    } else if (inExamMode) {
      const cycle = i % 4;
      if (cycle === 0) {
        phase = "practice";
        kind = "test";
        topic = choosePriority(date);
        title = "Harjoituskoe ja virheiden läpikäynti";
      } else if (cycle === 1 || cycle === 3) {
        phase = "review";
        kind = "review";
        topic = choosePriority(date);
        title = topic ? `${topic.name} – kohdennettu kertaus` : "Kohdennettu kertaus";
      } else {
        phase = "application";
        topic = choosePriority(date);
        title = topic ? `${topic.name} – koetason soveltaminen` : "Koetason soveltaminen";
      }
    } else {
      const x = i / Math.max(1, dates.length - 1);
      if (x < 0.42) {
        const due = priorities.find((t) => t.next_review && t.next_review <= date);
        if (due) {
          phase = "review";
          kind = "review";
          topic = choosePriority(date);
          title = topic ? `${topic.name} – ajastettu kertaus` : "Ajastettu kertaus";
        } else if (ownAheadOfSchool) {
          phase = "review";
          kind = "review";
          topic = choosePriority(date);
          title = topic ? `${topic.name} – syventävä kertaus` : "Syventävä kertaus";
        } else {
          phase = "content";
          const pool = eligibleNew.length ? eligibleNew : ordered;
          topic = pool[Math.min(contentIdx, Math.max(0, pool.length - 1))];
          contentIdx += 1;
          title = topic ? topic.name : "Uusi sisältö";
        }
      } else if (x < 0.67) {
        phase = "application";
        topic = choosePriority(date);
        title = topic ? `${topic.name} – soveltavat tehtävät` : "Soveltavat tehtävät";
      } else if (x < 0.8) {
        phase = "practice";
        kind = "test";
        topic = choosePriority(date);
        title = "Harjoituskoe ja virheiden läpikäynti";
      } else {
        phase = "review";
        kind = "review";
        topic = choosePriority(date);
        title = topic ? `${topic.name} – kertaus` : "Kertaus";
      }
    }

    const light = finalStretch;
    drafts.push({
      course_id: opts.course.id,
      topic_id: topic?.id ?? null,
      date,
      phase,
      kind,
      title,
      min_minutes: light ? 10 : Math.max(15, Math.round(perDay * 0.55)),
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

/** ---------- decision support / balancing ---------- */

export function masteryMismatch(topic: Topic) {
  const gap = topic.self_level - topic.verified_level;
  if (Math.abs(gap) < 2) return null;
  return {
    gap,
    message:
      gap > 0
        ? `Oma arvio on ${gap} tasoa näyttöä korkeampi. Varmista osaaminen tehtävällä ennen vaikeampaa sisältöä.`
        : `Näyttö on ${Math.abs(gap)} tasoa omaa arviota korkeampi. Osaaminen voi olla vahvempaa kuin miltä tuntuu.`,
  };
}

export function courseBuffers(input: {
  course: Course;
  topics: Topic[];
  plan: PlanItem[];
  examDate: string | null;
  todayISO?: string;
}) {
  const now = input.todayISO ?? today();
  if (!input.examDate || !input.course.start_date) {
    return { timeDays: 0, workSessions: 0, recoverySessions: 0, recoveryMinutes: 0 };
  }
  const span = Math.max(1, diffDays(input.examDate, input.course.start_date));
  const elapsed = Math.max(0, Math.min(span, diffDays(now, input.course.start_date)));
  const expected = Math.round((elapsed / span) * 100);
  const actual = weightedCoverage(input.topics);
  const daysLeft = Math.max(0, diffDays(input.examDate, now));
  const dailyCoverage = 100 / span;
  const gap = expected - actual;
  const timeDays = Math.round((actual - expected) / Math.max(0.1, dailyCoverage));
  const futureSessions = input.plan.filter(
    (p) => p.date >= now && p.date < input.examDate! && p.kind !== "exam" && p.status === "planned",
  ).length;
  const workSessions = Math.max(0, futureSessions - Math.ceil(Math.max(0, 100 - actual) / 8));
  const recoverySessions = Math.max(0, Math.ceil(gap / 8));
  const avgTarget =
    input.plan.filter((p) => p.kind !== "exam").reduce((s, p) => s + p.target_minutes, 0) /
      Math.max(1, input.plan.filter((p) => p.kind !== "exam").length) || 35;
  return {
    timeDays,
    workSessions,
    recoverySessions,
    recoveryMinutes: Math.round(recoverySessions * avgTarget),
    daysLeft,
  };
}

export function balanceDraftsAgainstPlan(
  drafts: PlanDraft[],
  otherPlan: Pick<PlanItem, "date" | "target_minutes" | "status" | "kind">[],
  maxDailyMinutes = 120,
): PlanDraft[] {
  const result = drafts.map((d) => ({ ...d }));
  const load = new Map<string, number>();
  for (const p of otherPlan) {
    if (p.status === "completed" || p.status === "skipped" || p.kind === "exam") continue;
    load.set(p.date, (load.get(p.date) ?? 0) + p.target_minutes);
  }
  const allowedDates = [...new Set(result.filter((d) => d.kind !== "exam").map((d) => d.date))].sort();

  for (const item of result.filter((d) => d.kind !== "exam").sort((a, b) => a.date.localeCompare(b.date))) {
    const currentLoad = (load.get(item.date) ?? 0) + item.target_minutes;
    if (currentLoad <= maxDailyMinutes) {
      load.set(item.date, currentLoad);
      continue;
    }
    const candidates = allowedDates
      .filter((d) => d < item.date)
      .sort((a, b) => b.localeCompare(a));
    const better = candidates.find(
      (d) => (load.get(d) ?? 0) + item.target_minutes <= maxDailyMinutes,
    );
    if (better) item.date = better;
    load.set(item.date, (load.get(item.date) ?? 0) + item.target_minutes);
  }
  return result;
}

export function rankTodayTasks(input: {
  items: PlanItem[];
  courses: Course[];
  topics: Topic[];
  mistakes: Mistake[];
  tests: PracticeTest[];
  now?: string;
}) {
  const now = input.now ?? today();
  return [...input.items].sort((a, b) => {
    const score = (p: PlanItem) => {
      const course = input.courses.find((c) => c.id === p.course_id);
      const topic = input.topics.find((t) => t.id === p.topic_id);
      const days = course?.exam_date ? Math.max(0, diffDays(course.exam_date, now)) : 60;
      const examUrgency = Math.max(0, 30 - days);
      const dueReview = topic?.next_review && topic.next_review <= now ? 20 : 0;
      const mistake = input.mistakes.some(
        (m) => m.course_id === p.course_id && m.status !== "mastered" && (!p.topic_id || m.topic_id === p.topic_id),
      )
        ? 18
        : 0;
      const masteryNeed = topic ? (5 - topic.verified_level) * topic.importance : 0;
      const schoolPenalty =
        topic && !topic.school_covered && weightedCoverage(input.topics.filter((t) => t.course_id === p.course_id)) - schoolCoverage(input.topics.filter((t) => t.course_id === p.course_id)) > 15
          ? -12
          : 0;
      return examUrgency + dueReview + mistake + masteryNeed + schoolPenalty;
    };
    return score(b) - score(a);
  });
}

export function studyEfficiency(input: {
  sessions: Session[];
  events: ProgressEvent[];
  topicId?: string;
}) {
  const sessions = input.topicId ? input.sessions.filter((s) => s.topic_id === input.topicId) : input.sessions;
  const events = input.topicId ? input.events.filter((e) => e.topic_id === input.topicId) : input.events;
  const minutes = sessions.reduce((s, x) => s + x.minutes, 0);
  const masteryGain = events
    .filter((e) => e.kind === "mastery" && e.from_value != null && e.to_value != null)
    .reduce((s, e) => s + Math.max(0, Number(e.to_value) - Number(e.from_value)), 0);
  return {
    minutes,
    masteryGain,
    minutesPerMastery: masteryGain > 0 ? Math.round(minutes / masteryGain) : null,
    needsMethodChange: minutes >= 90 && masteryGain === 0,
  };
}

export function weeklyStudySeries(sessions: Session[], plan: PlanItem[], weeks = 8, now = today()) {
  return Array.from({ length: weeks }, (_, index) => {
    const start = addDays(startOfWeek(now), -(weeks - 1 - index) * 7);
    const end = addDays(start, 6);
    return {
      week: `${parseISO(start).getDate()}.${parseISO(start).getMonth() + 1}.`,
      planned: plan
        .filter((p) => p.date >= start && p.date <= end && p.kind !== "exam")
        .reduce((s, p) => s + p.target_minutes, 0),
      actual: minutesInRange(sessions, start, end),
    };
  });
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
