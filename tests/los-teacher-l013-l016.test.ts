import test from "node:test";
import assert from "node:assert/strict";
import { LOS1_L013_TEACHER } from "../src/features/los/teacher/lessonL013.ts";
import { LOS1_L014_TEACHER } from "../src/features/los/teacher/lessonL014.ts";
import { LOS1_L015_TEACHER } from "../src/features/los/teacher/lessonL015.ts";
import { LOS1_L016_TEACHER } from "../src/features/los/teacher/lessonL016.ts";
import { getLosTeacherLesson } from "../src/features/los/teacher/lessonL004.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import { getLosOpenDialogue } from "../src/features/los/content/los1OpenDialogues.ts";
import { LOS1_M_COM_02_LINES, LOS1_M_COM_02_QUESTIONS } from "../src/features/los/content/los1MCom02.ts";
import { losExercisesFor } from "../src/features/los/exerciseBank.ts";
import {
  emptyTeacherSession, moveTeacherScene, submitTeacherAnswer,
  confirmTeacherActivity, teacherCanFinish, finishTeacherSession,
  independentTeacherEvidence, markTeacherHelp, teacherWrongFeedback,
  teacherChapterAssessmentStatus, evaluateTeacherAnswer, type TeacherLesson,
} from "../src/features/los/teacher/engine.ts";

const lessons=[LOS1_L013_TEACHER,LOS1_L014_TEACHER,LOS1_L015_TEACHER,LOS1_L016_TEACHER];
const stamp="2026-11-13T12:15:00.000Z";
function attemptedAll(lesson:TeacherLesson) {
  let session=emptyTeacherSession(lesson,stamp);
  for(const scene of lesson.scenes){
    session=moveTeacherScene(session,lesson,scene.id,stamp);
    if(scene.question) {
      const q=scene.question;
      session=submitTeacherAnswer(session,lesson,scene.id,q.type==="choice" ? q.correctOption! : q.accepted![0]!,stamp);
    }
    if(scene.activityId)session=confirmTeacherActivity(session,lesson,scene.activityId,stamp);
  }
  return session;
}
test("L013–L016 resolve to the shared deterministic Teacher Player and all manuscripts validate",()=>{
  lessons.forEach((lesson,index)=>{
    assert.equal(lesson.id,"L"+String(index+13).padStart(3,"0"));
    assert.equal(lesson.chapterId,"03");
    assert.equal(lesson.bookId,1);
    assert.equal(getLosTeacherLesson(lesson.id),lesson);
    assert.deepEqual(validateTeacherLesson(lesson),[],lesson.id);
    assert.ok(lesson.scenes.some(scene=>scene.kind==="board"),lesson.id);
    assert.ok(lesson.scenes.some(scene=>scene.kind==="summary"),lesson.id);
    assert.ok(lesson.scenes.some(scene=>scene.bookLinks?.length),lesson.id);
    assert.ok(lesson.scenes.every(scene=>scene.help?.length || scene.paragraphs.length>0));
    assert.equal(lesson.estimatedMinutes,30);
    assert.equal(teacherCanFinish(emptyTeacherSession(lesson,stamp),lesson,{}),false);
  });
});
test("L013 uses approved Lisa M-WB-07 and exactly the checked source comprehension IDs",()=>{
  const source=getLosOpenDialogue("03")!;
  assert.equal(source.sourceId,"M-WB-07");
  assert.equal(source.revision,"4581896");
  assert.equal(source.originalLines.length,8);
  assert.match(source.sourceUrl,/oldid=4581896/);
  assert.ok(!source.originalLines.some(line=>/Telefonnummer|phone number|\d{4}\s*\d{3}/i.test(line.text)));
  assert.deepEqual(LOS1_L013_TEACHER.requiredCheckedIds,["C03-SOURCE-Q01","C03-SOURCE-Q02","C03-SOURCE-Q03"]);
  assert.ok(LOS1_L013_TEACHER.requiredCheckedIds.every(id=>source.questions.some(q=>q.id===id)));
  const session=attemptedAll(LOS1_L013_TEACHER);
  const answers={"C03-SOURCE-Q01":"a","C03-SOURCE-Q02":"b","C03-SOURCE-Q03":"c"};
  assert.equal(teacherCanFinish(session,LOS1_L013_TEACHER,answers,["C03-SOURCE-Q01","C03-SOURCE-Q02"]),false);
  assert.equal(teacherCanFinish(session,LOS1_L013_TEACHER,answers,Object.keys(answers)),true);
  assert.equal(independentTeacherEvidence(session,LOS1_L013_TEACHER),3);
  const helped=markTeacherHelp(emptyTeacherSession(LOS1_L013_TEACHER,stamp),"independent",stamp);
  const answered=submitTeacherAnswer(helped,LOS1_L013_TEACHER,"independent","Deutschland",stamp);
  assert.equal(independentTeacherEvidence(answered,LOS1_L013_TEACHER),0);
});
test("L014 builds interactive kommen/woher/aus boards with four real workbook exercises",()=>{
  const lesson=LOS1_L014_TEACHER;
  const boards=lesson.scenes.filter(scene=>scene.kind==="board");
  assert.equal(boards.length,2);
  const allBoard=boards.flatMap(scene=>scene.board??[]);
  for(const word of ["ich komme","du kommst","Woher","Finnland"]) {
    assert.ok(allBoard.some(row=>row.german.includes(word)),word);
  }
  const bank=losExercisesFor("03");
  assert.deepEqual(lesson.requiredPracticeIds,["C03-EX-06","C03-EX-07","C03-EX-10","C03-EX-13"]);
  assert.ok(lesson.requiredPracticeIds.every(id=>bank.some(item=>item.id===id)));
  const independent=lesson.scenes.find(scene=>scene.id==="independent")!;
  assert.equal(evaluateTeacherAnswer(independent.question!,"Woher kommst du?"),true);
  assert.equal(evaluateTeacherAnswer(independent.question!,"Woher kommen du?"),false);
  assert.match(teacherWrongFeedback(independent,"Woher kommen du?"),/Du-persoonan/);
  const s=attemptedAll(lesson);
  const answers=Object.fromEntries(lesson.requiredPracticeIds.map(id=>[id,"attempted"]));
  assert.equal(teacherCanFinish(s,lesson,{"C03-EX-06":"komme"}),false);
  assert.equal(teacherCanFinish(s,lesson,answers),true);
  assert.equal(independentTeacherEvidence(s,lesson),3);
});
test("L015 reads authentic four-turn M-COM-02, never invents Nico audio, and requires two checked Text B tasks",()=>{
  const lesson=LOS1_L015_TEACHER;
  assert.equal(LOS1_M_COM_02_LINES.length,4);
  assert.equal(LOS1_M_COM_02_LINES[2]!.speaker,"Thomas");
  assert.match(LOS1_M_COM_02_LINES[2]!.text,/Wir kommen aus Berlin/);
  assert.match(LOS1_M_COM_02_LINES[3]!.text,/Ich komme aus Kyoto/);
  assert.deepEqual(lesson.requiredCheckedIds,["C03-MCOM02-Q02","C03-MCOM02-Q03"]);
  const sourceIds=LOS1_M_COM_02_QUESTIONS.map(q=>q.id.replace(/^C02/,"C03"));
  assert.ok(lesson.requiredCheckedIds.every(id=>sourceIds.includes(id)));
  const prose=lesson.scenes.flatMap(scene=>scene.paragraphs).join(" ");
  assert.match(prose,/Nicos Weg/);
  assert.match(prose,/ei.*vahvistettu/);
  assert.ok(lesson.scenes.some(scene=>scene.board?.some(b=>b.german.includes("Kyoto"))));
  const s=attemptedAll(lesson);
  const answers={"C03-MCOM02-Q02":"b","C03-MCOM02-Q03":"c"};
  assert.equal(teacherCanFinish(s,lesson,answers,[]),false);
  assert.equal(teacherCanFinish(s,lesson,answers,Object.keys(answers)),true);
});
test("L016 requires a real submitted full 15-item test plus saved application and self-assessment",()=>{
  const lesson=LOS1_L016_TEACHER,ids=losExercisesFor("03").map(item=>item.id);
  assert.equal(ids.length,15);
  assert.deepEqual(lesson.chapterAssessment?.requiredTestIds,ids);
  const studyAnswers=Object.fromEntries(lesson.requiredPracticeIds.map(id=>[id,"tried"]));
  const fullAnswers=Object.fromEntries(ids.map(id=>[id,"a"]));
  const complete={testAnswers:fullAnswers,testSubmittedAt:stamp,
    applicationDraft:"Mia: Woher kommst du? Leo: Ich komme aus Finnland.",
    selfAssessment:"Osaan kysyä woher, mutta kommst vaatii vielä kertausta."};
  const s=attemptedAll(lesson);
  assert.equal(teacherCanFinish(s,lesson,studyAnswers,[],{...complete,testSubmittedAt:null}),false);
  assert.equal(teacherCanFinish(s,lesson,studyAnswers,[],{...complete,testAnswers:Object.fromEntries(ids.slice(0,14).map(id=>[id,"a"]))}),false);
  assert.equal(teacherCanFinish(s,lesson,studyAnswers,[],{...complete,applicationDraft:""}),false);
  assert.equal(teacherCanFinish(s,lesson,studyAnswers,[],{...complete,selfAssessment:""}),false);
  assert.equal(teacherCanFinish(s,lesson,studyAnswers,[],{...complete,testSubmittedAt:"invalid"}),false);
  assert.equal(teacherCanFinish(s,lesson,studyAnswers,[],complete),true);
  assert.equal(finishTeacherSession(s,lesson,studyAnswers,stamp,[],complete).completedAt,stamp);
  assert.equal(finishTeacherSession(s,lesson,studyAnswers,stamp,[],{...complete,testSubmittedAt:null}).completedAt,null);
  assert.deepEqual(teacherChapterAssessmentStatus(lesson,complete),
    {answered:15,expected:15,submitted:true,applicationDone:true,reflectionDone:true,ready:true});
  assert.equal(independentTeacherEvidence(s,lesson),3);
  // A submitted attempt does not require perfect points; never invent a language grade.
  assert.equal(teacherChapterAssessmentStatus(lesson,{...complete,testAnswers:Object.fromEntries(ids.map(id=>[id,"wrong"]))}).ready,true);
});
