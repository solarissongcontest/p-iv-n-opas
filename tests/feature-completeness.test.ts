import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path: string) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("non-AI master-plan features remain wired end-to-end", () => {
  const views = read("src/components/StudyViews.tsx");
  const practice = read("src/components/PracticeView.tsx");
  const editor = read("src/components/AbittiAnswerEditor.tsx");
  const learning = read("src/lib/learning-os-v4.ts");
  const data = read("src/lib/data.ts");
  const route = read("src/routes/index.tsx");
  const migration = read("supabase/migrations/20260929170000_learning_os_v4.sql");

  const requiredLearning = [
    "masteryModelV4", "nextBestActionsV4", "adaptiveDayPlanV4",
    "delayedVerificationQueueV4", "sessionFatigueV4",
    "personalLearningProfileV4", "yoOverviewV4", "experimentInsightsV4",
    "simulateLearningOsV4", "learningOsSelfCheckV4",
  ];
  for (const token of requiredLearning) assert.match(learning, new RegExp(token));

  const requiredUi = [
    "yoOverviewV4(", "experimentInsightsV4(", "learningOsSelfCheckV4(",
    "productMetricsV4(", "learningAchievementsV4(", "personalLearningProfileV4(",
    "KnowledgeGraphEditor", "Weekly Review", "Koemoodi", "Osaamiskartta v4",
  ];
  for (const token of requiredUi) assert.ok(views.includes(token), "Missing UI integration: " + token);

  for (const token of ["diagnosticMode", "interleaved", "LOPS21-tehtäväpankki", "scaffold"]) {
    assert.ok(practice.includes(token), "Missing Practice integration: " + token);
  }

  assert.ok(editor.includes("ctrlKey") || editor.includes("metaKey"));
  assert.ok(editor.includes("Kaava"));

  for (const token of ["learning_experiments", "topic_dependencies", "study_materials", "practice_attempts"]) {
    assert.ok(data.includes(token), "Missing persisted data integration: " + token);
  }

  for (const token of ["mastery_evidence", "learning_events", "error_observations", "topic_dependencies"]) {
    assert.ok(migration.includes(token), "Missing v4 persistence architecture: " + token);
  }

  assert.ok(route.includes('queryClient.refetchQueries({ type: "active" })'));
  assert.ok(route.includes("30_000"));
  assert.ok(route.includes('window.addEventListener("online"'));
});

test("master plan keeps evidence and safety invariants", () => {
  const domain = read("src/lib/domain.ts");
  const learning = read("src/lib/learning-os-v4.ts");
  const views = read("src/components/StudyViews.tsx");

  assert.ok(learning.includes("verificationRequired"));
  assert.ok(learning.includes("blindSpot"));
  assert.ok(learning.includes("prerequisite"));
  assert.ok(domain.includes("readiness"));
  assert.ok(domain.includes("recovery"));
  assert.ok(views.includes("ei arvosanaennuste"));
  assert.ok(views.includes("Extra ei muutu opiskelusakoksi") || views.includes("Extra ei muutu"));
});
