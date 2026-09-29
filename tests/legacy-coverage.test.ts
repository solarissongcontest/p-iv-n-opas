import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

function read(path: string) {
  return readFileSync(new URL("../" + path, import.meta.url), "utf8");
}

test("repository declares the canonical production repository", () => {
  const readme = read("README.md");
  const workflow = read(".github/workflows/quality.yml");
  const buildGuard = read("scripts/assert-canonical-repo.mjs");
  const packageJson = read("package.json");

  assert.match(readme, /Canonical production repository:[\s\S]*solarissongcontest\/p-iv-n-opas/);
  assert.match(workflow, /GITHUB_REPOSITORY/);
  assert.match(workflow, /solarissongcontest\/p-iv-n-opas/);
  assert.match(buildGuard, /VERCEL_GIT_REPO_SLUG/);
  assert.match(buildGuard, /p-iv-n-opas/);
  assert.match(packageJson, /assert-canonical-repo\.mjs/);
});

test("legacy migration manifest covers both accidental repositories", () => {
  const audit = read("docs/legacy-migration-audit.md");
  assert.match(audit, /solarissongcontest\/BriskValidCopyright/);
  assert.match(audit, /solarissongcontest\/opintopaivakirja/);
  assert.match(audit, /INTENTIONALLY DROPPED/);
  assert.match(audit, /Concept\/Rubric Evaluator/);
});

test("course creation keeps BI05, KE06 and fast topic import", () => {
  const templates = read("src/lib/courseTemplates.ts");
  assert.match(templates, /id: "BI05"/);
  assert.match(templates, /id: "KE06"/);
  assert.match(templates, /parseTopicImport/);
  assert.match(templates, /normalizeTopicWeights/);
});

test("KE04 canonical seed remains in the real data layer", () => {
  const data = read("src/lib/data.ts");
  assert.match(data, /KE04/);
  assert.match(data, /Kemialliset reaktiot/);
  assert.match(data, /Stoikiometria/);
});

test("all legacy evaluation target systems remain supported", () => {
  const domain = read("src/lib/domain.ts");
  for (const target of ["school", "yo", "percent", "passfail", "custom"]) {
    assert.match(domain, new RegExp('value: "' + target + '"'));
  }
});

test("planner retains day week month modes and return-from-break recovery UX", () => {
  const views = read("src/components/StudyViews.tsx");
  assert.match(views, /"päivä"\|"viikko"\|"kuukausi"/);
  assert.match(views, /Tervetuloa takaisin/);
  assert.match(views, /weeklyLearningReview/);
  assert.match(views, /Viikkosi · viikko/);
});

test("exam preparation remains six-stage and last-two-days aware", () => {
  const engine = read("src/lib/learning-engine.ts");
  const views = read("src/components/StudyViews.tsx");
  for (const stage of ["coverage", "retrieval", "mixed", "transfer", "simulation", "repair"]) {
    assert.match(engine, new RegExp('key: "' + stage + '"'));
  }
  assert.match(views, /Viimeiset 2 päivää/);
});

test("guided Study Session retains timer and retrieval evidence", () => {
  const dialogs = read("src/components/StudyDialogs.tsx");
  assert.match(dialogs, /timerMode/);
  assert.match(dialogs, /retrievalResult/);
  assert.match(dialogs, /retrievalConfidence/);
  assert.match(dialogs, /sessionFatigueV4/);
});

test("PracticeTest retains duration errors and topic breakdown", () => {
  const views = read("src/components/StudyViews.tsx");
  const data = read("src/lib/data.ts");
  for (const field of ["duration_minutes", "error_count", "topic_results"]) {
    assert.ok(views.includes(field) || data.includes(field), field + " is missing");
  }
});

test("push notification safeguards retain quiet hours and dedupe", () => {
  const cron = read("src/routes/api.push.cron.ts");
  assert.match(cron, /quiet_hours_start/);
  assert.match(cron, /quiet_hours_end/);
  assert.match(cron, /delivery_key/);
});

test("offline mutations retain operation ids and queued write paths", () => {
  const data = read("src/lib/data.ts");
  assert.match(data, /operation_id/);
  assert.match(data, /runOrQueue/);
  assert.match(data, /registerOp/);
});

test("Learning OS v4 retains adaptive planning simulation fatigue and YO mode", () => {
  const engine = read("src/lib/learning-os-v4.ts");
  for (const symbol of [
    "adaptiveDayPlanV4",
    "simulateLearningOsV4",
    "sessionFatigueV4",
    "yoOverviewV4",
    "experimentInsightsV4",
    "learningOsSelfCheckV4",
  ]) {
    assert.match(engine, new RegExp("export function " + symbol));
  }
});

test("normalized learning architecture remains present", () => {
  const migration = read("supabase/migrations/20260929170000_learning_os_v4.sql");
  for (const table of [
    "topic_dependencies",
    "mastery_evidence",
    "learning_events",
    "error_observations",
    "learning_experiments",
    "study_materials",
    "ai_interactions",
  ]) {
    assert.match(migration, new RegExp(table));
  }
});

test("rubric feedback is deliberately marked as assisted evidence", () => {
  const migration = read("supabase/migrations/20260929183000_practice_rubric_evidence.sql");
  const practice = read("src/components/PracticeView.tsx");

  assert.match(practice, /rubricEvaluatorUsed/);
  assert.match(practice, /Arvioi oma vastaus/);
  assert.match(migration, /rubricEvaluatorUsed/);
  assert.match(migration, /new\.assisted/);
  assert.match(migration, /independent_verification_required/);
});
