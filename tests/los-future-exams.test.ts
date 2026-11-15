import test from "node:test";
import assert from "node:assert/strict";
import {LOS_FUTURE_EXAMS,getLosFutureExam} from "../src/features/los/content/losFutureExams.ts";
import {beginFutureExamRetake,futureExamAnchor,futureExamAutoResult,
 futureExamHistoryKey,futureExamNormalize,readFutureExamHistory}
  from "../src/features/los/losFutureExamEngine.ts";
import {emptyLosDraft} from "../src/features/los/studyState.ts";

test("all 14 35-point exam manuscripts have full unique source questions and unapproved audio",()=>{
  assert.equal(Object.keys(LOS_FUTURE_EXAMS).length,14);
  const used=new Set<string>();
  for(let id=2;id<=8;id++)for(const kind of ["midterm","final"] as const){
    const exam=getLosFutureExam(id,kind);
    assert.ok(exam,`LOS ${id} ${kind}`);
    assert.equal(exam.bookId,id);
    assert.equal(futureExamAnchor(kind),kind==="midterm"?"05":"10");
    assert.ok(exam.readingText.length>120);
    assert.equal(exam.questions.length,15);
    assert.deepEqual(["R","G","V"].map(group=>exam.questions.filter(q=>
      new RegExp("-"+group+"\\d{2}$").test(q.id)).length),[5,5,5]);
    assert.equal(exam.questions.reduce((sum,q)=>sum+q.points,0),25);
    assert.equal(exam.writing.points,10);
    assert.ok(exam.writing.prompt.length>70);
    assert.ok(exam.writing.rubric.includes("kielen-ymmärrettävyys"));
    assert.equal(exam.listeningDraft.mediaApproved,false);
    assert.equal(exam.listeningDraft.questions.length,3);
    assert.ok(exam.listeningDraft.script.length>100);
    for(const q of [...exam.questions,exam.writing]){
      assert.ok(!used.has(q.id),q.id);
      used.add(q.id);
    }
    assert.ok(exam.questions.every(q=>q.answerKey.trim()&&q.prompt.trim()));
  }
  assert.equal(used.size,224);
  assert.equal(getLosFutureExam(1,"midterm"),null);
});

test("only exact author-specified single-token German grammar gaps receive narrow automatic points",()=>{
  const exam=getLosFutureExam(8,"midterm");assert.ok(exam);
  const g02=exam.questions.find(q=>q.id.endsWith("-G02"));assert.ok(g02);
  assert.equal(g02.answerKey,"weil");
  const empty=futureExamAutoResult(exam,{});
  assert.ok(empty.possible>0);
  assert.ok(empty.possible<35);
  assert.equal(empty.awarded,0);
  assert.equal(empty.restRequiresReview+empty.possible,35);
  const correct=futureExamAutoResult(exam,{[g02.id]:"  WEIL.  "});
  assert.ok(correct.awarded>=g02.points);
  assert.ok(correct.checkedIds.includes(g02.id));
  assert.equal(futureExamNormalize("  Groß.  "),"groß");
  assert.ok(!correct.checkedIds.includes("LOS8-MID-R02"));
  assert.ok(!correct.checkedIds.includes(exam.writing.id));
});

test("retake keeps every previous answer and submission date without manufacturing grades",()=>{
  const exam=getLosFutureExam(2,"midterm");assert.ok(exam);
  const current=emptyLosDraft();
  current.testAnswers={
    "LOS2-MID-R01":"Pienessä kaupungissa",
    "LOS2-MID-W01":"Ich wohne in einer Stadt.",
  };
  current.testSubmittedAt="2026-11-14T10:00:00.000Z";
  const next=beginFutureExamRetake(current,exam);
  assert.equal(next.testSubmittedAt,null);
  assert.equal(next.testAnswers["LOS2-MID-R01"],undefined);
  const past=readFutureExamHistory(next.testAnswers[futureExamHistoryKey(exam)],exam);
  assert.ok(past);
  assert.equal(past.length,1);
  assert.equal(past[0]!.answers["LOS2-MID-W01"],"Ich wohne in einer Stadt.");
  assert.equal(past[0]!.submittedAt,current.testSubmittedAt);
  assert.deepEqual(current.testAnswers["LOS2-MID-R01"],"Pienessä kaupungissa");
  next.testAnswers["LOS2-MID-R02"]="Leipomossa.";
  next.testSubmittedAt="2026-11-14T11:00:00.000Z";
  const nextAgain=beginFutureExamRetake(next,exam);
  const all=readFutureExamHistory(nextAgain.testAnswers[futureExamHistoryKey(exam)],exam);
  assert.equal(all?.length,2);
  assert.equal(all?.[1]?.answers["LOS2-MID-R02"],"Leipomossa.");
});

test("malformed attempt archive and unsubmitted exams cannot be silently overwritten",()=>{
  const exam=getLosFutureExam(6,"final");assert.ok(exam);
  assert.throws(()=>beginFutureExamRetake(emptyLosDraft(),exam),/ei ole vielä palautettu/);
  const current=emptyLosDraft();
  current.testSubmittedAt="2026-11-14T10:00:00.000Z";
  current.testAnswers[futureExamHistoryKey(exam)]="not valid json";
  assert.equal(readFutureExamHistory(current.testAnswers[futureExamHistoryKey(exam)],exam),null);
  assert.throws(()=>beginFutureExamRetake(current,exam),/ei voi tarkistaa/);
  assert.equal(readFutureExamHistory(JSON.stringify([{submittedAt:"2026-11-14",answers:{"LOS2-MID-R01":"fraud"}}]),exam),null);
});
