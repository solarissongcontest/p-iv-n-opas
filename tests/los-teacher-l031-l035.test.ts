import test from "node:test";
import assert from "node:assert/strict";
import { LOS1_L031_TEACHER } from "../src/features/los/teacher/lessonL031.ts";
import { LOS1_L032_TEACHER } from "../src/features/los/teacher/lessonL032.ts";
import { LOS1_L033_TEACHER } from "../src/features/los/teacher/lessonL033.ts";
import { LOS1_L034_TEACHER } from "../src/features/los/teacher/lessonL034.ts";
import { LOS1_L035_TEACHER } from "../src/features/los/teacher/lessonL035.ts";
import { getLosTeacherLesson } from "../src/features/los/teacher/lessonRegistry.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import { germanCompositeNumber } from "../src/features/los/teacher/germanNumbers.ts";
import { losExercisesFor } from "../src/features/los/exerciseBank.ts";
import { LOS1_TEXT_B_SOURCES } from "../src/features/los/content/los1TextBAdditional.ts";
import { LOS1_C06_TEXT } from "../src/features/los/content/los1OpenDialogues.ts";
import {
  emptyTeacherSession, moveTeacherScene, submitTeacherAnswer, confirmTeacherActivity,
  evaluateTeacherAnswer, teacherCanFinish, teacherChapterAssessmentStatus,
  setTeacherAnswerDraft, validTeacherSession, parseTeacherSessions,
  independentTeacherEvidence, markTeacherHelp, teacherWrongFeedback, teacherBuiltNumberCount,
} from "../src/features/los/teacher/engine.ts";

const lessons = [LOS1_L031_TEACHER, LOS1_L032_TEACHER, LOS1_L033_TEACHER, LOS1_L034_TEACHER, LOS1_L035_TEACHER] as const;
const at="2026-11-13T12:00:00.000Z";
function prepared(lesson: (typeof lessons)[number]) {
  let session=emptyTeacherSession(lesson,at);
  for (const scene of lesson.scenes) {
    session=moveTeacherScene(session,lesson,scene.id,at);
    if (scene.question) {
      const q=scene.question;
      session=submitTeacherAnswer(session,lesson,scene.id,q.type==="choice"?q.correctOption!:q.accepted![0]!,at);
    }
  }
  for (const id of lesson.requiredActivityIds) session=confirmTeacherActivity(session,lesson,id,at);
  return session;
}
const practiced = (lesson: (typeof lessons)[number]) => Object.fromEntries(lesson.requiredPracticeIds.map(id=>[id,"attempted"]));
test("all five C06 Teacher lessons have unique valid full scripts using the existing engine",()=>{
  for (const lesson of lessons) {
    assert.deepEqual(validateTeacherLesson(lesson),[],lesson.id);
    assert.equal(getLosTeacherLesson(lesson.id),lesson);
    assert.equal(lesson.chapterId,"06");
    assert.equal(lesson.bookId,1);
    assert.ok(lesson.scenes.length>=12,lesson.id);
    assert.ok(lesson.scenes.some(scene=>scene.kind==="board"),lesson.id);
    assert.ok(lesson.scenes.some(scene=>scene.kind==="summary"),lesson.id);
    assert.ok(lesson.scenes.some(scene=>scene.question?.evidenceRole==="exit"),lesson.id);
    assert.ok(lesson.scenes.some(scene=>scene.help?.length || scene.question?.reteach),lesson.id);
    assert.ok(lesson.requiredQuestionIds.length>=5,lesson.id);
  }
});
test("German numeral constructor covers unit-first order, irregular tens, 100 and boundaries",()=>{
  const expected:Record<number,string>={
    20:"zwanzig",21:"einundzwanzig",27:"siebenundzwanzig",
    30:"dreißig",32:"zweiunddreißig",37:"siebenunddreißig",
    47:"siebenundvierzig",60:"sechzig",70:"siebzig",71:"einundsiebzig",
    90:"neunzig",99:"neunundneunzig",100:"hundert",
  };
  for (const [number,word] of Object.entries(expected)) assert.equal(germanCompositeNumber(Number(number)),word);
  for (const n of [19,101,-1,21.5,Number.NaN]) assert.throws(()=>germanCompositeNumber(n),RangeError);
});
test("L031 assesses reading AND spelling, with exact umlauts and distinct exercise types",()=>{
  const l=LOS1_L031_TEACHER;
  assert.deepEqual(l.requiredPracticeIds,["C06-EX-01","C06-EX-02","C06-EX-07","C06-EX-08"]);
  assert.ok(l.scenes.some(s=>s.question?.type==="choice"));
  assert.ok(l.scenes.some(s=>s.question?.type==="text"));
  const word=l.scenes.find(s=>s.id==="exit")!.question!;
  assert.equal(evaluateTeacherAnswer(word,"zwölf"),true);
  assert.equal(evaluateTeacherAnswer(word,"zwolf"),false);
  assert.equal(evaluateTeacherAnswer(word,"zweizehn"),false);
  assert.match(teacherWrongFeedback(l.scenes.find(s=>s.id==="exit")!,"zwolf"),/ö/);
  const digits=l.scenes.find(s=>s.id==="read-seven")!.question!;
  assert.equal(evaluateTeacherAnswer(digits,"7"),true);
  assert.equal(evaluateTeacherAnswer(digits,"sieben"),false);
});
test("L032 reads the real four-dialogue M-ZPE-01 Text A and needs three checked source questions",()=>{
  const l=LOS1_L032_TEACHER;
  assert.equal(LOS1_C06_TEXT.sourceId,"M-ZPE-01");
  assert.equal(LOS1_C06_TEXT.originalLines.length,12);
  assert.deepEqual(l.requiredCheckedIds,LOS1_C06_TEXT.questions.slice(0,3).map(q=>q.id));
  assert.ok(l.scenes.some(s=>s.bookLinks?.some(link=>link.section==="text")));
  assert.ok(l.scenes.some(s=>s.bookLinks?.some(link=>link.section==="understand")));
  for(const [id,wrong] of [["sixteen","sechszehn"],["seventeen","siebenzehn"]] as const){
    const q=l.scenes.find(s=>s.id===id)!.question!;
    assert.equal(evaluateTeacherAnswer(q,q.accepted![0]!),true);
    assert.equal(evaluateTeacherAnswer(q,wrong),false);
    assert.ok(teacherWrongFeedback(l.scenes.find(s=>s.id===id)!,wrong).length>15);
  }
  const s=prepared(l), answers=practiced(l);
  assert.equal(teacherCanFinish(s,l,answers),false);
  const sourceAnswers=Object.fromEntries(l.requiredCheckedIds!.map(id=>[id,"a"]));
  assert.equal(teacherCanFinish(s,l,{...answers,...sourceAnswers},l.requiredCheckedIds!.slice(0,2)),false);
  assert.equal(teacherCanFinish(s,l,{...answers,...sourceAnswers},l.requiredCheckedIds!),true);
});
test("L033 number building is persisted and ß or reversed digit ordering are not accepted",()=>{
  const l=LOS1_L033_TEACHER;
  assert.equal(l.scenes.find(s=>s.id==="number-builder")?.numberBuilder,true);
  assert.equal(l.requiredPracticeIds.length,6);
  for(const [id,wrong] of [["write21","einsundzwanzig"],["write32","zweiunddreissig"],["write32","dreißigzwei"],["exit","dreizig"]] as const){
    const scene=l.scenes.find(s=>s.id===id)!;
    assert.equal(evaluateTeacherAnswer(scene.question!,wrong),false);
    assert.ok(teacherWrongFeedback(scene,wrong).length>=15);
  }
  const q=l.scenes.find(s=>s.id==="write32")!.question!;
  assert.equal(evaluateTeacherAnswer(q,"zweiunddreißig"),true);
  let s=prepared(l);
  assert.equal(teacherCanFinish(s,l,practiced(l)),false,"four distinct board numbers are required");
  const onlyTens=setTeacherAnswerDraft(s,"number-builder-history","20,30,40,100",at);
  assert.equal(teacherBuiltNumberCount(onlyTens,"number-builder"),0,"round tens and 100 do not test units-first order");
  assert.equal(teacherCanFinish(onlyTens,l,practiced(l)),false);
  const mixed=setTeacherAnswerDraft(s,"number-builder-history","21,32,37,40,100",at);
  assert.equal(teacherBuiltNumberCount(mixed,"number-builder"),3,"only distinct compound numerals count");
  assert.equal(teacherCanFinish(mixed,l,practiced(l)),false);
  s=setTeacherAnswerDraft(s,"number-builder","71",at);
  s=setTeacherAnswerDraft(s,"number-builder-history","21,32,37,71",at);
  s=confirmTeacherActivity(s,l,"builder-used",at);
  assert.equal(validTeacherSession(s),true);
  assert.deepEqual(parseTeacherSessions({L033:JSON.parse(JSON.stringify(s))}).L033.draftAnswers["number-builder-history"],"21,32,37,71");
  assert.equal(teacherCanFinish(s,l,practiced(l)),true);
  assert.equal(s.activityIds.includes("builder-used"),true);
  const tampered=setTeacherAnswerDraft(s,"number-builder-history","21,21,19,200",at);
  assert.equal(teacherCanFinish(tampered,l,practiced(l)),false,"invalid or duplicate values do not satisfy four");
});
test("L034 relies only on actual reused M-COM-01 Text B checks and does not imply assessed audio",()=>{
  const l=LOS1_L034_TEACHER;
  assert.equal(LOS1_TEXT_B_SOURCES["06"].sourceId,"M-COM-01");
  assert.equal(LOS1_TEXT_B_SOURCES["06"].lines.length,8);
  assert.deepEqual(l.requiredCheckedIds,LOS1_TEXT_B_SOURCES["06"].questions.slice(0,2).map(q=>q.id));
  assert.ok(l.scenes.some(s=>s.bookLinks?.some(link=>link.section==="text-b")));
  const prose=l.scenes.flatMap(s=>s.paragraphs).join(" ");
  assert.match(prose,/laitetestaamaton/);
  assert.match(prose,/kuullun ymmärtämisen/);
  const s=prepared(l), sourceAnswers=Object.fromEntries(l.requiredCheckedIds!.map(id=>[id,"a"]));
  assert.equal(teacherCanFinish(s,l,sourceAnswers,[]),false);
  assert.equal(teacherCanFinish(s,l,sourceAnswers,l.requiredCheckedIds!),true);
});
test("L035 chapter completion needs real 20 test answers, submission, application and self-assessment",()=>{
  const l=LOS1_L035_TEACHER, s=prepared(l);
  const ids=losExercisesFor("06").map(ex=>ex.id);
  assert.equal(ids.length,20);
  assert.deepEqual(l.chapterAssessment?.requiredTestIds,ids);
  assert.equal(l.requiredPracticeIds.length,0);
  const complete={testAnswers:Object.fromEntries(ids.map(id=>[id,"attempted"])),
    testSubmittedAt:at,applicationDraft:"Wie alt bist du? Ich bin siebzehn Jahre alt.",
    selfAssessment:"Kirjoitus sujui, mutta ß ja 16 pitää vielä kerrata."};
  assert.equal(teacherCanFinish(s,l,{},[],complete),true);
  assert.equal(teacherCanFinish(s,l,{},[],{...complete,testSubmittedAt:null}),false);
  assert.equal(teacherCanFinish(s,l,{},[],{...complete,testAnswers:{...complete.testAnswers,[ids[1]!]:""}}),false);
  assert.equal(teacherCanFinish(s,l,{},[],{...complete,applicationDraft:""}),false);
  assert.equal(teacherCanFinish(s,l,{},[],{...complete,selfAssessment:""}),false);
  assert.equal(teacherChapterAssessmentStatus(l,complete).ready,true);
  assert.equal(teacherCanFinish(s,l,{},[],{...complete,testAnswers:Object.fromEntries(ids.map(id=>[id,"wrong"]))}),true);
  assert.equal(independentTeacherEvidence(s,l),4);
});
test("helped answer does not become independent mastery and saved sessions survive JSON round trip",()=>{
  const l=LOS1_L033_TEACHER;
  let s=emptyTeacherSession(l,at);
  s=markTeacherHelp(s,"write32",at);
  s=submitTeacherAnswer(s,l,"write32","zweiunddreißig",at);
  assert.equal(independentTeacherEvidence(s,l),0);
  assert.equal(s.attempts[0]?.independent,false);
  assert.deepEqual(parseTeacherSessions({L033:JSON.parse(JSON.stringify(s))}).L033,s);
});
