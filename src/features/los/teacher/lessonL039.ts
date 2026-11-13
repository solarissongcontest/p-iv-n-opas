import type { TeacherLesson } from "./engine.ts";
/** C07 L039: chapter-local fictional spelling application draft; no new persistence and no PII. */
export const LOS1_L039_TEACHER: TeacherLesson = {
  "id": "L039",
  "bookId": 1,
  "chapterId": "07",
  "version": "2.0.0-preview.1",
  "title": "Tavaa ja täytä harjoituslomake",
  "objective": "Kirjoitan kahdeksan kuvitteellisen nimen kirjaimet, neljä erillistä kuvitteellista numeroriviä ja turvallisen harjoituslomakkeen.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredActivityIds": [
    "activity-L039"
  ],
  "requiredPracticeIds": [],
  "requiredCheckedIds": [
    "C07-SOURCE-Q03",
    "C07-SOURCE-Q04"
  ],
  "applicationDraftMinLength": 120,
  "scenes": [
    {
      "id": "welcome",
      "kind": "introduction",
      "title": "Kirjoita oma turvallinen harjoituslomake",
      "phase": "Aloitus",
      "paragraphs": [
        "Tässä tunnissa yhdistät nimet, kirjaimet ja C07:n puhelinpalveludialogin kirjoitusasun. Tehtävä on täysin fiktiivinen: et tarvitse omaa nimeäsi, syntymäaikaasi tai oikeaa puhelinnumeroa.",
        "Kirjan Sovella-sivulla on kahdeksan valmista kuvitteellista etunimeä ja neljä erillistä numerosarjaa, joita ei saa tulkita oikeiksi yhteystiedoiksi.",
        "Lopussa opettaja tarkistaa, että Sovella-sivulle on tallennettu riittävän laaja teksti, sekä sen, että kaksi aitoa alkuperäistekstin lisäkysymystä on tarkistettu. Tekstin sisältöä ei automaattisesti arvostella."
      ]
    },
    {
      "id": "recall",
      "kind": "question",
      "title": "Mikä tarkoittaa kirjainta?",
      "phase": "Muistelu",
      "paragraphs": [
        "Mieti, mitä sana Buchstabe tarkoittaa. Ei koko kirjaa, vaan yhtä merkkiä."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-WRITE-07",
        "evidenceRole": "practice",
        "prompt": "Mitä der Buchstabe tarkoittaa?",
        "options": [
          {
            "id": "a",
            "label": "kirjain"
          },
          {
            "id": "b",
            "label": "puhelinnumero",
            "wrongFeedback": "Puhelinnumero on Telefonnummer, ei Buchstabe."
          },
          {
            "id": "c",
            "label": "kirja",
            "wrongFeedback": "Buch tarkoittaa kirjaa, mutta Buchstabe tarkoittaa kirjainta."
          }
        ],
        "correctOption": "a",
        "success": "Der Buchstabe tarkoittaa kirjainta.",
        "hint": "Sanan loppu -stabe liittyy kirjaimeen.",
        "reteach": "Der Buchstabe tarkoittaa kirjainta. Sanan loppu -stabe liittyy kirjaimeen.",
        "genericWrong": "Tarkista nimien kirjoitusasu ja kirjainten järjestys. Sanan loppu -stabe liittyy kirjaimeen."
      }
    },
    {
      "id": "explain",
      "kind": "explanation",
      "title": "Nimen tavaaminen ja numeron merkitseminen eivät ole sama asia",
      "phase": "Opettajan malli",
      "paragraphs": [
        "Tavaaminen tarkoittaa nimen kirjoitusmerkkien kertomista järjestyksessä. Esimerkiksi Anna kirjoitetaan A–N–N–A ja Emil E–M–I–L.",
        "Numerosarja voidaan kirjata erillisinä numeroina esimerkiksi 1–0–2–3. Se ei tässä tehtävässä ole puhelinnumero, vaan koulun harjoituslomakkeen keksitty jono.",
        "Alkuperäisessä Text A:ssa Franz tavaa etu- ja sukunimeä esimerkkisanoilla, esimerkiksi zweimal L wie Ludwig. Sana zweimal kertoo, että kirjain toistetaan kaksi kertaa.",
        "Sana Frau sukunimen edellä on kohtelias puhuttelu, esimerkiksi Frau Bolliger. Se ei ole tavattavan nimen kirjain eikä puhelinnumeron osa.",
        "Kirjan harjoitus käyttää kahdeksaa kuvitteellista etunimeä Mia, Lena, Uwe, Leo, Anna, Emil, Greta ja Jonas. Numerorivien tulee olla erillisiä kouluharjoituksen sarjoja."
      ],
      "help": [
        {
          "title": "Mitä zweimal tarkoittaa?",
          "body": "Kaksi kertaa. Alkuperäisessä tekstissä Franz sanoo zweimal L, joten L kuuluu nimeen kahdesti."
        },
        {
          "title": "Miksi Frau on nimen edellä?",
          "body": "Frau on saksan kohtelias puhuttelusana rouva. Sukunimeä kirjoitettaessa Frau ei ole osa varsinaista sukunimeä."
        },
        {
          "title": "Voiko harjoitukseen kirjoittaa oikean numeroni?",
          "body": "Ei ole tarpeen eikä suositeltavaa. Tehtävä käyttää vain neljää selvästi fiktiivistä lyhyttä NUMEROJONOA, ei puhelinnumeroita tai muita yhteystietoja."
        }
      ]
    },
    {
      "id": "board",
      "kind": "board",
      "title": "Malli nimen tavaamiseen ja harjoitusrivin täyttämiseen",
      "phase": "Opetustaulu",
      "paragraphs": [
        "Seuraa esimerkkejä ja muodosta niiden jälkeen muut nimet. Tämä taulu on LOS!:n itse laatima soveltamismalli, ei uusi alkuperäiskeskustelu."
      ],
      "board": [
        {
          "label": "Nimi · Mia",
          "german": "M – I – A",
          "meaning": "Kolme kirjainmerkkiä."
        },
        {
          "label": "Nimi · Anna",
          "german": "A – N – N – A",
          "meaning": "Sama kirjain kahdesti keskellä."
        },
        {
          "label": "Nimi · Emil",
          "german": "E – M – I – L",
          "meaning": "Neljä kirjainta."
        },
        {
          "label": "Nimi · Greta",
          "german": "G – R – E – T – A",
          "meaning": "Viisi kirjainta."
        },
        {
          "label": "Lomake · kuvitteellinen nimi",
          "german": "Name: Lena",
          "meaning": "Ei henkilön oikeaa nimeä."
        },
        {
          "label": "Lomake · numerosarja",
          "german": "Zahlenfolge: 1 – 0 – 2 – 3",
          "meaning": "Neljä irrallista harjoitusnumeroa, ei yhteystieto."
        }
      ]
    },
    {
      "id": "guided",
      "kind": "question",
      "title": "Kuinka monta L-kirjainta?",
      "phase": "Ohjattu harjoitus",
      "paragraphs": [
        "Franz tavaa nimessä Bolliger L-kirjaimen kaksi kertaa. Mitä hän tarkoittaa sanalla zweimal?"
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-WRITE-07",
        "evidenceRole": "practice",
        "prompt": "Mikä on zweimal L merkitykseltään?",
        "options": [
          {
            "id": "a",
            "label": "L-kirjain kolme kertaa.",
            "wrongFeedback": "Dreimal olisi kolme kertaa, zweimal on kaksi kertaa."
          },
          {
            "id": "b",
            "label": "L-kirjain kahdesti."
          },
          {
            "id": "c",
            "label": "L-kirjain kerran.",
            "wrongFeedback": "Einmal tarkoittaisi kerran."
          }
        ],
        "correctOption": "b",
        "success": "Zweimal L tarkoittaa L-kirjainta kahdesti.",
        "hint": "Zwei = kaksi.",
        "reteach": "Zweimal L tarkoittaa L-kirjainta kahdesti. Zwei = kaksi.",
        "genericWrong": "Tarkista nimien kirjoitusasu ja kirjainten järjestys. Zwei = kaksi."
      }
    },
    {
      "id": "source",
      "kind": "book",
      "title": "Etsi esimerkkisanoilla tavaaminen alkuperäistekstistä",
      "phase": "Alkuperäisteksti",
      "paragraphs": [
        "Avaa C07:n viiden repliikin Text A ja etsi Franzin neljäs repliikki. Siinä tavataan Claudia ja Bolliger käyttämällä kirjaimen jälkeen sanaa wie ja kirjainesimerkkiä.",
        "Lue keskustelun kokonaisuus, mutta älä käytä siinä mainittuja henkilöitä tai puhelinnumeron tiedustelua oikeaan yhteydenottoon. Alkuperäinen tekstikin jättää numeron pois."
      ],
      "bookLinks": [
        {
          "chapterId": "07",
          "section": "text",
          "label": "C07 · Franzin tavattu nimi kokonaisessa Text A:ssa",
          "instruction": "Lue neljäs repliikki ja vertaa zweimal L -kohtaa."
        }
      ]
    },
    {
      "id": "checked",
      "kind": "book",
      "title": "Tarkista Text A:n kaksi loppukysymystä",
      "phase": "Tekstin ymmärtäminen",
      "paragraphs": [
        "Siirry kirjan C07:n Ymmärrä-sivulle ja tee C07-SOURCE-Q03, joka kysyy sanan zweimal merkityksen.",
        "Tee samalla C07-SOURCE-Q04, joka kysyy mitä Frau tarkoittaa sukunimen edellä. Tarkista molemmat erikseen.",
        "Nämä ovat aidot erilliset kysymykset. Ensimmäiset kaksi Text A:n kysymystä tarkistettiin L037-tunnilla."
      ],
      "bookLinks": [
        {
          "chapterId": "07",
          "section": "understand",
          "label": "C07 · Text A · kysymykset 3 ja 4",
          "instruction": "Tarkista C07-SOURCE-Q03 ja C07-SOURCE-Q04."
        }
      ]
    },
    {
      "id": "independent",
      "kind": "question",
      "title": "Tavaa Greta kirjain kirjaimelta",
      "phase": "Itsenäinen harjoitus",
      "paragraphs": [
        "Peitä malli. Kirjoita vastaukseksi yksittäisistä kirjaimista muodostettu nimi ilman väliviivoja."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-WRITE-07",
        "evidenceRole": "independent",
        "prompt": "Kirjoita kirjainsarjan G – R – E – T – A muodostama nimi.",
        "accepted": [
          "Greta"
        ],
        "success": "Greta on oikea kirjoitusasu.",
        "hint": "Nimessä on viisi kirjainta järjestyksessä G R E T A.",
        "reteach": "Greta on oikea kirjoitusasu. Nimessä on viisi kirjainta järjestyksessä G R E T A.",
        "genericWrong": "Kirjoita täsmälleen pyydetty kirjainjono. Nimessä on viisi kirjainta järjestyksessä G R E T A.",
        "wrongAnswers": {
          "grita": "Kolmas kirjain on E, ei I.",
          "gerta": "Kirjainten oikea järjestys on G R E T A."
        }
      }
    },
    {
      "id": "application",
      "kind": "question",
      "title": "Valitse turvallinen harjoituslomake",
      "phase": "Soveltaminen",
      "paragraphs": [
        "Suunnittelet lomakkeeseen neljä satunnaista lyhyttä numerosarjaa ja vain kuvitteellisen etunimen."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-WRITE-07",
        "evidenceRole": "application",
        "prompt": "Mikä täyttää tehtävän ajatuksen turvallisesti?",
        "options": [
          {
            "id": "a",
            "label": "Käytän omaa oikeaa puhelinnumeroani ja sähköpostiani.",
            "wrongFeedback": "Tässä tehtävässä ei pyydetä oikeita yhteystietoja."
          },
          {
            "id": "b",
            "label": "Kirjoitan julkisen puhelinpalvelun oikean asiakkaan numeron.",
            "wrongFeedback": "Alkuperäinen teksti ei anna kokonaisnumeroa, eikä sellaista pidä etsiä."
          },
          {
            "id": "c",
            "label": "Käytän nimiä Mia ja Lena sekä neljää keksittyä nelinumeroista numerosarjaa."
          }
        ],
        "correctOption": "c",
        "success": "Kuvitteelliset nimet ja numerosarjat riittävät.",
        "hint": "Harjoitus ei tarvitse oikeita yhteystietoja.",
        "reteach": "Kuvitteelliset nimet ja numerosarjat riittävät. Harjoitus ei tarvitse oikeita yhteystietoja.",
        "genericWrong": "Tarkista nimien kirjoitusasu ja kirjainten järjestys. Harjoitus ei tarvitse oikeita yhteystietoja."
      }
    },
    {
      "id": "write",
      "kind": "book",
      "title": "Tallenna varsinainen kahdeksan nimen harjoitus",
      "phase": "Kirjan soveltamistehtävä",
      "paragraphs": [
        "Kirjoita C07:n Sovella-sivulle kahdeksan kuvitteellista nimeä kirjain kirjaimelta: Mia, Lena, Uwe, Leo, Anna, Emil, Greta ja Jonas.",
        "Tee lisäksi oma kuvitteellinen harjoituslomake, jossa on yksi esimerkkietunimi sekä neljä erillistä numeroriviä. Halutessasi käytä kirjan esimerkin lyhyitä jonoja.",
        "Kirjoita myös Wie schreibt man das? ja Bitte buchstabieren Sie. Nämä ovat hyödyllisiä, kun pyydät kirjoitusasua tai tavaamista.",
        "Opettajatunti edellyttää Sovella-sivun tallennetun tekstin olevan vähintään 120 merkkiä pitkä. Määrä kertoo vain, että tekstisovellus ei ole tyhjä; sovellus ei väitä tarkistavansa jokaisen nimen tai rivin oikeellisuutta."
      ],
      "bookLinks": [
        {
          "chapterId": "07",
          "section": "apply",
          "label": "C07 · Sovella · kahdeksan nimeä ja neljä numerojonoa",
          "instruction": "Kirjoita ja tallenna koko kuvitteellinen harjoitussovellus."
        }
      ]
    },
    {
      "id": "activity",
      "kind": "activity",
      "title": "Tarkista omat rivit mallin avulla",
      "phase": "Oma työskentely",
      "paragraphs": [
        "Kun kirjoitus on tallennettu Sovella-sivulle, käytä kirjan itsearvioinnin tarkistuslistaa: löytyvätkö kahdeksan nimeä, neljä numeroriviä, oikeat erikoismerkit ja tavallinen kohtelias tavaamispyyntö?",
        "Vahvista vain oma työsi. Vaikka teksti on tallessa, kirjoitusasun automaattista tarkistusta tai suullisen tavoitteen todistusta ei ole."
      ],
      "activityId": "activity-L039",
      "activityLabel": "Tarkistin itse kahdeksan nimen ja neljän numerorivin harjoituksen"
    },
    {
      "id": "exit",
      "kind": "question",
      "title": "Mikä lähde kertoo todellisuudessa numeron?",
      "phase": "Lopputarkistus",
      "paragraphs": [
        "Muista erillisten numerosarjojen ja alkuperäisen puhelinnumeroa koskevan keskustelun ero."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-WRITE-07",
        "evidenceRole": "exit",
        "prompt": "Mikä on oikein C07:n sovelluksesta ja alkutekstistä?",
        "options": [
          {
            "id": "a",
            "label": "Lomakkeen numerot ovat harjoituksia eikä alkuperäislähteen puhelinnumeron loppuosaa pidä keksiä."
          },
          {
            "id": "b",
            "label": "Alkutekstissä julkaistaan kokonainen oikea puhelinnumero, joka täytyy kopioida.",
            "wrongFeedback": "Viimeisessä repliikissä numero jätetään näkyvän ellipsin kohdalle."
          },
          {
            "id": "c",
            "label": "Harjoituksen pitää sisältää opiskelijan oikeat yhteystiedot.",
            "wrongFeedback": "Kirjan ohjeet vaativat kuvitteellisia nimiä ja irrallisia numerosarjoja."
          }
        ],
        "correctOption": "a",
        "success": "Oikeat yhteystiedot eivät kuulu harjoitukseen.",
        "hint": "Vertaile kirjan fiktiivistä sovellusta ja alkuperäistekstin ellipsiä.",
        "reteach": "Oikeat yhteystiedot eivät kuulu harjoitukseen. Vertaile kirjan fiktiivistä sovellusta ja alkuperäistekstin ellipsiä.",
        "genericWrong": "Tarkista nimien kirjoitusasu ja kirjainten järjestys. Vertaile kirjan fiktiivistä sovellusta ja alkuperäistekstin ellipsiä."
      }
    },
    {
      "id": "summary",
      "kind": "summary",
      "title": "Kirjoitusharjoitus on tallessa",
      "phase": "Yhteenveto",
      "paragraphs": [
        "Harjoittelit kahdeksaa kuvitteellista nimeä, neljää numeroriviä ja kahta kohteliasta fraasia. Tunnistit myös sanan zweimal sekä Frau-puhuttelun.",
        "Opettaja tarkistaa vain tallennetun laajuuden, alkuperäislähteen kaksi kysymystä ja oman vahvistuksesi, ei esitä jokaisen kirjoitetun kirjainrivin laatua automaattisesti arvioiduksi.",
        "L040:ssa käytät samaa tallennettua Sovella-tekstiä ja teet kirjan oikean 15 tehtävän C07-kappaletestin."
      ]
    }
  ]
};
