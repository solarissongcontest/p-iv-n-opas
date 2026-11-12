import type { LosPronunciation } from "../src/features/los/pronunciation.ts";
import { strict as assert } from "node:assert";
import { test } from "node:test";
import {
  inspectLosVocabularyQA,isLosVocabularyPublishable,inspectLosPronunciationEvidence,
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

test("U1 R4/R5 evidence gate rejects status-only approval and non-de-DE synthetic audio",()=>{
  const base:LosPronunciation={
    id:"synthetic-fixture-only",language:"de",region:"de-DE",targetType:"lemma",
    target:"hallo",ipa:"ˈhalo",ipaSourceId:"fixture-source",
    ipaSourceUrl:"https://example.org/fixture",ipaReviewStatus:"reviewed",audioAssets:[],
  };
  let evidence=inspectLosPronunciationEvidence(base);
  assert.deepEqual(evidence,{sourced:true,reviewed:false,accepted:false});
  const reviewer={...base,ipaReviewedBy:"fixture reviewer",ipaReviewedAt:"2026-11-12T12:00:00Z"};
  evidence=inspectLosPronunciationEvidence(reviewer);
  assert.deepEqual(evidence,{sourced:true,reviewed:true,accepted:false});
  assert.equal(inspectLosPronunciationEvidence({...reviewer,ipaReviewStatus:"candidate"}).reviewed,false);
  assert.equal(inspectLosPronunciationEvidence({...reviewer,ipaReviewedAt:"invalid"}).reviewed,false);
  assert.equal(inspectLosPronunciationEvidence({...reviewer,ipaReviewedBy:" "}).reviewed,false);
  const audio={id:"test-voice",sourceId:"fixture-source",speakerType:"synthetic" as const,
    url:"https://example.org/audio.ogg",licenseId:"fixture-only",usageStatus:"ready" as const,
    reviewedAt:"2026-11-12T12:00:00Z",reviewedBy:"fixture reviewer"};
  assert.equal(inspectLosPronunciationEvidence({...reviewer,audioAssets:[{...audio,voiceLocale:"de-AT"}]}).accepted,false);
  assert.equal(inspectLosPronunciationEvidence({...reviewer,audioAssets:[{...audio,voiceLocale:"de"}]}).accepted,false);
  assert.equal(inspectLosPronunciationEvidence({...reviewer,audioAssets:[{...audio,voiceLocale:"de-DE"}]}).accepted,true);
  assert.equal(inspectLosPronunciationEvidence({...reviewer,audioAssets:[{...audio,voiceLocale:"de-DE",reviewedBy:undefined}]}).accepted,false);
  assert.equal(inspectLosPronunciationEvidence({...reviewer,audioAssets:[{...audio,voiceLocale:"de-DE",url:"http://example.org/audio.ogg"}]}).accepted,false);
  assert.equal(inspectLosPronunciationEvidence({...reviewer,audioAssets:[{...audio,speakerType:"human",voiceLocale:undefined}]}).accepted,true);
});
