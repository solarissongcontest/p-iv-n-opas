import type { LosFutureExerciseDraft } from "./losFutureExerciseTypes";
/** LOS! 3: 260 kirjakohtaista tehtävää; kielellinen ja arvioinnin tarkistus kesken. */
export const LOS_FUTURE_EXERCISES_3: Record<string, LosFutureExerciseDraft[]> = {
  "10": [
    {
      "id": "LOS3-C10-T01",
      "chapterId": "10",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Ein gemeinsamer Ausflug ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C10-T02",
      "chapterId": "10",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Mihin luokka lopulta päättää lähteä retkelle?",
      "answerKey": "Järvelle.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS3-C10-T03",
      "chapterId": "10",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Eva: Was wollen wir am Sonntag machen?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C10-T04",
      "chapterId": "10",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Mitä Jan tuo?",
      "answerKey": "Tarkka saksankielinen ilmaus: ich bringe Brot mit.\nMalliselitys: Leipää.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS3-C10-T05",
      "chapterId": "10",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: der Plan, die Idee, die Gruppe, organisieren.",
      "answerKey": "der Plan = suunnitelma; die Idee = idea; die Gruppe = ryhmä; organisieren = järjestää",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS3-C10-T06",
      "chapterId": "10",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: suunnitelma, idea, ryhmä, järjestää, tavata, viikonloppu.",
      "answerKey": "der Plan = suunnitelma; die Idee = idea; die Gruppe = ryhmä; organisieren = järjestää; treffen = tavata; das Wochenende = viikonloppu",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C10-T07",
      "chapterId": "10",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Am _____ können wir wandern.",
      "answerKey": "Sonntag",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS3-C10-T08",
      "chapterId": "10",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: sein. / Hause / zu / Uhr / acht / um / muss / Ich.",
      "answerKey": "Ich muss um acht Uhr zu Hause sein.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS3-C10-T09",
      "chapterId": "10",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Minun täytyy olla kotona kahdeksalta..",
      "answerKey": "Ich muss um acht Uhr zu Hause sein.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS3-C10-T10",
      "chapterId": "10",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Morgen wir können fahren. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Morgen können wir fahren.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS3-C10-T11",
      "chapterId": "10",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö modaaliverbien soveltaminen, ajanmääreet. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Modaaliverbin paikka pysyy samana riippumatta siitä, mikä modaaliverbi on kyseessä: Ich kann kommen, Ich will kommen, Ich muss kommen. Niiden merkitykset ovat eri. Kun lisäät ajanmääreen alkuun, taivutettu modaaliverbi tulee edelleen toiselle paikalle: Am Sonntag können wir kommen. Toiminnan perusmuoto säilyy lauseen lopussa.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C10-T12",
      "chapterId": "10",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Korjaa: Wir können besuchen das Museum.",
      "answerKey": "Wir können das Museum besuchen.",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS3-C10-T13",
      "chapterId": "10",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Sonntag: Treffpunkt Parkeingang 12:00. Bitte Wasser mitbringen.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Sonntag: Treffpunkt Parkeingang 12:00. Bitte Wasser mitbringen. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C10-T14",
      "chapterId": "10",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C10-T15",
      "chapterId": "10",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Am Sonntag können wir wandern. ja Willst du mitkommen?. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Am Sonntag können wir wandern. | Willst du mitkommen?. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS3-C10-T16",
      "chapterId": "10",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Am Sonntag können wir wandern.. Varmista, että kysymys sopii tilaisuuteen Ryhmä järjestää yhteisen ulkoilupäivän.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C10-T17",
      "chapterId": "10",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Ich muss um acht Uhr zu Hause sein. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C10-T18",
      "chapterId": "10",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Laadi ohjelma ja sovi sen toteutuksesta saksaksi. Kirjoita 4–6 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS3-C10-T19",
      "chapterId": "10",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Ryhmä järjestää yhteisen ulkoilupäivän. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Eva: Was wollen wir am Sonntag machen? / Jan: Wir können in den Park gehen.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS3-C10-T20",
      "chapterId": "10",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Korjaa: Wir können besuchen das Museum. (2) Mitä Jan tuo?",
      "answerKey": "(1) Wir können das Museum besuchen. (2) Leipää.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS3-C10-R01",
      "chapterId": "10",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Ein gemeinsamer Ausflug”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Die Klasse plant einen Ausflug.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C10-R02",
      "chapterId": "10",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Zuerst sammeln die Jugendlichen Ideen.",
      "answerKey": "Zuerst sammeln die Jugendlichen Ideen.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C10-R03",
      "chapterId": "10",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C10-R04",
      "chapterId": "10",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Valitse tekstistä kolme merkityksellistä sanaa tai ilmausta; älä poimi automaattisesti tekstin ensimmäistä sanaa tai henkilönnimeä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C10-R05",
      "chapterId": "10",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: modaaliverbien soveltaminen, ajanmääreet.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C10-R06",
      "chapterId": "10",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Die Klasse plant einen Ausflug.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "01": [
    {
      "id": "LOS3-C01-T01",
      "chapterId": "01",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Meine Freizeit ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C01-T02",
      "chapterId": "01",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Missä neljä ystävää lopulta tapaavat?",
      "answerKey": "Puistossa.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS3-C01-T03",
      "chapterId": "01",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Nora: Was machst du gern?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C01-T04",
      "chapterId": "01",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Mitä Finn tekee mielellään?",
      "answerKey": "Tarkka saksankielinen ilmaus: Ich lese gern und spiele Fußball.\nMalliselitys: Lukee ja pelaa jalkapalloa.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS3-C01-T05",
      "chapterId": "01",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: die Freizeit, das Hobby, spielen, lesen.",
      "answerKey": "die Freizeit = vapaa-aika; das Hobby = harrastus; spielen = pelata; lesen = lukea",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS3-C01-T06",
      "chapterId": "01",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: vapaa-aika, harrastus, pelata, lukea, kuunnella, maalata.",
      "answerKey": "die Freizeit = vapaa-aika; das Hobby = harrastus; spielen = pelata; lesen = lukea; hören = kuunnella; malen = maalata",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C01-T07",
      "chapterId": "01",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Ich _____ gern.",
      "answerKey": "lese",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS3-C01-T08",
      "chapterId": "01",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: Abend. / jeden / liest / Du.",
      "answerKey": "Du liest jeden Abend.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS3-C01-T09",
      "chapterId": "01",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Sinä luet joka ilta..",
      "answerKey": "Du liest jeden Abend.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS3-C01-T10",
      "chapterId": "01",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Du lest jeden Abend. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Du liest jeden Abend, sillä lesen saa tässä muodon liest.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS3-C01-T11",
      "chapterId": "01",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö gern ja preesensin kertaa; tavalliset epäsäännölliset. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Gern ja gerne ovat rinnakkaisia muotoja, joilla ilmaistaan mielellään tekemistä. Ich spiele gern Fußball ja Ich lese gerne ovat molemmat luontevia. Jos verbi on epäsäännöllinen, sen persoonamuoto pitää silti tarkistaa: du liest, er liest verbistä lesen. Opettele muutokset osana tavallisia ilmauksia, älä yritä muodostaa niitä pelkällä säännöllisellä päätteellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C01-T12",
      "chapterId": "01",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Täydennä: Er ___ gern. (lesen)",
      "answerKey": "liest",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS3-C01-T13",
      "chapterId": "01",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Freizeit: Lesen, Fußball, Musik hören. Neue Gruppe am Freitag.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Freizeit: Lesen, Fußball, Musik hören. Neue Gruppe am Freitag. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C01-T14",
      "chapterId": "01",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C01-T15",
      "chapterId": "01",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Ich lese gern. ja Wir spielen oft zusammen.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Ich lese gern. | Wir spielen oft zusammen.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS3-C01-T16",
      "chapterId": "01",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Ich lese gern.. Varmista, että kysymys sopii tilaisuuteen Ystävät vaihtavat kuulumisia harrastuksista.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C01-T17",
      "chapterId": "01",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Du liest jeden Abend. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C01-T18",
      "chapterId": "01",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Esittele kolme harrastusta tai vapaa-ajan valintaa. Kirjoita 4–6 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS3-C01-T19",
      "chapterId": "01",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Ystävät vaihtavat kuulumisia harrastuksista. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Nora: Was machst du gern? / Finn: Ich lese gern und spiele Fußball.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS3-C01-T20",
      "chapterId": "01",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Täydennä: Er ___ gern. (lesen) (2) Mitä Finn tekee mielellään?",
      "answerKey": "(1) liest (2) Lukee ja pelaa jalkapalloa.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS3-C01-R01",
      "chapterId": "01",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Meine Freizeit”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Was machst du gern in deiner Freizeit?",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C01-R02",
      "chapterId": "01",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Im Deutschkurs gibt es viele Antworten.",
      "answerKey": "Im Deutschkurs gibt es viele Antworten.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C01-R03",
      "chapterId": "01",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C01-R04",
      "chapterId": "01",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Valitse tekstistä kolme merkityksellistä sanaa tai ilmausta; älä poimi automaattisesti tekstin ensimmäistä sanaa tai henkilönnimeä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C01-R05",
      "chapterId": "01",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: gern ja preesensin kertaa; tavalliset epäsäännölliset.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C01-R06",
      "chapterId": "01",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Was machst du gern in deiner Freizeit?… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "02": [
    {
      "id": "LOS3-C02-T01",
      "chapterId": "02",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Mein Hobby ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C02-T02",
      "chapterId": "02",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Mitä soitinta Noah harjoittelee?",
      "answerKey": "Kitaraa.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS3-C02-T03",
      "chapterId": "02",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Lisa: Wie oft gehst du schwimmen?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C02-T04",
      "chapterId": "02",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Kuinka usein Oskar käy uimassa?",
      "answerKey": "Tarkka saksankielinen ilmaus: Zweimal pro Woche.\nMalliselitys: Kahdesti viikossa.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS3-C02-T05",
      "chapterId": "02",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: die Gitarre, fotografieren, sammeln, tanzen.",
      "answerKey": "die Gitarre = kitara; fotografieren = valokuvata; sammeln = keräillä; tanzen = tanssia",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS3-C02-T06",
      "chapterId": "02",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: kitara, valokuvata, keräillä, tanssia, piirtää, polkupyörä.",
      "answerKey": "die Gitarre = kitara; fotografieren = valokuvata; sammeln = keräillä; tanzen = tanssia; zeichnen = piirtää; das Fahrrad = polkupyörä",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C02-T07",
      "chapterId": "02",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Ich _____ manchmal.",
      "answerKey": "schwimme",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS3-C02-T08",
      "chapterId": "02",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: zusammen. / oft / spielen / Wir.",
      "answerKey": "Wir spielen oft zusammen.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS3-C02-T09",
      "chapterId": "02",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Pelaamme usein yhdessä..",
      "answerKey": "Wir spielen oft zusammen.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS3-C02-T10",
      "chapterId": "02",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Ich oft spiele Tennis. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Ich spiele oft Tennis. Tavallinen verbin paikka säilyy.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS3-C02-T11",
      "chapterId": "02",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö häufigkeitsadverbit, kysymyssanat. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Usein käytettyjä määrän ja toistuvuuden adverbeja ovat immer, oft, manchmal, selten ja nie. Tavallisessa väitelauseessa ne sijoittuvat usein taivutetun verbin jälkeen: Ich spiele oft Tennis. Kun aloitat ajanilmauksella, pidä verbi edelleen toisena: Am Wochenende spiele ich oft Tennis. Kysy harrastuksesta esimerkiksi Was machst du in deiner Freizeit?",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C02-T12",
      "chapterId": "02",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Mitä tarkoittaa Ich trainiere selten?",
      "answerKey": "Harjoittelen harvoin.",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS3-C02-T13",
      "chapterId": "02",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Fotoklub: Mittwoch 17 Uhr, Freitag 16 Uhr. Alle sind willkommen!. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Fotoklub: Mittwoch 17 Uhr, Freitag 16 Uhr. Alle sind willkommen! | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C02-T14",
      "chapterId": "02",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C02-T15",
      "chapterId": "02",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Ich schwimme manchmal. ja Am Samstag trainiere ich.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Ich schwimme manchmal. | Am Samstag trainiere ich.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS3-C02-T16",
      "chapterId": "02",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Ich schwimme manchmal.. Varmista, että kysymys sopii tilaisuuteen Harrastuskerhon esittely.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C02-T17",
      "chapterId": "02",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Wir spielen oft zusammen. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C02-T18",
      "chapterId": "02",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Tee harrastusesittely 5–7 lauseella. Kirjoita 4–6 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS3-C02-T19",
      "chapterId": "02",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Harrastuskerhon esittely. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Lisa: Wie oft gehst du schwimmen? / Oskar: Zweimal pro Woche.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS3-C02-T20",
      "chapterId": "02",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Mitä tarkoittaa Ich trainiere selten? (2) Kuinka usein Oskar käy uimassa?",
      "answerKey": "(1) Harjoittelen harvoin. (2) Kahdesti viikossa.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS3-C02-R01",
      "chapterId": "02",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Mein Hobby”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Noah spielt seit einem Jahr Gitarre.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C02-R02",
      "chapterId": "02",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Er übt meistens am Nachmittag, aber nicht jeden Tag.",
      "answerKey": "Er übt meistens am Nachmittag, aber nicht jeden Tag.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C02-R03",
      "chapterId": "02",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C02-R04",
      "chapterId": "02",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Valitse tekstistä kolme merkityksellistä sanaa tai ilmausta; älä poimi automaattisesti tekstin ensimmäistä sanaa tai henkilönnimeä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C02-R05",
      "chapterId": "02",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: häufigkeitsadverbit, kysymyssanat.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C02-R06",
      "chapterId": "02",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Noah spielt seit einem Jahr Gitarre.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "03": [
    {
      "id": "LOS3-C03-T01",
      "chapterId": "03",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Sport macht Spaß ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C03-T02",
      "chapterId": "03",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Mitä Jule osaa tehdä hyvin?",
      "answerKey": "Uida.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS3-C03-T03",
      "chapterId": "03",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Ayla: Kannst du Tennis spielen?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C03-T04",
      "chapterId": "03",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Mitä lajia Tim pelaa mieluummin?",
      "answerKey": "Tarkka saksankielinen ilmaus: ich spiele lieber Basketball.\nMalliselitys: Koripalloa.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS3-C03-T05",
      "chapterId": "03",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: der Sport, schwimmen, laufen, der Ball.",
      "answerKey": "der Sport = urheilu; schwimmen = uida; laufen = juosta; der Ball = pallo",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS3-C03-T06",
      "chapterId": "03",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: urheilu, uida, juosta, pallo, harjoitus, voittaa.",
      "answerKey": "der Sport = urheilu; schwimmen = uida; laufen = juosta; der Ball = pallo; das Training = harjoitus; gewinnen = voittaa",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C03-T07",
      "chapterId": "03",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Ich _____ gut schwimmen.",
      "answerKey": "kann",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS3-C03-T08",
      "chapterId": "03",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: spielen? / Tennis / du / Kannst.",
      "answerKey": "Kannst du Tennis spielen?",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS3-C03-T09",
      "chapterId": "03",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Osaatko pelata tennistä?.",
      "answerKey": "Kannst du Tennis spielen?",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS3-C03-T10",
      "chapterId": "03",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Ich kann schwimme. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Ich kann schwimmen: toinen verbi on infinitiivissä lauseen lopussa.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS3-C03-T11",
      "chapterId": "03",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö können + infinitiivi; können/gern ero. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Können ilmaisee kykyä tai mahdollisuutta: Ich kann schwimmen. Kun modaaliverbi on lauseessa, toinen verbi tulee perusmuodossa loppuun. Taivuta können: ich kann, du kannst, er kann, wir können, ihr könnt, sie können. Kun sanot Ich schwimme gern, kerrot pitäväsi uimisesta, et välttämättä siitä, kuinka hyvin osaat.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C03-T12",
      "chapterId": "03",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Korjaa: Ich kann spiele Fußball.",
      "answerKey": "Ich kann Fußball spielen.",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS3-C03-T13",
      "chapterId": "03",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Sportplatz: Basketball heute 15–18 Uhr. Tennis am Samstag.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Sportplatz: Basketball heute 15–18 Uhr. Tennis am Samstag. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C03-T14",
      "chapterId": "03",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C03-T15",
      "chapterId": "03",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Ich kann gut schwimmen. ja Wir können heute trainieren.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Ich kann gut schwimmen. | Wir können heute trainieren.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS3-C03-T16",
      "chapterId": "03",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Ich kann gut schwimmen.. Varmista, että kysymys sopii tilaisuuteen Kaverit sopivat liikunnasta.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C03-T17",
      "chapterId": "03",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Kannst du Tennis spielen? uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C03-T18",
      "chapterId": "03",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Kerro mitä osaat ja mitä haluaisit kokeilla. Kirjoita 4–6 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS3-C03-T19",
      "chapterId": "03",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Kaverit sopivat liikunnasta. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Ayla: Kannst du Tennis spielen? / Tim: Ein bisschen, aber ich spiele lieber Basketball.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS3-C03-T20",
      "chapterId": "03",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Korjaa: Ich kann spiele Fußball. (2) Mitä lajia Tim pelaa mieluummin?",
      "answerKey": "(1) Ich kann Fußball spielen. (2) Koripalloa.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS3-C03-R01",
      "chapterId": "03",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Sport macht Spaß”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Im Sportverein treffen sich neue Mitglieder.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C03-R02",
      "chapterId": "03",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Karim kann gut Fahrrad fahren.",
      "answerKey": "Karim kann gut Fahrrad fahren.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C03-R03",
      "chapterId": "03",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C03-R04",
      "chapterId": "03",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Valitse tekstistä kolme merkityksellistä sanaa tai ilmausta; älä poimi automaattisesti tekstin ensimmäistä sanaa tai henkilönnimeä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C03-R05",
      "chapterId": "03",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: können + infinitiivi; können/gern ero.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C03-R06",
      "chapterId": "03",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Im Sportverein treffen sich neue Mitglieder.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "04": [
    {
      "id": "LOS3-C04-T01",
      "chapterId": "04",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Musik, Filme und Spiele ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C04-T02",
      "chapterId": "04",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Millaisen elokuvan Sara ja Ben valitsevat?",
      "answerKey": "Matkasta kertovan elokuvan.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS3-C04-T03",
      "chapterId": "04",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Emma: Magst du diesen Film?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C04-T04",
      "chapterId": "04",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Mistä David pitää enemmän kuin elokuvasta?",
      "answerKey": "Tarkka saksankielinen ilmaus: ich mag die Musik lieber.\nMalliselitys: Musiikista.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS3-C04-T05",
      "chapterId": "04",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: die Musik, das Lied, der Film, die Serie.",
      "answerKey": "die Musik = musiikki; das Lied = laulu; der Film = elokuva; die Serie = sarja",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS3-C04-T06",
      "chapterId": "04",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: musiikki, laulu, elokuva, sarja, peli, elokuvateatteri.",
      "answerKey": "die Musik = musiikki; das Lied = laulu; der Film = elokuva; die Serie = sarja; das Spiel = peli; das Kino = elokuvateatteri",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C04-T07",
      "chapterId": "04",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Ich _____ diese Musik.",
      "answerKey": "mag",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS3-C04-T08",
      "chapterId": "04",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: Podcasts. / lieber / höre / Ich.",
      "answerKey": "Ich höre lieber Podcasts.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS3-C04-T09",
      "chapterId": "04",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Kuuntelen mieluummin podcasteja..",
      "answerKey": "Ich höre lieber Podcasts.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS3-C04-T10",
      "chapterId": "04",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Ich möge Musik. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Tavallinen preesensmuoto on Ich mag Musik.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS3-C04-T11",
      "chapterId": "04",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö mögen, lieber; epäsäännöllisiä preesensmuotoja. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Mögen ilmaisee pitämistä: Ich mag Musik ja Du magst Filme. Muoto ich mag on opittava erikseen eikä se ole ich möge tässä merkityksessä. Vertailussa voit käyttää lieber (‘mieluummin’) ja am liebsten (‘mieluiten’). Esimerkiksi Ich höre lieber Musik kuin Ich sehe lieber Filme. Kysy Was magst du? tai Was hörst du gern?",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C04-T12",
      "chapterId": "04",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Täydennä: Ich ___ Filme. (mögen)",
      "answerKey": "mag",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS3-C04-T13",
      "chapterId": "04",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Filmabend am Freitag um 19 Uhr. Eintritt frei.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Filmabend am Freitag um 19 Uhr. Eintritt frei. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C04-T14",
      "chapterId": "04",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C04-T15",
      "chapterId": "04",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Ich mag diese Musik. ja Am liebsten spiele ich am Computer.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Ich mag diese Musik. | Am liebsten spiele ich am Computer.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS3-C04-T16",
      "chapterId": "04",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Ich mag diese Musik.. Varmista, että kysymys sopii tilaisuuteen Ystävät keskustelevat musiikista.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C04-T17",
      "chapterId": "04",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Ich höre lieber Podcasts. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C04-T18",
      "chapterId": "04",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Suosittele yhtä musiikki- tai mediakokemusta. Kirjoita 4–6 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS3-C04-T19",
      "chapterId": "04",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Ystävät keskustelevat musiikista. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Emma: Magst du diesen Film? / David: Ja, aber ich mag die Musik lieber.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS3-C04-T20",
      "chapterId": "04",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Täydennä: Ich ___ Filme. (mögen) (2) Mistä David pitää elokuvaa enemmän?",
      "answerKey": "(1) mag (2) Musiikista.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS3-C04-R01",
      "chapterId": "04",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Musik, Filme und Spiele”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Am Freitag besucht Sara ihren Freund Ben.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C04-R02",
      "chapterId": "04",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Sie möchten einen Film sehen.",
      "answerKey": "Sie möchten einen Film sehen.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C04-R03",
      "chapterId": "04",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C04-R04",
      "chapterId": "04",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Valitse tekstistä kolme merkityksellistä sanaa tai ilmausta; älä poimi automaattisesti tekstin ensimmäistä sanaa tai henkilönnimeä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C04-R05",
      "chapterId": "04",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: mögen, lieber; epäsäännöllisiä preesensmuotoja.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C04-R06",
      "chapterId": "04",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Am Freitag besucht Sara ihren Freund Ben.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "05": [
    {
      "id": "LOS3-C05-T01",
      "chapterId": "05",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko In der Schule ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C05-T02",
      "chapterId": "05",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Miten Leonie ehdottaa yhteistä kokeeseen valmistautumista?",
      "answerKey": "Harjoittelemalla yhdessä verkossa illalla.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS3-C05-T03",
      "chapterId": "05",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Lehrer: Ihr müsst heute die Aufgabe machen.. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C05-T04",
      "chapterId": "05",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Saavatko opiskelijat tehdä tehtävän yhdessä?",
      "answerKey": "Tarkka saksankielinen ilmaus: Ja, natürlich.\nMalliselitys: Kyllä.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS3-C05-T05",
      "chapterId": "05",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: das Fach, der Unterricht, die Hausaufgabe, der Test.",
      "answerKey": "das Fach = oppiaine; der Unterricht = opetus; die Hausaufgabe = kotitehtävä; der Test = koe",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS3-C05-T06",
      "chapterId": "05",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: oppiaine, opetus, kotitehtävä, koe, vihko, opettaja.",
      "answerKey": "das Fach = oppiaine; der Unterricht = opetus; die Hausaufgabe = kotitehtävä; der Test = koe; das Heft = vihko; der Lehrer = opettaja",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C05-T07",
      "chapterId": "05",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Ich _____ heute lernen.",
      "answerKey": "muss",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS3-C05-T08",
      "chapterId": "05",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: essen. / nicht / hier / darfst / Du.",
      "answerKey": "Du darfst hier nicht essen.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS3-C05-T09",
      "chapterId": "05",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Et saa syödä täällä..",
      "answerKey": "Du darfst hier nicht essen.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS3-C05-T10",
      "chapterId": "05",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Du musst nicht hier essen tarkoittaa ‘Et saa syödä täällä’. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Du musst nicht hier essen tarkoittaa ‘Sinun ei tarvitse syödä täällä’. Kiellon lupamerkitys olisi Du darfst hier nicht essen.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS3-C05-T11",
      "chapterId": "05",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö müssen, dürfen ja verbi-infinitiivi. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Müssen ilmaisee pakkoa: Ich muss lernen. Dürfen ilmaisee lupaa: Ich darf gehen. Kieltolause Du darfst hier nicht telefonieren tarkoittaa, ettei puhelinta saa käyttää täällä. Tämä ei ole sama kuin Du musst nicht telefonieren, joka tarkoittaa, ettei tarvitse puhua puhelimessa. Modaaliverbi taipuu, ja pääverbi menee infinitiivissä lauseen loppuun.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C05-T12",
      "chapterId": "05",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Käännä: ‘En saa käyttää puhelinta täällä.’",
      "answerKey": "Ich darf hier nicht telefonieren.",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS3-C05-T13",
      "chapterId": "05",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Schulregel: Im Unterricht darf man fragen. Handys bleiben in der Tasche.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Schulregel: Im Unterricht darf man fragen. Handys bleiben in der Tasche. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C05-T14",
      "chapterId": "05",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C05-T15",
      "chapterId": "05",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Ich muss heute lernen. ja Wir müssen pünktlich sein.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Ich muss heute lernen. | Wir müssen pünktlich sein.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS3-C05-T16",
      "chapterId": "05",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Ich muss heute lernen.. Varmista, että kysymys sopii tilaisuuteen Oppituntien järjestelyistä puhutaan.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C05-T17",
      "chapterId": "05",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Du darfst hier nicht essen. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C05-T18",
      "chapterId": "05",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Kerro koulupäivän säännöistä ja mieluisista aineista. Kirjoita 4–6 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS3-C05-T19",
      "chapterId": "05",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Oppituntien järjestelyistä puhutaan. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Lehrer: Ihr müsst heute die Aufgabe machen. / Schülerin: Dürfen wir zusammen arbeiten?. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS3-C05-T20",
      "chapterId": "05",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Käännä: ‘En saa käyttää puhelinta täällä.’ (2) Saavatko opiskelijat tehdä tehtävän yhdessä?",
      "answerKey": "(1) Ich darf hier nicht telefonieren. (2) Kyllä.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS3-C05-R01",
      "chapterId": "05",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “In der Schule”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Leonie geht in die zehnte Klasse.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C05-R02",
      "chapterId": "05",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Ihr Lieblingsfach ist Biologie, aber Mathematik findet sie manchmal schwer.",
      "answerKey": "Ihr Lieblingsfach ist Biologie, aber Mathematik findet sie manchmal schwer.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C05-R03",
      "chapterId": "05",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C05-R04",
      "chapterId": "05",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Valitse tekstistä kolme merkityksellistä sanaa tai ilmausta; älä poimi automaattisesti tekstin ensimmäistä sanaa tai henkilönnimeä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C05-R05",
      "chapterId": "05",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: müssen, dürfen ja verbi-infinitiivi.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C05-R06",
      "chapterId": "05",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Leonie geht in die zehnte Klasse.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "06": [
    {
      "id": "LOS3-C06-T01",
      "chapterId": "06",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Mein Stundenplan ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C06-T02",
      "chapterId": "06",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Milloin Paulilla on saksaa?",
      "answerKey": "Tiistaina kello kymmenen.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS3-C06-T03",
      "chapterId": "06",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Jana: Wann hast du Mathe?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C06-T04",
      "chapterId": "06",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Milloin Ramilla on saksaa?",
      "answerKey": "Tarkka saksankielinen ilmaus: Am Dienstag um elf Uhr.\nMalliselitys: Tiistaina kello 11.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS3-C06-T05",
      "chapterId": "06",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: der Stundenplan, die Stunde, die Minute, beginnen.",
      "answerKey": "der Stundenplan = lukujärjestys; die Stunde = tunti; die Minute = minuutti; beginnen = alkaa",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS3-C06-T06",
      "chapterId": "06",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: lukujärjestys, tunti, minuutti, alkaa, päättyä, kello kahdeksalta.",
      "answerKey": "der Stundenplan = lukujärjestys; die Stunde = tunti; die Minute = minuutti; beginnen = alkaa; enden = päättyä; um acht Uhr = kello kahdeksalta",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C06-T07",
      "chapterId": "06",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Am _____ habe ich Deutsch.",
      "answerKey": "Mittwoch",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS3-C06-T08",
      "chapterId": "06",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: Uhr. / neun / um / beginnt / Unterricht / Der.",
      "answerKey": "Der Unterricht beginnt um neun Uhr.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS3-C06-T09",
      "chapterId": "06",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Oppitunti alkaa yhdeksältä..",
      "answerKey": "Der Unterricht beginnt um neun Uhr.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS3-C06-T10",
      "chapterId": "06",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Um neun Uhr der Unterricht beginnt. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Um neun Uhr beginnt der Unterricht.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS3-C06-T11",
      "chapterId": "06",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö am/um, ajan määreet, lauseen järjestys. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Viikonpäivän yhteydessä käytetään am, kellonajan yhteydessä um: am Montag, um acht Uhr. Ajanilmauksen saa laittaa virkkeen alkuun: Am Dienstag habe ich Mathe. Taivutettu verbi säilyy toisena. Kun ilmaus sisältää useita sanoja, esimerkiksi am Dienstag, se muodostaa silti yhden ajanmääreen lauseen alussa. Kysy Wann hast du Deutsch?",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C06-T12",
      "chapterId": "06",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Miten sanot ‘Maanantaina minulla on biologiaa’?",
      "answerKey": "Am Montag habe ich Biologie.",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS3-C06-T13",
      "chapterId": "06",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Stundenplan: Mo 9:00 Mathe; Di 11:00 Deutsch; Mi 10:00 Sport.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Stundenplan: Mo 9:00 Mathe; Di 11:00 Deutsch; Mi 10:00 Sport. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C06-T14",
      "chapterId": "06",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C06-T15",
      "chapterId": "06",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Am Mittwoch habe ich Deutsch. ja Um acht Uhr habe ich Mathe.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Am Mittwoch habe ich Deutsch. | Um acht Uhr habe ich Mathe.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS3-C06-T16",
      "chapterId": "06",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Am Mittwoch habe ich Deutsch.. Varmista, että kysymys sopii tilaisuuteen Koulupäivän aikataulu.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C06-T17",
      "chapterId": "06",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Der Unterricht beginnt um neun Uhr. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C06-T18",
      "chapterId": "06",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Selitä oma tai kuviteltu koulupäivän aikataulu. Kirjoita 4–6 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS3-C06-T19",
      "chapterId": "06",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Koulupäivän aikataulu. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Jana: Wann hast du Mathe? / Rami: Am Montag um neun Uhr.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS3-C06-T20",
      "chapterId": "06",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Miten sanot ‘Maanantaina minulla on biologiaa’? (2) Milloin Ramilla on saksaa?",
      "answerKey": "(1) Am Montag habe ich Biologie. (2) Tiistaina kello 11.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS3-C06-R01",
      "chapterId": "06",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Mein Stundenplan”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Paul zeigt seinen Stundenplan.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C06-R02",
      "chapterId": "06",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Am Montag beginnt die Schule um acht Uhr.",
      "answerKey": "Am Montag beginnt die Schule um acht Uhr.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C06-R03",
      "chapterId": "06",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C06-R04",
      "chapterId": "06",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Valitse tekstistä kolme merkityksellistä sanaa tai ilmausta; älä poimi automaattisesti tekstin ensimmäistä sanaa tai henkilönnimeä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C06-R05",
      "chapterId": "06",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: am/um, ajan määreet, lauseen järjestys.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C06-R06",
      "chapterId": "06",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Paul zeigt seinen Stundenplan.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "07": [
    {
      "id": "LOS3-C07-T01",
      "chapterId": "07",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Nach dem Unterricht ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C07-T02",
      "chapterId": "07",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Mitä Jana tekee ennen kotiin menemistä?",
      "answerKey": "Hän hakee sisarensa.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS3-C07-T03",
      "chapterId": "07",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Kira: Wann kommst du nach Hause?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C07-T04",
      "chapterId": "07",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Mihin aikaan Ben palaa kotiin?",
      "answerKey": "Tarkka saksankielinen ilmaus: Ich komme um vier Uhr zurück.\nMalliselitys: Kello neljältä.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS3-C07-T05",
      "chapterId": "07",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: nach Hause, mitkommen, anrufen, aufstehen.",
      "answerKey": "nach Hause = kotiin; mitkommen = tulla mukaan; anrufen = soittaa; aufstehen = nousta",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS3-C07-T06",
      "chapterId": "07",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: kotiin, tulla mukaan, soittaa, nousta, katsoa televisiota, kutsua.",
      "answerKey": "nach Hause = kotiin; mitkommen = tulla mukaan; anrufen = soittaa; aufstehen = nousta; fernsehen = katsoa televisiota; einladen = kutsua",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C07-T07",
      "chapterId": "07",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Ich _____ meinen Freund an.",
      "answerKey": "rufe",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS3-C07-T08",
      "chapterId": "07",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: ein. / ich / kaufe / Schule / der / Nach.",
      "answerKey": "Nach der Schule kaufe ich ein.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS3-C07-T09",
      "chapterId": "07",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Käyn ostoksilla koulun jälkeen..",
      "answerKey": "Nach der Schule kaufe ich ein.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS3-C07-T10",
      "chapterId": "07",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Ich anrufe meine Freundin. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Ich rufe meine Freundin an, kun verbinä on yksinään taivutettu anrufen.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS3-C07-T11",
      "chapterId": "07",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö erotettavat verbit, preesensin kokonaiskertaus. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Erotettavan verbin osat voivat erota toisistaan väitelauseessa. Anrufen on ‘soittaa jollekulle’. Ich rufe meine Freundin an. Sen taivutettu osa rufe tulee toiselle paikalle ja etuliite an lauseen loppuun. Infinitiivissä osat pysyvät yhdessä: Ich möchte meine Freundin anrufen. Näiden kahden mallin erottaminen on tämän kappaleen ydintaito.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C07-T12",
      "chapterId": "07",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Täydennä: Ich ___ dich morgen ___. (anrufen)",
      "answerKey": "rufe … an",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS3-C07-T13",
      "chapterId": "07",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Nach der Schule: 15:00 Bus; 16:00 zu Hause; 17:00 Training.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Nach der Schule: 15:00 Bus; 16:00 zu Hause; 17:00 Training. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C07-T14",
      "chapterId": "07",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C07-T15",
      "chapterId": "07",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Ich rufe meinen Freund an. ja Ich möchte dich anrufen.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Ich rufe meinen Freund an. | Ich möchte dich anrufen.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS3-C07-T16",
      "chapterId": "07",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Ich rufe meinen Freund an.. Varmista, että kysymys sopii tilaisuuteen Koulun jälkeen lähdetään kotiin.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C07-T17",
      "chapterId": "07",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Nach der Schule kaufe ich ein. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C07-T18",
      "chapterId": "07",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Kirjoita viesti omista iltapäivän suunnitelmista. Kirjoita 4–6 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS3-C07-T19",
      "chapterId": "07",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Koulun jälkeen lähdetään kotiin. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Kira: Wann kommst du nach Hause? / Ben: Ich komme um vier Uhr zurück.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS3-C07-T20",
      "chapterId": "07",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Täydennä: Ich ___ dich morgen ___. (anrufen) (2) Mihin aikaan Ben palaa kotiin?",
      "answerKey": "(1) rufe … an (2) Kello neljältä.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS3-C07-R01",
      "chapterId": "07",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Nach dem Unterricht”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Der Unterricht ist vorbei.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C07-R02",
      "chapterId": "07",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Jana räumt ihre Sachen ein und zieht ihre Jacke an.",
      "answerKey": "Jana räumt ihre Sachen ein und zieht ihre Jacke an.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C07-R03",
      "chapterId": "07",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C07-R04",
      "chapterId": "07",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Valitse tekstistä kolme merkityksellistä sanaa tai ilmausta; älä poimi automaattisesti tekstin ensimmäistä sanaa tai henkilönnimeä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C07-R05",
      "chapterId": "07",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: erotettavat verbit, preesensin kokonaiskertaus.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C07-R06",
      "chapterId": "07",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Der Unterricht ist vorbei.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "08": [
    {
      "id": "LOS3-C08-T01",
      "chapterId": "08",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Wir treffen uns! ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C08-T02",
      "chapterId": "08",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Miksi ystävät muuttavat tapaamissuunnitelmaansa?",
      "answerKey": "Koska alkaa sataa.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS3-C08-T03",
      "chapterId": "08",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Mila: Wollen wir morgen ins Kino gehen?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C08-T04",
      "chapterId": "08",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Mihin aikaan Mila ehdottaa tapaamista?",
      "answerKey": "Tarkka saksankielinen ilmaus: treffen wir uns um halb sieben?\nMalliselitys: Kello 18.30.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS3-C08-T05",
      "chapterId": "08",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: sich treffen, die Nachricht, schreiben, Zeit haben.",
      "answerKey": "sich treffen = tavata toisensa; die Nachricht = viesti; schreiben = kirjoittaa; Zeit haben = olla aikaa",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS3-C08-T06",
      "chapterId": "08",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: tavata toisensa, viesti, kirjoittaa, olla aikaa, haluta, ehkä.",
      "answerKey": "sich treffen = tavata toisensa; die Nachricht = viesti; schreiben = kirjoittaa; Zeit haben = olla aikaa; wollen = haluta; vielleicht = ehkä",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C08-T07",
      "chapterId": "08",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Wir _____ ins Kino gehen.",
      "answerKey": "wollen",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS3-C08-T08",
      "chapterId": "08",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: mitkommen? / du / Willst.",
      "answerKey": "Willst du mitkommen?",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS3-C08-T09",
      "chapterId": "08",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Haluatko tulla mukaan?.",
      "answerKey": "Willst du mitkommen?",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS3-C08-T10",
      "chapterId": "08",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Wir wollen gehen ins Kino. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Wir wollen ins Kino gehen: infinitiivi tulee loppuun.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS3-C08-T11",
      "chapterId": "08",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö wollen ja können suunnitelmissa. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Wollen ilmaisee tahtomista: Ich will ins Kino gehen. Taivutus: ich will, du willst, er will, wir wollen, ihr wollt, sie wollen. Kuten können-verbin kanssa, tekemistä kuvaava toinen verbi sijoittuu infinitiivissä lauseen loppuun. Ero: ich will on usein suorempi kuin kohtelias ich möchte; ystävien kesken molemmat voivat toimia tilanteesta riippuen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C08-T12",
      "chapterId": "08",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Täydennä: Sie ___ zusammen lernen. (wollen, he)",
      "answerKey": "wollen",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS3-C08-T13",
      "chapterId": "08",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Nachricht: Kino morgen 19 Uhr. Treffen 18:30 vor dem Kino.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Nachricht: Kino morgen 19 Uhr. Treffen 18:30 vor dem Kino. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C08-T14",
      "chapterId": "08",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C08-T15",
      "chapterId": "08",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Wir wollen ins Kino gehen. ja Ich möchte gern mitkommen.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Wir wollen ins Kino gehen. | Ich möchte gern mitkommen.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS3-C08-T16",
      "chapterId": "08",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Wir wollen ins Kino gehen.. Varmista, että kysymys sopii tilaisuuteen Yhteistä tapaamista suunnitellaan.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C08-T17",
      "chapterId": "08",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Willst du mitkommen? uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C08-T18",
      "chapterId": "08",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Lähetä kutsu ja vastaa toiseen kutsuun. Kirjoita 4–6 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS3-C08-T19",
      "chapterId": "08",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Yhteistä tapaamista suunnitellaan. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Mila: Wollen wir morgen ins Kino gehen? / Noah: Ich kann erst um sechs.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS3-C08-T20",
      "chapterId": "08",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Täydennä: Sie ___ zusammen lernen. (wollen, he) (2) Missä ja milloin he tapaavat?",
      "answerKey": "(1) wollen (2) Elokuvateatterin edessä kello 18.30.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS3-C08-R01",
      "chapterId": "08",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Wir treffen uns!”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Vier Freunde möchten sich am Samstag treffen.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C08-R02",
      "chapterId": "08",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Mia kann erst ab vierzehn Uhr.",
      "answerKey": "Mia kann erst ab vierzehn Uhr.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C08-R03",
      "chapterId": "08",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C08-R04",
      "chapterId": "08",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Valitse tekstistä kolme merkityksellistä sanaa tai ilmausta; älä poimi automaattisesti tekstin ensimmäistä sanaa tai henkilönnimeä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C08-R05",
      "chapterId": "08",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: wollen ja können suunnitelmissa.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C08-R06",
      "chapterId": "08",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Vier Freunde möchten sich am Samstag treffen.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "09": [
    {
      "id": "LOS3-C09-T01",
      "chapterId": "09",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Am Wochenende unterwegs ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C09-T02",
      "chapterId": "09",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Millä Emma ja Jonas matkustavat Dresdeniin?",
      "answerKey": "Junalla.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS3-C09-T03",
      "chapterId": "09",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Anna: Fährst du am Samstag nach Köln?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C09-T04",
      "chapterId": "09",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Millä Luis matkustaa?",
      "answerKey": "Tarkka saksankielinen ilmaus: ich fahre mit dem Zug.\nMalliselitys: Junalla.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS3-C09-T05",
      "chapterId": "09",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: der Ausflug, der Zug, der Bus, das Ticket.",
      "answerKey": "der Ausflug = retki; der Zug = juna; der Bus = bussi; das Ticket = lippu",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS3-C09-T06",
      "chapterId": "09",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: retki, juna, bussi, lippu, matkustaa, vaeltaa.",
      "answerKey": "der Ausflug = retki; der Zug = juna; der Bus = bussi; das Ticket = lippu; fahren = matkustaa; wandern = vaeltaa",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C09-T07",
      "chapterId": "09",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Wir _____ mit dem Bus.",
      "answerKey": "fahren",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS3-C09-T08",
      "chapterId": "09",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: München. / nach / wir / fahren / Samstag / Am.",
      "answerKey": "Am Samstag fahren wir nach München.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS3-C09-T09",
      "chapterId": "09",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Lauantaina matkustamme Müncheniin..",
      "answerKey": "Am Samstag fahren wir nach München.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS3-C09-T10",
      "chapterId": "09",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Wir fahren mit den Bus. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Wir fahren mit dem Bus. Opettele mit dem Bus kokonaisena käyttöfraasina.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS3-C09-T11",
      "chapterId": "09",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö mit/nach/zu fraaseissa; akkusatiivi kertaantuu. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Opettele alkuun kokonaisina ilmaukset mit dem Bus, mit dem Zug, nach Berlin ja zu Freunden. Mit vaatii datiivin, mikä näkyy muodossa dem; monikon zu Freunden sisältää myös datiivimuodon. Suuntaan viittaava nach käytetään tavallisesti kaupunkien ja monien artikkelittomien maiden kanssa: nach München, nach Deutschland. Muiden paikannimien kanssa tarvitaan eri rakenteita, joten älä yleistä nach kaikkialle.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C09-T12",
      "chapterId": "09",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Miten sanot ‘Matkustan junalla’?",
      "answerKey": "Ich fahre mit dem Zug.",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS3-C09-T13",
      "chapterId": "09",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Ausflug: Zug nach Köln, Samstag 10:00, Gleis 4.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Ausflug: Zug nach Köln, Samstag 10:00, Gleis 4. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C09-T14",
      "chapterId": "09",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C09-T15",
      "chapterId": "09",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Wir fahren mit dem Bus. ja Ich gehe zu Freunden.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Wir fahren mit dem Bus. | Ich gehe zu Freunden.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS3-C09-T16",
      "chapterId": "09",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Wir fahren mit dem Bus.. Varmista, että kysymys sopii tilaisuuteen Retkeä suunnitellaan.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C09-T17",
      "chapterId": "09",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Am Samstag fahren wir nach München. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C09-T18",
      "chapterId": "09",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Valitse viikonlopun tapahtuma perustellen. Kirjoita 4–6 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS3-C09-T19",
      "chapterId": "09",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Retkeä suunnitellaan. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Anna: Fährst du am Samstag nach Köln? / Luis: Ja, ich fahre mit dem Zug.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS3-C09-T20",
      "chapterId": "09",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Miten sanot ‘Matkustan junalla’? (2) Millä Luis matkustaa?",
      "answerKey": "(1) Ich fahre mit dem Zug. (2) Junalla.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS3-C09-R01",
      "chapterId": "09",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Am Wochenende unterwegs”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Am Wochenende fahren Emma und Jonas mit dem Zug nach Dresden.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C09-R02",
      "chapterId": "09",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Sie kaufen die Tickets schon am Mittwoch.",
      "answerKey": "Sie kaufen die Tickets schon am Mittwoch.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C09-R03",
      "chapterId": "09",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C09-R04",
      "chapterId": "09",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Valitse tekstistä kolme merkityksellistä sanaa tai ilmausta; älä poimi automaattisesti tekstin ensimmäistä sanaa tai henkilönnimeä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C09-R05",
      "chapterId": "09",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: mit/nach/zu fraaseissa; akkusatiivi kertaantuu.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS3-C09-R06",
      "chapterId": "09",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Am Wochenende fahren Emma und Jonas mit dem Zug nach Dresden.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ]
};
