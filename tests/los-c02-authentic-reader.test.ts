import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  LOS1_C02_LINES, LOS1_C02_GLOSS, LOS1_C02_QUESTIONS, LOS1_C02_SOURCE_ID,
  LOS1_C02_TEXT_VERSION, LOS1_C02_SOURCE_REVISION, losC02Tokens,
} from "../src/features/los/content/los1C02.ts";
import {
  losReaderMarkKey, parseLosReaderAnnotation, appendLosReaderRange,
  losReaderTokenColor,
} from "../src/features/los/content/readerAnnotations.ts";
import { losC01MarkKey } from "../src/features/los/content/c01Annotations.ts";
import { findLosSource, getLosChapterSourceGate, isLosSourcePublishable } from "../src/features/los/content/sourceRegistry.ts";
import { validateLosCloudDraft } from "../src/features/los/cloudContract.ts";

test("C02 contains all six original Franz-Greta utterances, unabridged and in exact order", () => {
  assert.equal(LOS1_C02_SOURCE_ID,"M-WB-01");
  assert.equal(LOS1_C02_TEXT_VERSION,"1.0.0");
  assert.equal(LOS1_C02_SOURCE_REVISION,"4430449");
  assert.deepEqual(LOS1_C02_LINES.map(line=>line.speaker), ["Franz","Greta","Franz","Greta","Franz","Greta"]);
  assert.deepEqual(LOS1_C02_LINES.map(line=>line.text), [
    "Hallo, ich bin Franz. Wie heißt du?",
    "Hallo, Franz. Ich heiße Greta. Wie geht's?",
    "Es geht mir gut. Kennst du den Lehrer?",
    "Ja, er heißt Herr Weiß.",
    "Oh, danke, Greta. Bis dann!",
    "Wiedersehen!",
  ]);
  assert.ok(LOS1_C02_LINES.every(line=>line.meaning.length>0));
  assert.ok(Object.keys(LOS1_C02_GLOSS).length>=20);
});

test("C02 source questions and token IDs are complete and stable", () => {
  assert.equal(LOS1_C02_QUESTIONS.length,4);
  assert.equal(new Set(LOS1_C02_QUESTIONS.map(q=>q.id)).size,4);
  assert.ok(LOS1_C02_QUESTIONS.every(q=>q.options.some(option=>option.id===q.correctId) && q.feedback.length>20));
  const ids=new Set<string>();
  for(const line of LOS1_C02_LINES) {
    const tokens=losC02Tokens(line);
    assert.equal(tokens.map(t=>t.display).join(""),line.text);
    assert.ok(tokens.length>0);
    for (const token of tokens) {
      assert.ok(token.word.length>0);
      assert.ok(!ids.has(token.id));
      ids.add(token.id);
    }
  }
});

test("reusable reader preserves existing C01 annotation keys, isolates C02 and checks source versions", () => {
  assert.equal(losReaderMarkKey("01","M-COM-01","u01"),losC01MarkKey("u01"));
  assert.equal(losReaderMarkKey("02","M-WB-01","u01"),"los1-c02-m-wb-01-u01");
  assert.notEqual(losReaderMarkKey("01","M-COM-01","u01"),losReaderMarkKey("02","M-WB-01","u01"));
  const empty=parseLosReaderAnnotation(undefined,LOS1_C02_TEXT_VERSION);
  const marked=appendLosReaderRange(empty,3,1,"green",10,LOS1_C02_TEXT_VERSION);
  assert.deepEqual(marked.ranges,[{startToken:1,endToken:3,color:"green"}]);
  assert.equal(losReaderTokenColor(marked,2,LOS1_C02_TEXT_VERSION),"green");
  assert.equal(losReaderTokenColor(marked,4,LOS1_C02_TEXT_VERSION),null);
  assert.equal(appendLosReaderRange(marked,0,99,"pink",10,LOS1_C02_TEXT_VERSION),marked);
  assert.equal(losReaderTokenColor(marked,2,"0.9.0"),null);
  assert.equal(parseLosReaderAnnotation("not-json",LOS1_C02_TEXT_VERSION).ranges.length,0);
});

test("C02 source rights evidence is text-only; language, devices, publication remain gated", () => {
  const source=findLosSource("M-WB-01");
  assert.ok(source);
  assert.equal(source.licenseCode,"CC BY-SA 4.0");
  assert.equal(source.licenseUrl,"https://creativecommons.org/licenses/by-sa/4.0/");
  assert.equal(source.stage,"rights-verified");
  assert.equal(source.integrated,true);
  assert.equal(source.mediaTested,false);
  assert.equal(source.languageReviewed,false);
  assert.equal(source.deviceTested,false);
  assert.equal(source.published,false);
  assert.equal(isLosSourcePublishable(source),false);
  assert.equal(getLosChapterSourceGate("02").ready,false);
});

test("C02's texts and questions are rendered in LOS! and use the existing backup model", () => {
  const reader=readFileSync("src/features/los/LosBook.tsx","utf8");
  const component=readFileSync("src/features/los/LosC02AuthenticText.tsx","utf8");
  const questionPage=readFileSync("src/features/los/LosC02Understanding.tsx","utf8");
  const generic=readFileSync("src/features/los/LosOriginalDialogue.tsx","utf8");
  assert.match(reader,/LosC02AuthenticText/);
  assert.match(reader,/LosC02Understanding/);
  assert.match(component,/LosOriginalDialogue/);
  assert.match(generic,/useLosChapterDraft\(1, chapterId\)/);
  assert.match(generic,/losReaderMarkKey/);
  assert.match(questionPage,/C02-SOURCE-EVIDENCE-01/);
  const data={version:1 as const,note:"",applicationDraft:"",bookmarked:false,
    practiceAnswers:{"C02-SOURCE-Q01":"a"},practiceChecked:["C02-SOURCE-Q01"],
    testAnswers:{},testSubmittedAt:null,selfAssessment:"",updatedAt:"",
    readerMarks:{"los1-c02-m-wb-01-u01":JSON.stringify(appendLosReaderRange(
      parseLosReaderAnnotation(undefined,LOS1_C02_TEXT_VERSION),0,0,"blue",8,LOS1_C02_TEXT_VERSION))}};
  assert.equal(validateLosCloudDraft(data),true);
});

test("refactored C01 still renders the original dialogue on the shared reader", () => {
  const component=readFileSync("src/features/los/LosC01AuthenticText.tsx","utf8");
  assert.match(component,/LosOriginalDialogue/);
  assert.match(component,/LOS1_C01_LINES/);
  assert.match(component,/CC BY-SA 3\.0/);
});
