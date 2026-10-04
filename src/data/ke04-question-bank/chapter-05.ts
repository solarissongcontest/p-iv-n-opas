import type { Ke04SeedQuestion } from "./types";

export const questions: Ke04SeedQuestion[] = [
  {
    "seedKey": "ke04-v3:KE04-KAA-001",
    "contentId": "KE04-KAA-001",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Ideaalikaasun tilanyhtälö ja suureet",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Kirjoita ideaalikaasun tilanyhtälö ja nimeä sen suureet.",
    "options": [],
    "correctAnswer": null,
    "explanation": "pV=nRT, missä p on paine, V tilavuus, n ainemäärä, R kaasuvakio ja T absoluuttinen lämpötila kelvineinä.",
    "scoring": "5 p: yhtälö 1 p, neljä suuretta 4 p; R:n nimeäminen hyväksytään lisätarkkuutena.",
    "hints": [
      "Muista pV vasemmalla.",
      "Oikealla nRT."
    ],
    "skills": [
      "ke04.kaa.ideaalikaasun_tilanyhtalo_ja_suureet",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Ideaalikaasun tilanyhtälö ja suureet",
      "ke04.kaa.ideaalikaasun_tilanyhtalo_ja_suureet"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
    ],
    "estimatedSeconds": 70,
    "examEligible": false,
    "reserveForExam": false,
    "validated": true,
    "points": 5,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Tunnistus"
  },
  {
    "seedKey": "ke04-v3:KE04-KAA-002",
    "contentId": "KE04-KAA-002",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Ideaalikaasun tilanyhtälö ja suureet",
    "questionType": "multiple_choice",
    "difficulty": 1,
    "prompt": "Missä yksikössä lämpötila tulee käyttää pV=nRT-yhtälössä?",
    "options": [
      "°C",
      "K",
      "°F",
      "yksikötön"
    ],
    "correctAnswer": "K",
    "explanation": "B, kelvineinä.",
    "scoring": "1 p.",
    "hints": [
      "Absoluuttinen lämpötila.",
      "Lisää celsiusasteisiin noin 273,15."
    ],
    "skills": [
      "ke04.kaa.ideaalikaasun_tilanyhtalo_ja_suureet",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Ideaalikaasun tilanyhtälö ja suureet",
      "ke04.kaa.ideaalikaasun_tilanyhtalo_ja_suureet"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "gas.celsius_vs_kelvin",
      "gas.volume_units"
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
    "seedKey": "ke04-v3:KE04-KAA-003",
    "contentId": "KE04-KAA-003",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Ideaalikaasun tilanyhtälö ja suureet",
    "questionType": "matching",
    "difficulty": 2,
    "prompt": "Yhdistä symboli suureeseen: p, V, n, T ↔ paine, tilavuus, ainemäärä, lämpötila.",
    "options": [],
    "correctAnswer": null,
    "explanation": "p→paine; V→tilavuus; n→ainemäärä; T→lämpötila.",
    "scoring": "4 p, 1 p / pari.",
    "hints": [
      "V tulee sanasta volume.",
      "n on moolimäärä."
    ],
    "skills": [
      "ke04.kaa.ideaalikaasun_tilanyhtalo_ja_suureet",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Ideaalikaasun tilanyhtälö ja suureet",
      "ke04.kaa.ideaalikaasun_tilanyhtalo_ja_suureet"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
    ],
    "estimatedSeconds": 133,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "p",
        "right": "paine"
      },
      {
        "left": "V",
        "right": "tilavuus"
      },
      {
        "left": "n",
        "right": "ainemäärä"
      },
      {
        "left": "T",
        "right": "lämpötila."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-KAA-004",
    "contentId": "KE04-KAA-004",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Ideaalikaasun tilanyhtälö ja suureet",
    "questionType": "explanation",
    "difficulty": 2,
    "prompt": "Miksi R:n yksikön pitää sopia paineen ja tilavuuden yksiköihin?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Koska yhtälön yksiköiden on oltava keskenään yhteensopivia. Jos R on kPa·L/(mol·K), paine annetaan kPa:na ja tilavuus litroina.",
    "scoring": "3 p: yksikköyhteensopivuus 1 p, kPa 1 p, L 1 p.",
    "hints": [
      "Katso R:n osoittajan yksiköitä.",
      "Älä sekoita Pa ja kPa ilman muunnosta."
    ],
    "skills": [
      "ke04.kaa.ideaalikaasun_tilanyhtalo_ja_suureet",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Ideaalikaasun tilanyhtälö ja suureet",
      "ke04.kaa.ideaalikaasun_tilanyhtalo_ja_suureet"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-KAA-005",
    "contentId": "KE04-KAA-005",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Ideaalikaasun tilanyhtälö ja suureet",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija käyttää p=101 kPa, V=2,0 L, T=25 ja R=8,314 kPa·L/(mol·K). Mikä on suurin virhe?",
    "options": [],
    "correctAnswer": null,
    "explanation": "T=25 on käytetty celsiuslukuna suoraan. Tilanyhtälössä pitää käyttää 25 °C = 298,15 K.",
    "scoring": "3 p: virhe 1 p, kelvinvaatimus 1 p, 298 K 1 p.",
    "hints": [
      "T ei ole celsiusasteina.",
      "K=°C+273,15."
    ],
    "skills": [
      "ke04.kaa.ideaalikaasun_tilanyhtalo_ja_suureet",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Ideaalikaasun tilanyhtälö ja suureet",
      "ke04.kaa.ideaalikaasun_tilanyhtalo_ja_suureet"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "gas.celsius_vs_kelvin",
      "gas.volume_units"
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
    "seedKey": "ke04-v3:KE04-KAA-006",
    "contentId": "KE04-KAA-006",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Lämpötila- ja yksikkömuunnokset",
    "questionType": "calculation",
    "difficulty": 1,
    "prompt": "Muunna 25,0 °C kelvineiksi.",
    "options": [],
    "correctAnswer": null,
    "explanation": "298,15 K, yleensä 298 K sopivalla tarkkuudella.",
    "scoring": "2 p: lisäys 273,15 1 p, tulos 1 p.",
    "hints": [
      "K=°C+273,15.",
      "25+273,15."
    ],
    "skills": [
      "ke04.kaa.lampotila_ja_yksikkomuunnokset",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Lämpötila- ja yksikkömuunnokset",
      "ke04.kaa.lampotila_ja_yksikkomuunnokset"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-KAA-007",
    "contentId": "KE04-KAA-007",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Lämpötila- ja yksikkömuunnokset",
    "questionType": "calculation",
    "difficulty": 1,
    "prompt": "Muunna 0,0 °C kelvineiksi.",
    "options": [],
    "correctAnswer": null,
    "explanation": "273,15 K.",
    "scoring": "1 p.",
    "hints": [
      "Lisää 273,15.",
      "Tämä on tavallinen vertailukohta."
    ],
    "skills": [
      "ke04.kaa.lampotila_ja_yksikkomuunnokset",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Lämpötila- ja yksikkömuunnokset",
      "ke04.kaa.lampotila_ja_yksikkomuunnokset"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
    ],
    "estimatedSeconds": 140,
    "examEligible": false,
    "reserveForExam": false,
    "validated": true,
    "points": 1,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-KAA-008",
    "contentId": "KE04-KAA-008",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Lämpötila- ja yksikkömuunnokset",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Muunna 750 mL litroiksi.",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,750 L.",
    "scoring": "2 p: muunnos 1 p, tulos 1 p.",
    "hints": [
      "1000 mL = 1 L.",
      "Jaa tuhannella."
    ],
    "skills": [
      "ke04.kaa.lampotila_ja_yksikkomuunnokset",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Lämpötila- ja yksikkömuunnokset",
      "ke04.kaa.lampotila_ja_yksikkomuunnokset"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-KAA-009",
    "contentId": "KE04-KAA-009",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Lämpötila- ja yksikkömuunnokset",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Muunna 1,50 bar kilopascaleiksi, kun 1 bar=100 kPa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "150 kPa.",
    "scoring": "2 p.",
    "hints": [
      "Kerro sadalla.",
      "1,50×100."
    ],
    "skills": [
      "ke04.kaa.lampotila_ja_yksikkomuunnokset",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Lämpötila- ja yksikkömuunnokset",
      "ke04.kaa.lampotila_ja_yksikkomuunnokset"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-KAA-010",
    "contentId": "KE04-KAA-010",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Lämpötila- ja yksikkömuunnokset",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija muuttaa 250 mL tilavuudeksi 250 L kaasulaskuun. Mikä on virhetekijä ja oikea arvo?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Arvo on 1000 kertaa liian suuri. Oikea tilavuus on 0,250 L.",
    "scoring": "3 p: 1000-kertainen virhe 1 p, 0,250 L 2 p.",
    "hints": [
      "mL on litran tuhannesosa.",
      "Jaa 250 tuhannella."
    ],
    "skills": [
      "ke04.kaa.lampotila_ja_yksikkomuunnokset",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Lämpötila- ja yksikkömuunnokset",
      "ke04.kaa.lampotila_ja_yksikkomuunnokset"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "gas.volume_units"
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
    "seedKey": "ke04-v3:KE04-KAA-011",
    "contentId": "KE04-KAA-011",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Ainemäärä pV=nRT-yhtälöstä",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Kaasun p=100 kPa, V=24,9 L ja T=300 K. Laske n.",
    "options": [],
    "correctAnswer": null,
    "explanation": "n=pV/(RT)=100×24,9/(8,314×300)=0,998 mol ≈1,00 mol.",
    "scoring": "4 p: kaavan ratkaisu 1 p, sijoitus 1 p, lasku 1 p, yksikkö/tulos 1 p.",
    "hints": [
      "Ratkaise n=pV/RT.",
      "Käytä T=300 K."
    ],
    "skills": [
      "ke04.kaa.ainemaara_pv_nrt_yhtalosta",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Ainemäärä pV=nRT-yhtälöstä",
      "ke04.kaa.ainemaara_pv_nrt_yhtalosta"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-KAA-012",
    "contentId": "KE04-KAA-012",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Ainemäärä pV=nRT-yhtälöstä",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Kaasun p=101 kPa, V=12,3 L ja T=298 K. Laske n.",
    "options": [],
    "correctAnswer": null,
    "explanation": "n=101×12,3/(8,314×298)≈0,501 mol.",
    "scoring": "4 p.",
    "hints": [
      "n=pV/RT.",
      "Kerro pV ja jaa RT:llä."
    ],
    "skills": [
      "ke04.kaa.ainemaara_pv_nrt_yhtalosta",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Ainemäärä pV=nRT-yhtälöstä",
      "ke04.kaa.ainemaara_pv_nrt_yhtalosta"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-KAA-013",
    "contentId": "KE04-KAA-013",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Ainemäärä pV=nRT-yhtälöstä",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "2,00 L kaasua on paineessa 200 kPa ja lämpötilassa 300 K. Laske ainemäärä.",
    "options": [],
    "correctAnswer": null,
    "explanation": "n=200×2,00/(8,314×300)=0,160 mol.",
    "scoring": "4 p.",
    "hints": [
      "Kaikki yksiköt sopivat R:ään.",
      "n=pV/RT."
    ],
    "skills": [
      "ke04.kaa.ainemaara_pv_nrt_yhtalosta",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Ainemäärä pV=nRT-yhtälöstä",
      "ke04.kaa.ainemaara_pv_nrt_yhtalosta"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-KAA-014",
    "contentId": "KE04-KAA-014",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Ainemäärä pV=nRT-yhtälöstä",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "Kaasun tilavuus on 5,00 L, paine 95,0 kPa ja lämpötila 20,0 °C. Laske n.",
    "options": [],
    "correctAnswer": null,
    "explanation": "T=293,15 K; n=95,0×5,00/(8,314×293,15)=0,195 mol.",
    "scoring": "5 p: lämpötilamuunnos 1 p, kaava 1 p, sijoitus 1 p, lasku 1 p, yksikkö 1 p.",
    "hints": [
      "Muunna 20 °C kelvineiksi.",
      "n=pV/RT."
    ],
    "skills": [
      "ke04.kaa.ainemaara_pv_nrt_yhtalosta",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Ainemäärä pV=nRT-yhtälöstä",
      "ke04.kaa.ainemaara_pv_nrt_yhtalosta"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-KAA-015",
    "contentId": "KE04-KAA-015",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Ainemäärä pV=nRT-yhtälöstä",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Kaasun tilavuus on 5,00 L, paine 95,0 kPa ja lämpötila 20,0 °C. Opiskelija käyttää ideaalikaasuyhtälössä T=20 ja saa n≈0,286 mol. Selitä, miksi tulos on väärä ilman että teet koko laskua uudelleen.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Hän käytti celsiuslukua kelvinlämpötilan sijasta. T:n pitää olla noin 293 K; liian pieni nimittäjä kasvattaa n:n virheellisesti liian suureksi.",
    "scoring": "4 p: Celsius-virhe 1 p, 293 K 1 p, nimittäjän vaikutus 1 p, n liian suuri 1 p.",
    "hints": [
      "Katso n=pV/RT.",
      "Pienempi T nimittäjässä kasvattaa n:ää."
    ],
    "skills": [
      "ke04.kaa.ainemaara_pv_nrt_yhtalosta",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Ainemäärä pV=nRT-yhtälöstä",
      "ke04.kaa.ainemaara_pv_nrt_yhtalosta"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "gas.celsius_vs_kelvin",
      "gas.volume_units"
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
    "seedKey": "ke04-v3:KE04-KAA-016",
    "contentId": "KE04-KAA-016",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Paine tai tilavuus ideaalikaasulaskussa",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "1,00 mol kaasua on 300 K:ssa 24,9 L astiassa. Laske paine.",
    "options": [],
    "correctAnswer": null,
    "explanation": "p=nRT/V=1,00×8,314×300/24,9≈100 kPa.",
    "scoring": "4 p.",
    "hints": [
      "Ratkaise p=nRT/V.",
      "Arvon pitäisi olla lähellä normaalia ilmanpainetta."
    ],
    "skills": [
      "ke04.kaa.paine_tai_tilavuus_ideaalikaasulaskussa",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Paine tai tilavuus ideaalikaasulaskussa",
      "ke04.kaa.paine_tai_tilavuus_ideaalikaasulaskussa"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-KAA-017",
    "contentId": "KE04-KAA-017",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Paine tai tilavuus ideaalikaasulaskussa",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "0,500 mol kaasua on 298 K:ssa paineessa 100 kPa. Laske tilavuus.",
    "options": [],
    "correctAnswer": null,
    "explanation": "V=nRT/p=0,500×8,314×298/100≈12,4 L.",
    "scoring": "4 p.",
    "hints": [
      "V=nRT/p.",
      "Puoli moolia lähellä huoneenlämpöä vie noin 12 L."
    ],
    "skills": [
      "ke04.kaa.paine_tai_tilavuus_ideaalikaasulaskussa",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Paine tai tilavuus ideaalikaasulaskussa",
      "ke04.kaa.paine_tai_tilavuus_ideaalikaasulaskussa"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-KAA-018",
    "contentId": "KE04-KAA-018",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Paine tai tilavuus ideaalikaasulaskussa",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "2,00 mol kaasua on 350 K:ssa 50,0 L astiassa. Laske paine.",
    "options": [],
    "correctAnswer": null,
    "explanation": "p=2,00×8,314×350/50,0≈116 kPa.",
    "scoring": "4 p.",
    "hints": [
      "nRT/V.",
      "Tarkista kPa-yksikkö."
    ],
    "skills": [
      "ke04.kaa.paine_tai_tilavuus_ideaalikaasulaskussa",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Paine tai tilavuus ideaalikaasulaskussa",
      "ke04.kaa.paine_tai_tilavuus_ideaalikaasulaskussa"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-KAA-019",
    "contentId": "KE04-KAA-019",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Paine tai tilavuus ideaalikaasulaskussa",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "0,250 mol kaasua on 273 K:ssa paineessa 101 kPa. Laske tilavuus.",
    "options": [],
    "correctAnswer": null,
    "explanation": "V=0,250×8,314×273/101≈5,62 L.",
    "scoring": "4 p.",
    "hints": [
      "V=nRT/p.",
      "Neljäsosa moolia antaa noin neljäsosan 22,4 L:stä."
    ],
    "skills": [
      "ke04.kaa.paine_tai_tilavuus_ideaalikaasulaskussa",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Paine tai tilavuus ideaalikaasulaskussa",
      "ke04.kaa.paine_tai_tilavuus_ideaalikaasulaskussa"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-KAA-020",
    "contentId": "KE04-KAA-020",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Paine tai tilavuus ideaalikaasulaskussa",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miten paine muuttuu, jos jäykän astian kaasun lämpötila nousee ja n sekä V pysyvät vakioina?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Paine kasvaa suoraan absoluuttisen lämpötilan mukana, koska p=nRT/V.",
    "scoring": "3 p: paine kasvaa 1 p, T-yhteys 1 p, yhtälöperustelu 1 p.",
    "hints": [
      "Ratkaise p.",
      "n, R ja V ovat vakioita."
    ],
    "skills": [
      "ke04.kaa.paine_tai_tilavuus_ideaalikaasulaskussa",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Paine tai tilavuus ideaalikaasulaskussa",
      "ke04.kaa.paine_tai_tilavuus_ideaalikaasulaskussa"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-KAA-021",
    "contentId": "KE04-KAA-021",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Moolimassa kaasun avulla",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "0,500 mol kaasua painaa 16,0 g. Laske moolimassa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "M=m/n=16,0/0,500=32,0 g/mol.",
    "scoring": "3 p.",
    "hints": [
      "M=m/n.",
      "Jaa massa mooleilla."
    ],
    "skills": [
      "ke04.kaa.moolimassa_kaasun_avulla",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Moolimassa kaasun avulla",
      "ke04.kaa.moolimassa_kaasun_avulla"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-KAA-022",
    "contentId": "KE04-KAA-022",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Moolimassa kaasun avulla",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "Kaasun massa on 4,40 g. Olosuhteista pV=nRT saadaan n=0,100 mol. Laske moolimassa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "M=4,40/0,100=44,0 g/mol.",
    "scoring": "3 p.",
    "hints": [
      "Kun n on tiedossa, käytä M=m/n.",
      "g/mol."
    ],
    "skills": [
      "ke04.kaa.moolimassa_kaasun_avulla",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Moolimassa kaasun avulla",
      "ke04.kaa.moolimassa_kaasun_avulla"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-KAA-023",
    "contentId": "KE04-KAA-023",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Moolimassa kaasun avulla",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "2,80 g kaasua on 2,49 L astiassa, p=100 kPa ja T=300 K. Laske ensin n ja sitten M.",
    "options": [],
    "correctAnswer": null,
    "explanation": "n=100×2,49/(8,314×300)=0,0998 mol; M=2,80/0,0998≈28,1 g/mol.",
    "scoring": "6 p: n-kaava 1 p, n 2 p, M-kaava 1 p, M 1 p, yksikkö 1 p.",
    "hints": [
      "Kaasuolosuhteista n.",
      "Sitten M=m/n."
    ],
    "skills": [
      "ke04.kaa.moolimassa_kaasun_avulla",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Moolimassa kaasun avulla",
      "ke04.kaa.moolimassa_kaasun_avulla"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
    ],
    "estimatedSeconds": 194,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 6,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-KAA-024",
    "contentId": "KE04-KAA-024",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Moolimassa kaasun avulla",
    "questionType": "recognition",
    "difficulty": 3,
    "prompt": "Jos kaasun laskettu moolimassa on noin 44,0 g/mol ja vaihtoehdot ovat H₂, N₂, O₂ ja CO₂, mikä kaasu sopii?",
    "options": [],
    "correctAnswer": null,
    "explanation": "CO₂.",
    "scoring": "2 p: CO₂ 1 p, perustelu moolimassalla 1 p.",
    "hints": [
      "Laske vaihtoehtojen moolimassat.",
      "C+2O≈44."
    ],
    "skills": [
      "ke04.kaa.moolimassa_kaasun_avulla",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Moolimassa kaasun avulla",
      "ke04.kaa.moolimassa_kaasun_avulla"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-KAA-025",
    "contentId": "KE04-KAA-025",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Moolimassa kaasun avulla",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija laskee moolimassan kaavalla M=n/m ja saa yksikön mol/g. Mikä on oikea kaava ja miksi?",
    "options": [],
    "correctAnswer": null,
    "explanation": "M=m/n, jolloin yksikkö g/mol. Moolimassa kertoo massan yhtä moolia kohti, joten massa jaetaan ainemäärällä.",
    "scoring": "3 p: oikea kaava 1 p, g/mol 1 p, merkitys 1 p.",
    "hints": [
      "Moolimassa on 'grammaa per mooli'.",
      "Per tarkoittaa jakoa."
    ],
    "skills": [
      "ke04.kaa.moolimassa_kaasun_avulla",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Moolimassa kaasun avulla",
      "ke04.kaa.moolimassa_kaasun_avulla"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "gas.volume_units",
      "gas.molar_mass_formula"
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
    "seedKey": "ke04-v3:KE04-KAA-026",
    "contentId": "KE04-KAA-026",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Kaasujen tilavuussuhteet reaktioissa",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Miksi saman T:n ja p:n kaasujen tilavuussuhteet vastaavat ainemääräsuhteita?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Ideaalikaasun yhtälössä V=nRT/p; kun T ja p ovat samat, V on suoraan verrannollinen n:ään.",
    "scoring": "3 p: yhtälö 1 p, samat T/p 1 p, V∝n 1 p.",
    "hints": [
      "Ratkaise V.",
      "RT/p on vakio."
    ],
    "skills": [
      "ke04.kaa.kaasujen_tilavuussuhteet_reaktioissa",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Kaasujen tilavuussuhteet reaktioissa",
      "ke04.kaa.kaasujen_tilavuussuhteet_reaktioissa"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-KAA-027",
    "contentId": "KE04-KAA-027",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Kaasujen tilavuussuhteet reaktioissa",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Reaktio 2H₂(g)+O₂(g)→2H₂O(g). Samassa T:ssa ja p:ssa 10,0 L H₂ tarvitsee kuinka monta litraa O₂:ta?",
    "options": [],
    "correctAnswer": null,
    "explanation": "5,00 L O₂, koska tilavuussuhde 2:1.",
    "scoring": "3 p.",
    "hints": [
      "Käytä kertoimia suoraan tilavuuksille.",
      "O₂:ta puolet H₂-tilavuudesta."
    ],
    "skills": [
      "ke04.kaa.kaasujen_tilavuussuhteet_reaktioissa",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Kaasujen tilavuussuhteet reaktioissa",
      "ke04.kaa.kaasujen_tilavuussuhteet_reaktioissa"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-KAA-028",
    "contentId": "KE04-KAA-028",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Kaasujen tilavuussuhteet reaktioissa",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "N₂(g)+3H₂(g)→2NH₃(g). 6,0 L N₂ tarvitsee saman T:n ja p:n vallitessa kuinka paljon H₂:ta?",
    "options": [],
    "correctAnswer": null,
    "explanation": "18,0 L H₂.",
    "scoring": "3 p.",
    "hints": [
      "Suhde 1:3.",
      "6×3."
    ],
    "skills": [
      "ke04.kaa.kaasujen_tilavuussuhteet_reaktioissa",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Kaasujen tilavuussuhteet reaktioissa",
      "ke04.kaa.kaasujen_tilavuussuhteet_reaktioissa"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-KAA-029",
    "contentId": "KE04-KAA-029",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Kaasujen tilavuussuhteet reaktioissa",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "Reaktio on N₂(g) + 3H₂(g) → 2NH₃(g). Kuinka paljon NH₃-kaasua muodostuu 9,0 L H₂:sta, kun N₂ on ylimäärin ja kaikki kaasutilavuudet mitataan samoissa T- ja p-oloissa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "6,0 L NH₃, koska H₂:NH₃=3:2.",
    "scoring": "3 p.",
    "hints": [
      "9/3=3 reaktio-osuutta.",
      "3×2 L."
    ],
    "skills": [
      "ke04.kaa.kaasujen_tilavuussuhteet_reaktioissa",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Kaasujen tilavuussuhteet reaktioissa",
      "ke04.kaa.kaasujen_tilavuussuhteet_reaktioissa"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-KAA-030",
    "contentId": "KE04-KAA-030",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Kaasujen tilavuussuhteet reaktioissa",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija käyttää kaasujen tilavuussuhteita suoraan, vaikka lähtökaasut ovat eri lämpötiloissa ja paineissa. Miksi se voi olla väärin?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Tilavuus on verrannollinen ainemäärään vain samoissa T- ja p-olosuhteissa. Eri olosuhteissa tilavuudet pitää muuntaa tai ainemäärät laskea pV=nRT:llä.",
    "scoring": "4 p: sama T 1 p, sama p 1 p, suora suhde ei päde 1 p, pV=nRT-ratkaisu 1 p.",
    "hints": [
      "V riippuu myös T:stä ja p:stä.",
      "Kertoimet kertovat mooleja, eivät mielivaltaisia litroja."
    ],
    "skills": [
      "ke04.kaa.kaasujen_tilavuussuhteet_reaktioissa",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Kaasujen tilavuussuhteet reaktioissa",
      "ke04.kaa.kaasujen_tilavuussuhteet_reaktioissa"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "gas.volume_units",
      "gas.volume_ratio_conditions"
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
    "seedKey": "ke04-v3:KE04-KAA-031",
    "contentId": "KE04-KAA-031",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Kaasustoikiometria pV=nRT:n avulla",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Metaanin palamisessa CH₄+2O₂→CO₂+2H₂O. Jos n(CH₄)=0,500 mol, kuinka paljon O₂ tarvitaan?",
    "options": [],
    "correctAnswer": null,
    "explanation": "1,00 mol O₂.",
    "scoring": "2 p.",
    "hints": [
      "Suhde 1:2.",
      "Kerro 0,500 kahdella."
    ],
    "skills": [
      "ke04.kaa.kaasustoikiometria_pv_nrt_n_avulla",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Kaasustoikiometria pV=nRT:n avulla",
      "ke04.kaa.kaasustoikiometria_pv_nrt_n_avulla"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-KAA-032",
    "contentId": "KE04-KAA-032",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Kaasustoikiometria pV=nRT:n avulla",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "1,00 mol O₂ on 300 K:ssa ja 100 kPa:ssa. Mikä tilavuus sillä on?",
    "options": [],
    "correctAnswer": null,
    "explanation": "V=1,00×8,314×300/100=24,9 L.",
    "scoring": "4 p.",
    "hints": [
      "V=nRT/p.",
      "Käytä R:n kanssa kPa ja L."
    ],
    "skills": [
      "ke04.kaa.kaasustoikiometria_pv_nrt_n_avulla",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Kaasustoikiometria pV=nRT:n avulla",
      "ke04.kaa.kaasustoikiometria_pv_nrt_n_avulla"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-KAA-033",
    "contentId": "KE04-KAA-033",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Kaasustoikiometria pV=nRT:n avulla",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "0,500 mol CH₄:n palamiseen tarvittava 1,00 mol O₂ on 300 K:ssa ja 100 kPa:ssa. Mikä O₂-tilavuus?",
    "options": [],
    "correctAnswer": null,
    "explanation": "24,9 L.",
    "scoring": "4 p: stoikiometria 1 p, V-kaava 1 p, lasku 1 p, yksikkö 1 p.",
    "hints": [
      "Ensin molit reaktioyhtälöstä.",
      "Sitten kaasulaki."
    ],
    "skills": [
      "ke04.kaa.kaasustoikiometria_pv_nrt_n_avulla",
      "task.yhdistetty_lasku"
    ],
    "expectedConcepts": [
      "Kaasustoikiometria pV=nRT:n avulla",
      "ke04.kaa.kaasustoikiometria_pv_nrt_n_avulla"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
    ],
    "estimatedSeconds": 194,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Yhdistetty lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-KAA-034",
    "contentId": "KE04-KAA-034",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Kaasustoikiometria pV=nRT:n avulla",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "5,00 L H₂-kaasua on 100 kPa:ssa ja 300 K:ssa. Se reagoi ylimääräisen O₂:n kanssa reaktiossa 2H₂→2H₂O. Laske H₂:n ainemäärä ja muodostuvan H₂O:n ainemäärä.",
    "options": [],
    "correctAnswer": null,
    "explanation": "n(H₂)=100×5,00/(8,314×300)=0,200 mol; suhde H₂:H₂O=1:1, joten n(H₂O)=0,200 mol.",
    "scoring": "5 p: n(H₂) 3 p, suhde 1 p, n(H₂O) 1 p.",
    "hints": [
      "pV=nRT.",
      "Kertoimet 2:2 supistuvat 1:1."
    ],
    "skills": [
      "ke04.kaa.kaasustoikiometria_pv_nrt_n_avulla",
      "task.yhdistetty_lasku"
    ],
    "expectedConcepts": [
      "Kaasustoikiometria pV=nRT:n avulla",
      "ke04.kaa.kaasustoikiometria_pv_nrt_n_avulla"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
    ],
    "estimatedSeconds": 194,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 5,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Yhdistetty lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-KAA-035",
    "contentId": "KE04-KAA-035",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Kaasustoikiometria pV=nRT:n avulla",
    "questionType": "calculation",
    "difficulty": 4,
    "prompt": "10,0 L O₂:ta on 100 kPa:ssa ja 300 K:ssa. Kuinka monta moolia CH₄:ää voidaan polttaa täydellisesti?",
    "options": [],
    "correctAnswer": null,
    "explanation": "n(O₂)=100×10,0/(8,314×300)=0,401 mol; CH₄:O₂=1:2, joten n(CH₄)=0,200 mol.",
    "scoring": "6 p: O₂-molit 3 p, reaktiosuhde 1 p, CH₄-molit 1 p, yksiköt/tarkkuus 1 p.",
    "hints": [
      "Laske O₂:n n.",
      "Metaania puolet O₂:n mooleista",
      "Kirjoita välivaiheet näkyviin ja tarkista lopuksi yksiköt sekä tuloksen suuruusluokka.."
    ],
    "skills": [
      "ke04.kaa.kaasustoikiometria_pv_nrt_n_avulla",
      "task.yhdistetty_lasku"
    ],
    "expectedConcepts": [
      "Kaasustoikiometria pV=nRT:n avulla",
      "ke04.kaa.kaasustoikiometria_pv_nrt_n_avulla"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
    ],
    "estimatedSeconds": 221,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 6,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Yhdistetty lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-KAA-036",
    "contentId": "KE04-KAA-036",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Kaasulain laadulliset riippuvuudet",
    "questionType": "explanation",
    "difficulty": 2,
    "prompt": "Jos n ja T ovat vakioita, mitä tapahtuu paineelle, kun kaasun tilavuus puolitetaan?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Paine kaksinkertaistuu, koska pV=nRT on vakio ja p∝1/V.",
    "scoring": "3 p: kaksinkertaistuu 1 p, käänteinen verrannollisuus 1 p, yhtälö 1 p.",
    "hints": [
      "pV vakio.",
      "Jos V/2, p×2."
    ],
    "skills": [
      "ke04.kaa.kaasulain_laadulliset_riippuvuudet",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Kaasulain laadulliset riippuvuudet",
      "ke04.kaa.kaasulain_laadulliset_riippuvuudet"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-KAA-037",
    "contentId": "KE04-KAA-037",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Kaasulain laadulliset riippuvuudet",
    "questionType": "explanation",
    "difficulty": 2,
    "prompt": "Jos p ja n pysyvät vakioina, mitä tapahtuu tilavuudelle, kun absoluuttinen lämpötila kasvaa 300 K:stä 600 K:iin?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Tilavuus kaksinkertaistuu, koska V∝T.",
    "scoring": "3 p.",
    "hints": [
      "V=nRT/p.",
      "T kaksinkertaistuu."
    ],
    "skills": [
      "ke04.kaa.kaasulain_laadulliset_riippuvuudet",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Kaasulain laadulliset riippuvuudet",
      "ke04.kaa.kaasulain_laadulliset_riippuvuudet"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-KAA-038",
    "contentId": "KE04-KAA-038",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Kaasulain laadulliset riippuvuudet",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija sanoo, että lämmittäminen 20 °C:sta 40 °C:een kaksinkertaistaa kaasun tilavuuden vakiossa paineessa. Miksi ei?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Verrannollisuus koskee kelvinlämpötilaa: 293 K→313 K, ei kaksinkertaistumista. Tilavuus kasvaa vain noin suhteessa 313/293.",
    "scoring": "4 p: kelvin 2 p, oikeat T-arvot 1 p, ei kaksinkertaistu 1 p.",
    "hints": [
      "Muunna ensin K:ksi.",
      "40 °C ei ole kaksinkertainen absoluuttinen lämpötila."
    ],
    "skills": [
      "ke04.kaa.kaasulain_laadulliset_riippuvuudet",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Kaasulain laadulliset riippuvuudet",
      "ke04.kaa.kaasulain_laadulliset_riippuvuudet"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "gas.celsius_vs_kelvin",
      "gas.volume_units"
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
    "seedKey": "ke04-v3:KE04-KAA-039",
    "contentId": "KE04-KAA-039",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Kaasulain laadulliset riippuvuudet",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Suljetun jäykän kaasupullon lämpötila nousee 300 K:stä 330 K:iin. Arvioi paineen suhteellinen muutos, kun n ja V vakioita.",
    "options": [],
    "correctAnswer": null,
    "explanation": "p₂/p₁=T₂/T₁=330/300=1,10, joten paine kasvaa noin 10 %.",
    "scoring": "4 p: suhde 1 p, lasku 1 p, 1,10 1 p, 10 % 1 p.",
    "hints": [
      "p∝T.",
      "Jaa 330/300."
    ],
    "skills": [
      "ke04.kaa.kaasulain_laadulliset_riippuvuudet",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Kaasulain laadulliset riippuvuudet",
      "ke04.kaa.kaasulain_laadulliset_riippuvuudet"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
    ],
    "estimatedSeconds": 271,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Soveltaminen"
  },
  {
    "seedKey": "ke04-v3:KE04-KAA-040",
    "contentId": "KE04-KAA-040",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Kaasulain laadulliset riippuvuudet",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Miksi kaasun paine voi kasvaa kuumassa suljetussa jäykässä astiassa, vaikka kaasumolekyylien määrä ei muutu?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Lämpötilan noustessa molekyylien keskimääräinen liike-energia kasvaa ja törmäykset seiniin ovat voimakkaampia/useammin impulssia siirtäviä; pV=nRT:n mukaan vakiossa V:ssä p kasvaa T:n mukana.",
    "scoring": "4 p: lämpötila 1 p, molekyyliliike/törmäykset 2 p, p∝T 1 p.",
    "hints": [
      "Ajattele hiukkasten liikettä.",
      "Tilavuus ei pääse kasvamaan",
      "Kirjoita välivaiheet näkyviin ja tarkista lopuksi yksiköt sekä tuloksen suuruusluokka.."
    ],
    "skills": [
      "ke04.kaa.kaasulain_laadulliset_riippuvuudet",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Kaasulain laadulliset riippuvuudet",
      "ke04.kaa.kaasulain_laadulliset_riippuvuudet"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-KAA-041",
    "contentId": "KE04-KAA-041",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Integroivat kaasustoikiometrian tehtävät",
    "questionType": "matching",
    "difficulty": 2,
    "prompt": "Yhdistä tyypillinen virhe ja korjaus: °C suoraan yhtälöön; mL R:n kanssa litroina; reaktiokertoimien ohitus ↔ muuta K:ksi; muuta L:ksi; käytä ainemääräsuhdetta.",
    "options": [],
    "correctAnswer": null,
    "explanation": "°C→K; mL→L; kertoimet→ainemääräsuhde.",
    "scoring": "3 p.",
    "hints": [
      "Tarkista yksiköt ennen laskua.",
      "Reaktioyhtälö ennen kaasulakia."
    ],
    "skills": [
      "ke04.kaa.integroivat_kaasustoikiometrian_tehtavat",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Integroivat kaasustoikiometrian tehtävät",
      "ke04.kaa.integroivat_kaasustoikiometrian_tehtavat"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
    ],
    "estimatedSeconds": 133,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "°C",
        "right": "K"
      },
      {
        "left": "mL",
        "right": "L"
      },
      {
        "left": "kertoimet",
        "right": "ainemääräsuhde."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-KAA-042",
    "contentId": "KE04-KAA-042",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Integroivat kaasustoikiometrian tehtävät",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi kaasustoikiometriatehtävässä on usein järkevää edetä järjestyksessä kaasutilavuus → ainemäärä → reaktiosuhde → haluttu suure?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Reaktiokertoimet kuvaavat ainemääräsuhteita. pV=nRT muuttaa mitatun kaasutilavuuden ainemääräksi, jonka jälkeen stoikiometria voidaan tehdä luotettavasti ja lopuksi muuntaa haluttuun suureeseen.",
    "scoring": "4 p.",
    "hints": [
      "Kertoimet kertovat mooleja.",
      "Kaasulaki yhdistää V:n ja n:n."
    ],
    "skills": [
      "ke04.kaa.integroivat_kaasustoikiometrian_tehtavat",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Integroivat kaasustoikiometrian tehtävät",
      "ke04.kaa.integroivat_kaasustoikiometrian_tehtavat"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-KAA-043",
    "contentId": "KE04-KAA-043",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Integroivat kaasustoikiometrian tehtävät",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Väite: '24,0 L kaasua on aina tasan 1 mol olosuhteista riippumatta.' Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Väärin. Kaasun moolitilavuus riippuu lämpötilasta ja paineesta. Ainemäärä pitää päätellä annetuista olosuhteista esimerkiksi pV=nRT:llä.",
    "scoring": "3 p: riippuu T:stä 1 p, p:stä 1 p, pV=nRT 1 p.",
    "hints": [
      "V=nRT/p.",
      "Muuta T tai p ja tilavuus muuttuu."
    ],
    "skills": [
      "ke04.kaa.integroivat_kaasustoikiometrian_tehtavat",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Integroivat kaasustoikiometrian tehtävät",
      "ke04.kaa.integroivat_kaasustoikiometrian_tehtavat"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "gas.volume_units"
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
    "seedKey": "ke04-v3:KE04-KAA-044",
    "contentId": "KE04-KAA-044",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Integroivat kaasustoikiometrian tehtävät",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "24,9 L kaasua on 100 kPa:ssa ja 300 K:ssa. Laske n ja arvioi, kuinka paljon tilavuus olisi samassa p:ssa ja T:ssa 0,500 mol:lle.",
    "options": [],
    "correctAnswer": null,
    "explanation": "n≈1,00 mol; 0,500 mol vie noin puolet eli 12,5 L (tarkemmin 12,47 L).",
    "scoring": "5 p: n≈1,00 3 p, suora verrannollisuus 1 p, 12,5 L 1 p.",
    "hints": [
      "Laske ensin n.",
      "Samassa T/p:ssä V∝n",
      "Kirjoita välivaiheet näkyviin ja tarkista lopuksi yksiköt sekä tuloksen suuruusluokka.."
    ],
    "skills": [
      "ke04.kaa.integroivat_kaasustoikiometrian_tehtavat",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Integroivat kaasustoikiometrian tehtävät",
      "ke04.kaa.integroivat_kaasustoikiometrian_tehtavat"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-KAA-045",
    "contentId": "KE04-KAA-045",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "Integroivat kaasustoikiometrian tehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "4,98 L H₂-kaasua on 100 kPa:ssa ja 300 K:ssa. Se reagoi reaktiossa 2H₂+O₂→2H₂O. Laske n(H₂), tarvittava n(O₂) ja O₂:n tilavuus samoissa oloissa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "n(H₂)=100×4,98/(8,314×300)=0,200 mol; n(O₂)=0,100 mol; V(O₂)=0,100×8,314×300/100=2,49 L.",
    "scoring": "7 p: H₂:n n 3 p, O₂:n n 2 p, O₂:n V 2 p.",
    "hints": [
      "Kaasulaki H₂:lle.",
      "Reaktiosuhde 2:1.",
      "Kaasulaki O₂:lle."
    ],
    "skills": [
      "ke04.kaa.integroivat_kaasustoikiometrian_tehtavat",
      "task.integroiva_tehtava"
    ],
    "expectedConcepts": [
      "Integroivat kaasustoikiometrian tehtävät",
      "ke04.kaa.integroivat_kaasustoikiometrian_tehtavat"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 7,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Integroiva tehtävä"
  },
  {
    "seedKey": "ke04-v3:KE04-KAA-X01",
    "contentId": "KE04-KAA-X01",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Kaasuruiskussa on 0,0200 mol kaasua 298 K:ssa. Paine on 100 kPa. a) Laske ideaalinen tilavuus R=8,314 kPa·L/(mol·K). b) Mittaus antaa 0,505 L. Laske prosentuaalinen ero ideaaliseen arvoon.",
    "options": [],
    "correctAnswer": null,
    "explanation": "V=nRT/p=0,0200×8,314×298/100=0,495 L. Prosenttiero=(0,505−0,495)/0,495×100≈2,0 %.",
    "scoring": "7 p: V-kaava/sijoitus 3 p; V 1 p; ero-kaava 1 p; lasku/tulos 2 p.",
    "hints": [
      "Käytä kelvinejä.",
      "V=nRT/p.",
      "Vertaa mittausta laskennalliseen."
    ],
    "skills": [
      "gas.pv_nrt",
      "data.percent_error"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "gas.pv_nrt",
      "data.percent_error"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
    ],
    "estimatedSeconds": 309,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 7,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Kokeellinen data"
  },
  {
    "seedKey": "ke04-v3:KE04-KAA-X02",
    "contentId": "KE04-KAA-X02",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "multiple_choice",
    "difficulty": 4,
    "prompt": "Kaasun tilavuus lasketaan pV=nRT:llä. p=101 kPa, n=0,100 mol, T=25 °C. Mikä on oikea valmistelu?",
    "options": [
      "Käytä T=25",
      "Muunna T=298 K ja käytä R:n kanssa kPa ja L",
      "Muunna p=0,101 kPa",
      "Käytä tilavuus millilitroina R=8,314 kPa·L/(mol·K)."
    ],
    "correctAnswer": "Muunna T=298 K ja käytä R:n kanssa kPa ja L",
    "explanation": "B.",
    "scoring": "4 p: B 1 p; T-muunnos 1 p; paineyksikön sopivuus 1 p; tilavuusyksikön sopivuus 1 p.",
    "hints": [
      "Absoluuttinen lämpötila.",
      "R kertoo, mitä paine- ja tilavuusyksiköitä käytetään",
      "Sulje pois vaihtoehdot vertaamalla jokaista niistä reaktioyhtälöön, rakenteeseen tai määritelmään.."
    ],
    "skills": [
      "gas.units",
      "gas.temperature"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "gas.units",
      "gas.temperature"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_in_ideal_gas",
      "unit_mismatch"
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
    "seedKey": "ke04-v3:KE04-KAA-X03",
    "contentId": "KE04-KAA-X03",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "short_answer",
    "difficulty": 4,
    "prompt": "Jäykän astian kaasulle mitataan: 280 K→94 kPa, 300 K→101 kPa, 320 K→108 kPa. a) Mitä riippuvuutta aineisto tukee? b) Arvioi paine 310 K:ssa. c) Miksi °C-asteikko ei olisi yhtä luonteva suoran verrannollisuuden kuvaamiseen?",
    "options": [],
    "correctAnswer": null,
    "explanation": "a) p on likimain suoraan verrannollinen absoluuttiseen T:hen vakioissa n,V. b) noin 104–105 kPa. c) Suora verrannollisuus perustuu absoluuttiseen nollapisteeseen eli kelvineihin.",
    "scoring": "7 p: riippuvuus 2 p; arvio 2 p; kelvinperustelu 3 p.",
    "hints": [
      "Tarkista p/T-suhde.",
      "310 K on puolivälissä 300 ja 320 K",
      "Kirjoita välivaiheet näkyviin ja tarkista lopuksi yksiköt sekä tuloksen suuruusluokka.."
    ],
    "skills": [
      "gas.p_vs_T",
      "data_interpolation"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "gas.p_vs_T",
      "data_interpolation"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
    ],
    "estimatedSeconds": 154,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 7,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Kuvaajan tulkinta"
  },
  {
    "seedKey": "ke04-v3:KE04-KAA-X04",
    "contentId": "KE04-KAA-X04",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "calculation",
    "difficulty": 4,
    "prompt": "CaCO₃+2HCl→CaCl₂+H₂O+CO₂. Reaktiossa muodostuu 0,0500 mol CO₂. Laske kaasun tilavuus 298 K:ssa ja 100 kPa:ssa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "V=nRT/p=0,0500×8,314×298/100=1,24 L.",
    "scoring": "4 p: kaava 1 p; sijoitus 1 p; lasku 1 p; yksikkö 1 p.",
    "hints": [
      "Ainemäärä on jo annettu.",
      "Ratkaise V",
      "Kirjoita välivaiheet näkyviin ja tarkista lopuksi yksiköt sekä tuloksen suuruusluokka.."
    ],
    "skills": [
      "gas.stoichiometry",
      "gas.volume"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "gas.stoichiometry",
      "gas.volume"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
    ],
    "estimatedSeconds": 221,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Kaasustoikiometria"
  },
  {
    "seedKey": "ke04-v3:KE04-KAA-X05",
    "contentId": "KE04-KAA-X05",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "error_detection",
    "difficulty": 5,
    "prompt": "Samasta kaasunäytteestä opiskelija saa n=0,50 mol käyttäen V=500, p=100, T=298 ja R=8,314 kPa·L/(mol·K). Todellinen tilavuus oli 500 mL. Mikä virhe on ja kuinka suuri sen vaikutus on ainemäärään?",
    "options": [],
    "correctAnswer": null,
    "explanation": "500 mL pitäisi olla 0,500 L. Käyttämällä 500 L ainemäärä tulee 1000 kertaa liian suureksi.",
    "scoring": "5 p: oikea muunnos 2 p; virhetekijä 2 p; vaikutuksen suunta 1 p.",
    "hints": [
      "Katso R:n L-yksikköä.",
      "500 mL=0,500 L",
      "Kirjoita välivaiheet näkyviin ja tarkista lopuksi yksiköt sekä tuloksen suuruusluokka.."
    ],
    "skills": [
      "gas.units",
      "error_factor"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "gas.units",
      "error_factor"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "mL_as_L"
    ],
    "estimatedSeconds": 248,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 5,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Virheen analyysi"
  },
  {
    "seedKey": "ke04-v3:KE04-KAA-X06",
    "contentId": "KE04-KAA-X06",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "application",
    "difficulty": 5,
    "prompt": "CO₂ kerätään vesialtaassa kaasuruiskuun. Mitattu tilavuus on järjestelmällisesti hieman pienempi kuin stoikiometriasta ennustettu. Anna kaksi uskottavaa kokeellista syytä ja kerro, kumpaan suuntaan kumpikin vaikuttaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Esim. osa CO₂:sta liukenee veteen →mitattu kaasutilavuus liian pieni; järjestelmä vuotaa →kaasua karkaa →liian pieni; reaktio ei mene täydellisesti →liian pieni. Kaksi perusteltua riittää.",
    "scoring": "6 p: kaksi eri syytä 2 p/kpl; vaikutussuunnan perustelu 1 p/kpl.",
    "hints": [
      "Kysy, voiko kaasua kadota mittauksesta.",
      "CO₂ liukenee jonkin verran veteen",
      "Kirjoita välivaiheet näkyviin ja tarkista lopuksi yksiköt sekä tuloksen suuruusluokka.."
    ],
    "skills": [
      "gas.experimental_error",
      "data_reasoning"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "gas.experimental_error",
      "data_reasoning"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
    ],
    "estimatedSeconds": 347,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 6,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Kokeellinen virhelähde"
  },
  {
    "seedKey": "ke04-v3:KE04-KAA-X07",
    "contentId": "KE04-KAA-X07",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "0,500 g CaCO₃:a (M=100,0 g/mol) reagoi ylimääräisen HCl:n kanssa. CO₂ kerätään 22,0 °C:ssa ja 99,0 kPa:ssa. a) Laske teoreettinen n(CO₂). b) Laske teoreettinen V. c) Mittaus antaa 112 mL. Laske tilavuussaanto prosentteina vertaamalla mitattua teoreettiseen samoissa oloissa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "n(CaCO₃)=0,00500 mol=n(CO₂). T=295,15 K. V=0,00500×8,314×295,15/99,0=0,124 L=124 mL. Saanto≈112/124×100≈90,3 %.",
    "scoring": "12 p: n 2 p; T 1 p; V-kaava 2 p; V 2 p; mL-muunnos 1 p; saanto 4 p.",
    "hints": [
      "CaCO₃:CO₂=1:1.",
      "°C→K.",
      "Vertaa samoissa oloissa mitattua ja teoreettista tilavuutta."
    ],
    "skills": [
      "gas.stoichiometry",
      "pv_nrt",
      "yield"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "gas.stoichiometry",
      "pv_nrt",
      "yield"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 12,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Koereservi – moniosainen"
  },
  {
    "seedKey": "ke04-v3:KE04-KAA-X08",
    "contentId": "KE04-KAA-X08",
    "chapter": 5,
    "topicName": "Ideaalikaasu ja kaasustoikiometria",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "Tuntemattoman kaasun massa on 1,76 g. Kaasu täyttää 1,00 L tilavuuden 100 kPa:ssa ja 300 K:ssa. a) Laske kaasun ainemäärä. b) Laske moolimassa. c) Vaihtoehdot ovat N₂, O₂, CO₂ ja CH₄. Tunnista todennäköisin kaasu. d) Arvioi, miten pieni vuoto ennen tilavuuden lukemista vaikuttaisi laskettuun moolimassaan, jos p,V,T mitataan vuodon jälkeen mutta massa oli punnittu ennen vuotoa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "a) n=pV/RT=100×1,00/(8,314×300)=0,0401 mol. b) M=1,76/0,0401≈43,9 g/mol. c) CO₂. d) Vuodon jälkeen n laskisi mutta käytetty massa olisi liian suuri suhteessa jäljellä olevaan kaasuun, joten laskettu M olisi liian suuri.",
    "scoring": "12 p: n 3 p; M 3 p; tunnistus 2 p; vuodon analyysi 4 p.",
    "hints": [
      "pV=nRT.",
      "M=m/n.",
      "Vertaa vaihtoehtojen moolimassoja.",
      "Vuoto pienentää jäljellä olevia mooleja."
    ],
    "skills": [
      "gas.molar_mass",
      "gas.identification",
      "experimental_error"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "gas.molar_mass",
      "gas.identification",
      "experimental_error"
    ],
    "prerequisites": [
      "ideal_gas_equation",
      "unit_conversion",
      "stoichiometry"
    ],
    "commonErrors": [
      "celsius_vs_kelvin",
      "gas_unit_conversion"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 12,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Koereservi – päätelmä"
  }
];
