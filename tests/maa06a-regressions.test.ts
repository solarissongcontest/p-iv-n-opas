import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path: string) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("MAA06A bootstrap does not suppress onboarding", () => {
  const data = read("src/lib/data.ts");
  assert.match(data, /onboarding_completed === true/);
  assert.match(data, /course\.code !== "MAA06A"/);
});

test("exercise attempts keep click timestamps and refresh topic coverage", () => {
  const data = read("src/lib/maa06a-data.ts");
  const panels = read("src/features/maa06a/Maa06aPanels.tsx");
  assert.match(panels, /attempted_at: new Date\(\)\.toISOString\(\)/);
  assert.match(data, /input\.attempted_at \?\?= new Date\(\)\.toISOString\(\)/);
  assert.match(data, /queryKey: \["topics"\]/);
});

test("exercise schema fallback does not swallow generic table errors", () => {
  const data = read("src/lib/maa06a-data.ts");
  assert.match(data, /error\.code === "PGRST205"/);
  assert.match(data, /error\.code === "42P01"/);
  assert.match(data, /does not exist/i);
  assert.doesNotMatch(data, /course_exercises\|course_exercise_attempts\|course_exercise_goals\|schema cache\|relation/);
});

test("MAA06A seed is versioned and skipped when current", () => {
  const data = read("src/lib/maa06a-data.ts");
  assert.match(data, /MAA06A_EXERCISE_SEED_VERSION/);
  assert.match(data, /metadata->>seedVersion/);
  assert.match(data, /maa06aExerciseSeedIsCurrent/);
  assert.match(data, /if \(!\(await maa06aExerciseSeedIsCurrent\(course\.id\)\)\)/);
});
