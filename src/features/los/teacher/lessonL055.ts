import { losExercisesFor } from "../exerciseBank.ts";
import type { TeacherLesson } from "./engine.ts";
/** C10 L055: original 20-item chapter test. Does not replace EX-FINAL. */
const C10_TEST_IDS=losExercisesFor("10").map(item=>item.id);
export const LOS1_L055_TEACHER: TeacherLesson = {
  "id": "L055",
  "bookId": 1,
  "chapterId": "10",
  "version": "2.0.0-preview.1",
  "title": "Harjoittele ja testaa C10",
  "objective": "Kertaan C10:n muodot, palautan oikean 20 tehtävän kappaletestin ja kirjoitan itsearvion ennen erillistä koko kirjan loppukoetta.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredActivityIds": [
    "c10-teacher-L055"
  ],
  "requiredPracticeIds": [],
  "requiredCheckedIds": [],
  "chapterAssessment": {
    "requiredTestIds": C10_TEST_IDS,
    "requireApplicationDraft": false,
    "minSelfAssessmentLength": 15
  },
  "scenes": [
    {
      "id": "welcome",
      "kind": "introduction",
      "phase": "Opetus",
      "title": "Kymmenennen kappaleen todellinen koe",
      "paragraphs": [
        "C10:n kappaletestissä on 20 alkuperäistä kirjatehtävää. Niissä kerrataan tervehdykset, nimet, alkuperä, ikä, vointi, kohteliaisuus ja kolmannen henkilön verbimuodot.",
        "Tämä kappaletesti on eri kokonaisuus kuin LOS! 1:n lopullinen EX-FINAL-koe. Sen tulosta ei saa käyttää korvaamaan erillistä loppukoetta.",
        "L054:n kaksi omaa 6–8 repliikin keskustelua ja kolmannen henkilön esittely säilyvät omassa Sovella-kentässään. Tämän tunnin vaatimuksena on oikean C10-testin palautus ja vähintään 15 merkin itsearviointi, ei toinen kopio omasta tekstistä.",
        "Haastattelujen mahdollisia ääni- ja videotallenteita ei ole varmennettu kuuntelusuorituksiksi."
      ]
    },
    {
      "id": "recall",
      "kind": "question",
      "phase": "Opetus",
      "title": "Kolmannen henkilön sein-muoto",
      "paragraphs": [
        "Tarkista ennen koetta epäsäännöllinen ist."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-MEET-10",
        "evidenceRole": "practice",
        "prompt": "Mikä tarkoittaa Hän (mies) on 17-vuotias?",
        "options": [
          {
            "id": "a",
            "label": "Er bist siebzehn.",
            "wrongFeedback": "Bist kuuluu du-pronominiin."
          },
          {
            "id": "b",
            "label": "Er ist siebzehn."
          },
          {
            "id": "c",
            "label": "Er bin siebzehn.",
            "wrongFeedback": "Bin kuuluu ich-pronominiin."
          }
        ],
        "correctOption": "b",
        "success": "Er ist siebzehn. on oikein.",
        "hint": "Er + ist.",
        "reteach": "Er ist siebzehn. on oikein. Er + ist.",
        "genericWrong": "Tarkista pronomini ja verbimuoto. Er + ist."
      }
    },
    {
      "id": "explain",
      "kind": "explanation",
      "phase": "Opetus",
      "title": "Koe kokoaa kaikki tähänastiset alkeiskappaleet",
      "paragraphs": [
        "Kertaa tervehdykset Hallo! ja Guten Tag! sekä hyvästely Auf Wiedersehen!. Tuttavallinen kysymys on Wie heißt du?, kohtelias Wie heißen Sie?.",
        "Kertaa nimen ja alkuperän minä-muodot Ich heiße Mia. ja Ich komme aus Finnland. Kolmannesta henkilöstä sanot Er/Sie heißt, Er/Sie kommt ja Er/Sie ist.",
        "Kertaa du-muodot du heißt, du bist, du kommst sekä kohteliaan Sie-muodon heißen, sind ja kommen. Kiinnitä huomiota siihen, että naisesta kertova sie on tässä er/sie-muoto.",
        "Muista C06:n ikäfraasi Wie alt bist du? ja C05:n vointifraasi Nicht so gut. C08:n avunpyyntö on Bitte langsamer. C09:n ajanilmaus on am Montag um drei Uhr.",
        "C10:n todellinen koe sisältää sekä valintoja että seitsemän sanan täydentämistä: heiße, bist, ist, heißt, heißt, kommt ja kommt. Tee sanat itse ilman kopioitua mallia.",
        "Oma puhe, autenttisen Harald-haastattelun kuullun ymmärtäminen ja haastattelun vaikea kielioppi eivät ole tämän 20 pisteen automaattisen testin sisältöä."
      ],
      "help": [
        {
          "title": "Onko C10-testi sama kuin loppukoe?",
          "body": "Ei. C10:n 20 tehtävää kuuluvat kymmenenteen kappaleeseen. LOS! 1:n loppukoe EX-FINAL on erillinen opintopolun kokonaisuus."
        },
        {
          "title": "Miten erotan Sie ja sie?",
          "body": "Kohtelias Wie heißen Sie? kysyy sinulta/teiltä nimeä, kun taas Sie heißt Mia. tarkoittaa hänellä on nimi Mia. Verbimuoto paljastaa eron."
        },
        {
          "title": "Mitä jos saan testissä väärin?",
          "body": "Voit tutkia palautuksen jälkeen mallivastaukset ja aloittaa uuden yrityksen. Kirjan arkistointi säilyttää vanhan tuloksen."
        },
        {
          "title": "Onko oma äänteeni pisteytetty?",
          "body": "Ei. Testi arvioi ainoastaan sen 20 kirjoitettua valinta- ja täydennystehtävää, ei automaattista puhe- tai kuuntelutaitoa."
        }
      ]
    },
    {
      "id": "board",
      "kind": "board",
      "phase": "Opetus",
      "title": "Kertaa tärkeimmät pronominit ja fraasit",
      "paragraphs": [
        "Opetustaulu on lyhyt apu. Sulje se ennen itsenäistä tarkistusta."
      ],
      "board": [
        {
          "label": "Tervehdys",
          "german": "Hallo! · Guten Tag!",
          "meaning": "Tuttava ja kohtelias tilanne."
        },
        {
          "label": "Minä",
          "german": "ich heiße · ich bin · ich komme",
          "meaning": "Nimi, olla, tulla."
        },
        {
          "label": "Sinä",
          "german": "du heißt · du bist · du kommst",
          "meaning": "Tuttavallinen sinä."
        },
        {
          "label": "Hän",
          "german": "er/sie heißt · er/sie ist · er/sie kommt",
          "meaning": "Kolmas henkilö."
        },
        {
          "label": "Kohtelias Sie",
          "german": "Sie heißen · Sie sind · Sie kommen",
          "meaning": "Kohtelias puhuttelu."
        },
        {
          "label": "Koko kohtaaminen",
          "german": "Wie heißt du? · Woher kommst du? · Auf Wiedersehen!",
          "meaning": "Nimi, alkuperä, hyvästely."
        }
      ]
    },
    {
      "id": "guided",
      "kind": "question",
      "phase": "Opetus",
      "title": "Valitse kolmannen persoonan nimi",
      "paragraphs": [
        "Kuvitteellisen Leon esittely alkaa Das ist Leo. Toinen virke kertoo hänen nimensä."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-MEET-10",
        "evidenceRole": "practice",
        "prompt": "Mikä on oikein?",
        "options": [
          {
            "id": "a",
            "label": "Er heißt Leo."
          },
          {
            "id": "b",
            "label": "Er heißen Leo.",
            "wrongFeedback": "Er tarvitsee heißt-muodon."
          },
          {
            "id": "c",
            "label": "Er heiße Leo.",
            "wrongFeedback": "Heiße on ich-muoto."
          }
        ],
        "correctOption": "a",
        "success": "Er heißt Leo. on oikein.",
        "hint": "Er + heißt.",
        "reteach": "Er heißt Leo. on oikein. Er + heißt.",
        "genericWrong": "Tarkista pronomini ja verbimuoto. Er + heißt."
      }
    },
    {
      "id": "source",
      "kind": "book",
      "phase": "Opetus",
      "title": "Lue lähde ilman uutta kuuntelusuoritusta",
      "paragraphs": [
        "Jos haluat, kertaa C10:n Text A: Harald Beckerin kaikki 14 alkuperäistä puheenvuoroa. Niistä nimen, alkuperän ja iän kysyminen liittyy koettaviin fraaseihin, mutta vaikeat loppurepliikit ovat vain lukemisen tukena.",
        "Text B:n neljä repliikkiä ovat aiempi Thomas–Takashi-lähde M-COM-02. Se sisältää Das ist Peter ja Wir kommen aus Berlin. Alkuperäisen äänen toisto ja mahdollinen mediakäyttö eivät ole tässä vahvistettuja.",
        "Haraldin numeroista koostuvaan yhteystietorepliikkiin ei liity harjoitus- eikä koepistettä."
      ],
      "bookLinks": [
        {
          "chapterId": "10",
          "section": "text",
          "label": "C10 · Harald Text A, kaikki 14 repliikkiä",
          "instruction": "Kertaa nimen ja alkuperän mallit."
        },
        {
          "chapterId": "10",
          "section": "text-b",
          "label": "C10 · Thomas ja Takashi, koko neljän repliikin teksti",
          "instruction": "Lue Das ist Peter, mutta älä merkitse automaattista kuuntelua."
        }
      ]
    },
    {
      "id": "practice",
      "kind": "book",
      "phase": "Opetus",
      "title": "Tee ennen koetta vaikeimmat oikeat tehtävät",
      "paragraphs": [
        "Kirjan Harjoittele-sivulla ovat kaikki C10-EX-01–20. Kertaa erityisesti er ist, er heißt ja er/sie kommt sekä kohtelias Woher kommen Sie?.",
        "Tämä on valmistavaa harjoittelua. Varsinaisen kokeen pisteet ja palautus tallentuvat erikseen Testi-sivulle."
      ],
      "bookLinks": [
        {
          "chapterId": "10",
          "section": "practice",
          "label": "C10 · Harjoittele 20 alkuperäistä tehtävää",
          "instruction": "Kertaa omat epävarmat vastaukset."
        }
      ]
    },
    {
      "id": "independent",
      "kind": "question",
      "phase": "Opetus",
      "title": "Kirjoita kolmannen henkilön alkuperä",
      "paragraphs": [
        "Peitä taulukko ja muodosta yksi lause kuvitteellisesta Leosta."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-MEET-10",
        "evidenceRole": "independent",
        "prompt": "Kirjoita saksaksi: Hän (mies) tulee Suomesta.",
        "accepted": [
          "Er kommt aus Finnland.",
          "Er kommt aus Finnland"
        ],
        "success": "Er kommt aus Finnland. on oikein.",
        "hint": "Er + kommt + aus.",
        "reteach": "Er kommt aus Finnland. on oikein. Er + kommt + aus.",
        "genericWrong": "Tarkista subjektin ja verbin muoto. Er + kommt + aus.",
        "wrongAnswers": {
          "er komme aus finnland": "Kommt on er-muoto, komme on ich-muoto.",
          "er kommen aus finnland": "Er tarvitsee kommt-muodon."
        }
      }
    },
    {
      "id": "application",
      "kind": "question",
      "phase": "Opetus",
      "title": "Kaksi Sie-merkitystä",
      "paragraphs": [
        "Opettajalle puhutellessasi käytät kohteliasta Sie-muotoa."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-MEET-10",
        "evidenceRole": "application",
        "prompt": "Mikä kysymys sopii opettajalle?",
        "options": [
          {
            "id": "a",
            "label": "Wie heißt du?",
            "wrongFeedback": "Du on tuttavallinen."
          },
          {
            "id": "b",
            "label": "Wie heißt Sie?",
            "wrongFeedback": "Kohtelias Sie tarvitsee heißen."
          },
          {
            "id": "c",
            "label": "Wie heißen Sie?"
          }
        ],
        "correctOption": "c",
        "success": "Wie heißen Sie? on kohtelias.",
        "hint": "Sie + heißen.",
        "reteach": "Wie heißen Sie? on kohtelias. Sie + heißen.",
        "genericWrong": "Tarkista pronomini ja verbimuoto. Sie + heißen."
      }
    },
    {
      "id": "testguide",
      "kind": "explanation",
      "phase": "Opetus",
      "title": "Kappaletestin palautus ja uusiminen",
      "paragraphs": [
        "Vastaa C10:n kaikkiin 20 osatehtävään. Palauta koe vasta, kun jokaiseen on tallennettu yritys. Pisteet ja oikeat vastaukset tulevat näkyviin kirjan palautuksen jälkeen.",
        "Opettajan tilannekuva lukee oikean testAnswers-kentän ja testSubmittedAt-merkinnän nykyisestä C10-luonnoksesta. Se ei muuta pisteitä eikä arkistoi koetta automaattisesti.",
        "Jos haluat tehdä uusinnan, käytä kirjan omaa Arkistoi tulos ja aloita uusinta -toimintoa, jolloin vanha koehistoria säilyy.",
        "Kirjoita palautuksen jälkeen sanalliseen itsearviointikenttään vähintään 15 merkkiä. Kerro myös, mitä omassa du/Sie-keskustelussasi haluaisit harjoitella lisää."
      ]
    },
    {
      "id": "exam",
      "kind": "book",
      "phase": "Opetus",
      "title": "Palauta kirjan oikea 20 tehtävän C10-koe",
      "paragraphs": [
        "Avaa C10:n Testi-sivu, tee kaikki 20 alkuperäistä monivalinta- ja täydennystehtävää ja paina Palauta testi.",
        "Teacher 2.0 ei hyväksy pelkkää testisivun avaamista koesuoritukseksi. Tuntimerkintä ei edellytä täydellistä pistemäärää."
      ],
      "bookLinks": [
        {
          "chapterId": "10",
          "section": "test",
          "label": "C10 · Kappaletesti · oikeat 20 tehtävää",
          "instruction": "Vastaa kaikkiin ja palauta koe kirjan omalla sivulla."
        }
      ]
    },
    {
      "id": "reflection",
      "kind": "book",
      "phase": "Opetus",
      "title": "Kirjoita oma sanallinen itsearvio",
      "paragraphs": [
        "Kirjoita C10:n testisivun itsearviointiin vähintään 15 merkkiä siitä, mikä sinulta onnistui ilman mallia ja mikä ich/du/er/sie- tai Sie-muoto vielä vaatii harjoittelua.",
        "Voit katsoa uudestaan L054:n tallennettuja soveltamiskeskusteluja, mutta tähän tuntiin ei lisätä uutta tekstin kopiointipakkoa."
      ],
      "bookLinks": [
        {
          "chapterId": "10",
          "section": "test",
          "label": "C10 · Itsearviointi testipalautuksen jälkeen",
          "instruction": "Tallenna oppimishavainto vähintään 15 merkillä."
        }
      ]
    },
    {
      "id": "activity",
      "kind": "activity",
      "phase": "Opetus",
      "title": "Tee oma pieni suullinen tai kirjallinen tarkistus",
      "paragraphs": [
        "Kerro kuvitteellisesta Miasta ilman mallia kolme asiaa: hänen nimensä, lähtöpaikkansa ja ikänsä. Käytä Sie heißt, Sie kommt ja Sie ist merkityksessä hän (nainen).",
        "Vahvista vain oma harjoitteluyritys. Tämä ei anna automaattisia suullisen taitotason pisteitä."
      ],
      "activityId": "c10-teacher-L055",
      "activityLabel": "Harjoittelin kolmannen henkilön esittelyn muistista"
    },
    {
      "id": "exit",
      "kind": "question",
      "phase": "Opetus",
      "title": "Mikä tulos tulee vasta loppukokeesta?",
      "paragraphs": [
        "Erota kymmenennen kappaleen testi erillisestä koko kirjan loppukokeesta."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-MEET-10",
        "evidenceRole": "exit",
        "prompt": "Mikä pitää paikkansa C10:n kokeesta?",
        "options": [
          {
            "id": "a",
            "label": "Se korvaa kirjan EX-FINAL-loppukokeen.",
            "wrongFeedback": "EX-FINAL on erillinen opintopolun osa."
          },
          {
            "id": "b",
            "label": "Se arvioi kirjoitettuja fraaseja ja muotoja, mutta ei korvaa EX-FINAL-koetta eikä automaattisesti arvioi kuuntelua."
          },
          {
            "id": "c",
            "label": "20 tehtävää mittaa Haraldin videon puheenymmärryksen.",
            "wrongFeedback": "Videon toistoa tai kuullun ymmärtämistä ei ole todistettu."
          }
        ],
        "correctOption": "b",
        "success": "C10-koe ja EX-FINAL ovat eri arviointeja.",
        "hint": "Kappaleen testi ei ole koko kirjan loppukoe.",
        "reteach": "C10-koe ja EX-FINAL ovat eri arviointeja. Kappaleen testi ei ole koko kirjan loppukoe.",
        "genericWrong": "Tarkista pronomini ja verbimuoto. Kappaleen testi ei ole koko kirjan loppukoe."
      }
    },
    {
      "id": "summary",
      "kind": "summary",
      "phase": "Opetus",
      "title": "C10 päättää varsinaiset kymmenen kappaletta",
      "paragraphs": [
        "Osaat nyt koota tervehdyksen, nimen, alkuperän, iän, voinnin ja hyvästelyn yksinkertaiseksi kohtaamiseksi sekä esitellä kolmannen henkilön lyhyesti.",
        "Palautettu 20 tehtävän kappaletesti ja itsearviointi säilyvät C10:n oikeassa tallennuksessa, myös uusintojen historioineen.",
        "Tämä ei ole vielä LOS! 1:n valmistumistodistus. Opintopolun jäljellä ovat Kertaus II, erillinen EX-FINAL-loppukoe ja koko kirjan yhteenveto, ja autenttisten medioiden julkaisuportit ovat edelleen auki."
      ]
    }
  ]
};
