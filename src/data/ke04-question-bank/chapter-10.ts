import type { Ke04SeedQuestion } from "./types";

export const questions: Ke04SeedQuestion[] = [
  {
    "seedKey": "ke04-v3:KE04-ADD-001",
    "contentId": "KE04-ADD-001",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Addition perusidea ja kaksoissidos",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitä additioreaktiossa tapahtuu alkeenin C=C-kaksoissidokselle?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kaksoissidoksen heikompi π-sidos avautuu ja hiilien välille jää yksinkertainen C–C-sidos; samalla uusia atomeja tai ryhmiä liittyy kaksoissidoksen hiiliin.",
    "scoring": "3 p: C=C avautuu 1 p, C–C jää 1 p, uudet ryhmät 1 p.",
    "hints": [
      "Additio = lisääminen.",
      "Seuraa sidoksen kertalukua."
    ],
    "skills": [
      "ke04.add.addition_perusidea_ja_kaksoissidos",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Addition perusidea ja kaksoissidos",
      "ke04.add.addition_perusidea_ja_kaksoissidos"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "addition_vs_substitution",
      "multiple_bond_change"
    ],
    "estimatedSeconds": 70,
    "examEligible": false,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Tunnistus"
  },
  {
    "seedKey": "ke04-v3:KE04-ADD-002",
    "contentId": "KE04-ADD-002",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Addition perusidea ja kaksoissidos",
    "questionType": "multiple_choice",
    "difficulty": 1,
    "prompt": "Mikä yhdiste reagoi tyypillisesti additiolla C=C-kaksoissidoksen kautta?",
    "options": [
      "eteeni",
      "etaani",
      "etanoli",
      "etaanihappo"
    ],
    "correctAnswer": "eteeni",
    "explanation": "A, eteeni.",
    "scoring": "1 p.",
    "hints": [
      "Etsi C=C.",
      "Alkeenit ovat tyypillisiä."
    ],
    "skills": [
      "ke04.add.addition_perusidea_ja_kaksoissidos",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Addition perusidea ja kaksoissidos",
      "ke04.add.addition_perusidea_ja_kaksoissidos"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.addition_vs_other"
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
    "seedKey": "ke04-v3:KE04-ADD-003",
    "contentId": "KE04-ADD-003",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Addition perusidea ja kaksoissidos",
    "questionType": "matching",
    "difficulty": 2,
    "prompt": "Yhdistä: additio, eliminaatio ↔ C=C muuttuu C–C:ksi ja ryhmiä liittyy; C–C muuttuu C=C:ksi ja ryhmiä poistuu.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Additio → C=C kuluu ja ryhmiä liittyy; eliminaatio → C=C syntyy ja ryhmiä poistuu.",
    "scoring": "2 p.",
    "hints": [
      "Additio lisää.",
      "Eliminaatio poistaa."
    ],
    "skills": [
      "ke04.add.addition_perusidea_ja_kaksoissidos",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Addition perusidea ja kaksoissidos",
      "ke04.add.addition_perusidea_ja_kaksoissidos"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "addition_vs_substitution",
      "multiple_bond_change"
    ],
    "estimatedSeconds": 133,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "Additio",
        "right": "C=C kuluu ja ryhmiä liittyy"
      },
      {
        "left": "eliminaatio",
        "right": "C=C syntyy ja ryhmiä poistuu."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-ADD-004",
    "contentId": "KE04-ADD-004",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Addition perusidea ja kaksoissidos",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi alkaanit eivät yleensä käy läpi samanlaista yksinkertaista additiota kuin alkeenit?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Alkaaneissa ei ole C=C-kaksoissidosta, jonka π-sidos voisi avautua ja tarjota kaksi uutta sitoutumispaikkaa. Niiden C–C- ja C–H-sidokset ovat jo tyydyttyneitä.",
    "scoring": "3 p: ei C=C 1 p, π-sidoksen puute 1 p, tyydyttyneisyys 1 p.",
    "hints": [
      "Vertaa eteeniä ja etaania.",
      "Missä on kaksoissidos?"
    ],
    "skills": [
      "ke04.add.addition_perusidea_ja_kaksoissidos",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Addition perusidea ja kaksoissidos",
      "ke04.add.addition_perusidea_ja_kaksoissidos"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "addition_vs_substitution",
      "multiple_bond_change"
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
    "seedKey": "ke04-v3:KE04-ADD-005",
    "contentId": "KE04-ADD-005",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Addition perusidea ja kaksoissidos",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Väite: 'Additiossa hiiliketjuun syntyy aina uusi C=C-kaksoissidos.' Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Väärin. Tyypillisessä alkeenin additiossa olemassa oleva C=C avautuu ja muuttuu C–C-yksinkertaiseksi sidokseksi samalla kun uusia ryhmiä liittyy.",
    "scoring": "3 p: väärin 1 p, C=C→C–C 1 p, ryhmien liittyminen 1 p.",
    "hints": [
      "Additio ja eliminaatio ovat vastakkaisia.",
      "Kummassa C=C syntyy?"
    ],
    "skills": [
      "ke04.add.addition_perusidea_ja_kaksoissidos",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Addition perusidea ja kaksoissidos",
      "ke04.add.addition_perusidea_ja_kaksoissidos"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.addition_vs_other",
      "organic.multiple_bond_change"
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
    "seedKey": "ke04-v3:KE04-ADD-006",
    "contentId": "KE04-ADD-006",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Vedyn additio eli hydraus",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitä tuotetta syntyy, kun eteeniin additoituu H₂?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Etaania, C₂H₆.",
    "scoring": "2 p: etaani/nimi 1 p, oikea kaava 1 p.",
    "hints": [
      "Lisää yksi H kummallekin kaksoissidoksen hiilelle.",
      "C₂H₄ + H₂."
    ],
    "skills": [
      "ke04.add.vedyn_additio_eli_hydraus",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Vedyn additio eli hydraus",
      "ke04.add.vedyn_additio_eli_hydraus"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "addition_vs_substitution",
      "multiple_bond_change"
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
    "seedKey": "ke04-v3:KE04-ADD-007",
    "contentId": "KE04-ADD-007",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Vedyn additio eli hydraus",
    "questionType": "short_answer",
    "difficulty": 2,
    "prompt": "Kirjoita eteenin hydraus kaavana.",
    "options": [],
    "correctAnswer": null,
    "explanation": "CH₂=CH₂ + H₂ → CH₃–CH₃.",
    "scoring": "3 p: lähtöaine 1 p, H₂ 1 p, etaani 1 p.",
    "hints": [
      "Kaksoissidos avautuu.",
      "Molemmat hiilet saavat yhden H:n."
    ],
    "skills": [
      "ke04.add.vedyn_additio_eli_hydraus",
      "task.reaktio"
    ],
    "expectedConcepts": [
      "Vedyn additio eli hydraus",
      "ke04.add.vedyn_additio_eli_hydraus"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "addition_vs_substitution",
      "multiple_bond_change"
    ],
    "estimatedSeconds": 117,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Reaktio"
  },
  {
    "seedKey": "ke04-v3:KE04-ADD-008",
    "contentId": "KE04-ADD-008",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Vedyn additio eli hydraus",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Propeeni + H₂ tuottaa",
    "options": [
      "propaania",
      "propanolia",
      "propaanihappoa",
      "propyylikloridia"
    ],
    "correctAnswer": "propaania",
    "explanation": "A, propaania.",
    "scoring": "1 p.",
    "hints": [
      "Hydraus kyllästää C=C-sidoksen.",
      "Kolmen hiilen alkaani on propaani."
    ],
    "skills": [
      "ke04.add.vedyn_additio_eli_hydraus",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Vedyn additio eli hydraus",
      "ke04.add.vedyn_additio_eli_hydraus"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.addition_vs_other"
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
    "seedKey": "ke04-v3:KE04-ADD-009",
    "contentId": "KE04-ADD-009",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Vedyn additio eli hydraus",
    "questionType": "short_answer",
    "difficulty": 3,
    "prompt": "But-1-eenin molekyylikaava on C₄H₈. Mikä on hydraustuotteen molekyylikaava?",
    "options": [],
    "correctAnswer": null,
    "explanation": "C₄H₁₀, koska additoituu H₂.",
    "scoring": "2 p.",
    "hints": [
      "Hiilimäärä säilyy.",
      "Lisää kaksi vetyä."
    ],
    "skills": [
      "ke04.add.vedyn_additio_eli_hydraus",
      "task.atomitasapaino"
    ],
    "expectedConcepts": [
      "Vedyn additio eli hydraus",
      "ke04.add.vedyn_additio_eli_hydraus"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "addition_vs_substitution",
      "multiple_bond_change"
    ],
    "estimatedSeconds": 135,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Atomitasapaino"
  },
  {
    "seedKey": "ke04-v3:KE04-ADD-010",
    "contentId": "KE04-ADD-010",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Vedyn additio eli hydraus",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Tuntematon hiilivety C₅H₁₀ kuluttaa yhden moolin H₂ yhtä moolia kohti ja muuttuu C₅H₁₂:ksi. Mitä rakenteellista piirrettä tämä tukee?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Yhdisteessä oli yksi hydrautuva C=C-kaksoissidos, eli se sopii alkeeniksi tässä tarkastelussa.",
    "scoring": "3 p: yksi C=C 2 p, alkeeni 1 p.",
    "hints": [
      "Yksi H₂ liittyy yhtä C=C:tä kohti.",
      "Vetyjen määrä kasvaa kahdella."
    ],
    "skills": [
      "ke04.add.vedyn_additio_eli_hydraus",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Vedyn additio eli hydraus",
      "ke04.add.vedyn_additio_eli_hydraus"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "addition_vs_substitution",
      "multiple_bond_change"
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
    "seedKey": "ke04-v3:KE04-ADD-011",
    "contentId": "KE04-ADD-011",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Halogeenien additio",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitä tapahtuu Br₂-molekyylille, kun se additoituu eteeniin?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Br–Br-sidos katkeaa ja yksi Br-atomi liittyy kumpaankin entisen kaksoissidoksen hiileen; syntyy 1,2-dibromietaani.",
    "scoring": "3 p: Br–Br katkeaa 1 p, Br kummallekin hiilelle 1 p, tuote 1 p.",
    "hints": [
      "Kaksi bromiatomia ja kaksi kaksoissidoksen hiiltä.",
      "Yksi Br per hiili."
    ],
    "skills": [
      "ke04.add.halogeenien_additio",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Halogeenien additio",
      "ke04.add.halogeenien_additio"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "addition_vs_substitution",
      "multiple_bond_change"
    ],
    "estimatedSeconds": 70,
    "examEligible": false,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Tunnistus"
  },
  {
    "seedKey": "ke04-v3:KE04-ADD-012",
    "contentId": "KE04-ADD-012",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Halogeenien additio",
    "questionType": "short_answer",
    "difficulty": 2,
    "prompt": "Kirjoita eteenin ja bromin additioreaktio kaavana.",
    "options": [],
    "correctAnswer": null,
    "explanation": "CH₂=CH₂ + Br₂ → BrCH₂–CH₂Br.",
    "scoring": "3 p.",
    "hints": [
      "C=C → C–C.",
      "Lisää Br molemmille hiilille."
    ],
    "skills": [
      "ke04.add.halogeenien_additio",
      "task.reaktio"
    ],
    "expectedConcepts": [
      "Halogeenien additio",
      "ke04.add.halogeenien_additio"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "addition_vs_substitution",
      "multiple_bond_change"
    ],
    "estimatedSeconds": 117,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Reaktio"
  },
  {
    "seedKey": "ke04-v3:KE04-ADD-013",
    "contentId": "KE04-ADD-013",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Halogeenien additio",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Eteeni + Cl₂ tuottaa",
    "options": [
      "1,2-dikloorietaania",
      "kloorieteeniä + HCl",
      "etanolia",
      "etaania"
    ],
    "correctAnswer": "1,2-dikloorietaania",
    "explanation": "A.",
    "scoring": "1 p.",
    "hints": [
      "Molemmat Cl-atomit liittyvät.",
      "Ei vetyä poisteta."
    ],
    "skills": [
      "ke04.add.halogeenien_additio",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Halogeenien additio",
      "ke04.add.halogeenien_additio"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.addition_vs_other",
      "organic.addition_atom_balance"
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
    "seedKey": "ke04-v3:KE04-ADD-014",
    "contentId": "KE04-ADD-014",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Halogeenien additio",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi halogeenin additio voi toimia kokeellisena vihjeenä C=C-kaksoissidoksen olemassaolosta?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Alkeeni reagoi halogeenin kanssa additiolla ja kuluttaa halogeenia; tähän voi liittyä halogeeniliuoksen värin häviäminen. Tyydyttynyt yhdiste ei samoissa olosuhteissa reagoi samalla tavalla.",
    "scoring": "3 p: additio 1 p, halogeenin kuluminen/väri 1 p, vertailu tyydyttyneeseen 1 p.",
    "hints": [
      "Mieti mitä Br₂:lle tapahtuu.",
      "Reaktio kuluttaa värillistä reagenssia."
    ],
    "skills": [
      "ke04.add.halogeenien_additio",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Halogeenien additio",
      "ke04.add.halogeenien_additio"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "addition_vs_substitution",
      "multiple_bond_change"
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
    "seedKey": "ke04-v3:KE04-ADD-015",
    "contentId": "KE04-ADD-015",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Halogeenien additio",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija kirjoittaa CH₂=CH₂ + Br₂ → CH₃CH₂Br. Mikä atomitase- ja rakennusvirhe on?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Tuotteessa on vain yksi Br, vaikka lähtöaineessa on kaksi, ja vetyjä on lisätty ilman lähdettä. Oikea additiotuote on BrCH₂CH₂Br.",
    "scoring": "4 p: Br-virhe 1 p, H-virhe 1 p, oikea tuote 2 p.",
    "hints": [
      "Laske Br-atomit.",
      "Br₂ ei tuo vetyä."
    ],
    "skills": [
      "ke04.add.halogeenien_additio",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Halogeenien additio",
      "ke04.add.halogeenien_additio"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.addition_vs_other",
      "organic.addition_atom_balance"
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
    "seedKey": "ke04-v3:KE04-ADD-016",
    "contentId": "KE04-ADD-016",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Vetyhalogenidien additio",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitä kahta atomia/ryhmää HCl tuo alkeenin kaksoissidokseen?",
    "options": [],
    "correctAnswer": null,
    "explanation": "H-atomin ja Cl-atomin.",
    "scoring": "1 p.",
    "hints": [
      "Pilko H–Cl.",
      "Molemmat osat liittyvät tuotteeseen."
    ],
    "skills": [
      "ke04.add.vetyhalogenidien_additio",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Vetyhalogenidien additio",
      "ke04.add.vetyhalogenidien_additio"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "addition_vs_substitution",
      "multiple_bond_change"
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
    "seedKey": "ke04-v3:KE04-ADD-017",
    "contentId": "KE04-ADD-017",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Vetyhalogenidien additio",
    "questionType": "short_answer",
    "difficulty": 2,
    "prompt": "Kirjoita eteenin ja HCl:n additiotuote.",
    "options": [],
    "correctAnswer": null,
    "explanation": "CH₂=CH₂ + HCl → CH₃CH₂Cl, kloorietaani.",
    "scoring": "3 p: kaava 2 p, nimi 1 p.",
    "hints": [
      "Eteeni on symmetrinen.",
      "Lisää H toiselle ja Cl toiselle hiilelle."
    ],
    "skills": [
      "ke04.add.vetyhalogenidien_additio",
      "task.reaktio"
    ],
    "expectedConcepts": [
      "Vetyhalogenidien additio",
      "ke04.add.vetyhalogenidien_additio"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "addition_vs_substitution",
      "multiple_bond_change"
    ],
    "estimatedSeconds": 117,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Reaktio"
  },
  {
    "seedKey": "ke04-v3:KE04-ADD-018",
    "contentId": "KE04-ADD-018",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Vetyhalogenidien additio",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Eteeni + HBr tuottaa",
    "options": [
      "bromietaania",
      "dibromietaania",
      "etanolia",
      "eteenioksidia"
    ],
    "correctAnswer": "bromietaania",
    "explanation": "A, bromietaania.",
    "scoring": "1 p.",
    "hints": [
      "HBr tuo yhden H:n ja yhden Br:n.",
      "Tuotteessa on yksi Br."
    ],
    "skills": [
      "ke04.add.vetyhalogenidien_additio",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Vetyhalogenidien additio",
      "ke04.add.vetyhalogenidien_additio"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.addition_vs_other",
      "organic.addition_atom_balance"
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
    "seedKey": "ke04-v3:KE04-ADD-019",
    "contentId": "KE04-ADD-019",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Vetyhalogenidien additio",
    "questionType": "short_answer",
    "difficulty": 3,
    "prompt": "Tarkista kaavan avulla, että C₂H₄ + HCl → C₂H₅Cl säilyttää atomit.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Vasemmalla C₂, H₅ ja Cl₁; oikealla C₂H₅Cl. Tasapainossa.",
    "scoring": "3 p: C, H ja Cl oikein tarkistettu.",
    "hints": [
      "Laske kunkin alkuaineen atomit.",
      "HCl lisää yhden H:n."
    ],
    "skills": [
      "ke04.add.vetyhalogenidien_additio",
      "task.atomitasapaino"
    ],
    "expectedConcepts": [
      "Vetyhalogenidien additio",
      "ke04.add.vetyhalogenidien_additio"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "addition_vs_substitution",
      "multiple_bond_change"
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
    "seedKey": "ke04-v3:KE04-ADD-020",
    "contentId": "KE04-ADD-020",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Vetyhalogenidien additio",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Väite: 'HCl:n additiossa kloori korvaa yhden alkeenin vedyn.' Mikä on parempi kuvaus?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Additiossa H ja Cl molemmat liittyvät C=C-kaksoissidoksen hiiliin, eikä kyse ole vedyn korvaamisesta. Korvaaminen olisi substituutio.",
    "scoring": "3 p: molemmat liittyvät 1 p, C=C 1 p, substituutioerottelu 1 p.",
    "hints": [
      "Additio lisää atomimäärää tuotteeseen.",
      "Substituutiossa jokin ryhmä poistuu tilalle."
    ],
    "skills": [
      "ke04.add.vetyhalogenidien_additio",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Vetyhalogenidien additio",
      "ke04.add.vetyhalogenidien_additio"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.addition_vs_other",
      "organic.addition_atom_balance"
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
    "seedKey": "ke04-v3:KE04-ADD-021",
    "contentId": "KE04-ADD-021",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Veden additio ja alkoholin muodostuminen",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mikä funktionaalinen ryhmä syntyy, kun vettä additoidaan alkeeniin?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Hydroksyyliryhmä –OH; tuotteena on alkoholi.",
    "scoring": "2 p: OH 1 p, alkoholi 1 p.",
    "hints": [
      "Vesi tuo H:n ja OH:n.",
      "OH määrittää alkoholin."
    ],
    "skills": [
      "ke04.add.veden_additio_ja_alkoholin_muodostuminen",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Veden additio ja alkoholin muodostuminen",
      "ke04.add.veden_additio_ja_alkoholin_muodostuminen"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "addition_vs_substitution",
      "multiple_bond_change"
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
    "seedKey": "ke04-v3:KE04-ADD-022",
    "contentId": "KE04-ADD-022",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Veden additio ja alkoholin muodostuminen",
    "questionType": "short_answer",
    "difficulty": 2,
    "prompt": "Kirjoita eteenin veden additio kaavana.",
    "options": [],
    "correctAnswer": null,
    "explanation": "CH₂=CH₂ + H₂O → CH₃CH₂OH.",
    "scoring": "3 p: eteeni 1 p, vesi 1 p, etanoli 1 p.",
    "hints": [
      "Lisää H ja OH kaksoissidoksen hiilille.",
      "Symmetrinen eteeni antaa etanolin."
    ],
    "skills": [
      "ke04.add.veden_additio_ja_alkoholin_muodostuminen",
      "task.reaktio"
    ],
    "expectedConcepts": [
      "Veden additio ja alkoholin muodostuminen",
      "ke04.add.veden_additio_ja_alkoholin_muodostuminen"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "addition_vs_substitution",
      "multiple_bond_change"
    ],
    "estimatedSeconds": 117,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Reaktio"
  },
  {
    "seedKey": "ke04-v3:KE04-ADD-023",
    "contentId": "KE04-ADD-023",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Veden additio ja alkoholin muodostuminen",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Eteenin hydraation tuote on",
    "options": [
      "etanoli",
      "etaani",
      "etaanihappo",
      "etyylietanaatti"
    ],
    "correctAnswer": "etanoli",
    "explanation": "A, etanoli.",
    "scoring": "1 p.",
    "hints": [
      "Hydraatio tarkoittaa veden lisäämistä.",
      "H+OH liittyvät."
    ],
    "skills": [
      "ke04.add.veden_additio_ja_alkoholin_muodostuminen",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Veden additio ja alkoholin muodostuminen",
      "ke04.add.veden_additio_ja_alkoholin_muodostuminen"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.addition_vs_other"
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
    "seedKey": "ke04-v3:KE04-ADD-024",
    "contentId": "KE04-ADD-024",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Veden additio ja alkoholin muodostuminen",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Miten eteenin hydraatio ja etanolin veden eliminaatio liittyvät toisiinsa rakenteellisesti?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Ne ovat vastakkaissuuntaisia rakennemuutoksia: eteeni + H₂O → etanoli on additio, etanoli → eteeni + H₂O on eliminaatio.",
    "scoring": "4 p: hydraatio/additio 2 p, eliminaatio 2 p.",
    "hints": [
      "Kirjoita reaktiot nuolilla vastakkaisiin suuntiin.",
      "Seuraa C=C:tä."
    ],
    "skills": [
      "ke04.add.veden_additio_ja_alkoholin_muodostuminen",
      "task.vertailu"
    ],
    "expectedConcepts": [
      "Veden additio ja alkoholin muodostuminen",
      "ke04.add.veden_additio_ja_alkoholin_muodostuminen"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "addition_vs_substitution",
      "multiple_bond_change"
    ],
    "estimatedSeconds": 271,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Vertailu"
  },
  {
    "seedKey": "ke04-v3:KE04-ADD-025",
    "contentId": "KE04-ADD-025",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Veden additio ja alkoholin muodostuminen",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Alkeeni C₃H₆ additoi yhden H₂O-molekyylin. Mikä on alkoholituotteen molekyylikaava?",
    "options": [],
    "correctAnswer": null,
    "explanation": "C₃H₈O.",
    "scoring": "2 p.",
    "hints": [
      "Lisää H₂O atomitasolla.",
      "C₃H₆ + H₂O = C₃H₈O."
    ],
    "skills": [
      "ke04.add.veden_additio_ja_alkoholin_muodostuminen",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Veden additio ja alkoholin muodostuminen",
      "ke04.add.veden_additio_ja_alkoholin_muodostuminen"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "addition_vs_substitution",
      "multiple_bond_change"
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
    "seedKey": "ke04-v3:KE04-ADD-026",
    "contentId": "KE04-ADD-026",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Addition atomitasapaino ja molekyylikaavat",
    "questionType": "application",
    "difficulty": 2,
    "prompt": "Alkeeni C₆H₁₂ additoi H₂. Mikä on tuotteen molekyylikaava?",
    "options": [],
    "correctAnswer": null,
    "explanation": "C₆H₁₄.",
    "scoring": "1 p.",
    "hints": [
      "Lisää kaksi vetyä.",
      "Hiilet säilyvät."
    ],
    "skills": [
      "ke04.add.addition_atomitasapaino_ja_molekyylikaavat",
      "task.laskennallinen_paattely"
    ],
    "expectedConcepts": [
      "Addition atomitasapaino ja molekyylikaavat",
      "ke04.add.addition_atomitasapaino_ja_molekyylikaavat"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "addition_vs_substitution",
      "multiple_bond_change"
    ],
    "estimatedSeconds": 233,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 1,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Laskennallinen päättely"
  },
  {
    "seedKey": "ke04-v3:KE04-ADD-027",
    "contentId": "KE04-ADD-027",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Addition atomitasapaino ja molekyylikaavat",
    "questionType": "application",
    "difficulty": 2,
    "prompt": "Alkeeni C₄H₈ additoi Br₂. Mikä on tuotteen molekyylikaava?",
    "options": [],
    "correctAnswer": null,
    "explanation": "C₄H₈Br₂.",
    "scoring": "2 p.",
    "hints": [
      "Br₂:n molemmat bromit jäävät tuotteeseen.",
      "Vetyjen määrä ei muutu."
    ],
    "skills": [
      "ke04.add.addition_atomitasapaino_ja_molekyylikaavat",
      "task.laskennallinen_paattely"
    ],
    "expectedConcepts": [
      "Addition atomitasapaino ja molekyylikaavat",
      "ke04.add.addition_atomitasapaino_ja_molekyylikaavat"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "addition_vs_substitution",
      "multiple_bond_change"
    ],
    "estimatedSeconds": 233,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Laskennallinen päättely"
  },
  {
    "seedKey": "ke04-v3:KE04-ADD-028",
    "contentId": "KE04-ADD-028",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Addition atomitasapaino ja molekyylikaavat",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Alkeeni C₅H₁₀ additoi HCl. Mikä on tuotteen molekyylikaava?",
    "options": [],
    "correctAnswer": null,
    "explanation": "C₅H₁₁Cl.",
    "scoring": "2 p.",
    "hints": [
      "Lisää H₁Cl₁.",
      "Hiilet säilyvät."
    ],
    "skills": [
      "ke04.add.addition_atomitasapaino_ja_molekyylikaavat",
      "task.laskennallinen_paattely"
    ],
    "expectedConcepts": [
      "Addition atomitasapaino ja molekyylikaavat",
      "ke04.add.addition_atomitasapaino_ja_molekyylikaavat"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "addition_vs_substitution",
      "multiple_bond_change"
    ],
    "estimatedSeconds": 271,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Laskennallinen päättely"
  },
  {
    "seedKey": "ke04-v3:KE04-ADD-029",
    "contentId": "KE04-ADD-029",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Addition atomitasapaino ja molekyylikaavat",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija väittää, että C₄H₈ + Br₂ → C₄H₈Br. Miksi kaava ei voi olla oikea täydellisessä additiossa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Br₂ tuo kaksi Br-atomia, joten tuotteen tulee sisältää Br₂ eli C₄H₈Br₂; yksi bromi rikkoo atomitasapainon.",
    "scoring": "3 p: kaksi Br 1 p, atomitase 1 p, oikea kaava 1 p.",
    "hints": [
      "Laske bromit ennen ja jälkeen.",
      "Mitään Br-atomia ei saa kadota."
    ],
    "skills": [
      "ke04.add.addition_atomitasapaino_ja_molekyylikaavat",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Addition atomitasapaino ja molekyylikaavat",
      "ke04.add.addition_atomitasapaino_ja_molekyylikaavat"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.addition_vs_other",
      "organic.addition_atom_balance"
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
    "seedKey": "ke04-v3:KE04-ADD-030",
    "contentId": "KE04-ADD-030",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Addition atomitasapaino ja molekyylikaavat",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Yksi mooli C₂H₄ reagoi täydellisesti yhden moolin Br₂ kanssa. Kuinka monta moolia additiotuotetta muodostuu ideaalisti?",
    "options": [],
    "correctAnswer": null,
    "explanation": "1 mol C₂H₄Br₂, koska stoikiometrinen suhde on 1:1:1.",
    "scoring": "3 p: 1 mol 1 p, tuote 1 p, 1:1-perustelu 1 p.",
    "hints": [
      "Yksi eteeni käyttää yhden Br₂:n.",
      "Molemmat yhdistyvät yhdeksi molekyyliksi."
    ],
    "skills": [
      "ke04.add.addition_atomitasapaino_ja_molekyylikaavat",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Addition atomitasapaino ja molekyylikaavat",
      "ke04.add.addition_atomitasapaino_ja_molekyylikaavat"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "addition_vs_substitution",
      "multiple_bond_change"
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
    "seedKey": "ke04-v3:KE04-ADD-031",
    "contentId": "KE04-ADD-031",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Additio vs substituutio ja eliminaatio",
    "questionType": "recognition",
    "difficulty": 2,
    "prompt": "Luokittele: a) eteeni + H₂ → etaani, b) etanoli → eteeni + H₂O, c) kloorietaani + OH⁻ → etanoli + Cl⁻.",
    "options": [],
    "correctAnswer": null,
    "explanation": "a additio, b eliminaatio, c substituutio.",
    "scoring": "3 p, 1 p / reaktio.",
    "hints": [
      "a ryhmiä liittyy C=C:hen.",
      "b vettä poistuu.",
      "c Cl korvautuu OH:lla."
    ],
    "skills": [
      "ke04.add.additio_vs_substituutio_ja_eliminaatio",
      "task.luokittelu"
    ],
    "expectedConcepts": [
      "Additio vs substituutio ja eliminaatio",
      "ke04.add.additio_vs_substituutio_ja_eliminaatio"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "addition_vs_substitution",
      "multiple_bond_change"
    ],
    "estimatedSeconds": 83,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Luokittelu"
  },
  {
    "seedKey": "ke04-v3:KE04-ADD-032",
    "contentId": "KE04-ADD-032",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Additio vs substituutio ja eliminaatio",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Missä reaktiotyypissä hiili-hiilisidoksen kertaluku yleensä pienenee 2→1?",
    "options": [
      "additio",
      "eliminaatio",
      "substituutio",
      "neutraloituminen"
    ],
    "correctAnswer": "additio",
    "explanation": "A, additio.",
    "scoring": "1 p.",
    "hints": [
      "C=C avautuu.",
      "Ryhmät liittyvät hiiliin."
    ],
    "skills": [
      "ke04.add.additio_vs_substituutio_ja_eliminaatio",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Additio vs substituutio ja eliminaatio",
      "ke04.add.additio_vs_substituutio_ja_eliminaatio"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.addition_vs_other"
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
    "seedKey": "ke04-v3:KE04-ADD-033",
    "contentId": "KE04-ADD-033",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Additio vs substituutio ja eliminaatio",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi reaktiotuotteiden lukumäärä ei yksin riitä erottamaan additiota substituutiosta?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Reaktiotyypit määritellään rakennemuutoksen perusteella. Additiossa ryhmät liittyvät moninkertaiseen sidokseen, substituutiossa yksi ryhmä korvautuu toisella; kummassakin tuotteita voi olla eri määrä riippuen kirjoitustavasta.",
    "scoring": "3 p.",
    "hints": [
      "Katso sidoksia ja ryhmien kohtaloa.",
      "Älä laske vain nuolen oikean puolen aineita."
    ],
    "skills": [
      "ke04.add.additio_vs_substituutio_ja_eliminaatio",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Additio vs substituutio ja eliminaatio",
      "ke04.add.additio_vs_substituutio_ja_eliminaatio"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "addition_vs_substitution",
      "multiple_bond_change"
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
    "seedKey": "ke04-v3:KE04-ADD-034",
    "contentId": "KE04-ADD-034",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Additio vs substituutio ja eliminaatio",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Väite: 'Jos tuotteessa on enemmän atomeja kuin orgaanisessa lähtöaineessa, reaktio on aina additio.' Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Ei välttämättä; atomit voivat tulla muista reagensseista myös muissa reaktiotyypeissä. Additio tunnistetaan erityisesti siitä, että ryhmiä liittyy moninkertaisen sidoksen atomeihin ja sidoksen kertaluku pienenee.",
    "scoring": "4 p: yleistyksen kumoaminen 1 p, muut reagenssit 1 p, moninkertainen sidos 1 p, kertaluku 1 p.",
    "hints": [
      "Reaktiotyyppi perustuu rakennemuutokseen.",
      "Etsi C=C→C–C."
    ],
    "skills": [
      "ke04.add.additio_vs_substituutio_ja_eliminaatio",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Additio vs substituutio ja eliminaatio",
      "ke04.add.additio_vs_substituutio_ja_eliminaatio"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.addition_vs_other"
    ],
    "estimatedSeconds": 194,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Virheen tunnistus"
  },
  {
    "seedKey": "ke04-v3:KE04-ADD-035",
    "contentId": "KE04-ADD-035",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Additio vs substituutio ja eliminaatio",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Aineessa on yksi C=C. Reaktion jälkeen C=C puuttuu ja molekyyliin on tullut kaksi uutta Cl-atomia ilman muiden atomien poistumista. Tunnista reaktio ja reagenssi.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kloorin additio; reagenssi Cl₂.",
    "scoring": "3 p: additio 1 p, Cl₂ 1 p, perustelu kahdella Cl:llä/C=C:n kulumisella 1 p.",
    "hints": [
      "Kaksi Cl-atomiin viittaa Cl₂:een.",
      "C=C kuluu ilman poistuvia ryhmiä."
    ],
    "skills": [
      "ke04.add.additio_vs_substituutio_ja_eliminaatio",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Additio vs substituutio ja eliminaatio",
      "ke04.add.additio_vs_substituutio_ja_eliminaatio"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "addition_vs_substitution",
      "multiple_bond_change"
    ],
    "estimatedSeconds": 271,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Soveltaminen"
  },
  {
    "seedKey": "ke04-v3:KE04-ADD-036",
    "contentId": "KE04-ADD-036",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Integroivat additiotehtävät",
    "questionType": "matching",
    "difficulty": 2,
    "prompt": "Yhdistä reagenssi ja eteenin tuote: H₂, Br₂, HCl, H₂O ↔ etaani, 1,2-dibromietaani, kloorietaani, etanoli.",
    "options": [],
    "correctAnswer": null,
    "explanation": "H₂→etaani; Br₂→1,2-dibromietaani; HCl→kloorietaani; H₂O→etanoli.",
    "scoring": "4 p, 1 p / pari.",
    "hints": [
      "H₂ kyllästää.",
      "H₂O antaa alkoholin."
    ],
    "skills": [
      "ke04.add.integroivat_additiotehtavat",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Integroivat additiotehtävät",
      "ke04.add.integroivat_additiotehtavat"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "addition_vs_substitution",
      "multiple_bond_change"
    ],
    "estimatedSeconds": 133,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "H₂",
        "right": "etaani"
      },
      {
        "left": "Br₂",
        "right": "1,2-dibromietaani"
      },
      {
        "left": "HCl",
        "right": "kloorietaani"
      },
      {
        "left": "H₂O",
        "right": "etanoli."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-ADD-037",
    "contentId": "KE04-ADD-037",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Integroivat additiotehtävät",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Mikä yhteinen rakenteellinen muutos tapahtuu kaikissa edellä mainituissa eteenin additioissa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Eteenin C=C muuttuu C–C-yksinkertaiseksi sidokseksi ja kumpikin kaksoissidoksen hiili muodostaa yhden uuden σ-sidoksen additoituvaan atomiin/ryhmään.",
    "scoring": "3 p: C=C→C–C 1 p, molemmat hiilet 1 p, uudet sidokset 1 p.",
    "hints": [
      "Reagenssi vaihtuu, hiilirungon perusmuutos ei.",
      "Katso kaksoissidosta."
    ],
    "skills": [
      "ke04.add.integroivat_additiotehtavat",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Integroivat additiotehtävät",
      "ke04.add.integroivat_additiotehtavat"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "addition_vs_substitution",
      "multiple_bond_change"
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
    "seedKey": "ke04-v3:KE04-ADD-038",
    "contentId": "KE04-ADD-038",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Integroivat additiotehtävät",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija nimeää eteenin + Br₂ -reaktion substituutioksi, koska 'bromi tulee molekyyliin'. Mikä ratkaisee oikean luokituksen?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Bromit liittyvät C=C-kaksoissidoksen kahdelle hiilelle eikä mikään ryhmä korvaudu; C=C→C–C, joten kyse on additiosta.",
    "scoring": "3 p.",
    "hints": [
      "Korvautuuko jokin ryhmä?",
      "Seuraa kaksoissidosta."
    ],
    "skills": [
      "ke04.add.integroivat_additiotehtavat",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Integroivat additiotehtävät",
      "ke04.add.integroivat_additiotehtavat"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.addition_vs_other",
      "organic.addition_atom_balance"
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
    "seedKey": "ke04-v3:KE04-ADD-039",
    "contentId": "KE04-ADD-039",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Integroivat additiotehtävät",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Tuntematon yhdiste reagoi Br₂:n kanssa 1:1 ja muuttuu tuotteeksi, jossa on kaksi Br-atomia enemmän mutta sama määrä C- ja H-atomeja. Mikä rakenteellinen piirre lähtöaineessa on todennäköinen?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Yksi C=C-kaksoissidos eli alkeenirakenne tässä perusmallissa.",
    "scoring": "3 p: C=C 2 p, yksi kaksoissidos/1:1 1 p.",
    "hints": [
      "Yksi Br₂ additoituu yhteen C=C:hen.",
      "C ja H eivät muutu."
    ],
    "skills": [
      "ke04.add.integroivat_additiotehtavat",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Integroivat additiotehtävät",
      "ke04.add.integroivat_additiotehtavat"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "addition_vs_substitution",
      "multiple_bond_change"
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
    "seedKey": "ke04-v3:KE04-ADD-040",
    "contentId": "KE04-ADD-040",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "Integroivat additiotehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "Eteeni reagoi erikseen H₂:n, Br₂:n, HCl:n ja H₂O:n kanssa. a) Kirjoita kunkin reaktion orgaaninen tuote tiivistetyllä rakennekaavalla. b) Nimeä kunkin tuotteen yhdistetyyppi. c) Kuvaa yksi yhteinen rakennemuutos, joka tapahtuu kaikissa neljässä reaktiossa. d) Valitse yksi reaktioista ja osoita atomitase.",
    "options": [],
    "correctAnswer": null,
    "explanation": "H₂: CH₃CH₃, alkaani. Br₂: BrCH₂CH₂Br, dihalogeenialkaani. HCl: CH₃CH₂Cl, halogeenialkaani. H₂O: CH₃CH₂OH, alkoholi. Kaikissa C=C muuttuu C–C-yksinkertaiseksi sidokseksi ja kaksoissidoksen hiiliin muodostuu uusia sidoksia. Atomitase voidaan osoittaa mille tahansa neljästä tasapainotetusta reaktiosta.",
    "scoring": "12 p: neljä oikeaa rakennetuotetta 4 p, neljä oikeaa tuoteluokkaa 4 p, yhteinen C=C→C–C-rakennemuutos 2 p, yhden reaktion atomitase 2 p.",
    "hints": [
      "Pilko kukin reagenssi osiin, jotka liittyvät kaksoissidoksen kahdelle hiilelle.",
      "Tarkista jokaisessa, mitä C=C-sidokselle tapahtuu.",
      "Atomitaseessa laske jokaisen alkuaineen atomit ennen ja jälkeen."
    ],
    "skills": [
      "addition.product_prediction",
      "structural_formula",
      "product_classification",
      "atom_balance"
    ],
    "expectedConcepts": [
      "Integroivat additiotehtävät",
      "addition.product_prediction",
      "structural_formula",
      "product_classification",
      "atom_balance"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "addition_vs_substitution",
      "multiple_bond_change"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 12,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Integroiva vertailu"
  },
  {
    "seedKey": "ke04-v3:KE04-ADD-X01",
    "contentId": "KE04-ADD-X01",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Bromiliuoksen väri häviää nopeasti, kun siihen johdetaan eteeniä, mutta ei vastaavassa kokeessa etaanilla. Selitä havainto rakenteiden avulla ja kirjoita eteenin additiotuote Br₂:n kanssa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Eteenissä on C=C-kaksoissidos, joka additoi Br₂:n; etaanissa ei ole vastaavaa moninkertaista sidosta. Tuote on BrCH₂CH₂Br, 1,2-dibromietaani.",
    "scoring": "6 p: C=C 2 p; etaanivertailu 1 p; additio 1 p; tuote 2 p.",
    "hints": [
      "Etsi ero C=C vs C–C.",
      "Yksi Br kummallekin kaksoissidoksen hiilelle",
      "Perustele päätelmä yhdistämällä havainto tai mittaus suoraan kemialliseen malliin.."
    ],
    "skills": [
      "addition.bromine_test",
      "structure_reactivity"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "addition.bromine_test",
      "structure_reactivity"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "addition_vs_substitution",
      "multiple_bond_change"
    ],
    "estimatedSeconds": 309,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 6,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Kokeellinen tulkinta"
  },
  {
    "seedKey": "ke04-v3:KE04-ADD-X02",
    "contentId": "KE04-ADD-X02",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "multiple_choice",
    "difficulty": 4,
    "prompt": "Propeeni reagoi H₂:n kanssa. Mikä kuvaa muutosta oikein?",
    "options": [
      "CH₃CH=CH₂→CH₃CH₂CH₃",
      "CH₃CH=CH₂→CH₃CH₂CH₂OH",
      "CH₃CH=CH₂→CH₃C≡CH",
      "CH₃CH=CH₂→CH₂=CH₂+CH₄"
    ],
    "correctAnswer": "CH₃CH=CH₂→CH₃CH₂CH₃",
    "explanation": "A, propaani.",
    "scoring": "3 p: A 1 p; C=C→C–C 1 p; H₂:n liittyminen 1 p.",
    "hints": [
      "Hydraus lisää H:n kummallekin C=C-hiilelle.",
      "Kaksoissidos kyllästyy",
      "Sulje pois vaihtoehdot vertaamalla jokaista niistä reaktioyhtälöön, rakenteeseen tai määritelmään.."
    ],
    "skills": [
      "addition.hydrogenation"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "addition.hydrogenation"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "wrong_product_class"
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
    "seedKey": "ke04-v3:KE04-ADD-X03",
    "contentId": "KE04-ADD-X03",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "calculation",
    "difficulty": 4,
    "prompt": "0,250 mol eteeniä additoi Br₂:ta täydellisesti reaktiossa C₂H₄+Br₂→C₂H₄Br₂. Kuinka monta moolia Br₂:ta tarvitaan ja kuinka monta moolia tuotetta muodostuu?",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,250 mol Br₂ ja 0,250 mol C₂H₄Br₂, koska suhde on 1:1:1.",
    "scoring": "4 p: Br₂ 2 p; tuote 2 p.",
    "hints": [
      "Lue kertoimet.",
      "Kaikki ovat 1",
      "Kirjoita välivaiheet näkyviin ja tarkista lopuksi yksiköt sekä tuloksen suuruusluokka.."
    ],
    "skills": [
      "addition.stoichiometry"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "addition.stoichiometry"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "addition_vs_substitution",
      "multiple_bond_change"
    ],
    "estimatedSeconds": 221,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Stoikiometria"
  },
  {
    "seedKey": "ke04-v3:KE04-ADD-X04",
    "contentId": "KE04-ADD-X04",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "short_answer",
    "difficulty": 4,
    "prompt": "Täydennä tiivistetty reaktio: CH₂=CH₂ + H₂O → ? ja nimeä tuotelaji sekä reaktiotyyppi.",
    "options": [],
    "correctAnswer": null,
    "explanation": "CH₃CH₂OH, etanoli; tuotelaji alkoholi, reaktiotyyppi additio/hydraatio.",
    "scoring": "6 p: rakenne 2 p; etanoli 1 p; alkoholi 1 p; additio 2 p.",
    "hints": [
      "H₂O antaa H:n ja OH:n.",
      "C=C muuttuu C–C:ksi",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "addition.hydration",
      "structural_formula"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "addition.hydration",
      "structural_formula"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "addition_vs_substitution",
      "multiple_bond_change"
    ],
    "estimatedSeconds": 154,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 6,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Rakennekaava"
  },
  {
    "seedKey": "ke04-v3:KE04-ADD-X05",
    "contentId": "KE04-ADD-X05",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "error_detection",
    "difficulty": 5,
    "prompt": "Opiskelija kirjoittaa eteenin bromin additiossa tuotteeksi CH₃CH₂Br. Osoita atomitaseen ja rakennemuutoksen avulla kaksi virhettä.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Br₂:n kaksi Br-atomia eivät säily tuotteessa ja tuotteeseen on ilmestynyt ylimääräisiä H-atomeja. Oikea tuote on BrCH₂CH₂Br, jossa C=C→C–C ja molemmat Br:t liittyvät.",
    "scoring": "6 p: Br-tase 2 p; H-tase 2 p; oikea tuote/rakennemuutos 2 p.",
    "hints": [
      "Laske Br ennen ja jälkeen.",
      "Reagenssi Br₂ ei tuo vetyä",
      "Nimeä ensin väärä kemiallinen periaate ja vasta sitten sen vaikutus lopputulokseen.."
    ],
    "skills": [
      "addition.atom_balance",
      "structural_reasoning"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "addition.atom_balance",
      "structural_reasoning"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "one_halogen_only",
      "invented_hydrogen"
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
    "seedKey": "ke04-v3:KE04-ADD-X06",
    "contentId": "KE04-ADD-X06",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "application",
    "difficulty": 5,
    "prompt": "Tuntematon hiilivety X kuluttaa 0,100 mol näytteeseen 0,100 mol Br₂:ta ja tuotteessa hiili- ja vetymäärä ovat samat kuin X:ssä mutta Br-atomeja on kaksi enemmän per molekyyli. Mitä rakenteellista piirrettä tieto tukee?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Yksi additoituva C=C-kaksoissidos per X-molekyyli. 1:1 Br₂-kulutus ja kahden Br:n liittyminen sopivat yhden kaksoissidoksen additioon.",
    "scoring": "5 p: yksi C=C 2 p; 1:1 perustelu 2 p; kahden Br:n yhteys 1 p.",
    "hints": [
      "Yksi Br₂ reagoi yhden C=C:n kanssa.",
      "Molemmat Br:t jäävät tuotteeseen",
      "Perustele päätelmä yhdistämällä havainto tai mittaus suoraan kemialliseen malliin.."
    ],
    "skills": [
      "addition.unsaturation_test",
      "mole_ratio"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "addition.unsaturation_test",
      "mole_ratio"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "addition_vs_substitution",
      "multiple_bond_change"
    ],
    "estimatedSeconds": 347,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 5,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Aineistopäättely"
  },
  {
    "seedKey": "ke04-v3:KE04-ADD-X07",
    "contentId": "KE04-ADD-X07",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "Eteenille tehdään neljä erillistä reaktiota: H₂, Br₂, HCl ja H₂O. Kirjoita kunkin orgaaninen tuote tiivistetyllä rakennekaavalla ja nimeä tuotelaji. Mikä yhteinen muutos C=C-sidokselle tapahtuu kaikissa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "H₂→CH₃CH₃ alkaani; Br₂→BrCH₂CH₂Br dihalogeenialkaani; HCl→CH₃CH₂Cl halogeenialkaani; H₂O→CH₃CH₂OH alkoholi. Kaikissa C=C muuttuu C–C:ksi.",
    "scoring": "12 p: neljä tuotetta 8 p; neljä tuotelajia 2 p; yhteinen muutos 2 p.",
    "hints": [
      "Pilko reagenssi kahteen osaan.",
      "Yksi osa kummallekin C=C-hiilelle",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "addition.product_prediction",
      "reaction_family",
      "structural_formula"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "addition.product_prediction",
      "reaction_family",
      "structural_formula"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "addition_vs_substitution",
      "multiple_bond_change"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 12,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Koereservi – reaktioperhe"
  },
  {
    "seedKey": "ke04-v3:KE04-ADD-X08",
    "contentId": "KE04-ADD-X08",
    "chapter": 10,
    "topicName": "Additioreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "5,60 g eteeniä C₂H₄ (M=28,0 g/mol) additoi Br₂:ta täydellisesti. a) Laske n(eteeni). b) Laske tarvittava n(Br₂). c) M(Br₂)=159,8 g/mol: laske tarvittava Br₂-massa. d) Selitä, miksi tuotteen massa on lähtöeteenin massaa suurempi.",
    "options": [],
    "correctAnswer": null,
    "explanation": "n=5,60/28,0=0,200 mol. Br₂=0,200 mol. m(Br₂)=31,96 g≈32,0 g. Tuotteen massa kasvaa, koska Br₂:n atomit liittyvät eteeniin; kokonaismassa säilyy, kun kaikki reagenssit huomioidaan.",
    "scoring": "10 p: n 2 p; Br₂-molit 2 p; Br₂-massa 3 p; massan säilymisperustelu 3 p.",
    "hints": [
      "Reaktio 1:1.",
      "m=nM.",
      "Tuote sisältää myös bromin massan."
    ],
    "skills": [
      "addition.stoichiometry",
      "mass",
      "conservation"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "addition.stoichiometry",
      "mass",
      "conservation"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "addition_vs_substitution",
      "multiple_bond_change"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 10,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Koereservi – kvantitatiivinen"
  }
];
