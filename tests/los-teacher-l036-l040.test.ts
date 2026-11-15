import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOS1_L036_TEACHER } from "../src/features/los/teacher/lessonL036.ts";
import { LOS1_L037_TEACHER } from "../src/features/los/teacher/lessonL037.ts";
import { LOS1_L038_TEACHER } from "../src/features/los/teacher/lessonL038.ts";
import { LOS1_L039_TEACHER } from "../src/features/los/teacher/lessonL039.ts";
import { LOS1_L040_TEACHER } from "../src/features/los/teacher/lessonL040.ts";
import { getLosTeacherLesson } from "../src/features/los/teacher/lessonL004.ts";
import { losExercisesFor } from "../src/features/los/exerciseBank.ts";
import { getLosOpenDialogue } from "../src/features/los/content/los1OpenDialogues.ts";
import { LOS1_TEXT_B_SOURCES } from "../src/features/los/content/los1TextBAdditional.ts";
import {
  emptyTeacherSession, moveTeacherScene, submitTeacherAnswer, markTeacherHelp,
  independentTeacherEvidence, confirmTeacherActivity, setTeacherAnswerDraft,
  teacherCanFinish, finishTeacherSession, toggleTeacherPause,
  teacherChapterAssessmentStatus, parseTeacherSessions, type TeacherLesson, type TeacherSession,
} from "../src/features/los/teacher/engine.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";

const lessons=[LOS1_L036_TEACHER,LOS1_L037_TEACHER,LOS1_L038_TEACHER,LOS1_L039_TEACHER,LOS1_L040_TEACHER];
const timestamp="2026-11-13T15:00:00.000Z";
const exercises=new Set(losExercisesFor("07").map(item=>item.id));

function simulate(lesson:TeacherLesson):TeacherSession {
  let session=emptyTeacherSession(lesson,timestamp);
  for(const scene of lesson.scenes){
    session=moveTeacherScene(session,lesson,scene.id,timestamp);
    if(scene.question){
      const q=scene.question;
      session=submitTeacherAnswer(session,lesson,scene.id,q.type==="choice"?q.correctOption!:q.accepted![0]!,timestamp);
    }
    if(scene.reflection)session=setTeacherAnswerDraft(session,scene.id,"M-I-A",timestamp);
    if(scene.form)for(const field of scene.form){
      session=setTeacherAnswerDraft(session,scene.id+"."+field.id,field.sampleAnswer,timestamp);
    }
    if(scene.activityId)session=confirmTeacherActivity(session,lesson,scene.activityId,timestamp);
  }
  return session;
}
function chapterAnswers(lesson:TeacherLesson) {
  return Object.fromEntries([...lesson.requiredPracticeIds,...(lesson.requiredCheckedIds??[])].map(id=>[id,"a"]));
}

test("L036-L040 are five registered canonical lessons and preserve source/practice identifiers",()=>{
  assert.deepEqual(lessons.map(l=>l.id),["L036","L037","L038","L039","L040"]);
  for(const lesson of lessons){
    assert.equal(getLosTeacherLesson(lesson.id),lesson,lesson.id);
    assert.equal(lesson.chapterId,"07");
    assert.equal(lesson.bookId,1);
    assert.deepEqual(validateTeacherLesson(lesson),[],lesson.id);
    assert.ok(lesson.scenes.length>=10,lesson.id);
    assert.ok(lesson.scenes.some(scene=>scene.kind==="board"));
    assert.ok(lesson.scenes.some(scene=>scene.kind==="explanation"));
    assert.ok(lesson.scenes.some(scene=>scene.kind==="summary"));
    assert.ok(lesson.requiredQuestionIds.length>=4);
    assert.ok(lesson.requiredPracticeIds.every(id=>exercises.has(id)),lesson.id);
    assert.ok(lesson.scenes.flatMap(s=>s.bookLinks??[]).every(link=>link.chapterId==="07"));
  }
});

test("L036 teaches the complete alphabet as grouped names rather than an A-Z list, with optional personal name",()=>{
  const scene=LOS1_L036_TEACHER.scenes.find(s=>s.id==="alphabet-board")!;
  assert.equal(scene.kind,"board");
  assert.ok(scene.board!.length>=6);
  const rows=scene.board!.map(x=>x.german).join(" ");
  for(const letter of "ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ".split("")) {
    assert.match(rows,new RegExp("(^|\\s|·)"+letter+"(?:\\s|\\s*/|\\s*·)"),letter);
  }
  assert.match(rows,/ß/);
  assert.match(rows,/V \/faʊ\/.*W \/veː\//);
  const prose=LOS1_L036_TEACHER.scenes.flatMap(scene=>scene.paragraphs).join(" ");
  assert.match(prose,/keksitty/i);
  assert.match(prose,/ei tarvitse.*henkilötieto/i);
  assert.deepEqual(LOS1_L036_TEACHER.requiredPracticeIds,["C07-EX-05","C07-EX-06","C07-EX-07"]);
});

test("L037 displays the exact five source turns using existing M-WB-02 rather than new dialogue",()=>{
  const source=getLosOpenDialogue("07")!;
  assert.equal(source.sourceId,"M-WB-02");
  assert.equal(source.revision,"3504939");
  assert.equal(source.originalLines.length,5);
  const board=LOS1_L037_TEACHER.scenes.find(scene=>scene.id==="original")?.board;
  assert.ok(board);
  assert.deepEqual(board.map(item=>item.german),source.originalLines.map(line=>line.text));
  assert.deepEqual(board.map(item=>item.meaning),source.originalLines.map(line=>line.meaning));
  assert.deepEqual(LOS1_L037_TEACHER.requiredCheckedIds,["C07-SOURCE-Q01","C07-SOURCE-Q02","C07-SOURCE-Q03"]);
  assert.ok(LOS1_L037_TEACHER.requiredCheckedIds!.every(id=>source.questions.some(question=>question.id===id)));
});

test("L038 combines a sequential spelling-and-number table with four actual C07 exercises",()=>{
  assert.deepEqual(LOS1_L038_TEACHER.requiredPracticeIds,["C07-EX-08","C07-EX-09","C07-EX-14","C07-EX-15"]);
  const board=LOS1_L038_TEACHER.scenes.find(s=>s.id==="table")!.board!;
  assert.ok(board.length>=8);
  assert.ok(board.some(row=>row.german.includes("eins")));
  assert.ok(board.some(row=>row.german.includes("W")));
  for(const sceneId of ["guided","independent","application","exit"]){
    assert.ok(LOS1_L038_TEACHER.scenes.find(s=>s.id===sceneId)?.question);
  }
});

test("L039 uses actual C07 Text B source IDs, but never fabricates a dictated name or listening score",()=>{
  const source=LOS1_TEXT_B_SOURCES["07"];
  assert.equal(source.sourceId,"M-COM-06");
  assert.equal(source.transcriptIsExact,false);
  assert.equal(source.lines.length,0);
  assert.deepEqual(LOS1_L039_TEACHER.requiredCheckedIds,["C07-TEXTB-Q01","C07-TEXTB-Q02"]);
  const form=LOS1_L039_TEACHER.scenes.find(s=>s.id==="form");
  assert.equal(form?.kind,"form");
  assert.deepEqual(form!.form!.map(f=>f.sampleAnswer),["Mia","1742"]);
  const all=LOS1_L039_TEACHER.scenes.flatMap(s=>s.paragraphs).join(" ");
  assert.match(all,/ei.*kuuntelupisteitä/i);
  assert.match(all,/kirjalli/i);
  const textB=readFileSync("src/features/los/LosAdditionalTextB.tsx","utf8");
  assert.match(textB,/chapterId==="07".*los-editorial-note/s);
  assert.match(textB,/odottaa hyväksyntää/);
});

test("L039 form is mandatory for written completion but never increases independent listening evidence",()=>{
  const lesson=LOS1_L039_TEACHER;
  const answers=chapterAnswers(lesson);
  const session=simulate(lesson);
  assert.equal(teacherCanFinish(session,lesson,answers,lesson.requiredCheckedIds!),true);
  assert.equal(independentTeacherEvidence(session,lesson),3);
  const missing={...session,draftAnswers:{...session.draftAnswers}};
  delete missing.draftAnswers["form.code"];
  assert.equal(teacherCanFinish(missing,lesson,answers,lesson.requiredCheckedIds!),false);
  assert.equal(teacherCanFinish(session,lesson,answers,[]),false);
  assert.equal(teacherCanFinish(session,lesson,answers,lesson.requiredCheckedIds!),true);
});

test("L040 reuses all 15 real chapter test answers, an application draft and self-assessment",()=>{
  const lesson=LOS1_L040_TEACHER;
  const ids=lesson.chapterAssessment!.requiredTestIds;
  assert.equal(ids.length,15);
  assert.deepEqual(ids,losExercisesFor("07").map(item=>item.id));
  const testInput={testAnswers:Object.fromEntries(ids.map(id=>[id,"a"])),testSubmittedAt:timestamp,
    applicationDraft:"Ich heiße Mia. M-I-A.",selfAssessment:"Haluan vielä harjoitella V- ja W-kirjaimia."};
  assert.equal(teacherChapterAssessmentStatus(lesson,testInput).ready,true);
  assert.equal(teacherChapterAssessmentStatus(lesson,{...testInput,testSubmittedAt:null}).ready,false);
  assert.equal(teacherChapterAssessmentStatus(lesson,{...testInput,selfAssessment:""}).ready,false);
  assert.equal(teacherChapterAssessmentStatus(lesson,{...testInput,applicationDraft:""}).ready,false);
  let session=simulate(lesson);
  assert.equal(teacherCanFinish(session,lesson,{},[],testInput),true);
  assert.equal(teacherCanFinish(session,lesson,{},[],{...testInput,testSubmittedAt:null}),false);
  session=finishTeacherSession(session,lesson,{},timestamp,[],testInput);
  assert.equal(session.completedAt,timestamp);
});

test("C07 session pause/resume persists in teacherSessions and hints are not independent evidence",()=>{
  const lesson=LOS1_L036_TEACHER;
  const session=simulate(lesson);
  assert.equal(teacherCanFinish(session,lesson,chapterAnswers(lesson)),true);
  const paused=toggleTeacherPause(session,timestamp);
  assert.equal(paused.paused,true);
  assert.equal(teacherCanFinish(paused,lesson,chapterAnswers(lesson)),false);
  const saved=parseTeacherSessions({L036:paused});
  assert.equal(saved.L036.paused,true);
  assert.equal(toggleTeacherPause(saved.L036,timestamp).paused,false);
  let aided=emptyTeacherSession(lesson,timestamp);
  aided=markTeacherHelp(aided,"independent",timestamp);
  aided=submitTeacherAnswer(aided,lesson,"independent","b",timestamp);
  assert.equal(independentTeacherEvidence(aided,lesson),0);
  assert.equal(independentTeacherEvidence(session,lesson),3);
});
