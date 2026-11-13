import type { TeacherLesson } from "./engine.ts";
/** C07 L037 original M-WB-02 five-turn reading and existing source questions. */
export const LOS1_L037_TEACHER: TeacherLesson = {
  "id": "L037",
  "bookId": 1,
  "chapterId": "07",
  "version": "2.0.0-preview.1",
  "title": "Lue tavaamiskeskustelu",
  "objective": "Ymmärrän viiden repliikin autenttisen puhelinpalveludialogin, tunnistan tavaamispyynnön ja tarkistan kaksi aitoa luetun ymmärtämisen tehtävää.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredActivityIds": [
    "activity-L037"
  ],
  "requiredPracticeIds": [],
  "requiredCheckedIds": [
    "C07-SOURCE-Q01",
    "C07-SOURCE-Q02"
  ],
  "scenes": [
    {
      "id": "welcome",
      "kind": "introduction",
      "title": "Aito puhelinkeskustelu on nyt sinun luettavanasi",
      "phase": "Aloitus",
      "paragraphs": [
        "Lue C07:n Text A kokonaan. Se on Wikibooksin julkaistu viiden puheenvuoron Fernsprechauskunft, jossa numerotiedustelu ja Franz keskustelevat nimen kirjoitusasusta.",
        "Tässä ei harjoitella ottamaan yhteyttä oikeaan henkilöön. Lähdetekstissä mainitaan henkilön nimi ja puhelinnumeron tiedustelu, mutta mitään oikeaa numeroa ei tarvitse kirjoittaa, etsiä tai käyttää.",
        "Tunnin tarkistukset kohdistuvat C07-SOURCE-Q01 ja C07-SOURCE-Q02 -tehtäviin oppikirjan Ymmärrä-sivulla. Ne ovat luetun ymmärtämistä, eivät kuuntelukoetta."
      ]
    },
    {
      "id": "recall",
      "kind": "question",
      "title": "Miksi ihminen pyytää tavaamaan?",
      "phase": "Muistelu",
      "paragraphs": [
        "Lähetät kuvitteellisen nimen tekstimuodossa, mutta kuulija ei tiedä kirjoitusasua. Muistatko fraasin?"
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-READ-07",
        "evidenceRole": "practice",
        "prompt": "Mitä Wie schreibt man das? tarkoittaa?",
        "options": [
          {
            "id": "a",
            "label": "Kuinka vanha olet?",
            "wrongFeedback": "Tämä olisi Wie alt bist du? eikä nimen kirjoitusasu."
          },
          {
            "id": "b",
            "label": "Mitä kuuluu?",
            "wrongFeedback": "Tämä olisi Wie geht's?"
          },
          {
            "id": "c",
            "label": "Miten se kirjoitetaan?"
          }
        ],
        "correctOption": "c",
        "success": "Wie schreibt man das? kysyy oikeaa kirjoitusasua.",
        "hint": "Schreibt liittyy kirjoittamiseen.",
        "reteach": "Wie schreibt man das? kysyy oikeaa kirjoitusasua. Schreibt liittyy kirjoittamiseen.",
        "genericWrong": "Palaa alkuperäiseen keskusteluun ja tarkista, kuka sanoo mitä. Schreibt liittyy kirjoittamiseen."
      }
    },
    {
      "id": "explain",
      "kind": "explanation",
      "title": "Kuka tekee ja pyytää mitä?",
      "phase": "Selitys",
      "paragraphs": [
        "Keskustelun alussa numerotiedustelu tervehtii sanoilla Auskunft, guten Tag. Franz vastaa tervehdykseen ja kertoo haluavansa tietoa rouva Claudia Bolligerista Bernistä.",
        "Kolmannessa repliikissä työntekijä kysyy Wie schreibt man das? ja pyytää Bitte buchstabieren Sie. Nämä ovat koko tämän tunnin tärkeimmät käyttöfraasit.",
        "Neljännessä repliikissä Franz luettelee etu- ja sukunimen kirjaimet esimerkkisanojen avulla. Erityisesti zweimal L wie Ludwig tarkoittaa, että L-kirjain sanotaan kahteen kertaan.",
        "Viimeisessä repliikissä työntekijä kiittää ja aloittaa numeron ilmoittamisen. Alkuperäisessä tekstissä numero on jätetty kolmen pisteen kohdalle; numeroa ei pidä keksiä eikä kerätä.",
        "Keskustelun vaikeat ilmaukset kuten Ich hätte gerne ja Die Nummer lautet opitaan tässä vain merkityksen tasolla. Sinun ei tarvitse vielä muodostaa niiden kielioppia itse."
      ],
      "help": [
        {
          "title": "Mikä on Auskunft?",
          "body": "Tässä se tarkoittaa puhelinpalvelun numerotiedustelua ja samalla palvelua edustavan puhujan nimeä."
        },
        {
          "title": "Mitä Ich hätte gerne tarkoittaa?",
          "body": "Se tarkoittaa Haluaisin. Ilmaus riittää tässä ymmärtää kokonaisuutena, sillä sen verbirakennetta ei vielä vaadita."
        },
        {
          "title": "Miksi Franz sanoo zweimal?",
          "body": "Zweimal tarkoittaa kaksi kertaa. Nimessä Bolliger L esiintyy kahdesti."
        }
      ]
    },
    {
      "id": "board",
      "kind": "board",
      "title": "Viisi puheenvuoroa yhdessä järjestyksessä",
      "phase": "Opetustaulu",
      "paragraphs": [
        "Älä tulkitse tätä taulua uutena lähdelitteraattina: se on opetuksen itse kirjoittama repliikkien etenemisen tiivistelmä. Koko saksankielinen alkuperäisteksti on saman kirjan Text A:ssa."
      ],
      "board": [
        {
          "label": "1 · Palvelu tervehtii",
          "german": "Auskunft, guten Tag.",
          "meaning": "Numerotiedustelu aloittaa."
        },
        {
          "label": "2 · Franz pyytää",
          "german": "Ich hätte gerne ...",
          "meaning": "Franz ilmoittaa haluavansa tietoa."
        },
        {
          "label": "3 · Työntekijä kysyy",
          "german": "Wie schreibt man das?",
          "meaning": "Miten se kirjoitetaan?"
        },
        {
          "label": "3 · Työntekijä pyytää",
          "german": "Bitte buchstabieren Sie.",
          "meaning": "Tavatkaa, olkaa hyvä."
        },
        {
          "label": "4 · Franz tavaa",
          "german": "zweimal L",
          "meaning": "L-kirjain kaksi kertaa."
        },
        {
          "label": "5 · Lopetus",
          "german": "Danke.",
          "meaning": "Kiitos."
        }
      ]
    },
    {
      "id": "guided",
      "kind": "question",
      "title": "Kuka pyytää tavaamista?",
      "phase": "Ohjattu harjoitus",
      "paragraphs": [
        "Etsi alkuperäisen tekstin kolmas puheenvuoro. Puhujan nimen näet suoraan tekstistä."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-READ-07",
        "evidenceRole": "practice",
        "prompt": "Kuka sanoo Bitte buchstabieren Sie?",
        "options": [
          {
            "id": "a",
            "label": "Auskunft (numerotiedustelu)"
          },
          {
            "id": "b",
            "label": "Franz",
            "wrongFeedback": "Franz on tässä vastaaja ja tavaaja, ei pyynnön esittäjä."
          },
          {
            "id": "c",
            "label": "Claudia Bolliger",
            "wrongFeedback": "Claudia mainitaan, mutta hän ei ole keskustelun puhuja."
          }
        ],
        "correctOption": "a",
        "success": "Auskunft pyytää Franzia tavaamaan.",
        "hint": "Palvelun työntekijä tarvitsee nimen kirjoitusasun.",
        "reteach": "Auskunft pyytää Franzia tavaamaan. Palvelun työntekijä tarvitsee nimen kirjoitusasun.",
        "genericWrong": "Palaa alkuperäiseen keskusteluun ja tarkista, kuka sanoo mitä. Palvelun työntekijä tarvitsee nimen kirjoitusasun."
      }
    },
    {
      "id": "source",
      "kind": "book",
      "title": "Avaa kaikki viisi aitoa repliikkiä",
      "phase": "Alkuperäisteksti",
      "paragraphs": [
        "Lue koko C07:n Text A kirjan omassa lukijassa. Tarkista puheenvuorot Auskunftin aloituksesta sen loppurepliikkiin. Paina vaikeita sanoja avataksesi suomenkieliset selitykset.",
        "Kirjan lähde on M-WB-02. Teksti on kokonaisuudessaan näkyvissä LOS!:ssa, eikä tekstin lukemiseksi tarvitse siirtyä linkin taakse."
      ],
      "bookLinks": [
        {
          "chapterId": "07",
          "section": "text",
          "label": "C07 · Kokonainen Text A · M-WB-02",
          "instruction": "Lue kaikki viisi puheenvuoroa. Etsi kolmas repliikki."
        }
      ]
    },
    {
      "id": "checked",
      "kind": "book",
      "title": "Tarkista kaksi oikeaa lähdekysymystä",
      "phase": "Tekstinymmärtäminen",
      "paragraphs": [
        "Siirry C07:n Ymmärrä-osioon. Vastaa C07-SOURCE-Q01, joka kysyy Wie schreibt man das? -ilmauksen merkitystä.",
        "Vastaa myös C07-SOURCE-Q02, joka kysyy kuka pyytää tavaamista. Paina kummassakin tehtävässä Tarkista vastaus.",
        "Nämä kaksi omaa lähdetehtävää ja tarkistusmerkintää tallentuvat nykyiseen C07-luonnokseen. Pelkkä kirjan avaaminen ei merkitse tehtäviä tehdyiksi."
      ],
      "bookLinks": [
        {
          "chapterId": "07",
          "section": "understand",
          "label": "C07 · Ymmärrä · kysymykset 1–2",
          "instruction": "Tarkista C07-SOURCE-Q01 ja C07-SOURCE-Q02."
        }
      ]
    },
    {
      "id": "independent",
      "kind": "question",
      "title": "Muista kohtelias pyyntö",
      "phase": "Itsenäinen tehtävä",
      "paragraphs": [
        "Sulje alkuteksti ja kirjoita nyt vain kohtelias tavaamispyyntö ilman mallia. Pisteitä ei tule suullisesta lausumisesta."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-READ-07",
        "evidenceRole": "independent",
        "prompt": "Kirjoita saksaksi: Tavatkaa, olkaa hyvä.",
        "accepted": [
          "Bitte buchstabieren Sie.",
          "Bitte buchstabieren Sie"
        ],
        "success": "Bitte buchstabieren Sie. on kohtelias tavaamispyyntö.",
        "hint": "Muista järjestys Bitte + buchstabieren + Sie.",
        "reteach": "Bitte buchstabieren Sie. on kohtelias tavaamispyyntö. Muista järjestys Bitte + buchstabieren + Sie.",
        "genericWrong": "Muista kohtelias sanamuoto kokonaisena. Muista järjestys Bitte + buchstabieren + Sie.",
        "wrongAnswers": {
          "wie schreibt man das": "Tämä kysyy Miten se kirjoitetaan?, mutta nyt piti pyytää tavaamaan.",
          "buchstabieren du": "Kohtelias alkuperäinen pyyntö on Bitte buchstabieren Sie."
        }
      }
    },
    {
      "id": "application",
      "kind": "question",
      "title": "Mitä Franz vastaa kysymykseen?",
      "phase": "Soveltaminen",
      "paragraphs": [
        "Nyt ajattele keskustelun logiikkaa: puhelinpalvelu pyytää nimen tavaamista ja Franz aikoo auttaa."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-READ-07",
        "evidenceRole": "application",
        "prompt": "Mikä olisi oikea toiminta pyyntöön Bitte buchstabieren Sie?",
        "options": [
          {
            "id": "a",
            "label": "Kertoa syntymäpäivänsä.",
            "wrongFeedback": "Pyyntö koskee nimen kirjaimia, ei syntymäaikaa."
          },
          {
            "id": "b",
            "label": "Sanoa kuvitteellisen nimen kirjaimet järjestyksessä."
          },
          {
            "id": "c",
            "label": "Kertoa puhelinnumeronsa ääneen.",
            "wrongFeedback": "Numeron antamista ei pyydetä tässä, eikä oikeita numeroita harjoitella."
          }
        ],
        "correctOption": "b",
        "success": "Tavaaminen tarkoittaa kirjainten sanomista järjestyksessä.",
        "hint": "Pyyntö liittyy kirjoitusasuun.",
        "reteach": "Tavaaminen tarkoittaa kirjainten sanomista järjestyksessä. Pyyntö liittyy kirjoitusasuun.",
        "genericWrong": "Palaa alkuperäiseen keskusteluun ja tarkista, kuka sanoo mitä. Pyyntö liittyy kirjoitusasuun."
      }
    },
    {
      "id": "activity",
      "kind": "activity",
      "title": "Harjoittele yksi turvallinen esimerkkipyyntö",
      "phase": "Oma harjoittelu",
      "paragraphs": [
        "Kuvittele nimeltään Mia oleva henkilö. Kysy Wie schreibt man das? ja pyydä Bitte buchstabieren Sie. Vastaa kirjain kerrallaan M–I–A.",
        "Vahvista harjoittelu tehtyäsi. Kyse on omasta yrityksestä, ei mikrofonin automaattisesti tarkistamasta ääntämisestä."
      ],
      "activityId": "activity-L037",
      "activityLabel": "Harjoittelin kirjoitusasun kysymistä ja kohteliasta tavaamispyyntöä"
    },
    {
      "id": "exit",
      "kind": "question",
      "title": "Mikä alkuperäisessä tekstissä tapahtuu?",
      "phase": "Lopputarkistus",
      "paragraphs": [
        "Palauta mieleen, missä järjestyksessä puhelinpalvelu toimii."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-READ-07",
        "evidenceRole": "exit",
        "prompt": "Mikä väite vastaa C07:n alkutekstiä?",
        "options": [
          {
            "id": "a",
            "label": "Franz kysyy työntekijän ikää.",
            "wrongFeedback": "Teksti koskee nimen tavaamista, ei ikäkysymystä."
          },
          {
            "id": "b",
            "label": "Franz ilmoittaa oikean, kokonaan näkyvän puhelinnumeron.",
            "wrongFeedback": "Alkuteksti päättyy numeron alkamiseen ja kolmeen pisteeseen; kokonaisnumeroa ei ole."
          },
          {
            "id": "c",
            "label": "Auskunft pyytää tavaamaan nimen ennen numeron ilmoittamista."
          }
        ],
        "correctOption": "c",
        "success": "Auskunft pyytää kirjoitusasun ja Franz tavaa nimen.",
        "hint": "Etsi kolmas ja viimeinen repliikki.",
        "reteach": "Auskunft pyytää kirjoitusasun ja Franz tavaa nimen. Etsi kolmas ja viimeinen repliikki.",
        "genericWrong": "Palaa alkuperäiseen keskusteluun ja tarkista, kuka sanoo mitä. Etsi kolmas ja viimeinen repliikki."
      }
    },
    {
      "id": "summary",
      "kind": "summary",
      "title": "Lukeminen onnistui ilman kuuntelutestiä",
      "phase": "Yhteenveto",
      "paragraphs": [
        "Tunnistit viiden repliikin aidosta alkuperäiskeskustelusta kaksi valmista fraasia: Wie schreibt man das? ja Bitte buchstabieren Sie.",
        "Olet tarkistanut kirjan todelliset ensimmäiset kaksi lähdekysymystä. L038:ssa keskitytään kirjoitukseen, erikoismerkkeihin ja tarvittaessa vain valinnaiseen aakkosäänitteeseen.",
        "Kirjan lähteen puhelinnumeron loppuosaa ei käytetä oikeiden yhteystietojen hankkimiseen eikä sitä väitetä julkaistuksi."
      ]
    }
  ]
};
