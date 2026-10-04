import type { Ke04SeedQuestion } from "./types";

export const questions: Ke04SeedQuestion[] = [
  {
    "seedKey": "ke04-v3:KE04-RAJ-001",
    "contentId": "KE04-RAJ-001",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "Rajoittavan tekijän perusidea",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitä tarkoittaa rajoittava tekijä kemiallisessa reaktiossa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Lähtöainetta, joka kuluu ensin loppuun ja määrää tuotteen enimmäismäärän.",
    "scoring": "2 p: kuluu ensin 1 p, määrää tuotteen 1 p.",
    "hints": [
      "Ajattele raaka-ainetta, joka loppuu ensimmäisenä.",
      "Sen jälkeen reaktio ei voi jatkua."
    ],
    "skills": [
      "ke04.raj.rajoittavan_tekijan_perusidea",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Rajoittavan tekijän perusidea",
      "ke04.raj.rajoittavan_tekijan_perusidea"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
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
    "seedKey": "ke04-v3:KE04-RAJ-002",
    "contentId": "KE04-RAJ-002",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "Rajoittavan tekijän perusidea",
    "questionType": "multiple_choice",
    "difficulty": 1,
    "prompt": "Mikä aine määrää muodostuvan tuotteen enimmäismäärän?",
    "options": [
      "rajoittava lähtöaine",
      "se lähtöaine, jonka massa grammoina on pienin",
      "se lähtöaine, jonka moolimassa on pienin",
      "ylimääräinen lähtöaine"
    ],
    "correctAnswer": "rajoittava lähtöaine",
    "explanation": "A.",
    "scoring": "1 p.",
    "hints": [
      "Nimi kertoo.",
      "Se kuluu loppuun."
    ],
    "skills": [
      "ke04.raj.rajoittavan_tekijan_perusidea",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Rajoittavan tekijän perusidea",
      "ke04.raj.rajoittavan_tekijan_perusidea"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "limiting.mass_comparison",
      "limiting.identification"
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
    "seedKey": "ke04-v3:KE04-RAJ-003",
    "contentId": "KE04-RAJ-003",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "Rajoittavan tekijän perusidea",
    "questionType": "explanation",
    "difficulty": 2,
    "prompt": "Miksi pienempi lähtöaineen massa ei välttämättä tarkoita, että aine on rajoittava?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Reaktio riippuu ainemääristä ja stoikiometrisista kertoimista, ei suoraan massoista. Eri aineilla on eri moolimassat ja eri tarvittavat moolisuhteet.",
    "scoring": "3 p: ainemäärä 1 p, moolimassa 1 p, reaktiosuhde 1 p.",
    "hints": [
      "Muuta massat mooleiksi.",
      "Vertaa kertoimiin."
    ],
    "skills": [
      "ke04.raj.rajoittavan_tekijan_perusidea",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Rajoittavan tekijän perusidea",
      "ke04.raj.rajoittavan_tekijan_perusidea"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
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
    "seedKey": "ke04-v3:KE04-RAJ-004",
    "contentId": "KE04-RAJ-004",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "Rajoittavan tekijän perusidea",
    "questionType": "matching",
    "difficulty": 2,
    "prompt": "Yhdistä käsitteet: rajoittava aine, ylimääräinen aine ↔ kuluu ensin loppuun; jää reaktion jälkeen jäljelle.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Rajoittava → kuluu loppuun; ylimääräinen → jää jäljelle.",
    "scoring": "2 p.",
    "hints": [
      "Toinen rajoittaa.",
      "Toista on liikaa suhteessa tarpeeseen."
    ],
    "skills": [
      "ke04.raj.rajoittavan_tekijan_perusidea",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Rajoittavan tekijän perusidea",
      "ke04.raj.rajoittavan_tekijan_perusidea"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
    ],
    "estimatedSeconds": 133,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "Rajoittava",
        "right": "kuluu loppuun"
      },
      {
        "left": "ylimääräinen",
        "right": "jää jäljelle."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-RAJ-005",
    "contentId": "KE04-RAJ-005",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "Rajoittavan tekijän perusidea",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Väite: 'Rajoittava aine on aina se, jota on vähiten mooleina.' Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Ei aina. Moolimäärät pitää suhteuttaa reaktiokertoimiin. Esimerkiksi suhteessa 2A+B pienempi B-moolimäärä ei välttämättä rajoita, jos A:ta tarvitaan kaksinkertainen määrä.",
    "scoring": "3 p: kertoimien huomio 2 p, esimerkki/perustelu 1 p.",
    "hints": [
      "Vertaa n/kerroin-arvoja.",
      "Pelkkä n ei riitä."
    ],
    "skills": [
      "ke04.raj.rajoittavan_tekijan_perusidea",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Rajoittavan tekijän perusidea",
      "ke04.raj.rajoittavan_tekijan_perusidea"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "limiting.raw_moles_without_coefficients",
      "limiting.identification"
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
    "seedKey": "ke04-v3:KE04-RAJ-006",
    "contentId": "KE04-RAJ-006",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "1:1-reaktiot",
    "questionType": "calculation",
    "difficulty": 1,
    "prompt": "Reaktio A+B→C. A:ta on 0,30 mol ja B:tä 0,20 mol. Mikä on rajoittava?",
    "options": [],
    "correctAnswer": null,
    "explanation": "B, koska 1:1-suhteessa pienempi ainemäärä kuluu ensin.",
    "scoring": "2 p.",
    "hints": [
      "Suhde 1:1.",
      "Vertaa mooleja."
    ],
    "skills": [
      "ke04.raj.1_1_reaktiot",
      "task.lasku"
    ],
    "expectedConcepts": [
      "1:1-reaktiot",
      "ke04.raj.1_1_reaktiot"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
    ],
    "estimatedSeconds": 140,
    "examEligible": false,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-RAJ-007",
    "contentId": "KE04-RAJ-007",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "1:1-reaktiot",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Reaktio Fe+S→FeS. Fe:tä 0,50 mol ja S:ää 0,35 mol. Kuinka paljon FeS:ää enintään muodostuu?",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,35 mol FeS; S on rajoittava.",
    "scoring": "3 p: S rajoittava 1 p, suhde 1:1 1 p, tuote 0,35 mol 1 p.",
    "hints": [
      "Pienempi moolimäärä 1:1-suhteessa.",
      "Tuotetta sama moolimäärä."
    ],
    "skills": [
      "ke04.raj.1_1_reaktiot",
      "task.lasku"
    ],
    "expectedConcepts": [
      "1:1-reaktiot",
      "ke04.raj.1_1_reaktiot"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
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
    "seedKey": "ke04-v3:KE04-RAJ-008",
    "contentId": "KE04-RAJ-008",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "1:1-reaktiot",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Reaktiossa Fe + S → FeS on aluksi 0,50 mol Fe:tä ja 0,35 mol S:ää. Kuinka paljon Fe:tä jää, kun reaktio etenee loppuun?",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,50−0,35=0,15 mol Fe.",
    "scoring": "2 p.",
    "hints": [
      "Fe:tä kuluu yhtä paljon kuin S:ää.",
      "Vähennä kulunut alkuperäisestä."
    ],
    "skills": [
      "ke04.raj.1_1_reaktiot",
      "task.lasku"
    ],
    "expectedConcepts": [
      "1:1-reaktiot",
      "ke04.raj.1_1_reaktiot"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
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
    "seedKey": "ke04-v3:KE04-RAJ-009",
    "contentId": "KE04-RAJ-009",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "1:1-reaktiot",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "A+B→C, A:ta 1,20 mol ja B:tä 1,20 mol. Jääkö kumpaakaan ylimäärin?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Ei, jos reaktio menee täydellisesti: 1:1-suhde ja ainemäärät ovat samat.",
    "scoring": "2 p.",
    "hints": [
      "Tarvittava suhde täsmää annettuun.",
      "Molemmat voivat kulua kokonaan."
    ],
    "skills": [
      "ke04.raj.1_1_reaktiot",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "1:1-reaktiot",
      "ke04.raj.1_1_reaktiot"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
    ],
    "estimatedSeconds": 271,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Soveltaminen"
  },
  {
    "seedKey": "ke04-v3:KE04-RAJ-010",
    "contentId": "KE04-RAJ-010",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "1:1-reaktiot",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "A+B→C, A=0,10 mol ja B=0,40 mol. Opiskelija sanoo C:tä syntyvän 0,50 mol, koska hän laskee lähtöaineet yhteen. Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "C:tä syntyy enintään 0,10 mol, koska A on rajoittava ja suhde A:C on 1:1. B:tä jää 0,30 mol.",
    "scoring": "4 p: A rajoittava 1 p, C=0,10 2 p, B jäljelle 1 p.",
    "hints": [
      "Tuotteen määrä ei ole lähtöainemoolien summa.",
      "Seuraa reaktiokertoimia."
    ],
    "skills": [
      "ke04.raj.1_1_reaktiot",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "1:1-reaktiot",
      "ke04.raj.1_1_reaktiot"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "limiting.identification"
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
    "seedKey": "ke04-v3:KE04-RAJ-011",
    "contentId": "KE04-RAJ-011",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "2:1- ja 1:2-reaktiosuhteet",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "2H₂+O₂→2H₂O. H₂:ta on 2,0 mol ja O₂:ta 2,0 mol. Mikä on rajoittava?",
    "options": [],
    "correctAnswer": null,
    "explanation": "H₂, koska 2,0 mol H₂ tarvitsee vain 1,0 mol O₂; O₂ jää ylimäärin.",
    "scoring": "3 p: suhde 2:1 1 p, H₂ rajoittava 1 p, perustelu 1 p.",
    "hints": [
      "2 H₂ per 1 O₂.",
      "Laske paljonko O₂ tarvitaan H₂:lle."
    ],
    "skills": [
      "ke04.raj.2_1_ja_1_2_reaktiosuhteet",
      "task.lasku"
    ],
    "expectedConcepts": [
      "2:1- ja 1:2-reaktiosuhteet",
      "ke04.raj.2_1_ja_1_2_reaktiosuhteet"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
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
    "seedKey": "ke04-v3:KE04-RAJ-012",
    "contentId": "KE04-RAJ-012",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "2:1- ja 1:2-reaktiosuhteet",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "2H₂+O₂→2H₂O. H₂=4,0 mol ja O₂=1,0 mol. Mikä rajoittaa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "O₂; 1,0 mol O₂ tarvitsee 2,0 mol H₂, jota on riittävästi.",
    "scoring": "3 p.",
    "hints": [
      "1 O₂ tarvitsee 2 H₂.",
      "H₂:ta jää."
    ],
    "skills": [
      "ke04.raj.2_1_ja_1_2_reaktiosuhteet",
      "task.lasku"
    ],
    "expectedConcepts": [
      "2:1- ja 1:2-reaktiosuhteet",
      "ke04.raj.2_1_ja_1_2_reaktiosuhteet"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
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
    "seedKey": "ke04-v3:KE04-RAJ-013",
    "contentId": "KE04-RAJ-013",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "2:1- ja 1:2-reaktiosuhteet",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "Reaktiossa 2H₂ + O₂ → 2H₂O on aluksi 4,0 mol H₂:ta ja 1,0 mol O₂:ta. Kuinka paljon H₂O:ta muodostuu?",
    "options": [],
    "correctAnswer": null,
    "explanation": "2,0 mol H₂O, koska 1,0 mol O₂ → 2,0 mol H₂O.",
    "scoring": "3 p.",
    "hints": [
      "Rajoittava O₂ määrää tuotteen.",
      "Suhde O₂:H₂O=1:2."
    ],
    "skills": [
      "ke04.raj.2_1_ja_1_2_reaktiosuhteet",
      "task.lasku"
    ],
    "expectedConcepts": [
      "2:1- ja 1:2-reaktiosuhteet",
      "ke04.raj.2_1_ja_1_2_reaktiosuhteet"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
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
    "seedKey": "ke04-v3:KE04-RAJ-014",
    "contentId": "KE04-RAJ-014",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "2:1- ja 1:2-reaktiosuhteet",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "Reaktiossa 2H₂ + O₂ → 2H₂O on aluksi 4,0 mol H₂:ta ja 1,0 mol O₂:ta. Kuinka paljon H₂:ta jää ylimäärin?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Aluksi 4,0 mol; 1,0 mol O₂ kuluttaa 2,0 mol H₂, joten jää 2,0 mol H₂.",
    "scoring": "3 p.",
    "hints": [
      "Laske ensin kulunut H₂.",
      "Vähennä alkuperäisestä."
    ],
    "skills": [
      "ke04.raj.2_1_ja_1_2_reaktiosuhteet",
      "task.lasku"
    ],
    "expectedConcepts": [
      "2:1- ja 1:2-reaktiosuhteet",
      "ke04.raj.2_1_ja_1_2_reaktiosuhteet"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
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
    "seedKey": "ke04-v3:KE04-RAJ-015",
    "contentId": "KE04-RAJ-015",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "2:1- ja 1:2-reaktiosuhteet",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "2H₂+O₂→2H₂O, H₂=1,0 mol ja O₂=0,75 mol. Opiskelija sanoo O₂ rajoittavaksi, koska 0,75<1,0. Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "H₂ on rajoittava. 1,0 mol H₂ tarvitsee vain 0,50 mol O₂; O₂:ta on 0,75 mol. Pelkkää moolimäärää ei verrata ilman kertoimia.",
    "scoring": "4 p: H₂ 1 p, O₂-tarve 0,50 1 p, ylimäärä O₂ 1 p, kertoimien merkitys 1 p.",
    "hints": [
      "Jaa ainemäärät kertoimilla: H₂ 1/2=0,50; O₂ 0,75/1=0,75.",
      "Pienempi n/kerroin rajoittaa."
    ],
    "skills": [
      "ke04.raj.2_1_ja_1_2_reaktiosuhteet",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "2:1- ja 1:2-reaktiosuhteet",
      "ke04.raj.2_1_ja_1_2_reaktiosuhteet"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "limiting.identification"
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
    "seedKey": "ke04-v3:KE04-RAJ-016",
    "contentId": "KE04-RAJ-016",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "N₂ + 3H₂ → 2NH₃",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "N₂+3H₂→2NH₃. N₂=1,0 mol ja H₂=2,0 mol. Mikä on rajoittava?",
    "options": [],
    "correctAnswer": null,
    "explanation": "H₂, koska 1,0 mol N₂ tarvitsisi 3,0 mol H₂.",
    "scoring": "3 p.",
    "hints": [
      "Suhde 1:3.",
      "H₂ ei riitä kaikkeen N₂:een."
    ],
    "skills": [
      "ke04.raj.n_3h_2nh",
      "task.lasku"
    ],
    "expectedConcepts": [
      "N₂ + 3H₂ → 2NH₃",
      "ke04.raj.n_3h_2nh"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
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
    "seedKey": "ke04-v3:KE04-RAJ-017",
    "contentId": "KE04-RAJ-017",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "N₂ + 3H₂ → 2NH₃",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "N₂=0,50 mol ja H₂=2,0 mol. Mikä rajoittaa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "N₂, koska 0,50 mol N₂ tarvitsee 1,50 mol H₂; H₂:ta on 2,0 mol.",
    "scoring": "3 p.",
    "hints": [
      "Kerro N₂ kolmella.",
      "Vertaa H₂:n määrään."
    ],
    "skills": [
      "ke04.raj.n_3h_2nh",
      "task.lasku"
    ],
    "expectedConcepts": [
      "N₂ + 3H₂ → 2NH₃",
      "ke04.raj.n_3h_2nh"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
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
    "seedKey": "ke04-v3:KE04-RAJ-018",
    "contentId": "KE04-RAJ-018",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "N₂ + 3H₂ → 2NH₃",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "N₂=1,0 mol ja H₂=2,0 mol. Kuinka paljon NH₃:a enintään syntyy?",
    "options": [],
    "correctAnswer": null,
    "explanation": "H₂ rajoittaa. 3 mol H₂ →2 mol NH₃, joten 2,0 mol H₂ → 4/3=1,33 mol NH₃.",
    "scoring": "4 p: rajoittava 1 p, suhde 1 p, lasku 1 p, tulos 1 p.",
    "hints": [
      "Käytä H₂:NH₃=3:2.",
      "2,0×2/3."
    ],
    "skills": [
      "ke04.raj.n_3h_2nh",
      "task.lasku"
    ],
    "expectedConcepts": [
      "N₂ + 3H₂ → 2NH₃",
      "ke04.raj.n_3h_2nh"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
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
    "seedKey": "ke04-v3:KE04-RAJ-019",
    "contentId": "KE04-RAJ-019",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "N₂ + 3H₂ → 2NH₃",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "N₂=0,50 mol ja H₂=2,0 mol. Kuinka paljon H₂ jää, kun N₂ on kulunut?",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,50 mol N₂ kuluttaa 1,50 mol H₂, joten H₂:ta jää 0,50 mol.",
    "scoring": "3 p.",
    "hints": [
      "Kulunut H₂=3×n(N₂).",
      "Vähennä 2,0−1,5."
    ],
    "skills": [
      "ke04.raj.n_3h_2nh",
      "task.lasku"
    ],
    "expectedConcepts": [
      "N₂ + 3H₂ → 2NH₃",
      "ke04.raj.n_3h_2nh"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
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
    "seedKey": "ke04-v3:KE04-RAJ-020",
    "contentId": "KE04-RAJ-020",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "N₂ + 3H₂ → 2NH₃",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "N₂=0,80 mol ja H₂=2,10 mol. Päätä rajoittava, NH₃:n enimmäismäärä ja ylimääräisen aineen määrä.",
    "options": [],
    "correctAnswer": null,
    "explanation": "H₂ rajoittaa: N₂ tarvitsisi 2,40 mol H₂. NH₃=2,10×2/3=1,40 mol. N₂:ta kuluu 2,10/3=0,70 mol, joten jää 0,10 mol.",
    "scoring": "6 p: H₂ rajoittava 1 p, perustelu 1 p, NH₃ 2 p, N₂-kulutus 1 p, N₂-jäännös 1 p.",
    "hints": [
      "Vertaa H₂:n 2,10 mol tarvetta 0,80 mol N₂:lle.",
      "Käytä rajoittavaa kaikkiin jatkolaskuihin",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "ke04.raj.n_3h_2nh",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "N₂ + 3H₂ → 2NH₃",
      "ke04.raj.n_3h_2nh"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
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
    "seedKey": "ke04-v3:KE04-RAJ-021",
    "contentId": "KE04-RAJ-021",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "Massat muutetaan ensin ainemääriksi",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Fe+S→FeS. Fe:tä 5,58 g (M=55,8 g/mol) ja S:ää 3,20 g (M=32,0 g/mol). Laske molempien ainemäärät.",
    "options": [],
    "correctAnswer": null,
    "explanation": "n(Fe)=0,100 mol; n(S)=0,100 mol.",
    "scoring": "4 p: kumpikin kaava/tulos 2 p.",
    "hints": [
      "n=m/M.",
      "5,58/55,8 ja 3,20/32,0."
    ],
    "skills": [
      "ke04.raj.massat_muutetaan_ensin_ainemaariksi",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Massat muutetaan ensin ainemääriksi",
      "ke04.raj.massat_muutetaan_ensin_ainemaariksi"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
    ],
    "estimatedSeconds": 166,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-RAJ-022",
    "contentId": "KE04-RAJ-022",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "Massat muutetaan ensin ainemääriksi",
    "questionType": "application",
    "difficulty": 2,
    "prompt": "Reaktiossa Fe + S → FeS on 0,100 mol Fe:tä ja 0,100 mol S:ää. Onko jompikumpi aine ylimäärin vai ovatko määrät stoikiometriset?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Määrät ovat tarkalleen 1:1, joten kumpikaan ei ole ylimääräinen ideaalissa täydellisessä reaktiossa.",
    "scoring": "2 p.",
    "hints": [
      "Fe:S-suhde on 1:1.",
      "Molempia 0,100 mol."
    ],
    "skills": [
      "ke04.raj.massat_muutetaan_ensin_ainemaariksi",
      "task.paattely"
    ],
    "expectedConcepts": [
      "Massat muutetaan ensin ainemääriksi",
      "ke04.raj.massat_muutetaan_ensin_ainemaariksi"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
    ],
    "estimatedSeconds": 233,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Päättely"
  },
  {
    "seedKey": "ke04-v3:KE04-RAJ-023",
    "contentId": "KE04-RAJ-023",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "Massat muutetaan ensin ainemääriksi",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "2Mg+O₂→2MgO. Mg:tä 4,86 g (M=24,3) ja O₂:ta 4,00 g (M=32,0). Laske ainemäärät.",
    "options": [],
    "correctAnswer": null,
    "explanation": "n(Mg)=0,200 mol; n(O₂)=0,125 mol.",
    "scoring": "4 p.",
    "hints": [
      "n=m/M.",
      "Laske erikseen."
    ],
    "skills": [
      "ke04.raj.massat_muutetaan_ensin_ainemaariksi",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Massat muutetaan ensin ainemääriksi",
      "ke04.raj.massat_muutetaan_ensin_ainemaariksi"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
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
    "seedKey": "ke04-v3:KE04-RAJ-024",
    "contentId": "KE04-RAJ-024",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "Massat muutetaan ensin ainemääriksi",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Reaktiossa 2Mg + O₂ → 2MgO on 0,200 mol Mg:ta ja 0,125 mol O₂:ta. Mikä aine on rajoittava?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Mg. 0,200 mol Mg tarvitsee 0,100 mol O₂, jota on 0,125 mol.",
    "scoring": "3 p.",
    "hints": [
      "Mg:O₂=2:1.",
      "Tarvittava O₂ on puolet Mg:n mooleista."
    ],
    "skills": [
      "ke04.raj.massat_muutetaan_ensin_ainemaariksi",
      "task.paattely"
    ],
    "expectedConcepts": [
      "Massat muutetaan ensin ainemääriksi",
      "ke04.raj.massat_muutetaan_ensin_ainemaariksi"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
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
    "seedKey": "ke04-v3:KE04-RAJ-025",
    "contentId": "KE04-RAJ-025",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "Massat muutetaan ensin ainemääriksi",
    "questionType": "error_detection",
    "difficulty": 4,
    "prompt": "Reaktiossa 2Mg + O₂ → 2MgO käytetään 4,86 g Mg:ta (M=24,3 g/mol) ja 4,00 g O₂:ta (M=32,0 g/mol). Opiskelija valitsee O₂:n rajoittavaksi vain siksi, että sen massa on pienempi. Korjaa perustelu ja päättele oikea rajoittava aine.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Massat eivät ole vertailukelpoisia suoraan. Mooleina Mg=0,200 ja O₂=0,125; suhteeseen 2:1 verrattuna Mg/2=0,100 ja O₂/1=0,125, joten Mg rajoittaa.",
    "scoring": "5 p: massavertailun virhe 1 p, moolit 2 p, n/kerroin 1 p, Mg 1 p.",
    "hints": [
      "Muuta massat mooleiksi.",
      "Vertaa n/kertoimia",
      "Nimeä ensin väärä kemiallinen periaate ja vasta sitten sen vaikutus lopputulokseen.."
    ],
    "skills": [
      "ke04.raj.massat_muutetaan_ensin_ainemaariksi",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Massat muutetaan ensin ainemääriksi",
      "ke04.raj.massat_muutetaan_ensin_ainemaariksi"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "limiting.mass_comparison",
      "limiting.identification"
    ],
    "estimatedSeconds": 221,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 5,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Virheen tunnistus"
  },
  {
    "seedKey": "ke04-v3:KE04-RAJ-026",
    "contentId": "KE04-RAJ-026",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "n/kertoimen menetelmä",
    "questionType": "short_answer",
    "difficulty": 1,
    "prompt": "Mikä nopea menetelmä auttaa tunnistamaan rajoittavan aineen usean lähtöaineen reaktiossa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Laske kullekin lähtöaineelle n/reaktiokerroin. Pienin arvo määrää reaktion etenemisen ja rajoittavan aineen.",
    "scoring": "3 p.",
    "hints": [
      "Normalisoi moolit kertoimilla.",
      "Pienin loppuu ensin."
    ],
    "skills": [
      "ke04.raj.n_kertoimen_menetelma",
      "task.menetelma"
    ],
    "expectedConcepts": [
      "n/kertoimen menetelmä",
      "ke04.raj.n_kertoimen_menetelma"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
    ],
    "estimatedSeconds": 98,
    "examEligible": false,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Menetelmä"
  },
  {
    "seedKey": "ke04-v3:KE04-RAJ-027",
    "contentId": "KE04-RAJ-027",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "n/kertoimen menetelmä",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "2Al+3Cl₂→2AlCl₃. Al=0,40 mol, Cl₂=0,45 mol. Laske n/kerroin-arvot.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Al: 0,40/2=0,20; Cl₂:0,45/3=0,15.",
    "scoring": "3 p.",
    "hints": [
      "Jaa kunkin oma moolimäärä sen kertoimella.",
      "Älä ristiinjaa."
    ],
    "skills": [
      "ke04.raj.n_kertoimen_menetelma",
      "task.lasku"
    ],
    "expectedConcepts": [
      "n/kertoimen menetelmä",
      "ke04.raj.n_kertoimen_menetelma"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
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
    "seedKey": "ke04-v3:KE04-RAJ-028",
    "contentId": "KE04-RAJ-028",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "n/kertoimen menetelmä",
    "questionType": "application",
    "difficulty": 2,
    "prompt": "Reaktiossa 2Al + 3Cl₂ → 2AlCl₃ on 0,40 mol Al:a ja 0,45 mol Cl₂:ta. Mikä aine on rajoittava?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Cl₂, koska 0,15 on pienempi kuin Al:n 0,20.",
    "scoring": "2 p.",
    "hints": [
      "Pienempi n/kerroin.",
      "Se määrää reaktion laajuuden."
    ],
    "skills": [
      "ke04.raj.n_kertoimen_menetelma",
      "task.paattely"
    ],
    "expectedConcepts": [
      "n/kertoimen menetelmä",
      "ke04.raj.n_kertoimen_menetelma"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
    ],
    "estimatedSeconds": 233,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Päättely"
  },
  {
    "seedKey": "ke04-v3:KE04-RAJ-029",
    "contentId": "KE04-RAJ-029",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "n/kertoimen menetelmä",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "Kun reaktion etenemisen 'yksiköitä' on 0,15 mol (Cl₂ rajoittaa), kuinka paljon AlCl₃:a muodostuu? Kerroin on 2.",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,30 mol AlCl₃.",
    "scoring": "3 p: 0,15×2 1 p, 0,30 1 p, yksikkö 1 p.",
    "hints": [
      "Tuotteen kerroin 2.",
      "Kerro pienin n/kerroin tuotteen kertoimella."
    ],
    "skills": [
      "ke04.raj.n_kertoimen_menetelma",
      "task.lasku"
    ],
    "expectedConcepts": [
      "n/kertoimen menetelmä",
      "ke04.raj.n_kertoimen_menetelma"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
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
    "seedKey": "ke04-v3:KE04-RAJ-030",
    "contentId": "KE04-RAJ-030",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "n/kertoimen menetelmä",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "2Al+3Cl₂→2AlCl₃, Al=0,40 mol, Cl₂=0,45 mol. Kuinka paljon Al:a jää?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Cl₂ rajoittaa ja reaktion etenemä 0,15 mol. Al:a kuluu 2×0,15=0,30 mol, joten jää 0,10 mol.",
    "scoring": "4 p: etenemä 1 p, Al-kulutus 1 p, vähennys 1 p, tulos 1 p.",
    "hints": [
      "Käytä pienintä n/kerroin-arvoa.",
      "Kulunut Al=2×0,15",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "ke04.raj.n_kertoimen_menetelma",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "n/kertoimen menetelmä",
      "ke04.raj.n_kertoimen_menetelma"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
    ],
    "estimatedSeconds": 309,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Soveltaminen"
  },
  {
    "seedKey": "ke04-v3:KE04-RAJ-031",
    "contentId": "KE04-RAJ-031",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "Tuotteen enimmäismäärä",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "CaCO₃+2HCl→CaCl₂+H₂O+CO₂. CaCO₃=0,10 mol, HCl=0,50 mol. Mikä rajoittaa ja paljonko CO₂:ta muodostuu?",
    "options": [],
    "correctAnswer": null,
    "explanation": "CaCO₃ rajoittaa: 0,10 mol tarvitsee 0,20 mol HCl. CO₂:ta muodostuu 0,10 mol.",
    "scoring": "4 p: rajoittava 1 p, HCl-tarve 1 p, 1:1 CO₂ 1 p, tulos 1 p.",
    "hints": [
      "1 CaCO₃ tarvitsee 2 HCl.",
      "CO₂-suhde CaCO₃:een on 1:1."
    ],
    "skills": [
      "ke04.raj.tuotteen_enimmaismaara",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Tuotteen enimmäismäärä",
      "ke04.raj.tuotteen_enimmaismaara"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
    ],
    "estimatedSeconds": 166,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-RAJ-032",
    "contentId": "KE04-RAJ-032",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "Tuotteen enimmäismäärä",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Sama reaktio: CaCO₃=0,30 mol, HCl=0,40 mol. Mikä rajoittaa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "HCl. 0,30 mol CaCO₃ tarvitsisi 0,60 mol HCl, mutta on vain 0,40 mol.",
    "scoring": "3 p.",
    "hints": [
      "Kerro CaCO₃ kahdella.",
      "Vertaa saatavilla olevaan HCl:ään."
    ],
    "skills": [
      "ke04.raj.tuotteen_enimmaismaara",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Tuotteen enimmäismäärä",
      "ke04.raj.tuotteen_enimmaismaara"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
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
    "seedKey": "ke04-v3:KE04-RAJ-033",
    "contentId": "KE04-RAJ-033",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "Tuotteen enimmäismäärä",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "Reaktiossa CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂ on 0,30 mol CaCO₃:a ja 0,40 mol HCl:ää. Kuinka paljon CO₂:ta muodostuu?",
    "options": [],
    "correctAnswer": null,
    "explanation": "2 mol HCl →1 mol CO₂, joten 0,40 mol HCl →0,20 mol CO₂.",
    "scoring": "3 p.",
    "hints": [
      "Käytä suhdetta 2:1.",
      "Jaa HCl kahdella."
    ],
    "skills": [
      "ke04.raj.tuotteen_enimmaismaara",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Tuotteen enimmäismäärä",
      "ke04.raj.tuotteen_enimmaismaara"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
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
    "seedKey": "ke04-v3:KE04-RAJ-034",
    "contentId": "KE04-RAJ-034",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "Tuotteen enimmäismäärä",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "Reaktiossa CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂ on aluksi 0,30 mol CaCO₃:a ja 0,40 mol HCl:ää. Kuinka paljon CaCO₃:a jää reaktion jälkeen?",
    "options": [],
    "correctAnswer": null,
    "explanation": "CO₂=0,20 mol tarkoittaa 0,20 mol CaCO₃ kului; jäljelle 0,10 mol.",
    "scoring": "3 p.",
    "hints": [
      "CaCO₃:CO₂=1:1.",
      "Vähennä 0,30−0,20."
    ],
    "skills": [
      "ke04.raj.tuotteen_enimmaismaara",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Tuotteen enimmäismäärä",
      "ke04.raj.tuotteen_enimmaismaara"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
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
    "seedKey": "ke04-v3:KE04-RAJ-035",
    "contentId": "KE04-RAJ-035",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "Tuotteen enimmäismäärä",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "CaCO₃=25,0 g (M=100,0 g/mol) ja HCl=14,6 g (M=36,5 g/mol). Päätä rajoittava ja n(CO₂).",
    "options": [],
    "correctAnswer": null,
    "explanation": "n(CaCO₃)=0,250 mol; n(HCl)=0,400 mol. Tarve 2:1, joten HCl rajoittaa ja n(CO₂)=0,400/2=0,200 mol.",
    "scoring": "6 p: molemmat moolit 2 p, suhde 1 p, HCl rajoittava 1 p, CO₂-lasku 1 p, tulos 1 p.",
    "hints": [
      "Massat mooleiksi.",
      "n/kerroin: 0,250/1 vs 0,400/2",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "ke04.raj.tuotteen_enimmaismaara",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Tuotteen enimmäismäärä",
      "ke04.raj.tuotteen_enimmaismaara"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
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
    "seedKey": "ke04-v3:KE04-RAJ-036",
    "contentId": "KE04-RAJ-036",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "Ylimääräisen aineen määrä",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "2H₂+O₂→2H₂O. H₂=5,0 mol, O₂=2,0 mol. Kuinka paljon H₂ jää?",
    "options": [],
    "correctAnswer": null,
    "explanation": "O₂ rajoittaa; 2,0 mol O₂ kuluttaa 4,0 mol H₂, joten jää 1,0 mol H₂.",
    "scoring": "3 p.",
    "hints": [
      "O₂×2=kulunut H₂.",
      "Vähennä 5−4."
    ],
    "skills": [
      "ke04.raj.ylimaaraisen_aineen_maara",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Ylimääräisen aineen määrä",
      "ke04.raj.ylimaaraisen_aineen_maara"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
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
    "seedKey": "ke04-v3:KE04-RAJ-037",
    "contentId": "KE04-RAJ-037",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "Ylimääräisen aineen määrä",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "N₂+3H₂→2NH₃. N₂=1,0 mol, H₂=4,0 mol. Kuinka paljon H₂ jää?",
    "options": [],
    "correctAnswer": null,
    "explanation": "N₂ rajoittaa; 1,0 mol N₂ kuluttaa 3,0 mol H₂, joten jää 1,0 mol.",
    "scoring": "3 p.",
    "hints": [
      "Suhde 1:3.",
      "4−3."
    ],
    "skills": [
      "ke04.raj.ylimaaraisen_aineen_maara",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Ylimääräisen aineen määrä",
      "ke04.raj.ylimaaraisen_aineen_maara"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
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
    "seedKey": "ke04-v3:KE04-RAJ-038",
    "contentId": "KE04-RAJ-038",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "Ylimääräisen aineen määrä",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "2Al+3Cl₂→2AlCl₃. Al=1,0 mol, Cl₂=1,0 mol. Mikä jää ylimäärin ja kuinka paljon?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Cl₂ rajoittaa. 1,0 mol Cl₂ kuluttaa (2/3) mol Al≈0,667 mol, joten Al:a jää≈0,333 mol.",
    "scoring": "4 p: Cl₂ 1 p, Al-kulutus 1 p, vähennys 1 p, tulos 1 p.",
    "hints": [
      "3 Cl₂ käyttää 2 Al.",
      "Kerro 1,0×2/3."
    ],
    "skills": [
      "ke04.raj.ylimaaraisen_aineen_maara",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Ylimääräisen aineen määrä",
      "ke04.raj.ylimaaraisen_aineen_maara"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
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
    "seedKey": "ke04-v3:KE04-RAJ-039",
    "contentId": "KE04-RAJ-039",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "Ylimääräisen aineen määrä",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija vähentää ylimääräisen aineen määrää suoraan rajoittavan aineen mooleilla, vaikka kertoimet ovat 2:3. Mikä on oikea menettely?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Muunna rajoittavan aineen kulutus ensin ylimääräisen aineen kulutukseksi reaktiokertoimien suhteella ja vähennä vasta sitten alkuperäisestä määrästä.",
    "scoring": "3 p.",
    "hints": [
      "1 mol yhtä ei aina kuluta 1 mol toista.",
      "Käytä kertoimia ennen vähennystä."
    ],
    "skills": [
      "ke04.raj.ylimaaraisen_aineen_maara",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Ylimääräisen aineen määrä",
      "ke04.raj.ylimaaraisen_aineen_maara"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "limiting.raw_moles_without_coefficients",
      "limiting.identification"
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
    "seedKey": "ke04-v3:KE04-RAJ-040",
    "contentId": "KE04-RAJ-040",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "Ylimääräisen aineen määrä",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "2Mg+O₂→2MgO. Mg=0,50 mol ja O₂=0,40 mol. Laske O₂:n jäännös.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Mg rajoittaa; 0,50 mol Mg kuluttaa 0,25 mol O₂. Jää 0,40−0,25=0,15 mol O₂.",
    "scoring": "4 p.",
    "hints": [
      "O₂-kulutus on puolet Mg:n mooleista.",
      "Vähennä alkuperäisestä",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "ke04.raj.ylimaaraisen_aineen_maara",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Ylimääräisen aineen määrä",
      "ke04.raj.ylimaaraisen_aineen_maara"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
    ],
    "estimatedSeconds": 309,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Soveltaminen"
  },
  {
    "seedKey": "ke04-v3:KE04-RAJ-041",
    "contentId": "KE04-RAJ-041",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "Rajoittava tekijä massoista ja tuotteen massasta",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "2Mg+O₂→2MgO. Mg=2,43 g (M=24,3) ja O₂=3,20 g (M=32,0). Kumpi rajoittaa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "n(Mg)=0,100 mol; n(O₂)=0,100 mol. Mg tarvitsee vain 0,050 mol O₂, joten Mg rajoittaa.",
    "scoring": "4 p.",
    "hints": [
      "Molemmat ovat 0,100 mol, mutta suhde ei ole 1:1.",
      "Mg:O₂=2:1."
    ],
    "skills": [
      "ke04.raj.rajoittava_tekija_massoista_ja_tuotteen_massasta",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Rajoittava tekijä massoista ja tuotteen massasta",
      "ke04.raj.rajoittava_tekija_massoista_ja_tuotteen_massasta"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
    ],
    "estimatedSeconds": 166,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-RAJ-042",
    "contentId": "KE04-RAJ-042",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "Rajoittava tekijä massoista ja tuotteen massasta",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "Reaktiossa 2Mg + O₂ → 2MgO käytetään 2,43 g Mg:ta (M=24,3 g/mol) ja 3,20 g O₂:ta (M=32,0 g/mol). Kuinka monta moolia MgO:ta muodostuu?",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,100 mol MgO, koska Mg:MgO=2:2=1:1.",
    "scoring": "2 p.",
    "hints": [
      "Rajoittava Mg.",
      "Suhde Mg:MgO=1:1."
    ],
    "skills": [
      "ke04.raj.rajoittava_tekija_massoista_ja_tuotteen_massasta",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Rajoittava tekijä massoista ja tuotteen massasta",
      "ke04.raj.rajoittava_tekija_massoista_ja_tuotteen_massasta"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
    ],
    "estimatedSeconds": 194,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-RAJ-043",
    "contentId": "KE04-RAJ-043",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "Rajoittava tekijä massoista ja tuotteen massasta",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "Laske MgO:n massa, kun n=0,100 mol ja M(MgO)=40,3 g/mol.",
    "options": [],
    "correctAnswer": null,
    "explanation": "4,03 g.",
    "scoring": "3 p: m=nM 1 p, lasku 1 p, yksikkö 1 p.",
    "hints": [
      "0,100×40,3.",
      "g."
    ],
    "skills": [
      "ke04.raj.rajoittava_tekija_massoista_ja_tuotteen_massasta",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Rajoittava tekijä massoista ja tuotteen massasta",
      "ke04.raj.rajoittava_tekija_massoista_ja_tuotteen_massasta"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
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
    "seedKey": "ke04-v3:KE04-RAJ-044",
    "contentId": "KE04-RAJ-044",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "Rajoittava tekijä massoista ja tuotteen massasta",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija laskee tuotteen massan molemmista lähtöaineista erikseen ja lisää tulokset yhteen. Miksi tämä on väärin?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Sama reaktiotuote ei muodostu kahteen kertaan. Tuotteen enimmäismäärä määräytyy rajoittavan aineen perusteella; ylimääräisestä aineesta osa jää reagoimatta.",
    "scoring": "3 p: rajoittava ratkaisee 2 p, ei summata 1 p.",
    "hints": [
      "Valitse yksi rajoittava reaktiopolku.",
      "Ylimääräinen ei kaikki kulu."
    ],
    "skills": [
      "ke04.raj.rajoittava_tekija_massoista_ja_tuotteen_massasta",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Rajoittava tekijä massoista ja tuotteen massasta",
      "ke04.raj.rajoittava_tekija_massoista_ja_tuotteen_massasta"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "limiting.mass_comparison",
      "limiting.identification"
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
    "seedKey": "ke04-v3:KE04-RAJ-045",
    "contentId": "KE04-RAJ-045",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "Rajoittava tekijä massoista ja tuotteen massasta",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "2Mg+O₂→2MgO. Mg=12,15 g ja O₂=8,00 g. Käytä M(Mg)=24,3, M(O₂)=32,0, M(MgO)=40,3. Laske rajoittava aine ja MgO:n teoreettinen massa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "n(Mg)=0,500 mol; n(O₂)=0,250 mol. Suhde on täsmälleen 2:1, joten molemmat kuluvat stoikiometrisesti. n(MgO)=0,500 mol ja m=20,15 g≈20,2 g.",
    "scoring": "7 p: moolit 2 p, suhteen tunnistus 1 p, n(MgO) 2 p, massa 2 p.",
    "hints": [
      "Muuta molemmat mooleiksi.",
      "Vertaa 0,500:0,250 suhteeseen 2:1",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "ke04.raj.rajoittava_tekija_massoista_ja_tuotteen_massasta",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Rajoittava tekijä massoista ja tuotteen massasta",
      "ke04.raj.rajoittava_tekija_massoista_ja_tuotteen_massasta"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
    ],
    "estimatedSeconds": 309,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 7,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Soveltaminen"
  },
  {
    "seedKey": "ke04-v3:KE04-RAJ-046",
    "contentId": "KE04-RAJ-046",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "Integroivat ja diagnostiset tehtävät",
    "questionType": "short_answer",
    "difficulty": 2,
    "prompt": "Kirjoita neljän vaiheen yleinen toimintatapa rajoittavan tekijän tehtävään.",
    "options": [],
    "correctAnswer": null,
    "explanation": "1) Tasapainota reaktio. 2) Muunna lähtöaineet mooleiksi. 3) vertaa n/kertoimia ja valitse pienin. 4) Laske tuote ja mahdollinen ylimäärä rajoittavan aineen kautta.",
    "scoring": "4 p, 1 p / vaihe.",
    "hints": [
      "Yhtälö ennen laskuja.",
      "Kaikki vertailu mooleina."
    ],
    "skills": [
      "ke04.raj.integroivat_ja_diagnostiset_tehtavat",
      "task.menetelma"
    ],
    "expectedConcepts": [
      "Integroivat ja diagnostiset tehtävät",
      "ke04.raj.integroivat_ja_diagnostiset_tehtavat"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
    ],
    "estimatedSeconds": 117,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Menetelmä"
  },
  {
    "seedKey": "ke04-v3:KE04-RAJ-047",
    "contentId": "KE04-RAJ-047",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "Integroivat ja diagnostiset tehtävät",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Mikä on vaarallisin virhe: a) jättää yksikkö kirjoittamatta, b) käyttää tasapainottamatonta reaktioyhtälöä rajoittavan aineen valintaan? Perustele.",
    "options": [],
    "correctAnswer": null,
    "explanation": "b on sisällöllisesti vakavampi, koska väärät reaktiokertoimet antavat väärän ainemääräsuhteen ja voivat muuttaa sekä rajoittavan aineen että kaikki jatkotulokset. Yksikkövirhekin on arvioinnissa virhe.",
    "scoring": "3 p: b 1 p, kertoimet/suhde 1 p, seuraus 1 p.",
    "hints": [
      "Kertoimet ovat koko stoikiometrian pohja.",
      "Väärä suhde leviää kaikkiin laskuihin."
    ],
    "skills": [
      "ke04.raj.integroivat_ja_diagnostiset_tehtavat",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Integroivat ja diagnostiset tehtävät",
      "ke04.raj.integroivat_ja_diagnostiset_tehtavat"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "limiting.identification"
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
    "seedKey": "ke04-v3:KE04-RAJ-048",
    "contentId": "KE04-RAJ-048",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "Integroivat ja diagnostiset tehtävät",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Jos kahden lähtöaineen n/kerroin-arvot ovat täsmälleen samat, mitä se kertoo?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Lähtöaineet ovat keskenään stoikiometrisessä suhteessa ja voivat ideaalisti kulua yhtä aikaa loppuun; kumpikaan ei ole ylimäärin.",
    "scoring": "3 p.",
    "hints": [
      "Molemmat sallivat saman reaktion etenemän.",
      "Ei pienempää arvoa."
    ],
    "skills": [
      "ke04.raj.integroivat_ja_diagnostiset_tehtavat",
      "task.paattely"
    ],
    "expectedConcepts": [
      "Integroivat ja diagnostiset tehtävät",
      "ke04.raj.integroivat_ja_diagnostiset_tehtavat"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
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
    "seedKey": "ke04-v3:KE04-RAJ-049",
    "contentId": "KE04-RAJ-049",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "Integroivat ja diagnostiset tehtävät",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Reaktio 2A+3B→4C. A=0,60 mol ja B=0,75 mol. Päätä rajoittava ja n(C).",
    "options": [],
    "correctAnswer": null,
    "explanation": "A/2=0,30; B/3=0,25, joten B rajoittaa. Reaktion etenemä 0,25 mol ja C=4×0,25=1,00 mol.",
    "scoring": "5 p: n/kertoimet 2 p, B 1 p, C-lasku 1 p, tulos 1 p.",
    "hints": [
      "Jaa A kahdella ja B kolmella.",
      "Kerro pienempi arvo C:n kertoimella 4",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "ke04.raj.integroivat_ja_diagnostiset_tehtavat",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Integroivat ja diagnostiset tehtävät",
      "ke04.raj.integroivat_ja_diagnostiset_tehtavat"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
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
    "seedKey": "ke04-v3:KE04-RAJ-050",
    "contentId": "KE04-RAJ-050",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "Integroivat ja diagnostiset tehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "2A+3B→4C. A:n M=20,0 g/mol ja B:n M=30,0 g/mol. Käytössä on 10,0 g A:ta ja 18,0 g B:tä. Laske rajoittava aine, n(C), sekä ylimääräisen lähtöaineen jäljelle jäävä massa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "n(A)=0,500 mol; n(B)=0,600 mol. A/2=0,250, B/3=0,200 → B rajoittaa. n(C)=4×0,200=0,800 mol. A:ta kuluu 2×0,200=0,400 mol, jää 0,100 mol =2,00 g.",
    "scoring": "8 p: moolit 2 p, n/kertoimet 2 p, B 1 p, C 1 p, A-jäännösmoolit 1 p, massa 1 p.",
    "hints": [
      "Massat mooleiksi.",
      "n/kertoimet.",
      "Pienemmästä reaktion etenemä.",
      "Ylimäärästä vähennys ja takaisin grammoiksi."
    ],
    "skills": [
      "ke04.raj.integroivat_ja_diagnostiset_tehtavat",
      "task.integroiva_koetehtava"
    ],
    "expectedConcepts": [
      "Integroivat ja diagnostiset tehtävät",
      "ke04.raj.integroivat_ja_diagnostiset_tehtavat"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
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
    "seedKey": "ke04-v3:KE04-RAJ-X01",
    "contentId": "KE04-RAJ-X01",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "multiple_choice",
    "difficulty": 4,
    "prompt": "2H₂+O₂→2H₂O. H₂:ta on 1,20 mol ja O₂:ta 0,80 mol. Mikä perustelu on oikea?",
    "options": [
      "O₂ rajoittaa, koska 0,80<1,20",
      "H₂ rajoittaa, koska 1,20/2=0,60<0,80/1",
      "Molemmat rajoittavat, koska molempia on alle 2 mol",
      "H₂ rajoittaa, koska sen massa olisi aina pienempi."
    ],
    "correctAnswer": "H₂ rajoittaa, koska 1,20/2=0,60<0,80/1",
    "explanation": "B. n/kerroin: H₂=0,60 ja O₂=0,80, joten H₂ rajoittaa.",
    "scoring": "4 p: B 1 p; molemmat n/kertoimet 2 p; päätelmä 1 p.",
    "hints": [
      "Jaa moolimäärä aineen kertoimella.",
      "Pienin arvo rajoittaa",
      "Sulje pois vaihtoehdot vertaamalla jokaista niistä reaktioyhtälöön, rakenteeseen tai määritelmään.."
    ],
    "skills": [
      "limiting.n_over_coefficient"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "limiting.n_over_coefficient"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "compare_moles_without_coefficients",
      "compare_mass"
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
    "seedKey": "ke04-v3:KE04-RAJ-X02",
    "contentId": "KE04-RAJ-X02",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Reaktiossa A+B→C tehdään neljä koetta. A:ta pidetään 0,100 mol vakiona ja B:tä lisätään 0,020; 0,050; 0,100; 0,150 mol. Mitattu C:n määrä on 0,020; 0,050; 0,100; 0,100 mol. a) Miksi tuotteen määrä lakkaa kasvamasta? b) Kumpi aine rajoittaa ensimmäisessä ja viimeisessä kokeessa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "a) Kun B≥0,100 mol, A:n 0,100 mol loppuu ensin ja määrää enimmäistuotteen. b) Ensimmäisessä B rajoittaa; viimeisessä A rajoittaa.",
    "scoring": "6 p: plateau-selitys 2 p; ensimmäinen 2 p; viimeinen 2 p.",
    "hints": [
      "1:1-reaktiossa C ei voi ylittää pienempää lähtöainemoolimäärää.",
      "Katso milloin C saavuttaa 0,100 mol",
      "Perustele päätelmä yhdistämällä havainto tai mittaus suoraan kemialliseen malliin.."
    ],
    "skills": [
      "limiting.data_plateau",
      "graphical_reasoning"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "limiting.data_plateau",
      "graphical_reasoning"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
    ],
    "estimatedSeconds": 309,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 6,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Aineistotehtävä"
  },
  {
    "seedKey": "ke04-v3:KE04-RAJ-X03",
    "contentId": "KE04-RAJ-X03",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "2Mg+O₂→2MgO. Käytössä 6,08 g Mg (M=24,3) ja 3,20 g O₂ (M=32,0). a) Laske ainemäärät. b) Päätä rajoittava. c) Laske MgO:n teoreettinen n.",
    "options": [],
    "correctAnswer": null,
    "explanation": "n(Mg)=0,250 mol; n(O₂)=0,100 mol. Mg/2=0,125, O₂/1=0,100 →O₂ rajoittaa. n(MgO)=2×0,100=0,200 mol.",
    "scoring": "7 p: moolit 2 p; n/kertoimet 2 p; rajoittava 1 p; tuote 2 p.",
    "hints": [
      "Muuta molemmat mooleiksi.",
      "Vertaa n/kertoimia.",
      "Kerro pienempi arvo tuotteen kertoimella."
    ],
    "skills": [
      "limiting.mass_to_mole",
      "limiting.product"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "limiting.mass_to_mole",
      "limiting.product"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
    ],
    "estimatedSeconds": 309,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 7,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Massa-aineisto"
  },
  {
    "seedKey": "ke04-v3:KE04-RAJ-X04",
    "contentId": "KE04-RAJ-X04",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "short_answer",
    "difficulty": 4,
    "prompt": "Reaktiossa 2Mg + O₂ → 2MgO on 0,250 mol Mg:ta ja 0,100 mol O₂:ta. Kuinka paljon Mg:ta jää reaktion jälkeen mooleina ja grammoina, kun M(Mg)=24,3 g/mol?",
    "options": [],
    "correctAnswer": null,
    "explanation": "O₂ 0,100 mol kuluttaa Mg:ta 0,200 mol. Mg:ta jäi 0,250−0,200=0,050 mol =0,050×24,3=1,22 g.",
    "scoring": "5 p: kulunut Mg 1 p; jäännösmolit 2 p; jäännösmassa 2 p.",
    "hints": [
      "1 O₂ kuluttaa 2 Mg.",
      "Vähennä kulunut alkuperäisestä.",
      "m=nM."
    ],
    "skills": [
      "limiting.excess_remaining"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "limiting.excess_remaining"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
    ],
    "estimatedSeconds": 154,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 5,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Ylimäärän analyysi"
  },
  {
    "seedKey": "ke04-v3:KE04-RAJ-X05",
    "contentId": "KE04-RAJ-X05",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "error_detection",
    "difficulty": 5,
    "prompt": "Opiskelija ratkaisee tehtävän 2Al+3Cl₂→2AlCl₃ vertaamalla Al:n ja Cl₂:n grammoja suoraan ja valitsee pienemmän massan rajoittavaksi. Selitä kaksi erillistä syytä, miksi menetelmä voi epäonnistua.",
    "options": [],
    "correctAnswer": null,
    "explanation": "1) Eri aineilla on eri moolimassat, joten grammojen vertailu ei kerro hiukkasmääräsuhdetta. 2) Reaktiokertoimet eivät ole 1:1 vaan 2:3, joten myös moolit pitää suhteuttaa kertoimiin.",
    "scoring": "6 p: moolimassa 3 p; kerroinsuhde 3 p.",
    "hints": [
      "Kysy, mitä 10 g tarkoittaa mooleina kummallekin aineelle.",
      "Kysy, tarvitaanko aineita sama määrä mooleina",
      "Nimeä ensin väärä kemiallinen periaate ja vasta sitten sen vaikutus lopputulokseen.."
    ],
    "skills": [
      "limiting.conceptual",
      "stoichiometry.coefficient_meaning"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "limiting.conceptual",
      "stoichiometry.coefficient_meaning"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "compare_grams_directly"
    ],
    "estimatedSeconds": 248,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 6,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Virheen analyysi"
  },
  {
    "seedKey": "ke04-v3:KE04-RAJ-X06",
    "contentId": "KE04-RAJ-X06",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "application",
    "difficulty": 5,
    "prompt": "Opiskelija lisää vähitellen HCl:ää vakioon CaCO₃-massaan ja mittaa muodostuvan CO₂:n määrää. CO₂ kasvaa aluksi lineaarisesti HCl:n määrän mukana mutta saavuttaa lopulta vakioarvon. Selitä molemmat alueet rajoittavan tekijän avulla.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Alussa HCl on rajoittava, joten lisää HCl:ää tuottaa lisää CO₂:ta. Kun HCl:ää on riittävästi kaiken CaCO₃:n reagoimiseen, CaCO₃ muuttuu rajoittavaksi ja CO₂ saavuttaa maksimin.",
    "scoring": "6 p: alkualue 3 p; plateau 3 p.",
    "hints": [
      "Mieti, kumpi loppuu ensin pienillä HCl-määrillä.",
      "Mitä tapahtuu, kun kaikki CaCO₃ on kulunut",
      "Perustele päätelmä yhdistämällä havainto tai mittaus suoraan kemialliseen malliin.?"
    ],
    "skills": [
      "limiting.graph_interpretation",
      "reaction.progress"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "limiting.graph_interpretation",
      "reaction.progress"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
    ],
    "estimatedSeconds": 347,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 6,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Kokeellinen päätelmä"
  },
  {
    "seedKey": "ke04-v3:KE04-RAJ-X07",
    "contentId": "KE04-RAJ-X07",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "N₂+3H₂→2NH₃. Reaktoriin syötetään 14,0 g N₂ (M=28,0) ja 3,00 g H₂ (M=2,00). a) Laske molempien n. b) Päätä rajoittava. c) Laske NH₃:n teoreettinen n ja massa, M(NH₃)=17,0. d) Laske ylimääräisen lähtöaineen jäljelle jäävä massa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "n(N₂)=0,500 mol; n(H₂)=1,50 mol. Suhde on täsmälleen 1:3, joten kumpikaan ei jää ylimäärin. n(NH₃)=1,00 mol, m=17,0 g. Ylimäärää 0 g.",
    "scoring": "12 p: moolit 3 p; suhteen tunnistus 2 p; NH₃ n 2 p; massa 2 p; ylimäärän päätelmä 3 p.",
    "hints": [
      "Massat mooleiksi.",
      "Vertaa 0,500:1,50 suhteeseen 1:3.",
      "Tuotteen kerroin 2."
    ],
    "skills": [
      "limiting.mass",
      "product_mass",
      "excess_mass"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "limiting.mass",
      "product_mass",
      "excess_mass"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 12,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Koereservi – monivaiheinen"
  },
  {
    "seedKey": "ke04-v3:KE04-RAJ-X08",
    "contentId": "KE04-RAJ-X08",
    "chapter": 4,
    "topicName": "Rajoittava tekijä",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "2A+3B→4C. Varastossa on 1,00 mol A ja 1,20 mol B. Prosessinhoitaja voi ostaa joko 0,20 mol lisää A:ta tai 0,30 mol lisää B:tä. Kumpi hankinta kasvattaa C:n teoreettista määrää enemmän? Laske C:n määrä ennen ja kummankin vaihtoehdon jälkeen.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Aluksi A/2=0,50, B/3=0,40 →B rajoittaa, C=1,60 mol. +0,20 A: A/2=0,60, B edelleen 0,40 →C=1,60 mol, ei hyötyä. +0,30 B: B=1,50, B/3=0,50 ja A/2=0,50 →C=2,00 mol. B:n ostaminen on parempi.",
    "scoring": "10 p: alku 3 p; A-vaihtoehto 2 p; B-vaihtoehto 3 p; päätös/perustelu 2 p.",
    "hints": [
      "Laske n/kerroin joka tilanteessa.",
      "Lisääminen ei auta, jos lisäät jo ylimääräistä ainetta",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "limiting.optimization",
      "stoichiometric_planning"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "limiting.optimization",
      "stoichiometric_planning"
    ],
    "prerequisites": [
      "balanced_equation",
      "stoichiometric_ratio",
      "amount_of_substance"
    ],
    "commonErrors": [
      "raw_amount_comparison",
      "coefficient_normalization"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 10,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Koereservi – päätöksenteko"
  }
];
