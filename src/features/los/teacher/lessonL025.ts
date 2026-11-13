import type { TeacherLesson } from "./engine.ts";
/** C05 L025: real Text B M-COM-08 / M-WB-01, strict no-fake-listening contract. */
export const LOS1_L025_TEACHER: TeacherLesson = {
  "id": "L025",
  "bookId": 1,
  "chapterId": "05",
  "version": "2.0.0-preview.1",
  "title": "Kuuntele mieliala ja vastaa",
  "objective": "Tunnistan vointikysymyksen ja vointivastauksen C05:n nykyisestä Text B:stä; sovellan ilmauksia ilman perusteetonta kuuntelusuoritusmerkintää.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredActivityIds": [
    "textb-studied"
  ],
  "requiredPracticeIds": [],
  "requiredCheckedIds": [
    "C05-TEXTB-Q01",
    "C05-TEXTB-Q02"
  ],
  "scenes": [
    {
      "id": "welcome",
      "phase": "Aloitus",
      "kind": "introduction",
      "title": "Teksti toimii myös ilman hyväksyttyä ääntä",
      "paragraphs": [
        "C05:n Text B käyttää Franzin ja Gretan julkaistua kuuden repliikin dialogia, joka nähtiin jo C02:ssa. Nyt luemme sen uudella tavoitteella: etsimme vointikysymyksen ja vastauksen, emme vain nimiä.",
        "Nykyisen Text B:n yhteydessä on ehdokas ihmisäänite M-COM-08. Sen sanatarkkaa vastaavuutta tekstiin ja laitetestausta ei ole vahvistettu. Siksi tämä tunti toimii kokonaan myös tekstin avulla.",
        "Jos kuulet hyväksytyn ja toimivan lähdeäänitteen, voit harjoitella kuultua. Jos ääni puuttuu tai epäonnistuu, tehtävät tehdään tekstin pohjalta. Tällöin LOS! ei merkitse mitään kuuntelua suoritetuksi eikä anna kuuntelupisteitä."
      ],
      "help": [
        {
          "title": "Onko kuuntelu pakollista?",
          "body": "Ei. Text B:n kuusi alkuperäistä repliikkiä ovat sisällä kirjassa. Tekstiin perustuvat tehtävät eivät väitä kuullun ymmärtämistä."
        }
      ]
    },
    {
      "id": "recall",
      "phase": "Muistelu",
      "title": "Millä kysyt kuulumisia?",
      "kind": "question",
      "paragraphs": [
        "Palauta ensin mieleen L022:n keskeinen kysymys."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-05",
        "evidenceRole": "practice",
        "prompt": "Mitä Wie geht's? tarkoittaa?",
        "options": [
          {
            "id": "a",
            "label": "Mitä kuuluu?"
          },
          {
            "id": "b",
            "label": "Mikä sinun nimesi on?",
            "wrongFeedback": "Tämä on Wie heißt du?, ei Wie geht's?."
          },
          {
            "id": "c",
            "label": "Mistä olet kotoisin?",
            "wrongFeedback": "Tämä olisi Woher kommst du?."
          }
        ],
        "correctOption": "a",
        "success": "Oikein. Wie geht's? kysyy vointia.",
        "hint": "Etsi merkitys, joka liittyy vointiin.",
        "reteach": "Wie geht's? = Mitä kuuluu? Wie heißt du? = Mikä nimesi on?",
        "genericWrong": "Wie geht's? = Mitä kuuluu? Wie heißt du? = Mikä nimesi on?"
      }
    },
    {
      "id": "source-explained",
      "phase": "Opetus",
      "kind": "explanation",
      "title": "Franzin ja Gretan toinen oppimistavoite",
      "paragraphs": [
        "Franz tervehtii ja kertoo nimensä. Greta kertoo nimensä ja kysyy samalla Wie geht's? eli mitä kuuluu.",
        "Franz vastaa Es geht mir gut. eli minulle kuuluu hyvää. Se on samaa merkitystä kuin aiemmin opetetut Mir geht's gut. ja Mir geht es gut.",
        "Myöhemmin tekstissä puhutaan opettajasta. Ilmaukset Kennst du den Lehrer? ja er heißt Herr Weiß ovat tässä vain tukirakenteita. Sinun ei tarvitse osata niiden taivutusta tai sijamuotoja.",
        "Keskustelun lopuksi Franz sanoo Bis dann! ja Greta sanoo Wiedersehen!. Molemmat ovat hyvästelyjä.",
        "Tekstin perusteella Franz voi hyvin. Teksti ei kerro yhtä suoraa vointivastausta Gretan omasta olosta, joten siitä ei saa päätellä varmuudella, että hän voi hyvin tai huonosti."
      ],
      "help": [
        {
          "title": "Mitä Es geht mir gut tarkoittaa?",
          "body": "Sama kuin Mir geht es gut: minulle kuuluu hyvää. Opettele kokonaiset fraasit, älä analysoi mir-sanan datiivia."
        },
        {
          "title": "Mitä opettajasta pitää osata?",
          "body": "Riittää tunnistaa, että keskustelu siirtyy voinnista opettajaan. Opettaja ei ole vointikysymyksen vastaaja."
        }
      ]
    },
    {
      "id": "board",
      "phase": "Mallisuoritus",
      "kind": "board",
      "title": "Opettaja poimii vointiin liittyvät repliikit",
      "paragraphs": [
        "Lue taululta avainilmausten eteneminen. Varsinainen kuuden repliikin kokonainen lähdeteksti on kirjan Text B:ssä."
      ],
      "board": [
        {
          "label": "1 · Franz esittelee itsensä",
          "german": "Hallo, ich bin Franz.",
          "meaning": "Franz tervehtii ja kertoo nimensä."
        },
        {
          "label": "2 · Greta kysyy kuulumisia",
          "german": "Wie geht's?",
          "meaning": "Mitä kuuluu? Greta on kysyjä."
        },
        {
          "label": "3 · Franz vastaa",
          "german": "Es geht mir gut.",
          "meaning": "Minulle kuuluu hyvää. Tämä on Franzin vointivastaus."
        },
        {
          "label": "4 · Keskustelu jatkuu",
          "german": "Kennst du den Lehrer?",
          "meaning": "Tunnetko opettajan? Tunnistettava tukirakenne, ei C05:n uusi kielioppi."
        },
        {
          "label": "5 · Lopetus",
          "german": "Bis dann! · Wiedersehen!",
          "meaning": "Nähdään! · Näkemiin! Vointiosio on päättynyt."
        }
      ]
    },
    {
      "id": "textb",
      "phase": "Text B ja mahdollinen kuuntelu",
      "kind": "book",
      "title": "Tutki kaikki kuusi repliikkiä",
      "paragraphs": [
        "Avaa C05:n Text B. Lue koko Franzin ja Gretan kuusi repliikkiä. Jos soitin toimii ja ääni on erikseen hyväksytty, voit kuunnella, mutta tämän tunnin tarkistus ei edellytä ääntä.",
        "Tunnista Greta kysyjänä ja Franz vastaajana. Löydä näkyvästä tekstistä Wie geht's? sekä Es geht mir gut. Jos käytät vain tekstiä, vahvista vain lukeminen, älä kuuntelua.",
        "Äänitteen ja kirjoitetun tekstin vastaavuutta ei ole auditoitu. Tekstivastaus tehtäviin ei todista kuullun ymmärtämistä."
      ],
      "bookLinks": [
        {
          "label": "C05 · Text B",
          "chapterId": "05",
          "section": "text-b",
          "instruction": "Lue koko Franz–Greta-dialogi ja tee tekstin perusteella oikeat kysymykset."
        }
      ],
      "activityId": "textb-studied",
      "activityLabel": "Luin kaikki kuusi repliikkiä ja tunnistin vointifraasit (ei kuuntelumerkintää)"
    },
    {
      "id": "guided",
      "phase": "Ohjattu harjoitus",
      "title": "Kuka kysyy voinnin?",
      "kind": "question",
      "paragraphs": [
        "Etsi lähdetekstin toinen repliikki ja nimeä sen puhuja."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-READ-01",
        "evidenceRole": "practice",
        "prompt": "Kuka sanoo Wie geht's? Text B:ssä?",
        "options": [
          {
            "id": "a",
            "label": "Franz",
            "wrongFeedback": "Franz vastaa kuulumiskysymykseen, mutta ei esitä sitä tässä."
          },
          {
            "id": "b",
            "label": "Greta"
          },
          {
            "id": "c",
            "label": "Herr Weiß",
            "wrongFeedback": "Herr Weiß mainitaan opettajana, eikä hän puhu tässä keskustelussa."
          }
        ],
        "correctOption": "b",
        "success": "Oikein. Greta kysyy Franzilta kuulumisia.",
        "hint": "Katso repliikki, jossa Greta kertoo nimensä.",
        "reteach": "Toisessa repliikissä Greta sanoo Wie geht's?.",
        "genericWrong": "Toisessa repliikissä Greta sanoo Wie geht's?."
      }
    },
    {
      "id": "questions",
      "phase": "Kaksi soveltavaa lähdetehtävää",
      "kind": "book",
      "title": "Tee ja tarkista Text B:n kysymykset 1 ja 2",
      "paragraphs": [
        "Avaa C05:n Text B:n kysymykset C05-TEXTB-Q01 ja C05-TEXTB-Q02. Ensimmäisessä tunnistat kysymyksen, toisessa yhdistät vointivastauksen Franzin tilanteeseen.",
        "Paina kummankin kohdalla Tarkista vastaus. Nykyinen kirjan tallennus säilyttää vastaukset ja tarkistusmerkinnät. Näistä ei muodostu kuuntelupisteitä.",
        "Voit tehdä kysymykset 3 ja 4 lisäharjoitteluna: opettajan nimi ja hyvästely ovat tekstin tukisisältöä."
      ],
      "bookLinks": [
        {
          "label": "C05 · Text B:n neljä kysymystä",
          "chapterId": "05",
          "section": "text-b",
          "instruction": "Vastaa ja tarkista erityisesti C05-TEXTB-Q01 ja C05-TEXTB-Q02."
        }
      ]
    },
    {
      "id": "independent",
      "phase": "Itsenäinen harjoittelu",
      "kind": "question",
      "title": "Kirjoita vastaus ilman näkyvää tekstiä",
      "paragraphs": [
        "Muista Franzin vointivastaus. Kirjoita juuri tekstissä käytetty ilmaisutapa, etkä vain sanaa gut."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-INT-05",
        "evidenceRole": "independent",
        "prompt": "Kirjoita Text B:n Franzin koko vointivastaus (kolmen tai neljän sanan fraasi):",
        "accepted": [
          "Es geht mir gut.",
          "Es geht mir gut"
        ],
        "success": "Oikein. Franz sanoo Es geht mir gut.",
        "hint": "Aloita Es geht ja jatka mir gut.",
        "reteach": "Franzin repliikissä on Es geht mir gut. Muoto tarkoittaa minulle kuuluu hyvää.",
        "genericWrong": "Vertaa ensin koko fraasia: Es geht mir gut.",
        "wrongAnswers": {
          "mir geht's gut": "Tämä tarkoittaa samaa, mutta Text B:n Franz käyttää järjestystä Es geht mir gut. Tässä pyydettiin juuri alkuperäistä repliikkiä.",
          "nicht so gut": "Franzin vointi on tekstissä hyvä, ei kielteinen."
        }
      }
    },
    {
      "id": "application",
      "phase": "Soveltaminen 1",
      "title": "Uusi tilanne: vastaa ystävälle",
      "kind": "question",
      "paragraphs": [
        "Kuvittele, että Greta kysyy sinulta saman kuin Franzilta. Vointisi on hyvä."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-READ-01",
        "evidenceRole": "application",
        "prompt": "Miten vastaat Gretalle luontevasti?",
        "options": [
          {
            "id": "a",
            "label": "Wie heißt du?",
            "wrongFeedback": "Tämä kysyy nimeä eikä vastaa vointiin."
          },
          {
            "id": "b",
            "label": "Es geht mir gut."
          },
          {
            "id": "c",
            "label": "Nicht so gut.",
            "wrongFeedback": "Tämä kertoo ettei mene kovin hyvin. Tilanteessa sanottiin, että voit hyvin."
          }
        ],
        "correctOption": "b",
        "success": "Oikein. Es geht mir gut. sopii myönteiseksi vastaukseksi.",
        "hint": "Muista Franzin repliikki.",
        "reteach": "Es geht mir gut. ja Mir geht's gut. tarkoittavat hyvää vointia.",
        "genericWrong": "Es geht mir gut. ja Mir geht's gut. tarkoittavat hyvää vointia."
      }
    },
    {
      "id": "exit",
      "phase": "Soveltaminen 2 · lopputarkistus",
      "title": "Älä keksi Gretan mielialaa",
      "kind": "question",
      "paragraphs": [
        "Valitse vain se väite, jonka dialogi oikeasti kertoo. Tämä on luetun ymmärtämisen loppukysymys."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-READ-01",
        "evidenceRole": "exit",
        "prompt": "Mitä Gretan omasta voinnista voidaan varmasti päätellä Text B:stä?",
        "options": [
          {
            "id": "a",
            "label": "Hän on väsynyt.",
            "wrongFeedback": "Teksti ei sisällä Gretan omaa lausetta Ich bin müde."
          },
          {
            "id": "b",
            "label": "Hän voi erittäin hyvin.",
            "wrongFeedback": "Teksti ei sisällä Gretan omaa vastausta Sehr gut."
          },
          {
            "id": "c",
            "label": "Teksti ei kerro Gretan vointia suoraan."
          }
        ],
        "correctOption": "c",
        "success": "Oikein. Greta kysyy Franzin kuulumisia mutta ei itse vastaa samanlaiseen kysymykseen.",
        "hint": "Tarkista, kenen kohdalla esiintyy Es geht mir gut.",
        "reteach": "Vain Franz sanoo Es geht mir gut. Älä päättele Gretan mielialaa kysymyksen perusteella.",
        "genericWrong": "Vain Franz sanoo Es geht mir gut. Älä päättele Gretan mielialaa kysymyksen perusteella."
      }
    },
    {
      "id": "summary",
      "phase": "Yhteenveto ja kertaus",
      "kind": "summary",
      "title": "Ymmärrät vointiosan myös lukemalla",
      "paragraphs": [
        "Greta kysyy Wie geht's? ja Franz vastaa Es geht mir gut. Loppuosassa hyvästellään. Pystyit harjoittelemaan pääasioita myös ilman ääntä.",
        "Jos äänitettä ei toistettu hyväksytysti, kuuntelutaito jää tämän työn osalta todentamatta. L026:ssa C05:n kappaletesti arvioi opetettuja ilmauksia tekstin perusteella.",
        "Kertaa myöhemmin kysymys ja Franzin vastaus muistista. Voit lisäksi harjoitella vuoropuhelua ääneen ilman automaattista puhearvosanaa."
      ]
    }
  ]
};
