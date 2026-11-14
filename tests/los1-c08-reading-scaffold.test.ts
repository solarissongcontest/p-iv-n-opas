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
