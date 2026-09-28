import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { registerOp, runOrQueue } from "./offline";
import {
  type Course,
  type Exam,
  type Mistake,
  type NotificationSettings,
  type PlanDraft,
  type PlanItem,
  type PracticeTest,
  type Session,
  type Topic,
  type WeeklyCheckin,
  type ProgressEvent,
} from "./domain";
import { today } from "./fi";

/** ---------- reads ---------- */

async function listCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("archived")
    .order("code");
  if (error) throw error;
  return data ?? [];
}

async function listTopics(): Promise<Topic[]> {
  const { data, error } = await supabase.from("topics").select("*").order("position");
  if (error) throw error;
  return data ?? [];
}

async function listSessions(): Promise<Session[]> {
  const { data, error } = await supabase
    .from("study_sessions")
    .select("*")
    .order("date", { ascending: false })
    .limit(1000);
  if (error) throw error;
  return data ?? [];
}

async function listExams(): Promise<Exam[]> {
  const { data, error } = await supabase.from("exams").select("*").order("date");
  if (error) throw error;
  return data ?? [];
}

async function listPlan(): Promise<PlanItem[]> {
  const { data, error } = await supabase.from("plan_items").select("*").order("date").limit(2000);
  if (error) throw error;
  return data ?? [];
}

async function listMistakes(): Promise<Mistake[]> {
  const { data, error } = await supabase
    .from("mistakes")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

async function listTests(): Promise<PracticeTest[]> {
  const { data, error } = await supabase.from("practice_tests").select("*").order("date");
  if (error) throw error;
  return data ?? [];
}


async function listWeeklyCheckins(): Promise<WeeklyCheckin[]> {
  const { data, error } = await supabase
    .from("weekly_checkins")
    .select("*")
    .order("week_start", { ascending: false })
    .limit(52);
  if (error) throw error;
  return data ?? [];
}

async function listProgressEvents(): Promise<ProgressEvent[]> {
  const { data, error } = await supabase
    .from("progress_events")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(250);
  if (error) throw error;
  return data ?? [];
}

async function getSettings(): Promise<NotificationSettings | null> {
  const { data, error } = await supabase.from("notification_settings").select("*").limit(1);
  if (error) throw error;
  return data?.[0] ?? null;
}

export const useCourses = () => useQuery({ queryKey: ["courses"], queryFn: listCourses });
export const useTopics = () => useQuery({ queryKey: ["topics"], queryFn: listTopics });
export const useSessions = () => useQuery({ queryKey: ["sessions"], queryFn: listSessions });
export const useExams = () => useQuery({ queryKey: ["exams"], queryFn: listExams });
export const usePlan = () => useQuery({ queryKey: ["plan"], queryFn: listPlan });
export const useMistakes = () => useQuery({ queryKey: ["mistakes"], queryFn: listMistakes });
export const useTests = () => useQuery({ queryKey: ["tests"], queryFn: listTests });
export const useSettings = () => useQuery({ queryKey: ["settings"], queryFn: getSettings });
export const useWeeklyCheckins = () =>
  useQuery({ queryKey: ["weekly-checkins"], queryFn: listWeeklyCheckins });
export const useProgressEvents = () =>
  useQuery({ queryKey: ["progress-events"], queryFn: listProgressEvents });

/** ---------- writes ---------- */

export type LogSessionInput = {
  course_id: string;
  topic_id: string | null;
  minutes: number;
  planned_minutes?: number | null;
  kind: string;
  competence?: number | null;
  unclear?: string | null;
  did?: string | null;
  focus?: number | null;
  method?: string | null;
  energy?: number | null;
  tasks?: string | null;
  note?: string | null;
  plan_item_id?: string | null;
  date?: string;
};

async function doLogSession(payload: unknown, operationId: string) {
  const input = payload as LogSessionInput;
  const date = input.date ?? today();
  const { data: sessionId, error } = await supabase.rpc("log_study_session", {
    p_request_id: operationId,
    p_course_id: input.course_id,
    p_topic_id: input.topic_id,
    p_date: date,
    p_minutes: input.minutes,
    p_planned_minutes: input.planned_minutes ?? null,
    p_kind: input.kind,
    p_competence: input.competence ?? null,
    p_unclear: input.unclear ?? null,
    p_did: input.did ?? null,
    p_focus: input.focus ?? null,
    p_method: input.method ?? null,
    p_energy: input.energy ?? null,
    p_tasks: input.tasks ?? null,
    p_note: input.note ?? null,
    p_plan_item_id: input.plan_item_id ?? null,
  });
  if (error) throw error;
  if (!sessionId) throw new Error("Opiskelusession tallennus ei palauttanut tunnistetta.");
  return sessionId;
}

async function doUpdatePlanStatus(payload: unknown) {
  const p = payload as { id: string; status: string };
  const { error } = await supabase.from("plan_items").update({ status: p.status }).eq("id", p.id);
  if (error) throw error;
}

async function doMovePlanItem(payload: unknown) {
  const p = payload as { id: string; date: string; from: string };
  const { error } = await supabase
    .from("plan_items")
    .update({ date: p.date, moved_from: p.from, status: "planned" })
    .eq("id", p.id);
  if (error) throw error;
}

registerOp("logSession", doLogSession);
registerOp("updatePlanStatus", doUpdatePlanStatus);
registerOp("movePlanItem", doMovePlanItem);

function useInvalidateAll() {
  const qc = useQueryClient();
  return () =>
    ["courses", "topics", "sessions", "exams", "plan", "mistakes", "tests", "settings", "weekly-checkins", "progress-events"].forEach(
      (k) => qc.invalidateQueries({ queryKey: [k] }),
    );
}

export function useLogSession() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: (input: LogSessionInput) => runOrQueue("logSession", input),
    onSuccess: invalidate,
  });
}

export function usePlanStatus() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: (input: { id: string; status: string }) => runOrQueue("updatePlanStatus", input),
    onSuccess: invalidate,
  });
}

export function useMovePlanItem() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: (input: { id: string; date: string; from: string }) =>
      runOrQueue("movePlanItem", input),
    onSuccess: invalidate,
  });
}

export function useGeneratePlan() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: async (input: { courseId: string; drafts: PlanDraft[] }) => {
      const { data: previous, error: readError } = await supabase
        .from("plan_items").select("id").eq("course_id", input.courseId).eq("status", "planned");
      if (readError) throw readError;
      const { data: created, error } = await supabase.from("plan_items").insert(input.drafts).select("id");
      if (error) throw error;
      if (previous?.length) {
        const { error: deleteError } = await supabase.from("plan_items").delete().in("id", previous.map(p => p.id));
        if (deleteError) {
          if (created?.length) await supabase.from("plan_items").delete().in("id", created.map(p => p.id));
          throw deleteError;
        }
      }
    },
    onSuccess: invalidate,
  });
}

export function useUpsertPlanItem() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: async (input: Partial<PlanItem> & { id?: string; course_id: string; date: string }) => {
      if (input.id) {
        const { id, ...rest } = input;
        const { error } = await supabase.from("plan_items").update(rest).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("plan_items").insert(input as never);
        if (error) throw error;
      }
    },
    onSuccess: invalidate,
  });
}

export function useUpdateTopic() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: async (input: { id: string } & Partial<Topic>) => {
      const { id, ...rest } = input;
      const { error } = await supabase.from("topics").update(rest).eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });
}

export function useCreateTopic() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: async (input: {
      course_id: string;
      name: string;
      weight?: number;
      importance?: number;
      materials?: string | null;
      position?: number;
    }) => {
      const { error } = await supabase.from("topics").insert(input);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });
}

export function useUpdateCourse() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: async (input: { id: string } & Partial<Course>) => {
      const { id, ...rest } = input;
      const { error } = await supabase.from("courses").update(rest).eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });
}

export function useArchiveCourse() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: async (input: { id: string; archived: boolean }) => {
      const { error } = await supabase
        .from("courses")
        .update({ archived: input.archived })
        .eq("id", input.id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });
}

export type NewCourse = {
  code: string;
  name: string;
  subject?: string | null;
  start_date?: string | null;
  exam_date?: string | null;
  target_system?: string;
  target_value?: string | null;
  weekly_minutes?: number;
  color?: string;
  topics: { name: string; weight: number; importance: number; materials?: string | null }[];
};

export function useCreateCourse() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: async (input: NewCourse) => {
      const { topics, ...course } = input;
      const { data, error } = await supabase.from("courses").insert(course).select().single();
      if (error) throw error;
      const sum = topics.reduce((s, t) => s + (t.weight || 0), 0);
      if (topics.length) {
        const rows = topics.map((t, i) => ({
          course_id: data.id,
          name: t.name,
          position: i + 1,
          weight: sum > 0 ? Math.round((t.weight / sum) * 1000) / 10 : Math.round(1000 / topics.length) / 10,
          importance: t.importance || 3,
          materials: t.materials ?? null,
        }));
        const { error: tErr } = await supabase.from("topics").insert(rows);
        if (tErr) throw tErr;
      }
      if (input.exam_date) {
        await supabase.from("exams").insert({
          course_id: data.id,
          name: `${input.code} koe`,
          date: input.exam_date,
          target_system: input.target_system ?? "school",
          target_value: input.target_value ?? null,
        });
      }
      return data;
    },
    onSuccess: invalidate,
  });
}

export function useUpdateSettings() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: async (input: { id: string } & Partial<NotificationSettings>) => {
      const { id, ...rest } = input;
      const { error } = await supabase.from("notification_settings").update(rest).eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });
}

export function useCreateExam() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: async (input: { course_id: string; name: string; date: string; target_system?: string; target_value?: string | null }) => {
      const { error } = await supabase.from("exams").insert(input);
      if (error) throw error;
      const { error: courseError } = await supabase.from("courses").update({ exam_date: input.date }).eq("id", input.course_id);
      if (courseError) throw courseError;
    },
    onSuccess: invalidate,
  });
}

export function useCreateMistake() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: async (input: { course_id: string; topic_id: string | null; error: string; explanation?: string | null }) => {
      const { error } = await supabase.from("mistakes").insert(input);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });
}

export function useResolveMistake() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("mistakes").update({ status: "corrected" }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });
}

export function useCreatePracticeTest() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: async (input: { course_id: string; date: string; score: number; max_score: number; duration_minutes?: number | null }) => {
      const { error } = await supabase.from("practice_tests").insert(input);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });
}

export function useUpsertWeeklyCheckin() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: async (input: {
      week_start: string;
      note: string | null;
      planned_minutes: number | null;
      actual_minutes: number | null;
    }) => {
      const { data: existing, error: readError } = await supabase
        .from("weekly_checkins")
        .select("id")
        .eq("week_start", input.week_start)
        .maybeSingle();
      if (readError) throw readError;

      if (existing?.id) {
        const { error } = await supabase
          .from("weekly_checkins")
          .update({
            note: input.note,
            planned_minutes: input.planned_minutes,
            actual_minutes: input.actual_minutes,
          })
          .eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("weekly_checkins").insert(input);
        if (error) throw error;
      }
    },
    onSuccess: invalidate,
  });
}
