import type { LosFutureExerciseDraft } from "./losFutureExerciseTypes";
/** LOS! 8: 260 kirjakohtaista tehtävää; kielellinen ja arvioinnin tarkistus kesken. */
export const LOS_FUTURE_EXERCISES_8: Record<string, LosFutureExerciseDraft[]> = {
  "10": [
    {
      "id": "LOS8-C10-T01",
      "chapterId": "10",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Mein Medienprojekt ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C10-T02",
      "chapterId": "10",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Mikä on Leon lopputyön aihe?",
      "answerKey": "Koulumatka.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS8-C10-T03",
      "chapterId": "10",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "5 puheenvuoroa. Ensimmäinen: Lehrerin: Was ist dein Thema?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C10-T04",
      "chapterId": "10",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Miten Mia kerää tietoa?",
      "answerKey": "Tarkka saksankielinen ilmaus: Zwei Artikel und eine Umfrage.\nMalliselitys: Kahdesta artikkelista ja kyselystä.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS8-C10-T05",
      "chapterId": "10",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: das Medienprojekt, die Quelle, die Zielgruppe, die Aussage.",
      "answerKey": "das Medienprojekt = mediaprojekti; die Quelle = lähde; die Zielgruppe = kohderyhmä; die Aussage = väite",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS8-C10-T06",
      "chapterId": "10",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: mediaprojekti, lähde, kohderyhmä, väite, tarkistaa, tiivistää.",
      "answerKey": "das Medienprojekt = mediaprojekti; die Quelle = lähde; die Zielgruppe = kohderyhmä; die Aussage = väite; überprüfen = tarkistaa; zusammenfassen = tiivistää",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C10-T07",
      "chapterId": "10",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Laut _____ Artikel beginnt das Projekt morgen.",
      "answerKey": "dem",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS8-C10-T08",
      "chapterId": "10",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: ist. / wichtig / das / dass / denke, / Ich.",
      "answerKey": "Ich denke, dass das wichtig ist.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS8-C10-T09",
      "chapterId": "10",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Ajattelen, että se on tärkeää..",
      "answerKey": "Ich denke, dass das wichtig ist.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS8-C10-T10",
      "chapterId": "10",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Deshalb ich möchte mehr wissen. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Deshalb möchte ich mehr wissen.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS8-C10-T11",
      "chapterId": "10",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö koko oppimäärän rakenteet, vastaanottaja. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Rakenna oma vastaus: Das Thema ist …, Laut dem Artikel …, Ich denke, dass … ja Ich finde das wichtig, weil … . Erota uutisen sisältö, oma mielipide ja mahdollinen epävarmuus. Tarkista weil/dass-sivulauseen verbin paikka sekä deshalb-lauseen verbi toisena. A2.1-tasolla tavoitteena on lyhyt ymmärrettävä viesti, ei pitkän analyyttisen esseen kirjoittaminen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C10-T12",
      "chapterId": "10",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Täydennä: Ich glaube, dass das Thema wichtig ___ .",
      "answerKey": "ist",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS8-C10-T13",
      "chapterId": "10",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Projektcheck: Thema, zwei Quellen, Quellenangaben, Fakten/Meinungen markieren.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Projektcheck: Thema, zwei Quellen, Quellenangaben, Fakten/Meinungen markieren. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C10-T14",
      "chapterId": "10",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C10-T15",
      "chapterId": "10",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Laut dem Artikel beginnt das Projekt morgen. ja Deshalb möchte ich mehr wissen.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Laut dem Artikel beginnt das Projekt morgen. | Deshalb möchte ich mehr wissen.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS8-C10-T16",
      "chapterId": "10",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Laut dem Artikel beginnt das Projekt morgen.. Varmista, että kysymys sopii tilaisuuteen Oman mediaprojektin suunnittelu.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C10-T17",
      "chapterId": "10",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Ich denke, dass das wichtig ist. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C10-T18",
      "chapterId": "10",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Tee pieni uutiskirje, podcast-käsikirjoitus tai selitysartikkeli. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS8-C10-T19",
      "chapterId": "10",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Oman mediaprojektin suunnittelu. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Lehrerin: Was ist dein Thema? / Mia: Wie Jugendliche Nachrichten lesen.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS8-C10-T20",
      "chapterId": "10",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Täydennä: Ich glaube, dass das Thema wichtig ___ . (2) Miten Mia kerää tietoa?",
      "answerKey": "(1) ist (2) Kahdesta artikkelista ja kyselystä.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS8-C10-R01",
      "chapterId": "10",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Mein Medienprojekt”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Für das Abschlussprojekt erstellt Leo einen kleinen Medienbeitrag.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C10-R02",
      "chapterId": "10",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Er wählt das Thema „Unterwegs zur Schule“.",
      "answerKey": "Er wählt das Thema „Unterwegs zur Schule“.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C10-R03",
      "chapterId": "10",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C10-R04",
      "chapterId": "10",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Aloita sanasta tai ilmauksesta “Für” vain, jos et tunne sitä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C10-R05",
      "chapterId": "10",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: koko oppimäärän rakenteet, vastaanottaja.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C10-R06",
      "chapterId": "10",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Für das Abschlussprojekt erstellt Leo einen kleinen Medienbeitrag.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "01": [
    {
      "id": "LOS8-C01-T01",
      "chapterId": "01",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Was ist heute los? ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C01-T02",
      "chapterId": "01",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Mitä Mira tekee, jos uutisen päivämäärä puuttuu?",
      "answerKey": "Hän etsii lisätietoja viralliselta sivulta.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS8-C01-T03",
      "chapterId": "01",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Mira: Was ist heute passiert?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C01-T04",
      "chapterId": "01",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Mitä kaupungissa avataan?",
      "answerKey": "Tarkka saksankielinen ilmaus: Die Stadt eröffnet einen neuen Park.\nMalliselitys: Uusi puisto.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS8-C01-T05",
      "chapterId": "01",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: die Nachricht, die Zeitung, der Bericht, die Überschrift.",
      "answerKey": "die Nachricht = uutinen; die Zeitung = sanomalehti; der Bericht = raportti; die Überschrift = otsikko",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS8-C01-T06",
      "chapterId": "01",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: uutinen, sanomalehti, raportti, otsikko, kysymys, kuka.",
      "answerKey": "die Nachricht = uutinen; die Zeitung = sanomalehti; der Bericht = raportti; die Überschrift = otsikko; die Frage = kysymys; wer = kuka",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C01-T07",
      "chapterId": "01",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Heute _____ ein Festival.",
      "answerKey": "beginnt",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS8-C01-T08",
      "chapterId": "01",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: statt. / Berlin / in / findet / Festival / Das.",
      "answerKey": "Das Festival findet in Berlin statt.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS8-C01-T09",
      "chapterId": "01",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Festivaali järjestetään Berliinissä..",
      "answerKey": "Das Festival findet in Berlin statt.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS8-C01-T10",
      "chapterId": "01",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Heute ein Festival beginnt. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Heute beginnt ein Festival, koska verbi on toisella paikalla.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS8-C01-T11",
      "chapterId": "01",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö kuka, mitä, missä, milloin; sanajärjestyksen kertaus. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "W-kysymykset Wer? Was? Wo? Wann? ovat uutistekstin lukijan työkaluja. Tavallisessa väitelauseessa taivutettu verbi on toisena: Heute beginnt ein Festival. Kun alussa on Heute, subjektia ei sijoiteta automaattisesti sen jälkeen ennen verbiä. Uutisessa voi olla myös menneitä muotoja; tunnista Perfekt ja tavallisimmat Präteritum-muodot.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C01-T12",
      "chapterId": "01",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Mikä kysymyssana kysyy aikaa?",
      "answerKey": "Wann?",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS8-C01-T13",
      "chapterId": "01",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Lokalnachricht: Neuer Park öffnet am Samstag. Adresse: Marktstraße 10.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Lokalnachricht: Neuer Park öffnet am Samstag. Adresse: Marktstraße 10. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C01-T14",
      "chapterId": "01",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C01-T15",
      "chapterId": "01",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Heute beginnt ein Festival. ja Wann beginnt das Festival?. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Heute beginnt ein Festival. | Wann beginnt das Festival?. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS8-C01-T16",
      "chapterId": "01",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Heute beginnt ein Festival.. Varmista, että kysymys sopii tilaisuuteen Uutisen perustietoja etsitään.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C01-T17",
      "chapterId": "01",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Das Festival findet in Berlin statt. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C01-T18",
      "chapterId": "01",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Kirjoita yhden uutisen 3 lauseen tiivistelmä. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS8-C01-T19",
      "chapterId": "01",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Uutisen perustietoja etsitään. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Mira: Was ist heute passiert? / Leo: Die Stadt eröffnet einen neuen Park.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS8-C01-T20",
      "chapterId": "01",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Mikä kysymyssana kysyy aikaa? (2) Mitä kaupungissa avataan?",
      "answerKey": "(1) Wann? (2) Uusi puisto.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS8-C01-R01",
      "chapterId": "01",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Was ist heute los?”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Heute liest Mira drei kurze Meldungen.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C01-R02",
      "chapterId": "01",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: In der ersten geht es um eine neue Buslinie.",
      "answerKey": "In der ersten geht es um eine neue Buslinie.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C01-R03",
      "chapterId": "01",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C01-R04",
      "chapterId": "01",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Aloita sanasta tai ilmauksesta “Heute” vain, jos et tunne sitä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C01-R05",
      "chapterId": "01",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: kuka, mitä, missä, milloin; sanajärjestyksen kertaus.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C01-R06",
      "chapterId": "01",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Heute liest Mira drei kurze Meldungen.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "02": [
    {
      "id": "LOS8-C02-T01",
      "chapterId": "02",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Medien in meinem Alltag ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C02-T02",
      "chapterId": "02",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Mitä Paul tekee aamuisin puhelimellaan?",
      "answerKey": "Lukee uutisia.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS8-C02-T03",
      "chapterId": "02",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Anna: Liest du Nachrichten auf dem Handy?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C02-T04",
      "chapterId": "02",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Milloin Tom lukee uutisia yleensä?",
      "answerKey": "Tarkka saksankielinen ilmaus: meistens am Morgen.\nMalliselitys: Aamulla.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS8-C02-T05",
      "chapterId": "02",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: die Medien, das Handy, die App, das Internet.",
      "answerKey": "die Medien = media; das Handy = puhelin; die App = sovellus; das Internet = internet",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS8-C02-T06",
      "chapterId": "02",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: media, puhelin, sovellus, internet, verkossa, lukea.",
      "answerKey": "die Medien = media; das Handy = puhelin; die App = sovellus; das Internet = internet; online = verkossa; lesen = lukea",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C02-T07",
      "chapterId": "02",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Ich _____ oft Nachrichten.",
      "answerKey": "lese",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS8-C02-T08",
      "chapterId": "02",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: Podcasts. / manchmal / höre / Ich.",
      "answerKey": "Ich höre manchmal Podcasts.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS8-C02-T09",
      "chapterId": "02",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Kuuntelen joskus podcasteja..",
      "answerKey": "Ich höre manchmal Podcasts.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS8-C02-T10",
      "chapterId": "02",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Ich lese Nachrichten oft jeden Tag. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Valitse yksi selkeä ajan tai tiheyden ilmaus: Ich lese jeden Tag Nachrichten tai Ich lese oft Nachrichten.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS8-C02-T11",
      "chapterId": "02",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö häufigkeitsadverbit, koska-perustelut. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Häufigkeitsadverbit oft, selten, manchmal ja jeden Tag auttavat kuvaamaan käyttöä. Ich lese oft Nachrichten. Jos selität syyn weil-lauseella, siirrä taivutettu verbi loppuun: Ich lese Nachrichten, weil ich informiert sein möchte. Tässä on kaksi verbimuotoa: möchte taipuu sivulauseen lopussa, sein on infinitiivinä sen edellä. Kokeile aluksi lyhempää: …, weil mich das Thema interessiert.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C02-T12",
      "chapterId": "02",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Täydennä: Ich lese das, weil es mich ___ . (interessieren)",
      "answerKey": "interessiert",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS8-C02-T13",
      "chapterId": "02",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Umfrage: Viele lesen Nachrichten online. Die Antworten unterscheiden sich nach Alter und Gewohnheit.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Umfrage: Viele lesen Nachrichten online. Die Antworten unterscheiden sich nach Alter und Gewohnheit. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C02-T14",
      "chapterId": "02",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C02-T15",
      "chapterId": "02",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Ich lese oft Nachrichten. ja Ich lese das, weil mich das Thema interessiert.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Ich lese oft Nachrichten. | Ich lese das, weil mich das Thema interessiert.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS8-C02-T16",
      "chapterId": "02",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Ich lese oft Nachrichten.. Varmista, että kysymys sopii tilaisuuteen Omasta mediankäytöstä.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C02-T17",
      "chapterId": "02",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Ich höre manchmal Podcasts. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C02-T18",
      "chapterId": "02",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Vertaa kahden median käyttötapoja. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS8-C02-T19",
      "chapterId": "02",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Omasta mediankäytöstä. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Anna: Liest du Nachrichten auf dem Handy? / Tom: Ja, meistens am Morgen.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS8-C02-T20",
      "chapterId": "02",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Täydennä: Ich lese das, weil es mich ___ . (interessieren) (2) Milloin Tom lukee uutisia yleensä?",
      "answerKey": "(1) interessiert (2) Aamulla.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS8-C02-R01",
      "chapterId": "02",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Medien in meinem Alltag”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Paul nutzt sein Handy jeden Tag, aber nicht immer auf die gleiche Weise.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C02-R02",
      "chapterId": "02",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Morgens liest er Nachrichten, mittags schreibt er Freunden und abends hört er manchmal einen Podcast.",
      "answerKey": "Morgens liest er Nachrichten, mittags schreibt er Freunden und abends hört er manchmal einen Podcast.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C02-R03",
      "chapterId": "02",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C02-R04",
      "chapterId": "02",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Aloita sanasta tai ilmauksesta “Paul” vain, jos et tunne sitä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C02-R05",
      "chapterId": "02",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: häufigkeitsadverbit, koska-perustelut.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C02-R06",
      "chapterId": "02",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Paul nutzt sein Handy jeden Tag, aber nicht immer auf die gleiche Weis… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "03": [
    {
      "id": "LOS8-C03-T01",
      "chapterId": "03",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Überschrift oder Inhalt? ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C03-T02",
      "chapterId": "03",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Miksi kahta samasta tapahtumasta kirjoitettua otsikkoa voi tulkita eri tavoin?",
      "answerKey": "Koska niiden sanavalinnat ovat erilaiset.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS8-C03-T03",
      "chapterId": "03",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Mara: Was bedeutet diese Überschrift?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C03-T04",
      "chapterId": "03",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Milloin uusi bussilinja alkaa?",
      "answerKey": "Tarkka saksankielinen ilmaus: die Buslinie am Montag startet.\nMalliselitys: Maanantaina.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS8-C03-T05",
      "chapterId": "03",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: die Überschrift, der Text, das Bild, die Quelle.",
      "answerKey": "die Überschrift = otsikko; der Text = teksti; das Bild = kuva; die Quelle = lähde",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS8-C03-T06",
      "chapterId": "03",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: otsikko, teksti, kuva, lähde, tieto, tosiasia.",
      "answerKey": "die Überschrift = otsikko; der Text = teksti; das Bild = kuva; die Quelle = lähde; die Information = tieto; die Tatsache = tosiasia",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C03-T07",
      "chapterId": "03",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Neue _____ für Busse.",
      "answerKey": "Regeln",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS8-C03-T08",
      "chapterId": "03",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: Regeln. / neue / gelten / Heute.",
      "answerKey": "Heute gelten neue Regeln.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS8-C03-T09",
      "chapterId": "03",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Tänään ovat voimassa uudet säännöt..",
      "answerKey": "Heute gelten neue Regeln.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS8-C03-T10",
      "chapterId": "03",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Heute neue Regeln gelten. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Täydellinen väitelause on Heute gelten neue Regeln. Otsikossa voi olla ellipsi, mutta väitelauseessa ei muuteta perussääntöä.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS8-C03-T11",
      "chapterId": "03",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö otsikkokieli ja tavallinen sanajärjestys. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Otsikossa saatetaan jättää artikkeli tai verbi pois. Esimerkiksi Neue Regeln für Busse on otsikkomainen ilmaus, kun taas Heute gelten neue Regeln für Busse on täydellinen lause. Kun kirjoitat oman neutraalin uutislauseen, käytä tavallista verbi toisena -järjestystä. Otsikon sävyä voi arvioida kysymällä, mitä siinä sanotaan ja mitä jätetään sanomatta.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C03-T12",
      "chapterId": "03",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Muutatko otsikon Neue Regeln für Busse kokonaiseksi lauseeksi verbillä gelten?",
      "answerKey": "Für Busse gelten neue Regeln.",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS8-C03-T13",
      "chapterId": "03",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Titel: Neue Buslinie ab Montag. Text: Die Stadt startet am Montag eine neue Buslinie.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Titel: Neue Buslinie ab Montag. Text: Die Stadt startet am Montag eine neue Buslinie. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C03-T14",
      "chapterId": "03",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C03-T15",
      "chapterId": "03",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Neue Regeln für Busse. ja Der Artikel erklärt die Regeln.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Neue Regeln für Busse. | Der Artikel erklärt die Regeln.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS8-C03-T16",
      "chapterId": "03",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Neue Regeln für Busse.. Varmista, että kysymys sopii tilaisuuteen Otsikon ja uutistekstin ero.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C03-T17",
      "chapterId": "03",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Heute gelten neue Regeln. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C03-T18",
      "chapterId": "03",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Selitä mikä otsikossa on olennaista. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS8-C03-T19",
      "chapterId": "03",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Otsikon ja uutistekstin ero. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Mara: Was bedeutet diese Überschrift? / Ben: „Neue Buslinie ab Montag“.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS8-C03-T20",
      "chapterId": "03",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Muutatko otsikon Neue Regeln für Busse kokonaiseksi lauseeksi verbillä gelten? (2) Milloin uusi bussilinja alkaa?",
      "answerKey": "(1) Für Busse gelten neue Regeln. (2) Maanantaina.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS8-C03-R01",
      "chapterId": "03",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Überschrift oder Inhalt?”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Die Lehrerin zeigt der Klasse zwei Überschriften über dasselbe Ereignis.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C03-R02",
      "chapterId": "03",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Die erste ist ruhig formuliert.",
      "answerKey": "Die erste ist ruhig formuliert.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C03-R03",
      "chapterId": "03",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C03-R04",
      "chapterId": "03",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Aloita sanasta tai ilmauksesta “Die” vain, jos et tunne sitä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C03-R05",
      "chapterId": "03",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: otsikkokieli ja tavallinen sanajärjestys.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C03-R06",
      "chapterId": "03",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Die Lehrerin zeigt der Klasse zwei Überschriften über dasselbe Ereigni… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "04": [
    {
      "id": "LOS8-C04-T01",
      "chapterId": "04",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Fakten oder Meinungen? ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C04-T02",
      "chapterId": "04",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Mikä puistoa koskeva väite on mielipide?",
      "answerKey": "Väite, että puisto on kaupungin kaunein.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS8-C04-T03",
      "chapterId": "04",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Lena: Hier steht: Der Zug fährt um neun Uhr.. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C04-T04",
      "chapterId": "04",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Kumpi tieto on tarkistettavissa aikataulusta?",
      "answerKey": "Tarkka saksankielinen ilmaus: Der Zug fährt um neun Uhr.\nMalliselitys: Lähtöaika 9.00.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS8-C04-T05",
      "chapterId": "04",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: der Fakt, die Meinung, behaupten, glauben.",
      "answerKey": "der Fakt = fakta; die Meinung = mielipide; behaupten = väittää; glauben = uskoa",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS8-C04-T06",
      "chapterId": "04",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: fakta, mielipide, väittää, uskoa, ajatella, lähde.",
      "answerKey": "der Fakt = fakta; die Meinung = mielipide; behaupten = väittää; glauben = uskoa; denken = ajatella; die Quelle = lähde",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C04-T07",
      "chapterId": "04",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Laut _____ Bericht beginnt das Projekt morgen.",
      "answerKey": "dem",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS8-C04-T08",
      "chapterId": "04",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: ist. / wichtig / das / dass / denke, / Ich.",
      "answerKey": "Ich denke, dass das wichtig ist.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS8-C04-T09",
      "chapterId": "04",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Ajattelen, että se on tärkeää..",
      "answerKey": "Ich denke, dass das wichtig ist.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS8-C04-T10",
      "chapterId": "04",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Laut dem Bericht das Projekt beginnt morgen. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Laut dem Bericht beginnt das Projekt morgen.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS8-C04-T11",
      "chapterId": "04",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö ich denke / laut / vielleicht. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Ich denke, dass … kertoo oman käsityksen, vielleicht ilmaisee epävarmuutta ja laut dem Bericht osoittaa lähteen. Lause Laut dem Bericht steigt die Zahl on väite lähteen sisällöstä, ei automaattisesti tarkistettu tosiasia. Kun kirjoitat itsenäisesti, erota Mitä lähde sanoo? ja Mitä minä ajattelen? Kieliopissa huomaa verbi toisena myös lähdeilmauksen jälkeen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C04-T12",
      "chapterId": "04",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Millä sanalla ilmaiset ‘ehkä’?",
      "answerKey": "vielleicht",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS8-C04-T13",
      "chapterId": "04",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Fahrplan: Abfahrt 09:00. Kommentar: Diese Verbindung ist perfekt!. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Fahrplan: Abfahrt 09:00. Kommentar: Diese Verbindung ist perfekt! | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C04-T14",
      "chapterId": "04",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C04-T15",
      "chapterId": "04",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Laut dem Bericht beginnt das Projekt morgen. ja Vielleicht stimmt die Meldung nicht.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Laut dem Bericht beginnt das Projekt morgen. | Vielleicht stimmt die Meldung nicht.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS8-C04-T16",
      "chapterId": "04",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Laut dem Bericht beginnt das Projekt morgen.. Varmista, että kysymys sopii tilaisuuteen Faktoja ja mielipiteitä verrataan.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C04-T17",
      "chapterId": "04",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Ich denke, dass das wichtig ist. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C04-T18",
      "chapterId": "04",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Merkitse perusteltavasti faktat ja mielipiteet. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS8-C04-T19",
      "chapterId": "04",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Faktoja ja mielipiteitä verrataan. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Lena: Hier steht: Der Zug fährt um neun Uhr. / Oli: Das kann man im Fahrplan prüfen.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS8-C04-T20",
      "chapterId": "04",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Millä sanalla ilmaiset ‘ehkä’? (2) Kumpi tieto on tarkistettavissa aikataulusta?",
      "answerKey": "(1) vielleicht (2) Lähtöaika 9.00.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS8-C04-R01",
      "chapterId": "04",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Fakten oder Meinungen?”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "In einem kurzen Onlinebeitrag steht: „Der neue Park wurde am Samstag eröffnet.“ Darunter kommentiert jemand: „Das ist der schönste Park der Stadt.“ Die Klasse vergleicht beide Aussagen.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C04-R02",
      "chapterId": "04",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Die erste lässt sich anhand eines Datums überprüfen.",
      "answerKey": "Die erste lässt sich anhand eines Datums überprüfen.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C04-R03",
      "chapterId": "04",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C04-R04",
      "chapterId": "04",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Aloita sanasta tai ilmauksesta “In” vain, jos et tunne sitä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C04-R05",
      "chapterId": "04",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: ich denke / laut / vielleicht.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C04-R06",
      "chapterId": "04",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: In einem kurzen Onlinebeitrag steht: „Der neue Park wurde am Samstag e… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "05": [
    {
      "id": "LOS8-C05-T01",
      "chapterId": "05",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Soziale Medien ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C05-T02",
      "chapterId": "05",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Miksi Lina ei jaa somessa näkemäänsä väitettä?",
      "answerKey": "Väitteen lähdettä ja alkuperäistä julkaisua ei löydy.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS8-C05-T03",
      "chapterId": "05",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Nina: Hast du die Nachricht gelesen?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C05-T04",
      "chapterId": "05",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Mikä viestissä aiheuttaa epävarmuuden?",
      "answerKey": "Tarkka saksankielinen ilmaus: ich kenne die Quelle nicht.\nMalliselitys: Tom ei tiedä viestin lähdettä.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS8-C05-T05",
      "chapterId": "05",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: die sozialen Medien, der Beitrag, der Kommentar, das Profil.",
      "answerKey": "die sozialen Medien = sosiaalinen media; der Beitrag = julkaisu; der Kommentar = kommentti; das Profil = profiili",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS8-C05-T06",
      "chapterId": "05",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: sosiaalinen media, julkaisu, kommentti, profiili, mainos, julkaista.",
      "answerKey": "die sozialen Medien = sosiaalinen media; der Beitrag = julkaisu; der Kommentar = kommentti; das Profil = profiili; die Werbung = mainos; posten = julkaista",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C05-T07",
      "chapterId": "05",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Lies _____ Artikel!",
      "answerKey": "den",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS8-C05-T08",
      "chapterId": "05",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: Quelle! / die / Prüfe.",
      "answerKey": "Prüfe die Quelle!",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS8-C05-T09",
      "chapterId": "05",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Tarkista lähde!.",
      "answerKey": "Prüfe die Quelle!",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS8-C05-T10",
      "chapterId": "05",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Du lies den Artikel! ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Tavallinen du-imperatiivi on Lies den Artikel! ilman du-pronominia.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS8-C05-T11",
      "chapterId": "05",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö imperatiivi, kohderyhmä, perustelut. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Imperatiivilla voidaan antaa toimintaohje: Lies den Text! tai Lest den Text! Kontekstissa pitää tunnistaa myös kohtelias muoto Lesen Sie bitte den Text! Kun perustelee ohjeen, käytä esimerkiksi weil-sivulausetta: Lies den Artikel, weil er wichtig ist. Älä automaattisesti oleta, että käskymuoto on totuudenmukainen tai turvallinen ohje; arvioi lähde erikseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C05-T12",
      "chapterId": "05",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Miten sanot ‘Tarkista lähde!’ du-muodossa?",
      "answerKey": "Prüfe die Quelle!",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS8-C05-T13",
      "chapterId": "05",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Post: „Alle Schulen sind morgen geschlossen!“ Quelle: nicht angegeben.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Post: „Alle Schulen sind morgen geschlossen!“ Quelle: nicht angegeben. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C05-T14",
      "chapterId": "05",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C05-T15",
      "chapterId": "05",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: **Lies den Artikel! ** ja **Teile die Nachricht nicht sofort! **. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Lies den Artikel!  | Teile die Nachricht nicht sofort! . Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS8-C05-T16",
      "chapterId": "05",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla **Lies den Artikel! **. Varmista, että kysymys sopii tilaisuuteen Sosiaalisen median viesti.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C05-T17",
      "chapterId": "05",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause **Prüfe die Quelle! ** uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C05-T18",
      "chapterId": "05",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Laadi vastuullinen lyhyt yleisöviesti. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS8-C05-T19",
      "chapterId": "05",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Sosiaalisen median viesti. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Nina: Hast du die Nachricht gelesen? / Tom: Ja, aber ich kenne die Quelle nicht.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS8-C05-T20",
      "chapterId": "05",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Miten sanot ‘Tarkista lähde!’ du-muodossa? (2) Mikä viestissä aiheuttaa epävarmuuden?",
      "answerKey": "(1) Prüfe die Quelle! (2) Lähdettä ei ole ilmoitettu.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS8-C05-R01",
      "chapterId": "05",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Soziale Medien”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Lina sieht in sozialen Medien ein Bild mit einer überraschenden Behauptung.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C05-R02",
      "chapterId": "05",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Sie möchte es sofort weiterleiten.",
      "answerKey": "Sie möchte es sofort weiterleiten.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C05-R03",
      "chapterId": "05",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C05-R04",
      "chapterId": "05",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Aloita sanasta tai ilmauksesta “Lina” vain, jos et tunne sitä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C05-R05",
      "chapterId": "05",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: imperatiivi, kohderyhmä, perustelut.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C05-R06",
      "chapterId": "05",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Lina sieht in sozialen Medien ein Bild mit einer überraschenden Behaup… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "06": [
    {
      "id": "LOS8-C06-T01",
      "chapterId": "06",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Umwelt und Klima ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C06-T02",
      "chapterId": "06",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Mitä koulu yrittää vähentää?",
      "answerKey": "Jätteen määrää.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS8-C06-T03",
      "chapterId": "06",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Mila: Fährst du heute mit dem Rad?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C06-T04",
      "chapterId": "06",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Miksi Jan pyöräilee?",
      "answerKey": "Tarkka saksankielinen ilmaus: weil die Strecke kurz ist.\nMalliselitys: Matka on lyhyt.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS8-C06-T05",
      "chapterId": "06",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: die Umwelt, das Klima, die Energie, der Müll.",
      "answerKey": "die Umwelt = ympäristö; das Klima = ilmasto; die Energie = energia; der Müll = roskat",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS8-C06-T06",
      "chapterId": "06",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: ympäristö, ilmasto, energia, roskat, kierrättää, säästää.",
      "answerKey": "die Umwelt = ympäristö; das Klima = ilmasto; die Energie = energia; der Müll = roskat; recyceln = kierrättää; sparen = säästää",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C06-T07",
      "chapterId": "06",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Ich _____ zu Fuß, weil der Weg kurz ist.",
      "answerKey": "gehe",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS8-C06-T08",
      "chapterId": "06",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: Fuß. / zu / ich / gehe / Deshalb / kurz. / ist / Weg / Der.",
      "answerKey": "Der Weg ist kurz. Deshalb gehe ich zu Fuß.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS8-C06-T09",
      "chapterId": "06",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Matka on lyhyt. Siksi kävelen..",
      "answerKey": "Der Weg ist kurz. Deshalb gehe ich zu Fuß.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS8-C06-T10",
      "chapterId": "06",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Deshalb ich fahre Bus. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Deshalb fahre ich mit dem Bus, koska deshalb aloittaa päälauseen.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS8-C06-T11",
      "chapterId": "06",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö weil, deshalb, vertailu. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Weil aloittaa sivulauseen ja vie verbin loppuun: Ich fahre mit dem Bus, weil das praktisch ist. Deshalb tarkoittaa ‘siksi’ ja aloittaa uuden päälauseen: Das ist praktisch. Deshalb fahre ich mit dem Bus. Tässä fahre tulee heti deshalb-sanan jälkeen toiselle lauseenjäsenen paikalle. Ero kannattaa harjoitella rinnakkain.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C06-T12",
      "chapterId": "06",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Muodosta: Es regnet. / Deshalb / ich / bleibe zu Hause.",
      "answerKey": "Es regnet. Deshalb bleibe ich zu Hause.",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS8-C06-T13",
      "chapterId": "06",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Aktionstag: Zu Fuß, mit dem Rad oder mit öffentlichen Verkehrsmitteln.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Aktionstag: Zu Fuß, mit dem Rad oder mit öffentlichen Verkehrsmitteln. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C06-T14",
      "chapterId": "06",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C06-T15",
      "chapterId": "06",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Ich gehe zu Fuß, weil der Weg kurz ist. ja Das Fahrrad ist schneller als der Bus.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Ich gehe zu Fuß, weil der Weg kurz ist. | Das Fahrrad ist schneller als der Bus.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS8-C06-T16",
      "chapterId": "06",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Ich gehe zu Fuß, weil der Weg kurz ist.. Varmista, että kysymys sopii tilaisuuteen Ympäristöstä puhutaan.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C06-T17",
      "chapterId": "06",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Der Weg ist kurz. Deshalb gehe ich zu Fuß. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C06-T18",
      "chapterId": "06",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Kerro yksi arjen valinta ja sen perustelu. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS8-C06-T19",
      "chapterId": "06",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Ympäristöstä puhutaan. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Mila: Fährst du heute mit dem Rad? / Jan: Ja, weil die Strecke kurz ist.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS8-C06-T20",
      "chapterId": "06",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Muodosta: Es regnet. / Deshalb / ich / bleibe zu Hause. (2) Miksi Jan pyöräilee?",
      "answerKey": "(1) Es regnet. Deshalb bleibe ich zu Hause. (2) Matka on lyhyt.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS8-C06-R01",
      "chapterId": "06",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Umwelt und Klima”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Eine Schule möchte weniger Abfall produzieren.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C06-R02",
      "chapterId": "06",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Eine Gruppe misst zuerst, wie viel Papier in einer Woche verbraucht wird.",
      "answerKey": "Eine Gruppe misst zuerst, wie viel Papier in einer Woche verbraucht wird.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C06-R03",
      "chapterId": "06",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C06-R04",
      "chapterId": "06",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Aloita sanasta tai ilmauksesta “Eine” vain, jos et tunne sitä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C06-R05",
      "chapterId": "06",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: weil, deshalb, vertailu.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C06-R06",
      "chapterId": "06",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Eine Schule möchte weniger Abfall produzieren.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "07": [
    {
      "id": "LOS8-C07-T01",
      "chapterId": "07",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Technologie im Wandel ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C07-T02",
      "chapterId": "07",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Millä tavoin Emman isoisä piti aiemmin yhteyttä ystäviinsä?",
      "answerKey": "Lankapuhelimella ja kirjeillä.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS8-C07-T03",
      "chapterId": "07",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Lea: Benutzt du eine Lern-App?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C07-T04",
      "chapterId": "07",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Uskooko Ben tietävänsä varmasti tulevaisuuden?",
      "answerKey": "Tarkka saksankielinen ilmaus: Vielleicht. Ich weiß es nicht.\nMalliselitys: Ei.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS8-C07-T05",
      "chapterId": "07",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: die Technik, die Zukunft, der Computer, die Maschine.",
      "answerKey": "die Technik = tekniikka; die Zukunft = tulevaisuus; der Computer = tietokone; die Maschine = kone",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS8-C07-T06",
      "chapterId": "07",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: tekniikka, tulevaisuus, tietokone, kone, digitaalinen, uusi.",
      "answerKey": "die Technik = tekniikka; die Zukunft = tulevaisuus; der Computer = tietokone; die Maschine = kone; digital = digitaalinen; neu = uusi",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C07-T07",
      "chapterId": "07",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Vielleicht _____ das Projekt größer.",
      "answerKey": "wird",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS8-C07-T08",
      "chapterId": "07",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: verändern. / sich / wird / Technik / Die.",
      "answerKey": "Die Technik wird sich verändern.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS8-C07-T09",
      "chapterId": "07",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Teknologia muuttuu..",
      "answerKey": "Die Technik wird sich verändern.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS8-C07-T10",
      "chapterId": "07",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Vielleicht das Projekt wird größer. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Vielleicht wird das Projekt größer; verbi on toisena.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS8-C07-T11",
      "chapterId": "07",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö siksi/ehkä/tulevaisuus; futuurin kertaus. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Futur I muodostetaan werden + infinitiivi: Die Technik wird sich verändern. Tavallinen preesens ja ajanilmaus voivat myös kertoa tulevasta: Morgen beginnt das Projekt. Vielleicht ilmaisee epävarmuutta; siitä ei tule sivulauseen aloittajaa, joten verbi pysyy toisena: Vielleicht wird das Projekt erfolgreich. Älä muuta mahdollista tapahtumaa varmaksi väitteeksi.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C07-T12",
      "chapterId": "07",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Täydennä: Die Technik ___ sich verändern. (werden, yksikkö)",
      "answerKey": "wird",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS8-C07-T13",
      "chapterId": "07",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Kurztext: Neue Technik kann helfen, aber nicht jedes Problem lösen.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Kurztext: Neue Technik kann helfen, aber nicht jedes Problem lösen. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C07-T14",
      "chapterId": "07",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C07-T15",
      "chapterId": "07",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Vielleicht wird das Projekt größer. ja Morgen beginnt das Projekt.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Vielleicht wird das Projekt größer. | Morgen beginnt das Projekt.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS8-C07-T16",
      "chapterId": "07",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Vielleicht wird das Projekt größer.. Varmista, että kysymys sopii tilaisuuteen Teknologia arjessa.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C07-T17",
      "chapterId": "07",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Die Technik wird sich verändern. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C07-T18",
      "chapterId": "07",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Esitä yksi hyöty ja yksi huoli selkeästi. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS8-C07-T19",
      "chapterId": "07",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Teknologia arjessa. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Lea: Benutzt du eine Lern-App? / Ben: Ja, aber ich lerne auch mit Büchern.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS8-C07-T20",
      "chapterId": "07",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Täydennä: Die Technik ___ sich verändern. (werden, yksikkö) (2) Uskooko Ben tietävänsä varmasti tulevaisuuden?",
      "answerKey": "(1) wird (2) Ei.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS8-C07-R01",
      "chapterId": "07",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Technologie im Wandel”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "In einer Ausstellung geht es um Technik im Alltag.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C07-R02",
      "chapterId": "07",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Ein Bereich zeigt alte Telefone, ein anderer moderne Smartphones.",
      "answerKey": "Ein Bereich zeigt alte Telefone, ein anderer moderne Smartphones.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C07-R03",
      "chapterId": "07",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C07-R04",
      "chapterId": "07",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Aloita sanasta tai ilmauksesta “In” vain, jos et tunne sitä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C07-R05",
      "chapterId": "07",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: siksi/ehkä/tulevaisuus; futuurin kertaus.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C07-R06",
      "chapterId": "07",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: In einer Ausstellung geht es um Technik im Alltag.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "08": [
    {
      "id": "LOS8-C08-T01",
      "chapterId": "08",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Zusammenleben ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C08-T02",
      "chapterId": "08",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Mitä Ben toivoo nuorten yhteiseen tilaan?",
      "answerKey": "Rauhallista opiskelutilaa.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS8-C08-T03",
      "chapterId": "08",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Oskar: Wir brauchen mehr Platz für Fahrräder.. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C08-T04",
      "chapterId": "08",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Miten Mara ehdottaa erimielisyyden käsittelyä?",
      "answerKey": "Tarkka saksankielinen ilmaus: Wir sollten sie fragen.\nMalliselitys: Kysymällä myös muiden toiveita.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS8-C08-T05",
      "chapterId": "08",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: die Gesellschaft, zusammen, die Gemeinschaft, der Mensch.",
      "answerKey": "die Gesellschaft = yhteiskunta; zusammen = yhdessä; die Gemeinschaft = yhteisö; der Mensch = ihminen",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS8-C08-T06",
      "chapterId": "08",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: yhteiskunta, yhdessä, yhteisö, ihminen, sääntö, kunnioittaa.",
      "answerKey": "die Gesellschaft = yhteiskunta; zusammen = yhdessä; die Gemeinschaft = yhteisö; der Mensch = ihminen; die Regel = sääntö; respektieren = kunnioittaa",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C08-T07",
      "chapterId": "08",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Meiner _____ nach ist das wichtig.",
      "answerKey": "Meinung",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS8-C08-T08",
      "chapterId": "08",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: alte. / die / als / besser / ist / Lösung / Diese.",
      "answerKey": "Diese Lösung ist besser als die alte.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS8-C08-T09",
      "chapterId": "08",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Tämä ratkaisu on parempi kuin vanha..",
      "answerKey": "Diese Lösung ist besser als die alte.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS8-C08-T10",
      "chapterId": "08",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Meiner Meinung nach das ist wichtig. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Meiner Meinung nach ist das wichtig.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS8-C08-T11",
      "chapterId": "08",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö vertailu ja mielipideilmaisut. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Komparatiivi kuten wichtiger als tai besser als sopii vertailuun. Mielipide voidaan ilmoittaa Ich finde … tai Meiner Meinung nach … . Jälkimmäinen tulee usein lauseen alkuun, joten verbi on sen jälkeen toisena: Meiner Meinung nach ist das wichtig. Muista, että väite yhteiskunnasta ei muutu faktaksi siksi, että sen lausuu itsevarmasti.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C08-T12",
      "chapterId": "08",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Täydennä: Meiner Meinung nach ___ das wichtig.",
      "answerKey": "ist",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS8-C08-T13",
      "chapterId": "08",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Umfrage: Welche Veränderungen wünschen sich die Bewohnerinnen und Bewohner?. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Umfrage: Welche Veränderungen wünschen sich die Bewohnerinnen und Bewohner? | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C08-T14",
      "chapterId": "08",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C08-T15",
      "chapterId": "08",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Meiner Meinung nach ist das wichtig. ja Ich sehe das anders.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Meiner Meinung nach ist das wichtig. | Ich sehe das anders.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS8-C08-T16",
      "chapterId": "08",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Meiner Meinung nach ist das wichtig.. Varmista, että kysymys sopii tilaisuuteen Yhteisestä kaupunkitilasta.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C08-T17",
      "chapterId": "08",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Diese Lösung ist besser als die alte. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C08-T18",
      "chapterId": "08",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Kuvaa miten ihmiset voivat toimia yhdessä. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS8-C08-T19",
      "chapterId": "08",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Yhteisestä kaupunkitilasta. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Oskar: Wir brauchen mehr Platz für Fahrräder. / Mara: Ich finde auch, dass sichere Wege wichtig sind.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS8-C08-T20",
      "chapterId": "08",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Täydennä: Meiner Meinung nach ___ das wichtig. (2) Miten Mara ehdottaa erimielisyyden käsittelyä?",
      "answerKey": "(1) ist (2) Kysymällä myös muiden toiveita.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS8-C08-R01",
      "chapterId": "08",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Zusammenleben”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Eine Jugendgruppe plant einen offenen Treffpunkt im Stadtteil.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C08-R02",
      "chapterId": "08",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Einige möchten einen ruhigen Raum zum Lernen, andere eine Fläche für Sport.",
      "answerKey": "Einige möchten einen ruhigen Raum zum Lernen, andere eine Fläche für Sport.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C08-R03",
      "chapterId": "08",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C08-R04",
      "chapterId": "08",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Aloita sanasta tai ilmauksesta “Eine” vain, jos et tunne sitä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C08-R05",
      "chapterId": "08",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: vertailu ja mielipideilmaisut.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C08-R06",
      "chapterId": "08",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Eine Jugendgruppe plant einen offenen Treffpunkt im Stadtteil.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "09": [
    {
      "id": "LOS8-C09-T01",
      "chapterId": "09",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Zwei Perspektiven ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C09-T02",
      "chapterId": "09",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Mihin ensimmäinen kahdesta tapahtuma-artikkelista keskittyy?",
      "answerKey": "Tapahtumaan osallistuneiden ihmisten määrään.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS8-C09-T03",
      "chapterId": "09",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Nina: Ich fahre gern mit dem Bus.. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C09-T04",
      "chapterId": "09",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Mikä on Leon näkökulma?",
      "answerKey": "Tarkka saksankielinen ilmaus: Zu Fuß sehe ich mehr von der Stadt.\nMalliselitys: Kävellen näkee enemmän kaupunkia.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS8-C09-T05",
      "chapterId": "09",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: die Perspektive, dafür, dagegen, aber.",
      "answerKey": "die Perspektive = näkökulma; dafür = puolesta; dagegen = vastaan; aber = mutta",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS8-C09-T06",
      "chapterId": "09",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: näkökulma, puolesta, vastaan, mutta, toisaalta, toisaalta.",
      "answerKey": "die Perspektive = näkökulma; dafür = puolesta; dagegen = vastaan; aber = mutta; einerseits = toisaalta; andererseits = toisaalta",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C09-T07",
      "chapterId": "09",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Einerseits _____ das praktisch.",
      "answerKey": "ist",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS8-C09-T08",
      "chapterId": "09",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: Geld. / viel / es / kostet / Andererseits.",
      "answerKey": "Andererseits kostet es viel Geld.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS8-C09-T09",
      "chapterId": "09",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Toisaalta se maksaa paljon rahaa..",
      "answerKey": "Andererseits kostet es viel Geld.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS8-C09-T10",
      "chapterId": "09",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Andererseits es kostet viel Geld. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Andererseits kostet es viel Geld.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS8-C09-T11",
      "chapterId": "09",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö aber, einerseits/andererseits tunnistuksena. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Einerseits … andererseits … auttaa asettamaan kaksi puolta rinnakkain. Ne voivat aloittaa päälauseen, jolloin verbi tulee seuraavaksi: Einerseits ist das praktisch. Andererseits kostet es Geld. Myös aber on käyttökelpoinen: Ich verstehe den Punkt, aber ich sehe das anders. Kahden näkökulman esittäminen ei tarkoita, että kaikkia väitteitä pitäisi pitää yhtä hyvin perusteltuina.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C09-T12",
      "chapterId": "09",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Käännä ‘Toisaalta se on kallista’.",
      "answerKey": "Andererseits ist es teuer.",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS8-C09-T13",
      "chapterId": "09",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Meinung A: Der Bus spart Zeit. Meinung B: Zu Fuß sieht man mehr.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Meinung A: Der Bus spart Zeit. Meinung B: Zu Fuß sieht man mehr. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C09-T14",
      "chapterId": "09",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C09-T15",
      "chapterId": "09",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Einerseits ist das praktisch. ja Ich verstehe deinen Punkt, aber ich bin anderer Meinung.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Einerseits ist das praktisch. | Ich verstehe deinen Punkt, aber ich bin anderer Meinung.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS8-C09-T16",
      "chapterId": "09",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Einerseits ist das praktisch.. Varmista, että kysymys sopii tilaisuuteen Kaksi näkökulmaa samaan asiaan.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C09-T17",
      "chapterId": "09",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Andererseits kostet es viel Geld. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C09-T18",
      "chapterId": "09",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Kirjoita lyhyt kunnioittava kannanotto ja mainitse lähteet. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS8-C09-T19",
      "chapterId": "09",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Kaksi näkökulmaa samaan asiaan. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Nina: Ich fahre gern mit dem Bus. / Leo: Ich gehe lieber zu Fuß.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS8-C09-T20",
      "chapterId": "09",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Käännä ‘Toisaalta se on kallista’. (2) Mikä on Leon näkökulma?",
      "answerKey": "(1) Andererseits ist es teuer. (2) Kävellen näkee enemmän kaupunkia.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS8-C09-R01",
      "chapterId": "09",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Zwei Perspektiven”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Zwei Artikel beschreiben dieselbe neue Veranstaltung.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C09-R02",
      "chapterId": "09",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Im ersten steht vor allem, wie viele Menschen gekommen sind.",
      "answerKey": "Im ersten steht vor allem, wie viele Menschen gekommen sind.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C09-R03",
      "chapterId": "09",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C09-R04",
      "chapterId": "09",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Aloita sanasta tai ilmauksesta “Zwei” vain, jos et tunne sitä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C09-R05",
      "chapterId": "09",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: aber, einerseits/andererseits tunnistuksena.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS8-C09-R06",
      "chapterId": "09",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Zwei Artikel beschreiben dieselbe neue Veranstaltung.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ]
};
