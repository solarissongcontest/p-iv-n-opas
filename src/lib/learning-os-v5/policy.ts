import type {
  CapacityProfile,
  Course,
  Mistake,
  PlanItem,
  PracticeAttempt,
  Topic,
} from "../domain.ts";
import { today } from "../fi.ts";
import { nextBestActionsV4 } from "../learning-os-v4.ts";
import type { TopicDependency } from "../data.ts";
import { confusionSetsV5 } from "./discrimination.ts";
import { instructionDecisionV5, transferStateV5 } from "./instruction.ts";
import { evidenceConfidenceV5, retentionBudgetV5, retentionTargetV5, stopRuleV5 } from "./memory.ts";
import type { ActionCandidateV5 } from "./types.ts";

export function nextBestActionsV5(input: {
  courses: Course[];
  topics: Topic[];
  plan: PlanItem[];
  attempts: PracticeAttempt[];
  mistakes: Mistake[];
  dependencies?: TopicDependency[];
  capacity: CapacityProfile;
  now?: string;
}): ActionCandidateV5[] {
  const now = input.now ?? today();
  const v4 = nextBestActionsV4({ ...input, now });
  const budget = retentionBudgetV5({
    courses: input.courses,
    topics: input.topics,
    attempts: input.attempts,
    capacity: input.capacity,
    now,
  });
  const retentionByTopic = new Map(budget.targets.map((row) => [row.topicId, row]));
  const candidates: ActionCandidateV5[] = v4.flatMap((action) => {
    if (!action.topic) {
      const confidence = evidenceConfidenceV5(0, 0, 0, "aihekohtaista näyttöä");
      return [{
        ...action,
        expectedLearningGain: action.learningGain,
        retentionBenefit: 0,
        examUtility: 0,
        fatigueCost: Math.min(1, action.minutes / 60),
        uncertaintyCost: 1,
        utility: action.priority,
        confidence,
      }];
    }
    const stop = stopRuleV5(action.topic, input.attempts, now);
    if (stop.stopToday && !action.planItem) return [];
    const retention = retentionByTopic.get(action.topic.id) ??
      retentionTargetV5(action.topic, action.course, input.attempts, now);
    const instruction = instructionDecisionV5(action.topic, input.attempts, {
      now,
      examDate: action.course.exam_date,
    });
    const transfer = transferStateV5(action.topic, input.attempts);
    const daysToExam = action.course.exam_date
      ? Math.max(0, Math.round((Date.parse(action.course.exam_date) - Date.parse(now)) / 86_400_000))
      : 90;
    const examUtility = daysToExam <= 7 ? .95 : daysToExam <= 14 ? .75 : daysToExam <= 30 ? .5 : .2;
    const fatigueCost = Math.min(1, action.minutes / Math.max(20, input.capacity.weekdayMinutes));
    const uncertaintyCost = 1 - action.topic.mastery_confidence;
    const expectedLearningGain = Math.min(1,
      action.learningGain * .62 +
      retention.gap * .22 +
      (transfer.nextLevel !== null ? .08 : 0) +
      (instruction.stage === "pretest" ? .08 : 0)
    );
    const utility =
      expectedLearningGain * .42 +
      retention.gap * .2 +
      examUtility * .16 +
      action.topic.importance / 5 * .12 -
      fatigueCost * .06 -
      uncertaintyCost * .04 +
      (action.planItem ? .05 : 0);
    const kind: ActionCandidateV5["kind"] =
      instruction.stage === "pretest" ? "pretest" :
      transfer.nextLevel !== null && transfer.level >= 3 && action.kind === "practice" ? "transfer" :
      action.kind;
    return [{
      id: action.id.replace("nba:", "nba5:"),
      course: action.course,
      topic: action.topic,
      planItem: action.planItem,
      kind,
      title: action.title,
      minutes: Math.min(action.minutes, retention.recommendedMinutes || action.minutes),
      expectedLearningGain,
      retentionBenefit: retention.gap,
      examUtility,
      fatigueCost,
      uncertaintyCost,
      utility,
      reason: [
        action.reason,
        retention.gap >= .12 ? "retention-budjetissa on selvä aukko" : null,
        instruction.stage === "pretest" ? "aloita mastery-neutraalilla ennakkotestillä" : null,
        transfer.nextLevel !== null && transfer.level >= 3 ? `seuraava transfer-taso on ${transfer.nextLevel}` : null,
        stop.confidence.label === "low" ? "suosituksen varmuus on vielä matala" : null,
      ].filter(Boolean).slice(0, 4).join(" · "),
      confidence: retention.confidence,
    }];
  });

  const confusion = confusionSetsV5({
    topics: input.topics,
    dependencies: input.dependencies ?? [],
    attempts: input.attempts,
    now,
  }).filter((set) => set.priority >= .55 && set.discriminationStrength < .8);

  for (const set of confusion.slice(0, 3)) {
    const topic = input.topics.find((candidate) => candidate.id === set.topicIds[0]);
    if (!topic) continue;
    const course = input.courses.find((candidate) => candidate.id === topic.course_id);
    if (!course) continue;
    candidates.push({
      id: "nba5:" + set.id,
      course,
      topic,
      planItem: null,
      kind: "discrimination",
      title: set.labels.join(" vs. "),
      minutes: 12,
      expectedLearningGain: set.priority * .75,
      retentionBenefit: .12,
      examUtility: .55,
      fatigueCost: .18,
      uncertaintyCost: 1 - set.discriminationStrength,
      utility: set.priority * .72,
      reason: set.reason,
      confidence: evidenceConfidenceV5(
        set.attempts,
        Math.min(1, set.topicIds.length / 2),
        set.attempts ? .7 : .2,
        "erottelunäyttöä",
      ),
    });
  }

  return candidates.sort((a, b) =>
    b.utility - a.utility ||
    b.expectedLearningGain - a.expectedLearningGain ||
    a.minutes - b.minutes
  );
}

export function adaptiveDayPlanV5(input: Parameters<typeof nextBestActionsV5>[0]) {
  const actions = nextBestActionsV5(input);
  const day = new Date((input.now ?? today()) + "T12:00:00Z").getUTCDay();
  const isWeekend = day === 0 || day === 6;
  const capacity = isWeekend
    ? input.capacity.weekendMinutes
    : input.capacity.weekdayMinutes;
  const minimumBudget = Math.min(capacity, Math.max(10, Math.round(capacity * .38)));
  const recommendedBudget = Math.min(capacity, Math.max(minimumBudget, Math.round(capacity * .68)));
  const select = (budget: number, maxItems: number) => {
    const selected: ActionCandidateV5[] = [];
    let used = 0;
    for (const action of actions) {
      if (selected.length >= maxItems || used >= budget) break;
      const remaining = budget - used;
      if (remaining < 5) break;
      const minutes = Math.max(5, Math.min(action.minutes, remaining));
      selected.push({ ...action, minutes });
      used += minutes;
    }
    return selected;
  };
  const minimum = select(minimumBudget, 2);
  const recommended = select(recommendedBudget, 3);
  const extra = select(capacity, 5);
  return {
    minimum,
    recommended,
    extra,
    minimumMinutes: minimum.reduce((sum, row) => sum + row.minutes, 0),
    recommendedMinutes: recommended.reduce((sum, row) => sum + row.minutes, 0),
    extraMinutes: extra.reduce((sum, row) => sum + row.minutes, 0),
    capacity,
    stoppedForLowMarginalGain:
      recommended.length < 3 &&
      actions.slice(recommended.length).every((action) => action.utility < .22),
  };
}
