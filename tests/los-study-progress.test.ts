import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOS_BOOKS } from "../src/features/los/catalog.ts";
import { LOS1_EXECUTABLE_LESSONS } from "../src/features/los/guidedLessons.ts";
import { getLosStudyProgressSnapshot } from "../src/features/los/progressSnapshot.ts";
import { LOS1_MIDTERM_QUESTIONS } from "../src/features/los/content/los1Exams.ts";
import { losExercisesFor } from "../src/features/los/exerciseBank.ts";
import { losRecallFromVocabulary,losRecallReview } from "../src/features/los/recallEngine.ts";
import type { LosChapterDraft } from "../src/features/los/studyState.ts";

const now="2026-11-12T09:30:00.000Z";
const book=LOS_BOOKS[0]!;
const draft=():LosChapterDraft=>({
  version:1,note:"",applicationDraft:"",bookmarked:false,
  practiceAnswers:{},practiceChecked:[],testAnswers:{},testSubmittedAt:null,
  selfAssessment:"",updatedAt:now
});

test("empty student view distinguishes 49 executable from 60 planned without fake skill scores",()=>{
  const data=getLosStudyProgressSnapshot(book,{},now);
  assert.equal(LOS1_EXECUTABLE_LESSONS.length,49);
  assert.equal(data.available,49);
  assert.equal(data.planned,60);
  assert.equal(data.completed,0);
  assert.equal(data.unfinished.length,11);
  assert.equal(data.chapters.length,10);
  assert.equal(data.scoredChapters,0);
  assert.equal(data.correct,0);
  assert.equal(data.total,0);
  assert.equal(data.midterm,null);
  assert.equal(data.delayedSelfRemembered,0);
  assert.equal(data.pendingScheduled,0,"Unseen words should not be overdue debt");
  assert.ok(data.newCards>0);
  assert.ok(data.unfinished.some(l=>l.id==="L042"));
  assert.ok(data.unfinished.some(l=>l.id==="L052"));
  assert.ok(data.unfinished.some(l=>l.id==="L060"));
  assert.equal(data.chapters.find(x=>x.id==="08")?.sourceReady,false);
  assert.equal(data.chapters.find(x=>x.id==="10")?.sourceReady,false);
});
test("completion, objective test results and self-rated recall remain separate metrics",()=>{
  const c01=draft();
  c01.lessonProgress={L001:{
    contentVersion:"1.0.0",startedAt:now,completedStepIds:["guide","contents","reader"],
    exitAnswer:"a",exitCheckedAt:now,completedAt:now
  }};
  const exercises=losExercisesFor("01");
  assert.ok(exercises.length>0);
  c01.testAnswers=Object.fromEntries(exercises.map(q=>[q.id,q.correct]));
  c01.testSubmittedAt=now;
  const cards=losRecallFromVocabulary("01",book.chapters[0]!.vocabulary);
  assert.ok(cards.length>0);
  const selected=cards[0]!;
  const first=losRecallReview(undefined,"remembered",now);
  const second=losRecallReview(first,"remembered","2026-11-13T09:30:00.000Z");
  c01.recallCards={[selected.id]:second};
  const data=getLosStudyProgressSnapshot(book,{"01":c01},"2026-11-17T09:30:00.000Z");
  assert.equal(data.completed,1);
  assert.equal(data.scoredChapters,1);
  assert.equal(data.correct,exercises.length);
  assert.equal(data.total,exercises.length);
  assert.equal(data.midterm,null);
  assert.equal(data.delayedSelfRemembered,1);
  assert.equal(data.pendingScheduled,1);
  assert.ok(data.newCards>0);
  const chapter=data.chapters.find(x=>x.id==="01")!;
  assert.equal(chapter.completed,1);
  assert.deepEqual(chapter.scored,{correct:exercises.length,total:exercises.length});
  assert.equal(chapter.reviewSelf,1);
});
test("25-point midterm is shown separately from actual chapter test totals",()=>{
  const exam=draft();
  exam.testAnswers=Object.fromEntries(LOS1_MIDTERM_QUESTIONS.map(q=>[q.id,q.correctId]));
  exam.testSubmittedAt=now;
  const data=getLosStudyProgressSnapshot(book,{"91":exam},now);
  assert.deepEqual(data.midterm,{correct:25,total:25});
  assert.equal(data.scoredChapters,0);
  assert.equal(data.correct,0);
  assert.equal(data.total,0);
  assert.equal(data.completed,0,"Returning a test alone does not complete the guided lesson");
});
test("dashboard routes through the book sidebar, does not add an eleventh chapter tab",()=>{
  const bookSource=readFileSync("src/features/los/LosBook.tsx","utf8");
  const index=readFileSync("src/features/los/LosReferenceTools.tsx","utf8");
  const view=readFileSync("src/features/los/LosStudyProgress.tsx","utf8");
  assert.match(index,/"progress"/);
  assert.match(bookSource,/section === "progress" && book\.id===1 \? <LosStudyProgress/);
  assert.match(bookSource,/Osaaminen ja eteneminen/);
  assert.match(view,/getLosStudyProgressSnapshot/);
  assert.match(view,/Puuttuvia 60 tunnin sisältöjä ei lasketa valmiiksi/);
  assert.match(view,/Päätekstin julkaisu- tai laadunvarmistusportteja on vielä kesken/);
  assert.match(view,/Sanakorttisuuntaa itse muistetuiksi arvioitu/);
  assert.doesNotMatch(bookSource,/id:"progress", label:/);
  assert.match(view,/useLosChapterDraft\(1,"91"\)/);
});
