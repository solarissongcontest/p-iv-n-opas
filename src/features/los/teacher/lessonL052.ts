import type { TeacherLesson } from "./engine.ts";
/** C10 L052: original COERLL Harald 14-line reading, no phone-number or unverified audio assessment. */
export const LOS1_L052_TEACHER: TeacherLesson = {
  "id": "L052",
  "bookId": 1,
  "chapterId": "10",
  "version": "2.0.0-preview.1",
  "title": "Lue Haraldin koko haastattelu",
  "objective": "Luetun ymmärtämisen taito: luen kaikki Haraldin 14 alkuperäisrepliikkiä, tunnistan henkilötiedot lähteestä ja tarkistan kolme oikeaa kysymystä sekä erillisen tekstikohdan.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredPracticeIds": [],
  "requiredCheckedIds": [
    "C10-HARALD-Q02",
    "C10-HARALD-Q03",
    "C10-HARALD-Q04",
    "C10-SOURCE-EVIDENCE-01"
  ],
  "requiredActivityIds": [
    "c10-teacher-L052"
  ],
  "scenes": [
    {
      "id": "welcome",
      "kind": "introduction",
      "phase": "Aloitus",
      "title": "Haraldin autenttinen esittely on kokonainen",
      "paragraphs": [
        "C10 Text A sisältää COERLL:n Harald Becker -haastattelun kaikki 14 kirjoitettua puheenvuoroa. Tässä tunnissa käsittelet niitä koko tekstinä, et irrotettuna, kuvitteellisena esittelypuheena.",
        "L051:ssä kysyit jo Haraldin kotipaikkaa ja ikää. L052:ssa tarkistat iän uudelleen muistin palautuksena, tutkit lempiväriä ja sen perustelua, ja paikannat ikärepliikin.",
        "Haastattelun alkuperäistä audio- tai videotiedostoa ei ole vahvistetusti upotettu. Opettajan suoritus koskee lukemista, ei kuuntelemista. Haastattelun henkilökohtaista numerolukusarjaa ei tarvitse kopioida."
      ]
    },
    {
      "id": "recall",
      "kind": "question",
      "phase": "Muistelu",
      "title": "Haraldin kotipaikka",
      "paragraphs": [
        "Palauta mieleen alkuperäisen haastattelun neljäs puheenvuoro."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-MEET-10",
        "evidenceRole": "practice",
        "prompt": "Mistä Harald sanoo olevansa alun perin?",
        "options": [
          {
            "id": "a",
            "label": "Münchenistä"
          },
          {
            "id": "b",
            "label": "Berliinistä",
            "wrongFeedback": "Harald sanoo ursprünglich aus München."
          },
          {
            "id": "c",
            "label": "Helsingistä",
            "wrongFeedback": "Helsinkiä ei ilmoiteta Haraldin kotipaikaksi."
          }
        ],
        "correctOption": "a",
        "success": "Harald kertoo olevansa alun perin Münchenistä.",
        "hint": "Ursprünglich aus München.",
        "reteach": "Harald kertoo olevansa alun perin Münchenistä. Ursprünglich aus München.",
        "genericWrong": "Tarkista puhujan tilanne ja muoto. Ursprünglich aus München."
      }
    },
    {
      "id": "explain",
      "kind": "explanation",
      "phase": "Opetus",
      "title": "Alkuperäisestä lähteestä pitää erottaa fakta ja huumori",
      "paragraphs": [
        "Haastattelun alussa kysytään Wie heißt du? ja Harald vastaa Ich heiße Harald Becker. Seuraava kysymys Woher kommst du? saa vastauksen München.",
        "Harald luonnehtii Münchenin sijaintia sanoilla Süddeutschland. Ilmaus im zivilisierten Teil Deutschlands on puhujan humoristinen mielipide, ei maantieteellinen tosiasia tai oppikirjan väite.",
        "Ikäkysymys Wie alt bist du? saa vastauksen Ich bin jetzt so um die fünfzig. Se tarkoittaa noin viisikymmentä eikä tarkkaa syntymävuotta.",
        "Haastattelija pyytää lähteessä myös puhelinnumeroa. Vastaus sisältää numerosarjan, mutta sitä ei pidä käyttää oikeana yhteystietona tai pyytää oppilasta muistamaan.",
        "Lempivärikysymykseen Harald vastaa Blau. Hän perustelee väriä viittaamalla Baijeriin ja taivaaseen. Lauseen wegen dem bayerischen Himmel kielioppia ei tarvitse vielä osata tuottaa.",
        "Tekstissä on tarkoituksella alkuperäisen litteraatin epätäydellinen kirjoitusasu Telefonnumer. LOS!:n selitteessä kerrotaan tavallinen kirjoitusasu Telefonnummer; alkuperäisrepliikkiä ei kirjoiteta hiljaisesti uudestaan."
      ],
      "help": [
        {
          "title": "Miksi so um die fünfzig?",
          "body": "Se on puhekielinen noin viidenkymmenen -ilmaus. Haraldin tarkkaa ikää ei ilmoiteta, joten älä päättele syntymäpäivää."
        },
        {
          "title": "Onko München Saksan sivistyneessä osassa?",
          "body": "Tämä on haastateltavan leikkisä sanavalinta. Faktana voit oppia vain Münchenin sijainnin Etelä-Saksassa."
        },
        {
          "title": "Mitä Blau tarkoittaa?",
          "body": "Sinistä. Harald yhdistää värin Baijeriin ja Baijerin taivaaseen."
        },
        {
          "title": "Miksi lähtötekstissä on Telefonnumer?",
          "body": "Se on alkuperäisen haastattelulitteraatin kirjoitusasu. Yleiskielen muoto on Telefonnummer. Älä muuta siteerattua lähdettä."
        }
      ]
    },
    {
      "id": "board",
      "kind": "board",
      "phase": "Opetustaulu",
      "title": "Haastattelun kuusi ydintietoa",
      "paragraphs": [
        "Kertaa koko dialogin rakenne. Tämä on opetustaulu, ei alkuperäistekstin korvaava uusi litteraatti."
      ],
      "board": [
        {
          "label": "1–2 · Nimi",
          "german": "Wie heißt du? · Harald Becker",
          "meaning": "Haastattelija kysyy nimen."
        },
        {
          "label": "3–4 · Alkuperä",
          "german": "Woher kommst du? · München",
          "meaning": "Harald on alun perin Münchenistä."
        },
        {
          "label": "5–6 · Sijainti",
          "german": "Süddeutschland",
          "meaning": "Etelä-Saksa, huumori on puhujan oma."
        },
        {
          "label": "7–8 · Ikä",
          "german": "so um die fünfzig",
          "meaning": "Noin 50, ei tarkka ikä."
        },
        {
          "label": "9–10 · Numero",
          "german": "Telefonnummer",
          "meaning": "Alkuperäisen lähteen henkilötieto, ei opeteltava."
        },
        {
          "label": "11–14 · Väri",
          "german": "Blau · Bayern · Himmel",
          "meaning": "Sininen, Baijeri ja taivas."
        }
      ]
    },
    {
      "id": "guided",
      "kind": "question",
      "phase": "Ohjattu harjoitus",
      "title": "Kysytty ikä ei ole täsmävuosi",
      "paragraphs": [
        "Etsi mitä um die fünfzig tarkoittaa ilman uuden syntymävuoden laskemista."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-MEET-10",
        "evidenceRole": "practice",
        "prompt": "Kuinka vanha Harald sanoo suunnilleen olevansa?",
        "options": [
          {
            "id": "a",
            "label": "20-vuotias",
            "wrongFeedback": "Zwanzig olisi 20. Harald sanoo fünfzig."
          },
          {
            "id": "b",
            "label": "Noin 50-vuotias"
          },
          {
            "id": "c",
            "label": "Täsmälleen 57-vuotias",
            "wrongFeedback": "Alkuperäisteksti ei anna täsmällistä ikää."
          }
        ],
        "correctOption": "b",
        "success": "Harald on noin 50-vuotias.",
        "hint": "So um die fünfzig.",
        "reteach": "Harald on noin 50-vuotias. So um die fünfzig.",
        "genericWrong": "Tarkista puhujan tilanne ja muoto. So um die fünfzig."
      }
    },
    {
      "id": "source",
      "kind": "book",
      "phase": "Alkuperäisteksti",
      "title": "Lue kaikki 14 lähderepliikkiä, myös vaikea loppu",
      "paragraphs": [
        "Avaa C10 Text A. Lue kokonainen Haraldin ja haastattelijan 14 puheenvuoron litteraatti alusta loppuun. Käytä LOS!:n suomennoksia ymmärtämisen tukena.",
        "Kiinnitä huomiota siihen, että Harald kuvailee Müncheniä vitsikkäästi ja kertoo lempivärin perustelun kokonaisena. Hänellä on myös numerolukusarja, jota ei käytetä harjoituksessa.",
        "Teksti on selvästi A1-tason tuottamistavoitetta vaativampi. Luen ymmärtäminen ei tarkoita kaikkien taivutusrakenteiden omaksumista."
      ],
      "bookLinks": [
        {
          "chapterId": "10",
          "section": "text",
          "label": "C10 · Harald · kokonainen M-DIB-02 Text A",
          "instruction": "Lue 14 alkuperäistä repliikkiä, myös lopun perustelu."
        }
      ]
    },
    {
      "id": "checked",
      "kind": "book",
      "phase": "Luetun ymmärtäminen",
      "title": "Tarkista kolme alkuperäistä ymmärtämistehtävää",
      "paragraphs": [
        "Tee C10-HARALD-Q02 (ikä), Q03 (lempiväri) ja Q04 (mihin lempiväri liittyy). Q02 on tarkoituksellinen kertaus L051:n lähdekysymyksestä; Q03 ja Q04 ovat uudet sisältökysymykset.",
        "Paina jokaisen Tarkista vastaus. Vastaus ja tarkistusmerkintä ovat olemassa olevan C10-kirjaluonnoksen tietoja. Niiden olemassaolo ei automaattisesti tarkoita oikeaa vastausta tai kuuntelua."
      ],
      "bookLinks": [
        {
          "chapterId": "10",
          "section": "understand",
          "label": "C10 · Harald Q02–Q04",
          "instruction": "Tee kolme oikeaa lähdetehtävää ja tarkista jokainen."
        }
      ]
    },
    {
      "id": "evidence",
      "kind": "book",
      "phase": "Todellinen tekstikohta",
      "title": "Paikanna Haraldin oma ikärepliikki",
      "paragraphs": [
        "Kirjan C10:n Ymmärrä-sivulla on erillinen oikea tekstikohdan tehtävä C10-SOURCE-EVIDENCE-01.",
        "Valitse 14 alkuperäisestä puheenvuorosta juuri Haraldin puheenvuoro u08, jossa hän sanoo olevansa suunnilleen viisikymmentävuotias.",
        "Paina Tarkista tekstikohta. Se tallentuu kirjan nykyisiin lähdetarkistuksiin eikä tee kuuntelusuoritusmerkintää."
      ],
      "bookLinks": [
        {
          "chapterId": "10",
          "section": "understand",
          "label": "C10 · Haraldin todellinen ikärepliikki",
          "instruction": "Tarkista C10-SOURCE-EVIDENCE-01 lähderepliikistä u08."
        }
      ]
    },
    {
      "id": "independent",
      "kind": "question",
      "phase": "Itsenäinen harjoitus",
      "title": "Kirjoita Haraldin lempiväri",
      "paragraphs": [
        "Sulje lähteen loppu. Kirjoita yhden sanan vastaus saksaksi."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-MEET-10",
        "evidenceRole": "independent",
        "prompt": "Mikä on Haraldin lempiväri saksaksi?",
        "accepted": [
          "Blau",
          "blau"
        ],
        "success": "Blau on sininen.",
        "hint": "Lempiväri vastauksessa on Blau.",
        "reteach": "Blau on sininen. Lempiväri vastauksessa on Blau.",
        "genericWrong": "Tarkista sanajärjestys ja persoonamuoto. Lempiväri vastauksessa on Blau.",
        "wrongAnswers": {
          "rot": "Rot tarkoittaa punaista, mutta Harald sanoo Blau.",
          "grün": "Grün tarkoittaa vihreää, ei Haraldin väriä."
        }
      }
    },
    {
      "id": "application",
      "kind": "question",
      "phase": "Soveltaminen",
      "title": "Tunnista lempivärin perustelu",
      "paragraphs": [
        "Mieti, mitä lähteen kaksi viimeistä puheenvuoroa sanovat."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-MEET-10",
        "evidenceRole": "application",
        "prompt": "Mihin Harald yhdistää sinisen värin?",
        "options": [
          {
            "id": "a",
            "label": "Suomen lippuun",
            "wrongFeedback": "Harald puhuu Baijerista ja taivaasta, ei Suomen lipusta."
          },
          {
            "id": "b",
            "label": "Koulupäivään",
            "wrongFeedback": "Koulupäivä ei ole tämän haastattelun lempiväriselitys."
          },
          {
            "id": "c",
            "label": "Baijeriin ja sen taivaaseen"
          }
        ],
        "correctOption": "c",
        "success": "Harald viittaa Baijeriin ja siniseen taivaaseen.",
        "hint": "Bayern ja Himmel.",
        "reteach": "Harald viittaa Baijeriin ja siniseen taivaaseen. Bayern ja Himmel.",
        "genericWrong": "Tarkista puhujan tilanne ja muoto. Bayern ja Himmel."
      }
    },
    {
      "id": "activity",
      "kind": "activity",
      "phase": "Oma harjoittelu",
      "title": "Selosta lähde omin suomenkielisin sanoin",
      "paragraphs": [
        "Kerro ilman mallia haastateltavan nimi, alkuperä, likimääräinen ikä, lempiväri ja väriin liittyvä perustelu. Lue lähde sen jälkeen tarkistukseksi.",
        "Älä kirjoita puhelinnumerosarjaa. Vahvistus koskee itse tehtyä luetun ymmärtämisen harjoitusta, ei kuullunymmärtämisen pisteitä."
      ],
      "activityId": "c10-teacher-L052",
      "activityLabel": "Luettu 14 repliikkiä ja selostettu ydintiedot muistista"
    },
    {
      "id": "exit",
      "kind": "question",
      "phase": "Lopputarkistus",
      "title": "Mitä lähteestä ei pidä väittää faktaksi?",
      "paragraphs": [
        "Erota humoristinen alkuperäisen puhujan kommentti objektiivisesta tiedosta."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-MEET-10",
        "evidenceRole": "exit",
        "prompt": "Mikä tulkinta on oikein?",
        "options": [
          {
            "id": "a",
            "label": "Harald vitsailee sivistyneestä osasta, mutta Münchenin sijainti Etelä-Saksassa on perustieto."
          },
          {
            "id": "b",
            "label": "Kirja väittää eteläsaksalaisia ainoiksi sivistyneiksi.",
            "wrongFeedback": "Se on Haraldin humoristinen ilmaus, ei oppikirjan väite."
          },
          {
            "id": "c",
            "label": "Harald sanoo olevansa täsmälleen 50 vuotta tänään.",
            "wrongFeedback": "Hän sanoo suunnilleen viisikymmentä."
          }
        ],
        "correctOption": "a",
        "success": "Lähteen mielipide ja maantieteellinen sijainti erotetaan.",
        "hint": "Huumori ei ole tietokirjallinen fakta.",
        "reteach": "Lähteen mielipide ja maantieteellinen sijainti erotetaan. Huumori ei ole tietokirjallinen fakta.",
        "genericWrong": "Tarkista puhujan tilanne ja muoto. Huumori ei ole tietokirjallinen fakta."
      }
    },
    {
      "id": "summary",
      "kind": "summary",
      "phase": "Yhteenveto",
      "title": "Haraldin alkuperäinen haastattelu on kokonaan luettu",
      "paragraphs": [
        "Luit Haraldin 14 repliikin koko litteraatin ja tunnistit nimen, Münchenin, likimääräisen iän, sinisen sekä Baijerin taivaan maininnan.",
        "Alkuperäisen äänen ja videon toimivuutta ei ole vahvistettu. Tästä tunnista ei siis synny automaattista kuuntelu- tai puhepistemäärää. L053:ssa opetellaan er/sie-verbimuodot omaa esittelyä varten."
      ]
    }
  ]
};
