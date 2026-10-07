import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { requireDeviceOwnerId } from "./deviceSession";
import type { CourseExercise, CourseExerciseResult } from "./maa06a";
import {
  manualMaa06aExerciseDefaults,
  type ManualMaa06aSource,
} from "./maa06a-manual";

const untypedSupabase = supabase as any;

export type RecordManualMaa06aInput = {
  courseId: string;
  source: ManualMaa06aSource;
  codes: string[];
  result: CourseExerciseResult;
};

async function ensureExercise(courseId: string, source: ManualMaa06aSource, code: string) {
  const { data: existing, error: readError } = await untypedSupabase
    .from("course_exercises")
    .select("*")
    .eq("course_id", courseId)
    .eq("source", source)
    .eq("code", code)
    .maybeSingle();
  if (readError) throw readError;
  if (existing) return existing as CourseExercise;

  const defaults = manualMaa06aExerciseDefaults(code, source);
  const { data, error } = await untypedSupabase
    .from("course_exercises")
    .insert({
      owner_id: requireDeviceOwnerId(),
      course_id: courseId,
      topic_id: null,
      code,
      source,
      source_group: defaults.sourceGroup,
      section_code: null,
      chapter: defaults.chapter,
      level: null,
      teacher_recommended: false,
      counts_toward_goal: true,
      estimated_load: 1.3,
      sort_order: defaults.sortOrder,
      metadata: { manualEntry: true },
    })
    .select("*")
    .single();
  if (error) throw error;
  return data as CourseExercise;
}

export function useRecordManualMaa06aExercises() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: RecordManualMaa06aInput) => {
      const attemptedAt = new Date().toISOString();
      const rows: CourseExercise[] = [];

      for (const code of input.codes) {
        const exercise = await ensureExercise(input.courseId, input.source, code);
        rows.push(exercise);
        const { error } = await untypedSupabase.from("course_exercise_attempts").insert({
          id: crypto.randomUUID(),
          owner_id: requireDeviceOwnerId(),
          course_id: input.courseId,
          exercise_id: exercise.id,
          result: input.result,
          note: "Kirjattu MAA06A-pikakirjauksella",
          attempted_at: attemptedAt,
        });
        if (error) throw error;
      }

      return rows;
    },
    onSuccess: (_rows, input) => {
      void queryClient.invalidateQueries({ queryKey: ["course-exercises", input.courseId] });
      void queryClient.invalidateQueries({ queryKey: ["course-exercise-attempts", input.courseId] });
      void queryClient.invalidateQueries({ queryKey: ["course-exercise-goal", input.courseId] });
      void queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
  });
}
