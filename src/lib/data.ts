import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { registerOp, runOrQueue } from "./offline";
import {
  nextReviewDate,
  verifiedLevel,
  type Course,
  type Exam,
  type Mistake,
  type NotificationSettings,
  type PlanDraft,
  type PlanItem,
  type PracticeTest,
  type Session,
  type Topic,
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

async function doLogSession(payload: unknown) {
  const input = payload as LogSessionInput;
  const date = input.date ?? today();
  const { data: session, error } = await supabase
    .from("study_sessions")
    .insert({
      course_id: input.course_id,
      topic_id: input.topic_id,
      date,
      minutes: input.minutes,
      planned_minutes: input.planned_minutes ?? null,
      kind: input.kind,
      competence: input.competence ?? null,
      unclear: input.unclear ?? null,
      did: input.did ?? null,
      focus: input.focus ?? null,
      method: input.method ?? null,
      energy: input.energy ?? null,
      tasks: input.tasks ?? null,
      note: input.note ?? null,
    })
    .select()
    .single();
  if (error) throw error;

  if (input.topic_id) {
    const { data: topic } = await supabase
      .from("topics")
      .select("*")
      .eq("id", input.topic_id)
      .single();
    if (topic) {
      const progressStep = input.kind === "study" ? Math.min(30, Math.round(input.minutes / 3)) : 5;
      const progress = Math.min(100, topic.progress + progressStep);
      const basic =
        topic.basic_successes + ((input.competence ?? 0) >= 3 && input.kind !== "test" ? 1 : 0);
      const exam =
        topic.exam_successes + ((input.competence ?? 0) >= 4 && input.kind === "test" ? 1 : 0);
      const delayed =
        topic.delayed_successes + ((input.competence ?? 0) >= 3 && input.kind === "review" ? 1 : 0);
      const draft = {
        ...topic,
        progress,
        basic_successes: basic,
        exam_successes: exam,
        delayed_successes: delayed,
        self_level: input.competence ?? topic.self_level,
      };
      const verified = verifiedLevel(draft);
      await supabase
        .from("topics")
        .update({
          progress,
          basic_successes: basic,
          exam_successes: exam,
          delayed_successes: delayed,
          self_level: input.competence ?? topic.self_level,
          verified_level: verified,
          study_minutes: topic.study_minutes + input.minutes,
          last_review: date,
          next_review: nextReviewDate(date, verified),
        })
        .eq("id", topic.id);

      if (verified !== topic.verified_level) {
        await supabase.from("progress_events").insert({
          course_id: input.course_id,
          topic_id: topic.id,
          kind: "mastery",
          from_value: topic.verified_level,
          to_value: verified,
          detail: topic.name,
        });
      }
    }
  }

  if (input.plan_item_id) {
    await supabase
      .from("plan_items")
      .update({ status: "completed", session_id: session.id })
      .eq("id", input.plan_item_id);
  }
  return session;
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
    ["courses", "topics", "sessions", "exams", "plan", "mistakes", "tests", "settings"].forEach(
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
