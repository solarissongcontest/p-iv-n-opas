# LOS Teacher Experience 2.0: implementation status

**Date:** 2026-11-13. Source-code inventory, not a release certificate.

## Authority

The LOS Teacher Experience 2.0 masterplan (2026-11-12), LOS! series masterplan, LOS! 1 book-specific masterplan and approved visual V3.3 plan govern this implementation. There are no AI models, generative runtime APIs, machine learning, synthetic speech services or automatic pronunciation scoring.

## Implemented teaching pilot: L001–L012

- **L001 · Miten LOS! 1:llä opiskellaan? (10 scenes).** Zero-beginner introduction to the reader, words, optional original audio, vocabulary and dictionary. Learner writes a concrete personal goal in a persistent, validated reflection exercise. Manual reader/audio confirmations are not proofs of listening proficiency.
- **L002 · Aloita saksan ääntämisestä (11 scenes).** Two diagnostic pre-questions, explanations of five spelling/pronunciation patterns (w, z, ei, ie, sch), progressive teaching board, targeted corrections, grammar references and optional human-voice textbook audio. No automatic speech scoring.
- **L003 · Lue Franzin ja Jörgin keskustelu (10 scenes).** Real human-authored source dialogue in the book, guided reading, comprehension and highlighting. Requires actual C01-SOURCE-Q01 and C01-SOURCE-Q02 textbook answers AND their checked states. Opening a link is not evidence.
- **L004 · Tervehdykset muistista (11 scenes).** Introduction, retrieval, explanation, board, guided and unassisted answers, book exercises C01-EX-01/C01-EX-04, spoken self-practice, dialogue and exit check.
- **L005 · Kuuntele ja valitse tervehdys (12 scenes).** Full 20-expression authentic M-COM-03 greeting list (C01 Text B), actual recorded audio or complete transcript fallback, situational teaching board, independent writing, real checked Text B Q01/Q02 and source-dialogue Q03/Q04. A text-only completion is never classified as demonstrated listening competence.
- **L006 · Harjoittele ja testaa C01 (13 scenes).** New self-authored encounter in the real book application field, original C01 culture references, staged greeting instruction, a genuinely submitted C01 chapter test and post-test self-assessment. All three real chapter fields are required; merely visiting the book, saving an unsubmitted test draft or clicking a fake teacher confirmation cannot finish the lesson.
- **L007 · Miten kysyn nimen? (14 scenes; C02 1/5).** Beginner-friendly explicit teaching of Wie heißt du?, ich heiße and ich bin; C02 vocabulary, grammar and exact authentic six-turn Franz–Greta Text A; requires C02-SOURCE-Q01 answered and checked, not an invented click proof. Optional independent speech practice and completely optional M-COM-02 audio with full text fallback. Chapter-keyed Teacher player keeps all C01 and C02 attempts, drafts and completions apart.
- **L008 · Franz ja Greta: kokonainen dialogi (14 scenes; C02 2/5).** Complete six-turn authentic Text A; explicit teaching to distinguish name, well-being and teacher references plus both separate goodbyes; requires real saved **and checked** C02-SOURCE-Q02/Q03/Q04, alongside all scene visits and three learner actions. Reading is distinct from any claim of audio comprehension. Reuses the C02 draft, all source text remains fully inside the book.
- **L009 · Heißen ja sein minä–sinä (15 scenes; C02 3/5).** Zero-beginner explicit teaching of exactly ich heiße/du heißt and ich bin/du bist, specific correction of *du heißst*, progressive board, independent text and exit check, C02 grammar and four genuine workbook fill tasks C02-EX-03–06. Learner must enter all four **real C02 book answers**, read explanations and confirm own practice. Workbook input presence is not correctness or speech mastery.
- **L010 · Kuuntele ja esittele henkilö (15 scenes; C02 4/5).** Whole human-recorded, four-turn original Commons M-COM-02 conversation is fully present in C02 Text B; audio optional with complete in-app transcript. Requires two **answered and checked** original Text B tasks C02-MCOM02-Q01/Q02, source comparison and meaning recall; teaches Thomas/Takashi/Peter, Berlin/Kyoto and Ich heiße / Ich bin / Das ist. Optional listening never becomes an invented listening-comprehension score.
- **L011 · Harjoittele ja testaa C02 (15 scenes; C02 5/5).** Structured review of personal introductions, name questions, heiße/heißt and bin/bist, grounded in C02 Text A and B. Requires the real C02 applicationDraft with fictional Mia/Max names, actual submitted C02 chapter test (testSubmittedAt) and post-test selfAssessment, plus independent writing and end check. Unsubmitted drafts cannot finish; saved prose is not automatically scored for language accuracy.
- **L012 · Maat ja paikat (14 scenes; C03 1/5).** Teaches Deutschland, Finnland, Österreich, die Schweiz and distinguishes Bern/other cities from countries and Lisa Müller’s German origin from Swiss residence. Two prechecks, guided board, source-grounded application and first-try independent recall; requires genuine study confirmations on C03 vocabulary, DACH culture and *all eight* M-WB-07 Text A turns. No audio is claimed for Lisa; C03’s original M-WB-07 replacement source avoids personal-number issues in earlier unapproved Berna material.

All twelve use the same deep-linkable LOS Lesson Player, accessible from the 60-lesson study path and relevant book resume action. The reader opens separately with a verified return link; the lesson's local position remains.

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
- New L001, L002, L003, L005, L006, L007, L008, L009, L010, L011 and L012 content/evidence unit tests.
- Browser tests for all 60 lesson entries and the twelve Teacher pilots, including persistence, book return, L003 source-check evidence, L005 Text B/source checks, L006 original chapter-test submission, L007 real C02 checks plus C01/C02 state isolation, L008 six original Text A replies / three checked C02 source questions, and L009 four canonical C02 workbook fields / real completion gates, plus L010 complete Commons Text B, optional audio and two actual checked C02-MCOM02 source tasks, and L011 real C02 writing, unsent test draft refusal, submitted exam and post-test self-assessment. New L012 coverage validates M-WB-07 original text, source confirmations and C02/C03 storage separation.

CI successes on earlier commits do not verify the current head. Confirm mobile WebKit and desktop Chromium checks after all changes.

## Not complete

- Expert German-language and pedagogical editing. All scripts remain previews.
- Human-recorded Finnish teaching voice, pronunciation clips and synchronized animation.
- Full skill-level learning evidence and cross-lesson spaced review scheduling.
- Real phone hardware accessibility checks.
- Conversion of the remaining **48 LOS! 1 lessons** and LOS! 2–8.
- Compatibility with V3.4 reader PR #209.
- Production deployment and final publication approval.

## Verification gate

Run full lint, unit tests, TypeScript/typecheck, production build, desktop Chromium and iPhone WebKit browser tests on the exact final head SHA. Keep PR #217 in Draft status until all gates are satisfied. Do not claim all 60 lessons are upgraded.
