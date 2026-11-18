import {test} from "node:test";
import assert from "node:assert/strict";
import {decideLosCloudSync,losSyncNeedsConflictReview} from "../src/features/los/losCloudDecision.ts";
import {emptyLosDraft} from "../src/features/los/studyState.ts";
import type {LosChapterDraft} from "../src/features/los/studyState.ts";
import type {LosCloudRecord} from "../src/features/los/cloudContract.ts";
const fingerprint=(draft:LosChapterDraft)=>JSON.stringify({...draft,updatedAt:""});
function edited(note:string):LosChapterDraft{
 return {...emptyLosDraft(),note,practiceAnswers:{"LOS1-READ-V2-C01-A-01":"Saksan kurssia"},
  readerMarks:{"los1-reader-test":"test"},savedWords:{"hallo":"hei"}};
}
const remote=(revision:number,payload:LosChapterDraft):LosCloudRecord=>
 ({revision,payload,updated_at:"2026-11-18T18:00:00.000Z"});
test("first device creates cloud data; second device imports without losing exercises",()=>{
 const first=edited("Laite 1");
 const initial=decideLosCloudSync({local:first,remote:null,lastSynced:null,fingerprint});
 assert.deepEqual(initial,{kind:"create",expectedRevision:0});
 const stored=remote(1,first);
 const second=decideLosCloudSync({local:emptyLosDraft(),remote:stored,lastSynced:null,fingerprint});
 assert.deepEqual(second,{kind:"download"});
 assert.deepEqual(stored.payload.practiceAnswers,first.practiceAnswers);
 assert.deepEqual(stored.payload.readerMarks,first.readerMarks);
 assert.deepEqual(stored.payload.savedWords,first.savedWords);
});
test("cloud and local with equal contents remain unchanged",()=>{
 const local=edited("sama");
 assert.deepEqual(decideLosCloudSync({local,remote:remote(4,local),lastSynced:null,fingerprint}),{kind:"no-change"});
});
test("local-only changes upload with server's expected revision",()=>{
 const previous=edited("vanha");
 const local=edited("uusi");
 const cloud=remote(3,previous);
 assert.deepEqual(decideLosCloudSync({local,remote:cloud,lastSynced:{revision:3,fingerprint:fingerprint(previous)},fingerprint}),{kind:"upload",expectedRevision:3});
});
test("if only remote changes, import remote rather than overwriting it",()=>{
 const local=edited("vanha");
 const cloud=remote(7,edited("pilvessä uusi"));
 assert.deepEqual(decideLosCloudSync({local,remote:cloud,lastSynced:{revision:3,fingerprint:fingerprint(local)},fingerprint}),{kind:"download"});
});
test("conflicting edits from two devices are not silently resolved",()=>{
 const base=edited("alkuperäinen");
 const cloud=remote(8,edited("puhelimen lisäys"));
 const second=edited("tietokoneen lisäys");
 const decision=decideLosCloudSync({local:second,remote:cloud,lastSynced:{revision:7,fingerprint:fingerprint(base)},fingerprint});
 assert.deepEqual(decision,{kind:"conflict"});
 assert.equal(second.note,"tietokoneen lisäys");
 assert.equal(cloud.payload.note,"puhelimen lisäys");
});
test("409/412 concurrency responses require explicit conflict resolution",()=>{
 assert.equal(losSyncNeedsConflictReview(409),true);
 assert.equal(losSyncNeedsConflictReview(412),true);
 assert.equal(losSyncNeedsConflictReview(200),false);
});
