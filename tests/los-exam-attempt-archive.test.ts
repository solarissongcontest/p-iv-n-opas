import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {LOS1_MIDTERM_QUESTIONS,losExamScore} from "../src/features/los/content/los1Exams.ts";
import {LOS1_FINAL_QUESTIONS,losFinalScore} from "../src/features/los/content/los1FinalExam.ts";
import {losArchiveExamAttempt,losArchivedExamHistory} from "../src/features/los/content/los1ExamArchive.ts";
import {validateLosCloudDraft} from "../src/features/los/cloudContract.ts";
import {emptyLosDraft,parseLosDraft} from "../src/features/los/studyState.ts";

const submittedAt="2026-11-12T15:11:00.000Z";
const choose=<T extends {id:string;correctId:"a"|"b"|"c"}>(bank:readonly T[])=>
 Object.fromEntries(bank.map(q=>[q.id,q.correctId])) as Record<string,string>;

test("the first 25-point midterm result and all 25 choices survive a retake",()=>{
 const answers=choose(LOS1_MIDTERM_QUESTIONS);
 const original=Object.freeze({"EX-MID-OTHER":"unrelated work"});
 const archived=losArchiveExamAttempt(original,"EX-MID",LOS1_MIDTERM_QUESTIONS,answers,submittedAt);
 assert.equal(original["EX-MID-OTHER"],"unrelated work");
 assert.equal(archived["EX-MID-OTHER"],"unrelated work");
 assert.equal(archived["EX-MID-ARCHIVE-01"]?.length>0,true);
 const history=losArchivedExamHistory(archived,"EX-MID");
 assert.equal(history.length,1);
 assert.equal(history[0]?.correct,25);
 assert.equal(history[0]?.total,25);
 assert.equal(history[0]?.submittedAt,submittedAt);
 assert.equal(history[0]?.choices.length,25);
 assert.equal(history[0]?.sections.length,5);
 assert.equal(history[0]?.sections.reduce((n,section)=>n+section.correct,0),25);
 assert.deepEqual(losExamScore(LOS1_MIDTERM_QUESTIONS,answers).correct,25);
});
test("archived scores are immutable snapshots: later answers and test-bank revisions do not change them",()=>{
 const answers=choose(LOS1_FINAL_QUESTIONS);
 answers["EX-FINAL-Q01"]=answers["EX-FINAL-Q01"]==="a"?"b":"a";
 const firstScore=losFinalScore(answers);
 assert.equal(firstScore.correct,49);
 const practice=losArchiveExamAttempt({},"EX-FINAL",LOS1_FINAL_QUESTIONS,answers,submittedAt);
 const first=losArchivedExamHistory(practice,"EX-FINAL")[0];
 assert.equal(first?.correct,49);
 const retake=choose(LOS1_FINAL_QUESTIONS);
 const practice2=losArchiveExamAttempt(practice,"EX-FINAL",LOS1_FINAL_QUESTIONS,retake,
  "2026-11-13T15:11:00.000Z");
 assert.deepEqual(losArchivedExamHistory(practice2,"EX-FINAL").map(x=>x.correct),[49,50]);
 assert.deepEqual(losArchivedExamHistory(practice2,"EX-FINAL").map(x=>x.number),[1,2]);
 assert.deepEqual(losArchivedExamHistory(practice,"EX-FINAL").map(x=>x.correct),[49]);
 assert.equal(answers["EX-FINAL-Q01"]===retake["EX-FINAL-Q01"],false);
 assert.equal(losArchivedExamHistory(practice2,"EX-MID").length,0);
});
test("a missing answer, a damaged prior archive and a malformed date cannot delete completed exam work",()=>{
 const answers=choose(LOS1_MIDTERM_QUESTIONS);
 delete answers["EX-MID-Q03"];
 assert.throws(()=>losArchiveExamAttempt({},"EX-MID",LOS1_MIDTERM_QUESTIONS,answers,submittedAt),/vastauksia/);
 assert.throws(()=>losArchiveExamAttempt({},"EX-MID",LOS1_MIDTERM_QUESTIONS,
  choose(LOS1_MIDTERM_QUESTIONS),"not-a-date"),/palautusajan/);
 const damaged={"EX-MID-ARCHIVE-01":"{broken","EX-MID-ARCHIVE-03":"{}"};
 assert.deepEqual(losArchivedExamHistory(damaged,"EX-MID"),[]);
 const repaired=losArchiveExamAttempt(damaged,"EX-MID",LOS1_MIDTERM_QUESTIONS,
  choose(LOS1_MIDTERM_QUESTIONS),submittedAt);
 assert.ok(repaired["EX-MID-ARCHIVE-04"],"Never overwrite a preexisting corrupted record");
 assert.equal(repaired["EX-MID-ARCHIVE-01"],"{broken");
 assert.throws(()=>losArchiveExamAttempt({},"EX-FINAL",LOS1_MIDTERM_QUESTIONS,
  choose(LOS1_MIDTERM_QUESTIONS),submittedAt),/koepankkia/);
});
test("archive is compatible with the existing 500-character per-value, 200-record and 64 KiB cloud/backup contract",()=>{
 const mid=choose(LOS1_MIDTERM_QUESTIONS);
 const fin=choose(LOS1_FINAL_QUESTIONS);
 let practice:Record<string,string>={"EX-SUMMARY-GOAL":"Haluan jatkaa sanaston kertaamista."};
 for(let i=0;i<6;i++){
  const day=String(i+11).padStart(2,"0");
  practice=losArchiveExamAttempt(practice,"EX-MID",LOS1_MIDTERM_QUESTIONS,mid,
   "2026-11-"+day+"T09:00:00.000Z");
  practice=losArchiveExamAttempt(practice,"EX-FINAL",LOS1_FINAL_QUESTIONS,fin,
   "2026-11-"+day+"T11:00:00.000Z");
 }
 assert.equal(Object.values(practice).every(s=>s.length<=500),true);
 const draft={...emptyLosDraft(),practiceAnswers:practice,updatedAt:submittedAt};
 assert.equal(validateLosCloudDraft(draft),true);
 const roundTrip=parseLosDraft(JSON.stringify(draft));
 assert.deepEqual(roundTrip.practiceAnswers,practice);
 assert.equal(losArchivedExamHistory(roundTrip.practiceAnswers,"EX-MID").length,6);
 assert.equal(losArchivedExamHistory(roundTrip.practiceAnswers,"EX-FINAL").length,6);
});
test("both exam pages preserve results before resetting and present archived section scores",()=>{
 const mid=readFileSync("src/features/los/LosMidtermExam.tsx","utf8");
 const fin=readFileSync("src/features/los/LosFinalExam.tsx","utf8");
 for(const source of [mid,fin]){
  assert.match(source,/losArchiveExamAttempt\(/);
  assert.match(source,/losArchivedExamHistory\(/);
  assert.match(source,/testAnswers:\{\},testSubmittedAt:null/);
  assert.match(source,/Aiempien/);
  assert.match(source,/archiveError/);
  assert.match(source,/!confirmRetake\|\|!saved/);
 }
 assert.match(fin,/for\(const source of LOS1_FINAL_AUDIO_SOURCES\)delete nextPractice/);
});
