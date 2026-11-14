import type { LosFutureExerciseDraft } from "./losFutureExerciseTypes";
/** LOS! 6: 260 kirjakohtaista tehtävää; kielellinen ja arvioinnin tarkistus kesken. */
export const LOS_FUTURE_EXERCISES_6: Record<string, LosFutureExerciseDraft[]> = {
  "10": [
    {
      "id": "LOS6-C10-T01",
      "chapterId": "10",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Mein Kulturprojekt ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C10-T02",
      "chapterId": "10",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Mikä on Mian kulttuuriprojektin aihe?",
      "answerKey": "Musiikki hänen omassa kaupungissaan.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS6-C10-T03",
      "chapterId": "10",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Schülerin: Mein Projekt handelt von Musik.. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C10-T04",
      "chapterId": "10",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Mikä projektin aihe on?",
      "answerKey": "Tarkka saksankielinen ilmaus: Mein Projekt handelt von Musik.\nMalliselitys: Musiikki.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS6-C10-T05",
      "chapterId": "10",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: das Projekt, die Präsentation, das Thema, auswählen.",
      "answerKey": "das Projekt = projekti; die Präsentation = esitys; das Thema = aihe; auswählen = valita",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS6-C10-T06",
      "chapterId": "10",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: projekti, esitys, aihe, valita, selittää, näyttää.",
      "answerKey": "das Projekt = projekti; die Präsentation = esitys; das Thema = aihe; auswählen = valita; erklären = selittää; zeigen = näyttää",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C10-T07",
      "chapterId": "10",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Mein _____ ist Musik.",
      "answerKey": "Thema",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS6-C10-T08",
      "chapterId": "10",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: gelesen. / Quellen / zwei / habe / Ich.",
      "answerKey": "Ich habe zwei Quellen gelesen.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS6-C10-T09",
      "chapterId": "10",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Olen lukenut kaksi lähdettä..",
      "answerKey": "Ich habe zwei Quellen gelesen.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS6-C10-T10",
      "chapterId": "10",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Ich finde das spannend, weil ich mag Musik. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on weil ich Musik mag; sivulauseen verbi tulee loppuun.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS6-C10-T11",
      "chapterId": "10",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö koko kirjan rakenteet; esittelykysymykset. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Hyvä A2.1-tasoinen esitys käyttää lyhyitä, selkeitä rakenteita: Das Thema ist …, Ich habe … gefunden, Ich finde …, weil … ja Zum Schluss … . Käytä vähintään yhtä faktatietoa, yhtä omaa mielipidettä ja yhtä perustelua. Jos lähde sisältää vaikeaa kieltä, tarkista sen merkitys ja muotoile oma lyhyt ilmaus sen sijaan, että kopioisit lauseen ymmärtämättä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C10-T12",
      "chapterId": "10",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Täydennä: Ich finde das interessant, weil es neu ___ .",
      "answerKey": "ist",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS6-C10-T13",
      "chapterId": "10",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Projektplan: Thema, zwei Quellen, fünf Sätze, ein Bild mit Quellenangabe.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Projektplan: Thema, zwei Quellen, fünf Sätze, ein Bild mit Quellenangabe. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C10-T14",
      "chapterId": "10",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -viestiä. Miten vastaanottaja, tavoite ja kielen tyyli eroavat? Kirjoita kaksi havaintoa.",
      "answerKey": "Tukidialogissa on puheenvuorot; Text B on kirjoitettu lyhyt viesti, ilmoitus tai luettelo. Tarkista lisäksi sisältöerot.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C10-T15",
      "chapterId": "10",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Mein Thema ist Musik. ja Ich finde das spannend, weil ich Musik mag.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Mein Thema ist Musik. | Ich finde das spannend, weil ich Musik mag.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS6-C10-T16",
      "chapterId": "10",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Mein Thema ist Musik.. Varmista, että kysymys sopii tilaisuuteen Oman kulttuuriprojektin esittely.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C10-T17",
      "chapterId": "10",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Ich habe zwei Quellen gelesen. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C10-T18",
      "chapterId": "10",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Tee saksankielinen juliste, ääniohjelma, arvostelu tai miniesittely. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS6-C10-T19",
      "chapterId": "10",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Oman kulttuuriprojektin esittely. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Schülerin: Mein Projekt handelt von Musik. / Lehrer: Warum hast du dieses Thema gewählt?. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS6-C10-T20",
      "chapterId": "10",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Täydennä: Ich finde das interessant, weil es neu ___ . (2) Mikä projektin aihe on?",
      "answerKey": "(1) ist (2) Musiikki.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS6-C10-R01",
      "chapterId": "10",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Mein Kulturprojekt”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Mia erstellt ein kleines Kulturprojekt über Musik in ihrer Stadt.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C10-R02",
      "chapterId": "10",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Sie besucht eine öffentliche Veranstaltung, macht Notizen und fragt nach der Erlaubnis, ein Foto zu verwenden.",
      "answerKey": "Sie besucht eine öffentliche Veranstaltung, macht Notizen und fragt nach der Erlaubnis, ein Foto zu verwenden.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C10-R03",
      "chapterId": "10",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C10-R04",
      "chapterId": "10",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Aloita sanasta tai ilmauksesta “Mia” vain, jos et tunne sitä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C10-R05",
      "chapterId": "10",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: koko kirjan rakenteet; esittelykysymykset.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C10-R06",
      "chapterId": "10",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Mia erstellt ein kleines Kulturprojekt über Musik in ihrer Stadt.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "01": [
    {
      "id": "LOS6-C01-T01",
      "chapterId": "01",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Kultur überall ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C01-T02",
      "chapterId": "01",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Mitä Sara mainitsee esimerkkeinä kulttuurista?",
      "answerKey": "Ruoan ja juhlat.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS6-C01-T03",
      "chapterId": "01",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Mira: Was bedeutet Kultur für dich?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C01-T04",
      "chapterId": "01",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Mitä kulttuuri merkitsee Miralle erityisesti?",
      "answerKey": "Tarkka saksankielinen ilmaus: für mich sind Bücher wichtig.\nMalliselitys: Kirjoja.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS6-C01-T05",
      "chapterId": "01",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: die Kultur, das Museum, die Kunst, die Musik.",
      "answerKey": "die Kultur = kulttuuri; das Museum = museo; die Kunst = taide; die Musik = musiikki",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS6-C01-T06",
      "chapterId": "01",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: kulttuuri, museo, taide, musiikki, teatteri, elokuvateatteri.",
      "answerKey": "die Kultur = kulttuuri; das Museum = museo; die Kunst = taide; die Musik = musiikki; das Theater = teatteri; das Kino = elokuvateatteri",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C01-T07",
      "chapterId": "01",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Ich _____ diese Musik spannend.",
      "answerKey": "finde",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS6-C01-T08",
      "chapterId": "01",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: Kunst. / für / mich / interessiere / Ich.",
      "answerKey": "Ich interessiere mich für Kunst.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS6-C01-T09",
      "chapterId": "01",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Olen kiinnostunut taiteesta..",
      "answerKey": "Ich interessiere mich für Kunst.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS6-C01-T10",
      "chapterId": "01",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Ich finde diese Musik ist interessant. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Jos käytät finde + objektia, sano Ich finde diese Musik interessant. Myös Ich finde, dass diese Musik interessant ist on oikein, mutta se on eri rakenne.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS6-C01-T11",
      "chapterId": "01",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö mielipidefraasit; aiemmat rakenteet. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Ich finde … interessant ilmaisee mielipiteen: Ich finde den Film interessant. Ich interessiere mich für … on hieman pidempi mutta hyödyllinen fraasi: Ich interessiere mich für Musik. Keskustelussa voit vastata Das finde ich auch tai Ich sehe das anders. Erottamalla faktan ja oman kokemuksen vältät vahingossa väittämästä makuasiaa yleiseksi totuudeksi.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C01-T12",
      "chapterId": "01",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Täydennä: Ich interessiere mich ___ Musik.",
      "answerKey": "für",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS6-C01-T13",
      "chapterId": "01",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Umfrage: Musik, Sprache, Feste, Kunst und Alltag gehören für viele Menschen zur Kultur.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Umfrage: Musik, Sprache, Feste, Kunst und Alltag gehören für viele Menschen zur Kultur. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C01-T14",
      "chapterId": "01",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -viestiä. Miten vastaanottaja, tavoite ja kielen tyyli eroavat? Kirjoita kaksi havaintoa.",
      "answerKey": "Tukidialogissa on puheenvuorot; Text B on kirjoitettu lyhyt viesti, ilmoitus tai luettelo. Tarkista lisäksi sisältöerot.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C01-T15",
      "chapterId": "01",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Ich finde diese Musik spannend. ja Das sehe ich anders.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Ich finde diese Musik spannend. | Das sehe ich anders.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS6-C01-T16",
      "chapterId": "01",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Ich finde diese Musik spannend.. Varmista, että kysymys sopii tilaisuuteen Kulttuurista vaihdetaan mielipiteitä.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C01-T17",
      "chapterId": "01",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Ich interessiere mich für Kunst. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C01-T18",
      "chapterId": "01",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Kokoa pieni oma kulttuurisanasto. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS6-C01-T19",
      "chapterId": "01",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Kulttuurista vaihdetaan mielipiteitä. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Mira: Was bedeutet Kultur für dich? / Tom: Musik, Filme und auch Essen.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS6-C01-T20",
      "chapterId": "01",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Täydennä: Ich interessiere mich ___ Musik. (2) Mitä kulttuuri merkitsee Miralle erityisesti?",
      "answerKey": "(1) für (2) Kirjoja.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS6-C01-R01",
      "chapterId": "01",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Kultur überall”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Was bedeutet Kultur?",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C01-R02",
      "chapterId": "01",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Im Sprachkurs sammeln die Jugendlichen Ideen.",
      "answerKey": "Im Sprachkurs sammeln die Jugendlichen Ideen.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C01-R03",
      "chapterId": "01",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C01-R04",
      "chapterId": "01",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Aloita sanasta tai ilmauksesta “Was” vain, jos et tunne sitä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C01-R05",
      "chapterId": "01",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: mielipidefraasit; aiemmat rakenteet.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C01-R06",
      "chapterId": "01",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Was bedeutet Kultur?… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "02": [
    {
      "id": "LOS6-C02-T01",
      "chapterId": "02",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Musik aus dem deutschsprachigen Raum ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C02-T02",
      "chapterId": "02",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Mitä kahta musiikkityyliä Nina kuuntelee?",
      "answerKey": "Poppia ja jazzia.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS6-C02-T03",
      "chapterId": "02",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Lena: Hörst du gern Musik auf Deutsch?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C02-T04",
      "chapterId": "02",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Missä Jona on jo käynyt?",
      "answerKey": "Tarkka saksankielinen ilmaus: Ja, letztes Jahr.\nMalliselitys: Konsertissa.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS6-C02-T05",
      "chapterId": "02",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: das Instrument, die Gitarre, das Konzert, die Band.",
      "answerKey": "das Instrument = soitin; die Gitarre = kitara; das Konzert = konsertti; die Band = yhtye",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS6-C02-T06",
      "chapterId": "02",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: soitin, kitara, konsertti, yhtye, laulaja, kappale.",
      "answerKey": "das Instrument = soitin; die Gitarre = kitara; das Konzert = konsertti; die Band = yhtye; die Sängerin = laulaja; das Lied = kappale",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C02-T07",
      "chapterId": "02",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Ich _____ gestern Musik gehört.",
      "answerKey": "habe",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS6-C02-T08",
      "chapterId": "02",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: Rock. / als / Pop / lieber / höre / Ich.",
      "answerKey": "Ich höre lieber Pop als Rock.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS6-C02-T09",
      "chapterId": "02",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Kuuntelen mieluummin poppia kuin rockia..",
      "answerKey": "Ich höre lieber Pop als Rock.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS6-C02-T10",
      "chapterId": "02",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Ich bin Musik gehört. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Ich habe Musik gehört: hören muodostaa Perfektin haben-apuverbillä.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS6-C02-T11",
      "chapterId": "02",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö vertailevat ilmaukset ja Perfekt kokemuksista. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Perfektissä voit sanoa Ich habe das Lied gehört. Verbillä hören on säännöllinen partisiippi gehört. Vertailussa taas Ich mag Pop lieber als Rock. Huomaa, että mieltymyksen vertaaminen ei välttämättä tarkoita laadun objektiivista arviointia. Tekstilajina artistin haastattelu voi sisältää myös vaikeita fraaseja, joita tarkastellaan tunnistamisen tasolla.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C02-T12",
      "chapterId": "02",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Täydennä: Ich ___ das Lied gehört. (haben)",
      "answerKey": "habe",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS6-C02-T13",
      "chapterId": "02",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Konzert: Freitag, 20 Uhr. Karten an der Abendkasse.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Konzert: Freitag, 20 Uhr. Karten an der Abendkasse. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C02-T14",
      "chapterId": "02",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -viestiä. Miten vastaanottaja, tavoite ja kielen tyyli eroavat? Kirjoita kaksi havaintoa.",
      "answerKey": "Tukidialogissa on puheenvuorot; Text B on kirjoitettu lyhyt viesti, ilmoitus tai luettelo. Tarkista lisäksi sisältöerot.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C02-T15",
      "chapterId": "02",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Ich habe gestern Musik gehört. ja Das Konzert war toll.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Ich habe gestern Musik gehört. | Das Konzert war toll.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS6-C02-T16",
      "chapterId": "02",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Ich habe gestern Musik gehört.. Varmista, että kysymys sopii tilaisuuteen Saksankielisestä musiikista puhutaan.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C02-T17",
      "chapterId": "02",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Ich höre lieber Pop als Rock. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C02-T18",
      "chapterId": "02",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Esittele kappaleen aihe omin sanoin, ei sanoituksia. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS6-C02-T19",
      "chapterId": "02",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Saksankielisestä musiikista puhutaan. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Lena: Hörst du gern Musik auf Deutsch? / Jona: Ja, manchmal.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS6-C02-T20",
      "chapterId": "02",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Täydennä: Ich ___ das Lied gehört. (haben) (2) Missä Jona on jo käynyt?",
      "answerKey": "(1) habe (2) Konsertissa.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS6-C02-R01",
      "chapterId": "02",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Musik aus dem deutschsprachigen Raum”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Nina hört auf dem Weg zur Schule oft Musik.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C02-R02",
      "chapterId": "02",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Sie mag Pop, hört aber auch Jazz.",
      "answerKey": "Sie mag Pop, hört aber auch Jazz.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C02-R03",
      "chapterId": "02",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C02-R04",
      "chapterId": "02",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Aloita sanasta tai ilmauksesta “Nina” vain, jos et tunne sitä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C02-R05",
      "chapterId": "02",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: vertailevat ilmaukset ja Perfekt kokemuksista.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C02-R06",
      "chapterId": "02",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Nina hört auf dem Weg zur Schule oft Musik.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "03": [
    {
      "id": "LOS6-C03-T01",
      "chapterId": "03",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Bücher und Geschichten ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C03-T02",
      "chapterId": "03",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Minkä kadonneen tavaran Benin lukeman tarinan henkilö löytää?",
      "answerKey": "Reppunsa.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS6-C03-T03",
      "chapterId": "03",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Nina: Was liest du gerade?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C03-T04",
      "chapterId": "03",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Miten Maxin mukaan tarinan juoni kehittyy?",
      "answerKey": "Tarkka saksankielinen ilmaus: Zuerst passiert wenig, aber dann kommt eine Überraschung.\nMalliselitys: Aluksi tapahtuu vähän, mutta sitten tulee yllätys.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS6-C03-T05",
      "chapterId": "03",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: das Buch, die Geschichte, der Autor, die Autorin.",
      "answerKey": "das Buch = kirja; die Geschichte = tarina; der Autor = kirjailija; die Autorin = kirjailija",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS6-C03-T06",
      "chapterId": "03",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: kirja, tarina, kirjailija, kirjailija, hahmo, kertoa.",
      "answerKey": "das Buch = kirja; die Geschichte = tarina; der Autor = kirjailija; die Autorin = kirjailija; die Figur = hahmo; erzählen = kertoa",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C03-T07",
      "chapterId": "03",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Zuerst _____ sie einen Brief.",
      "answerKey": "liest",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS6-C03-T08",
      "chapterId": "03",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: Hause. / nach / sie / geht / Danach.",
      "answerKey": "Danach geht sie nach Hause.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS6-C03-T09",
      "chapterId": "03",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Sen jälkeen hän menee kotiin..",
      "answerKey": "Danach geht sie nach Hause.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS6-C03-T10",
      "chapterId": "03",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Danach sie geht nach Hause. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Danach geht sie nach Hause.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS6-C03-T11",
      "chapterId": "03",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö aikajärjestyksen ilmaisut. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Zuerst, dann, danach ja am Ende auttavat jäsentämään tapahtumia. Ne voivat aloittaa väitelauseen, jolloin taivutettu verbi on toisena: Danach geht die Figur nach Hause. Menneestä kertovassa tekstissä käytetään usein Perfektiä tai kirjallista Präteritumia. Sinun oma lyhyt kertomuksesi voi käyttää tuttua Perfektiä: Zuerst habe ich gelesen. Danach habe ich geschrieben.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C03-T12",
      "chapterId": "03",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Mikä sana tarkoittaa ‘sen jälkeen’?",
      "answerKey": "danach",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS6-C03-T13",
      "chapterId": "03",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Buchtipp: Kurze Geschichte für Jugendliche. Leichte Sprache, viele Bilder.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Buchtipp: Kurze Geschichte für Jugendliche. Leichte Sprache, viele Bilder. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C03-T14",
      "chapterId": "03",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -viestiä. Miten vastaanottaja, tavoite ja kielen tyyli eroavat? Kirjoita kaksi havaintoa.",
      "answerKey": "Tukidialogissa on puheenvuorot; Text B on kirjoitettu lyhyt viesti, ilmoitus tai luettelo. Tarkista lisäksi sisältöerot.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C03-T15",
      "chapterId": "03",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Zuerst liest sie einen Brief. ja Am Ende ist alles gut.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Zuerst liest sie einen Brief. | Am Ende ist alles gut.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS6-C03-T16",
      "chapterId": "03",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Zuerst liest sie einen Brief.. Varmista, että kysymys sopii tilaisuuteen Kirjasta keskustellaan.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C03-T17",
      "chapterId": "03",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Danach geht sie nach Hause. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C03-T18",
      "chapterId": "03",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Kuvaa tarinan henkilö ja juoni lyhyesti. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS6-C03-T19",
      "chapterId": "03",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Kirjasta keskustellaan. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Nina: Was liest du gerade? / Max: Eine kurze Geschichte.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS6-C03-T20",
      "chapterId": "03",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Mikä sana tarkoittaa ‘sen jälkeen’? (2) Millainen Maxin lukema tarina on?",
      "answerKey": "(1) danach (2) Jännittävä, loppupuolella yllätys.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS6-C03-R01",
      "chapterId": "03",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Bücher und Geschichten”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Ben besucht eine kleine Bibliothek.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C03-R02",
      "chapterId": "03",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Dort findet er eine Sammlung kurzer Geschichten.",
      "answerKey": "Dort findet er eine Sammlung kurzer Geschichten.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C03-R03",
      "chapterId": "03",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C03-R04",
      "chapterId": "03",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Aloita sanasta tai ilmauksesta “Ben” vain, jos et tunne sitä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C03-R05",
      "chapterId": "03",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: aikajärjestyksen ilmaisut.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C03-R06",
      "chapterId": "03",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Ben besucht eine kleine Bibliothek.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "04": [
    {
      "id": "LOS6-C04-T01",
      "chapterId": "04",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Filme und Serien ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C04-T02",
      "chapterId": "04",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Miten Lian mielestä sarjan tarina muuttuu?",
      "answerKey": "Se muuttuu myöhemmin jännittävämmäksi.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS6-C04-T03",
      "chapterId": "04",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Oli: Wie fandest du den Film?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C04-T04",
      "chapterId": "04",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Miksi Sara piti elokuvasta?",
      "answerKey": "Tarkka saksankielinen ilmaus: weil die Geschichte interessant war.\nMalliselitys: Tarina oli kiinnostava.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS6-C04-T05",
      "chapterId": "04",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: der Film, die Serie, der Schauspieler, die Szene.",
      "answerKey": "der Film = elokuva; die Serie = sarja; der Schauspieler = näyttelijä; die Szene = kohtaus",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS6-C04-T06",
      "chapterId": "04",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: elokuva, sarja, näyttelijä, kohtaus, hauska, surullinen.",
      "answerKey": "der Film = elokuva; die Serie = sarja; der Schauspieler = näyttelijä; die Szene = kohtaus; lustig = hauska; traurig = surullinen",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C04-T07",
      "chapterId": "04",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Ich _____ den Film spannend.",
      "answerKey": "finde",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS6-C04-T08",
      "chapterId": "04",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: lustig. / ist / Film / Der.",
      "answerKey": "Der Film ist lustig.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS6-C04-T09",
      "chapterId": "04",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Elokuva on hauska..",
      "answerKey": "Der Film ist lustig.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS6-C04-T10",
      "chapterId": "04",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause weil die Geschichte ist spannend. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on weil die Geschichte spannend ist.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS6-C04-T11",
      "chapterId": "04",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö ich finde; weil; mielipideväitteet. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Ich finde den Film gut kertoo mielipiteen. Lisää syy weil-sivulauseella: Ich mag den Film, weil die Geschichte spannend ist. Jos lainaat jonkun muun mielipidettä, kerro kenestä on kyse: Meine Freundin findet den Film lustig. Adjektiivit kuten spannend ja lustig toimivat predikatiivisessa rakenteessa ilman taivutuspäätettä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C04-T12",
      "chapterId": "04",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Täydennä: Ich mag den Film, weil er spannend ___ .",
      "answerKey": "ist",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS6-C04-T13",
      "chapterId": "04",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Kinokritik: Gute Schauspieler, ruhige Musik, interessante Geschichte.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Kinokritik: Gute Schauspieler, ruhige Musik, interessante Geschichte. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C04-T14",
      "chapterId": "04",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -viestiä. Miten vastaanottaja, tavoite ja kielen tyyli eroavat? Kirjoita kaksi havaintoa.",
      "answerKey": "Tukidialogissa on puheenvuorot; Text B on kirjoitettu lyhyt viesti, ilmoitus tai luettelo. Tarkista lisäksi sisältöerot.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C04-T15",
      "chapterId": "04",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Ich finde den Film spannend. ja Ich mag die Serie, weil sie kurz ist.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Ich finde den Film spannend. | Ich mag die Serie, weil sie kurz ist.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS6-C04-T16",
      "chapterId": "04",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Ich finde den Film spannend.. Varmista, että kysymys sopii tilaisuuteen Elokuvan jälkeen.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C04-T17",
      "chapterId": "04",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Der Film ist lustig. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C04-T18",
      "chapterId": "04",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Kirjoita 5–8 virkkeen suositus. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS6-C04-T19",
      "chapterId": "04",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Elokuvan jälkeen. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Oli: Wie fandest du den Film? / Sara: Ich fand ihn gut, weil die Geschichte interessant war.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS6-C04-T20",
      "chapterId": "04",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Täydennä: Ich mag den Film, weil er spannend ___ . (2) Miksi Sara piti elokuvasta?",
      "answerKey": "(1) ist (2) Tarina oli kiinnostava.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS6-C04-R01",
      "chapterId": "04",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Filme und Serien”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Am Wochenende sehen Lia und Tom eine Serie.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C04-R02",
      "chapterId": "04",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Die Handlung spielt in einer kleinen Stadt.",
      "answerKey": "Die Handlung spielt in einer kleinen Stadt.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C04-R03",
      "chapterId": "04",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C04-R04",
      "chapterId": "04",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Aloita sanasta tai ilmauksesta “Am” vain, jos et tunne sitä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C04-R05",
      "chapterId": "04",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: ich finde; weil; mielipideväitteet.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C04-R06",
      "chapterId": "04",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Am Wochenende sehen Lia und Tom eine Serie.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "05": [
    {
      "id": "LOS6-C05-T01",
      "chapterId": "05",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Kunst und Museen ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C05-T02",
      "chapterId": "05",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Mitä Mia huomaa maalauksessa?",
      "answerKey": "Pienen koiran maalauksen kulmassa.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS6-C05-T03",
      "chapterId": "05",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Guide: Was seht ihr auf dem Bild?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C05-T04",
      "chapterId": "05",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Mitä värejä Ella mainitsee?",
      "answerKey": "Tarkka saksankielinen ilmaus: Blau und Rot.\nMalliselitys: Sinisen ja punaisen.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS6-C05-T05",
      "chapterId": "05",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: das Bild, die Ausstellung, das Gemälde, die Farbe.",
      "answerKey": "das Bild = kuva; die Ausstellung = näyttely; das Gemälde = maalaus; die Farbe = väri",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS6-C05-T06",
      "chapterId": "05",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: kuva, näyttely, maalaus, väri, taiteilija, taiteilija.",
      "answerKey": "das Bild = kuva; die Ausstellung = näyttely; das Gemälde = maalaus; die Farbe = väri; der Künstler = taiteilija; die Künstlerin = taiteilija",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C05-T07",
      "chapterId": "05",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Das _____ ist bunt.",
      "answerKey": "Bild",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS6-C05-T08",
      "chapterId": "05",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: modern. / ist / Museum / Das.",
      "answerKey": "Das Museum ist modern.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS6-C05-T09",
      "chapterId": "05",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Museo on moderni..",
      "answerKey": "Das Museum ist modern.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS6-C05-T10",
      "chapterId": "05",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Das Bild ist buntes. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Das Bild ist bunt. Olla-verbin jälkeen adjektiivi on ilman päätettä.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS6-C05-T11",
      "chapterId": "05",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö adjektiivit ja kuvailuilmaukset. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Predikatiivinen adjektiivi ei taivu: Das Bild ist modern. Kun adjektiivi on suoraan substantiivin edessä, se saa usein päätteen: ein modernes Bild. Tämän kappaleen aktiivinen tavoite on ensisijaisesti ensimmäinen malli sekä yleisten adjektiivien tunnistaminen. Älä yritä täydellistä adjektiivitaivutusta, ellei se ole erikseen opetettu; voit kuvailla luontevasti kahdella lauseella.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C05-T12",
      "chapterId": "05",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Käännä: ‘Museo on kiinnostava.’",
      "answerKey": "Das Museum ist interessant.",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS6-C05-T13",
      "chapterId": "05",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Museum: Heute geöffnet 10–17 Uhr. Fotografieren ohne Blitz erlaubt.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Museum: Heute geöffnet 10–17 Uhr. Fotografieren ohne Blitz erlaubt. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C05-T14",
      "chapterId": "05",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -viestiä. Miten vastaanottaja, tavoite ja kielen tyyli eroavat? Kirjoita kaksi havaintoa.",
      "answerKey": "Tukidialogissa on puheenvuorot; Text B on kirjoitettu lyhyt viesti, ilmoitus tai luettelo. Tarkista lisäksi sisältöerot.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C05-T15",
      "chapterId": "05",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Das Bild ist bunt. ja Ich finde das Bild interessant.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Das Bild ist bunt. | Ich finde das Bild interessant.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS6-C05-T16",
      "chapterId": "05",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Das Bild ist bunt.. Varmista, että kysymys sopii tilaisuuteen Museossa tutustutaan taiteeseen.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C05-T17",
      "chapterId": "05",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Das Museum ist modern. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C05-T18",
      "chapterId": "05",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Esittele luvallinen julkinen taideteos. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS6-C05-T19",
      "chapterId": "05",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Museossa tutustutaan taiteeseen. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Guide: Was seht ihr auf dem Bild? / Ella: Viele Menschen und einen großen Platz.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS6-C05-T20",
      "chapterId": "05",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Käännä: ‘Museo on kiinnostava.’ (2) Mitä värejä Ella mainitsee?",
      "answerKey": "(1) Das Museum ist interessant. (2) Sinisen ja punaisen.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS6-C05-R01",
      "chapterId": "05",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Kunst und Museen”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Im Kunstmuseum steht eine Gruppe vor einem großen Gemälde.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C05-R02",
      "chapterId": "05",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Die Führerin fragt: „Was seht ihr?“ Nora beschreibt die Farben.",
      "answerKey": "Die Führerin fragt: „Was seht ihr?“ Nora beschreibt die Farben.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C05-R03",
      "chapterId": "05",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C05-R04",
      "chapterId": "05",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Aloita sanasta tai ilmauksesta “Im” vain, jos et tunne sitä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C05-R05",
      "chapterId": "05",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: adjektiivit ja kuvailuilmaukset.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C05-R06",
      "chapterId": "05",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Im Kunstmuseum steht eine Gruppe vor einem großen Gemälde.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "06": [
    {
      "id": "LOS6-C06-T01",
      "chapterId": "06",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Geschichte erleben ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C06-T02",
      "chapterId": "06",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Mitä kahta rautatieasemaa esittävää kuvaa ryhmä vertaa?",
      "answerKey": "Vanhaa valokuvaa ja nykyistä kuvaa.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS6-C06-T03",
      "chapterId": "06",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Mara: Was hast du im Museum gesehen?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C06-T04",
      "chapterId": "06",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Mitä Ben näki museossa?",
      "answerKey": "Tarkka saksankielinen ilmaus: Alte Fotos und Briefe.\nMalliselitys: Vanhoja valokuvia ja kirjeitä.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS6-C06-T05",
      "chapterId": "06",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: die Geschichte, das Jahrhundert, früher, damals.",
      "answerKey": "die Geschichte = historia; das Jahrhundert = vuosisata; früher = ennen; damals = tuolloin",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS6-C06-T06",
      "chapterId": "06",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: historia, vuosisata, ennen, tuolloin, nykyään, aika.",
      "answerKey": "die Geschichte = historia; das Jahrhundert = vuosisata; früher = ennen; damals = tuolloin; heute = nykyään; die Zeit = aika",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C06-T07",
      "chapterId": "06",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Die _____ war früher klein.",
      "answerKey": "Stadt",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS6-C06-T08",
      "chapterId": "06",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: dort. / lebten / Menschen / Die.",
      "answerKey": "Die Menschen lebten dort.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS6-C06-T09",
      "chapterId": "06",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Ihmiset asuivat siellä..",
      "answerKey": "Die Menschen lebten dort.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS6-C06-T10",
      "chapterId": "06",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Die Stadt waren klein. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Die Stadt war klein, sillä Stadt on yksikkö.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS6-C06-T11",
      "chapterId": "06",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö Perfekt sekä historiallisten tekstien preteritin tunnistus. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Perfekt on tuttu arkikerronnasta: Die Menschen haben gefeiert. Kirjoitetussa historiassa saatat nähdä Präteritumin: Die Stadt war klein. tai Die Menschen lebten dort. Tunnista erityisesti war, hatte, lebte ja wurde asiayhteydestä. Älä muunna jokaista historiallista tekstiä täydelliseksi taivutusharjoitukseksi, vaan poimi tärkeimmät tapahtumat.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C06-T12",
      "chapterId": "06",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Mikä on verbin ist yleinen mennyt muoto?",
      "answerKey": "war",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS6-C06-T13",
      "chapterId": "06",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Ausstellung: Die Stadt im Jahr 1900. Alte Bilder und kurze Texte.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Ausstellung: Die Stadt im Jahr 1900. Alte Bilder und kurze Texte. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C06-T14",
      "chapterId": "06",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -viestiä. Miten vastaanottaja, tavoite ja kielen tyyli eroavat? Kirjoita kaksi havaintoa.",
      "answerKey": "Tukidialogissa on puheenvuorot; Text B on kirjoitettu lyhyt viesti, ilmoitus tai luettelo. Tarkista lisäksi sisältöerot.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C06-T15",
      "chapterId": "06",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Die Stadt war früher klein. ja Später hat sich viel verändert.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Die Stadt war früher klein. | Später hat sich viel verändert.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS6-C06-T16",
      "chapterId": "06",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Die Stadt war früher klein.. Varmista, että kysymys sopii tilaisuuteen Historia-aiheinen näyttely.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C06-T17",
      "chapterId": "06",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Die Menschen lebten dort. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C06-T18",
      "chapterId": "06",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Laadi lyhyt aikajana saksaksi. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS6-C06-T19",
      "chapterId": "06",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Historia-aiheinen näyttely. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Mara: Was hast du im Museum gesehen? / Ben: Alte Fotos und Briefe.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS6-C06-T20",
      "chapterId": "06",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Mikä on verbin ist yleinen mennyt muoto? (2) Mitä Ben näki museossa?",
      "answerKey": "(1) war (2) Vanhoja valokuvia ja kirjeitä.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS6-C06-R01",
      "chapterId": "06",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Geschichte erleben”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Der Deutschkurs besucht eine Ausstellung zur Stadtgeschichte.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C06-R02",
      "chapterId": "06",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Auf einer Zeitleiste stehen wichtige Jahreszahlen.",
      "answerKey": "Auf einer Zeitleiste stehen wichtige Jahreszahlen.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C06-R03",
      "chapterId": "06",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C06-R04",
      "chapterId": "06",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Aloita sanasta tai ilmauksesta “Der” vain, jos et tunne sitä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C06-R05",
      "chapterId": "06",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: Perfekt sekä historiallisten tekstien preteritin tunnistus.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C06-R06",
      "chapterId": "06",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Der Deutschkurs besucht eine Ausstellung zur Stadtgeschichte.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "07": [
    {
      "id": "LOS6-C07-T01",
      "chapterId": "07",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Feste und Feiern ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C07-T02",
      "chapterId": "07",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Miksi Amir piti kulttuurijuhlan musiikista?",
      "answerKey": "Se oli monipuolista.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS6-C07-T03",
      "chapterId": "07",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Tessa: Wie feiert deine Familie?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C07-T04",
      "chapterId": "07",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Onko Alin perheessä joka vuosi samanlainen juhla?",
      "answerKey": "Tarkka saksankielinen ilmaus: Nein, manchmal machen wir etwas anderes.\nMalliselitys: Ei.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS6-C07-T05",
      "chapterId": "07",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: das Fest, das Konzert, die Tradition, feiern.",
      "answerKey": "das Fest = juhla; das Konzert = konsertti; die Tradition = perinne; feiern = juhlia",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS6-C07-T06",
      "chapterId": "07",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: juhla, konsertti, perinne, juhlia, yhdessä, yleisö.",
      "answerKey": "das Fest = juhla; das Konzert = konsertti; die Tradition = perinne; feiern = juhlia; gemeinsam = yhdessä; das Publikum = yleisö",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C07-T07",
      "chapterId": "07",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Wenn _____ feiern, essen wir zusammen.",
      "answerKey": "wir",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS6-C07-T08",
      "chapterId": "07",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: gefeiert. / gestern / haben / Wir.",
      "answerKey": "Wir haben gestern gefeiert.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS6-C07-T09",
      "chapterId": "07",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Juhlimme eilen..",
      "answerKey": "Wir haben gestern gefeiert.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS6-C07-T10",
      "chapterId": "07",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Wenn wir feiern, wir essen zusammen. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Wenn wir feiern, essen wir zusammen. Päälauseen verbi tulee sivulauseen jälkeen ennen subjektia.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS6-C07-T11",
      "chapterId": "07",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö sivulausekertaus ja vertailu. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Wenn … -rakenne voi viitata toistuviin tilanteisiin: Wenn wir feiern, essen wir zusammen. Kun wenn-lause aloittaa, koko sivulause vie päälauseen ensimmäisen lauseenjäsenpaikan, joten päälause alkaa verbillä: … essen wir zusammen. Voit pysyä A2.1-tasolla ja käyttää vaihtoehtoisesti kahta lyhyttä lausetta. Kertaa Perfekt kokemuksista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C07-T12",
      "chapterId": "07",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Täydennä: Wenn wir feiern, ___ wir zusammen. (essen)",
      "answerKey": "essen",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS6-C07-T13",
      "chapterId": "07",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Einladung: Wir treffen uns am Samstag um 18 Uhr. Alle bringen Essen mit.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Einladung: Wir treffen uns am Samstag um 18 Uhr. Alle bringen Essen mit. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C07-T14",
      "chapterId": "07",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -viestiä. Miten vastaanottaja, tavoite ja kielen tyyli eroavat? Kirjoita kaksi havaintoa.",
      "answerKey": "Tukidialogissa on puheenvuorot; Text B on kirjoitettu lyhyt viesti, ilmoitus tai luettelo. Tarkista lisäksi sisältöerot.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C07-T15",
      "chapterId": "07",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Wenn wir feiern, essen wir zusammen. ja Das Fest war schön.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Wenn wir feiern, essen wir zusammen. | Das Fest war schön.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS6-C07-T16",
      "chapterId": "07",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Wenn wir feiern, essen wir zusammen.. Varmista, että kysymys sopii tilaisuuteen Juhlan tavoista puhutaan.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C07-T17",
      "chapterId": "07",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Wir haben gestern gefeiert. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C07-T18",
      "chapterId": "07",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Vertaa kahta juhlintatapaa. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS6-C07-T19",
      "chapterId": "07",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Juhlan tavoista puhutaan. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Tessa: Wie feiert deine Familie? / Ali: Wir essen zusammen und hören Musik.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS6-C07-T20",
      "chapterId": "07",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Täydennä: Wenn wir feiern, ___ wir zusammen. (essen) (2) Onko Alin perheessä joka vuosi samanlainen juhla?",
      "answerKey": "(1) essen (2) Ei.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS6-C07-R01",
      "chapterId": "07",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Feste und Feiern”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "In einer Stadt findet am Wochenende ein Kulturfest statt.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C07-R02",
      "chapterId": "07",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Es gibt Musik, Tanz, kleine Stände und ein Programm für Kinder.",
      "answerKey": "Es gibt Musik, Tanz, kleine Stände und ein Programm für Kinder.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C07-R03",
      "chapterId": "07",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C07-R04",
      "chapterId": "07",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Aloita sanasta tai ilmauksesta “In” vain, jos et tunne sitä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C07-R05",
      "chapterId": "07",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: sivulausekertaus ja vertailu.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C07-R06",
      "chapterId": "07",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: In einer Stadt findet am Wochenende ein Kulturfest statt.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "08": [
    {
      "id": "LOS6-C08-T01",
      "chapterId": "08",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Stadt und Szene ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C08-T02",
      "chapterId": "08",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Missä kaupungissa Lea viettää viikonlopun?",
      "answerKey": "Hampurissa.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS6-C08-T03",
      "chapterId": "08",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Jonas: Was ist in deinem Viertel interessant?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C08-T04",
      "chapterId": "08",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Mitä Lian kaupunginosassa on?",
      "answerKey": "Tarkka saksankielinen ilmaus: Es gibt kleine Cafés und viele Bilder an den Wänden.\nMalliselitys: Pieniä kahviloita ja seinäkuvia.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS6-C08-T05",
      "chapterId": "08",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: die Stadt, die Straße, das Viertel, die Szene.",
      "answerKey": "die Stadt = kaupunki; die Straße = katu; das Viertel = kaupunginosa; die Szene = kulttuuripiiri",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS6-C08-T06",
      "chapterId": "08",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: kaupunki, katu, kaupunginosa, kulttuuripiiri, galleria, kahvila.",
      "answerKey": "die Stadt = kaupunki; die Straße = katu; das Viertel = kaupunginosa; die Szene = kulttuuripiiri; die Galerie = galleria; das Café = kahvila",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C08-T07",
      "chapterId": "08",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Gestern _____ ich ein Konzert besucht.",
      "answerKey": "habe",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS6-C08-T08",
      "chapterId": "08",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: gefahren. / Berlin / nach / sind / Wir.",
      "answerKey": "Wir sind nach Berlin gefahren.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS6-C08-T09",
      "chapterId": "08",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Matkustimme Berliiniin..",
      "answerKey": "Wir sind nach Berlin gefahren.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS6-C08-T10",
      "chapterId": "08",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Gestern ich habe das Konzert besucht. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Gestern habe ich das Konzert besucht.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS6-C08-T11",
      "chapterId": "08",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö paikan, ajan ja kokemuksen ilmaisut. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Paikan voit ilmoittaa in der Stadt, im Museum tai in Berlin; nämä ovat nyt tuttuja käyttöilmauksia. Kokemuksen saat kerrottua Perfektillä: Ich habe ein Konzert besucht. Jos siirryit paikkaan, käytä oikeaa apuverbiä: Ich bin nach Berlin gefahren. Ajanilmauksen alussa verbi pysyy toisena: Gestern habe ich ein Konzert besucht.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C08-T12",
      "chapterId": "08",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Täydennä: Wir ___ nach Berlin gefahren.",
      "answerKey": "sind",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS6-C08-T13",
      "chapterId": "08",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Stadtspaziergang: Treffpunkt am Platz, Sonntag 14 Uhr.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Stadtspaziergang: Treffpunkt am Platz, Sonntag 14 Uhr. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C08-T14",
      "chapterId": "08",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -viestiä. Miten vastaanottaja, tavoite ja kielen tyyli eroavat? Kirjoita kaksi havaintoa.",
      "answerKey": "Tukidialogissa on puheenvuorot; Text B on kirjoitettu lyhyt viesti, ilmoitus tai luettelo. Tarkista lisäksi sisältöerot.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C08-T15",
      "chapterId": "08",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Gestern habe ich ein Konzert besucht. ja Das Konzert war in der Stadt.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Gestern habe ich ein Konzert besucht. | Das Konzert war in der Stadt.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS6-C08-T16",
      "chapterId": "08",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Gestern habe ich ein Konzert besucht.. Varmista, että kysymys sopii tilaisuuteen Kaupunkikulttuuri tutuksi.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C08-T17",
      "chapterId": "08",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Wir sind nach Berlin gefahren. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C08-T18",
      "chapterId": "08",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Laadi yksi kulttuurireittiehdotus. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS6-C08-T19",
      "chapterId": "08",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Kaupunkikulttuuri tutuksi. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Jonas: Was ist in deinem Viertel interessant? / Lia: Es gibt kleine Cafés und viele Bilder an den Wänden.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS6-C08-T20",
      "chapterId": "08",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Täydennä: Wir ___ nach Berlin gefahren. (2) Mitä Lian kaupunginosassa on?",
      "answerKey": "(1) sind (2) Pieniä kahviloita ja seinäkuvia.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS6-C08-R01",
      "chapterId": "08",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Stadt und Szene”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Lea reist für ein Wochenende nach Hamburg.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C08-R02",
      "chapterId": "08",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Zuerst besucht sie einen kleinen Buchladen, später einen Markt.",
      "answerKey": "Zuerst besucht sie einen kleinen Buchladen, später einen Markt.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C08-R03",
      "chapterId": "08",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C08-R04",
      "chapterId": "08",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Aloita sanasta tai ilmauksesta “Lea” vain, jos et tunne sitä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C08-R05",
      "chapterId": "08",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: paikan, ajan ja kokemuksen ilmaisut.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C08-R06",
      "chapterId": "08",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Lea reist für ein Wochenende nach Hamburg.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "09": [
    {
      "id": "LOS6-C09-T01",
      "chapterId": "09",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Kultur heute ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C09-T02",
      "chapterId": "09",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Mitä opettaja pyytää tarkistamaan käytetyistä teksteistä?",
      "answerKey": "Kirjoittajan ja julkaisuajankohdan.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS6-C09-T03",
      "chapterId": "09",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Nina: Hast du den Artikel über das Festival gelesen?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C09-T04",
      "chapterId": "09",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Milloin festivaali alkaa?",
      "answerKey": "Tarkka saksankielinen ilmaus: Das Festival beginnt am Freitag.\nMalliselitys: Perjantaina.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS6-C09-T05",
      "chapterId": "09",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: aktuell, die Nachricht, der Trend, online.",
      "answerKey": "aktuell = ajankohtainen; die Nachricht = uutinen; der Trend = suuntaus; online = verkossa",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS6-C09-T06",
      "chapterId": "09",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: ajankohtainen, uutinen, suuntaus, verkossa, lähde, aihe.",
      "answerKey": "aktuell = ajankohtainen; die Nachricht = uutinen; der Trend = suuntaus; online = verkossa; die Quelle = lähde; das Thema = aihe",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C09-T07",
      "chapterId": "09",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Laut _____ Artikel ist das Festival neu.",
      "answerKey": "dem",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS6-C09-T08",
      "chapterId": "09",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: interessant. / Programm / das / finde / Ich.",
      "answerKey": "Ich finde das Programm interessant.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS6-C09-T09",
      "chapterId": "09",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Ohjelma on minusta kiinnostava..",
      "answerKey": "Ich finde das Programm interessant.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS6-C09-T10",
      "chapterId": "09",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Laut dem Artikel das Festival ist neu. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Laut dem Artikel ist das Festival neu. Alun lähdeilmaus vie ensimmäisen lauseenjäsenpaikan.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS6-C09-T11",
      "chapterId": "09",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö mielipide + lähdetieto + perustelu. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Voit ilmoittaa lähteen ilmauksella Laut dem Artikel … ja oman mielipiteesi Ich finde … . Perustelu alkaa usein weil-lauseella. Rakennetta ei tarvitse venyttää pitkäksi: Laut dem Artikel ist das Festival neu. Ich finde es interessant, weil … . Lähdeviittaus estää toisen mielipiteen muuttumisen omaksi väitteeksesi.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C09-T12",
      "chapterId": "09",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Miten aloitat ‘Artikkelin mukaan …’?",
      "answerKey": "Laut dem Artikel …",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS6-C09-T13",
      "chapterId": "09",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Kurznachricht: Das Festival startet am Freitag. Es gibt Musik und Theater.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Kurznachricht: Das Festival startet am Freitag. Es gibt Musik und Theater. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C09-T14",
      "chapterId": "09",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -viestiä. Miten vastaanottaja, tavoite ja kielen tyyli eroavat? Kirjoita kaksi havaintoa.",
      "answerKey": "Tukidialogissa on puheenvuorot; Text B on kirjoitettu lyhyt viesti, ilmoitus tai luettelo. Tarkista lisäksi sisältöerot.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C09-T15",
      "chapterId": "09",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Laut dem Artikel ist das Festival neu. ja Ich mag es, weil es abwechslungsreich ist.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Laut dem Artikel ist das Festival neu. | Ich mag es, weil es abwechslungsreich ist.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS6-C09-T16",
      "chapterId": "09",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Laut dem Artikel ist das Festival neu.. Varmista, että kysymys sopii tilaisuuteen Ajankohtaisesta kulttuuritapahtumasta kerrotaan.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C09-T17",
      "chapterId": "09",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Ich finde das Programm interessant. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C09-T18",
      "chapterId": "09",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Tiivistä aihe 6–8 lauseella ja merkitse lähde. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS6-C09-T19",
      "chapterId": "09",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Ajankohtaisesta kulttuuritapahtumasta kerrotaan. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Nina: Hast du den Artikel über das Festival gelesen? / Tom: Ja, er ist interessant.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS6-C09-T20",
      "chapterId": "09",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Miten aloitat ‘Artikkelin mukaan …’? (2) Milloin festivaali alkaa?",
      "answerKey": "(1) Laut dem Artikel … (2) Perjantaina.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS6-C09-R01",
      "chapterId": "09",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Kultur heute”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Die Gruppe recherchiert ein aktuelles Kulturthema.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C09-R02",
      "chapterId": "09",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Sara interessiert sich für junge Künstlerinnen.",
      "answerKey": "Sara interessiert sich für junge Künstlerinnen.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C09-R03",
      "chapterId": "09",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C09-R04",
      "chapterId": "09",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Aloita sanasta tai ilmauksesta “Die” vain, jos et tunne sitä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C09-R05",
      "chapterId": "09",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: mielipide + lähdetieto + perustelu.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS6-C09-R06",
      "chapterId": "09",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Die Gruppe recherchiert ein aktuelles Kulturthema.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ]
};
