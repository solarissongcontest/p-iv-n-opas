import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {getLosOpenDialogue} from "../src/features/los/content/los1OpenDialogues.ts";
import {LOS1_TEXT_B_SOURCES} from "../src/features/los/content/los1TextBAdditional.ts";
import {LOS_EXERCISES} from "../src/features/los/exerciseBank.ts";
import {LOS1_CULTURE} from "../src/features/los/content/los1Culture.ts";
import {
  LOS1_C04_PRINT_PAGES,LOS1_C04_PRINT_CHAPTER,LOS1_C04_SOURCE,
  LOS1_C04_TEXT_A,LOS1_C04_TEXT_B,LOS1_C04_SOURCE_GATE,LOS1_C04_EXERCISES,
  LOS1_C04_TEXT_B_REUSED_FROM_C01,LOS1_C04_FORMAT,validateLos1C04Print,
} from "../src/features/los/facsimile/los1/c04Pilot.ts";

test("C04 has 16 consecutive B5 draft pages, both physical spread sides and zero invented folios",()=>{
  assert.deepEqual(validateLos1C04Print(),[]);
  assert.deepEqual(LOS1_C04_FORMAT,{widthMm:176,heightMm:250});
  assert.equal(LOS1_C04_PRINT_PAGES.length,16);
  assert.equal(LOS1_C04_PRINT_CHAPTER.id,"04");
  assert.deepEqual(LOS1_C04_PRINT_PAGES.map(p=>p.pdfPageIndex),
    Array.from({length:16},(_,i)=>i));
  assert.ok(LOS1_C04_PRINT_PAGES.every((p,i)=>p.chapterId==="04"&&
    p.status==="draft"&&p.printedPageLabel===null&&p.imageIds.length===0&&
    p.physicalSide===(i%2===0?"left":"right")));
  assert.ok(LOS1_C04_PRINT_PAGES.slice(0,2).every(p=>p.kind==="chapter-open"));
  assert.equal(LOS1_C04_PRINT_PAGES.find(p=>p.section==="grammar-comparison")?.pdfPageIndex,6);
});
test("C04 preserves the full eight-turn Wikibooks M-WB-06 original without rewriting it into du form",()=>{
  const published=getLosOpenDialogue("04");
  assert.ok(published);
  assert.equal(published.sourceId,"M-WB-06");
  assert.deepEqual(LOS1_C04_SOURCE,published);
  assert.equal(LOS1_C04_TEXT_A.length,8);
  assert.deepEqual(LOS1_C04_TEXT_A,published.originalLines);
  assert.match(LOS1_C04_TEXT_A[0]!.text,/Wie geht es Ihnen/);
  assert.match(LOS1_C04_TEXT_A[7]!.text,/bis morgen/);
  assert.deepEqual(LOS1_C04_PRINT_PAGES.find(p=>p.section==="text")?.sourceLineIds,
    published.originalLines.map(l=>l.id));
  assert.equal(LOS1_C04_SOURCE_GATE.sourceId,published.sourceId);
  assert.equal(LOS1_C04_SOURCE_GATE.ready,false);
});
test("C04 Text B is the exact original twenty-expression M-COM-03 source previously used by C01",()=>{
  const c01=LOS1_TEXT_B_SOURCES["01"];
  assert.equal(LOS1_C04_TEXT_B.sourceId,"M-COM-03");
  assert.equal(LOS1_C04_TEXT_B_REUSED_FROM_C01,true);
  assert.equal(LOS1_C04_TEXT_B.transcriptIsExact,true);
  assert.equal(LOS1_C04_TEXT_B.lines.length,20);
  assert.deepEqual(LOS1_C04_TEXT_B.lines,c01.lines);
  const halves=LOS1_C04_PRINT_PAGES.filter(p=>p.section==="text-b");
  assert.equal(halves.length,2);
  assert.deepEqual(halves.map(p=>p.sourceLineIds.length),[10,10]);
  assert.deepEqual(halves.flatMap(p=>p.sourceLineIds),
    LOS1_C04_TEXT_B.lines.map(l=>l.id));
  assert.equal(LOS1_C04_TEXT_B.attribution.license,"Public domain");
});
test("C04 includes all twelve digital exercises and eleven unique source/culture questions",()=>{
  const exercises=LOS1_C04_PRINT_PAGES.flatMap(p=>p.exerciseIds);
  const bank=LOS_EXERCISES.filter(ex=>ex.chapterId==="04").map(ex=>ex.id);
  assert.equal(bank.length,12);
  assert.deepEqual(exercises,bank);
  assert.equal(LOS1_C04_EXERCISES.length,12);
  const expectedQuestions=[
    ...LOS1_C04_SOURCE.questions,...LOS1_C04_TEXT_B.questions,
    ...LOS1_CULTURE["04"].questions,
  ].map(q=>q.id);
  const questions=LOS1_C04_PRINT_PAGES.flatMap(p=>p.questionIds);
  assert.equal(expectedQuestions.length,11);
  assert.deepEqual(questions,expectedQuestions);
  assert.equal(new Set(questions).size,11);
});
test("C04 remains a locally bookmarked, release-blocked preview with no scoring",()=>{
  const book=readFileSync("src/features/los/LosBook.tsx","utf8");
  const reader=readFileSync("src/features/los/facsimile/los1/Los1C04FacsimilePilot.tsx","utf8");
  assert.match(book,/facsimile-c04" && book.id===1 \? <Los1C04FacsimilePilot/);
  assert.match(reader,/getDeviceOwnerId\(\)/);
  assert.match(reader,/los\.facsimile\.c04\.draft/);
  assert.match(reader,/LOS1_C04_TEXT_A as textA/);
  assert.match(reader,/LOS1_C04_TEXT_B as textB/);
  assert.match(reader,/ei valmis painos/);
  assert.match(reader,/Sama julkisen domainin 20 ilmauksen lista esiintyi C01:ssä/);
  assert.doesNotMatch(reader,/setExerciseAnswer|recordScore|saveScore|markComplete/);
});
