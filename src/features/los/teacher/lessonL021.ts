import { losExercisesFor } from "../exerciseBank.ts";
import type { TeacherLesson } from "./engine.ts";
const C04_TEST_IDS = losExercisesFor("04").map(item => item.id);
if (C04_TEST_IDS.length !== 12) throw new Error("C04 must retain all 12 canonical exam items");
/** Reuses current C04 test, application draft and self-assessment: no second grading store. */
export const LOS1_L021_TEACHER: TeacherLesson = {
  "id": "L021",
  "bookId": 1,
  "chapterId": "04",
  "version": "2.0.0-preview.1",
  "title": "Harjoittele ja testaa C04",
  "objective": "Kertaan du/Sie-puhuttelun, kohteliaat nimikysymykset, alkuperäiskeskustelun ja tervehdykset sekä palautan kirjan oikean C04-kappaletestin.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredActivityIds": [
    "c04-reviewed"
  ],
  "requiredPracticeIds": [],
  "chapterAssessment": {
    "requiredTestIds": C04_TEST_IDS,
    "requireApplicationDraft": true,
    "minSelfAssessmentLength": 15
  },
  "scenes": [
    {
      "id": "welcome",
      "phase": "Johdanto",
      "kind": "introduction",
      "title": "Koko C04 yhdellä testauskerralla",
      "paragraphs": [
        "L017:ssa opit, milloin du ja Sie ovat luontevia. L018:ssa luit kahdeksan alkuperäistä Herr Schmidt–Herr Standish -vuoroa, L019:ssa harjoittelit Sie heißen ja Sie kommen, ja L020:ssa tutkit alkuperäisen tervehdyssanaston.",
        "Nyt kertaat, sovellat ja palautat kirjan jo olemassa olevan C04-kappaletestin. Testi sisältää 12 osatehtävää. Kirjan soveltamisteksti ja itsearviointi tallennetaan samaan nykyiseen C04-luonnokseen.",
        "Tämän tunnin läpikäynti ei sellaisenaan tarkoita täydellistä kielitaitoa tai oppimisen pysyvyyttä. Äänitteen todellista toistoa ei väitetä hyväksytyksi."
      ]
    },
    {
      "id": "recall",
      "phase": "Muistelu",
      "kind": "question",
      "title": "Mitä du ja Sie tarkoittavat?",
      "paragraphs": [
        "Kertaa ensin tilanteen valinta."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-04",
        "prompt": "Mikä väite pitää parhaiten paikkansa?",
        "options": [
          {
            "id": "a",
            "label": "Sie on kohtelias puhuttelu, du tuttavallinen."
          },
          {
            "id": "b",
            "label": "Du käy vain alle 12-vuotiaille.",
            "wrongFeedback": "Du ei määräydy tiukan ikärajan perusteella."
          },
          {
            "id": "c",
            "label": "Sie kirjoitetaan aina pienellä s:llä.",
            "wrongFeedback": "Kohtelias Sie kirjoitetaan isolla."
          }
        ],
        "correctOption": "a",
        "success": "Oikein. Puhuttelutapa riippuu tilanteesta.",
        "hint": "Muista L017:n kaksi kysymystä.",
        "reteach": "Du on tavallinen tuttujen kesken, Sie kohteliaissa tilanteissa.",
        "genericWrong": "Tarkista tilanteen puhuttelu, verbin muoto ja sen jälkeen ilmauksen tehtävä."
      }
    },
    {
      "id": "review",
      "phase": "Kertauksen opetus",
      "kind": "explanation",
      "title": "Neljän asian kertaus ennen koetta",
      "paragraphs": [
        "1. Nimi: Wie heißt du? on tuttu kysymys, Wie heißen Sie? kohtelias kysymys. Pelkkä Sie-sanan vaihtaminen ei riitä, vaan verbimuoto muuttuu.",
        "2. Lähtömaa: Woher kommst du? ja Woher kommen Sie? kysyvät kumpikin mistä joku on kotoisin, eri puhuttelulla.",
        "3. Alkuperäisteksti: Herr Schmidt sanoo Ich bin müde. ja selittää työmääränsä. Herra Standishin viimeinen repliikki on Auf Wiedersehen, bis morgen.",
        "4. Tervehdys ja hyvästely: Guten Tag! aloittaa kohteliaan kohtaamisen; Auf Wiedersehen! päättää sen. Tschüss! on tuttu rennompi hyvästely.",
        "Älä opettele vain mallikysymysten paikkaa monivalintalistassa. Koeta kertoa itsellesi, miksi väärä vastaus on väärä."
      ],
      "help": [
        {
          "title": "Kertaa vain tärkein",
          "body": "Wie heißen Sie? kysyy nimeä. Woher kommen Sie? kysyy alkuperää. Molemmissa Sie on isolla ja verbissä -en."
        },
        {
          "title": "Mikä on vain tunnistettavaa?",
          "body": "L018:n Ich habe so viel Arbeit. ja Das kann ich verstehen. sekä Wie geht es Ihnen? -fraasin sijamuotojen selitys eivät kuulu uuden aktiivisen kieliopin vaatimuksiin."
        }
      ]
    },
    {
      "id": "board",
      "phase": "Kertaustaulu",
      "kind": "board",
      "title": "Kolme tilannetta ja kuusi fraasia",
      "paragraphs": [
        "Seuraa ensin puhuttelun valinta, sitten kysymys, sen jälkeen sopiva tervehdys tai hyvästely. Tämä on uusi harjoitusmalli, ei alkuperäistekstin korvike."
      ],
      "board": [
        {
          "label": "1 · Tuttu nimeä kysyttäessä",
          "german": "Wie heißt du?",
          "meaning": "Du ja heißt kuuluvat yhteen."
        },
        {
          "label": "2 · Kohtelias nimeä kysyttäessä",
          "german": "Wie heißen Sie?",
          "meaning": "Sie ja heißen kuuluvat yhteen."
        },
        {
          "label": "3 · Tuttu alkuperä",
          "german": "Woher kommst du?",
          "meaning": "Du ja kommst kuuluvat yhteen."
        },
        {
          "label": "4 · Kohtelias alkuperä",
          "german": "Woher kommen Sie?",
          "meaning": "Sie ja kommen kuuluvat yhteen."
        },
        {
          "label": "5 · Saapuminen päivällä",
          "german": "Guten Tag!",
          "meaning": "Kohtelias päivätervehdys."
        },
        {
          "label": "6 · Poistuminen",
          "german": "Auf Wiedersehen!",
          "meaning": "Kohtelias näkemiin-toivotus."
        }
      ]
    },
    {
      "id": "guided",
      "phase": "Ohjattu harjoitus",
      "kind": "question",
      "title": "Valitse verbi kohteliaaseen kysymykseen",
      "paragraphs": [
        "Kysyt tuntemattomalta henkilökunnan jäseneltä hänen nimeään."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-04",
        "prompt": "Mikä on oikein?",
        "options": [
          {
            "id": "a",
            "label": "Wie heißt Sie?",
            "wrongFeedback": "Heißt on du-muoto."
          },
          {
            "id": "b",
            "label": "Wie heißen Sie?"
          },
          {
            "id": "c",
            "label": "Wie heiße Sie?",
            "wrongFeedback": "Heiße on ich-muoto."
          }
        ],
        "correctOption": "b",
        "success": "Oikein. Wie heißen Sie?",
        "hint": "Kohtelias Sie tarvitsee -en-muodon.",
        "reteach": "Sie heißen on oikea verbipari.",
        "genericWrong": "Tarkista tilanteen puhuttelu, verbin muoto ja sen jälkeen ilmauksen tehtävä."
      }
    },
    {
      "id": "book-vocab",
      "phase": "Kertaus kirjassa",
      "kind": "book",
      "title": "Lue tuttuja lähteitä ennen koetta",
      "paragraphs": [
        "Avaa C04:n Sanasto ja Kielioppi. Palauta mieleen du/Sie sekä kohteliaat kysymykset. Lue tarvittaessa M-WB-06:n kahdeksan vuoroa ja M-COM-03:n alkuperäinen 20 ilmauksen lista uudelleen.",
        "Vahvista kertaus vasta, kun olet oikeasti tutkinut sekä tilanteiden että lauseiden erot. Tämä ei synnytä erillistä arvosanaa."
      ],
      "bookLinks": [
        {
          "label": "C04 · Sanasto",
          "chapterId": "04",
          "section": "vocabulary",
          "instruction": "Kertaa kohteliaisuusfraasit."
        },
        {
          "label": "C04 · Kielioppi",
          "chapterId": "04",
          "section": "grammar",
          "instruction": "Kertaa Sie heißen ja Sie kommen."
        },
        {
          "label": "C04 · Text A",
          "chapterId": "04",
          "section": "text",
          "instruction": "Kertaa M-WB-06:n kahdeksan repliikkiä."
        }
      ],
      "activityId": "c04-reviewed",
      "activityLabel": "Kertasin C04:n sanaston, kieliopin ja lähdetekstin"
    },
    {
      "id": "independent",
      "phase": "Itsenäinen tarkistus",
      "kind": "question",
      "title": "Kysy alkuperä kohteliaasti",
      "paragraphs": [
        "Älä katso opetustaulua vastatessasi."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-04",
        "evidenceRole": "independent",
        "prompt": "Mikä kysyy kohteliaasti henkilön alkuperää?",
        "options": [
          {
            "id": "a",
            "label": "Woher kommst du?",
            "wrongFeedback": "Tämä on tuttavallinen du-muoto."
          },
          {
            "id": "b",
            "label": "Wie heißen Sie?",
            "wrongFeedback": "Tämä kysyy nimeä."
          },
          {
            "id": "c",
            "label": "Woher kommen Sie?"
          }
        ],
        "correctOption": "c",
        "success": "Oikein. Woher kommen Sie? kysyy alkuperää.",
        "hint": "Woher = mistä, Sie = kohtelias puhuttelu.",
        "reteach": "Woher kommen Sie? kysyy kohteliaasti mistä joku on kotoisin.",
        "genericWrong": "Tarkista tilanteen puhuttelu, verbin muoto ja sen jälkeen ilmauksen tehtävä."
      }
    },
    {
      "id": "application",
      "phase": "Uusi palvelutilanne",
      "kind": "question",
      "title": "Mitä sanot, kun keskustelu päättyy?",
      "paragraphs": [
        "Kuviteltu työntekijä on auttanut sinua. Poistut kohteliaasta tapaamisesta ja haluat sanoa näkemiin."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-04",
        "evidenceRole": "application",
        "prompt": "Mikä on sopivin hyvästely?",
        "options": [
          {
            "id": "a",
            "label": "Guten Tag!",
            "wrongFeedback": "Tämä aloittaa kohteliaan kohtaamisen."
          },
          {
            "id": "b",
            "label": "Auf Wiedersehen!"
          },
          {
            "id": "c",
            "label": "Woher kommen Sie?",
            "wrongFeedback": "Tämä kysyy alkuperää."
          }
        ],
        "correctOption": "b",
        "success": "Oikein. Auf Wiedersehen! on luonteva kohtelias hyvästely.",
        "hint": "Näkemiin alkaa Auf Wieder-.",
        "reteach": "Keskustelun lopussa kohtelias hyvästely voi olla Auf Wiedersehen!",
        "genericWrong": "Tarkista tilanteen puhuttelu, verbin muoto ja sen jälkeen ilmauksen tehtävä."
      }
    },
    {
      "id": "test",
      "phase": "Oikea kappaletesti",
      "kind": "book",
      "title": "Palauta C04:n kaikki 12 tehtävää",
      "paragraphs": [
        "Avaa C04:n Kappaletesti ja vastaa kirjan nykyisiin C04-EX-01–C04-EX-12-osatehtäviin. Palauta vasta, kun olet valmis. Kirjan tallennettu luonnos ei vielä ole palautus.",
        "Avaa myös Käytä saksaa. Kirjoita kuvitteelliseen palvelutilanteeseen kaksi lyhyttä kohteliasta repliikkiä, esimerkiksi tervehdys ja nimikysymys. Tämä tallentuu kirjan applicationDraft-kenttään.",
        "Kirjoita itsearviointiin ainakin muutama virke siitä, mikä du/Sie-puhuttelussa tuntuu vielä hankalalta ja mitä aiot kerrata. Opettaja vaatii vähintään 15 merkkiä, mutta ei väitä pituutta osaamispisteeksi.",
        "Koe- ja itsearviointitieto luetaan kirjan nykyisestä C04-tallennuksesta; niitä ei kopioida opettajan erilliseen testivarastoon."
      ],
      "bookLinks": [
        {
          "label": "C04 · Kappaletesti",
          "chapterId": "04",
          "section": "test",
          "instruction": "Tee ja palauta kaikki 12 osatehtävää."
        },
        {
          "label": "C04 · Käytä saksaa",
          "chapterId": "04",
          "section": "apply",
          "instruction": "Kirjoita kaksi kohteliasta repliikkiä kuvitteelliseen tilanteeseen."
        }
      ]
    },
    {
      "id": "exit",
      "phase": "Lopputarkistus",
      "kind": "question",
      "title": "Tunnista pienellä kirjoitettu sie",
      "paragraphs": [
        "Kohteliaan Sie:n tunnistamisessa kirjainkoko on tärkeää. Tämän tarkistaa eksplisiittinen monivalinta."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-04",
        "evidenceRole": "exit",
        "prompt": "Mikä väite on oikea?",
        "options": [
          {
            "id": "a",
            "label": "Kohtelias Sie kirjoitetaan pienellä keskellä virkettä.",
            "wrongFeedback": "Kohtelias Sie säilyttää ison S:n."
          },
          {
            "id": "b",
            "label": "Sie ja du käyttävät aina samaa verbimuotoa.",
            "wrongFeedback": "Sie heißen mutta du heißt."
          },
          {
            "id": "c",
            "label": "Pienellä kirjoitettu sie voi tarkoittaa hän (nainen) tai he, mutta kohtelias puhuttelu on Sie."
          }
        ],
        "correctOption": "c",
        "success": "Kyllä. Puhuttelun kirjoitusasu ja konteksti merkitsevät.",
        "hint": "Muista erottaa Sie ja sie.",
        "reteach": "Kohtelias Sie on isolla; sie pienellä voi viitata kolmanteen persoonaan.",
        "genericWrong": "Tarkista tilanteen puhuttelu, verbin muoto ja sen jälkeen ilmauksen tehtävä."
      }
    },
    {
      "id": "summary",
      "phase": "Yhteenveto",
      "kind": "summary",
      "title": "C04:n oppiminen ja koepalautus ovat eri asioita",
      "paragraphs": [
        "Kertasit du- ja Sie-puhuttelun, kysymysten verbimuodot, alkuperäisen keskustelun ja tervehdysfraasit. Kappaletesti käyttää kaikkia 12 kirjan nykyistä tehtävää.",
        "Oppitunnin voi merkitä läpikäydyksi vasta, kun kappaletesti on palautettu ja soveltamisteksti sekä itsearviointi ovat tallessa. Läpäisymerkintä ei ole itsenäinen CEFR-todistus eikä äänen tai puheen automaattinen pisteytys.",
        "Seuraava C05 siirtyy kysymään kuulumisia tarkemmin. Siinä palautuvat mieleen M-WB-06:n fraasit, mutta nyt opetellaan aktiivisesti uusia vointivastauksia."
      ]
    }
  ]
};
