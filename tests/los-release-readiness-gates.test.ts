import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {getLosReleaseReadiness,LOS1_MANUAL_RELEASE_EVIDENCE,LOS1_TEXT_B_PROVENANCE} from "../src/features/los/releaseReadiness.ts";
import {LOS1_EXECUTABLE_LESSONS} from "../src/features/los/guidedLessons.ts";
import {LOS1_CHAPTER_SOURCE_PLANS,findLosSource} from "../src/features/los/content/sourceRegistry.ts";

test("Release readiness always distinguishes executable 60 lessons from eight independent G1–G8 checks",()=>{
 const snapshot=getLosReleaseReadiness();
 assert.equal(LOS1_EXECUTABLE_LESSONS.length,60);
 assert.deepEqual(snapshot.lessons,{available:60,planned:60});
 assert.deepEqual(snapshot.gates.map(g=>g.id),["G1","G2","G3","G4","G5","G6","G7","G8"]);
 assert.equal(snapshot.textA.total,10);
 assert.equal(snapshot.textB.total,10);
 assert.equal(snapshot.registryErrors.length,0);
 assert.equal(snapshot.ready,false);
 assert.ok(snapshot.gates.some(g=>!g.passed));
});
test("All ten primary texts are present and licensed, but none has an unverified native QA approval",()=>{
 const x=getLosReleaseReadiness();
 assert.equal(LOS1_CHAPTER_SOURCE_PLANS.length,10);
 assert.equal(x.textA.rightsIntegrated,10);
 assert.deepEqual(x.textA.pendingReview,["C01","C02","C03","C04","C05","C06","C07","C08","C09","C10"]);
 assert.equal(x.gates[0]?.passed,true,"Rights-integrated Text A is not the full release");
 assert.equal(x.gates[2]?.passed,false);
 assert.ok(x.gates[2]?.detail.includes("C08"));
});
test("Real Text B source coverage is measured independently and cannot become media-device-tested merely by integration",()=>{
 const x=getLosReleaseReadiness();
 assert.equal(x.textB.integrated,9);
 assert.equal(x.textB.mediaDeviceTested,0);
 assert.deepEqual(x.textB.missing,["C08"]);
 assert.equal(x.gates[1]?.passed,false);
 assert.equal(LOS1_TEXT_B_PROVENANCE["08"],null);
 assert.equal(LOS1_TEXT_B_PROVENANCE["05"],"M-COM-08");
 for(const [ch,id]of Object.entries(LOS1_TEXT_B_PROVENANCE)){
  if(id===null)continue;
  const record=findLosSource(id);
  assert.ok(record,"C"+ch+" must reference a real registered asset");
  assert.equal(record.integrated,true);
  assert.equal(record.mediaTested,false);
  assert.equal(record.deviceTested,false);
 }
});
test("Manual signoffs remain fail-closed until real signed evidence exists",()=>{
 const x=getLosReleaseReadiness();
 for(const id of ["G4","G5","G6","G7","G8"] as const){
  assert.deepEqual(LOS1_MANUAL_RELEASE_EVIDENCE[id],{reviewed:false,evidence:null});
  assert.equal(x.gates.find(g=>g.id===id)?.passed,false);
 }
 assert.equal(x.ready,false,"60/60 cannot imply beta/book release");
});
test("Book progress page shows all eight real blockers and keeps study progress independent",()=>{
 const ui=readFileSync("src/features/los/LosStudyProgress.tsx","utf8");
 assert.match(ui,/getLosReleaseReadiness/);
 assert.match(ui,/Kirjan G1–G8-julkaisulaadun tila/);
 assert.match(ui,/readiness\.ready\?"Hyväksytty":"Ei vielä julkaisuvalmis"/);
 assert.match(ui,/readiness\.gates\.map/);
 assert.match(ui,/data\.completed/);
 assert.match(ui,/data\.available/);
});
