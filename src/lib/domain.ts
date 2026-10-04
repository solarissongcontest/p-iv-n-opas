import type { Database } from "@/integrations/supabase/types";
import { addDays, diffDays, parseISO, startOfWeek, toISO, today } from "./fi.ts";

export type Course = Database["public"]["Tables"]["courses"]["Row"];
export type Topic = Database["public"]["Tables"]["topics"]["Row"] & {
  retrieval_attempts: number;
  retrieval_failures: number;
  mastery_uncertainty: number;
  mastery_confidence: number;
  evidence_count: number;
  strong_evidence_count: number;
  recall_strength: number;
  application_strength: number;
  retention_strength: number;
  forgetting_risk: number;
  exam_relevance: number;
  learning_state_updated_at: string | null;
  last_retrieval_at: string | null;
  last_retrieval_result: "independent" | "hinted" | "not_yet" | null;
  last_retrieval_confidence: number | null;
  last_retrieval_difficulty: number | null;
  understanding_strength?: number;
  fluency_strength?: number;
  calibration_strength?: number;
  blind_spot?: boolean;
  retention_target?: number;
  discrimination_strength?: number;
  transfer_level?: number;
};
export type Session = Database["public"]["Tables"]["study_sessions"]["Row"] & {
  objective: string | null;
  recall: string | null;
  retrieval_check: string | null;
  retrieval_result: "independent" | "hinted" | "not_yet" | null;
  retrieval_confidence: number | null;
  outcome: "yes" | "partial" | "not_yet" | null;
};
export type Exam = Database["public"]["Tables"]["exams"]["Row"];
export type PlanItem = Database["public"]["Tables"]["plan_items"]["Row"];
export type Mistake = Database["public"]["Tables"]["mistakes"]["Row"] & {
  what_happened: string | null;
  solution: string | null;
  retested_at: string | null;
  mastered_at: string | null;
  first_divergence?: string | null;
  correct_principle?: string | null;
  repair_response?: string | null;
  delayed_verification_due?: string | null;
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

export type PracticeAttempt = {
  id: string;
  owner_id: string;
  course_id: string;
  topic_id: string;
  date: string;
  attempt_type:
    | "free_recall"
    | "short_answer"
    | "calculation"
    | "application"
    | "multiple_choice"
    | "matching"
    | "explanation"
    | "ordering"
    | "error_detection"
    | "simulation"
    | "recognition";
  prompt: string;
  response: string | null;
  difficulty: number;
  result: "independent" | "hinted" | "not_yet";
  outcome?: "correct" | "partial" | "incorrect" | null;
  confidence: number | null;
  hint_used: boolean;
  hints_used?: number;
  response_time_ms?: number | null;
  source?: "practice" | "review" | "study_session" | "exam" | "mistake_repair";
  evidence_quality?: number;
  skills?: string[];
  expected_concepts?: string[];
  question_payload?: Record<string, unknown>;
  scaffold_stage?:
    | "worked_example"
    | "explanation"
    | "partial_completion"
    | "guided"
    | "independent"
    | "mixed"
    | "transfer"
    | "delayed_verification";
  error_category?:
    | "concept_error"
    | "recall_error"
    | "formula_error"
    | "algebra_error"
    | "unit_error"
    | "interpretation_error"
    | "strategy_error"
    | "careless_error"
    | "incomplete_reasoning"
    | "prerequisite_gap"
    | null;
  assisted?: boolean;
  dimension_weights?: Record<string, number>;
  independent_verification_required?: boolean;
  operation_id?: string | null;
  schema_version?: number;
  delay_days: number | null;
  is_pretest?: boolean;
  transfer_level?: number | null;
  discrimination_topic_ids?: string[];
  feedback_timing?: "immediate" | "after_retry" | "after_item" | "after_block" | null;
  confidence_delay_hours?: number | null;
  created_at: string;
};

export type QuestionBankItem = {
  id: string;
  owner_id: string;
  course_id: string;
  topic_id: string | null;
  curriculum: "LOPS21";
  module_code: string;
  question_type: PracticeAttempt["attempt_type"];
  prompt: string;
  options: string[];
  correct_answer: string | null;
  explanation: string;
  hints: string[];
  skills: string[];
  expected_concepts: string[];
  difficulty: number;
  estimated_seconds: number | null;
  status: "draft" | "validated" | "active" | "retired";
  source_type: "manual" | "ai" | "material" | "seed";
  source_ref: string | null;
  content_id?: string | null;
  prerequisites?: string[];
  common_errors?: string[];
  scoring_guide?: string | null;
  exam_eligible?: boolean;
  reserve_for_exam?: boolean;
  validated?: boolean;
  matching_pairs?: Array<{ left: string; right: string }>;
  seed_version?: string | null;
  metadata: Record<string, unknown>;
  stimulus_package?: Record<string, unknown>;
  answer_mode?: "text" | "formula" | "diagram" | "graph" | "mixed" | "matching";
  points?: number | null;
  transfer_level?: number;
  confusion_topic_ids?: string[];
  pretest_eligible?: boolean;
  created_at: string;
  updated_at: string;
};

export type QuestionUserState = {
  owner_id: string;
  question_id: string;
  course_id: string;
  topic_id: string | null;
  times_seen: number;
  times_attempted: number;
  times_correct: number;
  times_partial: number;
  last_seen: string | null;
  last_attempted: string | null;
  last_result: PracticeAttempt["result"] | null;
  best_result: PracticeAttempt["result"] | null;
  last_hint_count: number;
  mastery_evidence: number;
  next_review: string | null;
  used_in_exam: boolean;
  last_exam_at: string | null;
  last_response_time_ms: number | null;
  updated_at: string;
};

export type CapacityProfile = {
  studyWeekdays: number[];
  weekdayMinMinutes?: number;
  weekdayMinutes: number;
  weekendMinMinutes?: number;
  weekendMinutes: number;
  busyDates: string[];
};

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
  "basic_successes" | "exam_successes" | "delayed_successes" | "retrieval_attempts" | "retrieval_failures" | "mastery_uncertainty"
>): string {
  const parts: string[] = [];
  if (t.basic_successes > 0) parts.push(`${t.basic_successes} perustehtävän näyttöä`);
  if (t.exam_successes > 0) parts.push(`${t.exam_successes} koetason näyttöä`);
  if (t.delayed_successes > 0) parts.push(`${t.delayed_successes} onnistunutta viivästettyä kertausta`);
  if (t.retrieval_attempts > 0) {
    parts.push(`${t.retrieval_attempts} muistista palautusta`);
    if (t.retrieval_failures > 0) parts.push(`${t.retrieval_failures} tarvitsee vielä harjoittelua`);
  }
  if (parts.length > 0 && t.mastery_uncertainty >= 0.65) parts.push("näyttöä vielä vähän");
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

function safeCapacityMinutes(value: number | undefined): number {
  return typeof value === "number" && Number.isFinite(value) ? Math.max(0, value) : 0;
}

export function capacityForDate(profile: CapacityProfile, iso: string): number {
  const weekdayMinutes = safeCapacityMinutes(profile.weekdayMinutes);
  const weekendMinutes = safeCapacityMinutes(profile.weekendMinutes);
  if (profile.busyDates.includes(iso)) {
    return weekdayMinutes > 0 ? Math.max(10, Math.min(20, weekdayMinutes)) : 0;
  }
  const weekday = ((parseISO(iso).getDay() + 6) % 7) + 1;
  return weekday >= 6 ? weekendMinutes : weekdayMinutes;
}

function capacityFloorForDate(profile: CapacityProfile, iso: string): number {
  const weekdayMinutes = safeCapacityMinutes(profile.weekdayMinutes);
  const weekendMinutes = safeCapacityMinutes(profile.weekendMinutes);
  if (profile.busyDates.includes(iso)) return Math.min(10, weekdayMinutes);
  const weekday = ((parseISO(iso).getDay() + 6) % 7) + 1;
  return weekday >= 6
    ? Math.min(weekendMinutes, safeCapacityMinutes(profile.weekendMinMinutes ?? Math.min(60, weekendMinutes)))
    : Math.min(weekdayMinutes, safeCapacityMinutes(profile.weekdayMinMinutes ?? Math.min(30, weekdayMinutes)));
}

export function returnFromBreak(input: {
  sessions: Pick<Session, "date">[];
  topics: Topic[];
  now?: string;
  days?: number;
}) {
  const now = input.now ?? today();
  const threshold = input.days ?? 7;
  const latest = [...input.sessions].sort((a,b)=>b.date.localeCompare(a.date))[0]?.date ?? null;
  const awayDays = latest ? diffDays(now, latest) : 0;
  if (!latest || awayDays < threshold) return null;
  const queue = recoveryQueue(input.topics, now, 3);
  const fallback = [...input.topics]
    .sort((a,b)=>a.verified_level-b.verified_level||b.importance-a.importance)
    .slice(0,3);
  const items = queue.items.length ? queue.items : fallback;
  return {
    awayDays,
    items,
    estimatedMinutes: Math.max(5, items.length * 5),
  };
}

export const PRACTICE_TYPES = [
  "free_recall",
  "short_answer",
  "calculation",
  "application",
  "recognition",
] as const;

export function practicePrompt(topic: Topic, index = 0): {
  type: PracticeAttempt["attempt_type"];
  difficulty: number;
  prompt: string;
  hint: string;
} {
  const level = topic.verified_level;
  const cycle = index % 5;
  const templates = [
    {
      type: "free_recall" as const,
      difficulty: Math.max(1, Math.min(3, level || 1)),
      prompt: `Kirjoita ilman muistiinpanoja kaikki olennainen aiheesta: ${topic.name}.`,
      hint: "Aloita keskeisistä käsitteistä, kaavoista tai vaiheista. Älä avaa materiaalia vielä.",
    },
    {
      type: "short_answer" as const,
      difficulty: 2,
      prompt: `Selitä omin sanoin, mikä on aiheen “${topic.name}” tärkein idea ja mistä tunnistat, että osaat sen.`,
      hint: "Muotoile vastaus yhdellä väitteellä ja yhdellä perustelulla.",
    },
    {
      type: "calculation" as const,
      difficulty: 3,
      prompt: `Tee aiheesta “${topic.name}” yksi tyypillinen tehtävä ilman malliratkaisua. Kirjaa ratkaisutapa tai vaiheet.`,
      hint: "Nimeä ensin mitä tietoa annetaan ja mikä menetelmä sopii ennen laskemista.",
    },
    {
      type: "application" as const,
      difficulty: 4,
      prompt: `Keksi uusi tilanne, jossa aihetta “${topic.name}” pitää soveltaa, ja ratkaise tai selitä se ilman mallia.`,
      hint: "Muuta pintatietoja, mutta pidä sama ydinperiaate. Mieti ensin miksi tämä menetelmä sopii.",
    },
    {
      type: "recognition" as const,
      difficulty: 2,
      prompt: `Millaisesta tehtävästä tunnistat, että aihe “${topic.name}” on relevantti? Anna kaksi tuntomerkkiä ja yksi harhaanjohtava tuntomerkki.`,
      hint: "Vertaa samankaltaiseen aiheeseen ja etsi ero, joka ratkaisee menetelmän valinnan.",
    },
  ];
  return templates[cycle]!;
}

export function findNextStudyDate(input: {
  plan: Pick<PlanItem, "id" | "date" | "target_minutes" | "status" | "kind">[];
  fromISO: string;
  studyWeekdays: number[];
  minutes: number;
  ignoreItemId?: string;
  latestDate?: string | null;
  maxDailyMinutes?: number;
  capacity?: CapacityProfile;
}): string | null {
  const requestedMinutes =
    Number.isFinite(input.minutes) ? Math.max(0, input.minutes) : 0;
  if (requestedMinutes <= 0) return null;

  const defaultMaxDaily = safeCapacityMinutes(input.maxDailyMinutes ?? 105);
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
      .reduce(
        (sum, item) =>
          sum +
          (Number.isFinite(item.target_minutes)
            ? Math.max(0, item.target_minutes)
            : 0),
        0,
      );

    const maxDaily = input.capacity ? capacityForDate(input.capacity, date) : defaultMaxDaily;
    candidates.push({ date, load });
    if (load + requestedMinutes <= maxDaily) return date;
  }

  // Capacity is a hard guardrail. If every allowed day is already full,
  // force the caller to ask the user or re-plan instead of silently overloading
  // the "least bad" day.
  return null;
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
  capacity?: CapacityProfile;
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
    if (!opts.studyWeekdays.includes(weekday)) continue;
    if (opts.capacity && capacityForDate(opts.capacity, iso) <= 0) continue;
    dates.push(iso);
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
      const cycle = i % 6;
      if (cycle === 0) {
        phase = "review";
        kind = "review";
        topic = choosePriority(date);
        title = topic ? `${topic.name} – muistista palautus ilman materiaalia` : "Palauta koealue muistista";
      } else if (cycle === 1) {
        phase = "application";
        topic = choosePriority(date);
        title = topic ? `${topic.name} – vaihtelevat tehtävät` : "Vaihtelevat tehtävät: valitse oikea menetelmä";
      } else if (cycle === 2) {
        phase = "application";
        topic = choosePriority(date);
        title = topic ? `${topic.name} – soveltava tehtävä` : "Sovella osaamista uuteen tilanteeseen";
      } else if (cycle === 3) {
        phase = "practice";
        kind = "test";
        topic = choosePriority(date);
        title = "Koesimulaatio";
      } else if (cycle === 4) {
        phase = "review";
        kind = "review";
        topic = choosePriority(date);
        title = topic ? `${topic.name} – korjaa virheet` : "Korjaa harjoituskokeen virheet";
      } else {
        phase = "light";
        kind = "review";
        topic = choosePriority(date);
        title = topic ? `${topic.name} – kevyt varmistus` : "Kevyt varmistus ja palautuminen";
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
    const dailyCapacity = opts.capacity ? capacityForDate(opts.capacity, date) : perDay;
    const targetMinutes = light
      ? Math.min(20, dailyCapacity)
      : Math.max(15, Math.min(perDay, dailyCapacity));
    drafts.push({
      course_id: opts.course.id,
      topic_id: topic?.id ?? null,
      date,
      phase,
      kind,
      title,
      min_minutes: Math.min(targetMinutes, light ? 10 : Math.max(10, Math.round(targetMinutes * 0.55))),
      target_minutes: targetMinutes,
      extra_minutes: light ? 0 : Math.max(0, Math.min(Math.round(targetMinutes * 0.35), dailyCapacity - targetMinutes)),
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
  capacity?: CapacityProfile,
): PlanDraft[] {
  const result = drafts.map((d) => ({ ...d }));
  const load = new Map<string, number>();
  for (const p of otherPlan) {
    if (p.status === "completed" || p.status === "skipped" || p.kind === "exam") continue;
    load.set(p.date, (load.get(p.date) ?? 0) + p.target_minutes);
  }
  const allowedDates = [...new Set(result.filter((d) => d.kind !== "exam").map((d) => d.date))].sort();

  const phasePriority: Record<PlanPhase, number> = {
    exam: 99,
    practice: 5,
    application: 4,
    content: 3,
    review: 2,
    light: 1,
  };

  for (const item of result
    .filter((d) => d.kind !== "exam")
    .sort((a, b) => a.date.localeCompare(b.date) || phasePriority[a.phase] - phasePriority[b.phase])) {
    const limit = capacity ? capacityForDate(capacity, item.date) : maxDailyMinutes;
    const current = load.get(item.date) ?? 0;
    if (current + item.target_minutes <= limit) {
      load.set(item.date, current + item.target_minutes);
      continue;
    }

    // 1) Low-priority review work may be shortened to its meaningful minimum.
    if (item.phase === "review" || item.phase === "light") {
      const floor = capacity ? capacityFloorForDate(capacity, item.date) : item.min_minutes;
      const shortened = Math.max(5, Math.min(item.target_minutes, item.min_minutes, floor));
      if (current + shortened <= limit) {
        item.target_minutes = shortened;
        item.extra_minutes = 0;
        load.set(item.date, current + shortened);
        continue;
      }
    }

    // 2) Move the lower-priority item to the closest realistic study day.
    const candidates = allowedDates
      .filter((d) => d !== item.date)
      .sort((a, b) => Math.abs(diffDays(a, item.date)) - Math.abs(diffDays(b, item.date)) || a.localeCompare(b));
    const better = candidates.find((d) => {
      const dayLimit = capacity ? capacityForDate(capacity, d) : maxDailyMinutes;
      return (load.get(d) ?? 0) + item.target_minutes <= dayLimit;
    });
    if (better) {
      item.date = better;
      load.set(better, (load.get(better) ?? 0) + item.target_minutes);
      continue;
    }

    // 3) If there is no full slot, preserve a minimum maintenance review rather than stacking hours.
    if (item.phase === "review" || item.phase === "light") {
      item.target_minutes = Math.max(5, item.min_minutes);
      item.extra_minutes = 0;
    }
    load.set(item.date, current + item.target_minutes);
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

export function examPhaseStatus(input: {
  topics: Topic[];
  tests: PracticeTest[];
  mistakes: Mistake[];
}) {
  const coverage = weightedCoverage(input.topics);
  const retrievalReady = input.topics.length
    ? input.topics.filter(t => t.basic_successes > 0 || t.delayed_successes > 0).length / input.topics.length
    : 0;
  const mixedReady = input.topics.length
    ? input.topics.filter(t => t.verified_level >= 3).length / input.topics.length
    : 0;
  const transferReady = input.topics.length
    ? input.topics.filter(t => t.exam_successes > 0).length / input.topics.length
    : 0;
  const simulated = input.tests.some(t => t.score != null && t.max_score);
  const activeMistakes = input.mistakes.filter(m => m.status !== "mastered").length;

  return [
    { key:"coverage", label:"Sisältökierros", done: coverage >= 90, note:`${coverage}% koealueesta käsitelty` },
    { key:"retrieval", label:"Muistista palautus", done: retrievalReady >= 0.7, note:`${Math.round(retrievalReady*100)}% aiheista palautettu muistista` },
    { key:"mixed", label:"Vaihtelevat tehtävät", done: mixedReady >= 0.65, note:"Menetelmän valinta mukana harjoittelussa" },
    { key:"transfer", label:"Soveltaminen", done: transferReady >= 0.5, note:`${Math.round(transferReady*100)}% aiheista koetason näyttöä` },
    { key:"simulation", label:"Koesimulaatio", done: simulated, note: simulated ? "Koesimulaatio kirjattu" : "Koesimulaatio vielä tekemättä" },
    { key:"repair", label:"Virheiden korjaus", done: simulated && activeMistakes === 0, note: activeMistakes ? `${activeMistakes} avointa virhettä` : "Ei avoimia virheitä" },
  ];
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
