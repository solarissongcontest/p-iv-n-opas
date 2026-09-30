import type {
  CapacityProfile,
  Course,
  Mistake,
  PlanItem,
  PracticeAttempt,
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

export type StopDecision = {
  stop: boolean;
  reason: string;
  nextUsefulReview: string | null;
  marginalGainPerMinute: number;
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
  const rows = attempts.filter((attempt) => attempt.topic_id === topic.id);
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
    level === "medium" ? `Kohtalainen varmuus: dataa on ${evidence.distinctDays} eri päivältä.` :
    level === "low" ? "Alustava suositus: henkilökohtaista dataa on vielä vähän." :
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
  options: { now?: string; sessionDate?: string } = {},
): StopDecision {
  const now = options.now ?? today();
  const sessionDate = options.sessionDate ?? now;
  const rows = attempts.filter((a) => a.topic_id === topic.id && a.date === sessionDate);
  const independentCorrect = rows.filter((a) => resultScore(a) >= 0.9 && !isAssisted(a)).length;
  const assistedSuccesses = rows.filter((a) => resultScore(a) >= 0.9 && isAssisted(a)).length;
  const distinctTypes = new Set(rows.filter((a) => resultScore(a) >= 0.9).map((a) => a.attempt_type)).size;
  const transferSuccesses = rows.filter((a) => resultScore(a) >= 0.9 && !isAssisted(a) && ["unfamiliar_scenario","mixed_topic","exam_transfer"].includes(attemptLevel(a))).length;
  const explanationSuccesses = rows.filter((a) => resultScore(a) >= 0.9 && !isAssisted(a) && a.attempt_type === "explanation").length;
  const recent = rows.slice(-4);
  const latestSuccessRate = recent.length ? recent.reduce((sum,row)=>sum+resultScore(row),0)/recent.length : 0;
  const model = masteryModelV4(topic, attempts, { now });
  const enoughEvidence =
    independentCorrect >= 2 &&
    distinctTypes >= 2 &&
    latestSuccessRate >= 0.88 &&
    !model.verificationRequired;
  const transferReady = model.level <= 2 || transferSuccesses >= 1 || explanationSuccesses >= 1;
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
  return {
    stop,
    reason,
    nextUsefulReview,
    marginalGainPerMinute,
    evidence: { independentCorrect, distinctTypes, transferSuccesses, explanationSuccesses, assistedSuccesses },
  };
}

export function instructionPlanV5(
  topic: Topic,
  attempts: PracticeAttempt[],
  options: { now?: string; examDate?: string | null } = {},
): InstructionPlanV5 {
  const base = practicePathV4(topic, attempts, options);
  const rows = attempts.filter((a) => a.topic_id === topic.id);
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
    label: "Transfer-tehtävä",
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
  const rows = attempts.filter((a) => a.topic_id === topic.id);
  const independent = rows.filter((a) => !isAssisted(a)).length;
  const enabled = independent < 2 && topic.progress < 35;
  return {
    enabled,
    questionCount: enabled ? Math.min(4, Math.max(2, topic.importance >= 4 ? 3 : 2)) : 0,
    affectsMastery: false,
    feedbackTiming: "after_attempt",
    reason: enabled
      ? "Preview Challenge kartoittaa ennakkotiedot ilman mastery-rangaistusta."
      : "Aiheesta on jo riittävästi näyttöä, joten pretest ei enää lisää hyödyllistä tietoa.",
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

export function delayedCalibrationV5(
  topic: Topic,
  attempts: PracticeAttempt[],
  now = today(),
): CalibrationInsight {
  const rows = attempts.filter((a)=>a.topic_id===topic.id&&typeof a.confidence==="number");
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
    "Tarvitaan vähintään muutama arvio ja yksi myöhempi retrieval ennen päätelmää.";
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
  const rows=attempts.filter((a)=>a.topic_id===topic.id&&resultScore(a)>=.9&&!isAssisted(a));
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

export function feedbackPolicyV5(
  mode: FeedbackMode,
  instruction?: InstructionPlanV5 | null,
): FeedbackPolicy {
  if(mode==="exam_simulation")return{mode,reveal:"after_section",allowHints:false,maxHints:0,showFullSolution:false,masteryMultiplier:1,reason:"Koetilassa palaute piilotetaan osion loppuun asti."};
  if(mode==="pretest")return{mode,reveal:"after_item",allowHints:false,maxHints:0,showFullSolution:true,masteryMultiplier:0,reason:"Pretest aktivoi ennakkotietoa, mutta ei muuta masteryä."};
  if(mode==="retrieval")return{mode,reveal:"after_retry",allowHints:true,maxHints:1,showFullSolution:true,masteryMultiplier:.9,reason:"Retrieval saa ensin uuden itsenäisen yrityksen ennen ratkaisua."};
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
      reason==="too_tired"?"Lyhennä tämän päivän raskain sessio ja vaihda loppu kevyeen retrievaliin.":
      reason==="no_time"?"Suojaa päivän minimitaso ja siirrä vain raskas työ, älä kaikkea.":
      reason==="forgot"?"Käytä yhtä kevyttä aloitusmuistutusta, mutta vältä muistutusriippuvuutta.":
      reason==="too_large"?"Pilko tehtävä 10–20 minuutin ensimmäiseen askeleeseen.":
      reason==="unclear_start"?"Näytä vain yksi konkreettinen ensimmäinen tehtävä.":
      "Mukauta kalenteria muuttuneeseen päivään ilman opiskelusakkoa.";
    const score=clamp(rows.length/5+(weekday!==null?.18:0));
    return{reason,count:rows.length,weekday,recommendation,confidence:confidenceLevel(score)};
  }).sort((a,b)=>b.count-a.count);
}

export function implementationIntentionV5(insight:FrictionInsight):ImplementationIntentionRule{
  if(insight.reason==="too_tired")return{trigger:"low_energy",action:"switch_to_retrieval",parameter:15,label:"Jos energia on matala, vaihda raskas sessio 15 min retrievaliin."};
  if(insight.reason==="no_time")return{trigger:"busy_day",action:"protect_minimum",parameter:15,label:"Jos päivä täyttyy, suojaa vähintään 15 min tärkeintä opiskelua."};
  if(insight.reason==="too_large"||insight.reason==="unclear_start")return{trigger:"busy_day",action:"shorten_session",parameter:15,label:"Jos aloittaminen tökkii, tee vain ensimmäinen 15 min pala."};
  if(insight.reason==="plans_changed")return{trigger:"busy_day",action:"move_heavy_work",parameter:1,label:"Jos suunnitelmat muuttuvat, siirrä raskas työ seuraavaan kapasiteettipäivään."};
  return{trigger:"two_missed_days",action:"drop_extra",parameter:2,label:"Jos kaksi päivää jää väliin, pudota Extra äläkä kasaa velkaa."};
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

export function subjectTaskProfilesV5(
  courses:Course[],
  attempts:PracticeAttempt[],
):SubjectTaskProfile[]{
  const courseMap=new Map(courses.map(course=>[course.id,course]));
  const groups=new Map<string,PracticeAttempt[]>();
  for(const row of attempts){
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
  const examUtility=examDays<=3?1:examDays<=7?.9:examDays<=14?.72:examDays<=30?.48:.2;
  const retentionBenefit=clamp(model.forgettingRisk*.72+(1-model.dimensions.retention.score/100)*.28);
  const topicAttempts=attempts.filter(a=>a.topic_id===action.topic?.id);
  const recentTimed=topicAttempts.filter(a=>typeof a.response_time_ms==="number").slice(-4);
  const fatigueCost=recentTimed.length>=3&&recentTimed.at(-1)!.response_time_ms!>(recentTimed[0]!.response_time_ms??0)*1.3?.55:.12;
  const confidence=recommendationConfidenceV5(action.topic!,attempts);
  const expectedLearningGain=clamp(action.learningGain*(stop.stop?.35:1));
  const policyScore=
    expectedLearningGain*.39+
    retentionBenefit*.21+
    examUtility*.16+
    confidence.score*.14+
    (1-fatigueCost)*.1;
  const v5Reasons=[
    ...action.reason.split(" · ").filter(Boolean),
    stop.stop?"tämän päivän lisätoiston rajahyöty on jo pieni":null,
    retentionBenefit>=.6?"säilymisen suojaaminen on nyt arvokasta":null,
    confidence.level==="very_low"?"suositus on vielä alustava":null,
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
    const bonus=(confusion&&!ladder.strongEligible?.04:0)+(ladder.nextTarget==="exam_transfer"?.03:0);
    return{...v5,policyScore:v5.policyScore+bonus,v5Reasons:[...v5.v5Reasons,confusion?"sekoittuva käsite kannattaa erotella rinnakkain":null].filter(Boolean) as string[]};
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
      ? "Valinta optimoi oppimishyödyn, säilymisen, koehyödyn, kuormituksen ja evidenssin varmuuden yhdessä."
      : "Tänään ei ole riittävästi hyödyllistä tekemistä lisättäväksi vain kalenterin täytteeksi.",
  };
}
