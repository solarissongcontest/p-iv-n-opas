import type { TeacherLesson } from "./engine.ts";
/** Review I reuses reserved assessment draft 91, not a textbook chapter C91. */
export const LOS1_L029_TEACHER: TeacherLesson = {
  "id": "L029",
  "bookId": 1,
  "chapterId": "91",
  "version": "2.0.0-preview.1",
  "title": "Autenttisen keskustelun kertaus (kuuntelu valinnainen)",
  "objective": "Palaan kahdeksanrepliikkiseen Franz–Jörg-alkutekstiin ja teen viisi luetun ymmärtämisen kertaustehtävää.",
  "estimatedMinutes": 30,
  "scenes": [
    {
      "id": "welcome",
      "kind": "introduction",
      "phase": "Aloitus",
      "title": "Mitä kertaamme tällä tunnilla?",
      "paragraphs": [
        "C01:n julkaistu Franzin ja Jörgin keskustelu palaa nyt uudesta näkökulmasta. Käy koko kahdeksan puheenvuoron teksti läpi.",
        "Alkuperäisen äänen voi kuunnella, jos toisto toimii. Se ei ole tässä automaattisesti arvioitava kuullunymmärtämiskoe, eikä kuuntelua tarvitse väittää tehdyksi."
      ]
    },
    {
      "id": "recall",
      "kind": "question",
      "phase": "Muistelu",
      "title": "Aloita muistista ilman mallia",
      "paragraphs": [
        "Palauta ensin mieleen jo aiemmin harjoiteltu ilmaus."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-READ-01",
        "evidenceRole": "practice",
        "prompt": "Millä tervehdyksellä Franz aloittaa keskustelun?",
        "options": [
          {
            "id": "a",
            "label": "Auf Wiedersehen!",
            "wrongFeedback": "Tämä päättää keskustelun."
          },
          {
            "id": "b",
            "label": "Guten Abend!",
            "wrongFeedback": "Tätä Franz ei käytä alussa."
          },
          {
            "id": "c",
            "label": "Hallo, wie heißt du?"
          }
        ],
        "correctOption": "c",
        "success": "Franz aloittaa tervehdyksellä ja nimikysymyksellä.",
        "hint": "Aloituksessa kysytään toisen nimeä.",
        "reteach": "Franz aloittaa tervehdyksellä ja nimikysymyksellä. Aloituksessa kysytään toisen nimeä.",
        "genericWrong": "Vertaa vaihtoehdon merkitystä tilanteeseen. Aloituksessa kysytään toisen nimeä."
      }
    },
    {
      "id": "explain",
      "kind": "explanation",
      "phase": "Opetus",
      "title": "Opettaja yhdistää aiemmat asiat",
      "paragraphs": [
        "Franz aloittaa: Hallo, wie heißt du? Keskustelu etenee nimen kysymisestä myös ikään ja hyvästelyyn.",
        "Nimi-, ikä- ja hyvästelyrepliikit kuuluvat yhteen alkuperäiseen kahdeksan puheenvuoron aineistoon. Älä irrota yhtä vastausta sen puhujasta.",
        "Franz on tekstissä 19-vuotias, Jörg 20-vuotias. Nämä luvut tunnistetaan nyt tekstistä; niiden järjestelmällinen muodostaminen opetetaan vasta C06:ssa.",
        "Vastaukset kirjan L029:n kertaustehtäviin löytyvät näkyvistä kokonaisista repliikeistä, joten äänen puuttuminen ei estä ymmärtämisen harjoittelua."
      ],
      "help": [
        {
          "title": "Miksi ikänumerot jo nyt?",
          "body": "C01:n autenttisessa keskustelussa ne olivat jo näkyvissä. Nyt tunnistat valmiista lauseesta neunzehn ja zwanzig, mutta C06 opettaa lukujen muodostamisen."
        },
        {
          "title": "Mitä jos ääni ei toimi?",
          "body": "Lue koko kahdeksanrepliikkinen lähdeteksti kirjan sisällä. Tee ymmärtämistehtävät tekstin perusteella. Älä merkitse kuuntelua testatuksi."
        }
      ]
    },
    {
      "id": "board",
      "kind": "board",
      "phase": "Opetustaulu",
      "title": "Seuraa fraasien vaiheita",
      "paragraphs": [
        "Lue mallit yksitellen ja yhdistä saksankielinen ilmaus käyttötarkoitukseensa. Kokeile lopuksi muistaa ilman taulua."
      ],
      "board": [
        {
          "label": "Franz avaa",
          "german": "Hallo, wie heißt du?",
          "meaning": "Hei, mikä nimesi on?"
        },
        {
          "label": "Puhujat",
          "german": "Franz und Jörg",
          "meaning": "Kaksi eri henkilöä; huomaa kumman vastaus on kyseessä."
        },
        {
          "label": "Franzin ikä",
          "german": "neunzehn Jahre alt",
          "meaning": "Franz sanoo olevansa 19-vuotias."
        },
        {
          "label": "Jörgin ikä",
          "german": "zwanzig",
          "meaning": "Jörg sanoo olevansa 20-vuotias."
        },
        {
          "label": "Hyvästely",
          "german": "Tschüss!",
          "meaning": "Jörg lopettaa keskustelun tällä ilmauksella."
        }
      ]
    },
    {
      "id": "guided",
      "kind": "question",
      "phase": "Ohjattu harjoitus",
      "title": "Ratkaise ensimmäinen uusi tilanne",
      "paragraphs": [
        "Tee valinta aiemmin opetetun säännön ja uuden tilanteen perusteella."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-READ-01",
        "evidenceRole": "practice",
        "prompt": "Kuka sanoo tekstissä Wie alt bist du?",
        "options": [
          {
            "id": "a",
            "label": "Jörg"
          },
          {
            "id": "b",
            "label": "Franz",
            "wrongFeedback": "Franz vastaa omaan ikäänsä, mutta ikäkysymyksen esittää Jörg."
          },
          {
            "id": "c",
            "label": "Greta",
            "wrongFeedback": "Greta kuuluu toiseen C02-dialogiin."
          }
        ],
        "correctOption": "a",
        "success": "Jörg kysyy Franzin ikää.",
        "hint": "Katso C01:n neljättä puheenvuoroa.",
        "reteach": "Jörg kysyy Franzin ikää. Katso C01:n neljättä puheenvuoroa.",
        "genericWrong": "Vertaa vaihtoehdon merkitystä tilanteeseen. Katso C01:n neljättä puheenvuoroa."
      }
    },
    {
      "id": "source",
      "kind": "book",
      "phase": "Alkuperäisteksti",
      "title": "Palaa alkuperäisiin kirjalähteisiin",
      "paragraphs": [
        "Lue koko alkuperäinen kahdeksanrepliikkinen lähde. Jos audio ei toimi, käytä tekstiä.",
        "Kirjan sivulla olevat tekstit ovat kokonaisia lähdeaineistoja. Tässä tunnissa niitä ei korvata tekaistuilla äänitteillä."
      ],
      "bookLinks": [
        {
          "chapterId": "01",
          "section": "text",
          "label": "C01 · Franz ja Jörg · koko Text A",
          "instruction": "Lue kaikki kahdeksan repliikkiä; kuuntelu on vain vapaaehtoinen."
        },
        {
          "chapterId": "01",
          "section": "text-b",
          "label": "C01 · erillinen Text B",
          "instruction": "Erota alkuperäisestä päädialogista toinen äänite; älä sekoita lähteitä."
        }
      ]
    },
    {
      "id": "review",
      "kind": "book",
      "phase": "Kertaus I",
      "title": "Tarkista viisi aitoa kertaustehtävää",
      "paragraphs": [
        "Avaa Kertaus I -sivu ja tee L029-osion kysymykset EX-REV1-Q11, EX-REV1-Q12, EX-REV1-Q13, EX-REV1-Q14, EX-REV1-Q15. Paina Tarkista vastaus jokaisen tehtävän kohdalla.",
        "Tämä oppitunti tarkistaa viisi todellista tallennettua vastausta sekä niiden tarkistusmerkinnät. Tarkistus ei edellytä viittä oikeaa vastausta."
      ],
      "bookLinks": [
        {
          "chapterId": "01",
          "section": "review",
          "label": "Kertaus I · L029",
          "instruction": "Vastaa ja tarkista EX-REV1-Q11–EX-REV1-Q15."
        }
      ]
    },
    {
      "id": "independent",
      "kind": "question",
      "phase": "Itsenäinen harjoittelu",
      "title": "Muista yksi ilmaus itse",
      "paragraphs": [
        "Sulje malliteksti ennen vastausta. Vastaus saa mennä väärin; tarkista opettajan palaute."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-INT-01",
        "evidenceRole": "independent",
        "prompt": "Kirjoita saksaksi keskustelun lopun rento hyvästely.",
        "accepted": [
          "Tschüss!",
          "Tschüss"
        ],
        "success": "Tschüss! on keskustelun lopun hyvästely.",
        "hint": "Muista sanan alku Tsch- ja umlaut ü.",
        "reteach": "Tschüss! on keskustelun lopun hyvästely. Muista sanan alku Tsch- ja umlaut ü.",
        "genericWrong": "Tarkista fraasin sanat ja sanajärjestys. Muista sanan alku Tsch- ja umlaut ü.",
        "wrongAnswers": {
          "auf wiedersehen": "Tämäkin olisi hyvästely, mutta nyt pyydettiin juuri Jörgin käyttämää ilmausta."
        }
      }
    },
    {
      "id": "application",
      "kind": "question",
      "phase": "Soveltaminen",
      "title": "Sovella uudessa tilanteessa",
      "paragraphs": [
        "Käytä aiempaa tietoa tässä uudessa tilanteessa, älä kopioi suoraan opetustaulua."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-READ-01",
        "evidenceRole": "application",
        "prompt": "Franz on 19-vuotias. Kuinka vanha Jörg on saman keskustelun perusteella?",
        "options": [
          {
            "id": "a",
            "label": "18 vuotta",
            "wrongFeedback": "Teksti ei kerro Jörgin olevan 18-vuotias."
          },
          {
            "id": "b",
            "label": "19 vuotta",
            "wrongFeedback": "Franz sanoo olevansa 19, mutta Jörgin ikä on eri."
          },
          {
            "id": "c",
            "label": "20 vuotta"
          }
        ],
        "correctOption": "c",
        "success": "Oikein. Jörg kertoo olevansa 20-vuotias.",
        "hint": "Etsi Jörgin repliikin sana zwanzig.",
        "reteach": "Oikein. Jörg kertoo olevansa 20-vuotias. Etsi Jörgin repliikin sana zwanzig.",
        "genericWrong": "Vertaa vaihtoehdon merkitystä tilanteeseen. Etsi Jörgin repliikin sana zwanzig."
      }
    },
    {
      "id": "reflection",
      "kind": "book",
      "phase": "Oma itsearvio",
      "title": "Arvioi muistamistasi rehellisesti",
      "paragraphs": [
        "Avaa L029-osion oma itsearvio Kertaus I -sivulla. Valitse Osasin pääosin, Muistin osan tai Tarvitsen lisää harjoittelua.",
        "Arvio tallennetaan tunnisteelle EX-REV1-SELF-029. Oman arvioinnin taso ei anna eikä vähennä EX-MID-välikokeen pisteitä. Vahvista sen jälkeen alla tämä opiskeluteko."
      ],
      "bookLinks": [
        {
          "chapterId": "01",
          "section": "review",
          "label": "Kertaus I · L029 · itsearvio",
          "instruction": "Täytä EX-REV1-SELF-029."
        }
      ],
      "activityId": "review-reflection-L029",
      "activityLabel": "Arvioin muistamistani itse"
    },
    {
      "id": "exit",
      "kind": "question",
      "phase": "Lopputarkistus",
      "title": "Lopputarkistus",
      "paragraphs": [
        "Tee vielä yksi lyhyt lopputarkistus ennen yhteenvedon avaamista."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-STRAT-01",
        "evidenceRole": "exit",
        "prompt": "Äänite ei avaudu. Mikä on oikea toimintatapa?",
        "options": [
          {
            "id": "a",
            "label": "Teen tehtävät kokonaisen tekstin perusteella ja en väitä kuuntelusuoritusta."
          },
          {
            "id": "b",
            "label": "Merkitsen kuuntelun hyväksytysti suoritetuksi vaikken kuullut sitä.",
            "wrongFeedback": "Kuuntelun onnistumista ei saa päätellä tekstin katsomisesta."
          },
          {
            "id": "c",
            "label": "Arvaan kaikki vastaukset, koska kirjatekstiä ei voi käyttää.",
            "wrongFeedback": "Koko lähdeteksti on luettavissa suoraan oppikirjassa."
          }
        ],
        "correctOption": "a",
        "success": "Oikein. Lukeminen ei ole kuuntelun automaattinen todistus.",
        "hint": "Teksti on kirjan sisällä ja tehtävät tarkistetaan sen perusteella.",
        "reteach": "Oikein. Lukeminen ei ole kuuntelun automaattinen todistus. Teksti on kirjan sisällä ja tehtävät tarkistetaan sen perusteella.",
        "genericWrong": "Vertaa vaihtoehdon merkitystä tilanteeseen. Teksti on kirjan sisällä ja tehtävät tarkistetaan sen perusteella."
      }
    },
    {
      "id": "summary",
      "kind": "summary",
      "phase": "Yhteenveto",
      "title": "Kertauksen yhteenveto",
      "paragraphs": [
        "Kertasit koko kahdeksanrepliikkisen alkuperäiskeskustelun ja erotit puhujien tiedot.",
        "Kertauksen viisi tarkistettua kysymystä arvioivat lähdetekstin ymmärtämistä. Äänentoiston toimivuutta ei ole vahvistettu kaikilla laitteilla, eikä niistä anneta kuuntelupistettä."
      ]
    }
  ],
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredActivityIds": [
    "review-reflection-L029"
  ],
  "requiredPracticeIds": [
    "EX-REV1-SELF-029"
  ],
  "requiredCheckedIds": [
    "EX-REV1-Q11",
    "EX-REV1-Q12",
    "EX-REV1-Q13",
    "EX-REV1-Q14",
    "EX-REV1-Q15"
  ]
};
