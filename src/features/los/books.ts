import type { Book, BookId, ModuleCode } from "./model";
import { LOS1_PLANNED_CHAPTERS, LOS1_PLANNED_LESSONS } from "./los1-planned.ts";
import { LOS1_C01_PREVIEW_BLOCKS, LOS1_C01_PREVIEW_EXERCISES } from "./los1-c01-preview.ts";
import { LOS1_RESEARCH_SOURCES } from "./los1-sources.ts";
import { LOS1_C01_SOURCE_BLOCKS, LOS1_C01_SOURCE_EXERCISES } from "./los1-c01-source.ts";
import { LOS1_INTRO_BLOCKS } from "./los1-onboarding.ts";
import { LOS1_C01_SECTIONS, emptyChapterSections } from "./chapterSections.ts";
import { LOS1_C01_GREETING_AUDIO_BLOCKS, LOS1_C01_AUDIO_COMPREHENSION_EXERCISES } from "./los1-c01-audio-list.ts";
import { LOS1_C01_EXAM_EXERCISES, LOS1_C01_TEST } from "./los1-c01-chapter-test.ts";
import { LOS1_C01_ALTERNATE_EXAM_EXERCISES } from "./los1-c01-exam-alternates.ts";
import { LOS1_C01_APPLICATION_BLOCKS, LOS1_C01_CULTURE_BLOCKS, LOS1_C01_EXTRA_EXERCISES } from "./los1-c01-activities.ts";
import { LOS1_C01_INTERACTIVE_EXERCISES } from "./los1-c01-interactive.ts";
import { LOS1_C02_BLOCKS, LOS1_C02_EXERCISES } from "./los1-c02-content.ts";
import { LOS1_C02_EXAM_EXERCISES, LOS1_C02_TEST } from "./los1-c02-test.ts";
import { LOS1_C02_SECTIONS } from "./los1-c02-sections.ts";

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
      ...LOS1_C01_APPLICATION_BLOCKS.map(block => block.id),
      ...LOS1_C01_CULTURE_BLOCKS.map(block => block.id),
      ...LOS1_C01_PREVIEW_BLOCKS.slice(1).map(block => block.id),
    ],
    exerciseIds: [
      ...LOS1_C01_SOURCE_EXERCISES.map(exercise => exercise.id),
      ...LOS1_C01_AUDIO_COMPREHENSION_EXERCISES.map(exercise => exercise.id),
      ...LOS1_C01_PREVIEW_EXERCISES.map(exercise => exercise.id),
      ...LOS1_C01_EXAM_EXERCISES.map(exercise => exercise.id),
      ...LOS1_C01_ALTERNATE_EXAM_EXERCISES.map(exercise => exercise.id),
      ...LOS1_C01_EXTRA_EXERCISES.map(exercise => exercise.id),
      ...LOS1_C01_INTERACTIVE_EXERCISES.map(exercise => exercise.id),
    ],
  } : chapter.id === "C02" ? {
    ...chapter,
    publicationStatus: "preview" as const,
    sections: LOS1_C02_SECTIONS,
    blockIds: LOS1_C02_BLOCKS.map(block => block.id),
    exerciseIds: [...LOS1_C02_EXERCISES, ...LOS1_C02_EXAM_EXERCISES].map(item => item.id),
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
        { id: "L004-S06", title: "Järjestä hyvästely oikein", required: true, exerciseId: "los1-c01-order-bis-spaeter" },
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
    if (lesson.id === "L006") return {
      ...lesson, publicationStatus: "preview" as const,
      steps: [
        { id: "L006-S01", title: "Kertaa C01:n tervehdykset", required: true, blockId: "los1-c01-greetings" },
        { id: "L006-S02", title: "Lue alkuperäisen dialogin hyvästely", required: true, blockId: "los1-c01-m-com-01-dialogue" },
        { id: "L006-S03", title: "Tee 12 kohdan kappaletesti ja puheen itsearviointi", required: true, chapterTestId: LOS1_C01_TEST.id },
      ],
    };
    if (lesson.id === "L007") return {
      ...lesson, publicationStatus: "preview" as const,
      steps: [
        { id: "L007-S01", title: "Miten nimi kysytään?", required: true, blockId: "los1-c02-intro" },
        { id: "L007-S02", title: "Nimikysymys", required: true, blockId: "los1-c02-grammar-heissen" },
        { id: "L007-S03", title: "Tunnista nimikysymys", required: true, exerciseId: "los1-c02-start-name" },
        { id: "L007-S04", title: "Valitse sopiva vastaus", required: true, exerciseId: "los1-c02-start-answer" },
      ],
    };
    if (lesson.id === "L008") return {
      ...lesson, title: "Lue Lenan ja Benin opetuskeskustelu", publicationStatus: "preview" as const,
      steps: [
        { id: "L008-S01", title: "Valmistaudu lukemaan LOS!:n oma dialogi", required: true, blockId: "los1-c02-text-a-guide" },
        { id: "L008-S02", title: "Lue Lenan ja Benin kokonainen keskustelu", required: true, blockId: "los1-c02-text-a-editorial" },
        { id: "L008-S03", title: "Tunnista keskustelun toinen henkilö", required: true, exerciseId: "los1-c02-read-name" },
        { id: "L008-S04", title: "Tunnista Frau Weiß", required: true, exerciseId: "los1-c02-read-teacher" },
        { id: "L008-S05", title: "Etsi nimikysymys keskustelusta", required: true, exerciseId: "los1-c02-read-highlight" },
        { id: "L008-S06", title: "Ymmärrä tekstin lähdestatus", required: true, blockId: "los1-c02-source-status" },
      ],
    };
    if (lesson.id === "L009") return {
      ...lesson, publicationStatus: "preview" as const,
      steps: [
        { id: "L009-S01", title: "Ich heiße ja du heißt", required: true, blockId: "los1-c02-grammar-heissen" },
        { id: "L009-S02", title: "Ich bin ja du bist", required: true, blockId: "los1-c02-grammar-sein" },
        { id: "L009-S03", title: "Tarkastele muotojen taulukkoa", required: true, blockId: "los1-c02-grammar-mini-table" },
        { id: "L009-S04", title: "Täydennä heiße", required: true, exerciseId: "los1-c02-name-gap" },
        { id: "L009-S05", title: "Täydennä heißt", required: true, exerciseId: "los1-c02-you-gap" },
        { id: "L009-S06", title: "Täydennä bin", required: true, exerciseId: "los1-c02-bin-gap" },
        { id: "L009-S07", title: "Täydennä bist", required: true, exerciseId: "los1-c02-bist-gap" },
      ],
    };
    if (lesson.id === "L010") return {
      ...lesson, publicationStatus: "preview" as const,
      steps: [
        { id: "L010-S01", title: "Tunnista äänitteen tavoite", required: true, blockId: "los1-c02-text-b-guide" },
        { id: "L010-S02", title: "Kuuntele Thomasin ja Takashin alkuperäinen keskustelu", required: true, blockId: "los1-c02-commons-02-audio" },
        { id: "L010-S03", title: "Poimi nimikysymys", required: true, exerciseId: "los1-c02-audio-question" },
        { id: "L010-S04", title: "Poimi nimet", required: true, exerciseId: "los1-c02-audio-person" },
        { id: "L010-S05", title: "Valitse kaikki äänitteen henkilöt", required: true, exerciseId: "los1-c02-audio-select" },
        { id: "L010-S06", title: "Kertaa äänitteen keskeiset ilmaukset", required: true, blockId: "los1-c02-text-b-support" },
      ],
    };
    if (lesson.id === "L011") return {
      ...lesson, publicationStatus: "preview" as const,
      steps: [
        { id: "L011-S01", title: "Lue C02:n nimisanasto", required: true, blockId: "los1-c02-words" },
        { id: "L011-S02", title: "Kirjoita ensin oma esittely", required: true, blockId: "los1-c02-production" },
        { id: "L011-S03", title: "Palauta 15 kysymyksen testi ja kirjallinen itsearviointi", required: true,
          chapterTestId: LOS1_C02_TEST.id },
      ],
    };
    return lesson;
  }) : [],
  blocks: index === 0 ? [...LOS1_INTRO_BLOCKS, ...LOS1_C01_PREVIEW_BLOCKS, ...LOS1_C01_SOURCE_BLOCKS, ...LOS1_C01_GREETING_AUDIO_BLOCKS, ...LOS1_C01_APPLICATION_BLOCKS, ...LOS1_C01_CULTURE_BLOCKS, ...LOS1_C02_BLOCKS] : [],
  exercises: index === 0 ? [...LOS1_C01_PREVIEW_EXERCISES, ...LOS1_C01_SOURCE_EXERCISES, ...LOS1_C01_AUDIO_COMPREHENSION_EXERCISES, ...LOS1_C01_EXAM_EXERCISES, ...LOS1_C01_ALTERNATE_EXAM_EXERCISES, ...LOS1_C01_EXTRA_EXERCISES, ...LOS1_C01_INTERACTIVE_EXERCISES, ...LOS1_C02_EXERCISES, ...LOS1_C02_EXAM_EXERCISES] : [],
  chapterTests: index === 0 ? [LOS1_C01_TEST, LOS1_C02_TEST] : [],
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
  } : source.id === "M-COM-02" ? {
    ...source,
    author: "Ariser",
    permittedMode: "embed" as const,
    licenseOrBasis: "CC BY-SA 3.0 Unported · alkuperäinen äänite",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    verifiedAt: "2026-11-11",
    modification: "Äänitettä ei ole muokattu LOS!:ssa; suomenkielinen opastus ja harjoitustehtävät ovat uusia.",
    publicationNoteFi: "Tiedostokohtainen lisenssi varmistettu Commonsin tiedostosivulta. 12 sekunnin puhe toistetaan ulkoisesta lähteestä; soitto selaimessa vielä testaamatta.",
  } : source).concat([{
    id: "LOS-EDITORIAL-C02",
    title: "LOS! 1 C02 · Lenan ja Benin opetuskeskustelu",
    author: "LOS!:n oma toimitettu opetussisältö",
    publisher: "LOS! - oppikirjaprojekti",
    licenseOrBasis: "Itsenäisesti laadittu LOS!-opetusesimerkki; ei lainattu Wikibooks-dialogi",
    permittedMode: "hosted" as const,
    verifiedAt: "2026-11-11",
    modification: "Kokonaan toimituksessa luotu alkeisdialogi, suomenkieliset käännökset ja harjoitukset.",
    publicationNoteFi: "Julkaistu esikatseluun omana opetustekstinä. Suunnitellun Wikibooks-lähteen M-WB-01 täysi tuonti on vielä kesken.",
  },{
    id: "GOETHE-REGIONAL-GREETINGS-01",
    title: "Servus und Salam · Goethe-Institut, #DeutschlandNoFilter",
    author: "Hasnain Kazim",
    publisher: "Goethe-Institut",
    originalUrl: "https://www.goethe.de/prj/ger/en/kre/spk/22878868.html",
    licenseOrBasis: "Faktalähde omalle suomenkieliselle kulttuurisivulle; suojattua alkuperäistekstiä ei kopioitu",
    permittedMode: "pending" as const,
    readiness: "research" as const,
    verifiedAt: "2026-11-11",
    publicationNoteFi: "Alueelliset tervehdyskäytännöt tarkistettu; LOS!:n sisältö on oma suomenkielinen selitys.",
  }]) : [],
}));

export const LOS_BASE_PATH = "/oppikirjasto/saksa-b3";
export const findLosBook = (id: string) => LOS_BOOKS.find(book => book.id === id);
export const bookPath = (book: Book, section?: string) =>
  LOS_BASE_PATH + "/" + book.id + (section ? "/" + section : "");
