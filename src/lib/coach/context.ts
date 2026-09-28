import type {
  Course,
  Topic,
  Session,
  Exam,
  Mistake,
  PlanItem,
} from "../domain.ts";
import { addDays, diffDays, parseISO } from "../fi.ts";
import type { CoachContext, CoachRequest } from "./policy.ts";

export type StudySnapshot = {
  courses: Course[];
  topics: Topic[];
  sessions: Session[];
  exams: Exam[];
  mistakes: Mistake[];
  plan: PlanItem[];
};

export function buildCoachContext(
  data: StudySnapshot,
  input: Pick<CoachRequest, "courseId" | "topicId">,
  now: string,
  weekdays = [1, 2, 3, 4, 5],
): CoachContext | null {
  const course =
    data.courses.find(
      (candidate) => candidate.id === input.courseId && !candidate.archived,
    ) ??
    (!input.courseId
      ? data.courses
          .filter((candidate) => !candidate.archived)
          .sort((a, b) => (a.exam_date ?? "9999").localeCompare(b.exam_date ?? "9999"))[0]
      : undefined);

  if (!course) return null;

  const allTopics = data.topics.filter((topic) => topic.course_id === course.id);
  if (input.topicId && !allTopics.some((topic) => topic.id === input.topicId)) {
    return null;
  }

  const isDue = (topic: Topic) => Boolean(topic.next_review && topic.next_review <= now);
  const sortedTopics = [...allTopics].sort(
    (a, b) =>
      Number(b.id === input.topicId) -
        Number(a.id === input.topicId) ||
      Number(isDue(b)) -
        Number(isDue(a)) ||
      a.verified_level -
        b.verified_level ||
      b.importance -
        a.importance,
  );

  const recentSessions = data.sessions.filter(
    (session) =>
      session.course_id === course.id &&
      session.date >= addDays(now, -6) &&
      session.date <= now,
  );

  const examDates = [
    ...data.exams
      .filter((exam) => exam.course_id === course.id)
      .map((exam) => exam.date),
    ...(course.exam_date ? [course.exam_date] : []),
  ]
    .filter((date) => date >= now)
    .sort();

  const examDate = examDates[0];
  let suggestedDate = now;

  for (let offset = 0; offset < 14; offset += 1) {
    const date = addDays(now, offset);
    if (examDate && date > examDate) break;

    const load = data.plan
      .filter(
        (item) =>
          item.date === date &&
          !["completed", "skipped"].includes(item.status),
      )
      .reduce((sum, item) => sum + item.target_minutes, 0);

    if (weekdays.includes(parseISO(date).getDay()) && load <= 105) {
      suggestedDate = date;
      break;
    }
  }

  return {
    courseId: course.id,
    courseCode: course.code,
    today: now,
    suggestedDate,
    topics: sortedTopics.slice(0, 5).map((topic) => ({
      id: topic.id,
      name: topic.name,
      level: topic.verified_level,
      selfLevel: topic.self_level,
      due: isDue(topic),
      importance: topic.importance,
    })),
    ...(input.topicId ? { selectedTopicId: input.topicId } : {}),
    daysToExam: examDate ? diffDays(examDate, now) : null,
    activeMistakes: data.mistakes.filter(
      (mistake) =>
        mistake.course_id === course.id && mistake.status !== "mastered",
    ).length,
    recentSessions: recentSessions.length,
    recentMinutes: recentSessions.reduce(
      (sum, session) => sum + session.minutes,
      0,
    ),
    dueCount: allTopics.filter(isDue).length,
  };
}

/**
 * Deliberate remote allowlist.
 * No profile, IDs, names, notes, mistake text, answer keys or conversation history.
 */
export function providerContext(context: CoachContext) {
  const topic =
    context.topics.find((candidate) => candidate.id === context.selectedTopicId) ??
    context.topics[0];

  return {
    level: topic?.level ?? 0,
    due: topic?.due ?? false,
    daysToExam: context.daysToExam,
    activeMistakes: Math.min(context.activeMistakes, 10),
  };
}
