# LOS! 1 · C09 / L046–L050: lähde- ja laaturajaus

**Tila 13.11.2026:** toimituksellinen lähdeauditointi, ei julkaisu- eikä laitehyväksyntä.

## Text A: M-WB-03, `Sport und Zeit`

- **Kirjassa käytetty lähde:** Wikibooks, *German/Level I/Freizeit*, versiotunniste `4003622`, https://en.wikibooks.org/w/index.php?title=German/Level_I/Freizeit&oldid=4003622 .
- **Julkisesti tarkistettu saman sisältöinen artikkelisivu:** https://en.wikibooks.org/wiki/German/Level_I/Freizeit .
- Nykyisellä julkisella artikkelisivulla on *Dialogue: Sports and time — Sport und Zeit*: **seitsemän** vuorottelevaa Franzin ja Gretan repliikkiä. Nykyisen C09-kirjalukijan `getLosOpenDialogue("09").originalLines` sisältää nämä seitsemän samassa järjestyksessä, alkaen Franzin kellonaikakysymyksestä ja päättyen hänen hyvästelyynsä. Näkymässä ei ole syytä keksiä lisärepliikkejä tai äänittää tätä tekstiä muka alkuperäisenä äänitteenä.
- `Viertel vor drei` on **14.45** oletetussa iltapäivän tilanteessa; `um drei` on **kello kolmelta**. Vuorokaudenaika tulee yhteydestä, ei sanasta `drei` itsestään.
- Alkuperäisellä sivulla on huomautus erään `Fußball`-sanan suvusta: lähteen yhteydessä oleva äänite sanoo `das`, vaikka `der Fußball` on oikein. LOS!:n sanaston `der Fußball` on siksi tarkoituksellinen ja asianmukainen; virheellistä äänimuotoa ei tule käyttää oppimisen mallina.
- Sivun julkaisemien teosten tekijät ja lisenssiehdot pitää näkyä käyttöliittymän attribuutiossa. Nykyinen kirjan lähderekisteri näyttää CC BY-SA 4.0 -merkinnän ja version. Tässä tarkistuksessa **ei** avattu historiaversion `oldid=4003622` koko tekijäluetteloa eikä varmennettu kaikkien aikaisempien muokkausten lisenssiketjua. Älä sulje oikeusauditoinnin porttia tämän tarkistuksen perusteella.

## Text B: M-COM-07, alkuperäinen viikonpäivä-äänite

- **Alkuperäisen tiedoston kuvailu:** https://commons.wikimedia.org/wiki/File:German_Vocabulary_-_Days.ogg .
- Kuvailusivun mukaan kyse on **15 sekunnin Ogg Vorbis -äänitteestä**, jonka alkuperäinen tekijä ja English Wikibooks -lataaja on **Christoph** (alkuperäinen lataus 13.2.2007). Sivun tarkka litteraatti on yksi luettelo, joka alkaa `Tage: Montag` ja päättyy `Sonntag`, eikä sisällä kellonaikoja tai kahden henkilön keskustelua.
- Commonsin tiedostosivu ilmoittaa lisensseiksi **CC BY-SA 3.0 Unported** sekä **GNU FDL 1.2 tai uudempi**. Kirjan lähderekisterissä käytetään CC BY-SA 3.0 -käyttöpolkua ja attribuutiota `Christoph (English Wikibooks, 2007)`; säilytä lähdelinkki, tekijä ja lisenssilinkki https://creativecommons.org/licenses/by-sa/3.0/ .
- L049:n keskiviikko ja kello **16.00** ovat *LOS!:n itse luoma erillinen kalenteriharjoitus*. Lähdetiedostosta voi tunnistaa sanan `Mittwoch`, **mutta ääni ei sisällä kellonaikaa 16.00**. Tehtävässä pitää sanoa tämä näkyvästi.
- Lähde on olemassa ja sen käyttöehdot on tarkistettu julkisesta Commons-kuvailusta. Äänentoistoa, saavutettavuutta, automaattisia verkkopyyntöjä, koko mobiili- ja Linux-laitetukea tai oppijan todellista kuuntelua **ei** ole tässä manuaalisesti todistettu.

## Lähteiden integrointia koskevat ehdot

1. Pidä Text A:n ja Text B:n repliikit **kanonisessa digikirjan lähderekisterissä**. Teacher 2.0 renderöi täsmälleen nämä rivit, ei manuaalisesti ylläpidettyä tekstikopiota.
2. Näytä alkuteksti **LOS!:n sisällä**. Alkuperäisverkkosivun linkki on attribuutiota ja tarkistusta varten, **ei tekstiin pääsyn edellytys**.
3. Älä ilmoita lukemista suoritetuksi kuullunymmärtämiseksi: äänitteen kuuntelusta ei ole laitteeseen sidottua hyväksyttyä näyttöä.
4. Pidä **harjoitusaineisto ja lähteen faktat erillään**: viikkokalenterin kellonajat ovat synteettisiä sovellusesimerkkejä.
5. Pidä vapaan kirjoittamisen tarkistus itsearviointina; tekoälyn antamaa kielellistä arvosanaa ei ole.
6. Kappaletestistä ja oppimispolun suorituksesta tulee merkintä vasta oikeista alkuperäisen kirjan tallennus- ja palautustiedoista, ei pelkästä näkymän avaamisesta.

## Avoimet julkaisuportit

- Riippumaton saksan kielen pedagoginen tarkistus, erityisesti kellonajan `um` ja viikonpäivän `am` opetus sekä autenttisen korkeampitasoisen lukutekstin rajaus.
- Tekstien tarkat muokkaushistoriat ja riittävän attribuution vahvistus; CC BY-SA -ehtojen soveltaminen mahdollisiin muokkauksiin.
- Alkuperäisen äänitteen *todellinen* toisto sekä tekstivastine ja säätimet oikealla iPhonella, Safari/WebKitillä ja Linux-työpöydällä.
- Täyden Teacher-kokonaisuuden saavutettavuus, mobiilinäppäimistöt, ajanlasku ja testipalautuksen vakaus.
- C09:n CI-raportti ja kaikkien selaintestien tila on tarkistettava **viimeisestä haaran commitista**, ei varhaisemmasta yksikkötestien onnistumisesta.

**Päätös:** alkutekstit ja lähde-erottelu ovat dokumentoidusti perusteltuja, mutta C09 jää toistaiseksi Draft- ja preview-tilaan.
