import test from "node:test";
import assert from "node:assert/strict";
import {
  confirmTeacherActivity, emptyTeacherSession, evaluateTeacherAnswer,
  finishTeacherSession, independentTeacherEvidence, markTeacherHelp,
  moveTeacherScene, normalizeTeacherAnswer, parseTeacherSessions, recoverTeacherSession,
  revealTeacherSolution, setTeacherAnswerDraft, submitTeacherAnswer,
  teacherCanFinish, teacherCompletionBlockers, teacherNextIncompleteSceneId, teacherLatestAttempt, teacherWrongFeedback, teacherRequiresNumericResponse, validTeacherSessionMap,
  teacherContentSignature, teacherSessionNeedsReview, restartUpdatedTeacherSession, validTeacherSessionHistoryMap, parseTeacherSessionHistory,
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


test("digit-only answers use a numeric keyboard regardless of Finnish wording",()=>{
  const question=(prompt:string,accepted:string[])=>({
    type:"text" as const,prompt,accepted,skillId:"L1-NUM-01",
    success:"Oikein",hint:"Vihje",reteach:"Selitys",genericWrong:"Kokeile uudestaan",
  });
  assert.equal(teacherRequiresNumericResponse(question("Kirjoita numeroin: neunzehn",["19"])),true);
  assert.equal(teacherRequiresNumericResponse(question("Kirjoita numerosarja numeroina ilman välilyöntejä.",["4062"])),true);
  assert.equal(teacherRequiresNumericResponse(question("Koodi",["0042"])),true,"Leading zeros need text input");
  assert.equal(teacherRequiresNumericResponse(question("Kirjoita saksaksi: 17",["siebzehn"])),false);
  assert.equal(teacherRequiresNumericResponse(question("Valitse muoto",["17","siebzehn"])),false);
  assert.equal(teacherRequiresNumericResponse(question("Kirjoita numero",[])),false);
  assert.equal(teacherRequiresNumericResponse({
    ...question("Mikä nimi?",[]),type:"choice",options:[{id:"a",label:"7"},{id:"b",label:"8"}],correctOption:"a",
  }),false);
});


test("answered-correct questions are immutable even if the engine is called again",()=>{
  let session=emptyTeacherSession(lesson,now);
  session=submitTeacherAnswer(session,lesson,"guided","b",now);
  assert.equal(session.attempts.length,1);
  assert.equal(session.attempts[0]?.correct,true);
  const repeated=submitTeacherAnswer(session,lesson,"guided","a",now);
  assert.strictEqual(repeated,session,"A correct answer is final even outside the disabled UI");
  const repeatedCorrect=submitTeacherAnswer(session,lesson,"guided","b",now);
  assert.strictEqual(repeatedCorrect,session,"No duplicate correct attempts may be appended");
  const incorrect=submitTeacherAnswer(session,lesson,"independent","Guten Morgen!",now);
  assert.equal(incorrect.attempts.at(-1)?.correct,false);
  const fixed=submitTeacherAnswer(incorrect,lesson,"independent","Guten Abend!",now);
  assert.equal(fixed.attempts.at(-1)?.correct,true);
  assert.equal(fixed.attempts.filter(item=>item.sceneId==="independent").length,2);
});

test("question feedback falls back to the authored explanation when specific feedback is blank",()=>{
  const scene=lesson.scenes.find(item=>item.id==="guided")!;
  assert.ok(scene.question);
  const wrongOption=scene.question!.options?.find(option=>option.id==="a");
  assert.ok(wrongOption);
  const missingSpecific={
    ...scene,
    question:{
      ...scene.question!,
      options:scene.question!.options!.map(option=>option.id==="a"?{...option,wrongFeedback:"  "}:option),
      genericWrong:"Mieti aloitustervehdystä.",
    },
  };
  assert.equal(teacherWrongFeedback(missingSpecific,"a"),"Mieti aloitustervehdystä.");
  assert.equal(teacherWrongFeedback(missingSpecific,"nonexistent"),"Mieti aloitustervehdystä.");
  assert.match(teacherWrongFeedback(scene,"a"),/illan/);
});


test("removed scene IDs resume at unfinished current content without rewriting learner evidence",()=>{
  let saved=emptyTeacherSession(lesson,now);
  saved=moveTeacherScene(saved,lesson,"welcome",now);
  saved=moveTeacherScene(saved,lesson,"recall",now);
  saved=submitTeacherAnswer(saved,lesson,"recall","b",now);
  saved=setTeacherAnswerDraft(saved,"independent","Guten Abend!",now);
  saved=markTeacherHelp(saved,"guided",now);
  const previous={...saved,
    sceneId:"retired-teaching-scene",
    contentVersion:"1.9.0-preview.1",
    activityIds:["vocabulary-reviewed"],
    completedAt:null,
  };
  const before=structuredClone(previous);
  assert.equal(validTeacherSessionMap({L004:previous}),true);
  const recovered=recoverTeacherSession(previous,lesson);
  assert.equal(recovered.sceneId,"situations","Resume the first unvisited current scene");
  assert.equal(recovered.contentVersion,"1.9.0-preview.1","Do not silently assert a new curriculum version was mastered");
  assert.deepEqual(recovered.visitedIds,previous.visitedIds);
  assert.deepEqual(recovered.attempts,previous.attempts);
  assert.deepEqual(recovered.helpedIds,previous.helpedIds);
  assert.deepEqual(recovered.activityIds,previous.activityIds);
  assert.deepEqual(recovered.draftAnswers,previous.draftAnswers);
  assert.equal(recovered.updatedAt,previous.updatedAt);
  assert.deepEqual(previous,before,"Reading a saved session must not mutate stored evidence");
  assert.equal(independentTeacherEvidence(recovered,lesson),independentTeacherEvidence(previous,lesson));
  assert.deepEqual(teacherCompletionBlockers(recovered,lesson,{}),
    teacherCompletionBlockers(previous,lesson,{}),"Recovery cannot fabricate completion");
  assert.deepEqual(parseTeacherSessions({L004:recovered}).L004,recovered,
    "A navigation-repaired session remains compatible with the existing backup schema");
});

test("removed scenes recover with a stable fallback and leave valid sessions untouched",()=>{
  const current=emptyTeacherSession(lesson,now);
  assert.strictEqual(recoverTeacherSession(current,lesson),current);
  const empty={...current,sceneId:"old-removed-scene"};
  const first=recoverTeacherSession(empty,lesson);
  assert.equal(first.sceneId,"welcome");
  assert.deepEqual(first.visitedIds,[]);
  assert.deepEqual(first.attempts,[]);
  const all={...current,sceneId:"old-removed-scene",
    visitedIds:lesson.scenes.map(scene=>scene.id),
    draftAnswers:{independent:"Guten Abend!"},
    completedAt:now,
  };
  const last=recoverTeacherSession(all,lesson);
  assert.equal(last.sceneId,"summary","Completed lessons remain navigable after a scene rename");
  assert.equal(last.completedAt,now,"Historical completion is preserved, never backdated or erased");
  assert.deepEqual(last.draftAnswers,all.draftAnswers);
  assert.strictEqual(recoverTeacherSession({...current,lessonId:"L999",sceneId:"old-removed-scene"},lesson).sceneId,
    "old-removed-scene","A mismatched lesson must not inherit another lesson's route");
});


test("content edits without a version bump require a fresh current lesson",()=>{
  const previous=emptyTeacherSession(lesson,now);
  const modified={...lesson,scenes:lesson.scenes.map(scene=>scene.id==="situations"
    ? {...scene,paragraphs:[...scene.paragraphs,"Päivitetty opetuslause."]}:scene)};
  assert.equal(modified.version,lesson.version);
  assert.notEqual(teacherContentSignature(modified),teacherContentSignature(lesson));
  assert.equal(teacherSessionNeedsReview(previous,modified),true);
  assert.equal(teacherCanFinish(previous,modified,{}),false);
  assert.match(teacherCompletionBlockers(previous,modified,{})[0]!,/sisältö on muuttunut/);
  assert.strictEqual(submitTeacherAnswer(previous,modified,"guided","b",now),previous,
    "A mismatched content signature must not add another attempt");
  assert.strictEqual(confirmTeacherActivity(previous,modified,"vocabulary-reviewed",now),previous);
  assert.equal(independentTeacherEvidence(previous,modified),0);
  assert.equal(teacherSessionNeedsReview(emptyTeacherSession(modified,now),modified),false);
});

test("explicit restart archives the intact prior lesson and never reuses its mastery",()=>{
  let previous=emptyTeacherSession(lesson,now);
  previous=moveTeacherScene(previous,lesson,"independent",now);
  previous=submitTeacherAnswer(previous,lesson,"independent","Guten Abend!",now);
  previous=setTeacherAnswerDraft(previous,"independent","Guten Abend!",now);
  previous=confirmTeacherActivity(previous,lesson,"vocabulary-reviewed",now);
  const updated={...lesson,version:"2.0.0-preview.2"};
  const original=structuredClone(previous);
  const upgraded=restartUpdatedTeacherSession(previous,updated,{},"2026-11-15T10:00:00.000Z");
  assert.ok(upgraded);
  assert.deepEqual(upgraded.history.L004,[original]);
  assert.deepEqual(previous,original,"The existing learner record must not be mutated");
  assert.equal(upgraded.current.lessonId,"L004");
  assert.equal(upgraded.current.contentVersion,"2.0.0-preview.2");
  assert.equal(upgraded.current.contentSignature,teacherContentSignature(updated));
  assert.deepEqual(upgraded.current.visitedIds,[]);
  assert.deepEqual(upgraded.current.attempts,[]);
  assert.deepEqual(upgraded.current.activityIds,[]);
  assert.deepEqual(upgraded.current.draftAnswers,{});
  assert.equal(upgraded.current.completedAt,null);
  assert.equal(independentTeacherEvidence(upgraded.current,updated),0);
  assert.equal(teacherSessionNeedsReview(upgraded.current,updated),false);
  assert.strictEqual(restartUpdatedTeacherSession(upgraded.current,updated,upgraded.history,now),null,
    "A current lesson must not generate a redundant history snapshot");
});

test("legacy teacher sessions can be archived without losing earlier backup schema",()=>{
  const saved=emptyTeacherSession(lesson,now);
  const legacy=JSON.parse(JSON.stringify({...saved,contentSignature:undefined})) as typeof saved;
  assert.equal(validTeacherSessionMap({L004:legacy}),true);
  assert.equal(teacherSessionNeedsReview(legacy,lesson),true,
    "A missing signature cannot certify that old answers match the current manuscript");
  const restarted=restartUpdatedTeacherSession(legacy,lesson,{},now);
  assert.ok(restarted);
  assert.equal(restarted.current.contentSignature,teacherContentSignature(lesson));
  assert.equal(restarted.history.L004[0].contentSignature,undefined);
  assert.deepEqual(parseTeacherSessionHistory(JSON.parse(JSON.stringify(restarted.history))),restarted.history);
  assert.equal(validTeacherSessionHistoryMap(restarted.history),true);
  assert.equal(validTeacherSessionHistoryMap({L004:[{...legacy,lessonId:"L777"}]}),false);
  assert.equal(validTeacherSessionHistoryMap({L004:[{...legacy,completedAt:"invalid"}]}),false);
  const full={L004:Array.from({length:8},()=>legacy)};
  assert.equal(validTeacherSessionHistoryMap(full),true);
  assert.equal(restartUpdatedTeacherSession(legacy,lesson,full,now),null,
    "Full archives must block a restart rather than discard the oldest learning record");
});
