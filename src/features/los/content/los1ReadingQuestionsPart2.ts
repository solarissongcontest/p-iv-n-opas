/** LOS! 1 contextual reading questions, chapters 06–10. Carefully match the instructional texts. */
export const LOS1_READING_QUESTIONS_PART2 = {
  "10": {
    "A": [
      {
        "kind": "choice",
        "prompt": "Kuka liittyy uutena opiskelijana kurssille?",
        "options": [
          "Mila",
          "Sofia",
          "Greta"
        ],
        "answerIndex": 0,
        "evidence": "Ich bin Mila.",
        "explanation": "Uusi henkilö esittäytyy Milana.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Mistä Mila on kotoisin?",
        "options": [
          "Saksasta Berliinistä",
          "Virosta Tallinnasta",
          "Ruotsista Tukholmasta"
        ],
        "answerIndex": 1,
        "evidence": "Ich komme aus Estland, aus Tallinn.",
        "explanation": "Estland on Viro, Tallinn on Tallinna.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Kuinka vanha Mila on?",
        "options": [
          "16",
          "17",
          "18"
        ],
        "answerIndex": 1,
        "evidence": "Ich bin siebzehn Jahre alt.",
        "explanation": "Siebzehn tarkoittaa 17.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Miksi Leon vitsailee Ainon aamun tervehdyksestä?",
        "options": [
          "Aino tervehti kerran aamulla hyvää iltaa",
          "Aino ei muista nimeään",
          "Aino tavasi nimen väärin"
        ],
        "answerIndex": 0,
        "evidence": "Heute nicht „Guten Abend“?",
        "explanation": "Leon muistaa ensimmäisen päivän mokan.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Milloin Leon ehdottaa Milan kanssa tapaamista?",
        "options": [
          "Torstaina neljältä",
          "Perjantaina kolmelta",
          "Maanantaina yhdeksältä"
        ],
        "answerIndex": 0,
        "evidence": "hast du am Donnerstag um vier Uhr Zeit?",
        "explanation": "Leon kysyy, onko Milalla aikaa torstaina klo 16.",
        "skill": "detail"
      },
      {
        "kind": "open",
        "prompt": "Kirjoita Milan alkuperä ja ikä saksaksi kahdella tekstissä olevalla lauseella.",
        "modelAnswer": "Ich komme aus Estland, aus Tallinn. Ich bin siebzehn Jahre alt.",
        "evidence": "Ich komme aus Estland, aus Tallinn.",
        "explanation": "Teksti kertoo sekä lähtömaan että iän.",
        "skill": "evidence"
      },
      {
        "kind": "open",
        "prompt": "Miten Aino esittelee Milan opettajalle?",
        "modelAnswer": "Das ist Mila. Sie kommt aus Estland.",
        "evidence": "Das ist Mila. Sie kommt aus Estland.",
        "explanation": "Das ist ja Sie kommt ovat kolmannen henkilön esittelyfraaseja.",
        "skill": "evidence"
      },
      {
        "kind": "open",
        "prompt": "Mikä muutos Ainon kielitaidossa näkyy verrattuna ensimmäiseen kappaleeseen? Anna kaksi esimerkkiä.",
        "modelAnswer": "Aino osaa nyt kysyä nimeä, kotimaata ja ikää sekä sopia tapaamisesta.",
        "evidence": "Wie heißt du?",
        "explanation": "Esimerkiksi kysymykset Wie heißt du? ja Wie alt bist du? kuuluvat nyt hänen osaamiseensa.",
        "skill": "inference"
      }
    ],
    "B": [
      {
        "kind": "choice",
        "prompt": "Kuka on sähköpostin kirjoittaja?",
        "options": [
          "Aino",
          "Mila",
          "Sofia"
        ],
        "answerIndex": 1,
        "evidence": "Ich heiße Mila",
        "explanation": "Mila esittäytyy lähettäjäksi.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Kenelle sähköposti on osoitettu?",
        "options": [
          "Sofialle",
          "Frau Bergerille",
          "Leonille"
        ],
        "answerIndex": 0,
        "evidence": "Hallo Sofia!",
        "explanation": "Alkutervehdyksessä vastaanottajan nimi on Sofia.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Mitä Mila tekee Berliinissä?",
        "options": [
          "Opiskelee saksaa",
          "Etsii hotellia",
          "Työskentelee opettajana"
        ],
        "answerIndex": 0,
        "evidence": "Jetzt wohne ich in Berlin und lerne Deutsch.",
        "explanation": "Hän asuu Berliinissä ja opiskelee saksaa.",
        "skill": "detail"
      },
      {
        "kind": "open",
        "prompt": "Ketkä ovat Milan sähköpostin mukaan kurssilla neljän nimen luettelossa?",
        "modelAnswer": "Aino, Leon, Nora ja Selma.",
        "evidence": "Im Deutschkurs sind Aino, Leon, Nora und Selma.",
        "explanation": "Tekstissä mainitaan nämä neljä.",
        "skill": "evidence"
      },
      {
        "kind": "open",
        "prompt": "Millaisen avunpyynnön Mila osaa käyttää, jos hän ei ymmärrä?",
        "modelAnswer": "Noch einmal, bitte!",
        "evidence": "Noch einmal, bitte!",
        "explanation": "Mila kertoo pyytävänsä toistoa.",
        "skill": "evidence"
      }
    ],
    "C": [
      {
        "kind": "choice",
        "prompt": "Mikä ilmaus sopii, kun haluat kertoa ikäsi?",
        "options": [
          "Ich bin siebzehn Jahre alt.",
          "Wie heißt du?",
          "Gute Nacht!"
        ],
        "answerIndex": 0,
        "evidence": "Ich bin siebzehn Jahre alt.",
        "explanation": "Ikälauseessa käytetään bin ja Jahre alt.",
        "skill": "detail"
      },
      {
        "kind": "open",
        "prompt": "Muodosta neljän lauseen pieni oma esittely: nimi, kotimaa, ikä ja hyvästely.",
        "modelAnswer": "Ich heiße [nimi]. Ich komme aus [maa]. Ich bin [luku] Jahre alt. Tschüss!",
        "evidence": "Ich heiße Aino.",
        "explanation": "Tukiteksti antaa rungon, johon voi vaihtaa omat tiedot.",
        "skill": "transfer"
      }
    ]
  },
  "06": {
    "A": [
      {
        "kind": "choice",
        "prompt": "Kuinka vanha Aino on?",
        "options": [
          "16",
          "17",
          "18"
        ],
        "answerIndex": 1,
        "evidence": "Ich bin siebzehn Jahre alt.",
        "explanation": "Siebzehn tarkoittaa 17.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Kuinka vanha Nora on?",
        "options": [
          "16",
          "17",
          "18"
        ],
        "answerIndex": 0,
        "evidence": "Ich bin sechzehn.",
        "explanation": "Sechzehn tarkoittaa 16.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Kuka kertoo olevansa 18-vuotias?",
        "options": [
          "Aino",
          "Selma",
          "Leon"
        ],
        "answerIndex": 1,
        "evidence": "Und ich bin achtzehn Jahre alt.",
        "explanation": "Selma sanoo achtzehn.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Mitä lukuja Nora ja Selma ehdottavat opettajan iäksi?",
        "options": [
          "20 ja 21",
          "30 ja 40",
          "16 ja 17"
        ],
        "answerIndex": 1,
        "evidence": "Dreißig?",
        "explanation": "Nora sanoo dreißig (30), Selma vierzig (40).",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Miksi opettaja ei kerro ikäänsä?",
        "options": [
          "Hän ei ymmärrä kysymystä",
          "Hän sanoo sen olevan salaisuus",
          "Hän poistuu luokasta"
        ],
        "answerIndex": 1,
        "evidence": "Das ist ein Geheimnis!",
        "explanation": "Geheimnis tarkoittaa salaisuutta.",
        "skill": "detail"
      },
      {
        "kind": "open",
        "prompt": "Kirjoita saksaksi Ainon koko ikälause.",
        "modelAnswer": "Ich bin siebzehn Jahre alt.",
        "evidence": "Ich bin siebzehn Jahre alt.",
        "explanation": "Ikä ilmaistaan sein-verbin avulla.",
        "skill": "evidence"
      },
      {
        "kind": "open",
        "prompt": "Etsi tekstistä kaksi erilaista 17-vuotiaan henkilön lausumaa.",
        "modelAnswer": "Aino: Ich bin siebzehn Jahre alt. Leon: Ich bin siebzehn!",
        "evidence": "Ich bin siebzehn!",
        "explanation": "Aino ja Leon kertovat kumpikin olevansa 17.",
        "skill": "evidence"
      },
      {
        "kind": "open",
        "prompt": "Mikä Ainon viimeinen, liioiteltu ikäarvaus on ja miksi se on vitsi?",
        "modelAnswer": "99 vuotta. Aino ehdottaa leikillään opettajan iäksi erittäin suurta lukua.",
        "evidence": "neunundneunzig!",
        "explanation": "Neunundneunzig on 99.",
        "skill": "evidence"
      }
    ],
    "B": [
      {
        "kind": "choice",
        "prompt": "Mikä luku liittyy vain yhteen kurssilaiseen: Noraan?",
        "options": [
          "siebzehn",
          "sechzehn",
          "achtzehn"
        ],
        "answerIndex": 1,
        "evidence": "Nora: sechzehn Jahre",
        "explanation": "Nora on 16.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Kuinka monta lueteltua oppilasta on 17-vuotiaita?",
        "options": [
          "Yksi",
          "Kaksi",
          "Kolme"
        ],
        "answerIndex": 1,
        "evidence": "Aino: siebzehn Jahre",
        "explanation": "Aino ja Leon ovat molemmat 17.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Mikä on opettajan ikä tämän kyselyn mukaan?",
        "options": [
          "40",
          "30",
          "Tuntematon"
        ],
        "answerIndex": 2,
        "evidence": "unbekannt!",
        "explanation": "Unbekannt tarkoittaa tuntematonta.",
        "skill": "detail"
      },
      {
        "kind": "open",
        "prompt": "Poimi kyselylomakkeen ikäkysymys saksaksi.",
        "modelAnswer": "Wie alt bist du?",
        "evidence": "Wie alt bist du?",
        "explanation": "Kysely alkaa ikää koskevalla kysymyksellä.",
        "skill": "evidence"
      },
      {
        "kind": "open",
        "prompt": "Kirjoita kyselystä oppilaiden nimet ja iät.",
        "modelAnswer": "Nora 16, Aino 17, Leon 17, Selma 18.",
        "evidence": "Selma: achtzehn Jahre",
        "explanation": "Tietoja on neljässä erillisessä rivissä.",
        "skill": "evidence"
      }
    ],
    "C": [
      {
        "kind": "choice",
        "prompt": "Mikä on oikea saksankielinen luku 17?",
        "options": [
          "siebenzehn",
          "siebzehn",
          "sechzehn"
        ],
        "answerIndex": 1,
        "evidence": "siebzehn",
        "explanation": "Sanan sieben loppu lyhenee yhdistelmässä.",
        "skill": "detail"
      },
      {
        "kind": "open",
        "prompt": "Miten saksaksi kysytään ikä ja vastataan olevansa 16-vuotias?",
        "modelAnswer": "Wie alt bist du? Ich bin sechzehn Jahre alt.",
        "evidence": "Ich bin siebzehn Jahre alt",
        "explanation": "Vaihtamalla luvun sama rakenne toimii 16-vuotiaallekin.",
        "skill": "transfer"
      }
    ]
  },
  "07": {
    "A": [
      {
        "kind": "choice",
        "prompt": "Mitä Leon tekee kappaleen alussa?",
        "options": [
          "Kirjoittaa kurssin nimilistaa",
          "Sopii tapaamista",
          "Ostaa kirjan"
        ],
        "answerIndex": 0,
        "evidence": "Leon kirjoittaa kurssin osallistujalistaa.",
        "explanation": "Tilannekuva kertoo, mitä Leon tekee.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Miten Ainon etunimi tavataan?",
        "options": [
          "E-I-N-O",
          "A-I-N-O",
          "A-N-I-O"
        ],
        "answerIndex": 1,
        "evidence": "A-I-N-O.",
        "explanation": "Ainon nimi alkaa A:lla.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Mikä on Ainon sukunimi?",
        "options": [
          "Laine",
          "Beck",
          "Lind"
        ],
        "answerIndex": 0,
        "evidence": "Laine. L-A-I-N-E.",
        "explanation": "Sukunimi tavataan L-A-I-N-E.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Minkä nimen Nora tavaa?",
        "options": [
          "Nora",
          "Selma",
          "Beck"
        ],
        "answerIndex": 2,
        "evidence": "B-E-C-K.",
        "explanation": "Nora tavaa oman sukunimensä Beck.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Mitä Selma sanoo, kun Leon tavaa hänen nimensä oikein?",
        "options": [
          "Nicht so gut!",
          "Perfekt!",
          "Bitte langsamer!"
        ],
        "answerIndex": 1,
        "evidence": "Perfekt!",
        "explanation": "Selma kehuu oikeaa tavausta.",
        "skill": "detail"
      },
      {
        "kind": "open",
        "prompt": "Etsi Leonin lause, jolla hän pyytää toistamaan hitaasti.",
        "modelAnswer": "Noch einmal, bitte. Langsam!",
        "evidence": "Noch einmal, bitte. Langsam!",
        "explanation": "Pyynnössä yhdistetään toisto ja hitaus.",
        "skill": "evidence"
      },
      {
        "kind": "open",
        "prompt": "Kirjoita saksaksi Ainon etu- ja sukunimen kirjaimet erillisinä kirjainjonoina.",
        "modelAnswer": "A-I-N-O ja L-A-I-N-E.",
        "evidence": "L – A – I – N – E.",
        "explanation": "Nimet tavataan kirjaimittain.",
        "skill": "evidence"
      },
      {
        "kind": "open",
        "prompt": "Mitä Aino tarkoittaa sanoessaan Leonin olevan heidän Wörterbuchinsa?",
        "modelAnswer": "Hän vitsailee Leonin osaavan nimet ja niiden kirjoitusasut hyvin.",
        "evidence": "du bist jetzt unser Wörterbuch!",
        "explanation": "Wörterbuch tarkoittaa sanakirjaa.",
        "skill": "evidence"
      }
    ],
    "B": [
      {
        "kind": "choice",
        "prompt": "Mikä on ilmoittautumislomakkeen etunimi?",
        "options": [
          "Nora",
          "Aino",
          "Selma"
        ],
        "answerIndex": 1,
        "evidence": "Vorname: Aino",
        "explanation": "Vorname tarkoittaa etunimeä.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Mikä on lomakkeen kaupunki?",
        "options": [
          "Berlin",
          "Wien",
          "Bern"
        ],
        "answerIndex": 0,
        "evidence": "Stadt: Berlin",
        "explanation": "Stadt tarkoittaa kaupunkia.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Mikä on lomakkeen ikä?",
        "options": [
          "16",
          "17",
          "18"
        ],
        "answerIndex": 1,
        "evidence": "Alter: 17",
        "explanation": "Alter tarkoittaa ikää.",
        "skill": "detail"
      },
      {
        "kind": "open",
        "prompt": "Poimi lomakkeesta sekä etu- että sukunimi.",
        "modelAnswer": "Aino Laine.",
        "evidence": "Nachname: Laine",
        "explanation": "Vorname ja Nachname yhdessä muodostavat nimen.",
        "skill": "evidence"
      },
      {
        "kind": "open",
        "prompt": "Miten etunimi tavataan lomakkeen loppuosassa?",
        "modelAnswer": "A-I-N-O.",
        "evidence": "Mein Vorname ist Aino: A-I-N-O.",
        "explanation": "Notiz-osio näyttää kirjainjonon.",
        "skill": "evidence"
      }
    ],
    "C": [
      {
        "kind": "choice",
        "prompt": "Mikä fraasi pyytää kohteliaasti tavaamaan?",
        "options": [
          "Wie geht’s?",
          "Bitte buchstabieren Sie.",
          "Ich bin müde."
        ],
        "answerIndex": 1,
        "evidence": "Bitte buchstabieren Sie.",
        "explanation": "Se on kohtelias tavaamispyyntö.",
        "skill": "detail"
      },
      {
        "kind": "open",
        "prompt": "Miksi nimen tavaamisessa ei riitä vain nimen lausuminen?",
        "modelAnswer": "Kuulija voi kuulla kirjaimet väärin; tavaaminen kertoo täsmällisen kirjoitusasun.",
        "evidence": "A – I – N – O",
        "explanation": "Tukiteksti erottaa kirjaimet ja niiden ääntämisen.",
        "skill": "evidence"
      }
    ]
  },
  "08": {
    "A": [
      {
        "kind": "choice",
        "prompt": "Mitä sanaa opettaja käsittelee ensin?",
        "options": [
          "langsam",
          "schnell",
          "morgen"
        ],
        "answerIndex": 1,
        "evidence": "Das erste Wort ist „schnell“.",
        "explanation": "Das erste Wort kertoo ensimmäisen sanan.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Mitä Aino sanoo, kun hän ei ymmärrä?",
        "options": [
          "Ich verstehe nicht.",
          "Bis morgen!",
          "Ich heiße Aino."
        ],
        "answerIndex": 0,
        "evidence": "Ich verstehe nicht.",
        "explanation": "Aino ilmaisee ymmärtämättömyytensä.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Mitä Selma pyytää?",
        "options": [
          "Uuden opettajan",
          "Toiston ja hitaamman puheen",
          "Lisää numeroita"
        ],
        "answerIndex": 1,
        "evidence": "Können Sie das bitte wiederholen?",
        "explanation": "Selma pyytää toistamaan ja myöhemmin hidastamaan.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Mikä sana on opettajan mukaan schnell-sanan vastakohta?",
        "options": [
          "nicht",
          "langsam",
          "siebzehn"
        ],
        "answerIndex": 1,
        "evidence": "Nicht langsam.",
        "explanation": "Langsam tarkoittaa hitaasti tai hidasta.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Mikä on Ainon lopun reaktio?",
        "options": [
          "Hän ei ymmärrä mitään",
          "Hän ymmärtää nyt",
          "Hän haluaa lähteä"
        ],
        "answerIndex": 1,
        "evidence": "Jetzt ist alles klar!",
        "explanation": "Aino sanoo kaiken olevan nyt selvää.",
        "skill": "detail"
      },
      {
        "kind": "open",
        "prompt": "Kirjoita Ainon kysymys, jossa hän tiedustelee sanan merkitystä.",
        "modelAnswer": "Was bedeutet „schnell“?",
        "evidence": "Was bedeutet „schnell“?",
        "explanation": "Was bedeutet kysyy merkitystä.",
        "skill": "evidence"
      },
      {
        "kind": "open",
        "prompt": "Etsi tekstistä Selman kaksi erilaista avunpyyntöä.",
        "modelAnswer": "Können Sie das bitte wiederholen? ja Bitte langsamer!",
        "evidence": "Bitte langsamer!",
        "explanation": "Toinen pyytää toistoa, toinen puhetta hitaammin.",
        "skill": "evidence"
      },
      {
        "kind": "open",
        "prompt": "Miten Frau Berger yrittää selittää schnell-sanan?",
        "modelAnswer": "Hän vertaa sitä sanaan langsam: Schnell! Nicht langsam.",
        "evidence": "Schnell! Nicht langsam. Schnell!",
        "explanation": "Opettaja käyttää vastakohtaa avuksi.",
        "skill": "evidence"
      }
    ],
    "B": [
      {
        "kind": "choice",
        "prompt": "Kenelle Aino kirjoittaa viestin?",
        "options": [
          "Selmalle",
          "Frau Bergerille",
          "Leonille"
        ],
        "answerIndex": 0,
        "evidence": "Hallo Selma!",
        "explanation": "Viestin vastaanottaja on Selma.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Mitkä kaksi uutta sanaa Aino mainitsee?",
        "options": [
          "Morgen ja Abend",
          "schnell ja langsam",
          "Tag ja Nacht"
        ],
        "answerIndex": 1,
        "evidence": "schnell** und **langsam",
        "explanation": "Viestissä mainitaan nopea ja hidas.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Miten Aino suhtautuu siihen, ettei ymmärrä aina kaikkea?",
        "options": [
          "Se on ongelma",
          "Se ei haittaa",
          "Hän jättää kurssin"
        ],
        "answerIndex": 1,
        "evidence": "Aber das ist kein Problem!",
        "explanation": "Hän sanoo, ettei asia ole ongelma.",
        "skill": "detail"
      },
      {
        "kind": "open",
        "prompt": "Kirjoita kaksi avunpyyntöä täsmälleen viestissä olevassa muodossa.",
        "modelAnswer": "Esimerkiksi Noch einmal, bitte! ja Bitte langsamer!",
        "evidence": "„Noch einmal, bitte!“",
        "explanation": "Avunpyyntöjä luetellaan kolme.",
        "skill": "evidence"
      },
      {
        "kind": "open",
        "prompt": "Mihin ajankohtaan Aino viittaa viestin lopussa?",
        "modelAnswer": "Huomiseen: Bis morgen!",
        "evidence": "Bis morgen!",
        "explanation": "Viestin päätös viittaa seuraavaan päivään.",
        "skill": "evidence"
      }
    ],
    "C": [
      {
        "kind": "choice",
        "prompt": "Millä ilmauksella pyydät puhumaan hitaammin?",
        "options": [
          "Bitte langsamer!",
          "Guten Abend!",
          "Freut mich!"
        ],
        "answerIndex": 0,
        "evidence": "Bitte langsamer!",
        "explanation": "Langsamer tarkoittaa hitaammin.",
        "skill": "detail"
      },
      {
        "kind": "open",
        "prompt": "Miten kysyt tuntemattoman sanan merkitystä ja pyydät sen tarvittaessa uudelleen?",
        "modelAnswer": "Was bedeutet das? Noch einmal, bitte!",
        "evidence": "Was bedeutet das?",
        "explanation": "Nämä ovat kaksi erillistä selviytymisfraasia.",
        "skill": "evidence"
      }
    ]
  },
  "09": {
    "A": [
      {
        "kind": "choice",
        "prompt": "Mikä viikonpäivä on tapahtumien alussa?",
        "options": [
          "Montag",
          "Freitag",
          "Donnerstag"
        ],
        "answerIndex": 0,
        "evidence": "Heute ist Montag.",
        "explanation": "Heute ist Montag tarkoittaa että tänään on maanantai.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Mitä Leon ehdottaa ensin?",
        "options": [
          "Tiistaita kolmelta",
          "Perjantaita viideltä",
          "Sunnuntaita kahdelta"
        ],
        "answerIndex": 0,
        "evidence": "Am Dienstag um drei Uhr.",
        "explanation": "Leon ehdottaa tiistaita kello kolmea.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Mille päivälle tapaaminen ensin alustavasti sopii?",
        "options": [
          "Keskiviikolle",
          "Sunnuntaille",
          "Torstaille"
        ],
        "answerIndex": 0,
        "evidence": "Mittwoch um drei Uhr.",
        "explanation": "Ensin alustavasti keskiviikko kolmelta.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Kuka ei pääse keskiviikkona?",
        "options": [
          "Leon",
          "Nora",
          "Aino"
        ],
        "answerIndex": 1,
        "evidence": "Ich habe leider keine Zeit.",
        "explanation": "Nora kertoo, ettei hänellä ole aikaa.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Mille päivälle ja kellonajalle tapaaminen lopulta sovitaan?",
        "options": [
          "Keskiviikko kello kolme",
          "Torstai kello neljä",
          "Tiistai kello kaksi"
        ],
        "answerIndex": 1,
        "evidence": "Donnerstag, vier Uhr.",
        "explanation": "Torstaina kello neljältä. Pelkkä vier Uhr ei yksin vahvista, onko kyse kello 4.00 vai 16.00.",
        "skill": "detail"
      },
      {
        "kind": "open",
        "prompt": "Kirjoita tekstistä kysymys, jolla Aino tiedustelee Leonin aikataulua.",
        "modelAnswer": "Wann hast du Zeit, Leon?",
        "evidence": "Wann hast du Zeit, Leon?",
        "explanation": "Wann kysyy milloin.",
        "skill": "evidence"
      },
      {
        "kind": "open",
        "prompt": "Miksi tapaaminen siirtyy keskiviikosta torstaihin?",
        "modelAnswer": "Nora ei pääse keskiviikkona, mutta torstai kello neljä sopii.",
        "evidence": "Ich habe leider keine Zeit.",
        "explanation": "Noran aikataulu muuttaa ryhmän suunnitelman.",
        "skill": "evidence"
      },
      {
        "kind": "open",
        "prompt": "Kirjoita lopullinen aika yhtenä saksankielisenä ilmauksena.",
        "modelAnswer": "Am Donnerstag um vier Uhr.",
        "evidence": "Donnerstag um vier Uhr?",
        "explanation": "Am kertoo päivän ja um kellonajan.",
        "skill": "transfer"
      }
    ],
    "B": [
      {
        "kind": "choice",
        "prompt": "Minkä päivän kohdalla on yhteinen tapaaminen?",
        "options": [
          "Dienstag",
          "Donnerstag",
          "Samstag"
        ],
        "answerIndex": 1,
        "evidence": "Donnerstag: Treffen mit Aino, Leon, Nora und Selma, vier Uhr",
        "explanation": "Torstain kohdalla on Treffen.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Mihin kellonaikaan Deutschkurs on maanantaina?",
        "options": [
          "Kello 9",
          "Kello 15",
          "Kello 16"
        ],
        "answerIndex": 0,
        "evidence": "Montag: Deutschkurs, neun Uhr",
        "explanation": "Kurssi alkaa yhdeksältä.",
        "skill": "detail"
      },
      {
        "kind": "choice",
        "prompt": "Mikä vaihtoehdoissa mainituista päivistä on merkitty vapaaksi?",
        "options": [
          "Mittwoch",
          "Donnerstag",
          "Sonntag"
        ],
        "answerIndex": 2,
        "evidence": "Sonntag: frei",
        "explanation": "Sunnuntain kohdalla lukee frei. Myös lauantai on kalenterissa vapaa.",
        "skill": "detail"
      },
      {
        "kind": "open",
        "prompt": "Kirjoita Noran viestistä loppuun vahvistettu tapaamisaika.",
        "modelAnswer": "Am Donnerstag um vier Uhr.",
        "evidence": "Das Treffen ist am Donnerstag um vier Uhr.",
        "explanation": "Noran viesti vahvistaa muutoksen.",
        "skill": "evidence"
      },
      {
        "kind": "open",
        "prompt": "Mitkä kolme päivää kalenterissa on merkitty Deutschkurs-merkinnällä?",
        "modelAnswer": "Montag, Mittwoch ja Freitag.",
        "evidence": "Freitag: Deutschkurs, neun Uhr",
        "explanation": "Aikataulusta löytyy kolme kurssipäivää.",
        "skill": "evidence"
      }
    ],
    "C": [
      {
        "kind": "choice",
        "prompt": "Mikä pieni sana tulee tavallisesti viikonpäivän edelle?",
        "options": [
          "um",
          "am",
          "aus"
        ],
        "answerIndex": 1,
        "evidence": "am Donnerstag",
        "explanation": "Am Montag tarkoittaa maanantaina.",
        "skill": "detail"
      },
      {
        "kind": "open",
        "prompt": "Kirjoita saksaksi 'torstaina kello neljältä' valmiina ilmauksena.",
        "modelAnswer": "am Donnerstag um vier Uhr",
        "evidence": "am Donnerstag um vier Uhr",
        "explanation": "Am ilmaisee päivän, um kellonajan.",
        "skill": "transfer"
      }
    ]
  }
} as const;
