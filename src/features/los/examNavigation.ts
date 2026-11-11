/**
 * Accessible exam navigation is presentation-only.
 *
 * Score groups refer to ORIGINAL form A question IDs. A retake selects
 * independently authored form B items in the same canonical slots, so
 * navigation MUST use original slot indices rather than looking for the
 * form-A IDs among the retake exercises.
 *
 * Each visible item is checked only for whether an answer is syntactically
 * present. We never expose correctness or solutions before submission.
 * If groups overlap, omit slots, or cannot be mapped, return [] and show
 * the original non-paginated form rather than hiding questions.
 */
import type { Exercise, ExerciseAnswer } from "./model";
import type { ChapterTestDefinition } from "./chapterTest";
import { evaluateExercise } from "./exercises/evaluate.ts";

export type ExamNavigationGroup = {
  id: string;
  titleFi: string;
  slots: number[];
  answered: number;
  total: number;
};

export function buildExamNavigationGroups(
  definition: ChapterTestDefinition,
  selectedExercises: readonly Exercise[],
  answers: Readonly<Record<string, ExerciseAnswer>>,
): ExamNavigationGroup[] {
  if (!definition.scoreGroups?.length ||
      selectedExercises.length !== definition.exerciseIds.length) return [];

  const slotsByOriginalId = new Map(definition.exerciseIds.map((id, index) => [id, index]));
  const allUsed = new Set<number>();
  const groups: ExamNavigationGroup[] = [];

  for (const group of definition.scoreGroups) {
    const slots: number[] = [];
    for (const originalId of group.exerciseIds) {
      const slot = slotsByOriginalId.get(originalId);
      if (slot === undefined || allUsed.has(slot) || !selectedExercises[slot]) return [];
      allUsed.add(slot);
      slots.push(slot);
    }
    if (!slots.length) return [];
    groups.push({
      id: group.id,
      titleFi: group.titleFi,
      slots,
      total: slots.length,
      answered: slots.filter(slot => {
        const exercise = selectedExercises[slot]!;
        return evaluateExercise(exercise, answers[exercise.id] ?? null) !== null;
      }).length,
    });
  }
  if (allUsed.size !== selectedExercises.length) return [];
  return groups;
}
