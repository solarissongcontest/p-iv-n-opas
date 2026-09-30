import type { Course, QuestionBankItem, Topic } from "../domain.ts";
import type { ExamSimulationTaskV5, ExamSimulationV5 } from "./types.ts";

function answerMode(item: QuestionBankItem): ExamSimulationTaskV5["answerMode"] {
  const configured = String(item.metadata?.["answerMode"] ?? "");
  if (["text", "formula", "diagram", "graph", "mixed"].includes(configured)) {
    return configured as ExamSimulationTaskV5["answerMode"];
  }
  if (item.question_type === "calculation") return "formula";
  if (item.question_type === "application" && item.metadata?.["stimulusPackage"]) return "mixed";
  return "text";
}

function points(item: QuestionBankItem) {
  const raw = Number(item.metadata?.["points"] ?? 0);
  if (Number.isFinite(raw) && raw > 0) return Math.min(30, Math.max(2, Math.round(raw)));
  return item.difficulty >= 5 ? 20 : item.difficulty >= 4 ? 18 : item.difficulty >= 3 ? 16 : 12;
}

export function buildExamSimulationV5(input: {
  course: Course;
  topics: Topic[];
  questions: QuestionBankItem[];
  mode?: "practice" | "full";
}): ExamSimulationV5 {
  const mode = input.mode ?? "full";
  const topicIds = new Set(input.topics.map((topic) => topic.id));
  const candidates = input.questions
    .filter((item) => item.course_id === input.course.id)
    .filter((item) => item.topic_id === null || topicIds.has(item.topic_id))
    .sort((a, b) => b.difficulty - a.difficulty || a.created_at.localeCompare(b.created_at));
  const desiredTasks = mode === "full" ? 11 : Math.min(6, candidates.length);
  const tasks = candidates.slice(0, desiredTasks).map((item, index) => ({
    id: item.id,
    title: `Tehtävä ${index + 1}`,
    topicId: item.topic_id,
    points: points(item),
    answerMode: answerMode(item),
    stimulus: (item.metadata?.["stimulusPackage"] as Record<string, unknown> | undefined) ?? null,
  }));
  return {
    courseId: input.course.id,
    mode,
    maxTasks: tasks.length,
    maxSelected: mode === "full" ? Math.min(7, tasks.length) : tasks.length,
    maxPoints: 120,
    durationMinutes: mode === "full" ? 360 : 90,
    feedbackTiming: "after_block",
    hintsAllowed: false,
    masteryHidden: true,
    tasks,
  };
}

export function reviewTaskSelectionV5(input: {
  simulation: ExamSimulationV5;
  selectedTaskIds: string[];
  completedTaskIds: string[];
  scores: Record<string, number>;
}) {
  const selected = input.simulation.tasks.filter((task) => input.selectedTaskIds.includes(task.id));
  const completed = selected.filter((task) => input.completedTaskIds.includes(task.id));
  const earned = selected.reduce((sum, task) => sum + Number(input.scores[task.id] ?? 0), 0);
  const possible = selected.reduce((sum, task) => sum + task.points, 0);
  const unfinished = selected.filter((task) => !input.completedTaskIds.includes(task.id));
  return {
    selected: selected.length,
    completed: completed.length,
    earned,
    possible,
    unfinished: unfinished.map((task) => task.title),
    note: unfinished.length
      ? "Tehtävävalinnassa oli riskiä: valittuja tehtäviä jäi kesken. Seuraavassa simulaatiossa arvioi tehtävän vaatima aika ennen lopullista valintaa."
      : "Valitut tehtävät valmistuivat. Arvioi seuraavaksi, olivatko ne myös pistepotentiaaliltaan ja ajankäytöltään järkeviä.",
  };
}
