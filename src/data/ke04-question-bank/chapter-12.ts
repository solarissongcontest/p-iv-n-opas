import type { Ke04SeedQuestion } from "./types";

export const questions: Ke04SeedQuestion[] = [
  {
    "seedKey": "ke04-v3:KE04-KON-001",
    "contentId": "KE04-KON-001",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Kondensaation perusidea",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitä kondensaatioreaktiolla tarkoitetaan orgaanisessa kemiassa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kaksi molekyyliä tai rakenneyksikköä liittyy kovalenttisella sidoksella ja samalla lohkeaa pieni molekyyli, usein vesi.",
    "scoring": "2 p: liittyminen 1 p, pieni molekyyli 1 p.",
    "hints": [
      "Ajattele rakentavaa reaktiota.",
      "Usein poistuu H₂O."
    ],
    "skills": [
      "ke04.kon.kondensaation_perusidea",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Kondensaation perusidea",
      "ke04.kon.kondensaation_perusidea"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
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
    "seedKey": "ke04-v3:KE04-KON-002",
    "contentId": "KE04-KON-002",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Kondensaation perusidea",
    "questionType": "multiple_choice",
    "difficulty": 1,
    "prompt": "Mikä on monissa KE04:n kondensaatioreaktioissa tyypillinen pieni sivutuote?",
    "options": [
      "H₂O",
      "H₂",
      "CO₂",
      "pientä sivutuotetta ei muodostu koskaan"
    ],
    "correctAnswer": "H₂O",
    "explanation": "A, H₂O.",
    "scoring": "1 p.",
    "hints": [
      "Useissa KE04-esimerkeissä H ja OH yhdistyvät.",
      "Kondensaatio ≠ palaminen."
    ],
    "skills": [
      "ke04.kon.kondensaation_perusidea",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Kondensaation perusidea",
      "ke04.kon.kondensaation_perusidea"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation.water_and_bond"
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
    "seedKey": "ke04-v3:KE04-KON-003",
    "contentId": "KE04-KON-003",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Kondensaation perusidea",
    "questionType": "matching",
    "difficulty": 2,
    "prompt": "Yhdistä: kondensaatio, hydrolyysi ↔ sidos muodostuu ja vettä vapautuu; sidos katkeaa veden avulla.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kondensaatio → sidos muodostuu ja vettä vapautuu; hydrolyysi → sidos katkeaa veden avulla.",
    "scoring": "2 p.",
    "hints": [
      "Toinen rakentaa, toinen hajottaa.",
      "Seuraa veden suuntaa."
    ],
    "skills": [
      "ke04.kon.kondensaation_perusidea",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Kondensaation perusidea",
      "ke04.kon.kondensaation_perusidea"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
    ],
    "estimatedSeconds": 133,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "Kondensaatio",
        "right": "sidos muodostuu ja vettä vapautuu"
      },
      {
        "left": "hydrolyysi",
        "right": "sidos katkeaa veden avulla."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-KON-004",
    "contentId": "KE04-KON-004",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Kondensaation perusidea",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi kondensaation voidaan sanoa olevan hydrolyysin vastareaktio yleisellä tasolla?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kondensaatiossa pienemmät yksiköt liittyvät ja vettä syntyy, kun taas hydrolyysissä vettä käytetään syntyneen sidoksen katkaisuun ja yksiköt erkanevat.",
    "scoring": "4 p: kondensaation liittyminen 1 p, veden synty 1 p, hydrolyysin veden käyttö 1 p, sidoksen katkeaminen 1 p.",
    "hints": [
      "Piirrä kaksisuuntainen kaavio.",
      "Seuraa sekä sidosta että vettä."
    ],
    "skills": [
      "ke04.kon.kondensaation_perusidea",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Kondensaation perusidea",
      "ke04.kon.kondensaation_perusidea"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
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
    "seedKey": "ke04-v3:KE04-KON-005",
    "contentId": "KE04-KON-005",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Kondensaation perusidea",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Väite: 'Kondensaatiossa vain vesi tiivistyy nesteeksi, eikä kemiallisia sidoksia muutu.' Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kemian kondensaatioreaktiossa kyse on uuden kovalenttisen sidoksen muodostumisesta kahden rakenneyksikön välille ja pienen molekyylin, usein veden, lohkeamisesta; se ei tarkoita pelkkää olomuodon muutosta.",
    "scoring": "3 p: uusi sidos 1 p, pieni molekyyli 1 p, erottaminen olomuodon muutoksesta 1 p.",
    "hints": [
      "Sama sana voi tarkoittaa eri asiaa fysiikassa ja orgaanisessa kemiassa.",
      "Etsi uusi sidos."
    ],
    "skills": [
      "ke04.kon.kondensaation_perusidea",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Kondensaation perusidea",
      "ke04.kon.kondensaation_perusidea"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation.water_and_bond"
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
    "seedKey": "ke04-v3:KE04-KON-006",
    "contentId": "KE04-KON-006",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Esteröityminen kondensaationa",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitkä kaksi funktionaalista ryhmää reagoivat tavallisessa esteröitymisessä?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Karboksyyliryhmä –COOH ja hydroksyyliryhmä –OH.",
    "scoring": "2 p, 1 p / ryhmä.",
    "hints": [
      "Esteri syntyy karboksyylihaposta ja alkoholista.",
      "Etsi COOH ja OH."
    ],
    "skills": [
      "ke04.kon.esteroityminen_kondensaationa",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Esteröityminen kondensaationa",
      "ke04.kon.esteroityminen_kondensaationa"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
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
    "seedKey": "ke04-v3:KE04-KON-007",
    "contentId": "KE04-KON-007",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Esteröityminen kondensaationa",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Etanoli + etaanihappo kondensoituvat. Mikä orgaaninen tuote syntyy?",
    "options": [
      "etyylietanaatti",
      "etaani",
      "eteeni",
      "metanoli"
    ],
    "correctAnswer": "etyylietanaatti",
    "explanation": "A, etyylietanaatti.",
    "scoring": "1 p.",
    "hints": [
      "Alkoholi antaa etyyliosan.",
      "Happo antaa etanaattiosan."
    ],
    "skills": [
      "ke04.kon.esteroityminen_kondensaationa",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Esteröityminen kondensaationa",
      "ke04.kon.esteroityminen_kondensaationa"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation.water_and_bond"
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
    "seedKey": "ke04-v3:KE04-KON-008",
    "contentId": "KE04-KON-008",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Esteröityminen kondensaationa",
    "questionType": "short_answer",
    "difficulty": 3,
    "prompt": "Kirjoita etanolin ja etaanihapon esteröitymisreaktio sanallisesti tai kaavana.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Etanoli + etaanihappo → etyylietanaatti + H₂O; CH₃CH₂OH + CH₃COOH → CH₃COOCH₂CH₃ + H₂O.",
    "scoring": "4 p: lähtöaineet 1 p, esteri 1 p, oikea rakenne/nimi 1 p, H₂O 1 p.",
    "hints": [
      "Alkoholi + karboksyylihappo.",
      "Poista H ja OH vedeksi."
    ],
    "skills": [
      "ke04.kon.esteroityminen_kondensaationa",
      "task.reaktio"
    ],
    "expectedConcepts": [
      "Esteröityminen kondensaationa",
      "ke04.kon.esteroityminen_kondensaationa"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
    ],
    "estimatedSeconds": 135,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Reaktio"
  },
  {
    "seedKey": "ke04-v3:KE04-KON-009",
    "contentId": "KE04-KON-009",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Esteröityminen kondensaationa",
    "questionType": "short_answer",
    "difficulty": 3,
    "prompt": "Mikä esteri syntyy propan-1-olista ja metaanihaposta?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Propyylimetanaatti.",
    "scoring": "2 p: propyyli 1 p, metanaatti 1 p.",
    "hints": [
      "Esterin alkuosa tulee alkoholista.",
      "Loppuosa haposta."
    ],
    "skills": [
      "ke04.kon.esteroityminen_kondensaationa",
      "task.nimeaminen"
    ],
    "expectedConcepts": [
      "Esteröityminen kondensaationa",
      "ke04.kon.esteroityminen_kondensaationa"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
    ],
    "estimatedSeconds": 135,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Nimeäminen"
  },
  {
    "seedKey": "ke04-v3:KE04-KON-010",
    "contentId": "KE04-KON-010",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Esteröityminen kondensaationa",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija nimeää metanolin ja propaanihapon kondensaatiotuotteen propyylimetanaatiksi. Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Tuote on metyylipropanaatti: metanoli antaa metyyliosan ja propaanihappo propanaattiosan.",
    "scoring": "3 p: metyyli 1 p, propanaatti 1 p, oikea nimi 1 p.",
    "hints": [
      "Tarkista kumpi lähtöaine antaa kummankin nimiosan.",
      "Alkoholi ensin."
    ],
    "skills": [
      "ke04.kon.esteroityminen_kondensaationa",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Esteröityminen kondensaationa",
      "ke04.kon.esteroityminen_kondensaationa"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation.water_and_bond"
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
    "seedKey": "ke04-v3:KE04-KON-011",
    "contentId": "KE04-KON-011",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Amidisidos ja peptidin muodostuminen",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitkä funktionaaliset ryhmät reagoivat peptidisidoksen muodostuessa aminohappojen välillä?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Toisen aminohapon karboksyyliryhmä ja toisen aminoryhmä.",
    "scoring": "2 p.",
    "hints": [
      "Aminohapossa on kaksi keskeistä ryhmää.",
      "Etsi COOH ja NH₂."
    ],
    "skills": [
      "ke04.kon.amidisidos_ja_peptidin_muodostuminen",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Amidisidos ja peptidin muodostuminen",
      "ke04.kon.amidisidos_ja_peptidin_muodostuminen"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
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
    "seedKey": "ke04-v3:KE04-KON-012",
    "contentId": "KE04-KON-012",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Amidisidos ja peptidin muodostuminen",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Kahden aminohapon kondensaatiossa syntyy",
    "options": [
      "dipeptidi + H₂O",
      "triglyseridi",
      "disakkaridi",
      "alkani"
    ],
    "correctAnswer": "dipeptidi + H₂O",
    "explanation": "A.",
    "scoring": "1 p.",
    "hints": [
      "Kaksi aminohappoa → dipeptidi.",
      "Kondensaatiossa vettä vapautuu."
    ],
    "skills": [
      "ke04.kon.amidisidos_ja_peptidin_muodostuminen",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Amidisidos ja peptidin muodostuminen",
      "ke04.kon.amidisidos_ja_peptidin_muodostuminen"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation.water_and_bond",
      "condensation.amide_bond"
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
    "seedKey": "ke04-v3:KE04-KON-013",
    "contentId": "KE04-KON-013",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Amidisidos ja peptidin muodostuminen",
    "questionType": "application",
    "difficulty": 2,
    "prompt": "Kuinka monta vesimolekyyliä vapautuu, kun neljä aminohappoa liittyy suoraksi tetrapeptidiksi?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kolme H₂O-molekyyliä, koska muodostuu kolme peptidisidosta.",
    "scoring": "2 p: 3 H₂O 1 p, kolme sidosta 1 p.",
    "hints": [
      "Sidoksia on n−1.",
      "Yksi peptidisidos → yksi H₂O."
    ],
    "skills": [
      "ke04.kon.amidisidos_ja_peptidin_muodostuminen",
      "task.laskennallinen_paattely"
    ],
    "expectedConcepts": [
      "Amidisidos ja peptidin muodostuminen",
      "ke04.kon.amidisidos_ja_peptidin_muodostuminen"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
    ],
    "estimatedSeconds": 233,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Laskennallinen päättely"
  },
  {
    "seedKey": "ke04-v3:KE04-KON-014",
    "contentId": "KE04-KON-014",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Amidisidos ja peptidin muodostuminen",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi peptidisidosta voidaan kutsua amidisidokseksi?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Sidoksessa on amidille tunnusomainen rakenne –CO–NH–, joka syntyy karboksyyli- ja aminoryhmän kondensaatiosta.",
    "scoring": "3 p: –CONH– 1 p, ryhmät 1 p, kondensaatio 1 p.",
    "hints": [
      "Katso peptidisidoksen atomijärjestystä.",
      "Vertaa amidiryhmään."
    ],
    "skills": [
      "ke04.kon.amidisidos_ja_peptidin_muodostuminen",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Amidisidos ja peptidin muodostuminen",
      "ke04.kon.amidisidos_ja_peptidin_muodostuminen"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
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
    "seedKey": "ke04-v3:KE04-KON-015",
    "contentId": "KE04-KON-015",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Amidisidos ja peptidin muodostuminen",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Kuusi aminohappoa liittyy yhdeksi suoraksi peptidiksi. Kuinka monta peptidisidosta syntyy ja kuinka monta H₂O-molekyyliä vapautuu?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Viisi peptidisidosta ja viisi H₂O-molekyyliä.",
    "scoring": "3 p: 5 sidosta 1 p, 5 H₂O 1 p, n−1-perustelu 1 p.",
    "hints": [
      "Piirrä kuusi yksikköä jonoon.",
      "Liitoksia on yksi vähemmän kuin yksiköitä."
    ],
    "skills": [
      "ke04.kon.amidisidos_ja_peptidin_muodostuminen",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Amidisidos ja peptidin muodostuminen",
      "ke04.kon.amidisidos_ja_peptidin_muodostuminen"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
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
    "seedKey": "ke04-v3:KE04-KON-016",
    "contentId": "KE04-KON-016",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Hiilihydraattien kondensaatio",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitä syntyy, kun kaksi monosakkaridia liittyy kondensaatiolla?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Disakkaridi ja vettä.",
    "scoring": "2 p.",
    "hints": [
      "Kaksi mono-yksikköä → di.",
      "Kondensaatiossa vapautuu pieni molekyyli."
    ],
    "skills": [
      "ke04.kon.hiilihydraattien_kondensaatio",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Hiilihydraattien kondensaatio",
      "ke04.kon.hiilihydraattien_kondensaatio"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
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
    "seedKey": "ke04-v3:KE04-KON-017",
    "contentId": "KE04-KON-017",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Hiilihydraattien kondensaatio",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Mikä sidos yhdistää monosakkaridiyksiköitä monissa hiilihydraateissa?",
    "options": [
      "glykosidisidos",
      "peptidisidos",
      "esterisidos",
      "amidisidos"
    ],
    "correctAnswer": "glykosidisidos",
    "explanation": "A.",
    "scoring": "1 p.",
    "hints": [
      "Sidosnimessä on yhteys sokereihin.",
      "Ei peptidi."
    ],
    "skills": [
      "ke04.kon.hiilihydraattien_kondensaatio",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Hiilihydraattien kondensaatio",
      "ke04.kon.hiilihydraattien_kondensaatio"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation.water_and_bond",
      "condensation.amide_bond",
      "condensation.glycosidic_bond"
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
    "seedKey": "ke04-v3:KE04-KON-018",
    "contentId": "KE04-KON-018",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Hiilihydraattien kondensaatio",
    "questionType": "application",
    "difficulty": 2,
    "prompt": "Viisi monosakkaridiyksikköä yhdistyy suoraksi oligosakkaridiksi. Montako H₂O-molekyyliä vapautuu?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Neljä H₂O-molekyyliä.",
    "scoring": "2 p.",
    "hints": [
      "n−1 sidosta.",
      "Viisi yksikköä → neljä liitosta."
    ],
    "skills": [
      "ke04.kon.hiilihydraattien_kondensaatio",
      "task.laskennallinen_paattely"
    ],
    "expectedConcepts": [
      "Hiilihydraattien kondensaatio",
      "ke04.kon.hiilihydraattien_kondensaatio"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
    ],
    "estimatedSeconds": 233,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Laskennallinen päättely"
  },
  {
    "seedKey": "ke04-v3:KE04-KON-019",
    "contentId": "KE04-KON-019",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Hiilihydraattien kondensaatio",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miten polysakkaridin muodostuminen ja hydrolyysi liittyvät toisiinsa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Polysakkaridin muodostumisessa monosakkaridit liittyvät glykosidisidoksin kondensaatiolla ja vettä vapautuu. Hydrolyysi käyttää vettä näiden sidosten katkaisemiseen.",
    "scoring": "4 p.",
    "hints": [
      "Seuraa glykosidisidosta.",
      "Veden suunta vaihtuu."
    ],
    "skills": [
      "ke04.kon.hiilihydraattien_kondensaatio",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Hiilihydraattien kondensaatio",
      "ke04.kon.hiilihydraattien_kondensaatio"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
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
    "seedKey": "ke04-v3:KE04-KON-020",
    "contentId": "KE04-KON-020",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Hiilihydraattien kondensaatio",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Väite: 'Kun 100 monosakkaridia liittyy suoraksi ketjuksi, muodostuu 100 vesimolekyyliä.' Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Suorassa ketjussa muodostuu 99 sidosta ja siten 99 vesimolekyyliä, koska n yksikön yhdistämiseen tarvitaan n−1 liitosta.",
    "scoring": "3 p: 99 sidosta 1 p, 99 H₂O 1 p, n−1 1 p.",
    "hints": [
      "Kokeile ensin kolmella yksiköllä.",
      "Montako liitosta tarvitaan?"
    ],
    "skills": [
      "ke04.kon.hiilihydraattien_kondensaatio",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Hiilihydraattien kondensaatio",
      "ke04.kon.hiilihydraattien_kondensaatio"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation.water_and_bond",
      "condensation.glycosidic_bond"
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
    "seedKey": "ke04-v3:KE04-KON-021",
    "contentId": "KE04-KON-021",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Rasvojen muodostuminen",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitkä lähtöaineet muodostavat triglyseridin kondensaatioreaktiossa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Glyseroli ja kolme rasvahappoa.",
    "scoring": "2 p.",
    "hints": [
      "Triglyseridissä on kolme rasvahappotähdettä.",
      "Alkoholiosa on glyseroli."
    ],
    "skills": [
      "ke04.kon.rasvojen_muodostuminen",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Rasvojen muodostuminen",
      "ke04.kon.rasvojen_muodostuminen"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
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
    "seedKey": "ke04-v3:KE04-KON-022",
    "contentId": "KE04-KON-022",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Rasvojen muodostuminen",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Mikä sidos muodostuu rasvahapon karboksyyliryhmän ja glyserolin hydroksyyliryhmän välille triglyseridiä muodostettaessa?",
    "options": [
      "esterisidos",
      "peptidisidos",
      "glykosidisidos",
      "amidisidos"
    ],
    "correctAnswer": "esterisidos",
    "explanation": "A, esterisidos.",
    "scoring": "1 p.",
    "hints": [
      "Alkoholi + karboksyylihappo.",
      "Tuote on esteri."
    ],
    "skills": [
      "ke04.kon.rasvojen_muodostuminen",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Rasvojen muodostuminen",
      "ke04.kon.rasvojen_muodostuminen"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation.water_and_bond",
      "condensation.esterification",
      "condensation.amide_bond"
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
    "seedKey": "ke04-v3:KE04-KON-023",
    "contentId": "KE04-KON-023",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Rasvojen muodostuminen",
    "questionType": "application",
    "difficulty": 2,
    "prompt": "Kuinka monta esterisidosta syntyy yhdessä triglyseridissä?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kolme esterisidosta.",
    "scoring": "1 p.",
    "hints": [
      "Glyserolissa on kolme OH-ryhmää.",
      "Jokainen reagoi yhden rasvahapon kanssa."
    ],
    "skills": [
      "ke04.kon.rasvojen_muodostuminen",
      "task.laskennallinen_paattely"
    ],
    "expectedConcepts": [
      "Rasvojen muodostuminen",
      "ke04.kon.rasvojen_muodostuminen"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
    ],
    "estimatedSeconds": 233,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 1,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Laskennallinen päättely"
  },
  {
    "seedKey": "ke04-v3:KE04-KON-024",
    "contentId": "KE04-KON-024",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Rasvojen muodostuminen",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Kuinka monta vesimolekyyliä vapautuu yhden triglyseridin muodostuessa täydellisesti glyserolista ja kolmesta rasvahaposta?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kolme H₂O-molekyyliä.",
    "scoring": "2 p: 3 H₂O 1 p, yhteys kolmeen esterisidokseen 1 p.",
    "hints": [
      "Yksi esterisidos → yksi kondensaatio.",
      "Sidoksia on kolme."
    ],
    "skills": [
      "ke04.kon.rasvojen_muodostuminen",
      "task.laskennallinen_paattely"
    ],
    "expectedConcepts": [
      "Rasvojen muodostuminen",
      "ke04.kon.rasvojen_muodostuminen"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
    ],
    "estimatedSeconds": 271,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Laskennallinen päättely"
  },
  {
    "seedKey": "ke04-v3:KE04-KON-025",
    "contentId": "KE04-KON-025",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Rasvojen muodostuminen",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Glyseroli reagoi kahden rasvahapon kanssa, mutta kolmas OH-ryhmä jää reagoimatta. Voiko tuotetta kutsua triglyseridiksi? Perustele.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Ei. Siinä on vain kaksi rasvahappotähdettä ja kaksi esterisidosta; kyseessä on diglyseridi/diatsyyliglyseroli, ei triglyseridi.",
    "scoring": "3 p: ei 1 p, kaksi rasvahappoa 1 p, oikea luokittelu/perustelu 1 p.",
    "hints": [
      "Tri tarkoittaa kolmea.",
      "Tarkista esteröityneiden OH-ryhmien määrä."
    ],
    "skills": [
      "ke04.kon.rasvojen_muodostuminen",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Rasvojen muodostuminen",
      "ke04.kon.rasvojen_muodostuminen"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
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
    "seedKey": "ke04-v3:KE04-KON-026",
    "contentId": "KE04-KON-026",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Kondensaatiopolymeroituminen",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Miksi kondensaatiopolymeroitumisen monomeereissa on usein kaksi reaktiivista funktionaalista ryhmää?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Jotta monomeeri voi liittyä ketjuun kahdesta suunnasta ja ketjun kasvu voi jatkua.",
    "scoring": "2 p.",
    "hints": [
      "Ketjun keskellä oleva yksikkö tarvitsee kaksi liitoskohtaa.",
      "Yksi ryhmä pysäyttäisi kasvun helpommin."
    ],
    "skills": [
      "ke04.kon.kondensaatiopolymeroituminen",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Kondensaatiopolymeroituminen",
      "ke04.kon.kondensaatiopolymeroituminen"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
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
    "seedKey": "ke04-v3:KE04-KON-027",
    "contentId": "KE04-KON-027",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Kondensaatiopolymeroituminen",
    "questionType": "matching",
    "difficulty": 2,
    "prompt": "Yhdistä: dioli + dikarboksyylihappo; diamiini + dikarboksyylihappo ↔ polyesteri; polyamidi.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Dioli + dikarboksyylihappo → polyesteri; diamiini + dikarboksyylihappo → polyamidi.",
    "scoring": "2 p.",
    "hints": [
      "Alkoholi + happo → esteri.",
      "Amiini + happo → amidi."
    ],
    "skills": [
      "ke04.kon.kondensaatiopolymeroituminen",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Kondensaatiopolymeroituminen",
      "ke04.kon.kondensaatiopolymeroituminen"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
    ],
    "estimatedSeconds": 133,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "Dioli + dikarboksyylihappo",
        "right": "polyesteri"
      },
      {
        "left": "diamiini + dikarboksyylihappo",
        "right": "polyamidi."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-KON-028",
    "contentId": "KE04-KON-028",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Kondensaatiopolymeroituminen",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi polyesterin muodostuminen on kondensaatiopolymeroitumista?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Monomeerien hydroksyyli- ja karboksyyliryhmät reagoivat muodostaen toistuvia esterisidoksia, ja liitoksissa vapautuu pieni molekyyli, tavallisesti vesi.",
    "scoring": "4 p: ryhmät 1 p, esterisidos 1 p, ketju 1 p, vesi 1 p.",
    "hints": [
      "Tunnista esterin muodostumisreaktio.",
      "Toista sama liitos monta kertaa."
    ],
    "skills": [
      "ke04.kon.kondensaatiopolymeroituminen",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Kondensaatiopolymeroituminen",
      "ke04.kon.kondensaatiopolymeroituminen"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
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
    "seedKey": "ke04-v3:KE04-KON-029",
    "contentId": "KE04-KON-029",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Kondensaatiopolymeroituminen",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Nimeä kaksi eroa additio- ja kondensaatiopolymeroitumisen välillä.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Esim. additiossa monomeerissa usein C=C ja pientä sivutuotetta ei synny; kondensaatiossa monomeereissa on reaktiivisia funktionaalisia ryhmiä ja pieni molekyyli, kuten vesi, lohkeaa.",
    "scoring": "4 p: kaksi oikeaa vertailuparia, 2 p / pari.",
    "hints": [
      "Vertaa monomeerirakennetta.",
      "Vertaa sivutuotetta."
    ],
    "skills": [
      "ke04.kon.kondensaatiopolymeroituminen",
      "task.vertailu"
    ],
    "expectedConcepts": [
      "Kondensaatiopolymeroituminen",
      "ke04.kon.kondensaatiopolymeroituminen"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
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
    "seedKey": "ke04-v3:KE04-KON-030",
    "contentId": "KE04-KON-030",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Kondensaatiopolymeroituminen",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Monomeeri sisältää sekä OH- että COOH-ryhmän. Selitä, miten se voi muodostaa kondensaatiopolymeerin myös ilman kahta erilaista monomeerilajia.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Yhden monomeerin OH-ryhmä voi reagoida toisen samanlaisen monomeerin COOH-ryhmän kanssa, jolloin muodostuu esterisidos ja vesi; molekyylissä on molemmat ketjun kasvua mahdollistavat ryhmät.",
    "scoring": "4 p: ryhmien välinen reaktio 2 p, esterisidos 1 p, ketjun kasvu 1 p.",
    "hints": [
      "Monomeerissa on jo molemmat tarvittavat ryhmät.",
      "Anna yhden molekyylin OH:n reagoida toisen COOH:n kanssa",
      "Piirrä tarvittaessa lähtö- ja tuoterakenne rinnakkain ja seuraa, mitkä sidokset muuttuvat.."
    ],
    "skills": [
      "ke04.kon.kondensaatiopolymeroituminen",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Kondensaatiopolymeroituminen",
      "ke04.kon.kondensaatiopolymeroituminen"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
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
    "seedKey": "ke04-v3:KE04-KON-031",
    "contentId": "KE04-KON-031",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Atomitasapaino ja vesimolekyylien laskeminen",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Kymmenen bifunktionaalista monomeeriyksikköä liittyy yhdeksi suoraksi ketjuksi yhdeksällä kondensaatiolla. Montako H₂O-molekyyliä vapautuu?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Yhdeksän H₂O-molekyyliä.",
    "scoring": "1 p.",
    "hints": [
      "Tehtävä kertoo kondensaatioiden määrän.",
      "Yksi kondensaatio → yksi H₂O."
    ],
    "skills": [
      "ke04.kon.atomitasapaino_ja_vesimolekyylien_laskeminen",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Atomitasapaino ja vesimolekyylien laskeminen",
      "ke04.kon.atomitasapaino_ja_vesimolekyylien_laskeminen"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
    ],
    "estimatedSeconds": 166,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 1,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-KON-032",
    "contentId": "KE04-KON-032",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Atomitasapaino ja vesimolekyylien laskeminen",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Suorassa ketjussa on 25 monomeeriyksikköä. Oleta, että jokainen liitos syntyi yhden veden vapauttavalla kondensaatiolla. Montako vettä muodostui?",
    "options": [],
    "correctAnswer": null,
    "explanation": "24 H₂O-molekyyliä.",
    "scoring": "2 p: 24 1 p, n−1 1 p.",
    "hints": [
      "Sidoksia on 25−1.",
      "Yksi vesi per sidos."
    ],
    "skills": [
      "ke04.kon.atomitasapaino_ja_vesimolekyylien_laskeminen",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Atomitasapaino ja vesimolekyylien laskeminen",
      "ke04.kon.atomitasapaino_ja_vesimolekyylien_laskeminen"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
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
    "seedKey": "ke04-v3:KE04-KON-033",
    "contentId": "KE04-KON-033",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Atomitasapaino ja vesimolekyylien laskeminen",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija laskee kahdeksan monomeerin suoralle ketjulle kahdeksan kondensaatiota. Mikä on oikea määrä?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Seitsemän kondensaatiota, koska kahdeksan erillisen yksikön yhdistäminen yhdeksi suoraksi ketjuksi vaatii seitsemän liitosta.",
    "scoring": "2 p.",
    "hints": [
      "Kokeile neljällä yksiköllä.",
      "Liitoksia = n−1."
    ],
    "skills": [
      "ke04.kon.atomitasapaino_ja_vesimolekyylien_laskeminen",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Atomitasapaino ja vesimolekyylien laskeminen",
      "ke04.kon.atomitasapaino_ja_vesimolekyylien_laskeminen"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation.water_and_bond"
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
    "seedKey": "ke04-v3:KE04-KON-034",
    "contentId": "KE04-KON-034",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Atomitasapaino ja vesimolekyylien laskeminen",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Kondensaatiopolymeerissä on 100 rakenneyksikköä suorassa ketjussa. Jos jokaisessa liitoksessa vapautui yksi H₂O, kuinka monta moolia vettä muodostuu yhtä moolia tällaisia ketjuja kohti?",
    "options": [],
    "correctAnswer": null,
    "explanation": "99 mol H₂O per 1 mol polymeeriketjuja.",
    "scoring": "3 p: 99 sidosta 1 p, 99 mol vettä 1 p, yksikkö/per-mooli-tulkinta 1 p.",
    "hints": [
      "Yhdessä ketjussa 99 liitosta.",
      "Moolissa ketjuja sama stoikiometrinen kerroin pätee."
    ],
    "skills": [
      "ke04.kon.atomitasapaino_ja_vesimolekyylien_laskeminen",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Atomitasapaino ja vesimolekyylien laskeminen",
      "ke04.kon.atomitasapaino_ja_vesimolekyylien_laskeminen"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
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
    "seedKey": "ke04-v3:KE04-KON-035",
    "contentId": "KE04-KON-035",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Atomitasapaino ja vesimolekyylien laskeminen",
    "questionType": "short_answer",
    "difficulty": 3,
    "prompt": "Miksi kondensaatioreaktiossa tuotteiden kokonaisatomimäärä ei riko massan säilymistä, vaikka vettä 'poistuu'?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Vesi ei katoa vaan on erillinen reaktiotuote. Kaikki lähtöaineiden atomit löytyvät polymeeristä/yhdistymistuotteesta ja vapautuneesta pienestä molekyylistä.",
    "scoring": "3 p: vesi tuotteena 1 p, atomien säilyminen 1 p, kokonaisuuden tarkastelu 1 p.",
    "hints": [
      "'Poistuu' tarkoittaa irtoaa tuotteeksi.",
      "Laske atomit myös vedestä."
    ],
    "skills": [
      "ke04.kon.atomitasapaino_ja_vesimolekyylien_laskeminen",
      "task.atomitasapaino"
    ],
    "expectedConcepts": [
      "Atomitasapaino ja vesimolekyylien laskeminen",
      "ke04.kon.atomitasapaino_ja_vesimolekyylien_laskeminen"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
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
    "seedKey": "ke04-v3:KE04-KON-036",
    "contentId": "KE04-KON-036",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Integroiva kondensaatioreaktioiden tunnistus",
    "questionType": "matching",
    "difficulty": 2,
    "prompt": "Yhdistä syntyvä sidos ja lähtöaineryhmät: esterisidos ↔ OH+COOH; amidisidos ↔ NH₂+COOH; glykosidisidos ↔ monosakkaridien OH-ryhmien osallistuminen.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Esteri → OH+COOH; amidi → NH₂+COOH; glykosidisidos → sokerien hydroksyyliryhmien kautta muodostuva liitos.",
    "scoring": "3 p.",
    "hints": [
      "Esteri tulee alkoholista ja haposta.",
      "Amidi tulee amiinista ja haposta."
    ],
    "skills": [
      "ke04.kon.integroiva_kondensaatioreaktioiden_tunnistus",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Integroiva kondensaatioreaktioiden tunnistus",
      "ke04.kon.integroiva_kondensaatioreaktioiden_tunnistus"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
    ],
    "estimatedSeconds": 133,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "Esteri",
        "right": "OH+COOH"
      },
      {
        "left": "amidi",
        "right": "NH₂+COOH"
      },
      {
        "left": "glykosidisidos",
        "right": "sokerien hydroksyyliryhmien kautta muodostuva liitos."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-KON-037",
    "contentId": "KE04-KON-037",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Integroiva kondensaatioreaktioiden tunnistus",
    "questionType": "recognition",
    "difficulty": 3,
    "prompt": "Reaktiossa muodostuu uusi –CO–NH–-sidos ja vettä. Mihin reaktiotyyppiin ja sidostyyppiin tämä viittaa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kondensaatioreaktioon ja amidisidoksen/peptidisidoksen muodostumiseen.",
    "scoring": "3 p: kondensaatio 1 p, amidi 1 p, peptidi hyväksytään 1 p.",
    "hints": [
      "CO–NH on tunnusomainen.",
      "Veden synty tukee kondensaatiota."
    ],
    "skills": [
      "ke04.kon.integroiva_kondensaatioreaktioiden_tunnistus",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Integroiva kondensaatioreaktioiden tunnistus",
      "ke04.kon.integroiva_kondensaatioreaktioiden_tunnistus"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
    ],
    "estimatedSeconds": 97,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Tunnistus"
  },
  {
    "seedKey": "ke04-v3:KE04-KON-038",
    "contentId": "KE04-KON-038",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Integroiva kondensaatioreaktioiden tunnistus",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Väite: 'Kaikki kondensaatioreaktiot muodostavat esterisidoksen.' Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Väärin. Kondensaatio voi muodostaa esimerkiksi esteri-, amidi/peptidi- tai glykosidisidoksia reagoivista funktionaalisista ryhmistä riippuen.",
    "scoring": "3 p: väärin 1 p, vähintään kaksi muuta sidostyyppiä 2 p.",
    "hints": [
      "Mieti proteiineja ja hiilihydraatteja.",
      "Niissä ei ole esterisidos pääliitoksena."
    ],
    "skills": [
      "ke04.kon.integroiva_kondensaatioreaktioiden_tunnistus",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Integroiva kondensaatioreaktioiden tunnistus",
      "ke04.kon.integroiva_kondensaatioreaktioiden_tunnistus"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation.water_and_bond",
      "condensation.esterification"
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
    "seedKey": "ke04-v3:KE04-KON-039",
    "contentId": "KE04-KON-039",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Integroiva kondensaatioreaktioiden tunnistus",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Tuntemattomassa reaktiossa kaksi molekyyliä liittyy, uusi C–O–C-tyyppinen liitos syntyy ja vettä vapautuu. Reagoivissa molekyyleissä oli paljon OH-ryhmiä. Mihin biomolekyylien muodostumisreaktioon tämä voisi viitata?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Monosakkaridien kondensaatioon ja glykosidisidoksen muodostumiseen, esimerkiksi disakkaridin syntyyn.",
    "scoring": "3 p: monosakkaridit 1 p, glykosidisidos 1 p, kondensaatio/disakkaridi 1 p.",
    "hints": [
      "Paljon OH-ryhmiä viittaa sokereihin.",
      "Kaksi sokeriyksikköä voi muodostaa disakkaridin."
    ],
    "skills": [
      "ke04.kon.integroiva_kondensaatioreaktioiden_tunnistus",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Integroiva kondensaatioreaktioiden tunnistus",
      "ke04.kon.integroiva_kondensaatioreaktioiden_tunnistus"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
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
    "seedKey": "ke04-v3:KE04-KON-040",
    "contentId": "KE04-KON-040",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "Integroiva kondensaatioreaktioiden tunnistus",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "Vertaa esteröitymistä, peptidisidoksen muodostumista ja disakkaridin muodostumista: reagoivat ryhmät/rakenneyksiköt, syntyvä sidos ja veden rooli.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Esteröityminen: alkoholin OH + karboksyylihapon COOH → esterisidos + H₂O. Peptidi: aminohapon NH₂ + toisen COOH → amidinen peptidisidos + H₂O. Disakkaridi: monosakkaridien hydroksyyliryhmien kautta → glykosidisidos + H₂O.",
    "scoring": "6 p: kustakin tapauksesta oikeat lähtöosat ja sidos 1 p + veden rooli 1 p, yhteensä 6 p.",
    "hints": [
      "Tee kolme riviä: lähtöryhmät, sidos, vesi.",
      "Yhteinen nimittäjä on kondensaatio",
      "Ratkaise osa-alueet erikseen ja yhdistä ne vasta lopulliseen perusteltuun vastaukseen.."
    ],
    "skills": [
      "ke04.kon.integroiva_kondensaatioreaktioiden_tunnistus",
      "task.integroiva_vertailu"
    ],
    "expectedConcepts": [
      "Integroiva kondensaatioreaktioiden tunnistus",
      "ke04.kon.integroiva_kondensaatioreaktioiden_tunnistus"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 6,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Integroiva vertailu"
  },
  {
    "seedKey": "ke04-v3:KE04-KON-X01",
    "contentId": "KE04-KON-X01",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Etanoli ja etaanihappo kuumennetaan yhdessä ja tuotteella havaitaan hedelmäinen tuoksu. a) Tunnista reaktiotyyppi. b) Nimeä orgaaninen tuote. c) Kirjoita reaktio kaavoilla. d) Mikä pieni molekyyli syntyy?",
    "options": [],
    "correctAnswer": null,
    "explanation": "a) Kondensaatio/esteröityminen. b) Etyylietanaatti. c) CH₃CH₂OH+CH₃COOH⇌CH₃COOCH₂CH₃+H₂O. d) Vesi.",
    "scoring": "8 p: tyyppi 1 p; nimi 2 p; yhtälö 4 p; vesi 1 p.",
    "hints": [
      "Alkoholi + karboksyylihappo.",
      "Esterin nimi: alkoholin alkyyli + hapon -aatti",
      "Perustele päätelmä yhdistämällä havainto tai mittaus suoraan kemialliseen malliin.."
    ],
    "skills": [
      "condensation.esterification",
      "observation_to_product"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "condensation.esterification",
      "observation_to_product"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
    ],
    "estimatedSeconds": 309,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 8,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Esterisynteesi – aineisto"
  },
  {
    "seedKey": "ke04-v3:KE04-KON-X02",
    "contentId": "KE04-KON-X02",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "multiple_choice",
    "difficulty": 4,
    "prompt": "Mikä pari voi muodostaa polyamidin kondensaatiopolymeroitumisella?",
    "options": [
      "dioli+dikarboksyylihappo",
      "diamiini+dikarboksyylihappo",
      "eteeni+eteeni",
      "kaksi alkaania"
    ],
    "correctAnswer": "diamiini+dikarboksyylihappo",
    "explanation": "B.",
    "scoring": "4 p: B 1 p; NH₂ 1 p; COOH 1 p; amidisidos 1 p.",
    "hints": [
      "Amidisidos syntyy amiinin ja karboksyylihapon välillä.",
      "Ketjun kasvu tarvitsee kaksi reaktiivista päätä",
      "Sulje pois vaihtoehdot vertaamalla jokaista niistä reaktioyhtälöön, rakenteeseen tai määritelmään.."
    ],
    "skills": [
      "condensation.polyamide",
      "functional_groups"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "condensation.polyamide",
      "functional_groups"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "polyester_vs_polyamide"
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
    "seedKey": "ke04-v3:KE04-KON-X03",
    "contentId": "KE04-KON-X03",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "short_answer",
    "difficulty": 4,
    "prompt": "Seitsemän aminohappoa liittyy suoraksi peptidiksi. a) Kuinka monta peptidisidosta muodostuu? b) Kuinka monta H₂O-molekyyliä vapautuu? c) Perustele n−1-säännöllä.",
    "options": [],
    "correctAnswer": null,
    "explanation": "6 peptidisidosta ja 6 H₂O-molekyyliä. Suorassa ketjussa seitsemän erillisen yksikön yhdistämiseen tarvitaan kuusi liitosta.",
    "scoring": "5 p: sidokset 2 p; H₂O 2 p; perustelu 1 p.",
    "hints": [
      "Piirrä seitsemän pistettä jonoon.",
      "Laske niiden väliset liitokset",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "condensation.peptide",
      "counting_bonds"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "condensation.peptide",
      "counting_bonds"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
    ],
    "estimatedSeconds": 154,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 5,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Sidosten laskeminen"
  },
  {
    "seedKey": "ke04-v3:KE04-KON-X04",
    "contentId": "KE04-KON-X04",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "short_answer",
    "difficulty": 4,
    "prompt": "Karboksyylihappo R–COOH ja alkoholi R'–OH reagoivat kondensaatiolla. Kirjoita yleinen esterin rakenne ja osoita, mistä veden H ja OH voidaan ajatella tulevan.",
    "options": [],
    "correctAnswer": null,
    "explanation": "R–COO–R' + H₂O. Yksinkertaistetusti veden OH tulee karboksyyliryhmästä ja H alkoholiryhmästä; samalla muodostuu esterisidos –COO–.",
    "scoring": "6 p: esterirakenne 3 p; H₂O 1 p; H/OH-lähteet 2 p.",
    "hints": [
      "Esterissä COOH:n OH korvautuu OR'-ryhmällä.",
      "H+OH→H₂O",
      "Piirrä tarvittaessa lähtö- ja tuoterakenne rinnakkain ja seuraa, mitkä sidokset muuttuvat.."
    ],
    "skills": [
      "condensation.structural_representation",
      "ester_bond"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "condensation.structural_representation",
      "ester_bond"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
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
    "seedKey": "ke04-v3:KE04-KON-X05",
    "contentId": "KE04-KON-X05",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "error_detection",
    "difficulty": 5,
    "prompt": "Opiskelija väittää, että kaikki kondensaatiot tuottavat estereitä. Anna kaksi vastaesimerkkiä KE04:n sisällöstä ja nimeä niissä syntyvä sidos.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Esim. aminohappojen kondensaatio → peptidi/amidisidos; monosakkaridien kondensaatio → glykosidisidos. Myös polyamidin muodostuminen tuottaa amidisidoksia.",
    "scoring": "6 p: kaksi kelvollista tapausta 2 p/kpl; oikeat sidostyypit 1 p/kpl.",
    "hints": [
      "Mieti proteiineja.",
      "Mieti hiilihydraatteja",
      "Nimeä ensin väärä kemiallinen periaate ja vasta sitten sen vaikutus lopputulokseen.."
    ],
    "skills": [
      "condensation.reaction_families",
      "bond_types"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "condensation.reaction_families",
      "bond_types"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "all_condensation_is_esterification"
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
    "seedKey": "ke04-v3:KE04-KON-X06",
    "contentId": "KE04-KON-X06",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "application",
    "difficulty": 5,
    "prompt": "Esterisynteesin teoreettinen esterin massa on 14,8 g. Eristetty ja kuivattu esteri painaa 11,5 g. a) Laske saanto-%. b) Nimeä kaksi työvaiheisiin liittyvää syytä, jotka voivat pienentää saantoa ilman että reaktioyhtälö on väärä.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Saanto=11,5/14,8×100≈77,7 %. Syitä esim. esteröityminen ei mene täydellisesti, tuotetta jää erotus-/pesuvaiheissa, osa haihtuu tai jää laitteistoon.",
    "scoring": "7 p: prosentti 3 p; kaksi perusteltua syytä 2 p/kpl.",
    "hints": [
      "todellinen/teoreettinen×100.",
      "Mieti sekä tasapainoa että tuotteen käsittelyä",
      "Perustele päätelmä yhdistämällä havainto tai mittaus suoraan kemialliseen malliin.."
    ],
    "skills": [
      "condensation.experimental",
      "yield",
      "error_sources"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "condensation.experimental",
      "yield",
      "error_sources"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
    ],
    "estimatedSeconds": 347,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 7,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Kokeellinen saanto"
  },
  {
    "seedKey": "ke04-v3:KE04-KON-X07",
    "contentId": "KE04-KON-X07",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "Monomeerit HO–R–OH ja HOOC–R'–COOH muodostavat pitkän ketjun. a) Mikä polymeerityyppi syntyy? b) Piirrä yleinen toistuva rakenneosa käyttäen R- ja R'-ryhmiä. c) Mikä sidos toistuu? d) Mikä pieni molekyyli poistuu liitoksissa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "a) Polyesteri. b) Esim. [–O–R–O–CO–R'–CO–]ₙ. c) Esterisidos. d) Vesi.",
    "scoring": "10 p: tyyppi 2 p; rakenneosa 4 p; sidos 2 p; vesi 2 p.",
    "hints": [
      "Dioli + dikarboksyylihappo.",
      "Etsi –COO– toistuvasta ketjusta",
      "Piirrä tarvittaessa lähtö- ja tuoterakenne rinnakkain ja seuraa, mitkä sidokset muuttuvat.."
    ],
    "skills": [
      "condensation.polyester",
      "structural_formula",
      "polymerization"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "condensation.polyester",
      "structural_formula",
      "polymerization"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 10,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Koereservi – polymeeri"
  },
  {
    "seedKey": "ke04-v3:KE04-KON-X08",
    "contentId": "KE04-KON-X08",
    "chapter": 12,
    "topicName": "Kondensaatioreaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "Vertaa triglyseridin, dipeptidin ja disakkaridin muodostumista. Tee jokaisesta: lähtöainetyypit, muodostuvan sidoksen nimi ja vapautuvan veden määrä yhtä yksittäistä liitosta kohti.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Triglyseridi: glyseroli+rasvahapot, esterisidokset, 1 H₂O per esterisidos (3 koko triglyseridissä). Dipeptidi: 2 aminohappoa, peptidi/amidisidos, 1 H₂O. Disakkaridi: 2 monosakkaridia, glykosidisidos, 1 H₂O.",
    "scoring": "12 p: jokaisesta lähtöaineet 1 p, sidos 1 p, veden määrä 1 p =9 p; yhteisen kondensaatioperiaatteen kuvaus 3 p.",
    "hints": [
      "Tee kolme saraketta.",
      "Kaikissa uusi kovalenttinen sidos + H₂O",
      "Ratkaise osa-alueet erikseen ja yhdistä ne vasta lopulliseen perusteltuun vastaukseen.."
    ],
    "skills": [
      "condensation.compare_biomolecules",
      "bond_types"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "condensation.compare_biomolecules",
      "bond_types"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "condensation_vs_hydrolysis",
      "bond_type"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 12,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Koereservi – integroiva"
  }
];
