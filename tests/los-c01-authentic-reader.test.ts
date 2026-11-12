import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  LOS1_C01_LINES, LOS1_C01_QUESTIONS, LOS1_C01_GLOSS,
  LOS1_C01_SOURCE_ID, LOS1_C01_TEXT_VERSION, losC01Tokens,
} from "../src/features/los/content/los1C01.ts";
import {
  LOS_READER_COLORS, losC01MarkKey, appendLosC01Range,
  losC01TokenColor, parseLosC01Mark,
} from "../src/features/los/content/c01Annotations.ts";
import { draftIsEmpty, validateLosCloudDraft } from "../src/features/los/cloudContract.ts";
import { LOS1_SOURCE_REGISTRY, getLosChapterSourceGate } from "../src/features/los/content/sourceRegistry.ts";

test("C01 embeds complete authentic 8-turn human-source transcript in order", () => {
  assert.equal(LOS1_C01_LINES.length,8);
  assert.deepEqual(LOS1_C01_LINES.map(line=>line.speaker), [
    "Franz","Jörg","Franz","Jörg","Franz","Jörg","Franz","Jörg",
  ]);
  assert.equal(LOS1_C01_LINES[0]?.text,"Hallo, wie heißt du?");
  assert.equal(LOS1_C01_LINES[4]?.text,"Ich bin neunzehn Jahre alt, und du?");
  assert.equal(LOS1_C01_LINES[7]?.text,"Tschüss!");
  assert.equal(LOS1_C01_SOURCE_ID,"M-COM-01");
  assert.equal(LOS1_C01_TEXT_VERSION,"1.0.0");
  assert.ok(LOS1_C01_LINES.every(line=>line.meaning.length>0));
  assert.ok(Object.keys(LOS1_C01_GLOSS).length>=18);
});
test("original transcript tokens are lossless, unique, and stable for annotations", () => {
  const ids=new Set<string>();
  for (const line of LOS1_C01_LINES) {
    const tokens=losC01Tokens(line);
    assert.equal(tokens.map(token=>token.display).join(""),line.text);
    for (const token of tokens) {
      assert.ok(!ids.has(token.id));
      ids.add(token.id);
      assert.ok(token.word.length>0);
    }
  }
});
test("C01 comprehension asks four scored source questions without duplicating IDs", () => {
  assert.equal(LOS1_C01_QUESTIONS.length,4);
  assert.equal(new Set(LOS1_C01_QUESTIONS.map(q=>q.id)).size,4);
  for(const q of LOS1_C01_QUESTIONS) {
    assert.ok(q.prompt.length>10);
    assert.ok(q.options.some(option=>option.id===q.correctId));
    assert.ok(q.feedback.length>20);
  }
});
test("highlighting uses bounded token ranges, document versions and four color choices", () => {
  assert.deepEqual(LOS_READER_COLORS,["yellow","pink","green","blue"]);
  const source=LOS1_C01_LINES[1];
  assert.ok(source);
  const length=losC01Tokens(source).length;
  const initial=parseLosC01Mark(undefined);
  const annotated=appendLosC01Range(initial,3,1,"yellow",length);
  assert.deepEqual(annotated.ranges[0],{startToken:1,endToken:3,color:"yellow"});
  assert.equal(losC01TokenColor(annotated,2),"yellow");
  assert.equal(losC01TokenColor(annotated,0),null);
  assert.equal(appendLosC01Range(annotated,-1,0,"pink",length),annotated);
  assert.equal(appendLosC01Range(annotated,0,999,"pink",length),annotated);
  assert.equal(appendLosC01Range({...annotated,contentVersion:"0.9.0"},0,1,"blue",length).ranges.length,1);
  assert.equal(parseLosC01Mark('not-json').ranges.length,0);
  assert.equal(losC01TokenColor({...annotated,contentVersion:"0.9.0"},2),null);
  assert.equal(losC01MarkKey("u07"),"los1-c01-m-com-01-u07");
});
test("backups and guarded cloud payloads accept optional versioned marks, without losing v1 data", () => {
  const base={
    version:1 as const,note:"",applicationDraft:"",bookmarked:false,
    practiceAnswers:{},practiceChecked:[],testAnswers:{},testSubmittedAt:null,
    selfAssessment:"",updatedAt:"",
  };
  assert.ok(validateLosCloudDraft(base));
  assert.ok(draftIsEmpty(base));
  const mark=JSON.stringify(appendLosC01Range(parseLosC01Mark(undefined),0,0,"green",3));
  const withMarks={...base,readerMarks:{[losC01MarkKey("u01")]:mark}};
  assert.ok(validateLosCloudDraft(withMarks));
  assert.ok(!draftIsEmpty(withMarks));
  assert.equal(validateLosCloudDraft({...base,readerMarks:{"bad":99}}),false);
  assert.equal(validateLosCloudDraft({...base,readerMarks:{"bad":"x".repeat(501)}}),false);
  assert.equal(validateLosCloudDraft({...base,readerMarks:Object.fromEntries(Array.from({length:201},(_,i)=>["k"+i,"x"]))}),false);
});
test("C01 remains an editorial preview until human QA and playback are proven", () => {
  const source=LOS1_SOURCE_REGISTRY.find(item=>item.id==="M-COM-01");
  assert.ok(source);
  assert.equal(source.integrated,true);
  assert.equal(source.languageReviewed,false);
  assert.equal(source.deviceTested,false);
  assert.equal(source.published,false);
  assert.equal(getLosChapterSourceGate("01").ready,false);
  const reader=readFileSync("src/features/los/LosBook.tsx","utf8");
  const extra=readFileSync("src/features/los/LosSupplementalSections.tsx","utf8");
  assert.ok(reader.includes("LosC01AuthenticText"));
  assert.ok(extra.includes("LosC01Understanding"));
});
