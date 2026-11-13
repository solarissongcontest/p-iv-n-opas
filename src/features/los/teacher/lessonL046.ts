import type { TeacherLesson } from "./engine.ts";
/** C09 authentic text and writing-only evidence; no audio playback is automatically certified. */
export const LOS1_L046_TEACHER: TeacherLesson = {
  "id": "L046",
  "bookId": 1,
  "chapterId": "09",
  "version": "2.0.0-preview.1",
  "title": "Viikonpäivät",
  "objective": "Tunnistan seitsemän saksalaista viikonpäivää, opin am Montag -ilmauksen, luen alkuperäisen viikonpäiväluettelon ja tarkistan kaksi aitoa esikysymystä.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredActivityIds": [
    "c09-teacher-L046"
  ],
  "requiredPracticeIds": [
    "C09-EX-01",
    "C09-EX-02",
    "C09-EX-03"
  ],
  "requiredCheckedIds": [
    "C09-TEXTB-Q01",
    "C09-TEXTB-Q02"
  ],
  "scenes": [
    {
      "id": "welcome",
      "kind": "introduction",
      "title": "Seitsemän päivää ja kaksi tavallista kysymystä",
      "phase": "Aloitus",
      "paragraphs": [
        "C09 aloittaa saksan viikonpäivistä Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag ja Sonntag. Tässä vaiheessa tarvitset päivien oikeat nimet ja alkeisilmaisun am Montag.",
        "Tämä tunti käyttää kirjan oikeita C09-EX-01–03-tehtäviä sekä kahta Text B:n luetteloon perustuvaa kysymystä. Äänen avaamista ei voi todentaa, joten kaikki tehtävät voi tehdä näkyvästä tekstistä.",
        "Opintopolun lähdesuunnitelma mainitsee viikonpäivä-äänelle M-DIB-05:n, mutta nykyisen kirjan Text B on M-COM-07. Tämä oppitunti käyttää nykyistä todellista tekstilähdettä. Lähdevalinta vaatii erillisen toimituksellisen hyväksynnän."
      ]
    },
    {
      "id": "recall",
      "kind": "question",
      "title": "Tunnistatko maanantain?",
      "phase": "Muistelu",
      "paragraphs": [
        "Tarkista ensin yksi viikon tuttu sana."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-TIME-09",
        "evidenceRole": "practice",
        "prompt": "Mikä saksalainen viikonpäivä on maanantai?",
        "options": [
          {
            "id": "a",
            "label": "Montag"
          },
          {
            "id": "b",
            "label": "Dienstag",
            "wrongFeedback": "Dienstag tarkoittaa tiistaita."
          },
          {
            "id": "c",
            "label": "Sonntag",
            "wrongFeedback": "Sonntag on sunnuntai."
          }
        ],
        "correctOption": "a",
        "success": "Montag tarkoittaa maanantaita.",
        "hint": "Mon- auttaa muistamaan maanantain.",
        "reteach": "Montag tarkoittaa maanantaita. Mon- auttaa muistamaan maanantain.",
        "genericWrong": "Vertaa tilannetta ja oikeaa ajanilmausta. Mon- auttaa muistamaan maanantain."
      }
    },
    {
      "id": "explain",
      "kind": "explanation",
      "title": "Viikonpäivät ovat saksassa substantiiveja",
      "phase": "Selitys",
      "paragraphs": [
        "Viikonpäivät kirjoitetaan saksaksi isolla alkukirjaimella: Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag ja Sonntag. Myös viikonpäivän sisältävässä lauseessa kirjoitetaan Montag, ei montag.",
        "Seitsemän päivän luettelo luetaan ensin järjestyksessä. Montag on maanantai, Dienstag tiistai, Mittwoch keskiviikko, Donnerstag torstai, Freitag perjantai, Samstag lauantai ja Sonntag sunnuntai.",
        "Kun haluat sanoa maanantaina, käytä kiinteää alkeisilmausta am Montag. Sitä ei tarvitse tässä pilkkoa koko prepositiokieliopiksi. Kellonajan edellä käytetään eri sanaa: um.",
        "Suomen ja saksan viikkokalenterissa käytetään maanantaina alkavaa viikkoa. Tässä emme vielä opettele tarkkoja päivämääriä tai ajanilmausten sijamuotoja.",
        "Text B:ssä näkyvä seitsemän viikonpäivän luettelo on yhden alkuperäisen noin 15 sekunnin äänitteen kirjallinen sisältö. Se ei ole seitsemän repliikin keskustelu."
      ],
      "help": [
        {
          "title": "Miksi Montag kirjoitetaan isolla?",
          "body": "Saksassa viikonpäivät ovat substantiiveja. Kirjoita esimerkiksi am Montag, am Freitag ja am Sonntag."
        },
        {
          "title": "Miten erotan Donnerstag ja Dienstag?",
          "body": "Dienstag = tiistai, Donnerstag = torstai. Vertaa niissä kirjainrunkoja Dienst- ja Donner-."
        },
        {
          "title": "Mitä am tarkoittaa tässä?",
          "body": "Se ilmaisee viikonpäivän yhteydessä ajankohtaa: am Montag = maanantaina. Älä sekoita kellonaikaan um drei Uhr."
        },
        {
          "title": "Pitääkö kuunnella viikonpäivä-ääni?",
          "body": "Ei suoritusvaatimuksena. Teksti on näkyvissä. Äänitteen toimivuutta ja suunnitelman M-DIB-05:n ja toteutuksen M-COM-07:n eroa ei ole julkaisuportissa hyväksytty."
        }
      ]
    },
    {
      "id": "board",
      "kind": "board",
      "title": "Lue viikko maanantaista sunnuntaihin",
      "phase": "Opetustaulu",
      "paragraphs": [
        "Lue ensin päiväryhmät, peitä ne ja sano ne muistista. Päivien tunnistusta voi harjoitella pelkällä tekstillä."
      ],
      "board": [
        {
          "label": "1–2",
          "german": "Montag · Dienstag",
          "meaning": "Maanantai ja tiistai."
        },
        {
          "label": "3–4",
          "german": "Mittwoch · Donnerstag",
          "meaning": "Keskiviikko ja torstai."
        },
        {
          "label": "5–6",
          "german": "Freitag · Samstag",
          "meaning": "Perjantai ja lauantai."
        },
        {
          "label": "7",
          "german": "Sonntag",
          "meaning": "Sunnuntai."
        },
        {
          "label": "Milloin?",
          "german": "Wann?",
          "meaning": "Milloin?"
        },
        {
          "label": "Päiväilmaus",
          "german": "am Montag",
          "meaning": "Maanantaina, ei um Montag."
        }
      ]
    },
    {
      "id": "guided",
      "kind": "question",
      "title": "Viikon kolmas päivä",
      "phase": "Ohjattu harjoitus",
      "paragraphs": [
        "Tunnista viikonpäivä kalenterin järjestyksestä, älä pelkästä englannin sanasta."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-TIME-09",
        "evidenceRole": "practice",
        "prompt": "Mikä tarkoittaa keskiviikkoa?",
        "options": [
          {
            "id": "a",
            "label": "Donnerstag",
            "wrongFeedback": "Donnerstag on torstai."
          },
          {
            "id": "b",
            "label": "Mittwoch"
          },
          {
            "id": "c",
            "label": "Freitag",
            "wrongFeedback": "Freitag on perjantai."
          }
        ],
        "correctOption": "b",
        "success": "Mittwoch on keskiviikko.",
        "hint": "Mittwoch on viikon kolmas päivä.",
        "reteach": "Mittwoch on keskiviikko. Mittwoch on viikon kolmas päivä.",
        "genericWrong": "Vertaa tilannetta ja oikeaa ajanilmausta. Mittwoch on viikon kolmas päivä."
      }
    },
    {
      "id": "source",
      "kind": "book",
      "title": "Avaa alkuperäinen viikonpäivärivi kirjan sisältä",
      "phase": "Kirjan lähde",
      "paragraphs": [
        "C09:n Text B:ssä näkyy alkuperäinen Christophin nauhoittama viikonpäivien luettelo, yksi luettu kokonaisuus: Montagista Sonntagiin. Se on sanalista eikä tapahtumakertomus.",
        "Kirjan sanastosivulla on samaa sisältöä tukevia viikonpäiviä. Teksti ja tehtävät ovat luettavissa LOS!:n sisällä. Lähdelinkki on attribuutiota varten, ei tehtävään pääsemisen edellytys."
      ],
      "bookLinks": [
        {
          "chapterId": "09",
          "section": "text-b",
          "label": "C09 · Text B: Die Wochentage",
          "instruction": "Lue yksi seitsemän päivän alkuperäinen luettelo."
        },
        {
          "chapterId": "09",
          "section": "vocabulary",
          "label": "C09 · Viikonpäivät",
          "instruction": "Kertaa Montagista Sonntagiin."
        }
      ]
    },
    {
      "id": "checked",
      "kind": "book",
      "title": "Tarkista ensimmäiset kaksi oikeaa luettelokysymystä",
      "phase": "Lähdetehtävät",
      "paragraphs": [
        "Tee Text B:stä C09-TEXTB-Q01: mikä päivä tulee tiistain jälkeen? Tee myös C09-TEXTB-Q02: mikä sana on torstai?",
        "Paina kumpaakin Tarkista vastaus. Molemmat ovat luettelon lukemiseen perustuvia kysymyksiä. Pelkkä Text B -sivun avaaminen tai äänen kokeilu ei ole suoritusmerkintä."
      ],
      "bookLinks": [
        {
          "chapterId": "09",
          "section": "text-b",
          "label": "C09 · Text B:n kysymykset 1–2",
          "instruction": "Vastaa ja tarkista Q01 ja Q02."
        }
      ]
    },
    {
      "id": "practice",
      "kind": "book",
      "title": "Tee kolme oikeaa viikonpäivätehtävää",
      "phase": "Kirjan harjoitus",
      "paragraphs": [
        "C09-EX-01, EX-02 ja EX-03 kysyvät maanantain, tiistain ja keskiviikon nimet. Tee kaikki kolme kirjan Harjoittele-sivulla.",
        "Tallenna vastaukset omaan kirjan luonnokseen ja tarkista vasta oman yrityksen jälkeen."
      ],
      "bookLinks": [
        {
          "chapterId": "09",
          "section": "practice",
          "label": "C09 · Harjoitukset EX-01–03",
          "instruction": "Vastaa kolmeen viikonpäivän tunnistukseen."
        }
      ]
    },
    {
      "id": "independent",
      "kind": "question",
      "title": "Kirjoita torstai ilman mallia",
      "phase": "Itsenäinen harjoitus",
      "paragraphs": [
        "Kirjoita torstain nimi kokonaisena saksankielisenä sanana, isolla alkukirjaimella."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-TIME-09",
        "evidenceRole": "independent",
        "prompt": "Kirjoita saksaksi torstai.",
        "accepted": [
          "Donnerstag"
        ],
        "success": "Donnerstag tarkoittaa torstaita.",
        "hint": "Se alkaa Donner- ja päättyy -stag.",
        "reteach": "Donnerstag tarkoittaa torstaita. Se alkaa Donner- ja päättyy -stag.",
        "genericWrong": "Tarkista kirjoitusasu ja sanojen järjestys. Se alkaa Donner- ja päättyy -stag.",
        "wrongAnswers": {
          "dienstag": "Dienstag tarkoittaa tiistaita.",
          "donnersta": "Sanan lopussa on vielä g: Donnerstag."
        }
      }
    },
    {
      "id": "application",
      "kind": "question",
      "title": "Maanantaina vai kello maanantai?",
      "phase": "Soveltaminen",
      "paragraphs": [
        "Valitse alkeistason oikea kiinteä päiväilmaus."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-TIME-09",
        "evidenceRole": "application",
        "prompt": "Mikä tarkoittaa maanantaina?",
        "options": [
          {
            "id": "a",
            "label": "um Montag",
            "wrongFeedback": "Um on kellonajan edellä."
          },
          {
            "id": "b",
            "label": "am Montag"
          },
          {
            "id": "c",
            "label": "in Montag",
            "wrongFeedback": "Tässä käytetään am, ei in."
          }
        ],
        "correctOption": "b",
        "success": "Am Montag tarkoittaa maanantaina.",
        "hint": "Päivä = am, kello = um.",
        "reteach": "Am Montag tarkoittaa maanantaina. Päivä = am, kello = um.",
        "genericWrong": "Vertaa tilannetta ja oikeaa ajanilmausta. Päivä = am, kello = um."
      }
    },
    {
      "id": "activity",
      "kind": "activity",
      "title": "Kokeile koko viikon järjestys ilman mallia",
      "phase": "Oma harjoittelu",
      "paragraphs": [
        "Kirjoita tai sano kaikki viikonpäivät maanantaista sunnuntaihin. Tarkista vasta sen jälkeen kirjan luetteloon.",
        "Vahvista itse tekemäsi harjoitus. Äänitteen kuuntelemista tai puheen oikeellisuutta ei mitata automaattisesti."
      ],
      "activityId": "c09-teacher-L046",
      "activityLabel": "Kertasin seitsemän viikonpäivää muistista"
    },
    {
      "id": "exit",
      "kind": "question",
      "title": "Viikonpäivien kirjoitusasu",
      "phase": "Lopputarkistus",
      "paragraphs": [
        "Muista vielä, mikä sääntö toimii kaikkien viikonpäivien kohdalla."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-TIME-09",
        "evidenceRole": "exit",
        "prompt": "Mikä viikonpäivän kirjoitusasusta on oikein?",
        "options": [
          {
            "id": "a",
            "label": "Viikonpäivät ovat saksassa substantiiveja ja kirjoitetaan isolla."
          },
          {
            "id": "b",
            "label": "Viikonpäivät kirjoitetaan aina pienellä.",
            "wrongFeedback": "Saksassa substantiivina viikonpäivä alkaa isolla."
          },
          {
            "id": "c",
            "label": "Am Montag tarkoittaa kellonaikaa.",
            "wrongFeedback": "Am Montag on viikonpäivän ilmaus, ei kellonaika."
          }
        ],
        "correctOption": "a",
        "success": "Viikonpäivät kirjoitetaan isolla.",
        "hint": "Montag, Dienstag, Sonntag.",
        "reteach": "Viikonpäivät kirjoitetaan isolla. Montag, Dienstag, Sonntag.",
        "genericWrong": "Vertaa tilannetta ja oikeaa ajanilmausta. Montag, Dienstag, Sonntag."
      }
    },
    {
      "id": "summary",
      "kind": "summary",
      "title": "Viikonpäivien perustaidot käytössä",
      "phase": "Yhteenveto",
      "paragraphs": [
        "Tunnistit seitsemän viikonpäivää, lauseen am Montag ja kaksi alkuperäisen Text B:n tekstikysymystä. Kolme oikeaa kirjan harjoitusta säilyvät tallennettuina.",
        "Viikonpäiväluetteloa ei väitetä testatuksi kuullunymmärtämiseksi. L047:ssa siirrytään Franzin ja Gretan seitsemän puheenvuoron alkuperäiseen Sport und Zeit -tekstiin."
      ]
    }
  ]
};
