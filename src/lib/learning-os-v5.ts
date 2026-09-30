import type {
  CapacityProfile,
  Course,
  Mistake,
  PlanItem,
  PlanDraft,
  PracticeAttempt,
  QuestionBankItem,
  Session,
  Topic,
} from "./domain.ts";
import {
  masteryModelV4,
  nextBestActionsV4,
  practicePathV4,
  type MasteryModelV4,
  type NextBestAction,
} from "./learning-os-v4.ts";
import { addDays, diffDays, today } from "./fi.ts";

export const LEARNING_OS_VERSION_V5 = 5;

export type EvidenceConfidence = "very_low" | "low" | "medium" | "high";

export type TopicDependencyLike = {
  topic_id: string;
  depends_on_topic_id: string;
  relation_type: "prerequisite" | "depends_on" | "related_to" | "builds_on" | "commonly_confused_with";
};

export type RetentionBudgetItem = {
  course: Course;
  topic: Topic;
  model: MasteryModelV4;
  targetRetention: number;
  estimatedRetention: number;
  gap: number;
  recommendedMinutes: number;
  minimumMinutes: number;
  marginalValue: number;
  reason: string;
  confidence: EvidenceConfidence;
};

export type RetentionBudget = {
  minimumMinutes: number;
  recommendedMinutes: number;
  extraMinutes: number;
  capacityMinutes: number;
  items: RetentionBudgetItem[];
  protectedTopics: number;
  note: string;
};

export type EvidenceConfidenceV5 = {
  score: number;
  label: "low" | "medium" | "high";
  evidenceCount: number;
  reason: string;
};

export type StopDecision = {
  stop: boolean;
  stopToday: boolean;
  reason: string;
  nextUsefulReview: string | null;
  nextUsefulDate: string;
  marginalGainPerMinute: number;
  evidenceCountToday: number;
  independentSuccessesToday: number;
  confidence: EvidenceConfidenceV5;
  evidence: {
    independentCorrect: number;
    distinctTypes: number;
    transferSuccesses: number;
    explanationSuccesses: number;
    assistedSuccesses: number;
  };
};

export type InstructionStageV5 =
  | "worked_example"
  | "explain_steps"
  | "completion_problem"
  | "faded_completion"
  | "independent"
  | "varied_context"
  | "transfer";

export type InstructionPlanV5 = {
  stage: InstructionStageV5;
  label: string;
  supportLevel: number;
  hintLimit: number;
  feedback: "immediate" | "retry_then_feedback" | "end_of_item";
  requiresIndependentFollowup: boolean;
  reason: string;
};

export type PretestPlan = {
  enabled: boolean;
  questionCount: number;
  affectsMastery: false;
  masteryNeutral: true;
  feedbackTiming: "after_attempt";
  reason: string;
};

export type DiscriminationSet = {
  id: string;
  topicIds: string[];
  topics: Topic[];
  reason: string;
  strength: number;
};

export type CalibrationInsight = {
  status: "insufficient" | "well_calibrated" | "overconfident" | "underconfident";
  score: number;
  sampleSize: number;
  delayedSampleSize: number;
  meanAbsoluteError: number;
  reason: string;
  nextCheckDue: string | null;
};

export type TransferLevel =
  | "recall"
  | "same_context"
  | "varied_context"
  | "different_representation"
  | "unfamiliar_scenario"
  | "mixed_topic"
  | "exam_transfer";

export type TransferLadder = {
  topicId: string;
  highestReliableLevel: TransferLevel;
  completed: TransferLevel[];
  missing: TransferLevel[];
  evidenceByLevel: Record<TransferLevel, number>;
  strongEligible: boolean;
  nextTarget: TransferLevel | null;
};

export type FeedbackMode =
  | "new_learning"
  | "worked_example"
  | "retrieval"
  | "pretest"
  | "exam_simulation"
  | "error_repair";

export type FeedbackPolicy = {
  mode: FeedbackMode;
  reveal: "immediate" | "after_retry" | "after_item" | "after_section";
  allowHints: boolean;
  maxHints: number;
  showFullSolution: boolean;
  masteryMultiplier: number;
  reason: string;
};

export type WhatIfScenario = {
  id: string;
  label: string;
  dailyMinutes: number;
  skipWeekdays?: number[];
  capacityMultiplier?: number;
};

export type WhatIfResult = {
  scenario: WhatIfScenario;
  weeklyMinutes: number;
  estimatedReviewBacklog: number;
  stableTopics: number;
  atRiskTopics: number;
  coveragePressure: number;
  overloadRisk: number;
  expectedUtility: number;
  note: string;
};

export type StudyFrictionReason =
  | "no_time"
  | "forgot"
  | "too_tired"
  | "too_large"
  | "unclear_start"
  | "plans_changed";

export type StudyFrictionEvent = {
  date: string;
  weekday: number;
  reason: StudyFrictionReason;
  plannedMinutes: number;
  courseId?: string | null;
};

export type FrictionInsight = {
  reason: StudyFrictionReason;
  count: number;
  weekday: number | null;
  recommendation: string;
  confidence: EvidenceConfidence;
};

export type ImplementationIntentionRule = {
  trigger:
    | "late_home"
    | "low_energy"
    | "two_missed_days"
    | "busy_day"
    | "review_backlog";
  action:
    | "shorten_session"
    | "switch_to_retrieval"
    | "move_heavy_work"
    | "protect_minimum"
    | "drop_extra";
  parameter: number;
  label: string;
};

export type ReminderTaperDecision = {
  level: "none" | "light" | "normal";
  independentStartRate: number;
  sampleSize: number;
  reason: string;
};

export type YoTaskBlueprint = {
  id: string;
  kind: "essay" | "multiple_choice" | "calculation" | "data_analysis" | "diagram" | "source_material";
  suggestedCount: number;
  weight: number;
  description: string;
};

export type YoExamBlueprint = {
  totalTasks: number;
  maxAnswers: number;
  maxPoints: number;
  durationMinutes: number;
  noHints: true;
  delayedFeedback: true;
  taskTypes: YoTaskBlueprint[];
  taskSelectionMinutes: number;
};

export type TaskSelectionCandidate = {
  taskId: string;
  estimatedMinutes: number;
  expectedPoints: number;
  confidence: number;
  selected: boolean;
};

export type TaskSelectionAnalysis = {
  selectedCount: number;
  estimatedMinutes: number;
  expectedPoints: number;
  efficiency: number;
  overloaded: boolean;
  note: string;
};

export type RecommendationEvidence = {
  evidenceCount: number;
  distinctDays: number;
  distinctTypes: number;
  independentCount: number;
  delayedCount: number;
};

export type RecommendationConfidence = {
  level: EvidenceConfidence;
  score: number;
  evidence: RecommendationEvidence;
  text: string;
};

export type SubjectTaskProfile = {
  key: string;
  sampleSize: number;
  successRate: number;
  meanDelayDays: number;
  preferredSpacingDays: number;
  confidence: EvidenceConfidence;
  active: boolean;
};

export type LearningActionV5 = NextBestAction & {
  expectedLearningGain: number;
  fatigueCost: number;
  retentionBenefit: number;
  examUtility: number;
  confidence: RecommendationConfidence;
  policyScore: number;
  v5Reasons: string[];
};

export type LearningPolicyV5 = {
  actions: LearningActionV5[];
  primary: LearningActionV5 | null;
  alternatives: LearningActionV5[];
  retentionBudget: RetentionBudget;
  stopDecisions: Record<string, StopDecision>;
  note: string;
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
  return outcome === "correct" ? 1 : outcome === "partial" ? 0.52 : 0;
}

function isAssisted(attempt: PracticeAttempt) {
  const payload = attempt.question_payload ?? {};
  return Boolean(
    attempt.hint_used ||
    (attempt.hints_used ?? 0) > 0 ||
    attempt.assisted ||
    payload["coachUsed"] === true ||
    ["worked_example", "partial_completion", "guided"].includes(String(attempt.scaffold_stage ?? payload["scaffoldStage"] ?? "")),
  );
}

function confidenceLevel(score: number): EvidenceConfidence {
  return score >= 0.78 ? "high" : score >= 0.5 ? "medium" : score >= 0.25 ? "low" : "very_low";
}

function daysToExam(course: Course, now: string) {
  return course.exam_date ? Math.max(0, diffDays(course.exam_date, now)) : 120;
}

function attemptLevel(attempt: PracticeAttempt): TransferLevel {
  const payload = attempt.question_payload ?? {};
  const storedLevel = typeof attempt.transfer_level === "number" ? attempt.transfer_level : null;
  const payloadLevel = typeof payload["transferLevel"] === "number" ? Number(payload["transferLevel"]) : null;
  const numericLevel = storedLevel ?? payloadLevel;
  if (numericLevel !== null) {
    const numericTransfer: Record<number, TransferLevel> = {
      0: "recall",
      1: "recall", // v5 level 1 is self-explanation, not same-context transfer
      2: "same_context",
      3: "varied_context",
      4: "different_representation",
      5: "unfamiliar_scenario",
      6: "exam_transfer",
    };
    if (numericLevel in numericTransfer) return numericTransfer[numericLevel]!;
  }
  const explicit = String(payload["transferLevel"] ?? "");
  if ([
    "recall","same_context","varied_context","different_representation",
    "unfamiliar_scenario","mixed_topic","exam_transfer",
  ].includes(explicit)) return explicit as TransferLevel;

  if (attempt.source === "exam" || attempt.attempt_type === "simulation") return "exam_transfer";
  if (attempt.scaffold_stage === "transfer") return "unfamiliar_scenario";
  if (attempt.attempt_type === "recognition" || payload["interleaved"] === true) return "mixed_topic";
  if (payload["representationChanged"] === true) return "different_representation";
  if (payload["variedContext"] === true) return "varied_context";
  if (["application","calculation","error_detection"].includes(attempt.attempt_type)) return "same_context";
  return "recall";
}

export function recommendationConfidenceV5(
  topic: Topic,
  attempts: PracticeAttempt[],
): RecommendationConfidence {
  const rows = attempts.filter((attempt) => attempt.topic_id === topic.id && !attempt.is_pretest);
  const evidence: RecommendationEvidence = {
    evidenceCount: rows.length,
    distinctDays: new Set(rows.map((row) => row.date)).size,
    distinctTypes: new Set(rows.map((row) => row.attempt_type)).size,
    independentCount: rows.filter((row) => resultScore(row) >= 0.9 && !isAssisted(row)).length,
    delayedCount: rows.filter((row) => resultScore(row) >= 0.9 && !isAssisted(row) && Number(row.delay_days ?? 0) >= 2).length,
  };
  const score = clamp(
    clamp(evidence.evidenceCount / 12) * 0.2 +
    clamp(evidence.distinctDays / 6) * 0.26 +
    clamp(evidence.distinctTypes / 5) * 0.16 +
    clamp(evidence.independentCount / 5) * 0.22 +
    clamp(evidence.delayedCount / 3) * 0.16,
  );
  const level = confidenceLevel(score);
  const text =
    level === "high" ? `Vahva suositus: ${evidence.evidenceCount} näyttöä ${evidence.distinctDays} päivältä.` :
    level === "medium" ? `Kohtalainen varmuus: havaintoja on ${evidence.distinctDays} eri päivältä.` :
    level === "low" ? "Alustava suositus: henkilökohtaisia havaintoja on vielä vähän." :
    "Tutkimuspohjainen oletus: henkilökohtaista näyttöä ei vielä juuri ole.";
  return { level, score, evidence, text };
}

export function adaptiveRetentionBudgetV5(input: {
  courses: Course[];
  topics: Topic[];
  attempts: PracticeAttempt[];
  capacityMinutes: number;
  now?: string;
}): RetentionBudget {
  const now = input.now ?? today();
  const candidates = input.topics.flatMap((topic) => {
    const course = input.courses.find((candidate) => candidate.id === topic.course_id);
    if (!course || course.archived || (course.start_date && course.start_date > now)) return [];
    const model = masteryModelV4(topic, input.attempts, { now, examDate: course.exam_date });
    const examDays = daysToExam(course, now);
    const urgency =
      examDays <= 3 ? 1 :
      examDays <= 7 ? 0.93 :
      examDays <= 14 ? 0.82 :
      examDays <= 30 ? 0.65 :
      examDays <= 90 ? 0.48 : 0.34;
    const importance = clamp(Number(topic.importance ?? 3) / 5);
    const targetRetention = clamp(0.72 + urgency * 0.14 + importance * 0.06, 0.72, 0.94);
    const estimatedRetention = clamp((100 - model.forgettingRisk * 100) / 100 * 0.42 + model.dimensions.retention.score / 100 * 0.58);
    const gap = Math.max(0, targetRetention - estimatedRetention);
    const marginalValue = gap * (0.48 + urgency * 0.3 + importance * 0.22);
    const recommendedMinutes = gap < 0.03 ? 0 : Math.max(5, Math.round((6 + gap * 55) / 5) * 5);
    const minimumMinutes = gap < 0.08 ? 0 : Math.min(recommendedMinutes, Math.max(5, Math.round(recommendedMinutes * 0.55 / 5) * 5));
    const confidence = recommendationConfidenceV5(topic, input.attempts).level;
    const reason = [
      model.forgettingRisk >= 0.6 ? "unohtumisriski on korkea" : null,
      examDays <= 14 ? `koe on ${examDays} päivän päästä` : null,
      importance >= 0.8 ? "aihe on tärkeä" : null,
      model.dimensions.retention.score < 60 ? "viivekestävyys tarvitsee näyttöä" : null,
    ].filter(Boolean).join(" · ") || "ylläpidä osaaminen pienellä kertauksella";
    return [{
      course,
      topic,
      model,
      targetRetention,
      estimatedRetention,
      gap,
      recommendedMinutes,
      minimumMinutes,
      marginalValue,
      reason,
      confidence,
    } satisfies RetentionBudgetItem];
  }).sort((a,b) => b.marginalValue - a.marginalValue);

  const capacityMinutes = Math.max(0, input.capacityMinutes);
  const minimumCap = Math.min(capacityMinutes, Math.round(capacityMinutes * 0.42));
  const recommendedCap = Math.min(capacityMinutes, Math.round(capacityMinutes * 0.72));
  const allocate = (cap: number, mode: "minimum" | "recommended") => {
    let used = 0;
    for (const item of candidates) {
      const want = mode === "minimum" ? item.minimumMinutes : item.recommendedMinutes;
      if (!want || used >= cap) continue;
      used += Math.min(want, Math.max(0, cap - used));
    }
    return used;
  };
  const minimumMinutes = allocate(minimumCap, "minimum");
  const recommendedMinutes = allocate(recommendedCap, "recommended");
  const extraMinutes = Math.min(capacityMinutes, Math.max(recommendedMinutes, allocate(capacityMinutes, "recommended")));
  return {
    minimumMinutes,
    recommendedMinutes,
    extraMinutes,
    capacityMinutes,
    items: candidates.filter((item) => item.recommendedMinutes > 0).slice(0, 12),
    protectedTopics: candidates.filter((item) => item.gap >= 0.08).length,
    note: recommendedMinutes >= capacityMinutes && candidates.some((item) => item.gap >= 0.08)
      ? "Kaikkea ei kannata yrittää ylläpitää samalla tasolla. Budjetti suojaa tärkeimmät aiheet ensin."
      : "Kertausbudjetti on rajattu kapasiteettiin. Lisäaika on vapaaehtoista, ei opiskelusakko.",
  };
}

export function stopRuleV5(
  topic: Topic,
  attempts: PracticeAttempt[],
  options: { now?: string; sessionDate?: string } | string = {},
): StopDecision {
  const normalized = typeof options === "string" ? { now: options, sessionDate: options } : options;
  const now = normalized.now ?? today();
  const sessionDate = normalized.sessionDate ?? now;
  const rows = attempts.filter((a) => a.topic_id === topic.id && a.date === sessionDate && !a.is_pretest);
  const independentCorrect = rows.filter((a) => resultScore(a) >= 0.9 && !isAssisted(a)).length;
  const assistedSuccesses = rows.filter((a) => resultScore(a) >= 0.9 && isAssisted(a)).length;
  const distinctTypes = new Set(rows.filter((a) => resultScore(a) >= 0.9).map((a) => a.attempt_type)).size;
  const transferSuccesses = rows.filter((a) => resultScore(a) >= 0.9 && !isAssisted(a) && ["unfamiliar_scenario","mixed_topic","exam_transfer"].includes(attemptLevel(a))).length;
  const explanationSuccesses = rows.filter((a) => resultScore(a) >= 0.9 && !isAssisted(a) && a.attempt_type === "explanation").length;
  const recent = [...rows]
    .sort((a,b)=>b.created_at.localeCompare(a.created_at))
    .slice(0,4);
  const latestSuccessRate = recent.length ? recent.reduce((sum,row)=>sum+resultScore(row),0)/recent.length : 0;
  const model = masteryModelV4(topic, attempts, { now });
  const enoughEvidence =
    independentCorrect >= 2 &&
    distinctTypes >= 2 &&
    latestSuccessRate >= 0.88 &&
    !model.verificationRequired;
  const transferReady = model.level <= 3 || transferSuccesses >= 1 || explanationSuccesses >= 1;
  const stop = enoughEvidence && transferReady;
  const marginalGainPerMinute = clamp(
    stop ? 0.002 + model.forgettingRisk * 0.003 :
    0.006 + (1-model.confidence)*0.006 + model.forgettingRisk*0.004,
    0,
    0.02,
  );
  const nextUsefulReview = stop
    ? addDays(now, model.level >= 4 ? 5 : model.level >= 3 ? 3 : 2)
    : null;
  const reason = stop
    ? `Tälle päivälle on jo ${independentCorrect} itsenäistä onnistumista ja ${distinctTypes} tehtävätyyppiä. Lisätoisto antaisi vähän uutta näyttöä.`
    : model.verificationRequired
      ? "Vihjeellinen onnistuminen tarvitsee vielä itsenäisen varmistuksen."
      : independentCorrect < 2
        ? "Tarvitaan vielä vähintään kaksi itsenäistä onnistumista."
        : distinctTypes < 2
          ? "Sama onnistuminen pitää vielä näyttää toisella tehtävätyypillä."
          : "Jatka lyhyesti, koska suoritus ei ole vielä riittävän vakaa.";
  const stopConfidence: EvidenceConfidenceV5 = {
    score: clamp(independentCorrect / 3 * 0.45 + distinctTypes / 3 * 0.25 + Math.min(1, rows.length / 5) * 0.3),
    label: rows.length >= 4 && independentCorrect >= 2 ? "high" : rows.length >= 2 ? "medium" : "low",
    evidenceCount: rows.length,
    reason: rows.length >= 4 ? "Päätös perustuu useaan tämän päivän yritykseen." : "Stop rule on vielä alustava, koska tämän päivän näyttöä on vähän.",
  };
  return {
    stop,
    stopToday: stop,
    reason,
    nextUsefulReview,
    nextUsefulDate: nextUsefulReview ?? addDays(now, 1),
    marginalGainPerMinute,
    evidenceCountToday: rows.length,
    independentSuccessesToday: independentCorrect,
    confidence: stopConfidence,
    evidence: { independentCorrect, distinctTypes, transferSuccesses, explanationSuccesses, assistedSuccesses },
  };
}

export function instructionPlanV5(
  topic: Topic,
  attempts: PracticeAttempt[],
  options: { now?: string; examDate?: string | null } = {},
): InstructionPlanV5 {
  const base = practicePathV4(topic, attempts, options);
  const rows = attempts.filter((a) => a.topic_id === topic.id && !a.is_pretest);
  const independent = rows.filter((a) => resultScore(a) >= 0.9 && !isAssisted(a)).length;
  const completion = rows.filter((a) => a.scaffold_stage === "partial_completion" && resultScore(a) >= 0.5).length;
  const explanation = rows.filter((a) => a.attempt_type === "explanation" && resultScore(a) >= 0.9 && !isAssisted(a)).length;
  const transfer = rows.filter((a) => resultScore(a) >= 0.9 && !isAssisted(a) && ["unfamiliar_scenario","exam_transfer"].includes(attemptLevel(a))).length;

  if (base.stage === "delayed_verification") return {
    stage: "independent",
    label: "Itsenäinen varmistus",
    supportLevel: 0,
    hintLimit: 0,
    feedback: "retry_then_feedback",
    requiresIndependentFollowup: false,
    reason: base.reason,
  };
  if (!rows.length) return {
    stage: "worked_example",
    label: "Malliesimerkki",
    supportLevel: 5,
    hintLimit: 5,
    feedback: "immediate",
    requiresIndependentFollowup: true,
    reason: "Aiheesta ei ole näyttöä. Ensin tehdään ratkaisun rakenne näkyväksi.",
  };
  if (!explanation) return {
    stage: "explain_steps",
    label: "Perustele vaiheet",
    supportLevel: 4,
    hintLimit: 4,
    feedback: "immediate",
    requiresIndependentFollowup: true,
    reason: "Seuraava askel on ymmärtää miksi ratkaisu toimii, ei vain jäljitellä sitä.",
  };
  if (!completion) return {
    stage: "completion_problem",
    label: "Täydennä ratkaisu",
    supportLevel: 3,
    hintLimit: 3,
    feedback: "immediate",
    requiresIndependentFollowup: true,
    reason: "Poistetaan osa mallista ja siirretään vastuuta vähitellen opiskelijalle.",
  };
  if (independent < 2) return {
    stage: independent === 0 ? "faded_completion" : "independent",
    label: independent === 0 ? "Häivytetty tuki" : "Itsenäinen tehtävä",
    supportLevel: independent === 0 ? 2 : 0,
    hintLimit: independent === 0 ? 2 : 0,
    feedback: "retry_then_feedback",
    requiresIndependentFollowup: true,
    reason: "Tukea vähennetään, kunnes ratkaisu onnistuu ilman vihjeitä.",
  };
  if (transfer < 1) return {
    stage: "varied_context",
    label: "Muunneltu tilanne",
    supportLevel: 0,
    hintLimit: 0,
    feedback: "end_of_item",
    requiresIndependentFollowup: false,
    reason: "Perusratkaisu onnistuu. Nyt vaihdetaan esitystapaa tai kontekstia.",
  };
  return {
    stage: "transfer",
    label: "Soveltava tehtävä",
    supportLevel: 0,
    hintLimit: 0,
    feedback: "end_of_item",
    requiresIndependentFollowup: false,
    reason: "Osaaminen testataan tilanteessa, jossa oikea menetelmä pitää tunnistaa itse.",
  };
}

export function pretestPlanV5(
  topic: Topic,
  attempts: PracticeAttempt[],
): PretestPlan {
  const rows = attempts.filter((a) => a.topic_id === topic.id && !a.is_pretest);
  const independent = rows.filter((a) => !isAssisted(a)).length;
  const enabled = independent < 2 && topic.progress < 35;
  return {
    enabled,
    questionCount: enabled ? Math.min(4, Math.max(2, topic.importance >= 4 ? 3 : 2)) : 0,
    affectsMastery: false,
    masteryNeutral: true,
    feedbackTiming: "after_attempt",
    reason: enabled
      ? "Ennakkotesti kartoittaa ennakkotiedot ilman, että väärä vastaus heikentää osaamistasoa."
      : "Aiheesta on jo riittävästi näyttöä, joten ennakkotesti ei enää lisää hyödyllistä tietoa.",
  };
}

export function confusionAwareInterleavingV5(
  topics: Topic[],
  dependencies: TopicDependencyLike[],
  attempts: PracticeAttempt[],
): DiscriminationSet[] {
  const byId = new Map(topics.map((topic) => [topic.id, topic]));
  const explicit = dependencies.filter((edge) => edge.relation_type === "commonly_confused_with");
  const seen = new Set<string>();
  const result: DiscriminationSet[] = [];
  for (const edge of explicit) {
    const a = byId.get(edge.topic_id);
    const b = byId.get(edge.depends_on_topic_id);
    if (!a || !b) continue;
    const ids = [a.id,b.id].sort();
    const key = ids.join(":");
    if (seen.has(key)) continue;
    seen.add(key);
    const wrongA = attempts.filter((row)=>row.topic_id===a.id&&resultScore(row)<.9).length;
    const wrongB = attempts.filter((row)=>row.topic_id===b.id&&resultScore(row)<.9).length;
    const recognition = attempts.filter((row)=>ids.includes(row.topic_id)&&row.attempt_type==="recognition");
    const discriminationSuccess = recognition.length
      ? recognition.reduce((sum,row)=>sum+resultScore(row),0)/recognition.length
      : 0;
    result.push({
      id: `confusion:${key}`,
      topicIds: ids,
      topics: [a,b],
      reason: `${a.name} ja ${b.name} harjoitellaan rinnakkain, jotta menetelmä pitää erottaa itse.`,
      strength: clamp(discriminationSuccess * 0.72 + Math.min(1,(wrongA+wrongB)/6)*0.28),
    });
  }
  return result.sort((a,b)=>a.strength-b.strength);
}

export function topicCalibrationInsightV5(
  topic: Topic,
  attempts: PracticeAttempt[],
  now = today(),
): CalibrationInsight {
  const rows = attempts.filter((a)=>a.topic_id===topic.id&&!a.is_pretest&&typeof a.confidence==="number");
  if (!rows.length) return {
    status:"insufficient",score:0,sampleSize:0,delayedSampleSize:0,meanAbsoluteError:1,
    reason:"Kalibrointinäyttöä ei ole vielä.",nextCheckDue:addDays(now,1),
  };
  const errors = rows.map((row)=>{
    const predicted=clamp(((row.confidence??1)-1)/2);
    return {err:Math.abs(predicted-resultScore(row)), predicted, actual:resultScore(row), delayed:Number(row.delay_days??0)>=1};
  });
  const meanAbsoluteError=errors.reduce((s,row)=>s+row.err,0)/errors.length;
  const over=errors.filter(row=>row.predicted-row.actual>=.45).length;
  const under=errors.filter(row=>row.actual-row.predicted>=.45).length;
  const delayedSampleSize=errors.filter(row=>row.delayed).length;
  const score=Math.round((1-clamp(meanAbsoluteError))*100);
  const status:CalibrationInsight["status"] =
    rows.length<3||delayedSampleSize<1 ? "insufficient" :
    over/rows.length>=.34 ? "overconfident" :
    under/rows.length>=.34 ? "underconfident" :
    "well_calibrated";
  const reason =
    status==="overconfident"?"Arvio omasta osaamisesta on toistuvasti korkeampi kuin myöhempi suoritus.":
    status==="underconfident"?"Suoritus on toistuvasti omaa ennakkoarviota parempi.":
    status==="well_calibrated"?"Ennakkoarviot ja myöhempi suoritus vastaavat melko hyvin toisiaan.":
    "Tarvitaan vähintään muutama arvio ja yksi myöhempi muistista palauttaminen ennen päätelmää.";
  const latest=[...rows].sort((a,b)=>b.date.localeCompare(a.date))[0];
  return {status,score,sampleSize:rows.length,delayedSampleSize,meanAbsoluteError,reason,nextCheckDue:latest?addDays(latest.date,2):addDays(now,1)};
}

const transferOrder: TransferLevel[] = [
  "recall",
  "same_context",
  "varied_context",
  "different_representation",
  "unfamiliar_scenario",
  "mixed_topic",
  "exam_transfer",
];

export function transferLadderV5(
  topic: Topic,
  attempts: PracticeAttempt[],
): TransferLadder {
  const rows=attempts.filter((a)=>a.topic_id===topic.id&&!a.is_pretest&&resultScore(a)>=.9&&!isAssisted(a));
  const evidenceByLevel=Object.fromEntries(transferOrder.map(level=>[level,0])) as Record<TransferLevel,number>;
  for(const row of rows) evidenceByLevel[attemptLevel(row)] += 1;
  const completed=transferOrder.filter((level)=>evidenceByLevel[level]>0);
  const highestReliableIndex=transferOrder.reduce((best,level,index)=>evidenceByLevel[level]>0?Math.max(best,index):best,0);
  const highestReliableLevel=transferOrder[highestReliableIndex]!;
  const missing=transferOrder.filter((level)=>evidenceByLevel[level]===0);
  const nextTarget=transferOrder.find((level)=>evidenceByLevel[level]===0)??null;
  return {
    topicId:topic.id,
    highestReliableLevel,
    completed,
    missing,
    evidenceByLevel,
    strongEligible:
      evidenceByLevel.recall>=1 &&
      evidenceByLevel.same_context+evidenceByLevel.varied_context>=1 &&
      evidenceByLevel.unfamiliar_scenario+evidenceByLevel.mixed_topic+evidenceByLevel.exam_transfer>=1,
    nextTarget,
  };
}

export function feedbackPolicyCoreV5(
  mode: FeedbackMode,
  instruction?: InstructionPlanV5 | null,
): FeedbackPolicy {
  if(mode==="exam_simulation")return{mode,reveal:"after_section",allowHints:false,maxHints:0,showFullSolution:false,masteryMultiplier:1,reason:"Koetilassa palaute piilotetaan osion loppuun asti."};
  if(mode==="pretest")return{mode,reveal:"after_item",allowHints:false,maxHints:0,showFullSolution:true,masteryMultiplier:0,reason:"Ennakkotesti aktivoi ennakkotietoa, mutta ei muuta osaamistasoa."};
  if(mode==="retrieval")return{mode,reveal:"after_retry",allowHints:true,maxHints:1,showFullSolution:true,masteryMultiplier:.9,reason:"Muistista palauttamisessa tehdään ensin uusi itsenäinen yritys ennen ratkaisun näyttämistä."};
  if(mode==="error_repair")return{mode,reveal:"after_retry",allowHints:true,maxHints:2,showFullSolution:true,masteryMultiplier:.75,reason:"Virhe korjataan aktiivisesti ennen malliratkaisun näyttämistä."};
  if(mode==="worked_example")return{mode,reveal:"immediate",allowHints:true,maxHints:5,showFullSolution:true,masteryMultiplier:.28,reason:"Uudessa rakenteessa palaute on nopea, mutta näyttö painaa vähemmän."};
  return{
    mode,
    reveal:instruction?.feedback==="retry_then_feedback"?"after_retry":instruction?.feedback==="end_of_item"?"after_item":"immediate",
    allowHints:(instruction?.hintLimit??2)>0,
    maxHints:instruction?.hintLimit??2,
    showFullSolution:true,
    masteryMultiplier:instruction?.supportLevel ? Math.max(.28,1-instruction.supportLevel*.13) : 1,
    reason:instruction?.reason??"Palautteen ajoitus seuraa harjoittelun tarkoitusta.",
  };
}

export function whatIfStudySimulatorV5(input:{
  courses:Course[];
  topics:Topic[];
  attempts:PracticeAttempt[];
  scenarios?:WhatIfScenario[];
  now?:string;
}):WhatIfResult[]{
  const now=input.now??today();
  const scenarios=input.scenarios??[
    {id:"light",label:"20 min / päivä",dailyMinutes:20},
    {id:"recommended",label:"40 min / päivä",dailyMinutes:40},
    {id:"deep",label:"60 min / päivä",dailyMinutes:60},
    {id:"weekend-light",label:"Kevyt viikonloppu",dailyMinutes:40,skipWeekdays:[0]},
  ];
  const models=input.topics.map(topic=>{
    const course=input.courses.find(c=>c.id===topic.course_id);
    return {topic,course,model:masteryModelV4(topic,input.attempts,{now,examDate:course?.exam_date??null})};
  }).filter(row=>row.course);
  return scenarios.map(scenario=>{
    const activeDays=7-(scenario.skipWeekdays?.length??0);
    const weeklyMinutes=Math.round(scenario.dailyMinutes*activeDays*(scenario.capacityMultiplier??1));
    const demand=models.reduce((sum,row)=>{
      const urgency=daysToExam(row.course!,now)<=14?1.35:1;
      return sum+(row.model.forgettingRisk*.55+row.model.uncertainty*.25+(5-row.model.level)/5*.2)*urgency*12;
    },0);
    const capacityRatio=weeklyMinutes/Math.max(1,demand*7);
    const stableTopics=models.filter(row=>row.model.level>=4&&row.model.forgettingRisk<.55).length+
      Math.min(models.length,Math.round(Math.max(0,capacityRatio-.7)*models.length*.35));
    const atRiskTopics=Math.max(0,models.filter(row=>row.model.forgettingRisk>=.55||row.model.level<=2).length-Math.round(capacityRatio*3));
    const estimatedReviewBacklog=Math.max(0,Math.round(demand*1.2-weeklyMinutes/7));
    const coveragePressure=clamp(models.filter(row=>row.topic.progress<100&&daysToExam(row.course!,now)<=30).length/Math.max(1,models.length));
    const overloadRisk=clamp((weeklyMinutes-420)/420 + Math.max(0,coveragePressure-.6)*.35);
    const expectedUtility=clamp((1-Math.min(1,estimatedReviewBacklog/20))*.38+Math.min(1,weeklyMinutes/280)*.42+(1-overloadRisk)*.2);
    return{
      scenario,weeklyMinutes,estimatedReviewBacklog,
      stableTopics:Math.min(models.length,stableTopics),
      atRiskTopics,coveragePressure,overloadRisk,expectedUtility,
      note:overloadRisk>.55?"Lisäaika kasvattaa kuormaa enemmän kuin arvioitua oppimishyötyä.":
        estimatedReviewBacklog>8?"Kertausjono kasvaa tällä kapasiteetilla.":
        "Tämä kapasiteetti näyttää kattavan tärkeimmät nykyiset tarpeet.",
    };
  });
}

export function frictionInsightsV5(events:StudyFrictionEvent[]):FrictionInsight[]{
  const reasons=[...new Set(events.map(e=>e.reason))];
  return reasons.map(reason=>{
    const rows=events.filter(e=>e.reason===reason);
    const weekdays=[0,1,2,3,4,5,6].map(day=>({day,count:rows.filter(e=>e.weekday===day).length})).sort((a,b)=>b.count-a.count);
    const weekday=weekdays[0]&&weekdays[0].count>=2?weekdays[0].day:null;
    const recommendation=
      reason==="too_tired"?"Lyhennä tämän päivän raskain opiskelukerta ja vaihda loppu kevyeen muistista palauttamiseen.":
      reason==="no_time"?"Suojaa päivän minimitaso ja siirrä vain raskas työ, älä kaikkea.":
      reason==="forgot"?"Käytä yhtä kevyttä aloitusmuistutusta, mutta vältä muistutusriippuvuutta.":
      reason==="too_large"?"Pilko tehtävä 10–20 minuutin ensimmäiseen askeleeseen.":
      reason==="unclear_start"?"Näytä vain yksi konkreettinen ensimmäinen tehtävä.":
      "Mukauta kalenteria muuttuneeseen päivään ilman myöhemmin korvattavaa velkaa.";
    const score=clamp(rows.length/5+(weekday !== null ? 0.18 : 0));
    return{reason,count:rows.length,weekday,recommendation,confidence:confidenceLevel(score)};
  }).sort((a,b)=>b.count-a.count);
}

export function implementationIntentionV5(insight:FrictionInsight):ImplementationIntentionRule{
  if(insight.reason==="too_tired")return{trigger:"low_energy",action:"switch_to_retrieval",parameter:15,label:"Jos energia on matala, vaihda raskas opiskelukerta 15 minuutin muistista palauttamiseen."};
  if(insight.reason==="no_time")return{trigger:"busy_day",action:"protect_minimum",parameter:15,label:"Jos päivä täyttyy, suojaa vähintään 15 min tärkeintä opiskelua."};
  if(insight.reason==="too_large"||insight.reason==="unclear_start")return{trigger:"busy_day",action:"shorten_session",parameter:15,label:"Jos aloittaminen on vaikeaa, tee vain ensimmäinen 15 minuutin osuus."};
  if(insight.reason==="plans_changed")return{trigger:"busy_day",action:"move_heavy_work",parameter:1,label:"Jos suunnitelmat muuttuvat, siirrä raskas työ seuraavaan kapasiteettipäivään."};
  return{trigger:"two_missed_days",action:"drop_extra",parameter:2,label:"Jos kaksi päivää jää väliin, jätä lisäharjoittelu pois äläkä kasaa velkaa."};
}

export function reminderTaperingV5(input:{
  plannedStarts:number;
  independentStarts:number;
  missedStarts:number;
}):ReminderTaperDecision{
  const sampleSize=Math.max(0,input.plannedStarts);
  const independentStartRate=sampleSize?clamp(input.independentStarts/sampleSize):0;
  const level:ReminderTaperDecision["level"]=
    sampleSize>=8&&independentStartRate>=.8?"none":
    sampleSize>=5&&independentStartRate>=.55?"light":"normal";
  return{
    level,independentStartRate,sampleSize,
    reason:level==="none"?"Aloitat jo itsenäisesti. Muistutuksia voidaan vähentää.":
      level==="light"?"Yksi kevyt muistutus riittää nykyisen datan perusteella.":
      "Pidä normaali mutta rauhallinen muistutustaso, kunnes itsenäisiä aloituksia kertyy enemmän.",
  };
}

export function yoExamBlueprintV5(subject:string|null|undefined):YoExamBlueprint{
  const science=/fysi|kemia|biolog/i.test(subject??"");
  const taskTypes:YoTaskBlueprint[]=science?[
    {id:"mc",kind:"multiple_choice",suggestedCount:2,weight:.12,description:"Nopea käsitteiden ja tulkinnan erottelu."},
    {id:"calc",kind:"calculation",suggestedCount:3,weight:.28,description:"Monivaiheinen ratkaisu ja perusteltu menetelmä."},
    {id:"data",kind:"data_analysis",suggestedCount:2,weight:.22,description:"Taulukon, kuvaajan tai aineiston analyysi."},
    {id:"source",kind:"source_material",suggestedCount:2,weight:.18,description:"Usean lähteen tai annetun materiaalin soveltaminen."},
    {id:"diagram",kind:"diagram",suggestedCount:1,weight:.1,description:"Kuvaaja, merkinnät, rakenne tai havainnollistaminen."},
    {id:"essay",kind:"essay",suggestedCount:1,weight:.1,description:"Laajempi perusteltu kokonaisvastaus."},
  ]:[
    {id:"source",kind:"source_material",suggestedCount:3,weight:.35,description:"Lähdeaineiston tulkinta ja soveltaminen."},
    {id:"essay",kind:"essay",suggestedCount:4,weight:.45,description:"Laaja perusteltu vastaus."},
    {id:"mc",kind:"multiple_choice",suggestedCount:2,weight:.1,description:"Käsitteellinen erottelu."},
    {id:"data",kind:"data_analysis",suggestedCount:2,weight:.1,description:"Taulukon tai kuvaajan tulkinta."},
  ];
  return{
    totalTasks:11,maxAnswers:7,maxPoints:120,durationMinutes:360,
    noHints:true,delayedFeedback:true,taskTypes,taskSelectionMinutes:5,
  };
}

export function analyzeTaskSelectionV5(
  rows:TaskSelectionCandidate[],
  blueprint:YoExamBlueprint,
):TaskSelectionAnalysis{
  const selected=rows.filter(row=>row.selected).slice(0,blueprint.maxAnswers);
  const estimatedMinutes=selected.reduce((sum,row)=>sum+row.estimatedMinutes,0);
  const expectedPoints=selected.reduce((sum,row)=>sum+row.expectedPoints*clamp(row.confidence),0);
  const efficiency=estimatedMinutes?expectedPoints/estimatedMinutes:0;
  const overloaded=estimatedMinutes>blueprint.durationMinutes-20||rows.filter(row=>row.selected).length>blueprint.maxAnswers;
  return{
    selectedCount:selected.length,estimatedMinutes,expectedPoints,efficiency,overloaded,
    note:overloaded?"Valinta on liian suuri annetulle koeaikabudjetille.":
      selected.length<blueprint.maxAnswers?"Valinnassa on vielä tilaa, mutta kaikkea ei tarvitse valita jos laatu kärsii.":
      "Tehtävävalinta mahtuu nykyiseen aika-arvioon.",
  };
}

export function subjectTaskProfilesFromCoursesV5(
  courses:Course[],
  attempts:PracticeAttempt[],
):SubjectTaskProfile[]{
  const courseMap=new Map(courses.map(course=>[course.id,course]));
  const groups=new Map<string,PracticeAttempt[]>();
  for(const row of attempts.filter((attempt)=>!attempt.is_pretest)){
    const subject=courseMap.get(row.course_id)?.subject??courseMap.get(row.course_id)?.code??"other";
    const key=`${subject}:${row.attempt_type}`;
    groups.set(key,[...(groups.get(key)??[]),row]);
  }
  return[...groups.entries()].map(([key,rows])=>{
    const successRate=rows.reduce((sum,row)=>sum+resultScore(row),0)/Math.max(1,rows.length);
    const delays=rows.map(row=>Number(row.delay_days??0)).filter(day=>day>0);
    const meanDelayDays=delays.length?delays.reduce((a,b)=>a+b,0)/delays.length:0;
    const successfulDelayed=rows.filter(row=>resultScore(row)>=.9&&Number(row.delay_days??0)>0);
    const preferredSpacingDays=successfulDelayed.length
      ?Math.max(1,Math.round(successfulDelayed.reduce((sum,row)=>sum+Number(row.delay_days??0),0)/successfulDelayed.length))
      :2;
    const score=clamp(rows.length/18+new Set(rows.map(row=>row.date)).size/12*.35);
    return{
      key,sampleSize:rows.length,successRate,meanDelayDays,preferredSpacingDays,
      confidence:confidenceLevel(score),active:rows.length>=8&&new Set(rows.map(row=>row.date)).size>=4,
    };
  }).sort((a,b)=>b.sampleSize-a.sampleSize);
}

function actionUtility(
  action:NextBestAction,
  model:MasteryModelV4,
  course:Course,
  attempts:PracticeAttempt[],
  stop:StopDecision,
  now:string,
):LearningActionV5{
  const examDays=daysToExam(course,now);
  const examUtility=examDays <= 3 ? 1 : examDays <= 7 ? 0.9 : examDays <= 14 ? 0.72 : examDays <= 30 ? 0.48 : 0.2;
  const retentionBenefit=clamp(model.forgettingRisk*.72+(1-model.dimensions.retention.score/100)*.28);
  const topicAttempts=attempts.filter(a=>a.topic_id===action.topic?.id&&!a.is_pretest);
  const recentTimed=topicAttempts.filter(a=>typeof a.response_time_ms==="number").slice(-4);
  const fatigueCost=recentTimed.length>=3 && recentTimed.at(-1)!.response_time_ms! > (recentTimed[0]!.response_time_ms ?? 0) * 1.3 ? 0.55 : 0.12;
  const confidence=recommendationConfidenceV5(action.topic!,attempts);
  const expectedLearningGain=clamp(action.learningGain*(stop.stop ? 0.35 : 1));
  const policyScore=
    expectedLearningGain*.39+
    retentionBenefit*.21+
    examUtility*.16+
    confidence.score*.14+
    (1-fatigueCost)*.1;
  const v5Reasons=[
    ...action.reason.split(" · ").filter(Boolean),
    stop.stop ? "tämän päivän lisätoiston rajahyöty on jo pieni" : null,
    retentionBenefit >= 0.6 ? "säilymisen suojaaminen on nyt arvokasta" : null,
    confidence.level === "very_low" ? "suositus on vielä alustava" : null,
  ].filter(Boolean) as string[];
  return{...action,expectedLearningGain,fatigueCost,retentionBenefit,examUtility,confidence,policyScore,v5Reasons};
}

export function nextBestActionsV5(input:{
  courses:Course[];
  topics:Topic[];
  plan:PlanItem[];
  attempts:PracticeAttempt[];
  mistakes:Mistake[];
  dependencies?:TopicDependencyLike[];
  now?:string;
}):LearningActionV5[]{
  const now=input.now??today();
  const base=nextBestActionsV4(input);
  return base.map(action=>{
    const topic=action.topic!;
    const course=action.course;
    const model=masteryModelV4(topic,input.attempts,{now,examDate:course.exam_date});
    const stop=stopRuleV5(topic,input.attempts,{now,sessionDate:now});
    const v5=actionUtility(action,model,course,input.attempts,stop,now);
    const confusion=(input.dependencies??[]).some(edge=>
      edge.relation_type==="commonly_confused_with"&&
      (edge.topic_id===topic.id||edge.depends_on_topic_id===topic.id)
    );
    const ladder=transferLadderV5(topic,input.attempts);
    const dueRepair=input.mistakes.find(mistake =>
      mistake.topic_id===topic.id &&
      mistake.status!=="mastered" &&
      Boolean(mistake.delayed_verification_due) &&
      String(mistake.delayed_verification_due)<=now
    );
    const bonus=(confusion && !ladder.strongEligible ? 0.04 : 0)+(ladder.nextTarget === "exam_transfer" ? 0.03 : 0)+(dueRepair ? 0.22 : 0);
    return{
      ...v5,
      ...(dueRepair ? {
        kind:"verification" as const,
        title:topic.name+" · virheen myöhempi varmistus",
        minutes:Math.min(v5.minutes,12),
      } : {}),
      policyScore:v5.policyScore+bonus,
      v5Reasons:[
        ...v5.v5Reasons,
        dueRepair ? "korjatun virheen myöhempi varmistus on nyt ajankohtainen" : null,
        confusion ? "sekoittuva käsite kannattaa erotella rinnakkain" : null,
      ].filter(Boolean) as string[],
    };
  }).sort((a,b)=>b.policyScore-a.policyScore);
}

export function learningPolicyV5(input:{
  courses:Course[];
  topics:Topic[];
  plan:PlanItem[];
  attempts:PracticeAttempt[];
  mistakes:Mistake[];
  capacity:CapacityProfile;
  dependencies?:TopicDependencyLike[];
  now?:string;
}):LearningPolicyV5{
  const now=input.now??today();
  const weekday=new Date(now+"T12:00:00").getDay();
  const capacityMinutes=input.capacity.busyDates.includes(now)?0:
    weekday===0||weekday===6?input.capacity.weekendMinutes:input.capacity.weekdayMinutes;
  const retentionBudget=adaptiveRetentionBudgetV5({courses:input.courses,topics:input.topics,attempts:input.attempts,capacityMinutes,now});
  const actions=nextBestActionsV5({...input,now});
  const stopDecisions=Object.fromEntries(input.topics.map(topic=>[topic.id,stopRuleV5(topic,input.attempts,{now,sessionDate:now})]));
  const available=actions.filter(action=>!action.topic||!stopDecisions[action.topic.id]?.stop);
  const primary=available[0]??actions[0]??null;
  return{
    actions,primary,alternatives:available.slice(1,3),retentionBudget,stopDecisions,
    note:primary
      ? "Valinta huomioi oppimishyödyn, muistissa säilymisen, koehyödyn, kuormituksen ja käytettävissä olevan näytön varmuuden."
      : "Tänään ei ole riittävästi hyödyllistä tekemistä lisättäväksi vain kalenterin täytteeksi.",
  };
}


export function adaptiveDayPlanV5(input:{
  courses:Course[];
  topics:Topic[];
  plan:PlanItem[];
  attempts:PracticeAttempt[];
  mistakes:Mistake[];
  capacity:CapacityProfile;
  dependencies?:TopicDependencyLike[];
  now?:string;
  intentions?:ImplementationIntentionV5[];
  sessions?:Session[];
  frictionEvents?:FrictionEventV5[];
  localTime?:string;
}){
  const now=input.now??today();
  const policy=learningPolicyV5({...input,now});
  const runtimeContext=runtimeIntentionContextV5({
    sessions:input.sessions??[],
    capacity:input.capacity,
    now,
    ...(input.localTime ? { localTime: input.localTime } : {}),
    frictionEvents: input.frictionEvents??[],
  });
  const runtimeIntentions=evaluateRuntimeIntentionsV5(input.intentions??[],runtimeContext);
  const weekday=new Date(now+"T12:00:00").getDay();
  const capacity=input.capacity.busyDates.includes(now)
    ? Math.max(10,Math.min(20,input.capacity.weekdayMinutes))
    : weekday===0||weekday===6
      ? input.capacity.weekendMinutes
      : input.capacity.weekdayMinutes;
  const minimumBudget=Math.min(capacity,Math.max(10,policy.retentionBudget.minimumMinutes||Math.round(capacity*.38)));
  const recommendedBudget=Math.min(capacity,Math.max(minimumBudget,policy.retentionBudget.recommendedMinutes||Math.round(capacity*.68)));
  const select=(budget:number,maxItems:number)=>{
    const selected:LearningActionV5[]=[];
    let used=0;
    for(const action of policy.actions){
      if(selected.length>=maxItems||used>=budget)break;
      if(action.topic&&policy.stopDecisions[action.topic.id]?.stop&&!action.planItem)continue;
      const remaining=budget-used;
      if(remaining<5)break;
      const runtimeLimit=runtimeIntentions.maxMinutes??action.minutes;
      const actionMinutes=Math.max(5,Math.min(action.minutes,runtimeLimit,remaining));
      const adapted=runtimeIntentions.replaceWithRetrieval
        ? {...action,kind:"review" as const,title:action.title+" · kevyt muistista palautus",minutes:actionMinutes}
        : {...action,minutes:actionMinutes};
      selected.push(adapted);
      used+=actionMinutes;
    }
    return selected;
  };
  const minimum=select(minimumBudget,2);
  const recommended=select(recommendedBudget,3);
  const extra=runtimeIntentions.dropExtra ? recommended : select(capacity,5);
  const sum=(rows:LearningActionV5[])=>rows.reduce((total,row)=>total+row.minutes,0);
  const nextUnused=policy.actions.find(action=>!recommended.some(row=>row.id===action.id));
  return{
    minimum,recommended,extra,
    minimumMinutes:sum(minimum),
    recommendedMinutes:sum(recommended),
    extraMinutes:sum(extra),
    capacity,
    stoppedForLowMarginalGain:!nextUnused||nextUnused.policyScore<.24,
    retentionBudget:policy.retentionBudget,
    stopDecisions:policy.stopDecisions,
    policyNote:policy.note,
    runtimeIntentions,
  };
}


/* -------------------------------------------------------------------------- */
/* Learning OS v5 public UI compatibility API                                 */
/* -------------------------------------------------------------------------- */

export type RetentionTargetV5 = {
  topicId: string;
  desiredRetention: number;
  currentRetention: number;
  gap: number;
  recommendedMinutes: number;
  urgency: number;
  confidence: EvidenceConfidenceV5;
  reason: string;
};

export type RetentionBudgetV5 = {
  capacityMinutes: number;
  minimumMinutes: number;
  recommendedMinutes: number;
  extraMinutes: number;
  targets: RetentionTargetV5[];
  protectedTopics: string[];
  marginalGainLowAfterMinutes: number;
};

export type InstructionDecisionV5 = {
  stage:
    | "pretest"
    | "worked_example"
    | "self_explanation"
    | "completion"
    | "guided"
    | "independent"
    | "varied_context"
    | "transfer"
    | "delayed_verification";
  label: string;
  reason: string;
  revealWorkedSolution: boolean;
  maxHints: number;
  requiresIndependentFollowup: boolean;
  confidence: EvidenceConfidenceV5;
};

export type FeedbackPolicyV5 = {
  timing: "immediate" | "after_retry" | "after_item" | "after_block";
  reveal: "principle" | "next_step" | "worked_solution" | "score_only" | "none";
  retriesBeforeReveal: number;
  explanation: string;
};

export type TransferLevelV5 = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type TransferStateV5 = {
  level: TransferLevelV5;
  label: string;
  evidenceByLevel: Record<number, number>;
  nextLevel: TransferLevelV5 | null;
  strongEnoughForTopMastery: boolean;
};

export type ConfusionSetV5 = {
  id: string;
  topicIds: string[];
  labels: string[];
  priority: number;
  discriminationStrength: number;
  attempts: number;
  reason: string;
};

export type CalibrationObservationV5 = {
  id?: string;
  course_id?: string | null;
  topic_id: string;
  attempt_id?: string | null;
  predicted_confidence: number;
  actual_outcome: "correct" | "partial" | "incorrect";
  delay_hours: number;
  observed_at?: string;
};

export type CalibrationStateV5 = {
  status: "well_calibrated" | "overconfident" | "underconfident" | "insufficient_evidence";
  accuracy: number | null;
  delayedAccuracy: number | null;
  observations: number;
  recommendation: string;
};

export type FrictionReasonV5 =
  | "no_time"
  | "forgot"
  | "too_tired"
  | "too_hard"
  | "unclear_start"
  | "plans_changed"
  | "started"
  | "other";

export type FrictionEventV5 = {
  id?: string;
  date: string;
  plan_item_id?: string | null;
  course_id?: string | null;
  reason: FrictionReasonV5;
  note?: string | null;
  self_started?: boolean | null;
  reminder_used?: boolean | null;
};

export type ImplementationIntentionV5 = {
  id?: string;
  trigger_type: "late_home" | "low_energy" | "missed_days" | "busy_day" | "custom";
  trigger_value: string;
  action_type: "lighten" | "move" | "replace_with_retrieval" | "protect_rest" | "custom";
  action_value: string;
  enabled: boolean;
  suggested?: boolean;
  reason?: string | null;
};

export type FrictionInsightV5 = {
  repeatedReason: FrictionReasonV5 | null;
  repeatedWeekday: number | null;
  count: number;
  suggestion: ImplementationIntentionV5 | null;
  summary: string;
};

export type ReminderTaperDecisionV5 = {
  mode: "normal" | "taper" | "minimal" | "restore";
  selfStartRate: number | null;
  sampleSize: number;
  recommendation: string;
};

export type WhatIfScenarioV5 = {
  id: string;
  label: string;
  minutesPerDay: number;
  daysOff: number[];
  weeklyCapacity: number;
  projectedBacklogMinutes: number;
  protectedRetentionShare: number;
  overloadRisk: "low" | "medium" | "high";
  marginalValue: "low" | "medium" | "high";
  note: string;
};

export type SubjectTaskProfileV5 = {
  key: string;
  subject: string;
  attemptType: string;
  observations: number;
  successRate: number;
  delayedSuccessRate: number | null;
  medianResponseMs: number | null;
  reliability: EvidenceConfidenceV5;
  spacingMultiplier: number;
  difficultyBias: number;
};

export type ExamSimulationTaskV5 = {
  id: string;
  title: string;
  topicId: string | null;
  points: number;
  answerMode: "text" | "formula" | "diagram" | "graph" | "mixed";
  stimulus: Record<string, unknown> | null;
  selected?: boolean;
};

export type ExamSimulationV5 = {
  courseId: string;
  mode: "practice" | "full";
  maxTasks: number;
  maxSelected: number;
  maxPoints: number;
  durationMinutes: number;
  feedbackTiming: "after_block";
  hintsAllowed: false;
  masteryHidden: true;
  tasks: ExamSimulationTaskV5[];
};

export function evidenceConfidenceV5(
  evidenceCount: number,
  diversity = 1,
  recency = 1,
  reason = "oppimisnäyttöä",
): EvidenceConfidenceV5 {
  const score = clamp(
    (1 - Math.exp(-Math.max(0, evidenceCount) / 5)) * 0.68 +
    clamp(diversity) * 0.18 +
    clamp(recency) * 0.14,
  );
  return {
    score,
    label: score >= 0.72 ? "high" : score >= 0.42 ? "medium" : "low",
    evidenceCount,
    reason: score >= 0.72
      ? `Suositus perustuu ${evidenceCount} havaintoon ja monipuoliseen näyttöön.`
      : score >= 0.42
        ? `Suositus on käyttökelpoinen, mutta ${reason} tarvitaan vielä lisää.`
        : `Tämä on alustava suositus: ${reason} on vielä vähän.`,
  };
}

export function retentionTargetV5(
  topic: Topic,
  course: Course,
  attempts: PracticeAttempt[],
  now = today(),
): RetentionTargetV5 {
  const model = masteryModelV4(topic, attempts, { now, examDate: course.exam_date });
  const rows = attempts.filter((attempt) => attempt.topic_id === topic.id && !attempt.is_pretest);
  const examDays = daysToExam(course, now);
  const urgency =
    examDays <= 2 ? 1 :
    examDays <= 7 ? 0.88 :
    examDays <= 14 ? 0.72 :
    examDays <= 30 ? 0.48 :
    examDays <= 60 ? 0.3 : 0.18;
  const importance = clamp(Number(topic.importance ?? 3) / 5);
  const desiredRetention = clamp(0.72 + urgency * 0.115 + importance * 0.055 + (model.blindSpot ? 0.025 : 0), 0.7, 0.95);
  const currentRetention = clamp(model.dimensions.retention.score / 100);
  const gap = Math.max(0, desiredRetention - currentRetention);
  const recommendedMinutes = gap <= 0.025 ? 0 : Math.max(5, Math.min(35, Math.round((gap * 55 + urgency * 9 + importance * 5) / 5) * 5));
  const confidence = evidenceConfidenceV5(
    rows.length,
    Math.min(1, new Set(rows.map((row) => row.attempt_type)).size / 4),
    Math.min(1, new Set(rows.map((row) => row.date)).size / 4),
    "viive- ja muistista palauttamisen näyttöä",
  );
  return {
    topicId: topic.id,
    desiredRetention,
    currentRetention,
    gap,
    recommendedMinutes,
    urgency,
    confidence,
    reason: [
      gap >= 0.18 ? "muistamisen tavoite ja nykyinen säilyminen ovat selvästi erillään" : null,
      model.forgettingRisk >= 0.6 ? "unohtumisriski on koholla" : null,
      urgency >= 0.72 ? "koe on lähellä" : null,
      model.blindSpot ? "kalibroinnissa näkyy mahdollinen sokea piste" : null,
    ].filter(Boolean).join(" · ") || "nykyinen säilyminen on lähellä tarkoituksenmukaista tasoa",
  };
}

function capacityForDateCompat(capacity: CapacityProfile, date: string) {
  if (capacity.busyDates.includes(date)) return 0;
  const jsDay = new Date(date + "T12:00:00Z").getUTCDay();
  const studyDay = jsDay === 0 ? 7 : jsDay; // 1=Mon ... 7=Sun
  if (capacity.studyWeekdays.length && !capacity.studyWeekdays.includes(studyDay)) return 0;
  if (jsDay === 0 || jsDay === 6) return capacity.weekendMinutes;
  return capacity.weekdayMinutes;
}

export function retentionBudgetV5(input: {
  courses: Course[];
  topics: Topic[];
  attempts: PracticeAttempt[];
  capacity: CapacityProfile;
  now?: string;
}): RetentionBudgetV5 {
  const now = input.now ?? today();
  const targets = input.topics.flatMap((topic) => {
    const course = input.courses.find((candidate) => candidate.id === topic.course_id);
    if (!course || course.archived || (course.start_date && course.start_date > now)) return [];
    return [retentionTargetV5(topic, course, input.attempts, now)];
  }).sort((a, b) => (b.gap * 0.55 + b.urgency * 0.45) - (a.gap * 0.55 + a.urgency * 0.45));
  const capacityMinutes = Array.from({ length: 7 }, (_, index) => capacityForDateCompat(input.capacity, addDays(now, index))).reduce((sum, value) => sum + value, 0);
  const raw = targets.reduce((sum, target) => sum + target.recommendedMinutes, 0);
  const recommendedMinutes = Math.min(Math.round(capacityMinutes * 0.68), raw);
  const minimumMinutes = Math.min(recommendedMinutes, Math.max(0, Math.round(recommendedMinutes * 0.58 / 5) * 5));
  const extraMinutes = Math.min(capacityMinutes, Math.max(recommendedMinutes, Math.round(recommendedMinutes * 1.28 / 5) * 5));
  const protectedTopics = targets.filter((target) => target.urgency >= 0.72 || target.gap >= 0.18).slice(0, 8).map((target) => target.topicId);
  return {
    capacityMinutes,
    minimumMinutes,
    recommendedMinutes,
    extraMinutes,
    targets,
    protectedTopics,
    marginalGainLowAfterMinutes: Math.max(recommendedMinutes, Math.min(extraMinutes, recommendedMinutes + 30)),
  };
}

export function instructionDecisionV5(
  topic: Topic,
  attempts: PracticeAttempt[],
  options: { now?: string; examDate?: string | null } = {},
): InstructionDecisionV5 {
  const confidenceRows = attempts.filter((attempt) => attempt.topic_id === topic.id && !attempt.is_pretest);
  const confidence = evidenceConfidenceV5(
    confidenceRows.length,
    Math.min(1, new Set(confidenceRows.map((row) => row.attempt_type)).size / 4),
    Math.min(1, new Set(confidenceRows.map((row) => row.date)).size / 4),
    "eri päivien ja tehtävätyyppien näyttöä",
  );
  const pretest = pretestPlanV5(topic, attempts);
  if (pretest.enabled) return {
    stage: "pretest",
    label: "Ennakkotesti",
    reason: "Ennen opetusta tarkistetaan, mitä jo tiedät. Väärä vastaus ei laske osaamistasoa.",
    revealWorkedSolution: false,
    maxHints: 0,
    requiresIndependentFollowup: false,
    confidence,
  };
  const plan = instructionPlanV5(topic, attempts, options);
  const stage: InstructionDecisionV5["stage"] =
    plan.stage === "worked_example" ? "worked_example" :
    plan.stage === "explain_steps" ? "self_explanation" :
    plan.stage === "completion_problem" || plan.stage === "faded_completion" ? "completion" :
    plan.stage === "varied_context" ? "varied_context" :
    plan.stage === "transfer" ? "transfer" :
    plan.label.toLocaleLowerCase("fi-FI").includes("varmistus") ? "delayed_verification" :
    "independent";
  return {
    stage,
    label: plan.label,
    reason: plan.reason,
    revealWorkedSolution: stage === "worked_example" || stage === "self_explanation",
    maxHints: plan.hintLimit,
    requiresIndependentFollowup: plan.requiresIndependentFollowup,
    confidence,
  };
}

export function feedbackPolicyV5(input: {
  mode: "pretest" | "learning" | "retrieval" | "exam_simulation" | "error_repair";
  result?: "correct" | "partial" | "incorrect";
  stage?: InstructionDecisionV5["stage"];
}): FeedbackPolicyV5 {
  if (input.mode === "exam_simulation") return {
    timing: "after_block", reveal: "score_only", retriesBeforeReveal: 0,
    explanation: "Koetilassa palaute pidätetään, kunnes kaikki valitut tehtävät on tehty.",
  };
  if (input.mode === "pretest") return {
    timing: "after_item", reveal: "principle", retriesBeforeReveal: 0,
    explanation: "Ennakkotesti ei muuta osaamistasoa ja näyttää periaatteen vasta oman yrityksen jälkeen.",
  };
  if (input.mode === "error_repair") return {
    timing: "after_retry", reveal: "next_step", retriesBeforeReveal: 1,
    explanation: "Virheessä paikannetaan ensin poikkeama ja yritetään korjausta ennen mallia.",
  };
  if (input.mode === "retrieval") return {
    timing: "after_retry", reveal: input.result === "incorrect" ? "principle" : "next_step", retriesBeforeReveal: 1,
    explanation: "Muistista palauttamisessa tehdään yksi uusi yritys ennen täydempää palautetta.",
  };
  return {
    timing: "immediate",
    reveal: input.stage === "worked_example" ? "worked_solution" : "principle",
    retriesBeforeReveal: 0,
    explanation: "Uuden asian opettelussa palaute annetaan riittävän nopeasti virheellisen mallin vahvistumisen estämiseksi.",
  };
}

const transferCompatLabels = ["Muistista palautus","Selitys","Sama tilanne","Muunneltu tilanne","Eri esitystapa","Uusi tilanne","Koetason soveltaminen"];

export function transferStateV5(topic: Topic, attempts: PracticeAttempt[]): TransferStateV5 {
  const ladder = transferLadderV5(topic, attempts);
  const mapping: Record<TransferLevel, TransferLevelV5> = {
    recall: 0, same_context: 2, varied_context: 3, different_representation: 4,
    unfamiliar_scenario: 5, mixed_topic: 5, exam_transfer: 6,
  };
  const evidenceByLevel: Record<number, number> = Object.fromEntries(Array.from({length:7},(_,level)=>[level,0]));
  for (const [level, count] of Object.entries(ladder.evidenceByLevel) as Array<[TransferLevel, number]>) {
    evidenceByLevel[mapping[level]] = (evidenceByLevel[mapping[level]] ?? 0) + count;
  }
  const level = mapping[ladder.highestReliableLevel];
  return {
    level,
    label: transferCompatLabels[level] ?? "Muistista palautus",
    evidenceByLevel,
    nextLevel: level < 6 ? (level + 1) as TransferLevelV5 : null,
    strongEnoughForTopMastery: ladder.strongEligible,
  };
}

export function confusionSetsV5(input: {
  topics: Topic[];
  dependencies: TopicDependencyLike[];
  attempts: PracticeAttempt[];
  now?: string;
}): ConfusionSetV5[] {
  return confusionAwareInterleavingV5(input.topics, input.dependencies, input.attempts).map((set) => {
    const related = input.attempts.filter((attempt) =>
      set.topicIds.includes(attempt.topic_id) &&
      (attempt.discrimination_topic_ids?.some((id) => set.topicIds.includes(id)) ||
       Array.isArray(attempt.question_payload?.["discriminationTopicIds"]))
    );
    const correct = related.filter((attempt) => resultScore(attempt) >= 0.9).length;
    const discriminationStrength = related.length ? correct / related.length : set.strength;
    return {
      id: set.id,
      topicIds: set.topicIds,
      labels: set.topics.map((topic) => topic.name),
      priority: clamp(0.45 + (1 - discriminationStrength) * 0.4 + Math.min(0.15, related.filter((a)=>resultScore(a)<0.9).length*0.03)),
      discriminationStrength,
      attempts: related.length,
      reason: set.reason,
    };
  }).sort((a,b)=>b.priority-a.priority);
}

export function delayedCalibrationV5(observations: CalibrationObservationV5[]): CalibrationStateV5 {
  if (!observations.length) return {
    status: "insufficient_evidence", accuracy: null, delayedAccuracy: null, observations: 0,
    recommendation: "Kalibrointinäyttöä ei ole vielä. Arvioi myöhemmin ennen muistista palauttamista, kuinka varma olet.",
  };
  const score = (row: CalibrationObservationV5) => {
    const predicted = clamp((row.predicted_confidence - 1) / 2);
    const actual = row.actual_outcome === "correct" ? 1 : row.actual_outcome === "partial" ? 0.5 : 0;
    return 1 - Math.abs(predicted - actual);
  };
  const accuracy = observations.reduce((sum,row)=>sum+score(row),0)/observations.length;
  const delayed = observations.filter((row)=>row.delay_hours>=12);
  const delayedAccuracy = delayed.length ? delayed.reduce((sum,row)=>sum+score(row),0)/delayed.length : null;
  const over = observations.filter((row)=>row.predicted_confidence>=3&&row.actual_outcome==="incorrect").length;
  const under = observations.filter((row)=>row.predicted_confidence<=1&&row.actual_outcome==="correct").length;
  const status: CalibrationStateV5["status"] =
    observations.length < 3 || !delayed.length ? "insufficient_evidence" :
    over / observations.length >= 0.3 ? "overconfident" :
    under / observations.length >= 0.3 ? "underconfident" :
    "well_calibrated";
  return {
    status, accuracy, delayedAccuracy, observations: observations.length,
    recommendation:
      status === "overconfident" ? "Oma varmuus ylittää toistuvasti myöhemmän suorituksen. Lisää viivästettyä muistista palauttamista ennen aiheen nostamista vahvaksi." :
      status === "underconfident" ? "Suoritus on omaa arviota parempi. Käytä toteutunutta näyttöä oman tuntemuksen sijaan." :
      status === "well_calibrated" ? "Arvio omasta osaamisesta vastaa melko hyvin myöhempää suoritusta." :
      "Kerätään vielä muutama viivästetty arvio ennen johtopäätöstä.",
  };
}

function frictionWeekday(date: string) {
  return new Date(date + "T12:00:00Z").getUTCDay();
}

function frictionReasonLabelV5(reason: FrictionReasonV5) {
  const labels: Record<FrictionReasonV5,string> = {
    no_time:"ajan puute",
    forgot:"unohtaminen",
    too_tired:"väsymys",
    too_hard:"tehtävän koettu vaikeus",
    unclear_start:"epäselvä aloitus",
    plans_changed:"muuttuneet suunnitelmat",
    started:"opiskelun aloitus",
    other:"muu syy",
  };
  return labels[reason];
}

function frictionWeekdayLabelV5(day:number){
  return ["sunnuntaina","maanantaina","tiistaina","keskiviikkona","torstaina","perjantaina","lauantaina"][day]??"";
}

export function frictionInsightV5(events: FrictionEventV5[]): FrictionInsightV5 {
  const rows = events.filter((event)=>event.reason!=="started" && event.self_started!==true);
  if (!rows.length) return { repeatedReason:null,repeatedWeekday:null,count:0,suggestion:null,summary:"Ohitetuista opiskelukerroista ei ole vielä riittävästi havaintoja." };
  const byReason=new Map<FrictionReasonV5,number>();
  for(const event of rows) byReason.set(event.reason,(byReason.get(event.reason)??0)+1);
  const reason=[...byReason.entries()].sort((a,b)=>b[1]-a[1])[0];
  const repeatedReason=reason&&reason[1]>=2?reason[0]:null;
  const reasonRows=repeatedReason?rows.filter(event=>event.reason===repeatedReason):[];
  const byDay=new Map<number,number>();
  for(const event of reasonRows){const d=frictionWeekday(event.date);byDay.set(d,(byDay.get(d)??0)+1);}
  const day=[...byDay.entries()].sort((a,b)=>b[1]-a[1])[0];
  const repeatedWeekday=day&&day[1]>=2?day[0]:null;
  let suggestion:ImplementationIntentionV5|null=null;
  if(repeatedReason==="too_tired") suggestion={trigger_type:"low_energy",trigger_value:"true",action_type:"replace_with_retrieval",action_value:"15",enabled:false,suggested:true,reason:"Väsymys toistuu: vaihda raskas työ 15 minuutin muistista palauttamiseen."};
  else if(repeatedReason==="no_time"||repeatedReason==="plans_changed") suggestion={trigger_type:"busy_day",trigger_value:repeatedWeekday===null?"any":String(repeatedWeekday),action_type:"lighten",action_value:"0.4",enabled:false,suggested:true,reason:"Aikapula toistuu: kevennä tällaiset päivät automaattisesti."};
  else if(repeatedReason==="too_hard"||repeatedReason==="unclear_start") suggestion={trigger_type:"custom",trigger_value:repeatedReason,action_type:"replace_with_retrieval",action_value:"worked_example_then_10m",enabled:false,suggested:true,reason:"Aloita yhdellä esimerkillä ja rajatulla 10 minuutin tehtävällä."};
  else if(repeatedReason==="forgot") suggestion={trigger_type:"custom",trigger_value:"forgot_twice",action_type:"replace_with_retrieval",action_value:"10",enabled:false,suggested:true,reason:"Unohtaminen toistuu: tee seuraavasta aloituksesta 10 minuutin muistista palauttaminen ja sido se tuttuun arjen rutiiniin."};
  return {
    repeatedReason,repeatedWeekday,count:reason?.[1]??0,suggestion,
    summary:repeatedReason?`Yleisin toistuva este on ${frictionReasonLabelV5(repeatedReason)}${repeatedWeekday===null?"":`, erityisesti ${frictionWeekdayLabelV5(repeatedWeekday)}`}.`:"Yksittäisiä esteitä on, mutta toistuvaa mallia ei vielä näy.",
  };
}

export function applyImplementationIntentionsV5(
  drafts: PlanDraft[],
  rules: ImplementationIntentionV5[],
  frictionEvents: FrictionEventV5[] = [],
): { drafts: PlanDraft[]; applied: Array<{ id: string; count: number; reason: string }> } {
  const enabled = rules.filter((rule) => rule.enabled);
  const counts = new Map<string, { count: number; reason: string }>();

  const matches = (draft: PlanDraft, rule: ImplementationIntentionV5) => {
    if (draft.kind === "exam") return false;
    const weekday = new Date(draft.date + "T12:00:00Z").getUTCDay();
    if (rule.trigger_type === "busy_day") {
      return rule.trigger_value === "any" || rule.trigger_value === String(weekday);
    }
    const relevantReason =
      rule.trigger_type === "low_energy" ? "too_tired" :
      rule.trigger_type === "custom" && (rule.trigger_value === "too_hard" || rule.trigger_value === "unclear_start") ? rule.trigger_value :
      rule.trigger_type === "custom" && rule.trigger_value === "forgot_twice" ? "forgot" :
      null;
    if (relevantReason) {
      const matching = frictionEvents.filter(event =>
        event.reason === relevantReason &&
        event.self_started !== true &&
        frictionWeekday(event.date) === weekday
      );
      return matching.length >= 2;
    }
    return false;
  };

  const transformed = drafts.map((source) => {
    let draft = { ...source };
    for (const rule of enabled) {
      if (!matches(draft, rule)) continue;
      let changed = false;

      if (rule.action_type === "lighten") {
        const factor = Math.max(0.2, Math.min(1, Number(rule.action_value) || 0.4));
        const target = Math.max(10, Math.round((draft.target_minutes * factor) / 5) * 5);
        draft = {
          ...draft,
          target_minutes: target,
          min_minutes: Math.min(target, Math.max(5, Math.round((target * 0.6) / 5) * 5)),
          extra_minutes: 0,
          phase: draft.phase === "content" ? "review" : draft.phase,
          kind: draft.phase === "content" ? "review" : draft.kind,
          title: draft.title.includes("kevyt") ? draft.title : draft.title + " – kevyt versio",
        };
        changed = true;
      } else if (rule.action_type === "replace_with_retrieval") {
        const parsed = Number(rule.action_value);
        const target = Number.isFinite(parsed) ? Math.max(5, Math.min(30, parsed)) : 15;
        draft = {
          ...draft,
          phase: "review",
          kind: "review",
          target_minutes: target,
          min_minutes: Math.min(10, target),
          extra_minutes: 0,
          title: draft.title.replace(/\s[–-].*$/, "") + " – kevyt muistista palautus",
        };
        changed = true;
      } else if (rule.action_type === "move" && /^\+\d+$/.test(rule.action_value)) {
        const days = Math.max(1, Math.min(7, Number(rule.action_value.slice(1))));
        draft = { ...draft, date: addDays(draft.date, days) };
        changed = true;
      } else if (rule.action_type === "protect_rest") {
        draft = { ...draft, extra_minutes: 0 };
        changed = true;
      }

      if (changed) {
        const id = rule.id ?? [rule.trigger_type, rule.trigger_value, rule.action_type].join(":");
        const previous = counts.get(id);
        counts.set(id, {
          count: (previous?.count ?? 0) + 1,
          reason: rule.reason ?? "Aktiivinen jos–niin-sääntö mukautti ehdotusta.",
        });
      }
    }
    return draft;
  });

  return {
    drafts: transformed,
    applied: [...counts.entries()].map(([id, value]) => ({ id, ...value })),
  };
}


export type RuntimeIntentionContextV5 = {
  now: string;
  localTime: string;
  busyDates: string[];
  latestEnergy: number | null;
  daysSinceLastSession: number | null;
  weekday: number;
  recentFrictionReasons: FrictionReasonV5[];
};

export type RuntimeIntentionEffectV5 = {
  triggeredRuleIds: string[];
  maxMinutes: number | null;
  replaceWithRetrieval: boolean;
  dropExtra: boolean;
  moveDays: number | null;
  notes: string[];
};

export function runtimeIntentionContextV5(input:{
  sessions: Session[];
  capacity: CapacityProfile;
  now?: string;
  localTime?: string;
  frictionEvents?: FrictionEventV5[];
}):RuntimeIntentionContextV5 {
  const now=input.now??today();
  const recent=[...input.sessions].filter(session=>session.date<=now).sort((a,b)=>
    (b.date+"T"+b.created_at).localeCompare(a.date+"T"+a.created_at)
  );
  const latest=recent[0]??null;
  return {
    now,
    localTime:input.localTime??new Date().toLocaleTimeString("fi-FI",{hour:"2-digit",minute:"2-digit",hour12:false}),
    busyDates:input.capacity.busyDates,
    latestEnergy:typeof latest?.energy==="number"?latest.energy:null,
    daysSinceLastSession:latest?Math.max(0,diffDays(now,latest.date)):null,
    weekday:new Date(now+"T12:00:00Z").getUTCDay(),
    recentFrictionReasons:(input.frictionEvents??[])
      .filter(event=>event.date>=addDays(now,-14) && event.self_started!==true)
      .map(event=>event.reason),
  };
}

function timeToMinutesV5(value:string){
  const match=/^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if(!match)return null;
  const hour=Number(match[1]),minute=Number(match[2]);
  if(hour<0||hour>23||minute<0||minute>59)return null;
  return hour*60+minute;
}

export function evaluateRuntimeIntentionsV5(
  rules:ImplementationIntentionV5[],
  context:RuntimeIntentionContextV5,
):RuntimeIntentionEffectV5 {
  const effect:RuntimeIntentionEffectV5={
    triggeredRuleIds:[],maxMinutes:null,replaceWithRetrieval:false,dropExtra:false,moveDays:null,notes:[],
  };
  const currentMinutes=timeToMinutesV5(context.localTime);

  for(const rule of rules.filter(row=>row.enabled)){
    let triggered=false;
    if(rule.trigger_type==="busy_day"){
      triggered=context.busyDates.includes(context.now)||
        rule.trigger_value==="any"||
        rule.trigger_value===String(context.weekday);
    }else if(rule.trigger_type==="late_home"){
      const threshold=timeToMinutesV5(rule.trigger_value);
      triggered=threshold!==null&&currentMinutes!==null&&currentMinutes>=threshold;
    }else if(rule.trigger_type==="low_energy"){
      const threshold=Number(rule.trigger_value);
      triggered=context.latestEnergy!==null&&context.latestEnergy<=(Number.isFinite(threshold)?threshold:2);
    }else if(rule.trigger_type==="missed_days"){
      const threshold=Math.max(1,Number(rule.trigger_value)||2);
      triggered=context.daysSinceLastSession!==null&&context.daysSinceLastSession>=threshold;
    }else if(rule.trigger_type==="custom"){
      if(rule.trigger_value==="forgot_twice"){
        triggered=context.recentFrictionReasons.filter(reason=>reason==="forgot").length>=2;
      }else if(rule.trigger_value==="too_hard"||rule.trigger_value==="unclear_start"){
        triggered=context.recentFrictionReasons.filter(reason=>reason===rule.trigger_value).length>=2;
      }
    }
    if(!triggered)continue;

    const id=rule.id??[rule.trigger_type,rule.trigger_value,rule.action_type].join(":");
    effect.triggeredRuleIds.push(id);
    if(rule.reason)effect.notes.push(rule.reason);

    if(rule.action_type==="replace_with_retrieval"){
      const parsed=Number(rule.action_value);
      effect.replaceWithRetrieval=true;
      effect.maxMinutes=Math.min(effect.maxMinutes??Infinity,Number.isFinite(parsed)?Math.max(5,Math.min(30,parsed)):15);
    }else if(rule.action_type==="lighten"){
      const parsed=Number(rule.action_value);
      if(Number.isFinite(parsed)&&parsed>1)effect.maxMinutes=Math.min(effect.maxMinutes??Infinity,Math.max(5,Math.min(60,parsed)));
      else effect.maxMinutes=Math.min(effect.maxMinutes??Infinity,20);
      effect.dropExtra=true;
    }else if(rule.action_type==="protect_rest"){
      effect.dropExtra=true;
      effect.maxMinutes=Math.min(effect.maxMinutes??Infinity,15);
    }else if(rule.action_type==="move"){
      const match=/^\+(\d+)$/.exec(rule.action_value);
      effect.moveDays=match?Math.max(1,Math.min(7,Number(match[1]))):1;
      effect.dropExtra=true;
    }
  }
  if(effect.maxMinutes===Infinity)effect.maxMinutes=null;
  if(effect.triggeredRuleIds.length&&!effect.notes.length){
    effect.notes.push("Aktiivinen jos–niin-sääntö mukautti tämän päivän kuormaa.");
  }
  return effect;
}

export function reminderTaperV5(events: FrictionEventV5[]): ReminderTaperDecisionV5 {
  const started=events.filter((event)=>typeof event.self_started==="boolean");
  if(started.length<5)return{mode:"normal",selfStartRate:started.length?started.filter(e=>e.self_started).length/started.length:null,sampleSize:started.length,recommendation:"Muistutuksia ei vielä säädetä, koska itsenäisistä aloituksista on liian vähän havaintoja."};
  const rate=started.filter(e=>e.self_started).length/started.length;
  const recent=started.slice(0,5);
  const recentRate=recent.filter(e=>e.self_started).length/recent.length;
  const mode:ReminderTaperDecisionV5["mode"]=rate>=.85&&recentRate>=.8?"minimal":rate>=.7?"taper":rate<.5&&recentRate<.5?"restore":"normal";
  return{mode,selfStartRate:rate,sampleSize:started.length,recommendation:mode==="minimal"?"Aloitat jo lähes aina itse. Pidä vain kriittiset koe- ja aikataulumuistutukset.":mode==="taper"?"Vähennä tavallisia muistutuksia asteittain.":mode==="restore"?"Palauta yksi kevyt muistutus väliaikaisesti.":"Nykyinen muistutustaso on sopiva."};
}

function attemptSuccessCompat(attempt: PracticeAttempt) {
  return resultScore(attempt);
}
function medianCompat(values:number[]){if(!values.length)return null;const sorted=[...values].sort((a,b)=>a-b);const m=Math.floor(sorted.length/2);return sorted.length%2?sorted[m]!:Math.round((sorted[m-1]!+sorted[m]!)/2);}

export function subjectTaskProfilesV5(
  attempts: PracticeAttempt[],
  subjectForCourse: (courseId: string) => string,
): SubjectTaskProfileV5[] {
  const groups=new Map<string,PracticeAttempt[]>();
  for(const attempt of attempts.filter((row)=>!row.is_pretest)){
    const subject=subjectForCourse(attempt.course_id)||"Muu";
    const key=`${subject}::${attempt.attempt_type}`;
    groups.set(key,[...(groups.get(key)??[]),attempt]);
  }
  return [...groups.entries()].map(([key,rows])=>{
    const [subject,attemptType]=key.split("::");
    const successRate=rows.reduce((sum,row)=>sum+attemptSuccessCompat(row),0)/rows.length;
    const delayed=rows.filter(row=>Number(row.delay_days??0)>=2);
    const delayedSuccessRate=delayed.length?delayed.reduce((sum,row)=>sum+attemptSuccessCompat(row),0)/delayed.length:null;
    const responseTimes=rows.flatMap(row=>typeof row.response_time_ms==="number"?[row.response_time_ms]:[]);
    const reliability=evidenceConfidenceV5(rows.length,Math.min(1,new Set(rows.map(row=>row.date)).size/6),Math.min(1,delayed.length/4),"oppiaine- ja tehtävätyyppikohtaista näyttöä");
    const forgettingPenalty=delayedSuccessRate===null?0:Math.max(0,successRate-delayedSuccessRate);
    return {
      key,subject:subject??"Muu",attemptType:attemptType??"practice",observations:rows.length,successRate,delayedSuccessRate,
      medianResponseMs:medianCompat(responseTimes),reliability,
      spacingMultiplier:reliability.label==="low"?1:Math.max(.72,Math.min(1.35,1-forgettingPenalty*.45+(successRate-.7)*.18)),
      difficultyBias:reliability.label==="low"?0:Math.max(-.2,Math.min(.2,(successRate-.72)*-.45)),
    };
  }).sort((a,b)=>b.observations-a.observations);
}

export function whatIfPlannerV5(input:{
  courses:Course[];topics:Topic[];attempts:PracticeAttempt[];capacity:CapacityProfile;now?:string;customMinutes?:number[];
}):WhatIfScenarioV5[]{
  const budget=retentionBudgetV5(input);
  const minutes=[...new Set([...(input.customMinutes??[]),20,40,60])].filter(v=>v>0).sort((a,b)=>a-b);
  return minutes.map(minutesPerDay=>{
    const studyDayCount=Math.max(1,input.capacity.studyWeekdays.length);
    const weeklyCapacity=minutesPerDay*studyDayCount;
    const backlog=Math.max(0,budget.recommendedMinutes-weeklyCapacity);
    const protectedRetentionShare=budget.recommendedMinutes<=0?1:Math.min(1,weeklyCapacity/budget.recommendedMinutes);
    const overloadRisk:WhatIfScenarioV5["overloadRisk"]=weeklyCapacity>=budget.recommendedMinutes*1.3?"low":weeklyCapacity>=budget.minimumMinutes?"medium":"high";
    const marginalValue:WhatIfScenarioV5["marginalValue"]=weeklyCapacity<budget.minimumMinutes?"high":weeklyCapacity<=budget.marginalGainLowAfterMinutes?"medium":"low";
    return{id:`minutes:${minutesPerDay}`,label:`${minutesPerDay} min / päivä`,minutesPerDay,daysOff:[],weeklyCapacity,projectedBacklogMinutes:backlog,protectedRetentionShare,overloadRisk,marginalValue,note:backlog>0?`Arviolta ${backlog} min tärkeää kertausbudjettia jäisi kattamatta.`:marginalValue==="low"?"Lisäminuuttien rajahyöty on jo pieni.":"Tämä kattaa nykyisen tärkeän kertausbudjetin."};
  });
}

export function contrastiveRepairPlanV5(mistake:Mistake){
  return{
    mistakeId:mistake.id,
    stages:[
      "Näytä alkuperäinen oma ratkaisu muuttamatta sitä.",
      "Paikanna ensimmäinen kohta, jossa ratkaisu erkanee oikeasta periaatteesta.",
      "Selitä omin sanoin miksi ero muuttaa lopputulosta.",
      "Korjaa vain virheellinen vaihe ja jatka ratkaisu loppuun.",
      "Ratkaise uusi saman periaatteen tehtävä ilman mallia.",
      "Aikatauluta myöhempi varmistus muutaman päivän päähän.",
    ],
    completed:mistake.status==="mastered",
    next:mistake.status==="open"?"Paikanna ensimmäinen poikkeama.":mistake.status==="corrected"?"Ratkaise uusi rinnakkaistehtävä.":mistake.status==="retested"?"Tee myöhempi varmistus.":"Virhe on varmennettu korjatuksi.",
  };
}

function questionAnswerModeV5(item:QuestionBankItem):ExamSimulationTaskV5["answerMode"]{
  const configured=item.answer_mode??String(item.metadata?.["answerMode"]??"");
  if(["text","formula","diagram","graph","mixed"].includes(configured))return configured as ExamSimulationTaskV5["answerMode"];
  return item.question_type==="calculation"?"formula":"text";
}
function questionPointsV5(item:QuestionBankItem){const n=Number(item.points??item.metadata?.["points"]??0);return Number.isFinite(n)&&n>0?Math.min(30,Math.max(2,Math.round(n))):item.difficulty>=5?20:item.difficulty>=4?18:item.difficulty>=3?16:12;}

export function buildExamSimulationV5(input:{course:Course;topics:Topic[];questions:QuestionBankItem[];mode?:"practice"|"full"}):ExamSimulationV5{
  const mode=input.mode??"full", topicIds=new Set(input.topics.map(t=>t.id));
  const candidates=input.questions.filter(q=>q.course_id===input.course.id).filter(q=>q.topic_id===null||topicIds.has(q.topic_id)).sort((a,b)=>b.difficulty-a.difficulty||a.created_at.localeCompare(b.created_at));
  const desired=mode==="full"?11:Math.min(6,candidates.length);
  const tasks=candidates.slice(0,desired).map((item,index)=>({id:item.id,title:`Tehtävä ${index+1}`,topicId:item.topic_id,points:questionPointsV5(item),answerMode:questionAnswerModeV5(item),stimulus:(item.stimulus_package??item.metadata?.["stimulusPackage"]??null) as Record<string,unknown>|null}));
  return{courseId:input.course.id,mode,maxTasks:tasks.length,maxSelected:mode==="full"?Math.min(7,tasks.length):tasks.length,maxPoints:120,durationMinutes:mode==="full"?360:90,feedbackTiming:"after_block",hintsAllowed:false,masteryHidden:true,tasks};
}

export function reviewTaskSelectionV5(input:{simulation:ExamSimulationV5;selectedTaskIds:string[];completedTaskIds:string[];scores:Record<string,number>}){
  const selected=input.simulation.tasks.filter(task=>input.selectedTaskIds.includes(task.id));
  const completed=selected.filter(task=>input.completedTaskIds.includes(task.id));
  const earned=selected.reduce((sum,task)=>sum+Number(input.scores[task.id]??0),0);
  const possible=selected.reduce((sum,task)=>sum+task.points,0);
  const unfinished=selected.filter(task=>!input.completedTaskIds.includes(task.id));
  return{selected:selected.length,completed:completed.length,earned,possible,unfinished:unfinished.map(t=>t.title),note:unfinished.length?"Valittuja tehtäviä jäi kesken. Arvioi tehtävän vaatima aika ennen lopullista valintaa.":"Valitut tehtävät valmistuivat. Vertaa seuraavaksi pistepotentiaalia ja ajankäyttöä."};
}
