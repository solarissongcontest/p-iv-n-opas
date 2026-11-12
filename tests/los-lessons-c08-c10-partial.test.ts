import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {LOS1_C08_C10_PARTIAL_LESSONS} from "../src/features/los/lessonEngineC08C10Partial.ts";
import {LOS1_EXECUTABLE_LESSONS,isLos1ExecutableLesson,los1LessonDraftChapter} from "../src/features/los/guidedLessons.ts";
import {LOS_1_LESSONS} from "../src/features/los/learningPath.ts";
import {losExercisesFor} from "../src/features/los/exerciseBank.ts";
import {getLosChapterSourceGate,LOS1_CHAPTER_SOURCE_PLANS} from "../src/features/los/content/sourceRegistry.ts";
import {emptyLosLessonProgress,losLessonCanComplete,losLessonEvidenceMet,losLessonFinish,losLessonMarkStep,losLessonSubmitCheck,validateLosLessonProgressMap} from "../src/features/los/lessonEngine.ts";
import {validateLosCloudDraft} from "../src/features/los/cloudContract.ts";
const now="2026-11-12T09:30:00.000Z";
const draft=()=>({version:1 as const,note:"vanha",applicationDraft:"",bookmarked:true,
 practiceAnswers:{} as Record<string,string>,practiceChecked:[] as string[],
 testAnswers:{} as Record<string,string>,testSubmittedAt:null as string|null,selfAssessment:"",updatedAt:now});
test("C08 and C10 make only four source-independent lessons executable, not source-reading chapters",()=>{
  assert.deepEqual(LOS1_C08_C10_PARTIAL_LESSONS.map(x=>x.id),["L041","L043","L051","L053"]);
  assert.equal(LOS1_EXECUTABLE_LESSONS.length,58);
  assert.equal(new Set(LOS1_EXECUTABLE_LESSONS.map(x=>x.id)).size,58);
  assert.deepEqual(LOS1_EXECUTABLE_LESSONS.map(x=>Number(x.id.slice(1))),[...LOS1_EXECUTABLE_LESSONS.map(x=>Number(x.id.slice(1)))].sort((a,b)=>a-b));
  for(const id of ["L041","L043","L051","L053"])assert.equal(isLos1ExecutableLesson(id),true);
  for(const id of ["L059","L060"])assert.equal(isLos1ExecutableLesson(id),false);
  assert.equal(los1LessonDraftChapter("L041"),"08");
  assert.equal(los1LessonDraftChapter("L043"),"08");
  assert.equal(los1LessonDraftChapter("L051"),"10");
  assert.equal(los1LessonDraftChapter("L053"),"10");
});
test("C08 and C10 remain editorially blocked, even though C10 primary text is now readable",()=>{
  const c08=LOS1_CHAPTER_SOURCE_PLANS.find(x=>x.id==="C08");
  assert.equal(c08?.primarySourceId,"M-WB-08");
  const gate8=getLosChapterSourceGate("08");
  const gate10=getLosChapterSourceGate("10");
  assert.equal(gate8.ready,false);
  assert.equal(gate10.ready,false);
  assert.ok(gate8.issues.length>0 && gate10.issues.length>0);
  const src=readFileSync("src/features/los/lessonEngineC08C10Partial.ts","utf8");
  assert.match(src,/uuden Wikibooks-koulukohtauksen koko Text A on luettavissa/);
  assert.match(src,/ei ole vielä tarkistettu/);
  assert.match(src,/nyt luettavissa suoraan Text A/);
  assert.match(src,/eivät todista C10:n autenttisen äänitteen kuullunymmärtämistä/);
});
test("all four guided lessons refer to real practice IDs with chapter-local submission",()=>{
  const exercise8=new Set(losExercisesFor("08").map(x=>x.id));
  const exercise10=new Set(losExercisesFor("10").map(x=>x.id));
  for(const lesson of LOS1_C08_C10_PARTIAL_LESSONS){
    assert.equal(lesson.title,LOS_1_LESSONS[Number(lesson.id.slice(1))-1]?.title);
    assert.equal(lesson.estimatedMinutes,30);
    assert.equal(lesson.contentVersion,"1.0.0");
    assert.equal(lesson.steps.length,3);
    assert.ok(lesson.steps.every(step=>step.minutes>0&&step.instruction.length>80));
    assert.equal(lesson.evidence.length,1);
    assert.equal(lesson.evidence[0]?.kind,"answered-practice");
    const chapter=los1LessonDraftChapter(lesson.id);
    const exercises=chapter==="08"?exercise8:exercise10;
    assert.ok(lesson.evidence[0]?.ids?.every(id=>exercises.has(id)),lesson.id+" references missing exercise");
    assert.ok(lesson.check.answers.some(a=>a.id===lesson.check.correctId));
  }
});
test("lesson completion needs the correct chapter's practice answers, not visited routes or unrelated chapters",()=>{
  for(const lesson of LOS1_C08_C10_PARTIAL_LESSONS){
    const d=draft();
    d.practiceAnswers["C03-EX-01"]="a";
    let p=emptyLosLessonProgress();
    assert.equal(losLessonCanComplete(lesson,p,d),false);
    for(const step of lesson.steps)p=losLessonMarkStep(lesson,p,step.id,now);
    assert.equal(losLessonCanComplete(lesson,p,d),false);
    p=losLessonSubmitCheck(lesson,p,lesson.check.correctId,now);
    assert.equal(losLessonCanComplete(lesson,p,d),false);
    for(const id of lesson.evidence[0]!.ids??[])d.practiceAnswers[id]="testattu";
    assert.equal(losLessonEvidenceMet(lesson,d),true);
    assert.equal(losLessonCanComplete(lesson,p,d),true);
    assert.equal(losLessonFinish(lesson,p,d,now).completedAt,now);
  }
});
test("existing v1 draft format and sparse lesson progress remain backup compatible",()=>{
  const p={L041:emptyLosLessonProgress(),L051:emptyLosLessonProgress()};
  assert.equal(validateLosLessonProgressMap(p),true);
  assert.equal(validateLosCloudDraft({...draft(),lessonProgress:p}),true);
  const runner=readFileSync("src/features/los/LosFirstLessons.tsx","utf8");
  const index=readFileSync("src/features/los/LosReferenceTools.tsx","utf8");
  assert.match(runner,/useLosChapterDraft\(1, "08"\)/);
  assert.match(runner,/useLosChapterDraft\(1, "10"\)/);
  assert.match(index,/C08:n koko Wikibooksin kouluympäristön alkuperäiskohtaus/);
  assert.match(index,/C10:n Harald-haastattelu ovat nyt kirjan sisällä/);
});
