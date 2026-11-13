import test from "node:test";
import assert from "node:assert/strict";
import {
  confirmTeacherActivity, emptyTeacherSession, evaluateTeacherAnswer,
  finishTeacherSession, independentTeacherEvidence, markTeacherHelp,
  moveTeacherScene, normalizeTeacherAnswer, parseTeacherSessions,
  submitTeacherAnswer, teacherCanFinish, validTeacherSessionMap,
} from "../src/features/los/teacher/engine.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import { getLosTeacherLesson } from "../src/features/los/teacher/lessonL004.ts";
import { LOS1_L009_TEACHER } from "../src/features/los/teacher/lessonL009.ts";
import { LOS1_L008_TEACHER } from "../src/features/los/teacher/lessonL008.ts";
import { losExercisesFor } from "../src/features/los/exerciseBank.ts";

const lesson=LOS1_L009_TEACHER;
const now="2026-11-13T12:55:00.000Z";
const ids=["C02-EX-03","C02-EX-04","C02-EX-05","C02-EX-06"] as const;
const answers:Record<string,string>={ "C02-EX-03":"heiße","C02-EX-04":"heißt",
  "C02-EX-05":"bin","C02-EX-06":"bist" };

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

test("L009 is a real 15-scene C02 Teacher 2.0 lesson teaching the four ich/du verb forms",()=>{
  assert.equal(getLosTeacherLesson("L009"),lesson);
  assert.equal(lesson.chapterId,"02");
  assert.equal(lesson.bookId,1);
  assert.equal(lesson.scenes.length,15);
  assert.deepEqual(validateTeacherLesson(lesson),[]);
  assert.deepEqual(lesson.requiredQuestionIds,
    ["pre-heissen","pre-sein","guided-heissen","guided-sein","transfer","exit"]);
  assert.deepEqual(lesson.requiredActivityIds,["grammar-reviewed","practice-reviewed","own-dialogue"]);
  assert.equal(lesson.scenes.find(x=>x.id==="board")?.board?.length,5);
  assert.ok(lesson.scenes.some(x=>x.bookLinks?.some(link=>link.section==="grammar")));
  assert.ok(lesson.scenes.some(x=>x.bookLinks?.some(link=>link.section==="practice")));
  assert.ok(lesson.scenes.flatMap(x=>x.bookLinks??[]).every(link=>link.chapterId==="02"));
  assert.equal(lesson.scenes.find(x=>x.id==="transfer")?.question?.evidenceRole,"independent");
});

test("L009 workbook requirements are precisely four canonical C02 grammar fills",()=>{
  assert.deepEqual(lesson.requiredPracticeIds,ids);
  assert.deepEqual(lesson.requiredCheckedIds,undefined);
  const exercises=Object.fromEntries(losExercisesFor("02").map(x=>[x.id,x]));
  for(const id of ids){
    assert.equal(exercises[id]?.kind,"fill");
    assert.equal(exercises[id]?.skill,"kielioppi");
    assert.equal(exercises[id]?.correct,answers[id]);
  }
});

test("L009 refuses completion until all four book answers and all required actions exist",()=>{
  const s=prepared();
  assert.equal(s.attempts.length,6);
  assert.equal(independentTeacherEvidence(s,lesson),2);
  assert.equal(teacherCanFinish(s,lesson,{}),false);
  assert.equal(teacherCanFinish(s,lesson,{"C01-EX-03":"heiße"}),false);
  for(const id of ids){
    const reduced={...answers};
    delete reduced[id];
    assert.equal(teacherCanFinish(s,lesson,reduced),false,"Missing required book answer "+id);
    assert.equal(finishTeacherSession(s,lesson,reduced,now).completedAt,null);
  }
  assert.equal(teacherCanFinish(s,lesson,answers),true);
  assert.equal(finishTeacherSession(s,lesson,answers,now).completedAt,now);
  const inactive={...s,activityIds:s.activityIds.filter(x=>x!=="practice-reviewed")};
  assert.equal(teacherCanFinish(inactive,lesson,answers),false);
});

test("A recorded workbook value is not an independently demonstrated skill",()=>{
  const s=prepared();
  const wrong=Object.fromEntries(ids.map(id=>[id,"falsch"]));
  // The real workbook itself scores correctness. Teacher attendance only
  // checks whether book fields were actually answered, not a proficiency claim.
  assert.equal(teacherCanFinish(s,lesson,wrong),true);
  assert.equal(independentTeacherEvidence(s,lesson),2);
  assert.equal(evaluateTeacherAnswer(lesson.scenes.find(x=>x.id==="transfer")!.question!,"Du heißt Max."),false);
  assert.equal(evaluateTeacherAnswer(lesson.scenes.find(x=>x.id==="transfer")!.question!,"Du bist Max."),true);
  assert.notEqual(normalizeTeacherAnswer("heisst"),normalizeTeacherAnswer("heißt"));
  let helped=emptyTeacherSession(lesson,now);
  helped=markTeacherHelp(helped,"transfer",now);
  helped=submitTeacherAnswer(helped,lesson,"transfer","Du bist Max.",now);
  helped=submitTeacherAnswer(helped,lesson,"exit","b",now);
  assert.equal(independentTeacherEvidence(helped,lesson),1);
  assert.equal(helped.attempts[0]?.independent,false);
});

test("L009 backup serialization preserves L008 as a separate lesson",()=>{
  const existing=emptyTeacherSession(LOS1_L008_TEACHER,now);
  const completed=finishTeacherSession(prepared(),lesson,answers,now);
  const saved={L008:existing,L009:completed};
  assert.equal(validTeacherSessionMap(saved),true);
  const parsed=parseTeacherSessions(JSON.parse(JSON.stringify(saved)));
  assert.equal(parsed.L008?.completedAt,null);
  assert.equal(parsed.L009?.completedAt,now);
  assert.equal(parsed.L009?.lessonId,"L009");
  assert.deepEqual(validateTeacherLesson({...lesson,requiredPracticeIds:["C01-EX-03"]})
    .some(x=>x.location==="requiredPracticeIds"),true);
});
