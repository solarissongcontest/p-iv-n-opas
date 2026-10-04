import type { Ke04SeedQuestion } from "./types";

export const questions: Ke04SeedQuestion[] = [
  {
    "seedKey": "ke04-v3:KE04-HYD-001",
    "contentId": "KE04-HYD-001",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Hydrolyysin perusidea ja veden rooli",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitä hydrolyysi tarkoittaa yleisellä tasolla?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Sidoksen katkeamista veden avulla niin, että suurempi molekyyli pilkkoutuu pienemmiksi osiksi.",
    "scoring": "2 p: veden osallistuminen 1 p, sidoksen katkeaminen 1 p.",
    "hints": [
      "Hydro = vesi.",
      "Lyysi = hajottaminen."
    ],
    "skills": [
      "ke04.hyd.hydrolyysin_perusidea_ja_veden_rooli",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Hydrolyysin perusidea ja veden rooli",
      "ke04.hyd.hydrolyysin_perusidea_ja_veden_rooli"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
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
    "seedKey": "ke04-v3:KE04-HYD-002",
    "contentId": "KE04-HYD-002",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Hydrolyysin perusidea ja veden rooli",
    "questionType": "multiple_choice",
    "difficulty": 1,
    "prompt": "Mikä kuvaa hydrolyysiä parhaiten?",
    "options": [
      "kaksi molekyyliä liittyy ja vettä vapautuu",
      "sidos katkeaa veden avulla",
      "C=C muuttuu C–C ilman vettä",
      "happi poistuu"
    ],
    "correctAnswer": "sidos katkeaa veden avulla",
    "explanation": "B.",
    "scoring": "1 p.",
    "hints": [
      "Vertaa kondensaatioon.",
      "Vesi on lähtöaine."
    ],
    "skills": [
      "ke04.hyd.hydrolyysin_perusidea_ja_veden_rooli",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Hydrolyysin perusidea ja veden rooli",
      "ke04.hyd.hydrolyysin_perusidea_ja_veden_rooli"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "hydrolysis.water_as_reactant"
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
    "seedKey": "ke04-v3:KE04-HYD-003",
    "contentId": "KE04-HYD-003",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Hydrolyysin perusidea ja veden rooli",
    "questionType": "matching",
    "difficulty": 2,
    "prompt": "Yhdistä reaktio ja veden rooli: kondensaatio, hydrolyysi ↔ vettä syntyy; vettä kuluu.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kondensaatio → vettä syntyy tyypillisesti; hydrolyysi → vettä kuluu.",
    "scoring": "2 p, 1 p / pari.",
    "hints": [
      "Toinen rakentaa, toinen hajottaa.",
      "Hydrolyysissä H₂O osallistuu sidoksen katkaisuun."
    ],
    "skills": [
      "ke04.hyd.hydrolyysin_perusidea_ja_veden_rooli",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Hydrolyysin perusidea ja veden rooli",
      "ke04.hyd.hydrolyysin_perusidea_ja_veden_rooli"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
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
        "right": "vettä syntyy tyypillisesti"
      },
      {
        "left": "hydrolyysi",
        "right": "vettä kuluu."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-HYD-004",
    "contentId": "KE04-HYD-004",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Hydrolyysin perusidea ja veden rooli",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miten veden H- ja OH-osat voidaan ajatella jakautuvan hydrolyysissä katkeavan sidoksen eri puolille?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Vesimolekyylistä peräisin oleva H liittyy toiseen katkeavan sidoksen osaan ja OH toiseen, jolloin molempien fragmenttien valenssit täydentyvät.",
    "scoring": "3 p: H toiselle 1 p, OH toiselle 1 p, valenssien täydentyminen 1 p.",
    "hints": [
      "Kirjoita H–OH.",
      "Katkaise sidos ja lisää ryhmät päihin."
    ],
    "skills": [
      "ke04.hyd.hydrolyysin_perusidea_ja_veden_rooli",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Hydrolyysin perusidea ja veden rooli",
      "ke04.hyd.hydrolyysin_perusidea_ja_veden_rooli"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
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
    "seedKey": "ke04-v3:KE04-HYD-005",
    "contentId": "KE04-HYD-005",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Hydrolyysin perusidea ja veden rooli",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija sanoo: 'Hydrolyysissä vesi on aina vain liuotin eikä reagoi.' Korjaa väite.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Hydrolyysissä vesi on reagenssi: sen osat liittyvät sidoksen katkeamisen tuotteisiin. Se voi samalla toimia liuottimena, mutta kemiallisesti se osallistuu reaktioon.",
    "scoring": "3 p: vesi reagenssina 2 p, liuotinroolin erottaminen 1 p.",
    "hints": [
      "Tarkastele reaktion atomitasetta.",
      "Mistä tuotteiden H ja OH tulevat?"
    ],
    "skills": [
      "ke04.hyd.hydrolyysin_perusidea_ja_veden_rooli",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Hydrolyysin perusidea ja veden rooli",
      "ke04.hyd.hydrolyysin_perusidea_ja_veden_rooli"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "hydrolysis.water_as_reactant"
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
    "seedKey": "ke04-v3:KE04-HYD-006",
    "contentId": "KE04-HYD-006",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Esterin hydrolyysi",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitkä kaksi päätyyppistä tuotetta saadaan tavallisen esterin hydrolyysissä?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Alkoholi ja karboksyylihappo (olosuhteista riippuen karboksylaatti voi esiintyä emäksessä).",
    "scoring": "2 p: alkoholi 1 p, karboksyylihappo/karboksylaatti 1 p.",
    "hints": [
      "Mieti esteröitymisen lähtöaineita.",
      "Hydrolyysi kulkee vastakkaiseen suuntaan."
    ],
    "skills": [
      "ke04.hyd.esterin_hydrolyysi",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Esterin hydrolyysi",
      "ke04.hyd.esterin_hydrolyysi"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
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
    "seedKey": "ke04-v3:KE04-HYD-007",
    "contentId": "KE04-HYD-007",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Esterin hydrolyysi",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Etyylietanaatin hydrolyysissä muodostuu",
    "options": [
      "etanoli + etaanihappo",
      "eteeni + vesi",
      "metanoli + metaanihappo",
      "propanoli + propaanihappo"
    ],
    "correctAnswer": "etanoli + etaanihappo",
    "explanation": "A.",
    "scoring": "1 p.",
    "hints": [
      "Esterin nimi sisältää alkoholi- ja happo-osan.",
      "Etyyli → etanoli."
    ],
    "skills": [
      "ke04.hyd.esterin_hydrolyysi",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Esterin hydrolyysi",
      "ke04.hyd.esterin_hydrolyysi"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "hydrolysis.water_as_reactant"
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
    "seedKey": "ke04-v3:KE04-HYD-008",
    "contentId": "KE04-HYD-008",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Esterin hydrolyysi",
    "questionType": "short_answer",
    "difficulty": 3,
    "prompt": "Kirjoita etyylietanaatin hydrolyysi sanallisesti tai kaavana.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Etyylietanaatti + H₂O → etanoli + etaanihappo; esim. CH₃COOCH₂CH₃ + H₂O → CH₃COOH + CH₃CH₂OH.",
    "scoring": "4 p: lähtöaineet 1 p, vesi 1 p, etanoli 1 p, etaanihappo 1 p.",
    "hints": [
      "Katkaise esterisidos.",
      "Palauta alkoholi- ja happoryhmät."
    ],
    "skills": [
      "ke04.hyd.esterin_hydrolyysi",
      "task.reaktio"
    ],
    "expectedConcepts": [
      "Esterin hydrolyysi",
      "ke04.hyd.esterin_hydrolyysi"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
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
    "seedKey": "ke04-v3:KE04-HYD-009",
    "contentId": "KE04-HYD-009",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Esterin hydrolyysi",
    "questionType": "short_answer",
    "difficulty": 3,
    "prompt": "Molekyylissä on kohta R–COO–R'. Mihin sidokseen hydrolyysin vaikutus kohdistuu, ja millaiset ryhmät tuotteisiin syntyvät?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Esteriryhmä hydrolysoituu; tuotteisiin muodostuu karboksyyliryhmä R–COOH ja alkoholiryhmä R'–OH.",
    "scoring": "3 p: esteri 1 p, COOH 1 p, OH 1 p.",
    "hints": [
      "Tunnista –COO–.",
      "Mieti esterin lähtöaineita."
    ],
    "skills": [
      "ke04.hyd.esterin_hydrolyysi",
      "task.rakennetulkinta"
    ],
    "expectedConcepts": [
      "Esterin hydrolyysi",
      "ke04.hyd.esterin_hydrolyysi"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
    ],
    "estimatedSeconds": 135,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Rakennetulkinta"
  },
  {
    "seedKey": "ke04-v3:KE04-HYD-010",
    "contentId": "KE04-HYD-010",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Esterin hydrolyysi",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Väite: 'Esterin hydrolyysissä syntyy aina kaksi karboksyylihappoa.' Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Tavallisen esterin hydrolyysissä syntyy karboksyylihappo ja alkoholi; emäksisissä oloissa happo-osuus voi olla karboksylaatti.",
    "scoring": "3 p: alkoholi 1 p, happo/karboksylaatti 1 p, väitteen korjaus 1 p.",
    "hints": [
      "Esteri syntyy alkoholista ja haposta.",
      "Hydrolyysi palauttaa nämä ryhmätyypit."
    ],
    "skills": [
      "ke04.hyd.esterin_hydrolyysi",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Esterin hydrolyysi",
      "ke04.hyd.esterin_hydrolyysi"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "hydrolysis.water_as_reactant",
      "hydrolysis.ester_products"
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
    "seedKey": "ke04-v3:KE04-HYD-011",
    "contentId": "KE04-HYD-011",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Rasvojen hydrolyysi",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitä triglyseridin täydellinen hydrolyysi tuottaa yleisesti?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Glyserolia ja kolme rasvahappoa; emäksisessä hydrolyysissä rasvahappojen suoloja.",
    "scoring": "2 p: glyseroli 1 p, rasvahapot/suolat 1 p.",
    "hints": [
      "Triglyseridissä on kolme esterisidosta.",
      "Palauta glyseroli ja rasvahapot."
    ],
    "skills": [
      "ke04.hyd.rasvojen_hydrolyysi",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Rasvojen hydrolyysi",
      "ke04.hyd.rasvojen_hydrolyysi"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
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
    "seedKey": "ke04-v3:KE04-HYD-012",
    "contentId": "KE04-HYD-012",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Rasvojen hydrolyysi",
    "questionType": "application",
    "difficulty": 2,
    "prompt": "Kuinka monta vesimolekyyliä tarvitaan yhden triglyseridin kolmen esterisidoksen täydelliseen hydrolyysiin ideaalitapauksessa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kolme H₂O-molekyyliä, yksi kutakin hydrolysoituvaa esterisidosta kohti.",
    "scoring": "2 p: 3 H₂O 1 p, perustelu 1 p.",
    "hints": [
      "Laske esterisidokset.",
      "Yksi hydrolyysi kuluttaa yhden veden."
    ],
    "skills": [
      "ke04.hyd.rasvojen_hydrolyysi",
      "task.laskennallinen_paattely"
    ],
    "expectedConcepts": [
      "Rasvojen hydrolyysi",
      "ke04.hyd.rasvojen_hydrolyysi"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
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
    "seedKey": "ke04-v3:KE04-HYD-013",
    "contentId": "KE04-HYD-013",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Rasvojen hydrolyysi",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Mikä yhdiste muodostaa triglyseridin alkoholiosan?",
    "options": [
      "glyseroli",
      "etyleeniglykoli",
      "glukoosi",
      "etanoli"
    ],
    "correctAnswer": "glyseroli",
    "explanation": "A, glyseroli.",
    "scoring": "1 p.",
    "hints": [
      "Triglyseridin nimessä kuuluu glyseroli.",
      "Glyserolissa on kolme OH-ryhmää."
    ],
    "skills": [
      "ke04.hyd.rasvojen_hydrolyysi",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Rasvojen hydrolyysi",
      "ke04.hyd.rasvojen_hydrolyysi"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "hydrolysis.water_as_reactant"
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
    "seedKey": "ke04-v3:KE04-HYD-014",
    "contentId": "KE04-HYD-014",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Rasvojen hydrolyysi",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi triglyseridin hydrolyysi voidaan nähdä esteröitymisen vastareaktiona?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Esteröitymisessä glyseroli ja rasvahapot muodostavat esterisidoksia ja vettä vapautuu; hydrolyysissä esterisidokset katkeavat veden avulla ja lähtöainetyyppiset osat palautuvat.",
    "scoring": "4 p: esteröityminen 2 p, hydrolyysi 2 p.",
    "hints": [
      "Vertaa veden suuntaa.",
      "Seuraa esterisidosta."
    ],
    "skills": [
      "ke04.hyd.rasvojen_hydrolyysi",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Rasvojen hydrolyysi",
      "ke04.hyd.rasvojen_hydrolyysi"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
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
    "seedKey": "ke04-v3:KE04-HYD-015",
    "contentId": "KE04-HYD-015",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Rasvojen hydrolyysi",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Tuntematon yhdiste hydrolysoituu glyseroliksi ja kolmenlaisiksi pitkäketjuisiksi karboksyylihapoiksi. Mikä yhdiste todennäköisesti oli?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Triglyseridi, jonka kolme rasvahappotähdettä olivat erilaisia.",
    "scoring": "3 p: triglyseridi 2 p, erilaisten rasvahappojen päätelmä 1 p.",
    "hints": [
      "Glyseroli + kolme rasvahappoa on tunnusomainen yhdistelmä.",
      "Mieti rasvoja."
    ],
    "skills": [
      "ke04.hyd.rasvojen_hydrolyysi",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Rasvojen hydrolyysi",
      "ke04.hyd.rasvojen_hydrolyysi"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
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
    "seedKey": "ke04-v3:KE04-HYD-016",
    "contentId": "KE04-HYD-016",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Amidien ja peptidisidosten hydrolyysi",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mikä sidos katkeaa peptidin hydrolyysissä?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Peptidisidos eli amidisidos.",
    "scoring": "2 p.",
    "hints": [
      "Peptidi rakentuu aminohapoista.",
      "Sidoksen toinen nimi on amidi."
    ],
    "skills": [
      "ke04.hyd.amidien_ja_peptidisidosten_hydrolyysi",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Amidien ja peptidisidosten hydrolyysi",
      "ke04.hyd.amidien_ja_peptidisidosten_hydrolyysi"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
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
    "seedKey": "ke04-v3:KE04-HYD-017",
    "contentId": "KE04-HYD-017",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Amidien ja peptidisidosten hydrolyysi",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Dipeptidin täydellisen hydrolyysin tuotteet ovat yleensä",
    "options": [
      "kaksi aminohappoa",
      "yksi aminohappo ja yksi rasvahappo",
      "kaksi monosakkaridia",
      "glyseroli ja kaksi rasvahappoa"
    ],
    "correctAnswer": "kaksi aminohappoa",
    "explanation": "A.",
    "scoring": "1 p.",
    "hints": [
      "Di-peptidi sisältää kaksi aminohappoyksikköä.",
      "Hydrolyysi irrottaa yksiköt."
    ],
    "skills": [
      "ke04.hyd.amidien_ja_peptidisidosten_hydrolyysi",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Amidien ja peptidisidosten hydrolyysi",
      "ke04.hyd.amidien_ja_peptidisidosten_hydrolyysi"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "hydrolysis.water_as_reactant",
      "hydrolysis.vs_denaturation"
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
    "seedKey": "ke04-v3:KE04-HYD-018",
    "contentId": "KE04-HYD-018",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Amidien ja peptidisidosten hydrolyysi",
    "questionType": "application",
    "difficulty": 2,
    "prompt": "Kuinka monta vesimolekyyliä tarvitaan suoraketjuisen tetrapeptidin kolmen peptidisidoksen täydelliseen hydrolyysiin?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kolme H₂O-molekyyliä.",
    "scoring": "2 p: 3 1 p, yhteys kolmeen sidokseen 1 p.",
    "hints": [
      "Neljä aminohappoa → kolme sidosta.",
      "Yksi sidos → yksi H₂O."
    ],
    "skills": [
      "ke04.hyd.amidien_ja_peptidisidosten_hydrolyysi",
      "task.laskennallinen_paattely"
    ],
    "expectedConcepts": [
      "Amidien ja peptidisidosten hydrolyysi",
      "ke04.hyd.amidien_ja_peptidisidosten_hydrolyysi"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
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
    "seedKey": "ke04-v3:KE04-HYD-019",
    "contentId": "KE04-HYD-019",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Amidien ja peptidisidosten hydrolyysi",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miten peptidin hydrolyysi liittyy aminohappojen kondensaatioon?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kondensaatiossa aminohapot muodostavat peptidisidoksen ja vettä vapautuu. Hydrolyysissä peptidisidos katkeaa veden avulla ja aminohappotyyppiset päät palautuvat.",
    "scoring": "4 p.",
    "hints": [
      "Reaktiot ovat vastakkaissuuntaisia.",
      "Seuraa peptidisidosta ja vettä."
    ],
    "skills": [
      "ke04.hyd.amidien_ja_peptidisidosten_hydrolyysi",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Amidien ja peptidisidosten hydrolyysi",
      "ke04.hyd.amidien_ja_peptidisidosten_hydrolyysi"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
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
    "seedKey": "ke04-v3:KE04-HYD-020",
    "contentId": "KE04-HYD-020",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Amidien ja peptidisidosten hydrolyysi",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Väite: 'Proteiinin denaturoituminen ja peptidisidosten hydrolyysi ovat sama asia.' Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Ne ovat eri ilmiöitä. Denaturoituminen muuttaa yleensä proteiinin korkeampaa rakennetta ilman peptidisidosten katkeamista; hydrolyysi katkaisee peptidisidoksia ja voi pilkkoa ketjun.",
    "scoring": "4 p: ero 1 p, denaturaatio 1 p, hydrolyysi 1 p, peptidisidoksen kohtalo 1 p.",
    "hints": [
      "Kysy, katkeaako primäärirakenne.",
      "Denaturaatio voi tapahtua ilman ketjun pilkkoutumista."
    ],
    "skills": [
      "ke04.hyd.amidien_ja_peptidisidosten_hydrolyysi",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Amidien ja peptidisidosten hydrolyysi",
      "ke04.hyd.amidien_ja_peptidisidosten_hydrolyysi"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "hydrolysis.water_as_reactant",
      "hydrolysis.vs_denaturation"
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
    "seedKey": "ke04-v3:KE04-HYD-021",
    "contentId": "KE04-HYD-021",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Hiilihydraattien hydrolyysi",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitä sakkaroosin kaltaisen disakkaridin hydrolyysissä tapahtuu?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Disakkaridin glykosidisidos katkeaa veden avulla ja muodostuu kaksi monosakkaridia.",
    "scoring": "2 p: sidos katkeaa 1 p, kaksi monosakkaridia 1 p.",
    "hints": [
      "Di = kaksi.",
      "Hydrolyysi erottaa sokeriyksiköt."
    ],
    "skills": [
      "ke04.hyd.hiilihydraattien_hydrolyysi",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Hiilihydraattien hydrolyysi",
      "ke04.hyd.hiilihydraattien_hydrolyysi"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
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
    "seedKey": "ke04-v3:KE04-HYD-022",
    "contentId": "KE04-HYD-022",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Hiilihydraattien hydrolyysi",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Tärkkelyksen täydellinen hydrolyysi tuottaa pääasiassa",
    "options": [
      "glukoosia",
      "glyserolia",
      "aminohappoja",
      "rasvahappoja"
    ],
    "correctAnswer": "glukoosia",
    "explanation": "A, glukoosia.",
    "scoring": "1 p.",
    "hints": [
      "Tärkkelys on glukoosipolymeeri.",
      "Hydrolyysi vapauttaa monomeerit."
    ],
    "skills": [
      "ke04.hyd.hiilihydraattien_hydrolyysi",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Hiilihydraattien hydrolyysi",
      "ke04.hyd.hiilihydraattien_hydrolyysi"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "hydrolysis.water_as_reactant"
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
    "seedKey": "ke04-v3:KE04-HYD-023",
    "contentId": "KE04-HYD-023",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Hiilihydraattien hydrolyysi",
    "questionType": "matching",
    "difficulty": 2,
    "prompt": "Yhdistä lähtöaine ja hydrolyysituote: tärkkelys, proteiini, triglyseridi ↔ glukoosi; aminohapot; glyseroli + rasvahapot.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Tärkkelys → glukoosi; proteiini → aminohapot; triglyseridi → glyseroli + rasvahapot.",
    "scoring": "3 p, 1 p / pari.",
    "hints": [
      "Tunnista kunkin makromolekyylin rakennusyksikkö.",
      "Hydrolyysi vapauttaa niitä."
    ],
    "skills": [
      "ke04.hyd.hiilihydraattien_hydrolyysi",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Hiilihydraattien hydrolyysi",
      "ke04.hyd.hiilihydraattien_hydrolyysi"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
    ],
    "estimatedSeconds": 133,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "Tärkkelys",
        "right": "glukoosi"
      },
      {
        "left": "proteiini",
        "right": "aminohapot"
      },
      {
        "left": "triglyseridi",
        "right": "glyseroli + rasvahapot."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-HYD-024",
    "contentId": "KE04-HYD-024",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Hiilihydraattien hydrolyysi",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi polysakkaridin täydelliseen hydrolyysiin tarvitaan useita vesimolekyylejä?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Koska jokaisen katkaistavan glykosidisidoksen hydrolyysiin osallistuu vesimolekyyli; pitkässä ketjussa sidoksia on paljon.",
    "scoring": "3 p: monta sidosta 1 p, yksi vesi/sidos 1 p, pitkä ketju 1 p.",
    "hints": [
      "Laske sidoksia, älä monomeereja.",
      "Ketjussa n yksikköä → yleensä n−1 sidosta."
    ],
    "skills": [
      "ke04.hyd.hiilihydraattien_hydrolyysi",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Hiilihydraattien hydrolyysi",
      "ke04.hyd.hiilihydraattien_hydrolyysi"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
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
    "seedKey": "ke04-v3:KE04-HYD-025",
    "contentId": "KE04-HYD-025",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Hiilihydraattien hydrolyysi",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Suora oligosakkaridi koostuu kuudesta monosakkaridiyksiköstä. Kuinka monta glykosidisidosta siinä on ja montako H₂O:ta täydellinen hydrolyysi kuluttaa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Viisi glykosidisidosta ja viisi H₂O-molekyyliä.",
    "scoring": "3 p: 5 sidosta 1 p, 5 H₂O 1 p, n−1-perustelu 1 p.",
    "hints": [
      "Piirrä kuusi yksikköä jonoon.",
      "Sidoksia on yksi vähemmän kuin yksiköitä."
    ],
    "skills": [
      "ke04.hyd.hiilihydraattien_hydrolyysi",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Hiilihydraattien hydrolyysi",
      "ke04.hyd.hiilihydraattien_hydrolyysi"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
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
    "seedKey": "ke04-v3:KE04-HYD-026",
    "contentId": "KE04-HYD-026",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Hapan ja emäksinen hydrolyysi – perusvertailu",
    "questionType": "recognition",
    "difficulty": 2,
    "prompt": "Mikä on emäksisen esterin hydrolyysin karboksyylihappo-osan tavallinen muoto emäksisessä liuoksessa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Karboksylaatti-ioni tai sen suola, RCOO⁻.",
    "scoring": "2 p.",
    "hints": [
      "Emäs poistaa protonin karboksyylihapolta.",
      "COOH → COO⁻."
    ],
    "skills": [
      "ke04.hyd.hapan_ja_emaksinen_hydrolyysi_perusvertailu",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Hapan ja emäksinen hydrolyysi – perusvertailu",
      "ke04.hyd.hapan_ja_emaksinen_hydrolyysi_perusvertailu"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
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
    "seedKey": "ke04-v3:KE04-HYD-027",
    "contentId": "KE04-HYD-027",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Hapan ja emäksinen hydrolyysi – perusvertailu",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Triglyseridin emäksistä hydrolyysiä kutsutaan usein",
    "options": [
      "saippuoitumiseksi",
      "hydraukseksi",
      "polymeroitumiseksi",
      "eliminaatioksi"
    ],
    "correctAnswer": "saippuoitumiseksi",
    "explanation": "A, saippuoitumiseksi.",
    "scoring": "1 p.",
    "hints": [
      "Rasvoista voidaan valmistaa saippuaa.",
      "Emäksinen hydrolyysi tuottaa rasvahapposuoloja."
    ],
    "skills": [
      "ke04.hyd.hapan_ja_emaksinen_hydrolyysi_perusvertailu",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Hapan ja emäksinen hydrolyysi – perusvertailu",
      "ke04.hyd.hapan_ja_emaksinen_hydrolyysi_perusvertailu"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "hydrolysis.water_as_reactant",
      "hydrolysis.saponification"
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
    "seedKey": "ke04-v3:KE04-HYD-028",
    "contentId": "KE04-HYD-028",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Hapan ja emäksinen hydrolyysi – perusvertailu",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi rasvahappojen suoloja voi muodostua triglyseridin emäksisessä hydrolyysissä?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Esterisidokset hydrolysoituvat ja syntyvät karboksyylihappo-osat deprotonoituvat emäksisissä oloissa karboksylaatti-ioneiksi, jotka muodostavat suoloja kationien kanssa.",
    "scoring": "4 p: hydrolyysi 1 p, deprotonoituminen 1 p, karboksylaatti 1 p, suola 1 p.",
    "hints": [
      "Mieti karboksyylihapon käyttäytymistä emäksessä.",
      "RCOOH → RCOO⁻."
    ],
    "skills": [
      "ke04.hyd.hapan_ja_emaksinen_hydrolyysi_perusvertailu",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Hapan ja emäksinen hydrolyysi – perusvertailu",
      "ke04.hyd.hapan_ja_emaksinen_hydrolyysi_perusvertailu"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
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
    "seedKey": "ke04-v3:KE04-HYD-029",
    "contentId": "KE04-HYD-029",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Hapan ja emäksinen hydrolyysi – perusvertailu",
    "questionType": "matching",
    "difficulty": 3,
    "prompt": "Yhdistä olosuhde ja esterin happo-osan muoto: hapan/vesipitoinen; vahvasti emäksinen ↔ karboksyylihappo RCOOH; karboksylaatti RCOO⁻.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Hapan/vesipitoinen → RCOOH; emäksinen → RCOO⁻.",
    "scoring": "2 p.",
    "hints": [
      "Emäs suosii deprotonoitunutta muotoa.",
      "Happamassa protonoitu muoto."
    ],
    "skills": [
      "ke04.hyd.hapan_ja_emaksinen_hydrolyysi_perusvertailu",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Hapan ja emäksinen hydrolyysi – perusvertailu",
      "ke04.hyd.hapan_ja_emaksinen_hydrolyysi_perusvertailu"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
    ],
    "estimatedSeconds": 155,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "Hapan/vesipitoinen",
        "right": "RCOOH"
      },
      {
        "left": "emäksinen",
        "right": "RCOO⁻."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-HYD-030",
    "contentId": "KE04-HYD-030",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Hapan ja emäksinen hydrolyysi – perusvertailu",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Esteri RCOOR' hydrolysoidaan NaOH-liuoksessa. Mitkä orgaaniset tuotetyypit odotetaan?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Alkoholi R'OH ja natriumkarboksylaatti RCOO⁻Na⁺.",
    "scoring": "3 p: alkoholi 1 p, karboksylaatti 1 p, Na⁺-suola 1 p.",
    "hints": [
      "Esteri → alkoholi + happo-osa.",
      "Emäs muuttaa happo-osan suolaksi."
    ],
    "skills": [
      "ke04.hyd.hapan_ja_emaksinen_hydrolyysi_perusvertailu",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Hapan ja emäksinen hydrolyysi – perusvertailu",
      "ke04.hyd.hapan_ja_emaksinen_hydrolyysi_perusvertailu"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
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
    "seedKey": "ke04-v3:KE04-HYD-031",
    "contentId": "KE04-HYD-031",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Hydrolyysi rakenteen tunnistamisessa",
    "questionType": "recognition",
    "difficulty": 2,
    "prompt": "Hydrolyysissä saadaan metanolia ja etaanihappoa. Mikä esteri oli todennäköinen lähtöaine?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Metyylietanaatti CH₃COOCH₃.",
    "scoring": "3 p: metyyliosa 1 p, etanoaattiosa 1 p, oikea esteri 1 p.",
    "hints": [
      "Alkoholi antaa esterin alkyyliosan.",
      "Happo antaa happo-osan."
    ],
    "skills": [
      "ke04.hyd.hydrolyysi_rakenteen_tunnistamisessa",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Hydrolyysi rakenteen tunnistamisessa",
      "ke04.hyd.hydrolyysi_rakenteen_tunnistamisessa"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
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
    "seedKey": "ke04-v3:KE04-HYD-032",
    "contentId": "KE04-HYD-032",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Hydrolyysi rakenteen tunnistamisessa",
    "questionType": "recognition",
    "difficulty": 3,
    "prompt": "Hydrolyysissä saadaan propan-1-olia ja metaanihappoa. Nimeä lähtöesteri.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Propyylimetanaatti.",
    "scoring": "3 p.",
    "hints": [
      "Alkoholi → propyyli.",
      "Metaanihappo → metanaatti."
    ],
    "skills": [
      "ke04.hyd.hydrolyysi_rakenteen_tunnistamisessa",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Hydrolyysi rakenteen tunnistamisessa",
      "ke04.hyd.hydrolyysi_rakenteen_tunnistamisessa"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
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
    "seedKey": "ke04-v3:KE04-HYD-033",
    "contentId": "KE04-HYD-033",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Hydrolyysi rakenteen tunnistamisessa",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Tuntematon aine hydrolysoituu etanoliksi ja propaanihapoksi. Kirjoita esterin nimi ja mahdollinen rakennekaava.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Etyylipropanaatti, CH₃CH₂COOCH₂CH₃.",
    "scoring": "4 p: nimi 2 p, rakenne 2 p.",
    "hints": [
      "Happo-osan kolme hiiltä → propanaatti.",
      "Alkoholi etanoli → etyyli."
    ],
    "skills": [
      "ke04.hyd.hydrolyysi_rakenteen_tunnistamisessa",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Hydrolyysi rakenteen tunnistamisessa",
      "ke04.hyd.hydrolyysi_rakenteen_tunnistamisessa"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
    ],
    "estimatedSeconds": 271,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Soveltaminen"
  },
  {
    "seedKey": "ke04-v3:KE04-HYD-034",
    "contentId": "KE04-HYD-034",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Hydrolyysi rakenteen tunnistamisessa",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija saa hydrolyysituotteiksi butanolia ja etaanihappoa mutta nimeää lähtöaineen etyylibutanaatiksi. Mikä on oikein?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Oikea nimi on butyylietanaatti: alkoholi antaa butyyliosan ja karboksyylihappo etanaattiosan.",
    "scoring": "3 p: butyyli 1 p, etanaatti 1 p, oikea nimi 1 p.",
    "hints": [
      "Esterin nimen ensimmäinen osa tulee alkoholista.",
      "Toinen osa haposta."
    ],
    "skills": [
      "ke04.hyd.hydrolyysi_rakenteen_tunnistamisessa",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Hydrolyysi rakenteen tunnistamisessa",
      "ke04.hyd.hydrolyysi_rakenteen_tunnistamisessa"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "hydrolysis.water_as_reactant"
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
    "seedKey": "ke04-v3:KE04-HYD-035",
    "contentId": "KE04-HYD-035",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Hydrolyysi rakenteen tunnistamisessa",
    "questionType": "simulation",
    "difficulty": 4,
    "prompt": "Yhdisteessä on kaksi esterisidosta. Täydellinen hydrolyysi tuottaa yhden diolin ja kaksi karboksyylihappomolekyyliä. Selitä rakenteesta tehtävä päätelmä.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Lähtöaineessa diolin kaksi OH-ryhmää olivat esteröityneet kahdella karboksyylihappo-osalla. Kaksi esterisidosta vaatii kaksi hydrolyysitapahtumaa ja palauttaa diolin sekä kaksi happo-osaa.",
    "scoring": "4 p: diolin kaksi kohtaa 1 p, kaksi esteriä 1 p, kaksi hydrolyysiä 1 p, tuotteiden yhteys 1 p.",
    "hints": [
      "Tee esteröityminen mielessä takaperin.",
      "Kaksi esterisidosta = kaksi liitoskohtaa",
      "Ratkaise osa-alueet erikseen ja yhdistä ne vasta lopulliseen perusteltuun vastaukseen.."
    ],
    "skills": [
      "ke04.hyd.hydrolyysi_rakenteen_tunnistamisessa",
      "task.integroiva_tehtava"
    ],
    "expectedConcepts": [
      "Hydrolyysi rakenteen tunnistamisessa",
      "ke04.hyd.hydrolyysi_rakenteen_tunnistamisessa"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
    ],
    "estimatedSeconds": 529,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Integroiva tehtävä"
  },
  {
    "seedKey": "ke04-v3:KE04-HYD-036",
    "contentId": "KE04-HYD-036",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Kokonaisuuksien vertailu ja soveltaminen",
    "questionType": "matching",
    "difficulty": 2,
    "prompt": "Yhdistä hydrolysoituva sidos ja tuoteryhmä: esterisidos, peptidisidos, glykosidisidos ↔ alkoholi+happo; aminohapot; monosakkaridit.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Esterisidos → alkoholi+happo; peptidisidos → aminohapot; glykosidisidos → monosakkaridit.",
    "scoring": "3 p.",
    "hints": [
      "Tunnista kunkin sidoksen rakennusyksiköt.",
      "Hydrolyysi palauttaa monomeerityyppejä."
    ],
    "skills": [
      "ke04.hyd.kokonaisuuksien_vertailu_ja_soveltaminen",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Kokonaisuuksien vertailu ja soveltaminen",
      "ke04.hyd.kokonaisuuksien_vertailu_ja_soveltaminen"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
    ],
    "estimatedSeconds": 133,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "Esterisidos",
        "right": "alkoholi+happo"
      },
      {
        "left": "peptidisidos",
        "right": "aminohapot"
      },
      {
        "left": "glykosidisidos",
        "right": "monosakkaridit."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-HYD-037",
    "contentId": "KE04-HYD-037",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Kokonaisuuksien vertailu ja soveltaminen",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi hydrolyysiä voidaan käyttää suuren molekyylin rakenteen tutkimiseen?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Hydrolyysi katkaisee tiettyjä sidoksia ja vapauttaa pienempiä rakenneosia. Tuotteiden tunnistaminen antaa tietoa alkuperäisen molekyylin monomeereista ja sidostyypeistä.",
    "scoring": "3 p: sidosten katkaisu 1 p, tuotteet 1 p, rakennepäätelmä 1 p.",
    "hints": [
      "Mitä tuotteet kertovat lähtöaineesta?",
      "Ajattele biomolekyylien tunnistamista."
    ],
    "skills": [
      "ke04.hyd.kokonaisuuksien_vertailu_ja_soveltaminen",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Kokonaisuuksien vertailu ja soveltaminen",
      "ke04.hyd.kokonaisuuksien_vertailu_ja_soveltaminen"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
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
    "seedKey": "ke04-v3:KE04-HYD-038",
    "contentId": "KE04-HYD-038",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Kokonaisuuksien vertailu ja soveltaminen",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Väite: 'Jos aine hydrolysoituu, se on aina polymeeri.' Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Väärin. Myös pienet molekyylit, kuten yksittäiset esterit tai amidit, voivat hydrolysoitua. Polymeerisyys ei ole hydrolyysin ehto.",
    "scoring": "3 p: väärin 1 p, pieni hydrolysoituva yhdiste 1 p, polymeerisyys ei ehto 1 p.",
    "hints": [
      "Ajattele etyylietanaattia.",
      "Siinä on vain yksi esterisidos."
    ],
    "skills": [
      "ke04.hyd.kokonaisuuksien_vertailu_ja_soveltaminen",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Kokonaisuuksien vertailu ja soveltaminen",
      "ke04.hyd.kokonaisuuksien_vertailu_ja_soveltaminen"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "hydrolysis.water_as_reactant"
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
    "seedKey": "ke04-v3:KE04-HYD-039",
    "contentId": "KE04-HYD-039",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Kokonaisuuksien vertailu ja soveltaminen",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Näyte hydrolysoituu ja tuottaa glyserolia, rasvahapposuoloja ja ei aminohappoja. Päättele lähtöaineen pääryhmä ja olosuhteen luonne.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Lähtöaine on rasva/triglyseridi ja olosuhde on emäksinen hydrolyysi eli saippuoituminen.",
    "scoring": "4 p: triglyseridi 2 p, emäksinen 1 p, saippuoituminen 1 p.",
    "hints": [
      "Glyseroli viittaa rasvaan.",
      "Suolat viittaavat emäkseen",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "ke04.hyd.kokonaisuuksien_vertailu_ja_soveltaminen",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Kokonaisuuksien vertailu ja soveltaminen",
      "ke04.hyd.kokonaisuuksien_vertailu_ja_soveltaminen"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
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
    "seedKey": "ke04-v3:KE04-HYD-040",
    "contentId": "KE04-HYD-040",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "Kokonaisuuksien vertailu ja soveltaminen",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "Vertaa esterin kondensaatiota ja hydrolyysiä lähtöaineiden, tuotteiden, sidoksen ja veden roolin kannalta.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kondensaatiossa alkoholi + karboksyylihappo muodostavat esterin ja vettä; esterisidos syntyy. Hydrolyysissä esteri + vesi tuottavat alkoholin ja happo-osan; esterisidos katkeaa. Reaktiot ovat vastakkaissuuntaisia periaatteita.",
    "scoring": "6 p: kondensaation lähtöaineet 1 p, esteri 1 p, vesi syntyy 1 p, hydrolyysin esteri+vesi 1 p, tuotteet 1 p, sidoksen katkeaminen 1 p.",
    "hints": [
      "Tee kaksi nuolta vastakkaisiin suuntiin.",
      "Seuraa esterisidosta ja vettä",
      "Ratkaise osa-alueet erikseen ja yhdistä ne vasta lopulliseen perusteltuun vastaukseen.."
    ],
    "skills": [
      "ke04.hyd.kokonaisuuksien_vertailu_ja_soveltaminen",
      "task.integroiva_vertailu"
    ],
    "expectedConcepts": [
      "Kokonaisuuksien vertailu ja soveltaminen",
      "ke04.hyd.kokonaisuuksien_vertailu_ja_soveltaminen"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
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
    "seedKey": "ke04-v3:KE04-HYD-X01",
    "contentId": "KE04-HYD-X01",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "short_answer",
    "difficulty": 4,
    "prompt": "Etyylietanaatti hydrolysoidaan vedessä. a) Nimeä tuotteet. b) Kirjoita reaktio kaavana. c) Selitä, miten tämä liittyy esteröitymiseen.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Etanoli ja etaanihappo: CH₃COOCH₂CH₃+H₂O⇌CH₃COOH+CH₃CH₂OH. Se on esteröitymisen vastakkainen rakenneperiaate: esterisidos katkeaa veden avulla.",
    "scoring": "8 p: tuotteet 2 p; yhtälö 4 p; vastareaktioperiaate 2 p.",
    "hints": [
      "Palauta esterin alkoholi- ja happo-osat.",
      "Vesi kulutetaan",
      "Piirrä tarvittaessa lähtö- ja tuoterakenne rinnakkain ja seuraa, mitkä sidokset muuttuvat.."
    ],
    "skills": [
      "hydrolysis.ester",
      "reverse_condensation"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "hydrolysis.ester",
      "reverse_condensation"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
    ],
    "estimatedSeconds": 154,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 8,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Esterihydrolyysi"
  },
  {
    "seedKey": "ke04-v3:KE04-HYD-X02",
    "contentId": "KE04-HYD-X02",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "multiple_choice",
    "difficulty": 4,
    "prompt": "Mikä kuvaa oikein hydrolyysiä?",
    "options": [
      "H₂O syntyy aina sivutuotteena",
      "H₂O osallistuu sidoksen katkaisemiseen",
      "C=C syntyy aina",
      "kaikki hydrolysoituvat aineet ovat polymeerejä"
    ],
    "correctAnswer": "H₂O osallistuu sidoksen katkaisemiseen",
    "explanation": "B.",
    "scoring": "4 p: B 1 p; veden rooli 2 p; muun yleistyksen kumoaminen 1 p.",
    "hints": [
      "Hydro viittaa veteen.",
      "Vertaa kondensaatioon",
      "Sulje pois vaihtoehdot vertaamalla jokaista niistä reaktioyhtälöön, rakenteeseen tai määritelmään.."
    ],
    "skills": [
      "hydrolysis.core_concept"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "hydrolysis.core_concept"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_product",
      "hydrolysis_only_polymers"
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
    "seedKey": "ke04-v3:KE04-HYD-X03",
    "contentId": "KE04-HYD-X03",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "short_answer",
    "difficulty": 4,
    "prompt": "Yksi triglyseridi hydrolysoituu täydellisesti. a) Kuinka monta esterisidosta katkeaa? b) Kuinka monta H₂O-molekyyliä kuluu ideaalisti? c) Mitkä orgaaniset tuotetyypit syntyvät happamissa/vesipitoisissa oloissa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kolme esterisidosta, kolme H₂O:ta, glyseroli ja kolme rasvahappoa.",
    "scoring": "6 p: 3 sidosta 2 p; 3 vettä 2 p; tuotteet 2 p.",
    "hints": [
      "Triglyseridissä on kolme rasvahappoa glyserolissa.",
      "Yksi hydrolyysi per esterisidos",
      "Piirrä tarvittaessa lähtö- ja tuoterakenne rinnakkain ja seuraa, mitkä sidokset muuttuvat.."
    ],
    "skills": [
      "hydrolysis.triglyceride",
      "bond_count"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "hydrolysis.triglyceride",
      "bond_count"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
    ],
    "estimatedSeconds": 154,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 6,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Rasvan hydrolyysi"
  },
  {
    "seedKey": "ke04-v3:KE04-HYD-X04",
    "contentId": "KE04-HYD-X04",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "short_answer",
    "difficulty": 4,
    "prompt": "Pentapeptidi hydrolysoidaan täydellisesti. a) Kuinka monta peptidisidosta katkeaa? b) Kuinka monta vesimolekyyliä kuluu? c) Kuinka monta aminohappomolekyyliä vapautuu?",
    "options": [],
    "correctAnswer": null,
    "explanation": "4 peptidisidosta, 4 H₂O:ta ja 5 aminohappoa.",
    "scoring": "6 p: 2 p / kohta.",
    "hints": [
      "n aminohappoa suorassa ketjussa → n−1 sidosta.",
      "Täydellinen hydrolyysi palauttaa kaikki monomeerit",
      "Piirrä tarvittaessa lähtö- ja tuoterakenne rinnakkain ja seuraa, mitkä sidokset muuttuvat.."
    ],
    "skills": [
      "hydrolysis.peptide",
      "counting"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "hydrolysis.peptide",
      "counting"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
    ],
    "estimatedSeconds": 154,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 6,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Peptidihydrolyysi"
  },
  {
    "seedKey": "ke04-v3:KE04-HYD-X05",
    "contentId": "KE04-HYD-X05",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "error_detection",
    "difficulty": 5,
    "prompt": "Opiskelija sanoo, että proteiinin denaturoituminen on sama kuin täydellinen hydrolyysi. Vertaa ilmiöitä sidosten ja rakennetason avulla.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Denaturoituminen muuttaa pääasiassa proteiinin korkeampia rakennetasoja ja heikkoja vuorovaikutuksia ilman, että peptidisidokset välttämättä katkeavat. Hydrolyysi katkaisee peptidisidoksia ja pilkkoo primäärirakenteen pienemmiksi peptideiksi/aminohapoiksi.",
    "scoring": "8 p: denaturaatio 4 p; hydrolyysi 4 p.",
    "hints": [
      "Kysy säilyykö aminohappojärjestys.",
      "Peptidisidos kuuluu primäärirakenteeseen",
      "Nimeä ensin väärä kemiallinen periaate ja vasta sitten sen vaikutus lopputulokseen.."
    ],
    "skills": [
      "hydrolysis_vs_denaturation",
      "protein_structure"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "hydrolysis_vs_denaturation",
      "protein_structure"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "denaturation_equals_hydrolysis"
    ],
    "estimatedSeconds": 248,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 8,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Virheen analyysi"
  },
  {
    "seedKey": "ke04-v3:KE04-HYD-X06",
    "contentId": "KE04-HYD-X06",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "recognition",
    "difficulty": 5,
    "prompt": "Tuntemattoman yhdisteen hydrolyysi tuottaa metanolia ja propaanihappoa. a) Päättele lähtöyhdisteen nimi. b) Kirjoita tiivistetty rakennekaava. c) Nimeä hydrolysoituva sidostyyppi.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Metyylipropanaatti, CH₃CH₂COOCH₃. Hydrolysoituva sidos kuuluu esterisidokseen.",
    "scoring": "7 p: nimi 2 p; rakenne 3 p; esterisidos 2 p.",
    "hints": [
      "Alkoholi antaa esterin alkyyliosan.",
      "Happo antaa -aatti-osan",
      "Piirrä tarvittaessa lähtö- ja tuoterakenne rinnakkain ja seuraa, mitkä sidokset muuttuvat.."
    ],
    "skills": [
      "hydrolysis.product_to_ester",
      "naming",
      "structure"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "hydrolysis.product_to_ester",
      "naming",
      "structure"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
    ],
    "estimatedSeconds": 124,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 7,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Rakennetunnistus tuotteista"
  },
  {
    "seedKey": "ke04-v3:KE04-HYD-X07",
    "contentId": "KE04-HYD-X07",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "Triglyseridi hydrolysoidaan NaOH-liuoksessa. a) Mitkä tuotetyypit syntyvät? b) Miksi rasvahappo-osat eivät ole pääasiassa RCOOH-muodossa? c) Kuinka monta mol NaOH:ta tarvitaan ideaalisti 0,200 mol triglyseridiä kohti, jos kolme esterisidosta hydrolysoituu?",
    "options": [],
    "correctAnswer": null,
    "explanation": "a) Glyseroli ja rasvahappojen natriumsuolat RCOO⁻Na⁺. b) Emäksissä karboksyylihapot deprotonoituvat karboksylaateiksi. c) 3 mol NaOH per mol triglyseridi →0,600 mol.",
    "scoring": "10 p: tuotteet 3 p; emäksisyys/karboksylaatti 3 p; stoikiometria 4 p.",
    "hints": [
      "Kolme esterisidosta.",
      "Karboksyylihappo emäksessä →karboksylaatti",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "hydrolysis.saponification",
      "acid_base",
      "stoichiometry"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "hydrolysis.saponification",
      "acid_base",
      "stoichiometry"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 10,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Koereservi – saippuoituminen"
  },
  {
    "seedKey": "ke04-v3:KE04-HYD-X08",
    "contentId": "KE04-HYD-X08",
    "chapter": 13,
    "topicName": "Hydrolyysireaktiot",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "Kolme tuntematonta makromolekyyliä hydrolysoidaan. X antaa vain glukoosia, Y aminohappoja, Z glyserolia ja pitkäketjuisia karboksyylihappoja. Tunnista todennäköiset biomolekyyliryhmät ja hydrolysoituvat sidostyypit.",
    "options": [],
    "correctAnswer": null,
    "explanation": "X polysakkaridi → glykosidisidokset; Y proteiini/peptidi → peptidi/amidisidokset; Z triglyseridi/rasva → esterisidokset.",
    "scoring": "12 p: jokaisesta ryhmä 2 p + sidos 2 p.",
    "hints": [
      "Glukoosi viittaa hiilihydraatteihin.",
      "Aminohapot proteiineihin.",
      "Glyseroli+rasvahapot rasvoihin."
    ],
    "skills": [
      "hydrolysis.identification",
      "biomolecule_bonds"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "hydrolysis.identification",
      "biomolecule_bonds"
    ],
    "prerequisites": [
      "functional_groups",
      "bond_types",
      "condensation"
    ],
    "commonErrors": [
      "water_as_reactant",
      "hydrolysis_products"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 12,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Koereservi – aineistopäättely"
  }
];
