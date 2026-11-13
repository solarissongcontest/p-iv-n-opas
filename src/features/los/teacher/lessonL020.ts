import { LOS1_TEXT_B_SOURCES } from "../content/los1TextBAdditional.ts";
import type { TeacherLesson } from "./engine.ts";
const source = LOS1_TEXT_B_SOURCES["04"];
if (source.sourceId !== "M-COM-03" || source.lines.length !== 20) throw new Error("C04 Text B must keep the complete human-authored 20-item source");
/** C04 L020: full real source list, not an invented dialogue or a listening assessment. */
export const LOS1_L020_TEACHER: TeacherLesson = {
  "id": "L020",
  "bookId": 1,
  "chapterId": "04",
  "version": "2.0.0-preview.1",
  "title": "Käytä kohteliaisuusfraaseja",
  "objective": "Luokittelen 20 alkuperäistä tervehdys- ja hyvästelyilmausta tilanteen ja rekisterin mukaan ja valitsen sopivat fraasit kahteen uuteen asiakaspalvelutilanteeseen.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredActivityIds": [
    "full-list-reviewed",
    "register-applied"
  ],
  "requiredPracticeIds": [
    "C04-EX-09",
    "C04-EX-10",
    "C04-EX-11"
  ],
  "requiredCheckedIds": [
    "C04-TEXTB-Q01",
    "C04-TEXTB-Q02",
    "C04-TEXTB-Q03",
    "C04-TEXTB-Q04"
  ],
  "scenes": [
    {
      "id": "welcome",
      "phase": "Aloitus",
      "kind": "introduction",
      "title": "Yksi oikea äänilähde, monta tervehdystilannetta",
      "paragraphs": [
        "C04:n nykyinen Text B perustuu M-COM-03-lähteeseen German Vocabulary - Greetings.ogg, jonka German Men92 julkaisi public domain -käyttöön. Se sisältää 20 yksittäistä tervehdys- ja hyvästelyilmausta, ei keskustelua kahden henkilön välillä.",
        "Sama ihmisen tekemä aineisto esiintyy jo C01:ssä. Tällä tunnilla tarkastelemme sitä eri näkökulmasta: miten kohtelias, arkinen ja alueellinen ilmaus eroavat toisistaan.",
        "C04:n suunnitelmassa mainittu M-DIB-07:n virallinen tehtäväkatkelma ei ole vielä oikeuksiltaan ja täsmälliseltä sivuviitteeltään hyväksytty. Emme teeskentele, että se olisi jo kirjan Text B. Emme myöskään väitä tämän listan olevan nimen tai tilanteen sisältävä saneludialogi."
      ]
    },
    {
      "id": "recall",
      "phase": "Muistelu",
      "kind": "question",
      "title": "Kohtelias hyvästely ennestään",
      "paragraphs": [
        "Muista tervehdysten ja hyvästelyjen ero C01:stä."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-04",
        "prompt": "Mikä ilmaus tarkoittaa kohteliasta näkemiin-toivotusta?",
        "options": [
          {
            "id": "a",
            "label": "Guten Morgen!",
            "wrongFeedback": "Tämä on aamun tervehdys."
          },
          {
            "id": "b",
            "label": "Auf Wiedersehen!"
          },
          {
            "id": "c",
            "label": "Wie heißt du?",
            "wrongFeedback": "Tämä kysyy nimeä."
          }
        ],
        "correctOption": "b",
        "success": "Oikein. Auf Wiedersehen! on kohtelias hyvästely.",
        "hint": "Muista sanan alku Auf Wieder-.",
        "reteach": "Auf Wiedersehen! = Näkemiin.",
        "genericWrong": "Tarkista ensin, onko tilanne tervehdys vai hyvästely, ja valitse sitten sopiva ilmaus."
      }
    },
    {
      "id": "source",
      "phase": "Opettajan selitys",
      "kind": "explanation",
      "title": "Mitä tästä lähteestä voi harjoitella?",
      "paragraphs": [
        "M-COM-03 sisältää tervehdyksiä kuten Hallo!, Guten Tag! ja Moin! sekä hyvästelyjä kuten Tschüss!, Auf Wiedersehen! ja Bis bald!. Sama sana voi olla alueellisesti tai tilanteittain luonteva eri tavoin.",
        "Guten Tag! sopii kohteliaaseen päiväsaikaiseen tilanteeseen. Auf Wiedersehen! sopii kohteliaaseen hyvästelyyn. Tschüss! on tavallinen rennompi hyvästely.",
        "Moin ja Moin Moin ovat erityisen tuttuja Pohjois-Saksassa, Grüß Gott on yleinen myös eteläisillä saksankielisillä alueilla. Ne eivät tarkoita, että kaikki saksankieliset käyttävät niitä samalla tavalla kaikkialla.",
        "Bis bald! tarkoittaa nähdään pian, Bis später! nähdään myöhemmin ja Bis gleich! nähdään kohta. Ne ovat eri ajallisia merkityksiä, vaikka kaikki liittyvät kohtaamisen jatkumiseen myöhemmin.",
        "Kirjan alkuperäislähteen toistoa ei ole vielä hyväksytty iPhone- ja tietokonetestauksessa. Jos luet listan tekstinä, tästä syntyy kirjallisen tunnistamisen harjoitusta, ei todistetta kuullun ymmärtämisestä."
      ],
      "help": [
        {
          "title": "Selitä yksinkertaisemmin",
          "body": "Guten Tag! = hyvää päivää. Tschüss! = moikka. Auf Wiedersehen! = näkemiin. Bis bald! = nähdään pian."
        },
        {
          "title": "Onko lista dialogi?",
          "body": "Ei. Sen 20 alkuperäistä ilmausta ovat erillisiä. Ne eivät muodosta jatkuvaa keskustelua, eikä niille keksitä uutta puhujaa."
        },
        {
          "title": "Saanko kuuntelupisteitä tekstistä?",
          "body": "Et. Näkyvän litteraatin lukeminen tai tehtävän ratkaisu ei kerro, mitä ymmärsit kuulemalla. Äänen oikea laitetesti on vielä avoin."
        }
      ]
    },
    {
      "id": "original",
      "phase": "Koko alkuperäinen lista",
      "kind": "board",
      "title": "Kaikki 20 lähdeilmausta",
      "paragraphs": [
        "Taulussa näkyvät C04:n Text B -aineistosta samat 20 ihmisen lausumaa ilmausta niiden alkuperäisessä järjestyksessä. Suomenkieliset merkitykset ovat kirjan omia selityksiä.",
        "Avaa yksi kerrallaan. Päätä ensin, tervehtiikö vai hyvästeleekö ilmaus ja kuuluuko se arkiseen, kohteliaaseen vai alueelliseen käyttöön. Tarkista sitten selitys."
      ],
      "board": source.lines.map((line, i) => ({label: `${i+1} · Alkuperäinen ilmaus`, german:line.text,meaning:line.meaning}))
    },
    {
      "id": "guided",
      "phase": "Ohjattu harjoitus",
      "kind": "question",
      "title": "Kohtelias päiväsaikainen tervehdys",
      "paragraphs": [
        "Asiakaspalvelutilanne alkaa päiväsaikaan. Valitse tuttu kohtelias tervehdys."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-04",
        "prompt": "Millä sanot kohteliaasti hyvää päivää?",
        "options": [
          {
            "id": "a",
            "label": "Tschüss!",
            "wrongFeedback": "Tämä on rento hyvästely."
          },
          {
            "id": "b",
            "label": "Guten Tag!"
          },
          {
            "id": "c",
            "label": "Gute Nacht!",
            "wrongFeedback": "Tämä toivottaa hyvää yötä."
          }
        ],
        "correctOption": "b",
        "success": "Oikein. Guten Tag! sopii aloitustervehdykseksi.",
        "hint": "Etsi ilmaus, joka sisältää Tag.",
        "reteach": "Guten Tag! on päiväaikainen tervehdys.",
        "genericWrong": "Tarkista ensin, onko tilanne tervehdys vai hyvästely, ja valitse sitten sopiva ilmaus."
      }
    },
    {
      "id": "book",
      "phase": "Oppikirjan oikea Text B",
      "kind": "book",
      "title": "Lue koko lista ja tarkista neljä lähdetehtävää",
      "paragraphs": [
        "Avaa C04:n Text B LOS!:n oman lukijan sisällä. Siinä ovat kaikki kaksikymmentä lähdeilmausta suomenkielisine tukineen ja lähdeviitteineen.",
        "Tee ja tarkista C04-TEXTB-Q01–Q04 kirjassa. Palauta myös C04-EX-09–11 harjoitusnäkymässä. Tämän tunnin tarkistustila perustuu nimenomaan oikeisiin kirjoitettuihin ja tarkistettuihin vastauksiin.",
        "Älä merkitse aitoa äänentoistoa hyväksytyksi vain siksi, että toistopainike joskus näkyy. Fyysisellä laitteella tehtävä äänen tarkastus on oma avoin laatukriteerinsä."
      ],
      "bookLinks": [
        {
          "label": "C04 · Text B, M-COM-03",
          "chapterId": "04",
          "section": "text-b",
          "instruction": "Lue kaikki 20 alkuperäistä ilmausta ja tarkista C04-TEXTB-Q01–04."
        },
        {
          "label": "C04 · Harjoitukset",
          "chapterId": "04",
          "section": "practice",
          "instruction": "Tee C04-EX-09–11."
        }
      ],
      "activityId": "full-list-reviewed",
      "activityLabel": "Luin kaikki 20 alkuperäistä ilmausta ja vastasin Text B -tehtäviin"
    },
    {
      "id": "independent",
      "phase": "Itsenäinen tunnistaminen",
      "kind": "question",
      "title": "Kohtelias hyvästely",
      "paragraphs": [
        "Vastaa ilman näkyvää listaa. Saat vihjeen tarvittaessa."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-04",
        "evidenceRole": "independent",
        "prompt": "Mikä ilmaus sopii virallisen palvelutapaamisen päätteeksi?",
        "options": [
          {
            "id": "a",
            "label": "Moin!",
            "wrongFeedback": "Tämä on varsinkin Pohjois-Saksassa käytetty tervehdys."
          },
          {
            "id": "b",
            "label": "Guten Morgen!",
            "wrongFeedback": "Tämä aloittaa aamun kohtaamisen."
          },
          {
            "id": "c",
            "label": "Auf Wiedersehen!"
          }
        ],
        "correctOption": "c",
        "success": "Oikein. Auf Wiedersehen! on kohtelias näkemiin.",
        "hint": "Mieti, mikä tervehdys alkaa Auf.",
        "reteach": "Auf Wiedersehen! sopii kohteliaaksi hyvästelyksi.",
        "genericWrong": "Tarkista ensin, onko tilanne tervehdys vai hyvästely, ja valitse sitten sopiva ilmaus."
      }
    },
    {
      "id": "application",
      "phase": "Uusi tilanne",
      "kind": "question",
      "title": "Sano nähdään pian",
      "paragraphs": [
        "Olet sopinut tapaavasi saman palveluhenkilön uudelleen pian. Lopetat keskustelun luontevaan ajalliseen ilmaukseen."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-04",
        "evidenceRole": "application",
        "prompt": "Mikä lähteen ilmaus tarkoittaa Nähdään pian?",
        "options": [
          {
            "id": "a",
            "label": "Bis gleich!",
            "wrongFeedback": "Tämä tarkoittaa nähdään kohta, usein hyvin pian."
          },
          {
            "id": "b",
            "label": "Bis bald!"
          },
          {
            "id": "c",
            "label": "Bis später!",
            "wrongFeedback": "Tämä tarkoittaa nähdään myöhemmin."
          }
        ],
        "correctOption": "b",
        "success": "Oikein. Bis bald! = nähdään pian.",
        "hint": "Bald tarkoittaa pian.",
        "reteach": "Bis bald! = nähdään pian; bis gleich = nähdään kohta.",
        "genericWrong": "Tarkista ensin, onko tilanne tervehdys vai hyvästely, ja valitse sitten sopiva ilmaus."
      }
    },
    {
      "id": "activity",
      "phase": "Oma soveltaminen",
      "kind": "activity",
      "title": "Vertaa kaksi lyhyttä palvelutilannetta",
      "paragraphs": [
        "Kuvittele tilanne A: tervehdys tutulle opiskelijalle ja hyvästely. Tilanne B: kohtelias tervehdys tuntemattomalle palveluhenkilölle ja hyvästely.",
        "Valitse kummallekin ensin aloitus ja vasta sitten lopetus. Voit käyttää esimerkiksi Hallo! / Tschüss! sekä Guten Tag! / Auf Wiedersehen!. Nämä ovat omia opetusesimerkkejäsi, eivät alkuperäisen äänilistan keskustelurepliikkejä.",
        "Vahvistus tarkoittaa, että teit oman vertailun. Se ei arvioi puhetta, äänen laatua tai spontaania vuorovaikutusta."
      ],
      "activityId": "register-applied",
      "activityLabel": "Valitsin kahteen kuvitteelliseen tilanteeseen tervehdyksen ja hyvästelyn"
    },
    {
      "id": "exit",
      "phase": "Lopputarkistus",
      "kind": "question",
      "title": "Mikä EI ole tavallinen kohtaamisen aloitus?",
      "paragraphs": [
        "Muista erikseen kohtaamisen aloittaminen ja päättäminen."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-04",
        "evidenceRole": "exit",
        "prompt": "Mikä ilmaus on yleensä hyvästely eikä ensitapaamisen tervehdys?",
        "options": [
          {
            "id": "a",
            "label": "Auf Wiedersehen!"
          },
          {
            "id": "b",
            "label": "Guten Tag!",
            "wrongFeedback": "Tämä on yleinen päiväaikainen tervehdys."
          },
          {
            "id": "c",
            "label": "Hallo!",
            "wrongFeedback": "Tämä on tuttu aloitustervehdys."
          }
        ],
        "correctOption": "a",
        "success": "Oikein. Auf Wiedersehen! kuuluu yleensä hyvästelyyn.",
        "hint": "Mikä tarkoittaa suomeksi näkemiin?",
        "reteach": "Guten Tag! tervehtii, Auf Wiedersehen! hyvästelee.",
        "genericWrong": "Tarkista ensin, onko tilanne tervehdys vai hyvästely, ja valitse sitten sopiva ilmaus."
      }
    },
    {
      "id": "summary",
      "phase": "Yhteenveto",
      "kind": "summary",
      "title": "Osaat valita kohteliaisuusfraasin tilanteeseen",
      "paragraphs": [
        "Harjoittelit 20 aidosta lähteestä peräisin olevaa ilmausta ja sovelsit kohteliaita sekä rentoja tervehdyksiä. Samalla opit, että alueelliset ilmaukset eivät ole yleispäteviä kaikissa tilanteissa.",
        "C04:n Text B on oikea lähdelista, ei kuvitteellinen dialogi. Tältä tunnilta syntyy tekstipohjaisia taitohavaintoja, eikä äänen toimivuutta tai kuuntelutaitoa väitetä tarkistetuksi."
      ]
    }
  ]
};
