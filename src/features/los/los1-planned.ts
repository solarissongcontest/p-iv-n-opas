/** Planned pedagogical map from LOS_BOOK_01_SPEC v1.0 (10 Nov 2026).
 * NOT published texts, exercises, or verified progress. Content slots remain empty
 * until human-authored source materials pass the chapter publication gate.
 */
import type { Chapter, Lesson } from "./model";
export const LOS1_PLANNED_CHAPTERS: Chapter[] = [
  {
    "id": "C01",
    "version": "1.0.0",
    "sequence": 1,
    "title": "Hallo!",
    "introductionFi": "Tervehtiminen ja ensimmäiset saksan äänteet.",
    "objectives": [
      "L1-INT-01",
      "L1-PHON-01"
    ],
    "blockIds": [],
    "exerciseIds": [],
    "publicationStatus": "planned",
    "plannedSourceIds": [
      "M-COM-01",
      "M-COM-03",
      "V-DW-01"
    ]
  },
  {
    "id": "C02",
    "version": "1.0.0",
    "sequence": 2,
    "title": "Ich heiße …",
    "introductionFi": "Kysy ja kerro nimi.",
    "objectives": [
      "L1-INT-02",
      "L1-GRA-01"
    ],
    "blockIds": [],
    "exerciseIds": [],
    "publicationStatus": "planned",
    "plannedSourceIds": [
      "M-WB-01",
      "M-COM-02"
    ]
  },
  {
    "id": "C03",
    "version": "1.0.0",
    "sequence": 3,
    "title": "Woher kommst du?",
    "introductionFi": "Kysy ja kerro, mistä olet kotoisin.",
    "objectives": [
      "L1-INT-03"
    ],
    "blockIds": [],
    "exerciseIds": [],
    "publicationStatus": "planned",
    "plannedSourceIds": [
      "M-DIB-01",
      "M-COM-02",
      "V-DW-03"
    ]
  },
  {
    "id": "C04",
    "version": "1.0.0",
    "sequence": 4,
    "title": "Du oder Sie?",
    "introductionFi": "Tunnista ja käytä kohteliasta puhuttelua.",
    "objectives": [
      "L1-INT-04",
      "L1-CULT-01"
    ],
    "blockIds": [],
    "exerciseIds": [],
    "publicationStatus": "planned",
    "plannedSourceIds": [
      "M-WB-06",
      "M-DIB-07",
      "M-COM-03"
    ]
  },
  {
    "id": "C05",
    "version": "1.0.0",
    "sequence": 5,
    "title": "Wie geht’s?",
    "introductionFi": "Kysy vointia ja vastaa.",
    "objectives": [
      "L1-INT-05"
    ],
    "blockIds": [],
    "exerciseIds": [],
    "publicationStatus": "planned",
    "plannedSourceIds": [
      "M-WB-05",
      "M-DIB-05",
      "V-EASY-01"
    ]
  },
  {
    "id": "C06",
    "version": "1.0.0",
    "sequence": 6,
    "title": "Wie alt bist du?",
    "introductionFi": "Numerot 0–100 ja iän kertominen.",
    "objectives": [
      "L1-NUM-01",
      "L1-INT-06"
    ],
    "blockIds": [],
    "exerciseIds": [],
    "publicationStatus": "planned",
    "plannedSourceIds": [
      "M-COM-01",
      "M-DIB-02",
      "M-DIB-05"
    ]
  },
  {
    "id": "C07",
    "version": "1.0.0",
    "sequence": 7,
    "title": "Wie schreibt man das?",
    "introductionFi": "Aakkoset, tavaaminen ja numerot.",
    "objectives": [
      "L1-PHON-01",
      "L1-STRAT-01"
    ],
    "blockIds": [],
    "exerciseIds": [],
    "publicationStatus": "planned",
    "plannedSourceIds": [
      "M-WB-02",
      "M-DIB-06",
      "V-DW-02"
    ]
  },
  {
    "id": "C08",
    "version": "1.0.0",
    "sequence": 8,
    "title": "Noch einmal, bitte!",
    "introductionFi": "Selviytyminen luokassa ja selityksen pyytäminen.",
    "objectives": [
      "L1-STRAT-01"
    ],
    "blockIds": [],
    "exerciseIds": [],
    "publicationStatus": "planned",
    "plannedSourceIds": [
      "M-DIB-04",
      "M-DIB-03",
      "V-DIB-01"
    ]
  },
  {
    "id": "C09",
    "version": "1.0.0",
    "sequence": 9,
    "title": "Am Montag um drei.",
    "introductionFi": "Viikonpäivät, ajat ja tapaamiset.",
    "objectives": [
      "L1-TIME-01"
    ],
    "blockIds": [],
    "exerciseIds": [],
    "publicationStatus": "planned",
    "plannedSourceIds": [
      "M-WB-03",
      "M-WB-04",
      "M-DIB-05"
    ]
  },
  {
    "id": "C10",
    "version": "1.0.0",
    "sequence": 10,
    "title": "Schön, dich kennenzulernen!",
    "introductionFi": "Yhdistä opitut asiat kokonaiseksi kohtaamiseksi.",
    "objectives": [
      "L1-PROD-01"
    ],
    "blockIds": [],
    "exerciseIds": [],
    "publicationStatus": "planned",
    "plannedSourceIds": [
      "M-DIB-02",
      "M-DIB-01",
      "V-GOE-01"
    ]
  }
];


export const LOS1_PLANNED_LESSONS: Lesson[] = [
  {
    "id": "L001",
    "version": "1.0.0",
    "bookId": "los-1",
    "sequence": 1,
    "title": "Miten LOS! 1:llä opiskellaan?",
    "estimatedMinutes": 30,
    "objectives": [],
    "model": "application",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L002",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C01",
    "sequence": 2,
    "title": "Aloita saksan ääntämisestä",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-INT-01",
      "L1-PHON-01"
    ],
    "model": "text",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L003",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C01",
    "sequence": 3,
    "title": "Lue Franzin ja Jörgin keskustelu",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-INT-01",
      "L1-PHON-01"
    ],
    "model": "text",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L004",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C01",
    "sequence": 4,
    "title": "Tervehdykset muistista",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-INT-01",
      "L1-PHON-01"
    ],
    "model": "vocabulary",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L005",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C01",
    "sequence": 5,
    "title": "Kuuntele ja valitse tervehdys",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-INT-01",
      "L1-PHON-01"
    ],
    "model": "application",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L006",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C01",
    "sequence": 6,
    "title": "Harjoittele ja testaa C01",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-INT-01",
      "L1-PHON-01"
    ],
    "model": "review",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L007",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C02",
    "sequence": 7,
    "title": "Miten kysyn nimen?",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-INT-02",
      "L1-GRA-01"
    ],
    "model": "text",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L008",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C02",
    "sequence": 8,
    "title": "Franz ja Greta: kokonainen dialogi",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-INT-02",
      "L1-GRA-01"
    ],
    "model": "text",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L009",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C02",
    "sequence": 9,
    "title": "Heißen ja sein minä–sinä",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-INT-02",
      "L1-GRA-01"
    ],
    "model": "vocabulary",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L010",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C02",
    "sequence": 10,
    "title": "Kuuntele ja esittele henkilö",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-INT-02",
      "L1-GRA-01"
    ],
    "model": "application",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L011",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C02",
    "sequence": 11,
    "title": "Harjoittele ja testaa C02",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-INT-02",
      "L1-GRA-01"
    ],
    "model": "review",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L012",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C03",
    "sequence": 12,
    "title": "Maat ja paikat",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-INT-03"
    ],
    "model": "text",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L013",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C03",
    "sequence": 13,
    "title": "Berna: alkuperän tunnistaminen",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-INT-03"
    ],
    "model": "text",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L014",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C03",
    "sequence": 14,
    "title": "Kommen ja woher",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-INT-03"
    ],
    "model": "vocabulary",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L015",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C03",
    "sequence": 15,
    "title": "Nicon alkuperä ja karttatehtävät",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-INT-03"
    ],
    "model": "application",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L016",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C03",
    "sequence": 16,
    "title": "Harjoittele ja testaa C03",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-INT-03"
    ],
    "model": "review",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L017",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C04",
    "sequence": 17,
    "title": "Milloin du tai Sie?",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-INT-04",
      "L1-CULT-01"
    ],
    "model": "text",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L018",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C04",
    "sequence": 18,
    "title": "Muodollisen keskustelun kokonainen teksti",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-INT-04",
      "L1-CULT-01"
    ],
    "model": "text",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L019",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C04",
    "sequence": 19,
    "title": "Kohtelias verbinmuoto",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-INT-04",
      "L1-CULT-01"
    ],
    "model": "vocabulary",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L020",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C04",
    "sequence": 20,
    "title": "Käytä kohteliaisuusfraaseja",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-INT-04",
      "L1-CULT-01"
    ],
    "model": "application",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L021",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C04",
    "sequence": 21,
    "title": "Harjoittele ja testaa C04",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-INT-04",
      "L1-CULT-01"
    ],
    "model": "review",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L022",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C05",
    "sequence": 22,
    "title": "Mitä kuuluu?",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-INT-05"
    ],
    "model": "text",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L023",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C05",
    "sequence": 23,
    "title": "Lue vointidialogi",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-INT-05"
    ],
    "model": "text",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L024",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C05",
    "sequence": 24,
    "title": "Vointifraasit ja nicht",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-INT-05"
    ],
    "model": "vocabulary",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L025",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C05",
    "sequence": 25,
    "title": "Kuuntele mieliala ja vastaa",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-INT-05"
    ],
    "model": "application",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L026",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C05",
    "sequence": 26,
    "title": "Harjoittele ja testaa C05",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-INT-05"
    ],
    "model": "review",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L027",
    "version": "1.0.0",
    "bookId": "los-1",
    "sequence": 27,
    "title": "Muistanko tervehtimisen ja esittäytymisen?",
    "estimatedMinutes": 30,
    "objectives": [],
    "model": "review",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L028",
    "version": "1.0.0",
    "bookId": "los-1",
    "sequence": 28,
    "title": "Voinnin ja kohteliaisuuden taitosekoitus",
    "estimatedMinutes": 30,
    "objectives": [],
    "model": "review",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L029",
    "version": "1.0.0",
    "bookId": "los-1",
    "sequence": 29,
    "title": "Autenttisen keskustelun kertauskuuntelu",
    "estimatedMinutes": 30,
    "objectives": [],
    "model": "review",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L030",
    "version": "1.0.0",
    "bookId": "los-1",
    "sequence": 30,
    "title": "Välikoe: kappaleet 1–5",
    "estimatedMinutes": 30,
    "objectives": [],
    "model": "application",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L031",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C06",
    "sequence": 31,
    "title": "Numerot 0–12",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-NUM-01",
      "L1-INT-06"
    ],
    "model": "text",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L032",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C06",
    "sequence": 32,
    "title": "Numerot 13–20 ja ikä",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-NUM-01",
      "L1-INT-06"
    ],
    "model": "text",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L033",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C06",
    "sequence": 33,
    "title": "Numerot 21–100: rakenne",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-NUM-01",
      "L1-INT-06"
    ],
    "model": "vocabulary",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L034",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C06",
    "sequence": 34,
    "title": "Kuuntele ikähaastattelu",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-NUM-01",
      "L1-INT-06"
    ],
    "model": "application",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L035",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C06",
    "sequence": 35,
    "title": "Harjoittele ja testaa C06",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-NUM-01",
      "L1-INT-06"
    ],
    "model": "review",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L036",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C07",
    "sequence": 36,
    "title": "Aakkosten ja nimen kertaus",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-PHON-01",
      "L1-STRAT-01"
    ],
    "model": "text",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L037",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C07",
    "sequence": 37,
    "title": "Lue tavaamiskeskustelu",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-PHON-01",
      "L1-STRAT-01"
    ],
    "model": "text",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L038",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C07",
    "sequence": 38,
    "title": "Tavaa ja ymmärrä numeroita",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-PHON-01",
      "L1-STRAT-01"
    ],
    "model": "vocabulary",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L039",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C07",
    "sequence": 39,
    "title": "Kuuntele ja täytä lomake",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-PHON-01",
      "L1-STRAT-01"
    ],
    "model": "application",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L040",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C07",
    "sequence": 40,
    "title": "Harjoittele ja testaa C07",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-PHON-01",
      "L1-STRAT-01"
    ],
    "model": "review",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L041",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C08",
    "sequence": 41,
    "title": "Selviytymisfraasit",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-STRAT-01"
    ],
    "model": "text",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L042",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C08",
    "sequence": 42,
    "title": "Luokkatilanteen alkuperäisteksti",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-STRAT-01"
    ],
    "model": "text",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L043",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C08",
    "sequence": 43,
    "title": "Kuuntelustrategiat ja selityspyynnöt",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-STRAT-01"
    ],
    "model": "vocabulary",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L044",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C08",
    "sequence": 44,
    "title": "Harjoittele vuorovaikutusta",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-STRAT-01"
    ],
    "model": "application",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L045",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C08",
    "sequence": 45,
    "title": "Harjoittele ja testaa C08",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-STRAT-01"
    ],
    "model": "review",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L046",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C09",
    "sequence": 46,
    "title": "Viikonpäivät",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-TIME-01"
    ],
    "model": "text",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L047",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C09",
    "sequence": 47,
    "title": "Lue Sport und Zeit",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-TIME-01"
    ],
    "model": "text",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L048",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C09",
    "sequence": 48,
    "title": "Am Montag, um drei Uhr",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-TIME-01"
    ],
    "model": "vocabulary",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L049",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C09",
    "sequence": 49,
    "title": "Kuuntele ja merkitse kalenteriin",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-TIME-01"
    ],
    "model": "application",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L050",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C09",
    "sequence": 50,
    "title": "Harjoittele ja testaa C09",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-TIME-01"
    ],
    "model": "review",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L051",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C10",
    "sequence": 51,
    "title": "Kokoa esittelyfraasit",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-PROD-01"
    ],
    "model": "text",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L052",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C10",
    "sequence": 52,
    "title": "Kuuntele Haraldin haastattelu",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-PROD-01"
    ],
    "model": "text",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L053",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C10",
    "sequence": 53,
    "title": "Esittele kolmas henkilö",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-PROD-01"
    ],
    "model": "vocabulary",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L054",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C10",
    "sequence": 54,
    "title": "Rakenna kaksi keskustelua",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-PROD-01"
    ],
    "model": "application",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L055",
    "version": "1.0.0",
    "bookId": "los-1",
    "chapterId": "C10",
    "sequence": 55,
    "title": "Harjoittele ja testaa C10",
    "estimatedMinutes": 30,
    "objectives": [
      "L1-PROD-01"
    ],
    "model": "review",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L056",
    "version": "1.0.0",
    "bookId": "los-1",
    "sequence": 56,
    "title": "Luvut, tavaaminen ja viikonpäivät",
    "estimatedMinutes": 30,
    "objectives": [],
    "model": "review",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L057",
    "version": "1.0.0",
    "bookId": "los-1",
    "sequence": 57,
    "title": "Kaikkien 10 kappaleen taitosekoitus",
    "estimatedMinutes": 30,
    "objectives": [],
    "model": "review",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L058",
    "version": "1.0.0",
    "bookId": "los-1",
    "sequence": 58,
    "title": "Täydellinen esittelyharjoitus ilman vihjeitä",
    "estimatedMinutes": 30,
    "objectives": [],
    "model": "review",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L059",
    "version": "1.0.0",
    "bookId": "los-1",
    "sequence": 59,
    "title": "Koko kirjan loppukoe",
    "estimatedMinutes": 30,
    "objectives": [],
    "model": "application",
    "steps": [],
    "publicationStatus": "planned"
  },
  {
    "id": "L060",
    "version": "1.0.0",
    "bookId": "los-1",
    "sequence": 60,
    "title": "Mitä osaan nyt saksaksi?",
    "estimatedMinutes": 30,
    "objectives": [],
    "model": "application",
    "steps": [],
    "publicationStatus": "planned"
  }
];

