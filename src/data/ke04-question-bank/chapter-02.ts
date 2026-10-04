import type { Ke04SeedQuestion } from "./types";

export const questions: Ke04SeedQuestion[] = [
  {
    "seedKey": "ke04-v3:KE04-STO-001",
    "contentId": "KE04-STO-001",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Ainemäärä ja mooli",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitä yksi mooli tarkoittaa hiukkasmääränä?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Yksi mooli sisältää Avogadron vakion verran hiukkasia, noin 6,022×10²³ kappaletta.",
    "scoring": "2 p: mooli-hiukkasyhteys 1 p, Avogadron vakio 1 p.",
    "hints": [
      "Ajattele moolia kemian 'tusinana'.",
      "Luku on noin 6×10²³."
    ],
    "skills": [
      "ke04.sto.ainemaara_ja_mooli",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Ainemäärä ja mooli",
      "ke04.sto.ainemaara_ja_mooli"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-002",
    "contentId": "KE04-STO-002",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Ainemäärä ja mooli",
    "questionType": "multiple_choice",
    "difficulty": 1,
    "prompt": "Mikä on ainemäärän SI-yksikkö?",
    "options": [
      "g",
      "mol",
      "g/mol",
      "mol/L"
    ],
    "correctAnswer": "mol",
    "explanation": "B, mol.",
    "scoring": "1 p.",
    "hints": [
      "Ainemäärä merkitään n.",
      "Sen yksikkö ei ole massa."
    ],
    "skills": [
      "ke04.sto.ainemaara_ja_mooli",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Ainemäärä ja mooli",
      "ke04.sto.ainemaara_ja_mooli"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "sto.common_misconception"
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
    "seedKey": "ke04-v3:KE04-STO-003",
    "contentId": "KE04-STO-003",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Ainemäärä ja mooli",
    "questionType": "matching",
    "difficulty": 2,
    "prompt": "Yhdistä suure ja symboli: ainemäärä, massa, moolimassa, hiukkasmäärä ↔ n, m, M, N.",
    "options": [],
    "correctAnswer": null,
    "explanation": "ainemäärä→n; massa→m; moolimassa→M; hiukkasmäärä→N.",
    "scoring": "4 p, 1 p / pari.",
    "hints": [
      "Pieni m on massa.",
      "Iso M on moolimassa."
    ],
    "skills": [
      "ke04.sto.ainemaara_ja_mooli",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Ainemäärä ja mooli",
      "ke04.sto.ainemaara_ja_mooli"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
    ],
    "estimatedSeconds": 133,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "ainemäärä",
        "right": "n"
      },
      {
        "left": "massa",
        "right": "m"
      },
      {
        "left": "moolimassa",
        "right": "M"
      },
      {
        "left": "hiukkasmäärä",
        "right": "N."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-STO-004",
    "contentId": "KE04-STO-004",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Ainemäärä ja mooli",
    "questionType": "explanation",
    "difficulty": 2,
    "prompt": "Miksi kemiallisissa reaktioissa on hyödyllisempää vertailla mooleja kuin grammoja?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Reaktioyhtälön kertoimet kuvaavat hiukkasten ja siten ainemäärien suhteita. Eri aineiden moolimassat ovat erilaiset, joten samat massat eivät tarkoita samoja hiukkasmääriä.",
    "scoring": "3 p: kertoimet→moolisuhde 1 p, eri moolimassat 1 p, hiukkasmäärä 1 p.",
    "hints": [
      "Kertoimet eivät kuvaa grammoja.",
      "1 mol eri aineita painaa eri määrän."
    ],
    "skills": [
      "ke04.sto.ainemaara_ja_mooli",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Ainemäärä ja mooli",
      "ke04.sto.ainemaara_ja_mooli"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-005",
    "contentId": "KE04-STO-005",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Ainemäärä ja mooli",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Väite: '1 mol mitä tahansa ainetta painaa 1 g.' Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Väärin. Yhden moolin massa on aineen moolimassa grammoina; esimerkiksi 1 mol H₂O on noin 18,0 g ja 1 mol CO₂ noin 44,0 g.",
    "scoring": "3 p: moolimassan merkitys 1 p, väärän yleistyksen korjaus 1 p, esimerkki 1 p.",
    "hints": [
      "Moolimassa riippuu kemiallisesta kaavasta.",
      "Laske atomimassat yhteen."
    ],
    "skills": [
      "ke04.sto.ainemaara_ja_mooli",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Ainemäärä ja mooli",
      "ke04.sto.ainemaara_ja_mooli"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "sto.common_misconception"
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
    "seedKey": "ke04-v3:KE04-STO-006",
    "contentId": "KE04-STO-006",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Moolimassan laskeminen kaavasta",
    "questionType": "calculation",
    "difficulty": 1,
    "prompt": "Laske veden H₂O moolimassa, kun H=1,008 ja O=16,00 g/mol.",
    "options": [],
    "correctAnswer": null,
    "explanation": "M(H₂O)=2×1,008+16,00=18,016 g/mol ≈18,02 g/mol.",
    "scoring": "3 p: H-osuus 1 p, O-osuus 1 p, summa 1 p.",
    "hints": [
      "H-atomeja on kaksi.",
      "Kerro indeksillä."
    ],
    "skills": [
      "ke04.sto.moolimassan_laskeminen_kaavasta",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Moolimassan laskeminen kaavasta",
      "ke04.sto.moolimassan_laskeminen_kaavasta"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
    ],
    "estimatedSeconds": 140,
    "examEligible": false,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-STO-007",
    "contentId": "KE04-STO-007",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Moolimassan laskeminen kaavasta",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Laske CO₂:n moolimassa, kun C=12,01 ja O=16,00 g/mol.",
    "options": [],
    "correctAnswer": null,
    "explanation": "12,01+2×16,00=44,01 g/mol.",
    "scoring": "3 p.",
    "hints": [
      "Kaksi O-atomia.",
      "Lisää C:n massa."
    ],
    "skills": [
      "ke04.sto.moolimassan_laskeminen_kaavasta",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Moolimassan laskeminen kaavasta",
      "ke04.sto.moolimassan_laskeminen_kaavasta"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-008",
    "contentId": "KE04-STO-008",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Moolimassan laskeminen kaavasta",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Laske NaCl:n moolimassa, kun Na=22,99 ja Cl=35,45 g/mol.",
    "options": [],
    "correctAnswer": null,
    "explanation": "58,44 g/mol.",
    "scoring": "2 p: lasku 1 p, tulos/yksikkö 1 p.",
    "hints": [
      "Suhde 1:1.",
      "22,99+35,45."
    ],
    "skills": [
      "ke04.sto.moolimassan_laskeminen_kaavasta",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Moolimassan laskeminen kaavasta",
      "ke04.sto.moolimassan_laskeminen_kaavasta"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-009",
    "contentId": "KE04-STO-009",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Moolimassan laskeminen kaavasta",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "Laske Ca(OH)₂:n moolimassa, kun Ca=40,08, O=16,00 ja H=1,008 g/mol.",
    "options": [],
    "correctAnswer": null,
    "explanation": "40,08+2×(16,00+1,008)=74,096 g/mol ≈74,10 g/mol.",
    "scoring": "4 p: sulun käsittely 1 p, O/H-osuus 1 p, summa 1 p, yksikkö 1 p.",
    "hints": [
      "OH-ryhmiä on kaksi.",
      "Kerro koko sulku kahdella."
    ],
    "skills": [
      "ke04.sto.moolimassan_laskeminen_kaavasta",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Moolimassan laskeminen kaavasta",
      "ke04.sto.moolimassan_laskeminen_kaavasta"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-010",
    "contentId": "KE04-STO-010",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Moolimassan laskeminen kaavasta",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija laskee Ca(OH)₂:n moolimassaksi 40,08+16,00+2×1,008. Mikä puuttuu?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Hän kertoi vain vedyn kahdella. Sulun indeksi 2 koskee sekä O- että H-atomeja; oikea on 40,08+2×16,00+2×1,008≈74,10 g/mol.",
    "scoring": "3 p: O:n kerroin 2 tunnistettu 1 p, oikea rakenne 1 p, tulos 1 p.",
    "hints": [
      "Indeksi sulun jälkeen koskee koko ryhmää.",
      "O-atomejakin on kaksi."
    ],
    "skills": [
      "ke04.sto.moolimassan_laskeminen_kaavasta",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Moolimassan laskeminen kaavasta",
      "ke04.sto.moolimassan_laskeminen_kaavasta"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "stoichiometry.mass_vs_mole",
      "stoichiometry.molar_mass_formula"
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
    "seedKey": "ke04-v3:KE04-STO-011",
    "contentId": "KE04-STO-011",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Massa ja ainemäärä",
    "questionType": "short_answer",
    "difficulty": 1,
    "prompt": "Kirjoita yhteys massan, ainemäärän ja moolimassan välillä.",
    "options": [],
    "correctAnswer": null,
    "explanation": "n=m/M, vastaavasti m=nM.",
    "scoring": "2 p: jompikumpi oikein 1 p, toinen tai muunnos 1 p.",
    "hints": [
      "Moolimassa = massa per mooli.",
      "n=m/M."
    ],
    "skills": [
      "ke04.sto.massa_ja_ainemaara",
      "task.kaava"
    ],
    "expectedConcepts": [
      "Massa ja ainemäärä",
      "ke04.sto.massa_ja_ainemaara"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-012",
    "contentId": "KE04-STO-012",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Massa ja ainemäärä",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Kuinka monta moolia on 36,0 g vettä, kun M(H₂O)=18,0 g/mol?",
    "options": [],
    "correctAnswer": null,
    "explanation": "n=36,0/18,0=2,00 mol.",
    "scoring": "3 p.",
    "hints": [
      "n=m/M.",
      "Jaa massa moolimassalla."
    ],
    "skills": [
      "ke04.sto.massa_ja_ainemaara",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Massa ja ainemäärä",
      "ke04.sto.massa_ja_ainemaara"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-013",
    "contentId": "KE04-STO-013",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Massa ja ainemäärä",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Mikä massa on 0,500 mol CO₂:ta, kun M=44,0 g/mol?",
    "options": [],
    "correctAnswer": null,
    "explanation": "m=0,500×44,0=22,0 g.",
    "scoring": "3 p.",
    "hints": [
      "m=nM.",
      "Kerro."
    ],
    "skills": [
      "ke04.sto.massa_ja_ainemaara",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Massa ja ainemäärä",
      "ke04.sto.massa_ja_ainemaara"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-014",
    "contentId": "KE04-STO-014",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Massa ja ainemäärä",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "Kuinka monta moolia NaCl:ää on 5,844 g:ssa, kun M=58,44 g/mol?",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,1000 mol.",
    "scoring": "3 p.",
    "hints": [
      "n=m/M.",
      "5,844/58,44."
    ],
    "skills": [
      "ke04.sto.massa_ja_ainemaara",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Massa ja ainemäärä",
      "ke04.sto.massa_ja_ainemaara"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-015",
    "contentId": "KE04-STO-015",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Massa ja ainemäärä",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija laskee 0,25 mol aineen massan jakamalla n/M. Mikä on oikea kaava?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Massa saadaan m=nM. Jakolasku n/M ei anna massan yksikköä eikä oikeaa fysikaalista merkitystä.",
    "scoring": "3 p: m=nM 2 p, yksikköperustelu 1 p.",
    "hints": [
      "Tarkista yksiköt: mol×g/mol=g.",
      "Dimensio kertoo kaavan suunnan."
    ],
    "skills": [
      "ke04.sto.massa_ja_ainemaara",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Massa ja ainemäärä",
      "ke04.sto.massa_ja_ainemaara"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "stoichiometry.mass_vs_mole"
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
    "seedKey": "ke04-v3:KE04-STO-016",
    "contentId": "KE04-STO-016",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Hiukkasmäärä ja Avogadron vakio",
    "questionType": "short_answer",
    "difficulty": 1,
    "prompt": "Kirjoita hiukkasmäärän N ja ainemäärän n yhteys Avogadron vakion avulla.",
    "options": [],
    "correctAnswer": null,
    "explanation": "N=nN_A ja n=N/N_A.",
    "scoring": "2 p.",
    "hints": [
      "Yksi mol sisältää N_A hiukkasta.",
      "Kerro mooleja N_A:lla."
    ],
    "skills": [
      "ke04.sto.hiukkasmaara_ja_avogadron_vakio",
      "task.kaava"
    ],
    "expectedConcepts": [
      "Hiukkasmäärä ja Avogadron vakio",
      "ke04.sto.hiukkasmaara_ja_avogadron_vakio"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-017",
    "contentId": "KE04-STO-017",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Hiukkasmäärä ja Avogadron vakio",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Kuinka monta molekyyliä on 2,00 mol H₂O:ssa? Käytä N_A=6,022×10²³ mol⁻¹.",
    "options": [],
    "correctAnswer": null,
    "explanation": "N=2,00×6,022×10²³=1,2044×10²⁴ ≈1,20×10²⁴ molekyyliä.",
    "scoring": "3 p.",
    "hints": [
      "N=nN_A.",
      "Kerro kahdella."
    ],
    "skills": [
      "ke04.sto.hiukkasmaara_ja_avogadron_vakio",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Hiukkasmäärä ja Avogadron vakio",
      "ke04.sto.hiukkasmaara_ja_avogadron_vakio"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-018",
    "contentId": "KE04-STO-018",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Hiukkasmäärä ja Avogadron vakio",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Kuinka monta moolia on 3,011×10²³ molekyyliä?",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,5000 mol.",
    "scoring": "3 p.",
    "hints": [
      "Tämä on puolet Avogadron vakiosta.",
      "n=N/N_A."
    ],
    "skills": [
      "ke04.sto.hiukkasmaara_ja_avogadron_vakio",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Hiukkasmäärä ja Avogadron vakio",
      "ke04.sto.hiukkasmaara_ja_avogadron_vakio"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-019",
    "contentId": "KE04-STO-019",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Hiukkasmäärä ja Avogadron vakio",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "0,250 mol CO₂ sisältää kuinka monta happiatomia?",
    "options": [],
    "correctAnswer": null,
    "explanation": "CO₂-molekyylejä 0,250N_A; O-atomeja kaksi per molekyyli → 0,500N_A=3,011×10²³ O-atomia.",
    "scoring": "4 p: molekyylimoolit 1 p, kaksi O:ta 1 p, lasku 1 p, tulos 1 p.",
    "hints": [
      "Ensin CO₂-molekyylit.",
      "Jokaisessa kaksi O:ta."
    ],
    "skills": [
      "ke04.sto.hiukkasmaara_ja_avogadron_vakio",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Hiukkasmäärä ja Avogadron vakio",
      "ke04.sto.hiukkasmaara_ja_avogadron_vakio"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-020",
    "contentId": "KE04-STO-020",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Hiukkasmäärä ja Avogadron vakio",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija sanoo, että 1 mol CO₂:ssa on 1 mol atomeja yhteensä. Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Yhdessä CO₂-molekyylissä on 3 atomia, joten 1 mol CO₂-molekyylejä sisältää yhteensä 3 mol atomeja: 1 mol C-atomeja ja 2 mol O-atomeja.",
    "scoring": "4 p: 3 atomia/molekyyli 1 p, 3 mol atomia 1 p, C 1 p, O 1 p.",
    "hints": [
      "Laske atomit kaavasta.",
      "Moolikerroin seuraa atomien indeksejä."
    ],
    "skills": [
      "ke04.sto.hiukkasmaara_ja_avogadron_vakio",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Hiukkasmäärä ja Avogadron vakio",
      "ke04.sto.hiukkasmaara_ja_avogadron_vakio"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "sto.common_misconception"
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
    "seedKey": "ke04-v3:KE04-STO-021",
    "contentId": "KE04-STO-021",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Reaktiokertoimet ja ainemääräsuhteet",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitä tasapainotetun reaktioyhtälön kertoimet kertovat stoikiometriassa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Reagoivien ja muodostuvien aineiden hiukkas- ja ainemääräsuhteet.",
    "scoring": "2 p.",
    "hints": [
      "Kertoimet eivät ole massoja.",
      "Ne kertovat molisuhteita."
    ],
    "skills": [
      "ke04.sto.reaktiokertoimet_ja_ainemaarasuhteet",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Reaktiokertoimet ja ainemääräsuhteet",
      "ke04.sto.reaktiokertoimet_ja_ainemaarasuhteet"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-022",
    "contentId": "KE04-STO-022",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Reaktiokertoimet ja ainemääräsuhteet",
    "questionType": "matching",
    "difficulty": 2,
    "prompt": "Reaktiossa 2H₂+O₂→2H₂O yhdistä suhteet: H₂:O₂, H₂:H₂O, O₂:H₂O.",
    "options": [],
    "correctAnswer": null,
    "explanation": "H₂:O₂=2:1; H₂:H₂O=2:2=1:1; O₂:H₂O=1:2.",
    "scoring": "3 p.",
    "hints": [
      "Lue kertoimet.",
      "Suhteita voi supistaa."
    ],
    "skills": [
      "ke04.sto.reaktiokertoimet_ja_ainemaarasuhteet",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Reaktiokertoimet ja ainemääräsuhteet",
      "ke04.sto.reaktiokertoimet_ja_ainemaarasuhteet"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
    ],
    "estimatedSeconds": 133,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "H₂:O₂",
        "right": "2:1"
      },
      {
        "left": "H₂:H₂O",
        "right": "2:2=1:1"
      },
      {
        "left": "O₂:H₂O",
        "right": "1:2."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-STO-023",
    "contentId": "KE04-STO-023",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Reaktiokertoimet ja ainemääräsuhteet",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "2H₂+O₂→2H₂O. Jos H₂:ta reagoi 3,0 mol ja O₂ on ylimäärin, kuinka paljon H₂O:ta muodostuu?",
    "options": [],
    "correctAnswer": null,
    "explanation": "3,0 mol H₂O, koska H₂:H₂O=1:1.",
    "scoring": "2 p.",
    "hints": [
      "Kertoimet 2:2.",
      "Sama ainemäärä."
    ],
    "skills": [
      "ke04.sto.reaktiokertoimet_ja_ainemaarasuhteet",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Reaktiokertoimet ja ainemääräsuhteet",
      "ke04.sto.reaktiokertoimet_ja_ainemaarasuhteet"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-024",
    "contentId": "KE04-STO-024",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Reaktiokertoimet ja ainemääräsuhteet",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "N₂+3H₂→2NH₃. Kuinka paljon H₂:ta tarvitaan 0,80 mol N₂:lle?",
    "options": [],
    "correctAnswer": null,
    "explanation": "2,40 mol H₂.",
    "scoring": "3 p: suhde 1:3 1 p, lasku 1 p, yksikkö 1 p.",
    "hints": [
      "Kerro N₂ kolmella.",
      "0,80×3."
    ],
    "skills": [
      "ke04.sto.reaktiokertoimet_ja_ainemaarasuhteet",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Reaktiokertoimet ja ainemääräsuhteet",
      "ke04.sto.reaktiokertoimet_ja_ainemaarasuhteet"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-025",
    "contentId": "KE04-STO-025",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Reaktiokertoimet ja ainemääräsuhteet",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "N₂+3H₂→2NH₃. Opiskelija käyttää N₂:NH₃-suhteena 1:1, koska 'molemmissa on typpeä'. Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Reaktiokertoimet määräävät suhteen: 1 mol N₂ →2 mol NH₃. Atomimäärä säilyy, koska yhdessä N₂:ssa on kaksi N-atomia ja kahdessa NH₃:ssa yhteensä kaksi N-atomia.",
    "scoring": "3 p: suhde 1:2 1 p, atomitase 1 p, selitys 1 p.",
    "hints": [
      "Lue kertoimet, älä alkuaineiden nimiä.",
      "Laske N-atomit."
    ],
    "skills": [
      "ke04.sto.reaktiokertoimet_ja_ainemaarasuhteet",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Reaktiokertoimet ja ainemääräsuhteet",
      "ke04.sto.reaktiokertoimet_ja_ainemaarasuhteet"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "sto.common_misconception"
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
    "seedKey": "ke04-v3:KE04-STO-026",
    "contentId": "KE04-STO-026",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Molista moliin -stoikiometria",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "2Al+3Cl₂→2AlCl₃. Kuinka paljon AlCl₃:a muodostuu 0,60 mol Al:sta, kun Cl₂ on ylimäärin?",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,60 mol AlCl₃, koska Al:AlCl₃=2:2=1:1.",
    "scoring": "3 p.",
    "hints": [
      "Käytä kertoimia 2:2.",
      "Sama moolimäärä."
    ],
    "skills": [
      "ke04.sto.molista_moliin_stoikiometria",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Molista moliin -stoikiometria",
      "ke04.sto.molista_moliin_stoikiometria"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-027",
    "contentId": "KE04-STO-027",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Molista moliin -stoikiometria",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "2Al+3Cl₂→2AlCl₃. Kuinka paljon Cl₂ tarvitaan 0,40 mol Al:lle?",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,40×3/2=0,60 mol Cl₂.",
    "scoring": "3 p.",
    "hints": [
      "Cl₂/Al=3/2.",
      "Kerro 0,40×1,5."
    ],
    "skills": [
      "ke04.sto.molista_moliin_stoikiometria",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Molista moliin -stoikiometria",
      "ke04.sto.molista_moliin_stoikiometria"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-028",
    "contentId": "KE04-STO-028",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Molista moliin -stoikiometria",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "CaCO₃+2HCl→CaCl₂+H₂O+CO₂. Kuinka paljon CO₂:ta syntyy 0,250 mol CaCO₃:sta?",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,250 mol CO₂.",
    "scoring": "2 p.",
    "hints": [
      "Suhde 1:1.",
      "Sama ainemäärä."
    ],
    "skills": [
      "ke04.sto.molista_moliin_stoikiometria",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Molista moliin -stoikiometria",
      "ke04.sto.molista_moliin_stoikiometria"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-029",
    "contentId": "KE04-STO-029",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Molista moliin -stoikiometria",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "CaCO₃+2HCl→... Kuinka paljon HCl:ää tarvitaan 0,250 mol CaCO₃:lle?",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,500 mol HCl.",
    "scoring": "3 p.",
    "hints": [
      "HCl:n kerroin on 2.",
      "Kerro kahdella."
    ],
    "skills": [
      "ke04.sto.molista_moliin_stoikiometria",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Molista moliin -stoikiometria",
      "ke04.sto.molista_moliin_stoikiometria"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-030",
    "contentId": "KE04-STO-030",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Molista moliin -stoikiometria",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "2KClO₃→2KCl+3O₂. Kuinka paljon O₂:ta muodostuu 0,80 mol KClO₃:sta?",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,80×3/2=1,20 mol O₂.",
    "scoring": "3 p.",
    "hints": [
      "Suhde 2:3.",
      "Kerro 1,5:llä."
    ],
    "skills": [
      "ke04.sto.molista_moliin_stoikiometria",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Molista moliin -stoikiometria",
      "ke04.sto.molista_moliin_stoikiometria"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-031",
    "contentId": "KE04-STO-031",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Massa-massa-stoikiometria",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "2Mg+O₂→2MgO. Kuinka monta moolia Mg on 4,86 g:ssa, kun M(Mg)=24,3 g/mol?",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,200 mol.",
    "scoring": "2 p.",
    "hints": [
      "n=m/M.",
      "4,86/24,3."
    ],
    "skills": [
      "ke04.sto.massa_massa_stoikiometria",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Massa-massa-stoikiometria",
      "ke04.sto.massa_massa_stoikiometria"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-032",
    "contentId": "KE04-STO-032",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Massa-massa-stoikiometria",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "Reaktiossa 2Mg + O₂ → 2MgO reagoi 0,200 mol Mg:ta ja O₂ on ylimäärin. Kuinka paljon MgO:ta muodostuu mooleina?",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,200 mol MgO, suhde 2:2.",
    "scoring": "2 p.",
    "hints": [
      "Mg:MgO=1:1.",
      "Sama moolimäärä."
    ],
    "skills": [
      "ke04.sto.massa_massa_stoikiometria",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Massa-massa-stoikiometria",
      "ke04.sto.massa_massa_stoikiometria"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-033",
    "contentId": "KE04-STO-033",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Massa-massa-stoikiometria",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "Laske muodostuvan MgO:n massa, kun n=0,200 mol ja M(MgO)=40,3 g/mol.",
    "options": [],
    "correctAnswer": null,
    "explanation": "8,06 g.",
    "scoring": "3 p.",
    "hints": [
      "m=nM.",
      "0,200×40,3."
    ],
    "skills": [
      "ke04.sto.massa_massa_stoikiometria",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Massa-massa-stoikiometria",
      "ke04.sto.massa_massa_stoikiometria"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-034",
    "contentId": "KE04-STO-034",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Massa-massa-stoikiometria",
    "questionType": "calculation",
    "difficulty": 4,
    "prompt": "CH₄+2O₂→CO₂+2H₂O. Kuinka paljon CO₂:ta grammoina muodostuu 8,00 g CH₄:stä? Käytä M(CH₄)=16,0 ja M(CO₂)=44,0 g/mol.",
    "options": [],
    "correctAnswer": null,
    "explanation": "n(CH₄)=8,00/16,0=0,500 mol; n(CO₂)=0,500 mol; m=0,500×44,0=22,0 g.",
    "scoring": "6 p: n lähtöaine 2 p, suhde 1 p, n tuote 1 p, massa 1 p, tulos 1 p.",
    "hints": [
      "Massa→mol.",
      "Mol→mol reaktioyhtälöllä.",
      "Mol→massa."
    ],
    "skills": [
      "ke04.sto.massa_massa_stoikiometria",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Massa-massa-stoikiometria",
      "ke04.sto.massa_massa_stoikiometria"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
    ],
    "estimatedSeconds": 221,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 6,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-STO-035",
    "contentId": "KE04-STO-035",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Massa-massa-stoikiometria",
    "questionType": "calculation",
    "difficulty": 4,
    "prompt": "2H₂+O₂→2H₂O. Kuinka paljon vettä muodostuu 4,00 g H₂:sta, kun O₂ on ylimäärin? M(H₂)=2,00, M(H₂O)=18,0 g/mol.",
    "options": [],
    "correctAnswer": null,
    "explanation": "n(H₂)=2,00 mol; n(H₂O)=2,00 mol; m(H₂O)=36,0 g.",
    "scoring": "6 p: n(H₂) 2 p, suhde 1 p, n(H₂O) 1 p, massa 1 p, tulos 1 p.",
    "hints": [
      "4,00/2,00=2,00 mol.",
      "H₂:H₂O=1:1",
      "Kirjoita välivaiheet näkyviin ja tarkista lopuksi yksiköt sekä tuloksen suuruusluokka.."
    ],
    "skills": [
      "ke04.sto.massa_massa_stoikiometria",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Massa-massa-stoikiometria",
      "ke04.sto.massa_massa_stoikiometria"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
    ],
    "estimatedSeconds": 221,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 6,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-STO-036",
    "contentId": "KE04-STO-036",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Liuosten ainemäärä ja stoikiometria",
    "questionType": "short_answer",
    "difficulty": 1,
    "prompt": "Kirjoita liuoksen ainemäärän kaava pitoisuuden c ja tilavuuden V avulla.",
    "options": [],
    "correctAnswer": null,
    "explanation": "n=cV, kun c on mol/L ja V litroina.",
    "scoring": "2 p.",
    "hints": [
      "Pitoisuus = mol per litra.",
      "Kerro tilavuudella."
    ],
    "skills": [
      "ke04.sto.liuosten_ainemaara_ja_stoikiometria",
      "task.kaava"
    ],
    "expectedConcepts": [
      "Liuosten ainemäärä ja stoikiometria",
      "ke04.sto.liuosten_ainemaara_ja_stoikiometria"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-037",
    "contentId": "KE04-STO-037",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Liuosten ainemäärä ja stoikiometria",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "0,200 mol/L NaCl-liuosta on 0,500 L. Kuinka paljon NaCl:ää mooleina?",
    "options": [],
    "correctAnswer": null,
    "explanation": "n=0,200×0,500=0,100 mol.",
    "scoring": "3 p.",
    "hints": [
      "n=cV.",
      "Tilavuus on jo litroina."
    ],
    "skills": [
      "ke04.sto.liuosten_ainemaara_ja_stoikiometria",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Liuosten ainemäärä ja stoikiometria",
      "ke04.sto.liuosten_ainemaara_ja_stoikiometria"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-038",
    "contentId": "KE04-STO-038",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Liuosten ainemäärä ja stoikiometria",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "0,100 mol/L HCl-liuosta on 25,0 mL. Laske n(HCl).",
    "options": [],
    "correctAnswer": null,
    "explanation": "V=0,0250 L; n=0,100×0,0250=0,00250 mol.",
    "scoring": "4 p: mL→L 1 p, kaava 1 p, lasku 1 p, tulos 1 p.",
    "hints": [
      "Muunna mL litroiksi.",
      "n=cV."
    ],
    "skills": [
      "ke04.sto.liuosten_ainemaara_ja_stoikiometria",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Liuosten ainemäärä ja stoikiometria",
      "ke04.sto.liuosten_ainemaara_ja_stoikiometria"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-039",
    "contentId": "KE04-STO-039",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Liuosten ainemäärä ja stoikiometria",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "HCl+NaOH→NaCl+H₂O. Kuinka paljon 0,200 mol/L NaOH-liuosta tarvitaan neutraloimaan 0,0100 mol HCl:ää?",
    "options": [],
    "correctAnswer": null,
    "explanation": "1:1-suhteessa n(NaOH)=0,0100 mol; V=n/c=0,0100/0,200=0,0500 L=50,0 mL.",
    "scoring": "5 p: molisuhde 1 p, V=n/c 1 p, lasku 1 p, L→mL 1 p, tulos 1 p.",
    "hints": [
      "Ensin NaOH-molit.",
      "V=n/c.",
      "Muunna mL:ksi."
    ],
    "skills": [
      "ke04.sto.liuosten_ainemaara_ja_stoikiometria",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Liuosten ainemäärä ja stoikiometria",
      "ke04.sto.liuosten_ainemaara_ja_stoikiometria"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-040",
    "contentId": "KE04-STO-040",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Liuosten ainemäärä ja stoikiometria",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija käyttää n=cV-kaavassa V=25,0, kun tilavuus on 25,0 mL ja c mol/L. Mikä virhe syntyy?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Tilavuus pitää käyttää litroina: 0,0250 L. Muuten ainemäärä tulee 1000 kertaa liian suureksi.",
    "scoring": "3 p: litrat 1 p, oikea muunnos 1 p, virhetekijä 1 p.",
    "hints": [
      "mol/L × L = mol.",
      "mL pitää jakaa 1000:lla."
    ],
    "skills": [
      "ke04.sto.liuosten_ainemaara_ja_stoikiometria",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Liuosten ainemäärä ja stoikiometria",
      "ke04.sto.liuosten_ainemaara_ja_stoikiometria"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "stoichiometry.unit_conversion"
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
    "seedKey": "ke04-v3:KE04-STO-041",
    "contentId": "KE04-STO-041",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Monivaiheinen stoikiometrinen päättely",
    "questionType": "short_answer",
    "difficulty": 2,
    "prompt": "Kirjoita massa→massa-stoikiometriatehtävän yleinen etenemisjärjestys.",
    "options": [],
    "correctAnswer": null,
    "explanation": "1) Tasapainota reaktio. 2) Muunna lähtöaineen massa mooleiksi. 3) Käytä reaktiokertoimia tuoteaineen mooleihin. 4) Muunna tuotteen molit massaksi.",
    "scoring": "4 p, 1 p / vaihe.",
    "hints": [
      "Massa ei mene suoraan reaktiokertoimiin.",
      "Molit ovat keskellä."
    ],
    "skills": [
      "ke04.sto.monivaiheinen_stoikiometrinen_paattely",
      "task.menetelma"
    ],
    "expectedConcepts": [
      "Monivaiheinen stoikiometrinen päättely",
      "ke04.sto.monivaiheinen_stoikiometrinen_paattely"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-042",
    "contentId": "KE04-STO-042",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Monivaiheinen stoikiometrinen päättely",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi reaktiokerroinsuhdetta käytetään vasta sen jälkeen, kun massa on muutettu mooleiksi?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kertoimet kuvaavat ainemäärä- ja hiukkassuhteita, eivät grammasuhteita. Massat riippuvat aineiden moolimassoista.",
    "scoring": "3 p.",
    "hints": [
      "1 mol eri aineita on eri grammoja.",
      "Kertoimet ovat molisuhteita."
    ],
    "skills": [
      "ke04.sto.monivaiheinen_stoikiometrinen_paattely",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Monivaiheinen stoikiometrinen päättely",
      "ke04.sto.monivaiheinen_stoikiometrinen_paattely"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-043",
    "contentId": "KE04-STO-043",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Monivaiheinen stoikiometrinen päättely",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Reaktio A→2B. A:n M=10 g/mol, B:n M=20 g/mol. Opiskelija sanoo 10 g A:sta syntyvän 20 g B:tä, koska 'kerroin 2'. Korjaa ideaalitapauksessa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "10 g A =1 mol A →2 mol B. B:n massa=2×20=40 g. Kerroin muuntaa mooleja, ei suoraan grammoja.",
    "scoring": "4 p: n(A)=1 1 p, n(B)=2 1 p, m(B)=40 1 p, periaate 1 p.",
    "hints": [
      "Muuta 10 g A mooleiksi.",
      "Kerro mooleja kahdella.",
      "Käytä B:n moolimassaa."
    ],
    "skills": [
      "ke04.sto.monivaiheinen_stoikiometrinen_paattely",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Monivaiheinen stoikiometrinen päättely",
      "ke04.sto.monivaiheinen_stoikiometrinen_paattely"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "stoichiometry.coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-044",
    "contentId": "KE04-STO-044",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Monivaiheinen stoikiometrinen päättely",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "2A→3B. A:n M=50,0 g/mol ja B:n M=20,0 g/mol. Kuinka paljon B:tä muodostuu 10,0 g A:sta?",
    "options": [],
    "correctAnswer": null,
    "explanation": "n(A)=0,200 mol; n(B)=0,200×3/2=0,300 mol; m(B)=0,300×20,0=6,00 g.",
    "scoring": "6 p: n(A) 2 p, suhde 1 p, n(B) 1 p, massa 1 p, tulos 1 p.",
    "hints": [
      "10/50=0,20 mol.",
      "Kerro 3/2.",
      "×20 g/mol."
    ],
    "skills": [
      "ke04.sto.monivaiheinen_stoikiometrinen_paattely",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Monivaiheinen stoikiometrinen päättely",
      "ke04.sto.monivaiheinen_stoikiometrinen_paattely"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-045",
    "contentId": "KE04-STO-045",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Monivaiheinen stoikiometrinen päättely",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "CaCO₃+2HCl→CaCl₂+H₂O+CO₂. Kuinka paljon CO₂:ta grammoina muodostuu 5,00 g CaCO₃:sta, kun HCl on ylimäärin? M(CaCO₃)=100,0 ja M(CO₂)=44,0 g/mol.",
    "options": [],
    "correctAnswer": null,
    "explanation": "n(CaCO₃)=0,0500 mol; n(CO₂)=0,0500 mol; m(CO₂)=2,20 g.",
    "scoring": "6 p.",
    "hints": [
      "Massa→mol.",
      "Suhde 1:1.",
      "Mol→massa."
    ],
    "skills": [
      "ke04.sto.monivaiheinen_stoikiometrinen_paattely",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Monivaiheinen stoikiometrinen päättely",
      "ke04.sto.monivaiheinen_stoikiometrinen_paattely"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-046",
    "contentId": "KE04-STO-046",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Integroivat stoikiometriatehtävät",
    "questionType": "matching",
    "difficulty": 2,
    "prompt": "Yhdistä muunnos ja kaava: massa→mol, mol→massa, mol→hiukkaset, pitoisuus+tilavuus→mol ↔ n=m/M, m=nM, N=nN_A, n=cV.",
    "options": [],
    "correctAnswer": null,
    "explanation": "massa→mol n=m/M; mol→massa m=nM; mol→hiukkaset N=nN_A; c,V→mol n=cV.",
    "scoring": "4 p.",
    "hints": [
      "Tarkista yksiköt.",
      "Pidä mol keskellä."
    ],
    "skills": [
      "ke04.sto.integroivat_stoikiometriatehtavat",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Integroivat stoikiometriatehtävät",
      "ke04.sto.integroivat_stoikiometriatehtavat"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
    ],
    "estimatedSeconds": 133,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "massa→mol",
        "right": "n=m/M"
      },
      {
        "left": "mol→massa",
        "right": "m=nM"
      },
      {
        "left": "mol→hiukkaset",
        "right": "N=nN_A"
      },
      {
        "left": "pitoisuus+tilavuus→mol",
        "right": "n=cV"
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-STO-047",
    "contentId": "KE04-STO-047",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Integroivat stoikiometriatehtävät",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Mikä on yhteinen ongelma, jos opiskelija yrittää ratkaista stoikiometriatehtäviä kokonaan grammoilla tai millilitroilla koskematta mooleihin?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Reaktiokertoimet kuvaavat ainemääräsuhteita, joten grammojen tai millilitrojen suora vertailu voi antaa väärän suhteen. Suureet pitää yleensä muuntaa ensin mooleiksi.",
    "scoring": "3 p.",
    "hints": [
      "Kertoimet ovat molisuhteita.",
      "Massa/tilavuus tarvitsee välivaiheen."
    ],
    "skills": [
      "ke04.sto.integroivat_stoikiometriatehtavat",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Integroivat stoikiometriatehtävät",
      "ke04.sto.integroivat_stoikiometriatehtavat"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "stoichiometry.mass_vs_mole"
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
    "seedKey": "ke04-v3:KE04-STO-048",
    "contentId": "KE04-STO-048",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Integroivat stoikiometriatehtävät",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "2Na+Cl₂→2NaCl. Kuinka paljon NaCl:ää mooleina muodostuu 0,300 mol Na:sta, kun Cl₂ on ylimäärin?",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,300 mol NaCl.",
    "scoring": "2 p.",
    "hints": [
      "Na:NaCl=2:2.",
      "Sama ainemäärä."
    ],
    "skills": [
      "ke04.sto.integroivat_stoikiometriatehtavat",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Integroivat stoikiometriatehtävät",
      "ke04.sto.integroivat_stoikiometriatehtavat"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-049",
    "contentId": "KE04-STO-049",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Integroivat stoikiometriatehtävät",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "Reaktiossa 2Na + Cl₂ → 2NaCl muodostuu 0,300 mol NaCl:ää. Laske tuotemassa, kun M(NaCl)=58,44 g/mol.",
    "options": [],
    "correctAnswer": null,
    "explanation": "m=0,300×58,44=17,5 g.",
    "scoring": "3 p.",
    "hints": [
      "m=nM.",
      "0,300×58,44."
    ],
    "skills": [
      "ke04.sto.integroivat_stoikiometriatehtavat",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Integroivat stoikiometriatehtävät",
      "ke04.sto.integroivat_stoikiometriatehtavat"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-050",
    "contentId": "KE04-STO-050",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "Integroivat stoikiometriatehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "2Na+Cl₂→2NaCl. Käytössä on 4,60 g Na:ta (M=23,0) ja Cl₂ on ylimäärin. Laske NaCl:n teoreettinen massa ja muodostuvien NaCl-kaavayksiköiden lukumäärä. M(NaCl)=58,5 g/mol, N_A=6,022×10²³.",
    "options": [],
    "correctAnswer": null,
    "explanation": "n(Na)=4,60/23,0=0,200 mol; n(NaCl)=0,200 mol; m=0,200×58,5=11,7 g; N=0,200×6,022×10²³=1,20×10²³ kaavayksikköä.",
    "scoring": "8 p: n(Na) 2 p, suhde 1 p, n(NaCl) 1 p, massa 2 p, hiukkasmäärä 2 p.",
    "hints": [
      "Massa→mol.",
      "Na:NaCl=1:1.",
      "Mol→massa ja mol→N erikseen."
    ],
    "skills": [
      "ke04.sto.integroivat_stoikiometriatehtavat",
      "task.integroiva_koetehtava"
    ],
    "expectedConcepts": [
      "Integroivat stoikiometriatehtävät",
      "ke04.sto.integroivat_stoikiometriatehtavat"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-X01",
    "contentId": "KE04-STO-X01",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Opiskelija valmistaa 250,0 mL 0,2000 mol/L NaCl-liuosta. a) Laske tarvittava NaCl:n ainemäärä. b) Laske massa, kun M(NaCl)=58,44 g/mol. c) Selitä, miksi 250,0 mL pitää muuntaa litroiksi kaavassa n=cV.",
    "options": [],
    "correctAnswer": null,
    "explanation": "a) n=0,2000×0,2500=0,05000 mol. b) m=0,05000×58,44=2,922 g. c) mol/L-yksikkö edellyttää V:n olevan litroina.",
    "scoring": "7 p: V-muunnos 1 p; n 2 p; massa 2 p; yksikköperustelu 2 p.",
    "hints": [
      "250,0 mL=0,2500 L.",
      "n=cV.",
      "m=nM."
    ],
    "skills": [
      "stoichiometry.solution",
      "units.volume"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "stoichiometry.solution",
      "units.volume"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mL_used_with_mol_per_L"
    ],
    "estimatedSeconds": 309,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 7,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Aineistotehtävä"
  },
  {
    "seedKey": "ke04-v3:KE04-STO-X02",
    "contentId": "KE04-STO-X02",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "multiple_choice",
    "difficulty": 4,
    "prompt": "Reaktiossa 2A + 3B → 4C A:n massa on 20,0 g ja B:n massa 30,0 g. M(A)=10,0 g/mol ja M(B)=30,0 g/mol. Mikä etenemistapa on oikea?",
    "options": [
      "Vertaa 20 ja 30 suoraan",
      "Laske n(A)=2,00 mol ja n(B)=1,00 mol ja vertaa n/kertoimia",
      "Kerro massat reaktiokertoimilla",
      "Lisää massat ja jaa C:n kertoimella."
    ],
    "correctAnswer": "Laske n(A)=2,00 mol ja n(B)=1,00 mol ja vertaa n/kertoimia",
    "explanation": "B. Stoikiometriset kertoimet koskevat ainemääriä, joten massat muutetaan ensin mooleiksi; sitten n(A)/2=1,00 ja n(B)/3≈0,333.",
    "scoring": "4 p: B 1 p; molemmat ainemäärät 2 p; n/kertoimet-perustelu 1 p.",
    "hints": [
      "Reaktiokertoimet kuvaavat mooleja.",
      "n=m/M",
      "Sulje pois vaihtoehdot vertaamalla jokaista niistä reaktioyhtälöön, rakenteeseen tai määritelmään.."
    ],
    "skills": [
      "stoichiometry.mole_ratio",
      "limiting_prerequisite"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "stoichiometry.mole_ratio",
      "limiting_prerequisite"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "compare_grams_directly"
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
    "seedKey": "ke04-v3:KE04-STO-X03",
    "contentId": "KE04-STO-X03",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Kolme 10,00 mL:n näytettä samasta HCl-liuoksesta titrataan 0,1000 mol/L NaOH:lla. Kulutukset ovat 12,48 mL, 12,52 mL ja 12,50 mL. Oleta 1:1-reaktio. Laske HCl:n pitoisuus käyttäen keskiarvoa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Keskiarvo 12,50 mL. n(NaOH)=0,1000×0,01250=0,001250 mol=n(HCl). c(HCl)=0,001250/0,01000=0,1250 mol/L.",
    "scoring": "7 p: keskiarvo 1 p; V muunnos 1 p; n 2 p; 1:1 1 p; c 2 p.",
    "hints": [
      "Laske tilavuuksien keskiarvo.",
      "n=cV.",
      "1:1 siirtää ainemäärän HCl:lle."
    ],
    "skills": [
      "stoichiometry.solution",
      "data.mean",
      "titration_prerequisite"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "stoichiometry.solution",
      "data.mean",
      "titration_prerequisite"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-X04",
    "contentId": "KE04-STO-X04",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "short_answer",
    "difficulty": 4,
    "prompt": "Reaktio 2H₂ + O₂ → 2H₂O. Esitä sanallisesti, mitä suhde 2:1:2 tarkoittaa a) molekyylitasolla ja b) moolitasolla. Miksi sama suhde ei tarkoita massoja 2 g : 1 g : 2 g?",
    "options": [],
    "correctAnswer": null,
    "explanation": "a) 2 H₂-molekyyliä reagoi 1 O₂-molekyylin kanssa muodostaen 2 H₂O-molekyyliä. b) 2 mol H₂ +1 mol O₂→2 mol H₂O. Massasuhde määräytyy myös moolimassoista, joten kertoimet eivät ole grammoja.",
    "scoring": "6 p: molekyylitaso 2 p; moolitaso 2 p; massaperustelu 2 p.",
    "hints": [
      "Kerroin on hiukkas- ja moolisuhde.",
      "Grammoihin tarvitaan M",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "stoichiometry.coefficient_meaning",
      "representation.micro_macro"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "stoichiometry.coefficient_meaning",
      "representation.micro_macro"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
    ],
    "estimatedSeconds": 154,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 6,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Esitystapatehtävä"
  },
  {
    "seedKey": "ke04-v3:KE04-STO-X05",
    "contentId": "KE04-STO-X05",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "calculation",
    "difficulty": 5,
    "prompt": "5,00 g CaCO₃:a reagoi ylimääräisen HCl:n kanssa: CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂. Laske a) n(CaCO₃), kun M=100,09 g/mol, b) n(CO₂), c) CO₂:n massa, kun M=44,01 g/mol.",
    "options": [],
    "correctAnswer": null,
    "explanation": "a) 0,04996 mol. b) 1:1 →0,04996 mol. c) m≈0,04996×44,01=2,20 g.",
    "scoring": "7 p: n 2 p; reaktiosuhde 1 p; n(CO₂) 1 p; massakaava 1 p; tulos 2 p.",
    "hints": [
      "m→n.",
      "Käytä 1:1-suhdetta.",
      "n→m."
    ],
    "skills": [
      "stoichiometry.mass_to_mole",
      "mole_ratio",
      "mole_to_mass"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "stoichiometry.mass_to_mole",
      "mole_ratio",
      "mole_to_mass"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
    ],
    "estimatedSeconds": 248,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 7,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Monivaiheinen lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-STO-X06",
    "contentId": "KE04-STO-X06",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "error_detection",
    "difficulty": 5,
    "prompt": "Reaktiossa CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂ käytetään 5,00 g CaCO₃:a, M(CaCO₃)=100,0 g/mol ja M(CO₂)=44,0 g/mol. Opiskelija saa CO₂-massaksi 4,40 g kertomalla lähtöainemassan suhteella 44/50. Arvioi menetelmä ja näytä turvallinen yleismenetelmä.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Menetelmä ei perustu tasapainotettuun moolisuhteeseen ja käyttää väärää massaperustaa. Yleismenetelmä: m(CaCO₃)→n=m/M→n(CO₂) reaktiokertoimilla→m(CO₂)=nM.",
    "scoring": "6 p: virheen tunnistus 2 p; oikea kolmiportainen menetelmä 3 p; oikean suuruusluokan maininta ~2,20 g 1 p.",
    "hints": [
      "Reaktiokerroin yhdistää mooleja.",
      "Pidä mol välivaiheena",
      "Nimeä ensin väärä kemiallinen periaate ja vasta sitten sen vaikutus lopputulokseen.."
    ],
    "skills": [
      "stoichiometry.method",
      "dimensional_analysis"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "stoichiometry.method",
      "dimensional_analysis"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "direct_mass_ratio_without_moles"
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
    "seedKey": "ke04-v3:KE04-STO-X07",
    "contentId": "KE04-STO-X07",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "Magnesium palaa: 2Mg + O₂ → 2MgO. Koeaineisto: tyhjä upokas 18,642 g; upokas+Mg ennen kuumennusta 19,858 g; upokas+tuote 20,658 g. a) Laske Mg:n ja muodostuneen MgO:n massat. b) Laske n(Mg), M(Mg)=24,31 g/mol. c) Päättele teoreettinen MgO-massa, M(MgO)=40,31 g/mol. d) Vertaa mitattuun ja ehdota yksi syy erolle.",
    "options": [],
    "correctAnswer": null,
    "explanation": "a) m(Mg)=1,216 g; m(tuote)=2,016 g. b) n(Mg)=1,216/24,31≈0,05002 mol. c) n(MgO)=0,05002 mol →m≈2,016 g. d) Mittaus vastaa lähes täydellisesti; pieni ero voisi johtua punnitus-/kuumennusvirheestä tai ainehävikistä.",
    "scoring": "12 p: massat 3 p; n(Mg) 2 p; suhde 1 p; teoreettinen massa 3 p; vertailu 1 p; virhelähde 2 p.",
    "hints": [
      "Vähennä tyhjän upokkaan massa.",
      "Mg:MgO=1:1.",
      "Vertaa mitattua 2,016 g teoreettiseen."
    ],
    "skills": [
      "experimental.mass_data",
      "stoichiometry",
      "error_analysis"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "experimental.mass_data",
      "stoichiometry",
      "error_analysis"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
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
    "seedKey": "ke04-v3:KE04-STO-X08",
    "contentId": "KE04-STO-X08",
    "chapter": 2,
    "topicName": "Stoikiometria",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "2Al + 3Cl₂ → 2AlCl₃. Käytössä on 5,40 g Al (M=27,0 g/mol) ja Cl₂ on ylimäärin. a) Laske Al:n ainemäärä. b) Laske tarvittava Cl₂:n ainemäärä. c) Laske muodostuvan AlCl₃:n ainemäärä. d) M(AlCl₃)=133,5 g/mol: laske massa. e) Selitä yhdessä lauseessa, missä vaiheessa reaktiokertoimia käytetään.",
    "options": [],
    "correctAnswer": null,
    "explanation": "a) 0,200 mol Al. b) 0,200×3/2=0,300 mol Cl₂. c) Al:AlCl₃=1:1 →0,200 mol. d) 26,7 g. e) Kertoimia käytetään moolimäärien väliseen muunnokseen.",
    "scoring": "10 p: a 2 p; b 2 p; c 2 p; d 2 p; e 2 p.",
    "hints": [
      "Massa→mol ennen kertoimia.",
      "Käytä 2:3 ja 2:2.",
      "Lopuksi mol→massa."
    ],
    "skills": [
      "stoichiometry.multi_step",
      "coefficient_use"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "stoichiometry.multi_step",
      "coefficient_use"
    ],
    "prerequisites": [
      "reaction_equation",
      "amount_of_substance",
      "molar_mass"
    ],
    "commonErrors": [
      "mass_vs_moles",
      "coefficient_ratio"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 10,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Koereservi – moniosainen"
  }
];
