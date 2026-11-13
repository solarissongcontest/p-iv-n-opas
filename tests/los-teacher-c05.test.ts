import test from "node:test";
import assert from "node:assert/strict";
import { LOS1_L022_TEACHER as L022 } from "../src/features/los/teacher/lessonL022.ts";
import { LOS1_L023_TEACHER as L023 } from "../src/features/los/teacher/lessonL023.ts";
import { LOS1_L024_TEACHER as L024 } from "../src/features/los/teacher/lessonL024.ts";
import { LOS1_L025_TEACHER as L025 } from "../src/features/los/teacher/lessonL025.ts";
import { LOS1_L026_TEACHER as L026 } from "../src/features/los/teacher/lessonL026.ts";
import { getLosTeacherLesson } from "../src/features/los/teacher/lessonL004.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import { getLosOpenDialogue } from "../src/features/los/content/los1OpenDialogues.ts";
import { LOS1_TEXT_B_SOURCES } from "../src/features/los/content/los1TextBAdditional.ts";
import { losExercisesFor, losScore } from "../src/features/los/exerciseBank.ts";
import { parseLosDraft } from "../src/features/los/studyState.ts";
import { losArchiveChapterExam, losChapterExamHistory } from "../src/features/los/losWorkbookPersistence.ts";
import {
  emptyTeacherSession, moveTeacherScene, submitTeacherAnswer, markTeacherHelp,
  confirmTeacherActivity, teacherCanFinish, finishTeacherSession,
  validTeacherSession, independentTeacherEvidence, teacherWrongFeedback,
  toggleTeacherPause, teacherChapterAssessmentStatus,
} from "../src/features/los/teacher/engine.ts";

const lessons=[L022,L023,L024,L025,L026];
const at="2026-11-13T13:00:00.000Z";
const bank=losExercisesFor("05");
const examAnswers=Object.fromEntries(bank.map(e=>[e.id,e.correct]));
const completeExam={
  testAnswers:examAnswers,testSubmittedAt:at,
  applicationDraft:"Wie geht's?\nGut, danke.",
  selfAssessment:"Osaan kysyä kuulumisia. Kertaan vielä nicht-sanan paikkaa.",
};

function prepared(lesson:typeof L022) {
  let session=emptyTeacherSession(lesson,at);
  for(const scene of lesson.scenes){
    session=moveTeacherScene(session,lesson,scene.id,at);
    if(scene.question){
      const question=scene.question;
      session=submitTeacherAnswer(session,lesson,scene.id,
        question.type==="choice" ? question.correctOption! : question.accepted![0]!,at);
    }
  }
  for(const id of lesson.requiredActivityIds) {
    session=confirmTeacherActivity(session,lesson,id,at);
  }
  return session;
}
function progress(lesson:typeof L022) {
  const answers=Object.fromEntries(lesson.requiredPracticeIds.map(id=>[id,"attempted"]));
  for(const id of lesson.requiredCheckedIds??[]) answers[id]="a";
  return {answers,checked:[...(lesson.requiredCheckedIds??[])]};
}

test("C05 is the real complete four-turn Heinrich/Karl dialogue and six-turn Franz/Greta Text B",()=>{
  const original=getLosOpenDialogue("05");
  assert.ok(original);
  assert.equal(original.sourceId,"M-WB-05");
  assert.equal(original.originalLines.length,4);
  assert.deepEqual(original.originalLines.map(line=>line.speaker),["Heinrich","Karl","Heinrich","Karl"]);
  assert.deepEqual(original.questions.map(q=>q.id),["C05-SOURCE-Q01","C05-SOURCE-Q02","C05-SOURCE-Q03","C05-SOURCE-Q04"]);
  const textB=LOS1_TEXT_B_SOURCES["05"];
  assert.equal(textB.sourceId,"M-COM-08");
  assert.equal(textB.lines.length,6);
  assert.deepEqual(textB.questions.map(q=>q.id),["C05-TEXTB-Q01","C05-TEXTB-Q02","C05-TEXTB-Q03","C05-TEXTB-Q04"]);
});
test("C05 five scripts register without fake extra lesson or duplicate question IDs",()=>{
  for(const [index,lesson] of lessons.entries()){
    assert.deepEqual(validateTeacherLesson(lesson),[],lesson.id);
    assert.equal(lesson.id,"L"+String(index+22).padStart(3,"0"));
    assert.equal(getLosTeacherLesson(lesson.id),lesson);
    assert.equal(lesson.bookId,1);
    assert.equal(lesson.chapterId,"05");
    assert.ok(lesson.scenes.length>=10);
    const body=lesson.scenes.flatMap(s=>s.paragraphs).join(" ");
    assert.match(body,/suomeksi|tarkoittaa|merkitys|hyvää|kuuluu/i);
    assert.ok(lesson.scenes.some(s=>s.kind==="board"),lesson.id);
    assert.ok(lesson.scenes.some(s=>s.kind==="explanation"),lesson.id);
    assert.ok(lesson.scenes.some(s=>s.kind==="summary"),lesson.id);
    assert.ok(lesson.scenes.every(s=>(s.question?.genericWrong||s.help?.length||s.paragraphs.length)>0));
    assert.ok(lesson.scenes.flatMap(s=>s.bookLinks??[]).some(link=>link.chapterId==="05"),lesson.id);
    assert.ok(lesson.requiredQuestionIds.length>=5);
    assert.ok(lesson.requiredQuestionIds.every(id=>lesson.scenes.some(s=>s.id===id&&s.question)));
    assert.ok(lesson.requiredPracticeIds.every(id=>bank.some(x=>x.id===id)));
  }
});
test("L023 includes whole source navigation and three checked real reading items",()=>{
  assert.deepEqual(L023.requiredCheckedIds,["C05-SOURCE-Q01","C05-SOURCE-Q02","C05-SOURCE-Q03"]);
  const original=getLosOpenDialogue("05")!;
  assert.ok(L023.requiredCheckedIds.every(id=>original.questions.some(q=>q.id===id)));
  assert.ok(L023.scenes.some(s=>s.bookLinks?.some(l=>l.section==="text")));
  assert.match(L023.scenes.flatMap(s=>s.paragraphs).join(" "),/nelj[aä]n? repliik/i);
});
test("L024 teaches nicht with four existing exercises and mistake-specific correction",()=>{
  assert.deepEqual(L024.requiredPracticeIds,["C05-EX-03","C05-EX-04","C05-EX-05","C05-EX-11"]);
  const board=L024.scenes.flatMap(s=>s.board??[]).map(b=>b.german);
  assert.ok(board.includes("Nicht so gut."));
  assert.ok(board.includes("Mir geht es nicht gut."));
  assert.ok(board.includes("Ich bin nicht müde."));
  const placement=L024.scenes.find(s=>s.id==="placement")!;
  assert.match(teacherWrongFeedback(placement,"a"),/nicht.*väärässä|väärässä.*nicht/i);
  assert.match(teacherWrongFeedback(placement,"b"),/loppuun/);
  const independent=L024.scenes.find(s=>s.id==="independent")!;
  assert.match(teacherWrongFeedback(independent,"so gut nicht"),/ennen so gut/);
  assert.match(teacherWrongFeedback(independent,"sehr gut"),/erittäin hyvästä/);
  assert.equal(L024.scenes.some(s=>s.question?.prompt.includes("Taivuta datiivi")),false);
});
test("L025 demands two checked Text B comprehension tasks but NEVER a listening completion flag",()=>{
  assert.deepEqual(L025.requiredCheckedIds,["C05-TEXTB-Q01","C05-TEXTB-Q02"]);
  assert.ok(L025.requiredCheckedIds.every(id=>LOS1_TEXT_B_SOURCES["05"].questions.some(q=>q.id===id)));
  assert.equal(L025.scenes.some(s=>s.activityId?.includes("listen")),false);
  assert.ok(L025.scenes.filter(s=>s.question?.evidenceRole==="application"||s.question?.evidenceRole==="exit").length>=2);
  const prose=L025.scenes.flatMap(s=>s.paragraphs).join(" ");
  assert.match(prose,/tekstin pohjalta|tekstin perusteella/i);
  assert.match(prose,/ei merkitse.*kuuntelua|ei.*kuuntelupisteitä/);
});
test("L026 uses exactly the existing C05 chapter test and own written self assessment",()=>{
  assert.equal(bank.length,12);
  assert.deepEqual(L026.chapterAssessment?.requiredTestIds,bank.map(item=>item.id));
  assert.equal(L026.chapterAssessment?.requireApplicationDraft,true);
  assert.ok((L026.chapterAssessment?.minSelfAssessmentLength??0)>0);
  const sections=new Set(L026.scenes.flatMap(s=>s.bookLinks??[]).map(l=>l.section));
  for(const section of ["text","text-b","practice","apply","test"]) assert.ok(sections.has(section),section);
  assert.deepEqual(teacherChapterAssessmentStatus(L026,completeExam),{
    answered:12,expected:12,submitted:true,applicationDone:true,reflectionDone:true,ready:true,
  });
  const score=losScore("05",examAnswers);
  assert.deepEqual(score,{correct:12,total:12});
});
test("all five lessons preserve pause/retry and require actual exercises or submitted exam",()=>{
  for(const lesson of lessons){
    let s=prepared(lesson);
    const {answers,checked}=progress(lesson);
    if(lesson===L026) {
      assert.equal(teacherCanFinish(s,lesson,answers,checked),false);
      assert.equal(teacherCanFinish(s,lesson,answers,checked,{...completeExam,testSubmittedAt:null}),false);
      assert.equal(teacherCanFinish(s,lesson,answers,checked,{...completeExam,testAnswers:{...examAnswers,[bank[0]!.id]:""}}),false);
      assert.equal(teacherCanFinish(s,lesson,answers,checked,{...completeExam,selfAssessment:""}),false);
    } else {
      const first=[...lesson.requiredPracticeIds,...(lesson.requiredCheckedIds??[])][0];
      if(first)assert.equal(teacherCanFinish(s,lesson,{},[]),false);
      if((lesson.requiredCheckedIds??[]).length)assert.equal(teacherCanFinish(s,lesson,answers,[]),false);
    }
    const assessment=lesson===L026?completeExam:undefined;
    assert.equal(teacherCanFinish(s,lesson,answers,checked,assessment),true,lesson.id);
    s=toggleTeacherPause(s,at);
    assert.equal(teacherCanFinish(s,lesson,answers,checked,assessment),false);
    assert.equal(validTeacherSession(JSON.parse(JSON.stringify(s))),true);
    s=toggleTeacherPause(s,at);
    assert.equal(teacherCanFinish(s,lesson,answers,checked,assessment),true);
    assert.equal(finishTeacherSession(s,lesson,answers,at,checked,assessment).completedAt,at);
    assert.ok(independentTeacherEvidence(s,lesson)>=2);
    const question=lesson.scenes.find(x=>x.id==="independent")!;
    const assisted=markTeacherHelp(emptyTeacherSession(lesson,at),question.id,at);
    const answer=question.question!.type==="choice"?question.question!.correctOption!:question.question!.accepted![0]!;
    const attempt=submitTeacherAnswer(assisted,lesson,question.id,answer,at);
    assert.equal(independentTeacherEvidence(attempt,lesson),0);
  }
});
test("C05 archives real previous test points and preserves them across Teacher session recovery",()=>{
  const previousAnswers={...examAnswers,[bank[0]!.id]:"incorrect on purpose"};
  const archived=losArchiveChapterExam({},"05",bank,previousAnswers,at);
  let history=losChapterExamHistory(archived,"05");
  assert.equal(history.length,1);
  assert.deepEqual(history.map(item=>({number:item.number,score:item.correct,total:item.total})),
    [{number:1,score:11,total:12}]);
  assert.equal(history[0]!.answers.find(item=>item.id===bank[0]!.id)?.answer,"incorrect on purpose");

  const legacy={
    version:1,note:"",applicationDraft:"Wie geht's?\\nGut, danke.",bookmarked:false,
    practiceAnswers:{...archived,"C05-EX-04":"nicht"},
    practiceChecked:[],testAnswers:examAnswers,testSubmittedAt:at,
    selfAssessment:"Kertaan Und Ihnen? -kysymyksen.",
    teacherSessions:{L026:prepared(L026)},updatedAt:at,
  };
  const parsed=parseLosDraft(JSON.stringify(legacy));
  history=losChapterExamHistory(parsed.practiceAnswers,"05");
  assert.equal(history.length,1);
  assert.equal(history[0]!.correct,11);
  assert.equal(parsed.practiceAnswers["C05-EX-04"],"nicht");
  assert.deepEqual(parsed.testAnswers,examAnswers);
  assert.equal(parsed.testSubmittedAt,at);
  assert.equal(parsed.applicationDraft,legacy.applicationDraft);
  assert.equal(parsed.teacherSessions?.L026?.lessonId,"L026");

  const afterRetake=losArchiveChapterExam(parsed.practiceAnswers,"05",bank,parsed.testAnswers,at);
  history=losChapterExamHistory(afterRetake,"05");
  assert.deepEqual(history.map(item=>item.correct),[11,12]);
  assert.equal(history[0]!.answers.length,12);
  assert.equal(history[1]!.answers.length,12);
});
