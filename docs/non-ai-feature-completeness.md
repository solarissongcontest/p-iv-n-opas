# Opintopäiväkirja non-AI feature-completeness gate

This document is the canonical completion gate for the non-AI Study OS work agreed across the project conversations.

## Complete only when all layers exist

A feature is not considered complete merely because an engine function exists. Completion requires, where applicable:

1. persisted data model / migration,
2. domain or Learning OS logic,
3. user-facing UI,
4. mutation + reload persistence,
5. cross-device refresh,
6. offline reconciliation where the action is offline-capable,
7. regression coverage.

## Required non-AI feature families

- Evidence-first multidimensional mastery: recall, understanding, application, fluency, retention, calibration, uncertainty and blind spots.
- Next Best Action and adaptive Today with minimum/recommended/optional load, reason, switch, light day and cannot-today recovery.
- Capacity Engine, busy dates, recovery days and global workload balancing.
- Practice Mode with retrieval, short answer, calculation, application, multiple choice, explanation, ordering, error detection, diagnostic mode, interleaving, scaffolding, retries and delayed independent verification.
- LOPS21 question bank and Abitti-style answer / Ctrl+E formula editing.
- Review/recovery queue and forgetting-risk scheduling.
- Mistake lifecycle and error taxonomy.
- Exam Mode: Coverage -> Retrieval -> Mixed -> Transfer -> Simulation -> Repair, including final-two-day light mode, practice tests, readiness, risks and buffers. Readiness is never a grade prediction.
- YO overview / target-system support.
- Planner day/week/month, manual/assisted/autopilot modes, proposal acceptance/editing and accessible move alternative.
- Course/topic CRUD, fast topic import, school-covered vs own progress, dependencies / Knowledge Graph and study-material mapping.
- Study Session with atomic persistence of session + mastery evidence + plan completion and offline queue.
- Weekly Review / check-in and next-week focus.
- Return from break.
- Progress / Learning Health: mastery map, calibration, error profile, fatigue, personal learning profile, Personal Experiment Engine, achievements without XP/streak punishment, product learning metrics and deterministic simulator/self-check.
- Search and keyboard navigation.
- Notification settings, quiet hours, push dedupe/dead-subscription handling.
- PWA/offline shell, pending-write status and recovery.
- Cross-device canonical Arthur owner plus foreground/online/offline-flush revalidation.
- Calm Academic responsive UI, dark mode, Liquid Glass only on the control layer and accessibility fallbacks.

## Explicitly excluded from this gate

Remote AI/Gemini availability is excluded. The rest of the Study OS must remain useful and internally consistent without a remote model.

## Regression

`tests/feature-completeness.test.ts` prevents the major integrations above from silently disappearing. Existing learning-v3/v4, rubric, coach-policy and legacy tests remain the behavioral checks.

Deployment is intentionally separate from this gate.
