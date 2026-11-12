import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {losExercisesFor,losScore} from "../src/features/los/exerciseBank.ts";
import {
 losWithoutWorkbookAnswers,losArchiveChapterExam,losChapterExamHistory,
} from "../src/features/los/losWorkbookPersistence.ts";
import {validateLosCloudDraft} from "../src/features/los/cloudContract.ts";

const at="2026-11-12T14:11:00.000Z";
const full=(ch:string)=>Object.fromEntries(losExercisesFor(ch).map(ex=>[ex.id,ex.correct]));
test("clearing drill answers NEVER erases 10 chapter sources, Text B, culture, annotations or unrelated answers",()=>{
 for(let i=1;i<=10;i++){
  const ch=String(i).padStart(2,"0");
  const drills=losExercisesFor(ch);assert.ok(drills.length>=12&&drills.length<=20);
  const mixed={
   ...full(ch),["C"+ch+"-SOURCE-EVIDENCE-01"]:"u15",
   ["C"+ch+"-TEXTB-Q01"]:"a",["C"+ch+"-CULT-Q01"]:"b",
   ["C"+ch+"-SCHOOL-Q01"]:"a",["C"+ch+"-EX-ARCHIVE-01"]:"old response",
   ["EX-SUMMARY-GOAL"]:"Harjoittele seuraavaksi enemmän.",
  };
  const cleaned=losWithoutWorkbookAnswers(mixed,drills);
  assert.equal(Object.keys(cleaned).length,6,"Only workbook IDs should be removed: C"+ch);
  assert.equal(cleaned["C"+ch+"-TEXTB-Q01"],"a");
  assert.equal(cleaned["C"+ch+"-CULT-Q01"],"b");
  assert.equal(cleaned["C"+ch+"-SOURCE-EVIDENCE-01"],"u15");
  assert.equal(cleaned["EX-SUMMARY-GOAL"],"Harjoittele seuraavaksi enemmän.");
  assert.equal(Object.keys(mixed).length,drills.length+6,"Original input must remain immutable");
 }
});
test("all 10 chapter tests store full submitted answers, result and timestamp before retake",()=>{
 for(let i=1;i<=10;i++){
  const chapter=String(i).padStart(2,"0");
  const drills=losExercisesFor(chapter);
  const answers=full(chapter);
  assert.equal(losScore(chapter,answers).correct,drills.length);
  const practice={"C"+chapter+"-TEXTB-Q01":"a"};
  const saved=losArchiveChapterExam(practice,chapter,drills,answers,at);
  const records=losChapterExamHistory(saved,chapter);
  assert.equal(records.length,1,chapter);
  assert.equal(records[0]?.correct,drills.length);
  assert.equal(records[0]?.total,drills.length);
  assert.equal(records[0]?.submittedAt,at);
  assert.equal(records[0]?.answers.length,drills.length);
  assert.deepEqual(Object.fromEntries(records[0]!.answers.map(r=>[r.id,r.answer])),answers);
  assert.equal(saved["C"+chapter+"-TEXTB-Q01"],"a");
  assert.equal(practice["C"+chapter+"-TEST-ARCHIVE-01"],undefined);
  assert.equal(Object.values(saved).every(v=>v.length<=500),true);
  const draft={version:1,bookmarked:false,note:"",applicationDraft:"",selfAssessment:"",
   practiceAnswers:saved,practiceChecked:[],testAnswers:{},testSubmittedAt:null,
   updatedAt:at};
  assert.equal(validateLosCloudDraft(draft),true);
  assert.deepEqual(JSON.parse(JSON.stringify(draft)).practiceAnswers,saved);
 }
});
test("two chapter-test retakes keep historical scores without accidental overwrites",()=>{
 const ch="10",bank=losExercisesFor(ch),good=full(ch);
 const first=losArchiveChapterExam({},ch,bank,good,at);
 const other={...good,[bank[0]!.id]:"some incorrect answer"};
 const second=losArchiveChapterExam(first,ch,bank,other,"2026-11-13T14:11:00.000Z");
 assert.deepEqual(losChapterExamHistory(second,ch).map(r=>r.correct),[bank.length,bank.length-1]);
 assert.deepEqual(losChapterExamHistory(second,ch).map(r=>r.number),[1,2]);
 assert.equal(losChapterExamHistory(first,ch).length,1);
 const damaged={"C10-TEST-ARCHIVE-01":"{malformed","C10-TEXTB-Q01":"b"};
 const after=losArchiveChapterExam(damaged,ch,bank,good,at);
 assert.ok(after["C10-TEST-ARCHIVE-02"]);
 assert.equal(after["C10-TEST-ARCHIVE-01"],"{malformed");
 assert.equal(losChapterExamHistory(after,ch).length,1);
});
test("missing or oversized previous answers fail closed instead of losing a completed attempt",()=>{
 const ch="10",exercises=losExercisesFor(ch),answers=full(ch);
 delete answers[exercises[0]!.id];
 assert.throws(()=>losArchiveChapterExam({},ch,exercises,answers,at),/vastaukset/);
 assert.throws(()=>losArchiveChapterExam({},ch,exercises,full(ch),"invalid"),/tiedot/);
 assert.throws(()=>losArchiveChapterExam({},ch,exercises,full(ch),"2026-11-99T14:11:00Z"),
   /tiedot|arkistoitavissa/);
});
test("workbook UI no longer resets all shared practice or deletes the completed chapter result",()=>{
 const ui=readFileSync("src/features/los/LosWorkbook.tsx","utf8");
 assert.match(ui,/losWithoutWorkbookAnswers\(current.practiceAnswers,exercises\)/);
 assert.match(ui,/practiceAnswers:losArchiveChapterExam\(/);
 assert.match(ui,/losChapterExamHistory\(draft.practiceAnswers,chapter.id\)/);
 assert.doesNotMatch(ui,/practiceAnswers:\{\}\}\)/);
 assert.doesNotMatch(ui,/testAnswers:\{\},testSubmittedAt:null,selfAssessment:""/);
 assert.match(ui,/Arkistoi tulos ja aloita uusinta/);
});
