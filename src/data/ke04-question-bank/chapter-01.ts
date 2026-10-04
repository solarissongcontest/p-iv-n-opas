import type { Ke04SeedQuestion } from "./types";

export const questions: Ke04SeedQuestion[] = [
  {
    "seedKey": "ke04-v3:KE04-REA-001",
    "contentId": "KE04-REA-001",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Reaktioyhtälön rakenne ja merkinnät",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitä reaktioyhtälön vasen ja oikea puoli kuvaavat?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Vasemmalla ovat lähtöaineet ja oikealla reaktiotuotteet.",
    "scoring": "2 p: lähtöaineet 1 p, tuotteet 1 p.",
    "hints": [
      "Reaktionuoli erottaa kaksi puolta.",
      "Mieti mitä on ennen ja jälkeen reaktion."
    ],
    "skills": [
      "ke04.rea.reaktioyhtalon_rakenne_ja_merkinnat",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Reaktioyhtälön rakenne ja merkinnät",
      "ke04.rea.reaktioyhtalon_rakenne_ja_merkinnat"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
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
    "seedKey": "ke04-v3:KE04-REA-002",
    "contentId": "KE04-REA-002",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Reaktioyhtälön rakenne ja merkinnät",
    "questionType": "multiple_choice",
    "difficulty": 1,
    "prompt": "Mitä reaktionuoli → tarkoittaa?",
    "options": [
      "reaktio on aina tasapainossa",
      "lähtöaineista muodostuu tuotteita",
      "aineiden olomuoto muuttuu ilman kemiallista muutosta",
      "reaktio etenee automaattisesti yhtä nopeasti molempiin suuntiin"
    ],
    "correctAnswer": "lähtöaineista muodostuu tuotteita",
    "explanation": "B, lähtöaineista muodostuu tuotteita.",
    "scoring": "1 p.",
    "hints": [
      "Nuoli osoittaa reaktion etenemissuunnan.",
      "Vasemmalta oikealle."
    ],
    "skills": [
      "ke04.rea.reaktioyhtalon_rakenne_ja_merkinnat",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Reaktioyhtälön rakenne ja merkinnät",
      "ke04.rea.reaktioyhtalon_rakenne_ja_merkinnat"
    ],
    "prerequisites": [],
    "commonErrors": [
      "reaction.coefficients_vs_subscripts",
      "reaction.direction"
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
    "seedKey": "ke04-v3:KE04-REA-003",
    "contentId": "KE04-REA-003",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Reaktioyhtälön rakenne ja merkinnät",
    "questionType": "matching",
    "difficulty": 2,
    "prompt": "Yhdistä olomuotomerkintä ja merkitys: (s), (l), (g), (aq) ↔ kiinteä, neste, kaasu, vesiliuos.",
    "options": [],
    "correctAnswer": null,
    "explanation": "(s)→kiinteä; (l)→neste; (g)→kaasu; (aq)→vesiliuos.",
    "scoring": "4 p, 1 p / pari.",
    "hints": [
      "s=solid, l=liquid, g=gas.",
      "aq tulee sanasta aqueous."
    ],
    "skills": [
      "ke04.rea.reaktioyhtalon_rakenne_ja_merkinnat",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Reaktioyhtälön rakenne ja merkinnät",
      "ke04.rea.reaktioyhtalon_rakenne_ja_merkinnat"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
    ],
    "estimatedSeconds": 133,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "(s)",
        "right": "kiinteä"
      },
      {
        "left": "(l)",
        "right": "neste"
      },
      {
        "left": "(g)",
        "right": "kaasu"
      },
      {
        "left": "(aq)",
        "right": "vesiliuos."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-REA-004",
    "contentId": "KE04-REA-004",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Reaktioyhtälön rakenne ja merkinnät",
    "questionType": "explanation",
    "difficulty": 2,
    "prompt": "Miksi reaktioyhtälössä käytetään kemiallisia kaavoja eikä pelkkiä aineiden nimiä?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kaavat näyttävät aineiden atomikoostumuksen ja mahdollistavat atomien lukumäärän sekä reaktiokertoimien tarkistamisen ja tasapainottamisen.",
    "scoring": "3 p: atomikoostumus 1 p, atomien laskeminen 1 p, tasapainotus 1 p.",
    "hints": [
      "Tasapainotus perustuu atomien määrään.",
      "Nimi ei yksin näytä atomisuhdetta."
    ],
    "skills": [
      "ke04.rea.reaktioyhtalon_rakenne_ja_merkinnat",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Reaktioyhtälön rakenne ja merkinnät",
      "ke04.rea.reaktioyhtalon_rakenne_ja_merkinnat"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
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
    "seedKey": "ke04-v3:KE04-REA-005",
    "contentId": "KE04-REA-005",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Reaktioyhtälön rakenne ja merkinnät",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija kirjoittaa reaktionuolen vasemmalle ja sanoo, ettei suunnalla ole väliä. Miksi suunnalla on merkitystä?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Nuoli kertoo, mitkä aineet käsitellään lähtöaineina ja mitkä tuotteina kyseisessä reaktiossa. Käännetty nuoli kuvaa vastakkaissuuntaista reaktiota, ei samaa esitystä.",
    "scoring": "3 p: lähtöaine/tuote-rooli 1 p, nuolen suunta 1 p, vastareaktio 1 p.",
    "hints": [
      "Nuoli ei ole koriste.",
      "Käännä reaktio mielessä ympäri."
    ],
    "skills": [
      "ke04.rea.reaktioyhtalon_rakenne_ja_merkinnat",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Reaktioyhtälön rakenne ja merkinnät",
      "ke04.rea.reaktioyhtalon_rakenne_ja_merkinnat"
    ],
    "prerequisites": [],
    "commonErrors": [
      "rea.common_misconception"
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
    "seedKey": "ke04-v3:KE04-REA-006",
    "contentId": "KE04-REA-006",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Massan ja atomien säilyminen",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mikä periaate määrää, että samaa alkuainetta olevia atomeja on tasapainotetun reaktioyhtälön molemmilla puolilla yhtä paljon?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Massan säilymisen laki ja atomien säilyminen kemiallisessa reaktiossa.",
    "scoring": "2 p.",
    "hints": [
      "Atomeja ei synny eikä häviä tavallisessa kemiallisessa reaktiossa.",
      "Massa säilyy suljetussa systeemissä."
    ],
    "skills": [
      "ke04.rea.massan_ja_atomien_sailyminen",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Massan ja atomien säilyminen",
      "ke04.rea.massan_ja_atomien_sailyminen"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
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
    "seedKey": "ke04-v3:KE04-REA-007",
    "contentId": "KE04-REA-007",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Massan ja atomien säilyminen",
    "questionType": "short_answer",
    "difficulty": 2,
    "prompt": "Onko H₂ + O₂ → H₂O tasapainossa? Perustele atomimäärillä.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Ei. H-atomeja on 2 molemmilla puolilla, mutta O-atomeja vasemmalla 2 ja oikealla 1.",
    "scoring": "3 p: ei 1 p, H-tarkistus 1 p, O-tarkistus 1 p.",
    "hints": [
      "Laske H ja O erikseen.",
      "Katso O₂:n indeksiä."
    ],
    "skills": [
      "ke04.rea.massan_ja_atomien_sailyminen",
      "task.tarkistus"
    ],
    "expectedConcepts": [
      "Massan ja atomien säilyminen",
      "ke04.rea.massan_ja_atomien_sailyminen"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
    ],
    "estimatedSeconds": 117,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Tarkistus"
  },
  {
    "seedKey": "ke04-v3:KE04-REA-008",
    "contentId": "KE04-REA-008",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Massan ja atomien säilyminen",
    "questionType": "short_answer",
    "difficulty": 2,
    "prompt": "Onko 2H₂ + O₂ → 2H₂O tasapainossa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kyllä. H-atomeja on 4 kummallakin puolella ja O-atomeja 2 kummallakin puolella.",
    "scoring": "3 p: kyllä 1 p, H 1 p, O 1 p.",
    "hints": [
      "Kerro molekyylin atomimäärä sen kertoimella.",
      "Tarkista molemmat alkuaineet."
    ],
    "skills": [
      "ke04.rea.massan_ja_atomien_sailyminen",
      "task.tarkistus"
    ],
    "expectedConcepts": [
      "Massan ja atomien säilyminen",
      "ke04.rea.massan_ja_atomien_sailyminen"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
    ],
    "estimatedSeconds": 117,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Tarkistus"
  },
  {
    "seedKey": "ke04-v3:KE04-REA-009",
    "contentId": "KE04-REA-009",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Massan ja atomien säilyminen",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi tasapainotuksessa muutetaan reaktiokertoimia eikä aineiden kemiallisten kaavojen alaindeksejä?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Alaindeksin muuttaminen muuttaisi aineen kemiallisen koostumuksen ja tekisi siitä toisen aineen. Kerroin muuttaa vain reaktioon osallistuvien kyseisten hiukkasten määrää.",
    "scoring": "4 p: alaindeksi muuttaa ainetta 2 p, kerroin hiukkasmäärää 1 p, yhteys tasapainotukseen 1 p.",
    "hints": [
      "Vertaa H₂O ja H₂O₂.",
      "Ne eivät ole sama aine."
    ],
    "skills": [
      "ke04.rea.massan_ja_atomien_sailyminen",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Massan ja atomien säilyminen",
      "ke04.rea.massan_ja_atomien_sailyminen"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
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
    "seedKey": "ke04-v3:KE04-REA-010",
    "contentId": "KE04-REA-010",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Massan ja atomien säilyminen",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija tasapainottaa H₂ + O₂ → H₂O muuttamalla tuotteen muotoon H₂O₂. Mikä virhe tapahtui?",
    "options": [],
    "correctAnswer": null,
    "explanation": "H₂O₂ on vetyperoksidi, eri aine kuin vesi. Tasapainotus pitää tehdä kertoimilla: 2H₂ + O₂ → 2H₂O.",
    "scoring": "4 p: eri aine 1 p, oikea nimi/merkitys 1 p, kertoimilla tasapainotus 1 p, oikea yhtälö 1 p.",
    "hints": [
      "Alaindeksi kuuluu aineen identiteettiin.",
      "Lisää kerroin veden eteen."
    ],
    "skills": [
      "ke04.rea.massan_ja_atomien_sailyminen",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Massan ja atomien säilyminen",
      "ke04.rea.massan_ja_atomien_sailyminen"
    ],
    "prerequisites": [],
    "commonErrors": [
      "reaction.coefficients_vs_subscripts"
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
    "seedKey": "ke04-v3:KE04-REA-011",
    "contentId": "KE04-REA-011",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Tasapainotuksen perusteet",
    "questionType": "short_answer",
    "difficulty": 1,
    "prompt": "Tasapainota H₂ + Cl₂ → HCl.",
    "options": [],
    "correctAnswer": null,
    "explanation": "H₂ + Cl₂ → 2HCl.",
    "scoring": "2 p: kerroin 2 HCl:lle 1 p, atomitase 1 p.",
    "hints": [
      "Vasemmalla on 2 H ja 2 Cl.",
      "Yhdessä HCl:ssa on vain yksi kumpaakin."
    ],
    "skills": [
      "ke04.rea.tasapainotuksen_perusteet",
      "task.tasapainotus"
    ],
    "expectedConcepts": [
      "Tasapainotuksen perusteet",
      "ke04.rea.tasapainotuksen_perusteet"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
    ],
    "estimatedSeconds": 98,
    "examEligible": false,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Tasapainotus"
  },
  {
    "seedKey": "ke04-v3:KE04-REA-012",
    "contentId": "KE04-REA-012",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Tasapainotuksen perusteet",
    "questionType": "short_answer",
    "difficulty": 2,
    "prompt": "Tasapainota N₂ + H₂ → NH₃.",
    "options": [],
    "correctAnswer": null,
    "explanation": "N₂ + 3H₂ → 2NH₃.",
    "scoring": "4 p: N₂ 1 p, 3H₂ 1 p, 2NH₃ 1 p, atomitase 1 p.",
    "hints": [
      "Tasaa N ensin.",
      "Kun NH₃:n kerroin on 2, oikealla on 6 H."
    ],
    "skills": [
      "ke04.rea.tasapainotuksen_perusteet",
      "task.tasapainotus"
    ],
    "expectedConcepts": [
      "Tasapainotuksen perusteet",
      "ke04.rea.tasapainotuksen_perusteet"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
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
    "seedKey": "ke04-v3:KE04-REA-013",
    "contentId": "KE04-REA-013",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Tasapainotuksen perusteet",
    "questionType": "short_answer",
    "difficulty": 2,
    "prompt": "Tasapainota Na + Cl₂ → NaCl.",
    "options": [],
    "correctAnswer": null,
    "explanation": "2Na + Cl₂ → 2NaCl.",
    "scoring": "3 p: 2Na 1 p, 2NaCl 1 p, atomitase 1 p.",
    "hints": [
      "Cl₂ tuo kaksi Cl-atomia.",
      "Tarvitset kaksi NaCl-yksikköä."
    ],
    "skills": [
      "ke04.rea.tasapainotuksen_perusteet",
      "task.tasapainotus"
    ],
    "expectedConcepts": [
      "Tasapainotuksen perusteet",
      "ke04.rea.tasapainotuksen_perusteet"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
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
    "seedKey": "ke04-v3:KE04-REA-014",
    "contentId": "KE04-REA-014",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Tasapainotuksen perusteet",
    "questionType": "short_answer",
    "difficulty": 3,
    "prompt": "Tasapainota Mg + O₂ → MgO.",
    "options": [],
    "correctAnswer": null,
    "explanation": "2Mg + O₂ → 2MgO.",
    "scoring": "3 p.",
    "hints": [
      "O₂:ssa on kaksi O-atomia.",
      "Tee kaksi MgO:ta."
    ],
    "skills": [
      "ke04.rea.tasapainotuksen_perusteet",
      "task.tasapainotus"
    ],
    "expectedConcepts": [
      "Tasapainotuksen perusteet",
      "ke04.rea.tasapainotuksen_perusteet"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
    ],
    "estimatedSeconds": 135,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Tasapainotus"
  },
  {
    "seedKey": "ke04-v3:KE04-REA-015",
    "contentId": "KE04-REA-015",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Tasapainotuksen perusteet",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija saa yhtälölle N₂ + H₂ → NH₃ kertoimet 1:2:2. Mikä ei täsmää?",
    "options": [],
    "correctAnswer": null,
    "explanation": "N on tasapainossa, mutta H ei: vasemmalla 4 H ja oikealla 6 H. Oikea suhde on 1:3:2.",
    "scoring": "3 p: H-epätasapaino 1 p, atomimäärät 1 p, oikeat kertoimet 1 p.",
    "hints": [
      "Laske vedyt kertoimien jälkeen.",
      "2NH₃ sisältää 6 H."
    ],
    "skills": [
      "ke04.rea.tasapainotuksen_perusteet",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Tasapainotuksen perusteet",
      "ke04.rea.tasapainotuksen_perusteet"
    ],
    "prerequisites": [],
    "commonErrors": [
      "reaction.coefficients_vs_subscripts"
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
    "seedKey": "ke04-v3:KE04-REA-016",
    "contentId": "KE04-REA-016",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Hieman vaativammat tasapainotukset",
    "questionType": "short_answer",
    "difficulty": 2,
    "prompt": "Tasapainota Al + O₂ → Al₂O₃.",
    "options": [],
    "correctAnswer": null,
    "explanation": "4Al + 3O₂ → 2Al₂O₃.",
    "scoring": "4 p: 4Al 1 p, 3O₂ 1 p, 2Al₂O₃ 1 p, atomitase 1 p.",
    "hints": [
      "Etsi O-atomien pienin yhteinen monikerta 2:lle ja 3:lle.",
      "Se on 6."
    ],
    "skills": [
      "ke04.rea.hieman_vaativammat_tasapainotukset",
      "task.tasapainotus"
    ],
    "expectedConcepts": [
      "Hieman vaativammat tasapainotukset",
      "ke04.rea.hieman_vaativammat_tasapainotukset"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
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
    "seedKey": "ke04-v3:KE04-REA-017",
    "contentId": "KE04-REA-017",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Hieman vaativammat tasapainotukset",
    "questionType": "short_answer",
    "difficulty": 2,
    "prompt": "Tasapainota Fe + O₂ → Fe₂O₃.",
    "options": [],
    "correctAnswer": null,
    "explanation": "4Fe + 3O₂ → 2Fe₂O₃.",
    "scoring": "4 p.",
    "hints": [
      "Tee oikealle 6 O-atomia.",
      "Silloin Fe-atomeja tarvitaan 4."
    ],
    "skills": [
      "ke04.rea.hieman_vaativammat_tasapainotukset",
      "task.tasapainotus"
    ],
    "expectedConcepts": [
      "Hieman vaativammat tasapainotukset",
      "ke04.rea.hieman_vaativammat_tasapainotukset"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
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
    "seedKey": "ke04-v3:KE04-REA-018",
    "contentId": "KE04-REA-018",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Hieman vaativammat tasapainotukset",
    "questionType": "short_answer",
    "difficulty": 3,
    "prompt": "Tasapainota KClO₃ → KCl + O₂.",
    "options": [],
    "correctAnswer": null,
    "explanation": "2KClO₃ → 2KCl + 3O₂.",
    "scoring": "4 p.",
    "hints": [
      "Happiatomien määrän pitää sopia O₂-pariin.",
      "Kokeile 2 KClO₃:a."
    ],
    "skills": [
      "ke04.rea.hieman_vaativammat_tasapainotukset",
      "task.tasapainotus"
    ],
    "expectedConcepts": [
      "Hieman vaativammat tasapainotukset",
      "ke04.rea.hieman_vaativammat_tasapainotukset"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
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
    "seedKey": "ke04-v3:KE04-REA-019",
    "contentId": "KE04-REA-019",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Hieman vaativammat tasapainotukset",
    "questionType": "short_answer",
    "difficulty": 3,
    "prompt": "Tasapainota H₂O₂ → H₂O + O₂.",
    "options": [],
    "correctAnswer": null,
    "explanation": "2H₂O₂ → 2H₂O + O₂.",
    "scoring": "4 p.",
    "hints": [
      "Tee H-määrä parilliseksi vedessä.",
      "Tarkista O lopuksi."
    ],
    "skills": [
      "ke04.rea.hieman_vaativammat_tasapainotukset",
      "task.tasapainotus"
    ],
    "expectedConcepts": [
      "Hieman vaativammat tasapainotukset",
      "ke04.rea.hieman_vaativammat_tasapainotukset"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
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
    "seedKey": "ke04-v3:KE04-REA-020",
    "contentId": "KE04-REA-020",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Hieman vaativammat tasapainotukset",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija tasapainottaa Al + O₂ → Al₂O₃ muodossa 2Al + 2O₂ → Al₂O₃. Osoita virhe atomimäärillä ja korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Vasemmalla Al=2 ja O=4, oikealla Al=2 ja O=3, joten O ei säily. Oikea yhtälö on 4Al + 3O₂ → 2Al₂O₃.",
    "scoring": "4 p: atomitarkistus 2 p, oikea yhtälö 2 p.",
    "hints": [
      "Laske O-atomeja molemmilta puolilta.",
      "Käytä O:lle pienintä yhteistä monikertaa 6."
    ],
    "skills": [
      "ke04.rea.hieman_vaativammat_tasapainotukset",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Hieman vaativammat tasapainotukset",
      "ke04.rea.hieman_vaativammat_tasapainotukset"
    ],
    "prerequisites": [],
    "commonErrors": [
      "reaction.coefficients_vs_subscripts"
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
    "seedKey": "ke04-v3:KE04-REA-021",
    "contentId": "KE04-REA-021",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Kertoimet, alaindeksit ja pienimmät kokonaisluvut",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitä kerroin 3 kaavan 3H₂O edessä tarkoittaa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kolmea vesimolekyyliä tai kolmea moolia vettä stoikiometrisessa tarkastelussa.",
    "scoring": "2 p: kolme hiukkasta/moolia 1 p, koko H₂O-yksikköön kohdistuminen 1 p.",
    "hints": [
      "Kerroin koskee koko kaavaa.",
      "3×H₂O."
    ],
    "skills": [
      "ke04.rea.kertoimet_alaindeksit_ja_pienimmat_kokonaisluvut",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Kertoimet, alaindeksit ja pienimmät kokonaisluvut",
      "ke04.rea.kertoimet_alaindeksit_ja_pienimmat_kokonaisluvut"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
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
    "seedKey": "ke04-v3:KE04-REA-022",
    "contentId": "KE04-REA-022",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Kertoimet, alaindeksit ja pienimmät kokonaisluvut",
    "questionType": "short_answer",
    "difficulty": 2,
    "prompt": "Kuinka monta H- ja O-atomia on merkinnässä 4H₂O?",
    "options": [],
    "correctAnswer": null,
    "explanation": "H-atomeja 8 ja O-atomeja 4.",
    "scoring": "2 p: H=8 1 p, O=4 1 p.",
    "hints": [
      "Kerro alaindeksit kertoimella 4.",
      "O:n näkymätön indeksi on 1."
    ],
    "skills": [
      "ke04.rea.kertoimet_alaindeksit_ja_pienimmat_kokonaisluvut",
      "task.laskennallinen_tulkinta"
    ],
    "expectedConcepts": [
      "Kertoimet, alaindeksit ja pienimmät kokonaisluvut",
      "ke04.rea.kertoimet_alaindeksit_ja_pienimmat_kokonaisluvut"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
    ],
    "estimatedSeconds": 117,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Laskennallinen tulkinta"
  },
  {
    "seedKey": "ke04-v3:KE04-REA-023",
    "contentId": "KE04-REA-023",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Kertoimet, alaindeksit ja pienimmät kokonaisluvut",
    "questionType": "short_answer",
    "difficulty": 2,
    "prompt": "Kuinka monta Al- ja O-atomia on 2Al₂O₃:ssa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Al-atomeja 4 ja O-atomeja 6.",
    "scoring": "2 p.",
    "hints": [
      "Kerro molemmat alaindeksit kahdella.",
      "2×2 ja 2×3."
    ],
    "skills": [
      "ke04.rea.kertoimet_alaindeksit_ja_pienimmat_kokonaisluvut",
      "task.tulkinta"
    ],
    "expectedConcepts": [
      "Kertoimet, alaindeksit ja pienimmät kokonaisluvut",
      "ke04.rea.kertoimet_alaindeksit_ja_pienimmat_kokonaisluvut"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
    ],
    "estimatedSeconds": 117,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Tulkinta"
  },
  {
    "seedKey": "ke04-v3:KE04-REA-024",
    "contentId": "KE04-REA-024",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Kertoimet, alaindeksit ja pienimmät kokonaisluvut",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi tasapainotetut kertoimet ilmoitetaan yleensä pienimpinä mahdollisina kokonaislukuina?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Suhde halutaan esittää yksinkertaisimpana stoikiometrisena suhteena. Esimerkiksi 4:2:4 voidaan supistaa 2:1:2:een menettämättä kemiallista tietoa.",
    "scoring": "3 p: suhde 1 p, supistaminen 1 p, esimerkki/perustelu 1 p.",
    "hints": [
      "Kertoimet ovat suhdelukuja.",
      "Suhdetta voi supistaa yhteisellä tekijällä."
    ],
    "skills": [
      "ke04.rea.kertoimet_alaindeksit_ja_pienimmat_kokonaisluvut",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Kertoimet, alaindeksit ja pienimmät kokonaisluvut",
      "ke04.rea.kertoimet_alaindeksit_ja_pienimmat_kokonaisluvut"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
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
    "seedKey": "ke04-v3:KE04-REA-025",
    "contentId": "KE04-REA-025",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Kertoimet, alaindeksit ja pienimmät kokonaisluvut",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Yhtälö 4H₂ + 2O₂ → 4H₂O on atomitasapainossa. Miksi sitä ei yleensä pidetä lopullisena tasapainotuksena?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kaikki kertoimet voidaan jakaa kahdella. Pienin kokonaislukusuhde on 2H₂ + O₂ → 2H₂O.",
    "scoring": "3 p: supistettavuus 1 p, jako 2:lla 1 p, oikea yhtälö 1 p.",
    "hints": [
      "Etsi yhteinen tekijä.",
      "Kaikki kertoimet ovat parillisia."
    ],
    "skills": [
      "ke04.rea.kertoimet_alaindeksit_ja_pienimmat_kokonaisluvut",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Kertoimet, alaindeksit ja pienimmät kokonaisluvut",
      "ke04.rea.kertoimet_alaindeksit_ja_pienimmat_kokonaisluvut"
    ],
    "prerequisites": [],
    "commonErrors": [
      "reaction.coefficients_vs_subscripts"
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
    "seedKey": "ke04-v3:KE04-REA-026",
    "contentId": "KE04-REA-026",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Olomuodot ja reaktioyhtälön täydellinen esitys",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitä (aq) kertoo aineesta?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Aine on liuenneena vesiliuokseen.",
    "scoring": "1 p.",
    "hints": [
      "aqueous.",
      "Ei tarkoita nestemäistä puhdasta ainetta."
    ],
    "skills": [
      "ke04.rea.olomuodot_ja_reaktioyhtalon_taydellinen_esitys",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Olomuodot ja reaktioyhtälön täydellinen esitys",
      "ke04.rea.olomuodot_ja_reaktioyhtalon_taydellinen_esitys"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
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
    "seedKey": "ke04-v3:KE04-REA-027",
    "contentId": "KE04-REA-027",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Olomuodot ja reaktioyhtälön täydellinen esitys",
    "questionType": "recognition",
    "difficulty": 2,
    "prompt": "Mitä eroa on merkinnöillä H₂O(l) ja NaCl(aq)?",
    "options": [],
    "correctAnswer": null,
    "explanation": "H₂O(l) on nestemäistä vettä; NaCl(aq) tarkoittaa natriumkloridia liuenneena veteen.",
    "scoring": "2 p: kumpikin merkitys 1 p.",
    "hints": [
      "l kuvaa puhtaan aineen olomuotoa.",
      "aq kuvaa vesiliuosta."
    ],
    "skills": [
      "ke04.rea.olomuodot_ja_reaktioyhtalon_taydellinen_esitys",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Olomuodot ja reaktioyhtälön täydellinen esitys",
      "ke04.rea.olomuodot_ja_reaktioyhtalon_taydellinen_esitys"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
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
    "seedKey": "ke04-v3:KE04-REA-028",
    "contentId": "KE04-REA-028",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Olomuodot ja reaktioyhtälön täydellinen esitys",
    "questionType": "short_answer",
    "difficulty": 2,
    "prompt": "Täydennä olomuodot: Ag⁺(__) + Cl⁻(__) → AgCl(__), kun ionit ovat vesiliuoksessa ja AgCl saostuu.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Ag⁺(aq) + Cl⁻(aq) → AgCl(s).",
    "scoring": "3 p, 1 p / merkintä.",
    "hints": [
      "Liuenneet ionit ovat aq.",
      "Saostuma on s."
    ],
    "skills": [
      "ke04.rea.olomuodot_ja_reaktioyhtalon_taydellinen_esitys",
      "task.reaktio"
    ],
    "expectedConcepts": [
      "Olomuodot ja reaktioyhtälön täydellinen esitys",
      "ke04.rea.olomuodot_ja_reaktioyhtalon_taydellinen_esitys"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
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
    "seedKey": "ke04-v3:KE04-REA-029",
    "contentId": "KE04-REA-029",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Olomuodot ja reaktioyhtälön täydellinen esitys",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi olomuotomerkinnät voivat olla tärkeitä reaktion tulkinnassa, vaikka atomitasapaino olisi sama ilman niitä?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Ne kertovat esimerkiksi, ovatko ionit liuenneina, muodostuuko saostuma tai kaasu ja millaisessa fysikaalisessa muodossa aine osallistuu reaktioon. Tämä auttaa ymmärtämään reaktion etenemistä ja havaintoja.",
    "scoring": "3 p: reaktiotila 1 p, havainto/saostuma/kaasu 1 p, tulkinnan merkitys 1 p.",
    "hints": [
      "Atomitase ei kerro kaikkea havaittavasta reaktiosta.",
      "aq ja s voivat erottaa liuenneen ja saostuneen aineen."
    ],
    "skills": [
      "ke04.rea.olomuodot_ja_reaktioyhtalon_taydellinen_esitys",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Olomuodot ja reaktioyhtälön täydellinen esitys",
      "ke04.rea.olomuodot_ja_reaktioyhtalon_taydellinen_esitys"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
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
    "seedKey": "ke04-v3:KE04-REA-030",
    "contentId": "KE04-REA-030",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Olomuodot ja reaktioyhtälön täydellinen esitys",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija merkitsee saostuvan AgCl:n muodossa AgCl(aq). Mikä kemiallinen viesti menee väärin?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Merkintä väittäisi AgCl:n olevan vesiliuoksessa liuenneena. Saostumisessa AgCl muodostuu kiinteäksi, joten merkintä on AgCl(s).",
    "scoring": "3 p: aq:n merkitys 1 p, s:n merkitys 1 p, oikea merkintä 1 p.",
    "hints": [
      "Saostuma on kiinteä.",
      "aq tarkoittaa liuennutta."
    ],
    "skills": [
      "ke04.rea.olomuodot_ja_reaktioyhtalon_taydellinen_esitys",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Olomuodot ja reaktioyhtälön täydellinen esitys",
      "ke04.rea.olomuodot_ja_reaktioyhtalon_taydellinen_esitys"
    ],
    "prerequisites": [],
    "commonErrors": [
      "reaction.state_symbols"
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
    "seedKey": "ke04-v3:KE04-REA-031",
    "contentId": "KE04-REA-031",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Palamisreaktioiden tasapainotus",
    "questionType": "short_answer",
    "difficulty": 2,
    "prompt": "Tasapainota CH₄ + O₂ → CO₂ + H₂O.",
    "options": [],
    "correctAnswer": null,
    "explanation": "CH₄ + 2O₂ → CO₂ + 2H₂O.",
    "scoring": "4 p: CO₂ 1 p, 2H₂O 1 p, 2O₂ 1 p, kokonaisuus 1 p.",
    "hints": [
      "C ensin, H toisena, O viimeisenä.",
      "Neljä H →2H₂O."
    ],
    "skills": [
      "ke04.rea.palamisreaktioiden_tasapainotus",
      "task.tasapainotus"
    ],
    "expectedConcepts": [
      "Palamisreaktioiden tasapainotus",
      "ke04.rea.palamisreaktioiden_tasapainotus"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
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
    "seedKey": "ke04-v3:KE04-REA-032",
    "contentId": "KE04-REA-032",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Palamisreaktioiden tasapainotus",
    "questionType": "short_answer",
    "difficulty": 2,
    "prompt": "Tasapainota C₃H₈ + O₂ → CO₂ + H₂O.",
    "options": [],
    "correctAnswer": null,
    "explanation": "C₃H₈ + 5O₂ → 3CO₂ + 4H₂O.",
    "scoring": "4 p.",
    "hints": [
      "3 C→3CO₂.",
      "8 H→4H₂O.",
      "Laske O."
    ],
    "skills": [
      "ke04.rea.palamisreaktioiden_tasapainotus",
      "task.tasapainotus"
    ],
    "expectedConcepts": [
      "Palamisreaktioiden tasapainotus",
      "ke04.rea.palamisreaktioiden_tasapainotus"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
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
    "seedKey": "ke04-v3:KE04-REA-033",
    "contentId": "KE04-REA-033",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Palamisreaktioiden tasapainotus",
    "questionType": "short_answer",
    "difficulty": 3,
    "prompt": "Tasapainota C₂H₆ + O₂ → CO₂ + H₂O pienimmillä kokonaisluvuilla.",
    "options": [],
    "correctAnswer": null,
    "explanation": "2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O.",
    "scoring": "4 p.",
    "hints": [
      "Yhdelle etaanille tulee 2CO₂ ja 3H₂O.",
      "O₂ olisi 7/2, joten kerro kaikki kahdella."
    ],
    "skills": [
      "ke04.rea.palamisreaktioiden_tasapainotus",
      "task.tasapainotus"
    ],
    "expectedConcepts": [
      "Palamisreaktioiden tasapainotus",
      "ke04.rea.palamisreaktioiden_tasapainotus"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
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
    "seedKey": "ke04-v3:KE04-REA-034",
    "contentId": "KE04-REA-034",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Palamisreaktioiden tasapainotus",
    "questionType": "short_answer",
    "difficulty": 3,
    "prompt": "Tasapainota etanolin palaminen C₂H₅OH + O₂ → CO₂ + H₂O.",
    "options": [],
    "correctAnswer": null,
    "explanation": "C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O.",
    "scoring": "4 p.",
    "hints": [
      "C=2, H=6.",
      "Muista, että etanolissa on jo yksi O."
    ],
    "skills": [
      "ke04.rea.palamisreaktioiden_tasapainotus",
      "task.tasapainotus"
    ],
    "expectedConcepts": [
      "Palamisreaktioiden tasapainotus",
      "ke04.rea.palamisreaktioiden_tasapainotus"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
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
    "seedKey": "ke04-v3:KE04-REA-035",
    "contentId": "KE04-REA-035",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Palamisreaktioiden tasapainotus",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija tasapainottaa etanolin palamisen C₂H₅OH + 7/2O₂ → 2CO₂ + 3H₂O. Mikä on virheen syy?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Hän on jättänyt etanolin oman happiatomin huomiotta. Tuotteissa on 7 O-atomia, joista yksi tulee etanolista, joten O₂:sta tarvitaan 6 O-atomia eli 3O₂.",
    "scoring": "4 p: etanolin O 1 p, tuotteiden 7 O 1 p, O₂=3 1 p, oikea yhtälö 1 p.",
    "hints": [
      "Laske myös lähtöaineen oma O.",
      "Kaikki happi ei tule O₂:sta."
    ],
    "skills": [
      "ke04.rea.palamisreaktioiden_tasapainotus",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Palamisreaktioiden tasapainotus",
      "ke04.rea.palamisreaktioiden_tasapainotus"
    ],
    "prerequisites": [],
    "commonErrors": [
      "reaction.coefficients_vs_subscripts"
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
    "seedKey": "ke04-v3:KE04-REA-036",
    "contentId": "KE04-REA-036",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Ioni- ja neutraloitumisreaktioiden yhtälöt",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Kirjoita hydronium- ja hydroksidi-ionien neutraloitumisen nettoioniyhtälö.",
    "options": [],
    "correctAnswer": null,
    "explanation": "H₃O⁺(aq) + OH⁻(aq) → 2H₂O(l).",
    "scoring": "3 p: lähtöionit 1 p, 2H₂O 1 p, varaus/atomitase 1 p.",
    "hints": [
      "Happamuutta ja emäksisyyttä aiheuttavat ionit muodostavat vettä.",
      "Tarkista H-määrä."
    ],
    "skills": [
      "ke04.rea.ioni_ja_neutraloitumisreaktioiden_yhtalot",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Ioni- ja neutraloitumisreaktioiden yhtälöt",
      "ke04.rea.ioni_ja_neutraloitumisreaktioiden_yhtalot"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
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
    "seedKey": "ke04-v3:KE04-REA-037",
    "contentId": "KE04-REA-037",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Ioni- ja neutraloitumisreaktioiden yhtälöt",
    "questionType": "short_answer",
    "difficulty": 3,
    "prompt": "Tasapainota H₂SO₄ + KOH → K₂SO₄ + H₂O pienimmillä kokonaislukukertoimilla.",
    "options": [],
    "correctAnswer": null,
    "explanation": "H₂SO₄ + 2KOH → K₂SO₄ + 2H₂O, kertoimet 1:2:1:2.",
    "scoring": "4 p: KOH:n kerroin 2 p, H₂O:n kerroin 1 p, täydellinen atomitase ja pienimmät kokonaisluvut 1 p.",
    "hints": [
      "K₂SO₄ tarvitsee kaksi K-atomia.",
      "Kun KOH:n kerroin on 2, tarkista lopuksi H- ja O-atomit."
    ],
    "skills": [
      "ke04.rea.neutralization_balancing",
      "task.tasapainotus",
      "stoichiometry.coefficient_ratio"
    ],
    "expectedConcepts": [
      "Ioni- ja neutraloitumisreaktioiden yhtälöt",
      "ke04.rea.neutralization_balancing",
      "stoichiometry.coefficient_ratio"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
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
    "seedKey": "ke04-v3:KE04-REA-038",
    "contentId": "KE04-REA-038",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Ioni- ja neutraloitumisreaktioiden yhtälöt",
    "questionType": "short_answer",
    "difficulty": 2,
    "prompt": "Kirjoita AgCl:n muodostumisen nettoioniyhtälö.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Ag⁺(aq) + Cl⁻(aq) → AgCl(s).",
    "scoring": "3 p.",
    "hints": [
      "Jätä sivuionit pois.",
      "AgCl on kiinteä."
    ],
    "skills": [
      "ke04.rea.ioni_ja_neutraloitumisreaktioiden_yhtalot",
      "task.nettoioniyhtalo"
    ],
    "expectedConcepts": [
      "Ioni- ja neutraloitumisreaktioiden yhtälöt",
      "ke04.rea.ioni_ja_neutraloitumisreaktioiden_yhtalot"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
    ],
    "estimatedSeconds": 117,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Nettoioniyhtälö"
  },
  {
    "seedKey": "ke04-v3:KE04-REA-039",
    "contentId": "KE04-REA-039",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Ioni- ja neutraloitumisreaktioiden yhtälöt",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi nettoioniyhtälöstä jätetään sivuionit pois?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Sivuionit esiintyvät muuttumattomina reaktion molemmilla puolilla eivätkä osallistu varsinaiseen kemialliseen muutokseen, joten ne voidaan supistaa pois.",
    "scoring": "3 p: muuttumattomuus 1 p, molemmilla puolilla 1 p, ei varsinaista muutosta 1 p.",
    "hints": [
      "Vertaa ioniyhtälön vasenta ja oikeaa puolta.",
      "Samat ionit kumoutuvat."
    ],
    "skills": [
      "ke04.rea.ioni_ja_neutraloitumisreaktioiden_yhtalot",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Ioni- ja neutraloitumisreaktioiden yhtälöt",
      "ke04.rea.ioni_ja_neutraloitumisreaktioiden_yhtalot"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
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
    "seedKey": "ke04-v3:KE04-REA-040",
    "contentId": "KE04-REA-040",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Ioni- ja neutraloitumisreaktioiden yhtälöt",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Nettoioniyhtälö Ag⁺ + Cl⁻ → AgCl kirjoitetaan muodossa Ag + Cl → AgCl. Mikä tärkeä tieto katoaa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Lähtöaineet ovat ioneja, eivät neutraaleja Ag- ja Cl-atomeja. Varausten poistaminen muuttaa kemialliset hiukkaset ja reaktion merkityksen.",
    "scoring": "3 p: ionisuus 1 p, varaukset 1 p, hiukkasten muuttuminen 1 p.",
    "hints": [
      "Yläindeksit ovat osa ionin identiteettiä.",
      "Ag⁺ ei ole sama kuin Ag-atomi."
    ],
    "skills": [
      "ke04.rea.ioni_ja_neutraloitumisreaktioiden_yhtalot",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Ioni- ja neutraloitumisreaktioiden yhtälöt",
      "ke04.rea.ioni_ja_neutraloitumisreaktioiden_yhtalot"
    ],
    "prerequisites": [],
    "commonErrors": [
      "reaction.spectator_ions"
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
    "seedKey": "ke04-v3:KE04-REA-041",
    "contentId": "KE04-REA-041",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Reaktiotyyppien tunnistaminen yhtälöistä",
    "questionType": "recognition",
    "difficulty": 2,
    "prompt": "Luokittele CH₂=CH₂ + Br₂ → BrCH₂CH₂Br.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Additioreaktio.",
    "scoring": "2 p: additio 1 p, perustelu C=C:n avautumisella 1 p.",
    "hints": [
      "Kaksi ryhmää liittyy kaksoissidokseen.",
      "C=C→C–C."
    ],
    "skills": [
      "ke04.rea.reaktiotyyppien_tunnistaminen_yhtaloista",
      "task.luokittelu"
    ],
    "expectedConcepts": [
      "Reaktiotyyppien tunnistaminen yhtälöistä",
      "ke04.rea.reaktiotyyppien_tunnistaminen_yhtaloista"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
    ],
    "estimatedSeconds": 83,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Luokittelu"
  },
  {
    "seedKey": "ke04-v3:KE04-REA-042",
    "contentId": "KE04-REA-042",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Reaktiotyyppien tunnistaminen yhtälöistä",
    "questionType": "recognition",
    "difficulty": 2,
    "prompt": "Luokittele CH₃CH₂Br + OH⁻ → CH₃CH₂OH + Br⁻.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Substituutioreaktio.",
    "scoring": "2 p.",
    "hints": [
      "Br korvautuu OH:lla.",
      "Ryhmä vaihtuu."
    ],
    "skills": [
      "ke04.rea.reaktiotyyppien_tunnistaminen_yhtaloista",
      "task.luokittelu"
    ],
    "expectedConcepts": [
      "Reaktiotyyppien tunnistaminen yhtälöistä",
      "ke04.rea.reaktiotyyppien_tunnistaminen_yhtaloista"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
    ],
    "estimatedSeconds": 83,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Luokittelu"
  },
  {
    "seedKey": "ke04-v3:KE04-REA-043",
    "contentId": "KE04-REA-043",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Reaktiotyyppien tunnistaminen yhtälöistä",
    "questionType": "recognition",
    "difficulty": 2,
    "prompt": "Luokittele CH₃CH₂OH → CH₂=CH₂ + H₂O.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Eliminaatioreaktio.",
    "scoring": "2 p.",
    "hints": [
      "Vettä poistuu.",
      "C=C syntyy."
    ],
    "skills": [
      "ke04.rea.reaktiotyyppien_tunnistaminen_yhtaloista",
      "task.luokittelu"
    ],
    "expectedConcepts": [
      "Reaktiotyyppien tunnistaminen yhtälöistä",
      "ke04.rea.reaktiotyyppien_tunnistaminen_yhtaloista"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
    ],
    "estimatedSeconds": 83,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Luokittelu"
  },
  {
    "seedKey": "ke04-v3:KE04-REA-044",
    "contentId": "KE04-REA-044",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Reaktiotyyppien tunnistaminen yhtälöistä",
    "questionType": "recognition",
    "difficulty": 3,
    "prompt": "Luokittele CaCO₃ → CaO + CO₂ ja Ag⁺ + Cl⁻ → AgCl(s).",
    "options": [],
    "correctAnswer": null,
    "explanation": "Ensimmäinen on hajoamisreaktio, toinen saostumisreaktio.",
    "scoring": "4 p: kumpikin 2 p.",
    "hints": [
      "Yksi lähtöaine → useita tuotteita.",
      "Liuenneista ioneista → kiinteä aine."
    ],
    "skills": [
      "ke04.rea.reaktiotyyppien_tunnistaminen_yhtaloista",
      "task.luokittelu"
    ],
    "expectedConcepts": [
      "Reaktiotyyppien tunnistaminen yhtälöistä",
      "ke04.rea.reaktiotyyppien_tunnistaminen_yhtaloista"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
    ],
    "estimatedSeconds": 97,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Luokittelu"
  },
  {
    "seedKey": "ke04-v3:KE04-REA-045",
    "contentId": "KE04-REA-045",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Reaktiotyyppien tunnistaminen yhtälöistä",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija luokittelee kaikki reaktiot, joissa vettä esiintyy tuotteena, palamisreaktioiksi. Miksi tämä on väärin?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Vettä syntyy myös esimerkiksi neutraloitumisessa ja kondensaatioreaktioissa. Reaktiotyyppi päätellään kokonaisesta rakennemuutoksesta ja lähtöaineista, ei yhden tuotteen perusteella.",
    "scoring": "3 p: vähintään yksi muu esimerkki 1 p, reaktiotyyppi ei yhdestä tuotteesta 1 p, kokonaismuutos 1 p.",
    "hints": [
      "HCl+NaOH tuottaa vettä muttei pala.",
      "Kondensaatiossakin voi syntyä H₂O."
    ],
    "skills": [
      "ke04.rea.reaktiotyyppien_tunnistaminen_yhtaloista",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Reaktiotyyppien tunnistaminen yhtälöistä",
      "ke04.rea.reaktiotyyppien_tunnistaminen_yhtaloista"
    ],
    "prerequisites": [],
    "commonErrors": [
      "reaction.type_confusion"
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
    "seedKey": "ke04-v3:KE04-REA-046",
    "contentId": "KE04-REA-046",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Integroivat tasapainotus- ja tarkistustehtävät",
    "questionType": "short_answer",
    "difficulty": 2,
    "prompt": "Kirjoita neljä käytännöllistä vaihetta reaktioyhtälön tasapainottamiseen.",
    "options": [],
    "correctAnswer": null,
    "explanation": "1) Kirjoita oikeat kemialliset kaavat. 2) Laske atomit molemmilta puolilta. 3) muuta vain kertoimia, kunnes kaikki alkuaineet täsmäävät. 4) supista kertoimet pienimmiksi kokonaisluvuiksi ja tarkista.",
    "scoring": "4 p, 1 p / vaihe.",
    "hints": [
      "Oikeat kaavat ensin.",
      "Kertoimet, ei alaindeksit.",
      "Lopuksi tarkistus."
    ],
    "skills": [
      "ke04.rea.integroivat_tasapainotus_ja_tarkistustehtavat",
      "task.menetelma"
    ],
    "expectedConcepts": [
      "Integroivat tasapainotus- ja tarkistustehtävät",
      "ke04.rea.integroivat_tasapainotus_ja_tarkistustehtavat"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
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
    "seedKey": "ke04-v3:KE04-REA-047",
    "contentId": "KE04-REA-047",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Integroivat tasapainotus- ja tarkistustehtävät",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Miksi tasapainottaminen ennen oikeiden kemiallisten kaavojen varmistamista on vaarallista?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kertoimilla voi tasapainottaa vain oikein kirjoitettuja aineita. Väärä kaava tarkoittaa väärää ainetta, jolloin atomitase voi näyttää siistiltä mutta kuvata kemiallisesti väärää reaktiota.",
    "scoring": "3 p: oikea aineidentiteetti 1 p, kertoimet eivät korjaa kaavaa 1 p, väärä reaktio 1 p.",
    "hints": [
      "Tasapaino ei todista aineiden olevan oikein.",
      "Kaava määrittää aineen."
    ],
    "skills": [
      "ke04.rea.integroivat_tasapainotus_ja_tarkistustehtavat",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Integroivat tasapainotus- ja tarkistustehtävät",
      "ke04.rea.integroivat_tasapainotus_ja_tarkistustehtavat"
    ],
    "prerequisites": [],
    "commonErrors": [
      "reaction.coefficients_vs_subscripts"
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
    "seedKey": "ke04-v3:KE04-REA-048",
    "contentId": "KE04-REA-048",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Integroivat tasapainotus- ja tarkistustehtävät",
    "questionType": "short_answer",
    "difficulty": 3,
    "prompt": "Tasapainota CaCO₃ + HCl → CaCl₂ + H₂O + CO₂.",
    "options": [],
    "correctAnswer": null,
    "explanation": "CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂.",
    "scoring": "4 p: HCl=2 1 p, muut kertoimet 1 1 p, atomitase 2 p.",
    "hints": [
      "Ca ja C ovat jo 1:1.",
      "CaCl₂ vaatii 2 Cl, joten HCl=2."
    ],
    "skills": [
      "ke04.rea.integroivat_tasapainotus_ja_tarkistustehtavat",
      "task.tasapainotus"
    ],
    "expectedConcepts": [
      "Integroivat tasapainotus- ja tarkistustehtävät",
      "ke04.rea.integroivat_tasapainotus_ja_tarkistustehtavat"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
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
    "seedKey": "ke04-v3:KE04-REA-049",
    "contentId": "KE04-REA-049",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Integroivat tasapainotus- ja tarkistustehtävät",
    "questionType": "short_answer",
    "difficulty": 3,
    "prompt": "Tasapainota Al + HCl → AlCl₃ + H₂ pienimmillä kokonaisluvuilla.",
    "options": [],
    "correctAnswer": null,
    "explanation": "2Al + 6HCl → 2AlCl₃ + 3H₂.",
    "scoring": "5 p: 2Al 1 p, 6HCl 1 p, 2AlCl₃ 1 p, 3H₂ 1 p, atomitase 1 p.",
    "hints": [
      "Tee Cl-määrä kolmen monikerraksi.",
      "Kun AlCl₃:a on 2, Cl:ää tarvitaan 6."
    ],
    "skills": [
      "ke04.rea.integroivat_tasapainotus_ja_tarkistustehtavat",
      "task.tasapainotus"
    ],
    "expectedConcepts": [
      "Integroivat tasapainotus- ja tarkistustehtävät",
      "ke04.rea.integroivat_tasapainotus_ja_tarkistustehtavat"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
    ],
    "estimatedSeconds": 135,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 5,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Tasapainotus"
  },
  {
    "seedKey": "ke04-v3:KE04-REA-050",
    "contentId": "KE04-REA-050",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "Integroivat tasapainotus- ja tarkistustehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "Tarkastele yhtälöä C₂H₅OH + O₂ → CO₂ + H₂O. a) Tasapainota yhtälö. b) Kerro kertoimien ainemääräsuhde etanoli:O₂:CO₂:H₂O. c) Selitä, miksi etanolin oma happiatomi on huomioitava.",
    "options": [],
    "correctAnswer": null,
    "explanation": "a) C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O. b) 1:3:2:3. c) Atomien säilymisessä kaikki lähtöaineiden O-atomit lasketaan mukaan; yksi tuotteiden happiatomeista tulee etanolista.",
    "scoring": "7 p: yhtälö 3 p, suhde 2 p, happiatomin perustelu 2 p.",
    "hints": [
      "Tasaa C ja H ensin.",
      "Tuotteissa on yhteensä 7 O-atomia.",
      "Etanoli tuo niistä yhden."
    ],
    "skills": [
      "ke04.rea.integroivat_tasapainotus_ja_tarkistustehtavat",
      "task.integroiva_koetehtava"
    ],
    "expectedConcepts": [
      "Integroivat tasapainotus- ja tarkistustehtävät",
      "ke04.rea.integroivat_tasapainotus_ja_tarkistustehtavat"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 7,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Integroiva koetehtävä"
  },
  {
    "seedKey": "ke04-v3:KE04-REA-X01",
    "contentId": "KE04-REA-X01",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Opiskelija sekoittaa 25,0 mL hopeanitraattiliuosta ja 25,0 mL natriumkloridiliuosta. Liuos samenee ja pohjalle muodostuu valkoista kiinteää ainetta. a) Nimeä havaintoon sopiva reaktiotyyppi. b) Kirjoita nettoioniyhtälö olomuotomerkintöineen. c) Selitä, mitä ionia/ioneja ei kirjoiteta nettoioniyhtälöön ja miksi.",
    "options": [],
    "correctAnswer": null,
    "explanation": "a) Saostumisreaktio. b) Ag⁺(aq)+Cl⁻(aq)→AgCl(s). c) Na⁺ ja NO₃⁻ ovat sivuioneja: ne säilyvät liuoksessa muuttumattomina eivätkä osallistu varsinaiseen kemialliseen muutokseen.",
    "scoring": "8 p: reaktiotyyppi 1 p; nettoioniyhtälö 4 p (ionit 2, kertoimet 1, olomuodot 1); sivuionien tunnistus 1 p; perustelu 2 p.",
    "hints": [
      "Sameus kertoo kiinteän aineen syntymisestä.",
      "Selvitä, mistä ioneista AgCl muodostuu.",
      "Supista pois ionit, jotka ovat samanlaisina ennen ja jälkeen."
    ],
    "skills": [
      "reaction.observation_to_equation",
      "reaction.net_ionic",
      "representation.states"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "reaction.observation_to_equation",
      "reaction.net_ionic",
      "representation.states"
    ],
    "prerequisites": [],
    "commonErrors": [
      "precipitate_as_gas",
      "spectator_ions_as_reactants"
    ],
    "estimatedSeconds": 309,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 8,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Aineistotehtävä"
  },
  {
    "seedKey": "ke04-v3:KE04-REA-X02",
    "contentId": "KE04-REA-X02",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "multiple_choice",
    "difficulty": 4,
    "prompt": "Tasapainota ensin mielessä Al + O₂ → Al₂O₃. Mikä vaihtoehto kuvaa oikein sekä kertoimet että syyn?",
    "options": [
      "2,2,1, koska Al on jo tasan",
      "4,3,2, koska O-atomien pienin yhteinen monikerta 2:n ja 3:n välillä on 6",
      "2,3,1, koska kertoimet voidaan valita massojen perusteella",
      "1,1,1, koska alaindeksit tasapainottavat yhtälön."
    ],
    "correctAnswer": "4,3,2, koska O-atomien pienin yhteinen monikerta 2:n ja 3:n välillä on 6",
    "explanation": "B. 4Al+3O₂→2Al₂O₃. O-atomeja tulee 6 kummallekin puolelle ja Al-atomeja 4.",
    "scoring": "3 p: B 1 p; O:n LCM-perustelu 1 p; Al-tarkistus 1 p.",
    "hints": [
      "Älä muuta alaindeksejä.",
      "Etsi O-määrä, joka on jaollinen sekä kahdella että kolmella",
      "Sulje pois vaihtoehdot vertaamalla jokaista niistä reaktioyhtälöön, rakenteeseen tai määritelmään.."
    ],
    "skills": [
      "reaction.balancing",
      "misconception.coefficients_vs_subscripts"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "reaction.balancing",
      "misconception.coefficients_vs_subscripts"
    ],
    "prerequisites": [],
    "commonErrors": [
      "subscript_editing",
      "coefficient_by_mass"
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
    "seedKey": "ke04-v3:KE04-REA-X03",
    "contentId": "KE04-REA-X03",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Suljetussa astiassa 5,00 g ainetta A reagoi 3,20 g aineen B kanssa. Reaktion jälkeen astiassa on vain yksi tuote C eikä kaasua ole poistunut. Tuotteen massa on 8,20 g. a) Mitä periaatetta tulos havainnollistaa? b) Miksi sama koe avoimessa astiassa voisi näyttää pienemmän loppumassan, jos tuotteena syntyisi kaasua?",
    "options": [],
    "correctAnswer": null,
    "explanation": "a) Massan säilymisen lakia: 5,00+3,20=8,20 g. b) Avoimessa astiassa kaasumainen tuote voi poistua punnittavasta systeemistä, vaikka kokonaismassa koko systeemissä säilyy.",
    "scoring": "5 p: massan säilyminen 2 p; laskennallinen osoitus 1 p; kaasun poistuminen 1 p; systeemirajauksen selitys 1 p.",
    "hints": [
      "Laske lähtöaineiden massat yhteen.",
      "Mieti mitä vaaka mittaa, jos kaasu karkaa",
      "Kirjoita välivaiheet näkyviin ja tarkista lopuksi yksiköt sekä tuloksen suuruusluokka.."
    ],
    "skills": [
      "reaction.mass_conservation",
      "experimental.closed_system"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "reaction.mass_conservation",
      "experimental.closed_system"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
    ],
    "estimatedSeconds": 309,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 5,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Kokeellinen tulkinta"
  },
  {
    "seedKey": "ke04-v3:KE04-REA-X04",
    "contentId": "KE04-REA-X04",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "short_answer",
    "difficulty": 4,
    "prompt": "Reaktio kuvataan sanallisesti: 'Etanoli reagoi hapen kanssa muodostaen hiilidioksidia ja vettä.' a) Kirjoita aineiden kaavat. b) Tasapainota reaktio. c) Merkitse etanoli ja vesi nesteiksi sekä O₂ ja CO₂ kaasuiksi.",
    "options": [],
    "correctAnswer": null,
    "explanation": "C₂H₅OH(l)+3O₂(g)→2CO₂(g)+3H₂O(l).",
    "scoring": "7 p: oikeat kaavat 2 p; kertoimet 3 p; olomuodot 2 p.",
    "hints": [
      "Etanoli on C₂H₅OH.",
      "Tasaa C ja H ennen O:ta.",
      "Muista etanolin oma O-atomi."
    ],
    "skills": [
      "reaction.word_to_symbolic",
      "reaction.balancing",
      "representation.states"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "reaction.word_to_symbolic",
      "reaction.balancing",
      "representation.states"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
    ],
    "estimatedSeconds": 154,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 7,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Esitystapatehtävä"
  },
  {
    "seedKey": "ke04-v3:KE04-REA-X05",
    "contentId": "KE04-REA-X05",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "error_detection",
    "difficulty": 4,
    "prompt": "Opiskelija kirjoittaa CaCO₃ + 2HCl → CaCl₂ + H₂ + CO₃ ja toteaa yhtälön olevan 'tasapainossa atomien määrän perusteella'. Arvioi, miksi pelkkä atomien lukumäärä ei riitä hyväksymään reaktioyhtälöä, ja kirjoita oikea reaktio.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Tasapaino ei takaa tuotteiden kemiallista oikeellisuutta. Karbonaatin ja hapon reaktiossa muodostuu CaCl₂, H₂O ja CO₂: CaCO₃+2HCl→CaCl₂+H₂O+CO₂.",
    "scoring": "6 p: 'tasapaino ei riitä' 2 p; oikeat tuotteet 2 p; tasapainotus 2 p.",
    "hints": [
      "Kysy, ovatko tuotteet oikeita aineita, ei vain onko atomeja yhtä paljon.",
      "Happo + karbonaatti tuottaa tyypillisesti CO₂:ta",
      "Nimeä ensin väärä kemiallinen periaate ja vasta sitten sen vaikutus lopputulokseen.."
    ],
    "skills": [
      "reaction.chemical_plausibility",
      "reaction.balancing"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "reaction.chemical_plausibility",
      "reaction.balancing"
    ],
    "prerequisites": [],
    "commonErrors": [
      "balanced_but_wrong_products"
    ],
    "estimatedSeconds": 221,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 6,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Virheen analyysi"
  },
  {
    "seedKey": "ke04-v3:KE04-REA-X06",
    "contentId": "KE04-REA-X06",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "application",
    "difficulty": 5,
    "prompt": "Neljä koeputkea antavat havainnot: I valkoinen kiinteä aine muodostuu kahden kirkkaan liuoksen sekoituksessa; II väritön kaasu vapautuu yhtä kiinteää ainetta kuumennettaessa; III bromin väri häviää alkeenia lisättäessä; IV alkoholi muuttuu alkeeniksi ja vettä syntyy. Luokittele jokainen reaktio ja kerro yksi rakenteellinen/havaintoon perustuva peruste.",
    "options": [],
    "correctAnswer": null,
    "explanation": "I saostuminen (kiinteä aine liuoksista); II hajoaminen (yksi aine → useita, kaasu syntyy); III additio (C=C reagoi, Br₂ kuluu); IV eliminaatio (H₂O poistuu ja C=C syntyy).",
    "scoring": "8 p: 1 p oikea luokitus +1 p perustelu jokaisesta.",
    "hints": [
      "Älä luokittele vain tuotteiden lukumäärän perusteella.",
      "Käytä havaintoa tai sidoksen muutosta",
      "Kirjoita välivaiheet näkyviin ja tarkista lopuksi yksiköt sekä tuloksen suuruusluokka.."
    ],
    "skills": [
      "reaction.classification",
      "reaction.observation",
      "organic.reaction_types"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "reaction.classification",
      "reaction.observation",
      "organic.reaction_types"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
    ],
    "estimatedSeconds": 347,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 8,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Aineistopohjainen luokittelu"
  },
  {
    "seedKey": "ke04-v3:KE04-REA-X07",
    "contentId": "KE04-REA-X07",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "Tuntematon aine X kuumennetaan. Sen massa pienenee 10,00 g:sta 5,60 g:aan ja samalla vapautuu kaasu, joka sammuttaa palavan tikun ja reagoi kalkkiveden kanssa sameuttaen sen. a) Päättele kaasun todennäköinen identiteetti. b) Minkä tyyppiseen reaktioon havainto viittaa? c) Jos X on CaCO₃, kirjoita tasapainotettu yhtälö ja osoita moolimassojen avulla, onko 10,00 g → 5,60 g kiinteää jäännöstä likimain järkevä.",
    "options": [],
    "correctAnswer": null,
    "explanation": "a) CO₂. b) Terminen hajoaminen. c) CaCO₃→CaO+CO₂. M(CaCO₃)≈100,1 g/mol, M(CaO)≈56,1 g/mol, joten 10,00 g CaCO₃ antaisi noin 5,60 g CaO:ta, mikä sopii havaintoon.",
    "scoring": "10 p: CO₂ 2 p; hajoaminen 1 p; yhtälö 3 p; moolimassat/suhde 2 p; massan järkevyyden johtopäätös 2 p.",
    "hints": [
      "Kalkkiveden sameutuminen on CO₂:n vihje.",
      "Yksi kiinteä aine tuottaa kiinteän + kaasun.",
      "Vertaa M(CaO)/M(CaCO₃)."
    ],
    "skills": [
      "reaction.experimental_inference",
      "decomposition",
      "stoichiometry.mass_check"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "reaction.experimental_inference",
      "decomposition",
      "stoichiometry.mass_check"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_vs_subscripts",
      "atom_balance"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 10,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Koetehtävä"
  },
  {
    "seedKey": "ke04-v3:KE04-REA-X08",
    "contentId": "KE04-REA-X08",
    "chapter": 1,
    "topicName": "Reaktioyhtälöt ja tasapainotus",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "Reaktio 2Al + 6HCl → 2AlCl₃ + 3H₂ toteutetaan koeputkessa. a) Tarkista atomitase. b) Mitkä havainnot tukisivat sitä, että kaasua syntyy? c) Miksi yhtälön kertoimista ei saa päätellä, että 2 g Al reagoi 6 g HCl:n kanssa? d) Kirjoita Al:HCl:H₂ ainemääräsuhde.",
    "options": [],
    "correctAnswer": null,
    "explanation": "a) Al 2=2, H 6=6, Cl 6=6. b) Kupliminen/kaasun kerääntyminen. c) Kertoimet ovat mooli-/hiukkassuhteita, eivät massasuhteita. d) 2:6:3 eli Al:HCl:H₂=2:6:3.",
    "scoring": "10 p: atomitase 3 p; havainto 2 p; kertoimien merkitys 3 p; suhde 2 p.",
    "hints": [
      "Tarkista jokainen alkuaine.",
      "Erota moolit grammoista.",
      "Lue suhde suoraan kertoimista."
    ],
    "skills": [
      "reaction.balancing",
      "experimental.observation",
      "stoichiometric_coefficients"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "reaction.balancing",
      "experimental.observation",
      "stoichiometric_coefficients"
    ],
    "prerequisites": [],
    "commonErrors": [
      "coefficients_as_grams"
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
