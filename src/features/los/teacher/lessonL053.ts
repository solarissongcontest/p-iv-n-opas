import type { TeacherLesson } from "./engine.ts";
/** C10 L053: bounded third-person grammar and honest reusable writing evidence. */
export const LOS1_L053_TEACHER: TeacherLesson = {
  "id": "L053",
  "bookId": 1,
  "chapterId": "10",
  "version": "2.0.0-preview.1",
  "title": "Esittele kolmas henkilö",
  "objective": "Käytän er/sie + heißt/ist/kommt -rakenteita ja harjoittelen kolmannen henkilön lyhyttä esittelyä neljällä oikealla tehtävällä.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredPracticeIds": [
    "C10-EX-06",
    "C10-EX-08",
    "C10-EX-10",
    "C10-EX-11"
  ],
  "requiredCheckedIds": [],
  "requiredActivityIds": [
    "c10-teacher-L053"
  ],
  "scenes": [
    {
      "id": "welcome",
      "kind": "introduction",
      "title": "Nyt et kerro vain itsestäsi",
      "phase": "Aloitus",
      "paragraphs": [
        "Vielä edellisissä kappaleissa olet sanonut Ich heiße, Ich bin ja Ich komme. Nyt opetellaan kertomaan samat tiedot kolmannesta henkilöstä.",
        "Kuvitteellinen Max ja Mia ovat harjoitushenkilöitä. Älä käytä oikeita henkilötietoja, syntymäaikoja tai yhteystietoja.",
        "Harjoittelet kirjan neljää oikeaa C10-tehtävää, joissa näkyvät er ist, er heißt, er kommt ja sie kommt. Uutta taivutusparadigmaa ei tarvita tätä laajempana."
      ]
    },
    {
      "id": "recall",
      "kind": "question",
      "title": "Muistatko minä-muodon?",
      "phase": "Muistelu",
      "paragraphs": [
        "Kertaa yksi tuttu alkuperäfraasi ennen hän-muotoa."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-MEET-10",
        "evidenceRole": "practice",
        "prompt": "Miten sanot Olen Suomesta?",
        "options": [
          {
            "id": "a",
            "label": "Ich kommt aus Finnland.",
            "wrongFeedback": "Ich tarvitsee komme-muodon."
          },
          {
            "id": "b",
            "label": "Ich komme aus Finnland."
          },
          {
            "id": "c",
            "label": "Er komme aus Finnland.",
            "wrongFeedback": "Er tarvitsee kommt-muodon."
          }
        ],
        "correctOption": "b",
        "success": "Ich komme aus Finnland. on minä-muoto.",
        "hint": "Ich + komme.",
        "reteach": "Ich komme aus Finnland. on minä-muoto. Ich + komme.",
        "genericWrong": "Vertaa subjektia ja verbimuotoa. Ich + komme."
      }
    },
    {
      "id": "explain",
      "kind": "explanation",
      "title": "Kolme verbiä vaihtaa muotoa persoonan mukaan",
      "phase": "Opetus",
      "paragraphs": [
        "Nimen kertominen: ich heiße = nimeni on, du heißt = nimesi on, er/sie heißt = hänen nimensä on. Esimerkiksi Er heißt Max.",
        "Olla-verbissä muodot ovat ich bin, du bist, er/sie ist. Kirjoita Das ist Mia. Sie ist siebzehn Jahre alt.",
        "Tulla-verbissä muodot ovat ich komme, du kommst, er/sie kommt. Esimerkiksi Sie kommt aus Finnland.",
        "Er viittaa tässä mieheen tai poikaan, sie naiseen tai tyttöön. Kohtelias Sie viittaa puhuteltavaan ja saa muodot heißen, sind ja kommen. Älä sekoita niitä er/sie-muotoihin.",
        "Harjoittele itse vain lauseita Das ist ..., Er/Sie heißt ..., Er/Sie kommt ... ja Er/Sie ist ... . Wir kommen tulee vastaan Text B:ssä, mutta sen järjestelmällistä monikkotaivutusta ei vaadita.",
        "Kolmannen henkilön esittelyä on mielekkäämpää harjoitella neljällä omalla lyhyellä virkkeellä kuin pelkillä irtonaisilla verbipäätteillä."
      ],
      "help": [
        {
          "title": "Miksi er kommt mutta ich komme?",
          "body": "Kommen-verbi: ich komme, du kommst, er/sie kommt. Huomaa -t kolmannessa persoonassa."
        },
        {
          "title": "Miksi er ist mutta du bist?",
          "body": "Sein on epäsäännöllinen: ich bin, du bist, er/sie ist. Opettele kolme muotoa valmiina."
        },
        {
          "title": "Mitä Sie isolla tarkoittaa?",
          "body": "Kohteliasta puhuttelua. Wie heißen Sie? kysyy vastaanottajalta nimeä. Sie heißt Mia. voi puolestaan viitata naiseen."
        },
        {
          "title": "Mikä on Das ist Peter?",
          "body": "Se on valmis esittelylause 'Tässä on Peter'. Sama esiintyy oikeassa Thomasin ja Takashin keskustelussa."
        }
      ]
    },
    {
      "id": "board",
      "kind": "board",
      "title": "Kolme persoonaa, kolme verbiä",
      "phase": "Opetustaulu",
      "paragraphs": [
        "Seuraa rivejä, mutta käytä niistä lopuksi vain kolmannen henkilön lauseita."
      ],
      "board": [
        {
          "label": "Nimi · minä",
          "german": "ich heiße",
          "meaning": "Minun nimeni on."
        },
        {
          "label": "Nimi · sinä ja hän",
          "german": "du heißt · er/sie heißt",
          "meaning": "Sinä olet nimeltäsi; hän on nimeltään."
        },
        {
          "label": "Olla",
          "german": "ich bin · du bist · er/sie ist",
          "meaning": "Olen, olet, hän on."
        },
        {
          "label": "Tulla",
          "german": "ich komme · du kommst · er/sie kommt",
          "meaning": "Tulen, tulet, hän tulee."
        },
        {
          "label": "Kolmannen henkilön esittely",
          "german": "Das ist Mia. Sie heißt Mia.",
          "meaning": "Tässä on Mia. Hänen nimensä on Mia."
        },
        {
          "label": "Alkuperä ja ikä",
          "german": "Sie kommt aus Finnland. Sie ist siebzehn.",
          "meaning": "Hän tulee Suomesta ja on seitsemäntoista."
        }
      ]
    },
    {
      "id": "guided",
      "kind": "question",
      "title": "Er ja ist kuuluvat yhteen",
      "phase": "Ohjattu harjoitus",
      "paragraphs": [
        "Kuvitteellinen Jonas on 17-vuotias. Valitse oikea lause."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-MEET-10",
        "evidenceRole": "practice",
        "prompt": "Mikä tarkoittaa Hän on 17-vuotias?",
        "options": [
          {
            "id": "a",
            "label": "Er bist siebzehn.",
            "wrongFeedback": "Bist kuuluu du-muotoon."
          },
          {
            "id": "b",
            "label": "Er bin siebzehn.",
            "wrongFeedback": "Bin kuuluu ich-muotoon."
          },
          {
            "id": "c",
            "label": "Er ist siebzehn."
          }
        ],
        "correctOption": "c",
        "success": "Er ist siebzehn. on oikein.",
        "hint": "Er/sie + ist.",
        "reteach": "Er ist siebzehn. on oikein. Er/sie + ist.",
        "genericWrong": "Vertaa subjektia ja verbimuotoa. Er/sie + ist."
      }
    },
    {
      "id": "source",
      "kind": "book",
      "title": "Vertaa persoonamuodot kirjan taulukkoon",
      "phase": "Kirjan malli",
      "paragraphs": [
        "Avaa C10:n kielioppisivu ja lue heißen, sein ja kommen -taulukko. Etsi erityisesti er/sie-rivi sekä kohtelias Sie-rivi.",
        "Text A:n Harald puhuu itsestään Ich heiße -muodossa. Sinun tehtäväsi on osata muuttaa tieto lyhyeksi hän-lauseeksi, esimerkiksi Er heißt Harald.",
        "Älä väitä itse tuottavasi kaikkia Haraldin vaikeita virkkeitä; alkuperäinen puhe on vain lukemisen lähde."
      ],
      "bookLinks": [
        {
          "chapterId": "10",
          "section": "grammar",
          "label": "C10 · heißen, sein, kommen",
          "instruction": "Vertaa ich-, du-, er/sie- ja kohteliaan Sie-muotoja."
        },
        {
          "chapterId": "10",
          "section": "text",
          "label": "C10 · Harald, Text A",
          "instruction": "Etsi Ich heiße Harald Becker ja Woher kommst du."
        }
      ]
    },
    {
      "id": "practice",
      "kind": "book",
      "title": "Tee neljä todellista muototehtävää",
      "phase": "Oikeat kirjatehtävät",
      "paragraphs": [
        "Tee C10-EX-06: Er ____ siebzehn (ist), EX-08: Er ____ Jonas (heißt), EX-10: Er ____ aus Deutschland (kommt) ja EX-11: Sie ____ aus Finnland (kommt).",
        "Nämä ovat kirjan oikeat täydentämistehtävät. Kirjoita jokaisessa itse puuttuva sana ja tallenna se, älä tee erillistä teeskentelykoetta."
      ],
      "bookLinks": [
        {
          "chapterId": "10",
          "section": "practice",
          "label": "C10 · EX-06, 08, 10 ja 11",
          "instruction": "Kirjoita ist, heißt ja kommt oikeisiin yhteyksiin."
        }
      ]
    },
    {
      "id": "independent",
      "kind": "question",
      "title": "Kirjoita hän tulee -muoto",
      "phase": "Itsenäinen harjoitus",
      "paragraphs": [
        "Peitä verbitaulukko. Kuvitteellinen Mia tulee Suomesta."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-MEET-10",
        "evidenceRole": "independent",
        "prompt": "Kirjoita saksaksi: Hän (nainen) tulee Suomesta.",
        "accepted": [
          "Sie kommt aus Finnland.",
          "Sie kommt aus Finnland"
        ],
        "success": "Sie kommt aus Finnland. on oikein.",
        "hint": "Naisen sie + tulee = kommt.",
        "reteach": "Sie kommt aus Finnland. on oikein. Naisen sie + tulee = kommt.",
        "genericWrong": "Tarkista pronomini ja verbin pääte. Naisen sie + tulee = kommt.",
        "wrongAnswers": {
          "sie komme aus finnland": "Sie tarvitsee kommt-muodon.",
          "sie kommen aus finnland": "Kohtelias Sie kommen on eri rakenne. Tässä nainen = sie kommt."
        }
      }
    },
    {
      "id": "application",
      "kind": "question",
      "title": "Er + heißt, ei heißen",
      "phase": "Soveltaminen",
      "paragraphs": [
        "Kerro ulkopuoliselle kuvitteellisen Maxin nimi."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-MEET-10",
        "evidenceRole": "application",
        "prompt": "Mikä esittelee Maxin oikein?",
        "options": [
          {
            "id": "a",
            "label": "Er heißt Max."
          },
          {
            "id": "b",
            "label": "Er heißen Max.",
            "wrongFeedback": "Heißt on er-muoto, heißen on muun muassa kohtelias Sie-muoto."
          },
          {
            "id": "c",
            "label": "Du heißt Max.",
            "wrongFeedback": "Tämä puhuttelee Maxia eikä esittele häntä toiselle."
          }
        ],
        "correctOption": "a",
        "success": "Er heißt Max. kertoo Maxin nimen.",
        "hint": "Er + heißt.",
        "reteach": "Er heißt Max. kertoo Maxin nimen. Er + heißt.",
        "genericWrong": "Vertaa subjektia ja verbimuotoa. Er + heißt."
      }
    },
    {
      "id": "activity",
      "kind": "activity",
      "title": "Kokoa neljän lauseen esittely",
      "phase": "Oma harjoittelu",
      "paragraphs": [
        "Harjoittele kuvitteellisesta Miasta neljä lausetta: Das ist Mia. Sie heißt Mia. Sie kommt aus Finnland. Sie ist siebzehn Jahre alt.",
        "Sano tai kirjoita virkkeet ensin ilman mallia ja vertaa vasta jälkeenpäin. Suorituksen kuittaus ei pisteytä ääntämistä tai täysin vapaata tekstinlaatua."
      ],
      "activityId": "c10-teacher-L053",
      "activityLabel": "Harjoittelin neljän virkkeen kolmannen henkilön esittelyn"
    },
    {
      "id": "exit",
      "kind": "question",
      "title": "Kohteliaan Sie-muodon ero",
      "phase": "Lopputarkistus",
      "paragraphs": [
        "Älä sekoita naista tarkoittavaa sie ja kohteliasta Sie-pronominia."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-MEET-10",
        "evidenceRole": "exit",
        "prompt": "Mikä on kohtelias nimen kysyminen?",
        "options": [
          {
            "id": "a",
            "label": "Wie heißt du?",
            "wrongFeedback": "Du on tuttavallinen."
          },
          {
            "id": "b",
            "label": "Wie heißen Sie?"
          },
          {
            "id": "c",
            "label": "Wie heißt Sie?",
            "wrongFeedback": "Kohtelias Sie tarvitsee heißen."
          }
        ],
        "correctOption": "b",
        "success": "Wie heißen Sie? kysyy kohteliaasti.",
        "hint": "Kohtelias Sie + heißen.",
        "reteach": "Wie heißen Sie? kysyy kohteliaasti. Kohtelias Sie + heißen.",
        "genericWrong": "Vertaa subjektia ja verbimuotoa. Kohtelias Sie + heißen."
      }
    },
    {
      "id": "summary",
      "kind": "summary",
      "title": "Osaat nyt kertoa toisesta henkilöstä",
      "phase": "Yhteenveto",
      "paragraphs": [
        "Kolmannen henkilön tärkeät muodot ovat er/sie heißt, er/sie ist ja er/sie kommt. Neljä kirjan oikeaa harjoitusta tallentuvat samaan C10-luonnokseen.",
        "L054:ssa sovellat muotoja kahteen erilliseen keskusteluun ja esittelet kuvitteellisen kolmannen henkilön tekstissä."
      ]
    }
  ]
};
