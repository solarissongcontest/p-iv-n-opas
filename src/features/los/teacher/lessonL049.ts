import type { TeacherLesson } from "./engine.ts";
/** C09 L049 uses actual Text B list and saved non-scored fictional week; no listening assertions. */
export const LOS1_L049_TEACHER: TeacherLesson = {
  "id": "L049",
  "bookId": 1,
  "chapterId": "09",
  "version": "2.0.0-preview.1",
  "title": "Lue ja merkitse kalenteriin",
  "objective": "Kirjoitan seitsemän kuvitteellista viikkokalenterimerkintää ja kolmen repliikin tapaamisen sekä tarkistan kaksi viikonpäiväluettelon tehtävää.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredActivityIds": [
    "c09-teacher-L049"
  ],
  "requiredPracticeIds": [
    "C09-EX-04",
    "C09-EX-05",
    "C09-EX-06"
  ],
  "requiredCheckedIds": [
    "C09-TEXTB-Q03",
    "C09-TEXTB-Q04"
  ],
  "applicationDraftMinLength": 150,
  "scenes": [
    {
      "id": "welcome",
      "kind": "introduction",
      "phase": "Opetus",
      "title": "Tee oma viikkokalenteri ja lyhyt sopiminen",
      "paragraphs": [
        "Tällä tunnilla kokoat seitsemän kuvitteellista päivämerkintää ja kolmen repliikin tapaamisen sopimisen. Et tarvitse oikeaa omaa lukujärjestystäsi tai henkilötietoja.",
        "Text B sisältää aidon Christophin viikonpäiväluettelon, yhden luetun sanalistan. Se ei ole keskustelu eikä sen äänentoistoa ole hyväksytty laitetestauksessa.",
        "Kirjan nykyinen Text B käyttää M-COM-07-lähdettä, kun varhainen lähdesuunnitelma esittää M-DIB-05:n. En väitä niitä samaksi tallenteeksi."
      ]
    },
    {
      "id": "recall",
      "kind": "question",
      "phase": "Opetus",
      "title": "Mikä on perjantai?",
      "paragraphs": [
        "Aloita ennen kalenteria yhdestä viikonpäivästä."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-TIME-09",
        "evidenceRole": "practice",
        "prompt": "Mikä on perjantai saksaksi?",
        "options": [
          {
            "id": "a",
            "label": "Donnerstag",
            "wrongFeedback": "Donnerstag on torstai."
          },
          {
            "id": "b",
            "label": "Freitag"
          },
          {
            "id": "c",
            "label": "Sonntag",
            "wrongFeedback": "Sonntag on sunnuntai."
          }
        ],
        "correctOption": "b",
        "success": "Freitag on perjantai.",
        "hint": "Freitag seuraa Donnerstagia.",
        "reteach": "Freitag on perjantai. Freitag seuraa Donnerstagia.",
        "genericWrong": "Tarkista viikonpäivä tai kellonaika. Freitag seuraa Donnerstagia."
      }
    },
    {
      "id": "explain",
      "kind": "explanation",
      "phase": "Opetus",
      "title": "Kalenterin jokaisella rivillä on päivä ja tasatunti",
      "paragraphs": [
        "Kirjoita seitsemälle päivälle kuvitteelliset merkinnät: Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag ja Sonntag. Jokaiselle riittää tasatunti, esimerkiksi am Montag um drei Uhr.",
        "Vältä henkilötietoja: tämä ei ole oma oikea kalenterisi. Voit käyttää nimenä Mia ja Max, jotka ovat harjoitushahmoja.",
        "Tapaamisen sopiminen rakentuu kolmesta repliikistä. Ensimmäinen kysyy Wann?, toinen vastaa Am Montag um drei Uhr. ja viimeinen vahvistaa Gut, bis Montag!",
        "Käytä päivien alkukirjaimissa isoja kirjaimia ja kellonajan edessä um. Tässä ei vaadita 24 tunnin muodon kääntämistä kaikkiin puhekielen aikarakenteisiin.",
        "Tavoitteena on kaksi erilaista soveltavaa tekemistä: koko viikkokalenteri ja erillinen kolmen repliikin tapaamiskeskustelu. Ne tallennetaan saman Sovella-sivun tekstikenttään.",
        "Opettajan tallennustarkistus varmistaa vain kirjoitetun tekstin laajuuden. Seitsemän päivän oikeellisuus tarkistetaan omatoimisesti kirjan tarkistuslistalla."
      ],
      "help": [
        {
          "title": "Miten teen yhden päivän merkinnän?",
          "body": "Käytä esimerkiksi Montag – um drei Uhr. Voit myös kirjoittaa am Montag um drei Uhr. Käytä samaa mallia eri päiville."
        },
        {
          "title": "Mitä kolmessa repliikissä sanotaan?",
          "body": "Mia: Wann? Max: Am Montag um drei Uhr. Mia: Gut, bis Montag! Nämä ovat fiktiivisiä mallihahmoja."
        },
        {
          "title": "Saanko käyttää oikeaa lukujärjestystäni?",
          "body": "Ei ole tarpeen. Käytä nimenomaan kuvitteellisia kalenterimerkintöjä eikä oikeita tapaamistietoja."
        },
        {
          "title": "Miksi en saa kuuntelupisteitä?",
          "body": "Text B:n näkyvä yhden rivin viikonpäiväluettelo voidaan lukea. Äänen oikeudellinen/tekninen hyväksyntä ja kuullunymmärtämisen havainnointi ovat erillisiä."
        }
      ]
    },
    {
      "id": "board",
      "kind": "board",
      "phase": "Opetus",
      "title": "Yksi viikko ja kolme repliikkiä",
      "paragraphs": [
        "Opetustaulussa käytetään tarkoituksella valmiita tasatunteja. Älä jäljittele alkuperäisen Sport und Zeit -tekstin varttiaikaa omaan kalenteriin."
      ],
      "board": [
        {
          "label": "Maanantai",
          "german": "Montag – um drei Uhr",
          "meaning": "Kuvitteellinen merkintä kolmelta."
        },
        {
          "label": "Tiistai",
          "german": "Dienstag – um vier Uhr",
          "meaning": "Tiistai neljältä."
        },
        {
          "label": "Keskiviikko",
          "german": "Mittwoch – um fünf Uhr",
          "meaning": "Keskiviikko viideltä."
        },
        {
          "label": "Torstai ja perjantai",
          "german": "Donnerstag · Freitag",
          "meaning": "Nämä kirjoitetaan isolla."
        },
        {
          "label": "Viikonloppu",
          "german": "Samstag · Sonntag",
          "meaning": "Lauantai ja sunnuntai."
        },
        {
          "label": "Lyhyt tapaaminen",
          "german": "Wann? · Am Montag um drei Uhr. · Gut, bis Montag!",
          "meaning": "Kolme erillistä repliikkiä."
        }
      ]
    },
    {
      "id": "guided",
      "kind": "question",
      "phase": "Opetus",
      "title": "Päivän nimi ennen sunnuntaita",
      "paragraphs": [
        "Lue Text B:n yksi alkuperäinen viikonpäivärivi järjestyksessä."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-TIME-09",
        "evidenceRole": "practice",
        "prompt": "Mikä päivä on Sonntagia juuri ennen?",
        "options": [
          {
            "id": "a",
            "label": "Freitag",
            "wrongFeedback": "Freitag on perjantai, ennen lauantaita."
          },
          {
            "id": "b",
            "label": "Montag",
            "wrongFeedback": "Montag on viikon ensimmäinen päivä."
          },
          {
            "id": "c",
            "label": "Samstag"
          }
        ],
        "correctOption": "c",
        "success": "Samstag on lauantai, juuri ennen Sonntagia.",
        "hint": "Lopussa Samstag, Sonntag.",
        "reteach": "Samstag on lauantai, juuri ennen Sonntagia. Lopussa Samstag, Sonntag.",
        "genericWrong": "Tarkista viikonpäivä tai kellonaika. Lopussa Samstag, Sonntag."
      }
    },
    {
      "id": "source",
      "kind": "book",
      "phase": "Opetus",
      "title": "Lue Text B:n yksi aito viikonpäiväluettelo",
      "paragraphs": [
        "Avaa kirjan C09 Text B. Se näyttää koko seitsemän päivän aitoon äänilähteeseen liitetyn luettelon, ei seitsemää keinotekoista dialogia.",
        "Ääntä voi kokeilla vain valinnaisena tukena, mutta tämän tunnin tekeminen onnistuu kokonaan lukemalla. Äänen toistoa tai omaa puhetta ei pisteytetä."
      ],
      "bookLinks": [
        {
          "chapterId": "09",
          "section": "text-b",
          "label": "C09 · Die Wochentage, kokonainen luettelo",
          "instruction": "Lue Montagista Sonntagiin ja huomaa lähde M-COM-07."
        }
      ]
    },
    {
      "id": "checked",
      "kind": "book",
      "phase": "Opetus",
      "title": "Tarkista kaksi viimeistä aitoa Text B -kysymystä",
      "paragraphs": [
        "Tee ja tarkista kirjan Text B -tehtävät C09-TEXTB-Q03 ja C09-TEXTB-Q04. Ne kysyvät mikä päivä on ennen sunnuntaita ja mikä on saksaksi perjantai.",
        "C09-TEXTB-Q01–02 olivat L046:n esikysymyksiä. L049 käyttää kaksi erillistä jäljellä olevaa tehtävää, eikä mitään näistä merkitä automaattiseksi kuuntelun näytöksi."
      ],
      "bookLinks": [
        {
          "chapterId": "09",
          "section": "text-b",
          "label": "C09 · Text B:n kysymykset Q03 ja Q04",
          "instruction": "Vastaa ja tarkista kaksi oikeaa tekstikysymystä."
        }
      ]
    },
    {
      "id": "practice",
      "kind": "book",
      "phase": "Opetus",
      "title": "Kolme oikeaa kirjan viikonpäivätehtävää",
      "paragraphs": [
        "Tee C09-EX-04, EX-05 ja EX-06. Niissä tunnistetaan Donnerstag, Freitag ja Samstag.",
        "Vastaukset säilyvät suoraan harjoitussivun tallennuksessa. Älä muuta aikaisempia vastauksia vain siksi, että haluat suoritusmerkinnän nopeammin."
      ],
      "bookLinks": [
        {
          "chapterId": "09",
          "section": "practice",
          "label": "C09 · Harjoitukset 04–06",
          "instruction": "Tee ja tallenna kolme viikonpäivätehtävää."
        }
      ]
    },
    {
      "id": "independent",
      "kind": "question",
      "phase": "Opetus",
      "title": "Kirjoita lauantai",
      "paragraphs": [
        "Peitä viikonpäiväluettelo ja kirjoita lauantai saksaksi."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-TIME-09",
        "evidenceRole": "independent",
        "prompt": "Kirjoita saksaksi lauantai.",
        "accepted": [
          "Samstag"
        ],
        "success": "Samstag tarkoittaa lauantaita.",
        "hint": "Sana alkaa Sam- ja päättyy -tag.",
        "reteach": "Samstag tarkoittaa lauantaita. Sana alkaa Sam- ja päättyy -tag.",
        "genericWrong": "Muista am ennen viikonpäivää ja um ennen kellonaikaa. Sana alkaa Sam- ja päättyy -tag."
      }
    },
    {
      "id": "application",
      "kind": "question",
      "phase": "Opetus",
      "title": "Valitse oikein sovittu ajanilmaus",
      "paragraphs": [
        "Kuvitteellinen opiskelija kysyy Wann? Vastaa täsmällisellä päivällä ja tasatunnilla."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-TIME-09",
        "evidenceRole": "application",
        "prompt": "Mikä on luonteva vastaus kysymykseen Wann?",
        "options": [
          {
            "id": "a",
            "label": "Am Montag um drei Uhr."
          },
          {
            "id": "b",
            "label": "Um Montag am drei Uhr.",
            "wrongFeedback": "Päivän ja kellonajan prepositiot vaihtuvat väärin."
          },
          {
            "id": "c",
            "label": "Wie heißt du?",
            "wrongFeedback": "Tämä kysyy nimeä eikä vastaa milloin-kysymykseen."
          }
        ],
        "correctOption": "a",
        "success": "Am Montag um drei Uhr. kertoo ajankohdan.",
        "hint": "Viikonpäivä am, tasatunti um.",
        "reteach": "Am Montag um drei Uhr. kertoo ajankohdan. Viikonpäivä am, tasatunti um.",
        "genericWrong": "Tarkista viikonpäivä tai kellonaika. Viikonpäivä am, tasatunti um."
      }
    },
    {
      "id": "writing",
      "kind": "book",
      "phase": "Opetus",
      "title": "Tallenna seitsemän päivää ja oma kolmirepliikkinen dialogi",
      "paragraphs": [
        "Avaa C09:n Sovella-sivu. Kirjoita seitsemän kuvitteellista kalenteririviä maanantaista sunnuntaihin, kaikissa päivän nimi ja yksi tasatunti.",
        "Kirjoita kalenterin jälkeen erillinen kolmen repliikin kuvitteellinen tapaaminen. Voit käyttää nimiä Mia ja Max. Päätösfraasi voi olla Gut, bis Montag!",
        "Tallenna vähintään 150 merkkiä omaa tekstiä. Tämä varmistaa merkittävän tallennuksen, ei automaattista oikein kirjoitettujen seitsemän rivin tarkistusta. Tutki itse kirjan tarkistuslista ennen vahvistamista.",
        "Oman kalenterin, sijainnin tai todellisten tapaamisaikojen lähettämistä ei vaadita."
      ],
      "bookLinks": [
        {
          "chapterId": "09",
          "section": "apply",
          "label": "C09 · Sovella · kalenteri ja 3-repliikkinen keskustelu",
          "instruction": "Kirjoita seitsemän kuvitteellista päivää ja kolmen repliikin tapaaminen."
        }
      ]
    },
    {
      "id": "activity",
      "kind": "activity",
      "phase": "Opetus",
      "title": "Tee oikeinkirjoituksen itsearvio",
      "paragraphs": [
        "Tarkista seitsemän viikonpäivää, isot alkukirjaimet, kellonajan um sekä kolme erillistä puheenvuoroa. Korjaa tarvittaessa kirjan Sovella-sivua.",
        "Vahvista oma tarkistus. Sovellus ei väitä merkkimäärän perusteella, että jokainen rivi olisi oikein."
      ],
      "activityId": "c09-teacher-L049",
      "activityLabel": "Tarkistin koko kuvitteellisen viikon ja tapaamiskeskustelun itse"
    },
    {
      "id": "exit",
      "kind": "question",
      "phase": "Opetus",
      "title": "Mitä merkkimäärä todistaa?",
      "paragraphs": [
        "Tunnin lopussa varmistetaan, ettei tallennusmerkinnästä tehdä liian vahvaa väitettä."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-TIME-09",
        "evidenceRole": "exit",
        "prompt": "Mitä 150 merkin Sovella-teksti merkitsee?",
        "options": [
          {
            "id": "a",
            "label": "Ääntämiseni ja kuunteluni on automaattisesti hyväksytty.",
            "wrongFeedback": "Teksti ei mittaa puheen ääntämistä tai äänen kuulemista."
          },
          {
            "id": "b",
            "label": "Minulla on tallessa riittävä kirjoitusyritys; tarkistan päivänimet ja kellonajat itse."
          },
          {
            "id": "c",
            "label": "Alkuperäinen Text B on seitsemän repliikin keskustelu.",
            "wrongFeedback": "Se on yksi luettu viikonpäivien sanalista."
          }
        ],
        "correctOption": "b",
        "success": "Tallennus on näyttö tehdystä yrityksestä, ei virheettömyydestä.",
        "hint": "Käytä Sovella-sivun tarkistuslistaa.",
        "reteach": "Tallennus on näyttö tehdystä yrityksestä, ei virheettömyydestä. Käytä Sovella-sivun tarkistuslistaa.",
        "genericWrong": "Tarkista viikonpäivä tai kellonaika. Käytä Sovella-sivun tarkistuslistaa."
      }
    },
    {
      "id": "summary",
      "kind": "summary",
      "phase": "Opetus",
      "title": "Kalenteri ja tapaaminen on harjoiteltu",
      "paragraphs": [
        "Kirjoitit seitsemän kuvitteellista viikonpäivää tasatunteineen, kolmen repliikin tapaamisen ja tarkistit kaksi oikeaa Text B:n lukutehtävää.",
        "Kirjan Sovella-sivun tallennettu teksti ja C09:n tehtävämerkinnät pysyvät nykyisessä C09-luonnoksessa. Seuraavassa L050:ssa palautetaan alkuperäinen 14 tehtävän kappaletesti ja sanallinen itsearviointi."
      ]
    }
  ]
};
