import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const componentFiles = [
  "src/components/AICoach.tsx",
  "src/components/ContrastiveErrorLab.tsx",
  "src/components/CourseLearningTools.tsx",
  "src/components/ExamSimulationV5.tsx",
  "src/components/LearningOSV5Panels.tsx",
  "src/components/Onboarding.tsx",
  "src/components/PracticeView.tsx",
  "src/components/StudyDialogs.tsx",
  "src/components/StudyViews.tsx",
];

const uiSource = componentFiles
  .map((path) => readFileSync(new URL("../" + path, import.meta.url), "utf8"))
  .join("\n");

test("user-facing UI does not reintroduce known English developer labels", () => {
  const forbiddenPhrases = [
    "Knowledge Graph",
    "Preview Challenge",
    "Practice Mode",
    "Diagnostic Mode",
    "Worked example",
    "Contrastive Error Lab",
    "Retention Budget v5",
    "What-if Planner",
    "Delayed Calibration",
    "Friction learning",
    "Reminder Tapering",
    "Subject × task -personalisointi",
    "Learning OS",
    "Personal Experiment Engine",
    "Mastery-milestonet",
    "Session Fatigue",
    "Learning Engine ·",
    "Exam Blueprint",
    "YO Mode",
    "Web Push",
    "relation-tyyppisiä",
    "paikallinen fallback",
    "mastery-neutraali",
    "mastery-pisteitä",
    "koetason evidenssiksi",
    "autosavetettu",
    "tehtäväblokki",
  ];
  for (const phrase of forbiddenPhrases) {
    assert.equal(uiSource.includes(phrase), false, "UI:ssa on edelleen kielletty ilmaus: " + phrase);
  }
});

test("raw dependency enum labels never appear as option text", () => {
  const courseTools = readFileSync(
    new URL("../src/components/CourseLearningTools.tsx", import.meta.url),
    "utf8",
  );
  for (const value of [
    "prerequisite",
    "depends_on",
    "builds_on",
    "related_to",
    "commonly_confused_with",
  ]) {
    assert.equal(
      courseTools.includes(">" + value + "<"),
      false,
      "Raaka riippuvuustyyppi näkyy käyttöliittymässä: " + value,
    );
  }
});

test("document and install metadata declare Finnish", () => {
  const root = readFileSync(new URL("../src/routes/__root.tsx", import.meta.url), "utf8");
  const manifest = JSON.parse(
    readFileSync(new URL("../public/manifest.webmanifest", import.meta.url), "utf8"),
  ) as { lang?: string; name?: string; description?: string };

  assert.match(root, /<html lang="fi">/);
  assert.equal(manifest.lang, "fi");
  assert.equal(manifest.name, "Opintopäiväkirja");
  assert.match(manifest.description ?? "", /opisk/i);
});

test("Finnish label helpers cover technical values shown in the UI", () => {
  const labels = readFileSync(new URL("../src/lib/ui-fi.ts", import.meta.url), "utf8");
  for (const token of [
    "prerequisite",
    "depends_on",
    "commonly_confused_with",
    "Secure",
    "Strong",
    "free_recall",
    "autopilot",
    "exam_practice",
  ]) {
    assert.ok(labels.includes(token), "Suomenkielinen käyttöliittymämuunnos puuttuu arvolle " + token);
  }
});
