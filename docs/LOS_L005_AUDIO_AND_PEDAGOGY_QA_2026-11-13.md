# LOS! Teacher Experience 2.0 – L005 kuuntelun ja lähteen sisäinen auditointi

**Päiväys:** 13.11.2026
**Tila:** `review:"draft"`; riippumaton saksan kielen, pedagogiikan ja saavutettavuuden hyväksyntä puuttuu.
**PR:** #232, erillinen alustava toteutus PR #218:n päälle.

## Käytetty oikea äänite

- Lähdetunniste: `M-COM-03`.
- Alkuperäinen: *German Vocabulary - Greetings.ogg*, German Men92 (English Wikibooks).
- Sivun tarkistettu attribuutio: [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:German_Vocabulary_-_Greetings.ogg).
- Pituus: noin 28 sekuntia. Koko alkuperäinen sisältö: **20 ilmauksen ääneen luettu lista**, ei kahden henkilön dialogi.
- Lisenssi: tekijän public domain -luovutus Commonsin tiedostosivulla.
- Sama koko litteraatti ja sen 20 suomennosta ovat jo `LOS1_TEXT_B_SOURCES["01"].lines`-aineistossa (myös C04:n Text B:ssä). L005 lukee tämän saman kanonisen sisällön, eikä kopioi muuttunutta tekstiversiota.
- Äänentoisto ladataan Commonsin tiedostoreitistä. Ääntä ei väitetä testatuksi fyysisellä iPhonella tai Android-laitteella.

## Opetuksen rakenne

1. Aiemman tervehdyksen aktivointi
2. Kuuntelutavan johdanto
3. Opettajan selitys ääneen lausuttujen fraasien erottamisesta
4. Näytetty malliesimerkki: Hallo! vs. Tschüss!
5. Oikea äänite, uudelleenkuuntelu, koko tekstin ja suomennosten vaihtoehto
6. Ohjattu erottelu
7. Itsenäinen, rajattu fraasin merkitystehtävä
8. Kirjoitettava soveltaminen: Bis später!
9. Loppuvahvistus ilta- ja yöilmausten erosta
10. Yhteenveto ja rajattu jatko L006:een

Jokaisella opetustilanteella on kaksi eri tavalla selittävää, käsikirjoitettua
`En ymmärrä` -vaihtoehtoa. Kaikki keskeinen opetus annetaan itse
oppitunnissa, eikä sitä siirretä lähdelinkin taakse.

## Mitä järjestelmä oikeasti tallentaa

- `teacher.media.playingAt`: selaimen ilmoitus, että alkuperäisen äänitteen toisto käynnistyi.
- `teacher.media.endedAt`: selaimen tapahtuma äänitteen päättymisestä; sallitaan vain aloitetun toiston jälkeen.
- `teacher.media.textOpenedAt`: koko litteraatti avattiin käyttöliittymässä.
- `teacher.answers`: käsikirjoitettujen tehtävien tarkistusvastaukset ja yritysmäärät.
- `teacher.completedContentRevision`: päivitetyn opetuksen käsittely, ei kuullun ymmärtämisen todistus.

**Tärkeä raja:** Toistopainikkeen napsautus, soittimen `playing`/ `ended`
-tapahtuma ja koko litteraatin avaaminen eivät todista, että opiskelija todella
kuuli tai ymmärsi ääntä. Niistä ei anneta kuullun ymmärtämisen arvosanaa.
Tekstivastineella opetus voidaan käydä loppuun, mutta kuuntelutaidon tavoite
jää erikseen todentamatta. Kun koko tekstivastine on avattu, sitä seuraavia
ensiyrityksiä ei tulkita täysin tuettomaksi muistista tuottamiseksi.

## Julkaisuportit ja riskit

1. Todellinen äänen toistotesti iPhone Safarilla, Android Chromella ja
   työpöydällä. Ogg-tiedoston ja mahdollisen palvelin-/verkkohäiriön käsittely.
2. Riippumaton saksankielinen käännös-, rekisteri- ja tehtäväauditointi.
3. Kuuntelun arviointi erillisenä taitona: kysymysten ratkaiseminen
   tekstivastineesta ei saa koskaan korvata kuullun ymmärtämisen näyttöä.
4. Näppäimistö-, ruudunlukija-, ruutukoko- ja paluupolkutestit.
5. Päivitetyn L005:n vanhojen suoritusmerkintöjen ja JSON-varmuuskopioiden
   regressiotestit sekä koko LOS! 1:n selaintestit.
6. Äänilähteen public domain -tila ja lähdeviittaus tarkistettava vielä
   julkaisun yhteydessä, jos Commonsin tiedostotiedot muuttuvat.

L005 pysyy toimituksellisena luonnoksena. Automaattinen onnistunut CI-ajokaan
ei ole riippumattoman kielenopettajan hyväksyntä eikä fyysisen laitteen testi.

## Commonsin lähdesivun erillinen tarkistus

Wikimedia Commonsin tiedostosivulla (tarkistettu 13.11.2026) ilmoitetaan
alkuperäisen Ogg-äänitteen pituudeksi 28 sekuntia, tekijäksi
German Men92 ja lähteeksi English Wikibooks. Sivulla oleva koko transkriptio
alkaa `Hallo!`-ilmauksesta ja päättyy `Gute Nacht!` -toivotukseen;
siinä on 20 ilmausta. Sivun lisenssiosio ilmaisee tekijän luovuttaneen
äänitteen public domain -käyttöön. Tämä vahvistaa käytetyn lähteen
tunnisteen ja tekstiluettelon, **ei** vielä selaintoiston toimintaa,
äänen ja yksittäisten kohtien aikaleimoja tai pedagogista hyväksyntää.
