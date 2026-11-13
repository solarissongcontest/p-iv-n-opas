import type { TeacherLesson } from "./engine.ts";
/** C06 Teacher manuscript uses the existing genuine numeric bank and draft. No simulated listening score. */
export const LOS1_L032_TEACHER: TeacherLesson = {
  "id": "L032",
  "bookId": 1,
  "chapterId": "06",
  "version": "2.0.0-preview.1",
  "title": "Numerot 13–20 ja ikä",
  "objective": "Ymmärrän lukujen 13–20 muodostuksen, kirjoitan 16:n ja 17:n poikkeukset ja käytän ikäkysymystä kuvitteellisissa tilanteissa.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredPracticeIds": [
    "C06-EX-09",
    "C06-EX-10",
    "C06-EX-11",
    "C06-EX-12"
  ],
  "requiredActivityIds": [
    "reviewed-032"
  ],
  "scenes": [
    {
      "id": "welcome",
      "phase": "Aloitus",
      "title": "Luvut jatkuvat, ja nyt kysytään ikää",
      "kind": "introduction",
      "paragraphs": [
        "Muistat jo kymmenen, yksitoista ja kaksitoista. Nyt harjoittelet etenkin lukuja 13–20 sekä lyhyttä ikäkeskustelua.",
        "Älä käytä tässä omaa ikääsi tai syntymäaikaasi. Harjoittelemme kuvitteellisilla ihmisillä, esimerkiksi 17-vuotiaalla Minalla.",
        "Tunnin kirjaosuuteen kuuluvat C06-EX-09–12, eivät ylimääräiset opettajan pisteytetyt numerotestit."
      ]
    },
    {
      "id": "recall",
      "phase": "Muistelu",
      "title": "Muistatko luvun 12?",
      "kind": "question",
      "paragraphs": [
        "Ensin yksi nopea muistikuva edellisen tunnin poikkeuksesta."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-NUM-06",
        "evidenceRole": "practice",
        "prompt": "Mikä tarkoittaa kaksitoista?",
        "options": [
          {
            "id": "a",
            "label": "elf",
            "wrongFeedback": "Elf = 11."
          },
          {
            "id": "b",
            "label": "zwölf"
          },
          {
            "id": "c",
            "label": "zwanzig",
            "wrongFeedback": "Zwanzig = 20."
          }
        ],
        "correctOption": "b",
        "success": "Zwölf on kaksitoista.",
        "hint": "Muista ö.",
        "reteach": "Zwölf on kaksitoista. Muista ö.",
        "genericWrong": "Vertaa ilmauksen merkitystä ja muotoa vielä kerran. Muista ö."
      }
    },
    {
      "id": "explain",
      "phase": "Opetus",
      "title": "13–20: kaksi poikkeavaa lyhennystä",
      "kind": "explanation",
      "paragraphs": [
        "Kolmetoista on dreizehn, neljätoista vierzehn ja viisitoista fünfzehn. Luvut 18 ja 19 ovat achtzehn ja neunzehn.",
        "Kuusitoista on sechzehn, ei sechszehn. Seitsemäntoista on siebzehn, ei siebenzehn. Luvuissa 16 ja 17 osa perussanasta jää pois.",
        "Kaksikymmentä on zwanzig. Älä sekoita sanoja zwanzig (20) ja zwölf (12).",
        "Kysyt ikää Wie alt bist du? ja vastaat esimerkiksi Ich bin siebzehn Jahre alt. Saksassa käytetään olla-verbin muotoa bin eikä haben-verbiä."
      ],
      "help": [
        {
          "title": "Miksi sechzehn eikä sechszehn?",
          "body": "Luvussa 16 sechs-sanan s loppupäästä jää pois, joten kirjoitetaan sechzehn. Näe se erillisenä opittavana muotona."
        },
        {
          "title": "Miksi siebzehn eikä siebenzehn?",
          "body": "Luvussa 17 sieben lyhenee sieb-muotoon ja siihen liitetään zehn. Oikea sana on siebzehn."
        },
        {
          "title": "Miksi Ich bin, ei Ich habe?",
          "body": "Saksassa ikä ilmaistaan sein-verbillä: Ich bin siebzehn Jahre alt. Englannin ja suomen perusteella ei kannata arvata haben-rakennetta."
        }
      ]
    },
    {
      "id": "board",
      "phase": "Opetustaulu",
      "title": "Luvut ja ikäkysymys vaiheittain",
      "kind": "board",
      "paragraphs": [
        "Seuraa ensin 13–20-lukujen rakennetta, sitten käytä niitä valmiissa ikäfraasissa."
      ],
      "board": [
        {
          "label": "13–15",
          "german": "dreizehn · vierzehn · fünfzehn",
          "meaning": "Kolmetoista, neljätoista, viisitoista."
        },
        {
          "label": "16 · poikkeus",
          "german": "sechzehn",
          "meaning": "Six = sechs, mutta 16 = sechzehn."
        },
        {
          "label": "17 · poikkeus",
          "german": "siebzehn",
          "meaning": "Sieben lyhenee muotoon sieb-."
        },
        {
          "label": "18–20",
          "german": "achtzehn · neunzehn · zwanzig",
          "meaning": "Kahdeksantoista, yhdeksäntoista, kaksikymmentä."
        },
        {
          "label": "Kysymys",
          "german": "Wie alt bist du?",
          "meaning": "Kuinka vanha olet?"
        },
        {
          "label": "Vastaus",
          "german": "Ich bin siebzehn Jahre alt.",
          "meaning": "Olen 17-vuotias, kuvitteellinen esimerkki."
        }
      ]
    },
    {
      "id": "guided",
      "phase": "Ohjattu harjoittelu",
      "title": "Korjaa 16:n kirjoitusasu",
      "kind": "question",
      "paragraphs": [
        "Valitse se sana, jossa 6 on lyhentynyt oikein."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-NUM-06",
        "evidenceRole": "practice",
        "prompt": "Miten kirjoitetaan kuusitoista?",
        "options": [
          {
            "id": "a",
            "label": "sechzehn"
          },
          {
            "id": "b",
            "label": "sechszehn",
            "wrongFeedback": "Kuuden lopun s jätetään pois 16:ssa."
          },
          {
            "id": "c",
            "label": "sechzig",
            "wrongFeedback": "Sechzig tarkoittaa kuuttakymmentä, ei kuuttatoista."
          }
        ],
        "correctOption": "a",
        "success": "Oikein. Kuusitoista on sechzehn.",
        "hint": "Kiinnitä huomiota loppu-s:n katoamiseen.",
        "reteach": "Oikein. Kuusitoista on sechzehn. Kiinnitä huomiota loppu-s:n katoamiseen.",
        "genericWrong": "Vertaa ilmauksen merkitystä ja muotoa vielä kerran. Kiinnitä huomiota loppu-s:n katoamiseen."
      }
    },
    {
      "id": "source",
      "phase": "Alkuperäisteksti",
      "title": "Katso C06:n oikea kielioppisivu",
      "kind": "book",
      "paragraphs": [
        "Lue numerot 13–20 ja mallikysymys Wie alt bist du? kirjan C06-kieliopista. Kirjassa on sekä numerotaulukko että valmis vastaus Ich bin siebzehn Jahre alt.",
        "Oman Text A:n neljä alkuperäisdialogia sisältävät iän kysymistä ja ikälukuja. L034:ssä ne käydään läpi erikseen, eikä tätä lasketa kuunteluksi."
      ],
      "bookLinks": [
        {
          "chapterId": "06",
          "section": "grammar",
          "label": "C06 · Kielioppi ja numerot",
          "instruction": "Lue ikäfraasit ja numerotaulukko."
        }
      ]
    },
    {
      "id": "practice",
      "phase": "Harjoittelu kirjassa",
      "title": "Harjoittele neljä oikeaa tehtävää",
      "kind": "book",
      "paragraphs": [
        "Tee C06-EX-09 (sechzehn), EX-10 (siebzehn), EX-11 (dreizehn) ja EX-12 (zwanzig). Kirjoita oikeat muodot ja tarkista perustelut.",
        "Nämä ovat samat kirjan tehtävät myös kappaletestissä. Opettajan tunti vaatii vain tallennetut yritykset tässä harjoituksessa, ei virheetöntä suoritusta."
      ],
      "bookLinks": [
        {
          "chapterId": "06",
          "section": "practice",
          "label": "C06 · EX-09–12",
          "instruction": "Tee ja tarkista 16, 17, 13 ja 20."
        }
      ]
    },
    {
      "id": "independent",
      "phase": "Itsenäinen harjoittelu",
      "title": "Kirjoita 17 itsenäisesti",
      "kind": "question",
      "paragraphs": [
        "Sulje numerotaulukko ennen kirjoittamista. Tässä näkyy vain numero, ei saksalaista mallia."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-NUM-06",
        "evidenceRole": "independent",
        "prompt": "Kirjoita saksaksi luku 17.",
        "accepted": [
          "siebzehn"
        ],
        "success": "Siebzehn on 17.",
        "hint": "Seitsemän on sieben, mutta 17 lyhenee sieb-.",
        "reteach": "Siebzehn on 17. Seitsemän on sieben, mutta 17 lyhenee sieb-.",
        "genericWrong": "Tarkista kirjoitusasu. Seitsemän on sieben, mutta 17 lyhenee sieb-.",
        "wrongAnswers": {
          "siebenzehn": "Poista sieben-sanan loppu -en. Oikea on siebzehn.",
          "sechzehn": "Sechzehn = 16, ei 17."
        }
      }
    },
    {
      "id": "application",
      "phase": "Soveltaminen",
      "title": "Keksi ikävastaus, älä henkilödataa",
      "kind": "question",
      "paragraphs": [
        "Kuvitteellinen henkilö Max on 17-vuotias. Valitse luonteva vastaus kysymykseen Wie alt bist du?."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-NUM-06",
        "evidenceRole": "application",
        "prompt": "Mitä Max sanoo?",
        "options": [
          {
            "id": "a",
            "label": "Ich habe siebzehn Jahre alt.",
            "wrongFeedback": "Saksan iästä kerrotaan sein-verbillä, ei habe-muodolla."
          },
          {
            "id": "b",
            "label": "Du bist siebzehn Jahre alt.",
            "wrongFeedback": "Du bist kertoo toisesta, mutta Max vastaa omasta iästään."
          },
          {
            "id": "c",
            "label": "Ich bin siebzehn Jahre alt."
          }
        ],
        "correctOption": "c",
        "success": "Oikein. Ich bin siebzehn Jahre alt.",
        "hint": "Aloita Ich bin.",
        "reteach": "Oikein. Ich bin siebzehn Jahre alt. Aloita Ich bin.",
        "genericWrong": "Vertaa ilmauksen merkitystä ja muotoa vielä kerran. Aloita Ich bin."
      }
    },
    {
      "id": "activity",
      "phase": "Oma harjoittelu",
      "title": "Vahvista oma ikäkeskustelu",
      "kind": "activity",
      "paragraphs": [
        "Kuvittele kaksi henkilöä: yksi kysyy Wie alt bist du?, toinen vastaa olevansa 17-vuotias. Sano tai kirjoita kysymys ja vastaus.",
        "Tämä on oma harjoittelutapahtuma, eikä sovellus tunnista tai pisteytä puhetta."
      ],
      "activityId": "reviewed-032",
      "activityLabel": "Harjoittelin kuvitteellisen ikäkysymyksen"
    },
    {
      "id": "exit",
      "phase": "Lopputarkistus",
      "title": "Viimeinen tarkistus: ikäkysymys",
      "kind": "question",
      "paragraphs": [
        "Varmista, ettet sekoita nimeä ja ikää."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-NUM-06",
        "evidenceRole": "exit",
        "prompt": "Mikä kysyy Kuinka vanha olet?",
        "options": [
          {
            "id": "a",
            "label": "Wie heißt du?",
            "wrongFeedback": "Tämä kysyy nimeä."
          },
          {
            "id": "b",
            "label": "Wie alt bist du?"
          },
          {
            "id": "c",
            "label": "Woher kommst du?",
            "wrongFeedback": "Tämä kysyy kotipaikkaa tai alkuperää."
          }
        ],
        "correctOption": "b",
        "success": "Oikein. Wie alt bist du? kysyy ikää.",
        "hint": "Sana alt liittyy ikään.",
        "reteach": "Oikein. Wie alt bist du? kysyy ikää. Sana alt liittyy ikään.",
        "genericWrong": "Vertaa ilmauksen merkitystä ja muotoa vielä kerran. Sana alt liittyy ikään."
      }
    },
    {
      "id": "summary",
      "phase": "Kertaus",
      "title": "Ikä voidaan kysyä ja vastata",
      "kind": "summary",
      "paragraphs": [
        "Harjoittelit lukujen 13–20 kirjoittamista, erityisesti poikkeuksia sechzehn ja siebzehn. Muistat myös zwanzig = 20.",
        "Saksalainen ikävastaus rakentuu Ich bin + luku + Jahre alt. L033:ssa harjoittelet suurempia lukusanoja.",
        "Väärin kirjoitettu umlaut tai puuttuva kirjain kannattaa korjata harjoittelussa, mutta yksittäinen virhe ei muuta opettajatunnin suoritusta automaattiseksi kielitaidon todistukseksi."
      ]
    }
  ]
};
