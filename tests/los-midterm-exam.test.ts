import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  LOS1_MIDTERM_QUESTIONS,LOS1_MIDTERM_SECTION_TITLES,LOS1_MIDTERM_DRAFT_CHAPTER,
  validateLosMidtermBank,losExamScore,losExamReadyToSubmit,
} from "../src/features/los/content/los1Exams.ts";
import { validateLosCloudDraft,validLosChapter } from "../src/features/los/cloudContract.ts";


const answers:Record<string,string>=Object.fromEntries(LOS1_MIDTERM_QUESTIONS.map(q=>[q.id,q.correctId]));
test("midterm has exactly 25 original objective items with correct masterplan distribution",()=>{
  assert.deepEqual(validateLosMidtermBank(),[]);
  assert.equal(LOS1_MIDTERM_QUESTIONS.length,25);
  assert.equal(LOS1_MIDTERM_DRAFT_CHAPTER,"91");
  assert.deepEqual(
    ["greetings","names","origin","politeness","wellbeing"].map(section=>LOS1_MIDTERM_QUESTIONS.filter(q=>q.section===section).length),
    [5,7,5,4,4]
  );
  assert.equal(Object.keys(LOS1_MIDTERM_SECTION_TITLES).length,5);
  assert.deepEqual(LOS1_MIDTERM_QUESTIONS.map((q,i)=>q.id==="EX-MID-Q"+String(i+1).padStart(2,"0")),Array(25).fill(true));
  assert.ok(LOS1_MIDTERM_QUESTIONS.every(q=>q.choices.length===3&&q.prompt.length>10&&q.explanation.length>15));
});
test("exam does not become submittable from a partial answer draft",()=>{
  assert.equal(losExamReadyToSubmit(LOS1_MIDTERM_QUESTIONS,{}),false);
  const partial={...answers};
  delete partial["EX-MID-Q25"];
  assert.equal(losExamReadyToSubmit(LOS1_MIDTERM_QUESTIONS,partial),false);
  assert.equal(losExamReadyToSubmit(LOS1_MIDTERM_QUESTIONS,{...partial,"EX-MID-Q25":"x"}),false);
  assert.equal(losExamReadyToSubmit(LOS1_MIDTERM_QUESTIONS,answers),true);
});
test("score is exact, sectioned and does not include conversation self-assessment",()=>{
  const all=losExamScore(LOS1_MIDTERM_QUESTIONS,answers);
  assert.equal(all.correct,25);
  assert.equal(all.total,25);
  assert.deepEqual(all.perSection.map(s=>[s.correct,s.total]),[[5,5],[7,7],[5,5],[4,4],[4,4]]);
  const oneWrong={...answers,"EX-MID-Q22":"a"};
  const score=losExamScore(LOS1_MIDTERM_QUESTIONS,oneWrong);
  assert.equal(score.correct,24);
  assert.equal(score.perSection[4]?.correct,3);
  assert.equal(losExamScore(LOS1_MIDTERM_QUESTIONS,{}).correct,0);
});
test("assessment data is compatible with existing draft and cloud validation",()=>{
  const data={version:1 as const,note:"",bookmarked:false,practiceAnswers:{},practiceChecked:[],readerMarks:{},lessonProgress:{},testAnswers:answers,testSubmittedAt:"2026-11-12T09:00:00.000Z",
    applicationDraft:"A: Hallo! B: Hallo!",selfAssessment:"Osaan tervehdykset.",
    updatedAt:"2026-11-12T09:00:00.000Z"};
  assert.equal(validLosChapter(1,"91"),true);
  assert.equal(validateLosCloudDraft(data),true);
  const persisted=JSON.parse(JSON.stringify(data));
  assert.deepEqual(persisted.testAnswers,answers);
  assert.equal(persisted.applicationDraft,data.applicationDraft);
  assert.equal(persisted.selfAssessment,data.selfAssessment);
  const studySource=readFileSync("src/features/los/studyState.ts","utf8");
  assert.match(studySource,/testAnswers:input\.testAnswers/);
  assert.match(studySource,/applicationDraft:typeof input\.applicationDraft/);
});
test("JSON backup exports separate midterm slot while still importing existing ten-chapter backups",()=>{
  const src=readFileSync("src/features/los/localBackups.ts","utf8");
  assert.match(src,/return bookId===1\?\[\.\.\.chapters,"91","92","93"\]/);
  assert.match(src,/entries\.length>chapterRange\(1\)\.length/);
  assert.match(src,/chapterRange\(1\)\.includes\(id\)/);
  assert.match(src,/losDraftKey\(bookId,chapter,ownerId\)/);
  const ui=readFileSync("src/features/los/LosBackups.tsx","utf8");
  assert.match(ui,/createLosBookBackup/);
});
test("exam answers and explanations are hidden until submit in the UI",()=>{
  const ui=readFileSync("src/features/los/LosMidtermExam.tsx","utf8");
  const app=readFileSync("src/features/los/LosBook.tsx","utf8");
  const path=readFileSync("src/features/los/LosReferenceTools.tsx","utf8");
  assert.match(ui,/const submitted=Boolean\(draft\.testSubmittedAt\)/);
  assert.match(ui,/\{submitted&&<div className=\{"los-exam-feedback "/);
  assert.match(ui,/\{submitted&&<div className="los-exam-rubric"/);
  assert.match(ui,/disabled=\{!complete\|\|!saved\}/);
  assert.match(ui,/if\(!complete\|\|submitted\)return/);
  assert.match(ui,/if\(!confirmRetake\)return/);
  assert.match(ui,/useLosChapterDraft\(1,LOS1_MIDTERM_DRAFT_CHAPTER\)/);
  assert.match(app,/section === "midterm"/);
  assert.match(app,/Välikoe · C01–C05/);
  assert.match(path,/isLos1ExecutableLesson/);
});
