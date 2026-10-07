export type Bi05ExamKey = "exam-1" | "exam-2";

export type Bi05Subchapter = {
  code: string;
  title: string;
  name: string;
  chapter: number;
  part: string;
  position: number;
  weight: number;
  importance: number;
  estimatedMinutes: number;
  materials: string;
  schoolCovered: boolean;
  examEligible: boolean;
};

export const BI05_COURSE = {
  code: "BI05",
  name: "Ihmisen biologia",
  subject: "Biologia",
  textbook: "Iiris 5 · Ihmisen biologia",
  startDate: "2026-10-06",
  targetSystem: "school",
  targetValue: "10",
  weeklyMinutes: 180,
  // Legacy single-date consumers use the next known exam. Multi-exam logic
  // must use BI05_EXAMS / public.exams as the source of truth.
  legacyExamDate: "2026-10-29",
} as const;

export const BI05_EXAMS = [
  { key: "exam-1" as const, name: "BI05 koe 1", date: "2026-10-29", targetSystem: "school", targetValue: "10" },
  { key: "exam-2" as const, name: "BI05 koe 2", date: "2026-11-20", targetSystem: "school", targetValue: "10" },
] as const;

/**
 * Teacher-confirmed fact: chapter 5 is outside both course exams.
 * The remaining split is only a planning estimate until the teacher confirms
 * the exact scopes. Never present the provisional rows as confirmed scope.
 */
export const BI05_EXCLUDED_EXAM_CHAPTERS = [5] as const;
export const BI05_PROVISIONAL_EXAM_CHAPTERS: Record<Bi05ExamKey, readonly number[]> = {
  "exam-1": [1, 2, 3, 4, 6, 7, 8],
  "exam-2": [9, 10, 11, 12, 13, 14],
};

type RawChapter = readonly [
  number,
  string,
  string,
  number,
  number,
  readonly (readonly [string, string, number])[],
];

const I = "I Elimistön säätely ja viestintä";
const II = "II Aineenvaihdunta ja liikkuminen";
const III = "III Puolustusjärjestelmä ja lisääntyminen";

const RAW_CHAPTERS: readonly RawChapter[] = [
  [1,I,"Ihminen koostuu soluista",7,4,[["1.1","Kudokset",25],["1.2","Elimet ja elimistöt",25],["1.3","Kantasolut",25],["1.4","Solujen välinen yhteistyö",25],["1.5","Syöpä",35]]],
  [2,I,"Hormonit välittävät viestejä",8,5,[["2.1","Elimistön säätelyjärjestelmä",30],["2.2","Rasva- ja vesiliukoiset hormonit",35],["2.3","Hormonierityksen säätely",35],["2.4","Homeostasian säätely",35],["2.5","Vuorokausirytmin säätely",25]]],
  [3,I,"Hermosolussa viesti kulkee nopeasti",8,5,[["3.1","Hermosolun rakenne",30],["3.2","Hermoimpulssin kulku",45],["3.3","Synapsien toiminta",40]]],
  [4,I,"Aivot ohjaavat elimistöä",7,4,[["4.1","Hermoston rakenne",35],["4.2","Aivojen rakenne ja toiminta",50]]],
  [5,I,"Aistit vastaanottavat informaatiota",8,4,[["5.1","Aistirata",25],["5.2","Makuaisti",20],["5.3","Hajuaisti",20],["5.4","Näköaisti",45],["5.5","Kuuloaisti",45],["5.6","Asento-, liike- ja tasapainoaisti",30]]],
  [6,I,"Iho on elimistön suurin elin",5,3,[["6.1","Ihon rakenne",30],["6.2","Ihon aistit",25],["6.3","Iho ja lämmönsäätely",35]]],
  [7,II,"Verenkiertoelimistö huoltaa kehoa",10,5,[["7.1","Veri",35],["7.2","Sydän",40],["7.3","Verisuonet",30],["7.4","Imusuonisto",25],["7.5","Pieni ja suuri verenkierto",35],["7.6","Verenpaine",30],["7.7","Verenkierron ja verenpaineen säätely",35]]],
  [8,II,"Hengitystä tarvitaan energian vapauttamiseen",7,4,[["8.1","Hengityselimistö",35],["8.2","Hengitys",40],["8.3","Hengityksen säätely",35]]],
  [9,II,"Elimistöä ravitseva ruuansulatus",7,4,[["9.1","Ruuansulatuselimistö",35],["9.2","Ravintoaineiden hajoaminen",40],["9.3","Ravintoaineiden imeytyminen",35],["9.4","Ruuansulatuksen ja ruokahalun säätely",30]]],
  [10,II,"Munuaiset ja maksa ovat tärkeitä erityselimiä",7,5,[["10.1","Maksan tehtävät ja toiminta",35],["10.2","Munuaisten tehtävät",25],["10.3","Munuaisten toiminta",45],["10.4","Virtsatiet",25]]],
  [11,II,"Ihminen liikkuu luiden ja lihasten avulla",6,4,[["11.1","Luuston tehtävät ja rakenne",30],["11.2","Luiden väliset liitokset",25],["11.3","Lihasten tehtävät ja rakenne",30],["11.4","Luustolihaksen toiminta",40]]],
  [12,III,"Puolustusjärjestelmä suojaa elimistöä",9,5,[["12.1","Mikrobit",25],["12.2","Vieraiden rakenteiden tunnistaminen",30],["12.3","Synnynnäinen puolustus",35],["12.4","Hankittu puolustus",45],["12.5","Allergia",25],["12.6","Veriryhmät",30],["12.7","Aktiivinen ja passiivinen immunisaatio",30]]],
  [13,III,"Sukuelimet ja sukupuolen kehitys",5,4,[["13.1","Miehen sukuelimet",30],["13.2","Naisen sukuelimet",30],["13.3","Kuukautiskierto",45],["13.4","Sukupuoliominaisuuksien muutokset elinkierron aikana",30]]],
  [14,III,"Yksilönkehityksen ratkaisevat alkuvaiheet",6,4,[["14.1","Hedelmöitys",30],["14.2","Raskauden vaiheet",35],["14.3","Istukka",25],["14.4","Sikiönkehityksen seuranta",30],["14.5","Synnytys",30],["14.6","Raskauteen liittyviä ongelmia",25]]],
] as const;

export const BI05_CHAPTERS = RAW_CHAPTERS.map(([number, part, title, weight, importance, subchapters]) => ({
  number, part, title, weight, importance,
  subchapters: subchapters.map(([code, subchapterTitle, estimatedMinutes]) => ({ code, title: subchapterTitle, estimatedMinutes })),
}));

export const BI05_IIRIS5_TOPICS: Bi05Subchapter[] = (() => {
  let position = 0;
  return RAW_CHAPTERS.flatMap(([chapter, part, chapterTitle, chapterWeight, importance, subchapters]) => {
    const childWeight = chapterWeight / subchapters.length;
    return subchapters.map(([code, title, estimatedMinutes]) => {
      position += 1;
      return {
        code,
        title,
        name: `${code} ${title}`,
        chapter,
        part,
        position,
        weight: childWeight,
        importance,
        estimatedMinutes,
        materials: `${BI05_COURSE.textbook} · luku ${chapter}: ${chapterTitle} · työmääräarvio ${estimatedMinutes} min`,
        schoolCovered: code === "1.1",
        examEligible: chapter !== 5,
      };
    });
  });
})();

export function bi05ChapterForTopicName(name: string) {
  const match = /^(\d{1,2})\./.exec(name.trim());
  if (!match) return null;
  const chapter = Number(match[1]);
  return BI05_CHAPTERS.find((row) => row.number === chapter) ?? null;
}

export function bi05ProvisionalExamKeyForChapter(chapter: number): Bi05ExamKey | null {
  if (chapter === 5) return null;
  if (BI05_PROVISIONAL_EXAM_CHAPTERS["exam-1"].includes(chapter)) return "exam-1";
  if (BI05_PROVISIONAL_EXAM_CHAPTERS["exam-2"].includes(chapter)) return "exam-2";
  return null;
}
