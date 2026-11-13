# LOS Teacher Experience 2.0: implementation status

**Date:** 2026-11-13. Source-code inventory, not a release certificate.

## Authority

The LOS Teacher Experience 2.0 masterplan (2026-11-12), LOS! series masterplan, LOS! 1 book-specific masterplan and approved visual V3.3 plan govern this implementation. There are no AI models, generative runtime APIs, machine learning, synthetic speech services or automatic pronunciation scoring.

## Implemented teaching pilot: L001–L005

- **L001 · Miten LOS! 1:llä opiskellaan? (10 scenes).** Zero-beginner introduction to the reader, words, optional original audio, vocabulary and dictionary. Learner writes a concrete personal goal in a persistent, validated reflection exercise. Manual reader/audio confirmations are not proofs of listening proficiency.
- **L002 · Aloita saksan ääntämisestä (11 scenes).** Two diagnostic pre-questions, explanations of five spelling/pronunciation patterns (w, z, ei, ie, sch), progressive teaching board, targeted corrections, grammar references and optional human-voice textbook audio. No automatic speech scoring.
- **L003 · Lue Franzin ja Jörgin keskustelu (10 scenes).** Real human-authored source dialogue in the book, guided reading, comprehension and highlighting. Requires actual C01-SOURCE-Q01 and C01-SOURCE-Q02 textbook answers AND their checked states. Opening a link is not evidence.
- **L004 · Tervehdykset muistista (11 scenes).** Introduction, retrieval, explanation, board, guided and unassisted answers, book exercises C01-EX-01/C01-EX-04, spoken self-practice, dialogue and exit check.
- **L005 · Kuuntele ja valitse tervehdys (12 scenes).** Full 20-expression authentic M-COM-03 greeting list (C01 Text B), actual recorded audio or complete transcript fallback, situational teaching board, independent writing, real checked Text B Q01/Q02 and source-dialogue Q03/Q04. A text-only completion is never classified as demonstrated listening competence.

All five use the same deep-linkable LOS Lesson Player, accessible from the 60-lesson study path and relevant book resume action. The reader opens separately with a verified return link; the lesson's local position remains.

## Engine, data and safety

- Deterministic lesson manuscripts, structurally validated scene, question and activity IDs. Teaching text is never generated at runtime.
- Targeted feedback, hints, reteaching, manual confirmations, structured reflection tasks and persistent teaching position.
- Separate attempts, help use, self-report and lesson completion. Completion is not automatically a claim of lasting mastery.
- Versioned, owner-scoped teacherSessions data alongside existing v1 chapter drafts. Existing lessonProgress, answers, notes and reader marks remain intact.
- Backup/import validation updated. Return links accept only recognized lessons.
- Resume recommendations recognize new Teacher completion without manufacturing old checklist evidence.

## Included tests

- Engine tests for response checking, German umlauts and ß, hints, independence and completion gating.
- Content checks for valid answer models, source references, unique IDs and reflection requirements.
- New L001, L002, L003, L005 content/evidence unit tests.
- Browser tests for all 60 lesson entries and the five Teacher pilots, including persistence, book return, L003 source-check evidence and L005 Text B/source checks.

CI successes on earlier commits do not verify the current head. Confirm mobile WebKit and desktop Chromium checks after all changes.

## Not complete

- Expert German-language and pedagogical editing. All scripts remain previews.
- Human-recorded Finnish teaching voice, pronunciation clips and synchronized animation.
- Full skill-level learning evidence and cross-lesson spaced review scheduling.
- Real phone hardware accessibility checks.
- Conversion of the remaining **55 LOS! 1 lessons** and LOS! 2–8.
- Compatibility with V3.4 reader PR #209.
- Production deployment and final publication approval.

## Verification gate

Run full lint, unit tests, TypeScript/typecheck, production build, desktop Chromium and iPhone WebKit browser tests on the exact final head SHA. Keep PR #217 in Draft status until all gates are satisfied. Do not claim all 60 lessons are upgraded.
