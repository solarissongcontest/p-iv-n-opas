import {strict as assert} from "node:assert";
import {test} from "node:test";
import {summarizeLosTreeEvidence} from "../src/features/los/contentTreeEvidence.ts";

test("U3: opening a chapter or empty draft never marks learning complete",()=>{
 const state=summarizeLosTreeEvidence({
  bookmarked:false,practiceAnswers:{"C01-EX-01":" ","RICH-C01-CHOICE":""},
  testAnswers:{},testSubmittedAt:null,
 });
 assert.deepEqual(state,{
  bookmarked:false,practiceAnsweredIds:[],testAnsweredIds:[],testSubmitted:false,
 });
});

test("U3: only persisted nonblank existing workbook answers are labelled saved",()=>{
 const state=summarizeLosTreeEvidence({
  bookmarked:true,
  practiceAnswers:{"C01-EX-01":"Guten Morgen!","RICH-C01-CHOICE":"A","C01-EX-02":" "},
  testAnswers:{"C01-EX-03":"Tschüss!"},
  testSubmittedAt:null,
 });
 assert.equal(state.bookmarked,true);
 assert.deepEqual(state.practiceAnsweredIds,["C01-EX-01","RICH-C01-CHOICE"]);
 assert.deepEqual(state.testAnsweredIds,["C01-EX-03"]);
 assert.equal(state.testSubmitted,false);
});

test("U3: test submission status requires the existing submitted timestamp",()=>{
 assert.equal(summarizeLosTreeEvidence({
  testAnswers:{"C01-EX-01":"Ja"},testSubmittedAt:"not-a-date",
 }).testSubmitted,false);
 assert.equal(summarizeLosTreeEvidence({
  testAnswers:{"C01-EX-01":"Ja"},testSubmittedAt:"2026-11-12T17:00:00.000Z",
 }).testSubmitted,true);
});
