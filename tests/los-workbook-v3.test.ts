import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOS_EXERCISES,losExercisesFor,losIsCorrect,losScore,normalizeLosAnswer } from "../src/features/los/exerciseBank.ts";

test("LOS! C01–C06 have 86 uniquely identified assessment items",()=>{
  assert.equal(losExercisesFor("01").length,12);
  assert.equal(losExercisesFor("02").length,15);
  assert.equal(losExercisesFor("03").length,15);
  assert.equal(losExercisesFor("04").length,12);
  assert.equal(losExercisesFor("05").length,12);
  assert.equal(losExercisesFor("06").length,20);
  assert.equal(LOS_EXERCISES.length,86);
  assert.equal(new Set(LOS_EXERCISES.map(item=>item.id)).size,27);
  for(const item of LOS_EXERCISES){
    assert.equal(item.accepted.includes(item.correct),true,`missing canonical answer ${item.id}`);
    assert.ok(item.explanation.trim().length>10);
    if(item.kind==="choice"){
      assert.ok(item.options);
      assert.ok(item.options?.includes(item.correct));
      assert.equal(new Set(item.options).size,item.options?.length);
    }
  }
});
test("German orthography remains strict while terminal punctuation is flexible",()=>{
  const heet=LOS_EXERCISES.find(item=>item.id==="C02-EX-04");
  const day=LOS_EXERCISES.find(item=>item.id==="C01-EX-11");
  assert.ok(heet&&day);
  assert.equal(losIsCorrect(heet,"heißt"),true);
  assert.equal(losIsCorrect(heet,"heisst"),false);
  assert.equal(losIsCorrect(heet,"heißst"),false);
  assert.equal(losIsCorrect(day," Tag!  "),true);
  assert.equal(losIsCorrect(day,"Tag"),true);
  assert.equal(losIsCorrect(day,"Morgen"),false);
  assert.equal(normalizeLosAnswer("  Guten   Tag! "),"guten tag");
});
test("score never counts a missing or wrong answer",()=>{
  const perfect=Object.fromEntries(losExercisesFor("01").map(item=>[item.id,item.correct]));
  assert.deepEqual(losScore("01",perfect),{correct:12,total:12});
  assert.deepEqual(losScore("01",{}),{correct:0,total:12});
  assert.deepEqual(losScore("01",{...perfect,"C01-EX-01":"Tschüss!"}),{correct:11,total:12});
});
test("LOS! chapter reader shows precisely ten named sections",()=>{
  const file=readFileSync("src/features/los/LosBook.tsx","utf8");
  const m=file.match(/const sections:.*?= \[([\s\S]*?)\];/);
  assert.ok(m,"chapter section map missing");
  const ids=Array.from((m[1]??"").matchAll(/id:\s*"([^"]+)"/g)).map(hit=>hit[1]);
  assert.deepEqual(ids,["chapter","text","understand","vocabulary","grammar","text-b","practice","apply","culture","test"]);
  assert.match(file,/LosNotebook/);
  assert.match(file,/LosWorkbook/);
});
test("test solutions unlock only after explicit submit and drafts are owner-scoped",()=>{
  const wb=readFileSync("src/features/los/LosWorkbook.tsx","utf8");
  const storage=readFileSync("src/features/los/studyState.ts","utf8");
  assert.match(wb,/testSubmittedAt/);
  assert.match(wb,/filled!==exercises\.length/);
  assert.match(wb,/mode==="test"\?locked:revealPractice\.includes/);
  assert.match(storage,/los\.local\.v1/);
  assert.match(storage,/getDeviceOwnerId/);
  assert.match(wb,/Ei vielä puhelimen ja tietokoneen välistä synkronointia/);
});
