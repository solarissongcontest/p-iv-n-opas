import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {getLosTeacherLesson} from "../src/features/los/teacher/lessonRegistry.ts";
import {validateTeacherLesson} from "../src/features/los/teacher/validateContent.ts";
import {LOS1_L030_TEACHER} from "../src/features/los/teacher/lessonL030.ts";
import {LOS1_L033_TEACHER} from "../src/features/los/teacher/lessonL033.ts";
import {LOS1_L039_TEACHER} from "../src/features/los/teacher/lessonL039.ts";
import {emptyTeacherSession,setTeacherAnswerDraft,teacherBuiltNumberCount,teacherMidtermAssessmentStatus} from "../src/features/los/teacher/engine.ts";
const stamp="2026-11-13T16:00:00.000Z";

test("40 LOS 1 lessons share one Teacher registry and content validator",()=>{
 for(let i=1;i<=40;i++){
   const id="L"+String(i).padStart(3,"0");
   const l=getLosTeacherLesson(id);
   assert.ok(l,id);
   assert.deepEqual(validateTeacherLesson(l),[],id);
 }
 assert.equal(getLosTeacherLesson("L030"),LOS1_L030_TEACHER);
 assert.equal(getLosTeacherLesson("L033"),LOS1_L033_TEACHER);
 assert.equal(getLosTeacherLesson("L039"),LOS1_L039_TEACHER);
});

test("C07 synthetic written form uses session drafts and preserves number and exam gates",()=>{
 const form=LOS1_L039_TEACHER.scenes.find(scene=>scene.kind==="form");
 assert.ok(form);
 assert.deepEqual(form.form?.map(field=>field.id),["name","code"]);
 const blank=emptyTeacherSession(LOS1_L039_TEACHER,stamp);
 const withName=setTeacherAnswerDraft(blank,form.id+".name","Mia",stamp);
 const withBoth=setTeacherAnswerDraft(withName,form.id+".code","1742",stamp);
 assert.equal(withBoth.draftAnswers[form.id+".name"],"Mia");
 assert.equal(withBoth.draftAnswers[form.id+".code"],"1742");
 assert.equal(teacherBuiltNumberCount(emptyTeacherSession(LOS1_L033_TEACHER,stamp),"builder"),0);
 assert.equal(teacherMidtermAssessmentStatus(LOS1_L030_TEACHER).expected,25);
});

test("C07 audio is source-gated and no older Teacher capability is removed",()=>{
 const media=readFileSync("src/features/los/LosAdditionalTextB.tsx","utf8");
 const player=readFileSync("src/features/los/teacher/LosTeacherPlayer.tsx","utf8");
 const path=readFileSync("src/features/los/LosReferenceTools.tsx","utf8");
 assert.match(media,/chapterId==="07" \?/);
 assert.match(media,/ei anneta kuuntelupisteitä/);
 assert.match(player,/los-teacher-form-fields/);
 assert.match(player,/LosTeacherNumberBuilder/);
 assert.match(player,/teacherMidtermAssessmentStatus/);
 assert.match(player,/LosTeacherGreetingMedia/);
 assert.match(path,/L001–L040/);
});
