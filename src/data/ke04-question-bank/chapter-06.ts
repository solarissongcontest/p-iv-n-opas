import type { Ke04SeedQuestion } from "./types";

export const questions: Ke04SeedQuestion[] = [
  {
    "seedKey": "ke04-v3:KE04-SAO-001",
    "contentId": "KE04-SAO-001",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Saostumisreaktion perusidea",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitä saostumisreaktiossa tapahtuu vesiliuoksen ioneille?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kaksi tai useampi liuennut ioni yhdistyy niukkaliukoiseksi kiinteäksi yhdisteeksi eli saostumaksi.",
    "scoring": "2 p: ionit 1 p, kiinteä saostuma 1 p.",
    "hints": [
      "Saostuma on kiinteä aine.",
      "Se muodostuu liuoksessa olevista ioneista."
    ],
    "skills": [
      "ke04.sao.saostumisreaktion_perusidea",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Saostumisreaktion perusidea",
      "ke04.sao.saostumisreaktion_perusidea"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
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
    "seedKey": "ke04-v3:KE04-SAO-002",
    "contentId": "KE04-SAO-002",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Saostumisreaktion perusidea",
    "questionType": "multiple_choice",
    "difficulty": 1,
    "prompt": "Mikä merkintä kuvaa saostumaa reaktioyhtälössä?",
    "options": [
      "(aq)",
      "(s)",
      "(g)",
      "(l)"
    ],
    "correctAnswer": "(s)",
    "explanation": "B, (s).",
    "scoring": "1 p.",
    "hints": [
      "s = solid.",
      "aq tarkoittaa vesiliuosta."
    ],
    "skills": [
      "ke04.sao.saostumisreaktion_perusidea",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Saostumisreaktion perusidea",
      "ke04.sao.saostumisreaktion_perusidea"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "precipitation.solid_vs_aqueous"
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
    "seedKey": "ke04-v3:KE04-SAO-003",
    "contentId": "KE04-SAO-003",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Saostumisreaktion perusidea",
    "questionType": "matching",
    "difficulty": 2,
    "prompt": "Yhdistä olomuotomerkinnät: aq, s, l, g ↔ vesiliuos, kiinteä, neste, kaasu.",
    "options": [],
    "correctAnswer": null,
    "explanation": "aq→vesiliuos; s→kiinteä; l→neste; g→kaasu.",
    "scoring": "4 p, 1 p / pari.",
    "hints": [
      "Englanninkieliset lyhenteet auttavat.",
      "aqueous, solid, liquid, gas."
    ],
    "skills": [
      "ke04.sao.saostumisreaktion_perusidea",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Saostumisreaktion perusidea",
      "ke04.sao.saostumisreaktion_perusidea"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
    ],
    "estimatedSeconds": 133,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "aq",
        "right": "vesiliuos"
      },
      {
        "left": "s",
        "right": "kiinteä"
      },
      {
        "left": "l",
        "right": "neste"
      },
      {
        "left": "g",
        "right": "kaasu."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-SAO-004",
    "contentId": "KE04-SAO-004",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Saostumisreaktion perusidea",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi saostumisreaktio voidaan havaita usein sameutumisena?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Liuokseen muodostuu pieniä kiinteän aineen hiukkasia, jotka sirottavat valoa ja tekevät liuoksesta samean.",
    "scoring": "3 p: kiinteät hiukkaset 1 p, valonsironta 1 p, sameus 1 p.",
    "hints": [
      "Saostuma ei ole enää liuennut.",
      "Pienet hiukkaset vaikuttavat valoon."
    ],
    "skills": [
      "ke04.sao.saostumisreaktion_perusidea",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Saostumisreaktion perusidea",
      "ke04.sao.saostumisreaktion_perusidea"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
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
    "seedKey": "ke04-v3:KE04-SAO-005",
    "contentId": "KE04-SAO-005",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Saostumisreaktion perusidea",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Väite: 'Saostuma on aina kaasu, joka kuplii ulos liuoksesta.' Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Saostuma on kiinteä niukkaliukoinen aine. Kaasun muodostuminen on eri havainto ja voi kuulua toisenlaiseen reaktioon.",
    "scoring": "2 p: kiinteä 1 p, kaasun erottaminen 1 p.",
    "hints": [
      "Muista merkintä (s).",
      "Kuplat liittyvät kaasuun."
    ],
    "skills": [
      "ke04.sao.saostumisreaktion_perusidea",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Saostumisreaktion perusidea",
      "ke04.sao.saostumisreaktion_perusidea"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "precipitation.solid_vs_aqueous"
    ],
    "estimatedSeconds": 194,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Virheen tunnistus"
  },
  {
    "seedKey": "ke04-v3:KE04-SAO-006",
    "contentId": "KE04-SAO-006",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Tyypillisiä niukkaliukoisia yhdisteitä",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mikä saostuma muodostuu, kun Ag⁺- ja Cl⁻-ionit kohtaavat vesiliuoksessa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Hopeakloridi AgCl(s).",
    "scoring": "2 p: AgCl 1 p, (s) 1 p.",
    "hints": [
      "Yhdistä ionien varaukset 1:1.",
      "Hopeakloridi on niukkaliukoinen."
    ],
    "skills": [
      "ke04.sao.tyypillisia_niukkaliukoisia_yhdisteita",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Tyypillisiä niukkaliukoisia yhdisteitä",
      "ke04.sao.tyypillisia_niukkaliukoisia_yhdisteita"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
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
    "seedKey": "ke04-v3:KE04-SAO-007",
    "contentId": "KE04-SAO-007",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Tyypillisiä niukkaliukoisia yhdisteitä",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Mikä pari muodostaa BaSO₄-saostuman?",
    "options": [
      "Ba²⁺ + SO₄²⁻",
      "Na⁺ + NO₃⁻",
      "K⁺ + Cl⁻",
      "H⁺ + OH⁻"
    ],
    "correctAnswer": "Ba²⁺ + SO₄²⁻",
    "explanation": "A.",
    "scoring": "1 p.",
    "hints": [
      "Barium ja sulfaatti.",
      "Varaukset kumoutuvat 1:1."
    ],
    "skills": [
      "ke04.sao.tyypillisia_niukkaliukoisia_yhdisteita",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Tyypillisiä niukkaliukoisia yhdisteitä",
      "ke04.sao.tyypillisia_niukkaliukoisia_yhdisteita"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "precipitation.solid_vs_aqueous"
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
    "seedKey": "ke04-v3:KE04-SAO-008",
    "contentId": "KE04-SAO-008",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Tyypillisiä niukkaliukoisia yhdisteitä",
    "questionType": "recognition",
    "difficulty": 2,
    "prompt": "Kirjoita kalsiumkarbonaatin kaava ioneista Ca²⁺ ja CO₃²⁻.",
    "options": [],
    "correctAnswer": null,
    "explanation": "CaCO₃.",
    "scoring": "2 p: oikea suhde 1 p, kaava 1 p.",
    "hints": [
      "Varaukset ovat yhtä suuret vastakkaismerkkisinä.",
      "Suhde 1:1."
    ],
    "skills": [
      "ke04.sao.tyypillisia_niukkaliukoisia_yhdisteita",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Tyypillisiä niukkaliukoisia yhdisteitä",
      "ke04.sao.tyypillisia_niukkaliukoisia_yhdisteita"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
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
    "seedKey": "ke04-v3:KE04-SAO-009",
    "contentId": "KE04-SAO-009",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Tyypillisiä niukkaliukoisia yhdisteitä",
    "questionType": "matching",
    "difficulty": 3,
    "prompt": "Yhdistä ionipari ja saostuma: Ag⁺+Cl⁻, Ba²⁺+SO₄²⁻, Ca²⁺+CO₃²⁻ ↔ AgCl, BaSO₄, CaCO₃.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Ag⁺+Cl⁻→AgCl; Ba²⁺+SO₄²⁻→BaSO₄; Ca²⁺+CO₃²⁻→CaCO₃.",
    "scoring": "3 p.",
    "hints": [
      "Muodosta sähköisesti neutraali kaava.",
      "Kaikissa suhde on 1:1."
    ],
    "skills": [
      "ke04.sao.tyypillisia_niukkaliukoisia_yhdisteita",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Tyypillisiä niukkaliukoisia yhdisteitä",
      "ke04.sao.tyypillisia_niukkaliukoisia_yhdisteita"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
    ],
    "estimatedSeconds": 155,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "Ag⁺+Cl⁻",
        "right": "AgCl"
      },
      {
        "left": "Ba²⁺+SO₄²⁻",
        "right": "BaSO₄"
      },
      {
        "left": "Ca²⁺+CO₃²⁻",
        "right": "CaCO₃."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-SAO-010",
    "contentId": "KE04-SAO-010",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Tyypillisiä niukkaliukoisia yhdisteitä",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija kirjoittaa Ag⁺ + Cl⁻ → AgCl(aq) saostumisreaktioksi. Mikä merkintä on väärin?",
    "options": [],
    "correctAnswer": null,
    "explanation": "AgCl tulee merkitä AgCl(s), koska saostuma on kiinteä niukkaliukoinen aine.",
    "scoring": "2 p: (s) 1 p, perustelu 1 p.",
    "hints": [
      "Saostuma ei ole aq.",
      "Käytä solid-merkintää."
    ],
    "skills": [
      "ke04.sao.tyypillisia_niukkaliukoisia_yhdisteita",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Tyypillisiä niukkaliukoisia yhdisteitä",
      "ke04.sao.tyypillisia_niukkaliukoisia_yhdisteita"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "precipitation.solid_vs_aqueous"
    ],
    "estimatedSeconds": 194,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Virheen tunnistus"
  },
  {
    "seedKey": "ke04-v3:KE04-SAO-011",
    "contentId": "KE04-SAO-011",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Nettoioniyhtälöt",
    "questionType": "short_answer",
    "difficulty": 1,
    "prompt": "Kirjoita hopeakloridin saostumisen nettoioniyhtälö.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Ag⁺(aq) + Cl⁻(aq) → AgCl(s).",
    "scoring": "3 p: ionit 1 p, oikea suhde 1 p, (s) 1 p.",
    "hints": [
      "Jätä sivuionit pois.",
      "Suhde 1:1."
    ],
    "skills": [
      "ke04.sao.nettoioniyhtalot",
      "task.reaktio"
    ],
    "expectedConcepts": [
      "Nettoioniyhtälöt",
      "ke04.sao.nettoioniyhtalot"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
    ],
    "estimatedSeconds": 98,
    "examEligible": false,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Reaktio"
  },
  {
    "seedKey": "ke04-v3:KE04-SAO-012",
    "contentId": "KE04-SAO-012",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Nettoioniyhtälöt",
    "questionType": "short_answer",
    "difficulty": 2,
    "prompt": "Kirjoita bariumsulfaatin saostumisen nettoioniyhtälö.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s).",
    "scoring": "3 p.",
    "hints": [
      "Varaukset kumoutuvat 1:1.",
      "Tuote on kiinteä."
    ],
    "skills": [
      "ke04.sao.nettoioniyhtalot",
      "task.reaktio"
    ],
    "expectedConcepts": [
      "Nettoioniyhtälöt",
      "ke04.sao.nettoioniyhtalot"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
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
    "seedKey": "ke04-v3:KE04-SAO-013",
    "contentId": "KE04-SAO-013",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Nettoioniyhtälöt",
    "questionType": "short_answer",
    "difficulty": 2,
    "prompt": "Kirjoita kalsiumkarbonaatin saostumisen nettoioniyhtälö.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Ca²⁺(aq) + CO₃²⁻(aq) → CaCO₃(s).",
    "scoring": "3 p.",
    "hints": [
      "2+ ja 2− kumoutuvat.",
      "Lisää olomuodot."
    ],
    "skills": [
      "ke04.sao.nettoioniyhtalot",
      "task.reaktio"
    ],
    "expectedConcepts": [
      "Nettoioniyhtälöt",
      "ke04.sao.nettoioniyhtalot"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
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
    "seedKey": "ke04-v3:KE04-SAO-014",
    "contentId": "KE04-SAO-014",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Nettoioniyhtälöt",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Mitä tarkoitetaan sivuioneilla saostumisreaktiossa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Ioneja, jotka ovat liuoksessa ennen ja jälkeen reaktion muuttumattomina eivätkä kuulu nettoioniyhtälön varsinaiseen kemialliseen muutokseen.",
    "scoring": "3 p: muuttumattomuus 1 p, liuoksessa 1 p, poistetaan nettoyhtälöstä 1 p.",
    "hints": [
      "Vertaa täydellistä ioniyhtälöä ennen ja jälkeen.",
      "Samat ionit voidaan supistaa pois."
    ],
    "skills": [
      "ke04.sao.nettoioniyhtalot",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Nettoioniyhtälöt",
      "ke04.sao.nettoioniyhtalot"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
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
    "seedKey": "ke04-v3:KE04-SAO-015",
    "contentId": "KE04-SAO-015",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Nettoioniyhtälöt",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "NaCl(aq)+AgNO₃(aq)→AgCl(s)+NaNO₃(aq). Opiskelija väittää Na⁺ ja NO₃⁻ osallistuvan saostuman muodostumiseen. Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Saostuman muodostavat Ag⁺ ja Cl⁻. Na⁺ ja NO₃⁻ ovat sivuioneja ja jäävät liuokseen.",
    "scoring": "3 p: Ag⁺+Cl⁻ 1 p, Na⁺/NO₃⁻ sivuioneja 1 p, liuokseen jääminen 1 p.",
    "hints": [
      "Katso mikä aine on (s).",
      "Mitkä ionit kuuluvat sen kaavaan?"
    ],
    "skills": [
      "ke04.sao.nettoioniyhtalot",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Nettoioniyhtälöt",
      "ke04.sao.nettoioniyhtalot"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "precipitation.solid_vs_aqueous"
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
    "seedKey": "ke04-v3:KE04-SAO-016",
    "contentId": "KE04-SAO-016",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Saostumisreaktioiden stoikiometria",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Kuinka monta moolia AgCl:ää muodostuu 0,200 mol Ag⁺:sta, kun Cl⁻ on ylimäärin?",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,200 mol AgCl, koska suhde Ag⁺:AgCl = 1:1.",
    "scoring": "2 p.",
    "hints": [
      "Nettoyhtälö 1:1.",
      "Cl⁻ ei rajoita."
    ],
    "skills": [
      "ke04.sao.saostumisreaktioiden_stoikiometria",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Saostumisreaktioiden stoikiometria",
      "ke04.sao.saostumisreaktioiden_stoikiometria"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
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
    "seedKey": "ke04-v3:KE04-SAO-017",
    "contentId": "KE04-SAO-017",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Saostumisreaktioiden stoikiometria",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Kuinka monta moolia BaSO₄:ää muodostuu 0,0750 mol Ba²⁺:sta, kun SO₄²⁻ on ylimäärin?",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,0750 mol BaSO₄.",
    "scoring": "2 p.",
    "hints": [
      "Suhde 1:1.",
      "Käytä rajoittavaa ionia."
    ],
    "skills": [
      "ke04.sao.saostumisreaktioiden_stoikiometria",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Saostumisreaktioiden stoikiometria",
      "ke04.sao.saostumisreaktioiden_stoikiometria"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
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
    "seedKey": "ke04-v3:KE04-SAO-018",
    "contentId": "KE04-SAO-018",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Saostumisreaktioiden stoikiometria",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "0,100 mol Ca²⁺ ja 0,060 mol CO₃²⁻ sekoitetaan. Kuinka monta moolia CaCO₃-saostumaa enintään muodostuu?",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,060 mol, koska suhde on 1:1 ja CO₃²⁻ on rajoittava.",
    "scoring": "4 p: suhde 1 p, rajoittava 1 p, lasku 1 p, tulos 1 p.",
    "hints": [
      "Vertaa moolimääriä 1:1-suhteessa.",
      "Pienempi loppuu ensin."
    ],
    "skills": [
      "ke04.sao.saostumisreaktioiden_stoikiometria",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Saostumisreaktioiden stoikiometria",
      "ke04.sao.saostumisreaktioiden_stoikiometria"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
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
    "seedKey": "ke04-v3:KE04-SAO-019",
    "contentId": "KE04-SAO-019",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Saostumisreaktioiden stoikiometria",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "0,0500 mol AgCl:ää muodostuu. Laske massa, kun M(AgCl)=143,3 g/mol.",
    "options": [],
    "correctAnswer": null,
    "explanation": "m=nM=0,0500×143,3=7,17 g.",
    "scoring": "3 p: kaava 1 p, lasku 1 p, yksikkö 1 p.",
    "hints": [
      "m=nM.",
      "Kerro moolit moolimassalla."
    ],
    "skills": [
      "ke04.sao.saostumisreaktioiden_stoikiometria",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Saostumisreaktioiden stoikiometria",
      "ke04.sao.saostumisreaktioiden_stoikiometria"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
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
    "seedKey": "ke04-v3:KE04-SAO-020",
    "contentId": "KE04-SAO-020",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Saostumisreaktioiden stoikiometria",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Sekoitetaan 0,0800 mol Ag⁺ ja 0,0500 mol Cl⁻. Laske AgCl:n enimmäisainemäärä ja ylimääräiseksi jäävän Ag⁺:n ainemäärä.",
    "options": [],
    "correctAnswer": null,
    "explanation": "AgCl muodostuu 0,0500 mol; Ag⁺ jää 0,0800−0,0500=0,0300 mol.",
    "scoring": "5 p: 1:1 1 p, Cl⁻ rajoittava 1 p, AgCl 1 p, ylimäärän lasku 1 p, tulos/yksikkö 1 p.",
    "hints": [
      "Reaktio 1:1.",
      "Cl⁻ loppuu ensin.",
      "Vähennä kulunut Ag⁺."
    ],
    "skills": [
      "ke04.sao.saostumisreaktioiden_stoikiometria",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Saostumisreaktioiden stoikiometria",
      "ke04.sao.saostumisreaktioiden_stoikiometria"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
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
    "seedKey": "ke04-v3:KE04-SAO-021",
    "contentId": "KE04-SAO-021",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Hajoamisreaktion perusidea",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitä hajoamisreaktiossa tapahtuu?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Yksi yhdiste hajoaa kahdeksi tai useammaksi yksinkertaisemmaksi aineeksi.",
    "scoring": "2 p.",
    "hints": [
      "Yksi lähtöaine, useita tuotteita.",
      "Vastakohta rakentavalle reaktiolle."
    ],
    "skills": [
      "ke04.sao.hajoamisreaktion_perusidea",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Hajoamisreaktion perusidea",
      "ke04.sao.hajoamisreaktion_perusidea"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
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
    "seedKey": "ke04-v3:KE04-SAO-022",
    "contentId": "KE04-SAO-022",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Hajoamisreaktion perusidea",
    "questionType": "multiple_choice",
    "difficulty": 1,
    "prompt": "Mikä yleinen muoto kuvaa hajoamisreaktiota?",
    "options": [
      "AB→A+B",
      "A+B→AB",
      "AB+CD→AD+CB",
      "C=C+H₂→C–C-tyyppinen additiotuote"
    ],
    "correctAnswer": "AB→A+B",
    "explanation": "A.",
    "scoring": "1 p.",
    "hints": [
      "Yksi yhdiste hajoaa.",
      "Tuotteita syntyy useita."
    ],
    "skills": [
      "ke04.sao.hajoamisreaktion_perusidea",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Hajoamisreaktion perusidea",
      "ke04.sao.hajoamisreaktion_perusidea"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "decomposition.vs_combustion"
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
    "seedKey": "ke04-v3:KE04-SAO-023",
    "contentId": "KE04-SAO-023",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Hajoamisreaktion perusidea",
    "questionType": "matching",
    "difficulty": 2,
    "prompt": "Yhdistä: hajoaminen, saostuminen ↔ yksi yhdiste pilkkoutuu; liuenneista ioneista muodostuu kiinteä aine.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Hajoaminen → yksi yhdiste pilkkoutuu; saostuminen → ioneista muodostuu kiinteä aine.",
    "scoring": "2 p.",
    "hints": [
      "Tarkastele lähtöaineiden määrää ja olomuotoa.",
      "Saostuma syntyy liuoksesta."
    ],
    "skills": [
      "ke04.sao.hajoamisreaktion_perusidea",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Hajoamisreaktion perusidea",
      "ke04.sao.hajoamisreaktion_perusidea"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
    ],
    "estimatedSeconds": 133,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "Hajoaminen",
        "right": "yksi yhdiste pilkkoutuu"
      },
      {
        "left": "saostuminen",
        "right": "ioneista muodostuu kiinteä aine."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-SAO-024",
    "contentId": "KE04-SAO-024",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Hajoamisreaktion perusidea",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi kuumentaminen voi käynnistää joidenkin yhdisteiden hajoamisen?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Lämpöenergia voi auttaa rikkomaan yhdisteen sidoksia ja mahdollistaa termisesti suotuisamman tuotteiden muodostumisen.",
    "scoring": "2 p: energia/sidokset 1 p, hajoamisen mahdollistuminen 1 p.",
    "hints": [
      "Sidosten katkaisu vaatii usein energiaa.",
      "Kuumennus antaa energiaa."
    ],
    "skills": [
      "ke04.sao.hajoamisreaktion_perusidea",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Hajoamisreaktion perusidea",
      "ke04.sao.hajoamisreaktion_perusidea"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
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
    "seedKey": "ke04-v3:KE04-SAO-025",
    "contentId": "KE04-SAO-025",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Hajoamisreaktion perusidea",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Väite: 'Kaikki hajoamisreaktiot ovat palamisreaktioita.' Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Väärin. Hajoamisessa yksi yhdiste pilkkoutuu; palamisessa aine reagoi hapen kanssa. Hajoamiseen ei välttämättä liity O₂:ta lainkaan.",
    "scoring": "3 p: ero 2 p, O₂ ei välttämätön 1 p.",
    "hints": [
      "Katso lähtöaineiden määrä.",
      "Palaminen tarvitsee hapettimen."
    ],
    "skills": [
      "ke04.sao.hajoamisreaktion_perusidea",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Hajoamisreaktion perusidea",
      "ke04.sao.hajoamisreaktion_perusidea"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "decomposition.vs_combustion"
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
    "seedKey": "ke04-v3:KE04-SAO-026",
    "contentId": "KE04-SAO-026",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Tyypillisiä hajoamisreaktioita",
    "questionType": "short_answer",
    "difficulty": 1,
    "prompt": "Tasapainota vetyperoksidin hajoaminen: H₂O₂ → H₂O + O₂.",
    "options": [],
    "correctAnswer": null,
    "explanation": "2H₂O₂ → 2H₂O + O₂.",
    "scoring": "3 p: kertoimet 2,2,1 2 p, atomitase 1 p.",
    "hints": [
      "Tee happiatomeille parillinen määrä.",
      "Kokeile kerrointa 2 H₂O₂:lle."
    ],
    "skills": [
      "ke04.sao.tyypillisia_hajoamisreaktioita",
      "task.reaktio"
    ],
    "expectedConcepts": [
      "Tyypillisiä hajoamisreaktioita",
      "ke04.sao.tyypillisia_hajoamisreaktioita"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
    ],
    "estimatedSeconds": 98,
    "examEligible": false,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Reaktio"
  },
  {
    "seedKey": "ke04-v3:KE04-SAO-027",
    "contentId": "KE04-SAO-027",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Tyypillisiä hajoamisreaktioita",
    "questionType": "recognition",
    "difficulty": 2,
    "prompt": "Mikä kaasu muodostuu vetyperoksidin hajoamisessa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Happi O₂.",
    "scoring": "1 p.",
    "hints": [
      "Yhtälön toinen tuote veden lisäksi.",
      "Kaasu tukee palamista."
    ],
    "skills": [
      "ke04.sao.tyypillisia_hajoamisreaktioita",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Tyypillisiä hajoamisreaktioita",
      "ke04.sao.tyypillisia_hajoamisreaktioita"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
    ],
    "estimatedSeconds": 83,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 1,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Tunnistus"
  },
  {
    "seedKey": "ke04-v3:KE04-SAO-028",
    "contentId": "KE04-SAO-028",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Tyypillisiä hajoamisreaktioita",
    "questionType": "short_answer",
    "difficulty": 2,
    "prompt": "Kirjoita kalsiumkarbonaatin terminen hajoaminen.",
    "options": [],
    "correctAnswer": null,
    "explanation": "CaCO₃(s) → CaO(s) + CO₂(g).",
    "scoring": "3 p: CaO 1 p, CO₂ 1 p, tasapaino/olomuodot 1 p.",
    "hints": [
      "Karbonaatti voi antaa oksidin ja CO₂:n.",
      "Ca säilyy CaO:ssa."
    ],
    "skills": [
      "ke04.sao.tyypillisia_hajoamisreaktioita",
      "task.reaktio"
    ],
    "expectedConcepts": [
      "Tyypillisiä hajoamisreaktioita",
      "ke04.sao.tyypillisia_hajoamisreaktioita"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
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
    "seedKey": "ke04-v3:KE04-SAO-029",
    "contentId": "KE04-SAO-029",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Tyypillisiä hajoamisreaktioita",
    "questionType": "short_answer",
    "difficulty": 3,
    "prompt": "Tarkista CaCO₃ → CaO + CO₂ atomitasapaino.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Ca:1=1, C:1=1, O:3=1+2=3. Yhtälö on tasapainossa.",
    "scoring": "3 p, 1 p / alkuaine.",
    "hints": [
      "Laske Ca, C, O.",
      "Summaa tuotteiden O:t."
    ],
    "skills": [
      "ke04.sao.tyypillisia_hajoamisreaktioita",
      "task.atomitasapaino"
    ],
    "expectedConcepts": [
      "Tyypillisiä hajoamisreaktioita",
      "ke04.sao.tyypillisia_hajoamisreaktioita"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
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
    "seedKey": "ke04-v3:KE04-SAO-030",
    "contentId": "KE04-SAO-030",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Tyypillisiä hajoamisreaktioita",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija kirjoittaa 2H₂O₂ → H₂O + O₂. Mikä ei täsmää?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Vety ei säily: vasemmalla 4 H, oikealla 2. Oikea yhtälö on 2H₂O₂ → 2H₂O + O₂.",
    "scoring": "3 p: H-epätasapaino 1 p, oikea H₂O-kerroin 1 p, yhtälö 1 p.",
    "hints": [
      "Laske H ensin.",
      "Veden kerroin pitää olla 2."
    ],
    "skills": [
      "ke04.sao.tyypillisia_hajoamisreaktioita",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Tyypillisiä hajoamisreaktioita",
      "ke04.sao.tyypillisia_hajoamisreaktioita"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "sao.common_misconception"
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
    "seedKey": "ke04-v3:KE04-SAO-031",
    "contentId": "KE04-SAO-031",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Hajoamisen stoikiometria",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Kuinka monta moolia O₂ muodostuu 4,00 mol H₂O₂:n täydellisessä hajoamisessa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "2,00 mol O₂, koska 2H₂O₂→O₂.",
    "scoring": "3 p: suhde 2:1 1 p, lasku 1 p, yksikkö 1 p.",
    "hints": [
      "Jaa H₂O₂:n moolit kahdella.",
      "Kertoimet kertovat suhteen."
    ],
    "skills": [
      "ke04.sao.hajoamisen_stoikiometria",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Hajoamisen stoikiometria",
      "ke04.sao.hajoamisen_stoikiometria"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
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
    "seedKey": "ke04-v3:KE04-SAO-032",
    "contentId": "KE04-SAO-032",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Hajoamisen stoikiometria",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Kuinka monta moolia CO₂ muodostuu 0,250 mol CaCO₃:n hajotessa täydellisesti?",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,250 mol CO₂, suhde 1:1.",
    "scoring": "2 p.",
    "hints": [
      "CaCO₃:CO₂ = 1:1.",
      "Sama ainemäärä."
    ],
    "skills": [
      "ke04.sao.hajoamisen_stoikiometria",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Hajoamisen stoikiometria",
      "ke04.sao.hajoamisen_stoikiometria"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
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
    "seedKey": "ke04-v3:KE04-SAO-033",
    "contentId": "KE04-SAO-033",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Hajoamisen stoikiometria",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "10,0 g CaCO₃:a (M≈100,1 g/mol) hajoaa. Arvioi muodostuvan CO₂:n ainemäärä.",
    "options": [],
    "correctAnswer": null,
    "explanation": "n(CaCO₃)=10,0/100,1≈0,0999 mol, joten n(CO₂)≈0,0999 mol.",
    "scoring": "4 p: n lasku 2 p, 1:1 1 p, tulos 1 p.",
    "hints": [
      "Muuta massa mooleiksi.",
      "Käytä 1:1-suhdetta."
    ],
    "skills": [
      "ke04.sao.hajoamisen_stoikiometria",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Hajoamisen stoikiometria",
      "ke04.sao.hajoamisen_stoikiometria"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
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
    "seedKey": "ke04-v3:KE04-SAO-034",
    "contentId": "KE04-SAO-034",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Hajoamisen stoikiometria",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "0,100 mol CaCO₃ hajoaa. Mikä on muodostuvan CO₂:n massa, kun M(CO₂)=44,0 g/mol?",
    "options": [],
    "correctAnswer": null,
    "explanation": "4,40 g CO₂.",
    "scoring": "3 p: n=0,100 1 p, m=nM 1 p, 4,40 g 1 p.",
    "hints": [
      "1:1-suhde.",
      "0,100×44,0."
    ],
    "skills": [
      "ke04.sao.hajoamisen_stoikiometria",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Hajoamisen stoikiometria",
      "ke04.sao.hajoamisen_stoikiometria"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
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
    "seedKey": "ke04-v3:KE04-SAO-035",
    "contentId": "KE04-SAO-035",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Hajoamisen stoikiometria",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "34,0 g H₂O₂:a (M≈34,0 g/mol) hajoaa täydellisesti. Kuinka monta moolia ja grammaa O₂ muodostuu? M(O₂)=32,0 g/mol.",
    "options": [],
    "correctAnswer": null,
    "explanation": "n(H₂O₂)=1,00 mol; n(O₂)=0,500 mol; m(O₂)=16,0 g.",
    "scoring": "6 p: H₂O₂-molit 2 p, suhde 2:1 1 p, O₂-molit 1 p, massa 1 p, yksikkö 1 p.",
    "hints": [
      "34,0 g H₂O₂ = 1 mol.",
      "O₂:ta puolet mooleista.",
      "m=nM."
    ],
    "skills": [
      "ke04.sao.hajoamisen_stoikiometria",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Hajoamisen stoikiometria",
      "ke04.sao.hajoamisen_stoikiometria"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
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
    "seedKey": "ke04-v3:KE04-SAO-036",
    "contentId": "KE04-SAO-036",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Integroiva saostumis- ja hajoamisreaktioiden vertailu",
    "questionType": "recognition",
    "difficulty": 2,
    "prompt": "Luokittele: a) Ag⁺+Cl⁻→AgCl(s), b) 2H₂O₂→2H₂O+O₂, c) Ca²⁺+CO₃²⁻→CaCO₃(s).",
    "options": [],
    "correctAnswer": null,
    "explanation": "a saostuminen, b hajoaminen, c saostuminen.",
    "scoring": "3 p.",
    "hints": [
      "(s) ioneista = saostuminen.",
      "Yksi yhdiste useiksi tuotteiksi = hajoaminen."
    ],
    "skills": [
      "ke04.sao.integroiva_saostumis_ja_hajoamisreaktioiden_vertailu",
      "task.luokittelu"
    ],
    "expectedConcepts": [
      "Integroiva saostumis- ja hajoamisreaktioiden vertailu",
      "ke04.sao.integroiva_saostumis_ja_hajoamisreaktioiden_vertailu"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
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
    "seedKey": "ke04-v3:KE04-SAO-037",
    "contentId": "KE04-SAO-037",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Integroiva saostumis- ja hajoamisreaktioiden vertailu",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Mikä havainto erottaa tyypillisesti saostumisreaktion vetyperoksidin hajoamisesta?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Saostumisessa muodostuu kiinteä aine/sameus, kun vetyperoksidin hajoamisessa muodostuu O₂-kaasua ja kuplia.",
    "scoring": "3 p: kiinteä/sameus 1 p, kaasu/kuplat 1 p, oikea vertailu 1 p.",
    "hints": [
      "Mieti olomuotoja.",
      "(s) vs (g)."
    ],
    "skills": [
      "ke04.sao.integroiva_saostumis_ja_hajoamisreaktioiden_vertailu",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Integroiva saostumis- ja hajoamisreaktioiden vertailu",
      "ke04.sao.integroiva_saostumis_ja_hajoamisreaktioiden_vertailu"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
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
    "seedKey": "ke04-v3:KE04-SAO-038",
    "contentId": "KE04-SAO-038",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Integroiva saostumis- ja hajoamisreaktioiden vertailu",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Väite: 'CaCO₃(s)→CaO(s)+CO₂(g) on saostumisreaktio, koska lähtöaine on kiinteä.' Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Se on hajoamisreaktio: yksi yhdiste hajoaa kahdeksi tuotteeksi. Saostumisessa kiinteä tuote muodostuu liuenneista ioneista.",
    "scoring": "3 p: hajoaminen 1 p, yksi→useita 1 p, saostumisen määritelmä 1 p.",
    "hints": [
      "Reaktiotyyppi ei määräydy vain kiinteästä olomuodosta.",
      "Katso lähtöaineiden ja tuotteiden rakenne."
    ],
    "skills": [
      "ke04.sao.integroiva_saostumis_ja_hajoamisreaktioiden_vertailu",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Integroiva saostumis- ja hajoamisreaktioiden vertailu",
      "ke04.sao.integroiva_saostumis_ja_hajoamisreaktioiden_vertailu"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "precipitation.solid_vs_aqueous"
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
    "seedKey": "ke04-v3:KE04-SAO-039",
    "contentId": "KE04-SAO-039",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Integroiva saostumis- ja hajoamisreaktioiden vertailu",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Liuokset sisältävät 0,030 mol Ag⁺ ja 0,050 mol Cl⁻. Saostumisen jälkeen kuinka paljon Cl⁻:aa jää, jos reaktio on 1:1?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Ag⁺ on rajoittava; AgCl muodostuu 0,030 mol ja Cl⁻:aa jää 0,050−0,030=0,020 mol.",
    "scoring": "4 p: rajoittava 1 p, saostuma 1 p, vähennys 1 p, tulos 1 p.",
    "hints": [
      "Vertaa mooleja 1:1.",
      "Pienempi loppuu",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "ke04.sao.integroiva_saostumis_ja_hajoamisreaktioiden_vertailu",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Integroiva saostumis- ja hajoamisreaktioiden vertailu",
      "ke04.sao.integroiva_saostumis_ja_hajoamisreaktioiden_vertailu"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
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
    "seedKey": "ke04-v3:KE04-SAO-040",
    "contentId": "KE04-SAO-040",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "Integroiva saostumis- ja hajoamisreaktioiden vertailu",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "Kalsiumioneja sisältävään liuokseen lisätään ylimäärin karbonaatti-ioneja ja saadaan 2,50 g CaCO₃-saostumaa. Saostuma erotetaan, kuivataan ja kuumennetaan reaktiossa CaCO₃(s) → CaO(s) + CO₂(g). Käytä M(CaCO₃)=100,1 g/mol. a) Kirjoita CaCO₃:n muodostumisen nettoioniyhtälö. b) Laske saostuneen CaCO₃:n ainemäärä. c) Laske täydellisessä hajoamisessa muodostuvan CO₂:n ainemäärä. d) Luokittele kumpikin reaktio ja nimeä yksi havainto, joka tukisi kumpaakin luokitusta.",
    "options": [],
    "correctAnswer": null,
    "explanation": "a) Ca²⁺(aq)+CO₃²⁻(aq)→CaCO₃(s). b) n=2,50/100,1≈0,0250 mol. c) Suhde CaCO₃:CO₂=1:1, joten n(CO₂)≈0,0250 mol. d) Ensimmäinen on saostumisreaktio, jota tukee kiinteän/samean saostuman synty; toinen on hajoamisreaktio, jota tukee kaasun vapautuminen kuumennettaessa ja yhden yhdisteen muuttuminen useiksi tuotteiksi.",
    "scoring": "10 p: nettoioniyhtälö 3 p, CaCO₃:n ainemäärä 2 p, CO₂:n ainemäärä ja reaktiosuhde 2 p, reaktiotyyppien luokittelu 2 p, havaintoperustelu 1 p.",
    "hints": [
      "Ensimmäisessä vaiheessa liuenneista ioneista syntyy kiinteä aine.",
      "Muuta 2,50 g ensin mooleiksi ja käytä hajoamisreaktion 1:1-suhdetta.",
      "Erota toisistaan havainto ja reaktiotyypin määritelmä."
    ],
    "skills": [
      "precipitation.net_ionic",
      "decomposition.stoichiometry",
      "reaction.classification",
      "experimental.observation"
    ],
    "expectedConcepts": [
      "Integroiva saostumis- ja hajoamisreaktioiden vertailu",
      "precipitation.net_ionic",
      "decomposition.stoichiometry",
      "reaction.classification",
      "experimental.observation"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 10,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Integroiva tehtävä"
  },
  {
    "seedKey": "ke04-v3:KE04-SAO-X01",
    "contentId": "KE04-SAO-X01",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Kolme liuosparia sekoitetaan: I AgNO₃ + NaCl, II NaNO₃ + KCl, III BaCl₂ + Na₂SO₄. Havainnot: I valkoinen saostuma, II ei näkyvää muutosta, III valkoinen saostuma. a) Kirjoita saostumien kaavat. b) Kirjoita nettoioniyhtälöt I:lle ja III:lle. c) Selitä, miksi II:ssa ei synny saostumaa näillä tiedoilla.",
    "options": [],
    "correctAnswer": null,
    "explanation": "I AgCl(s), III BaSO₄(s). Nettoionit: Ag⁺+Cl⁻→AgCl(s); Ba²⁺+SO₄²⁻→BaSO₄(s). II:ssa kaikki ionit jäävät liuokseen eikä annetuista ioneista muodostu niukkaliukoista yhdistettä.",
    "scoring": "10 p: saostumat 2 p; kaksi nettoioniyhtälöä 6 p; II-perustelu 2 p.",
    "hints": [
      "Tunnista kiinteä aine havainnosta.",
      "Jätä sivuionit pois.",
      "II:ssa tarkista, syntyykö mitään niukkaliukoista."
    ],
    "skills": [
      "precipitation.observation",
      "net_ionic",
      "solubility_reasoning"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "precipitation.observation",
      "net_ionic",
      "solubility_reasoning"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
    ],
    "estimatedSeconds": 309,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 10,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Aineistotehtävä"
  },
  {
    "seedKey": "ke04-v3:KE04-SAO-X02",
    "contentId": "KE04-SAO-X02",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "multiple_choice",
    "difficulty": 4,
    "prompt": "Sekoitetaan 0,020 mol Ag⁺ ja 0,050 mol Cl⁻. Mikä väite on oikein?",
    "options": [
      "AgCl:ää syntyy 0,070 mol",
      "AgCl:ää syntyy 0,020 mol ja Cl⁻ jää yli",
      "AgCl:ää syntyy 0,050 mol ja Ag⁺ jää yli",
      "Kumpikin ioni jää kokonaan liuokseen."
    ],
    "correctAnswer": "AgCl:ää syntyy 0,020 mol ja Cl⁻ jää yli",
    "explanation": "B. Reaktio on 1:1 ja Ag⁺ rajoittaa, joten AgCl:ää syntyy 0,020 mol ja Cl⁻:a jää 0,030 mol.",
    "scoring": "4 p: B 1 p; 1:1 1 p; rajoittava 1 p; jäännös 1 p.",
    "hints": [
      "Nettoioniyhtälö on 1:1.",
      "Pienempi moolimäärä loppuu ensin",
      "Sulje pois vaihtoehdot vertaamalla jokaista niistä reaktioyhtälöön, rakenteeseen tai määritelmään.."
    ],
    "skills": [
      "precipitation.stoichiometry",
      "limiting"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "precipitation.stoichiometry",
      "limiting"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "sum_reactant_moles"
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
    "seedKey": "ke04-v3:KE04-SAO-X03",
    "contentId": "KE04-SAO-X03",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "calculation",
    "difficulty": 4,
    "prompt": "Näytteestä saostetaan AgCl:ää ja kuivaa saostumaa saadaan 1,433 g. M(AgCl)=143,3 g/mol. a) Laske n(AgCl). b) Päättele n(Cl⁻) alkuperäisessä näytteessä, jos kaikki kloridi saostui.",
    "options": [],
    "correctAnswer": null,
    "explanation": "n(AgCl)=1,433/143,3=0,01000 mol. Suhde Cl⁻:AgCl=1:1, joten n(Cl⁻)=0,01000 mol.",
    "scoring": "5 p: n(AgCl) 3 p; 1:1-päätelmä 2 p.",
    "hints": [
      "m→n.",
      "Yksi AgCl sisältää yhden Cl⁻-yksikön",
      "Kirjoita välivaiheet näkyviin ja tarkista lopuksi yksiköt sekä tuloksen suuruusluokka.."
    ],
    "skills": [
      "precipitation.gravimetry",
      "mole_ratio"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "precipitation.gravimetry",
      "mole_ratio"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
    ],
    "estimatedSeconds": 221,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 5,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Gravimetrinen lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-SAO-X04",
    "contentId": "KE04-SAO-X04",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Gravimetrisessä saostusmäärityksessä saostuma punnitaan ennen täydellistä kuivumista. Mihin suuntaan laskettu analysoitavan ionin ainemäärä vääristyy ja miksi?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Liian suureksi. Jäännösvesi kasvattaa punnittua saostumamassaa, jolloin m/M antaa liian suuren saostuman ja siten ionin ainemäärän.",
    "scoring": "5 p: suunta 1 p; märkyys→massa 2 p; massa→n vaikutus 2 p.",
    "hints": [
      "Vaaka mittaa myös veden.",
      "Suurempi m antaa suuremman n",
      "Nimeä ensin väärä kemiallinen periaate ja vasta sitten sen vaikutus lopputulokseen.."
    ],
    "skills": [
      "experimental.error_direction",
      "gravimetry"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "experimental.error_direction",
      "gravimetry"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
    ],
    "estimatedSeconds": 309,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 5,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Kokeellinen virheanalyysi"
  },
  {
    "seedKey": "ke04-v3:KE04-SAO-X05",
    "contentId": "KE04-SAO-X05",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "short_answer",
    "difficulty": 5,
    "prompt": "10,00 g CaCO₃:a kuumennetaan reaktiossa CaCO₃→CaO+CO₂. Jäännöksen massa on 5,70 g. a) Laske teoreettinen CaO-massa käyttäen M(CaCO₃)=100,1 ja M(CaO)=56,1 g/mol. b) Arvioi, onko hajoaminen ollut täydellinen.",
    "options": [],
    "correctAnswer": null,
    "explanation": "n(CaCO₃)=10,00/100,1≈0,0999 mol; m(CaO)≈0,0999×56,1≈5,60 g. Mitattu 5,70 g on hieman suurempi, joten näytteessä voi olla hajonnutta lähtöainetta tai muuta massaa; täydellisyys ei ole täysin varma.",
    "scoring": "8 p: n 2 p; teoreettinen massa 3 p; vertailu 1 p; järkevä johtopäätös 2 p.",
    "hints": [
      "Laske teoreettinen jäännös.",
      "Jos mitattu jäännös on suurempi, kaikkea ei ehkä hajonnut",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "decomposition.stoichiometry",
      "data_compare"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "decomposition.stoichiometry",
      "data_compare"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
    ],
    "estimatedSeconds": 173,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 8,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Hajoamisreaktio – data"
  },
  {
    "seedKey": "ke04-v3:KE04-SAO-X06",
    "contentId": "KE04-SAO-X06",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "error_detection",
    "difficulty": 5,
    "prompt": "Opiskelija päättelee saostumisreaktion perusteella, että kaikki valkoinen kiinteä aine vesiliuoksessa on AgCl:ää. Miksi päätelmä on liian vahva? Anna parempi tapa perustella aineen tunnistus.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Valkoinen väri ei ole yksilöllinen tunniste; monet saostumat ovat valkoisia. Tunnistus vaatii lähtöionien tuntemista ja/tai lisätestejä sekä reaktioyhtälön ja mahdollisten tuotteiden tarkastelua.",
    "scoring": "6 p: värin epäspesifisyys 2 p; lähtöionit/reaktio 2 p; lisänäyttö 2 p.",
    "hints": [
      "Yksi havainto harvoin tunnistaa aineen varmasti.",
      "Käytä lähtöaineiden ioneja",
      "Nimeä ensin väärä kemiallinen periaate ja vasta sitten sen vaikutus lopputulokseen.."
    ],
    "skills": [
      "experimental.evidence",
      "precipitation.identification"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "experimental.evidence",
      "precipitation.identification"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
    ],
    "estimatedSeconds": 248,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 6,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Virheen analyysi"
  },
  {
    "seedKey": "ke04-v3:KE04-SAO-X07",
    "contentId": "KE04-SAO-X07",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "50,0 mL 0,100 mol/L AgNO₃-liuosta sekoitetaan 40,0 mL 0,150 mol/L NaCl-liuosta. a) Laske n(Ag⁺) ja n(Cl⁻). b) Päätä rajoittava ioni. c) Laske AgCl:n teoreettinen massa, M=143,3 g/mol. d) Jos kuivaa saostumaa saadaan 0,680 g, laske saanto-%.",
    "options": [],
    "correctAnswer": null,
    "explanation": "n(Ag⁺)=0,00500 mol; n(Cl⁻)=0,00600 mol. Ag⁺ rajoittaa. n(AgCl)=0,00500 mol, m=0,7165 g. Saanto=0,680/0,7165×100≈94,9 %.",
    "scoring": "12 p: moolit 3 p; rajoittava 2 p; massa 3 p; saanto 4 p.",
    "hints": [
      "n=cV.",
      "Ag⁺:Cl⁻=1:1.",
      "m=nM.",
      "todellinen/teoreettinen."
    ],
    "skills": [
      "solution_stoichiometry",
      "precipitation",
      "limiting",
      "yield"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "solution_stoichiometry",
      "precipitation",
      "limiting",
      "yield"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 12,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Koereservi – yhdistetty"
  },
  {
    "seedKey": "ke04-v3:KE04-SAO-X08",
    "contentId": "KE04-SAO-X08",
    "chapter": 6,
    "topicName": "Saostumis- ja hajoamisreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "Suunnittele lyhyesti koe, jolla voit erottaa toisistaan näytteet, joista toinen sisältää Cl⁻-ioneja ja toinen SO₄²⁻-ioneja. Käytössäsi ovat AgNO₃- ja BaCl₂-liuokset. Kerro odotetut havainnot ja kirjoita vähintään yksi nettoioniyhtälö.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Esim. jaetaan näytteet. AgNO₃ antaa Cl⁻-näytteelle AgCl(s)-saostuman: Ag⁺+Cl⁻→AgCl(s). BaCl₂ antaa SO₄²⁻-näytteelle BaSO₄(s): Ba²⁺+SO₄²⁻→BaSO₄(s). Testit tulkitaan kontrolloidusti erillisissä osanäytteissä.",
    "scoring": "10 p: järkevä koejärjestely 3 p; Cl⁻-havainto 2 p; SO₄²⁻-havainto 2 p; nettoioniyhtälö 3 p.",
    "hints": [
      "Etsi reagenssi, joka muodostaa tunnetun niukkaliukoisen suolan.",
      "Käytä eri osanäytteitä",
      "Perustele päätelmä yhdistämällä havainto tai mittaus suoraan kemialliseen malliin.."
    ],
    "skills": [
      "experimental.design",
      "precipitation.selective_tests"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "experimental.design",
      "precipitation.selective_tests"
    ],
    "prerequisites": [
      "ionic_equations",
      "reaction_classification"
    ],
    "commonErrors": [
      "aqueous_vs_solid",
      "spectator_ions"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 10,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Koereservi – kokeellinen suunnittelu"
  }
];
