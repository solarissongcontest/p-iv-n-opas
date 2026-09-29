# Legacy repository migration audit

## Canonical repository

The only canonical production repository for Opintopäiväkirja / Päivän Opas is:

`solarissongcontest/p-iv-n-opas`

Production, database-migration and deployment workflows must not be run from any earlier repository copy.

This audit exists because development work was accidentally performed in two non-canonical repositories during 28–29 September 2026:

- `solarissongcontest/BriskValidCopyright`
- `solarissongcontest/opintopaivakirja`

Those repositories are historical only. Do not merge or deploy from them.

## Status vocabulary

- **PORTED**: the same product requirement exists in the canonical repository.
- **SUPERSEDED**: the requirement exists in a newer/better implementation; the old code should not be copied.
- **INTENTIONALLY DROPPED**: an old mechanism was deliberately not copied because it was weaker or conflicted with the current Learning OS architecture.

## Coverage

| Legacy capability | Canonical implementation | Status |
| --- | --- | --- |
| Persistent study database | Supabase/PostgreSQL + RLS + migrations + atomic RPCs | SUPERSEDED |
| KE04 canonical seed | Current setup/seed flow and KE04 topic data | PORTED |
| Adaptive Today | Learning OS v4 Next Best Action + Minimum/Recommended/Extra | SUPERSEDED |
| Course dashboard / progress corridor | Course overview, analytics and forecast | PORTED |
| School progress vs personal progress | `school_covered`, coverage and personal progress | PORTED |
| Target systems | school 4–10, YO, percent, pass/fail, custom | PORTED |
| Mastery separated from self-rating | Evidence-based mastery + confidence/uncertainty | SUPERSEDED |
| Review / forgetting risk | Recovery Queue, personalized review, forgetting risk | SUPERSEDED |
| Mistake bank | Mistakes + Error Model | SUPERSEDED |
| Practice tests | score, max score, duration, error count, topic breakdown | PORTED |
| Course/topic editing | Current course/topic edit flows | PORTED |
| Prerequisite dependencies | Typed Knowledge Graph + legacy `dependencies[]` compatibility | SUPERSEDED |
| 14-day exam mode | Six-stage Exam Mode + Exam Blueprint + final-two-days rule | SUPERSEDED |
| BI05 / KE06 course templates | `src/lib/courseTemplates.ts` | PORTED |
| Fast topic import | text import plus AI/PDF/text course structure import | SUPERSEDED |
| Global workload balancing | Capacity Engine + planner balancing | SUPERSEDED |
| Weekly review | Weekly Review / check-ins / adaptive next-week changes | PORTED |
| Day/week/month planning | Planner day/week/month modes | PORTED |
| Progress analytics | mastery map, calibration, errors, efficiency, forecast | SUPERSEDED |
| Study Session retrieval/reflection | Guided Study Session + retrieval check + reflection + evidence | SUPERSEDED |
| Practice Mode | scaffolded Practice Engine + diagnostics + transfer + delayed verification | SUPERSEDED |
| Interleaving | adaptive interleaving + personal experiment | SUPERSEDED |
| Calibration | calibration dimension + blind-spot/under-confidence signals | SUPERSEDED |
| Return from Break | capped recovery/replan and backlog suppression | SUPERSEDED |
| Event log | normalized `learning_events` + progress events | SUPERSEDED |
| Notifications | Web Push + settings + quiet hours + dedupe | SUPERSEDED |
| Offline queue | operation IDs / queued mutations / calm sync | PORTED |
| 30–90 day simulation | deterministic Learning OS v4 simulator | SUPERSEDED |
| AI Coach experiments | Gemini closed-tactic Coach + Answer Firewall | SUPERSEDED |
| Keyword-only answer scoring | Replaced by advisory Concept/Rubric Evaluator; never authoritative mastery evidence | INTENTIONALLY DROPPED |

## Deliberately not copied

Do **not** resurrect these legacy mechanisms:

1. Keyword-only open-answer scoring as an authoritative correctness check.
2. A second mastery engine running in parallel with Learning OS v4.
3. A second Today-prioritization engine.
4. Old Replit/Drizzle/OpenAPI persistence architecture alongside Supabase.
5. Duplicate notification schedulers.
6. Generic AI chat that can reveal active-practice answers.
7. Any code path where UI directly raises mastery without learning evidence.

## Replacement for legacy keyword scoring

The canonical Practice Mode contains an advisory Concept/Rubric Evaluator.

It:

- evaluates concept coverage as only one rubric signal;
- also considers reasoning, task-type fit and response completeness;
- never displays missing concept names or an answer key;
- never automatically chooses the saved attempt result;
- requires the learner to make the final `independent / hinted / not_yet` judgment;
- stores its evaluation only as attempt metadata;
- marks an attempt as assisted if rubric feedback was viewed before saving;
- therefore requires later independent verification before that evidence can be trusted strongly.

This preserves the useful idea from the legacy scorer without pretending that keyword overlap equals understanding.

## Canonical safeguards

The repository Quality Gate contains a canonical-repository guard. If the workflow is copied to another repository, the build must fail before tests/build/deployment work proceeds.

Regression tests also assert the presence of the legacy requirements above so that a future refactor cannot quietly remove them.

## Audit limitation

The historical repositories are not the source of truth. This file records requirements reconstructed from the project development history and verifies their canonical replacements in `p-iv-n-opas`. When an old implementation conflicts with the current Learning OS architecture, the canonical implementation wins.
