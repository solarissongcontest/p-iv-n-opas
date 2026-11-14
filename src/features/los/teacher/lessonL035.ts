import { losExercisesFor } from "../exerciseBank.ts";
import type { TeacherLesson } from "./engine.ts";
/** One existing C06 workbook test; no duplicate answers or bogus oral scores. */
const C06_TEST_IDS = losExercisesFor("06").map(item => item.id);
export const LOS1_L035_TEACHER: TeacherLesson = {
  "id": "L035",
  "bookId": 1,
  "chapterId": "06",
  "version": "2.0.0-preview.1",
  "title": "Harjoittele ja testaa C06",
  "objective": "Harjoittelen luvut 0–100, palautan oikean C06-kappaletestin, sovellan ikäfraasia ja kirjaan itsearvioinnin.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "write-17",
    "write-32",
    "application",
    "exit"
  ],
  "requiredActivityIds": [
    "reviewed"
  ],
  "requiredPracticeIds": [],
  "chapterAssessment": {
    "requiredTestIds": C06_TEST_IDS,
    "requireApplicationDraft": true,
    "minSelfAssessmentLength": 15
  },
  "scenes": [
    {
      "id": "welcome",
      "phase": "Aloitus",
      "kind": "introduction",
      "title": "Mitä jo osaat?",
      "paragraphs": [
        "L035 kokoaa C06:n taidot. Palauta ensin mieleen numerot, sitten testaa itsesi kirjan oikealla 20 osatehtävän kappaletestillä.",
        "Opetuspolku ei luo kilpailevaa testiä. Se lukee palautetun testin, soveltamistekstin ja itsearvioinnin suoraan C06:n tallennustilasta. Testin palauttaminen ei yksin tarkoita pysyvää kielitaitoa."
      ]
    },
    {
      "id": "recall",
      "phase": "Harjoittelu",
      "kind": "question",
      "title": "Kertaa zwölf numerona",
      "paragraphs": [
        "Vastaa muistista ennen kuin palaat oikeaan kirjan kappaletestiin."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-NUM-01",
        "evidenceRole": "practice",
        "prompt": "Kirjoita numeroin: zwölf",
        "accepted": [
          "12"
        ],
        "success": "Oikein. Zwölf tarkoittaa kahtatoista, joten numero on 12.",
        "hint": "Zwölf on edellisillä tunneilla opittu poikkeusluku 12. Vastaa pelkällä numerolla.",
        "reteach": "Zwölf = kaksitoista = 12. Kirjoita numeromerkintä 12, älä saksankielistä sanaa.",
        "genericWrong": "Tehtävä pyytää numeroa: zwölf tarkoittaa lukua 12. Älä sekoita sitä lukuun 21.",
        "wrongAnswers": {
          "21": "21 = einundzwanzig. Zwölf tarkoittaa 12."
        }
      }
    },
    {
      "id": "summary-rules",
      "phase": "Opetus",
      "kind": "explanation",
      "title": "Kolme tärkeää muistettavaa asiaa",
      "paragraphs": [
        "Ensimmäiseksi 11 = elf ja 12 = zwölf, eivät mekaanisesti muodostetut zehn-yhdyssanat.",
        "Toiseksi 16 = sechzehn ja 17 = siebzehn. Sechs menettää s:n ja sieben menettää -en-loppunsa.",
        "Kolmanneksi 21 = einundzwanzig, 32 = zweiunddreißig. Ykköset tulevat ennen kymmeniä ja 30 on dreißig ß-merkillä. Kysymykseen Wie alt bist du? vastaat Ich bin ... Jahre alt.",
        "Kappaletesti sisältää kirjallisia muoto- ja fraasitehtäviä. Sillä ei mitata automaattisesti ääntämistä tai todisteta, että alkuperäinen ääni on kuunneltu."
      ],
      "help": [
        {
          "title": "Miksi tehtäväni voi mennä väärin vaikka sana on ymmärrettävä?",
          "body": "Kappaleessa harjoitellaan oikeaa saksalaista kirjoitusasua. ß, ü ja ö sekä osien järjestys ovat oikeinkirjoituksen osia, eivät pelkkiä vaihtoehtoisia koristuksia."
        }
      ]
    },
    {
      "id": "board",
      "phase": "Mallisuoritus",
      "kind": "board",
      "title": "Opettaja kertaa malliesimerkit",
      "paragraphs": [
        "Opettaja kokoaa koko kappaleen tärkeimmät rakenteet. Etene yksi vaihe kerrallaan."
      ],
      "board": [
        {
          "label": "Poikkeus 12",
          "german": "zwölf",
          "meaning": "ö ja oma muoto"
        },
        {
          "label": "Poikkeus 16",
          "german": "sechzehn",
          "meaning": "sechs ilman viimeistä s:ää"
        },
        {
          "label": "Poikkeus 17",
          "german": "siebzehn",
          "meaning": "sieben ilman -en-loppua"
        },
        {
          "label": "30",
          "german": "dreißig",
          "meaning": "saksalainen ß"
        },
        {
          "label": "32",
          "german": "zweiunddreißig",
          "meaning": "ykköset + und + kymmenet"
        },
        {
          "label": "Ikäkysymys",
          "german": "Wie alt bist du?",
          "meaning": "Kuinka vanha olet?"
        },
        {
          "label": "Ikävastaus",
          "german": "Ich bin siebzehn Jahre alt.",
          "meaning": "Olen 17-vuotias."
        }
      ]
    },
    {
      "id": "guided",
      "phase": "Ohjattu harjoitus",
      "kind": "question",
      "title": "Oikea lukujärjestys",
      "paragraphs": [
        "Valitse oikein muodostettu yhdistelmä."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-NUM-01",
        "prompt": "Mikä kirjoittaa 32 oikein?",
        "options": [
          {
            "id": "a",
            "label": "dreißigzwei",
            "wrongFeedback": "Saksassa yksiköt tulevat ensin ja und yhdistää osat."
          },
          {
            "id": "b",
            "label": "zweiunddreißig"
          },
          {
            "id": "c",
            "label": "zweiunddreizig",
            "wrongFeedback": "30 on dreißig ß-merkillä."
          }
        ],
        "correctOption": "b",
        "success": "Oikein. Zweiunddreißig = 32.",
        "hint": "Zwei + und + dreißig.",
        "reteach": "32 = zweiunddreißig, eikä 30 ole dreizig.",
        "genericWrong": "Katso ykkösten ja kymmenien järjestystä."
      }
    },
    {
      "id": "write-17",
      "phase": "Harjoittelu",
      "kind": "question",
      "title": "Kirjoita siebzehn muistista",
      "paragraphs": [
        "Vastaa muistista ennen kuin palaat oikeaan kirjan kappaletestiin."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-NUM-01",
        "evidenceRole": "independent",
        "prompt": "Kirjoita saksaksi: 17",
        "accepted": [
          "siebzehn"
        ],
        "success": "Oikein. 17 kirjoitetaan siebzehn: sieben lyhenee muotoon sieb.",
        "hint": "Seitsemän on sieben. Kun lisäät -zehn, lopun -en jää pois.",
        "reteach": "17 = siebzehn (sieb + zehn), ei siebenzehn. Muista sanan lopun -zehn.",
        "genericWrong": "Kirjoita 17 saksankielisenä sanana siebzehn. Tarkista seitsemän sanan lyhentynyt alku sieb-.",
        "wrongAnswers": {
          "siebenzehn": "Sanan sieben loppu -en jää pois: siebzehn."
        }
      }
    },
    {
      "id": "write-32",
      "phase": "Harjoittelu",
      "kind": "question",
      "title": "Kirjoita zweiunddreißig muistista",
      "paragraphs": [
        "Vastaa muistista ennen kuin palaat oikeaan kirjan kappaletestiin."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-NUM-01",
        "evidenceRole": "independent",
        "prompt": "Kirjoita saksaksi: 32",
        "accepted": [
          "zweiunddreißig"
        ],
        "success": "Oikein. 32 on zweiunddreißig: zwei + und + dreißig.",
        "hint": "Aloita sanalla zwei (2), lisää und ja päätä sanaan dreißig (30).",
        "reteach": "32 = zweiunddreißig. Saksassa yksiköt tulevat ensin; sanassa dreißig on ß.",
        "genericWrong": "Kirjoita 32 yhtenä sanana: zwei + und + dreißig. Tarkista kymmenosassa ß.",
        "wrongAnswers": {
          "zweiunddreissig": "Dreißig sisältää ß-merkin.",
          "zweiunddreizig": "30 ei ole dreizig vaan dreißig."
        }
      }
    },
    {
      "id": "review-book",
      "phase": "Oppikirja",
      "kind": "book",
      "title": "Kertaa C06:n oikeat sisältöosiot",
      "paragraphs": [
        "Kertaa vielä luvut null–zwölf, teiniluvut sechzehn ja siebzehn sekä kaikki tasakymmenet 20–100.",
        "Kokeile palauttaa ne ilman mallia. Kirjan oikeita tehtäviä voi kerrata, mutta testin pisteitä ei saa käyttää kopioidun vastauspankin päättelyyn."
      ],
      "bookLinks": [
        {
          "chapterId": "06",
          "section": "vocabulary",
          "label": "C06 · Sanasto",
          "instruction": "Käytä kirjan todellista opiskeludataa ja tallenna tehtävä tehtynä."
        },
        {
          "chapterId": "06",
          "section": "grammar",
          "label": "C06 · Kielioppi",
          "instruction": "Käytä kirjan todellista opiskeludataa ja tallenna tehtävä tehtynä."
        },
        {
          "chapterId": "06",
          "section": "practice",
          "label": "C06 · Harjoittele",
          "instruction": "Käytä kirjan todellista opiskeludataa ja tallenna tehtävä tehtynä."
        }
      ],
      "activityId": "reviewed",
      "activityLabel": "Olen kerrannut kaikki keskeiset numerot ja ikäfraasit"
    },
    {
      "id": "application",
      "phase": "Harjoittelu",
      "kind": "question",
      "title": "Sano ikä kokonaisella lauseella",
      "paragraphs": [
        "Vastaa muistista ennen kuin palaat oikeaan kirjan kappaletestiin."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-INT-06",
        "evidenceRole": "application",
        "prompt": "Kirjoita saksaksi täydellinen lause: Olen 20-vuotias.",
        "accepted": [
          "Ich bin zwanzig Jahre alt."
        ],
        "success": "Oikein. Ich bin zwanzig Jahre alt. kertoo iän saksan sein-verbillä.",
        "hint": "Aloita Ich bin, lisää zwanzig ja lopuksi Jahre alt.",
        "reteach": "Saksassa sanotaan Ich bin zwanzig Jahre alt. (Olen 20-vuotias), ei Ich habe zwanzig Jahre alt.",
        "genericWrong": "Kirjoita koko ikälause: Ich bin + zwanzig + Jahre alt. Käytä sein-verbin muotoa bin, älä habe.",
        "wrongAnswers": {
          "ich habe zwanzig jahre alt": "Saksan ikälauseessa käytetään bin, ei habe."
        }
      }
    },
    {
      "id": "application-book",
      "phase": "Oppikirja",
      "kind": "book",
      "title": "Kirjoita oma ikäkeskustelu kirjaan",
      "paragraphs": [
        "Kirjoita nykyisen C06:n Käytä saksaa -sivulle kaksi lyhyttä keskustelua kuvitteellisista 17- ja 20-vuotiaista. Käytä Wie alt bist du? ja Ich bin … Jahre alt.",
        "Tämä on vapaa tekstintuotos. Ohjelma varmistaa, että teksti on tallennettu, mutta ei anna automaattista kielioppipistettä."
      ],
      "bookLinks": [
        {
          "chapterId": "06",
          "section": "apply",
          "label": "C06 · Käytä saksaa",
          "instruction": "Käytä kirjan todellista opiskeludataa ja tallenna tehtävä tehtynä."
        }
      ]
    },
    {
      "id": "exam",
      "phase": "Kappaletesti",
      "kind": "book",
      "title": "Palauta oikea C06:n 20 tehtävän kappaletesti",
      "paragraphs": [
        "Avaa C06:n Kappaletesti, vastaa kaikkiin 20 osatehtävään ja paina Palauta testi. Pelkkä avaaminen tai kaikkien vastausten luonnosteleminen ei merkitse palautettua testiä.",
        "Opetusmoottori tarkistaa nykyisen chapterDraft.testSubmittedAt-arvon ja kaikkien C06-EX-01–20-tehtävien oikeaan testitallennukseen merkityt vastaukset.",
        "Älä avaa mallivastauksia ennen palautusta. Uusinnassa vanha koe arkistoidaan nykyisellä tallennusjärjestelmällä. Pisteet ovat kirjallisten osatehtävien tulos, eivät kielitaidon yleisarvosana."
      ],
      "bookLinks": [
        {
          "chapterId": "06",
          "section": "test",
          "label": "C06 · Kappaletesti",
          "instruction": "Vastaa kaikki 20 osatehtävää ja palauta oikea testi."
        }
      ]
    },
    {
      "id": "self-assessment",
      "phase": "Itsearviointi",
      "kind": "book",
      "title": "Kirjaa oma itsearviointi",
      "paragraphs": [
        "Kirjan palautetun testin alapuolella on itsearviointikenttä. Kirjoita vähintään yksi konkreettinen huomio siitä, miten luvut 0–20, 21–100 ja ikäfraasit onnistuivat ilman mallia.",
        "Tallennettujen merkkien vähimmäispituus varmistaa vain merkinnän olemassaolon, ei oikeellisuutta. Puheen ääntämistä ei pisteytetä ilman hyväksyttyä menetelmää."
      ],
      "bookLinks": [
        {
          "chapterId": "06",
          "section": "test",
          "label": "C06 · Testin itsearviointi",
          "instruction": "Kirjoita, mitä osasit ja mitä pitää vielä kerrata."
        }
      ]
    },
    {
      "id": "exit",
      "phase": "Lopputarkistus",
      "kind": "question",
      "title": "Lopputarkistus: dreißig",
      "paragraphs": [
        "Vastaa muistista ennen kuin palaat oikeaan kirjan kappaletestiin."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-NUM-01",
        "evidenceRole": "exit",
        "prompt": "Kirjoita saksaksi: 30",
        "accepted": [
          "dreißig"
        ],
        "success": "Oikein. 30 on dreißig, ja oikeaan kirjoitusasuun kuuluu ß.",
        "hint": "Kolmekymmentä alkaa drei- ja päättyy -ßig.",
        "reteach": "30 = dreißig. Se on tasakymmen ilman und-osaa, ja sanassa on ß.",
        "genericWrong": "Kirjoita tasakymmenen 30 nimi dreißig. Älä käytä und-osaa, äläkä korvaa ß-merkkiä z-kirjaimella.",
        "wrongAnswers": {
          "dreizig": "30 on dreißig.",
          "dreissig": "Tämä tehtävä edellyttää ß-kirjainta; älä muuta sitä automaattisesti ss:ksi."
        }
      }
    },
    {
      "id": "summary",
      "phase": "Yhteenveto",
      "kind": "summary",
      "title": "C06:n kappaletesti ja itsearviointi",
      "paragraphs": [
        "Kertasit numerot, iän kysymisen ja kertomisen sekä kirjoitusasujen poikkeukset.",
        "Oppitunnin läpikäynti vaatii C06:n oikeasti palautetun kappaletestin, tallennetun soveltamistekstin ja itsearvioinnin. Pelkkä sivun avaaminen tai puheen harjoittelu ei osoita itsenäistä osaamista."
      ]
    }
  ]
};
