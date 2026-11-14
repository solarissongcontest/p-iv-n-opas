import { LOS1_MIDTERM_QUESTIONS, losExamReadyToSubmit } from "../content/los1Exams.ts";

/**
 * LOS Teacher 2.0: deterministic learning engine. No AI services, network requests
 * or inferred mastery. A session is independent of legacy lessonProgress.
 */
export type TeacherOption = { id: string; label: string; wrongFeedback?: string; lang?: "fi" | "de" };
export type TeacherQuestion = {
  prompt: string;
  type: "choice" | "text";
  options?: readonly TeacherOption[];
  correctOption?: string;
  accepted?: readonly string[];
  skillId: string;
  /** Explicit human-authored evidence role; activation and guided practice do not qualify. */
  evidenceRole?: "practice" | "independent" | "application" | "exit";
  success: string;
  hint: string;
  reteach: string;
  genericWrong: string;
  wrongAnswers?: Readonly<Record<string, string>>;
};
/**
 * Render a digits-only answer with a numeric keyboard, not German character keys.
 * The correct-answer model is more reliable than a Finnish prompt prefix:
 * "Kirjoita numeroin", "Kirjoita numeroina" and "Kirjoita numerosarja" must
 * all behave consistently. Do not use <input type="number">: leading zeroes
 * and codes are meaningful and must be preserved as strings.
 */
export function teacherRequiresNumericResponse(question: TeacherQuestion): boolean {
  return question.type === "text" && Boolean(question.accepted?.length) &&
    question.accepted!.every(value => /^\d+$/.test(value.trim()));
}
export type TeacherBookLink = { label: string; chapterId: string; section: string; instruction: string };
export type TeacherBoardStep = { label: string; german: string; meaning: string };
export type TeacherReflection = { prompt: string; placeholder: string; minLength: number };
/** Reusable written form, not a claim that fields were dictated by approved audio. */
export type TeacherFormField = { id: string; label: string; placeholder: string; sampleAnswer: string };
export type TeacherScene = {
  id: string;
  phase: string;
  title: string;
  kind: "introduction" | "explanation" | "board" | "question" | "book" | "activity" | "reflection" | "form" | "summary" | "calendar" | "source";
  paragraphs: readonly string[];
  question?: TeacherQuestion;
  reflection?: TeacherReflection;
  /** Form drafts live in teacherSessions with keys sceneId.fieldId. */
  form?: readonly TeacherFormField[];
  board?: readonly TeacherBoardStep[];
  /** Interactive board uses existing TeacherSession drafts. */
  numberBuilder?: boolean;
  bookLinks?: readonly TeacherBookLink[];
  /** Fixed, checked timetable data. Reading Text B does not prove audio playback. */
  calendar?: { prompt: string; day: string; time: string; sourceNote: string };
  /** Reuse unabridged published texts; never duplicate a faux-authentic passage. */
  sourceChapterId?: string;
  textBChapterId?: string;
  chapterPhoto?: boolean;
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
  /** Book comprehension checks must be both answered and explicitly checked. */
  requiredCheckedIds?: readonly string[];
  /** An original transcript cannot substitute for verified audio. */
  mediaGate?: {sourceId:string;approved:boolean;reason:string};
  /** Read-only adapter for existing Review II, EX-FINAL or summary drafts. */
  externalCheck?: "review-ii" | "final" | "summary";
  /** Chapter-test evidence stays in the existing chapter draft. */
  chapterAssessment?: {
    requiredTestIds: readonly string[];
    requireApplicationDraft: boolean;
    minSelfAssessmentLength: number;
  };
  examAssessment?: { id: "EX-MID" };
};
export type TeacherChapterAssessmentInput = {
  testAnswers: Readonly<Record<string, string>>;
  testSubmittedAt: string | null;
  applicationDraft: string;
  selfAssessment: string;
};
export function teacherChapterAssessmentStatus(
  lesson: TeacherLesson, input?: TeacherChapterAssessmentInput,
): { answered: number; expected: number; submitted: boolean; applicationDone: boolean; reflectionDone: boolean; ready: boolean } {
  const requirement = lesson.chapterAssessment;
  if (!requirement) return {answered:0,expected:0,submitted:false,applicationDone:false,reflectionDone:false,ready:true};
  const answered = requirement.requiredTestIds.filter(id => Boolean(input?.testAnswers[id]?.trim())).length;
  const expected = requirement.requiredTestIds.length;
  const submitted = Boolean(input?.testSubmittedAt && iso(input.testSubmittedAt));
  const applicationDone = !requirement.requireApplicationDraft || Boolean(input?.applicationDraft.trim());
  const reflectionDone = (input?.selfAssessment.trim().length ?? 0) >= requirement.minSelfAssessmentLength;
  return {answered,expected,submitted,applicationDone,reflectionDone,
    ready:submitted && answered===expected && applicationDone && reflectionDone};
}
/** The exam is scored and submitted only on its existing book page and draft 91. */
export function teacherMidtermAssessmentStatus(
  lesson: TeacherLesson,
  input?: TeacherChapterAssessmentInput,
  practiceAnswers: Readonly<Record<string,string>> = {},
): { answered: number; expected: number; submitted: boolean; selfReviewed: boolean; ready: boolean } {
  if (lesson.examAssessment?.id !== "EX-MID") return {
    answered:0,expected:0,submitted:false,selfReviewed:false,ready:true,
  };
  const answered = LOS1_MIDTERM_QUESTIONS.filter(q => q.choices.some(option =>
    option.id === input?.testAnswers[q.id])).length;
  const submitted = Boolean(input?.testSubmittedAt && iso(input.testSubmittedAt));
  const selfReviewed = Boolean(input?.selfAssessment.trim()) &&
    ["well","some","again"].includes(practiceAnswers["EX-MID-DIALOGUE-SELF"] ?? "");
  return {answered,expected:LOS1_MIDTERM_QUESTIONS.length,submitted,selfReviewed,
    ready: submitted && selfReviewed && losExamReadyToSubmit(LOS1_MIDTERM_QUESTIONS,input?.testAnswers ?? {})};
}
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
  /** Optional, preserving valid schema-v1 sessions. */
  paused?: boolean;
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
    completedAt: null, updatedAt: now, paused: false,
  };
}
export function validTeacherSession(value: unknown): value is TeacherSession {
  if (!record(value) || value["schemaVersion"] !== 1 ||
      !limitedId(value["lessonId"]) || !limitedId(value["sceneId"]) ||
      typeof value["contentVersion"] !== "string" || value["contentVersion"].length > 25 ||
      !idList(value["visitedIds"], 80) || !idList(value["helpedIds"], 80) ||
      !idList(value["revealedIds"], 80) || !idList(value["activityIds"], 80) ||
      !iso(value["updatedAt"]) || (value["completedAt"] !== null && !iso(value["completedAt"])) ||
      (value["paused"] !== undefined && typeof value["paused"] !== "boolean") ||
      !record(value["draftAnswers"]) || Object.keys(value["draftAnswers"]).length > 80 ||
      !Object.entries(value["draftAnswers"]).every(([k, v]) =>
        limitedId(k) && typeof v === "string" && v.length <= 500) ||
      !Array.isArray(value["attempts"]) || value["attempts"].length > 120) return false;
  return value["attempts"].every((attempt: unknown) =>
    record(attempt) && limitedId(attempt["sceneId"]) && typeof attempt["answer"] === "string" &&
    attempt["answer"].length <= 500 && typeof attempt["correct"] === "boolean" &&
    typeof attempt["independent"] === "boolean" && iso(attempt["at"]));
}
/** Strict cloud/backup validation; unlike local parsing, reject any invalid entry. */
export function validTeacherSessionMap(value: unknown): value is Record<string, TeacherSession> {
  if (!record(value)) return false;
  const entries = Object.entries(value);
  return entries.length <= 60 && entries.every(([key, entry]) =>
    /^L\d{3}$/.test(key) && validTeacherSession(entry) && entry.lessonId === key);
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
/**
 * Recover navigation after a manuscript changes scene IDs. A saved session may
 * still refer to an earlier scene that no longer exists. Prefer the next
 * unvisited current scene, then the most recently visited surviving scene.
 *
 * This is navigation recovery, NOT content migration: keep every historical
 * draft, answer, attempt, activity, completion timestamp and contentVersion.
 * Do not manufacture visits or independent skill evidence.
 */
export function recoverTeacherSession(session: TeacherSession, lesson: TeacherLesson): TeacherSession {
  if(session.lessonId!==lesson.id || lesson.scenes.some(scene=>scene.id===session.sceneId))
    return session;
  const known=new Set(lesson.scenes.map(scene=>scene.id));
  const next=lesson.scenes.find(scene=>!session.visitedIds.includes(scene.id))?.id ??
    [...session.visitedIds].reverse().find(id=>known.has(id)) ??
    lesson.scenes[0]?.id;
  return next ? {...session,sceneId:next} : session;
}

export function moveTeacherScene(session: TeacherSession, lesson: TeacherLesson, targetId: string, now: string): TeacherSession {
  // A paused session is read-only. Completed sessions remain navigable for revision.
  if (session.paused || !lesson.scenes.some(s => s.id === targetId)) return session;
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
/** Count distinct compound 21–99 numbers: whole tens and 100 do not practice units-first order. */
export function teacherBuiltNumberCount(session: TeacherSession, sceneId: string): number {
  const history = session.draftAnswers[sceneId + "-history"] ?? "";
  return new Set(history.split(",").filter(value =>
    /^[2-9][0-9]$/.test(value) && Number(value) % 10 !== 0)).size;
}
export function confirmTeacherActivity(session: TeacherSession, lesson: TeacherLesson, activityId: string, now: string): TeacherSession {
  if (session.completedAt || !lesson.requiredActivityIds.includes(activityId)) return session;
  const numberScene = lesson.scenes.find(scene => scene.activityId === activityId && scene.numberBuilder);
  if (numberScene && teacherBuiltNumberCount(session, numberScene.id) < 4) return session;
  return { ...session, updatedAt: now, activityIds: session.activityIds.includes(activityId) ?
    session.activityIds : [...session.activityIds, activityId] };
}
export function toggleTeacherPause(session: TeacherSession, now: string): TeacherSession {
  return session.completedAt ? session : { ...session, paused: !session.paused, updatedAt: now };
}
export function submitTeacherAnswer(session: TeacherSession, lesson: TeacherLesson, sceneId: string, answer: string, now: string): TeacherSession {
  const scene = lesson.scenes.find(s => s.id === sceneId);
  if (session.completedAt || session.paused || !scene?.question || session.attempts.length >= 120 ||
      session.attempts.filter(item => item.sceneId === sceneId).length >= 3 ||
      session.attempts.some(item => item.sceneId === sceneId && item.correct) ||
      session.revealedIds.includes(sceneId)) return session;
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
  const specific = q.type === "choice"
    ? q.options?.find(item => item.id === answer)?.wrongFeedback
    : q.wrongAnswers?.[normalizeTeacherAnswer(answer)];
  return specific?.trim() ? specific : q.genericWrong;
}
/** Calendar evidence requires a correct, explicitly saved choice. It is never audio evidence. */
export function isCorrectCalendarEntry(scene: TeacherScene, value: string): boolean {
  return Boolean(scene.calendar && value === scene.calendar.day + "|" + scene.calendar.time);
}
/**
 * Explain exactly why a lesson is not ready. The same checks power both the
 * completion button and its learner-facing checklist, so they cannot drift.
 * Completing a lesson is activity evidence, never a claim of language mastery.
 */
export function teacherCompletionBlockers(session: TeacherSession, lesson: TeacherLesson,
  practiceAnswers: Readonly<Record<string, string>>, practiceChecked: readonly string[] = [],
  chapterAssessment?: TeacherChapterAssessmentInput, externalReady: boolean = !lesson.externalCheck): string[] {
  const missing: string[] = [];
  if (!externalReady) missing.push("Kirjan erillinen kertaus- tai arviointiosio on vielä kesken.");
  if (lesson.mediaGate && !lesson.mediaGate.approved)
    missing.push("Kuuntelumedian hyväksyntä odottaa: " + lesson.mediaGate.sourceId + ". Puuttuvaa äänitettä ei voi korvata tekstin lukemisella.");
  const chapter = teacherChapterAssessmentStatus(lesson, chapterAssessment);
  if (!chapter.ready) missing.push(
    "Kappaletesti: " + chapter.answered + "/" + chapter.expected + " vastausta, " +
    (chapter.submitted ? "palautettu" : "ei vielä palautettu") + ". " +
    (chapter.applicationDone ? "" : "Sovellusteksti puuttuu. ") +
    (chapter.reflectionDone ? "" : "Itsearviointi puuttuu.")
  );
  const midterm = teacherMidtermAssessmentStatus(lesson, chapterAssessment, practiceAnswers);
  if (!midterm.ready) missing.push(
    "Välikoe: " + midterm.answered + "/" + midterm.expected + " vastausta, " +
    (midterm.submitted ? "palautettu" : "ei vielä palautettu") + ". " +
    (midterm.selfReviewed ? "" : "Oma arviointi puuttuu.")
  );
  if (session.paused) missing.push("Oppitunti on keskeytetty. Jatka opetusta ennen loppumerkintää.");
  const unvisited = lesson.scenes.filter(scene => !session.visitedIds.includes(scene.id));
  if (unvisited.length) missing.push(
    "Käy läpi " + unvisited.length + " opetustilannetta: " +
    unvisited.slice(0, 3).map(scene => scene.title).join(", ") +
    (unvisited.length > 3 ? " ja muita." : ".")
  );
  for (const scene of lesson.scenes) {
    if (scene.numberBuilder) {
      const count = teacherBuiltNumberCount(session, scene.id);
      if (count < 4) missing.push("Rakenna numerotaululla neljä erilaista lukua (" + count + "/4): " + scene.title + ".");
    }
    if (scene.calendar && !isCorrectCalendarEntry(scene, session.draftAnswers[scene.id] ?? ""))
      missing.push("Tallenna oikea kalenterimerkintä: " + scene.title + ".");
    if (scene.reflection) {
      const length = session.draftAnswers[scene.id]?.trim().length ?? 0;
      if (length < scene.reflection.minLength)
        missing.push("Täydennä kirjoitustehtävä " + scene.title +
          " (" + length + "/" + scene.reflection.minLength + " merkkiä).");
    }
    if (scene.form) {
      const missingFields = scene.form.filter(field =>
        !session.draftAnswers[scene.id + "." + field.id]?.trim());
      if (missingFields.length) missing.push(
        "Täytä lomake " + scene.title + ": " + missingFields.map(field => field.label).join(", ") + "."
      );
    }
  }
  const noAttempts = lesson.requiredQuestionIds.filter(id =>
    !session.attempts.some(attempt => attempt.sceneId === id));
  if (noAttempts.length) missing.push(
    "Vastaa oppitunnin kysymyksiin: " + noAttempts.map(id =>
      lesson.scenes.find(scene => scene.id === id)?.title ?? id).join(", ") + "."
  );
  const missingActivities = lesson.requiredActivityIds.filter(id => !session.activityIds.includes(id));
  if (missingActivities.length) missing.push(
    "Vahvista omat harjoittelut: " + missingActivities.map(id =>
      lesson.scenes.find(scene => scene.activityId === id)?.activityLabel ?? id).join(", ") + "."
  );
  const missingPractice = lesson.requiredPracticeIds.filter(id => !practiceAnswers[id]?.trim());
  if (missingPractice.length) missing.push("Tee kirjan harjoitukset: " + missingPractice.join(", ") + ".");
  const missingChecked = (lesson.requiredCheckedIds ?? []).filter(id =>
    !practiceAnswers[id]?.trim() || !practiceChecked.includes(id));
  if (missingChecked.length) missing.push("Vastaa ja tarkista kirjan lähdetehtävät: " + missingChecked.join(", ") + ".");
  return missing;
}
/** Find a navigable next step without changing answers, visits or mastery. */
export function teacherNextIncompleteSceneId(
  session: TeacherSession, lesson: TeacherLesson,
  practiceAnswers: Readonly<Record<string,string>> = {},
  practiceChecked: readonly string[] = [],
): string | undefined {
  for(const scene of lesson.scenes){
    if(!session.visitedIds.includes(scene.id)) return scene.id;
    if(lesson.requiredQuestionIds.includes(scene.id) &&
      !session.attempts.some(attempt => attempt.sceneId === scene.id)) return scene.id;
    if(scene.activityId && lesson.requiredActivityIds.includes(scene.activityId) &&
      !session.activityIds.includes(scene.activityId)) return scene.id;
    if(scene.numberBuilder && teacherBuiltNumberCount(session,scene.id)<4) return scene.id;
    if(scene.calendar && !isCorrectCalendarEntry(scene,session.draftAnswers[scene.id]??"")) return scene.id;
    if(scene.reflection && (session.draftAnswers[scene.id]?.trim().length??0)<scene.reflection.minLength)
      return scene.id;
    if(scene.form && scene.form.some(field=>!session.draftAnswers[scene.id+"."+field.id]?.trim()))
      return scene.id;
  }
  const practiceMissing=lesson.requiredPracticeIds.some(id=>!practiceAnswers[id]?.trim());
  const checkedMissing=(lesson.requiredCheckedIds??[]).some(id=>
    !practiceAnswers[id]?.trim()||!practiceChecked.includes(id));
  if(practiceMissing||checkedMissing){
    return lesson.scenes.find(scene=>scene.kind==="book" && scene.bookLinks?.length)?.id;
  }
  return undefined;
}
export function teacherCanFinish(session: TeacherSession, lesson: TeacherLesson,
  practiceAnswers: Readonly<Record<string, string>>, practiceChecked: readonly string[] = [],
  chapterAssessment?: TeacherChapterAssessmentInput, externalReady: boolean = !lesson.externalCheck): boolean {
  return teacherCompletionBlockers(
    session, lesson, practiceAnswers, practiceChecked, chapterAssessment, externalReady,
  ).length === 0;
}
export function finishTeacherSession(session: TeacherSession, lesson: TeacherLesson,
  practiceAnswers: Readonly<Record<string, string>>, now: string,
  practiceChecked: readonly string[] = [], chapterAssessment?: TeacherChapterAssessmentInput,
  externalReady: boolean = !lesson.externalCheck): TeacherSession {
  return session.completedAt || !teacherCanFinish(session, lesson, practiceAnswers, practiceChecked, chapterAssessment, externalReady) ? session :
    { ...session, updatedAt: now, completedAt: now };
}
export function independentTeacherEvidence(session: TeacherSession, lesson: TeacherLesson): number {
  const eligible = new Set(lesson.scenes.filter(scene =>
    scene.question && ["independent", "application", "exit"].includes(scene.question.evidenceRole ?? ""))
    .map(scene => scene.id));
  return new Set(session.attempts.filter(item => item.correct && item.independent &&
    eligible.has(item.sceneId)).map(item => item.sceneId)).size;
}
