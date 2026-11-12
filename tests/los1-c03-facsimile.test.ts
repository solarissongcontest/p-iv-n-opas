import assert from "node:assert/strict";
import {test} from "node:test";
import {readFileSync} from "node:fs";
import {getLosOpenDialogue} from "../src/features/los/content/los1OpenDialogues.ts";
import {LOS1_M_COM_02_LINES,LOS1_M_COM_02_QUESTIONS}
  from "../src/features/los/content/los1MCom02.ts";
import {LOS1_CULTURE} from "../src/features/los/content/los1Culture.ts";
import {LOS_EXERCISES} from "../src/features/los/exerciseBank.ts";
import {
  LOS1_C03_PRINT_PAGES,LOS1_C03_PRINT_CHAPTER,LOS1_C03_SOURCE,
  LOS1_C03_SOURCE_GATE,LOS1_C03_SOURCE_QUESTIONS,
  LOS1_C03_TEXT_A,LOS1_C03_TEXT_B,LOS1_C03_TEXT_B_REVIEW_QUESTIONS,
  LOS1_C03_TEXT_B_IS_REUSED_FROM_C02,LOS1_C03_EXERCISES,
  LOS1_C03_FORMAT,validateLos1C03Print,
} from "../src/features/los/facsimile/los1/c03Pilot.ts";

test("C03 has fourteen consecutive B5 draft leaves, all visibly unpublished",()=>{
  assert.deepEqual(validateLos1C03Print(),[]);
  assert.deepEqual(LOS1_C03_FORMAT,{widthMm:176,heightMm:250});
  assert.equal(LOS1_C03_PRINT_CHAPTER.id,"03");
  assert.equal(LOS1_C03_PRINT_PAGES.length,14);
  assert.deepEqual(LOS1_C03_PRINT_PAGES.map(p=>p.pdfPageIndex),
    Array.from({length:14},(_,i)=>i));
  assert.ok(LOS1_C03_PRINT_PAGES.every((p,i)=>
    p.chapterId==="03"&&p.status==="draft"&&p.printedPageLabel===null&&
    p.physicalSide===(i%2===0?"left":"right")&&p.imageIds.length===0));
  assert.ok(LOS1_C03_PRINT_PAGES.slice(0,2).every(p=>p.kind==="chapter-open"));
});
test("C03 uses complete and unchanged published M-WB-07 source, not invented du-speaking lines",()=>{
  const existing=getLosOpenDialogue("03");
  assert.ok(existing);
  assert.deepEqual(LOS1_C03_SOURCE,existing);
  assert.equal(LOS1_C03_SOURCE.sourceId,"M-WB-07");
  assert.equal(LOS1_C03_TEXT_A.length,8);
  assert.deepEqual(LOS1_C03_TEXT_A,existing.originalLines);
  assert.deepEqual(LOS1_C03_PRINT_PAGES.find(p=>p.section==="text")?.sourceLineIds,
    existing.originalLines.map(l=>l.id));
  assert.deepEqual(LOS1_C03_SOURCE_QUESTIONS,existing.questions);
  assert.equal(LOS1_C03_SOURCE_GATE.sourceId,"M-WB-07");
  assert.equal(LOS1_C03_SOURCE_GATE.ready,false);
  assert.match(existing.originalLines[6]?.text??"",/Woher kommen Sie/);
  assert.match(existing.originalLines[7]?.text??"",/ich komme aus Deutschland/);
});
test("C03 Text B consciously reuses C02's four original Commons turns and identifiers",()=>{
  assert.equal(LOS1_C03_TEXT_B_IS_REUSED_FROM_C02,true);
  assert.deepEqual(LOS1_C03_TEXT_B,LOS1_M_COM_02_LINES);
  assert.deepEqual(LOS1_C03_TEXT_B_REVIEW_QUESTIONS,LOS1_M_COM_02_QUESTIONS);
  assert.deepEqual(LOS1_C03_PRINT_PAGES.find(p=>p.section==="text-b")?.sourceLineIds,
    LOS1_M_COM_02_LINES.map(l=>l.id));
});
test("all 15 C03 digital exercises and 4+4+3 source/culture questions occur once",()=>{
  const actual=LOS1_C03_PRINT_PAGES.flatMap(p=>p.exerciseIds);
  const reference=LOS_EXERCISES.filter(ex=>ex.chapterId==="03").map(ex=>ex.id);
  assert.equal(reference.length,15);
  assert.deepEqual(actual,reference);
  assert.equal(LOS1_C03_EXERCISES.length,15);
  const questions=LOS1_C03_PRINT_PAGES.flatMap(p=>p.questionIds);
  const expected=[...LOS1_C03_SOURCE_QUESTIONS.map(q=>q.id),
    ...LOS1_M_COM_02_QUESTIONS.map(q=>q.id),
    ...LOS1_CULTURE["03"].questions.map(q=>q.id)];
  assert.deepEqual(questions,expected);
  assert.equal(new Set(questions).size,questions.length);
});
test("C03 print route remains an owner-gated draft with unverified media declared",()=>{
  const book=readFileSync("src/features/los/LosBook.tsx","utf8");
  const view=readFileSync("src/features/los/facsimile/los1/Los1C03FacsimilePilot.tsx","utf8");
  assert.match(book,/facsimile-c03" && book.id===1 \? <Los1C03FacsimilePilot/);
  assert.match(view,/getDeviceOwnerId\(\)/);
  assert.match(view,/los\.facsimile\.c03\.draft/);
  assert.match(view,/LOS1_C03_TEXT_A as textA/);
  assert.match(view,/LOS1_C03_TEXT_B as textB/);
  assert.match(view,/ei valmis painos/);
  assert.match(view,/Sama aineisto kuin C02:ssa/);
  assert.doesNotMatch(view,/setExerciseAnswer|recordScore|saveScore|markComplete/);
});
