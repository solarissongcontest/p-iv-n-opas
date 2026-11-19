import test from "node:test";
import assert from "node:assert/strict";
import {LOS_L004_V2,validateL004Script} from "../src/features/los/teacher/content/l004.ts";
import {emptyTeacherSession,submitTeacherAnswer,teacherNext,teacherPrevious,
  checkTeacherAnswer,markTeacherHelp,parseTeacherSessions,teacherEvidenceSummary,
  teacherPhase,finishTeacherSession,normalizeGermanAnswer} from "../src/features/los/teacher/core.ts";
import {readFileSync} from "node:fs";

const iso="2026-11-19T18:45:00.000Z";
const script=LOS_L004_V2;

test("L004 is a complete authored 11-scene Teacher 2.0 pilot, not a legacy steps list",()=>{
  assert.deepEqual(validateL004Script(script),[]);
  assert.equal(script.length,11);
  assert.equal(script[0]!.id,"welcome");
  assert.equal(script[3]!.id,"board");
  assert.equal(script[10]!.id,"summary");
  assert.ok(script.some(scene=>scene.board&&scene.board.steps.length>=4));
  assert.ok(script.filter(scene=>scene.task).length>=4);
  assert.ok(script.some(scene=>scene.book?.hash==="#/1/01/vocabulary"));
  assert.ok(script.every(scene=>Boolean(scene.simple||scene.explanation||scene.board||scene.task)));
});
test("wrong time-of-day choice gives targeted, repeatable feedback",()=>{
  const scene=script.find(item=>item.id==="activate")!;
  const wrong=submitTeacherAnswer(emptyTeacherSession(),scene,"a",iso);
  assert.equal(wrong.attempts["activate"]!.correct,false);
  assert.equal(wrong.attempts["activate"]!.error,"TIME_OF_DAY");
  assert.equal(teacherPhase(scene,wrong.attempts["activate"]),"feedback");
  const again=submitTeacherAnswer(wrong,scene,"c",iso);
  assert.equal(again.attempts["activate"]!.error,"GOODBYE_VS_GREETING");
  assert.equal(again.attempts["activate"]!.count,2);
  assert.equal(teacherPhase(scene,again.attempts["activate"]),"remediating");
  const corrected=submitTeacherAnswer(again,scene,"b",iso);
  assert.equal(corrected.attempts["activate"]!.correct,true);
  assert.equal(corrected.attempts["activate"]!.count,3);
  assert.equal(teacherEvidenceSummary(corrected).independent,0);
});
test("help-assisted answer remains distinct from independent learning evidence",()=>{
 const scene=script.find(item=>item.id==="guided")!;
 const helped=markTeacherHelp(emptyTeacherSession(),scene.id,iso);
 const success=submitTeacherAnswer(helped,scene,"a",iso);
 assert.equal(success.attempts[scene.id]!.correct,true);
 assert.equal(success.attempts[scene.id]!.helped,true);
 assert.equal(teacherEvidenceSummary(success).independent,0);
 const independent=submitTeacherAnswer(emptyTeacherSession(),scene,"a",iso);
 assert.equal(teacherEvidenceSummary(independent).independent,1);
});
test("German writing check tolerates case and punctuation but preserves umlauts",()=>{
 const scene=script.find(item=>item.id==="independent")!;
 assert.equal(checkTeacherAnswer(scene.task!,"Guten Morgen!"),true);
 assert.equal(checkTeacherAnswer(scene.task!,"  guten   morgen  "),true);
 assert.equal(checkTeacherAnswer(scene.task!,"Guten Abend"),false);
 assert.equal(normalizeGermanAnswer("  GRÜßE!  "),"grüße");
});
test("navigating or visiting summary does not declare mastery or completion",()=>{
 const state=emptyTeacherSession();
 let current=state;
 for(let index=0;index<10;index++)current=teacherNext(current,11,iso);
 assert.equal(current.scene,10);
 assert.equal(current.completedAt,null);
 assert.equal(teacherEvidenceSummary(current).attempted,0);
 assert.equal(teacherPrevious(current,iso).scene,9);
 assert.ok(finishTeacherSession(current,iso).completedAt);
});
test("Teacher 2.0 sessions round-trip separately from legacy lesson answers",()=>{
 const legacy={note:"vanha muistiinpano",practiceAnswers:{"C01-EX-01":"b"},lessonProgress:{
   L004:{contentVersion:"1.0.0",completedStepIds:["review"]}
 }};
 const saved=submitTeacherAnswer(emptyTeacherSession(),script[1]!,"b",iso);
 const document={...legacy,teacherV2Sessions:{L004:saved}};
 const restored=JSON.parse(JSON.stringify(document)) as typeof document;
 assert.equal(restored.note,legacy.note);
 assert.equal(restored.practiceAnswers["C01-EX-01"],"b");
 assert.deepEqual(restored.lessonProgress.L004.completedStepIds,["review"]);
 assert.equal(parseTeacherSessions(restored.teacherV2Sessions)["L004"]?.attempts["activate"]?.correct,true);
 assert.deepEqual(parseTeacherSessions({L004:{...saved,scene:999}}),{});
 assert.deepEqual(parseTeacherSessions({L004:{...saved,script:"wrong"}}),{});
 const storage=readFileSync("src/features/los/studyState.ts","utf8");
 assert.ok(storage.includes("teacherV2Sessions:parseTeacherSessions(input.teacherV2Sessions)"));
 assert.ok(storage.includes("lessonProgress:parseLosLessonProgressMap(input.lessonProgress)"));
});
