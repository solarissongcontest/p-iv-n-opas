import test from "node:test";
import assert from "node:assert/strict";
import { LOS1_C08_TEACHER_LESSONS, LOS1_L041_TEACHER, LOS1_L042_TEACHER,
  LOS1_L043_TEACHER, LOS1_L044_TEACHER, LOS1_L045_TEACHER } from "../src/features/los/teacher/lessonC08.ts";
import { getLosTeacherLesson } from "../src/features/los/teacher/lessonL004.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import { emptyTeacherSession, moveTeacherScene, submitTeacherAnswer,
  markTeacherHelp, teacherCanFinish, confirmTeacherActivity,
  teacherChapterAssessmentStatus, independentTeacherEvidence } from "../src/features/los/teacher/engine.ts";
import { losExercisesFor } from "../src/features/los/exerciseBank.ts";
import { LOS1_C08_TEXT } from "../src/features/los/content/los1OpenDialogues.ts";
import { LOS1_TEXT_B_SOURCES } from "../src/features/los/content/los1TextBAdditional.ts";

const at="2026-11-13T13:00:00.000Z";
const byId=(id:string)=>LOS1_C08_TEACHER_LESSONS.find(l=>l.id===id)!;

test("all five C08 Teacher manuscripts are registered, valid, scoped, and have independent exits",()=>{
 assert.deepEqual(LOS1_C08_TEACHER_LESSONS.map(l=>l.id),["L041","L042","L043","L044","L045"]);
 for(const lesson of LOS1_C08_TEACHER_LESSONS){
  assert.equal(getLosTeacherLesson(lesson.id),lesson);
  assert.deepEqual(validateTeacherLesson(lesson),[]);
  assert.equal(lesson.chapterId,"08");
  assert.equal(lesson.bookId,1);
  assert.equal(lesson.estimatedMinutes,30);
  assert.ok(lesson.scenes.length>=10);
  assert.ok(lesson.requiredQuestionIds.length>=5);
  assert.ok(lesson.scenes.some(s=>s.kind==="board"));
  assert.ok(lesson.scenes.some(s=>s.kind==="summary"));
  assert.ok(lesson.scenes.some(s=>s.help?.length || s.question?.reteach));
  assert.ok(lesson.scenes.some(s=>s.question?.evidenceRole==="independent"));
  assert.ok(lesson.scenes.some(s=>s.question?.evidenceRole==="application"));
  assert.ok(lesson.scenes.some(s=>s.question?.evidenceRole==="exit"));
  for(const link of lesson.scenes.flatMap(scene=>scene.bookLinks??[])){
   assert.equal(link.chapterId,"08");
  }
 }
});

test("five context-based scripted response situations have distinct counterparty branches",()=>{
 const all=LOS1_C08_TEACHER_LESSONS.flatMap(l=>l.scenes);
 const text=all.flatMap(s=>[...s.paragraphs,s.question?.success??"",
   ...((s.question?.options??[]).map(o=>o.wrongFeedback??""))]).join(" ");
 for(const marker of ["Ich verstehe nicht","Bitte langsamer","Noch einmal, bitte","Was bedeutet das",
   "Kannst du erklären","Können Sie das bitte wiederholen","Danke, jetzt verstehe ich"])assert.ok(text.includes(marker),marker);
 const scripted=all.filter(s=>s.question?.type==="choice" &&
   s.question.options?.filter(o=>o.wrongFeedback?.trim()).length!>=2);
 assert.ok(scripted.length>=20,"branches must respond specifically to chosen utterances");
 assert.ok(scripted.every(s=>s.question?.success && s.question?.reteach));
 assert.ok(!text.includes("tekoälychatin avulla"));
});

test("L041 and L043 require existing book exercises; no parallel workbook",()=>{
 for(const lesson of [LOS1_L041_TEACHER,LOS1_L043_TEACHER,LOS1_L044_TEACHER]){
  const ids=new Set(losExercisesFor("08").map(x=>x.id));
  assert.ok(lesson.requiredPracticeIds.every(id=>ids.has(id)));
 }
 assert.deepEqual(LOS1_L041_TEACHER.requiredPracticeIds,
  ["C08-EX-01","C08-EX-02","C08-EX-03","C08-EX-04","C08-EX-05"]);
 assert.deepEqual(LOS1_L043_TEACHER.requiredPracticeIds,
  ["C08-EX-06","C08-EX-07","C08-EX-11","C08-EX-12"]);
 assert.deepEqual(LOS1_L044_TEACHER.requiredPracticeIds,["C08-EX-07","C08-EX-08"]);
});

test("L042 uses all 26 C08 Schule units and requires three actually checked source tasks",()=>{
 assert.equal(LOS1_C08_TEXT.sourceId,"M-WB-08");
 assert.equal(LOS1_C08_TEXT.revision,"4520956");
 assert.equal(LOS1_C08_TEXT.originalLines.length,26);
 assert.match(LOS1_C08_TEXT.sourceUrl,/oldid=4520956/);
 assert.equal(LOS1_C08_TEXT.licenseCode,"CC BY-SA 4.0");
 assert.deepEqual(LOS1_L042_TEACHER.requiredCheckedIds,
  ["C08-SCHOOL-Q01","C08-SCHOOL-Q02","C08-SCHOOL-Q03"]);
 const required=LOS1_L042_TEACHER.requiredCheckedIds!;
 assert.ok(required.every(id=>LOS1_C08_TEXT.questions.some(q=>q.id===id)));
 let s=emptyTeacherSession(LOS1_L042_TEACHER,at);
 for(const scene of LOS1_L042_TEACHER.scenes){
  s=moveTeacherScene(s,LOS1_L042_TEACHER,scene.id,at);
  if(scene.question)s=submitTeacherAnswer(s,LOS1_L042_TEACHER,scene.id,
    scene.question.correctOption!,at);
  if(scene.activityId)s=confirmTeacherActivity(s,LOS1_L042_TEACHER,scene.activityId,at);
 }
 const answers=Object.fromEntries(required.map(id=>[id,"a"]));
 assert.equal(teacherCanFinish(s,LOS1_L042_TEACHER,answers),false,"not checked");
 assert.equal(teacherCanFinish(s,LOS1_L042_TEACHER,answers,required.slice(0,2)),false);
 assert.equal(teacherCanFinish(s,LOS1_L042_TEACHER,answers,required),true);
});

test("L044 distinguishes source-reading from unattested audio and requires all four Text B checks",()=>{
 const source=LOS1_TEXT_B_SOURCES["08"];
 assert.equal(source.sourceId,"M-DIB-03");
 assert.equal(source.lines.length,8);
 assert.equal(source.attribution.license,"CC BY 4.0");
 assert.deepEqual(LOS1_L044_TEACHER.requiredCheckedIds,source.questions.map(q=>q.id));
 const prose=LOS1_L044_TEACHER.scenes.flatMap(x=>x.paragraphs).join(" ");
 assert.match(prose,/äänen|kuuntelu/);
 assert.match(prose,/ei ole hyväksytty/);
 const own=LOS1_L044_TEACHER.scenes.find(s=>s.id==="own-dialogue");
 assert.equal(own?.reflection?.minLength,80);
});

test("L045 uses existing C08 chapter-test submission and self-assessment",()=>{
 const ids=losExercisesFor("08").map(x=>x.id);
 assert.equal(ids.length,12);
 assert.deepEqual(LOS1_L045_TEACHER.chapterAssessment?.requiredTestIds,ids);
 const answers=Object.fromEntries(ids.map(id=>[id,"attempt"]));
 const done={testAnswers:answers,testSubmittedAt:at,applicationDraft:"A: Ich verstehe nicht. B: Noch einmal, bitte.",
  selfAssessment:"Osaan pyytää hidastamaan; sanan selitys vaatii vielä kertausta."};
 assert.equal(teacherChapterAssessmentStatus(LOS1_L045_TEACHER,done).ready,true);
 assert.equal(teacherChapterAssessmentStatus(LOS1_L045_TEACHER,{...done,testSubmittedAt:null}).ready,false);
 assert.equal(teacherChapterAssessmentStatus(LOS1_L045_TEACHER,{...done,selfAssessment:"lyhyt"}).ready,false);
 assert.equal(teacherChapterAssessmentStatus(LOS1_L045_TEACHER,{...done,applicationDraft:""}).ready,false);
});

test("helped answers do not become independent proficiency evidence",()=>{
 const lesson=byId("L043");
 let s=emptyTeacherSession(lesson,at);
 s=markTeacherHelp(s,"independent",at);
 const choice=lesson.scenes.find(x=>x.id==="independent")!.question!;
 s=submitTeacherAnswer(s,lesson,"independent",choice.correctOption!,at);
 assert.equal(independentTeacherEvidence(s,lesson),0);
});
