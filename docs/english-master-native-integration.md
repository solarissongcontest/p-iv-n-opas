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

## Sisällön käyttöönotto

Ensimmäisellä käynnistyksellä kirja tarvitsee yhden sisältöpaketin:
`ENGLISH_MASTER_OPINTOPAIVAKIRJA_CONTENT_PACK_0.8.json.gz`

Paketti tuotetaan tästä projektissa toimitetusta alkuperäisestä Alpha 0.8:n `content/`-hakemistosta ja sen 20 omasta `app/assets/*.mp3`-äänitiedostosta. Siinä on 122 alkuperäistä lukua, 192 alkuperäistä oppituntia ja 20 mediaa.

**Välitön käyttö:** avaa `/english-master` Opintopäiväkirjan valikosta ja valitse paketti yhden kerran. Se säilyy IndexedDB:ssä myös sivun päivitysten yli, jos selain sallii paikallisen tallennuksen.

**Täysin automaattinen käyttö ilman tuontia:** aseta sama paketti repo- tai tuotantopalvelimen polkuun `public/english-master/content.pack.json.gz`. Lukija yrittää ladata sen automaattisesti, jos käyttäjän laitteella ei vielä ole pakettia. Pakettia ei ole lisätty tähän koodimuutokseen eikä sen tuotantojulkaisua voi väittää tehdyksi ennen todellista tiedoston asennusta.

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

Testi luo pienen synteettisen 122/192 testipaketin. **Se ei väitä suorittaneensa koko 4,57 Mt:n oikean paketin E2E-testiä.** Julkaisuun tarvitaan myös `npm run build` / TypeScript-tarkistus, Playwright-testi sekä oikean paketin smoke-testi selaimessa.

## Seuraavat erilliset työt

1. Julkaise sisältöpaketti palvelimelle, jolloin manuaalinen tuonti poistuu.
2. Toteuta turvallinen tilien välinen, laitteiden välinen edistymisen synkronointi: ei pelkkää localStorage-avainten jakamista.
3. Syvennä 122 luvun teoriaa ja 192 tunnin pedagogista laatua sekä erillinen kieli- ja koetarkistus.
4. Toteuta todelliset koesimulaatiot, koko YO-tehtäväarkisto ja lopulliset ääniassetit.

Mikään tässä muutoksessa ei muuta LOS!:n reittiä, sisältöä tai tallennusta.
