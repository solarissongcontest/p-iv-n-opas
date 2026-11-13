import test from "node:test";
import assert from "node:assert/strict";
import {
  confirmTeacherActivity, emptyTeacherSession, finishTeacherSession,
  independentTeacherEvidence, markTeacherHelp, moveTeacherScene,
  submitTeacherAnswer, teacherCanFinish, parseTeacherSessions, validTeacherSessionMap, type TeacherSession,
} from "../src/features/los/teacher/engine.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import { getLosTeacherLesson } from "../src/features/los/teacher/lessonL004.ts";
import { LOS1_L007_TEACHER } from "../src/features/los/teacher/lessonL007.ts";
import { LOS1_C02_LINES, LOS1_C02_QUESTIONS } from "../src/features/los/content/los1C02.ts";
import { LOS1_M_COM_02_LINES } from "../src/features/los/content/los1MCom02.ts";

const lesson=LOS1_L007_TEACHER;
const now="2026-11-13T10:00:00.000Z";
const check="C02-SOURCE-Q01";
const reader={ [check]:"a" };

function prepared(){
  let s=emptyTeacherSession(lesson,now);
  for(const scene of lesson.scenes){
    s=moveTeacherScene(s,lesson,scene.id,now);
    if(scene.question){
      const q=scene.question;
      s=submitTeacherAnswer(s,lesson,scene.id,
        q.type==="choice"?q.correctOption!:q.accepted![0]!,now);
    }
  }
  for(const id of lesson.requiredActivityIds)
    s=confirmTeacherActivity(s,lesson,id,now);
  return s;
}

test("L007 is a complete C02 Teacher 2.0 manuscript grounded in the genuine six-turn Franz/Greta text",()=>{
  assert.equal(getLosTeacherLesson("L007"),lesson);
  assert.equal(lesson.bookId,1);
  assert.equal(lesson.chapterId,"02");
  assert.equal(lesson.scenes.length,14);
  assert.deepEqual(validateTeacherLesson(lesson),[]);
  assert.deepEqual(lesson.requiredQuestionIds,["pre-name","pre-form","guided","independent","exit"]);
  assert.deepEqual(lesson.requiredCheckedIds,[LOS1_C02_QUESTIONS[0]!.id]);
  assert.equal(LOS1_C02_LINES.length,6);
  assert.ok(LOS1_C02_LINES[0]!.text.includes("Wie heißt du?"));
  assert.equal(LOS1_M_COM_02_LINES.length,4);
  assert.ok(lesson.scenes.some(scene=>scene.bookLinks?.some(link=>link.section==="text-b")));
  for(const section of ["text","vocabulary","grammar","understand"])
    assert.ok(lesson.scenes.some(scene=>scene.bookLinks?.some(link=>link.section===section)));
  assert.ok(lesson.scenes.flatMap(scene=>scene.bookLinks??[]).every(link=>link.chapterId==="02"));
});

test("L007 only completes after checking the real C02 book answer and doing the actual study actions",()=>{
  const s=prepared();
  assert.equal(s.attempts.length,5);
  assert.equal(independentTeacherEvidence(s,lesson),2);
  assert.equal(teacherCanFinish(s,lesson,reader),false);
  assert.equal(teacherCanFinish(s,lesson,reader,["C01-SOURCE-Q01"]),false);
  assert.equal(teacherCanFinish(s,lesson,{},[check]),false);
  assert.equal(finishTeacherSession(s,lesson,reader,now).completedAt,null);
  assert.equal(teacherCanFinish(s,lesson,reader,[check]),true);
  assert.equal(finishTeacherSession(s,lesson,reader,now,[check]).completedAt,now);
  const missingActivity:TeacherSession={...s,activityIds:s.activityIds.filter(x=>x!=="dialogue-read")};
  assert.equal(teacherCanFinish(missingActivity,lesson,reader,[check]),false);
  const missingPre:TeacherSession={...s,attempts:s.attempts.filter(x=>x.sceneId!=="pre-name")};
  assert.equal(teacherCanFinish(missingPre,lesson,reader,[check]),false);
});

test("L007 assisted independent question is not incorrectly counted as unassisted proficiency",()=>{
  let s=emptyTeacherSession(lesson,now);
  s=markTeacherHelp(s,"independent",now);
  s=submitTeacherAnswer(s,lesson,"independent","Wie heißt du?",now);
  s=submitTeacherAnswer(s,lesson,"exit","b",now);
  assert.equal(independentTeacherEvidence(s,lesson),1);
  assert.equal(s.attempts[0]?.correct,true);
  assert.equal(s.attempts[0]?.independent,false);
  assert.ok(lesson.scenes.some(x=>x.paragraphs.join(" ").includes("iPhonella")));
});

test("L007 session persists through backup parsing without synthesizing C01 lesson progress",()=>{
  const completed=finishTeacherSession(prepared(),lesson,reader,now,[check]);
  const source={L007:completed};
  assert.equal(validTeacherSessionMap(source),true);
  const recovered=parseTeacherSessions(JSON.parse(JSON.stringify(source)));
  assert.equal(recovered.L007?.completedAt,now);
  assert.equal(recovered.L007?.lessonId,"L007");
  assert.equal(recovered.L007?.sceneId,"summary");
  // Actual C01 and C02 storage-key isolation is verified in the browser with
  // real storage APIs, so Node's unit runner never imports browser-only hooks.
});

test("Teacher validation rejects misfiled C01 IDs and links inside L007",()=>{
  const badChecked=validateTeacherLesson({...lesson,requiredCheckedIds:["C01-SOURCE-Q01"]});
  assert.ok(badChecked.some(issue=>issue.location==="requiredCheckedIds"));
  const badPractice=validateTeacherLesson({...lesson,requiredPracticeIds:["C01-EX-01"]});
  assert.ok(badPractice.some(issue=>issue.location==="requiredPracticeIds"));
  const badLinks=validateTeacherLesson({...lesson,scenes:lesson.scenes.map(scene=>
    scene.id==="source"?{...scene,bookLinks:[{label:"wrong",chapterId:"01",section:"text",instruction:"wrong"}]}:scene)});
  assert.ok(badLinks.some(issue=>issue.problem.includes("väärään kappaleeseen")));
});
