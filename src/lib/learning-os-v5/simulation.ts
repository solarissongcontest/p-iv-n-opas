import type { CapacityProfile, Course, PracticeAttempt, Topic } from "../domain.ts";
import { retentionBudgetV5 } from "./memory.ts";
import type { WhatIfScenarioV5 } from "./types.ts";

function capacityForScenario(minutesPerDay: number, daysOff: number[]) {
  return Array.from({ length: 7 }, (_, day) => daysOff.includes(day) ? 0 : minutesPerDay)
    .reduce((sum, value) => sum + value, 0);
}

export function whatIfPlannerV5(input: {
  courses: Course[];
  topics: Topic[];
  attempts: PracticeAttempt[];
  capacity: CapacityProfile;
  now?: string;
  customMinutes?: number[];
}): WhatIfScenarioV5[] {
  const budget = retentionBudgetV5(input);
  const candidates = [...new Set([...(input.customMinutes ?? []), 20, 40, 60])]
    .filter((minutes) => minutes > 0)
    .sort((a, b) => a - b);
  return candidates.map((minutesPerDay) => {
    const weeklyCapacity = capacityForScenario(minutesPerDay, []);
    const backlog = Math.max(0, budget.recommendedMinutes - weeklyCapacity);
    const protectedRetentionShare = budget.recommendedMinutes <= 0
      ? 1
      : Math.min(1, weeklyCapacity / budget.recommendedMinutes);
    const overloadRisk: WhatIfScenarioV5["overloadRisk"] =
      weeklyCapacity >= budget.recommendedMinutes * 1.3 ? "low" :
      weeklyCapacity >= budget.minimumMinutes ? "medium" :
      "high";
    const marginalValue: WhatIfScenarioV5["marginalValue"] =
      weeklyCapacity < budget.minimumMinutes ? "high" :
      weeklyCapacity <= budget.marginalGainLowAfterMinutes ? "medium" :
      "low";
    return {
      id: `minutes:${minutesPerDay}`,
      label: `${minutesPerDay} min / päivä`,
      minutesPerDay,
      daysOff: [],
      weeklyCapacity,
      projectedBacklogMinutes: backlog,
      protectedRetentionShare,
      overloadRisk,
      marginalValue,
      note:
        backlog > 0
          ? `Arviolta ${backlog} min tärkeää kertausbudjettia jäisi kattamatta.`
          : marginalValue === "low"
            ? "Lisäminuuttien arvioitu rajahyöty on jo pieni. Vapaan ajan suojaaminen on järkevää."
            : "Tämä kattaa nykyisen tärkeän kertausbudjetin ilman selvää ylityötä.",
    };
  });
}

export function whatIfDayOffV5(input: {
  courses: Course[];
  topics: Topic[];
  attempts: PracticeAttempt[];
  capacity: CapacityProfile;
  now?: string;
  dayOff: number;
  baselineMinutes: number;
}): WhatIfScenarioV5 {
  const budget = retentionBudgetV5(input);
  const weeklyCapacity = capacityForScenario(input.baselineMinutes, [input.dayOff]);
  const backlog = Math.max(0, budget.recommendedMinutes - weeklyCapacity);
  return {
    id: `day-off:${input.dayOff}`,
    label: "Yksi vapaa päivä",
    minutesPerDay: input.baselineMinutes,
    daysOff: [input.dayOff],
    weeklyCapacity,
    projectedBacklogMinutes: backlog,
    protectedRetentionShare: budget.recommendedMinutes <= 0 ? 1 : Math.min(1, weeklyCapacity / budget.recommendedMinutes),
    overloadRisk: backlog > 60 ? "high" : backlog > 0 ? "medium" : "low",
    marginalValue: backlog > 0 ? "high" : "medium",
    note: backlog > 0
      ? "Vapaa päivä on mahdollinen, mutta tärkeät retrievalit pitää jakaa muille päiville. Tätä ei muuteta opiskelusakoksi."
      : "Vapaa päivä mahtuu nykyiseen puskuriin ilman olennaista kertausvelkaa.",
  };
}
