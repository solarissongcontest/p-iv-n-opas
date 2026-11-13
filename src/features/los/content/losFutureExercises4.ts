import type { LosFutureExerciseDraft } from "./losFutureExerciseTypes";
/** LOS! 4: 260 kirjakohtaista tehtävää; kielellinen ja arvioinnin tarkistus kesken. */
export const LOS_FUTURE_EXERCISES_4: Record<string, LosFutureExerciseDraft[]> = {
  "10": [
    {
      "id": "LOS4-C10-T01",
      "chapterId": "10",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Mein kleiner Reiseführer ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C10-T02",
      "chapterId": "10",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Mitä vierailija voi tehdä Turussa?",
      "answerKey": "Kävellä joen varrella ja tutustua linnaan.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS4-C10-T03",
      "chapterId": "10",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Guide: Willkommen in Turku!. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C10-T04",
      "chapterId": "10",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Mitä vierailija voi tehdä Turussa?",
      "answerKey": "Tarkista valinta omasta tekstistä ja perustele suomeksi: Kävellä joen varrella ja tutustua linnaan.. Tokenikohdistus lisättävä ennen automaattista pisteytystä.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS4-C10-T05",
      "chapterId": "10",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: der Reiseführer, die Sehenswürdigkeit, empfehlen, besuchen.",
      "answerKey": "der Reiseführer = matkaopas; die Sehenswürdigkeit = nähtävyys; empfehlen = suositella; besuchen = vierailla",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS4-C10-T06",
      "chapterId": "10",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: matkaopas, nähtävyys, suositella, vierailla, tie, matka.",
      "answerKey": "der Reiseführer = matkaopas; die Sehenswürdigkeit = nähtävyys; empfehlen = suositella; besuchen = vierailla; der Weg = tie; die Reise = matka",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C10-T07",
      "chapterId": "10",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Die _____ liegt im Süden.",
      "answerKey": "Stadt",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS4-C10-T08",
      "chapterId": "10",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: besuchen. / Museum / ein / kann / Man.",
      "answerKey": "Man kann ein Museum besuchen.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS4-C10-T09",
      "chapterId": "10",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Voi käydä museossa..",
      "answerKey": "Man kann ein Museum besuchen.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS4-C10-T10",
      "chapterId": "10",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Ich empfehle die Stadt, weil ist sie schön. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on weil sie schön ist.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS4-C10-T11",
      "chapterId": "10",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö koko kirjan kertaus, Perfekt, weil. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Kertaa kolme toimivaa lauserakennetta: Die Stadt liegt … (sijainti), Man kann … besuchen (tekemisen mahdollisuus) ja Ich war dort / Ich habe … gesehen (oma kokemus). Kun perusteleminen onnistuu, lisää weil: Ich empfehle die Stadt, weil sie interessant ist. Tarkista erisnimet ja tosiasiat, käytä lyhyttä lähdemerkintää. Tavoite on ymmärrettävä A1.3-tasoinen esittely, ei matkailumainos.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C10-T12",
      "chapterId": "10",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Miten sanot ‘Voit käydä museossa’ yleistämällä?",
      "answerKey": "Man kann ein Museum besuchen.",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS4-C10-T13",
      "chapterId": "10",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Kurzguide: Turku. Sehenswürdigkeiten: Burg, Fluss, Museen.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Kurzguide: Turku. Sehenswürdigkeiten: Burg, Fluss, Museen. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C10-T14",
      "chapterId": "10",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -viestiä. Miten vastaanottaja, tavoite ja kielen tyyli eroavat? Kirjoita kaksi havaintoa.",
      "answerKey": "Tukidialogissa on puheenvuorot; Text B on kirjoitettu lyhyt viesti, ilmoitus tai luettelo. Tarkista lisäksi sisältöerot.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C10-T15",
      "chapterId": "10",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Die Stadt liegt im Süden. ja Ich empfehle die Stadt, weil sie schön ist.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Die Stadt liegt im Süden. | Ich empfehle die Stadt, weil sie schön ist.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS4-C10-T16",
      "chapterId": "10",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Die Stadt liegt im Süden.. Varmista, että kysymys sopii tilaisuuteen Pienen matkaoppaan esitteleminen.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C10-T17",
      "chapterId": "10",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Man kann ein Museum besuchen. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C10-T18",
      "chapterId": "10",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Tee 1-sivuinen Suomi- tai DACH-opas ja esittele se. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS4-C10-T19",
      "chapterId": "10",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Pienen matkaoppaan esitteleminen. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Guide: Willkommen in Turku! / Gast: Was kann man hier machen?. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS4-C10-T20",
      "chapterId": "10",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Miten sanot ‘Voit käydä museossa’ yleistämällä? (2) Mitä vierailija voi tehdä Turussa?",
      "answerKey": "(1) Man kann ein Museum besuchen. (2) Kävellä joen varrella ja tutustua linnaan.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS4-C10-R01",
      "chapterId": "10",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Mein kleiner Reiseführer”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Für den Deutschkurs schreibt Leo einen kleinen Reiseführer.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C10-R02",
      "chapterId": "10",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Er stellt drei Orte vor: einen Park in Berlin, ein Café in Wien und einen Spazierweg in Basel.",
      "answerKey": "Er stellt drei Orte vor: einen Park in Berlin, ein Café in Wien und einen Spazierweg in Basel.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C10-R03",
      "chapterId": "10",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C10-R04",
      "chapterId": "10",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Aloita sanasta tai ilmauksesta “Für” vain, jos et tunne sitä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C10-R05",
      "chapterId": "10",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: koko kirjan kertaus, Perfekt, weil.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C10-R06",
      "chapterId": "10",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Für den Deutschkurs schreibt Leo einen kleinen Reiseführer.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "01": [
    {
      "id": "LOS4-C01-T01",
      "chapterId": "01",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Wo spricht man Deutsch? ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C01-T02",
      "chapterId": "01",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Puhutaanko saksaa vain yhdessä maassa?",
      "answerKey": "Ei, useissa maissa.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS4-C01-T03",
      "chapterId": "01",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Mia: Wo spricht man Deutsch?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C01-T04",
      "chapterId": "01",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Puhutaanko saksaa vain yhdessä maassa?",
      "answerKey": "Tarkista valinta omasta tekstistä ja perustele suomeksi: Ei, useissa maissa.. Tokenikohdistus lisättävä ennen automaattista pisteytystä.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS4-C01-T05",
      "chapterId": "01",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: Deutsch, die Sprache, sprechen, das Land.",
      "answerKey": "Deutsch = saksa; die Sprache = kieli; sprechen = puhua; das Land = maa",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS4-C01-T06",
      "chapterId": "01",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: saksa, kieli, puhua, maa, Saksa, Itävalta.",
      "answerKey": "Deutsch = saksa; die Sprache = kieli; sprechen = puhua; das Land = maa; Deutschland = Saksa; Österreich = Itävalta",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C01-T07",
      "chapterId": "01",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: In _____ spricht man Deutsch.",
      "answerKey": "Österreich",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS4-C01-T08",
      "chapterId": "01",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: Deutsch. / lerne / Ich.",
      "answerKey": "Ich lerne Deutsch.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS4-C01-T09",
      "chapterId": "01",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Opiskelen saksaa..",
      "answerKey": "Ich lerne Deutsch.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS4-C01-T10",
      "chapterId": "01",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause In Schweiz spricht man Deutsch. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on In der Schweiz spricht man Deutsch. Schweiz-nimi tarvitsee artikkelin.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS4-C01-T11",
      "chapterId": "01",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö maa- ja kieli-ilmaukset, kysymyssanat. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Ilmaus Man spricht Deutsch in … kuvaa sitä, missä kieltä puhutaan. Man on yleistävä pronomini ja sen kanssa verbi taipuu yksikön kolmannessa persoonassa: man spricht. Maiden nimet ovat yleensä ilman artikkelia: in Deutschland, in Österreich, in Finnland. Sveitsin nimi on poikkeus: in der Schweiz. Huomaa ero puhumisen ja matkustamisen välillä: Ich spreche Deutsch; ich fahre nach Deutschland.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C01-T12",
      "chapterId": "01",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Täydennä: ___ spricht Deutsch in Österreich. (yleistävä ‘ihmiset’)",
      "answerKey": "Man",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS4-C01-T13",
      "chapterId": "01",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Sprachenkarte: Deutsch ist in mehreren Ländern Amtssprache oder eine Amtssprache.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Sprachenkarte: Deutsch ist in mehreren Ländern Amtssprache oder eine Amtssprache. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C01-T14",
      "chapterId": "01",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -viestiä. Miten vastaanottaja, tavoite ja kielen tyyli eroavat? Kirjoita kaksi havaintoa.",
      "answerKey": "Tukidialogissa on puheenvuorot; Text B on kirjoitettu lyhyt viesti, ilmoitus tai luettelo. Tarkista lisäksi sisältöerot.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C01-T15",
      "chapterId": "01",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: In Österreich spricht man Deutsch. ja In der Schweiz gibt es verschiedene Sprachen.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: In Österreich spricht man Deutsch. | In der Schweiz gibt es verschiedene Sprachen.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS4-C01-T16",
      "chapterId": "01",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla In Österreich spricht man Deutsch.. Varmista, että kysymys sopii tilaisuuteen Saksankielisen maailman kartta tutuksi.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C01-T17",
      "chapterId": "01",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Ich lerne Deutsch. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C01-T18",
      "chapterId": "01",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Kerro missä saksaa puhutaan. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS4-C01-T19",
      "chapterId": "01",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Saksankielisen maailman kartta tutuksi. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Mia: Wo spricht man Deutsch? / Tariq: In Deutschland, Österreich und in der Schweiz.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS4-C01-T20",
      "chapterId": "01",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Täydennä: ___ spricht Deutsch in Österreich. (yleistävä ‘ihmiset’) (2) Puhutaanko saksaa vain yhdessä maassa?",
      "answerKey": "(1) Man (2) Ei, useissa maissa.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS4-C01-R01",
      "chapterId": "01",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Wo spricht man Deutsch?”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "In welchen Ländern spricht man Deutsch?",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C01-R02",
      "chapterId": "01",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Im Unterricht hängt eine Karte von Europa.",
      "answerKey": "Im Unterricht hängt eine Karte von Europa.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C01-R03",
      "chapterId": "01",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C01-R04",
      "chapterId": "01",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Aloita sanasta tai ilmauksesta “In” vain, jos et tunne sitä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C01-R05",
      "chapterId": "01",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: maa- ja kieli-ilmaukset, kysymyssanat.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C01-R06",
      "chapterId": "01",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: In welchen Ländern spricht man Deutsch?… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "02": [
    {
      "id": "LOS4-C02-T01",
      "chapterId": "02",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Willkommen in Deutschland ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C02-T02",
      "chapterId": "02",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Missä päin Saksaa Hampuri sijaitsee?",
      "answerKey": "Pohjoisessa.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS4-C02-T03",
      "chapterId": "02",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Lena: Wo liegt Hamburg?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C02-T04",
      "chapterId": "02",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Missä päin Saksaa Hampuri sijaitsee?",
      "answerKey": "Tarkista valinta omasta tekstistä ja perustele suomeksi: Pohjoisessa.. Tokenikohdistus lisättävä ennen automaattista pisteytystä.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS4-C02-T05",
      "chapterId": "02",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: die Hauptstadt, Berlin, der Norden, der Süden.",
      "answerKey": "die Hauptstadt = pääkaupunki; Berlin = Berliini; der Norden = pohjoinen; der Süden = etelä",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS4-C02-T06",
      "chapterId": "02",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: pääkaupunki, Berliini, pohjoinen, etelä, osavaltio, kaupunki.",
      "answerKey": "die Hauptstadt = pääkaupunki; Berlin = Berliini; der Norden = pohjoinen; der Süden = etelä; das Bundesland = osavaltio; die Stadt = kaupunki",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C02-T07",
      "chapterId": "02",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Hamburg _____ im Norden Deutschlands.",
      "answerKey": "liegt",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS4-C02-T08",
      "chapterId": "02",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: Deutschlands. / Osten / im / liegt / Berlin.",
      "answerKey": "Berlin liegt im Osten Deutschlands.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS4-C02-T09",
      "chapterId": "02",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Berliini sijaitsee Saksan itäosassa..",
      "answerKey": "Berlin liegt im Osten Deutschlands.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS4-C02-T10",
      "chapterId": "02",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Hamburg liegt in der Norden. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Hamburg liegt im Norden Deutschlands. Käyttöilmaus on im Norden.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS4-C02-T11",
      "chapterId": "02",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö paikanilmaukset in/im, pohjois-etelä. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Im on sanojen in dem supistuma: im Süden, im Norden. Kaupungeista voi usein sanoa in Berlin tai in Hamburg ilman artikkelia. Kuvattaessa sijaintia käytät valmista muotoa: Berlin liegt im Osten Deutschlands. Säännön ydin ei ole ulkoa opettelu kaikista maantieteellisistä sijoista vaan se, että tunnistat paikannuksen ja pystyt kertomaan yksinkertaisen faktan kartasta.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C02-T12",
      "chapterId": "02",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Mitä tarkoittaa im Süden?",
      "answerKey": "etelässä / eteläosassa",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS4-C02-T13",
      "chapterId": "02",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Reisetipp: Hamburg liegt im Norden. Der Hafen ist bekannt.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Reisetipp: Hamburg liegt im Norden. Der Hafen ist bekannt. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C02-T14",
      "chapterId": "02",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -viestiä. Miten vastaanottaja, tavoite ja kielen tyyli eroavat? Kirjoita kaksi havaintoa.",
      "answerKey": "Tukidialogissa on puheenvuorot; Text B on kirjoitettu lyhyt viesti, ilmoitus tai luettelo. Tarkista lisäksi sisältöerot.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C02-T15",
      "chapterId": "02",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Hamburg liegt im Norden Deutschlands. ja Ich wohne in Berlin.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Hamburg liegt im Norden Deutschlands. | Ich wohne in Berlin.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS4-C02-T16",
      "chapterId": "02",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Hamburg liegt im Norden Deutschlands.. Varmista, että kysymys sopii tilaisuuteen Tutustuminen saksalaiseen kaupunkiin.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C02-T17",
      "chapterId": "02",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Berlin liegt im Osten Deutschlands. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C02-T18",
      "chapterId": "02",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Tee lyhyt kohde-esittely. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS4-C02-T19",
      "chapterId": "02",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Tutustuminen saksalaiseen kaupunkiin. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Lena: Wo liegt Hamburg? / Tom: Im Norden Deutschlands.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS4-C02-T20",
      "chapterId": "02",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Mitä tarkoittaa im Süden? (2) Missä päin Saksaa Hampuri sijaitsee?",
      "answerKey": "(1) etelässä / eteläosassa (2) Pohjoisessa.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS4-C02-R01",
      "chapterId": "02",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Willkommen in Deutschland”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Lena besucht ihre Freundin in Berlin.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C02-R02",
      "chapterId": "02",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Sie fahren mit der Straßenbahn durch die Stadt.",
      "answerKey": "Sie fahren mit der Straßenbahn durch die Stadt.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C02-R03",
      "chapterId": "02",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C02-R04",
      "chapterId": "02",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Aloita sanasta tai ilmauksesta “Lena” vain, jos et tunne sitä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C02-R05",
      "chapterId": "02",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: paikanilmaukset in/im, pohjois-etelä.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C02-R06",
      "chapterId": "02",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Lena besucht ihre Freundin in Berlin.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "03": [
    {
      "id": "LOS4-C03-T01",
      "chapterId": "03",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Grüße aus Österreich ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C03-T02",
      "chapterId": "03",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Mistä kaupungista kortti lähetetään?",
      "answerKey": "Wienistä.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS4-C03-T03",
      "chapterId": "03",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Ella: Wie gefällt dir Wien?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C03-T04",
      "chapterId": "03",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Mistä kaupungista kortti lähetetään?",
      "answerKey": "Tarkista valinta omasta tekstistä ja perustele suomeksi: Wienistä.. Tokenikohdistus lisättävä ennen automaattista pisteytystä.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS4-C03-T05",
      "chapterId": "03",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: Wien, das Café, der Markt, die Tradition.",
      "answerKey": "Wien = Wien; das Café = kahvila; der Markt = tori; die Tradition = perinne",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS4-C03-T06",
      "chapterId": "03",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: Wien, kahvila, tori, perinne, raitiovaunu, vanha.",
      "answerKey": "Wien = Wien; das Café = kahvila; der Markt = tori; die Tradition = perinne; die Straßenbahn = raitiovaunu; alt = vanha",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C03-T07",
      "chapterId": "03",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Wien _____ größer als Salzburg.",
      "answerKey": "ist",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS4-C03-T08",
      "chapterId": "03",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: Park. / jener / wie / groß / so / ist / Park / Dieser.",
      "answerKey": "Dieser Park ist so groß wie jener Park.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS4-C03-T09",
      "chapterId": "03",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Tämä puisto on yhtä suuri kuin tuo puisto..",
      "answerKey": "Dieser Park ist so groß wie jener Park.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS4-C03-T10",
      "chapterId": "03",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause größer wie Salzburg. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Vertailussa käytetään als: größer als Salzburg. Yhtäsuuruudessa on so groß wie.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS4-C03-T11",
      "chapterId": "03",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö vertailevat adjektiivit ensi kertaa. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Komparatiivilla verrataan kahta asiaa. Perusmalli on adjektiivi + -er + als: Wien ist größer als Salzburg. Kaikki adjektiivit eivät käyttäydy täysin säännöllisesti: groß → größer; gut → besser. Kun kaksi asiaa ovat samanlaisia, käytä so … wie: Die Stadt ist so groß wie … . Tässä käytät ensisijaisesti adjektiiveja predikatiivisesti, jolloin pääte ei riipu substantiivin suvusta.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C03-T12",
      "chapterId": "03",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Täydennä: Wien ist ___ als Salzburg. (groß)",
      "answerKey": "größer",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS4-C03-T13",
      "chapterId": "03",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Liebe Grüße aus Wien! Heute besuchen wir ein Museum. Bis bald!. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Liebe Grüße aus Wien! Heute besuchen wir ein Museum. Bis bald! | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C03-T14",
      "chapterId": "03",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -viestiä. Miten vastaanottaja, tavoite ja kielen tyyli eroavat? Kirjoita kaksi havaintoa.",
      "answerKey": "Tukidialogissa on puheenvuorot; Text B on kirjoitettu lyhyt viesti, ilmoitus tai luettelo. Tarkista lisäksi sisältöerot.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C03-T15",
      "chapterId": "03",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Wien ist größer als Salzburg. ja Das Essen ist besser.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Wien ist größer als Salzburg. | Das Essen ist besser.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS4-C03-T16",
      "chapterId": "03",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Wien ist größer als Salzburg.. Varmista, että kysymys sopii tilaisuuteen Postikortti Itävallasta.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C03-T17",
      "chapterId": "03",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Dieser Park ist so groß wie jener Park. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C03-T18",
      "chapterId": "03",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Esittele yksi Itävaltaan liittyvä kohde. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS4-C03-T19",
      "chapterId": "03",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Postikortti Itävallasta. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Ella: Wie gefällt dir Wien? / Nils: Sehr gut. Die Stadt ist groß und schön.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS4-C03-T20",
      "chapterId": "03",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Täydennä: Wien ist ___ als Salzburg. (groß) (2) Mistä kaupungista kortti lähetetään?",
      "answerKey": "(1) größer (2) Wienistä.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS4-C03-R01",
      "chapterId": "03",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Grüße aus Österreich”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Timo ist zum ersten Mal in Wien.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C03-R02",
      "chapterId": "03",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Er fährt mit der U-Bahn zu einem Museum und geht später in ein Café.",
      "answerKey": "Er fährt mit der U-Bahn zu einem Museum und geht später in ein Café.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C03-R03",
      "chapterId": "03",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C03-R04",
      "chapterId": "03",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Aloita sanasta tai ilmauksesta “Timo” vain, jos et tunne sitä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C03-R05",
      "chapterId": "03",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: vertailevat adjektiivit ensi kertaa.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C03-R06",
      "chapterId": "03",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Timo ist zum ersten Mal in Wien.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "04": [
    {
      "id": "LOS4-C04-T01",
      "chapterId": "04",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Die Schweiz ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C04-T02",
      "chapterId": "04",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Miksi on virheellistä väittää, että Sveitsissä puhuttaisiin vain saksaa?",
      "answerKey": "Maassa on useita kansalliskieliä.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS4-C04-T03",
      "chapterId": "04",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Mara: Fahren wir morgen in die Schweiz?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C04-T04",
      "chapterId": "04",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Miksi on virheellistä väittää, että Sveitsissä puhuttaisiin vain saksaa?",
      "answerKey": "Tarkista valinta omasta tekstistä ja perustele suomeksi: Maassa on useita kansalliskieliä.. Tokenikohdistus lisättävä ennen automaattista pisteytystä.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS4-C04-T05",
      "chapterId": "04",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: Zürich, die Alpen, der Berg, der See.",
      "answerKey": "Zürich = Zürich; die Alpen = Alpit; der Berg = vuori; der See = järvi",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS4-C04-T06",
      "chapterId": "04",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: Zürich, Alpit, vuori, järvi, valuutta, frangi.",
      "answerKey": "Zürich = Zürich; die Alpen = Alpit; der Berg = vuori; der See = järvi; die Währung = valuutta; der Franken = frangi",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C04-T07",
      "chapterId": "04",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Wir _____ nach Zürich.",
      "answerKey": "fahren",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS4-C04-T08",
      "chapterId": "04",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: Zug. / dem / mit / fahre / Ich.",
      "answerKey": "Ich fahre mit dem Zug.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS4-C04-T09",
      "chapterId": "04",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Matkustan junalla..",
      "answerKey": "Ich fahre mit dem Zug.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS4-C04-T10",
      "chapterId": "04",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Ich fahre mit der Zug. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on mit dem Zug, koska mit vaatii datiivin ja Zug on maskuliini.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS4-C04-T11",
      "chapterId": "04",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö mit/zu/nach sekä yksinkertaiset paikalliset muodot. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Mit tarvitsee datiivin: mit dem Zug, mit der Straßenbahn. Matkakohdetta ilmaistaan usein nach kaupungin kanssa: nach Zürich. Henkilön luo mennään usein zu-rakenteella: zu meiner Freundin. Nämä ovat nyt harjoiteltavia fraaseja; datiivin muiden käyttötapojen täydellinen järjestelmä ei ole tämän kappaleen tavoite.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C04-T12",
      "chapterId": "04",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Miten sanot ‘Menen Zürichiin junalla’?",
      "answerKey": "Ich fahre mit dem Zug nach Zürich.",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS4-C04-T13",
      "chapterId": "04",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Reiseplan: Zug nach Zürich. Abfahrt 08:15, Ankunft 12:10.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Reiseplan: Zug nach Zürich. Abfahrt 08:15, Ankunft 12:10. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C04-T14",
      "chapterId": "04",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -viestiä. Miten vastaanottaja, tavoite ja kielen tyyli eroavat? Kirjoita kaksi havaintoa.",
      "answerKey": "Tukidialogissa on puheenvuorot; Text B on kirjoitettu lyhyt viesti, ilmoitus tai luettelo. Tarkista lisäksi sisältöerot.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C04-T15",
      "chapterId": "04",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Wir fahren nach Zürich. ja Ich gehe zu meiner Freundin.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Wir fahren nach Zürich. | Ich gehe zu meiner Freundin.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS4-C04-T16",
      "chapterId": "04",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Wir fahren nach Zürich.. Varmista, että kysymys sopii tilaisuuteen Vierailu Sveitsiin.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C04-T17",
      "chapterId": "04",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Ich fahre mit dem Zug. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C04-T18",
      "chapterId": "04",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Kerro kaksi asiaa Sveitsistä ja sen kielistä. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS4-C04-T19",
      "chapterId": "04",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Vierailu Sveitsiin. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Mara: Fahren wir morgen in die Schweiz? / Leo: Ja, wir fahren mit dem Zug nach Zürich.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS4-C04-T20",
      "chapterId": "04",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Miten sanot ‘Menen Zürichiin junalla’? (2) Miksi on virheellistä väittää, että Sveitsissä puhuttaisiin vain saksaa?",
      "answerKey": "(1) Ich fahre mit dem Zug nach Zürich. (2) Maassa on useita kansalliskieliä.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS4-C04-R01",
      "chapterId": "04",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Die Schweiz”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Mara besucht Basel in der Schweiz.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C04-R02",
      "chapterId": "04",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Am Bahnhof sieht sie Schilder in deutscher Sprache.",
      "answerKey": "Am Bahnhof sieht sie Schilder in deutscher Sprache.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C04-R03",
      "chapterId": "04",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C04-R04",
      "chapterId": "04",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Aloita sanasta tai ilmauksesta “Mara” vain, jos et tunne sitä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C04-R05",
      "chapterId": "04",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: mit/zu/nach sekä yksinkertaiset paikalliset muodot.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C04-R06",
      "chapterId": "04",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Mara besucht Basel in der Schweiz.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "05": [
    {
      "id": "LOS4-C05-T01",
      "chapterId": "05",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Finnland auf Deutsch ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C05-T02",
      "chapterId": "05",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Mitä Aino kertoo Suomesta?",
      "answerKey": "Siellä on paljon järviä ja metsiä.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS4-C05-T03",
      "chapterId": "05",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Gast: Was gibt es in Finnland?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C05-T04",
      "chapterId": "05",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Mitä Aino kertoo Suomesta?",
      "answerKey": "Tarkista valinta omasta tekstistä ja perustele suomeksi: Siellä on paljon järviä ja metsiä.. Tokenikohdistus lisättävä ennen automaattista pisteytystä.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS4-C05-T05",
      "chapterId": "05",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: Finnland, Helsinki, der Wald, der Winter.",
      "answerKey": "Finnland = Suomi; Helsinki = Helsinki; der Wald = metsä; der Winter = talvi",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS4-C05-T06",
      "chapterId": "05",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: Suomi, Helsinki, metsä, talvi, kesä, järvi.",
      "answerKey": "Finnland = Suomi; Helsinki = Helsinki; der Wald = metsä; der Winter = talvi; der Sommer = kesä; der See = järvi",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C05-T07",
      "chapterId": "05",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: In _____ gibt es viele Seen.",
      "answerKey": "Finnland",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS4-C05-T08",
      "chapterId": "05",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: fahren. / Ski / Winter / im / kann / Man.",
      "answerKey": "Man kann im Winter Ski fahren.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS4-C05-T09",
      "chapterId": "05",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Talvella voi hiihtää..",
      "answerKey": "Man kann im Winter Ski fahren.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS4-C05-T10",
      "chapterId": "05",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Man kann fährt Ski. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Man kann Ski fahren: modaaliverbin jälkeen infinitiivi pysyy lopussa.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS4-C05-T11",
      "chapterId": "05",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö es gibt / man kann / wir haben. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Kolme rakennetta tekevät kuvailusta joustavaa: In Finnland gibt es … (‘Suomessa on’), Man kann … (‘voi tehdä’) ja Wir haben … (‘meillä on’). Es gibt tarvitsee objektin: In Finnland gibt es viele Seen. Kann taas vie toisen verbin infinitiivin loppuun: Man kann im Winter Ski fahren. Muista, että kannanotot ja tilastot ovat eri asia: tarkista faktat ennen kuin kirjoitat väitteen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C05-T12",
      "chapterId": "05",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Täydennä: In Finnland ___ es viele Seen.",
      "answerKey": "gibt",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS4-C05-T13",
      "chapterId": "05",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Finnland: Hauptstadt Helsinki; viele Seen; lange Winter in vielen Regionen.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Finnland: Hauptstadt Helsinki; viele Seen; lange Winter in vielen Regionen. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C05-T14",
      "chapterId": "05",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -viestiä. Miten vastaanottaja, tavoite ja kielen tyyli eroavat? Kirjoita kaksi havaintoa.",
      "answerKey": "Tukidialogissa on puheenvuorot; Text B on kirjoitettu lyhyt viesti, ilmoitus tai luettelo. Tarkista lisäksi sisältöerot.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C05-T15",
      "chapterId": "05",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: In Finnland gibt es viele Seen. ja Wir haben vier Jahreszeiten.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: In Finnland gibt es viele Seen. | Wir haben vier Jahreszeiten.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS4-C05-T16",
      "chapterId": "05",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla In Finnland gibt es viele Seen.. Varmista, että kysymys sopii tilaisuuteen Suomen esitteleminen saksaksi.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C05-T17",
      "chapterId": "05",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Man kann im Winter Ski fahren. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C05-T18",
      "chapterId": "05",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Tuota 8–10 virkkeen Suomi-esittely. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS4-C05-T19",
      "chapterId": "05",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Suomen esitteleminen saksaksi. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Gast: Was gibt es in Finnland? / Aino: Es gibt viele Seen und Wälder.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS4-C05-T20",
      "chapterId": "05",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Täydennä: In Finnland ___ es viele Seen. (2) Mitä Aino kertoo Suomesta?",
      "answerKey": "(1) gibt (2) Siellä on paljon järviä ja metsiä.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS4-C05-R01",
      "chapterId": "05",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Finnland auf Deutsch”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Sofia schreibt für eine Partnerschule in Deutschland einen Text über Finnland.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C05-R02",
      "chapterId": "05",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: „Ich komme aus Finnland“, beginnt sie.",
      "answerKey": "„Ich komme aus Finnland“, beginnt sie.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C05-R03",
      "chapterId": "05",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C05-R04",
      "chapterId": "05",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Aloita sanasta tai ilmauksesta “Sofia” vain, jos et tunne sitä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C05-R05",
      "chapterId": "05",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: es gibt / man kann / wir haben.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C05-R06",
      "chapterId": "05",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Sofia schreibt für eine Partnerschule in Deutschland einen Text über F… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "06": [
    {
      "id": "LOS4-C06-T01",
      "chapterId": "06",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Wie lebt man hier? ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C06-T02",
      "chapterId": "06",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Onko keskustelussa kuvattu tapa kaikkien tapa?",
      "answerKey": "Ei, sitä ei pidä yleistää.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS4-C06-T03",
      "chapterId": "06",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Mika: Was macht man hier am Sonntag?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C06-T04",
      "chapterId": "06",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Onko keskustelussa kuvattu tapa kaikkien tapa?",
      "answerKey": "Tarkista valinta omasta tekstistä ja perustele suomeksi: Ei, sitä ei pidä yleistää.. Tokenikohdistus lisättävä ennen automaattista pisteytystä.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS4-C06-T05",
      "chapterId": "06",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: der Alltag, man, die Regel, die Gewohnheit.",
      "answerKey": "der Alltag = arki; man = ihmiset/yleispersoona; die Regel = sääntö; die Gewohnheit = tapa",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS4-C06-T06",
      "chapterId": "06",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: arki, ihmiset/yleispersoona, sääntö, tapa, tavallinen, tyypillinen.",
      "answerKey": "der Alltag = arki; man = ihmiset/yleispersoona; die Regel = sääntö; die Gewohnheit = tapa; normal = tavallinen; typisch = tyypillinen",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C06-T07",
      "chapterId": "06",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: In _____ Familien isst man abends zusammen.",
      "answerKey": "vielen",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS4-C06-T08",
      "chapterId": "06",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: Hallo. / oft / sagt / Man.",
      "answerKey": "Man sagt oft Hallo.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS4-C06-T09",
      "chapterId": "06",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Usein sanotaan ‘hei’..",
      "answerKey": "Man sagt oft Hallo.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS4-C06-T10",
      "chapterId": "06",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Man essen zusammen. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on man isst zusammen tai man kocht zusammen; man saa yksikön kolmannen persoonan muodon.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS4-C06-T11",
      "chapterId": "06",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö yleistämätön man; tavan ilmaisu. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Man ilmaisee epäpersoonallista tekijää: Man sagt oft …, Man isst manchmal … . Se ei tarkoita, että aivan jokainen tekisi niin. Hyödyllisiä täsmennyksiä ovat oft, manchmal ja in vielen Familien. Myös vertailukieli suojaa liialliselta yleistämiseltä: In einigen Regionen … . Taivutettu verbi on man-pronominin kanssa yksikön kolmannessa persoonassa.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C06-T12",
      "chapterId": "06",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Mikä on oikea: man lernen vai man lernt?",
      "answerKey": "man lernt",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS4-C06-T13",
      "chapterId": "06",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Alltagstipp: Frag die Menschen selbst. Nicht alle machen das Gleiche.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Alltagstipp: Frag die Menschen selbst. Nicht alle machen das Gleiche. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C06-T14",
      "chapterId": "06",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -viestiä. Miten vastaanottaja, tavoite ja kielen tyyli eroavat? Kirjoita kaksi havaintoa.",
      "answerKey": "Tukidialogissa on puheenvuorot; Text B on kirjoitettu lyhyt viesti, ilmoitus tai luettelo. Tarkista lisäksi sisältöerot.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C06-T15",
      "chapterId": "06",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: In vielen Familien isst man abends zusammen. ja Manchmal feiert man zu Hause.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: In vielen Familien isst man abends zusammen. | Manchmal feiert man zu Hause.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS4-C06-T16",
      "chapterId": "06",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla In vielen Familien isst man abends zusammen.. Varmista, että kysymys sopii tilaisuuteen Arjen tapoja vertaillaan.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C06-T17",
      "chapterId": "06",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Man sagt oft Hallo. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C06-T18",
      "chapterId": "06",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Vertaa kahta arkista käytäntöä varovasti. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS4-C06-T19",
      "chapterId": "06",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Arjen tapoja vertaillaan. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Mika: Was macht man hier am Sonntag? / Sara: Viele Leute treffen Freunde oder gehen spazieren.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS4-C06-T20",
      "chapterId": "06",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Mikä on oikea: man lernen vai man lernt? (2) Onko keskustelussa kuvattu tapa kaikkien tapa?",
      "answerKey": "(1) man lernt (2) Ei, sitä ei pidä yleistää.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS4-C06-R01",
      "chapterId": "06",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Wie lebt man hier?”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Annas Familie besucht am Sonntag ihre Großeltern.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C06-R02",
      "chapterId": "06",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Sie essen zusammen und sprechen über die Woche.",
      "answerKey": "Sie essen zusammen und sprechen über die Woche.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C06-R03",
      "chapterId": "06",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C06-R04",
      "chapterId": "06",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Aloita sanasta tai ilmauksesta “Annas” vain, jos et tunne sitä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C06-R05",
      "chapterId": "06",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: yleistämätön man; tavan ilmaisu.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C06-R06",
      "chapterId": "06",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Annas Familie besucht am Sonntag ihre Großeltern.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "07": [
    {
      "id": "LOS4-C07-T01",
      "chapterId": "07",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Zu Besuch ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C07-T02",
      "chapterId": "07",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Miten Ben matkusti viikonloppuna kertomansa mukaan?",
      "answerKey": "Hän meni Bonniin, mutta kulkuneuvo ei ilmene.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS4-C07-T03",
      "chapterId": "07",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Rosa: Was hast du am Wochenende gemacht?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C07-T04",
      "chapterId": "07",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Miten Ben matkusti viikonloppuna kertomansa mukaan?",
      "answerKey": "Tarkista valinta omasta tekstistä ja perustele suomeksi: Hän meni Bonniin, mutta kulkuneuvo ei ilmene.. Tokenikohdistus lisättävä ennen automaattista pisteytystä.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS4-C07-T05",
      "chapterId": "07",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: der Besuch, zu Besuch, mitbringen, das Geschenk.",
      "answerKey": "der Besuch = vierailu; zu Besuch = vierailulla; mitbringen = tuoda mukanaan; das Geschenk = lahja",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS4-C07-T06",
      "chapterId": "07",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: vierailu, vierailulla, tuoda mukanaan, lahja, kutsua, saapua.",
      "answerKey": "der Besuch = vierailu; zu Besuch = vierailulla; mitbringen = tuoda mukanaan; das Geschenk = lahja; einladen = kutsua; ankommen = saapua",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C07-T07",
      "chapterId": "07",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Ich _____ meine Freundin besucht.",
      "answerKey": "habe",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS4-C07-T08",
      "chapterId": "07",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: gefahren. / Berlin / nach / sind / Wir.",
      "answerKey": "Wir sind nach Berlin gefahren.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS4-C07-T09",
      "chapterId": "07",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Matkustimme Berliiniin..",
      "answerKey": "Wir sind nach Berlin gefahren.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS4-C07-T10",
      "chapterId": "07",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Ich habe nach Berlin gefahren. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Ich bin nach Berlin gefahren, kun fahren ilmaisee siirtymistä paikasta toiseen.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS4-C07-T11",
      "chapterId": "07",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö Perfekt alkeena: haben/sein ja yleiset partisiipit. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Perfekt muodostuu apuverbistä haben tai sein ja pääverbin partisiipista. Ich habe Berlin besucht. Ich bin nach Berlin gefahren. Haben käytetään monien verbien kanssa, sein esimerkiksi paikasta toiseen siirtymistä ilmaisevan fahren-verbin kanssa tässä merkityksessä. Apuverbi taipuu toisella paikalla, partisiippi tulee yleensä loppuun. Partisiippimuotoja kannattaa opetella verbin yhteydessä, ei arvata.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C07-T12",
      "chapterId": "07",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Täydennä: Wir ___ nach Wien gefahren. (sein)",
      "answerKey": "sind",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS4-C07-T13",
      "chapterId": "07",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Nachricht: Danke für deinen Besuch am Samstag! Es war schön.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Nachricht: Danke für deinen Besuch am Samstag! Es war schön. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C07-T14",
      "chapterId": "07",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -viestiä. Miten vastaanottaja, tavoite ja kielen tyyli eroavat? Kirjoita kaksi havaintoa.",
      "answerKey": "Tukidialogissa on puheenvuorot; Text B on kirjoitettu lyhyt viesti, ilmoitus tai luettelo. Tarkista lisäksi sisältöerot.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C07-T15",
      "chapterId": "07",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Ich habe meine Freundin besucht. ja Ich habe viel gelernt.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Ich habe meine Freundin besucht. | Ich habe viel gelernt.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS4-C07-T16",
      "chapterId": "07",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Ich habe meine Freundin besucht.. Varmista, että kysymys sopii tilaisuuteen Kylässä viikonloppuna.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C07-T17",
      "chapterId": "07",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Wir sind nach Berlin gefahren. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C07-T18",
      "chapterId": "07",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Kirjoita kiitosviesti ja kerro mitä teitte. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS4-C07-T19",
      "chapterId": "07",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Kylässä viikonloppuna. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Rosa: Was hast du am Wochenende gemacht? / Ben: Ich habe Freunde besucht.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS4-C07-T20",
      "chapterId": "07",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Täydennä: Wir ___ nach Wien gefahren. (sein) (2) Miten Ben matkusti viikonloppuna kertomansa mukaan?",
      "answerKey": "(1) sind (2) Hän meni Bonniin, mutta kulkuneuvo ei ilmene.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS4-C07-R01",
      "chapterId": "07",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Zu Besuch”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Letzten Sommer hat Tom seine Tante in Hamburg besucht.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C07-R02",
      "chapterId": "07",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Er ist mit dem Zug gefahren.",
      "answerKey": "Er ist mit dem Zug gefahren.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C07-R03",
      "chapterId": "07",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C07-R04",
      "chapterId": "07",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Aloita sanasta tai ilmauksesta “Letzten” vain, jos et tunne sitä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C07-R05",
      "chapterId": "07",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: Perfekt alkeena: haben/sein ja yleiset partisiipit.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C07-R06",
      "chapterId": "07",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Letzten Sommer hat Tom seine Tante in Hamburg besucht.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "08": [
    {
      "id": "LOS4-C08-T01",
      "chapterId": "08",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Feste und Traditionen ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C08-T02",
      "chapterId": "08",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Mitä juhlapäivänä tehtiin?",
      "answerKey": "Syötiin yhdessä.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS4-C08-T03",
      "chapterId": "08",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Aylin: Habt ihr gestern gefeiert?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C08-T04",
      "chapterId": "08",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Mitä juhlapäivänä tehtiin?",
      "answerKey": "Tarkista valinta omasta tekstistä ja perustele suomeksi: Syötiin yhdessä.. Tokenikohdistus lisättävä ennen automaattista pisteytystä.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS4-C08-T05",
      "chapterId": "08",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: das Fest, der Feiertag, Weihnachten, Ostern.",
      "answerKey": "das Fest = juhla; der Feiertag = juhlapäivä; Weihnachten = joulu; Ostern = pääsiäinen",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS4-C08-T06",
      "chapterId": "08",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: juhla, juhlapäivä, joulu, pääsiäinen, syntymäpäivä, juhlia.",
      "answerKey": "das Fest = juhla; der Feiertag = juhlapäivä; Weihnachten = joulu; Ostern = pääsiäinen; der Geburtstag = syntymäpäivä; feiern = juhlia",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C08-T07",
      "chapterId": "08",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Wir _____ gestern gefeiert.",
      "answerKey": "haben",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS4-C08-T08",
      "chapterId": "08",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: gegessen. / Kuchen / habe / Ich.",
      "answerKey": "Ich habe Kuchen gegessen.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS4-C08-T09",
      "chapterId": "08",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Söin kakkua..",
      "answerKey": "Ich habe Kuchen gegessen.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS4-C08-T10",
      "chapterId": "08",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Wir sind Kuchen gegessen. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Wir haben Kuchen gegessen, sillä essen muodostaa Perfektin haben-apuverbillä.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS4-C08-T11",
      "chapterId": "08",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö Perfektin kertaus, ajanmääreet. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Säännöllisten verbien Perfektissä esiintyy usein ge-…-t: machen → gemacht, feiern → gefeiert. Epäsäännölliset partisiipit on muistettava erikseen: essen → gegessen, gehen → gegangen. Valitse apuverbi verbin mukaan: Wir haben gefeiert, Wir sind nach Hause gegangen. Käytä ajanmääreitä gestern ja letztes Jahr varmistamaan, että lukija tietää, milloin asia tapahtui.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C08-T12",
      "chapterId": "08",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Täydennä: Wir ___ zusammen gefeiert. (haben)",
      "answerKey": "haben",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS4-C08-T13",
      "chapterId": "08",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Einladung: Wir feiern am Samstag um 17 Uhr. Bitte bringt etwas zu essen mit.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Einladung: Wir feiern am Samstag um 17 Uhr. Bitte bringt etwas zu essen mit. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C08-T14",
      "chapterId": "08",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -viestiä. Miten vastaanottaja, tavoite ja kielen tyyli eroavat? Kirjoita kaksi havaintoa.",
      "answerKey": "Tukidialogissa on puheenvuorot; Text B on kirjoitettu lyhyt viesti, ilmoitus tai luettelo. Tarkista lisäksi sisältöerot.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C08-T15",
      "chapterId": "08",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Wir haben gestern gefeiert. ja Wir sind nach Hause gegangen.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Wir haben gestern gefeiert. | Wir sind nach Hause gegangen.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS4-C08-T16",
      "chapterId": "08",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Wir haben gestern gefeiert.. Varmista, että kysymys sopii tilaisuuteen Juhlapäivästä kertominen.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C08-T17",
      "chapterId": "08",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Ich habe Kuchen gegessen. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C08-T18",
      "chapterId": "08",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Esittele valitsemasi juhla lyhyesti. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS4-C08-T19",
      "chapterId": "08",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Juhlapäivästä kertominen. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Aylin: Habt ihr gestern gefeiert? / Max: Ja, wir haben zusammen gegessen.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS4-C08-T20",
      "chapterId": "08",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Täydennä: Wir ___ zusammen gefeiert. (haben) (2) Mitä juhlapäivänä tehtiin?",
      "answerKey": "(1) haben (2) Syötiin yhdessä.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS4-C08-R01",
      "chapterId": "08",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Feste und Traditionen”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Die Klasse vergleicht Feste und Traditionen.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C08-R02",
      "chapterId": "08",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Mara erzählt: „Wir haben letztes Jahr im Dezember Plätzchen gebacken.“ Paul hat mit seiner Familie einen anderen Feiertag gefeiert.",
      "answerKey": "Mara erzählt: „Wir haben letztes Jahr im Dezember Plätzchen gebacken.“ Paul hat mit seiner Familie einen anderen Feiertag gefeiert.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C08-R03",
      "chapterId": "08",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C08-R04",
      "chapterId": "08",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Aloita sanasta tai ilmauksesta “Die” vain, jos et tunne sitä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C08-R05",
      "chapterId": "08",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: Perfektin kertaus, ajanmääreet.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C08-R06",
      "chapterId": "08",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Die Klasse vergleicht Feste und Traditionen.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "09": [
    {
      "id": "LOS4-C09-T01",
      "chapterId": "09",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Was ist anders? ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C09-T02",
      "chapterId": "09",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Mitä Olli sanoo pitävänsä talvesta?",
      "answerKey": "Koska hän hiihtää mielellään.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS4-C09-T03",
      "chapterId": "09",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Lena: Ist der Winter in Finnland kälter als in Deutschland?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C09-T04",
      "chapterId": "09",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Mitä Olli sanoo pitävänsä talvesta?",
      "answerKey": "Tarkista valinta omasta tekstistä ja perustele suomeksi: Koska hän hiihtää mielellään.. Tokenikohdistus lisättävä ennen automaattista pisteytystä.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS4-C09-T05",
      "chapterId": "09",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: größer, kleiner, anders, ähnlich.",
      "answerKey": "größer = suurempi; kleiner = pienempi; anders = erilainen; ähnlich = samankaltainen",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS4-C09-T06",
      "chapterId": "09",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: suurempi, pienempi, erilainen, samankaltainen, koska, kiinnostava.",
      "answerKey": "größer = suurempi; kleiner = pienempi; anders = erilainen; ähnlich = samankaltainen; weil = koska; interessant = kiinnostava",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C09-T07",
      "chapterId": "09",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Die _____ ist kleiner als Berlin.",
      "answerKey": "Stadt",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS4-C09-T08",
      "chapterId": "09",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: ist. / ruhig / er / weil / Park, / den / mag / Ich.",
      "answerKey": "Ich mag den Park, weil er ruhig ist.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS4-C09-T09",
      "chapterId": "09",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Pidän puistosta, koska se on rauhallinen..",
      "answerKey": "Ich mag den Park, weil er ruhig ist.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS4-C09-T10",
      "chapterId": "09",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause weil sie ist ruhig. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on weil sie ruhig ist; weil siirtää taivutetun verbin sivulauseen loppuun.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS4-C09-T11",
      "chapterId": "09",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö komparatiivi; weil perustelussa. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Komparatiivin kanssa käytät als: größer als, ruhiger als. Kun selität syyn, voit käyttää weil-sivulausetta. Sen jälkeen taivutettu verbi tulee sivulauseen loppuun: Ich mag die Stadt, weil sie lebendig ist. Weil-lause erotetaan päälauseesta pilkulla. Ero tavalliseen väitelauseeseen on suuri: Die Stadt ist lebendig, mutta weil die Stadt lebendig ist.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C09-T12",
      "chapterId": "09",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Täydennä: Ich mag Wien, weil es schön ___ .",
      "answerKey": "ist",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS4-C09-T13",
      "chapterId": "09",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Reiseinfo: Temperaturen unterscheiden sich je nach Ort und Jahreszeit.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Reiseinfo: Temperaturen unterscheiden sich je nach Ort und Jahreszeit. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C09-T14",
      "chapterId": "09",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -viestiä. Miten vastaanottaja, tavoite ja kielen tyyli eroavat? Kirjoita kaksi havaintoa.",
      "answerKey": "Tukidialogissa on puheenvuorot; Text B on kirjoitettu lyhyt viesti, ilmoitus tai luettelo. Tarkista lisäksi sisältöerot.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C09-T15",
      "chapterId": "09",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Die Stadt ist kleiner als Berlin. ja Diese Stadt ist so schön wie jene.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Die Stadt ist kleiner als Berlin. | Diese Stadt ist so schön wie jene.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS4-C09-T16",
      "chapterId": "09",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Die Stadt ist kleiner als Berlin.. Varmista, että kysymys sopii tilaisuuteen Kahden maan arkea verrataan.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C09-T17",
      "chapterId": "09",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Ich mag den Park, weil er ruhig ist. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C09-T18",
      "chapterId": "09",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Vertaile havaintoja ilman kaikki/aina-väitteitä. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS4-C09-T19",
      "chapterId": "09",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Kahden maan arkea verrataan. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Lena: Ist der Winter in Finnland kälter als in Deutschland? / Olli: Oft ja, aber das hängt vom Ort ab.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS4-C09-T20",
      "chapterId": "09",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Täydennä: Ich mag Wien, weil es schön ___ . (2) Mitä Olli sanoo pitävänsä talvesta?",
      "answerKey": "(1) ist (2) Koska hän hiihtää mielellään.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS4-C09-R01",
      "chapterId": "09",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Was ist anders?”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Mia hat zwei kurze Reiseberichte gelesen: einen aus Deutschland und einen aus Finnland.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C09-R02",
      "chapterId": "09",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Im ersten Text fährt eine Person oft mit dem Fahrrad zur Arbeit.",
      "answerKey": "Im ersten Text fährt eine Person oft mit dem Fahrrad zur Arbeit.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C09-R03",
      "chapterId": "09",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C09-R04",
      "chapterId": "09",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Aloita sanasta tai ilmauksesta “Mia” vain, jos et tunne sitä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C09-R05",
      "chapterId": "09",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: komparatiivi; weil perustelussa.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS4-C09-R06",
      "chapterId": "09",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Mia hat zwei kurze Reiseberichte gelesen: einen aus Deutschland und ei… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ]
};
