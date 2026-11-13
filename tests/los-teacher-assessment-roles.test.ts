import test from "node:test";
import assert from "node:assert/strict";
import {emptyTeacherSession,independentTeacherEvidence,markTeacherHelp,submitTeacherAnswer}
 from "../src/features/los/teacher/engine.ts";
import {LOS1_L001_TEACHER} from "../src/features/los/teacher/lessonL001.ts";
import {LOS1_L002_TEACHER} from "../src/features/los/teacher/lessonL002.ts";
import {LOS1_L003_TEACHER} from "../src/features/los/teacher/lessonL003.ts";
import {LOS1_L004_TEACHER} from "../src/features/los/teacher/lessonL004.ts";

test("explicit independent-evidence roles ignore guided/diagnostic questions",()=>{
 const now="2026-11-13T06:00:00.000Z";
 for(const [lesson,eligible] of [
  [LOS1_L001_TEACHER,1],[LOS1_L002_TEACHER,1],
  [LOS1_L003_TEACHER,2],[LOS1_L004_TEACHER,3]
 ] as const){
  let progress=emptyTeacherSession(lesson,now);
  for(const scene of lesson.scenes){
   const q=scene.question;
   if(!q)continue;
   const right=q.type==="choice"?q.correctOption!:q.accepted![0]!;
   progress=submitTeacherAnswer(progress,lesson,scene.id,right,now);
  }
  assert.equal(independentTeacherEvidence(progress,lesson),eligible,lesson.id);
  const exitScene=lesson.scenes.find(s=>s.question?.evidenceRole==="exit")!;
  const withHelp=markTeacherHelp(emptyTeacherSession(lesson,now),exitScene.id,now);
  const question=exitScene.question!;
  const correct=question.type==="choice"?question.correctOption!:question.accepted![0]!;
  const hinted=submitTeacherAnswer(withHelp,lesson,exitScene.id,correct,now);
  assert.equal(independentTeacherEvidence(hinted,lesson),0,
    lesson.id+" must not count hinted answers");
 }
});
