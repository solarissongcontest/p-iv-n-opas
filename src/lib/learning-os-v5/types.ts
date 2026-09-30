import type { Course, PlanItem, Topic } from "../domain.ts";

export const LEARNING_OS_VERSION_V5 = 5;

export type EvidenceConfidence = {
  score: number;
  label: "low" | "medium" | "high";
  evidenceCount: number;
  reason: string;
};

export type RetentionTargetV5 = {
  topicId: string;
  desiredRetention: number;
  currentRetention: number;
  gap: number;
  recommendedMinutes: number;
  urgency: number;
  confidence: EvidenceConfidence;
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

export type StopRuleDecisionV5 = {
  stopToday: boolean;
  nextUsefulDate: string;
  evidenceCountToday: number;
  independentSuccessesToday: number;
  reason: string;
  confidence: EvidenceConfidence;
};

export type InstructionStageV5 =
  | "pretest"
  | "worked_example"
  | "self_explanation"
  | "completion"
  | "guided"
  | "independent"
  | "varied_context"
  | "transfer"
  | "delayed_verification";

export type InstructionDecisionV5 = {
  stage: InstructionStageV5;
  label: string;
  reason: string;
  revealWorkedSolution: boolean;
  maxHints: number;
  requiresIndependentFollowup: boolean;
  confidence: EvidenceConfidence;
};

export type FeedbackPolicyV5 = {
  timing: "immediate" | "after_retry" | "after_item" | "after_block";
  reveal: "principle" | "next_step" | "worked_solution" | "score_only" | "none";
  retriesBeforeReveal: number;
  explanation: string;
};

export type PretestPlanV5 = {
  enabled: boolean;
  questionCount: number;
  masteryNeutral: true;
  reason: string;
};

export type TransferLevelV5 =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6;

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
  | "other";

export type FrictionEventV5 = {
  id?: string;
  date: string;
  plan_item_id?: string | null;
  course_id?: string | null;
  reason: FrictionReasonV5;
  note?: string | null;
  self_started?: boolean;
  reminder_used?: boolean;
};

export type ImplementationIntentionV5 = {
  id?: string;
  trigger_type: "late_home" | "low_energy" | "missed_days" | "busy_day" | "custom";
  trigger_value: string;
  action_type: "lighten" | "move" | "replace_with_retrieval" | "protect_rest" | "custom";
  action_value: string;
  enabled: boolean;
  suggested?: boolean;
  reason?: string;
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

export type SubjectTaskProfileV5 = {
  key: string;
  subject: string;
  attemptType: string;
  observations: number;
  successRate: number;
  delayedSuccessRate: number | null;
  medianResponseMs: number | null;
  reliability: EvidenceConfidence;
  spacingMultiplier: number;
  difficultyBias: number;
};

export type ActionCandidateV5 = {
  id: string;
  course: Course;
  topic: Topic | null;
  planItem: PlanItem | null;
  kind:
    | "study"
    | "review"
    | "practice"
    | "repair"
    | "verification"
    | "pretest"
    | "discrimination"
    | "transfer";
  title: string;
  minutes: number;
  expectedLearningGain: number;
  retentionBenefit: number;
  examUtility: number;
  fatigueCost: number;
  uncertaintyCost: number;
  utility: number;
  reason: string;
  confidence: EvidenceConfidence;
};
