import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { requireDeviceOwnerId } from "../deviceSession";
import { registerOp, runOrQueue } from "../offline";
import type {
  CalibrationObservationV5,
  FrictionEventV5,
  ImplementationIntentionV5,
} from "./types";

const db = supabase as any;

export type PretestAttemptRowV5 = {
  id: string;
  owner_id: string;
  course_id: string;
  topic_id: string;
  question_bank_id: string | null;
  prompt: string;
  response: string | null;
  predicted_confidence: number | null;
  outcome: "correct" | "partial" | "incorrect" | "unknown";
  created_at: string;
};

export type LearningPolicyStateRowV5 = {
  id: string;
  owner_id: string;
  course_id: string | null;
  topic_id: string | null;
  desired_retention: number;
  evidence_confidence: number;
  discrimination_strength: number;
  transfer_level: number;
  stop_until: string | null;
  data: Record<string, unknown>;
  updated_at: string;
};

export type ImplementationIntentionRowV5 = ImplementationIntentionV5 & {
  id: string;
  owner_id: string;
  source: "user" | "suggested";
  created_at: string;
  updated_at: string;
};

export type ReminderAdaptationRowV5 = {
  owner_id: string;
  mode: "normal" | "taper" | "minimal" | "restore";
  self_start_rate: number | null;
  sample_size: number;
  last_changed_at: string;
  metadata: Record<string, unknown>;
};

export type ContrastiveRepairRowV5 = {
  id: string;
  owner_id: string;
  mistake_id: string;
  divergence_note: string | null;
  explanation: string | null;
  repaired_solution: string | null;
  followup_attempt_id: string | null;
  status:
    | "locate_divergence"
    | "explain"
    | "repair"
    | "parallel_problem"
    | "delayed_verification"
    | "mastered";
  updated_at: string;
};

export type ExamSimulationRowV5 = {
  id: string;
  owner_id: string;
  course_id: string;
  exam_id: string | null;
  mode: "practice" | "full";
  selected_task_ids: string[];
  completed_task_ids: string[];
  scores: Record<string, number>;
  started_at: string;
  completed_at: string | null;
  duration_minutes: number | null;
  metadata: Record<string, unknown>;
};

export type SubjectTaskParameterRowV5 = {
  id: string;
  owner_id: string;
  subject: string;
  attempt_type: string;
  observations: number;
  success_rate: number;
  delayed_success_rate: number | null;
  spacing_multiplier: number;
  difficulty_bias: number;
  reliability: number;
  updated_at: string;
};

export type FrictionEventRowV5 = FrictionEventV5 & {
  id: string;
  owner_id: string;
  created_at: string;
};

async function listRows<T>(table: string, orderColumn = "created_at", ascending = false): Promise<T[]> {
  const { data, error } = await db.from(table).select("*").order(orderColumn, { ascending });
  if (error) throw error;
  return (data ?? []) as T[];
}

export const usePretestAttemptsV5 = () =>
  useQuery({
    queryKey: ["v5-pretests"],
    queryFn: () => listRows<PretestAttemptRowV5>("pretest_attempts"),
  });

export const useCalibrationObservationsV5 = () =>
  useQuery({
    queryKey: ["v5-calibration"],
    queryFn: () => listRows<CalibrationObservationV5 & { id: string }>("calibration_observations", "observed_at"),
  });

export const useFrictionEventsV5 = () =>
  useQuery({
    queryKey: ["v5-friction"],
    queryFn: () => listRows<FrictionEventRowV5>("study_friction_events"),
  });

export const useImplementationIntentionsV5 = () =>
  useQuery({
    queryKey: ["v5-intentions"],
    queryFn: () => listRows<ImplementationIntentionRowV5>("implementation_intentions"),
  });

export const usePolicyStatesV5 = () =>
  useQuery({
    queryKey: ["v5-policy-states"],
    queryFn: () => listRows<LearningPolicyStateRowV5>("learning_policy_states", "updated_at"),
  });

export const useReminderAdaptationV5 = () =>
  useQuery({
    queryKey: ["v5-reminder"],
    queryFn: async () => {
      const { data, error } = await db.from("reminder_adaptation").select("*").maybeSingle();
      if (error) throw error;
      return (data ?? null) as ReminderAdaptationRowV5 | null;
    },
  });

export const useContrastiveRepairsV5 = () =>
  useQuery({
    queryKey: ["v5-contrastive-repairs"],
    queryFn: () => listRows<ContrastiveRepairRowV5>("contrastive_repairs", "updated_at"),
  });

export const useExamSimulationsV5 = () =>
  useQuery({
    queryKey: ["v5-exam-simulations"],
    queryFn: () => listRows<ExamSimulationRowV5>("exam_simulations", "started_at"),
  });

export const useSubjectTaskParametersV5 = () =>
  useQuery({
    queryKey: ["v5-subject-task-parameters"],
    queryFn: () => listRows<SubjectTaskParameterRowV5>("subject_task_parameters", "updated_at"),
  });

function useInvalidateV5() {
  const qc = useQueryClient();
  return () => [
    "v5-pretests",
    "v5-calibration",
    "v5-friction",
    "v5-intentions",
    "v5-policy-states",
    "v5-reminder",
    "v5-contrastive-repairs",
    "v5-exam-simulations",
    "v5-subject-task-parameters",
    "practice-attempts",
    "plan",
    "topics",
  ].forEach((key) => qc.invalidateQueries({ queryKey: [key] }));
}

type RecordPretestInput = {
  course_id: string;
  topic_id: string;
  question_bank_id?: string | null;
  prompt: string;
  response?: string | null;
  predicted_confidence?: number | null;
  outcome?: PretestAttemptRowV5["outcome"];
};

async function doRecordPretest(payload: unknown, operationId: string) {
  const input = payload as RecordPretestInput;
  const { error } = await db.from("pretest_attempts").upsert({
    id: operationId,
    owner_id: requireDeviceOwnerId(),
    course_id: input.course_id,
    topic_id: input.topic_id,
    question_bank_id: input.question_bank_id ?? null,
    prompt: input.prompt,
    response: input.response ?? null,
    predicted_confidence: input.predicted_confidence ?? null,
    outcome: input.outcome ?? "unknown",
  }, { onConflict: "id" });
  if (error) throw error;
  return operationId;
}

type RecordFrictionInput = Omit<FrictionEventV5, "id">;

async function doRecordFriction(payload: unknown, operationId: string) {
  const input = payload as RecordFrictionInput;
  const { error } = await db.from("study_friction_events").upsert({
    id: operationId,
    owner_id: requireDeviceOwnerId(),
    event_date: input.date,
    plan_item_id: input.plan_item_id ?? null,
    course_id: input.course_id ?? null,
    reason: input.reason,
    note: input.note ?? null,
    self_started: input.self_started ?? null,
    reminder_used: input.reminder_used ?? null,
  }, { onConflict: "id" });
  if (error) throw error;
  return operationId;
}

registerOp("v5RecordPretest", doRecordPretest);
registerOp("v5RecordFriction", doRecordFriction);

export function useRecordPretestV5() {
  const invalidate = useInvalidateV5();
  return useMutation({
    mutationFn: (input: RecordPretestInput) => runOrQueue("v5RecordPretest", input),
    onSuccess: invalidate,
  });
}

export function useRecordFrictionV5() {
  const invalidate = useInvalidateV5();
  return useMutation({
    mutationFn: (input: RecordFrictionInput) => runOrQueue("v5RecordFriction", input),
    onSuccess: invalidate,
  });
}

export function useRecordCalibrationV5() {
  const invalidate = useInvalidateV5();
  return useMutation({
    mutationFn: async (input: {
      course_id: string;
      topic_id: string;
      attempt_id?: string | null;
      predicted_confidence: number;
      actual_outcome: CalibrationObservationV5["actual_outcome"];
      delay_hours: number;
    }) => {
      const { error } = await db.from("calibration_observations").insert({
        owner_id: requireDeviceOwnerId(),
        ...input,
        attempt_id: input.attempt_id ?? null,
      });
      if (error) throw error;
    },
    onSuccess: invalidate,
  });
}

export function useUpsertPolicyStateV5() {
  const invalidate = useInvalidateV5();
  return useMutation({
    mutationFn: async (input: {
      course_id?: string | null;
      topic_id: string;
      desired_retention: number;
      evidence_confidence: number;
      discrimination_strength?: number;
      transfer_level?: number;
      stop_until?: string | null;
      data?: Record<string, unknown>;
    }) => {
      const { error } = await db.from("learning_policy_states").upsert({
        owner_id: requireDeviceOwnerId(),
        course_id: input.course_id ?? null,
        topic_id: input.topic_id,
        desired_retention: input.desired_retention,
        evidence_confidence: input.evidence_confidence,
        discrimination_strength: input.discrimination_strength ?? 0,
        transfer_level: input.transfer_level ?? 0,
        stop_until: input.stop_until ?? null,
        data: input.data ?? {},
        updated_at: new Date().toISOString(),
      }, { onConflict: "owner_id,topic_id" });
      if (error) throw error;
    },
    onSuccess: invalidate,
  });
}

export function useUpsertImplementationIntentionV5() {
  const invalidate = useInvalidateV5();
  return useMutation({
    mutationFn: async (input: ImplementationIntentionV5) => {
      const row = {
        owner_id: requireDeviceOwnerId(),
        trigger_type: input.trigger_type,
        trigger_value: input.trigger_value,
        action_type: input.action_type,
        action_value: input.action_value,
        enabled: input.enabled,
        source: input.suggested ? "suggested" : "user",
        updated_at: new Date().toISOString(),
      };
      const query = input.id
        ? db.from("implementation_intentions").update(row).eq("id", input.id)
        : db.from("implementation_intentions").insert(row);
      const { error } = await query;
      if (error) throw error;
    },
    onSuccess: invalidate,
  });
}

export function useDeleteImplementationIntentionV5() {
  const invalidate = useInvalidateV5();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await db.from("implementation_intentions").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });
}

export function useUpsertReminderAdaptationV5() {
  const invalidate = useInvalidateV5();
  return useMutation({
    mutationFn: async (input: {
      mode: ReminderAdaptationRowV5["mode"];
      self_start_rate: number | null;
      sample_size: number;
      metadata?: Record<string, unknown>;
    }) => {
      const { error } = await db.from("reminder_adaptation").upsert({
        owner_id: requireDeviceOwnerId(),
        ...input,
        metadata: input.metadata ?? {},
        last_changed_at: new Date().toISOString(),
      }, { onConflict: "owner_id" });
      if (error) throw error;
    },
    onSuccess: invalidate,
  });
}

export function useUpsertContrastiveRepairV5() {
  const invalidate = useInvalidateV5();
  return useMutation({
    mutationFn: async (input: {
      mistake_id: string;
      divergence_note?: string | null;
      explanation?: string | null;
      repaired_solution?: string | null;
      followup_attempt_id?: string | null;
      status: ContrastiveRepairRowV5["status"];
    }) => {
      const { error } = await db.from("contrastive_repairs").upsert({
        owner_id: requireDeviceOwnerId(),
        ...input,
        updated_at: new Date().toISOString(),
      }, { onConflict: "owner_id,mistake_id" });
      if (error) throw error;
    },
    onSuccess: invalidate,
  });
}

export function useCreateExamSimulationV5() {
  const invalidate = useInvalidateV5();
  return useMutation({
    mutationFn: async (input: {
      course_id: string;
      exam_id?: string | null;
      mode: "practice" | "full";
      metadata?: Record<string, unknown>;
    }) => {
      const { data, error } = await db.from("exam_simulations").insert({
        owner_id: requireDeviceOwnerId(),
        course_id: input.course_id,
        exam_id: input.exam_id ?? null,
        mode: input.mode,
        metadata: input.metadata ?? {},
      }).select("*").single();
      if (error) throw error;
      return data as ExamSimulationRowV5;
    },
    onSuccess: invalidate,
  });
}

export function useUpdateExamSimulationV5() {
  const invalidate = useInvalidateV5();
  return useMutation({
    mutationFn: async (input: {
      id: string;
      selected_task_ids?: string[];
      completed_task_ids?: string[];
      scores?: Record<string, number>;
      duration_minutes?: number | null;
      completed?: boolean;
      metadata?: Record<string, unknown>;
    }) => {
      const { id, completed, ...rest } = input;
      const patch: Record<string, unknown> = { ...rest };
      if (completed) patch["completed_at"] = new Date().toISOString();
      const { error } = await db.from("exam_simulations").update(patch).eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });
}

export function useUpsertSubjectTaskParametersV5() {
  const invalidate = useInvalidateV5();
  return useMutation({
    mutationFn: async (rows: Array<{
      subject: string;
      attempt_type: string;
      observations: number;
      success_rate: number;
      delayed_success_rate: number | null;
      spacing_multiplier: number;
      difficulty_bias: number;
      reliability: number;
    }>) => {
      if (!rows.length) return;
      const ownerId = requireDeviceOwnerId();
      const { error } = await db.from("subject_task_parameters").upsert(
        rows.map((row) => ({
          owner_id: ownerId,
          ...row,
          updated_at: new Date().toISOString(),
        })),
        { onConflict: "owner_id,subject,attempt_type" },
      );
      if (error) throw error;
    },
    onSuccess: invalidate,
  });
}
