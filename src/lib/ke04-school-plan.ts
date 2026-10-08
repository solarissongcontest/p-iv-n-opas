export * from "./ke04-school-plan-core.ts";

import { generatePlan, type PlanDraft } from "./domain.ts";
import {
  generateKe04Psa2026Plan,
  isKe04Psa2026Plan,
  type CoursePlanOptions,
} from "./ke04-school-plan-core.ts";
import { generateBi05TwoExamPlan, isBi05TwoExamPlan } from "./bi05-course-plan.ts";

/**
 * Canonical course-plan router. Course-specific schedules belong here so the
 * Planner cannot silently fall back to a generic even-distribution algorithm.
 */
export function generateCoursePlan(opts: CoursePlanOptions): PlanDraft[] {
  if (isKe04Psa2026Plan(opts)) return generateKe04Psa2026Plan(opts);
  if (isBi05TwoExamPlan(opts)) return generateBi05TwoExamPlan(opts);
  return generatePlan(opts);
}
