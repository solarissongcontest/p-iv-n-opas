import type { TeacherLesson } from "./engine.ts";
/** C09 authentic text and writing-only evidence; no audio playback is automatically certified. */
export const LOS1_L047_TEACHER: TeacherLesson = {
  "id": "L047",
  "bookId": 1,
  "chapterId": "09",
  "version": "2.0.0-preview.1",
  "title": "Lue Sport und Zeit",
  "objective": "Luen seitsemän alkuperäistä Franz–Greta-repliikkiä ja tarkistan kolme oikeaa luetun ymmärtämisen kysymystä; Viertel vor drei tunnistetaan mutta sitä ei tuoteta.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredActivityIds": [
    "c09-teacher-L047"
  ],
  "requiredPracticeIds": [],
  "requiredCheckedIds": [
    "C09-SOURCE-Q01",
    "C09-SOURCE-Q02",
    "C09-SOURCE-Q03"
  ],
  "scenes": [
    {
      "id": "welcome",
      "kind": "introduction",
      "title": "Alkuperäinen Franzin ja Gretan keskustelu",
      "phase": "Aloitus",
      "paragraphs": [
        "C09:n Text A on M-WB-03, seitsemän puheenvuoron alkuperäinen Wikibooks Sport und Zeit -dialogi. Franz kysyy kellonaikaa, Greta vastaa ja Franz kertoo jalkapallosta.",
        "Vaikeampaa Viertel vor drei -ilmausta ei tarvitse vielä itse kirjoittaa. Riittää, että tunnistat Gretan vastauksesta varttia vaille kolmen eli 14.45.",
        "Kaikki seitsemän repliikkiä ja niiden selitykset ovat kirjan Text A -lukijassa. Lähteen mahdollista ääntä ei oleteta toimituksellisesti hyväksytyksi."
      ]
    },
    {
      "id": "recall",
      "kind": "question",
      "title": "Tunnista tutun kysymyksen tarkoitus",
      "phase": "Muistelu",
      "paragraphs": [
        "Mieti, mitä kellonaikaa koskeva saksan kysymys pyytää."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-TIME-09",
        "evidenceRole": "practice",
        "prompt": "Mitä Wie spät ist es? tarkoittaa?",
        "options": [
          {
            "id": "a",
            "label": "Mikä päivä tänään on?",
            "wrongFeedback": "Tämä kysymys koskisi viikonpäivää."
          },
          {
            "id": "b",
            "label": "Paljonko kello on?"
          },
          {
            "id": "c",
            "label": "Milloin olet syntynyt?",
            "wrongFeedback": "Tämä kysyisi syntymäpäivää."
          }
        ],
        "correctOption": "b",
        "success": "Wie spät ist es? kysyy kellonaikaa.",
        "hint": "Spät liittyy ajan kysymiseen.",
        "reteach": "Wie spät ist es? kysyy kellonaikaa. Spät liittyy ajan kysymiseen.",
        "genericWrong": "Vertaa tilannetta ja oikeaa ajanilmausta. Spät liittyy ajan kysymiseen."
      }
    },
    {
      "id": "explain",
      "kind": "explanation",
      "title": "Kaksi erilaista aikaa samassa tekstissä",
      "phase": "Selitys",
      "paragraphs": [
        "Ensimmäisessä repliikissä Franz sanoo Hallo, Greta! Wie spät ist es? Hän kysyy Gretalta kellonaikaa.",
        "Toisessa repliikissä Greta vastaa Es ist Viertel vor drei. Tämä tarkoittaa varttia vaille kolme, eli 14.45. Lähteen vaikeampaa varttirakennetta tarvitsee tässä vain ymmärtää.",
        "Kolmannessa repliikissä Franz sanoo Ich spiele um drei Fußball. Hän aikoo pelata jalkapalloa tasan kolmelta, eli klo 15.00. Um drei kuuluu myöhemmin omaan ajanilmausten kielioppiisi.",
        "Greta kertoo olevansa laiska ja menevänsä kotiin: Ich gehe jetzt nach Hause. Franz pitää jalkapalloa hauskana. Lopuksi Greta sanoo Bis dann ja Franz Wiedersehen.",
        "Tekstin tapahtumista ei tarvitse päätellä kellonaikojen välistä tapaamislupausta: kyse on kahdesta eri mainitusta ajasta, nyt 14.45 ja jalkapallo 15.00."
      ],
      "help": [
        {
          "title": "Miksi 14.45 eikä 15.15?",
          "body": "Viertel vor drei = varttia vaille kolme, siis 14.45. Viertel nach drei tarkoittaisi varttia yli kolme, mutta sitä ei tarvitse itse tuottaa."
        },
        {
          "title": "Miksi Franz sanoo um drei?",
          "body": "Um + tasatunti ilmaisee tapahtuman ajankohdan: um drei (Uhr) = kello kolmelta."
        },
        {
          "title": "Mitä Bis dann tarkoittaa?",
          "body": "Se on hyvän toivotuksen tapainen hyvästely: nähdään. Greta käyttää sitä kuudennessa puheenvuorossa."
        },
        {
          "title": "Pitääkö osata kaikki alkuperäisdialogin verbit?",
          "body": "Ei. Ich spiele, ich gehe ja machst du Sport ovat tekstin ymmärtämisen tukea; nyt oma tuottaminen keskittyy viikonpäiviin ja tasatunteihin."
        }
      ]
    },
    {
      "id": "board",
      "kind": "board",
      "title": "Seitsemän repliikin ymmärtämispolku",
      "phase": "Opetustaulu",
      "paragraphs": [
        "Opetustaulu on oma yhteenveto; lue koko alkuperäinen teksti kirjan lukijasta."
      ],
      "board": [
        {
          "label": "Franz · 1",
          "german": "Wie spät ist es?",
          "meaning": "Paljonko kello on?"
        },
        {
          "label": "Greta · 2",
          "german": "Viertel vor drei",
          "meaning": "14.45, vain tunnistaminen."
        },
        {
          "label": "Franz · 3",
          "german": "Ich spiele um drei Fußball.",
          "meaning": "Franz pelaa jalkapalloa 15.00."
        },
        {
          "label": "Greta · 4",
          "german": "Ich gehe jetzt nach Hause.",
          "meaning": "Greta menee kotiin."
        },
        {
          "label": "Franz · 5",
          "german": "Fußball macht aber Spaß!",
          "meaning": "Jalkapallo on hauskaa."
        },
        {
          "label": "Hyvästely · 6–7",
          "german": "Bis dann. · Wiedersehen!",
          "meaning": "He päättävät keskustelun."
        }
      ]
    },
    {
      "id": "guided",
      "kind": "question",
      "title": "Gretan vastaus kellosta",
      "phase": "Ohjattu harjoitus",
      "paragraphs": [
        "Valitse ilmaisuun Viertel vor drei kuuluva aika. Älä arvaa Franzin jalkapalloajan perusteella."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-TIME-09",
        "evidenceRole": "practice",
        "prompt": "Mitä aikaa Greta tarkoittaa ilmauksella Viertel vor drei?",
        "options": [
          {
            "id": "a",
            "label": "14.45"
          },
          {
            "id": "b",
            "label": "15.00",
            "wrongFeedback": "15.00 on Franzin jalkapallon alkamisajankohta."
          },
          {
            "id": "c",
            "label": "15.15",
            "wrongFeedback": "15.15 olisi varttia yli kolme, ei varttia vaille."
          }
        ],
        "correctOption": "a",
        "success": "Viertel vor drei = 14.45.",
        "hint": "Vor = ennen/vaille.",
        "reteach": "Viertel vor drei = 14.45. Vor = ennen/vaille.",
        "genericWrong": "Vertaa tilannetta ja oikeaa ajanilmausta. Vor = ennen/vaille."
      }
    },
    {
      "id": "source",
      "kind": "book",
      "title": "Lue tekstin kaikki seitsemän alkuperäistä repliikkiä",
      "phase": "Kirjan lähde",
      "paragraphs": [
        "Avaa C09:n Text A. Lue koko keskustelu Franzin Wie spät ist es? -kysymyksestä Wiedersehen!-hyvästelyyn.",
        "Huomaa, että alkuperäinen puheenvuoro kolme sisältää jalkapalloa koskevan um drei -ilmauksen. Älä korvaa tekstin 14.45-aikaa tekstissä mainitulla 15.00-ajalla."
      ],
      "bookLinks": [
        {
          "chapterId": "09",
          "section": "text",
          "label": "C09 · Sport und Zeit · koko Text A",
          "instruction": "Lue kaikki 7 alkuperäistä Franz–Greta-repliikkiä."
        }
      ]
    },
    {
      "id": "checked",
      "kind": "book",
      "title": "Tarkista kolme aitoa tekstikysymystä",
      "phase": "Lähdetehtävät",
      "paragraphs": [
        "Tee C09-SOURCE-Q01, Q02 ja Q03 kirjan Ymmärrä-sivulla. Ne kysyvät Gretan kellonaikaa, Franzin jalkapallon alkamisajankohtaa ja sitä, mitä Greta aikoo tehdä seuraavaksi.",
        "Vastaa kaikkiin kolmeen ja paina jokaisen Tarkista vastaus. Näiden kysymysten oikea tallennus kuuluu nykyiseen C09-luonnokseen; pelkkä tekstisivun avaaminen ei riitä."
      ],
      "bookLinks": [
        {
          "chapterId": "09",
          "section": "understand",
          "label": "C09 · Ymmärrä · Q01–Q03",
          "instruction": "Vastaa ja tarkista kolme oikeaa alkuperäistekstin tehtävää."
        }
      ]
    },
    {
      "id": "independent",
      "kind": "question",
      "title": "Kirjoita yksi oman tason ajanilmaus",
      "phase": "Itsenäinen harjoitus",
      "paragraphs": [
        "Vain tasatunnin ilmaus pitää itse tuottaa. Älä yritä muodostaa varttiaikarakennetta."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-TIME-09",
        "evidenceRole": "independent",
        "prompt": "Kirjoita saksaksi kolmelta (esimerkiksi jalkapallon alkuaika).",
        "accepted": [
          "um drei",
          "um drei Uhr"
        ],
        "success": "Um drei tarkoittaa kolmelta.",
        "hint": "Aloita um, jatka drei.",
        "reteach": "Um drei tarkoittaa kolmelta. Aloita um, jatka drei.",
        "genericWrong": "Tarkista kirjoitusasu ja sanojen järjestys. Aloita um, jatka drei.",
        "wrongAnswers": {
          "am drei": "Am on viikonpäivän kanssa, kellonaika tarvitsee um.",
          "viertel vor drei": "Tämä tarkoittaa 14.45 eikä tapahtuman alkua klo 15."
        }
      }
    },
    {
      "id": "application",
      "kind": "question",
      "title": "Erota kaksi tekstin aikaa",
      "phase": "Soveltaminen",
      "paragraphs": [
        "Nyt yhdistele kaksi eri tietoa tekstistä."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-TIME-09",
        "evidenceRole": "application",
        "prompt": "Kumpi pari vastaa alkuperäistä dialogia?",
        "options": [
          {
            "id": "a",
            "label": "Greta 15.00, Franzin jalkapallo 14.45",
            "wrongFeedback": "Greta sanoo 14.45 ja Franz kertoo pelaavansa 15.00."
          },
          {
            "id": "b",
            "label": "Greta 14.45, Franzin jalkapallo 15.00"
          },
          {
            "id": "c",
            "label": "Greta 15.15, Franzin jalkapallo 16.00",
            "wrongFeedback": "Kumpikaan ei vastaa alkuperäistä tekstiä."
          }
        ],
        "correctOption": "b",
        "success": "Oikea järjestys on ensin 14.45, sitten 15.00.",
        "hint": "Viertel vor drei ja um drei ovat eri ajat.",
        "reteach": "Oikea järjestys on ensin 14.45, sitten 15.00. Viertel vor drei ja um drei ovat eri ajat.",
        "genericWrong": "Vertaa tilannetta ja oikeaa ajanilmausta. Viertel vor drei ja um drei ovat eri ajat."
      }
    },
    {
      "id": "activity",
      "kind": "activity",
      "title": "Tee oma muistikuva koko keskustelusta",
      "phase": "Oma harjoittelu",
      "paragraphs": [
        "Selosta suomeksi keskustelun kulku alusta loppuun: kysyminen, Gretan aika, jalkapallo, kotiinmeno ja hyvästely. Katso sitten alkuperäisteksti uudelleen.",
        "Tämä on itse vahvistettu lukuharjoitus, ei testattu audio- tai puhesuoritus."
      ],
      "activityId": "c09-teacher-L047",
      "activityLabel": "Luin koko alkuperäisdialogin ja selostin sen muistista"
    },
    {
      "id": "exit",
      "kind": "question",
      "title": "Mitä Greta tekee seuraavaksi?",
      "phase": "Lopputarkistus",
      "paragraphs": [
        "Palaa viimeiseksi neljänteen alkuperäiseen repliikkiin."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-TIME-09",
        "evidenceRole": "exit",
        "prompt": "Mikä on Gretan seuraava tekeminen tekstin mukaan?",
        "options": [
          {
            "id": "a",
            "label": "Hän menee kotiin."
          },
          {
            "id": "b",
            "label": "Hän menee jalkapalloon.",
            "wrongFeedback": "Franz kertoo pelaavansa jalkapalloa, ei Greta."
          },
          {
            "id": "c",
            "label": "Hän menee koulun matematiikkaan.",
            "wrongFeedback": "Matematiikkakohtaus on C08:ssa, ei tässä lähteessä."
          }
        ],
        "correctOption": "a",
        "success": "Ich gehe jetzt nach Hause kertoo kotiin menosta.",
        "hint": "Nach Hause = kotiin.",
        "reteach": "Ich gehe jetzt nach Hause kertoo kotiin menosta. Nach Hause = kotiin.",
        "genericWrong": "Vertaa tilannetta ja oikeaa ajanilmausta. Nach Hause = kotiin."
      }
    },
    {
      "id": "summary",
      "kind": "summary",
      "title": "Erotat kaksi lähteen kellonaikaa",
      "phase": "Yhteenveto",
      "paragraphs": [
        "Luetun ymmärtämisen tuloksena tunnistat Gretan vastauksen 14.45 ja Franzin jalkapallon alkamisajan 15.00 sekä Gretan kotiinmenon.",
        "Viertel vor drei on vain ymmärtämistä. L048:ssa opetat itsellesi aktiivisesti rakenteet am Montag ja um drei Uhr."
      ]
    }
  ]
};
