import type {
  CapacityProfile,
  Course,
  Mistake,
  PlanItem,
  PracticeAttempt,
  PracticeTest,
  Session,
  Topic,
} from "./domain.ts";
import {
  buildRecoveryQueue,
  capacityForDateV3,
  deriveTopicLearningState,
  examStage,
  todayPriority,
  type LearningAttemptType,
  type TopicLearningState,
} from "./learning-engine.ts";
import { addDays, diffDays, today } from "./fi.ts";

export const LEARNING_OS_VERSION = 4;

export type MasteryDimension =
  | "recall"
  | "understanding"
  | "application"
  | "fluency"
  | "retention"
  | "calibration";

export type DimensionEstimate = {
  score: number;
  confidence: number;
  evidence: number;
};

export type MasteryModelV4 = {
  topicId: string;
  level: number;
  label: "Not assessed" | "Learning" | "Developing" | "Secure" | "Strong" | "At risk";
  score: number;
  confidence: number;
  uncertainty: number;
  forgettingRisk: number;
  dimensions: Record<MasteryDimension, DimensionEstimate>;
  blindSpot: boolean;
  underConfidence: boolean;
  verificationRequired: boolean;
  weakestDimension: MasteryDimension;
  evidenceCount: number;
};

export type ErrorCategory =
  | "concept_error"
  | "recall_error"
  | "formula_error"
  | "algebra_error"
  | "unit_error"
  | "interpretation_error"
  | "strategy_error"
  | "careless_error"
  | "incomplete_reasoning"
  | "prerequisite_gap";

export type ScaffoldStage =
  | "worked_example"
  | "explanation"
  | "partial_completion"
  | "guided"
  | "independent"
  | "mixed"
  | "transfer"
  | "delayed_verification";

export type PracticePath = {
  stage: ScaffoldStage;
  label: string;
  reason: string;
  hintLimit: number;
  evidenceMultiplier: number;
  requiresIndependentFollowup: boolean;
};

export type NextBestAction = {
  id: string;
  course: Course;
  topic: Topic | null;
  planItem: PlanItem | null;
  kind: "study" | "review" | "practice" | "repair" | "verification";
  title: string;
  minutes: number;
  priority: number;
  learningGain: number;
  reason: string;
};

export type AdaptiveDayPlan = {
  minimum: NextBestAction[];
  recommended: NextBestAction[];
  extra: NextBestAction[];
  minimumMinutes: number;
  recommendedMinutes: number;
  extraMinutes: number;
  capacity: number;
  stoppedForLowMarginalGain: boolean;
};

export type FatigueSignal = {
  level: "none" | "watch" | "high";
  score: number;
  reason: string;
  suggestedBreakMinutes: number;
  preferredSessionMinutes: number | null;
};

export type LearningProfile = {
  sampleSize: number;
  observations: Array<{ label: string; evidence: string; confidence: "low" | "medium" | "high" }>;
};

export type YoOverview = {
  enabled: boolean;
  phase: "foundation" | "consolidation" | "exam_practice" | "final_review";
  daysToNearestExam: number | null;
  stable: number;
  atRisk: number;
  unassessed: number;
  priorities: Array<{ course: Course; topic: Topic; reason: string; score: number }>;
};

export type SimulationResult = {
  profile: "good_recall_weak_application" | "frequent_forgetting" | "high_confidence_errors";
  days: number;
  completed: number;
  skipped: number;
  reviewCount: number;
  overloadDays: number;
  meanMastery: number;
  meanConfidence: number;
  stableTopics: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

function resultScore(attempt: PracticeAttempt) {
  const outcome = attempt.outcome ?? (
    attempt.result === "independent" ? "correct" :
    attempt.result === "hinted" ? "partial" :
    "incorrect"
  );
  return outcome === "correct" ? 1 : outcome === "partial" ? 0.52 : 0.04;
}

function hintCount(attempt: PracticeAttempt) {
  return Math.max(attempt.hints_used ?? 0, attempt.hint_used ? 1 : 0);
}

function isAssisted(attempt: PracticeAttempt) {
  const payload = attempt.question_payload ?? {};
  return hintCount(attempt) > 0 ||
    payload["coachUsed"] === true ||
    payload["assisted"] === true ||
    payload["scaffoldStage"] === "guided" ||
    payload["scaffoldStage"] === "worked_example" ||
    payload["scaffoldStage"] === "partial_completion";
}

function typeWeights(type: LearningAttemptType): Partial<Record<MasteryDimension, number>> {
  switch (type) {
    case "free_recall":
    case "short_answer":
      return { recall: 1, understanding: 0.25 };
    case "explanation":
      return { understanding: 1, recall: 0.38 };
    case "calculation":
      return { application: 0.82, fluency: 0.68, understanding: 0.3 };
    case "application":
      return { application: 1, understanding: 0.42 };
    case "error_detection":
      return { understanding: 0.68, application: 0.62 };
    case "simulation":
      return { application: 1, fluency: 0.78, recall: 0.45 };
    case "ordering":
      return { understanding: 0.72, recall: 0.38 };
    case "multiple_choice":
      return { recall: 0.45, understanding: 0.15 };
    case "recognition":
      return { recall: 0.38, application: 0.22 };
    default:
      return { recall: 0.5 };
  }
}

function dimensionEstimate(
  attempts: PracticeAttempt[],
  dimension: MasteryDimension,
  now: string,
): DimensionEstimate {
  if (dimension === "calibration") {
    const rows = attempts.filter((a) => typeof a.confidence === "number");
    if (!rows.length) return { score: 50, confidence: 0, evidence: 0 };
    let weighted = 0;
    let weight = 0;
    for (const attempt of rows) {
      const actual = resultScore(attempt);
      const predicted = clamp(((attempt.confidence ?? 1) - 1) / 2);
      const quality = 0.4 + Math.min(0.6, Number(attempt.evidence_quality ?? 0.45));
      weighted += (1 - Math.abs(predicted - actual)) * quality;
      weight += quality;
    }
    return {
      score: Math.round(clamp(weighted / Math.max(0.01, weight)) * 100),
      confidence: clamp(1 - Math.exp(-rows.length / 4)),
      evidence: rows.length,
    };
  }

  let weighted = 0;
  let weight = 0;
  for (const attempt of attempts) {
    const weights = typeWeights(attempt.attempt_type);
    let w = weights[dimension] ?? 0;
    if (dimension === "retention" && Number(attempt.delay_days ?? 0) >= 2) {
      w = Math.max(w, Math.min(1, 0.45 + Number(attempt.delay_days ?? 0) * 0.06));
    }
    if (w <= 0) continue;
    const age = Math.max(0, diffDays(now, attempt.date));
    const recency = Math.max(0.72, 1 - age * 0.006);
    const assistance = isAssisted(attempt) ? 0.64 : 1;
    const difficulty = 0.78 + Math.min(0.22, Math.max(0, attempt.difficulty - 1) * 0.055);
    const quality = Math.max(0.08, Number(attempt.evidence_quality ?? 0.45));
    const effective = w * recency * assistance * difficulty * quality;
    weighted += resultScore(attempt) * effective;
    weight += effective;
  }

  if (weight <= 0) return { score: 0, confidence: 0, evidence: 0 };
  return {
    score: Math.round(clamp(weighted / weight) * 100),
    confidence: clamp(1 - Math.exp(-weight / 1.9)),
    evidence: weight,
  };
}

export function masteryModelV4(
  topic: Topic,
  attempts: PracticeAttempt[],
  options: { now?: string; examDate?: string | null } = {},
): MasteryModelV4 {
  const now = options.now ?? today();
  const rows = attempts.filter((a) => a.topic_id === topic.id);
  const legacy = deriveTopicLearningState(topic, attempts, options);
  const dimensions = {
    recall: dimensionEstimate(rows, "recall", now),
    understanding: dimensionEstimate(rows, "understanding", now),
    application: dimensionEstimate(rows, "application", now),
    fluency: dimensionEstimate(rows, "fluency", now),
    retention: dimensionEstimate(rows, "retention", now),
    calibration: dimensionEstimate(rows, "calibration", now),
  } satisfies Record<MasteryDimension, DimensionEstimate>;

  // Conservative fallbacks: missing dimensions never inherit full recall mastery.
  if (!dimensions.understanding.evidence && dimensions.recall.evidence) {
    dimensions.understanding = {
      score: Math.min(68, Math.round(dimensions.recall.score * 0.78)),
      confidence: dimensions.recall.confidence * 0.35,
      evidence: 0,
    };
  }
  if (!dimensions.application.evidence && dimensions.recall.evidence) {
    dimensions.application = {
      score: Math.min(55, Math.round(dimensions.recall.score * 0.62)),
      confidence: dimensions.recall.confidence * 0.22,
      evidence: 0,
    };
  }
  if (!dimensions.retention.evidence && dimensions.recall.evidence) {
    dimensions.retention = {
      score: Math.min(52, Math.round(dimensions.recall.score * 0.6)),
      confidence: dimensions.recall.confidence * 0.18,
      evidence: 0,
    };
  }
  if (!dimensions.fluency.evidence && dimensions.application.evidence) {
    dimensions.fluency = {
      score: Math.min(62, Math.round(dimensions.application.score * 0.78)),
      confidence: dimensions.application.confidence * 0.3,
      evidence: 0,
    };
  }

  const weights: Record<MasteryDimension, number> = {
    recall: 0.23,
    understanding: 0.2,
    application: 0.24,
    fluency: 0.09,
    retention: 0.18,
    calibration: 0.06,
  };
  const composite = (Object.keys(weights) as MasteryDimension[])
    .reduce((sum, key) => sum + dimensions[key].score * weights[key], 0);

  const uniqueDays = new Set(rows.map((a) => a.date)).size;
  const uniqueTypes = new Set(rows.map((a) => a.attempt_type)).size;
  const independent = rows.filter((a) => resultScore(a) >= 0.9 && !isAssisted(a)).length;
  const transfer = rows.filter((a) =>
    resultScore(a) >= 0.9 &&
    !isAssisted(a) &&
    ["application", "simulation", "error_detection"].includes(a.attempt_type)
  ).length;
  const delayed = rows.filter((a) =>
    resultScore(a) >= 0.9 &&
    !isAssisted(a) &&
    Number(a.delay_days ?? 0) >= 2
  ).length;
  const confidence = clamp(
    legacy.masteryConfidence * 0.38 +
    clamp(uniqueDays / 4) * 0.18 +
    clamp(uniqueTypes / 4) * 0.12 +
    clamp(independent / 4) * 0.14 +
    clamp(transfer / 2) * 0.09 +
    clamp(delayed / 2) * 0.09,
  );
  const score = Math.round(composite * (0.58 + confidence * 0.42));

  const recent = rows.slice().sort((a,b) => a.date.localeCompare(b.date)).slice(-5);
  const highConfidenceWrong = recent.some((a) =>
    resultScore(a) < 0.2 && (a.confidence ?? 0) >= 3
  );
  const lowConfidenceCorrect = recent.some((a) =>
    resultScore(a) >= 0.9 && (a.confidence ?? 3) <= 1
  );
  const blindSpot = highConfidenceWrong ||
    (dimensions.calibration.evidence >= 2 && dimensions.calibration.score < 55);

  const lastAssistedSuccess = rows
    .map((a,index)=>({a,index}))
    .filter(({a}) => resultScore(a) >= 0.9 && isAssisted(a))
    .at(-1);
  const verificationRequired = !!lastAssistedSuccess &&
    !rows.slice(lastAssistedSuccess.index + 1).some((a) => resultScore(a) >= 0.9 && !isAssisted(a));

  let level =
    score >= 86 && confidence >= 0.64 && transfer >= 1 && delayed >= 1 ? 5 :
    score >= 72 && confidence >= 0.48 && independent >= 2 ? 4 :
    score >= 57 ? 3 :
    score >= 40 ? 2 :
    rows.length || topic.progress >= 15 ? 1 : 0;

  if (blindSpot && level >= 4) level = 3;
  if (legacy.forgettingRisk >= 0.72 && level >= 4) level -= 1;

  const label: MasteryModelV4["label"] =
    level === 0 ? "Not assessed" :
    legacy.forgettingRisk >= 0.72 && level >= 2 ? "At risk" :
    level <= 1 ? "Learning" :
    level === 2 ? "Developing" :
    level === 3 ? "Secure" :
    level >= 5 ? "Strong" :
    "Secure";

  const weakestDimension = (Object.keys(dimensions) as MasteryDimension[])
    .filter((key) => key !== "calibration")
    .sort((a,b) => dimensions[a].score - dimensions[b].score)[0] ?? "recall";

  return {
    topicId: topic.id,
    level,
    label,
    score,
    confidence,
    uncertainty: 1 - confidence,
    forgettingRisk: legacy.forgettingRisk,
    dimensions,
    blindSpot,
    underConfidence: lowConfidenceCorrect,
    verificationRequired,
    weakestDimension,
    evidenceCount: rows.length,
  };
}

export function practicePathV4(
  topic: Topic,
  attempts: PracticeAttempt[],
  options: { now?: string; examDate?: string | null } = {},
): PracticePath {
  const model = masteryModelV4(topic, attempts, options);
  if (model.verificationRequired) {
    return {
      stage: "delayed_verification",
      label: "Itsenäinen varmistus",
      reason: "Edellinen onnistuminen käytti vihjettä tai Coachia. Tarvitaan näyttö ilman apua.",
      hintLimit: 0,
      evidenceMultiplier: 1,
      requiresIndependentFollowup: true,
    };
  }
  if (model.evidenceCount === 0 || model.level <= 1) {
    return {
      stage: "worked_example",
      label: "Opittu esimerkki",
      reason: "Aiheesta ei ole vielä riittävää näyttöä. Ensin rakennetaan ratkaisun rakenne.",
      hintLimit: 5,
      evidenceMultiplier: 0.28,
      requiresIndependentFollowup: true,
    };
  }
  if (model.dimensions.understanding.score < 50) {
    return {
      stage: "explanation",
      label: "Selitä miksi",
      reason: "Muistaminen ei vielä tarkoita ymmärtämistä. Selitysnäyttö puuttuu.",
      hintLimit: 3,
      evidenceMultiplier: 0.5,
      requiresIndependentFollowup: true,
    };
  }
  if (model.level === 2) {
    return {
      stage: "guided",
      label: "Ohjattu harjoitus",
      reason: "Perusta löytyy, mutta menetelmän valinta tarvitsee vielä tukea.",
      hintLimit: 3,
      evidenceMultiplier: 0.58,
      requiresIndependentFollowup: true,
    };
  }
  if (model.confidence < 0.52 || model.dimensions.recall.score < 68) {
    return {
      stage: "independent",
      label: "Itsenäinen harjoitus",
      reason: "Seuraavaksi tarvitaan luotettavaa näyttöä ilman vihjeitä.",
      hintLimit: 0,
      evidenceMultiplier: 1,
      requiresIndependentFollowup: false,
    };
  }
  if (model.dimensions.application.score < 72) {
    return {
      stage: "transfer",
      label: "Transfer-tehtävä",
      reason: "Perusosaaminen on riittävä. Nyt testataan siirtyykö osaaminen uuteen tilanteeseen.",
      hintLimit: 0,
      evidenceMultiplier: 1,
      requiresIndependentFollowup: false,
    };
  }
  if (model.forgettingRisk >= 0.5 || model.dimensions.retention.score < 70) {
    return {
      stage: "delayed_verification",
      label: "Viivevarmistus",
      reason: "Osaaminen näyttää vahvalta, mutta sen säilyminen pitää varmistaa ajan yli.",
      hintLimit: 0,
      evidenceMultiplier: 1,
      requiresIndependentFollowup: false,
    };
  }
  return {
    stage: "mixed",
    label: "Mixed practice",
    reason: "Perusosaaminen on vahva. Sekoitetaan tehtävätyyppejä, jotta menetelmä pitää tunnistaa itse.",
    hintLimit: 1,
    evidenceMultiplier: 0.9,
    requiresIndependentFollowup: false,
  };
}

export function inferErrorCategory(
  attempt: PracticeAttempt,
): ErrorCategory | null {
  if (resultScore(attempt) >= 0.9) return null;
  const text = `${attempt.prompt} ${attempt.response ?? ""}`.toLocaleLowerCase("fi-FI");
  if (/yksikk|unit|mol\/|kg|m\/s/.test(text)) return "unit_error";
  if (/kaava|formula/.test(text)) return "formula_error";
  if (/algebra|merkki|laskuvirhe/.test(text)) return "algebra_error";
  if (/tulk|mitä kysytään|tehtävänanto/.test(text)) return "interpretation_error";
  if (attempt.attempt_type === "free_recall" || attempt.attempt_type === "short_answer") return "recall_error";
  if (attempt.attempt_type === "calculation" || attempt.attempt_type === "application" || attempt.attempt_type === "simulation") return "strategy_error";
  if (attempt.attempt_type === "explanation" || attempt.attempt_type === "error_detection") return "concept_error";
  return "incomplete_reasoning";
}

export function errorProfileV4(
  attempts: PracticeAttempt[],
  mistakes: Mistake[],
  options: { since?: string; courseId?: string; topicId?: string } = {},
) {
  const counts = new Map<ErrorCategory, number>();
  const add = (category: ErrorCategory) => counts.set(category, (counts.get(category) ?? 0) + 1);

  attempts
    .filter((a) => !options.since || a.date >= options.since)
    .filter((a) => !options.courseId || a.course_id === options.courseId)
    .filter((a) => !options.topicId || a.topic_id === options.topicId)
    .forEach((attempt) => {
      const payloadCategory = String(attempt.question_payload?.["errorCategory"] ?? "") as ErrorCategory;
      const category = ([
        "concept_error","recall_error","formula_error","algebra_error","unit_error",
        "interpretation_error","strategy_error","careless_error","incomplete_reasoning","prerequisite_gap",
      ] as ErrorCategory[]).includes(payloadCategory)
        ? payloadCategory
        : inferErrorCategory(attempt);
      if (category) add(category);
    });

  mistakes
    .filter((m) => !options.courseId || m.course_id === options.courseId)
    .filter((m) => !options.topicId || m.topic_id === options.topicId)
    .forEach((m) => {
      const raw = (m.type ?? "").toLocaleLowerCase("fi-FI");
      const category: ErrorCategory =
        raw.includes("yks") ? "unit_error" :
        raw.includes("algebra") ? "algebra_error" :
        raw.includes("kaava") ? "formula_error" :
        raw.includes("huolim") ? "careless_error" :
        raw.includes("muist") ? "recall_error" :
        raw.includes("tulk") ? "interpretation_error" :
        raw.includes("strateg") || raw.includes("menetel") ? "strategy_error" :
        raw.includes("esit") ? "prerequisite_gap" :
        "concept_error";
      add(category);
    });

  const total = [...counts.values()].reduce((sum,n)=>sum+n,0);
  return [...counts.entries()]
    .map(([category,count])=>({ category, count, share: total ? count/total : 0 }))
    .sort((a,b)=>b.count-a.count);
}

function dependentCount(topicId: string, topics: Topic[]) {
  return topics.filter((topic) => (topic.dependencies ?? []).includes(topicId)).length;
}

function prerequisitePressure(topic: Topic, topics: Topic[], attempts: PracticeAttempt[]) {
  const dependents = topics.filter((candidate) => (candidate.dependencies ?? []).includes(topic.id));
  return dependents.reduce((sum, candidate) => {
    const recent = attempts
      .filter((a) => a.topic_id === candidate.id)
      .slice(-5);
    const failures = recent.filter((a) => resultScore(a) < 0.9).length;
    return sum + Math.min(3, failures);
  }, 0);
}

export function nextBestActionsV4(input: {
  courses: Course[];
  topics: Topic[];
  plan: PlanItem[];
  attempts: PracticeAttempt[];
  mistakes: Mistake[];
  now?: string;
}): NextBestAction[] {
  const now = input.now ?? today();
  const planToday = input.plan.filter((p) => p.date === now && p.status === "planned" && p.kind !== "exam");
  const candidates: NextBestAction[] = [];

  for (const course of input.courses.filter((c) => !c.archived)) {
    const courseTopics = input.topics.filter((t) => t.course_id === course.id);
    const daysToExam = course.exam_date ? Math.max(0, diffDays(course.exam_date, now)) : 60;
    for (const topic of courseTopics) {
      const model = masteryModelV4(topic, input.attempts, { now, examDate: course.exam_date });
      const planned = planToday.find((p) => p.course_id === course.id && p.topic_id === topic.id) ?? null;
      const openMistakes = input.mistakes.filter((m) => m.course_id === course.id && m.topic_id === topic.id && m.status !== "mastered");
      const rootPressure = prerequisitePressure(topic, courseTopics, input.attempts);
      const deps = dependentCount(topic.id, courseTopics);
      const masteryGap = (5 - model.level) / 5;
      const urgency = daysToExam <= 3 ? 1 : daysToExam <= 7 ? .82 : daysToExam <= 14 ? .64 : daysToExam <= 30 ? .38 : .16;
      const errorPressure = Math.min(1, openMistakes.length / 3);
      const dependencyImpact = Math.min(1, deps / 4);
      const rootCause = Math.min(1, rootPressure / 3);
      const progressGap = Math.max(0, 1 - topic.progress / 100);
      const importance = Number(topic.importance || 3) / 5;
      const gain =
        masteryGap * .24 +
        model.forgettingRisk * .18 +
        model.uncertainty * .14 +
        urgency * .12 +
        importance * .12 +
        errorPressure * .08 +
        dependencyImpact * .045 +
        rootCause * .055 +
        progressGap * .02;

      const kind: NextBestAction["kind"] =
        model.verificationRequired ? "verification" :
        openMistakes.length ? "repair" :
        topic.next_review && topic.next_review <= now ? "review" :
        planned?.kind === "practice" ? "practice" :
        "study";
      const minutes = Math.max(5, planned?.target_minutes ?? (
        kind === "repair" ? 10 :
        kind === "review" || kind === "verification" ? 8 :
        kind === "practice" ? 15 :
        25
      ));
      const priority = (gain * 100 + (planned ? 14 : 0) + (kind === "repair" ? 18 : 0)) / Math.sqrt(minutes);
      const reasons = [
        model.verificationRequired ? "AI- tai vihjeavun jälkeen tarvitaan itsenäinen varmistus" : null,
        openMistakes.length ? "tästä aiheesta on avoin virhe" : null,
        topic.next_review && topic.next_review <= now ? "kertaus on ajankohtainen" : null,
        model.forgettingRisk >= .6 ? "unohtumisriski on noussut" : null,
        model.blindSpot ? "oma varmuus ja suoritus eivät kohtaa" : null,
        rootPressure > 0 ? "tämä esitieto näyttää selittävän myöhempiä virheitä" : null,
        daysToExam <= 14 ? `koe on ${daysToExam} päivän päästä` : null,
        planned ? "tämä kuuluu tämän päivän suunnitelmaan" : null,
      ].filter(Boolean) as string[];

      if (gain >= .14 || planned || openMistakes.length || model.forgettingRisk >= .48) {
        candidates.push({
          id: `nba:${course.id}:${topic.id}:${kind}`,
          course,
          topic,
          planItem: planned,
          kind,
          title: planned?.title || topic.name,
          minutes,
          priority,
          learningGain: gain,
          reason: reasons.slice(0,3).join(" · ") || "tällä on nyt korkein arvioitu oppimishyöty suhteessa aikaan",
        });
      }
    }
  }

  return candidates.sort((a,b)=>b.priority-a.priority);
}

function selectBudget(actions: NextBestAction[], budget: number, maxItems: number) {
  const chosen: NextBestAction[] = [];
  let used = 0;
  for (const action of actions) {
    if (chosen.length >= maxItems) break;
    const remaining = budget - used;
    if (remaining < 5) break;
    const minutes = Math.min(action.minutes, remaining);
    if (minutes < 5) continue;
    chosen.push({ ...action, minutes });
    used += minutes;
  }
  return chosen;
}

export function adaptiveDayPlanV4(input: {
  courses: Course[];
  topics: Topic[];
  plan: PlanItem[];
  attempts: PracticeAttempt[];
  mistakes: Mistake[];
  capacity: CapacityProfile;
  now?: string;
}): AdaptiveDayPlan {
  const now = input.now ?? today();
  const capacity = capacityForDateV3(input.capacity, now);
  const actions = nextBestActionsV4({ ...input, now });
  const minimumBudget = Math.min(capacity, Math.max(15, Math.round(capacity * .42)));
  const recommendedBudget = Math.min(capacity, Math.max(minimumBudget, Math.round(capacity * .72)));
  const extraBudget = capacity;
  const minimum = selectBudget(actions, minimumBudget, 2);

  const recommended: NextBestAction[] = [];
  let used = 0;
  let stoppedForLowMarginalGain = false;
  for (const action of actions) {
    if (recommended.length >= 3) break;
    const remaining = recommendedBudget - used;
    if (remaining < 5) break;
    const gainPerMinute = action.learningGain / Math.max(5, action.minutes);
    if (recommended.length >= 2 && gainPerMinute < .008) {
      stoppedForLowMarginalGain = true;
      break;
    }
    const minutes = Math.min(action.minutes, remaining);
    recommended.push({ ...action, minutes });
    used += minutes;
  }
  const extra = selectBudget(actions, extraBudget, 5);
  const sum = (rows: NextBestAction[]) => rows.reduce((s,row)=>s+row.minutes,0);
  return {
    minimum,
    recommended,
    extra,
    minimumMinutes: sum(minimum),
    recommendedMinutes: sum(recommended),
    extraMinutes: sum(extra),
    capacity,
    stoppedForLowMarginalGain,
  };
}

export function delayedVerificationQueueV4(
  courses: Course[],
  topics: Topic[],
  attempts: PracticeAttempt[],
  now = today(),
) {
  return topics.flatMap((topic) => {
    const course = courses.find((c) => c.id === topic.course_id);
    if (!course) return [];
    const rows = attempts.filter((a)=>a.topic_id===topic.id).sort((a,b)=>a.date.localeCompare(b.date));
    const latestIndependent = [...rows].reverse().find((a)=>resultScore(a)>=.9&&!isAssisted(a));
    if (!latestIndependent) return [];
    const age = Math.max(0,diffDays(now,latestIndependent.date));
    const target = masteryModelV4(topic, attempts, { now, examDate: course.exam_date }).level >= 4 ? 7 : 2;
    if (age < target) return [];
    const laterDelayed = rows.some((a)=>
      a.date > latestIndependent.date &&
      Number(a.delay_days ?? 0) >= target &&
      resultScore(a)>=.9 &&
      !isAssisted(a)
    );
    return laterDelayed ? [] : [{course,topic,due:addDays(latestIndependent.date,target),delayDays:target}];
  });
}

export function sessionFatigueV4(
  sessions: Session[],
  attempts: PracticeAttempt[],
): FatigueSignal {
  const timed = attempts.filter((a)=>typeof a.response_time_ms==="number").slice(-12);
  const split = Math.max(1,Math.floor(timed.length/2));
  const early=timed.slice(0,split),late=timed.slice(split);
  const avg=(rows:PracticeAttempt[])=>rows.length?rows.reduce((s,a)=>s+Number(a.response_time_ms??0),0)/rows.length:null;
  const error=(rows:PracticeAttempt[])=>rows.length?rows.filter((a)=>resultScore(a)<.9).length/rows.length:0;
  const earlyTime=avg(early),lateTime=avg(late);
  let score=0;const reasons:string[]=[];
  if(earlyTime&&lateTime&&lateTime>earlyTime*1.28){score+=.38;reasons.push("vastausaika pitenee loppua kohti");}
  if(error(late)-error(early)>=.22){score+=.38;reasons.push("virheitä tulee loppupuolella enemmän");}
  const recentSessions=sessions.slice(0,12);
  const buckets=new Map<number,number[]>();
  for(const session of recentSessions){
    if(typeof session.competence!=="number")continue;
    const bucket=session.minutes<=25?25:session.minutes<=35?35:session.minutes<=50?50:60;
    const values=buckets.get(bucket)??[];values.push(session.competence);buckets.set(bucket,values);
  }
  const preferred=[...buckets.entries()]
    .filter(([,values])=>values.length>=2)
    .map(([minutes,values])=>({minutes,score:values.reduce((a,b)=>a+b,0)/values.length}))
    .sort((a,b)=>b.score-a.score)[0]?.minutes??null;
  if(recentSessions.length>=4){
    const focus=recentSessions.filter(s=>typeof s.focus==="number").map(s=>Number(s.focus));
    const mean=focus.length?focus.reduce((a,b)=>a+b,0)/focus.length:null;
    if(mean!==null&&mean<=2.6){score+=.16;reasons.push("viimeaikainen keskittyminen on ollut matala");}
  }
  score=clamp(score);
  return {
    level:score>=.62?"high":score>=.34?"watch":"none",
    score:Math.round(score*100),
    reason:reasons.length?reasons.join(" ja ")+".":"Datassa ei näy selvää session sisäistä väsymissignaalia.",
    suggestedBreakMinutes:score>=.62?10:score>=.34?5:0,
    preferredSessionMinutes:preferred,
  };
}

export function personalLearningProfileV4(
  sessions: Session[],
  attempts: PracticeAttempt[],
): LearningProfile {
  const observations:LearningProfile["observations"]=[];
  const delayed=attempts.filter((a)=>resultScore(a)>=.9&&Number(a.delay_days??0)>=2);
  if(delayed.length>=3){
    const mean=delayed.reduce((s,a)=>s+Number(a.delay_days??0),0)/delayed.length;
    observations.push({
      label:`Onnistunut viivekertaus osuu nyt keskimäärin noin ${Math.round(mean)} päivän kohdalle.`,
      evidence:`${delayed.length} onnistunutta viivästettyä yritystä`,
      confidence:delayed.length>=10?"high":delayed.length>=5?"medium":"low",
    });
  }
  const fatigue=sessionFatigueV4(sessions,attempts);
  if(fatigue.preferredSessionMinutes){
    const n=sessions.filter(s=>typeof s.competence==="number").length;
    observations.push({
      label:`Nykyisessä datassa noin ${fatigue.preferredSessionMinutes} min sessiot näyttävät toimivan parhaiten.`,
      evidence:`${n} sessiota, joissa on osaamisarvio`,
      confidence:n>=12?"high":n>=6?"medium":"low",
    });
  }
  const independent=attempts.filter((a)=>!isAssisted(a));
  const assisted=attempts.filter((a)=>isAssisted(a));
  if(independent.length>=3&&assisted.length>=3){
    const ir=independent.filter(a=>resultScore(a)>=.9).length/independent.length;
    const ar=assisted.filter(a=>resultScore(a)>=.9).length/assisted.length;
    observations.push({
      label:ir>=ar?"Itsenäiset yritykset säilyttävät vahvan onnistumistason.":"Avun jälkeen tarvitaan usein vielä itsenäinen varmistus.",
      evidence:`${independent.length} itsenäistä ja ${assisted.length} avustettua yritystä`,
      confidence:independent.length+assisted.length>=20?"high":"medium",
    });
  }
  return {sampleSize:attempts.length+sessions.length,observations};
}

export function yoOverviewV4(
  courses: Course[],
  topics: Topic[],
  attempts: PracticeAttempt[],
  now=today(),
):YoOverview{
  const yoCourses=courses.filter((c)=>!c.archived&&c.target_system==="yo");
  if(!yoCourses.length)return{enabled:false,phase:"foundation",daysToNearestExam:null,stable:0,atRisk:0,unassessed:0,priorities:[]};
  const nearest=Math.min(...yoCourses.map(c=>c.exam_date?Math.max(0,diffDays(c.exam_date,now)):999));
  const phase:YoOverview["phase"]=nearest<=14?"final_review":nearest<=35?"exam_practice":nearest<=75?"consolidation":"foundation";
  const rows=yoCourses.flatMap(course=>topics.filter(t=>t.course_id===course.id).map(topic=>({course,topic,model:masteryModelV4(topic,attempts,{now,examDate:course.exam_date})})));
  return{
    enabled:true,phase,daysToNearestExam:nearest===999?null:nearest,
    stable:rows.filter(r=>r.model.level>=4&&r.model.forgettingRisk<.5).length,
    atRisk:rows.filter(r=>r.model.level<=2||r.model.forgettingRisk>=.6).length,
    unassessed:rows.filter(r=>r.model.evidenceCount===0).length,
    priorities:rows.map(r=>({
      course:r.course,topic:r.topic,
      score:(5-r.model.level)*12+r.model.forgettingRisk*30+r.model.uncertainty*20+Number(r.topic.importance||3)*5,
      reason:r.model.evidenceCount===0?"Ei vielä luotettavaa osaamisnäyttöä.":r.model.forgettingRisk>=.6?"Osaaminen on vaarassa heiketä ennen koetta.":r.model.dimensions.application.score<68?"YO-tasoinen soveltaminen tarvitsee lisää näyttöä.":"Aihe on tärkeä suhteessa nykyiseen osaamisnäyttöön.",
    })).sort((a,b)=>b.score-a.score).slice(0,8),
  };
}

function deterministic(seed:string){
  let h=2166136261;
  for(const ch of seed){h^=ch.charCodeAt(0);h=Math.imul(h,16777619);}
  return((h>>>0)%10000)/10000;
}

export function simulateLearningOsV4(input:{
  courses:Course[];topics:Topic[];plan:PlanItem[];attempts:PracticeAttempt[];mistakes:Mistake[];capacity:CapacityProfile;
  days?:number;start?:string;
}):SimulationResult[]{
  const days=Math.max(30,Math.min(90,input.days??60)),start=input.start??today();
  const profiles=[
    {id:"good_recall_weak_application" as const,adherence:.86,success:.78,appPenalty:.22,forgetPenalty:0,confidenceBias:0},
    {id:"frequent_forgetting" as const,adherence:.78,success:.74,appPenalty:0,forgetPenalty:.18,confidenceBias:0},
    {id:"high_confidence_errors" as const,adherence:.84,success:.66,appPenalty:.05,forgetPenalty:.05,confidenceBias:1},
  ];
  return profiles.map(profile=>{
    const attempts=input.attempts.map(a=>({...a}));let completed=0,skipped=0,reviews=0,overloadDays=0;
    for(let d=0;d<days;d++){
      const date=addDays(start,d);
      const actions=nextBestActionsV4({...input,attempts,now:date}).slice(0,3);
      const cap=capacityForDateV3(input.capacity,date);let used=0;
      for(let i=0;i<actions.length;i++){
        const a=actions[i];
        if(deterministic(profile.id+date+a.id+"adh")>profile.adherence){skipped++;continue;}
        if(used+a.minutes>cap){overloadDays++;skipped++;continue;}
        const isApplication=a.kind==="practice";
        const chance=clamp(profile.success-profile.forgetPenalty-(isApplication?profile.appPenalty:0)+.1);
        const roll=deterministic(profile.id+date+a.id+"result");
        const result:PracticeAttempt["result"]=roll<chance?"independent":roll<chance+.15?"hinted":"not_yet";
        attempts.push({
          id:`sim-${profile.id}-${d}-${i}`,owner_id:"simulation",course_id:a.course.id,topic_id:a.topic?.id??"",
          date,attempt_type:isApplication?"application":"free_recall",prompt:"simulation",response:null,difficulty:isApplication?4:2,
          result,outcome:result==="independent"?"correct":result==="hinted"?"partial":"incorrect",
          confidence:profile.confidenceBias?3:result==="independent"?3:2,hint_used:result==="hinted",hints_used:result==="hinted"?1:0,
          response_time_ms:30000,source:a.kind==="review"?"review":"practice",evidence_quality:result==="independent"?.78:result==="hinted"?.42:.12,
          delay_days:a.kind==="review"?Math.max(2,d%8):0,created_at:date+"T12:00:00Z",
        });
        completed++;used+=a.minutes;if(a.kind==="review")reviews++;
      }
    }
    const models=input.topics.map(t=>masteryModelV4(t,attempts,{now:addDays(start,days),examDate:input.courses.find(c=>c.id===t.course_id)?.exam_date}));
    return{
      profile:profile.id,days,completed,skipped,reviewCount:reviews,overloadDays,
      meanMastery:Math.round(models.reduce((s,m)=>s+m.score,0)/Math.max(1,models.length)),
      meanConfidence:Math.round(models.reduce((s,m)=>s+m.confidence*100,0)/Math.max(1,models.length)),
      stableTopics:models.filter(m=>m.level>=4&&m.forgettingRisk<.55).length,
    };
  });
}

export function learningOsSelfCheckV4(input:{
  courses:Course[];topics:Topic[];plan:PlanItem[];attempts:PracticeAttempt[];mistakes:Mistake[];capacity:CapacityProfile;now?:string;
}){
  const now=input.now??today(),day=adaptiveDayPlanV4({...input,now}),actions=nextBestActionsV4({...input,now});
  return[
    {id:"capacity",ok:day.minimumMinutes<=day.capacity&&day.recommendedMinutes<=day.capacity&&day.extraMinutes<=day.capacity,message:"Päiväkuormat pysyvät kapasiteetin sisällä."},
    {id:"order",ok:actions.every((a,i)=>i===0||actions[i-1]!.priority>=a.priority),message:"Next Best Action pysyy prioriteettijärjestyksessä."},
    {id:"mastery",ok:input.topics.every(t=>{const m=masteryModelV4(t,input.attempts,{now,examDate:input.courses.find(c=>c.id===t.course_id)?.exam_date});return m.score>=0&&m.score<=100&&m.confidence>=0&&m.confidence<=1;}),message:"Mastery ja confidence pysyvät sallituissa rajoissa."},
    {id:"backlog",ok:buildRecoveryQueue({topics:input.topics,attempts:input.attempts,courses:input.courses,now,capacityMinutes:20,maxItems:3}).items.length<=3,message:"Review Queue ei muutu backlog-seinäksi."},
  ];
}
