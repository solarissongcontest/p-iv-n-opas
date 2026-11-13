import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {LOS1_EXECUTABLE_LESSONS,los1LessonDraftChapter} from "../src/features/los/guidedLessons.ts";
import {recommendLos1Resume,losLessonCompleted} from "../src/features/los/losResumeRecommendation.ts";
import {emptyLosLessonProgress} from "../src/features/los/lessonEngine.ts";
import type {LosChapterDraft} from "../src/features/los/studyState.ts";

const started="2026-11-12T09:10:00.000Z";
const completed="2026-11-12T09:30:00.000Z";
const draft=():LosChapterDraft=>({version:1,note:"",applicationDraft:"",bookmarked:false,
 practiceAnswers:{},practiceChecked:[],testAnswers:{},testSubmittedAt:null,
 selfAssessment:"",lessonProgress:{},updatedAt:started});
const withProgress=(id:string,complete=false,start=started):LosChapterDraft=>{
 const d=draft();d.lessonProgress={[id]:{...emptyLosLessonProgress(),
  startedAt:start,completedAt:complete?completed:null}};return d;
};

test("LOS! 1 home starts at L001 only when user has no study evidence",()=>{
 const result=recommendLos1Resume({});
 assert.deepEqual(result,{lessonId:"L001",completed:0,available:60,action:"start"});
});
test("home continues to the first unfinished lesson after an actual completion",()=>{
 const result=recommendLos1Resume({"01":withProgress("L001",true)});
 assert.deepEqual(result,{lessonId:"L002",completed:1,available:60,action:"continue"});
});
test("home prefers the most recently started unfinished lesson over an unstarted earlier chapter",()=>{
 const d01=withProgress("L001",true);
 const d02=withProgress("L007",false,"2026-11-12T09:11:00.000Z");
 const d03=withProgress("L015",false,"2026-11-12T10:11:00.000Z");
 const result=recommendLos1Resume({"01":d01,"02":d02,"03":d03});
 assert.equal(result.lessonId,"L015");
 assert.equal(result.action,"continue");
 assert.equal(result.completed,1);
});
test("after 60 genuine lesson-completion records the CTA switches to revision, never a fake 61st lesson",()=>{
 const drafts:Record<string,LosChapterDraft>={};
 for(const lesson of LOS1_EXECUTABLE_LESSONS){
  const chapter=los1LessonDraftChapter(lesson.id);
  const d=drafts[chapter]??(drafts[chapter]=draft());
  d.lessonProgress??={};
  d.lessonProgress[lesson.id]={...emptyLosLessonProgress(),startedAt:started,completedAt:completed};
 }
 assert.deepEqual(recommendLos1Resume(drafts),{
  lessonId:"L001",completed:60,available:60,action:"review",
 });
});
test("actual V3.3 cover opens stored guided lesson without modifying its completion proof",()=>{
 const front=readFileSync("src/features/los/LosBook.tsx","utf8");
 const button=readFileSync("src/features/los/LosBookStartAction.tsx","utf8");
 assert.match(front,/book.id===1\?<LosBookStartAction move=\{move\}/);
 assert.match(button,/sessionStorage.setItem\("los1.selectedLesson",recommendation.lessonId\)/);
 assert.match(button,/Aloita nollasta/);
 assert.match(button,/Jatka oppituntia/);
 assert.match(button,/Kertaa kirja alusta/);
 assert.doesNotMatch(button,/lessonProgress:|testSubmittedAt:/);
});

test("Teacher 2.0 completion advances the course without altering old lessonProgress",()=>{
  const d=draft();
  d.teacherSessions={L001:{schemaVersion:1,lessonId:"L001",contentVersion:"2.0.0-preview.1",
    sceneId:"summary",visitedIds:["welcome"],attempts:[],helpedIds:[],
    revealedIds:[],activityIds:[],draftAnswers:{},completedAt:completed,updatedAt:completed}};
  assert.equal(losLessonCompleted(d,"L001"),true);
  assert.deepEqual(d.lessonProgress,{});
  assert.deepEqual(recommendLos1Resume({"01":d}),{
    lessonId:"L002",completed:1,available:60,action:"continue"});
});
test("paused Teacher 2.0 session is resumable without a fake completion",()=>{
  const d=draft();
  d.teacherSessions={L004:{schemaVersion:1,lessonId:"L004",contentVersion:"2.0.0-preview.1",
    sceneId:"guided",visitedIds:["welcome","recall","guided"],attempts:[],
    helpedIds:[],revealedIds:[],activityIds:[],draftAnswers:{},completedAt:null,
    updatedAt:"2026-11-12T11:15:00.000Z"}};
  const choice=recommendLos1Resume({"01":d});
  assert.equal(choice.lessonId,"L004");
  assert.equal(choice.completed,0);
  assert.equal(choice.action,"continue");
  assert.equal(losLessonCompleted(d,"L004"),false);
});
