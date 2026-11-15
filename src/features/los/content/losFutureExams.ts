/** Source transcription of all fourteen LOS! 2–8 paper exam manuscripts.
 * Source: the user-approved Los2-5.txt / Los6-8.txt, 13–14 Nov 2026.
 * These are original editorial drafts, NOT fully approved exams. Answer keys
 * must never be rendered during an attempt, and the unapproved listening
 * scripts must never be advertised as usable audio. No external AI required.
 */
export type LosFutureExamQuestion={id:string;points:number;prompt:string;answerKey:string};
export type LosFutureExam={
  id:string;bookId:number;kind:"midterm"|"final";readingText:string;
  questions:LosFutureExamQuestion[];
  writing:{id:string;points:10;prompt:string;rubric:string};
  listeningDraft:{script:string;questions:{id:string;prompt:string;answerKey:string}[];mediaApproved:false};
};
export const LOS_FUTURE_EXAMS:Record<string,LosFutureExam>={
  "LOS2-MID": {
    "id": "LOS2-MID",
    "bookId": 2,
    "kind": "midterm",
    "readingText": "Eva wohnt mit ihrer Familie in einer kleinen Stadt. Ihre Mutter arbeitet in einer Bäckerei und ihr Vater ist Lehrer. Eva hat eine Schwester. Sie heißt Marie und ist zwölf Jahre alt. Die Familie wohnt in einer Wohnung mit drei Zimmern. Eva hat ein eigenes Zimmer mit einem Bett und einem Schreibtisch. Morgens steht sie um sieben Uhr auf. Sie frühstückt um halb acht und fährt um acht Uhr mit dem Bus zur Schule. Nachmittags macht sie Hausaufgaben. Am Mittwoch spielt sie mit ihrer Schwester im Park. Am Wochenende kocht die Familie gern zusammen.",
    "questions": [
      {
        "id": "LOS2-MID-R01",
        "points": 2,
        "prompt": "Missä Eva asuu?",
        "answerKey": "Pienessä kaupungissa, perheensä kanssa."
      },
      {
        "id": "LOS2-MID-R02",
        "points": 2,
        "prompt": "Missä Evan äiti työskentelee?",
        "answerKey": "Leipomossa."
      },
      {
        "id": "LOS2-MID-R03",
        "points": 2,
        "prompt": "Kuinka vanha Marie on?",
        "answerKey": "12-vuotias."
      },
      {
        "id": "LOS2-MID-R04",
        "points": 2,
        "prompt": "Mitä Evan huoneessa on?",
        "answerKey": "Sänky ja kirjoituspöytä."
      },
      {
        "id": "LOS2-MID-R05",
        "points": 2,
        "prompt": "Millä Eva menee kouluun?",
        "answerKey": "Bussilla."
      },
      {
        "id": "LOS2-MID-G01",
        "points": 2,
        "prompt": "wir / lernen / Deutsch (muodosta lause)",
        "answerKey": "Wir lernen Deutsch."
      },
      {
        "id": "LOS2-MID-G02",
        "points": 2,
        "prompt": "ich / haben / eine Schwester (taivuta)",
        "answerKey": "Ich habe eine Schwester."
      },
      {
        "id": "LOS2-MID-G03",
        "points": 2,
        "prompt": "ein / einen: Ich brauche ___ Stuhl.",
        "answerKey": "einen"
      },
      {
        "id": "LOS2-MID-G04",
        "points": 2,
        "prompt": "mein / meine: Das ist ___ Mutter.",
        "answerKey": "meine"
      },
      {
        "id": "LOS2-MID-G05",
        "points": 2,
        "prompt": "käännä: Hän asuu täällä. (mies)",
        "answerKey": "Er wohnt hier."
      },
      {
        "id": "LOS2-MID-V01",
        "points": 1,
        "prompt": "Käännä suomeksi: die Mutter",
        "answerKey": "äiti"
      },
      {
        "id": "LOS2-MID-V02",
        "points": 1,
        "prompt": "Käännä suomeksi: das Zimmer",
        "answerKey": "huone"
      },
      {
        "id": "LOS2-MID-V03",
        "points": 1,
        "prompt": "Käännä suomeksi: der Tisch",
        "answerKey": "pöytä"
      },
      {
        "id": "LOS2-MID-V04",
        "points": 1,
        "prompt": "Käännä suomeksi: morgens",
        "answerKey": "aamuisin"
      },
      {
        "id": "LOS2-MID-V05",
        "points": 1,
        "prompt": "Käännä suomeksi: der Bus",
        "answerKey": "bussi"
      }
    ],
    "writing": {
      "id": "LOS2-MID-W01",
      "points": 10,
      "prompt": "Kirjoita 55–75 sanan esittely kuvitteellisesta perheestä tai asuinpaikasta. Kerro vähintään kolmen henkilön nimet, kaksi arkirutiinia ja kuvaile yksi huone. Käytä vähintään kahta eri persoonamuotoa.",
      "rubric": "{“sisältö-ja-tehtävään-vastaaminen”: 4, “kielen-ymmärrettävyys-ja-tarkkuus”: 3, “sanasto-ja-opitut-rakenteet”: 2, “tekstin-jäsennys”: 1}"
    },
    "listeningDraft": {
      "script": "Guten Tag! Ich bin Paula. Ich wohne mit meiner Mutter und meinem Bruder in Mainz. Unsere Wohnung hat drei Zimmer und eine kleine Küche. Mein Bruder heißt Leon und ist vierzehn Jahre alt. Er lernt gern Englisch. Ich habe ein eigenes Zimmer. Dort stehen ein Bett, ein Tisch und zwei Stühle. Am Mittwoch besuchen wir unsere Tante. Sie wohnt nicht weit von uns.",
      "questions": [
        {
          "id": "LOS2-MID-A01",
          "prompt": "Missä Paula asuu?",
          "answerKey": "Mainzissa."
        },
        {
          "id": "LOS2-MID-A02",
          "prompt": "Kuinka vanha Leon on?",
          "answerKey": "14 vuotta."
        },
        {
          "id": "LOS2-MID-A03",
          "prompt": "Mitä Paulan huoneessa on?",
          "answerKey": "Sänky, pöytä ja kaksi tuolia."
        }
      ],
      "mediaApproved": false
    }
  },
  "LOS2-FINAL": {
    "id": "LOS2-FINAL",
    "bookId": 2,
    "kind": "final",
    "readingText": "Am Samstag treffen sich Leo und Nora in der Innenstadt. Zuerst gehen sie in einen Supermarkt. Leo braucht Brot, Milch und Äpfel. Nora möchte Käse und Tomaten kaufen. Sie bezahlen an der Kasse und gehen dann in ein Café. Leo bestellt einen Kaffee und ein Käsebrötchen. Nora möchte einen Tee und ein Stück Kuchen. Die Kellnerin bringt das Essen. Nach einer Stunde gehen sie in die Bibliothek. Leo sucht ein Buch über Berlin, Nora liest eine Zeitschrift. Um siebzehn Uhr fahren beide mit der Straßenbahn nach Hause. Am Abend schreibt Nora ihrer Freundin: „Heute war ein schöner Tag!“",
    "questions": [
      {
        "id": "LOS2-FINAL-R01",
        "points": 2,
        "prompt": "Mihin Leo ja Nora menevät ensin?",
        "answerKey": "Supermarkettiin."
      },
      {
        "id": "LOS2-FINAL-R02",
        "points": 2,
        "prompt": "Mitä Leo ostaa supermarketista?",
        "answerKey": "Leipää, maitoa ja omenoita."
      },
      {
        "id": "LOS2-FINAL-R03",
        "points": 2,
        "prompt": "Mitä Nora tilaa kahvilassa?",
        "answerKey": "Teen ja palan kakkua."
      },
      {
        "id": "LOS2-FINAL-R04",
        "points": 2,
        "prompt": "Mitä Leo etsii kirjastosta?",
        "answerKey": "Berliiniä käsittelevää kirjaa."
      },
      {
        "id": "LOS2-FINAL-R05",
        "points": 2,
        "prompt": "Millä he palaavat kotiin?",
        "answerKey": "Raitiovaunulla."
      },
      {
        "id": "LOS2-FINAL-G01",
        "points": 2,
        "prompt": "käännä: Haluaisin teen.",
        "answerKey": "Ich möchte einen Tee."
      },
      {
        "id": "LOS2-FINAL-G02",
        "points": 2,
        "prompt": "täydennä: Ich kaufe ___ Apfel.",
        "answerKey": "einen"
      },
      {
        "id": "LOS2-FINAL-G03",
        "points": 2,
        "prompt": "Muodosta kohtelias kysymys: bezahlen / wir / können?",
        "answerKey": "Können wir bezahlen?"
      },
      {
        "id": "LOS2-FINAL-G04",
        "points": 2,
        "prompt": "käännä: Hän juo mielellään vettä. (nainen)",
        "answerKey": "Sie trinkt gern Wasser."
      },
      {
        "id": "LOS2-FINAL-G05",
        "points": 2,
        "prompt": "Kirjoita: Meillä on kaksi huonetta.",
        "answerKey": "Wir haben zwei Zimmer."
      },
      {
        "id": "LOS2-FINAL-V01",
        "points": 1,
        "prompt": "Käännä suomeksi: die Rechnung",
        "answerKey": "lasku"
      },
      {
        "id": "LOS2-FINAL-V02",
        "points": 1,
        "prompt": "Käännä suomeksi: bestellen",
        "answerKey": "tilata"
      },
      {
        "id": "LOS2-FINAL-V03",
        "points": 1,
        "prompt": "Käännä suomeksi: das Geschäft",
        "answerKey": "liike/kauppa"
      },
      {
        "id": "LOS2-FINAL-V04",
        "points": 1,
        "prompt": "Käännä suomeksi: der Apfel",
        "answerKey": "omena"
      },
      {
        "id": "LOS2-FINAL-V05",
        "points": 1,
        "prompt": "Käännä suomeksi: geradeaus",
        "answerKey": "suoraan"
      }
    ],
    "writing": {
      "id": "LOS2-FINAL-W01",
      "points": 10,
      "prompt": "Kirjoita 65–85 sanan viesti kaverille yhteisestä kaupunkipäivästä. Kuvaile ostostilanne, kahvilatilaus ja tapaamisaika. Käytä akkusatiivia ja vähintään yhtä kohteliasta pyyntöä.",
      "rubric": "{“sisältö-ja-tehtävään-vastaaminen”: 4, “kielen-ymmärrettävyys-ja-tarkkuus”: 3, “sanasto-ja-opitut-rakenteet”: 2, “tekstin-jäsennys”: 1}"
    },
    "listeningDraft": {
      "script": "Hallo! Ich heiße Tim. Heute ist Samstag und ich gehe einkaufen. Ich brauche Brot, drei Äpfel und eine Flasche Wasser. Im Supermarkt kostet das Brot zwei Euro. Danach treffe ich meine Freundin im Café. Sie bestellt einen Tee, und ich möchte einen Kakao. Am Nachmittag gehen wir zusammen in den Park. Um sechs Uhr fahre ich nach Hause.",
      "questions": [
        {
          "id": "LOS2-FINAL-A01",
          "prompt": "Mitä Tim ostaa supermarketista?",
          "answerKey": "Leipää, kolme omenaa ja pullon vettä."
        },
        {
          "id": "LOS2-FINAL-A02",
          "prompt": "Mitä Timin ystävä tilaa kahvilassa?",
          "answerKey": "Teetä."
        },
        {
          "id": "LOS2-FINAL-A03",
          "prompt": "Mihin aikaan Tim menee kotiin?",
          "answerKey": "Kuudelta."
        }
      ],
      "mediaApproved": false
    }
  },
  "LOS3-MID": {
    "id": "LOS3-MID",
    "bookId": 3,
    "kind": "midterm",
    "readingText": "Maja hat viele Hobbys. Sie spielt zweimal pro Woche Volleyball und liest fast jeden Abend. Ihr Freund Oskar kann gut schwimmen, aber er mag Mannschaftssport nicht besonders. Freitags besuchen beide einen Musikkurs. Dort müssen sie ihre Instrumente mitbringen. Maja spielt Klavier und Oskar Gitarre. Am Samstag möchten sie mit Freunden einen Film sehen. Zuerst müssen sie noch für die Schule lernen. Oskar fragt: „Können wir uns um sechs Uhr treffen?“ Maja antwortet: „Ja, aber ich darf nicht sehr spät nach Hause kommen.“ Die Freunde verabreden sich für den frühen Abend.",
    "questions": [
      {
        "id": "LOS3-MID-R01",
        "points": 2,
        "prompt": "Kuinka usein Maja pelaa lentopalloa?",
        "answerKey": "Kahdesti viikossa."
      },
      {
        "id": "LOS3-MID-R02",
        "points": 2,
        "prompt": "Mitä Oskar osaa hyvin?",
        "answerKey": "Uida."
      },
      {
        "id": "LOS3-MID-R03",
        "points": 2,
        "prompt": "Mitä Maja soittaa?",
        "answerKey": "Pianoa."
      },
      {
        "id": "LOS3-MID-R04",
        "points": 2,
        "prompt": "Mitä heidän pitää tehdä ennen elokuvaa?",
        "answerKey": "Opiskella kouluun."
      },
      {
        "id": "LOS3-MID-R05",
        "points": 2,
        "prompt": "Monelta Oskar ehdottaa tapaamista?",
        "answerKey": "Kello kuusi."
      },
      {
        "id": "LOS3-MID-G01",
        "points": 2,
        "prompt": "können: Ich ___ gut schwimmen.",
        "answerKey": "kann"
      },
      {
        "id": "LOS3-MID-G02",
        "points": 2,
        "prompt": "müssen: Wir ___ heute lernen.",
        "answerKey": "müssen"
      },
      {
        "id": "LOS3-MID-G03",
        "points": 2,
        "prompt": "dürfen: Du ___ hier nicht rauchen.",
        "answerKey": "darfst"
      },
      {
        "id": "LOS3-MID-G04",
        "points": 2,
        "prompt": "käännä: Haluamme mennä elokuviin.",
        "answerKey": "Wir wollen ins Kino gehen."
      },
      {
        "id": "LOS3-MID-G05",
        "points": 2,
        "prompt": "Järjestä: morgen / Musik / hört / Maja",
        "answerKey": "Maja hört morgen Musik."
      },
      {
        "id": "LOS3-MID-V01",
        "points": 1,
        "prompt": "Käännä suomeksi: das Hobby",
        "answerKey": "harrastus"
      },
      {
        "id": "LOS3-MID-V02",
        "points": 1,
        "prompt": "Käännä suomeksi: der Sport",
        "answerKey": "urheilu"
      },
      {
        "id": "LOS3-MID-V03",
        "points": 1,
        "prompt": "Käännä suomeksi: das Fach",
        "answerKey": "oppiaine"
      },
      {
        "id": "LOS3-MID-V04",
        "points": 1,
        "prompt": "Käännä suomeksi: der Film",
        "answerKey": "elokuva"
      },
      {
        "id": "LOS3-MID-V05",
        "points": 1,
        "prompt": "Käännä suomeksi: oft",
        "answerKey": "usein"
      }
    ],
    "writing": {
      "id": "LOS3-MID-W01",
      "points": 10,
      "prompt": "Kuvaile 70–90 sanalla kouluviikkoasi ja kahta harrastustasi. Käytä vähintään kahta modaaliverbiä ja yhtä aikamäärettä.",
      "rubric": "{“sisältö-ja-tehtävään-vastaaminen”: 4, “kielen-ymmärrettävyys-ja-tarkkuus”: 3, “sanasto-ja-opitut-rakenteet”: 2, “tekstin-jäsennys”: 1}"
    },
    "listeningDraft": {
      "script": "Hallo, ich bin Jana. In meiner Freizeit spiele ich gern Volleyball. Zweimal pro Woche trainiere ich mit meinem Verein. Am Montag kann ich nicht kommen, denn ich muss für eine Prüfung lernen. Mein Lieblingsfach ist Biologie. Ich höre auch gern Musik. Am Freitag möchte ich mit Freunden einen Film sehen. Wir wissen noch nicht, welcher Film es wird.",
      "questions": [
        {
          "id": "LOS3-MID-A01",
          "prompt": "Mitä Jana harrastaa?",
          "answerKey": "Lentopalloa."
        },
        {
          "id": "LOS3-MID-A02",
          "prompt": "Miksi hän ei voi tulla maanantaina?",
          "answerKey": "Hänen täytyy opiskella koetta varten."
        },
        {
          "id": "LOS3-MID-A03",
          "prompt": "Mitä hän aikoo tehdä perjantaina?",
          "answerKey": "Mennä katsomaan elokuvan ystävien kanssa."
        }
      ],
      "mediaApproved": false
    }
  },
  "LOS3-FINAL": {
    "id": "LOS3-FINAL",
    "bookId": 3,
    "kind": "final",
    "readingText": "Eine Klasse möchte am Freitag einen Ausflug machen. Zuerst schlagen einige Jugendliche einen Kinobesuch vor, andere möchten lieber in die Natur fahren. Die Gruppe findet einen Park mit einem kleinen Museum. Die Lehrerin sagt, dass sie am Morgen pünktlich losfahren müssen. Mia sucht die Busverbindung, Ben organisiert die Eintrittskarten und Karim schreibt eine Liste mit wichtigen Sachen. Am Freitag treffen sich alle um neun Uhr vor der Schule. Während der Fahrt sprechen sie über ihre Pläne. Nach dem Museumsbesuch essen sie gemeinsam. Dann machen sie einen Spaziergang. Gegen vier Uhr kommen sie zurück und räumen ihre Sachen auf.",
    "questions": [
      {
        "id": "LOS3-FINAL-R01",
        "points": 2,
        "prompt": "Mitä retkivaihtoehtoja ensin ehdotetaan?",
        "answerKey": "Elokuvia ja luontoretkeä."
      },
      {
        "id": "LOS3-FINAL-R02",
        "points": 2,
        "prompt": "Kuka etsii bussiyhteyden?",
        "answerKey": "Mia."
      },
      {
        "id": "LOS3-FINAL-R03",
        "points": 2,
        "prompt": "Mihin aikaan ryhmä tapaa?",
        "answerKey": "Kello yhdeksän."
      },
      {
        "id": "LOS3-FINAL-R04",
        "points": 2,
        "prompt": "Mitä ryhmä tekee museon jälkeen?",
        "answerKey": "Syö ja kävelee."
      },
      {
        "id": "LOS3-FINAL-R05",
        "points": 2,
        "prompt": "Milloin ryhmä palaa?",
        "answerKey": "Noin kello neljältä."
      },
      {
        "id": "LOS3-FINAL-G01",
        "points": 2,
        "prompt": "wollen: Er ___ ein Museum besuchen.",
        "answerKey": "will"
      },
      {
        "id": "LOS3-FINAL-G02",
        "points": 2,
        "prompt": "aufstehen: Wir ___ um sieben Uhr ___.",
        "answerKey": "stehen … auf"
      },
      {
        "id": "LOS3-FINAL-G03",
        "points": 2,
        "prompt": "käännä: Voinko tulla mukaan?",
        "answerKey": "Kann ich mitkommen?"
      },
      {
        "id": "LOS3-FINAL-G04",
        "points": 2,
        "prompt": "käännä: Meidän täytyy ostaa liput.",
        "answerKey": "Wir müssen Tickets kaufen."
      },
      {
        "id": "LOS3-FINAL-G05",
        "points": 2,
        "prompt": "Muodosta kysymys: wann / ihr / euch / treffen",
        "answerKey": "Wann trefft ihr euch?"
      },
      {
        "id": "LOS3-FINAL-V01",
        "points": 1,
        "prompt": "Käännä suomeksi: der Ausflug",
        "answerKey": "retki"
      },
      {
        "id": "LOS3-FINAL-V02",
        "points": 1,
        "prompt": "Käännä suomeksi: das Wochenende",
        "answerKey": "viikonloppu"
      },
      {
        "id": "LOS3-FINAL-V03",
        "points": 1,
        "prompt": "Käännä suomeksi: der Bahnhof",
        "answerKey": "rautatieasema"
      },
      {
        "id": "LOS3-FINAL-V04",
        "points": 1,
        "prompt": "Käännä suomeksi: die Hausaufgabe",
        "answerKey": "kotitehtävä"
      },
      {
        "id": "LOS3-FINAL-V05",
        "points": 1,
        "prompt": "Käännä suomeksi: die Freizeit",
        "answerKey": "vapaa-aika"
      }
    ],
    "writing": {
      "id": "LOS3-FINAL-W01",
      "points": 10,
      "prompt": "Laadi 80–100 sanan retkisuunnitelma, jossa sovit paikan ja ajan, kerrot kolme tekemistä ja huomioit kaksi rajoitetta. Käytä modaaliverbejä.",
      "rubric": "{“sisältö-ja-tehtävään-vastaaminen”: 4, “kielen-ymmärrettävyys-ja-tarkkuus”: 3, “sanasto-ja-opitut-rakenteet”: 2, “tekstin-jäsennys”: 1}"
    },
    "listeningDraft": {
      "script": "Wir machen am Samstag einen Ausflug nach Leipzig. Unser Zug fährt um neun Uhr ab. Wir treffen uns schon um halb neun am Bahnhof. Zuerst besuchen wir ein Museum, dann essen wir in einem kleinen Restaurant. Nachmittags können wir durch die Stadt spazieren gehen. Mia will Fotos machen und Ben möchte ein Buch kaufen. Um achtzehn Uhr fahren wir wieder nach Hause.",
      "questions": [
        {
          "id": "LOS3-FINAL-A01",
          "prompt": "Millä he matkustavat Leipzigiin?",
          "answerKey": "Junalla."
        },
        {
          "id": "LOS3-FINAL-A02",
          "prompt": "Missä ja milloin he tapaavat?",
          "answerKey": "Rautatieasemalla 8.30."
        },
        {
          "id": "LOS3-FINAL-A03",
          "prompt": "Mitä Ben haluaa ostaa?",
          "answerKey": "Kirjan."
        }
      ],
      "mediaApproved": false
    }
  },
  "LOS4-MID": {
    "id": "LOS4-MID",
    "bookId": 4,
    "kind": "midterm",
    "readingText": "Lea schreibt ihrer Freundin aus Wien. Sie ist gestern mit dem Zug angekommen und wohnt bei einer Gastfamilie. Am Vormittag besucht sie ein Museum. Danach geht sie mit ihrer Gastgeberin in ein Café. Auf der Karte stehen Wörter, die sie aus dem Deutschunterricht noch nicht kennt. Ihre Gastgeberin erklärt die Begriffe freundlich. Lea findet besonders interessant, dass sich Alltag und Sprache von Stadt zu Stadt unterscheiden können. Am Abend liest sie einen Text über die Schweiz. Sie lernt, dass in der Schweiz mehrere Sprachen gesprochen werden. Für ihre Klasse möchte sie später einen kleinen Reisebericht schreiben.",
    "questions": [
      {
        "id": "LOS4-MID-R01",
        "points": 2,
        "prompt": "Missä Lea on?",
        "answerKey": "Wienissä."
      },
      {
        "id": "LOS4-MID-R02",
        "points": 2,
        "prompt": "Millä Lea saapui?",
        "answerKey": "Junalla."
      },
      {
        "id": "LOS4-MID-R03",
        "points": 2,
        "prompt": "Mitä Lea tekee aamupäivällä?",
        "answerKey": "Käy museossa."
      },
      {
        "id": "LOS4-MID-R04",
        "points": 2,
        "prompt": "Kuka selittää ruokatermejä?",
        "answerKey": "Isäntäperheen jäsen."
      },
      {
        "id": "LOS4-MID-R05",
        "points": 2,
        "prompt": "Mitä Lea aikoo kirjoittaa?",
        "answerKey": "Pienen matkakertomuksen."
      },
      {
        "id": "LOS4-MID-G01",
        "points": 2,
        "prompt": "käännä: Puhun saksaa.",
        "answerKey": "Ich spreche Deutsch."
      },
      {
        "id": "LOS4-MID-G02",
        "points": 2,
        "prompt": "Täydennä: ___ Österreich spricht man Deutsch.",
        "answerKey": "In"
      },
      {
        "id": "LOS4-MID-G03",
        "points": 2,
        "prompt": "käännä: Suomessa on paljon järviä.",
        "answerKey": "In Finnland gibt es viele Seen."
      },
      {
        "id": "LOS4-MID-G04",
        "points": 2,
        "prompt": "Täydennä: Die Schweiz hat ___ Landessprachen.",
        "answerKey": "mehrere / vier"
      },
      {
        "id": "LOS4-MID-G05",
        "points": 2,
        "prompt": "Kirjoita lyhyt vertailulause: Berlin / groß / Bonn",
        "answerKey": "Berlin ist größer als Bonn."
      },
      {
        "id": "LOS4-MID-V01",
        "points": 1,
        "prompt": "Käännä suomeksi: die Sprache",
        "answerKey": "kieli"
      },
      {
        "id": "LOS4-MID-V02",
        "points": 1,
        "prompt": "Käännä suomeksi: das Land",
        "answerKey": "maa"
      },
      {
        "id": "LOS4-MID-V03",
        "points": 1,
        "prompt": "Käännä suomeksi: die Stadt",
        "answerKey": "kaupunki"
      },
      {
        "id": "LOS4-MID-V04",
        "points": 1,
        "prompt": "Käännä suomeksi: die Tradition",
        "answerKey": "perinne"
      },
      {
        "id": "LOS4-MID-V05",
        "points": 1,
        "prompt": "Käännä suomeksi: der Dialekt",
        "answerKey": "murre"
      }
    ],
    "writing": {
      "id": "LOS4-MID-W01",
      "points": 10,
      "prompt": "Kirjoita 80–100 sanan esittely Saksasta, Itävallasta, Sveitsistä tai Suomesta. Kuvaa sijainti, kieliä ja kaksi kulttuurista piirrettä ilman yleistystä.",
      "rubric": "{“sisältö-ja-tehtävään-vastaaminen”: 4, “kielen-ymmärrettävyys-ja-tarkkuus”: 3, “sanasto-ja-opitut-rakenteet”: 2, “tekstin-jäsennys”: 1}"
    },
    "listeningDraft": {
      "script": "Meine Familie kommt aus Finnland. Letzten Sommer sind wir mit dem Zug nach Deutschland gefahren. Zuerst waren wir in Berlin, danach haben wir meine Tante in Hamburg besucht. Mir hat das Meer in Hamburg gut gefallen, aber mein Bruder mochte die Museen in Berlin lieber. Im September erzählen wir im Deutschkurs von unserer Reise. Wir haben viele Fotos gemacht.",
      "questions": [
        {
          "id": "LOS4-MID-A01",
          "prompt": "Missä kahdessa saksalaisessa kaupungissa perhe kävi?",
          "answerKey": "Berliinissä ja Hampurissa."
        },
        {
          "id": "LOS4-MID-A02",
          "prompt": "Mistä kertoja piti Hampurissa?",
          "answerKey": "Merestä."
        },
        {
          "id": "LOS4-MID-A03",
          "prompt": "Mitä he tekevät syyskuussa?",
          "answerKey": "Kertovat matkasta saksan kurssilla."
        }
      ],
      "mediaApproved": false
    }
  },
  "LOS4-FINAL": {
    "id": "LOS4-FINAL",
    "bookId": 4,
    "kind": "final",
    "readingText": "Im letzten Monat hat Felix eine Reise gemacht. Zuerst ist er nach Hamburg gefahren. Dort hat er die Altstadt besucht und eine Hafenrundfahrt gemacht. Später ist er mit dem Zug nach Basel gereist. In Basel hat er bei einem Freund gewohnt. Die beiden sind am Rhein spazieren gegangen und haben ein Museum besichtigt. Felix sagt: „Ich habe viele interessante Menschen getroffen.“ Für die Schule schreibt er einen Reisevergleich. Er findet Hamburg größer, aber Basel ruhiger. Er erklärt auch, warum ihm beide Städte gefallen haben. Bei seinen Informationen unterscheidet er die eigenen Erlebnisse von Angaben aus Reiseführern.",
    "questions": [
      {
        "id": "LOS4-FINAL-R01",
        "points": 2,
        "prompt": "Mihin Felix matkusti ensin?",
        "answerKey": "Hampuriin."
      },
      {
        "id": "LOS4-FINAL-R02",
        "points": 2,
        "prompt": "Miten hän matkusti Baseliin?",
        "answerKey": "Junalla."
      },
      {
        "id": "LOS4-FINAL-R03",
        "points": 2,
        "prompt": "Kenen luona hän yöpyi Baselissa?",
        "answerKey": "Ystävän luona."
      },
      {
        "id": "LOS4-FINAL-R04",
        "points": 2,
        "prompt": "Kumpaa kaupunkia Felix kuvaa rauhallisemmaksi?",
        "answerKey": "Baselia."
      },
      {
        "id": "LOS4-FINAL-R05",
        "points": 2,
        "prompt": "Minkälaiset tiedot Felix erottaa toisistaan?",
        "answerKey": "Omat kokemukset ja matkaopastiedot."
      },
      {
        "id": "LOS4-FINAL-G01",
        "points": 2,
        "prompt": "Perfekt: Ich ___ nach Berlin ___. (fahren)",
        "answerKey": "bin … gefahren"
      },
      {
        "id": "LOS4-FINAL-G02",
        "points": 2,
        "prompt": "Perfekt: Wir ___ ein Museum ___. (besuchen)",
        "answerKey": "haben … besucht"
      },
      {
        "id": "LOS4-FINAL-G03",
        "points": 2,
        "prompt": "weil: Ich lerne Deutsch, ___ ich reisen möchte.",
        "answerKey": "weil"
      },
      {
        "id": "LOS4-FINAL-G04",
        "points": 2,
        "prompt": "käännä: Tämä kaupunki on suurempi.",
        "answerKey": "Diese Stadt ist größer."
      },
      {
        "id": "LOS4-FINAL-G05",
        "points": 2,
        "prompt": "Täydennä: Sie ___ gestern im Café. (sein, preteriti)",
        "answerKey": "war"
      },
      {
        "id": "LOS4-FINAL-V01",
        "points": 1,
        "prompt": "Käännä suomeksi: die Reise",
        "answerKey": "matka"
      },
      {
        "id": "LOS4-FINAL-V02",
        "points": 1,
        "prompt": "Käännä suomeksi: besuchen",
        "answerKey": "vierailla"
      },
      {
        "id": "LOS4-FINAL-V03",
        "points": 1,
        "prompt": "Käännä suomeksi: das Fest",
        "answerKey": "juhla"
      },
      {
        "id": "LOS4-FINAL-V04",
        "points": 1,
        "prompt": "Käännä suomeksi: die Sehenswürdigkeit",
        "answerKey": "nähtävyys"
      },
      {
        "id": "LOS4-FINAL-V05",
        "points": 1,
        "prompt": "Käännä suomeksi: der Unterschied",
        "answerKey": "ero"
      }
    ],
    "writing": {
      "id": "LOS4-FINAL-W01",
      "points": 10,
      "prompt": "Kirjoita 90–110 sanan matkakertomus (voi olla kuvitteellinen) ja vertaa kahta paikkaa. Käytä vähintään kolmea Perfekt-lausetta ja yhtä weil-sivulausetta.",
      "rubric": "{“sisältö-ja-tehtävään-vastaaminen”: 4, “kielen-ymmärrettävyys-ja-tarkkuus”: 3, “sanasto-ja-opitut-rakenteet”: 2, “tekstin-jäsennys”: 1}"
    },
    "listeningDraft": {
      "script": "Willkommen zu meinem kurzen Reiseführer! Heute stelle ich Innsbruck in Österreich vor. Die Stadt liegt in den Alpen. Man kann dort wandern und Museen besuchen. Im Winter kommen viele Gäste zum Skifahren. Ich war im letzten Jahr dort und habe ein kleines Museum besucht. Mir hat die Reise gefallen, weil die Berge sehr schön sind. Prüft vor eurer Reise die aktuellen Öffnungszeiten.",
      "questions": [
        {
          "id": "LOS4-FINAL-A01",
          "prompt": "Missä maassa Innsbruck sijaitsee?",
          "answerKey": "Itävallassa."
        },
        {
          "id": "LOS4-FINAL-A02",
          "prompt": "Mitä kaupungissa voi tehdä?",
          "answerKey": "Vaeltaa ja vierailla museoissa; talvella hiihtää."
        },
        {
          "id": "LOS4-FINAL-A03",
          "prompt": "Miksi kertoja piti matkasta?",
          "answerKey": "Koska vuoret ovat kauniita."
        }
      ],
      "mediaApproved": false
    }
  },
  "LOS5-MID": {
    "id": "LOS5-MID",
    "bookId": 5,
    "kind": "midterm",
    "readingText": "Am Montag fühlt sich Tim nicht besonders gut. Er hat Halsschmerzen und ist sehr müde. Er ruft in der Arztpraxis an und bekommt einen Termin am Nachmittag. Die Ärztin fragt, wie lange die Beschwerden schon dauern. Tim antwortet ruhig und bittet um eine Erklärung, als er ein Wort nicht versteht. Später ruht er sich zu Hause aus. Seine Schwester bringt ihm einen Tee. Am Abend schreibt Tim seinem Freund eine Nachricht. Er sagt, dass er heute nicht zum Training kommen kann. Er möchte erst wieder Sport machen, wenn es ihm besser geht.",
    "questions": [
      {
        "id": "LOS5-MID-R01",
        "points": 2,
        "prompt": "Mitä oireita Timillä on?",
        "answerKey": "Kurkkukipua ja väsymystä."
      },
      {
        "id": "LOS5-MID-R02",
        "points": 2,
        "prompt": "Milloin lääkäriaika on?",
        "answerKey": "Iltapäivällä."
      },
      {
        "id": "LOS5-MID-R03",
        "points": 2,
        "prompt": "Mitä Tim tekee, kun hän ei ymmärrä?",
        "answerKey": "Pyytää selitystä."
      },
      {
        "id": "LOS5-MID-R04",
        "points": 2,
        "prompt": "Mitä sisko tuo?",
        "answerKey": "Teetä."
      },
      {
        "id": "LOS5-MID-R05",
        "points": 2,
        "prompt": "Miksi Tim ei mene harjoituksiin?",
        "answerKey": "Hän on kipeä."
      },
      {
        "id": "LOS5-MID-G01",
        "points": 2,
        "prompt": "Käännä: Kurkkuni on kipeä.",
        "answerKey": "Mein Hals tut weh."
      },
      {
        "id": "LOS5-MID-G02",
        "points": 2,
        "prompt": "käännä: Minusta tuntuu väsyneeltä.",
        "answerKey": "Ich fühle mich müde."
      },
      {
        "id": "LOS5-MID-G03",
        "points": 2,
        "prompt": "Täydennä: Du ___ mehr trinken. (sollen)",
        "answerKey": "solltest"
      },
      {
        "id": "LOS5-MID-G04",
        "points": 2,
        "prompt": "weil: Ich bleibe zu Hause, ___ ich krank bin.",
        "answerKey": "weil"
      },
      {
        "id": "LOS5-MID-G05",
        "points": 2,
        "prompt": "Käännä: Voisitteko toistaa sen?",
        "answerKey": "Könnten Sie das bitte wiederholen?"
      },
      {
        "id": "LOS5-MID-V01",
        "points": 1,
        "prompt": "Käännä suomeksi: die Gesundheit",
        "answerKey": "terveys"
      },
      {
        "id": "LOS5-MID-V02",
        "points": 1,
        "prompt": "Käännä suomeksi: der Kopf",
        "answerKey": "pää"
      },
      {
        "id": "LOS5-MID-V03",
        "points": 1,
        "prompt": "Käännä suomeksi: das Knie",
        "answerKey": "polvi"
      },
      {
        "id": "LOS5-MID-V04",
        "points": 1,
        "prompt": "Käännä suomeksi: die Pause",
        "answerKey": "tauko"
      },
      {
        "id": "LOS5-MID-V05",
        "points": 1,
        "prompt": "Käännä suomeksi: müde",
        "answerKey": "väsynyt"
      }
    ],
    "writing": {
      "id": "LOS5-MID-W01",
      "points": 10,
      "prompt": "Kirjoita 85–105 sanan viesti ystävälle hyvinvoinnista ja omasta tavallisesta päivästäsi. Käytä varovaisia neuvoja ja syyn ilmaisua.",
      "rubric": "{“sisältö-ja-tehtävään-vastaaminen”: 4, “kielen-ymmärrettävyys-ja-tarkkuus”: 3, “sanasto-ja-opitut-rakenteet”: 2, “tekstin-jäsennys”: 1}"
    },
    "listeningDraft": {
      "script": "Guten Morgen, mein Name ist Mila. Ich fühle mich heute nicht besonders gut. Mein Hals tut weh und ich bin sehr müde. Ich möchte in der Arztpraxis anrufen und einen Termin vereinbaren. Meine Schwester hilft mir dabei. Am Nachmittag habe ich einen Termin. Die Ärztin hört mir zu und erklärt alles langsam. Wenn ich eine Frage habe, kann ich noch einmal nachfragen.",
      "questions": [
        {
          "id": "LOS5-MID-A01",
          "prompt": "Miltä Milan olo tuntuu?",
          "answerKey": "Hän on väsynyt ja kurkkua särkee."
        },
        {
          "id": "LOS5-MID-A02",
          "prompt": "Kuka auttaa ajan varaamisessa?",
          "answerKey": "Hänen sisarensa."
        },
        {
          "id": "LOS5-MID-A03",
          "prompt": "Milloin Milan vastaanottoaika on?",
          "answerKey": "Iltapäivällä."
        }
      ],
      "mediaApproved": false
    }
  },
  "LOS5-FINAL": {
    "id": "LOS5-FINAL",
    "bookId": 5,
    "kind": "final",
    "readingText": "Nora ist vor einigen Jahren in eine neue Stadt gezogen. Als sie jünger war, hat sie oft mit ihrer Schwester draußen gespielt. Heute verbringt sie viel Zeit mit Lernen und Arbeit. Manchmal fühlt sie sich gestresst. Deshalb hat sie begonnen, kleine Pausen zu planen. Zweimal in der Woche geht sie mit einer Freundin spazieren. Sie erzählt: „Früher hatte ich selten einen festen Plan. Jetzt überlege ich, was ich wirklich schaffen kann.“ Im Deutschkurs gibt Nora anderen keine strengen Regeln, sondern beschreibt, was ihr selbst geholfen hat. Sie findet es wichtig, aufeinander zu hören.",
    "questions": [
      {
        "id": "LOS5-FINAL-R01",
        "points": 2,
        "prompt": "Mihin Nora on muuttanut?",
        "answerKey": "Uuteen kaupunkiin."
      },
      {
        "id": "LOS5-FINAL-R02",
        "points": 2,
        "prompt": "Mitä hän teki nuorempana?",
        "answerKey": "Leikki usein siskonsa kanssa ulkona."
      },
      {
        "id": "LOS5-FINAL-R03",
        "points": 2,
        "prompt": "Mitä hän on alkanut suunnitella?",
        "answerKey": "Pieniä taukoja."
      },
      {
        "id": "LOS5-FINAL-R04",
        "points": 2,
        "prompt": "Kuinka usein hän käy kävelyllä?",
        "answerKey": "Kaksi kertaa viikossa."
      },
      {
        "id": "LOS5-FINAL-R05",
        "points": 2,
        "prompt": "Miten hän antaa neuvoja muille?",
        "answerKey": "Kuvaamalla omaa kokemustaan ilman ehdottomia sääntöjä."
      },
      {
        "id": "LOS5-FINAL-G01",
        "points": 2,
        "prompt": "Täydennä: Ich denke, ___ Pausen wichtig sind.",
        "answerKey": "dass"
      },
      {
        "id": "LOS5-FINAL-G02",
        "points": 2,
        "prompt": "Perfekt: Sie ___ in die Stadt ___. (ziehen)",
        "answerKey": "ist … gezogen"
      },
      {
        "id": "LOS5-FINAL-G03",
        "points": 2,
        "prompt": "Menneisyys: Früher ___ ich einen Hund. (haben)",
        "answerKey": "hatte"
      },
      {
        "id": "LOS5-FINAL-G04",
        "points": 2,
        "prompt": "Imperatiivi: ___ eine Pause! (machen, du)",
        "answerKey": "Mach"
      },
      {
        "id": "LOS5-FINAL-G05",
        "points": 2,
        "prompt": "Käännä: Tunnen oloni paremmaksi, koska lepään.",
        "answerKey": "Ich fühle mich besser, weil ich mich ausruhe."
      },
      {
        "id": "LOS5-FINAL-V01",
        "points": 1,
        "prompt": "Käännä suomeksi: der Stress",
        "answerKey": "stressi"
      },
      {
        "id": "LOS5-FINAL-V02",
        "points": 1,
        "prompt": "Käännä suomeksi: früher",
        "answerKey": "ennen"
      },
      {
        "id": "LOS5-FINAL-V03",
        "points": 1,
        "prompt": "Käännä suomeksi: das Gefühl",
        "answerKey": "tunne"
      },
      {
        "id": "LOS5-FINAL-V04",
        "points": 1,
        "prompt": "Käännä suomeksi: sich ausruhen",
        "answerKey": "levätä"
      },
      {
        "id": "LOS5-FINAL-V05",
        "points": 1,
        "prompt": "Käännä suomeksi: der Tipp",
        "answerKey": "neuvo"
      }
    ],
    "writing": {
      "id": "LOS5-FINAL-W01",
      "points": 10,
      "prompt": "Kirjoita 100–120 sanaa omista tai kuvitteellisen henkilön hyvinvointitavoista ja muutoksesta lapsuudesta nykypäivään. Käytä weil/dass ja vähintään yhtä menneisyyden ilmausta.",
      "rubric": "{“sisältö-ja-tehtävään-vastaaminen”: 4, “kielen-ymmärrettävyys-ja-tarkkuus”: 3, “sanasto-ja-opitut-rakenteet”: 2, “tekstin-jäsennys”: 1}"
    },
    "listeningDraft": {
      "script": "Früher habe ich oft spät am Abend gearbeitet. Dann war ich am nächsten Morgen müde. Jetzt plane ich meine Woche genauer. Ich mache regelmäßig Pausen und gehe nach der Schule manchmal spazieren. Am Wochenende besuche ich meine Großmutter. Sie erzählt oft Geschichten aus ihrer Jugend. Ich höre gern zu. Wir sprechen darüber, was früher anders war und was heute vielleicht leichter ist.",
      "questions": [
        {
          "id": "LOS5-FINAL-A01",
          "prompt": "Mikä oli kertojan aiempi ongelma?",
          "answerKey": "Hän teki töitä myöhään ja oli aamuisin väsynyt."
        },
        {
          "id": "LOS5-FINAL-A02",
          "prompt": "Mitä hän tekee nykyään koulun jälkeen toisinaan?",
          "answerKey": "Käy kävelyllä."
        },
        {
          "id": "LOS5-FINAL-A03",
          "prompt": "Mistä hän puhuu isoäitinsä kanssa?",
          "answerKey": "Nuoruusajoista ja ennen–nyt-eroista."
        }
      ],
      "mediaApproved": false
    }
  },
  "LOS6-MID": {
    "id": "LOS6-MID",
    "bookId": 6,
    "kind": "midterm",
    "readingText": "Die Klasse plant eine kleine Kulturwoche. Lena stellt einen Film vor, Amir interessiert sich für ein Konzert und Sofia möchte eine kurze Geschichte präsentieren. Die Lehrerin bittet alle, ihre Quellen zu nennen. Lena liest eine Filmbeschreibung und schreibt ihre eigene Meinung auf. Amir recherchiert, wann und wo das Konzert stattfindet. Sofia besucht die Bibliothek und wählt eine Geschichte aus, die nicht zu schwierig ist. In der Präsentation soll jeder erklären, warum das Thema interessant ist. Nach der Kulturwoche schreiben die Jugendlichen eine kurze Rückmeldung. Sie haben unterschiedliche Dinge gelernt und möchten weitere Themen entdecken.",
    "questions": [
      {
        "id": "LOS6-MID-R01",
        "points": 2,
        "prompt": "Mitä Lena esittelee?",
        "answerKey": "Elokuvan."
      },
      {
        "id": "LOS6-MID-R02",
        "points": 2,
        "prompt": "Mistä Amir on kiinnostunut?",
        "answerKey": "Konsertista."
      },
      {
        "id": "LOS6-MID-R03",
        "points": 2,
        "prompt": "Mistä Sofia hakee tarinaa?",
        "answerKey": "Kirjastosta."
      },
      {
        "id": "LOS6-MID-R04",
        "points": 2,
        "prompt": "Mitä kaikkien pitää mainita?",
        "answerKey": "Lähteet."
      },
      {
        "id": "LOS6-MID-R05",
        "points": 2,
        "prompt": "Mitä esityksessä täytyy perustella?",
        "answerKey": "Miksi aihe on kiinnostava."
      },
      {
        "id": "LOS6-MID-G01",
        "points": 2,
        "prompt": "Täydennä: Ich finde den Film gut, ___ die Musik schön ist.",
        "answerKey": "weil"
      },
      {
        "id": "LOS6-MID-G02",
        "points": 2,
        "prompt": "Käännä: Olen kuunnellut musiikkia.",
        "answerKey": "Ich habe Musik gehört."
      },
      {
        "id": "LOS6-MID-G03",
        "points": 2,
        "prompt": "Käännä: Ensin luen tekstin, sitten kirjoitan.",
        "answerKey": "Zuerst lese ich den Text, dann schreibe ich."
      },
      {
        "id": "LOS6-MID-G04",
        "points": 2,
        "prompt": "Täydennä: Der Film ___ interessant. (sein, preesens)",
        "answerKey": "ist"
      },
      {
        "id": "LOS6-MID-G05",
        "points": 2,
        "prompt": "Muodosta mielipide: Kunst / interessant / ich finde",
        "answerKey": "Ich finde Kunst interessant."
      },
      {
        "id": "LOS6-MID-V01",
        "points": 1,
        "prompt": "Käännä suomeksi: das Konzert",
        "answerKey": "konsertti"
      },
      {
        "id": "LOS6-MID-V02",
        "points": 1,
        "prompt": "Käännä suomeksi: das Buch",
        "answerKey": "kirja"
      },
      {
        "id": "LOS6-MID-V03",
        "points": 1,
        "prompt": "Käännä suomeksi: der Film",
        "answerKey": "elokuva"
      },
      {
        "id": "LOS6-MID-V04",
        "points": 1,
        "prompt": "Käännä suomeksi: die Kunst",
        "answerKey": "taide"
      },
      {
        "id": "LOS6-MID-V05",
        "points": 1,
        "prompt": "Käännä suomeksi: die Quelle",
        "answerKey": "lähde"
      }
    ],
    "writing": {
      "id": "LOS6-MID-W01",
      "points": 10,
      "prompt": "Kirjoita 100–120 sanan kulttuurisuositus. Nimeä teos tai tapahtuma, selitä miksi suosittelet sitä ja mainitse vähintään yksi oikea lähde sekä erottele oma mielipiteesi.",
      "rubric": "{“sisältö-ja-tehtävään-vastaaminen”: 4, “kielen-ymmärrettävyys-ja-tarkkuus”: 3, “sanasto-ja-opitut-rakenteet”: 2, “tekstin-jäsennys”: 1}"
    },
    "listeningDraft": {
      "script": "Im Deutschkurs sprechen wir über Kultur. Heute hat Laura einen kurzen Film vorgestellt. Die Geschichte spielt in Berlin und handelt von zwei Freunden. Laura findet den Film spannend, weil die Figuren interessant sind. Danach hat Jonas ein Lied vorgestellt. Er mag die Musik, weil sie ruhig ist. Nächste Woche möchten wir über Bücher sprechen. Jeder bringt eine kurze Empfehlung mit.",
      "questions": [
        {
          "id": "LOS6-MID-A01",
          "prompt": "Mistä Lauran elokuva kertoo?",
          "answerKey": "Kahdesta ystävästä."
        },
        {
          "id": "LOS6-MID-A02",
          "prompt": "Miksi Laura pitää elokuvasta?",
          "answerKey": "Koska hahmot ovat kiinnostavia."
        },
        {
          "id": "LOS6-MID-A03",
          "prompt": "Mistä ryhmä aikoo keskustella ensi viikolla?",
          "answerKey": "Kirjoista."
        }
      ],
      "mediaApproved": false
    }
  },
  "LOS6-FINAL": {
    "id": "LOS6-FINAL",
    "bookId": 6,
    "kind": "final",
    "readingText": "Für ein Projekt recherchiert Ben die Geschichte eines alten Bahnhofs. Er findet Fotos im Stadtarchiv und liest eine kurze Informationstafel. Früher war das Gebäude klein und diente als Treffpunkt für Reisende. Später wurde es verändert. Heute gibt es dort einen Ausstellungsraum. Ben besucht den Ort und fotografiert nur die Bereiche, in denen das erlaubt ist. Für seine Präsentation wählt er drei Bilder aus und nennt die Quellen. Er erklärt, was sich verändert hat, und stellt seine eigene Meinung vor. Zum Schluss fragt er das Publikum, welche Gebäude für die Geschichte der Stadt wichtig sein könnten.",
    "questions": [
      {
        "id": "LOS6-FINAL-R01",
        "points": 2,
        "prompt": "Mitä Ben tut projektissa?",
        "answerKey": "Tutkii vanhan aseman historiaa."
      },
      {
        "id": "LOS6-FINAL-R02",
        "points": 2,
        "prompt": "Mistä hän löytää valokuvia?",
        "answerKey": "Kaupunginarkistosta."
      },
      {
        "id": "LOS6-FINAL-R03",
        "points": 2,
        "prompt": "Mitä asemarakennuksessa on nykyään?",
        "answerKey": "Näyttelytila."
      },
      {
        "id": "LOS6-FINAL-R04",
        "points": 2,
        "prompt": "Kuinka monta kuvaa hän valitsee?",
        "answerKey": "Kolme."
      },
      {
        "id": "LOS6-FINAL-R05",
        "points": 2,
        "prompt": "Mitä hän kysyy lopuksi?",
        "answerKey": "Mitkä rakennukset voisivat olla kaupungin historiassa tärkeitä."
      },
      {
        "id": "LOS6-FINAL-G01",
        "points": 2,
        "prompt": "Perfekt: Ich ___ die Ausstellung ___. (besuchen)",
        "answerKey": "habe … besucht"
      },
      {
        "id": "LOS6-FINAL-G02",
        "points": 2,
        "prompt": "Täydennä: Früher ___ das Gebäude klein.",
        "answerKey": "war"
      },
      {
        "id": "LOS6-FINAL-G03",
        "points": 2,
        "prompt": "Täydennä: Ich glaube, ___ das Museum wichtig ist.",
        "answerKey": "dass"
      },
      {
        "id": "LOS6-FINAL-G04",
        "points": 2,
        "prompt": "Käännä: Mielestäni taide on kiinnostavaa.",
        "answerKey": "Ich finde Kunst interessant."
      },
      {
        "id": "LOS6-FINAL-G05",
        "points": 2,
        "prompt": "Täydennä: zuerst, dann, ___ (viimeiseksi)",
        "answerKey": "zum Schluss"
      },
      {
        "id": "LOS6-FINAL-V01",
        "points": 1,
        "prompt": "Käännä suomeksi: die Ausstellung",
        "answerKey": "näyttely"
      },
      {
        "id": "LOS6-FINAL-V02",
        "points": 1,
        "prompt": "Käännä suomeksi: die Geschichte",
        "answerKey": "historia/tarina"
      },
      {
        "id": "LOS6-FINAL-V03",
        "points": 1,
        "prompt": "Käännä suomeksi: die Musik",
        "answerKey": "musiikki"
      },
      {
        "id": "LOS6-FINAL-V04",
        "points": 1,
        "prompt": "Käännä suomeksi: das Museum",
        "answerKey": "museo"
      },
      {
        "id": "LOS6-FINAL-V05",
        "points": 1,
        "prompt": "Käännä suomeksi: das Projekt",
        "answerKey": "projekti"
      }
    ],
    "writing": {
      "id": "LOS6-FINAL-W01",
      "points": 10,
      "prompt": "Kirjoita 110–140 sanan esittely kuvitteellisesta tai todellisesta kulttuurikohteesta ja sen merkityksestä. Käytä menneisyyttä, mielipidettä perusteluineen ja lähdemerkintää.",
      "rubric": "{“sisältö-ja-tehtävään-vastaaminen”: 4, “kielen-ymmärrettävyys-ja-tarkkuus”: 3, “sanasto-ja-opitut-rakenteet”: 2, “tekstin-jäsennys”: 1}"
    },
    "listeningDraft": {
      "script": "Für mein Kulturprojekt habe ich eine kleine Ausstellung in meiner Stadt besucht. Ich habe mir drei Bilder angesehen und Notizen gemacht. Danach habe ich im Internet Informationen über die Künstlerin gesucht. Zwei Websites haben ähnliche Angaben gemacht, aber eine Seite hatte kein Datum. In meiner Präsentation beschreibe ich zuerst die Bilder und erkläre danach meine Meinung. Am Ende nenne ich meine Quellen.",
      "questions": [
        {
          "id": "LOS6-FINAL-A01",
          "prompt": "Mitä kertoja teki näyttelyssä?",
          "answerKey": "Katsoi kolme kuvaa ja teki muistiinpanoja."
        },
        {
          "id": "LOS6-FINAL-A02",
          "prompt": "Mitä yhden verkkosivun tiedoista puuttui?",
          "answerKey": "Päivämäärä."
        },
        {
          "id": "LOS6-FINAL-A03",
          "prompt": "Mitä hän tekee esityksen lopussa?",
          "answerKey": "Mainitsee lähteet."
        }
      ],
      "mediaApproved": false
    }
  },
  "LOS7-MID": {
    "id": "LOS7-MID",
    "bookId": 7,
    "kind": "midterm",
    "readingText": "Lisa lernt gern Sprachen und arbeitet sorgfältig. Für ein Schulprojekt muss sie einen kleinen Vortrag halten. Sie plant zuerst die wichtigsten Punkte und liest danach zwei kurze Texte. Wenn sie eine Information nicht versteht, fragt sie nach. Ihr Freund David interessiert sich eher für Technik. Er besucht am Wochenende eine Ausbildungsmesse. Dort spricht er mit drei Menschen über ihre Berufe. Am Montag vergleichen Lisa und David ihre Erfahrungen. Beide möchten später etwas lernen, das zu ihren Interessen passt. Sie wissen noch nicht genau, welche Ausbildung oder welches Studium sie wählen werden.",
    "questions": [
      {
        "id": "LOS7-MID-R01",
        "points": 2,
        "prompt": "Mistä Lisa pitää?",
        "answerKey": "Kielten opiskelusta."
      },
      {
        "id": "LOS7-MID-R02",
        "points": 2,
        "prompt": "Mitä Lisa valmistelee?",
        "answerKey": "Pientä esitelmää."
      },
      {
        "id": "LOS7-MID-R03",
        "points": 2,
        "prompt": "Mikä kiinnostaa Davidia?",
        "answerKey": "Tekniikka."
      },
      {
        "id": "LOS7-MID-R04",
        "points": 2,
        "prompt": "Missä David käy viikonloppuna?",
        "answerKey": "Koulutusmessuilla."
      },
      {
        "id": "LOS7-MID-R05",
        "points": 2,
        "prompt": "Tietävätkö he jo lopullisen opintosuuntansa?",
        "answerKey": "Eivät."
      },
      {
        "id": "LOS7-MID-G01",
        "points": 2,
        "prompt": "Käännä: Osaan puhua saksaa.",
        "answerKey": "Ich kann Deutsch sprechen."
      },
      {
        "id": "LOS7-MID-G02",
        "points": 2,
        "prompt": "Täydennä: Ich ___ morgen lernen. (müssen)",
        "answerKey": "muss"
      },
      {
        "id": "LOS7-MID-G03",
        "points": 2,
        "prompt": "Täydennä: Ich lerne, ___ ich eine Prüfung habe.",
        "answerKey": "weil"
      },
      {
        "id": "LOS7-MID-G04",
        "points": 2,
        "prompt": "Käännä: Haluaisin opiskella.",
        "answerKey": "Ich möchte studieren."
      },
      {
        "id": "LOS7-MID-G05",
        "points": 2,
        "prompt": "Käännä: Olen hyvä matematiikassa.",
        "answerKey": "Ich bin gut in Mathematik."
      },
      {
        "id": "LOS7-MID-V01",
        "points": 1,
        "prompt": "Käännä suomeksi: die Stärke",
        "answerKey": "vahvuus"
      },
      {
        "id": "LOS7-MID-V02",
        "points": 1,
        "prompt": "Käännä suomeksi: die Prüfung",
        "answerKey": "koe"
      },
      {
        "id": "LOS7-MID-V03",
        "points": 1,
        "prompt": "Käännä suomeksi: der Beruf",
        "answerKey": "ammatti"
      },
      {
        "id": "LOS7-MID-V04",
        "points": 1,
        "prompt": "Käännä suomeksi: die Ausbildung",
        "answerKey": "ammatillinen koulutus"
      },
      {
        "id": "LOS7-MID-V05",
        "points": 1,
        "prompt": "Käännä suomeksi: studieren",
        "answerKey": "opiskella yliopistossa"
      }
    ],
    "writing": {
      "id": "LOS7-MID-W01",
      "points": 10,
      "prompt": "Kirjoita 100–120 sanan esittely omista tai kuvitteellisen oppijan vahvuuksista ja tulevaisuuden ajatuksista. Kerro myös kaksi käytännön askelta.",
      "rubric": "{“sisältö-ja-tehtävään-vastaaminen”: 4, “kielen-ymmärrettävyys-ja-tarkkuus”: 3, “sanasto-ja-opitut-rakenteet”: 2, “tekstin-jäsennys”: 1}"
    },
    "listeningDraft": {
      "script": "Nächste Woche hat Lisa eine wichtige Prüfung. Sie möchte jeden Nachmittag dreißig Minuten lernen. Am Montag wiederholt sie Biologie, am Dienstag Mathematik. Mittwochs hat sie Musikunterricht. Deshalb lernt sie an diesem Tag am Morgen. Lisa möchte später vielleicht Medizin studieren, aber sie ist noch nicht sicher. Zuerst will sie gute Informationen über verschiedene Studiengänge sammeln.",
      "questions": [
        {
          "id": "LOS7-MID-A01",
          "prompt": "Mitä Lisa opiskelee maanantaina?",
          "answerKey": "Biologiaa."
        },
        {
          "id": "LOS7-MID-A02",
          "prompt": "Miksi hän opiskelee keskiviikkona aamulla?",
          "answerKey": "Hänellä on silloin musiikkitunti."
        },
        {
          "id": "LOS7-MID-A03",
          "prompt": "Mitä hän mahdollisesti haluaa opiskella myöhemmin?",
          "answerKey": "Lääketiedettä."
        }
      ],
      "mediaApproved": false
    }
  },
  "LOS7-FINAL": {
    "id": "LOS7-FINAL",
    "bookId": 7,
    "kind": "final",
    "readingText": "Emil sucht einen Ferienjob in einer Buchhandlung. Er liest die Anzeige sorgfältig. Gesucht wird eine freundliche Person, die am Wochenende helfen kann. Emil schreibt eine kurze Bewerbung. Er erklärt, dass er gern liest und zuverlässig ist. Einige Tage später bekommt er eine Einladung zu einem Gespräch. Im Gespräch stellt er sich vor und fragt nach den Arbeitszeiten. Als er eine Frage nicht versteht, bittet er höflich um Wiederholung. Nach dem Termin schreibt Emil seine Eindrücke auf. Er weiß noch nicht, ob er die Stelle bekommt. Trotzdem ist er zufrieden, weil er wichtige Erfahrungen gesammelt hat.",
    "questions": [
      {
        "id": "LOS7-FINAL-R01",
        "points": 2,
        "prompt": "Mihin Emil hakee töihin?",
        "answerKey": "Kirjakauppaan."
      },
      {
        "id": "LOS7-FINAL-R02",
        "points": 2,
        "prompt": "Milloin työssä pitäisi pystyä auttamaan?",
        "answerKey": "Viikonloppuisin."
      },
      {
        "id": "LOS7-FINAL-R03",
        "points": 2,
        "prompt": "Mitä Emil kertoo hakemuksessa vahvuudekseen?",
        "answerKey": "Pitää lukemisesta ja on luotettava."
      },
      {
        "id": "LOS7-FINAL-R04",
        "points": 2,
        "prompt": "Mitä hän kysyy haastattelussa?",
        "answerKey": "Työajoista."
      },
      {
        "id": "LOS7-FINAL-R05",
        "points": 2,
        "prompt": "Tietääkö Emil saako hän työn?",
        "answerKey": "Ei."
      },
      {
        "id": "LOS7-FINAL-G01",
        "points": 2,
        "prompt": "Käännä: Voisitteko toistaa kysymyksen?",
        "answerKey": "Könnten Sie die Frage bitte wiederholen?"
      },
      {
        "id": "LOS7-FINAL-G02",
        "points": 2,
        "prompt": "Täydennä: Ich ___ gern bei Ihnen arbeiten.",
        "answerKey": "würde"
      },
      {
        "id": "LOS7-FINAL-G03",
        "points": 2,
        "prompt": "Täydennä: Gestern ___ ich eine Bewerbung ___. (schreiben)",
        "answerKey": "habe … geschrieben"
      },
      {
        "id": "LOS7-FINAL-G04",
        "points": 2,
        "prompt": "Käännä: Aion hakea työtä.",
        "answerKey": "Ich werde mich um eine Stelle bewerben."
      },
      {
        "id": "LOS7-FINAL-G05",
        "points": 2,
        "prompt": "Täydennä: Ich bewerbe mich, ___ mich die Arbeit interessiert.",
        "answerKey": "weil"
      },
      {
        "id": "LOS7-FINAL-V01",
        "points": 1,
        "prompt": "Käännä suomeksi: die Bewerbung",
        "answerKey": "työhakemus"
      },
      {
        "id": "LOS7-FINAL-V02",
        "points": 1,
        "prompt": "Käännä suomeksi: die Stelle",
        "answerKey": "työpaikka"
      },
      {
        "id": "LOS7-FINAL-V03",
        "points": 1,
        "prompt": "Käännä suomeksi: die Arbeitszeit",
        "answerKey": "työaika"
      },
      {
        "id": "LOS7-FINAL-V04",
        "points": 1,
        "prompt": "Käännä suomeksi: das Gespräch",
        "answerKey": "keskustelu/haastattelu"
      },
      {
        "id": "LOS7-FINAL-V05",
        "points": 1,
        "prompt": "Käännä suomeksi: das Praktikum",
        "answerKey": "harjoittelu"
      }
    ],
    "writing": {
      "id": "LOS7-FINAL-W01",
      "points": 10,
      "prompt": "Kirjoita 120–145 sanan hakemus tai tulevaisuussuunnitelma. Käytä muodollista puhuttelua tarvittaessa, mainitse vahvuudet ja perustelut sekä tarkista selkeä rakenne.",
      "rubric": "{“sisältö-ja-tehtävään-vastaaminen”: 4, “kielen-ymmärrettävyys-ja-tarkkuus”: 3, “sanasto-ja-opitut-rakenteet”: 2, “tekstin-jäsennys”: 1}"
    },
    "listeningDraft": {
      "script": "Guten Tag, ich heiße Ben Weber. Ich bewerbe mich um ein Praktikum in Ihrer Buchhandlung. Ich lese gern und kann gut mit Menschen arbeiten. Letzten Sommer habe ich in einem Café gearbeitet. Dort habe ich gelernt, freundlich auf Kunden zu reagieren. Im Juni könnte ich vier Wochen bei Ihnen arbeiten. Ich würde mich über ein persönliches Gespräch freuen. Vielen Dank für Ihre Zeit.",
      "questions": [
        {
          "id": "LOS7-FINAL-A01",
          "prompt": "Minkä alan harjoittelua Ben hakee?",
          "answerKey": "Kirjakaupan."
        },
        {
          "id": "LOS7-FINAL-A02",
          "prompt": "Missä hän työskenteli viime kesänä?",
          "answerKey": "Kahvilassa."
        },
        {
          "id": "LOS7-FINAL-A03",
          "prompt": "Kuinka kauan hän voisi työskennellä kesäkuussa?",
          "answerKey": "Neljä viikkoa."
        }
      ],
      "mediaApproved": false
    }
  },
  "LOS8-MID": {
    "id": "LOS8-MID",
    "bookId": 8,
    "kind": "midterm",
    "readingText": "Auf einer Schulwebseite erscheint ein Bericht über eine neue Bibliothek. Der Text nennt den Eröffnungstag, den Ort und die Öffnungszeiten. In den sozialen Medien schreibt jemand dazu: „Das ist die beste Bibliothek der Welt!“ Die Klasse analysiert beide Aussagen. Der Bericht enthält Angaben, die überprüft werden können. Der Kommentar ist eine persönliche Bewertung. Mia sucht zusätzlich die offizielle Webseite der Bibliothek und vergleicht die Öffnungszeiten. Sie entdeckt einen Unterschied: Die Schulwebseite wurde vor zwei Monaten geschrieben, die offizielle Seite gestern aktualisiert. Deshalb notiert Mia das Datum der Informationen in ihrer Zusammenfassung.",
    "questions": [
      {
        "id": "LOS8-MID-R01",
        "points": 2,
        "prompt": "Mistä raportti kertoo?",
        "answerKey": "Uudesta kirjastosta."
      },
      {
        "id": "LOS8-MID-R02",
        "points": 2,
        "prompt": "Mitkä tiedot raportti antaa?",
        "answerKey": "Avauspäivä, paikka ja aukioloajat."
      },
      {
        "id": "LOS8-MID-R03",
        "points": 2,
        "prompt": "Mikä on mielipide?",
        "answerKey": "Väite että kirjasto olisi maailman paras."
      },
      {
        "id": "LOS8-MID-R04",
        "points": 2,
        "prompt": "Mistä Mia tarkistaa aukioloajat?",
        "answerKey": "Kirjaston virallisilta sivuilta."
      },
      {
        "id": "LOS8-MID-R05",
        "points": 2,
        "prompt": "Mikä selittää eron tiedoissa?",
        "answerKey": "Julkaisujen erilaiset päivitysajankohdat."
      },
      {
        "id": "LOS8-MID-G01",
        "points": 2,
        "prompt": "Käännä: Luulen, että teksti on vanha.",
        "answerKey": "Ich glaube, dass der Text alt ist."
      },
      {
        "id": "LOS8-MID-G02",
        "points": 2,
        "prompt": "Täydennä: Ich lese den Text, ___ ich Informationen suche.",
        "answerKey": "weil"
      },
      {
        "id": "LOS8-MID-G03",
        "points": 2,
        "prompt": "Käännä: Tämä on mielipide.",
        "answerKey": "Das ist eine Meinung."
      },
      {
        "id": "LOS8-MID-G04",
        "points": 2,
        "prompt": "Täydennä: ___ dem Bericht ist die Bibliothek heute geöffnet. (mukaan)",
        "answerKey": "Laut"
      },
      {
        "id": "LOS8-MID-G05",
        "points": 2,
        "prompt": "Käännä: En tiedä varmasti.",
        "answerKey": "Ich weiß es nicht genau."
      },
      {
        "id": "LOS8-MID-V01",
        "points": 1,
        "prompt": "Käännä suomeksi: die Nachricht",
        "answerKey": "uutinen"
      },
      {
        "id": "LOS8-MID-V02",
        "points": 1,
        "prompt": "Käännä suomeksi: die Quelle",
        "answerKey": "lähde"
      },
      {
        "id": "LOS8-MID-V03",
        "points": 1,
        "prompt": "Käännä suomeksi: die Meinung",
        "answerKey": "mielipide"
      },
      {
        "id": "LOS8-MID-V04",
        "points": 1,
        "prompt": "Käännä suomeksi: die Überschrift",
        "answerKey": "otsikko"
      },
      {
        "id": "LOS8-MID-V05",
        "points": 1,
        "prompt": "Käännä suomeksi: das Datum",
        "answerKey": "päivämäärä"
      }
    ],
    "writing": {
      "id": "LOS8-MID-W01",
      "points": 10,
      "prompt": "Kirjoita 110–135 sanan media-analyysi, jossa vertaat neutraalia uutistietoa ja mielipidettä. Kerro mitkä tiedot ovat tarkistettavia ja miten ne tarkistaisit.",
      "rubric": "{“sisältö-ja-tehtävään-vastaaminen”: 4, “kielen-ymmärrettävyys-ja-tarkkuus”: 3, “sanasto-ja-opitut-rakenteet”: 2, “tekstin-jäsennys”: 1}"
    },
    "listeningDraft": {
      "script": "Heute vergleichen wir zwei Online-Meldungen über einen neuen Park. Die erste Überschrift lautet: „Neuer Park in der Stadt eröffnet“. Der zweite Beitrag nennt den Park einen großen Erfolg. Im ersten Text finden wir ein Datum und die Adresse. Im zweiten steht keine Zahl zu den Besuchern. Wir möchten deshalb weitere Informationen auf der Website der Stadt suchen. Eine positive Meinung ist nicht automatisch ein falscher Bericht.",
      "questions": [
        {
          "id": "LOS8-MID-A01",
          "prompt": "Mistä kahdessa verkkotekstissä kerrotaan?",
          "answerKey": "Uudesta puistosta."
        },
        {
          "id": "LOS8-MID-A02",
          "prompt": "Mitä tietoja ensimmäisessä tekstissä on?",
          "answerKey": "Päivämäärä ja osoite."
        },
        {
          "id": "LOS8-MID-A03",
          "prompt": "Mistä ryhmä aikoo etsiä lisätietoa?",
          "answerKey": "Kaupungin verkkosivulta."
        }
      ],
      "mediaApproved": false
    }
  },
  "LOS8-FINAL": {
    "id": "LOS8-FINAL",
    "bookId": 8,
    "kind": "final",
    "readingText": "Eine Jugendgruppe untersucht, wie Schülerinnen und Schüler zur Schule kommen. Sie erstellt eine anonyme Umfrage und bekommt Antworten von hundert Personen. Manche fahren mit dem Bus, andere mit dem Fahrrad oder gehen zu Fuß. Die Gruppe schreibt einen sachlichen Bericht. In einem Kommentar sagt ein Mitglied: „Alle sollten mit dem Fahrrad kommen.“ Die anderen erinnern daran, dass nicht alle gleich weit entfernt wohnen. Deshalb formuliert die Gruppe eine vorsichtigere Empfehlung. In ihrem Medienbeitrag nennt sie die Zahl der Befragten und erklärt, wie die Informationen gesammelt wurden. Eine Lehrerin überprüft, ob die Zahlen und die Schlussfolgerungen zusammenpassen.",
    "questions": [
      {
        "id": "LOS8-FINAL-R01",
        "points": 2,
        "prompt": "Mitä ryhmä tutkii?",
        "answerKey": "Koulumatkustamisen tapoja."
      },
      {
        "id": "LOS8-FINAL-R02",
        "points": 2,
        "prompt": "Kuinka moni vastasi kyselyyn?",
        "answerKey": "100 henkilöä."
      },
      {
        "id": "LOS8-FINAL-R03",
        "points": 2,
        "prompt": "Mitä kulkutapoja mainitaan?",
        "answerKey": "Bussi, polkupyörä ja kävely."
      },
      {
        "id": "LOS8-FINAL-R04",
        "points": 2,
        "prompt": "Miksi kaikkien pyöräilyä ei pidetä hyvänä ehdottomana ohjeena?",
        "answerKey": "Matkojen pituudet eroavat."
      },
      {
        "id": "LOS8-FINAL-R05",
        "points": 2,
        "prompt": "Mitä opettaja tarkistaa?",
        "answerKey": "Vastaavatko numerot ja päätelmät toisiaan."
      },
      {
        "id": "LOS8-FINAL-G01",
        "points": 2,
        "prompt": "Täydennä: Ich finde den Vorschlag gut, ___ er praktisch ist.",
        "answerKey": "weil"
      },
      {
        "id": "LOS8-FINAL-G02",
        "points": 2,
        "prompt": "Käännä: Toisaalta kaikki eivät voi pyöräillä.",
        "answerKey": "Andererseits können nicht alle mit dem Fahrrad fahren."
      },
      {
        "id": "LOS8-FINAL-G03",
        "points": 2,
        "prompt": "Käännä: Lähteen mukaan sata ihmistä vastasi.",
        "answerKey": "Laut der Quelle haben hundert Menschen geantwortet."
      },
      {
        "id": "LOS8-FINAL-G04",
        "points": 2,
        "prompt": "Täydennä: Ich denke, ___ wir mehr Daten brauchen.",
        "answerKey": "dass"
      },
      {
        "id": "LOS8-FINAL-G05",
        "points": 2,
        "prompt": "Käännä: Tämän väitteen voi tarkistaa.",
        "answerKey": "Man kann diese Aussage überprüfen."
      },
      {
        "id": "LOS8-FINAL-V01",
        "points": 1,
        "prompt": "Käännä suomeksi: überprüfen",
        "answerKey": "tarkistaa"
      },
      {
        "id": "LOS8-FINAL-V02",
        "points": 1,
        "prompt": "Käännä suomeksi: die Umfrage",
        "answerKey": "kysely"
      },
      {
        "id": "LOS8-FINAL-V03",
        "points": 1,
        "prompt": "Käännä suomeksi: die Aussage",
        "answerKey": "väite"
      },
      {
        "id": "LOS8-FINAL-V04",
        "points": 1,
        "prompt": "Käännä suomeksi: die Tatsache",
        "answerKey": "tosiasia"
      },
      {
        "id": "LOS8-FINAL-V05",
        "points": 1,
        "prompt": "Käännä suomeksi: die Perspektive",
        "answerKey": "näkökulma"
      }
    ],
    "writing": {
      "id": "LOS8-FINAL-W01",
      "points": 10,
      "prompt": "Kirjoita 125–155 sanan uutismainen teksti tai lähdevertailu. Osoita faktan ja mielipiteen ero, käytä lähdeviittausta ja merkitse yksi avoimeksi jäävä kysymys.",
      "rubric": "{“sisältö-ja-tehtävään-vastaaminen”: 4, “kielen-ymmärrettävyys-ja-tarkkuus”: 3, “sanasto-ja-opitut-rakenteet”: 2, “tekstin-jäsennys”: 1}"
    },
    "listeningDraft": {
      "script": "Eine Schülergruppe erstellt einen Medienbeitrag über den Schulweg. Zuerst sammeln die Jugendlichen Informationen aus zwei Quellen. Dann sprechen sie mit drei Mitschülern über ihre Erfahrungen. Eine Person sagt, dass der Bus oft zu spät kommt. Die Gruppe möchte diese Aussage überprüfen und sucht nach offiziellen Fahrplandaten. Im fertigen Beitrag trennen sie persönliche Meinungen von überprüfbaren Angaben. Am Ende nennen sie die Quellen und das Datum.",
      "questions": [
        {
          "id": "LOS8-FINAL-A01",
          "prompt": "Mikä on mediaprojektin aihe?",
          "answerKey": "Koulumatka."
        },
        {
          "id": "LOS8-FINAL-A02",
          "prompt": "Kuinka monelta oppilaalta ryhmä kysyy kokemuksia?",
          "answerKey": "Kolmelta."
        },
        {
          "id": "LOS8-FINAL-A03",
          "prompt": "Mitä he tekevät bussin myöhästymistä koskevalle väitteelle?",
          "answerKey": "Tarkistavat sen virallisista aikataulutiedoista."
        }
      ],
      "mediaApproved": false
    }
  }
};

export function getLosFutureExam(bookId:number,kind:"midterm"|"final"):LosFutureExam|null{
  if(!Number.isInteger(bookId)||bookId<2||bookId>8)return null;
  return LOS_FUTURE_EXAMS[`LOS${bookId}-${kind==="midterm"?"MID":"FINAL"}`]??null;
}
