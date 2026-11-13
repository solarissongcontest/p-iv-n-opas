# LOS! 1 · L001–L060 rakenteellinen opetuspolkuauditointi

Päiväys: 13.11.2026 · Integraatiokandidaatti PR #221 (base #220, joka perustuu #209:ään); #217:n erot analysoitu.

**Tämän raportin rajaus on rakenteellinen tarkistus, ei läpikäyty pedagoginen hyväksyntä.** Lähtötilanteen koodi luettiin 12 eri `lessonEngine*.ts`-tiedostosta. Tunnisteet ja nykyiset suoritusvaatimukset tarkistettiin yksitellen. Kielellistä lopullista riippumatonta tarkistusta, opiskelijamittausta, aitoa äänitoistoa, fyysisiä laitteita eikä jokaisen vastausavaimen oikeellisuutta ole tarkistettu tällä auditoinnilla.

## Todennettu tilanne

- **60/60** ID:tä L001–L060 löydettiin nykyisistä `LosLessonBlueprint`-rakenteista, yksilöllisinä ja ilman aukkoja.
- **60/60** vanhassa oppitunnissa on tavoite, **kolme** ohjaus-/suoritusvaihetta ja palautettava lopputarkistus. Tämä ei vielä tarkoita riittävää varsinaista opetusta.
- **16/60** (L001–L016) sisältää erillisen Teacher Experience 2.0:n käsikirjoituksen, deterministisen ohjauksen ja opetus-/palautetilanteita; näidenkin sisältö on vielä toimituksellinen luonnos.
- **44/60** (L017–L060) käyttää vasta vanhaa linkki-/tehtävälistaan perustuvaa suoritusmallia. Niitä **ei** luokitella Teacher 2.0:ssa valmiiksi opetetuiksi.
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
| L012 | C03 · alkuperä | 3 | 30 | ei erityistä | Teacher 2.0: maiden sanasto ja maa/kaupunki-vertailu, hyväksyntä avoin | lessonEngineC03.ts |
| L013 | C03 · alkuperä | 3 | 30 | tarkistettu lähdetehtävä | Teacher 2.0: Lisan koko kahdeksan repliikin teksti ja C03-SOURCE-Q01/Q02 tarkistettuna, QA avoin | lessonEngineC03.ts |
| L014 | C03 · alkuperä | 3 | 30 | vastaus | Teacher 2.0: kommen (ich/du), woher-sanajärjestys, kirjan 4 oikeaa harjoitusta, QA avoin | lessonEngineC03.ts |
| L015 | C03 · alkuperä | 3 | 30 | tarkistettu lähdetehtävä | Teacher 2.0: M-COM-02:n 4 repliikkiä sekä C03-MCOM02-Q02/Q03 tarkistettuna, QA avoin | lessonEngineC03.ts |
| L016 | C03 · alkuperä | 3 | 30 | koe | Teacher 2.0: kertaus,  C03:n oikean kappaletestin palautus ja oma itsearviointi, QA avoin | lessonEngineC03.ts |
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

**P1, L001–L012:** Tarkista jokaisen opetustilanteen oikea saksan kieli, jo opetetut ilmaukset, kirjalinkit, vihjeiden oikeellisuus ja oikea riippumaton osaamisen tarkistus. Testaa oikealla aloittelijalla. Erityisesti L004:n oikeus käyttää `Guten Morgen`, `Guten Abend`, `Tschüss`, `Gute Nacht` ja `Auf Wiedersehen` tulee osoittaa L001–L003:n opetetulla sisällöllä, eikä vain C01-sanaston olemassaololla. Tämän auditoinnin perusteella näitä hyväksyntäportteja ei suljeta.

**P2, L013–L026:** Kirjoita opettavat tilanteet ja tarkista, että jokainen taito opetetaan ennen itsenäistä koetta. Lisää todelliset virhepalautteet ja uudelleenharjoittelu; älä luo 56 valmista tuntia pelkästä samasta yleispohjasta.

**P3, L027–L060:** Kertausten ja kokeiden erilliset pedagogiset mallit, toimivat ja lisensoidut kuuntelut, alkuperäislähteiden oikeudet, vastausmallit, ääni-/IPA-hyväksynnät ja viivästetty taitonäyttö. Kertaus ja koe eivät ole tavallinen 30 min Teacher-oppitunti.

## Julkaisun portit

U1.0:n **R1–R12** pysyy ainoana julkaisuporttien listana. Raportti ei luo uutta G1–G8-järjestelmää eikä sulje portteja ilman havaintoa. Tästä raportista johdettavat tärkeimmät avoimet työt ovat L013–L060:n varsinainen opetus, L001–L012:n toimituksellinen hyväksyntä, sanakirjan tuotantolataus, tarkistettu sanakohtainen ääntämistieto, oikeat ihmisäänitteet, todelliset laite-/tallennustestit ja sisällön ulkoisten oikeuksien hyväksyntä.


### C03: päätetty lähdevaihto ja avoin masterlähteen täsmäytys (R1/R2)

Projektin `Los 1.txt` ja 13.11. koottu `Los yhteinen masterplan.txt` nimeävät C03:n suunnitelluksi päätekstiksi M-DIB-01:n Bernan haastattelun. Repositoryn [11.11.2026 lähdevaihtopäätös](../los1-c03-source-replacement.md) määrittelee kuitenkin perustellun korvauksen: `M-WB-07`, Wikibooksin julkaistu kokonainen kahdeksan repliikin Lisa Müller -dialogi, pysyvä versio `oldid=4581896`. Vaihto tehtiin, koska Bernan haastattelussa esiintyy todellinen puhelinnumero ja henkilökohtaisten numeroiden välttäminen on LOS! 1:n linja.

Lähdevalinta **ei siis ole päätöstä vailla**. Päätös on dokumentoitu, mutta yhdistelmämasterin vanha Berna-viittaus täytyy täsmäyttää ja lähteen riippumaton kielen, kokotekstin, vastausavainten, lisenssin sekä laitetestien hyväksyntä on edelleen avoin. L012:n maasanasto ei edellytä kummankaan haastattelun itsenäistä arviointia; L013 voidaan rakentaa nykyiselle Lisa-lähteelle ilman lähdeduplikaattia, mutta sitä ei merkitä julkaisuvalmiiksi ilman QA:ta.


## PR #221:n C03-laajennus 13.11.2026

- Yhteen `src/features/los/teacher/lessonL004.ts`-rekisteriin on lisätty L013–L016; sama `LosTeacherPlayer`, deterministinen `engine.ts`, käyttäjäkohtaisen kappaleluonnoksen `teacherSessions`-kirjoittaja ja ennestään olemassa olevat kirjan tehtävät.
- Uudet käsikirjoitukset: `lessonL013.ts` (autenttisen Lisan tekstin ymmärtäminen), `lessonL014.ts` (kommen/woher), `lessonL015.ts` (M-COM-02:n lähtöpaikat ja kartta) ja `lessonL016.ts` (C03-kertaus ja oikea kappaletesti). Niillä on eri tavoitteet, opetusjärjestys, opetustaulut ja vastauksen virhekohtainen palaute.
- `tests/los-teacher-c03-complete.test.ts` on lisätty C03:n tekstin, lähdekysymysten tarkistamisen, itsenäisen näytön, kirjan harjoitustunnisteiden ja varsinaisen koekirjauksen tarkastamiseen. Testit on **kirjoitettu, mutta niiden läpäisyä tällä HEADilla ei tässä auditissa vielä ole todennettu**.
- L001–L016 ovat toteutettuja **ennakkokäsikirjoituksia**, eivät riippumattomasti hyväksyttyjä oppitunteja. L017–L060 pysyvät vanhan opetuspolun tilassa, kunnes jokainen toteutetaan omana pedagogisena kokonaisuutenaan.
- C03:n Text A:n lähteeksi on jo valittu `M-WB-07` (Lisa Müller, Wikibooks oldid 4581896); vanha `M-DIB-01` (Berna) on poistettu päätekstin roolista yksityisyysperusteella. Lisenssin lähdemerkintöjen yksilöinti, riippumaton kielen ja tason tarkistus sekä oikeat laitetestit odottavat.
- Tätä auditointia ei tule tulkita R1–R12-porttien sulkemiseksi. Teacher 2.0:n korjaukset eivät muuta FreeDictin tilapäisiä testilatauksia tuotantosanakirjaksi eikä vapauta julkaisemattomia ääni- tai IPA-aineistoja.

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

## L005:n yhden opetussoittimen media, täsmennys 13.11.2026

Yhteiseen Teacher Experience 2.0 -soittimeen on lisätty L005:n alkuperäisen
M-COM-03-äänitteen oma HTML5-toisto ja koko **20 ilmauksen saksankielinen lista
suomennoksineen**. Luettelo luetaan suoraan kirjan olemassa olevasta
`LOS1_TEXT_B_SOURCES["01"]`-sisällöstä. Siten samasta materiaalista ei
synny toisistaan poikkeavia tekstikopioita. Kirjan Text B pysyy edelleen
käytettävissä erikseen niihin **neljään kirjan omaan tarkistettavaan
lähdetehtävään**, jotka L005:n läpikäynti edellyttää.

Media on alkuperäinen Wikimedia Commonsin *German Vocabulary - Greetings.ogg*,
German Men92, public domain, noin 28 sekuntia. Toistokomponentissa on
selkeä virheilmoitus ja koko tekstin varavaihtoehto. Lukijan
`teacherSessions` pysyy ainoana kirjoitettavana opetus- ja vastaustilana;
`lessonProgress.*.teacher` on vain säilytettävä vanha tieto.
Tähän ei lisätty kilpailevaa opetusmoottoria, uutta äänitodistetta,
automaattista puhearviointia eikä väitettä äänen kuulemisesta.

Tarkka ero: audion `play`-painike, mahdollinen onnistunut toistotapahtuma,
20 kohdan tekstilistan avaaminen ja lukutehtävän tarkistaminen **eivät**
itsessään todista kuullun ymmärtämistä. Täydellinen teksti sisältyy LOS!:iin,
kun taas ulkoisia URL-osoitteita käytetään äänitiedoston lataamiseen sekä
tekijä- ja lisenssitietojen osoittamiseen. Oikean puhelimen Ogg-toisto,
ruudunlukijan käyttö ja saksan kielen pedagoginen auditointi ovat avoimia
julkaisuportteja. CI-tulokset raportoidaan erikseen uusimman commitin
perusteella.

## L005:n ääniformaattien mobiiliyhteensopivuus (13.11.2026)

Wikimedia Commonsin alkuperäisen
[German Vocabulary - Greetings.ogg](https://commons.wikimedia.org/wiki/File:German_Vocabulary_-_Greetings.ogg)
-tiedoston sivulla ilmoitetaan myös **valmiiksi muunnettu MP3**. Kyseessä
on sama 28 sekunnin, German Men92:n lausuma ja public domainiin luovutettu
20 ilmauksen ääni, ei erillinen ääninäyttelijä tai uusi materiaali.
Uusi Teacher 2.0 -soitin antaa selaimen valita ensin MP3-lähteen
(`audio/mpeg`) ja vaihtoehtoisesti alkuperäisen Ogg-lähteen
(`audio/ogg`). Näin vanhemmillekin selaimille tarjotaan niille
sopivampi formaatti, vaikka **fyysisellä iPhonella toimivuutta ei ole
vielä testattu**. Lähde: Commonsin tiedostosivun *Transcode status*,
MP3-rivi (tarkistettu 13.11.2026).

Selaimen lähdevalinta ei tuota kuullun ymmärtämisen suoritusmerkintää.
Jos kumpikaan äänitiedosto ei toimi, alkuperäinen 20 ilmauksen
saksankielinen teksti ja suomennokset säilyvät LOS!:n omassa
opetustilassa. Käyttöliittymä kertoo äänihäiriöstä. Automaattinen
Chromium/WebKit-testaus tarkistaa lähteiden tunnisteet ja
tekstivaraosan, ei sitä että opiskelija kuulisi tai ymmärtäisi
äänitteen oikealla laitteella.
