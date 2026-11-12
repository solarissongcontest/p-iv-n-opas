/**
 * LOS Teacher 2.0: deterministic learning engine. No AI services, network requests
 * or inferred mastery. A session is independent of legacy lessonProgress.
 */
export type TeacherOption = { id: string; label: string; wrongFeedback?: string };
export type TeacherQuestion = {
  prompt: string;
  type: "choice" | "text";
  options?: readonly TeacherOption[];
  correctOption?: string;
  accepted?: readonly string[];
  skillId: string;
  success: string;
  hint: string;
  reteach: string;
  genericWrong: string;
  wrongAnswers?: Readonly<Record<string, string>>;
};
export type TeacherBookLink = { label: string; chapterId: string; section: string; instruction: string };
export type TeacherBoardStep = { label: string; german: string; meaning: string };
export type TeacherScene = {
  id: string;
  phase: string;
  title: string;
  kind: "introduction" | "explanation" | "board" | "question" | "book" | "activity" | "summary";
  paragraphs: readonly string[];
  question?: TeacherQuestion;
  board?: readonly TeacherBoardStep[];
  bookLinks?: readonly TeacherBookLink[];
  activityId?: string;
  activityLabel?: string;
  help?: readonly { title: string; body: string }[];
};
export type TeacherLesson = {
  id: string;
  bookId: number;
  chapterId: string;
  version: string;
  title: string;
  objective: string;
  estimatedMinutes: number;
  scenes: readonly TeacherScene[];
  requiredQuestionIds: readonly string[];
  requiredActivityIds: readonly string[];
  requiredPracticeIds: readonly string[];
};
export type TeacherAttempt = {
  sceneId: string;
  answer: string;
  correct: boolean;
  independent: boolean;
  at: string;
};
export type TeacherSession = {
  schemaVersion: 1;
  lessonId: string;
  contentVersion: string;
  sceneId: string;
  visitedIds: string[];
  attempts: TeacherAttempt[];
  helpedIds: string[];
  revealedIds: string[];
  activityIds: string[];
  draftAnswers: Record<string, string>;
  completedAt: string | null;
  updatedAt: string;
};
const limitedId = (s: unknown): s is string => typeof s === "string" && /^[a-zA-Z0-9_.-]{1,70}$/.test(s);
const iso = (s: unknown): s is string => typeof s === "string" && s.length < 45 &&
  /^\d{4}-\d{2}-\d{2}T/.test(s) && Number.isFinite(Date.parse(s));
const record = (v: unknown): v is Record<string, unknown> =>
  Boolean(v && typeof v === "object" && !Array.isArray(v));
const idList = (v: unknown, cap: number): v is string[] =>
  Array.isArray(v) && v.length <= cap && v.every(limitedId) && new Set(v).size === v.length;

export function emptyTeacherSession(lesson: TeacherLesson, now: string): TeacherSession {
  return {
    schemaVersion: 1, lessonId: lesson.id, contentVersion: lesson.version,
    sceneId: lesson.scenes[0]?.id ?? "", visitedIds: [], attempts: [],
    helpedIds: [], revealedIds: [], activityIds: [], draftAnswers: {},
    completedAt: null, updatedAt: now,
  };
}
export function validTeacherSession(value: unknown): value is TeacherSession {
  if (!record(value) || value.schemaVersion !== 1 ||
      !limitedId(value.lessonId) || !limitedId(value.sceneId) ||
      typeof value.contentVersion !== "string" || value.contentVersion.length > 25 ||
      !idList(value.visitedIds, 80) || !idList(value.helpedIds, 80) ||
      !idList(value.revealedIds, 80) || !idList(value.activityIds, 80) ||
      !iso(value.updatedAt) || (value.completedAt !== null && !iso(value.completedAt)) ||
      !record(value.draftAnswers) || Object.keys(value.draftAnswers).length > 80 ||
      !Object.entries(value.draftAnswers).every(([k, v]) =>
        limitedId(k) && typeof v === "string" && v.length <= 500) ||
      !Array.isArray(value.attempts) || value.attempts.length > 120) return false;
  return value.attempts.every((attempt: unknown) =>
    record(attempt) && limitedId(attempt.sceneId) && typeof attempt.answer === "string" &&
    attempt.answer.length <= 500 && typeof attempt.correct === "boolean" &&
    typeof attempt.independent === "boolean" && iso(attempt.at));
}
export function parseTeacherSessions(value: unknown): Record<string, TeacherSession> {
  if (!record(value)) return {};
  return Object.fromEntries(Object.entries(value).filter(([key, entry]) =>
    /^L\d{3}$/.test(key) && validTeacherSession(entry) && entry.lessonId === key,
  ).slice(0, 60)) as Record<string, TeacherSession>;
}
export function normalizeTeacherAnswer(answer: string): string {
  // Do not silently turn umlauts or ß into different characters.
  return answer.normalize("NFC").trim().replace(/\s+/g, " ")
    .replace(/[.!?]+$/u, "").trim().toLocaleLowerCase("de");
}
export function evaluateTeacherAnswer(question: TeacherQuestion, answer: string): boolean {
  if (question.type === "choice") return question.correctOption === answer &&
    Boolean(question.options?.some(item => item.id === answer));
  return (question.accepted ?? []).some(item =>
    normalizeTeacherAnswer(item) === normalizeTeacherAnswer(answer));
}
export function moveTeacherScene(session: TeacherSession, lesson: TeacherLesson, targetId: string, now: string): TeacherSession {
  if (!lesson.scenes.some(s => s.id === targetId) || session.completedAt) return session;
  return {
    ...session, sceneId: targetId, updatedAt: now,
    visitedIds: session.visitedIds.includes(targetId) ? session.visitedIds :
      [...session.visitedIds, targetId],
  };
}
export function setTeacherAnswerDraft(session: TeacherSession, sceneId: string, answer: string, now: string): TeacherSession {
  if (session.completedAt || !limitedId(sceneId)) return session;
  return { ...session, updatedAt: now, draftAnswers: {
    ...session.draftAnswers, [sceneId]: answer.slice(0, 500),
  } };
}
export function markTeacherHelp(session: TeacherSession, sceneId: string, now: string): TeacherSession {
  if (session.completedAt || !limitedId(sceneId)) return session;
  return { ...session, updatedAt: now, helpedIds: session.helpedIds.includes(sceneId) ?
    session.helpedIds : [...session.helpedIds, sceneId] };
}
export function revealTeacherSolution(session: TeacherSession, sceneId: string, now: string): TeacherSession {
  if (session.completedAt || !limitedId(sceneId)) return session;
  return {
    ...markTeacherHelp(session, sceneId, now),
    revealedIds: session.revealedIds.includes(sceneId) ? session.revealedIds :
      [...session.revealedIds, sceneId],
  };
}
export function confirmTeacherActivity(session: TeacherSession, lesson: TeacherLesson, activityId: string, now: string): TeacherSession {
  if (session.completedAt || !lesson.requiredActivityIds.includes(activityId)) return session;
  return { ...session, updatedAt: now, activityIds: session.activityIds.includes(activityId) ?
    session.activityIds : [...session.activityIds, activityId] };
}
export function submitTeacherAnswer(session: TeacherSession, lesson: TeacherLesson, sceneId: string, answer: string, now: string): TeacherSession {
  const scene = lesson.scenes.find(s => s.id === sceneId);
  if (session.completedAt || !scene?.question || session.attempts.length >= 120) return session;
  const q = scene.question;
  const input = answer.trim();
  if (!input || input.length > 500 ||
      (q.type === "choice" && !q.options?.some(option => option.id === input))) return session;
  const attempt: TeacherAttempt = {
    sceneId, answer: input, correct: evaluateTeacherAnswer(q, input),
    independent: !session.helpedIds.includes(sceneId) &&
      !session.revealedIds.includes(sceneId) &&
      !session.attempts.some(item => item.sceneId === sceneId),
    at: now,
  };
  return { ...session, updatedAt: now, attempts: [...session.attempts, attempt] };
}
export function teacherLatestAttempt(session: TeacherSession, sceneId: string): TeacherAttempt | undefined {
  return [...session.attempts].reverse().find(item => item.sceneId === sceneId);
}
export function teacherWrongFeedback(scene: TeacherScene, answer: string): string {
  const q = scene.question;
  if (!q) return "";
  if (q.type === "choice") return q.options?.find(item => item.id === answer)?.wrongFeedback ??
    q.genericWrong;
  return q.wrongAnswers?.[normalizeTeacherAnswer(answer)] ?? q.genericWrong;
}
export function teacherCanFinish(session: TeacherSession, lesson: TeacherLesson,
  practiceAnswers: Readonly<Record<string, string>>): boolean {
  return lesson.scenes.every(scene => session.visitedIds.includes(scene.id)) &&
    lesson.requiredQuestionIds.every(id => session.attempts.some(item => item.sceneId === id)) &&
    lesson.requiredActivityIds.every(id => session.activityIds.includes(id)) &&
    lesson.requiredPracticeIds.every(id => Boolean(practiceAnswers[id]?.trim()));
}
export function finishTeacherSession(session: TeacherSession, lesson: TeacherLesson,
  practiceAnswers: Readonly<Record<string, string>>, now: string): TeacherSession {
  return session.completedAt || !teacherCanFinish(session, lesson, practiceAnswers) ? session :
    { ...session, updatedAt: now, completedAt: now };
}
export function independentTeacherEvidence(session: TeacherSession): number {
  return new Set(session.attempts.filter(item => item.correct && item.independent)
    .map(item => item.sceneId)).size;
}
