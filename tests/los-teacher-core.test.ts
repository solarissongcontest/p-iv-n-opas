import {test} from "node:test";
import {strict as assert} from "node:assert";
import {TEACHER_L004} from "../src/features/los/teacher/content/l004.ts";
import {initialTeacherProgress,validTeacherProgress,validTeacherLesson,selectTeacherScene,
 hintTeacher,answerTeacher,revealTeacher,pauseTeacher,teacherEvidence,
 teacherCanComplete,finishTeacher} from "../src/features/los/teacher/core.ts";
const at="2026-11-12T21:00:00Z";
import {emptyLosLessonProgress,losLessonFinishTeacher} from "../src/features/los/lessonEngine.ts";
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
test("teacher lesson cannot complete just by opening scenes",()=>{
 let p=initialTeacherProgress(TEACHER_L004);
 for(const scene of TEACHER_L004.scenes)p=selectTeacherScene(TEACHER_L004,p,scene.id);
 assert.equal(p.visited.length,9);
 assert.equal(teacherCanComplete(TEACHER_L004,p),false);
 assert.equal(finishTeacher(TEACHER_L004,p,at),p);
});
test("teacher lesson completion requires reviewed attempts, not correct answers",()=>{
 let p=initialTeacherProgress(TEACHER_L004);
 for(const scene of TEACHER_L004.scenes){
   p=selectTeacherScene(TEACHER_L004,p,scene.id);
   if(scene.question){
     const wrong=scene.question.choices.find(x=>x.id!==scene.question?.correctId)!;
     p=answerTeacher(TEACHER_L004,p,wrong.id,at);
   }
 }
 assert.equal(teacherCanComplete(TEACHER_L004,p),true);
 assert.equal(teacherEvidence(TEACHER_L004,p).independent.length,0);
 const finished=finishTeacher(TEACHER_L004,p,at);
 assert.equal(finished.completedAt,at);
 assert.equal(validTeacherProgress(finished),true);
 assert.equal(finishTeacher(TEACHER_L004,finished,at),finished);
});
test("old lesson completion and answers survive teacher completion without migration",()=>{
 const legacy={...emptyLosLessonProgress(),completedAt:"2026-10-18T10:00:00Z",
   completedStepIds:["review"],exitAnswer:"b",exitCheckedAt:"2026-10-18T10:00:00Z"};
 let p=initialTeacherProgress(TEACHER_L004);
 for(const scene of TEACHER_L004.scenes){
   p=selectTeacherScene(TEACHER_L004,p,scene.id);
   if(scene.question)p=revealTeacher(TEACHER_L004,p,at);
 }
 const completed=losLessonFinishTeacher(TEACHER_L004,{...legacy,teacher:p},at);
 assert.equal(completed.completedAt,legacy.completedAt);
 assert.equal(completed.teacher?.completedAt,at);
 assert.deepEqual(completed.completedStepIds,legacy.completedStepIds);
 assert.equal(completed.exitAnswer,legacy.exitAnswer);
 assert.equal(teacherEvidence(TEACHER_L004,completed.teacher!).independent.length,0);
 assert.equal(losLessonFinishTeacher(TEACHER_L004,completed,at),completed);
});
test("teacher state from the previous preview stays valid and un-upgraded",()=>{
 const p=initialTeacherProgress(TEACHER_L004);
 const previous={...p,completedAt:undefined};
 assert.equal(validTeacherProgress(previous),true);
 assert.equal(finishTeacher(TEACHER_L004,previous,at),previous);
});
