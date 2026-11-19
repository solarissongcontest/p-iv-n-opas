import type { TeacherLesson } from "./engine.ts";
/** C06 L032: Text A M-ZPE-01, no fictitious audio or oral scoring. */
export const LOS1_L032_TEACHER: TeacherLesson = {
  "id": "L032",
  "bookId": 1,
  "chapterId": "06",
  "version": "2.0.0-preview.1",
  "title": "Numerot 13–20 ja ikä",
  "objective": "Muodostan 13–20, kirjoitan sechzehn ja siebzehn oikein, käytän ikäilmausta ja ymmärrän C06:n Text A:n.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "sixteen",
    "seventeen",
    "age",
    "exit"
  ],
  "requiredActivityIds": [
    "text-a-studied"
  ],
  "requiredPracticeIds": [
    "C06-EX-09",
    "C06-EX-10",
    "C06-EX-11",
    "C06-EX-12"
  ],
  "requiredCheckedIds": [
    "C06-ZPE-Q01",
    "C06-ZPE-Q02",
    "C06-ZPE-Q03"
  ],
  "scenes": [
    {
      "id": "welcome",
      "phase": "Aloitus",
      "kind": "introduction",
      "title": "Oletko seitsemäntoista?",
      "paragraphs": [
        "Nyt opit kertomaan ikäsi saksaksi ja tunnistamaan luvut 13–20. Kokeile oman iän sijaan kuvitteellisten ihmisten ikää.",
        "Lopussa luet Monika Janickan kokonaiset neljä ikädialogia LOS!:n Text A -sivulta. Ne ovat oikea julkaistu lähdeaineisto, eivät opetuspolussa keksitty keskustelu."
      ]
    },
    {
      "id": "recall",
      "phase": "Harjoittelu",
      "kind": "question",
      "title": "Kertaa zwölf muistista",
      "paragraphs": [
        "Yritä ensin ilman vastausta näkyvillä. Saat halutessasi kohdennetun vihjeen."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-NUM-01",
        "evidenceRole": "practice",
        "prompt": "Kirjoita saksaksi: 12",
        "accepted": [
          "zwölf"
        ],
        "success": "Oikein. 12 on zwölf, ja sanan ö-kirjain on olennainen.",
        "hint": "Kaksitoista on poikkeusluku. Sen kirjoitusasu alkaa zw- ja sisältää ö-kirjaimen.",
        "reteach": "12 = zwölf, ei zwolf eikä zweizehn. Muista ö-kirjain.",
        "genericWrong": "Kirjoita luvun 12 saksankielinen nimi zwölf. Tarkista erityisesti ö-kirjain.",
        "wrongAnswers": {
          "zwolf": "Muista ö-kirjain."
        }
      }
    },
    {
      "id": "teens",
      "phase": "Opetus",
      "kind": "explanation",
      "title": "13–20 muodostetaan vaiheittain",
      "paragraphs": [
        "13 dreizehn, 14 vierzehn, 15 fünfzehn, 18 achtzehn ja 19 neunzehn päättyvät osaan -zehn. 20 on zwanzig.",
        "Poikkeukset: 6 sechs menettää viimeisen s:n ennen -zehn-osaa, joten 16 = sechzehn. Seitsemän sieben menettää -en:n, joten 17 = siebzehn.",
        "Älä hyväksy kirjoitusasuja sechszehn ja siebenzehn. Ne kertovat, että sanan lyhentymissääntö jäi huomaamatta."
      ],
      "help": [
        {
          "title": "Miksi sechszehn ei käy?",
          "body": "Sanan sechs viimeinen s putoaa pois. Kirjoita sech + zehn = sechzehn."
        },
        {
          "title": "Miksi siebenzehn ei käy?",
          "body": "Sieben menettää viimeiset kirjaimensa -en. Kirjoita sieb + zehn = siebzehn."
        }
      ]
    },
    {
      "id": "board",
      "phase": "Mallisuoritus",
      "kind": "board",
      "title": "Opetustaulu: 13–20",
      "paragraphs": [
        "Vertaa ensin tavallisia -zehn-muotoja ja kiinnitä sitten huomio 16:een sekä 17:ään."
      ],
      "board": [
        {
          "label": "13",
          "german": "dreizehn",
          "meaning": "drei + zehn"
        },
        {
          "label": "14",
          "german": "vierzehn",
          "meaning": "vier + zehn"
        },
        {
          "label": "15",
          "german": "fünfzehn",
          "meaning": "fünf + zehn"
        },
        {
          "label": "16",
          "german": "sechzehn",
          "meaning": "sechs ilman viimeistä s:ää"
        },
        {
          "label": "17",
          "german": "siebzehn",
          "meaning": "sieben ilman loppua -en"
        },
        {
          "label": "18",
          "german": "achtzehn",
          "meaning": "acht + zehn"
        },
        {
          "label": "19",
          "german": "neunzehn",
          "meaning": "neun + zehn"
        },
        {
          "label": "20",
          "german": "zwanzig",
          "meaning": "erillinen tasakymmen"
        }
      ]
    },
    {
      "id": "guided",
      "phase": "Ohjattu harjoitus",
      "kind": "question",
      "title": "Valitse oikea kuusitoista",
      "paragraphs": [
        "Valitse kirjoitusasu, jossa ei ole ylimääräistä s-kirjainta."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-NUM-01",
        "prompt": "Mikä vaihtoehto tarkoittaa lukua 16?",
        "options": [
          {
            "id": "a",
            "label": "sechszehn",
            "wrongFeedback": "Poista sanan sechs viimeinen s."
          },
          {
            "id": "b",
            "label": "sechzehn"
          },
          {
            "id": "c",
            "label": "sechzig",
            "wrongFeedback": "Sechzig = 60, ei 16."
          }
        ],
        "correctOption": "b",
        "success": "Oikein. Sechzehn = 16.",
        "hint": "Sechs menettää viimeisen s-kirjaimen.",
        "reteach": "16 on sechzehn, 60 on sechzig.",
        "genericWrong": "Tarkista, onko lopussa -zehn vai -zig."
      }
    },
    {
      "id": "sixteen",
      "phase": "Harjoittelu",
      "kind": "question",
      "title": "Kirjoita sechzehn muistista",
      "paragraphs": [
        "Yritä ensin ilman vastausta näkyvillä. Saat halutessasi kohdennetun vihjeen."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-NUM-01",
        "evidenceRole": "independent",
        "prompt": "Kirjoita saksaksi: 16",
        "accepted": [
          "sechzehn"
        ],
        "success": "Oikein. 16 on sechzehn: sanasta sechs jää viimeinen s pois.",
        "hint": "Kuusi on sechs. Liitä -zehn vasta sen jälkeen, kun poistat viimeisen s:n.",
        "reteach": "16 = sechzehn (sech + zehn), ei sechszehn eikä sechzig (60).",
        "genericWrong": "Kirjoita 16 saksaksi sechzehn. Sechs menettää viimeisen s:n, ja loppu on -zehn.",
        "wrongAnswers": {
          "sechszehn": "Sechs menettää viimeisen s:n: sechzehn."
        }
      }
    },
    {
      "id": "seventeen",
      "phase": "Harjoittelu",
      "kind": "question",
      "title": "Kirjoita siebzehn muistista",
      "paragraphs": [
        "Yritä ensin ilman vastausta näkyvillä. Saat halutessasi kohdennetun vihjeen."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-NUM-01",
        "evidenceRole": "independent",
        "prompt": "Kirjoita saksaksi: 17",
        "accepted": [
          "siebzehn"
        ],
        "success": "Oikein. 17 on siebzehn: sieben menettää loppunsa -en.",
        "hint": "Seitsemän on sieben. Lyhennä loppu -en pois ennen -zehn-osaa.",
        "reteach": "17 = siebzehn (sieb + zehn), ei siebenzehn. 70 olisi siebzig.",
        "genericWrong": "Kirjoita 17 saksaksi siebzehn. Tarkista lyhentynyt alku sieb- ja loppu -zehn.",
        "wrongAnswers": {
          "siebenzehn": "Sieben menettää loppuosan -en: siebzehn."
        }
      }
    },
    {
      "id": "age-explanation",
      "phase": "Opetus",
      "kind": "explanation",
      "title": "Wie alt bist du? ja Ich bin … Jahre alt.",
      "paragraphs": [
        "Wie alt bist du? = Kuinka vanha olet? Bist on sein-verbin du-muoto.",
        "Vastaus Ich bin siebzehn Jahre alt. tarkoittaa Olen 17-vuotias. Saksassa iästä puhutaan sein-verbillä: Ich bin, ei Ich habe. Lyhyesti voidaan sanoa myös Ich bin siebzehn.",
        "Tekstissä tulevat vastaan myös wir sind, seid ihr ja er ist. Ne ovat tällä tunnilla tunnistettavia tukimuotoja eivätkä uuden kieliopin itsenäisiä kirjoitustehtäviä."
      ],
      "help": [
        {
          "title": "Miksi en sano Ich habe?",
          "body": "Saksan ikärakenteessa käytetään sein-verbiä: Ich bin 17 Jahre alt. Kysymyksessä on bist du."
        }
      ]
    },
    {
      "id": "age-board",
      "phase": "Mallisuoritus",
      "kind": "board",
      "title": "Opettaja rakentaa ikäilmaisun",
      "paragraphs": [
        "Seuraa ensin kysymyksen ja sitten vastauksen rakennetta."
      ],
      "board": [
        {
          "label": "Kysyn",
          "german": "Wie alt bist du?",
          "meaning": "Kuinka vanha olet?"
        },
        {
          "label": "Vastaan",
          "german": "Ich bin ...",
          "meaning": "Minä olen ..."
        },
        {
          "label": "Lisään iän",
          "german": "Ich bin siebzehn Jahre alt.",
          "meaning": "Olen 17-vuotias."
        },
        {
          "label": "Lyhyt vastaus",
          "german": "Ich bin siebzehn.",
          "meaning": "Olen 17-vuotias."
        }
      ]
    },
    {
      "id": "age",
      "phase": "Soveltaminen",
      "kind": "question",
      "title": "Ikä oikeaan muotoon",
      "paragraphs": [
        "Käytä nyt opetettua sein-verbin minämuotoa."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-06",
        "evidenceRole": "application",
        "prompt": "Millä lauseella kuvitteellinen Mia kertoo olevansa 17-vuotias?",
        "options": [
          {
            "id": "a",
            "label": "Ich habe siebzehn Jahre alt.",
            "wrongFeedback": "Saksaksi iän yhteydessä käytetään bin, ei habe."
          },
          {
            "id": "b",
            "label": "Ich bin siebzehn Jahre alt."
          },
          {
            "id": "c",
            "label": "Du bin siebzehn.",
            "wrongFeedback": "Du tarvitsisi bist. Puhuja kertoo tässä omasta iästään."
          }
        ],
        "correctOption": "b",
        "success": "Oikein. Ich bin siebzehn Jahre alt.",
        "hint": "Ich + bin on aiemmin opittu muoto.",
        "reteach": "Wie alt bist du? Ich bin siebzehn Jahre alt.",
        "genericWrong": "Tarkista sein-verbin ich/du-muodot."
      }
    },
    {
      "id": "text-a",
      "phase": "Oppikirja",
      "kind": "book",
      "title": "Lue koko Text A ja tarkista kolme ymmärtämistehtävää",
      "paragraphs": [
        "M-ZPE-01, Monika Janicka: neljä julkaistua minidialogia ikäkysymyksistä. Oskar sanoo ensimmäisessä Ich bin fünf; Larissa kertoo toisessa olevansa zwölf Jahre alt. Kolmannen dialogin kaksi henkilöä ovat 10-vuotiaita ja neljännessä Paul on elf Jahre alt.",
        "Lue itse kaikki neljä dialogia. Vastaa sitten C06-ZPE-Q01, C06-ZPE-Q02 ja C06-ZPE-Q03 sekä paina jokaisessa Tarkista vastaus. Opetuspolku käyttää näitä oikeita tallennettuja tarkistusmerkintöjä.",
        "Kirjan lähdetekstiä ei tarvitse hakea ulkoiselta verkkosivulta. Alkuperäisäänitteen laitetestaus on vielä avoin."
      ],
      "bookLinks": [
        {
          "chapterId": "06",
          "section": "text",
          "label": "C06 · Text A",
          "instruction": "Lue sisältö ja tee nimetty tarkistus C06:n omassa oppikirjassa."
        },
        {
          "chapterId": "06",
          "section": "understand",
          "label": "C06 · Ymmärrä",
          "instruction": "Lue sisältö ja tee nimetty tarkistus C06:n omassa oppikirjassa."
        }
      ],
      "activityId": "text-a-studied",
      "activityLabel": "Luin kaikki neljä alkuperäistä Text A -dialogia"
    },
    {
      "id": "practice",
      "phase": "Oppikirja",
      "kind": "book",
      "title": "Tee kirjan numerotehtävät",
      "paragraphs": [
        "Tee C06-EX-09, -10, -11 ja -12 kirjan omalla tehtäväsivulla. Niillä opit kirjoittamaan teinilukuja.",
        "Opetuspolku ei luo näistä rinnakkaista vastauspankkia."
      ],
      "bookLinks": [
        {
          "chapterId": "06",
          "section": "practice",
          "label": "C06 · Harjoittele",
          "instruction": "Lue sisältö ja tee nimetty tarkistus C06:n omassa oppikirjassa."
        }
      ]
    },
    {
      "id": "exit",
      "phase": "Lopputarkistus",
      "kind": "question",
      "title": "Lopputarkistus: siebzehn numerona",
      "paragraphs": [
        "Yritä ensin ilman vastausta näkyvillä. Saat halutessasi kohdennetun vihjeen."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-NUM-01",
        "evidenceRole": "exit",
        "prompt": "Kirjoita numeroin: siebzehn",
        "accepted": [
          "17"
        ],
        "success": "Oikein. Siebzehn tarkoittaa lukua 17, ei lukua 70.",
        "hint": "Sieb- liittyy seitsemään ja -zehn teinilukuun. Kirjoita vastaukseksi numero.",
        "reteach": "Siebzehn = 17. Seitsemänkymmentä on siebzig (70), jossa loppu on -zig.",
        "genericWrong": "Tehtävä pyytää numeromerkintää: siebzehn tarkoittaa 17. Älä sekoita sitä lukuun 70.",
        "wrongAnswers": {
          "70": "Seitsemänkymmentä on siebzig. Siebzehn on seitsemäntoista."
        }
      }
    },
    {
      "id": "summary",
      "phase": "Yhteenveto",
      "kind": "summary",
      "title": "Luvut ja ikä alkavat hahmottua",
      "paragraphs": [
        "Osaat muodostaa 13–20 ja erottaa sechzehn- sekä siebzehn-poikkeukset.",
        "Harjoittelit C06:n Text A:sta henkilöiden ikien tunnistamista. Seuraava L033 opettaa 21–100:n rakenteen."
      ]
    }
  ]
};
