import type { TeacherLesson } from "./engine.ts";
/** C08 authentic reading and deterministic workbook evidence. No unverified audio scoring. */
export const LOS1_L043_TEACHER: TeacherLesson = {
  "id": "L043",
  "bookId": 1,
  "chapterId": "08",
  "version": "2.0.0-preview.1",
  "title": "Kuuntelustrategiat ja selityspyynnöt",
  "objective": "Osaan sanoa etten ymmärrä, pyytää toistoa tai selitystä sekä erottaa luetun kahdeksan repliikin Eva-haastattelun kuuntelemisesta.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredActivityIds": [
    "c08-teacher-L043"
  ],
  "requiredPracticeIds": [
    "C08-EX-06",
    "C08-EX-07",
    "C08-EX-11",
    "C08-EX-12"
  ],
  "requiredCheckedIds": [
    "C08-TEXTB-Q01",
    "C08-TEXTB-Q03"
  ],
  "scenes": [
    {
      "id": "welcome",
      "kind": "introduction",
      "phase": "Aloitus",
      "title": "Selviytymisstrategia toimii myös ilman ääntä",
      "paragraphs": [
        "Tällä tunnilla opit kolmivaiheisen toimintatavan: kerro, ettet ymmärrä; pyydä toistamaan tai hidastamaan; kysy tuntemattoman sanan merkitystä.",
        "Kirjan Text B:ssä on lisäksi Eva Kunkelin oikean COERLL-haastattelun kahdeksan repliikkiä suomennoksineen. Alkuperäinen video ja ääniraita eivät ole mukana LOS!:ssa, eikä tätä tehtävää saa merkitä kuuntelusuoritukseksi.",
        "Haastattelu sisältää vaikeita ilmauksia. Tavoite on tunnistaa esimerkiksi Englisch, Erdkunde ja zu Hause bei meinen Eltern, ei omaksua kaikkia haastattelun rakenteita."
      ]
    },
    {
      "id": "recall",
      "kind": "question",
      "phase": "Muistelu",
      "title": "Mitä pyydät, kun puhe on liian nopeaa?",
      "paragraphs": [
        "Aloita L041:ssä opitun avunpyynnön muistelulla."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-STRAT-08",
        "evidenceRole": "practice",
        "prompt": "Mikä fraasi pyytää hidastamaan?",
        "options": [
          {
            "id": "a",
            "label": "Noch einmal, bitte.",
            "wrongFeedback": "Tämä pyytää uudelleen, mutta ei välttämättä hitaammin."
          },
          {
            "id": "b",
            "label": "Bitte langsamer."
          },
          {
            "id": "c",
            "label": "Wie heißt du?",
            "wrongFeedback": "Tämä kysyy nimeä."
          }
        ],
        "correctOption": "b",
        "success": "Bitte langsamer. on hidastamispyyntö.",
        "hint": "Langsamer = hitaammin.",
        "reteach": "Bitte langsamer. on hidastamispyyntö. Langsamer = hitaammin.",
        "genericWrong": "Pohdi, yritätkö ymmärtää sanan, kuulla uudelleen vai pyytää apua. Langsamer = hitaammin."
      }
    },
    {
      "id": "explain",
      "kind": "explanation",
      "phase": "Opettajan selitys",
      "title": "Kolme vaihetta, joita voit käyttää omassa järjestyksessäsi",
      "paragraphs": [
        "Vaihe yksi: Ich verstehe nicht. Kerrot, että ymmärrys katkesi. Ongelma ei ole se, ettet vielä muista kaikkia sanoja.",
        "Vaihe kaksi: Noch einmal, bitte. tai Können Sie das bitte wiederholen? pyytää saman uudelleen. Jos ongelma on puheen nopeus, Bitte langsamer. on täsmällisempi.",
        "Vaihe kolme: Was bedeutet das? kysyy sanan merkitystä. Voit myös kysyä Wie sagt man das auf Deutsch?, kun kaipaat itse saksankielistä ilmausta.",
        "Kirjan sanastossa Wort tarkoittaa sanaa ja Satz lausetta. Frage on kysymys ja Antwort vastaus. Näiden merkityksien tunnistaminen helpottaa luokassa.",
        "Text B:n Eva kertoo englannin ja maantiedon opinnoista sekä asumisestaan vanhempiensa luona. Opiskeluun liittyvä konteksti on sama mutta haastattelun alkuperäinen kielitaso on haastavampi. Käytä sitä luettuna, ei tekaistuna kuunteluna."
      ],
      "help": [
        {
          "title": "Mistä tiedän pyydänkö toistoa vai selitystä?",
          "body": "Jos et ehtinyt kuulla, sano Noch einmal, bitte. Jos kuulit sanan mutta et tunne merkitystä, kysy Was bedeutet das?."
        },
        {
          "title": "En ymmärrä koko lausetta",
          "body": "Aloita Ich verstehe nicht. Sitten pyydä toistoa tai hidastamista. Voit käyttää useampaa avunpyyntöä peräkkäin."
        },
        {
          "title": "Mitä Text B oikeastaan sisältää?",
          "body": "Kahdeksan repliikin COERLL-haastattelun kirjoitettu litteraatti ja suomennokset. Ääntä ja videota ei ole upotettu oppikirjaan."
        },
        {
          "title": "Miksi siinä on vaikeaa kielioppia?",
          "body": "Se on kokonainen alkuperäinen haastattelu. A1-opiskelijan ei tarvitse toistaa sen pitkiä lauseita, vaan tunnistaa muutama tuttu opiskeluun liittyvä sana."
        }
      ]
    },
    {
      "id": "board",
      "kind": "board",
      "phase": "Opetustaulu",
      "title": "Pysähdy, pyydä apua, ymmärrä",
      "paragraphs": [
        "Käy tilanneketju läpi. Jokainen fraasi tekee hieman eri asian."
      ],
      "board": [
        {
          "label": "1 · Ilmoita ongelma",
          "german": "Ich verstehe nicht.",
          "meaning": "En ymmärrä."
        },
        {
          "label": "2 · Kuule uudelleen",
          "german": "Noch einmal, bitte.",
          "meaning": "Vielä kerran, kiitos."
        },
        {
          "label": "3 · Vähennä vauhtia",
          "german": "Bitte langsamer.",
          "meaning": "Hitaammin, olkaa hyvä."
        },
        {
          "label": "4 · Kohtelias toisto",
          "german": "Können Sie das bitte wiederholen?",
          "meaning": "Voitteko toistaa sen?"
        },
        {
          "label": "5 · Selitä merkitys",
          "german": "Was bedeutet das?",
          "meaning": "Mitä se tarkoittaa?"
        },
        {
          "label": "6 · Tunnista sanat",
          "german": "das Wort · der Satz",
          "meaning": "Sana ja lause."
        }
      ]
    },
    {
      "id": "guided",
      "kind": "question",
      "phase": "Ohjattu harjoitus",
      "title": "Sanan kuulit, mutta et ymmärtänyt",
      "paragraphs": [
        "Kuvittele, että opettaja käyttää saksalaista sanaa. Tunnistat sen äänen mutta et sen merkitystä."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-SURV-08",
        "evidenceRole": "practice",
        "prompt": "Mikä kysymys sopii juuri sanan merkityksen selvittämiseen?",
        "options": [
          {
            "id": "a",
            "label": "Was bedeutet das?"
          },
          {
            "id": "b",
            "label": "Wie alt bist du?",
            "wrongFeedback": "Tämä kysyy ikää, ei merkitystä."
          },
          {
            "id": "c",
            "label": "Wie schreibt man das?",
            "wrongFeedback": "Tämä kysyy kirjoitusasua, ei sanan merkitystä."
          }
        ],
        "correctOption": "a",
        "success": "Was bedeutet das? kysyy merkitystä.",
        "hint": "Bedeutet liittyy siihen, mitä asia tarkoittaa.",
        "reteach": "Was bedeutet das? kysyy merkitystä. Bedeutet liittyy siihen, mitä asia tarkoittaa.",
        "genericWrong": "Pohdi, yritätkö ymmärtää sanan, kuulla uudelleen vai pyytää apua. Bedeutet liittyy siihen, mitä asia tarkoittaa."
      }
    },
    {
      "id": "source",
      "kind": "book",
      "phase": "Kirjan kielioppi",
      "title": "Opiskele avunpyyntöstrategia C08:n kirjasta",
      "paragraphs": [
        "Avaa C08:n kielioppi ja lue sen kolme strategiaa. Kertaa sen jälkeen sanastosta Wort, Satz, Frage ja Antwort.",
        "Näiden sanojen tunnistaminen auttaa ymmärtämään myös Eva-haastattelun opiskelukontekstia, vaikka siinä on muita vaikeampia ilmauksia."
      ],
      "bookLinks": [
        {
          "chapterId": "08",
          "section": "grammar",
          "label": "C08 · Kolme avunpyyntöstrategiaa",
          "instruction": "Lue miten ilmoitat ongelman, pyydät toistoa ja kysyt merkityksen."
        },
        {
          "chapterId": "08",
          "section": "vocabulary",
          "label": "C08 · Sanasto",
          "instruction": "Tunnista Wort, Satz, Frage ja Antwort."
        }
      ]
    },
    {
      "id": "textb",
      "kind": "book",
      "phase": "Toinen alkuperäisteksti",
      "title": "Lue koko Eva-haastattelu tekstinä",
      "paragraphs": [
        "Avaa C08:n Text B. Lue kaikki kahdeksan repliikkiä haastattelijan ja Evan välillä. Eva kertoo opiskelevansa englantia ja maantietoa sekä asuvansa yhä vanhempiensa luona Zell am Mainissa.",
        "Huomaa, että source M-DIB-03:n koko kirjoitettu litteraatti on kirjan sisällä. Alkuperäistä videota tai ääntä EI ole upotettu eikä kuulemista mitata tässä.",
        "Haastattelun vaikeita muotoja käytetään vain ymmärtämisen tukena. Tekstin tehtävät voi tehdä kokonaan lukemalla."
      ],
      "bookLinks": [
        {
          "chapterId": "08",
          "section": "text-b",
          "label": "C08 · Eva: Studium und Wohnen · kaikki 8 repliikkiä",
          "instruction": "Lue koko alkuperäinen litteraatti suomennosten tukemana."
        }
      ]
    },
    {
      "id": "checked",
      "kind": "book",
      "phase": "Tekstin tarkistukset",
      "title": "Tarkista kaksi Evan tekstin ydintietoa",
      "paragraphs": [
        "Tee Text B:n kaksi oikeaa tekstikysymystä C08-TEXTB-Q01 ja C08-TEXTB-Q03. Ensimmäinen kysyy mitä oppiaineita Eva opiskelee, kolmas missä hän asuu.",
        "Molemmat vastataan painamalla Tarkista vastaus. Ne ovat luetun tekstin ymmärtämistä, eivät todistettua kuullunymmärtämistä. Sinun ei tarvitse tietää kaikkien vaikeiden sanojen sijamuotoja."
      ],
      "bookLinks": [
        {
          "chapterId": "08",
          "section": "text-b",
          "label": "C08 · Text B · Q01 ja Q03",
          "instruction": "Vastaa ja tarkista kaksi todellista tekstikysymystä."
        }
      ]
    },
    {
      "id": "practice",
      "kind": "book",
      "phase": "Kirjan harjoitukset",
      "title": "Neljä oikeaa avunpyyntöharjoitusta",
      "paragraphs": [
        "Tee C08-EX-06 (das Wort), EX-07 (der Satz), EX-11 (verstehe) sekä EX-12 (langsamer) kirjan Harjoittele-sivulla.",
        "Kahdessa viimeisessä täydennät puuttuvan sanan itse. Tallenna oma yritys ennen mallin tarkistamista."
      ],
      "bookLinks": [
        {
          "chapterId": "08",
          "section": "practice",
          "label": "C08 · Tehtävät 06, 07, 11 ja 12",
          "instruction": "Tee neljä oikeaa sanasto- ja täydennystehtävää."
        }
      ]
    },
    {
      "id": "independent",
      "kind": "question",
      "phase": "Itsenäinen harjoittelu",
      "title": "Kysy sanan merkitys muistista",
      "paragraphs": [
        "Sulje sanasto ja kirjoita lyhyt kysymys. Tämän ei tarvitse olla pitkä kohtelias opettajan puhuttelu."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-SURV-08",
        "evidenceRole": "independent",
        "prompt": "Kirjoita saksaksi: Mitä se tarkoittaa?",
        "accepted": [
          "Was bedeutet das?",
          "Was bedeutet das"
        ],
        "success": "Was bedeutet das? kysyy merkitystä.",
        "hint": "Aloita Was ja käytä sanaa bedeutet.",
        "reteach": "Was bedeutet das? kysyy merkitystä. Aloita Was ja käytä sanaa bedeutet.",
        "genericWrong": "Yritä palauttaa mieleen lyhyt kokonainen avunpyyntö. Aloita Was ja käytä sanaa bedeutet.",
        "wrongAnswers": {
          "wie schreibt man das": "Tämä kysyy, miten sana kirjoitetaan, ei mitä se tarkoittaa.",
          "wie sagt man das auf deutsch": "Tämä kysyy, miten asia sanotaan saksaksi."
        }
      }
    },
    {
      "id": "application",
      "kind": "question",
      "phase": "Soveltaminen",
      "title": "Kumpaa fraasia tarvitset kuulon takia?",
      "paragraphs": [
        "Kuvitteellinen opettaja sanoi lauseen, mutta et ehtinyt kuulla sen loppua."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-STRAT-08",
        "evidenceRole": "application",
        "prompt": "Mikä toimintatapa sopii parhaiten?",
        "options": [
          {
            "id": "a",
            "label": "Tiedän varmasti merkityksen, vaikka en kuullut loppua.",
            "wrongFeedback": "Kuulopuute ei kerro merkityksestä."
          },
          {
            "id": "b",
            "label": "Sanon Noch einmal, bitte. ja pyydän tarvittaessa Bitte langsamer."
          },
          {
            "id": "c",
            "label": "Kerron oman ikäni.",
            "wrongFeedback": "Ikä ei liity siihen, että haluat kuulla lauseen uudelleen."
          }
        ],
        "correctOption": "b",
        "success": "Toistaminen ja hidastaminen auttavat kuulemaan puuttuvan lauseen.",
        "hint": "Pyydä ensin toistoa, sitten hitaammin.",
        "reteach": "Toistaminen ja hidastaminen auttavat kuulemaan puuttuvan lauseen. Pyydä ensin toistoa, sitten hitaammin.",
        "genericWrong": "Pohdi, yritätkö ymmärtää sanan, kuulla uudelleen vai pyytää apua. Pyydä ensin toistoa, sitten hitaammin."
      }
    },
    {
      "id": "activity",
      "kind": "activity",
      "phase": "Oma harjoittelu",
      "title": "Harjoittele kolmen vaiheen avunpyyntöä",
      "paragraphs": [
        "Kuvittele kolme hetkeä: et ymmärrä, tarvitset toiston ja et tiedä sanan merkitystä. Sano tai kirjoita jokaiseen yksi opittu fraasi.",
        "Tämä on oma opiskeluteko. Mahdollista alkuperäistä videota ei väitetä nähdyksi tai kuulluksi."
      ],
      "activityId": "c08-teacher-L043",
      "activityLabel": "Harjoittelin ymmärtämisen, toiston ja merkityksen kysymisen tilanteet"
    },
    {
      "id": "exit",
      "kind": "question",
      "phase": "Lopputarkistus",
      "title": "Mikä on luettavan Eva-aineiston todellinen status?",
      "paragraphs": [
        "Erota litteraatin lukeminen äänitteen kuuntelusta."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-STRAT-08",
        "evidenceRole": "exit",
        "prompt": "Mikä pitää paikkansa C08:n Text B:stä?",
        "options": [
          {
            "id": "a",
            "label": "Koko kahdeksan repliikin litteraatti on kirjassa, mutta alkuperäistä ääntä tai videota ei ole upotettu."
          },
          {
            "id": "b",
            "label": "Kuuntelukoe on automaattisesti hyväksytty, kun klikkaat Text B:n.",
            "wrongFeedback": "Klikkaus tai lukeminen ei todista kuuntelusuoritusta."
          },
          {
            "id": "c",
            "label": "Alkuperäisteksti on vain ulkoisen linkin takana.",
            "wrongFeedback": "Kaikki kahdeksan repliikkiä ja niiden suomennokset ovat LOS!:n sisällä."
          }
        ],
        "correctOption": "a",
        "success": "Litteraatti on luettavissa mutta ääni ja video puuttuvat.",
        "hint": "Katso Text B:n yhteydessä oleva lähdevaroitus.",
        "reteach": "Litteraatti on luettavissa mutta ääni ja video puuttuvat. Katso Text B:n yhteydessä oleva lähdevaroitus.",
        "genericWrong": "Pohdi, yritätkö ymmärtää sanan, kuulla uudelleen vai pyytää apua. Katso Text B:n yhteydessä oleva lähdevaroitus."
      }
    },
    {
      "id": "summary",
      "kind": "summary",
      "phase": "Yhteenveto",
      "title": "Avunpyynnöt ja lähteen status pysyvät erillään",
      "paragraphs": [
        "Harjoittelit kolme strategiaa, neljä alkuperäistä harjoitustehtävää sekä kaksi Evan tekstistä luettavaa ydintietoa.",
        "Luetun ymmärtämisen tehtävät tarkistetaan kirjassa. Ne eivät pisteytä kuullunymmärtämistä tai oman puheen ääntämistä.",
        "L044:ssa kirjoitat kolme itse keksittyä luokkahuonedialogia tilanteisiin, joissa et ymmärrä, kaipaat toiston tai haluat merkityksen selityksen."
      ]
    }
  ]
};
