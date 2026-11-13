import type { TeacherLesson } from "./engine.ts";
/** C10 L054: bounded third-person grammar and honest reusable writing evidence. */
export const LOS1_L054_TEACHER: TeacherLesson = {
  "id": "L054",
  "bookId": 1,
  "chapterId": "10",
  "version": "2.0.0-preview.1",
  "title": "Rakenna kaksi keskustelua",
  "objective": "Kirjoitan kaksi erillistä 6–8 repliikin du- ja Sie-kohtaamista sekä neljä virkettä kuvitteellisesta kolmannesta henkilöstä; tarkistan kaksi todellista Text B -tehtävää.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredPracticeIds": [
    "C10-EX-12",
    "C10-EX-13"
  ],
  "requiredCheckedIds": [
    "C10-TEXTB-Q02",
    "C10-TEXTB-Q03"
  ],
  "requiredActivityIds": [
    "c10-teacher-L054"
  ],
  "scenes": [
    {
      "id": "welcome",
      "kind": "introduction",
      "title": "Nyt pelkät irralliset fraasit eivät riitä",
      "phase": "Aloitus",
      "paragraphs": [
        "C10:n Sovella-osiossa kirjoitetaan kaksi erillistä kuuden–kahdeksan repliikin keskustelua. Ensimmäinen on kahden nuoren du-kohtaaminen ja toinen kohtelias Sie-kohtaaminen opettajan kanssa.",
        "Kirjoita niiden jälkeen vielä neljän lyhyen virkkeen esittely kuvitteellisesta kolmannesta henkilöstä. Älä käytä todellisia nimiä, puhelinnumeroita tai muita yhteystietoja.",
        "Text B:ssä on aiempi Thomasin ja Takashin neljän repliikin autenttinen keskustelu M-COM-02. Se on sama jo C02/C03:ssa käytetty lähde, ei uusi Berna-video. Ääni on laitetestaamaton."
      ]
    },
    {
      "id": "recall",
      "kind": "question",
      "title": "Mitä tarkoittaa Das ist Peter?",
      "phase": "Muistelu",
      "paragraphs": [
        "Aloita ennen omien keskustelujen kirjoittamista tutusta lähteen kolmannesta repliikistä."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-MEET-10",
        "evidenceRole": "practice",
        "prompt": "Mitä Thomas tarkoittaa sanoessaan Das ist Peter?",
        "options": [
          {
            "id": "a",
            "label": "Peterin nimi onko?",
            "wrongFeedback": "Se ei ole kysymys."
          },
          {
            "id": "b",
            "label": "Peter on minun kotimaani.",
            "wrongFeedback": "Se ei ole alkuperäfraasi."
          },
          {
            "id": "c",
            "label": "Tämä on Peter."
          }
        ],
        "correctOption": "c",
        "success": "Das ist Peter. esittelee kolmannen henkilön.",
        "hint": "Das ist = tämä on.",
        "reteach": "Das ist Peter. esittelee kolmannen henkilön. Das ist = tämä on.",
        "genericWrong": "Vertaa subjektia ja verbimuotoa. Das ist = tämä on."
      }
    },
    {
      "id": "explain",
      "kind": "explanation",
      "title": "Du ja Sie kohtaavat eri tilanteissa",
      "phase": "Opetus",
      "paragraphs": [
        "Keskustelu A: kaksi tuttavallista nuorta. Aloita Hallo! ja käytä Wie heißt du?, Woher kommst du? ja Wie geht's?. Vastaa lyhyillä Ich heiße / Ich komme / Gut, danke -ilmauksilla.",
        "Keskustelu B: opiskelija tapaa opettajan. Aloita Guten Tag! ja käytä Wie heißen Sie? sekä Woher kommen Sie?. Tarvittaessa sano Bitte langsamer. Lopeta Auf Wiedersehen!.",
        "Kummassakin keskustelussa pitää olla erilliset 6–8 puheenvuoroa. Laske vuorot itse. Vältä mallin kopioimista kokonaisena ilman omaa yritystä.",
        "Kolmas henkilö esitellään neljällä helpolla virkkeellä. Malli: Das ist Leo. Er heißt Leo. Er kommt aus Finnland. Er ist siebzehn Jahre alt.",
        "Text B:n Thomas sanoo Wir kommen aus Berlin. Wir on tässä tunnistettava me-pronomini. Systemaattista monikon taivutusta ei vielä vaadita omassa sovelluksessa.",
        "Tallennuksen vähimmäispituus on opintopolun mukaan 80 merkkiä. Koska kaksi pitkää keskustelua ja neljä virkettä ovat tätä pidempiä, laske vuorot ja virkkeet lisäksi itse tarkistuslistalla. Merkkimäärä ei ole automaattinen laatutarkistus."
      ],
      "help": [
        {
          "title": "Mitä eroa du ja Sie -keskusteluissa?",
          "body": "Du: Wie heißt du?, Woher kommst du? Sie: Wie heißen Sie?, Woher kommen Sie?. Kohtelias Sie käyttää monikon näköistä verbimuotoa."
        },
        {
          "title": "Mikä lasketaan yhdeksi repliikiksi?",
          "body": "Yksi puhujan puheenvuoro, esimerkiksi Mia: Hallo! Seuraavan puhujan oma vastaus on seuraava repliikki."
        },
        {
          "title": "Mitä kolmannesta henkilöstä kirjoitetaan?",
          "body": "Neljä omaa virkettä: esittely, nimi, alkuperä ja ikä tai muu tuttu perustieto. Käytä er/sie-muotoja."
        },
        {
          "title": "Miksi Wir kommen ei ole pakollinen uusi paradigma?",
          "body": "Se esiintyy alkuperäisessä Thomasin repliikissä, ja merkityksen tunnistaminen riittää tässä. Oma ydintuottaminen perustuu ich, du ja er/sie."
        }
      ]
    },
    {
      "id": "board",
      "kind": "board",
      "title": "Kaksi kohtaamista ja kolmas henkilö",
      "phase": "Opetustaulu",
      "paragraphs": [
        "Opetustaulu on itse kirjoitettu malli. Se ei korvaa kirjan alkuperäistä Text B -dialogia."
      ],
      "board": [
        {
          "label": "A · tervehdys",
          "german": "Hallo!",
          "meaning": "Kaksi tuttavaa."
        },
        {
          "label": "A · puhuttelu",
          "german": "Wie heißt du? · Woher kommst du?",
          "meaning": "Du-muodot."
        },
        {
          "label": "B · tervehdys",
          "german": "Guten Tag!",
          "meaning": "Opettajan kohtaaminen."
        },
        {
          "label": "B · puhuttelu",
          "german": "Wie heißen Sie? · Woher kommen Sie?",
          "meaning": "Kohteliaat Sie-muodot."
        },
        {
          "label": "B · apupyyntö",
          "german": "Bitte langsamer.",
          "meaning": "Tarvittaessa hitaammin."
        },
        {
          "label": "Kolmas henkilö",
          "german": "Das ist Leo. Er heißt Leo. Er kommt aus Finnland. Er ist siebzehn.",
          "meaning": "Neljä lyhyttä er-muotoista virkettä."
        }
      ]
    },
    {
      "id": "guided",
      "kind": "question",
      "title": "Puhuttelet opettajaa",
      "phase": "Ohjattu harjoitus",
      "paragraphs": [
        "Valitse opettajalle sopiva nimen kysyminen."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-MEET-10",
        "evidenceRole": "practice",
        "prompt": "Mikä on kohtelias muoto?",
        "options": [
          {
            "id": "a",
            "label": "Wie heißt du?",
            "wrongFeedback": "Du on tuttavallinen."
          },
          {
            "id": "b",
            "label": "Wie heißen Sie?"
          },
          {
            "id": "c",
            "label": "Wie heißt Sie?",
            "wrongFeedback": "Sie tarvitsee heißen."
          }
        ],
        "correctOption": "b",
        "success": "Wie heißen Sie? sopii opettajalle.",
        "hint": "Sie + heißen.",
        "reteach": "Wie heißen Sie? sopii opettajalle. Sie + heißen.",
        "genericWrong": "Vertaa subjektia ja verbimuotoa. Sie + heißen."
      }
    },
    {
      "id": "source",
      "kind": "book",
      "title": "Lue koko neljän repliikin Text B",
      "phase": "Kirjan malli",
      "paragraphs": [
        "Text B:ssä Takashi ja Thomas esittäytyvät. Kolmannessa repliikissä Thomas sanoo Das ist Peter. Wir kommen aus Berlin. Neljännessä Takashi kertoo tulevansa Kiotosta.",
        "Tämä on kokonainen, aiemmin jo C02/C03:ssa käytetty M-COM-02-lähde. Ääntä voi kokeilla, mutta kuulemista tai puhetta ei arvioida automaattisesti.",
        "Älä nimeä tätä uutta Haraldin tai Bernan haastattelua vastaavaksi lähteeksi. Harald on erillinen 14 repliikin Text A; Bernan vertailu ei ole tällä hetkellä kirjan Text B:n sisältö."
      ],
      "bookLinks": [
        {
          "chapterId": "10",
          "section": "text-b",
          "label": "C10 · Thomas ja Takashi, 4 repliikkiä",
          "instruction": "Lue koko M-COM-02-keskustelu ja etsi Das ist Peter."
        }
      ]
    },
    {
      "id": "checked",
      "kind": "book",
      "title": "Tarkista kaksi todellista Text B -kysymystä",
      "phase": "Luetun ymmärtäminen",
      "paragraphs": [
        "Tee C10-TEXTB-Q02, jossa kysytään ketä Thomas esittelee, ja C10-TEXTB-Q03, jossa kysytään mistä Thomas ja Peter ovat kotoisin.",
        "Valitse vastaukset lukemastasi dialogista ja paina kummankin Tarkista vastaus. Niiden tekeminen ei tarkoita, että ääni olisi kuunneltu tai tekstistä olisi tullut uusi erillinen alkuperäislähde."
      ],
      "bookLinks": [
        {
          "chapterId": "10",
          "section": "text-b",
          "label": "C10 · Text B Q02 ja Q03",
          "instruction": "Vastaa ja tarkista Peterin esittely ja Berliinin alkuperä."
        }
      ]
    },
    {
      "id": "practice",
      "kind": "book",
      "title": "Kertaa kaksi oikeaa Sie-kysymystä",
      "phase": "Oikeat kirjatehtävät",
      "paragraphs": [
        "Tee C10-EX-12 (Woher kommen Sie?) ja C10-EX-13 (Wie heißen Sie?) Harjoittele-sivulla. Ne auttavat keskustelu B:n kohteliasta puhuttelua.",
        "Oppitunti tarkistaa kirjan tallennetut yritykset eikä tee niistä erillisiä koekysymyksiä."
      ],
      "bookLinks": [
        {
          "chapterId": "10",
          "section": "practice",
          "label": "C10 · EX-12 ja EX-13",
          "instruction": "Tarkista kahdessa aidossa tehtävässä kohtelias Sie-muoto."
        }
      ]
    },
    {
      "id": "independent",
      "kind": "question",
      "title": "Kirjoita keskustelu B:n tärkein kysymys",
      "phase": "Itsenäinen harjoitus",
      "paragraphs": [
        "Peitä mallitaulu. Kirjoita opettajalle kohtelias nimen kysymys."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-MEET-10",
        "evidenceRole": "independent",
        "prompt": "Kirjoita saksaksi: Mikä teidän nimenne on?",
        "accepted": [
          "Wie heißen Sie?",
          "Wie heißen Sie"
        ],
        "success": "Wie heißen Sie? kysyy nimeä kohteliaasti.",
        "hint": "Wie + heißen + Sie.",
        "reteach": "Wie heißen Sie? kysyy nimeä kohteliaasti. Wie + heißen + Sie.",
        "genericWrong": "Tarkista pronomini ja verbin pääte. Wie + heißen + Sie.",
        "wrongAnswers": {
          "wie heißt du": "Tämä on tuttavallinen muoto, mutta tehtävä pyytää kohteliasta.",
          "wie heißt sie": "Tämä kysyisi, mikä hänen nimensä on, ei puhuttele opettajaa."
        }
      }
    },
    {
      "id": "application",
      "kind": "question",
      "title": "Esittele kolmas henkilö",
      "phase": "Soveltaminen",
      "paragraphs": [
        "Nuori Leo on kotoisin Suomesta. Valitse oikea er-muotoinen lause."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-MEET-10",
        "evidenceRole": "application",
        "prompt": "Mikä kertoo Leosta ulkopuoliselle?",
        "options": [
          {
            "id": "a",
            "label": "Er kommt aus Finnland."
          },
          {
            "id": "b",
            "label": "Er komme aus Finnland.",
            "wrongFeedback": "Kolmannessa persoonassa verbin muoto on kommt."
          },
          {
            "id": "c",
            "label": "Du kommt aus Finnland.",
            "wrongFeedback": "Du tarvitsee kommst ja puhuttelisi Leoa."
          }
        ],
        "correctOption": "a",
        "success": "Er kommt aus Finnland. on oikein.",
        "hint": "Er + kommt.",
        "reteach": "Er kommt aus Finnland. on oikein. Er + kommt.",
        "genericWrong": "Vertaa subjektia ja verbimuotoa. Er + kommt."
      }
    },
    {
      "id": "writing",
      "kind": "book",
      "title": "Tallenna kaksi 6–8 repliikin kohtaamista ja 4 virkettä",
      "phase": "Oma kirjoittaminen",
      "paragraphs": [
        "Avaa C10:n Sovella-sivu. Kirjoita A: kaksi tutun nuoren kohtaamista kuvaavaa 6–8 repliikkiä käyttäen du-muotoja. Kirjoita erikseen B: opettajalle osoitettu 6–8 repliikin Sie-kohtaaminen.",
        "Kirjoita loppuun neljä yksinkertaista virkettä kolmannesta kuvitteellisesta henkilöstä (Das ist ..., Er/Sie heißt ..., Er/Sie kommt ..., Er/Sie ist ...).",
        "Tallenna vähintään 80 merkkiä omaa tekstiä. Sovellus tarkistaa kirjoitustallennuksen laajuuden, ei repliikkien tarkkaa lukumäärää tai kieliopin oikeellisuutta. Tarkista määrät itse kirjan checklististä.",
        "Lue lopuksi molemmat omat keskustelut ääneen tai mielessäsi. Mahdollinen suullinen harjoitus itsearvioidaan; mikään automaattinen mikrofoniarvio ei ole käytössä."
      ],
      "bookLinks": [
        {
          "chapterId": "10",
          "section": "apply",
          "label": "C10 · Sovella, kaksi kohtaamista ja 4 virkettä",
          "instruction": "Kirjoita A ja B, tarkista vuorot ja tallenna oma tekstisovellus."
        }
      ]
    },
    {
      "id": "activity",
      "kind": "activity",
      "title": "Tee oma laaduntarkistus",
      "phase": "Oma harjoittelu",
      "paragraphs": [
        "Merkitse itsellesi, että A:ssa on 6–8 repliikkiä du-muodossa, B:ssä 6–8 repliikkiä Sie-muodossa ja lopussa neljän virkkeen kolmannen henkilön esittely.",
        "Pelkkä merkkimäärä ei todista tätä. Vahvista vasta kun olet verrannut tekstiä oikeaan checklistiin ja korjannut virheet itse."
      ],
      "activityId": "c10-teacher-L054",
      "activityLabel": "Tarkistin itse kaksi keskustelua ja neljän virkkeen esittelyn"
    },
    {
      "id": "exit",
      "kind": "question",
      "title": "Mitä 80 merkin suoritusnäyttö tarkoittaa?",
      "phase": "Lopputarkistus",
      "paragraphs": [
        "Erota tallennettu kirjoitus oikeasta vuorovaikutuksen kielitaitotodistuksesta."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-MEET-10",
        "evidenceRole": "exit",
        "prompt": "Mikä tulkinta on oikea?",
        "options": [
          {
            "id": "a",
            "label": "Kaikki 6–8 repliikkiä on todistetusti kieliopillisesti oikein.",
            "wrongFeedback": "Merkkimäärä ei tarkista vuoroja tai muotojen oikeellisuutta."
          },
          {
            "id": "b",
            "label": "Aidon lähdeäänen kuuleminen on automaattisesti todistettu.",
            "wrongFeedback": "Tämä tunnin näyttö koskee tekstiä ja itsearviota."
          },
          {
            "id": "c",
            "label": "Olen tallentanut oman kirjoitusyrityksen, ja sen sisällön tarkistan itse."
          }
        ],
        "correctOption": "c",
        "success": "Tallennettu teksti ei ole automaattinen kielitaitoarvosana.",
        "hint": "Vertaa itse 6–8 repliikkiä ja 4 virkettä.",
        "reteach": "Tallennettu teksti ei ole automaattinen kielitaitoarvosana. Vertaa itse 6–8 repliikkiä ja 4 virkettä.",
        "genericWrong": "Vertaa subjektia ja verbimuotoa. Vertaa itse 6–8 repliikkiä ja 4 virkettä."
      }
    },
    {
      "id": "summary",
      "kind": "summary",
      "title": "Kaksi tilannetta ja kolmas henkilö käyttövalmiina",
      "phase": "Yhteenveto",
      "paragraphs": [
        "Harjoittelit du- ja Sie-puhuttelua sekä er/sie-verbimuotoja soveltamalla niitä omiin fiktiivisiin kohtaamisiin.",
        "Kirjan Sovella-teksti jää samaan C10-luonnokseen ja Text B:n kaksi oikeaa tarkistuskysymystä tallentuvat omiin kenttiinsä. L055:ssa palautetaan C10:n oikea 20 tehtävän koe, joka on eri asia kuin kirjan loppukoe."
      ]
    }
  ],
  "applicationDraftMinLength": 80
};
