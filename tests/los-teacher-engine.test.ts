import test from "node:test";
import assert from "node:assert/strict";
import {
  confirmTeacherActivity, emptyTeacherSession, evaluateTeacherAnswer,
  finishTeacherSession, independentTeacherEvidence, markTeacherHelp,
  moveTeacherScene, normalizeTeacherAnswer, parseTeacherSessions,
  revealTeacherSolution, setTeacherAnswerDraft, submitTeacherAnswer,
  teacherCanFinish, teacherCompletionBlockers, teacherNextIncompleteSceneId, teacherLatestAttempt, teacherWrongFeedback,
} from "../src/features/los/teacher/engine.ts";
import { LOS1_L004_TEACHER } from "../src/features/los/teacher/lessonL004.ts";

const lesson = LOS1_L004_TEACHER;
const now = "2026-11-12T20:00:00.000Z";

test("L004 is a full scripted, navigable lesson without free-form AI", () => {
  assert.equal(lesson.id, "L004");
  assert.equal(lesson.scenes.length, 11);
  assert.equal(new Set(lesson.scenes.map(s => s.id)).size, lesson.scenes.length);
  assert.deepEqual(lesson.requiredPracticeIds, ["C01-EX-01", "C01-EX-04"]);
  assert.ok(lesson.scenes.some(s => s.kind === "board"));
  assert.ok(lesson.scenes.some(s => s.kind === "book"));
  const session = emptyTeacherSession(lesson, now);
  assert.equal(session.sceneId, "welcome");
  assert.deepEqual(session.visitedIds, []);
  const entered = moveTeacherScene(session, lesson, "recall", now);
  assert.deepEqual(entered.visitedIds, ["recall"]);
  assert.equal(moveTeacherScene(entered, lesson, "nonexistent", now), entered);
});

test("short-answer comparison keeps German umlauts and ß significant", () => {
  assert.equal(normalizeTeacherAnswer("  GUTEN  ABEND! "), "guten abend");
  const q = lesson.scenes.find(s => s.id === "independent")!.question!;
  assert.equal(evaluateTeacherAnswer(q, "guten  abend."), true);
  assert.equal(evaluateTeacherAnswer(q, "Guten Morgen!"), false);
  assert.notEqual(normalizeTeacherAnswer("groß"), normalizeTeacherAnswer("gross"));
  assert.notEqual(normalizeTeacherAnswer("grün"), normalizeTeacherAnswer("grun"));
});

test("first correct attempt gives independent evidence; hints and retries do not", () => {
  let s = emptyTeacherSession(lesson, now);
  s = submitTeacherAnswer(s, lesson, "guided", "a", now);
  assert.equal(teacherLatestAttempt(s, "guided")!.correct, false);
  assert.equal(teacherLatestAttempt(s, "guided")!.independent, true);
  assert.match(teacherWrongFeedback(lesson.scenes.find(x => x.id === "guided")!, "a"), /illan/);
  s = markTeacherHelp(s, "guided", now);
  s = submitTeacherAnswer(s, lesson, "guided", "b", now);
  assert.equal(teacherLatestAttempt(s, "guided")!.correct, true);
  assert.equal(teacherLatestAttempt(s, "guided")!.independent, false);
  s = submitTeacherAnswer(s, lesson, "exit", "b", now);
  assert.equal(independentTeacherEvidence(s, lesson), 1);
  s = revealTeacherSolution(s, "independent", now);
  s = setTeacherAnswerDraft(s, "independent", "Guten Abend!", now);
  s = submitTeacherAnswer(s, lesson, "independent", "Guten Abend!", now);
  // Revealing the solution now blocks subsequent attempts; it cannot create mastery.
  assert.equal(teacherLatestAttempt(s, "independent"), undefined);
  assert.equal(independentTeacherEvidence(s, lesson), 1);
});

test("opening book or skipping questions cannot finish and never creates practice answers", () => {
  let s = emptyTeacherSession(lesson, now);
  for (const scene of lesson.scenes) s = moveTeacherScene(s, lesson, scene.id, now);
  s = confirmTeacherActivity(s, lesson, "vocabulary-reviewed", now);
  s = confirmTeacherActivity(s, lesson, "pronunciation-practiced", now);
  assert.equal(teacherCanFinish(s, lesson, {
    "C01-EX-01": "b", "C01-EX-04": "a",
  }), false);
  assert.equal(finishTeacherSession(s, lesson, {}, now).completedAt, null);
  assert.equal(s.attempts.length, 0);
});

test("completion needs visited scenes, all assessed questions, honest activities and real book answers", () => {
  let s = emptyTeacherSession(lesson, now);
  for (const scene of lesson.scenes) {
    s = moveTeacherScene(s, lesson, scene.id, now);
    const q = scene.question;
    if (q) s = submitTeacherAnswer(s, lesson, scene.id,
      q.type === "choice" ? q.correctOption! : q.accepted![0]!, now);
  }
  assert.equal(teacherCanFinish(s, lesson, {
    "C01-EX-01": "x", "C01-EX-04": "y",
  }), false);
  for (const id of lesson.requiredActivityIds) s = confirmTeacherActivity(s, lesson, id, now);
  assert.equal(teacherCanFinish(s, lesson, {}), false);
  assert.equal(teacherCanFinish(s, lesson, {"C01-EX-01":"x"}), false);
  const actualPractice = { "C01-EX-01": "x", "C01-EX-04": "y" };
  assert.equal(teacherCanFinish(s, lesson, actualPractice), true);
  s = finishTeacherSession(s, lesson, actualPractice, now);
  assert.equal(s.completedAt, now);
  const review = moveTeacherScene(s, lesson, "welcome", now);
  assert.equal(review.sceneId, "welcome");
  assert.equal(review.completedAt, now);
  assert.equal(independentTeacherEvidence(review, lesson), 3);
});

test("teacher storage rejects invalid and overlong sessions without destroying valid ones", () => {
  const valid = emptyTeacherSession(lesson, now);
  const parsed = parseTeacherSessions({
    "L004": valid,
    "L005": { ...valid, lessonId: "L005", attempts: [{sceneId:"x", answer:"long", correct:"yes", independent:false, at:now}] },
    "hacker": valid,
  });
  assert.deepEqual(Object.keys(parsed), ["L004"]);
  assert.equal(parseTeacherSessions({L004:{...valid, draftAnswers:{x:"x".repeat(501)}}})["L004"], undefined);
  assert.equal(parseTeacherSessions(null)["L004"], undefined);
});

test("guided and activation questions are not independent mastery evidence", () => {
  let s = emptyTeacherSession(lesson, now);
  for (const scene of lesson.scenes) {
    if (scene.question && ["recall", "guided"].includes(scene.id)) {
      const correct = scene.question.type === "choice" ? scene.question.correctOption! : scene.question.accepted![0]!;
      s = submitTeacherAnswer(s, lesson, scene.id, correct, now);
    }
  }
  assert.equal(s.attempts.filter(x => x.correct && x.independent).length, 2);
  assert.equal(independentTeacherEvidence(s, lesson), 0);
  s = submitTeacherAnswer(s, lesson, "independent", "Guten Abend!", now);
  assert.equal(independentTeacherEvidence(s, lesson), 1);
  s = markTeacherHelp(s, "exit", now);
  s = submitTeacherAnswer(s, lesson, "exit", "b", now);
  assert.equal(independentTeacherEvidence(s, lesson), 1);
});

test("completion checklist lists real missing scenes, questions, activities and workbook tasks", () => {
  let session=emptyTeacherSession(lesson,now);
  const initial=teacherCompletionBlockers(session,lesson,{});
  assert.ok(initial.some(reason=>reason.includes("Käy läpi")));
  assert.ok(initial.some(reason=>reason.includes("Vastaa oppitunnin kysymyksiin")));
  assert.ok(initial.some(reason=>reason.includes("Vahvista omat harjoittelut")));
  assert.ok(initial.some(reason=>reason.includes("C01-EX-01")&&reason.includes("C01-EX-04")));
  assert.equal(teacherCanFinish(session,lesson,{}),false);
  for(const scene of lesson.scenes){
    session=moveTeacherScene(session,lesson,scene.id,now);
    if(scene.question){
      session=submitTeacherAnswer(session,lesson,scene.id,
        scene.question.type==="choice"?scene.question.correctOption!:scene.question.accepted![0]!,now);
    }
  }
  for(const activity of lesson.requiredActivityIds)
    session=confirmTeacherActivity(session,lesson,activity,now);
  const completedAnswers={"C01-EX-01":"test","C01-EX-04":"test"};
  assert.deepEqual(teacherCompletionBlockers(session,lesson,completedAnswers),[]);
  assert.equal(teacherCanFinish(session,lesson,completedAnswers),true);
});

test("completion checklist identifies media and storage-independent gates without claiming mastery", () => {
  const session=emptyTeacherSession(lesson,now);
  const guarded={...lesson,mediaGate:{sourceId:"M-TEST-01",approved:false,
    reason:"Ääni vaatii lisenssitarkistuksen."}};
  const blockers=teacherCompletionBlockers(session,guarded,{},[],undefined,false);
  assert.ok(blockers.some(reason=>reason.includes("M-TEST-01")));
  assert.ok(blockers.some(reason=>reason.includes("erillinen kertaus- tai arviointiosio")));
  assert.equal(teacherCanFinish(session,guarded,{},[],undefined,false),false);
});

test("next unfinished step prioritizes unvisited lessons, unanswered questions and book practice", () => {
  let session=emptyTeacherSession(lesson,now);
  assert.equal(teacherNextIncompleteSceneId(session,lesson), "welcome");
  session=moveTeacherScene(session,lesson,"welcome",now);
  assert.equal(teacherNextIncompleteSceneId(session,lesson),"recall");

  for(const scene of lesson.scenes) session=moveTeacherScene(session,lesson,scene.id,now);
  assert.equal(teacherNextIncompleteSceneId(session,lesson),"recall");
  for(const scene of lesson.scenes){
    if(scene.question){
      const answer=scene.question.type==="choice"?scene.question.correctOption!:scene.question.accepted![0]!;
      session=submitTeacherAnswer(session,lesson,scene.id,answer,now);
    }
  }
  assert.equal(teacherNextIncompleteSceneId(session,lesson),"book");
  for(const id of lesson.requiredActivityIds) session=confirmTeacherActivity(session,lesson,id,now);
  const answers={"C01-EX-01":"x","C01-EX-04":"x"};
  assert.equal(teacherNextIncompleteSceneId(session,lesson,answers),undefined);
});

test("next unfinished step points to an incomplete reflection without changing any evidence", () => {
  const reflection={id:"my-reflection",phase:"Harjoittelu",title:"Pohdi",kind:"reflection" as const,
    paragraphs:["Kirjoita oma tavoite."],reflection:{prompt:"Mitä harjoittelit?",placeholder:"Vastaukseni",minLength:12}};
  const extra={...lesson,scenes:[...lesson.scenes.slice(0,1),reflection,...lesson.scenes.slice(1)]};
  let session=emptyTeacherSession(extra,now);
  for(const scene of extra.scenes) session=moveTeacherScene(session,extra,scene.id,now);
  const before=structuredClone(session);
  assert.equal(teacherNextIncompleteSceneId(session,extra),"my-reflection");
  assert.deepEqual(session,before,"Guidance must never create learning evidence");
});
