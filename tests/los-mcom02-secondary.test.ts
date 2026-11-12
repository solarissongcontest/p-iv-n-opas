import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  LOS1_M_COM_02_ID, LOS1_M_COM_02_LINES, LOS1_M_COM_02_GLOSS,
  LOS1_M_COM_02_QUESTIONS,
} from "../src/features/los/content/los1MCom02.ts";
import { findLosSource } from "../src/features/los/content/sourceRegistry.ts";
import { losReaderMarkKey } from "../src/features/los/content/readerAnnotations.ts";

test("Commons M-COM-02 transcript preserves all four published German turns, separately from Wikibooks C02",()=>{
  assert.equal(LOS1_M_COM_02_ID,"M-COM-02");
  assert.deepEqual(LOS1_M_COM_02_LINES.map(x=>x.text),[
    "Wie heißt du?",
    "Ich heiße Takashi. Und du?",
    "Ich bin Thomas. Das ist Peter. Wir kommen aus Berlin.",
    "Ich komme aus Kyoto. Ich bin Japaner.",
  ]);
  assert.deepEqual(LOS1_M_COM_02_LINES.map(x=>x.speaker),["Thomas","Takashi","Thomas","Takashi"]);
  assert.ok(LOS1_M_COM_02_LINES.every(x=>x.meaning.length>5));
  assert.ok(Object.keys(LOS1_M_COM_02_GLOSS).length>=15);
  assert.equal(LOS1_M_COM_02_QUESTIONS.length,4);
  assert.ok(LOS1_M_COM_02_QUESTIONS.every(x=>x.options.some(a=>a.id===x.correctId)));
  assert.notEqual(losReaderMarkKey("02","M-WB-01","u01"),losReaderMarkKey("02","M-COM-02","u01"));
});
test("M-COM-02 has separate proven media license, but no false playback certification",()=>{
  const item=findLosSource("M-COM-02");
  assert.ok(item);
  assert.equal(item.licenseCode,"CC BY-SA 3.0");
  assert.equal(item.stage,"rights-verified");
  assert.equal(item.integrated,true);
  assert.equal(item.mediaTested,false);
  assert.equal(item.deviceTested,false);
  assert.equal(item.published,false);
  const audio=readFileSync("src/features/los/LosReferenceTools.tsx","utf8");
  assert.match(audio,/Deutsch_Dialog_\._Ich_bin_Peter\.ogg/);
  assert.match(audio,/chapterId==="02"\|\|chapterId==="03"/);
  assert.match(audio,/Toiston tekninen toimivuus on vielä testattava/);
});
test("the complete source transcript and original exercises are inside both C02 and C03 Text B, not behind links",()=>{
  const page=readFileSync("src/features/los/LosC02SecondaryText.tsx","utf8");
  const switcher=readFileSync("src/features/los/LosSupplementalSections.tsx","utf8");
  assert.match(switcher,/LosC02SecondaryText/);
  assert.match(page,/LosOriginalDialogue/);
  assert.match(page,/LOS1_M_COM_02_LINES/);
  assert.match(page,/LOS1_M_COM_02_QUESTIONS/);
  assert.match(page,/useLosChapterDraft\(1,chapterId\)/);
  assert.match(page,/idFor\(chapterId,q\.id\)/);
  assert.match(page,/CC BY-SA 3\.0/);
});
