import type { TeacherLesson } from "./engine.ts";
/** C09: active time production uses full hours and am/um only. */
export const LOS1_L048_TEACHER: TeacherLesson = {
  "id": "L048",
  "bookId": 1,
  "chapterId": "09",
  "version": "2.0.0-preview.1",
  "title": "Am Montag, um drei Uhr",
  "objective": "Muodostan tasatuntien am/um-ajankohdat ja teen viisi oikeaa kirjan ajanilmaisutehtävää.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredActivityIds": [
    "c09-teacher-L048"
  ],
  "requiredPracticeIds": [
    "C09-EX-08",
    "C09-EX-09",
    "C09-EX-10",
    "C09-EX-13",
    "C09-EX-14"
  ],
  "requiredCheckedIds": [],
  "scenes": [
    {
      "id": "welcome",
      "kind": "introduction",
      "title": "Päivä ja tasatunti samaan lauseeseen",
      "phase": "Opetus",
      "paragraphs": [
        "C09:n aktiivinen ajanilmaus on am Montag um drei Uhr, maanantaina kello kolmelta. Tässä tunnissa opettelet myös Wann?-kysymyksen.",
        "Alkuperäisen Sport und Zeit -dialogin Viertel vor drei on vain tunnistamista varten. Sinun ei tarvitse vielä tuottaa varttiaikoja.",
        "Kirjan oikeat harjoitukset C09-EX-08–10 ja EX-13–14 tallentuvat samaan nykyiseen C09-luonnokseen."
      ]
    },
    {
      "id": "recall",
      "kind": "question",
      "title": "Viikonpäivä vai kellonaika?",
      "phase": "Opetus",
      "paragraphs": [
        "Muista, kumpi fraasi aloittaa viikonpäivän ilmauksen."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-TIME-09",
        "evidenceRole": "practice",
        "prompt": "Mikä tarkoittaa perjantaina?",
        "options": [
          {
            "id": "a",
            "label": "um Freitag",
            "wrongFeedback": "Kellonajan edellä on um."
          },
          {
            "id": "b",
            "label": "am Freitag"
          },
          {
            "id": "c",
            "label": "in Freitag",
            "wrongFeedback": "Tässä kiinteä ilmaus on am Freitag."
          }
        ],
        "correctOption": "b",
        "success": "Am Freitag tarkoittaa perjantaina.",
        "hint": "Viikonpäivä = am.",
        "reteach": "Am Freitag tarkoittaa perjantaina. Viikonpäivä = am.",
        "genericWrong": "Tarkista am ja um. Viikonpäivä = am."
      }
    },
    {
      "id": "explain",
      "kind": "explanation",
      "title": "Am ja um ovat kaksi eri ajanilmaisua",
      "phase": "Opetus",
      "paragraphs": [
        "Viikonpäivän edellä on am: am Montag, am Freitag ja am Sonntag. Viikonpäivä kirjoitetaan isolla, koska se on saksassa substantiivi.",
        "Kellonajan edellä käytetään um: um drei Uhr, um vier Uhr, um fünf Uhr. Uhr on myös substantiivi ja kirjoitetaan isolla.",
        "Yhdistä osat: am Montag um drei Uhr. Lauseen alussa ensimmäinen kirjain on iso: Am Montag um drei Uhr.",
        "Wann? tarkoittaa milloin? Vastaukseksi voi antaa viikonpäivän ja tasatunnin.",
        "Heute on tänään, morgen pienellä on huomenna ja gestern eilen. Der Morgen isolla tarkoittaa aamua.",
        "Tässä ei opetella koko prepositiokielioppia tai vaadita halb/Viertel vor/Viertel nach -muotojen tuottamista."
      ],
      "help": [
        {
          "title": "Miksi am Montag mutta um drei Uhr?",
          "body": "Am kuuluu viikonpäivään, um kellonaikaan. Muista koko fraasi am Montag um drei Uhr."
        },
        {
          "title": "Miksi Montag ja Uhr isoilla?",
          "body": "Ne ovat saksassa substantiiveja. Viikonpäivät alkavat aina isolla."
        },
        {
          "title": "Mitä Wann? tarkoittaa?",
          "body": "Se tarkoittaa milloin? Voit vastata Am Freitag um vier Uhr."
        },
        {
          "title": "Mikä ero on morgen ja Morgen?",
          "body": "morgen pienellä tarkoittaa huomenna. der Morgen tarkoittaa aamua."
        }
      ]
    },
    {
      "id": "board",
      "kind": "board",
      "title": "Rakenna ajanilmaus",
      "phase": "Opetus",
      "paragraphs": [
        "Lue esimerkit ääneen tai mielessäsi ja yhdistä osat yksi kerrallaan."
      ],
      "board": [
        {
          "label": "Päivä",
          "german": "am Montag",
          "meaning": "Maanantaina"
        },
        {
          "label": "Tasatunti",
          "german": "um drei Uhr",
          "meaning": "Kello kolmelta"
        },
        {
          "label": "Yhdessä",
          "german": "am Montag um drei Uhr",
          "meaning": "Maanantaina klo 3"
        },
        {
          "label": "Toinen päivä",
          "german": "am Freitag um vier Uhr",
          "meaning": "Perjantaina klo 4"
        },
        {
          "label": "Milloin?",
          "german": "Wann?",
          "meaning": "Ajankohtaa kysyvä sana"
        },
        {
          "label": "Ajan sanat",
          "german": "heute · morgen · gestern",
          "meaning": "Tänään · huomenna · eilen"
        }
      ]
    },
    {
      "id": "guided",
      "kind": "question",
      "title": "Valitse oikein koottu ajanilmaus",
      "phase": "Opetus",
      "paragraphs": [
        "Kuvitteellinen harrastus alkaa maanantaina kolmelta."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-TIME-09",
        "evidenceRole": "practice",
        "prompt": "Miten ilmaiset maanantaina kolmelta?",
        "options": [
          {
            "id": "a",
            "label": "um Montag am drei Uhr",
            "wrongFeedback": "Päivä ja kello ovat väärässä järjestyksessä."
          },
          {
            "id": "b",
            "label": "am Montag um drei Uhr"
          },
          {
            "id": "c",
            "label": "am drei um Montag",
            "wrongFeedback": "Kellonaika ei tule am-sanan jälkeen."
          }
        ],
        "correctOption": "b",
        "success": "Am Montag um drei Uhr on oikein.",
        "hint": "Am päivä, um kello.",
        "reteach": "Am Montag um drei Uhr on oikein. Am päivä, um kello.",
        "genericWrong": "Tarkista am ja um. Am päivä, um kello."
      }
    },
    {
      "id": "source",
      "kind": "book",
      "title": "Lue kirjan oma ajanilmaisukielioppi",
      "phase": "Opetus",
      "paragraphs": [
        "Avaa C09:n kielioppisivu ja etsi Wann?, am Montag ja um drei Uhr. Vertaa niiden tehtäviä toisiinsa.",
        "Alkuperäinen Sport und Zeit on myös avattavissa. Sen um drei on tunnin varsinainen tuotettava ajanilmaus."
      ],
      "bookLinks": [
        {
          "chapterId": "09",
          "section": "grammar",
          "label": "C09 · Am ja um",
          "instruction": "Lue viikonpäivän ja tasatunnin säännöt."
        },
        {
          "chapterId": "09",
          "section": "text",
          "label": "C09 · Sport und Zeit",
          "instruction": "Etsi Franzin um drei -repliikki."
        }
      ]
    },
    {
      "id": "practice",
      "kind": "book",
      "title": "Tee viisi alkuperäistä ajantehtävää",
      "phase": "Opetus",
      "paragraphs": [
        "Tee C09-EX-08 (am Montag), EX-09 (um drei Uhr), EX-10 (Wann?), EX-13 (am) ja EX-14 (um).",
        "Kahdessa viimeisessä kirjoitat puuttuvan sanan. Tee oma yritys ennen kuin katsot mallia. Vastaukset tallentuvat suoraan kirjan oikeaan harjoituspankkiin."
      ],
      "bookLinks": [
        {
          "chapterId": "09",
          "section": "practice",
          "label": "C09 · Tehtävät 08–10 ja 13–14",
          "instruction": "Vastaa ja tallenna viisi todellista harjoitusta."
        }
      ]
    },
    {
      "id": "independent",
      "kind": "question",
      "title": "Kirjoita perjantai neljältä",
      "phase": "Opetus",
      "paragraphs": [
        "Sulje opetustaulu. Kirjoita kokonainen ajanilmaus ilman mallia."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-TIME-09",
        "evidenceRole": "independent",
        "prompt": "Kirjoita saksaksi: perjantaina kello neljältä.",
        "accepted": [
          "am Freitag um vier Uhr",
          "Am Freitag um vier Uhr",
          "am Freitag um vier Uhr."
        ],
        "success": "Am Freitag um vier Uhr on oikein.",
        "hint": "Ensin am Freitag, sitten um vier Uhr.",
        "reteach": "Am Freitag um vier Uhr on oikein. Ensin am Freitag, sitten um vier Uhr.",
        "genericWrong": "Tarkista päiväilmaus ja kellonaika. Ensin am Freitag, sitten um vier Uhr."
      }
    },
    {
      "id": "application",
      "kind": "question",
      "title": "Vastaa milloin-kysymykseen",
      "phase": "Opetus",
      "paragraphs": [
        "Kuvitteellisessa kalenterissa tapaaminen on maanantaina kolmelta."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-TIME-09",
        "evidenceRole": "application",
        "prompt": "Mikä vastaa kysymykseen Wann?",
        "options": [
          {
            "id": "a",
            "label": "Ich heiße Mia.",
            "wrongFeedback": "Tämä vastaa nimen kysymiseen."
          },
          {
            "id": "b",
            "label": "Wie geht's?",
            "wrongFeedback": "Tämä kysyy kuulumisia."
          },
          {
            "id": "c",
            "label": "Am Montag um drei Uhr."
          }
        ],
        "correctOption": "c",
        "success": "Ajanilmaus vastaa kysymykseen Wann?.",
        "hint": "Etsi am/um-sanat.",
        "reteach": "Ajanilmaus vastaa kysymykseen Wann?. Etsi am/um-sanat.",
        "genericWrong": "Tarkista am ja um. Etsi am/um-sanat."
      }
    },
    {
      "id": "activity",
      "kind": "activity",
      "title": "Käytä kahta tasatuntia",
      "phase": "Opetus",
      "paragraphs": [
        "Harjoittele itse maanantaina kolmelta ja perjantaina neljältä. Kirjoita tai sano saksaksi ja tarkista lopuksi kirjan taulukosta.",
        "Oma vahvistus kertoo harjoittelusta, ei koneellisesti pisteytetystä puheesta."
      ],
      "activityId": "c09-teacher-L048",
      "activityLabel": "Harjoittelin kahden eri päivän tasatunteja"
    },
    {
      "id": "exit",
      "kind": "question",
      "title": "Pieni alkukirjain muuttaa merkitystä",
      "phase": "Opetus",
      "paragraphs": [
        "Erota saksan ajanilmaisun kaksi erilaista Morgen-sanaa."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-TIME-09",
        "evidenceRole": "exit",
        "prompt": "Mitä morgen pienellä tarkoittaa?",
        "options": [
          {
            "id": "a",
            "label": "Huomenna"
          },
          {
            "id": "b",
            "label": "Aamua substantiivina",
            "wrongFeedback": "Aamu substantiivina on Morgen isolla."
          },
          {
            "id": "c",
            "label": "Eilen",
            "wrongFeedback": "Gestern tarkoittaa eilen."
          }
        ],
        "correctOption": "a",
        "success": "morgen = huomenna.",
        "hint": "Pieni m tässä tarkoittaa huomista.",
        "reteach": "morgen = huomenna. Pieni m tässä tarkoittaa huomista.",
        "genericWrong": "Tarkista am ja um. Pieni m tässä tarkoittaa huomista."
      }
    },
    {
      "id": "summary",
      "kind": "summary",
      "title": "Am ja um pysyvät erillään",
      "phase": "Opetus",
      "paragraphs": [
        "Osaat muodostaa viikonpäivän ja tasatunnin yhdistelmän, kysyä Wann? ja tunnistaa heute, morgen sekä gestern.",
        "Viisi oikeaa kirjan tehtävää on oma tallennettu harjoitusnäyttösi. L049:ssa käytät samoja muotoja kuvitteellisessa viikkokalenterissa."
      ]
    }
  ]
};
