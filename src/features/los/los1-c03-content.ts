/** C03 original teaching notes and exact human original Text B. No generated
 * material is presented as a human-authored licensed original text.
 */
import type { ContentBlock } from "./model";
import { ariserTranscript } from "./los1-authentic-ariser.ts";

export const LOS1_C03_CONTENT_BLOCKS: ContentBlock[] = [
  {
    id: "los1-c03-orientation", version: "0.1.0", kind: "paragraph", language: "fi",
    text: "Osaat jo sanoa nimesi. Nyt kysyt, mistä toinen on kotoisin, ja vastaat oman maan tai kaupungin. "
      + "Tärkeimmät uudet ilmaukset ovat Woher kommst du? ja Ich komme aus … "
      + "Tässä kappaleessa harjoitellaan ich komme ja du kommst; er/sie kommt on aluksi tunnistamista varten. "
      + "Kertaa myös C02:n Ich heiße … ja C01:n Hallo! ennen uuden tekstin lukemista.",
  },
  {
    id: "los1-c03-first-phrase", version: "0.1.0", kind: "grammar",
    title: "Woher kommst du? · Mistä olet kotoisin?",
    explanationFi: "Woher tarkoittaa 'mistä' eli mistä suunnasta tai paikasta joku tulee. "
      + "Kysymys Woher kommst du? vastaa suomen 'Mistä olet kotoisin?'. "
      + "Kerro kotimaasi tai kotikaupunkisi ilmauksella Ich komme aus …, esimerkiksi Ich komme aus Finnland. "
      + "Wohin tarkoittaa 'minne' ja wo 'missä', eikä niitä käytetä tämän nimikysymyksen tilalla. "
      + "Kysymys alkaa woher-sanalla, sitten kommt-verbin sinämuoto kommst, lopuksi du: Woher kommst du?",
    examples: [
      { de: "Woher kommst du?", fi: "Mistä olet kotoisin?" },
      { de: "Ich komme aus Finnland.", fi: "Olen kotoisin Suomesta." },
      { de: "Ich komme aus Berlin.", fi: "Olen kotoisin Berliinistä." },
      { de: "Und du?", fi: "Entä sinä?" },
    ],
  },
  {
    id: "los1-c03-country-table", version: "0.1.0", kind: "table",
    headers: ["Saksa", "Suomi", "Mistä? · koko ilmaus"],
    rows: [
      ["Finnland", "Suomi", "aus Finnland"],
      ["Deutschland", "Saksa", "aus Deutschland"],
      ["Österreich", "Itävalta", "aus Österreich"],
      ["die Schweiz", "Sveitsi", "aus der Schweiz"],
      ["Schweden", "Ruotsi", "aus Schweden"],
      ["Estland", "Viro", "aus Estland"],
      ["die USA", "Yhdysvallat", "aus den USA (vain tunnistettavaksi)"],
    ],
  },
  {
    id: "los1-c03-grammar-kommen", version: "0.1.0", kind: "grammar",
    title: "kommen · ich komme, du kommst",
    explanationFi: "Saksan kommen-verbi tarkoittaa 'tulla'. "
      + "Muodot ovat ich komme (minä tulen) ja du kommst (sinä tulet). "
      + "Er kommt ja sie kommt tarkoittavat 'hän tulee', mutta ne ovat nyt vain tunnistettavia. "
      + "Väitelauseessa persoonamuotoinen verbi on yleensä toisena lauseenjäsenenä: "
      + "Ich komme aus Finnland. Kun kysymyksessä on kysymyssana, järjestys on "
      + "Woher + kommst + du? Älä sekoita muotoja du kommt (virheellinen) ja du kommst (oikea).",
    examples: [
      { de: "ich komme", fi: "minä tulen" },
      { de: "du kommst", fi: "sinä tulet" },
      { de: "er kommt", fi: "hän tulee (miehestä); vain tunnistettavaksi" },
      { de: "sie kommt", fi: "hän tulee (naisesta); vain tunnistettavaksi" },
      { de: "Woher kommst du?", fi: "Mistä olet kotoisin?" },
      { de: "Ich komme aus Finnland.", fi: "Olen kotoisin Suomesta." },
    ],
  },
  {
    id: "los1-c03-grammar-aus", version: "0.1.0", kind: "grammar",
    title: "aus Finnland mutta aus der Schweiz",
    explanationFi: "Monien maiden nimet toimivat tässä ilman artikkelia: aus Finnland, "
      + "aus Deutschland ja aus Österreich. Sveitsi on poikkeus, joka opitaan nyt kokonaisena "
      + "ilmauksena aus der Schweiz. Myös aus den USA on tunnistettava erikoismuoto, "
      + "mutta sitä ei vielä vaadita kokeessa. Aus-preposition yhteydessä käytetään myöhemmin "
      + "datiivia, mutta koko sijamuotojen taivutusta ei opeteta nyt. "
      + "Saksan maan- ja paikannimet sekä kielten nimet kirjoitetaan isolla alkukirjaimella.",
    examples: [
      { de: "Ich komme aus Finnland.", fi: "Olen kotoisin Suomesta." },
      { de: "Ich komme aus Deutschland.", fi: "Olen kotoisin Saksasta." },
      { de: "Ich komme aus Österreich.", fi: "Olen kotoisin Itävallasta." },
      { de: "Ich komme aus der Schweiz.", fi: "Olen kotoisin Sveitsistä." },
      { de: "Ich komme aus den USA.", fi: "Olen kotoisin Yhdysvalloista. Tämä vain tunnistetaan." },
    ],
  },
  {
    id: "los1-c03-grammar-wo", version: "0.1.0", kind: "grammar",
    title: "woher ≠ wo · Kysytkö alkuperää vai sijaintia?",
    explanationFi: "Woher kommst du? kysyy alkuperää. Wo bist du? kysyy sijaintia, missä nyt olet. "
      + "Kysymykseen Woher kommst du? vastataan esimerkiksi Ich komme aus Finnland. "
      + "Vastausta Ich bin hier ('olen täällä') käytetään sijaintia kysyttäessä. "
      + "Tämä ero kannattaa ymmärtää ennen kuin aloitat itsenäiset keskustelut.",
    examples: [
      { de: "Woher kommst du? – Ich komme aus Finnland.", fi: "Mistä olet kotoisin? – Suomesta." },
      { de: "Wo bist du? – Ich bin hier.", fi: "Missä olet? – Olen täällä." },
    ],
  },
  {
    id: "los1-c03-core-vocabulary", version: "0.1.0", kind: "vocabulary",
    entries: ([
      ["woher", "mistä", "alkuperää kysyvä kysymyssana"],
      ["kommen", "tulla", "verbin perusmuoto"],
      ["du kommst", "sinä tulet", "du-muoto"],
      ["aus", "-sta/-stä, jostakin", "käytetään lähtöpaikan yhteydessä"],
      ["Finnland", "Suomi", "maan nimi"],
      ["Deutschland", "Saksa", "maan nimi"],
      ["Österreich", "Itävalta", "maan nimi"],
      ["die Schweiz", "Sveitsi", "huomaa artikkeli die"],
      ["Schweden", "Ruotsi", "maan nimi"],
      ["Estland", "Viro", "maan nimi"],
      ["aus Finnland", "Suomesta", "kokonainen käyttöfraasi"],
      ["ich komme aus …", "olen kotoisin …sta", "aktiivinen malli"],
      ["wo", "missä", "ei sama kuin woher"],
      ["die Stadt", "kaupunki", "esim. Kiel on kaupunki"],
      ["das Land", "maa", "esim. Deutschland on maa"],
      ["hier", "täällä", "sijainti"],
      ["auch", "myös", "esim. ich auch = minä myös"],
    ] as [string, string, string][]).map(([de, fi, note], index) =>
      ({ id: "los1-c03-word-" + String(index + 1).padStart(2, "0"), de, fi, note })),
  },
  {
    id: "los1-c03-text-b-guide", version: "0.1.0", kind: "paragraph", language: "fi",
    text: "Kuuntele nyt kokonainen nelirepliikkinen Ariserin kirjoittama ja äänittämä alkuperäisdialogi. "
      + "Se esiintyi jo C02:ssa, mutta nyt opit sen uuden asian: Ich komme aus Kyoto ja "
      + "Wir kommen aus Berlin. Kertaa samalla nimet Thomas, Takashi ja Peter. "
      + "Japaner ja wir kommen on tässä yhteydessä vain tunnistettavaa lisäkieltä, "
      + "ei uutta taivutusopetusta. Äänite ja kaikki neljä repliikkiä löytyvät suoraan LOS!:sta.",
  },
  {
    id: "los1-c03-m-com-02-audio", version: "1.0.0", kind: "media", mediaType: "audio",
    title: "Thomas ja Takashi · 12 sekunnin alkuperäisdialogi",
    embedUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Deutsch_Dialog_._Ich_bin_Peter.ogg",
    sourceId: "M-COM-02",
  },
  ariserTranscript("los1-c03-m-com-02-dialogue"),
  {
    id: "los1-c03-text-b-followup", version: "0.1.0", kind: "paragraph", language: "fi",
    text: "Ariserin alkuperäisessä dialogissa Thomas sanoo Wir kommen aus Berlin, "
      + "mikä tarkoittaa 'Me tulemme Berliinistä'. Takashi puolestaan sanoo "
      + "Ich komme aus Kyoto, 'Olen kotoisin Kiotosta'. "
      + "Kyoto on Japanissa ja Berliini Saksassa. "
      + "C03:n tavoitteena on tunnistaa kaupunkien ja maiden alkuperä, "
      + "ei vielä oppia wir-persoonaa tai kansallisuussanojen taivutusta.",
  },
  {
    id: "los1-c03-apply-guide", version: "0.1.0", kind: "paragraph", language: "fi",
    text: "Kirjoita nyt oma lyhyt esittäytyminen. Voit käyttää oikeaa tai keksittyä paikkaa. "
      + "Tervehdi, kerro nimesi, kerro maa tai kaupunki ja kysy toisen alkuperää. "
      + "Esimerkkimallin voi avata vasta oman yrityksen jälkeen. "
      + "LOS! tallentaa vastauksesi mutta ei automaattisesti päättele, puhuitko "
      + "oikeasta kotipaikastasi tai kirjoititko kaikki lauseet virheettä.",
  },
  {
    id: "los1-c03-production", version: "0.1.0", kind: "production",
    titleFi: "Oma nimi, oma lähtöpaikka ja kysymys",
    promptFi: "Kirjoita 3–4 lyhyttä saksankielistä lausetta: tervehdys, oma nimi, "
      + "lähtömaa tai -kaupunki sekä kysymys Woher kommst du?.",
    modelDe: "Hallo! Ich heiße Lena. Ich komme aus Finnland. Woher kommst du?",
    modelFi: "Hei! Nimeni on Lena. Olen kotoisin Suomesta. Mistä sinä olet kotoisin?",
    criteriaFi: [
      "Kirjoitin tervehdyksen ja nimeni saksaksi.",
      "Käytin oikeaa muotoa ich komme aus … tai Ich komme aus …",
      "Kysyin toisen lähtöpaikkaa: Woher kommst du?",
      "Tarkistin paikannimen ison alkukirjaimen ja kysymysmerkin.",
    ],
  },
  {
    id: "los1-c03-culture-intro", version: "0.1.0", kind: "paragraph", language: "fi",
    text: "DACH on lyhenne kolmesta saksankielisestä maasta: Deutschland (Saksa), "
      + "Austria eli Österreich (Itävalta) ja Confoederatio Helvetica eli die Schweiz (Sveitsi). "
      + "Saksan kieli on myös Liechtensteinin virallinen kieli. "
      + "Sveitsissä puhutaan saksan lisäksi myös ranskaa, italiaa ja retoromaania, "
      + "joten ei pidä olettaa kaikkien sveitsiläisten puhuvan vain saksaa. "
      + "Saksaa puhutaan lisäksi vähemmistökielenä ja toisena kielenä muuallakin. "
      + "Tutki maiden nimet ja pääkaupungit alla olevasta taulukosta, "
      + "älä sekoita maan nimeä ja kaupungin nimeä keskenään.",
  },
  {
    id: "los1-c03-culture-countries", version: "0.1.0", kind: "table",
    headers: ["Maa saksaksi", "Maa suomeksi", "Pääkaupunki"],
    rows: [
      ["Deutschland", "Saksa", "Berlin"],
      ["Österreich", "Itävalta", "Wien"],
      ["die Schweiz", "Sveitsi", "Bern (liittovaltion hallintokaupunki)"],
      ["Liechtenstein", "Liechtenstein", "Vaduz"],
      ["Finnland", "Suomi", "Helsinki"],
    ],
  },
  {
    id: "los1-c03-culture-note", version: "0.1.0", kind: "paragraph", language: "fi",
    text: "Saksan maa- ja kaupunkinimet kirjoitetaan aina isoilla alkukirjaimilla, "
      + "myös silloin kun kirjoitat vain muutaman sanan. "
      + "Monet paikannimet tunnetaan eri kielillä eri muodoissa: Wien on suomeksi Wien, "
      + "Deutschland puolestaan Saksa. Harjoittele erottamaan nimi ja sijainti, "
      + "älä kuvittele että kaikki saksankieliset asuisivat Saksassa.",
  },
];
