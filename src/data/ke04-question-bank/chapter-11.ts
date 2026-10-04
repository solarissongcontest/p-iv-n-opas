import type { Ke04SeedQuestion } from "./types";

export const questions: Ke04SeedQuestion[] = [
  {
    "seedKey": "ke04-v3:KE04-ELI-001",
    "contentId": "KE04-ELI-001",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Eliminaation perusidea",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitä eliminaatioreaktiossa tapahtuu orgaanisen molekyylin rakenteelle yleisesti?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Molekyylistä poistuu pieniä atomeja tai ryhmiä, ja niiden tilalle muodostuu usein hiili-hiili-kaksoissidos.",
    "scoring": "2 p: poistuminen 1 p, kaksoissidos 1 p.",
    "hints": [
      "Eliminaatio = poistaminen.",
      "Usein syntyy alkeeni."
    ],
    "skills": [
      "ke04.eli.eliminaation_perusidea",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Eliminaation perusidea",
      "ke04.eli.eliminaation_perusidea"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "elimination_vs_substitution",
      "multiple_bond_formation"
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
    "seedKey": "ke04-v3:KE04-ELI-002",
    "contentId": "KE04-ELI-002",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Eliminaation perusidea",
    "questionType": "multiple_choice",
    "difficulty": 1,
    "prompt": "Mikä rakennemuutos on tyypillinen eliminaatiossa?",
    "options": [
      "C–C → C=C",
      "C=C → C–C",
      "kaksi molekyyliä liittyy ilman sivutuotetta",
      "esteriryhmä hydrolysoituu"
    ],
    "correctAnswer": "C–C → C=C",
    "explanation": "A.",
    "scoring": "1 p.",
    "hints": [
      "Eliminaatio on additiolle vastakkainen rakenneidea.",
      "Kaksoissidos syntyy."
    ],
    "skills": [
      "ke04.eli.eliminaation_perusidea",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Eliminaation perusidea",
      "ke04.eli.eliminaation_perusidea"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.elimination_vs_other",
      "organic.multiple_bond_formation"
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
    "seedKey": "ke04-v3:KE04-ELI-003",
    "contentId": "KE04-ELI-003",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Eliminaation perusidea",
    "questionType": "matching",
    "difficulty": 2,
    "prompt": "Yhdistä: eliminaatio, additio ↔ kaksoissidos syntyy; kaksoissidos kuluu.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Eliminaatio → kaksoissidos syntyy; additio → kaksoissidos kuluu.",
    "scoring": "2 p.",
    "hints": [
      "Eliminaatiossa poistetaan ryhmiä.",
      "Additiossa lisätään ryhmiä."
    ],
    "skills": [
      "ke04.eli.eliminaation_perusidea",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Eliminaation perusidea",
      "ke04.eli.eliminaation_perusidea"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "elimination_vs_substitution",
      "multiple_bond_formation"
    ],
    "estimatedSeconds": 133,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "Eliminaatio",
        "right": "kaksoissidos syntyy"
      },
      {
        "left": "additio",
        "right": "kaksoissidos kuluu."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-ELI-004",
    "contentId": "KE04-ELI-004",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Eliminaation perusidea",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi eliminaatioreaktio voidaan usein nähdä additioreaktion vastakkaisena rakennemuutoksena?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Eliminaatiossa kahdelta vierekkäiseltä hiileltä poistuu ryhmiä ja niiden välille muodostuu C=C, kun additiossa C=C avautuu ja uusia ryhmiä liittyy hiiliin.",
    "scoring": "4 p: eliminaation muutos 2 p, addition muutos 2 p.",
    "hints": [
      "Seuraa C=C-sidosta.",
      "Katso mitä ryhmille tapahtuu."
    ],
    "skills": [
      "ke04.eli.eliminaation_perusidea",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Eliminaation perusidea",
      "ke04.eli.eliminaation_perusidea"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "elimination_vs_substitution",
      "multiple_bond_formation"
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
    "seedKey": "ke04-v3:KE04-ELI-005",
    "contentId": "KE04-ELI-005",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Eliminaation perusidea",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Väite: 'Eliminaatiossa molekyyliin lisätään kaksi uutta atomia kaksoissidoksen kohdalle.' Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Väärin. Eliminaatiossa poistetaan atomeja/ryhmiä vierekkäisiltä hiililtä ja muodostuu kaksoissidos; atomien lisääminen kaksoissidokseen on additiota.",
    "scoring": "3 p: poistaminen 1 p, kaksoissidos 1 p, additioon vertailu 1 p.",
    "hints": [
      "Nimen merkitys auttaa.",
      "Lisäys = additio."
    ],
    "skills": [
      "ke04.eli.eliminaation_perusidea",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Eliminaation perusidea",
      "ke04.eli.eliminaation_perusidea"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.elimination_vs_other"
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
    "seedKey": "ke04-v3:KE04-ELI-006",
    "contentId": "KE04-ELI-006",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Alkoholin veden eliminaatio",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mikä pieni molekyyli voi poistua alkoholista eliminaatiossa, jossa muodostuu alkeeni?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Vesi, H₂O.",
    "scoring": "1 p.",
    "hints": [
      "Alkoholissa on OH.",
      "Viereiseltä hiileltä voidaan poistaa H."
    ],
    "skills": [
      "ke04.eli.alkoholin_veden_eliminaatio",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Alkoholin veden eliminaatio",
      "ke04.eli.alkoholin_veden_eliminaatio"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "elimination_vs_substitution",
      "multiple_bond_formation"
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
    "seedKey": "ke04-v3:KE04-ELI-007",
    "contentId": "KE04-ELI-007",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Alkoholin veden eliminaatio",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Etanolin veden eliminaation orgaaninen tuote on",
    "options": [
      "eteeni",
      "etaani",
      "etaanihappo",
      "etyylietanaatti"
    ],
    "correctAnswer": "eteeni",
    "explanation": "A, eteeni.",
    "scoring": "1 p.",
    "hints": [
      "Poista H₂O etanolin rakenteesta.",
      "Jäljelle jää C=C."
    ],
    "skills": [
      "ke04.eli.alkoholin_veden_eliminaatio",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Alkoholin veden eliminaatio",
      "ke04.eli.alkoholin_veden_eliminaatio"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.elimination_vs_other"
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
    "seedKey": "ke04-v3:KE04-ELI-008",
    "contentId": "KE04-ELI-008",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Alkoholin veden eliminaatio",
    "questionType": "short_answer",
    "difficulty": 2,
    "prompt": "Kirjoita etanolin eliminaatio sanallisesti tai kaavana.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Etanoli → eteeni + H₂O; CH₃CH₂OH → CH₂=CH₂ + H₂O.",
    "scoring": "3 p: eteeni 1 p, vesi 1 p, tasapainoinen rakenne/kaava 1 p.",
    "hints": [
      "Lähtöaine C₂H₆O.",
      "Vähennä H₂O → C₂H₄."
    ],
    "skills": [
      "ke04.eli.alkoholin_veden_eliminaatio",
      "task.reaktio"
    ],
    "expectedConcepts": [
      "Alkoholin veden eliminaatio",
      "ke04.eli.alkoholin_veden_eliminaatio"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "elimination_vs_substitution",
      "multiple_bond_formation"
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
    "seedKey": "ke04-v3:KE04-ELI-009",
    "contentId": "KE04-ELI-009",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Alkoholin veden eliminaatio",
    "questionType": "short_answer",
    "difficulty": 3,
    "prompt": "Tarkista atomien avulla, että etanolin eliminaatio CH₃CH₂OH → CH₂=CH₂ + H₂O on tasapainossa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Vasemmalla C₂H₆O; oikealla C₂H₄ + H₂O = C₂H₆O. Kaikkien alkuaineiden atomimäärät säilyvät.",
    "scoring": "3 p: C 1 p, H 1 p, O 1 p tai vastaava täydellinen tarkistus.",
    "hints": [
      "Laske C, H ja O molemmilta puolilta.",
      "Muista veden kaksi vetyä."
    ],
    "skills": [
      "ke04.eli.alkoholin_veden_eliminaatio",
      "task.atomitasapaino"
    ],
    "expectedConcepts": [
      "Alkoholin veden eliminaatio",
      "ke04.eli.alkoholin_veden_eliminaatio"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "elimination_vs_substitution",
      "multiple_bond_formation"
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
    "seedKey": "ke04-v3:KE04-ELI-010",
    "contentId": "KE04-ELI-010",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Alkoholin veden eliminaatio",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija kirjoittaa etanolin eliminaatiotuotteeksi etaanin + H₂O. Mikä on ongelma?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Jos H₂O poistuu etanolista, jäljelle jää C₂H₄, ei C₂H₆. Hiilien välille muodostuu kaksoissidos ja tuote on eteeni.",
    "scoring": "3 p: atomitasapaino 1 p, C₂H₄ 1 p, kaksoissidos/eteeni 1 p.",
    "hints": [
      "Vähennä H₂O lähtöaineen molekyylikaavasta.",
      "Tarkista hiilien valenssit."
    ],
    "skills": [
      "ke04.eli.alkoholin_veden_eliminaatio",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Alkoholin veden eliminaatio",
      "ke04.eli.alkoholin_veden_eliminaatio"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.elimination_vs_other"
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
    "seedKey": "ke04-v3:KE04-ELI-011",
    "contentId": "KE04-ELI-011",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Propanolit ja butanolit: mahdolliset alkeenituotteet",
    "questionType": "recognition",
    "difficulty": 2,
    "prompt": "Mikä alkeeni syntyy propan-1-olin yksinkertaisessa veden eliminaatiossa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Propeeni, CH₂=CHCH₃.",
    "scoring": "2 p.",
    "hints": [
      "Kolme hiiltä säilyy.",
      "Muodosta C=C."
    ],
    "skills": [
      "ke04.eli.propanolit_ja_butanolit_mahdolliset_alkeenituotteet",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Propanolit ja butanolit: mahdolliset alkeenituotteet",
      "ke04.eli.propanolit_ja_butanolit_mahdolliset_alkeenituotteet"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "elimination_vs_substitution",
      "multiple_bond_formation"
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
    "seedKey": "ke04-v3:KE04-ELI-012",
    "contentId": "KE04-ELI-012",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Propanolit ja butanolit: mahdolliset alkeenituotteet",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Propan-2-olin eliminaatiotuote on",
    "options": [
      "propeeni",
      "propaani",
      "etanoli",
      "propaanihappo"
    ],
    "correctAnswer": "propeeni",
    "explanation": "A, propeeni.",
    "scoring": "1 p.",
    "hints": [
      "Poista H₂O.",
      "Kolmen hiilen alkeeni on propeeni."
    ],
    "skills": [
      "ke04.eli.propanolit_ja_butanolit_mahdolliset_alkeenituotteet",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Propanolit ja butanolit: mahdolliset alkeenituotteet",
      "ke04.eli.propanolit_ja_butanolit_mahdolliset_alkeenituotteet"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.elimination_vs_other"
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
    "seedKey": "ke04-v3:KE04-ELI-013",
    "contentId": "KE04-ELI-013",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Propanolit ja butanolit: mahdolliset alkeenituotteet",
    "questionType": "recognition",
    "difficulty": 3,
    "prompt": "Butan-1-olista veden eliminaatiolla muodostuva suora pääketjullinen alkeeni voidaan kirjoittaa muodossa CH₂=CHCH₂CH₃. Nimeä se.",
    "options": [],
    "correctAnswer": null,
    "explanation": "But-1-eeni.",
    "scoring": "2 p: nimi 2 p.",
    "hints": [
      "Neljä hiiltä → but-.",
      "Kaksoissidos alkaa hiilestä 1."
    ],
    "skills": [
      "ke04.eli.propanolit_ja_butanolit_mahdolliset_alkeenituotteet",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Propanolit ja butanolit: mahdolliset alkeenituotteet",
      "ke04.eli.propanolit_ja_butanolit_mahdolliset_alkeenituotteet"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "elimination_vs_substitution",
      "multiple_bond_formation"
    ],
    "estimatedSeconds": 97,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Tunnistus"
  },
  {
    "seedKey": "ke04-v3:KE04-ELI-014",
    "contentId": "KE04-ELI-014",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Propanolit ja butanolit: mahdolliset alkeenituotteet",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi joistakin suuremmista alkoholeista voi eliminaatiossa muodostua useampia rakenneisomeerisiä alkeeneja?",
    "options": [],
    "correctAnswer": null,
    "explanation": "OH-ryhmän viereisiä β-hiiliä voi olla useita; H voidaan poistaa eri viereiseltä hiileltä, jolloin kaksoissidos muodostuu eri kohtaan.",
    "scoring": "4 p: useita viereisiä hiiliä 1 p, H:n poisto 1 p, kaksoissidoksen eri sijainti 1 p, isomeria 1 p.",
    "hints": [
      "Katso OH-hiilen molemmat naapurit.",
      "Kaksoissidos voi syntyä kummallekin puolelle."
    ],
    "skills": [
      "ke04.eli.propanolit_ja_butanolit_mahdolliset_alkeenituotteet",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Propanolit ja butanolit: mahdolliset alkeenituotteet",
      "ke04.eli.propanolit_ja_butanolit_mahdolliset_alkeenituotteet"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "elimination_vs_substitution",
      "multiple_bond_formation"
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
    "seedKey": "ke04-v3:KE04-ELI-015",
    "contentId": "KE04-ELI-015",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Propanolit ja butanolit: mahdolliset alkeenituotteet",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Butan-2-olissa OH on hiilessä 2. Nimeä kaksi mahdollista kaksoissidoksen sijaintiin perustuvaa alkeenituotetta, joita perusmallissa voidaan ajatella muodostuvan.",
    "options": [],
    "correctAnswer": null,
    "explanation": "But-1-eeni ja but-2-eeni.",
    "scoring": "4 p: kumpikin nimi 2 p.",
    "hints": [
      "Poista H joko hiilen 1 tai hiilen 3 suunnasta.",
      "Kaksoissidos tulee hiilien 1–2 tai 2–3 väliin",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "ke04.eli.propanolit_ja_butanolit_mahdolliset_alkeenituotteet",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Propanolit ja butanolit: mahdolliset alkeenituotteet",
      "ke04.eli.propanolit_ja_butanolit_mahdolliset_alkeenituotteet"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "elimination_vs_substitution",
      "multiple_bond_formation"
    ],
    "estimatedSeconds": 309,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Soveltaminen"
  },
  {
    "seedKey": "ke04-v3:KE04-ELI-016",
    "contentId": "KE04-ELI-016",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Halogeeniyhdisteiden eliminaation periaate",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitä kahta tyyppiä olevat ryhmät voidaan poistaa vierekkäisiltä hiililtä halogeenialkaanin eliminaatiossa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Vetyatomi ja halogeeniatomi/halogenidiin johtava ryhmä; niiden poistuessa muodostuu C=C.",
    "scoring": "2 p.",
    "hints": [
      "Toinen ryhmä on halogeeni.",
      "Toinen on H viereiseltä hiileltä."
    ],
    "skills": [
      "ke04.eli.halogeeniyhdisteiden_eliminaation_periaate",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Halogeeniyhdisteiden eliminaation periaate",
      "ke04.eli.halogeeniyhdisteiden_eliminaation_periaate"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "elimination_vs_substitution",
      "multiple_bond_formation"
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
    "seedKey": "ke04-v3:KE04-ELI-017",
    "contentId": "KE04-ELI-017",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Halogeeniyhdisteiden eliminaation periaate",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "2-bromipropaanin eliminaation hiilirunkotuote on",
    "options": [
      "propeeni",
      "propaani",
      "propan-2-oli",
      "propaanihappo"
    ],
    "correctAnswer": "propeeni",
    "explanation": "A, propeeni.",
    "scoring": "1 p.",
    "hints": [
      "Kolme hiiltä säilyy.",
      "Eliminaatio muodostaa C=C."
    ],
    "skills": [
      "ke04.eli.halogeeniyhdisteiden_eliminaation_periaate",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Halogeeniyhdisteiden eliminaation periaate",
      "ke04.eli.halogeeniyhdisteiden_eliminaation_periaate"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.elimination_vs_other",
      "organic.elimination_vs_substitution"
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
    "seedKey": "ke04-v3:KE04-ELI-018",
    "contentId": "KE04-ELI-018",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Halogeeniyhdisteiden eliminaation periaate",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi halogeeni ja vety poistetaan vierekkäisiltä hiililtä, kun muodostuu alkeeni?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kaksoissidos muodostuu näiden kahden vierekkäisen hiilen välille; kumpikin hiili vapauttaa valenssin poistamalla yhden ryhmän.",
    "scoring": "3 p: vierekkäisyys 1 p, C=C 1 p, valenssiperustelu 1 p.",
    "hints": [
      "Kaksoissidos yhdistää kaksi hiiltä.",
      "Molemmilta tarvitaan yksi 'paikka' uudelle sidokselle."
    ],
    "skills": [
      "ke04.eli.halogeeniyhdisteiden_eliminaation_periaate",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Halogeeniyhdisteiden eliminaation periaate",
      "ke04.eli.halogeeniyhdisteiden_eliminaation_periaate"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "elimination_vs_substitution",
      "multiple_bond_formation"
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
    "seedKey": "ke04-v3:KE04-ELI-019",
    "contentId": "KE04-ELI-019",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Halogeeniyhdisteiden eliminaation periaate",
    "questionType": "short_answer",
    "difficulty": 3,
    "prompt": "Yhdiste CH₃CH₂Cl eliminoi HCl:n. Mikä orgaaninen tuote muodostuu?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Eteeni, CH₂=CH₂.",
    "scoring": "2 p.",
    "hints": [
      "Poista Cl toisesta hiilestä ja H viereisestä.",
      "Muodosta C=C."
    ],
    "skills": [
      "ke04.eli.halogeeniyhdisteiden_eliminaation_periaate",
      "task.rakennetulkinta"
    ],
    "expectedConcepts": [
      "Halogeeniyhdisteiden eliminaation periaate",
      "ke04.eli.halogeeniyhdisteiden_eliminaation_periaate"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "elimination_vs_substitution",
      "multiple_bond_formation"
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
    "seedKey": "ke04-v3:KE04-ELI-020",
    "contentId": "KE04-ELI-020",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Halogeeniyhdisteiden eliminaation periaate",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija väittää, että CH₃CH₂Cl:n eliminaatiossa hiiliatomeja poistuu HCl:n mukana. Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Hiilirunko säilyy; poistuvat H ja Cl, ja kahden hiilen välille muodostuu kaksoissidos. Tuote on eteeni.",
    "scoring": "3 p: hiilirunko säilyy 1 p, H+Cl poistuu 1 p, eteeni/C=C 1 p.",
    "hints": [
      "HCl ei sisällä hiiltä.",
      "Seuraa hiilirunkoa."
    ],
    "skills": [
      "ke04.eli.halogeeniyhdisteiden_eliminaation_periaate",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Halogeeniyhdisteiden eliminaation periaate",
      "ke04.eli.halogeeniyhdisteiden_eliminaation_periaate"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.elimination_vs_other",
      "organic.elimination_vs_substitution"
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
    "seedKey": "ke04-v3:KE04-ELI-021",
    "contentId": "KE04-ELI-021",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Eliminaatio vs substituutio",
    "questionType": "matching",
    "difficulty": 1,
    "prompt": "Yhdistä reaktiotyyppi ja rakennemuutos: substituutio, eliminaatio ↔ yksi ryhmä korvautuu toisella; ryhmiä poistuu ja C=C syntyy.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Substituutio → ryhmä korvautuu; eliminaatio → ryhmiä poistuu ja C=C syntyy.",
    "scoring": "2 p.",
    "hints": [
      "Substituutio = korvaaminen.",
      "Eliminaatio = poistaminen."
    ],
    "skills": [
      "ke04.eli.eliminaatio_vs_substituutio",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Eliminaatio vs substituutio",
      "ke04.eli.eliminaatio_vs_substituutio"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "elimination_vs_substitution",
      "multiple_bond_formation"
    ],
    "estimatedSeconds": 112,
    "examEligible": false,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "Substituutio",
        "right": "ryhmä korvautuu"
      },
      {
        "left": "eliminaatio",
        "right": "ryhmiä poistuu ja C=C syntyy."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-ELI-022",
    "contentId": "KE04-ELI-022",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Eliminaatio vs substituutio",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "CH₃CH₂Br → CH₃CH₂OH on ensisijaisesti",
    "options": [
      "substituutio",
      "eliminaatio",
      "additio",
      "palaminen"
    ],
    "correctAnswer": "substituutio",
    "explanation": "A, substituutio.",
    "scoring": "1 p.",
    "hints": [
      "Br korvautuu OH:lla.",
      "Kaksoissidosta ei synny."
    ],
    "skills": [
      "ke04.eli.eliminaatio_vs_substituutio",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Eliminaatio vs substituutio",
      "ke04.eli.eliminaatio_vs_substituutio"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.elimination_vs_other",
      "organic.elimination_vs_substitution"
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
    "seedKey": "ke04-v3:KE04-ELI-023",
    "contentId": "KE04-ELI-023",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Eliminaatio vs substituutio",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "CH₃CH₂Br → CH₂=CH₂ on ensisijaisesti",
    "options": [
      "eliminaatio",
      "substituutio",
      "kondensaatio",
      "hydrolyysi"
    ],
    "correctAnswer": "eliminaatio",
    "explanation": "A, eliminaatio.",
    "scoring": "1 p.",
    "hints": [
      "C=C syntyy.",
      "Br ja H poistuvat."
    ],
    "skills": [
      "ke04.eli.eliminaatio_vs_substituutio",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Eliminaatio vs substituutio",
      "ke04.eli.eliminaatio_vs_substituutio"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.elimination_vs_other",
      "organic.elimination_vs_substitution"
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
    "seedKey": "ke04-v3:KE04-ELI-024",
    "contentId": "KE04-ELI-024",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Eliminaatio vs substituutio",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Mikä rakenteellinen havainto auttaa erottamaan substituution eliminaatiosta tuotteiden perusteella?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Substituutiossa hiilirungon tyydyttyneisyys usein säilyy ja yksi ryhmä vaihtuu; eliminaatiossa muodostuu uusi kaksoissidos ja molekyylistä poistuu ryhmiä.",
    "scoring": "3 p: substituution piirre 1 p, eliminaation C=C 1 p, poistuminen 1 p.",
    "hints": [
      "Etsi uusi kaksoissidos.",
      "Katso korvautuuko vai poistuuko ryhmä."
    ],
    "skills": [
      "ke04.eli.eliminaatio_vs_substituutio",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Eliminaatio vs substituutio",
      "ke04.eli.eliminaatio_vs_substituutio"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "elimination_vs_substitution",
      "multiple_bond_formation"
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
    "seedKey": "ke04-v3:KE04-ELI-025",
    "contentId": "KE04-ELI-025",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Eliminaatio vs substituutio",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Väite: 'Jos halogeeni katoaa lähtöaineesta, reaktio on aina eliminaatio.' Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Ei. Halogeeni voi myös korvautua toisella ryhmällä substituutiossa. Eliminaation tunnusmerkki on yleensä ryhmien poistumisen yhteydessä syntyvä C=C.",
    "scoring": "3 p: substituutiomahdollisuus 1 p, eliminaation C=C 1 p, perustelu 1 p.",
    "hints": [
      "Kysy, mikä tuli halogeenin tilalle.",
      "Tarkista kaksoissidos."
    ],
    "skills": [
      "ke04.eli.eliminaatio_vs_substituutio",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Eliminaatio vs substituutio",
      "ke04.eli.eliminaatio_vs_substituutio"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.elimination_vs_other",
      "organic.elimination_vs_substitution"
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
    "seedKey": "ke04-v3:KE04-ELI-026",
    "contentId": "KE04-ELI-026",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Eliminaatio vs additio",
    "questionType": "matching",
    "difficulty": 1,
    "prompt": "Yhdistä: etanoli → eteeni + vesi; eteeni + vesi → etanoli ↔ eliminaatio; additio.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Etanoli → eteeni + H₂O = eliminaatio; eteeni + H₂O → etanoli = additio.",
    "scoring": "2 p.",
    "hints": [
      "Ensimmäisessä poistuu vesi.",
      "Toisessa vesi liittyy kaksoissidokseen."
    ],
    "skills": [
      "ke04.eli.eliminaatio_vs_additio",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Eliminaatio vs additio",
      "ke04.eli.eliminaatio_vs_additio"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "elimination_vs_substitution",
      "multiple_bond_formation"
    ],
    "estimatedSeconds": 112,
    "examEligible": false,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "Etanoli",
        "right": "eteeni + H₂O = eliminaatio"
      },
      {
        "left": "eteeni + H₂O",
        "right": "etanoli = additio."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-ELI-027",
    "contentId": "KE04-ELI-027",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Eliminaatio vs additio",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Mikä suure muuttuu usein eliminaatiossa hiili-hiilisidoksen osalta?",
    "options": [
      "sidoksen kertaluku 1→2",
      "2→1",
      "1→0",
      "mikään ei muutu"
    ],
    "correctAnswer": "sidoksen kertaluku 1→2",
    "explanation": "A.",
    "scoring": "1 p.",
    "hints": [
      "C–C muuttuu C=C.",
      "Sidoksen kertaluku kasvaa."
    ],
    "skills": [
      "ke04.eli.eliminaatio_vs_additio",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Eliminaatio vs additio",
      "ke04.eli.eliminaatio_vs_additio"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.elimination_vs_other"
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
    "seedKey": "ke04-v3:KE04-ELI-028",
    "contentId": "KE04-ELI-028",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Eliminaatio vs additio",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Vertaa vetyjen määrää etaanissa C₂H₆ ja eteenissä C₂H₄. Miten tämä tukee eliminaation ideaa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Eteenissä on kaksi vetyä vähemmän ja C=C. Kahden vedyn poistuminen voi liittyä tyydyttymättömyyden lisääntymiseen, vaikka käytännön eliminaatiossa poistuvat ryhmät riippuvat lähtöaineesta.",
    "scoring": "3 p: 2 H ero 1 p, C=C 1 p, yhteys eliminaatioon 1 p.",
    "hints": [
      "Laske vetyatomit.",
      "Alkeenilla on vähemmän H:ta kuin vastaavalla alkaanilla."
    ],
    "skills": [
      "ke04.eli.eliminaatio_vs_additio",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Eliminaatio vs additio",
      "ke04.eli.eliminaatio_vs_additio"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "elimination_vs_substitution",
      "multiple_bond_formation"
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
    "seedKey": "ke04-v3:KE04-ELI-029",
    "contentId": "KE04-ELI-029",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Eliminaatio vs additio",
    "questionType": "short_answer",
    "difficulty": 3,
    "prompt": "Kirjoita yksi yksinkertainen reaktiopari, jossa eliminaatio ja additio ovat rakenteellisesti vastakkaiset.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Esim. CH₃CH₂OH → CH₂=CH₂ + H₂O ja CH₂=CH₂ + H₂O → CH₃CH₂OH.",
    "scoring": "4 p: eliminaatio 2 p, additio 2 p.",
    "hints": [
      "Käytä etanolia ja eteeniä.",
      "Seuraa vettä."
    ],
    "skills": [
      "ke04.eli.eliminaatio_vs_additio",
      "task.reaktiopari"
    ],
    "expectedConcepts": [
      "Eliminaatio vs additio",
      "ke04.eli.eliminaatio_vs_additio"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "elimination_vs_substitution",
      "multiple_bond_formation"
    ],
    "estimatedSeconds": 135,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Reaktiopari"
  },
  {
    "seedKey": "ke04-v3:KE04-ELI-030",
    "contentId": "KE04-ELI-030",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Eliminaatio vs additio",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Aine A muuttuu aineeksi B niin, että B:ssä on yksi C=C enemmän ja A:n molekyylikaavasta on poistunut H₂O. Mikä reaktiotyyppi on todennäköinen ja millainen funktionaalinen ryhmä A:ssa saattoi olla?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Eliminaatio, todennäköisesti alkoholin dehydraatio; A:ssa saattoi olla hydroksyyliryhmä.",
    "scoring": "4 p: eliminaatio 2 p, alkoholi/OH 1 p, H₂O:n poisto 1 p.",
    "hints": [
      "H₂O:n poistuminen on dehydraatio.",
      "OH-ryhmä + viereinen H voi antaa veden",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "ke04.eli.eliminaatio_vs_additio",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Eliminaatio vs additio",
      "ke04.eli.eliminaatio_vs_additio"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "elimination_vs_substitution",
      "multiple_bond_formation"
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
    "seedKey": "ke04-v3:KE04-ELI-031",
    "contentId": "KE04-ELI-031",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Reaktioyhtälöiden ja atomitasapainon tarkistus",
    "questionType": "short_answer",
    "difficulty": 2,
    "prompt": "Onko CH₃CH₂OH → CH₂=CH₂ + H₂O atomitasapainossa? Perustele lyhyesti.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kyllä: C₂H₆O molemmilla puolilla yhteensä.",
    "scoring": "2 p: kyllä 1 p, atomimäärien perustelu 1 p.",
    "hints": [
      "Laske C, H ja O.",
      "Summaa tuotteet."
    ],
    "skills": [
      "ke04.eli.reaktioyhtaloiden_ja_atomitasapainon_tarkistus",
      "task.tasapainotus"
    ],
    "expectedConcepts": [
      "Reaktioyhtälöiden ja atomitasapainon tarkistus",
      "ke04.eli.reaktioyhtaloiden_ja_atomitasapainon_tarkistus"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "elimination_vs_substitution",
      "multiple_bond_formation"
    ],
    "estimatedSeconds": 117,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Tasapainotus"
  },
  {
    "seedKey": "ke04-v3:KE04-ELI-032",
    "contentId": "KE04-ELI-032",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Reaktioyhtälöiden ja atomitasapainon tarkistus",
    "questionType": "error_detection",
    "difficulty": 2,
    "prompt": "Yhtälö CH₃CH₂OH → CH₂=CH₂ + OH on kirjoitettu eliminaatioksi. Mikä puuttuu tai on väärin?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Veden tulee olla tuotteena, ei irrallinen OH. Oikea yksinkertaistettu yhtälö on CH₃CH₂OH → CH₂=CH₂ + H₂O.",
    "scoring": "3 p: OH-virhe 1 p, H₂O 1 p, oikea yhtälö 1 p.",
    "hints": [
      "Tarkista vedyn määrä.",
      "Kondensoitunut poistuva ryhmä on neutraali vesi."
    ],
    "skills": [
      "ke04.eli.reaktioyhtaloiden_ja_atomitasapainon_tarkistus",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Reaktioyhtälöiden ja atomitasapainon tarkistus",
      "ke04.eli.reaktioyhtaloiden_ja_atomitasapainon_tarkistus"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.elimination_vs_other"
    ],
    "estimatedSeconds": 166,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Virheen tunnistus"
  },
  {
    "seedKey": "ke04-v3:KE04-ELI-033",
    "contentId": "KE04-ELI-033",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Reaktioyhtälöiden ja atomitasapainon tarkistus",
    "questionType": "short_answer",
    "difficulty": 3,
    "prompt": "Propan-2-oli C₃H₈O eliminoi vettä. Päättele alkeenin molekyylikaava atomitaseella.",
    "options": [],
    "correctAnswer": null,
    "explanation": "C₃H₆, koska C₃H₈O − H₂O = C₃H₆.",
    "scoring": "3 p: vähennys 1 p, C₃H₆ 1 p, yhteys alkeeniin 1 p.",
    "hints": [
      "Vähennä H₂O.",
      "Hiilien määrä ei muutu."
    ],
    "skills": [
      "ke04.eli.reaktioyhtaloiden_ja_atomitasapainon_tarkistus",
      "task.atomitasapaino"
    ],
    "expectedConcepts": [
      "Reaktioyhtälöiden ja atomitasapainon tarkistus",
      "ke04.eli.reaktioyhtaloiden_ja_atomitasapainon_tarkistus"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "elimination_vs_substitution",
      "multiple_bond_formation"
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
    "seedKey": "ke04-v3:KE04-ELI-034",
    "contentId": "KE04-ELI-034",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Reaktioyhtälöiden ja atomitasapainon tarkistus",
    "questionType": "short_answer",
    "difficulty": 3,
    "prompt": "Butanoli C₄H₁₀O eliminoi vettä. Mikä on muodostuvan alkeenin molekyylikaava?",
    "options": [],
    "correctAnswer": null,
    "explanation": "C₄H₈.",
    "scoring": "2 p.",
    "hints": [
      "C₄H₁₀O − H₂O.",
      "H:ta jää 8."
    ],
    "skills": [
      "ke04.eli.reaktioyhtaloiden_ja_atomitasapainon_tarkistus",
      "task.atomitasapaino"
    ],
    "expectedConcepts": [
      "Reaktioyhtälöiden ja atomitasapainon tarkistus",
      "ke04.eli.reaktioyhtaloiden_ja_atomitasapainon_tarkistus"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "elimination_vs_substitution",
      "multiple_bond_formation"
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
    "seedKey": "ke04-v3:KE04-ELI-035",
    "contentId": "KE04-ELI-035",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Reaktioyhtälöiden ja atomitasapainon tarkistus",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Tuntemattoman alkoholin molekyylikaava on C₅H₁₂O. Täydellisessä yhden veden eliminaatiossa syntyy yksi alkeeni. Mikä on alkeenin molekyylikaava?",
    "options": [],
    "correctAnswer": null,
    "explanation": "C₅H₁₀.",
    "scoring": "3 p: H₂O:n vähennys 1 p, C₅H₁₀ 1 p, alkeenin yleiskaavan yhteys 1 p.",
    "hints": [
      "Hiilet säilyvät.",
      "Vähennä kaksi H:ta ja yksi O."
    ],
    "skills": [
      "ke04.eli.reaktioyhtaloiden_ja_atomitasapainon_tarkistus",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Reaktioyhtälöiden ja atomitasapainon tarkistus",
      "ke04.eli.reaktioyhtaloiden_ja_atomitasapainon_tarkistus"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "elimination_vs_substitution",
      "multiple_bond_formation"
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
    "seedKey": "ke04-v3:KE04-ELI-036",
    "contentId": "KE04-ELI-036",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Integroivat eliminaatiotehtävät",
    "questionType": "recognition",
    "difficulty": 2,
    "prompt": "Luokittele: a) eteeni + Br₂ → dibromietaani, b) etanoli → eteeni + H₂O, c) bromietaani → etanoli. Käytä tyyppejä additio, eliminaatio, substituutio.",
    "options": [],
    "correctAnswer": null,
    "explanation": "a additio, b eliminaatio, c substituutio.",
    "scoring": "3 p, 1 p / reaktio.",
    "hints": [
      "a C=C kuluu.",
      "b H₂O poistuu.",
      "c Br vaihtuu OH:ksi."
    ],
    "skills": [
      "ke04.eli.integroivat_eliminaatiotehtavat",
      "task.luokittelu"
    ],
    "expectedConcepts": [
      "Integroivat eliminaatiotehtävät",
      "ke04.eli.integroivat_eliminaatiotehtavat"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "elimination_vs_substitution",
      "multiple_bond_formation"
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
    "seedKey": "ke04-v3:KE04-ELI-037",
    "contentId": "KE04-ELI-037",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Integroivat eliminaatiotehtävät",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi eliminaatiotuotteen kaksoissidoksen sijainti kannattaa aina tarkistaa rakennekaavasta eikä vain molekyylikaavasta?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Sama molekyylikaava voi vastata useita rakenneisomeerisiä alkeeneja, joissa C=C sijaitsee eri kohdassa. Molekyylikaava ei kerro sidoksen paikkaa.",
    "scoring": "3 p: isomeria 1 p, eri C=C-sijainti 1 p, molekyylikaavan rajoitus 1 p.",
    "hints": [
      "Vertaa but-1-eeniä ja but-2-eeniä.",
      "Niillä on sama molekyylikaava."
    ],
    "skills": [
      "ke04.eli.integroivat_eliminaatiotehtavat",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Integroivat eliminaatiotehtävät",
      "ke04.eli.integroivat_eliminaatiotehtavat"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "elimination_vs_substitution",
      "multiple_bond_formation"
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
    "seedKey": "ke04-v3:KE04-ELI-038",
    "contentId": "KE04-ELI-038",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Integroivat eliminaatiotehtävät",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija tunnistaa reaktion eliminaatioksi vain siksi, että tuotteita on kaksi. Miksi kriteeri on huono?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Tuotteiden lukumäärä ei yksin määritä reaktiotyyppiä. Eliminaatio tunnistetaan rakennemuutoksesta: ryhmiä poistuu ja usein syntyy C=C.",
    "scoring": "3 p.",
    "hints": [
      "Myös muissa reaktioissa voi olla useita tuotteita.",
      "Katso sidoksia."
    ],
    "skills": [
      "ke04.eli.integroivat_eliminaatiotehtavat",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Integroivat eliminaatiotehtävät",
      "ke04.eli.integroivat_eliminaatiotehtavat"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "organic.elimination_vs_other"
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
    "seedKey": "ke04-v3:KE04-ELI-039",
    "contentId": "KE04-ELI-039",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Integroivat eliminaatiotehtävät",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Lähtöaineessa ei ole kaksoissidosta. Reaktion jälkeen hiilirunko on sama, mutta tuotteessa on C=C ja lisäksi syntyy H₂O. Mitä lähtöaineen rakennetta epäilet ja mikä reaktiotyyppi?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Lähtöaine on todennäköisesti alkoholi, jossa OH ja viereinen H voivat poistua; reaktio on veden eliminaatio/dehydraatio.",
    "scoring": "4 p: alkoholi/OH 2 p, eliminaatio 1 p, veden poistuminen 1 p.",
    "hints": [
      "Mistä H₂O voidaan muodostaa?",
      "Hiilirunko säilyy",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "ke04.eli.integroivat_eliminaatiotehtavat",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Integroivat eliminaatiotehtävät",
      "ke04.eli.integroivat_eliminaatiotehtavat"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "elimination_vs_substitution",
      "multiple_bond_formation"
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
    "seedKey": "ke04-v3:KE04-ELI-040",
    "contentId": "KE04-ELI-040",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "Integroivat eliminaatiotehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "Lähtöaineena on 2-bromipropaani CH₃CHBrCH₃. Reaktiossa A Br korvautuu OH-ryhmällä. Reaktiossa B lähtöaineesta poistuu HBr:n rakenneosat ja muodostuu alkeeni. Reaktiossa C reaktion B alkeeniin additoidaan vettä. a) Nimeä A:n ja B:n orgaaniset tuotteet. b) Luokittele A, B ja C. c) Kuvaa hiili-hiilisidoksen muutos B:ssä ja C:ssä. d) Selitä yhdellä rakenteellisella perusteella, miksi A ei ole eliminaatio.",
    "options": [],
    "correctAnswer": null,
    "explanation": "A:n tuote on propan-2-oli ja A on substituutio. B:n tuote on propeeni ja B on eliminaatio; C–C muuttuu C=C:ksi. C on veden additio propeeniin ja kaksoissidos muuttuu takaisin C–C-yksinkertaiseksi sidokseksi alkoholituotteessa. A ei ole eliminaatio, koska Br korvautuu OH:lla eikä uutta C=C-sidosta muodostu.",
    "scoring": "10 p: kaksi tuotetta 2 p, kolme reaktiotyyppiä 3 p, B:n sidoksen muutos 2 p, C:n sidoksen muutos 2 p, A:n rakenteellinen perustelu 1 p.",
    "hints": [
      "Seuraa ensin sitä, korvautuuko vai poistuuko Br.",
      "Eliminaatiossa C=C syntyy, additiossa C=C kuluu.",
      "Vertaa A:n ja B:n tuotteiden hiili-hiilisidoksia."
    ],
    "skills": [
      "organic.reaction_network",
      "substitution",
      "elimination",
      "addition",
      "structural_reasoning"
    ],
    "expectedConcepts": [
      "Integroivat eliminaatiotehtävät",
      "organic.reaction_network",
      "substitution",
      "elimination",
      "addition",
      "structural_reasoning"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "elimination_vs_substitution",
      "multiple_bond_formation"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 10,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Integroiva vertailu"
  },
  {
    "seedKey": "ke04-v3:KE04-ELI-X01",
    "contentId": "KE04-ELI-X01",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Etanoli muuttuu eteeniksi ja vedeksi. a) Tunnista reaktiotyyppi. b) Mitkä atomit/ryhmät poistuvat etanolista veden muodostamiseksi? c) Mitä tapahtuu C–C-sidokselle?",
    "options": [],
    "correctAnswer": null,
    "explanation": "a) Eliminaatio. b) OH-ryhmä ja viereinen H muodostavat H₂O:n. c) C–C muuttuu C=C-kaksoissidokseksi.",
    "scoring": "6 p: tyyppi 1 p; poistuvat osat 2 p; vesi 1 p; C=C 2 p.",
    "hints": [
      "Eliminaatio poistaa ryhmiä.",
      "Vesi vaatii H:n ja OH:n.",
      "Vapautuneet valenssit muodostavat kaksoissidoksen."
    ],
    "skills": [
      "elimination.dehydration",
      "structural_change"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "elimination.dehydration",
      "structural_change"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "elimination_vs_substitution",
      "multiple_bond_formation"
    ],
    "estimatedSeconds": 309,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 6,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Rakennepäättely"
  },
  {
    "seedKey": "ke04-v3:KE04-ELI-X02",
    "contentId": "KE04-ELI-X02",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "multiple_choice",
    "difficulty": 4,
    "prompt": "2-bromipropaanista muodostuu propeenia. Mikä kuvaus on oikea?",
    "options": [
      "Br korvautuu OH:lla",
      "Br ja viereinen H poistuvat ja C=C syntyy",
      "H₂ additoituu C=C:hen",
      "CO₂ irtoaa karboksyyliryhmästä"
    ],
    "correctAnswer": "Br ja viereinen H poistuvat ja C=C syntyy",
    "explanation": "B.",
    "scoring": "4 p: B 1 p; Br+H 1 p; C=C 2 p.",
    "hints": [
      "Tuote on alkeeni.",
      "Kysy, mikä muutos luo C=C:n",
      "Sulje pois vaihtoehdot vertaamalla jokaista niistä reaktioyhtälöön, rakenteeseen tai määritelmään.."
    ],
    "skills": [
      "elimination.identification"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "elimination.identification"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "confuse_substitution_elimination"
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
    "seedKey": "ke04-v3:KE04-ELI-X03",
    "contentId": "KE04-ELI-X03",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Butan-2-oli voi veden eliminaatiossa antaa but-1-eeniä tai but-2-eeniä. Selitä rakennekaavojen avulla, miksi kaksi kaksoissidoksen sijaintia ovat mahdollisia.",
    "options": [],
    "correctAnswer": null,
    "explanation": "OH on hiilessä 2. Vety voidaan poistaa joko hiilestä 1 tai hiilestä 3, jolloin C=C muodostuu vastaavasti C1–C2 tai C2–C3 väliin. Tuotteet ovat but-1-eeni ja but-2-eeni.",
    "scoring": "6 p: kaksi tuotetta 2 p; kaksi poistumissuuntaa 2 p; C=C-sijainnit 2 p.",
    "hints": [
      "Katso OH-hiilen molempia naapureita.",
      "Kaksoissidos syntyy OH-hiilen ja sen viereisen hiilen välille",
      "Piirrä tarvittaessa lähtö- ja tuoterakenne rinnakkain ja seuraa, mitkä sidokset muuttuvat.."
    ],
    "skills": [
      "elimination.product_isomers",
      "structural_formula"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "elimination.product_isomers",
      "structural_formula"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "elimination_vs_substitution",
      "multiple_bond_formation"
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
    "seedKey": "ke04-v3:KE04-ELI-X04",
    "contentId": "KE04-ELI-X04",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "short_answer",
    "difficulty": 4,
    "prompt": "Propan-2-olin molekyylikaava on C₃H₈O. Yhden H₂O:n eliminaatiossa mikä on orgaanisen tuotteen molekyylikaava? Tarkista atomitase.",
    "options": [],
    "correctAnswer": null,
    "explanation": "C₃H₆. C₃H₈O − H₂O = C₃H₆; tuotteet C₃H₆ + H₂O sisältävät yhteensä C₃H₈O.",
    "scoring": "5 p: kaava 2 p; vähennys 1 p; atomitase 2 p.",
    "hints": [
      "Vähennä lähtöaineesta H₂O.",
      "Hiilien määrä säilyy",
      "Piirrä tarvittaessa lähtö- ja tuoterakenne rinnakkain ja seuraa, mitkä sidokset muuttuvat.."
    ],
    "skills": [
      "elimination.formula",
      "atom_balance"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "elimination.formula",
      "atom_balance"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "elimination_vs_substitution",
      "multiple_bond_formation"
    ],
    "estimatedSeconds": 154,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 5,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Atomitasapaino"
  },
  {
    "seedKey": "ke04-v3:KE04-ELI-X05",
    "contentId": "KE04-ELI-X05",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "error_detection",
    "difficulty": 5,
    "prompt": "Opiskelija sanoo, että eliminaatiossa 'vain yksi ryhmä irtoaa' ja piirtää CH₃CH₂Br→CH₂=CH₂+Br. Osoita kaksi kemiallista ongelmaa esityksessä.",
    "options": [],
    "correctAnswer": null,
    "explanation": "C=C:n muodostuminen vaatii myös H:n poistumisen viereiseltä hiileltä. Lisäksi vapaa neutraali Br-atomi ei kuvaa tavallista yksinkertaistettua tuotteiden esitystä; kokonaisreaktiossa poistuvat ryhmät muodostavat esimerkiksi HBr:n tai olosuhteisiin sopivia ionituotteita.",
    "scoring": "6 p: H:n poistuminen 2 p; C=C-perustelu 2 p; Br-tuotteen ongelma 2 p.",
    "hints": [
      "Kummankin C=C-hiilen täytyy vapauttaa yksi sidontapaikka.",
      "Tarkista myös poistuvien atomien kemiallinen muoto",
      "Nimeä ensin väärä kemiallinen periaate ja vasta sitten sen vaikutus lopputulokseen.."
    ],
    "skills": [
      "elimination.atom_balance",
      "reaction_products"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "elimination.atom_balance",
      "reaction_products"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "single_group_loss"
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
    "seedKey": "ke04-v3:KE04-ELI-X06",
    "contentId": "KE04-ELI-X06",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "application",
    "difficulty": 5,
    "prompt": "Kirjoita rakenteellisesti vastakkaiset reaktiot eteeni + H₂O ⇄ etanoli ja luokittele molemmat suunnat. Selitä veden rooli kummassakin.",
    "options": [],
    "correctAnswer": null,
    "explanation": "CH₂=CH₂+H₂O→CH₃CH₂OH on additio/hydraatio. CH₃CH₂OH→CH₂=CH₂+H₂O on eliminaatio/dehydraatio. Ensimmäisessä vesi liittyy C=C:hen; toisessa vesi poistuu ja C=C syntyy.",
    "scoring": "8 p: kaksi yhtälöä 4 p; luokitukset 2 p; veden rooli 2 p.",
    "hints": [
      "Seuraa C=C:tä.",
      "Additiossa vesi kulutetaan, eliminaatiossa syntyy",
      "Ratkaise osa-alueet erikseen ja yhdistä ne vasta lopulliseen perusteltuun vastaukseen.."
    ],
    "skills": [
      "addition_elimination_pair",
      "hydration_dehydration"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "addition_elimination_pair",
      "hydration_dehydration"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "elimination_vs_substitution",
      "multiple_bond_formation"
    ],
    "estimatedSeconds": 347,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 8,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Reaktioparin vertailu"
  },
  {
    "seedKey": "ke04-v3:KE04-ELI-X07",
    "contentId": "KE04-ELI-X07",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "Aine A on 2-bromibutaani. Se käsitellään olosuhteissa, joissa eliminaatio on mahdollinen. a) Nimeä kaksi paikkaisomeeristä alkeenituotetta, joita voidaan perustasolla ennustaa. b) Selitä, miltä viereisiltä hiililtä H voidaan poistaa. c) Mikä yhteinen molekyylikaava tuotteilla on?",
    "options": [],
    "correctAnswer": null,
    "explanation": "But-1-eeni ja but-2-eeni. Br on hiilessä 2; H voidaan poistaa hiilestä 1 tai 3. Molempien molekyylikaava C₄H₈.",
    "scoring": "10 p: tuotteet 4 p; poistumissuunnat 4 p; kaava 2 p.",
    "hints": [
      "Br-hiilen naapurit ovat C1 ja C3.",
      "Kaksoissidos voi syntyä kumpaankin suuntaan",
      "Piirrä tarvittaessa lähtö- ja tuoterakenne rinnakkain ja seuraa, mitkä sidokset muuttuvat.."
    ],
    "skills": [
      "elimination.product_prediction",
      "isomerism"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "elimination.product_prediction",
      "isomerism"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "elimination_vs_substitution",
      "multiple_bond_formation"
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
    "seedKey": "ke04-v3:KE04-ELI-X08",
    "contentId": "KE04-ELI-X08",
    "chapter": 11,
    "topicName": "Eliminaatioreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "Kolme reaktiota: I CH₃CH₂Br→CH₃CH₂OH, II CH₃CH₂Br→CH₂=CH₂, III CH₂=CH₂→CH₃CH₂Br. Luokittele I–III ja kuvaa jokaisessa yksi ratkaiseva rakennemuutos.",
    "options": [],
    "correctAnswer": null,
    "explanation": "I substituutio: Br→OH. II eliminaatio: Br ja H poistuvat, C=C syntyy. III additio: H/Br liittyvät C=C:hen, C=C→C–C.",
    "scoring": "9 p: jokaisesta oikea tyyppi 1 p + rakennemuutos 2 p.",
    "hints": [
      "Katso korvautuuko, poistuuko vai liittyykö ryhmä.",
      "Seuraa aina C=C-sidosta",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "organic.reaction_classification",
      "substitution",
      "elimination",
      "addition"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "organic.reaction_classification",
      "substitution",
      "elimination",
      "addition"
    ],
    "prerequisites": [
      "organic_structures",
      "multiple_bonds",
      "reaction_classification"
    ],
    "commonErrors": [
      "elimination_vs_substitution",
      "multiple_bond_formation"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 9,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Koereservi – luokittelu"
  }
];
