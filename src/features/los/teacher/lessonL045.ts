import { losExercisesFor } from "../exerciseBank.ts";
import type { TeacherLesson } from "./engine.ts";
/** C08 L045: actual 12-item chapter exam and separate 15-char self-assessment. */
const C08_TEST_IDS=losExercisesFor("08").map(item=>item.id);
export const LOS1_L045_TEACHER: TeacherLesson = {
  "id": "L045",
  "bookId": 1,
  "chapterId": "08",
  "version": "2.0.0-preview.1",
  "title": "Harjoittele ja testaa C08",
  "objective": "Palautan kirjan oikean 12 tehtävän C08-kappaletestin ja kirjoitan sanallisen itsearvioinnin ilman kuuntelu- tai ääntämispisteitä.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredActivityIds": [
    "c08-teacher-L045"
  ],
  "requiredPracticeIds": [],
  "requiredCheckedIds": [],
  "chapterAssessment": {
    "requiredTestIds": C08_TEST_IDS,
    "requireApplicationDraft": false,
    "minSelfAssessmentLength": 15
  },
  "scenes": [
    {
      "id": "welcome",
      "kind": "introduction",
      "title": "C08 päättyy oikeaan kokeeseen",
      "phase": "Aloitus",
      "paragraphs": [
        "C08:n kappaletesti sisältää kirjan nykyiset 12 yksiselitteisesti tarkistettavaa fraasi- ja sanastotehtävää. Viimeiset kaksi ovat täydennyksiä.",
        "Teacher 2.0 lukee oikean koepalautuksen kirjan tallennuksesta. Erillistä testiä, kuuntelupisteitä tai ääntämisarvosanaa ei synny.",
        "L044:n kolme omaa luokkadialogia ovat erillinen kirjoitusharjoitus. Tässä L045-tunnissa edellytetään testipalautus ja sanallinen itsearviointi, ei uutta dialogikirjoituksen pistemäärää."
      ]
    },
    {
      "id": "recall",
      "kind": "question",
      "title": "Mitä tarkoittaa En ymmärrä?",
      "phase": "Muistelu",
      "paragraphs": [
        "Aloita tutusta selviytymisfraasista ilman näkyvää mallia."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-SURV-08",
        "evidenceRole": "practice",
        "prompt": "Mikä tarkoittaa En ymmärrä?",
        "options": [
          {
            "id": "a",
            "label": "Ich verstehe nicht."
          },
          {
            "id": "b",
            "label": "Ich heiße Mia.",
            "wrongFeedback": "Tämä kertoo nimen."
          },
          {
            "id": "c",
            "label": "Ich bin zwanzig.",
            "wrongFeedback": "Tämä kertoo iän."
          }
        ],
        "correctOption": "a",
        "success": "Ich verstehe nicht. on oikein.",
        "hint": "Muista verstehe ja nicht.",
        "reteach": "Ich verstehe nicht. on oikein. Muista verstehe ja nicht.",
        "genericWrong": "Kertaa fraasin käyttötarkoitus. Muista verstehe ja nicht."
      }
    },
    {
      "id": "explain",
      "kind": "explanation",
      "title": "Kokoa viisi selviytymistilannetta",
      "phase": "Kertaus",
      "paragraphs": [
        "Ich verstehe nicht. ilmaisee ymmärtämisvaikeuden. Noch einmal, bitte. pyytää toistamaan ja Bitte langsamer. hidastamaan.",
        "Können Sie das bitte wiederholen? on kohtelias pitkä toistopyyntö. Opettele se fraasina ilman koko modaaliverbin taivutusta.",
        "Was bedeutet das? kysyy merkitystä. Wie sagt man das auf Deutsch? kysyy saksankielistä ilmaisua. C07:n Wie schreibt man das? puolestaan kysyy kirjoitusasua.",
        "Sanastosta tunnistat Wort = sana, Satz = lause, Frage = kysymys, Antwort = vastaus, Aufgabe = tehtävä. Täydennyksissä käytetään verstehe ja langsamer.",
        "12 tehtävän koetulos ei pisteytä omaa puhetta, 26 tekstiyksikön koulukohtauksen ymmärtämistä tai Evan alkuperäisvideota."
      ],
      "help": [
        {
          "title": "Mitkä ovat täydennykset?",
          "body": "C08-EX-11: Ich ____ nicht. = verstehe. C08-EX-12: Bitte ____. = langsamer."
        },
        {
          "title": "Miten koe palautetaan?",
          "body": "Täytä kaikki 12 tehtävää itse, paina Palauta testi ja kirjoita palautuksen jälkeen oma itsearvio."
        },
        {
          "title": "Mitä jos haluan uusinnan?",
          "body": "Kirjan Arkistoi tulos ja aloita uusinta säilyttää vanhan palautetun yrityksen vastauksineen ja pisteineen."
        },
        {
          "title": "Pitääkö katsoa Evan video?",
          "body": "Ei. C08:n Text B:ssä on koko kirjoitettu kahdeksan repliikin haastattelu, mutta videota tai alkuperäistä ääntä ei ole upotettu."
        }
      ]
    },
    {
      "id": "board",
      "kind": "board",
      "title": "Avunpyyntöjen kertaus",
      "phase": "Opetustaulu",
      "paragraphs": [
        "Lue fraasit kerran, peitä taulu ja yritä palauttaa mieleen oikea tilanne."
      ],
      "board": [
        {
          "label": "En ymmärrä",
          "german": "Ich verstehe nicht.",
          "meaning": "Ilmoitan ongelman."
        },
        {
          "label": "Toista",
          "german": "Noch einmal, bitte.",
          "meaning": "Pyydän uudelleen."
        },
        {
          "label": "Hitaammin",
          "german": "Bitte langsamer.",
          "meaning": "Pyydän pienempää vauhtia."
        },
        {
          "label": "Kohtelias toisto",
          "german": "Können Sie das bitte wiederholen?",
          "meaning": "Pyydän kohteliaasti toistoa."
        },
        {
          "label": "Merkitys",
          "german": "Was bedeutet das?",
          "meaning": "Kysyn sanan merkitystä."
        },
        {
          "label": "Saksankielinen vastine",
          "german": "Wie sagt man das auf Deutsch?",
          "meaning": "Kysyn miten jokin sanotaan saksaksi."
        }
      ]
    },
    {
      "id": "guided",
      "kind": "question",
      "title": "Kohtelias toistopyyntö",
      "phase": "Ohjattu harjoitus",
      "paragraphs": [
        "Et kuullut opettajan lausetta. Haluat hänen sanovan sen uudestaan."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-SURV-08",
        "evidenceRole": "practice",
        "prompt": "Mikä on sopiva kohtelias pyyntö?",
        "options": [
          {
            "id": "a",
            "label": "Wie heißt du?",
            "wrongFeedback": "Tämä kysyy nimeä."
          },
          {
            "id": "b",
            "label": "Können Sie das bitte wiederholen?"
          },
          {
            "id": "c",
            "label": "Wie alt bist du?",
            "wrongFeedback": "Tämä kysyy ikää."
          }
        ],
        "correctOption": "b",
        "success": "Können Sie das bitte wiederholen? sopii tilanteeseen.",
        "hint": "Wiederholen = toistaa.",
        "reteach": "Können Sie das bitte wiederholen? sopii tilanteeseen. Wiederholen = toistaa.",
        "genericWrong": "Kertaa fraasin käyttötarkoitus. Wiederholen = toistaa."
      }
    },
    {
      "id": "source",
      "kind": "book",
      "title": "Vertaa koulukohtausta ja Eva-haastattelua",
      "phase": "Lähde",
      "paragraphs": [
        "C08:n Text A:ssa on koko 26 yksikön Schule-kohtaus. Tunnista siitä Guten Morgen, Mathe, Sehr gut ja Musik.",
        "Text B:ssä on Evan kahdeksan repliikin COERLL-haastattelun litteraatti, mutta ei upotettua videota tai ääntä. Voit lukea sen mutta tämän kokeen pistemäärää ei päätellä sen kuulemisesta."
      ],
      "bookLinks": [
        {
          "chapterId": "08",
          "section": "text",
          "label": "C08 · Koko Schule-alkuteksti",
          "instruction": "Kertaa tutut sanat alkuperäisestä koulukohtauksesta."
        },
        {
          "chapterId": "08",
          "section": "text-b",
          "label": "C08 · Evan kahdeksan repliikin litteraatti",
          "instruction": "Vapaaehtoinen luetun ymmärtämisen kertaus."
        }
      ]
    },
    {
      "id": "practice",
      "kind": "book",
      "title": "Kertaa 12 oikeaa harjoitusta",
      "phase": "Kirjan harjoitukset",
      "paragraphs": [
        "Avaa kirjan Harjoittele-osio ja kertaa haluamasi C08-EX-01–12 tehtävät. Tee erityisesti sanojen verstehe ja langsamer täydennykset muistista.",
        "Harjoituksissa syntyvä vastaus ei ole kappaletestin palautus. Palauta varsinainen koe erikseen."
      ],
      "bookLinks": [
        {
          "chapterId": "08",
          "section": "practice",
          "label": "C08 · Kaikki 12 harjoitusta",
          "instruction": "Kertaa vaikeat fraasit ennen koetta."
        }
      ]
    },
    {
      "id": "independent",
      "kind": "question",
      "title": "Kirjoita perusfraasi muistista",
      "phase": "Itsenäinen harjoitus",
      "paragraphs": [
        "Peitä mallitaulu. Kirjoita saksaksi, että et ymmärrä."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-SURV-08",
        "evidenceRole": "independent",
        "prompt": "Kirjoita saksaksi: En ymmärrä.",
        "accepted": [
          "Ich verstehe nicht.",
          "Ich verstehe nicht"
        ],
        "success": "Ich verstehe nicht. on oikein.",
        "hint": "Käytä ich, verstehe, nicht.",
        "reteach": "Ich verstehe nicht. on oikein. Käytä ich, verstehe, nicht.",
        "genericWrong": "Tarkista opittu kokonainen fraasi. Käytä ich, verstehe, nicht.",
        "wrongAnswers": {
          "ich verstehen nicht": "Ich-muodon verbi on verstehe.",
          "ich verstehe": "Kielteinen nicht puuttuu."
        }
      }
    },
    {
      "id": "application",
      "kind": "question",
      "title": "Kysy juuri sanan merkitystä",
      "phase": "Soveltaminen",
      "paragraphs": [
        "Kuulet sanan hyvin, mutta et tiedä mitä se tarkoittaa."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-SURV-08",
        "evidenceRole": "application",
        "prompt": "Mikä kysymys ratkaisee tämän?",
        "options": [
          {
            "id": "a",
            "label": "Wie schreibt man das?",
            "wrongFeedback": "Tämä kysyy kirjoitusasua."
          },
          {
            "id": "b",
            "label": "Bitte langsamer.",
            "wrongFeedback": "Tämä pyytää hidastamaan."
          },
          {
            "id": "c",
            "label": "Was bedeutet das?"
          }
        ],
        "correctOption": "c",
        "success": "Was bedeutet das? kysyy merkitystä.",
        "hint": "Bedeutet = tarkoittaa.",
        "reteach": "Was bedeutet das? kysyy merkitystä. Bedeutet = tarkoittaa.",
        "genericWrong": "Kertaa fraasin käyttötarkoitus. Bedeutet = tarkoittaa."
      }
    },
    {
      "id": "testguide",
      "kind": "explanation",
      "title": "Koe arvioidaan vain kirjan omassa järjestelmässä",
      "phase": "Koeohjeet",
      "paragraphs": [
        "Vastaa kaikkiin 12 C08-kappaletestin tehtävään ennen Palauta testi -painiketta. Ratkaisut ja pisteet avautuvat vasta palautuksen jälkeen.",
        "Palautushetki, testivastaukset ja mahdolliset aiemmat yritykset jäävät samaan kirjan nykyiseen tallennukseen. Opettaja ei muokkaa niitä.",
        "Uusi yritys aloitetaan vain kirjan Arkistoi tulos ja aloita uusinta -toiminnolla. Vanhan yrityksen vastaukset säilyvät erillisinä."
      ]
    },
    {
      "id": "exam",
      "kind": "book",
      "title": "Avaa ja palauta oikea 12 tehtävän koe",
      "phase": "Kappaletesti",
      "paragraphs": [
        "Avaa C08:n Kappaletesti-sivu, täytä kaikki 12 harjoituspankin osatehtävää ja paina Palauta testi.",
        "Pelkkä testisivun avaaminen ei riitä. Teacher 2.0 tarkistaa oikean palautusmerkinnän ja kaikkien 12 tehtävän vastaamisen."
      ],
      "bookLinks": [
        {
          "chapterId": "08",
          "section": "test",
          "label": "C08 · Kappaletesti, 12 tehtävää",
          "instruction": "Tee kaikki 12 ja palauta koko koe."
        }
      ]
    },
    {
      "id": "reflection",
      "kind": "book",
      "title": "Kirjoita vähintään 15 merkin itsearvio",
      "phase": "Itsearviointi",
      "paragraphs": [
        "Testin palautuksen jälkeen kirjoita sen Itsearviointi-kenttään, minkä avunpyynnön osasit ilman mallia ja mikä vielä tuntuu vaikealta.",
        "Kirjoita vähintään 15 merkkiä. Tämä on oma havaintosi, ei koneen antama puhe- tai kuunteluarvosana."
      ],
      "bookLinks": [
        {
          "chapterId": "08",
          "section": "test",
          "label": "C08 · Koe ja itsearvio",
          "instruction": "Tallenna sanallinen oppimishavainto palautuksen jälkeen."
        }
      ]
    },
    {
      "id": "activity",
      "kind": "activity",
      "title": "Tee yksi oma kertaus ääneen tai kirjoittaen",
      "phase": "Oma kertaus",
      "paragraphs": [
        "Kuvittele ettet ymmärtänyt pitkää lausetta. Sano tai kirjoita peräkkäin Ich verstehe nicht. ja Noch einmal, bitte.",
        "Vahvista oma harjoitteluyrityksesi. Mikrofonin tai audion arviointia ei käytetä."
      ],
      "activityId": "c08-teacher-L045",
      "activityLabel": "Kertasin kaksi peräkkäistä avunpyyntöä"
    },
    {
      "id": "exit",
      "kind": "question",
      "title": "Mitä 12 tehtävän pistemäärä kertoo?",
      "phase": "Lopputarkistus",
      "paragraphs": [
        "Varmista, että et pidä tekstikoetta puhumisen tai kuuntelun todistuksena."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-SURV-08",
        "evidenceRole": "exit",
        "prompt": "Mikä on oikea tulkinta C08:n kappaletestistä?",
        "options": [
          {
            "id": "a",
            "label": "12/12 pistettä todistaa automaattisesti ääntämisen.",
            "wrongFeedback": "Ääntämistä ei pisteytetä."
          },
          {
            "id": "b",
            "label": "12 tehtävän koe arvioi opittuja kirjoitettuja fraaseja ja sanoja, ei koko puhe- ja kuuntelutaitoa."
          },
          {
            "id": "c",
            "label": "Lähdetekstin avaaminen palauttaa kokeen.",
            "wrongFeedback": "Koe palautetaan erilliseltä testisivulta."
          }
        ],
        "correctOption": "b",
        "success": "Kappaletesti on rajattu kirjoitettuihin tehtäviin.",
        "hint": "Arvosanaa ei päätellä kuuntelusta.",
        "reteach": "Kappaletesti on rajattu kirjoitettuihin tehtäviin. Arvosanaa ei päätellä kuuntelusta.",
        "genericWrong": "Kertaa fraasin käyttötarkoitus. Arvosanaa ei päätellä kuuntelusta."
      }
    },
    {
      "id": "summary",
      "kind": "summary",
      "title": "C08:n kappaletesti ja itsearviointi tallessa",
      "phase": "Yhteenveto",
      "paragraphs": [
        "Opettajatunti päättyy vasta kun kaikki opetustilanteet on käyty, 12 oikeaa testitehtävää palautettu, oma harjoittelu vahvistettu ja itsearviointi tallennettu.",
        "Täydet pisteet eivät ole vaatimus. Kirjan koehistoria säilyy, vaikka myöhemmin aloitat uuden yrityksen.",
        "C08:n äänitteen ja videon oikeus- ja laitetarkistukset sekä vaikean alkuperäistekstin pedagoginen loppuhyväksyntä ovat erillisiä julkaisuporteja. Seuraavaksi C09 opettaa viikonpäivät ja ajanilmaisut."
      ]
    }
  ]
};
