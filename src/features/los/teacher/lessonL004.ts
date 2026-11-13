import { LOS1_L009_TEACHER } from "./lessonL009.ts";
import { LOS1_L008_TEACHER } from "./lessonL008.ts";
import { LOS1_L007_TEACHER } from "./lessonL007.ts";
import { LOS1_L006_TEACHER } from "./lessonL006.ts";
import { LOS1_L005_TEACHER } from "./lessonL005.ts";
import { LOS1_L003_TEACHER } from "./lessonL003.ts";
import { LOS1_L002_TEACHER } from "./lessonL002.ts";
import { LOS1_L001_TEACHER } from "./lessonL001.ts";
import type { TeacherLesson } from "./engine.ts";

/**
 * Pedagogical preview, not yet marked language-reviewed or audio-approved.
 * Original explanatory Finnish prose; references existing LOS! 1 C01 vocabulary
 * and exercise IDs, not duplicated textbook answers.
 */
export const LOS1_L004_TEACHER: TeacherLesson = {
  id: "L004",
  bookId: 1,
  chapterId: "01",
  version: "2.0.0-preview.1",
  title: "Tervehdykset muistista",
  objective: "Valitsen tilanteeseen sopivan tervehdyksen ja osaan hyvästellä tutun ihmisen.",
  estimatedMinutes: 30,
  requiredQuestionIds: ["recall", "guided", "independent", "dialogue", "exit"],
  requiredActivityIds: ["vocabulary-reviewed", "pronunciation-practiced"],
  requiredPracticeIds: ["C01-EX-01", "C01-EX-04"],
  scenes: [
    {
      id: "welcome", phase: "Aloitus", kind: "introduction",
      title: "Tänään opit tervehtimään oikeassa tilanteessa",
      paragraphs: [
        "Tässä oppitunnissa harjoittelet saksan tavallisimpia tervehdyksiä niin, että osaat käyttää niitä ilman näkyvää sanalistaa.",
        "Opettaja näyttää ensin, miksi eri tilanteissa käytetään eri ilmauksia. Sen jälkeen kokeilet itse, käytät kirjan harjoituksia ja lopuksi sovellat oppimaasi.",
        "Väärä vastaus ei pysäytä tuntia. Saat vihjeen tai uuden selityksen. Varsinainen osaaminen tarkistetaan erikseen.",
      ],
    },
    {
      id: "recall", phase: "Muistelu", kind: "question",
      title: "Mitä muistat edellisiltä tunneilta?",
      paragraphs: ["Kokeile ensin muistista. Jos et muista, saat vihjeen."],
      question: {
        type: "choice", skillId: "L1-INT-01",
        prompt: "Mikä saksankielinen ilmaus tarkoittaa hyvää huomenta?",
        options: [
          { id: "a", label: "Guten Abend!", wrongFeedback: "Abend tarkoittaa iltaa. Aamulle on oma ilmauksensa." },
          { id: "b", label: "Guten Morgen!" },
          { id: "c", label: "Gute Nacht!", wrongFeedback: "Gute Nacht! on hyvän yön toivotus, ei aamun tervehdys." },
        ],
        correctOption: "b",
        success: "Oikein. Guten Morgen! tarkoittaa hyvää huomenta.",
        hint: "Muistatko, mikä sana tarkoittaa saksaksi aamua? Se muistuttaa englannin sanaa morning.",
        reteach: "Morgen = aamu. Abend = ilta. Nacht = yö. Näistä aamun tervehdys muodostuu sanalla Morgen.",
        genericWrong: "Tämä ei ollut aamun tervehdys. Tarkista sana Morgen ja kokeile uudelleen.",
      },
      help: [
        { title: "Mitä Morgen tarkoittaa?", body: "Morgen tarkoittaa aamua, mutta morgen voi myös tarkoittaa huomenna. Tässä tervehdyksessä tarkoitetaan aamua." },
      ],
    },
    {
      id: "situations", phase: "Opetus", kind: "explanation",
      title: "Tervehdys valitaan tilanteen mukaan",
      paragraphs: [
        "Suomessa voimme usein sanoa vain hei. Saksassa voit myös ilmaista tervehdyksellä vuorokaudenaikaa.",
        "Guten Morgen! sopii aamun tervehdykseksi. Guten Tag! on tavallinen päivän tervehdys. Guten Abend! sopii iltaan.",
        "Gute Nacht! eroaa näistä: sitä käytetään yleensä toivotettaessa hyvää yötä esimerkiksi nukkumaan menevälle. Se ei ole yleinen tapa tervehtiä illalla saapuvaa ihmistä.",
        "Hallo! puolestaan on yleinen ja arkinen tervehdys, jota voi käyttää monissa tilanteissa.",
      ],
      help: [
        { title: "Miksi Guten mutta Gute?", body: "Tervehdysten sanamuodoissa on kielioppia, jota opetellaan tarkemmin myöhemmin. Nyt opit kokonaiset ilmaukset oikein; älä yritä päätellä taivutussääntöä näistä yksin." },
        { title: "Onko Guten Tag! aina pakollinen?", body: "Ei. Tilanne, alue ja ihmisten välinen tuttavallisuus vaikuttavat tervehdykseen. Hallo! on usein aivan luonteva tervehdys." },
      ],
    },
    {
      id: "board", phase: "Opetus", kind: "board",
      title: "Katsotaan ilmaukset opetustaululla",
      paragraphs: [
        "Paina Näytä seuraava ja seuraa, miten samaan vuorokauteen liittyvät ilmaisut vaihtuvat.",
        "Huomaa erityisesti ero illan tervehdyksen ja hyvän yön toivotuksen välillä.",
      ],
      board: [
        { label: "Aamulla", german: "Guten Morgen!", meaning: "Hyvää huomenta!" },
        { label: "Päivällä", german: "Guten Tag!", meaning: "Hyvää päivää!" },
        { label: "Illalla", german: "Guten Abend!", meaning: "Hyvää iltaa!" },
        { label: "Nukkumaan mentäessä", german: "Gute Nacht!", meaning: "Hyvää yötä!" },
      ],
    },
    {
      id: "guided", phase: "Ohjattu harjoitus", kind: "question",
      title: "Valitse oikea tervehdys",
      paragraphs: ["Tapaat saksankielisen tuttusi aamulla. Mieti ensin vuorokaudenaikaa ja vasta sitten ilmauksen merkitystä."],
      question: {
        type: "choice", skillId: "L1-INT-01",
        prompt: "Mitä sanot aamulla?",
        options: [
          { id: "a", label: "Guten Abend!", wrongFeedback: "Tämä olisi illan tervehdys, ei aamun." },
          { id: "b", label: "Guten Morgen!" },
          { id: "c", label: "Tschüss!", wrongFeedback: "Tschüss! on hyvästely. Tilanteessa olet vasta tapaamassa ystävää." },
        ],
        correctOption: "b",
        success: "Juuri niin. Guten Morgen! sopii aamuun.",
        hint: "Tervehdys sisältää sanan, joka tarkoittaa aamua.",
        reteach: "Kun aloitat kohtaamisen aamulla, voit sanoa Guten Morgen! Kun lähdet, voit sen sijaan sanoa Tschüss!",
        genericWrong: "Mieti, oletko tervehtimässä vai hyvästelemässä ja mikä vuorokaudenaika on.",
      },
    },
    {
      id: "book", phase: "Oppikirja", kind: "book",
      title: "Avaa oppikirjan sanasto ja tehtävät",
      paragraphs: [
        "Nyt käytät samaa oikeaa LOS! 1:n kirjaa kuin muutenkin. Kirja avautuu omaan välilehteen, joten tämä oppitunti jää kesken tähän kohtaan.",
        "Lue C01:n sanastosta aamu-, päivä- ja iltatervehdykset. Palaa tänne ja vahvista kertaus. Tee myös kirjan harjoitukset C01-EX-01 ja C01-EX-04. Pelkkä sivun avaaminen ei merkitse niitä tehdyiksi.",
      ],
      bookLinks: [
        { label: "Avaa C01:n sanasto", chapterId: "01", section: "vocabulary", instruction: "Kertaa tervetulo- ja hyvästelyilmaukset." },
        { label: "Avaa C01:n harjoitukset", chapterId: "01", section: "practice", instruction: "Tee tehtävät C01-EX-01 ja C01-EX-04." },
      ],
      activityId: "vocabulary-reviewed",
      activityLabel: "Olen kerrannut tervehdykset sanastosta",
    },
    {
      id: "independent", phase: "Itsenäinen harjoitus", kind: "question",
      title: "Kirjoita tervehdys ilman mallia",
      paragraphs: [
        "Sulje mahdollinen sanastolista ennen vastaamista. Kirjoita lause kokonaan itse.",
        "Välimerkin voit jättää pois, mutta sanojen tulee olla oikein.",
      ],
      question: {
        type: "text", skillId: "L1-INT-01", evidenceRole: "independent",
        prompt: "Kirjoita saksaksi: Hyvää iltaa!",
        accepted: ["Guten Abend!"],
        success: "Oikein! Kirjoitit illan tervehdyksen itse.",
        hint: "Ilta on saksaksi Abend. Täydennä siihen kuuluva tervehdys.",
        reteach: "Illalla sanotaan Guten Abend! Muista: Morgen = aamu, Tag = päivä ja Abend = ilta.",
        genericWrong: "Vastaus ei täsmää tähän ilmaukseen. Tarkista ensin, että käytät illan sanaa Abend.",
        wrongAnswers: {
          "guten morgen": "Morgen viittaa aamuun. Kysymyksessä oli ilta.",
          "guten tag": "Tag viittaa päivään. Tässä tarvitaan Abend.",
          "gute nacht": "Gute Nacht! toivottaa hyvää yötä. Tavallinen illan tervehdys on eri ilmaus.",
        },
      },
    },
    {
      id: "pronunciation", phase: "Puhuminen", kind: "activity",
      title: "Harjoitellaan ääneen",
      paragraphs: [
        "Sano ensin Guten Morgen! ja sitten Tschüss! ääneen ilman näkyvää mallia.",
        "Tarvittaessa palaa sanastoon ja sen mahdollisiin hyväksyttyihin äänitteisiin. Ääntämistäsi ei arvioida automaattisesti.",
        "Kun olet harjoitellut, vahvista se alla. Tämä on oma harjoittelumerkintäsi, ei todistus ääntämisen laadusta.",
      ],
      activityId: "pronunciation-practiced",
      activityLabel: "Harjoittelin molemmat ilmaukset ääneen",
    },
    {
      id: "dialogue", phase: "Soveltaminen", kind: "question",
      title: "Miten keskustelu alkaa?",
      paragraphs: [
        "Kuvittele tapaavasi tutun ystävän. Ystäväsi tervehtii ensin: Hallo!",
        "Valitse luonteva vastaus. Tätä ei tarvitse sanoa ääneen, mutta voit harjoitella samalla.",
      ],
      question: {
        type: "choice", skillId: "L1-INT-01", evidenceRole: "application",
        prompt: "Miten vastaat ystävän tervehdykseen?",
        options: [
          { id: "a", label: "Hallo!" },
          { id: "b", label: "Gute Nacht!", wrongFeedback: "Tämä toivottaa hyvää yötä. Ystäväsi juuri tervehti sinua." },
          { id: "c", label: "Auf Wiedersehen!", wrongFeedback: "Tämä tarkoittaa näkemiin. Keskustelu on vasta alkamassa." },
        ],
        correctOption: "a",
        success: "Oikein. Hallo! sopii hyvin vastaukseksi ystävälle.",
        hint: "Ystäväsi sanoi Hallo! Voitko vastata samalla ilmauksella?",
        reteach: "Hallo! aloittaa kohtaamisen. Tschüss! ja Auf Wiedersehen! kuuluvat yleensä hyvästelyyn.",
        genericWrong: "Tässä tilanteessa keskustelu alkaa, eikä pääty. Valitse tervehdys.",
      },
    },
    {
      id: "exit", phase: "Lopputarkistus", kind: "question",
      title: "Lopputarkistus: hyvästely",
      paragraphs: [
        "Vielä yksi kysymys ilman valmista mallia. Tämä on eri taito kuin tervehtiminen.",
        "Virhe ei estä oppitunnin läpikäymistä, mutta se auttaa suunnittelemaan myöhempää kertausta.",
      ],
      question: {
        type: "choice", skillId: "L1-INT-01", evidenceRole: "exit",
        prompt: "Miten hyvästelet tutun ystävän rennosti?",
        options: [
          { id: "a", label: "Guten Morgen!", wrongFeedback: "Tämä aloittaa aamun kohtaamisen, ei päätä sitä." },
          { id: "b", label: "Tschüss!" },
          { id: "c", label: "Guten Tag!", wrongFeedback: "Tämä on päivän tervehdys. Hyvästelyyn käytetään toista ilmausta." },
        ],
        correctOption: "b",
        success: "Oikein. Tschüss! on tavallinen rento hyvästely.",
        hint: "Muistatko lyhyen hyvästelyn, jossa on ß-kirjain?",
        reteach: "Tschüss! tarkoittaa moikka tai hei hei hyvästeltäessä. Guten Morgen! ja Guten Tag! ovat tervehdyksiä.",
        genericWrong: "Etsi vaihtoehto, jolla päätät kohtaamisen tuttavan kanssa.",
      },
    },
    {
      id: "summary", phase: "Yhteenveto", kind: "summary",
      title: "Mitä opit tänään?",
      paragraphs: [
        "Osaat nyt erottaa aamu-, päivä- ja iltatervehdyksen sekä hyvän yön toivotuksen. Harjoittelit myös arkista tervehtimistä ja hyvästelyä.",
        "Kun kaikki opetustilanteet, harjoituskysymykset, oma ääneen harjoittelu ja kirjan tehtävät on tehty, voit merkitä oppitunnin läpikäydyksi.",
        "Oppitunnin suorittaminen ei vielä tarkoita, että taito olisi pysyvästi hallinnassa. Tervehdykset palaavat myöhemmissä kertauksissa.",
      ],
    },
  ],
};
export function getLosTeacherLesson(id: string): TeacherLesson | undefined {
  if (id === LOS1_L001_TEACHER.id) return LOS1_L001_TEACHER;
  if (id === LOS1_L002_TEACHER.id) return LOS1_L002_TEACHER;
  if (id === LOS1_L003_TEACHER.id) return LOS1_L003_TEACHER;
  if (id === LOS1_L004_TEACHER.id) return LOS1_L004_TEACHER;
  if (id === LOS1_L005_TEACHER.id) return LOS1_L005_TEACHER;
  if (id === LOS1_L006_TEACHER.id) return LOS1_L006_TEACHER;
  if (id === LOS1_L007_TEACHER.id) return LOS1_L007_TEACHER;
  if (id === LOS1_L008_TEACHER.id) return LOS1_L008_TEACHER;
  return id === LOS1_L009_TEACHER.id ? LOS1_L009_TEACHER : undefined;
}
