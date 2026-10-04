import type { Ke04SeedQuestion } from "./types";

export const questions: Ke04SeedQuestion[] = [
  {
    "seedKey": "ke04-v3:KE04-PRO-001",
    "contentId": "KE04-PRO-001",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Brønsted-happo ja -emäs",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Määrittele Brønsted-happo ja Brønsted-emäs.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Happo luovuttaa protonin H⁺; emäs vastaanottaa protonin.",
    "scoring": "2 p, 1 p / määritelmä.",
    "hints": [
      "Happo antaa H⁺.",
      "Emäs ottaa H⁺."
    ],
    "skills": [
      "ke04.pro.br_nsted_happo_ja_emas",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Brønsted-happo ja -emäs",
      "ke04.pro.br_nsted_happo_ja_emas"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-PRO-002",
    "contentId": "KE04-PRO-002",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Brønsted-happo ja -emäs",
    "questionType": "multiple_choice",
    "difficulty": 1,
    "prompt": "Kumpi toimii happona reaktiossa HCl + H₂O → H₃O⁺ + Cl⁻?",
    "options": [
      "HCl",
      "H₂O",
      "Cl⁻",
      "H₃O⁺"
    ],
    "correctAnswer": "HCl",
    "explanation": "A, HCl.",
    "scoring": "1 p.",
    "hints": [
      "Kuka luovuttaa protonin?",
      "HCl menettää H⁺."
    ],
    "skills": [
      "ke04.pro.br_nsted_happo_ja_emas",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Brønsted-happo ja -emäs",
      "ke04.pro.br_nsted_happo_ja_emas"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acidbase.donor_acceptor"
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
    "seedKey": "ke04-v3:KE04-PRO-003",
    "contentId": "KE04-PRO-003",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Brønsted-happo ja -emäs",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Kumpi toimii emäksenä samassa reaktiossa HCl + H₂O → H₃O⁺ + Cl⁻?",
    "options": [
      "HCl",
      "H₂O",
      "H₃O⁺",
      "Cl⁻"
    ],
    "correctAnswer": "H₂O",
    "explanation": "B, H₂O.",
    "scoring": "1 p.",
    "hints": [
      "Kuka vastaanottaa protonin?",
      "H₂O muuttuu H₃O⁺:ksi."
    ],
    "skills": [
      "ke04.pro.br_nsted_happo_ja_emas",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Brønsted-happo ja -emäs",
      "ke04.pro.br_nsted_happo_ja_emas"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "pro.common_misconception"
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
    "seedKey": "ke04-v3:KE04-PRO-004",
    "contentId": "KE04-PRO-004",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Brønsted-happo ja -emäs",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi protoninsiirtoreaktiossa happo ja emäs tarvitaan samanaikaisesti?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Protoni ei siirry 'tyhjyyteen': yhden hiukkasen luovuttama H⁺ vastaanotetaan toiselle hiukkaselle. Siksi protonin luovuttaja ja vastaanottaja muodostavat reaktioparin.",
    "scoring": "3 p: luovuttaja 1 p, vastaanottaja 1 p, siirron yhteys 1 p.",
    "hints": [
      "Seuraa yhtä H⁺:aa.",
      "Sillä täytyy olla lähtö- ja vastaanottajahiukkanen."
    ],
    "skills": [
      "ke04.pro.br_nsted_happo_ja_emas",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Brønsted-happo ja -emäs",
      "ke04.pro.br_nsted_happo_ja_emas"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-PRO-005",
    "contentId": "KE04-PRO-005",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Brønsted-happo ja -emäs",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Väite: 'Emäs on aina aine, joka sisältää OH⁻-ryhmän.' Korjaa Brønsted-mallin avulla.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Väärin. Brønsted-emäs on protonin vastaanottaja, eikä sen tarvitse sisältää OH-ryhmää. Esimerkiksi NH₃ vastaanottaa protonin muodostaen NH₄⁺.",
    "scoring": "3 p: protonin vastaanottaja 1 p, OH ei välttämätön 1 p, esimerkki 1 p.",
    "hints": [
      "Käytä määritelmää, älä rakennekuvaa.",
      "Mieti ammoniakkia."
    ],
    "skills": [
      "ke04.pro.br_nsted_happo_ja_emas",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Brønsted-happo ja -emäs",
      "ke04.pro.br_nsted_happo_ja_emas"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acidbase.donor_acceptor"
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
    "seedKey": "ke04-v3:KE04-PRO-006",
    "contentId": "KE04-PRO-006",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Vastinhappo- ja vastinemäsparit",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mikä on HCl:n vastinemäs protonin luovutuksen jälkeen?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Cl⁻.",
    "scoring": "1 p.",
    "hints": [
      "Poista H⁺ HCl:stä.",
      "Jäljelle jää kloridi."
    ],
    "skills": [
      "ke04.pro.vastinhappo_ja_vastinemasparit",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Vastinhappo- ja vastinemäsparit",
      "ke04.pro.vastinhappo_ja_vastinemasparit"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-PRO-007",
    "contentId": "KE04-PRO-007",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Vastinhappo- ja vastinemäsparit",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mikä on NH₃:n vastinhappo protonin vastaanoton jälkeen?",
    "options": [],
    "correctAnswer": null,
    "explanation": "NH₄⁺.",
    "scoring": "1 p.",
    "hints": [
      "Lisää H⁺ ammoniakkiin.",
      "Varaus kasvaa yhdellä positiiviseen suuntaan."
    ],
    "skills": [
      "ke04.pro.vastinhappo_ja_vastinemasparit",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Vastinhappo- ja vastinemäsparit",
      "ke04.pro.vastinhappo_ja_vastinemasparit"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-PRO-008",
    "contentId": "KE04-PRO-008",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Vastinhappo- ja vastinemäsparit",
    "questionType": "matching",
    "difficulty": 2,
    "prompt": "Yhdistä vastinparit: H₂O, H₃O⁺, NH₃, NH₄⁺ ↔ H₃O⁺/H₂O ja NH₄⁺/NH₃.",
    "options": [],
    "correctAnswer": null,
    "explanation": "H₃O⁺ ↔ H₂O; NH₄⁺ ↔ NH₃.",
    "scoring": "2 p, 1 p / pari.",
    "hints": [
      "Vastinpari eroaa yhdellä H⁺:lla.",
      "Etsi yhden protonin ero."
    ],
    "skills": [
      "ke04.pro.vastinhappo_ja_vastinemasparit",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Vastinhappo- ja vastinemäsparit",
      "ke04.pro.vastinhappo_ja_vastinemasparit"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
    ],
    "estimatedSeconds": 133,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "H₃O⁺",
        "right": "H₂O"
      },
      {
        "left": "NH₄⁺",
        "right": "NH₃."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-PRO-009",
    "contentId": "KE04-PRO-009",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Vastinhappo- ja vastinemäsparit",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Mikä rakenteellinen yhteys vastinhapolla ja vastinemäksellä on?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Ne eroavat toisistaan yhden protonin H⁺ verran. Happo menettää H⁺:n ja muuttuu vastinemäksekseen; emäs saa H⁺:n ja muuttuu vastinhapokseen.",
    "scoring": "3 p.",
    "hints": [
      "Seuraa yhtä protonia.",
      "Muu rakenne säilyy samana."
    ],
    "skills": [
      "ke04.pro.vastinhappo_ja_vastinemasparit",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Vastinhappo- ja vastinemäsparit",
      "ke04.pro.vastinhappo_ja_vastinemasparit"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-PRO-010",
    "contentId": "KE04-PRO-010",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Vastinhappo- ja vastinemäsparit",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija nimeää H₂O:n ja OH⁻:n täysin toisistaan riippumattomiksi aineiksi protoninsiirrossa. Mikä yhteys niillä on?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Ne ovat vastinhappo-vastinemäspari: H₂O voi luovuttaa H⁺:n ja muuttua OH⁻:ksi.",
    "scoring": "2 p: vastinpari 1 p, yhden H⁺:n ero 1 p.",
    "hints": [
      "Vertaa kaavoja.",
      "H₂O − H⁺ = OH⁻."
    ],
    "skills": [
      "ke04.pro.vastinhappo_ja_vastinemasparit",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Vastinhappo- ja vastinemäsparit",
      "ke04.pro.vastinhappo_ja_vastinemasparit"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acidbase.donor_acceptor"
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
    "seedKey": "ke04-v3:KE04-PRO-011",
    "contentId": "KE04-PRO-011",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Protoninsiirtoreaktioiden kirjoittaminen",
    "questionType": "short_answer",
    "difficulty": 2,
    "prompt": "Kirjoita HCl:n protoninsiirto veteen.",
    "options": [],
    "correctAnswer": null,
    "explanation": "HCl + H₂O → H₃O⁺ + Cl⁻.",
    "scoring": "3 p: oikeat lähtöaineet 1 p, H₃O⁺ 1 p, Cl⁻ 1 p.",
    "hints": [
      "Vesi vastaanottaa H⁺.",
      "HCl:stä jää Cl⁻."
    ],
    "skills": [
      "ke04.pro.protoninsiirtoreaktioiden_kirjoittaminen",
      "task.reaktio"
    ],
    "expectedConcepts": [
      "Protoninsiirtoreaktioiden kirjoittaminen",
      "ke04.pro.protoninsiirtoreaktioiden_kirjoittaminen"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-PRO-012",
    "contentId": "KE04-PRO-012",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Protoninsiirtoreaktioiden kirjoittaminen",
    "questionType": "short_answer",
    "difficulty": 2,
    "prompt": "Kirjoita NH₃:n reaktio veden kanssa protoninsiirtona.",
    "options": [],
    "correctAnswer": null,
    "explanation": "NH₃ + H₂O ⇌ NH₄⁺ + OH⁻.",
    "scoring": "4 p: NH₄⁺ 1 p, OH⁻ 1 p, atomit/varaukset 1 p, järkevä reaktionuoli 1 p.",
    "hints": [
      "NH₃ vastaanottaa H⁺.",
      "H₂O:sta jää OH⁻."
    ],
    "skills": [
      "ke04.pro.protoninsiirtoreaktioiden_kirjoittaminen",
      "task.reaktio"
    ],
    "expectedConcepts": [
      "Protoninsiirtoreaktioiden kirjoittaminen",
      "ke04.pro.protoninsiirtoreaktioiden_kirjoittaminen"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-PRO-013",
    "contentId": "KE04-PRO-013",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Protoninsiirtoreaktioiden kirjoittaminen",
    "questionType": "short_answer",
    "difficulty": 3,
    "prompt": "Tarkista varausten säilyminen reaktiossa HCl + H₂O → H₃O⁺ + Cl⁻.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Vasen kokonaisvaraus 0; oikealla +1 + (−1)=0. Varaus säilyy.",
    "scoring": "2 p.",
    "hints": [
      "Summaa varaukset.",
      "Neutraali lähtöpuoli tarvitsee neutraalin kokonaisvarauksen tuotteissa."
    ],
    "skills": [
      "ke04.pro.protoninsiirtoreaktioiden_kirjoittaminen",
      "task.varaustarkistus"
    ],
    "expectedConcepts": [
      "Protoninsiirtoreaktioiden kirjoittaminen",
      "ke04.pro.protoninsiirtoreaktioiden_kirjoittaminen"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
    ],
    "estimatedSeconds": 135,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Varaustarkistus"
  },
  {
    "seedKey": "ke04-v3:KE04-PRO-014",
    "contentId": "KE04-PRO-014",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Protoninsiirtoreaktioiden kirjoittaminen",
    "questionType": "recognition",
    "difficulty": 3,
    "prompt": "Reaktiossa HA + B → A⁻ + BH⁺, mikä on happo ja mikä emäs?",
    "options": [],
    "correctAnswer": null,
    "explanation": "HA on happo, koska se luovuttaa H⁺; B on emäs, koska se vastaanottaa H⁺.",
    "scoring": "2 p.",
    "hints": [
      "Vertaa HA→A⁻.",
      "B→BH⁺."
    ],
    "skills": [
      "ke04.pro.protoninsiirtoreaktioiden_kirjoittaminen",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Protoninsiirtoreaktioiden kirjoittaminen",
      "ke04.pro.protoninsiirtoreaktioiden_kirjoittaminen"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-PRO-015",
    "contentId": "KE04-PRO-015",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Protoninsiirtoreaktioiden kirjoittaminen",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Reaktio on kirjoitettu HA + B → HA⁺ + B⁻ ja sitä kutsutaan protoninsiirroksi, jossa HA on happo. Mikä ei täsmää?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Jos HA on happo, sen pitäisi luovuttaa H⁺ ja muuttua A⁻:ksi, ei saada protonia ja muuttua positiivisemmaksi. B:n pitäisi vastaanottaa H⁺ ja muuttua BH⁺:ksi.",
    "scoring": "4 p: HA:n suunta 2 p, B:n suunta 2 p.",
    "hints": [
      "Happo menettää protonin.",
      "Varaus muuttuu sen mukaisesti."
    ],
    "skills": [
      "ke04.pro.protoninsiirtoreaktioiden_kirjoittaminen",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Protoninsiirtoreaktioiden kirjoittaminen",
      "ke04.pro.protoninsiirtoreaktioiden_kirjoittaminen"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acidbase.donor_acceptor"
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
    "seedKey": "ke04-v3:KE04-PRO-016",
    "contentId": "KE04-PRO-016",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Neutraloitumisen perusidea",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitä neutraloitumisessa tapahtuu H₃O⁺- ja OH⁻-ioneille?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Ne reagoivat muodostaen vettä: H₃O⁺ + OH⁻ → 2H₂O.",
    "scoring": "2 p: reaktio 2 p.",
    "hints": [
      "Happamuutta ja emäksisyyttä aiheuttavat ionit kuluvat.",
      "Tuote on vesi."
    ],
    "skills": [
      "ke04.pro.neutraloitumisen_perusidea",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Neutraloitumisen perusidea",
      "ke04.pro.neutraloitumisen_perusidea"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-PRO-017",
    "contentId": "KE04-PRO-017",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Neutraloitumisen perusidea",
    "questionType": "multiple_choice",
    "difficulty": 1,
    "prompt": "Mikä on HCl:n ja NaOH:n neutraloitumisen suolatuote?",
    "options": [
      "NaCl",
      "H₂",
      "Cl₂",
      "Na₂O"
    ],
    "correctAnswer": "NaCl",
    "explanation": "A, NaCl.",
    "scoring": "1 p.",
    "hints": [
      "Yhdistä emäksen kationi ja hapon anioni.",
      "Na⁺ + Cl⁻."
    ],
    "skills": [
      "ke04.pro.neutraloitumisen_perusidea",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Neutraloitumisen perusidea",
      "ke04.pro.neutraloitumisen_perusidea"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "pro.common_misconception"
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
    "seedKey": "ke04-v3:KE04-PRO-018",
    "contentId": "KE04-PRO-018",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Neutraloitumisen perusidea",
    "questionType": "short_answer",
    "difficulty": 2,
    "prompt": "Tasapainota HCl + NaOH → NaCl + H₂O.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Yhtälö on jo suhteessa 1:1:1:1: HCl + NaOH → NaCl + H₂O.",
    "scoring": "2 p: kertoimet 1 p, atomitase 1 p.",
    "hints": [
      "Laske H, Cl, Na ja O.",
      "Kaikkia on jo yhtä paljon."
    ],
    "skills": [
      "ke04.pro.neutraloitumisen_perusidea",
      "task.reaktio"
    ],
    "expectedConcepts": [
      "Neutraloitumisen perusidea",
      "ke04.pro.neutraloitumisen_perusidea"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
    ],
    "estimatedSeconds": 117,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Reaktio"
  },
  {
    "seedKey": "ke04-v3:KE04-PRO-019",
    "contentId": "KE04-PRO-019",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Neutraloitumisen perusidea",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miten neutraloituminen on protoninsiirtoreaktio?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Happo luovuttaa protonin emäkselle; vesiliuoksessa H₃O⁺ ja OH⁻ yhdistyvät vedeksi. Protonin siirtyminen poistaa happo- ja emäshiukkasia.",
    "scoring": "3 p.",
    "hints": [
      "Käytä Brønsted-määritelmiä.",
      "Seuraa H⁺:aa."
    ],
    "skills": [
      "ke04.pro.neutraloitumisen_perusidea",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Neutraloitumisen perusidea",
      "ke04.pro.neutraloitumisen_perusidea"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-PRO-020",
    "contentId": "KE04-PRO-020",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Neutraloitumisen perusidea",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Väite: 'Neutraloitumisessa kaikki liuoksen ionit häviävät.' Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Neutraloitumisessa H₃O⁺ ja OH⁻ kuluvat vedeksi, mutta sivuionit kuten Na⁺ ja Cl⁻ jäävät liuokseen suolan ioneina.",
    "scoring": "3 p: H₃O⁺/OH⁻ kuluvat 1 p, sivuionit jäävät 1 p, esimerkki 1 p.",
    "hints": [
      "Kirjoita täydellinen ioniyhtälö.",
      "Katso mitä Na⁺:lle ja Cl⁻:lle tapahtuu."
    ],
    "skills": [
      "ke04.pro.neutraloitumisen_perusidea",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Neutraloitumisen perusidea",
      "ke04.pro.neutraloitumisen_perusidea"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "pro.common_misconception"
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
    "seedKey": "ke04-v3:KE04-PRO-021",
    "contentId": "KE04-PRO-021",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Neutraloitumisen stoikiometria",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Kuinka monta moolia NaOH:ta tarvitaan neutraloimaan 0,250 mol HCl:ää?",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,250 mol NaOH, koska suhde on 1:1.",
    "scoring": "2 p.",
    "hints": [
      "Tasapainotettu yhtälö.",
      "HCl:NaOH = 1:1."
    ],
    "skills": [
      "ke04.pro.neutraloitumisen_stoikiometria",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Neutraloitumisen stoikiometria",
      "ke04.pro.neutraloitumisen_stoikiometria"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-PRO-022",
    "contentId": "KE04-PRO-022",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Neutraloitumisen stoikiometria",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "0,100 mol HCl reagoi täydellisesti NaOH:n kanssa. Kuinka monta moolia vettä muodostuu yhtälön HCl + NaOH → NaCl + H₂O mukaan?",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,100 mol H₂O.",
    "scoring": "2 p.",
    "hints": [
      "HCl:H₂O = 1:1.",
      "Käytä kertoimia."
    ],
    "skills": [
      "ke04.pro.neutraloitumisen_stoikiometria",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Neutraloitumisen stoikiometria",
      "ke04.pro.neutraloitumisen_stoikiometria"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-PRO-023",
    "contentId": "KE04-PRO-023",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Neutraloitumisen stoikiometria",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "Kuinka monta moolia NaOH:ta tarvitaan neutraloimaan 0,150 mol H₂SO₄:ää, kun H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O?",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,300 mol NaOH.",
    "scoring": "3 p: suhde 1:2 1 p, lasku 1 p, yksikkö 1 p.",
    "hints": [
      "Rikkihapossa on tässä kaksi neutraloitavaa protonia.",
      "Kerro 0,150 kahdella."
    ],
    "skills": [
      "ke04.pro.neutraloitumisen_stoikiometria",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Neutraloitumisen stoikiometria",
      "ke04.pro.neutraloitumisen_stoikiometria"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-PRO-024",
    "contentId": "KE04-PRO-024",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Neutraloitumisen stoikiometria",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "0,500 mol NaOH:ta neutraloidaan H₂SO₄:lla. Kuinka monta moolia H₂SO₄ tarvitaan?",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,250 mol H₂SO₄.",
    "scoring": "3 p.",
    "hints": [
      "2 mol NaOH per 1 mol H₂SO₄.",
      "Jaa kahdella."
    ],
    "skills": [
      "ke04.pro.neutraloitumisen_stoikiometria",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Neutraloitumisen stoikiometria",
      "ke04.pro.neutraloitumisen_stoikiometria"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-PRO-025",
    "contentId": "KE04-PRO-025",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Neutraloitumisen stoikiometria",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija käyttää H₂SO₄:n ja NaOH:n suhteena 1:1 ja saa 0,150 mol NaOH:ta 0,150 mol H₂SO₄:lle. Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Tasapainotettu yhtälö antaa suhteen 1:2, joten NaOH:ta tarvitaan 0,300 mol.",
    "scoring": "3 p: oikea suhde 1 p, lasku 1 p, tulos 1 p.",
    "hints": [
      "Tasapainota reaktio ennen laskua.",
      "H₂SO₄ + 2NaOH."
    ],
    "skills": [
      "ke04.pro.neutraloitumisen_stoikiometria",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Neutraloitumisen stoikiometria",
      "ke04.pro.neutraloitumisen_stoikiometria"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "titration.stoichiometric_ratio"
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
    "seedKey": "ke04-v3:KE04-PRO-026",
    "contentId": "KE04-PRO-026",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Titrauksen periaate ja välineet",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mikä on happo-emästitrauksen tavoite?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Määrittää tuntemattoman liuoksen pitoisuus tunnetun pitoisuuden omaavan titrantin ja stoikiometrisen reaktion avulla.",
    "scoring": "3 p: tuntematon pitoisuus 1 p, tunnettu titrantti 1 p, stoikiometria 1 p.",
    "hints": [
      "Toisen liuoksen pitoisuus tunnetaan.",
      "Mitataan reagoiva tilavuus."
    ],
    "skills": [
      "ke04.pro.titrauksen_periaate_ja_valineet",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Titrauksen periaate ja välineet",
      "ke04.pro.titrauksen_periaate_ja_valineet"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-PRO-027",
    "contentId": "KE04-PRO-027",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Titrauksen periaate ja välineet",
    "questionType": "multiple_choice",
    "difficulty": 1,
    "prompt": "Mistä välineestä titrantti tavallisesti annostellaan tarkasti?",
    "options": [
      "byretistä",
      "täyspipetistä",
      "mittapullosta",
      "mittalasista"
    ],
    "correctAnswer": "byretistä",
    "explanation": "A, byretistä.",
    "scoring": "1 p.",
    "hints": [
      "Pitkä asteikollinen lasiväline hanalla.",
      "Sen lukemasta saadaan käytetty tilavuus."
    ],
    "skills": [
      "ke04.pro.titrauksen_periaate_ja_valineet",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Titrauksen periaate ja välineet",
      "ke04.pro.titrauksen_periaate_ja_valineet"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "pro.common_misconception"
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
    "seedKey": "ke04-v3:KE04-PRO-028",
    "contentId": "KE04-PRO-028",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Titrauksen periaate ja välineet",
    "questionType": "recognition",
    "difficulty": 2,
    "prompt": "Mitä tarkoittaa ekvivalenttikohta titrauksessa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kohtaa, jossa titranttia ja analyytin reagoivaa ainetta on lisätty stoikiometrisesti oikea määrä reaktioyhtälön mukaisesti.",
    "scoring": "3 p: stoikiometrinen määrä 2 p, yhtälöön sidottu 1 p.",
    "hints": [
      "Ei tarkoita aina 'pH 7'.",
      "Kertoimet ratkaisevat."
    ],
    "skills": [
      "ke04.pro.titrauksen_periaate_ja_valineet",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Titrauksen periaate ja välineet",
      "ke04.pro.titrauksen_periaate_ja_valineet"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
    ],
    "estimatedSeconds": 83,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Tunnistus"
  },
  {
    "seedKey": "ke04-v3:KE04-PRO-029",
    "contentId": "KE04-PRO-029",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Titrauksen periaate ja välineet",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi byretin alku- ja loppulukema luetaan eikä käytetä vain loppulukemaa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kulunut titranttitilavuus saadaan loppu- ja alkulukeman erotuksena; byretti ei välttämättä ala nollasta.",
    "scoring": "2 p.",
    "hints": [
      "V = loppu − alku.",
      "Alkutilanne voi olla muu kuin 0,00 mL."
    ],
    "skills": [
      "ke04.pro.titrauksen_periaate_ja_valineet",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Titrauksen periaate ja välineet",
      "ke04.pro.titrauksen_periaate_ja_valineet"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-PRO-030",
    "contentId": "KE04-PRO-030",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Titrauksen periaate ja välineet",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Väite: 'Ekvivalenttikohta on aina sama kuin pH 7.' Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Ei aina. Ekvivalenttikohta määritellään stoikiometrisesti. pH riippuu titrattavan hapon/emäksen vahvuudesta ja muodostuvista lajeista; pH 7 pätee ideaalisti vahvan hapon ja vahvan emäksen tietyssä tapauksessa.",
    "scoring": "4 p: stoikiometrinen määritelmä 2 p, pH ei aina 7 1 p, riippuvuus aineista 1 p.",
    "hints": [
      "Erota kemiallinen ainemääräsuhde ja pH.",
      "Kaikki hapot/emäkset eivät ole yhtä vahvoja."
    ],
    "skills": [
      "ke04.pro.titrauksen_periaate_ja_valineet",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Titrauksen periaate ja välineet",
      "ke04.pro.titrauksen_periaate_ja_valineet"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "titration.equivalence_vs_ph7"
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
    "seedKey": "ke04-v3:KE04-PRO-031",
    "contentId": "KE04-PRO-031",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Indikaattori ja päätepiste",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mikä on happo-emäsindikaattorin tehtävä titrauksessa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Antaa havaittava värinmuutos sopivalla pH-alueella, jonka avulla titrauksen päätepiste voidaan havaita.",
    "scoring": "2 p.",
    "hints": [
      "Indikaattori vaihtaa väriä.",
      "Se auttaa pysäyttämään titrauksen lähellä ekvivalenttikohtaa."
    ],
    "skills": [
      "ke04.pro.indikaattori_ja_paatepiste",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Indikaattori ja päätepiste",
      "ke04.pro.indikaattori_ja_paatepiste"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-PRO-032",
    "contentId": "KE04-PRO-032",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Indikaattori ja päätepiste",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Mitä tarkoittaa titrauksen päätepiste?",
    "options": [
      "havaittua kohtaa, esimerkiksi indikaattorin pysyvää värinmuutosta",
      "täsmälleen samaa asiaa kuin ekvivalenttikohta kaikissa titrauksissa",
      "kohtaa, jossa byretti on tyhjä",
      "kohtaa, jossa analyytin ja titrantin tilavuudet ovat aina yhtä suuret"
    ],
    "correctAnswer": "havaittua kohtaa, esimerkiksi indikaattorin pysyvää värinmuutosta",
    "explanation": "A.",
    "scoring": "1 p.",
    "hints": [
      "Päätepiste on havainto.",
      "Ekvivalenttikohta on stoikiometrinen käsite."
    ],
    "skills": [
      "ke04.pro.indikaattori_ja_paatepiste",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Indikaattori ja päätepiste",
      "ke04.pro.indikaattori_ja_paatepiste"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "titration.endpoint"
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
    "seedKey": "ke04-v3:KE04-PRO-033",
    "contentId": "KE04-PRO-033",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Indikaattori ja päätepiste",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi indikaattorin värinmuutosalueen pitäisi osua lähelle titrauksen jyrkkää pH-muutosaluetta?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Silloin havaittu päätepiste on mahdollisimman lähellä todellista ekvivalenttikohtaa ja titrantin ylimäärästä aiheutuva virhe pienenee.",
    "scoring": "3 p: päätepiste≈ekvivalenttikohta 1 p, jyrkkä alue 1 p, virheen pieneneminen 1 p.",
    "hints": [
      "Tavoite on lopettaa oikeaan stoikiometriseen kohtaan.",
      "Värimuutoksen ajoitus vaikuttaa tilavuuteen."
    ],
    "skills": [
      "ke04.pro.indikaattori_ja_paatepiste",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Indikaattori ja päätepiste",
      "ke04.pro.indikaattori_ja_paatepiste"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-PRO-034",
    "contentId": "KE04-PRO-034",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Indikaattori ja päätepiste",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija lisää titranttia nopeasti vielä voimakkaan värinmuutoksen jälkeen. Miten tämä vaikuttaa tulokseen?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Titranttia tulee liikaa, mitattu tilavuus kasvaa ja laskettu tuntemattoman aineen määrä/pitoisuus voi vääristyä liian suureksi käytetystä kaavasta riippuen.",
    "scoring": "3 p: ylitys 1 p, tilavuus liian suuri 1 p, pitoisuusvirhe 1 p.",
    "hints": [
      "Titrantin määrä lasketaan tilavuudesta.",
      "Liika titrantti näyttää suuremman reagoineen ainemäärän."
    ],
    "skills": [
      "ke04.pro.indikaattori_ja_paatepiste",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Indikaattori ja päätepiste",
      "ke04.pro.indikaattori_ja_paatepiste"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "titration.endpoint"
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
    "seedKey": "ke04-v3:KE04-PRO-035",
    "contentId": "KE04-PRO-035",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Indikaattori ja päätepiste",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Miksi titrauksen loppuvaiheessa titranttia lisätään usein pisaroittain?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Koska lähellä päätepistettä pieni lisätilavuus voi muuttaa indikaattorin väriä merkittävästi; pisaroittain lisääminen vähentää päätepisteen ylitystä ja tilavuusvirhettä.",
    "scoring": "3 p.",
    "hints": [
      "Päätepisteen lähellä ollaan herkällä alueella.",
      "Yksi pisara voi ratkaista."
    ],
    "skills": [
      "ke04.pro.indikaattori_ja_paatepiste",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Indikaattori ja päätepiste",
      "ke04.pro.indikaattori_ja_paatepiste"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-PRO-036",
    "contentId": "KE04-PRO-036",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Titrauslaskut: 1:1-reaktio",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "25,00 mL HCl-liuosta titrataan 0,1000 mol/L NaOH:lla. NaOH:ta kuluu 20,00 mL. Laske n(NaOH).",
    "options": [],
    "correctAnswer": null,
    "explanation": "n=cV=0,1000 mol/L × 0,02000 L = 0,002000 mol.",
    "scoring": "3 p: tilavuus litroiksi 1 p, n=cV 1 p, tulos 1 p.",
    "hints": [
      "20,00 mL = 0,02000 L.",
      "n=cV."
    ],
    "skills": [
      "ke04.pro.titrauslaskut_1_1_reaktio",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Titrauslaskut: 1:1-reaktio",
      "ke04.pro.titrauslaskut_1_1_reaktio"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-PRO-037",
    "contentId": "KE04-PRO-037",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Titrauslaskut: 1:1-reaktio",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "25,00 mL HCl-näytettä titrataan 0,1000 mol/L NaOH:lla ja NaOH:ta kuluu 20,00 mL. Kun HCl ja NaOH reagoivat suhteessa 1:1, mikä on n(HCl) näytteessä?",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,002000 mol HCl.",
    "scoring": "2 p: 1:1-suhde 1 p, tulos 1 p.",
    "hints": [
      "Ekvivalenttikohdassa ainemäärät ovat 1:1 tässä reaktiossa.",
      "Sama molimäärä."
    ],
    "skills": [
      "ke04.pro.titrauslaskut_1_1_reaktio",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Titrauslaskut: 1:1-reaktio",
      "ke04.pro.titrauslaskut_1_1_reaktio"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-PRO-038",
    "contentId": "KE04-PRO-038",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Titrauslaskut: 1:1-reaktio",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "25,00 mL HCl-näytteessä on 0,002000 mol HCl:ää. Laske liuoksen HCl-pitoisuus.",
    "options": [],
    "correctAnswer": null,
    "explanation": "c=n/V=0,002000 mol / 0,02500 L = 0,08000 mol/L.",
    "scoring": "4 p: V litroiksi 1 p, kaava 1 p, lasku 1 p, yksikkö 1 p.",
    "hints": [
      "25,00 mL=0,02500 L.",
      "c=n/V."
    ],
    "skills": [
      "ke04.pro.titrauslaskut_1_1_reaktio",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Titrauslaskut: 1:1-reaktio",
      "ke04.pro.titrauslaskut_1_1_reaktio"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-PRO-039",
    "contentId": "KE04-PRO-039",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Titrauslaskut: 1:1-reaktio",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "10,00 mL tuntematonta HCl:ää tarvitsee 15,00 mL 0,2000 mol/L NaOH:ta. Laske HCl-pitoisuus.",
    "options": [],
    "correctAnswer": null,
    "explanation": "n(NaOH)=0,2000×0,01500=0,003000 mol; n(HCl)=0,003000 mol; c=0,003000/0,01000=0,3000 mol/L.",
    "scoring": "5 p: titrantin n 2 p, 1:1 1 p, c 1 p, tulos/yksikkö 1 p.",
    "hints": [
      "Laske ensin NaOH:n moolit.",
      "Siirry reaktiosuhteen kautta HCl:ään."
    ],
    "skills": [
      "ke04.pro.titrauslaskut_1_1_reaktio",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Titrauslaskut: 1:1-reaktio",
      "ke04.pro.titrauslaskut_1_1_reaktio"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-PRO-040",
    "contentId": "KE04-PRO-040",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Titrauslaskut: 1:1-reaktio",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "10,00 mL HCl-näyte neutraloituu 15,00 mL:lla 0,2000 mol/L NaOH:ta. Opiskelija käyttää 15,00 mL suoraan kaavassa n=cV ilman muunnosta litroiksi ja päätyy täysin epärealistiseen pitoisuuteen. Korjaa yksikkövirhe ja laske oikea HCl-pitoisuus.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Tilavuus on muunnettava litroiksi: 15,00 mL = 0,01500 L. Oikea HCl-pitoisuus on 0,3000 mol/L.",
    "scoring": "4 p: mL→L 1 p, titrantin n 1 p, 1:1 1 p, oikea c 1 p.",
    "hints": [
      "Mol/L vaatii litroja.",
      "Virhetekijä on 1000."
    ],
    "skills": [
      "ke04.pro.titrauslaskut_1_1_reaktio",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Titrauslaskut: 1:1-reaktio",
      "ke04.pro.titrauslaskut_1_1_reaktio"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "titration.stoichiometric_ratio"
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
    "seedKey": "ke04-v3:KE04-PRO-041",
    "contentId": "KE04-PRO-041",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Titrauslaskut: muu stoikiometrinen suhde",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "20,00 mL H₂SO₄-liuosta titrataan 0,1000 mol/L NaOH:lla. NaOH:ta kuluu 30,00 mL. Laske n(NaOH).",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,1000×0,03000 = 0,003000 mol.",
    "scoring": "3 p.",
    "hints": [
      "Muunna mL litroiksi.",
      "n=cV."
    ],
    "skills": [
      "ke04.pro.titrauslaskut_muu_stoikiometrinen_suhde",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Titrauslaskut: muu stoikiometrinen suhde",
      "ke04.pro.titrauslaskut_muu_stoikiometrinen_suhde"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-PRO-042",
    "contentId": "KE04-PRO-042",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Titrauslaskut: muu stoikiometrinen suhde",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "Reaktio on H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O. Jos n(NaOH)=0,003000 mol, mikä on n(H₂SO₄)?",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,001500 mol.",
    "scoring": "3 p: suhde 2:1 1 p, jako kahdella 1 p, tulos 1 p.",
    "hints": [
      "Kaksi NaOH per yksi H₂SO₄.",
      "n(happo)=n(emäs)/2."
    ],
    "skills": [
      "ke04.pro.titrauslaskut_muu_stoikiometrinen_suhde",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Titrauslaskut: muu stoikiometrinen suhde",
      "ke04.pro.titrauslaskut_muu_stoikiometrinen_suhde"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-PRO-043",
    "contentId": "KE04-PRO-043",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Titrauslaskut: muu stoikiometrinen suhde",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "20,00 mL H₂SO₄-liuosta sisältää 0,001500 mol H₂SO₄:ää. Laske liuoksen pitoisuus.",
    "options": [],
    "correctAnswer": null,
    "explanation": "c=0,001500/0,02000=0,07500 mol/L.",
    "scoring": "4 p.",
    "hints": [
      "20,00 mL=0,02000 L.",
      "c=n/V."
    ],
    "skills": [
      "ke04.pro.titrauslaskut_muu_stoikiometrinen_suhde",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Titrauslaskut: muu stoikiometrinen suhde",
      "ke04.pro.titrauslaskut_muu_stoikiometrinen_suhde"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-PRO-044",
    "contentId": "KE04-PRO-044",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Titrauslaskut: muu stoikiometrinen suhde",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija käyttää titrauksessa aina kaavaa c₁V₁=c₂V₂. Miksi se ei yleisesti riitä?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kaava sellaisenaan pätee vain 1:1-stoikiometriaan. Muissa reaktioissa on huomioitava tasapainotetun reaktioyhtälön kertoimet eli ainemääräsuhde.",
    "scoring": "4 p: 1:1-rajaus 2 p, reaktiokertoimet 2 p.",
    "hints": [
      "Vertaa HCl/NaOH ja H₂SO₄/NaOH.",
      "Ainemäärät eivät aina ole yhtä suuret."
    ],
    "skills": [
      "ke04.pro.titrauslaskut_muu_stoikiometrinen_suhde",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Titrauslaskut: muu stoikiometrinen suhde",
      "ke04.pro.titrauslaskut_muu_stoikiometrinen_suhde"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "pro.common_misconception"
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
    "seedKey": "ke04-v3:KE04-PRO-045",
    "contentId": "KE04-PRO-045",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Titrauslaskut: muu stoikiometrinen suhde",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "25,00 mL H₂SO₄-liuosta neutraloituu 40,00 mL:lla 0,1500 mol/L NaOH:ta. Laske c(H₂SO₄).",
    "options": [],
    "correctAnswer": null,
    "explanation": "n(NaOH)=0,1500×0,04000=0,006000 mol; n(H₂SO₄)=0,003000 mol; c=0,003000/0,02500=0,1200 mol/L.",
    "scoring": "6 p: n(NaOH) 2 p, suhde 2:1 1 p, n(H₂SO₄) 1 p, c-kaava 1 p, tulos 1 p.",
    "hints": [
      "Laske titrantin moolit.",
      "Jaa kahdella.",
      "Jaa näytteen litroilla."
    ],
    "skills": [
      "ke04.pro.titrauslaskut_muu_stoikiometrinen_suhde",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Titrauslaskut: muu stoikiometrinen suhde",
      "ke04.pro.titrauslaskut_muu_stoikiometrinen_suhde"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-PRO-046",
    "contentId": "KE04-PRO-046",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Integroivat protoninsiirto- ja titraustehtävät",
    "questionType": "matching",
    "difficulty": 2,
    "prompt": "Yhdistä käsite ja määritelmä: happo, emäs, ekvivalenttikohta, päätepiste ↔ H⁺-luovuttaja; H⁺-vastaanottaja; stoikiometrisesti oikea kohta; havaittu lopetuskohta.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Happo→H⁺-luovuttaja; emäs→H⁺-vastaanottaja; ekvivalenttikohta→stoikiometrinen kohta; päätepiste→havaittu lopetuskohta.",
    "scoring": "4 p.",
    "hints": [
      "Erota kemiallinen kohta ja havainto.",
      "Brønsted-määritelmät."
    ],
    "skills": [
      "ke04.pro.integroivat_protoninsiirto_ja_titraustehtavat",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Integroivat protoninsiirto- ja titraustehtävät",
      "ke04.pro.integroivat_protoninsiirto_ja_titraustehtavat"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
    ],
    "estimatedSeconds": 133,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "Happo",
        "right": "H⁺-luovuttaja"
      },
      {
        "left": "emäs",
        "right": "H⁺-vastaanottaja"
      },
      {
        "left": "ekvivalenttikohta",
        "right": "stoikiometrinen kohta"
      },
      {
        "left": "päätepiste",
        "right": "havaittu lopetuskohta."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-PRO-047",
    "contentId": "KE04-PRO-047",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Integroivat protoninsiirto- ja titraustehtävät",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi tasapainotettu reaktioyhtälö on titrauslaskun tärkein lähtökohta?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Se kertoo, missä ainemääräsuhteessa titrantti ja analyytin aine reagoivat. Ilman kerroinsuhdetta mitattua titrantin ainemäärää ei voida muuntaa luotettavasti analyytin ainemääräksi.",
    "scoring": "3 p.",
    "hints": [
      "Tilavuus kertoo titrantin määrän.",
      "Yhtälö kertoo, kuinka se liittyy analyytin määrään."
    ],
    "skills": [
      "ke04.pro.integroivat_protoninsiirto_ja_titraustehtavat",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Integroivat protoninsiirto- ja titraustehtävät",
      "ke04.pro.integroivat_protoninsiirto_ja_titraustehtavat"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-PRO-048",
    "contentId": "KE04-PRO-048",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Integroivat protoninsiirto- ja titraustehtävät",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Väite: 'Titrauksessa mitataan suoraan tuntemattoman liuoksen pitoisuus byretistä.' Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Byretistä mitataan titrantin käytetty tilavuus. Titrantin tunnetusta pitoisuudesta lasketaan sen ainemäärä, reaktiosuhteella analyytin ainemäärä ja lopuksi analyytin pitoisuus.",
    "scoring": "4 p: tilavuus 1 p, n(titrantti) 1 p, reaktiosuhde 1 p, c(analyytin) 1 p.",
    "hints": [
      "Byretti näyttää mL.",
      "Pitoisuus saadaan laskemalla."
    ],
    "skills": [
      "ke04.pro.integroivat_protoninsiirto_ja_titraustehtavat",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Integroivat protoninsiirto- ja titraustehtävät",
      "ke04.pro.integroivat_protoninsiirto_ja_titraustehtavat"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "pro.common_misconception"
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
    "seedKey": "ke04-v3:KE04-PRO-049",
    "contentId": "KE04-PRO-049",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Integroivat protoninsiirto- ja titraustehtävät",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Tuntemattoman yksiarvoisen hapon 25,00 mL näyte neutraloituu 25,00 mL:lla 0,1200 mol/L vahvaa yksiarvoista emästä. Oleta 1:1-reaktio. Mikä hapon pitoisuus?",
    "options": [],
    "correctAnswer": null,
    "explanation": "0,1200 mol/L. Samat tilavuudet ja 1:1-suhde tarkoittavat samoja pitoisuuksia tässä tapauksessa.",
    "scoring": "4 p: titrantin n 1 p, 1:1 1 p, c-lasku 1 p, tulos 1 p.",
    "hints": [
      "n=cV.",
      "Tilavuudet ovat samat ja molisuhde 1:1",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "ke04.pro.integroivat_protoninsiirto_ja_titraustehtavat",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Integroivat protoninsiirto- ja titraustehtävät",
      "ke04.pro.integroivat_protoninsiirto_ja_titraustehtavat"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
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
    "seedKey": "ke04-v3:KE04-PRO-050",
    "contentId": "KE04-PRO-050",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "Integroivat protoninsiirto- ja titraustehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "15,00 mL tuntematonta H₂SO₄-liuosta titrataan 0,2000 mol/L NaOH:lla. Päätepisteeseen kuluu 18,60 mL. Laske H₂SO₄:n pitoisuus ja nimeä laskun kolme päävaihetta.",
    "options": [],
    "correctAnswer": null,
    "explanation": "n(NaOH)=0,2000×0,01860=0,003720 mol; n(H₂SO₄)=0,003720/2=0,001860 mol; c=0,001860/0,01500=0,1240 mol/L. Vaiheet: titrantin ainemäärä, stoikiometrinen muunnos, analyytin pitoisuus.",
    "scoring": "7 p: n(NaOH) 2 p, suhde 2:1 1 p, n(H₂SO₄) 1 p, c 2 p, vaiheiden kuvaus 1 p.",
    "hints": [
      "Muunna 18,60 mL litroiksi.",
      "H₂SO₄:NaOH=1:2.",
      "Jaa happomoolit 0,01500 L:lla."
    ],
    "skills": [
      "ke04.pro.integroivat_protoninsiirto_ja_titraustehtavat",
      "task.integroiva_titraus"
    ],
    "expectedConcepts": [
      "Integroivat protoninsiirto- ja titraustehtävät",
      "ke04.pro.integroivat_protoninsiirto_ja_titraustehtavat"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 7,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Integroiva titraus"
  },
  {
    "seedKey": "ke04-v3:KE04-PRO-X01",
    "contentId": "KE04-PRO-X01",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "25,00 mL HCl-näytettä titrataan 0,1000 mol/L NaOH:lla. Byretin lukemat: alku 1,24 mL, loppu 23,86 mL. a) Laske kulunut NaOH-tilavuus. b) Laske HCl-pitoisuus olettaen 1:1-neutraloituminen.",
    "options": [],
    "correctAnswer": null,
    "explanation": "V(NaOH)=22,62 mL=0,02262 L. n=0,1000×0,02262=0,002262 mol. n(HCl)=sama. c=0,002262/0,02500=0,09048 mol/L.",
    "scoring": "8 p: tilavuusero 2 p; mL→L 1 p; n 2 p; 1:1 1 p; c 2 p.",
    "hints": [
      "Byretin kulutus=loppu−alku.",
      "n=cV.",
      "1:1 siirtää moolit hapolle."
    ],
    "skills": [
      "titration.burette_reading",
      "stoichiometry",
      "concentration"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "titration.burette_reading",
      "stoichiometry",
      "concentration"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
    ],
    "estimatedSeconds": 309,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 8,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Titrausaineisto"
  },
  {
    "seedKey": "ke04-v3:KE04-PRO-X02",
    "contentId": "KE04-PRO-X02",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "short_answer",
    "difficulty": 4,
    "prompt": "Titrauksen kulutukset ovat 24,10 mL (karkea), 23,62 mL, 23,58 mL ja 23,60 mL. Mitkä tulokset käyttäisit lopulliseen laskuun ja miksi?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Käyttäisin yhtäpitäviä tarkkoja titrauksia 23,62; 23,58; 23,60 mL ja niiden keskiarvoa 23,60 mL. Karkea 24,10 mL on selvästi poikkeava/harjoitusmittaus.",
    "scoring": "5 p: oikeat kolme 2 p; keskiarvo 1 p; perustelu yhtäpitävyydellä 2 p.",
    "hints": [
      "Etsi keskenään lähellä olevat tulokset.",
      "Karkea titraus ei yleensä kuulu lopulliseen keskiarvoon",
      "Kirjoita välivaiheet näkyviin ja tarkista lopuksi yksiköt sekä tuloksen suuruusluokka.."
    ],
    "skills": [
      "experimental.replicates",
      "titration.quality_control"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "experimental.replicates",
      "titration.quality_control"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
    ],
    "estimatedSeconds": 154,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 5,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Toistomittausten arviointi"
  },
  {
    "seedKey": "ke04-v3:KE04-PRO-X03",
    "contentId": "KE04-PRO-X03",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "multiple_choice",
    "difficulty": 4,
    "prompt": "Miksi kaava c₁V₁=c₂V₂ ei päde sellaisenaan titraukseen H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O?",
    "options": [
      "Tilavuuksia ei saa käyttää kemiassa",
      "Reaktiosuhde ei ole 1:1",
      "H₂SO₄ ei ole happo",
      "NaOH ei liukene veteen."
    ],
    "correctAnswer": "Reaktiosuhde ei ole 1:1",
    "explanation": "B. H₂SO₄:NaOH=1:2, joten ainemäärät eivät ekvivalenttikohdassa ole yhtä suuret.",
    "scoring": "3 p: B 1 p; suhde 1:2 1 p; ainemääräperustelu 1 p.",
    "hints": [
      "Katso reaktiokertoimia.",
      "Yksi happomooli tarvitsee kaksi NaOH-moolia",
      "Sulje pois vaihtoehdot vertaamalla jokaista niistä reaktioyhtälöön, rakenteeseen tai määritelmään.."
    ],
    "skills": [
      "titration.stoichiometry",
      "coefficient_ratio"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "titration.stoichiometry",
      "coefficient_ratio"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "blind_cV_equality"
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
    "seedKey": "ke04-v3:KE04-PRO-X04",
    "contentId": "KE04-PRO-X04",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "short_answer",
    "difficulty": 4,
    "prompt": "Indikaattorin värinmuutos ylitetään ja NaOH:ta lisätään 0,30 mL liikaa. Jos NaOH:n pitoisuus on 0,100 mol/L ja näyte on HCl 1:1-suhteessa, kuinka suuri ylimääräinen ainemäärä NaOH:ta tämä vastaa? Mihin suuntaan laskettu HCl-määrä vääristyy?",
    "options": [],
    "correctAnswer": null,
    "explanation": "n=0,100×0,00030=3,0×10⁻⁵ mol ylimääräistä NaOH:ta. HCl:n laskettu ainemäärä/pitoisuus tulee liian suureksi.",
    "scoring": "5 p: V-muunnos 1 p; n 2 p; suunta 2 p.",
    "hints": [
      "0,30 mL=0,00030 L.",
      "Liian suuri titrantin määrä tulkitaan liian suureksi analyytin määräksi",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "titration.endpoint_error",
      "error_direction"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "titration.endpoint_error",
      "error_direction"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
    ],
    "estimatedSeconds": 154,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 5,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Päätepisteen virhe"
  },
  {
    "seedKey": "ke04-v3:KE04-PRO-X05",
    "contentId": "KE04-PRO-X05",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "short_answer",
    "difficulty": 5,
    "prompt": "Reaktiossa NH₃ + H₂O ⇌ NH₄⁺ + OH⁻ merkitse happo, emäs, vastinhappo ja vastinemäs ja perustele yhden protonin siirtymisellä.",
    "options": [],
    "correctAnswer": null,
    "explanation": "NH₃ on emäs (ottaa H⁺), H₂O happo (luovuttaa H⁺), NH₄⁺ on NH₃:n vastinhappo ja OH⁻ H₂O:n vastinemäs.",
    "scoring": "8 p: neljä roolia 4 p; kaksi protoniperustelua 4 p.",
    "hints": [
      "Seuraa H⁺:aa H₂O:lta NH₃:lle.",
      "Vastinpari eroaa yhdellä protonilla",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "acid_base.conjugate_pairs",
      "proton_transfer"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "acid_base.conjugate_pairs",
      "proton_transfer"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
    ],
    "estimatedSeconds": 173,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 8,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Protoninsiirtodiagnostiikka"
  },
  {
    "seedKey": "ke04-v3:KE04-PRO-X06",
    "contentId": "KE04-PRO-X06",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "application",
    "difficulty": 5,
    "prompt": "Miksi titrauksessa analysoitava liuos huuhdellaan pipetillä näyteliuoksella, mutta byretti titrantilla ennen mittausta? Selitä laimennusvirheen kannalta.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Jäljellä oleva huuhteluvesi laimentaisi mitattavaa liuosta. Pipetti huuhdellaan näytteellä, jotta siirretyn näytteen pitoisuus ei muutu; byretti titrantilla, jotta titrantin pitoisuus ei laimene. Pieni tislatun veden määrä titrausastiassa ei muuta näytteen ainemäärää.",
    "scoring": "8 p: pipetti 3 p; byretti 3 p; tislatun veden erottelu 2 p.",
    "hints": [
      "Kysy missä pitoisuuden pitää säilyä tarkasti.",
      "Erottele ainemäärä ja tilavuus",
      "Nimeä ensin väärä kemiallinen periaate ja vasta sitten sen vaikutus lopputulokseen.."
    ],
    "skills": [
      "titration.technique",
      "experimental_error"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "titration.technique",
      "experimental_error"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
    ],
    "estimatedSeconds": 347,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 8,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Kokeellinen suunnittelu"
  },
  {
    "seedKey": "ke04-v3:KE04-PRO-X07",
    "contentId": "KE04-PRO-X07",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "20,00 mL H₂SO₄-liuosta titrataan 0,1250 mol/L NaOH:lla. Yhtäpitävät kulutukset ovat 31,84; 31,90 ja 31,86 mL. a) Laske keskiarvo. b) Laske n(NaOH). c) Reaktio H₂SO₄+2NaOH→Na₂SO₄+2H₂O: laske n(H₂SO₄). d) Laske c(H₂SO₄).",
    "options": [],
    "correctAnswer": null,
    "explanation": "Keskiarvo 31,87 mL. n(NaOH)=0,1250×0,03187=0,003984 mol. n(H₂SO₄)=0,001992 mol. c=0,001992/0,02000=0,0996 mol/L.",
    "scoring": "12 p: keskiarvo 2 p; n(NaOH) 3 p; suhde 2:1 2 p; n(happo) 1 p; c 4 p.",
    "hints": [
      "Keskiarvo ennen laskua.",
      "n=cV.",
      "Jaa NaOH-molit kahdella.",
      "c=n/V."
    ],
    "skills": [
      "titration.data",
      "stoichiometry",
      "concentration"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "titration.data",
      "stoichiometry",
      "concentration"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 12,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Koereservi – titraus"
  },
  {
    "seedKey": "ke04-v3:KE04-PRO-X08",
    "contentId": "KE04-PRO-X08",
    "chapter": 7,
    "topicName": "Protoninsiirto, neutraloituminen ja titraus",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "Kaksi opiskelijaa titraa saman HCl-näytteen. A lopettaa ensimmäiseen hetkelliseen värähdykseen, joka katoaa sekoitettaessa; B jatkaa, kunnes hyvin vaalea väri jää pysyväksi noin 30 sekunniksi. Kumman päätepiste on parempi ja miksi? Miten A:n liian pieni titranttitilavuus vaikuttaisi laskettuun HCl-pitoisuuteen?",
    "options": [],
    "correctAnswer": null,
    "explanation": "B:n tulkinta on parempi, koska pysyvä heikko värimuutos osoittaa päätepisteen saavutetuksi paremmin kuin hetkellinen paikallinen väri. A:n liian pieni titranttitilavuus antaa liian pienen titrantin ainemäärän ja siten liian pienen lasketun HCl-pitoisuuden.",
    "scoring": "8 p: B 2 p; sekoitus/pysyvyysperustelu 2 p; tilavuus liian pieni 1 p; n liian pieni 1 p; c liian pieni 2 p.",
    "hints": [
      "Hetkellinen väri voi johtua paikallisesta titranttiylimäärästä.",
      "Pienempi V tarkoittaa pienempää n=cV",
      "Nimeä ensin väärä kemiallinen periaate ja vasta sitten sen vaikutus lopputulokseen.."
    ],
    "skills": [
      "titration.endpoint",
      "experimental_judgment",
      "error_direction"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "titration.endpoint",
      "experimental_judgment",
      "error_direction"
    ],
    "prerequisites": [
      "acid_base",
      "stoichiometry",
      "concentration"
    ],
    "commonErrors": [
      "acid_base_ratio",
      "titration_unit_conversion"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 8,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Koereservi – analyysi"
  }
];
