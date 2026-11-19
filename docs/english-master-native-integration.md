# English Master Opintopäiväkirjassa (LOS!-mallinen integrointi)

## Toteutettu

- **Reitti:** `/english-master`, itsenäinen kirjan lukija LOS!:n `/los`-reitin rinnalla.
- **Opintopäiväkirjan Lisää-valikko:** English Master näkyy LOS!:n vieressä.
- **Laitteen tunnistus:** käyttää samaa `readCachedDeviceUser()`-porttia kuin LOS!. Ei uusia oikeuksia tai tunnuksia.
- **Kirjalukija:** 122 luvun sisällysluettelo, suomenkieliset teoriat, englanninkieliset esimerkit ja liittyvät oppitunnit.
- **Opetuspolku:** 32 jaksoa, 192 oppituntia, taulukohtaukset, tehtävät ja selitykset.
- **Vastausten tarkistus:** rajatut monivalinnat ja aukkotehtävät tarkistetaan aineiston tarkistetuilla avaimilla; avoimet vastaukset jäävät itsearvioitaviksi.
- **Writing Academy:** paikallinen esseeluonnos, merkkilaskuri ja yhden painikkeen vapaaehtoinen ChatGPT-promptin kopiointi.
- **Listening Lab:** 20 synteettistä pilottiäänitettä, ei virallisiksi YO-äänitteiksi väitettyinä.
- **Edistyminen:** laitekohtainen, käyttäjätunnisteella rajattu paikallinen progress; vienti ja palautus JSON-tiedostona.
- **Mobiili:** omat kirjan navigointipaneelit, yksipalstainen lukija ja näppäimistökäyttö.

## Automaattinen sisältöpaketti (ensimmäisen käytön tiedostovalinta poistettu)

Kaikki **122 kirjalukua, 192 oppituntia ja 20 alkuperäistä synteettistä pilottiäänitettä** toimitetaan tästä samasta GitHub-repositoriosta. Binäärinen `Alpha 0.8` -paketti on jaettu 16 staattiseen osaan, jotka sijaitsevat polussa `public/english-master/pack-part-00.bin` … `pack-part-15.bin`.

- `public/english-master/content.manifest.json` sisältää version, osien nimet ja koot sekä koko gzip-paketin SHA-256-tarkistussumman.
- `/english-master` lataa osat automaattisesti ensimmäisellä verkkokäynnillä ja kokoaa niistä alkuperäisen gzip-tiedoston selaimessa.
- Ennen käyttöä selain tarkistaa jokaisen osan koon, koko paketin 4 794 010 tavun pituuden sekä SHA-256:n. Paketti hyväksytään vasta, jos se sisältää täsmälleen 122 lukua, 192 oppituntia ja 20 äänitettä.
- Onnistunut paketti tallennetaan IndexedDB:hen offline-käyttöä varten. Seuraavalla kerralla et tarvitse enää verkkolatausta tai manuaalista tiedostonvalintaa.
- Jos paikallinen välimuisti on korruptoitunut, selain yrittää ladata sisällön palvelimelta uudelleen.
- Jos verkko ei toimi eikä IndexedDB:ssä ole ehjää pakettia, käsin tuonti jää tarkoituksella hätävaraksi.

Tämä korvaa aiemman ohjeen, jossa käyttäjän piti ensin ladata ja tuoda `ENGLISH_MASTER_OPINTOPAIVAKIRJA_CONTENT_PACK_0.8.json.gz`. Täysi sisältö on nyt mukana GitHub-koodissa, joten erillistä latauspalvelua tai ulkopuolista linkkiä ei käytetä.

## Sisällön käyttöönotto

Aiempi käsin tuotava sisältöpaketti toimii edelleen offline-varavaihtoehtona:
`ENGLISH_MASTER_OPINTOPAIVAKIRJA_CONTENT_PACK_0.8.json.gz`

Paketti tuotetaan tästä projektissa toimitetusta alkuperäisestä Alpha 0.8:n `content/`-hakemistosta ja sen 20 omasta `app/assets/*.mp3`-äänitiedostosta. Siinä on 122 alkuperäistä lukua, 192 alkuperäistä oppituntia ja 20 mediaa.

**Tavallinen käyttö:** avaa `/english-master` Opintopäiväkirjan valikosta. Paketti latautuu automaattisesti palvelimelta ja säilyy IndexedDB:ssä myös sivun päivitysten yli, jos selain sallii paikallisen tallennuksen.

**Asennus tuotantoon:** Vercelin tulee julkaista kaikki `public/english-master`-hakemiston 17 tiedostoa. GitHubissa oleva aineisto ei yksin vahvista tuotantosivuston viimeisintä julkaisuversiota.

Älä tarjoa äänitteitä tai tehtävien vastauksia aiempien julkaisemattomien YO-kokeiden autenttisina aineistoina. Tämä on Alpha 0.8:n luonnossisältö.

## Turvarajat

- `*.json.gz` puretaan ja jäsennetään rakenteiseksi dataksi. Käyttäjän tiedostoa ei suoriteta HTML- tai JavaScript-koodina.
- Mobiilissa ja selaimessa käytettävä tallennus on **paikallinen**, ei tietokantaan synkronoitu. Erityisesti LOS!:n suojattua pilvisynkronointia tai laitteiden välistä käyttöä ei kopioida ilman erillistä turvallisuusarviota.
- Kirjaluvut ja oppitunnit ovat `draft`-tilaa; JSONin olemassaolo ei muuta niitä `published`-tilaan.
- Opetuspolun ”harjoitelluksi”-merkintä ei tarkoita hallittua taitoa.
- Vapaata kirjoitelmaa ei pisteytetä automaattisesti eikä käyttäjän tekstiä lähetetä ChatGPT:lle ilman käyttäjän omaa toimintoa.
- Täysimittaisia YO-harjoituskokeita A–C ei ole valmiina. Tässä toteutuksessa näkyy niihin liittyvä luonnosopetus.

## Tarkistus

`e2e/english-master-native.spec.ts` tarkistaa laiteportin, gzip-paketin tuonnin, sisällön säilymisen latausten välissä, kirjaluvun, monivalintatehtävän, oppitunnin ja edistymistilan.

Testi tarkistaa sekä synteettisen 122/192-manuaalituonnin että oikean 122/192/20-sisältöpaketin automaattisen latauksen. Lisäksi `tests/english-master-assets.test.ts` tarkistaa alkuperäiset 16 binääriosaa, SHA-1- ja SHA-256-tarkistussummat, gzip-purun ja aineiston lukumäärät. Julkaisuun tarvitaan myös `npm run build` / TypeScript-tarkistus sekä onnistunut Playwright-ajo.

## Seuraavat erilliset työt

1. Julkaise sisältöpaketti palvelimelle, jolloin manuaalinen tuonti poistuu.
2. Toteuta turvallinen tilien välinen, laitteiden välinen edistymisen synkronointi: ei pelkkää localStorage-avainten jakamista.
3. Syvennä 122 luvun teoriaa ja 192 tunnin pedagogista laatua sekä erillinen kieli- ja koetarkistus.
4. Toteuta todelliset koesimulaatiot, koko YO-tehtäväarkisto ja lopulliset ääniassetit.

Mikään tässä muutoksessa ei muuta LOS!:n reittiä, sisältöä tai tallennusta.
