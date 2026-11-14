import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {getLosOpenDialogue} from "../src/features/los/content/los1OpenDialogues.ts";

test("C08 four-stage reading support keeps the complete authentic 26-line scene",()=>{
  const text=getLosOpenDialogue("08");
  assert.ok(text);
  assert.equal(text.sourceId,"M-WB-08");
  assert.equal(text.originalLines.length,26);
  assert.deepEqual(text.originalLines.map((line,i)=>line.id===`u${String(i+1).padStart(2,"0")}`),
    Array(26).fill(true));
  assert.equal(text.originalLines[0]?.text,"Jetzt haben wir Mathe.");
  assert.equal(text.originalLines[25]?.text,"Schon wieder!");
  const guide=readFileSync("src/features/los/LosC08ReadingGuide.tsx","utf8");
  for(const range of ["u01–u05","u06–u15","u16–u22","u23–u26"])
    assert.ok(guide.includes(range),"Reading stage missing: "+range);
  assert.equal((guide.match(/turns:"u\d\d–u\d\d"/g)||[]).length,4);
  assert.match(guide,/ensin itse/);
  assert.match(guide,/vapaaehtoinen lukutuki, ei uusi pisteytettävä koe/);
  assert.match(guide,/ei ole hyväksyttyä sisäistä ääniraitaa/);
});

test("C08 reading guide is rendered on the original Text A route only",()=>{
  const source=readFileSync("src/features/los/LosOpenSourcePages.tsx","utf8");
  assert.match(source,/text.chapterId==="08" && <LosC08ReadingGuide\s*\/>/);
  assert.match(source,/<LosOriginalDialogue/);
  assert.match(source,/lines=\{text.originalLines\}/);
  assert.doesNotMatch(readFileSync("src/features/los/LosC08ReadingGuide.tsx","utf8"),
    /update\(|saveScore|localStorage|setExerciseAnswer|practiceAnswers/);
});

test("C08 authentic classroom question assesses praise, not gratitude",()=>{
  const source=getLosOpenDialogue("08");
  assert.ok(source);
  const q=source.questions.find(q=>q.id==="C08-SCHOOL-Q04");
  assert.ok(q);
  assert.equal(q.correctId,"a");
  assert.match(q.prompt,/opettaja kehuu Floriania/);
  assert.doesNotMatch(q.prompt,/kiittää/);
  assert.equal(q.answers.find(a=>a.id==="a")?.text,"Taululla laskemisesta");
  assert.equal(source.originalLines.length,26);
});

test("C09 original Text A time question distinguishes quarter to three from 14.45 assumption",()=>{
  const source=getLosOpenDialogue("09");
  assert.ok(source);
  assert.equal(source.sourceId,"M-WB-03");
  const q=source.questions.find(q=>q.id==="C09-SOURCE-Q01");
  assert.ok(q);
  assert.equal(q.correctId,"a","previously recorded answers must remain valid");
  assert.equal(q.answers.find(a=>a.id==="a")?.text,"Varttia vaille kolme");
  assert.deepEqual(q.answers.map(answer=>answer.id),["a","b","c"]);
  assert.doesNotMatch(q.prompt,/14\.45/);
  assert.match(q.explanation,/02\.45:tä tai 14\.45:tä/);
  const teacher=readFileSync("src/features/los/teacher/lessonC09.ts","utf8");
  assert.match(teacher,/Q01 kysyy, mitä Gretan ilmaus Viertel vor drei tarkoittaa/);
  assert.match(teacher,/Älä väitä pelkän ilmauksen perusteella/);
});
