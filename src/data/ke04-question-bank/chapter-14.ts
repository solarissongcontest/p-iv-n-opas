import type { Ke04SeedQuestion } from "./types";

export const questions: Ke04SeedQuestion[] = [
  {
    "seedKey": "ke04-v3:KE04-POL-001",
    "contentId": "KE04-POL-001",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Monomeeri, polymeeri ja toistuva rakenneyksikkö",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Määrittele monomeeri ja polymeeri.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Monomeeri on pieni molekyyli, joka voi liittyä toisiin monomeereihin; polymeeri on suuri molekyyli, joka koostuu monista toistuvista monomeeriperäisistä rakenneyksiköistä.",
    "scoring": "3 p: monomeeri 1 p, polymeeri 1 p, toistuvuus 1 p.",
    "hints": [
      "Mono = yksi, poly = monta.",
      "Mieti rakennusyksikköä."
    ],
    "skills": [
      "ke04.pol.monomeeri_polymeeri_ja_toistuva_rakenneyksikko",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Monomeeri, polymeeri ja toistuva rakenneyksikkö",
      "ke04.pol.monomeeri_polymeeri_ja_toistuva_rakenneyksikko"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
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
    "seedKey": "ke04-v3:KE04-POL-002",
    "contentId": "KE04-POL-002",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Monomeeri, polymeeri ja toistuva rakenneyksikkö",
    "questionType": "multiple_choice",
    "difficulty": 1,
    "prompt": "Mikä seuraavista on polymeeri?",
    "options": [
      "eteeni",
      "polyeteeni",
      "etanoli",
      "etikkahappo"
    ],
    "correctAnswer": "polyeteeni",
    "explanation": "B, polyeteeni.",
    "scoring": "1 p.",
    "hints": [
      "Nimen alku 'poly' auttaa.",
      "Eteeni toimii monomeerina."
    ],
    "skills": [
      "ke04.pol.monomeeri_polymeeri_ja_toistuva_rakenneyksikko",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Monomeeri, polymeeri ja toistuva rakenneyksikkö",
      "ke04.pol.monomeeri_polymeeri_ja_toistuva_rakenneyksikko"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "polymer.addition_vs_condensation"
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
    "seedKey": "ke04-v3:KE04-POL-003",
    "contentId": "KE04-POL-003",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Monomeeri, polymeeri ja toistuva rakenneyksikkö",
    "questionType": "matching",
    "difficulty": 2,
    "prompt": "Yhdistä: eteeni, propeeni, kloorieteeni ↔ polyeteeni, polypropeeni, polyvinyylikloridi (PVC).",
    "options": [],
    "correctAnswer": null,
    "explanation": "Eteeni → polyeteeni; propeeni → polypropeeni; kloorieteeni → PVC.",
    "scoring": "3 p, 1 p / pari.",
    "hints": [
      "Polymeerin nimi tulee usein monomeerin nimestä.",
      "PVC:n monomeeri tunnetaan myös vinyylikloridina."
    ],
    "skills": [
      "ke04.pol.monomeeri_polymeeri_ja_toistuva_rakenneyksikko",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Monomeeri, polymeeri ja toistuva rakenneyksikkö",
      "ke04.pol.monomeeri_polymeeri_ja_toistuva_rakenneyksikko"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
    ],
    "estimatedSeconds": 133,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "Eteeni",
        "right": "polyeteeni"
      },
      {
        "left": "propeeni",
        "right": "polypropeeni"
      },
      {
        "left": "kloorieteeni",
        "right": "PVC."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-POL-004",
    "contentId": "KE04-POL-004",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Monomeeri, polymeeri ja toistuva rakenneyksikkö",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi polymeerin rakennekaavassa merkitään usein yksi rakenneyksikkö hakasulkeisiin ja perään n?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Hakasulkeet osoittavat toistuvan rakenneyksikön ja n kertoo, että sama yksikkö toistuu suuren, vaihtelevan määrän kertoja polymeeriketjussa.",
    "scoring": "2 p: toistuva yksikkö 1 p, n:n merkitys 1 p.",
    "hints": [
      "Polymeeriketju on pitkä.",
      "n ei yleensä ole yksi tietty vakio kaikille ketjuille."
    ],
    "skills": [
      "ke04.pol.monomeeri_polymeeri_ja_toistuva_rakenneyksikko",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Monomeeri, polymeeri ja toistuva rakenneyksikkö",
      "ke04.pol.monomeeri_polymeeri_ja_toistuva_rakenneyksikko"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
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
    "seedKey": "ke04-v3:KE04-POL-005",
    "contentId": "KE04-POL-005",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Monomeeri, polymeeri ja toistuva rakenneyksikkö",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija sanoo: 'Polymeeri on aina vain monomeeri kerrottuna tasan sadalla.' Korjaa väite.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Polymeeriketjujen pituus eli polymeroitumisaste voi vaihdella, eikä toistuvien yksiköiden määrä ole yleisesti 100. Polymeerinäyte sisältää usein eripituisia ketjuja.",
    "scoring": "3 p: vaihteleva n 2 p, eripituiset ketjut 1 p.",
    "hints": [
      "Mieti symbolia n.",
      "Kaikki ketjut eivät ole samanpituisia."
    ],
    "skills": [
      "ke04.pol.monomeeri_polymeeri_ja_toistuva_rakenneyksikko",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Monomeeri, polymeeri ja toistuva rakenneyksikkö",
      "ke04.pol.monomeeri_polymeeri_ja_toistuva_rakenneyksikko"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "pol.common_misconception"
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
    "seedKey": "ke04-v3:KE04-POL-006",
    "contentId": "KE04-POL-006",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Additiopolymeroitumisen periaate",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Millainen rakenne monomeerissa yleensä tarvitaan additiopolymeroitumiseen?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Hiili-hiili-kaksoissidos tai muu polymeroitumiseen avautuva moninkertainen sidos; KE04:ssa tavallisesti C=C.",
    "scoring": "2 p.",
    "hints": [
      "Ajattele alkeeneja.",
      "Kaksoissidos avautuu ketjun muodostuessa."
    ],
    "skills": [
      "ke04.pol.additiopolymeroitumisen_periaate",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Additiopolymeroitumisen periaate",
      "ke04.pol.additiopolymeroitumisen_periaate"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
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
    "seedKey": "ke04-v3:KE04-POL-007",
    "contentId": "KE04-POL-007",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Additiopolymeroitumisen periaate",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Mitä eteenin C=C-kaksoissidokselle tapahtuu polyeteenin muodostuessa?",
    "options": [
      "se säilyy joka yksikössä",
      "se avautuu ja muodostuu uusia C–C-sidoksia",
      "hiilet poistuvat",
      "muodostuu vettä"
    ],
    "correctAnswer": "se avautuu ja muodostuu uusia C–C-sidoksia",
    "explanation": "B.",
    "scoring": "1 p.",
    "hints": [
      "Additiossa monomeerit liittyvät ilman pienen molekyylin poistumista.",
      "Kaksoissidoksen π-osa mahdollistaa uudet sidokset."
    ],
    "skills": [
      "ke04.pol.additiopolymeroitumisen_periaate",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Additiopolymeroitumisen periaate",
      "ke04.pol.additiopolymeroitumisen_periaate"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "polymer.addition_vs_condensation"
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
    "seedKey": "ke04-v3:KE04-POL-008",
    "contentId": "KE04-POL-008",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Additiopolymeroitumisen periaate",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi additiopolymeroitumisessa ei tavallisesti muodostu vettä sivutuotteena?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Monomeerit liittyvät toisiinsa kaksoissidosten avautumisen kautta eikä funktionaalisista ryhmistä lohkea H₂O:ta kuten kondensaatioreaktiossa.",
    "scoring": "3 p: kaksoissidoksen avautuminen 1 p, ei pienen molekyylin poistumista 1 p, vertailu kondensaatioon 1 p.",
    "hints": [
      "Vertaa additiota kondensaatioon.",
      "Seuraa atomien säilymistä."
    ],
    "skills": [
      "ke04.pol.additiopolymeroitumisen_periaate",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Additiopolymeroitumisen periaate",
      "ke04.pol.additiopolymeroitumisen_periaate"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
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
    "seedKey": "ke04-v3:KE04-POL-009",
    "contentId": "KE04-POL-009",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Additiopolymeroitumisen periaate",
    "questionType": "short_answer",
    "difficulty": 3,
    "prompt": "Kirjoita eteenin additiopolymeroitumisen perusmuoto sanallisesti ja rakenneyksikön avulla.",
    "options": [],
    "correctAnswer": null,
    "explanation": "n CH₂=CH₂ → [–CH₂–CH₂–]ₙ.",
    "scoring": "3 p: oikea monomeeri 1 p, kaksoissidoksen avautuminen 1 p, polymeerimerkintä 1 p.",
    "hints": [
      "Eteenin kaava on CH₂=CH₂.",
      "Polymeerissä hiilien välille jää yksinkertainen sidos."
    ],
    "skills": [
      "ke04.pol.additiopolymeroitumisen_periaate",
      "task.reaktiotulkinta"
    ],
    "expectedConcepts": [
      "Additiopolymeroitumisen periaate",
      "ke04.pol.additiopolymeroitumisen_periaate"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
    ],
    "estimatedSeconds": 135,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Reaktiotulkinta"
  },
  {
    "seedKey": "ke04-v3:KE04-POL-010",
    "contentId": "KE04-POL-010",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Additiopolymeroitumisen periaate",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Väite: 'Polyeteenin muodostumisessa jokaista eteeniä kohti vapautuu yksi H₂O.' Arvioi.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Väärin. Polyeteeni syntyy additiopolymeroitumisella, jossa eteeni monomeerit liittyvät C=C-sidosten avautuessa eikä vettä synny sivutuotteena.",
    "scoring": "3 p: väärin 1 p, additiopolymeroituminen 1 p, ei vettä 1 p.",
    "hints": [
      "Onko eteeniin liittyvissä ryhmissä OH ja COOH?",
      "Additio ei ole kondensaatio."
    ],
    "skills": [
      "ke04.pol.additiopolymeroitumisen_periaate",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Additiopolymeroitumisen periaate",
      "ke04.pol.additiopolymeroitumisen_periaate"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "polymer.addition_vs_condensation"
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
    "seedKey": "ke04-v3:KE04-POL-011",
    "contentId": "KE04-POL-011",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Monomeerin päätteleminen additiopolymeeristä",
    "questionType": "recognition",
    "difficulty": 2,
    "prompt": "Polymeerin toistuva yksikkö on –CH₂–CH₂–. Mikä monomeeri?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Eteeni CH₂=CH₂.",
    "scoring": "2 p: nimi/kaava 2 p.",
    "hints": [
      "Palauta vierekkäisten hiilien väliin kaksoissidos.",
      "Lisää tarvittavat vedyt."
    ],
    "skills": [
      "ke04.pol.monomeerin_paatteleminen_additiopolymeerista",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Monomeerin päätteleminen additiopolymeeristä",
      "ke04.pol.monomeerin_paatteleminen_additiopolymeerista"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
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
    "seedKey": "ke04-v3:KE04-POL-012",
    "contentId": "KE04-POL-012",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Monomeerin päätteleminen additiopolymeeristä",
    "questionType": "recognition",
    "difficulty": 2,
    "prompt": "Toistuva yksikkö on –CH₂–CH(CH₃)–. Mikä monomeeri?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Propeeni CH₂=CH–CH₃.",
    "scoring": "2 p.",
    "hints": [
      "Pääketjun kahden hiilen väliin C=C.",
      "Sivuryhmä CH₃ säilyy."
    ],
    "skills": [
      "ke04.pol.monomeerin_paatteleminen_additiopolymeerista",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Monomeerin päätteleminen additiopolymeeristä",
      "ke04.pol.monomeerin_paatteleminen_additiopolymeerista"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
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
    "seedKey": "ke04-v3:KE04-POL-013",
    "contentId": "KE04-POL-013",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Monomeerin päätteleminen additiopolymeeristä",
    "questionType": "recognition",
    "difficulty": 3,
    "prompt": "Toistuva yksikkö on –CH₂–CHCl–. Mikä monomeeri?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kloorieteeni eli vinyylikloridi, CH₂=CHCl.",
    "scoring": "2 p.",
    "hints": [
      "Sivuryhmä Cl säilyy.",
      "Palauta C=C."
    ],
    "skills": [
      "ke04.pol.monomeerin_paatteleminen_additiopolymeerista",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Monomeerin päätteleminen additiopolymeeristä",
      "ke04.pol.monomeerin_paatteleminen_additiopolymeerista"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
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
    "seedKey": "ke04-v3:KE04-POL-014",
    "contentId": "KE04-POL-014",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Monomeerin päätteleminen additiopolymeeristä",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Kuvaa yleinen menetelmä, jolla additiopolymeerin toistuvasta yksiköstä voidaan päätellä alkeenimonomeeri.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Valitaan kaksi peräkkäistä pääketjun hiiltä, muutetaan niiden välinen yksinkertainen sidos kaksoissidokseksi ja säilytetään niihin liittyvät sivuryhmät; täydennetään valenssit vedyillä.",
    "scoring": "4 p: kaksi hiiltä 1 p, C=C 1 p, sivuryhmät 1 p, valenssit 1 p.",
    "hints": [
      "Tee polymeroituminen mielessä takaperin.",
      "Sivuryhmät eivät katoa."
    ],
    "skills": [
      "ke04.pol.monomeerin_paatteleminen_additiopolymeerista",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Monomeerin päätteleminen additiopolymeeristä",
      "ke04.pol.monomeerin_paatteleminen_additiopolymeerista"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
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
    "seedKey": "ke04-v3:KE04-POL-015",
    "contentId": "KE04-POL-015",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Monomeerin päätteleminen additiopolymeeristä",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Polymeerin toistuva yksikkö on –CH₂–C(CH₃)₂–. Päättele monomeerin rakennekaava.",
    "options": [],
    "correctAnswer": null,
    "explanation": "CH₂=C(CH₃)₂, eli 2-metyylipropeeni.",
    "scoring": "4 p: oikea C=C-runko 2 p, kaksi CH₃-sivuryhmää 1 p, nimi tai täydellinen kaava 1 p.",
    "hints": [
      "Palauta kaksoissidos toistuvan yksikön kahden päähiilen väliin.",
      "Säilytä molemmat metyyliryhmät",
      "Piirrä tarvittaessa lähtö- ja tuoterakenne rinnakkain ja seuraa, mitkä sidokset muuttuvat.."
    ],
    "skills": [
      "ke04.pol.monomeerin_paatteleminen_additiopolymeerista",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Monomeerin päätteleminen additiopolymeeristä",
      "ke04.pol.monomeerin_paatteleminen_additiopolymeerista"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
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
    "seedKey": "ke04-v3:KE04-POL-016",
    "contentId": "KE04-POL-016",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Polymeroitumisaste ja yksinkertaiset laskut",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Polyeteeniketjun likimääräinen moolimassa on 28 000 g/mol. Eteeniperäisen rakenneyksikön moolimassa on noin 28,0 g/mol. Arvioi polymeroitumisaste n.",
    "options": [],
    "correctAnswer": null,
    "explanation": "n ≈ 28 000 / 28,0 = 1000.",
    "scoring": "3 p: suhde 1 p, lasku 1 p, n≈1000 1 p.",
    "hints": [
      "Polymeerin moolimassa ≈ n × rakenneyksikön moolimassa.",
      "Jaa 28 000 luvulla 28."
    ],
    "skills": [
      "ke04.pol.polymeroitumisaste_ja_yksinkertaiset_laskut",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Polymeroitumisaste ja yksinkertaiset laskut",
      "ke04.pol.polymeroitumisaste_ja_yksinkertaiset_laskut"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
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
    "seedKey": "ke04-v3:KE04-POL-017",
    "contentId": "KE04-POL-017",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Polymeroitumisaste ja yksinkertaiset laskut",
    "questionType": "calculation",
    "difficulty": 2,
    "prompt": "Polypropeenin rakenneyksikön moolimassa on noin 42,1 g/mol. Jos n=500, arvioi ketjun moolimassa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "M ≈ 500 × 42,1 g/mol = 21 050 g/mol ≈ 2,11×10⁴ g/mol.",
    "scoring": "3 p: kaava 1 p, lasku 1 p, yksikkö 1 p.",
    "hints": [
      "Kerro n rakenneyksikön moolimassalla.",
      "Pidä g/mol mukana."
    ],
    "skills": [
      "ke04.pol.polymeroitumisaste_ja_yksinkertaiset_laskut",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Polymeroitumisaste ja yksinkertaiset laskut",
      "ke04.pol.polymeroitumisaste_ja_yksinkertaiset_laskut"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
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
    "seedKey": "ke04-v3:KE04-POL-018",
    "contentId": "KE04-POL-018",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Polymeroitumisaste ja yksinkertaiset laskut",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "Polymeeriketjun moolimassa on 84 000 g/mol ja rakenneyksikön moolimassa 42,0 g/mol. Arvioi n.",
    "options": [],
    "correctAnswer": null,
    "explanation": "n = 84 000 / 42,0 = 2000.",
    "scoring": "3 p.",
    "hints": [
      "n on yksikötön.",
      "Jaa kokonaismoolimassa yhden yksikön moolimassalla."
    ],
    "skills": [
      "ke04.pol.polymeroitumisaste_ja_yksinkertaiset_laskut",
      "task.lasku"
    ],
    "expectedConcepts": [
      "Polymeroitumisaste ja yksinkertaiset laskut",
      "ke04.pol.polymeroitumisaste_ja_yksinkertaiset_laskut"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
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
    "seedKey": "ke04-v3:KE04-POL-019",
    "contentId": "KE04-POL-019",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Polymeroitumisaste ja yksinkertaiset laskut",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija laskee n = 42,0/84 000 ja saa 0,0005. Mitä hän teki väärin?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Jakolasku on käännetty väärin päin. Polymeroitumisaste saadaan polymeerin moolimassa / rakenneyksikön moolimassa = 2000.",
    "scoring": "3 p: virhe 1 p, oikea suhde 1 p, tulos 1 p.",
    "hints": [
      "n:n pitää olla suuri kokonaisluvun kaltainen arvio.",
      "Kumpi massa on suurempi?"
    ],
    "skills": [
      "ke04.pol.polymeroitumisaste_ja_yksinkertaiset_laskut",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Polymeroitumisaste ja yksinkertaiset laskut",
      "ke04.pol.polymeroitumisaste_ja_yksinkertaiset_laskut"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "pol.common_misconception"
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
    "seedKey": "ke04-v3:KE04-POL-020",
    "contentId": "KE04-POL-020",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Polymeroitumisaste ja yksinkertaiset laskut",
    "questionType": "calculation",
    "difficulty": 3,
    "prompt": "Kaksi polyeteeninäytettä A ja B koostuvat samasta rakenneyksiköstä. A:n keskimääräinen moolimassa on 56 000 g/mol ja B:n 112 000 g/mol. Vertaa niiden keskimääräisiä polymeroitumisasteita.",
    "options": [],
    "correctAnswer": null,
    "explanation": "B:n n on noin kaksinkertainen A:han verrattuna, koska moolimassa on kaksinkertainen ja rakenneyksikkö sama. Arviot: A≈2000, B≈4000.",
    "scoring": "4 p: suhde 2 p, A 1 p, B 1 p.",
    "hints": [
      "Sama monomeeri → sama rakenneyksikön massa.",
      "n on suoraan verrannollinen polymeerin moolimassaan."
    ],
    "skills": [
      "ke04.pol.polymeroitumisaste_ja_yksinkertaiset_laskut",
      "task.soveltava_lasku"
    ],
    "expectedConcepts": [
      "Polymeroitumisaste ja yksinkertaiset laskut",
      "ke04.pol.polymeroitumisaste_ja_yksinkertaiset_laskut"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
    ],
    "estimatedSeconds": 194,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "formula",
    "matchingPairs": [],
    "originalType": "Soveltava lasku"
  },
  {
    "seedKey": "ke04-v3:KE04-POL-021",
    "contentId": "KE04-POL-021",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Kondensaatiopolymeroitumisen periaate",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mikä erottaa kondensaatiopolymeroitumisen additiopolymeroitumisesta sivutuotteiden kannalta?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Kondensaatiopolymeroitumisessa muodostuu tyypillisesti pieni molekyyli, kuten vesi, kun monomeerit liittyvät; additiopolymeroitumisessa tällaista pientä sivutuotetta ei tavallisesti muodostu.",
    "scoring": "3 p.",
    "hints": [
      "Kondensaatio muistuttaa esteröitymistä.",
      "Seuraa veden roolia."
    ],
    "skills": [
      "ke04.pol.kondensaatiopolymeroitumisen_periaate",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Kondensaatiopolymeroitumisen periaate",
      "ke04.pol.kondensaatiopolymeroitumisen_periaate"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
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
    "seedKey": "ke04-v3:KE04-POL-022",
    "contentId": "KE04-POL-022",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Kondensaatiopolymeroitumisen periaate",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Millaiset monomeerit sopivat parhaiten pitkän kondensaatiopolymeeriketjun muodostamiseen?",
    "options": [
      "molekyylit, joissa on vähintään kaksi sopivaa reaktiivista funktionaalista ryhmää",
      "monomeerit, joissa on vain yksi C=C-kaksoissidos mutta ei kondensoituvia ryhmiä",
      "monomeerit, joissa on vain yksi reaktiivinen ryhmä ja jotka voivat tehdä vain yhden liitoksen",
      "täysin funktionaaliryhmättömät tyydyttyneet hiilivedyt"
    ],
    "correctAnswer": "molekyylit, joissa on vähintään kaksi sopivaa reaktiivista funktionaalista ryhmää",
    "explanation": "A.",
    "scoring": "1 p.",
    "hints": [
      "Ketjun pitää voida jatkua molemmista päistä.",
      "Ajattele diolia ja dikarboksyylihappoa."
    ],
    "skills": [
      "ke04.pol.kondensaatiopolymeroitumisen_periaate",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Kondensaatiopolymeroitumisen periaate",
      "ke04.pol.kondensaatiopolymeroitumisen_periaate"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "polymer.addition_vs_condensation",
      "polymer.condensation_monomers"
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
    "seedKey": "ke04-v3:KE04-POL-023",
    "contentId": "KE04-POL-023",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Kondensaatiopolymeroitumisen periaate",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi monomeerissa tarvitaan usein vähintään kaksi reaktiivista funktionaalista ryhmää kondensaatiopolymeerin pitkän ketjun muodostumiseen?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Yksi ryhmä mahdollistaisi yleensä vain yhden liitoksen. Kaksi tai useampi ryhmä antaa monomeerin liittyä ketjuun useammasta kohdasta, jolloin ketjun kasvu voi jatkua.",
    "scoring": "3 p: yksi ryhmä rajoittaa 1 p, kaksi liitoskohtaa 1 p, ketjun kasvu 1 p.",
    "hints": [
      "Kuvittele monomeeri ketjun keskellä.",
      "Sen täytyy liittyä sekä vasemmalle että oikealle."
    ],
    "skills": [
      "ke04.pol.kondensaatiopolymeroitumisen_periaate",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Kondensaatiopolymeroitumisen periaate",
      "ke04.pol.kondensaatiopolymeroitumisen_periaate"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
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
    "seedKey": "ke04-v3:KE04-POL-024",
    "contentId": "KE04-POL-024",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Kondensaatiopolymeroitumisen periaate",
    "questionType": "matching",
    "difficulty": 3,
    "prompt": "Yhdistä monomeeripari ja polymeerityyppi: dioli + dikarboksyylihappo; diamiini + dikarboksyylihappo ↔ polyesteri; polyamidi.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Dioli + dikarboksyylihappo → polyesteri; diamiini + dikarboksyylihappo → polyamidi.",
    "scoring": "2 p, 1 p / pari.",
    "hints": [
      "Alkoholi + happo muodostaa esterin.",
      "Amiini + happo muodostaa amidin."
    ],
    "skills": [
      "ke04.pol.kondensaatiopolymeroitumisen_periaate",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Kondensaatiopolymeroitumisen periaate",
      "ke04.pol.kondensaatiopolymeroitumisen_periaate"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
    ],
    "estimatedSeconds": 155,
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
    "seedKey": "ke04-v3:KE04-POL-025",
    "contentId": "KE04-POL-025",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Kondensaatiopolymeroitumisen periaate",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Väite: 'Kondensaatiopolymeerin monomeerissa täytyy aina olla C=C-kaksoissidos.' Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Väärin. C=C on tyypillinen additiopolymeroitumisen lähtökohta. Kondensaatiopolymeroitumisessa olennaisia ovat yleensä vähintään kaksi reaktiivista funktionaalista ryhmää, kuten OH, COOH tai NH₂.",
    "scoring": "4 p: väärin 1 p, additioyhteys 1 p, kondensaation ryhmät 2 p.",
    "hints": [
      "Erota kaksi polymeroitumistyyppiä.",
      "Mieti polyesterin monomeereja."
    ],
    "skills": [
      "ke04.pol.kondensaatiopolymeroitumisen_periaate",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Kondensaatiopolymeroitumisen periaate",
      "ke04.pol.kondensaatiopolymeroitumisen_periaate"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "polymer.addition_vs_condensation",
      "polymer.condensation_monomers"
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
    "seedKey": "ke04-v3:KE04-POL-026",
    "contentId": "KE04-POL-026",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Polyesterit",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mikä funktionaalinen ryhmä toistuu polyesterin runkorakenteessa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Esteriryhmä, –COO–.",
    "scoring": "2 p.",
    "hints": [
      "Nimi polyesteri.",
      "Etsi esterisidos."
    ],
    "skills": [
      "ke04.pol.polyesterit",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Polyesterit",
      "ke04.pol.polyesterit"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
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
    "seedKey": "ke04-v3:KE04-POL-027",
    "contentId": "KE04-POL-027",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Polyesterit",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Mikä monomeeripari voi muodostaa polyesterin kondensaatiopolymeroitumisella?",
    "options": [
      "dioli + dikarboksyylihappo",
      "diamiini + dikarboksyylihappo",
      "eteeni yksinään",
      "kaksi monofunktionaalista alkoholia"
    ],
    "correctAnswer": "dioli + dikarboksyylihappo",
    "explanation": "A.",
    "scoring": "1 p.",
    "hints": [
      "Esteri syntyy alkoholista ja karboksyylihaposta.",
      "Polymeeri tarvitsee kaksi reaktiivista päätä."
    ],
    "skills": [
      "ke04.pol.polyesterit",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Polyesterit",
      "ke04.pol.polyesterit"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "polymer.condensation_monomers",
      "polymer.bond_type"
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
    "seedKey": "ke04-v3:KE04-POL-028",
    "contentId": "KE04-POL-028",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Polyesterit",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Mitä pientä molekyyliä voi vapautua polyesterin muodostuessa diolista ja dikarboksyylihaposta? Miksi?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Vettä. Esterisidos muodostuu karboksyyli- ja hydroksyyliryhmien kondensaatioreaktiossa, jossa H ja OH voivat poistua H₂O:na.",
    "scoring": "3 p: vesi 1 p, ryhmät 1 p, kondensaatio 1 p.",
    "hints": [
      "Vertaa tavalliseen esteröitymiseen.",
      "H + OH → H₂O."
    ],
    "skills": [
      "ke04.pol.polyesterit",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Polyesterit",
      "ke04.pol.polyesterit"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
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
    "seedKey": "ke04-v3:KE04-POL-029",
    "contentId": "KE04-POL-029",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Polyesterit",
    "questionType": "short_answer",
    "difficulty": 3,
    "prompt": "Mitä polyesterin esterisidoksille tapahtuu hydrolyysissä?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Esterisidokset katkeavat veden avulla, jolloin ketju pilkkoutuu pienemmiksi osiksi ja voi muodostua alkoholi- ja karboksyylihappopäitä.",
    "scoring": "3 p: sidos katkeaa 1 p, vesi osallistuu 1 p, tuotteiden luonne 1 p.",
    "hints": [
      "Hydrolyysi on kondensaation vastasuuntainen periaate.",
      "Mieti esterin lähtöaineita."
    ],
    "skills": [
      "ke04.pol.polyesterit",
      "task.hydrolyysi"
    ],
    "expectedConcepts": [
      "Polyesterit",
      "ke04.pol.polyesterit"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
    ],
    "estimatedSeconds": 135,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Hydrolyysi"
  },
  {
    "seedKey": "ke04-v3:KE04-POL-030",
    "contentId": "KE04-POL-030",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Polyesterit",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Polymeeriketjussa toistuu –O–R–O–CO–R'–CO–. Päättele, millaisia funktionaalisia ryhmiä alkuperäisissä kahdessa monomeerissa todennäköisesti oli.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Toisessa monomeerissa kaksi hydroksyyliryhmää (dioli) ja toisessa kaksi karboksyyliryhmää (dikarboksyylihappo). Toistuvat –COO–sidokset osoittavat polyesterin.",
    "scoring": "4 p: dioli 1 p, dikarboksyylihappo 1 p, esterisidos 1 p, perustelu 1 p.",
    "hints": [
      "Katkaise esterisidos mielessä.",
      "Esterin lähtöaineet ovat alkoholi ja karboksyylihappo",
      "Piirrä tarvittaessa lähtö- ja tuoterakenne rinnakkain ja seuraa, mitkä sidokset muuttuvat.."
    ],
    "skills": [
      "ke04.pol.polyesterit",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Polyesterit",
      "ke04.pol.polyesterit"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
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
    "seedKey": "ke04-v3:KE04-POL-031",
    "contentId": "KE04-POL-031",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Polyamidit",
    "questionType": "recognition",
    "difficulty": 1,
    "prompt": "Mikä funktionaalinen ryhmä toistuu polyamidin rungossa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Amidiryhmä, –CONH–; proteiineissa vastaavaa sidosta kutsutaan peptidisidokseksi.",
    "scoring": "2 p.",
    "hints": [
      "Nimi polyamidi.",
      "Etsi CO–NH."
    ],
    "skills": [
      "ke04.pol.polyamidit",
      "task.tunnistus"
    ],
    "expectedConcepts": [
      "Polyamidit",
      "ke04.pol.polyamidit"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
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
    "seedKey": "ke04-v3:KE04-POL-032",
    "contentId": "KE04-POL-032",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Polyamidit",
    "questionType": "multiple_choice",
    "difficulty": 2,
    "prompt": "Mikä monomeeripari voi muodostaa polyamidin kondensaatiopolymeroitumisella?",
    "options": [
      "diamiini + dikarboksyylihappo",
      "dioli + dikarboksyylihappo",
      "eteeni yksinään",
      "dioli + diamiini ilman karboksyyliryhmää"
    ],
    "correctAnswer": "diamiini + dikarboksyylihappo",
    "explanation": "A.",
    "scoring": "1 p.",
    "hints": [
      "Amidi syntyy amiinin ja karboksyylihapon välillä.",
      "Polymeeri tarvitsee kaksi reaktiivista päätä."
    ],
    "skills": [
      "ke04.pol.polyamidit",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Polyamidit",
      "ke04.pol.polyamidit"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "polymer.condensation_monomers",
      "polymer.bond_type"
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
    "seedKey": "ke04-v3:KE04-POL-033",
    "contentId": "KE04-POL-033",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Polyamidit",
    "questionType": "matching",
    "difficulty": 3,
    "prompt": "Yhdistä: polyesteri, polyamidi ↔ esterisidos, amidisidos; dioli+dihappo, diamiini+dihappo.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Polyesteri → esterisidos ja dioli+dihappo; polyamidi → amidisidos ja diamiini+dihappo.",
    "scoring": "4 p, 1 p / oikea yhteys.",
    "hints": [
      "Esteri liittyy alkoholiin.",
      "Amidi liittyy amiiniin."
    ],
    "skills": [
      "ke04.pol.polyamidit",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Polyamidit",
      "ke04.pol.polyamidit"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
    ],
    "estimatedSeconds": 155,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 4,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "Polyesteri",
        "right": "esterisidos ja dioli+dihappo"
      },
      {
        "left": "polyamidi",
        "right": "amidisidos ja diamiini+dihappo."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-POL-034",
    "contentId": "KE04-POL-034",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Polyamidit",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miten polyamidin muodostuminen muistuttaa peptidin muodostumista?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Molemmissa karboksyyliryhmä reagoi aminoryhmän kanssa kondensaatioreaktiossa ja muodostuu amidisidos sekä tyypillisesti vettä.",
    "scoring": "4 p: COOH 1 p, NH₂ 1 p, amidisidos 1 p, vesi/kondensaatio 1 p.",
    "hints": [
      "Peptidisidos on amidisidos.",
      "Vertaa aminohappojen kondensaatioon."
    ],
    "skills": [
      "ke04.pol.polyamidit",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Polyamidit",
      "ke04.pol.polyamidit"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
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
    "seedKey": "ke04-v3:KE04-POL-035",
    "contentId": "KE04-POL-035",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Polyamidit",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Opiskelija nimeää –COO–-ryhmiä sisältävän polymeerin polyamidiksi. Mitä pitäisi tarkistaa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "–COO– on esterisidos, joten kyseessä on polyesteri tai estereitä sisältävä polymeeri, ei pelkän tämän ryhmän perusteella polyamidi. Polyamidissa etsitään –CONH–-ryhmää.",
    "scoring": "3 p: –COO–=esteri 1 p, polyesteri 1 p, –CONH–=amidi 1 p.",
    "hints": [
      "Katso onko typpeä.",
      "Esteri ja amidi eroavat O/N-rakenteessa."
    ],
    "skills": [
      "ke04.pol.polyamidit",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Polyamidit",
      "ke04.pol.polyamidit"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "polymer.bond_type"
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
    "seedKey": "ke04-v3:KE04-POL-036",
    "contentId": "KE04-POL-036",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Rakenteen vaikutus polymeerin ominaisuuksiin",
    "questionType": "explanation",
    "difficulty": 2,
    "prompt": "Miten polymeeriketjujen väliset voimakkaammat vuorovaikutukset yleensä vaikuttavat materiaalin pehmenemis- tai sulamiskäyttäytymiseen?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Voimakkaammat ketjujen väliset vuorovaikutukset vaativat enemmän energiaa erottaa, joten ne voivat nostaa pehmenemis-/sulamislämpötilaa ja lisätä jäykkyyttä.",
    "scoring": "3 p: enemmän energiaa 1 p, lämpötila 1 p, ominaisuus 1 p.",
    "hints": [
      "Vertaa heikkoja ja vahvoja vuorovaikutuksia.",
      "Enemmän energiaa → korkeampi lämpötila."
    ],
    "skills": [
      "ke04.pol.rakenteen_vaikutus_polymeerin_ominaisuuksiin",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Rakenteen vaikutus polymeerin ominaisuuksiin",
      "ke04.pol.rakenteen_vaikutus_polymeerin_ominaisuuksiin"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
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
    "seedKey": "ke04-v3:KE04-POL-037",
    "contentId": "KE04-POL-037",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Rakenteen vaikutus polymeerin ominaisuuksiin",
    "questionType": "application",
    "difficulty": 3,
    "prompt": "Kahdesta samankaltaisesta polymeeristä A:n ketjut ovat hyvin suoria ja pakkautuvat tiiviisti, B:n ketjuissa on paljon suuria sivuryhmiä. Kumman pakkautuminen on todennäköisesti tehokkaampaa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "A:n. Suorat ketjut pääsevät lähemmäs toisiaan; suuret sivuryhmät voivat estää tiivistä pakkautumista.",
    "scoring": "3 p: A 1 p, suoruus 1 p, sivuryhmien vaikutus 1 p.",
    "hints": [
      "Kuvittele ketjut vierekkäin.",
      "Suuret sivuryhmät vievät tilaa."
    ],
    "skills": [
      "ke04.pol.rakenteen_vaikutus_polymeerin_ominaisuuksiin",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Rakenteen vaikutus polymeerin ominaisuuksiin",
      "ke04.pol.rakenteen_vaikutus_polymeerin_ominaisuuksiin"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
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
    "seedKey": "ke04-v3:KE04-POL-038",
    "contentId": "KE04-POL-038",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Rakenteen vaikutus polymeerin ominaisuuksiin",
    "questionType": "multiple_choice",
    "difficulty": 3,
    "prompt": "Mikä rakennemuutos yleensä rajoittaa polymeeriketjujen liikkumista eniten?",
    "options": [
      "ristisilloitus ketjujen välillä",
      "pienten joustavien sivuryhmien lisääminen",
      "ketjujen välisen etäisyyden kasvattaminen",
      "ketjun päiden määrän lisääminen ilman ristisidoksia"
    ],
    "correctAnswer": "ristisilloitus ketjujen välillä",
    "explanation": "A, ristisilloitus.",
    "scoring": "1 p.",
    "hints": [
      "Ristisilta sitoo kaksi ketjua toisiinsa.",
      "Liikkumisvapaus pienenee."
    ],
    "skills": [
      "ke04.pol.rakenteen_vaikutus_polymeerin_ominaisuuksiin",
      "task.monivalinta"
    ],
    "expectedConcepts": [
      "Rakenteen vaikutus polymeerin ominaisuuksiin",
      "ke04.pol.rakenteen_vaikutus_polymeerin_ominaisuuksiin"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "polymer.crosslinking_property"
    ],
    "estimatedSeconds": 77,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 1,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Monivalinta"
  },
  {
    "seedKey": "ke04-v3:KE04-POL-039",
    "contentId": "KE04-POL-039",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Rakenteen vaikutus polymeerin ominaisuuksiin",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi voimakkaasti ristisilloitettu polymeeri ei yleensä käyttäydy kuten helposti sulatettava termoplastinen polymeeri?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Ristisillat muodostavat kolmiulotteisen verkoston, joka estää yksittäisiä ketjuja liukumasta vapaasti toistensa ohi. Kuumennus ei siksi johda samalla tavalla virtaavaan sulaan rakenteeseen.",
    "scoring": "4 p: verkosto 1 p, liukumisen esto 1 p, kuumennuskäyttäytyminen 1 p, vertailu termoplastiin 1 p.",
    "hints": [
      "Mieti ketjujen liikettä.",
      "Ristisillat toimivat kiinnityspisteinä."
    ],
    "skills": [
      "ke04.pol.rakenteen_vaikutus_polymeerin_ominaisuuksiin",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Rakenteen vaikutus polymeerin ominaisuuksiin",
      "ke04.pol.rakenteen_vaikutus_polymeerin_ominaisuuksiin"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
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
    "seedKey": "ke04-v3:KE04-POL-040",
    "contentId": "KE04-POL-040",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Rakenteen vaikutus polymeerin ominaisuuksiin",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Suunnittelija haluaa polymeerimateriaalin, jonka ketjut liikkuvat mahdollisimman vähän toistensa suhteen. Nimeä yksi rakenteellinen keino ja perustele.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Lisätään ristisilloitusta tai voimakkaita ketjujen välisiä vuorovaikutuksia. Molemmat rajoittavat ketjujen liikettä ja voivat lisätä jäykkyyttä/lämmönkestoa.",
    "scoring": "4 p: keino 1 p, vaikutus ketjuihin 2 p, ominaisuuden yhteys 1 p.",
    "hints": [
      "Miten ketjut voidaan 'lukita'?",
      "Mieti ristisidoksia tai vetysidoksia",
      "Piirrä tarvittaessa lähtö- ja tuoterakenne rinnakkain ja seuraa, mitkä sidokset muuttuvat.."
    ],
    "skills": [
      "ke04.pol.rakenteen_vaikutus_polymeerin_ominaisuuksiin",
      "task.soveltaminen"
    ],
    "expectedConcepts": [
      "Rakenteen vaikutus polymeerin ominaisuuksiin",
      "ke04.pol.rakenteen_vaikutus_polymeerin_ominaisuuksiin"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
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
    "seedKey": "ke04-v3:KE04-POL-041",
    "contentId": "KE04-POL-041",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Polymeerien tunnistaminen, käyttö ja kierrätys – kokonaisuudet",
    "questionType": "matching",
    "difficulty": 2,
    "prompt": "Yhdistä: PE, PP, PVC ↔ polyeteeni, polypropeeni, polyvinyylikloridi.",
    "options": [],
    "correctAnswer": null,
    "explanation": "PE → polyeteeni; PP → polypropeeni; PVC → polyvinyylikloridi.",
    "scoring": "3 p, 1 p / pari.",
    "hints": [
      "Lyhenteet tulevat nimistä.",
      "PVC sisältää vinyylikloridi-nimen."
    ],
    "skills": [
      "ke04.pol.polymeerien_tunnistaminen_kaytto_ja_kierratys_kokonaisuudet",
      "task.yhdistely"
    ],
    "expectedConcepts": [
      "Polymeerien tunnistaminen, käyttö ja kierrätys – kokonaisuudet",
      "ke04.pol.polymeerien_tunnistaminen_kaytto_ja_kierratys_kokonaisuudet"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
    ],
    "estimatedSeconds": 133,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "matching",
    "matchingPairs": [
      {
        "left": "PE",
        "right": "polyeteeni"
      },
      {
        "left": "PP",
        "right": "polypropeeni"
      },
      {
        "left": "PVC",
        "right": "polyvinyylikloridi."
      }
    ],
    "originalType": "Yhdistely"
  },
  {
    "seedKey": "ke04-v3:KE04-POL-042",
    "contentId": "KE04-POL-042",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Polymeerien tunnistaminen, käyttö ja kierrätys – kokonaisuudet",
    "questionType": "explanation",
    "difficulty": 3,
    "prompt": "Miksi eri polymeerilajien erottelu on materiaalikierrätyksessä hyödyllistä?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Eri polymeereillä on erilaiset sulamis-, käsittely- ja materiaaliominaisuudet. Sekoitus voi heikentää kierrätetyn materiaalin laatua tai vaikeuttaa prosessointia.",
    "scoring": "3 p: erilaiset ominaisuudet 1 p, prosessointi 1 p, laadun vaikutus 1 p.",
    "hints": [
      "Kaikki muovit eivät käyttäydy kuumennettaessa samoin.",
      "Mieti seoksen ominaisuuksia."
    ],
    "skills": [
      "ke04.pol.polymeerien_tunnistaminen_kaytto_ja_kierratys_kokonaisuudet",
      "task.selitys"
    ],
    "expectedConcepts": [
      "Polymeerien tunnistaminen, käyttö ja kierrätys – kokonaisuudet",
      "ke04.pol.polymeerien_tunnistaminen_kaytto_ja_kierratys_kokonaisuudet"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
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
    "seedKey": "ke04-v3:KE04-POL-043",
    "contentId": "KE04-POL-043",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Polymeerien tunnistaminen, käyttö ja kierrätys – kokonaisuudet",
    "questionType": "error_detection",
    "difficulty": 3,
    "prompt": "Väite: 'Kaikki muovit voidaan kierrättää täsmälleen samalla menetelmällä, koska ne ovat kaikki polymeerejä.' Korjaa.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Polymeerien rakenteet ja ominaisuudet eroavat. Esimerkiksi termoplastit voidaan usein sulattaa uudelleen, kun taas voimakkaasti ristisilloitetut materiaalit eivät sula samalla tavalla. Kierrätysmenetelmä riippuu materiaalista.",
    "scoring": "4 p: yleistyksen kumoaminen 1 p, rakenne-ero 1 p, termoplasti/ristisilloitus 1 p, menetelmäriippuvuus 1 p.",
    "hints": [
      "Polymeeri ei tarkoita samaa rakennetta.",
      "Vertaa lineaarista ja ristisilloitettua materiaalia."
    ],
    "skills": [
      "ke04.pol.polymeerien_tunnistaminen_kaytto_ja_kierratys_kokonaisuudet",
      "task.virheen_tunnistus"
    ],
    "expectedConcepts": [
      "Polymeerien tunnistaminen, käyttö ja kierrätys – kokonaisuudet",
      "ke04.pol.polymeerien_tunnistaminen_kaytto_ja_kierratys_kokonaisuudet"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "pol.common_misconception"
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
    "seedKey": "ke04-v3:KE04-POL-044",
    "contentId": "KE04-POL-044",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Polymeerien tunnistaminen, käyttö ja kierrätys – kokonaisuudet",
    "questionType": "simulation",
    "difficulty": 4,
    "prompt": "Tuntematon polymeeri sisältää toistuvasti –COO–-ryhmiä ja hajoaa hydrolyysissä pienemmiksi alkoholi- ja karboksyylihappojohdannaisiksi. Mihin pääluokkaan se kuuluu?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Polyesteriin. –COO– on esterisidos, joka voi hydrolysoitua alkoholi- ja karboksyylihappopäiksi.",
    "scoring": "3 p: polyesteri 1 p, esterisidos 1 p, hydrolyysiperustelu 1 p.",
    "hints": [
      "Tunnista –COO–.",
      "Mieti esterin hydrolyysiä",
      "Ratkaise osa-alueet erikseen ja yhdistä ne vasta lopulliseen perusteltuun vastaukseen.."
    ],
    "skills": [
      "ke04.pol.polymeerien_tunnistaminen_kaytto_ja_kierratys_kokonaisuudet",
      "task.integroiva_tehtava"
    ],
    "expectedConcepts": [
      "Polymeerien tunnistaminen, käyttö ja kierrätys – kokonaisuudet",
      "ke04.pol.polymeerien_tunnistaminen_kaytto_ja_kierratys_kokonaisuudet"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
    ],
    "estimatedSeconds": 529,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 3,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Integroiva tehtävä"
  },
  {
    "seedKey": "ke04-v3:KE04-POL-045",
    "contentId": "KE04-POL-045",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "Polymeerien tunnistaminen, käyttö ja kierrätys – kokonaisuudet",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "Vertaa polyeteenin ja polyesterin muodostumista kolmen asian avulla: monomeerien rakenne, polymeroitumistyyppi ja mahdollinen pieni sivutuote.",
    "options": [],
    "correctAnswer": null,
    "explanation": "Polyeteeni: eteeni, jossa C=C; additiopolymeroituminen; ei tyypillistä pientä sivutuotetta. Polyesteri: vähintään kaksi reaktiivista ryhmää sisältävät monomeerit, esim. dioli+dihappo; kondensaatiopolymeroituminen; usein vapautuu vettä.",
    "scoring": "6 p: PE-monomeeri 1 p, additio 1 p, ei sivutuotetta 1 p, polyesterimonomeerit 1 p, kondensaatio 1 p, vesi 1 p.",
    "hints": [
      "Tee vertailu kolmessa sarakkeessa.",
      "Kaksoissidos vs funktionaaliset ryhmät",
      "Ratkaise osa-alueet erikseen ja yhdistä ne vasta lopulliseen perusteltuun vastaukseen.."
    ],
    "skills": [
      "ke04.pol.polymeerien_tunnistaminen_kaytto_ja_kierratys_kokonaisuudet",
      "task.integroiva_tehtava"
    ],
    "expectedConcepts": [
      "Polymeerien tunnistaminen, käyttö ja kierrätys – kokonaisuudet",
      "ke04.pol.polymeerien_tunnistaminen_kaytto_ja_kierratys_kokonaisuudet"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 6,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Integroiva tehtävä"
  },
  {
    "seedKey": "ke04-v3:KE04-POL-X01",
    "contentId": "KE04-POL-X01",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "application",
    "difficulty": 4,
    "prompt": "Polymeerin toistuva yksikkö on [–CH₂–CHCl–]ₙ. a) Päättele monomeerin rakennekaava. b) Nimeä monomeeri. c) Luokittele polymeroituminen.",
    "options": [],
    "correctAnswer": null,
    "explanation": "CH₂=CHCl, kloorieteeni/vinyylikloridi. Additiopolymeroituminen.",
    "scoring": "6 p: rakenne 3 p; nimi 1 p; polymeroitumistyyppi 2 p.",
    "hints": [
      "Palauta kahden päähiilen väliin C=C.",
      "Sivuryhmä Cl säilyy",
      "Piirrä tarvittaessa lähtö- ja tuoterakenne rinnakkain ja seuraa, mitkä sidokset muuttuvat.."
    ],
    "skills": [
      "polymer.monomer_from_repeat_unit",
      "addition_polymerization"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "polymer.monomer_from_repeat_unit",
      "addition_polymerization"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
    ],
    "estimatedSeconds": 309,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 6,
    "answerMode": "mixed",
    "matchingPairs": [],
    "originalType": "Monomeerin päättely"
  },
  {
    "seedKey": "ke04-v3:KE04-POL-X02",
    "contentId": "KE04-POL-X02",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "short_answer",
    "difficulty": 4,
    "prompt": "Kolmen materiaalin tiedot: A pehmenee kuumennettaessa ja voidaan muotoilla uudelleen; B ei sula virtaavaksi vaan rakenne säilyy pitkälle kuumennettaessa; C on hyvin joustava ja palautuu venytyksestä. Mitä rakenteellisia piirteitä epäilisit erityisesti A:n ja B:n ketjurakenteessa?",
    "options": [],
    "correctAnswer": null,
    "explanation": "A sopii vähäisesti ristisilloitettuun/lineaariseen termoplastiin, jossa ketjut voivat liikkua kuumennettaessa. B sopii voimakkaammin ristisilloitettuun verkostoon, jossa ketjut eivät pääse virtaamaan.",
    "scoring": "6 p: A 3 p; B 3 p.",
    "hints": [
      "Kysy pääsevätkö ketjut liukumaan.",
      "Ristisillat rajoittavat liikettä",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "polymer.structure_property",
      "thermoplastic_crosslinking"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "polymer.structure_property",
      "thermoplastic_crosslinking"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
    ],
    "estimatedSeconds": 154,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 6,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Materiaalidatan tulkinta"
  },
  {
    "seedKey": "ke04-v3:KE04-POL-X03",
    "contentId": "KE04-POL-X03",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "multiple_choice",
    "difficulty": 4,
    "prompt": "Mikä erottaa parhaiten additio- ja kondensaatiopolymeroitumisen?",
    "options": [
      "Additiossa monomeeri usein sisältää C=C:n eikä pientä sivutuotetta synny; kondensaatiossa reaktiiviset funktionaaliset ryhmät muodostavat sidoksia ja pieni molekyyli voi poistua",
      "Molemmat ovat aina täysin samoja",
      "Kondensaatiossa käytetään vain alkaaneja",
      "Additiossa syntyy aina vettä."
    ],
    "correctAnswer": "Additiossa monomeeri usein sisältää C=C:n eikä pientä sivutuotetta synny; kondensaatiossa reaktiiviset funktionaaliset ryhmät muodostavat sidoksia ja pieni molekyyli voi poistua",
    "explanation": "A.",
    "scoring": "4 p: A 1 p; additio-osa 1 p; kondensaatio-osa 2 p.",
    "hints": [
      "Eteeni→polyeteeni.",
      "Dioli+dihappo→polyesteri",
      "Sulje pois vaihtoehdot vertaamalla jokaista niistä reaktioyhtälöön, rakenteeseen tai määritelmään.."
    ],
    "skills": [
      "polymer.compare_mechanisms"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "polymer.compare_mechanisms"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "water_in_addition"
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
    "seedKey": "ke04-v3:KE04-POL-X04",
    "contentId": "KE04-POL-X04",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "short_answer",
    "difficulty": 4,
    "prompt": "Polyeteeninäytteen keskimääräinen moolimassa on 140 000 g/mol. Rakenneyksikön moolimassa on 28,0 g/mol. Arvioi polymeroitumisaste n ja selitä, miksi kyse on keskiarvosta.",
    "options": [],
    "correctAnswer": null,
    "explanation": "n≈140000/28,0=5000. Näytteessä voi olla eripituisia ketjuja, joten ilmoitettu moolimassa ja n kuvaavat keskimääräistä ketjukokoa.",
    "scoring": "5 p: lasku 3 p; keskiarvon selitys 2 p.",
    "hints": [
      "n≈M(polymeeri)/M(rakenneyksikkö).",
      "Kaikki ketjut eivät ole yhtä pitkiä",
      "Perustele lopputulos kemiallisella periaatteella, älä pelkällä muistettavalla säännöllä.."
    ],
    "skills": [
      "polymer.degree_of_polymerization",
      "molar_mass"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "polymer.degree_of_polymerization",
      "molar_mass"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
    ],
    "estimatedSeconds": 154,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 5,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Polymeroitumisaste"
  },
  {
    "seedKey": "ke04-v3:KE04-POL-X05",
    "contentId": "KE04-POL-X05",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "short_answer",
    "difficulty": 5,
    "prompt": "Kaksi samasta monomeerista valmistettua polymeerimateriaalia eroavat: X:n ketjut ovat pääosin lineaarisia, Y:ssä on paljon ristisidoksia. Ennusta, kumpi on helpompi sulattaa uudelleen ja miksi.",
    "options": [],
    "correctAnswer": null,
    "explanation": "X on helpompi pehmentää/sulattaa uudelleen, koska lineaariset ketjut voivat liukua toistensa ohi. Y:n ristisidokset muodostavat verkoston ja estävät ketjujen vapaan liikkeen.",
    "scoring": "6 p: X 1 p; lineaarisuuden perustelu 2 p; Y/ristisillat 3 p.",
    "hints": [
      "Mieti ketjujen liikkuvuutta.",
      "Ristisilta toimii kiinnityspisteenä",
      "Piirrä tarvittaessa lähtö- ja tuoterakenne rinnakkain ja seuraa, mitkä sidokset muuttuvat.."
    ],
    "skills": [
      "polymer.crosslinking",
      "recyclability",
      "structure_property"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "polymer.crosslinking",
      "recyclability",
      "structure_property"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
    ],
    "estimatedSeconds": 173,
    "examEligible": true,
    "reserveForExam": false,
    "validated": true,
    "points": 6,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Rakenne–ominaisuus"
  },
  {
    "seedKey": "ke04-v3:KE04-POL-X06",
    "contentId": "KE04-POL-X06",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "application",
    "difficulty": 5,
    "prompt": "Sinulla on kaksi tuntematonta muovinäytettä. Toinen pehmenee toistuvasti varovasti kuumennettaessa, toinen ei. Suunnittele turvallinen, laadullinen vertailu, joka tukisi päätelmää termoplastisesta vs ristisilloitetummasta rakenteesta. Mitä havaitsisit?",
    "options": [],
    "correctAnswer": null,
    "explanation": "Pieniä näytteitä lämmitetään hallitusti samanlaisissa olosuhteissa ilman palamista ja havaitaan pehmeneminen/muovautuvuus jäähdytys–uudelleenlämmityssyklissä. Toistuvasti pehmenevä tukee termoplastista rakennetta; muotoaan säilyttävä/ei virtaava tukee ristisilloitetumpaa verkostoa. Koe ei yksin todista tarkkaa polymeeriä.",
    "scoring": "8 p: kontrolloitu vertailu 3 p; havainnot 3 p; varovainen johtopäätös 2 p.",
    "hints": [
      "Pidä olosuhteet samoina.",
      "Testaa palautuvaa pehmenemistä, älä polttamista",
      "Perustele päätelmä yhdistämällä havainto tai mittaus suoraan kemialliseen malliin.."
    ],
    "skills": [
      "polymer.experimental_design",
      "thermal_behavior"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "polymer.experimental_design",
      "thermal_behavior"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
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
    "seedKey": "ke04-v3:KE04-POL-X07",
    "contentId": "KE04-POL-X07",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "Polyesterin toistuvassa rakenteessa näkyy –O–R–O–CO–R'–CO–. a) Päättele kaksi monomeerityyppiä. b) Nimeä toistuva sidostyyppi. c) Luokittele polymeroituminen. d) Selitä, mitä hydrolyysi tekisi ketjulle.",
    "options": [],
    "correctAnswer": null,
    "explanation": "a) Dioli ja dikarboksyylihappo. b) Esterisidos. c) Kondensaatiopolymeroituminen. d) Hydrolyysi katkoo esterisidoksia veden avulla ja lyhentää/pilkkoo ketjua.",
    "scoring": "10 p: monomeerit 3 p; sidos 2 p; polymeroituminen 2 p; hydrolyysi 3 p.",
    "hints": [
      "Katkaise –COO– mielessä.",
      "Esterin lähtöaineet ovat alkoholi ja happo",
      "Piirrä tarvittaessa lähtö- ja tuoterakenne rinnakkain ja seuraa, mitkä sidokset muuttuvat.."
    ],
    "skills": [
      "polymer.polyester",
      "monomers",
      "condensation",
      "hydrolysis"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "polymer.polyester",
      "monomers",
      "condensation",
      "hydrolysis"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 10,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Koereservi – polyesteri"
  },
  {
    "seedKey": "ke04-v3:KE04-POL-X08",
    "contentId": "KE04-POL-X08",
    "chapter": 14,
    "topicName": "Polymeroituminen ja polymeerit",
    "subtopic": "syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
    "questionType": "simulation",
    "difficulty": 5,
    "prompt": "Tarvitaan materiaali, jonka pitää olla jäykkä, kestää lämpöä eikä pehmetä helposti uudelleen. Kaksi ehdokasta: A lineaarinen polymeeri heikoilla ketjujen välisillä voimilla; B ristisilloitettu verkosto. Valitse ja perustele molekyylitasolla. Mainitse myös yksi haitta kierrätettävyyden kannalta.",
    "options": [],
    "correctAnswer": null,
    "explanation": "B. Ristisillat rajoittavat ketjujen liikkumista ja parantavat jäykkyyttä/lämmönkestoa. Haittana materiaalia on vaikeampi sulattaa ja muotoilla uudelleen mekaanisessa kierrätyksessä.",
    "scoring": "8 p: B 1 p; ristisillat 3 p; ominaisuudet 2 p; kierrätyshaitta 2 p.",
    "hints": [
      "Liikkumattomammat ketjut → jäykempi rakenne.",
      "Mieti mitä sulatus vaatii",
      "Piirrä tarvittaessa lähtö- ja tuoterakenne rinnakkain ja seuraa, mitkä sidokset muuttuvat.."
    ],
    "skills": [
      "polymer.material_selection",
      "crosslinking",
      "recycling"
    ],
    "expectedConcepts": [
      "V3 – syventävät aineisto-, kokeellisuus- ja soveltamistehtävät",
      "polymer.material_selection",
      "crosslinking",
      "recycling"
    ],
    "prerequisites": [
      "monomer_structure",
      "bond_types",
      "organic_reactions"
    ],
    "commonErrors": [
      "addition_vs_condensation_polymerization",
      "monomer_to_repeat_unit"
    ],
    "estimatedSeconds": 654,
    "examEligible": true,
    "reserveForExam": true,
    "validated": true,
    "points": 8,
    "answerMode": "text",
    "matchingPairs": [],
    "originalType": "Koereservi – materiaalivalinta"
  }
];
