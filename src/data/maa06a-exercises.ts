export type Maa06aExerciseSource = "textbook" | "textbook_review" | "review_worksheet";

export type Maa06aExerciseSeed = {
  code: string;
  source: Maa06aExerciseSource;
  sourceGroup: "chapter" | "K" | "A" | "B" | "worksheet";
  section: string | null;
  chapter: number | null;
  topicName: string | null;
  level: 1 | 2 | 3 | null;
  teacherRecommended: boolean;
  countsTowardGoal: true;
  estimatedLoad: number;
  sortOrder: number;
};

type NormalRow = {
  section: string;
  chapter: number;
  topicName: string;
  levels: Record<1 | 2 | 3, string[]>;
  recommended: string[];
};

/**
 * MAA06A "Tukea tehtävien valintaan" -taulukko.
 * Alleviivatut tehtävät on merkitty teacherRecommended=true.
 * Lähdekuvan erikoiset 10.x-tehtävänumerot kappaleen 13 rivillä säilytetään
 * tarkoituksella täsmälleen opettajan taulukon mukaisina.
 */
export const MAA06A_NORMAL_ROWS: NormalRow[] = [
  {
    section: "OSA 1",
    chapter: 1,
    topicName: "Funktion raja-arvo",
    levels: {
      1: ["1.1", "1.3", "1.4", "1.13", "1.5"],
      2: ["1.6", "1.8", "1.9", "1.10", "1.14", "1.16"],
      3: [],
    },
    recommended: ["1.3", "1.4", "1.5", "1.6", "1.8", "1.10", "1.13", "1.14", "1.16"],
  },
  {
    section: "OSA 1",
    chapter: 2,
    topicName: "Raja-arvon laskeminen",
    levels: {
      1: ["2.1", "2.4", "2.7", "2.11", "2.12"],
      2: ["2.3", "2.6", "2.8", "2.9", "2.13", "2.16"],
      3: ["2.10", "2.19", "2.20", "2.21"],
    },
    recommended: ["2.3", "2.13", "2.16", "2.19", "2.20"],
  },
  {
    section: "OSA 1",
    chapter: 3,
    topicName: "Funktion jatkuvuus",
    levels: {
      1: ["3.1", "3.4", "3.5", "3.6", "3.8"],
      2: ["3.2", "3.3", "3.7", "3.12", "3.14", "3.15"],
      3: ["3.16", "3.19", "3.20", "3.21"],
    },
    recommended: ["3.1", "3.2", "3.3", "3.5", "3.7", "3.8", "3.16", "3.20", "3.21"],
  },
  {
    section: "OSA 2",
    chapter: 4,
    topicName: "Derivaatan käsite",
    levels: {
      1: ["4.1", "4.2", "4.7", "4.11"],
      2: ["4.3", "4.4", "4.6", "4.14", "4.15", "4.16"],
      3: ["4.21", "4.22", "4.23", "4.24"],
    },
    recommended: ["4.1", "4.3", "4.4", "4.6", "4.11", "4.14", "4.15", "4.21"],
  },
  {
    section: "OSA 2",
    chapter: 5,
    topicName: "Derivaatan määritelmä",
    levels: {
      1: [],
      2: ["5.1", "5.2", "5.4", "5.5", "5.8", "5.12"],
      3: ["5.15", "5.16", "5.21"],
    },
    recommended: ["5.1", "5.2", "5.4", "5.5", "5.8", "5.15"],
  },
  {
    section: "OSA 3",
    chapter: 6,
    topicName: "Polynomifunktion derivaatta",
    levels: {
      1: ["6.1", "6.2", "6.3", "6.11", "6.12"],
      2: ["6.4", "6.5", "6.14", "6.15", "6.16", "6.17"],
      3: ["6.19", "6.20", "6.21"],
    },
    recommended: ["6.1", "6.2", "6.3", "6.4", "6.5", "6.14", "6.15", "6.16", "6.19"],
  },
  {
    section: "OSA 3",
    chapter: 7,
    topicName: "Tangentin ja normaalin yhtälö",
    levels: {
      1: ["7.1", "7.2", "7.5", "7.11"],
      2: ["7.4", "7.6", "7.7", "7.8", "7.10", "7.17"],
      3: ["7.19", "7.20", "7.22"],
    },
    recommended: ["7.1", "7.4", "7.5", "7.8", "7.17", "7.20"],
  },
  {
    section: "OSA 3",
    chapter: 8,
    topicName: "Polynomifunktion kulku",
    levels: {
      1: ["8.1"],
      2: ["8.2", "8.7", "8.11", "8.15", "8.16"],
      3: ["8.20", "8.21"],
    },
    recommended: ["8.1", "8.2", "8.7", "8.11", "8.15", "8.20"],
  },
  {
    section: "OSA 3",
    chapter: 8,
    topicName: "Polynomifunktion ääriarvot",
    levels: {
      1: ["8.8", "8.5", "8.6"],
      2: ["8.3", "8.4", "8.9", "8.10", "8.14", "8.17"],
      3: ["8.19"],
    },
    recommended: ["8.3", "8.4", "8.5", "8.8", "8.17", "8.19"],
  },
  {
    section: "OSA 3",
    chapter: 9,
    topicName: "Polynomifunktion suurin ja pienin arvo",
    levels: {
      1: ["9.1", "9.2", "9.6", "9.11", "9.12"],
      2: ["9.5", "9.7", "9.8", "9.14", "9.16"],
      3: ["9.19", "9.21", "9.22"],
    },
    recommended: ["9.2", "9.7", "9.12", "9.14", "9.16", "9.19"],
  },
  {
    section: "OSA 3",
    chapter: 10,
    topicName: "Bolzanon lause",
    levels: {
      1: [],
      2: ["10.1", "10.5", "10.6", "10.11", "10.16", "10.19"],
      3: ["10.17", "10.18", "10.22", "10.23"],
    },
    recommended: ["10.1", "10.5", "10.6", "10.17", "10.22"],
  },
  {
    section: "OSA 4",
    chapter: 11,
    topicName: "Tulon ja osamäärän derivaatta",
    levels: {
      1: ["11.1", "11.2", "11.3", "11.4", "11.5"],
      2: ["11.7", "11.9", "11.11", "11.12", "11.14", "11.15"],
      3: ["11.18", "11.19", "11.21"],
    },
    recommended: ["11.3", "11.5", "11.9", "11.15", "11.18"],
  },
  {
    section: "OSA 4",
    chapter: 12,
    topicName: "Rationaalifunktion ääriarvot",
    levels: {
      1: ["12.3", "12.5", "12.7", "12.14"],
      2: ["12.2", "12.9", "12.11", "12.15", "12.18"],
      3: ["12.19", "12.20"],
    },
    recommended: ["12.2", "12.3", "12.5", "12.9", "12.18"],
  },
  {
    section: "OSA 4",
    chapter: 13,
    topicName: "Sovellustehtäviä rationaalifunktioista",
    levels: {
      1: ["10.3"],
      2: ["10.7", "10.12", "13.4", "13.7", "13.8"],
      3: ["10.20", "13.9", "13.16"],
    },
    recommended: ["10.3", "10.12", "10.20", "13.7", "13.16"],
  },
  {
    section: "OSA 5",
    chapter: 14,
    topicName: "Yhdistetty funktio",
    levels: {
      1: ["14.1", "14.2", "14.8", "14.9", "14.11"],
      2: ["14.3", "14.4", "14.5", "14.12", "14.18", "14.20"],
      3: ["14.19", "14.22", "14.23"],
    },
    recommended: ["14.1", "14.3", "14.4", "14.8", "14.12", "14.19", "14.20"],
  },
  {
    section: "OSA 5",
    chapter: 15,
    topicName: "Yhdistetyn funktion derivaatta",
    levels: {
      1: ["15.1", "15.2", "15.3", "15.4", "15.11"],
      2: ["15.5", "15.6", "15.7", "15.15", "15.16", "15.18"],
      3: ["15.22", "15.23", "15.24"],
    },
    recommended: ["15.1", "15.3", "15.6", "15.7", "15.15", "15.16", "15.18"],
  },
  {
    section: "OSA 6",
    chapter: 16,
    topicName: "Juurifunktion derivaatta",
    levels: {
      1: ["16.1", "16.2", "16.11", "16.12"],
      2: ["16.5", "16.7", "16.13", "16.16", "16.17", "16.19"],
      3: ["16.20", "16.21"],
    },
    recommended: ["16.1", "16.2", "16.5", "16.7", "16.13", "16.16"],
  },
  {
    section: "OSA 6",
    chapter: 17,
    topicName: "Juurifunktion ääriarvot",
    levels: {
      1: ["17.1", "17.2", "17.7", "17.8", "17.12"],
      2: ["17.3", "17.6", "17.10", "17.13", "17.14", "17.15"],
      3: ["17.5", "17.16", "17.17", "17.19"],
    },
    recommended: ["17.1", "17.3", "17.5", "17.7", "17.10", "17.14"],
  }
];

const normalExercises: Maa06aExerciseSeed[] = [];
let order = 1;
for (const row of MAA06A_NORMAL_ROWS) {
  const recommended = new Set(row.recommended);
  for (const level of [1, 2, 3] as const) {
    for (const code of row.levels[level]) {
      normalExercises.push({
        code,
        source: "textbook",
        sourceGroup: "chapter",
        section: row.section,
        chapter: row.chapter,
        topicName: row.topicName,
        level,
        teacherRecommended: recommended.has(code),
        countsTowardGoal: true,
        estimatedLoad: level === 1 ? 1 : level === 2 ? 1.3 : 1.7,
        sortOrder: order++,
      });
    }
  }
}

const textbookReview: Maa06aExerciseSeed[] = [
  ...Array.from({ length: 57 }, (_, index) => `K${index + 1}`),
  "A1", "A2", "A4", "A5", "A6", "A7", "A8", "A9", "A10",
  "B2", "B3", "B4", "B7", "B8", "B10",
].map((code, index) => ({
  code,
  source: "textbook_review" as const,
  sourceGroup: code.startsWith("K") ? "K" as const : code.startsWith("A") ? "A" as const : "B" as const,
  section: null,
  chapter: null,
  topicName: null,
  level: null,
  teacherRecommended: false,
  countsTowardGoal: true as const,
  estimatedLoad: 1.3,
  sortOrder: 10_000 + index,
}));

const worksheetReview: Maa06aExerciseSeed[] = Array.from({ length: 15 }, (_, index) => ({
  code: String(index + 1),
  source: "review_worksheet" as const,
  sourceGroup: "worksheet" as const,
  section: null,
  chapter: null,
  topicName: null,
  level: null,
  teacherRecommended: false,
  countsTowardGoal: true as const,
  estimatedLoad: 1.3,
  sortOrder: 20_000 + index,
}));

export const MAA06A_EXERCISE_SEED: Maa06aExerciseSeed[] = [
  ...normalExercises,
  ...textbookReview,
  ...worksheetReview,
];

export const MAA06A_TOPICS = MAA06A_NORMAL_ROWS.map((row, index) => ({
  name: row.topicName,
  section: row.section,
  chapter: row.chapter,
  position: index + 1,
  exerciseCount: Object.values(row.levels).flat().length,
}));

export const MAA06A_REVIEW_COUNTS = {
  textbook: textbookReview.length,
  worksheet: worksheetReview.length,
  total: textbookReview.length + worksheetReview.length,
} as const;

export const MAA06A_RESOURCE_URL =
  "https://sites.google.com/view/toninmatikkamaailma/etusivu/maa6-alkuosa";
