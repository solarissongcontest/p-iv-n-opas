import type { TeacherLesson } from "./engine.ts";
/** C04 L019: production of Sie heißen/Sie kommen, with separate case-sensitive choice evidence. */
export const LOS1_L019_TEACHER: TeacherLesson = {
  "id": "L019",
  "bookId": 1,
  "chapterId": "04",
  "version": "2.0.0-preview.1",
  "title": "Kohtelias verbinmuoto",
  "objective": "Muodostan kysymykset Wie heißen Sie? ja Woher kommen Sie?, erotan ne du-muodoista ja tunnistan Sie-puhuttelun ison alkukirjaimen.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "verb-check",
    "guided",
    "capital-check",
    "independent",
    "application",
    "exit"
  ],
  "requiredActivityIds": [
    "grammar-book-reviewed"
  ],
  "requiredPracticeIds": [
    "C04-EX-05",
    "C04-EX-06",
    "C04-EX-07",
    "C04-EX-08",
    "C04-EX-12"
  ],
  "scenes": [
    {
      "id": "welcome",
      "phase": "Aloitus",
      "kind": "introduction",
      "title": "Nyt muodostat itse kohteliaat kysymykset",
      "paragraphs": [
        "L017:ssa opit, miksi du ja Sie ovat erilaisia puhuttelutapoja. L018:ssa tunnistit muodollisen keskustelun. Nyt harjoittelemme aktiivisesti kahta rakennetta: Wie heißen Sie? ja Woher kommen Sie?",
        "Lähtökohtana ovat tutut kysymykset Wie heißt du? ja Woher kommst du? Kun vaihdat puhuttelumuotoa, myös verbi vaihtuu.",
        "Tällä tunnilla ei opeteta pronominien koko sijataivutusta tai kaikkien verbien persoonamuotoja. Keskity vain opetettaviin heißen- ja kommen-verbin muotoihin."
      ]
    },
    {
      "id": "recall",
      "phase": "Muistelu",
      "kind": "question",
      "title": "Tunnista tuttu du-muoto",
      "paragraphs": [
        "Palauta mieleen C02:n ja C03:n jo oppimasi verbipäätteet."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-GRA-01",
        "prompt": "Mikä verbi sopii: Woher ___ du?",
        "options": [
          {
            "id": "a",
            "label": "kommst"
          },
          {
            "id": "b",
            "label": "kommen",
            "wrongFeedback": "Kommen kuuluu perusmuotoon ja kohteliaaseen Sie-puhutteluun."
          },
          {
            "id": "c",
            "label": "komme",
            "wrongFeedback": "Komme kuuluu ich-muotoon."
          }
        ],
        "correctOption": "a",
        "success": "Oikein. Woher kommst du?",
        "hint": "Du tarvitsee tässä -st.",
        "reteach": "Du kommst, mutta Sie kommen.",
        "genericWrong": "Tarkista ensin puhuttelupronomini, sitten siihen kuuluva verbi. Vertaa opettajan vaiheisiin."
      }
    },
    {
      "id": "difference",
      "phase": "Opettajan selitys",
      "kind": "explanation",
      "title": "Sie muuttaa myös verbin",
      "paragraphs": [
        "Du ja Sie eivät ole vain kaksi sanaa samalle henkilölle. Kohtelias puhuttelu käyttää heißen- ja kommen-verbien muotoa, jonka pääte on -en: Sie heißen ja Sie kommen.",
        "Tuttu esimerkki: Wie heißt du? Kohtelias versio: Wie heißen Sie? Samalla periaatteella Woher kommst du? muuttuu kysymykseksi Woher kommen Sie?",
        "Nimikysymyksen wie ja alkuperäkysymyksen woher aloittavat kysymyksen. Taivutettu verbi tulee heti niiden jälkeen, ja puhuttelupronomini viimeiseksi: Wie + heißen + Sie?",
        "Kohtelias Sie kirjoitetaan myös virkkeen keskellä isolla. Muista kuitenkin, että automaattinen vapaan tekstin tarkistin ei tällä hetkellä arvioi ison S:n hallintaa erikseen. Tehtävä C04-EX-03 sekä tämän tunnin oikeinkirjoitusmonivalinta tarkistavat sen."
      ],
      "help": [
        {
          "title": "Selitä yksinkertaisemmin",
          "body": "Kaverille: Wie heißt du? Kohteliaasti: Wie heißen Sie? Kaverille: Woher kommst du? Kohteliaasti: Woher kommen Sie?"
        },
        {
          "title": "Selitä vaihe vaiheelta",
          "body": "1. Valitse kohtelias puhuttelu Sie. 2. Vaihda heißt → heißen tai kommst → kommen. 3. Kysy: Wie heißen Sie? tai Woher kommen Sie?"
        },
        {
          "title": "Näytä toinen esimerkki",
          "body": "Tuttu kysymys Du kommst aus Finnland. Kohtelias toteamus Sie kommen aus Finnland. Kysymyksessä: Woher kommen Sie?"
        },
        {
          "title": "Miksi tätä tarvitaan?",
          "body": "Kohteliaan muodon käyttäminen voi olla sopiva tapa aloittaa virallinen palvelutilanne. Kohteliaisuus ei synny pelkästään lisäämällä Sie väärin taivutettuun lauseeseen."
        },
        {
          "title": "Kertaa aiempi asia",
          "body": "C02: du heißt. C03: du kommst. C04: Sie heißen, Sie kommen."
        },
        {
          "title": "Näytä oppikirjan kohta",
          "body": "Avaa tämän tunnin C04 · Kielioppi -viite. Tarkista kirjasta molempien kysymysten sanat ja Sie:n iso kirjain."
        }
      ]
    },
    {
      "id": "construction",
      "phase": "Vaiheittainen opetustaulu",
      "kind": "board",
      "title": "Muodosta nimikysymys ja alkuperäkysymys",
      "paragraphs": [
        "Seuraa kahta aiemmin opittua du-kysymystä ja muunna ne kohteliaiksi. Ennusta jokaisessa vaiheessa seuraava verbi ennen vastauksen paljastamista.",
        "Huomaa, että kysymyksen lopussa on edelleen kysymysmerkki. Puhuttelu ei muuta kysymisen tarkoitusta."
      ],
      "board": [
        {
          "label": "1 · Tutun nimi",
          "german": "Wie heißt du?",
          "meaning": "Du + heißt. Minkä niminen sinä olet?"
        },
        {
          "label": "2 · Kohtelias nimi",
          "german": "Wie heißen Sie?",
          "meaning": "Sie + heißen. Mikä Teidän nimenne on?"
        },
        {
          "label": "3 · Tutun alkuperä",
          "german": "Woher kommst du?",
          "meaning": "Du + kommst. Mistä olet kotoisin?"
        },
        {
          "label": "4 · Kohtelias alkuperä",
          "german": "Woher kommen Sie?",
          "meaning": "Sie + kommen. Mistä olette kotoisin?"
        },
        {
          "label": "5 · Vastaus",
          "german": "Ich komme aus Finnland.",
          "meaning": "Vastaaja käyttää edelleen ich-muotoa; Sie kuuluu kysyjälle tai puhutellulle."
        },
        {
          "label": "6 · Kirjain",
          "german": "Sie",
          "meaning": "Kohtelias puhuttelu isolla S:llä myös virkkeen sisällä."
        }
      ]
    },
    {
      "id": "verb-check",
      "phase": "Välikysymys",
      "kind": "question",
      "title": "Mikä pääte sopii?",
      "paragraphs": [
        "Kysymyksen puhuttelu on Sie. Valitse oikea heißen-muoto."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-GRA-01",
        "prompt": "Täydennä: Wie ___ Sie?",
        "options": [
          {
            "id": "a",
            "label": "heißt",
            "wrongFeedback": "Tämä on du-muoto: du heißt."
          },
          {
            "id": "b",
            "label": "heißen"
          },
          {
            "id": "c",
            "label": "heiße",
            "wrongFeedback": "Tämä on ich-muoto: ich heiße."
          }
        ],
        "correctOption": "b",
        "success": "Oikein. Wie heißen Sie?",
        "hint": "Katso opetustaulun vaihetta 2.",
        "reteach": "Sie heißen, ei Sie heißt.",
        "genericWrong": "Tarkista ensin puhuttelupronomini, sitten siihen kuuluva verbi. Vertaa opettajan vaiheisiin."
      }
    },
    {
      "id": "guided",
      "phase": "Ohjattu harjoitus",
      "kind": "question",
      "title": "Muodosta kohtelias alkuperäkysymys",
      "paragraphs": [
        "Vaihda tutun du-kysymys Sie-kysymykseksi. Malli on vielä näkyvissä."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-GRA-01",
        "prompt": "Mikä vastaa kohteliaasti kysymystä Mistä olette kotoisin?",
        "options": [
          {
            "id": "a",
            "label": "Woher kommst Sie?",
            "wrongFeedback": "Kommst kuuluu du-muotoon."
          },
          {
            "id": "b",
            "label": "Woher kommen du?",
            "wrongFeedback": "Sie-puhuttelussa ei käytetä du-sanaa."
          },
          {
            "id": "c",
            "label": "Woher kommen Sie?"
          }
        ],
        "correctOption": "c",
        "success": "Oikein. Woher kommen Sie?",
        "hint": "Woher + kommen + Sie.",
        "reteach": "Sie tarvitsee kommen-muodon, ja kysymyssana woher on alussa.",
        "genericWrong": "Tarkista ensin puhuttelupronomini, sitten siihen kuuluva verbi. Vertaa opettajan vaiheisiin."
      }
    },
    {
      "id": "capital-check",
      "phase": "Oikeinkirjoituksen tarkistus",
      "kind": "question",
      "title": "Iso S merkitsee kohteliasta puhuttelua",
      "paragraphs": [
        "Tässä tehtävässä kirjainkoko todella tarkistetaan: valitse täsmälleen oikea kirjoitusasu. Vapaan tekstin tarkistus ei yksin todista sitä."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-04",
        "prompt": "Mikä lause käyttää Sie-puhuttelua oikein keskellä virkettä?",
        "options": [
          {
            "id": "a",
            "label": "Wie heißen sie?",
            "wrongFeedback": "Kohtelias puhuttelu vaatii ison S:n."
          },
          {
            "id": "b",
            "label": "Wie heißen Sie?"
          },
          {
            "id": "c",
            "label": "Wie heißt Sie?",
            "wrongFeedback": "Sie käyttää verbiä heißen eikä heißt."
          }
        ],
        "correctOption": "b",
        "success": "Oikein. Kohtelias Sie on isolla, ja verbi on heißen.",
        "hint": "Tutki sekä verbin päätettä että S-kirjainta.",
        "reteach": "Wie heißen Sie? on tässä oikein kirjoitettu kohtelias nimikysymys.",
        "genericWrong": "Tarkista ensin puhuttelupronomini, sitten siihen kuuluva verbi. Vertaa opettajan vaiheisiin."
      }
    },
    {
      "id": "book",
      "phase": "Oppikirjan harjoitukset",
      "kind": "book",
      "title": "Tee kirjan oikeat taivutustehtävät",
      "paragraphs": [
        "Avaa C04:n Kielioppi ja varmista muotojen du heißt / Sie heißen sekä du kommst / Sie kommen erot. Tee sen jälkeen kirjan omat C04-EX-05, 06, 07, 08 ja 12.",
        "Tehtävien vastaukset tallennetaan kirjan nykyiseen C04-harjoitustilaan. Kun palaat tänne, niitä ei kopioida Teacher Playerin uuteen tietokantaan."
      ],
      "bookLinks": [
        {
          "label": "C04 · Kielioppi",
          "chapterId": "04",
          "section": "grammar",
          "instruction": "Tarkista Sie heißen, Sie kommen ja kysymyssanajärjestys."
        },
        {
          "label": "C04 · Harjoitukset",
          "chapterId": "04",
          "section": "practice",
          "instruction": "Tee C04-EX-05–08 ja C04-EX-12."
        }
      ],
      "activityId": "grammar-book-reviewed",
      "activityLabel": "Kertasin kieliopin ja täytin kirjan C04-EX-05–08/12"
    },
    {
      "id": "independent",
      "phase": "Itsenäinen tuottaminen",
      "kind": "question",
      "title": "Kirjoita kohtelias nimikysymys",
      "paragraphs": [
        "Sulje kielioppitaulu ennen vastaamista. Kirjoita koko kysymys. Tarkista erikseen ison S:n kirjoitusasu omaan vastaukseesi; tämän tekstikentän vertailu ei pisteytä kirjainkokoa."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-INT-04",
        "evidenceRole": "independent",
        "prompt": "Kirjoita saksaksi: Mikä Teidän nimenne on?",
        "accepted": [
          "Wie heißen Sie?",
          "Wie heißen Sie"
        ],
        "success": "Oikein. Kysymyksen sanajärjestys ja verbimuoto ovat oikein.",
        "hint": "Aloita Wie; seuraa heißen ja Sie.",
        "reteach": "Wie heißen Sie? = Mikä Teidän nimenne on?",
        "genericWrong": "Tarkista kysymyssanan, verbin ja Sie-pronominin järjestys. Tarkista erikseen myös Sie:n iso alkukirjain kirjasta."
      }
    },
    {
      "id": "application",
      "phase": "Soveltaminen",
      "kind": "question",
      "title": "Uusi virallinen tapaaminen",
      "paragraphs": [
        "Tapaat saksankielisen henkilön ensimmäistä kertaa virallisessa asioinnissa. Haluat kysyä, mistä hän on kotoisin. Käytä kohteliasta puhuttelua."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-INT-04",
        "evidenceRole": "application",
        "prompt": "Kirjoita saksaksi: Mistä olette kotoisin?",
        "accepted": [
          "Woher kommen Sie?",
          "Woher kommen Sie"
        ],
        "success": "Oikein. Kysymys on Woher kommen Sie?",
        "hint": "Mistä = woher. Te = Sie.",
        "reteach": "Woher kommen Sie? kysyy alkuperää kohteliaasti. Woher kommst du? on tutun muoto.",
        "genericWrong": "Tarkista kysymyssanan, verbin ja Sie-pronominin järjestys. Tarkista erikseen myös Sie:n iso alkukirjain kirjasta."
      }
    },
    {
      "id": "exit",
      "phase": "Lopputarkistus",
      "kind": "question",
      "title": "Erota kaksi eri henkilöä",
      "paragraphs": [
        "Minkä saksankielisen rakenteen valitsisit, kun kysyt nimen kohteliaasti yhdeltä henkilöltä?"
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-GRA-01",
        "evidenceRole": "exit",
        "prompt": "Mikä pari vastaa toisiaan oikein?",
        "options": [
          {
            "id": "a",
            "label": "du heißen / Sie heißt",
            "wrongFeedback": "Molemmat verbimuodot ovat väärässä parissa."
          },
          {
            "id": "b",
            "label": "du heißt / Sie heißen"
          },
          {
            "id": "c",
            "label": "du heißt / Sie heißt",
            "wrongFeedback": "Sie:n kanssa käytetään heißen."
          }
        ],
        "correctOption": "b",
        "success": "Oikein. Du heißt ja Sie heißen.",
        "hint": "Muista C02:n du heißt ja C04:n Sie heißen.",
        "reteach": "Du heißt, Sie heißen. Säännöt pätevät myös Woher kommst du? / Woher kommen Sie?",
        "genericWrong": "Tarkista ensin puhuttelupronomini, sitten siihen kuuluva verbi. Vertaa opettajan vaiheisiin."
      }
    },
    {
      "id": "summary",
      "phase": "Yhteenveto",
      "kind": "summary",
      "title": "Osaat muodostaa kaksi kohteliasta kysymystä",
      "paragraphs": [
        "Harjoittelit rakenteet Wie heißen Sie? ja Woher kommen Sie? ja erottelit niiden verbimuodot du-kysymyksistä.",
        "Kohteliaan Sie:n ison alkukirjaimen tunnistit erillisessä monivalinnassa. Vapaan tekstin automaattinen normalisointi ei yksin todista oikeinkirjoituksen kirjainkoon hallintaa.",
        "L020:ssa harjoittelet kohteliaisuusfraasien valintaa C04:n todellisesta Text B -lähteestä."
      ]
    }
  ]
};
