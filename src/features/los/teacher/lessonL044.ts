import type { TeacherLesson } from "./engine.ts";
/** C08 authentic reading and deterministic workbook evidence. No unverified audio scoring. */
export const LOS1_L044_TEACHER: TeacherLesson = {
  "id": "L044",
  "bookId": 1,
  "chapterId": "08",
  "version": "2.0.0-preview.1",
  "title": "Harjoittele vuorovaikutusta",
  "objective": "Kirjoitan C08:n Sovella-sivulle kolme erilaista lyhyttä avunpyyntödialogia, vähintään 80 merkkiä, ja käytän kahdessa oikeassa harjoituksessa sopivia fraaseja.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredActivityIds": [
    "c08-teacher-L044"
  ],
  "requiredPracticeIds": [
    "C08-EX-07",
    "C08-EX-08"
  ],
  "requiredCheckedIds": [],
  "scenes": [
    {
      "id": "welcome",
      "kind": "introduction",
      "phase": "Aloitus",
      "title": "Nyt itse käytät saksaa, vaikka sanasto on pieni",
      "paragraphs": [
        "Tämän tunnin päätarkoitus on tuottaa kolme omaa lyhyttä luokkahuonetilannetta. Sinun ei tarvitse muodostaa pitkiä alkeistasoa vaikeampia virkkeitä.",
        "Kirjoitat tilanteet A, B ja C kirjan Sovella-sivulle: (A) et ymmärrä ohjetta, (B) pyydät toistamaan, (C) et tiedä yhden sanan merkitystä.",
        "Tallennuksen aitous tarkistetaan samasta C08-luonnoksesta; opettajatunti ei arvioi improvisoidun puheen ääntämistä eikä väitä tallennetun tekstin olevan kieliopillisesti virheetön."
      ]
    },
    {
      "id": "recall",
      "kind": "question",
      "phase": "Muistelu",
      "title": "Mikä fraasi ilmaisee, ettet ymmärrä?",
      "paragraphs": [
        "Palauta mieleen ydinlause ennen omien dialogien kirjoittamista."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-SURV-08",
        "evidenceRole": "practice",
        "prompt": "Mikä sopii, kun et ymmärrä opettajan ohjetta?",
        "options": [
          {
            "id": "a",
            "label": "Ich verstehe nicht."
          },
          {
            "id": "b",
            "label": "Wie heißt du?",
            "wrongFeedback": "Tämä kysyy nimen."
          },
          {
            "id": "c",
            "label": "Ich bin siebzehn.",
            "wrongFeedback": "Tämä kertoo iän."
          }
        ],
        "correctOption": "a",
        "success": "Ich verstehe nicht. kertoo ymmärtämisvaikeudesta.",
        "hint": "Muista nicht.",
        "reteach": "Ich verstehe nicht. kertoo ymmärtämisvaikeudesta. Muista nicht.",
        "genericWrong": "Pohdi, yritätkö ymmärtää sanan, kuulla uudelleen vai pyytää apua. Muista nicht."
      }
    },
    {
      "id": "explain",
      "kind": "explanation",
      "phase": "Opettajan selitys",
      "title": "Kolmen tilanteen oma minimidialogi",
      "paragraphs": [
        "Tilanteessa A toinen antaa ohjeen, jota et ymmärrä. Riittää oma vastauksesi Ich verstehe nicht. Voit jatkaa valmiilla pyynnöllä Bitte langsamer.",
        "Tilanteessa B et kuule lausetta. Käytä esimerkiksi Noch einmal, bitte. tai Können Sie das bitte wiederholen? ja merkitse keskusteluun kuvitteellinen lyhyt vastaus.",
        "Tilanteessa C tiedät miltä sana kuulostaa, mutta et ymmärrä sitä. Kysy Was bedeutet das? ja kirjoita kuvitteellinen opettajan tai luokkatoverin vastaus.",
        "Tee siis kolme erilaista tilannetta, älä samaa repliikkiä kolme kertaa. Valitse kummallekin henkilölle nimike kuten Schüler ja Lehrerin tai käytä merkintöjä A ja B.",
        "Fraasien sisäistä modaaliverbin taivutusta ja uusia sijamuotoja ei nyt opetella. Harjoittele lyhyttä tarkoituksenmukaista vuorovaikutusta."
      ],
      "help": [
        {
          "title": "Miten teen lyhyen dialogin?",
          "body": "Käytä kaksi tai kolme repliikkiä: A sanoo jotakin yksinkertaista, B pyytää apua, A vastaa lyhyesti. Toista kolmella erilaisella avunpyyntötavoitteella."
        },
        {
          "title": "En tiedä mitä opettaja vastaisi",
          "body": "Voit kirjoittaa vastaukseksi esimerkiksi Ja, natürlich. (Kyllä, tietysti). Omat lyhyet kuvitteelliset vastaukset ovat sallittuja; älä käytä oikeita yhteystietoja."
        },
        {
          "title": "Pitääkö vähintään 80 merkkiä tarkoittaa oikein kirjoitettua?",
          "body": "Ei. Tekstin pituus varmistaa, ettei sovellusta merkitä tehdyksi tyhjän kentän perusteella. Tarkista oikeinkirjoitus itse mallin ja sanaston avulla."
        }
      ]
    },
    {
      "id": "board",
      "kind": "board",
      "phase": "Opetustaulu",
      "title": "Kolme erilaista lyhyttä vuoropuhelua",
      "paragraphs": [
        "Mallit ovat LOS!:n itse kirjoittamia alkeistason esimerkkejä, eivät uusi autenttinen Text A -teksti."
      ],
      "board": [
        {
          "label": "A · En ymmärrä",
          "german": "Ich verstehe nicht.",
          "meaning": "Kerro, että et ymmärrä."
        },
        {
          "label": "A · Pyydä hidastamaan",
          "german": "Bitte langsamer.",
          "meaning": "Vastaa ymmärtämisvaikeuteen."
        },
        {
          "label": "B · Pyydä toistamaan",
          "german": "Noch einmal, bitte.",
          "meaning": "Haluan kuulla saman uudelleen."
        },
        {
          "label": "B · Kohteliaasti",
          "german": "Können Sie das bitte wiederholen?",
          "meaning": "Pidempi toistopyyntö."
        },
        {
          "label": "C · Kysy merkitys",
          "german": "Was bedeutet das?",
          "meaning": "En tunne sanan merkitystä."
        },
        {
          "label": "C · Kysy saksan vastine",
          "german": "Wie sagt man das auf Deutsch?",
          "meaning": "Tarvitsen saksankielisen ilmaisun."
        }
      ]
    },
    {
      "id": "guided",
      "kind": "question",
      "phase": "Ohjattu harjoitus",
      "title": "Pyydä opettajaa toistamaan",
      "paragraphs": [
        "Kuvittele luokassa uusi ohje, jota et kuullut. Tämän tilanteen tavoitteena ei ole kysyä omaa nimeä tai lähtömaata."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-SURV-08",
        "evidenceRole": "practice",
        "prompt": "Mikä sopii tilanteeseen B?",
        "options": [
          {
            "id": "a",
            "label": "Ich heiße Mia.",
            "wrongFeedback": "Tämä kertoo nimesi."
          },
          {
            "id": "b",
            "label": "Noch einmal, bitte."
          },
          {
            "id": "c",
            "label": "Wie alt ist er?",
            "wrongFeedback": "Tämä kysyy jonkun ikää."
          }
        ],
        "correctOption": "b",
        "success": "Noch einmal, bitte. on lyhyt toistopyyntö.",
        "hint": "Einmal = kerran.",
        "reteach": "Noch einmal, bitte. on lyhyt toistopyyntö. Einmal = kerran.",
        "genericWrong": "Pohdi, yritätkö ymmärtää sanan, kuulla uudelleen vai pyytää apua. Einmal = kerran."
      }
    },
    {
      "id": "source",
      "kind": "book",
      "phase": "Kirjan kielioppi",
      "title": "Vertaa ennen kirjoittamista alkuperäiseen kouluympäristöön",
      "paragraphs": [
        "Avaa C08:n Text A ja tunnista opettajan Guten Morgen sekä Sehr gut, Florian!. Nämä ovat lähteestä tunnistettavia tuttuja ilmauksia.",
        "Alkuperäinen Schule-kohtaus on vaikeampi kuin omat dialogisi. Älä yritä kopioida sen pitkiä verbirakenteita vaan harjoittele omia yksinkertaisia avunpyyntöjä."
      ],
      "bookLinks": [
        {
          "chapterId": "08",
          "section": "text",
          "label": "C08 · Autenttinen Schule-luokkakohtaus",
          "instruction": "Etsi kaksi tuttua fraasia koulun tilanteesta."
        }
      ]
    },
    {
      "id": "practice",
      "kind": "book",
      "phase": "Kirjan harjoitukset",
      "title": "Tarkista kaksi oikeaa fraasiharjoitusta",
      "paragraphs": [
        "Tee kirjan Harjoittele-sivulta C08-EX-07 (der Satz) ja C08-EX-08 (die Frage). Näiden sanojen tunteminen auttaa rakentamaan kysymyksen tai lauseen oppimistilanteeseen.",
        "C08-EX-07 on nähty jo L043:ssa. Sen voi kerrata nyt tarkoituksella, mutta samaa vastausta ei lasketa uutena erillisenä pisteytettynä kokeena."
      ],
      "bookLinks": [
        {
          "chapterId": "08",
          "section": "practice",
          "label": "C08 · Harjoitukset 07 ja 08",
          "instruction": "Kertaa der Satz ja die Frage."
        }
      ]
    },
    {
      "id": "independent",
      "kind": "question",
      "phase": "Itsenäinen harjoittelu",
      "title": "Kirjoita fraasi kohtaan A",
      "paragraphs": [
        "Sulje mallitaulu. Kirjoita kokonainen peruslause, kun et ymmärrä."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-SURV-08",
        "evidenceRole": "independent",
        "prompt": "Kirjoita saksaksi: En ymmärrä.",
        "accepted": [
          "Ich verstehe nicht.",
          "Ich verstehe nicht"
        ],
        "success": "Ich verstehe nicht. on oikein.",
        "hint": "Käytä järjestystä Ich, verstehe, nicht.",
        "reteach": "Ich verstehe nicht. on oikein. Käytä järjestystä Ich, verstehe, nicht.",
        "genericWrong": "Yritä palauttaa mieleen lyhyt kokonainen avunpyyntö. Käytä järjestystä Ich, verstehe, nicht.",
        "wrongAnswers": {
          "ich verstehen nicht": "Ich-pronominin kanssa käytä verstehe, ei verstehen.",
          "ich verstehe": "Ilmauksesta puuttuu kielteinen nicht."
        }
      }
    },
    {
      "id": "application",
      "kind": "question",
      "phase": "Soveltaminen",
      "title": "Kumpi on oikeasti eri tilanne?",
      "paragraphs": [
        "Olet kirjoittamassa C-tilannetta, jossa yksi sana on epäselvä. Valitse merkitykseen liittyvä kysymys."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-SURV-08",
        "evidenceRole": "application",
        "prompt": "Mikä sopii tilanteeseen C?",
        "options": [
          {
            "id": "a",
            "label": "Bitte langsamer.",
            "wrongFeedback": "Tämä koskee puhenopeutta, ei sanan merkitystä."
          },
          {
            "id": "b",
            "label": "Wie schreibt man das?",
            "wrongFeedback": "Tämä kysyy kirjoitusasua, ei selitystä."
          },
          {
            "id": "c",
            "label": "Was bedeutet das?"
          }
        ],
        "correctOption": "c",
        "success": "Was bedeutet das? kysyy sanan merkitystä.",
        "hint": "Bedeutet = tarkoittaa.",
        "reteach": "Was bedeutet das? kysyy sanan merkitystä. Bedeutet = tarkoittaa.",
        "genericWrong": "Pohdi, yritätkö ymmärtää sanan, kuulla uudelleen vai pyytää apua. Bedeutet = tarkoittaa."
      }
    },
    {
      "id": "writing",
      "kind": "book",
      "phase": "Kirjan oma sovellus",
      "title": "Kirjoita kolme omaa dialogia kirjan Sovella-sivulle",
      "paragraphs": [
        "Avaa C08:n Sovella-sivu. Kirjoita kolme erilaista tilannetta: A et ymmärrä, B pyydät toiston ja C pyydät merkityksen selityksen. Käytä kokonaisia opetettuja saksankielisiä fraaseja.",
        "Tallenna vähintään 80 merkkiä omaa tekstiä, älä pelkkää mallin otsikkoa. Sovellus pitää sisällään oman kolmeen osaan jaetun yrityksesi.",
        "Opettaja tarkistaa saman C08-luonnoksen tallennetun merkkimäärän. Se ei päättele tekstin laatua automaattisesti; tarkista itse, ovatko dialogit kolme erilaista tilannetta."
      ],
      "bookLinks": [
        {
          "chapterId": "08",
          "section": "apply",
          "label": "C08 · Sovella · kolme omaa luokkahuonedialogia",
          "instruction": "Kirjoita A, B, C ja tallenna vähintään 80 merkkiä."
        }
      ]
    },
    {
      "id": "activity",
      "kind": "activity",
      "phase": "Oma harjoittelu",
      "title": "Arvioi lyhyet dialogit itse",
      "paragraphs": [
        "Lue jokainen oma dialogi. Kysy: ratkaisiko se oikean ongelman? Toistitko saman lauseen kolme kertaa vai vaihdoitko tarkoitusta?",
        "Sano halutessasi neljä pyyntöä ääneen ilman mallia. Vahvistus merkitsee omaa harjoittelua eikä koneellista ääntämisen hyväksyntää."
      ],
      "activityId": "c08-teacher-L044",
      "activityLabel": "Tarkistin kolme eri avunpyyntödialogia itse"
    },
    {
      "id": "exit",
      "kind": "question",
      "phase": "Lopputarkistus",
      "title": "Mikä merkintä on luotettavin?",
      "paragraphs": [
        "Erota tallennuksen laajuus siitä, kuinka hyvin oma lause oikeasti toimii."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-STRAT-08",
        "evidenceRole": "exit",
        "prompt": "Mitä Sovella-sivun 80 merkin tallennusehto tarkoittaa?",
        "options": [
          {
            "id": "a",
            "label": "Kielitaito on automaattisesti arvioitu erinomaiseksi.",
            "wrongFeedback": "Pelkkä merkkimäärä ei kerro kielen oikeellisuutta."
          },
          {
            "id": "b",
            "label": "Kirjaan on tallennettu riittävän pitkä oma harjoitusyritys; sen laadun arvioin itse."
          },
          {
            "id": "c",
            "label": "Olen suorittanut puheen ja kuuntelun koneelliset kokeet.",
            "wrongFeedback": "Tässä ei käytetä hyväksyttyä puheen tai kuuntelun automaattista pisteytystä."
          }
        ],
        "correctOption": "b",
        "success": "Merkkimäärä on tallennusehto, ei kielitaidon arvosana.",
        "hint": "Varmista, että oma teksti on olemassa ja tarkista sen sisältö itse.",
        "reteach": "Merkkimäärä on tallennusehto, ei kielitaidon arvosana. Varmista, että oma teksti on olemassa ja tarkista sen sisältö itse.",
        "genericWrong": "Pohdi, yritätkö ymmärtää sanan, kuulla uudelleen vai pyytää apua. Varmista, että oma teksti on olemassa ja tarkista sen sisältö itse."
      }
    },
    {
      "id": "summary",
      "kind": "summary",
      "phase": "Yhteenveto",
      "title": "Kolme omaa avunpyyntöä on käytännön osaamista",
      "paragraphs": [
        "Kirjoitit kolme erilaista luokkatilannetta, tarkistit kaksi oikeaa kirjan tehtävää ja vahvistit itse tekemiesi harjoitusten tarkoituksen.",
        "Sovelluksen vähintään 80 merkin mittainen teksti jää kirjan C08-luonnokseen. Ääntämistä ei pisteytetä automaattisesti eikä aikaisempi kirjoitus häviä kappalekokeessa.",
        "L045:ssa palautat koko C08:n 12 tehtävän kappaletestin ja kirjoitat oman itsearvion."
      ]
    }
  ],
  "applicationDraftMinLength": 80
};
