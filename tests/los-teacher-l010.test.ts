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
import { LOS1_L010_TEACHER } from "../src/features/los/teacher/lessonL010.ts";
import { LOS1_L009_TEACHER } from "../src/features/los/teacher/lessonL009.ts";
import {
  LOS1_M_COM_02_LINES, LOS1_M_COM_02_QUESTIONS, LOS1_M_COM_02_ID,
} from "../src/features/los/content/los1MCom02.ts";

const lesson=LOS1_L010_TEACHER;
const now="2026-11-13T14:00:00.000Z";
const ids=["C02-MCOM02-Q01","C02-MCOM02-Q02"];
const checkedAnswers:Record<string,string>={"C02-MCOM02-Q01":"a","C02-MCOM02-Q02":"b"};

function prepared(){
  let session=emptyTeacherSession(lesson,now);
  for(const scene of lesson.scenes){
    session=moveTeacherScene(session,lesson,scene.id,now);
    if(scene.question){
      const q=scene.question;
      session=submitTeacherAnswer(session,lesson,scene.id,
        q.type==="choice"?q.correctOption!:q.accepted![0]!,now);
    }
  }
  for(const activityId of lesson.requiredActivityIds)
    session=confirmTeacherActivity(session,lesson,activityId,now);
  return session;
}

test("L010 is a 15-scene C02 lesson grounded in the complete real four-turn Commons transcript",()=>{
  assert.equal(getLosTeacherLesson("L010"),lesson);
  assert.equal(lesson.bookId,1);
  assert.equal(lesson.chapterId,"02");
  assert.equal(lesson.scenes.length,15);
  assert.deepEqual(validateTeacherLesson(lesson),[]);
  assert.equal(LOS1_M_COM_02_ID,"M-COM-02");
  assert.equal(LOS1_M_COM_02_LINES.length,4);
  assert.deepEqual(LOS1_M_COM_02_LINES.map(x=>x.speaker),["Thomas","Takashi","Thomas","Takashi"]);
  assert.equal(LOS1_M_COM_02_LINES[2]!.text.includes("Das ist Peter."),true);
  assert.equal(LOS1_M_COM_02_LINES[2]!.text.includes("Wir kommen aus Berlin."),true);
  assert.equal(LOS1_M_COM_02_LINES[3]!.text.includes("Ich komme aus Kyoto."),true);
  assert.ok(lesson.scenes.some(s=>s.bookLinks?.some(l=>l.section==="text-b")));
  assert.ok(lesson.scenes.some(s=>s.bookLinks?.some(l=>l.section==="text")));
  assert.ok(lesson.scenes.flatMap(s=>s.bookLinks??[]).every(l=>l.chapterId==="02"));
});

test("L010 requires the two real answered AND checked Text B questions; the other two remain optional",()=>{
  assert.deepEqual(lesson.requiredCheckedIds,ids);
  assert.deepEqual(lesson.requiredPracticeIds,[]);
  assert.deepEqual(LOS1_M_COM_02_QUESTIONS.slice(0,2).map(q=>q.id),ids);
  assert.equal(LOS1_M_COM_02_QUESTIONS.length,4);
  for(const q of LOS1_M_COM_02_QUESTIONS.slice(0,2))
    assert.equal(q.correctId,checkedAnswers[q.id]);
  assert.deepEqual(lesson.requiredActivityIds,["audio-or-text","dialogues-compared","meaning-recalled"]);

  const s=prepared();
  assert.equal(s.attempts.length,6);
  assert.equal(teacherCanFinish(s,lesson,checkedAnswers,[]),false);
  assert.equal(teacherCanFinish(s,lesson,checkedAnswers,ids.slice(0,1)),false);
  assert.equal(teacherCanFinish(s,lesson,{"C02-MCOM02-Q01":"a"},ids),false);
  assert.equal(teacherCanFinish(s,lesson,{"C02-MCOM02-Q02":"b"},ids),false);
  assert.equal(teacherCanFinish(s,lesson,{"C03-MCOM02-Q01":"a","C03-MCOM02-Q02":"b"},ids),false);
  assert.equal(finishTeacherSession(s,lesson,checkedAnswers,now,[]).completedAt,null);
  assert.equal(teacherCanFinish(s,lesson,checkedAnswers,ids),true);
  assert.equal(finishTeacherSession(s,lesson,checkedAnswers,now,ids).completedAt,now);
});

test("L010 must visit all scenes and confirm source comparison; merely checking the textbook does not complete",()=>{
  const preparedSession=prepared();
  const noCompare={...preparedSession,activityIds:preparedSession.activityIds.filter(id=>id!=="dialogues-compared")};
  assert.equal(teacherCanFinish(noCompare,lesson,checkedAnswers,ids),false);
  const notVisited={...preparedSession,visitedIds:preparedSession.visitedIds.filter(id=>id!=="compare")};
  assert.equal(teacherCanFinish(notVisited,lesson,checkedAnswers,ids),false);
  const noIndependentAttempt={...preparedSession,attempts:preparedSession.attempts.filter(x=>x.sceneId!=="independent")};
  assert.equal(teacherCanFinish(noIndependentAttempt,lesson,checkedAnswers,ids),false);
});

test("L010 teaches the difference between spoken audio practice and text-only reading, not invented listening mastery",()=>{
  const source=lesson.scenes.find(s=>s.id==="source")!;
  assert.ok(source.paragraphs.some(p=>p.includes("ääni")||p.includes("teksti")));
  assert.equal(source.question,undefined);
  assert.ok(lesson.scenes.some(s=>s.paragraphs.some(p=>p.includes("kuullun ymmärtämisen"))));
  const s=prepared();
  assert.equal(independentTeacherEvidence(s,lesson),3);
  const textQuestion=lesson.scenes.find(s=>s.id==="independent")!.question!;
  assert.equal(evaluateTeacherAnswer(textQuestion,"Das ist Peter."),true);
  assert.equal(evaluateTeacherAnswer(textQuestion,"Ich bin Peter."),false);
  let aided=emptyTeacherSession(lesson,now);
  aided=markTeacherHelp(aided,"independent",now);
  aided=submitTeacherAnswer(aided,lesson,"independent","Das ist Peter.",now);
  aided=submitTeacherAnswer(aided,lesson,"application","c",now);
  aided=submitTeacherAnswer(aided,lesson,"exit","a",now);
  assert.equal(aided.attempts[0]?.independent,false);
  assert.equal(independentTeacherEvidence(aided,lesson),2);
});

test("L010 persists separately from L009, accepts valid backup and rejects cross-chapter checked IDs",()=>{
  const existing=emptyTeacherSession(LOS1_L009_TEACHER,now);
  const newDone=finishTeacherSession(prepared(),lesson,checkedAnswers,now,ids);
  const map={L009:existing,L010:newDone};
  assert.equal(validTeacherSessionMap(map),true);
  const restored=parseTeacherSessions(JSON.parse(JSON.stringify(map)));
  assert.equal(restored.L009?.completedAt,null);
  assert.equal(restored.L010?.completedAt,now);
  assert.equal(restored.L010?.lessonId,"L010");
  assert.ok(validateTeacherLesson({...lesson,requiredCheckedIds:["C03-MCOM02-Q01"]})
    .some(x=>x.location==="requiredCheckedIds"));
  assert.ok(validateTeacherLesson({...lesson,requiredCheckedIds:["C02-NONSENSE-Q01"]})
    .some(x=>x.location==="requiredCheckedIds"));
});
