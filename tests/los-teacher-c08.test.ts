import test from "node:test";
import assert from "node:assert/strict";
import { LOS1_L041_TEACHER as L041 } from "../src/features/los/teacher/lessonL041.ts";
import { LOS1_L042_TEACHER as L042 } from "../src/features/los/teacher/lessonL042.ts";
import { LOS1_L043_TEACHER as L043 } from "../src/features/los/teacher/lessonL043.ts";
import { LOS1_L044_TEACHER as L044 } from "../src/features/los/teacher/lessonL044.ts";
import { LOS1_L045_TEACHER as L045 } from "../src/features/los/teacher/lessonL045.ts";
import { getLosTeacherLesson } from "../src/features/los/teacher/lessonL004.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import { getLosOpenDialogue } from "../src/features/los/content/los1OpenDialogues.ts";
import { LOS1_TEXT_B_SOURCES } from "../src/features/los/content/los1TextBAdditional.ts";
import { losExercisesFor, losScore } from "../src/features/los/exerciseBank.ts";
import { losArchiveChapterExam, losChapterExamHistory } from "../src/features/los/losWorkbookPersistence.ts";
import { parseLosDraft } from "../src/features/los/studyState.ts";
import { emptyTeacherSession, moveTeacherScene, submitTeacherAnswer,
 confirmTeacherActivity, markTeacherHelp, teacherWrongFeedback,
 independentTeacherEvidence, teacherCanFinish, teacherChapterAssessmentStatus,
 validTeacherSession, toggleTeacherPause } from "../src/features/los/teacher/engine.ts";

const now="2026-11-13T17:00:00.000Z";
const lessons=[L041,L042,L043,L044,L045] as const;
const bank=losExercisesFor("08");
const rightAnswers=Object.fromEntries(bank.map(item=>[item.id,item.correct]));
const written=[
 "A: Ich verstehe nicht. Bitte langsamer.",
 "B: Noch einmal, bitte. Können Sie das bitte wiederholen?",
 "C: Was bedeutet das? Wie sagt man das auf Deutsch?",
].join("\n");
const assessment={testAnswers:rightAnswers,testSubmittedAt:now,applicationDraft:written,
 selfAssessment:"Osaan pyytää hidastamaan mutta kertaa vielä Können Sie -fraasia."};
const sourceAnswers={
 "C08-SCHOOL-Q01":"a","C08-SCHOOL-Q02":"b","C08-SCHOOL-Q03":"c",
 "C08-SOURCE-EVIDENCE-01":"u15",
 "C08-TEXTB-Q01":"b","C08-TEXTB-Q03":"a",
} as const;
function prepared(lesson: typeof L041){
 let session=emptyTeacherSession(lesson,now);
 for(const scene of lesson.scenes){
  session=moveTeacherScene(session,lesson,scene.id,now);
  if(scene.question){
   const q=scene.question;
   session=submitTeacherAnswer(session,lesson,scene.id,
    q.type==="choice" ? q.correctOption! : q.accepted![0]!,now);
  }
 }
 for(const id of lesson.requiredActivityIds)session=confirmTeacherActivity(session,lesson,id,now);
 return session;
}
function evidence(lesson:typeof L041){
 const needed=lesson.requiredCheckedIds??[];
 const answers:Record<string,string>={};
 for(const id of lesson.requiredPracticeIds)answers[id]=rightAnswers[id]??"attempted";
 for(const id of needed)answers[id]=sourceAnswers[id as keyof typeof sourceAnswers]??"";
 return {answers,checked:[...needed]};
}
test("C08 has exactly 26 full M-WB-08 text units and authentic answerable content",()=>{
 const src=getLosOpenDialogue("08");
 assert.ok(src);
 assert.equal(src.sourceId,"M-WB-08");
 assert.equal(src.originalLines.length,26);
 assert.equal(src.originalLines[0]?.text,"Jetzt haben wir Mathe.");
 assert.equal(src.originalLines[6]?.text,"Guten Morgen!");
 assert.equal(src.originalLines[7]?.text,"Guten Morgen!");
 assert.equal(src.originalLines[14]?.text,"Sehr gut, Florian!");
 assert.equal(src.originalLines[16]?.text,"Schnell, wir müssen zu Musik!");
 assert.equal(src.evidenceLineId,"u15");
 assert.deepEqual(src.questions.map(item=>item.id),[
  "C08-SCHOOL-Q01","C08-SCHOOL-Q02","C08-SCHOOL-Q03","C08-SCHOOL-Q04"
 ]);
});
test("C08 Eva Text B keeps its real eight-line transcript without embedded audio or invented listening evidence",()=>{
 const text=LOS1_TEXT_B_SOURCES["08"];
 assert.equal(text.sourceId,"M-DIB-03");
 assert.equal(text.transcriptIsExact,true);
 assert.equal(text.lines.length,8);
 assert.deepEqual(text.questions.map(item=>item.id),[
  "C08-TEXTB-Q01","C08-TEXTB-Q02","C08-TEXTB-Q03","C08-TEXTB-Q04"
 ]);
 assert.match(text.summary,/EI ole tässä upotettu/);
 assert.match(text.lines[1]?.text??"",/Englisch und Erdkunde/);
 assert.match(text.lines[5]?.text??"",/bei meinen Eltern/);
});
test("all five C08 Teacher lessons have valid instructional scenes, feedback and real registrations",()=>{
 assert.equal(bank.length,12);
 for(const [index,lesson] of lessons.entries()){
  assert.deepEqual(validateTeacherLesson(lesson),[],lesson.id);
  assert.equal(lesson.id,"L"+String(41+index).padStart(3,"0"));
  assert.equal(lesson.bookId,1);
  assert.equal(lesson.chapterId,"08");
  assert.equal(getLosTeacherLesson(lesson.id),lesson);
  assert.ok(lesson.scenes.length>=12);
  assert.equal(new Set(lesson.scenes.map(scene=>scene.id)).size,lesson.scenes.length);
  assert.ok(lesson.scenes.some(scene=>scene.kind==="board"),lesson.id);
  assert.ok(lesson.scenes.some(scene=>scene.kind==="explanation"),lesson.id);
  assert.ok(lesson.scenes.some(scene=>scene.kind==="summary"),lesson.id);
  assert.ok(lesson.scenes.some(scene=>scene.help?.length),lesson.id);
  assert.ok(lesson.requiredQuestionIds.length>=5);
  assert.ok(lesson.requiredQuestionIds.every(id=>lesson.scenes.some(scene=>scene.id===id&&scene.question)));
  assert.ok(lesson.requiredActivityIds.every(id=>lesson.scenes.some(scene=>scene.activityId===id)));
  assert.ok(lesson.requiredPracticeIds.every(id=>bank.some(item=>item.id===id)));
  assert.ok(lesson.scenes.flatMap(scene=>scene.bookLinks??[]).some(link=>link.chapterId==="08"),lesson.id);
  assert.ok(lesson.scenes.every(scene=>(scene.bookLinks??[]).every(link=>link.chapterId!=="91")));
 }
});
test("L041 teaches five source-grounded survival phrases without false speech assessment",()=>{
 assert.deepEqual(L041.requiredPracticeIds,[
  "C08-EX-01","C08-EX-02","C08-EX-03","C08-EX-04","C08-EX-05"
 ]);
 const prose=L041.scenes.flatMap(scene=>scene.paragraphs).join(" ");
 for(const word of ["Ich verstehe nicht","Bitte langsamer","Was bedeutet das","wiederholen"])
  assert.ok(prose.includes(word),word);
 assert.match(prose,/ei kuuntele|ei pisteytetä/i);
 assert.match(teacherWrongFeedback(L041.scenes.find(s=>s.id==="independent")!,"noch einmal bitte"),/toist|hitaam/);
});
test("L042 checks three real SCHOOL choices and u15 original source location, not an audio score",()=>{
 const src=getLosOpenDialogue("08")!;
 assert.deepEqual(L042.requiredCheckedIds,[
  "C08-SCHOOL-Q01","C08-SCHOOL-Q02","C08-SCHOOL-Q03","C08-SOURCE-EVIDENCE-01"
 ]);
 assert.ok(L042.requiredCheckedIds.slice(0,3).every(id=>src.questions.some(q=>q.id===id)));
 assert.equal(src.evidenceLineId,"u15");
 assert.ok(L042.scenes.some(scene=>scene.id==="source"&&scene.bookLinks?.some(link=>link.section==="text")));
 assert.ok(L042.scenes.some(scene=>scene.id==="evidence"&&scene.bookLinks?.some(link=>link.section==="understand")));
 assert.match(L042.scenes.flatMap(scene=>scene.paragraphs).join(" "),/26 tekstiyksikkö/);
 const s=prepared(L042),{answers,checked}=evidence(L042);
 assert.equal(teacherCanFinish(s,L042,answers,checked),true);
 assert.equal(teacherCanFinish(s,L042,answers,checked.slice(0,3)),false);
 assert.equal(teacherCanFinish(s,L042,{...answers,"C08-SCHOOL-Q01":"not-a-choice"},checked),false);
 assert.equal(teacherCanFinish(s,L042,{...answers,"C08-SOURCE-EVIDENCE-01":"u27"},checked),false);
 // A checked, plausible but wrong source choice still counts as an honest attempted exercise.
 assert.equal(teacherCanFinish(s,L042,{...answers,"C08-SOURCE-EVIDENCE-01":"u14"},checked),true);
});
test("L043 checks two textual Eva questions and four exact original book exercise IDs",()=>{
 assert.deepEqual(L043.requiredPracticeIds,[
  "C08-EX-06","C08-EX-07","C08-EX-11","C08-EX-12"
 ]);
 assert.deepEqual(L043.requiredCheckedIds,["C08-TEXTB-Q01","C08-TEXTB-Q03"]);
 const txt=LOS1_TEXT_B_SOURCES["08"];
 assert.ok(L043.requiredCheckedIds.every(id=>txt.questions.some(q=>q.id===id)));
 assert.ok(L043.scenes.some(scene=>scene.id==="textb"&&scene.bookLinks?.some(link=>link.section==="text-b")));
 const sourceText=L043.scenes.flatMap(scene=>scene.paragraphs).join(" ");
 assert.match(sourceText,/kahdeksan repliikkiä/);
 assert.match(sourceText,/ääntä tai videota|ääntä ja videota/i);
});
test("L044 needs genuine saved three-dialogue application with 80-character minimum but no AI language grade",()=>{
 assert.deepEqual(L044.requiredPracticeIds,["C08-EX-07","C08-EX-08"]);
 assert.equal(L044.applicationDraftMinLength,80);
 assert.equal(L044.chapterAssessment,undefined);
 assert.ok(L044.scenes.some(scene=>scene.id==="writing"&&scene.bookLinks?.some(link=>link.section==="apply")));
 const ready=prepared(L044),{answers,checked}=evidence(L044);
 assert.equal(teacherCanFinish(ready,L044,answers,checked),false);
 assert.equal(teacherCanFinish(ready,L044,answers,checked,{...assessment,applicationDraft:"A: Ich verstehe nicht."}),false);
 assert.equal(teacherCanFinish(ready,L044,answers,checked,assessment),true);
 assert.equal(teacherCanFinish(ready,L044,answers,checked,{...assessment,applicationDraft:"  "}),false);
 assert.deepEqual(validateTeacherLesson({...L044,applicationDraftMinLength:-7}).map(x=>x.location),["applicationDraftMinLength"]);
});
test("L045 requires only actual 12-item chapter test submission and >=15-character reflection",()=>{
 assert.deepEqual(L045.chapterAssessment?.requiredTestIds,bank.map(item=>item.id));
 assert.equal(L045.chapterAssessment?.requireApplicationDraft,false);
 assert.equal(L045.chapterAssessment?.minSelfAssessmentLength,15);
 assert.equal(L045.applicationDraftMinLength,undefined);
 assert.deepEqual(losScore("08",rightAnswers),{correct:12,total:12});
 const justExam={...assessment,applicationDraft:""};
 assert.deepEqual(teacherChapterAssessmentStatus(L045,justExam),{
  answered:12,expected:12,submitted:true,applicationDone:true,reflectionDone:true,ready:true,
 });
 const s=prepared(L045);
 assert.equal(teacherCanFinish(s,L045,{},[],justExam),true);
 assert.equal(teacherCanFinish(s,L045,{},[],{...justExam,testSubmittedAt:null}),false);
 assert.equal(teacherCanFinish(s,L045,{},[],{...justExam,testAnswers:{...rightAnswers,[bank[0]!.id]:""}}),false);
 assert.equal(teacherCanFinish(s,L045,{},[],{...justExam,selfAssessment:""}),false);
});
test("all C08 sessions preserve pause/reload and independent evidence without inventing mastery",()=>{
 for(const lesson of lessons){
  const s=prepared(lesson),{answers,checked}=evidence(lesson);
  const draft=lesson===L044||lesson===L045?assessment:undefined;
  assert.equal(teacherCanFinish(s,lesson,answers,checked,draft),true,lesson.id);
  if(lesson.requiredPracticeIds.length)assert.equal(teacherCanFinish(s,lesson,{},checked,draft),false);
  if(checked.length)assert.equal(teacherCanFinish(s,lesson,answers,[],draft),false);
  const paused=toggleTeacherPause(s,now);
  assert.equal(moveTeacherScene(paused,lesson,lesson.scenes[0]!.id,now),paused);
  assert.equal(teacherCanFinish(paused,lesson,answers,checked,draft),false);
  assert.equal(validTeacherSession(JSON.parse(JSON.stringify(paused))),true);
  assert.ok(independentTeacherEvidence(s,lesson)>=2);
  const independent=lesson.scenes.find(scene=>scene.id==="independent")!;
  const helped=markTeacherHelp(emptyTeacherSession(lesson,now),independent.id,now);
  const q=independent.question!;
  const answered=submitTeacherAnswer(helped,lesson,independent.id,
    q.type==="choice"?q.correctOption!:q.accepted![0]!,now);
  assert.equal(independentTeacherEvidence(answered,lesson),0);
 }
});
test("C08 archived real 11/12 and 12/12 attempts preserve old answers and saved Teacher session",()=>{
 const previous={...rightAnswers,[bank[0]!.id]:"incorrect on purpose"};
 const archived=losArchiveChapterExam({},"08",bank,previous,now);
 assert.deepEqual(losChapterExamHistory(archived,"08").map(item=>item.correct),[11]);
 const stored={
  version:1,note:"",applicationDraft:written,bookmarked:false,
  practiceAnswers:archived,practiceChecked:[],
  testAnswers:rightAnswers,testSubmittedAt:now,selfAssessment:assessment.selfAssessment,
  teacherSessions:{L045:prepared(L045)},updatedAt:now,
 };
 const parsed=parseLosDraft(JSON.stringify(stored));
 assert.equal(parsed.applicationDraft,written);
 assert.deepEqual(parsed.testAnswers,rightAnswers);
 assert.equal(parsed.testSubmittedAt,now);
 assert.equal(parsed.teacherSessions?.L045?.lessonId,"L045");
 const again=losArchiveChapterExam(parsed.practiceAnswers,"08",bank,parsed.testAnswers,now);
 const history=losChapterExamHistory(again,"08");
 assert.deepEqual(history.map(item=>item.correct),[11,12]);
 assert.equal(history[0]!.answers.find(item=>item.id===bank[0]!.id)?.answer,"incorrect on purpose");
});
