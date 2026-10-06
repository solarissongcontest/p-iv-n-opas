import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(
  new URL("../src/lib/learning-os-v5.ts", import.meta.url),
  "utf8",
);

test("today's explicit Planner task is pinned ahead of adaptive suggestions", () => {
  assert.match(source, /a\.planItem\?\.date===now&&a\.planItem\.status==="planned"/);
  assert.match(source, /b\.planItem\?\.date===now&&b\.planItem\.status==="planned"/);
  assert.match(source, /if\(aTodayPlan!==bTodayPlan\)return bTodayPlan-aTodayPlan/);
});
