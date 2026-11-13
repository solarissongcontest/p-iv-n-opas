import test from "node:test";
import assert from "node:assert/strict";
import {
  confirmTeacherActivity, emptyTeacherSession, evaluateTeacherAnswer,
  finishTeacherSession, independentTeacherEvidence, markTeacherHelp,
  moveTeacherScene, parseTeacherSessions, submitTeacherAnswer,
  teacherCanFinish, validTeacherSessionMap,
} from "../src/features/los/teacher/engine.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import { getLosTeacherLesson } from "../src/features/los/teacher/lessonL004.ts";
import { LOS1_L011_TEACHER } from "../src/features/los/teacher/lessonL011.ts";
import { LOS1_L010_TEACHER } from "../src/features/los/teacher/lessonL010.ts";
import { losExercisesFor } from "../src/features/los/exerciseBank.ts";

const lesson=LOS1_L011_TEACHER;
const now="2026-11-13T14:40:00.000Z";
const chapter={
  applicationDraft:"Ich heiße Mia.\nWie heißt du?",
  testSubmittedAt:"2026-11-13T14:33:00.000Z",
  selfAssessment:"Kysyin nimen ilman mallia. Kertaan vielä sein-verbin muodot.",
};

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

test("L011 is a 15-scene C02 Teacher chapter review grounded in its real source, application and chapter test",()=>{
  assert.equal(getLosTeacherLesson("L011"),lesson);
  assert.equal(lesson.bookId,1);
  assert.equal(lesson.chapterId,"02");
  assert.equal(lesson.scenes.length,15);
  assert.equal(lesson.estimatedMinutes,30);
  assert.deepEqual(validateTeacherLesson(lesson),[]);
  assert.deepEqual(lesson.requiredQuestionIds,
    ["pre-name","pre-form","guided","scenario","transfer","exit"]);
  assert.deepEqual(lesson.requiredActivityIds,["sources-compared","application-reviewed"]);
  assert.deepEqual(lesson.requiredChapterEvidence,
    ["application-written","test-submitted","self-assessment"]);
  assert.deepEqual(lesson.requiredPracticeIds,[]);
  const sections=lesson.scenes.flatMap(s=>s.bookLinks??[]).map(l=>l.section);
  for(const section of ["text","text-b","apply","test"])assert.ok(sections.includes(section));
  assert.ok(lesson.scenes.flatMap(s=>s.bookLinks??[]).every(l=>l.chapterId==="02"));
  assert.ok(losExercisesFor("02").length>=8);
});

test("L011 cannot finish without all three ACTUAL chapter fields including a real submitted test",()=>{
  const s=prepared();
  assert.equal(s.attempts.length,6);
  assert.equal(teacherCanFinish(s,lesson,{},[],{}),false);
  assert.equal(teacherCanFinish(s,lesson,{},[],{...chapter,testSubmittedAt:null}),false);
  assert.equal(teacherCanFinish(s,lesson,{},[],{...chapter,applicationDraft:""}),false);
  assert.equal(teacherCanFinish(s,lesson,{},[],{...chapter,selfAssessment:""}),false);
  assert.equal(teacherCanFinish(s,lesson,{},[],{...chapter,testSubmittedAt:"draft"}),false);
  assert.equal(finishTeacherSession(s,lesson,{},now,[],{...chapter,testSubmittedAt:null}).completedAt,null);
  assert.equal(teacherCanFinish(s,lesson,{},[],chapter),true);
  assert.equal(finishTeacherSession(s,lesson,{},now,[],chapter).completedAt,now);
});

test("L011 requires real teaching scene visits, six answer attempts and manual source/application work",()=>{
  const s=prepared();
  const droppedVisit={...s,visitedIds:s.visitedIds.filter(x=>x!=="chapter-test")};
  assert.equal(teacherCanFinish(droppedVisit,lesson,{},[],chapter),false);
  const droppedAttempt={...s,attempts:s.attempts.filter(x=>x.sceneId!=="pre-form")};
  assert.equal(teacherCanFinish(droppedAttempt,lesson,{},[],chapter),false);
  const droppedActivity={...s,activityIds:s.activityIds.filter(x=>x!=="application-reviewed")};
  assert.equal(teacherCanFinish(droppedActivity,lesson,{},[],chapter),false);
  assert.equal(independentTeacherEvidence(s,lesson),3);
});

test("L011 does not misrepresent checked workbook, aided answers or self-assessed writing as mastered skills",()=>{
  const s=prepared();
  assert.equal(independentTeacherEvidence(s,lesson),3);
  const q=lesson.scenes.find(x=>x.id==="transfer")?.question;
  assert.ok(q);
  assert.equal(evaluateTeacherAnswer(q,"Wie heißt du?"),true);
  assert.equal(evaluateTeacherAnswer(q,"Wie geht's?"),false);
  let aided=emptyTeacherSession(lesson,now);
  aided=markTeacherHelp(aided,"transfer",now);
  aided=submitTeacherAnswer(aided,lesson,"transfer","Wie heißt du?",now);
  aided=submitTeacherAnswer(aided,lesson,"scenario","b",now);
  aided=submitTeacherAnswer(aided,lesson,"exit","b",now);
  assert.equal(aided.attempts[0]?.independent,false);
  assert.equal(independentTeacherEvidence(aided,lesson),2);
  assert.ok(lesson.scenes.some(x=>x.paragraphs.some(p=>p.includes("automaattisesti")&&p.includes("testi"))));
});

test("L011 persists separately from L010 and validator rejects invalid fabricated chapter evidence",()=>{
  const preceding=emptyTeacherSession(LOS1_L010_TEACHER,now);
  const finished=finishTeacherSession(prepared(),lesson,{},now,[],chapter);
  const stored={L010:preceding,L011:finished};
  assert.equal(validTeacherSessionMap(stored),true);
  const parsed=parseTeacherSessions(JSON.parse(JSON.stringify(stored)));
  assert.equal(parsed.L010?.completedAt,null);
  assert.equal(parsed.L011?.completedAt,now);
  assert.equal(parsed.L011?.lessonId,"L011");
  for(const invalid of [
    ["test-submitted","test-submitted"],["listened-and-mastered"],
  ]){
    const issues=validateTeacherLesson({...lesson,
      requiredChapterEvidence:invalid as typeof lesson.requiredChapterEvidence});
    assert.ok(issues.some(x=>x.location==="requiredChapterEvidence"));
  }
  const bad=validateTeacherLesson({...lesson,scenes:lesson.scenes.map(s=>
    s.id==="application"?{...s,bookLinks:[{label:"Wrong",chapterId:"01",section:"apply",instruction:"Wrong"}]}:s)});
  assert.ok(bad.some(x=>x.problem.includes("väärään kappaleeseen")));
});
