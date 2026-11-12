import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOS_1_LESSONS } from "../src/features/los/learningPath.ts";
import { LOS1_C01_LESSON_BLUEPRINTS, emptyLosLessonProgress,
  losLessonMarkStep, losLessonSubmitCheck, losLessonFinish,
  losLessonCanComplete, losLessonEvidenceMet,
  validateLosLessonProgressMap, parseLosLessonProgressMap } from "../src/features/los/lessonEngine.ts";
import { LOS1_C02_LESSON_BLUEPRINTS } from "../src/features/los/lessonEngineC02.ts";
import { LOS1_C02_QUESTIONS } from "../src/features/los/content/los1C02.ts";
import { LOS1_M_COM_02_QUESTIONS } from "../src/features/los/content/los1MCom02.ts";
import { losExercisesFor } from "../src/features/los/exerciseBank.ts";
import { validateLosCloudDraft } from "../src/features/los/cloudContract.ts";

const stamp = "2026-11-12T06:00:00.000Z";
const draft = () => ({
  version: 1 as const, note: "Säilytä tämä", applicationDraft: "Ich heiße...",
  bookmarked: true,
  practiceAnswers: {} as Record<string,string>,
  practiceChecked: [] as string[],
  testAnswers: {} as Record<string,string>,
  testSubmittedAt: null as string|null,
  selfAssessment: "", updatedAt: stamp,
});
const doneSteps = (lesson: typeof LOS1_C02_LESSON_BLUEPRINTS[number]) => {
  let state = emptyLosLessonProgress();
  for (const step of lesson.steps) state = losLessonMarkStep(lesson,state,step.id,stamp);
  return losLessonSubmitCheck(lesson,state,lesson.check.correctId,stamp);
};
test("C02 L007-L011 are the next exact five lessons in the existing 60-lesson plan", () => {
  assert.equal(LOS1_C01_LESSON_BLUEPRINTS.length,6);
  assert.equal(LOS1_C02_LESSON_BLUEPRINTS.length,5);
  assert.equal(LOS_1_LESSONS.length,60);
  for (const [index,lesson] of LOS1_C02_LESSON_BLUEPRINTS.entries()) {
    assert.equal(lesson.id, "L"+String(index+7).padStart(3,"0"));
    assert.equal(lesson.title, LOS_1_LESSONS[index+6]?.title);
    assert.equal(lesson.estimatedMinutes,30);
    assert.equal(lesson.contentVersion,"1.0.0");
    assert.ok(lesson.steps.length>=3);
    assert.ok(lesson.steps.every(step => step.chapter==="02" && step.minutes>0 && step.instruction.length>40));
    assert.equal(new Set(lesson.steps.map(step => step.id)).size,lesson.steps.length);
    assert.ok(lesson.check.answers.some(answer => answer.id===lesson.check.correctId));
  }
});
test("C02 guided practice references real authored questions, not missing content", () => {
  const sourceIds = new Set(LOS1_C02_QUESTIONS.map(question => question.id));
  const secondaryIds = new Set(LOS1_M_COM_02_QUESTIONS.map(question => question.id));
  const practiceIds = new Set(losExercisesFor("02").map(question => question.id));
  const [l7,l8,l9,l10,l11] = LOS1_C02_LESSON_BLUEPRINTS;
  assert.ok(l7 && l8 && l9 && l10 && l11);
  assert.equal(l7.evidence.length,0);
  assert.ok(l8.evidence[0]?.ids?.every(id => sourceIds.has(id)));
  assert.ok(l9.evidence[0]?.ids?.every(id => practiceIds.has(id)));
  assert.ok(l10.evidence[0]?.ids?.every(id => secondaryIds.has(id)));
  assert.equal(l11.evidence[0]?.kind,"chapter-test");
});
test("every C02 lesson requires all its steps and an actual exit check", () => {
  for(const lesson of LOS1_C02_LESSON_BLUEPRINTS){
    const data = draft();
    const blank = emptyLosLessonProgress();
    assert.equal(losLessonCanComplete(lesson,blank,data),false);
    assert.equal(losLessonFinish(lesson,blank,data,stamp).completedAt,null);
    const one = losLessonMarkStep(lesson,blank,lesson.steps[0]!.id,stamp);
    assert.equal(losLessonCanComplete(lesson,one,data),false);
    let checked = doneSteps(lesson);
    if (lesson.evidence.length > 0) {
      assert.equal(losLessonCanComplete(lesson,checked,data),false);
      for(const item of lesson.evidence) {
        if (item.kind==="chapter-test") data.testSubmittedAt=stamp;
        else for(const id of item.ids??[]) {
          data.practiceAnswers[id] = "a";
          if(item.kind==="checked-source") data.practiceChecked.push(id);
        }
      }
    }
    assert.equal(losLessonEvidenceMet(lesson,data),true);
    assert.equal(losLessonCanComplete(lesson,checked,data),true);
    checked=losLessonFinish(lesson,checked,data,stamp);
    assert.equal(checked.completedAt,stamp);
  }
});
test("C02 evidence cannot be replaced with C01 practice or unchecked source answers", () => {
  const l8=LOS1_C02_LESSON_BLUEPRINTS[1]!;
  const l9=LOS1_C02_LESSON_BLUEPRINTS[2]!;
  const l10=LOS1_C02_LESSON_BLUEPRINTS[3]!;
  const data=draft();
  data.practiceAnswers["C01-SOURCE-Q01"]="a";
  data.practiceChecked.push("C01-SOURCE-Q01");
  assert.equal(losLessonEvidenceMet(l8,data),false);
  assert.equal(losLessonEvidenceMet(l9,data),false);
  assert.equal(losLessonEvidenceMet(l10,data),false);
  for(const id of l8.evidence[0]!.ids??[]) data.practiceAnswers[id]="a";
  assert.equal(losLessonEvidenceMet(l8,data),false);
  for(const id of l8.evidence[0]!.ids??[]) data.practiceChecked.push(id);
  assert.equal(losLessonEvidenceMet(l8,data),true);
});
test("L007 and L001 can coexist in old optional lessonProgress v1 schema", () => {
  const c02 = { L007: doneSteps(LOS1_C02_LESSON_BLUEPRINTS[0]!) };
  const c01 = { L001: emptyLosLessonProgress() };
  assert.equal(validateLosLessonProgressMap(c02),true);
  assert.equal(validateLosLessonProgressMap(c01),true);
  assert.deepEqual(parseLosLessonProgressMap(c02),c02);
  assert.equal(validateLosCloudDraft({...draft(),lessonProgress:c02}),true);
});
test("guided C02 lessons use chapter-2 draft, and the book index routes to them", () => {
  const component = readFileSync("src/features/los/LosFirstLessons.tsx","utf8");
  const index = readFileSync("src/features/los/LosReferenceTools.tsx","utf8");
  assert.match(component,/useLosChapterDraft\(1, "01"\)/);
  assert.match(component,/useLosChapterDraft\(1, "02"\)/);
  assert.match(component,/lessonChapter/);
  assert.match(component,/LOS1_EXECUTABLE_LESSONS/);
  assert.match(index,/isLos1ExecutableLesson/);
  assert.match(index,/LOS1_EXECUTABLE_LESSONS\.length/);
  assert.match(index,/sessionStorage\.getItem\("los1\.selectedLesson"\)/);
  assert.match(index,/sessionStorage\.setItem\("los1\.selectedLesson", id\)/);
});
