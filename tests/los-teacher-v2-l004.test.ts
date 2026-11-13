import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {LOS_1_LESSONS} from "../src/features/los/learningPath.ts";
import {LOS1_C01_LESSON_BLUEPRINTS} from "../src/features/los/lessonEngine.ts";
import {LOS1_L004_TEACHER_LESSON as lesson} from "../src/features/los/teacher/content/L004.ts";
import {
  canCoverTeacherLesson,emptyTeacherProgress,parseTeacherProgress,teacherAnswer,
  teacherIndependentAnswers,teacherMarkCovered,teacherRequestHelp,
  teacherRevealSolution,teacherSelectScene,validateTeacherLesson,
} from "../src/features/los/teacher/core.ts";
const now="2026-11-13T07:00:00.000Z";

test("L004 is a complete independent teacher-led script aligned to canonical first book",()=>{
 assert.deepEqual(validateTeacherLesson(lesson),[]);
 assert.equal(lesson.id,"L004");
 assert.equal(lesson.title,LOS_1_LESSONS[3]?.title);
 assert.equal(lesson.bookId,1);
 assert.equal(lesson.chapterId,"01");
 assert.equal(lesson.scenes.length,10);
 assert.deepEqual(lesson.scenes.map(s=>s.phase),[
  "introduction","activation","introduction","explanation","example",
  "guided","independent","application","review","summary",
 ]);
 const questions=lesson.scenes.flatMap(s=>s.question?[s.question]:[]);
 assert.equal(questions.length,5);
 assert.equal(new Set(questions.map(q=>q.id)).size,5);
 assert.ok(lesson.scenes.some(s=>s.board?.length===4));
 assert.ok(lesson.scenes.every(s=>s.paragraphs.length&&s.help.simpler&&
  s.help.anotherExample&&s.help.why));
 assert.equal(LOS1_C01_LESSON_BLUEPRINTS[3]?.contentVersion,"1.0.0");
 assert.notEqual(lesson.contentVersion,"1.0.0");
});

test("L004 incorrect answers produce progressive targeted feedback, never unearned mastery",()=>{
 let s=emptyTeacherProgress(lesson);
 const q="L004-Q-GUIDED";
 s=teacherAnswer(s,lesson,q,"a");
 assert.equal(s.answers[q]?.attempts,1);
 assert.equal(s.answers[q]?.status,"hint");
 assert.equal(s.answers[q]?.independentCorrect,false);
 s=teacherAnswer(s,lesson,q,"b");
 assert.equal(s.answers[q]?.status,"remediation");
 s=teacherAnswer(s,lesson,q,"a");
 assert.equal(s.answers[q]?.status,"solution");
 assert.equal(s.answers[q]?.attempts,3);
 assert.equal(teacherAnswer(s,lesson,q,"c"),s,"no fourth attempt or phantom score");
 assert.equal(canCoverTeacherLesson(s,lesson),false);
 assert.equal(teacherMarkCovered(s,lesson,now).coveredAt,null);
});

test("requesting teacher help removes independent-first-attempt evidence without preventing continuation",()=>{
 let s=emptyTeacherProgress(lesson);
 s=teacherSelectScene(s,lesson,"farewell");
 s=teacherRequestHelp(s,lesson);
 assert.equal(s.answers["L004-Q-INDEPENDENT"]?.usedHelp,true);
 s=teacherAnswer(s,lesson,"L004-Q-INDEPENDENT","a");
 assert.equal(s.answers["L004-Q-INDEPENDENT"]?.status,"correct");
 assert.equal(s.answers["L004-Q-INDEPENDENT"]?.independentCorrect,false);
 assert.equal(teacherIndependentAnswers(s,lesson),0);
 s=teacherSelectScene(s,lesson,"application");
 s=teacherAnswer(s,lesson,"L004-Q-TRANSFER","b");
 assert.equal(s.answers["L004-Q-TRANSFER"]?.independentCorrect,true);
 assert.equal(teacherIndependentAnswers(s,lesson),1);
});

test("freely browsing lessons is not proof of understanding, while completing all content is recorded separately",()=>{
 let s=emptyTeacherProgress(lesson);
 for(const scene of lesson.scenes)s=teacherSelectScene(s,lesson,scene.id);
 assert.equal(canCoverTeacherLesson(s,lesson),false,"navigation alone never covers exercises");
 assert.equal(teacherMarkCovered(s,lesson,now).coveredAt,null);
 for(const scene of lesson.scenes){
  if(!scene.question)continue;
  s=teacherAnswer(s,lesson,scene.question.id,scene.question.correctId);
 }
 assert.equal(canCoverTeacherLesson(s,lesson),true);
 assert.equal(teacherIndependentAnswers(s,lesson),3);
 s=teacherMarkCovered(s,lesson,now);
 assert.equal(s.coveredAt,now);
 assert.equal(teacherMarkCovered(s,lesson,"2026-11-14T07:00:00.000Z").coveredAt,now);
 assert.equal(parseTeacherProgress(JSON.stringify(s),lesson).coveredAt,now);
});

test("revealing answers permits completion of teaching, but is not autonomous mastery evidence",()=>{
 let s=emptyTeacherProgress(lesson);
 for(const scene of lesson.scenes){
  s=teacherSelectScene(s,lesson,scene.id);
  if(scene.question)s=teacherRevealSolution(s,lesson);
 }
 assert.ok(canCoverTeacherLesson(s,lesson));
 assert.equal(teacherIndependentAnswers(s,lesson),0);
 for(const answer of Object.values(s.answers)){
  assert.equal(answer.status,"solution");
  assert.equal(answer.usedHelp,true);
 }
 assert.equal(teacherMarkCovered(s,lesson,now).coveredAt,now);
});

test("local state parser is versioned, sanitizes arbitrary IDs and never imports prior L004 mastery",()=>{
 const blank=emptyTeacherProgress(lesson);
 assert.deepEqual(parseTeacherProgress(null,lesson),blank);
 assert.deepEqual(parseTeacherProgress("{broken",lesson),blank);
 assert.deepEqual(parseTeacherProgress(JSON.stringify({...blank,contentVersion:"1.0.0"}),lesson),blank);
 const invalid={...blank,sceneId:"does-not-exist",visitedSceneIds:["does-not-exist","start","start"],
   answers:{"L004-Q-EXIT":{attempts:99,lastOption:"hacked",status:"correct",usedHelp:false,
     independentCorrect:true},"INJECTED":{attempts:1,lastOption:"a",status:"correct",usedHelp:false,independentCorrect:true}},
   coveredAt:now};
 const safe=parseTeacherProgress(JSON.stringify(invalid),lesson);
 assert.equal(safe.sceneId,"start");
 assert.deepEqual(safe.visitedSceneIds,["start"]);
 assert.deepEqual(safe.answers,{});
 assert.equal(safe.coveredAt,null);
 const component=readFileSync("src/features/los/teacher/LosTeacherL004Player.tsx","utf8");
 assert.match(component,/los\.teacher\.v2\./);
 assert.match(component,/getDeviceOwnerId/);
 assert.doesNotMatch(component,/lessonProgress\?\.|setExerciseAnswer|markComplete|gemini|openai|speechRecognition/i);
 assert.match(component,/target="_blank" rel="noopener noreferrer"/);
});
