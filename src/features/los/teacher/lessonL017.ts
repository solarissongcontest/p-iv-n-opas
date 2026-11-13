import type { TeacherLesson } from "./engine.ts";

/** C04 L017: culture-sensitive du/Sie recognition, independent answers and existing C04 workbook. */
export const LOS1_L017_TEACHER: TeacherLesson = {
  "id": "L017",
  "bookId": 1,
  "chapterId": "04",
  "version": "2.0.0-preview.1",
  "title": "Milloin du tai Sie?",
  "objective": "Tunnistan tuttavallisen du-puhuttelun ja kohteliaan Sie-puhuttelun sekä osaan valita muodon tilanteen mukaan ilman ehdotonta ikäsääntöä.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredActivityIds": [
    "register-compared",
    "book-practice-reviewed"
  ],
  "requiredPracticeIds": [
    "C04-EX-01",
    "C04-EX-02",
    "C04-EX-03",
    "C04-EX-04"
  ],
  "scenes": [
    {
      "id": "welcome",
      "phase": "Johdanto",
      "kind": "introduction",
      "title": "Sama kysymys, kaksi puhuttelutapaa",
      "paragraphs": [
        "C02:ssa opit Wie heißt du? ja L014:ssa Woher kommst du? Nyt kohtaat tilanteita, joissa toinen ei ole tuttu ystävä ja kysymys muotoillaan toisin.",
        "Tällä tunnilla tutustut sekä du- että Sie-puhutteluun. Saksassa valinta riippuu suhteesta, ympäristöstä ja keskinäisestä sopimuksesta, ei pelkästään toisen iästä.",
        "Käsittelemme ensin tilanteet, sitten kirjainten ja verbimuotojen eron. Seuraavilla C04-tunneilla luemme aidon muodollisen keskustelun ja harjoittelemme kysymysten muodostamista."
      ]
    },
    {
      "id": "recall",
      "phase": "Muistelu",
      "kind": "question",
      "title": "Miten kysyt tutun nimeä?",
      "paragraphs": [
        "Muista C02:n kysymys ennen kuin vaihdat puhuttelumuotoa."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-04",
        "prompt": "Mikä kysyy tuttavalta, mikä hänen nimensä on?",
        "options": [
          {
            "id": "a",
            "label": "Wie heißt du?"
          },
          {
            "id": "b",
            "label": "Woher kommst du?",
            "wrongFeedback": "Woher kysyy mistä olet kotoisin."
          },
          {
            "id": "c",
            "label": "Guten Tag!",
            "wrongFeedback": "Tämä on tervehdys, ei nimikysymys."
          }
        ],
        "correctOption": "a",
        "success": "Kyllä. Wie heißt du? sisältää tuttavallisen du-muodon.",
        "hint": "Muistatko heiße-verbin du-muodon?",
        "reteach": "Wie heißt du? = Mikä sinun nimesi on?",
        "genericWrong": "Erota tilanteen puhuttelutapa ja valitse sitä vastaava muoto. Lue vaihtoehdot uudelleen."
      }
    },
    {
      "id": "explain",
      "phase": "Opettajan selitys",
      "kind": "explanation",
      "title": "Du on tuttu, Sie kohtelias",
      "paragraphs": [
        "Du on sinä. Sitä käytetään yleensä esimerkiksi kavereiden, ystävien ja monien samanikäisten nuorten kesken.",
        "Sie isolla alkukirjaimella on kohtelias puhuttelu yhdelle tai useammalle henkilölle. Kohtelias kysymys on esimerkiksi Wie heißen Sie? = Mikä Teidän nimenne on?",
        "Asiakaspalvelussa tai tuntemattoman aikuisen kanssa Sie on usein turvallinen aloitus, mutta työpaikoilla, kouluissa ja eri alueilla käytännöt vaihtelevat. Jos toinen ehdottaa du-puhuttelua, sitä voi käyttää yhdessä sovitulla tavalla.",
        "Pienellä kirjoitettu sie voi puolestaan tarkoittaa hän (naispuolinen) tai he. Lauseen alussa iso alkukirjain ei yksin riitä erottamaan merkitystä. Katso asiayhteyttä ja verbimuotoa."
      ],
      "help": [
        {
          "title": "Selitä yksinkertaisemmin",
          "body": "Ystävälle yleensä du. Kohteliaasti tuntemattomalle usein Sie. Sie kirjoitetaan kohteliaassa puhuttelussa isolla."
        },
        {
          "title": "Onko Sie vain iäkkäille?",
          "body": "Ei. Ikä voi vaikuttaa tapaan, mutta myös suhde, tilanne, paikallinen käytäntö ja toisen toive ratkaisevat."
        },
        {
          "title": "Entä hän ja he?",
          "body": "Pienellä kirjoitettu sie voi tarkoittaa häntä tai heitä. Kohteliaassa puhuttelussa Sie kirjoitetaan isolla myös keskellä virkettä."
        }
      ]
    },
    {
      "id": "register-board",
      "phase": "Vaiheittainen opetustaulu",
      "kind": "board",
      "title": "Vertaillaan tilanteet ja ilmaukset",
      "paragraphs": [
        "Näytä ensin tilanne ja ennusta, kumpaa muotoa siinä todennäköisesti käytetään. Katso sitten saksankielinen esimerkki ja perustelu.",
        "Nämä ovat LOS!:n opetusesimerkkejä, eivät M-WB-06:n alkuperäisiä puheenvuoroja."
      ],
      "board": [
        {
          "label": "1 · Tuttu ystävä",
          "german": "Wie heißt du?",
          "meaning": "Ystävien kesken tuttu du-kysymys."
        },
        {
          "label": "2 · Ensimmäinen virallinen asiointi",
          "german": "Wie heißen Sie?",
          "meaning": "Kohtelias Sie ja sitä vastaava heißen-verbi."
        },
        {
          "label": "3 · Kaverilta alkuperä",
          "german": "Woher kommst du?",
          "meaning": "Tuttu du ja kommst."
        },
        {
          "label": "4 · Kohteliaasti alkuperä",
          "german": "Woher kommen Sie?",
          "meaning": "Sie ja kommen kuuluvat yhteen."
        },
        {
          "label": "5 · Tervehdys",
          "german": "Guten Tag!",
          "meaning": "Sopii kohteliaaseen tilanteeseen."
        },
        {
          "label": "6 · Hyvästely",
          "german": "Auf Wiedersehen!",
          "meaning": "Kohteliaampi vaihtoehto kuin rento Tschüss!."
        }
      ]
    },
    {
      "id": "guided",
      "phase": "Ohjattu harjoittelu",
      "kind": "question",
      "title": "Valitaan muoto yhdessä",
      "paragraphs": [
        "Tuttu opiskelukaveri esittelee itsensä. Valitse tähän arkitilanteeseen sopiva kysymys."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-04",
        "prompt": "Miten kysyt tutun kaverin nimeä?",
        "options": [
          {
            "id": "a",
            "label": "Wie heißen Sie?",
            "wrongFeedback": "Tämä on kohtelias Sie-kysymys."
          },
          {
            "id": "b",
            "label": "Wie heißt du?"
          },
          {
            "id": "c",
            "label": "Woher kommen Sie?",
            "wrongFeedback": "Tämä kysyy kohteliaasti alkuperää, ei nimeä."
          }
        ],
        "correctOption": "b",
        "success": "Oikein. Kaverin nimeä kysyt usein Wie heißt du?",
        "hint": "Kaveri on tässä jo tuttu.",
        "reteach": "Du ja heißt sopivat yhteen.",
        "genericWrong": "Erota tilanteen puhuttelutapa ja valitse sitä vastaava muoto. Lue vaihtoehdot uudelleen."
      }
    },
    {
      "id": "culture",
      "phase": "Kulttuuri ja käyttö",
      "kind": "explanation",
      "title": "Ei yksinkertaista ikärajaa",
      "paragraphs": [
        "Saksankielisissä maissa opettajan, asiakkaan tai uuden työtoverin puhuttelu ei määräydy vain syntymävuoden perusteella. Oppilaitoksen tai työpaikan oma käytäntö voi olla ratkaiseva.",
        "Tuttuuden, kohteliaisuuden ja etäisyyden ilmaiseminen on kulttuurinen valinta. Sie ei tarkoita, että toinen ihminen olisi tärkeämpi, eikä du automaattisesti epäkohteliasta.",
        "Jos et tunne tilanteen tapaa, voit aloittaa kohteliaasti ja seurata vastapuolen omaa ilmaisua. Älä käytä Sie-muotoa jokaisessa nuorten välisessä keskustelussa vain varmuuden vuoksi."
      ]
    },
    {
      "id": "independent",
      "phase": "Itsenäinen ymmärtäminen",
      "kind": "question",
      "title": "Tunnista kohtelias puhuttelu",
      "paragraphs": [
        "Peitä opetustaulu ja vastaa ilman mallia."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-04",
        "evidenceRole": "independent",
        "prompt": "Mikä kysymys sopii, kun käytät kohteliasta Sie-puhuttelua?",
        "options": [
          {
            "id": "a",
            "label": "Wie heißt du?",
            "wrongFeedback": "Du ja heißt viittaavat tuttavalliseen kysymykseen."
          },
          {
            "id": "b",
            "label": "Wie heißen Sie?"
          },
          {
            "id": "c",
            "label": "Wie heißen du?",
            "wrongFeedback": "Du ei muodosta paria heißen-muodon kanssa."
          }
        ],
        "correctOption": "b",
        "success": "Oikein. Kohtelias kysymys on Wie heißen Sie?",
        "hint": "Muista isolla S kirjoitettu puhuttelu.",
        "reteach": "Sie ja heißen ovat yhdessä: Wie heißen Sie?",
        "genericWrong": "Erota tilanteen puhuttelutapa ja valitse sitä vastaava muoto. Lue vaihtoehdot uudelleen."
      }
    },
    {
      "id": "book",
      "phase": "Oppikirja",
      "kind": "book",
      "title": "Harjoittele kirjan oikeilla C04-tehtävillä",
      "paragraphs": [
        "Avaa saman LOS! 1 -kirjan C04-sanasto ja lue du- sekä Sie-esimerkit. Tee sen jälkeen C04-EX-01–04. Ne ovat jo olemassa olevia kirjan tehtäviä, eivät tämän opettajan luomia rinnakkaisvastauksia.",
        "Pelkkä sivun avaaminen ei riitä, vaan kirjoita vastaukset kirjaan. Takaisin palatessasi tehtävät luetaan samasta kappaletallennuksesta."
      ],
      "bookLinks": [
        {
          "label": "C04 · Sanasto",
          "chapterId": "04",
          "section": "vocabulary",
          "instruction": "Tutki du- ja Sie-puhuttelun sanasto."
        },
        {
          "label": "C04 · Harjoitukset",
          "chapterId": "04",
          "section": "practice",
          "instruction": "Tee C04-EX-01–04."
        }
      ],
      "activityId": "book-practice-reviewed",
      "activityLabel": "Harjoittelin ja tallensin C04-EX-01–04 kirjaan"
    },
    {
      "id": "application",
      "phase": "Uusi tilanne",
      "kind": "question",
      "title": "Asiointi palvelupisteellä",
      "paragraphs": [
        "Olet ensi kertaa saksankielisessä palvelupisteessä. Et tunne työntekijää, ja päätät aloittaa kohteliaasti."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-04",
        "evidenceRole": "application",
        "prompt": "Mikä kysymys pyytää työntekijän nimeä kohteliaasti?",
        "options": [
          {
            "id": "a",
            "label": "Wie heißt du?",
            "wrongFeedback": "Tuttu du-muoto ei vastaa valitsemaasi kohteliasta tyyliä."
          },
          {
            "id": "b",
            "label": "Woher kommst du?",
            "wrongFeedback": "Tämä kysyy alkuperää ja käyttää du-puhuttelua."
          },
          {
            "id": "c",
            "label": "Wie heißen Sie?"
          }
        ],
        "correctOption": "c",
        "success": "Oikein. Muodollisessa tilanteessa Wie heißen Sie? vastaa valittua puhuttelutapaa.",
        "hint": "Etsi isolla S kirjoitettu Sie.",
        "reteach": "Wie heißen Sie? on kohtelias nimikysymys. Woher kommen Sie? kysyy puolestaan alkuperää.",
        "genericWrong": "Erota tilanteen puhuttelutapa ja valitse sitä vastaava muoto. Lue vaihtoehdot uudelleen."
      }
    },
    {
      "id": "register",
      "phase": "Oma harjoittelu",
      "kind": "activity",
      "title": "Vertaa kahta omaa kuvitteellista tilannetta",
      "paragraphs": [
        "Keksi mielessäsi kaksi tilannetta: keskustelu saman ikäisen kaverin kanssa ja kohtelias asiointitilanne. Sano kummassakin mielessäsi sopiva nimikysymys.",
        "Tämä on oma harjoitteluvahvistuksesi, ei koneen todentama puhe- tai vuorovaikutustaito."
      ],
      "activityId": "register-compared",
      "activityLabel": "Vertasin du- ja Sie-tilanteita ja harjoittelin kysymyksiä"
    },
    {
      "id": "exit",
      "phase": "Lopputarkistus",
      "kind": "question",
      "title": "Mikä väite pitää paikkansa?",
      "paragraphs": [
        "Tämä tarkistaa kulttuurisen ymmärtämisen, ei saman esimerkkikysymyksen muistamista."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-04",
        "evidenceRole": "exit",
        "prompt": "Mikä selitys puhuttelutavan valinnasta on paras?",
        "options": [
          {
            "id": "a",
            "label": "Kaikille yli 30-vuotiaille sanotaan aina Sie.",
            "wrongFeedback": "Ikä ei yksin määrää jokaisen tilanteen puhuttelua."
          },
          {
            "id": "b",
            "label": "Kaikki nuoret käyttävät aina Sie.",
            "wrongFeedback": "Nuorten kesken du on yleensä tavallinen."
          },
          {
            "id": "c",
            "label": "Puhuttelutapa riippuu suhteesta ja tilanteen käytännöistä."
          }
        ],
        "correctOption": "c",
        "success": "Juuri näin. Yleispätevä ikäraja ei ole luotettava sääntö.",
        "hint": "Mieti ympäristöä, suhdetta ja yhteistä käytäntöä.",
        "reteach": "Du ja Sie ovat tilanteeseen sidottuja puhuttelutapoja.",
        "genericWrong": "Erota tilanteen puhuttelutapa ja valitse sitä vastaava muoto. Lue vaihtoehdot uudelleen."
      }
    },
    {
      "id": "summary",
      "phase": "Yhteenveto",
      "kind": "summary",
      "title": "Nyt tiedät, miksi tarvitaan kaksi puhuttelutapaa",
      "paragraphs": [
        "Tunnistit du- ja Sie-tilanteet, opit kohteliaan kysymyksen Wie heißen Sie? ja kertasit hyvän aloitustervehdyksen.",
        "L018:ssa luemme kokonaisen alkuperäisen Herr Schmidt–Herr Standish -keskustelun. Siinä kohtelias puhuttelu näkyy ihmisten oikeassa tekstissä, vaikka kaikki kielioppimuodot eivät ole vielä aktiivisesti opeteltavia."
      ]
    }
  ]
};
