import type { TeacherLesson } from "./engine.ts";
/** C06 L031: Teacher 2.0 manuscript. No audio or unverified pronunciation assessment. */
export const LOS1_L031_TEACHER: TeacherLesson = {
  "id": "L031",
  "bookId": 1,
  "chapterId": "06",
  "version": "2.0.0-preview.1",
  "title": "Numerot 0–12",
  "objective": "Osaan tunnistaa ja kirjoittaa luvut 0–12 molempiin suuntiin.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "read-seven",
    "write-eight",
    "write-eleven",
    "exit"
  ],
  "requiredActivityIds": [
    "numbers-reviewed"
  ],
  "requiredPracticeIds": [
    "C06-EX-01",
    "C06-EX-02",
    "C06-EX-07",
    "C06-EX-08"
  ],
  "scenes": [
    {
      "id": "welcome",
      "phase": "Aloitus",
      "kind": "introduction",
      "title": "Saksan numerot alkavat nollasta",
      "paragraphs": [
        "Opettelet nollasta alkaen kolmeatoista lukusanaa. Tavoitteena on ymmärtää sekä kirjoitettu sana että numeromerkintä.",
        "Lue ensin mallia. Peitä sitten malli ja palautat sanan muistista. Oppitunti ei arvioi ääntämistäsi."
      ]
    },
    {
      "id": "zero-six",
      "phase": "Opetus",
      "kind": "explanation",
      "title": "Ensimmäiset luvut 0–6",
      "paragraphs": [
        "0 on null, 1 eins, 2 zwei, 3 drei, 4 vier, 5 fünf ja 6 sechs.",
        "Kiinnitä erityistä huomiota kirjoitusasuihin fünf (ü) ja sechs (-chs). Väärin kirjoitettua sanaa ei pidä päästää läpi vain koska sen voi arvata."
      ]
    },
    {
      "id": "board-first",
      "phase": "Mallisuoritus",
      "kind": "board",
      "title": "Opettaja näyttää 0–6",
      "paragraphs": [
        "Näytä luvut yksitellen. Sano mielessäsi kunkin numeron saksankielinen sana ennen seuraavaa vaihetta."
      ],
      "board": [
        {
          "label": "0",
          "german": "null",
          "meaning": "nolla"
        },
        {
          "label": "1",
          "german": "eins",
          "meaning": "yksi"
        },
        {
          "label": "2",
          "german": "zwei",
          "meaning": "kaksi"
        },
        {
          "label": "3",
          "german": "drei",
          "meaning": "kolme"
        },
        {
          "label": "4",
          "german": "vier",
          "meaning": "neljä"
        },
        {
          "label": "5",
          "german": "fünf",
          "meaning": "viisi, ü"
        },
        {
          "label": "6",
          "german": "sechs",
          "meaning": "kuusi, -chs"
        }
      ]
    },
    {
      "id": "recall",
      "phase": "Ohjattu harjoittelu",
      "kind": "question",
      "title": "Mitä eins tarkoittaa numeroin?",
      "paragraphs": [
        "Näimme jo opetustaululla, että eins tarkoittaa yhtä. Sulje malli ja kirjoita nyt vastaava numeromerkki. Tarvittaessa voit pyytää vihjeen."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-NUM-01",
        "evidenceRole": "practice",
        "prompt": "Kirjoita numeroin: eins",
        "accepted": [
          "1"
        ],
        "success": "Oikein. Eins tarkoittaa yhtä, joten numeromerkki on 1.",
        "hint": "Eins on opetustaulun toinen luku nollan jälkeen. Se tarkoittaa yhtä.",
        "reteach": "Eins = yksi. Kun tehtävä pyytää kirjoittamaan numeroin, vastaa 1.",
        "genericWrong": "Kirjoita numeromerkki, ei sanaa: eins tarkoittaa yhtä (1).",
        "wrongAnswers": {
          "eins": "Tehtävä pyytää numeromerkintää 1."
        }
      }
    },
    {
      "id": "seven-twelve",
      "phase": "Opetus",
      "kind": "explanation",
      "title": "Luvut 7–12 ja poikkeukset",
      "paragraphs": [
        "7 sieben, 8 acht, 9 neun ja 10 zehn jatkavat listaa. 11 elf ja 12 zwölf ovat poikkeuksia. Niitä ei muodosteta lisäämällä zehn sanoihin eins tai zwei.",
        "Opettele kaksitoista erikseen: zwölf, ei zwolf. Ö on oikea kirjain ja tärkeä osa kirjoitusasua."
      ],
      "help": [
        {
          "title": "Miksi elf ja zwölf ovat erilaisia?",
          "body": "11 ja 12 ovat omat lukusanansa. Älä yritä käyttää samaa -zehn-rakennetta kuin luvussa dreizehn."
        }
      ]
    },
    {
      "id": "board-second",
      "phase": "Mallisuoritus",
      "kind": "board",
      "title": "Opettaja näyttää 7–12",
      "paragraphs": [
        "Vertaa 11:tä ja 12:ta muihin lukuihin."
      ],
      "board": [
        {
          "label": "7",
          "german": "sieben",
          "meaning": "seitsemän"
        },
        {
          "label": "8",
          "german": "acht",
          "meaning": "kahdeksan"
        },
        {
          "label": "9",
          "german": "neun",
          "meaning": "yhdeksän"
        },
        {
          "label": "10",
          "german": "zehn",
          "meaning": "kymmenen"
        },
        {
          "label": "11",
          "german": "elf",
          "meaning": "yksitoista"
        },
        {
          "label": "12",
          "german": "zwölf",
          "meaning": "kaksitoista, ö"
        }
      ]
    },
    {
      "id": "guided",
      "phase": "Ohjattu harjoitus",
      "kind": "question",
      "title": "Tunnista poikkeus",
      "paragraphs": [
        "Valitse kaksiatoista vastaava sana."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-NUM-01",
        "prompt": "Mikä on 12 saksaksi?",
        "options": [
          {
            "id": "a",
            "label": "elf",
            "wrongFeedback": "Elf on yksitoista."
          },
          {
            "id": "b",
            "label": "zwölf"
          },
          {
            "id": "c",
            "label": "zweizehn",
            "wrongFeedback": "Kaksitoista on poikkeus: zwölf, ei zweizehn."
          }
        ],
        "correctOption": "b",
        "success": "Oikein. Zwölf on kaksitoista.",
        "hint": "Siinä on ö-kirjain.",
        "reteach": "Elf = 11, zwölf = 12.",
        "genericWrong": "11 ja 12 eivät käytä tavallista -zehn-rakennetta."
      }
    },
    {
      "id": "read-seven",
      "phase": "Harjoittelu",
      "kind": "question",
      "title": "Palauta muistista",
      "paragraphs": [
        "Kirjoita ilman näkyvää mallia. Vihje on käytettävissä, mutta silloin vastausta ei lasketa itsenäiseksi näytöksi."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-NUM-01",
        "evidenceRole": "independent",
        "prompt": "Kirjoita numeroin: sieben",
        "accepted": [
          "7"
        ],
        "success": "Oikein. Muoto tai numero vastaa kysyttyä.",
        "hint": "Palaa opetustaulun oikeaan kohtaan ja katso sanan kirjoitusasu.",
        "reteach": "Kertaa opettajan näyttämä saksankielinen sanamuoto ja kokeile uudelleen.",
        "genericWrong": "Tarkista merkit ja vastaussuunta. Umlautia tai ß-kirjainta ei vaihdeta automaattisesti.",
        "wrongAnswers": {
          "sieben": "Kirjoita numeroin 7."
        }
      }
    },
    {
      "id": "write-eight",
      "phase": "Harjoittelu",
      "kind": "question",
      "title": "Palauta muistista",
      "paragraphs": [
        "Kirjoita ilman näkyvää mallia. Vihje on käytettävissä, mutta silloin vastausta ei lasketa itsenäiseksi näytöksi."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-NUM-01",
        "evidenceRole": "independent",
        "prompt": "Kirjoita saksaksi: 8",
        "accepted": [
          "acht"
        ],
        "success": "Oikein. Muoto tai numero vastaa kysyttyä.",
        "hint": "Palaa opetustaulun oikeaan kohtaan ja katso sanan kirjoitusasu.",
        "reteach": "Kertaa opettajan näyttämä saksankielinen sanamuoto ja kokeile uudelleen.",
        "genericWrong": "Tarkista merkit ja vastaussuunta. Umlautia tai ß-kirjainta ei vaihdeta automaattisesti.",
        "wrongAnswers": {
          "8": "Kirjoita saksankielinen sana acht."
        }
      }
    },
    {
      "id": "source",
      "phase": "Oppikirja",
      "kind": "book",
      "title": "Kirjan numerosanasto ja neljä harjoitusta",
      "paragraphs": [
        "Kertaa sanastosta kaikki luvut null–zwölf. Tee kirjan C06-EX-01, C06-EX-02, C06-EX-07 ja C06-EX-08.",
        "Tarkista kirjan vastaukset palautteen kanssa. Samat vastaukset tallentuvat C06:n oikeaan opiskelutilaan."
      ],
      "bookLinks": [
        {
          "chapterId": "06",
          "section": "vocabulary",
          "label": "C06 · vocabulary",
          "instruction": "Tutki sisältöä ja tee tunnilla nimetyt tehtävät."
        },
        {
          "chapterId": "06",
          "section": "practice",
          "label": "C06 · practice",
          "instruction": "Tutki sisältöä ja tee tunnilla nimetyt tehtävät."
        }
      ],
      "activityId": "numbers-reviewed",
      "activityLabel": "Olen kerrannut kaikki luvut 0–12"
    },
    {
      "id": "write-eleven",
      "phase": "Harjoittelu",
      "kind": "question",
      "title": "Palauta muistista",
      "paragraphs": [
        "Kirjoita ilman näkyvää mallia. Vihje on käytettävissä, mutta silloin vastausta ei lasketa itsenäiseksi näytöksi."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-NUM-01",
        "evidenceRole": "independent",
        "prompt": "Kirjoita saksaksi: 11",
        "accepted": [
          "elf"
        ],
        "success": "Oikein. Muoto tai numero vastaa kysyttyä.",
        "hint": "Palaa opetustaulun oikeaan kohtaan ja katso sanan kirjoitusasu.",
        "reteach": "Kertaa opettajan näyttämä saksankielinen sanamuoto ja kokeile uudelleen.",
        "genericWrong": "Tarkista merkit ja vastaussuunta. Umlautia tai ß-kirjainta ei vaihdeta automaattisesti.",
        "wrongAnswers": {
          "einszehn": "11 ei ole einszehn. Oikea poikkeusmuoto on elf."
        }
      }
    },
    {
      "id": "exit",
      "phase": "Lopputarkistus",
      "kind": "question",
      "title": "Palauta muistista",
      "paragraphs": [
        "Kirjoita ilman näkyvää mallia. Vihje on käytettävissä, mutta silloin vastausta ei lasketa itsenäiseksi näytöksi."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-NUM-01",
        "evidenceRole": "exit",
        "prompt": "Kirjoita saksaksi: 12",
        "accepted": [
          "zwölf"
        ],
        "success": "Oikein. Muoto tai numero vastaa kysyttyä.",
        "hint": "Palaa opetustaulun oikeaan kohtaan ja katso sanan kirjoitusasu.",
        "reteach": "Kertaa opettajan näyttämä saksankielinen sanamuoto ja kokeile uudelleen.",
        "genericWrong": "Tarkista merkit ja vastaussuunta. Umlautia tai ß-kirjainta ei vaihdeta automaattisesti.",
        "wrongAnswers": {
          "zwolf": "Sana kirjoitetaan ö-kirjaimella: zwölf.",
          "zweizehn": "Kaksitoista on poikkeus: zwölf."
        }
      }
    },
    {
      "id": "summary",
      "phase": "Yhteenveto",
      "kind": "summary",
      "title": "Tarkista mitä osaat",
      "paragraphs": [
        "Harjoittelit kaikki luvut 0–12, muunnokset sanasta numeroksi ja numerosta sanaksi sekä poikkeukset elf ja zwölf.",
        "Seuraavalla tunnilla yhdistetään luvut 13–20 ikäkysymykseen Wie alt bist du?."
      ]
    }
  ]
};
