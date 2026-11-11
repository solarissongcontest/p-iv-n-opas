/** Editorial C02 preview: 10 real routable areas with explicit provenance.
 * Text A is a full LOS!-authored learning dialogue; planned Wikibooks source
 * remains a separate unimported reference and is NOT impersonated.
 * The Commons recording is CC BY-SA 3.0, but device and text QA remain open.
 */
import type { ChapterSection } from "./model";
import { emptyChapterSections } from "./chapterSections.ts";
import { LOS1_C02_EXAM_EXERCISES } from "./los1-c02-test.ts";

export const LOS1_C02_SECTIONS: ChapterSection[] = emptyChapterSections().map(section => {
  const content: Partial<Pick<ChapterSection, "blockIds" | "exerciseIds">> =
    section.id === "aloita" ? {
      blockIds: ["los1-c02-intro"],
      exerciseIds: ["los1-c02-start-name", "los1-c02-start-answer"],
    } :
    section.id === "teksti-a" ? {
      blockIds: [
        "los1-c02-wb-original-intro", "los1-c02-wb-original-audio",
        "los1-c02-wb-original-dialogue", "los1-c02-wb-original-followup",
        "los1-c02-text-a-guide", "los1-c02-text-a-editorial", "los1-c02-source-status",
      ],
    } :
    section.id === "ymmarra" ? {
      exerciseIds: [
        "los1-c02-wb-greta-name", "los1-c02-wb-teacher",
        "los1-c02-wb-farewell", "los1-c02-wb-highlight",
        "los1-c02-read-name", "los1-c02-read-teacher", "los1-c02-read-highlight",
      ],
    } :
    section.id === "sanasto" ? { blockIds: ["los1-c02-words"] } :
    section.id === "kielioppi" ? {
      blockIds: ["los1-c02-grammar-heissen", "los1-c02-grammar-sein", "los1-c02-grammar-mini-table"],
      exerciseIds: ["los1-c02-name-gap", "los1-c02-you-gap",
        "los1-c02-bin-gap", "los1-c02-bist-gap", "los1-c02-verb-choice"],
    } :
    section.id === "teksti-b" ? {
      blockIds: ["los1-c02-text-b-guide", "los1-c02-commons-02-audio", "los1-c02-m-com-02-dialogue", "los1-c02-text-b-support"],
      exerciseIds: ["los1-c02-audio-question", "los1-c02-audio-person", "los1-c02-audio-select"],
    } :
    section.id === "harjoittele" ? { exerciseIds: [
      "los1-c02-order-question", "los1-c02-match-names", "los1-c02-practice-order",
      "los1-c02-practice-category", "los1-c02-name-question",
      "los1-c02-name-gap", "los1-c02-you-gap", "los1-c02-bin-gap", "los1-c02-bist-gap",
    ] } :
    section.id === "kayta" ? { blockIds: ["los1-c02-application-guide", "los1-c02-production"] } :
    section.id === "kulttuuri" ? {
      blockIds: ["los1-c02-culture"], exerciseIds: ["los1-c02-culture-true"],
    } :
    section.id === "tarkista" ? {
      exerciseIds: LOS1_C02_EXAM_EXERCISES.map(item => item.id),
    } : {};
  return { ...section, ...content,
    publicationStatus: content.blockIds?.length || content.exerciseIds?.length ? "preview" : "planned",
  };
});
