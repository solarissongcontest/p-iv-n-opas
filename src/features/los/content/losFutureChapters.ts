import type { LosChapter } from "../catalog";
import { LOS_FUTURE_MANUSCRIPTS } from "./losFutureManuscripts.ts";

/**
 * LOS! 2–8:n kappalerakenne luodaan kanonisista käsikirjoituksista,
 * eikä aikaisemmasta, erillisestä otsikkolista- tai C01-esimerkkiluonnoksesta.
 *
 * Tekstit/sanastot ovat vasta toimituksellisia luonnoksia.
 */
export const LOS_FUTURE_CHAPTERS: Record<number, LosChapter[]> =
  Object.fromEntries(Object.entries(LOS_FUTURE_MANUSCRIPTS).map(([book, chapters]) => [
    Number(book),
    Object.entries(chapters).sort(([a],[b]) => a.localeCompare(b)).map(([id, data]) => ({
      id,
      title: data.title,
      subtitle: data.objective.replace(/\.$/, ""),
      objectives: [data.objective],
      grammar: data.grammarTopic,
      vocabulary: data.vocabulary.map(({ de, fi }) => `${de} – ${fi}`),
    })),
  ]));
