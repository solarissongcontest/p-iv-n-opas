/** Ten fixed sections for every LOS! chapter, as required by LOS_BOOK_01_SPEC.
 * Sections are data, not ten separately coded pages.
 */
import type { ChapterSection, ChapterSectionId } from "./model";

export const LOS_CHAPTER_SECTION_TITLES: readonly { id: ChapterSectionId; title: string }[] = [
  { id: "aloita", title: "Orientierung · Aloita" },
  { id: "teksti-a", title: "Text A · Lue ja kuuntele" },
  { id: "ymmarra", title: "Verstehen · Ymmärrä" },
  { id: "sanasto", title: "Wortschatz · Sanasto" },
  { id: "kielioppi", title: "Grammatik · Kielioppi" },
  { id: "teksti-b", title: "Text B · Kuuntele tai katso" },
  { id: "harjoittele", title: "Üben · Harjoittele" },
  { id: "kayta", title: "Anwenden · Käytä saksaa" },
  { id: "kulttuuri", title: "Land und Leute · Kulttuuri" },
  { id: "tarkista", title: "Wiederholen · Kappaletesti" },
];

export function emptyChapterSections(): ChapterSection[] {
  return LOS_CHAPTER_SECTION_TITLES.map(item => ({
    ...item, blockIds: [], exerciseIds: [], publicationStatus: "planned",
  }));
}

export const LOS1_C01_SECTIONS: ChapterSection[] = emptyChapterSections().map(section => {
  const content: Partial<Pick<ChapterSection, "blockIds" | "exerciseIds">> =
    section.id === "aloita" ? { blockIds: ["los1-c01-orientation"] } :
    section.id === "teksti-a" ? { blockIds: [
      "los1-c01-source-intro", "los1-c01-m-com-01-audio",
      "los1-c01-m-com-01-dialogue", "los1-c01-reading-followup",
    ] } :
    section.id === "ymmarra" ? { exerciseIds: [
      "los1-c01-text-a-highlight-greeting", "los1-c01-text-a-choice-goodbye",
      "los1-c01-text-a-gap-goodbye",
    ] } :
    section.id === "sanasto" ? { blockIds: ["los1-c01-core-words"] } :
    section.id === "kielioppi" ? { blockIds: ["los1-c01-phonetics", "los1-c01-greetings"] } :
    section.id === "harjoittele" ? { exerciseIds: [
      "los1-c01-ex-greeting-choice", "los1-c01-ex-greeting-gap",
      "los1-c01-ex-greeting-pairs", "los1-c01-ex-marker-demo",
    ] } : {};
  return {
    ...section, ...content,
    publicationStatus: content.blockIds?.length || content.exerciseIds?.length ? "preview" : "planned",
  };
});
