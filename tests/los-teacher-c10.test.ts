import test from "node:test";
import assert from "node:assert/strict";
import { LOS1_C10_TEACHER_LESSONS, LOS1_L051_TEACHER, LOS1_L052_TEACHER,
  LOS1_L053_TEACHER, LOS1_L054_TEACHER, LOS1_L055_TEACHER } from "../src/features/los/teacher/lessonC10.ts";
import { getLosTeacherLesson } from "../src/features/los/teacher/lessonL004.ts";
import { losExercisesFor } from "../src/features/los/exerciseBank.ts";
import { LOS1_C10_TEXT } from "../src/features/los/content/los1OpenDialogues.ts";
import { LOS1_TEXT_B_SOURCES } from "../src/features/los/content/los1TextBAdditional.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import {
  emptyTeacherSession, moveTeacherScene, submitTeacherAnswer,
  confirmTeacherActivity, setTeacherAnswerDraft, teacherCanFinish,
  independentTeacherEvidence, markTeacherHelp, teacherChapterAssessmentStatus,
} from "../src/features/los/teacher/engine.ts";
import type { TeacherLesson, TeacherSession } from "../src/features/los/teacher/engine.ts";

const at = "2026-11-13T14:00:00.000Z";
const lessonIds = ["L051","L052","L053","L054","L055"];
const exercises = losExercisesFor("10");
function completeSceneWork(lesson:TeacherLesson):TeacherSession {
  let session = emptyTeacherSession(lesson,at);
  for(const scene of lesson.scenes){
    session = moveTeacherScene(session,lesson,scene.id,at);
    if(scene.question){
      const q=scene.question;
      session=submitTeacherAnswer(session,lesson,scene.id,
        q.type==="choice" ? q.correctOption! : q.accepted![0]!,at);
    }
    if(scene.reflection){
      session=setTeacherAnswerDraft(session,scene.id,"Olen harjoitellut keskustelua itsenäisesti ja vertaan muotoja malliin. ".repeat(3),at);
    }
    if(scene.activityId)session=confirmTeacherActivity(session,lesson,scene.activityId,at);
  }
  return session;
}
test("L051–L055 are registered as five distinct complete C10 Teacher 2.0 previews",()=>{
  assert.deepEqual(LOS1_C10_TEACHER_LESSONS.map(item=>item.id),lessonIds);
  for(const lesson of LOS1_C10_TEACHER_LESSONS){
    assert.equal(getLosTeacherLesson(lesson.id),lesson);
    assert.equal(lesson.bookId,1);
    assert.equal(lesson.chapterId,"10");
    assert.deepEqual(validateTeacherLesson(lesson),[],lesson.id);
    assert.ok(lesson.scenes.some(scene=>scene.kind==="board"),lesson.id);
    assert.ok(lesson.scenes.some(scene=>scene.kind==="summary"),lesson.id);
    assert.ok(lesson.scenes.some(scene=>scene.help?.length || scene.question?.hint),lesson.id);
    assert.ok(lesson.scenes.some(scene=>scene.question?.evidenceRole==="independent"),lesson.id);
    assert.ok(lesson.scenes.some(scene=>scene.question?.evidenceRole==="exit"),lesson.id);
    assert.ok(lesson.requiredPracticeIds.every(id=>exercises.some(ex=>ex.id===id)),lesson.id);
    assert.equal(new Set(lesson.scenes.map(scene=>scene.id)).size,lesson.scenes.length);
  }
});
test("L051 consolidates prior taught material, and L053 reuses four actual third-person exercises",()=>{
  assert.deepEqual(LOS1_L053_TEACHER.requiredPracticeIds,
    ["C10-EX-06","C10-EX-07","C10-EX-08","C10-EX-10"]);
  for(const form of ["Ich heiße","Woher kommst du","Wie alt bist du","Wie geht's","Tschüss"]){
    assert.match(LOS1_L051_TEACHER.scenes.flatMap(s=>s.paragraphs).join(" "),new RegExp(form.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")));
  }
  assert.ok(LOS1_L051_TEACHER.requiredPracticeIds.includes("C10-EX-20"));
  const sourceLinks=LOS1_L051_TEACHER.scenes.flatMap(scene=>scene.bookLinks??[]);
  for(const chapter of ["02","03","10"])assert.ok(sourceLinks.some(link=>link.chapterId===chapter && link.section==="text"),chapter);
  assert.ok(LOS1_L051_TEACHER.requiredActivityIds.includes("source-bridges-reviewed"));
  const board=LOS1_L053_TEACHER.scenes.find(s=>s.id==="builder")?.board??[];
  assert.ok(board.some(x=>x.german.includes("Sie kommt aus Finnland")));
  assert.ok(board.some(x=>x.german.includes("Sie ist siebzehn")));
});
test("L052 uses the whole canonical 14-turn Harald interview but cannot claim listening",()=>{
  assert.equal(LOS1_C10_TEXT.originalLines.length,14);
  const all=LOS1_L052_TEACHER.scenes.find(s=>s.id==="entire-source")!.board!;
  assert.deepEqual(all.map(item=>item.german),LOS1_C10_TEXT.originalLines.map(line=>line.text));
  assert.deepEqual(all.map(item=>item.meaning),LOS1_C10_TEXT.originalLines.map(line=>line.meaning));
  assert.deepEqual(LOS1_L052_TEACHER.requiredCheckedIds,
    ["C10-HARALD-Q01","C10-HARALD-Q02","C10-HARALD-Q03"]);
  assert.ok(LOS1_L052_TEACHER.mediaGate && !LOS1_L052_TEACHER.mediaGate.approved);
  assert.equal(LOS1_L052_TEACHER.mediaGate?.sourceId,"M-DIB-02");
  const checked=LOS1_L052_TEACHER.requiredCheckedIds!;
  const practice=Object.fromEntries(checked.map(id=>[id,"a"]));
  const s=completeSceneWork(LOS1_L052_TEACHER);
  assert.equal(teacherCanFinish(s,LOS1_L052_TEACHER,practice,checked),false,
    "reading and three source checks must not unlock a hearing certificate");
  assert.equal(teacherCanFinish(s,{...LOS1_L052_TEACHER,mediaGate:{...LOS1_L052_TEACHER.mediaGate!,approved:true}},practice,checked),true,
    "once explicitly approved, the ordinary requirements still apply");
  assert.equal(teacherCanFinish(s,{...LOS1_L052_TEACHER,mediaGate:{...LOS1_L052_TEACHER.mediaGate!,approved:true}},practice,checked.slice(0,2)),false);
});
test("L054 checks two real C10 Text B identifiers and requires two independent self-reviewed scripts",()=>{
  assert.equal(LOS1_TEXT_B_SOURCES["10"].sourceId,"M-COM-02");
  assert.equal(LOS1_TEXT_B_SOURCES["10"].lines.length,4);
  assert.deepEqual(LOS1_L054_TEACHER.scenes.find(x=>x.id==="text-b")?.board?.map(x=>x.german),
    LOS1_TEXT_B_SOURCES["10"].lines.map(line=>line.text));
  assert.deepEqual(LOS1_L054_TEACHER.requiredCheckedIds,["C10-TEXTB-Q01","C10-TEXTB-Q02"]);
  assert.ok(LOS1_L054_TEACHER.scenes.some(x=>x.id==="branch-a"));
  assert.ok(LOS1_L054_TEACHER.scenes.some(x=>x.id==="branch-b"));
  const s=completeSceneWork(LOS1_L054_TEACHER);
  const practice=Object.fromEntries(LOS1_L054_TEACHER.requiredPracticeIds.map(id=>[id,"yes"]));
  const sources=Object.fromEntries(LOS1_L054_TEACHER.requiredCheckedIds!.map(id=>[id,"a"]));
  const checked=LOS1_L054_TEACHER.requiredCheckedIds!;
  assert.equal(teacherCanFinish(s,LOS1_L054_TEACHER,{...practice,...sources},checked),true);
  assert.equal(teacherCanFinish(s,LOS1_L054_TEACHER,{...practice,...sources},checked.slice(0,1)),false);
  assert.equal(teacherCanFinish({...s,draftAnswers:{...s.draftAnswers,"dialogue-sie":""}},
    LOS1_L054_TEACHER,{...practice,...sources},checked),false);
});
test("L055 gates finishing on the actual 20-item chapter test, app writing and self-assessment",()=>{
  assert.equal(exercises.length,20);
  assert.deepEqual(LOS1_L055_TEACHER.chapterAssessment?.requiredTestIds,
    exercises.map(item=>item.id));
  const s=completeSceneWork(LOS1_L055_TEACHER);
  const submitted={
    testAnswers:Object.fromEntries(exercises.map(item=>[item.id,"a"])),
    testSubmittedAt:at,applicationDraft:"Zwei Begegnungen: Hallo! Ich heiße Mia. / Guten Tag! Wie heißen Sie?",
    selfAssessment:"Osaan kysyä nimen ja alkuperän.",
  };
  assert.equal(teacherCanFinish(s,LOS1_L055_TEACHER,{},[],submitted),true);
  assert.equal(teacherChapterAssessmentStatus(LOS1_L055_TEACHER,submitted).expected,20);
  assert.equal(teacherCanFinish(s,LOS1_L055_TEACHER,{},[],
    {...submitted,testSubmittedAt:null}),false);
  assert.equal(teacherCanFinish(s,LOS1_L055_TEACHER,{},[],
    {...submitted,selfAssessment:""}),false);
  assert.equal(teacherCanFinish(s,LOS1_L055_TEACHER,{},[],
    {...submitted,applicationDraft:""}),false);
  assert.equal(teacherCanFinish(s,LOS1_L055_TEACHER,{},[],
    {...submitted,testAnswers:{"C10-EX-01":"a"}}),false);
});
test("C10 practice, independent evidence and helped answers remain distinct",()=>{
  const lesson=LOS1_L053_TEACHER;
  const s=completeSceneWork(lesson);
  assert.ok(independentTeacherEvidence(s,lesson)>=2);
  assert.equal(teacherCanFinish(s,lesson,{}),false,
    "Teacher exercises alone do not fill the real workbook");
  const practice=Object.fromEntries(lesson.requiredPracticeIds.map(id=>[id,"test"]));
  assert.equal(teacherCanFinish(s,lesson,practice),true);
  let helped=markTeacherHelp(emptyTeacherSession(lesson,at),"independent",at);
  helped=submitTeacherAnswer(helped,lesson,"independent","Er kommt aus Deutschland.",at);
  assert.equal(independentTeacherEvidence(helped,lesson),0);
});
