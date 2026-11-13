import type { TeacherLesson } from "./engine.ts";
/** C08 Teacher preview. Existing textbook evidence only; no listening or advanced grammar scores. */
export const LOS1_L041_TEACHER: TeacherLesson = {
  "id": "L041",
  "bookId": 1,
  "chapterId": "08",
  "version": "2.0.0-preview.1",
  "title": "Selviytymisfraasit",
  "objective": "Valitsen oikean saksankielisen avunpyynnön viidessä tutussa tilanteessa ja teen kirjan C08-EX-01–05 harjoitukset.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredActivityIds": [
    "c08-teacher-L041"
  ],
  "requiredPracticeIds": [
    "C08-EX-01",
    "C08-EX-02",
    "C08-EX-03",
    "C08-EX-04",
    "C08-EX-05"
  ],
  "requiredCheckedIds": [],
  "scenes": [
    {
      "id": "welcome",
      "kind": "introduction",
      "phase": "Aloitus",
      "title": "Kun et ymmärrä, osaat pyytää apua",
      "paragraphs": [
        "Uuden kappaleen ydintaito on toimia saksaksi silloinkin, kun et ymmärrä jotakin. Aloitamme viidestä valmiista fraasista, joilla saat toisen sanomaan asian uudelleen, hitaammin tai eri tavalla.",
        "Sanojen Können Sie koko taivutusta, modaaliverbejä tai sijamuotoja ei vielä vaadita. Opettele fraasit kokonaisuuksina ja tunnista, missä tilanteessa niitä käytetään.",
        "Harjoittele oikealla C08:n sanasto- ja tehtäväsivulla. Tämä oppitunti ei väitä arvioivansa oikeaa puhettasi eikä kuunnellun ymmärtämistä."
      ]
    },
    {
      "id": "recall",
      "kind": "question",
      "phase": "Muistelu",
      "title": "Muistatko jo yhden kielteisen lauseen?",
      "paragraphs": [
        "C05:ssa opit sanan nicht voinnin yhteydessä. Nyt voit käyttää sitä kertomaan, ettet ymmärrä."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-SURV-08",
        "evidenceRole": "practice",
        "prompt": "Mikä tarkoittaa En ymmärrä?",
        "options": [
          {
            "id": "a",
            "label": "Ich heiße Mia.",
            "wrongFeedback": "Tämä kertoo kuvitteellisen nimesi, ei ymmärtämisvaikeutta."
          },
          {
            "id": "b",
            "label": "Ich verstehe nicht."
          },
          {
            "id": "c",
            "label": "Wie alt bist du?",
            "wrongFeedback": "Tämä kysyy ikää."
          }
        ],
        "correctOption": "b",
        "success": "Ich verstehe nicht. kertoo, ettet ymmärrä.",
        "hint": "Etsi lause, joka sisältää nicht.",
        "reteach": "Ich verstehe nicht. kertoo, ettet ymmärrä. Etsi lause, joka sisältää nicht.",
        "genericWrong": "Tarkista tilanteen tavoite ja fraasin merkitys. Etsi lause, joka sisältää nicht."
      }
    },
    {
      "id": "explain",
      "kind": "explanation",
      "phase": "Opettajan selitys",
      "title": "Viisi erilaista tilannetta, viisi fraasia",
      "paragraphs": [
        "Jos et ymmärrä ollenkaan, sano Ich verstehe nicht. Se riittää kertomaan ongelman selkeästi.",
        "Jos puhe on liian nopeaa, sano Bitte langsamer. Jos haluat kuulla saman uudestaan, voit sanoa Noch einmal, bitte. Pitkä kohtelias toistopyyntö on Können Sie das bitte wiederholen?",
        "Kun ymmärrät sanan äänteen mutta et sen merkitystä, kysy Was bedeutet das? Jos et tiedä, miten jokin ilmaistaan saksaksi, kysy Wie sagt man das auf Deutsch?",
        "Käännä tilanne ensin suomeksi itsellesi, valitse vasta sitten saksalainen fraasi. Toisto, hidastaminen, sanan merkitys ja saksankielinen vastine ovat eri pyyntöjä.",
        "Können Sie das bitte wiederholen? opetellaan kokonaisena kohteliaana ilmauksena. Älä muodosta sen perusteella vielä uusia monimutkaisia verbilauseita."
      ],
      "help": [
        {
          "title": "En ymmärrä mitään",
          "body": "Sano Ich verstehe nicht. Tämä ilmoittaa ongelman. Seuraavaksi voit pyytää Noch einmal, bitte. tai Bitte langsamer."
        },
        {
          "title": "Puhe on liian nopeaa",
          "body": "Bitte langsamer. pyytää puhumaan hitaammin. Noch einmal, bitte. puolestaan pyytää sanomaan asian uudelleen."
        },
        {
          "title": "Yksi sana on outo",
          "body": "Was bedeutet das? kysyy Mitä se tarkoittaa? Jos tarvitset itse saksankielisen sanan, käytä Wie sagt man das auf Deutsch?."
        },
        {
          "title": "Onko Können Sie vaikeaa kielioppia?",
          "body": "Kyllä siinä on vielä oppimattomia rakenteita. Nyt riittää, että tunnet koko kohteliaan toistopyynnön: Können Sie das bitte wiederholen?"
        }
      ]
    },
    {
      "id": "board",
      "kind": "board",
      "phase": "Opetustaulu",
      "title": "Valitse tilanne ennen lausetta",
      "paragraphs": [
        "Lue yksi tilanne kerrallaan. Yritä tämän jälkeen yhdistää pelkkä suomenkielinen tavoite saksan fraasiin ilman taulua."
      ],
      "board": [
        {
          "label": "1 · En ymmärrä",
          "german": "Ich verstehe nicht.",
          "meaning": "Ilmoita ymmärtämisvaikeus."
        },
        {
          "label": "2 · Liian nopeasti",
          "german": "Bitte langsamer.",
          "meaning": "Pyydä hidastamaan."
        },
        {
          "label": "3 · Toista lyhyesti",
          "german": "Noch einmal, bitte.",
          "meaning": "Vielä kerran, kiitos."
        },
        {
          "label": "4 · Toista kohteliaasti",
          "german": "Können Sie das bitte wiederholen?",
          "meaning": "Voitteko toistaa sen, olkaa hyvä?"
        },
        {
          "label": "5 · Selitä merkitys",
          "german": "Was bedeutet das?",
          "meaning": "Mitä se tarkoittaa?"
        },
        {
          "label": "6 · Saksankielinen sana",
          "german": "Wie sagt man das auf Deutsch?",
          "meaning": "Miten se sanotaan saksaksi?"
        }
      ]
    },
    {
      "id": "guided",
      "kind": "question",
      "phase": "Ohjattu harjoitus",
      "title": "Opettaja puhuu liian nopeasti",
      "paragraphs": [
        "Kuvittele, että tunnistat osan sanoista mutta et ehdi seurata vauhtia. Älä pyydä tietoa nimestä tai iästä."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-SURV-08",
        "evidenceRole": "practice",
        "prompt": "Mikä on lyhyt ja sopiva pyyntö liian nopeaan puheeseen?",
        "options": [
          {
            "id": "a",
            "label": "Bitte langsamer."
          },
          {
            "id": "b",
            "label": "Wie geht's?",
            "wrongFeedback": "Tämä kysyy vointia, ei pyydä hidastamaan."
          },
          {
            "id": "c",
            "label": "Ich komme aus Finnland.",
            "wrongFeedback": "Tämä kertoo alkuperästä, ei pyydä hidastamaan."
          }
        ],
        "correctOption": "a",
        "success": "Bitte langsamer. pyytää hidastamaan.",
        "hint": "Langsamer tarkoittaa hitaammin.",
        "reteach": "Bitte langsamer. pyytää hidastamaan. Langsamer tarkoittaa hitaammin.",
        "genericWrong": "Tarkista tilanteen tavoite ja fraasin merkitys. Langsamer tarkoittaa hitaammin."
      }
    },
    {
      "id": "source",
      "kind": "book",
      "phase": "Kirjan lähde",
      "title": "Opettele valmiit fraasit C08:n kirjasta",
      "paragraphs": [
        "Avaa C08:n sanasto ja kielioppi. Kummassakin opit lyhyet avunpyyntöilmaukset kokonaisina. Kirjan lähdetekstiin palataan L042:ssa.",
        "Sanaston tarkoitus on auttaa oikeaa vuorovaikutusta. Äänitteen avaamista ei tässä vaadita, eikä äänitteen teknistä toimivuutta ole vahvistettu."
      ],
      "bookLinks": [
        {
          "chapterId": "08",
          "section": "vocabulary",
          "label": "C08 · Selviytymisfraasien sanasto",
          "instruction": "Etsi Ich verstehe nicht, Bitte langsamer ja Was bedeutet das?."
        },
        {
          "chapterId": "08",
          "section": "grammar",
          "label": "C08 · Kolme avunpyyntöstrategiaa",
          "instruction": "Kertaa toistaminen, hidastaminen ja merkityksen kysyminen."
        }
      ]
    },
    {
      "id": "practice",
      "kind": "book",
      "phase": "Kirjan harjoitukset",
      "title": "Tee viisi oikeaa kirjan fraasitehtävää",
      "paragraphs": [
        "Tee kirjan Harjoittele-sivulta C08-EX-01–05. Niissä valitaan tilanteeseen sopivia selviytymisfraaseja.",
        "Kokeile kaikkia ensin ilman mallin katsomista. Opettajatunnin suoritus edellyttää, että kaikki viisi harjoitusta ovat tallessa; täydet pisteet eivät ole vaatimuksena."
      ],
      "bookLinks": [
        {
          "chapterId": "08",
          "section": "practice",
          "label": "C08 · Harjoitukset 01–05",
          "instruction": "Vastaa viiteen todelliseen fraasitehtävään."
        }
      ]
    },
    {
      "id": "independent",
      "kind": "question",
      "phase": "Itsenäinen harjoitus",
      "title": "Kirjoita oma avunpyyntö muistista",
      "paragraphs": [
        "Sulje opetustaulu. Kirjoita täsmälleen lyhyt pyyntö, kun haluat toisen puhuvan hitaammin."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-SURV-08",
        "evidenceRole": "independent",
        "prompt": "Kirjoita saksaksi: Hitaammin, olkaa hyvä.",
        "accepted": [
          "Bitte langsamer.",
          "Bitte langsamer"
        ],
        "success": "Bitte langsamer. on oikea pyyntö.",
        "hint": "Alussa Bitte ja sen jälkeen langsamer.",
        "reteach": "Bitte langsamer. on oikea pyyntö. Alussa Bitte ja sen jälkeen langsamer.",
        "genericWrong": "Kertaa koko ilmaus oikeassa sanajärjestyksessä. Alussa Bitte ja sen jälkeen langsamer.",
        "wrongAnswers": {
          "noch einmal bitte": "Noch einmal, bitte. pyytää sanomaan uudelleen; tässä toivotaan hitaampaa puhetta.",
          "ich verstehe nicht": "Ich verstehe nicht. kertoo, ettet ymmärrä, mutta ei pyydä nimenomaisesti hidastamaan."
        }
      }
    },
    {
      "id": "application",
      "kind": "question",
      "phase": "Soveltaminen",
      "title": "Sana on tuttu äänenä, ei merkityksenä",
      "paragraphs": [
        "Luokkatoveri käyttää saksalaista sanaa, jota et ymmärrä. Haluat tietää vain sen merkityksen, et kirjoitusasua."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-SURV-08",
        "evidenceRole": "application",
        "prompt": "Mikä kysyy Mitä se tarkoittaa?",
        "options": [
          {
            "id": "a",
            "label": "Wie schreibt man das?",
            "wrongFeedback": "Tämä kysyy kirjoitusasua, ei sanan merkitystä."
          },
          {
            "id": "b",
            "label": "Was bedeutet das?"
          },
          {
            "id": "c",
            "label": "Wie heißt du?",
            "wrongFeedback": "Tämä kysyy toisen nimeä."
          }
        ],
        "correctOption": "b",
        "success": "Was bedeutet das? kysyy merkitystä.",
        "hint": "Bedeutet tarkoittaa tässä tarkoittaa.",
        "reteach": "Was bedeutet das? kysyy merkitystä. Bedeutet tarkoittaa tässä tarkoittaa.",
        "genericWrong": "Tarkista tilanteen tavoite ja fraasin merkitys. Bedeutet tarkoittaa tässä tarkoittaa."
      }
    },
    {
      "id": "activity",
      "kind": "activity",
      "phase": "Oma harjoittelu",
      "title": "Kokeile kahta selviytymistilannetta",
      "paragraphs": [
        "Kuvittele ensin, että et ymmärrä opettajaa: sano tai kirjoita Ich verstehe nicht. Kuvittele sitten, että opettaja puhuu liian nopeasti: sano tai kirjoita Bitte langsamer.",
        "Vahvista vasta harjoiteltuasi. Sovellus ei kuuntele eikä arvostele ääntämistäsi."
      ],
      "activityId": "c08-teacher-L041",
      "activityLabel": "Harjoittelin kahta erilaista avunpyyntötilannetta"
    },
    {
      "id": "exit",
      "kind": "question",
      "phase": "Lopputarkistus",
      "title": "Toistopyyntö on oma toimintansa",
      "paragraphs": [
        "Tunnista vielä kohteliaampi pyyntö kuulla sama uudelleen."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-SURV-08",
        "evidenceRole": "exit",
        "prompt": "Mikä tarkoittaa Voitteko toistaa sen, olkaa hyvä?",
        "options": [
          {
            "id": "a",
            "label": "Können Sie das bitte wiederholen?"
          },
          {
            "id": "b",
            "label": "Wie sagt man das auf Deutsch?",
            "wrongFeedback": "Tämä kysyy, miten jokin sanotaan saksaksi."
          },
          {
            "id": "c",
            "label": "Wie alt sind Sie?",
            "wrongFeedback": "Tämä kysyy ikää kohteliaasti."
          }
        ],
        "correctOption": "a",
        "success": "Können Sie das bitte wiederholen? on kohtelias toistopyyntö.",
        "hint": "Wiederholen liittyy toistamiseen.",
        "reteach": "Können Sie das bitte wiederholen? on kohtelias toistopyyntö. Wiederholen liittyy toistamiseen.",
        "genericWrong": "Tarkista tilanteen tavoite ja fraasin merkitys. Wiederholen liittyy toistamiseen."
      }
    },
    {
      "id": "summary",
      "kind": "summary",
      "phase": "Yhteenveto",
      "title": "Sinulla on jo toimiva apusanasto",
      "paragraphs": [
        "Tiedät nyt, milloin sanot Ich verstehe nicht, Bitte langsamer, Noch einmal, bitte, Was bedeutet das? tai pitkän kohteliaan toistopyynnön.",
        "Kirjan viisi todellista harjoitustehtävää säilyvät C08:n omassa luonnoksessa. L042:ssa siirrytään 26 tekstiyksikön alkuperäiseen koulukohtaukseen ja harjoitellaan siitä tuttujen asioiden tunnistamista."
      ]
    }
  ]
};
