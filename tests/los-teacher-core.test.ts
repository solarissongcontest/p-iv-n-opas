import {test} from "node:test";
import {strict as assert} from "node:assert";
import {TEACHER_L004} from "../src/features/los/teacher/content/l004.ts";
import {initialTeacherProgress,validTeacherProgress,validTeacherLesson,selectTeacherScene,
 hintTeacher,answerTeacher,revealTeacher,pauseTeacher,teacherEvidence,
 teacherCanComplete,teacherCurrentCompletion,finishTeacher,openTeacherHelp,answerTeacherWritten,revealTeacherWritten} from "../src/features/los/teacher/core.ts";
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
   if(scene.written)p=answerTeacherWritten(TEACHER_L004,p,"Guten Tag!",at);
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
   if(scene.written)p=revealTeacherWritten(TEACHER_L004,p,at);
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

test("all L004 scenes have distinct, contextual, sufficiently substantive authored help",()=>{
 assert.equal(TEACHER_L004.scenes.length,9);
 for(const scene of TEACHER_L004.scenes){
   assert.ok(scene.help?.length && scene.help.length>=2,scene.id);
   assert.ok(scene.help.every(item=>item.paragraphs.join(" ").length>=25),scene.id);
 }
 assert.deepEqual(validTeacherLesson(TEACHER_L004),[]);
});
test("opening help in a non-question scene preserves progress without fabricating evidence",()=>{
 let p=selectTeacherScene(TEACHER_L004,initialTeacherProgress(TEACHER_L004),"introduction");
 p=openTeacherHelp(TEACHER_L004,p,"example");
 assert.equal(p.helpSelections?.introduction,"example");
 assert.deepEqual(p.hints,[]);
 assert.equal(teacherEvidence(TEACHER_L004,p).independent.length,0);
 assert.equal(validTeacherProgress(p),true);
 assert.equal(openTeacherHelp(TEACHER_L004,p,"example"),p);
 assert.equal(openTeacherHelp(TEACHER_L004,p,"invalid"),p);
 assert.equal(openTeacherHelp(TEACHER_L004,pauseTeacher(p),"simplify").paused,true);
});
test("getting contextual help before answering disqualifies only first-try independence",()=>{
 let p=selectTeacherScene(TEACHER_L004,initialTeacherProgress(TEACHER_L004),"independent");
 p=openTeacherHelp(TEACHER_L004,p,"simplify");
 assert.ok(p.hints.includes("independent"));
 p=answerTeacher(TEACHER_L004,p,"c",at);
 assert.equal(p.answers.independent?.correct,true);
 assert.equal(p.answers.independent?.independent,false);
 assert.equal(teacherEvidence(TEACHER_L004,p).independent.length,0);
 assert.equal(validTeacherProgress(p),true);
});
test("looking up an explanation after a correct independent first attempt never revokes its evidence",()=>{
 let p=selectTeacherScene(TEACHER_L004,initialTeacherProgress(TEACHER_L004),"independent");
 p=answerTeacher(TEACHER_L004,p,"c",at);
 assert.equal(p.answers.independent?.independent,true);
 p=openTeacherHelp(TEACHER_L004,p,"compare");
 assert.equal(p.helpSelections?.independent,"compare");
 assert.equal(p.answers.independent?.independent,true);
 assert.equal(teacherEvidence(TEACHER_L004,p).independent.length,1);
});
test("old stored states without help remain valid; malformed option selections are rejected",()=>{
 const state=initialTeacherProgress(TEACHER_L004);
 assert.equal(validTeacherProgress(state),true);
 assert.equal(validTeacherProgress({...state,helpSelections:undefined}),true);
 assert.equal(validTeacherProgress({...state,helpSelections:{independent:"compare"}}),true);
 assert.equal(validTeacherProgress({...state,helpSelections:{independent:999}}),false);
 assert.equal(validTeacherProgress({...state,helpSelections:Array(40).fill("foo")}),false);
});

test("historical L004 teacher completion is not updated without new writing",()=>{
 const previous="2026-11-12T12:15:00Z";
 let old={...initialTeacherProgress(TEACHER_L004),completedAt:previous};
 for(const scene of TEACHER_L004.scenes){
  old=selectTeacherScene(TEACHER_L004,old,scene.id);
  if(scene.question)old=answerTeacher(TEACHER_L004,old,scene.question.correctId,at);
 }
 assert.equal(teacherCurrentCompletion(TEACHER_L004,old),false);
 assert.equal(teacherCanComplete(TEACHER_L004,old),false);
 assert.equal(finishTeacher(TEACHER_L004,old,at),old);
 for(const scene of TEACHER_L004.scenes){
  if(!scene.written)continue;
  old=selectTeacherScene(TEACHER_L004,old,scene.id);
  old=answerTeacherWritten(TEACHER_L004,old,scene.written.accepted[0]!,at);
 }
 assert.equal(teacherCanComplete(TEACHER_L004,old),true);
 const updated=finishTeacher(TEACHER_L004,old,at);
 assert.equal(updated.completedAt,previous);
 assert.equal(updated.completedContentRevision,TEACHER_L004.contentRevision);
 assert.equal(updated.completedRevisionAt,at);
 assert.equal(teacherCurrentCompletion(TEACHER_L004,updated),true);
 assert.equal(validTeacherProgress(updated),true);
 assert.equal(finishTeacher(TEACHER_L004,updated,at),updated);
});
test("old backups stay valid; an unpaired or fabricated revision completion does not",()=>{
 const old=initialTeacherProgress(TEACHER_L004);
 assert.equal(validTeacherProgress(old),true);
 assert.equal(validTeacherProgress({...old,completedContentRevision:"l004-free-recall-v1"}),false);
 assert.equal(validTeacherProgress({...old,completedRevisionAt:at}),false);
 assert.equal(validTeacherProgress({...old,completedContentRevision:"l004-free-recall-v1",completedRevisionAt:at}),false);
});
