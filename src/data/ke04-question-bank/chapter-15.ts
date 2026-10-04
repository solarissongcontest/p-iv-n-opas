import type { Ke04SeedQuestion } from "./types";

export const questions: Ke04SeedQuestion[] = [
  {
    "seedKey": "ke04-v3:KE04-BIO-001",
    "contentId": "KE04-BIO-001",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Funktionaaliset ryhmät biomolekyyleissä",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Nimeä kaksi biomolekyyleissä yleistä funktionaalista ryhmää ja kerro yksi biomolekyyliryhmä, jossa kumpaakin esiintyy.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Esim. hydroksyyliryhmä – hiilihydraatit; karboksyyliryhmä – rasvahapot tai aminohapot.",
    "scoring": "2 p: 1 p / oikein nimetty ryhmä + sopiva esimerkki.",
    "hints": [
      "Mieti ryhmiä –OH, –COOH ja –NH₂.",
      "Yhdistä ryhmä tuttuun biomolekyyliin."
    ],
    "skills": [
      "ke04.bio.funktionaaliset_ryhmat_biomolekyyleissa",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Funktionaaliset ryhmät biomolekyyleissä",
      "ke04.bio.funktionaaliset_ryhmat_biomolekyyleissa"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
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
    "seedKey": "ke04-v3:KE04-BIO-002",
    "contentId": "KE04-BIO-002",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Funktionaaliset ryhmät biomolekyyleissä",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Mikä funktionaalinen ryhmä tekee karboksyylihapoista happoja?",
    "options": [
      "hydroksyyli",
      "karboksyyli",
      "aminoryhmä",
      "eetteriryhmä"
    ],
    "correctAnswer": "karboksyyli",
    "explanation": "B, karboksyyliryhmä –COOH.",
    "scoring": "1 p oikeasta vaihtoehdosta.",
    "hints": [
      "Ryhmän nimessä on vihje.",
      "Etsi –COOH."
    ],
    "skills": [
      "ke04.bio.funktionaaliset_ryhmat_biomolekyyleissa",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Funktionaaliset ryhmät biomolekyyleissä",
      "ke04.bio.funktionaaliset_ryhmat_biomolekyyleissa"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "bio.common_misconception"
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
    "seedKey": "ke04-v3:KE04-BIO-003",
    "contentId": "KE04-BIO-003",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Funktionaaliset ryhmät biomolekyyleissä",
    "questionType": "matching",
    "difficulty": 2,
    "prompt": "Yhdistä ryhmät ja ominaisuus: hydroksyyli, karboksyyli, amino, esteri ↔ voi muodostaa vetysidoksia; voi luovuttaa protonin; voi vastaanottaa protonin; syntyy usein alkoholin ja karboksyylihapon kondensaatiossa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Hydroksyyli → voi muodostaa vetysidoksia; karboksyyli → voi luovuttaa protonin; amino → voi vastaanottaa protonin; esteri → syntyy usein alkoholin ja karboksyylihapon kondensaatiossa.",
    "scoring": "4 p, 1 p / oikea pari.",
    "hints": [
      "Tunnista happo-emäsluonne.",
      "Esteri liittyy kondensaatioon."
    ],
    "skills": [
      "ke04.bio.funktionaaliset_ryhmat_biomolekyyleissa",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Funktionaaliset ryhmät biomolekyyleissä",
      "ke04.bio.funktionaaliset_ryhmat_biomolekyyleissa"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
    ],
    "estimatedSeconds": 133,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "Hydroksyyli",
        "right": "voi muodostaa vetysidoksia"
      },
      {
        "left": "karboksyyli",
        "right": "voi luovuttaa protonin"
      },
      {
        "left": "amino",
        "right": "voi vastaanottaa protonin"
      },
      {
        "left": "esteri",
        "right": "syntyy usein alkoholin ja karboksyylihapon kondensaatiossa."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-BIO-004",
    "contentId": "KE04-BIO-004",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Funktionaaliset ryhmät biomolekyyleissä",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi runsaasti hydroksyyliryhmiä sisältävä pieni molekyyli on usein hyvin vesiliukoinen?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Hydroksyyliryhmät ovat poolisia ja voivat muodostaa vetysidoksia vesimolekyylien kanssa, mikä suosii liukenemista.",
    "scoring": "3 p: poolisuus 1 p, vetysidokset 1 p, yhteys liukoisuuteen 1 p.",
    "hints": [
      "Vertaa veden poolisuuteen.",
      "Mieti vetysidoksia."
    ],
    "skills": [
      "ke04.bio.funktionaaliset_ryhmat_biomolekyyleissa",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Funktionaaliset ryhmät biomolekyyleissä",
      "ke04.bio.funktionaaliset_ryhmat_biomolekyyleissa"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
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
    "seedKey": "ke04-v3:KE04-BIO-005",
    "contentId": "KE04-BIO-005",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Funktionaaliset ryhmät biomolekyyleissä",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija väittää: 'Kaikki biomolekyylit ovat poolisia, koska ne sisältävät happea.' Mikä väitteessä on vikana?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Pelkkä happiatomin esiintyminen ei tee koko molekyylistä voimakkaasti poolista. Esimerkiksi pitkissä rasvahapoissa suuri hiilivetyrunko on pooliton ja voi hallita ominaisuuksia.",
    "scoring": "3 p: väärän yleistyksen tunnistus 1 p, hiilivetyrungon merkitys 1 p, esimerkki 1 p.",
    "hints": [
      "Tarkastele koko molekyylin rakennetta.",
      "Mieti rasvahapon pitkää hiilivetyketjua."
    ],
    "skills": [
      "ke04.bio.funktionaaliset_ryhmat_biomolekyyleissa",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Funktionaaliset ryhmät biomolekyyleissä",
      "ke04.bio.funktionaaliset_ryhmat_biomolekyyleissa"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule.polarity"
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
    "seedKey": "ke04-v3:KE04-BIO-006",
    "contentId": "KE04-BIO-006",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Monosakkaridit ja glukoosi",
    "questionType": "short_answer",
    "difficulty": 1,
    "prompt": "Mikä monosakkaridi on solujen keskeinen energianlähde ja mikä on sen molekyylikaava?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Glukoosi, C₆H₁₂O₆.",
    "scoring": "2 p: nimi 1 p, kaava 1 p.",
    "hints": [
      "Kyseessä on rypälesokeri.",
      "Kaavassa hiiliä on kuusi."
    ],
    "skills": [
      "ke04.bio.monosakkaridit_ja_glukoosi",
      "task.vapaa_palautus"
    ],
    "expectedConcepts": [
      "Monosakkaridit ja glukoosi",
      "ke04.bio.monosakkaridit_ja_glukoosi"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
    ],
    "estimatedSeconds": 98,
    "examEligible": false,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Vapaa palautus"
  },
  {
    "seedKey": "ke04-v3:KE04-BIO-007",
    "contentId": "KE04-BIO-007",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Monosakkaridit ja glukoosi",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Miten glukoosi luokitellaan hiilihydraattina?",
    "options": [
      "polysakkaridiksi",
      "monosakkaridiksi",
      "disakkaridiksi",
      "oligosakkaridiksi"
    ],
    "correctAnswer": "monosakkaridiksi",
    "explanation": "B, glukoosi on monosakkaridi.",
    "scoring": "1 p.",
    "hints": [
      "Mono = yksi.",
      "Glukoosi on yksinkertainen sokeri."
    ],
    "skills": [
      "ke04.bio.monosakkaridit_ja_glukoosi",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Monosakkaridit ja glukoosi",
      "ke04.bio.monosakkaridit_ja_glukoosi"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule.carbohydrate_classification",
      "biomolecule.protein_bond"
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
    "seedKey": "ke04-v3:KE04-BIO-008",
    "contentId": "KE04-BIO-008",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Monosakkaridit ja glukoosi",
    "questionType": "recognition",
    "difficulty": 3,
    "prompt": "Glukoosimolekyylissä on useita hydroksyyliryhmiä. Mitä tämä kertoo sen vuorovaikutuksesta veden kanssa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Glukoosi voi muodostaa useita vetysidoksia veden kanssa ja on siksi hyvin vesiliukoinen.",
    "scoring": "2 p: vetysidokset 1 p, liukoisuus 1 p.",
    "hints": [
      "–OH on poolinen.",
      "Poolinen vuorovaikuttaa veden kanssa."
    ],
    "skills": [
      "ke04.bio.monosakkaridit_ja_glukoosi",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Monosakkaridit ja glukoosi",
      "ke04.bio.monosakkaridit_ja_glukoosi"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
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
    "seedKey": "ke04-v3:KE04-BIO-009",
    "contentId": "KE04-BIO-009",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Monosakkaridit ja glukoosi",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Selitä, miksi glukoosi liukenee veteen paremmin kuin pitkä hiilivetyketju.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Glukoosissa on useita poolisia hydroksyyliryhmiä, jotka muodostavat vetysidoksia veden kanssa. Pitkä hiilivetyketju on pääosin pooliton eikä muodosta vastaavia vuorovaikutuksia.",
    "scoring": "4 p: glukoosin rakenne 1 p, vetysidokset 1 p, hiilivedyn poolittomuus 1 p, vertailu 1 p.",
    "hints": [
      "Laske mielessä pooliset ryhmät.",
      "Vertaa molekyylien vuorovaikutuksia veden kanssa."
    ],
    "skills": [
      "ke04.bio.monosakkaridit_ja_glukoosi",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Monosakkaridit ja glukoosi",
      "ke04.bio.monosakkaridit_ja_glukoosi"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
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
    "seedKey": "ke04-v3:KE04-BIO-010",
    "contentId": "KE04-BIO-010",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Monosakkaridit ja glukoosi",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija sanoo: 'Monosakkaridi tarkoittaa molekyyliä, jossa on yksi hiiliatomi.' Korjaa väite.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Monosakkaridi tarkoittaa yksinkertaista sokeriyksikköä, jota ei voida hydrolysoida pienemmiksi hiilihydraateiksi; 'mono' viittaa yhteen sokeriyksikköön, ei yhteen hiiliatomiin.",
    "scoring": "3 p: mono-merkityksen korjaus 2 p, hydrolyysin maininta 1 p.",
    "hints": [
      "Mono viittaa yksiköiden määrään.",
      "Mieti di- ja polysakkarideja."
    ],
    "skills": [
      "ke04.bio.monosakkaridit_ja_glukoosi",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Monosakkaridit ja glukoosi",
      "ke04.bio.monosakkaridit_ja_glukoosi"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule.carbohydrate_classification"
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
    "seedKey": "ke04-v3:KE04-BIO-011",
    "contentId": "KE04-BIO-011",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Disakkaridit ja polysakkaridit",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitä syntyy, kun kaksi monosakkaridia liittyy kondensaatioreaktiossa toisiinsa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Disakkaridi ja vesimolekyyli.",
    "scoring": "2 p: disakkaridi 1 p, vesi 1 p.",
    "hints": [
      "Kondensaatiossa poistuu pieni molekyyli.",
      "Kahdesta monosakkaridista tulee di-."
    ],
    "skills": [
      "ke04.bio.disakkaridit_ja_polysakkaridit",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Disakkaridit ja polysakkaridit",
      "ke04.bio.disakkaridit_ja_polysakkaridit"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
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
    "seedKey": "ke04-v3:KE04-BIO-012",
    "contentId": "KE04-BIO-012",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Disakkaridit ja polysakkaridit",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Mikä seuraavista on polysakkaridi?",
    "options": [
      "glukoosi",
      "sakkaroosi",
      "tärkkelys",
      "glyseroli"
    ],
    "correctAnswer": "tärkkelys",
    "explanation": "C, tärkkelys.",
    "scoring": "1 p.",
    "hints": [
      "Poly tarkoittaa monia sokeriyksiköitä.",
      "Tärkkelys on glukoosiyksiköistä rakentuva polymeeri."
    ],
    "skills": [
      "ke04.bio.disakkaridit_ja_polysakkaridit",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Disakkaridit ja polysakkaridit",
      "ke04.bio.disakkaridit_ja_polysakkaridit"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule.carbohydrate_classification"
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
    "seedKey": "ke04-v3:KE04-BIO-013",
    "contentId": "KE04-BIO-013",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Disakkaridit ja polysakkaridit",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miten kondensaatio ja hydrolyysi liittyvät toisiinsa hiilihydraateissa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kondensaatiossa sokeriyksiköt liittyvät toisiinsa ja vettä poistuu. Hydrolyysissä sidos katkeaa veden avulla ja suurempi hiilihydraatti hajoaa pienemmiksi yksiköiksi.",
    "scoring": "4 p: kondensaatio 2 p, hydrolyysi 2 p.",
    "hints": [
      "Toinen rakentaa, toinen hajottaa.",
      "Seuraa veden roolia."
    ],
    "skills": [
      "ke04.bio.disakkaridit_ja_polysakkaridit",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Disakkaridit ja polysakkaridit",
      "ke04.bio.disakkaridit_ja_polysakkaridit"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
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
    "seedKey": "ke04-v3:KE04-BIO-014",
    "contentId": "KE04-BIO-014",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Disakkaridit ja polysakkaridit",
    "questionType": "matching",
    "difficulty": 3,
    "prompt": "Yhdistä: tärkkelys, selluloosa, glykogeeni ↔ kasvien energiavarasto; kasvien rakenneaine; eläinten energiavarasto.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Tärkkelys → kasvien energiavarasto; selluloosa → kasvien rakenneaine; glykogeeni → eläinten energiavarasto.",
    "scoring": "3 p, 1 p / pari.",
    "hints": [
      "Tärkkelys liittyy kasvien varastointiin.",
      "Selluloosa muodostaa soluseinää."
    ],
    "skills": [
      "ke04.bio.disakkaridit_ja_polysakkaridit",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Disakkaridit ja polysakkaridit",
      "ke04.bio.disakkaridit_ja_polysakkaridit"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
    ],
    "estimatedSeconds": 155,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "Tärkkelys",
        "right": "kasvien energiavarasto"
      },
      {
        "left": "selluloosa",
        "right": "kasvien rakenneaine"
      },
      {
        "left": "glykogeeni",
        "right": "eläinten energiavarasto."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-BIO-015",
    "contentId": "KE04-BIO-015",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Disakkaridit ja polysakkaridit",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Näyte hydrolysoidaan täydellisesti ja tuotteena havaitaan vain glukoosia. Voidaanko tästä päätellä yksiselitteisesti, oliko alkuperäinen aine tärkkelystä, selluloosaa vai glykogeenia? Perustele.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Ei voida. Kaikki kolme ovat glukoosiyksiköistä rakentuvia polysakkarideja ja voivat täydellisessä hydrolyysissä tuottaa glukoosia. Erottamiseen tarvitaan tietoa sidostyypeistä/rakenteesta tai muusta ominaisuudesta.",
    "scoring": "4 p: ei 1 p, yhteinen glukoosirakenne 2 p, lisätiedon tarve 1 p.",
    "hints": [
      "Mieti kaikkien kolmen monomeeria.",
      "Sama lopputuote ei aina paljasta alkuperäistä rakennetta",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "ke04.bio.disakkaridit_ja_polysakkaridit",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Disakkaridit ja polysakkaridit",
      "ke04.bio.disakkaridit_ja_polysakkaridit"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
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
    "seedKey": "ke04-v3:KE04-BIO-016",
    "contentId": "KE04-BIO-016",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Rasvat, glyseroli ja rasvahapot",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mistä rakenneosista tavallinen triglyseridi muodostuu?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Yhdestä glyserolimolekyylistä ja kolmesta rasvahaposta.",
    "scoring": "2 p: glyseroli 1 p, kolme rasvahappoa 1 p.",
    "hints": [
      "Nimi tri-glyseridi antaa vihjeen.",
      "Rasvahappoja on kolme."
    ],
    "skills": [
      "ke04.bio.rasvat_glyseroli_ja_rasvahapot",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Rasvat, glyseroli ja rasvahapot",
      "ke04.bio.rasvat_glyseroli_ja_rasvahapot"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
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
    "seedKey": "ke04-v3:KE04-BIO-017",
    "contentId": "KE04-BIO-017",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Rasvat, glyseroli ja rasvahapot",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Mikä sidos yhdistää rasvahapon glyseroliin triglyseridissä?",
    "options": [
      "peptidisidos",
      "esterisidos",
      "ionisidos",
      "vetysidos"
    ],
    "correctAnswer": "esterisidos",
    "explanation": "B, esterisidos.",
    "scoring": "1 p.",
    "hints": [
      "Alkoholi + karboksyylihappo.",
      "Kondensaatiotuote on esteri."
    ],
    "skills": [
      "ke04.bio.rasvat_glyseroli_ja_rasvahapot",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Rasvat, glyseroli ja rasvahapot",
      "ke04.bio.rasvat_glyseroli_ja_rasvahapot"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule.lipid_structure",
      "biomolecule.protein_bond"
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
    "seedKey": "ke04-v3:KE04-BIO-018",
    "contentId": "KE04-BIO-018",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Rasvat, glyseroli ja rasvahapot",
    "questionType": "short_answer",
    "difficulty": 3,
    "prompt": "Kuinka monta vesimolekyyliä vapautuu, kun glyseroli ja kolme rasvahappoa muodostavat yhden triglyseridin täydellisessä esteröitymisessä?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kolme H₂O-molekyyliä, koska muodostuu kolme esterisidosta.",
    "scoring": "2 p: 3 H₂O 1 p, perustelu esterisidoksilla 1 p.",
    "hints": [
      "Jokainen esterisidos syntyy kondensaatiossa.",
      "Glyserolissa on kolme –OH-ryhmää."
    ],
    "skills": [
      "ke04.bio.rasvat_glyseroli_ja_rasvahapot",
      "task.reaktio"
    ],
    "expectedConcepts": [
      "Rasvat, glyseroli ja rasvahapot",
      "ke04.bio.rasvat_glyseroli_ja_rasvahapot"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
    ],
    "estimatedSeconds": 135,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Reaktio"
  },
  {
    "seedKey": "ke04-v3:KE04-BIO-019",
    "contentId": "KE04-BIO-019",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Rasvat, glyseroli ja rasvahapot",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi triglyseridit ovat huonosti vesiliukoisia?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Niissä on pitkät poolittomat hiilivetyketjut, jotka hallitsevat molekyylin ominaisuuksia. Ne eivät muodosta veden kanssa riittävästi suotuisia poolisia vuorovaikutuksia.",
    "scoring": "3 p: pitkät hiilivetyketjut 1 p, poolittomuus 1 p, yhteys veteen 1 p.",
    "hints": [
      "Katso rasvahappojen hiilivetyketjuja.",
      "Samanlainen liuottaa samanlaista."
    ],
    "skills": [
      "ke04.bio.rasvat_glyseroli_ja_rasvahapot",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Rasvat, glyseroli ja rasvahapot",
      "ke04.bio.rasvat_glyseroli_ja_rasvahapot"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
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
    "seedKey": "ke04-v3:KE04-BIO-020",
    "contentId": "KE04-BIO-020",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Rasvat, glyseroli ja rasvahapot",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija piirtää triglyseridin, jossa glyseroliin on liittynyt vain kaksi rasvahappoa, mutta nimeää sen triglyseridiksi. Mikä on virhe?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Triglyseridissä glyserolin kaikki kolme hydroksyyliryhmää ovat esteröityneet kolmeen rasvahappoon. Kahden rasvahapon johdannainen on diglyseridi.",
    "scoring": "3 p: kolmen rasvahapon vaatimus 2 p, diglyseridi 1 p.",
    "hints": [
      "Tri = kolme.",
      "Tarkista glyserolin –OH-ryhmien määrä."
    ],
    "skills": [
      "ke04.bio.rasvat_glyseroli_ja_rasvahapot",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Rasvat, glyseroli ja rasvahapot",
      "ke04.bio.rasvat_glyseroli_ja_rasvahapot"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule.lipid_structure"
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
    "seedKey": "ke04-v3:KE04-BIO-021",
    "contentId": "KE04-BIO-021",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Tyydyttyneet ja tyydyttymättömät rasvahapot",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitä tarkoittaa, että rasvahappo on tyydyttymätön?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Sen hiilivetyketjussa on vähintään yksi hiili-hiili-kaksoissidos.",
    "scoring": "2 p.",
    "hints": [
      "Vertaa alkaaniin ja alkeeniin.",
      "Etsi C=C."
    ],
    "skills": [
      "ke04.bio.tyydyttyneet_ja_tyydyttymattomat_rasvahapot",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Tyydyttyneet ja tyydyttymättömät rasvahapot",
      "ke04.bio.tyydyttyneet_ja_tyydyttymattomat_rasvahapot"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
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
    "seedKey": "ke04-v3:KE04-BIO-022",
    "contentId": "KE04-BIO-022",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Tyydyttyneet ja tyydyttymättömät rasvahapot",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Kumpi on yleensä huoneenlämpötilassa juoksevampi, kun rasvahappoketjujen pituudet ovat muuten samankaltaisia?",
    "options": [
      "runsaasti tyydyttyneitä rasvahappoja sisältävä rasva",
      "runsaasti cis-tyydyttymättömiä rasvahappoja sisältävä rasva",
      "kumpikin aina yhtä juokseva",
      "juoksevuus riippuu vain hiiliatomien kokonaismäärästä, ei kaksoissidoksista"
    ],
    "correctAnswer": "runsaasti cis-tyydyttymättömiä rasvahappoja sisältävä rasva",
    "explanation": "B, runsaasti tyydyttymättömiä sisältävä rasva.",
    "scoring": "1 p.",
    "hints": [
      "Kaksoissidos voi tehdä ketjusta mutkaisemman.",
      "Huonompi pakkautuminen alentaa sulamispistettä."
    ],
    "skills": [
      "ke04.bio.tyydyttyneet_ja_tyydyttymattomat_rasvahapot",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Tyydyttyneet ja tyydyttymättömät rasvahapot",
      "ke04.bio.tyydyttyneet_ja_tyydyttymattomat_rasvahapot"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule.lipid_structure"
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
    "seedKey": "ke04-v3:KE04-BIO-023",
    "contentId": "KE04-BIO-023",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Tyydyttyneet ja tyydyttymättömät rasvahapot",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Selitä rakenteen avulla, miksi cis-kaksoissidokset usein alentavat rasvan sulamispistettä.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Cis-kaksoissidos tekee hiiliketjuun mutkan, jolloin ketjut pakkautuvat huonommin. Molekyylien väliset dispersiovoimat vaikuttavat keskimäärin heikommin ja sulamispiste alenee.",
    "scoring": "4 p: cis-mutka 1 p, pakkautuminen 1 p, vuorovaikutukset 1 p, sulamispiste 1 p.",
    "hints": [
      "Mieti ketjujen muotoa.",
      "Hyvä pakkautuminen yleensä nostaa sulamispistettä."
    ],
    "skills": [
      "ke04.bio.tyydyttyneet_ja_tyydyttymattomat_rasvahapot",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Tyydyttyneet ja tyydyttymättömät rasvahapot",
      "ke04.bio.tyydyttyneet_ja_tyydyttymattomat_rasvahapot"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
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
    "seedKey": "ke04-v3:KE04-BIO-024",
    "contentId": "KE04-BIO-024",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Tyydyttyneet ja tyydyttymättömät rasvahapot",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Kaksi rasvahappoa ovat yhtä pitkiä. A:ssa ei ole kaksoissidoksia, B:ssä on kaksi cis-kaksoissidosta. Kummalla odotat olevan korkeampi sulamispiste?",
    "options": [],
    "correctAnswer": null,
    "explanation": "A:lla, eli tyydyttyneellä rasvahapolla, koska suoremmat ketjut pakkautuvat tiiviimmin.",
    "scoring": "3 p: A 1 p, pakkautuminen 1 p, rakenteen perustelu 1 p.",
    "hints": [
      "Kaksoissidokset vaikuttavat muotoon.",
      "Tiiviimpi rakenne vaatii enemmän energiaa hajottaa."
    ],
    "skills": [
      "ke04.bio.tyydyttyneet_ja_tyydyttymattomat_rasvahapot",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Tyydyttyneet ja tyydyttymättömät rasvahapot",
      "ke04.bio.tyydyttyneet_ja_tyydyttymattomat_rasvahapot"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
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
    "seedKey": "ke04-v3:KE04-BIO-025",
    "contentId": "KE04-BIO-025",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Tyydyttyneet ja tyydyttymättömät rasvahapot",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Väite: 'Tyydyttymätön rasvahappo sisältää vähemmän hiiltä kuin tyydyttynyt.' Korjaa väite.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Tyydyttyneisyys ei kerro hiiliatomien määrää vaan C=C-kaksoissidosten esiintymistä. Samanpituisissa ketjuissa tyydyttymättömällä on vähemmän vetyatomeja kuin vastaavalla tyydyttyneellä.",
    "scoring": "3 p: hiilimäärän väärä tulkinta 1 p, kaksoissidos 1 p, vetymäärä 1 p.",
    "hints": [
      "Tyydyttymättömyys liittyy vetyjen määrään suhteessa sidoksiin.",
      "C=C vähentää vetyjen määrää."
    ],
    "skills": [
      "ke04.bio.tyydyttyneet_ja_tyydyttymattomat_rasvahapot",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Tyydyttyneet ja tyydyttymättömät rasvahapot",
      "ke04.bio.tyydyttyneet_ja_tyydyttymattomat_rasvahapot"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule.lipid_structure"
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
    "seedKey": "ke04-v3:KE04-BIO-026",
    "contentId": "KE04-BIO-026",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Aminohapot ja peptidisidos",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitkä kaksi funktionaalista ryhmää ovat aminohapon perusrakenteessa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Aminoryhmä –NH₂ ja karboksyyliryhmä –COOH.",
    "scoring": "2 p, 1 p / ryhmä.",
    "hints": [
      "Aminohapon nimessä on toinen ryhmä.",
      "Toinen tekee siitä hapon."
    ],
    "skills": [
      "ke04.bio.aminohapot_ja_peptidisidos",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Aminohapot ja peptidisidos",
      "ke04.bio.aminohapot_ja_peptidisidos"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
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
    "seedKey": "ke04-v3:KE04-BIO-027",
    "contentId": "KE04-BIO-027",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Aminohapot ja peptidisidos",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Mikä muodostuu kahden aminohapon kondensaatiossa?",
    "options": [
      "disakkaridi",
      "dipeptidi",
      "triglyseridi",
      "alkeeni"
    ],
    "correctAnswer": "dipeptidi",
    "explanation": "B, dipeptidi.",
    "scoring": "1 p.",
    "hints": [
      "Aminohapot muodostavat peptidejä.",
      "Kaksi aminohappoa → dipeptidi."
    ],
    "skills": [
      "ke04.bio.aminohapot_ja_peptidisidos",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Aminohapot ja peptidisidos",
      "ke04.bio.aminohapot_ja_peptidisidos"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule.lipid_structure",
      "biomolecule.protein_bond"
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
    "seedKey": "ke04-v3:KE04-BIO-028",
    "contentId": "KE04-BIO-028",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Aminohapot ja peptidisidos",
    "questionType": "short_answer",
    "difficulty": 3,
    "prompt": "Kuinka monta vesimolekyyliä vapautuu, kun viisi aminohappoa liittyy yhdeksi suoraksi peptidiketjuksi?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Neljä H₂O-molekyyliä, koska viiden monomeerin yhdistämiseen tarvitaan neljä peptidisidosta.",
    "scoring": "3 p: 4 H₂O 1 p, 4 sidosta 1 p, perustelu n−1 1 p.",
    "hints": [
      "Piirrä viisi yksikköä jonoon.",
      "Sidoksia on aina yksi vähemmän kuin monomeereja suorassa ketjussa."
    ],
    "skills": [
      "ke04.bio.aminohapot_ja_peptidisidos",
      "task.reaktio"
    ],
    "expectedConcepts": [
      "Aminohapot ja peptidisidos",
      "ke04.bio.aminohapot_ja_peptidisidos"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
    ],
    "estimatedSeconds": 135,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Reaktio"
  },
  {
    "seedKey": "ke04-v3:KE04-BIO-029",
    "contentId": "KE04-BIO-029",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Aminohapot ja peptidisidos",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miten peptidisidos syntyy kahden aminohapon välillä?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Toisen aminohapon karboksyyliryhmä reagoi toisen aminoryhmän kanssa kondensaatioreaktiossa. Vettä poistuu ja muodostuu amidisidos eli peptidisidos.",
    "scoring": "4 p: reagoivat ryhmät 2 p, kondensaatio/vesi 1 p, peptidisidos 1 p.",
    "hints": [
      "Etsi –COOH ja –NH₂.",
      "Kondensaatiossa poistuu H₂O."
    ],
    "skills": [
      "ke04.bio.aminohapot_ja_peptidisidos",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Aminohapot ja peptidisidos",
      "ke04.bio.aminohapot_ja_peptidisidos"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
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
    "seedKey": "ke04-v3:KE04-BIO-030",
    "contentId": "KE04-BIO-030",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Aminohapot ja peptidisidos",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija väittää, että proteiinin aminohapot liittyvät toisiinsa esterisidoksilla. Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Aminohapot liittyvät proteiineissa peptidisidoksilla eli amidisidoksilla. Esterisidos syntyy tyypillisesti alkoholin ja karboksyylihapon välillä, kuten rasvoissa.",
    "scoring": "3 p: peptidi/amidisidos 1 p, esteriväitteen korjaus 1 p, vertailuesimerkki 1 p.",
    "hints": [
      "Muista peptideihin liittyvän sidoksen nimi.",
      "Vertaa triglyseridiin."
    ],
    "skills": [
      "ke04.bio.aminohapot_ja_peptidisidos",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Aminohapot ja peptidisidos",
      "ke04.bio.aminohapot_ja_peptidisidos"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule.protein_bond"
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
    "seedKey": "ke04-v3:KE04-BIO-031",
    "contentId": "KE04-BIO-031",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Proteiinien rakenne ja denaturoituminen",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitä proteiinin primäärirakenne tarkoittaa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Aminohappojen järjestystä polypeptidiketjussa.",
    "scoring": "2 p.",
    "hints": [
      "Primääri = ensimmäinen rakennetaso.",
      "Ajattele aminohappojärjestystä."
    ],
    "skills": [
      "ke04.bio.proteiinien_rakenne_ja_denaturoituminen",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Proteiinien rakenne ja denaturoituminen",
      "ke04.bio.proteiinien_rakenne_ja_denaturoituminen"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
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
    "seedKey": "ke04-v3:KE04-BIO-032",
    "contentId": "KE04-BIO-032",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Proteiinien rakenne ja denaturoituminen",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Mikä kuvaa proteiinin denaturoitumista parhaiten?",
    "options": [
      "proteiinin kolmiulotteinen rakenne häiriintyy esimerkiksi kuumuuden vuoksi ilman että kaikkien peptidisidosten tarvitsee katketa",
      "kaikki peptidisidokset hydrolysoituvat aina täydellisesti aminohapoiksi",
      "proteiini muuttuu hiilihydraatiksi",
      "aminohappojen alkuainekoostumus muuttuu ilman kemiallista reaktiota"
    ],
    "correctAnswer": "proteiinin kolmiulotteinen rakenne häiriintyy esimerkiksi kuumuuden vuoksi ilman että kaikkien peptidisidosten tarvitsee katketa",
    "explanation": "A, riittävän korkea lämpötila.",
    "scoring": "1 p.",
    "hints": [
      "Denaturoituminen liittyy rakenteen häiriintymiseen.",
      "Lämpö voi rikkoa heikkoja vuorovaikutuksia."
    ],
    "skills": [
      "ke04.bio.proteiinien_rakenne_ja_denaturoituminen",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Proteiinien rakenne ja denaturoituminen",
      "ke04.bio.proteiinien_rakenne_ja_denaturoituminen"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule.denaturation_vs_hydrolysis",
      "biomolecule.protein_bond"
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
    "seedKey": "ke04-v3:KE04-BIO-033",
    "contentId": "KE04-BIO-033",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Proteiinien rakenne ja denaturoituminen",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Mitä denaturoitumisessa tapahtuu proteiinin rakenteelle, ja miksi toiminta voi hävitä?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Proteiinin korkeamman asteen rakenne muuttuu, kun sitä ylläpitäviä vuorovaikutuksia häiriintyy. Aktiivisen kohdan tai muun toiminnallisen rakenteen muoto voi muuttua, jolloin proteiini ei enää toimi normaalisti. Peptidisidokset eivät välttämättä katkea.",
    "scoring": "4 p: korkeampi rakenne 1 p, vuorovaikutukset 1 p, toiminnan yhteys muotoon 1 p, peptidisidosten säilyminen 1 p.",
    "hints": [
      "Erota primäärirakenne ja kolmiulotteinen muoto.",
      "Toiminta riippuu muodosta."
    ],
    "skills": [
      "ke04.bio.proteiinien_rakenne_ja_denaturoituminen",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Proteiinien rakenne ja denaturoituminen",
      "ke04.bio.proteiinien_rakenne_ja_denaturoituminen"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
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
    "seedKey": "ke04-v3:KE04-BIO-034",
    "contentId": "KE04-BIO-034",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Proteiinien rakenne ja denaturoituminen",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Kananmunan valkuainen muuttuu kuumennettaessa läpinäkyvästä valkoiseksi ja kiinteämmäksi. Selitä ilmiö proteiinikemian avulla.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kuumuus denaturoi valkuaisen proteiineja: niiden kolmiulotteiset rakenteet avautuvat ja proteiinit voivat muodostaa uusia vuorovaikutuksia keskenään, mikä muuttaa materiaalin rakennetta ja ulkonäköä.",
    "scoring": "4 p: denaturaatio 1 p, rakenteen avautuminen 1 p, uudet proteiini-proteiini-vuorovaikutukset 1 p, makroskooppinen seuraus 1 p.",
    "hints": [
      "Kuumuus vaikuttaa proteiinien muotoon.",
      "Mieti mitä avautuneet ketjut voivat tehdä keskenään",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "ke04.bio.proteiinien_rakenne_ja_denaturoituminen",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Proteiinien rakenne ja denaturoituminen",
      "ke04.bio.proteiinien_rakenne_ja_denaturoituminen"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
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
    "seedKey": "ke04-v3:KE04-BIO-035",
    "contentId": "KE04-BIO-035",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Proteiinien rakenne ja denaturoituminen",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Väite: 'Denaturoituminen tarkoittaa aina kaikkien peptidisidosten hydrolyysiä.' Arvioi.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Väärin. Denaturoituminen tarkoittaa yleensä proteiinin sekundääri-, tertiääri- ja/tai kvartäärirakenteen häiriintymistä ilman, että primäärirakenteen peptidisidokset välttämättä katkeavat. Hydrolyysi on eri reaktio.",
    "scoring": "4 p: väärin 1 p, korkeampien rakenteiden muutos 1 p, peptidisidokset voivat säilyä 1 p, hydrolyysin erottaminen 1 p.",
    "hints": [
      "Denaturaatio ja hydrolyysi eivät ole synonyymejä.",
      "Kysy, säilyykö aminohappojärjestys."
    ],
    "skills": [
      "ke04.bio.proteiinien_rakenne_ja_denaturoituminen",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Proteiinien rakenne ja denaturoituminen",
      "ke04.bio.proteiinien_rakenne_ja_denaturoituminen"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule.denaturation_vs_hydrolysis",
      "biomolecule.protein_bond"
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
    "seedKey": "ke04-v3:KE04-BIO-036",
    "contentId": "KE04-BIO-036",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Nukleotidit ja nukleiinihapot",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mitkä kolme rakenneosaa nukleotidissa on?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Sokeriosa, fosfaattiryhmä ja emäs.",
    "scoring": "3 p, 1 p / osa.",
    "hints": [
      "Yksi osa on fosfaatti.",
      "Loput ovat sokeri ja typpiemäs."
    ],
    "skills": [
      "ke04.bio.nukleotidit_ja_nukleiinihapot",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Nukleotidit ja nukleiinihapot",
      "ke04.bio.nukleotidit_ja_nukleiinihapot"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
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
    "seedKey": "ke04-v3:KE04-BIO-037",
    "contentId": "KE04-BIO-037",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Nukleotidit ja nukleiinihapot",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Mikä seuraavista on nukleiinihappo?",
    "options": [
      "DNA",
      "triglyseridi",
      "tärkkelys",
      "glyseroli"
    ],
    "correctAnswer": "DNA",
    "explanation": "A, DNA.",
    "scoring": "1 p.",
    "hints": [
      "Nukleiinihappoja ovat DNA ja RNA.",
      "Muut vaihtoehdot kuuluvat eri biomolekyyliryhmiin."
    ],
    "skills": [
      "ke04.bio.nukleotidit_ja_nukleiinihapot",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Nukleotidit ja nukleiinihapot",
      "ke04.bio.nukleotidit_ja_nukleiinihapot"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule.lipid_structure"
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
    "seedKey": "ke04-v3:KE04-BIO-038",
    "contentId": "KE04-BIO-038",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Nukleotidit ja nukleiinihapot",
    "questionType": "matching",
    "difficulty": 3,
    "prompt": "Yhdistä biomolekyyli ja rakennusyksikkö: proteiini, polysakkaridi, nukleiinihappo ↔ aminohappo, monosakkaridi, nukleotidi.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Proteiini → aminohappo; polysakkaridi → monosakkaridi; nukleiinihappo → nukleotidi.",
    "scoring": "3 p, 1 p / pari.",
    "hints": [
      "Peptidit rakentuvat aminohapoista.",
      "Poly-sakkaridi rakentuu sokeriyksiköistä."
    ],
    "skills": [
      "ke04.bio.nukleotidit_ja_nukleiinihapot",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Nukleotidit ja nukleiinihapot",
      "ke04.bio.nukleotidit_ja_nukleiinihapot"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
    ],
    "estimatedSeconds": 155,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "Proteiini",
        "right": "aminohappo"
      },
      {
        "left": "polysakkaridi",
        "right": "monosakkaridi"
      },
      {
        "left": "nukleiinihappo",
        "right": "nukleotidi."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-BIO-039",
    "contentId": "KE04-BIO-039",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Nukleotidit ja nukleiinihapot",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi DNA:ta voidaan kemian näkökulmasta kuvata polymeeriksi?",
    "options": [],
    "correctAnswer": null,
    "explanation": "DNA koostuu suuresta määrästä toistuvasti toisiinsa liittyneitä nukleotidimonomeereja, joten se täyttää polymeerin perusidean: suuri molekyyli rakentuu monomeeriyksiköistä.",
    "scoring": "3 p: monomeeri nukleotidi 1 p, monta yksikköä 1 p, polymeeriperustelu 1 p.",
    "hints": [
      "Määrittele polymeeri.",
      "Tunnista DNA:n monomeeri."
    ],
    "skills": [
      "ke04.bio.nukleotidit_ja_nukleiinihapot",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Nukleotidit ja nukleiinihapot",
      "ke04.bio.nukleotidit_ja_nukleiinihapot"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
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
    "seedKey": "ke04-v3:KE04-BIO-040",
    "contentId": "KE04-BIO-040",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Nukleotidit ja nukleiinihapot",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Tärkkelyksestä valmistetaan kaksi biomateriaalikalvoa samoissa olosuhteissa. Kalvossa A on enemmän glyserolia kuin kalvossa B. Jäähtymisen jälkeen A taipuu selvästi helpommin, kun taas B on jäykempi ja murtuu helpommin. a) Mitä havainto kertoo glyserolin vaikutuksesta materiaalin ominaisuuksiin? b) Miksi muiden valmistusolosuhteiden, kuten tärkkelyksen määrän ja kuumennuksen, pitää olla samat vertailussa? c) Millä yhdellä lisämittauksella vertailua voisi tehdä määrällisemmäksi?",
    "options": [],
    "correctAnswer": null,
    "explanation": "a) Tässä aineistossa suurempi glyserolimäärä liittyy joustavampaan ja vähemmän hauraaseen kalvoon; glyseroli toimii pehmittimen tavoin ja lisää ketjujen liikkumismahdollisuutta. b) Muut muuttujat pidetään samoina, jotta havaittu ero voidaan yhdistää mahdollisimman luotettavasti glyserolin määrään. c) Esimerkiksi murtovenymä, taivutukseen tarvittava voima, vetolujuus tai standardoitu taivutuskulma ennen murtumista.",
    "scoring": "8 p: aineistosta tehty glyseroli–joustavuus-päätelmä 2 p, molekyylitason/pehmittävän vaikutuksen perustelu 2 p, kontrollimuuttujien merkitys 2 p, järkevä määrällinen lisämittaus 2 p.",
    "hints": [
      "Vertaa vain sitä tekijää, joka kalvoissa tarkoituksella muuttui.",
      "Mieti, miten joustavuutta voisi mitata numerolla pelkän silmämääräisen havainnon sijaan",
      "Perustele päätelmä yhdistämällä havainto tai mittaus suoraan kemialliseen malliin.."
    ],
    "skills": [
      "biomaterial.experimental_design",
      "polymer.structure_property",
      "data.control_variables"
    ],
    "expectedConcepts": [
      "Nukleotidit ja nukleiinihapot",
      "biomaterial.experimental_design",
      "polymer.structure_property",
      "data.control_variables"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
    ],
    "estimatedSeconds": 309,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 8,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Kokeellinen biomateriaali"
  },
  {
    "seedKey": "ke04-v3:KE04-BIO-041",
    "contentId": "KE04-BIO-041",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Biomolekyylien kondensaatio, hydrolyysi ja kokonaisuuksien vertailu",
    "questionType": "matching",
    "difficulty": 2,
    "prompt": "Yhdistä muodostuva sidos ja biomolekyyli: glykosidisidos, esterisidos, peptidisidos ↔ hiilihydraatit, rasvat, proteiinit.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Glykosidisidos → hiilihydraatit; esterisidos → rasvat; peptidisidos → proteiinit.",
    "scoring": "3 p, 1 p / pari.",
    "hints": [
      "Peptidi kuuluu proteiineihin.",
      "Esteri syntyy rasvahapon ja glyserolin välillä."
    ],
    "skills": [
      "ke04.bio.biomolekyylien_kondensaatio_hydrolyysi_ja_kokonaisuuksien_vertailu",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Biomolekyylien kondensaatio, hydrolyysi ja kokonaisuuksien vertailu",
      "ke04.bio.biomolekyylien_kondensaatio_hydrolyysi_ja_kokonaisuuksien_vertailu"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
    ],
    "estimatedSeconds": 133,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "Glykosidisidos",
        "right": "hiilihydraatit"
      },
      {
        "left": "esterisidos",
        "right": "rasvat"
      },
      {
        "left": "peptidisidos",
        "right": "proteiinit."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-BIO-042",
    "contentId": "KE04-BIO-042",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Biomolekyylien kondensaatio, hydrolyysi ja kokonaisuuksien vertailu",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Mikä yhteinen kemiallinen periaate yhdistää disakkaridin, triglyseridin ja dipeptidin muodostumista?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kaikissa syntyy uusi kovalenttinen sidos kondensaatioreaktiossa ja samalla poistuu vettä. Reagoivat funktionaaliset ryhmät ja syntyvä sidos ovat eri tapauksissa erilaiset.",
    "scoring": "4 p: kondensaatio 1 p, uusi sidos 1 p, vesi 1 p, ryhmien/sidosten erilaisuus 1 p.",
    "hints": [
      "Etsi kaikista 'rakentava' reaktio.",
      "Seuraa veden muodostumista."
    ],
    "skills": [
      "ke04.bio.biomolekyylien_kondensaatio_hydrolyysi_ja_kokonaisuuksien_vertailu",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Biomolekyylien kondensaatio, hydrolyysi ja kokonaisuuksien vertailu",
      "ke04.bio.biomolekyylien_kondensaatio_hydrolyysi_ja_kokonaisuuksien_vertailu"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
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
    "seedKey": "ke04-v3:KE04-BIO-043",
    "contentId": "KE04-BIO-043",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Biomolekyylien kondensaatio, hydrolyysi ja kokonaisuuksien vertailu",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Kolme erillistä molekyyliä liittyy suoraksi ketjuksi kahdella kondensaatioreaktiolla. Kuinka monta vesimolekyyliä vapautuu?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kaksi vesimolekyyliä, yksi kutakin muodostunutta sidosta/kondensaatiota kohti.",
    "scoring": "2 p: 2 H₂O 1 p, perustelu 1 p.",
    "hints": [
      "Laske uusien sidosten määrä.",
      "Yksi kondensaatio → yksi H₂O."
    ],
    "skills": [
      "ke04.bio.biomolekyylien_kondensaatio_hydrolyysi_ja_kokonaisuuksien_vertailu",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Biomolekyylien kondensaatio, hydrolyysi ja kokonaisuuksien vertailu",
      "ke04.bio.biomolekyylien_kondensaatio_hydrolyysi_ja_kokonaisuuksien_vertailu"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
    ],
    "estimatedSeconds": 271,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 2,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Soveltaminen"
  },
  {
    "seedKey": "ke04-v3:KE04-BIO-044",
    "contentId": "KE04-BIO-044",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Biomolekyylien kondensaatio, hydrolyysi ja kokonaisuuksien vertailu",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Väite: 'Hydrolyysissä vettä syntyy, koska suuri molekyyli hajoaa.' Korjaa yleinen periaate.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Hydrolyysissä vettä kulutetaan sidoksen katkaisemiseen; kondensaatiossa vettä tyypillisesti syntyy. Hydrolyysi hajottaa suuremman molekyylin pienemmiksi osiksi veden avulla.",
    "scoring": "3 p: veden kulutus 1 p, kondensaation vertailu 1 p, hajoamisen kuvaus 1 p.",
    "hints": [
      "Sana hydro viittaa veteen.",
      "Vertaa kondensaatioon."
    ],
    "skills": [
      "ke04.bio.biomolekyylien_kondensaatio_hydrolyysi_ja_kokonaisuuksien_vertailu",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Biomolekyylien kondensaatio, hydrolyysi ja kokonaisuuksien vertailu",
      "ke04.bio.biomolekyylien_kondensaatio_hydrolyysi_ja_kokonaisuuksien_vertailu"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "bio.common_misconception"
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
    "seedKey": "ke04-v3:KE04-BIO-045",
    "contentId": "KE04-BIO-045",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "Biomolekyylien kondensaatio, hydrolyysi ja kokonaisuuksien vertailu",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "Tuntematon biomolekyyli X sisältää typpeä. Täydellisessä hydrolyysissä X tuottaa useita erilaisia aminohappoja. Ennen hydrolyysiä kuumentaminen muuttaa X:n liukoisuutta ja saa sen saostumaan, mutta aminohappokoostumus ei muutu. a) Tunnista biomolekyyliryhmä. b) Nimeä monomeerityyppi ja monomeereja yhdistävä sidos. c) Selitä, mitä hydrolyysissä tapahtuu tälle sidokselle. d) Selitä, miksi kuumennuksen aiheuttama muutos voidaan tulkita denaturoitumiseksi eikä täydelliseksi hydrolyysiksi. e) Nimeä reaktiotyyppi, jolla aminohapot liittyvät ketjuksi.",
    "options": [],
    "correctAnswer": null,
    "explanation": "a) Proteiini. b) Monomeerit ovat aminohappoja ja niitä yhdistävät peptidi- eli amidisidokset. c) Hydrolyysissä peptidisidokset katkeavat veden avulla ja ketju pilkkoutuu pienemmiksi peptideiksi/aminohapoiksi. d) Kuumennus muutti korkeampaa rakennetta ja liukoisuutta ilman, että aminohappokoostumus tai välttämättä peptidisidokset katkesivat; tämä sopii denaturoitumiseen. e) Aminohapot liittyvät kondensaatioreaktiolla.",
    "scoring": "12 p: biomolekyyliryhmä 1 p, monomeerit 2 p, peptidisidos 2 p, hydrolyysin kuvaus 3 p, denaturoitumisen erottaminen hydrolyysistä 3 p, kondensaatio 1 p.",
    "hints": [
      "Hydrolyysituotteet kertovat, mistä rakennusyksiköistä X koostuu.",
      "Kysy, katkeaako kuumennuksessa aminohappoketjun primäärirakenne vai muuttuuko pääasiassa kolmiulotteinen rakenne.",
      "Ketjun muodostumista varten yhdistä aminoryhmä ja karboksyyliryhmä."
    ],
    "skills": [
      "biomolecules.protein_identification",
      "peptide_bond",
      "hydrolysis",
      "denaturation",
      "condensation"
    ],
    "expectedConcepts": [
      "Biomolekyylien kondensaatio, hydrolyysi ja kokonaisuuksien vertailu",
      "biomolecules.protein_identification",
      "peptide_bond",
      "hydrolysis",
      "denaturation",
      "condensation"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 12,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Integroiva tehtävä"
  },
  {
    "seedKey": "ke04-v3:KE04-BIO-X01",
    "contentId": "KE04-BIO-X01",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Kolme näytettä hydrolysoidaan: A tuottaa vain glukoosia; B tuottaa aminohappoja; C tuottaa glyserolia ja rasvahappoja. Tunnista biomolekyyliryhmät ja nimeä tärkein yksiköitä yhdistävä sidostyyppi.",
    "options": [],
    "correctAnswer": null,
    "explanation": "A polysakkaridi, glykosidisidokset. B proteiini/peptidi, peptidi/amidisidokset. C triglyseridi/rasva, esterisidokset.",
    "scoring": "12 p: jokaisesta ryhmä 2 p + sidos 2 p.",
    "hints": [
      "Tuotteet paljastavat rakennusyksiköt.",
      "Glukoosi→hiilihydraatti, aminohappo→proteiini, glyseroli+rasvahapot→rasva",
      "Perustele päätelmä yhdistämällä havainto tai mittaus suoraan kemialliseen malliin.."
    ],
    "skills": [
      "biomolecules.identification",
      "hydrolysis",
      "bond_types"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "biomolecules.identification",
      "hydrolysis",
      "bond_types"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
    ],
    "estimatedSeconds": 309,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 12,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Aineistotehtävä"
  },
  {
    "seedKey": "ke04-v3:KE04-BIO-X02",
    "contentId": "KE04-BIO-X02",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "short_answer",
    "difficulty": 4,
    "prompt": "Glukoosissa on useita OH-ryhmiä, kun taas triglyseridissä on pitkät hiilivetyketjut. Selitä tämän avulla, miksi glukoosi liukenee veteen paljon paremmin.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Glukoosin monet pooliset OH-ryhmät muodostavat vetysidoksia veden kanssa. Triglyseridin pitkät hiilivetyketjut ovat pääosin poolittomia ja hallitsevat sen vuorovaikutuksia, joten vesiliukoisuus on heikko.",
    "scoring": "6 p: OH/poolisuus 2 p; vetysidokset 2 p; hiilivetyketjut 2 p.",
    "hints": [
      "Vesi on poolinen.",
      "Vertaa poolisten ryhmien määrää ja poolittoman rungon kokoa",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "biomolecules.polarity",
      "intermolecular_forces"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "biomolecules.polarity",
      "intermolecular_forces"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
    ],
    "estimatedSeconds": 154,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 6,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Rakenne–ominaisuus"
  },
  {
    "seedKey": "ke04-v3:KE04-BIO-X03",
    "contentId": "KE04-BIO-X03",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "multiple_choice",
    "difficulty": 4,
    "prompt": "Mikä väite on oikein?",
    "options": [
      "Denaturoituminen tarkoittaa aina peptidisidosten täydellistä hydrolyysiä",
      "Proteiinin toiminta voi hävitä, vaikka aminohappojärjestys säilyy",
      "Kaikki rasvat ovat hyvin vesiliukoisia",
      "Monosakkaridi tarkoittaa yhtä hiiliatomia sisältävää sokeria."
    ],
    "correctAnswer": "Proteiinin toiminta voi hävitä, vaikka aminohappojärjestys säilyy",
    "explanation": "B.",
    "scoring": "4 p: B 1 p; korkeampien rakenteiden merkitys 2 p; primäärirakenteen säilyminen 1 p.",
    "hints": [
      "Denaturaatio voi muuttaa muotoa ilman ketjun katkeamista.",
      "Toiminta riippuu kolmiulotteisesta rakenteesta",
      "Sulje pois vaihtoehdot vertaamalla jokaista niistä reaktioyhtälöön, rakenteeseen tai määritelmään.."
    ],
    "skills": [
      "biomolecules.protein_structure",
      "misconceptions"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "biomolecules.protein_structure",
      "misconceptions"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "denaturation_equals_hydrolysis",
      "mono_means_one_carbon"
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
    "seedKey": "ke04-v3:KE04-BIO-X04",
    "contentId": "KE04-BIO-X04",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "short_answer",
    "difficulty": 4,
    "prompt": "a) Kuinka monta peptidisidosta on 12 aminohapon suorassa ketjussa? b) Kuinka monta H₂O-molekyyliä vapautui sen muodostumisessa? c) Kuinka monta vettä täydellinen hydrolyysi kuluttaisi?",
    "options": [],
    "correctAnswer": null,
    "explanation": "11 peptidisidosta; muodostumisessa 11 H₂O:ta vapautuu; hydrolyysissä 11 H₂O:ta kuluu.",
    "scoring": "6 p: 2 p / kohta.",
    "hints": [
      "n yksikköä suorassa ketjussa → n−1 liitosta.",
      "Yksi liitos ↔ yksi vesi kondensaatiossa/hydrolyysissä",
      "Piirrä tarvittaessa lähtö- ja tuoterakenne rinnakkain ja seuraa, mitkä sidokset muuttuvat.."
    ],
    "skills": [
      "biomolecules.peptide",
      "condensation_hydrolysis_count"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "biomolecules.peptide",
      "condensation_hydrolysis_count"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
    ],
    "estimatedSeconds": 154,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 6,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Sidosten laskeminen"
  },
  {
    "seedKey": "ke04-v3:KE04-BIO-X05",
    "contentId": "KE04-BIO-X05",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "application",
    "difficulty": 5,
    "prompt": "Kahdella C18-rasvahapolla on sama hiiliketjun pituus. A:ssa ei ole C=C-sidoksia, B:ssä on kaksi cis-C=C-sidosta. Ennusta kumpi pakkautuu tiiviimmin ja kummalla on yleensä korkeampi sulamispiste. Perustele.",
    "options": [],
    "correctAnswer": null,
    "explanation": "A pakkautuu tiiviimmin ja sillä on yleensä korkeampi sulamispiste. B:n cis-kaksoissidokset tekevät ketjuun mutkia ja heikentävät tiivistä pakkautumista.",
    "scoring": "6 p: A pakkautuminen 2 p; A korkeampi mp 1 p; cis-mutkat 2 p; vuorovaikutusyhteys 1 p.",
    "hints": [
      "Suora ketju pakkautuu paremmin.",
      "Cis-kaksoissidos tekee mutkan",
      "Ratkaise osa-alueet erikseen ja yhdistä ne vasta lopulliseen perusteltuun vastaukseen.."
    ],
    "skills": [
      "biomolecules.fatty_acids",
      "structure_property"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "biomolecules.fatty_acids",
      "structure_property"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
    ],
    "estimatedSeconds": 347,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 6,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Rasvahappojen vertailu"
  },
  {
    "seedKey": "ke04-v3:KE04-BIO-X06",
    "contentId": "KE04-BIO-X06",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "application",
    "difficulty": 5,
    "prompt": "Proteiiniliuos on kirkas huoneenlämmössä. Voimakkaan kuumennuksen jälkeen siihen muodostuu sakkaa, mutta aminohappoanalyysi osoittaa samojen aminohappojen olevan edelleen läsnä. Mikä ilmiö selittää havainnon parhaiten ja mitä rakenteessa tapahtuu?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Denaturoituminen. Proteiinin korkeammat rakenteet avautuvat/muuttuvat, uusia proteiini-proteiini-vuorovaikutuksia ja aggregaatiota voi syntyä; peptidisidosten ei tarvitse katketa.",
    "scoring": "7 p: denaturaatio 1 p; korkeampi rakenne 2 p; aggregaatio/sakka 2 p; peptidisidokset voivat säilyä 2 p.",
    "hints": [
      "Sama aminohappokoostumus ei tarkoita samaa kolmiulotteista rakennetta.",
      "Kuumuus häiritsee heikkoja vuorovaikutuksia",
      "Nimeä ensin väärä kemiallinen periaate ja vasta sitten sen vaikutus lopputulokseen.."
    ],
    "skills": [
      "biomolecules.denaturation",
      "observation_to_structure"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "biomolecules.denaturation",
      "observation_to_structure"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
    ],
    "estimatedSeconds": 347,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 7,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Kokeellinen tulkinta"
  },
  {
    "seedKey": "ke04-v3:KE04-BIO-X07",
    "contentId": "KE04-BIO-X07",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "Vertaa polysakkaridia, proteiinia ja triglyseridiä seuraavien kohtien avulla: rakennusyksiköt, niitä yhdistävä sidos, muodostumisen reaktiotyyppi ja täydellisen hydrolyysin tuotteet.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Polysakkaridi: monosakkaridit, glykosidisidokset, kondensaatio, hydrolyysissä monosakkarideja. Proteiini: aminohapot, peptidi/amidisidokset, kondensaatio, hydrolyysissä aminohappoja. Triglyseridi: glyseroli+3 rasvahappoa, esterisidokset, kondensaatio/esteröityminen, hydrolyysissä glyseroli+rasvahapot (tai suolat emäksessä).",
    "scoring": "15 p: jokaisesta rakennusyksiköt 1 p, sidos 1 p, muodostuminen 1 p, hydrolyysituote 2 p.",
    "hints": [
      "Tee taulukko kolmesta biomolekyyliryhmästä.",
      "Seuraa monomeereja → sidosta → hydrolyysiä",
      "Ratkaise osa-alueet erikseen ja yhdistä ne vasta lopulliseen perusteltuun vastaukseen.."
    ],
    "skills": [
      "biomolecules.integrated_comparison",
      "condensation",
      "hydrolysis"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "biomolecules.integrated_comparison",
      "condensation",
      "hydrolysis"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 15,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Koereservi – biomolekyylien vertailu"
  },
  {
    "seedKey": "ke04-v3:KE04-BIO-X08",
    "contentId": "KE04-BIO-X08",
    "chapter": 15,
    "topicName": "Biomolekyylit",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "Tuntemattoman makromolekyylin näyte sisältää C, H, O ja N. Täydellisen hydrolyysin jälkeen havaitaan useita erilaisia aminohappoja. Kuumennus muuttaa näytteen liukoisuutta jo ennen hydrolyysiä. a) Tunnista biomolekyyliryhmä. b) Nimeä monomeerityyppi ja sidostyyppi. c) Selitä kuumennuksen vaikutus ennen hydrolyysiä. d) Mikä havainto erottaa denaturaation hydrolyysistä?",
    "options": [],
    "correctAnswer": null,
    "explanation": "a) Proteiini. b) Aminohapot ja peptidi/amidisidokset. c) Kuumennus voi denaturoida korkeampaa rakennetta ja muuttaa liukoisuutta/aggregaatiota. d) Denaturaatiossa aminohappoketju/peptidisidokset voivat säilyä; hydrolyysissä ketju katkeaa pienemmiksi peptideiksi/aminohapoiksi.",
    "scoring": "12 p: tunnistus 2 p; monomeeri+sidos 3 p; denaturaatio 3 p; erotus hydrolyysistä 4 p.",
    "hints": [
      "Hydrolyysituotteet tunnistavat rakennusyksiköt.",
      "Kuumenna ≠ automaattisesti katkaise peptidisidoksia",
      "Perustele päätelmä yhdistämällä havainto tai mittaus suoraan kemialliseen malliin.."
    ],
    "skills": [
      "biomolecules.identification",
      "protein_structure",
      "denaturation_vs_hydrolysis"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "biomolecules.identification",
      "protein_structure",
      "denaturation_vs_hydrolysis"
    ],
    "prerequisites": [
      "functional_groups",
      "intermolecular_forces",
      "condensation_hydrolysis"
    ],
    "commonErrors": [
      "biomolecule_bond_type",
      "denaturation_vs_hydrolysis"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 12,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Koereservi – tuntematon biomolekyyli"
  }
];
