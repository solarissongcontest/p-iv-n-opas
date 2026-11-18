/** LOS! 1 contextual reading questions, chapters 01–05. All questions are newly written against the current instructional texts. */
export const LOS1_READING_QUESTIONS_PART1 = {
  "01": {
    "A": [
      {
        "kind": "choice",
        "prompt": "Mitä Aino etsii kurssin alussa?",
        "options": [
          "Junaa",
          "Saksan kurssia",
          "Kahvilaa"
        ],
        "answerIndex": 1,
        "evidence": "Ist hier der Deutschkurs?",
        "explanation": "Aino kysyy, onko saksan kurssi täällä.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Kuka on Frau Berger?",
        "options": [
          "Opettaja",
          "Leonin äiti",
          "Uusi oppilas"
        ],
        "answerIndex": 0,
        "evidence": "Das ist Frau Berger, unsere Lehrerin.",
        "explanation": "Unsere Lehrerin tarkoittaa meidän opettajaamme.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Minkä tervehdyksen Aino valitsee vahingossa?",
        "options": [
          "Guten Tag!",
          "Gute Nacht!",
          "Guten Abend!"
        ],
        "answerIndex": 2,
        "evidence": "Guten Abend!",
        "explanation": "Aino sanoo hyvää iltaa aamulla.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Paljonko kello on Leonin mukaan?",
        "options": [
          "Yhdeksän",
          "Kaksitoista",
          "Kuusi"
        ],
        "answerIndex": 0,
        "evidence": "Es ist erst neun Uhr!",
        "explanation": "Neun Uhr tarkoittaa kello yhdeksää.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Miten Leon hyvästelee Ainon?",
        "options": [
          "Auf Wiedersehen!",
          "Bis morgen, Aino!",
          "Gute Nacht!"
        ],
        "answerIndex": 1,
        "evidence": "Bis morgen, Aino!",
        "explanation": "Bis morgen tarkoittaa huomiseen.",
        "skill": "detail"
      },
      {
        "kind": "open",
        "prompt": "Etsi ensimmäisestä keskustelusta Ainon kysymys, jolla hän etsii oikeaa kurssia. Kirjoita se saksaksi.",
        "modelAnswer": "Ist hier der Deutschkurs?",
        "evidence": "Ist hier der Deutschkurs?",
        "explanation": "Kysymys alkaa sanalla Ist ja päättyy kysymysmerkkiin.",
        "skill": "evidence"
      },
      {
        "kind": "open",
        "prompt": "Kenelle Aino sanoo hyvästit tuttavallisesti ja kenelle kohteliaasti? Kirjoita molemmat ilmaukset.",
        "modelAnswer": "Leonille: Tschüss, Leon! Opettajalle: Auf Wiedersehen, Frau Berger!",
        "evidence": "Tschüss, Leon!",
        "explanation": "Tuttavalle Tschüss, opettajalle Auf Wiedersehen sopii tähän tilanteeseen.",
        "skill": "evidence"
      },
      {
        "kind": "open",
        "prompt": "Miksi Leon hämmästyy ja mikä Ainon pitäisi sanoa?",
        "modelAnswer": "Aino sanoo Guten Abend aamulla. Oikea tervehdys on Guten Morgen.",
        "evidence": "Guten Abend? Es ist erst neun Uhr!",
        "explanation": "Leon huomauttaa, että kello on vasta yhdeksän.",
        "skill": "evidence"
      }
    ],
    "B": [
      {
        "kind": "choice",
        "prompt": "Mitä Frau Berger sanoo Ainolle aamulla?",
        "options": [
          "Guten Abend!",
          "Guten Morgen, Aino!",
          "Gute Nacht!"
        ],
        "answerIndex": 1,
        "evidence": "Guten Morgen, Aino!",
        "explanation": "Aamulla käytetään tässä Guten Morgen -tervehdystä.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Ketä Leon tervehtii iltapäivällä?",
        "options": [
          "Herr Weberiä",
          "Selmaa",
          "Noraa"
        ],
        "answerIndex": 0,
        "evidence": "Guten Tag, Herr Weber!",
        "explanation": "Puhuttelussa mainitaan Herr Weber.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Miten Aino tervehtii Selmaa illalla?",
        "options": [
          "Auf Wiedersehen!",
          "Hallo, Selma!",
          "Guten Morgen!"
        ],
        "answerIndex": 1,
        "evidence": "Hallo, Selma!",
        "explanation": "Rento Hallo sopii myös illalla.",
        "skill": "detail"
      },
      {
        "kind": "open",
        "prompt": "Miten Selma vastaa Ainon hyvän yön toivotukseen? Kirjoita koko vastaus.",
        "modelAnswer": "Gute Nacht! Bis morgen!",
        "evidence": "Gute Nacht! Bis morgen!",
        "explanation": "Selma yhdistää hyvän yön toivotuksen ja huomiseen asti hyvästelyn.",
        "skill": "evidence"
      },
      {
        "kind": "open",
        "prompt": "Etsi Text B:stä kaksi eri vuorokaudenaikaa ja niihin liittyvät tervehdykset.",
        "modelAnswer": "Esimerkiksi Am Morgen: Guten Morgen! ja Am Abend: Guten Abend!",
        "evidence": "Am Morgen:",
        "explanation": "Teksti on jaettu vuorokaudenaikojen mukaan.",
        "skill": "evidence"
      }
    ],
    "C": [
      {
        "kind": "choice",
        "prompt": "Mikä tervehdys sopii tavallisesti aamulla opettajalle?",
        "options": [
          "Gute Nacht!",
          "Guten Morgen!",
          "Auf Wiedersehen!"
        ],
        "answerIndex": 1,
        "evidence": "Guten Morgen!",
        "explanation": "Tukitekstin taulukko kertoo aamun tervehdyksen.",
        "skill": "detail"
      },
      {
        "kind": "open",
        "prompt": "Milloin sanotaan Gute Nacht eikä Guten Abend?",
        "modelAnswer": "Nukkumaan mentäessä tai illalla erotessa, ei aamun tai päivän tervehdyksenä.",
        "evidence": "Gute Nacht!",
        "explanation": "Gute Nacht on hyvän yön toivotus.",
        "skill": "evidence"
      }
    ]
  },
  "02": {
    "A": [
      {
        "kind": "choice",
        "prompt": "Kuka on uusi oppilas, johon Aino tutustuu?",
        "options": [
          "Selma",
          "Nora",
          "Mila"
        ],
        "answerIndex": 1,
        "evidence": "Ich heiße Nora.",
        "explanation": "Uusi tulokas esittäytyy Norana.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Miksi Nora kysyy Ainon nimen uudelleen?",
        "options": [
          "Hän haluaa varmistaa nimen",
          "Hän kysyy Ainon kotimaata",
          "Hän ei halua kertoa omaa nimeään"
        ],
        "answerIndex": 0,
        "evidence": "Wie heißt du noch mal?",
        "explanation": "Noch mal tarkoittaa uudelleen, eli Nora varmistaa kuulemansa.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Miten Aino tavaa etunimensä?",
        "options": [
          "E-I-N-O",
          "A-I-N-O",
          "A-I-M-O"
        ],
        "answerIndex": 1,
        "evidence": "A-I-N-O.",
        "explanation": "Nimi Aino tavataan kirjaimilla A-I-N-O.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Kenen nimeä Nora kysyy sanomalla Wer ist das?",
        "options": [
          "Leonin",
          "Milan",
          "Selman"
        ],
        "answerIndex": 0,
        "evidence": "Das ist Leon.",
        "explanation": "Aino vastaa esittelemällä Leonin.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Kuka on Frau Berger?",
        "options": [
          "Uusi vieras",
          "Opettaja",
          "Noran ystävä"
        ],
        "answerIndex": 1,
        "evidence": "Unsere Lehrerin?",
        "explanation": "Nora kysyy, onko Frau Berger heidän opettajansa.",
        "skill": "detail"
      },
      {
        "kind": "open",
        "prompt": "Etsi tekstistä kaksi erilaista tapaa kertoa oma nimi.",
        "modelAnswer": "Ich bin Aino. ja Ich heiße Nora.",
        "evidence": "Ich bin Aino.",
        "explanation": "Nimen voi kertoa joko bin- tai heiße-rakenteella.",
        "skill": "evidence"
      },
      {
        "kind": "open",
        "prompt": "Kirjoita saksaksi lause, jolla Aino esittelee Leonin.",
        "modelAnswer": "Das ist Leon.",
        "evidence": "Das ist Leon.",
        "explanation": "Das ist on käyttökelpoinen toisen henkilön esittely.",
        "skill": "evidence"
      },
      {
        "kind": "open",
        "prompt": "Miten Nora vastaa, kun Leon tarkistaa hänen nimensä?",
        "modelAnswer": "Genau!",
        "evidence": "Genau!",
        "explanation": "Genau tarkoittaa juuri niin, tässä nimi on oikein.",
        "skill": "evidence"
      }
    ],
    "B": [
      {
        "kind": "choice",
        "prompt": "Kuka kertoo olevansa uusi kurssilla?",
        "options": [
          "Selma",
          "Leon",
          "Aino"
        ],
        "answerIndex": 0,
        "evidence": "Ich bin neu hier.",
        "explanation": "Selma sanoo olevansa uusi täällä.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Kenen nimeä Selma kysyy?",
        "options": [
          "Noran",
          "Opettajan",
          "Ainon"
        ],
        "answerIndex": 1,
        "evidence": "Wie heißt unsere Lehrerin?",
        "explanation": "Selma kysyy, mikä opettajan nimi on.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Minkä nimen Nora antaa opettajalle?",
        "options": [
          "Frau Weber",
          "Frau Berger",
          "Frau Beck"
        ],
        "answerIndex": 1,
        "evidence": "Sie heißt Frau Berger.",
        "explanation": "Opettajan nimi on Frau Berger.",
        "skill": "detail"
      },
      {
        "kind": "open",
        "prompt": "Kirjoita chatista Ainon ensimmäinen esittäytymisviesti.",
        "modelAnswer": "Hallo zusammen! Ich heiße Aino.",
        "evidence": "Hallo zusammen! Ich heiße Aino.",
        "explanation": "Chatissa Aino esittäytyy heiße-rakenteella.",
        "skill": "evidence"
      },
      {
        "kind": "open",
        "prompt": "Millä ilmauksella keskustelu loppuu ja mitä se tarkoittaa?",
        "modelAnswer": "Bis morgen! = Huomiseen!",
        "evidence": "Bis morgen!",
        "explanation": "Viesti loppuu huomiseen-toivotukseen.",
        "skill": "evidence"
      }
    ],
    "C": [
      {
        "kind": "choice",
        "prompt": "Mikä on oikea du-persoonan muoto verbistä heißen?",
        "options": [
          "heiße",
          "heißt",
          "heiß"
        ],
        "answerIndex": 1,
        "evidence": "du heißt",
        "explanation": "Ich heiße ja du heißt ovat eri persoonamuotoja.",
        "skill": "detail"
      },
      {
        "kind": "open",
        "prompt": "Kirjoita yksi nimikysymys ja siihen sopiva oma vastaus.",
        "modelAnswer": "Wie heißt du? Ich heiße [oma nimi].",
        "evidence": "Wie heißt du?",
        "explanation": "Mallissa voi käyttää mitä tahansa kuvitteellista tai omaa etunimeä.",
        "skill": "evidence"
      }
    ]
  },
  "03": {
    "A": [
      {
        "kind": "choice",
        "prompt": "Mistä maasta Aino kertoo tulevansa?",
        "options": [
          "Saksasta",
          "Suomesta",
          "Ruotsista"
        ],
        "answerIndex": 1,
        "evidence": "Ich komme aus Finnland.",
        "explanation": "Finnland on Suomi.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Mistä maasta Selma on?",
        "options": [
          "Ruotsista",
          "Virosta",
          "Itävallasta"
        ],
        "answerIndex": 0,
        "evidence": "Ich komme aus Schweden, aus Stockholm.",
        "explanation": "Schweden tarkoittaa Ruotsia.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Missä Leon kertoo asuvansa?",
        "options": [
          "Bernissä",
          "Wienissä",
          "Berliinissä"
        ],
        "answerIndex": 2,
        "evidence": "Ich wohne hier in Berlin.",
        "explanation": "Leon asuu Berliinissä.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Mistä maasta Nora on Leonin mukaan?",
        "options": [
          "Itävallasta",
          "Saksasta",
          "Sveitsistä"
        ],
        "answerIndex": 1,
        "evidence": "Nora kommt auch aus Deutschland.",
        "explanation": "Nora on myös Saksasta.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Mistä Herr Weber on kotoisin?",
        "options": [
          "Wienistä Itävallasta",
          "Tallinnasta Virosta",
          "Bernistä Sveitsistä"
        ],
        "answerIndex": 0,
        "evidence": "Ja, aus Wien.",
        "explanation": "Aiemmassa repliikissä Leon sanoo hänen olevan Itävallasta.",
        "skill": "detail"
      },
      {
        "kind": "open",
        "prompt": "Kirjoita saksaksi Ainon vastaus kysymykseen Woher kommst du?",
        "modelAnswer": "Ich komme aus Finnland.",
        "evidence": "Ich komme aus Finnland.",
        "explanation": "Woher kysyy alkuperää.",
        "skill": "evidence"
      },
      {
        "kind": "open",
        "prompt": "Etsi saksankielinen lause, josta selviää Leonin asuinpaikka.",
        "modelAnswer": "Ich wohne hier in Berlin.",
        "evidence": "Ich wohne hier in Berlin.",
        "explanation": "Wohne ilmaisee asumista.",
        "skill": "evidence"
      },
      {
        "kind": "open",
        "prompt": "Mitä eroa on Selman kotimaalla ja kaupungilla?",
        "modelAnswer": "Maa on Ruotsi (Schweden), kaupunki Tukholma (Stockholm).",
        "evidence": "aus Schweden, aus Stockholm",
        "explanation": "Maa ja kaupunki mainitaan samassa lauseessa.",
        "skill": "evidence"
      }
    ],
    "B": [
      {
        "kind": "choice",
        "prompt": "Mikä on Thomas Weberin kotimaa?",
        "options": [
          "Sveitsi",
          "Itävalta",
          "Suomi"
        ],
        "answerIndex": 1,
        "evidence": "Ich komme aus Österreich, aus Wien.",
        "explanation": "Österreich tarkoittaa Itävaltaa.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Kuka esittäytyjistä on kotoisin Bernistä?",
        "options": [
          "Sofia Meier",
          "Aino Laine",
          "Selma Lind"
        ],
        "answerIndex": 0,
        "evidence": "Ich komme aus der Schweiz, aus Bern.",
        "explanation": "Sofian alkuperä on Sveitsi ja Bern.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Missä Aino sanoo asuvansa nyt?",
        "options": [
          "Berliinissä",
          "Tukholmassa",
          "Helsingissä"
        ],
        "answerIndex": 0,
        "evidence": "Ich wohne jetzt in Berlin.",
        "explanation": "Jetzt tarkoittaa nyt.",
        "skill": "detail"
      },
      {
        "kind": "open",
        "prompt": "Kirjoita Text B:n neljä maata suomeksi.",
        "modelAnswer": "Suomi, Ruotsi, Itävalta ja Sveitsi.",
        "evidence": "Ich komme aus der Schweiz, aus Bern.",
        "explanation": "Neljä esittelijää ilmoittaa oman kotimaansa.",
        "skill": "evidence"
      },
      {
        "kind": "open",
        "prompt": "Miten Sveitsistä tuleminen ilmaistaan eri tavalla kuin Suomesta tuleminen?",
        "modelAnswer": "aus der Schweiz, mutta aus Finnland.",
        "evidence": "aus der Schweiz",
        "explanation": "Sveitsin maan nimen kanssa esiintyy der.",
        "skill": "evidence"
      }
    ],
    "C": [
      {
        "kind": "choice",
        "prompt": "Mikä kysymyssana kysyy, mistä joku on kotoisin?",
        "options": [
          "Wo?",
          "Woher?",
          "Wann?"
        ],
        "answerIndex": 1,
        "evidence": "Woher?",
        "explanation": "Woher liittyy alkuperään.",
        "skill": "detail"
      },
      {
        "kind": "open",
        "prompt": "Aino asuu Berliinissä mutta on Suomesta. Kirjoita molemmat saksankieliset lauseet.",
        "modelAnswer": "Ich komme aus Finnland. Ich wohne in Berlin.",
        "evidence": "Ich wohne in Berlin.",
        "explanation": "Alkuperä kerrotaan komme aus -rakenteella, asuinpaikka wohne in -rakenteella.",
        "skill": "evidence"
      }
    ]
  },
  "04": {
    "A": [
      {
        "kind": "choice",
        "prompt": "Kuka saapuu kurssille vierailijaksi?",
        "options": [
          "Herr Weber",
          "Mila",
          "Sofia"
        ],
        "answerIndex": 0,
        "evidence": "Das ist Herr Weber aus Österreich.",
        "explanation": "Leon kertoo vierailijasta.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Miten Frau Berger tervehtii vierasta?",
        "options": [
          "Tschüss, Herr Weber!",
          "Guten Tag, Herr Weber!",
          "Hallo, du!"
        ],
        "answerIndex": 1,
        "evidence": "Guten Tag, Herr Weber!",
        "explanation": "Kohtelias päivätervehdys.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Mitä puhuttelumuotoa Leon suosittelee Ainolle?",
        "options": [
          "du",
          "Sie",
          "ihr"
        ],
        "answerIndex": 1,
        "evidence": "„Sie“. Herr Weber ist unser Gast.",
        "explanation": "Vierasta teititellään tässä tilanteessa.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Millä kysymyksellä Herr Weber kysyy Ainon nimen?",
        "options": [
          "Wie heißen Sie?",
          "Wie alt bist du?",
          "Wo wohnst du?"
        ],
        "answerIndex": 0,
        "evidence": "Wie heißen Sie?",
        "explanation": "Sie-puhuttelun yhteydessä muoto on heißen.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Miten Aino vastaa nimikysymykseen?",
        "options": [
          "Du heißt Aino.",
          "Sie kommen aus Finnland.",
          "Ich heiße Aino."
        ],
        "answerIndex": 2,
        "evidence": "Ich heiße Aino.",
        "explanation": "Ich heiße kertoo oman nimen.",
        "skill": "detail"
      },
      {
        "kind": "open",
        "prompt": "Etsi kaksi lyhyttä saksankielistä ilmausta, jotka osoittavat kohteliasta puhuttelua.",
        "modelAnswer": "Esimerkiksi Guten Tag, Herr Weber! ja Wie heißen Sie?",
        "evidence": "Guten Tag, Herr Weber!",
        "explanation": "Myös puhuttelusanat Herr ja Frau toimivat vihjeinä.",
        "skill": "evidence"
      },
      {
        "kind": "open",
        "prompt": "Miten vieras vastaa Frau Bergerin kuulumiskysymykseen?",
        "modelAnswer": "Auch gut, vielen Dank.",
        "evidence": "Auch gut, vielen Dank.",
        "explanation": "Auch gut tarkoittaa myös hyvää.",
        "skill": "evidence"
      },
      {
        "kind": "open",
        "prompt": "Mikä ero on Leonin ja Herr Weberin puhuttelussa Ainon näkökulmasta?",
        "modelAnswer": "Aino sinuttelee Leonia ja teitittelee vierasta Herr Weberiä.",
        "evidence": "sage ich „du“ oder „Sie“?",
        "explanation": "Suhde ja tilanne ohjaavat valintaa.",
        "skill": "evidence"
      }
    ],
    "B": [
      {
        "kind": "choice",
        "prompt": "Kenelle ensimmäinen viesti on osoitettu?",
        "options": [
          "Frau Bergerille",
          "Leonille",
          "Herr Weberille"
        ],
        "answerIndex": 1,
        "evidence": "Hallo Leon!",
        "explanation": "Alku on tuttavallinen ja nimeltä Leonille.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Miten toinen viesti alkaa?",
        "options": [
          "Hallo zusammen!",
          "Tschüss!",
          "Guten Tag, Herr Weber!"
        ],
        "answerIndex": 2,
        "evidence": "Guten Tag, Herr Weber!",
        "explanation": "Toinen viesti käyttää muodollisempaa tervehdystä.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Mitä Aino kysyy Leonilta?",
        "options": [
          "Mikä hänen ystävänsä nimi on",
          "Kuinka vanha Herr Weber on",
          "Missä Leon asuu"
        ],
        "answerIndex": 0,
        "evidence": "Wie heißt dein Freund?",
        "explanation": "Aino kysyy Leonin ystävän nimeä.",
        "skill": "detail"
      },
      {
        "kind": "open",
        "prompt": "Vertaa viestien allekirjoituksia: miten ensimmäinen ja toinen eroavat?",
        "modelAnswer": "Ensimmäisessä vain Aino, toisessa Aino Laine.",
        "evidence": "Aino Laine",
        "explanation": "Kohteliaammassa viestissä käytetään koko nimeä.",
        "skill": "evidence"
      },
      {
        "kind": "open",
        "prompt": "Kirjoita yksi täsmällinen kohtelias ilmaus toisesta viestistä.",
        "modelAnswer": "Esimerkiksi Guten Tag, Herr Weber! tai Mit freundlichen Grüßen.",
        "evidence": "Mit freundlichen Grüßen",
        "explanation": "Mit freundlichen Grüßen on kohtelias kirjallisen viestin lopetus.",
        "skill": "evidence"
      }
    ],
    "C": [
      {
        "kind": "choice",
        "prompt": "Mikä nimikysymys sopii kohteliaaseen puhutteluun?",
        "options": [
          "Wie heißt du?",
          "Wie heißen Sie?",
          "Wie heißen du?"
        ],
        "answerIndex": 1,
        "evidence": "Wie heißen Sie?",
        "explanation": "Sie on kohtelias puhuttelu ja verbi heißen.",
        "skill": "detail"
      },
      {
        "kind": "open",
        "prompt": "Miksi Sie kirjoitetaan isolla ja missä sitä käytetään?",
        "modelAnswer": "Se on kohtelias Te-puhuttelu, jota käytetään esimerkiksi vieraalle virallisessa tilanteessa.",
        "evidence": "Sie",
        "explanation": "Samaa kirjoitusasua ei pidä sekoittaa pieneen sie-pronominiin.",
        "skill": "evidence"
      }
    ]
  },
  "05": {
    "A": [
      {
        "kind": "choice",
        "prompt": "Kenen kuulumiset ovat alussa huonommat?",
        "options": [
          "Ainon",
          "Leonin",
          "Selman"
        ],
        "answerIndex": 1,
        "evidence": "Nicht so gut.",
        "explanation": "Leon kertoo, ettei hänellä mene kovin hyvin.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Miksi Leon ei voi hyvin?",
        "options": [
          "Hän on väsynyt",
          "Hän on eksynyt",
          "Hän ei ymmärrä kirjaa"
        ],
        "answerIndex": 0,
        "evidence": "Ich bin müde. Sehr müde.",
        "explanation": "Müde tarkoittaa väsynyttä.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Mitä Selma vastaa omista kuulumisistaan?",
        "options": [
          "Prima!",
          "Nicht so gut.",
          "Schlecht!"
        ],
        "answerIndex": 0,
        "evidence": "Prima!",
        "explanation": "Selma vastaa mainiosti.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Keneltä Frau Berger kysyy kuulumisia?",
        "options": [
          "Kurssilaisilta",
          "Vain Noralta",
          "Vain Herr Weberiltä"
        ],
        "answerIndex": 0,
        "evidence": "Guten Morgen zusammen! Wie geht’s?",
        "explanation": "Zusammen viittaa koko ryhmään.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Mitä Leon toivoo seuraavalta päivältä?",
        "options": [
          "Että hän tuntisi olonsa paremmaksi",
          "Että kurssi loppuisi",
          "Että hän matkustaisi"
        ],
        "answerIndex": 0,
        "evidence": "hoffentlich geht’s mir morgen besser!",
        "explanation": "Leon toivoo, että hänen olonsa olisi seuraavana päivänä parempi.",
        "skill": "detail"
      },
      {
        "kind": "open",
        "prompt": "Kirjoita saksaksi Ainon kohtelias vastaus kuulumiskysymykseen.",
        "modelAnswer": "Mir geht’s gut, danke.",
        "evidence": "Mir geht’s gut, danke.",
        "explanation": "Ilmauksella kerrotaan omista kuulumisista.",
        "skill": "evidence"
      },
      {
        "kind": "open",
        "prompt": "Miten Leon kuvailee vointiaan kahdella eri ilmauksella?",
        "modelAnswer": "Nicht so gut. Ich bin müde.",
        "evidence": "Ich bin müde. Sehr müde.",
        "explanation": "Ei niin hyvin ja olen väsynyt kuvaavat samaa tilannetta.",
        "skill": "evidence"
      },
      {
        "kind": "open",
        "prompt": "Mitä sana nicht muuttaa ilmauksessa nicht so gut?",
        "modelAnswer": "Se tekee ilmauksesta kielteisen: ei kovin hyvin.",
        "evidence": "Nicht so gut.",
        "explanation": "Nicht muuttaa hyvän voinnin huonommaksi.",
        "skill": "evidence"
      }
    ],
    "B": [
      {
        "kind": "choice",
        "prompt": "Kuka kirjoittaa olevansa väsynyt Text B:ssä?",
        "options": [
          "Aino",
          "Nora",
          "Leon"
        ],
        "answerIndex": 1,
        "evidence": "Ich bin müde.",
        "explanation": "Nora kertoo voinnistaan.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Miten Aino vastaa Noran huonoon vointiin?",
        "options": [
          "Oh nein! Gute Nacht, Nora!",
          "Sehr gut!",
          "Guten Morgen!"
        ],
        "answerIndex": 0,
        "evidence": "Oh nein! Gute Nacht, Nora!",
        "explanation": "Aino reagoi myötätuntoisesti ja toivottaa hyvää yötä.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Millä ilmauksella Nora kiittää?",
        "options": [
          "Freut mich!",
          "Danke.",
          "Wie heißt du?"
        ],
        "answerIndex": 1,
        "evidence": "Danke. Bis morgen!",
        "explanation": "Danke tarkoittaa kiitos.",
        "skill": "detail"
      },
      {
        "kind": "open",
        "prompt": "Minkä kuulumiskysymyksen Nora esittää?",
        "modelAnswer": "Wie geht’s?",
        "evidence": "Wie geht’s?",
        "explanation": "Se on arkinen kuulumiskysymys.",
        "skill": "evidence"
      },
      {
        "kind": "open",
        "prompt": "Millä ilmauksella molemmat hyvästelevät toisensa?",
        "modelAnswer": "Bis morgen!",
        "evidence": "Bis morgen!",
        "explanation": "Viesti loppuu huomiseen-toivotukseen.",
        "skill": "evidence"
      }
    ],
    "C": [
      {
        "kind": "choice",
        "prompt": "Mitä nicht so gut tarkoittaa?",
        "options": [
          "Ei kovin hyvin",
          "Erittäin hyvin",
          "Aina hyvin"
        ],
        "answerIndex": 0,
        "evidence": "Nicht so gut.",
        "explanation": "Nicht kieltää tai rajoittaa positiivista ilmusta.",
        "skill": "detail"
      },
      {
        "kind": "open",
        "prompt": "Kirjoita saksaksi kaksi erilaista vastausta kysymykseen Wie geht’s?.",
        "modelAnswer": "Esimerkiksi Mir geht’s gut. ja Nicht so gut.",
        "evidence": "Mir geht’s gut.",
        "explanation": "Kuulumisiin voi vastata myönteisesti tai kielteisesti.",
        "skill": "evidence"
      }
    ]
  }
} as const;
