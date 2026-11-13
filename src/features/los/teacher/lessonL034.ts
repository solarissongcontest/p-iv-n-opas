import type { TeacherLesson } from "./engine.ts";
/** C06 L034: authentic M-COM-01 Text B; no invented audio or speech grading. */
export const LOS1_L034_TEACHER: TeacherLesson = {
  "id": "L034",
  "bookId": 1,
  "chapterId": "06",
  "version": "2.0.0-preview.1",
  "title": "Kuuntele ikähaastattelu",
  "objective": "Tunnistan alkuperäisestä Text B:stä Franzin ja Jörgin iät ja käytän ikäfraaseja uusissa tilanteissa ilman tekaistua kuunteluarvosanaa.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "franz",
    "application-one",
    "application-two",
    "exit"
  ],
  "requiredActivityIds": [
    "text-b-studied"
  ],
  "requiredPracticeIds": [],
  "requiredCheckedIds": [
    "C06-TEXTB-Q01",
    "C06-TEXTB-Q02"
  ],
  "scenes": [
    {
      "id": "welcome",
      "phase": "Aloitus",
      "kind": "introduction",
      "title": "Franzin ja Jörgin ikäkeskustelu",
      "paragraphs": [
        "Tässä tunnissa käytät C06:n oikeaa Text B -aineistoa: M-COM-01, GesprächVorstellung.ogg, Franzin ja Jörgin kahdeksan repliikin keskustelu. Sama teksti oli C01:ssä toisesta näkökulmasta.",
        "Ääni on vapaaehtoinen ja laitetestaamaton. Jos ääntä ei saa toistettua, koko lähdetekstin voi lukea LOS!:ssa. Lukemisesta ei synny kuullun ymmärtämisen pisteitä."
      ]
    },
    {
      "id": "recall",
      "phase": "Harjoitus",
      "kind": "question",
      "title": "Tunnista ja sovella",
      "paragraphs": [
        "Yritä ensin itse, tarkista tarvittaessa lähdetekstistä."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-INT-06",
        "evidenceRole": "practice",
        "prompt": "Kirjoita numeroin: neunzehn",
        "accepted": [
          "19"
        ],
        "success": "Oikein, käytit oikeaa ikäilmausta tai lukua.",
        "hint": "Wie alt bist du? = kuinka vanha olet; Ich bin ... = olen ...",
        "reteach": "Franz sanoo neunzehn (19) ja Jörg zwanzig (20). Ikä kerrotaan bin-muodolla.",
        "genericWrong": "Tarkista ikä, henkilö, bin-muoto ja numeron tarkka kirjoitusasu.",
        "wrongAnswers": {
          "90": "90 on neunzig, 19 neunzehn."
        }
      }
    },
    {
      "id": "strategy",
      "phase": "Opetus",
      "kind": "explanation",
      "title": "Miten tunnistan puheen tärkeimmät tiedot?",
      "paragraphs": [
        "Ensimmäisellä kerralla tunnista henkilöt ja ikäkysymys. Jörg kysyy Wie alt bist du? Franz vastaa Ich bin neunzehn Jahre alt, und du? Jörg vastaa Ich bin zwanzig.",
        "Toisella kerralla poimi numerot 19 ja 20. Jos ääni toimii, voit kuunnella ja verrata koko autenttiseen transkriptioon. Jos ääni ei toimi, harjoittele vain lukemista.",
        "Tämä harjoitus ei sisällä itse keksittyä ääniraitaa eikä toistoklikkauksen perusteella annettavaa automaattista kuuntelupistettä."
      ],
      "help": [
        {
          "title": "Mitä teen ilman ääntä?",
          "body": "Lue kaikki kahdeksan repliikkiä kirjan Text B -sivulta. Voit ymmärtää niiden sisällön tekstinä; kuuntelutaito jää erikseen arvioimatta."
        }
      ]
    },
    {
      "id": "model",
      "phase": "Mallisuoritus",
      "kind": "board",
      "title": "Opettajan lähdetietotaulu",
      "paragraphs": [
        "Seuraa ikäkysymystä ja kahta vastausta niiden oikeassa järjestyksessä."
      ],
      "board": [
        {
          "label": "1 · Jörg kysyy",
          "german": "Wie alt bist du?",
          "meaning": "Kuinka vanha olet?"
        },
        {
          "label": "2 · Franz vastaa",
          "german": "Ich bin neunzehn Jahre alt.",
          "meaning": "Franz on 19-vuotias."
        },
        {
          "label": "3 · Jörg vastaa",
          "german": "Ich bin zwanzig.",
          "meaning": "Jörg on 20-vuotias."
        }
      ]
    },
    {
      "id": "text-b",
      "phase": "Lähdeaineisto",
      "kind": "book",
      "title": "Koko kahdeksan repliikin Text B",
      "paragraphs": [
        "Avaa kirjan C06:n Text B. Lue kaikki kahdeksan repliikkiä ja tarkista henkilöt sekä ikälauseet. Voit kuunnella lähteen alkuperäisen M-COM-01-äänitteen, jos sen toisto laitteellasi toimii.",
        "Äänitteessä ei ole kahta erikseen varmennettua natiivia saksankielistä puhujaa, eikä fyysisen laitteen toistoa ole vielä hyväksytty.",
        "Vahvista todellinen perehtyminen. Äänitoistosta ei anneta kuvitteellista arviointimerkintää."
      ],
      "bookLinks": [
        {
          "chapterId": "06",
          "section": "text-b",
          "label": "C06 · Text B · Franz ja Jörg",
          "instruction": "Lue kahdeksan alkuperäistä repliikkiä ja halutessasi kuuntele."
        }
      ],
      "activityId": "text-b-studied",
      "activityLabel": "Perehdyin kaikkiin kahdeksaan Text B -repliikkiin"
    },
    {
      "id": "guided",
      "phase": "Ohjattu harjoitus",
      "kind": "question",
      "title": "Kumpi kertoo olevansa 20-vuotias?",
      "paragraphs": [
        "Etsi oikea puhuja."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-READ-01",
        "prompt": "Kuka sanoo Ich bin zwanzig.?",
        "options": [
          {
            "id": "a",
            "label": "Franz",
            "wrongFeedback": "Franz on 19, ei 20."
          },
          {
            "id": "b",
            "label": "Jörg"
          },
          {
            "id": "c",
            "label": "Greta",
            "wrongFeedback": "Greta ei ole tässä kahden puhujan keskustelussa."
          }
        ],
        "correctOption": "b",
        "success": "Oikein. Jörg sanoo Ich bin zwanzig.",
        "hint": "Franz sanoo neunzehn.",
        "reteach": "Franz = 19, Jörg = 20.",
        "genericWrong": "Vertaa puheenvuoroihin merkittyjä nimiä."
      }
    },
    {
      "id": "comprehension",
      "phase": "Oppikirjan ymmärtämistehtävät",
      "kind": "book",
      "title": "Vastaa ja tarkista kaksi oikeaa kysymystä",
      "paragraphs": [
        "Avaa Text B:n alaosan C06-TEXTB-Q01 ja C06-TEXTB-Q02. Ne kysyvät, kuka esittää ikäkysymyksen ja kuinka vanha Franz on. Vastaa molempiin ja paina Tarkista vastaus.",
        "Tarkistuksen tila tulee samasta C06-kappaleen tallennuksesta. Näitä voi ratkaista myös lukemalla; siksi ne eivät osoita kuullun ymmärtämistä."
      ],
      "bookLinks": [
        {
          "chapterId": "06",
          "section": "text-b",
          "label": "C06 · Text B · Q01 ja Q02",
          "instruction": "Tarkista tehtävät C06-TEXTB-Q01 ja Q02."
        }
      ]
    },
    {
      "id": "franz",
      "phase": "Harjoitus",
      "kind": "question",
      "title": "Tunnista ja sovella",
      "paragraphs": [
        "Yritä ensin itse, tarkista tarvittaessa lähdetekstistä."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-INT-06",
        "evidenceRole": "independent",
        "prompt": "Kirjoita numeroin: Franzin neunzehn",
        "accepted": [
          "19"
        ],
        "success": "Oikein, käytit oikeaa ikäilmausta tai lukua.",
        "hint": "Wie alt bist du? = kuinka vanha olet; Ich bin ... = olen ...",
        "reteach": "Franz sanoo neunzehn (19) ja Jörg zwanzig (20). Ikä kerrotaan bin-muodolla.",
        "genericWrong": "Tarkista ikä, henkilö, bin-muoto ja numeron tarkka kirjoitusasu.",
        "wrongAnswers": {
          "20": "Jörgin ikä on 20. Franz sanoo neunzehn."
        }
      }
    },
    {
      "id": "application-rule",
      "phase": "Opetus",
      "kind": "explanation",
      "title": "Sovella ikäfraasia uusille henkilöille",
      "paragraphs": [
        "Alkuperäisessä tekstissä Franz on 19 ja Jörg 20. Nyt vaihdat luvun, mutta säilytät rakenteen Ich bin ... Jahre alt.",
        "Wie heißt du? kysyy nimeä, Wie alt bist du? ikää. Älä sekoita näitä kahta. Saksaksi ei sanota Ich habe 17 Jahre alt."
      ]
    },
    {
      "id": "application-one",
      "phase": "Harjoitus",
      "kind": "question",
      "title": "Tunnista ja sovella",
      "paragraphs": [
        "Yritä ensin itse, tarkista tarvittaessa lähdetekstistä."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-INT-06",
        "evidenceRole": "application",
        "prompt": "Mia on kuvitteellisesti 17-vuotias. Kirjoita täydellinen vastaus: Olen 17-vuotias.",
        "accepted": [
          "Ich bin siebzehn Jahre alt."
        ],
        "success": "Oikein, käytit oikeaa ikäilmausta tai lukua.",
        "hint": "Wie alt bist du? = kuinka vanha olet; Ich bin ... = olen ...",
        "reteach": "Franz sanoo neunzehn (19) ja Jörg zwanzig (20). Ikä kerrotaan bin-muodolla.",
        "genericWrong": "Tarkista ikä, henkilö, bin-muoto ja numeron tarkka kirjoitusasu.",
        "wrongAnswers": {
          "ich habe siebzehn jahre alt": "Saksan iän kanssa käytetään bin, ei habe.",
          "ich bin siebenzehn jahre alt": "17 kirjoitetaan siebzehn, ei siebenzehn."
        }
      }
    },
    {
      "id": "application-two",
      "phase": "Harjoitus",
      "kind": "question",
      "title": "Tunnista ja sovella",
      "paragraphs": [
        "Yritä ensin itse, tarkista tarvittaessa lähdetekstistä."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-INT-06",
        "evidenceRole": "application",
        "prompt": "Leo on kuvitteellisesti 20-vuotias. Kirjoita lyhyt vastaus ilman Jahre alt -osaa: Olen 20-vuotias.",
        "accepted": [
          "Ich bin zwanzig."
        ],
        "success": "Oikein, käytit oikeaa ikäilmausta tai lukua.",
        "hint": "Wie alt bist du? = kuinka vanha olet; Ich bin ... = olen ...",
        "reteach": "Franz sanoo neunzehn (19) ja Jörg zwanzig (20). Ikä kerrotaan bin-muodolla.",
        "genericWrong": "Tarkista ikä, henkilö, bin-muoto ja numeron tarkka kirjoitusasu.",
        "wrongAnswers": {
          "ich habe zwanzig": "Ikä ilmaistaan bin-verbillä.",
          "ich bin zwanzig jahre alt": "Tässä pyydetään nimenomaan lyhyttä vastausta."
        }
      }
    },
    {
      "id": "exit",
      "phase": "Harjoitus",
      "kind": "question",
      "title": "Tunnista ja sovella",
      "paragraphs": [
        "Yritä ensin itse, tarkista tarvittaessa lähdetekstistä."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-INT-06",
        "evidenceRole": "exit",
        "prompt": "Kirjoita numeroin: zwanzig",
        "accepted": [
          "20"
        ],
        "success": "Oikein, käytit oikeaa ikäilmausta tai lukua.",
        "hint": "Wie alt bist du? = kuinka vanha olet; Ich bin ... = olen ...",
        "reteach": "Franz sanoo neunzehn (19) ja Jörg zwanzig (20). Ikä kerrotaan bin-muodolla.",
        "genericWrong": "Tarkista ikä, henkilö, bin-muoto ja numeron tarkka kirjoitusasu.",
        "wrongAnswers": {
          "12": "12 on zwölf, 20 zwanzig."
        }
      }
    },
    {
      "id": "summary",
      "phase": "Yhteenveto",
      "kind": "summary",
      "title": "Nyt ymmärrät ikäkeskustelun",
      "paragraphs": [
        "Franz kertoo iäkseen 19 ja Jörg 20. Harjoittelit uutta 17- ja 20-vuotiaan kuvitteellista vastausta sekä kaksi oikeaa Text B -tehtävää.",
        "Jos käytit äänitettä, sait kuunteluharjoitusta. Pelkkä lukeminen on luetun ymmärtämistä; kumpaakaan ei väitetä automaattiseksi kuunteluarvosanaksi."
      ]
    }
  ]
};
