import { feedbackPolicyV5 as baseFeedbackPolicyV5 } from "../learning-os-v5.ts";

export {
  contrastiveRepairPlanV5,
  feedbackPolicyCoreV5,
  instructionDecisionV5,
  instructionPlanV5,
  pretestPlanV5,
  transferLadderV5,
  transferStateV5,
} from "../learning-os-v5.ts";

/**
 * A correct answer must never be presented as if the learner failed and needs
 * to retry before getting feedback. The core policy can still use delayed
 * feedback for partial/incorrect retrieval, but a verified correct result gets
 * an immediate success state.
 */
export function feedbackPolicyV5(
  input: Parameters<typeof baseFeedbackPolicyV5>[0],
): ReturnType<typeof baseFeedbackPolicyV5> {
  const policy = baseFeedbackPolicyV5(input);

  if (input.result === "correct" && policy.timing === "after_retry") {
    return {
      ...policy,
      timing: "immediate",
      retriesBeforeReveal: 0,
      explanation:
        "Vastaus oli oikein, joten onnistuminen vahvistetaan heti eikä käyttäjää pyydetä tekemään turhaa uutta yritystä.",
    };
  }

  return policy;
}

export type {
  FeedbackMode,
  FeedbackPolicy,
  FeedbackPolicyV5,
  InstructionDecisionV5,
  InstructionPlanV5,
  InstructionStageV5,
  PretestPlan,
  TransferLadder,
  TransferLevel,
  TransferLevelV5,
  TransferStateV5,
} from "../learning-os-v5.ts";
