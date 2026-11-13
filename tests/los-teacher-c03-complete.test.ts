import test from "node:test";
import assert from "node:assert/strict";
import { LOS1_L013_TEACHER } from "../src/features/los/teacher/lessonL013.ts";
import { LOS1_L014_TEACHER } from "../src/features/los/teacher/lessonL014.ts";
import { LOS1_L015_TEACHER } from "../src/features/los/teacher/lessonL015.ts";
import { LOS1_L016_TEACHER } from "../src/features/los/teacher/lessonL016.ts";
import { getLosTeacherLesson } from "../src/features/los/teacher/lessonL004.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import { losExercisesFor } from "../src/features/los/exerciseBank.ts";
import { getLosOpenDialogue } from "../src/features/los/content/los1OpenDialogues.ts";
import { LOS1_M_COM_02_LINES, LOS1_M_COM_02_QUESTIONS } from "../src/features/los/content/los1MCom02.ts";
import {
  emptyTeacherSession, moveTeacherScene, submitTeacherAnswer, confirmTeacherActivity,
  teacherCanFinish, independentTeacherEvidence, markTeacherHelp, finishTeacherSession,
  teacherChapterAssessmentStatus, evaluateTeacherAnswer,
  type TeacherLesson,
} from "../src/features/los/teacher/engine.ts";

const at="2026-11-13T12:00:00.000Z";
const lessons=[LOS1_L013_TEACHER,LOS1_L014_TEACHER,LOS1_L015_TEACHER,LOS1_L016_TEACHER];

function fullyVisited(lesson: TeacherLesson){
  let s=emptyTeacherSession(lesson,at);
  for(const scene of lesson.scenes){
    s=moveTeacherScene(s,lesson,scene.id,at);
    if(scene.question){
      const q=scene.question;
      s=submitTeacherAnswer(s,lesson,scene.id,q.type==="choice" ? q.correctOption! : q.accepted![0]!,at);
    }
  }
  for(const id of lesson.requiredActivityIds)s=confirmTeacherActivity(s,lesson,id,at);
  return s;
}

test("C03 L013–L016 are unique real manuscripts in the canonical Teacher Player",()=>{
  assert.equal(new Set(lessons.map(x=>x.id)).size,4);
  for(const l of lessons){
    assert.equal(getLosTeacherLesson(l.id),l);
    assert.deepEqual(validateTeacherLesson(l),[],l.id);
    assert.equal(l.chapterId,"03");
    assert.equal(l.bookId,1);
    assert.ok(l.scenes.length>=11,l.id+" is not a short hand-off");
    assert.ok(l.scenes.some(x=>x.kind==="board"),l.id+" lacks actual teaching board");
    assert.ok(l.scenes.some(x=>x.kind==="book"),l.id+" lacks precise textbook bridge");
    assert.ok(l.scenes.some(x=>x.kind==="summary"),l.id+" lacks exit summary");
    assert.ok(l.scenes.every(x=>x.paragraphs.every(p=>p.trim().length>0)));
    assert.ok(l.scenes.flatMap(x=>x.bookLinks??[]).every(x=>x.chapterId==="03"));
    assert.ok(l.requiredQuestionIds.every(id=>l.scenes.some(s=>s.id===id&&s.question)));
  }
  assert.notEqual(LOS1_L013_TEACHER.objective,LOS1_L014_TEACHER.objective);
  assert.notEqual(LOS1_L014_TEACHER.objective,LOS1_L015_TEACHER.objective);
});

test("C03 source decision and four textbook questions agree with original Lisa text",()=>{
  const lisa=getLosOpenDialogue("03");
  assert.ok(lisa);
  assert.equal(lisa.sourceId,"M-WB-07");
  assert.equal(lisa.revision,"4581896");
  assert.equal(lisa.originalLines.length,8);
  assert.deepEqual(lisa.originalLines.map(l=>l.speaker),[
    "Stranger 1","Lisa","Stranger 1","Stranger 2","Lisa","Stranger 1","Stranger 2","Lisa",
  ]);
  assert.match(lisa.originalLines[7]!.text,/ich komme aus Deutschland und ich wohne hier in Bern/i);
  assert.equal(lisa.questions.find(q=>q.id==="C03-SOURCE-Q01")?.correctId,"a");
  assert.equal(lisa.questions.find(q=>q.id==="C03-SOURCE-Q02")?.correctId,"b");
  assert.equal(lisa.questions.find(q=>q.id==="C03-SOURCE-Q03")?.correctId,"c");
  assert.equal(lisa.questions.find(q=>q.id==="C03-SOURCE-Q04")?.correctId,"a");
  assert.deepEqual(LOS1_L013_TEACHER.requiredCheckedIds,[
    "C03-SOURCE-Q01","C03-SOURCE-Q02",
  ]);
});

test("L013 needs two ACTUALLY checked original source answers, not merely opened book",()=>{
  const l=LOS1_L013_TEACHER,s=fullyVisited(l);
  const answers={"C03-SOURCE-Q01":"a","C03-SOURCE-Q02":"b"};
  assert.equal(teacherCanFinish(s,l,answers),false);
  assert.equal(teacherCanFinish(s,l,answers,["C03-SOURCE-Q01"]),false);
  assert.equal(teacherCanFinish(s,l,answers,["C03-SOURCE-Q01","C03-SOURCE-Q02"]),true);
  assert.equal(independentTeacherEvidence(s,l),3);
  assert.equal(teacherCanFinish(emptyTeacherSession(l,at),l,answers,["C03-SOURCE-Q01","C03-SOURCE-Q02"]),false);
  const helped=markTeacherHelp(emptyTeacherSession(l,at),"independent",at);
  const assisted=submitTeacherAnswer(helped,l,"independent","Deutschland",at);
  assert.equal(independentTeacherEvidence(assisted,l),0);
});

test("L014 explicitly teaches only coming-from ich/du and requires real C03 workbook answers",()=>{
  const l=LOS1_L014_TEACHER;
  const prose=l.scenes.flatMap(s=>s.paragraphs).join(" ");
  for(const fragment of ["ich komme","du kommst","Woher kommst du?","aus Finnland"]){
    assert.ok(prose.includes(fragment),fragment);
  }
  assert.match(prose,/aus der Schweiz/);
  const bank=new Set(losExercisesFor("03").map(x=>x.id));
  assert.deepEqual(l.requiredPracticeIds,["C03-EX-06","C03-EX-07","C03-EX-10","C03-EX-13"]);
  assert.ok(l.requiredPracticeIds.every(id=>bank.has(id)));
  const correct=fullyVisited(l);
  assert.equal(teacherCanFinish(correct,l,{}),false);
  const submitted=Object.fromEntries(l.requiredPracticeIds.map(id=>[id,"attempted"]));
  assert.equal(teacherCanFinish(correct,l,submitted),true);
  const independent=l.scenes.find(s=>s.id==="independent")?.question;
  assert.ok(independent);
  assert.equal(evaluateTeacherAnswer(independent,"Woher kommst du?"),true);
  assert.equal(evaluateTeacherAnswer(independent,"Woher du kommst?"),false);
  assert.equal(evaluateTeacherAnswer(independent,"Woher komme du?"),false);
});

test("L015 uses original four-turn M-COM-02 and checks C03-specific IDs",()=>{
  const l=LOS1_L015_TEACHER;
  assert.equal(LOS1_M_COM_02_LINES.length,4);
  assert.deepEqual(LOS1_M_COM_02_LINES.map(x=>x.speaker),["Thomas","Takashi","Thomas","Takashi"]);
  assert.equal(LOS1_M_COM_02_QUESTIONS[1]?.correctId,"b");
  assert.equal(LOS1_M_COM_02_QUESTIONS[2]?.correctId,"c");
  assert.deepEqual(l.requiredCheckedIds,["C03-MCOM02-Q02","C03-MCOM02-Q03"]);
  const s=fullyVisited(l);
  assert.equal(teacherCanFinish(s,l,{"C03-MCOM02-Q02":"b","C03-MCOM02-Q03":"c"}),false);
  assert.equal(teacherCanFinish(s,l,{"C03-MCOM02-Q02":"b","C03-MCOM02-Q03":"c"},[
    "C03-MCOM02-Q02","C03-MCOM02-Q03",
  ]),true);
  assert.match(l.scenes.flatMap(s=>s.paragraphs).join(" "),/kuullun ymmärtämistä/);
});

test("L016 requires the REAL C03 chapter test, real submission and own reflection",()=>{
  const l=LOS1_L016_TEACHER,s=fullyVisited(l);
  const ids=losExercisesFor("03").map(x=>x.id);
  assert.ok(ids.length>=10);
  assert.deepEqual(l.chapterAssessment?.requiredTestIds,ids);
  assert.equal(teacherCanFinish(s,l,{}),false);
  const testAnswers=Object.fromEntries(ids.map(id=>[id,"attempted"]));
  const chapter={testAnswers,testSubmittedAt:at,
    applicationDraft:"Ich heiße Mia. Ich komme aus Finnland.",
    selfAssessment:"Osaan kysyä lähtömaan, mutta haluan vielä kerrata maan nimet."};
  assert.equal(teacherCanFinish(s,l,{},[],{...chapter,testSubmittedAt:null}),false);
  assert.equal(teacherCanFinish(s,l,{},[],{...chapter,applicationDraft:""}),false);
  assert.equal(teacherCanFinish(s,l,{},[],{...chapter,selfAssessment:""}),false);
  assert.equal(teacherCanFinish(s,l,{},[],{...chapter,testAnswers:{...testAnswers,[ids[0]!]:""}}),false);
  assert.equal(teacherCanFinish(s,l,{},[],chapter),true);
  assert.equal(finishTeacherSession(s,l,{},at,[],chapter).completedAt,at);
  assert.equal(independentTeacherEvidence(s,l),3);
  assert.equal(teacherChapterAssessmentStatus(l,chapter).submitted,true);
  const wrong=Object.fromEntries(ids.map(id=>[id,"wrong"]));
  assert.equal(teacherChapterAssessmentStatus(l,{...chapter,testAnswers:wrong}).ready,true);
  // Participation can be complete even with incorrect answers; mastery cannot be invented.
});

test("Wrong-answer correction stops after three attempts without manufacturing mastery",()=>{
 const lesson=LOS1_L014_TEACHER;
 let s=emptyTeacherSession(lesson,at);
 for(let n=0;n<3;n++)s=submitTeacherAnswer(s,lesson,"independent","Woher du kommst",at);
 assert.equal(s.attempts.length,3);
 const fourth=submitTeacherAnswer(s,lesson,"independent","Woher kommst du?",at);
 assert.equal(fourth.attempts.length,3);
 assert.equal(independentTeacherEvidence(fourth,lesson),0);
 const relieved=markTeacherHelp(emptyTeacherSession(lesson,at),"independent",at);
 const guided=submitTeacherAnswer(relieved,lesson,"independent","Woher kommst du?",at);
 assert.equal(independentTeacherEvidence(guided,lesson),0);
});
