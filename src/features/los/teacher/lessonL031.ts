import type { TeacherLesson } from "./engine.ts";
/** C06 Teacher manuscript uses the existing genuine numeric bank and draft. No simulated listening score. */
export const LOS1_L031_TEACHER: TeacherLesson = {
  "id": "L031",
  "bookId": 1,
  "chapterId": "06",
  "version": "2.0.0-preview.1",
  "title": "Numerot 0–12",
  "objective": "Tunnistan ja kirjoitan luvut 0–12, mukaan lukien poikkeavat elf ja zwölf, ja harjoittelen kirjan todellisia numerotehtäviä.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredPracticeIds": [
    "C06-EX-01",
    "C06-EX-02",
    "C06-EX-03",
    "C06-EX-04",
    "C06-EX-07",
    "C06-EX-08"
  ],
  "requiredActivityIds": [
    "reviewed-031"
  ],
  "scenes": [
    {
      "id": "welcome",
      "phase": "Aloitus",
      "title": "Ensimmäiset saksankieliset lukusi",
      "kind": "introduction",
      "paragraphs": [
        "Saksaksi lukeminen alkaa myös numeroista. Tällä tunnilla opit lukusanat nollasta kahteentoista ja ymmärrät, miksi 11 ja 12 kannattaa opetella erikseen.",
        "Et tarvitse syntymäpäivääsi, puhelinnumeroasi tai muitakaan henkilökohtaisia numeroita. Käytä vain opettajan kuvitteellisia lukuesimerkkejä.",
        "Lopuksi teet C06:n oikeat tehtävät 01–04 sekä 07–08. Ne löytyvät kirjan Harjoittele-sivulta ja tallentuvat sinne, eivät keinotekoiseen lisäkokeeseen."
      ]
    },
    {
      "id": "recall",
      "phase": "Muistelu",
      "title": "Mikä on numero yksi?",
      "kind": "question",
      "paragraphs": [
        "Aloita numerosta, jonka saatat jo tuntea. Mieti kirjoitusta, älä ääntämisen pisteytystä."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-NUM-06",
        "evidenceRole": "practice",
        "prompt": "Miten kirjoitat luvun 1 yksinään?",
        "options": [
          {
            "id": "a",
            "label": "ein",
            "wrongFeedback": "Ein esiintyy esimerkiksi yhdyssanassa einundzwanzig, mutta itsenäinen 1 on eins."
          },
          {
            "id": "b",
            "label": "eins"
          },
          {
            "id": "c",
            "label": "einz",
            "wrongFeedback": "Saksan itsenäisen ykkösen lopussa on s, ei z."
          }
        ],
        "correctOption": "b",
        "success": "Oikein, itsenäinen luku 1 on eins.",
        "hint": "Muista sanan loppu -s.",
        "reteach": "Oikein, itsenäinen luku 1 on eins. Muista sanan loppu -s.",
        "genericWrong": "Vertaa ilmauksen merkitystä ja muotoa vielä kerran. Muista sanan loppu -s."
      }
    },
    {
      "id": "explain",
      "phase": "Opetus",
      "title": "Miksi elf ja zwölf pitää muistaa?",
      "kind": "explanation",
      "paragraphs": [
        "Null = 0, eins = 1, zwei = 2, drei = 3, vier = 4 ja fünf = 5. Seuraavat luvut ovat sechs = 6, sieben = 7, acht = 8 ja neun = 9.",
        "Zehn tarkoittaa kymmentä. Sen jälkeen 11 on elf ja 12 on zwölf. Näitä ei rakenneta lisäämällä yksi tai kaksi suoraan zehn-sanaan.",
        "Vertaile saksan vokaaleja: fünf sisältää ü:n ja zwölf ö:n. Jos kirjoitat funf tai zwolf, kirjoitusasu jää vajaaksi.",
        "Äänteiden toistoa tai oikeaa ääntämistä ei arvioida automaattisesti tässä tunnissa. Kuuntele vain lähde, jonka oikeudet ja toimivuus ovat saatavilla."
      ],
      "help": [
        {
          "title": "Miksi eins mutta ein?",
          "body": "Kun numero 1 esiintyy yksin, käytetään eins. Myöhemmässä lukusanassa einundzwanzig on ein ilman loppu-s:ää. Tässä riittää niiden eron tunnistaminen."
        },
        {
          "title": "Miten muistan elf ja zwölf?",
          "body": "Elf = 11, zwölf = 12. Kumpikaan ei ole einszehn tai zweizehn. Kirjoita ensin muistista, sitten tarkista kirjasta."
        },
        {
          "title": "Entä jos en osaa ü:tä tai ö:tä?",
          "body": "Fünf ja zwölf kirjoitetaan saksassa umlaut-merkeillä. Voit tarkastella merkkejä kirjan sivulla; ääntämisestä ei anneta automaattista arvosanaa."
        }
      ]
    },
    {
      "id": "board",
      "phase": "Opetustaulu",
      "title": "Lukupolku 0–12",
      "kind": "board",
      "paragraphs": [
        "Avaa opetustaulun rivit yksi kerrallaan. Vertaa numeromerkkiä ja sitä vastaavaa saksankielistä sanaa."
      ],
      "board": [
        {
          "label": "0–2",
          "german": "null · eins · zwei",
          "meaning": "Nolla, yksi, kaksi."
        },
        {
          "label": "3–5",
          "german": "drei · vier · fünf",
          "meaning": "Kolme, neljä, viisi; huomaa ü."
        },
        {
          "label": "6–8",
          "german": "sechs · sieben · acht",
          "meaning": "Kuusi, seitsemän, kahdeksan."
        },
        {
          "label": "9–10",
          "german": "neun · zehn",
          "meaning": "Yhdeksän ja kymmenen."
        },
        {
          "label": "11",
          "german": "elf",
          "meaning": "Yksitoista, oma poikkeava sana."
        },
        {
          "label": "12",
          "german": "zwölf",
          "meaning": "Kaksitoista, ei zweizehn."
        }
      ]
    },
    {
      "id": "guided",
      "phase": "Ohjattu harjoittelu",
      "title": "Tarkista poikkeava kaksitoista",
      "kind": "question",
      "paragraphs": [
        "Yritä ratkaista ensin muistista. Mieti erityisesti, onko tämä vielä tavallinen zehn-yhdyssana."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-NUM-06",
        "evidenceRole": "practice",
        "prompt": "Mikä kirjoitusasu vastaa lukua 12?",
        "options": [
          {
            "id": "a",
            "label": "zweizehn",
            "wrongFeedback": "Tämä muistuttaa kaavaa kaksi + kymmenen, mutta 12 on poikkeus."
          },
          {
            "id": "b",
            "label": "zweiundzehn",
            "wrongFeedback": "Und kuuluu luvun 21 kaltaisiin rakenteisiin, ei kahteentoista."
          },
          {
            "id": "c",
            "label": "zwölf"
          }
        ],
        "correctOption": "c",
        "success": "Kaksitoista kirjoitetaan zwölf.",
        "hint": "Muista ö ja lf.",
        "reteach": "Kaksitoista kirjoitetaan zwölf. Muista ö ja lf.",
        "genericWrong": "Vertaa ilmauksen merkitystä ja muotoa vielä kerran. Muista ö ja lf."
      }
    },
    {
      "id": "source",
      "phase": "Alkuperäisteksti",
      "title": "Tarkista kirjan oikea numerotaulukko",
      "kind": "book",
      "paragraphs": [
        "Avaa C06:n kielioppi- tai sanastosivu. Etsi null, eins, elf ja zwölf ja käy läpi kaikki muut luvut 0–12.",
        "C06:n uusi Text A sisältää myös lukusanat fünf, elf ja zwölf oikean julkaistun keskustelun osana. Tekstiä harjoitellaan tarkemmin L034:ssä."
      ],
      "bookLinks": [
        {
          "chapterId": "06",
          "section": "grammar",
          "label": "C06 · Numerot 0–20",
          "instruction": "Kertaa taulukosta ainakin 0, 1, 11 ja 12."
        },
        {
          "chapterId": "06",
          "section": "vocabulary",
          "label": "C06 · Sanasto",
          "instruction": "Kertaa saksan lukusanat 0–12."
        }
      ]
    },
    {
      "id": "practice",
      "phase": "Harjoittelu kirjassa",
      "title": "Tee kuusi todellista kirjatehtävää",
      "kind": "book",
      "paragraphs": [
        "Tee C06-EX-01 (null), EX-02 (eins), EX-03 (zwei), EX-04 (drei), EX-07 (elf) ja EX-08 (zwölf). Kokeile jokaisessa vastausta ennen kirjan tarkistusta.",
        "Opettajan suoritusmerkintä edellyttää kaikkien kuuden vastauksen tallentumista, ei täysiä pisteitä. Näiden harjoitusten vastaukset säilyvät kirjan nykyisissä C06-tiedoissa."
      ],
      "bookLinks": [
        {
          "chapterId": "06",
          "section": "practice",
          "label": "C06 · Harjoittele 01–04 ja 07–08",
          "instruction": "Vastaa kuuteen oikeaan numerotehtävään."
        }
      ]
    },
    {
      "id": "independent",
      "phase": "Itsenäinen harjoittelu",
      "title": "Kirjoita 11 ilman mallia",
      "kind": "question",
      "paragraphs": [
        "Sulje numerotaulukko. Kirjoita yksi sana ilman valmista mallia."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-NUM-06",
        "evidenceRole": "independent",
        "prompt": "Kirjoita saksaksi luku yksitoista (11).",
        "accepted": [
          "elf"
        ],
        "success": "Elf tarkoittaa lukua 11.",
        "hint": "Se on lyhyt kolmekirjaiminen sana.",
        "reteach": "Elf tarkoittaa lukua 11. Se on lyhyt kolmekirjaiminen sana.",
        "genericWrong": "Tarkista kirjoitusasu. Se on lyhyt kolmekirjaiminen sana.",
        "wrongAnswers": {
          "einszehn": "Yksitoista on poikkeava elf, ei einszehn.",
          "zwölf": "Zwölf tarkoittaa kahtatoista, ei yhtätoista."
        }
      }
    },
    {
      "id": "application",
      "phase": "Soveltaminen",
      "title": "Lue numerot eri järjestyksessä",
      "kind": "question",
      "paragraphs": [
        "Kuvitteellisen pelin kortissa on numerot 1, 11 ja 12. Valitse oikea saksankielinen sarja."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-NUM-06",
        "evidenceRole": "application",
        "prompt": "Mikä sarja vastaa järjestystä 1, 11, 12?",
        "options": [
          {
            "id": "a",
            "label": "eins, elf, zwölf"
          },
          {
            "id": "b",
            "label": "ein, zwölf, elf",
            "wrongFeedback": "Järjestys on väärä, ja itsenäinen yksi kirjoitetaan eins."
          },
          {
            "id": "c",
            "label": "eins, elf, zweizehn",
            "wrongFeedback": "Zweizehn ei ole kaksitoista."
          }
        ],
        "correctOption": "a",
        "success": "Oikein. Eins, elf, zwölf muodostaa oikean sarjan.",
        "hint": "Muista kahden viimeisen luvun erot.",
        "reteach": "Oikein. Eins, elf, zwölf muodostaa oikean sarjan. Muista kahden viimeisen luvun erot.",
        "genericWrong": "Vertaa ilmauksen merkitystä ja muotoa vielä kerran. Muista kahden viimeisen luvun erot."
      }
    },
    {
      "id": "activity",
      "phase": "Oma harjoittelu",
      "title": "Kokeile muistista ja vahvista oma harjoittelu",
      "kind": "activity",
      "paragraphs": [
        "Sano tai kirjoita muistista numerot 0, 1, 5, 7, 11 ja 12. Vertaa kirjan taulukkoon vasta oman yrityksen jälkeen.",
        "Tämä on oma muistiharjoittelusi. Vahvistus ei väitä, että sovellus olisi kuullut tai pisteyttänyt ääntämisesi."
      ],
      "activityId": "reviewed-031",
      "activityLabel": "Harjoittelin luvut 0–12 muistista"
    },
    {
      "id": "exit",
      "phase": "Lopputarkistus",
      "title": "Viimeinen nopea tarkistus",
      "kind": "question",
      "paragraphs": [
        "Älä katso taulua ennen valintaa."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-NUM-06",
        "evidenceRole": "exit",
        "prompt": "Mikä kahdesta sanasta tarkoittaa numeroa 12 eikä 11?",
        "options": [
          {
            "id": "a",
            "label": "elf",
            "wrongFeedback": "Elf on 11."
          },
          {
            "id": "b",
            "label": "zwölf"
          },
          {
            "id": "c",
            "label": "zehn",
            "wrongFeedback": "Zehn tarkoittaa kymmentä."
          }
        ],
        "correctOption": "b",
        "success": "Zwölf = 12.",
        "hint": "Muista poikkeavat luvut 11 ja 12.",
        "reteach": "Zwölf = 12. Muista poikkeavat luvut 11 ja 12.",
        "genericWrong": "Vertaa ilmauksen merkitystä ja muotoa vielä kerran. Muista poikkeavat luvut 11 ja 12."
      }
    },
    {
      "id": "summary",
      "phase": "Kertaus",
      "title": "Ensimmäinen lukusarja on koottu",
      "kind": "summary",
      "paragraphs": [
        "Harjoittelit lukusanat 0–12 ja poikkeavat elf sekä zwölf. Tunnistit myös umlaut-merkit ü ja ö.",
        "Kirjan kuusi tehtävää ja oma harjoitteluvahvistus ovat erillisiä opettajan sisäisistä kysymyksistä. L032:ssa siirryt lukuihin 13–20 ja kysymykseen Wie alt bist du?."
      ]
    }
  ]
};
