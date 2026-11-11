/** LOS! 1 EX-FINAL - 50 separately authored questions in each of two
 * independent forms. Exactly 12 listening, 10 reading, 10 vocabulary,
 * 10 morphology, and 8 everyday-situation points.
 *
 * "Listening" uses existing REAL human-recorded, source-licensed audio:
 * C01 M-COM-01 (Franz & Jörg), M-COM-03 (greetings list),
 * C02 M-COM-04 (Franz & Greta), C06 M-COM-06 (number list).
 * No fabricated interview audio, synthetic individual name clips or
 * external link-only text. Device-level playback QA remains a gate.
 *
 * Reading answers derive from the fully embedded, attributed authentic
 * C03/C04/C05/C06/C07/C10 German original texts, each with sources.
 * The two separate free writing pieces are saved, self-reviewed and
 * excluded from the 50 automatic points. This is a PRIVATE PREVIEW exam,
 * not a school grade, CEFR proof, or audio-verified final release.
 */
import type {Exercise} from "./model";
import type {ChapterTestDefinition} from "./chapterTest";
type AuthoredQuestion={q:string;options:[string,string,string];right:0|1|2;explanation:string};
type Group={key:string;titleFi:string;count:number;a:AuthoredQuestion[];b:AuthoredQuestion[]};
const GROUPS:Group[]=[
  {
    "key": "listening",
    "titleFi": "Puheenymmärtäminen",
    "count": 12,
    "a": [
      {
        "q": "Kuuntele C01:n Franz–Jörg-äänite. Kuka aloittaa puhumisen?",
        "options": [
          "Franz",
          "Jörg",
          "Greta"
        ],
        "right": 0,
        "explanation": "Franz avaa alkuperäisen keskustelun."
      },
      {
        "q": "Minkä nimen Jörg sanoo omaksi nimekseen C01:n äänitteessä?",
        "options": [
          "Berna",
          "Jörg",
          "Max"
        ],
        "right": 1,
        "explanation": "Jörg vastaa Ich heiße Jörg."
      },
      {
        "q": "Minkä ikäinen Franz kertoo olevansa puheessa?",
        "options": [
          "20",
          "30",
          "19"
        ],
        "right": 2,
        "explanation": "Franz kertoo olevansa neunzehn Jahre alt."
      },
      {
        "q": "Minkä sanan Jörg sanoo äänitteen viimeisessä repliikissä?",
        "options": [
          "Hallo!",
          "Tschüss!",
          "Guten Tag!"
        ],
        "right": 1,
        "explanation": "Viimeinen repliikki on Tschüss!"
      },
      {
        "q": "Minkä hyvästelyn Franz sanoo ennen Jörgin viimeistä repliikkiä?",
        "options": [
          "Bis später!",
          "Bis morgen!",
          "Auf Wiedersehen!"
        ],
        "right": 0,
        "explanation": "Franz sanoo Gut. Bis später!"
      },
      {
        "q": "Kuuntele M-COM-03-tervehdysluettelo. Mikä näistä on sen aivan ensimmäinen ilmaus?",
        "options": [
          "Guten Tag!",
          "Hallo!",
          "Gute Nacht!"
        ],
        "right": 1,
        "explanation": "Luettelo alkaa Hallo!-tervehdyksellä."
      },
      {
        "q": "Mikä äänitteen ilmaus tarkoittaa 'hyvää huomenta'?",
        "options": [
          "Guten Abend!",
          "Gute Nacht!",
          "Guten Morgen!"
        ],
        "right": 2,
        "explanation": "Guten Morgen! tarkoittaa hyvää huomenta."
      },
      {
        "q": "Mikä äänitetty ilmaus tarkoittaa 'hyvää iltaa'?",
        "options": [
          "Guten Abend!",
          "Gute Nacht!",
          "Guten Morgen!"
        ],
        "right": 0,
        "explanation": "Guten Abend! on iltatervehdys."
      },
      {
        "q": "Mikä M-COM-03:n lausuma ilmaus tarkoittaa 'nähdään pian'?",
        "options": [
          "Bis später!",
          "Bis bald!",
          "Bis gleich!"
        ],
        "right": 1,
        "explanation": "Bis bald! = nähdään pian."
      },
      {
        "q": "Kuuntele C02:n Franz–Greta-äänite. Minkä nimen Greta kertoo?",
        "options": [
          "Greta",
          "Lena",
          "Karla"
        ],
        "right": 0,
        "explanation": "Greta esittäytyy sanoilla Ich heiße Greta."
      },
      {
        "q": "Kenen nimen Greta kertoo opettajansa nimeksi C02:n äänitteessä?",
        "options": [
          "Herr Schmidt",
          "Herr Weiß",
          "Herr Standish"
        ],
        "right": 1,
        "explanation": "Greta sanoo er heißt Herr Weiß."
      },
      {
        "q": "Kuuntele C06:n erillinen numeroluettelo. Mikä näistä on ensimmäinen nauhoitettu lukusana?",
        "options": [
          "null",
          "eins",
          "zehn"
        ],
        "right": 1,
        "explanation": "Alkuperäinen äänite alkaa sanasta eins, ei null."
      }
    ],
    "b": [
      {
        "q": "C01:n Franz–Jörg-äänitteessä Franz esittää alussa minkä kysymyksen?",
        "options": [
          "Wie alt bist du?",
          "Wie heißt du?",
          "Woher kommst du?"
        ],
        "right": 1,
        "explanation": "Franz aloittaa: Hallo, wie heißt du?"
      },
      {
        "q": "C01:n nauhoitteessa kuka kysyy Wie alt bist du?",
        "options": [
          "Jörg",
          "Franz",
          "Greta"
        ],
        "right": 0,
        "explanation": "Jörg esittää ikäkysymyksen."
      },
      {
        "q": "Minkä saksankielisen iän Franz kertoo C01:ssä?",
        "options": [
          "zwanzig",
          "neunzehn",
          "achtzehn"
        ],
        "right": 1,
        "explanation": "Neunzehn on 19."
      },
      {
        "q": "Miten Jörg kertoo ikänsä C01:n nauhoitteessa?",
        "options": [
          "Ich bin dreißig.",
          "Ich bin neunzehn.",
          "Ich bin zwanzig."
        ],
        "right": 2,
        "explanation": "Jörg sanoo Ich bin zwanzig."
      },
      {
        "q": "Mitä Franz sanoo ennen C01-keskustelun loppua?",
        "options": [
          "Gut. Bis später!",
          "Auf Wiedersehen, bis morgen!",
          "Gute Nacht!"
        ],
        "right": 0,
        "explanation": "Franz päättää sanoin Gut. Bis später!."
      },
      {
        "q": "Mikä on M-COM-03-tervehdysluettelon viimeinen ilmaus?",
        "options": [
          "Bis später!",
          "Gute Nacht!",
          "Guten Abend!"
        ],
        "right": 1,
        "explanation": "Luettelo päättyy sanoihin Gute Nacht!."
      },
      {
        "q": "Mikä näistä on alkuperäisäänitteessä kuultava pohjoisen Saksan tervehdys?",
        "options": [
          "Bonjour!",
          "Moin!",
          "Ciao!"
        ],
        "right": 1,
        "explanation": "Moin! kuullaan alkuperäisessä luettelossa."
      },
      {
        "q": "Mikä puheen lausuma ilmaus vastaa 'hyvää päivää'?",
        "options": [
          "Gute Nacht!",
          "Bis bald!",
          "Guten Tag!"
        ],
        "right": 2,
        "explanation": "Guten Tag! tarkoittaa hyvää päivää."
      },
      {
        "q": "Mikä äänitteessä esiintyvä ilmaus on lyhyt hyvästely?",
        "options": [
          "Tschau!",
          "Guten Morgen!",
          "Wie heißt du?"
        ],
        "right": 0,
        "explanation": "Tschau! on luettelossa lausuttu hyvästely."
      },
      {
        "q": "Minkä vointikysymyksen Greta esittää C02:n äänitteessä?",
        "options": [
          "Wie geht's?",
          "Wie alt bist du?",
          "Wann?"
        ],
        "right": 0,
        "explanation": "Greta kysyy Wie geht's?."
      },
      {
        "q": "Minkä hyvästelyn Franz sanoo C02:n äänitteen loppupuolella?",
        "options": [
          "Bis bald!",
          "Bis dann!",
          "Gute Nacht!"
        ],
        "right": 1,
        "explanation": "Franz sanoo Bis dann!"
      },
      {
        "q": "Mikä on C06:n alkuperäisen numeroluettelon viimeinen sana?",
        "options": [
          "hundert",
          "neunzig",
          "tausend"
        ],
        "right": 2,
        "explanation": "Lopussa luetaan tausend (1000)."
      }
    ]
  },
  {
    "key": "reading",
    "titleFi": "Luetunymmärtäminen",
    "count": 10,
    "a": [
      {
        "q": "Lue Bernan oikea haastattelu C10 Text B:stä. Mitä kaupunkia hän mainitsee lähtöpaikakseen?",
        "options": [
          "München",
          "Kiel",
          "Wien"
        ],
        "right": 1,
        "explanation": "Berna sanoo Ich komme aus Kiel."
      },
      {
        "q": "Mikä maa on Bernan alkuperäishaastattelussa?",
        "options": [
          "Deutschland",
          "Finnland",
          "Schweiz"
        ],
        "right": 0,
        "explanation": "Berna sanoo Ich komme aus Deutschland."
      },
      {
        "q": "Mitä Berna kertoo iäkseen haastattelun aikaisena tietona?",
        "options": [
          "20",
          "50",
          "30"
        ],
        "right": 2,
        "explanation": "Ich bin 30 Jahre alt."
      },
      {
        "q": "Miten Herr Schmidt kuvaa itseään C04:n aidossa keskustelussa?",
        "options": [
          "Ich bin müde.",
          "Ich bin jung.",
          "Ich bin sechzehn."
        ],
        "right": 0,
        "explanation": "Schmidt kertoo olevansa väsynyt."
      },
      {
        "q": "Miten C04:n Herr Standish vastaa muodolliseen vointikysymykseen?",
        "options": [
          "Nicht so gut.",
          "Es geht mir gut.",
          "Ich heiße Greta."
        ],
        "right": 1,
        "explanation": "Standish voi hyvin."
      },
      {
        "q": "Mitä Heinrich ja Karl sanovat voinnistaan C05:n lähdedialogissa?",
        "options": [
          "Molemmat voivat hyvin.",
          "Molemmat ovat väsyneitä.",
          "Vain Karl voi huonosti."
        ],
        "right": 0,
        "explanation": "Molemmat vastaavat mir geht es gut."
      },
      {
        "q": "Mistä Harald Becker tulee C10 Text A:n alkuperäisen vastauksen mukaan?",
        "options": [
          "Kiel",
          "München",
          "Berlin"
        ],
        "right": 1,
        "explanation": "Ich komme ursprünglich aus München."
      },
      {
        "q": "Mikä kuvaa Haraldin ikätietoa oikein?",
        "options": [
          "Hän on tasan 50.",
          "Hän on 30.",
          "Hän on noin viisikymppinen."
        ],
        "right": 2,
        "explanation": "So um die fünfzig on arvio."
      },
      {
        "q": "Minkä nimen Franz tavaa Wikibooksin C07-puheludialogissa?",
        "options": [
          "Claudia Bolliger",
          "Greta Schneider",
          "Berna Meyer"
        ],
        "right": 0,
        "explanation": "Hän tavaa Claudia Bolliger."
      },
      {
        "q": "Miten Haraldin ja Bernan lähtökaupungit eroavat C10:n lähteissä?",
        "options": [
          "Molemmat ovat Kielistä.",
          "Harald Münchenistä, Berna Kielistä.",
          "Harald Kielistä, Berna Münchenistä."
        ],
        "right": 1,
        "explanation": "Harald tulee Münchenistä ja Berna Kielistä."
      }
    ],
    "b": [
      {
        "q": "Mikä on Bernan vastaus haastattelussa kysymykseen Woher kommst du?",
        "options": [
          "Ich komme aus Deutschland.",
          "Ich komme aus Finnland.",
          "Ich komme aus Wien."
        ],
        "right": 0,
        "explanation": "Berna kertoo tulevansa Saksasta."
      },
      {
        "q": "Missä Saksan alueessa Berna kertoo Kielin sijaitsevan?",
        "options": [
          "Bayern",
          "Sachsen",
          "Schleswig-Holstein"
        ],
        "right": 2,
        "explanation": "Hän mainitsee Schleswig-Holsteinin."
      },
      {
        "q": "Mitä väriä Berna kertoo suosivansa alkuperäishaastattelussa?",
        "options": [
          "Blau",
          "rot",
          "gelb"
        ],
        "right": 1,
        "explanation": "Berna sanoo lempivärinsä olevan punainen."
      },
      {
        "q": "Mikä on C04:n Herr Schmidtin oma vastaus vointikysymykseen?",
        "options": [
          "Nicht so gut. Ich bin müde.",
          "Sehr gut, danke!",
          "Ich heiße Schmidt."
        ],
        "right": 0,
        "explanation": "Schmidt ei voi kovin hyvin ja on väsynyt."
      },
      {
        "q": "Millä sanoilla Herr Standish lopettaa C04:n työpaikkakeskustelun?",
        "options": [
          "Hallo, bis gleich.",
          "Auf Wiedersehen, bis morgen.",
          "Gute Nacht!"
        ],
        "right": 1,
        "explanation": "Lähdedialogi päättyy Auf Wiedersehen, bis morgen."
      },
      {
        "q": "Miten C05:n Heinrich tervehtii ystäväänsä?",
        "options": [
          "Guten Tag, Karl.",
          "Guten Abend, Harald.",
          "Hallo, Greta."
        ],
        "right": 0,
        "explanation": "Heinrich sanoo Guten Tag, Karl."
      },
      {
        "q": "Mitä Harald Becker mainitsee olevan hänen lempivärinsä?",
        "options": [
          "Blau",
          "rot",
          "grün"
        ],
        "right": 0,
        "explanation": "Harald vastaa Blau."
      },
      {
        "q": "Mikä kaupunki on Haraldin kotipaikka hänen kertomansa mukaan?",
        "options": [
          "Hamburg",
          "Kiel",
          "München"
        ],
        "right": 2,
        "explanation": "Harald on alun perin Münchenistä."
      },
      {
        "q": "Miten C07:n lähteen tiedustelutyöntekijä pyytää tavaamista?",
        "options": [
          "Bitte buchstabieren Sie.",
          "Wie alt sind Sie?",
          "Bis Montag!"
        ],
        "right": 0,
        "explanation": "Lähde sisältää Bitte buchstabieren Sie."
      },
      {
        "q": "Kumpi lähdehaastateltava sanoo olevansa noin viisikymppinen?",
        "options": [
          "Berna",
          "Harald",
          "Molemmat"
        ],
        "right": 1,
        "explanation": "Harald käyttää ilmaisua so um die fünfzig."
      }
    ]
  },
  {
    "key": "vocabulary",
    "titleFi": "Sanasto",
    "count": 10,
    "a": [
      {
        "q": "Mitä 'Tschüss!' tarkoittaa?",
        "options": [
          "Hei hei!",
          "Hyvää huomenta!",
          "Hauska tutustua!"
        ],
        "right": 0,
        "explanation": "Tschüss! on hyvästely."
      },
      {
        "q": "Mitä 'noch einmal' tarkoittaa?",
        "options": [
          "eilen",
          "vielä kerran",
          "ylihuomenna"
        ],
        "right": 1,
        "explanation": "Noch einmal = vielä kerran."
      },
      {
        "q": "Mitä 'der Buchstabe' tarkoittaa?",
        "options": [
          "numero",
          "viikonpäivä",
          "kirjain"
        ],
        "right": 2,
        "explanation": "Buchstabe on kirjain."
      },
      {
        "q": "Mitä 'die Woche' tarkoittaa?",
        "options": [
          "viikko",
          "sana",
          "opettaja"
        ],
        "right": 0,
        "explanation": "Woche = viikko."
      },
      {
        "q": "Mitä 'langsamer' tarkoittaa?",
        "options": [
          "nopeammin",
          "hitaammin",
          "hiljaisemmin"
        ],
        "right": 1,
        "explanation": "Langsamer = hitaammin."
      },
      {
        "q": "Mitä 'ungefähr' tarkoittaa?",
        "options": [
          "tasan",
          "huomenna",
          "suunnilleen"
        ],
        "right": 2,
        "explanation": "Ungefähr = noin."
      },
      {
        "q": "Mitä 'die Frage' tarkoittaa?",
        "options": [
          "kysymys",
          "vastaus",
          "tervehdys"
        ],
        "right": 0,
        "explanation": "Frage on kysymys."
      },
      {
        "q": "Mitä 'Dienstag' tarkoittaa?",
        "options": [
          "torstai",
          "tiistai",
          "sunnuntai"
        ],
        "right": 1,
        "explanation": "Dienstag = tiistai."
      },
      {
        "q": "Mitä 'wir' tarkoittaa?",
        "options": [
          "sinä",
          "hän",
          "me"
        ],
        "right": 2,
        "explanation": "Wir = me."
      },
      {
        "q": "Mitä 'auf Deutsch' tarkoittaa?",
        "options": [
          "saksaksi",
          "saksalaiselta",
          "Saksasta"
        ],
        "right": 0,
        "explanation": "Auf Deutsch = saksaksi."
      }
    ],
    "b": [
      {
        "q": "Mikä on tavallisen epämuodollisen hyvästelyn merkitys sanassa 'Tschau!'?",
        "options": [
          "Mikä nimesi on?",
          "Moikka!",
          "Hyvää yötä!"
        ],
        "right": 1,
        "explanation": "Tschau! = moikka."
      },
      {
        "q": "Mitä 'Bitte langsamer' tarkoittaa?",
        "options": [
          "Hitaammin, kiitos.",
          "Vielä kerran, kiitos.",
          "Olkaa hyvä ja tavattakaa."
        ],
        "right": 0,
        "explanation": "Bitte langsamer = hitaammin, kiitos."
      },
      {
        "q": "Mikä on saksaksi 'puhelinnumero'?",
        "options": [
          "der Satz",
          "das Wort",
          "die Telefonnummer"
        ],
        "right": 2,
        "explanation": "Die Telefonnummer = puhelinnumero."
      },
      {
        "q": "Mikä on sanan 'gestern' suomennos?",
        "options": [
          "huomenna",
          "eilen",
          "tänään"
        ],
        "right": 1,
        "explanation": "Gestern = eilen."
      },
      {
        "q": "Mitä 'wiederholen' tarkoittaa?",
        "options": [
          "toistaa",
          "kirjoittaa",
          "tavata"
        ],
        "right": 0,
        "explanation": "Wiederholen = toistaa."
      },
      {
        "q": "Mitä 'Schön, dich kennenzulernen!' tarkoittaa?",
        "options": [
          "Näkemiin!",
          "Hauska tutustua!",
          "En ymmärrä."
        ],
        "right": 1,
        "explanation": "Schön, dich kennenzulernen! = mukava tutustua."
      },
      {
        "q": "Mikä on sanan 'die Antwort' merkitys?",
        "options": [
          "kirjain",
          "kysymys",
          "vastaus"
        ],
        "right": 2,
        "explanation": "Antwort = vastaus."
      },
      {
        "q": "Mikä viikonpäivä on 'Donnerstag'?",
        "options": [
          "torstai",
          "tiistai",
          "perjantai"
        ],
        "right": 0,
        "explanation": "Donnerstag = torstai."
      },
      {
        "q": "Minkä pronominin merkitys on 'hän (mies)'?",
        "options": [
          "sie",
          "wir",
          "er"
        ],
        "right": 2,
        "explanation": "Er = hän (mies)."
      },
      {
        "q": "Mitä 'auf Finnisch' tarkoittaa?",
        "options": [
          "suomeksi",
          "Suomessa",
          "suomalainen"
        ],
        "right": 0,
        "explanation": "Auf Finnisch = suomeksi."
      }
    ]
  },
  {
    "key": "grammar",
    "titleFi": "Muoto-oppi ja kielioppi",
    "count": 10,
    "a": [
      {
        "q": "Täydennä mielessäsi 'Ich ... Lena'.",
        "options": [
          "heißt",
          "heiße",
          "heißen"
        ],
        "right": 1,
        "explanation": "Ich heiße Lena."
      },
      {
        "q": "Valitse oikea verbimuoto: 'Du ... Max.'",
        "options": [
          "heißen",
          "heiße",
          "heißt"
        ],
        "right": 2,
        "explanation": "Du heißt Max."
      },
      {
        "q": "Mikä on kolmannen persoonan oikein muodostettu lause?",
        "options": [
          "Er kommt aus München.",
          "Er kommst aus München.",
          "Er komme aus München."
        ],
        "right": 0,
        "explanation": "Er kommt on kolmannen persoonan muoto."
      },
      {
        "q": "Mikä on Bernasta kertova oikein taivutettu lause?",
        "options": [
          "Sie kommst aus Kiel.",
          "Sie kommt aus Kiel.",
          "Sie kommen aus Kiel."
        ],
        "right": 1,
        "explanation": "Sie kommt kolmannessa persoonassa."
      },
      {
        "q": "Mikä on sein-verbin minämuoto?",
        "options": [
          "ist",
          "bist",
          "bin"
        ],
        "right": 2,
        "explanation": "Ich bin."
      },
      {
        "q": "Valitse kohtelias kysymys.",
        "options": [
          "Woher kommen Sie?",
          "Woher kommst Sie?",
          "Woher komme Sie?"
        ],
        "right": 0,
        "explanation": "Sie-teitittely: Woher kommen Sie?"
      },
      {
        "q": "Mikä ilmaus tarkoittaa 'maanantaina'?",
        "options": [
          "um Montag",
          "am Montag",
          "an Montag Uhr"
        ],
        "right": 1,
        "explanation": "Päivään liittyy am."
      },
      {
        "q": "Mikä ilmaus tarkoittaa 'kello viideltä'?",
        "options": [
          "am fünf Uhr",
          "an fünf Uhr",
          "um fünf Uhr"
        ],
        "right": 2,
        "explanation": "Tasaan viideltä: um fünf Uhr."
      },
      {
        "q": "Miten viikonpäivät alkavat saksan kirjoituksessa?",
        "options": [
          "Isolla kirjaimella",
          "Aina pienellä",
          "Vain sunnuntai isolla"
        ],
        "right": 0,
        "explanation": "Viikonpäivät ovat substantiiveja."
      },
      {
        "q": "Mitä 'Sie kommt aus Kiel.' tarkoittaa Berna-haastattelun yhteydessä?",
        "options": [
          "Te tulette Kielistä.",
          "Hän (nainen) on kotoisin Kielistä.",
          "Me tulemme Kielistä."
        ],
        "right": 1,
        "explanation": "Sie kommt = hän tulee, kommt ratkaisee persoonan."
      }
    ],
    "b": [
      {
        "q": "Mikä on oikea 'Minä olen Ben' -lause?",
        "options": [
          "Ich bist Ben.",
          "Ich bin Ben.",
          "Ich ist Ben."
        ],
        "right": 1,
        "explanation": "Ich bin Ben."
      },
      {
        "q": "Mikä on oikea tuttavallinen nimikysymys?",
        "options": [
          "Wie heißen du?",
          "Wie heiße du?",
          "Wie heißt du?"
        ],
        "right": 2,
        "explanation": "Wie heißt du?"
      },
      {
        "q": "Mikä on oikein muodostettu kolmannen persoonan nimilause?",
        "options": [
          "Er heißt Harald.",
          "Er heißen Harald.",
          "Er heiße Harald."
        ],
        "right": 0,
        "explanation": "Er heißt."
      },
      {
        "q": "Mikä on Bernan nimen oikea esittelymuoto?",
        "options": [
          "Sie heißen Berna.",
          "Sie heißt Berna.",
          "Sie heiße Berna."
        ],
        "right": 1,
        "explanation": "Sie heißt Berna."
      },
      {
        "q": "Mikä on kolmannen persoonan sein-verbi?",
        "options": [
          "bist",
          "bin",
          "ist"
        ],
        "right": 2,
        "explanation": "Er ist."
      },
      {
        "q": "Kohtelias nimen kysyminen onnistuu lauseella...",
        "options": [
          "Wie heißen Sie?",
          "Wie heißt Sie?",
          "Wie heißst Sie?"
        ],
        "right": 0,
        "explanation": "Wie heißen Sie? on oikein."
      },
      {
        "q": "Minkä valitset, kun haluat sanoa 'sunnuntaina'?",
        "options": [
          "um Sonntag",
          "am Sonntag",
          "in Sonntag"
        ],
        "right": 1,
        "explanation": "Am Sonntag."
      },
      {
        "q": "Mitä käytät tasatunnin kanssa?",
        "options": [
          "am vier Uhr",
          "auf vier Uhr",
          "um vier Uhr"
        ],
        "right": 2,
        "explanation": "Um vier Uhr."
      },
      {
        "q": "Mikä kirjoitusasu vastaa saksan substantiivia?",
        "options": [
          "Mittwoch",
          "mittwoch",
          "mittWoch"
        ],
        "right": 0,
        "explanation": "Mittwoch aloitetaan isolla."
      },
      {
        "q": "Mikä tulkinta lauseesta 'Woher kommen Sie?' on oikein?",
        "options": [
          "Hän (nainen) tulee mistä?",
          "Mistä Te olette kotoisin?",
          "Mistä minä olen kotoisin?"
        ],
        "right": 1,
        "explanation": "Kommen Sie? on teitittely."
      }
    ]
  },
  {
    "key": "situations",
    "titleFi": "Arkiset tilanteet",
    "count": 8,
    "a": [
      {
        "q": "Tapaat uuden tuttavan. Mikä on paras ensimmäinen repliikki?",
        "options": [
          "Hallo!",
          "Gute Nacht!",
          "Bis später!"
        ],
        "right": 0,
        "explanation": "Hallo! sopii alkuun."
      },
      {
        "q": "Haluat tietää kaverin nimen. Mitä kysyt?",
        "options": [
          "Wann?",
          "Wie heißt du?",
          "Wie alt ist sie?"
        ],
        "right": 1,
        "explanation": "Wie heißt du?"
      },
      {
        "q": "Haluat selvittää lähtömaan. Mikä auttaa?",
        "options": [
          "Wie geht's?",
          "Was bedeutet das?",
          "Woher kommst du?"
        ],
        "right": 2,
        "explanation": "Woher kommst du?"
      },
      {
        "q": "Kaveri kysyy vointia. Mikä on sopiva vastaus?",
        "options": [
          "Gut, danke.",
          "Ich heißen Paul.",
          "Woher Sie?"
        ],
        "right": 0,
        "explanation": "Gut, danke. on voinnin vastaus."
      },
      {
        "q": "Haluat kysyä ikää tutulta, mikä sopii?",
        "options": [
          "Wie schreibt man das?",
          "Wie alt bist du?",
          "Wie geht es dir?"
        ],
        "right": 1,
        "explanation": "Wie alt bist du?"
      },
      {
        "q": "Et kuule uutta nimeä oikein. Miten pyydät tavaamaan muodollisesti?",
        "options": [
          "Woher Sie?",
          "Gute Nacht!",
          "Bitte buchstabieren Sie."
        ],
        "right": 2,
        "explanation": "Bitte buchstabieren Sie."
      },
      {
        "q": "Et ymmärrä opetuksen lausetta. Mitä sanot?",
        "options": [
          "Ich verstehe nicht.",
          "Ich heiße Greta.",
          "Bis dann!"
        ],
        "right": 0,
        "explanation": "Ich verstehe nicht."
      },
      {
        "q": "Sovitte keksityn tapaamisen maanantaina kello kolmelta.",
        "options": [
          "um Montag am drei Uhr",
          "am Montag um drei Uhr",
          "am Montag drei"
        ],
        "right": 1,
        "explanation": "Am Montag um drei Uhr."
      }
    ],
    "b": [
      {
        "q": "Vieras opiskelija saapuu luokkaan. Millä tervehdit aamulla?",
        "options": [
          "Guten Morgen!",
          "Gute Nacht!",
          "Auf Wiedersehen!"
        ],
        "right": 0,
        "explanation": "Guten Morgen! on aamutervehdys."
      },
      {
        "q": "Kysyt kohteliaasti uuden opettajan nimeä.",
        "options": [
          "Wie heißt du?",
          "Wie heißen Sie?",
          "Wer bist du?"
        ],
        "right": 1,
        "explanation": "Wie heißen Sie?"
      },
      {
        "q": "Uusi opiskelija kysyy Woher kommst du?; vastaat lähtömaalla.",
        "options": [
          "Ich komme aus Finnland.",
          "Wie heißt du?",
          "Ich bin zwanzig."
        ],
        "right": 0,
        "explanation": "Ich komme aus Finnland."
      },
      {
        "q": "Kysyt aikuiselta kohteliaasti vointia.",
        "options": [
          "Wie geht es dir?",
          "Wie alt bist du?",
          "Wie geht es Ihnen?"
        ],
        "right": 2,
        "explanation": "Wie geht es Ihnen?"
      },
      {
        "q": "Kuvitteellinen 19-vuotias haluaa kertoa ikänsä.",
        "options": [
          "Ich heiße neunzehn.",
          "Ich bin neunzehn.",
          "Ich komme neunzehn."
        ],
        "right": 1,
        "explanation": "Ich bin neunzehn."
      },
      {
        "q": "Nimeä ei kuultu. Mikä ilmaus pyytää toistamaan?",
        "options": [
          "Noch einmal, bitte.",
          "Wie alt bist du?",
          "Bis morgen!"
        ],
        "right": 0,
        "explanation": "Noch einmal, bitte."
      },
      {
        "q": "Opettaja puhuu nopeasti. Miten pyydät hidastamaan?",
        "options": [
          "Bitte langsamer.",
          "Gute Nacht!",
          "Wann?"
        ],
        "right": 0,
        "explanation": "Bitte langsamer."
      },
      {
        "q": "Sovitte kohtaamisen tiistaina kello neljältä.",
        "options": [
          "um Dienstag am vier Uhr",
          "am Dienstag um vier Uhr",
          "am vier Dienstag"
        ],
        "right": 1,
        "explanation": "Am Dienstag um vier Uhr."
      }
    ]
  }
];
const base={version:"0.1.0",difficulty:"applied" as const,
 objectives:["L1-INT-01","L1-READ-01","L1-LISTEN-01","L1-PROD-01"]};
type Form="a"|"b";
function toExercises(form:Form):Exercise[]{
 let slot=0;
 return GROUPS.flatMap(group=>(form==="a"?group.a:group.b).map(item=>{
  slot++;
  return {...base,id:"los1-final-"+form+"-"+String(slot).padStart(2,"0"),
   type:"single-choice" as const,promptFi:item.q,explanationFi:item.explanation,
   options:item.options.map((label,index)=>({id:"option-"+index,label})),
   correctOptionId:"option-"+item.right};
 }));
}
export const LOS1_FINAL_FORM_A:Exercise[]=toExercises("a");
export const LOS1_FINAL_FORM_B:Exercise[]=toExercises("b");
const slice=(from:number,to:number)=>LOS1_FINAL_FORM_A.slice(from,to).map(item=>item.id);
export const LOS1_FINAL_TEST:ChapterTestDefinition={
 id:"los1-final-exam",version:"0.1.0",chapterId:"EX-FINAL",examType:"final",
 title:"LOS! 1 · Loppukoe · 50 pisteen harjoitusversio",
 introductoryFi:"Loppukokeessa on 50 automaattisesti tarkistettavaa osatehtävää, "
  +"joista 12 perustuu oikeiden ihmisten alkuperäisiin äänitteisiin, 10 aitoihin "
  +"kokonaisiin lukijassa oleviin lähdeteksteihin, 10 sanastoon, 10 muotoihin ja "
  +"8 arkisiin tilanteisiin. Käytä ensin alla olevia alkuperäisiä soittimia. "
  +"Jos ääni ei toimi puhelimessasi tai tietokoneessasi, kuunteluosa ei ole "
  +"luotettavasti suoritettavissa. Äänimediat odottavat loppu-QA:ta. "
  +"Kirjoita lisäksi 5–7 erillistä virkettä sisältävä viesti ja 6–8 repliikin "
  +"kuvitteellinen keskustelu. Molemmat palautetaan erillisinä, säilytetään "
  +"yrityshistoriassa ja arvioidaan vain itse. Koko koe on edelleen esikatselu, "
  +"ei lukion arvosana eikä virallinen CEFR-todistus.",
 exerciseIds:LOS1_FINAL_FORM_A.map(item=>item.id),
 alternativeExerciseIds:LOS1_FINAL_FORM_B.map(item=>item.id),
 scoreGroups:[
  {id:"listening",titleFi:"Puheenymmärtäminen",exerciseIds:slice(0,12)},
  {id:"reading",titleFi:"Luetunymmärtäminen",exerciseIds:slice(12,22)},
  {id:"vocabulary",titleFi:"Sanasto",exerciseIds:slice(22,32)},
  {id:"grammar",titleFi:"Muoto-oppi ja kielioppi",exerciseIds:slice(32,42)},
  {id:"situations",titleFi:"Arkiset tilanteet",exerciseIds:slice(42,50)},
 ],
 listeningBlockIds:[
  "los1-c01-m-com-01-audio",
  "los1-c01-m-com-03-audio",
  "los1-c02-wb-original-audio",
  "los1-c06-m-com-06-numbers-audio",
 ],
 selfAssessmentMode:"writing",
 requiredWritingLines:5,maximumWritingLines:7,
 writingPromptFi:"Kirjoita 5–7 VIRKETTÄ, kukin omalle rivilleen. "
  +"Keksi henkilöt ja kerro, kuka olet, mistä olet kotoisin, mitä kuuluu, "
  +"kenet esittelet (er/sie) ja mihin viikonpäivään ja tasatuntiin "
  +"sovitte tapaamisen. Käytä oman mielikuvituksen tietoja, älä oikeita puhelinnumeroita.",
 writingModelDe:"Hallo! Ich heiße Lena.\nIch komme aus Finnland.\nMir geht es gut.\nDas ist Ben. Er kommt aus Deutschland.\nAm Freitag um vier Uhr?\nBis Freitag!",
 writingModelFi:"Hei! Olen Lena.\nOlen kotoisin Suomesta.\nMinulle kuuluu hyvää.\nTämä on Ben. Hän tulee Saksasta.\nPerjantaina kello neljältä?\nNähdään perjantaina!",
 secondWritingPromptFi:"Kirjoita 6–8 ERILLISTÄ REPLIIKKIÄ omille riveilleen. "
  +"Tee fiktiivinen kohtaaminen: tervehdi, kerro nimet ja alkuperä, kysy vointia, "
  +"pyydä kerran toistamaan tai tavaamaan, sovi tapaamisen päivä ja tasatunti, "
  +"ja hyvästele. Tämä toinen teksti on erillinen viestistä ja tallennetaan "
  +"myös koehistoriaan. Äänitä halutessasi keskustelun oma harjoitus, mutta "
  +"älä väitä puheen tulevan automaattisesti pisteytetyksi.",
 secondWritingModelDe:"Mia: Guten Tag! Ich heiße Mia. Wie heißt du?\nPaul: Hallo! Ich heiße Paul.\nMia: Woher kommst du?\nPaul: Ich komme aus Finnland. Und du?\nMia: Aus Deutschland. Wie geht es dir?\nPaul: Gut, danke. Am Montag um drei Uhr?\nMia: Noch einmal, bitte. Am Montag um drei?\nPaul: Ja! Bis Montag!",
 secondWritingModelFi:"Mia: Päivää! Olen Mia. Mikä sinun nimesi on?\nPaul: Hei! Olen Paul.\nMia: Mistä olet kotoisin?\nPaul: Suomesta. Entä sinä?\nMia: Saksasta. Mitä sinulle kuuluu?\nPaul: Hyvää, kiitos. Maanantaina kolmelta?\nMia: Vielä kerran, kiitos. Maanantaina kolmelta?\nPaul: Kyllä! Nähdään maanantaina!",
 requiredSecondWritingLines:6,maximumSecondWritingLines:8,
 speechPromptFi:"Voit lausua kirjoittamasi kuvitteellisen 6–8 repliikin keskustelun "
  +"ääneen tai äänittää sen vain omalla laitteellasi. Se ei lisää pisteitä.",
 speechExampleDe:"Hallo! Ich heiße Lena. Noch einmal, bitte. Am Montag um drei Uhr?",
 speechCriteria:[
  {id:"message",title:"Kirjoitin viestin 5–7 erillisenä rivinä ja ymmärrän virkkeet."},
  {id:"conversation",title:"Kirjoitin keskustelun 6–8 repliikkinä ja mukana on viisi pyydettyä asiaa."},
  {id:"forms",title:"Käytin opittuja nimi-, alkuperä- ja aikailmauksia oikein."},
  {id:"speech",title:"Harjoittelin keskustelua myös ääneen tai tunnistan sen jatkoharjoitustarpeen."},
 ],
};
