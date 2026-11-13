import type { TeacherLesson } from "./engine.ts";
/** C05 L023: full M-WB-05 source remains in the existing reader; source question IDs are reused. */
export const LOS1_L023_TEACHER: TeacherLesson = {
  "id": "L023",
  "bookId": 1,
  "chapterId": "05",
  "version": "2.0.0-preview.1",
  "title": "Lue vointidialogi",
  "objective": "Ymmärrän kokonaisen Heinrichin ja Karlin neljän repliikin keskustelun, puhujat, voinnin sekä kysymykset.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredActivityIds": [
    "source-read"
  ],
  "requiredPracticeIds": [],
  "requiredCheckedIds": [
    "C05-SOURCE-Q01",
    "C05-SOURCE-Q02",
    "C05-SOURCE-Q03"
  ],
  "scenes": [
    {
      "id": "welcome",
      "phase": "Aloitus",
      "kind": "introduction",
      "title": "Lue yksi kokonainen keskustelu",
      "paragraphs": [
        "C05:n Text A ei ole irrallisia sanoja. Se on Heinrichin ja Karlin neljän repliikin julkaistu keskustelu, jossa kaksi tuttua kysyy ja kertoo kuulumisiaan.",
        "Opit lukemaan sen alusta loppuun. Keskity puhujien vuoroihin, kysymykseen, vastausfraasiin ja hyvästelyyn. Saat käännökset ja sanaselitykset suomeksi.",
        "Äänitteen käyttöoikeuden ja toimivuuden tarkistus on erillinen asia: tekstin lukeminen ei tarkoita kuuntelun suorittamista."
      ]
    },
    {
      "id": "recall",
      "phase": "Muistelu",
      "title": "Mikä kysyy vointia?",
      "kind": "question",
      "paragraphs": [
        "L022 opetti vointikysymyksen. Muista ero nimikysymykseen."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-05",
        "evidenceRole": "practice",
        "prompt": "Mikä kysyy, mitä toiselle kuuluu?",
        "options": [
          {
            "id": "a",
            "label": "Wie heißt du?",
            "wrongFeedback": "Tämä kysyy toisen nimeä."
          },
          {
            "id": "b",
            "label": "Wie geht es dir?"
          },
          {
            "id": "c",
            "label": "Woher kommst du?",
            "wrongFeedback": "Tämä kysyy lähtöpaikkaa."
          }
        ],
        "correctOption": "b",
        "success": "Oikein. Wie geht es dir? on tuttavallinen vointikysymys.",
        "hint": "Ilmauksessa on geht.",
        "reteach": "Wie geht es dir? kysyy vointia, Wie heißt du? nimeä.",
        "genericWrong": "Wie geht es dir? kysyy vointia, Wie heißt du? nimeä."
      }
    },
    {
      "id": "speakers",
      "phase": "Opetus",
      "kind": "explanation",
      "title": "Ketkä puhuvat ja mistä on kyse?",
      "paragraphs": [
        "Heinrich ja Karl ovat tämän keskustelun kaksi puhujaa. Heinrich aloittaa: hän tervehtii Karlia ja kysyy, mitä tälle kuuluu.",
        "Karl vastaa voivansa hyvin ja kysyy takaisin: Und dir? Tässä dir tarkoittaa valmiissa ilmauksessa 'sinulle'. Heinrich sanoo myös voivansa hyvin.",
        "Lopuksi molemmat sanovat Auf Wiedersehen. Se tarkoittaa näkemiin. Vaikka he ovat tuttavia, myös tämä kohtelias hyvästely on mahdollinen.",
        "Fraasissa mir geht es gut sana mir tarkoittaa tässä 'minulle'. Lause tarkoittaa 'minulle kuuluu hyvää'. Muotojen sijamuotoja ei vaadita."
      ],
      "help": [
        {
          "title": "Miksi mir ja dir eroavat?",
          "body": "Mir liittyy puhujan omaan vointiin: mir geht es gut. Dir kysyy tuttavan vointia takaisin: Und dir? Opettele kokonaiset fraasit, älä taivuta niitä."
        },
        {
          "title": "Eikö tämä ole sama kuin Wie geht's?",
          "body": "On. Wie geht es dir? on pidempi kuulumiskysymys. Wie geht's? on arkinen lyhennys. Tässä alkuperäistekstissä on pidempi muoto."
        }
      ]
    },
    {
      "id": "board",
      "phase": "Mallinnus",
      "kind": "board",
      "title": "Neljä repliikkiä, neljä merkitystehtävää",
      "paragraphs": [
        "Opettaja näyttää, miten etsit puhujat repliikki repliikiltä. Vertaa merkityksiä alkuperäiseen neljän repliikin tekstiin."
      ],
      "board": [
        {
          "label": "1 · Heinrich tervehtii ja kysyy",
          "german": "Guten Tag, Karl. Wie geht es dir?",
          "meaning": "Hyvää päivää, Karl. Mitä sinulle kuuluu?"
        },
        {
          "label": "2 · Karl vastaa ja kysyy takaisin",
          "german": "Danke, mir geht es gut. Und dir?",
          "meaning": "Kiitos, minulle kuuluu hyvää. Entä sinulle?"
        },
        {
          "label": "3 · Heinrich vastaa ja hyvästelee",
          "german": "Danke, mir geht es gut. Auf Wiedersehen.",
          "meaning": "Minulle kuuluu myös hyvää. Näkemiin."
        },
        {
          "label": "4 · Karl hyvästelee",
          "german": "Auf Wiedersehen!",
          "meaning": "Näkemiin!"
        }
      ]
    },
    {
      "id": "text-a",
      "phase": "Tekstin lukeminen",
      "kind": "book",
      "title": "Lue koko oikea Text A kirjan lukijassa",
      "paragraphs": [
        "Avaa C05:n Text A. Lue kaikki neljä alkuperäistä repliikkiä ensin ilman käännöksiä ja toisen kerran suomennosten avulla. Säilytä puhujien järjestys: Heinrich, Karl, Heinrich, Karl.",
        "Etsi suoraan lähdetekstistä Wie geht es dir?, mir geht es gut, Und dir? ja Auf Wiedersehen. Opettajan taulun otteet auttavat, mutta koko pääteksti on kirjassa."
      ],
      "bookLinks": [
        {
          "label": "C05 · Koko Text A",
          "chapterId": "05",
          "section": "text",
          "instruction": "Lue Heinrichin ja Karlin kaikki neljä repliikkiä ja avaa tarvittaessa sanaselitykset."
        }
      ],
      "activityId": "source-read",
      "activityLabel": "Luin alkuperäistekstin neljä repliikkiä ja tarkistin puhujat"
    },
    {
      "id": "guided",
      "phase": "Ohjattu ymmärtäminen",
      "title": "Kuka kysyy ensin kuulumisia?",
      "kind": "question",
      "paragraphs": [
        "Palaa ensimmäiseen repliikkiin, jos tarvitset apua."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-READ-01",
        "evidenceRole": "practice",
        "prompt": "Kuka sanoo Wie geht es dir? alussa?",
        "options": [
          {
            "id": "a",
            "label": "Heinrich"
          },
          {
            "id": "b",
            "label": "Karl",
            "wrongFeedback": "Karl vastaa ensin ja kysyy takaisin vasta myöhemmin."
          },
          {
            "id": "c",
            "label": "Molemmat",
            "wrongFeedback": "Vointikysymyksen lausuu tekstin alussa Heinrich, ei molemmat."
          }
        ],
        "correctOption": "a",
        "success": "Oikein. Heinrich kysyy ensin Karlilta.",
        "hint": "Katso ensimmäisen repliikin puhujan nimeä.",
        "reteach": "Ensimmäinen puhuja on Heinrich. Karl vastaa hänelle.",
        "genericWrong": "Ensimmäinen puhuja on Heinrich. Karl vastaa hänelle."
      }
    },
    {
      "id": "checked",
      "phase": "Lähdetehtävät",
      "kind": "book",
      "title": "Kolme tarkistettavaa Text A -kysymystä",
      "paragraphs": [
        "Avaa C05:n Text A -sivun kysymykset C05-SOURCE-Q01, Q02 ja Q03. Kysymykset koskevat Heinrichin kysymystä, Karlin vointivastausta ja molempien hyvästelyä.",
        "Vastaa jokaiseen ja paina kunkin kohdalla Tarkista vastaus. Vain aidosti tallennettu ja tarkistettu vastaus täyttää tämän kohdan. Väärä vastauskin jää harjoitushistoriaan ja palaute auttaa korjaamaan.",
        "Neljäs C05-SOURCE-Q04 koskee Und dir? -ilmausta. Voit tehdä sen lisäharjoituksena."
      ],
      "bookLinks": [
        {
          "label": "C05 · Text A ja tarkistukset",
          "chapterId": "05",
          "section": "text",
          "instruction": "Tee ja tarkista C05-SOURCE-Q01–Q03 (Q04 on lisäharjoitus)."
        }
      ]
    },
    {
      "id": "independent",
      "phase": "Itsenäinen harjoittelu",
      "kind": "question",
      "title": "Muista Karlin repliikki",
      "paragraphs": [
        "Sulje teksti ennen vastaamista. Mieti nimenomaan Karlin kuulumisvastausta."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-READ-01",
        "evidenceRole": "independent",
        "prompt": "Kirjoita kaksi keskeistä sanaa Karlin myönteisestä vastauksesta (siinä järjestyksessä kuin ne esiintyvät): mir ... gut",
        "accepted": [
          "mir gut"
        ],
        "success": "Oikein. Karlin repliikissä ovat sanat mir ja gut ilmauksessa mir geht es gut.",
        "hint": "Ilmaus alkaa sanalla mir ja päättyy sanaan gut.",
        "reteach": "Karl: Danke, mir geht es gut. Und dir? Mir = minulle ja gut = hyvin.",
        "genericWrong": "Kirjoita kaksi pyydettyä sanaa muodossa mir gut.",
        "wrongAnswers": {
          "dir gut": "Dir liittyy vastakysymykseen Und dir?, mutta omaan vointiin kuuluu mir."
        }
      }
    },
    {
      "id": "application",
      "phase": "Soveltaminen",
      "title": "Mikä vastakysymys pitää keskustelun käynnissä?",
      "kind": "question",
      "paragraphs": [
        "Karl on jo vastannut hyvää. Mitä hän kysyy Heinrichiltä seuraavaksi?"
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-READ-01",
        "evidenceRole": "application",
        "prompt": "Mikä tekstin ilmaus tarkoittaa Entä sinulle?",
        "options": [
          {
            "id": "a",
            "label": "Und dir?"
          },
          {
            "id": "b",
            "label": "Auf Wiedersehen!",
            "wrongFeedback": "Tämä päättää keskustelun eikä kysy vointia takaisin."
          },
          {
            "id": "c",
            "label": "Guten Tag!",
            "wrongFeedback": "Tämä on tervehdys, ei vastakysymys."
          }
        ],
        "correctOption": "a",
        "success": "Oikein. Karl kysyy takaisin Und dir?.",
        "hint": "Und aloittaa pienen vastakysymyksen.",
        "reteach": "Und dir? = Entä sinulle? Mir geht es gut = Minulle kuuluu hyvää.",
        "genericWrong": "Und dir? = Entä sinulle? Mir geht es gut = Minulle kuuluu hyvää."
      }
    },
    {
      "id": "exit",
      "phase": "Lopputarkistus",
      "title": "Molempien vointi päätellään tekstistä",
      "kind": "question",
      "paragraphs": [
        "Koko dialogin sisältö ratkaisee. Älä yleistä mistään toisesta lähteestä."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-READ-01",
        "evidenceRole": "exit",
        "prompt": "Mitä Heinrichin ja Karlin voinnista voidaan tämän tekstin perusteella sanoa?",
        "options": [
          {
            "id": "a",
            "label": "Molemmille kuuluu hyvää."
          },
          {
            "id": "b",
            "label": "Karl voi huonosti.",
            "wrongFeedback": "Karl sanoo mir geht es gut, eli hänelle kuuluu hyvää."
          },
          {
            "id": "c",
            "label": "Heinrich on väsynyt.",
            "wrongFeedback": "Heinrich kertoo myös voivansa hyvin, eikä sano olevansa väsynyt."
          }
        ],
        "correctOption": "a",
        "success": "Oikein. Molemmat vastaavat mir geht es gut.",
        "hint": "Etsi kummankin oma vointivastaus.",
        "reteach": "Karl ja Heinrich käyttävät samaa myönteistä vointivastausta mir geht es gut.",
        "genericWrong": "Karl ja Heinrich käyttävät samaa myönteistä vointivastausta mir geht es gut."
      }
    },
    {
      "id": "summary",
      "phase": "Yhteenveto ja kertaus",
      "kind": "summary",
      "title": "Pystyt seuraamaan koko keskustelun",
      "paragraphs": [
        "Heinrich kysyy kuulumisia, Karl vastaa ja kysyy takaisin, Heinrich kertoo myös voivansa hyvin, ja molemmat hyvästelevät.",
        "L024:ssa harjoittelet samoja vointifraaseja myönteisissä ja kielteisissä vastauksissa. Kertaa myöhemmin ilman näkyvää tekstiä, kuka sanoi mitä. Kolme tarkistettua lähdetehtävää ovat lukemisen harjoitusta, eivät kuuntelukoetta."
      ]
    }
  ]
};
