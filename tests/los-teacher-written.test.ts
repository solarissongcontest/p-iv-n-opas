import {test} from "node:test";
import {strict as assert} from "node:assert";
import {TEACHER_L004} from "../src/features/los/teacher/content/l004.ts";
import {
 initialTeacherProgress,selectTeacherScene,draftTeacherWritten,answerTeacherWritten,
 revealTeacherWritten,teacherEvidence,hintTeacher,openTeacherHelp,validTeacherProgress,
 normalizeTeacherWritten,validTeacherLesson,teacherCanComplete,answerTeacher
} from "../src/features/los/teacher/core.ts";

const at="2026-11-13T12:00:00Z";
const start=(scene:string)=>selectTeacherScene(TEACHER_L004,initialTeacherProgress(TEACHER_L004),scene);

test("three authored written recalls preserve old nine scene and multiple-choice IDs",()=>{
 assert.equal(TEACHER_L004.scenes.length,9);
 assert.deepEqual(validTeacherLesson(TEACHER_L004),[]);
 assert.deepEqual(TEACHER_L004.scenes.filter(s=>s.written).map(s=>s.id),
  ["independent","application","exit"]);
 assert.equal(TEACHER_L004.review,"draft");
 assert.equal(teacherEvidence(TEACHER_L004,initialTeacherProgress(TEACHER_L004)).writtenRequired,3);
});

test("the two genuine evening greetings are accepted with insignificant punctuation differences",()=>{
 for(const answer of ["Guten Abend!","guten abend","  GUTEN  ABEND.  ","Hallo","hallo!"]){
  let p=start("independent");
  p=answerTeacherWritten(TEACHER_L004,p,answer,at);
  assert.equal(p.answers["independent-written"]?.correct,true,answer);
  assert.equal(p.answers["independent-written"]?.independent,true,answer);
  assert.deepEqual(teacherEvidence(TEACHER_L004,p).writtenIndependent,["independent"]);
 }
 for(const wrong of ["Gute Nacht!","Guten Morgen!","Tschüss!","Guten Abend! Gute Nacht!"]){
  const p=answerTeacherWritten(TEACHER_L004,start("independent"),wrong,at);
  assert.equal(p.answers["independent-written"]?.correct,false,wrong);
 }
 assert.equal(normalizeTeacherWritten(" GUTEN   ABEND!! "),"guten abend");
});

test("formal farewell and bedtime use exactly their taught context-specific answers",()=>{
 const examples=[
  ["application","Auf Wiedersehen!","Tschüss!"],
  ["exit","Gute Nacht!","Guten Abend!"]
 ] as const;
 for(const [scene,correct,wrong] of examples){
  const yes=answerTeacherWritten(TEACHER_L004,start(scene),correct,at);
  assert.equal(yes.answers[scene+"-written"]?.correct,true);
  const no=answerTeacherWritten(TEACHER_L004,start(scene),wrong,at);
  assert.equal(no.answers[scene+"-written"]?.correct,false);
  assert.equal(teacherEvidence(TEACHER_L004,no).writtenIndependent.length,0);
 }
});

test("a written draft persists as part of validated progress without scoring it",()=>{
 const initial=start("independent");
 const typed=draftTeacherWritten(TEACHER_L004,initial,"Guten Abe");
 assert.equal(typed.writtenDrafts?.independent,"Guten Abe");
 assert.equal(validTeacherProgress(typed),true);
 assert.equal(teacherEvidence(TEACHER_L004,typed).writtenIndependent.length,0);
 assert.equal(answerTeacherWritten(TEACHER_L004,typed,"   ",at),typed);
 assert.equal(draftTeacherWritten(TEACHER_L004,typed,"x".repeat(41)),typed);
 assert.equal(validTeacherProgress({...typed,writtenDrafts:{independent:"x".repeat(41)}}),false);
 assert.equal(validTeacherProgress(initial),true);
});

test("after mistakes or help, writing correctly cannot be retroactively called independent",()=>{
 let p=start("independent");
 p=answerTeacherWritten(TEACHER_L004,p,"Gute Nacht!",at);
 p=answerTeacherWritten(TEACHER_L004,p,"Hallo!",at);
 assert.equal(p.answers["independent-written"]?.correct,true);
 assert.equal(p.answers["independent-written"]?.count,2);
 assert.equal(p.answers["independent-written"]?.independent,false);
 let q=start("application");
 q=hintTeacher(TEACHER_L004,q);
 q=answerTeacherWritten(TEACHER_L004,q,"Auf Wiedersehen!",at);
 assert.equal(q.answers["application-written"]?.independent,false);
 let r=start("exit");
 r=openTeacherHelp(TEACHER_L004,r,"steps");
 r=answerTeacherWritten(TEACHER_L004,r,"Gute Nacht!",at);
 assert.equal(r.answers["exit-written"]?.independent,false);
});

test("showing the answer cannot create skill evidence or be answered over",()=>{
 const p=revealTeacherWritten(TEACHER_L004,start("exit"),at);
 assert.equal(p.answers["exit-written"]?.revealed,true);
 assert.equal(p.answers["exit-written"]?.independent,false);
 assert.equal(answerTeacherWritten(TEACHER_L004,p,"Gute Nacht!",at),p);
 assert.equal(teacherEvidence(TEACHER_L004,p).writtenIndependent.length,0);
});

test("old multiple choice evidence is retained, but cannot substitute for typed recall",()=>{
 let p=start("independent");
 p=answerTeacher(TEACHER_L004,p,"c",at);
 assert.equal(p.answers.independent?.independent,true);
 assert.equal(p.answers["independent-written"],undefined);
 assert.deepEqual(teacherEvidence(TEACHER_L004,p).independent,["independent"]);
 assert.deepEqual(teacherEvidence(TEACHER_L004,p).writtenIndependent,[]);
 assert.equal(teacherCanComplete(TEACHER_L004,p),false);
});

test("a choice after a written answer is practice, not a second independent demonstration",()=>{
 for(const [scene,typed,choice] of [
  ["independent","Hallo!","c"],
  ["application","Auf Wiedersehen!","a"],
  ["exit","Gute Nacht!","c"]
 ] as const){
  let p=start(scene);
  p=answerTeacherWritten(TEACHER_L004,p,typed,at);
  assert.equal(p.answers[scene+"-written"]?.independent,true,scene);
  p=answerTeacher(TEACHER_L004,p,choice,at);
  assert.equal(p.answers[scene]?.correct,true,scene);
  assert.equal(p.answers[scene]?.independent,false,scene);
  assert.deepEqual(teacherEvidence(TEACHER_L004,p).writtenIndependent,[scene]);
  assert.deepEqual(teacherEvidence(TEACHER_L004,p).independent,[]);
 }
 // A historical MC-only response remains untouched without a written attempt.
 const old=answerTeacher(TEACHER_L004,start("independent"),"c",at);
 assert.equal(old.answers.independent?.independent,true);
});
test("a written mistake or shown answer also disqualifies downstream choice independence",()=>{
 let p=start("application");
 p=answerTeacherWritten(TEACHER_L004,p,"Tschüss!",at);
 p=answerTeacher(TEACHER_L004,p,"a",at);
 assert.equal(p.answers.application?.independent,false);
 let q=start("exit");
 q=revealTeacherWritten(TEACHER_L004,q,at);
 q=answerTeacher(TEACHER_L004,q,"c",at);
 assert.equal(q.answers.exit?.independent,false);
});

test("a previous choice answer prevents double-counting later written recall",()=>{
 for(const [scene,choice,typed] of [
  ["independent","c","Hallo!"],
  ["application","a","Auf Wiedersehen!"],
  ["exit","c","Gute Nacht!"]
 ] as const){
  let p=start(scene);
  p=answerTeacher(TEACHER_L004,p,choice,at);
  assert.equal(p.answers[scene]?.independent,true);
  p=answerTeacherWritten(TEACHER_L004,p,typed,at);
  assert.equal(p.answers[scene+"-written"]?.correct,true);
  assert.equal(p.answers[scene+"-written"]?.independent,false);
  assert.deepEqual(teacherEvidence(TEACHER_L004,p).writtenIndependent,[]);
  assert.deepEqual(teacherEvidence(TEACHER_L004,p).independent,[scene]);
 }
});
