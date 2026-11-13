import test from "node:test";
import assert from "node:assert/strict";
import { getLosTeacherLesson } from "../src/features/los/teacher/lessonRegistry.ts";
import { emptyTeacherSession, moveTeacherScene, toggleTeacherPause } from "../src/features/los/teacher/engine.ts";

const now = "2026-11-13T18:00:00.000Z";

test("pausing freezes navigation for every LOS! 1 Teacher 2.0 lesson, preserving visits and attempt data", () => {
  for (let n = 1; n <= 60; n++) {
    const id = "L" + String(n).padStart(3, "0");
    const lesson = getLosTeacherLesson(id);
    assert.ok(lesson, id + " is registered");
    assert.ok(lesson.scenes.length > 1, id + " has more than one scene");
    const start = emptyTeacherSession(lesson, now);
    const entered = moveTeacherScene(start, lesson, lesson.scenes[0]!.id, now);
    const paused = toggleTeacherPause(entered, now);
    assert.equal(paused.paused, true, id);
    const attempt = moveTeacherScene(paused, lesson, lesson.scenes[1]!.id, now);
    assert.strictEqual(attempt, paused, id + ": no scene, timestamp or visit changes when paused");
    assert.deepEqual(attempt.visitedIds, entered.visitedIds, id);
    const resumed = toggleTeacherPause(paused, now);
    assert.equal(resumed.paused, false, id);
    assert.equal(moveTeacherScene(resumed, lesson, lesson.scenes[1]!.id, now).sceneId, lesson.scenes[1]!.id, id);
    const completed = { ...resumed, completedAt: now };
    assert.strictEqual(toggleTeacherPause(completed, now), completed, id + ": cannot pause completed lesson");
    assert.equal(moveTeacherScene(completed, lesson, lesson.scenes[1]!.id, now).sceneId,
      lesson.scenes[1]!.id, id + ": completed lesson stays reviewable");
  }
});
