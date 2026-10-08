import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const card = readFileSync(
  new URL("../src/features/progress/PlanAdherenceCard.tsx", import.meta.url),
  "utf8",
);
const containment = readFileSync(
  new URL("../src/styles/progress-mobile.css", import.meta.url),
  "utf8",
);

test("Progress summary cannot inherit the daily chart min-content width", () => {
  assert.match(card, /progress-summary-only min-w-0 max-w-full/);
  assert.match(card, /min-w-0 max-w-full overflow-hidden/);
  assert.match(containment, /\.progress-v5 > \*,\s*\.progress-summary-only/);
  assert.match(containment, /contain: inline-size/);
  assert.match(containment, /overflow-x: auto/);
});

test("Progress summary opens on the whole-course curve instead of a horizontally dense daily track", () => {
  assert.match(card, /defaultView="course"/);
});
