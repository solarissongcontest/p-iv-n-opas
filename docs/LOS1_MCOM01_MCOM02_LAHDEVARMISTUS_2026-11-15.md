# LOS! 1 · alkuperäisten loppukoeäänien M-COM-01 ja M-COM-02 lähdetarkistus

**Tarkistettu:** 15.11.2026  
**Rajaus:** alkuperäisäänitteiden julkiset lähdemerkinnät, lisenssit ja täydellisten tekstien vastaavuus nykyiseen koodiin. **Ei** laitteella tehty toistotesti, äänenlaadun lopullinen arvio, natiivipuhujan todistus, kaikkien käyttöehtojen oikeudellinen hyväksyntä eikä julkaisulupa.

## Julkisen alkuperäislähteen tiedot

| Tunniste | Commonsin alkuperäinen tiedosto | Tekijät / pvm | Kesto | Tekijän ilmoittama lisenssi |
| --- | --- | --- | --- | --- |
| M-COM-01 | [GesprächVorstellung.ogg](https://commons.wikimedia.org/wiki/File:Gespr%C3%A4chVorstellung.ogg) | Xzapro4 ja Erkan Yilmaz, 29.6.2008 | noin 14 s | CC BY-SA 3.0; Commonsissa myös muita vaihtoehtoisia CC BY-SA - ja GFDL-lisenssejä |
| M-COM-02 | [Deutsch Dialog . Ich bin Peter.ogg](https://commons.wikimedia.org/wiki/File:Deutsch_Dialog_._Ich_bin_Peter.ogg) | Ariser, 7.9.2011 | noin 12 s | CC BY-SA 3.0; Commonsissa myös muita vaihtoehtoisia CC BY-SA - ja GFDL-lisenssejä |

**Täsmälliset lähteet:**
- https://commons.wikimedia.org/wiki/File:Gespr%C3%A4chVorstellung.ogg
- https://commons.wikimedia.org/wiki/File:Deutsch_Dialog_._Ich_bin_Peter.ogg
- valittu lisenssi kummallekin: https://creativecommons.org/licenses/by-sa/3.0/

## Tarkistettu transkriptin täydellisyys

- `src/features/los/content/los1C01.ts`: alkuperäisen **8 repliikin** järjestys ja koko lauseteksti täsmäävät Commonsissa olevaan Franzin ja Jörgin dialogiin. Viimeinen puheenvuoro on `Tschüss!`. Tämän tekstin `sourceId` on `M-COM-01`.
- `src/features/los/content/los1MCom02.ts`: alkuperäisen **4 repliikin** järjestys vastaa Commonsin Thomasin ja Takashin dialogia. Kolmas puheenvuoro sisältää kokonaan `Ich bin Thomas. Das ist Peter. Wir kommen aus Berlin.`, ja neljäs sisältää myös lopun `Ich bin Japaner.`. Tämä on tärkeää, koska vain `Ich komme aus Kyoto.` -osuuden säilyttäminen ei olisi täysi lähdeteksti.
- Koodin välimerkeissä ja tyhjälyönneissä voi olla opetusmateriaalin kirjoitusasuun mukautettua muotoilua (esimerkiksi väli ennen kysymysmerkkiä Commonsin sivuilla), mutta alkuperäisten saksankielisten puheenvuorojen sisältöä ei ole rajattu pois. Suomennokset ovat LOS!:n erillistä opetusmateriaalia.
- M-COM-02 esiintyy myös muiden lukujen Text B -lähteenä; sama aineisto ei muutu useaksi riippumattomaksi tekijän tuottamaksi tekstiksi uudelleen käyttämisen vuoksi.

## Rajattu lisenssihavainto

Commonsin molemmilla tiedostosivuilla on tekijän ilmoittama mahdollisuus käyttää teosta **CC BY-SA 3.0** -ehdoin. LOS!:n nykyinen `los1-sources.json` sekä `los1FinalExam.ts` näyttävät samat tekijä- ja lisenssitiedot kuin tarkistetut tiedostosivut. Valittu lisenssi vaatii asianmukaisen tekijämaininnan, lisenssilinkin ja muokkaustietojen esittämisen sekä soveltuvat jakoehdot mahdollisille muunnelmille.

Tämä ei yksin vahvista kaikkien oppikirjasovelluksen muiden lähteiden käyttöoikeuksia. Myöskään yksityiseksi tarkoitettu sovellus ei oikeuta automaattisesti ohittamaan attribuutiota tai lisenssiehtoja.

## Mitä EI vielä ole hyväksytty?

- **Toimiva toisto:** Commonsin OGG-äänitteen käynnistys, loppuun toistuminen ja häiriöstä palautuminen oikealla iPhonella ja Linux-tietokoneella; myös verkkokatkoksen ja puuttuvan mediatiedoston tilat.
- **Kuuntelun näytön oikeellisuus:** varmista, ettei tekstin lukeminen tai sivulla käyminen merkitse ääntä loppuun kuulluksi. Äänidatan olemassaolo ei riitä.
- **Ääntämisen opetuskäyttö:** kummankaan lähteen puhujia ei pidä merkitä automaattisesti kahdeksi saksan äidinkieliseksi puhujaksi. Erityisesti M-COM-01:n alkuperäisessä rekisterissä on tästä perusteltu varoitus. Riippumaton ääntämisen asiantuntijatarkistus on vielä avoin.
- **Julkaisu:** lähteiden `stage: rights-verified`, `mediaTested: false`, `deviceTested: false`, `languageReviewed: false`, `published: false` säilyvät. Tämän raportin perusteella näitä portteja ei saa ohittaa.

## Regressioturva

`tests/los-text-b-complete-audio.test.ts` varmistaa nyt lähteiden kaikki saksankieliset repliikit, lähteiden muuttumattomat tunnisteet, molempien loppukoeäänien attribuutiot sekä sen, että lisenssitarkistus ei vahingossa muutu audio-/laite-/kielihyväksynnäksi.

**Tila:** kaksi lähdesivua tarkistettu aineistokatalogin pohjalta. Ei tuotanto-/julkaisuhyväksyntää.
