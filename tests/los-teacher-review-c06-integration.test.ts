import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {getLosTeacherLesson} from "../src/features/los/teacher/lessonRegistry.ts";
import {LOS1_C06_TEXT} from "../src/features/los/content/los1OpenDialogues.ts";
import {LOS1_L030_TEACHER} from "../src/features/los/teacher/lessonL030.ts";
import {LOS1_L033_TEACHER} from "../src/features/los/teacher/lessonL033.ts";
import {emptyTeacherSession,setTeacherAnswerDraft,confirmTeacherActivity,teacherBuiltNumberCount,teacherMidtermAssessmentStatus} from "../src/features/los/teacher/engine.ts";
import {validateTeacherLesson} from "../src/features/los/teacher/validateContent.ts";
const now="2026-11-13T15:00:00.000Z";

test("one registry includes prior lessons, Review I and five C06 lessons",()=>{
  for(const id of ["L001","L005","L013","L016","L017","L018","L019","L020","L021","L022","L023","L024","L025","L026","L027","L028","L029","L030","L031","L032","L033","L034","L035","L036","L037","L038","L039","L040"]){
    const lesson=getLosTeacherLesson(id);
    assert.ok(lesson,id+" must exist in canonical Teacher registry");
    assert.equal(lesson.id,id);
    assert.deepEqual(validateTeacherLesson(lesson),[]);
  }
  assert.equal(getLosTeacherLesson("L030"),LOS1_L030_TEACHER);
  assert.equal(getLosTeacherLesson("L033"),LOS1_L033_TEACHER);
});

test("EX-MID completion evidence and C06 number-building gate coexist",()=>{
  const empty=emptyTeacherSession(LOS1_L033_TEACHER,now);
  const board=LOS1_L033_TEACHER.scenes.find(s=>s.numberBuilder);
  assert.ok(board?.activityId);
  assert.equal(teacherBuiltNumberCount(empty,board.id),0);
  const easy=setTeacherAnswerDraft(empty,board.id+"-history","20,30,40,100,21,21,32",now);
  assert.equal(teacherBuiltNumberCount(easy,board.id),2);
  assert.equal(confirmTeacherActivity(easy,LOS1_L033_TEACHER,board.activityId,now).activityIds.includes(board.activityId),false);
  const valid=setTeacherAnswerDraft(empty,board.id+"-history","21,32,43,54,60,100",now);
  assert.equal(teacherBuiltNumberCount(valid,board.id),4);
  assert.ok(confirmTeacherActivity(valid,LOS1_L033_TEACHER,board.activityId,now).activityIds.includes(board.activityId));
  const midterm=teacherMidtermAssessmentStatus(LOS1_L030_TEACHER);
  assert.equal(midterm.ready,false);
  assert.equal(midterm.expected,25);
});

test("integrated player preserves genuine media, exact exam status, and number input support",()=>{
  const code=readFileSync("src/features/los/teacher/LosTeacherPlayer.tsx","utf8");
  const route=readFileSync("src/features/los/LosReferenceTools.tsx","utf8");
  assert.match(code,/LosTeacherGreetingMedia/);
  assert.match(code,/teacherMidtermAssessmentStatus\(lesson, draft, draft\.practiceAnswers\)/);
  assert.match(code,/teacherBuiltNumberCount\(session, scene\.id\)/);
  assert.match(code,/LosTeacherNumberBuilder/);
  assert.match(code,/inputMode=\{numericResponse \? "numeric" : "text"\}/);
  assert.match(code,/section === "midterm" \|\| section === "review"/);
  assert.match(code,/getLosTeacherLesson.*lessonRegistry/);
  assert.match(route,/L001–L055/);
  const picker=readFileSync("src/features/los/LosFirstLessons.tsx","utf8");
  assert.match(picker,/getLosTeacherLesson.*lessonRegistry/);
});

test("latest C06 published source text has named speakers, while older cached version differs",()=>{
  assert.equal(LOS1_C06_TEXT.sourceId,"M-ZPE-01");
  assert.equal(LOS1_C06_TEXT.originalLines.length,12);
  assert.deepEqual(LOS1_C06_TEXT.originalLines.slice(0,4).map(line=>line.speaker),
    ["Fabian","Lucas","Fabian","Lucas"]);
  assert.equal(LOS1_C06_TEXT.originalLines[1]?.text,"Ich bin neun.");
  assert.equal(LOS1_C06_TEXT.originalLines[3]?.text,"Lucas.");
  assert.equal(LOS1_C06_TEXT.questions[0]?.answers[0]?.text,"9-vuotias");
  assert.equal(LOS1_C06_TEXT.questions[0]?.correctId,"a");
  assert.match(LOS1_C06_TEXT.sourceDetail,/välimuistissa/);
  assert.equal(LOS1_C06_TEXT.author,"Monika Janicka");
  assert.equal(LOS1_C06_TEXT.licenseCode,"CC BY-SA 3.0");
});

test("C05 audio selection and pause behavior are preserved beside C06 and EX-MID",()=>{
 const media=readFileSync("src/features/los/LosReferenceTools.tsx","utf8");
 const player=readFileSync("src/features/los/teacher/LosTeacherPlayer.tsx","utf8");
 assert.ok(media.indexOf('chapterId==="05" && source==="B"') <
   media.indexOf('chapterId==="05" && source!=="A"'),
   "C05 Text B must use M-COM-08 rather than earlier sample audio");
 assert.match(player,/session\?\.paused/);
 assert.match(player,/session\?\.paused/);
});
