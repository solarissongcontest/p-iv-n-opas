import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOS1_C01_LINES, LOS1_C01_SOURCE_ID } from "../src/features/los/content/los1C01.ts";
import { LOS1_C06_REVIEW_SOURCE_ID, LOS1_C06_REVIEW_QUESTIONS, LOS1_C06_REVIEW_EVIDENCE_ID,
  LOS1_C06_REVIEW_EVIDENCE_CORRECT } from "../src/features/los/content/los1C06Review.ts";
import { LOS_1_LESSONS } from "../src/features/los/learningPath.ts";
import { LOS1_C06_LESSON_BLUEPRINTS } from "../src/features/los/lessonEngineC06.ts";
import { LOS1_EXECUTABLE_LESSONS, isLos1ExecutableLesson, los1LessonDraftChapter } from "../src/features/los/guidedLessons.ts";
import { emptyLosLessonProgress, losLessonMarkStep, losLessonSubmitCheck, losLessonCanComplete,
  losLessonEvidenceMet, losLessonFinish, validateLosLessonProgressMap,parseLosLessonProgressMap
} from "../src/features/los/lessonEngine.ts";
import { losExercisesFor } from "../src/features/los/exerciseBank.ts";
import { getLosChapterSourceGate, LOS1_CHAPTER_SOURCE_PLANS } from "../src/features/los/content/sourceRegistry.ts";
import { validateLosCloudDraft } from "../src/features/los/cloudContract.ts";

const now="2026-11-12T08:30:00.000Z";
const draft=()=>({
  version:1 as const,note:"Vanha opiskelijan muistiinpano",applicationDraft:"",
  bookmarked:true,practiceAnswers:{} as Record<string,string>,
  practiceChecked:[] as string[],testAnswers:{} as Record<string,string>,
  testSubmittedAt:null as string|null,selfAssessment:"",updatedAt:now,
});
test("C06 reuses all eight real Franz/Jörg lines with correct 19/20 ages, no invented new Text A",()=>{
  assert.equal(LOS1_C06_REVIEW_SOURCE_ID,LOS1_C01_SOURCE_ID);
  assert.equal(LOS1_C01_LINES.length,8);
  assert.equal(LOS1_C01_LINES[3]?.text,"Wie alt bist du?");
  assert.match(LOS1_C01_LINES[4]!.text,/neunzehn Jahre alt/);
  assert.match(LOS1_C01_LINES[5]!.text,/zwanzig/);
  assert.equal(LOS1_C06_REVIEW_QUESTIONS.length,4);
  assert.equal(LOS1_C06_REVIEW_QUESTIONS[0]?.correctId,"b");
  assert.equal(LOS1_C06_REVIEW_QUESTIONS[1]?.correctId,"c");
  assert.equal(LOS1_C06_REVIEW_EVIDENCE_ID,"C06-SOURCE-EVIDENCE-01");
  assert.equal(LOS1_C06_REVIEW_EVIDENCE_CORRECT,"u05");
  assert.equal(LOS1_CHAPTER_SOURCE_PLANS.find(p=>p.id==="C06")?.primarySourceId,null);
  assert.equal(getLosChapterSourceGate("06").ready,false);
  assert.ok(getLosChapterSourceGate("06").issues.some(x=>x.includes("Ensisijaisen")||x.includes("puuttuu")));
});
test("C06 five real numeric lessons match canonical plan and use only existing question IDs",()=>{
  assert.equal(LOS1_C06_LESSON_BLUEPRINTS.length,5);
  assert.equal(LOS1_EXECUTABLE_LESSONS.length,49);
  const practice=new Set(losExercisesFor("06").map(x=>x.id));
  const source=new Set(LOS1_C06_REVIEW_QUESTIONS.map(x=>x.id));
  for(const [i,lesson] of LOS1_C06_LESSON_BLUEPRINTS.entries()){
    assert.equal(lesson.id,"L"+String(31+i).padStart(3,"0"));
    assert.equal(lesson.title,LOS_1_LESSONS[30+i]?.title);
    assert.equal(lesson.estimatedMinutes,30);
    assert.equal(lesson.contentVersion,"1.0.0");
    assert.ok(lesson.steps.length>=3);
    assert.ok(lesson.steps.every(s=>s.chapter==="06"&&s.minutes>0&&s.instruction.length>60));
    assert.ok(lesson.check.answers.some(a=>a.id===lesson.check.correctId));
    assert.equal(isLos1ExecutableLesson(lesson.id),true);
    assert.equal(los1LessonDraftChapter(lesson.id),"06");
    for(const e of lesson.evidence){
      if(e.kind==="answered-practice")assert.ok(e.ids?.every(id=>practice.has(id)),lesson.id+" missing exercise");
      if(e.kind==="checked-source")assert.ok(e.ids?.every(id=>source.has(id)),lesson.id+" missing source question");
    }
  }
  for(let n=27;n<=30;n++)assert.equal(isLos1ExecutableLesson("L"+String(n).padStart(3,"0")),true);
  assert.equal(LOS1_C06_LESSON_BLUEPRINTS[3]?.evidence[0]?.kind,"checked-source");
  assert.equal(LOS1_C06_LESSON_BLUEPRINTS[4]?.evidence[0]?.kind,"chapter-test");
});
test("C06 completion depends on chapter-6 evidence, not reused C01 answers or a click",()=>{
  for(const lesson of LOS1_C06_LESSON_BLUEPRINTS){
    const d=draft();
    d.practiceAnswers["C01-SOURCE-Q01"]="b";
    d.practiceChecked.push("C01-SOURCE-Q01");
    let p=emptyLosLessonProgress();
    assert.equal(losLessonCanComplete(lesson,p,d),false);
    for(const step of lesson.steps)p=losLessonMarkStep(lesson,p,step.id,now);
    assert.equal(losLessonCanComplete(lesson,p,d),false);
    p=losLessonSubmitCheck(lesson,p,lesson.check.correctId,now);
    if(lesson.evidence.length)assert.equal(losLessonCanComplete(lesson,p,d),false);
    for(const e of lesson.evidence){
      if(e.kind==="chapter-test")d.testSubmittedAt=now;
      else for(const id of e.ids??[]){
        d.practiceAnswers[id]="a";
        if(e.kind==="checked-source")d.practiceChecked.push(id);
      }
    }
    assert.equal(losLessonEvidenceMet(lesson,d),true);
    assert.equal(losLessonCanComplete(lesson,p,d),true);
    assert.equal(losLessonFinish(lesson,p,d,now).completedAt,now);
  }
  const data=draft(), review=LOS1_C06_LESSON_BLUEPRINTS[3]!;
  for(const id of review.evidence[0]!.ids??[])data.practiceAnswers[id]="a";
  assert.equal(losLessonEvidenceMet(review,data),false,"unchecked answers must not count");
});
test("C06 answers and progress fit existing optional v1 JSON and cloud contract",()=>{
  const lessonProgress={L031:emptyLosLessonProgress(),L034:emptyLosLessonProgress()};
  assert.equal(validateLosLessonProgressMap(lessonProgress),true);
  assert.deepEqual(parseLosLessonProgressMap(lessonProgress),lessonProgress);
  assert.equal(validateLosCloudDraft({...draft(),lessonProgress}),true);
});
test("C06 routing shows a reuse label, same source, inline full text and correct attribution",()=>{
  const book=readFileSync("src/features/los/LosBook.tsx","utf8");
  const reader=readFileSync("src/features/los/LosC06AgeReview.tsx","utf8");
  const original=readFileSync("src/features/los/LosOriginalDialogue.tsx","utf8");
  const runner=readFileSync("src/features/los/LosFirstLessons.tsx","utf8");
  assert.match(book,/chapter\.id==="06"/);
  assert.match(book,/LosC06AgeReview/);
  assert.match(book,/LosC06AgeUnderstanding/);
  assert.match(book,/Uusi itsenäinen Text A puuttuu yhä/);
  assert.match(reader,/lines=\{LOS1_C01_LINES\}/);
  assert.match(reader,/chapterId="06"/);
  assert.match(reader,/CC BY-SA 3\.0/);
  assert.match(reader,/ei uusi itsenäinen C06:n Text A/);
  assert.match(original,/usageLabel/);
  assert.match(runner,/useLosChapterDraft\(1, "06"\)/);
});
