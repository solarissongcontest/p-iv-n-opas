import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { emptyLosDraft } from "../src/features/los/studyState.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import {
  LOS1_L056_TEACHER,LOS1_L057_TEACHER,LOS1_L058_TEACHER,
  LOS1_L059_TEACHER,LOS1_L060_TEACHER,
} from "../src/features/los/teacher/lessonL056L060.ts";
import { getLosTeacherLesson } from "../src/features/los/teacher/lessonL004.ts";
import {
  emptyTeacherSession,markTeacherHelp,moveTeacherScene,submitTeacherAnswer,
  finishTeacherSession,teacherCanFinish,independentTeacherEvidence,
} from "../src/features/los/teacher/engine.ts";
import {teacherExternalStatus} from "../src/features/los/teacher/externalEvidence.ts";
import {summarizeLos1Mastery,LOS1_SKILLS} from "../src/features/los/masterySummary.ts";
import {losReviewIIQuestionsFor,losReviewIIReflectionId} from "../src/features/los/content/los1ReviewII.ts";
import {LOS1_FINAL_QUESTIONS,losFinalScore} from "../src/features/los/content/los1FinalExam.ts";
import {losArchiveExamAttempt,losArchivedExamHistory} from "../src/features/los/content/los1ExamArchive.ts";
import {parseLosDraft} from "../src/features/los/studyState.ts";
import type { LosChapterDraft } from "../src/features/los/studyState.ts";
const NOW="2026-11-13T12:00:00.000Z";
const all=[LOS1_L056_TEACHER,LOS1_L057_TEACHER,LOS1_L058_TEACHER,LOS1_L059_TEACHER,LOS1_L060_TEACHER];
const right=(q:NonNullable<(typeof all)[number]["scenes"][number]["question"]>)=>q.type==="choice"?q.correctOption!:q.accepted![0]!;
function completeTeacherScenes(lesson:(typeof all)[number]){
  let s=emptyTeacherSession(lesson,NOW);
  for(const scene of lesson.scenes){
    s=moveTeacherScene(s,lesson,scene.id,NOW);
    if(scene.question)s=submitTeacherAnswer(s,lesson,scene.id,right(scene.question),NOW);
    if(scene.reflection)s={...s,draftAnswers:{...s.draftAnswers,[scene.id]:"Tein yrityksen itse ja palaan hankalaan asiaan."}};
    if(scene.activityId)s={...s,activityIds:[...s.activityIds,scene.activityId]};
  }
  return s;
}
function checkedReview(id:"L056"|"L057"|"L058",allCorrect:boolean):LosChapterDraft{
  const d=emptyLosDraft(),questions=losReviewIIQuestionsFor(id);
  return {...d,practiceAnswers:Object.fromEntries([
    ...questions.map(q=>[q.id,allCorrect?q.correctId:q.answers.find(a=>a.id!==q.correctId)!.id]),
    [losReviewIIReflectionId(id),"some"],
  ]),practiceChecked:questions.map(q=>q.id)};
}
test("L056–L060 are valid Teacher manuscripts with canonical IDs and preserved legacy engine",()=>{
  assert.deepEqual(all.map(l=>l.id),["L056","L057","L058","L059","L060"]);
  assert.deepEqual(all.map(l=>l.chapterId),["92","92","92","93","93"]);
  for(const lesson of all){
    assert.equal(getLosTeacherLesson(lesson.id),lesson);
    assert.deepEqual(validateTeacherLesson(lesson),[],lesson.id);
    assert.equal(lesson.scenes.at(-1)?.kind,"summary");
    assert.equal(lesson.requiredPracticeIds.length,0);
  }
  assert.deepEqual(all.slice(0,3).map(l=>losReviewIIQuestionsFor(l.id as "L056"|"L057"|"L058").length),[5,5,5]);
  assert.equal(LOS1_FINAL_QUESTIONS.length,50);
  assert.equal(LOS1_L059_TEACHER.scenes.some(s=>Boolean(s.question)),false);
  assert.equal(LOS1_SKILLS.length,15);
});
test("L056 and L057 accept all five checked *wrong* review attempts and an own assessment",()=>{
  for(const lesson of [LOS1_L056_TEACHER,LOS1_L057_TEACHER]){
    const draft=checkedReview(lesson.id as "L056"|"L057",false);
    const external=teacherExternalStatus(lesson,draft);
    assert.equal(external.ready,true);
    assert.match(external.lines[0]!,/0 oikein/);
    let session=completeTeacherScenes(lesson);
    assert.equal(teacherCanFinish(session,lesson,{},[],undefined,false),false);
    assert.equal(teacherCanFinish(session,lesson,{},[],undefined,external.ready),true);
    session=finishTeacherSession(session,lesson,{},NOW,[],undefined,external.ready);
    assert.equal(session.completedAt,NOW);
    assert.equal(teacherExternalStatus(lesson,{...draft,practiceChecked:draft.practiceChecked.slice(0,4)}).ready,false);
    assert.equal(teacherExternalStatus(lesson,{...draft,practiceAnswers:{...draft.practiceAnswers,[losReviewIIReflectionId(lesson.id as "L056"|"L057")]:""}}).ready,false);
  }
});
test("L058 keeps assisted writing distinct from independently checked skill",()=>{
  const base=checkedReview("L058",true);
  const writing="Hallo!\nIch heiße Mia.\nIch komme aus Finnland.\nIch bin siebzehn Jahre alt.\nDas ist Leo.\nBis morgen!";
  const draft={...base,practiceAnswers:{...base.practiceAnswers,"EX-REV2-WRITING-058":writing}};
  assert.equal(teacherExternalStatus(LOS1_L058_TEACHER,draft).ready,true);
  const noWriting={...base,practiceAnswers:{...base.practiceAnswers,"EX-REV2-WRITING-058":"Hallo!"}};
  assert.equal(teacherExternalStatus(LOS1_L058_TEACHER,noWriting).ready,false);
  const helped=markTeacherHelp(emptyTeacherSession(LOS1_L058_TEACHER,NOW),"writing-assisted",NOW);
  assert.equal(teacherExternalStatus(LOS1_L058_TEACHER,{...draft,teacherSessions:{L058:helped}}).lines.some(line=>line.includes("käytetty")),true);
  assert.equal(independentTeacherEvidence(completeTeacherScenes(LOS1_L058_TEACHER),LOS1_L058_TEACHER),0);
});
test("L059 bridges the 50-choice final, ungraded production, audio evidence and immutable retake archive",()=>{
  const choices=Object.fromEntries(LOS1_FINAL_QUESTIONS.map(q=>[q.id,q.correctId]));
  const d=emptyLosDraft();
  const noAudio={...d,testAnswers:choices,testSubmittedAt:NOW};
  assert.equal(teacherExternalStatus(LOS1_L059_TEACHER,noAudio).ready,false);
  const finalDraft={...noAudio,practiceAnswers:{
    "EX-FINAL-AUDIO-M-COM-01":NOW,"EX-FINAL-AUDIO-M-COM-02":NOW,
    "EX-FINAL-WRITING-CHECK":"written-and-reviewed","EX-FINAL-VOICE-CHECK":"audio-download-started",
    "EX-FINAL-DIALOGUE-SELF":"some",
  },applicationDraft:"Hallo!\nIch heiße Mia.\nIch komme aus Finnland.\nIch bin siebzehn Jahre alt.\nDas ist Leo.\nBis morgen!",selfAssessment:"Kirjoitus onnistui, mutta harjoittelen puhumista."};
  assert.equal(losFinalScore(choices).correct,50);
  assert.equal(teacherExternalStatus(LOS1_L059_TEACHER,finalDraft).ready,true);
  const archivedAnswers=losArchiveExamAttempt(finalDraft.practiceAnswers,"EX-FINAL",LOS1_FINAL_QUESTIONS,choices,NOW);
  const retake={...finalDraft,testAnswers:{},testSubmittedAt:null,practiceAnswers:archivedAnswers};
  assert.equal(losArchivedExamHistory(retake.practiceAnswers,"EX-FINAL").length,1);
  assert.equal(losArchivedExamHistory(retake.practiceAnswers,"EX-FINAL")[0]?.correct,50);
  assert.equal(teacherExternalStatus(LOS1_L059_TEACHER,retake).ready,true);
  const restored=parseLosDraft(JSON.stringify(retake));
  assert.equal(losArchivedExamHistory(restored.practiceAnswers,"EX-FINAL").length,1);
  assert.equal(teacherExternalStatus(LOS1_L059_TEACHER,{...retake,practiceAnswers:{...retake.practiceAnswers,"EX-FINAL-VOICE-CHECK":""}}).ready,false);
  const teacher=completeTeacherScenes(LOS1_L059_TEACHER);
  assert.equal(teacherCanFinish(teacher,LOS1_L059_TEACHER,{},[],undefined,false),false);
  assert.equal(teacherCanFinish(teacher,LOS1_L059_TEACHER,{},[],undefined,true),true);
});
test("L060 rule-based summary separates covered, first-try, delayed and absent evidence, irrespective of 50/50 score",()=>{
  const l04=getLosTeacherLesson("L004")!;
  const l05=getLosTeacherLesson("L005")!;
  const firstScene=l04.scenes.find(s=>s.question?.skillId==="L1-INT-01"&&s.question.evidenceRole==="independent")!;
  const secondScene=l05.scenes.find(s=>s.question?.skillId==="L1-INT-01"&&s.question.evidenceRole==="independent")!;
  const first=submitTeacherAnswer(emptyTeacherSession(l04,NOW),l04,firstScene.id,right(firstScene.question!),NOW);
  const later="2026-11-15T13:00:00.000Z";
  const second=submitTeacherAnswer(emptyTeacherSession(l05,later),l05,secondScene.id,right(secondScene.question!),later);
  const d01={...emptyLosDraft(),teacherSessions:{L004:first,L005:second}};
  const d93={...emptyLosDraft(),testAnswers:Object.fromEntries(LOS1_FINAL_QUESTIONS.map(q=>[q.id,q.correctId])),testSubmittedAt:NOW,
    practiceAnswers:{"EX-FINAL-AUDIO-M-COM-01":NOW,"EX-FINAL-AUDIO-M-COM-02":NOW}};
  const result=summarizeLos1Mastery({"01":d01,"93":d93});
  assert.equal(result.exam?.correct,50);
  assert.equal(result.skills.find(s=>s.id==="L1-INT-01")?.laterConfirmed,true);
  assert.equal(result.skills.find(s=>s.id==="L1-PHON-01")?.status,"missing");
  assert.equal(result.skills.find(s=>s.id==="L1-PROD-01")?.status,"missing");
  assert.deepEqual(result.coveredChapters,["01"]);
  assert.match(result.nextSuggestion,/Kertaa/);
  const sameDay={...d01,teacherSessions:{L004:first,L005:{...second,attempts:second.attempts.map(a=>({...a,at:"2026-11-13T15:00:00.000Z"}))}}};
  assert.equal(summarizeLos1Mastery({"01":sameDay}).skills.find(s=>s.id==="L1-INT-01")?.laterConfirmed,false);
  const hinted=markTeacherHelp(emptyTeacherSession(l05,NOW),secondScene.id,NOW);
  const assisted=submitTeacherAnswer(hinted,l05,secondScene.id,right(secondScene.question!),NOW);
  assert.equal(summarizeLos1Mastery({"01":{...d01,teacherSessions:{L005:assisted}}}).skills.find(s=>s.id==="L1-INT-01")?.independentChecks,0);
});
test("L060 requires 10 reviewed goals, five real saved card ratings and confirmed own goal",()=>{
  const goals=Object.fromEntries(Array.from({length:10},(_,i)=>["EX-SUMMARY-C"+String(i+1).padStart(2,"0"),"reviewed"]));
  const d93={...emptyLosDraft(),practiceAnswers:{...goals,
    "EX-SUMMARY-CARDS":"reviewed-5",
    "EX-SUMMARY-GOAL":"Aion harjoitella tervehtimistä ja kysyä kuulumisia uudelleen.",
    "EX-SUMMARY-GOAL-OK":"confirmed","EX-SUMMARY-REFLECTION":"some"}};
  const recall=Object.fromEntries(Array.from({length:5},(_,i)=>["card-"+i,{}])) as LosChapterDraft["recallCards"];
  assert.equal(teacherExternalStatus(LOS1_L060_TEACHER,d93,{"01":{...emptyLosDraft(),recallCards:recall}}).ready,true);
  assert.equal(teacherExternalStatus(LOS1_L060_TEACHER,d93).ready,false);
  const overview=summarizeLos1Mastery({"93":d93});
  assert.match(overview.ownGoal??"",/tervehtimistä/);
  assert.equal(overview.skills.every(s=>s.status==="missing"),true);
  const component=readFileSync("src/features/los/LosMasterySummary.tsx","utf8");
  assert.match(component,/Ei myönteistä tarkistettua näyttöä/);
  assert.match(component,/CEFR-tasotodistus/);
});

test("L060 uses archived immutable score and never remaps historical answers to today's skill bank",()=>{
  const currentChoices=Object.fromEntries(LOS1_FINAL_QUESTIONS.map(q=>[q.id,q.correctId]));
  // A past edition may have a different key, even when item identifiers match.
  const historicalBank=LOS1_FINAL_QUESTIONS.map(q=>q.id==="EX-FINAL-Q01"
    ? {...q,correctId:"a" as const} : q);
  const oldRecords=losArchiveExamAttempt({},"EX-FINAL",historicalBank,currentChoices,NOW);
  const record=losArchivedExamHistory(oldRecords,"EX-FINAL")[0]!;
  assert.equal(record.correct,49);
  const snapshot=summarizeLos1Mastery({"93":{
    ...emptyLosDraft(),practiceAnswers:oldRecords,
  }});
  assert.deepEqual(snapshot.exam,{correct:49,total:50,attempts:1});
  assert.equal(snapshot.skills.every(skill=>skill.examCorrect===0&&skill.examTotal===0),true,
    "Archived answer choices must not silently become new skill claims");
  assert.equal(snapshot.skills.find(skill=>skill.id==="L1-INT-01")?.status,"missing");
});
