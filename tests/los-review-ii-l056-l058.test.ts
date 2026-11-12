import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {LOS_1_LESSONS} from "../src/features/los/learningPath.ts";
import {
  LOS1_REVIEW_II_DRAFT_CHAPTER,LOS1_REVIEW_II_GROUPS,LOS1_REVIEW_II_QUESTIONS,
  LOS1_REVIEW_II_WRITING_ID,losReviewIIQuestionsFor,losReviewIIReflectionId,
  validateLosReviewIIQuestions,
} from "../src/features/los/content/los1ReviewII.ts";
import {LOS1_REVIEW_II_LESSONS} from "../src/features/los/lessonEngineReviewII.ts";
import {LOS1_EXECUTABLE_LESSONS,los1LessonDraftChapter,isLos1ExecutableLesson} from "../src/features/los/guidedLessons.ts";
import {
  emptyLosLessonProgress,losLessonCanComplete,losLessonEvidenceMet,
  losLessonFinish,losLessonMarkStep,losLessonSubmitCheck,validateLosLessonProgressMap,
} from "../src/features/los/lessonEngine.ts";
import {validateLosCloudDraft,validLosChapter} from "../src/features/los/cloudContract.ts";
import {getLosChapterSourceGate} from "../src/features/los/content/sourceRegistry.ts";

const now="2026-11-12T10:00:00.000Z";
const draft=()=>({
  version:1 as const,note:"",applicationDraft:"",bookmarked:false,
  practiceAnswers:{} as Record<string,string>,practiceChecked:[] as string[],
  testAnswers:{} as Record<string,string>,testSubmittedAt:null as string|null,
  selfAssessment:"",updatedAt:now,
});

test("Review II adds only L056–L058, retains exactly 60 planned lessons and keeps missing source units blocked",()=>{
  assert.equal(LOS_1_LESSONS.length,60);
  assert.equal(LOS1_EXECUTABLE_LESSONS.length,52);
  assert.deepEqual(LOS1_REVIEW_II_LESSONS.map(l=>l.id),["L056","L057","L058"]);
  for(const [i,lesson] of LOS1_REVIEW_II_LESSONS.entries()){
    assert.equal(lesson.title,LOS_1_LESSONS[55+i]?.title);
    assert.equal(lesson.contentVersion,"1.0.0");
    assert.equal(lesson.estimatedMinutes,30);
    assert.equal(lesson.steps.length,3);
    assert.ok(lesson.steps.every(step=>step.instruction.length>60&&step.minutes>0));
    assert.ok(lesson.steps.every(step=>step.chapter!==null||step.section==="review-ii"));
    assert.equal(los1LessonDraftChapter(lesson.id),"92");
    assert.equal(isLos1ExecutableLesson(lesson.id),true);
  }
  for(const id of ["L042","L044","L045","L052","L054","L055","L059","L060"]){
    assert.equal(isLos1ExecutableLesson(id),false,id+" must stay unavailable");
  }
  assert.equal(getLosChapterSourceGate("06").ready,false);
  assert.equal(getLosChapterSourceGate("08").ready,false);
  assert.equal(getLosChapterSourceGate("10").ready,false);
});

test("15 original exercises, unique IDs, five per group and distinct ungraded reflections",()=>{
  assert.deepEqual(validateLosReviewIIQuestions(),[]);
  assert.equal(LOS1_REVIEW_II_QUESTIONS.length,15);
  assert.equal(new Set(LOS1_REVIEW_II_QUESTIONS.map(q=>q.id)).size,15);
  assert.equal(LOS1_REVIEW_II_DRAFT_CHAPTER,"92");
  assert.equal(LOS1_REVIEW_II_WRITING_ID,"EX-REV2-WRITING-058");
  assert.deepEqual(LOS1_REVIEW_II_GROUPS.map(g=>g.id),["L056","L057","L058"]);
  for(const group of LOS1_REVIEW_II_GROUPS){
    const questions=losReviewIIQuestionsFor(group.id);
    const lesson=LOS1_REVIEW_II_LESSONS.find(l=>l.id===group.id)!;
    assert.equal(questions.length,5);
    assert.deepEqual(lesson.evidence[0]?.ids,questions.map(q=>q.id));
    assert.deepEqual(lesson.evidence.at(-1)?.ids,[losReviewIIReflectionId(group.id)]);
    assert.ok(questions.every(q=>q.answers.some(a=>a.id===q.correctId)&&q.explanation.length>10));
  }
});

test("review cannot complete from page visit, unchecked selections or missing subjective review",()=>{
  for(const lesson of LOS1_REVIEW_II_LESSONS){
    const d=draft();
    let p=emptyLosLessonProgress();
    assert.equal(losLessonCanComplete(lesson,p,d),false);
    for(const step of lesson.steps)p=losLessonMarkStep(lesson,p,step.id,now);
    p=losLessonSubmitCheck(lesson,p,lesson.check.correctId,now);
    assert.equal(losLessonCanComplete(lesson,p,d),false);
    for(const q of losReviewIIQuestionsFor(lesson.id as "L056"|"L057"|"L058")){
      d.practiceAnswers[q.id]=q.correctId;
    }
    assert.equal(losLessonEvidenceMet(lesson,d),false,"checking is required, not just choosing");
    for(const q of losReviewIIQuestionsFor(lesson.id as "L056"|"L057"|"L058")){
      d.practiceChecked.push(q.id);
    }
    assert.equal(losLessonCanComplete(lesson,p,d),false,"self-assessment required");
    if(lesson.id==="L058"){
      d.practiceAnswers[losReviewIIReflectionId("L058")]="some";
      assert.equal(losLessonCanComplete(lesson,p,d),false,"writing attempt required");
      d.practiceAnswers[LOS1_REVIEW_II_WRITING_ID]="Hallo! Ich heiße Mia. Ich komme aus Finnland. Ich bin siebzehn Jahre alt.";
    }else{
      d.practiceAnswers[losReviewIIReflectionId(lesson.id as "L056"|"L057")]="some";
    }
    assert.equal(losLessonCanComplete(lesson,p,d),true);
    assert.equal(losLessonFinish(lesson,p,d,now).completedAt,now);
  }
});

test("reserved assessment slot 92 round-trips in existing cloud and JSON backup contracts",()=>{
  assert.equal(validLosChapter(1,"92"),true);
  assert.equal(validLosChapter(1,"00"),false);
  const d=draft();
  d.practiceAnswers[LOS1_REVIEW_II_WRITING_ID]="Ich heiße Mia. Ich bin siebzehn Jahre alt.";
  d.practiceAnswers["EX-REV2-SELF-058"]="well";
  d.practiceChecked=["EX-REV2-Q11"];
  d.lessonProgress={L056:emptyLosLessonProgress(),L057:emptyLosLessonProgress(),L058:emptyLosLessonProgress()};
  assert.equal(validateLosLessonProgressMap(d.lessonProgress),true);
  assert.equal(validateLosCloudDraft(d),true);
  const backup=readFileSync("src/features/los/localBackups.ts","utf8");
  assert.match(backup,/\[\.\.\.chapters,"91","92"\]/);
  assert.match(backup,/mode==="missing-only"/);
});

test("navigation links Review II, its lessons and accurate progress without fake final exam",()=>{
  const book=readFileSync("src/features/los/LosBook.tsx","utf8");
  const runner=readFileSync("src/features/los/LosFirstLessons.tsx","utf8");
  const ui=readFileSync("src/features/los/LosReviewII.tsx","utf8");
  const study=readFileSync("src/features/los/LosStudyProgress.tsx","utf8");
  assert.match(book,/section === "review-ii" && book\.id===1 \? <LosReviewII move=\{move\}/);
  assert.match(book,/Kertaus II · L056–L058/);
  assert.match(runner,/useLosChapterDraft\(1, "92"\)/);
  assert.match(runner,/Kertaus II/);
  assert.match(study,/useLosChapterDraft\(1,"92"\)/);
  assert.match(ui,/practiceChecked:Array\.from/);
  assert.match(ui,/ei pisteytetä automaattisesti/);
  assert.match(ui,/Loppukoe on erillinen/);
  assert.doesNotMatch(ui,/50 pistettä\/50/);
});
