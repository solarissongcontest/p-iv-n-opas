import type { Ke04SeedQuestion } from "./types";

export const questions: Ke04SeedQuestion[] = [
  {
    "seedKey": "ke04-v3:KE04-SAA-001",
    "contentId": "KE04-SAA-001",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Teoreettinen ja todellinen saanto",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitä tarkoittaa teoreettinen saanto?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Suurinta tuotemäärää, joka voi stoikiometrian mukaan muodostua annetuista lähtöaineista ideaalissa täydellisessä reaktiossa.",
    "scoring": "2 p: suurin mahdollinen 1 p, stoikiometria/ideaali 1 p.",
    "hints": [
      "Se on laskennallinen maksimi.",
      "Perustuu reaktioyhtälöön."
    ],
    "skills": [
      "ke04.saa.teoreettinen_ja_todellinen_saanto",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Teoreettinen ja todellinen saanto",
      "ke04.saa.teoreettinen_ja_todellinen_saanto"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 70,
    "examEligible": false,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Tunnistus"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-002",
    "contentId": "KE04-SAA-002",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Teoreettinen ja todellinen saanto",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitä tarkoittaa todellinen saanto?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kokeessa tai prosessissa oikeasti saatu tuotemäärä.",
    "scoring": "1 p.",
    "hints": [
      "Mitattu määrä.",
      "Ei laskennallinen maksimi."
    ],
    "skills": [
      "ke04.saa.teoreettinen_ja_todellinen_saanto",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Teoreettinen ja todellinen saanto",
      "ke04.saa.teoreettinen_ja_todellinen_saanto"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 70,
    "examEligible": false,
    "reserveForExam": false,
    "validated": true,
    "points": 1,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Tunnistus"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-003",
    "contentId": "KE04-SAA-003",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Teoreettinen ja todellinen saanto",
    "questionType": "matching",
    "difficulty": 2,
    "prompt": "Yhdistä: teoreettinen saanto, todellinen saanto, saantoprosentti ↔ laskennallinen maksimi; mitattu tuote; todellisen osuus teoreettisesta prosentteina.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Teoreettinen→laskennallinen maksimi; todellinen→mitattu tuote; saantoprosentti→todellinen/teoreettinen ×100 %.",
    "scoring": "3 p.",
    "hints": [
      "Erota laskettu ja mitattu.",
      "Prosentti vertaa niitä."
    ],
    "skills": [
      "ke04.saa.teoreettinen_ja_todellinen_saanto",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Teoreettinen ja todellinen saanto",
      "ke04.saa.teoreettinen_ja_todellinen_saanto"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 133,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "Teoreettinen",
        "right": "laskennallinen maksimi"
      },
      {
        "left": "todellinen",
        "right": "mitattu tuote"
      },
      {
        "left": "saantoprosentti",
        "right": "todellinen/teoreettinen ×100 %."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-004",
    "contentId": "KE04-SAA-004",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Teoreettinen ja todellinen saanto",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi todellinen saanto on usein teoreettista saantoa pienempi?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Reaktio ei ehkä mene täydellisesti, voi tapahtua sivureaktioita, tuotetta voi hävitä erotuksessa/puhdistuksessa tai mittauksissa on hävikkiä.",
    "scoring": "4 p: kaksi pätevää syytä 2 p, kolme 3 p, neljä 4 p.",
    "hints": [
      "Mieti sekä kemiallista reaktiota että työvaiheita.",
      "Tuote voi jäädä laitteistoon tai liuokseen."
    ],
    "skills": [
      "ke04.saa.teoreettinen_ja_todellinen_saanto",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Teoreettinen ja todellinen saanto",
      "ke04.saa.teoreettinen_ja_todellinen_saanto"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 194,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Selitys"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-005",
    "contentId": "KE04-SAA-005",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Teoreettinen ja todellinen saanto",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Väite: 'Teoreettinen saanto on sama kuin vaa'alla mitattu tuotemassa.' Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Teoreettinen saanto lasketaan stoikiometriasta; vaa'alla mitattu määrä on todellinen saanto. Ne ovat samoja vain ideaalissa 100 %:n tapauksessa.",
    "scoring": "3 p: teoreettinen laskettu 1 p, todellinen mitattu 1 p, 100 % -ehto 1 p.",
    "hints": [
      "Teoreettinen = lasku.",
      "Todellinen = koe."
    ],
    "skills": [
      "ke04.saa.teoreettinen_ja_todellinen_saanto",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Teoreettinen ja todellinen saanto",
      "ke04.saa.teoreettinen_ja_todellinen_saanto"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "yield.theoretical_vs_actual"
    ],
    "estimatedSeconds": 194,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Virheen tunnistus"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-006",
    "contentId": "KE04-SAA-006",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Saantoprosentin kaava",
    "questionType": "short_answer",
    "difficulty": 1,
    "prompt": "Kirjoita saantoprosentin kaava.",
    "options": [],
    "correctAnswer": null,
    "explanation": "saanto-% = (todellinen saanto / teoreettinen saanto) × 100 %.",
    "scoring": "2 p: oikea suhde 1 p, ×100 % 1 p.",
    "hints": [
      "Todellinen on osa teoreettisesta.",
      "Osa/kokonaisuus ×100."
    ],
    "skills": [
      "ke04.saa.saantoprosentin_kaava",
      "task.kaava"
    ],
    "expectedConcepts": [
      "Saantoprosentin kaava",
      "ke04.saa.saantoprosentin_kaava"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 98,
    "examEligible": false,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Kaava"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-007",
    "contentId": "KE04-SAA-007",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Saantoprosentin kaava",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Teoreettinen saanto on 10,0 g ja todellinen 8,0 g. Laske saantoprosentti.",
    "options": [],
    "correctAnswer": null,
    "explanation": "8,0/10,0×100 %=80 %.",
    "scoring": "2 p.",
    "hints": [
      "Todellinen ylös.",
      "Kerro sadalla."
    ],
    "skills": [
      "ke04.saa.saantoprosentin_kaava",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Saantoprosentin kaava",
      "ke04.saa.saantoprosentin_kaava"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 166,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-008",
    "contentId": "KE04-SAA-008",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Saantoprosentin kaava",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Teoreettinen saanto 25,0 g, todellinen 20,0 g. Saanto-%?",
    "options": [],
    "correctAnswer": null,
    "explanation": "80,0 %.",
    "scoring": "2 p.",
    "hints": [
      "20/25=0,8.",
      "×100."
    ],
    "skills": [
      "ke04.saa.saantoprosentin_kaava",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Saantoprosentin kaava",
      "ke04.saa.saantoprosentin_kaava"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 166,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-009",
    "contentId": "KE04-SAA-009",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Saantoprosentin kaava",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "Teoreettinen saanto on 12,5 g ja todellinen 9,75 g. Laske saanto-% oikein kolmella merkitsevällä numerolla.",
    "options": [],
    "correctAnswer": null,
    "explanation": "9,75/12,5×100 %=78,0 %.",
    "scoring": "3 p: suhde 1 p, lasku 1 p, tulos/tarkkuus 1 p.",
    "hints": [
      "Jaa 9,75 luvulla 12,5.",
      "Muunna prosentiksi."
    ],
    "skills": [
      "ke04.saa.saantoprosentin_kaava",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Saantoprosentin kaava",
      "ke04.saa.saantoprosentin_kaava"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 194,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-010",
    "contentId": "KE04-SAA-010",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Saantoprosentin kaava",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija laskee saanto-% = teoreettinen/todellinen×100 ja saa yli 100 %. Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Suhde on todellinen/teoreettinen×100. Jos todellinen 8 g ja teoreettinen 10 g, saanto on 80 %, ei 125 %.",
    "scoring": "3 p: suhde oikein 2 p, esimerkki/tulos 1 p.",
    "hints": [
      "Osan pitää olla osoittajassa.",
      "Tavallinen saanto alle 100 %."
    ],
    "skills": [
      "ke04.saa.saantoprosentin_kaava",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Saantoprosentin kaava",
      "ke04.saa.saantoprosentin_kaava"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "yield.theoretical_vs_actual",
      "yield.percent_direction"
    ],
    "estimatedSeconds": 194,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Virheen tunnistus"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-011",
    "contentId": "KE04-SAA-011",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Todellisen saannon laskeminen prosentista",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Teoreettinen saanto on 20,0 g ja saanto 75 %. Kuinka paljon tuotetta saadaan todellisuudessa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,75×20,0 g=15,0 g.",
    "scoring": "3 p: 75 %=0,75 1 p, kertolasku 1 p, tulos 1 p.",
    "hints": [
      "Todellinen = prosenttiosuus × teoreettinen.",
      "75 %=0,75."
    ],
    "skills": [
      "ke04.saa.todellisen_saannon_laskeminen_prosentista",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Todellisen saannon laskeminen prosentista",
      "ke04.saa.todellisen_saannon_laskeminen_prosentista"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 166,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-012",
    "contentId": "KE04-SAA-012",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Todellisen saannon laskeminen prosentista",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Teoreettinen saanto 50,0 g, saanto 82 %. Todellinen saanto?",
    "options": [],
    "correctAnswer": null,
    "explanation": "41,0 g.",
    "scoring": "3 p.",
    "hints": [
      "0,82×50,0.",
      "Yksikkö g."
    ],
    "skills": [
      "ke04.saa.todellisen_saannon_laskeminen_prosentista",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Todellisen saannon laskeminen prosentista",
      "ke04.saa.todellisen_saannon_laskeminen_prosentista"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 166,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-013",
    "contentId": "KE04-SAA-013",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Todellisen saannon laskeminen prosentista",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "Teoreettinen saanto on 0,250 mol ja saanto 68,0 %. Laske todellinen ainemäärä.",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,680×0,250=0,170 mol.",
    "scoring": "3 p.",
    "hints": [
      "Sama prosenttikaava toimii mooleille.",
      "Kerro 0,250 luvulla 0,680."
    ],
    "skills": [
      "ke04.saa.todellisen_saannon_laskeminen_prosentista",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Todellisen saannon laskeminen prosentista",
      "ke04.saa.todellisen_saannon_laskeminen_prosentista"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 194,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-014",
    "contentId": "KE04-SAA-014",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Todellisen saannon laskeminen prosentista",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "Teoreettinen tuotemassa 32,0 g, saanto 92,5 %. Laske todellinen massa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,925×32,0=29,6 g.",
    "scoring": "3 p.",
    "hints": [
      "Muunna prosentti desimaaliksi.",
      "Kerro teoreettisella."
    ],
    "skills": [
      "ke04.saa.todellisen_saannon_laskeminen_prosentista",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Todellisen saannon laskeminen prosentista",
      "ke04.saa.todellisen_saannon_laskeminen_prosentista"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 194,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-015",
    "contentId": "KE04-SAA-015",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Todellisen saannon laskeminen prosentista",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija laskee 80 % saannolla todellisen määrän jakamalla teoreettisen 0,80:llä. Mikä määrä sillä oikeasti kasvaa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Jakolasku teoreettinen/0,80 antaa suuremman luvun eikä todellista saantoa. Todellinen saanto saadaan kertomalla teoreettinen 0,80:llä. Jakamista käytetään päinvastoin, kun todellisesta ja prosentista etsitään teoreettista.",
    "scoring": "4 p: virhe 1 p, kertominen 1 p, jakamisen oikea käyttö 2 p.",
    "hints": [
      "80 % tuotteesta ei voi olla enemmän kuin 100 %.",
      "Mieti mitä suuretta etsit."
    ],
    "skills": [
      "ke04.saa.todellisen_saannon_laskeminen_prosentista",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Todellisen saannon laskeminen prosentista",
      "ke04.saa.todellisen_saannon_laskeminen_prosentista"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "yield.theoretical_vs_actual"
    ],
    "estimatedSeconds": 194,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Virheen tunnistus"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-016",
    "contentId": "KE04-SAA-016",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Teoreettisen saannon laskeminen todellisesta",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Todellinen saanto on 16,0 g ja saanto 80,0 %. Laske teoreettinen saanto.",
    "options": [],
    "correctAnswer": null,
    "explanation": "16,0/0,800=20,0 g.",
    "scoring": "3 p.",
    "hints": [
      "Todellinen = prosentti×teoreettinen.",
      "Ratkaise teoreettinen jakamalla."
    ],
    "skills": [
      "ke04.saa.teoreettisen_saannon_laskeminen_todellisesta",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Teoreettisen saannon laskeminen todellisesta",
      "ke04.saa.teoreettisen_saannon_laskeminen_todellisesta"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 166,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-017",
    "contentId": "KE04-SAA-017",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Teoreettisen saannon laskeminen todellisesta",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Todellinen saanto 27,0 g ja saanto 90,0 %. Teoreettinen saanto?",
    "options": [],
    "correctAnswer": null,
    "explanation": "30,0 g.",
    "scoring": "3 p.",
    "hints": [
      "27/0,90.",
      "Teoreettisen tulee olla suurempi."
    ],
    "skills": [
      "ke04.saa.teoreettisen_saannon_laskeminen_todellisesta",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Teoreettisen saannon laskeminen todellisesta",
      "ke04.saa.teoreettisen_saannon_laskeminen_todellisesta"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 166,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-018",
    "contentId": "KE04-SAA-018",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Teoreettisen saannon laskeminen todellisesta",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "Todellinen ainemäärä 0,144 mol ja saanto 72,0 %. Teoreettinen ainemäärä?",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,144/0,720=0,200 mol.",
    "scoring": "3 p.",
    "hints": [
      "Jaa desimaalimuotoisella prosentilla.",
      "Tarkista että tulos kasvaa."
    ],
    "skills": [
      "ke04.saa.teoreettisen_saannon_laskeminen_todellisesta",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Teoreettisen saannon laskeminen todellisesta",
      "ke04.saa.teoreettisen_saannon_laskeminen_todellisesta"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 194,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-019",
    "contentId": "KE04-SAA-019",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Teoreettisen saannon laskeminen todellisesta",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "Todellinen massa 4,25 g ja saanto 85,0 %. Laske teoreettinen massa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "4,25/0,850=5,00 g.",
    "scoring": "3 p.",
    "hints": [
      "Ratkaise teoreettinen.",
      "85 % viidestä grammasta on 4,25 g."
    ],
    "skills": [
      "ke04.saa.teoreettisen_saannon_laskeminen_todellisesta",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Teoreettisen saannon laskeminen todellisesta",
      "ke04.saa.teoreettisen_saannon_laskeminen_todellisesta"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 194,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-020",
    "contentId": "KE04-SAA-020",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Teoreettisen saannon laskeminen todellisesta",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Jos todellinen saanto ja saantoprosentti tunnetaan, miksi teoreettinen saanto voidaan ratkaista ilman reaktioyhtälöä?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Koska prosenttisuhde yhdistää nämä kaksi suuretta suoraan: teoreettinen=todellinen/(saanto desimaalina). Reaktioyhtälöä tarvitaan, jos teoreettinen saanto pitää johtaa lähtöaineista.",
    "scoring": "3 p.",
    "hints": [
      "Käytä prosenttikaavaa algebrallisesti.",
      "Stoikiometria tarvitaan vasta lähtöaineisiin yhdistämiseen."
    ],
    "skills": [
      "ke04.saa.teoreettisen_saannon_laskeminen_todellisesta",
      "task.paattely"
    ],
    "expectedConcepts": [
      "Teoreettisen saannon laskeminen todellisesta",
      "ke04.saa.teoreettisen_saannon_laskeminen_todellisesta"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 271,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Päättely"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-021",
    "contentId": "KE04-SAA-021",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Stoikiometria + saanto",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "A→B suhteessa 1:1. A:ta reagoi 0,500 mol. Teoreettinen B-määrä?",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,500 mol B.",
    "scoring": "2 p.",
    "hints": [
      "1:1.",
      "Sama ainemäärä."
    ],
    "skills": [
      "ke04.saa.stoikiometria_saanto",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Stoikiometria + saanto",
      "ke04.saa.stoikiometria_saanto"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 166,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-022",
    "contentId": "KE04-SAA-022",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Stoikiometria + saanto",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Reaktiossa A → B suhde on 1:1 ja A:ta reagoi 0,500 mol. Jos B:n saanto on 80 %, mikä on B:n todellinen ainemäärä?",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,400 mol.",
    "scoring": "3 p: teoreettinen 1 p, 0,80× 1 p, tulos 1 p.",
    "hints": [
      "80 % 0,500 mol:sta.",
      "Kerro 0,8."
    ],
    "skills": [
      "ke04.saa.stoikiometria_saanto",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Stoikiometria + saanto",
      "ke04.saa.stoikiometria_saanto"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 166,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-023",
    "contentId": "KE04-SAA-023",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Stoikiometria + saanto",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "2A→3B. A:ta reagoi 0,400 mol. Laske B:n teoreettinen ainemäärä.",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,400×3/2=0,600 mol B.",
    "scoring": "3 p.",
    "hints": [
      "Käytä suhdetta 2:3.",
      "Kerro 3/2."
    ],
    "skills": [
      "ke04.saa.stoikiometria_saanto",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Stoikiometria + saanto",
      "ke04.saa.stoikiometria_saanto"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 194,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-024",
    "contentId": "KE04-SAA-024",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Stoikiometria + saanto",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "Reaktiossa 2A → 3B käytetään 0,400 mol A:ta ja A reagoi kokonaan. Jos B:n saanto on 75 %, mikä on B:n todellinen ainemäärä?",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,75×0,600=0,450 mol.",
    "scoring": "3 p.",
    "hints": [
      "Ensin teoreettinen 0,600.",
      "Sitten saantokerroin."
    ],
    "skills": [
      "ke04.saa.stoikiometria_saanto",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Stoikiometria + saanto",
      "ke04.saa.stoikiometria_saanto"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 194,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-025",
    "contentId": "KE04-SAA-025",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Stoikiometria + saanto",
    "questionType": "calculation",
    "difficulty": 4,
    "prompt": "2H₂+O₂→2H₂O. 4,00 mol H₂ reagoi ylimääräisen O₂:n kanssa. Saanto on 85,0 %. Kuinka paljon H₂O:ta todellisuudessa muodostuu?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Teoreettinen n(H₂O)=4,00 mol (2:2). Todellinen=0,850×4,00=3,40 mol.",
    "scoring": "5 p: teoreettinen 2 p, saantokerroin 1 p, lasku 1 p, tulos 1 p.",
    "hints": [
      "H₂:H₂O=1:1.",
      "Käytä 85 % vasta lopuksi",
      "Kirjoita välivaiheet näkyviin ja tarkista lopuksi yksiköt sekä tuloksen suuruusluokka.."
    ],
    "skills": [
      "ke04.saa.stoikiometria_saanto",
      "task.integroiva_lasku"
    ],
    "expectedConcepts": [
      "Stoikiometria + saanto",
      "ke04.saa.stoikiometria_saanto"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 221,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 5,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Integroiva lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-026",
    "contentId": "KE04-SAA-026",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Rajoittava tekijä + saanto",
    "questionType": "application",
    "difficulty": 2,
    "prompt": "Mikä aine määrää teoreettisen saannon, jos lähtöaineita on useita?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Rajoittava lähtöaine.",
    "scoring": "1 p.",
    "hints": [
      "Se loppuu ensin.",
      "Sen jälkeen tuote ei enää lisäänny."
    ],
    "skills": [
      "ke04.saa.rajoittava_tekija_saanto",
      "task.paattely"
    ],
    "expectedConcepts": [
      "Rajoittava tekijä + saanto",
      "ke04.saa.rajoittava_tekija_saanto"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 233,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 1,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Päättely"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-027",
    "contentId": "KE04-SAA-027",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Rajoittava tekijä + saanto",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "2H₂+O₂→2H₂O. H₂=3,0 mol, O₂=2,0 mol. Mikä on H₂O:n teoreettinen määrä?",
    "options": [],
    "correctAnswer": null,
    "explanation": "H₂ rajoittaa: 3,0 mol H₂ →3,0 mol H₂O.",
    "scoring": "4 p: H₂ rajoittava 2 p, suhde 1:1 1 p, tulos 1 p.",
    "hints": [
      "3 H₂ tarvitsee 1,5 O₂.",
      "O₂:ta on riittävästi."
    ],
    "skills": [
      "ke04.saa.rajoittava_tekija_saanto",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Rajoittava tekijä + saanto",
      "ke04.saa.rajoittava_tekija_saanto"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 194,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-028",
    "contentId": "KE04-SAA-028",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Rajoittava tekijä + saanto",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "Reaktiossa 2H₂ + O₂ → 2H₂O teoreettinen H₂O-määrä on 3,00 mol ja todellinen määrä 2,40 mol. Laske saantoprosentti.",
    "options": [],
    "correctAnswer": null,
    "explanation": "2,40/3,00×100 %=80,0 %.",
    "scoring": "3 p.",
    "hints": [
      "Todellinen/teoreettinen.",
      "×100."
    ],
    "skills": [
      "ke04.saa.rajoittava_tekija_saanto",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Rajoittava tekijä + saanto",
      "ke04.saa.rajoittava_tekija_saanto"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 194,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-029",
    "contentId": "KE04-SAA-029",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Rajoittava tekijä + saanto",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "N₂+3H₂→2NH₃. N₂=1,0 mol, H₂=2,4 mol. Laske teoreettinen NH₃-määrä.",
    "options": [],
    "correctAnswer": null,
    "explanation": "H₂ rajoittaa; n(NH₃)=2,4×2/3=1,60 mol.",
    "scoring": "4 p: rajoittava 1 p, suhde 1 p, lasku 1 p, tulos 1 p.",
    "hints": [
      "N₂ tarvitsisi 3,0 mol H₂.",
      "Käytä H₂:NH₃=3:2."
    ],
    "skills": [
      "ke04.saa.rajoittava_tekija_saanto",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Rajoittava tekijä + saanto",
      "ke04.saa.rajoittava_tekija_saanto"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 194,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-030",
    "contentId": "KE04-SAA-030",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Rajoittava tekijä + saanto",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "Reaktiossa N₂ + 3H₂ → 2NH₃ teoreettinen NH₃-määrä on 1,60 mol. Jos saanto on 70,0 %, kuinka paljon NH₃:a saadaan todellisuudessa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,700×1,60=1,12 mol NH₃.",
    "scoring": "4 p: teoreettinen 1 p, saantokerroin 1 p, lasku 1 p, tulos 1 p.",
    "hints": [
      "Käytä 1,60 mol laskennallisena maksimina.",
      "70 %=0,700."
    ],
    "skills": [
      "ke04.saa.rajoittava_tekija_saanto",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Rajoittava tekijä + saanto",
      "ke04.saa.rajoittava_tekija_saanto"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 194,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-031",
    "contentId": "KE04-SAA-031",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Saanto massalaskuissa",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Teoreettinen tuotemäärä on 0,250 mol ja tuotteen M=80,0 g/mol. Laske teoreettinen massa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "m=0,250×80,0=20,0 g.",
    "scoring": "3 p.",
    "hints": [
      "m=nM.",
      "Teoreettiset molit → teoreettinen massa."
    ],
    "skills": [
      "ke04.saa.saanto_massalaskuissa",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Saanto massalaskuissa",
      "ke04.saa.saanto_massalaskuissa"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 166,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-032",
    "contentId": "KE04-SAA-032",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Saanto massalaskuissa",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "Tuotteen teoreettinen massa on 20,0 g ja todellinen massa 17,0 g. Laske saantoprosentti.",
    "options": [],
    "correctAnswer": null,
    "explanation": "17,0/20,0×100=85,0 %.",
    "scoring": "3 p.",
    "hints": [
      "Teoreettinen massa 20,0 g.",
      "Todellinen/teoreettinen."
    ],
    "skills": [
      "ke04.saa.saanto_massalaskuissa",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Saanto massalaskuissa",
      "ke04.saa.saanto_massalaskuissa"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 194,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-033",
    "contentId": "KE04-SAA-033",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Saanto massalaskuissa",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "Teoreettinen tuotemassa on 12,0 g ja saanto 62,5 %. Laske todellinen massa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "7,50 g.",
    "scoring": "3 p.",
    "hints": [
      "0,625×12,0.",
      "Tuloksen pitää olla alle 12 g."
    ],
    "skills": [
      "ke04.saa.saanto_massalaskuissa",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Saanto massalaskuissa",
      "ke04.saa.saanto_massalaskuissa"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 194,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-034",
    "contentId": "KE04-SAA-034",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Saanto massalaskuissa",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "Todellinen tuotemassa on 9,60 g ja saanto 80,0 %. Tuotteen M=48,0 g/mol. Laske teoreettinen ainemäärä.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Teoreettinen massa=9,60/0,800=12,0 g; n=12,0/48,0=0,250 mol.",
    "scoring": "5 p: teoreettinen massa 2 p, n-kaava 1 p, lasku 1 p, tulos 1 p.",
    "hints": [
      "Palauta ensin 100 % massa.",
      "Sitten n=m/M."
    ],
    "skills": [
      "ke04.saa.saanto_massalaskuissa",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Saanto massalaskuissa",
      "ke04.saa.saanto_massalaskuissa"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 194,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 5,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-035",
    "contentId": "KE04-SAA-035",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Saanto massalaskuissa",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Reaktio tuottaisi teoreettisesti 0,400 mol ainetta, M=75,0 g/mol. Kokeessa saadaan 24,0 g. Laske saanto-%:",
    "options": [],
    "correctAnswer": null,
    "explanation": "Teoreettinen massa=0,400×75,0=30,0 g; saanto=24,0/30,0×100=80,0 %.",
    "scoring": "5 p: teoreettinen massa 2 p, prosenttikaava 1 p, lasku 1 p, tulos 1 p.",
    "hints": [
      "Vertaa samoja suureita: massaa massaan.",
      "Laske ensin teoreettinen massa",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "ke04.saa.saanto_massalaskuissa",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Saanto massalaskuissa",
      "ke04.saa.saanto_massalaskuissa"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 309,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 5,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Soveltaminen"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-036",
    "contentId": "KE04-SAA-036",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Yli 100 % saanto ja laadun arviointi",
    "questionType": "application",
    "difficulty": 2,
    "prompt": "Voiko mitattu saantoprosentti olla laskennallisesti yli 100 %? Mitä se yleensä kertoo?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Mittaus voi antaa yli 100 %, mutta se ei tarkoita aidosti yli teoreettisen määrän puhdasta tuotetta; usein tuotteessa on epäpuhtauksia/liuotinta tai mittaus/lasku on virheellinen.",
    "scoring": "3 p: voi mitattuna 1 p, ei aitoa puhdasta yli-maksimia 1 p, syy 1 p.",
    "hints": [
      "Teoreettinen on ideaalinen maksimi puhtaalle tuotteelle.",
      "Mieti märkä tuote."
    ],
    "skills": [
      "ke04.saa.yli_100_saanto_ja_laadun_arviointi",
      "task.paattely"
    ],
    "expectedConcepts": [
      "Yli 100 % saanto ja laadun arviointi",
      "ke04.saa.yli_100_saanto_ja_laadun_arviointi"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 233,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Päättely"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-037",
    "contentId": "KE04-SAA-037",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Yli 100 % saanto ja laadun arviointi",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Saanto 108 % viittaa todennäköisimmin",
    "options": [
      "epäpuhtauteen, märkyyteen tai mittausvirheeseen",
      "siihen, että reaktio eteni täysin ja puhdas tuote ylitti stoikiometrisen maksimin",
      "siihen, että lähtöaineen moolimassa pieneni reaktion aikana",
      "siihen, että saantoprosentti pitää aina pyöristää alaspäin 100 %:iin"
    ],
    "correctAnswer": "epäpuhtauteen, märkyyteen tai mittausvirheeseen",
    "explanation": "A.",
    "scoring": "1 p.",
    "hints": [
      "Puhdas tuote ei voi ylittää stoikiometrista maksimia.",
      "Mittauksessa voi olla ylimääräistä massaa."
    ],
    "skills": [
      "ke04.saa.yli_100_saanto_ja_laadun_arviointi",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Yli 100 % saanto ja laadun arviointi",
      "ke04.saa.yli_100_saanto_ja_laadun_arviointi"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "yield.percent_direction",
      "yield.purity_over100"
    ],
    "estimatedSeconds": 67,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 1,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Monivalinta"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-038",
    "contentId": "KE04-SAA-038",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Yli 100 % saanto ja laadun arviointi",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miten märkä tuote voi nostaa laskettua saantoprosenttia?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Tuotteeseen jäänyt vesi tai liuotin kasvattaa punnittua massaa, vaikka puhtaan tuotteen määrä ei ole kasvanut. Jos koko massa tulkitaan tuotteeksi, saanto ylikorostuu.",
    "scoring": "3 p.",
    "hints": [
      "Vaaka ei tiedä mikä osa massasta on tuotetta.",
      "Liuotin lisää massaa."
    ],
    "skills": [
      "ke04.saa.yli_100_saanto_ja_laadun_arviointi",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Yli 100 % saanto ja laadun arviointi",
      "ke04.saa.yli_100_saanto_ja_laadun_arviointi"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 194,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Selitys"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-039",
    "contentId": "KE04-SAA-039",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Yli 100 % saanto ja laadun arviointi",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Teoreettinen saanto 10,0 g, mitattu 'tuote' 11,2 g. Opiskelija ilmoittaa 112 % ja päättelee reaktion tuottaneen enemmän ainetta kuin atomit sallivat. Korjaa johtopäätös.",
    "options": [],
    "correctAnswer": null,
    "explanation": "112 % on hälytysmerkki epäpuhtaasta/märästä tuotteesta tai lasku-/mittausvirheestä, ei massan säilymisen rikkoutumisesta.",
    "scoring": "3 p: 112 % havainto 1 p, epäpuhtaus/virhe 1 p, massan säilyminen 1 p.",
    "hints": [
      "Teoreettinen määrä perustuu atomitasapainoon.",
      "Tarkista näytteen puhtaus."
    ],
    "skills": [
      "ke04.saa.yli_100_saanto_ja_laadun_arviointi",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Yli 100 % saanto ja laadun arviointi",
      "ke04.saa.yli_100_saanto_ja_laadun_arviointi"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "yield.theoretical_vs_actual"
    ],
    "estimatedSeconds": 194,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Virheen tunnistus"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-040",
    "contentId": "KE04-SAA-040",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Yli 100 % saanto ja laadun arviointi",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Tuotemassa on 10,5 g, mutta analyysi osoittaa näytteen olevan 90,0 % puhdasta tuotetta. Teoreettinen puhdas tuotemassa on 12,0 g. Laske puhtauteen korjattu saanto.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Puhdasta tuotetta=0,900×10,5=9,45 g; saanto=9,45/12,0×100=78,8 %.",
    "scoring": "5 p: puhdas massa 2 p, saantokaava 1 p, lasku 1 p, tulos 1 p.",
    "hints": [
      "Korjaa massa puhtaudella ensin.",
      "Vasta sitten vertaa teoreettiseen",
      "Nimeä ensin väärä kemiallinen periaate ja vasta sitten sen vaikutus lopputulokseen.."
    ],
    "skills": [
      "ke04.saa.yli_100_saanto_ja_laadun_arviointi",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Yli 100 % saanto ja laadun arviointi",
      "ke04.saa.yli_100_saanto_ja_laadun_arviointi"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 309,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 5,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Soveltaminen"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-041",
    "contentId": "KE04-SAA-041",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Integroivat saantotehtävät",
    "questionType": "short_answer",
    "difficulty": 2,
    "prompt": "Kirjoita tyypillisen saantotehtävän etenemisjärjestys, kun lähtöaineiden määrät annetaan.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Tasapainota reaktio → muuta lähtöaineet mooleiksi → tunnista rajoittava → laske teoreettinen tuotemäärä → muunna haluttuun yksikköön → käytä saantoprosenttia.",
    "scoring": "6 p, 1 p / vaihe.",
    "hints": [
      "Saantoprosentti tulee vasta teoreettisen jälkeen.",
      "Rajoittava ennen tuotetta."
    ],
    "skills": [
      "ke04.saa.integroivat_saantotehtavat",
      "task.menetelma"
    ],
    "expectedConcepts": [
      "Integroivat saantotehtävät",
      "ke04.saa.integroivat_saantotehtavat"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 117,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 6,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Menetelmä"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-042",
    "contentId": "KE04-SAA-042",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Integroivat saantotehtävät",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Miksi saantoprosenttia ei pidä käyttää lähtöaineiden moolimäärään ennen rajoittavan aineen selvittämistä?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Saanto kuvaa todellisen tuotteen osuutta teoreettisesta tuotteesta, ei suoraan sitä, kuinka suuri osa kustakin lähtöaineesta 'on käytettävissä'. Ensin ratkaistaan stoikiometrinen teoreettinen saanto.",
    "scoring": "3 p.",
    "hints": [
      "Saanto liittyy tuotteeseen.",
      "Rajoittava ratkaisee teoreettisen maksimin."
    ],
    "skills": [
      "ke04.saa.integroivat_saantotehtavat",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Integroivat saantotehtävät",
      "ke04.saa.integroivat_saantotehtavat"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "yield.percent_direction"
    ],
    "estimatedSeconds": 194,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Virheen tunnistus"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-043",
    "contentId": "KE04-SAA-043",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Integroivat saantotehtävät",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Samalle tuotteelle verrataan kahta synteesireittiä. Reitillä A teoreettinen tuotemassa on 20,0 g ja todellinen 17,0 g. Reitillä B teoreettinen tuotemassa on 20,0 g ja todellinen 19,0 g. a) Laske kummankin saantoprosentti. b) Kummalla reitillä on saannon perusteella vähemmän materiaalihävikkiä, jos kaikki muut tekijät oletetaan samoiksi? c) Miksi pelkkä saantoprosentti ei silti riitä synteesin vihreyden kokonaisarvioon?",
    "options": [],
    "correctAnswer": null,
    "explanation": "a) A: 17,0/20,0×100=85,0 %. B: 19,0/20,0×100=95,0 %. b) B:llä, jos muut tekijät ovat samat, koska suurempi osa teoreettisesta tuotteesta saadaan talteen. c) Vihreyteen vaikuttavat myös esimerkiksi lähtöaineiden vaarallisuus ja uusiutuvuus, sivutuotteet, liuottimet, energiankulutus ja puhdistusvaiheet.",
    "scoring": "8 p: A:n saanto 2 p, B:n saanto 2 p, vertailupäätelmä 1 p, vähintään kaksi muuta vihreän kemian näkökulmaa 2 p, perusteltu kokonaisvastaus 1 p.",
    "hints": [
      "Laske saannot samalla kaavalla ennen vertailua.",
      "Kysy lopuksi, kertooko saanto mitään esimerkiksi energiasta, liuottimista tai aineiden vaarallisuudesta",
      "Perustele päätelmä yhdistämällä havainto tai mittaus suoraan kemialliseen malliin.."
    ],
    "skills": [
      "yield.percent",
      "green_chemistry.yield_context",
      "data.comparison"
    ],
    "expectedConcepts": [
      "Integroivat saantotehtävät",
      "yield.percent",
      "green_chemistry.yield_context",
      "data.comparison"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 309,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 8,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Aineisto ja vihreä kemia"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-044",
    "contentId": "KE04-SAA-044",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Integroivat saantotehtävät",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "2A→B. A:ta on 0,600 mol ja B:n M=50,0 g/mol. Saanto on 80,0 %. Laske todellinen B-massa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Teoreettinen n(B)=0,600/2=0,300 mol; teoreettinen massa=15,0 g; todellinen=0,800×15,0=12,0 g.",
    "scoring": "6 p: stoikiometria 2 p, massa 2 p, saanto 2 p.",
    "hints": [
      "2 A per 1 B.",
      "n→m.",
      "Käytä 80 % lopuksi."
    ],
    "skills": [
      "ke04.saa.integroivat_saantotehtavat",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Integroivat saantotehtävät",
      "ke04.saa.integroivat_saantotehtavat"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 309,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 6,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Soveltaminen"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-045",
    "contentId": "KE04-SAA-045",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "Integroivat saantotehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "2A+3B→2C. A=0,80 mol, B=0,90 mol. C:n M=100 g/mol. Kokeessa saadaan 48,0 g C:tä. Laske rajoittava aine, teoreettinen C-massa ja saanto-%:",
    "options": [],
    "correctAnswer": null,
    "explanation": "A/2=0,40; B/3=0,30 → B rajoittaa. n(C)=2×0,30=0,60 mol. Teoreettinen massa=60,0 g. Saanto=48,0/60,0×100=80,0 %.",
    "scoring": "8 p: n/kerroin 2 p, B 1 p, n(C) 1 p, teoreettinen massa 2 p, saanto 2 p.",
    "hints": [
      "n/kertoimet.",
      "Kerro pienempi C:n kertoimella.",
      "m=nM.",
      "todellinen/teoreettinen."
    ],
    "skills": [
      "ke04.saa.integroivat_saantotehtavat",
      "task.integroiva_koetehtava"
    ],
    "expectedConcepts": [
      "Integroivat saantotehtävät",
      "ke04.saa.integroivat_saantotehtavat"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 8,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Integroiva koetehtävä"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-X01",
    "contentId": "KE04-SAA-X01",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Esterisynteesissä teoreettiseksi tuotemassaksi lasketaan 12,40 g. Kolmessa työssä eristetyn tuotteen massat ovat 9,81 g, 10,02 g ja 9,94 g. a) Laske kunkin saantoprosentti. b) Laske saantoprosenttien keskiarvo. c) Mitä toistettavuudesta voi päätellä tulosten perusteella?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Saannot noin 79,1 %, 80,8 % ja 80,2 %; keskiarvo noin 80,0 %. Tulokset ovat lähellä toisiaan, joten toistettavuus on tässä aineistossa kohtuullisen hyvä.",
    "scoring": "8 p: kolme saantoa 3 p; keskiarvo 2 p; toistettavuuden tulkinta 3 p.",
    "hints": [
      "Saanto%=todellinen/teoreettinen×100.",
      "Vertaa tulosten hajontaa",
      "Perustele päätelmä yhdistämällä havainto tai mittaus suoraan kemialliseen malliin.."
    ],
    "skills": [
      "yield.percent",
      "data.replicates",
      "experimental.reproducibility"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "yield.percent",
      "data.replicates",
      "experimental.reproducibility"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 309,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 8,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Kokeellinen data"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-X02",
    "contentId": "KE04-SAA-X02",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "multiple_choice",
    "difficulty": 4,
    "prompt": "Teoreettinen saanto on 8,00 g, mutta märkä tuote painaa 8,72 g. Mikä on paras tulkinta?",
    "options": [
      "Reaktio rikkoi massan säilymisen",
      "Puhdasta tuotetta syntyi varmasti 109 %",
      "Näytteessä voi olla vettä/liuotinta tai epäpuhtauksia",
      "Teoreettinen saanto tarkoittaa aina mitattua massaa."
    ],
    "correctAnswer": "Näytteessä voi olla vettä/liuotinta tai epäpuhtauksia",
    "explanation": "C. Yli 100 %:n näennäinen saanto viittaa tavallisesti epäpuhtauteen, märkyyteen tai mittaus/laskuvirheeseen.",
    "scoring": "3 p: C 1 p; puhtauden/märkyyden perustelu 2 p.",
    "hints": [
      "Teoreettinen saanto on puhtaan tuotteen stoikiometrinen maksimi.",
      "Vaaka mittaa kaiken näytteessä olevan massan",
      "Sulje pois vaihtoehdot vertaamalla jokaista niistä reaktioyhtälöön, rakenteeseen tai määritelmään.."
    ],
    "skills": [
      "yield.over100",
      "experimental.purity"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "yield.over100",
      "experimental.purity"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "yield_over100_as_real"
    ],
    "estimatedSeconds": 88,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Diagnostinen monivalinta"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-X03",
    "contentId": "KE04-SAA-X03",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "short_answer",
    "difficulty": 4,
    "prompt": "Eristetty näyte painaa 15,0 g ja on analyysin mukaan 92,0 % haluttua tuotetta. Teoreettinen puhdas tuotemassa on 18,0 g. Laske puhtauteen korjattu saantoprosentti.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Puhdasta tuotetta=15,0×0,920=13,8 g. Saanto=13,8/18,0×100=76,7 %.",
    "scoring": "5 p: puhdas massa 2 p; prosenttikaava 1 p; lasku 1 p; tulos 1 p.",
    "hints": [
      "Korjaa ensin näytteen massa puhtaudella.",
      "Vertaa vasta puhdasta massaa teoreettiseen",
      "Nimeä ensin väärä kemiallinen periaate ja vasta sitten sen vaikutus lopputulokseen.."
    ],
    "skills": [
      "yield.purity_correction",
      "percent"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "yield.purity_correction",
      "percent"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 154,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 5,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Puhtaus + saanto"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-X04",
    "contentId": "KE04-SAA-X04",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "short_answer",
    "difficulty": 4,
    "prompt": "Luokittele seuraavat vaikutukset: nostaako vai laskeeko ne laskettua saantoprosenttia? i) osa tuotteesta jää suodatinpaperiin ii) tuote punnitaan märkänä iii) sivureaktio kuluttaa lähtöainetta iv) vaaka näyttää systemaattisesti +0,20 g.",
    "options": [],
    "correctAnswer": null,
    "explanation": "i laskee; ii nostaa; iii laskee; iv nostaa laskettua saantoa.",
    "scoring": "8 p: 1 p suunta +1 p perustelu jokaisesta.",
    "hints": [
      "Kysy lisääkö vai vähentääkö tekijä punnittua halutun tuotteen määrää.",
      "Märkyys ja positiivinen vaakaero lisäävät massaa",
      "Nimeä ensin väärä kemiallinen periaate ja vasta sitten sen vaikutus lopputulokseen.."
    ],
    "skills": [
      "yield.error_direction",
      "experimental_reasoning"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "yield.error_direction",
      "experimental_reasoning"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 154,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 8,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Virhelähteiden analyysi"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-X05",
    "contentId": "KE04-SAA-X05",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "short_answer",
    "difficulty": 5,
    "prompt": "2A+3B→2C. A=0,50 mol ja B=0,60 mol. a) Päätä rajoittava aine. b) Laske C:n teoreettinen ainemäärä. c) Jos saanto on 75,0 %, laske todellinen n(C).",
    "options": [],
    "correctAnswer": null,
    "explanation": "A/2=0,25; B/3=0,20 →B rajoittaa. Reaktion etenemä 0,20; n(C)=2×0,20=0,40 mol. Todellinen=0,750×0,40=0,300 mol.",
    "scoring": "7 p: n/kertoimet 2 p; B 1 p; teoreettinen C 2 p; todellinen C 2 p.",
    "hints": [
      "Selvitä rajoittava ennen saantoa.",
      "Saantoa käytetään vasta teoreettiseen tuotteeseen",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "yield.limiting_reagent",
      "yield.percent"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "yield.limiting_reagent",
      "yield.percent"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 173,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 7,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Rajoittava tekijä + saanto"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-X06",
    "contentId": "KE04-SAA-X06",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "application",
    "difficulty": 5,
    "prompt": "Prosessi A: teoreettinen 50,0 g, todellinen 42,0 g, puhtaus 99 %. Prosessi B: teoreettinen 50,0 g, todellinen 46,0 g, puhtaus 88 %. Kumpi antaa enemmän puhdasta haluttua tuotetta? Laske molemmat ja perustele, miksi pelkkä raakamassa ei riitä vertailuun.",
    "options": [],
    "correctAnswer": null,
    "explanation": "A: 42,0×0,99=41,58 g puhdasta. B:46,0×0,88=40,48 g. A antaa enemmän puhdasta tuotetta, vaikka B:n raakamassa on suurempi.",
    "scoring": "7 p: A 2 p; B 2 p; valinta 1 p; perustelu 2 p.",
    "hints": [
      "Kerro todellinen massa puhtaudella.",
      "Vertaa puhtaita massoja",
      "Perustele päätelmä yhdistämällä havainto tai mittaus suoraan kemialliseen malliin.."
    ],
    "skills": [
      "yield.purity",
      "data_decision"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "yield.purity",
      "data_decision"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 347,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 7,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Päätöksenteko aineistosta"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-X07",
    "contentId": "KE04-SAA-X07",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "Synteesissä lähtöaineesta pitäisi stoikiometrian mukaan muodostua 0,250 mol tuotetta. Tuotteen M=136,0 g/mol. Työvaiheiden jälkeen punnitaan 29,2 g näytettä, jonka puhtaus on 95,0 %. a) Laske teoreettinen massa. b) Laske puhtaan tuotteen todellinen massa. c) Laske puhtauteen korjattu saanto. d) Nimeä kaksi toisistaan erilaista syytä, miksi saanto voi jäädä alle 100 %.",
    "options": [],
    "correctAnswer": null,
    "explanation": "a) 0,250×136,0=34,0 g. b) 29,2×0,950=27,74 g. c) 27,74/34,0×100≈81,6 %. d) Esim. epätäydellinen reaktio/sivureaktio ja tuotteen mekaaninen hävikki puhdistuksessa.",
    "scoring": "12 p: a 2 p; b 2 p; c 4 p; kaksi syytä 4 p.",
    "hints": [
      "Teoreettinen n→m.",
      "Todellinen puhdas massa = näyte×puhtaus.",
      "Saanto vasta lopuksi."
    ],
    "skills": [
      "yield.theoretical",
      "yield.purity",
      "experimental_sources_of_loss"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "yield.theoretical",
      "yield.purity",
      "experimental_sources_of_loss"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 12,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Koereservi – aineisto"
  },
  {
    "seedKey": "ke04-v3:KE04-SAA-X08",
    "contentId": "KE04-SAA-X08",
    "chapter": 3,
    "topicName": "Reaktion saanto",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "Kaksi ryhmää saa samasta synteesistä saannot 78 % ja 104 %. Ryhmä 2:n tuote oli vielä lämmin ja siinä näkyi nestepisaroita. a) Kumpi tulos on uskottavampi puhtaan tuotteen saannoksi? b) Selitä 104 % kemiallisesti. c) Kuvaa yksi työvaihe, jolla tulosta voisi parantaa ennen punnitusta. d) Jos 10,40 g märästä näytteestä 0,80 g on liuotinta ja teoreettinen saanto 10,0 g, mikä korjattu saanto on?",
    "options": [],
    "correctAnswer": null,
    "explanation": "a) 78 % on sellaisenaan uskottavampi. b) 104 % johtuu todennäköisesti liuottimesta/vedestä tai muusta epäpuhtaudesta. c) Kuivataan tuote vakiomassaan ja jäähdytetään ennen punnitusta. d) Puhdas/kuiva tuote 9,60 g →96,0 %.",
    "scoring": "10 p: a 1 p; b 2 p; c 3 p; d 4 p.",
    "hints": [
      "Yli 100 % ei ole aito puhtaan tuotteen saanto.",
      "Vähennä liuottimen massa ennen prosenttia",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "yield.error_analysis",
      "yield.purity_correction",
      "experimental_method"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "yield.error_analysis",
      "yield.purity_correction",
      "experimental_method"
    ],
    "prerequisites": [
      "stoichiometry",
      "theoretical_yield"
    ],
    "commonErrors": [
      "actual_vs_theoretical_yield",
      "percent_direction"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 10,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Koereservi – virhearvio"
  }
];
