import type { TeacherLesson } from "./engine.ts";
/** Review I reuses reserved assessment draft 91, not a textbook chapter C91. */
export const LOS1_L027_TEACHER: TeacherLesson = {
  "id": "L027",
  "bookId": 1,
  "chapterId": "91",
  "version": "2.0.0-preview.1",
  "title": "Muistanko tervehtimisen ja esittäytymisen?",
  "objective": "Kertaan tervehdykset ja esittäytymisen, teen viisi oikeaa kertaustehtävää ja arvioin muistamistani.",
  "estimatedMinutes": 30,
  "scenes": [
    {
      "id": "welcome",
      "kind": "introduction",
      "phase": "Aloitus",
      "title": "Mitä kertaamme tällä tunnilla?",
      "paragraphs": [
        "Kertaus I yhdistää aiemmin opittuja asioita. Aloita muistelusta ilman näkyvää mallia.",
        "Tässä tunnissa tarkistat kirjan Kertaus I -sivun L027-osion viisi oikeaa tehtävää. Nämä eivät ole EX-MID-välikokeen pisteitä."
      ]
    },
    {
      "id": "recall",
      "kind": "question",
      "phase": "Muistelu",
      "title": "Aloita muistista ilman mallia",
      "paragraphs": [
        "Palauta ensin mieleen jo aiemmin harjoiteltu ilmaus."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-01",
        "evidenceRole": "practice",
        "prompt": "Mikä aloittaa ystävän kohtaamisen?",
        "options": [
          {
            "id": "a",
            "label": "Tschüss!",
            "wrongFeedback": "Tschüss! kuuluu hyvästelyyn."
          },
          {
            "id": "b",
            "label": "Hallo!"
          },
          {
            "id": "c",
            "label": "Auf Wiedersehen!",
            "wrongFeedback": "Auf Wiedersehen! päättää kohtaamisen."
          }
        ],
        "correctOption": "b",
        "success": "Hallo! aloittaa tapaamisen.",
        "hint": "Mieti, aloittaako vai lopettaako ilmaus keskustelun.",
        "reteach": "Hallo! aloittaa tapaamisen. Mieti, aloittaako vai lopettaako ilmaus keskustelun.",
        "genericWrong": "Vertaa vaihtoehdon merkitystä tilanteeseen. Mieti, aloittaako vai lopettaako ilmaus keskustelun."
      }
    },
    {
      "id": "explain",
      "kind": "explanation",
      "phase": "Opetus",
      "title": "Opettaja yhdistää aiemmat asiat",
      "paragraphs": [
        "Hallo! aloittaa kohtaamisen. Tschüss! on arkinen hyvästely ja Auf Wiedersehen! kohteliaampi hyvästely.",
        "Kun kysyt tuttavan nimeä, käytät kokonaisuutta Wie heißt du? Vastaat esimerkiksi Ich heiße Mia. Huomaa, että du ja ich saavat eri verbimuodot.",
        "Nimen voi kertoa myös Ich bin Leo. Kumpikaan nimi ei ole henkilötietopyyntö: käytä kuvitteellisia henkilöitä."
      ],
      "help": [
        {
          "title": "Miksi heißt mutta heiße?",
          "body": "Wie heißt du? kysyy sinun nimeäsi. Ich heiße Mia. kertoo minun nimeni. Ero liittyy siihen, kenen tekemisestä puhutaan."
        },
        {
          "title": "Milloin Guten Morgen?",
          "body": "Guten Morgen! on aamun tervehdys, Guten Abend! illan tervehdys ja Gute Nacht! hyvän yön toivotus."
        }
      ]
    },
    {
      "id": "board",
      "kind": "board",
      "phase": "Opetustaulu",
      "title": "Seuraa fraasien vaiheita",
      "paragraphs": [
        "Lue mallit yksitellen ja yhdistä saksankielinen ilmaus käyttötarkoitukseensa. Kokeile lopuksi muistaa ilman taulua."
      ],
      "board": [
        {
          "label": "Tapaaminen",
          "german": "Hallo!",
          "meaning": "Hei, keskustelu alkaa."
        },
        {
          "label": "Nimen kysyminen",
          "german": "Wie heißt du?",
          "meaning": "Mikä sinun nimesi on?"
        },
        {
          "label": "Nimen kertominen",
          "german": "Ich heiße Mia.",
          "meaning": "Nimeni on Mia."
        },
        {
          "label": "Toinen esittäytyminen",
          "german": "Ich bin Leo.",
          "meaning": "Minä olen Leo."
        },
        {
          "label": "Lähteminen",
          "german": "Tschüss!",
          "meaning": "Moikka, keskustelu päättyy."
        }
      ]
    },
    {
      "id": "guided",
      "kind": "question",
      "phase": "Ohjattu harjoitus",
      "title": "Ratkaise ensimmäinen uusi tilanne",
      "paragraphs": [
        "Tee valinta aiemmin opetetun säännön ja uuden tilanteen perusteella."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-GRA-01",
        "evidenceRole": "practice",
        "prompt": "Miten sanot, että kuvitteellinen nimesi on Emil?",
        "options": [
          {
            "id": "a",
            "label": "Ich heißt Emil.",
            "wrongFeedback": "Heißt on du-pronominin yhteydessä."
          },
          {
            "id": "b",
            "label": "Du heiße Emil.",
            "wrongFeedback": "Du ei vastaa kysymykseen omasta nimestäsi."
          },
          {
            "id": "c",
            "label": "Ich heiße Emil."
          }
        ],
        "correctOption": "c",
        "success": "Ich heiße Emil. kertoo oman nimen.",
        "hint": "Muista Ich heiße + nimi.",
        "reteach": "Ich heiße Emil. kertoo oman nimen. Muista Ich heiße + nimi.",
        "genericWrong": "Vertaa vaihtoehdon merkitystä tilanteeseen. Muista Ich heiße + nimi."
      }
    },
    {
      "id": "source",
      "kind": "book",
      "phase": "Alkuperäisteksti",
      "title": "Palaa alkuperäisiin kirjalähteisiin",
      "paragraphs": [
        "Käy opetetut fraasit läpi oikeilla oppikirjasivuilla.",
        "Kirjan sivulla olevat tekstit ovat kokonaisia lähdeaineistoja. Tässä tunnissa niitä ei korvata tekaistuilla äänitteillä."
      ],
      "bookLinks": [
        {
          "chapterId": "01",
          "section": "vocabulary",
          "label": "C01:n tervehdyssanasto",
          "instruction": "Kertaa aamu-, päivä- ja hyvästelyilmaisut."
        },
        {
          "chapterId": "02",
          "section": "text",
          "label": "C02:n kokonainen Franz–Greta-dialogi",
          "instruction": "Tunnista nimen kysyminen ja siihen vastaaminen."
        }
      ]
    },
    {
      "id": "review",
      "kind": "book",
      "phase": "Kertaus I",
      "title": "Tarkista viisi aitoa kertaustehtävää",
      "paragraphs": [
        "Avaa Kertaus I -sivu ja tee L027-osion kysymykset EX-REV1-Q01, EX-REV1-Q02, EX-REV1-Q03, EX-REV1-Q04, EX-REV1-Q05. Paina Tarkista vastaus jokaisen tehtävän kohdalla.",
        "Tämä oppitunti tarkistaa viisi todellista tallennettua vastausta sekä niiden tarkistusmerkinnät. Tarkistus ei edellytä viittä oikeaa vastausta."
      ],
      "bookLinks": [
        {
          "chapterId": "01",
          "section": "review",
          "label": "Kertaus I · L027",
          "instruction": "Vastaa ja tarkista EX-REV1-Q01–EX-REV1-Q05."
        }
      ]
    },
    {
      "id": "independent",
      "kind": "question",
      "phase": "Itsenäinen harjoittelu",
      "title": "Muista yksi ilmaus itse",
      "paragraphs": [
        "Sulje malliteksti ennen vastausta. Vastaus saa mennä väärin; tarkista opettajan palaute."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-INT-02",
        "evidenceRole": "independent",
        "prompt": "Kirjoita saksaksi: Mikä sinun nimesi on? (tuttavallinen)",
        "accepted": [
          "Wie heißt du?",
          "Wie heißt du"
        ],
        "success": "Wie heißt du? on oikea kysymys.",
        "hint": "Kysymys alkaa Wie ja päättyy du.",
        "reteach": "Wie heißt du? on oikea kysymys. Kysymys alkaa Wie ja päättyy du.",
        "genericWrong": "Tarkista fraasin sanat ja sanajärjestys. Kysymys alkaa Wie ja päättyy du.",
        "wrongAnswers": {
          "wie heißen sie": "Wie heißen Sie? on kohtelias, tässä kysytään tutulta."
        }
      }
    },
    {
      "id": "application",
      "kind": "question",
      "phase": "Soveltaminen",
      "title": "Sovella uudessa tilanteessa",
      "paragraphs": [
        "Käytä aiempaa tietoa tässä uudessa tilanteessa, älä kopioi suoraan opetustaulua."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-02",
        "evidenceRole": "application",
        "prompt": "Kerro olevasi nimeltä Mina käyttäen sein-verbiä.",
        "options": [
          {
            "id": "a",
            "label": "Ich bin Mina."
          },
          {
            "id": "b",
            "label": "Ich bist Mina.",
            "wrongFeedback": "Ich-pronominin kanssa kuuluu bin."
          },
          {
            "id": "c",
            "label": "Du bin Mina.",
            "wrongFeedback": "Du ja bin eivät muodosta oikeaa paria."
          }
        ],
        "correctOption": "a",
        "success": "Ich bin Mina. on oikein.",
        "hint": "Tarvitset muodon ich bin.",
        "reteach": "Ich bin Mina. on oikein. Tarvitset muodon ich bin.",
        "genericWrong": "Vertaa vaihtoehdon merkitystä tilanteeseen. Tarvitset muodon ich bin."
      }
    },
    {
      "id": "reflection",
      "kind": "book",
      "phase": "Oma itsearvio",
      "title": "Arvioi muistamistasi rehellisesti",
      "paragraphs": [
        "Avaa L027-osion oma itsearvio Kertaus I -sivulla. Valitse Osasin pääosin, Muistin osan tai Tarvitsen lisää harjoittelua.",
        "Arvio tallennetaan tunnisteelle EX-REV1-SELF-027. Oman arvioinnin taso ei anna eikä vähennä EX-MID-välikokeen pisteitä. Vahvista sen jälkeen alla tämä opiskeluteko."
      ],
      "bookLinks": [
        {
          "chapterId": "01",
          "section": "review",
          "label": "Kertaus I · L027 · itsearvio",
          "instruction": "Täytä EX-REV1-SELF-027."
        }
      ],
      "activityId": "review-reflection-L027",
      "activityLabel": "Arvioin muistamistani itse"
    },
    {
      "id": "exit",
      "kind": "question",
      "phase": "Lopputarkistus",
      "title": "Lopputarkistus",
      "paragraphs": [
        "Tee vielä yksi lyhyt lopputarkistus ennen yhteenvedon avaamista."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-01",
        "evidenceRole": "exit",
        "prompt": "Mikä sopii rentoon hyvästelyyn?",
        "options": [
          {
            "id": "a",
            "label": "Guten Tag!",
            "wrongFeedback": "Guten Tag! on tervehdys."
          },
          {
            "id": "b",
            "label": "Tschüss!"
          },
          {
            "id": "c",
            "label": "Guten Morgen!",
            "wrongFeedback": "Guten Morgen! on aamun tervehdys."
          }
        ],
        "correctOption": "b",
        "success": "Tschüss! päättää kohtaamisen.",
        "hint": "Valitse hyvästely, ei aloitusta.",
        "reteach": "Tschüss! päättää kohtaamisen. Valitse hyvästely, ei aloitusta.",
        "genericWrong": "Vertaa vaihtoehdon merkitystä tilanteeseen. Valitse hyvästely, ei aloitusta."
      }
    },
    {
      "id": "summary",
      "kind": "summary",
      "phase": "Yhteenveto",
      "title": "Kertauksen yhteenveto",
      "paragraphs": [
        "Kertasit kohtaamisen aloituksen, nimen kysymisen, oman nimen kertomisen ja hyvästelyn.",
        "Kirjan viisi tarkistettua tehtävää sekä oma muistamisen arvio ovat erillisiä välikokeen 25 pisteestä. Väärä kertaustehtävän vastaus ei estä läpikäyntiä."
      ]
    }
  ],
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredActivityIds": [
    "review-reflection-L027"
  ],
  "requiredPracticeIds": [
    "EX-REV1-SELF-027"
  ],
  "requiredCheckedIds": [
    "EX-REV1-Q01",
    "EX-REV1-Q02",
    "EX-REV1-Q03",
    "EX-REV1-Q04",
    "EX-REV1-Q05"
  ]
};
