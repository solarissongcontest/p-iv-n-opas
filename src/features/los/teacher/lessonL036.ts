import type { TeacherLesson } from "./engine.ts";
/** C07 L036: letter forms and fictional names; never claim alphabet audio was assessed. */
export const LOS1_L036_TEACHER: TeacherLesson = {
  "id": "L036",
  "bookId": 1,
  "chapterId": "07",
  "version": "2.0.0-preview.1",
  "title": "Aakkosten ja nimen kertaus",
  "objective": "Erotan saksan kirjainten kirjoitusasut, tunnistan ä/ö/ü/ß-merkit ja tavaan kolme kuvitteellista nimeä kirjan harjoituksissa.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredActivityIds": [
    "activity-L036"
  ],
  "requiredPracticeIds": [
    "C07-EX-05",
    "C07-EX-06",
    "C07-EX-07"
  ],
  "requiredCheckedIds": [],
  "scenes": [
    {
      "id": "welcome",
      "kind": "introduction",
      "phase": "Aloitus",
      "paragraphs": [
        "Alamme harjoitella saksan aakkosia ja nimen tavaamista. Tavoite on erottaa kirjainmerkki, sen nimi ja kirjaimen äänne tavallisessa sanassa.",
        "Tavaa ensin vain kuvitteelliset nimet Mia, Lena ja Uwe. Niitä käytetään myös kirjan oikeissa C07-EX-05–07-tehtävissä.",
        "Saksan alkuperäinen aakkosäänite on Text B:ssä vasta laitetarkistusta odottavana tukena. Sen toistumista tai omaa ääntämistäsi ei pisteytetä automaattisesti."
      ],
      "title": "Kirjaimia ja nimiä, ei oikeita henkilötietoja"
    },
    {
      "id": "recall",
      "kind": "question",
      "phase": "Muistelu",
      "paragraphs": [
        "Ennen yksittäisiä kirjaimia muistele, miten toiselta kysytään nimeä tuttavallisessa tilanteessa."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-SPELL-07",
        "evidenceRole": "practice",
        "prompt": "Mikä kysymys tarkoittaa Mikä sinun nimesi on?",
        "options": [
          {
            "id": "a",
            "label": "Wie alt bist du?",
            "wrongFeedback": "Wie alt bist du? kysyy ikää, ei nimeä."
          },
          {
            "id": "b",
            "label": "Wie heißt du?"
          },
          {
            "id": "c",
            "label": "Wie geht es dir?",
            "wrongFeedback": "Wie geht es dir? kysyy kuulumisia."
          }
        ],
        "correctOption": "b",
        "success": "Wie heißt du? kysyy nimeä.",
        "hint": "Etsi sana heißt.",
        "reteach": "Wie heißt du? kysyy nimeä. Etsi sana heißt.",
        "genericWrong": "Katso vaihtoehtojen käyttötarkoitusta ja kirjoitusasua. Etsi sana heißt."
      },
      "title": "Muistatko nimen kysymisen?"
    },
    {
      "id": "explain",
      "kind": "explanation",
      "phase": "Opetus",
      "paragraphs": [
        "Saksan aakkosissa käytetään kirjaimia A–Z sekä merkkejä Ä, Ö, Ü ja ß. Suomen aakkosten Å ei ole tavallinen saksan aakkoston kirjain.",
        "Nimi Uwe kirjoitetaan U–W–E. Saksassa W ääntyy usein suomen v-äänteen tavoin, mutta kirjoitetussa nimessä kirjain pysyy W:nä.",
        "Nimi Mia kirjoitetaan M–I–A ja Lena L–E–N–A. Tavaaminen harjoituksessa tarkoittaa näiden merkkien luettelemista järjestyksessä. Kirjaimen sanominen ääneen on erillinen taito.",
        "Umlaut-merkit ovat ä, ö ja ü. ß:n nimi on Eszett tai scharfes S. Sen voi joissakin ympäristöissä korvata ss-kirjaimilla, mutta jokaiseen yksittäiseen sanaan korvaus ei sovi samalla tavalla.",
        "Tekstissä esiintyy esimerkiksi sanan heißt ß. Opettele nyt kirjoitusasu oikein, vaikka kirjainten saksankieliset nimet vaativat lisää kuunteluharjoitusta."
      ],
      "help": [
        {
          "title": "Miksi Uwe eikä Uve?",
          "body": "Nimen Uwe keskimmäinen kirjoitettu kirjain on W. Saksan W voi kuulostaa suomen v:ltä, mutta ääntämistä ei saa sekoittaa oikeinkirjoitukseen."
        },
        {
          "title": "Mitä tarkoittaa ß?",
          "body": "Se on saksan erikoiskirjain, Eszett. Tässä esiintyy sana heißt. Kirjoitusasu ja mahdollinen ss-varakirjoitus eivät ole aina keskenään vaihdettavia."
        },
        {
          "title": "Pitääkö osata aakkosten äänet täydellisesti?",
          "body": "Ei tässä vaiheessa. Tunnistamme kirjoitetut merkit ensin. Aakkosäänitteen järjestys ja toimivuus odottavat laitetarkistusta."
        }
      ],
      "title": "Miksi W ei muutu V:ksi kirjoittaessa?"
    },
    {
      "id": "board",
      "kind": "board",
      "phase": "Opetustaulu",
      "paragraphs": [
        "Seuraa ensin mallia, peitä sen jälkeen kirjoitetut kirjaimet ja yritä muodostaa samat nimet itse."
      ],
      "board": [
        {
          "label": "Aakkosten perusrivi",
          "german": "A B C D E F G ... Z",
          "meaning": "Kirjaimet muodostavat kirjoitetun aakkoston; kirjaimen nimi voi ääntyä eri tavoin."
        },
        {
          "label": "Erikoismerkit",
          "german": "Ä · Ö · Ü · ß",
          "meaning": "Umlaut-kirjaimet ja Eszett."
        },
        {
          "label": "Mia",
          "german": "M – I – A",
          "meaning": "Kolme kirjainta tässä järjestyksessä."
        },
        {
          "label": "Lena",
          "german": "L – E – N – A",
          "meaning": "Neljä kirjainta tässä järjestyksessä."
        },
        {
          "label": "Uwe",
          "german": "U – W – E",
          "meaning": "Keskellä W, ei V."
        },
        {
          "label": "Tavaamispyyntö",
          "german": "Bitte buchstabieren Sie.",
          "meaning": "Tavatkaa, olkaa hyvä. Kohtelias valmis fraasi."
        }
      ],
      "title": "Kolme kuvitteellista nimeä kirjain kirjaimelta"
    },
    {
      "id": "guided",
      "kind": "question",
      "phase": "Ohjattu harjoitus",
      "paragraphs": [
        "Katso hetki nimeä Uwe. Se ääntyy eri tavalla kuin voisi suomen perusteella kuvitella, mutta kirjoitusasu on muuttumaton."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-SPELL-07",
        "evidenceRole": "practice",
        "prompt": "Miten kirjoitat nimen Uwe kirjaimittain?",
        "options": [
          {
            "id": "a",
            "label": "U – V – E",
            "wrongFeedback": "Saksan W ei muutu kirjoittaessa V-kirjaimeksi."
          },
          {
            "id": "b",
            "label": "U – W – I",
            "wrongFeedback": "Nimen viimeinen kirjain on E, ei I."
          },
          {
            "id": "c",
            "label": "U – W – E"
          }
        ],
        "correctOption": "c",
        "success": "Uwe kirjoitetaan U–W–E.",
        "hint": "Kiinnitä huomiota W-kirjaimeen.",
        "reteach": "Uwe kirjoitetaan U–W–E. Kiinnitä huomiota W-kirjaimeen.",
        "genericWrong": "Katso vaihtoehtojen käyttötarkoitusta ja kirjoitusasua. Kiinnitä huomiota W-kirjaimeen."
      },
      "title": "Tunnista Uwen keskimmäinen kirjain"
    },
    {
      "id": "source",
      "kind": "book",
      "phase": "Alkuperäisteksti",
      "paragraphs": [
        "C07:n Text A on aito viiden repliikin puhelinkeskustelu. Numerotiedustelu pyytää Franzia tavaamaan nimen: Wie schreibt man das? Bitte buchstabieren Sie.",
        "Tässä vaiheessa riittää, että tunnistat lauseen alkuperäisestä tekstistä. Et vielä tarvitse osata monimutkaista koko nimien lausuntakirjaimistoa."
      ],
      "bookLinks": [
        {
          "chapterId": "07",
          "section": "text",
          "label": "C07 · Viiden repliikin Text A",
          "instruction": "Etsi kolmas repliikki ja kohtelias tavaamispyyntö."
        },
        {
          "chapterId": "07",
          "section": "vocabulary",
          "label": "C07 · Aakkoset ja nimet",
          "instruction": "Kertaa nimiä, erikoiskirjaimia ja bitte-fraasia."
        }
      ],
      "title": "Lue oikeasta C07-dialogista tavaamispyyntö"
    },
    {
      "id": "practice",
      "kind": "book",
      "phase": "Kirjan tehtävät",
      "paragraphs": [
        "Kirjan C07:n Harjoittele-sivulla tehtävät C07-EX-05, EX-06 ja EX-07 kysyvät nimien Mia, Lena ja Uwe oikean kirjaimittaisen kirjoitusasun.",
        "Tee kaikki kolme omaa yritystä ja tallenna vastaukset. Opettajan suorituksen ehto on vastaaminen, ei automaattinen ääntämisen tarkistus."
      ],
      "bookLinks": [
        {
          "chapterId": "07",
          "section": "practice",
          "label": "C07 · Harjoitukset 05–07",
          "instruction": "Vastaa Mia-, Lena- ja Uwe-tehtäviin."
        }
      ],
      "title": "Tee kolme oikeaa nimitehtävää"
    },
    {
      "id": "independent",
      "kind": "question",
      "phase": "Itsenäinen harjoitus",
      "paragraphs": [
        "Peitä näkyvä taulu. Kirjoita vain kirjaimet yhtenä nimenä, älä ääntämisen suomalaista arvausta."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-SPELL-07",
        "evidenceRole": "independent",
        "prompt": "Kirjoita nimen U – W – E oikea kirjoitusasu.",
        "accepted": [
          "Uwe"
        ],
        "success": "Uwe on oikea nimi.",
        "hint": "Kirjaimet ovat U, W ja E.",
        "reteach": "Uwe on oikea nimi. Kirjaimet ovat U, W ja E.",
        "genericWrong": "Kirjoita alkuperäisessä muodossa ja tarkista kirjaimet. Kirjaimet ovat U, W ja E.",
        "wrongAnswers": {
          "uve": "Uve vaihtaa nimen W:n V:ksi. Kirjoita Uwe.",
          "uwi": "Nimen viimeinen kirjain on E."
        }
      },
      "title": "Kirjoita nimen Uwe kirjaimet muistista"
    },
    {
      "id": "application",
      "kind": "question",
      "phase": "Soveltaminen",
      "paragraphs": [
        "Nimi Lena ei ole sinun henkilötietosi, vaan kirjan esimerkkihenkilö. Valitse sen kirjainten oikea sarja."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-SPELL-07",
        "evidenceRole": "application",
        "prompt": "Mikä kirjainrivi muodostaa nimen Lena?",
        "options": [
          {
            "id": "a",
            "label": "L – E – N – A"
          },
          {
            "id": "b",
            "label": "L – I – N – A",
            "wrongFeedback": "Nimen toinen kirjain on E, ei I."
          },
          {
            "id": "c",
            "label": "L – E – M – A",
            "wrongFeedback": "Nimen kolmas kirjain on N, ei M."
          }
        ],
        "correctOption": "a",
        "success": "Lena kirjoitetaan L–E–N–A.",
        "hint": "Nimessä on neljä kirjainta.",
        "reteach": "Lena kirjoitetaan L–E–N–A. Nimessä on neljä kirjainta.",
        "genericWrong": "Katso vaihtoehtojen käyttötarkoitusta ja kirjoitusasua. Nimessä on neljä kirjainta."
      },
      "title": "Harjoittele uuden kuvitteellisen nimen tavausta"
    },
    {
      "id": "activity",
      "kind": "activity",
      "phase": "Oma harjoittelu",
      "paragraphs": [
        "Kirjoita paperille tai sano ääneen nimet Mia, Lena ja Uwe kirjain kirjaimelta. Halutessasi katso Text B:n aakkosriviä lausuntatuen kirjoituslistana.",
        "Vahvista vain oma harjoitteluyrityksesi. Merkitse sitä kuunteluksi vasta jos olet todella kuullut äänen, eikä tämä järjestelmä silloinkaan arvioi ääntämisesi laatua."
      ],
      "activityId": "activity-L036",
      "activityLabel": "Harjoittelin kolme kuvitteellista nimeä kirjain kirjaimelta",
      "title": "Kokeile nimiä ilman mallia"
    },
    {
      "id": "exit",
      "kind": "question",
      "phase": "Lopputarkistus",
      "paragraphs": [
        "Erottele kerran vielä oikea kirjain ja sanassa kuuluva äänne."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-SPELL-07",
        "evidenceRole": "exit",
        "prompt": "Mikä lause on oikein nimestä Uwe?",
        "options": [
          {
            "id": "a",
            "label": "Se kirjoitetaan Uve, koska ääntyy usein v:n kaltaisesti.",
            "wrongFeedback": "Äänne ja kirjoitusmerkki eivät ole sama asia; Uwe kirjoitetaan W:llä."
          },
          {
            "id": "b",
            "label": "Se kirjoitetaan Uwe, vaikka W ääntyy usein suomen v:n tavoin."
          },
          {
            "id": "c",
            "label": "Saksassa W-kirjainta ei koskaan käytetä.",
            "wrongFeedback": "W kuuluu saksan aakkosiin ja esiintyy nimessä Uwe."
          }
        ],
        "correctOption": "b",
        "success": "Oikeinkirjoitus säilyttää W:n.",
        "hint": "Erota kirjoitettu kirjain ja sen äänne.",
        "reteach": "Oikeinkirjoitus säilyttää W:n. Erota kirjoitettu kirjain ja sen äänne.",
        "genericWrong": "Katso vaihtoehtojen käyttötarkoitusta ja kirjoitusasua. Erota kirjoitettu kirjain ja sen äänne."
      },
      "title": "Viimeinen valinta: mikä kirjain sopii?"
    },
    {
      "id": "summary",
      "kind": "summary",
      "phase": "Yhteenveto",
      "paragraphs": [
        "Opit, että saksan erikoismerkkejä ovat ä, ö, ü ja ß. Tunnistat nimet Mia, Lena ja Uwe kirjainten järjestyksestä.",
        "Seuraavassa L037-tunnissa luet C07:n kokonaisen alkuperäisen viiden repliikin puhelinkeskustelun ja tarkistat sen ensimmäiset ymmärtämistehtävät.",
        "Omien nimien tai puhelinnumeroiden antamista ei vaadita. Aakkosäänitettä ei vielä väitetä laitetestatuksi."
      ],
      "title": "Aakkosten kirjoitusasusta on alku"
    }
  ]
};
