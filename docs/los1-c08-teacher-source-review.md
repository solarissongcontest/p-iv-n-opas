# LOS! 1 C08 · Teacher Experience 2.0 · lähde- ja julkaisuportit

Päiväys: 13.11.2026. Työhaara: feat/los1-teacher-l041-l045.
Tämä tiedosto on nykyisen koodin lähdetilanteen auditointi, ei ulkopuolinen oikeudellinen tai kielellinen hyväksyntätodistus.

## Text A: dokumentoitu ero alkuperäiseen masterplaniin

Los 1.txt yksilöi alkuperäiseksi suunnitelmaksi M-DIB-04, COERLL:n Im Unterricht -aineiston. Sen URL https://coerll.utexas.edu/dib/toc.php?k=2 johtaa kokoelman sisältöluetteloon, ei täsmälliseen yksittäiseen haastatteluun. Masterplan jättää lähteen julkaisun keskeneräiseksi.

Lähtöhaarassa C08:n Text A on kuitenkin jo M-WB-08, Wikibooks German/Level I/Schule, pysyvä revisio oldid=4520956. Koodin ilmoittama tekstilisenssi on CC BY-SA 4.0. Kirjassa on koko 26 yksikön koulukohtaus (Silke, Torsten, Florian, luokka ja opettaja). Lähde: https://en.wikibooks.org/w/index.php?title=German/Level_I/Schule&oldid=4520956 . Lisenssi: https://creativecommons.org/licenses/by-sa/4.0/ . Tekijät: Wikibooksin German/Level I/Schule -sivun kirjoittajat.

Lähtöhaarassa src/features/los/content/los1OpenDialogues.ts säilyttää koko kohtauksen ja src/features/los/content/los1-sources-data.ts dokumentoi korvauksen. **Korvauksen syy:** aiemman COERLL-tekstin yksittäistä litteraattia ei ollut vahvistettu, mutta Wikibooksista valittiin erillinen kokonainen luokkatilanne. Ne eivät ole sama haastattelu; tämä Teacher-PR ei vaihda tekstiä takaisin eikä väitä alkuperäisen masterplanin jo hyväksyneen muutosta.

L042 viittaa nykyiseen koko Text A:han ja käyttää vain nykyisiä C08-SCHOOL-Q01–Q03-tehtäviä; niiden vastaukset tarkistetaan kirjan omassa vastaustilassa. Lukija näyttää erikseen alkuperäissaksan ja LOSin suomenkieliset tukitekstit. Lähde on A1-tuottamistavoitetta vaikeampi. Lähdekoodi merkitsee published=false, eikä riippumatonta lähdeversion, muutoshistorian, kielellisen laadun tai oikeusketjun tarkistusta ole osoitettu.

## Text B: COERLL Eva Kunkel

Nykyinen Text B käyttää M-DIB-03: Eva, Studium und Wohnen. Kirjassa on koko kahdeksan repliikin litteraatti, puhujat, suomenkieliset selitykset sekä C08-TEXTB-Q01–Q04. Lähde: https://coerll.utexas.edu/dib/vidt.php?f=01_19_int_ek_studies-home . Koodin ilmoittama lisenssi on CC BY 4.0, https://creativecommons.org/licenses/by/4.0/ . Deutsch im Blick -oppikirjan vuonna 2017 julkaistu nimiöaineisto https://coerll.utexas.edu/dib/pdfs/intro.pdf ilmoittaa kirjakokonaisuuden CC BY 4.0 -ehdot. **Kirjan yleislisenssi ei ole automaattinen lupa kopioida yksittäistä videota tai audiota.**

L044 käyttää kirjan jo olemassa olevaa kahdeksan vuoron litteraattia, sen neljää tarkistettavaa kysymystä ja C08-EX-07/08 -tehtäviä. Alkuperäisen videon ja audion lupa, integraatio ja todellinen toistotestaus ovat kesken. L044 ei väitä käyttäjän kuulleen alkuperäispuhetta.

## Julkisen lähteen manuaalinen uudelleentarkistus 13.11.2026

Tarkistin nimenomaisesti **julkaistun lähdetekstin ja julkiset lisenssimerkinnät**; en tarkistanut mediaa omalla mobiililaitteella. Tämän tarkistuksen dokumentointi ei yksin sulje toimituksellisia hyväksymisportteja.

**Wikibooks / M-WB-08:** https://en.wikibooks.org/wiki/German/Level_I/Schule näyttää lähdesivulla samat 26 puhe- tai kertojayksikköä kuin nykyinen `LOS1_C08_TEXT.originalLines` (järjestys u01–u26; yksi alkuperäisessä samalle riville kirjoitettu opettajan sisääntulo ja tervehdys on kirjan lukijassa erotettu kertojariviksi ja repliikiksi). Sivun alaosan pysyvä linkki osoittaa **oldid 4520956**; sivu ilmoittaa viimeiseksi muokkauspäiväksi **2.7.2025**. Footerin lisenssilinkki vie suoraan **CC BY-SA 4.0** -lisenssiin (https://creativecommons.org/licenses/by-sa/4.0/). Lähteen oma ilmoitus kertoo keskeneräisyydestä ja siitä, ettei varmennettua saksan äänitettä ole. Koko historiallisen muokkaajaluettelon ja mahdollisten aiempien versioiden erillisoikeuksien auditointi ei ollut tässä tarkistuksessa mahdollinen. Kirjassa käytetään edelleen Wikibooksin tekijöihin, revisioon ja lisenssiin viittaavaa attribuutiota; säilytä se ja dokumentoi kaikki myöhemmät muutokset.

**COERLL / M-DIB-03:** Virallinen https://coerll.utexas.edu/dib/vidt.php?f=01_19_int_ek_studies-home näyttää sanatarkasti samat kahdeksan saksankielistä puheenvuoroa kuin nykyinen `LOS1_TEXT_B_SOURCES["08"].lines`. Otsikko on `Kap 01 • Eva • Studium & Wohnen`. Julkaisun vuoden 2017 virallinen nimiöaineisto https://coerll.utexas.edu/dib/pdfs/intro.pdf (PDF:n sivu 4 / tiedoston sivu 4, nollapohjainen 3) sisältää **CC BY 4.0** -merkinnän ja listaa Eva Kunkelin haastateltaviin. Se todentaa kirjan lisenssi-ilmoituksen ja juuri tämän litteraatin olemassaolon mutta **ei vielä todista videon tai ääniraidan tiedostokohtaista käyttöoikeutta**. Mediat on jätetty tarkoituksella kopioimatta.

**Mitä oikeusmerkinnät edellyttävät:** CC BY-SA 4.0:n ehdoilla tarvitaan asianmukainen tekijämaininta, lähde- ja lisenssilinkki sekä tieto muutoksista. Muokattuun materiaaliin sovelletaan ShareAlike-ehtoa. CC BY 4.0 edellyttää tekijän ja lähteen tunnustamista sekä muutosten ilmoittamista. **Yksityinen opiskelu ei poista näitä velvollisuuksia automaattisesti**, mutta oikein sovellettu avoin lisenssi sallii tekstin käytön ja muokkaamisen ehtojensa rajoissa. Tämä ei ole oikeudellinen lausunto.

**Tilapäätös:** Tekstien verkkolähde, näkyvä sisältö ja sivuilta löytyvä lisenssi on tämän tarkistuksen perusteella vahvistettu, mutta **published=false säilyy**, kunnes riippumaton kieli-, attribuutio-/historia- sekä laitetarkastus on kirjattu. Aito äänen kuuleminen on edelleen erillinen avoin vaatimus.

## Aineiston ja harjoitusdialogin erottelu

Wikibooksin ja COERLL:n tekstit esitetään autenttisina lähdeteksteinä vain oppikirjassa. Uudet L041–L045:n lyhyet keskustelut ovat LOS!:n **itse kirjoitettuja, fiktiivisiä ja deterministisiä opetusskenaarioita**, eivät kummankaan alkuperäislähteen litteraatteja. Niiden valinnoille on käsikirjoitettu erilliset vastausreaktiot ja selitykset; opiskelija voi pyytää lisää apua ja kokeilla uudelleen. Tämä EI ole vapaamuotoinen tekoälychat eikä puheentunnistus.

L041: C08-EX-01–05. L042: C08-SCHOOL-Q01–03. L043: C08-EX-06, 07, 11 ja 12. L044: C08-TEXTB-Q01–04 ja C08-EX-07/08. L045: koko C08:n 12-osatehtäväinen jo olemassa oleva kappaletesti, oma sovellusluonnos ja itsearviointi. Oppituntien läpikäynti ja riippumaton kielitaito ovat eri asioita.

## Avoimet hyväksynnät

- [ ] Tarkka Wikibooks-revisio, alkuperäisen tekstilohkon tekijähistoria ja lisenssimerkinnän todentaminen lähdesivulta sekä attribuution muutostiedot.
- [ ] COERLL:n yksilöidyn litteraatin tarkka lähdeversio ja käyttöoikeus; yksittäiset audio/video-oikeudet ennen mahdollista integrointia.
- [ ] Saksankielisen opetussisällön ja tekstien riippumaton kielentarkistus sekä alkeistason pedagoginen QA.
- [ ] TypeScript, build, yksikkötestit ja selaintestit tämän PR:n omalla SHA:lla, ei aiempien PR:ien tuloksilla.
- [ ] Oikean iPhone Safarin, Linux Chromiumin, ruudunlukijan ja mahdollisen audiotoiston erilliset hyväksynnät.
- [ ] Tuotantosynkronoinnin ja vanhojen opiskelutietojen säilymisen todellinen hyväksyntä.

Julkaisua ei saa kuvata valmiiksi eikä published=true -lippua muuttaa näitä portteja kiertäen. Jos lähde vaihdetaan myöhemmin, muutos on kirjattava masterplaniin, manifestiin ja lähdekohtaisiin attribuutioihin erillisenä päätöksenä.
