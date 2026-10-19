import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const migration = readFileSync(
  new URL("../supabase/migrations/20261019205000_rls_policy_hardening.sql", import.meta.url),
  "utf8",
);

test("Learning OS policies are authenticated-only and use init-plan-safe auth uid lookups", () => {
  for (const table of [
    "topic_dependencies",
    "mastery_evidence",
    "learning_events",
    "error_observations",
    "learning_experiments",
    "study_materials",
    "ai_interactions",
  ]) {
    assert.ok(migration.includes(`'${table}'`), table);
  }

  assert.match(migration, /for all to authenticated using \(owner_id = \(select auth\.uid\(\)\)\)/i);
  assert.match(migration, /with check \(owner_id = \(select auth\.uid\(\)\)\)/i);

  assert.match(migration, /create policy owner_all_question_bank[\s\S]*for all[\s\S]*to authenticated/i);
  assert.match(migration, /owner_id = \(select auth\.uid\(\)\)/i);
});

test("duplicate permissive FOR ALL policies are removed without deleting per-command policies", () => {
  for (const policy of [
    "owner_all_pretest_attempts",
    "owner_all_reminder_adaptation",
    "owner_all_subject_task_parameters",
  ]) {
    assert.match(migration, new RegExp(`drop policy if exists ${policy}`, "i"));
    assert.doesNotMatch(migration, new RegExp(`create policy ${policy}`, "i"));
  }
});

test("canonical Arthur profile lookup has a covering display-name index", () => {
  assert.match(migration, /create index if not exists user_preferences_display_name_owner_idx/i);
  assert.match(
    migration,
    /user_preferences\(display_name, onboarding_completed desc, created_at, owner_id\)/i,
  );
  assert.match(migration, /where owner_id is not null/i);
});
