import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const trajectory = readFileSync(
  new URL("../src/features/progress/ReliableProgressTrajectoryChart.tsx", import.meta.url),
  "utf8",
);
const progress = readFileSync(
  new URL("../src/features/progress/ProgressView.tsx", import.meta.url),
  "utf8",
);
const analytics = readFileSync(
  new URL("../src/lib/progress-analytics.ts", import.meta.url),
  "utf8",
);

test("practice evidence is never presented as a course mastery percentage", () => {
  assert.match(trajectory, /Harjoitusnäyttö/);
  assert.match(trajectory, /ei ole kurssin osaamisprosentti/i);
  assert.doesNotMatch(trajectory, /\? "Työmäärä" : "Osaaminen"/);
  assert.match(trajectory, /evidenceCount/);
});

test("weekly workload explicitly comes from planner items and study sessions", () => {
  assert.match(progress, /Viikoittainen työmäärä · nykyinen suunnitelma vs\. toteutunut/);
  assert.match(progress, /oikeista Planner-tehtävistä/);
  assert.match(analytics, /target_minutes/);
  assert.match(analytics, /session\.minutes/);
  assert.doesNotMatch(progress, /courses\.reduce\([^\n]*weekly_minutes/);
});

test("progress UI distinguishes due-plan adherence from logged study time", () => {
  assert.match(trajectory, /erääntyneestä suunnitellusta työstä tehty/);
  assert.match(trajectory, /Kirjattu opiskeluaika/);
  assert.match(trajectory, /Erääntynyt suunniteltu työ/);
});
