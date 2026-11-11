/** C03 route source of truth; every tab has real preview material. */
import type { ChapterSection } from "./model";
import { emptyChapterSections } from "./chapterSections.ts";
import { LOS1_C03_EXAM_EXERCISES } from "./los1-c03-test.ts";

export const LOS1_C03_SECTIONS: ChapterSection[] = emptyChapterSections().map(section => {
  const content: Partial<Pick<ChapterSection, "blockIds" | "exerciseIds">> =
    section.id === "aloita" ? {
      blockIds: ["los1-c03-orientation", "los1-c03-first-phrase"],
      exerciseIds: ["los1-c03-first-question", "los1-c03-first-answer", "los1-c03-first-country"],
    } :
    section.id === "teksti-a" ? { blockIds: [
      "los1-c03-berna-intro", "los1-c03-berna-dialogue", "los1-c03-berna-followup",
    ] } :
    section.id === "ymmarra" ? { exerciseIds: [
      "los1-c03-berna-who", "los1-c03-berna-country", "los1-c03-berna-city",
      "los1-c03-berna-highlight-question", "los1-c03-berna-highlight-country",
      "los1-c03-berna-highlight-city",
    ] } :
    section.id === "sanasto" ? {
      blockIds: ["los1-c03-core-vocabulary", "los1-c03-country-table"],
    } :
    section.id === "kielioppi" ? {
      blockIds: ["los1-c03-grammar-kommen", "los1-c03-grammar-aus", "los1-c03-grammar-wo"],
      exerciseIds: ["los1-c03-grammar-ich", "los1-c03-grammar-du", "los1-c03-grammar-question",
        "los1-c03-grammar-aus", "los1-c03-grammar-wo", "los1-c03-grammar-er",
        "los1-c03-first-switzerland"],
    } :
    section.id === "teksti-b" ? {
      blockIds: ["los1-c03-text-b-guide", "los1-c03-m-com-02-audio",
        "los1-c03-m-com-02-dialogue", "los1-c03-text-b-followup"],
      exerciseIds: ["los1-c03-audio-berlin", "los1-c03-audio-kyoto", "los1-c03-audio-both"],
    } :
    section.id === "harjoittele" ? {
      blockIds: ["los1-c03-country-schematic"],
      exerciseIds: [
        "los1-c03-geography-south", "los1-c03-geography-west",
        "los1-c03-geography-south-finland", "los1-c03-geography-between",
        "los1-c03-profile-berna", "los1-c03-profile-anna", "los1-c03-profile-max",
        "los1-c03-profile-lea", "los1-c03-profile-tom",
        "los1-c03-practice-order", "los1-c03-practice-categorize",
        "los1-c03-practice-matching",
      ],
    } :
    section.id === "kayta" ? {
      blockIds: ["los1-c03-apply-guide", "los1-c03-production"],
    } :
    section.id === "kulttuuri" ? {
      blockIds: ["los1-c03-culture-intro", "los1-c03-culture-countries", "los1-c03-culture-note"],
      exerciseIds: ["los1-c03-culture-multilang", "los1-c03-culture-capital",
        "los1-c03-culture-country-city"],
    } :
    section.id === "tarkista" ? {
      exerciseIds: LOS1_C03_EXAM_EXERCISES.map(item => item.id),
    } : {};
  return { ...section, ...content,
    publicationStatus: content.blockIds?.length || content.exerciseIds?.length ? "preview" : "planned",
  };
});
