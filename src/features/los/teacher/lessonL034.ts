import type { TeacherLesson } from "./engine.ts";
/** C06 two real text sources: M-ZPE-01 (12 lines) and reused M-COM-01 (8 lines). */
export const LOS1_L034_TEACHER: TeacherLesson = {
  "id": "L034",
  "bookId": 1,
  "chapterId": "06",
  "version": "2.0.0-preview.1",
  "title": "Kertaa alkuperäinen ikäkeskustelu",
  "objective": "Luen C06:n oman neljän ikädialogin kokonaisuuden ja aiemman Franz–Jörg-kertauksen, tarkistan oikeat lähdekysymykset ja erotan lukemisen kuuntelusta.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredActivityIds": [
    "compared-original-texts"
  ],
  "requiredPracticeIds": [],
  "requiredCheckedIds": [
    "C06-ZPE-Q01",
    "C06-ZPE-Q02",
    "C06-SOURCE-Q01",
    "C06-SOURCE-Q02"
  ],
  "scenes": [
    {
      "id": "welcome",
      "kind": "introduction",
      "title": "Kaksi oikeaa aineistoa, eri tehtävät",
      "phase": "Aloitus",
      "paragraphs": [
        "C06:n oma uusi Text A sisältää Monika Janickan lähteestä neljä erillistä ikäkeskustelua, yhteensä 12 alkuperäistä repliikkiä. Se on luettavissa kokonaisuudessaan LOS!:ssa.",
        "C06:n Text A -sivulla on erillisenä kertauksena myös C01:stä tuttu Franzin ja Jörgin kahdeksan repliikin alkuperäiskeskustelu. Sitä ei pidä nimetä uudeksi C06-lähteeksi.",
        "Näitä kahta tekstikokonaisuutta käytetään lukemisen ymmärtämiseen. Uuden äänitteen oikeudet, vastaavuus ja laitetestit ovat edelleen tarkistamatta, eikä tässä luvata kuunteluarvosanaa."
      ]
    },
    {
      "id": "recall",
      "kind": "question",
      "title": "Mistä erotat ikäkysymyksen?",
      "phase": "Muistelu",
      "paragraphs": [
        "Ikäkysymys sisältää sanan alt. Testaa muistia ilman mallia."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-READ-06",
        "evidenceRole": "practice",
        "prompt": "Mikä saksankielinen kysymys tarkoittaa Kuinka vanha olet?",
        "options": [
          {
            "id": "a",
            "label": "Wie heißt du?",
            "wrongFeedback": "Tämä kysyy nimeä, ei ikää."
          },
          {
            "id": "b",
            "label": "Wie alt bist du?"
          },
          {
            "id": "c",
            "label": "Wie geht es dir?",
            "wrongFeedback": "Tämä kysyy vointia."
          }
        ],
        "correctOption": "b",
        "success": "Wie alt bist du? kysyy ikää.",
        "hint": "Etsi sana alt.",
        "reteach": "Wie alt bist du? kysyy ikää. Etsi sana alt.",
        "genericWrong": "Tarkista kuka puhui ja mikä luku mainittiin. Etsi sana alt."
      }
    },
    {
      "id": "sourceA",
      "kind": "explanation",
      "title": "C06:n oma neljän dialogin pääteksti",
      "phase": "Lähteen ymmärtäminen",
      "paragraphs": [
        "Ensimmäinen dialogi: toinen henkilö kysyy Wie alt bist du?, ja Oskar vastaa Ich bin fünf. Hän kertoo olevansa viisi. Samassa keskustelussa kysytään myös nimi.",
        "Toisessa dialogissa Fabian esittäytyy ja kysyy toisen nimeä. Larissa kertoo olevansa jo zwölf Jahre alt eli 12-vuotias.",
        "Kolmannessa kaksi puhujaa vastaa Wir sind 10. Neljännessä Paulin iäksi kerrotaan elf Jahre alt eli 11 vuotta.",
        "Tekstissä on myös muodot Wie alt seid ihr?, Wir sind ja Wie alt ist er?. Ne saa tässä vain tunnistaa, koko monikon ja kolmannen persoonan taivutusta ei vielä vaadita.",
        "Kaikki 12 repliikkiä ovat kirjan Text A -lukijassa, eivät ulkoisen linkin takana. Äänitteen puuttuminen ei estä näiden tekstien ymmärtämistä."
      ],
      "help": [
        {
          "title": "Miksi yhdessä dialogissa on seid ihr?",
          "body": "Wie alt seid ihr? kysyy useammalta tutulta Kuinka vanhoja te olette? Tässä tarvitsee vain tunnistaa kysymys, ei taivuttaa sein-verbiä kokonaan."
        },
        {
          "title": "Mikä tarkoittaa Wir sind 10?",
          "body": "Se tarkoittaa Olemme kymmenen. Alkuperäisessä kolmannessa dialogissa luku 10 esiintyy numerona."
        },
        {
          "title": "Miksi Paulista sanotaan Er ist?",
          "body": "Er ist elf Jahre alt. tarkoittaa hän on 11-vuotias. Se on lähteen ymmärtämiseen annettu tunnistusmalli, ei uusi pakollinen taivutuskoe."
        }
      ]
    },
    {
      "id": "board",
      "kind": "board",
      "title": "Yhdistä neljän dialogin henkilöt ja iät",
      "phase": "Opetustaulu",
      "paragraphs": [
        "Vertaa lähteestä saatuja tietoja yksi keskustelu kerrallaan. Älä yhdistä Larissaa Franzin ikään tai päättele Fabianin ikää kysymyksen perusteella."
      ],
      "board": [
        {
          "label": "Dialogi 1 · Oskar",
          "german": "Ich bin fünf.",
          "meaning": "Oskar: 5 vuotta."
        },
        {
          "label": "Dialogi 2 · Larissa",
          "german": "Ich bin schon zwölf Jahre alt.",
          "meaning": "Larissa: 12 vuotta. Schon = jo."
        },
        {
          "label": "Dialogi 3 · kaksi puhujaa",
          "german": "Wir sind 10.",
          "meaning": "Kaksi vastaajaa: 10 vuotta."
        },
        {
          "label": "Dialogi 4 · Paul",
          "german": "Er ist elf Jahre alt.",
          "meaning": "Paul: 11 vuotta."
        },
        {
          "label": "C01-kertaus · Franz",
          "german": "neunzehn Jahre alt",
          "meaning": "Franz: 19 vuotta."
        },
        {
          "label": "C01-kertaus · Jörg",
          "german": "Ich bin zwanzig.",
          "meaning": "Jörg: 20 vuotta."
        }
      ]
    },
    {
      "id": "guided",
      "kind": "question",
      "title": "Lue Larissan oikea vastaus",
      "phase": "Ohjattu harjoitus",
      "paragraphs": [
        "Toisen dialogin kysymys on Bist du schon elf? Larissa vastaa omasta iästään."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-READ-06",
        "evidenceRole": "practice",
        "prompt": "Minkä ikäinen Larissa on C06:n omassa Text A:ssa?",
        "options": [
          {
            "id": "a",
            "label": "11 vuotta",
            "wrongFeedback": "Elf esiintyy kysymyksessä, mutta Larissa vastaa olevansa zwölf vuotta."
          },
          {
            "id": "b",
            "label": "10 vuotta",
            "wrongFeedback": "10 on kolmannen dialogin puhujien ikä."
          },
          {
            "id": "c",
            "label": "12 vuotta"
          }
        ],
        "correctOption": "c",
        "success": "Larissa on 12-vuotias.",
        "hint": "Etsi sana zwölf.",
        "reteach": "Larissa on 12-vuotias. Etsi sana zwölf.",
        "genericWrong": "Tarkista kuka puhui ja mikä luku mainittiin. Etsi sana zwölf."
      }
    },
    {
      "id": "original",
      "kind": "book",
      "title": "Lue koko C06 Text A oppikirjan sisällä",
      "phase": "C06 · Text A",
      "paragraphs": [
        "Avaa C06:n Text A -sivu. Lue kaikki neljä keskustelua, jotka alkavat Hi, wie alt bist du? ja päättyvät Paulin ikää koskevaan vastaukseen.",
        "Voit avata sanojen merkitykset ja korostaa kohtia. Tekstin ääneen lukeminen ei muuta tehtävää automaattiseksi kuuntelukokeeksi."
      ],
      "bookLinks": [
        {
          "chapterId": "06",
          "section": "text",
          "label": "C06 · Oma Text A · neljä ikädialogia",
          "instruction": "Lue kaikki 12 repliikkiä. Etsi Oskarin ja Larissan iät."
        }
      ]
    },
    {
      "id": "revisit",
      "kind": "book",
      "title": "Avaa myös vanha Franzin ja Jörgin dialogi",
      "phase": "C01 · aiemman tekstin kertaus",
      "paragraphs": [
        "C06:n Text A -sivun lopussa on avattava osio Kertaa aiempi Franzin ja Jörgin keskustelu. Avaa osio, niin näet koko kahdeksan repliikin C01-dialogin.",
        "Se on vanha lähde, joka palaa nyt ikätiedon lukemiseen. Franz on 19 ja Jörg 20. Ääni on vapaaehtoinen ja toisto edelleen laitetestaamaton.",
        "Kirjan C06 Text B:kin käyttää samaa aiempaa alkuperäisäänitettä M-COM-01. Sitä ei lasketa toiseksi uudeksi omaksi C06:n alkuperäisdialogiksi."
      ],
      "bookLinks": [
        {
          "chapterId": "06",
          "section": "text",
          "label": "C06 · Avaa Franz–Jörg-kertaus Text A:n lopusta",
          "instruction": "Laajenna aiemman keskustelun osio ja lue kaikki 8 repliikkiä."
        },
        {
          "chapterId": "06",
          "section": "text-b",
          "label": "C06 · Text B · sama lähde eri tavoitteella",
          "instruction": "Vapaaehtoinen uudelleenkatselu; ei erillistä kuuntelupistettä."
        }
      ]
    },
    {
      "id": "checked",
      "kind": "book",
      "title": "Tarkista neljä aidosti tallennettavaa lähdevastausta",
      "phase": "Todelliset ymmärtämistehtävät",
      "paragraphs": [
        "Avaa C06:n Ymmärrä-sivu. Sen yläosassa ovat uuden Text A:n C06-ZPE-Q01 ja C06-ZPE-Q02: Oskarin ja Larissan iät. Tee ja tarkista ne.",
        "Avaa sitten sivun alaosasta avattava C01:n ikäkertauksen vanhat ymmärtämistehtävät. Siellä sijaitsevat C06-SOURCE-Q01 ja C06-SOURCE-Q02: Franzin ja Jörgin iät. Tee ja tarkista myös ne.",
        "Neljä oikeasti tallennettua vastausta ja neljä tarkistuspainallusta ovat tämän opettajatunnin lähdevaatimus. Pelkkä tekstisivun avaaminen ei riitä, eikä vastauksen tarvitse olla ensin oikein."
      ],
      "bookLinks": [
        {
          "chapterId": "06",
          "section": "understand",
          "label": "C06 · Ymmärrä · uudet ja aiemmat ikätekstit",
          "instruction": "Tarkista ZPE-Q01/02; avaa alaosan kertaus ja tarkista SOURCE-Q01/02."
        }
      ]
    },
    {
      "id": "independent",
      "kind": "question",
      "title": "Kirjoita Oskarin ikä omin sanoin",
      "phase": "Itsenäinen harjoittelu",
      "paragraphs": [
        "Sulje tekstin malli. Kirjoita vain Oskarin ensimmäisessä keskustelussa ilmoittama ikäluku saksaksi."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-READ-06",
        "evidenceRole": "independent",
        "prompt": "Kirjoita Oskarin ikä saksankielisenä sanana.",
        "accepted": [
          "fünf"
        ],
        "success": "Fünf tarkoittaa viisi. Oskar kertoo olevansa viisivuotias.",
        "hint": "Viisi sisältää ü-kirjaimen.",
        "reteach": "Oskar sanoo Ich bin fünf. Luku on fünf.",
        "genericWrong": "Kertaa ensimmäisen dialogin ilmaus Ich bin fünf.",
        "wrongAnswers": {
          "elf": "Elf = 11; se kuuluu neljännen keskustelun Paulille.",
          "zwölf": "Zwölf = 12; sen sanoo Larissa."
        }
      }
    },
    {
      "id": "application",
      "kind": "question",
      "title": "Erota kaksi eri keskustelua",
      "phase": "Soveltaminen",
      "paragraphs": [
        "Tässä pitää päätellä tekstissä oikeasti sanottu tieto ilman puhujien sekoittamista."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-READ-06",
        "evidenceRole": "application",
        "prompt": "Kumpi ikäpari pitää paikkansa? (Larissa C06, Franz C01)",
        "options": [
          {
            "id": "a",
            "label": "Larissa 12, Franz 19"
          },
          {
            "id": "b",
            "label": "Larissa 19, Franz 12",
            "wrongFeedback": "19 kuuluu Franzille ja 12 Larissalle."
          },
          {
            "id": "c",
            "label": "Larissa 11, Franz 20",
            "wrongFeedback": "11 kuuluu Paulille, ja 20 Jörgille."
          }
        ],
        "correctOption": "a",
        "success": "Oikein. Larissa on 12-vuotias ja Franz 19-vuotias.",
        "hint": "Tarkista zwei eri lähdetekstiä.",
        "reteach": "Oikein. Larissa on 12-vuotias ja Franz 19-vuotias. Tarkista zwei eri lähdetekstiä.",
        "genericWrong": "Tarkista kuka puhui ja mikä luku mainittiin. Tarkista zwei eri lähdetekstiä."
      }
    },
    {
      "id": "activity",
      "kind": "activity",
      "title": "Harjoittele ikäfraaseja itse",
      "phase": "Oma harjoittelu",
      "paragraphs": [
        "Valitse kuvitteellinen ikä 17 tai 20. Sano ääneen Wie alt bist du? ja vastaa Ich bin ... Jahre alt. Jos et halua puhua, kirjoita sama kuvitteellinen keskustelu.",
        "Käytä tekstistä tunnistamaasi vastausmallia. Tämä on oma harjoittelumerkintä, ei automaattisesti tarkistettu ääntämisen näyttö."
      ],
      "activityId": "compared-original-texts",
      "activityLabel": "Vertailin molemmat alkuperäistekstit ja harjoittelin ikäfraasin"
    },
    {
      "id": "exit",
      "kind": "question",
      "title": "Mitä C06:n oma uusi Text A sisältää?",
      "phase": "Lopputarkistus",
      "paragraphs": [
        "Varmista vielä ymmärtäväsi, kumpi dialogi on uusi ensisijainen lähde ja mikä on kertaus."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-READ-06",
        "evidenceRole": "exit",
        "prompt": "Mikä pitää paikkansa C06:n ikäaineistoista?",
        "options": [
          {
            "id": "a",
            "label": "C06 sisältää vain Franzin ja Jörgin vanhan keskustelun.",
            "wrongFeedback": "C06:n oma neljän dialogin 12 repliikin Text A on jo kirjan sisällä."
          },
          {
            "id": "b",
            "label": "C06:n uusi Text A sisältää neljä lyhyttä ikädialogia, ja Franz–Jörg on erillinen C01-kertaus."
          },
          {
            "id": "c",
            "label": "Text B:n ääni todistaa automaattisesti, että osaan kuunnella saksaa.",
            "wrongFeedback": "Äänitteen avaaminen tai lukeminen ei todista kuullunymmärtämistä."
          }
        ],
        "correctOption": "b",
        "success": "Oikein. Oma Text A ja vanha kertaus ovat eri aineistoja.",
        "hint": "Etsi neljä dialogia ja aiemmin opittu Franz–Jörg.",
        "reteach": "Oikein. Oma Text A ja vanha kertaus ovat eri aineistoja. Etsi neljä dialogia ja aiemmin opittu Franz–Jörg.",
        "genericWrong": "Tarkista kuka puhui ja mikä luku mainittiin. Etsi neljä dialogia ja aiemmin opittu Franz–Jörg."
      }
    },
    {
      "id": "summary",
      "kind": "summary",
      "title": "Ymmärrät ikätiedot kahdesta lähteestä",
      "phase": "Yhteenveto",
      "paragraphs": [
        "C06:n oma 12 repliikin teksti sisältää Oskarin (5), Larissan (12), kahden puhujan (10) ja Paulin (11) ikätiedot.",
        "Vanha C01:n kahdeksan repliikin keskustelu kertoo Franzin (19) ja Jörgin (20) iät. Olet harjoitellut molemmat lukemalla ja vastannut oikeisiin lähdekysymyksiin.",
        "Äänilähteiden oikeudellinen ja tekninen tarkistus odottaa edelleen hyväksyntää; tämän tunnin merkintä ei väitä kuuntelutaitoa arvioiduksi. L035:ssa tehdään C06:n oma koko kappaletesti."
      ]
    }
  ]
};
