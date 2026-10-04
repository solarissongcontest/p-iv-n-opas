import type { Ke04SeedQuestion } from "./types";

export const questions: Ke04SeedQuestion[] = [
  {
    "seedKey": "ke04-v3:KE04-PAL-001",
    "contentId": "KE04-PAL-001",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Täydellisen palamisen perusidea",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitkä ovat hiilivedyn täydellisen palamisen päätuotteet?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Hiilidioksidi CO₂ ja vesi H₂O.",
    "scoring": "2 p: CO₂ 1 p, H₂O 1 p.",
    "hints": [
      "Hiili hapettuu hiilidioksidiksi.",
      "Vety vedeksi."
    ],
    "skills": [
      "ke04.pal.taydellisen_palamisen_perusidea",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Täydellisen palamisen perusidea",
      "ke04.pal.taydellisen_palamisen_perusidea"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
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
    "seedKey": "ke04-v3:KE04-PAL-002",
    "contentId": "KE04-PAL-002",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Täydellisen palamisen perusidea",
    "questionType": "multiple_choice",
    "difficulty": 1,
    "prompt": "Mikä on täydellisen palamisen välttämätön lähtöaine orgaanisen polttoaineen lisäksi?",
    "options": [
      "O₂",
      "N₂",
      "CO₂",
      "H₂O"
    ],
    "correctAnswer": "O₂",
    "explanation": "A, happi O₂.",
    "scoring": "1 p.",
    "hints": [
      "Palaminen on hapettumista.",
      "Ilman happi on reagenssi."
    ],
    "skills": [
      "ke04.pal.taydellisen_palamisen_perusidea",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Täydellisen palamisen perusidea",
      "ke04.pal.taydellisen_palamisen_perusidea"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "combustion.complete_vs_incomplete"
    ],
    "estimatedSeconds": 56,
    "examEligible": false,
    "reserveForExam": false,
    "validated": true,
    "points": 1,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Monivalinta"
  },
  {
    "seedKey": "ke04-v3:KE04-PAL-003",
    "contentId": "KE04-PAL-003",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Täydellisen palamisen perusidea",
    "questionType": "matching",
    "difficulty": 2,
    "prompt": "Yhdistä polttoaineen alkuaine ja täydellinen palamistuote: C, H ↔ CO₂, H₂O.",
    "options": [],
    "correctAnswer": null,
    "explanation": "C → CO₂; H → H₂O.",
    "scoring": "2 p.",
    "hints": [
      "Seuraa alkuaineita tuotteisiin.",
      "Massan säilyminen."
    ],
    "skills": [
      "ke04.pal.taydellisen_palamisen_perusidea",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Täydellisen palamisen perusidea",
      "ke04.pal.taydellisen_palamisen_perusidea"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
    ],
    "estimatedSeconds": 133,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "C",
        "right": "CO₂"
      },
      {
        "left": "H",
        "right": "H₂O."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-PAL-004",
    "contentId": "KE04-PAL-004",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Täydellisen palamisen perusidea",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi hiilivedyn täydellisessä palamisessa ei normaalisti synny hiiltä sisältäväksi päätuotteeksi esimerkiksi CO:ta?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Täydellisessä palamisessa happea on riittävästi hiilen hapettumiseksi korkeampaan hapetusasteeseen CO₂:ksi. CO liittyy tyypillisesti epätäydelliseen palamiseen.",
    "scoring": "3 p: riittävä O₂ 1 p, CO₂ 1 p, CO:n yhteys epätäydelliseen 1 p.",
    "hints": [
      "Täydellinen tarkoittaa riittävää hapettumista.",
      "Vertaa CO ja CO₂."
    ],
    "skills": [
      "ke04.pal.taydellisen_palamisen_perusidea",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Täydellisen palamisen perusidea",
      "ke04.pal.taydellisen_palamisen_perusidea"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
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
    "seedKey": "ke04-v3:KE04-PAL-005",
    "contentId": "KE04-PAL-005",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Täydellisen palamisen perusidea",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Väite: 'Palamisessa aineen massa häviää, koska polttoaine muuttuu kaasuksi.' Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Massa ei häviä. Polttoaine reagoi hapen kanssa ja atomit löytyvät tuotteista, kuten CO₂:sta ja H₂O:sta. Kaasut voivat poistua avoimesta astiasta, mutta kokonaismassan säilymislaki pätee.",
    "scoring": "3 p: massan säilyminen 1 p, happi mukana 1 p, kaasujen poistuminen selittää havainnon 1 p.",
    "hints": [
      "Laske myös ilman hapen massa.",
      "Avoimesta astiasta kaasu voi poistua."
    ],
    "skills": [
      "ke04.pal.taydellisen_palamisen_perusidea",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Täydellisen palamisen perusidea",
      "ke04.pal.taydellisen_palamisen_perusidea"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "combustion.mass_conservation"
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
    "seedKey": "ke04-v3:KE04-PAL-006",
    "contentId": "KE04-PAL-006",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Palamisyhtälöiden tasapainotus",
    "questionType": "short_answer",
    "difficulty": 2,
    "prompt": "Tasapainota metaanin palaminen: CH₄ + O₂ → CO₂ + H₂O.",
    "options": [],
    "correctAnswer": null,
    "explanation": "CH₄ + 2O₂ → CO₂ + 2H₂O.",
    "scoring": "3 p: CO₂ 1 p, 2H₂O 1 p, 2O₂ 1 p.",
    "hints": [
      "Tasaa C, sitten H, lopuksi O.",
      "Neljä H → 2 H₂O."
    ],
    "skills": [
      "ke04.pal.palamisyhtaloiden_tasapainotus",
      "task.tasapainotus"
    ],
    "expectedConcepts": [
      "Palamisyhtälöiden tasapainotus",
      "ke04.pal.palamisyhtaloiden_tasapainotus"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
    ],
    "estimatedSeconds": 117,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Tasapainotus"
  },
  {
    "seedKey": "ke04-v3:KE04-PAL-007",
    "contentId": "KE04-PAL-007",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Palamisyhtälöiden tasapainotus",
    "questionType": "short_answer",
    "difficulty": 2,
    "prompt": "Tasapainota etaanin palaminen kokonaislukukertoimin: C₂H₆ + O₂ → CO₂ + H₂O.",
    "options": [],
    "correctAnswer": null,
    "explanation": "2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O.",
    "scoring": "4 p: 2C₂H₆ 1 p, 7O₂ 1 p, 4CO₂ 1 p, 6H₂O 1 p.",
    "hints": [
      "Yhdelle etaanille CO₂=2 ja H₂O=3.",
      "Poista puolikas O₂ kertomalla kaikki kahdella."
    ],
    "skills": [
      "ke04.pal.palamisyhtaloiden_tasapainotus",
      "task.tasapainotus"
    ],
    "expectedConcepts": [
      "Palamisyhtälöiden tasapainotus",
      "ke04.pal.palamisyhtaloiden_tasapainotus"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
    ],
    "estimatedSeconds": 117,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Tasapainotus"
  },
  {
    "seedKey": "ke04-v3:KE04-PAL-008",
    "contentId": "KE04-PAL-008",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Palamisyhtälöiden tasapainotus",
    "questionType": "short_answer",
    "difficulty": 3,
    "prompt": "Tasapainota propaanin palaminen: C₃H₈ + O₂ → CO₂ + H₂O.",
    "options": [],
    "correctAnswer": null,
    "explanation": "C₃H₈ + 5O₂ → 3CO₂ + 4H₂O.",
    "scoring": "4 p.",
    "hints": [
      "3 C → 3 CO₂.",
      "8 H → 4 H₂O.",
      "Laske O."
    ],
    "skills": [
      "ke04.pal.palamisyhtaloiden_tasapainotus",
      "task.tasapainotus"
    ],
    "expectedConcepts": [
      "Palamisyhtälöiden tasapainotus",
      "ke04.pal.palamisyhtaloiden_tasapainotus"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
    ],
    "estimatedSeconds": 135,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Tasapainotus"
  },
  {
    "seedKey": "ke04-v3:KE04-PAL-009",
    "contentId": "KE04-PAL-009",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Palamisyhtälöiden tasapainotus",
    "questionType": "short_answer",
    "difficulty": 3,
    "prompt": "Tasapainota butaanin palaminen kokonaislukukertoimin: C₄H₁₀ + O₂ → CO₂ + H₂O.",
    "options": [],
    "correctAnswer": null,
    "explanation": "2C₄H₁₀ + 13O₂ → 8CO₂ + 10H₂O.",
    "scoring": "4 p.",
    "hints": [
      "Yhdelle butaanille 4CO₂ ja 5H₂O.",
      "O₂-kertoimeksi tulee 13/2, joten kerro kahdella."
    ],
    "skills": [
      "ke04.pal.palamisyhtaloiden_tasapainotus",
      "task.tasapainotus"
    ],
    "expectedConcepts": [
      "Palamisyhtälöiden tasapainotus",
      "ke04.pal.palamisyhtaloiden_tasapainotus"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
    ],
    "estimatedSeconds": 135,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Tasapainotus"
  },
  {
    "seedKey": "ke04-v3:KE04-PAL-010",
    "contentId": "KE04-PAL-010",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Palamisyhtälöiden tasapainotus",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija kirjoittaa C₃H₈ + 4O₂ → 3CO₂ + 4H₂O. Mikä on väärin?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Tuotteissa on 10 O-atomia (6+4), mutta 4O₂:ssa vain 8. Oikea O₂-kerroin on 5.",
    "scoring": "3 p: O-atomien lasku 1 p, epätasapaino 1 p, kerroin 5 1 p.",
    "hints": [
      "C ja H ovat jo oikein.",
      "Laske O viimeisenä."
    ],
    "skills": [
      "ke04.pal.palamisyhtaloiden_tasapainotus",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Palamisyhtälöiden tasapainotus",
      "ke04.pal.palamisyhtaloiden_tasapainotus"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "combustion.complete_vs_incomplete"
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
    "seedKey": "ke04-v3:KE04-PAL-011",
    "contentId": "KE04-PAL-011",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Ainemääräsuhteet palamisessa",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Kuinka monta moolia O₂ tarvitaan 3,0 mol CH₄:n täydelliseen palamiseen?",
    "options": [],
    "correctAnswer": null,
    "explanation": "6,0 mol O₂, koska suhde CH₄:O₂ = 1:2.",
    "scoring": "3 p: suhde 1 p, lasku 1 p, yksikkö 1 p.",
    "hints": [
      "Käytä tasapainotettua yhtälöä.",
      "Kerro metaanimäärä kahdella."
    ],
    "skills": [
      "ke04.pal.ainemaarasuhteet_palamisessa",
      "task.stoikiometria"
    ],
    "expectedConcepts": [
      "Ainemääräsuhteet palamisessa",
      "ke04.pal.ainemaarasuhteet_palamisessa"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
    ],
    "estimatedSeconds": 166,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Stoikiometria"
  },
  {
    "seedKey": "ke04-v3:KE04-PAL-012",
    "contentId": "KE04-PAL-012",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Ainemääräsuhteet palamisessa",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Kuinka monta moolia CO₂ muodostuu 2,5 mol propaanin täydellisessä palamisessa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "7,5 mol CO₂, koska 1 mol C₃H₈ → 3 mol CO₂.",
    "scoring": "3 p.",
    "hints": [
      "Yhtälössä propaani:CO₂ = 1:3.",
      "2,5×3."
    ],
    "skills": [
      "ke04.pal.ainemaarasuhteet_palamisessa",
      "task.stoikiometria"
    ],
    "expectedConcepts": [
      "Ainemääräsuhteet palamisessa",
      "ke04.pal.ainemaarasuhteet_palamisessa"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
    ],
    "estimatedSeconds": 166,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Stoikiometria"
  },
  {
    "seedKey": "ke04-v3:KE04-PAL-013",
    "contentId": "KE04-PAL-013",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Ainemääräsuhteet palamisessa",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "Kuinka monta moolia H₂O muodostuu 4,0 mol etaanin palaessa täydellisesti? Käytä suhdetta 2C₂H₆ → 6H₂O.",
    "options": [],
    "correctAnswer": null,
    "explanation": "12,0 mol H₂O, eli suhde 1:3.",
    "scoring": "3 p.",
    "hints": [
      "2→6 voidaan supistaa 1→3.",
      "4×3."
    ],
    "skills": [
      "ke04.pal.ainemaarasuhteet_palamisessa",
      "task.stoikiometria"
    ],
    "expectedConcepts": [
      "Ainemääräsuhteet palamisessa",
      "ke04.pal.ainemaarasuhteet_palamisessa"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
    ],
    "estimatedSeconds": 194,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Stoikiometria"
  },
  {
    "seedKey": "ke04-v3:KE04-PAL-014",
    "contentId": "KE04-PAL-014",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Ainemääräsuhteet palamisessa",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "Kuinka monta moolia O₂ tarvitaan 1,5 mol propaanille?",
    "options": [],
    "correctAnswer": null,
    "explanation": "7,5 mol O₂, koska C₃H₈:O₂ = 1:5.",
    "scoring": "3 p.",
    "hints": [
      "Yhtälö C₃H₈ + 5O₂.",
      "1,5×5."
    ],
    "skills": [
      "ke04.pal.ainemaarasuhteet_palamisessa",
      "task.stoikiometria"
    ],
    "expectedConcepts": [
      "Ainemääräsuhteet palamisessa",
      "ke04.pal.ainemaarasuhteet_palamisessa"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
    ],
    "estimatedSeconds": 194,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Stoikiometria"
  },
  {
    "seedKey": "ke04-v3:KE04-PAL-015",
    "contentId": "KE04-PAL-015",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Ainemääräsuhteet palamisessa",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "10,0 mol O₂ käytetään propaanin täydelliseen palamiseen. Kuinka monta moolia propaania voi palaa, jos O₂ on rajoittava?",
    "options": [],
    "correctAnswer": null,
    "explanation": "2,0 mol C₃H₈, koska suhde O₂:propaani = 5:1.",
    "scoring": "3 p: suhde 1 p, 10/5 1 p, 2,0 mol 1 p.",
    "hints": [
      "Käännä suhde oikein päin.",
      "Jaa happimäärä viidellä."
    ],
    "skills": [
      "ke04.pal.ainemaarasuhteet_palamisessa",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Ainemääräsuhteet palamisessa",
      "ke04.pal.ainemaarasuhteet_palamisessa"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
    ],
    "estimatedSeconds": 271,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Soveltaminen"
  },
  {
    "seedKey": "ke04-v3:KE04-PAL-016",
    "contentId": "KE04-PAL-016",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Massa ja palamistuotteet",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "16,0 g metaania CH₄ (M≈16,0 g/mol) palaa täydellisesti. Kuinka monta moolia metaania on?",
    "options": [],
    "correctAnswer": null,
    "explanation": "1,00 mol.",
    "scoring": "2 p: n=m/M 1 p, tulos 1 p.",
    "hints": [
      "n=m/M.",
      "16/16."
    ],
    "skills": [
      "ke04.pal.massa_ja_palamistuotteet",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Massa ja palamistuotteet",
      "ke04.pal.massa_ja_palamistuotteet"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
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
    "seedKey": "ke04-v3:KE04-PAL-017",
    "contentId": "KE04-PAL-017",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Massa ja palamistuotteet",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "16,0 g CH₄ palaa täydellisesti. Kuinka monta moolia CO₂ muodostuu?",
    "options": [],
    "correctAnswer": null,
    "explanation": "1,00 mol CO₂, koska 1 mol CH₄ → 1 mol CO₂.",
    "scoring": "3 p: n(CH₄) 1 p, suhde 1 p, tulos 1 p.",
    "hints": [
      "Muuta massa ensin mooleiksi.",
      "Käytä 1:1-suhdetta."
    ],
    "skills": [
      "ke04.pal.massa_ja_palamistuotteet",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Massa ja palamistuotteet",
      "ke04.pal.massa_ja_palamistuotteet"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
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
    "seedKey": "ke04-v3:KE04-PAL-018",
    "contentId": "KE04-PAL-018",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Massa ja palamistuotteet",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "16,0 g CH₄ palaa täydellisesti. Kuinka monta grammaa CO₂ muodostuu? Käytä M(CO₂)=44,0 g/mol.",
    "options": [],
    "correctAnswer": null,
    "explanation": "44,0 g CO₂.",
    "scoring": "4 p: n(CH₄)=1,00 1 p, n(CO₂)=1,00 1 p, m=nM 1 p, 44,0 g 1 p.",
    "hints": [
      "16,0 g CH₄ = 1 mol.",
      "Yksi mol CO₂ painaa 44,0 g."
    ],
    "skills": [
      "ke04.pal.massa_ja_palamistuotteet",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Massa ja palamistuotteet",
      "ke04.pal.massa_ja_palamistuotteet"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
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
    "seedKey": "ke04-v3:KE04-PAL-019",
    "contentId": "KE04-PAL-019",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Massa ja palamistuotteet",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "44,0 g propaania C₃H₈ (M≈44,0 g/mol) palaa täydellisesti. Kuinka monta moolia CO₂ syntyy?",
    "options": [],
    "correctAnswer": null,
    "explanation": "3,00 mol CO₂.",
    "scoring": "3 p: n(propaani)=1,00 1 p, suhde 1:3 1 p, tulos 1 p.",
    "hints": [
      "44 g propaania ≈1 mol.",
      "Kolme hiiltä → 3 mol CO₂ per mol propaania."
    ],
    "skills": [
      "ke04.pal.massa_ja_palamistuotteet",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Massa ja palamistuotteet",
      "ke04.pal.massa_ja_palamistuotteet"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
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
    "seedKey": "ke04-v3:KE04-PAL-020",
    "contentId": "KE04-PAL-020",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Massa ja palamistuotteet",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "44,0 g propaania palaa täydellisesti. Laske syntyvän CO₂:n massa, kun M(CO₂)=44,0 g/mol.",
    "options": [],
    "correctAnswer": null,
    "explanation": "132 g CO₂, koska 1,00 mol propaania → 3,00 mol CO₂ ja m=3,00×44,0 g.",
    "scoring": "5 p: propaanin molit 1 p, reaktiosuhde 1 p, CO₂-molit 1 p, massakaava 1 p, tulos 1 p.",
    "hints": [
      "Muuta propaani mooleiksi.",
      "Kerro CO₂:n ainemäärä 44,0 g/mol:lla."
    ],
    "skills": [
      "ke04.pal.massa_ja_palamistuotteet",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Massa ja palamistuotteet",
      "ke04.pal.massa_ja_palamistuotteet"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
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
    "seedKey": "ke04-v3:KE04-PAL-021",
    "contentId": "KE04-PAL-021",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Epätäydellinen palaminen",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitä hiiltä sisältäviä tuotteita voi syntyä epätäydellisessä palamisessa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Hiilimonoksidia CO ja/tai alkuainehiiltä C (nokea), CO₂:n lisäksi olosuhteista riippuen.",
    "scoring": "2 p: CO 1 p, C/noki 1 p.",
    "hints": [
      "Happea on liian vähän.",
      "Hiili ei hapetu täysin CO₂:ksi."
    ],
    "skills": [
      "ke04.pal.epataydellinen_palaminen",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Epätäydellinen palaminen",
      "ke04.pal.epataydellinen_palaminen"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
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
    "seedKey": "ke04-v3:KE04-PAL-022",
    "contentId": "KE04-PAL-022",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Epätäydellinen palaminen",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Mikä olosuhde suosii epätäydellistä palamista?",
    "options": [
      "hapen puute",
      "suuri happiylimäärä ja hyvä sekoittuminen",
      "palamiskaasujen tehokas poistuminen samalla kun happea on riittävästi",
      "polttoaineen täydellinen sekoittuminen ylimääräiseen happeen"
    ],
    "correctAnswer": "hapen puute",
    "explanation": "A, hapen puute.",
    "scoring": "1 p.",
    "hints": [
      "Täydellinen palaminen tarvitsee riittävästi O₂.",
      "Puute jättää hapettumisen kesken."
    ],
    "skills": [
      "ke04.pal.epataydellinen_palaminen",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Epätäydellinen palaminen",
      "ke04.pal.epataydellinen_palaminen"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "combustion.complete_vs_incomplete"
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
    "seedKey": "ke04-v3:KE04-PAL-023",
    "contentId": "KE04-PAL-023",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Epätäydellinen palaminen",
    "questionType": "explanation",
    "difficulty": 2,
    "prompt": "Miksi hiilimonoksidi on merkki epätäydellisestä palamisesta?",
    "options": [],
    "correctAnswer": null,
    "explanation": "CO:ssa hiili ei ole hapettunut yhtä pitkälle kuin CO₂:ssa; riittämätön hapensaanti voi estää täydellisen hapettumisen CO₂:ksi.",
    "scoring": "3 p: CO vs CO₂ 1 p, hapen puute 1 p, epätäydellinen hapettuminen 1 p.",
    "hints": [
      "Vertaa happiatomien määrää.",
      "Happea tarvitaan lisää CO→CO₂."
    ],
    "skills": [
      "ke04.pal.epataydellinen_palaminen",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Epätäydellinen palaminen",
      "ke04.pal.epataydellinen_palaminen"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
    ],
    "estimatedSeconds": 166,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Selitys"
  },
  {
    "seedKey": "ke04-v3:KE04-PAL-024",
    "contentId": "KE04-PAL-024",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Epätäydellinen palaminen",
    "questionType": "short_answer",
    "difficulty": 3,
    "prompt": "Miksi CO:n muodostuminen sisätilojen palamisessa on vaarallista?",
    "options": [],
    "correctAnswer": null,
    "explanation": "CO on myrkyllinen kaasu, joka sitoutuu hemoglobiiniin ja heikentää hapenkuljetusta. Kemiallisesti sen muodostuminen kertoo epätäydellisestä palamisesta.",
    "scoring": "3 p: myrkyllisyys 1 p, hapenkuljetus 1 p, epätäydellinen palaminen 1 p.",
    "hints": [
      "CO on hajuton ja vaarallinen.",
      "Se vaikuttaa veren hapenkuljetukseen."
    ],
    "skills": [
      "ke04.pal.epataydellinen_palaminen",
      "task.turvallisuus_ja_kemia"
    ],
    "expectedConcepts": [
      "Epätäydellinen palaminen",
      "ke04.pal.epataydellinen_palaminen"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
    ],
    "estimatedSeconds": 135,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Turvallisuus ja kemia"
  },
  {
    "seedKey": "ke04-v3:KE04-PAL-025",
    "contentId": "KE04-PAL-025",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Epätäydellinen palaminen",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Väite: 'Noki tarkoittaa, että polttoaineessa ei ollut lainkaan hiiltä.' Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Noki on pääasiassa hiiltä ja syntyy juuri hiiltä sisältävän polttoaineen epätäydellisessä palamisessa, kun happea ei ole riittävästi täydelliseen CO₂:n muodostumiseen.",
    "scoring": "3 p: noki=hiili 1 p, hiilipolttoaine 1 p, hapen puute 1 p.",
    "hints": [
      "Noki on mustaa hiilipitoista ainetta.",
      "Se on palamatta/hapettumatta jäänyttä hiiltä."
    ],
    "skills": [
      "ke04.pal.epataydellinen_palaminen",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Epätäydellinen palaminen",
      "ke04.pal.epataydellinen_palaminen"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "combustion.complete_vs_incomplete"
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
    "seedKey": "ke04-v3:KE04-PAL-026",
    "contentId": "KE04-PAL-026",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Happea sisältävien orgaanisten yhdisteiden palaminen",
    "questionType": "short_answer",
    "difficulty": 2,
    "prompt": "Tasapainota etanolin palaminen: C₂H₅OH + O₂ → CO₂ + H₂O.",
    "options": [],
    "correctAnswer": null,
    "explanation": "C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O.",
    "scoring": "4 p: CO₂=2 1 p, H₂O=3 1 p, O₂=3 2 p.",
    "hints": [
      "Tasaa C ja H ensin.",
      "Muista yksi O on jo etanolissa."
    ],
    "skills": [
      "ke04.pal.happea_sisaltavien_orgaanisten_yhdisteiden_palaminen",
      "task.tasapainotus"
    ],
    "expectedConcepts": [
      "Happea sisältävien orgaanisten yhdisteiden palaminen",
      "ke04.pal.happea_sisaltavien_orgaanisten_yhdisteiden_palaminen"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
    ],
    "estimatedSeconds": 117,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Tasapainotus"
  },
  {
    "seedKey": "ke04-v3:KE04-PAL-027",
    "contentId": "KE04-PAL-027",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Happea sisältävien orgaanisten yhdisteiden palaminen",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Miksi etanolin palamisen O₂-kerrointa ei voi päätellä samalla tavalla kuin puhtaan hiilivedyn, jos lähtöaineen omaa rakennetta ei huomioida?",
    "options": [
      "etanoli sisältää jo happiatomin, joka osallistuu atomitaseeseen",
      "etanolin hiiliatomit eivät muodosta CO₂:ta",
      "palamisessa vetyatomit häviävät",
      "O₂:n kerroin määräytyy vain reaktion lämpötilasta"
    ],
    "correctAnswer": "etanoli sisältää jo happiatomin, joka osallistuu atomitaseeseen",
    "explanation": "A.",
    "scoring": "1 p.",
    "hints": [
      "Lähtöaineen oma happi osallistuu atomitaseeseen.",
      "Laske kaikki O:t."
    ],
    "skills": [
      "ke04.pal.happea_sisaltavien_orgaanisten_yhdisteiden_palaminen",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Happea sisältävien orgaanisten yhdisteiden palaminen",
      "ke04.pal.happea_sisaltavien_orgaanisten_yhdisteiden_palaminen"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "combustion.complete_vs_incomplete",
      "combustion.oxygen_balance"
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
    "seedKey": "ke04-v3:KE04-PAL-028",
    "contentId": "KE04-PAL-028",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Happea sisältävien orgaanisten yhdisteiden palaminen",
    "questionType": "short_answer",
    "difficulty": 3,
    "prompt": "Tasapainota metanolin palaminen kokonaislukukertoimin: CH₃OH + O₂ → CO₂ + H₂O.",
    "options": [],
    "correctAnswer": null,
    "explanation": "2CH₃OH + 3O₂ → 2CO₂ + 4H₂O.",
    "scoring": "4 p.",
    "hints": [
      "Yhdelle metanolille CO₂=1, H₂O=2.",
      "O₂-kertoimeksi tulee 3/2, joten kerro kahdella."
    ],
    "skills": [
      "ke04.pal.happea_sisaltavien_orgaanisten_yhdisteiden_palaminen",
      "task.tasapainotus"
    ],
    "expectedConcepts": [
      "Happea sisältävien orgaanisten yhdisteiden palaminen",
      "ke04.pal.happea_sisaltavien_orgaanisten_yhdisteiden_palaminen"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
    ],
    "estimatedSeconds": 135,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Tasapainotus"
  },
  {
    "seedKey": "ke04-v3:KE04-PAL-029",
    "contentId": "KE04-PAL-029",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Happea sisältävien orgaanisten yhdisteiden palaminen",
    "questionType": "short_answer",
    "difficulty": 3,
    "prompt": "Miksi etanolin palamisyhtälössä C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O on yhteensä seitsemän O-atomia kummallakin puolella?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Vasemmalla etanolissa 1 O + 3O₂:ssa 6 O = 7; oikealla 2CO₂:ssa 4 + 3H₂O:ssa 3 = 7.",
    "scoring": "3 p: vasen 1 p, oikea 1 p, tasapaino 1 p.",
    "hints": [
      "Älä unohda etanolin happiatomia.",
      "O₂:ssa kaksi O:ta."
    ],
    "skills": [
      "ke04.pal.happea_sisaltavien_orgaanisten_yhdisteiden_palaminen",
      "task.atomitasapaino"
    ],
    "expectedConcepts": [
      "Happea sisältävien orgaanisten yhdisteiden palaminen",
      "ke04.pal.happea_sisaltavien_orgaanisten_yhdisteiden_palaminen"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
    ],
    "estimatedSeconds": 135,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Atomitasapaino"
  },
  {
    "seedKey": "ke04-v3:KE04-PAL-030",
    "contentId": "KE04-PAL-030",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Happea sisältävien orgaanisten yhdisteiden palaminen",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija tasapainottaa etanolin palamisen C₂H₅OH + 7/2 O₂ → 2CO₂ + 3H₂O. Mikä on virhe?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Hän on unohtanut etanolin oman O-atomin. Oikea O₂-kerroin on 3, koska tuotteiden 7 O-atomista yksi tulee etanolista ja kuusi 3O₂:sta.",
    "scoring": "3 p: etanolin O 1 p, oikea kerroin 1 p, atomitase 1 p.",
    "hints": [
      "Laske lähtöaineiden kaikki O:t.",
      "Etanoli ei ole hiilivety."
    ],
    "skills": [
      "ke04.pal.happea_sisaltavien_orgaanisten_yhdisteiden_palaminen",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Happea sisältävien orgaanisten yhdisteiden palaminen",
      "ke04.pal.happea_sisaltavien_orgaanisten_yhdisteiden_palaminen"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "combustion.complete_vs_incomplete",
      "combustion.oxygen_balance"
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
    "seedKey": "ke04-v3:KE04-PAL-031",
    "contentId": "KE04-PAL-031",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Palamistuotteista tehtävät rakennepäätelmät",
    "questionType": "application",
    "difficulty": 2,
    "prompt": "Yksi mooli hiilivetyä tuottaa täydellisessä palamisessa 2 mol CO₂. Kuinka monta hiiliatomia yhdessä hiilivetymolekyylissä on?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kaksi hiiliatomia.",
    "scoring": "2 p: 2 C 1 p, yhteys CO₂-suhteeseen 1 p.",
    "hints": [
      "Jokainen C päätyy yhteen CO₂:een.",
      "2 mol CO₂ per mol polttoainetta → C₂."
    ],
    "skills": [
      "ke04.pal.palamistuotteista_tehtavat_rakennepaatelmat",
      "task.paattely"
    ],
    "expectedConcepts": [
      "Palamistuotteista tehtävät rakennepäätelmät",
      "ke04.pal.palamistuotteista_tehtavat_rakennepaatelmat"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
    ],
    "estimatedSeconds": 233,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Päättely"
  },
  {
    "seedKey": "ke04-v3:KE04-PAL-032",
    "contentId": "KE04-PAL-032",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Palamistuotteista tehtävät rakennepäätelmät",
    "questionType": "application",
    "difficulty": 2,
    "prompt": "Yksi mooli hiilivetyä tuottaa 4 mol H₂O. Kuinka monta vetyatomia yhdessä molekyylissä on?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kahdeksan H-atomia, koska 4 H₂O sisältää 8 mol H-atomeja per mol polttoainetta.",
    "scoring": "2 p.",
    "hints": [
      "Jokaisessa H₂O:ssa on kaksi H:ta.",
      "4×2=8."
    ],
    "skills": [
      "ke04.pal.palamistuotteista_tehtavat_rakennepaatelmat",
      "task.paattely"
    ],
    "expectedConcepts": [
      "Palamistuotteista tehtävät rakennepäätelmät",
      "ke04.pal.palamistuotteista_tehtavat_rakennepaatelmat"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
    ],
    "estimatedSeconds": 233,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Päättely"
  },
  {
    "seedKey": "ke04-v3:KE04-PAL-033",
    "contentId": "KE04-PAL-033",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Palamistuotteista tehtävät rakennepäätelmät",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Yksi mooli hiilivetyä tuottaa 3 mol CO₂ ja 4 mol H₂O täydellisessä palamisessa. Mikä on hiilivedyn molekyylikaava?",
    "options": [],
    "correctAnswer": null,
    "explanation": "C₃H₈.",
    "scoring": "3 p: C₃ 1 p, H₈ 1 p, kokonaiskaava 1 p.",
    "hints": [
      "CO₂ kertoo C-määrän.",
      "H₂O-määrä×2 kertoo H-määrän."
    ],
    "skills": [
      "ke04.pal.palamistuotteista_tehtavat_rakennepaatelmat",
      "task.paattely"
    ],
    "expectedConcepts": [
      "Palamistuotteista tehtävät rakennepäätelmät",
      "ke04.pal.palamistuotteista_tehtavat_rakennepaatelmat"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
    ],
    "estimatedSeconds": 271,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Päättely"
  },
  {
    "seedKey": "ke04-v3:KE04-PAL-034",
    "contentId": "KE04-PAL-034",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Palamistuotteista tehtävät rakennepäätelmät",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Yksi mooli hiilivetyä tuottaa 4 mol CO₂ ja 5 mol H₂O. Päättele kaava.",
    "options": [],
    "correctAnswer": null,
    "explanation": "C₄H₁₀.",
    "scoring": "3 p.",
    "hints": [
      "4 CO₂ → C₄.",
      "5 H₂O → H₁₀."
    ],
    "skills": [
      "ke04.pal.palamistuotteista_tehtavat_rakennepaatelmat",
      "task.paattely"
    ],
    "expectedConcepts": [
      "Palamistuotteista tehtävät rakennepäätelmät",
      "ke04.pal.palamistuotteista_tehtavat_rakennepaatelmat"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
    ],
    "estimatedSeconds": 271,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Päättely"
  },
  {
    "seedKey": "ke04-v3:KE04-PAL-035",
    "contentId": "KE04-PAL-035",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Palamistuotteista tehtävät rakennepäätelmät",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Palamisessa 0,50 mol tuntematonta hiilivetyä tuottaa 1,50 mol CO₂ ja 2,00 mol H₂O. Päättele hiilivedyn molekyylikaava.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Jaa tuotteet 0,50 mol:lla: 3 mol CO₂ ja 4 mol H₂O per 1 mol hiilivetyä → C₃H₈.",
    "scoring": "5 p: skaalaus 1 p, C=3 1 p, H₂O=4 1 p, H=8 1 p, C₃H₈ 1 p.",
    "hints": [
      "Muunna ensin tuotteet yhtä polttoainemoolia kohti.",
      "CO₂→C, H₂O×2→H",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "ke04.pal.palamistuotteista_tehtavat_rakennepaatelmat",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Palamistuotteista tehtävät rakennepäätelmät",
      "ke04.pal.palamistuotteista_tehtavat_rakennepaatelmat"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
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
    "seedKey": "ke04-v3:KE04-PAL-036",
    "contentId": "KE04-PAL-036",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Integroivat palamistehtävät",
    "questionType": "matching",
    "difficulty": 2,
    "prompt": "Yhdistä polttoaine ja tasapainotettu O₂-kerroin yhtä polttoainemoolia kohti: CH₄, C₃H₈, C₂H₅OH ↔ 2, 5, 3.",
    "options": [],
    "correctAnswer": null,
    "explanation": "CH₄→2; C₃H₈→5; C₂H₅OH→3.",
    "scoring": "3 p.",
    "hints": [
      "Kirjoita palamisyhtälöt.",
      "Laske O viimeisenä."
    ],
    "skills": [
      "ke04.pal.integroivat_palamistehtavat",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Integroivat palamistehtävät",
      "ke04.pal.integroivat_palamistehtavat"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
    ],
    "estimatedSeconds": 133,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "CH₄",
        "right": "2"
      },
      {
        "left": "C₃H₈",
        "right": "5"
      },
      {
        "left": "C₂H₅OH",
        "right": "3."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-PAL-037",
    "contentId": "KE04-PAL-037",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Integroivat palamistehtävät",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi palamisreaktion tasapainotus kannattaa tehdä järjestyksessä C, H ja lopuksi O?",
    "options": [],
    "correctAnswer": null,
    "explanation": "C ja H esiintyvät yleensä polttoaineessa ja määräytyvät suoraan CO₂- ja H₂O-kertoimista. O esiintyy sekä CO₂:ssa että H₂O:ssa ja mahdollisesti polttoaineessa, joten sen kerroin on helpoin ratkaista viimeisenä.",
    "scoring": "3 p.",
    "hints": [
      "O esiintyy useassa aineessa.",
      "C ja H määräävät tuotteiden kertoimia."
    ],
    "skills": [
      "ke04.pal.integroivat_palamistehtavat",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Integroivat palamistehtävät",
      "ke04.pal.integroivat_palamistehtavat"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
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
    "seedKey": "ke04-v3:KE04-PAL-038",
    "contentId": "KE04-PAL-038",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Integroivat palamistehtävät",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Väite: 'Jos palaminen tuottaa CO₂:ta, se on automaattisesti täydellistä.' Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "CO₂:ta voi muodostua myös epätäydellisen palamisen yhteydessä samanaikaisesti CO:n tai noen kanssa. Täydellisyys arvioidaan kaikkien tuotteiden ja hapensaannin perusteella.",
    "scoring": "3 p: CO₂ voi esiintyä 1 p, CO/noki 1 p, kokonaisuuden arvio 1 p.",
    "hints": [
      "Epätäydellinen ei tarkoita nollaa CO₂:ta.",
      "Tuoteseos voi sisältää useita hiilituotteita."
    ],
    "skills": [
      "ke04.pal.integroivat_palamistehtavat",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Integroivat palamistehtävät",
      "ke04.pal.integroivat_palamistehtavat"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "combustion.complete_vs_incomplete"
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
    "seedKey": "ke04-v3:KE04-PAL-039",
    "contentId": "KE04-PAL-039",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Integroivat palamistehtävät",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "2,0 mol propaania palaa täydellisesti. Laske O₂:n kulutus sekä CO₂:n ja H₂O:n muodostuminen.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Yhtälö C₃H₈ + 5O₂ → 3CO₂ + 4H₂O. 2,0 mol propaania kuluttaa 10,0 mol O₂ ja tuottaa 6,0 mol CO₂ sekä 8,0 mol H₂O.",
    "scoring": "5 p: yhtälö 1 p, O₂ 1 p, CO₂ 1 p, H₂O 1 p, yksiköt 1 p.",
    "hints": [
      "Kerro kaikki reaktiokertoimet kahdella.",
      "Suhde 1:5:3:4",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "ke04.pal.integroivat_palamistehtavat",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Integroivat palamistehtävät",
      "ke04.pal.integroivat_palamistehtavat"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
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
    "seedKey": "ke04-v3:KE04-PAL-040",
    "contentId": "KE04-PAL-040",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "Integroivat palamistehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "Tuntematon hiilivety palaa täydellisesti. 1,0 mol ainetta kuluttaa 5,0 mol O₂ ja tuottaa 3,0 mol CO₂ sekä 4,0 mol H₂O. Päättele hiilivety ja osoita atomitase.",
    "options": [],
    "correctAnswer": null,
    "explanation": "C₃H₈ eli propaani. C: 3→3CO₂; H: 8→4H₂O; O: 5O₂=10 O ja tuotteissa 3CO₂=6 O +4H₂O=4 O, yhteensä 10.",
    "scoring": "6 p: kaava 2 p, C-tase 1 p, H-tase 1 p, O-tase 2 p.",
    "hints": [
      "CO₂ ja H₂O paljastavat C- ja H-määrät.",
      "Tarkista lopuksi O",
      "Ratkaise osa-alueet erikseen ja yhdistä ne vasta lopulliseen perusteltuun vastaukseen.."
    ],
    "skills": [
      "ke04.pal.integroivat_palamistehtavat",
      "task.integroiva_tehtava"
    ],
    "expectedConcepts": [
      "Integroivat palamistehtävät",
      "ke04.pal.integroivat_palamistehtavat"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 6,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Integroiva tehtävä"
  },
  {
    "seedKey": "ke04-v3:KE04-PAL-X01",
    "contentId": "KE04-PAL-X01",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Metaania poltetaan kahdessa polttimessa. Poltin A: sininen liekki, ei nokea. Poltin B: keltainen liekki, astian pohjaan kertyy mustaa nokea. a) Kummassa palaminen on täydellisempää? b) Mitä tuotteita B:ssä voi muodostua CO₂:n ja H₂O:n lisäksi? c) Mikä olosuhde selittää eron?",
    "options": [],
    "correctAnswer": null,
    "explanation": "A:ssa palaminen on täydellisempää. B:ssä voi syntyä CO:ta ja/tai hiiltä (nokea). Eroa selittää erityisesti heikompi hapensaanti B:ssä.",
    "scoring": "6 p: A 1 p; CO/C 2 p; hapenpuute 2 p; havaintoyhteys 1 p.",
    "hints": [
      "Sininen liekki liittyy yleensä parempaan hapensaantiin.",
      "Musta noki on hiiltä",
      "Perustele päätelmä yhdistämällä havainto tai mittaus suoraan kemialliseen malliin.."
    ],
    "skills": [
      "combustion.observation",
      "incomplete_combustion"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "combustion.observation",
      "incomplete_combustion"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
    ],
    "estimatedSeconds": 309,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 6,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Aineistotehtävä"
  },
  {
    "seedKey": "ke04-v3:KE04-PAL-X02",
    "contentId": "KE04-PAL-X02",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "multiple_choice",
    "difficulty": 4,
    "prompt": "Mikä yhtälö on tasapainotettu propaanin täydellinen palaminen?",
    "options": [
      "C₃H₈+4O₂→3CO₂+4H₂O",
      "C₃H₈+5O₂→3CO₂+4H₂O",
      "C₃H₈+3O₂→3CO+4H₂O",
      "C₃H₈+O₂→CO₂+H₂O"
    ],
    "correctAnswer": "C₃H₈+5O₂→3CO₂+4H₂O",
    "explanation": "B.",
    "scoring": "4 p: B 1 p; C-tarkistus 1 p; H-tarkistus 1 p; O-tarkistus 1 p.",
    "hints": [
      "Tasaa C ja H ensin.",
      "Laske tuotteiden O-atomeja",
      "Sulje pois vaihtoehdot vertaamalla jokaista niistä reaktioyhtälöön, rakenteeseen tai määritelmään.."
    ],
    "skills": [
      "combustion.balancing"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "combustion.balancing"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "oxygen_miscount"
    ],
    "estimatedSeconds": 88,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Diagnostinen monivalinta"
  },
  {
    "seedKey": "ke04-v3:KE04-PAL-X03",
    "contentId": "KE04-PAL-X03",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "calculation",
    "difficulty": 4,
    "prompt": "0,250 mol propaania palaa täydellisesti. Laske tarvittava O₂-määrä sekä syntyvät CO₂- ja H₂O-määrät.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Yhtälö C₃H₈+5O₂→3CO₂+4H₂O. O₂=1,25 mol; CO₂=0,750 mol; H₂O=1,00 mol.",
    "scoring": "7 p: yhtälö 1 p; O₂ 2 p; CO₂ 2 p; H₂O 2 p.",
    "hints": [
      "Käytä suhdetta 1:5:3:4.",
      "Kerro kaikki 0,250:llä",
      "Kirjoita välivaiheet näkyviin ja tarkista lopuksi yksiköt sekä tuloksen suuruusluokka.."
    ],
    "skills": [
      "combustion.stoichiometry"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "combustion.stoichiometry"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
    ],
    "estimatedSeconds": 221,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 7,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Stoikiometria"
  },
  {
    "seedKey": "ke04-v3:KE04-PAL-X04",
    "contentId": "KE04-PAL-X04",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "short_answer",
    "difficulty": 4,
    "prompt": "1,00 mol hiilivetyä tuottaa täydellisessä palamisessa 4,00 mol CO₂ ja 5,00 mol H₂O. Päättele hiilivedyn molekyylikaava.",
    "options": [],
    "correctAnswer": null,
    "explanation": "4 CO₂ kertoo 4 C-atomia. 5 H₂O sisältää 10 H-atomia. Kaava C₄H₁₀.",
    "scoring": "5 p: C=4 2 p; H=10 2 p; kaava 1 p.",
    "hints": [
      "Jokainen hiili päätyy yhteen CO₂:een.",
      "Jokainen H₂O sisältää kaksi H:ta",
      "Kirjoita välivaiheet näkyviin ja tarkista lopuksi yksiköt sekä tuloksen suuruusluokka.."
    ],
    "skills": [
      "combustion.formula_from_products"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "combustion.formula_from_products"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
    ],
    "estimatedSeconds": 154,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 5,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Palamiskaasujen päätelmä"
  },
  {
    "seedKey": "ke04-v3:KE04-PAL-X05",
    "contentId": "KE04-PAL-X05",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "application",
    "difficulty": 5,
    "prompt": "Palamisessa syntyvää CO₂:ta johdetaan absorptiopulloon ja CO₂:n määrä päätellään pullon massan kasvusta. Jos osa CO₂:sta karkaa ennen absorptiopulloa, mihin suuntaan hiilen määrä näytteessä arvioidaan?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Liian pieneksi, koska absorptiopullon massan kasvu aliarvioi syntyneen CO₂:n määrän ja siten näytteestä peräisin olevan hiilen määrän.",
    "scoring": "5 p: suunta 1 p; CO₂ aliarvio 2 p; hiilen aliarvio 2 p.",
    "hints": [
      "Vähemmän talteen otettua CO₂:ta → pienempi mitattu massa.",
      "CO₂:n hiili tulee näytteestä",
      "Nimeä ensin väärä kemiallinen periaate ja vasta sitten sen vaikutus lopputulokseen.."
    ],
    "skills": [
      "combustion.experimental_error",
      "data_inference"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "combustion.experimental_error",
      "data_inference"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
    ],
    "estimatedSeconds": 347,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 5,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Kokeellinen virheanalyysi"
  },
  {
    "seedKey": "ke04-v3:KE04-PAL-X06",
    "contentId": "KE04-PAL-X06",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "error_detection",
    "difficulty": 5,
    "prompt": "Opiskelija päättelee, että CO₂:n esiintyminen tuotteissa todistaa palamisen olleen täydellistä. Arvioi päätelmä.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Päätelmä on liian vahva. Epätäydellisessä palamisessa voi syntyä samanaikaisesti CO₂:ta, CO:ta ja/tai nokea. Täydellisyys vaatii, ettei merkittäviä epätäydellisen palamisen hiilituotteita synny.",
    "scoring": "5 p: päätelmän kumoaminen 1 p; CO/hiili 2 p; kokonaisarvio 2 p.",
    "hints": [
      "Epätäydellinen ei tarkoita 'ei lainkaan CO₂:ta'.",
      "Katso kaikki tuotteet",
      "Nimeä ensin väärä kemiallinen periaate ja vasta sitten sen vaikutus lopputulokseen.."
    ],
    "skills": [
      "combustion.complete_vs_incomplete"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "combustion.complete_vs_incomplete"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "co2_means_complete"
    ],
    "estimatedSeconds": 248,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 5,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Virheen analyysi"
  },
  {
    "seedKey": "ke04-v3:KE04-PAL-X07",
    "contentId": "KE04-PAL-X07",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "calculation",
    "difficulty": 5,
    "prompt": "11,0 g propaania (M=44,0 g/mol) palaa täydellisesti. a) Laske n(propaani). b) Laske tarvittava n(O₂). c) Laske syntyvän CO₂:n massa, M=44,0 g/mol. d) Jos CO₂:ta kerätään vain 30,0 g, mikä on CO₂:n keräyssaanto?",
    "options": [],
    "correctAnswer": null,
    "explanation": "n(C₃H₈)=0,250 mol; n(O₂)=1,25 mol; n(CO₂)=0,750 mol; m(CO₂)=33,0 g; keräyssaanto=30,0/33,0×100=90,9 %.",
    "scoring": "12 p: n propaani 2 p; O₂ 2 p; n CO₂ 2 p; massa 2 p; saanto 4 p.",
    "hints": [
      "Massa→mol.",
      "Suhde 1:5:3.",
      "Mol→massa.",
      "todellinen/teoreettinen."
    ],
    "skills": [
      "combustion.mass_stoichiometry",
      "yield"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "combustion.mass_stoichiometry",
      "yield"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
    ],
    "estimatedSeconds": 308,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 12,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Koereservi – yhdistetty lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-PAL-X08",
    "contentId": "KE04-PAL-X08",
    "chapter": 8,
    "topicName": "Palamisreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "Tuntemattoman hiilivedyn 0,100 mol näyte tuottaa täydellisessä palamisessa 0,300 mol CO₂ ja 0,400 mol H₂O. a) Päättele kaava. b) Tasapainota palaminen. c) Laske, kuinka monta moolia O₂ tarvittiin 0,100 mol näytteelle.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Per 1 mol näytettä: 3 mol CO₂ →C₃; 4 mol H₂O→H₈, joten C₃H₈. Yhtälö C₃H₈+5O₂→3CO₂+4H₂O. 0,100 mol tarvitsee 0,500 mol O₂.",
    "scoring": "10 p: kaava 4 p; yhtälö 3 p; O₂ 3 p.",
    "hints": [
      "Jaa tuotemoolit 0,100:lla.",
      "CO₂ kertoo C:t ja H₂O×2 vedyt.",
      "Tasaa O viimeisenä."
    ],
    "skills": [
      "combustion.formula",
      "balancing",
      "stoichiometry"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "combustion.formula",
      "balancing",
      "stoichiometry"
    ],
    "prerequisites": [
      "balanced_combustion",
      "stoichiometry"
    ],
    "commonErrors": [
      "complete_vs_incomplete_combustion",
      "oxygen_balance"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 10,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Koereservi – aineistopäättely"
  }
];
