# LOS Teacher Experience 2.0: implementation status

Date: 2026-11-12. This file records **what is in code**, not a release certificate.

## Authority
The attached LOS Teacher Experience 2.0 masterplan (2026-11-12) governs the learning design, alongside the existing LOS series and V3.3 visual masterplans. No AI models, generative services, machine learning or AI speech services belong in the lesson runtime.

## Scope of this pilot
- Dedicated deep link \`/los-lessons/L004\`. Study path L004's chapter list entry opens it.
- Eleven human-authored teaching scenes: introduction, recall, explanation, incremental board, guided practice, book references, unassisted short answer, spoken self-practice, dialogue, exit check and summary.
- Deterministic feedback for exact choice and short-answer tasks. Normalization preserves German umlauts and ß. Retries, hints and viewed solutions never turn into unassisted successes.
- Book C01 vocabulary and practice open via actual LOS book hash links in another tab, with a safe return link. Their source of truth remains the existing chapter draft.
- Student state is an **optional** \`teacherSessions\` field within existing version 1 chapter drafts, with validation; old \`lessonProgress\` and backup keys are unchanged.
- Finishing L004 requires all scenes visited, every required question attempted, explicit self-confirmations and saved book task responses for C01-EX-01 and C01-EX-04. Legacy L004 completion is only recorded after its own evidence check also succeeds. Completing or opening a scene is not proof of language mastery.
- Mobile-first responsive teaching layout; no required audio, no automatic pronunciation scoring.

## Not yet done
- The other 59 LOS! 1 teaching scripts and all LOS! 2-8 content.
- Human-recorded Finnish teaching narration, pronunciation playback and audio sync.
- Independent skill-level evidence analysis and full spaced review scheduling (existing book review features are retained).
- Expert proofreading of L004's Finnish teaching prose and German examples. It is a **preview**, not a published language-reviewed lesson.
- Production deployment, verified iPhone hardware accessibility and full publication approval.
- The separately drafted LOS reader V3.4 PR #209 compatibility/merge review. PR #217 is additive but should be retested on the final integrated head.

## Verification commands
- \`bun run test\` (includes \`tests/los-teacher-engine.test.ts\`).
- \`bun run build\` (includes TypeScript).
- \`bun run lint\`.
- \`bunx playwright test e2e/los-full-book.spec.ts --project=desktop-chromium --project=iphone-webkit\`.
- Confirm all relevant CI runs are passing on the **same head SHA**, not merely on an earlier commit.
- Real-device tests and expert linguistic review remain manual gates.

## Next safe steps
1. Resolve CI and browser regressions without weakening legacy L001-L060 tests.
2. Review L004 on actual mobile and desktop devices.
3. Generalize lesson player primitives, then script another representative grammar lesson (L009, C02: heißen/sein).
4. Add skills-and-review evidence per masterplan without conflating lesson completion with mastery.
5. Integrate with PR #209 after verifying actual merged code, not by force-push or rewriting shared branch history.

Do not call this pilot the complete Teacher Experience 2.0 or advertise all 60 lessons as converted.
