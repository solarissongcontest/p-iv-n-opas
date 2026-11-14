import type { TeacherLesson } from "./engine.ts";
/** C05 L024: nicht/ sehr taught only within safe beginner frames; no case paradigms. */
export const LOS1_L024_TEACHER: TeacherLesson = {
  "id": "L024",
  "bookId": 1,
  "chapterId": "05",
  "version": "2.0.0-preview.1",
  "title": "Vointifraasit ja nicht",
  "objective": "Ymmärrän ja käytän sehr- ja nicht-sanoja yksinkertaisissa, aiemmin opetettuihin rakenteisiin perustuvissa vointifraaseissa.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "placement",
    "independent",
    "application",
    "exit"
  ],
  "requiredActivityIds": [
    "grammar-reviewed"
  ],
  "requiredPracticeIds": [
    "C05-EX-03",
    "C05-EX-04",
    "C05-EX-05",
    "C05-EX-11"
  ],
  "scenes": [
    {
      "id": "welcome",
      "phase": "Aloitus",
      "kind": "introduction",
      "title": "Kaikki kuulumiset eivät ole hyviä",
      "paragraphs": [
        "L022–L023 opettivat kysymyksen Wie geht's? ja vastauksen Mir geht es gut. Mutta jos et voi hyvin, tarvitset myös sanan nicht.",
        "Tällä tunnilla harjoittelet vain lyhyitä, oikeita arkisia vointifraaseja. Saksan sijamuotojärjestelmää, kein-kieltoa tai kaikkia nicht-sanan sanajärjestyssääntöjä ei vielä vaadita."
      ]
    },
    {
      "id": "recall",
      "phase": "Muistelu",
      "title": "Mitä myönteinen vastaus tarkoittaa?",
      "kind": "question",
      "paragraphs": [
        "Aloita tutusta ilmauksesta ennen kuin muutamme sen merkitystä."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-05",
        "evidenceRole": "practice",
        "prompt": "Mitä Mir geht's gut. tarkoittaa?",
        "options": [
          {
            "id": "a",
            "label": "Minulle kuuluu hyvää."
          , "lang": "fi"},
          {
            "id": "b",
            "label": "Mikä sinun nimesi on?", "lang": "fi",
            "wrongFeedback": "Tämä tarkoittaisi nimikysymystä, ei vointia."
          },
          {
            "id": "c",
            "label": "Minulla on huono olo.", "lang": "fi",
            "wrongFeedback": "Mir geht's gut. on myönteinen vointifraasi."
          }
        ],
        "correctOption": "a",
        "success": "Oikein. Mir geht's gut. kertoo hyvästä voinnista.",
        "hint": "Gut tarkoittaa hyvää.",
        "reteach": "Mir geht's gut. = Minulle kuuluu hyvää.",
        "genericWrong": "Mir geht's gut. = Minulle kuuluu hyvää."
      }
    },
    {
      "id": "meaning",
      "phase": "Opetus",
      "kind": "explanation",
      "title": "Sehr vahvistaa, nicht kieltää",
      "paragraphs": [
        "Gut tarkoittaa hyvin tai hyvää. Sehr gut tarkoittaa erittäin hyvin: sehr vahvistaa gut-sanan merkitystä.",
        "Nicht tarkoittaa kielteisyyttä: 'ei'. Tavallinen vointivastaus on Nicht so gut. eli 'Ei kovin hyvin'. Tässä nicht sijoittuu fraasin alussa ennen so gut -osaa, jota se rajaa.",
        "Voit sanoa myös Mir geht es nicht gut. eli 'Minulle ei kuulu hyvää'. Älä siirrä sanaa suoraan saksan loppuun: tässä kiinteässä mallissa nicht tulee ennen gut-sanaa.",
        "Tuttu C02:n rakenne Ich bin yhdistyy vointia kuvaavaan sanaan: Ich bin müde. = Olen väsynyt. Ich bin nicht müde. = En ole väsynyt. Tässäkin nicht tulee ennen müde-sanaa.",
        "Sanat mir ja dir esiintyvät yhä vain valmiissa vointifraaseissa. Mitään datiivin taivutusta ei tarvitse tehdä."
      ],
      "help": [
        {
          "title": "Miksi sanotaan Nicht so gut eikä so gut nicht?",
          "body": "Tässä lyhyessä vastauksessa nicht tulee ennen kuvausta so gut. Opettele koko kiinteä fraasi: Nicht so gut."
        },
        {
          "title": "Onko sehr ja nicht samanlaisia sanoja?",
          "body": "Ei. Sehr voimistaa: sehr gut = erittäin hyvin. Nicht kieltää tai rajaa: nicht so gut = ei kovin hyvin."
        },
        {
          "title": "Miksi en opi kaikkia nicht-sääntöjä?",
          "body": "Nicht-sanan paikka riippuu siitä, mitä kielletään. Tässä alkeisvaiheessa opit kolme turvallista rakennetta: Nicht so gut; Mir geht es nicht gut; Ich bin nicht müde."
        }
      ]
    },
    {
      "id": "board",
      "phase": "Opetustaulu",
      "kind": "board",
      "title": "Rakenna myönteinen ja kielteinen ilmaus",
      "paragraphs": [
        "Katso askel kerrallaan, miten uusi sana muuttaa merkitystä. Opetustaulu näyttää myös tavallisen sijoitusvirheen.",
        "Saksan rakenteet kannattaa oppia kokonaisina. Tässä esitetyt mallit eivät ole yleissääntö kaikille saksan kielteisille lauseille."
      ],
      "board": [
        {
          "label": "1 · Perusvastaus",
          "german": "Gut.",
          "meaning": "Hyvin."
        },
        {
          "label": "2 · Vahvennus",
          "german": "Sehr gut.",
          "meaning": "Erittäin hyvin. Sehr on ennen gut-sanaa."
        },
        {
          "label": "3 · Kielteinen lyhyt vastaus",
          "german": "Nicht so gut.",
          "meaning": "Ei kovin hyvin. Nicht tulee ennen so gut -osaa."
        },
        {
          "label": "4 · Täysi myönteinen fraasi",
          "german": "Mir geht es gut.",
          "meaning": "Minulle kuuluu hyvää. Mir on kiinteän vointifraasin osa."
        },
        {
          "label": "5 · Täysi kielteinen fraasi",
          "german": "Mir geht es nicht gut.",
          "meaning": "Minulle ei kuulu hyvää. Nicht sijoittuu ennen gut-sanaa."
        },
        {
          "label": "6 · Myös tuttu ich bin",
          "german": "Ich bin nicht müde.",
          "meaning": "En ole väsynyt. Nicht on ennen müde-sanaa."
        }
      ]
    },
    {
      "id": "guided",
      "phase": "Ohjattu harjoittelu",
      "title": "Kumpi kertoo erittäin hyvästä voinnista?",
      "kind": "question",
      "paragraphs": [
        "Vertaa sehr- ja nicht-sanojen vaikutusta opettajan taulussa."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-05",
        "evidenceRole": "practice",
        "prompt": "Ystäväsi sanoo, että menee erittäin hyvin. Mikä vastaa tätä?",
        "options": [
          {
            "id": "a",
            "label": "Nicht so gut.",
            "wrongFeedback": "Nicht rajaa hyvän voinnin merkitystä. Tämä ei tarkoita erittäin hyvin."
          },
          {
            "id": "b",
            "label": "Sehr gut."
          },
          {
            "id": "c",
            "label": "Und dir?",
            "wrongFeedback": "Und dir? on vastakysymys, ei vointikuvaus."
          }
        ],
        "correctOption": "b",
        "success": "Oikein. Sehr gut = erittäin hyvin.",
        "hint": "Sehr on vahvistava sana.",
        "reteach": "Sehr gut vahvistaa myönteisen gut-sanan; nicht so gut rajaa sitä.",
        "genericWrong": "Sehr gut vahvistaa myönteisen gut-sanan; nicht so gut rajaa sitä."
      }
    },
    {
      "id": "placement",
      "phase": "Ohjattu korjaus",
      "title": "Mihin nicht kuuluu?",
      "kind": "question",
      "paragraphs": [
        "Vertaa opettajan kielteistä kokonaista mallifraasia."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-05",
        "evidenceRole": "practice",
        "prompt": "Mikä näistä tarkoittaa luontevasti 'Minulle ei kuulu hyvää'?",
        "options": [
          {
            "id": "a",
            "label": "Mir geht nicht es gut.",
            "wrongFeedback": "Tässä nicht on väärässä kohdassa. Opetetussa mallissa sanotaan Mir geht es nicht gut."
          },
          {
            "id": "b",
            "label": "Mir geht es gut nicht.",
            "wrongFeedback": "Nicht ei tule tähän suoran kielteisyyden malliin lauseen loppuun. Oikea on Mir geht es nicht gut."
          },
          {
            "id": "c",
            "label": "Mir geht es nicht gut."
          }
        ],
        "correctOption": "c",
        "success": "Oikein. Nicht on ennen gut-sanaa lauseessa Mir geht es nicht gut.",
        "hint": "Yhdistä ensin Mir geht es ja lisää nicht juuri ennen gut-sanaa.",
        "reteach": "Opi kiinteä malli: Mir geht es nicht gut. Älä sijoita nicht-sanaa ennen es-sanaa tai aivan loppuun.",
        "genericWrong": "Opi kiinteä malli: Mir geht es nicht gut. Älä sijoita nicht-sanaa ennen es-sanaa tai aivan loppuun."
      }
    },
    {
      "id": "book",
      "phase": "Harjoittele kirjassa",
      "kind": "book",
      "title": "Neljä oikeaa C05-kirjatehtävää",
      "paragraphs": [
        "Tee oppikirjan Harjoittele-sivulta neljä opetusaiheeseen sidottua tehtävää: C05-EX-03 (Nicht so gut), C05-EX-04 (nicht), C05-EX-05 (sehr gut) ja C05-EX-11 (Nicht so gut -fraasin täydentäminen).",
        "Tarkista vastaus ja lue perustelu. Sama harjoitustallennus näkyy kirjan ja Teacher Playerin puolella. Näiden vastausten pisteet eivät muutu opettajan sisäisiksi pisteiksi."
      ],
      "bookLinks": [
        {
          "label": "C05 · Harjoittele (EX-03, 04, 05, 11)",
          "chapterId": "05",
          "section": "practice",
          "instruction": "Tee neljä harjoitusta; vertaa nicht- ja sehr-merkityksiä."
        }
      ],
      "help": [
        {
          "title": "Miten täytän EX-11:n?",
          "body": "Tehtävässä on jo so gut. Täydennä alkuun sana Nicht. Koko ilmaus on Nicht so gut."
        }
      ]
    },
    {
      "id": "grammar-note",
      "phase": "Opetuksen varmistus",
      "kind": "activity",
      "title": "Kerro ero omin sanoin",
      "paragraphs": [
        "Pysähdy ja selitä itsellesi suomeksi: sehr gut kertoo erittäin hyvästä voinnista, nicht so gut tarkoittaa ei kovin hyvää.",
        "Katso taululta myös täysi lause Mir geht es nicht gut. Näet, että nicht on ennen gut-sanaa. Tätä ei arvioida puhuttuna tai kielioppisääntöjen ulkoa muistamisena."
      ],
      "activityId": "grammar-reviewed",
      "activityLabel": "Vertasin sehr- ja nicht-mallit sekä selitin eron itselleni"
    },
    {
      "id": "independent",
      "phase": "Itsenäinen harjoittelu",
      "kind": "question",
      "title": "Kirjoita kielteinen vastaus muistista",
      "paragraphs": [
        "Sulje taulu ja kirjan sanasto. Kirjoita opittu lyhyt vointifraasi itse."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-INT-05",
        "evidenceRole": "independent",
        "prompt": "Kirjoita saksaksi: Ei kovin hyvin.",
        "accepted": [
          "Nicht so gut.",
          "Nicht so gut!"
        ],
        "success": "Oikein. Nicht so gut. rajaa myönteisen gut-ilmauksen.",
        "hint": "Aloita kieltosanalla nicht ja jatka so gut.",
        "reteach": "Lyhyt kiinteä vastaus on Nicht so gut. Kieltosana tulee ensin.",
        "genericWrong": "Tarkista sanajärjestys: Nicht + so + gut.",
        "wrongAnswers": {
          "so nicht gut": "Tässä sanajärjestys on väärä. Opettele fraasi Nicht so gut.",
          "so gut nicht": "Nicht tulee tässä fraasissa ennen so gut -osaa.",
          "sehr gut": "Sehr gut kertoo erittäin hyvästä voinnista, ei kielteisestä."
        }
      }
    },
    {
      "id": "application",
      "phase": "Soveltaminen",
      "title": "Kysyminen ja kielteinen vastaus",
      "kind": "question",
      "paragraphs": [
        "Nyt valitaan oikea vastaus tilanteen perusteella, ei pelkän sanan merkityksen perusteella."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-05",
        "evidenceRole": "application",
        "prompt": "Ystävä sanoo Wie geht's? Vastaat, että et voi hyvin. Mikä sopii?",
        "options": [
          {
            "id": "a",
            "label": "Mir geht es nicht gut."
          },
          {
            "id": "b",
            "label": "Sehr gut!",
            "wrongFeedback": "Tämä sanoo, että menee erittäin hyvin. Se on tilanteen vastakohta."
          },
          {
            "id": "c",
            "label": "Wie heißt du?",
            "wrongFeedback": "Tämä on nimikysymys, ei voinnin kuvaus."
          }
        ],
        "correctOption": "a",
        "success": "Oikein. Mir geht es nicht gut. kertoo huonosta voinnista.",
        "hint": "Etsi kokonainen fraasi, jossa nicht on ennen gut-sanaa.",
        "reteach": "Mir geht es nicht gut kertoo, ettei sinulle kuulu hyvää.",
        "genericWrong": "Mir geht es nicht gut kertoo, ettei sinulle kuulu hyvää."
      }
    },
    {
      "id": "exit",
      "phase": "Lopputarkistus",
      "title": "Negaatio tutussa ich bin -lauseessa",
      "kind": "question",
      "paragraphs": [
        "Sovella opittua erilaiseen, mutta jo C02:n sein-verbiin perustuvaan malliin."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-05",
        "evidenceRole": "exit",
        "prompt": "Mikä tarkoittaa 'En ole väsynyt'?",
        "options": [
          {
            "id": "a",
            "label": "Ich nicht bin müde.",
            "wrongFeedback": "Tämä ei ole opetettu oikea sanajärjestys. Verbin bin jälkeen tulee nicht ennen müde-sanaa."
          },
          {
            "id": "b",
            "label": "Ich bin müde nicht.",
            "wrongFeedback": "Nicht sijoittuu ennen kuvailevaa müde-sanaa: Ich bin nicht müde."
          },
          {
            "id": "c",
            "label": "Ich bin nicht müde."
          }
        ],
        "correctOption": "c",
        "success": "Oikein. Ich bin nicht müde. = En ole väsynyt.",
        "hint": "Muista: Ich bin + nicht + müde.",
        "reteach": "Ich bin = minä olen, nicht müde = en ole väsynyt. Näissä esimerkeissä nicht tulee ennen adjektiivia.",
        "genericWrong": "Ich bin = minä olen, nicht müde = en ole väsynyt. Näissä esimerkeissä nicht tulee ennen adjektiivia."
      }
    },
    {
      "id": "summary",
      "phase": "Yhteenveto ja myöhempi kertaus",
      "kind": "summary",
      "title": "Seuraava kysymys on: mitä tarkoitat?",
      "paragraphs": [
        "Vahvistin sehr gut, kielteinen vastaus Nicht so gut ja täysi Mir geht es nicht gut muodostuvat turvallisista käyttöfraaseista.",
        "L025:ssa tunnistat alkuperäisestä Text B:stä vointia kuvaavan vastauksen. Palauta myöhemmin muistista sekä Nicht so gut. että Mir geht es nicht gut. Opetus ei sisältänyt eikä vaatinut datiivitaivutusta."
      ]
    }
  ]
};
