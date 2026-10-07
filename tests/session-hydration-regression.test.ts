import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const sessionSource = readFileSync(
  new URL("../src/features/session/SessionForm.tsx", import.meta.url),
  "utf8",
);

test("session saves cannot silently no-op while course data hydrates", () => {
  assert.match(sessionSource, /fallbackCourseId/);
  assert.match(sessionSource, /setCourseId\(fallbackCourseId\)/);
  assert.match(sessionSource, /function resolvedCourseId\(\)/);
  assert.match(sessionSource, /function resolvedTopicId\(selectedCourseId: string\)/);
  assert.match(sessionSource, /toast\.error\("Valitse kurssi ennen tallennusta\."\)/);
  assert.doesNotMatch(sessionSource, /e\.preventDefault\(\);\s*if\s*\(!courseId\)\s*return/);
});

test("hydration fix preserves durable offline session logging", () => {
  assert.match(sessionSource, /function persistLog\(/);
  assert.match(sessionSource, /navigator\.onLine === false/);
  assert.match(sessionSource, /runOrQueue<string>\("logSession", inputValue\)/);
  assert.match(sessionSource, /const selectedCourseId = resolvedCourseId\(\)/);
  assert.match(sessionSource, /topic_id: resolvedTopicId\(selectedCourseId\)/);
});
