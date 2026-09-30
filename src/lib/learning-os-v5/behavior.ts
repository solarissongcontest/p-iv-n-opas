import type { PracticeAttempt } from "../domain.ts";
import type {
  FrictionEventV5,
  FrictionInsightV5,
  ImplementationIntentionV5,
  ReminderTaperDecisionV5,
  SubjectTaskProfileV5,
} from "./types.ts";
import { evidenceConfidenceV5 } from "./memory.ts";

function weekday(date: string) {
  return new Date(date + "T12:00:00Z").getUTCDay();
}

export function frictionInsightV5(events: FrictionEventV5[]): FrictionInsightV5 {
  if (!events.length) {
    return {
      repeatedReason: null,
      repeatedWeekday: null,
      count: 0,
      suggestion: null,
      summary: "Ohitetuista sessioista ei ole vielä friction-dataa.",
    };
  }
  const frictionOnly = events.filter((event) => event.reason !== "started");
  const byReason = new Map<string, number>();
  const byWeekday = new Map<number, number>();
  for (const event of frictionOnly) {
    byReason.set(event.reason, (byReason.get(event.reason) ?? 0) + 1);
    byWeekday.set(weekday(event.date), (byWeekday.get(weekday(event.date)) ?? 0) + 1);
  }
  const reason = [...byReason.entries()].sort((a, b) => b[1] - a[1])[0];
  const day = [...byWeekday.entries()].sort((a, b) => b[1] - a[1])[0];
  const repeatedReason = reason && reason[1] >= 2 ? reason[0] as FrictionInsightV5["repeatedReason"] : null;
  const repeatedWeekday = day && day[1] >= 2 ? day[0] : null;
  let suggestion: ImplementationIntentionV5 | null = null;
  if (repeatedReason === "too_tired") {
    suggestion = {
      trigger_type: "low_energy",
      trigger_value: "true",
      action_type: "replace_with_retrieval",
      action_value: "15",
      enabled: false,
      suggested: true,
      reason: "Väsymys on toistuva este. Kevyt 15 minuutin retrieval säilyttää rytmin ilman opiskelusakkoa.",
    };
  } else if (repeatedReason === "no_time" || repeatedReason === "plans_changed") {
    suggestion = {
      trigger_type: "busy_day",
      trigger_value: repeatedWeekday === null ? "any" : String(repeatedWeekday),
      action_type: "lighten",
      action_value: "0.4",
      enabled: false,
      suggested: true,
      reason: "Aikapula toistuu. Tälle tilanteelle kannattaa määrittää automaattinen kevyt päivä.",
    };
  } else if (repeatedReason === "too_hard" || repeatedReason === "unclear_start") {
    suggestion = {
      trigger_type: "custom",
      trigger_value: repeatedReason,
      action_type: "replace_with_retrieval",
      action_value: "worked_example_then_10m",
      enabled: false,
      suggested: true,
      reason: "Aloituskynnys on toistuva este. Aloita yhdellä esimerkillä ja kymmenen minuutin rajatulla tehtävällä.",
    };
  } else if (repeatedReason === "forgot") {
    suggestion = {
      trigger_type: "custom",
      trigger_value: "forgot_twice",
      action_type: "move",
      action_value: "anchor_to_routine",
      enabled: false,
      suggested: true,
      reason: "Unohtaminen toistuu. Sido sessio olemassa olevaan rutiiniin mieluummin kuin lisäämällä jatkuvia ilmoituksia.",
    };
  }
  return {
    repeatedReason,
    repeatedWeekday,
    count: reason?.[1] ?? 0,
    suggestion,
    summary: repeatedReason
      ? `Yleisin toistuva este on ${repeatedReason}${repeatedWeekday === null ? "" : `, erityisesti viikonpäivänä ${repeatedWeekday}`}.`
      : "Yksittäisiä esteitä on, mutta mitään toistuvaa mallia ei vielä näy.",
  };
}

export function reminderTaperV5(events: FrictionEventV5[]): ReminderTaperDecisionV5 {
  const started = events.filter((event) => typeof event.self_started === "boolean");
  if (started.length < 5) {
    return {
      mode: "normal",
      selfStartRate: started.length
        ? started.filter((event) => event.self_started).length / started.length
        : null,
      sampleSize: started.length,
      recommendation: "Muistutuksia ei vielä säädetä, koska itsenäisistä aloituksista on liian vähän dataa.",
    };
  }
  const rate = started.filter((event) => event.self_started).length / started.length;
  const recent = started.slice(-5);
  const recentRate = recent.filter((event) => event.self_started).length / recent.length;
  const mode: ReminderTaperDecisionV5["mode"] =
    rate >= .85 && recentRate >= .8 ? "minimal" :
    rate >= .7 ? "taper" :
    rate < .5 && recentRate < .5 ? "restore" :
    "normal";
  return {
    mode,
    selfStartRate: rate,
    sampleSize: started.length,
    recommendation:
      mode === "minimal"
        ? "Aloitat opiskelun jo lähes aina itse. Pidä vain kriittiset koe- ja aikataulumuistutukset."
        : mode === "taper"
          ? "Vähennä tavallisia opiskelumuistutuksia asteittain ja seuraa säilyykö itsenäinen aloitus."
          : mode === "restore"
            ? "Itsenäinen aloitus on heikentynyt. Palauta yksi kevyt muistutus väliaikaisesti."
            : "Nykyinen muistutustaso on sopiva.",
  };
}

function attemptSuccess(attempt: PracticeAttempt) {
  const result = attempt.outcome ?? (
    attempt.result === "independent" ? "correct" :
    attempt.result === "hinted" ? "partial" :
    "incorrect"
  );
  return result === "correct" ? 1 : result === "partial" ? .5 : 0;
}

function median(values: number[]) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : Math.round((sorted[middle - 1] + sorted[middle]) / 2);
}

export function subjectTaskProfilesV5(
  attempts: PracticeAttempt[],
  subjectForCourse: (courseId: string) => string,
): SubjectTaskProfileV5[] {
  const groups = new Map<string, PracticeAttempt[]>();
  for (const attempt of attempts) {
    const subject = subjectForCourse(attempt.course_id) || "Muu";
    const key = `${subject}::${attempt.attempt_type}`;
    const rows = groups.get(key) ?? [];
    rows.push(attempt);
    groups.set(key, rows);
  }
  return [...groups.entries()].map(([key, rows]) => {
    const [subject, attemptType] = key.split("::");
    const successRate = rows.reduce((sum, row) => sum + attemptSuccess(row), 0) / rows.length;
    const delayed = rows.filter((row) => Number(row.delay_days ?? 0) >= 2);
    const delayedSuccessRate = delayed.length
      ? delayed.reduce((sum, row) => sum + attemptSuccess(row), 0) / delayed.length
      : null;
    const responseTimes = rows.flatMap((row) =>
      typeof row.response_time_ms === "number" ? [row.response_time_ms] : []
    );
    const reliability = evidenceConfidenceV5(
      rows.length,
      Math.min(1, new Set(rows.map((row) => row.date)).size / 6),
      Math.min(1, delayed.length / 4),
      "subject × task -näyttöä",
    );
    const forgettingPenalty = delayedSuccessRate === null ? 0 : Math.max(0, successRate - delayedSuccessRate);
    return {
      key,
      subject,
      attemptType,
      observations: rows.length,
      successRate,
      delayedSuccessRate,
      medianResponseMs: median(responseTimes),
      reliability,
      spacingMultiplier: reliability.label === "low"
        ? 1
        : Math.max(.72, Math.min(1.35, 1 - forgettingPenalty * .55)),
      difficultyBias: reliability.label === "low"
        ? 0
        : successRate >= .86 ? .2 : successRate <= .55 ? -.2 : 0,
    };
  }).sort((a, b) => b.observations - a.observations);
}
