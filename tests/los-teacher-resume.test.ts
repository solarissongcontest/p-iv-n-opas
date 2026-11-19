import test from "node:test";
import assert from "node:assert/strict";
import {recommendLosTeacherResume} from "../src/features/los/losTeacherResume.ts";
import {emptyLosDraft,type LosChapterDraft} from "../src/features/los/studyState.ts";
import {emptyTeacherSession} from "../src/features/los/teacher/engine.ts";
import {getLosTeacherLesson} from "../src/features/los/teacher/lessonRegistry.ts";

const time="2026-11-19T18:59:00.000Z";
const draft=()=>emptyLosDraft();
const one=()=>getLosTeacherLesson("L001")!;
const two=()=>getLosTeacherLesson("L002")!;

test("first Teacher visit really starts L001 even when old guided runner had completions",()=>{
 const d=draft();
 d.lessonProgress={L001:{contentVersion:"1.0.0",startedAt:time,completedStepIds:["a"],exitAnswer:"x",exitCheckedAt:time,completedAt:time}};
 const result=recommendLosTeacherResume({"01":d});
 assert.deepEqual(result,{lessonId:"L001",completed:0,available:60,action:"start"});
});
test("Teacher 2.0 resumes the active current scene and continues from L002 after completing L001",()=>{
 const d=draft();
 const initial=emptyTeacherSession(one(),time);
 d.teacherSessions={L001:{...initial,sceneId:one().scenes[1]!.id,
   visitedIds:[one().scenes[0]!.id,one().scenes[1]!.id]}};
 assert.deepEqual(recommendLosTeacherResume({"01":d}),
   {lessonId:"L001",completed:0,available:60,action:"continue"});
 d.teacherSessions.L001={...d.teacherSessions.L001,completedAt:time};
 assert.deepEqual(recommendLosTeacherResume({"01":d}),
   {lessonId:"L002",completed:1,available:60,action:"continue"});
});
test("outdated Teacher 2.0 session must be reopened for safe archive rather than counted done",()=>{
 const d:LosChapterDraft=emptyLosDraft();
 const old=emptyTeacherSession(two(),time);
 d.teacherSessions={L002:{...old,completedAt:time,
   contentVersion:"2.0.0-preview.1",contentSignature:"12345678",visitedIds:[two().scenes[0]!.id]}};
 const recommendation=recommendLosTeacherResume({"01":d});
 assert.equal(recommendation.lessonId,"L002");
 assert.equal(recommendation.completed,0);
 assert.equal(recommendation.action,"continue");
});
