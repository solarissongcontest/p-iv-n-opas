import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOS_1_LESSONS } from "../src/features/los/learningPath.ts";
import { LOS1_C03_LESSON_BLUEPRINTS } from "../src/features/los/lessonEngineC03.ts";
import { LOS1_C02_LESSON_BLUEPRINTS } from "../src/features/los/lessonEngineC02.ts";
import { LOS1_C01_LESSON_BLUEPRINTS, emptyLosLessonProgress,
  losLessonMarkStep, losLessonSubmitCheck, losLessonCanComplete,
  losLessonEvidenceMet, losLessonFinish, validateLosLessonProgressMap } from "../src/features/los/lessonEngine.ts";
import { getLosOpenDialogue } from "../src/features/los/content/los1OpenDialogues.ts";
import { LOS1_M_COM_02_QUESTIONS } from "../src/features/los/content/los1MCom02.ts";
import { losExercisesFor } from "../src/features/los/exerciseBank.ts";
import { validateLosCloudDraft } from "../src/features/los/cloudContract.ts";

const now = "2026-11-12T07:00:00.000Z";
const draft = () => ({
  version:1 as const,note:"vanha muistiinpano",applicationDraft:"Ich komme aus Finnland.",
  bookmarked:true,practiceAnswers:{} as Record<string,string>,practiceChecked:[] as string[],
  testAnswers:{} as Record<string,string>,testSubmittedAt:null as string|null,
  selfAssessment:"",updatedAt:now,
});
test("L012-L016 follow original 60-lesson ordering and reuse three chapter drafts",()=>{
  assert.equal(LOS1_C01_LESSON_BLUEPRINTS.length,6);
  assert.equal(LOS1_C02_LESSON_BLUEPRINTS.length,5);
  assert.equal(LOS1_C03_LESSON_BLUEPRINTS.length,5);
  assert.equal(LOS_1_LESSONS.length,60);
  LOS1_C03_LESSON_BLUEPRINTS.forEach((lesson,index)=>{
    assert.equal(lesson.id,"L"+String(index+12).padStart(3,"0"));
    assert.equal(lesson.title,LOS_1_LESSONS[index+11]?.title);
    assert.equal(lesson.estimatedMinutes,30);
    assert.equal(lesson.contentVersion,"1.0.0");
    assert.ok(lesson.steps.length>=3);
    assert.ok(lesson.steps.every(step=>step.chapter==="03"&&step.instruction.length>50&&step.minutes>0));
    assert.ok(lesson.check.answers.some(x=>x.id===lesson.check.correctId));
  });
});
test("C03 guided source questions and grammar IDs exist in the real book",()=>{
  const original = getLosOpenDialogue("03");
  assert.ok(original);
  assert.equal(original.sourceId,"M-WB-07");
  assert.equal(original.originalLines.length,8);
  const availableSource = new Set(original.questions.map(q=>q.id));
  const practice = new Set(losExercisesFor("03").map(q=>q.id));
  const secondary = new Set(LOS1_M_COM_02_QUESTIONS.map(q=>q.id.replace(/^C02/,"C03")));
  assert.ok(LOS1_C03_LESSON_BLUEPRINTS[1]!.evidence[0]?.ids?.every(id=>availableSource.has(id)));
  assert.ok(LOS1_C03_LESSON_BLUEPRINTS[2]!.evidence[0]?.ids?.every(id=>practice.has(id)));
  assert.ok(LOS1_C03_LESSON_BLUEPRINTS[3]!.evidence[0]?.ids?.every(id=>secondary.has(id)));
  assert.equal(LOS1_C03_LESSON_BLUEPRINTS[4]!.evidence[0]?.kind,"chapter-test");
});
test("completing C03 lessons cannot be faked by opening content or checking C02",()=>{
  for(const lesson of LOS1_C03_LESSON_BLUEPRINTS){
    const d=draft();
    d.practiceAnswers["C02-SOURCE-Q01"]="a";
    d.practiceChecked.push("C02-SOURCE-Q01");
    const empty=emptyLosLessonProgress();
    assert.equal(losLessonCanComplete(lesson,empty,d),false);
    let p=empty;
    for(const step of lesson.steps)p=losLessonMarkStep(lesson,p,step.id,now);
    assert.equal(losLessonCanComplete(lesson,p,d),false);
    p=losLessonSubmitCheck(lesson,p,lesson.check.correctId,now);
    if(lesson.evidence.length){
      assert.equal(losLessonCanComplete(lesson,p,d),false);
      for(const e of lesson.evidence){
        if(e.kind==="chapter-test") d.testSubmittedAt=now;
        else for(const id of e.ids??[]){
          d.practiceAnswers[id]="a";
          if(e.kind==="checked-source") d.practiceChecked.push(id);
        }
      }
    }
    assert.equal(losLessonEvidenceMet(lesson,d),true);
    assert.equal(losLessonCanComplete(lesson,p,d),true);
    assert.equal(losLessonFinish(lesson,p,d,now).completedAt,now);
  }
});
test("new lesson progress remains optional in the v1 local and cloud backup schema",()=>{
  const progress={L012:emptyLosLessonProgress()};
  assert.equal(validateLosLessonProgressMap(progress),true);
  assert.equal(validateLosCloudDraft({...draft(),lessonProgress:progress}),true);
});
test("C03 audio fallback is truthful and the runner uses C03's own draft",()=>{
  const lesson=LOS1_C03_LESSON_BLUEPRINTS[3]!;
  assert.ok(lesson.steps.some(step=>step.instruction.includes("laitetestaamaton")));
  assert.ok(lesson.steps.some(step=>step.instruction.includes("Nicos Weg")&&step.instruction.includes("ei ole")));
  const runner=readFileSync("src/features/los/LosFirstLessons.tsx","utf8");
  const path=readFileSync("src/features/los/LosReferenceTools.tsx","utf8");
  assert.match(runner,/useLosChapterDraft\(1, "03"\)/);
  assert.match(runner,/LOS1_C03_LESSON_BLUEPRINTS/);
  assert.match(path,/lesson\.number <= 16/);
  assert.match(path,/L017–L060/);
});
