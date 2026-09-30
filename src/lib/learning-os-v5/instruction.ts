import type { Mistake, PracticeAttempt, Topic } from "../domain.ts";
import { today } from "../fi.ts";
import { masteryModelV4 } from "../learning-os-v4.ts";
import { evidenceConfidenceV5 } from "./memory.ts";
import type {
  FeedbackPolicyV5,
  InstructionDecisionV5,
  PretestPlanV5,
  TransferLevelV5,
  TransferStateV5,
} from "./types.ts";

function outcome(attempt: PracticeAttempt) {
  return attempt.outcome ?? (
    attempt.result === "independent" ? "correct" :
    attempt.result === "hinted" ? "partial" :
    "incorrect"
  );
}

function assisted(attempt: PracticeAttempt) {
  return attempt.assisted === true ||
    (attempt.hints_used ?? 0) > 0 ||
    attempt.hint_used ||
    attempt.question_payload?.["coachUsed"] === true;
}

export function pretestPlanV5(
  topic: Topic,
  attempts: PracticeAttempt[],
): PretestPlanV5 {
  const rows = attempts.filter((attempt) => attempt.topic_id === topic.id);
  const meaningful = rows.filter((attempt) =>
    attempt.question_payload?.["pretest"] !== true &&
    attempt.source !== "exam"
  );
  const enabled = meaningful.length === 0 && Number(topic.progress ?? 0) < 35;
  return {
    enabled,
    questionCount: enabled ? (Number(topic.importance ?? 3) >= 4 ? 3 : 2) : 0,
    masteryNeutral: true,
    reason: enabled
      ? "Aiheesta ei ole vielä varsinaista näyttöä. Lyhyt ennakkotesti kartoittaa esitiedot ilman mastery-rangaistusta."
      : "Aiheesta on jo varsinaista näyttöä, joten ennakkotesti ei enää anna paljon lisätietoa.",
  };
}

function completionEvidence(rows: PracticeAttempt[]) {
  return rows.filter((attempt) =>
    attempt.scaffold_stage === "partial_completion" ||
    attempt.question_payload?.["instructionStage"] === "completion"
  ).length;
}

export function instructionDecisionV5(
  topic: Topic,
  attempts: PracticeAttempt[],
  options: { now?: string; examDate?: string | null } = {},
): InstructionDecisionV5 {
  const now = options.now ?? today();
  const rows = attempts.filter((attempt) => attempt.topic_id === topic.id);
  const model = masteryModelV4(topic, attempts, { now, examDate: options.examDate });
  const recent = rows.slice().sort((a, b) => a.date.localeCompare(b.date)).slice(-5);
  const failures = recent.filter((attempt) => outcome(attempt) === "incorrect").length;
  const independent = rows.filter((attempt) => outcome(attempt) === "correct" && !assisted(attempt)).length;
  const transfer = rows.filter((attempt) =>
    outcome(attempt) === "correct" &&
    !assisted(attempt) &&
    (
      attempt.scaffold_stage === "transfer" ||
      Number(attempt.question_payload?.["transferLevel"] ?? 0) >= 4
    )
  ).length;
  const confidence = evidenceConfidenceV5(
    rows.length,
    Math.min(1, new Set(rows.map((row) => row.attempt_type)).size / 4),
    Math.min(1, new Set(rows.map((row) => row.date)).size / 4),
    "eri päivien ja tehtävätyyppien näyttöä",
  );

  if (pretestPlanV5(topic, attempts).enabled) {
    return {
      stage: "pretest",
      label: "Preview Challenge",
      reason: "Ennen opetusta tarkistetaan mitä jo tiedät. Väärä vastaus ei laske masteryä.",
      revealWorkedSolution: false,
      maxHints: 0,
      requiresIndependentFollowup: false,
      confidence,
    };
  }
  if (model.verificationRequired) {
    return {
      stage: "delayed_verification",
      label: "Itsenäinen viivevarmistus",
      reason: "Edellinen onnistuminen sisälsi apua. Nyt tarvitaan näyttö ilman vihjeitä.",
      revealWorkedSolution: false,
      maxHints: 0,
      requiresIndependentFollowup: false,
      confidence,
    };
  }
  if (model.evidenceCount <= 1 || model.level <= 1 || failures >= 2) {
    return {
      stage: "worked_example",
      label: "Worked example",
      reason: "Menetelmän rakenne rakennetaan ensin valmiista esimerkistä ennen itsenäistä ongelmanratkaisua.",
      revealWorkedSolution: true,
      maxHints: 5,
      requiresIndependentFollowup: true,
      confidence,
    };
  }
  if (model.dimensions.understanding.score < 55) {
    return {
      stage: "self_explanation",
      label: "Selitä ratkaisu",
      reason: "Seuraava näyttö kohdistuu siihen, miksi ratkaisuvaiheet toimivat.",
      revealWorkedSolution: true,
      maxHints: 3,
      requiresIndependentFollowup: true,
      confidence,
    };
  }
  if (completionEvidence(rows) < 1 && independent < 2) {
    return {
      stage: "completion",
      label: "Täydennä ratkaisu",
      reason: "Tukea häivytetään: osa ratkaisusta annetaan, mutta kriittiset vaiheet täydennetään itse.",
      revealWorkedSolution: false,
      maxHints: 2,
      requiresIndependentFollowup: true,
      confidence,
    };
  }
  if (independent < 2 || model.confidence < .5) {
    return {
      stage: "independent",
      label: "Itsenäinen tehtävä",
      reason: "Tukea on nyt riittävästi häivytetty. Tarvitaan luotettavaa itsenäistä näyttöä.",
      revealWorkedSolution: false,
      maxHints: 0,
      requiresIndependentFollowup: false,
      confidence,
    };
  }
  if (model.dimensions.application.score < 70) {
    return {
      stage: "varied_context",
      label: "Muunneltu tilanne",
      reason: "Samaa periaatetta sovelletaan eri esitystavassa tai pintarakenteessa.",
      revealWorkedSolution: false,
      maxHints: 0,
      requiresIndependentFollowup: false,
      confidence,
    };
  }
  if (transfer < 2) {
    return {
      stage: "transfer",
      label: "Transfer",
      reason: "Perusosaaminen on vakaa. Nyt varmistetaan, että menetelmä toimii myös aidosti uudessa tilanteessa.",
      revealWorkedSolution: false,
      maxHints: 0,
      requiresIndependentFollowup: false,
      confidence,
    };
  }
  return {
    stage: "delayed_verification",
    label: "Viivevarmistus",
    reason: "Tämänhetkinen osaaminen on riittävä. Seuraava hyödyllinen näyttö saadaan vasta ajan kuluttua.",
    revealWorkedSolution: false,
    maxHints: 0,
    requiresIndependentFollowup: false,
    confidence,
  };
}

export function feedbackPolicyV5(input: {
  mode: "pretest" | "learning" | "retrieval" | "exam_simulation" | "error_repair";
  result?: "correct" | "partial" | "incorrect";
  stage?: InstructionDecisionV5["stage"];
}): FeedbackPolicyV5 {
  if (input.mode === "exam_simulation") {
    return {
      timing: "after_block",
      reveal: "score_only",
      retriesBeforeReveal: 0,
      explanation: "Koetilassa palaute pidätetään osion loppuun, jotta suoritus säilyy aidosti itsenäisenä.",
    };
  }
  if (input.mode === "pretest") {
    return {
      timing: "after_item",
      reveal: "principle",
      retriesBeforeReveal: 0,
      explanation: "Pretest ei rankaise masteryä. Yrityksen jälkeen annetaan oikea periaate ennen varsinaista opiskelua.",
    };
  }
  if (input.mode === "error_repair") {
    return {
      timing: "after_retry",
      reveal: "next_step",
      retriesBeforeReveal: 1,
      explanation: "Virheen korjauksessa opiskelija paikantaa ensin ensimmäisen poikkeaman ennen malliratkaisua.",
    };
  }
  if (input.mode === "retrieval") {
    return {
      timing: "after_retry",
      reveal: input.result === "incorrect" ? "principle" : "next_step",
      retriesBeforeReveal: 1,
      explanation: "Retrievalissä annetaan ensin mahdollisuus korjata vastaus ilman täydellisen ratkaisun paljastamista.",
    };
  }
  return {
    timing: "immediate",
    reveal: input.stage === "worked_example" ? "worked_solution" : "principle",
    retriesBeforeReveal: 0,
    explanation: "Uuden asian opettelussa nopea periaatepalaute estää virheellisen mallin vahvistumista.",
  };
}

function transferLevel(attempt: PracticeAttempt): TransferLevelV5 {
  const payload = Number(attempt.question_payload?.["transferLevel"] ?? -1);
  if (Number.isFinite(payload) && payload >= 0 && payload <= 6) {
    return Math.round(payload) as TransferLevelV5;
  }
  if (attempt.source === "exam" || attempt.attempt_type === "simulation") return 6;
  if (attempt.scaffold_stage === "transfer") return 5;
  if (attempt.attempt_type === "error_detection") return 4;
  if (attempt.attempt_type === "application") return 3;
  if (attempt.attempt_type === "calculation") return 2;
  if (attempt.attempt_type === "explanation") return 1;
  return 0;
}

export function transferStateV5(
  topic: Topic,
  attempts: PracticeAttempt[],
): TransferStateV5 {
  const evidenceByLevel: Record<number, number> = Object.fromEntries(
    Array.from({ length: 7 }, (_, level) => [level, 0]),
  );
  for (const attempt of attempts.filter((row) => row.topic_id === topic.id)) {
    if (outcome(attempt) !== "correct" || assisted(attempt)) continue;
    evidenceByLevel[transferLevel(attempt)] = (evidenceByLevel[transferLevel(attempt)] ?? 0) + 1;
  }
  let level: TransferLevelV5 = 0;
  for (let candidate = 1; candidate <= 6; candidate += 1) {
    const direct = evidenceByLevel[candidate] ?? 0;
    const lower = evidenceByLevel[candidate - 1] ?? 0;
    if (direct >= 1 && (candidate <= 2 || lower >= 1 || evidenceByLevel[candidate - 2] >= 1)) {
      level = candidate as TransferLevelV5;
    }
  }
  const labels = [
    "Recall",
    "Selitys",
    "Sama konteksti",
    "Muunneltu konteksti",
    "Eri esitystapa",
    "Uusi tilanne",
    "Koetason transfer",
  ];
  return {
    level,
    label: labels[level],
    evidenceByLevel,
    nextLevel: level < 6 ? ((level + 1) as TransferLevelV5) : null,
    strongEnoughForTopMastery: level >= 5 && (evidenceByLevel[5] + evidenceByLevel[6]) >= 2,
  };
}

export function contrastiveRepairPlanV5(mistake: Mistake) {
  return {
    mistakeId: mistake.id,
    stages: [
      "Näytä alkuperäinen oma ratkaisu muuttamatta sitä.",
      "Paikanna ensimmäinen kohta, jossa ratkaisu erkanee oikeasta periaatteesta.",
      "Selitä omin sanoin miksi ero muuttaa lopputulosta.",
      "Korjaa vain virheellinen vaihe ja jatka ratkaisu loppuun.",
      "Ratkaise uusi saman periaatteen tehtävä ilman mallia.",
      "Aikatauluta viivevarmistus muutaman päivän päähän.",
    ],
    completed: mistake.status === "mastered",
    next: mistake.status === "open"
      ? "Paikanna ensimmäinen poikkeama."
      : mistake.status === "corrected"
        ? "Ratkaise uusi rinnakkaistehtävä."
        : mistake.status === "retested"
          ? "Tee viivevarmistus."
          : "Virhe on varmennettu korjatuksi.",
  };
}
