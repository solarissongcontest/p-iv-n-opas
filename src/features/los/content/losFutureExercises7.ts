import type { LosFutureExerciseDraft } from "./losFutureExerciseTypes";
/** LOS! 7: 260 kirjakohtaista tehtävää; kielellinen ja arvioinnin tarkistus kesken. */
export const LOS_FUTURE_EXERCISES_7: Record<string, LosFutureExerciseDraft[]> = {
  "10": [
    {
      "id": "LOS7-C10-T01",
      "chapterId": "10",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Mein Zukunftsplan ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C10-T02",
      "chapterId": "10",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Mitä Karim harkitsee tekevänsä koulun jälkeen?",
      "answerKey": "Ammatillisen koulutuksen aloittamista.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS7-C10-T03",
      "chapterId": "10",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Mia: Was willst du nächstes Jahr machen?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C10-T04",
      "chapterId": "10",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Miksi Ben haluaa opiskella lisää saksaa?",
      "answerKey": "Tarkka saksankielinen ilmaus: Weil ich vielleicht in Deutschland studieren möchte.\nMalliselitys: Koska hän saattaa opiskella Saksassa.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS7-C10-T05",
      "chapterId": "10",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: die Entscheidung, der Plan, die Zukunft, die Chance.",
      "answerKey": "die Entscheidung = päätös; der Plan = suunnitelma; die Zukunft = tulevaisuus; die Chance = mahdollisuus",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS7-C10-T06",
      "chapterId": "10",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: päätös, suunnitelma, tulevaisuus, mahdollisuus, tavoite, toive.",
      "answerKey": "die Entscheidung = päätös; der Plan = suunnitelma; die Zukunft = tulevaisuus; die Chance = mahdollisuus; das Ziel = tavoite; der Wunsch = toive",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C10-T07",
      "chapterId": "10",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Ich _____ später studieren.",
      "answerKey": "möchte",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS7-C10-T08",
      "chapterId": "10",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: arbeiten. / Ausland / im / gern / würde / Ich.",
      "answerKey": "Ich würde gern im Ausland arbeiten.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS7-C10-T09",
      "chapterId": "10",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Haluaisin työskennellä ulkomailla..",
      "answerKey": "Ich würde gern im Ausland arbeiten.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS7-C10-T10",
      "chapterId": "10",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Ich lerne Deutsch, weil es ist nützlich. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on weil es nützlich ist.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS7-C10-T11",
      "chapterId": "10",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö werden, möchte, würde, weil: synteesi. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Yhdistä lauseet Ich möchte …, Ich würde gern …, Ich werde … ja Ich denke, dass … . Futuurin infinitiivi jää loppuun: Ich werde Deutsch lernen. Weil ja dass vaativat oman sivulausejärjestyksensä. Hyvä suunnitelma kertoo yhden kiinnostuksen, tavoitteen, perustelun ja seuraavan pienen askeleen. Selkeys on tärkeämpää kuin vaikea sanasto.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C10-T12",
      "chapterId": "10",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Täydennä: Ich möchte später in Deutschland ___ . (arbeiten)",
      "answerKey": "arbeiten",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS7-C10-T13",
      "chapterId": "10",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Plan: nächstes Jahr Deutsch üben; später vielleicht im Ausland studieren.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Plan: nächstes Jahr Deutsch üben; später vielleicht im Ausland studieren. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C10-T14",
      "chapterId": "10",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C10-T15",
      "chapterId": "10",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Ich möchte später studieren. ja Ich lerne Deutsch, weil es nützlich ist.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Ich möchte später studieren. | Ich lerne Deutsch, weil es nützlich ist.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS7-C10-T16",
      "chapterId": "10",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Ich möchte später studieren.. Varmista, että kysymys sopii tilaisuuteen Tulevaisuuden suunnitelma.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C10-T17",
      "chapterId": "10",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Ich würde gern im Ausland arbeiten. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C10-T18",
      "chapterId": "10",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Esitä 1–2 minuutin suunnitelma ja kirjoita lyhyt yhteenveto. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS7-C10-T19",
      "chapterId": "10",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Tulevaisuuden suunnitelma. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Mia: Was willst du nächstes Jahr machen? / Ben: Ich möchte mehr Deutsch lernen.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS7-C10-T20",
      "chapterId": "10",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Täydennä: Ich möchte später in Deutschland ___ . (arbeiten) (2) Miksi Ben haluaa opiskella lisää saksaa?",
      "answerKey": "(1) arbeiten (2) Koska hän saattaa opiskella Saksassa.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS7-C10-R01",
      "chapterId": "10",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Mein Zukunftsplan”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Für die letzte Unterrichtswoche schreibt jeder einen Zukunftsplan.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C10-R02",
      "chapterId": "10",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Karim möchte zunächst die Schule abschließen.",
      "answerKey": "Karim möchte zunächst die Schule abschließen.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C10-R03",
      "chapterId": "10",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C10-R04",
      "chapterId": "10",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Valitse tekstistä kolme merkityksellistä sanaa tai ilmausta; älä poimi automaattisesti tekstin ensimmäistä sanaa tai henkilönnimeä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C10-R05",
      "chapterId": "10",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: werden, möchte, würde, weil: synteesi.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C10-R06",
      "chapterId": "10",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Für die letzte Unterrichtswoche schreibt jeder einen Zukunftsplan.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "01": [
    {
      "id": "LOS7-C01-T01",
      "chapterId": "01",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Meine Stärken ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C01-T02",
      "chapterId": "01",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Missä asiassa Lina on hyvä?",
      "answerKey": "Järjestämisessä.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS7-C01-T03",
      "chapterId": "01",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Mira: Was kannst du gut?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C01-T04",
      "chapterId": "01",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Mitä Jonas haluaa oppia paremmin?",
      "answerKey": "Tarkka saksankielinen ilmaus: Noch besser Deutsch sprechen.\nMalliselitys: Puhumaan saksaa.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS7-C01-T05",
      "chapterId": "01",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: die Stärke, die Fähigkeit, gut, geduldig.",
      "answerKey": "die Stärke = vahvuus; die Fähigkeit = taito; gut = hyvä; geduldig = kärsivällinen",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS7-C01-T06",
      "chapterId": "01",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: vahvuus, taito, hyvä, kärsivällinen, ystävällinen, luova.",
      "answerKey": "die Stärke = vahvuus; die Fähigkeit = taito; gut = hyvä; geduldig = kärsivällinen; freundlich = ystävällinen; kreativ = luova",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C01-T07",
      "chapterId": "01",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Ich _____ gut rechnen.",
      "answerKey": "kann",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS7-C01-T08",
      "chapterId": "01",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: Mathe. / in / gut / bin / Ich.",
      "answerKey": "Ich bin gut in Mathe.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS7-C01-T09",
      "chapterId": "01",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Olen hyvä matematiikassa..",
      "answerKey": "Ich bin gut in Mathe.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS7-C01-T10",
      "chapterId": "01",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Ich kann gut rechne. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Ich kann gut rechnen, koska können vaatii infinitiivin.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS7-C01-T11",
      "chapterId": "01",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö können, gut in; adjektiivit. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Können ilmaisee osaamista: Ich kann gut rechnen. Adjektiivit voivat kuvata taitoa: Ich bin kreativ. Valmis ilmaus gut in + datiivi/kiinteä oppiaine sopii kouluyhteyteen: Ich bin gut in Mathe. Ero on tärkeä: osaan tehdä jotakin (können + infinitiivi) ja olen hyvä jossakin (gut in + kohde).",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C01-T12",
      "chapterId": "01",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Täydennä: Ich ___ gut schreiben. (können, minä)",
      "answerKey": "kann",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS7-C01-T13",
      "chapterId": "01",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Profil: Stärken: Teamarbeit, Sprachen. Ziel: mehr Erfahrung.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Profil: Stärken: Teamarbeit, Sprachen. Ziel: mehr Erfahrung. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C01-T14",
      "chapterId": "01",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C01-T15",
      "chapterId": "01",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Ich kann gut rechnen. ja Ich arbeite gern mit Menschen.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Ich kann gut rechnen. | Ich arbeite gern mit Menschen.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS7-C01-T16",
      "chapterId": "01",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Ich kann gut rechnen.. Varmista, että kysymys sopii tilaisuuteen Omista vahvuuksista kertominen.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C01-T17",
      "chapterId": "01",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Ich bin gut in Mathe. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C01-T18",
      "chapterId": "01",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Esittele itsesi opiskelijana 6–8 lauseella. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS7-C01-T19",
      "chapterId": "01",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Omista vahvuuksista kertominen. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Mira: Was kannst du gut? / Jonas: Ich kann gut erklären und organisieren.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS7-C01-T20",
      "chapterId": "01",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Täydennä: Ich ___ gut schreiben. (können, minä) (2) Mitä Jonas haluaa oppia paremmin?",
      "answerKey": "(1) kann (2) Puhumaan saksaa.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS7-C01-R01",
      "chapterId": "01",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Meine Stärken”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Im Deutschkurs stellen sich die Jugendlichen die Frage: „Was kann ich gut?“ Lina sagt, dass sie gern organisiert.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C01-R02",
      "chapterId": "01",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Karim kann gut mit Menschen sprechen.",
      "answerKey": "Karim kann gut mit Menschen sprechen.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C01-R03",
      "chapterId": "01",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C01-R04",
      "chapterId": "01",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Valitse tekstistä kolme merkityksellistä sanaa tai ilmausta; älä poimi automaattisesti tekstin ensimmäistä sanaa tai henkilönnimeä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C01-R05",
      "chapterId": "01",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: können, gut in; adjektiivit.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C01-R06",
      "chapterId": "01",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Im Deutschkurs stellen sich die Jugendlichen die Frage: „Was kann ich … ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "02": [
    {
      "id": "LOS7-C02-T01",
      "chapterId": "02",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Mein Schulalltag ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C02-T02",
      "chapterId": "02",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Miksi Sofia pitää biologiasta?",
      "answerKey": "Koska siinä tehdään kokeita.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS7-C02-T03",
      "chapterId": "02",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Aylin: Wann beginnt dein Unterricht?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C02-T04",
      "chapterId": "02",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Miksi Leon päivä on pitkä?",
      "answerKey": "Tarkka saksankielinen ilmaus: weil ich nach der Schule noch lerne.\nMalliselitys: Hän opiskelee vielä koulun jälkeen.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS7-C02-T05",
      "chapterId": "02",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: die Schule, die Klasse, das Fach, der Stundenplan.",
      "answerKey": "die Schule = koulu; die Klasse = luokka; das Fach = oppiaine; der Stundenplan = lukujärjestys",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS7-C02-T06",
      "chapterId": "02",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: koulu, luokka, oppiaine, lukujärjestys, opiskella, kotitehtävä.",
      "answerKey": "die Schule = koulu; die Klasse = luokka; das Fach = oppiaine; der Stundenplan = lukujärjestys; lernen = opiskella; die Hausaufgabe = kotitehtävä",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C02-T07",
      "chapterId": "02",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Am _____ habe ich Chemie.",
      "answerKey": "Montag",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS7-C02-T08",
      "chapterId": "02",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: habe. / Prüfung / eine / bald / ich / weil / viel, / lerne / Ich.",
      "answerKey": "Ich lerne viel, weil ich bald eine Prüfung habe.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS7-C02-T09",
      "chapterId": "02",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Opiskelen paljon, koska minulla on pian koe..",
      "answerKey": "Ich lerne viel, weil ich bald eine Prüfung habe.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS7-C02-T10",
      "chapterId": "02",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Am Montag ich habe Chemie. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Am Montag habe ich Chemie.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS7-C02-T11",
      "chapterId": "02",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö preesens, ajanmääreet, weil. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Ajanilmauksella voit aloittaa lauseen: Am Montag habe ich Physik. Verbi on silti toisena. Kun perustelet mielipiteen weil-lauseella, sen verbi menee loppuun: Ich mag Chemie, weil die Experimente interessant sind. Tässä kappaleessa yhdistyvät siis kaksi erilaista sanajärjestyssääntöä. Älä jätä weil-sivulausetta ilman predikaattia.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C02-T12",
      "chapterId": "02",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Täydennä: Ich mag Deutsch, weil es interessant ___ .",
      "answerKey": "ist",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS7-C02-T13",
      "chapterId": "02",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Stundenplan: Unterricht 8–15 Uhr, Lernen 16–17 Uhr.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Stundenplan: Unterricht 8–15 Uhr, Lernen 16–17 Uhr. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C02-T14",
      "chapterId": "02",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C02-T15",
      "chapterId": "02",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Am Montag habe ich Chemie. ja Nach der Schule gehe ich nach Hause.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Am Montag habe ich Chemie. | Nach der Schule gehe ich nach Hause.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS7-C02-T16",
      "chapterId": "02",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Am Montag habe ich Chemie.. Varmista, että kysymys sopii tilaisuuteen Koulupäivän haasteista.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C02-T17",
      "chapterId": "02",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Ich lerne viel, weil ich bald eine Prüfung habe. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C02-T18",
      "chapterId": "02",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Kerro miten opiskelet. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS7-C02-T19",
      "chapterId": "02",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Koulupäivän haasteista. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Aylin: Wann beginnt dein Unterricht? / Leo: Um acht Uhr.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS7-C02-T20",
      "chapterId": "02",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Täydennä: Ich mag Deutsch, weil es interessant ___ . (2) Miksi Leon päivä on pitkä?",
      "answerKey": "(1) ist (2) Hän opiskelee vielä koulun jälkeen.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS7-C02-R01",
      "chapterId": "02",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Mein Schulalltag”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Sofia besucht eine Schule in Finnland und erzählt einer deutschen Freundin von ihrem Alltag.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C02-R02",
      "chapterId": "02",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Der Unterricht beginnt an manchen Tagen um acht Uhr, an anderen später.",
      "answerKey": "Der Unterricht beginnt an manchen Tagen um acht Uhr, an anderen später.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C02-R03",
      "chapterId": "02",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C02-R04",
      "chapterId": "02",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Valitse tekstistä kolme merkityksellistä sanaa tai ilmausta; älä poimi automaattisesti tekstin ensimmäistä sanaa tai henkilönnimeä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C02-R05",
      "chapterId": "02",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: preesens, ajanmääreet, weil.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C02-R06",
      "chapterId": "02",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Sofia besucht eine Schule in Finnland und erzählt einer deutschen Freu… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "03": [
    {
      "id": "LOS7-C03-T01",
      "chapterId": "03",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Prüfungen und Ziele ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C03-T02",
      "chapterId": "03",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Miten Tom jaksottaa kokeeseen lukemistaan?",
      "answerKey": "Hän opiskelee päivittäin pienen aiheen ja kertaa vanhoja tehtäviä.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS7-C03-T03",
      "chapterId": "03",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Sara: Musst du heute lernen?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C03-T04",
      "chapterId": "03",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Miksi Ben opiskelee?",
      "answerKey": "Tarkka saksankielinen ilmaus: morgen habe ich eine Prüfung.\nMalliselitys: Hänellä on huomenna koe.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS7-C03-T05",
      "chapterId": "03",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: die Prüfung, das Ergebnis, die Note, wiederholen.",
      "answerKey": "die Prüfung = koe; das Ergebnis = tulos; die Note = arvosana; wiederholen = kerrata",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS7-C03-T06",
      "chapterId": "03",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: koe, tulos, arvosana, kerrata, harjoitella, tavoite.",
      "answerKey": "die Prüfung = koe; das Ergebnis = tulos; die Note = arvosana; wiederholen = kerrata; üben = harjoitella; das Ziel = tavoite",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C03-T07",
      "chapterId": "03",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Ich _____ für die Prüfung lernen.",
      "answerKey": "muss",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS7-C03-T08",
      "chapterId": "03",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: lesen. / Text / einen / soll / Ich.",
      "answerKey": "Ich soll einen Text lesen.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS7-C03-T09",
      "chapterId": "03",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Minun pitää ohjeen mukaan lukea teksti..",
      "answerKey": "Ich soll einen Text lesen.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS7-C03-T10",
      "chapterId": "03",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Ich muss lernen für die Prüfung. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Luonteva neutraali malli on Ich muss für die Prüfung lernen, koska infinitiivi sijoittuu loppuun.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS7-C03-T11",
      "chapterId": "03",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö müssen/sollen; ajalliset rakenteet. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Müssen ilmaisee, että jokin on pakko tehdä: Ich muss heute lernen. Sollen viittaa esimerkiksi ohjeeseen tai odotukseen: Ich soll diese Aufgabe machen. Sollten on puolestaan pehmeämpi suositus: Du solltest früher anfangen. Kaikkien kanssa tekemistä ilmaiseva verbi on infinitiivissä lopussa. Älä ajattele, että kaikki kolme tarkoittavat täsmälleen samaa.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C03-T12",
      "chapterId": "03",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Täydennä: Du ___ mehr üben. (sollten, sinä)",
      "answerKey": "solltest",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS7-C03-T13",
      "chapterId": "03",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Lernplan: Montag Wiederholung; Dienstag Prüfung; Mittwoch Pause.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Lernplan: Montag Wiederholung; Dienstag Prüfung; Mittwoch Pause. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C03-T14",
      "chapterId": "03",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C03-T15",
      "chapterId": "03",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Ich muss für die Prüfung lernen. ja Ich möchte ein gutes Ergebnis erreichen.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Ich muss für die Prüfung lernen. | Ich möchte ein gutes Ergebnis erreichen.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS7-C03-T16",
      "chapterId": "03",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Ich muss für die Prüfung lernen.. Varmista, että kysymys sopii tilaisuuteen Kokeisiin valmistautumisesta.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C03-T17",
      "chapterId": "03",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Ich soll einen Text lesen. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C03-T18",
      "chapterId": "03",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Tee lyhyt opiskelusuunnitelma. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS7-C03-T19",
      "chapterId": "03",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Kokeisiin valmistautumisesta. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Sara: Musst du heute lernen? / Ben: Ja, morgen habe ich eine Prüfung.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS7-C03-T20",
      "chapterId": "03",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Täydennä: Du ___ mehr üben. (sollten, sinä) (2) Miksi Ben opiskelee?",
      "answerKey": "(1) solltest (2) Hänellä on huomenna koe.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS7-C03-R01",
      "chapterId": "03",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Prüfungen und Ziele”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Tom schreibt nächste Woche eine Prüfung.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C03-R02",
      "chapterId": "03",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Zuerst fühlt er sich unsicher, denn der Lernstoff ist umfangreich.",
      "answerKey": "Zuerst fühlt er sich unsicher, denn der Lernstoff ist umfangreich.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C03-R03",
      "chapterId": "03",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C03-R04",
      "chapterId": "03",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Valitse tekstistä kolme merkityksellistä sanaa tai ilmausta; älä poimi automaattisesti tekstin ensimmäistä sanaa tai henkilönnimeä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C03-R05",
      "chapterId": "03",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: müssen/sollen; ajalliset rakenteet.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C03-R06",
      "chapterId": "03",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Tom schreibt nächste Woche eine Prüfung.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "04": [
    {
      "id": "LOS7-C04-T01",
      "chapterId": "04",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Nach der Schule ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C04-T02",
      "chapterId": "04",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Mitä Paul haluaisi tehdä ennen mahdollisia jatko-opintoja?",
      "answerKey": "Harjoittelun.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS7-C04-T03",
      "chapterId": "04",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Nina: Was möchtest du nach der Schule machen?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C04-T04",
      "chapterId": "04",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Mitä Paul haluaa tehdä koulun jälkeen?",
      "answerKey": "Tarkka saksankielinen ilmaus: Ich würde gern an einer Universität studieren.\nMalliselitys: Opiskella yliopistossa.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS7-C04-T05",
      "chapterId": "04",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: die Zukunft, später, studieren, das Studium.",
      "answerKey": "die Zukunft = tulevaisuus; später = myöhemmin; studieren = opiskella yliopistossa; das Studium = korkeakouluopinnot",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS7-C04-T06",
      "chapterId": "04",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: tulevaisuus, myöhemmin, opiskella yliopistossa, korkeakouluopinnot, yliopisto, ammatti.",
      "answerKey": "die Zukunft = tulevaisuus; später = myöhemmin; studieren = opiskella yliopistossa; das Studium = korkeakouluopinnot; die Universität = yliopisto; der Beruf = ammatti",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C04-T07",
      "chapterId": "04",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Ich _____ gern Medizin studieren.",
      "answerKey": "würde",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS7-C04-T08",
      "chapterId": "04",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: reisen. / ich / möchte / Jahr / Nächstes.",
      "answerKey": "Nächstes Jahr möchte ich reisen.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS7-C04-T09",
      "chapterId": "04",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Ensi vuonna haluaisin matkustaa..",
      "answerKey": "Nächstes Jahr möchte ich reisen.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS7-C04-T10",
      "chapterId": "04",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Ich würde gern studiere Medizin. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Ich würde gern Medizin studieren, koska pääverbi on infinitiivissä.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS7-C04-T11",
      "chapterId": "04",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö möchte/würde gern; tulevaisuuden ajanilmaisut. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Ich möchte … on tuttu kohtelias toive. Ich würde gern … tekee toiveesta vielä harkitsevamman: Ich würde gern Medizin studieren. Molemmissa pääverbi on infinitiivissä lopussa. Tulevaisuuden voi kertoa myös preesensillä ja ajanilmauksella: Nächstes Jahr beginne ich … . Tällaiset lauseet sopivat A2.1-tason tavoitteisiin paremmin kuin monimutkainen ehtolauseiden järjestelmä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C04-T12",
      "chapterId": "04",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Täydennä: Ich ___ gern Medizin studieren. (würde)",
      "answerKey": "würde",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS7-C04-T13",
      "chapterId": "04",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Infoabend: Studienmöglichkeiten am Donnerstag, 18 Uhr.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Infoabend: Studienmöglichkeiten am Donnerstag, 18 Uhr. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C04-T14",
      "chapterId": "04",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C04-T15",
      "chapterId": "04",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Ich würde gern Medizin studieren. ja Ich interessiere mich für Biologie.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Ich würde gern Medizin studieren. | Ich interessiere mich für Biologie.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS7-C04-T16",
      "chapterId": "04",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Ich würde gern Medizin studieren.. Varmista, että kysymys sopii tilaisuuteen Opiskelupaikkoja suunnitellaan.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C04-T17",
      "chapterId": "04",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Nächstes Jahr möchte ich reisen. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C04-T18",
      "chapterId": "04",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Kuvaa kaksi mahdollista opintopolkua. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS7-C04-T19",
      "chapterId": "04",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Opiskelupaikkoja suunnitellaan. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Nina: Was möchtest du nach der Schule machen? / Paul: Ich würde gern an einer Universität studieren.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS7-C04-T20",
      "chapterId": "04",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Täydennä: Ich ___ gern Medizin studieren. (würde) (2) Mitä Paul haluaa tehdä koulun jälkeen?",
      "answerKey": "(1) würde (2) Opiskella yliopistossa.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS7-C04-R01",
      "chapterId": "04",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Nach der Schule”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Nach der Schule möchte Anna vielleicht studieren.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C04-R02",
      "chapterId": "04",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Sie interessiert sich für Sprachen und Naturwissenschaften.",
      "answerKey": "Sie interessiert sich für Sprachen und Naturwissenschaften.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C04-R03",
      "chapterId": "04",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C04-R04",
      "chapterId": "04",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Valitse tekstistä kolme merkityksellistä sanaa tai ilmausta; älä poimi automaattisesti tekstin ensimmäistä sanaa tai henkilönnimeä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C04-R05",
      "chapterId": "04",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: möchte/würde gern; tulevaisuuden ajanilmaisut.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C04-R06",
      "chapterId": "04",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Nach der Schule möchte Anna vielleicht studieren.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "05": [
    {
      "id": "LOS7-C05-T01",
      "chapterId": "05",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Berufe und Arbeit ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C05-T02",
      "chapterId": "05",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Mihin työpaikkaan Mia tutustuu projektiviikolla?",
      "answerKey": "Kirjastoon.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS7-C05-T03",
      "chapterId": "05",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Mara: Was möchtest du später werden?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C05-T04",
      "chapterId": "05",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Mitä Oli harkitsee ammatikseen?",
      "answerKey": "Tarkka saksankielinen ilmaus: Vielleicht Arzt, aber ich bin noch nicht sicher.\nMalliselitys: Lääkäriä.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS7-C05-T05",
      "chapterId": "05",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: der Beruf, der Job, der Arzt, die Ärztin.",
      "answerKey": "der Beruf = ammatti; der Job = työ; der Arzt = lääkäri; die Ärztin = lääkäri",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS7-C05-T06",
      "chapterId": "05",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: ammatti, työ, lääkäri, lääkäri, opettaja, opettaja.",
      "answerKey": "der Beruf = ammatti; der Job = työ; der Arzt = lääkäri; die Ärztin = lääkäri; der Lehrer = opettaja; die Lehrerin = opettaja",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C05-T07",
      "chapterId": "05",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Ich _____ Ärztin werden.",
      "answerKey": "möchte",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS7-C05-T08",
      "chapterId": "05",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: arbeiten. / morgen / werde / Ich.",
      "answerKey": "Ich werde morgen arbeiten.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS7-C05-T09",
      "chapterId": "05",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Työskentelen huomenna..",
      "answerKey": "Ich werde morgen arbeiten.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS7-C05-T10",
      "chapterId": "05",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Ich werde morgen arbeite. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Ich werde morgen arbeiten, sillä futuurissa pääverbi on infinitiivissä.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS7-C05-T11",
      "chapterId": "05",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö werden tulevaisuuden ilmauksissa; preesens. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Werden voi tarkoittaa ‘tulla joksikin’: Ich werde Arzt. Futuurissa käytetään werden + infinitiivi: Ich werde morgen arbeiten. Arjessa tulevaisuudesta puhutaan usein myös preesensillä: Morgen arbeite ich. Siksi futuuri ei ole aina pakollinen. Vältä sekoittamasta tulla joksikin -merkitystä ja futuuriapuvälinettä: lauseen rakenne ratkaisee tulkinnan.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C05-T12",
      "chapterId": "05",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Täydennä: Ich werde morgen Deutsch ___ . (lernen)",
      "answerKey": "lernen",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS7-C05-T13",
      "chapterId": "05",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Berufsmesse: Medizin, Technik, Handwerk und Soziales. Eintritt frei.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Berufsmesse: Medizin, Technik, Handwerk und Soziales. Eintritt frei. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C05-T14",
      "chapterId": "05",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C05-T15",
      "chapterId": "05",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Ich möchte Ärztin werden. ja Morgen arbeite ich.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Ich möchte Ärztin werden. | Morgen arbeite ich.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS7-C05-T16",
      "chapterId": "05",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Ich möchte Ärztin werden.. Varmista, että kysymys sopii tilaisuuteen Ammateista ja työstä.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C05-T17",
      "chapterId": "05",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Ich werde morgen arbeiten. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C05-T18",
      "chapterId": "05",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Kerro kiinnostavasta ammatista ja miksi. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS7-C05-T19",
      "chapterId": "05",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Ammateista ja työstä. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Mara: Was möchtest du später werden? / Oli: Vielleicht Arzt, aber ich bin noch nicht sicher.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS7-C05-T20",
      "chapterId": "05",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Täydennä: Ich werde morgen Deutsch ___ . (lernen) (2) Mitä Oli harkitsee ammatikseen?",
      "answerKey": "(1) lernen (2) Lääkäriä.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS7-C05-R01",
      "chapterId": "05",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Berufe und Arbeit”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "In einer Projektwoche besuchen die Jugendlichen verschiedene Arbeitsplätze.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C05-R02",
      "chapterId": "05",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Lara spricht mit einer Ingenieurin.",
      "answerKey": "Lara spricht mit einer Ingenieurin.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C05-R03",
      "chapterId": "05",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C05-R04",
      "chapterId": "05",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Valitse tekstistä kolme merkityksellistä sanaa tai ilmausta; älä poimi automaattisesti tekstin ensimmäistä sanaa tai henkilönnimeä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C05-R05",
      "chapterId": "05",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: werden tulevaisuuden ilmauksissa; preesens.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C05-R06",
      "chapterId": "05",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: In einer Projektwoche besuchen die Jugendlichen verschiedene Arbeitspl… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "06": [
    {
      "id": "LOS7-C06-T01",
      "chapterId": "06",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Eine Stellenanzeige ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C06-T02",
      "chapterId": "06",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Milloin kahvilan kesätyöntekijän pitää olla käytettävissä?",
      "answerKey": "Viikonloppuisin.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS7-C06-T03",
      "chapterId": "06",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Lea: Hier gibt es einen Ferienjob.. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C06-T04",
      "chapterId": "06",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Mikä työn keskeinen aikatauluvaatimus on?",
      "answerKey": "Tarkka saksankielinen ilmaus: Man muss am Wochenende arbeiten können.\nMalliselitys: Viikonloppuisin.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS7-C06-T05",
      "chapterId": "06",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: die Stellenanzeige, die Erfahrung, die Aufgabe, die Bewerbung.",
      "answerKey": "die Stellenanzeige = työpaikkailmoitus; die Erfahrung = kokemus; die Aufgabe = tehtävä; die Bewerbung = hakemus",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS7-C06-T06",
      "chapterId": "06",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: työpaikkailmoitus, kokemus, tehtävä, hakemus, työaika, edellytys.",
      "answerKey": "die Stellenanzeige = työpaikkailmoitus; die Erfahrung = kokemus; die Aufgabe = tehtävä; die Bewerbung = hakemus; die Arbeitszeit = työaika; die Voraussetzung = edellytys",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C06-T07",
      "chapterId": "06",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Wir _____ eine Aushilfe.",
      "answerKey": "suchen",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS7-C06-T08",
      "chapterId": "06",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: arbeiten. / Wochenende / am / müssen / Sie.",
      "answerKey": "Sie müssen am Wochenende arbeiten.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS7-C06-T09",
      "chapterId": "06",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Teidän täytyy työskennellä viikonloppuna..",
      "answerKey": "Sie müssen am Wochenende arbeiten.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS7-C06-T10",
      "chapterId": "06",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Sie müssen arbeiten am Wochenende. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Neutraali järjestys on Sie müssen am Wochenende arbeiten; toinen verbi jää loppuun.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS7-C06-T11",
      "chapterId": "06",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö ehtojen ymmärtäminen: können/müssen. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Ilmoituksessa saatat nähdä Wir suchen … , Sie müssen … ja Sie können … . Muista, että müssen ilmaisee vaatimusta, können mahdollisuutta tai kykyä. Tunnista myös zeitlich ilmaukset ab Montag, am Wochenende sekä Stunden pro Woche. Tarkista, tarkoittaako Sie kohteliasta hakijaa vai he-pronominia asiayhteydestä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C06-T12",
      "chapterId": "06",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Mitä ilmaus ab Montag tarkoittaa?",
      "answerKey": "maanantaista alkaen",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS7-C06-T13",
      "chapterId": "06",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Ferienjob im Café: Samstag und Sonntag; Deutschkenntnisse erwünscht.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Ferienjob im Café: Samstag und Sonntag; Deutschkenntnisse erwünscht. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C06-T14",
      "chapterId": "06",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C06-T15",
      "chapterId": "06",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Wir suchen eine Aushilfe. ja Sie können eine E-Mail schicken.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Wir suchen eine Aushilfe. | Sie können eine E-Mail schicken.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS7-C06-T16",
      "chapterId": "06",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Wir suchen eine Aushilfe.. Varmista, että kysymys sopii tilaisuuteen Työpaikkailmoitusta luetaan.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C06-T17",
      "chapterId": "06",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Sie müssen am Wochenende arbeiten. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C06-T18",
      "chapterId": "06",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Poimi tehtävä, paikka, aikataulu ja vaatimukset. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS7-C06-T19",
      "chapterId": "06",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Työpaikkailmoitusta luetaan. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Lea: Hier gibt es einen Ferienjob. / Tom: Was muss man können?. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS7-C06-T20",
      "chapterId": "06",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Mitä ilmaus ab Montag tarkoittaa? (2) Mikä työn keskeinen aikatauluvaatimus on?",
      "answerKey": "(1) maanantaista alkaen (2) Työskentely lauantaisin ja sunnuntaisin.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS7-C06-R01",
      "chapterId": "06",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Eine Stellenanzeige”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Emma liest eine Stellenanzeige für einen Ferienjob in einem Café.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C06-R02",
      "chapterId": "06",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Gesucht wird jemand, der am Wochenende Zeit hat und freundlich mit Gästen spricht.",
      "answerKey": "Gesucht wird jemand, der am Wochenende Zeit hat und freundlich mit Gästen spricht.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C06-R03",
      "chapterId": "06",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C06-R04",
      "chapterId": "06",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Valitse tekstistä kolme merkityksellistä sanaa tai ilmausta; älä poimi automaattisesti tekstin ensimmäistä sanaa tai henkilönnimeä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C06-R05",
      "chapterId": "06",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: ehtojen ymmärtäminen: können/müssen.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C06-R06",
      "chapterId": "06",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Emma liest eine Stellenanzeige für einen Ferienjob in einem Café.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "07": [
    {
      "id": "LOS7-C07-T01",
      "chapterId": "07",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Eine Bewerbung ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C07-T02",
      "chapterId": "07",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Mitä Nora tarkistaa ennen hakemusviestin lähettämistä?",
      "answerKey": "Yrityksen nimen ja omat yhteystietonsa.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS7-C07-T03",
      "chapterId": "07",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Mira: Wie beginnt eine formelle E-Mail?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C07-T04",
      "chapterId": "07",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Millä tervehdyksellä muodollisen sähköpostin voi aloittaa?",
      "answerKey": "Tarkka saksankielinen ilmaus: Sehr geehrte Damen und Herren\nMalliselitys: Sehr geehrte Damen und Herren -tervehdyksellä.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS7-C07-T05",
      "chapterId": "07",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: der Lebenslauf, die E-Mail, die Anrede, der Betreff.",
      "answerKey": "der Lebenslauf = ansioluettelo; die E-Mail = sähköposti; die Anrede = puhuttelu; der Betreff = aihe",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS7-C07-T06",
      "chapterId": "07",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: ansioluettelo, sähköposti, puhuttelu, aihe, kokemus, työpaikka.",
      "answerKey": "der Lebenslauf = ansioluettelo; die E-Mail = sähköposti; die Anrede = puhuttelu; der Betreff = aihe; die Erfahrung = kokemus; die Stelle = työpaikka",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C07-T07",
      "chapterId": "07",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Sehr _____ Frau Müller,",
      "answerKey": "geehrte",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS7-C07-T08",
      "chapterId": "07",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: Praktikum. / ein / um / mich / bewerbe / Ich.",
      "answerKey": "Ich bewerbe mich um ein Praktikum.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS7-C07-T09",
      "chapterId": "07",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Haen harjoittelupaikkaa..",
      "answerKey": "Ich bewerbe mich um ein Praktikum.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS7-C07-T10",
      "chapterId": "07",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Sehr geehrte Herr Weber, ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Oikein on Sehr geehrter Herr Weber, sillä maskuliinisen puhuttelun pääte on -er.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS7-C07-T11",
      "chapterId": "07",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö muodollinen puhuttelu, pyynnöt ja tekstin jäsennys. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Muodollinen aloitus voi olla Sehr geehrte Frau Müller tai Sehr geehrter Herr Weber, kun nimi tiedetään. Työstä kirjoitat Ich bewerbe mich um ein Praktikum. Voit kertoa syyn: Ich interessiere mich für die Stelle, weil … . Lopeta Mit freundlichen Grüßen ja omalla nimellä. Huomaa isolla kirjoitettu kohtelias Sie ja Ihr. Älä kopioi hakemuspohjasta väitettä kokemuksesta, jota hakijalla ei ole.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C07-T12",
      "chapterId": "07",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Millä ilmauksella lopetat muodollisen sähköpostin?",
      "answerKey": "Mit freundlichen Grüßen",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS7-C07-T13",
      "chapterId": "07",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Betreff: Bewerbung als Aushilfe. Sehr geehrte Damen und Herren, ich interessiere mich für Ihre Stelle.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Betreff: Bewerbung als Aushilfe. Sehr geehrte Damen und Herren, ich interessiere mich für Ihre Stelle. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C07-T14",
      "chapterId": "07",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C07-T15",
      "chapterId": "07",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Sehr geehrte Frau Müller, ja Mit freundlichen Grüßen. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Sehr geehrte Frau Müller, | Mit freundlichen Grüßen. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS7-C07-T16",
      "chapterId": "07",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Sehr geehrte Frau Müller,. Varmista, että kysymys sopii tilaisuuteen Hakemuksen laatiminen.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C07-T17",
      "chapterId": "07",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Ich bewerbe mich um ein Praktikum. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C07-T18",
      "chapterId": "07",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Kirjoita 80–120 sanan suunniteltu viesti; tukipohja. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS7-C07-T19",
      "chapterId": "07",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Hakemuksen laatiminen. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Mira: Wie beginnt eine formelle E-Mail? / Jonas: Zum Beispiel mit „Sehr geehrte Damen und Herren“.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS7-C07-T20",
      "chapterId": "07",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Millä ilmauksella lopetat muodollisen sähköpostin? (2) Mitä sähköpostin aihe on?",
      "answerKey": "(1) Mit freundlichen Grüßen (2) Hakemus apulaisen tehtävään.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS7-C07-R01",
      "chapterId": "07",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Eine Bewerbung”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Nora möchte sich für ein kurzes Praktikum bewerben.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C07-R02",
      "chapterId": "07",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Sie schreibt eine E-Mail an das Unternehmen.",
      "answerKey": "Sie schreibt eine E-Mail an das Unternehmen.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C07-R03",
      "chapterId": "07",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C07-R04",
      "chapterId": "07",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Valitse tekstistä kolme merkityksellistä sanaa tai ilmausta; älä poimi automaattisesti tekstin ensimmäistä sanaa tai henkilönnimeä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C07-R05",
      "chapterId": "07",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: muodollinen puhuttelu, pyynnöt ja tekstin jäsennys.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C07-R06",
      "chapterId": "07",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Nora möchte sich für ein kurzes Praktikum bewerben.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "08": [
    {
      "id": "LOS7-C08-T01",
      "chapterId": "08",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Im Gespräch ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C08-T02",
      "chapterId": "08",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Mitä Paul sanoo, kun hän ei ymmärrä haastattelukysymystä?",
      "answerKey": "Hän pyytää kysymyksen toistamista kohteliaasti.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS7-C08-T03",
      "chapterId": "08",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Chefin: Warum möchten Sie hier arbeiten?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C08-T04",
      "chapterId": "08",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Voiko hakija tulla lauantaina?",
      "answerKey": "Tarkka saksankielinen ilmaus: Ja, das kann ich.\nMalliselitys: Kyllä.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS7-C08-T05",
      "chapterId": "08",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: das Gespräch, die Frage, die Antwort, der Termin.",
      "answerKey": "das Gespräch = keskustelu; die Frage = kysymys; die Antwort = vastaus; der Termin = aika",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS7-C08-T06",
      "chapterId": "08",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: keskustelu, kysymys, vastaus, aika, esitellä, kertoa.",
      "answerKey": "das Gespräch = keskustelu; die Frage = kysymys; die Antwort = vastaus; der Termin = aika; vorstellen = esitellä; erzählen = kertoa",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C08-T07",
      "chapterId": "08",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Könnten _____ die Frage bitte wiederholen?",
      "answerKey": "Sie",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS7-C08-T08",
      "chapterId": "08",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: arbeiten. / hier / gern / würde / Ich.",
      "answerKey": "Ich würde gern hier arbeiten.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS7-C08-T09",
      "chapterId": "08",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Haluaisin työskennellä täällä..",
      "answerKey": "Ich würde gern hier arbeiten.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS7-C08-T10",
      "chapterId": "08",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Könnten Sie bitte wiederholen die Frage? ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Luonteva perusjärjestys on Könnten Sie die Frage bitte wiederholen?",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS7-C08-T11",
      "chapterId": "08",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö Könnten Sie / Ich würde; vastaukset. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Kohtelias kysymys voi alkaa Könnten Sie …? ja toive Ich würde gern … . Ne ovat Konjunktiv II:n yleisiä käyttövalmiita muotoja, mutta sinun ei tarvitse osata kaikkia verbimuotoja. Vertaa: Können Sie das wiederholen? on mahdollinen, Könnten Sie das bitte wiederholen? on pehmeämpi. Vastaukset pidetään selkeinä: Ich kann …, Ich habe … gemacht, Ich lerne … .",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C08-T12",
      "chapterId": "08",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Täydennä: ___ Sie das bitte wiederholen? (könnten)",
      "answerKey": "Könnten",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS7-C08-T13",
      "chapterId": "08",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Gesprächsnotiz: Bewerbungsgespräch, Freitag 14:00, Zimmer 3.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Gesprächsnotiz: Bewerbungsgespräch, Freitag 14:00, Zimmer 3. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C08-T14",
      "chapterId": "08",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C08-T15",
      "chapterId": "08",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Könnten Sie die Frage bitte wiederholen? ja Ich lerne schnell.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Könnten Sie die Frage bitte wiederholen? | Ich lerne schnell.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS7-C08-T16",
      "chapterId": "08",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Könnten Sie die Frage bitte wiederholen?. Varmista, että kysymys sopii tilaisuuteen Työhaastattelussa.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C08-T17",
      "chapterId": "08",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Ich würde gern hier arbeiten. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C08-T18",
      "chapterId": "08",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Harjoittele 2 minuutin itsearvioitava haastattelu. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS7-C08-T19",
      "chapterId": "08",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Työhaastattelussa. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Chefin: Warum möchten Sie hier arbeiten? / Bewerber: Ich arbeite gern mit Menschen.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS7-C08-T20",
      "chapterId": "08",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Täydennä: ___ Sie das bitte wiederholen? (könnten) (2) Voiko hakija tulla lauantaina?",
      "answerKey": "(1) Könnten (2) Kyllä.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS7-C08-R01",
      "chapterId": "08",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Im Gespräch”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Paul übt ein Bewerbungsgespräch mit seiner Lehrerin.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C08-R02",
      "chapterId": "08",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Die Lehrerin lobt diese Reaktion.",
      "answerKey": "Die Lehrerin lobt diese Reaktion.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C08-R03",
      "chapterId": "08",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C08-R04",
      "chapterId": "08",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Valitse tekstistä kolme merkityksellistä sanaa tai ilmausta; älä poimi automaattisesti tekstin ensimmäistä sanaa tai henkilönnimeä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C08-R05",
      "chapterId": "08",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: Könnten Sie / Ich würde; vastaukset.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C08-R06",
      "chapterId": "08",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Paul übt ein Bewerbungsgespräch mit seiner Lehrerin.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ],
  "09": [
    {
      "id": "LOS7-C09-T01",
      "chapterId": "09",
      "group": "T",
      "title": "Ennusta tilanne",
      "prompt": "Lue otsikko Ein Tag im Praktikum ja tilanteen kuvaus. Kirjoita kaksi asiaa, joita tilanteessa voisi käsitellä. Lue sitten malliteksti ja tarkista arvauksesi.",
      "answerKey": "Avoin ennakointitehtävä; itsearvioinnissa tarkistetaan, vastaavatko arvaukset oikeasti tekstiä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C09-T02",
      "chapterId": "09",
      "group": "T",
      "title": "Tekstin tarkka ydinkysymys",
      "prompt": "Missä Mia on harjoittelussa?",
      "answerKey": "Kirjakaupassa.",
      "feedback": "",
      "assessment": "model-or-automatic"
    },
    {
      "id": "LOS7-C09-T03",
      "chapterId": "09",
      "group": "T",
      "title": "Puhujat ja vuorot",
      "prompt": "Lue saksankielinen tukidialogi. Kuinka monta puheenvuoroa siinä on, ja mitä kukin puhuja tekee ensimmäisellä vuorollaan?",
      "answerKey": "4 puheenvuoroa. Ensimmäinen: Lea: Wie war dein erster Tag im Praktikum?. Huomaa, että jos sama puhuja palaa, vastaa myös jatkokysymykseen.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C09-T04",
      "chapterId": "09",
      "group": "T",
      "title": "Etsi täsmällinen ilmaus",
      "prompt": "Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: Mitä Noah teki harjoittelussa?",
      "answerKey": "Tarkka saksankielinen ilmaus: Ich habe Kunden geholfen und Regale sortiert.\nMalliselitys: Auttoi asiakkaita ja järjesti hyllyjä.\nVertaa omaa ilmaisua ja perustelua tähän malliin. Kone tarkistaa vain, että kopioitu ilmaus löytyy valitusta puheenvuorosta, ei selityksen oikeellisuutta.",
      "feedback": "",
      "assessment": "teacher-review-pending-span"
    },
    {
      "id": "LOS7-C09-T05",
      "chapterId": "09",
      "group": "T",
      "title": "Yhdistä uusi sana ja merkitys",
      "prompt": "Yhdistä seuraavat neljä saksankielistä sanaa ja niiden suomennokset: das Praktikum, der Kollege, die Kollegin, der Chef.",
      "answerKey": "das Praktikum = harjoittelu; der Kollege = kollega; die Kollegin = kollega; der Chef = esihenkilö",
      "feedback": "",
      "assessment": "automatic-when-implemented"
    },
    {
      "id": "LOS7-C09-T06",
      "chapterId": "09",
      "group": "T",
      "title": "Sanastomuisti ilman mallia",
      "prompt": "Peitä sanaston saksankielinen puoli ja palauta muistista seuraavat kuusi sanaa tai ilmausta: harjoittelu, kollega, kollega, esihenkilö, esihenkilö, tehdä töitä.",
      "answerKey": "das Praktikum = harjoittelu; der Kollege = kollega; die Kollegin = kollega; der Chef = esihenkilö; die Chefin = esihenkilö; arbeiten = tehdä töitä",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C09-T07",
      "chapterId": "09",
      "group": "T",
      "title": "Täydennä mallilause",
      "prompt": "Täydennä puuttuva sana: Heute _____ ich im Büro.",
      "answerKey": "arbeite",
      "feedback": "",
      "assessment": "automatic-with-accepted-spelling"
    },
    {
      "id": "LOS7-C09-T08",
      "chapterId": "09",
      "group": "T",
      "title": "Rakenna lause",
      "prompt": "Järjestä nämä osat oikeaksi lauseeksi: gearbeitet. / Café / im / ich / habe / Gestern.",
      "answerKey": "Gestern habe ich im Café gearbeitet.",
      "feedback": "",
      "assessment": "automatic-with-token-anchors"
    },
    {
      "id": "LOS7-C09-T09",
      "chapterId": "09",
      "group": "T",
      "title": "Käännä asiayhteydestä",
      "prompt": "Kirjoita saksaksi: Eilen työskentelin kahvilassa..",
      "answerKey": "Gestern habe ich im Café gearbeitet.",
      "feedback": "",
      "assessment": "accepted-variants-review"
    },
    {
      "id": "LOS7-C09-T10",
      "chapterId": "09",
      "group": "T",
      "title": "Korjaa oppijan kielivirhe",
      "prompt": "Korjaa virheellinen lause Gestern habe ich gearbeitet im Café. ja selitä, miksi alkuperäinen muoto ei sovi.",
      "answerKey": "Korjauksen perustelu: Neutraali opetettava malli on Gestern habe ich im Café gearbeitet, jossa partisiippi tulee lauseen loppuun.",
      "feedback": "",
      "assessment": "teacher-checked"
    },
    {
      "id": "LOS7-C09-T11",
      "chapterId": "09",
      "group": "T",
      "title": "Kieliopin selitys omin sanoin",
      "prompt": "Selitä suomeksi kappaleen sääntö Perfekt/preesens kertaus, ajan järjestys. Osoita saksankielisestä esimerkistä, mihin kohtaan sääntö vaikuttaa.",
      "answerKey": "Nykyisestä tavasta sanot Ich arbeite im Café. Eilisestä tapahtumasta Ich habe im Café gearbeitet. Erotettujen aikojen jäsentämiseen käytä heute, gestern, zuerst, dann ja am Ende. Jos Perfekt muodostetaan haben-apuverbillä, partisiippi sijoittuu loppuun. Älä sekoita samassa lauseessa apuverbiä ja preesensin persoonamuotoa.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C09-T12",
      "chapterId": "09",
      "group": "T",
      "title": "Suljettu kielioppitarkistus",
      "prompt": "Täydennä: Gestern ___ ich viel gelernt. (haben)",
      "answerKey": "habe",
      "feedback": "",
      "assessment": "automatic-with-accepted-variants"
    },
    {
      "id": "LOS7-C09-T13",
      "chapterId": "09",
      "group": "T",
      "title": "Erillisen Text B:n tulkinta",
      "prompt": "Lue Text B: Tagebuch: Heute habe ich viel gelernt. Morgen beginne ich um neun.. Etsi siitä kaksi konkreettista asiaa (esim. aika, paikka, hinta, henkilön toiminta tai ilmoituksen tarkoitus) ja kirjoita ne suomeksi.",
      "answerKey": "Alkuperäinen Text B: Tagebuch: Heute habe ich viel gelernt. Morgen beginne ich um neun. | Mallin hyväksyntä riippuu tekstistä poimituista oikeista tiedoista.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C09-T14",
      "chapterId": "09",
      "group": "T",
      "title": "Vertaa tekstilajeja",
      "prompt": "Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.",
      "answerKey": "Mallivertailu: Tukidialogi on puhujien välinen vuoropuhelu. Text B on erillinen lyhyt kirjoitettu tekstilaji, esimerkiksi ilmoitus, viesti, lista tai muistiinpano. Kerro, mitä kumpikin teksti tekee ja mille lukijalle tai kuulijalle se mahdollisesti on tarkoitettu. Tarkista kaksi omaa havaintoasi juuri tämän kappaleen teksteistä. Kaikkia piirteitä ei voi aina päätellä.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C09-T15",
      "chapterId": "09",
      "group": "T",
      "title": "Harjoittele puheen rytmiä",
      "prompt": "Lue ääneen kaksi kertaa: Heute arbeite ich im Büro. ja Danach bin ich nach Hause gegangen.. Merkitse sananpainot tarkistettavasta sanakirja-/äännelähteestä; älä arvaa tekstin perusteella.",
      "answerKey": "Tekstit: Heute arbeite ich im Büro. | Danach bin ich nach Hause gegangen.. Ääntämisen mallia ei ole vielä sisällytetty.",
      "feedback": "",
      "assessment": "self-review-no-speech-score"
    },
    {
      "id": "LOS7-C09-T16",
      "chapterId": "09",
      "group": "T",
      "title": "Rakenna uusi kysymys",
      "prompt": "Keksi kysymys, johon vastaus voisi olla Heute arbeite ich im Büro.. Varmista, että kysymys sopii tilaisuuteen Harjoittelupäivän jälkeen.",
      "answerKey": "Avoin tehtävä. Tarkista kysymyksen mielekkyys, kysymyssana ja verbin paikka.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C09-T17",
      "chapterId": "09",
      "group": "T",
      "title": "Muokkaa henkilötietoa",
      "prompt": "Kirjoita mallilause Gestern habe ich im Café gearbeitet. uudestaan niin, että yksi henkilö, aika tai paikka vaihtuu. Tarkista, vaatiiko muutos myös verbin tai artikkelin muuttamista.",
      "answerKey": "Avoin mallivastauksesta johdettava tehtävä. Vain semanttisesti ja kieliopillisesti oikein muodostetut vaihtoehdot hyväksytään.",
      "feedback": "",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C09-T18",
      "chapterId": "09",
      "group": "T",
      "title": "Tuota kappaleen oma teksti",
      "prompt": "Kuvaile kuvitteellinen harjoittelupäivä. Kirjoita 6–10 omaa lausetta. Tarkista ainakin opittu rakenne, aikamuoto ja tekstilaji.",
      "answerKey": "Avoin: sisällön ymmärrettävyys, yksi oikein käytetty kappaleen rakenne, sopiva sanasto, tekstin johdonmukaisuus ja korjattu uusi versio.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS7-C09-T19",
      "chapterId": "09",
      "group": "T",
      "title": "Tilannesimulaatio",
      "prompt": "Kuvittele uusi mutta samantapainen tilanne: Harjoittelupäivän jälkeen. Vaihda osapuolten roolit, aloita keskustelu itse ja kirjoita tai sano neljä vuoroa. Käytä vähintään yhtä tuttua ja yhtä uutta ilmausta.",
      "answerKey": "Mallina tukidialogi: Lea: Wie war dein erster Tag im Praktikum? / Noah: Gut. Ich habe Kunden geholfen und Regale sortiert.. Vastauksessa tarkistetaan, että kaikki vuorot liittyvät yhteen tilanteeseen.",
      "feedback": "",
      "assessment": "rubric-self-review"
    },
    {
      "id": "LOS7-C09-T20",
      "chapterId": "09",
      "group": "T",
      "title": "Loppulappu ilman vihjeitä",
      "prompt": "Peitä opetus ja vastaa muistista kahteen kysymykseen: (1) Täydennä: Gestern ___ ich viel gelernt. (haben) (2) Mitä Noah teki harjoittelussa?",
      "answerKey": "(1) habe (2) Auttoi asiakkaita ja järjesti hyllyjä.",
      "feedback": "",
      "assessment": "automatic-first-and-self-second"
    },
    {
      "id": "LOS7-C09-R01",
      "chapterId": "09",
      "group": "R",
      "title": "text-evidence",
      "prompt": "Lue koko pääteksti “Ein Tag im Praktikum”. Etsi virke, josta käy ilmi tekstin lähtötilanne. Kopioi virke ja kerro suomeksi, miksi se kertoo tilanteen.",
      "answerKey": "Mia macht ein Praktikum in einer Buchhandlung.",
      "feedback": "Etsi henkilö tai tapahtuma tekstin alusta. Vastaus perustellaan viittaamalla tekstin sanoihin.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C09-R02",
      "chapterId": "09",
      "group": "R",
      "title": "sentence-order",
      "prompt": "Kirjoita seuraava tekstin virke oikeassa sanajärjestyksessä. Sanat näytetään oppijalle sekoitettuina: Am ersten Tag begrüßt sie die Kolleginnen und Kollegen und bekommt eine Einführung.",
      "answerKey": "Am ersten Tag begrüßt sie die Kolleginnen und Kollegen und bekommt eine Einführung.",
      "feedback": "Tarkista ensin taivutetun verbin paikka ja vasta sitten muut osat. Pilkut ja nimien isot alkukirjaimet tarkistetaan erikseen.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C09-R03",
      "chapterId": "09",
      "group": "R",
      "title": "reading-inference",
      "prompt": "Kirjoita kolme tekstin perusteella totta olevaa väitettä saksaksi. Nimeä jokaisen väitteen tueksi vastaava tekstikohta.",
      "answerKey": "Avoin vastaus; opettajan tarkistus hyväksyy vain sellaiset väitteet, joille on lähdetekstissä suora perustelu.",
      "feedback": "Älä lisää henkilöistä tietoja, joita tekstissä ei kerrota. Erota oma päätelmä tekstin tosiasiasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C09-R04",
      "chapterId": "09",
      "group": "R",
      "title": "vocab-in-context",
      "prompt": "Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Valitse tekstistä kolme merkityksellistä sanaa tai ilmausta; älä poimi automaattisesti tekstin ensimmäistä sanaa tai henkilönnimeä.",
      "answerKey": "Avoin tehtävä: sana + tarkka tekstikohta + perusteltu kontekstiselitys.",
      "feedback": "Tarkista ehdotettu merkitys kirjan sanastosta tai luotettavasta sanakirjasta.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C09-R05",
      "chapterId": "09",
      "group": "R",
      "title": "text-summary",
      "prompt": "Tiivistä päätekstin tärkein tapahtuma 2–3 virkkeellä saksaksi. Käytä kappaleen opetettavaa rakennetta: Perfekt/preesens kertaus, ajan järjestys.",
      "answerKey": "Käsin tarkistettava mallivastaus; vaatii tekstin pääasian ja oikean kielioppirakenteen, ei yksittäistä täsmälausetta.",
      "feedback": "Tarkista, että vastaat kuka, mitä ja miksi. Vältä liian monimutkaista sanastoa.",
      "assessment": "self-review"
    },
    {
      "id": "LOS7-C09-R06",
      "chapterId": "09",
      "group": "R",
      "title": "dialogue-production",
      "prompt": "Kuvittele vastaava tilanne kuin tekstissä. Kirjoita neljän vuoron keskustelu kahdelle henkilölle. Aloita annetulla rakenteella: Mia macht ein Praktikum in einer Buchhandlung.… ja muuta tapahtumapaikkaa tai henkilöitä.",
      "answerKey": "Vastaus voidaan kirjoittaa monella tavalla; hyväksytään neljä tarkoituksenmukaista vuoroa ja kappaleen rakenteen ymmärrettävä käyttö.",
      "feedback": "Kuuntele mielessäsi, vastaako toinen puhuja toisen esittämään kysymykseen.",
      "assessment": "self-review"
    }
  ]
};
