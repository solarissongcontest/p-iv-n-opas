import type { TeacherLesson } from "./engine.ts";
/** C05 L022: deterministic Teacher 2.0 manuscript. Editorial German/rights/device QA still required. */
export const LOS1_L022_TEACHER: TeacherLesson = {
  "id": "L022",
  "bookId": 1,
  "chapterId": "05",
  "version": "2.0.0-preview.1",
  "title": "Mitä kuuluu?",
  "objective": "Osaan kysyä kuulumisia tutulta ja kohteliaasti sekä vastata myönteisesti tai varovaisen kielteisesti.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "dialogue",
    "independent",
    "application",
    "exit"
  ],
  "requiredActivityIds": [
    "text-previewed"
  ],
  "requiredPracticeIds": [
    "C05-EX-01",
    "C05-EX-02"
  ],
  "scenes": [
    {
      "id": "welcome",
      "phase": "Aloitus",
      "kind": "introduction",
      "title": "Yksi kysymys, monta mahdollista vastausta",
      "paragraphs": [
        "Aiemmin opit sanomaan Hallo! sekä kysymään toisen nimeä. Nyt opit myös kysymään, mitä toiselle kuuluu, ja vastaamaan tilanteeseen sopivasti.",
        "Harjoittelemme ensin turvallisilla, valmiiksi opetetuilla vointifraaseilla. Sinun ei tarvitse vielä osata mir-, dir- tai Ihnen-sanojen sijamuotoja. Saat suomenkielisen selityksen joka vaiheessa."
      ]
    },
    {
      "id": "recall",
      "phase": "Muistelu",
      "title": "Aloitetaanko vai hyvästelläänkö?",
      "kind": "question",
      "paragraphs": [
        "Palauta ensin mieleen C01:n tuttavallinen tervehdys."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-05",
        "evidenceRole": "practice",
        "prompt": "Tapaat tutun koulussa. Miten aloitat?",
        "options": [
          {
            "id": "a",
            "label": "Hallo!"
          },
          {
            "id": "b",
            "label": "Tschüss!",
            "wrongFeedback": "Tschüss! tarkoittaa moikka hyvästellessä. Nyt tapaaminen vasta alkaa."
          },
          {
            "id": "c",
            "label": "Auf Wiedersehen!",
            "wrongFeedback": "Tämä tarkoittaa näkemiin, ei tapaamisen alkua."
          }
        ],
        "correctOption": "a",
        "success": "Oikein, Hallo! avaa keskustelun.",
        "hint": "Etsi tervehdys, jota käytetään kohdatessa.",
        "reteach": "Hallo! = hei. Tschüss! ja Auf Wiedersehen! kuuluvat hyvästelyyn.",
        "genericWrong": "Hallo! = hei. Tschüss! ja Auf Wiedersehen! kuuluvat hyvästelyyn."
      }
    },
    {
      "id": "meaning",
      "phase": "Opetus",
      "kind": "explanation",
      "title": "Mitä Wie geht's? todella tekee?",
      "paragraphs": [
        "Wie geht's? tarkoittaa arkisesti 'Mitä kuuluu?'. Pidempi Wie geht es dir? kysyy tuttavalta aivan samaa: 'Mitä sinulle kuuluu?'. Lyhentymässä geht's yhdistyvät geht ja es.",
        "Kun puhut ystävälle, käytä Wie geht's? tai Wie geht es dir?. C04:ssä opittu kohtelias puhuttelu toimii myös täällä: Wie geht es Ihnen? tarkoittaa 'Mitä Teille kuuluu?'.",
        "Myönteinen vastaus on Gut, danke. ('Hyvää, kiitos.') tai Mir geht's gut. ('Minulle kuuluu hyvää.'). Jos kaikki ei ole hyvin, voit vastata Nicht so gut. ('Ei kovin hyvää.').",
        "Vastauksen jälkeen voit kysyä ystävältä Und dir? ('Entä sinulle?') tai kohteliaasti Und Ihnen? ('Entä Teille?'). Nämä opetellaan kokonaisina ilmauksina, ei sijamuotoharjoituksena."
      ],
      "help": [
        {
          "title": "Mitä käy, jos en tiedä miten dir taipuu?",
          "body": "Ei mitään. Wie geht es dir?, Mir geht's gut. ja Und dir? opetellaan valmiina keskustelufraaseina. Datiivia ei vaadita."
        },
        {
          "title": "Onko Wie geht's? aina syvä kysymys?",
          "body": "Ei. Se voi olla tavallinen kohtelias kuulumiskysymys. Tilanne ja keskustelijoiden suhde vaikuttavat siihen, miten pitkä vastaus sopii."
        }
      ]
    },
    {
      "id": "board",
      "phase": "Mallisuoritus",
      "kind": "board",
      "title": "Opettaja rakentaa vointikeskustelun",
      "paragraphs": [
        "Katso mallia askel kerrallaan: tervehdys, kysymys, vastaus ja vastakysymys. Näin jokaisella ilmauksella on oma tehtävänsä."
      ],
      "board": [
        {
          "label": "1 · Aloitus",
          "german": "Hallo!",
          "meaning": "Hei. Aloita kohtaaminen."
        },
        {
          "label": "2 · Kysy",
          "german": "Wie geht's?",
          "meaning": "Mitä kuuluu? Kysyt toisen vointia."
        },
        {
          "label": "3 · Vastaa",
          "german": "Gut, danke.",
          "meaning": "Hyvää, kiitos. Vastaat kysymykseen."
        },
        {
          "label": "4 · Kysy takaisin",
          "german": "Und dir?",
          "meaning": "Entä sinulle? Pidät keskustelua yllä."
        },
        {
          "label": "5 · Toinen mahdollinen vastaus",
          "german": "Nicht so gut.",
          "meaning": "Ei kovin hyvää. Kaikkien ei tarvitse aina voida hyvin."
        },
        {
          "label": "6 · Kohtelias versio",
          "german": "Wie geht es Ihnen? · Und Ihnen?",
          "meaning": "Teitittelyyn sopivat kiinteät fraasit."
        }
      ]
    },
    {
      "id": "guided",
      "phase": "Ohjattu harjoittelu",
      "title": "Kysyt ystävältä",
      "kind": "question",
      "paragraphs": [
        "Opettajan mallin ensimmäinen vointikysymys oli Wie geht's?."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-05",
        "evidenceRole": "practice",
        "prompt": "Millä kysyt tutun kuulumisia?",
        "options": [
          {
            "id": "a",
            "label": "Wie heißt du?",
            "wrongFeedback": "Wie heißt du? kysyy nimeä, ei vointia."
          },
          {
            "id": "b",
            "label": "Wie geht's?"
          },
          {
            "id": "c",
            "label": "Auf Wiedersehen!",
            "wrongFeedback": "Tämä on hyvästely."
          }
        ],
        "correctOption": "b",
        "success": "Oikein. Wie geht's? on tavallinen arkinen kuulumiskysymys.",
        "hint": "Kysymys sisältää geht.",
        "reteach": "Wie heißt du? kysyy nimeä. Wie geht's? kysyy vointia.",
        "genericWrong": "Wie heißt du? kysyy nimeä. Wie geht's? kysyy vointia."
      }
    },
    {
      "id": "dialogue",
      "phase": "Ohjattu keskustelu",
      "title": "Vastaa ystävän kysymykseen",
      "kind": "question",
      "paragraphs": [
        "Kuvittele, että ystävä sanoo: Wie geht's? Sinulla menee hyvin."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-05",
        "evidenceRole": "practice",
        "prompt": "Mikä sopii vastaukseksi?",
        "options": [
          {
            "id": "a",
            "label": "Gut, danke."
          },
          {
            "id": "b",
            "label": "Und dir?",
            "wrongFeedback": "Und dir? kysyy takaisin. Vastaa ensin omaan vointiisi."
          },
          {
            "id": "c",
            "label": "Wie heißt du?",
            "wrongFeedback": "Tämä kysyy nimeä, vaikka sinulta kysyttiin kuulumisia."
          }
        ],
        "correctOption": "a",
        "success": "Oikein. Gut, danke. vastaa kuulumiskysymykseen.",
        "hint": "Hyvää, kiitos sisältää sanat gut ja danke.",
        "reteach": "Vointikysymykseen vastaat Gut, danke. Vastakysymys Und dir? voi seurata sen jälkeen.",
        "genericWrong": "Vointikysymykseen vastaat Gut, danke. Vastakysymys Und dir? voi seurata sen jälkeen."
      }
    },
    {
      "id": "book",
      "phase": "Oppikirja",
      "kind": "book",
      "title": "Tunnista fraasit oikeasta Text A:sta",
      "paragraphs": [
        "Avaa C05:n Text A. Lue kaikki neljä Heinrichin ja Karlin repliikkiä, etsi Wie geht es dir?, mir geht es gut ja Und dir?. Tämä on ensimmäinen tutustuminen, ei vielä lähdetekstin ymmärtämiskoe.",
        "Jos olet käyttänyt vain tekstiä, et ole suorittanut kuuntelua. C05:n alkuperäinen äänite ja sen tekninen toiminta käsitellään omana julkaisuehtonaan."
      ],
      "bookLinks": [
        {
          "label": "C05 · Text A",
          "chapterId": "05",
          "section": "text",
          "instruction": "Lue neljä repliikkiä ja tunnista vointikysymys."
        },
        {
          "label": "C05 · Sanasto",
          "chapterId": "05",
          "section": "vocabulary",
          "instruction": "Vertaa kysymys-, vastaus- ja vastakysymysfraaseja."
        }
      ],
      "activityId": "text-previewed",
      "activityLabel": "Luin neljä repliikkiä ja etsin vointifraasit"
    },
    {
      "id": "practice",
      "phase": "Ohjattu harjoittelu kirjassa",
      "kind": "book",
      "title": "Tee kaksi C05:n alkutehtävää",
      "paragraphs": [
        "Avaa C05:n Harjoittele ja vastaa tehtäviin C05-EX-01 (Wie geht's? -ilmauksen merkitys) ja C05-EX-02 (myönteinen vastaus).",
        "Nämä käyttävät kirjan olemassa olevia vastaustunnisteita. Vastausvalinta ilman perustelun lukemista ei yksin todista osaamista."
      ],
      "bookLinks": [
        {
          "label": "C05 · Harjoittele",
          "chapterId": "05",
          "section": "practice",
          "instruction": "Vastaa kohtiin C05-EX-01 ja C05-EX-02."
        }
      ]
    },
    {
      "id": "independent",
      "phase": "Itsenäinen harjoittelu",
      "kind": "question",
      "title": "Vastaa ilman mallia",
      "paragraphs": [
        "Kokeile muistista. Molemmat tunnilla opetetut hyvät vastaukset kelpaavat."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-INT-05",
        "evidenceRole": "independent",
        "prompt": "Kirjoita saksaksi: Hyvää, kiitos.",
        "accepted": [
          "Gut, danke.",
          "Gut, danke!"
        ],
        "success": "Oikein. Gut, danke. on sopiva lyhyt vointivastaus.",
        "hint": "Aloita sanalla Gut ja jatka kiitoksella.",
        "reteach": "Gut = hyvää, danke = kiitos. Koko ilmaus on Gut, danke.",
        "genericWrong": "Muista kaksi sanaa oikeassa järjestyksessä: Gut, danke.",
        "wrongAnswers": {
          "wie geht's": "Wie geht's? on kysymys, ei vastaus.",
          "und dir": "Und dir? kysyy takaisin, ei kerro vointiasi."
        }
      }
    },
    {
      "id": "application",
      "phase": "Soveltaminen",
      "title": "Tuttavallinen vai kohtelias?",
      "kind": "question",
      "paragraphs": [
        "C04:ssa erottelit du- ja Sie-puhuttelun. Sovella nyt samaa kuulumiskysymyksen yhteydessä."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-05",
        "evidenceRole": "application",
        "prompt": "Puhut tuntemattomalle aikuiselle kohteliaasti. Mitä kysyt?",
        "options": [
          {
            "id": "a",
            "label": "Wie geht es dir?",
            "wrongFeedback": "Dir kuuluu tuttavalliseen sinutteluun. Tässä halutaan kohtelias ilmaus."
          },
          {
            "id": "b",
            "label": "Wie geht es Ihnen?"
          },
          {
            "id": "c",
            "label": "Wie heißt du?",
            "wrongFeedback": "Tämä kysyy nimeä ja on lisäksi tuttavallinen."
          }
        ],
        "correctOption": "b",
        "success": "Oikein. Wie geht es Ihnen? on kohtelias kuulumiskysymys.",
        "hint": "Muista C04:n Sie-puhuttelu. Kohteliaassa vointifraasissa on Ihnen.",
        "reteach": "Wie geht es dir? on tuttavallinen. Wie geht es Ihnen? on kohtelias fraasi.",
        "genericWrong": "Wie geht es dir? on tuttavallinen. Wie geht es Ihnen? on kohtelias fraasi."
      }
    },
    {
      "id": "exit",
      "phase": "Lopputarkistus",
      "title": "Kun vointi ei ole hyvä",
      "kind": "question",
      "paragraphs": [
        "Tässä vastaus ei ole automaattisesti myönteinen. Valitse tilannetta vastaava vointifraasi."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-05",
        "evidenceRole": "exit",
        "prompt": "Ystävä kysyy Wie geht's? mutta sinulla ei mene kovin hyvin. Mitä sanot?",
        "options": [
          {
            "id": "a",
            "label": "Sehr gut!",
            "wrongFeedback": "Sehr gut! tarkoittaa erittäin hyvin, siis vastakkaista tilannetta."
          },
          {
            "id": "b",
            "label": "Nicht so gut."
          },
          {
            "id": "c",
            "label": "Und dir?",
            "wrongFeedback": "Tämä kysyy toisen kuulumisia eikä kerro omasta voinnistasi."
          }
        ],
        "correctOption": "b",
        "success": "Oikein. Nicht so gut. tarkoittaa ei kovin hyvää.",
        "hint": "Nicht muuttaa hyvää tarkoittavan gut-ilmauksen kielteiseksi.",
        "reteach": "Sehr gut = erittäin hyvin. Nicht so gut = ei kovin hyvin. Und dir? on vastakysymys.",
        "genericWrong": "Sehr gut = erittäin hyvin. Nicht so gut = ei kovin hyvin. Und dir? on vastakysymys."
      }
    },
    {
      "id": "summary",
      "phase": "Yhteenveto ja kertaus",
      "kind": "summary",
      "title": "Kuulumiskeskustelu osina",
      "paragraphs": [
        "Kysy Wie geht's? ja vastaa Gut, danke. tai Nicht so gut. Voit kysyä takaisin Und dir? ja käyttää kohteliaasti Wie geht es Ihnen?.",
        "L023:ssa löydät samat fraasit Heinrichin ja Karlin koko alkuperäisdialogista. Kertaa myöhemmin ilman näkyvää mallia erityisesti kysymys ja vastaus sekä du/Ihnen-ero. Tunnin läpikäynti ei yksin vahvista pysyvää taitoa."
      ]
    }
  ]
};
