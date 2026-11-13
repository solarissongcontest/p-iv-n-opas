import { losExercisesFor } from "../exerciseBank.ts";
import type { TeacherLesson } from "./engine.ts";
/** C06 L035: reuse actual full 20-item C06 chapter exam and saved attempt history. */
const C06_TEST_IDS=losExercisesFor("06").map(item=>item.id);
export const LOS1_L035_TEACHER: TeacherLesson = {
  "id": "L035",
  "bookId": 1,
  "chapterId": "06",
  "version": "2.0.0-preview.1",
  "title": "Harjoittele ja testaa C06",
  "objective": "Kertaan lukusanat 0–100, teen kaksi kuvitteellista ikäkeskustelua, palautan kirjan oikean 20 tehtävän C06-kappaletestin ja arvioin oman oppimiseni.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredActivityIds": [
    "age-materials-reviewed"
  ],
  "requiredPracticeIds": [],
  "chapterAssessment": {
    "requiredTestIds": C06_TEST_IDS,
    "requireApplicationDraft": true,
    "minSelfAssessmentLength": 15
  },
  "scenes": [
    {
      "id": "welcome",
      "kind": "introduction",
      "phase": "Aloitus",
      "title": "Viimeinen C06-tunti yhdistää kaiken",
      "paragraphs": [
        "Kertaat lukuja nollasta sataan, erityisesti elf, zwölf, sechzehn, siebzehn, einundzwanzig ja dreißig. Harjoittelet myös Wie alt bist du? -kysymystä.",
        "Teet kaksi lyhyttä ikäkeskustelua kuvitteellisten ihmisten välillä ja suoritat kirjan oikean 20 tehtävän kappaletestin. Opettaja ei tee toista koetta tai lisäpisteytystä.",
        "C06:n alkuperäisen Text A:n kieli- ja audiotarkistus on erillinen julkaisuvaatimus. Tunnin suoritus ei väitä, että kaikki julkaisuportit olisivat jo hyväksyttyjä."
      ]
    },
    {
      "id": "recall",
      "kind": "question",
      "phase": "Muistelu",
      "title": "Mikä sana tarkoittaa numeroa 17?",
      "paragraphs": [
        "Aloita pienellä muistiharjoituksella. Seitsemän on sieben, mutta seitsemäntoista kirjoitetaan lyhyemmin."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-NUM-06",
        "evidenceRole": "practice",
        "prompt": "Valitse 17:n oikea kirjoitusasu.",
        "options": [
          {
            "id": "a",
            "label": "siebenzehn",
            "wrongFeedback": "Siebzehn on lyhennetty muoto, ei siebenzehn."
          },
          {
            "id": "b",
            "label": "siebzehn"
          },
          {
            "id": "c",
            "label": "sechzehn",
            "wrongFeedback": "Sechzehn on 16, ei 17."
          }
        ],
        "correctOption": "b",
        "success": "Siebzehn tarkoittaa seitsemäätoista.",
        "hint": "Muista poistaa -en ennen zehn-sanaa.",
        "reteach": "Siebzehn tarkoittaa seitsemäätoista. Muista poistaa -en ennen zehn-sanaa.",
        "genericWrong": "Pohdi opetettua fraasia tai lukusanarakenne uudelleen. Muista poistaa -en ennen zehn-sanaa."
      }
    },
    {
      "id": "explain",
      "kind": "explanation",
      "phase": "Kertaus",
      "title": "Neljä tarkistusta ennen koetta",
      "paragraphs": [
        "Tarkista 1: poikkeukset elf = 11 ja zwölf = 12. Älä kirjoita einszehn tai zweizehn.",
        "Tarkista 2: kirjoita sechzehn = 16 ja siebzehn = 17 ilman ylimääräisiä kirjaimia.",
        "Tarkista 3: luvut 21–99 rakentuvat yleensä muodossa ykköset + und + kymmenet. Einundzwanzig = 21 ja zweiunddreißig = 32. Erikoismerkki ß kuuluu sanaan dreißig.",
        "Tarkista 4: ikä kysytään Wie alt bist du? ja oma ikä kerrotaan Ich bin ... Jahre alt. Älä muodosta iän ilmausta haben-verbillä.",
        "Kaikkia C06:n Text A:n muotoja (seid ihr, wir sind, ist er) ei tarvitse osata vielä itse taivuttaa. Ne ovat lähteessä tunnistettavia lisärakenteita."
      ],
      "help": [
        {
          "title": "Miksi 16 ja 17 eroavat?",
          "body": "16 = sechzehn (sechs lyhenee sech-), 17 = siebzehn (sieben lyhenee sieb-). Kirjoita kumpikin muoto rauhassa."
        },
        {
          "title": "Mistä tunnistan 21:n?",
          "body": "21 = einundzwanzig, vaikka yksin seisova yksi on eins. Yhdistä ein, und ja zwanzig yhdeksi sanaksi."
        },
        {
          "title": "Miten kysyn ikää?",
          "body": "Wie alt bist du? Vastauksessa käytetään Ich bin ... Jahre alt. Esimerkin iän saa keksiä, oikeaa ikääsi ei kysytä."
        }
      ]
    },
    {
      "id": "board",
      "kind": "board",
      "phase": "Opetustaulu",
      "title": "Kokoa koetta edeltävä tiivistelmä",
      "paragraphs": [
        "Avaa ja vertaa kunkin pääkohdan esimerkkiä. Sulje taulu ennen itsenäistä lukusanan kirjoittamista."
      ],
      "board": [
        {
          "label": "Poikkeus 11–12",
          "german": "elf · zwölf",
          "meaning": "Yksitoista ja kaksitoista."
        },
        {
          "label": "Poikkeus 16–17",
          "german": "sechzehn · siebzehn",
          "meaning": "Kuusitoista ja seitsemäntoista."
        },
        {
          "label": "Kymmenluvut",
          "german": "zwanzig · dreißig · neunzig",
          "meaning": "20, 30 ja 90."
        },
        {
          "label": "Yhdyssana",
          "german": "einundzwanzig",
          "meaning": "21: yksi ja kaksikymmentä."
        },
        {
          "label": "Ikäkysymys",
          "german": "Wie alt bist du?",
          "meaning": "Kuinka vanha olet?"
        },
        {
          "label": "Ikävastaus",
          "german": "Ich bin zwanzig Jahre alt.",
          "meaning": "Olen 20-vuotias. Kuvitteellinen esimerkki."
        }
      ]
    },
    {
      "id": "guided",
      "kind": "question",
      "phase": "Ohjattu harjoitus",
      "title": "Tunnista oikea ikälause",
      "paragraphs": [
        "Kuvitteellinen Lena kertoo olevansa 20-vuotias. Valitse oikea saksan rakenne."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-NUM-06",
        "evidenceRole": "practice",
        "prompt": "Miten Lena vastaa omaan ikäänsä?",
        "options": [
          {
            "id": "a",
            "label": "Ich bin zwanzig Jahre alt."
          },
          {
            "id": "b",
            "label": "Ich habe zwanzig Jahre alt.",
            "wrongFeedback": "Ikä ilmaistaan sein-verbillä bin, ei habe-verbillä."
          },
          {
            "id": "c",
            "label": "Du bin zwanzig Jahre alt.",
            "wrongFeedback": "Du tarkoittaa sinä, mutta Lena kertoo itsestään sanalla Ich."
          }
        ],
        "correctOption": "a",
        "success": "Oikein. Ich bin zwanzig Jahre alt.",
        "hint": "Aloita Ich bin.",
        "reteach": "Oikein. Ich bin zwanzig Jahre alt. Aloita Ich bin.",
        "genericWrong": "Pohdi opetettua fraasia tai lukusanarakenne uudelleen. Aloita Ich bin."
      }
    },
    {
      "id": "sources",
      "kind": "book",
      "phase": "Alkuperäistekstit",
      "title": "Kertaa myös C06:n kaksi eri lähdeaineistoa",
      "paragraphs": [
        "C06:n oma uusi Text A sisältää neljä dialogia ja 12 repliikkiä. Franzin ja Jörgin aiempi 8 repliikin keskustelu on saman sivun erillisessä avattavassa kertausosiossa.",
        "C06:n ymmärtämistehtävissä on kaksi erillistä ryhmää: uuden C06-tekstin ZPE-tehtävät ja C01-kertauksen SOURCE-tehtävät. Ne eivät ole varsinainen 20 pisteen kappaletesti.",
        "Äänitteiden teknistä toimivuutta ja niiden vaatimusten täyttymistä ei ole vahvistettu. Tee luetun ymmärtämistä näkyvän tekstin perusteella."
      ],
      "bookLinks": [
        {
          "chapterId": "06",
          "section": "text",
          "label": "C06 · Kaksi erillistä lukutekstiä",
          "instruction": "Kertaa uuden Text A:n 12 repliikkiä ja vanha Franz–Jörg-dialogi."
        },
        {
          "chapterId": "06",
          "section": "understand",
          "label": "C06 · Tekstinymmärtäminen",
          "instruction": "Kertaa valmiit luetun ymmärtämisen kysymykset."
        }
      ],
      "activityId": "age-materials-reviewed",
      "activityLabel": "Kertasin numerot ja ikätekstit"
    },
    {
      "id": "practice",
      "kind": "book",
      "phase": "Kirjan harjoittelu",
      "title": "Harjoittele numerot kirjan oikealla sivulla",
      "paragraphs": [
        "Avaa C06:n Harjoittele-sivu ja kertaa luvut, jotka ovat sinulle vielä vaikeita. Kirjan 20 tehtävää eivät muutu tämän tunnin erillisiksi harjoituksiksi tai piilokokeeksi.",
        "Jos C06-EX-09, EX-10 tai EX-15 tuntui vaikealta, palaa erityisesti lukujen 16, 17 ja 32 rakenteisiin."
      ],
      "bookLinks": [
        {
          "chapterId": "06",
          "section": "practice",
          "label": "C06 · 20 oikeaa numeroharjoitusta",
          "instruction": "Kertaa vaikeat luvut ennen kokeen aloittamista."
        }
      ]
    },
    {
      "id": "independent",
      "kind": "question",
      "phase": "Itsenäinen muistaminen",
      "title": "Kirjoita kolmekymmentä ilman taulua",
      "paragraphs": [
        "Kirjoita yksi tarkasti opeteltu lukusana. Tätä ei tarvitse osata ääntää automaattiselle mikrofoniarvioinnille."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-NUM-06",
        "evidenceRole": "independent",
        "prompt": "Kirjoita saksaksi luku 30.",
        "accepted": [
          "dreißig"
        ],
        "success": "Dreißig on 30.",
        "hint": "Sana alkaa drei ja sisältää ß-kirjaimen.",
        "reteach": "Dreißig on 30. Sana alkaa drei ja sisältää ß-kirjaimen.",
        "genericWrong": "Tarkista lukusanan oikea kirjoitusasu. Sana alkaa drei ja sisältää ß-kirjaimen.",
        "wrongAnswers": {
          "dreizig": "Oikea sana on dreißig, jossa näkyy ß.",
          "dreissig": "Kirjan opetettu saksalainen kirjoitusasu on dreißig."
        }
      }
    },
    {
      "id": "application",
      "kind": "question",
      "phase": "Soveltaminen",
      "title": "Valitse ikä omalle kuvitteelliselle henkilölle",
      "paragraphs": [
        "Kuvitteellinen Jonas vastaa olevansa 17-vuotias. Valitse juuri hänen omaa ikäänsä kuvaava lause."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-NUM-06",
        "evidenceRole": "application",
        "prompt": "Mikä vastaa tilanteeseen?",
        "options": [
          {
            "id": "a",
            "label": "Du bist siebzehn.",
            "wrongFeedback": "Tämä sanoisi sinä olet, mutta Jonas kertoo omasta iästään."
          },
          {
            "id": "b",
            "label": "Ich bin siebzig Jahre alt.",
            "wrongFeedback": "Siebzig on 70, ei 17."
          },
          {
            "id": "c",
            "label": "Ich bin siebzehn Jahre alt."
          }
        ],
        "correctOption": "c",
        "success": "Oikein. Ich bin siebzehn Jahre alt.",
        "hint": "Luku 17 on siebzehn.",
        "reteach": "Oikein. Ich bin siebzehn Jahre alt. Luku 17 on siebzehn.",
        "genericWrong": "Pohdi opetettua fraasia tai lukusanarakenne uudelleen. Luku 17 on siebzehn."
      }
    },
    {
      "id": "apply",
      "kind": "book",
      "phase": "Omat keskustelut",
      "title": "Kirjoita kaksi kokonaiseksi rakennettua ikäkeskustelua",
      "paragraphs": [
        "Avaa C06:n Sovella-sivu. Kirjoita kaksi erillistä, lyhyttä keskustelua kuvitteellisten ihmisten välillä: Mia kysyy Maxin ikää (17), ja Lena kysyy Jonasin ikää (20).",
        "Kummassakin pitäisi olla Wie alt bist du? ja vastaus Ich bin ... Jahre alt. Älä käytä oikeita nimiäsi, syntymäaikaasi tai puhelinnumeroita.",
        "Opettaja tarkistaa vain, että oma soveltamisteksti on tallessa. Sen laatua ei pisteytetä automaattisesti."
      ],
      "bookLinks": [
        {
          "chapterId": "06",
          "section": "apply",
          "label": "C06 · Sovella · kaksi ikädialogia",
          "instruction": "Kirjoita kaksi kuvitteellista ikäkeskustelua ja tallenna oma sovellus."
        }
      ]
    },
    {
      "id": "testguide",
      "kind": "explanation",
      "phase": "Koetta ennen",
      "title": "Miten 20 kohdan kappaletesti toimii?",
      "paragraphs": [
        "C06:n varsinainen kappaletesti käyttää kirjan nykyistä 20 kohdan C06-EX-tehtäväpankkia. Vastausten tarkistus ja pistemäärä kuuluvat kokeeseen, eivät Teacher Playeriin.",
        "Kirja avaa oikeat ratkaisut vasta kun olet vastannut kaikkiin 20 osatehtävään ja palauttanut testin.",
        "Jos päätät uusia testin, vanha palautettu yritys arkistoidaan ennen vastausten tyhjentämistä. Älä käytä Tyhjennä-toimintoa koehistorian poistamiseen; sitä ei tehdä tässä tunnissa.",
        "Kappaletesti arvioi numeroiden ja fraasien tunnistamista ja kirjoittamista. Se ei automaattisesti arvioi ääntämistä, suullista keskustelua eikä uuden lähdetekstin julkaisulaatua."
      ],
      "help": [
        {
          "title": "Mitä jos saan väärän vastauksen?",
          "body": "Kappaletesti paljastaa palauttamisen jälkeen oikeat vastaukset ja perustelut. Tulos on muoto- ja fraasiharjoitusta, ei koko kielitaidon lopullinen arvosana."
        },
        {
          "title": "Miksi palautus pitää tehdä?",
          "body": "Pelkkä tekstin avaaminen ei ole koesuoritus. Oikea palautusmerkintä syntyy kirjan testisivun Palauta testi -painikkeesta."
        }
      ]
    },
    {
      "id": "exam",
      "kind": "book",
      "phase": "Oikea C06-kappaletesti",
      "title": "Palauta oikea C06:n 20 tehtävän testi",
      "paragraphs": [
        "Siirry C06:n Kappaletesti-sivulle ja vastaa kaikkiin 20 oikeaan osatehtävään. Palauta koe vasta kun olet tehnyt oman yrityksesi.",
        "Opettajan yhteenveto lukee vain nykyisen kokeen 20 vastattua tehtävää ja kirjan palautusajan. Se ei kopioi, keksi tai muokkaa historiallisia pisteitä."
      ],
      "bookLinks": [
        {
          "chapterId": "06",
          "section": "test",
          "label": "C06 · Kappaletesti · 20 osatehtävää",
          "instruction": "Täytä ja palauta kirjan varsinainen 20 tehtävän numerokoe."
        }
      ]
    },
    {
      "id": "reflection",
      "kind": "book",
      "phase": "Oma itsearviointi",
      "title": "Kirjoita oma havainto oppimisestasi",
      "paragraphs": [
        "Kappaletestin palautuksen jälkeen kirja avaa itsearvioinnin. Kirjoita vähintään 15 merkkiä siitä, mitä osasit ja mikä lukusana tai ikäfraasi vaatii vielä harjoittelua.",
        "Opettajan merkintä vaatii lisäksi C06:n Sovella-sivulla tallennetut kaksi ikäkeskustelua. Ne eivät anna automaattisia lisäpisteitä kappaletestiin."
      ],
      "bookLinks": [
        {
          "chapterId": "06",
          "section": "test",
          "label": "C06 · Kappaletestin itsearviointi",
          "instruction": "Kirjoita oma havainto sekä tarkista että koe on palautettu."
        },
        {
          "chapterId": "06",
          "section": "apply",
          "label": "C06 · Oma ikädialogi",
          "instruction": "Varmista, että kaksi kuvitteellista ikäkeskustelua on tallessa."
        }
      ]
    },
    {
      "id": "exit",
      "kind": "question",
      "phase": "Lopputarkistus",
      "title": "Mitä tiedämme kokeen pistemäärästä?",
      "paragraphs": [
        "Varmista viimeiseksi, ettet pidä 20 numerokysymystä puheen tai kaikkien lähdeaineistojen kokonaisarvosanana."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-NUM-06",
        "evidenceRole": "exit",
        "prompt": "Mikä on oikein C06:n kokeesta?",
        "options": [
          {
            "id": "a",
            "label": "20 numerotehtävän tulos todistaa, että ääntäminen on oikein.",
            "wrongFeedback": "Ääntämistä tai kuuntelua ei arvioida automaattisesti tässä numerokokeessa."
          },
          {
            "id": "b",
            "label": "20 tehtävän koe arvioi kirjan lukusana- ja ikäfraasiharjoituksia, ja oma dialogi arvioidaan erikseen."
          },
          {
            "id": "c",
            "label": "Opettajatunti voi korvata kirjan kokeen ja antaa siitä itse pisteet.",
            "wrongFeedback": "Oikea koesuoritus syntyy vain kirjan omalla testisivulla."
          }
        ],
        "correctOption": "b",
        "success": "Juuri näin. Kappaletesti ja oma dialogi ovat eri asioita.",
        "hint": "Erota automaattiset kirjatehtävät omasta viestintäharjoittelusta.",
        "reteach": "Juuri näin. Kappaletesti ja oma dialogi ovat eri asioita. Erota automaattiset kirjatehtävät omasta viestintäharjoittelusta.",
        "genericWrong": "Pohdi opetettua fraasia tai lukusanarakenne uudelleen. Erota automaattiset kirjatehtävät omasta viestintäharjoittelusta."
      }
    },
    {
      "id": "summary",
      "kind": "summary",
      "phase": "Yhteenveto",
      "title": "C06:n opiskelu on koottu yhteen",
      "paragraphs": [
        "Osaat nyt perustella saksan lukujen 0–100 rakennetta ja käyttää yksinkertaisia ikäkysymyksiä kuvitteellisissa tilanteissa.",
        "Opetustilan läpikäynti edellyttää jokaista opetustilannetta, oikeaa palautettua 20 osatehtävän koetta, kahta tallennettua ikäkeskustelua ja omaa itsearviota. Se ei edellytä täydellisiä koepisteitä.",
        "C06:n Text A:n kielellinen lopputarkistus sekä audio- ja laitetestaus jäävät itsenäisiksi julkaisuporteiksi. L036:ssa siirryt aakkosten ja tavaamisen harjoitteluun."
      ]
    }
  ]
};
