import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path: string) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

const readViews = () => [
  "src/features/today/TodayView.tsx",
  "src/features/planner/PlanView.tsx",
  "src/features/studies/CourseView.tsx",
  "src/features/exams/ExamsView.tsx",
  "src/features/progress/ProgressView.tsx",
  "src/features/settings/SettingsView.tsx",
].map(read).join("\n");

test("non-AI master-plan features remain wired end-to-end", () => {
  const views = readViews();
  const practice = read("src/features/practice/PracticeView.tsx");
  const editor = read("src/components/AbittiAnswerEditor.tsx");
  const learning = read("src/lib/learning-os-v4.ts");
  const data = read("src/lib/data.ts");
  const app = read("src/app/StudyApp.tsx");
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
    "KnowledgeGraphEditor", "Viikkosi · viikko", "Avaa ensi viikon suunnitelma", "Koemoodi", "Osaamiskartta · tarkempi arvio",
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

  assert.ok(app.includes('queryClient.refetchQueries({ type: "active" })'));
  assert.ok(app.includes("30_000"));
  assert.ok(app.includes('window.addEventListener("online"'));
});

test("Learning OS v5 remains wired through engine, persistence and UI", () => {
  const v5 = read("src/lib/learning-os-v5.ts");
  const views = readViews();
  const practice = read("src/features/practice/PracticeView.tsx");
  const plannerPanels = read("src/components/LearningOSV5Panels.tsx");
  const examUi = read("src/components/ExamSimulationV5.tsx");
  const errorLab = read("src/components/ContrastiveErrorLab.tsx");
  const migration = read("supabase/migrations/20260930174500_learning_os_v5.sql");
  const extension = read("supabase/migrations/20260930180000_learning_os_v5.sql");

  for (const token of [
    "retentionBudgetV5", "retentionTargetV5", "stopRuleV5",
    "pretestPlanV5", "instructionDecisionV5", "feedbackPolicyV5",
    "transferStateV5", "contrastiveRepairPlanV5", "confusionSetsV5",
    "delayedCalibrationV5", "frictionInsightV5", "reminderTaperV5",
    "subjectTaskProfilesV5", "whatIfPlannerV5", "buildExamSimulationV5",
    "nextBestActionsV5", "adaptiveDayPlanV5", "recommendationConfidenceV5",
  ]) assert.ok(v5.includes(token), "Missing v5 engine capability: " + token);

  assert.ok(views.includes("adaptiveDayPlanV5("));
  assert.ok(views.includes("V5PlannerPanel"));
  assert.ok(views.includes("V5LearningHealthPanel"));
  assert.ok(views.includes("ExamSimulationV5"));
  assert.ok(views.includes("ContrastiveErrorLab"));

  for (const token of ["instructionDecisionV5","feedbackPolicyV5","stopRuleV5","confusionSetsV5","transferStateV5","pretest"]) {
    assert.ok(practice.includes(token), "Missing v5 Practice integration: " + token);
  }
  assert.ok(plannerPanels.includes("Mukautuva kertausbudjetti"));
  assert.ok(plannerPanels.includes("Vaihtoehtojen vertailu"));
  assert.ok(plannerPanels.includes("Muistutusten vähentäminen"));
  assert.ok(examUi.includes("YO / Abitti 2 -koeharjoitus"));
  assert.ok(examUi.includes("SketchAnswerCanvas"));
  assert.ok(errorLab.includes("Virheen korjaus"));

  for (const token of [
    "learning_policy_states","calibration_observations","study_friction_events",
    "implementation_intentions","exam_simulations","is_pretest","transfer_level",
    "stimulus_package","answer_mode","retention_target",
  ]) assert.ok(migration.includes(token), "Missing v5 persistence: " + token);

  for (const token of [
    "pretest_attempts","retention_targets","stop_rule_events","reminder_adaptation",
    "learning_policy_snapshots","subject_task_parameters","feedback_policy_enabled",
    "abitti_simulation_enabled",
  ]) assert.ok(extension.includes(token), "Missing v5 compatibility persistence: " + token);

  assert.ok(migration.includes("enable row level security"));
  assert.ok(migration.includes("to authenticated"));
  assert.ok(extension.includes("enable row level security"));
  assert.ok(extension.includes("grant select,insert,update,delete"));
});
test("master plan keeps evidence and safety invariants", () => {
  const domain = read("src/lib/domain.ts");
  const learning = read("src/lib/learning-os-v4.ts");
  const views = readViews();

  assert.ok(learning.includes("verificationRequired"));
  assert.ok(learning.includes("blindSpot"));
  assert.ok(learning.includes("prerequisite"));
  assert.ok(domain.includes("readiness"));
  assert.ok(domain.includes("recovery"));
  assert.ok(views.includes("ei arvosanaennuste"));
  assert.ok(views.includes("Lisäharjoittelu") && views.includes("ei muutu"));
});


test("study weekday settings save once and realign the future plan", () => {
  const settings = read("src/features/settings/SettingsView.tsx");
  const data = read("src/lib/data.ts");

  assert.match(settings, /studyWeekdaysDraft/);
  assert.match(settings, /Tallenna opiskelupäivät/);
  assert.match(settings, /useApplyStudyWeekdays/);
  assert.match(data, /export function useApplyStudyWeekdays/);
  assert.match(data, /findNextStudyDate/);
  assert.match(data, /study_weekdays: studyWeekdays/);
});
