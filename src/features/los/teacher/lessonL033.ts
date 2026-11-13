import type { TeacherLesson } from "./engine.ts";
/** C06 L033: reusable number builder is rendered by the shared Teacher Player. */
export const LOS1_L033_TEACHER: TeacherLesson = {
  "id": "L033",
  "bookId": 1,
  "chapterId": "06",
  "version": "2.0.0-preview.1",
  "title": "Numerot 21–100: rakenne",
  "objective": "Yhdistän yksiköt ja kymmenet oikeaan järjestykseen, osaan dreißig-muodon ja rakennan numerotaululla lukuja 21–100.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "write21",
    "write32",
    "read47",
    "exit"
  ],
  "requiredActivityIds": [
    "builder-used"
  ],
  "requiredPracticeIds": [
    "C06-EX-13",
    "C06-EX-14",
    "C06-EX-15",
    "C06-EX-16",
    "C06-EX-18",
    "C06-EX-20"
  ],
  "scenes": [
    {
      "id": "welcome",
      "phase": "Aloitus",
      "kind": "introduction",
      "title": "Miksi 32 näyttää olevan kaksi ja kolmekymmentä?",
      "paragraphs": [
        "Saksan kaksinumeroisissa luvuissa järjestys poikkeaa suomesta. Opit nyt sen säännön ja poikkeavat tasakymmenet.",
        "Käytät oppitunnin keskellä interaktiivista numeronrakennustaulua. Kokeile siinä uusia yhdistelmiä ja kirjoita myöhemmin ilman mallia."
      ]
    },
    {
      "id": "recall",
      "phase": "Harjoittelu",
      "kind": "question",
      "title": "Muunna luku",
      "paragraphs": [
        "Sulje malli ja vastaa muistista. Vihjeet ovat aina käytettävissä."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-NUM-01",
        "evidenceRole": "practice",
        "prompt": "Kirjoita saksaksi: 20",
        "accepted": [
          "zwanzig"
        ],
        "success": "Oikein. Kirjoitusasu tai lukuarvo vastaa tehtävää.",
        "hint": "Hajota luku yksiköihin, und-sanaan ja kymmeniin.",
        "reteach": "Muista järjestys: yksiköt + und + kymmenet. Luvussa 21 käytetään ein, ei eins. 30 kirjoitetaan dreißig.",
        "genericWrong": "Tarkista osien järjestys ja kaikki kirjaimet. ß ei muutu automaattisesti ss:ksi.",
        "wrongAnswers": {}
      }
    },
    {
      "id": "order",
      "phase": "Opetus",
      "kind": "explanation",
      "title": "Yksiköt ensin, kymmenet viimeiseksi",
      "paragraphs": [
        "21 muodostuu ein + und + zwanzig = einundzwanzig. Saksassa 21–99:n muut kuin tasakymmenet koostuvat yksiköistä, und-sanasta ja kymmenistä tässä järjestyksessä.",
        "32 on zweiunddreißig, ei dreißigzwei. Sama sääntö antaa 47 = siebenundvierzig. Ykkönen on tällaisessa sanassa ein, ei eins: einsundzwanzig on virhe.",
        "Kaikki osat kirjoitetaan yhteen ilman välilyöntejä tai yhdysmerkkiä. Tasakymmenissä ei ole und-sanaa."
      ],
      "help": [
        {
          "title": "Miksi kaksikymmentäyksi aloitetaan ykkösellä?",
          "body": "Saksan sanamuoto on kirjaimellisesti yksi-ja-kaksikymmentä: einundzwanzig. Suomen järjestystä ei kopioida."
        },
        {
          "title": "Miksi ei einsundzwanzig?",
          "body": "Yhdyssanan yksikköosa 1 kirjoitetaan ein ilman s-kirjainta."
        }
      ]
    },
    {
      "id": "model",
      "phase": "Mallisuoritus",
      "kind": "board",
      "title": "Opettaja rakentaa luvun 32",
      "paragraphs": [
        "Katso, missä järjestyksessä osat liittyvät yhdeksi sanaksi."
      ],
      "board": [
        {
          "label": "1 · Yksiköt",
          "german": "zwei",
          "meaning": "2"
        },
        {
          "label": "2 · Yhdistävä sana",
          "german": "zweiund",
          "meaning": "2 + ja"
        },
        {
          "label": "3 · Kymmenet",
          "german": "dreißig",
          "meaning": "30"
        },
        {
          "label": "4 · Tulos",
          "german": "zweiunddreißig",
          "meaning": "32; yksiköt ensin"
        },
        {
          "label": "5 · Vertailu",
          "german": "einundzwanzig",
          "meaning": "21; ein ilman s:ää"
        }
      ]
    },
    {
      "id": "tens",
      "phase": "Opetus",
      "kind": "explanation",
      "title": "Tasakymmenet 20–100",
      "paragraphs": [
        "20 zwanzig, 30 dreißig, 40 vierzig, 50 fünfzig, 60 sechzig, 70 siebzig, 80 achtzig, 90 neunzig, 100 hundert; myös einhundert on oikea.",
        "30 on kolmeakymmentä tarkoittava dreißig. ß on tärkeä merkki, joten älä kirjoita dreizig tai korvaa sitä huomaamatta ss:llä. 60 on sechzig ilman kuuden viimeistä s:ää. 70 on siebzig ilman -en-loppua.",
        "Esimerkiksi 71 = einundsiebzig. Tässä näet sekä yhdistelmän ein + und että lyhentyneen siebzig-osan."
      ]
    },
    {
      "id": "tens-board",
      "phase": "Mallisuoritus",
      "kind": "board",
      "title": "Opetustaulu: tasakymmenet",
      "paragraphs": [
        "Näytä yksi kymmenluku kerrallaan. Muista kolme poikkeavaa kirjoitusasua: dreißig, sechzig ja siebzig."
      ],
      "board": [
        {
          "label": "20",
          "german": "zwanzig",
          "meaning": "20"
        },
        {
          "label": "30",
          "german": "dreißig",
          "meaning": "30, ß"
        },
        {
          "label": "40",
          "german": "vierzig",
          "meaning": "40"
        },
        {
          "label": "50",
          "german": "fünfzig",
          "meaning": "50"
        },
        {
          "label": "60",
          "german": "sechzig",
          "meaning": "60, ei sechszig"
        },
        {
          "label": "70",
          "german": "siebzig",
          "meaning": "70, ei siebenzig"
        },
        {
          "label": "80",
          "german": "achtzig",
          "meaning": "80"
        },
        {
          "label": "90",
          "german": "neunzig",
          "meaning": "90"
        },
        {
          "label": "100",
          "german": "hundert",
          "meaning": "100; myös einhundert"
        }
      ]
    },
    {
      "id": "number-builder",
      "phase": "Interaktiivinen opetus",
      "kind": "board",
      "title": "Rakenna itse numeroita",
      "paragraphs": [
        "Valitse kymmenet ja yksiköt alla olevasta interaktiivisesta taulusta. Se tuottaa yhden saksankielisen yhdyssanan ja perustelee osien järjestyksen.",
        "Kokeile erityisesti 21, 32, 37, 71 sekä 100. Opetustaulun esimerkkivaihetta voi myös toistaa."
      ],
      "board": [
        {
          "label": "Esimerkki",
          "german": "ein + und + zwanzig = einundzwanzig",
          "meaning": "Yksi ja kaksikymmentä = 21"
        }
      ],
      "numberBuilder": true,
      "activityId": "builder-used",
      "activityLabel": "Rakensin taululla vähintään neljä eri lukua",
      "help": [
        {
          "title": "Miksi sanassa on ß?",
          "body": "Kolmekymmentä on dreißig. Oikeassa saksan standardikirjoitusasussa tämä sana sisältää ß-merkin."
        },
        {
          "title": "Entä tasakymmenet?",
          "body": "Luku 30 on pelkkä dreißig, ei nullunddreißig. Yksikköosa ja und tulevat vain, kun yksiköitä on 1–9."
        }
      ]
    },
    {
      "id": "guided",
      "phase": "Ohjattu harjoitus",
      "kind": "question",
      "title": "Valitse oikea järjestys",
      "paragraphs": [
        "Mikä näistä kirjoitetaan saksaksi oikein?"
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-NUM-01",
        "prompt": "Mikä on luku 21 saksaksi?",
        "options": [
          {
            "id": "a",
            "label": "zwanzigeins",
            "wrongFeedback": "Kymmenet ovat väärässä paikassa ja und puuttuu."
          },
          {
            "id": "b",
            "label": "einundzwanzig"
          },
          {
            "id": "c",
            "label": "einsundzwanzig",
            "wrongFeedback": "Ykkönen lyhenee ein-muotoon yhdistelmässä."
          }
        ],
        "correctOption": "b",
        "success": "Oikein. Einundzwanzig on 21.",
        "hint": "Yksiköt ensin: ein + und + zwanzig.",
        "reteach": "21 = einundzwanzig.",
        "genericWrong": "Etsi muoto, jossa ein aloittaa sanan."
      }
    },
    {
      "id": "write21",
      "phase": "Harjoittelu",
      "kind": "question",
      "title": "Muunna luku",
      "paragraphs": [
        "Sulje malli ja vastaa muistista. Vihjeet ovat aina käytettävissä."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-NUM-01",
        "evidenceRole": "independent",
        "prompt": "Kirjoita saksaksi: 21",
        "accepted": [
          "einundzwanzig"
        ],
        "success": "Oikein. Kirjoitusasu tai lukuarvo vastaa tehtävää.",
        "hint": "Hajota luku yksiköihin, und-sanaan ja kymmeniin.",
        "reteach": "Muista järjestys: yksiköt + und + kymmenet. Luvussa 21 käytetään ein, ei eins. 30 kirjoitetaan dreißig.",
        "genericWrong": "Tarkista osien järjestys ja kaikki kirjaimet. ß ei muutu automaattisesti ss:ksi.",
        "wrongAnswers": {
          "einsundzwanzig": "Luvun 1 yhdyssanamuoto on ein, ei eins.",
          "zwanzigeins": "Yksiköt tulevat ensin, kymmenet lopuksi."
        }
      }
    },
    {
      "id": "write32",
      "phase": "Harjoittelu",
      "kind": "question",
      "title": "Muunna luku",
      "paragraphs": [
        "Sulje malli ja vastaa muistista. Vihjeet ovat aina käytettävissä."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-NUM-01",
        "evidenceRole": "independent",
        "prompt": "Kirjoita saksaksi: 32",
        "accepted": [
          "zweiunddreißig"
        ],
        "success": "Oikein. Kirjoitusasu tai lukuarvo vastaa tehtävää.",
        "hint": "Hajota luku yksiköihin, und-sanaan ja kymmeniin.",
        "reteach": "Muista järjestys: yksiköt + und + kymmenet. Luvussa 21 käytetään ein, ei eins. 30 kirjoitetaan dreißig.",
        "genericWrong": "Tarkista osien järjestys ja kaikki kirjaimet. ß ei muutu automaattisesti ss:ksi.",
        "wrongAnswers": {
          "zweiunddreissig": "Sana dreißig sisältää ß-kirjaimen. Älä korvaa sitä huomaamatta ss:llä.",
          "zweiunddreizig": "30 on dreißig, ei dreizig.",
          "dreißigzwei": "Sanan osat ovat väärässä järjestyksessä."
        }
      }
    },
    {
      "id": "book",
      "phase": "Oppikirja",
      "kind": "book",
      "title": "Tee kuusi oikeaa kirjan harjoitusta",
      "paragraphs": [
        "Tee C06-EX-13, -14, -15, -16, -18 ja -20. Kirjan tehtävät tarkistavat muun muassa luvut 21, 27, 32, 30, 70 ja 100.",
        "Älä oleta interaktiivisella taululla käymisen olevan sama kuin kirjan vastausten tallentaminen. Opetus käyttää oikeita samoja C06-EX-tunnisteita."
      ],
      "bookLinks": [
        {
          "chapterId": "06",
          "section": "grammar",
          "label": "C06 · Kielioppi",
          "instruction": "Kertaa yksiköt + und + kymmenet."
        },
        {
          "chapterId": "06",
          "section": "practice",
          "label": "C06 · Harjoittele",
          "instruction": "Vastaa tehtäviin C06-EX-13,14,15,16,18,20."
        }
      ]
    },
    {
      "id": "read47",
      "phase": "Harjoittelu",
      "kind": "question",
      "title": "Muunna luku",
      "paragraphs": [
        "Sulje malli ja vastaa muistista. Vihjeet ovat aina käytettävissä."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-NUM-01",
        "evidenceRole": "application",
        "prompt": "Kirjoita numeroin: siebenundvierzig",
        "accepted": [
          "47"
        ],
        "success": "Oikein. Kirjoitusasu tai lukuarvo vastaa tehtävää.",
        "hint": "Hajota luku yksiköihin, und-sanaan ja kymmeniin.",
        "reteach": "Muista järjestys: yksiköt + und + kymmenet. Luvussa 21 käytetään ein, ei eins. 30 kirjoitetaan dreißig.",
        "genericWrong": "Tarkista osien järjestys ja kaikki kirjaimet. ß ei muutu automaattisesti ss:ksi.",
        "wrongAnswers": {
          "74": "74 on vierundsiebzig. Siebenundvierzig = 47."
        }
      }
    },
    {
      "id": "exit",
      "phase": "Harjoittelu",
      "kind": "question",
      "title": "Lopputarkistus",
      "paragraphs": [
        "Sulje malli ja vastaa muistista. Vihjeet ovat aina käytettävissä."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-NUM-01",
        "evidenceRole": "exit",
        "prompt": "Kirjoita saksaksi: 30",
        "accepted": [
          "dreißig"
        ],
        "success": "Oikein. Kirjoitusasu tai lukuarvo vastaa tehtävää.",
        "hint": "Hajota luku yksiköihin, und-sanaan ja kymmeniin.",
        "reteach": "Muista järjestys: yksiköt + und + kymmenet. Luvussa 21 käytetään ein, ei eins. 30 kirjoitetaan dreißig.",
        "genericWrong": "Tarkista osien järjestys ja kaikki kirjaimet. ß ei muutu automaattisesti ss:ksi.",
        "wrongAnswers": {
          "dreizig": "30 on dreißig, ß ei z.",
          "dreissig": "Tämä tehtävä vaatii kirjoitusasun dreißig. ß ei muutu huomaamatta ss:ksi."
        }
      }
    },
    {
      "id": "summary",
      "phase": "Yhteenveto",
      "kind": "summary",
      "title": "Säännöstä on hyötyä kaikissa kaksinumeroisissa luvuissa",
      "paragraphs": [
        "Opit yksiköt + und + kymmenet -järjestyksen sekä luvut 20–100. Pidä erityisesti dreißig, sechzig ja siebzig mielessä.",
        "L034:ssa käytät numeroita oikean ikäaiheisen lähdetekstin ymmärtämisessä."
      ]
    }
  ]
};
