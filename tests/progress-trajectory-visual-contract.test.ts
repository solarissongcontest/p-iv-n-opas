import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path: string) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("production progress trajectory keeps real plan, actual and forecast geometry", () => {
  const chart = read("src/features/progress/ReliableProgressTrajectoryChart.tsx");
  const card = read("src/features/progress/PlanAdherenceCard.tsx");
  const courseView = read("src/features/studies/CourseView.tsx");

  for (const token of [
    "trajectory-main-plot",
    'data-trajectory-series="actual"',
    'data-trajectory-series="plan"',
    'data-trajectory-series="forecast"',
    "stepPath",
    "Etenemisen luvut",
    "Opiskelupäivien ero",
    "trajectory-deviation-plot",
    "Tavoitealue",
    "Ensimmäinen suunniteltu opiskelupäivä",
  ]) {
    assert.ok(chart.includes(token), `Missing trajectory visual: ${token}`);
  }

  // Zero progress sits inside a padded -5..105 plot, so a 0% line/dot is not clipped away.
  assert.ok(chart.includes("105 - value"));
  assert.ok(chart.includes("/ 110"));

  // Both entry points must mount this exact renderer, not an old parallel chart.
  assert.ok(card.includes("ReliableProgressTrajectoryChart"));
  assert.ok(courseView.includes("ReliableProgressTrajectoryChart"));
});
