import {test} from "node:test";
import {strict as assert} from "node:assert";
import {readFileSync} from "node:fs";
import {TEACHER_L005} from "../src/features/los/teacher/content/l005.ts";
import {LOS1_TEXT_B_SOURCES} from "../src/features/los/content/los1TextBAdditional.ts";
import {
 initialTeacherProgress,validTeacherLesson,validTeacherProgress,selectTeacherScene,
 pauseTeacher,recordTeacherMedia,openTeacherHelp,answerTeacher,answerTeacherWritten,
 revealTeacher,teacherEvidence,teacherCanComplete,teacherCurrentCompletion,finishTeacher
} from "../src/features/los/teacher/core.ts";
import {emptyLosLessonProgress,losLessonFinishTeacher} from "../src/features/los/lessonEngine.ts";

const at="2026-11-13T13:40:00Z";
const lesson=TEACHER_L005;
const start=(scene:string)=>selectTeacherScene(lesson,initialTeacherProgress(lesson),scene);

test("L005 has ten authored scenes and all teacher help is substantive",()=>{
 assert.equal(lesson.id,"L005");
 assert.equal(lesson.review,"draft");
 assert.equal(lesson.contentRevision,"l005-listening-foundation-v1");
 assert.equal(lesson.mediaSourceId,"M-COM-03");
 assert.equal(lesson.scenes.length,10);
 assert.deepEqual(validTeacherLesson(lesson),[]);
 assert.ok(lesson.scenes.every(s=>s.help?.length===2));
 assert.ok(lesson.scenes.every(s=>s.help?.every(h=>h.paragraphs.every(p=>p.trim().length>=25))));
 assert.deepEqual(lesson.scenes.filter(s=>s.question).map(s=>s.id),
 ["activation","guided","independent","exit"]);
 assert.deepEqual(lesson.scenes.filter(s=>s.written).map(s=>s.id),["application"]);
});

test("real greeting audio and all twenty authored meanings stay inside LOS!",()=>{
 const source=LOS1_TEXT_B_SOURCES["01"];
 assert.equal(source.sourceId,"M-COM-03");
 assert.equal(source.transcriptIsExact,true);
 assert.equal(source.lines.length,20);
 assert.equal(source.lines[0]?.text,"Hallo!");
 assert.equal(source.lines.at(-1)?.text,"Gute Nacht!");
 assert.ok(source.lines.some(s=>s.text==="Bis später!"&&s.meaning.includes("myöhemmin")));
 const player=readFileSync("src/features/los/teacher/LosL005TeacherPlayer.tsx","utf8");
 assert.match(player,/LOS1_TEXT_B_SOURCES/);
 assert.match(player,/GREETING_SOURCE.lines.map/);
 assert.match(player,/German_Vocabulary_-_Greetings[.]ogg/);
 assert.match(player,/onPlaying/);
 assert.match(player,/onEnded/);
 assert.match(player,/onError/);
 assert.doesNotMatch(player,/speechSynthesis|SpeechRecognition|autoplay/);
});

test("a fresh media playing event is browser activity, never answer evidence",()=>{
 const initial=initialTeacherProgress(lesson);
 const playback=recordTeacherMedia(lesson,initial,"playing",at);
 assert.equal(playback.media?.sourceId,"M-COM-03");
 assert.equal(playback.media?.playingAt,at);
 assert.equal(playback.media?.endedAt,undefined);
 assert.equal(validTeacherProgress(playback),true);
 assert.equal(teacherEvidence(lesson,playback).independent.length,0);
 assert.equal(teacherEvidence(lesson,playback).writtenIndependent.length,0);
 assert.equal(teacherCanComplete(lesson,playback),false);
 assert.equal(recordTeacherMedia(lesson,playback,"playing",at),playback);
 const ended=recordTeacherMedia(lesson,playback,"ended",at);
 assert.equal(ended.media?.endedAt,at);
 assert.equal(teacherEvidence(lesson,ended).independent.length,0);
 assert.equal(teacherCurrentCompletion(lesson,ended),false);
});

test("browser-ended signal without a recorded playing signal is rejected",()=>{
 const initial=initialTeacherProgress(lesson);
 assert.equal(recordTeacherMedia(lesson,initial,"ended",at),initial);
 const paused=pauseTeacher(initial);
 assert.equal(recordTeacherMedia(lesson,paused,"playing",at),paused);
 assert.equal(validTeacherProgress({...initial,media:{sourceId:"M-COM-03",endedAt:at}}),false);
 assert.equal(validTeacherProgress({...initial,media:{sourceId:"fake",playingAt:"not a date"}}),false);
});

test("opening the complete transcript marks optional text support, not listening",()=>{
 let p=start("listening");
 p=recordTeacherMedia(lesson,p,"transcript",at);
 assert.equal(p.media?.textOpenedAt,at);
 assert.ok(p.hints.includes("independent"));
 assert.ok(p.hints.includes("application"));
 assert.ok(p.hints.includes("exit"));
 assert.equal(teacherEvidence(lesson,p).independent.length,0);
 p=selectTeacherScene(lesson,p,"independent");
 p=answerTeacher(lesson,p,"b",at);
 assert.equal(p.answers.independent?.correct,true);
 assert.equal(p.answers.independent?.independent,false);
 assert.equal(validTeacherProgress(p),true);
});

test("independent responses may be recorded without audio but cannot become listening grades",()=>{
 let p=start("independent");
 p=answerTeacher(lesson,p,"b",at);
 assert.equal(p.answers.independent?.correct,true);
 assert.equal(p.answers.independent?.independent,true);
 assert.equal(p.media,undefined);
 assert.deepEqual(teacherEvidence(lesson,p).independent,["independent"]);
 p=selectTeacherScene(lesson,p,"application");
 p=answerTeacherWritten(lesson,p,"Bis später!",at);
 assert.equal(p.answers["application-written"]?.correct,true);
 assert.deepEqual(teacherEvidence(lesson,p).writtenIndependent,["application"]);
 assert.equal(p.media,undefined);
});

test("all questions can be attempted with text-only fallback; lesson completion is not listening proficiency",()=>{
 let p=initialTeacherProgress(lesson);
 for(const scene of lesson.scenes){
  p=selectTeacherScene(lesson,p,scene.id);
  if(scene.written)p=answerTeacherWritten(lesson,p,"ei osaa",at);
  if(scene.question)p=answerTeacher(lesson,p,scene.question.choices.find(c=>c.id!==scene.question?.correctId)!.id,at);
 }
 assert.equal(teacherCanComplete(lesson,p),true);
 assert.equal(p.media,undefined);
 assert.equal(teacherEvidence(lesson,p).independent.length,0);
 const done=finishTeacher(lesson,p,at);
 assert.equal(teacherCurrentCompletion(lesson,done),true);
 assert.equal(done.media,undefined);
 assert.equal(done.completedContentRevision,"l005-listening-foundation-v1");
 assert.equal(validTeacherProgress(done),true);
});

test("previous L005 legacy records remain intact when new teacher script is completed",()=>{
 const old={...emptyLosLessonProgress(),completedAt:"2026-10-10T10:00:00Z",
  exitAnswer:"a",exitCheckedAt:"2026-10-10T10:00:00Z",completedStepIds:["greetings"]};
 let p=initialTeacherProgress(lesson);
 for(const scene of lesson.scenes){
  p=selectTeacherScene(lesson,p,scene.id);
  if(scene.written)p=answerTeacherWritten(lesson,p,"ei osaa",at);
  if(scene.question)p=revealTeacher(lesson,p,at);
 }
 const done=losLessonFinishTeacher(lesson,{...old,teacher:p},at);
 assert.equal(done.completedAt,old.completedAt);
 assert.equal(done.exitAnswer,old.exitAnswer);
 assert.deepEqual(done.completedStepIds,old.completedStepIds);
 assert.equal(done.teacher?.completedContentRevision,"l005-listening-foundation-v1");
 assert.equal(done.teacher?.completedAt,at);
 assert.equal(validTeacherProgress(done.teacher),true);
});

test("contextual help remains optional but invalidates only future blind first attempts",()=>{
 let p=start("independent");
 p=openTeacherHelp(lesson,p,"simplify");
 assert.ok(p.hints.includes("independent"));
 p=answerTeacher(lesson,p,"b",at);
 assert.equal(p.answers.independent?.independent,false);
 const before=answerTeacher(lesson,start("exit"),"b",at);
 const after=openTeacherHelp(lesson,before,"example");
 assert.equal(after.answers.exit?.independent,true);
 assert.equal(teacherEvidence(lesson,after).independent.length,1);
});
