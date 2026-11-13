import test from "node:test";
import assert from "node:assert/strict";
import {LOS1_C08_TEACHER_LESSONS} from "../src/features/los/teacher/lessonC08.ts";
import {LOS1_C09_TEACHER} from "../src/features/los/teacher/lessonC09.ts";
import {LOS1_C10_TEACHER_LESSONS} from "../src/features/los/teacher/lessonC10.ts";
import {getLosTeacherLesson} from "../src/features/los/teacher/lessonL004.ts";
import {validateTeacherLesson} from "../src/features/los/teacher/validateContent.ts";
import {emptyTeacherSession,teacherCanFinish,teacherChapterAssessmentStatus} from "../src/features/los/teacher/engine.ts";
import {composeLosC10Dialogues,storeLosC10Dialogues} from "../src/features/los/teacher/c10ApplicationBridge.ts";
import {emptyLosDraft} from "../src/features/los/studyState.ts";
import {losExercisesFor} from "../src/features/los/exerciseBank.ts";

const chapters=[LOS1_C08_TEACHER_LESSONS,LOS1_C09_TEACHER,LOS1_C10_TEACHER_LESSONS] as const;
test("C08–C10 are present in one real Teacher registry with intact chapter-specific validation",()=>{
 const flat=chapters.flatMap(group=>[...group]);
 assert.deepEqual(flat.map(l=>l.id),Array.from({length:15},(_,i)=>"L"+String(i+41).padStart(3,"0")));
 for(const lesson of flat){
   assert.equal(getLosTeacherLesson(lesson.id),lesson,lesson.id);
   assert.deepEqual(validateTeacherLesson(lesson),[],lesson.id);
   assert.equal(lesson.bookId,1);
   assert.equal(lesson.chapterId,String(8+Math.floor((Number(lesson.id.slice(1))-41)/5)).padStart(2,"0"));
 }
});
test("C08–C10 source, activity and workbook ids never collide across chapters",()=>{
 for(let i=0;i<chapters.length;i++)for(let j=i+1;j<chapters.length;j++)
  for(const key of ["requiredCheckedIds","requiredActivityIds","requiredPracticeIds"] as const){
   const seen=new Set(chapters[i]!.flatMap(l=>l[key]??[]));
   for(const item of chapters[j]!.flatMap(l=>l[key]??[]))assert.ok(!seen.has(item),key+": "+item);
  }
 for(let i=0;i<chapters.length;i++) {
  const realIds=new Set(losExercisesFor(String(i+8).padStart(2,"0")).map(ex=>ex.id));
  for(const lesson of chapters[i]!)for(const id of lesson.requiredPracticeIds)
   assert.ok(realIds.has(id),lesson.id+": "+id);
 }
});
test("unapproved C10 audio can never be claimed complete by checked transcript answers or scene visits",()=>{
 const lesson=LOS1_C10_TEACHER_LESSONS.find(l=>l.id==="L052")!;
 assert.equal(lesson.mediaGate?.sourceId,"M-DIB-02");
 assert.equal(lesson.mediaGate?.approved,false);
 const initial=emptyTeacherSession(lesson,"2026-11-13T15:00:00Z");
 assert.equal(teacherCanFinish(initial,lesson,{},[]),false);
 const visited={...initial,visitedIds:lesson.scenes.map(x=>x.id),attempts:lesson.requiredQuestionIds.map(sceneId=>({
   sceneId,answer:"a",correct:true,independent:true,at:"2026-11-13T15:00:00Z"
 }))};
 assert.equal(teacherCanFinish(visited,lesson,{},[]),false);
});
test("C10 transfer from L054 remains explicit and does not overwrite existing C08 or C09 chapter drafts",()=>{
 const du="Hallo, wie heißt du? Ich heiße Marie. Woher kommst du? Ich komme aus Berlin. Bis dann!";
 const sie="Guten Tag. Wie heißen Sie? Ich heiße Martin. Woher kommen Sie? Ich komme aus Hamburg. Auf Wiedersehen!";
 const text=composeLosC10Dialogues(du+" "+du,sie+" "+sie);
 assert.ok(text);
 const first=storeLosC10Dialogues(emptyLosDraft(),text!);
 assert.ok(first.applicationDraft.includes("Hallo"));
 const again=storeLosC10Dialogues(first,"NEVER OVERWRITE");
 assert.deepEqual(again,first);
});
