import type { TeacherLesson } from "./engine.ts";
/** C07 L038: writing/letters; M-COM-06 is optional, NOT an exact verified transcript or listening test. */
export const LOS1_L038_TEACHER: TeacherLesson = {
  "id": "L038",
  "bookId": 1,
  "chapterId": "07",
  "version": "2.0.0-preview.1",
  "title": "Tavaa ja ymmärrä numeroita",
  "objective": "Erotan erikoiskirjainten oikeinkirjoituksen kirjaimen äänteestä, tunnistan kohteliaan tavaamis- ja toistopyynnön sekä teen oikeat tehtävät.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredActivityIds": [
    "activity-L038"
  ],
  "requiredPracticeIds": [
    "C07-EX-08",
    "C07-EX-09",
    "C07-EX-14",
    "C07-EX-15"
  ],
  "requiredCheckedIds": [
    "C07-TEXTB-Q01",
    "C07-TEXTB-Q04"
  ],
  "scenes": [
    {
      "id": "welcome",
      "kind": "introduction",
      "phase": "Aloitus",
      "title": "Kirjoitusasu ja ääntäminen ovat eri taitoja",
      "paragraphs": [
        "C07:n ensimmäinen opetus käsitteli nimien kirjaimia. Nyt täsmennät eron kirjoitetun sanan, sen kirjainten nimien ja puhutun ääntämisen välillä.",
        "Harjoittelet sanoja heißt ja München sekä käyttökelpoisia fraaseja Bitte buchstabieren Sie. ja Noch einmal, bitte.",
        "C07:n Text B perustuu aitoon noin minuutin aakkosäänitteeseen, mutta sen tarkkaa litteraattia, toistojärjestystä ja mobiili-/työpöytätoimivuutta ei ole vahvistettu. Kirjainharjoitukset voi tehdä pelkästä kirjainrivistä."
      ]
    },
    {
      "id": "recall",
      "kind": "question",
      "phase": "Muistelu",
      "title": "Tunnista saksan erikoismerkki",
      "paragraphs": [
        "Muistatko, mitkä erikoiskirjaimet kuuluvat saksan kirjoitusjärjestelmään?"
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-SPELL-07",
        "evidenceRole": "practice",
        "prompt": "Mikä näistä on saksan kirjoitusasun erikoismerkki?",
        "options": [
          {
            "id": "a",
            "label": "Å",
            "wrongFeedback": "Å kuuluu suomen ja ruotsin aakkosiin, ei saksan tavalliseen aakkostoon."
          },
          {
            "id": "b",
            "label": "ß"
          },
          {
            "id": "c",
            "label": "Ø",
            "wrongFeedback": "Ø on käytössä esimerkiksi tanskan ja norjan kielissä, ei saksan säännönmukaisena kirjainmerkkinä."
          }
        ],
        "correctOption": "b",
        "success": "ß on saksan Eszett.",
        "hint": "Se näkyy sanassa heißt.",
        "reteach": "ß on saksan Eszett. Se näkyy sanassa heißt.",
        "genericWrong": "Tarkista, onko merkki, sana ja käyttötarkoitus sama. Se näkyy sanassa heißt."
      }
    },
    {
      "id": "explain",
      "kind": "explanation",
      "phase": "Opetus",
      "title": "Milloin heißt ja milloin heisst?",
      "paragraphs": [
        "Yleissaksan sanassa du heißt (sinun nimesi on) oikea kirjoitusasu on ß: heißt. Muodot heisst ja heißst eivät ole tämän oppikirjan Saksan standardin mukainen oikeinkirjoitus.",
        "Sveitsin standardisaksassa ß-kirjainta ei tavallisesti käytetä, jolloin sana voidaan kirjoittaa heisst. C07:n tätä harjoitusta varten opetetaan oppikirjan heißt-muoto. Siksi alue-ero kannattaa huomata mutta ei sotkea arvioitavaa muotoa.",
        "Sanan München oikea kirjoitusasu sisältää ü:n. Tekninen korvaus ue voi joissakin tilanteissa olla sallittu, mutta saksankielinen kaupunginnimi kirjoitetaan tässä München.",
        "Wie schreibt man das? kysyy oikeaa kirjoitusasua. Bitte buchstabieren Sie. pyytää tavaamaan kohteliaasti. Noch einmal, bitte. pyytää toistamaan.",
        "Text B:n kirjainrivi A–Z ja Ä Ö Ü ß on LOS!:n oma tukilista, ei äänitteen tarkistettu litteraatti. Siksi tehtävien tarkistus ei todista äänen kuulemista."
      ],
      "help": [
        {
          "title": "Miksi heisst voi näkyä Sveitsissä?",
          "body": "Sveitsin standardisaksassa ß:n sijaan kirjoitetaan usein ss. Oppikirjan harjoituksen malli on kuitenkin heißt, ja siihen viitataan vastauksen tarkistuksessa."
        },
        {
          "title": "Onko ß sama kuin B?",
          "body": "Ei. ß on Eszett, joka liittyy s-äänteeseen. Iso B on kokonaan toinen kirjain."
        },
        {
          "title": "Mitä Noch einmal, bitte. tarkoittaa?",
          "body": "Vielä kerran, kiitos. Se on kohtelias toistopyyntö, ei tavaamispyyntö."
        },
        {
          "title": "Tarkistaako sovellus ääntämisen?",
          "body": "Ei. Text B:n kirjainrivi on näkyvä, mutta alkuperäisen noin minuutin audion laitetestausta ja sanatarkkaa litteraattia ei ole vahvistettu."
        }
      ]
    },
    {
      "id": "board",
      "kind": "board",
      "phase": "Opetustaulu",
      "title": "Neljä käytännön eroa",
      "paragraphs": [
        "Katso kunkin sanan kirjoitusasu sekä se, mitä tilanteessa yrität tehdä."
      ],
      "board": [
        {
          "label": "Kirjaimen nimi",
          "german": "W · ß",
          "meaning": "Kirjaimen nimi ja kirjain sanassa ovat eri käsitteitä."
        },
        {
          "label": "Kaupungin nimi",
          "german": "München",
          "meaning": "Kirjoitusasussa on ü."
        },
        {
          "label": "Nimikysymyksen verbi",
          "german": "du heißt",
          "meaning": "Tässä saksan standardikirjoitusasussa ß."
        },
        {
          "label": "Kysy kirjoitusasua",
          "german": "Wie schreibt man das?",
          "meaning": "Miten se kirjoitetaan?"
        },
        {
          "label": "Pyydä tavaamaan",
          "german": "Bitte buchstabieren Sie.",
          "meaning": "Tavatkaa, olkaa hyvä."
        },
        {
          "label": "Pyydä toistamaan",
          "german": "Noch einmal, bitte.",
          "meaning": "Vielä kerran, kiitos."
        }
      ]
    },
    {
      "id": "guided",
      "kind": "question",
      "phase": "Ohjattu harjoitus",
      "title": "Erikoismerkki oikeaan sanaan",
      "paragraphs": [
        "Tunnista tämän kirjan opettama du-muoto, jossa näkyy Eszett."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-SPELL-07",
        "evidenceRole": "practice",
        "prompt": "Mikä on oppikirjan harjoituksessa oikea muoto?",
        "options": [
          {
            "id": "a",
            "label": "heisst",
            "wrongFeedback": "Sveitsissä ss-muoto voi olla käytössä, mutta tässä opetellaan heißt."
          },
          {
            "id": "b",
            "label": "heißst",
            "wrongFeedback": "ß:n jälkeen ei lisätä tähän sanaan toista s:ää."
          },
          {
            "id": "c",
            "label": "heißt"
          }
        ],
        "correctOption": "c",
        "success": "Heißt on tässä käytetty yleissaksan kirjoitusasu.",
        "hint": "Etsi ß ilman ylimääräistä s:ää.",
        "reteach": "Heißt on tässä käytetty yleissaksan kirjoitusasu. Etsi ß ilman ylimääräistä s:ää.",
        "genericWrong": "Tarkista, onko merkki, sana ja käyttötarkoitus sama. Etsi ß ilman ylimääräistä s:ää."
      }
    },
    {
      "id": "source",
      "kind": "book",
      "phase": "Kirjoitusasu ja lähteet",
      "title": "Katso C07:n kielioppisivu",
      "paragraphs": [
        "Lue C07:n kielioppisivulta erot ä, ö, ü ja ß sekä malli Wie schreibt man das? Bitte buchstabieren Sie.",
        "Kertaa että nimi Uwe kirjoitetaan W:llä, vaikka sen ääntäminen ei vastaa suoraan suomalaisen lukijan arvausta."
      ],
      "bookLinks": [
        {
          "chapterId": "07",
          "section": "grammar",
          "label": "C07 · Aakkoset ja kirjoitusasu",
          "instruction": "Lue erikoismerkeistä ja fraaseista."
        },
        {
          "chapterId": "07",
          "section": "vocabulary",
          "label": "C07 · Sanasto",
          "instruction": "Kertaa bitte, buchstabieren ja nochmal/noch einmal."
        }
      ]
    },
    {
      "id": "practice",
      "kind": "book",
      "phase": "Kirjan tehtävät",
      "title": "Tee neljä kirjan oikeaa kirjoitustehtävää",
      "paragraphs": [
        "Tee C07-EX-08 (Leo), EX-09 (heißt), EX-14 (buchstabieren) ja EX-15 (einmal).",
        "Tehtävät 14 ja 15 ovat täydentämistehtäviä. Täydennä puuttuva sana itse ja tarkista vasta oman yrityksen jälkeen. Opettaja ei lisää erillistä vastauksia tallentavaa järjestelmää."
      ],
      "bookLinks": [
        {
          "chapterId": "07",
          "section": "practice",
          "label": "C07 · Harjoitukset 08, 09, 14 ja 15",
          "instruction": "Vastaa neljään kirjan omaan tehtävään."
        }
      ]
    },
    {
      "id": "textb",
      "kind": "book",
      "phase": "Aakkostuki",
      "title": "Text B:n aakkosäänite: tekstitehtävä kyllä, kuunteluarvosana ei",
      "paragraphs": [
        "Avaa C07:n Text B. Kirjan tekstisivulla on LOS!:n oma aakkosrivi A–Z sekä Ä Ö Ü ß; se ei ole äänitteen sanatarkaksi vahvistettu litteraatti.",
        "Tee kirjainrivin perusteella tehtävät C07-TEXTB-Q01 (saksan erikoismerkki) ja C07-TEXTB-Q04 (kohtelias tavaamispyyntö). Tarkista molemmat erikseen.",
        "Äänen voi yrittää toistaa valinnaisesti, mutta sen puuttuminen ei estä tämän tunnin tehtäviä. Älä merkitse kuuntelua automaattisesti suoritetuksi."
      ],
      "bookLinks": [
        {
          "chapterId": "07",
          "section": "text-b",
          "label": "C07 · Text B · kirjainrivi ja kaksi tekstitehtävää",
          "instruction": "Tarkista C07-TEXTB-Q01 ja C07-TEXTB-Q04 ilman kuuntelupakkoa."
        }
      ]
    },
    {
      "id": "independent",
      "kind": "question",
      "phase": "Itsenäinen harjoitus",
      "title": "Kirjoita puuttuva kohtelias sana",
      "paragraphs": [
        "Peitä mallilause. Kirjoita vain saksankielinen sana, joka tarkoittaa tavaamista tässä kohteliaassa pyynnössä."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-SPELL-07",
        "evidenceRole": "independent",
        "prompt": "Täydennä: Bitte ____ Sie.",
        "accepted": [
          "buchstabieren"
        ],
        "success": "Buchstabieren on oikea sana.",
        "hint": "Sanassa on pitkä loppu -ieren.",
        "reteach": "Buchstabieren on oikea sana. Sanassa on pitkä loppu -ieren.",
        "genericWrong": "Muista virallinen alkuperäinen kirjoitusasu. Sanassa on pitkä loppu -ieren.",
        "wrongAnswers": {
          "buchstabieren sie": "Täydennä vain puuttuva sana buchstabieren.",
          "buchstabier": "Tähän kohteliaaseen fraasiin kuuluu buchstabieren."
        }
      }
    },
    {
      "id": "application",
      "kind": "question",
      "phase": "Soveltaminen",
      "title": "Pyydä toistamaan, kun et kuullut",
      "paragraphs": [
        "Kuvitteellinen henkilö tavaa nimen liian nopeasti. Et halua nyt kysyä ikää tai kotimaata, vaan pyytää uudelleen."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-SPELL-07",
        "evidenceRole": "application",
        "prompt": "Mikä on lyhyt kohtelias toistopyyntö?",
        "options": [
          {
            "id": "a",
            "label": "Noch einmal, bitte."
          },
          {
            "id": "b",
            "label": "Wie alt bist du?",
            "wrongFeedback": "Tämä kysyy ikää eikä pyydä toistoa."
          },
          {
            "id": "c",
            "label": "Ich komme aus Finnland.",
            "wrongFeedback": "Tämä kertoo lähtömaasta, ei pyydä toistamaan."
          }
        ],
        "correctOption": "a",
        "success": "Noch einmal, bitte. tarkoittaa vielä kerran, kiitos.",
        "hint": "Etsi ilmaus, jossa on einmal.",
        "reteach": "Noch einmal, bitte. tarkoittaa vielä kerran, kiitos. Etsi ilmaus, jossa on einmal.",
        "genericWrong": "Tarkista, onko merkki, sana ja käyttötarkoitus sama. Etsi ilmaus, jossa on einmal."
      }
    },
    {
      "id": "activity",
      "kind": "activity",
      "phase": "Oma harjoittelu",
      "title": "Harjoittele kuusi tavallista kirjoitusmerkkiä",
      "paragraphs": [
        "Kirjoita ilman mallia sana München, muoto heißt sekä nimi Uwe. Tarkista vasta niiden jälkeen ü, ß ja W.",
        "Harjoittele myös Noch einmal, bitte. ja Bitte buchstabieren Sie. ääneen tai kirjoitettuna. Itsearviomerkintä ei todista puhetta oikein ääntyneeksi."
      ],
      "activityId": "activity-L038",
      "activityLabel": "Harjoittelin erikoismerkkejä ja toisto-/tavaamispyyntöä"
    },
    {
      "id": "exit",
      "kind": "question",
      "phase": "Lopputarkistus",
      "title": "Mikä on aakkostallenteen raja?",
      "paragraphs": [
        "Muista vielä lähteen ja oman oppikirjalistan olennainen ero."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-SPELL-07",
        "evidenceRole": "exit",
        "prompt": "Mikä väite C07:n Text B:stä on oikein?",
        "options": [
          {
            "id": "a",
            "label": "Oppikirjan kirjainrivi on tarkistettu audion sanatarkka litteraatti.",
            "wrongFeedback": "Litteraatin tarkkuutta ja lausuntajärjestystä ei ole vahvistettu."
          },
          {
            "id": "b",
            "label": "Text B:tä voi käyttää kirjoitusmerkkeihin perustuvissa tehtävissä, mutta se ei yksin todista kuullunymmärtämistä."
          },
          {
            "id": "c",
            "label": "Äänite pisteyttää omaa ääntämistäni automaattisesti.",
            "wrongFeedback": "Sovellus ei automaattisesti arvioi ääntämistä tämän materiaalin perusteella."
          }
        ],
        "correctOption": "b",
        "success": "Tekstiharjoitukset eivät anna automaattista kuuntelu- tai ääntämispistettä.",
        "hint": "Erottele lähdeäänite ja LOS!:n tukikirjainrivi.",
        "reteach": "Tekstiharjoitukset eivät anna automaattista kuuntelu- tai ääntämispistettä. Erottele lähdeäänite ja LOS!:n tukikirjainrivi.",
        "genericWrong": "Tarkista, onko merkki, sana ja käyttötarkoitus sama. Erottele lähdeäänite ja LOS!:n tukikirjainrivi."
      }
    },
    {
      "id": "summary",
      "kind": "summary",
      "phase": "Yhteenveto",
      "title": "Opit kirjoitusasun ja pyyntöjen erot",
      "paragraphs": [
        "Olet harjoitellut yleissaksan kirjoitusasua heißt, sanan München ü-kirjainta sekä kohteliaita pyyntöjä tavaamiseen ja toistamiseen.",
        "Kirjan neljä kirjoitustehtävää ja kaksi Text B -kirjainharjoitusta tallentuvat normaalisti. Niiden onnistuminen ei kerro, toimiko aakkosäänite tai miten itse ääntäisit kirjaimet.",
        "L039:ssä sovellat taitoa kahdeksan kuvitteellisen nimen ja neljän erillisen numerorivin avulla."
      ]
    }
  ]
};
