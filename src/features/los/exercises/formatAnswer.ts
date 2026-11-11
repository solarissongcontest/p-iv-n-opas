import type { Exercise, ExerciseAnswer } from "../model";

/** Readable historic submissions, no correctness labels inferred from raw answers. */
export function formatExerciseAnswer(exercise: Exercise | undefined, answer: ExerciseAnswer): string {
  if (!exercise || answer === null) return "Ei tallennettua vastausta";
  switch (exercise.type) {
    case "single-choice":
      return exercise.options.find(option => option.id === answer)?.label ?? "Vastausta ei tunnisteta";
    case "true-false":
      return answer === "true" ? "Totta" : answer === "false" ? "Epätotta" : "Vastausta ei tunnisteta";
    case "gap-fill":
      return typeof answer === "string" ? answer : "Vastausta ei tunnisteta";
    case "multiple-choice":
      return Array.isArray(answer) ? answer.map(id => exercise.options.find(option => option.id === id)?.label ?? "?").join(", ") : "Vastausta ei tunnisteta";
    case "word-order":
      return Array.isArray(answer) ? answer.map(id => exercise.tokens.find(token => token.id === id)?.label ?? "?").join(" ") : "Vastausta ei tunnisteta";
    case "matching": {
      if (typeof answer !== "object" || Array.isArray(answer) || !("start" in answer)) {
        if (typeof answer !== "object" || Array.isArray(answer)) return "Vastausta ei tunnisteta";
        return exercise.left.map(item => {
          const right = answer[item.id];
          return item.label + " – " + (exercise.right.find(option => option.id === right)?.label ?? "?");
        }).join("; ");
      }
      return "Vastausta ei tunnisteta";
    }
    case "categorize": {
      if (typeof answer !== "object" || Array.isArray(answer) || "start" in answer) return "Vastausta ei tunnisteta";
      return exercise.items.map(item => {
        const category = answer[item.id];
        return item.label + " – " + (exercise.categories.find(row => row.id === category)?.label ?? "?");
      }).join("; ");
    }
    case "highlight":
      return typeof answer === "object" && !Array.isArray(answer) && "start" in answer &&
        Number.isInteger(answer.start) && Number.isInteger(answer.end)
        ? exercise.text.slice(Math.max(0, answer.start), Math.max(0, answer.end))
        : "Vastausta ei tunnisteta";
  }
}
