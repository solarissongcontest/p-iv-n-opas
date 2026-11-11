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
import { LOS1_C02_WB_BLOCKS, LOS1_C02_WB_EXERCISES } from "./los1-c02-wikibooks.ts";
import { LOS1_C03_SOURCE_BLOCKS, LOS1_C03_SOURCE_EXERCISES } from "./los1-c03-source.ts";
import { LOS1_C03_CONTENT_BLOCKS } from "./los1-c03-content.ts";
import { LOS1_C03_PRACTICE_EXERCISES } from "./los1-c03-practice.ts";
import { LOS1_C03_EXAM_EXERCISES, LOS1_C03_TEST } from "./los1-c03-test.ts";
import { LOS1_C03_SECTIONS } from "./los1-c03-sections.ts";
import { LOS1_C04_SOURCE_BLOCKS, LOS1_C04_SOURCE_EXERCISES } from "./los1-c04-source.ts";
import { LOS1_C04_BLOCKS } from "./los1-c04-content.ts";
import { LOS1_C04_PRACTICE_EXERCISES } from "./los1-c04-practice.ts";
import { LOS1_C04_EXAM_EXERCISES, LOS1_C04_TEST } from "./los1-c04-test.ts";
import { LOS1_C04_SECTIONS } from "./los1-c04-sections.ts";
import { LOS1_C05_SOURCE_BLOCKS, LOS1_C05_SOURCE_EXERCISES } from "./los1-c05-source.ts";
import { LOS1_C05_BLOCKS } from "./los1-c05-content.ts";
import { LOS1_C05_PRACTICE_EXERCISES } from "./los1-c05-practice.ts";
import { LOS1_C05_EXAM_EXERCISES, LOS1_C05_TEST } from "./los1-c05-test.ts";
import { LOS1_C05_SECTIONS } from "./los1-c05-sections.ts";
import { LOS1_C06_SOURCE_BLOCKS, LOS1_C06_SOURCE_EXERCISES } from "./los1-c06-source.ts";
import { LOS1_C06_CONTENT_BLOCKS } from "./los1-c06-content.ts";
import { LOS1_C06_PRACTICE_EXERCISES } from "./los1-c06-practice.ts";
import { LOS1_C06_EXAM_EXERCISES, LOS1_C06_TEST } from "./los1-c06-test.ts";
import { LOS1_C06_SECTIONS } from "./los1-c06-sections.ts";
import { LOS1_REVIEW_ONE_BLOCKS, LOS1_REVIEW_ONE_EXERCISES } from "./los1-review-one.ts";
import { LOS1_MIDTERM_FORM_A, LOS1_MIDTERM_FORM_B, LOS1_MIDTERM_TEST } from "./los1-midterm.ts";
import { LOS1_C07_SOURCE_BLOCKS, LOS1_C07_SOURCE_EXERCISES } from "./los1-c07-source.ts";
import { LOS1_C07_CONTENT_BLOCKS } from "./los1-c07-content.ts";
import { LOS1_C07_PRACTICE_EXERCISES } from "./los1-c07-practice.ts";
import { LOS1_C07_EXAM_A, LOS1_C07_EXAM_B, LOS1_C07_TEST } from "./los1-c07-test.ts";
import { LOS1_C07_SECTIONS } from "./los1-c07-sections.ts";
import { LOS1_C08_CONTENT_BLOCKS } from "./los1-c08-content.ts";
import { LOS1_C08_PRACTICE_EXERCISES } from "./los1-c08-practice.ts";
import { LOS1_C08_SOURCE_BLOCKS, LOS1_C08_SOURCE_EXERCISES } from "./los1-c08-source.ts";
import { LOS1_C08_EXAM_A, LOS1_C08_EXAM_B, LOS1_C08_TEST } from "./los1-c08-test.ts";
import { LOS1_C08_SECTIONS } from "./los1-c08-sections.ts";
import { LOS1_C09_CONTENT_BLOCKS } from "./los1-c09-content.ts";
import { LOS1_C09_PRACTICE_EXERCISES } from "./los1-c09-practice.ts";
import { LOS1_C09_SOURCE_EXERCISES } from "./los1-c09-source.ts";
import { LOS1_C09_TEXT_A_BLOCKS, LOS1_C09_TEXT_A_EXERCISES } from "./los1-c09-text-a.ts";
import { LOS1_C09_EXAM_A, LOS1_C09_EXAM_B, LOS1_C09_TEST } from "./los1-c09-test.ts";
import { LOS1_C09_SECTIONS } from "./los1-c09-sections.ts";
import { LOS1_C10_SOURCE_BLOCKS, LOS1_C10_SOURCE_EXERCISES } from "./los1-c10-source.ts";
import { LOS1_C10_CONTENT_BLOCKS } from "./los1-c10-content.ts";
import { LOS1_C10_PRACTICE_EXERCISES } from "./los1-c10-practice.ts";
import { LOS1_C10_EXAM_A, LOS1_C10_EXAM_B, LOS1_C10_TEST } from "./los1-c10-test.ts";
import { LOS1_C10_SECTIONS } from "./los1-c10-sections.ts";
import { LOS1_REVIEW_TWO_BLOCKS, LOS1_REVIEW_TWO_EXERCISES } from "./los1-review-two.ts";
import { LOS1_FINAL_BLOCKS, LOS1_FINAL_FORM_A, LOS1_FINAL_FORM_B, LOS1_FINAL_TEST } from "./los1-final-exam.ts";

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
    blockIds: [...LOS1_C02_WB_BLOCKS, ...LOS1_C02_BLOCKS].map(block => block.id),
    exerciseIds: [...LOS1_C02_WB_EXERCISES, ...LOS1_C02_EXERCISES, ...LOS1_C02_EXAM_EXERCISES].map(item => item.id),
  } : chapter.id === "C03" ? {
    ...chapter,
    publicationStatus: "preview" as const,
    objectives: ["L1-INT-03", "L1-READ-01", "L1-MED-01"],
    sections: LOS1_C03_SECTIONS,
    blockIds: [...LOS1_C03_SOURCE_BLOCKS, ...LOS1_C03_CONTENT_BLOCKS].map(block => block.id),
    exerciseIds: [
      ...LOS1_C03_SOURCE_EXERCISES, ...LOS1_C03_PRACTICE_EXERCISES, ...LOS1_C03_EXAM_EXERCISES,
    ].map(exercise => exercise.id),
  } : chapter.id === "C04" ? {
    ...chapter, publicationStatus: "preview" as const,
    sections: LOS1_C04_SECTIONS,
    blockIds: [...LOS1_C04_SOURCE_BLOCKS, ...LOS1_C04_BLOCKS].map(block => block.id),
    exerciseIds: [
      ...LOS1_C04_SOURCE_EXERCISES, ...LOS1_C04_PRACTICE_EXERCISES,
      ...LOS1_C04_EXAM_EXERCISES,
    ].map(exercise => exercise.id),
  } : chapter.id === "C05" ? {
    ...chapter, publicationStatus:"preview" as const,
    sections:LOS1_C05_SECTIONS,
    blockIds:[...LOS1_C05_SOURCE_BLOCKS,...LOS1_C05_BLOCKS].map(block=>block.id),
    exerciseIds:[...LOS1_C05_SOURCE_EXERCISES,...LOS1_C05_PRACTICE_EXERCISES,
      ...LOS1_C05_EXAM_EXERCISES].map(exercise=>exercise.id),
  } : chapter.id === "C06" ? {
    ...chapter, publicationStatus:"preview" as const,
    sections:LOS1_C06_SECTIONS,
    blockIds:[...LOS1_C06_SOURCE_BLOCKS,...LOS1_C06_CONTENT_BLOCKS].map(block=>block.id),
    exerciseIds:[...LOS1_C06_SOURCE_EXERCISES,...LOS1_C06_PRACTICE_EXERCISES,
      ...LOS1_C06_EXAM_EXERCISES].map(exercise=>exercise.id),
  } : chapter.id === "C07" ? {
    ...chapter, publicationStatus:"preview" as const,
    sections:LOS1_C07_SECTIONS,
    blockIds:[...LOS1_C07_SOURCE_BLOCKS,...LOS1_C07_CONTENT_BLOCKS].map(b=>b.id),
    exerciseIds:[...LOS1_C07_SOURCE_EXERCISES,...LOS1_C07_PRACTICE_EXERCISES,
      ...LOS1_C07_EXAM_A].map(ex=>ex.id),
  } : chapter.id === "C08" ? {
    ...chapter,publicationStatus:"preview" as const,
    sections:LOS1_C08_SECTIONS,
    blockIds:[...LOS1_C08_CONTENT_BLOCKS,...LOS1_C08_SOURCE_BLOCKS].map(b=>b.id),
    exerciseIds:[...LOS1_C08_SOURCE_EXERCISES,...LOS1_C08_PRACTICE_EXERCISES,...LOS1_C08_EXAM_A].map(ex=>ex.id),
  } : chapter.id === "C09" ? {
    ...chapter,publicationStatus:"preview" as const,
    sections:LOS1_C09_SECTIONS,
    blockIds:[...LOS1_C09_CONTENT_BLOCKS,...LOS1_C09_TEXT_A_BLOCKS].map(b=>b.id),
    exerciseIds:[...LOS1_C09_SOURCE_EXERCISES,...LOS1_C09_TEXT_A_EXERCISES,...LOS1_C09_PRACTICE_EXERCISES,
      ...LOS1_C09_EXAM_A].map(ex=>ex.id),
  } : chapter.id === "C10" ? {
    ...chapter,publicationStatus:"preview" as const,
    sections:LOS1_C10_SECTIONS,
    blockIds:[...LOS1_C10_SOURCE_BLOCKS,...LOS1_C10_CONTENT_BLOCKS].map(b=>b.id),
    exerciseIds:[...LOS1_C10_SOURCE_EXERCISES,...LOS1_C10_PRACTICE_EXERCISES,
      ...LOS1_C10_EXAM_A].map(ex=>ex.id),
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
      ...lesson, publicationStatus: "preview" as const,
      steps: [
        { id: "L008-S01", title: "Tutustu Wikibooksin alkuperäiseen päätekstiin", required: true, blockId: "los1-c02-wb-original-intro" },
        { id: "L008-S02", title: "Kuuntele Franzin ja Gretan alkuperäinen äänite", required: true, blockId: "los1-c02-wb-original-audio" },
        { id: "L008-S03", title: "Lue alkuperäisen päätekstin kaikki kuusi repliikkiä", required: true, blockId: "los1-c02-wb-original-dialogue" },
        { id: "L008-S04", title: "Tunnista Gretan nimi", required: true, exerciseId: "los1-c02-wb-greta-name" },
        { id: "L008-S05", title: "Tunnista opettaja", required: true, exerciseId: "los1-c02-wb-teacher" },
        { id: "L008-S06", title: "Etsi tekstistä Ich heiße Greta", required: true, exerciseId: "los1-c02-wb-highlight" },
        { id: "L008-S07", title: "Lue alkuperäistekstin loppuohje", required: true, blockId: "los1-c02-wb-original-followup" },
        { id: "L008-S08", title: "Vertaile LOS!:n omaan lisädialogiin", required: false, blockId: "los1-c02-text-a-editorial" },
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
        { id: "L010-S02B", title: "Lue koko alkuperäinen nelirepliikkinen teksti", required: true, blockId: "los1-c02-m-com-02-dialogue" },
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
    if (lesson.id === "L012") return {
      ...lesson, publicationStatus: "preview" as const,
      steps: [
        { id:"L012-S01",title:"Kertaa jo opittu nimi ja tutustu kotipaikkaan",required:true,blockId:"los1-c03-orientation" },
        { id:"L012-S02",title:"Lue ja harjoittele Woher kommst du?",required:true,blockId:"los1-c03-first-phrase" },
        { id:"L012-S03",title:"Tunnista kysymys",required:true,exerciseId:"los1-c03-first-question" },
        { id:"L012-S04",title:"Valitse oikea vastaus",required:true,exerciseId:"los1-c03-first-answer" },
        { id:"L012-S05",title:"Lue maat ja alkuperäfraasit",required:true,blockId:"los1-c03-country-table" },
        { id:"L012-S06",title:"Tunnista Saksan nimi",required:true,exerciseId:"los1-c03-first-country" },
      ],
    };
    if (lesson.id === "L013") return {
      ...lesson, publicationStatus: "preview" as const,
      steps: [
        { id:"L013-S01",title:"Tutustu Bernan alkuperäiseen haastatteluun",required:true,blockId:"los1-c03-berna-intro" },
        { id:"L013-S02",title:"Lue koko Bernan litteraatti, puhelinnumero poistettuna",required:true,blockId:"los1-c03-berna-dialogue" },
        { id:"L013-S03",title:"Tunnista Bernan lähtömaa",required:true,exerciseId:"los1-c03-berna-country" },
        { id:"L013-S04",title:"Tunnista Bernan lähtökaupunki",required:true,exerciseId:"los1-c03-berna-city" },
        { id:"L013-S05",title:"Etsi tekstin alkuperäkysymys",required:true,exerciseId:"los1-c03-berna-highlight-question" },
        { id:"L013-S06",title:"Lue kohdennettu opastus",required:true,blockId:"los1-c03-berna-followup" },
      ],
    };
    if (lesson.id === "L014") return {
      ...lesson, publicationStatus: "preview" as const,
      steps: [
        { id:"L014-S01",title:"Opiskele kommen-verbin muodot",required:true,blockId:"los1-c03-grammar-kommen" },
        { id:"L014-S02",title:"Opettele aus ja die Schweiz -poikkeus",required:true,blockId:"los1-c03-grammar-aus" },
        { id:"L014-S03",title:"Erota woher ja wo",required:true,blockId:"los1-c03-grammar-wo" },
        { id:"L014-S04",title:"Täydennä ich komme",required:true,exerciseId:"los1-c03-grammar-ich" },
        { id:"L014-S05",title:"Täydennä du kommst",required:true,exerciseId:"los1-c03-grammar-du" },
        { id:"L014-S06",title:"Muodosta oikea kysymys",required:true,exerciseId:"los1-c03-grammar-question" },
        { id:"L014-S07",title:"Kirjoita aus",required:true,exerciseId:"los1-c03-grammar-aus-gap" },
        { id:"L014-S08",title:"Valitse Sveitsin oikea muoto",required:true,exerciseId:"los1-c03-first-switzerland" },
      ],
    };
    if (lesson.id === "L015") return {
      ...lesson, title: "Kuuntele alkuperää ja tutki maiden sijaintia",
      publicationStatus: "preview" as const,
      steps: [
        { id:"L015-S01",title:"Lue kuuntelutehtävän opastus",required:true,blockId:"los1-c03-text-b-guide" },
        { id:"L015-S02",title:"Kuuntele Ariserin alkuperäinen dialogi",required:true,blockId:"los1-c03-m-com-02-audio" },
        { id:"L015-S03",title:"Lue kaikki neljä alkuperäisrepliikkiä",required:true,blockId:"los1-c03-m-com-02-dialogue" },
        { id:"L015-S04",title:"Tunnista Thomasin ja Peterin alkuperä",required:true,exerciseId:"los1-c03-audio-berlin" },
        { id:"L015-S05",title:"Tunnista Takashin alkuperä",required:true,exerciseId:"los1-c03-audio-kyoto" },
        { id:"L015-S06",title:"Tutki maiden sijaintikaaviota",required:true,blockId:"los1-c03-country-schematic" },
        { id:"L015-S07",title:"Paikanna Suomen länsipuolen maa",required:true,exerciseId:"los1-c03-geography-west" },
        { id:"L015-S08",title:"Paikanna Saksan eteläpuolen maa",required:true,exerciseId:"los1-c03-geography-south" },
      ],
    };
    if (lesson.id === "L016") return {
      ...lesson, publicationStatus: "preview" as const,
      steps: [
        { id:"L016-S01",title:"Kertaa C03:n ydinsanasto",required:true,blockId:"los1-c03-core-vocabulary" },
        { id:"L016-S02",title:"Harjoittele omaa lähtöpaikkaasi",required:true,blockId:"los1-c03-production" },
        { id:"L016-S03",title:"Palauta 15 kohdan kappaletesti ja kirjallinen itsearviointi",required:true,
          chapterTestId: LOS1_C03_TEST.id },
      ],
    };
    if (lesson.id === "L017") return {
      ...lesson, publicationStatus:"preview" as const,
      steps:[
        {id:"L017-S01",title:"Tutustu du/Sie-erotteluun",required:true,blockId:"los1-c04-orientation"},
        {id:"L017-S02",title:"Lue puhuttelumuotojen selitys",required:true,blockId:"los1-c04-grammar-pronouns"},
        {id:"L017-S03",title:"Valitse oikea kysymys tutulle",required:true,exerciseId:"los1-c04-intro-du"},
        {id:"L017-S04",title:"Valitse kohtelias kysymys",required:true,exerciseId:"los1-c04-intro-sie"},
        {id:"L017-S05",title:"Harjoittele tilannetta ystävän kanssa",required:true,exerciseId:"los1-c04-situation-01"},
        {id:"L017-S06",title:"Harjoittele kohtaamista palvelutilanteessa",required:true,exerciseId:"los1-c04-situation-02"},
      ],
    };
    if (lesson.id === "L018") return {
      ...lesson, title:"Schmidt ja Standish: kokonainen alkuperäisdialogi",
      publicationStatus:"preview" as const,
      steps:[
        {id:"L018-S01",title:"Avaa autenttisen Wikibooks-dialogin lukuohje",required:true,blockId:"los1-c04-text-a-guide"},
        {id:"L018-S02",title:"Lue alkuperäiset kahdeksan repliikkiä",required:true,blockId:"los1-c04-wb-06-dialogue"},
        {id:"L018-S03",title:"Tunnista keskustelijat",required:true,exerciseId:"los1-c04-source-pair"},
        {id:"L018-S04",title:"Etsi kohtelias vointikysymys",required:true,exerciseId:"los1-c04-source-formal"},
        {id:"L018-S05",title:"Tunnista Schmidtin vointi",required:true,exerciseId:"los1-c04-source-tired"},
        {id:"L018-S06",title:"Korosta lähteestä kysymys",required:true,exerciseId:"los1-c04-source-highlight"},
        {id:"L018-S07",title:"Kertaa tekstin merkitystä",required:true,blockId:"los1-c04-text-a-followup"},
      ],
    };
    if (lesson.id === "L019") return {
      ...lesson, publicationStatus:"preview" as const,
      steps:[
        {id:"L019-S01",title:"Opettele muodot heißen Sie ja kommen Sie",required:true,blockId:"los1-c04-grammar-verbs"},
        {id:"L019-S02",title:"Vertaile du/Sie-taulukkoa",required:true,blockId:"los1-c04-grammar-table"},
        {id:"L019-S03",title:"Tunnista Ihnen koko fraasina",required:true,blockId:"los1-c04-grammar-ihnen"},
        {id:"L019-S04",title:"Kirjoita kohtelias Sie",required:true,exerciseId:"los1-c04-capital-01"},
        {id:"L019-S05",title:"Kirjoita tuttavallinen du",required:true,exerciseId:"los1-c04-capital-03"},
        {id:"L019-S06",title:"Täydennä kohtelias heißen",required:true,exerciseId:"los1-c04-verb-heissen"},
        {id:"L019-S07",title:"Täydennä kohtelias kommen",required:true,exerciseId:"los1-c04-verb-kommen"},
      ],
    };
    if (lesson.id === "L020") return {
      ...lesson, title:"Kohtelias puhuttelu autenttisissa kysymyksissä",
      publicationStatus:"preview" as const,
      steps:[
        {id:"L020-S01",title:"Tutustu alkuperäisen Deutsch im Blick -listan tarkoitukseen",required:true,blockId:"los1-c04-text-b-guide"},
        {id:"L020-S02",title:"Lue kaikki kuusi alkuperäistä muodollista kysymystä",required:true,blockId:"los1-c04-dib-07-list"},
        {id:"L020-S03",title:"Tunnista kohtelias nimikysymys",required:true,exerciseId:"los1-c04-dib-formal"},
        {id:"L020-S04",title:"Tunnista kohtelias alkuperäkysymys",required:true,exerciseId:"los1-c04-dib-origin"},
        {id:"L020-S05",title:"Kuuntele ihmisäänen tervehdyksiä",required:true,blockId:"los1-c04-greetings-audio"},
        {id:"L020-S06",title:"Lue koko 20 ilmauksen alkuperäinen luettelo",required:true,blockId:"los1-c04-greetings-raw"},
        {id:"L020-S07",title:"Tunnista kohtelias hyvästely",required:true,exerciseId:"los1-c04-greeting-audio"},
        {id:"L020-S08",title:"Kirjoita oma kohtelias kysymys",required:true,blockId:"los1-c04-production-sie"},
      ],
    };
    if (lesson.id === "L021") return {
      ...lesson, publicationStatus:"preview" as const,
      steps:[
        {id:"L021-S01",title:"Kertaa du/Sie-kappaleen ydinsanasto",required:true,blockId:"los1-c04-vocabulary"},
        {id:"L021-S02",title:"Tuttavallinen oma dialogi",required:true,blockId:"los1-c04-production-du"},
        {id:"L021-S03",title:"Kohtelias oma dialogi",required:true,blockId:"los1-c04-production-sie"},
        {id:"L021-S04",title:"Palauta 12 tehtävän koe ja kaksi kirjallista tilannetta",required:true,
          chapterTestId:LOS1_C04_TEST.id},
      ],
    };
    if (lesson.id === "L022") return {
      ...lesson, publicationStatus:"preview" as const,
      steps:[
        {id:"L022-S01",title:"Vointikysymyksen tavoite ja edeltävän kertaus",required:true,blockId:"los1-c05-intro"},
        {id:"L022-S02",title:"Lue kuinka Wie geht's toimii",required:true,blockId:"los1-c05-grammar-how"},
        {id:"L022-S03",title:"Tunnista vointikysymyksen merkitys",required:true,exerciseId:"los1-c05-intro-meaning"},
        {id:"L022-S04",title:"Valitse sopiva perusvastaus",required:true,exerciseId:"los1-c05-intro-reply"},
      ],
    };
    if (lesson.id === "L023") return {
      ...lesson, publicationStatus:"preview" as const,
      steps:[
        {id:"L023-S01",title:"Lue alkuperäisen Heinrich–Karl-dialogin ohjeet",required:true,blockId:"los1-c05-text-a-guide"},
        {id:"L023-S02",title:"Lue kaikki neljä alkuperäistä repliikkiä",required:true,blockId:"los1-c05-wb-05-dialogue"},
        {id:"L023-S03",title:"Tunnista keskustelijat",required:true,exerciseId:"los1-c05-source-people"},
        {id:"L023-S04",title:"Tunnista vointikysymys",required:true,exerciseId:"los1-c05-source-question"},
        {id:"L023-S05",title:"Tunnista Karlin vointi",required:true,exerciseId:"los1-c05-source-feeling"},
        {id:"L023-S06",title:"Korosta kysymys alkuperäistekstistä",required:true,exerciseId:"los1-c05-source-highlight"},
      ],
    };
    if (lesson.id === "L024") return {
      ...lesson, publicationStatus:"preview" as const,
      steps:[
        {id:"L024-S01",title:"Opettele vointivastaukset kokonaisina fraaseina",required:true,blockId:"los1-c05-grammar-reply"},
        {id:"L024-S02",title:"Erota nicht ja sehr",required:true,blockId:"los1-c05-grammar-negation"},
        {id:"L024-S03",title:"Täydennä nicht",required:true,exerciseId:"los1-c05-grammar-nicht-gap"},
        {id:"L024-S04",title:"Täydennä mir",required:true,exerciseId:"los1-c05-grammar-mir"},
        {id:"L024-S05",title:"Täydennä tuttavallinen dir",required:true,exerciseId:"los1-c05-grammar-dir"},
        {id:"L024-S06",title:"Täydennä kohtelias Ihnen",required:true,exerciseId:"los1-c05-grammar-ihnen"},
        {id:"L024-S07",title:"Valitse ero hyvän ja huonon voinnin välillä",required:true,exerciseId:"los1-c05-grammar-contrast"},
      ],
    };
    if (lesson.id === "L025") return {
      ...lesson, title:"Tunnista vointi ja kuuntele kysymys",
      publicationStatus:"preview" as const,
      steps:[
        {id:"L025-S01",title:"Tutustu COERLL:n alkuperäiseen vointilistaan",required:true,blockId:"los1-c05-text-b-intro"},
        {id:"L025-S02",title:"Lue kaikki 13 alkuperäistä ilmauksen suomennoksineen",required:true,blockId:"los1-c05-dib-05-lines"},
        {id:"L025-S03",title:"Tunnista myönteinen vointi",required:true,exerciseId:"los1-c05-mood-positive"},
        {id:"L025-S04",title:"Tunnista huono vointi",required:true,exerciseId:"los1-c05-mood-negative"},
        {id:"L025-S05",title:"Kuuntele Jeuwren aito ääntämisnäyte",required:true,blockId:"los1-c05-m-com-05-pronunciation"},
        {id:"L025-S06",title:"Tunnista kuultu kysymys",required:true,exerciseId:"los1-c05-audio-native-question"},
        {id:"L025-S07",title:"Muodosta fraasi oikeaan sanajärjestykseen",required:true,exerciseId:"los1-c05-order-question"},
      ],
    };
    if (lesson.id === "L026") return {
      ...lesson,publicationStatus:"preview" as const,
      steps:[
        {id:"L026-S01",title:"Kertaa kappaleen 17 ydinkorttia",required:true,blockId:"los1-c05-words"},
        {id:"L026-S02",title:"Kirjoita oma lyhyt vointikeskustelu",required:true,blockId:"los1-c05-production"},
        {id:"L026-S03",title:"Palauta 12 kohdan kappaletesti ja arvioi puhe itse",required:true,
          chapterTestId:LOS1_C05_TEST.id},
      ],
    };
    if (lesson.id === "L027") return {
      ...lesson, publicationStatus:"preview" as const,
      objectives:["L1-INT-01","L1-INT-02","L1-INT-03"],
      steps:[
        {id:"L027-S01",title:"Kertaus I:n tavoitteet",required:true,blockId:"los1-review1-intro-a"},
        {id:"L027-S02",title:"Tervehdy tilanteen mukaan",required:true,exerciseId:"los1-review1-a01"},
        {id:"L027-S03",title:"Muodosta tuttu nimikysymys",required:true,exerciseId:"los1-review1-a02"},
        {id:"L027-S04",title:"Esittele kuvitteellinen henkilö",required:true,exerciseId:"los1-review1-a03"},
        {id:"L027-S05",title:"Kerro lähtömaa",required:true,exerciseId:"los1-review1-a04"},
        {id:"L027-S06",title:"Valitse kohtelias hyvästely",required:true,exerciseId:"los1-review1-a05"},
        {id:"L027-S07",title:"Arvioi itse, mikä palautui mieleen",required:true,
          reflectionPromptFi:"Mikä sujui ilman sanastoa ja mitä (tervehdykset, nimet, alkuperä) haluat vielä kerrata? Kirjoita lyhyt oma huomio."},
      ],
    };
    if (lesson.id === "L028") return {
      ...lesson, publicationStatus:"preview" as const,
      objectives:["L1-INT-04","L1-INT-05"],
      steps:[
        {id:"L028-S01",title:"Valmistaudu taitojen sekoitukseen",required:true,blockId:"los1-review1-intro-b"},
        {id:"L028-S02",title:"Kysy vointia tuttavalta",required:true,exerciseId:"los1-review1-b01"},
        {id:"L028-S03",title:"Täydennä kohtelias nimikysymys",required:true,exerciseId:"los1-review1-b02"},
        {id:"L028-S04",title:"Vastaa kohteliaaseen lähtöpaikkakysymykseen",required:true,exerciseId:"los1-review1-b03"},
        {id:"L028-S05",title:"Tunnista heikompi vointi",required:true,exerciseId:"los1-review1-b04"},
        {id:"L028-S06",title:"Kysy kohteliaasti takaisin",required:true,exerciseId:"los1-review1-b05"},
        {id:"L028-S07",title:"Arvioi taitosekoituksen sujuvuus",required:true,
          reflectionPromptFi:"Mitkä muodot (du/dir ja Sie/Ihnen; heißen/kommen; hyvä/huono vointi) tunnistit ilman vihjettä? Mikä jäi epävarmaksi?"},
      ],
    };
    if (lesson.id === "L029") return {
      ...lesson, publicationStatus:"preview" as const,
      objectives:["L1-INT-01","L1-READ-01","L1-INT-03"],
      steps:[
        {id:"L029-S01",title:"Tutustu autenttiseen kertauskuunteluun",required:true,blockId:"los1-review1-intro-c"},
        {id:"L029-S02",title:"Kuuntele Franzin ja Jörgin alkuperäinen keskustelu",required:true,blockId:"los1-c01-m-com-01-audio"},
        {id:"L029-S03",title:"Tunnista aloitus",required:true,exerciseId:"los1-review1-c01"},
        {id:"L029-S04",title:"Kuuntele Franzin ja Gretan oikea dialogi",required:true,blockId:"los1-c02-wb-original-audio"},
        {id:"L029-S05",title:"Tunnista Gretan nimen kertominen",required:true,exerciseId:"los1-review1-c02"},
        {id:"L029-S06",title:"Kuuntele Ariserin nelirepliikkinen kaupunkidialogi",required:true,blockId:"los1-c02-commons-02-audio"},
        {id:"L029-S07",title:"Tunnista Kioto",required:true,exerciseId:"los1-review1-c03"},
        {id:"L029-S08",title:"Tunnista Berliini",required:true,exerciseId:"los1-review1-c04"},
        {id:"L029-S09",title:"Kuuntele alkuperäinen tervehdyssarja",required:true,blockId:"los1-c01-m-com-03-audio"},
        {id:"L029-S10",title:"Tunnista kohtelias hyvästely",required:true,exerciseId:"los1-review1-c05"},
        {id:"L029-S11",title:"Arvioi oma kuullun ymmärtäminen",required:true,
          reflectionPromptFi:"Minkä alkuperäisen äänitteen ymmärsit parhaiten ilman litteraattia? Mitä ilmausta tarvitsee vielä kuunnella? Jos laite ei toista ääntä, kerro tämä rehellisesti."},
      ],
    };
    if (lesson.id === "L030") return {
      ...lesson, publicationStatus:"preview" as const,
      objectives:["L1-INT-01","L1-INT-02","L1-INT-03","L1-INT-04","L1-INT-05"],
      steps:[
        {id:"L030-S01",title:"Valmistaudu kappaleiden 1–5 välikokeeseen",required:true,
          reflectionPromptFi:"Mitä tavoittelet tältä harjoitusvälikokeelta? Voit kirjoittaa lyhyesti, millainen osa-alue tuntuu vaikeimmalta."},
        {id:"L030-S02",title:"Palauta 25 pisteytettävää kohtaa ja itsearvioitu 4–6 repliikin dialogi",required:true,
          chapterTestId:LOS1_MIDTERM_TEST.id},
      ],
    };
    if (lesson.id === "L031") return {
      ...lesson,publicationStatus:"preview" as const,
      steps:[
        {id:"L031-S01",title:"Tutustu numeroihin ja ikään",required:true,blockId:"los1-c06-intro"},
        {id:"L031-S02",title:"Lue numerot 0–12",required:true,blockId:"los1-c06-zero-twelve-table"},
        {id:"L031-S03",title:"Harjoittele yhtä, viittä ja kahtatoista",required:true,exerciseId:"los1-c06-digit-01"},
        {id:"L031-S04",title:"Täydennä viisi",required:true,exerciseId:"los1-c06-digit-05"},
        {id:"L031-S05",title:"Täydennä kaksitoista",required:true,exerciseId:"los1-c06-digit-12"},
        {id:"L031-S06",title:"Kuuntele aito 37 sekunnin numeroluettelo",required:true,blockId:"los1-c06-m-com-06-numbers-audio"},
        {id:"L031-S07",title:"Lue äänen koko alkuperäinen numerosarja",required:true,blockId:"los1-c06-m-com-06-transcript"},
      ],
    };
    if (lesson.id === "L032") return {
      ...lesson,publicationStatus:"preview" as const,
      steps:[
        {id:"L032-S01",title:"Opettele luvut 13–20 ja poikkeukset",required:true,blockId:"los1-c06-teen-grammar"},
        {id:"L032-S02",title:"Lue ikäkysymyksen kielioppi",required:true,blockId:"los1-c06-age-grammar"},
        {id:"L032-S03",title:"Kertaa koko alkuperäinen Franz–Jörg-dialogi",required:true,blockId:"los1-c06-m-com-01-dialogue"},
        {id:"L032-S04",title:"Tunnista Franzin ikä",required:true,exerciseId:"los1-c06-text-a-franz"},
        {id:"L032-S05",title:"Tunnista Jörgin ikä",required:true,exerciseId:"los1-c06-text-a-joerg"},
        {id:"L032-S06",title:"Korosta Franzin ikälause",required:true,exerciseId:"los1-c06-text-a-highlight-age"},
        {id:"L032-S07",title:"Harjoittele kuusitoista",required:true,exerciseId:"los1-c06-digit-16"},
        {id:"L032-S08",title:"Harjoittele seitsemäntoista",required:true,exerciseId:"los1-c06-digit-17"},
      ],
    };
    if (lesson.id === "L033") return {
      ...lesson,publicationStatus:"preview" as const,
      steps:[
        {id:"L033-S01",title:"Opi yhdyssanaperiaate 21–100",required:true,blockId:"los1-c06-compound-grammar"},
        {id:"L033-S02",title:"Vertaile saksan kymmenlukuja",required:true,blockId:"los1-c06-tens-table"},
        {id:"L033-S03",title:"Tarkastele yhdeksää esimerkkiä",required:true,blockId:"los1-c06-compound-table"},
        {id:"L033-S04",title:"Kirjoita 21",required:true,exerciseId:"los1-c06-compound-21"},
        {id:"L033-S05",title:"Kirjoita 27",required:true,exerciseId:"los1-c06-compound-27"},
        {id:"L033-S06",title:"Kirjoita 32",required:true,exerciseId:"los1-c06-compound-32"},
        {id:"L033-S07",title:"Tunnista 60",required:true,exerciseId:"los1-c06-ten-60"},
        {id:"L033-S08",title:"Yhdistä kuusi, seitsemän ja teiniluvut",required:true,exerciseId:"los1-c06-match-numbers"},
      ],
    };
    if (lesson.id === "L034") return {
      ...lesson,title:"Lue Haraldin haastattelu ja kuuntele luvut",
      publicationStatus:"preview" as const,
      steps:[
        {id:"L034-S01",title:"Lue autenttisen Harald-haastattelun opastus",required:true,blockId:"los1-c06-text-b-intro"},
        {id:"L034-S02",title:"Lue koko saksankielinen Haraldin haastattelu",required:true,blockId:"los1-c06-m-dib-02-dialogue"},
        {id:"L034-S03",title:"Tunnista Haraldin lähtöpaikka",required:true,exerciseId:"los1-c06-text-b-place"},
        {id:"L034-S04",title:"Tunnista arvioitu ikä",required:true,exerciseId:"los1-c06-text-b-age"},
        {id:"L034-S05",title:"Korosta Haraldin ikälause",required:true,exerciseId:"los1-c06-text-b-highlight"},
        {id:"L034-S06",title:"Kuuntele ihmisen lausumat kymmenluvut",required:true,blockId:"los1-c06-m-com-06-numbers-audio"},
        {id:"L034-S07",title:"Tunnista äänitteen viimeinen luku",required:true,exerciseId:"los1-c06-audio-last"},
      ],
    };
    if (lesson.id === "L035") return {
      ...lesson,publicationStatus:"preview" as const,
      steps:[
        {id:"L035-S01",title:"Kertaa numerot, ikä ja vuosien ilmaukset",required:true,blockId:"los1-c06-vocabulary"},
        {id:"L035-S02",title:"Harjoittele tuttavallinen ikäkysymys",required:true,blockId:"los1-c06-production-du"},
        {id:"L035-S03",title:"Harjoittele kohtelias ikäkysymys",required:true,blockId:"los1-c06-production-sie"},
        {id:"L035-S04",title:"Palauta 20 tehtävän C06-koe ja kaksi kuvitteellista ikädialogia",required:true,
          chapterTestId:LOS1_C06_TEST.id},
      ],
    };
    if (lesson.id === "L036") return {
      ...lesson,publicationStatus:"preview" as const,
      steps:[
        {id:"L036-S01",title:"Tutustu aakkosiin ja nimien tavaamiseen",required:true,blockId:"los1-c07-intro"},
        {id:"L036-S02",title:"Lue saksan aakkosten opetus",required:true,blockId:"los1-c07-basic-alphabet"},
        {id:"L036-S03",title:"Avaa perusaakkosten nimitaulukko",required:true,blockId:"los1-c07-alphabet-table"},
        {id:"L036-S04",title:"Kuuntele ihmisen nauhoittama aakkosto",required:true,blockId:"los1-c07-m-com-07-alphabet-audio"},
        {id:"L036-S05",title:"Tunnista kirjaimen ja ääntämyksen ero",required:true,exerciseId:"los1-c07-intro-pronunciation"},
        {id:"L036-S06",title:"Tunnista aakkosten koko",required:true,exerciseId:"los1-c07-intro-alphabet"},
      ],
    };
    if (lesson.id === "L037") return {
      ...lesson,publicationStatus:"preview" as const,
      steps:[
        {id:"L037-S01",title:"Tutustu autenttisen puhelindialogin tilanteeseen",required:true,blockId:"los1-c07-text-a-intro"},
        {id:"L037-S02",title:"Lue koko alkuperäinen viiden repliikin puhelu",required:true,blockId:"los1-c07-wb-02-dialogue"},
        {id:"L037-S03",title:"Tunnista puhelun aihe",required:true,exerciseId:"los1-c07-source-call"},
        {id:"L037-S04",title:"Tunnista henkilön nimi",required:true,exerciseId:"los1-c07-source-name"},
        {id:"L037-S05",title:"Tunnista kaupungin nimi",required:true,exerciseId:"los1-c07-source-city"},
        {id:"L037-S06",title:"Lue lähteen tavausmalli",required:true,blockId:"los1-c07-text-a-spelling-table"},
      ],
    };
    if (lesson.id === "L038") return {
      ...lesson,publicationStatus:"preview" as const,
      steps:[
        {id:"L038-S01",title:"Opettele tavaamis- ja toistopyynnöt",required:true,blockId:"los1-c07-spelling-grammar"},
        {id:"L038-S02",title:"Erota sanan ääntämys ja kirjaimen nimi",required:true,blockId:"los1-c07-letter-vs-sound"},
        {id:"L038-S03",title:"Tunnista J-kirjaimen nimi",required:true,exerciseId:"los1-c07-name-j"},
        {id:"L038-S04",title:"Tunnista W-kirjaimen nimi",required:true,exerciseId:"los1-c07-name-w"},
        {id:"L038-S05",title:"Muodosta kohtelias tavaamispyyntö",required:true,exerciseId:"los1-c07-order-polite"},
        {id:"L038-S06",title:"Harjoittele keksityn nimen kirjoittamista",required:true,exerciseId:"los1-c07-spell-name-01"},
        {id:"L038-S07",title:"Harjoittele keksittyä numerosarjaa",required:true,exerciseId:"los1-c07-fictitious-number-01"},
      ],
    };
    if (lesson.id === "L039") return {
      ...lesson,publicationStatus:"preview" as const,
      steps:[
        {id:"L039-S01",title:"Lue COERLL:n koko alkuperäinen aakkoslista",required:true,blockId:"los1-c07-dib-06-alphabet"},
        {id:"L039-S02",title:"Kuuntele erillinen oikea aakkosäänite",required:true,blockId:"los1-c07-m-com-07-alphabet-audio"},
        {id:"L039-S03",title:"Tunnista ä, ö, ü",required:true,exerciseId:"los1-c07-coerll-list-umlaut"},
        {id:"L039-S04",title:"Tunnista äänitteen oikea sisältölaji",required:true,exerciseId:"los1-c07-audioguide-reality"},
        {id:"L039-S05",title:"Täytä keksitty lomake",required:true,blockId:"los1-c07-production-form"},
        {id:"L039-S06",title:"Pyydä kohteliasta toistoa",required:true,blockId:"los1-c07-production-phone"},
      ],
    };
    if (lesson.id === "L040") return {
      ...lesson,publicationStatus:"preview" as const,
      steps:[
        {id:"L040-S01",title:"Kertaa 16 tärkeintä sanaa ja fraasia",required:true,blockId:"los1-c07-words"},
        {id:"L040-S02",title:"Tarkista autenttisen puhelindialogin tavaamissäännöt",required:true,blockId:"los1-c07-text-a-support"},
        {id:"L040-S03",title:"Lue henkilö- ja numerotietojen turvalliset ohjeet",required:true,blockId:"los1-c07-culture"},
        {id:"L040-S04",title:"Palauta 15 tehtävän testi ja itsearvioi nimen tavaaminen",required:true,
          chapterTestId:LOS1_C07_TEST.id},
      ],
    };
    if (lesson.id === "L041") return {
      ...lesson,publicationStatus:"preview" as const,
      steps:[
        {id:"L041-S01",title:"Tutustu luokassa selviytymiseen",required:true,blockId:"los1-c08-intro"},
        {id:"L041-S02",title:"Tunnista kuusi tuttua tilannetta",required:true,blockId:"los1-c08-goals"},
        {id:"L041-S03",title:"Lue viiden selviytymisfraasin opetus",required:true,blockId:"los1-c08-phrases"},
        {id:"L041-S04",title:"Valitse ymmärtämisen vaikeuteen sopiva fraasi",required:true,exerciseId:"los1-c08-intro-not-understand"},
        {id:"L041-S05",title:"Valitse tilanteeseen sopiva toistopyyntö",required:true,exerciseId:"los1-c08-intro-repeat"},
        {id:"L041-S06",title:"Valitse hidastamista pyytävä ilmaus",required:true,exerciseId:"los1-c08-intro-slow"},
        {id:"L041-S07",title:"Tunnista merkityskysymys",required:true,exerciseId:"los1-c08-intro-meaning"},
      ],
    };
    if (lesson.id === "L042") return {
      ...lesson,title:"Lue alkuperäiset toistopyynnöt",publicationStatus:"preview" as const,
      steps:[
        {id:"L042-S01",title:"Tutustu Wikibooksin alkuperäisen tekstin taustaan",required:true,blockId:"los1-c08-text-a-bridge"},
        {id:"L042-S02",title:"Lue koko harjoituksen 562 alkuperäisteksti",required:true,blockId:"los1-c08-wb-07-repeat-phrases"},
        {id:"L042-S03",title:"Avaa suomennokset ja verrattavat fraasit",required:true,blockId:"los1-c08-source-gloss"},
        {id:"L042-S04",title:"Tunnista kirjoitetun lähteen lyhyt toistopyyntö",required:true,exerciseId:"los1-c08-source-first"},
        {id:"L042-S05",title:"Vertaa sinuttelua ja teitittelyä",required:true,exerciseId:"los1-c08-source-formal"},
        {id:"L042-S06",title:"Korosta autenttinen kohtelias toistopyyntö",required:true,exerciseId:"los1-c08-source-highlight-formal"},
        {id:"L042-S07",title:"Lue alkuperäisen tekstin ymmärtämisohje",required:true,blockId:"los1-c08-source-explanation"},
        {id:"L042-S08",title:"Tarkista autenttisen tekstin tyyppi ja lähteen luotettavuus",required:true,exerciseId:"los1-c08-source-type"},
      ],
    };
    if (lesson.id === "L043") return {
      ...lesson,publicationStatus:"preview" as const,
      steps:[
        {id:"L043-S01",title:"Opettele C08:n 17 sanastoyksikköä",required:true,blockId:"los1-c08-words"},
        {id:"L043-S02",title:"Erota toistaminen, hidastaminen ja merkityksen kysyminen",required:true,blockId:"los1-c08-distinction"},
        {id:"L043-S03",title:"Harjoittele luokkatilanteiden valintaa",required:true,blockId:"los1-c08-tutorial-scenarios"},
        {id:"L043-S04",title:"Tunnista kohtelias toistopyyntö",required:true,exerciseId:"los1-c08-meaning-sie"},
        {id:"L043-S05",title:"Muodosta toistopyyntö oikeaan sanajärjestykseen",required:true,exerciseId:"los1-c08-order-repeat"},
        {id:"L043-S06",title:"Yhdistä tilanne ja sopiva avunpyyntö",required:true,exerciseId:"los1-c08-match-help"},
        {id:"L043-S07",title:"Tarkista toistopyynnön täydennys",required:true,exerciseId:"los1-c08-grammar-repeat"},
      ],
    };
    // L044 remains planned until Text B listening is technically and legally checked.
    if (lesson.id === "L045") return {
      ...lesson,publicationStatus:"preview" as const,
      steps:[
        {id:"L045-S01",title:"Kertaa opitut selviytymisfraasit",required:true,blockId:"los1-c08-phrases"},
        {id:"L045-S02",title:"Kirjoita kolme omaa avunpyyntöä",required:true,blockId:"los1-c08-production-ask"},
        {id:"L045-S03",title:"Harjoittele sanomista ja itsearviointia",required:true,blockId:"los1-c08-production-speak"},
        {id:"L045-S04",title:"Palauta 12 tehtävän kappaletesti ja tee puheen itsearviointi",required:true,
          chapterTestId:LOS1_C08_TEST.id},
      ],
    };
    if (lesson.id === "L046") return {
      ...lesson,publicationStatus:"preview" as const,
      steps:[
        {id:"L046-S01",title:"Aloita viikonpäivistä",required:true,blockId:"los1-c09-intro"},
        {id:"L046-S02",title:"Opettele viikonpäivien suomenkieliset merkitykset",required:true,blockId:"los1-c09-weekday-guide"},
        {id:"L046-S03",title:"Lue koko Wikibooksin alkuperäinen viikonpäivälista",required:true,blockId:"los1-c09-wb-04-days"},
        {id:"L046-S04",title:"Tarkista alkuperäisen listan kolmas päivä",required:true,exerciseId:"los1-c09-source-order"},
        {id:"L046-S05",title:"Tarkista alkuperäisen listan viikonlopun päivät",required:true,exerciseId:"los1-c09-source-weekend"},
        {id:"L046-S06",title:"Harjoittele maanantain kirjoitusasua",required:true,exerciseId:"los1-c09-weekday-01"},
        {id:"L046-S07",title:"Harjoittele viikon lopun kirjoitusasua",required:true,exerciseId:"los1-c09-weekday-07"},
      ],
    };
    if (lesson.id === "L047") return {
      ...lesson,publicationStatus:"preview" as const,
      steps:[
        {id:"L047-S01",title:"Johdanto autenttiseen Sport und Zeit -keskusteluun",required:true,blockId:"los1-c09-text-a-intro"},
        {id:"L047-S02",title:"Lue koko alkuperäinen Franzin ja Gretan keskustelu",required:true,blockId:"los1-c09-wb-03-dialogue"},
        {id:"L047-S03",title:"Tunnista Gretan kellonaika",required:true,exerciseId:"los1-c09-sport-quarter"},
        {id:"L047-S04",title:"Vertaa Franzin tasatuntia",required:true,exerciseId:"los1-c09-sport-franz-time"},
        {id:"L047-S05",title:"Korosta Gretan alkuperäinen ajanilmaus",required:true,exerciseId:"los1-c09-sport-highlight-quarter"},
        {id:"L047-S06",title:"Tunnista erot ajanilmauksissa",required:true,blockId:"los1-c09-sport-followup"},
        {id:"L047-S07",title:"Tutustu lähteeseen ja äänitteen laatuhuomautukseen",required:true,blockId:"los1-c09-sport-source-note"},
      ],
    };
    if (lesson.id === "L048") return {
      ...lesson,publicationStatus:"preview" as const,
      steps:[
        {id:"L048-S01",title:"Lue am- ja um-aikailmausten ohjeet",required:true,blockId:"los1-c09-am-um"},
        {id:"L048-S02",title:"Tunnista päiväilmaus",required:true,exerciseId:"los1-c09-preposition-day"},
        {id:"L048-S03",title:"Tunnista tasatunti",required:true,exerciseId:"los1-c09-preposition-hour"},
        {id:"L048-S04",title:"Järjestä viikonpäivä ja aika",required:true,exerciseId:"los1-c09-order-monday"},
        {id:"L048-S05",title:"Harjoittele neljän tasatuntia",required:true,exerciseId:"los1-c09-calendar-02"},
        {id:"L048-S06",title:"Tutustu oikean lähteen vaativaan ajanilmaukseen tunnistamisen tasolla",required:true,blockId:"los1-c09-source-time-support"},
        {id:"L048-S07",title:"Tarkista viikonpäivän ja ajan merkitys",required:true,exerciseId:"los1-c09-calendar-meaning"},
      ],
    };
    // L049 is deliberately planned: no independent verified Die Woche recording.
    if (lesson.id === "L050") return {
      ...lesson,publicationStatus:"preview" as const,
      steps:[
        {id:"L050-S01",title:"Kertaa C09:n 17 ydinsanaa",required:true,blockId:"los1-c09-words"},
        {id:"L050-S02",title:"Tutustu kuvitteelliseen seitsemän päivän harjoituskalenteriin",required:true,blockId:"los1-c09-calendar-table"},
        {id:"L050-S03",title:"Laadi oma seitsemän päivän kalenteri",required:true,blockId:"los1-c09-production-calendar"},
        {id:"L050-S04",title:"Harjoittele kolmen repliikin tapaamista",required:true,blockId:"los1-c09-production-meeting"},
        {id:"L050-S05",title:"Palauta 14 kysymyksen testi ja kirjoita lyhyt viesti",required:true,
          chapterTestId:LOS1_C09_TEST.id},
      ],
    };
    if (lesson.id === "L051") return {
      ...lesson,publicationStatus:"preview" as const,
      steps:[
        {id:"L051-S01",title:"Kertaa kaikkien kymmenen kappaleen esittelyfraasit",required:true,blockId:"los1-c10-goals"},
        {id:"L051-S02",title:"Lue C10:n kokonaisen kohtaamisen tavoitteet",required:true,blockId:"los1-c10-intro"},
        {id:"L051-S03",title:"Tunnista tutustumisen tervehdys",required:true,exerciseId:"los1-c10-intro-pleasure"},
        {id:"L051-S04",title:"Tunnista oikea kolmannen henkilön esittely",required:true,exerciseId:"los1-c10-intro-who"},
        {id:"L051-S05",title:"Lue Haraldin koko autenttinen haastattelu",required:true,blockId:"los1-c10-m-dib-02-harald"},
        {id:"L051-S06",title:"Tunnista Haraldin koko nimi",required:true,exerciseId:"los1-c10-source-harald-name"},
      ],
    };
    // L052 requires an original, verified working Harald audio/video, not just text.
    if (lesson.id === "L053") return {
      ...lesson,publicationStatus:"preview" as const,
      steps:[
        {id:"L053-S01",title:"Lue minä- ja kolmannen persoonan kielioppi",required:true,blockId:"los1-c10-first-person-third"},
        {id:"L053-S02",title:"Vertaa heißen, kommen ja sein -verbien muotoja",required:true,blockId:"los1-c10-verb-table"},
        {id:"L053-S03",title:"Erota teitittelevä Sie ja hän-sanan sie",required:true,blockId:"los1-c10-sie-clarification"},
        {id:"L053-S04",title:"Täydennä Haraldin nimi",required:true,exerciseId:"los1-c10-gap-er-name"},
        {id:"L053-S05",title:"Täydennä Bernan kotikaupunki",required:true,exerciseId:"los1-c10-gap-sie-origin"},
        {id:"L053-S06",title:"Tunnista kolmannen persoonan muoto",required:true,exerciseId:"los1-c10-grammar-person"},
        {id:"L053-S07",title:"Esittele Harald ja Berna omin sanoin",required:true,blockId:"los1-c10-production-third"},
      ],
    };
    if (lesson.id === "L054") return {
      ...lesson,title:"Rakenna kaksi keskustelua",publicationStatus:"preview" as const,
      steps:[
        {id:"L054-S01",title:"Lue Bernan alkuperäinen koko haastattelu",required:true,blockId:"los1-c10-m-dib-01-berna"},
        {id:"L054-S02",title:"Kertaa, mitä tekstistä voi päätellä ja mitä ei",required:true,blockId:"los1-c10-berna-support"},
        {id:"L054-S03",title:"Tunnista lähteiden erot",required:true,exerciseId:"los1-c10-source-compare-origin"},
        {id:"L054-S04",title:"Tee oma kolmen henkilön esittelyharjoitus",required:true,blockId:"los1-c10-production-third"},
        {id:"L054-S05",title:"Rakenna kuvitteellinen keskustelu avunpyyntöineen",required:true,blockId:"los1-c10-production-meeting"},
        {id:"L054-S06",title:"Tunnista oppitilanteen toistopyyntö",required:true,exerciseId:"los1-c10-review-repeat"},
        {id:"L054-S07",title:"Järjestä Bernan lähtökaupunki",required:true,exerciseId:"los1-c10-order-berna"},
        {id:"L054-S08",title:"Päätä tapaaminen sopivaan aikaan",required:true,exerciseId:"los1-c10-review-time"},
      ],
    };
    if (lesson.id === "L055") return {
      ...lesson,publicationStatus:"preview" as const,
      steps:[
        {id:"L055-S01",title:"Lue uudestaan Bernan koko alkuperäinen haastattelu",required:true,blockId:"los1-c10-m-dib-01-berna"},
        {id:"L055-S02",title:"Vertaa Haraldin ja Bernan alkuperäisiä tietoja",required:true,blockId:"los1-c10-source-comparison"},
        {id:"L055-S03",title:"Tarkista Bernan lähtöpaikka",required:true,exerciseId:"los1-c10-source-berna-city"},
        {id:"L055-S04",title:"Kirjoita oma kuviteltu kohtaaminen",required:true,blockId:"los1-c10-production-meeting"},
        {id:"L055-S05",title:"Palauta C10:n 20 tehtävän kappalekoe ja itsearvioi tuotokset",required:true,
          chapterTestId:LOS1_C10_TEST.id},
      ],
    };
    if (lesson.id === "L056") return {
      ...lesson,publicationStatus:"preview" as const,
      steps:[
        {id:"L056-S01",title:"Aloita kertaus II: lukuja, tavauksia ja päiviä",required:true,blockId:"los1-review2-intro-a"},
        {id:"L056-S02",title:"Kertaa numeron 17 muoto",required:true,exerciseId:"los1-review2-a01"},
        {id:"L056-S03",title:"Kirjoita numero 20",required:true,exerciseId:"los1-review2-a02"},
        {id:"L056-S04",title:"Tunnista W-kirjaimen nimi",required:true,exerciseId:"los1-review2-a03"},
        {id:"L056-S05",title:"Tunnista nimen alkukirjain",required:true,exerciseId:"los1-review2-a04"},
        {id:"L056-S06",title:"Täydennä viikonpäiväilmaus",required:true,exerciseId:"los1-review2-a05"},
        {id:"L056-S07",title:"Tunnista tasatunti",required:true,exerciseId:"los1-review2-a06"},
        {id:"L056-S08",title:"Laadi itsenäinen kalenterimerkintä",required:true,blockId:"los1-review2-production-a"},
      ],
    };
    if (lesson.id === "L057") return {
      ...lesson,publicationStatus:"preview" as const,
      steps:[
        {id:"L057-S01",title:"Aloita kaikkien kymmenen kappaleen taitosekoitus",required:true,blockId:"los1-review2-intro-b"},
        {id:"L057-S02",title:"Tunnista teitittelevä nimikysymys",required:true,exerciseId:"los1-review2-b01"},
        {id:"L057-S03",title:"Täydennä alkuperäkysymys",required:true,exerciseId:"los1-review2-b02"},
        {id:"L057-S04",title:"Tunnista heikompi vointi",required:true,exerciseId:"los1-review2-b03"},
        {id:"L057-S05",title:"Täydennä toistopyyntö",required:true,exerciseId:"los1-review2-b04"},
        {id:"L057-S06",title:"Esittele Harald oikein",required:true,exerciseId:"los1-review2-b05"},
        {id:"L057-S07",title:"Vertaa lähdehaastateltavia",required:true,exerciseId:"los1-review2-b06"},
        {id:"L057-S08",title:"Kirjoita kaksi kuvitteellista esittelyä",required:true,blockId:"los1-review2-production-b"},
      ],
    };
    if (lesson.id === "L058") return {
      ...lesson,publicationStatus:"preview" as const,
      steps:[
        {id:"L058-S01",title:"Kokoa itsenäinen kohtaaminen",required:true,blockId:"los1-review2-intro-c"},
        {id:"L058-S02",title:"Valitse aloitustervehdys",required:true,exerciseId:"los1-review2-c01"},
        {id:"L058-S03",title:"Esittele kolmas henkilö",required:true,exerciseId:"los1-review2-c02"},
        {id:"L058-S04",title:"Täydennä toisen henkilön nimi",required:true,exerciseId:"los1-review2-c03"},
        {id:"L058-S05",title:"Reagoi toistopyyntöön",required:true,exerciseId:"los1-review2-c04"},
        {id:"L058-S06",title:"Täydennä ajanilmaus",required:true,exerciseId:"los1-review2-c05"},
        {id:"L058-S07",title:"Päätä tapaaminen",required:true,exerciseId:"los1-review2-c06"},
        {id:"L058-S08",title:"Kirjoita täydellinen kahdeksan repliikin harjoitus",required:true,blockId:"los1-review2-production-c"},
      ],
    };
    if (lesson.id === "L059") return {
      ...lesson,publicationStatus:"preview" as const,
      steps:[
        {id:"L059-S01",title:"Lue loppukokeen viisi osa-aluetta ja toisto-ohje",required:true,
          blockId:"los1-final-intro"},
        {id:"L059-S02",title:"Tee 50 pisteen loppukoe sekä kaksi erillistä kirjoitustehtävää",required:true,
          chapterTestId:LOS1_FINAL_TEST.id},
      ],
    };
    if (lesson.id === "L060") return {
      ...lesson,publicationStatus:"preview" as const,
      steps:[
        {id:"L060-S01",title:"Katso mitä olet oppinut saksaksi",required:true,blockId:"los1-summary-intro"},
        {id:"L060-S02",title:"Käy läpi kymmenen osaamistavoitetta",required:true,blockId:"los1-summary-checklist"},
        {id:"L060-S03",title:"Suunnittele oma kertauksesi ja jatkosi",required:true,blockId:"los1-summary-next"},
        {id:"L060-S04",title:"Kirjoita oma seuraava tavoite",required:true,
          reflectionPromptFi:"Minkä kolmen asian osaan nyt saksaksi ilman apua, ja mitä yhtä asiaa harjoittelen seuraavaksi?"},
      ],
    };
    return lesson;
  }) : [],
  blocks: index === 0 ? [...LOS1_INTRO_BLOCKS, ...LOS1_C01_PREVIEW_BLOCKS, ...LOS1_C01_SOURCE_BLOCKS, ...LOS1_C01_GREETING_AUDIO_BLOCKS, ...LOS1_C01_APPLICATION_BLOCKS, ...LOS1_C01_CULTURE_BLOCKS, ...LOS1_C02_WB_BLOCKS, ...LOS1_C02_BLOCKS, ...LOS1_C03_SOURCE_BLOCKS, ...LOS1_C03_CONTENT_BLOCKS, ...LOS1_C04_SOURCE_BLOCKS, ...LOS1_C04_BLOCKS, ...LOS1_C05_SOURCE_BLOCKS, ...LOS1_C05_BLOCKS, ...LOS1_C06_SOURCE_BLOCKS, ...LOS1_C06_CONTENT_BLOCKS, ...LOS1_REVIEW_ONE_BLOCKS, ...LOS1_C07_SOURCE_BLOCKS, ...LOS1_C07_CONTENT_BLOCKS, ...LOS1_C08_CONTENT_BLOCKS, ...LOS1_C08_SOURCE_BLOCKS, ...LOS1_C09_CONTENT_BLOCKS, ...LOS1_C09_TEXT_A_BLOCKS,
    ...LOS1_C10_SOURCE_BLOCKS, ...LOS1_C10_CONTENT_BLOCKS,
    ...LOS1_REVIEW_TWO_BLOCKS, ...LOS1_FINAL_BLOCKS] : [],
  exercises: index === 0 ? [...LOS1_C01_PREVIEW_EXERCISES, ...LOS1_C01_SOURCE_EXERCISES, ...LOS1_C01_AUDIO_COMPREHENSION_EXERCISES, ...LOS1_C01_EXAM_EXERCISES, ...LOS1_C01_ALTERNATE_EXAM_EXERCISES, ...LOS1_C01_EXTRA_EXERCISES, ...LOS1_C01_INTERACTIVE_EXERCISES, ...LOS1_C02_WB_EXERCISES, ...LOS1_C02_EXERCISES, ...LOS1_C02_EXAM_EXERCISES, ...LOS1_C03_SOURCE_EXERCISES, ...LOS1_C03_PRACTICE_EXERCISES, ...LOS1_C03_EXAM_EXERCISES, ...LOS1_C04_SOURCE_EXERCISES, ...LOS1_C04_PRACTICE_EXERCISES, ...LOS1_C04_EXAM_EXERCISES, ...LOS1_C05_SOURCE_EXERCISES, ...LOS1_C05_PRACTICE_EXERCISES, ...LOS1_C05_EXAM_EXERCISES, ...LOS1_C06_SOURCE_EXERCISES, ...LOS1_C06_PRACTICE_EXERCISES, ...LOS1_C06_EXAM_EXERCISES, ...LOS1_REVIEW_ONE_EXERCISES, ...LOS1_MIDTERM_FORM_A, ...LOS1_MIDTERM_FORM_B, ...LOS1_C07_SOURCE_EXERCISES, ...LOS1_C07_PRACTICE_EXERCISES, ...LOS1_C07_EXAM_A, ...LOS1_C07_EXAM_B, ...LOS1_C08_SOURCE_EXERCISES, ...LOS1_C08_PRACTICE_EXERCISES, ...LOS1_C08_EXAM_A, ...LOS1_C08_EXAM_B,
    ...LOS1_C09_SOURCE_EXERCISES, ...LOS1_C09_TEXT_A_EXERCISES, ...LOS1_C09_PRACTICE_EXERCISES,
    ...LOS1_C09_EXAM_A, ...LOS1_C09_EXAM_B,
    ...LOS1_C10_SOURCE_EXERCISES, ...LOS1_C10_PRACTICE_EXERCISES,
    ...LOS1_C10_EXAM_A, ...LOS1_C10_EXAM_B,
    ...LOS1_REVIEW_TWO_EXERCISES, ...LOS1_FINAL_FORM_A, ...LOS1_FINAL_FORM_B] : [],
  chapterTests: index === 0 ? [LOS1_C01_TEST, LOS1_C02_TEST, LOS1_C03_TEST, LOS1_C04_TEST, LOS1_C05_TEST, LOS1_C06_TEST, LOS1_C07_TEST, LOS1_C08_TEST, LOS1_C09_TEST, LOS1_C10_TEST, LOS1_MIDTERM_TEST, LOS1_FINAL_TEST] : [],
  sources: index === 0 ? LOS1_RESEARCH_SOURCES.map(source => source.id === "M-WB-07" ? {
    ...source,
    originalUrl:"https://en.wikibooks.org/w/index.php?title=Deutschkurs_für_Anfänger/Lektion_012&oldid=3823563",
    author:"Deutschkurs für Anfänger -oppikirjan Wikibooks-yhteiskirjoittajat (versio 3823563)",
    publisher:"Wikibooks / Wikimedia",
    licenseOrBasis:"CC BY-SA 4.0 · valittu harjoitus 562 kokonaisuudessaan, 15 saksankielistä ilmausta",
    licenseUrl:"https://creativecommons.org/licenses/by-sa/4.0/",
    permittedMode:"hosted" as const,
    readiness:"text-cleared" as const,
    verifiedAt:"2026-11-11",
    modification:"Saksankieliset 15 fraasia ovat alkuperäisessä järjestyksessä. LOS!:n suomennokset, selitykset ja tehtävät on kirjoitettu erikseen.",
    publicationNoteFi:"C08 Text A on nyt kokonainen julkaistu 15 rivin fraasiluettelo, ei dialogi eikä kuuntelu. Lähde on erillinen COERLL:n vielä keskeneräisestä M-DIB-04-haastattelusta.",
  } : source.id === "M-COM-01" ? {
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
  } : source.id === "M-WB-01" ? {
    ...source,
    originalUrl: "https://en.wikibooks.org/w/index.php?title=German/Level_I/Wie_heißt_du&oldid=4430449",
    author: "Wikibooks German Level I -yhteiskirjoittajat (versio 4430449)",
    publisher: "Wikibooks / Wikimedia",
    licenseOrBasis: "CC BY-SA 4.0 · koko alkuperäinen kuusirepliikkinen saksankielinen dialogi",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    permittedMode: "hosted" as const,
    readiness: "text-cleared" as const,
    verifiedAt: "2026-11-11",
    modification: "Saksankieliset kuusi repliikkiä täsmälleen lähdeversiosta; LOS!:n omat suomennokset, opastus ja tehtävät lisätty. Lisätyt käännökset lisensoidaan CC BY-SA 4.0 -ehdoilla.",
    publicationNoteFi: "Alkuperäisen tekstin täsmäversio on 4430449 (2024-09-02). Wikibooksin erillinen alkuperäisäänite on lisensoitu public domainiin ja merkitty omalla lähteellään M-COM-04.",
  } : source.id === "M-DIB-02" ? {
    ...source,
    originalUrl:"https://coerll.utexas.edu/dib/vidt.php?f=01_22_int_hb_who",
    author:"Harald Becker (haastateltava); Deutsch im Blick -toimitus, Dr. Zsuzsanna Abrams",
    publisher:"University of Texas at Austin / COERLL",
    licenseOrBasis:"CC BY 4.0 · alkuperäisen haastattelun saksankielinen litteraatti",
    licenseUrl:"https://creativecommons.org/licenses/by/4.0/",
    permittedMode:"hosted" as const,
    readiness:"text-cleared" as const,
    verifiedAt:"2026-11-11",
    modification:"Kaikki Harald-haastattelun kysymys–vastausparit sisältyvät, mutta yksi puhelinnumero on poistettu ja merkitty näkyvästi. Suomennokset ja selitykset ovat LOS!:n omia.",
    publicationNoteFi:"Harald kertoo olevansa noin viisikymppinen, ei täsmälleen 50. Video ei ole mukana: sen tiedostokohtainen oikeus ja media-upotuksen toiminta vaativat lisätarkistuksen.",
  } : source.id === "M-WB-02" ? {
    ...source,
    originalUrl:"https://en.wikibooks.org/w/index.php?title=German/Level_I/Bitte_buchstabieren_Sie&oldid=3504939",
    author:"Wikibooksin saksankurssin yhteiskirjoittajat",
    publisher:"Wikibooks / Wikimedia",
    licenseOrBasis:"CC BY-SA 4.0 · koko viiden repliikin Fernsprechauskunft -dialogi",
    licenseUrl:"https://creativecommons.org/licenses/by-sa/4.0/",
    permittedMode:"hosted" as const,
    readiness:"text-cleared" as const,
    verifiedAt:"2026-11-11",
    modification:"Lähteen viisi repliikkiä alkuperäisessä järjestyksessä ja täsmällisillä saksankielisillä sanoilla. Suomentamiset, selitykset ja tehtävät ovat LOS!:n omia.",
    publicationNoteFi:"Wikibooksin koko autenttinen puhelukeskustelu on LOS!:n sisällä. Alkuperäinen päättyy 'Die Nummer lautet ...'; siinä ei ole kerrottua puhelinnumeroa. Alkuperäisen dialogin oman äänitteen oikeus ja upotus vielä varmistamatta.",
  } : source.id === "M-DIB-06" ? {
    ...source,
    originalUrl:"https://coerll.utexas.edu/dib/pho.php?k=1",
    author:"Dr. Zsuzsanna Abrams ja Deutsch im Blick -toimitus",
    publisher:"University of Texas at Austin / COERLL",
    licenseOrBasis:"CC BY 4.0 · Das Alphabet -sivun järjestetty koko aakkosmerkkilista",
    licenseUrl:"https://creativecommons.org/licenses/by/4.0/",
    permittedMode:"hosted" as const,
    readiness:"text-cleared" as const,
    verifiedAt:"2026-11-11",
    modification:"Alkuperäisen COERLL-listan kaikki 30 aakkosmerkkiä säilytetty alkuperäisessä järjestyksessä. Suomenkieliset opastukset LOS!:n omia; äänitiedostoja ei kopioitu.",
    publicationNoteFi:"Tekstilista on kokonaisuudessaan LOS!:n sisällä. COERLL:n omien äänitiedostojen tiedostokohtainen lisenssi ja suora upotus vaativat yhä tarkistuksen. Erillinen Timwin public domain -äänite on merkitty omalla lähteellään.",
  } : source.id === "M-WB-03" ? {
    ...source,
    originalUrl:"https://en.wikibooks.org/w/index.php?title=German/Level_I/Freizeit&oldid=4003622",
    author:"Wikibooks German Level I -yhteiskirjoittajat (versio 4003622)",
    publisher:"Wikibooks / Wikimedia",
    licenseOrBasis:"CC BY-SA 4.0 · koko alkuperäinen Sport und Zeit, 7 repliikkiä",
    licenseUrl:"https://creativecommons.org/licenses/by-sa/4.0/",
    permittedMode:"hosted" as const,
    readiness:"text-cleared" as const,
    verifiedAt:"2026-11-11",
    modification:"Kaikki seitsemän alkuperäistä saksankielistä repliikkiä ovat suoraan lukijassa. Suomennokset ja ymmärtämistehtävät on laadittu erikseen LOS!:iin; äänitettä ei ole kopioitu tai upotettu.",
    publicationNoteFi:"Koko alkuperäinen Franzin ja Gretan 7-repliikkinen Sport und Zeit -dialogi on nyt luettavissa LOS!:ssa. Wikibooksin lähde ilmoittaa artikkelivirheestä vanhassa äänitteessä (das Fußball); ääni on estetty eikä sitä väitetä hyväksytyksi.",
  } : source.id === "M-WB-04" ? {
    ...source,
    originalUrl:"https://en.wikibooks.org/w/index.php?title=German/Level_I/Geburtstag&oldid=4408402",
    author:"Wikibooks German Level I -yhteiskirjoittajat (versio 4408402)",
    publisher:"Wikibooks / Wikimedia",
    licenseOrBasis:"CC BY-SA 4.0 · Days and Months -osion valittu seitsemän viikonpäivän luettelo",
    licenseUrl:"https://creativecommons.org/licenses/by-sa/4.0/",
    permittedMode:"hosted" as const,
    readiness:"text-cleared" as const,
    verifiedAt:"2026-11-11",
    modification:"Kaikki seitsemän viikonpäivän saksankielistä nimeä ovat alkuperäisessä järjestyksessä. LOS!:n omat suomenkieliset selitykset ja tehtävät on lisätty.",
    publicationNoteFi:"Kokonainen valittu seitsemän sanan listaus on LOS!:n Text B -sivulla. Kyseessä on sanaluettelo, ei video tai äänite. Erillinen Die Woche -audio odottaa tiedostokohtaista tarkistusta.",
  } : source.id === "M-WB-05" ? {
    ...source,
    originalUrl:"https://en.wikibooks.org/w/index.php?title=German/Lesson_1&oldid=3823655",
    author:"Wikibooks German/Lesson 1 -yhteiskirjoittajat",
    publisher:"Wikibooks / Wikimedia",
    licenseOrBasis:"CC BY-SA 4.0 · koko neljän repliikin Gespräch 1-1 Die Freunde",
    licenseUrl:"https://creativecommons.org/licenses/by-sa/4.0/",
    permittedMode:"hosted" as const,
    readiness:"text-cleared" as const,
    verifiedAt:"2026-11-11",
    modification:"Kaikki neljä saksankielistä repliikkiä lähdejärjestyksessä. Suomenkieliset käännökset, opastukset ja tehtävät LOS!:n lisäämiä.",
    publicationNoteFi:"Heinrichin ja Karlin autenttinen teksti on kokonaan kirjan lukijassa. Wikibooksin mahdollisen oman äänen mediatiedostoa ei ole merkitty valmiiksi.",
  } : source.id === "M-DIB-05" ? {
    ...source,
    originalUrl:"https://coerll.utexas.edu/dib/voc.php?k=1&s=1",
    author:"COERLL / Deutsch im Blick -oppikirjan tekijät",
    publisher:"University of Texas at Austin / COERLL",
    licenseOrBasis:"CC BY 4.0 · Kapitel 1, Wie geht's? -vointisanastolista",
    licenseUrl:"https://creativecommons.org/licenses/by/4.0/",
    permittedMode:"hosted" as const,
    readiness:"text-cleared" as const,
    verifiedAt:"2026-11-11",
    modification:"Koko 13 ilmauksen positiivinen/negatiivinen vointilista lähdejärjestyksessä. Suomenkieliset selitykset ovat LOS!:n omia.",
    publicationNoteFi:"Teksti on kokonaan LOS!:ssa. COERLL:n ääniosan täsmällinen mediaosoite ja käyttötapa ovat edelleen tutkittavana. Sitä ei ole väitetty toistetuksi.",
  } : source.id === "M-WB-06" ? {
    ...source,
    originalUrl: "https://en.wikibooks.org/wiki/German/Lesson_2",
    author: "Wikibooks German/Lesson 2 -yhteiskirjoittajat",
    publisher: "Wikibooks / Wikimedia",
    licenseOrBasis: "CC BY-SA 4.0 · saksankielinen kahdeksan repliikin Gespräch 2-2",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    permittedMode: "hosted" as const,
    readiness: "text-cleared" as const,
    verifiedAt: "2026-11-11",
    modification: "Alkuperäiset kahdeksan saksankielistä repliikkiä säilytetty kokonaisina lähdejärjestyksessä. Lisätty LOS!:n suomennokset ja tehtävät. Käännösmuunnelmat jakautuvat samoin CC BY-SA 4.0 -ehdoin.",
    publicationNoteFi: "Koko alkuperäisdialogi on LOS!-lukijassa, mutta Wikibooksin erillistä äänitettä ei ole oletettu olemassa olevaksi.",
  } : source.id === "M-DIB-07" ? {
    ...source,
    originalUrl: "https://coerll.utexas.edu/dib/pdfs/k_01.pdf",
    author: "COERLL / Deutsch im Blick -oppikirjan tekijätyöryhmä",
    publisher: "University of Texas at Austin / COERLL",
    licenseOrBasis: "CC BY 4.0 · Kapitel 1, Aktivität 2, sivu 20/484",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    permittedMode: "hosted" as const,
    readiness: "text-cleared" as const,
    verifiedAt: "2026-11-11",
    modification: "Kuusi alkuperäistä saksankielistä kysymystä kopioitu listan järjestyksessä. LOS!:n suomennokset ja tehtävät lisätty. Ääntä ei ole kopioitu eikä oletettu tähän kysymyslistaan liittyväksi.",
    publicationNoteFi: "C04:n Text B on täsmällinen kuuden kysymyksen opetusaineistolohko, ei koko COERLL-kirja eikä äänitallenne. Kysymysten ulkopuolisia henkilötietoja ei ole siirretty.",
  } : source.id === "M-DIB-01" ? {
    ...source,
    author: "Berna Güneli (haastateltava), COERLL / Deutsch im Blick -toimitus",
    licenseOrBasis: "CC BY 4.0 · Deutsch im Blick -oppimateriaalin verkkolitteraatti",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    permittedMode: "hosted" as const,
    readiness: "text-cleared" as const,
    verifiedAt: "2026-11-11",
    modification: "Litteraatin kaikki kysymys-vastausparit sisältyvät saksaksi. Yksi lähteessä julkaistu puhelinnumero on poistettu ja merkitty näkyvästi. Suomennokset ovat LOS!:n lisäämiä.",
    publicationNoteFi: "COERLL ilmoittaa Deutsch im Blick -kokonaisuuden CC BY -lisensoiduksi. Vain teksti julkaistaan LOS!:ssa, haastatteluvideota ei upoteta eikä julkaista ilman erillistä media-QA:ta.",
  } : source).concat([{
    id:"M-COM-07",
    title:"German alphabet-2.ogg · saksankielinen aakkosten lausunta",
    publisher:"Wikimedia Commons / alkuperäinen English Wikipedia",
    author:"Timwi",
    originalUrl:"https://commons.wikimedia.org/wiki/File:German_alphabet-2.ogg",
    licenseOrBasis:"Public domain · tekijän oma 28 sekunnin tallenne, 22.4.2004",
    permittedMode:"embed" as const,
    verifiedAt:"2026-11-11",
    modification:"Ääni upotettu muuttamattomana Wikimediasta, erikseen COERLL:n alkuperäisestä aakkosluettelosta.",
    publicationNoteFi:"Ihmisen nauhoittama 28 sekunnin aakkostoääni, tekijä Timwi. Ei sisällä käyttäjien nimiä tai puhelinnumeroita. Tiedostokohtainen public domain -luovutus vahvistettu; todellinen mobiilitoisto vielä testaamatta.",
  },{
    id:"M-COM-06",
    title:"German Vocabulary - Numbers.ogg · Saksankielinen numerosarja 1–20 ja kymmenluvut",
    publisher:"Wikimedia Commons / Wikibooks",
    author:"Human Robot (English Wikibooks)",
    originalUrl:"https://commons.wikimedia.org/wiki/File:German_Vocabulary_-_Numbers.ogg",
    licenseOrBasis:"Public domain · alkuperäisen tekijän vapaa luovutus, 23.7.2006",
    permittedMode:"embed" as const,
    verifiedAt:"2026-11-11",
    modification:"Saksankielinen numeroiden 1–20, 30–70, 100 ja 1000 litteraatti on kokonaisena LOS!:ssa. Suomenkieliset numeromerkinnät uusia. Ääntä ei ole muokattu LOS!:ssa.",
    publicationNoteFi:"37 sekunnin ihmisen tekemä numeroäänite, jonka ääntä on lähteen mukaan hieman muokattu. Se ei sisällä numeroita null, achtzig eikä neunzig. MP3-muunnos ilmoitettu Commonsissa valmiiksi; todellinen iPhone- ja Android-toisto vielä testaamatta.",
  },{
    id:"M-COM-05",
    title:"De-wie geht es dir.ogg · Wie geht es dir? -ääntämisnäyte",
    author:"Jeuwre (saksaa äidinkielenään puhuva mies Berliinistä)",
    publisher:"Wikimedia Commons",
    originalUrl:"https://commons.wikimedia.org/wiki/File:De-wie_geht_es_dir.ogg",
    licenseOrBasis:"CC BY-SA 4.0 · alkuperäinen ääni 7.5.2017",
    licenseUrl:"https://creativecommons.org/licenses/by-sa/4.0/",
    permittedMode:"embed" as const,
    verifiedAt:"2026-11-11",
    modification:"Ääntä ei ole muokattu LOS!:ssa. OGG ja Wikimedia Commonsin MP3-muunnos valittavissa.",
    publicationNoteFi:"Alkuperäisen natiivipuhujan 1,8 sekunnin lausunto, ei COERLL:n tai Wikibooksin keskustelun audioversio. iPhone/Android-selaintoisto odottaa todellista testausta.",
  },{
    id: "M-COM-04",
    title: "Dialogue franz greta 1.ogg · Wikibooksin Franz–Greta-äänite",
    author: "Human Robot (alkuperäinen tekijä), Recent Runes (äänenvoimakkuuden muokkaus)",
    publisher: "Wikimedia Commons / Wikibooks",
    originalUrl: "https://commons.wikimedia.org/wiki/File:Dialogue_franz_greta_1.ogg",
    licenseOrBasis: "Public domain · alkuperäisen äänitteen tekijän luovutus",
    permittedMode: "embed" as const,
    verifiedAt: "2026-11-11",
    modification: "Äänitettä ei muokata LOS!:ssa. Vuoden 2011 Commons-versiossa äänenvoimakkuutta nostettu; soitin voi käyttää Commonsin valmista MP3-muunnosta.",
    publicationNoteFi: "Alkuperäistiedoston lisenssi ja 20 sekunnin kesto tarkistettu tiedostosivulta. Suoratoiston toimivuutta oikeilla laitteilla ei ole vielä testattu.",
  },{
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
