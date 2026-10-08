import {
  capacityForDate,
  generatePlan,
  type PlanDraft,
  type Topic,
} from "./domain";
import { diffDays, today } from "./fi";

export type CoursePlanOptions = Parameters<typeof generatePlan>[0];

type Ke04EventType = "lesson" | "lab" | "self-study" | "special" | "holiday" | "exam";

type Ke04SchoolEvent = {
  date: string;
  type: Ke04EventType;
  topicKeys: string[];
  label: string;
};

export const KE04_PSA_2026_SCHOOL_SCHEDULE: Ke04SchoolEvent[] = [
  { date: "2026-10-05", type: "lesson", topicKeys: ["1.1"], label: "Reaktioyhtälön kirjoittaminen" },
  { date: "2026-10-07", type: "lab", topicKeys: ["1.1"], label: "Työ 1: reaktioyhtälön kertoimet" },
  { date: "2026-10-09", type: "lesson", topicKeys: ["1.2"], label: "Reaktioyhtälön käyttö" },
  { date: "2026-10-12", type: "lab", topicKeys: ["1.2"], label: "Työ 2: reaktion saanto" },
  { date: "2026-10-14", type: "lesson", topicKeys: ["1.3"], label: "Rajoittava tekijä" },
  { date: "2026-10-16", type: "lesson", topicKeys: ["1.4"], label: "Kaasureaktiot" },
  { date: "2026-10-19", type: "holiday", topicKeys: [], label: "Syysloma alkaa" },
  { date: "2026-10-26", type: "lab", topicKeys: ["1.4"], label: "Työ 5: ideaalikaasun tilanyhtälö" },
  { date: "2026-10-28", type: "special", topicKeys: [], label: "Kemiakilpa" },
  { date: "2026-10-30", type: "self-study", topicKeys: ["2.1"], label: "Reaktiotyypit" },
  { date: "2026-11-02", type: "lesson", topicKeys: ["3.1"], label: "Substituutioreaktio" },
  { date: "2026-11-04", type: "lesson", topicKeys: ["3.2"], label: "Additio- ja eliminaatioreaktio" },
  { date: "2026-11-06", type: "lesson", topicKeys: ["3.3"], label: "Kondensaatio- ja hydrolyysireaktiot" },
  { date: "2026-11-09", type: "special", topicKeys: [], label: "Vierailija" },
  { date: "2026-11-11", type: "lesson", topicKeys: ["4.1"], label: "Polymeerit" },
  { date: "2026-11-13", type: "self-study", topicKeys: ["4.2"], label: "Muovit" },
  { date: "2026-11-16", type: "lesson", topicKeys: ["5.1"], label: "Hiilihydraatit" },
  { date: "2026-11-18", type: "lesson", topicKeys: ["5.2"], label: "Aminohapot ja proteiinit" },
  { date: "2026-11-20", type: "lesson", topicKeys: ["5.3", "5.4"], label: "Nukleiinihapot ja lipidit" },
  { date: "2026-11-23", type: "exam", topicKeys: [], label: "KE04 koe" },
];

export const KE04_PSA_2026_TOPIC_ANCHORS: Record<string, { schoolDate: string; previewFrom: string }> = {
  "1.1": { schoolDate: "2026-10-05", previewFrom: "2026-10-05" },
  "1.2": { schoolDate: "2026-10-09", previewFrom: "2026-10-08" },
  "1.3": { schoolDate: "2026-10-14", previewFrom: "2026-10-11" },
  "1.4": { schoolDate: "2026-10-16", previewFrom: "2026-10-15" },
  "2.1": { schoolDate: "2026-10-30", previewFrom: "2026-10-22" },
  "3.1": { schoolDate: "2026-11-02", previewFrom: "2026-10-24" },
  "3.2": { schoolDate: "2026-11-04", previewFrom: "2026-11-01" },
  "3.3": { schoolDate: "2026-11-06", previewFrom: "2026-11-05" },
  "4.1": { schoolDate: "2026-11-11", previewFrom: "2026-11-10" },
  "4.2": { schoolDate: "2026-11-13", previewFrom: "2026-11-12" },
  "5.1": { schoolDate: "2026-11-16", previewFrom: "2026-11-15" },
  "5.2": { schoolDate: "2026-11-18", previewFrom: "2026-11-17" },
  "5.3": { schoolDate: "2026-11-20", previewFrom: "2026-11-19" },
  "5.4": { schoolDate: "2026-11-20", previewFrom: "2026-11-19" },
};

type SessionMode = "learn" | "preview" | "apply" | "review" | "checkpoint" | "mock";

type SessionSpec = {
  date: string;
  mode: SessionMode;
  topicKey?: string;
  reviewPool?: string[];
  title: string;
  minutes?: number;
};

const CHAPTER_ONE = ["1.1", "1.2", "1.3", "1.4"];
const REACTION_CHAPTERS = ["2.1", "3.1", "3.2", "3.3"];
const POLYMERS = ["4.1", "4.2"];
const ALL_TOPICS = [
  "1.1", "1.2", "1.3", "1.4", "2.1", "3.1", "3.2", "3.3",
  "4.1", "4.2", "5.1", "5.2", "5.3", "5.4",
];

/**
 * One main task per day keeps Today/Planner readable. A small due review can be
 * appended as a second 10-minute task when spaced retrieval actually calls for
 * it. The school anchors stop the planner from racing several chapters ahead.
 */
const KE04_PSA_2026_SESSION_SPECS: SessionSpec[] = [
  { date: "2026-10-08", mode: "review", topicKey: "1.1", title: "1.1 Reaktioyhtälöt ja kertoimet – vahvista koulussa käsitelty" },
  { date: "2026-10-09", mode: "learn", topicKey: "1.2", title: "1.2 Reaktioyhtälön käyttö – opi koulun tahdissa" },
  { date: "2026-10-10", mode: "apply", topicKey: "1.2", title: "1.2 Reaktioyhtälön käyttö – laskuharjoittelu" },
  { date: "2026-10-11", mode: "preview", topicKey: "1.2", title: "Reaktion saanto – ennakointi ennen 12.10. laboratoriotyötä" },
  { date: "2026-10-13", mode: "preview", topicKey: "1.3", title: "1.3 Rajoittava tekijä – ennakointi ennen 14.10. tuntia" },
  { date: "2026-10-15", mode: "preview", topicKey: "1.4", title: "1.4 Kaasureaktiot – kevyt ennakointi ennen 16.10. tuntia" },
  { date: "2026-10-16", mode: "learn", topicKey: "1.4", title: "1.4 Kaasureaktiot – koulussa käsitellyn asian vahvistus" },
  { date: "2026-10-17", mode: "apply", topicKey: "1.4", title: "1.4 Kaasureaktiot – laskut ja luvun 1 yhdistäminen" },
  { date: "2026-10-18", mode: "checkpoint", reviewPool: CHAPTER_ONE, title: "Luku 1 – välikoe ja heikkojen kohtien tunnistus", minutes: 40 },

  { date: "2026-10-19", mode: "review", reviewPool: CHAPTER_ONE, title: "Syysloma 1/7 – luvun 1 kokonaiskertaus", minutes: 35 },
  { date: "2026-10-20", mode: "preview", topicKey: "1.4", title: "Syysloma 2/7 – ideaalikaasun tilanyhtälö ennen 26.10. työtä", minutes: 40 },
  { date: "2026-10-21", mode: "review", reviewPool: CHAPTER_ONE, title: "Syysloma 3/7 – luvun 1 vaikeimmat tehtävät", minutes: 35 },
  { date: "2026-10-22", mode: "preview", topicKey: "2.1", title: "Syysloma 4/7 – 2.1 Reaktiotyypit ennakkoon", minutes: 40 },
  { date: "2026-10-23", mode: "apply", topicKey: "2.1", title: "Syysloma 5/7 – reaktiotyypit + lyhyt spaced review", minutes: 35 },
  { date: "2026-10-24", mode: "preview", topicKey: "3.1", title: "Syysloma 6/7 – 3.1 Substituution kevyt ennakointi", minutes: 35 },
  { date: "2026-10-25", mode: "checkpoint", reviewPool: [...CHAPTER_ONE, "2.1", "3.1"], title: "Syysloma 7/7 – sekakertaus ja osaamiskartoitus", minutes: 40 },

  { date: "2026-10-27", mode: "apply", topicKey: "2.1", title: "2.1 Reaktiotyypit + ideaalikaasutyön purku" },
  { date: "2026-10-29", mode: "apply", topicKey: "3.1", title: "3.1 Substituutio – vahvista ennakointi ennen koulutuntia" },
  { date: "2026-10-30", mode: "learn", topicKey: "2.1", title: "2.1 Reaktiotyypit – itsenäisen opiskelun vahvistus" },
  { date: "2026-10-31", mode: "apply", topicKey: "3.1", title: "3.1 Substituutio – kunnollinen harjoittelu" },
  { date: "2026-11-01", mode: "preview", topicKey: "3.2", title: "3.2 Additio ja eliminaatio – ennakointi ennen 4.11. tuntia" },
  { date: "2026-11-03", mode: "apply", topicKey: "3.2", title: "3.1–3.2 Orgaaniset reaktiot – erottelu ja soveltaminen" },
  { date: "2026-11-05", mode: "preview", topicKey: "3.3", title: "3.3 Kondensaatio ja hydrolyysi – ennakointi ennen 6.11. tuntia" },
  { date: "2026-11-06", mode: "learn", topicKey: "3.3", title: "3.3 Kondensaatio ja hydrolyysi – koulussa käsitellyn vahvistus" },
  { date: "2026-11-07", mode: "review", reviewPool: REACTION_CHAPTERS, title: "Reaktiotyypit 2.1–3.3 – sekaharjoittelu" },
  { date: "2026-11-08", mode: "checkpoint", reviewPool: REACTION_CHAPTERS, title: "Luvut 2–3 – välikoe ja virheiden analyysi", minutes: 40 },

  { date: "2026-11-10", mode: "preview", topicKey: "4.1", title: "4.1 Polymeerit – ennakointi ennen 11.11. tuntia" },
  { date: "2026-11-12", mode: "apply", topicKey: "4.1", title: "4.1 Polymeerit – koulussa käsitellyn asian vahvistus" },
  { date: "2026-11-13", mode: "learn", topicKey: "4.2", title: "4.2 Muovit – itsenäinen opiskelu" },
  { date: "2026-11-14", mode: "apply", topicKey: "4.2", title: "4.1–4.2 Polymeerit ja muovit – rakenne ja ominaisuudet" },
  { date: "2026-11-15", mode: "preview", topicKey: "5.1", title: "5.1 Hiilihydraatit – ennakointi + luvut 1–4 lyhyesti" },

  { date: "2026-11-17", mode: "preview", topicKey: "5.2", title: "5.2 Aminohapot ja proteiinit – ennakointi ennen 18.11. tuntia" },
  { date: "2026-11-19", mode: "preview", topicKey: "5.3", title: "5.3 Nukleiinihapot – ennakointi ennen 20.11. tuntia" },
  { date: "2026-11-20", mode: "learn", topicKey: "5.4", title: "5.3–5.4 Nukleiinihapot ja lipidit – viimeisen koulusisällön vahvistus", minutes: 40 },
  { date: "2026-11-21", mode: "mock", reviewPool: ALL_TOPICS, title: "KE04 – koko kurssin harjoituskoe", minutes: 75 },
  { date: "2026-11-22", mode: "review", reviewPool: ALL_TOPICS, title: "Harjoituskokeen virheet – täsmäkertaus, ei uutta sisältöä", minutes: 45 },
];

export function ke04TopicKey(name: string): string | null {
  return name.trim().match(/^(\d+\.\d+)/)?.[1] ?? null;
}

export function isKe04Psa2026Plan(opts: Pick<CoursePlanOptions, "course" | "examDate">): boolean {
  return (
    opts.course.code.trim().toUpperCase() === "KE04" &&
    opts.examDate === "2026-11-23" &&
    (!opts.course.start_date || opts.course.start_date === "2026-10-05")
  );
}

function topicMap(topics: Topic[]) {
  const map = new Map<string, Topic>();
  for (const topic of topics) {
    const key = ke04TopicKey(topic.name);
    if (key && !map.has(key)) map.set(key, topic);
  }
  return map;
}

function plannedMinutesForDate(opts: CoursePlanOptions, date: string, requested?: number) {
  const fallback = Math.max(20, Math.round(opts.weeklyMinutes / Math.max(1, opts.studyWeekdays.length)));
  const capacity = opts.capacity ? capacityForDate(opts.capacity, date) : fallback;
  const safeCapacity = capacity > 0 ? capacity : fallback;
  return Math.max(15, Math.min(requested ?? fallback, safeCapacity));
}

function draftFor(
  opts: CoursePlanOptions,
  date: string,
  mode: SessionMode,
  title: string,
  topic: Topic | undefined,
  requestedMinutes?: number,
): PlanDraft {
  const target = plannedMinutesForDate(opts, date, requestedMinutes);
  const phase: PlanDraft["phase"] =
    mode === "mock" || mode === "checkpoint" ? "practice" :
    mode === "review" ? "review" :
    mode === "apply" ? "application" :
    "content";
  const kind = mode === "mock" || mode === "checkpoint" ? "test" : mode === "review" ? "review" : "study";
  const dailyCapacity = opts.capacity ? capacityForDate(opts.capacity, date) : target;
  return {
    course_id: opts.course.id,
    topic_id: topic?.id ?? null,
    date,
    phase,
    kind,
    title,
    min_minutes: Math.min(target, mode === "review" ? 10 : Math.max(15, Math.round(target * 0.55))),
    target_minutes: target,
    extra_minutes: Math.max(0, Math.min(15, Math.max(0, dailyCapacity - target))),
    start_time: null,
  };
}

function isLearned(topic: Topic, learnedIds: Set<string>) {
  return learnedIds.has(topic.id) || Number(topic.progress || 0) > 0 || Boolean(topic.last_review);
}

function reviewScore(
  topic: Topic,
  date: string,
  simulatedNextReview: Map<string, string | null>,
  activeMistakeTopics: Set<string>,
) {
  const nextReview = simulatedNextReview.get(topic.id) ?? topic.next_review;
  const overdue = nextReview && nextReview <= date ? Math.max(0, diffDays(date, nextReview)) : -3;
  return (
    (nextReview && nextReview <= date ? 24 : 0) +
    Math.max(0, overdue) * 3 +
    (activeMistakeTopics.has(topic.id) ? 24 : 0) +
    Math.max(0, 5 - Number(topic.verified_level || 0)) * 4 +
    Number(topic.importance || 3) * 2 +
    Number(topic.mastery_uncertainty || 0) * 5
  );
}

function chooseReviewTopic(input: {
  keys: string[];
  date: string;
  byKey: Map<string, Topic>;
  learnedIds: Set<string>;
  simulatedNextReview: Map<string, string | null>;
  activeMistakeTopics: Set<string>;
  dueOnly?: boolean;
  excludeId?: string | null;
}) {
  const candidates = input.keys
    .map((key) => input.byKey.get(key))
    .filter((topic): topic is Topic => Boolean(topic))
    .filter((topic) => topic.id !== input.excludeId)
    .filter((topic) => isLearned(topic, input.learnedIds))
    .filter((topic) => {
      if (!input.dueOnly) return true;
      const nextReview = input.simulatedNextReview.get(topic.id) ?? topic.next_review;
      return Boolean(nextReview && nextReview <= input.date);
    });
  return [...candidates].sort((a, b) =>
    reviewScore(b, input.date, input.simulatedNextReview, input.activeMistakeTopics) -
    reviewScore(a, input.date, input.simulatedNextReview, input.activeMistakeTopics) ||
    a.position - b.position,
  )[0];
}

function advanceAfterExposure(
  topic: Topic,
  date: string,
  simulatedNextReview: Map<string, string | null>,
  plannedReviews: Map<string, number>,
  activeMistakeTopics: Set<string>,
  isReview: boolean,
) {
  if (!isReview) {
    const days = Number(topic.verified_level || 0) >= 3 ? 4 : 2;
    const next = new Date(`${date}T12:00:00`);
    next.setDate(next.getDate() + days);
    simulatedNextReview.set(topic.id, next.toISOString().slice(0, 10));
    return;
  }

  const count = (plannedReviews.get(topic.id) ?? 0) + 1;
  plannedReviews.set(topic.id, count);
  const normalGap = [3, 7, 14, 21][Math.min(3, count - 1)] ?? 21;
  const lowMastery = Number(topic.verified_level || 0) <= 2;
  const gap = activeMistakeTopics.has(topic.id) ? Math.min(3, normalGap) : lowMastery ? Math.min(7, normalGap) : normalGap;
  const next = new Date(`${date}T12:00:00`);
  next.setDate(next.getDate() + gap);
  simulatedNextReview.set(topic.id, next.toISOString().slice(0, 10));
}

export function generateKe04Psa2026Plan(opts: CoursePlanOptions): PlanDraft[] {
  const startISO = opts.fromISO ?? (opts.course.start_date && opts.course.start_date > today() ? opts.course.start_date : today());
  if (diffDays(opts.examDate, startISO) <= 0) return [];

  const byKey = topicMap(opts.topics);
  const activeMistakeTopics = new Set(
    (opts.mistakes ?? []).filter((mistake) => mistake.status !== "mastered" && mistake.topic_id).map((mistake) => mistake.topic_id!),
  );
  const learnedIds = new Set(
    opts.topics.filter((topic) => Number(topic.progress || 0) > 0 || Boolean(topic.last_review)).map((topic) => topic.id),
  );
  const simulatedNextReview = new Map(opts.topics.map((topic) => [topic.id, topic.next_review] as const));
  const plannedReviews = new Map<string, number>();
  const drafts: PlanDraft[] = [];

  for (const spec of KE04_PSA_2026_SESSION_SPECS) {
    if (spec.date < startISO || spec.date >= opts.examDate) continue;

    let topic = spec.topicKey ? byKey.get(spec.topicKey) : undefined;
    if (!topic && spec.reviewPool?.length) {
      topic = chooseReviewTopic({
        keys: spec.reviewPool,
        date: spec.date,
        byKey,
        learnedIds,
        simulatedNextReview,
        activeMistakeTopics,
      });
    }

    // If a preview has already been mastered, keep the school-paced slot but
    // turn it into reinforcement. Never skip ahead to a much later chapter.
    const mode = spec.mode === "preview" && topic && Number(topic.verified_level || 0) >= 4
      ? "apply"
      : spec.mode;
    const title = mode !== spec.mode
      ? `${topic?.name ?? spec.title} – ennakointi on jo hallussa, tee soveltava vahvistus`
      : spec.title;

    drafts.push(draftFor(opts, spec.date, mode, title, topic, spec.minutes));
    if (topic) {
      learnedIds.add(topic.id);
      advanceAfterExposure(topic, spec.date, simulatedNextReview, plannedReviews, activeMistakeTopics, mode === "review");
    }

    // Add at most one compact spaced-retrieval task. The simulated review date
    // is advanced immediately so the same overdue topic cannot monopolise every
    // later day, which was one of the old KE04 planner defects.
    if (!["review", "checkpoint", "mock"].includes(mode)) {
      const due = chooseReviewTopic({
        keys: ALL_TOPICS,
        date: spec.date,
        byKey,
        learnedIds,
        simulatedNextReview,
        activeMistakeTopics,
        dueOnly: true,
        excludeId: topic?.id ?? null,
      });
      if (due) {
        const mainMinutes = drafts[drafts.length - 1]!.target_minutes;
        const capacity = opts.capacity ? capacityForDate(opts.capacity, spec.date) : mainMinutes + 10;
        if (capacity <= 0 || mainMinutes + 10 <= Math.max(capacity, mainMinutes + 10)) {
          drafts.push({
            ...draftFor(opts, spec.date, "review", `${due.name} – 10 min ajastettu muistista palautus`, due, 10),
            min_minutes: 10,
            target_minutes: 10,
            extra_minutes: 0,
          });
          advanceAfterExposure(due, spec.date, simulatedNextReview, plannedReviews, activeMistakeTopics, true);
        }
      }
    }
  }

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

export function generateCoursePlan(opts: CoursePlanOptions): PlanDraft[] {
  return isKe04Psa2026Plan(opts) ? generateKe04Psa2026Plan(opts) : generatePlan(opts);
}

export function ke04SchoolPacingReason(topicName: string, date: string) {
  const key = ke04TopicKey(topicName);
  const anchor = key ? KE04_PSA_2026_TOPIC_ANCHORS[key] : undefined;
  if (!anchor) return null;
  if (date < anchor.schoolDate) return `ennakointi ennen ${anchor.schoolDate} koulukäsittelyä`;
  if (date === anchor.schoolDate) return "sama aihe käsitellään koulussa tänään";
  return "koulussa käsitellyn asian vahvistus ja myöhempi muistista palautus";
}
