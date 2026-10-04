import type { Ke04SeedQuestion } from "./types";

export const questions: Ke04SeedQuestion[] = [
  {
    "seedKey": "ke04-v3:KE04-SUB-001",
    "contentId": "KE04-SUB-001",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Substituution perusidea",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitä substituutioreaktiossa tapahtuu orgaanisessa molekyylissä?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Yksi atomi tai atomiryhmä korvautuu toisella atomilla tai ryhmällä.",
    "scoring": "2 p: korvautuminen 2 p.",
    "hints": [
      "Substituutio = korvaaminen.",
      "Jokin lähtee ja jokin tulee tilalle."
    ],
    "skills": [
      "ke04.sub.substituution_perusidea",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Substituution perusidea",
      "ke04.sub.substituution_perusidea"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
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
    "seedKey": "ke04-v3:KE04-SUB-002",
    "contentId": "KE04-SUB-002",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Substituution perusidea",
    "questionType": "multiple_choice",
    "difficulty": 1,
    "prompt": "Mikä reaktio on substituutio?",
    "options": [
      "CH₃CH₂Br → CH₃CH₂OH",
      "CH₂=CH₂ + Br₂ → BrCH₂CH₂Br",
      "CH₃CH₂OH → CH₂=CH₂ + H₂O",
      "CH₄ + 2O₂ → CO₂ + 2H₂O"
    ],
    "correctAnswer": "CH₃CH₂Br → CH₃CH₂OH",
    "explanation": "A.",
    "scoring": "1 p.",
    "hints": [
      "Etsi ryhmä, joka vaihtuu toiseen.",
      "Br vaihtuu OH:ksi."
    ],
    "skills": [
      "ke04.sub.substituution_perusidea",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Substituution perusidea",
      "ke04.sub.substituution_perusidea"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.substitution_vs_other"
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
    "seedKey": "ke04-v3:KE04-SUB-003",
    "contentId": "KE04-SUB-003",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Substituution perusidea",
    "questionType": "matching",
    "difficulty": 2,
    "prompt": "Yhdistä reaktiotyyppi ja muutos: substituutio, additio, eliminaatio ↔ ryhmä vaihtuu; ryhmiä liittyy C=C:hen; ryhmiä poistuu ja C=C syntyy.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Substituutio → ryhmä vaihtuu; additio → ryhmiä liittyy C=C:hen; eliminaatio → ryhmiä poistuu ja C=C syntyy.",
    "scoring": "3 p, 1 p / pari.",
    "hints": [
      "Korvaaminen, lisääminen, poistaminen.",
      "Nimet kertovat paljon."
    ],
    "skills": [
      "ke04.sub.substituution_perusidea",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Substituution perusidea",
      "ke04.sub.substituution_perusidea"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
    ],
    "estimatedSeconds": 133,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "Substituutio",
        "right": "ryhmä vaihtuu"
      },
      {
        "left": "additio",
        "right": "ryhmiä liittyy C=C:hen"
      },
      {
        "left": "eliminaatio",
        "right": "ryhmiä poistuu ja C=C syntyy."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-SUB-004",
    "contentId": "KE04-SUB-004",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Substituution perusidea",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Mikä havainto tuotteessa auttaa erottamaan substituution eliminaatiosta, jos lähtöaine on halogeenialkaani?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Substituutiossa halogeeni korvautuu toisella ryhmällä eikä uutta C=C:tä välttämättä synny; eliminaatiossa halogeenin ja viereisen H:n poistuminen muodostaa C=C:n.",
    "scoring": "3 p: korvautuminen 1 p, eliminaation C=C 1 p, vertailu 1 p.",
    "hints": [
      "Katso kaksoissidosta.",
      "Katso tuliko uusi ryhmä halogeenin tilalle."
    ],
    "skills": [
      "ke04.sub.substituution_perusidea",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Substituution perusidea",
      "ke04.sub.substituution_perusidea"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
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
    "seedKey": "ke04-v3:KE04-SUB-005",
    "contentId": "KE04-SUB-005",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Substituution perusidea",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Väite: 'Substituutiossa orgaanisen molekyylin hiilirunko aina kasvaa yhdellä hiilellä.' Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Substituutiossa korvautuu atomi tai ryhmä; hiilirungon ei tarvitse kasvaa lainkaan. Esimerkiksi bromietaanissa Br voidaan korvata OH:lla hiilimäärän säilyessä samana.",
    "scoring": "3 p: väitteen kumoaminen 1 p, hiilirunko voi säilyä 1 p, esimerkki 1 p.",
    "hints": [
      "Tarkastele bromietaani → etanoli.",
      "Laske hiilet."
    ],
    "skills": [
      "ke04.sub.substituution_perusidea",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Substituution perusidea",
      "ke04.sub.substituution_perusidea"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.substitution_vs_other"
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
    "seedKey": "ke04-v3:KE04-SUB-006",
    "contentId": "KE04-SUB-006",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Halogeenialkaanin OH-substituutio",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mikä funktionaalinen ryhmä syntyy, kun halogeenialkaanin halogeeni korvataan OH-ryhmällä?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Hydroksyyliryhmä; tuotteena on alkoholi.",
    "scoring": "2 p: OH 1 p, alkoholi 1 p.",
    "hints": [
      "OH määrittää alkoholiryhmän.",
      "Halogeeni lähtee."
    ],
    "skills": [
      "ke04.sub.halogeenialkaanin_oh_substituutio",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Halogeenialkaanin OH-substituutio",
      "ke04.sub.halogeenialkaanin_oh_substituutio"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
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
    "seedKey": "ke04-v3:KE04-SUB-007",
    "contentId": "KE04-SUB-007",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Halogeenialkaanin OH-substituutio",
    "questionType": "short_answer",
    "difficulty": 2,
    "prompt": "Kirjoita bromietaanin muuttuminen etanoliksi substituutiossa yksinkertaistetusti.",
    "options": [],
    "correctAnswer": null,
    "explanation": "CH₃CH₂Br + OH⁻ → CH₃CH₂OH + Br⁻.",
    "scoring": "4 p: bromietaani 1 p, OH⁻ 1 p, etanoli 1 p, Br⁻ 1 p.",
    "hints": [
      "Br korvautuu OH:lla.",
      "Poistuva Br voi esiintyä bromidi-ionina."
    ],
    "skills": [
      "ke04.sub.halogeenialkaanin_oh_substituutio",
      "task.reaktio"
    ],
    "expectedConcepts": [
      "Halogeenialkaanin OH-substituutio",
      "ke04.sub.halogeenialkaanin_oh_substituutio"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
    ],
    "estimatedSeconds": 117,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Reaktio"
  },
  {
    "seedKey": "ke04-v3:KE04-SUB-008",
    "contentId": "KE04-SUB-008",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Halogeenialkaanin OH-substituutio",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "1-klooripropaanin Cl korvataan OH:lla. Mikä orgaaninen tuote?",
    "options": [
      "propan-1-oli",
      "propeeni",
      "propaani",
      "propaanihappo"
    ],
    "correctAnswer": "propan-1-oli",
    "explanation": "A, propan-1-oli.",
    "scoring": "1 p.",
    "hints": [
      "Sama hiilirunko.",
      "Cl:n paikalle OH."
    ],
    "skills": [
      "ke04.sub.halogeenialkaanin_oh_substituutio",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Halogeenialkaanin OH-substituutio",
      "ke04.sub.halogeenialkaanin_oh_substituutio"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.substitution_vs_other"
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
    "seedKey": "ke04-v3:KE04-SUB-009",
    "contentId": "KE04-SUB-009",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Halogeenialkaanin OH-substituutio",
    "questionType": "short_answer",
    "difficulty": 3,
    "prompt": "2-bromipropaanissa Br korvautuu OH:lla. Nimeä tuote.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Propan-2-oli.",
    "scoring": "2 p.",
    "hints": [
      "OH tulee samaan hiileen, jossa Br oli.",
      "Kolmen hiilen alkoholi, OH hiilessä 2."
    ],
    "skills": [
      "ke04.sub.halogeenialkaanin_oh_substituutio",
      "task.rakennetulkinta"
    ],
    "expectedConcepts": [
      "Halogeenialkaanin OH-substituutio",
      "ke04.sub.halogeenialkaanin_oh_substituutio"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
    ],
    "estimatedSeconds": 135,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Rakennetulkinta"
  },
  {
    "seedKey": "ke04-v3:KE04-SUB-010",
    "contentId": "KE04-SUB-010",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Halogeenialkaanin OH-substituutio",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija muuttaa CH₃CH₂Br:n OH-substituutiossa eteeniksi. Mikä reaktiotyyppi hän on käytännössä piirtänyt?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Eliminaation, koska eteenin muodostuminen vaatii H:n ja Br:n poistumista sekä C=C:n syntymistä. Substituutiossa oikea orgaaninen tuote olisi etanoli.",
    "scoring": "3 p: eliminaatio 1 p, C=C/perustelu 1 p, etanoli 1 p.",
    "hints": [
      "Eteeni sisältää C=C.",
      "Substituutiossa Br:n tilalle tulee OH."
    ],
    "skills": [
      "ke04.sub.halogeenialkaanin_oh_substituutio",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Halogeenialkaanin OH-substituutio",
      "ke04.sub.halogeenialkaanin_oh_substituutio"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.substitution_vs_other",
      "organic.substitution_vs_elimination"
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
    "seedKey": "ke04-v3:KE04-SUB-011",
    "contentId": "KE04-SUB-011",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Halogeenin substituutio alkaaniin",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitä tapahtuu alkaanin vetyatomille halogeenisubstituutiossa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Vety korvautuu halogeeniatomilla.",
    "scoring": "2 p.",
    "hints": [
      "Substituutio = korvaaminen.",
      "Halogeeni tulee H:n tilalle."
    ],
    "skills": [
      "ke04.sub.halogeenin_substituutio_alkaaniin",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Halogeenin substituutio alkaaniin",
      "ke04.sub.halogeenin_substituutio_alkaaniin"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
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
    "seedKey": "ke04-v3:KE04-SUB-012",
    "contentId": "KE04-SUB-012",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Halogeenin substituutio alkaaniin",
    "questionType": "short_answer",
    "difficulty": 2,
    "prompt": "Kirjoita metaanin yksinkertainen kloorisubstituutio.",
    "options": [],
    "correctAnswer": null,
    "explanation": "CH₄ + Cl₂ → CH₃Cl + HCl.",
    "scoring": "4 p: CH₄ 1 p, Cl₂ 1 p, CH₃Cl 1 p, HCl 1 p.",
    "hints": [
      "Yksi H korvataan Cl:lla.",
      "Jäljelle jäävä H ja toinen Cl muodostavat HCl:n."
    ],
    "skills": [
      "ke04.sub.halogeenin_substituutio_alkaaniin",
      "task.reaktio"
    ],
    "expectedConcepts": [
      "Halogeenin substituutio alkaaniin",
      "ke04.sub.halogeenin_substituutio_alkaaniin"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
    ],
    "estimatedSeconds": 117,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Reaktio"
  },
  {
    "seedKey": "ke04-v3:KE04-SUB-013",
    "contentId": "KE04-SUB-013",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Halogeenin substituutio alkaaniin",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Kun yksi metaanin H korvautuu Br:lla, orgaaninen tuote on",
    "options": [
      "bromimetaani",
      "dibromimetaani",
      "metanoli",
      "metaanihappo"
    ],
    "correctAnswer": "bromimetaani",
    "explanation": "A, bromimetaani.",
    "scoring": "1 p.",
    "hints": [
      "Vain yksi H korvautuu.",
      "CH₃Br."
    ],
    "skills": [
      "ke04.sub.halogeenin_substituutio_alkaaniin",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Halogeenin substituutio alkaaniin",
      "ke04.sub.halogeenin_substituutio_alkaaniin"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.substitution_vs_other"
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
    "seedKey": "ke04-v3:KE04-SUB-014",
    "contentId": "KE04-SUB-014",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Halogeenin substituutio alkaaniin",
    "questionType": "short_answer",
    "difficulty": 3,
    "prompt": "Tarkista CH₄ + Cl₂ → CH₃Cl + HCl atomitasapaino.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Vasemmalla C₁H₄Cl₂; oikealla CH₃Cl + HCl = C₁H₄Cl₂. Tasapainossa.",
    "scoring": "3 p: C, H, Cl oikein.",
    "hints": [
      "Laske jokainen alkuaine.",
      "Muista HCl:n Cl."
    ],
    "skills": [
      "ke04.sub.halogeenin_substituutio_alkaaniin",
      "task.atomitasapaino"
    ],
    "expectedConcepts": [
      "Halogeenin substituutio alkaaniin",
      "ke04.sub.halogeenin_substituutio_alkaaniin"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
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
    "seedKey": "ke04-v3:KE04-SUB-015",
    "contentId": "KE04-SUB-015",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Halogeenin substituutio alkaaniin",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Etanissa yksi vety korvautuu kloorilla. Mikä on orgaanisen tuotteen molekyylikaava ja nimi?",
    "options": [],
    "correctAnswer": null,
    "explanation": "C₂H₅Cl, kloorietaani.",
    "scoring": "3 p: kaava 2 p, nimi 1 p.",
    "hints": [
      "Etani on C₂H₆.",
      "Korvaa yksi H yhdellä Cl:lla."
    ],
    "skills": [
      "ke04.sub.halogeenin_substituutio_alkaaniin",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Halogeenin substituutio alkaaniin",
      "ke04.sub.halogeenin_substituutio_alkaaniin"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
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
    "seedKey": "ke04-v3:KE04-SUB-016",
    "contentId": "KE04-SUB-016",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Useampi substituutio ja atomien kirjanpito",
    "questionType": "application",
    "difficulty": 2,
    "prompt": "Metaanissa kaksi vetyä korvataan klooriatomeilla. Mikä orgaanisen tuotteen molekyylikaava?",
    "options": [],
    "correctAnswer": null,
    "explanation": "CH₂Cl₂.",
    "scoring": "2 p.",
    "hints": [
      "Lähtöaine CH₄.",
      "Kaksi H pois, kaksi Cl tilalle."
    ],
    "skills": [
      "ke04.sub.useampi_substituutio_ja_atomien_kirjanpito",
      "task.laskennallinen_paattely"
    ],
    "expectedConcepts": [
      "Useampi substituutio ja atomien kirjanpito",
      "ke04.sub.useampi_substituutio_ja_atomien_kirjanpito"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
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
    "seedKey": "ke04-v3:KE04-SUB-017",
    "contentId": "KE04-SUB-017",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Useampi substituutio ja atomien kirjanpito",
    "questionType": "recognition",
    "difficulty": 2,
    "prompt": "Nimeä CH₂Cl₂.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Dikloorimetaani.",
    "scoring": "2 p.",
    "hints": [
      "Yksi hiili → metaani.",
      "Kaksi klooria → di-kloori."
    ],
    "skills": [
      "ke04.sub.useampi_substituutio_ja_atomien_kirjanpito",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Useampi substituutio ja atomien kirjanpito",
      "ke04.sub.useampi_substituutio_ja_atomien_kirjanpito"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
    ],
    "estimatedSeconds": 83,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Tunnistus"
  },
  {
    "seedKey": "ke04-v3:KE04-SUB-018",
    "contentId": "KE04-SUB-018",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Useampi substituutio ja atomien kirjanpito",
    "questionType": "short_answer",
    "difficulty": 3,
    "prompt": "Jos kaksi peräkkäistä kloorisubstituutiota tapahtuu metaanille, kuinka monta HCl-molekyyliä syntyy yhtä CH₂Cl₂-molekyyliä kohti ideaalissa kokonaisreaktiossa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kaksi HCl-molekyyliä.",
    "scoring": "2 p: 2 1 p, yksi HCl/substituutio 1 p.",
    "hints": [
      "Jokaisessa substituutiossa yksi H poistuu.",
      "Se yhdistyy klooriin HCl:ksi."
    ],
    "skills": [
      "ke04.sub.useampi_substituutio_ja_atomien_kirjanpito",
      "task.atomitasapaino"
    ],
    "expectedConcepts": [
      "Useampi substituutio ja atomien kirjanpito",
      "ke04.sub.useampi_substituutio_ja_atomien_kirjanpito"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
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
    "seedKey": "ke04-v3:KE04-SUB-019",
    "contentId": "KE04-SUB-019",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Useampi substituutio ja atomien kirjanpito",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija kirjoittaa CH₄ + 2Cl₂ → CH₂Cl₂ + HCl. Mikä kerroin on väärin?",
    "options": [],
    "correctAnswer": null,
    "explanation": "HCl:n kertoimen tulee olla 2: CH₄ + 2Cl₂ → CH₂Cl₂ + 2HCl.",
    "scoring": "3 p: HCl=2 1 p, oikea yhtälö 2 p.",
    "hints": [
      "Laske H ja Cl oikealta.",
      "Kaksi H on korvattu."
    ],
    "skills": [
      "ke04.sub.useampi_substituutio_ja_atomien_kirjanpito",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Useampi substituutio ja atomien kirjanpito",
      "ke04.sub.useampi_substituutio_ja_atomien_kirjanpito"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.substitution_vs_other"
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
    "seedKey": "ke04-v3:KE04-SUB-020",
    "contentId": "KE04-SUB-020",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Useampi substituutio ja atomien kirjanpito",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Propaanin molekyylikaava on C₃H₈. Kolme H-atomia korvataan Br-atomeilla. Mikä on tuotteen molekyylikaava riippumatta isomeeristä?",
    "options": [],
    "correctAnswer": null,
    "explanation": "C₃H₅Br₃.",
    "scoring": "2 p.",
    "hints": [
      "Vähennä kolme H:ta.",
      "Lisää kolme Br:ta."
    ],
    "skills": [
      "ke04.sub.useampi_substituutio_ja_atomien_kirjanpito",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Useampi substituutio ja atomien kirjanpito",
      "ke04.sub.useampi_substituutio_ja_atomien_kirjanpito"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
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
    "seedKey": "ke04-v3:KE04-SUB-021",
    "contentId": "KE04-SUB-021",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Alkoholin OH-ryhmän korvautuminen",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Jos alkoholin OH-ryhmä korvataan halogeenilla, mihin yhdisteryhmään tuote kuuluu?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Halogeenialkaaneihin.",
    "scoring": "2 p.",
    "hints": [
      "OH poistuu.",
      "Hiilirunkoon jää halogeeni."
    ],
    "skills": [
      "ke04.sub.alkoholin_oh_ryhman_korvautuminen",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Alkoholin OH-ryhmän korvautuminen",
      "ke04.sub.alkoholin_oh_ryhman_korvautuminen"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
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
    "seedKey": "ke04-v3:KE04-SUB-022",
    "contentId": "KE04-SUB-022",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Alkoholin OH-ryhmän korvautuminen",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Etanolissa OH korvataan Cl:lla. Mikä orgaaninen tuote?",
    "options": [
      "kloorietaani",
      "eteeni",
      "etaanihappo",
      "etyylietanaatti"
    ],
    "correctAnswer": "kloorietaani",
    "explanation": "A, kloorietaani.",
    "scoring": "1 p.",
    "hints": [
      "Sama C₂-runko.",
      "OH → Cl."
    ],
    "skills": [
      "ke04.sub.alkoholin_oh_ryhman_korvautuminen",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Alkoholin OH-ryhmän korvautuminen",
      "ke04.sub.alkoholin_oh_ryhman_korvautuminen"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.substitution_vs_other",
      "organic.substitution_vs_elimination"
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
    "seedKey": "ke04-v3:KE04-SUB-023",
    "contentId": "KE04-SUB-023",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Alkoholin OH-ryhmän korvautuminen",
    "questionType": "short_answer",
    "difficulty": 2,
    "prompt": "Propan-2-olissa OH korvataan Br:lla. Nimeä tuote.",
    "options": [],
    "correctAnswer": null,
    "explanation": "2-bromipropaani.",
    "scoring": "2 p.",
    "hints": [
      "Br tulee samaan hiileen.",
      "OH oli hiilessä 2."
    ],
    "skills": [
      "ke04.sub.alkoholin_oh_ryhman_korvautuminen",
      "task.rakennetulkinta"
    ],
    "expectedConcepts": [
      "Alkoholin OH-ryhmän korvautuminen",
      "ke04.sub.alkoholin_oh_ryhman_korvautuminen"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
    ],
    "estimatedSeconds": 117,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Rakennetulkinta"
  },
  {
    "seedKey": "ke04-v3:KE04-SUB-024",
    "contentId": "KE04-SUB-024",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Alkoholin OH-ryhmän korvautuminen",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Miten etanolin OH→Cl-substituutio eroaa etanolin eliminaatiosta rakenteellisesti?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Substituutiossa OH korvautuu Cl:lla ja C–C säilyy yksinkertaisena; eliminaatiossa OH ja viereinen H poistuvat ja C=C syntyy.",
    "scoring": "4 p: substituution muutos 2 p, eliminaation muutos 2 p.",
    "hints": [
      "Katso C–C/C=C.",
      "Korvautuuko vai poistuuko OH?"
    ],
    "skills": [
      "ke04.sub.alkoholin_oh_ryhman_korvautuminen",
      "task.vertailu"
    ],
    "expectedConcepts": [
      "Alkoholin OH-ryhmän korvautuminen",
      "ke04.sub.alkoholin_oh_ryhman_korvautuminen"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
    ],
    "estimatedSeconds": 271,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Vertailu"
  },
  {
    "seedKey": "ke04-v3:KE04-SUB-025",
    "contentId": "KE04-SUB-025",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Alkoholin OH-ryhmän korvautuminen",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Väite: 'Kun etanolista tehdään kloorietaania, hiilten väliin syntyy kaksoissidos.' Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kloorietaanissa hiilien välillä on edelleen yksinkertainen sidos. Reaktiossa OH korvautuu Cl:lla; kaksoissidoksen syntyminen viittaisi eliminaatioon.",
    "scoring": "3 p: C–C säilyy 1 p, OH→Cl 1 p, eliminaatioviittaus 1 p.",
    "hints": [
      "Piirrä etanoli ja kloorietaani.",
      "Hiilirunko ei muutu."
    ],
    "skills": [
      "ke04.sub.alkoholin_oh_ryhman_korvautuminen",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Alkoholin OH-ryhmän korvautuminen",
      "ke04.sub.alkoholin_oh_ryhman_korvautuminen"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.substitution_vs_other",
      "organic.substitution_vs_elimination"
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
    "seedKey": "ke04-v3:KE04-SUB-026",
    "contentId": "KE04-SUB-026",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Substituution tunnistaminen rakennekaavoista",
    "questionType": "recognition",
    "difficulty": 2,
    "prompt": "CH₃CH₂Cl → CH₃CH₂NH₂, kun Cl korvautuu NH₂-ryhmällä. Mikä reaktiotyyppi?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Substituutio.",
    "scoring": "1 p.",
    "hints": [
      "Cl lähtee.",
      "NH₂ tulee samaan paikkaan."
    ],
    "skills": [
      "ke04.sub.substituution_tunnistaminen_rakennekaavoista",
      "task.luokittelu"
    ],
    "expectedConcepts": [
      "Substituution tunnistaminen rakennekaavoista",
      "ke04.sub.substituution_tunnistaminen_rakennekaavoista"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
    ],
    "estimatedSeconds": 83,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 1,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Luokittelu"
  },
  {
    "seedKey": "ke04-v3:KE04-SUB-027",
    "contentId": "KE04-SUB-027",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Substituution tunnistaminen rakennekaavoista",
    "questionType": "recognition",
    "difficulty": 2,
    "prompt": "CH₃CH₂OH → CH₃CH₂Br, kun OH korvautuu Br:lla. Mikä reaktiotyyppi?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Substituutio.",
    "scoring": "1 p.",
    "hints": [
      "Yksi ryhmä vaihtuu toiseen.",
      "C–C ei muutu."
    ],
    "skills": [
      "ke04.sub.substituution_tunnistaminen_rakennekaavoista",
      "task.luokittelu"
    ],
    "expectedConcepts": [
      "Substituution tunnistaminen rakennekaavoista",
      "ke04.sub.substituution_tunnistaminen_rakennekaavoista"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
    ],
    "estimatedSeconds": 83,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 1,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Luokittelu"
  },
  {
    "seedKey": "ke04-v3:KE04-SUB-028",
    "contentId": "KE04-SUB-028",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Substituution tunnistaminen rakennekaavoista",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi reaktiota CH₂=CH₂ + HCl → CH₃CH₂Cl ei luokitella substituutioksi, vaikka tuotteessa on Cl?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Koska mitään lähtöaineen ryhmää ei korvata; H ja Cl liittyvät C=C-kaksoissidoksen hiiliin ja C=C muuttuu C–C:ksi. Se on additio.",
    "scoring": "3 p: ei korvautumista 1 p, C=C→C–C 1 p, additio 1 p.",
    "hints": [
      "Katso mitä poistuu.",
      "Jos mitään ei korvata, ei substituutio."
    ],
    "skills": [
      "ke04.sub.substituution_tunnistaminen_rakennekaavoista",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Substituution tunnistaminen rakennekaavoista",
      "ke04.sub.substituution_tunnistaminen_rakennekaavoista"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
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
    "seedKey": "ke04-v3:KE04-SUB-029",
    "contentId": "KE04-SUB-029",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Substituution tunnistaminen rakennekaavoista",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija luokittelee kaikki halogeeneja sisältävät reaktiot substituutioiksi. Anna vastaesimerkki.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Esim. eteenin + Br₂ → 1,2-dibromietaani on additio: Br₂ liittyy C=C:hen eikä korvaa atomia.",
    "scoring": "3 p: oikea vastaesimerkki 2 p, perustelu 1 p.",
    "hints": [
      "Alkeenit additoivat halogeeneja.",
      "Etsi C=C."
    ],
    "skills": [
      "ke04.sub.substituution_tunnistaminen_rakennekaavoista",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Substituution tunnistaminen rakennekaavoista",
      "ke04.sub.substituution_tunnistaminen_rakennekaavoista"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.substitution_vs_other"
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
    "seedKey": "ke04-v3:KE04-SUB-030",
    "contentId": "KE04-SUB-030",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Substituution tunnistaminen rakennekaavoista",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Lähtöaineessa on C–Br. Tuotteessa sama hiilirunko ja samat C–C-sidokset, mutta Br:n paikalla on OH. Tunnista reaktio ja tuotteen funktionaalinen ryhmä.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Substituutio; tuotteessa on hydroksyyliryhmä eli alkoholi.",
    "scoring": "3 p: substituutio 1 p, OH 1 p, alkoholi 1 p.",
    "hints": [
      "Sama hiilirunko.",
      "Br vaihtuu OH:ksi."
    ],
    "skills": [
      "ke04.sub.substituution_tunnistaminen_rakennekaavoista",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Substituution tunnistaminen rakennekaavoista",
      "ke04.sub.substituution_tunnistaminen_rakennekaavoista"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
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
    "seedKey": "ke04-v3:KE04-SUB-031",
    "contentId": "KE04-SUB-031",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Substituutio ja isomeria",
    "questionType": "recognition",
    "difficulty": 2,
    "prompt": "Propaanissa eri vetyjen korvaaminen yhdellä Cl:lla voi antaa kaksi rakenneisomeeriä. Mitkä?",
    "options": [],
    "correctAnswer": null,
    "explanation": "1-klooripropaani ja 2-klooripropaani.",
    "scoring": "4 p: kumpikin 2 p.",
    "hints": [
      "Cl voi olla päätehiilessä tai keskihiilessä.",
      "Symmetriset päätehiilet ovat keskenään vastaavat."
    ],
    "skills": [
      "ke04.sub.substituutio_ja_isomeria",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Substituutio ja isomeria",
      "ke04.sub.substituutio_ja_isomeria"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
    ],
    "estimatedSeconds": 83,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Tunnistus"
  },
  {
    "seedKey": "ke04-v3:KE04-SUB-032",
    "contentId": "KE04-SUB-032",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Substituutio ja isomeria",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi propaanin yksikloorauksessa ei synny kolmea erilaista rakenneisomeeriä, vaikka hiiliä on kolme?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Hiilet 1 ja 3 ovat symmetrian vuoksi keskenään samanlaisia, joten niissä tapahtuva substituutio antaa saman 1-klooripropaanin; keskihiili antaa 2-klooripropaanin.",
    "scoring": "3 p: päätehiilien ekvivalenssi 1 p, 1-kloori 1 p, 2-kloori 1 p.",
    "hints": [
      "Piirrä propaani.",
      "Käännä molekyyli ympäri."
    ],
    "skills": [
      "ke04.sub.substituutio_ja_isomeria",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Substituutio ja isomeria",
      "ke04.sub.substituutio_ja_isomeria"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
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
    "seedKey": "ke04-v3:KE04-SUB-033",
    "contentId": "KE04-SUB-033",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Substituutio ja isomeria",
    "questionType": "recognition",
    "difficulty": 3,
    "prompt": "Butaanin yksibromauksessa Br voi olla hiilessä 1 tai 2. Nimeä kaksi rakenneisomeeriä.",
    "options": [],
    "correctAnswer": null,
    "explanation": "1-bromibutaani ja 2-bromibutaani.",
    "scoring": "4 p.",
    "hints": [
      "Hiilet 3 ja 4 vastaavat 2:ta ja 1:tä symmetrian vuoksi.",
      "Käytä pienintä paikkanumeroa."
    ],
    "skills": [
      "ke04.sub.substituutio_ja_isomeria",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Substituutio ja isomeria",
      "ke04.sub.substituutio_ja_isomeria"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
    ],
    "estimatedSeconds": 97,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Tunnistus"
  },
  {
    "seedKey": "ke04-v3:KE04-SUB-034",
    "contentId": "KE04-SUB-034",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Substituutio ja isomeria",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Miksi rakennekaava on tärkeä, jos substituution tuotteella on molekyylikaava C₄H₉Cl?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Sama molekyylikaava voi vastata useita rakenneisomeerejä, joissa Cl ja hiilirunko ovat eri tavoin järjestyneet. Molekyylikaava ei yksin määritä rakennetta.",
    "scoring": "3 p: useita isomeerejä 1 p, Cl/hiilirungon sijainti 1 p, molekyylikaavan rajoitus 1 p.",
    "hints": [
      "Molekyylikaava kertoo atomimäärät, ei järjestystä.",
      "Mieti 1- ja 2-klooributaania."
    ],
    "skills": [
      "ke04.sub.substituutio_ja_isomeria",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Substituutio ja isomeria",
      "ke04.sub.substituutio_ja_isomeria"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
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
    "seedKey": "ke04-v3:KE04-SUB-035",
    "contentId": "KE04-SUB-035",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Substituutio ja isomeria",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Väite: 'Jos kahdella substituutiotuotteella on sama molekyylikaava, ne ovat sama yhdiste.' Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Ne voivat olla rakenneisomeerejä: atomimäärät ovat samat mutta atomien kytkeytyminen tai substituentin paikka eri, jolloin ne ovat eri yhdisteitä.",
    "scoring": "3 p: isomeria 1 p, sama kaava 1 p, eri rakenne 1 p.",
    "hints": [
      "Sama kaava ei takaa samaa rakennetta.",
      "Paikkanumero voi muuttua."
    ],
    "skills": [
      "ke04.sub.substituutio_ja_isomeria",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Substituutio ja isomeria",
      "ke04.sub.substituutio_ja_isomeria"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.substitution_vs_other",
      "organic.isomerism"
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
    "seedKey": "ke04-v3:KE04-SUB-036",
    "contentId": "KE04-SUB-036",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Integroivat reaktiotyyppitehtävät",
    "questionType": "matching",
    "difficulty": 2,
    "prompt": "Yhdistä muutos: Br→OH; C=C + H₂; alkoholi→alkeeni + H₂O ↔ substituutio; additio; eliminaatio.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Br→OH = substituutio; C=C + H₂ = additio; alkoholi→alkeeni + H₂O = eliminaatio.",
    "scoring": "3 p.",
    "hints": [
      "Korvaa, lisää, poista.",
      "Seuraa C=C:tä."
    ],
    "skills": [
      "ke04.sub.integroivat_reaktiotyyppitehtavat",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Integroivat reaktiotyyppitehtävät",
      "ke04.sub.integroivat_reaktiotyyppitehtavat"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
    ],
    "estimatedSeconds": 133,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "Br",
        "right": "OH = substituutio"
      },
      {
        "left": "C",
        "right": "C + H₂ = additio"
      },
      {
        "left": "alkoholi",
        "right": "alkeeni + H₂O = eliminaatio."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-SUB-037",
    "contentId": "KE04-SUB-037",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Integroivat reaktiotyyppitehtävät",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Mikä on paras yhden lauseen sääntö substituution tunnistamiseen rakennekaavasta?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Tarkista, korvautuuko yksi lähtöaineen atomi tai ryhmä toisella siten, että orgaanisen rungon perusrakenne säilyy.",
    "scoring": "2 p.",
    "hints": [
      "Etsi 'tilalle tullut' ryhmä.",
      "Hiilirunko usein säilyy."
    ],
    "skills": [
      "ke04.sub.integroivat_reaktiotyyppitehtavat",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Integroivat reaktiotyyppitehtävät",
      "ke04.sub.integroivat_reaktiotyyppitehtavat"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
    ],
    "estimatedSeconds": 194,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Selitys"
  },
  {
    "seedKey": "ke04-v3:KE04-SUB-038",
    "contentId": "KE04-SUB-038",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Integroivat reaktiotyyppitehtävät",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Reaktio CH₃CH₂Br + OH⁻ → CH₂=CH₂ + H₂O + Br⁻ on luokiteltu substituutioksi. Mikä oikea luokitus rakenteen perusteella?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Eliminaatio, koska H ja Br poistuvat ja hiilien väliin muodostuu C=C.",
    "scoring": "3 p: eliminaatio 1 p, poistuvat ryhmät 1 p, C=C 1 p.",
    "hints": [
      "Katso tuotteen kaksoissidosta.",
      "OH ei jää orgaaniseen tuotteeseen."
    ],
    "skills": [
      "ke04.sub.integroivat_reaktiotyyppitehtavat",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Integroivat reaktiotyyppitehtävät",
      "ke04.sub.integroivat_reaktiotyyppitehtavat"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.substitution_vs_other"
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
    "seedKey": "ke04-v3:KE04-SUB-039",
    "contentId": "KE04-SUB-039",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Integroivat reaktiotyyppitehtävät",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Orgaanisen lähtöaineen ja tuotteen molekyylikaavoissa hiili- ja vetymäärät ovat samat, mutta tuotteessa on OH ja lähtöaineessa Cl. Mitä reaktiota epäilet?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Cl→OH-substituutiota, joka muuttaa halogeenialkaanin alkoholiksi.",
    "scoring": "3 p: substituutio 1 p, Cl→OH 1 p, alkoholi 1 p.",
    "hints": [
      "Atomimäärät rungossa säilyvät.",
      "Yksi ryhmä vaihtuu."
    ],
    "skills": [
      "ke04.sub.integroivat_reaktiotyyppitehtavat",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Integroivat reaktiotyyppitehtävät",
      "ke04.sub.integroivat_reaktiotyyppitehtavat"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
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
    "seedKey": "ke04-v3:KE04-SUB-040",
    "contentId": "KE04-SUB-040",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "Integroivat reaktiotyyppitehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "Vertaa substituutiota, additiota ja eliminaatiota käyttäen yhtä esimerkkireaktiota kustakin.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Esim. substituutio: CH₃CH₂Br + OH⁻ → CH₃CH₂OH + Br⁻. Additio: CH₂=CH₂ + Br₂ → BrCH₂CH₂Br. Eliminaatio: CH₃CH₂OH → CH₂=CH₂ + H₂O. Olennaiset erot ovat ryhmän korvautuminen, ryhmien liittyminen C=C:hen ja ryhmien poistuminen C=C:n muodostuessa.",
    "scoring": "6 p: kolme oikeaa esimerkkiä 3 p, jokaisen rakenteellinen perustelu 3 p.",
    "hints": [
      "Valitse yksinkertaiset C₂-esimerkit.",
      "Tarkista, mitä C=C:lle tapahtuu",
      "Ratkaise osa-alueet erikseen ja yhdistä ne vasta lopulliseen perusteltuun vastaukseen.."
    ],
    "skills": [
      "ke04.sub.integroivat_reaktiotyyppitehtavat",
      "task.integroiva_vertailu"
    ],
    "expectedConcepts": [
      "Integroivat reaktiotyyppitehtävät",
      "ke04.sub.integroivat_reaktiotyyppitehtavat"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 6,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Integroiva vertailu"
  },
  {
    "seedKey": "ke04-v3:KE04-SUB-X01",
    "contentId": "KE04-SUB-X01",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Yhdiste CH₃CH₂Br muuttuu tuotteeksi CH₃CH₂OH. a) Tunnista reaktiotyyppi. b) Mikä ryhmä poistuu ja mikä tulee tilalle? c) Mikä havainto rakennekaavoissa erottaa tämän eliminaatiosta?",
    "options": [],
    "correctAnswer": null,
    "explanation": "a) Substituutio. b) Br korvautuu OH:lla. c) C–C-sidoksen kertaluku ei muutu eikä C=C:tä synny.",
    "scoring": "6 p: tyyppi 1 p; ryhmät 2 p; C–C/C=C-vertailu 3 p.",
    "hints": [
      "Etsi 'vaihtunut' ryhmä.",
      "Tarkista syntyykö kaksoissidos",
      "Perustele päätelmä yhdistämällä havainto tai mittaus suoraan kemialliseen malliin.."
    ],
    "skills": [
      "organic.substitution",
      "structural_comparison"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "organic.substitution",
      "structural_comparison"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
    ],
    "estimatedSeconds": 309,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 6,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Rakennepäättely"
  },
  {
    "seedKey": "ke04-v3:KE04-SUB-X02",
    "contentId": "KE04-SUB-X02",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "multiple_choice",
    "difficulty": 4,
    "prompt": "Mikä vaihtoehto kuvaa parhaiten substituutiota?",
    "options": [
      "BrCH₂CH₃→CH₂=CH₂",
      "CH₂=CH₂+Br₂→BrCH₂CH₂Br",
      "CH₃CH₂Br→CH₃CH₂OH",
      "CH₃CH₂OH→CH₃COOH"
    ],
    "correctAnswer": "CH₃CH₂Br→CH₃CH₂OH",
    "explanation": "C.",
    "scoring": "4 p: C 1 p; perustelu Br→OH 2 p; muiden keskeinen ero 1 p.",
    "hints": [
      "Substituutiossa yksi ryhmä tulee toisen tilalle.",
      "C:ssä hiilirunko säilyy",
      "Sulje pois vaihtoehdot vertaamalla jokaista niistä reaktioyhtälöön, rakenteeseen tai määritelmään.."
    ],
    "skills": [
      "organic.reaction_classification"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "organic.reaction_classification"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "confuse_substitution_elimination_addition"
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
    "seedKey": "ke04-v3:KE04-SUB-X03",
    "contentId": "KE04-SUB-X03",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Propaanin yhden H-atomin korvaaminen Cl:lla voi tuottaa kaksi rakenneisomeeriä. Piirrä tai nimeä ne ja selitä, miksi kolmatta erilaista paikkaisomeeriä ei synny.",
    "options": [],
    "correctAnswer": null,
    "explanation": "1-klooripropaani ja 2-klooripropaani. Hiilet 1 ja 3 ovat propaanissa symmetrian vuoksi ekvivalentteja.",
    "scoring": "6 p: kaksi isomeeriä 4 p; symmetriaperustelu 2 p.",
    "hints": [
      "Kloori voi olla pääte- tai keskihiilessä.",
      "Molemmat päätehiilet vastaavat toisiaan",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "organic.substitution",
      "isomerism"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "organic.substitution",
      "isomerism"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
    ],
    "estimatedSeconds": 309,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 6,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Isomeriatehtävä"
  },
  {
    "seedKey": "ke04-v3:KE04-SUB-X04",
    "contentId": "KE04-SUB-X04",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "short_answer",
    "difficulty": 4,
    "prompt": "Kirjoita metaanin yhden kloorisubstituution reaktio Cl₂:n kanssa ja tarkista atomitase.",
    "options": [],
    "correctAnswer": null,
    "explanation": "CH₄+Cl₂→CH₃Cl+HCl. C 1=1, H 4=3+1, Cl 2=1+1.",
    "scoring": "6 p: yhtälö 3 p; C/H/Cl-tarkistus 3 p.",
    "hints": [
      "Yksi H korvautuu Cl:lla.",
      "Toinen Cl muodostaa HCl:n poistuneen H:n kanssa",
      "Piirrä tarvittaessa lähtö- ja tuoterakenne rinnakkain ja seuraa, mitkä sidokset muuttuvat.."
    ],
    "skills": [
      "organic.substitution_equation",
      "balancing"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "organic.substitution_equation",
      "balancing"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
    ],
    "estimatedSeconds": 154,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 6,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Atomitasapaino"
  },
  {
    "seedKey": "ke04-v3:KE04-SUB-X05",
    "contentId": "KE04-SUB-X05",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "error_detection",
    "difficulty": 5,
    "prompt": "Opiskelija luokittelee CH₂=CH₂+HCl→CH₃CH₂Cl substituutioksi, koska 'Cl tulee molekyyliin'. Selitä miksi luokitus on väärä ja mikä on oikea.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Se on additio: H ja Cl liittyvät C=C-kaksoissidoksen kahdelle hiilelle, C=C muuttuu C–C:ksi eikä mikään lähtöaineen ryhmä korvaudu.",
    "scoring": "6 p: additio 1 p; H+Cl liittyvät 2 p; C=C→C–C 2 p; ei korvautumista 1 p.",
    "hints": [
      "Katso koko rakennemuutos.",
      "Korvautuuko jokin vai liittyvätkö molemmat osat",
      "Nimeä ensin väärä kemiallinen periaate ja vasta sitten sen vaikutus lopputulokseen.?"
    ],
    "skills": [
      "organic.reaction_classification",
      "representation"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "organic.reaction_classification",
      "representation"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "presence_of_halogen_means_substitution"
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
    "seedKey": "ke04-v3:KE04-SUB-X06",
    "contentId": "KE04-SUB-X06",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "application",
    "difficulty": 5,
    "prompt": "2-bromipropaanista muodostuu reaktiossa propan-2-oli. Esitä lähtöaineen ja tuotteen tiivistetyt rakennekaavat ja nimeä funktionaalisen ryhmän muutos.",
    "options": [],
    "correctAnswer": null,
    "explanation": "CH₃CHBrCH₃ → CH₃CHOHCH₃. C–Br-ryhmä korvautuu hydroksyyliryhmällä; halogeenialkaani muuttuu alkoholiksi.",
    "scoring": "6 p: lähtörakenne 2 p; tuoterakenne 2 p; ryhmämuutos/luokat 2 p.",
    "hints": [
      "Br ja OH ovat samalla hiilellä 2.",
      "Hiilirunko ei muutu",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "organic.structural_formula",
      "substitution"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "organic.structural_formula",
      "substitution"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
    ],
    "estimatedSeconds": 347,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 6,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Soveltava rakenne"
  },
  {
    "seedKey": "ke04-v3:KE04-SUB-X07",
    "contentId": "KE04-SUB-X07",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "Aine A on 1-bromipropaani. Ensimmäisessä vaiheessa Br korvataan OH:lla. Toisessa vaiheessa saadusta alkoholista eliminoidaan vesi. a) Nimeä välituote. b) Nimeä lopputuote. c) Luokittele molemmat reaktiot. d) Kirjoita tiivistetyt rakennekaavat koko polulle.",
    "options": [],
    "correctAnswer": null,
    "explanation": "A CH₃CH₂CH₂Br → propan-1-oli CH₃CH₂CH₂OH (substituutio) → propeeni CH₂=CHCH₃ + H₂O (eliminaatio).",
    "scoring": "10 p: välituote 2 p; lopputuote 2 p; reaktiotyypit 2 p; rakennekaavat/polku 4 p.",
    "hints": [
      "Br→OH ensin.",
      "Alkoholista poistuu H₂O ja C=C syntyy",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "organic.reaction_sequence",
      "substitution",
      "elimination",
      "structural_formula"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "organic.reaction_sequence",
      "substitution",
      "elimination",
      "structural_formula"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 10,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Koereservi – reaktiopolku"
  },
  {
    "seedKey": "ke04-v3:KE04-SUB-X08",
    "contentId": "KE04-SUB-X08",
    "chapter": 9,
    "topicName": "Substituutioreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "Samasta 2-bromipropaanista voidaan olosuhteista riippuen saada joko propan-2-olia tai propeenia. Vertaile tuotteisiin johtavia rakennemuutoksia: mikä poistuu/tulee tilalle ja mitä tapahtuu hiili-hiilisidokselle?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Propan-2-oli: substituutio, Br korvautuu OH:lla, C–C-sidokset säilyvät yksinkertaisina. Propeeni: eliminaatio, Br ja viereinen H poistuvat ja viereisten hiilien välille muodostuu C=C.",
    "scoring": "8 p: substituution kuvaus 4 p; eliminaation kuvaus 4 p.",
    "hints": [
      "Seuraa Br:ää.",
      "Katso syntyykö C=C",
      "Ratkaise osa-alueet erikseen ja yhdistä ne vasta lopulliseen perusteltuun vastaukseen.."
    ],
    "skills": [
      "organic.substitution_vs_elimination",
      "structural_reasoning"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "organic.substitution_vs_elimination",
      "structural_reasoning"
    ],
    "prerequisites": [
      "organic_structures",
      "functional_groups",
      "reaction_classification"
    ],
    "commonErrors": [
      "substitution_vs_elimination",
      "structure_identity"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 8,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Koereservi – vertailu"
  }
];
