import test from "node:test";
import assert from "node:assert/strict";
import { LOS1_C09_TEACHER } from "../src/features/los/teacher/lessonC09.ts";
import { getLosTeacherLesson } from "../src/features/los/teacher/lessonL004.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import { losExercisesFor } from "../src/features/los/exerciseBank.ts";
import { getLosOpenDialogue } from "../src/features/los/content/los1OpenDialogues.ts";
import { LOS1_TEXT_B_SOURCES } from "../src/features/los/content/los1TextBAdditional.ts";
import {
  emptyTeacherSession, moveTeacherScene, submitTeacherAnswer, setTeacherAnswerDraft,
  confirmTeacherActivity, teacherCanFinish, finishTeacherSession, parseTeacherSessions,
  independentTeacherEvidence, isCorrectCalendarEntry, teacherChapterAssessmentStatus,
  markTeacherHelp,
} from "../src/features/los/teacher/engine.ts";

const now = "2026-11-13T13:30:00.000Z";
const ids = ["L046","L047","L048","L049","L050"];

function simulate(lesson: (typeof LOS1_C09_TEACHER)[number]) {
  let s = emptyTeacherSession(lesson, now);
  for(const scene of lesson.scenes) {
    s = moveTeacherScene(s,lesson,scene.id,now);
    if(scene.question) {
      const q=scene.question;
      s=submitTeacherAnswer(s,lesson,scene.id,
        q.type==="choice" ? q.correctOption! : q.accepted![0]!,now);
    }
    if(scene.reflection) s=setTeacherAnswerDraft(s,scene.id,
      "Ich habe am Freitag um fünf Uhr Zeit. Hallo! Bis dann! Mitä osaan ja mitä kerrata.",now);
    if(scene.calendar) {
      const chosen=scene.calendar.day+"|"+scene.calendar.time;
      s=setTeacherAnswerDraft(s,scene.id,chosen,now);
      s=confirmTeacherActivity(s,lesson,scene.activityId!,now);
    }
  }
  const answers:Record<string,string>={};
  for(const id of [...lesson.requiredPracticeIds,...(lesson.requiredCheckedIds??[])])answers[id]="a";
  const assessment=lesson.chapterAssessment ? {
    testAnswers:Object.fromEntries(lesson.chapterAssessment.requiredTestIds.map(id=>[id,"a"])),
    testSubmittedAt:now,applicationDraft:"Hallo! Ich habe am Freitag um fünf Uhr Zeit.",
    selfAssessment:"Tunnistan viikonpäivät ja osaan sanoa milloin tavataan.",
  } : undefined;
  return {s,answers,assessment};
}

test("all five L046–L050 are registered, validated and use canonical C09 book IDs",()=>{
  assert.deepEqual(LOS1_C09_TEACHER.map(l=>l.id),ids);
  const exercises=new Set(losExercisesFor("09").map(item=>item.id));
  for(const lesson of LOS1_C09_TEACHER) {
    assert.deepEqual(validateTeacherLesson(lesson),[],lesson.id);
    assert.equal(getLosTeacherLesson(lesson.id),lesson);
    assert.equal(lesson.chapterId,"09");
    assert.ok(lesson.scenes.some(s=>s.kind==="summary"),lesson.id);
    assert.ok(lesson.scenes.some(s=>s.kind==="board" || s.kind==="source"),lesson.id);
    assert.ok(lesson.scenes.some(s=>s.question?.evidenceRole==="exit"),lesson.id);
    assert.ok(lesson.scenes.some(s=>s.reflection),lesson.id);
    assert.ok(lesson.scenes.every(s=>s.paragraphs.length>0),lesson.id);
    assert.ok(lesson.requiredPracticeIds.every(id=>exercises.has(id)),lesson.id);
    for(const question of lesson.scenes.flatMap(s=>s.question?[s.question]:[])) {
      assert.ok(question.reteach && question.hint && question.genericWrong,lesson.id);
      assert.ok(question.type!=="choice" ||
        question.options?.filter(o=>o.id!==question.correctOption).every(o=>o.wrongFeedback),
        "missing distractor-specific feedback "+lesson.id);
    }
  }
});

test("L046 really teaches all seven weekday forms with am, and saves original exercises",()=>{
  const lesson=LOS1_C09_TEACHER[0]!;
  const prose=lesson.scenes.flatMap(s=>[...s.paragraphs,...(s.board?.map(b=>b.german)??[])]).join(" ");
  for(const word of ["Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag","Sonntag","am Montag"])
    assert.ok(prose.includes(word),word);
  const beforeTeaching=lesson.scenes.slice(0,lesson.scenes.findIndex(scene=>scene.kind==="explanation"));
  assert.equal(beforeTeaching.filter(scene=>scene.question).length,2,"L046 requires two real prequestions");
  assert.ok(lesson.scenes.some(scene=>scene.kind==="source" && scene.textBChapterId==="09"),
    "L046 must open the canonical whole C09 Text B without inventing audio completion");
  assert.deepEqual(lesson.requiredPracticeIds,["C09-EX-01","C09-EX-02","C09-EX-03"]);
});

test("L047 renders the complete real seven-turn Sport und Zeit source; requires three checked IDs",()=>{
  const lesson=LOS1_C09_TEACHER[1]!;
  const original=getLosOpenDialogue("09")!;
  assert.equal(original.sourceId,"M-WB-03");
  assert.equal(original.originalLines.length,7);
  assert.equal(original.originalLines[1]?.text,"Es ist Viertel vor drei.");
  assert.ok(lesson.scenes.some(scene=>scene.kind==="source"&&scene.sourceChapterId==="09"));
  assert.deepEqual(lesson.requiredCheckedIds,
    ["C09-SOURCE-Q01","C09-SOURCE-Q02","C09-SOURCE-Q03"]);
  assert.ok(lesson.requiredCheckedIds.every(id=>original.questions.some(q=>q.id===id)));
  assert.ok(lesson.scenes.flatMap(s=>s.paragraphs).join(" ").includes("14.45"));
});

test("L048 has five real textbook questions, calendar, application and message",()=>{
  const l=LOS1_C09_TEACHER[2]!;
  assert.deepEqual(l.requiredPracticeIds,
    ["C09-EX-08","C09-EX-09","C09-EX-10","C09-EX-13","C09-EX-14"]);
  assert.ok(l.scenes.filter(s=>s.question).length>=4);
  assert.ok(l.scenes.some(s=>s.calendar?.day==="Montag"&&s.calendar.time==="15:00"));
  assert.ok(l.scenes.some(s=>s.reflection?.prompt.includes("viesti")));
  const prose=l.scenes.flatMap(s=>s.paragraphs).join(" ");
  assert.match(prose,/am Montag/);
  assert.match(prose,/um drei Uhr/);
});

test("L049 uses genuine complete weekday audio transcript without making up a meeting recording",()=>{
  const l=LOS1_C09_TEACHER[3]!;
  const text=LOS1_TEXT_B_SOURCES["09"];
  assert.equal(text.sourceId,"M-COM-07");
  assert.equal(text.lines.length,1);
  assert.equal(text.lines[0]?.text,
    "Tage: Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag.");
  assert.ok(!text.lines[0]?.text.includes("Uhr"));
  assert.ok(l.scenes.some(scene=>scene.kind==="source"&&scene.textBChapterId==="09"));
  assert.deepEqual(l.requiredCheckedIds,["C09-TEXTB-Q01","C09-TEXTB-Q02"]);
  assert.ok(l.requiredCheckedIds.every(id=>text.questions.some(q=>q.id===id)));
  assert.ok(l.scenes.some(s=>s.calendar?.day==="Mittwoch"&&s.calendar.time==="16:00"));
  assert.ok(l.scenes.some(s=>s.paragraphs.some(p=>p.includes("EI kuulla Text B"))));
  assert.equal(l.scenes.some(s=>s.activityId?.includes("audio")||s.activityId?.includes("listen")),false);
});

test("all five scenes have real completion gates; responses survive JSON serialization",()=>{
  for(const l of LOS1_C09_TEACHER) {
    const {s,answers,assessment}=simulate(l);
    assert.ok(teacherCanFinish(s,l,answers,l.requiredCheckedIds,assessment),l.id);
    if(l.requiredPracticeIds.length || l.requiredCheckedIds?.length)
      assert.ok(!teacherCanFinish(s,l,{},[],assessment),l.id+" missing exercise");
    else assert.ok(!teacherCanFinish(s,l,{},[],undefined),l.id+" missing chapter test");
    const serial=JSON.parse(JSON.stringify({[l.id]:s}));
    assert.deepEqual(parseTeacherSessions(serial)[l.id],s,l.id);
    const done=finishTeacherSession(s,l,answers,now,l.requiredCheckedIds,assessment);
    assert.equal(done.completedAt,now,l.id);
    assert.ok(independentTeacherEvidence(s,l)>=1,l.id);
    const source=l.requiredCheckedIds?.[0];
    if(source)assert.equal(teacherCanFinish(s,l,answers,l.requiredCheckedIds!.slice(1),assessment),false);
  }
});

test("calendar refuses a wrong or later-edited day/time even after activity acknowledgment",()=>{
  for(const l of [LOS1_C09_TEACHER[2]!,LOS1_C09_TEACHER[3]!]) {
    const {s,answers}=simulate(l);
    const scene=l.scenes.find(s=>s.calendar)!;
    assert.equal(isCorrectCalendarEntry(scene,s.draftAnswers[scene.id]!),true);
    const changed=setTeacherAnswerDraft(s,scene.id,"Sonntag|19:00",now);
    assert.equal(isCorrectCalendarEntry(scene,changed.draftAnswers[scene.id]!),false);
    assert.equal(teacherCanFinish(changed,l,answers,l.requiredCheckedIds),false);
    assert.equal(teacherCanFinish(s,l,answers,l.requiredCheckedIds),true);
  }
});

test("checking source or submitting real chapter test is not fabricated from viewing a page",()=>{
  const reading=LOS1_C09_TEACHER[1]!;
  const r=simulate(reading);
  assert.equal(teacherCanFinish(r.s,reading,r.answers,[]),false);
  const exam=LOS1_C09_TEACHER[4]!;
  const e=simulate(exam);
  assert.ok(exam.chapterAssessment);
  assert.equal(exam.chapterAssessment?.requiredTestIds.length,14);
  assert.equal(teacherCanFinish(e.s,exam,e.answers,[],{
    ...e.assessment!,testSubmittedAt:null,
  }),false);
  assert.equal(teacherCanFinish(e.s,exam,e.answers,[],{
    ...e.assessment!,testAnswers:{...e.assessment!.testAnswers,"C09-EX-14":""},
  }),false);
  assert.equal(teacherCanFinish(e.s,exam,e.answers,[],{
    ...e.assessment!,applicationDraft:"",selfAssessment:"",
  }),false);
  assert.equal(teacherChapterAssessmentStatus(exam,e.assessment).expected,14);
});

test("hints and revealed solutions never grant independent mastery",()=>{
  const l=LOS1_C09_TEACHER[2]!;
  let s=emptyTeacherSession(l,now);
  s=markTeacherHelp(s,"independent",now);
  s=submitTeacherAnswer(s,l,"independent","am Donnerstag um fünf Uhr",now);
  assert.equal(independentTeacherEvidence(s,l),0);
});
