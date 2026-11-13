import test from "node:test";
import assert from "node:assert/strict";
import {
  confirmTeacherActivity, emptyTeacherSession, finishTeacherSession,
  independentTeacherEvidence, markTeacherHelp, moveTeacherScene,
  parseTeacherSessions, submitTeacherAnswer, teacherCanFinish,
  validTeacherSessionMap, evaluateTeacherAnswer,
} from "../src/features/los/teacher/engine.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import { getLosTeacherLesson } from "../src/features/los/teacher/lessonL004.ts";
import { LOS1_L012_TEACHER } from "../src/features/los/teacher/lessonL012.ts";
import { LOS1_L011_TEACHER } from "../src/features/los/teacher/lessonL011.ts";
import { getLosOpenDialogue } from "../src/features/los/content/los1OpenDialogues.ts";

const lesson=LOS1_L012_TEACHER;
const now="2026-11-13T14:10:00.000Z";
function prepared(){
  let s=emptyTeacherSession(lesson,now);
  for(const scene of lesson.scenes){
    s=moveTeacherScene(s,lesson,scene.id,now);
    if(scene.question){
      const q=scene.question;
      s=submitTeacherAnswer(s,lesson,scene.id,q.type==="choice"?q.correctOption!:q.accepted![0]!,now);
    }
  }
  for(const id of lesson.requiredActivityIds)s=confirmTeacherActivity(s,lesson,id,now);
  return s;
}

test("L012 is a valid C03 Teacher manuscript, 14 scenes, two genuine prechecks and three study actions",()=>{
  assert.equal(getLosTeacherLesson("L012"),lesson);
  assert.equal(lesson.bookId,1);
  assert.equal(lesson.chapterId,"03");
  assert.equal(lesson.scenes.length,14);
  assert.deepEqual(validateTeacherLesson(lesson),[]);
  assert.deepEqual(lesson.requiredQuestionIds,["pre-country","pre-place","guided","independent","exit"]);
  assert.deepEqual(lesson.requiredActivityIds,["vocabulary-read","culture-read","text-a-scanned"]);
  assert.deepEqual(lesson.requiredPracticeIds,[]);
  assert.equal(lesson.scenes.find(x=>x.id==="board")?.board?.length,6);
  const links=lesson.scenes.flatMap(x=>x.bookLinks??[]);
  for(const section of ["vocabulary","culture","text"])assert.ok(links.some(l=>l.section===section));
  assert.ok(links.every(l=>l.chapterId==="03"));
});

test("C03's actual source is eight-turn Lisa Müller M-WB-07, not the superseded Berna interview",()=>{
  const src=getLosOpenDialogue("03");
  assert.ok(src);
  assert.equal(src.sourceId,"M-WB-07");
  assert.equal(src.originalLines.length,8);
  assert.ok(src.originalLines[6]?.text.includes("Österreich"));
  assert.ok(src.originalLines[7]?.text.includes("aus Deutschland"));
  assert.ok(src.originalLines[7]?.text.includes("in Bern"));
  assert.ok(lesson.scenes.find(x=>x.id==="source")?.paragraphs.some(x=>x.includes("M-WB-07")));
  assert.ok(lesson.scenes.some(x=>x.paragraphs.some(p=>p.includes("äänitettä"))));
});

test("L012 completion requires actual visits, prechecks and source-study confirmations",()=>{
  const s=prepared();
  assert.equal(s.attempts.length,5);
  assert.equal(independentTeacherEvidence(s,lesson),3);
  assert.equal(teacherCanFinish(s,lesson,{}),true);
  assert.equal(finishTeacherSession(s,lesson,{},now).completedAt,now);
  for(const id of lesson.requiredActivityIds)
    assert.equal(teacherCanFinish({...s,activityIds:s.activityIds.filter(x=>x!==id)},lesson,{}),false);
  assert.equal(teacherCanFinish({...s,visitedIds:s.visitedIds.filter(x=>x!=="source")},lesson,{}),false);
  assert.equal(teacherCanFinish({...s,attempts:s.attempts.filter(x=>x.sceneId!=="pre-place")},lesson,{}),false);
});

test("L012 aided answers and wrong country names never count as first-try independent skill",()=>{
  const q=lesson.scenes.find(x=>x.id==="independent")!.question!;
  assert.equal(evaluateTeacherAnswer(q,"Österreich"),true);
  assert.equal(evaluateTeacherAnswer(q,"Osterreich"),false);
  assert.equal(evaluateTeacherAnswer(q,"Deutschland"),false);
  let aided=emptyTeacherSession(lesson,now);
  aided=markTeacherHelp(aided,"independent",now);
  aided=submitTeacherAnswer(aided,lesson,"independent","Österreich",now);
  aided=submitTeacherAnswer(aided,lesson,"application","a",now);
  aided=submitTeacherAnswer(aided,lesson,"exit","a",now);
  assert.equal(aided.attempts[0]?.independent,false);
  assert.equal(independentTeacherEvidence(aided,lesson),2);
});

test("L012 backup stays independent from L011 and rejects cross-chapter source links",()=>{
  const map={L011:emptyTeacherSession(LOS1_L011_TEACHER,now),L012:finishTeacherSession(prepared(),lesson,{},now)};
  assert.equal(validTeacherSessionMap(map),true);
  const restored=parseTeacherSessions(JSON.parse(JSON.stringify(map)));
  assert.equal(restored.L011?.completedAt,null);
  assert.equal(restored.L012?.completedAt,now);
  const broken=validateTeacherLesson({...lesson,scenes:lesson.scenes.map(s=>s.id==="source"?
    {...s,bookLinks:[{chapterId:"02",section:"text",label:"Wrong",instruction:"Wrong"}]}:s)});
  assert.ok(broken.some(x=>x.problem.includes("väärään kappaleeseen")));
});
