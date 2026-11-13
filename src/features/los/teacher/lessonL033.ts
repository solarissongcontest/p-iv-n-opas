import type { TeacherLesson } from "./engine.ts";
/** C06 numbers 21–100 with existing exercises and no invented audio grades. */
export const LOS1_L033_TEACHER: TeacherLesson = {
  "id": "L033",
  "bookId": 1,
  "chapterId": "06",
  "version": "2.0.0-preview.1",
  "title": "Numerot 21–100: rakenne",
  "objective": "Ymmärrän yksi-ja-kymmeniä-rakenteen ja kirjoitan 21:n, 27:n, 32:n sekä tavallisia kymmeniä oikein.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredActivityIds": [
    "number-pattern-reviewed"
  ],
  "requiredPracticeIds": [
    "C06-EX-13",
    "C06-EX-14",
    "C06-EX-15",
    "C06-EX-16",
    "C06-EX-19",
    "C06-EX-20"
  ],
  "scenes": [
    {
      "id": "welcome",
      "phase": "Aloitus",
      "kind": "introduction",
      "title": "Luvut 21–100 eivät järjesty kuin suomessa",
      "paragraphs": [
        "Saksan lukusanoissa 21–99 ykköset tulevat usein ennen kymmeniä. Suomen 'kaksikymmentäyksi' rakentuu siis erilaiseen järjestykseen.",
        "Harjoittelet nyt lukujen rakenteen, et pelkkiä irrallisia muistivastauksia. Poikkeavat kymmenluvut kannattaa silti muistaa.",
        "L033 käyttää kirjan todellisia C06-EX-13–16, 19 ja 20 -tehtäviä. Kappaletesti tehdään vasta L035:ssä."
      ]
    },
    {
      "id": "recall",
      "phase": "Muistelu",
      "kind": "question",
      "title": "Tunnistatko kaksikymmentä?",
      "paragraphs": [
        "Palauta mieleen L032:n viimeinen kymmenluku ennen uuden rakenteen rakentamista."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-NUM-06",
        "evidenceRole": "practice",
        "prompt": "Mikä on 20 saksaksi?",
        "options": [
          {
            "id": "a",
            "label": "zwanzig"
          },
          {
            "id": "b",
            "label": "zwölf",
            "wrongFeedback": "Zwölf on 12, ei 20."
          },
          {
            "id": "c",
            "label": "zweiundzwanzig",
            "wrongFeedback": "Tämä olisi 22, ei 20."
          }
        ],
        "correctOption": "a",
        "success": "Zwanzig tarkoittaa kaksikymmentä.",
        "hint": "Muista sana zwanzig.",
        "reteach": "Zwanzig tarkoittaa kaksikymmentä. Muista sana zwanzig.",
        "genericWrong": "Vertaa yksiköiden ja kymmenien järjestystä. Muista sana zwanzig."
      }
    },
    {
      "id": "explain",
      "phase": "Opetus",
      "kind": "explanation",
      "title": "Ykköset ennen kymmeniä",
      "paragraphs": [
        "Luku 21 muodostetaan osista ein + und + zwanzig. Sana kirjoitetaan yhteen: einundzwanzig. Yksittäinen yksi on eins, mutta yhdyssanan alussa käytetään ein ilman s:ää.",
        "Luku 27 on siebenundzwanzig. Sana alkaa seitsemällä, vaikka numeromerkinnässä 2 on ennen 7:ää.",
        "Luku 32 on zweiunddreißig. Tunnista siinä kaksi (zwei), yhdistävä und sekä kolmekymmentä (dreißig). Kirjoitusasussa näkyy ß.",
        "Tavallisia kymmenlukuja ovat dreißig = 30, vierzig = 40, siebzig = 70 ja neunzig = 90. Sata on hundert tai einhundert.",
        "Kaikki 21–99-lukusanat eivät käytä tarkalleen samoja kirjaimia kuin perusluvut: esimerkiksi 70 on siebzig, ei siebenzig. Harjoittelet poikkeukset erikseen."
      ],
      "help": [
        {
          "title": "Miksi 21 alkaa ein eikä eins?",
          "body": "Lukusana 1 yksin on eins, mutta saksan yhdyssanassa 21 aluksi tulee ein: einundzwanzig."
        },
        {
          "title": "Miksi 32:ssa on ß?",
          "body": "Saksaksi 30 on dreißig. Siksi 32 on zweiunddreißig. Älä korvaa ß-kirjainta mielivaltaisesti."
        },
        {
          "title": "Miksi 70 ei ole siebenzig?",
          "body": "Saksan 70 on siebzig, jossa sieben lyhenee sieb-muotoon. Tarkista poikkeavat kymmenet."
        }
      ]
    },
    {
      "id": "board",
      "phase": "Opetustaulu",
      "kind": "board",
      "title": "Rakenna isompi luku neljässä vaiheessa",
      "paragraphs": [
        "Tutki ensin kymmenet, sitten ykköset ja und. Lue koko sana lopuksi ääneen tai kirjoita se, mutta puhetta ei pisteytetä."
      ],
      "board": [
        {
          "label": "1 · Kymmenet",
          "german": "zwanzig · dreißig",
          "meaning": "Kaksikymmentä · kolmekymmentä."
        },
        {
          "label": "2 · Lisää yksi",
          "german": "ein + und + zwanzig",
          "meaning": "Yksi + ja + kaksikymmentä."
        },
        {
          "label": "3 · Valmis 21",
          "german": "einundzwanzig",
          "meaning": "21; yksi yhteen kirjoitettu sana."
        },
        {
          "label": "4 · Vaihda ykköset",
          "german": "siebenundzwanzig",
          "meaning": "27: seitsemän + ja + kaksikymmentä."
        },
        {
          "label": "5 · Vaihda kymmenet",
          "german": "zweiunddreißig",
          "meaning": "32: kaksi + ja + kolmekymmentä."
        },
        {
          "label": "6 · Tasakymmenet",
          "german": "vierzig · siebzig · neunzig",
          "meaning": "40, 70 ja 90 ovat tässä jo ilman und-sanaa."
        }
      ]
    },
    {
      "id": "guided",
      "phase": "Ohjattu harjoitus",
      "kind": "question",
      "title": "Ratkaise 21 osista",
      "paragraphs": [
        "Valitse sana, jossa ensin tulee ein, sitten und ja lopuksi zwanzig."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-NUM-06",
        "evidenceRole": "practice",
        "prompt": "Mikä on 21 oikeassa kirjoitusasussa?",
        "options": [
          {
            "id": "a",
            "label": "einsundzwanzig",
            "wrongFeedback": "Saksan 21 käyttää muotoa ein, ei itsenäisen luvun eins-muotoa."
          },
          {
            "id": "b",
            "label": "einundzwanzig"
          },
          {
            "id": "c",
            "label": "zwanzigein",
            "wrongFeedback": "Saksassa 21:n yhdyssana alkaa ykkösosalla ein."
          }
        ],
        "correctOption": "b",
        "success": "Einundzwanzig tarkoittaa lukua 21.",
        "hint": "Yhdistä ein + und + zwanzig yhdeksi sanaksi.",
        "reteach": "Einundzwanzig tarkoittaa lukua 21. Yhdistä ein + und + zwanzig yhdeksi sanaksi.",
        "genericWrong": "Vertaa yksiköiden ja kymmenien järjestystä. Yhdistä ein + und + zwanzig yhdeksi sanaksi."
      }
    },
    {
      "id": "source",
      "phase": "Kirjan rakenne",
      "kind": "book",
      "title": "Katso sääntö omasta kielioppikirjasta",
      "paragraphs": [
        "Avaa C06:n numerokielioppi ja etsi selitys yksi-ja-kymmeniä-järjestyksestä. Kirjassa näkyvät esimerkit einundzwanzig ja zweiunddreißig.",
        "Voit katsoa myös numerosanastoa, mutta älä ota siitä mallia juuri ennen itsenäistä tehtävää."
      ],
      "bookLinks": [
        {
          "chapterId": "06",
          "section": "grammar",
          "label": "C06 · Numerot ja järjestys",
          "instruction": "Etsi 21–99-lukujen rakenne."
        },
        {
          "chapterId": "06",
          "section": "vocabulary",
          "label": "C06 · Kymmenluvut",
          "instruction": "Kertaa zwanzig, dreißig ja neunzig."
        }
      ]
    },
    {
      "id": "practice",
      "phase": "Harjoittelu kirjassa",
      "kind": "book",
      "title": "Harjoittele kuusi oikeaa C06-tehtävää",
      "paragraphs": [
        "Tee C06-EX-13 (21), EX-14 (27), EX-15 (32), EX-16 (30), EX-19 (90) ja EX-20 (100). Vastaa mieluiten ensin muistista ja tarkista mallivastaus vasta oman yrityksen jälkeen.",
        "Nämä ovat kirjan oikeat tehtävät. Merkittyjen vastausten olemassaolo ei yksin todista, että kaikki lukusanat ovat jo hallussa."
      ],
      "bookLinks": [
        {
          "chapterId": "06",
          "section": "practice",
          "label": "C06 · Harjoittele 13–16, 19 ja 20",
          "instruction": "Tallenna kuusi numerovastausta."
        }
      ]
    },
    {
      "id": "independent",
      "phase": "Itsenäinen harjoitus",
      "kind": "question",
      "title": "Kirjoita 32 ilman mallia",
      "paragraphs": [
        "Sulje kielioppisivu. Kirjoita saksaksi yksi kokonainen sana numerolle 32."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-NUM-06",
        "evidenceRole": "independent",
        "prompt": "Kirjoita lukusanana 32.",
        "accepted": [
          "zweiunddreißig"
        ],
        "success": "Zweiunddreißig on 32.",
        "hint": "Kaksi = zwei, kolmekymmentä = dreißig.",
        "reteach": "Zweiunddreißig on 32. Kaksi = zwei, kolmekymmentä = dreißig.",
        "genericWrong": "Tarkista muodon kirjaimet ja sana und. Kaksi = zwei, kolmekymmentä = dreißig.",
        "wrongAnswers": {
          "dreissigzwei": "Saksan sana alkaa zwei, ja kolmeakymmentä tarkoittaa dreißig.",
          "zweiunddreissig": "Harjoituksessa käytetään opetettua saksan ß-kirjoitusasua: zweiunddreißig.",
          "dreißigzwei": "Ykköset kirjoitetaan ensin: zweiunddreißig."
        }
      }
    },
    {
      "id": "application",
      "phase": "Soveltaminen",
      "kind": "question",
      "title": "Siirrä sama rakenne uuteen lukuun",
      "paragraphs": [
        "Kuvitteellisessa pelissä näkyy numero 27. Tunnista ykköset ja kymmenet, kuten tekisit myös muun numeron kanssa."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-NUM-06",
        "evidenceRole": "application",
        "prompt": "Mikä kirjoitetaan saksaksi luvusta 27?",
        "options": [
          {
            "id": "a",
            "label": "zwanzigsieben",
            "wrongFeedback": "Ykkösosa sieben tulee ennen kymmeniä."
          },
          {
            "id": "b",
            "label": "siebzig",
            "wrongFeedback": "Siebzig tarkoittaa 70, ei 27."
          },
          {
            "id": "c",
            "label": "siebenundzwanzig"
          }
        ],
        "correctOption": "c",
        "success": "Siebenundzwanzig tarkoittaa 27.",
        "hint": "7 + und + 20 on siebenundzwanzig.",
        "reteach": "Siebenundzwanzig tarkoittaa 27. 7 + und + 20 on siebenundzwanzig.",
        "genericWrong": "Vertaa yksiköiden ja kymmenien järjestystä. 7 + und + 20 on siebenundzwanzig."
      }
    },
    {
      "id": "activity",
      "phase": "Oma harjoittelu",
      "kind": "activity",
      "title": "Vahvista oma rakenneharjoitus",
      "paragraphs": [
        "Rakenna ilman mallia luvut 21, 27, 32 ja 70. Tarkista sitten taulukosta, missä näkyy ein-, und- tai sieb-osa.",
        "Tämä vahvistus kertoo vain, että harjoittelit. Se ei ole automaattinen puhe- tai numerotesti."
      ],
      "activityId": "number-pattern-reviewed",
      "activityLabel": "Harjoittelin lukurakenteita ilman mallia"
    },
    {
      "id": "exit",
      "phase": "Lopputarkistus",
      "kind": "question",
      "title": "Loppukoe lyhyestä muistista",
      "paragraphs": [
        "Valitse se kymmenluku, jossa on erityinen ß-kirjain."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-NUM-06",
        "evidenceRole": "exit",
        "prompt": "Mikä saksan kymmenluku tarkoittaa 30?",
        "options": [
          {
            "id": "a",
            "label": "dreizig",
            "wrongFeedback": "Sanasta puuttuu ß. Oikea kirjoitusasu on dreißig."
          },
          {
            "id": "b",
            "label": "dreißig"
          },
          {
            "id": "c",
            "label": "dreiß",
            "wrongFeedback": "Sana ei pääty tähän vaan muotoon -ßig."
          }
        ],
        "correctOption": "b",
        "success": "Dreißig on 30.",
        "hint": "Muista kirjoitusasu dreißig.",
        "reteach": "Dreißig on 30. Muista kirjoitusasu dreißig.",
        "genericWrong": "Vertaa yksiköiden ja kymmenien järjestystä. Muista kirjoitusasu dreißig."
      }
    },
    {
      "id": "summary",
      "phase": "Yhteenveto",
      "kind": "summary",
      "title": "Osaat nyt lukea ja rakentaa 21–100",
      "paragraphs": [
        "Harjoittelit luvut einundzwanzig, siebenundzwanzig ja zweiunddreißig sekä kymmenluvuista myös poikkeuksia.",
        "L034:ssa katsot numerot oikeissa ikäkeskusteluissa. Silloin on olennaista erottaa toisistaan C06:n oma 12 repliikin lähdeteksti ja C01:stä tuttu kahdeksan repliikin kertaus.",
        "Lukusanaharjoituksia saa yrittää uudestaan. Tästä tunnista ei muodostu automaattista todistusta ääntämisestä."
      ]
    }
  ]
};
