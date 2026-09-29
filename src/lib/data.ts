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
  type PracticeAttempt,
  type Session,
  type Topic,
  type WeeklyCheckin,
  type ProgressEvent,
  generatePlan,
  balanceDraftsAgainstPlan,
} from "./domain";
import { today } from "./fi";
import { requireDeviceOwnerId } from "./deviceSession";

export type UserPreferences = {
  owner_id: string;
  display_name: string;
  onboarding_completed: boolean;
  study_weekdays: number[];
  weekday_capacity_minutes: number;
  weekend_capacity_minutes: number;
  busy_dates: string[];
  notifications_enabled: boolean;
  timezone: string;
  created_at: string;
  updated_at: string;
};

const untypedSupabase = supabase as any;

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
  return (data ?? []) as unknown as Mistake[];
}

async function listTests(): Promise<PracticeTest[]> {
  const { data, error } = await supabase.from("practice_tests").select("*").order("date");
  if (error) throw error;
  return data ?? [];
}


async function listPracticeAttempts(): Promise<PracticeAttempt[]> {
  const { data, error } = await untypedSupabase
    .from("practice_attempts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);
  if (error) throw error;
  return (data ?? []) as PracticeAttempt[];
}


async function listWeeklyCheckins(): Promise<WeeklyCheckin[]> {
  const { data, error } = await supabase
    .from("weekly_checkins")
    .select("*")
    .order("week_start", { ascending: false })
    .limit(52);
  if (error) throw error;
  return (data ?? []) as unknown as WeeklyCheckin[];
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

async function getPreferences(): Promise<UserPreferences | null> {
  const { data, error } = await untypedSupabase
    .from("user_preferences")
    .select("*")
    .maybeSingle();
  if (error) throw error;
  return data ?? null;
}

export const useCourses = () => useQuery({ queryKey: ["courses"], queryFn: listCourses });
export const useTopics = () => useQuery({ queryKey: ["topics"], queryFn: listTopics });
export const useSessions = () => useQuery({ queryKey: ["sessions"], queryFn: listSessions });
export const useExams = () => useQuery({ queryKey: ["exams"], queryFn: listExams });
export const usePlan = () => useQuery({ queryKey: ["plan"], queryFn: listPlan });
export const useMistakes = () => useQuery({ queryKey: ["mistakes"], queryFn: listMistakes });
export const useTests = () => useQuery({ queryKey: ["tests"], queryFn: listTests });
export const usePracticeAttempts = () =>
  useQuery({ queryKey: ["practice-attempts"], queryFn: listPracticeAttempts });
export const useSettings = () => useQuery({ queryKey: ["settings"], queryFn: getSettings });
export const usePreferences = () =>
  useQuery({ queryKey: ["preferences"], queryFn: getPreferences });
export const useWeeklyCheckins = () =>
  useQuery({ queryKey: ["weekly-checkins"], queryFn: listWeeklyCheckins });
export const useProgressEvents = () =>
  useQuery({ queryKey: ["progress-events"], queryFn: listProgressEvents });


const KE04_TOPICS = [
  { name: "Reaktioyhtälöt ja tasapainotus", weight: 8, importance: 5, materials: "s. 14–25" },
  { name: "Stoikiometria", weight: 10, importance: 5, materials: "s. 14–35" },
  { name: "Reaktion saanto", weight: 8, importance: 4, materials: "s. 27–35" },
  { name: "Rajoittava tekijä", weight: 9, importance: 5, materials: "s. 38–44" },
  { name: "Ideaalikaasu ja kaasustoikiometria", weight: 8, importance: 4, materials: "s. 46–54" },
  { name: "Saostumis- ja hajoamisreaktiot", weight: 5, importance: 3, materials: "s. 61–88" },
  { name: "Protoninsiirto, neutraloituminen ja titraus", weight: 8, importance: 5, materials: "s. 61–88" },
  { name: "Palamisreaktiot", weight: 4, importance: 3, materials: "s. 61–88" },
  { name: "Substituutioreaktiot", weight: 5, importance: 3, materials: "s. 92–100" },
  { name: "Additioreaktiot", weight: 5, importance: 3, materials: "s. 103–111" },
  { name: "Eliminaatioreaktiot", weight: 5, importance: 3, materials: "s. 103–111" },
  { name: "Kondensaatioreaktiot", weight: 5, importance: 3, materials: "s. 114–122" },
  { name: "Hydrolyysireaktiot", weight: 5, importance: 3, materials: "s. 114–122" },
  { name: "Polymeroituminen ja polymeerit", weight: 8, importance: 4, materials: "s. 132–161" },
  { name: "Biomolekyylit", weight: 7, importance: 4, materials: "s. 162–210" },
] as const;

/**
 * Make the canonical KE04 course available to the currently authenticated
 * Arthur identity. Safe to run repeatedly: existing user data is preserved
 * and only missing canonical topics / exam rows are added.
 */
export async function ensureKe04ForCurrentUser(): Promise<string> {
  const ownerId = requireDeviceOwnerId();

  const { data: existing, error: existingError } = await supabase
    .from("courses")
    .select("*")
    .eq("code", "KE04")
    .maybeSingle();
  if (existingError) throw existingError;

  let course: Course;

  if (!existing) {
    const { data: created, error } = await supabase
      .from("courses")
      .insert({
        code: "KE04",
        name: "Kemialliset reaktiot",
        subject: "Kemia",
        start_date: "2026-10-05",
        exam_date: "2026-11-23",
        target_system: "school",
        target_value: "10",
        color: "sage",
        weekly_minutes: 195,
      })
      .select()
      .single();
    if (error) throw error;
    course = created;
  } else {
    const patch: Partial<Course> = {};
    if (!existing.subject) patch.subject = "Kemia";
    if (!existing.start_date) patch.start_date = "2026-10-05";
    if (!existing.exam_date) patch.exam_date = "2026-11-23";
    if (!existing.target_value) {
      patch.target_system = "school";
      patch.target_value = "10";
    }

    if (Object.keys(patch).length) {
      const { data: updated, error } = await supabase
        .from("courses")
        .update(patch)
        .eq("id", existing.id)
        .select()
        .single();
      if (error) throw error;
      course = updated;
    } else {
      course = existing;
    }
  }

  const { data: existingTopics, error: topicsReadError } = await supabase
    .from("topics")
    .select("*")
    .eq("course_id", course.id)
    .order("position");
  if (topicsReadError) throw topicsReadError;

  const names = new Set((existingTopics ?? []).map((t) => t.name));
  const canonicalByName = new Map(KE04_TOPICS.map((topic) => [topic.name, topic]));

  const repairs = (existingTopics ?? [])
    .map((topic) => {
      const canonical = canonicalByName.get(topic.name as (typeof KE04_TOPICS)[number]["name"]);
      if (!canonical || topic.materials === canonical.materials) return null;
      return supabase
        .from("topics")
        .update({ materials: canonical.materials })
        .eq("id", topic.id);
    })
    .filter(Boolean);

  if (repairs.length) {
    const results = await Promise.all(repairs);
    const repairError = results.find((result) => result?.error)?.error;
    if (repairError) throw repairError;
  }

  const missingTopics = KE04_TOPICS
    .map((topic, index) => ({ ...topic, course_id: course.id, position: index + 1 }))
    .filter((topic) => !names.has(topic.name));

  if (missingTopics.length) {
    const { error } = await supabase.from("topics").insert(missingTopics);
    if (error) throw error;
  }

  const { data: topics, error: fullTopicsError } = await supabase
    .from("topics")
    .select("*")
    .eq("course_id", course.id)
    .order("position");
  if (fullTopicsError) throw fullTopicsError;

  const { data: exams, error: examsReadError } = await supabase
    .from("exams")
    .select("id")
    .eq("course_id", course.id)
    .eq("name", "KE04 kurssikoe")
    .limit(1);
  if (examsReadError) throw examsReadError;

  if (!exams?.length) {
    const { error } = await supabase.from("exams").insert({
      course_id: course.id,
      name: "KE04 kurssikoe",
      date: "2026-11-23",
      target_system: "school",
      target_value: "10",
    });
    if (error) throw error;
  }

  const { data: settings, error: settingsReadError } = await supabase
    .from("notification_settings")
    .select("id")
    .limit(1)
    .maybeSingle();
  if (settingsReadError) throw settingsReadError;
  if (!settings) {
    const { error } = await supabase.from("notification_settings").insert({});
    if (error) throw error;
  }

  const { data: preferences, error: preferencesReadError } = await untypedSupabase
    .from("user_preferences")
    .select("*")
    .maybeSingle();
  if (preferencesReadError) throw preferencesReadError;
  if (!preferences) {
    const { error } = await untypedSupabase.from("user_preferences").insert({
      owner_id: ownerId,
      display_name: "Arthur",
      study_weekdays: [1, 2, 3, 4, 5],
      weekday_capacity_minutes: 60,
      weekend_capacity_minutes: 90,
      busy_dates: [],
      notifications_enabled: false,
      timezone: "Europe/Helsinki",
      onboarding_completed: false,
    });
    if (error) throw error;
  }

  return course.id;
}

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
  objective?: string | null;
  recall?: string | null;
  retrieval_check?: string | null;
  retrieval_result?: "independent" | "hinted" | "not_yet" | null;
  retrieval_confidence?: number | null;
  outcome?: "yes" | "partial" | "not_yet" | null;
};

async function doLogSession(payload: unknown, operationId: string) {
  const input = payload as LogSessionInput;
  const date = input.date ?? today();
  const common = {
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
  };

  const result = input.retrieval_result
    ? await untypedSupabase.rpc("log_guided_study_session", {
        ...common,
        p_objective: input.objective ?? null,
        p_recall: input.recall ?? null,
        p_retrieval_check: input.retrieval_check ?? null,
        p_retrieval_result: input.retrieval_result,
        p_retrieval_confidence: input.retrieval_confidence ?? null,
        p_outcome: input.outcome ?? null,
      })
    : await supabase.rpc("log_study_session", common);

  const { data: sessionId, error } = result;
  if (error) throw error;
  if (!sessionId) throw new Error("Opiskelusession tallennus ei palauttanut tunnistetta.");
  return sessionId;
}

type RecordPracticeAttemptInput = {
  course_id: string;
  topic_id: string;
  date?: string;
  attempt_type: PracticeAttempt["attempt_type"];
  prompt: string;
  response?: string | null;
  difficulty: number;
  result: PracticeAttempt["result"];
  confidence?: number | null;
  hint_used?: boolean;
};

async function doRecordPracticeAttempt(payload: unknown) {
  const input = payload as RecordPracticeAttemptInput;
  const { data, error } = await untypedSupabase.rpc("record_practice_attempt", {
    p_course_id: input.course_id,
    p_topic_id: input.topic_id,
    p_date: input.date ?? today(),
    p_attempt_type: input.attempt_type,
    p_prompt: input.prompt,
    p_response: input.response ?? null,
    p_difficulty: input.difficulty,
    p_result: input.result,
    p_confidence: input.confidence ?? null,
    p_hint_used: input.hint_used ?? false,
  });
  if (error) throw error;
  if (!data) throw new Error("Harjoitusyrityksen tallennus ei palauttanut tunnistetta.");
  return data as string;
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

async function doUpsertPlanItem(payload: unknown, operationId: string) {
  const p = payload as Partial<PlanItem> & { id?: string; course_id: string; date: string };
  if (p.id) {
    const { id, ...rest } = p;
    const { error } = await supabase.from("plan_items").update(rest).eq("id", id);
    if (error) throw error;
    return id;
  }

  const { error } = await supabase
    .from("plan_items")
    .upsert({ ...p, id: operationId } as never, { onConflict: "id" });
  if (error) throw error;
  return operationId;
}


async function doWeeklyCheckin(payload: unknown) {
  const p = payload as {
    week_start: string;
    note: string | null;
    planned_minutes: number | null;
    actual_minutes: number | null;
    adherence: number | null;
    hardest_topic_id: string | null;
    went_well: string | null;
    next_focus: string | null;
    load_rating: "light" | "good" | "heavy" | null;
  };
  const ownerId = requireDeviceOwnerId();
  const { error } = await untypedSupabase.from("weekly_checkins").upsert(
    { ...p, owner_id: ownerId },
    { onConflict: "owner_id,week_start" },
  );
  if (error) throw error;
}

registerOp("logSession", doLogSession);
registerOp("recordPracticeAttempt", doRecordPracticeAttempt);
registerOp("updatePlanStatus", doUpdatePlanStatus);
registerOp("movePlanItem", doMovePlanItem);
registerOp("upsertPlanItem", doUpsertPlanItem);
registerOp("weeklyCheckin", doWeeklyCheckin);

function useInvalidateAll() {
  const qc = useQueryClient();
  return () =>
    ["courses", "topics", "sessions", "exams", "plan", "mistakes", "tests", "practice-attempts", "settings", "preferences", "weekly-checkins", "progress-events"].forEach(
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


export function useRecordPracticeAttempt() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: (input: RecordPracticeAttemptInput) =>
      runOrQueue("recordPracticeAttempt", input),
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
      const [{ data: previous, error: readError }, { data: otherPlan, error: otherError }] = await Promise.all([
        supabase.from("plan_items").select("id").eq("course_id", input.courseId).eq("status", "planned"),
        supabase.from("plan_items").select("*").neq("course_id", input.courseId).eq("status", "planned"),
      ]);
      if (readError) throw readError;
      if (otherError) throw otherError;
      const balancedDrafts = balanceDraftsAgainstPlan(input.drafts, otherPlan ?? []);
      const { data: created, error } = await supabase.from("plan_items").insert(balancedDrafts).select("id");
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
    mutationFn: (input: Partial<PlanItem> & { id?: string; course_id: string; date: string }) =>
      runOrQueue("upsertPlanItem", input),
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
  study_mode?: string;
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

export function useUpdatePreferences() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: async (
      input: Partial<Omit<UserPreferences, "created_at" | "updated_at">>,
    ) => {
      const payload = {
        ...input,
        owner_id: requireDeviceOwnerId(),
      };
      const { error } = await untypedSupabase
        .from("user_preferences")
        .upsert(payload, { onConflict: "owner_id" });
      if (error) throw error;
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
    mutationFn: async (input: {
      course_id: string;
      topic_id: string | null;
      type?: string | null;
      error: string;
      what_happened?: string | null;
      solution?: string | null;
      retry_date?: string | null;
    }) => {
      const { error } = await untypedSupabase.from("mistakes").insert({
        ...input,
        explanation: input.solution ?? null,
        status: "open",
      });
      if (error) throw error;
    },
    onSuccess: invalidate,
  });
}

export function useAdvanceMistake() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: async (input: { id: string; status: "corrected" | "retested" | "mastered" }) => {
      const patch: Record<string, unknown> = { status: input.status };
      if (input.status === "retested") patch["retested_at"] = today();
      if (input.status === "mastered") patch["mastered_at"] = today();
      const { error } = await untypedSupabase.from("mistakes").update(patch).eq("id", input.id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });
}

export function useResolveMistake() {
  const advance = useAdvanceMistake();
  return {
    ...advance,
    mutateAsync: (id: string) => advance.mutateAsync({ id, status: "corrected" as const }),
  };
}

export function useCreatePracticeTest() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: async (input: {
      course_id: string;
      date: string;
      score: number;
      max_score: number;
      duration_minutes?: number | null;
      error_count?: number | null;
      topic_results?: unknown[];
    }) => {
      const { error } = await untypedSupabase.rpc("record_practice_test", {
        p_course_id: input.course_id,
        p_date: input.date,
        p_score: input.score,
        p_max_score: input.max_score,
        p_duration_minutes: input.duration_minutes ?? null,
        p_error_count: input.error_count ?? null,
        p_topic_results: input.topic_results ?? [],
      });
      if (error) throw error;
    },
    onSuccess: invalidate,
  });
}

export function useUpsertWeeklyCheckin() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: (input: {
      week_start: string;
      note: string | null;
      planned_minutes: number | null;
      actual_minutes: number | null;
      adherence: number | null;
      hardest_topic_id: string | null;
      went_well: string | null;
      next_focus: string | null;
      load_rating: "light" | "good" | "heavy" | null;
    }) => runOrQueue("weeklyCheckin", input),
    onSuccess: invalidate,
  });
}
