import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {
  LOS1_C02_PRINT_PAGES,LOS1_C02_PRINT_CHAPTER,
  LOS1_C02_EXERCISES,LOS1_C02_SOURCE_QUESTIONS,
  LOS1_C02_TEXT_B_QUESTIONS,LOS1_C02_CULTURE,
  LOS1_C02_TEXT_A,LOS1_C02_TEXT_B,LOS1_C02_SOURCE_GATE,
  LOS1_C02_FORMAT,validateLos1C02Print,
} from "../src/features/los/facsimile/los1/c02Pilot.ts";
import {LOS1_C02_LINES,LOS1_C02_QUESTIONS,LOS1_C02_SOURCE_ID}
  from "../src/features/los/content/los1C02.ts";
import {LOS1_M_COM_02_LINES,LOS1_M_COM_02_QUESTIONS,LOS1_M_COM_02_ID}
  from "../src/features/los/content/los1MCom02.ts";
import {LOS_EXERCISES} from "../src/features/los/exerciseBank.ts";

test("C02 forms exactly 14 B5 draft leaves and has paired physical spreads",()=>{
  assert.deepEqual(validateLos1C02Print(),[]);
  assert.deepEqual(LOS1_C02_FORMAT,{widthMm:176,heightMm:250});
  assert.equal(LOS1_C02_PRINT_CHAPTER.id,"02");
  assert.equal(LOS1_C02_PRINT_PAGES.length,14);
  assert.deepEqual(LOS1_C02_PRINT_PAGES.map(p=>p.pdfPageIndex),
    Array.from({length:14},(_,i)=>i));
  assert.ok(LOS1_C02_PRINT_PAGES.every(p=>p.printedPageLabel===null&&
    p.status==="draft"&&p.chapterId==="02"&&p.imageIds.length===0));
  assert.deepEqual(LOS1_C02_PRINT_PAGES.slice(0,2).map(p=>p.physicalSide),
    ["left","right"]);
});
test("C02 keeps all 6 original Wikibooks Text A turns, unchanged and in source order",()=>{
  assert.deepEqual(LOS1_C02_TEXT_A,LOS1_C02_LINES);
  const page=LOS1_C02_PRINT_PAGES.find(p=>p.section==="text");
  assert.deepEqual(page?.sourceLineIds,LOS1_C02_LINES.map(x=>x.id));
  assert.deepEqual(page?.mediaIds,[LOS1_C02_SOURCE_ID]);
  assert.equal(LOS1_C02_SOURCE_GATE.sourceId,"M-WB-01");
  assert.equal(LOS1_C02_SOURCE_GATE.ready,false);
  assert.deepEqual(LOS1_C02_SOURCE_QUESTIONS,LOS1_C02_QUESTIONS);
});
test("C02 keeps the 4 original Ariser M-COM-02 lines and comprehension questions",()=>{
  assert.deepEqual(LOS1_C02_TEXT_B,LOS1_M_COM_02_LINES);
  const page=LOS1_C02_PRINT_PAGES.find(p=>p.section==="text-b");
  assert.deepEqual(page?.sourceLineIds,LOS1_M_COM_02_LINES.map(x=>x.id));
  assert.deepEqual(page?.mediaIds,[LOS1_M_COM_02_ID]);
  assert.deepEqual(LOS1_C02_TEXT_B_QUESTIONS,LOS1_M_COM_02_QUESTIONS);
});
test("C02 distributes all digital exercises and sourced questions once",()=>{
  const ids=LOS1_C02_PRINT_PAGES.flatMap(p=>p.exerciseIds);
  const sourceIds=LOS1_C02_PRINT_PAGES.flatMap(p=>p.questionIds);
  assert.deepEqual(ids,LOS_EXERCISES.filter(x=>x.chapterId==="02").map(x=>x.id));
  assert.equal(new Set(ids).size,LOS1_C02_EXERCISES.length);
  assert.equal(new Set(sourceIds).size,sourceIds.length);
  assert.deepEqual(new Set(sourceIds),new Set([
    ...LOS1_C02_SOURCE_QUESTIONS.map(q=>q.id),
    ...LOS1_C02_TEXT_B_QUESTIONS.map(q=>q.id),
    ...LOS1_C02_CULTURE.questions.map(q=>q.id)]));
});
test("C02 is a separate owner-gated LOS! route with no fabricated source/audio or scoring",()=>{
  const book=readFileSync("src/features/los/LosBook.tsx","utf8");
  const reader=readFileSync("src/features/los/facsimile/los1/Los1C02FacsimilePilot.tsx","utf8");
  assert.match(book,/facsimile-c02" && book.id===1 \? <Los1C02FacsimilePilot/);
  assert.match(reader,/getDeviceOwnerId\(\)/);
  assert.match(reader,/los\.facsimile\.c02\.draft\./);
  assert.match(reader,/LOS1_C02_TEXT_A as dialogue/);
  assert.match(reader,/LOS1_C02_TEXT_B as textB/);
  assert.match(reader,/äänitiedoston käyttöoikeus/);
  assert.match(reader,/Kieli-|kielentarkistus/);
  assert.doesNotMatch(reader,/setExerciseAnswer|recordScore|markComplete|saveScore/);
});
