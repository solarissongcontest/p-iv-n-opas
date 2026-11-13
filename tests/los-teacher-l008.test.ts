import test from "node:test";
import assert from "node:assert/strict";
import {
  confirmTeacherActivity, emptyTeacherSession, finishTeacherSession,
  independentTeacherEvidence, markTeacherHelp, moveTeacherScene,
  parseTeacherSessions, submitTeacherAnswer, teacherCanFinish,
  validTeacherSessionMap,
} from "../src/features/los/teacher/engine.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import { getLosTeacherLesson } from "../src/features/los/teacher/lessonL004.ts";
import { LOS1_L007_TEACHER } from "../src/features/los/teacher/lessonL007.ts";
import { LOS1_L008_TEACHER } from "../src/features/los/teacher/lessonL008.ts";
import { LOS1_C02_LINES, LOS1_C02_QUESTIONS } from "../src/features/los/content/los1C02.ts";

const lesson=LOS1_L008_TEACHER;
const now="2026-11-13T11:10:00.000Z";
const ids=["C02-SOURCE-Q02","C02-SOURCE-Q03","C02-SOURCE-Q04"];
const answers:Object=Object.fromEntries(LOS1_C02_QUESTIONS.slice(1,4).map(q=>[q.id,q.correctId]));

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

test("L008 is a complete 14-scene Teacher reading lesson grounded in the six authentic C02 turns",()=>{
  assert.equal(getLosTeacherLesson("L008"),lesson);
  assert.equal(lesson.id,"L008");
  assert.equal(lesson.bookId,1);
  assert.equal(lesson.chapterId,"02");
  assert.equal(lesson.scenes.length,14);
  assert.equal(LOS1_C02_LINES.length,6);
  assert.equal(LOS1_C02_LINES[0]!.speaker,"Franz");
  assert.equal(LOS1_C02_LINES[1]!.speaker,"Greta");
  assert.equal(LOS1_C02_LINES[4]!.text.includes("Bis dann!"),true);
  assert.equal(LOS1_C02_LINES[5]!.text,"Wiedersehen!");
  assert.deepEqual(validateTeacherLesson(lesson),[]);
  assert.ok(lesson.scenes.some(x=>x.bookLinks?.some(link=>link.section==="text")));
  assert.ok(lesson.scenes.some(x=>x.bookLinks?.some(link=>link.section==="understand")));
  assert.ok(lesson.scenes.flatMap(x=>x.bookLinks??[]).every(link=>link.chapterId==="02"));
});

test("L008 uses exactly three real C02 questions Q02-Q04 and never manufactures textbook results",()=>{
  assert.deepEqual(lesson.requiredCheckedIds,ids);
  assert.deepEqual(LOS1_C02_QUESTIONS.slice(1,4).map(x=>x.id),ids);
  assert.deepEqual(lesson.requiredPracticeIds,[]);
  assert.deepEqual(lesson.requiredQuestionIds,["recall","guided","speaker","independent","exit"]);
  assert.deepEqual(lesson.requiredActivityIds,["read-all-six","replies-mapped","retell-rehearsed"]);
  assert.ok(!lesson.requiredCheckedIds?.includes(LOS1_L007_TEACHER.requiredCheckedIds![0]!));
});

test("L008 completion requires checked Q02, Q03 and Q04; saving unanswered or unchecked choices never counts",()=>{
  const s=prepared();
  const recorded=answers as Record<string,string>;
  assert.equal(teacherCanFinish(s,lesson,recorded,[]),false);
  assert.equal(teacherCanFinish(s,lesson,recorded,ids.slice(0,2)),false);
  assert.equal(finishTeacherSession(s,lesson,recorded,now,ids.slice(0,2)).completedAt,null);
  for(const missing of ids){
    const reduced={...recorded};delete reduced[missing];
    assert.equal(teacherCanFinish(s,lesson,reduced,ids),false);
  }
  assert.equal(teacherCanFinish(s,lesson,recorded,ids),true);
  assert.equal(finishTeacherSession(s,lesson,recorded,now,ids).completedAt,now);
});

test("L008 is a reading lesson, not a false measurement of spoken or listening proficiency",()=>{
  const s=prepared();
  assert.equal(independentTeacherEvidence(s,lesson),2);
  assert.ok(lesson.scenes.some(x=>x.paragraphs.join(" ").includes("äänitettä")));
  assert.equal(lesson.scenes.find(x=>x.id==="rehearsal")?.question,undefined);
  let hint=emptyTeacherSession(lesson,now);
  hint=markTeacherHelp(hint,"independent",now);
  hint=submitTeacherAnswer(hint,lesson,"independent","Bis dann!",now);
  hint=submitTeacherAnswer(hint,lesson,"exit","b",now);
  assert.equal(hint.attempts[0]?.correct,true);
  assert.equal(hint.attempts[0]?.independent,false);
  assert.equal(independentTeacherEvidence(hint,lesson),1);
});

test("L008 backup serialization does not touch L007 or C01 data, and absent activity blocks completion",()=>{
  const s=prepared();
  const recorded=answers as Record<string,string>;
  const noMapping={...s,activityIds:s.activityIds.filter(id=>id!=="replies-mapped")};
  assert.equal(teacherCanFinish(noMapping,lesson,recorded,ids),false);
  const completed=finishTeacherSession(s,lesson,recorded,now,ids);
  const prev=emptyTeacherSession(LOS1_L007_TEACHER,now);
  const map={L007:prev,L008:completed};
  assert.equal(validTeacherSessionMap(map),true);
  const roundTrip=parseTeacherSessions(JSON.parse(JSON.stringify(map)));
  assert.equal(roundTrip.L008?.completedAt,now);
  assert.equal(roundTrip.L007?.completedAt,null);
  assert.equal(roundTrip.L007?.lessonId,"L007");
  assert.equal(roundTrip.L008?.lessonId,"L008");
});
