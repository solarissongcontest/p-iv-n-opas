import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { registerOp, runOrQueue } from "./offline";
import {
  type CapacityProfile,
  type Course,
  type Exam,
  type Mistake,
  type NotificationSettings,
  type PlanDraft,
  type PlanItem,
  type PracticeTest,
  type PracticeAttempt,
  type QuestionBankItem,
  type Session,
  type Topic,
  type WeeklyCheckin,
  type ProgressEvent,
  generatePlan,
  balanceDraftsAgainstPlan,
  findNextStudyDate,
} from "./domain";
import { addDays, parseISO, today } from "./fi";
import { requireDeviceOwnerId } from "./deviceSession";

export type TopicDependency = {
  id: string;
  owner_id: string;
  topic_id: string;
  depends_on_topic_id: string;
  relation_type: "prerequisite" | "depends_on" | "related_to" | "builds_on" | "commonly_confused_with";
  created_at: string;
};

export type StudyMaterial = {
  id: string;
  owner_id: string;
  course_id: string;
  name: string;
  kind: "pdf" | "text" | "slides" | "notes" | "other";
  topic_ids: string[];
  page_hint: string | null;
  text_preview: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
};

export type LearningExperiment = {
  id: string;
  owner_id: string;
  experiment_key: "session_length" | "spacing_window" | "interleaving";
  enabled: boolean;
  variant_a: string;
  variant_b: string;
  observations: Array<{
    date: string;
    variant: "A" | "B";
    outcome: number;
    delayedOutcome?: number;
    minutes?: number;
  }>;
  started_at: string;
  updated_at: string;
};

export type CalibrationObservationV5 = {
  id?: string;
  owner_id?: string;
  course_id?: string | null;
  topic_id: string;
  attempt_id?: string | null;
  predicted_confidence: number;
  actual_outcome: "correct" | "partial" | "incorrect";
  delay_hours: number;
  observed_at?: string;
};

export type FrictionEventV5 = {
  id?: string;
  date: string;
  plan_item_id?: string | null;
  course_id?: string | null;
  reason: "started" | "no_time" | "forgot" | "too_tired" | "too_hard" | "unclear_start" | "plans_changed" | "other";
  note?: string | null;
  self_started?: boolean | null;
  reminder_used?: boolean | null;
};

export type ImplementationIntentionV5 = {
  id?: string;
  trigger_type: "late_home" | "low_energy" | "missed_days" | "busy_day" | "custom";
  trigger_value: string;
  action_type: "lighten" | "move" | "replace_with_retrieval" | "protect_rest" | "custom";
  action_value: string;
  enabled: boolean;
  suggested?: boolean;
  reason?: string | null;
};

export type PretestAttemptV5 = {
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

export type ReminderAdaptationV5 = {
  owner_id: string;
  recommended_level: "none" | "light" | "normal";
  independent_start_rate: number | null;
  sample_size: number;
  metadata: Record<string, unknown>;
  updated_at: string;
};

export type SubjectTaskParameterV5 = {
  id: string;
  owner_id: string;
  subject: string;
  attempt_type: string;
  observations: number;
  success_rate: number;
  mean_delay_days: number;
  preferred_spacing_days: number;
  confidence: "very_low" | "low" | "medium" | "high";
  active: boolean;
  updated_at: string;
};

export type LearningPolicyState = {
  id: string;
  owner_id: string;
  course_id: string | null;
  topic_id: string;
  desired_retention: number;
  current_retention: number;
  recommended_minutes: number;
  stop_today: boolean;
  next_useful_date: string | null;
  recommendation_confidence: number;
  recommendation_reason: string | null;
  model_version: number;
  updated_at: string;
};

export type ExamSimulationRow = {
  id: string;
  owner_id: string;
  course_id: string;
  mode: "practice" | "full";
  task_ids: string[];
  selected_task_ids: string[];
  completed_task_ids: string[];
  scores: Record<string, number>;
  answers: Record<string, unknown>;
  duration_minutes: number;
  started_at: string | null;
  completed_at: string | null;
  task_selection_note: string | null;
  created_at: string;
};

export type UserPreferences = {
  owner_id: string;
  display_name: string;
  onboarding_completed: boolean;
  study_weekdays: number[];
  weekday_capacity_min_minutes: number;
  weekday_capacity_minutes: number;
  weekend_capacity_min_minutes: number;
  weekend_capacity_minutes: number;
  busy_dates: string[];
  notifications_enabled: boolean;
  planner_mode?: "manual" | "assisted" | "autopilot";
  personal_experiments_enabled?: boolean;
  retention_budget_enabled?: boolean;
  reminder_taper_enabled?: boolean;
  friction_learning_enabled?: boolean;
  pretest_enabled?: boolean;
  feedback_policy_enabled?: boolean;
  abitti_simulation_enabled?: boolean;
  quiet_hours_start?: string | null;
  quiet_hours_end?: string | null;
  learning_schema_version?: number;
  timezone: string;
  created_at: string;
  updated_at: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- compatibility client for schema fields newer than generated browser types
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
  return (data ?? []) as unknown as Topic[];
}

async function listSessions(): Promise<Session[]> {
  const { data, error } = await supabase
    .from("study_sessions")
    .select("*")
    .order("date", { ascending: false })
    .limit(1000);
  if (error) throw error;
  return (data ?? []) as unknown as Session[];
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


async function listQuestionBank(): Promise<QuestionBankItem[]> {
  const { data, error } = await untypedSupabase
    .from("question_bank")
    .select("*")
    .in("status", ["active", "validated"])
    .eq("curriculum", "LOPS21")
    .order("difficulty")
    .order("created_at", { ascending: false })
    .limit(2000);
  if (error) throw error;
  return (data ?? []) as QuestionBankItem[];
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

async function listTopicDependencies(): Promise<TopicDependency[]> {
  const { data, error } = await untypedSupabase
    .from("topic_dependencies")
    .select("*")
    .order("created_at");
  if (error) throw error;
  return (data ?? []) as TopicDependency[];
}

async function listStudyMaterials(): Promise<StudyMaterial[]> {
  const { data, error } = await untypedSupabase
    .from("study_materials")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as StudyMaterial[];
}

async function listLearningExperiments(): Promise<LearningExperiment[]> {
  const { data, error } = await untypedSupabase
    .from("learning_experiments")
    .select("*")
    .order("started_at");
  if (error) throw error;
  return (data ?? []) as LearningExperiment[];
}

async function listLearningPolicyStates(): Promise<LearningPolicyState[]> {
  const { data, error } = await untypedSupabase
    .from("learning_policy_states")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as LearningPolicyState[];
}

async function listCalibrationObservations(): Promise<CalibrationObservationV5[]> {
  const { data, error } = await untypedSupabase
    .from("calibration_observations")
    .select("*")
    .order("observed_at", { ascending: false })
    .limit(500);
  if (error) throw error;
  return (data ?? []) as CalibrationObservationV5[];
}

async function listFrictionEvents(): Promise<FrictionEventV5[]> {
  const { data, error } = await untypedSupabase
    .from("study_friction_events")
    .select("*")
    .order("event_date", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(500);
  if (error) throw error;
  return (data ?? []).map((row: Record<string, unknown>) => ({
    ...row,
    date: String(row["event_date"] ?? ""),
  })) as FrictionEventV5[];
}

async function listImplementationIntentions(): Promise<ImplementationIntentionV5[]> {
  const { data, error } = await untypedSupabase
    .from("implementation_intentions")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as ImplementationIntentionV5[];
}

async function listExamSimulations(): Promise<ExamSimulationRow[]> {
  const { data, error } = await untypedSupabase
    .from("exam_simulations")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) throw error;
  return (data ?? []) as ExamSimulationRow[];
}

async function listPretestAttempts(): Promise<PretestAttemptV5[]> {
  const { data, error } = await untypedSupabase
    .from("pretest_attempts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);
  if (error) throw error;
  return (data ?? []) as PretestAttemptV5[];
}

async function getReminderAdaptation(): Promise<ReminderAdaptationV5 | null> {
  const { data, error } = await untypedSupabase
    .from("reminder_adaptation")
    .select("*")
    .maybeSingle();
  if (error) throw error;
  return (data ?? null) as ReminderAdaptationV5 | null;
}

async function listSubjectTaskParameters(): Promise<SubjectTaskParameterV5[]> {
  const { data, error } = await untypedSupabase
    .from("subject_task_parameters")
    .select("*")
    .order("observations", { ascending: false });
  if (error) throw error;
  return (data ?? []) as SubjectTaskParameterV5[];
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
export const useQuestionBank = () =>
  useQuery({ queryKey: ["question-bank"], queryFn: listQuestionBank });
export const useSettings = () => useQuery({ queryKey: ["settings"], queryFn: getSettings });
export const usePreferences = () =>
  useQuery({ queryKey: ["preferences"], queryFn: getPreferences });
export const useTopicDependencies = () =>
  useQuery({ queryKey: ["topic-dependencies"], queryFn: listTopicDependencies });
export const useStudyMaterials = () =>
  useQuery({ queryKey: ["study-materials"], queryFn: listStudyMaterials });
export const useLearningExperiments = () =>
  useQuery({ queryKey: ["learning-experiments"], queryFn: listLearningExperiments });
export const useLearningPolicyStates = () =>
  useQuery({ queryKey: ["learning-policy-states"], queryFn: listLearningPolicyStates });
export const useCalibrationObservations = () =>
  useQuery({ queryKey: ["calibration-observations"], queryFn: listCalibrationObservations });
export const useFrictionEvents = () =>
  useQuery({ queryKey: ["friction-events"], queryFn: listFrictionEvents });
export const useImplementationIntentions = () =>
  useQuery({ queryKey: ["implementation-intentions"], queryFn: listImplementationIntentions });
export const useExamSimulations = () =>
  useQuery({ queryKey: ["exam-simulations"], queryFn: listExamSimulations });
export const usePretestAttempts = () =>
  useQuery({ queryKey: ["pretest-attempts"], queryFn: listPretestAttempts });
export const useReminderAdaptation = () =>
  useQuery({ queryKey: ["reminder-adaptation"], queryFn: getReminderAdaptation });
export const useSubjectTaskParameters = () =>
  useQuery({ queryKey: ["subject-task-parameters"], queryFn: listSubjectTaskParameters });
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
    : await untypedSupabase.rpc("log_study_session", common);

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
  hints_used?: number;
  response_time_ms?: number | null;
  source?: NonNullable<PracticeAttempt["source"]>;
  skills?: string[];
  expected_concepts?: string[];
  question_payload?: Record<string, unknown>;
};

async function doRecordPracticeAttempt(payload: unknown, operationId: string) {
  const input = payload as RecordPracticeAttemptInput;
  const hintsUsed = Math.max(input.hints_used ?? 0, input.hint_used ? 1 : 0);
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
    p_hint_used: hintsUsed > 0,
    p_hints_used: hintsUsed,
    p_response_time_ms: input.response_time_ms ?? null,
    p_source: input.source ?? "practice",
    p_skills: input.skills ?? [],
    p_expected_concepts: input.expected_concepts ?? [],
    p_question_payload: input.question_payload ?? {},
    p_operation_id: operationId,
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


type CreateMistakeInput = {
  course_id: string;
  topic_id: string | null;
  type?: string | null;
  error: string;
  what_happened?: string | null;
  solution?: string | null;
  retry_date?: string | null;
};

async function doCreateMistake(payload: unknown, operationId: string) {
  const input = payload as CreateMistakeInput;
  const { error } = await untypedSupabase.from("mistakes").upsert({
    ...input,
    id: operationId,
    owner_id: requireDeviceOwnerId(),
    explanation: input.solution ?? null,
    status: "open",
  }, { onConflict: "id" });
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

async function doCreateCalibrationObservation(payload: unknown, operationId: string) {
  const p = payload as CalibrationObservationV5 & { course_id?: string | null; attempt_id?: string | null };
  const { error } = await untypedSupabase.from("calibration_observations").upsert({
    id: operationId,
    owner_id: requireDeviceOwnerId(),
    course_id: p.course_id ?? null,
    topic_id: p.topic_id,
    attempt_id: p.attempt_id ?? null,
    predicted_confidence: p.predicted_confidence,
    actual_outcome: p.actual_outcome,
    delay_hours: p.delay_hours,
    observed_at: p.observed_at ?? new Date().toISOString(),
  }, { onConflict: "id" });
  if (error) throw error;
  return operationId;
}

async function doCreateFrictionEvent(payload: unknown, operationId: string) {
  const p = payload as FrictionEventV5;
  const { error } = await untypedSupabase.from("study_friction_events").upsert({
    id: operationId,
    owner_id: requireDeviceOwnerId(),
    event_date: p.date,
    plan_item_id: p.plan_item_id ?? null,
    course_id: p.course_id ?? null,
    reason: p.reason,
    note: p.note ?? null,
    self_started: p.self_started ?? null,
    reminder_used: p.reminder_used ?? null,
  }, { onConflict: "id" });
  if (error) throw error;
  return operationId;
}

async function doUpsertImplementationIntention(payload: unknown, operationId: string) {
  const p = payload as ImplementationIntentionV5;
  const id = p.id ?? operationId;
  const { error } = await untypedSupabase.from("implementation_intentions").upsert({
    id,
    owner_id: requireDeviceOwnerId(),
    trigger_type: p.trigger_type,
    trigger_value: p.trigger_value,
    action_type: p.action_type,
    action_value: p.action_value,
    enabled: p.enabled,
    suggested: p.suggested ?? false,
    reason: p.reason ?? null,
    updated_at: new Date().toISOString(),
  }, { onConflict: "id" });
  if (error) throw error;
  return id;
}

async function doUpsertLearningPolicyState(payload: unknown, operationId: string) {
  const p = payload as Omit<LearningPolicyState, "id" | "owner_id" | "updated_at"> & { id?: string };
  const { error } = await untypedSupabase.from("learning_policy_states").upsert({
    id: p.id ?? operationId,
    owner_id: requireDeviceOwnerId(),
    ...p,
    updated_at: new Date().toISOString(),
  }, { onConflict: "owner_id,topic_id" });
  if (error) throw error;
  return p.topic_id;
}

async function doCreatePretestAttempt(payload: unknown, operationId: string) {
  const p = payload as Omit<PretestAttemptV5, "id" | "owner_id" | "created_at">;
  const { error } = await untypedSupabase.from("pretest_attempts").upsert({
    id: operationId,
    owner_id: requireDeviceOwnerId(),
    course_id: p.course_id,
    topic_id: p.topic_id,
    question_bank_id: p.question_bank_id ?? null,
    prompt: p.prompt,
    response: p.response ?? null,
    predicted_confidence: p.predicted_confidence ?? null,
    outcome: p.outcome ?? "unknown",
  }, { onConflict: "id" });
  if (error) throw error;
  return operationId;
}

registerOp("createPretestAttempt", doCreatePretestAttempt);
registerOp("logSession", doLogSession);
registerOp("recordPracticeAttempt", doRecordPracticeAttempt);
registerOp("createMistake", doCreateMistake);
registerOp("updatePlanStatus", doUpdatePlanStatus);
registerOp("movePlanItem", doMovePlanItem);
registerOp("upsertPlanItem", doUpsertPlanItem);
registerOp("weeklyCheckin", doWeeklyCheckin);
registerOp("createCalibrationObservation", doCreateCalibrationObservation);
registerOp("createFrictionEvent", doCreateFrictionEvent);
registerOp("upsertImplementationIntention", doUpsertImplementationIntention);
registerOp("upsertLearningPolicyState", doUpsertLearningPolicyState);

function useInvalidateAll() {
  const qc = useQueryClient();
  return () =>
    ["courses", "topics", "sessions", "exams", "plan", "mistakes", "tests", "practice-attempts", "question-bank", "settings", "preferences", "weekly-checkins", "progress-events", "topic-dependencies", "study-materials", "learning-experiments", "learning-policy-states", "calibration-observations", "friction-events", "implementation-intentions", "exam-simulations", "pretest-attempts", "reminder-adaptation", "subject-task-parameters"].forEach(
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
    mutationFn: async (input: { courseId: string; drafts: PlanDraft[]; capacity?: CapacityProfile }) => {
      const [{ data: previous, error: readError }, { data: otherPlan, error: otherError }] = await Promise.all([
        supabase.from("plan_items").select("id").eq("course_id", input.courseId).eq("status", "planned"),
        supabase.from("plan_items").select("*").neq("course_id", input.courseId).eq("status", "planned"),
      ]);
      if (readError) throw readError;
      if (otherError) throw otherError;
      const balancedDrafts = balanceDraftsAgainstPlan(input.drafts, otherPlan ?? [], 120, input.capacity);
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
    mutationFn: async (input: {
      id: string;
      name?: string;
      materials?: string | null;
      importance?: number;
      weight?: number;
      school_covered?: boolean;
      position?: number;
      dependencies?: string[];
      progress?: number;
      self_level?: number;
      next_review?: string | null;
    }) => {
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
  dependency_suggestions?: Array<{
    source_name: string;
    target_name: string;
    relation_type: TopicDependency["relation_type"];
  }>;
};

export function useCreateCourse() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: async (input: NewCourse) => {
      const { topics, dependency_suggestions = [], ...course } = input;
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
        const { data: insertedTopics, error: tErr } = await supabase.from("topics").insert(rows).select("id,name");
        if (tErr) throw tErr;

        if (dependency_suggestions.length && insertedTopics?.length) {
          const byName = new Map(insertedTopics.map((topic) => [topic.name, topic]));
          const graphRows = dependency_suggestions.flatMap((suggestion) => {
            const source = byName.get(suggestion.source_name);
            const target = byName.get(suggestion.target_name);
            if (!source || !target || source.id === target.id) return [];
            return [{
              owner_id: requireDeviceOwnerId(),
              topic_id: source.id,
              depends_on_topic_id: target.id,
              relation_type: suggestion.relation_type,
            }];
          });
          if (graphRows.length) {
            const { error: graphError } = await untypedSupabase
              .from("topic_dependencies")
              .upsert(graphRows, { onConflict: "owner_id,topic_id,depends_on_topic_id,relation_type" });
            if (graphError) throw graphError;

            for (const source of insertedTopics) {
              const dependencies = graphRows
                .filter((row) =>
                  row.topic_id === source.id &&
                  ["prerequisite","depends_on","builds_on"].includes(row.relation_type)
                )
                .map((row) => row.depends_on_topic_id);
              if (dependencies.length) {
                const { error: dependencyError } = await untypedSupabase
                  .from("topics")
                  .update({ dependencies: [...new Set(dependencies)] })
                  .eq("id", source.id);
                if (dependencyError) throw dependencyError;
              }
            }
          }
        }
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


function isoWeekday(date: string) {
  return ((parseISO(date).getDay() + 6) % 7) + 1;
}

export function useApplyStudyWeekdays() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: async (input: {
      studyWeekdays: number[];
      capacity: CapacityProfile;
    }) => {
      const studyWeekdays = [...new Set(input.studyWeekdays)]
        .filter((day) => Number.isInteger(day) && day >= 1 && day <= 7)
        .sort((a, b) => a - b);
      if (!studyWeekdays.length) throw new Error("Valitse vähintään yksi opiskelupäivä.");

      const [{ data: currentPlan, error: planError }, { data: courses, error: courseError }] =
        await Promise.all([
          supabase.from("plan_items").select("*").eq("status", "planned").order("date"),
          supabase.from("courses").select("id,exam_date"),
        ]);
      if (planError) throw planError;
      if (courseError) throw courseError;

      const workingPlan = ((currentPlan ?? []) as PlanItem[]).map((item) => ({ ...item }));
      const examByCourse = new Map((courses ?? []).map((course) => [course.id, course.exam_date]));
      const now = today();
      const moves: Array<{ id: string; from: string; to: string; movedFrom: string | null }> = [];
      let unmoved = 0;

      for (const item of workingPlan
        .filter((candidate) =>
          candidate.kind !== "exam" &&
          candidate.status === "planned" &&
          candidate.date >= now &&
          !studyWeekdays.includes(isoWeekday(candidate.date)),
        )
        .sort((a, b) => a.date.localeCompare(b.date) || a.created_at.localeCompare(b.created_at))) {
        const examDate = examByCourse.get(item.course_id) ?? null;
        const latestDate = examDate ? addDays(examDate, -1) : null;
        const target = findNextStudyDate({
          plan: workingPlan,
          fromISO: item.date,
          studyWeekdays,
          minutes: item.target_minutes,
          ignoreItemId: item.id,
          latestDate,
          capacity: { ...input.capacity, studyWeekdays },
        });

        if (!target) {
          unmoved += 1;
          continue;
        }

        moves.push({ id: item.id, from: item.date, to: target, movedFrom: item.moved_from });
        item.date = target;
        item.moved_from = item.moved_from ?? moves[moves.length - 1]!.from;
      }

      const applied: Array<{ id: string; from: string; movedFrom: string | null }> = [];
      try {
        for (const move of moves) {
          const { error } = await supabase
            .from("plan_items")
            .update({ date: move.to, moved_from: move.from, status: "planned" })
            .eq("id", move.id);
          if (error) throw error;
          applied.push({ id: move.id, from: move.from, movedFrom: move.movedFrom });
        }

        const { error: preferenceError } = await untypedSupabase
          .from("user_preferences")
          .upsert({
            owner_id: requireDeviceOwnerId(),
            study_weekdays: studyWeekdays,
          }, { onConflict: "owner_id" });
        if (preferenceError) throw preferenceError;
      } catch (error) {
        for (const move of [...applied].reverse()) {
          await supabase
            .from("plan_items")
            .update({ date: move.from, moved_from: move.movedFrom })
            .eq("id", move.id);
        }
        throw error;
      }

      return { studyWeekdays, moved: moves.length, unmoved };
    },
    onSuccess: invalidate,
  });
}

export function useUpsertTopicDependency() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: async (input: {
      topic_id: string;
      depends_on_topic_id: string;
      relation_type: TopicDependency["relation_type"];
    }) => {
      const { error } = await untypedSupabase.from("topic_dependencies").upsert({
        owner_id: requireDeviceOwnerId(),
        ...input,
      }, { onConflict: "owner_id,topic_id,depends_on_topic_id,relation_type" });
      if (error) throw error;
    },
    onSuccess: invalidate,
  });
}

export function useDeleteTopicDependency() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await untypedSupabase.from("topic_dependencies").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });
}

export function useCreateStudyMaterial() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: async (input: Omit<StudyMaterial, "id" | "owner_id" | "created_at">) => {
      const { error } = await untypedSupabase.from("study_materials").insert({
        owner_id: requireDeviceOwnerId(),
        ...input,
      });
      if (error) throw error;
    },
    onSuccess: invalidate,
  });
}

export function useUpsertLearningExperiment() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: async (input: {
      experiment_key: LearningExperiment["experiment_key"];
      enabled: boolean;
      variant_a: string;
      variant_b: string;
      observations?: LearningExperiment["observations"];
    }) => {
      const { error } = await untypedSupabase.from("learning_experiments").upsert({
        owner_id: requireDeviceOwnerId(),
        ...input,
        observations: input.observations ?? [],
        updated_at: new Date().toISOString(),
      }, { onConflict: "owner_id,experiment_key" });
      if (error) throw error;
    },
    onSuccess: invalidate,
  });
}

export function useCreatePretestAttempt() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: (input: Omit<PretestAttemptV5, "id" | "owner_id" | "created_at">) =>
      runOrQueue("createPretestAttempt", input),
    onSuccess: invalidate,
  });
}

export function useUpsertReminderAdaptation() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: async (input: Omit<ReminderAdaptationV5, "owner_id" | "updated_at">) => {
      const { error } = await untypedSupabase.from("reminder_adaptation").upsert({
        owner_id: requireDeviceOwnerId(),
        ...input,
        updated_at: new Date().toISOString(),
      }, { onConflict: "owner_id" });
      if (error) throw error;
    },
    onSuccess: invalidate,
  });
}

export function useUpsertSubjectTaskParameters() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: async (rows: Array<Omit<SubjectTaskParameterV5, "id" | "owner_id" | "updated_at">>) => {
      if (!rows.length) return;
      const ownerId = requireDeviceOwnerId();
      const { error } = await untypedSupabase.from("subject_task_parameters").upsert(
        rows.map((row) => ({ owner_id: ownerId, ...row, updated_at: new Date().toISOString() })),
        { onConflict: "owner_id,subject,attempt_type" },
      );
      if (error) throw error;
    },
    onSuccess: invalidate,
  });
}

export function useCreateCalibrationObservation() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: (input: CalibrationObservationV5 & { course_id?: string | null; attempt_id?: string | null }) =>
      runOrQueue("createCalibrationObservation", input),
    onSuccess: invalidate,
  });
}

export function useCreateFrictionEvent() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: (input: FrictionEventV5) => runOrQueue("createFrictionEvent", input),
    onSuccess: invalidate,
  });
}

export function useUpsertImplementationIntention() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: (input: ImplementationIntentionV5) =>
      runOrQueue("upsertImplementationIntention", input),
    onSuccess: invalidate,
  });
}

export function useUpsertLearningPolicyState() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: (
      input: Omit<LearningPolicyState, "id" | "owner_id" | "updated_at"> & { id?: string },
    ) => runOrQueue("upsertLearningPolicyState", input),
    onSuccess: invalidate,
  });
}

export function useCreateExamSimulation() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: async (input: {
      course_id: string;
      mode: "practice" | "full";
      task_ids: string[];
      selected_task_ids?: string[];
      duration_minutes: number;
    }) => {
      const { data, error } = await untypedSupabase.from("exam_simulations").insert({
        owner_id: requireDeviceOwnerId(),
        course_id: input.course_id,
        mode: input.mode,
        task_ids: input.task_ids,
        selected_task_ids: input.selected_task_ids ?? [],
        duration_minutes: input.duration_minutes,
        started_at: new Date().toISOString(),
      }).select("id").single();
      if (error) throw error;
      return data?.id as string;
    },
    onSuccess: invalidate,
  });
}

export function useUpdateExamSimulation() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: async (input: {
      id: string;
      selected_task_ids?: string[];
      completed_task_ids?: string[];
      scores?: Record<string, number>;
      answers?: Record<string, unknown>;
      completed_at?: string | null;
      task_selection_note?: string | null;
    }) => {
      const { id, ...patch } = input;
      const { error } = await untypedSupabase.from("exam_simulations").update(patch).eq("id", id);
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
    mutationFn: (input: CreateMistakeInput) => runOrQueue("createMistake", input),
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

export function useUpdateMistakeRepair() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: async (input: {
      id: string;
      first_divergence?: string | null;
      correct_principle?: string | null;
      repair_response?: string | null;
      delayed_verification_due?: string | null;
      status?: "open" | "corrected" | "retested" | "mastered";
    }) => {
      const { id, ...patch } = input;
      const { error } = await untypedSupabase.from("mistakes").update({
        ...patch,
        updated_at: new Date().toISOString(),
      }).eq("id", id);
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
