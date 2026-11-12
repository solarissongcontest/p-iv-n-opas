import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {LOS_1_LESSONS} from "../src/features/los/learningPath.ts";
import {LOS1_EXECUTABLE_LESSONS,isLos1ExecutableLesson,los1LessonDraftChapter} from "../src/features/los/guidedLessons.ts";
import {
 LOS1_FINAL_QUESTIONS,LOS1_FINAL_AUDIO_SOURCES,LOS1_FINAL_DRAFT_CHAPTER,
 LOS1_FINAL_SECTION_TITLES,LOS1_FINAL_WRITING_CHECK,LOS1_FINAL_VOICE_CHECK,
 LOS1_SUMMARY_CARDS,LOS1_SUMMARY_GOAL,LOS1_SUMMARY_REFLECTION,
 losFinalReadyToSubmit,losFinalScore,validateLosFinalBank,
} from "../src/features/los/content/los1FinalExam.ts";
import {LOS1_FINAL_LESSONS} from "../src/features/los/lessonEngineFinal.ts";
import {
 emptyLosLessonProgress,losLessonCanComplete,losLessonEvidenceMet,
 losLessonFinish,losLessonMarkStep,losLessonSubmitCheck,validateLosLessonProgressMap,
} from "../src/features/los/lessonEngine.ts";
import {validateLosCloudDraft,validLosChapter} from "../src/features/los/cloudContract.ts";
const now="2026-11-12T13:00:00.000Z";
const draft=()=>({version:1 as const,note:"old",bookmarked:true,applicationDraft:"",
 practiceAnswers:{} as Record<string,string>,practiceChecked:[] as string[],
 testAnswers:{} as Record<string,string>,testSubmittedAt:null as string|null,selfAssessment:"",updatedAt:now});

test("EX-FINAL contains 50 unique original non-midterm questions in exact 12/10/10/10/8 order",()=>{
 assert.deepEqual(validateLosFinalBank(),[]);
 assert.equal(LOS1_FINAL_QUESTIONS.length,50);
 assert.equal(new Set(LOS1_FINAL_QUESTIONS.map(q=>q.id)).size,50);
 assert.deepEqual(Object.keys(LOS1_FINAL_SECTION_TITLES),["listening","reading","vocabulary","grammar","situations"]);
 assert.deepEqual(Object.keys(LOS1_FINAL_SECTION_TITLES).map(section=>
  LOS1_FINAL_QUESTIONS.filter(q=>q.section===section).length),[12,10,10,10,8]);
 assert.ok(LOS1_FINAL_QUESTIONS.every((q,i)=>q.id==="EX-FINAL-Q"+String(i+1).padStart(2,"0")));
 assert.equal(LOS1_FINAL_AUDIO_SOURCES.length,2);
 assert.deepEqual(LOS1_FINAL_QUESTIONS.slice(0,12).map(q=>q.sourceId),
  Array(6).fill("M-COM-01").concat(Array(6).fill("M-COM-02")));
 assert.deepEqual(new Set(LOS1_FINAL_QUESTIONS.slice(12,22).map(q=>q.sourceId)),
  new Set(["M-ZPE-01","M-WB-08","M-DIB-02"]));
 assert.ok(LOS1_FINAL_QUESTIONS.slice(22).every(q=>!q.sourceId));
});
test("EX-FINAL score only reports the objective 50 points, ready requires all 50",()=>{
 const empty={};
 assert.equal(losFinalReadyToSubmit(empty),false);
 assert.deepEqual(losFinalScore(empty).perSection.map(x=>x.correct),[0,0,0,0,0]);
 const all=Object.fromEntries(LOS1_FINAL_QUESTIONS.map(q=>[q.id,q.correctId]));
 assert.equal(losFinalReadyToSubmit(all),true);
 assert.deepEqual(losFinalScore(all),{correct:50,total:50,perSection:[
  {section:"listening",title:LOS1_FINAL_SECTION_TITLES.listening,correct:12,total:12},
  {section:"reading",title:LOS1_FINAL_SECTION_TITLES.reading,correct:10,total:10},
  {section:"vocabulary",title:LOS1_FINAL_SECTION_TITLES.vocabulary,correct:10,total:10},
  {section:"grammar",title:LOS1_FINAL_SECTION_TITLES.grammar,correct:10,total:10},
  {section:"situations",title:LOS1_FINAL_SECTION_TITLES.situations,correct:8,total:8},
 ]});
 assert.equal(losFinalReadyToSubmit({...all,["EX-FINAL-Q01"]:""}),false);
});
test("L059 and L060 complete the canonical 60 with distinct reserved final slot",()=>{
 assert.deepEqual(LOS1_FINAL_LESSONS.map(l=>l.id),["L059","L060"]);
 assert.equal(LOS_1_LESSONS.length,60);
 assert.equal(LOS1_EXECUTABLE_LESSONS.length,60);
 assert.equal(new Set(LOS1_EXECUTABLE_LESSONS.map(l=>l.id)).size,60);
 assert.ok(Array.from({length:60},(_,i)=>isLos1ExecutableLesson("L"+String(i+1).padStart(3,"0"))).every(Boolean));
 assert.equal(LOS1_FINAL_DRAFT_CHAPTER,"93");
 assert.equal(validLosChapter(1,"93"),true);
 for(const l of LOS1_FINAL_LESSONS){
  assert.equal(l.title,LOS_1_LESSONS[Number(l.id.slice(1))-1]?.title);
  assert.equal(los1LessonDraftChapter(l.id),"93");
  assert.equal(l.steps.length,3);
  assert.ok(l.steps.every(s=>s.chapter===null&&["final","summary"].includes(s.section)));
  assert.ok(l.check.answers.some(c=>c.id===l.check.correctId));
 }
});
test("L059 requires actual submitted 50-item exam, full writing, speaker-download and self ratings",()=>{
 const l=LOS1_FINAL_LESSONS[0]!;
 const d=draft();
 let progress=emptyLosLessonProgress();
 for(const step of l.steps)progress=losLessonMarkStep(l,progress,step.id,now);
 progress=losLessonSubmitCheck(l,progress,l.check.correctId,now);
 assert.equal(losLessonCanComplete(l,progress,d),false);
 d.testSubmittedAt=now;
 d.applicationDraft="Hallo! Ich heiße Lena. Ich komme aus Finnland. Ich bin siebzehn Jahre alt. Bis morgen!";
 d.selfAssessment="Tänään harjoittelin nimet ja tervehdykset.";
 assert.equal(losLessonCanComplete(l,progress,d),false,"written and voice confirmation must still be checked");
 d.practiceAnswers[LOS1_FINAL_WRITING_CHECK]="written-and-reviewed";
 assert.equal(losLessonCanComplete(l,progress,d),false,"voice download is mandatory");
 d.practiceAnswers[LOS1_FINAL_VOICE_CHECK]="audio-download-started";
 assert.equal(losLessonCanComplete(l,progress,d),false,"self-rated speaking must be recorded");
 d.practiceAnswers["EX-FINAL-DIALOGUE-SELF"]="some";
 assert.equal(losLessonEvidenceMet(l,d),true);
 assert.equal(losLessonCanComplete(l,progress,d),true);
 assert.equal(losLessonFinish(l,progress,d,now).completedAt,now);
 assert.equal(validateLosCloudDraft({...d,lessonProgress:{L059:progress}}),true);
});
test("L060 requires all goals, five real-card confirmation, self reflection and a next goal",()=>{
 const l=LOS1_FINAL_LESSONS[1]!;
 const d=draft();
 let progress=emptyLosLessonProgress();
 for(const step of l.steps)progress=losLessonMarkStep(l,progress,step.id,now);
 progress=losLessonSubmitCheck(l,progress,l.check.correctId,now);
 assert.equal(losLessonCanComplete(l,progress,d),false);
 for(let i=1;i<=10;i++)d.practiceAnswers["EX-SUMMARY-C"+String(i).padStart(2,"0")]="reviewed";
 assert.equal(losLessonCanComplete(l,progress,d),false);
 d.practiceAnswers[LOS1_SUMMARY_CARDS]="reviewed-5";
 d.practiceAnswers[LOS1_SUMMARY_GOAL]="Kertaan kohteliaita puhetilanteita joka päivä.";
 d.practiceAnswers["EX-SUMMARY-GOAL-OK"]="confirmed";
 assert.equal(losLessonCanComplete(l,progress,d),false);
 d.practiceAnswers[LOS1_SUMMARY_REFLECTION]="some";
 assert.equal(losLessonCanComplete(l,progress,d),true);
 assert.equal(validateLosLessonProgressMap({L060:losLessonFinish(l,progress,d,now)}),true);
});
test("final and summary navigation, authentic audio-gated submission and privacy-preserving recording are wired",()=>{
 const final=readFileSync("src/features/los/LosFinalExam.tsx","utf8");
 const book=readFileSync("src/features/los/LosBook.tsx","utf8");
 const voice=readFileSync("src/features/los/LosVoicePractice.tsx","utf8");
 const backup=readFileSync("src/features/los/localBackups.ts","utf8");
 const runner=readFileSync("src/features/los/LosFirstLessons.tsx","utf8");
 const progress=readFileSync("src/features/los/LosStudyProgress.tsx","utf8");
 assert.match(final,/onEnded=\{\(\)=>recordPlayed\(src.id\)\}/);
 assert.match(final,/losFinalReadyToSubmit\(answers\)&&allPlayed&&saved/);
 assert.match(final,/LOS1_FINAL_AUDIO_SOURCES\.every/);
 assert.match(final,/writingLineCount\(draft.applicationDraft\)/);
 assert.match(final,/LosVoicePractice chapterId="93" onDownloaded/);
 assert.match(voice,/onDownloaded\?\.\(\)/);
 assert.match(voice,/link\.click\(\)/);
 assert.match(book,/LosFinalExam move=\{move\}/);
 assert.match(book,/LosFinalSummary move=\{move\}/);
 assert.match(backup,/\[\.\.\.chapters,"91","92","93"\]/);
 assert.match(runner,/useLosChapterDraft\(1, "93"\)/);
 assert.match(progress,/useLosChapterDraft\(1,"93"\)/);
});
