import test from "node:test";
import assert from "node:assert/strict";
import {LOS_BOOKS} from "../src/features/los/catalog.ts";
import {losFutureLessonOutline} from "../src/features/los/losFutureLessonOutline.ts";
import {getLosFutureLesson} from "../src/features/los/content/losFutureLessons.ts";
import {getLosFutureTeacherLesson} from "../src/features/los/teacher/futureTeacherAdapter.ts";
import {getLosTeacherLesson} from "../src/features/los/teacher/lessonRegistry.ts";
import {validateTeacherLesson} from "../src/features/los/teacher/validateContent.ts";
import {emptyTeacherSession,teacherCompletionBlockers,parseTeacherSessions} from "../src/features/los/teacher/engine.ts";
import {losDraftKey,emptyLosDraft,parseLosDraft} from "../src/features/los/studyState.ts";

test("exactly 350 distinct book-qualified chapter Teacher lessons reuse their own script content",()=>{
  let count=0;
  for(const book of LOS_BOOKS.filter(x=>x.id>=2)){
    const outline=losFutureLessonOutline(book);
    for(const slot of outline){
      const adapted=getLosFutureTeacherLesson(slot.id);
      if(slot.phase==="review"){assert.equal(adapted,undefined,slot.id);continue;}
      assert.ok(adapted,slot.id);
      const source=getLosFutureLesson(book.id,slot.number);
      assert.ok(source);
      assert.equal(adapted.id,slot.id);
      assert.equal(adapted.bookId,book.id);
      assert.equal(adapted.chapterId,slot.chapterId);
      assert.equal(adapted.publicationStatus,"editorial-draft");
      assert.equal(adapted.scenes.length,9);
      assert.ok(adapted.scenes.find(x=>x.id==="model")?.paragraphs.includes(source.model));
      assert.equal(adapted.scenes.find(x=>x.id==="board")?.board?.length,4);
      assert.deepEqual(validateTeacherLesson(adapted),[],slot.id);
      assert.equal(getLosTeacherLesson(slot.id),adapted);
      count++;
    }
  }
  assert.equal(count,350);
  assert.ok(getLosTeacherLesson("L001"));
  assert.equal(getLosTeacherLesson("LOS2-L030"),undefined);
  assert.equal(getLosTeacherLesson("LOS1-L001"),undefined);
  assert.equal(getLosTeacherLesson("LOS8-L061"),undefined);
});
test("future Teacher sessions preserve old data keys and never authorize completion",()=>{
  const lesson=getLosFutureTeacherLesson("LOS2-L002");
  assert.ok(lesson);
  const session=emptyTeacherSession(lesson,"2026-11-14T00:01:00.000Z");
  const checked={...session,visitedIds:lesson.scenes.map(s=>s.id)};
  assert.ok(teacherCompletionBlockers(checked,lesson,{}).some(x=>x.includes("käsikirjoitusluonnos")));
  const restored=parseTeacherSessions({[lesson.id]:checked});
  assert.equal(restored[lesson.id]?.lessonId,lesson.id);
  const owner="private-owner-fixture";
  assert.notEqual(losDraftKey(1,"01",owner),losDraftKey(2,"01",owner));
  const draft={...emptyLosDraft(),teacherSessions:restored};
  assert.equal(parseLosDraft(JSON.stringify(draft)).teacherSessions?.[lesson.id]?.sceneId,"welcome");
});
