import test from "node:test";
import assert from "node:assert/strict";
import {
  confirmTeacherActivity, emptyTeacherSession, finishTeacherSession,
  independentTeacherEvidence, moveTeacherScene, submitTeacherAnswer, teacherCanFinish,
} from "../src/features/los/teacher/engine.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import { getLosTeacherLesson } from "../src/features/los/teacher/lessonL004.ts";
import { LOS1_L005_TEACHER } from "../src/features/los/teacher/lessonL005.ts";
import { LOS1_C01_QUESTIONS } from "../src/features/los/content/los1C01.ts";
import { LOS1_TEXT_B_SOURCES } from "../src/features/los/content/los1TextBAdditional.ts";

const lesson=LOS1_L005_TEACHER;
const now="2026-11-13T11:00:00.000Z";
const bookIDs=[
  ...LOS1_TEXT_B_SOURCES["01"].questions.slice(0,2).map(item=>item.id),
  ...LOS1_C01_QUESTIONS.slice(2,4).map(item=>item.id),
];

test("L005 is a real 12-scene Teacher lesson using the exact two book sources",()=>{
  assert.equal(getLosTeacherLesson("L005"),lesson);
  assert.equal(lesson.id,"L005");
  assert.equal(lesson.scenes.length,12);
  assert.deepEqual(validateTeacherLesson(lesson),[]);
  assert.deepEqual(lesson.requiredCheckedIds,bookIDs);
  assert.ok(lesson.scenes.some(scene=>scene.bookLinks?.some(link=>link.section==="text-b")));
  assert.ok(lesson.scenes.some(scene=>scene.bookLinks?.some(link=>link.section==="text")));
  assert.ok(lesson.scenes.some(scene=>scene.bookLinks?.some(link=>link.section==="understand")));
  assert.deepEqual(lesson.requiredPracticeIds,[]);
  assert.equal(lesson.bookId,1);
  assert.equal(lesson.chapterId,"01");
});

test("L005 completion requires actual checked Text B and C01 source answers",()=>{
  let s=emptyTeacherSession(lesson,now);
  for(const scene of lesson.scenes){
    s=moveTeacherScene(s,lesson,scene.id,now);
    if(scene.question){
      const q=scene.question;
      s=submitTeacherAnswer(s,lesson,scene.id,
        q.type==="choice"?q.correctOption!:q.accepted![0]!,now);
    }
  }
  for(const id of lesson.requiredActivityIds)s=confirmTeacherActivity(s,lesson,id,now);
  const answers=Object.fromEntries(bookIDs.map(id=>[id,"a"]));
  assert.equal(teacherCanFinish(s,lesson,answers,[]),false);
  assert.equal(teacherCanFinish(s,lesson,answers,bookIDs.slice(0,3)),false);
  assert.equal(finishTeacherSession(s,lesson,answers,now,bookIDs.slice(0,3)).completedAt,null);
  assert.equal(teacherCanFinish(s,lesson,answers,bookIDs),true);
  assert.equal(finishTeacherSession(s,lesson,answers,now,bookIDs).completedAt,now);
  assert.equal(independentTeacherEvidence(s,lesson),3);
  // The final source check is a real book check, not a teacher-generated copy.
  assert.deepEqual(s.attempts.map(item=>item.sceneId),lesson.requiredQuestionIds);
});

test("L005 cannot claim listening mastery based on optional audio or a text alternative",()=>{
  const entireProse=lesson.scenes.flatMap(scene=>scene.paragraphs).join(" ");
  assert.match(entireProse,/tekstivastine/);
  assert.match(entireProse,/kuuntel/);
  assert.match(entireProse,/ei.*todistettua kuullun ymmärtämistä/);
  const audio=lesson.scenes.find(scene=>scene.id==="audio-choice")!;
  assert.equal(audio.kind,"activity");
  assert.equal(audio.question,undefined);
  assert.equal(audio.activityId,"audio-or-text");
  assert.ok(!lesson.requiredQuestionIds.includes("audio-choice"));
  assert.equal(lesson.scenes.find(scene=>scene.id==="exit")?.question?.evidenceRole,"exit");
});

test("Text B IDs are accepted but invalid or alien checked IDs are rejected",()=>{
  assert.deepEqual(validateTeacherLesson({...lesson,requiredCheckedIds:["C01-TEXTB-Q01"]}),[]);
  const problems=validateTeacherLesson({...lesson,requiredCheckedIds:["C01-TEXTB-OLD","X-BOGUS"]});
  assert.ok(problems.some(issue=>issue.location==="requiredCheckedIds"));
});
