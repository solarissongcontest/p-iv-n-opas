import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Exam, Topic } from "./domain";

export type ExamTopicScope = {
  id: string;
  owner_id: string;
  exam_id: string;
  topic_id: string;
  status: "included" | "excluded";
  confidence: "confirmed" | "provisional";
  source: string;
  created_at: string;
  updated_at: string;
};

const untypedSupabase = supabase as any;

async function listExamTopicScopes(examId: string): Promise<ExamTopicScope[]> {
  const { data, error } = await untypedSupabase
    .from("exam_topic_scopes")
    .select("*")
    .eq("exam_id", examId)
    .order("created_at");

  if (error) {
    const rollingDeployMissing =
      error.code === "PGRST205" ||
      error.code === "42P01" ||
      /exam_topic_scopes|schema cache|relation/i.test(error.message ?? "");
    if (rollingDeployMissing) return [];
    throw error;
  }
  return (data ?? []) as ExamTopicScope[];
}

export function useExamTopicScopes(examId: string | null | undefined) {
  return useQuery({
    queryKey: ["exam-topic-scopes", examId ?? "none"],
    queryFn: () => listExamTopicScopes(examId!),
    enabled: Boolean(examId),
  });
}

export function nextExamForCourse(exams: Exam[], courseId: string, now: string): Exam | null {
  return [...exams]
    .filter((exam) => exam.course_id === courseId && exam.date >= now)
    .sort((a, b) => a.date.localeCompare(b.date))[0] ?? null;
}

export function topicsForExam(topics: Topic[], scopes: ExamTopicScope[]): Topic[] {
  if (!scopes.length) return topics;
  const excluded = new Set(scopes.filter((scope) => scope.status === "excluded").map((scope) => scope.topic_id));
  const included = new Set(scopes.filter((scope) => scope.status === "included").map((scope) => scope.topic_id));
  if (!included.size) return topics.filter((topic) => !excluded.has(topic.id));
  return topics.filter((topic) => included.has(topic.id) && !excluded.has(topic.id));
}

export function examScopeLabel(scopes: ExamTopicScope[]) {
  if (!scopes.length) return "Koealuetta ei ole rajattu";
  return scopes.some((scope) => scope.confidence === "provisional")
    ? "Arvioitu koealue"
    : "Vahvistettu koealue";
}
