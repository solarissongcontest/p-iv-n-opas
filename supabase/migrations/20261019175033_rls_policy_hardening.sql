-- Tighten Learning OS row-level security and remove duplicate permissive policies.
--
-- The original V4 policies were created for PUBLIC and called auth.uid() once
-- per row. The application only uses authenticated device JWTs, so make that
-- role boundary explicit and use an init-plan-safe auth.uid() lookup.
--
-- Three later tables also accumulated both a FOR ALL policy and equivalent
-- per-command policies. Keep the explicit per-command policies and remove the
-- redundant FOR ALL copies so PostgreSQL does not evaluate duplicate
-- permissive predicates for every query.

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'topic_dependencies',
    'mastery_evidence',
    'learning_events',
    'error_observations',
    'learning_experiments',
    'study_materials',
    'ai_interactions'
  ]
  loop
    execute format(
      'drop policy if exists %I on public.%I',
      'owner_all_' || table_name,
      table_name
    );

    execute format(
      'create policy %I on public.%I for all to authenticated using (owner_id = (select auth.uid())) with check (owner_id = (select auth.uid()))',
      'owner_all_' || table_name,
      table_name
    );
  end loop;
end
$$;

-- question_bank was introduced after the V4 loop but had the same policy shape.
drop policy if exists owner_all_question_bank on public.question_bank;
create policy owner_all_question_bank
on public.question_bank
for all
to authenticated
using (owner_id = (select auth.uid()))
with check (owner_id = (select auth.uid()));

-- These tables already have equivalent SELECT/INSERT/UPDATE/DELETE policies.
-- Removing the duplicate FOR ALL policy preserves authorization while avoiding
-- multiple permissive checks for each command.
drop policy if exists owner_all_pretest_attempts on public.pretest_attempts;
drop policy if exists owner_all_reminder_adaptation on public.reminder_adaptation;
drop policy if exists owner_all_subject_task_parameters on public.subject_task_parameters;

-- Device authentication resolves the canonical profile by display name on each
-- cold launch. Keep that lookup cheap without changing the canonical-owner
-- selection semantics.
create index if not exists user_preferences_display_name_owner_idx
  on public.user_preferences(display_name, onboarding_completed desc, created_at, owner_id)
  where owner_id is not null;
