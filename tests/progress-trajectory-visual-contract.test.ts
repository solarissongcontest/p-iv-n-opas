import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path: string) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("progress trajectory keeps its visible plan, actual and forecast curves", () => {
  const chart = read("src/features/progress/ProgressTrajectoryChart.tsx");
  const card = read("src/features/progress/PlanAdherenceCard.tsx");

  for (const token of [
    "trajectory-main-plot",
    "trajectory-actual-line",
    "trajectory-plan-line",
    "trajectory-forecast-line",
    "ReferenceDot",
    "Etenemisen luvut",
    "Opiskelupäivien ero",
    "trajectory-deviation-plot",
    "Tavoitealue",
  ]) {
    assert.ok(chart.includes(token), `Missing trajectory visual: ${token}`);
  }

  // When plan and actual are identical, the dashed plan must be drawn after the
  // solid actual line so both remain perceptible instead of collapsing into one curve.
  assert.ok(chart.indexOf("trajectory-actual-line") < chart.indexOf("trajectory-plan-line"));

  // A one-point series must still have a visible endpoint rather than disappearing.
  assert.ok(chart.includes("data-trajectory-dot=\"actual\""));
  assert.ok(chart.includes("actualPointCount <= 1"));

  // Progress summary and course analysis both keep using the canonical chart.
  assert.ok(card.includes("ProgressTrajectoryChart"));
});
