import type { LosFutureExerciseDraft } from "./losFutureExerciseTypes";
/** LOS! 2: 260 lähdekäsikirjoituksen tehtäväluonnosta. Mallivastauksia ei ole kielentarkistettu. */
export const LOS_FUTURE_EXERCISES_2: Record<string, LosFutureExerciseDraft[]> = {
  "10": [
    {
      "id": "LOS2-C10-T01",
      "chapterId": "10",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko So läuft mein Alltag ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C10-T02",
      "chapterId": "10",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Mitä Mira tekee sunnuntaina?",
      "answerKey": "Hän jää kotiin, lukee ja soittaa perheelleen.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS2-C10-T03",
      "chapterId": "10",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Puhujien ensimmäiset vuorot: Lea: Was machen wir am Samstag? | Max: Am Nachmittag kaufen wir ein. Suomenkielinen tulkinta: Lea kysyy lauantain suunnitelmasta. Max kertoo heidän menevän iltapäivällä ostoksille. Tarkista, että oma vastauksesi kuvaa kummankin puhujan ensimmäistä vuoroa.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C10-T04",
      "chapterId": "10",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Mitä ystävät tekevät illalla?",
      "answerKey": "Tarkka saksankielinen ilmaus: Wir essen zusammen und lernen ein bisschen Deutsch.\nMalliselitys: Syövät yhdessä ja opiskelevat vähän saksaa.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS2-C10-T05",
      "chapterId": "10",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: normalerweise, manchmal, immer, oft.",
      "answerKey": "normalerweise = tavallisesti; manchmal = joskus; immer = aina; oft = usein",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS2-C10-T06",
      "chapterId": "10",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: tavallisesti, joskus, aina, usein, ei koskaan, ensin.",
      "answerKey": "normalerweise = tavallisesti; manchmal = joskus; immer = aina; oft = usein; nie = ei koskaan; zuerst = ensin",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C10-T07",
      "chapterId": "10",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Wir _____ in einer kleinen Stadt.",
      "answerKey": "wohnen",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS2-C10-T08",
      "chapterId": "10",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: Apfel. / einen / ich / kaufe / Samstag / Am.",
      "answerKey": "Am Samstag kaufe ich einen Apfel.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS2-C10-T09",
      "chapterId": "10",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Lauantaina ostan omenan.",
      "answerKey": "Am Samstag kaufe ich einen Apfel.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS2-C10-T10",
      "chapterId": "10",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Am Samstag ich kaufe einen Apfel. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Am Samstag kaufe ich einen Apfel, koska verbi on toisella lauseenjäsenen paikalla.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS2-C10-T11",
      "chapterId": "10",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö koko kirjan preesens, artikkelit, akkusatiivi ja kohteliaisuus. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Tärkein kielioppitaito on nyt valita oikein kolmesta jo tutusta asiasta: kuka tekee (persoonapääte), mikä on lauseen kohde (maskuliinin akkusatiivi), ja missä taivutettu verbi on (toinen paikka tavallisessa väitelauseessa). Vertaa: Wir kaufen einen Apfel ja Am Samstag kaufen wir einen Apfel. Molemmissa on samat jäsenet mutta eri aloitus. Vahvista myös muodot mein Bruder ja meine Schwester.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C10-T12",
      "chapterId": "10",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Korjaa: Wir kauft Brot.",
      "answerKey": "Wir kaufen Brot.",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS2-C10-T13",
      "chapterId": "10",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Samstag: 15 Uhr Einkaufen; 18 Uhr Essen; 19 Uhr Deutsch.. Kirjoita kaksi havaintoa suomeksi. Ne voivat koskea tietoja, tekstin tarkoitusta tai ilmaisutapaa. Älä päättele tekstiin kuulumattomia yksityiskohtia.",
      "answerKey": "Mallihavainnot: 1. Lauantaina mennään ostoksille kello 15. 2. Ruokailu on merkitty kello 18 ja saksan opiskelu kello 19. Myös muut Text B:stä perusteltavat havainnot voivat olla oikein.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C10-T14",
      "chapterId": "10",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C10-T15",
      "chapterId": "10",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Wir wohnen in einer kleinen Stadt. ja Meine Schwester trinkt gern Tee.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Wir wohnen in einer kleinen Stadt. | Meine Schwester trinkt gern Tee.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS2-C10-T16",
      "chapterId": "10",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Wir wohnen in einer kleinen Stadt.. Varmista, että kysymys sopii tilaisuuteen Ystävät sopivat yhteisestä lauantai-illasta.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C10-T17",
      "chapterId": "10",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Am Samstag kaufe ich einen Apfel. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C10-T18",
      "chapterId": "10",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Kerro arkipäivästä ja käy asiointikeskustelu ilman mallia. Kirjoita 4–6 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS2-C10-T19",
      "chapterId": "10",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Ystävät sopivat yhteisestä lauantai-illasta. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Lea: Was machen wir am Samstag? / Max: Am Nachmittag kaufen wir ein.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS2-C10-T20",
      "chapterId": "10",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Korjaa: Wir kauft Brot. (2) Mitä ystävät tekevät illalla?",
      "answerKey": "(1) Wir kaufen Brot. (2) Syövät yhdessä ja opiskelevat vähän saksaa.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS2-C10-R01",
      "chapterId": "10",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “So läuft mein Alltag”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Mira schreibt einen kurzen Bericht über ihre Woche.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C10-R02",
      "chapterId": "10",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Montags lernt sie Deutsch.",
      "answerKey": "Montags lernt sie Deutsch.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C10-R03",
      "chapterId": "10",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C10-R04",
      "chapterId": "10",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Valitse tekstistä kolme merkityksellistä sanaa tai ilmausta; älä poimi automaattisesti tekstin ensimmäistä sanaa tai henkilönnimeä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C10-R05",
      "chapterId": "10",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: koko kirjan preesens, artikkelit, akkusatiivi ja kohteliaisuus.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C10-R06",
      "chapterId": "10",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Mira schreibt einen kurzen Bericht über ihre Woche.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "01": [
    {
      "id": "LOS2-C01-T01",
      "chapterId": "01",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Meine kleine Welt ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C01-T02",
      "chapterId": "01",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Missä Mira tapaa Jonaksen?",
      "answerKey": "Saksan kurssilla Bonnissa.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS2-C01-T03",
      "chapterId": "01",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Puhujien ensimmäiset vuorot: Mira: Hallo, ich bin Mira. | Jonas: Ich heiße Jonas. Wir lernen Deutsch. Suomenkielinen tulkinta: Mira tervehtii ja esittelee itsensä. Jonas kertoo nimensä ja mainitsee saksan opiskelun. Tarkista, että oma vastauksesi kuvaa kummankin puhujan ensimmäistä vuoroa.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C01-T04",
      "chapterId": "01",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Mitä Jonas ja Mira tekevät yhdessä?",
      "answerKey": "Tarkka saksankielinen ilmaus: Wir lernen Deutsch.\nMalliselitys: He opiskelevat saksaa.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS2-C01-T05",
      "chapterId": "01",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: der Freund, die Freundin, zusammen, wir.",
      "answerKey": "der Freund = ystävä; die Freundin = ystävä (naispuolinen); zusammen = yhdessä; wir = me",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS2-C01-T06",
      "chapterId": "01",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: ystävä, ystävä (naispuolinen), yhdessä, me, te, he.",
      "answerKey": "der Freund = ystävä; die Freundin = ystävä (naispuolinen); zusammen = yhdessä; wir = me; ihr = te; sie = he",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C01-T07",
      "chapterId": "01",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Wir _____ Deutsch.",
      "answerKey": "lernen",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS2-C01-T08",
      "chapterId": "01",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: Berlin. / in / wohnt / Ihr.",
      "answerKey": "Ihr wohnt in Berlin.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS2-C01-T09",
      "chapterId": "01",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Te asutte Berliinissä. Käytä usean tutun puhuttelua.",
      "answerKey": "Ihr wohnt in Berlin.",
      "feedback": "Tässä puhutellaan useita tuttuja, joten käytetään monikon sinuttelumuotoa ihr: Ihr wohnt in Berlin. Jos puhuttelu on kohtelias tai muodollinen, oikein on puolestaan Sie wohnen in Berlin. Pelkkä suomen Te ilman tilannevihjettä ei erottaisi näitä kahta.",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS2-C01-T10",
      "chapterId": "01",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Wir lernt Deutsch. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Wir lernen Deutsch, sillä wir-pronominin kanssa pääte on -en.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS2-C01-T11",
      "chapterId": "01",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö wir/ihr/sie; verbin persoonapäätteiden laajennus. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Saksan preesensissä persoonapronomini kertoo, ketä lause koskee, ja verbin pääte täydentää tiedon. Kun verbistä lernen poistetaan -en, vartaloksi jää lern-. Siihen liitetään esimerkiksi wir lernen, ihr lernt, sie lernen. Huomaa, että wir, sie ja kohtelias Sie käyttävät yleensä samaa -en-päätettä, mutta ihr saa -t. Nimen muistaminen ei yksin riitä: lause tarvitsee oikean verbinmuodon.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C01-T12",
      "chapterId": "01",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Miten sanot ‘Me asumme yhdessä’ verbillä wohnen?",
      "answerKey": "Wir wohnen zusammen.",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS2-C01-T13",
      "chapterId": "01",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Hallo Mira! Wir lernen am Dienstag zusammen Deutsch. Bis bald! Jonas. Kirjoita kaksi havaintoa suomeksi. Ne voivat koskea tietoja, tekstin tarkoitusta tai ilmaisutapaa. Älä päättele tekstiin kuulumattomia yksityiskohtia.",
      "answerKey": "Mallihavainnot: 1. Jonas lähettää viestin Miralle. 2. Jonas ja Mira opiskelevat yhdessä saksaa tiistaina. Myös muut Text B:stä perusteltavat havainnot voivat olla oikein.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C01-T14",
      "chapterId": "01",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C01-T15",
      "chapterId": "01",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Wir lernen Deutsch. ja Sie wohnen zusammen.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Wir lernen Deutsch. | Sie wohnen zusammen.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS2-C01-T16",
      "chapterId": "01",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Wir lernen Deutsch.. Varmista, että kysymys sopii tilaisuuteen Kaksi uutta opiskelijaa tapaa kielikurssilla.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C01-T17",
      "chapterId": "01",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Ihr wohnt in Berlin. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C01-T18",
      "chapterId": "01",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Esittele kaksi ihmistä 4–6 lauseella. Kirjoita 4–6 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS2-C01-T19",
      "chapterId": "01",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Kaksi uutta opiskelijaa tapaa kielikurssilla. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Mira: Hallo, ich bin Mira. / Jonas: Ich heiße Jonas. Wir lernen Deutsch.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS2-C01-T20",
      "chapterId": "01",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Miten sanot ‘Me asumme yhdessä’ verbillä wohnen? (2) Mitä Jonas ja Mira tekevät yhdessä?",
      "answerKey": "(1) Wir wohnen zusammen. (2) He opiskelevat saksaa.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS2-C01-R01",
      "chapterId": "01",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Meine kleine Welt”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Mira ist neu in Bonn.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C01-R02",
      "chapterId": "01",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Am Montag trifft sie Jonas in einem Deutschkurs.",
      "answerKey": "Am Montag trifft sie Jonas in einem Deutschkurs.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C01-R03",
      "chapterId": "01",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C01-R04",
      "chapterId": "01",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Valitse tekstistä kolme merkityksellistä sanaa tai ilmausta; älä poimi automaattisesti tekstin ensimmäistä sanaa tai henkilönnimeä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C01-R05",
      "chapterId": "01",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: wir/ihr/sie; verbin persoonapäätteiden laajennus.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C01-R06",
      "chapterId": "01",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Mira ist neu in Bonn.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "02": [
    {
      "id": "LOS2-C02-T01",
      "chapterId": "02",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Meine Familie ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C02-T02",
      "chapterId": "02",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Kuinka monta sisarusta Lenalla on?",
      "answerKey": "Kaksi: pikkuveli Max ja isosisko Emma.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS2-C02-T03",
      "chapterId": "02",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Puhujien ensimmäiset vuorot: Lina: Ist das deine Familie? | Amir: Ja. Das ist meine Mutter, und das ist mein Bruder. Suomenkielinen tulkinta: Lina kysyy, onko kyse Amirin perheestä. Amir esittelee äitinsä ja veljensä. Tarkista, että oma vastauksesi kuvaa kummankin puhujan ensimmäistä vuoroa.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C02-T04",
      "chapterId": "02",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Mikä suhde Amirilla on kuvassa näkyvään poikaan?",
      "answerKey": "Tarkka saksankielinen ilmaus: Das ist meine Mutter, und das ist mein Bruder.\nMalliselitys: Poika on hänen veljensä.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS2-C02-T05",
      "chapterId": "02",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: die Mutter, der Vater, der Bruder, die Schwester.",
      "answerKey": "die Mutter = äiti; der Vater = isä; der Bruder = veli; die Schwester = sisko",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS2-C02-T06",
      "chapterId": "02",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: äiti, isä, veli, sisko, vanhemmat, perhe.",
      "answerKey": "die Mutter = äiti; der Vater = isä; der Bruder = veli; die Schwester = sisko; die Eltern = vanhemmat; die Familie = perhe",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C02-T07",
      "chapterId": "02",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Das _____ mein Bruder.",
      "answerKey": "ist",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS2-C02-T08",
      "chapterId": "02",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: hier. / wohnt / Schwester / Meine.",
      "answerKey": "Meine Schwester wohnt hier.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS2-C02-T09",
      "chapterId": "02",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Siskoni asuu täällä.",
      "answerKey": "Meine Schwester wohnt hier.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS2-C02-T10",
      "chapterId": "02",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Mein Schwester ist hier. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Meine Schwester ist hier, koska Schwester on feminiini.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS2-C02-T11",
      "chapterId": "02",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö mein/dein; perusartikkelit nominatiivissa. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Substantiivien perusmuodon edessä näkyvät artikkelit der, die ja das. Ne kuuluvat sanaan: der Bruder, die Schwester, das Kind. Omistussanat mein ja dein taipuvat artikkelin tapaan. Maskuliinissa ja neutrin yksikössä sanot mein Bruder, mein Kind, mutta feminiinissä meine Schwester. Monikossa käytät meine Eltern. Älä päättele suomenkielisestä sanasta, mikä saksan sanan suku on.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C02-T12",
      "chapterId": "02",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Täydennä: Das ist ___ Mutter. (minun)",
      "answerKey": "meine",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS2-C02-T13",
      "chapterId": "02",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Hallo! Mein Bruder kommt am Samstag. Wir essen zusammen. Liebe Grüße, Amir.. Kirjoita kaksi havaintoa suomeksi. Ne voivat koskea tietoja, tekstin tarkoitusta tai ilmaisutapaa. Älä päättele tekstiin kuulumattomia yksityiskohtia.",
      "answerKey": "Mallihavainnot: 1. Amirin veli tulee lauantaina. 2. He aikovat syödä yhdessä. Myös muut Text B:stä perusteltavat havainnot voivat olla oikein.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C02-T14",
      "chapterId": "02",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C02-T15",
      "chapterId": "02",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Das ist mein Bruder. ja Sind das deine Eltern?. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Das ist mein Bruder. | Sind das deine Eltern?. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS2-C02-T16",
      "chapterId": "02",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Das ist mein Bruder.. Varmista, että kysymys sopii tilaisuuteen Kaverukset näyttävät perhekuvia.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C02-T17",
      "chapterId": "02",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Meine Schwester wohnt hier. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C02-T18",
      "chapterId": "02",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Kerro yhdestä valitsemastasi läheisestä ilman yksityisten tietojen pakkoa. Kirjoita 4–6 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS2-C02-T19",
      "chapterId": "02",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Kaverukset näyttävät perhekuvia. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Lina: Ist das deine Familie? / Amir: Ja. Das ist meine Mutter, und das ist mein Bruder.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS2-C02-T20",
      "chapterId": "02",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Täydennä: Das ist ___ Mutter. (minun) (2) Mikä suhde Amirilla on kuvassa näkyvään poikaan?",
      "answerKey": "(1) meine (2) Poika on hänen veljensä.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS2-C02-R01",
      "chapterId": "02",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Meine Familie”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Lena zeigt ihrer Freundin ein Foto.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C02-R02",
      "chapterId": "02",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: „Das ist meine Familie“, sagt sie.",
      "answerKey": "„Das ist meine Familie“, sagt sie.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C02-R03",
      "chapterId": "02",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C02-R04",
      "chapterId": "02",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Valitse tekstistä kolme merkityksellistä sanaa tai ilmausta; älä poimi automaattisesti tekstin ensimmäistä sanaa tai henkilönnimeä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C02-R05",
      "chapterId": "02",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: mein/dein; perusartikkelit nominatiivissa.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C02-R06",
      "chapterId": "02",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Lena zeigt ihrer Freundin ein Foto.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "03": [
    {
      "id": "LOS2-C03-T01",
      "chapterId": "03",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Zu Hause ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C03-T02",
      "chapterId": "03",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Mitä kodinkoneita Nicon keittiössä on?",
      "answerKey": "Jääkaappi ja liesi. Astianpesukonetta hänellä ei ole.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS2-C03-T03",
      "chapterId": "03",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Puhujien ensimmäiset vuorot: Tessa: Wie ist deine Wohnung? | Ben: Sie ist klein, aber schön. Suomenkielinen tulkinta: Tessa kysyy Benin asunnosta. Ben kuvailee asuntoaan pieneksi mutta kauniiksi. Tarkista, että oma vastauksesi kuvaa kummankin puhujan ensimmäistä vuoroa.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C03-T04",
      "chapterId": "03",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Mitä Ben kertoo asunnossa olevan keittiön lisäksi?",
      "answerKey": "Tarkka saksankielinen ilmaus: es gibt auch ein Bad.\nMalliselitys: Kylpyhuoneen.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS2-C03-T05",
      "chapterId": "03",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: das Haus, die Wohnung, die Küche, das Bad.",
      "answerKey": "das Haus = talo; die Wohnung = asunto; die Küche = keittiö; das Bad = kylpyhuone",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS2-C03-T06",
      "chapterId": "03",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: talo, asunto, keittiö, kylpyhuone, huone, eteinen.",
      "answerKey": "das Haus = talo; die Wohnung = asunto; die Küche = keittiö; das Bad = kylpyhuone; das Zimmer = huone; der Flur = eteinen",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C03-T07",
      "chapterId": "03",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Ich _____ ein kleines Zimmer.",
      "answerKey": "habe",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS2-C03-T08",
      "chapterId": "03",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: Küche. / eine / gibt / Es.",
      "answerKey": "Es gibt eine Küche.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS2-C03-T09",
      "chapterId": "03",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Siellä on keittiö.",
      "answerKey": "Es gibt eine Küche.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS2-C03-T10",
      "chapterId": "03",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Es gibt ein Balkon. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Es gibt einen Balkon. Maskuliininen artikkeli vaihtuu tässä muotoon einen.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS2-C03-T11",
      "chapterId": "03",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö sein/haben; es gibt + akkusatiivi kiinteänä rakenteena. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Sein ja haben ovat tavallisia mutta epäsäännöllisiä verbejä. Ich bin zu Hause tarkoittaa ‘olen kotona’, Ich habe ein Zimmer ‘minulla on huone’. Lisäksi rakenne es gibt kertoo jonkin olemassaolosta: Es gibt eine Küche. Rakenteen jälkeen tulee akkusatiivi, minkä vuoksi sanot es gibt einen Balkon etkä ein Balkon. Tässä voit opetella es gibt -mallit kokonaisina; sijamuodot avataan järjestelmällisesti seuraavassa kappaleessa.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C03-T12",
      "chapterId": "03",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Miten kerrot: ‘Asunnossa on kylpyhuone’?",
      "answerKey": "In der Wohnung gibt es ein Bad.",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS2-C03-T13",
      "chapterId": "03",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Wohnung: zwei Zimmer, eine Küche, ein Bad. Die Wohnung ist klein und hell.. Kirjoita kaksi havaintoa suomeksi. Ne voivat koskea tietoja, tekstin tarkoitusta tai ilmaisutapaa. Älä päättele tekstiin kuulumattomia yksityiskohtia.",
      "answerKey": "Mallihavainnot: 1. Asunnossa on kaksi huonetta. 2. Asunnossa on lisäksi keittiö ja kylpyhuone. Myös muut Text B:stä perusteltavat havainnot voivat olla oikein.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C03-T14",
      "chapterId": "03",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C03-T15",
      "chapterId": "03",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Ich habe ein kleines Zimmer. ja Es gibt einen Balkon.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Ich habe ein kleines Zimmer. | Es gibt einen Balkon.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS2-C03-T16",
      "chapterId": "03",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Ich habe ein kleines Zimmer.. Varmista, että kysymys sopii tilaisuuteen Vuokra-asunnon esittely.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C03-T17",
      "chapterId": "03",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Es gibt eine Küche. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C03-T18",
      "chapterId": "03",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Kerro missä asut ja nimeä kodin huoneita. Kirjoita 4–6 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS2-C03-T19",
      "chapterId": "03",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Vuokra-asunnon esittely. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Tessa: Wie ist deine Wohnung? / Ben: Sie ist klein, aber schön.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS2-C03-T20",
      "chapterId": "03",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Miten kerrot: ‘Asunnossa on kylpyhuone’? (2) Mitä huoneita Benin asunnossa on?",
      "answerKey": "(1) In der Wohnung gibt es ein Bad. (2) Keittiö ja kylpyhuone; huoneita mainitaan erillisessä ilmoituksessa kaksi.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS2-C03-R01",
      "chapterId": "03",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Zu Hause”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Nico wohnt seit drei Wochen in einer kleinen Wohnung.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C03-R02",
      "chapterId": "03",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Die Wohnung hat zwei Zimmer, eine Küche und ein Bad.",
      "answerKey": "Die Wohnung hat zwei Zimmer, eine Küche und ein Bad.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C03-R03",
      "chapterId": "03",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C03-R04",
      "chapterId": "03",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Valitse tekstistä kolme merkityksellistä sanaa tai ilmausta; älä poimi automaattisesti tekstin ensimmäistä sanaa tai henkilönnimeä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C03-R05",
      "chapterId": "03",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: sein/haben; es gibt + akkusatiivi kiinteänä rakenteena.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C03-R06",
      "chapterId": "03",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Nico wohnt seit drei Wochen in einer kleinen Wohnung.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "04": [
    {
      "id": "LOS2-C04-T01",
      "chapterId": "04",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Mein Zimmer ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C04-T02",
      "chapterId": "04",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Minkä värisen tuolin Anna haluaa ostaa?",
      "answerKey": "Sinisen.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS2-C04-T03",
      "chapterId": "04",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Puhujien ensimmäiset vuorot: Eva: Hast du einen Schreibtisch? | Paul: Ja, aber ich brauche einen Stuhl. Suomenkielinen tulkinta: Eva kysyy, onko Paulilla kirjoituspöytä. Paul sanoo, että on, mutta hän tarvitsee tuolin. Tarkista, että oma vastauksesi kuvaa kummankin puhujan ensimmäistä vuoroa.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C04-T04",
      "chapterId": "04",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Mitä Paul tarvitsee?",
      "answerKey": "Tarkka saksankielinen ilmaus: ich brauche einen Stuhl.\nMalliselitys: Tuolin.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS2-C04-T05",
      "chapterId": "04",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: der Tisch, der Stuhl, das Bett, die Lampe.",
      "answerKey": "der Tisch = pöytä; der Stuhl = tuoli; das Bett = sänky; die Lampe = lamppu",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS2-C04-T06",
      "chapterId": "04",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: pöytä, tuoli, sänky, lamppu, kaappi, ikkuna.",
      "answerKey": "der Tisch = pöytä; der Stuhl = tuoli; das Bett = sänky; die Lampe = lamppu; der Schrank = kaappi; das Fenster = ikkuna",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C04-T07",
      "chapterId": "04",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Ich _____ einen Stuhl.",
      "answerKey": "brauche",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS2-C04-T08",
      "chapterId": "04",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: Lampe. / eine / habe / Ich.",
      "answerKey": "Ich habe eine Lampe.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS2-C04-T09",
      "chapterId": "04",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Minulla on lamppu.",
      "answerKey": "Ich habe eine Lampe.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS2-C04-T10",
      "chapterId": "04",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Ich brauche ein Stuhl. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Ich brauche einen Stuhl: Stuhl on maskuliini, ja brauchen-verbin kohde on akkusatiivissa.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS2-C04-T11",
      "chapterId": "04",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö akkusatiivin ensiopetus; ein/einen/kein/keinen. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Nominatiivi on esimerkiksi lauseen tekijän sijamuoto: Der Tisch ist groß. Akkusatiivia käytetään monen verbin suoralle kohteelle: Ich brauche den Tisch. Epämääräinen maskuliini muuttuu ein → einen ja kielteinen kein → keinen. Feminiinin eine ja neutrin ein eivät tässä muutu. Siksi Ich habe eine Lampe mutta Ich brauche einen Stuhl. Opettele ensin malli, älä kaikkia sijamuotoja samanaikaisesti.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C04-T12",
      "chapterId": "04",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Täydennä: Ich kaufe ___ Tisch. (ein)",
      "answerKey": "einen",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS2-C04-T13",
      "chapterId": "04",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Einkaufsliste: einen Stuhl, einen Tisch, eine kleine Pflanze.. Kirjoita kaksi havaintoa suomeksi. Ne voivat koskea tietoja, tekstin tarkoitusta tai ilmaisutapaa. Älä päättele tekstiin kuulumattomia yksityiskohtia.",
      "answerKey": "Mallihavainnot: 1. Ostoslistalla on tuoli ja pöytä. 2. Listalla on myös pieni kasvi. Myös muut Text B:stä perusteltavat havainnot voivat olla oikein.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C04-T14",
      "chapterId": "04",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C04-T15",
      "chapterId": "04",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Ich brauche einen Stuhl. ja Ich habe keinen Computer.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Ich brauche einen Stuhl. | Ich habe keinen Computer.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS2-C04-T16",
      "chapterId": "04",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Ich brauche einen Stuhl.. Varmista, että kysymys sopii tilaisuuteen Opiskelija sisustaa huonettaan.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C04-T17",
      "chapterId": "04",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Ich habe eine Lampe. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C04-T18",
      "chapterId": "04",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Kuvaile huoneen 5 esinettä tai kuviteltu huone. Kirjoita 4–6 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS2-C04-T19",
      "chapterId": "04",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Opiskelija sisustaa huonettaan. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Eva: Hast du einen Schreibtisch? / Paul: Ja, aber ich brauche einen Stuhl.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS2-C04-T20",
      "chapterId": "04",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Täydennä: Ich kaufe ___ Tisch. (ein) (2) Mitä Paul tarvitsee?",
      "answerKey": "(1) einen (2) Tuolin.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS2-C04-R01",
      "chapterId": "04",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Mein Zimmer”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Anna möchte ihr Zimmer verändern.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C04-R02",
      "chapterId": "04",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Sie hat ein Bett, einen Schreibtisch und einen alten Schrank.",
      "answerKey": "Sie hat ein Bett, einen Schreibtisch und einen alten Schrank.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C04-R03",
      "chapterId": "04",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C04-R04",
      "chapterId": "04",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Valitse tekstistä kolme merkityksellistä sanaa tai ilmausta; älä poimi automaattisesti tekstin ensimmäistä sanaa tai henkilönnimeä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C04-R05",
      "chapterId": "04",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: akkusatiivin ensiopetus; ein/einen/kein/keinen.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C04-R06",
      "chapterId": "04",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Anna möchte ihr Zimmer verändern.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "05": [
    {
      "id": "LOS2-C05-T01",
      "chapterId": "05",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Mein Tag ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C05-T02",
      "chapterId": "05",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Mihin aikaan Paul lähtee bussilla kouluun?",
      "answerKey": "Kahdeksalta.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS2-C05-T03",
      "chapterId": "05",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Puhujien ensimmäiset vuorot: Nele: Wann stehst du auf? | Luca: Ich stehe um sieben Uhr auf. Suomenkielinen tulkinta: Nele kysyy, milloin Luca herää. Luca kertoo heräävänsä seitsemältä. Tarkista, että oma vastauksesi kuvaa kummankin puhujan ensimmäistä vuoroa.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C05-T04",
      "chapterId": "05",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Milloin Luca opiskelee saksaa?",
      "answerKey": "Tarkka saksankielinen ilmaus: Am Abend lerne ich Deutsch.\nMalliselitys: Illalla.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS2-C05-T05",
      "chapterId": "05",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: aufstehen, frühstücken, arbeiten, die Schule.",
      "answerKey": "aufstehen = nousta ylös; frühstücken = syödä aamiaista; arbeiten = työskennellä; die Schule = koulu",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS2-C05-T06",
      "chapterId": "05",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: nousta ylös, syödä aamiaista, työskennellä, koulu, aamulla, illalla.",
      "answerKey": "aufstehen = nousta ylös; frühstücken = syödä aamiaista; arbeiten = työskennellä; die Schule = koulu; am Morgen = aamulla; am Abend = illalla",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C05-T07",
      "chapterId": "05",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Ich _____ am Abend.",
      "answerKey": "lerne",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS2-C05-T08",
      "chapterId": "05",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: ich. / frühstücke / Morgen / Am.",
      "answerKey": "Am Morgen frühstücke ich.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS2-C05-T09",
      "chapterId": "05",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Syön aamiaista aamulla.",
      "answerKey": "Am Morgen frühstücke ich.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS2-C05-T10",
      "chapterId": "05",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Am Morgen ich frühstücke. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Am Morgen frühstücke ich, sillä taivutettu verbi pysyy toisena.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS2-C05-T11",
      "chapterId": "05",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö preesens; verbin paikka; ensin yleiset ajanilmaisut. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Saksan tavallisessa väitelauseessa taivutettu verbi on toisella lauseenjäsenen paikalla. Ich lerne am Abend. Jos aloitat ajanilmauksella, järjestys vaihtuu: Am Abend lerne ich. Tärkeää ei ole laskea sanoja vaan lauseenjäseniä: am Abend on yksi kokonaisuus. Eräät verbit ovat erotettavia, kuten aufstehen: Ich stehe um sieben Uhr auf. Opettele tämä vielä käytännön lausemallina.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C05-T12",
      "chapterId": "05",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Muodosta lause aloittaen: Am Abend / ich / lerne.",
      "answerKey": "Am Abend lerne ich.",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS2-C05-T13",
      "chapterId": "05",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Mein Montag: 7 Uhr aufstehen; 8 Uhr Schule; 18 Uhr Deutsch lernen.. Kirjoita kaksi havaintoa suomeksi. Ne voivat koskea tietoja, tekstin tarkoitusta tai ilmaisutapaa. Älä päättele tekstiin kuulumattomia yksityiskohtia.",
      "answerKey": "Mallihavainnot: 1. Maanantain ohjelmassa on herääminen kello seitsemältä. 2. Koulu on merkitty alkavaksi kello kahdeksalta. Myös muut Text B:stä perusteltavat havainnot voivat olla oikein.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C05-T14",
      "chapterId": "05",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C05-T15",
      "chapterId": "05",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Ich lerne am Abend. ja Ich stehe um sieben Uhr auf.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Ich lerne am Abend. | Ich stehe um sieben Uhr auf.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS2-C05-T16",
      "chapterId": "05",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Ich lerne am Abend.. Varmista, että kysymys sopii tilaisuuteen Aamurutiineista keskustellaan.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C05-T17",
      "chapterId": "05",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Am Morgen frühstücke ich. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C05-T18",
      "chapterId": "05",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Esittele oma tyypillinen arkipäivä kronologisesti. Kirjoita 4–6 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS2-C05-T19",
      "chapterId": "05",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Aamurutiineista keskustellaan. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Nele: Wann stehst du auf? / Luca: Ich stehe um sieben Uhr auf.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS2-C05-T20",
      "chapterId": "05",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Muodosta lause aloittaen: Am Abend / ich / lerne. (2) Milloin Luca opiskelee saksaa?",
      "answerKey": "(1) Am Abend lerne ich. (2) Illalla.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS2-C05-R01",
      "chapterId": "05",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Mein Tag”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Paul steht von Montag bis Freitag um sieben Uhr auf.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C05-R02",
      "chapterId": "05",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Zuerst frühstückt er.",
      "answerKey": "Zuerst frühstückt er.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C05-R03",
      "chapterId": "05",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C05-R04",
      "chapterId": "05",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Valitse tekstistä kolme merkityksellistä sanaa tai ilmausta; älä poimi automaattisesti tekstin ensimmäistä sanaa tai henkilönnimeä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C05-R05",
      "chapterId": "05",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: preesens; verbin paikka; ensin yleiset ajanilmaisut.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C05-R06",
      "chapterId": "05",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Paul steht von Montag bis Freitag um sieben Uhr auf.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "06": [
    {
      "id": "LOS2-C06-T01",
      "chapterId": "06",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Was isst du gern? ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C06-T02",
      "chapterId": "06",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Mitä Greta syö mieluummin kuin pastaa?",
      "answerKey": "Pizzaa.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS2-C06-T03",
      "chapterId": "06",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Puhujien ensimmäiset vuorot: Sara: Isst du gern Brot? | Leon: Ja, aber ich esse lieber Obst. Suomenkielinen tulkinta: Sara kysyy, pitääkö Leon leivästä. Leon vastaa kyllä mutta sanoo pitävänsä enemmän hedelmistä. Tarkista, että oma vastauksesi kuvaa kummankin puhujan ensimmäistä vuoroa.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C06-T04",
      "chapterId": "06",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Mitä Leon syö mieluummin kuin leipää?",
      "answerKey": "Tarkka saksankielinen ilmaus: ich esse lieber Obst.\nMalliselitys: Hedelmiä.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS2-C06-T05",
      "chapterId": "06",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: das Brot, der Käse, der Apfel, das Wasser.",
      "answerKey": "das Brot = leipä; der Käse = juusto; der Apfel = omena; das Wasser = vesi",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS2-C06-T06",
      "chapterId": "06",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: leipä, juusto, omena, vesi, tee, mehu.",
      "answerKey": "das Brot = leipä; der Käse = juusto; der Apfel = omena; das Wasser = vesi; der Tee = tee; der Saft = mehu",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C06-T07",
      "chapterId": "06",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Ich _____ gern Äpfel.",
      "answerKey": "esse",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS2-C06-T08",
      "chapterId": "06",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: Brot. / isst / Du.",
      "answerKey": "Du isst Brot.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS2-C06-T09",
      "chapterId": "06",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Sinä syöt leipää.",
      "answerKey": "Du isst Brot.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS2-C06-T10",
      "chapterId": "06",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Du esst Brot. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Du isst Brot. Essen-verbin du-muoto on isst.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS2-C06-T11",
      "chapterId": "06",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö gern, lieber; essen/trinken preesensissä. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Gern sijoitetaan tavallisesti verbin yhteyteen, kun jokin tekeminen on mieluisaa: Ich esse gern Brot. Lieber ilmaisee mieluummin: Ich trinke lieber Tee. Verbit essen ja trinken ovat preesensissä hieman erilaisia. Trinken on säännöllinen: ich trinke, du trinkst. Essen saa du- ja er/sie/es-persoonissa vokaalimuutoksen: du isst, sie isst. Älä sekoita gern-sanaa verbiin mögen, jolla on oma taivutuksensa.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C06-T12",
      "chapterId": "06",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Käännä: ‘Juon mieluummin teetä.’",
      "answerKey": "Ich trinke lieber Tee.",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS2-C06-T13",
      "chapterId": "06",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Frühstück heute: Brot, Käse, Obst und Tee.. Kirjoita kaksi havaintoa suomeksi. Ne voivat koskea tietoja, tekstin tarkoitusta tai ilmaisutapaa. Älä päättele tekstiin kuulumattomia yksityiskohtia.",
      "answerKey": "Mallihavainnot: 1. Aamiaiseen kuuluu leipää ja juustoa. 2. Listassa mainitaan myös hedelmiä ja teetä. Myös muut Text B:stä perusteltavat havainnot voivat olla oikein.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C06-T14",
      "chapterId": "06",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C06-T15",
      "chapterId": "06",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Ich esse gern Äpfel. ja Ich trinke lieber Wasser.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Ich esse gern Äpfel. | Ich trinke lieber Wasser.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS2-C06-T16",
      "chapterId": "06",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Ich esse gern Äpfel.. Varmista, että kysymys sopii tilaisuuteen Kaksi ystävää valitsee aamiaista.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C06-T17",
      "chapterId": "06",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Du isst Brot. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C06-T18",
      "chapterId": "06",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Kirjoita/äänitä lyhyt ruokamieltymyskeskustelu. Kirjoita 4–6 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS2-C06-T19",
      "chapterId": "06",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Kaksi ystävää valitsee aamiaista. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Sara: Isst du gern Brot? / Leon: Ja, aber ich esse lieber Obst.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS2-C06-T20",
      "chapterId": "06",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Käännä: ‘Juon mieluummin teetä.’ (2) Mitä Leon syö mieluummin kuin leipää?",
      "answerKey": "(1) Ich trinke lieber Tee. (2) Hedelmiä.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS2-C06-R01",
      "chapterId": "06",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Was isst du gern?”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Im Sprachkurs sprechen vier Jugendliche über ihr Lieblingsessen.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C06-R02",
      "chapterId": "06",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: „Ich esse gern Nudeln“, sagt Greta.",
      "answerKey": "„Ich esse gern Nudeln“, sagt Greta.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C06-R03",
      "chapterId": "06",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C06-R04",
      "chapterId": "06",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Valitse tekstistä kolme merkityksellistä sanaa tai ilmausta; älä poimi automaattisesti tekstin ensimmäistä sanaa tai henkilönnimeä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C06-R05",
      "chapterId": "06",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: gern, lieber; essen/trinken preesensissä.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C06-R06",
      "chapterId": "06",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Im Sprachkurs sprechen vier Jugendliche über ihr Lieblingsessen.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "07": [
    {
      "id": "LOS2-C07-T01",
      "chapterId": "07",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Im Café ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C07-T02",
      "chapterId": "07",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Mitä Mara ja Finn tilaavat kahvilassa?",
      "answerKey": "Mara tilaa teetä ja kakkua, Finn kahvia ja täytetyn sämpylän.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS2-C07-T03",
      "chapterId": "07",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Puhujien ensimmäiset vuorot: Gast: Guten Tag! Ich möchte einen Tee, bitte. | Kellnerin: Gern. Möchten Sie auch Kuchen? Suomenkielinen tulkinta: Asiakas tervehtii ja tilaa teetä. Tarjoilija ottaa pyynnön vastaan ja tarjoaa myös kakkua. Tarkista, että oma vastauksesi kuvaa kummankin puhujan ensimmäistä vuoroa.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C07-T04",
      "chapterId": "07",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Mitä asiakas tilaa?",
      "answerKey": "Tarkka saksankielinen ilmaus: Ich möchte einen Tee, bitte.\nMalliselitys: Teetä.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS2-C07-T05",
      "chapterId": "07",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: der Kaffee, die Speisekarte, die Rechnung, bestellen.",
      "answerKey": "der Kaffee = kahvi; die Speisekarte = ruokalista; die Rechnung = lasku; bestellen = tilata",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS2-C07-T06",
      "chapterId": "07",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: kahvi, ruokalista, lasku, tilata, haluaisi, ole hyvä.",
      "answerKey": "der Kaffee = kahvi; die Speisekarte = ruokalista; die Rechnung = lasku; bestellen = tilata; möchten = haluaisi; bitte = ole hyvä",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C07-T07",
      "chapterId": "07",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Ich _____ einen Tee, bitte.",
      "answerKey": "möchte",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS2-C07-T08",
      "chapterId": "07",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: Kaffee? / der / kostet / Was.",
      "answerKey": "Was kostet der Kaffee?",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS2-C07-T09",
      "chapterId": "07",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Mitä kahvi maksaa?",
      "answerKey": "Was kostet der Kaffee?",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS2-C07-T10",
      "chapterId": "07",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Ich möchte ein Kaffee. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Ich möchte einen Kaffee, sillä der Kaffee on maskuliini ja tilauksen kohde akkusatiivissa.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS2-C07-T11",
      "chapterId": "07",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö möchte(n) ja bitte; kohteliaat kysymykset. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Möchte on erittäin käyttökelpoinen toiveen ilmaus: Ich möchte einen Kaffee, bitte. Muoto muistuttaa mögen-verbiä, mutta tässä se tarkoittaa ‘haluaisin’. Kohtelias Sie-muoto on Sie möchten. Tilauslauseessa kannattaa muistaa akkusatiivi: einen Tee, eine Suppe, ein Wasser. Hinnan kysyminen käy rakenteella Was kostet …? ja laskun pyytäminen Die Rechnung, bitte.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C07-T12",
      "chapterId": "07",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Täydennä: Ich möchte ___ Saft, bitte. (ein)",
      "answerKey": "einen",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS2-C07-T13",
      "chapterId": "07",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Café am Markt. Tee 3,00 €, Kaffee 3,50 €, Kuchen 4,00 €.. Kirjoita kaksi havaintoa suomeksi. Ne voivat koskea tietoja, tekstin tarkoitusta tai ilmaisutapaa. Älä päättele tekstiin kuulumattomia yksityiskohtia.",
      "answerKey": "Mallihavainnot: 1. Tee maksaa kolme euroa. 2. Kahvi maksaa kolme euroa viisikymmentä senttiä. Myös muut Text B:stä perusteltavat havainnot voivat olla oikein.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C07-T14",
      "chapterId": "07",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C07-T15",
      "chapterId": "07",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Ich möchte einen Tee, bitte. ja Die Rechnung, bitte.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Ich möchte einen Tee, bitte. | Die Rechnung, bitte.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS2-C07-T16",
      "chapterId": "07",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Ich möchte einen Tee, bitte.. Varmista, että kysymys sopii tilaisuuteen Kahvilassa tilataan.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C07-T17",
      "chapterId": "07",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Was kostet der Kaffee? uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C07-T18",
      "chapterId": "07",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Simuloi 6–8 repliikin tilaustilanne. Kirjoita 4–6 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS2-C07-T19",
      "chapterId": "07",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Kahvilassa tilataan. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Gast: Guten Tag! Ich möchte einen Tee, bitte. / Kellnerin: Gern. Möchten Sie auch Kuchen?. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS2-C07-T20",
      "chapterId": "07",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Täydennä: Ich möchte ___ Saft, bitte. (ein) (2) Mitä asiakas tilaa?",
      "answerKey": "(1) einen (2) Teetä.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS2-C07-R01",
      "chapterId": "07",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Im Café”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Mara und Finn sitzen in einem kleinen Café in Köln.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C07-R02",
      "chapterId": "07",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Eine Kellnerin kommt an ihren Tisch.",
      "answerKey": "Eine Kellnerin kommt an ihren Tisch.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C07-R03",
      "chapterId": "07",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C07-R04",
      "chapterId": "07",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Valitse tekstistä kolme merkityksellistä sanaa tai ilmausta; älä poimi automaattisesti tekstin ensimmäistä sanaa tai henkilönnimeä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C07-R05",
      "chapterId": "07",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: möchte(n) ja bitte; kohteliaat kysymykset.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C07-R06",
      "chapterId": "07",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Mara und Finn sitzen in einem kleinen Café in Köln.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "08": [
    {
      "id": "LOS2-C08-T01",
      "chapterId": "08",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Im Supermarkt ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C08-T02",
      "chapterId": "08",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Minkä ostoslistalla olleen tuotteen Sofia unohtaa?",
      "answerKey": "Juuston.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS2-C08-T03",
      "chapterId": "08",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Puhujien ensimmäiset vuorot: Mia: Wir brauchen zwei Äpfel und ein Brot. | Tom: Brauchen wir auch Milch? Suomenkielinen tulkinta: Mia mainitsee kaksi omenaa ja leivän ostoslistalta. Tom kysyy, tarvitaanko myös maitoa. Tarkista, että oma vastauksesi kuvaa kummankin puhujan ensimmäistä vuoroa.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C08-T04",
      "chapterId": "08",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Mitä kahta ostettavaa Mia mainitsee ensimmäisessä puheenvuorossaan?",
      "answerKey": "Tarkka saksankielinen ilmaus: Wir brauchen zwei Äpfel und ein Brot.\nMalliselitys: Omenoita ja leipää.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS2-C08-T05",
      "chapterId": "08",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: der Supermarkt, das Geld, der Preis, die Banane.",
      "answerKey": "der Supermarkt = supermarket; das Geld = raha; der Preis = hinta; die Banane = banaani",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS2-C08-T06",
      "chapterId": "08",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: supermarket, raha, hinta, banaani, kasvikset, tomaatti.",
      "answerKey": "der Supermarkt = supermarket; das Geld = raha; der Preis = hinta; die Banane = banaani; das Gemüse = kasvikset; die Tomate = tomaatti",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C08-T07",
      "chapterId": "08",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Ich _____ zwei Äpfel.",
      "answerKey": "kaufe",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS2-C08-T08",
      "chapterId": "08",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: Brot? / das / kostet / viel / Wie.",
      "answerKey": "Wie viel kostet das Brot?",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS2-C08-T09",
      "chapterId": "08",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Kuinka paljon leipä maksaa?",
      "answerKey": "Wie viel kostet das Brot?",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS2-C08-T10",
      "chapterId": "08",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Ich kaufe zwei Apfel. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on zwei Äpfel, sillä Apfel-sanan monikko on Äpfel.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS2-C08-T11",
      "chapterId": "08",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö akkusatiivi uudessa ympäristössä; lukusanat eurohinnoissa. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Kun kerrot ostoksesta, tarvitset tutun akkusatiivimallin: Ich kaufe einen Apfel, eine Banane ja ein Brot. Monikossa artikkeli ja sanan muoto voivat muuttua: zwei Äpfel. Hinnat sanotaan esimerkiksi drei Euro fünfzig; euro pysyy summan jälkeen monissa tavallisissa hintailmauksissa muodossa Euro. Kaupankäynnissä voit kysyä Wie viel kostet das? ja vastata Das kostet … .",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C08-T12",
      "chapterId": "08",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Miten kysyt ‘Kuinka paljon tämä maksaa?’",
      "answerKey": "Wie viel kostet das?",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS2-C08-T13",
      "chapterId": "08",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Einkauf: 2 Äpfel, 1 Brot, 1 Liter Milch. Kasse rechts.. Kirjoita kaksi havaintoa suomeksi. Ne voivat koskea tietoja, tekstin tarkoitusta tai ilmaisutapaa. Älä päättele tekstiin kuulumattomia yksityiskohtia.",
      "answerKey": "Mallihavainnot: 1. Ostettavana on kaksi omenaa. 2. Listassa on myös yksi leipä ja litra maitoa. Myös muut Text B:stä perusteltavat havainnot voivat olla oikein.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C08-T14",
      "chapterId": "08",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C08-T15",
      "chapterId": "08",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Ich kaufe zwei Äpfel. ja Das kostet drei Euro fünfzig.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Ich kaufe zwei Äpfel. | Das kostet drei Euro fünfzig.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS2-C08-T16",
      "chapterId": "08",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Ich kaufe zwei Äpfel.. Varmista, että kysymys sopii tilaisuuteen Ruokakaupassa ostetaan.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C08-T17",
      "chapterId": "08",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Wie viel kostet das Brot? uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C08-T18",
      "chapterId": "08",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Koosta ostoslista ja osta neljä tuotetta roolipelissä. Kirjoita 4–6 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS2-C08-T19",
      "chapterId": "08",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Ruokakaupassa ostetaan. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Mia: Wir brauchen zwei Äpfel und ein Brot. / Tom: Brauchen wir auch Milch?. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS2-C08-T20",
      "chapterId": "08",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Miten kysyt ‘Kuinka paljon tämä maksaa?’ (2) Mitä kolme tuotetta ostoslistalla on?",
      "answerKey": "(1) Wie viel kostet das? (2) Omenat, leipä ja maito.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS2-C08-R01",
      "chapterId": "08",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Im Supermarkt”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Sofia geht am Samstag in den Supermarkt.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C08-R02",
      "chapterId": "08",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Auf ihrer Liste stehen Milch, Brot, Äpfel, Käse und Tomaten.",
      "answerKey": "Auf ihrer Liste stehen Milch, Brot, Äpfel, Käse und Tomaten.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C08-R03",
      "chapterId": "08",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C08-R04",
      "chapterId": "08",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Valitse tekstistä kolme merkityksellistä sanaa tai ilmausta; älä poimi automaattisesti tekstin ensimmäistä sanaa tai henkilönnimeä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C08-R05",
      "chapterId": "08",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: akkusatiivi uudessa ympäristössä; lukusanat eurohinnoissa.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C08-R06",
      "chapterId": "08",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Sofia geht am Samstag in den Supermarkt.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "09": [
    {
      "id": "LOS2-C09-T01",
      "chapterId": "09",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko In der Stadt ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C09-T02",
      "chapterId": "09",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Mihin Tom kysyy kulkuohjeita?",
      "answerKey": "Kirjastoon.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS2-C09-T03",
      "chapterId": "09",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Puhujien ensimmäiset vuorot: Touristin: Entschuldigung, wo ist der Bahnhof? | Frau: Der Bahnhof ist dort, links. Suomenkielinen tulkinta: Turisti pyytää aseman sijaintia. Nainen opastaa, että asema on vasemmalla. Tarkista, että oma vastauksesi kuvaa kummankin puhujan ensimmäistä vuoroa.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C09-T04",
      "chapterId": "09",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Missä rautatieasema sijaitsee annetussa opasteessa?",
      "answerKey": "Tarkka saksankielinen ilmaus: Der Bahnhof ist dort, links.\nMalliselitys: Vasemmalla.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS2-C09-T05",
      "chapterId": "09",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: die Stadt, die Straße, der Bahnhof, die Bank.",
      "answerKey": "die Stadt = kaupunki; die Straße = katu; der Bahnhof = rautatieasema; die Bank = pankki",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS2-C09-T06",
      "chapterId": "09",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: kaupunki, katu, rautatieasema, pankki, apteekki, vasemmalla.",
      "answerKey": "die Stadt = kaupunki; die Straße = katu; der Bahnhof = rautatieasema; die Bank = pankki; die Apotheke = apteekki; links = vasemmalla",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C09-T07",
      "chapterId": "09",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Wo _____ der Bahnhof?",
      "answerKey": "ist",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS2-C09-T08",
      "chapterId": "09",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: Stadt. / der / in / bin / Ich.",
      "answerKey": "Ich bin in der Stadt.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS2-C09-T09",
      "chapterId": "09",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Olen kaupungissa.",
      "answerKey": "Ich bin in der Stadt.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS2-C09-T10",
      "chapterId": "09",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Wohin ist der Bahnhof? ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Wo ist der Bahnhof?, kun kysyt aseman sijaintia etkä suuntaa.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS2-C09-T11",
      "chapterId": "09",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö wo/wohin alkeina; in/bei kiinteissä fraaseissa. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Wo kysyy ‘missä’, wohin kysyy ‘minne’. Voit oppia alkuvaiheessa ilmaukset Ich bin in der Stadt ja Ich gehe in die Stadt kokonaisina malleina. Ensimmäinen ilmaisee paikan, toinen liikkeen kohti paikkaa. Eri prepositioiden täysi datiivi–akkusatiivi-järjestelmä kuuluu myöhemmän kieliopin laajennuksiin, eikä sitä tarvitse vielä päätellä itse. Muista myös kysymys Wo ist der Bahnhof?",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C09-T12",
      "chapterId": "09",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Mikä kysymyssana täydentää: ___ gehst du? (Minne menet?)",
      "answerKey": "Wohin",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS2-C09-T13",
      "chapterId": "09",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Stadtplan: Bahnhof links, Café rechts, Park in der Mitte.. Kirjoita kaksi havaintoa suomeksi. Ne voivat koskea tietoja, tekstin tarkoitusta tai ilmaisutapaa. Älä päättele tekstiin kuulumattomia yksityiskohtia.",
      "answerKey": "Mallihavainnot: 1. Asema on kartassa vasemmalla. 2. Kahvila on oikealla ja puisto keskellä. Myös muut Text B:stä perusteltavat havainnot voivat olla oikein.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C09-T14",
      "chapterId": "09",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C09-T15",
      "chapterId": "09",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Wo ist der Bahnhof? ja Ich gehe in die Stadt.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Wo ist der Bahnhof? | Ich gehe in die Stadt.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS2-C09-T16",
      "chapterId": "09",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Wo ist der Bahnhof?. Varmista, että kysymys sopii tilaisuuteen Kaupungilla kysytään reittiä.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C09-T17",
      "chapterId": "09",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Ich bin in der Stadt. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C09-T18",
      "chapterId": "09",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Kysy missä apteekki/kahvila on; ymmärrä helppo vastaus. Kirjoita 4–6 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS2-C09-T19",
      "chapterId": "09",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Kaupungilla kysytään reittiä. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Touristin: Entschuldigung, wo ist der Bahnhof? / Frau: Der Bahnhof ist dort, links.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS2-C09-T20",
      "chapterId": "09",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Mikä kysymyssana täydentää: ___ gehst du? (Minne menet?) (2) Missä rautatieasema sijaitsee annetussa opasteessa?",
      "answerKey": "(1) Wohin (2) Vasemmalla.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS2-C09-R01",
      "chapterId": "09",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “In der Stadt”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Tom besucht zum ersten Mal Leipzig.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C09-R02",
      "chapterId": "09",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Er möchte die Bibliothek finden, aber sein Handy hat keinen Akku mehr.",
      "answerKey": "Er möchte die Bibliothek finden, aber sein Handy hat keinen Akku mehr.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C09-R03",
      "chapterId": "09",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C09-R04",
      "chapterId": "09",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Valitse tekstistä kolme merkityksellistä sanaa tai ilmausta; älä poimi automaattisesti tekstin ensimmäistä sanaa tai henkilönnimeä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C09-R05",
      "chapterId": "09",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: wo/wohin alkeina; in/bei kiinteissä fraaseissa.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS2-C09-R06",
      "chapterId": "09",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Tom besucht zum ersten Mal Leipzig.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ]
};
