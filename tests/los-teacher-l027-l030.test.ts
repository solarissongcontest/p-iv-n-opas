import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {LOS1_L027_TEACHER} from "../src/features/los/teacher/lessonL027.ts";
import {LOS1_L028_TEACHER} from "../src/features/los/teacher/lessonL028.ts";
import {LOS1_L029_TEACHER} from "../src/features/los/teacher/lessonL029.ts";
import {LOS1_L030_TEACHER} from "../src/features/los/teacher/lessonL030.ts";
import {getLosTeacherLesson} from "../src/features/los/teacher/lessonL004.ts";
import {validateTeacherLesson} from "../src/features/los/teacher/validateContent.ts";
import {LOS1_MIDTERM_QUESTIONS,losExamScore,losExamReadyToSubmit} from "../src/features/los/content/los1Exams.ts";
import {losArchiveExamAttempt,losArchivedExamHistory,losArchiveMidtermPersonalWork,losArchivedMidtermPersonalWork} from "../src/features/los/content/los1ExamArchive.ts";
import {validateLosCloudDraft} from "../src/features/los/cloudContract.ts";
import {emptyTeacherSession,moveTeacherScene,setTeacherAnswerDraft,markTeacherHelp,submitTeacherAnswer,teacherCanFinish,finishTeacherSession,independentTeacherEvidence,teacherMidtermAssessmentStatus,parseTeacherSessions} from "../src/features/los/teacher/engine.ts";

const now="2026-11-13T15:00:00.000Z";
const reviews=[LOS1_L027_TEACHER,LOS1_L028_TEACHER,LOS1_L029_TEACHER] as const;
const objective=Object.fromEntries(LOS1_MIDTERM_QUESTIONS.map(q=>[q.id,q.correctId])) as Record<string,string>;

test("four new Teacher manuscripts reuse existing Teacher Player and EX-MID route",()=>{
 for(const lesson of [...reviews,LOS1_L030_TEACHER]){
   assert.deepEqual(validateTeacherLesson(lesson),[]);
   assert.equal(getLosTeacherLesson(lesson.id),lesson);
   assert.equal(lesson.chapterId,"91");
   assert.equal(lesson.estimatedMinutes,30);
   assert.equal(lesson.requiredPracticeIds.length,0);
   assert.ok(lesson.scenes.some(scene=>scene.kind==="summary"));
 }
 for(const id of ["L013","L014","L015","L016"]){
   assert.ok(getLosTeacherLesson(id),"Previously approved upstream C03 Teacher "+id+" must remain registered");
 }
 assert.match(readFileSync("src/features/los/teacher/LosTeacherPlayer.tsx","utf8"),/helpSelection/);
 assert.deepEqual(reviews.map(l=>l.id),["L027","L028","L029"]);
 assert.equal(LOS1_L030_TEACHER.examAssessment?.id,"EX-MID");
 assert.equal(LOS1_L030_TEACHER.scenes.filter(s=>s.question).length,0);
 const links=LOS1_L030_TEACHER.scenes.flatMap(scene=>scene.bookLinks??[]);
 assert.ok(links.some(link=>link.section==="midterm"));
 assert.equal(LOS1_L030_TEACHER.chapterId,"91");
 const player=readFileSync("src/features/los/teacher/LosTeacherPlayer.tsx","utf8");
 assert.match(player,/section === "midterm" \|\| section === "review"/);
 assert.match(player,/teacherMidtermAssessmentStatus/);
});

test("review lessons have five varied retrieval/transfer questions, no full-score gate",()=>{
 for(const lesson of reviews){
   const questions=lesson.scenes.filter(s=>s.question);
   assert.equal(questions.length,5,lesson.id);
   assert.deepEqual(questions.map(s=>s.id),lesson.requiredQuestionIds);
   assert.ok(questions.filter(s=>s.question!.type==="text").length>=3,lesson.id);
   assert.ok(questions.some(s=>s.question!.evidenceRole==="application"),lesson.id);
   assert.ok(questions.some(s=>s.question!.evidenceRole==="exit"),lesson.id);
   assert.ok(lesson.scenes.some(s=>s.reflection),lesson.id);
   let session=emptyTeacherSession(lesson,now);
   for(const scene of lesson.scenes){
     session=moveTeacherScene(session,lesson,scene.id,now);
     if(scene.question){
       const q=scene.question;
       session=submitTeacherAnswer(session,lesson,scene.id,q.type==="choice"
         ? q.options!.find(x=>x.id!==q.correctOption)!.id
         : "unbekannt",now);
     }
     if(scene.reflection) session=setTeacherAnswerDraft(session,scene.id,"Kertaan tämän vielä.",now);
   }
   assert.equal(independentTeacherEvidence(session,lesson),0);
   assert.equal(teacherCanFinish(session,lesson,{}),true,lesson.id+" must allow mistakes");
   session=finishTeacherSession(session,lesson,{},now);
   assert.equal(session.completedAt,now);
   const restored=parseTeacherSessions({[lesson.id]:JSON.parse(JSON.stringify(session))});
   assert.equal(restored[lesson.id]?.completedAt,now);
 }
});

test("helped first attempt cannot create independent mastery, even if later correct",()=>{
 const lesson=LOS1_L028_TEACHER;
 const question=lesson.scenes.find(scene=>scene.id==="formal")!.question!;
 let session=emptyTeacherSession(lesson,now);
 session=markTeacherHelp(session,"formal",now);
 session=submitTeacherAnswer(session,lesson,"formal",question.accepted![0]!,now);
 assert.equal(session.attempts[0]?.correct,true);
 assert.equal(session.attempts[0]?.independent,false);
 assert.equal(independentTeacherEvidence(session,lesson),0);
});

test("L029 has an authentic C01 source and explicitly no manufactured listening scores",()=>{
 const source=LOS1_L029_TEACHER.scenes.find(s=>s.id==="source")!;
 assert.ok(source.bookLinks?.some(l=>l.chapterId==="01"&&l.section==="text"));
 const prose=LOS1_L029_TEACHER.scenes.flatMap(s=>s.paragraphs).join(" ");
 for(const expected of ["M-COM-01","Wikimedia Commons","CC BY-SA 3.0","Franz","Jörg"])
   assert.ok(prose.includes(expected),expected);
 assert.match(prose,/ei merkitä kuuntelupisteitä|ei synny kuuntelupisteitä/);
 assert.equal(LOS1_L029_TEACHER.requiredActivityIds.length,0);
});

test("L030 completion needs real 25 answers, submission and own dialogue self-review",()=>{
 const lesson=LOS1_L030_TEACHER;
 let session=emptyTeacherSession(lesson,now);
 for(const scene of lesson.scenes)session=moveTeacherScene(session,lesson,scene.id,now);
 const input={testAnswers:objective,testSubmittedAt:null,applicationDraft:"",selfAssessment:"Harjoittelin keskustelua."};
 const own={"EX-MID-DIALOGUE-SELF":"some"};
 assert.equal(teacherCanFinish(session,lesson,own,[],input),false);
 assert.equal(teacherMidtermAssessmentStatus(lesson,input,own).answered,25);
 const submitted={...input,testSubmittedAt:now};
 assert.equal(teacherCanFinish(session,lesson,{},[],submitted),false);
 assert.equal(teacherCanFinish(session,lesson,own,[],{...submitted,selfAssessment:""}),false);
 assert.equal(teacherCanFinish(session,lesson,own,[],submitted),true);
 const partial={...objective};delete partial["EX-MID-Q25"];
 assert.equal(teacherCanFinish(session,lesson,own,[],{...submitted,testAnswers:partial}),false);
 assert.equal(losExamReadyToSubmit(LOS1_MIDTERM_QUESTIONS,objective),true);
 assert.equal(losExamScore(LOS1_MIDTERM_QUESTIONS,objective).correct,25);
 assert.equal(finishTeacherSession(session,lesson,own,now,[],submitted).completedAt,now);
});

test("retake archives 25 selections, section scores, full own text and self-assessment",()=>{
 const application="A: Guten Tag! B: Guten Tag! A: Wie heißen Sie? B: Ich heiße Klara.\n".repeat(60).slice(0,4980);
 const reflection="Osasin tervehtimisen mutta haluan harjoitella puhuttelua.\n".repeat(80).slice(0,4950);
 const first=losArchiveExamAttempt({"EX-REV1-SELF-027":"some"},"EX-MID",LOS1_MIDTERM_QUESTIONS,objective,now);
 const withPersonal=losArchiveMidtermPersonalWork(first,1,application,reflection,"some");
 const prior=losArchivedMidtermPersonalWork(withPersonal,1);
 assert.deepEqual(prior,{applicationDraft:application,selfAssessment:reflection,dialogueRating:"some"});
 assert.equal(losArchivedExamHistory(withPersonal,"EX-MID")[0]?.correct,25);
 assert.equal(Object.values(withPersonal).every(s=>s.length<=500),true);
 const draft={version:1 as const,note:"",bookmarked:false,
   practiceAnswers:withPersonal,practiceChecked:[],testAnswers:{},
   testSubmittedAt:null,applicationDraft:application,selfAssessment:reflection,updatedAt:now};
 assert.equal(validateLosCloudDraft(draft),true);
 const restored=JSON.parse(JSON.stringify(draft)) as typeof draft;
 assert.deepEqual(losArchivedMidtermPersonalWork(restored.practiceAnswers,1),prior);
 const second=losArchiveExamAttempt(restored.practiceAnswers,"EX-MID",LOS1_MIDTERM_QUESTIONS,
   {...objective,"EX-MID-Q01":"c"},"2026-11-14T15:00:00.000Z");
 const next=losArchiveMidtermPersonalWork(second,2,"Uusi keskustelu.","Uusi itsearvio.","well");
 assert.deepEqual(losArchivedExamHistory(next,"EX-MID").map(a=>a.correct),[25,24]);
 assert.deepEqual(losArchivedMidtermPersonalWork(next,1),prior);
 assert.deepEqual(losArchivedMidtermPersonalWork(next,2),{applicationDraft:"Uusi keskustelu.",selfAssessment:"Uusi itsearvio.",dialogueRating:"well"});
 assert.throws(()=>losArchiveMidtermPersonalWork(next,1,"overwrite","bad"),/ylikirjoittaa/);
});

test("archive refuses to lose personal work when storage is exhausted",()=>{
 const objectiveArchive=losArchiveExamAttempt({},"EX-MID",LOS1_MIDTERM_QUESTIONS,objective,now);
 const full={...objectiveArchive,...Object.fromEntries(Array.from({length:199},(_,i)=>["keep-"+i,"unchanged"]))};
 assert.throws(()=>losArchiveMidtermPersonalWork(full,1,"My dialogue","My assessment"),/riittävästi tilaa/);
 assert.equal(full["keep-0"],"unchanged");
});
