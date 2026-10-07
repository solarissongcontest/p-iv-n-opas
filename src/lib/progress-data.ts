import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { PlanItem, PracticeAttempt } from "@/lib/domain";
import type { PlanItemEvent } from "@/lib/progress-types";

const untypedSupabase = supabase as any;

function historySchemaMissing(error: any) {
  return Boolean(
    error && (
      error.code === "PGRST205" ||
      error.code === "42P01" ||
      /plan_item_events|schema cache|relation/i.test(error.message ?? "")
    )
  );
}

async function listPlanItemEvents(): Promise<PlanItemEvent[]> {
  const { data, error } = await untypedSupabase
    .from("plan_item_events")
    .select("*")
    .order("occurred_at", { ascending: true })
    .limit(5000);
  if (error) {
    if (historySchemaMissing(error)) return [];
    throw error;
  }
  return (data ?? []) as PlanItemEvent[];
}

function planFingerprint(plan: PlanItem[]) {
  return plan
    .map(item => `${item.id}:${item.updated_at}:${item.status}:${item.date}:${item.target_minutes}`)
    .sort()
    .join("|");
}

export function usePlanItemEvents(plan: PlanItem[]) {
  return useQuery({
    queryKey: ["plan-item-events", planFingerprint(plan)],
    queryFn: listPlanItemEvents,
    staleTime: 15_000,
  });
}

export function practiceEvidenceScore(attempt: Pick<PracticeAttempt, "result" | "difficulty" | "hint_used">) {
  const base = attempt.result === "independent" ? 100 : attempt.result === "hinted" ? 60 : 20;
  const difficultyAdjustment = (Math.max(1, Math.min(5, attempt.difficulty || 1)) - 3) * 4;
  const hintPenalty = attempt.hint_used ? 5 : 0;
  return Math.max(0, Math.min(100, base + difficultyAdjustment - hintPenalty));
}
