import type { LosLessonBlueprint } from "./lessonEngine";

/**
 * LOS! 1 / C02: lessons L007-L011 reuse the published-in-reader human dialogues,
 * existing chapter exercises, and the C02 draft. No second answer database.
 * A lesson completion records work done, never a CEFR or pronunciation grade.
 */
export const LOS1_C02_LESSON_BLUEPRINTS: readonly LosLessonBlueprint[] = [
  {
    id: "L007", title: "Miten kysyn nimen?",
    objective: "Osaan kysyä toisen nimen ja esitellä itseni lyhyesti.",
    estimatedMinutes: 30, contentVersion: "1.0.0",
    steps: [
      { id: "words", label: "Tutustu nimifraaseihin", instruction: "Avaa C02:n sanasto. Etsi ilmaukset Ich heiße ja Wie heißt du? Äännä ne rauhallisesti.", chapter: "02", section: "vocabulary", minutes: 9 },
      { id: "model", label: "Lue minä- ja sinämuodot", instruction: "Katso C02:n kielioppiselityksestä, miksi sanotaan ich heiße mutta du heißt. Älä vielä opettele kaikkia verbin persoonamuotoja.", chapter: "02", section: "grammar", minutes: 10 },
      { id: "intro", label: "Etsi fraasit oikeasta keskustelusta", instruction: "Lue Franzin ja Gretan kuusi repliikkiä. Etsi nimikysymys ja kaksi erilaista tapaa sanoa oma nimi.", chapter: "02", section: "text", minutes: 7 },
    ], evidence: [],
    check: {
      question: "Miten kysyt tutulta henkilöltä hänen nimeään?",
      answers: [{id:"a",text:"Wie heißt du?"},{id:"b",text:"Wie alt bist du?"},{id:"c",text:"Woher kommst du?"}],
      correctId: "a", explanation: "Wie heißt du? tarkoittaa Mikä sinun nimesi on? Kysymys sopii epämuodolliseen sinutteluun.",
    },
  },
  {
    id: "L008", title: "Franz ja Greta: kokonainen dialogi",
    objective: "Ymmärrän, ketkä keskustelevat ja miten he esittäytyvät.",
    estimatedMinutes: 30, contentVersion: "1.0.0",
    steps: [
      { id: "dialogue", label: "Lue koko alkuperäinen dialogi", instruction: "Lue kuusi puheenvuoroa kokonaan. Avaa sanaselitykset, mutta keskity alkuun nimen kysymiseen ja kertomiseen.", chapter: "02", section: "text", minutes: 10 },
      { id: "understand", label: "Tarkista kaksi ymmärtämistehtävää", instruction: "Vastaa ymmärtämistehtäviin 1 ja 2 ja paina niiden tarkistuspainikkeita. Vastaukset tallentuvat kappaleen 2 tietoihin.", chapter: "02", section: "understand", minutes: 12 },
      { id: "review", label: "Palaa tekstin nimifraaseihin", instruction: "Lue nimikysymys ja Gretan vastaus ääneen. Yritä sitten muistaa molemmat ilman käännöstä.", chapter: "02", section: "text", minutes: 4 },
    ],
    evidence: [{kind:"checked-source",ids:["C02-SOURCE-Q01","C02-SOURCE-Q02"],label:"C02:n alkuperäistehtävät 1 ja 2 vastattu ja tarkistettu."}],
    check: {
      question: "Millä ilmauksella Greta kertoo oman nimensä?",
      answers: [{id:"a",text:"Du heißt Greta."},{id:"b",text:"Ich heiße Greta."},{id:"c",text:"Wie heißt Greta?"}],
      correctId: "b", explanation: "Greta sanoo Ich heiße Greta. Muoto heiße kuuluu minä-persoonaan.",
    },
  },
  {
    id: "L009", title: "Heißen ja sein minä–sinä",
    objective: "Käytän heißen- ja sein-verbien ich- ja du-muotoja.",
    estimatedMinutes: 30, contentVersion: "1.0.0",
    steps: [
      { id: "grammar", label: "Opiskele kaksi verbiparia", instruction: "Kertaa ich heiße / du heißt ja ich bin / du bist. Huomaa saksan ß ja verbien erilaiset muodot.", chapter: "02", section: "grammar", minutes: 10 },
      { id: "guided", label: "Täydennä heißen-muodot", instruction: "Tee harjoitukset C02-EX-03 ja C02-EX-04. Tallenna vastaukset ja tarkista perustelut.", chapter: "02", section: "practice", minutes: 11 },
      { id: "transfer", label: "Kokeile sein-verbiä", instruction: "Tee C02-EX-05 ja C02-EX-06. Ota uudelleen esiin kielioppitaulukko vasta oman yrityksesi jälkeen.", chapter: "02", section: "practice", minutes: 5 },
    ],
    evidence: [{kind:"answered-practice",ids:["C02-EX-03","C02-EX-04","C02-EX-05","C02-EX-06"],label:"Neljä C02:n rajattua verbiharjoitusta vastattu."}],
    check: {
      question: "Mikä pari sopii lauseisiin Ich ___ Max. ja Du ___ Mia. (sein-verbi)?",
      answers: [{id:"a",text:"bist / bin"},{id:"b",text:"bin / bist"},{id:"c",text:"bin / ist"}],
      correctId: "b", explanation: "Sein-verbin minämuoto on bin ja sinämuoto bist. Ich bin Max. Du bist Mia.",
    },
  },
  {
    id: "L010", title: "Kuuntele ja esittele henkilö",
    objective: "Poimin lyhyestä esittelydialogista nimet ja kaupungit myös tekstin tuella.",
    estimatedMinutes: 30, contentVersion: "1.0.0",
    steps: [
      { id: "second-source", label: "Avaa Thomasin ja Takashin dialogi", instruction: "Lue M-COM-02:n kaikki neljä puheenvuoroa ja kuuntele alkuperäistä äänitettä, jos se toimii. Äänentoistoa ei vielä pidetä laitetestattuna.", chapter: "02", section: "text-b", minutes: 10 },
      { id: "questions", label: "Vastaa kaksi lisätekstin kysymystä", instruction: "Tarkista Text B:n kysymykset C02-MCOM02-Q01 ja C02-MCOM02-Q02. Jos ääni ei toimi, käytä koko alkuperäistä tekstiversiota.", chapter: "02", section: "text-b", minutes: 12 },
      { id: "contrast", label: "Vertaa kahteen keskusteluun", instruction: "Palaa Franzin ja Gretan alkuperäistekstiin ja vertaa ilmaisuja Ich bin ja Ich heiße. Molemmat voivat kertoa nimen.", chapter: "02", section: "text", minutes: 4 },
    ],
    evidence: [{kind:"checked-source",ids:["C02-MCOM02-Q01","C02-MCOM02-Q02"],label:"Toisen alkuperäisdialogin kaksi tehtävää vastattu ja tarkistettu."}],
    check: {
      question: "Minkä ilmauksen Thomas käyttää kertoessaan oman nimensä?",
      answers: [{id:"a",text:"Ich bin Thomas."},{id:"b",text:"Du heißt Thomas."},{id:"c",text:"Wie heißt Thomas?"}],
      correctId: "a", explanation: "Thomas sanoo Ich bin Thomas. Ihmisen oman nimen voi kertoa sekä Ich bin... että Ich heiße... -rakenteella.",
    },
  },
  {
    id: "L011", title: "Harjoittele ja testaa C02",
    objective: "Kirjoitan lyhyen esittäytymisen ja palautan C02:n kappaletestin.",
    estimatedMinutes: 30, contentVersion: "1.0.0",
    steps: [
      { id: "apply", label: "Kirjoita esittäytyminen", instruction: "Kirjoita soveltamissivulle oma keksitty esittäytyminen ja nimikysymys. Älä lisää oikeita arkaluonteisia henkilötietoja.", chapter: "02", section: "apply", minutes: 8 },
      { id: "rehearse", label: "Kertaa fraasit muistista", instruction: "Kertaa sanastosta Ich heiße..., Wie heißt du? ja Ich bin... Peitä suomennokset ja vastaa itsellesi ääneen.", chapter: "02", section: "vocabulary", minutes: 6 },
      { id: "test", label: "Palauta kappaletesti", instruction: "Vastaa C02:n kappaletestiin ja palauta se. Arvioi vasta lopuksi, mistä tarvitaan kertausta.", chapter: "02", section: "test", minutes: 12 },
    ],
    evidence: [{kind:"chapter-test",label:"C02:n kappaletesti palautettu."}],
    check: {
      question: "Miten täydennät kysymyksen Wie ___ du?",
      answers: [{id:"a",text:"heiße"},{id:"b",text:"heißt"},{id:"c",text:"heißen"}],
      correctId: "b", explanation: "Du-persoonan muoto on heißt, joten kysymys on Wie heißt du?",
    },
  },
];
