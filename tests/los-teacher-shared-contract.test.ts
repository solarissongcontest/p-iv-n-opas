import test from "node:test";
import assert from "node:assert/strict";
import {emptyTeacherSession, parseTeacherSessions, teacherCanFinish, teacherCompletionBlockers, finishTeacherSession} from "../src/features/los/teacher/engine.ts";
import {validateTeacherLesson} from "../src/features/los/teacher/validateContent.ts";
import {LOS1_L004_TEACHER} from "../src/features/los/teacher/lessonL004.ts";

const now="2026-11-14T00:00:00.000Z";
test("existing Teacher 1 sessions survive the extended book-qualified draft format",()=>{
  const old=emptyTeacherSession(LOS1_L004_TEACHER,now);
  const future={...LOS1_L004_TEACHER,id:"LOS2-L002",bookId:2,chapterId:"01",publicationStatus:"editorial-draft" as const};
  const draft=emptyTeacherSession(future,now);
  const parsed=parseTeacherSessions({L004:old,"LOS2-L002":draft,"LOS9-L002":draft});
  assert.deepEqual(parsed.L004,old);
  assert.deepEqual(parsed["LOS2-L002"],draft);
  assert.equal(parsed["LOS9-L002"],undefined);
  assert.equal(validateTeacherLesson(future).some(issue=>issue.location==="lesson"),false);
  assert.equal(validateTeacherLesson({...future,bookId:3}).some(issue=>issue.location==="lesson"),true);
});
test("pending content cannot manufacture teacher completion even after every scene is viewed",()=>{
  const draft={...LOS1_L004_TEACHER,id:"LOS2-L002",bookId:2,chapterId:"01",publicationStatus:"editorial-draft" as const};
  const session=emptyTeacherSession(draft,now);
  const visited={...session,visitedIds:draft.scenes.map(x=>x.id)};
  const blockers=teacherCompletionBlockers(visited,draft,{});
  assert.ok(blockers.some(s=>s.includes("Hyväksyttyä suoritusta ei voi")));
  assert.equal(teacherCanFinish(visited,draft,{}),false);
  assert.equal(finishTeacherSession(visited,draft,{},now),visited);
});
