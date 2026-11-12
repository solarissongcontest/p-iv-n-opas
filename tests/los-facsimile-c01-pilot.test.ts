import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {
 LOS1_C01_FACSIMILE_PAGES,LOS1_C01_FACSIMILE_DIALOGUE,
 LOS1_C01_FACSIMILE_TEXT_B,LOS1_C01_FACSIMILE_EXERCISES,
 LOS1_C01_FACSIMILE_CULTURE,LOS1_C01_FACSIMILE_QUESTIONS,
 LOS1_FACSIMILE_FORMAT,LOS1_FACSIMILE_PILOT_ID,
 validateLosC01Facsimile,losC01FacsimilePageIndex,
} from "../src/features/los/facsimile/los1/c01Pilot.ts";
import {LOS1_C01_LINES} from "../src/features/los/content/los1C01.ts";
import {LOS1_TEXT_B_SOURCES} from "../src/features/los/content/los1TextBAdditional.ts";
import {LOS_EXERCISES} from "../src/features/los/exerciseBank.ts";
import {LOS1_CULTURE} from "../src/features/los/content/los1Culture.ts";

test("real 15-leaf B5 C01 pilot is never reported as an approved or paginated PDF",()=>{
 assert.deepEqual(validateLosC01Facsimile(),[]);
 assert.deepEqual(LOS1_FACSIMILE_FORMAT,{widthMm:176,heightMm:250});
 assert.equal(LOS1_FACSIMILE_PILOT_ID,"los1-c01-b5-draft-1");
 assert.equal(LOS1_C01_FACSIMILE_PAGES.length,15);
 assert.equal(LOS1_C01_FACSIMILE_PAGES[0]?.kind,"front-cover");
 assert.equal(LOS1_C01_FACSIMILE_PAGES[1]?.kind,"inside-cover");
 assert.deepEqual(LOS1_C01_FACSIMILE_PAGES.slice(2,4).map(p=>p.physicalSide),["left","right"]);
 assert.deepEqual(LOS1_C01_FACSIMILE_PAGES.map(p=>p.pdfPageIndex),
  Array.from({length:15},(_,i)=>i));
 assert.ok(LOS1_C01_FACSIMILE_PAGES.every(p=>p.printedPageLabel===null&&p.status==="draft"));
 assert.equal(losC01FacsimilePageIndex("c01-text-a"),4);
 assert.equal(losC01FacsimilePageIndex("does-not-exist"),-1);
});
test("C01 Text A is the full original 8 lines from the same digital reader",()=>{
 assert.deepEqual(LOS1_C01_FACSIMILE_DIALOGUE,LOS1_C01_LINES);
 const printed=LOS1_C01_FACSIMILE_PAGES.find(p=>p.pageId==="c01-text-a");
 assert.deepEqual(printed?.sourceLineIds,LOS1_C01_LINES.map(x=>x.id));
 assert.deepEqual(printed?.mediaIds,["M-COM-01"]);
 assert.equal(LOS1_C01_FACSIMILE_DIALOGUE.length,8);
});
test("C01 Text B contains all 20 authentic original greeting items over exactly two leaves",()=>{
 assert.deepEqual(LOS1_C01_FACSIMILE_TEXT_B,LOS1_TEXT_B_SOURCES["01"]);
 const sheets=LOS1_C01_FACSIMILE_PAGES.filter(p=>p.section==="text-b");
 assert.equal(sheets.length,2);
 assert.deepEqual(sheets.flatMap(p=>p.sourceLineIds),LOS1_TEXT_B_SOURCES["01"].lines.map(x=>x.id));
 assert.deepEqual(sheets.map(p=>p.mediaIds),[["M-COM-03"],["M-COM-03"]]);
});
test("paper questions retain stable digital exercise ids and include all C01 source and culture tasks",()=>{
 const ids=LOS1_C01_FACSIMILE_PAGES.flatMap(p=>p.exerciseIds);
 const expected=[
  ...LOS1_C01_FACSIMILE_QUESTIONS.map(q=>q.id),
  ...LOS1_C01_FACSIMILE_CULTURE.questions.map(q=>q.id),
  ...LOS1_C01_FACSIMILE_EXERCISES.map(q=>q.id),
 ];
 assert.deepEqual(new Set(ids),new Set(expected));
 assert.deepEqual(LOS1_C01_FACSIMILE_CULTURE,LOS1_CULTURE["01"]);
 assert.deepEqual(LOS1_C01_FACSIMILE_EXERCISES,LOS_EXERCISES.filter(x=>x.chapterId==="01"));
});
test("reader is routed inside owner-gated LOS!, does not create a new score system, keeps original cover",()=>{
 const book=readFileSync("src/features/los/LosBook.tsx","utf8");
 const reader=readFileSync("src/features/los/facsimile/los1/Los1FacsimilePilot.tsx","utf8");
 const style=readFileSync("src/features/los/facsimile/los1/facsimile.css","utf8");
 assert.match(book,/facsimile" && book.id===1 \? <Los1FacsimilePilot/);
 assert.match(book,/Selaa näköiskirjaa · C01-pilotti/);
 assert.match(reader,/getDeviceOwnerId\(\)/);
 assert.match(reader,/los\.facsimile\.c01\.draft\./);
 assert.match(reader,/onOpenDigital\(pages\[index\]\?\.section/);
 assert.match(reader,/\{pages\.map\(p=><FacsimileLeaf/);
 assert.doesNotMatch(reader,/testAnswers|lessonProgress|exercise_attempt|practiceAnswers/);
 assert.match(reader,/los-1-cover\.jpeg/);
 assert.match(style,/@page\{size:176mm 250mm;margin:0\}/);
 assert.match(reader,/C01-pilotti · B5-luonnos, ei valmis painos/);
});
