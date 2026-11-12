import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOS_1_LESSONS } from "../src/features/los/learningPath.ts";
import { LOS1_EXECUTABLE_LESSONS, isLos1ExecutableLesson, los1LessonDraftChapter } from "../src/features/los/guidedLessons.ts";
import { LOS1_C07_C09_LESSONS } from "../src/features/los/lessonEngineC07C09.ts";
import {
  emptyLosLessonProgress, losLessonMarkStep, losLessonSubmitCheck,
  losLessonCanComplete, losLessonEvidenceMet, losLessonFinish,
  validateLosLessonProgressMap, parseLosLessonProgressMap,
} from "../src/features/los/lessonEngine.ts";
import { getLosOpenDialogue } from "../src/features/los/content/los1OpenDialogues.ts";
import { losExercisesFor } from "../src/features/los/exerciseBank.ts";
import { validateLosCloudDraft } from "../src/features/los/cloudContract.ts";

const now = "2026-11-12T08:00:00.000Z";
const draft = () => ({
  version: 1 as const, note: "Vanha muistiinpano pidetään",
  bookmarked: true, applicationDraft: "Am Montag um drei Uhr.",
  practiceAnswers: {} as Record<string,string>,
  practiceChecked: [] as string[],
  testAnswers: {} as Record<string,string>,
  testSubmittedAt: null as string | null,
  selfAssessment: "", updatedAt: now,
});

test("45 executable lessons are unique and preserve gaps for unfinished chapters", () => {
  assert.equal(LOS_1_LESSONS.length,60);
  assert.equal(LOS1_EXECUTABLE_LESSONS.length,45);
  assert.equal(LOS1_C07_C09_LESSONS.length,10);
  const allIds = LOS1_EXECUTABLE_LESSONS.map(lesson=>lesson.id);
  assert.equal(new Set(allIds).size,45,"No lesson may be published twice");
  const expectedC07 = ["L036","L037","L038","L039","L040"];
  const expectedC09 = ["L046","L047","L048","L049","L050"];
  assert.deepEqual(LOS1_C07_C09_LESSONS.map(x=>x.id),[...expectedC07,...expectedC09]);
  for (let number=1;number<=60;number++) {
    const id="L"+String(number).padStart(3,"0");
    const shouldExist=(number<=40) || (number>=36&&number<=40) || (number>=46&&number<=50);
    assert.equal(isLos1ExecutableLesson(id),shouldExist,id+" readiness");
  }
  for (const id of expectedC07)assert.equal(los1LessonDraftChapter(id),"07");
  for (const id of expectedC09)assert.equal(los1LessonDraftChapter(id),"09");
  assert.equal(isLos1ExecutableLesson("L999"),false);
  assert.equal(isLos1ExecutableLesson("L027"),true);
  assert.equal(isLos1ExecutableLesson("L041"),false);
});

test("chapter 7 and 9 lesson titles and source references match existing book pages", () => {
  const c07=getLosOpenDialogue("07");
  const c09=getLosOpenDialogue("09");
  assert.equal(c07?.sourceId,"M-WB-02");
  assert.equal(c07?.originalLines.length,5);
  assert.equal(c09?.sourceId,"M-WB-03");
  assert.equal(c09?.originalLines.length,7);
  const publishedSources=new Set([...(c07?.questions??[]),...(c09?.questions??[])].map(q=>q.id));
  const existingPractice=new Set([...losExercisesFor("07"),...losExercisesFor("09")].map(q=>q.id));
  for(const lesson of LOS1_C07_C09_LESSONS) {
    const index=Number(lesson.id.slice(1))-1;
    assert.equal(lesson.title,LOS_1_LESSONS[index]?.title);
    assert.equal(lesson.estimatedMinutes,30);
    assert.equal(lesson.contentVersion,"1.0.0");
    assert.equal(lesson.steps.length,3);
    assert.equal(new Set(lesson.steps.map(s=>s.id)).size,3);
    assert.ok(lesson.steps.every(step=>step.minutes>0&&step.instruction.length>=50));
    assert.equal(lesson.check.answers.length,3);
    assert.ok(lesson.check.answers.some(opt=>opt.id===lesson.check.correctId));
    const chapter=los1LessonDraftChapter(lesson.id);
    assert.ok(lesson.steps.every(step=>step.chapter===chapter),lesson.id+" step chapter");
    for(const e of lesson.evidence) {
      if(e.kind==="checked-source")assert.ok(e.ids?.every(id=>publishedSources.has(id)),lesson.id+" source questions");
      if(e.kind==="answered-practice")assert.ok(e.ids?.every(id=>existingPractice.has(id)),lesson.id+" exercise IDs");
    }
  }
  assert.equal(LOS1_C07_C09_LESSONS[4]?.evidence[0]?.kind,"chapter-test");
  assert.equal(LOS1_C07_C09_LESSONS[9]?.evidence[0]?.kind,"chapter-test");
});

test("each C07/C09 lesson requires steps, exit check and real evidence", () => {
  for(const lesson of LOS1_C07_C09_LESSONS) {
    const d=draft();
    d.practiceAnswers["C01-EX-01"]="hello";
    d.practiceChecked.push("C01-SOURCE-Q01");
    let p=emptyLosLessonProgress();
    assert.equal(losLessonCanComplete(lesson,p,d),false);
    assert.equal(losLessonFinish(lesson,p,d,now).completedAt,null);
    for(const step of lesson.steps) p=losLessonMarkStep(lesson,p,step.id,now);
    assert.equal(losLessonCanComplete(lesson,p,d),false);
    p=losLessonSubmitCheck(lesson,p,lesson.check.correctId,now);
    if(lesson.evidence.length)assert.equal(losLessonCanComplete(lesson,p,d),false);
    for(const e of lesson.evidence) {
      if(e.kind==="chapter-test")d.testSubmittedAt=now;
      else for(const id of e.ids??[]) {
        d.practiceAnswers[id]="a";
        if(e.kind==="checked-source")d.practiceChecked.push(id);
      }
    }
    assert.equal(losLessonEvidenceMet(lesson,d),true);
    assert.equal(losLessonCanComplete(lesson,p,d),true);
    const finished=losLessonFinish(lesson,p,d,now);
    assert.equal(finished.completedAt,now);
    assert.deepEqual(losLessonMarkStep(lesson,finished,lesson.steps[0]!.id,now),finished);
  }
});

test("original-source task requires checked state, not merely saved answer", () => {
  for(const lesson of [LOS1_C07_C09_LESSONS[1]!,LOS1_C07_C09_LESSONS[6]!]) {
    const d=draft();
    const e=lesson.evidence[0]!;
    assert.equal(e.kind,"checked-source");
    for(const id of e.ids??[]) d.practiceAnswers[id]="a";
    assert.equal(losLessonEvidenceMet(lesson,d),false);
    for(const id of e.ids??[])d.practiceChecked.push(id);
    assert.equal(losLessonEvidenceMet(lesson,d),true);
  }
});

test("C07/C09 progress can be round-tripped through existing v1 backup and cloud", () => {
  const state={L036:emptyLosLessonProgress(),L047:emptyLosLessonProgress()};
  assert.equal(validateLosLessonProgressMap(state),true);
  assert.deepEqual(parseLosLessonProgressMap(state),state);
  assert.equal(validateLosCloudDraft({...draft(),lessonProgress:state}),true);
});

test("UI routes executable IDs, remembers lesson and never claims audio was tested", () => {
  const reader=readFileSync("src/features/los/LosFirstLessons.tsx","utf8");
  const index=readFileSync("src/features/los/LosReferenceTools.tsx","utf8");
  const path=readFileSync("src/features/los/learningPath.ts","utf8");
  const source=readFileSync("src/features/los/lessonEngineC07C09.ts","utf8");
  assert.match(reader,/useLosChapterDraft\(1, "07"\)/);
  assert.match(reader,/useLosChapterDraft\(1, "09"\)/);
  assert.match(reader,/LOS1_EXECUTABLE_LESSONS/);
  assert.match(index,/isLos1ExecutableLesson/);
  assert.match(index,/sessionStorage\.getItem\("los1\.selectedLesson"\)/);
  assert.match(index,/sessionStorage\.setItem\("los1\.selectedLesson", id\)/);
  assert.match(path,/Tavaa ja täytä harjoituslomake/);
  assert.match(path,/Lue ja merkitse kalenteriin/);
  assert.match(source,/ei ole varmennettu/);
});
