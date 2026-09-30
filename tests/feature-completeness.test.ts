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
    "KnowledgeGraphEditor", "Viikkosi · viikko", "Avaa ensi viikon suunnitelma", "Koemoodi", "Osaamiskartta v4",
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

test("Learning OS v5 remains wired through engine, persistence and UI", () => {
  const v5 = read("src/lib/learning-os-v5.ts");
  const views = read("src/components/StudyViews.tsx");
  const practice = read("src/components/PracticeView.tsx");
  const plannerPanels = read("src/components/LearningOSV5Panels.tsx");
  const examUi = read("src/components/ExamSimulationV5.tsx");
  const errorLab = read("src/components/ContrastiveErrorLab.tsx");
  const migration = read("supabase/migrations/20260930174500_learning_os_v5.sql");
  const compatibilityMigration = read("supabase/migrations/20260930180000_learning_os_v5.sql");

  const engineTokens = [
    "adaptiveRetentionBudgetV5","retentionBudgetV5","stopRuleV5",
    "pretestPlanV5","instructionPlanV5","instructionDecisionV5",
    "feedbackPolicyCoreV5","feedbackPolicyV5","confusionAwareInterleavingV5",
    "confusionSetsV5","delayedCalibrationV5","transferLadderV5",
    "transferStateV5","whatIfStudySimulatorV5","whatIfPlannerV5",
    "frictionInsightsV5","frictionInsightV5","reminderTaperingV5",
    "subjectTaskProfilesV5","recommendationConfidenceV5",
    "nextBestActionsV5","adaptiveDayPlanV5","buildExamSimulationV5",
    "contrastiveRepairPlanV5",
  ];
  for (const token of engineTokens) assert.ok(v5.includes(token), "Missing v5 engine: " + token);

  assert.ok(views.includes("adaptiveDayPlanV5("));
  assert.ok(views.includes("V5PlannerPanel"));
  assert.ok(views.includes("V5LearningHealthPanel"));
  assert.ok(views.includes("ExamSimulationV5"));
  assert.ok(views.includes("ContrastiveErrorLab"));

  for (const token of ["instructionDecisionV5","feedbackPolicyV5","stopRuleV5","confusionSetsV5","transferStateV5","pretest"]) {
    assert.ok(practice.includes(token), "Missing v5 Practice integration: " + token);
  }
  assert.ok(plannerPanels.includes("Retention Budget v5"));
  assert.ok(plannerPanels.includes("What-if Planner"));
  assert.ok(plannerPanels.includes("Reminder Tapering"));
  assert.ok(examUi.includes("YO / Abitti 2 -simulaatio"));
  assert.ok(examUi.includes("SketchAnswerCanvas"));
  assert.ok(errorLab.includes("Contrastive Error Lab"));

  for (const token of [
    "learning_policy_states","calibration_observations","study_friction_events",
    "implementation_intentions","exam_simulations","is_pretest","transfer_level",
    "stimulus_package","answer_mode","retention_target",
  ]) assert.ok(migration.includes(token), "Missing v5 persistence: " + token);

  for (const token of [
    "pretest_attempts","retention_targets","stop_rule_events",
    "reminder_adaptation","learning_policy_snapshots","subject_task_parameters",
  ]) assert.ok(compatibilityMigration.includes(token), "Missing v5 compatibility persistence: " + token);
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
