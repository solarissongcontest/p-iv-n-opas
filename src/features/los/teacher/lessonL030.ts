import type { TeacherLesson } from "./engine.ts";
import { LOS1_MIDTERM_QUESTIONS } from "../content/los1Exams.ts";
/** Uses real EX-MID in reserved draft 91; no second exam, scoring, or history. */
export const LOS1_L030_TEACHER: TeacherLesson = {
  "id": "L030",
  "bookId": 1,
  "chapterId": "91",
  "version": "2.0.0-preview.1",
  "title": "Välikoe: kappaleet 1–5",
  "objective": "Teen olemassa olevan 25 tehtävän EX-MID-välikokeen sekä oman 4–6 repliikin keskustelun ja itsearvioinnin.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredActivityIds": [
    "reviewed-exam-instructions"
  ],
  "requiredPracticeIds": [
    "EX-MID-DIALOGUE-SELF"
  ],
  "requiredCheckedIds": [],
  "chapterAssessment": {
    "requiredTestIds": LOS1_MIDTERM_QUESTIONS.map(item => item.id),
    "requireApplicationDraft": true,
    "minSelfAssessmentLength": 15
  },
  "scenes": [
    {
      "id": "welcome",
      "phase": "Aloitus",
      "kind": "introduction",
      "title": "Välikoe on oma suorituksensa",
      "paragraphs": [
        "Tässä tunnissa valmistautuu LOS! 1:n oikeaan EX-MID-välikokeeseen. Se sisältää 25 pistettä kappaleista C01–C05. Tämä opettajaskripti ei luo toista koetta eikä täytä vastauksia puolestasi.",
        "Koe on itsenäisen opiskelun arviointi, ei koulun virallinen koe. Voin opastaa koejärjestelmän käytössä mutta en paljasta varsinaisten 25 tehtävän vastauksia etukäteen."
      ]
    },
    {
      "id": "recall",
      "phase": "Muistelu",
      "kind": "question",
      "title": "Muistatko kokeen laajuuden?",
      "paragraphs": [
        "Varmista ensin, että tiedät, minkä pituiseen kokeeseen olet menossa."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-STRAT-01",
        "evidenceRole": "practice",
        "prompt": "Kuinka monta automaattisesti pisteytettävää kysymystä EX-MID-välikokeessa on?",
        "options": [
          {
            "id": "a",
            "label": "15",
            "wrongFeedback": "Viisitoista on Kertaus I:n harjoituskysymysten määrä."
          },
          {
            "id": "b",
            "label": "25"
          },
          {
            "id": "c",
            "label": "50",
            "wrongFeedback": "Kokeessa on viisi osa-aluetta ja yhteensä 25 osatehtävää."
          }
        ],
        "correctOption": "b",
        "success": "Välikokeessa on 25 pisteytettävää osatehtävää.",
        "hint": "Muista 5+7+5+4+4 osa-aluejako.",
        "reteach": "Välikokeessa on 25 pisteytettävää osatehtävää. Muista 5+7+5+4+4 osa-aluejako.",
        "genericWrong": "Palaa kokeen ohjeeseen. Muista 5+7+5+4+4 osa-aluejako."
      }
    },
    {
      "id": "explain",
      "phase": "Opettajan ohje",
      "kind": "explanation",
      "title": "Mitä EX-MID sisältää ja mitä se ei mittaa",
      "paragraphs": [
        "Viisi osa-aluetta ovat tervehdykset ja hyvästelyt (5 kysymystä), nimet ja verbit (7), alkuperä ja paikat (5), du vai Sie (4) sekä kuulumiset (4). Yhteensä nämä muodostavat 25 pisteen kokeen.",
        "Oikeat vastaukset ja perustelut paljastuvat vasta kun olet vastannut jokaiseen kysymykseen ja painanut Palauta välikoe. Kirjan valmiissa kokeessa tulos säilyy paikallisessa tallennuksessa.",
        "Puhetta, kirjoituksen laatua tai ääntämistä ei pisteytetä 25 pisteeseen. Teet lisäksi kuvitteellisen 4–6 repliikin keskustelun ja arvioit sen itse.",
        "Epäonnistunut vastaus kertoo kerrattavan kohdan, ei määritä kielitaitoasi. Älä käytä koepisteitä todisteena taidosta, jota koe ei mittaa."
      ],
      "help": [
        {
          "title": "Miten lasken pisteet?",
          "body": "Jokainen 25 monivalinnasta antaa yhden pisteen oikein vastattuna. Muut tehtävät, puhe ja oma itsearvio eivät lisää pisteitä."
        },
        {
          "title": "Mitä jos haluan yrittää uudelleen?",
          "body": "Kirjan välikokeessa voi arkistoida aiemman tuloksen ja tehdä uuden yrityksen. Vanhan yrityksen vastaukset säilyvät erillään uudesta."
        },
        {
          "title": "Voinko sanoa keskustelun ääneen?",
          "body": "Kyllä. Voit esittää keskustelun ääneen tai kirjoittaa sen. Sovellus ei nauhoita eikä pisteytä ääntämistä automaattisesti."
        }
      ]
    },
    {
      "id": "board",
      "phase": "Opetustaulu",
      "kind": "board",
      "title": "Viiden osa-alueen kartta",
      "paragraphs": [
        "Katso kokeen rakenne, mutta älä harjoittele oikeita koevastauksia tämän taulun avulla. Tämä on vain sisältö- ja aikatauluohje."
      ],
      "board": [
        {
          "label": "1 · Tervehdykset",
          "german": "Begrüßung",
          "meaning": "5 tehtävää: milloin tervehditään tai hyvästellään."
        },
        {
          "label": "2 · Nimet",
          "german": "Name",
          "meaning": "7 tehtävää: nimet ja opetetut perusverbimuodot."
        },
        {
          "label": "3 · Alkuperä",
          "german": "Woher?",
          "meaning": "5 tehtävää: mistä henkilö on kotoisin."
        },
        {
          "label": "4 · Puhuttelu",
          "german": "du / Sie",
          "meaning": "4 tehtävää: puhuttelumuoto tilanteen mukaan."
        },
        {
          "label": "5 · Kuulumiset",
          "german": "Wie geht's?",
          "meaning": "4 tehtävää: vointikysymys ja vastaus."
        }
      ]
    },
    {
      "id": "guided",
      "phase": "Ohjattu valmistautuminen",
      "kind": "question",
      "title": "Milloin saat nähdä oikeat ratkaisut?",
      "paragraphs": [
        "Ennen kokeeseen menoa on tärkeää ymmärtää, miksi et saa palautetta kesken 25 kysymyksen."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-STRAT-01",
        "evidenceRole": "practice",
        "prompt": "Milloin EX-MID-välikokeen ratkaisut näytetään?",
        "options": [
          {
            "id": "a",
            "label": "Vasta kun kaikki 25 tehtävää on palautettu."
          },
          {
            "id": "b",
            "label": "Heti ensimmäisen tehtävän jälkeen.",
            "wrongFeedback": "Koe ei paljasta oikeita vastauksia kesken suorituksen."
          },
          {
            "id": "c",
            "label": "Heti Kertaus I:n jälkeen.",
            "wrongFeedback": "Kertauksen palautus ei avaa välikokeen vastauksia."
          }
        ],
        "correctOption": "a",
        "success": "Ratkaisut avautuvat vasta palautuksen jälkeen.",
        "hint": "Vastaa ensin itse.",
        "reteach": "Ratkaisut avautuvat vasta palautuksen jälkeen. Vastaa ensin itse.",
        "genericWrong": "Palaa kokeen ohjeeseen. Vastaa ensin itse."
      }
    },
    {
      "id": "preparation",
      "phase": "Koevalmistelu",
      "kind": "activity",
      "title": "Valmistaudu omiin vastauksiin",
      "paragraphs": [
        "Varaa rauhallinen hetki ja sulje muut oppikirjan mallivastaukset. Kirjan kokeessa ei ole aikarajaa.",
        "Avaa varsinainen välikoesivu vasta kun olet valmis vastaamaan itsenäisesti. Vahvista tässä valmistelutapa, ei kokeen läpäisyä."
      ],
      "activityId": "reviewed-exam-instructions",
      "activityLabel": "Olen lukenut välikokeen ohjeet"
    },
    {
      "id": "independent",
      "phase": "Itsenäinen työ",
      "kind": "question",
      "title": "Mikä tekee tuloksesta hyödyllisen?",
      "paragraphs": [
        "Tämä on kokeen menetelmään liittyvä kysymys. Se ei ole yksi varsinaisista 25 koetehtävästä."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-STRAT-01",
        "evidenceRole": "independent",
        "prompt": "Mikä on oikea tapa varmistaa oman välikokeen luotettavuus?",
        "options": [
          {
            "id": "a",
            "label": "Katson aiempien harjoitusten mallivastaukset vastaamisen aikana.",
            "wrongFeedback": "Tämä ei mittaa omaa muistamista."
          },
          {
            "id": "b",
            "label": "Annan tekoälyn ratkaista kysymykset.",
            "wrongFeedback": "Tällöin pisteet eivät kuvaa sinun osaamistasi."
          },
          {
            "id": "c",
            "label": "Yritän vastata kaikkiin itse ilman sanakirjaa ja tarkistan vasta palautuksen jälkeen."
          }
        ],
        "correctOption": "c",
        "success": "Itsenäinen suoritus antaa rehellisemmän kuvan osaamisesta.",
        "hint": "Vältä näkyviä mallivastauksia.",
        "reteach": "Itsenäinen suoritus antaa rehellisemmän kuvan osaamisesta. Vältä näkyviä mallivastauksia.",
        "genericWrong": "Palaa kokeen ohjeeseen. Vältä näkyviä mallivastauksia."
      }
    },
    {
      "id": "test",
      "phase": "Välikoe",
      "kind": "book",
      "title": "Avaa ja palauta oikea 25 tehtävän välikoe",
      "paragraphs": [
        "Avaa kirjan EX-MID-välikoe ja täytä kaikki 25 kysymystä. Paina Palauta välikoe. Näin syntyy oikea koetulos ja oikea palautusaika tähän samaan tallennuspaikkaan.",
        "Tämä opetustila lukee vain välikokeen vastatut kysymykset ja palautusmerkinnän. Se ei kirjoita uutta pisteytystä, täytä vastauksia tai muuta koehistoriaa."
      ],
      "bookLinks": [
        {
          "chapterId": "01",
          "section": "midterm",
          "label": "EX-MID · oikea välikoe",
          "instruction": "Vastaa kaikkiin 25 monivalintaan ja palauta vasta lopuksi."
        }
      ]
    },
    {
      "id": "application",
      "phase": "Oma viestintä",
      "kind": "question",
      "title": "Mikä osa ei saa automaattisia koepisteitä?",
      "paragraphs": [
        "Muista erottaa kirjallinen ja suullinen oma työ koneellisesti arvioiduista monivalinnoista."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-STRAT-01",
        "evidenceRole": "application",
        "prompt": "Mikä kuvaa välikokeen omaa 4–6 repliikin keskustelua?",
        "options": [
          {
            "id": "a",
            "label": "Se tuo automaattisesti viisi lisäpistettä.",
            "wrongFeedback": "25 pisteen tulos perustuu vain monivalintoihin."
          },
          {
            "id": "b",
            "label": "Se tehdään erikseen ääneen tai kirjoittaen ja arvioidaan itse."
          },
          {
            "id": "c",
            "label": "Sen voi merkitä automaattisesti ääntämiskokeena.",
            "wrongFeedback": "Sovellus ei arvioi ääntämistä."
          }
        ],
        "correctOption": "b",
        "success": "Oma keskustelu arvioidaan erillään 25 pisteestä.",
        "hint": "Kirjoita kuvitteellinen keskustelu tai esitä se ääneen ja arvioi itse.",
        "reteach": "Oma keskustelu arvioidaan erillään 25 pisteestä. Kirjoita kuvitteellinen keskustelu tai esitä se ääneen ja arvioi itse.",
        "genericWrong": "Palaa kokeen ohjeeseen. Kirjoita kuvitteellinen keskustelu tai esitä se ääneen ja arvioi itse."
      }
    },
    {
      "id": "reflection",
      "phase": "Oma arviointi",
      "kind": "book",
      "title": "Oma keskustelu ja itsearviointi",
      "paragraphs": [
        "Välikokeen sivun lopussa voit kirjoittaa 4–6 repliikin kuvitteellisen keskustelun tai esittää sen ääneen. Suositus: tervehdi, kysy nimi, kerro oma kuvitteellinen nimi, kysy lähtömaata ja kuulumisia sekä vastaa.",
        "Kirjaa myös sanallinen itsearvio (vähintään 15 merkkiä) sekä valitse välikokeen EX-MID-DIALOGUE-SELF itsearviovalinta. Tämä oppitunti tarkistaa ne suoraan välikokeen nykyisestä tallennuksesta.",
        "Älä kirjoita todellisia nimiä tai yhteystietoja. Puhetta ei tallenneta eikä arvioida koneellisesti."
      ],
      "bookLinks": [
        {
          "chapterId": "01",
          "section": "midterm",
          "label": "EX-MID · keskustelu ja itsearvio",
          "instruction": "Täytä oma keskustelu, sanallinen arvio ja EX-MID-DIALOGUE-SELF."
        }
      ]
    },
    {
      "id": "exit",
      "phase": "Lopputarkistus",
      "kind": "question",
      "title": "Miten uusi koeyritys toimii?",
      "paragraphs": [
        "Tee viimeinen järjestelmää koskeva tarkistus. Varsinainen koetulos on silti aina vain kirjan välikokeessa."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-STRAT-01",
        "evidenceRole": "exit",
        "prompt": "Mitä tapahtuu vanhalle koetulokselle, jos aloitat uusinnan kirjan ohjeen mukaan?",
        "options": [
          {
            "id": "a",
            "label": "Se arkistoidaan ennen vastauksien tyhjentämistä."
          },
          {
            "id": "b",
            "label": "Se korvataan salaa uudella pistetuloksella.",
            "wrongFeedback": "Kirjan välikoe arkistoi edellisen yrityksen erikseen."
          },
          {
            "id": "c",
            "label": "Sen pisteet lisätään uuteen välikokeeseen.",
            "wrongFeedback": "Jokainen yritys saa oman pistetuloksen."
          }
        ],
        "correctOption": "a",
        "success": "Vanha yritys arkistoidaan ennen uusintaa.",
        "hint": "Koehistoria on erillinen nykyisen yrityksen vastauksista.",
        "reteach": "Vanha yritys arkistoidaan ennen uusintaa. Koehistoria on erillinen nykyisen yrityksen vastauksista.",
        "genericWrong": "Palaa kokeen ohjeeseen. Koehistoria on erillinen nykyisen yrityksen vastauksista."
      }
    },
    {
      "id": "summary",
      "phase": "Yhteenveto",
      "kind": "summary",
      "title": "Välikokeen ja oma-arvion yhteenveto",
      "paragraphs": [
        "Välikoe on palautettu vasta kun kaikki 25 oikeaa vastausta on tallennettu ja palautus vahvistettu. Kertaustehtävät eivät täytä koetta.",
        "Opettajatilassa näet välikokeen palautumistilanteen, 4–6 repliikin oman tuotoksen tallennuksen ja itsearvioinnin tilan. Valmis tarkoittaa näiden opiskelutekojen läpikäyntiä, ei 25/25 pistettä.",
        "Jos tarvitset uusinnan, aloita se vain kirjan välikokeen kautta, jolloin aiempi yritys arkistoidaan. Palaa myöhemmin heikompiin aiheisiin."
      ]
    }
  ]
};
