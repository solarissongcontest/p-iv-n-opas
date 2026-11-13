# LOS! 1 · pedagoginen tarkistuskierros

**Päiväys:** 14.11.2026  
**Kohde:** LOS! 1, oppitunnit L001–L060, digikirjan sisäiset harjoitukset ja Teacher 2.0 -opetuspolku.  
**Tila:** kehityshaara, PR #253 (Draft). Tämä asiakirja ei ole julkaisu- eikä itsenäinen kielentarkistushyväksyntä.

## Tämän kierroksen laajuus

Tarkistus kattaa ohjelmallisesti kaikkien **60 oppitunnin** rekisteröinnin ja pedagogisen perusrakenteen. Tarkistus on toistettavissa testissä `tests/los-teacher-full-stack-integration.test.ts`. Lisäksi tehtiin lähilukuja ja konkreettisia sisältökorjauksia usean kappaleen opetusmateriaaliin.

| Osuus | Oppitunnit | Tämän kehitystyön kohdennetut muutokset |
| --- | --- | --- |
| C01–C05 ja Kertaus I | L001–L030 | Kaikki rekisterissä ja koko sarjan yhteisissä regressiotarkistuksissa. Aiemmat lähdeteksti- ja aloittelijatarkistukset säilyvät. |
| C06 · numerot ja ikä | L031–L035 | Ensimmäinen `eins`-kysymys vasta opetuksen jälkeen; numero-, tasakymmen- ja ikätehtävien vastaussuunnat täsmällisemmin selitetty. |
| C07 · aakkoset ja tavaus | L036–L040 | `Bitte buchstabieren Sie.` opetetaan ennen soveltamista. L038:n itsenäisestä kysymyksestä poistettiin suoraan näytetty `heißt`-mallivastaus. |
| C08 · selviytymisfraasit | L041–L045 | L043:n `Danke, jetzt verstehe ich.` opetetaan nyt ennen itsenäistä valintaa; kuvitteellinen opetusesimerkki erotetaan lähderepliikistä. |
| C09 · päivät ja aika | L046–L050 | L047:n `Viertel vor drei` erotetaan harjoituksen iltapäiväoletuksesta; L049 tekee näkyväksi `um fünf Uhr`-ilmauksen kontekstisidonnaisuuden ja `um siebzehn Uhr`-vaihtoehdon. |
| C10 · esittelyjen kokoaminen | L051–L055 | Kysymysten virhepalaute käyttää kunkin tehtävän omaa opettajan kirjoittamaa korjaavaa selitystä, ei viiden tunnin yhteistä harhaanjohtavaa mallitekstiä. |
| Kertaus II ja loppukoe | L056–L060 | L057:n ohje kertoo nyt kolmesta sisältöosasta, ei täsmälleen kolmesta virkkeestä, koska molemmat hyväksytyt oikeakieliset tervehdyksen välimerkkimuodot säilyvät. |

## Koko sarjan automaattisesti tarkistettavat vaatimukset

1. Oppitunnit L001–L060 löytyvät täsmälleen yhdestä yhteisestä rekisteristä; `chapterId` ja tehtävätunnisteet vastaavat luvun tai kertauksen lähdettä.
2. Jokaisella tunnilla on johdanto ja yhteenveto. Itsenäistä vastausta, soveltamista tai lopputarkistusta edeltää vähintään yksi opetuksen, mallin, lukemisen tai kirjan käyttötilanne. Tämä on vain **rakenteellinen minimiehto**, ei todistus jokaisen testattavan sanan riittävästä opetuksesta.
3. Itsenäisen, soveltavan tai lopputarkistuksen kirjoitustehtävän kysymyksessä ei näytetä hyväksyttyä vastausta sellaisenaan. Tämän tarkistuksen tarkoitus on estää ilmeiset vuotavat mallivastaukset; se ei korvaa käsin tehtävää pedagogista tarkastusta.
4. `Kirjoita numeroin` -tehtävissä hyväksytään numeromuotoja eikä saksankielisiä sanoja; `Kirjoita saksaksi` -tehtäviä ei saa ratkaista vain numeromerkinnällä.
5. C10:n korjauspalaute ei toista yleistä väärään tilanteeseen sopimatonta ohjetta. C06:n ja C07:n yksilöidyt regressiot varmistavat aiemmin löydetyt ongelmat.
6. Oppikirjan harjoitusten, kappaletestien ja ymmärtämistehtävien tunnisteita ei kopioida kilpaileviin vastauspankkeihin. Tuntien oikean oppimisen näyttöä ei päätellä pelkistä käynneistä, eikä äänen kuuntelua väitetä todeksi tekstin perusteella.
7. Opetuksen kappalekuva käyttää nykyistä `lesson.chapterId`-arvoa, ei kiinteää C09-tunnistetta.
8. Käyttöliittymätestit tutkivat olennaisia oppimistilanteita Chromiumissa ja WebKitissä. Yksikkötestit eivät todista todellisen puheen mallin äänenlaatua tai fyysisen laitteen käytettävyyttä.

## Mitä tämä ei vielä todista

- **Kielen ja didaktiikan asiantuntijatarkastus:** täysin itsenäinen äidinkielisen tai saksaa opettavan asiantuntijan tarkistus kaikista 60 käsikirjoituksesta ja niiden opetuksellisesta syvyydestä on edelleen tehtävä. Automaattinen regex- tai reittitesti ei takaa kielen idiomatisuutta.
- **Lähde- ja tekijänoikeusportti:** jokaisen ulkopuolisen lähteen käyttöoikeus, tarkka attribuutio ja versiohistoria tarkistetaan ennen julkaisua. Sisäinen käyttö ei korvaa näitä tarkistuksia.
- **Ääni, IPA ja video:** ääninäytteiden hyväksyntä, puhujien tai median oikeudet, transkriptioiden tarkkuus, laitetestit ja ääntämisen arviointimenetelmät ovat erillisiä portteja. Kirjallinen tehtävä ei ole automaattisesti kuullunymmärtämiskoe.
- **Manuaalinen saavutettavuus ja synkronointi:** näppäimistö, ruudunlukija, oikean puhelimen testaus ja luotettava eri laitteiden tallennus vaativat erilliset tarkistukset.
- **Muut LOS!-kirjat:** tämä raportti koskee vain LOS! 1:tä; kirjoja 2–8 ei saa pitää valmiina tämän auditoinnin perusteella.

Julkaisun R1–R12-portit säilyvät avoimina, eikä tämä dokumentti anna lupaa yhdistää kehityshaaraa tuotantoon. Merkitse viimeisimmän commitin Quality Gate ja Browser QA erikseen hyväksytyiksi vasta GitHub Actionsin onnistuneen tuloksen jälkeen.
