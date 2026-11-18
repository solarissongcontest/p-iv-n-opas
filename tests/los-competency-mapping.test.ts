import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {LOS1_COMPETENCIES,validateLos1Competencies} from "../src/features/los/los1Competencies.ts";

test("all fifteen original SAB31 competency IDs have real teaching and assessment references",()=>{
 assert.deepEqual(validateLos1Competencies(),[]);
 assert.equal(LOS1_COMPETENCIES.length,15);
 assert.ok(LOS1_COMPETENCIES.some(g=>g.id==="L1-PHON-01"));
 assert.ok(LOS1_COMPETENCIES.some(g=>g.id==="L1-MED-01"));
 assert.ok(LOS1_COMPETENCIES.some(g=>g.id==="L1-PROD-01"));
 assert.ok(LOS1_COMPETENCIES.every(g=>g.introducedIn.length>0));
});
test("unverified audio and free production are not certified by graded click answers",()=>{
 for(const id of ["L1-PHON-01","L1-MED-01","L1-PROD-01"]){
  const goal=LOS1_COMPETENCIES.find(g=>g.id===id);
  assert.ok(goal);
  assert.notEqual(goal.mode,"objective");
  assert.equal(goal.assessedIn.length,0);
 }
});
test("progress dashboard links to the real textbook and reports the distinction from mastery",()=>{
 const page=readFileSync("src/features/los/LosStudyProgress.tsx","utf8");
 assert.match(page,/LOS1_COMPETENCIES/);
 assert.match(page,/move\(goal\.chapter,"chapter"\)/);
 assert.match(page,/move\(goal\.chapter,"practice"\)/);
 assert.match(page,/oppitunnin suorittaminen ei yksin todista kielitaitoa/);
});
