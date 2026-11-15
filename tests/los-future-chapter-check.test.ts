import test from "node:test";
import assert from "node:assert/strict";
import {emptyLosDraft} from "../src/features/los/studyState.ts";
import {LOS_BOOKS} from "../src/features/los/catalog.ts";
import {losFutureExercisesFor} from "../src/features/los/content/losFutureExercises.ts";
import {LOS_FUTURE_CHAPTER_CHECK_SUFFIXES,losFutureChapterCheckPlan}
  from "../src/features/los/losFutureChapterCheckPlan.ts";
import {
  emptyLosFutureChapterCheckAttempt,readLosFutureChapterCheckAttempt,
  saveLosFutureChapterCheckAnswer,submitLosFutureChapterCheck,retakeLosFutureChapterCheck,
} from "../src/features/los/losFutureChapterCheckState.ts";

test("70 formative chapter checks link five original tasks to the correct unique book and chapter",()=>{
  assert.deepEqual([...LOS_FUTURE_CHAPTER_CHECK_SUFFIXES],["T02","T07","T09","T12","T18"]);
  let count=0;
  const ids=new Set<string>();
  for(const book of LOS_BOOKS.filter(b=>b.id>=2))for(let chapter=1;chapter<=10;chapter++){
    const chapterId=String(chapter).padStart(2,"0");
    const plan=losFutureChapterCheckPlan(book.id,chapterId);
    assert.ok(plan,book.id+" C"+chapterId);
    assert.equal(plan.id,"LOS"+book.id+"-C"+chapterId+"-CHECK");
    assert.ok(plan.readingText.length>100);
    assert.ok(plan.objective.length>10);
    assert.equal(plan.tasks.length,5);
    assert.equal(new Set(plan.tasks.map(t=>t.id)).size,5);
    const source=losFutureExercisesFor(book.id,chapterId);
    for(const [index,task] of plan.tasks.entries()){
      assert.equal(task.id,"LOS"+book.id+"-C"+chapterId+"-"+LOS_FUTURE_CHAPTER_CHECK_SUFFIXES[index]);
      assert.ok(source.some(real=>real.id===task.id&&real.prompt===task.prompt&&real.answerKey===task.answerKey));
      assert.ok(task.prompt.length>10);
      assert.ok(!ids.has(task.id));
      ids.add(task.id);
    }
    assert.equal(plan.previousKeys.length,3);
    assert.equal(new Set([plan.currentKey,...plan.previousKeys]).size,4);
    count++;
  }
  assert.equal(count,70);
  assert.equal(ids.size,350);
  assert.equal(losFutureChapterCheckPlan(1,"01"),null);
  assert.equal(losFutureChapterCheckPlan(9,"01"),null);
  assert.equal(losFutureChapterCheckPlan(2,"11"),null);
});

test("source-bound chapter check answers persist without touching the original 26 exercise responses",()=>{
  const plan=losFutureChapterCheckPlan(2,"01");assert.ok(plan);
  const source=emptyLosDraft();
  source.practiceAnswers["LOS2-C01-T07"]="lernen";
  const edited=saveLosFutureChapterCheckAnswer(source,plan,plan.tasks[0]!.id,"He opiskelevat saksaa.");
  assert.equal(edited.practiceAnswers["LOS2-C01-T07"],"lernen");
  const loaded=readLosFutureChapterCheckAttempt(edited.practiceAnswers[plan.currentKey],plan);
  assert.ok(loaded);
  assert.equal(loaded.answers["LOS2-C01-T02"],"He opiskelevat saksaa.");
  assert.equal(loaded.submittedAt,null);
  assert.notEqual(edited,source);
  assert.equal(source.practiceAnswers[plan.currentKey],undefined);
  const submitted=submitLosFutureChapterCheck(edited,plan,new Date("2026-11-14T12:00:00.000Z"));
  const opened=readLosFutureChapterCheckAttempt(submitted.practiceAnswers[plan.currentKey],plan);
  assert.equal(opened?.submittedAt,"2026-11-14T12:00:00.000Z");
  assert.throws(()=>saveLosFutureChapterCheckAnswer(submitted,plan,plan.tasks[0]!.id,"wrong"),/Palautettua/);
  assert.throws(()=>submitLosFutureChapterCheck(submitted,plan),/palautettu/);
});

test("chapter check retake archives all previous answers atomically, never overwrites source practice",()=>{
  const plan=losFutureChapterCheckPlan(8,"10");assert.ok(plan);
  let current=emptyLosDraft();
  current.practiceAnswers["LOS8-C10-T18"]="Earlier source practice work";
  for(let pass=0;pass<4;pass++){
    current=saveLosFutureChapterCheckAnswer(current,plan,plan.tasks[4]!.id,"Mein Text "+pass+".");
    current=submitLosFutureChapterCheck(current,plan,new Date("2026-11-14T"+String(12+pass).padStart(2,"0")+":00:00.000Z"));
    if(pass<3)current=retakeLosFutureChapterCheck(current,plan);
  }
  assert.equal(current.practiceAnswers["LOS8-C10-T18"],"Earlier source practice work");
  assert.throws(()=>retakeLosFutureChapterCheck(current,plan),/Drei|Kolme/);
  for(let pass=0;pass<3;pass++){
    const old=readLosFutureChapterCheckAttempt(current.practiceAnswers[plan.previousKeys[pass]!],plan,true);
    assert.equal(old?.answers[plan.tasks[4]!.id],"Mein Text "+pass+".");
    assert.ok(old?.submittedAt);
  }
  const latest=readLosFutureChapterCheckAttempt(current.practiceAnswers[plan.currentKey],plan,true);
  assert.equal(latest?.answers[plan.tasks[4]!.id],"Mein Text 3.");
});

test("malformed or cross-book chapter check data cannot be silently repaired or archived",()=>{
  const plan=losFutureChapterCheckPlan(2,"05");
  const other=losFutureChapterCheckPlan(3,"05");
  assert.ok(plan&&other);
  const current=emptyLosDraft();
  current.practiceAnswers[plan.currentKey]="not json";
  assert.equal(readLosFutureChapterCheckAttempt(current.practiceAnswers[plan.currentKey],plan),null);
  assert.throws(()=>saveLosFutureChapterCheckAnswer(current,plan,plan.tasks[0]!.id,"hello"),/ei voi lukea/);
  assert.equal(current.practiceAnswers[plan.currentKey],"not json");
  const wrong=JSON.stringify({version:1,answers:{[other.tasks[0]!.id]:"Wrong book"},submittedAt:null});
  assert.equal(readLosFutureChapterCheckAttempt(wrong,plan),null);
  const inventedGrade=JSON.stringify({...emptyLosFutureChapterCheckAttempt(),score:5});
  assert.equal(readLosFutureChapterCheckAttempt(inventedGrade,plan),null);
  const tooLarge=JSON.stringify({version:1,answers:{[plan.tasks[4]!.id]:"x".repeat(3000)},submittedAt:null});
  assert.equal(readLosFutureChapterCheckAttempt(tooLarge,plan),null);
  const submitted=saveLosFutureChapterCheckAnswer(emptyLosDraft(),plan,plan.tasks[0]!.id,"correct");
  const locked=submitLosFutureChapterCheck(submitted,plan);
  locked.practiceAnswers[plan.previousKeys[0]!]="corrupt";
  assert.throws(()=>retakeLosFutureChapterCheck(locked,plan),/vioittunut/);
});
