import type { Book, BookId, ModuleCode } from "./model";
import { LOS1_PLANNED_CHAPTERS, LOS1_PLANNED_LESSONS } from "./los1-planned.ts";
import { LOS1_C01_PREVIEW_BLOCKS, LOS1_C01_PREVIEW_EXERCISES } from "./los1-c01-preview.ts";
import { LOS1_RESEARCH_SOURCES } from "./los1-sources.ts";
import { LOS1_C01_SOURCE_BLOCKS, LOS1_C01_SOURCE_EXERCISES } from "./los1-c01-source.ts";
import { LOS1_INTRO_BLOCKS } from "./los1-onboarding.ts";
import { LOS1_C01_SECTIONS, emptyChapterSections } from "./chapterSections.ts";
import { LOS1_C01_GREETING_AUDIO_BLOCKS, LOS1_C01_AUDIO_COMPREHENSION_EXERCISES } from "./los1-c01-audio-list.ts";

const specs: readonly [string, string, string, string, string, string][] = [
  ["Perustason alkeet 1", "Tutustu ja ihastu saksan kieleen", "Nollataso, tervehdykset, esittäytyminen ja ensimmäinen vuorovaikutus.", "#B7473C", "#FCE8E5", "#FF9B91"],
  ["Perustason alkeet 2", "Saksaa arjessa", "Lähipiiri, arki, kohtaamiset ja asiointi.", "#2D766F", "#E2F3EE", "#8EE1D1"],
  ["Perustason alkeet 3", "Saksaa vapaa-aikana ja lomalla", "Vapaa-aika, koulu, matkailu ja harrastukset.", "#2A609D", "#E7F2FC", "#A2CDFF"],
  ["Perustaso 1", "Elämää Saksassa ja Suomessa", "Saksankielinen maailma, tavat ja kulttuurivertailu.", "#765291", "#F2EAF9", "#D5B4ED"],
  ["Perustaso 2", "Hyvinvointia ja elämää nyt ja tulevaisuudessa", "Hyvinvointi, terveys ja elämäntilanteet.", "#876010", "#FFF2D3", "#F1CD82"],
  ["Perustaso 3", "Kulttuuria saksaksi", "Kulttuuri, taide ja media.", "#367149", "#E7F3E9", "#9CD4AC"],
  ["Perustaso 4", "Opiskelua ja työelämää saksaksi", "Opiskelu, työ ja tulevaisuus.", "#A33B65", "#FBE9F0", "#F8A6C5"],
  ["Perustaso 5", "Muuttuva maailma saksaksi", "Ajankohtaiset aiheet, yhteiskunta ja monipuoliset tekstit.", "#28647E", "#E3F2F8", "#A2D5EC"],
];

/** Assets are deliberately null until real user-approved files are supplied. */
export const LOS_BOOKS: readonly Book[] = specs.map((spec, index) => ({
  id: ("los-" + (index + 1)) as BookId,
  number: index + 1,
  moduleCode: ("SAB3" + (index + 1)) as ModuleCode,
  moduleTitle: spec[0],
  title: spec[1],
  description: spec[2],
  credits: 2,
  accent: spec[3],
  tint: spec[4],
  accentDark: spec[5],
  contentVersion: "1.0.0",
  coverAsset: null,
  bannerAsset: null,
  chapters: index === 0 ? LOS1_PLANNED_CHAPTERS.map(chapter => chapter.id === "C01" ? {
    ...chapter, publicationStatus: "preview" as const,
    sections: LOS1_C01_SECTIONS,
    blockIds: [
      LOS1_C01_PREVIEW_BLOCKS[0]!.id,
      ...LOS1_C01_SOURCE_BLOCKS.map(block => block.id),
      ...LOS1_C01_GREETING_AUDIO_BLOCKS.map(block => block.id),
      ...LOS1_C01_PREVIEW_BLOCKS.slice(1).map(block => block.id),
    ],
    exerciseIds: [
      ...LOS1_C01_SOURCE_EXERCISES.map(exercise => exercise.id),
      ...LOS1_C01_AUDIO_COMPREHENSION_EXERCISES.map(exercise => exercise.id),
      ...LOS1_C01_PREVIEW_EXERCISES.map(exercise => exercise.id),
    ],
  } : { ...chapter, sections: emptyChapterSections() }) : [],
  lessons: index === 0 ? LOS1_PLANNED_LESSONS.map(lesson => {
    if (lesson.id === "L001") return {
      ...lesson, publicationStatus: "preview" as const,
      steps: [
        { id: "L001-S01", title: "Tervetuloa opiskelemaan saksaa", required: true, blockId: "los1-l001-welcome" },
        { id: "L001-S02", title: "Näin lukija toimii", required: true, blockId: "los1-l001-reader-guide" },
        { id: "L001-S03", title: "Kokeile oikean dialogin lukemista", required: true, blockId: "los1-c01-m-com-01-dialogue" },
        { id: "L001-S04", title: "Kokeile äänen kuuntelua", required: true, blockId: "los1-c01-m-com-01-audio" },
        { id: "L001-S05", title: "Ymmärrä tallennuksen tila", required: true, blockId: "los1-l001-storage-guide" },
        { id: "L001-S06", title: "Kirjoita oma oppimistavoitteesi", required: true,
          reflectionPromptFi: "Mitä haluaisit osata saksaksi LOS! 1:n lopussa? Kirjoita yksi oma tavoitteesi suomeksi." },
      ],
    };
    if (lesson.id === "L002") return {
      ...lesson, publicationStatus: "preview" as const,
      steps: [
        { id: "L002-S01", title: "Mistä aloitat?", required: true, blockId: "los1-c01-orientation" },
        { id: "L002-S02", title: "Ensimmäiset saksan äänteet", required: true, blockId: "los1-c01-phonetics" },
        { id: "L002-S03", title: "Kuuntele aitoa puhetta", required: true, blockId: "los1-c01-m-com-01-audio" },
        { id: "L002-S04", title: "Tervehdykset käyttötilanteissa", required: true, blockId: "los1-c01-greetings" },
        { id: "L002-S05", title: "Tunnista aamun tervehdys", required: true, exerciseId: "los1-c01-ex-greeting-choice" },
        { id: "L002-S06", title: "Yhdistä tutut tervehdykset", required: true, exerciseId: "los1-c01-ex-greeting-pairs" },
      ],
    };
    if (lesson.id === "L003") return {
      ...lesson, publicationStatus: "preview" as const,
      steps: [
        { id: "L003-S01", title: "Tutustu alkuperäiseen dialogiin", required: true, blockId: "los1-c01-source-intro" },
        { id: "L003-S02", title: "Kuuntele keskustelu", required: true, blockId: "los1-c01-m-com-01-audio" },
        { id: "L003-S03", title: "Lue koko kahdeksan repliikin dialogi", required: true, blockId: "los1-c01-m-com-01-dialogue" },
        { id: "L003-S04", title: "Korosta Franzin tervehdys", required: true, exerciseId: "los1-c01-text-a-highlight-greeting" },
        { id: "L003-S05", title: "Tunnista hyvästely", required: true, exerciseId: "los1-c01-text-a-choice-goodbye" },
        { id: "L003-S06", title: "Täydennä hyvästely", required: true, exerciseId: "los1-c01-text-a-gap-goodbye" },
        { id: "L003-S07", title: "Kertaa uusi teksti", required: true, blockId: "los1-c01-reading-followup" },
      ],
    };
    if (lesson.id === "L004") return {
      ...lesson, publicationStatus: "preview" as const,
      steps: [
        { id: "L004-S01", title: "Palauta mieleen tervehdykset", required: true, blockId: "los1-c01-greetings" },
        { id: "L004-S02", title: "Tutustu tämän kappaleen ydinsanastoon", required: true, blockId: "los1-c01-core-words" },
        { id: "L004-S03", title: "Täydennä tervehdys muistista", required: true, exerciseId: "los1-c01-ex-greeting-gap" },
        { id: "L004-S04", title: "Yhdistä fraasit ilman mallia", required: true, exerciseId: "los1-c01-ex-greeting-pairs" },
        { id: "L004-S05", title: "Korosta tilanteeseen sopiva ilmaus", required: true, exerciseId: "los1-c01-ex-marker-demo" },
      ],
    };
    if (lesson.id === "L005") return {
      ...lesson, publicationStatus: "preview" as const,
      steps: [
        { id: "L005-S01", title: "Kuuntele luettelon tavoite", required: true, blockId: "los1-c01-text-b-guide" },
        { id: "L005-S02", title: "Kuuntele 28 sekunnin alkuperäisäänite", required: true, blockId: "los1-c01-m-com-03-audio" },
        { id: "L005-S03", title: "Lue koko alkuperäinen ilmausluettelo", required: true, blockId: "los1-c01-m-com-03-transcript" },
        { id: "L005-S04", title: "Tunnista aamun tervehdys", required: true, exerciseId: "los1-c01-audio-list-morning" },
        { id: "L005-S05", title: "Tunnista hyvästely", required: true, exerciseId: "los1-c01-audio-list-parting" },
        { id: "L005-S06", title: "Kertaa kuulemasi", required: true, blockId: "los1-c01-text-b-reflection" },
      ],
    };
    return lesson;
  }) : [],
  blocks: index === 0 ? [...LOS1_INTRO_BLOCKS, ...LOS1_C01_PREVIEW_BLOCKS, ...LOS1_C01_SOURCE_BLOCKS, ...LOS1_C01_GREETING_AUDIO_BLOCKS] : [],
  exercises: index === 0 ? [...LOS1_C01_PREVIEW_EXERCISES, ...LOS1_C01_SOURCE_EXERCISES, ...LOS1_C01_AUDIO_COMPREHENSION_EXERCISES] : [],
  sources: index === 0 ? LOS1_RESEARCH_SOURCES.map(source => source.id === "M-COM-01" ? {
    ...source,
    author: "Xzapro4 ja Erkan Yilmaz",
    licenseOrBasis: "CC BY-SA 3.0 Unported · teksti ja ääni",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    permittedMode: "embed" as const,
    modification: "Saksankielinen transkriptio alkuperäisenä. Suomenkieliset opetusselitykset ja repliikkikohtaiset käännökset ovat lisäyksiä.",
    publicationNoteFi: "Koko alkuperäisteksti on lukijassa. Alkuperäisäänite toistetaan Wikimedian palvelimelta; mobiilitoistoa ei ole vielä varmennettu.",
  } : source.id === "M-COM-03" ? {
    ...source,
    author: "German Men92 (English Wikibooks); Commons-version äänenvoimakkuutta nostanut Recent Runes",
    licenseOrBasis: "Public domain - tekijän oma vapaa luovutus",
    permittedMode: "embed" as const,
    modification: "Koko alkukielinen ilmausluettelo lähdejärjestyksessä. Suomenkieliset käännökset ja alueelliset huomautukset lisätty; lähdeäänitettä ei ole muokattu LOS!:ssa.",
    publicationNoteFi: "28 sekunnin alkuperäinen ilmauksiin perustuva äänite; ei dialogi. Äänite toistetaan Wikimedian omalta palvelimelta. Mobiilitoisto vielä vahvistamatta.",
  } : source) : [],
}));

export const LOS_BASE_PATH = "/oppikirjasto/saksa-b3";
export const findLosBook = (id: string) => LOS_BOOKS.find(book => book.id === id);
export const bookPath = (book: Book, section?: string) =>
  LOS_BASE_PATH + "/" + book.id + (section ? "/" + section : "");
