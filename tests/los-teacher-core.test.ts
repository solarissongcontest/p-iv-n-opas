import {test} from "node:test";
import {strict as assert} from "node:assert";
import {TEACHER_L004} from "../src/features/los/teacher/content/l004.ts";
import {initialTeacherProgress,validTeacherProgress,validTeacherLesson,selectTeacherScene,
 hintTeacher,answerTeacher,revealTeacher,pauseTeacher,teacherEvidence} from "../src/features/los/teacher/core.ts";
const at="2026-11-12T21:00:00Z";
test("L004 has full scripted teaching, not a generic task list",()=>{
 assert.deepEqual(validTeacherLesson(TEACHER_L004),[]);
 assert.equal(TEACHER_L004.review,"draft");
 assert.equal(TEACHER_L004.scenes.length,9);
});
test("scene navigation and pause do not create phantom skill evidence",()=>{
 const initial=initialTeacherProgress(TEACHER_L004);
 assert.equal(validTeacherProgress(initial),true);
 const navigated=selectTeacherScene(TEACHER_L004,initial,"summary");
 assert.equal(teacherEvidence(TEACHER_L004,navigated).independent.length,0);
 assert.equal(selectTeacherScene(TEACHER_L004,navigated,"invalid"),navigated);
 const paused=pauseTeacher(selectTeacherScene(TEACHER_L004,navigated,"guided"));
 assert.equal(answerTeacher(TEACHER_L004,paused,"b",at),paused);
});
test("only an unhinted first attempt independently demonstrates a scripted response",()=>{
 let p=selectTeacherScene(TEACHER_L004,initialTeacherProgress(TEACHER_L004),"guided");
 p=answerTeacher(TEACHER_L004,p,"b",at);
 assert.equal(p.answers.guided?.independent,false);
 p=selectTeacherScene(TEACHER_L004,p,"independent");
 p=answerTeacher(TEACHER_L004,p,"c",at);
 assert.equal(p.answers.independent?.independent,true);
 assert.equal(teacherEvidence(TEACHER_L004,p).required,3);
 assert.equal(teacherEvidence(TEACHER_L004,p).independent.length,1);
});
test("retries, hints and revealed answers do not become independent evidence",()=>{
 let p=selectTeacherScene(TEACHER_L004,initialTeacherProgress(TEACHER_L004),"independent");
 p=answerTeacher(TEACHER_L004,p,"a",at);
 p=answerTeacher(TEACHER_L004,p,"c",at);
 assert.equal(p.answers.independent?.correct,true);
 assert.equal(p.answers.independent?.independent,false);
 assert.equal(answerTeacher(TEACHER_L004,p,"c",at),p);
 let q=selectTeacherScene(TEACHER_L004,initialTeacherProgress(TEACHER_L004),"application");
 q=hintTeacher(TEACHER_L004,q);
 q=answerTeacher(TEACHER_L004,q,"a",at);
 assert.equal(q.answers.application?.independent,false);
 let r=selectTeacherScene(TEACHER_L004,initialTeacherProgress(TEACHER_L004),"exit");
 r=revealTeacher(TEACHER_L004,r,at);
 assert.equal(r.answers.exit?.revealed,true);
 assert.equal(answerTeacher(TEACHER_L004,r,"c",at),r);
});
test("invalid oversized or fabricated teacher states fail storage validation",()=>{
 const state=initialTeacherProgress(TEACHER_L004);
 assert.equal(validTeacherProgress({...state,answers:{bad:{answer:"a",count:999,correct:false,independent:false,revealed:false,at}}}),false);
 assert.equal(validTeacherProgress({...state,version:"9.0.0"}),false);
});