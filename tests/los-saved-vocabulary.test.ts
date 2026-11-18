import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {validLosSavedWords,parseLosSavedWords,losSaveWord,losSavedWordCards,LOS_SAVED_WORD_LIMIT} from "../src/features/los/los1SavedVocabulary.ts";
import {LOS1_AB_EXTRA_GLOSSES} from "../src/features/los/los1ExtraGlosses.ts";
import {los1TokenMeaning,los1CourseGlossary} from "../src/features/los/los1CourseGlossary.ts";

import {draftIsEmpty,validateLosCloudDraft} from "../src/features/los/cloudContract.ts";
import {losRecallFromVocabulary} from "../src/features/los/recallEngine.ts";

test("Narrative words have contextual Finnish glosses without pretending to be a general dictionary",()=>{
  assert.ok(Object.keys(LOS1_AB_EXTRA_GLOSSES).length>=90);
  assert.equal(los1TokenMeaning("01","Willkommen!"),"tervetuloa");
  assert.match(los1TokenMeaning("05","geht’s")??"",/kuuluu/);
  assert.match(los1CourseGlossary("10")["schöner"]??"",/kauniimpi/);
  assert.equal(los1TokenMeaning("01","keksittysana"),null);
});
test("Saved vocabulary is bounded, normalized and safe to import",()=>{
  assert.equal(validLosSavedWords({}),true);
  const saved=losSaveWord({},"  WILLKOMMEN  ","tervetuloa");
  assert.deepEqual(saved,{"willkommen":"tervetuloa"});
  assert.deepEqual(parseLosSavedWords({...saved,invalid:""}),saved);
  assert.equal(validLosSavedWords({"bad$":"merkitys"}),false);
  assert.throws(()=>losSaveWord({},"bad$","merkitys"));
  const max=Object.fromEntries(Array.from({length:LOS_SAVED_WORD_LIMIT},(_,i)=>["test"+i,"testi"]));
  assert.equal(validLosSavedWords(max),true);
  assert.throws(()=>losSaveWord(max,"anderes","toinen"));
});
test("A saved reading word becomes two real repeatable recall directions",()=>{
  const saved=losSaveWord({},"Willkommen","tervetuloa");
  const cards=losSavedWordCards("01",saved);
  assert.equal(cards.length,2);
  assert.deepEqual(cards.map(x=>x.direction),["de-fi","fi-de"]);
  assert.ok(cards.every(x=>x.chapterId==="01"&&x.german==="willkommen"));
  const standard=losRecallFromVocabulary("01",["Willkommen – tervetuloa"]);
  assert.deepEqual(cards.map(x=>x.id),standard.map(x=>x.id));
});
test("Old draft schema remains valid, saved vocabulary is optional and cloud-bound",()=>{
  const draft={
    version:1 as const,note:"",applicationDraft:"",bookmarked:false,
    practiceAnswers:{},practiceChecked:[],testAnswers:{},testSubmittedAt:null,
    selfAssessment:"",updatedAt:"",
  };
  assert.equal(validateLosCloudDraft(draft),true);
  assert.equal(draftIsEmpty(draft),true);
  const withWords={...draft,savedWords:{"willkommen":"tervetuloa"}};
  assert.equal(validateLosCloudDraft(withWords),true);
  assert.equal(draftIsEmpty(withWords),false);
  assert.equal(validateLosCloudDraft({...withWords,savedWords:{"bad$":"x"}}),false);
  const src=readFileSync("src/features/los/studyState.ts","utf8");
  assert.match(src,/savedWords:parseLosSavedWords/);
  const backup=readFileSync("src/features/los/localBackups.ts","utf8");
  assert.match(backup,/validateLosCloudDraft/);
});
test("Reader and review UI actually share saved words with the existing chapter draft",()=>{
  const reader=readFileSync("src/features/los/LosOriginalDialogue.tsx","utf8");
  const review=readFileSync("src/features/los/LosRecallCards.tsx","utf8");
  const snapshot=readFileSync("src/features/los/progressSnapshot.ts","utf8");
  assert.match(reader,/losSaveWord/);
  assert.match(reader,/Lisää omaan sanastoon/);
  assert.match(review,/losSavedWordCards/);
  assert.match(snapshot,/losSavedWordCards/);
});
