import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { requireDeviceOwnerId } from "./deviceSession";
import { registerOp, runOrQueue } from "./offline";
import { withOfflineSnapshot } from "./offlineSnapshot";
import {
  MAA06A_EXERCISE_SEED,
  MAA06A_RESOURCE_URL,
  MAA06A_TOPICS,
} from "@/data/maa06a-exercises";
import type {
  CourseExercise,
  CourseExerciseAttempt,
  CourseExerciseGoal,
  CourseExerciseResult,
} from "./maa06a";

const untypedSupabase = supabase as any;

function exerciseSchemaMissing(error: any) {
  return Boolean(
    error && (
      error.code === "PGRST205" ||
      error.code === "42P01" ||
      /course_exercises|course_exercise_attempts|course_exercise_goals|schema cache|relation/i.test(
        error.message ?? "",
      )
    )
  );
}

async function listCourseExercises(courseId: string): Promise<CourseExercise[]> {
  const { data, error } = await untypedSupabase
    .from("course_exercises")
    .select("*")
    .eq("course_id", courseId)
    .order("sort_order");
  if (error) {
    if (exerciseSchemaMissing(error)) return [];
    throw error;
  }
  return (data ?? []) as CourseExercise[];
}

async function listCourseExerciseAttempts(courseId: string): Promise<CourseExerciseAttempt[]> {
  const { data, error } = await untypedSupabase
    .from("course_exercise_attempts")
    .select("*")
    .eq("course_id", courseId)
    .order("attempted_at");
  if (error) {
    if (exerciseSchemaMissing(error)) return [];
    throw error;
  }
  return (data ?? []) as CourseExerciseAttempt[];
}

async function getCourseExerciseGoal(courseId: string): Promise<CourseExerciseGoal | null> {
  const { data, error } = await untypedSupabase
    .from("course_exercise_goals")
    .select("*")
    .eq("course_id", courseId)
    .maybeSingle();
  if (error) {
    if (exerciseSchemaMissing(error)) return null;
    throw error;
  }
  return (data ?? null) as CourseExerciseGoal | null;
}

export const useCourseExercises = (courseId: string | null | undefined) =>
  useQuery({
    queryKey: ["course-exercises", courseId],
    enabled: Boolean(courseId),
    queryFn: courseId
      ? () => withOfflineSnapshot(`course-exercises:${courseId}`, () => listCourseExercises(courseId))
      : async () => [] as CourseExercise[],
  });

export const useCourseExerciseAttempts = (courseId: string | null | undefined) =>
  useQuery({
    queryKey: ["course-exercise-attempts", courseId],
    enabled: Boolean(courseId),
    queryFn: courseId
      ? () => withOfflineSnapshot(
          `course-exercise-attempts:${courseId}`,
          () => listCourseExerciseAttempts(courseId),
        )
      : async () => [] as CourseExerciseAttempt[],
  });

export const useCourseExerciseGoal = (courseId: string | null | undefined) =>
  useQuery({
    queryKey: ["course-exercise-goal", courseId],
    enabled: Boolean(courseId),
    queryFn: courseId
      ? () => withOfflineSnapshot(
          `course-exercise-goal:${courseId}`,
          () => getCourseExerciseGoal(courseId),
        )
      : async () => null,
  });

export type RecordCourseExerciseAttemptInput = {
  course_id: string;
  exercise_id: string;
  result: CourseExerciseResult;
  note?: string | null;
  attempted_at?: string;
};

async function doRecordCourseExerciseAttempt(payload: unknown, operationId: string) {
  const input = payload as RecordCourseExerciseAttemptInput;
  const { error } = await untypedSupabase.from("course_exercise_attempts").upsert({
    id: operationId,
    owner_id: requireDeviceOwnerId(),
    course_id: input.course_id,
    exercise_id: input.exercise_id,
    result: input.result,
    note: input.note ?? null,
    attempted_at: input.attempted_at ?? new Date().toISOString(),
  }, { onConflict: "id" });
  if (error) throw error;
  return operationId;
}

registerOp("recordCourseExerciseAttempt", doRecordCourseExerciseAttempt);

export function useRecordCourseExerciseAttempt() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: RecordCourseExerciseAttemptInput) =>
      runOrQueue<string>("recordCourseExerciseAttempt", input),
    onSuccess: (result, input) => {
      if (result === "queued") {
        // Reflect an offline mark immediately. The durable write-ahead queue
        // will replace this local echo with the server row after sync.
        queryClient.setQueryData<CourseExerciseAttempt[]>(
          ["course-exercise-attempts", input.course_id],
          (current = []) => [
            ...current,
            {
              id: `local-${Date.now()}-${input.exercise_id}`,
              owner_id: requireDeviceOwnerId(),
              course_id: input.course_id,
              exercise_id: input.exercise_id,
              result: input.result,
              note: input.note ?? null,
              attempted_at: input.attempted_at ?? new Date().toISOString(),
            },
          ],
        );
        return;
      }
      void queryClient.invalidateQueries({ queryKey: ["course-exercise-attempts", input.course_id] });
      void queryClient.invalidateQueries({ queryKey: ["course-exercise-goal", input.course_id] });
    },
  });
}

async function upsertMaa06aGoal(courseId: string, ownerId: string) {
  const { error } = await untypedSupabase.from("course_exercise_goals").upsert({
    owner_id: ownerId,
    course_id: courseId,
    target_count: 130,
    deadline: "2026-11-26",
    buffer_days: 2,
    bonus_points: 8,
    bonus_label: "130 tehtävää → +8 p kokeeseen",
    resource_url: MAA06A_RESOURCE_URL,
  }, { onConflict: "owner_id,course_id" });
  if (error) throw error;
}

async function seedMaa06aExercises(
  courseId: string,
  ownerId: string,
  topics: Array<{ id: string; name: string }>,
) {
  const topicByName = new Map(topics.map((topic) => [topic.name, topic.id]));
  const rows = MAA06A_EXERCISE_SEED.map((exercise) => ({
    owner_id: ownerId,
    course_id: courseId,
    topic_id: exercise.topicName ? topicByName.get(exercise.topicName) ?? null : null,
    code: exercise.code,
    source: exercise.source,
    source_group: exercise.sourceGroup,
    section_code: exercise.section,
    chapter: exercise.chapter,
    level: exercise.level,
    teacher_recommended: exercise.teacherRecommended,
    counts_toward_goal: exercise.countsTowardGoal,
    estimated_load: exercise.estimatedLoad,
    sort_order: exercise.sortOrder,
    metadata: exercise.topicName ? { topicName: exercise.topicName } : {},
  }));

  for (let index = 0; index < rows.length; index += 100) {
    const { error } = await untypedSupabase
      .from("course_exercises")
      .upsert(rows.slice(index, index + 100), {
        onConflict: "owner_id,course_id,source,code",
      });
    if (error) throw error;
  }
}

/**
 * Creates/repairs the canonical MAA06A course for the signed-in Arthur owner.
 * The operation is idempotent and safe after a Supabase reset: course, topics,
 * exam, 130-task goal and the teacher's exact exercise table are restored.
 */
export async function ensureMaa06aForCurrentUser(): Promise<string> {
  const ownerId = requireDeviceOwnerId();
  const { data: existing, error: existingError } = await supabase
    .from("courses")
    .select("*")
    .eq("code", "MAA06A")
    .maybeSingle();
  if (existingError) throw existingError;

  let course = existing;
  if (!course) {
    const { data: created, error } = await supabase
      .from("courses")
      .insert({
        code: "MAA06A",
        name: "Derivaatta · alkuosa",
        subject: "Matematiikka",
        start_date: "2026-10-06",
        exam_date: "2026-11-27",
        study_mode: "course",
        target_system: "custom",
        target_value: "130 tehtävää · +8 p",
        color: "sage",
        weekly_minutes: 180,
      })
      .select()
      .single();
    if (error) throw error;
    course = created;
  } else {
    const { data: updated, error } = await supabase
      .from("courses")
      .update({
        name: "Derivaatta · alkuosa",
        subject: "Matematiikka",
        start_date: "2026-10-06",
        exam_date: "2026-11-27",
        target_system: "custom",
        target_value: "130 tehtävää · +8 p",
      })
      .eq("id", course.id)
      .select()
      .single();
    if (error) throw error;
    course = updated;
  }

  const { data: existingTopics, error: topicReadError } = await supabase
    .from("topics")
    .select("*")
    .eq("course_id", course.id)
    .order("position");
  if (topicReadError) throw topicReadError;

  const existingNames = new Set((existingTopics ?? []).map((topic) => topic.name));
  const totalExercises = MAA06A_TOPICS.reduce((sum, topic) => sum + topic.exerciseCount, 0);
  const missingTopics = MAA06A_TOPICS
    .filter((topic) => !existingNames.has(topic.name))
    .map((topic) => ({
      course_id: course.id,
      name: topic.name,
      position: topic.position,
      weight: Number(((topic.exerciseCount / totalExercises) * 100).toFixed(3)),
      importance: 4,
      materials: `${topic.section} · kappale ${topic.chapter}`,
    }));
  if (missingTopics.length) {
    const { error } = await supabase.from("topics").insert(missingTopics);
    if (error) throw error;
  }

  const { data: topics, error: topicsError } = await supabase
    .from("topics")
    .select("id,name")
    .eq("course_id", course.id)
    .order("position");
  if (topicsError) throw topicsError;

  const { data: exams, error: examsReadError } = await supabase
    .from("exams")
    .select("id")
    .eq("course_id", course.id)
    .eq("name", "MAA06A kurssikoe")
    .limit(1);
  if (examsReadError) throw examsReadError;
  if (!exams?.length) {
    const { error } = await supabase.from("exams").insert({
      course_id: course.id,
      name: "MAA06A kurssikoe",
      date: "2026-11-27",
      target_system: "custom",
      target_value: "130 tehtävää · +8 p",
    });
    if (error) throw error;
  }

  try {
    await upsertMaa06aGoal(course.id, ownerId);
    await seedMaa06aExercises(course.id, ownerId, topics ?? []);
  } catch (error) {
    // Rolling deployment safety: the course itself remains usable while the
    // new exercise tables are still being migrated. The next app load repairs
    // the task bank automatically after the migration lands.
    if (!exerciseSchemaMissing(error)) throw error;
  }

  return course.id;
}
