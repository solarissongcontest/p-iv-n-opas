import { losExercisesFor } from "../exerciseBank.ts";
import type { TeacherLesson } from "./engine.ts";
/** C09 L050 uses the existing full 14-item exam and original archived attempts. */
const C09_TEST_IDS=losExercisesFor("09").map(item=>item.id);
export const LOS1_L050_TEACHER: TeacherLesson = {
  "id": "L050",
  "bookId": 1,
  "chapterId": "09",
  "version": "2.0.0-preview.1",
  "title": "Harjoittele ja testaa C09",
  "objective": "Palautan kirjan oikean 14 tehtävän C09-kappaletestin ja kirjoitan vähintään 15 merkin oman itsearvioinnin.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredActivityIds": [
    "c09-teacher-L050"
  ],
  "requiredPracticeIds": [],
  "requiredCheckedIds": [],
  "chapterAssessment": {
    "requiredTestIds": C09_TEST_IDS,
    "requireApplicationDraft": false,
    "minSelfAssessmentLength": 15
  },
  "scenes": [
    {
      "id": "welcome",
      "kind": "introduction",
      "title": "C09:n oikea koe on 14 tehtävää",
      "phase": "Opetus",
      "paragraphs": [
        "Tässä tunnissa kokoat viikonpäivät, ajankohdan kysymisen, am/um-rakenteen ja tasatunnit. Kappaletestissä on alkuperäiset 14 kirjatehtävää, joista kaksi ovat sanan täydentämisiä.",
        "Testi on sama kirjan nykyinen kappaletesti kuin ennen Teacher 2.0 -opetusta, ei toinen päällekkäinen pisteytetty koe. Aiemmat yritykset säilyvät arkistossa.",
        "Edellisen tunnin Sovella-kalenteri on erillinen kirjoitusharjoitus. Tässä tuntisuorituksen edellytyksinä ovat varsinainen kokeen palautus ja vähintään 15 merkin oma itsearviointi.",
        "Tekstin alkuperäisaineiston ja äänitteen julkaisuportit sekä äänen toimivuus ovat koesuorituksesta erillisiä."
      ]
    },
    {
      "id": "recall",
      "kind": "question",
      "title": "Muistatko tärkeimmän päiväilmauksen?",
      "phase": "Opetus",
      "paragraphs": [
        "Aloita yhdestä alkeistason mallista ilman sanastoa."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-TIME-09",
        "evidenceRole": "practice",
        "prompt": "Mikä tarkoittaa maanantaina?",
        "options": [
          {
            "id": "a",
            "label": "um Montag",
            "wrongFeedback": "Um kuuluu kellonaikaan."
          },
          {
            "id": "b",
            "label": "am Montag"
          },
          {
            "id": "c",
            "label": "am drei Uhr",
            "wrongFeedback": "Tämä ei ilmaise maanantaita."
          }
        ],
        "correctOption": "b",
        "success": "Am Montag tarkoittaa maanantaina.",
        "hint": "Päivän edellä am.",
        "reteach": "Am Montag tarkoittaa maanantaina. Päivän edellä am.",
        "genericWrong": "Kertaa viikonpäivän ja kellonajan erot. Päivän edellä am."
      }
    },
    {
      "id": "explain",
      "kind": "explanation",
      "title": "Neljä asiaa, jotka kokeessa todella kysytään",
      "phase": "Opetus",
      "paragraphs": [
        "Ensimmäiseksi tunnista kaikki viikonpäivät Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag ja Sonntag. Jokainen alkaa isolla.",
        "Toiseksi osaa kertoa viikonpäivästä am-muodolla, esimerkiksi am Freitag. Kellonaika ilmaistaan um-muodolla, esimerkiksi um vier Uhr.",
        "Kolmanneksi muista kysymys Wann? ja erottele heute, morgen sekä gestern. Morgen isolla tarkoittaa aamua, morgen pienellä huomista.",
        "Neljänneksi kokoa ajankohta: am Montag um drei Uhr. Tasatunnit ovat aktiivinen taitotavoite. Lähteen Viertel vor drei ja mahdolliset halb/Viertel nach -ilmaukset saa tunnistaa mutta niitä ei vaadita omaan kirjoittamiseen.",
        "Koe käyttää 14 oikeaa C09-EX-tehtävää ja arvioi vain kirjoitettujen viikonpäivien, fraasien sekä täydennyssanojen hallintaa. Se ei mittaa ääntämistä eikä todistettua äänikuuntelua."
      ],
      "help": [
        {
          "title": "Miten monta testitehtävää on?",
          "body": "C09:n harjoituspankissa on 14 tehtävää. Kaksi viimeistä ovat am ja um -täydennykset."
        },
        {
          "title": "Vaaditaanko Viertel vor drei -muodon kirjoittamista?",
          "body": "Ei. Se on kokonaisen alkuperäisen Sport und Zeit -tekstin luetun ymmärtämisen ilmaus 14.45. Kokeen aktiiviset ajanilmaukset ovat tasatunteja."
        },
        {
          "title": "Miten uusintakoe toimii?",
          "body": "Kirjan oma Arkistoi tulos ja aloita uusinta -toiminto säilyttää aiemman palautuksen ja vapauttaa uuden yrityksen."
        },
        {
          "title": "Pitääkö omasta kalenterista saada arvosana?",
          "body": "Ei. L049:n kirjoitus tarkistetaan itse. L050:n testi pisteyttää vain sen 14 alkuperäistä kirjan harjoitusta."
        }
      ]
    },
    {
      "id": "board",
      "kind": "board",
      "title": "C09:n koetta edeltävä taulu",
      "phase": "Opetus",
      "paragraphs": [
        "Kertaa viikonpäivät ja kiinteät ajanilmaukset. Sulje esimerkit ennen itsenäistä kysymystä."
      ],
      "board": [
        {
          "label": "Viikon alku",
          "german": "Montag · Dienstag · Mittwoch",
          "meaning": "Maanantai, tiistai, keskiviikko."
        },
        {
          "label": "Viikon loppu",
          "german": "Donnerstag · Freitag · Samstag · Sonntag",
          "meaning": "Torstai, perjantai, lauantai, sunnuntai."
        },
        {
          "label": "Päivä",
          "german": "am Freitag",
          "meaning": "Perjantaina."
        },
        {
          "label": "Tasatunti",
          "german": "um vier Uhr",
          "meaning": "Kello neljältä."
        },
        {
          "label": "Yhdistelmä",
          "german": "am Montag um drei Uhr",
          "meaning": "Maanantaina kolmelta."
        },
        {
          "label": "Ajankohdan sanat",
          "german": "Wann? · heute · morgen · gestern",
          "meaning": "Milloin? Tänään, huomenna, eilen."
        }
      ]
    },
    {
      "id": "guided",
      "kind": "question",
      "title": "Yhdistä lause oikein",
      "phase": "Opetus",
      "paragraphs": [
        "Ajattele kuvitteellista tapaamista perjantaina neljältä."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-TIME-09",
        "evidenceRole": "practice",
        "prompt": "Mikä vastaa perjantaina kello neljältä?",
        "options": [
          {
            "id": "a",
            "label": "am Freitag um vier Uhr"
          },
          {
            "id": "b",
            "label": "um Freitag am vier Uhr",
            "wrongFeedback": "Päivän ja kellonajan ilmaukset ovat väärin päin."
          },
          {
            "id": "c",
            "label": "am vier Uhr um Freitag",
            "wrongFeedback": "Viikonpäivä tarvitsee am ja kellonaika um."
          }
        ],
        "correctOption": "a",
        "success": "Am Freitag um vier Uhr on oikea ilmaus.",
        "hint": "Päivä am, tunti um.",
        "reteach": "Am Freitag um vier Uhr on oikea ilmaus. Päivä am, tunti um.",
        "genericWrong": "Kertaa viikonpäivän ja kellonajan erot. Päivä am, tunti um."
      }
    },
    {
      "id": "source",
      "kind": "book",
      "title": "Kertaa lähdetekstit ennen testiä",
      "phase": "Opetus",
      "paragraphs": [
        "C09:n Text A sisältää Franzin ja Gretan seitsemän puheenvuoroa, joissa näkyvät sekä Viertel vor drei (14.45) että um drei (15.00). Nämä ovat eri aikoja.",
        "Text B on Christophin viikonpäivien luettu sanalista M-COM-07. Tekstiä voi lukea, mutta kuulemisen pisteitä siitä ei saa. Lähdesuunnitelman M-DIB-05-eroa ei ole ratkaistu."
      ],
      "bookLinks": [
        {
          "chapterId": "09",
          "section": "text",
          "label": "C09 · Sport und Zeit",
          "instruction": "Kertaa lähteen kaksi erilaista kellonaikaa."
        },
        {
          "chapterId": "09",
          "section": "text-b",
          "label": "C09 · Die Wochentage",
          "instruction": "Lue seitsemän päivän alkuperäinen luettelo."
        }
      ]
    },
    {
      "id": "practice",
      "kind": "book",
      "title": "Kertaa kirjan alkuperäiset 14 tehtävää",
      "phase": "Opetus",
      "paragraphs": [
        "Avaa C09:n Harjoittele-sivu ja kertaa heikoimmat viikonpäivät sekä am/um. Testin täydennyksissä tarvitaan sanat am ja um.",
        "Harjoituksen oma vastaus ei ole sama kuin varsinaisen testin palautus. Tee koko kappaletesti erillisellä Testi-sivulla."
      ],
      "bookLinks": [
        {
          "chapterId": "09",
          "section": "practice",
          "label": "C09 · Harjoittele 14 tehtävää",
          "instruction": "Kertaa vaikeat viikonpäivät ja ajanilmaukset."
        }
      ]
    },
    {
      "id": "independent",
      "kind": "question",
      "title": "Kirjoita ajankohta muistista",
      "phase": "Opetus",
      "paragraphs": [
        "Peitä esimerkit ja kirjoita yksi tavallinen ajanilmaus kokonaisena."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-TIME-09",
        "evidenceRole": "independent",
        "prompt": "Kirjoita saksaksi: maanantaina kello kolmelta.",
        "accepted": [
          "am Montag um drei Uhr",
          "Am Montag um drei Uhr",
          "am Montag um drei Uhr."
        ],
        "success": "Am Montag um drei Uhr on oikein.",
        "hint": "Am Montag + um drei Uhr.",
        "reteach": "Am Montag um drei Uhr on oikein. Am Montag + um drei Uhr.",
        "genericWrong": "Kirjoita vain opetettu muoto. Am Montag + um drei Uhr."
      }
    },
    {
      "id": "application",
      "kind": "question",
      "title": "Mitä Wann? kysyy?",
      "phase": "Opetus",
      "paragraphs": [
        "Erota ajankohtaa kysyvä sana toisen nimen tai puheen merkityksestä."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-TIME-09",
        "evidenceRole": "application",
        "prompt": "Mikä on Wann?-kysymyksen oikea merkitys?",
        "options": [
          {
            "id": "a",
            "label": "Missä?",
            "wrongFeedback": "Wo? kysyy missä."
          },
          {
            "id": "b",
            "label": "Miksi?",
            "wrongFeedback": "Warum? kysyy miksi."
          },
          {
            "id": "c",
            "label": "Milloin?"
          }
        ],
        "correctOption": "c",
        "success": "Wann? tarkoittaa milloin?",
        "hint": "Milloin on ajankohta.",
        "reteach": "Wann? tarkoittaa milloin? Milloin on ajankohta.",
        "genericWrong": "Kertaa viikonpäivän ja kellonajan erot. Milloin on ajankohta."
      }
    },
    {
      "id": "testguide",
      "kind": "explanation",
      "title": "Palauta vain oikean testisivun kautta",
      "phase": "Opetus",
      "paragraphs": [
        "Täytä kaikki C09:n 14 monivalinta- ja täydentämistehtävää. Paina Palauta testi vasta, kun kaikkiin on tallennettu yritys.",
        "Pisteet ja oikeat ratkaisut näytetään kirjan oman testin palautuksen jälkeen. Opettajatunti lukee olemassa olevan testin vastaustilanteen ja palautusajan eikä muuta tulosta.",
        "Uusinnassa kirjan Arkistoi tulos ja aloita uusinta säilyttää vanhan koesuorituksen vastaukset ja pisteet.",
        "Kun testi on palautettu, kirjoita vähintään 15 merkin sanallinen itsearvio: mitkä päivät ja ajanilmaukset ovat varmoja, mitä haluat vielä harjoitella?"
      ]
    },
    {
      "id": "exam",
      "kind": "book",
      "title": "Tee ja palauta oikea C09-kappaletesti",
      "phase": "Opetus",
      "paragraphs": [
        "Avaa kirjan C09:n Kappaletesti-sivu. Vastaa kaikkiin 14 olemassa olevaan tehtävään ja palauta.",
        "Teacher ei hyväksy pelkkää testisivun avaamista koesuorituksena. Täydet pisteet eivät ole tuntisuorituksen ehto."
      ],
      "bookLinks": [
        {
          "chapterId": "09",
          "section": "test",
          "label": "C09 · Kappaletesti, 14 tehtävää",
          "instruction": "Vastaa, palauta ja tarkista kirjan oikea tulos."
        }
      ]
    },
    {
      "id": "reflection",
      "kind": "book",
      "title": "Kirjoita sanallinen oma oppimishavainto",
      "phase": "Opetus",
      "paragraphs": [
        "Kirjoita C09:n testisivun itsearviointiin esimerkiksi mikä viikonpäivä on vielä hankala tai milloin käytät am ja um.",
        "Vähintään 15 merkkiä riittää tallennetuksi itsearvioinniksi. Sisältöä ei arvioida automaattisella kielioppiarvosanalla."
      ],
      "bookLinks": [
        {
          "chapterId": "09",
          "section": "test",
          "label": "C09 · Testin itsearviointi",
          "instruction": "Tallenna vähintään 15 merkin oma havainto."
        }
      ]
    },
    {
      "id": "activity",
      "kind": "activity",
      "title": "Kertaa kaksi ajanilmausta",
      "phase": "Opetus",
      "paragraphs": [
        "Ilmaise ilman mallia maanantaina kolmelta ja perjantaina neljältä. Kirjoita tai sano itse ja vertaa sitten kirjan esimerkkiin.",
        "Vahvista oma harjoittelu. Se ei muodosta erillistä kuuntelu- tai puhepistemäärää."
      ],
      "activityId": "c09-teacher-L050",
      "activityLabel": "Kertasin kaksi tasatuntia muistista"
    },
    {
      "id": "exit",
      "kind": "question",
      "title": "Mitä 14 pisteen tulos arvioi?",
      "phase": "Opetus",
      "paragraphs": [
        "Varmista, ettet sekoita kirjoitettujen fraasien testiä alkuperäisen äänen ymmärtämiseen."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-TIME-09",
        "evidenceRole": "exit",
        "prompt": "Mikä väite C09-kappaletestistä on oikein?",
        "options": [
          {
            "id": "a",
            "label": "14/14 pistettä todistaa täydellisen puheen ääntämisen.",
            "wrongFeedback": "Ääntämistä ei pisteytetä testissä."
          },
          {
            "id": "b",
            "label": "14 kirjan tehtävää mittaa viikonpäivien ja ajanilmausten kirjallisia taitoja, ei automaattista kuuntelutaitoa."
          },
          {
            "id": "c",
            "label": "Text B:n kuunteleminen palauttaa testin automaattisesti.",
            "wrongFeedback": "Kappaletesti palautetaan erillisellä testisivulla."
          }
        ],
        "correctOption": "b",
        "success": "Testi on kirjoitettujen viikonpäivien ja fraasien harjoitus.",
        "hint": "Kuuntelun hyväksyntä on erillinen.",
        "reteach": "Testi on kirjoitettujen viikonpäivien ja fraasien harjoitus. Kuuntelun hyväksyntä on erillinen.",
        "genericWrong": "Kertaa viikonpäivän ja kellonajan erot. Kuuntelun hyväksyntä on erillinen."
      }
    },
    {
      "id": "summary",
      "kind": "summary",
      "title": "C09:n koe ja itsearvio ovat tallella",
      "phase": "Opetus",
      "paragraphs": [
        "Harjoittelit viikonpäivät, Wann?-kysymyksen ja tasatuntien am/um-rakenteen. Oikean kirjan 14 tehtävän koe palautetaan ja itsearviointi tallennetaan.",
        "Tuntisuoritus ei edellytä täydellisiä pisteitä. Aiemmat palautetut koeyritykset säilyvät kirjan historiassa myös uusinnassa.",
        "Viikonpäivä-äänitteen lähde-ero M-DIB-05:n ja M-COM-07:n välillä sekä todellinen laitetestaus jäävät erillisiksi toimituksellisiksi tarkistuksiksi. Seuraavana alkaa C10:n esittelyjen kertaus."
      ]
    }
  ]
};
