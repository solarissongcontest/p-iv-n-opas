import type { CapacityProfile, Course, PracticeAttempt, Topic } from "../domain.ts";
import { addDays, diffDays, today } from "../fi.ts";
import { capacityForDateV3 } from "../learning-engine.ts";
import { masteryModelV4 } from "../learning-os-v4.ts";
import type {
  CalibrationObservationV5,
  CalibrationStateV5,
  EvidenceConfidence,
  RetentionBudgetV5,
  RetentionTargetV5,
  StopRuleDecisionV5,
} from "./types.ts";

const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));

export function evidenceConfidenceV5(
  evidenceCount: number,
  diversity = 1,
  recency = 1,
  reason = "oppimisnäyttöä",
): EvidenceConfidence {
  const score = clamp(
    (1 - Math.exp(-Math.max(0, evidenceCount) / 5)) * .68 +
    clamp(diversity) * .18 +
    clamp(recency) * .14,
  );
  return {
    score,
    label: score >= .72 ? "high" : score >= .42 ? "medium" : "low",
    evidenceCount,
    reason: score >= .72
      ? `Suositus perustuu ${evidenceCount} havaintoon ja useampaan näyttötyyppiin.`
      : score >= .42
        ? `Suositus on käyttökelpoinen, mutta ${reason} tarvitaan vielä lisää.`
        : `Tämä on alustava suositus: ${reason} on vielä vähän.`,
  };
}

function desiredRetention(
  topic: Topic,
  course: Course,
  attempts: PracticeAttempt[],
  now: string,
) {
  const model = masteryModelV4(topic, attempts, { now, examDate: course.exam_date });
  const daysToExam = course.exam_date ? Math.max(0, diffDays(course.exam_date, now)) : 90;
  const urgency =
    daysToExam <= 2 ? 1 :
    daysToExam <= 7 ? .88 :
    daysToExam <= 14 ? .72 :
    daysToExam <= 30 ? .48 :
    daysToExam <= 60 ? .3 : .18;
  const importance = clamp(Number(topic.importance ?? 3) / 5);
  const progressNeed = clamp(1 - Number(topic.progress ?? 0) / 100);
  const uncertainty = model.uncertainty;
  const target = clamp(
    .72 +
    urgency * .115 +
    importance * .055 +
    (model.blindSpot ? .025 : 0) +
    progressNeed * .015 -
    (daysToExam > 60 ? .02 : 0),
    .7,
    .95,
  );
  return { target, urgency, model, uncertainty };
}

export function retentionTargetV5(
  topic: Topic,
  course: Course,
  attempts: PracticeAttempt[],
  now = today(),
): RetentionTargetV5 {
  const rows = attempts.filter((attempt) => attempt.topic_id === topic.id);
  const uniqueDays = new Set(rows.map((attempt) => attempt.date)).size;
  const uniqueTypes = new Set(rows.map((attempt) => attempt.attempt_type)).size;
  const { target, urgency, model } = desiredRetention(topic, course, attempts, now);
  const currentRetention = clamp(model.dimensions.retention.score / 100);
  const gap = Math.max(0, target - currentRetention);
  const importance = clamp(Number(topic.importance ?? 3) / 5);
  const minutes = gap <= .025
    ? 0
    : Math.max(5, Math.min(35, Math.round((gap * 55 + urgency * 9 + importance * 5) / 5) * 5));
  const confidence = evidenceConfidenceV5(
    rows.length,
    Math.min(1, uniqueTypes / 4),
    Math.min(1, uniqueDays / 4),
    "viive- ja retrieval-näyttöä",
  );
  const reasons = [
    gap >= .18 ? "muistamisen tavoite ja nykyinen säilyminen ovat selvästi erillään" : null,
    model.forgettingRisk >= .6 ? "unohtumisriski on koholla" : null,
    urgency >= .72 ? "koe on lähellä" : null,
    model.blindSpot ? "kalibroinnissa näkyy mahdollinen sokea piste" : null,
  ].filter(Boolean);
  return {
    topicId: topic.id,
    desiredRetention: target,
    currentRetention,
    gap,
    recommendedMinutes: minutes,
    urgency,
    confidence,
    reason: reasons.join(" · ") || "nykyinen säilyminen on lähellä tarkoituksenmukaista tasoa",
  };
}

function weekCapacity(capacity: CapacityProfile, now: string) {
  return Array.from({ length: 7 }, (_, index) =>
    capacityForDateV3(capacity, addDays(now, index)),
  ).reduce((sum, value) => sum + value, 0);
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
    if (!course || course.archived) return [];
    return [retentionTargetV5(topic, course, input.attempts, now)];
  }).sort((a, b) =>
    (b.gap * .55 + b.urgency * .45) - (a.gap * .55 + a.urgency * .45)
  );
  const capacityMinutes = weekCapacity(input.capacity, now);
  const raw = targets.reduce((sum, row) => sum + row.recommendedMinutes, 0);
  const recommendedMinutes = Math.min(Math.round(capacityMinutes * .68), raw);
  const minimumMinutes = Math.min(
    recommendedMinutes,
    Math.max(0, Math.round(recommendedMinutes * .58 / 5) * 5),
  );
  const extraMinutes = Math.min(
    capacityMinutes,
    Math.max(recommendedMinutes, Math.round(recommendedMinutes * 1.28 / 5) * 5),
  );
  const protectedTopics = targets
    .filter((row) => row.urgency >= .72 || row.gap >= .18)
    .slice(0, 8)
    .map((row) => row.topicId);
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

function independentSuccess(attempt: PracticeAttempt) {
  const outcome = attempt.outcome ?? (
    attempt.result === "independent" ? "correct" :
    attempt.result === "hinted" ? "partial" :
    "incorrect"
  );
  const assisted = (attempt.hints_used ?? 0) > 0 || attempt.hint_used ||
    attempt.assisted === true || attempt.question_payload?.["coachUsed"] === true;
  return outcome === "correct" && !assisted;
}

export function stopRuleV5(
  topic: Topic,
  attempts: PracticeAttempt[],
  now = today(),
): StopRuleDecisionV5 {
  const rows = attempts
    .filter((attempt) => attempt.topic_id === topic.id)
    .sort((a, b) => a.created_at.localeCompare(b.created_at));
  const todayRows = rows.filter((attempt) => attempt.date === now);
  const independent = todayRows.filter(independentSuccess);
  const retrieval = independent.filter((attempt) =>
    ["free_recall", "short_answer", "explanation"].includes(attempt.attempt_type)
  );
  const application = independent.filter((attempt) =>
    ["calculation", "application", "simulation", "error_detection"].includes(attempt.attempt_type)
  );
  const recentWrong = todayRows.slice(-2).some((attempt) => {
    const outcome = attempt.outcome ?? (attempt.result === "not_yet" ? "incorrect" : "partial");
    return outcome === "incorrect";
  });
  const model = masteryModelV4(topic, attempts, { now });
  const diminishingReturns = todayRows.length >= 4 &&
    independent.length >= 3 &&
    new Set(todayRows.map((attempt) => attempt.attempt_type)).size <= 2;

  const stopToday = !model.verificationRequired &&
    !model.blindSpot &&
    !recentWrong &&
    (
      (retrieval.length >= 1 && application.length >= 1 && independent.length >= 2) ||
      (model.level >= 4 && independent.length >= 2) ||
      diminishingReturns
    );
  const delay = model.level >= 4 ? 5 : model.level >= 3 ? 3 : 2;
  const confidence = evidenceConfidenceV5(
    rows.length,
    Math.min(1, new Set(rows.map((attempt) => attempt.attempt_type)).size / 4),
    Math.min(1, new Set(rows.map((attempt) => attempt.date)).size / 4),
    "itsenäistä ja erilaista näyttöä",
  );
  return {
    stopToday,
    nextUsefulDate: addDays(now, delay),
    evidenceCountToday: todayRows.length,
    independentSuccessesToday: independent.length,
    reason: stopToday
      ? diminishingReturns
        ? "Lisäsamanlaiset tehtävät tuottavat nyt vähän uutta näyttöä. Seuraava hyödyllinen testi kannattaa tehdä viiveellä."
        : "Tänään on jo saatu sekä itsenäistä palautus- että soveltamisnäyttöä. Lisää saman aiheen harjoittelua ei tarvita nyt."
      : model.verificationRequired
        ? "Aiempi onnistuminen käytti apua, joten tarvitaan vielä itsenäinen varmistus."
        : recentWrong
          ? "Viimeisissä yrityksissä oli vielä virhe, joten aihetta ei kannata sulkea tältä päivältä."
          : "Lopetuskriteeri ei ole vielä täyttynyt: tarvitaan monipuolisempaa itsenäistä näyttöä.",
    confidence,
  };
}

function outcomeScore(outcome: CalibrationObservationV5["actual_outcome"]) {
  return outcome === "correct" ? 1 : outcome === "partial" ? .5 : 0;
}

export function delayedCalibrationV5(
  observations: CalibrationObservationV5[],
): CalibrationStateV5 {
  if (observations.length < 2) {
    return {
      status: "insufficient_evidence",
      accuracy: null,
      delayedAccuracy: null,
      observations: observations.length,
      recommendation: "Kalibrointi tarvitsee vielä vähintään kaksi ennustetta ennen palautusta.",
    };
  }
  const error = (rows: CalibrationObservationV5[]) =>
    rows.reduce((sum, row) => {
      const predicted = clamp((row.predicted_confidence - 1) / 2);
      return sum + Math.abs(predicted - outcomeScore(row.actual_outcome));
    }, 0) / Math.max(1, rows.length);
  const accuracy = 1 - error(observations);
  const delayed = observations.filter((row) => row.delay_hours >= 12);
  const delayedAccuracy = delayed.length ? 1 - error(delayed) : null;
  const over = observations.filter((row) =>
    row.predicted_confidence >= 3 && row.actual_outcome !== "correct"
  ).length;
  const under = observations.filter((row) =>
    row.predicted_confidence <= 1 && row.actual_outcome === "correct"
  ).length;
  const status: CalibrationStateV5["status"] =
    over / observations.length >= .3 ? "overconfident" :
    under / observations.length >= .3 ? "underconfident" :
    accuracy >= .7 ? "well_calibrated" :
    over > under ? "overconfident" : "underconfident";
  return {
    status,
    accuracy,
    delayedAccuracy,
    observations: observations.length,
    recommendation:
      status === "overconfident"
        ? "Pyydä seuraava varmuusarvio vasta viiveen jälkeen ja ennen materiaalin näyttämistä."
        : status === "underconfident"
          ? "Näytä käyttäjälle oma onnistunut näyttö: epävarmuus on suurempi kuin todellinen virheriski."
          : "Varmuusarvio vastaa tällä hetkellä melko hyvin todellista suoritusta.",
  };
}
