import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {LOS1_C10_HARALD_READING_LESSON} from "../src/features/los/lessonEngineC10Harald.ts";
import {LOS1_C10_TEXT} from "../src/features/los/content/los1OpenDialogues.ts";
import {LOS_1_LESSONS} from "../src/features/los/learningPath.ts";
import {isLos1ExecutableLesson,los1LessonDraftChapter,LOS1_EXECUTABLE_LESSONS} from "../src/features/los/guidedLessons.ts";
import {
 emptyLosLessonProgress,losLessonMarkStep,losLessonSubmitCheck,losLessonCanComplete,
 losLessonEvidenceMet,losLessonFinish,validateLosLessonProgressMap,
} from "../src/features/los/lessonEngine.ts";
import {validateLosCloudDraft} from "../src/features/los/cloudContract.ts";
import {getLosChapterSourceGate} from "../src/features/los/content/sourceRegistry.ts";

const now="2026-11-12T11:00:00.000Z";
const draft=()=>({version:1 as const,note:"old note",applicationDraft:"",bookmarked:true,
 practiceAnswers:{} as Record<string,string>,practiceChecked:[] as string[],
 testAnswers:{} as Record<string,string>,testSubmittedAt:null as string|null,
 selfAssessment:"",updatedAt:now});

test("L052 is canonical source-based reading without claiming a listened-to audio file",()=>{
 const l=LOS1_C10_HARALD_READING_LESSON;
 assert.equal(l.id,"L052");
 assert.equal(l.title,LOS_1_LESSONS[51]?.title);
 assert.equal(l.estimatedMinutes,30);
 assert.equal(l.contentVersion,"1.0.0");
 assert.equal(l.steps.length,3);
 assert.ok(l.steps.every(s=>s.chapter==="10"&&s.minutes>0&&s.instruction.length>100));
 assert.deepEqual(l.steps.map(s=>s.section),["text","understand","understand"]);
 assert.equal(LOS1_C10_TEXT.originalLines.length,14);
 assert.equal(l.evidence.length,1);
 assert.equal(l.evidence[0]?.kind,"checked-source");
 assert.deepEqual(l.evidence[0]?.ids,[
  ...LOS1_C10_TEXT.questions.map(q=>q.id),"C10-SOURCE-EVIDENCE-01"
 ]);
 assert.ok(l.objective.includes("Kuuntelun osaamista ei"));
 assert.ok(l.steps[0]?.instruction.includes("ei todistettu kuuntelutehtävä"));
 assert.ok(l.check.explanation.includes("Kuuntelua ei arvioida"));
 assert.equal(getLosChapterSourceGate("10").ready,false);
 assert.equal(LOS1_EXECUTABLE_LESSONS.length,60);
 assert.equal(isLos1ExecutableLesson("L052"),true);
 assert.equal(los1LessonDraftChapter("L052"),"10");
 for(const id of ["L999"])
   assert.equal(isLos1ExecutableLesson(id),false);
});
test("L052 completion requires 5 actual checked responses, all steps and exit check",()=>{
 const l=LOS1_C10_HARALD_READING_LESSON;
 const d=draft();
 let progress=emptyLosLessonProgress();
 assert.equal(losLessonCanComplete(l,progress,d),false);
 for(const step of l.steps)progress=losLessonMarkStep(l,progress,step.id,now);
 progress=losLessonSubmitCheck(l,progress,l.check.correctId,now);
 assert.equal(losLessonCanComplete(l,progress,d),false);
 for(const id of l.evidence[0]?.ids??[])d.practiceAnswers[id]="a";
 assert.equal(losLessonEvidenceMet(l,d),false,"saving selections cannot fake answer checking");
 for(const id of l.evidence[0]?.ids??[])d.practiceChecked.push(id);
 assert.equal(losLessonEvidenceMet(l,d),true);
 assert.equal(losLessonCanComplete(l,progress,d),true);
 assert.equal(losLessonFinish(l,progress,d,now).completedAt,now);
 assert.equal(validateLosLessonProgressMap({L052:losLessonFinish(l,progress,d,now)}),true);
 assert.equal(validateLosCloudDraft({...d,lessonProgress:{L052:progress}}),true);
});
test("existing Text A, practice persistence and progress UI implement the real L052 path",()=>{
 const book=readFileSync("src/features/los/LosBook.tsx","utf8");
 const pages=readFileSync("src/features/los/LosOpenSourcePages.tsx","utf8");
 const runner=readFileSync("src/features/los/LosFirstLessons.tsx","utf8");
 const guided=readFileSync("src/features/los/guidedLessons.ts","utf8");
 assert.match(book,/LosOpenTextPage chapterId="10"/);
 assert.match(book,/getLosOpenDialogue\(chapter\.id\)/);
 assert.match(pages,/C"\+text\.chapterId\+"-SOURCE-EVIDENCE-01"/);
 assert.match(pages,/practiceChecked:Array\.from/);
 assert.match(runner,/useLosChapterDraft\(1, "10"\)/);
 assert.match(guided,/LOS1_C10_HARALD_READING_LESSON/);
});
