import type { TeacherLesson } from "./engine.ts";
/** Review I reuses reserved assessment draft 91, not a textbook chapter C91. */
export const LOS1_L028_TEACHER: TeacherLesson = {
  "id": "L028",
  "bookId": 1,
  "chapterId": "91",
  "version": "2.0.0-preview.1",
  "title": "Voinnin ja kohteliaisuuden taitosekoitus",
  "objective": "Erottelen du- ja Sie-puhuttelun vointifraaseissa ja teen viisi oikeaa kertaustehtävää.",
  "estimatedMinutes": 30,
  "scenes": [
    {
      "id": "welcome",
      "kind": "introduction",
      "phase": "Aloitus",
      "title": "Mitä kertaamme tällä tunnilla?",
      "paragraphs": [
        "Tänään yhdistät C04:n kohteliaisuuden ja C05:n kuulumiset. Päätä ensin, kenelle puhut.",
        "Tämän tunnin Kertaus I -tehtävät ovat EX-REV1-Q06–Q10. Ne tarkistetaan erikseen, eikä niiden pistemäärä siirry välikokeeseen."
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
        "skillId": "L1-INT-04",
        "evidenceRole": "practice",
        "prompt": "Mikä on saksan kohtelias Te-puhuttelu?",
        "options": [
          {
            "id": "a",
            "label": "du",
            "wrongFeedback": "Du on tuttavallinen sinä."
          },
          {
            "id": "b",
            "label": "ich",
            "wrongFeedback": "Ich tarkoittaa minä."
          },
          {
            "id": "c",
            "label": "Sie"
          }
        ],
        "correctOption": "c",
        "success": "Sie on kohtelias Te.",
        "hint": "Muista isolla kirjoitettu Sie.",
        "reteach": "Sie on kohtelias Te. Muista isolla kirjoitettu Sie.",
        "genericWrong": "Vertaa vaihtoehdon merkitystä tilanteeseen. Muista isolla kirjoitettu Sie."
      }
    },
    {
      "id": "explain",
      "kind": "explanation",
      "phase": "Opetus",
      "title": "Opettaja yhdistää aiemmat asiat",
      "paragraphs": [
        "Tuttavalle: Wie geht es dir? ja vastakysymys Und dir?. Tuntemattomalle muodollisessa tilanteessa: Wie geht es Ihnen? ja Und Ihnen?.",
        "Älä yritä vielä päätellä kaikkia sijamuotoja. Opi molemmat parit kokonaisina fraaseina.",
        "Sehr gut. tarkoittaa erittäin hyvää, Nicht so gut. ei kovin hyvää. Mir geht es nicht gut. sisältää nicht-sanan juuri ennen gut-sanaa."
      ],
      "help": [
        {
          "title": "Miksi dir ja Ihnen?",
          "body": "Ne ovat osa eri puhuttelutilanteiden vakiintuneita vointifraaseja. Datiivin taivutusta ei vaadita."
        },
        {
          "title": "Voinko aina sanoa Sie?",
          "body": "En. Ystävän kanssa du on usein luontevampi; kohteliaassa asioinnissa Sie on tavallinen."
        },
        {
          "title": "Mitä sehr ja nicht tekevät?",
          "body": "Sehr vahvistaa myönteistä, nicht kieltää tai rajaa ilmausta."
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
          "label": "Ystävälle",
          "german": "Wie geht es dir?",
          "meaning": "Mitä sinulle kuuluu?"
        },
        {
          "label": "Kaverille takaisin",
          "german": "Und dir?",
          "meaning": "Entä sinulle?"
        },
        {
          "label": "Kohteliaasti",
          "german": "Wie geht es Ihnen?",
          "meaning": "Mitä Teille kuuluu?"
        },
        {
          "label": "Kohteliaasti takaisin",
          "german": "Und Ihnen?",
          "meaning": "Entä Teille?"
        },
        {
          "label": "Ei kovin hyvin",
          "german": "Nicht so gut.",
          "meaning": "Kielteinen vointivastaus."
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
        "skillId": "L1-INT-05",
        "evidenceRole": "practice",
        "prompt": "Kysyt tuntemattoman henkilön vointia kohteliaasti.",
        "options": [
          {
            "id": "a",
            "label": "Wie geht es dir?",
            "wrongFeedback": "Dir on tässä tuttavallinen."
          },
          {
            "id": "b",
            "label": "Wie geht es Ihnen?"
          },
          {
            "id": "c",
            "label": "Wie heißt du?",
            "wrongFeedback": "Tämä kysyy nimeä, ei vointia."
          }
        ],
        "correctOption": "b",
        "success": "Wie geht es Ihnen? sopii kohteliaaseen tilanteeseen.",
        "hint": "Valitse Ihnen-loppuinen kysymys.",
        "reteach": "Wie geht es Ihnen? sopii kohteliaaseen tilanteeseen. Valitse Ihnen-loppuinen kysymys.",
        "genericWrong": "Vertaa vaihtoehdon merkitystä tilanteeseen. Valitse Ihnen-loppuinen kysymys."
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
          "chapterId": "04",
          "section": "text",
          "label": "C04:n kohtelias alkuteksti",
          "instruction": "Tunnista Wie geht es Ihnen?"
        },
        {
          "chapterId": "05",
          "section": "text",
          "label": "C05:n Heinrich–Karl-keskustelu",
          "instruction": "Tunnista Wie geht es dir? ja Und dir?"
        }
      ]
    },
    {
      "id": "review",
      "kind": "book",
      "phase": "Kertaus I",
      "title": "Tarkista viisi aitoa kertaustehtävää",
      "paragraphs": [
        "Avaa Kertaus I -sivu ja tee L028-osion kysymykset EX-REV1-Q06, EX-REV1-Q07, EX-REV1-Q08, EX-REV1-Q09, EX-REV1-Q10. Paina Tarkista vastaus jokaisen tehtävän kohdalla.",
        "Tämä oppitunti tarkistaa viisi todellista tallennettua vastausta sekä niiden tarkistusmerkinnät. Tarkistus ei edellytä viittä oikeaa vastausta."
      ],
      "bookLinks": [
        {
          "chapterId": "04",
          "section": "review",
          "label": "Kertaus I · L028",
          "instruction": "Vastaa ja tarkista EX-REV1-Q06–EX-REV1-Q10."
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
        "skillId": "L1-INT-05",
        "evidenceRole": "independent",
        "prompt": "Kirjoita saksaksi: Entä sinulle? (tuttavallinen)",
        "accepted": [
          "Und dir?",
          "Und dir"
        ],
        "success": "Und dir? sopii ystävälle.",
        "hint": "Vastakysymys alkaa Und.",
        "reteach": "Und dir? sopii ystävälle. Vastakysymys alkaa Und.",
        "genericWrong": "Tarkista fraasin sanat ja sanajärjestys. Vastakysymys alkaa Und.",
        "wrongAnswers": {
          "und ihnen": "Und Ihnen? on kohtelias vaihtoehto."
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
        "skillId": "L1-INT-04",
        "evidenceRole": "application",
        "prompt": "Miten kysyt kohteliaasti takaisin Entä Teille?",
        "options": [
          {
            "id": "a",
            "label": "Und dir?",
            "wrongFeedback": "Dir kuuluu tuttavalliseen tilanteeseen."
          },
          {
            "id": "b",
            "label": "Und Ihnen?"
          },
          {
            "id": "c",
            "label": "Wie alt bist du?",
            "wrongFeedback": "Tämä kysyy ikää eikä vastaa tilanteeseen."
          }
        ],
        "correctOption": "b",
        "success": "Und Ihnen? sopii kohteliaaseen vastakysymykseen.",
        "hint": "Etsi Ihnen-loppuinen fraasi.",
        "reteach": "Und Ihnen? sopii kohteliaaseen vastakysymykseen. Etsi Ihnen-loppuinen fraasi.",
        "genericWrong": "Vertaa vaihtoehdon merkitystä tilanteeseen. Etsi Ihnen-loppuinen fraasi."
      }
    },
    {
      "id": "reflection",
      "kind": "book",
      "phase": "Oma itsearvio",
      "title": "Arvioi muistamistasi rehellisesti",
      "paragraphs": [
        "Avaa L028-osion oma itsearvio Kertaus I -sivulla. Valitse Osasin pääosin, Muistin osan tai Tarvitsen lisää harjoittelua.",
        "Arvio tallennetaan tunnisteelle EX-REV1-SELF-028. Oman arvioinnin taso ei anna eikä vähennä EX-MID-välikokeen pisteitä. Vahvista sen jälkeen alla tämä opiskeluteko."
      ],
      "bookLinks": [
        {
          "chapterId": "04",
          "section": "review",
          "label": "Kertaus I · L028 · itsearvio",
          "instruction": "Täytä EX-REV1-SELF-028."
        }
      ],
      "activityId": "review-reflection-L028",
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
        "skillId": "L1-INT-05",
        "evidenceRole": "exit",
        "prompt": "Mikä tarkoittaa Ei kovin hyvää?",
        "options": [
          {
            "id": "a",
            "label": "Sehr gut.",
            "wrongFeedback": "Sehr gut tarkoittaa erittäin hyvää."
          },
          {
            "id": "b",
            "label": "Guten Tag.",
            "wrongFeedback": "Tämä on tervehdys."
          },
          {
            "id": "c",
            "label": "Nicht so gut."
          }
        ],
        "correctOption": "c",
        "success": "Nicht so gut. kertoo ettei kuulu kovin hyvää.",
        "hint": "Kielteinen sana on nicht.",
        "reteach": "Nicht so gut. kertoo ettei kuulu kovin hyvää. Kielteinen sana on nicht.",
        "genericWrong": "Vertaa vaihtoehdon merkitystä tilanteeseen. Kielteinen sana on nicht."
      }
    },
    {
      "id": "summary",
      "kind": "summary",
      "phase": "Yhteenveto",
      "title": "Kertauksen yhteenveto",
      "paragraphs": [
        "Kertasit kahden eri puhuttelutilanteen kysymykset ja vastakysymykset sekä kielteisen vointivastauksen.",
        "Viiden tarkistetun kertaustehtävän jälkeen arvioit myös oman muistamisesi. Täydet pisteet eivät ole tunnin suoritusvaatimus."
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
    "review-reflection-L028"
  ],
  "requiredPracticeIds": [
    "EX-REV1-SELF-028"
  ],
  "requiredCheckedIds": [
    "EX-REV1-Q06",
    "EX-REV1-Q07",
    "EX-REV1-Q08",
    "EX-REV1-Q09",
    "EX-REV1-Q10"
  ]
};
