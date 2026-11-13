import { losExercisesFor } from "../exerciseBank.ts";
import type { TeacherLesson } from "./engine.ts";
/** C07 L040: existing full 15-item chapter exam and persistent assessment draft only. */
const C07_TEST_IDS=losExercisesFor("07").map(item=>item.id);
export const LOS1_L040_TEACHER: TeacherLesson = {
  "id": "L040",
  "bookId": 1,
  "chapterId": "07",
  "version": "2.0.0-preview.1",
  "title": "Harjoittele ja testaa C07",
  "objective": "Kertaan tavaamisen ja kirjoitusasun fraasit, palautan oikean 15 tehtävän C07-kappaletestin sekä tarkistan kuvitteellisen soveltamistekstiin ja oman arvioinnin.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredActivityIds": [
    "activity-L040"
  ],
  "requiredPracticeIds": [],
  "chapterAssessment": {
    "requiredTestIds": C07_TEST_IDS,
    "requireApplicationDraft": true,
    "minSelfAssessmentLength": 15
  },
  "scenes": [
    {
      "id": "welcome",
      "kind": "introduction",
      "title": "Koko C07:n harjoittelu päättyy oikeaan kokeeseen",
      "phase": "Aloitus",
      "paragraphs": [
        "Viimeinen C07-tunti kokoaa kirjan tavaamis-, nimien kirjoitusasu- ja kohteliaisuusfraasit. Nyt erotat nimen, kirjainten kirjoitusasun ja toistopyynnön.",
        "Kappaletesti sisältää 15 oikeaa, erikseen tallennettua ja palautettavaa osatehtävää. Tämä opettajatunti ei lisää toista testiä eikä väärää kuunteluarvosanaa.",
        "Kertaat myös C07:n Sovella-sivulla jo kirjoittamaasi kahdeksan kuvitteellisen nimen ja neljän numerorivin kokonaisuutta, jota ei tarvitse korvata uusilla oikeilla henkilötiedoilla."
      ]
    },
    {
      "id": "recall",
      "kind": "question",
      "title": "Mitä kysyy Wie schreibt man das?",
      "phase": "Muistelu",
      "paragraphs": [
        "Palauta mieleesi koko fraasin merkitys, älä sen yhtä sanaa."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-SPELL-07",
        "evidenceRole": "practice",
        "prompt": "Mikä suomennos sopii Wie schreibt man das? -ilmaukselle?",
        "options": [
          {
            "id": "a",
            "label": "Miten se kirjoitetaan?"
          },
          {
            "id": "b",
            "label": "Mitä kuuluu?",
            "wrongFeedback": "Kuulumisia kysytään Wie geht's?"
          },
          {
            "id": "c",
            "label": "Kuinka vanha olet?",
            "wrongFeedback": "Wie alt bist du? kysyy ikää."
          }
        ],
        "correctOption": "a",
        "success": "Wie schreibt man das? kysyy kirjoitusasua.",
        "hint": "Etsi kirjoittamista tarkoittava lause.",
        "reteach": "Wie schreibt man das? kysyy kirjoitusasua. Etsi kirjoittamista tarkoittava lause.",
        "genericWrong": "Tarkista, mitä alkuperäinen fraasi kysyy. Etsi kirjoittamista tarkoittava lause."
      }
    },
    {
      "id": "explain",
      "kind": "explanation",
      "title": "Viisi taitoa ennen kappalekoetta",
      "phase": "Kertaus",
      "paragraphs": [
        "Ensiksi tunnista kirjaimet A–Z sekä saksan erikoismerkit Ä, Ö, Ü ja ß. Muista, että kirjoitettu W ei vaihdu V:ksi, vaikka sen ääntämys voi suomen puhujalle muistuttaa v:tä.",
        "Toiseksi osaa kirjata kuvitteellisten nimien Mia, Lena, Uwe ja Leo oikeat kirjainrivit. Kolmanneksi tunnista tavalliset sanat der Buchstabe (kirjain) ja buchstabieren (tavata).",
        "Neljänneksi käytä oikeaa kirjoitusasua heißt ja München sekä kohteliasta fraasia Bitte buchstabieren Sie. Kieliopin koko taivutus ei ole tämän kappaleen tavoite.",
        "Viidenneksi erottele toistopyyntö Noch einmal, bitte. ja kirjoitusasun kysymys Wie schreibt man das?. Sovella-sivun omat nimet ja numerorivit ovat erillinen kirjoitusharjoitus.",
        "Text A on viiden repliikin lähde. Text B on aakkosäänite, jonka sanatarkka litteraatti ja toisto ovat edelleen tarkistamatta. Kappalekoe ei mittaa puhetta tai kuullunymmärtämistä automaattisesti."
      ],
      "help": [
        {
          "title": "Paljonko kokeessa on tehtäviä?",
          "body": "C07:n nykyisessä harjoituspankissa on 15 tehtävää, joista 13 on monivalintaa ja kaksi täydentämistehtävää."
        },
        {
          "title": "Voinko tehdä kokeen uudelleen?",
          "body": "Kyllä, kirjan varsinainen koesivu voi arkistoida aiemman palautetun yrityksen ennen uuden alkua. Älä hävitä koehistoriaa."
        },
        {
          "title": "Pitääkö omaa ääntämistäni nauhoittaa?",
          "body": "Ei. Soveltamistehtävä tehdään kirjallisesti fiktiivisillä nimillä ja numerojonolla. Äänen oikeellisuutta ei arvostella automaattisesti."
        }
      ]
    },
    {
      "id": "board",
      "kind": "board",
      "title": "C07:n kertaustaulu ennen koetta",
      "phase": "Opetustaulu",
      "paragraphs": [
        "Käy esimerkit kerran läpi ja yritä muistaa sen jälkeen ilman mallia."
      ],
      "board": [
        {
          "label": "Nimen kysyminen",
          "german": "Wie heißt du?",
          "meaning": "Mikä sinun nimesi on?"
        },
        {
          "label": "Kirjoitusasun kysyminen",
          "german": "Wie schreibt man das?",
          "meaning": "Miten se kirjoitetaan?"
        },
        {
          "label": "Kohtelias tavaamispyyntö",
          "german": "Bitte buchstabieren Sie.",
          "meaning": "Tavatkaa, olkaa hyvä."
        },
        {
          "label": "Uusi yritys",
          "german": "Noch einmal, bitte.",
          "meaning": "Vielä kerran, kiitos."
        },
        {
          "label": "Nimen tavaus",
          "german": "U – W – E",
          "meaning": "Uwe kirjoitetaan W-kirjaimella."
        },
        {
          "label": "Kirjoitusasun tarkistus",
          "german": "heißt · München",
          "meaning": "Huomaa ß ja ü."
        }
      ]
    },
    {
      "id": "guided",
      "kind": "question",
      "title": "Onko toisto sama kuin tavaaminen?",
      "phase": "Ohjattu harjoitus",
      "paragraphs": [
        "Puhelimen välityksellä henkilö puhuu liian nopeasti. Haluat kuulla asian uudelleen."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-SPELL-07",
        "evidenceRole": "practice",
        "prompt": "Mikä fraasi pyytää toistamaan?",
        "options": [
          {
            "id": "a",
            "label": "Bitte buchstabieren Sie.",
            "wrongFeedback": "Tämä pyytää tavaamaan kirjaimet, ei vain toistamaan."
          },
          {
            "id": "b",
            "label": "Noch einmal, bitte."
          },
          {
            "id": "c",
            "label": "Woher kommen Sie?",
            "wrongFeedback": "Tämä kysyy mistä olette kotoisin."
          }
        ],
        "correctOption": "b",
        "success": "Noch einmal, bitte. on toistopyyntö.",
        "hint": "Muista einmal.",
        "reteach": "Noch einmal, bitte. on toistopyyntö. Muista einmal.",
        "genericWrong": "Tarkista, mitä alkuperäinen fraasi kysyy. Muista einmal."
      }
    },
    {
      "id": "source",
      "kind": "book",
      "title": "Kertaa alkuperäinen viiden repliikin teksti",
      "phase": "Kirjan alkuperäisteksti",
      "paragraphs": [
        "C07:n Text A:n viidessä puheenvuorossa Franz tavaa nimen numerotiedustelulle. Lue kokonaan ainakin työntekijän kolmas ja Franzin neljäs repliikki.",
        "Älä yritä päätellä numerotiedustelun asiakkaan puhelinnumeroa ellipsin kohdalle. Käytä vain julkaistua tekstisisältöä."
      ],
      "bookLinks": [
        {
          "chapterId": "07",
          "section": "text",
          "label": "C07 · Koko aito puhelinpalvelukeskustelu",
          "instruction": "Kertaa tavaamispyyntö ja zweimal L."
        }
      ]
    },
    {
      "id": "practice",
      "kind": "book",
      "title": "Palaa vaikeimpiin 15 harjoitukseen",
      "phase": "Harjoitus",
      "paragraphs": [
        "Ennen kappaletestiä voit avata kirjan Harjoittele-sivun ja kerrata esimerkiksi C07-EX-05–09 (nimet ja ß) tai EX-14–15 (buchstabieren ja einmal).",
        "Harjoitusten vastaukset eivät korvaa testivastauksia. Varsinainen 15-osainen koe tehdään ja palautetaan erillisellä Testi-sivulla."
      ],
      "bookLinks": [
        {
          "chapterId": "07",
          "section": "practice",
          "label": "C07 · Harjoittele kaikki 15 tehtävää",
          "instruction": "Kertaa vaikeita kohtia, älä sekoita kokeen palautukseen."
        }
      ]
    },
    {
      "id": "independent",
      "kind": "question",
      "title": "Kirjoita valmis tavaamispyyntö ilman mallia",
      "phase": "Itsenäinen harjoitus",
      "paragraphs": [
        "Kirjoita kokonainen kohtelias fraasi muistista. Välimerkin voi jättää pois."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-SPELL-07",
        "evidenceRole": "independent",
        "prompt": "Kirjoita saksaksi: Tavatkaa, olkaa hyvä.",
        "accepted": [
          "Bitte buchstabieren Sie.",
          "Bitte buchstabieren Sie"
        ],
        "success": "Bitte buchstabieren Sie. sopii kohteliaaksi tavauksen pyynnöksi.",
        "hint": "Käytä järjestystä Bitte, buchstabieren, Sie.",
        "reteach": "Bitte buchstabieren Sie. sopii kohteliaaksi tavauksen pyynnöksi. Käytä järjestystä Bitte, buchstabieren, Sie.",
        "genericWrong": "Muista oikea alkeisfraasi. Käytä järjestystä Bitte, buchstabieren, Sie.",
        "wrongAnswers": {
          "noch einmal bitte": "Tämä pyytää toistamaan, mutta nyt pyydetään tavaamaan.",
          "wie schreibt man das": "Tämä kysyy kirjoitusasua, ei varsinaisesti pyydä tavaamaan."
        }
      }
    },
    {
      "id": "application",
      "kind": "question",
      "title": "Sovella uuteen nimimerkkiin",
      "phase": "Soveltaminen",
      "paragraphs": [
        "Kuvitteellinen henkilö nimeää itsensä Uwe. Valitse hänen nimensä oikea kirjoitus, kun sitä pyydetään tavattuna."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-SPELL-07",
        "evidenceRole": "application",
        "prompt": "Mikä tavattu sarja tuottaa Uwe-nimen?",
        "options": [
          {
            "id": "a",
            "label": "U – V – E",
            "wrongFeedback": "V-kirjain muuttaa nimen kirjoitusasua."
          },
          {
            "id": "b",
            "label": "U – W – I",
            "wrongFeedback": "Loppu kuuluu kirjoittaa E, ei I."
          },
          {
            "id": "c",
            "label": "U – W – E"
          }
        ],
        "correctOption": "c",
        "success": "U–W–E muodostaa Uwe-nimen.",
        "hint": "Pidä W ja E oikeilla paikoillaan.",
        "reteach": "U–W–E muodostaa Uwe-nimen. Pidä W ja E oikeilla paikoillaan.",
        "genericWrong": "Tarkista, mitä alkuperäinen fraasi kysyy. Pidä W ja E oikeilla paikoillaan."
      }
    },
    {
      "id": "writing",
      "kind": "book",
      "title": "Tarkista tallennettu kahdeksan nimen sovellus",
      "phase": "Kirjan soveltamistehtävä",
      "paragraphs": [
        "Siirry C07:n Sovella-sivulle ja tarkista, että siellä on kahdeksan kuvitteellisen nimen kirjaimet sekä neljä erillistä lyhyttä numerojonoa. Lisää puuttuvat osat tarvittaessa.",
        "Soveltamisteksti tallentuu samaan jo käytössä olevaan C07-luonnokseen. Opetustila vaatii tallennetun tekstin olemassaolon, mutta ei tee sille automaattista oikeinkirjoituksen laadullista arvosanaa."
      ],
      "bookLinks": [
        {
          "chapterId": "07",
          "section": "apply",
          "label": "C07 · Sovella · tallennetut kuvitteelliset nimet",
          "instruction": "Varmista, että oma sovellus on tallennettu."
        }
      ]
    },
    {
      "id": "testguide",
      "kind": "explanation",
      "title": "Palautus tehdään kirjan oikealla testisivulla",
      "phase": "Kokeen ohje",
      "paragraphs": [
        "Vastaa kaikkiin 15 C07:n testipankin tehtävään ja paina Palauta testi. Oikeat vastaukset ja pisteet näytetään vasta palautuksen jälkeen.",
        "Uusinnassa aiempi yritys arkistoidaan kokonaisena tuloksineen. Opettajatunti lukee olemassa olevan koetuloksen ja palautusajan, eikä muuta niitä.",
        "Harjoituksen omaan, erilliseen arviointiin kuuluu vähintään 15 merkin sanallinen itsearviointi: mitä osaan ja mitä harjoittelen seuraavaksi."
      ],
      "help": [
        {
          "title": "Mitä jos tulos on huono?",
          "body": "Voit kerrata heikommat harjoitukset ja tehdä uuden yrityksen. Koemerkintä tarkoittaa palautusta, ei automaattista täydellistä osaamista."
        },
        {
          "title": "Voinko käyttää oikeaa puhelinnumeroa?",
          "body": "Ei ole tarvetta. Sovella-sivulla käytetään vain fiktiivisiä nimiä ja erillisiä, keksittyjä numerojonoja."
        }
      ]
    },
    {
      "id": "exam",
      "kind": "book",
      "title": "Avaa ja palauta oikea C07-kappaletesti",
      "phase": "Kappaletesti",
      "paragraphs": [
        "Avaa C07:n Testi-sivu. Tee kaikki 15 monivalinta- ja täydentämistehtävää ja palauta vasta kun olet yrittänyt jokaista.",
        "Testivastaukset pysyvät kirjan alkuperäisessä tallennuksessa. Opetustila ei luo toista 15 pisteen koetta."
      ],
      "bookLinks": [
        {
          "chapterId": "07",
          "section": "test",
          "label": "C07 · Kappaletesti · 15 osatehtävää",
          "instruction": "Palauta kaikki C07:n oikeat koevastaukset."
        }
      ]
    },
    {
      "id": "reflection",
      "kind": "book",
      "title": "Kirjoita sanallinen itsearvio",
      "phase": "Itsearviointi",
      "paragraphs": [
        "Kirjoita C07:n testisivun itsearviointiin vähintään 15 merkkiä siitä, miten nimien tavaaminen, heißt ja toistopyynnöt sujuivat.",
        "Palautettu 15 tehtävän koe, aikaisempi Sovella-sivun kirjoitus ja itsearvio ovat kolme erillistä opiskelutekoa. Niitä ei pidä niputtaa puhe- tai kuuntelupisteiksi."
      ],
      "bookLinks": [
        {
          "chapterId": "07",
          "section": "test",
          "label": "C07 · Palautettu koe ja itsearvio",
          "instruction": "Kirjaa vähintään 15 merkkiä omasta oppimisesta."
        }
      ]
    },
    {
      "id": "activity",
      "kind": "activity",
      "title": "Vahvista vielä oma kertaus",
      "phase": "Oma kertaus",
      "paragraphs": [
        "Käy läpi kahdeksan nimen kirjoitusasut ja kaksi pyyntöä ilman mallia. Tarkista vaikeat kohdat oikeasta kirjasivusta.",
        "Vahvistus tarkoittaa, että harjoittelit. Se ei korvaa C07:n oikeaa testipalautusta."
      ],
      "activityId": "activity-L040",
      "activityLabel": "Kertasin C07:n tavaamisen ja kohteliaat fraasit"
    },
    {
      "id": "exit",
      "kind": "question",
      "title": "Mitä kappaletesti todella arvioi?",
      "phase": "Lopputarkistus",
      "paragraphs": [
        "Varmista lopuksi, että ymmärrät eron tekstipohjaisen numeron- tai kirjainharjoituksen ja varsinaisen kuuntelutaidon välillä."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-SPELL-07",
        "evidenceRole": "exit",
        "prompt": "Mikä väite on oikein C07:n 15 tehtävän kokeesta?",
        "options": [
          {
            "id": "a",
            "label": "Koe pisteyttää kaikkien kirjainten ääntämisen.",
            "wrongFeedback": "Sovelluksella ei ole hyväksyttyä automaattista ääntämisen pisteytystä."
          },
          {
            "id": "b",
            "label": "Koe arvioi kirjoitusasuja ja opittuja fraaseja, mutta ei todista audion toistoa tai ääntämisen laatua."
          },
          {
            "id": "c",
            "label": "Koe pakottaa käyttämään oikeaa puhelinnumeroa.",
            "wrongFeedback": "Harjoituksessa käytetään kuvitteellisia nimiä ja numerorivejä."
          }
        ],
        "correctOption": "b",
        "success": "Koe on kirjoitusasu- ja fraasiharjoitus.",
        "hint": "Äänilähteen tarkistus on erillinen julkaisuportti.",
        "reteach": "Koe on kirjoitusasu- ja fraasiharjoitus. Äänilähteen tarkistus on erillinen julkaisuportti.",
        "genericWrong": "Tarkista, mitä alkuperäinen fraasi kysyy. Äänilähteen tarkistus on erillinen julkaisuportti."
      }
    },
    {
      "id": "summary",
      "kind": "summary",
      "title": "C07:n kirjallinen harjoittelujakso päätökseen",
      "phase": "Yhteenveto",
      "paragraphs": [
        "Opiskelit aakkosten kirjoitusmerkit, kuvitteellisten nimien tavaamisen, kirjoitusasun kysymisen sekä kohteliaat tavaamis- ja toistopyynnöt.",
        "Oppitunnin suorittaminen edellyttää oikean 15 tehtävän kokeen palautusta, tallennettua soveltamistekstiä ja sanallista itsearviota sekä kaikkien opetustilanteiden läpikäyntiä.",
        "C07:n alkuperäistekstin oikeudet ja Text B:n äänitteen laitetestit ovat edelleen erillisiä tarkistuksia. L041 jatkaa selviytymisfraaseihin."
      ]
    }
  ]
};
