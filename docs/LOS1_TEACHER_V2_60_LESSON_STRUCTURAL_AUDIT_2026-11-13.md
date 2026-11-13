# LOS! 1 · L001–L060 rakenteellinen opetuspolkuauditointi

Päiväys: 13.11.2026 · Integraatiokandidaatti PR #220 · Lähdekoodi PR #209 / #217.

**Tämän raportin rajaus on rakenteellinen tarkistus, ei läpikäyty pedagoginen hyväksyntä.** Lähtötilanteen koodi luettiin 12 eri `lessonEngine*.ts`-tiedostosta. Tunnisteet ja nykyiset suoritusvaatimukset tarkistettiin yksitellen. Kielellistä lopullista riippumatonta tarkistusta, opiskelijamittausta, aitoa äänitoistoa, fyysisiä laitteita eikä jokaisen vastausavaimen oikeellisuutta ole tarkistettu tällä auditoinnilla.

## Todennettu tilanne

- **60/60** ID:tä L001–L060 löydettiin nykyisistä `LosLessonBlueprint`-rakenteista, yksilöllisinä ja ilman aukkoja.
- **60/60** vanhassa oppitunnissa on tavoite, **kolme** ohjaus-/suoritusvaihetta ja palautettava lopputarkistus. Tämä ei vielä tarkoita riittävää varsinaista opetusta.
- **11/60** (L001–L011) sisältää erillisen Teacher Experience 2.0:n käsikirjoituksen, deterministisen ohjauksen ja opetus-/palautetilanteita; näidenkin sisältö on vielä toimituksellinen luonnos.
- **49/60** käyttää vasta vanhaa linkki-/tehtävälistaan perustuvaa suoritusmallia. Niitä **ei** luokitella Teacher 2.0:ssa valmiiksi opetetuiksi.
- **0/60** riippumatonta pedagogista kielihyväksyntää tai todellista opiskelijalla mitattua kestoa on tämän työn perusteella todettu.
- Arvioitua `estimatedMinutes`-aikaa **ei ole mitattu**. L059 on koodissa **80 minuuttia**, muut 59 ovat **30 minuutin suunnitteluarvioita**. Aikaa ei pidä käyttää tekaistuna laatumittarina.
- Vanhat lopputarkistukset voivat sisältää oikein tarkistettavan kysymyksen, mutta eivät yksin todista itsenäistä tai myöhemmin vahvistettua kielitaitoa.

## Oppituntikohtainen rakenteellinen inventaario

Selite: `vastaus` = vanhaan tehtävätilaan tallennettu vastaus, ei automaattinen oikea suoritus tai itsenäinen osaaminen; `tarkistettu lähdetehtävä` = vastaus sekä tarkistusmerkintä; `ei erityistä` = kolme vaihetta ja lopputarkistus ilman muuta kirjakohtaista näyttöehtoa. Taulukon lähdesarakkeessa on nykyisen koodin tiedosto, ei ulkoisen oppimateriaalin autenttisuus- tai lisenssivarmistus.

| Oppitunti | Osa | Vanhoja vaiheita | Arvio, min (ei mitattu) | Vanhan mallin suoritusnäyttö | Teacher 2.0 | Lähdekooditiedosto |
|---|---|---:|---:|---|---|---|
| L001 | C01 · aloitus | 3 | 30 | ei erityistä | Teacher 2.0 -käsikirjoitus, hyväksyntä avoin | lessonEngine.ts |
| L002 | C01 · aloitus | 3 | 30 | ei erityistä | Teacher 2.0 -käsikirjoitus, hyväksyntä avoin | lessonEngine.ts |
| L003 | C01 · aloitus | 3 | 30 | tarkistettu lähdetehtävä | Teacher 2.0 -käsikirjoitus, hyväksyntä avoin | lessonEngine.ts |
| L004 | C01 · aloitus | 3 | 30 | vastaus | Teacher 2.0 -käsikirjoitus, hyväksyntä avoin | lessonEngine.ts |
| L005 | C01 · aloitus | 3 | 30 | tarkistettu lähdetehtävä | Teacher 2.0 -käsikirjoitus, hyväksyntä avoin | lessonEngine.ts |
| L006 | C01 · aloitus | 3 | 30 | koe | Teacher 2.0 -käsikirjoitus ja kirjan kappaletesti, hyväksyntä avoin | lessonEngine.ts |
| L007 | C02 · nimi | 3 | 30 | ei erityistä | Teacher 2.0 -käsikirjoitus, hyväksyntä avoin | lessonEngineC02.ts |
| L008 | C02 · nimi | 3 | 30 | tarkistettu lähdetehtävä | Teacher 2.0 -käsikirjoitus, hyväksyntä avoin | lessonEngineC02.ts |
| L009 | C02 · nimi | 3 | 30 | vastaus | Teacher 2.0 -käsikirjoitus, hyväksyntä avoin | lessonEngineC02.ts |
| L010 | C02 · nimi | 3 | 30 | tarkistettu lähdetehtävä | Teacher 2.0, Text B:n tarkistetut Q01/Q02, toimituksellinen hyväksyntä avoin | lessonEngineC02.ts |
| L011 | C02 · nimi | 3 | 30 | koe | Teacher 2.0 -käsikirjoitus ja kirjan 15 tehtävän palautus, hyväksyntä avoin | lessonEngineC02.ts |
| L012 | C03 · alkuperä | 3 | 30 | ei erityistä | Vain vanha tehtävä-/vaihelista | lessonEngineC03.ts |
| L013 | C03 · alkuperä | 3 | 30 | tarkistettu lähdetehtävä | Vain vanha tehtävä-/vaihelista | lessonEngineC03.ts |
| L014 | C03 · alkuperä | 3 | 30 | vastaus | Vain vanha tehtävä-/vaihelista | lessonEngineC03.ts |
| L015 | C03 · alkuperä | 3 | 30 | tarkistettu lähdetehtävä | Vain vanha tehtävä-/vaihelista | lessonEngineC03.ts |
| L016 | C03 · alkuperä | 3 | 30 | koe | Vain vanha tehtävä-/vaihelista | lessonEngineC03.ts |
| L017 | C04 · du/Sie | 3 | 30 | ei erityistä | Vain vanha tehtävä-/vaihelista | lessonEngineC04C05.ts |
| L018 | C04 · du/Sie | 3 | 30 | tarkistettu lähdetehtävä | Vain vanha tehtävä-/vaihelista | lessonEngineC04C05.ts |
| L019 | C04 · du/Sie | 3 | 30 | vastaus | Vain vanha tehtävä-/vaihelista | lessonEngineC04C05.ts |
| L020 | C04 · du/Sie | 3 | 30 | vastaus | Vain vanha tehtävä-/vaihelista | lessonEngineC04C05.ts |
| L021 | C04 · du/Sie | 3 | 30 | koe | Vain vanha tehtävä-/vaihelista | lessonEngineC04C05.ts |
| L022 | C05 · vointi | 3 | 30 | ei erityistä | Vain vanha tehtävä-/vaihelista | lessonEngineC04C05.ts |
| L023 | C05 · vointi | 3 | 30 | tarkistettu lähdetehtävä | Vain vanha tehtävä-/vaihelista | lessonEngineC04C05.ts |
| L024 | C05 · vointi | 3 | 30 | vastaus | Vain vanha tehtävä-/vaihelista | lessonEngineC04C05.ts |
| L025 | C05 · vointi | 3 | 30 | vastaus | Vain vanha tehtävä-/vaihelista | lessonEngineC04C05.ts |
| L026 | C05 · vointi | 3 | 30 | koe | Vain vanha tehtävä-/vaihelista | lessonEngineC04C05.ts |
| L027 | Kertaus I ja välikoe | 3 | 30 | tarkistettu lähdetehtävä+vastaus | Vain vanha tehtävä-/vaihelista | lessonEngineReviewI.ts |
| L028 | Kertaus I ja välikoe | 3 | 30 | tarkistettu lähdetehtävä+vastaus | Vain vanha tehtävä-/vaihelista | lessonEngineReviewI.ts |
| L029 | Kertaus I ja välikoe | 3 | 30 | tarkistettu lähdetehtävä+vastaus | Vain vanha tehtävä-/vaihelista | lessonEngineReviewI.ts |
| L030 | Kertaus I ja välikoe | 3 | 30 | koe+vastaus | Vain vanha tehtävä-/vaihelista | lessonEngineReviewI.ts |
| L031 | C06 · numerot/ikä | 3 | 30 | vastaus | Vain vanha tehtävä-/vaihelista | lessonEngineC06.ts |
| L032 | C06 · numerot/ikä | 3 | 30 | vastaus | Vain vanha tehtävä-/vaihelista | lessonEngineC06.ts |
| L033 | C06 · numerot/ikä | 3 | 30 | vastaus | Vain vanha tehtävä-/vaihelista | lessonEngineC06.ts |
| L034 | C06 · numerot/ikä | 3 | 30 | tarkistettu lähdetehtävä | Vain vanha tehtävä-/vaihelista | lessonEngineC06.ts |
| L035 | C06 · numerot/ikä | 3 | 30 | koe | Vain vanha tehtävä-/vaihelista | lessonEngineC06.ts |
| L036 | C07 · tavaaminen | 3 | 30 | vastaus | Vain vanha tehtävä-/vaihelista | lessonEngineC07C09.ts |
| L037 | C07 · tavaaminen | 3 | 30 | tarkistettu lähdetehtävä | Vain vanha tehtävä-/vaihelista | lessonEngineC07C09.ts |
| L038 | C07 · tavaaminen | 3 | 30 | vastaus | Vain vanha tehtävä-/vaihelista | lessonEngineC07C09.ts |
| L039 | C07 · tavaaminen | 3 | 30 | ei erityistä | Vain vanha tehtävä-/vaihelista | lessonEngineC07C09.ts |
| L040 | C07 · tavaaminen | 3 | 30 | koe | Vain vanha tehtävä-/vaihelista | lessonEngineC07C09.ts |
| L041 | C08 · luokkafraasit | 3 | 30 | vastaus | Vain vanha tehtävä-/vaihelista | lessonEngineC08C10Partial.ts |
| L042 | C08 · luokkafraasit | 3 | 30 | tarkistettu lähdetehtävä | Vain vanha tehtävä-/vaihelista | lessonEngineC08C10Completion.ts |
| L043 | C08 · luokkafraasit | 3 | 30 | vastaus | Vain vanha tehtävä-/vaihelista | lessonEngineC08C10Partial.ts |
| L044 | C08 · luokkafraasit | 3 | 30 | vastaus+vapaa kirjoitus | Vain vanha tehtävä-/vaihelista | lessonEngineC08C10Completion.ts |
| L045 | C08 · luokkafraasit | 3 | 30 | koe+itsearvio | Vain vanha tehtävä-/vaihelista | lessonEngineC08C10Completion.ts |
| L046 | C09 · viikonpäivät ja aika | 3 | 30 | vastaus | Vain vanha tehtävä-/vaihelista | lessonEngineC07C09.ts |
| L047 | C09 · viikonpäivät ja aika | 3 | 30 | tarkistettu lähdetehtävä | Vain vanha tehtävä-/vaihelista | lessonEngineC07C09.ts |
| L048 | C09 · viikonpäivät ja aika | 3 | 30 | vastaus | Vain vanha tehtävä-/vaihelista | lessonEngineC07C09.ts |
| L049 | C09 · viikonpäivät ja aika | 3 | 30 | vastaus | Vain vanha tehtävä-/vaihelista | lessonEngineC07C09.ts |
| L050 | C09 · viikonpäivät ja aika | 3 | 30 | koe | Vain vanha tehtävä-/vaihelista | lessonEngineC07C09.ts |
| L051 | C10 · kohtaaminen | 3 | 30 | vastaus | Vain vanha tehtävä-/vaihelista | lessonEngineC08C10Partial.ts |
| L052 | C10 · kohtaaminen | 3 | 30 | tarkistettu lähdetehtävä | Vain vanha tehtävä-/vaihelista | lessonEngineC10Harald.ts |
| L053 | C10 · kohtaaminen | 3 | 30 | vastaus | Vain vanha tehtävä-/vaihelista | lessonEngineC08C10Partial.ts |
| L054 | C10 · kohtaaminen | 3 | 30 | vastaus+vapaa kirjoitus | Vain vanha tehtävä-/vaihelista | lessonEngineC08C10Completion.ts |
| L055 | C10 · kohtaaminen | 3 | 30 | koe+itsearvio | Vain vanha tehtävä-/vaihelista | lessonEngineC08C10Completion.ts |
| L056 | Kertaus II | 3 | 30 | tarkistettu lähdetehtävä+vastaus | Vain vanha tehtävä-/vaihelista | lessonEngineReviewII.ts |
| L057 | Kertaus II | 3 | 30 | tarkistettu lähdetehtävä+vastaus | Vain vanha tehtävä-/vaihelista | lessonEngineReviewII.ts |
| L058 | Kertaus II | 3 | 30 | tarkistettu lähdetehtävä+vastaus+vastaus | Vain vanha tehtävä-/vaihelista | lessonEngineReviewII.ts |
| L059 | Loppukoe ja yhteenveto | 3 | 80 | koe+vapaa kirjoitus+itsearvio+vastaus | Vain vanha tehtävä-/vaihelista | lessonEngineFinal.ts |
| L060 | Loppukoe ja yhteenveto | 3 | 30 | vastaus+vastaus | Vain vanha tehtävä-/vaihelista | lessonEngineFinal.ts |

## Puuteluokitus ja hyväksynnän jatko

**P0, data:** Historiallinen `lessonProgress.*.teacher` (#218) säilytetään vain vanhana tietona. `teacherSessions` (#217) on ainoa uusi kirjoitettava Teacher 2.0 -tila. Vanhaa näyttöä ei koskaan muunnettaessa lasketa uuden opetuksen itsenäiseksi näytöksi.

**P1, L001–L011:** Tarkista jokaisen opetustilanteen oikea saksan kieli, jo opetetut ilmaukset, kirjalinkit, vihjeiden oikeellisuus ja oikea riippumaton osaamisen tarkistus. Testaa oikealla aloittelijalla. Erityisesti L004:n oikeus käyttää `Guten Morgen`, `Guten Abend`, `Tschüss`, `Gute Nacht` ja `Auf Wiedersehen` tulee osoittaa L001–L003:n opetetulla sisällöllä, eikä vain C01-sanaston olemassaololla. Tämän auditoinnin perusteella näitä hyväksyntäportteja ei suljeta.

**P2, L012–L026:** Kirjoita opettavat tilanteet ja tarkista, että jokainen taito opetetaan ennen itsenäistä koetta. Lisää todelliset virhepalautteet ja uudelleenharjoittelu; älä luo 56 valmista tuntia pelkästä samasta yleispohjasta.

**P3, L027–L060:** Kertausten ja kokeiden erilliset pedagogiset mallit, toimivat ja lisensoidut kuuntelut, alkuperäislähteiden oikeudet, vastausmallit, ääni-/IPA-hyväksynnät ja viivästetty taitonäyttö. Kertaus ja koe eivät ole tavallinen 30 min Teacher-oppitunti.

## Julkaisun portit

U1.0:n **R1–R12** pysyy ainoana julkaisuporttien listana. Raportti ei luo uutta G1–G8-järjestelmää eikä sulje portteja ilman havaintoa. Tästä raportista johdettavat tärkeimmät avoimet työt ovat L012–L060:n varsinainen opetus, L001–L011:n toimituksellinen hyväksyntä, sanakirjan tuotantolataus, tarkistettu sanakohtainen ääntämistieto, oikeat ihmisäänitteet, todelliset laite-/tallennustestit ja sisällön ulkoisten oikeuksien hyväksyntä.

## Yhteensopivuus: L004:n ja L005:n vaihtoehtoiset opetusversiot (13.11.2026)

L004:n rinnakkaisen Teacher-moottorin PR #218 sekä siitä jatkaneen L005:n
PR #232 historialliset oppituntimerkinnät säilytetään
`lessonProgress.L004/L005.teacher`-kentissä. PR #232 lisäsi
`completedContentRevision`-, `completedRevisionAt`-, `writtenDrafts`-,
`helpSelections`- ja `media`-kentät; nämä tarkistetaan nyt tietotyypin,
kohtuullisten kokorajojen, päiväysten ja parillisten versiomerkintöjen
perusteella. `media` sisältää vain selaimen ilmoittamia
`playingAt`/`endedAt`-tapahtumia ja tekstivastineen avausmerkinnän,
ei kuullun ymmärtämisen näyttöä.

**Yhteinen päätös on edelleen yksiselitteinen:** kirjoitettava uusi
Teacher Experience 2.0 -tila on vain `teacherSessions`. Historiallista
`lessonProgress.*.teacher`-tietoa ei muunnettaessa kopioida
`teacherSessions`-vastauksiksi, itsenäiseksi osaamisnäytöksi tai
suorituspäiväksi. Kelvollisen vanhan tietueen kaikki kentät säilyvät
varmuuskopion käsittelyssä muuttumattomina. Korruptoitunut uusi
metadata hylätään sen sijaan, että sitä yritettäisiin korjata
keksityillä oletuksilla.

Tämä on data- ja yhteensopivuustarkistus, **ei** PR #232:n toisen
opetusmoottorin käyttöönotto tai todiste toimivasta äänen toistosta.
