import { LOS_BOOKS } from "./catalog.ts";

/**
 * LOS! 1:n 60 oppitunnin toimituksellinen kartta.
 * Nimet ja jaksotus: LOS1_SOURCE_MANIFEST_v1.0.
 * Pelkkä polkukartta ei ilmaise opetusaineiston valmistumista.
 */
export type LosLesson = {
  number: number;
  title: string;
  section: string;
  chapter: string | null;
  destination: "chapter" | "text" | "vocabulary" | "grammar" | "practice" | "appendix";
};
const chapterTitles: Record<string, [string, string, string, string, string]> = {
  "01": ["Aloita saksan ääntämisestä", "Lue Franzin ja Jörgin keskustelu", "Tervehdykset muistista", "Kuuntele ja valitse tervehdys", "Harjoittele ja testaa C01"],
  "02": ["Miten kysyn nimen?", "Franz ja Greta: kokonainen dialogi", "Heißen ja sein minä–sinä", "Kuuntele ja esittele henkilö", "Harjoittele ja testaa C02"],
  "03": ["Maat ja paikat", "Lisa Müllerin alkuperäkeskustelu", "Kommen ja woher", "Alkuperä ja karttatehtävät", "Harjoittele ja testaa C03"],
  "04": ["Milloin du tai Sie?", "Herr Schmidt ja Herr Standish: koko dialogi", "Kohtelias verbinmuoto", "Käytä kohteliaisuusfraaseja", "Harjoittele ja testaa C04"],
  "05": ["Mitä kuuluu?", "Lue vointidialogi", "Vointifraasit ja nicht", "Vertaa vointidialogeja ja vastaa", "Harjoittele ja testaa C05"],
  "06": ["Numerot 0–12", "Numerot 13–20 ja ikä", "Numerot 21–100: rakenne", "Kertaa alkuperäinen ikäkeskustelu", "Harjoittele ja testaa C06"],
  "07": ["Aakkosten ja nimen kertaus", "Lue tavaamiskeskustelu", "Tavaa ja ymmärrä numeroita", "Tavaa ja täytä harjoituslomake", "Harjoittele ja testaa C07"],
  "08": ["Selviytymisfraasit", "Luokkatilanteen alkuperäisteksti", "Kuuntelustrategiat ja selityspyynnöt", "Harjoittele vuorovaikutusta", "Harjoittele ja testaa C08"],
  "09": ["Viikonpäivät", "Lue Sport und Zeit", "Am Montag, um drei Uhr", "Lue ja merkitse kalenteriin", "Harjoittele ja testaa C09"],
  "10": ["Kokoa esittelyfraasit", "Kuuntele Haraldin haastattelu", "Esittele kolmas henkilö", "Rakenna kaksi keskustelua", "Harjoittele ja testaa C10"],
};
const phases = ["chapter", "text", "grammar", "text", "practice"] as const;
const lessons: LosLesson[] = [];
const push = (title: string, section: string, chapter: string | null, destination: LosLesson["destination"]) => {
  lessons.push({ number: lessons.length + 1, title, section, chapter, destination });
};
push("Miten LOS! 1:llä opiskellaan?", "Kirjan aloitus", null, "appendix");
for (const chapter of LOS_BOOKS[0]?.chapters ?? []) {
  if (Number(chapter.id) === 6) {
    // Neljä erillistä kertaus-/koetuntia ennen kirjan jälkipuoliskoa.
    push("Muistanko tervehtimisen ja esittäytymisen?", "Kertaus I", "01", "practice");
    push("Voinnin ja kohteliaisuuden taitosekoitus", "Kertaus I", "05", "practice");
    push("Autenttisen keskustelun kertaus (kuuntelu valinnainen)", "Kertaus I", "02", "text");
    push("Välikoe: kappaleet 1–5", "Välikoe", null, "appendix");
  }
  const titles = chapterTitles[chapter.id];
  if (!titles) continue;
  titles.forEach((title, i) => push(title, `Kappale ${Number(chapter.id)}`, chapter.id, phases[i] ?? "chapter"));
}
push("Luvut, tavaaminen ja viikonpäivät", "Kertaus II", "06", "practice");
push("Kaikkien 10 kappaleen taitosekoitus", "Kertaus II", "10", "practice");
push("Täydellinen esittelyharjoitus ilman vihjeitä", "Kertaus II", "10", "practice");
push("Koko kirjan loppukoe", "Loppukoe", null, "appendix");
push("Mitä osaan nyt saksaksi?", "Yhteenveto", null, "appendix");
export const LOS_1_LESSONS: ReadonlyArray<LosLesson> = lessons;
export const LOS_1_LESSON_PHASES = Object.freeze(chapterTitles);
