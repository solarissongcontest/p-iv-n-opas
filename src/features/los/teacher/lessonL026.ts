import { losExercisesFor } from "../exerciseBank.ts";
import type { TeacherLesson } from "./engine.ts";
/** C05 L026: links the single existing exam and existing chapter draft without overwriting attempts. */
const C05_TEST_IDS = losExercisesFor("05").map(item => item.id);
export const LOS1_L026_TEACHER: TeacherLesson = {
  "id": "L026",
  "bookId": 1,
  "chapterId": "05",
  "version": "2.0.0-preview.1",
  "title": "Harjoittele ja testaa C05",
  "objective": "Osaan kysyä ja kertoa kuulumisia, erotan tuttavallisen ja kohteliaan vastakysymyksen ja palautan C05:n oikean kappaletestin sekä oman itsearvioinnin.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredActivityIds": [
    "sources-reviewed"
  ],
  "requiredPracticeIds": [],
  "chapterAssessment": {
    "requiredTestIds": C05_TEST_IDS,
    "requireApplicationDraft": true,
    "minSelfAssessmentLength": 15
  },
  "scenes": [
    {
      "id": "welcome",
      "phase": "Aloitus",
      "kind": "introduction",
      "title": "Kertaus ja oikea C05-kappaletesti",
      "paragraphs": [
        "Olet oppinut kysymään Wie geht's? ja Wie geht es dir?, vastaamaan Gut, danke. tai Nicht so gut. sekä käyttämään nicht- ja sehr-sanoja alkeistasolla.",
        "Tämä on opetuspolun viimeinen C05-tunti. Kertaamme olennaiset erot, teemme uuden pienen sovelluksen ja palaamme oppikirjan varsinaiseen 12 osatehtävän kappaletestiin.",
        "Koe, oma soveltava kirjoitus ja itsearviointi pysyvät kirjan olemassa olevassa tallennuksessa. Aiemmat kokeet, pisteet ja vastaukset eivät saa kadota. Tunnin valmistuminen ei ole kielitaitotodistus."
      ]
    },
    {
      "id": "recall",
      "phase": "Muistelu",
      "title": "Kysymys vai vastaus?",
      "kind": "question",
      "paragraphs": [
        "Palauta mieleen kaikkein tavallisin vointikysymys."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-05",
        "evidenceRole": "practice",
        "prompt": "Mikä kysyy tuttavan vointia?",
        "options": [
          {
            "id": "a",
            "label": "Wie geht's?"
          },
          {
            "id": "b",
            "label": "Mir geht's gut.",
            "wrongFeedback": "Tämä on hyvä vastaus, ei kysymys."
          },
          {
            "id": "c",
            "label": "Und dir?",
            "wrongFeedback": "Tämä on vastakysymys, jota käytetään toisen vastauksen jälkeen."
          }
        ],
        "correctOption": "a",
        "success": "Oikein. Wie geht's? aloittaa vointikeskustelun.",
        "hint": "Kysymys alkaa Wie.",
        "reteach": "Wie geht's? on alkuperäinen kysymys; Mir geht's gut. on vastaus.",
        "genericWrong": "Wie geht's? on alkuperäinen kysymys; Mir geht's gut. on vastaus."
      }
    },
    {
      "id": "explanation",
      "phase": "Opetus",
      "kind": "explanation",
      "title": "Tunnista kysymyksen, vastauksen ja vastakysymyksen roolit",
      "paragraphs": [
        "Kun sinä kysyt, käytä Wie geht's? tai Wie geht es dir? tuttavalle. Kohtelias vastine on Wie geht es Ihnen?. Puhuttelun ero opittiin jo C04:ssa.",
        "Kun sinulta kysytään, valitse oikea vointifraasi: Gut, danke. tai Mir geht's gut. hyvään vointiin, Nicht so gut. jos ei mene kovin hyvin.",
        "Sehr vahvistaa: Sehr gut! = erittäin hyvin. Nicht rajaa tai kieltää: Nicht so gut. = ei kovin hyvin. Täysi kiinteä malli on Mir geht es nicht gut.",
        "Kysy sen jälkeen takaisin Und dir? tuttavalle tai Und Ihnen? teititellen. Näitä opiskellaan kokonaisina ilmauksina, ei datiivin taivutuksena."
      ],
      "help": [
        {
          "title": "Miten erotan kaksi vastakysymystä?",
          "body": "Und dir? on tuttavallinen. Und Ihnen? sopii kohteliaaseen Sie-tilanteeseen. Älä opettele vielä datiivin muotosääntöjä."
        },
        {
          "title": "Onko Nicht so gut sama kuin Sehr gut?",
          "body": "Ei, ne ilmaisevat vastakkaista sävyä. Sehr gut on erittäin myönteinen, Nicht so gut on kielteisempi."
        }
      ]
    },
    {
      "id": "board",
      "phase": "Mallisuoritus",
      "kind": "board",
      "title": "Opettaja muodostaa kaksi erilaista kohtaamista",
      "paragraphs": [
        "Vertaa tuttavallista ja kohteliasta kohtaamista. Lopussa näet myös ei-niin-hyvän vastauksen."
      ],
      "board": [
        {
          "label": "1 · Tuttu kysyy",
          "german": "Wie geht's?",
          "meaning": "Mitä kuuluu? Tavallinen arkinen kysymys."
        },
        {
          "label": "2 · Vastaan",
          "german": "Gut, danke.",
          "meaning": "Hyvää, kiitos."
        },
        {
          "label": "3 · Kysyn takaisin",
          "german": "Und dir?",
          "meaning": "Entä sinulle? Tuttavallinen."
        },
        {
          "label": "4 · Kohtelias kysymys",
          "german": "Wie geht es Ihnen?",
          "meaning": "Mitä Teille kuuluu? Kohtelias Sie-tilanne."
        },
        {
          "label": "5 · Kohtelias vastakysymys",
          "german": "Und Ihnen?",
          "meaning": "Entä Teille?"
        },
        {
          "label": "6 · Kielteinen vastaus",
          "german": "Nicht so gut.",
          "meaning": "Ei kovin hyvin. Nicht on ennen so gut -osaa."
        }
      ]
    },
    {
      "id": "guided",
      "phase": "Ohjattu harjoittelu",
      "title": "Valitse tilanteen mukaan",
      "kind": "question",
      "paragraphs": [
        "Olet tutun kanssa. Tämä on vielä harjoittelua: voit käyttää mallia."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-05",
        "evidenceRole": "practice",
        "prompt": "Ystävä kysyy Wie geht's? Sinulla menee hyvin. Mitä vastaat?",
        "options": [
          {
            "id": "a",
            "label": "Gut, danke."
          },
          {
            "id": "b",
            "label": "Woher kommst du?",
            "wrongFeedback": "Tämä kysyy lähtöpaikkaa, ei vastaa kuulumisiin."
          },
          {
            "id": "c",
            "label": "Wie heißt du?",
            "wrongFeedback": "Tämä kysyy nimeä."
          }
        ],
        "correctOption": "a",
        "success": "Oikein. Gut, danke. on luonteva vointivastaus.",
        "hint": "Vastaa ensin omaan vointiisi.",
        "reteach": "Gut, danke. kertoo hyvistä kuulumisista ja kiittää kysymyksestä.",
        "genericWrong": "Gut, danke. kertoo hyvistä kuulumisista ja kiittää kysymyksestä."
      }
    },
    {
      "id": "sources",
      "phase": "Kertaus kirjasta",
      "kind": "book",
      "title": "Vertaile kahta todellista vointikontekstia",
      "paragraphs": [
        "C05:n Text A:ssa Heinrich kysyy ja Karl vastaa Mir geht es gut. C05:n Text B:ssä Greta kysyy Wie geht's? ja Franz vastaa Es geht mir gut.",
        "Lue tarvittaessa molemmat kokonaiset alkuperäistekstit. Text B:n vanha C02-käyttö ei muuta sitä uudeksi lähteeksi. Äänitteen toimivuutta tai vastaavuutta ei pidä olettaa.",
        "Vahvista vain, että vertasit oikeasti vointikysymykset ja vastaukset. Tämä merkintä ei väitä kuunnellun ymmärtämistä."
      ],
      "bookLinks": [
        {
          "label": "C05 · Text A",
          "chapterId": "05",
          "section": "text",
          "instruction": "Etsi Heinrichin ja Karlin vointifraasit."
        },
        {
          "label": "C05 · Text B",
          "chapterId": "05",
          "section": "text-b",
          "instruction": "Vertaa Gretan kysymystä ja Franzin vastausta."
        }
      ],
      "activityId": "sources-reviewed",
      "activityLabel": "Vertasin Text A:n ja Text B:n vointifraasit"
    },
    {
      "id": "practice",
      "phase": "Kirjan kertaus",
      "kind": "book",
      "title": "Harjoittele tutut fraasit ennen testiä",
      "paragraphs": [
        "Avaa C05:n Harjoittele. Tee erityisesti alkutehtävät C05-EX-01–07, vointisanasto EX-08–09 sekä nicht/sanajärjestys EX-10–11. Kokeen kysymys–vastausparit kerrataan EX-12:ssa.",
        "Harjoitusten mallivastaukset ovat harjoittelua varten. Älä käsittele niitä omana koepistemääränäsi."
      ],
      "bookLinks": [
        {
          "label": "C05 · Harjoittele",
          "chapterId": "05",
          "section": "practice",
          "instruction": "Harjoittele tarpeen mukaan ennen kirjan oikeaa 12-osioista kappaletestiä."
        }
      ]
    },
    {
      "id": "independent",
      "phase": "Itsenäinen tuottaminen",
      "kind": "question",
      "title": "Kerro kuulumiset itse",
      "paragraphs": [
        "Sulje näkyvä mallitaulu ja kirjoita fraasi muistista. Tässä haetaan juuri myönteistä kokonaista vastausta."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-INT-05",
        "evidenceRole": "independent",
        "prompt": "Kirjoita saksaksi: Minulle kuuluu hyvää. (aloita Mir)",
        "accepted": [
          "Mir geht's gut.",
          "Mir geht es gut."
        ],
        "success": "Oikein. Mir geht's gut. ja Mir geht es gut. ovat saman fraasin lyhyt ja pitkä muoto.",
        "hint": "Aloita Mir geht, sen jälkeen es tai 's, lopuksi gut.",
        "reteach": "Opi kiinteänä fraasina: Mir geht es gut. = Minulle kuuluu hyvää.",
        "genericWrong": "Tarkista sanajärjestys: Mir + geht + es/'s + gut.",
        "wrongAnswers": {
          "ich bin gut": "Ich bin gut ei ole tässä tarkoitettu vointifraasi. Käytä Mir geht's gut.",
          "mir gut geht": "Sana geht kuuluu tässä ennen gut-sanaa.",
          "mir geht es nicht gut": "Tämä kertoo, ettei kuulu hyvää, vastoin tehtävän myönteistä tilannetta."
        }
      }
    },
    {
      "id": "application",
      "phase": "Soveltaminen",
      "title": "Kohtelias vastakysymys",
      "kind": "question",
      "paragraphs": [
        "Vastaat kohteliaasti tuntemattomalle aikuiselle ja kysyt samalla hänen kuulumisiaan takaisin."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-05",
        "evidenceRole": "application",
        "prompt": "Mikä lopettaa vastauksesi kohteliaasti: Gut, danke. ...?",
        "options": [
          {
            "id": "a",
            "label": "Und dir?",
            "wrongFeedback": "Dir on tuttavallinen muoto. Tässä puhutellaan kohteliaasti."
          },
          {
            "id": "b",
            "label": "Und Ihnen?"
          },
          {
            "id": "c",
            "label": "Wie heißt du?",
            "wrongFeedback": "Tämä on tuttavallinen nimikysymys, ei voinnin vastakysymys."
          }
        ],
        "correctOption": "b",
        "success": "Oikein. Und Ihnen? sopii teitittelyyn.",
        "hint": "Muista C04:n Sie-puhuttelu.",
        "reteach": "Und dir? on tuttavallinen, Und Ihnen? on kohtelias.",
        "genericWrong": "Und dir? on tuttavallinen, Und Ihnen? on kohtelias."
      }
    },
    {
      "id": "test-guide",
      "phase": "Testin ohjeistus",
      "kind": "explanation",
      "title": "Kappaletesti mittaa opittuja fraaseja",
      "paragraphs": [
        "Kirjan C05-kappaletestissä on 12 nykyisen tehtäväpankin tehtävää. Tee ne ilman näkyvää mallia ja palauta kaikki yhdellä kertaa. Vastausten perustelut näkyvät kirjan nykyisen kokeen palautuksen jälkeen.",
        "Jos tulos ei tyydytä, voit avata kirjan saman kappaletestin uuden yrityksen. Vanha yritys ja sen pistetulos säilyvät erillisessä aiempien testien historiassa, eikä Teacher Player luo omaa rinnakkaista koetta.",
        "Äänen kuuntelemista, puheen tuottamisen laatua tai todellista keskustelukykyä ei arvioida 12 automaattisen osatehtävän pisteillä. Väärät vastaukset ovat kertaustieto, eivät automaattinen rangaistus."
      ],
      "help": [
        {
          "title": "Pitääkö saada kaikki oikein?",
          "body": "Ei. Tämän tunnin suoritus edellyttää palautettua oikeaa kappaletestiä, ei täysiä pisteitä. Pisteet säilyvät testihistoriassa."
        },
        {
          "title": "Voinko katsoa ratkaisut ennen testiä?",
          "body": "Harjoittelun ratkaisut ovat käytössä. Varsinaisen kappaletestin ratkaisujen tulee pysyä piilossa palautukseen asti."
        }
      ]
    },
    {
      "id": "exam",
      "phase": "Kappaletesti",
      "kind": "book",
      "title": "Palauta C05:n varsinainen 12 tehtävän testi",
      "paragraphs": [
        "Avaa C05:n Kappaletesti. Vastaa kaikkiin kahteentoista osatehtävään ja paina Palauta testi.",
        "Teacher Player tarkistaa vain nykyisen kappaleluonnoksen testivastaukset ja palautusajan. Vanhoja vastauksia tai pisteitä ei kirjoiteta uudelleen tässä tunnissa.",
        "Jos koe on jo palautettu, sitä ei tarvitse nollata uuden oppitunnin takia. Jätä aiemmat yritykset talteen."
      ],
      "bookLinks": [
        {
          "label": "C05 · Kappaletesti",
          "chapterId": "05",
          "section": "test",
          "instruction": "Vastaa kaikkiin 12 kysymykseen ja palauta testi nykyisellä painikkeella."
        }
      ]
    },
    {
      "id": "reflection",
      "phase": "Sovellus ja itsearviointi",
      "kind": "book",
      "title": "Kirjoita oma lyhyt keskustelu ja arvioi osaamisesi",
      "paragraphs": [
        "Avaa C05:n Käytä saksaa -sivu ja kirjoita vähintään yksi vointikysymys sekä siihen sopiva vastaus. Voit käyttää kuvitteellisia henkilöitä. Käytä valmiita ilmauksia ja tarkista kirjoitus.",
        "Kirjaa lisäksi C05:n varsinaisen Kappaletesti-sivun itsearviointiin ainakin yksi asia, joka onnistuu, ja yksi asia, jota haluat kerrata. Järjestelmä tallentaa tekstit, muttei pisteytä vapaata kirjoittamista automaattisesti.",
        "Tyhjää itsearviointia ei lasketa tehdyksi. Jos sinulla on jo tallennettu oma teksti ja riittävä arviointi, niitä ei poisteta."
      ],
      "bookLinks": [
        {
          "label": "C05 · Käytä saksaa",
          "chapterId": "05",
          "section": "apply",
          "instruction": "Tallenna oma kuulumiskysymys ja vastaus."
        },
        {
          "label": "C05 · Kappaletesti, itsearviointi",
          "chapterId": "05",
          "section": "test",
          "instruction": "Kirjoita oma arvio: mikä sujuu ja mitä vielä kertaat?"
        }
      ]
    },
    {
      "id": "exit",
      "phase": "Lopputarkistus",
      "title": "Voinnin ero ilman mallia",
      "kind": "question",
      "paragraphs": [
        "Viimeinen nopea siirtotehtävä; huomaa kielteisen ja myönteisen eron."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-05",
        "evidenceRole": "exit",
        "prompt": "Mikä tarkoittaa Ei kovin hyvin?",
        "options": [
          {
            "id": "a",
            "label": "Sehr gut.",
            "wrongFeedback": "Sehr gut tarkoittaa erittäin hyvin eikä ole kielteinen."
          },
          {
            "id": "b",
            "label": "Gut, danke.",
            "wrongFeedback": "Tämä on myönteinen vastaus."
          },
          {
            "id": "c",
            "label": "Nicht so gut."
          }
        ],
        "correctOption": "c",
        "success": "Oikein. Nicht so gut ilmaisee kielteisempiä kuulumisia.",
        "hint": "Etsi nicht, joka rajaa so gut -ilmaisua.",
        "reteach": "Sehr gut = erittäin hyvin, nicht so gut = ei kovin hyvin.",
        "genericWrong": "Sehr gut = erittäin hyvin, nicht so gut = ei kovin hyvin."
      }
    },
    {
      "id": "summary",
      "phase": "Yhteenveto ja kertaus",
      "kind": "summary",
      "title": "Mitä seuraavaksi kannattaa harjoitella?",
      "paragraphs": [
        "Nyt erotat vointikysymyksen, vastausfraasin ja vastakysymyksen. Harjoittelit myös sehr/nicht-merkityksiä ja teit nykyisen C05:n kokeen sekä kirjoitit itsearvioinnin.",
        "Jos jokin rooli tai nicht-sanan paikka meni väärin, kertaa ensin L022:n keskustelutaulu ja L024:n kielteiset esimerkit. Myöhemmässä C01–C05-kertauksessa samat taidot palaavat eri tilanteissa.",
        "Kokeen pisteet, historialliset yritykset ja itsearviointi jäävät oppikirjan samaan tallennukseen. Opetustilan läpikäynti ei yksin väitä, että kaikki keskustelutilanteet olisivat hallussa."
      ]
    }
  ]
};
