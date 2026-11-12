import { strict as assert } from "node:assert";
import { test } from "node:test";
import {
  inspectLosVocabularyQA,isLosVocabularyPublishable,
} from "../src/features/los/pronunciationPublication.ts";

test("U1 vocabulary release gate covers all 16 real C01 vocabulary rows",()=>{
  const report=inspectLosVocabularyQA(1,"01");
  assert.equal(report.total,16);
  assert.equal(report.ipaSourced,15);
  assert.equal(report.ipaHumanReviewed,0);
  assert.equal(report.audioApproved,0);
  assert.equal(report.ready,0);
  assert.equal(report.issues.length,16);
  assert.deepEqual(report.issues.filter(i=>i.missing.includes("IPA")).map(i=>i.word),["Bis später!"]);
  assert.ok(report.issues.some(i=>i.word==="Hallo!"&&i.missing.includes("audio")));
  assert.equal(isLosVocabularyPublishable(1,"01"),false);
});

test("U1 any missing chapter or unpublished book is not accidentally publishable",()=>{
  assert.equal(isLosVocabularyPublishable(8,"01"),false);
  assert.equal(isLosVocabularyPublishable(1,"99"),false);
  for(const chapter of ["02","03","04","05","06","07","08","09","10"])
    assert.equal(isLosVocabularyPublishable(1,chapter),false);
});
