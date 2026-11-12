> **Uudempi tuotepäätös 12.11.2026, yhdistetty PR #212:** LOS! on yksinomaan interaktiivinen digikirja. Tämän historiallisesti säilytettävän U1.0-masterplanin vanhat B5-/näköiskirja-/PDF.js-/painojulkaisuvaatimukset ovat kumoutuneet. Niitä ei toteuteta, testata julkaisuportteina eikä palauteta yhteensovituksessa. Kaikki muut opetuksen, kuvituksen, sanakirjan, äänen, opiskelutietojen ja R1–R12:n sitoumukset säilyvät.

LOS! — KOKO DIGIKIRJAN UUDISTUSMASTERPLAN

Tunniste: LOS_RENEWAL_U1
Versio: U1.0 · Päiväys: 12.11.2026
Kohde: Opintopäiväkirja → LOS! 1–8, ensisijainen pilotti LOS! 1 / SAB31
Luonne: toteutettava tuotepäätös, tekninen suunnitelma, sisällöllinen laatuvaatimus, testaus- ja julkaisusopimus. Ei väite, että ominaisuudet olisi jo toteutettu.
Tarkistettu GitHub-lähtötilanne: solarissongcontest/p-iv-n-opas, main-haara, commit 4b3bb2ebb7f0797c86f25942c698acb33a4d27de, tarkistus 12.11.2026. Commit voi muuttua. Ennen jokaisen muutoksen toteutusta haetaan tuore main ja verrataan todelliseen koodiin.

> **Uudistuksen varsinainen tavoite:** LOS! ei saa olla vain kaunis sisältöluettelo, sanakirjan prototyyppi ja kokoelma yksittäisiä harjoituksia. Sen on oltava itsenäisesti opettava, kielellisesti luotettava, äänitetty ja helppokäyttöinen digitaalinen saksan oppikirjasarja. Säilytetään toimiva perusta ja LOS!:n oma ulkoasu; korjataan informaatiarkkitehtuuri, sisältöjen laatu, sanakirjan tietolähteet, ääntämisen ja harjoitusten integraatio sekä käyttäjän etenemisen luotettavuus.

────────

Sisällys

1. Dokumentin asema ja päätösten sitovuus
2. Lähtötila, ongelmien juurisyyt ja tavoitetila
3. Keskeiset tuoteratkaisut ja tradeoffit
4. Sivujen, sisältöpuun ja lukutilojen arkkitehtuuri
5. IPA ja ääntämisen/äänitteiden kokonaisjärjestelmä
6. FreeDict–Wiktionary-sanakirja, datan tuonti ja hakutoiminnot
7. Oppimateriaali, LOS! 1:n C01-pilotti ja kaikki kymmenen kappaletta
8. Tehtävämoottori, arviointi, kokeet ja kertaus
9. Tietomalli, sanan tunnistus ja sanakirjan integrointi
10. Autenttiset aineistot, lisenssit ja kielentarkistus
11. Tallennus, synkronointi, yksityisyys ja vanhan datan säilyminen
12. Ulkoasu, uudet komponentit ja saavutettavuus
13. Koodiarkkitehtuuri ja suorituskyky
14. Työpaketit U0–U7 ja valmistumiskriteerit
15. Testi- ja hyväksymismatriisi R1–R12
16. Ongelma- ja poikkeustilanteiden valmiit ratkaisut
17. Valmistumisen määritelmä ja ylläpidon päätökset
18. Toteuttajalle annettava toimeenpanokäsky
19. Lähteet ja tarkistuksen rajat

0. Dokumentin asema ja päätösten sitovuus

0.1 Etusijajärjestys

1. Todellinen laki, lähteiden käyttöehdot, yksityisyys, saavutettavuus ja käyttäjän jo hyväksymät alkuperäiset kansi-/banneri-/logoassetit.
2. Los masterplan.txt: koko LOS!-sarjan oppimisen, materiaalien, tallennuksen ja kahdeksan kirjan perustavoitteet.
3. Tämä U1.0: tämän uudistuksen nimenomaisesti muuttamat toiminnalliset, pedagogiset ja käyttöliittymäpäätökset. Ristiriitatapauksessa uusi nimenomainen päätös korvaa vanhan yksityiskohdan, mutta ei muuttumattomia sarjan periaatteita.
4. LOS_VISUAALINEN_MASTERPLAN_V3_3_YHTENAINEN.md: kaikki visuaaliset asiat, joita tämä uudistus ei muuta. U1.0:n uudet ääntämis-, sanakirja- ja työtilaratkaisut on sisällytettävä seuraavaan visuaaliseen versioon V3.4; vanhaa V3.3-tiedostoa ei muokata historiattomasti.
5. Los 1.txt: LOS! 1:n kappaleet, aineistot ja pedagoginen sisältö, ellei U1.0 eksplisiittisesti edellytä niiden täydentämistä (esimerkiksi IPA- ja äänitietojen lisäämistä).
6. LOS1_SOURCE_MANIFEST_v1.0(1).json: lähdeinventaarion lähtöversio. Siinä merkitty julkaisuvalmius ei automaattisesti kuvaa 12.11.2026:n uusinta koodia.
7. Suunnitelma LOS.txt: aiempi toimeenpanosuunnitelma, jonka ristiriitaisen työjärjestyksen ja tässä uudistuksessa korjattavat yksityiskohdat U1.0 syrjäyttää.
8. LOS1_NAKOISKIRJA_MASTERPLAN_v1.0(1).txt: vain painetun näköisen B5-näköiskirjan sisäiset tuotanto- ja taittosäännöt. Näköiskirja on erillinen esitysmuoto, ei interaktiivisen lukijan uusi päämuoto.

Ei muuteta: LOS! 1–8/SAB31–SAB38, suomenkielinen opetus, nollatasolta aloittaminen, luvallisten kokonaisten tekstien näyttäminen LOS!:ssa, vapaaehtoinen noin 30 minuutin opetuspolku, 10 kappaleen LOS! 1, 60 oppitunnin opetuspolku, nykyiset hyväksytyt kansi ja banneri, yhteinen tehtävämoottori, aiemman opiskeludatan säilyttäminen, ei sisäistä tekoälychatia eikä opettajaroolia.

0.2 Päätösmerkinnät

• LUKITTU: toteutuksen vaatimus; muutetaan vain perustellulla versiomuutoksella.
• TOTEUTUSOLETUS: valittu tekninen ratkaisu; pidetään voimassa, kunnes nykykoodin tosiasia tai testit osoittavat toimimattomaksi.
• TARKISTETTAVA EHTO: lisenssi, selaintoiminto, kieliasu, oikea tuotantoympäristö tai datan täydellisyys. Suunnitelma voi päättää vararatkaisun, mutta ei väittää tarkistusta tehdyksi.
• EI KUULU TÄHÄN JULKAISUUN: tietoisesti rajattu pois.

Jokaisella seuraavassa mainitulla toteutusvaatimuksella on oltava testattava hyväksymiskriteeri. Mitään keskeneräistä mediaa, dataa, kielentarkistusta tai pilvisynkronointia ei saa nimetä valmiiksi vain siksi, että sivulla on painike.

1. Lähtötilan tosiasiat, ongelmien juurisyyt ja tavoitetila

1.1 Mitä käyttäjän 12.11.2026 kuvista voi päätellä

Kuvissa LOS! 1:n etusivulla näkyy hyväksytty kansi ja kuvabanneri. Sisällysluettelossa on C01–C10-kappaleet, mutta desktopin vasen paneeli ei tarjoa Otavan esimerkkien kaltaista tarkkaa hierarkiaa tekstien, tehtävien ja osioiden välillä. Kappaleavauksessa on suhteellisen paljon tyhjää tilaa ja yläpalkissa kymmenen osio-otsikkoa. C01:n dialogin sanaselitys aukeaa tekstin alapuolelle erillisenä leveänä harmaana laatikkona. Kieliopin ääntämisesimerkkejä näkyy taulukossa ilman systemaattista IPA- ja sanakohtaista äänirakennetta. Vertailukuvissa Otavan New Insights ja Fokus näyttävät hyödyllisiä ratkaisuja: tehtäväkohtainen sisältöpuu, äänitteet lähellä lähdettä, teksti ja tehtävä tarvittaessa rinnakkain, taulukot, heti vastauspaikan sisältävät tehtävät ja johdonmukaiset erilliset kielioppisisällöt.

Kuvakaappaus ei todista, ettei jokin muu toiminto olisi jo koodattu, etteikö uusi deploy olisi muuttunut tai että jokin backend olisi viallinen. Nämä ovat visuaalisia havaintoja.

1.2 Todellisen nykykoodin tarkistus, 12.11.2026

• GitHub main tarkistettu SHA 4b3bb2e…, jonka uusin näkyvä commit koskee LOS! 1:n Aloita/Jatka-toimintoa ja oikeaan oppituntisuoritukseen perustuvaa jatkamista. Tämä on säilytettävää työtä, ei rakennettava uudestaan.
• src/routes/los.tsx ohjaa LosBook-komponenttiin (React/TypeScript/TanStack Router). LOS! elää olemassa olevan sovelluksen sisällä.
• src/features/los/LosBook.tsx sisältää kirjasivut, reitityksen, kappaleosiot ja erillisiä sisältö- ja mediakomponentteja. LosOriginalDialogue.tsx sisältää tekstin tokenisoinnin, korostusten käsittelyn ja sanan napsautuksen.
• LosReferenceTools.tsx: nykyinen DICTIONARY rakennetaan LOS_BOOKS-kirjaluettelon chapter.vocabulary-merkkijonoista, ei vielä tarkistetusta FreeDict+Wiktionary-tuontikannasta. Tämä on todellinen sanakirjapuutteen syy. Sama tiedosto sisältää Wikimedia Commons -osoitteisiin perustuvan HTML-audiosoittimen; yksittäisen äänitteen palvelin-/selain- ja lisenssitesti ei seuraa pelkästä koodin olemassaolosta.
• LosOriginalDialogue.tsx: nykyinen sana-avauksen gloss näyttää sanan ja merkkijonoselityksen lukijan alapuolella. Siitä puuttuu yhtenäisen sanakirjakortin lemma-, IPA-, audion-, taivutus- ja lähdekäsittely.
• LosVoicePractice.tsx käyttää käyttäjän luvalla MediaRecorder-rajapintaa ja paikallista omaa äänitystä. Se ei ole automaattinen ääntämisarvostelija, eikä sellaista nyt rakenneta.
• Koodissa on jo LosMidtermExam, LosFinalExam, guided lesson/lesson engine-, progress-, recall-, backup- ja useita sisältökomponentteja. Näitä ei saa hävittää massauudelleenkirjoituksella. Niiden toiminta ja vastaavuus vaatimuksiin arvioidaan testein.
• LosBook.tsx kertoo eräille lähteille vielä sourceGate-julkaisurajoituksia. Lähteen löytyminen kirjasta ei todista audio-oikeuden tai kielentarkistuksen valmistumista.

Näyttöraja: tässä tarkastettiin valikoituja lähdetiedostoja ja GitHub-haaran tietoja, ei koko tuotannon selaintestausta, kaikkia migraatioita, pilvessä olevaa dataa tai jokaisen mediasoittimen todellista toistoa. Nämä ovat toteutuksen ensimmäisen validoinnin tehtäviä.

1.3 Uudistuksen hyväksyttävä tavoitetila

1. Kirja on sisällöllisesti kokonainen, ymmärrettävä ja motivoiva ilman opettajaa. Sivuille ei tehdä näennäistä pituutta tyhjällä taitolla.
2. Oppikirjan jokainen asia on suoraan löydettävissä. Oppiminen ei ole kymmenen välilehden ja keskenään ristiriitaisten listojen välillä harhailua.
3. Jokainen opetettava uusi sana tai fraasi sisältää tarkistetun perusmuodon, suomennoksen oikeassa yhteydessä, IPA:n ja kuunneltavan ääntämisen tai selkeän perustellun poikkeustilan. Sana osataan avata myös tekstistä.
4. Yleissanakirja on todellinen ladattu ja indeksoitu tietokanta, ei muutaman kirjan muutaman sanan lista.
5. Kielitaidon kehittäminen yhdistää lukemisen, kuuntelun, puhumisen, kirjoittamisen, ymmärtämisen, soveltamisen ja kertauksen.
6. Kaikki ratkaisut toimivat tietokoneella ja puhelimella, säilyttävät olemassa olevat opiskelutiedot eivätkä markkinoi virheellistä valmiutta.

2. Keskeiset tuoteratkaisut ja tradeoffit

|Päätöskysymys                        |Lukittu ratkaisu                                                                                                                                              |Tärkein vastaväite / sen ratkaisu                                                                      |
|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
|Säilytetäänkö nykyinen ulkoasu?      |**Kyllä, brändi ja päävärit säilyvät.** Muokataan taittoa ja navigaatiota perusteellisesti.                                                                   |Täysi uusi design olisi näyttävä mutta hukkaisi hyväksytyn identiteetin ja toimivat komponentit.       |
|Jääkö vasen sisältöpuu?              |**Kyllä**, avattava kirja → kappale → osio → tehtävä.                                                                                                         |Pitkä lista kuormittaisi; ryhmittely, avattu vain nykyinen kappale oletuksena.                         |
|Jäävätkö kymmenen vaakavälilehteä?   |**Ei pääasialliseksi navigaatioksi**. Yläalueessa lyhyt sijaintitieto ja tarvittaessa 3–5 paikallista ankkuria, ei kilpailevaa kolmatta sisältöpuuta.         |Nopeasti tutut välilehdet voivat auttaa; nykyinen sijainti ja paikallinen ankkuri säilyvät.            |
|Tehtävät tekstin alle vai erilleen?  |Oletus **samaan sisältövirtaan**; vapaaehtoinen **Kirja + tehtävät** -tila tietokoneella.                                                                     |Split kaventaa lukijaa; aktivoidaan vain todellisen tilan salliessa.                                   |
|IPA aina näkyviin?                   |Opetettavien sanojen sanastoriveillä ja sanakorteissa **näkyy oletuksena**, voi piilottaa. Pitkiin pääteksteihin ei lisätä joka sanan alle IPA-riviä.         |Jatkuva IPA tekstissä heikentäisi luettavuutta; avataan sanakortista.                                  |
|Ääni jokaiselle saksan sanalle?      |Opetus-/teemasanastossa **pakollinen toimiva ääntämisreitti ennen julkaisua**. Yleissanakirjassa paras saatavilla oleva reitti; puutteet näkyvät rehellisesti.|Valmiita ihmistallenteita ei ole kaikille; laadukas merkitty saksan TTS varalla, ei tekaistua audiota. |
|Pelkkä Wiktionary suomennoksiin?     |**Ei.** FreeDict de–fi/fi–de peruskäännöksiin, Wiktionary morfologiaan, IPAan ja lisäpeittoon.                                                                |Wiktionaryn selitteet voivat olla englanniksi/saksaksi; niitä ei merkitä suomenkielisiksi käännöksiksi.|
|Kaikki saksan sanat kerralla?        |**Ei lupauksena.** Laaja toteutettu hakukanta, mitattu peitto, vaiheittain kasvanut lähdeversio.                                                              |Avoin sanasto ja yhdyssanat estävät täydellisyyden; näytetään mikä löytyi ja mistä.                    |
|Automaattinen puheen laadunarviointi?|**Ei** ennen todennettua luotettavuutta. Paikallinen äänitys, mallin kuuntelu, itsearviointi.                                                                 |Automaattinen palaute olisi houkutteleva mutta virheellinen arvosana haittaa oppimista.                |
|Painetun näköinen versio?            |Erillinen **Näköiskirja**-tila saman hyväksytyn sisällön rinnalla.                                                                                            |Kiinteä B5 taitto on mobiilissa huono interaktiiviseksi päätilaksi.                                    |
|Oma tekoäly?                         |**Ei** riippuvuutta AI-API:sta tai maksullisesta sanageneroinnista.                                                                                           |Luotettava sisältö- ja datamalli toimii ilman jatkuvia kustannuksia.                                   |

3. Uusi sivuarkkitehtuuri: yksi kirja, yksi johdonmukainen navigaatio

3.1 Sovelluksen pysyvä rakenne

Kirjasarja /los → LOS! 1:n etusivu → kirjan sisältöpuu ja sivut. Todellinen nykyinen osoiterakenne säilytetään ja vanhoille syvälinkeille tehdään yhteensopiva ohjaus, ei rikota suoraan avattuja URL-osoitteita. Kirjan vaihdossa identiteetti vaihtuu, mutta sama BookShell, ContentTree, Reader, MediaPlayer, DictionaryCard, ExerciseFrame, LessonView, ProgressView säilyy.

Desktop:

• Yläalue: paluu Opintopäiväkirjaan/kirjastoon, oikea LOS!-logo, LOS! 1 · SAB31, nykyisen kohteen nimi, kirjan työkalut (haku, sanakirja, muistiinpanot, lukuasetukset). Palkki valkoinen; 3 px punainen yläviiva tai muu V3.3:n vastaava tarkka toteutus; ei ylimääräistä koko sivun korkeutta vievää navipalkkia.
• Vasen sivupuu: suunnittelu-arvo 284 px, koko työalueen korkuinen oma vieritys. Ei kappaleen sisällön vierityksen mukana karkaavaa sivupuuta.
• Keskialue: V3.3:n mukainen rauhallinen valkoinen, enintään noin 846 px lukusivu, typografisesti rajattu enintään noin 68 merkkiin luettavassa päätekstissä. Keskellä oleva sivu ei saa näyttää tyhjältä, jos sisältöä on vähän; otsikkokoot, marginaalit ja sisältövirta säädetään oppikirjamaisiksi.
• Rinnakkaistila: yksi lukija + noin 360–410 px tehtäväpaneeli käyttökelpoisella leveällä työalueella. Alle noin 1050 px käytettävää sisäleveyttä tehtävä on overlay/paneeli eikä lukijaa kutisteta. Käytä ResizeObserver-tietoa todellisesta kirja-alueesta, älä luota vain koko selainikkunan leveyteen.

Mobiili:

• Sama sisältö yhteen palstaan, ei pienennettyä desktopia. 44–48 px tavoitellut kosketuskohteet, tekstikoko vähintään 16 px, selvät napit ja toimivat ääntämiset.
• Sisältöpuu avataan rajatulla sivuvalikolla; sanakortti alalehtenä, jonka voi sulkea pyyhkäisemällä tai Sulje-painikkeesta.
• Teksti, ääni ja tehtävä pysyvät samassa oppimisvirrassa. Split-tila ei kutista lukupalstaa mobiilissa.
• Näppäimistö ja alalehti eivät peitä vastauskenttää; ohjelmallinen focus palautuu sanaan tai tehtävään, josta paneeli avattiin.

3.2 Vasemman sisältöpuun tarkka päätös

Pakolliset hierarkiatasot:

LOS! 1 · Tutustu ja ihastu saksan kieleen
  Etusivu
  Näin käytät kirjaa
  Sisällysluettelo
  01 Hallo!                    [avaa/sulje]
     Aloita
     Teksti A: Franz ja Jörg
       Kuuntele ja seuraa
       1a Etsi tervehdykset
       1b Ymmärrä keskustelu
     Sanasto: tervehdykset
     Kielioppi: ääntäminen
       2a Kuuntele ja erota
     Teksti B: tervehdykset
     Harjoittele
       ... yksilöidyt tehtävät ...
     Käytä saksaa
     Kulttuuri
     Kappaletesti
  02 Ich heiße ...
  ... C10
  Kertaus I / Välikoe / Kertaus II / Loppukoe
  Opetuspolku / Osaaminen / Omat sanani
  Sanakirja / Kielioppihakemisto / Lähteet

Rakenne on esimerkki navigaation hierarkiasta; sen tehtäväotsikot saadaan oikeasta versionoidusta sisältödatasta, ei kovakoodatusta näytteen luettelosta. Jos tehtävää ei oikeasti ole, sitä ei näytetä toimivana sivuna. Jokaisella rivillä on pysyvä contentId/exerciseId, oma URL/ankkuri, kirjanmerkki ja todellinen lukemis-/suoritusstatus. Oletusarvona vain nykyinen kappale avattuna, käyttäjän avausvalinnat säilytetään.

Puun yläosassa on haku tämän kirjan sisällä, nykyisen kappaleen avaus/sulku, sekä erillinen Avaa kaikki / Sulje kaikki pitkässä luettelossa. Ruudunlukijalle käytetään oikeita button-elementtejä ja aria-expanded-tiloja. Ei tehtävästatusta, jota ei ole oikeasti tallennettu.

3.3 Sivukohtaiset toteutuspäätökset

|Näkymä           |Lopullinen sisältö ja toiminta                                                                                                                                                                 |Ei saa tehdä                                                                   |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
|Kirjasarja       |8 kansikorttia, SAB-koodi ja tila (`Aloita`, `Kesken`, `Tulossa`).                                                                                                                             |Esittää keskeneräisiä kirjoja valmiina.                                        |
|Kirjan etusivu   |Nykyinen hyväksytty 16:9-banneri kokonaisena vasemmalla, kansi ja nimi oikealla sekä **Aloita nollasta/Jatka** todelliseen oppituntiin; tämän jälkeen tavoitteet, edistyminen, kappalelistat.  |Cropata kasvoja tai peittää bannerin oma teksti uudella overlaylla.            |
|Sisällysluettelo |Kappaleiden nimet, suomenkieliset tavoitteet, suorat osiolinkit, oikeat suoritustilat; työpöydän vasen puu säilyy.                                                                             |Kaksi kilpailevaa erilaista sisältöpuuta.                                      |
|Kappaleen aloitus|Näyttävä mutta tiivis numero+otsikko, 2–4 havaittavaa taitotavoitetta, johdantokuva jos pedagogisesti perusteltu, aloituskuuntelu, keskeiset sisällöt ja jatkuva etenemislinkki.               |250 px tyhjää ilmaa ja `lähdeaineistot avataan myöhemmin` pääopetuksen tilalla.|
|Teksti A         |Koko oikeudellisesti hyväksytty alkuperäisteksti, puhujat, lähdetiedot, säilyvät korostukset, napsautettavat sanakortit, mahdollinen lähteen kanssa vastaava äänite; tekstiin sidotut tehtävät.|Alkuperäisen tekstin korvaava ulkoinen linkki.                                 |
|Ymmärrä          |Tekstiin tai kuunteluun todella perustuvat tehtävät; avaa alkuperäinen aineisto; selitetyt vastaukset.                                                                                         |Irrallisia kysymyksiä, joita ei voi päätellä tekstistä.                        |
|Sanasto          |Ydinsanat / Tunnistettavat / Tukisanat; saksan sana, suomi, IPA, ääni, suku/monikko/taivutus tarvittaessa, opetuspaikka, omaan sanastoon, piilota käännös.                                     |Sama raakasanakirjan virheellinen merkitys kaikkialla.                         |
|Kielioppi        |Kunnollinen suomenkielinen selitys, havainnolliset taulukot, mallilauseet, IPA/äänet erityisesti fonetiikassa, tyypillinen virhe, heti harjoitukset.                                           |5-rivistä muistisääntöä kokonaisen oppitunnin korvikkeena.                     |
|Teksti B / media |Toinen luvallinen aito lähde, videon/äänen lähde, toimiva soitin ja vararatkaisu sekä soveltuvat ymmärtämistehtävät.                                                                           |Väitettä synkronoinnista ilman aikaleimoja.                                    |
|Harjoittele      |Ryhmitellyt todelliset tehtävät: sanasto, ymmärtäminen, kielioppi, kuuntelu, puhe, kirjoitus. Sama `exerciseId` myös opetuspolussa.                                                            |Tehtävän päälle tehty uusi kopiotila.                                          |
|Käytä saksaa     |Ohjattu aidontuntuinen viestintätilanne, kirjoittaminen/äänittäminen ja itsearviointi.                                                                                                         |Tekoälyn keksimää puhearvosanaa.                                               |
|Kulttuuri        |Tosiasiallisesti tarkistetut lyhyet tekstit, alkuperäiset valokuvat/kartat, lähde, tehtävä.                                                                                                    |Koristeellisia satunnaiskuvia.                                                 |
|Kappaletesti     |Vihjeetön arviointi, tietuekohtainen suoritus, palaute vasta palauttamisen jälkeen, jatkokertaus.                                                                                              |Oppimista mittaava prosentti pelkästä sivun klikkauksesta.                     |
|Kirjan sanakirja |Kokonainen ladattu de↔fi-sanakanta, haku, lemma, lähteet ja rajaukset, IPA/audio.                                                                                                              |Kappalesanoista koostuvaa listaa nimellä `kaikki saksan sanat`.                |
|Osaaminen        |Näytetyt tehtävät, taitokohtainen näyttö, kertauksen tila, keskeneräiset.                                                                                                                      |Yksi harhaanjohtava `osaat saksaa 83 %` -mittari.                              |
|Näköiskirja      |Valmiista aineistosta B5-sivutettu erillinen näyttö ja PDF-polku alkuperäisen näköiskirjamasterplanin mukaan.                                                                                  |Kiinteä B5 sivu interaktiivisen puhelinlukijan oletukseksi.                    |

3.4 Katselutilojen eksplisiittiset käyttäytymissäännöt

• Opiskele oletuksena: sanakortit, korostukset ja harjoitukset käytettävissä.
• Lue: rauhallinen teksti, sanojen selitykset tarvittaessa, ei pakotettuja harjoituskortteja.
• Kirja + tehtävät: lähdeteksti ja yhden exerciseId:n tehtävä rinnakkain, molemmissa oma vieritys, ei kahta erillistä vastaustietuetta.
• Opetuspolku: noin 30 minuutin itsenäinen tunti viittaa samoihin sisältölohkoihin ja tehtäviin.
• Koe: erilliset vihjeiden, sanakirjan, litteraatin ja mallivastausten paljastusta estävät säännöt. Pelkkä piilotettu CSS ei ole tietoturva.
• Näköiskirja: saman sisällön tarkistettu kiinteä painetun näköinen julkaisu, mutta ei sama kuin interaktiivinen lukutila.

4. Koko sarjan ääntäminen, IPA ja audiomedia

4.1 Pakollinen ääntämisstandardi

LUKITTU: Ääntäminen on ensimmäisestä kappaleesta alkaen yksi LOS!:n ydintoiminnoista, ei lopuksi lisättävä koriste. Yhteinen Pronunciation-tietorakenne on käytössä jokaisessa LOS! 1–8 -kirjassa, kaikissa kappale-, teema-, yleis- ja kertaussanastoissa, sanakirjakorteissa sekä fonetiikan opetuksessa.

• Perusvariantti: saksan yleiskieli (de-DE). Poikkeavat Itävallan, Sveitsin tai alueelliset variantit merkitään erikseen; niitä ei hiljaisesti sekoiteta samaan IPA-kenttään.
• IPA on oikeaa IPA:a, ei sekoitus suomalaista kirjoitusasua, englanninkielistä sound-out-tekstiä ja fonetiikkaa. Kirjainnimet ja sanan ääntäminen ovat eri asioita.
• Sanalla voi olla monta hyväksyttyä IPA-varianttia, jokainen varianteista on lähteistetty ja tarvittaessa merkitty alueen tai käyttötilanteen mukaan.
• Ei päätellä automaattisesti, että yksi ääntämisasu kelpaa kaikkiin taivutusmuotoihin. Perusmuoto ja muodot linkitetään; tarvittaessa oma fonologinen tietue.
• IPA ei korvaa ääntä. Opetuskohteissa kuuntelu + IPA + ymmärrettävä suomenkielinen ohje ovat kolme erillistä tuen muotoa.
• Suomenkielisessä alkeisopetuksessa opastetaan IPA-merkkien käyttöön lempeästi, mutta IPA:n osaaminen ei ole oppimistavoite itsessään eikä sitä vaadita kokeen vastauksissa.

4.2 Äänilähteiden ensisijaisuusjärjestys

1. Tarkasti samaa sanaa/fraasia vastaava oikean ihmisen laadukas, luvallinen ja toimiva tallenne, esimerkiksi tarkistetusta Wikimedia Commons -aineistosta tai hyväksytyltä oppimateriaalijulkaisijalta.
2. Laadukas saksankielinen puhesynteesi, selvästi tunnistettu Synteettinen ääni -merkinnällä. Käytetään selaimen speechSynthesis-rajapintaa, jos oikea saksankielinen ääni on laitteella saatavilla ja toistokoe läpäisee. de-kieltä pelkkään englanninkieliseen ääneen asettaminen ei ole hyväksytty fallback.
3. Jos sopivaa ääntä ei ole, näytä informatiivinen Äänite ei ole saatavilla tällä laitteella -tila ja mahdollinen oikeudellisesti sallittu muu äänilähde. Älä näytä koristeellista rikkinäistä painiketta.

Ei tehdä: ei ulkoisen maksullisen AI/TTS-palvelun pakollista rajapintaa, ei salaa selaimessa käynnistyvää automaattitoistoa, ei käyttäjän laitteen äänten olemassaolon lupaamista, ei tekstin lausumista suomalaisella äänellä saksankielisenä, ei keinotekoista todistetta ihmistallenteesta.

Käyttöliittymä näyttää tarvittaessa Ihmisen lausuma / Synteettinen / Ääni puuttuu. Jos oikea audiotiedosto on olemassa mutta hidas/yhteys ei toimi, näytetään virhe ja varatoiminto ilman että aiemmin ollut opetus katoaa. Hitaus perustuu oikeaan toistimeen: käytä playbackRatea vain, kun se säilyttää ymmärrettävyyden; oletus 1×, vaihtoehto alkeisissa 0,75×. Browser TTS:n nopeus on ääni- ja laitekohtainen; sitä ei väitetä kuulostavan täsmälleen samalta kaikilla laitteilla.

4.3 Kappaletekstien ja foneettisen opetuksen eri äänitarpeet

• Sana: äänitetään/tulostetaan itsenäinen sana. Myös fraasin oma äänite, koska yksittäisten sanojen yhdistäminen ei välttämättä vastaa luonnollista puhetta.
• Lause: tarvittaessa kokonaisen esimerkkilauseen toisto, etenkin sanajärjestys ja painotus.
• Dialogi: alkuperäisen puheaineiston kokonainen soitin, jos oikeudet ja tekninen toiminta mahdollistavat. Puhujako näkyy; tekstin automaattista korostumista äänen mukana ei esitetä ennen tarkkaa aika-ankkurointia.
• Äänteet ja aakkoset: erillinen fonetiikan miniopetus, jossa toistetaan oikea sana ja erotetaan toisistaan kirjain, ääntämismerkintä ja äänne.
• Minimiparit/kuullun ymmärtäminen: oikeiden äänien erotteleminen esimerkiksi kuulonvaraisessa monivalinnassa ja harjoituksessa, ei vain kirjoitettujen IPA-symbolien arvaaminen.

LOS! 1:n alkeisopetuksessa tehdään seuraavat mallit: w/v, z, ei/ie, sch, s/ß, ä, ö, ü, sanan alku- ja loppupainotus sekä ich- ja ach-tyyppiset ch-äänteet. Jokaisesta mallista tarvitaan ääni, IPA, suomenkielinen täsmällinen suun/kielen ohje ja kuulonvarainen erotustehtävä. Kaikkia äänteitä ei pidä pakottaa opittavaksi ensimmäisellä sivulla; eteneminen seuraa LOS! 1:n kirjakohtaista pedagogista järjestystä.

4.4 Ääntämistietojen datamalli ja laatutaso

type Pronunciation = {
  id: string;
  language: "de";
  region: "de-DE" | "de-AT" | "de-CH" | "unspecified";
  ipa: string | null;             // tarkistettu tai lähteistetty; ei satunnaista arvausta
  ipaSourceId?: string;
  ipaReviewStatus: "reviewed" | "source-verified" | "candidate" | "unavailable";
  targetType: "lemma" | "form" | "phrase" | "sentence";
  targetId: string;
  audioAssets: Array<{
    id: string;
    sourceId: string;
    speakerType: "human" | "synthetic";
    url?: string;                 // vain oikeuksiltaan ja turvallisuudeltaan hyväksytty
    voiceLocale?: string;
    licenseId?: string;
    usageStatus: "ready" | "unavailable" | "pending-review";
    reviewedAt?: string;
  }>;
};

Julkaisusääntö: LOS! 1:n pedagogisesti aktiiviset sanat/fraasit ja ääntämisen erikoissisällöt on tarkistettava oikeasti ennen niiden merkitsemistä valmiiksi. Laajan yleissanakirjan raakasanat saavat candidate-IPA:n näkyviin lähdeaineistosta ilmoitettuna, mutta vain jos lähde ja merkinnän tila näkyvät eikä arvausta esitetä koulun opetusmallina. Jos IPAn ja audion tiedot ovat ristiriidassa, jätä ristiriitainen ääni julkaisematta tai käsittele se erillisenä merkityksen/variantin tapauksena.

4.5 Puheharjoittelun päätös

Nykyinen MediaRecorder-harjoitus säilytetään. Käyttäjä painaa Äänitä, voi kuunnella mallin, kuunnella oman suorituksensa ja halutessaan tallentaa tiedoston paikallisesti. Mikrofoni pyydetään käyttöön vasta painalluksesta. Ei automaattista siirtoa palvelimelle eikä julkista äänidataa. Vertailu: selkeät tarkistuslistat kuten aloitinko tervehdyksellä, sanoinko oman nimen, kysyinkö toisen nimen. Ääntä ei arvioida prosenttina tai CEFR-tasona automaattisesti. Jos mikrofoni ei toimi, vastaava kirjoitus-/ääneenlukuharjoitus ilman äänityspakkoa.

5. Todellinen laaja saksa–suomi-sanakirja: lähteet ja toteutuspäätökset

5.1 Todennetut avoimet aineistot ja niiden todelliset rajat

A. FreeDict — virallinen lataussivu https://freedict.org/de/downloads/ ilmoittaa saksa→suomi 13 028 tietuetta ja suomi→saksa 12 102 tietuetta, versiona 2025.11.23 (tarkistus 12.11.2026). Tietueet eivät ole sama asia kuin toisistaan riippumattomien sanojen kokonaismäärä. FreeDictin lähde on TEI/XML; tietueiden oikea sisältö ja sanakirjakohtainen lisenssi on tarkistettava ladatun paketin TEI-headerista ja lisenssimetadataa sisältävästä jakelusta ennen tuontia. Ei oleteta yhdellä arvauksella, että kaikki FreeDict-aineistot ovat samaa lisenssiä.

B. Kaikki.org / Wiktionary — https://kaikki.org/dictionary/German/index.html sisältää laajan englanninkielisestä Wiktionarysta erotetun saksan tietueaineiston; sivu ilmoitti 2026 ajantasaisessa hakutuloksessa yli 350 000 erillistä sanamuotoa. Tämä on sanamuotojen määrä, ei 350 000 suomennettua perusmuotoa. Osa datasta on englanninkielisiä selitteitä, taivutuksia, omia nimiä, harvinaisia muotoja ja johdoksia. Myös saksankielisen Wiktionaryn raakadataa on saatavana (esim. https://kaikki.org/dewiktionary/rawdata.html), mutta pelkän saksankielisen Wiktionaryn täydellisen JSONL-dumpin koko voi olla satoja megatavuja pakattuna. Valitse vain saksan kielen tietueet ja tarvitut kentät.

C. Wikimedia Commons — https://commons.wikimedia.org/ sisältää saksankielisiä ääntämistallenteita. Äänitiedoston olemassaolo tai File:-sivun näkyminen ei automaattisesti hyväksy käyttöä: MediaWiki imageinfo/extmetadata ja tiedoston oma sivu toimivat lisenssin ja tekijän tarkistuslähteinä. TTS täydentää, ei korvaa luvallisen ihmistallenteen arvoa.

D. Mahdollinen lisälähde — Wikidata vain jos konkreettinen puute osoitetaan ja lisenssi sekä tunnisteet sopivat. Ei massatuoda satunnaisia verkkosanakirjoja, kaupallisten digikirjojen sanastoja tai koneella käännettyjä kokonaisia sanakirjasisältöjä ilman soveltuvaa käyttöperustetta.

5.2 Yksiselitteinen tietolähdepolitiikka

• Suomenkielinen merkitys: ensimmäiseksi tarkistettu LOS!:n kappaleen kontekstimerkitys, toiseksi FreeDictin saksan- ja suomenkieliset merkitystietueet (oikea suunta ja merkitys), kolmanneksi muut tarkistetut suomenkieliset lähteet. Jos käytettävissä on vain englanninkielinen/saksankielinen selite, sitä ei esitetä suomalaisena merkityksenä.
• Perusmuoto ja sanaluokka: etsitään FreeDict/Wiktionary-lähteistä, yhdistetään kanoniseen omaan Lexeme-tunnisteeseen. die Bank (penkki) ja die Bank (pankki) ovat erillisiä merkityksiä; saman kirjoitusasun eri sanaluokat eivät saa sulautua.
• Taivutus: vain rakenteisesti lähteistetyt Form-tietueet tai erikseen tarkistetut kielioppisäännöt. Yhdyssanojen jokaisen mahdollisen muodon automaattista täyspeittoa ei luvata.
• IPA: ensisijaisesti Wiktionarysta erotettu saksan todellinen IPA ja sen kieli-/varianttitieto; opetusydin tarkastetaan. Ei luoda IPAa englanninkielisistä likimääräisistä ääntämisohjeista.
• Äänite: läpikäyty oikean sanan äänitallenne; synteettinen de-DE fallback, jos käytettävissä. Lähde, käyttöluokka ja käyttöehto näkyvissä.
• Esimerkkilauseet: kirjan tarkistetut esimerkit ja luvallisten alkuperäistekstien rajatut katkelmat. Raakasanakirjan esimerkit vain, jos niiden oma oikeus ja suomenkielinen selitys on tarkistettu.
• Sanaston oppimisstatus: vain kurssin aktiivisille, passiivisille tai tukisanoille. Yleissanakirjaan tuotu harvinainen sana ei automaattisesti kuulu LOS! 1:n opittaviin sanoihin.

5.3 Tuontiprosessi — yksi oikea tietokantajulkaisu

1. Lataa versionoitu FreeDict de-fi ja fi-de TEI-lähdepakkauksina, tarkista SHA512/allekirjoitus siinä määrin kuin julkaisija tarjoaa, talleta tarkka URL, versio, latauspäivä, lisenssitiedot, lähdehash. Älä käytä sivun arviota tietueiden todellisena importtituloksena.
2. Lataa Wiktionaryn/Kaikki.orgin saksankielinen JSONL-raakadata pakattuna build-/importtiympäristöön, ei opiskelijan selaimeen. Talteen datasetin dump-päivä, extractor-versio ja sisältöhash.
3. Parsinta turvallisesti ja suoratoistona, ei koko gigatavun JSONin lataamista muistiin. TEI/XML parseriin ulkoisten entiteettien esto, JSONL-skeemavalidointi ja rivikohtainen virhelista.
4. Suodata lang_code=de / saksan tietueet, erota lemma/inflektoitu muoto, sanaluokka, homonyymit ja merkitys. Älä käsittele pelkkää word-merkkijonoa uniikkina avaimena.
5. Normalisoi Unicode NFC, hallitse ß ja ss ja umlaut-haku erillisillä hakuavaimilla, säilytä näytettävä oikea kirjoitusasu. Ei automaattista korvausta Mädchen → Madchen varsinaisessa sanassa.
6. Luo Lexeme, Sense, Translation, Form, Pronunciation, AudioAsset, SourceRecord -tietueet. Tallenna jokaisen johdetun kentän ja käännöksen provenienssi, lisenssi ja mahdollinen version ketju.
7. Dedublikoi lemma + kieli + sanaluokka + merkitystunniste -tasolla; saman kirjoitusasun merkitykset säilyvät erillisinä. Säilytä molempien lähteiden lähderivit, älä kirjoita lisenssimetadataa pois.
8. Tee laadun ja riskin tarkistus: harvinaiset/epäselvät merkitykset, puuttuvat suomennokset, homografit, omat nimet, tyhjät IPA-kentät, eri lähteiden ristiriidat.
9. Julkaise uusi versioitu sanakirjapaketti indeksöitynä; kirjoitetaan kattavuusraportti (tuotujen rivien määrä, yksilöidyt lemmat, suomennetut merkitykset, IPA-peitto, audioreitit, virheet, poistot). Älä raportoi lähteen bruttomäärää julkaistujen suomenkielisten sanojen määränä.
10. Testaa hakutoiminnot ja palautuspolku ennen kirjaan kytkemistä.

5.4 Tietokantapäätös ja hakumoottori

TOTEUTUSOLETUS: nykyisen Opintopäiväkirjan taustajärjestelmässä käytetään olemassa olevaa Postgres/Supabase-kantaa, jos sen nykyinen tietoturva-, yhteys- ja kapasiteettimalli vahvistuu. Tuodaan sanakirjan julkinen/lisenssiehtojen mukainen vain-luku-data erillisiin los_dictionary_* -tauluihin tai vastaavaan omaan skeemaan; rajatut hakukyselyt toteutetaan olemassa olevalla serverillä/API:lla, ei suoraan massiivisella rajattomalla SQL-haulla selaimesta. Ei luoda erillistä maksullista palvelua. Jos Supabase ei sovellu tekijänoikeuden jakeluehtoihin tai kapasiteettiin, käytetään samaa skeemaa vastaavaa palvelimen SQLite-/read-only-indeksitoteutusta. Vaihtoehto valitaan mitatun tuonti- ja hakutestin jälkeen, mutta molempia ei rakenneta pysyviksi rinnakkaisiksi moottoreiksi.

Hakujärjestys: tarkka sana/muoto → sanan lemma → suomenkielinen merkitys → kieliasua huomioiva etuliite → rajattu fuzzy-haku. Käytä Postgres-indeksien tarkoituksenmukaista yhdistelmää (B-tree normalisoidulle muodolle, trigram/GIN tarvittaessa hakunäytteiden perusteella). Palauta korkeintaan esimerkiksi 20 ensivaiheen osumaa ja sivuta loput. Haku tukee de→fi sekä fi→de, kirjainsäilytys ä ö ü ß, monikoita ja yleisiä verbimuotoja. Fuzzy-haku ei saa ohittaa tarkkaa tulosta tai esittää virheellistä merkitystä varmana.

Ei selaimeen: kokonainen FreeDict+Wiktionary-dumppi, API-avaimia, raakalisenssien henkilökohtaisia henkilötietoja tai kaiken sanaston massiivista hakulistaa. Selaimeen voidaan välimuistittaa rajattu oppimissanasto ja useimmin käytettyjen sanojen hakutulokset offline-tilassa, jos lisenssi sallii. Pitkät lataukset, kaatuminen, hitaat haut ja suuret siirtokustannukset ovat julkaisuesteitä.

5.5 Yksi yhtenäinen sanakortti kaikkialle

DictionaryEntryCard, joka avautuu sanan tai ilmauksen kohdalta:

1. Lemma ja saksan oikea kirjoitusasu; sanaluokka; substantiivin artikkeli/suku ja monikko, verbien oleelliset muodot, tarvittaessa fraasi.
2. Tarkistettu suomenkielinen kontekstimerkitys ensin, mahdolliset muut merkitykset erillään.
3. IPA näkyvissä lähdevariantteineen; Kuuntele-painike todelliseen ihmisääneen tai merkittyyn puhesynteesiin.
4. Alkuperäisestä kappaleesta peräisin oleva esimerkkilause ja tarvittaessa suomennos.
5. Lisää omiin sanoihin, Harjoittele, Näytä kaikki merkitykset, Lähde- ja lisenssitiedot.
6. Jos käännös tai ääni puuttuu: ei virheellistä täytesisältöä, vaan erotettu Tietoa ei saatavilla / Vain lähteen englanninkielinen selite.

Desktop: avataan napsautetun sanan lähelle popoverina, mutta pysyy turvallisesti ruudun sisällä; tarpeeksi pitkä sisältö voidaan avata sivupaneelissa. Mobiili: alalehti, jossa voi vierittää sisältöä ilman että alkuperäinen lukupaikka katoaa. Tietyssä virallisessa koetilassa sanakirjakortti on pois käytöstä ja tämä on opiskelijalle selvästi ilmaistu. Normaali tekstin lukeminen ei avaa modalien ketjua.

5.6 Sanakirjan mitattavat testit

• Vahvista importin todelliset tuotut tietuemäärät, deduplikointitulokset, source-ID:t ja lisenssikartta. Älä aseta satunnaista tavoitetta 500 000 suomennetusta sanasta.
• Testikorpus: 100 yleistä ja 100 satunnaisesti otettua saksan oppimistasolle sopivaa sanaa, 50 taivutettua muotoa, 25 suomenkielistä hakua, 25 homografia, 25 erikoismerkki-/yhdysmerkkitapausta. Tyypit merkitään ja niiden osumat tarkistetaan käsin.
• Pakollinen kurssipeitto: kaikki LOS! 1:n julkaistut aktiiviset sanat/fraasit löytyvät, niillä on oikea kontekstimerkitys, IPA ja toimiva äänireitti tai dokumentoitu este. Jos yksikin aktiivinen opetus-ääni puuttuu eikä hyvää TTS-korvaajaa ole testattu, kyseistä äänitehtävää ei julkaista valmiina.
• Tuloksen lähde ja käyttötarkoitus näkyvät. Ei satunnaisia yhdisteltyjä merkityksiä tai harhaanjohtavia sanasukujen arvauksia.
• Tyhjä haku, offline-tila, virheelliset merkit, hyvin pitkä haku ja suuri osumamäärä eivät kaada lukijaa.

6. Varsinaisen opetussisällön uudistus: LOS! 1 malliksi koko sarjalle

6.1 Pedagoginen standardi, ei vain sivu-uudistus

Oppija aloittaa käytännössä nollasta. Saksan kieltä ei voi opettaa luotettavasti vain näyttämällä valmiin keskustelun, antamalla viisi monivalintaa ja jättämällä keskeinen rakenne seuraavaan lukuun. Jokaisessa 10 kappaleessa noudatetaan oppimisen sykliä:

1. Herätä tarve: kerro, missä arkisessa tilanteessa uutta asiaa käytetään. Näytä yksi helppo tavoite.
2. Esittele sanonta äänenä ja tekstinä: kuuntele ensin, tarvittaessa hidasta, seuraa kirjoitusasua, avaa sana/IPA.
3. Selitä ymmärrettävästi suomeksi: uusi äänne, fraasi tai kielioppiasia, 2–4 esimerkkiä.
4. Lue/kuuntele autenttinen pääteksti: kokonainen, ihmisen kirjoittama julkaistu lähde, oma lähde- ja lisenssitieto.
5. Tunnista: tehtäviä, joissa löydetään tekstistä merkitykset, ilmaukset ja rakenteet.
6. Harjoittele ohjatusti: sanasto ja kielioppi asteittain, palaute kertoo oikean perusteen.
7. Tuota itsenäisesti: käytä uutta lausetta itse tai reagoi tilanteeseen ilman näkyvää mallia.
8. Kertaa viiveellä: tärkeät sanat ja rakenteet palaavat myöhemmässä kappaleessa ja henkilökohtaisessa kertauksessa.
9. Totea osaaminen: kappaletesti arvioi nimenomaan opetettua sisältöä, ei pelkkää puuttuvien sanojen arvaamista.

Opetuspolun ja kirjan suhde: kirjan sisältöjä voi käyttää vapaassa järjestyksessä; opetuspolun noin 30 minuutin oppitunnit ovat viitteitä saman datan sisältöihin. Opetuspolun suoritus ei saa kadota tai kahdentua, jos sama tehtävä tehtiin ensin kirjan puolella.

6.2 LOS! 1:n pysyvä kappalerakenne

Nämä ovat kirjan nykyisten pääosioiden pedagogiset nimet; kaikkia ei tarvitse näyttää jatkuvana 10 välilehden rivinä:

1. Aloita — mitä opit, tilanteeseen johdattava kuva/lyhyt ääni, minikertaus.
2. Text A / Lue ja kuuntele — oikea lähde, äänitys tarvittaessa, sanakortti, korostukset.
3. Ymmärrä — lähdesidonnaiset ymmärtämiskysymykset ja korostus.
4. Sanasto — noin 15–20 uuden aktiivisen sanan/ilmauksen suunnittelutaso, myös tunnistettavat/tukisanat; IPA+audio.
5. Kielioppi ja ääntäminen — yksi pääasia, useita oikeita esimerkkejä ja ohjatut harjoitukset.
6. Text B / Kuuntele tai katso — toinen aito aineisto, uusi tilanne ja siihen sidotut tehtävät.
7. Harjoittele — monipuoliset 16 yhteistä tehtävätyyppiä tarpeen mukaan.
8. Käytä saksaa — itsenäinen kirjoitettava/puhuttava viestintätilanne.
9. Kulttuuri — autenttinen tieto, kuva, video tai kartta sekä tarkistettu oppimistehtävä.
10. Kappaletesti — vihjeetön osaamisnäyttö, palaute, henkilökohtainen kertaus.

Opetuskohde voi sijoittua tarpeen mukaan jo ennen Text A:ta; esimerkiksi ääntämisen ensimmäinen oppitunti ei saa edellyttää jo opittuja sanoja. Rakenne on sisältövaatimus, ei vaatimus täyttää jokaiseen osioon keinotekoinen samankokoinen kortti.

6.3 Kappale 01: koko ketjun hyväksymispilotti

Tavoite: ensimmäinen opiskelija, joka osaa ennestään vain ich komme ja ich liebe dich, oppii kuulonvaraisesti tunnistamaan ja tilanteen mukaan käyttämään tavallisia saksankielisiä tervehdyksiä ja hyvästelyjä sekä kuulee alkeisääntämisen eroja. Muu C01:n dialogissa esiintyvä kieli annetaan tarvittaessa tukisanana; C02, C06 ja muut myöhemmät kappaleet syventävät nimeä ja ikää koskevan kieliopin.

C01:n hyväksyttävät sisällöt:

• Lyhyt oikean elämän kohtaaminen ja selkeä tavoite, ei pitkiä tavoitteettomia yleisotsikoita.
• M-COM-01: Franzin ja Jörgin lähteestä saatava 8 repliikin dialogi GesprächVorstellung.ogg ja sen lähteen kanssa vastaava aito ihmisäänite, jos todellinen laitetesti onnistuu; teksti näkyy kokonaisena LOS!:n lukijassa eikä ulkoisella linkkisivulla.
• Erillinen M-COM-03: tervehdysäänitteet Text B:ssä tai fonetiikkaharjoituksessa, jos alkuperäiset lisenssi- ja toistokriteerit täyttyvät. Ei väitetä kahden natiivin puheeksi lähdettä, jota alkuperäinen lähdekartta ei sellaiseksi kuvaa.
• Yksi opetuksellinen Ääntäminen-osio, joka sisältää oikean IPA-notaation ja toistettavat w, z, sch, ei/ie ja olennaiset ääntämisen alkeet opetusjärjestystä paisuttamatta. Muiden äänteiden syventäminen myöhemmissä kappaleissa.
• Tarkistettu kappalesanasto: aktiiviset tervehdys-/hyvästelyilmaukset, kontekstit, sanaluokat, IPA ja kuunneltava malli; nimet/iät tukimuotoina. Jokaisen sanan tarkistettu lähde.
• Ääni + teksti + Kuuntele uudestaan ilman automaattista käynnistystä; kuuntelun jälkeinen merkitystehtävä ja tekstissä suoritettava korostustehtävä.
• Tehtävät alkavat helposta tunnistamisesta ja päättyvät tilanteessa käytettävään omaan tervehdykseen sekä tarvittaessa omaan äänitykseen.
• Kappaletesti, jossa ei ole C06:n ikätaivutuksen arviointia jo C01:ssä. Selitetty palaute, oma kertaus.
• Oikeasti tallentuva eteneminen/merkkaukset/luonnokset, paluu samalle sivulle, toimivuus puhelimella ja työpöydällä.

C01 ei ole valmis, jos IPA on pelkkä käsin syötetty näyttöteksti ilman sanakirjayhteyttä, audio on rikkinäinen, opittavaksi vaaditaan opettamaton kielioppi, korostukset hukkuvat tai tehtävien palautteet paljastavat ratkaisun ennen vastausta.

6.4 C02–C10:n sisällöllinen ohjelma ja lähdeportit

Vanhassa lähdesuunnitelmassa C06:n, C08:n ja C10:n pääaineistot olivat osin avoimia. Tarkistetussa uudemmassa koodissa on nyt muun muassa LosC06AgeReview, LosOpenSourcePages, los1OpenDialogues.ts ja Harald-haastatteluun viittaavia sisältöjä. Siksi nämä eivät ole enää automaattisesti ‘teksti puuttuu’ -tapauksia. Kunkin lähteen oikeus, kielentarkistus, toisto ja julkaisu on arvioitava nykyisestä sourceRegistry.ts-lähdekortista, ei vanhan tekstisuunnitelman yhdestä rivistä.

|Kappale                            |Taitosisältö, jota ei muuteta                      |Uudistuksessa lisätään / varmennetaan                                                                          |
|-----------------------------------|---------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
|**C01 Hallo!**                     |Tervehdykset, alustava ääntäminen                  |Täydellinen IPA+äänipilotti, uudistettu lukija, suorat harjoitukset, sisältöpuu.                               |
|**C02 Ich heiße …**                |Oma nimi, esittäytyminen, `ich`/`du`, `heißen`     |Nimen, verbimuotojen ja esimerkkilauseiden kuuntelu/IPA; yksilölliset harjoitukset.                            |
|**C03 Woher kommst du?**           |Alkuperä, maat ja kotipaikat                       |Maannimien ääntämiset, `kommen`-muodot; tarkista uuden lähteen ja siihen liittyvien medialähteiden tila.       |
|**C04 Du oder Sie?**               |Sinuttelu ja teitittely                            |Kulttuurinen vertailu, tilanteiden puheääni, `du`/`Sie`-rakenteiden ääntämis- ja kuuntelutehtävät.             |
|**C05 Wie geht’s?**                |Voinnin kysyminen ja vastaaminen                   |Oikeat puhutut fraasit, painotus/intonointi, kuuntelu ja oma dialogi.                                          |
|**C06 Wie alt bist du?**           |Numerot ja ikä                                     |Numerosarja- ja saneluäänet, oikea tapa sanoa ikä, tarkista nykyisten useiden tekstiaineistojen julkaisuportit.|
|**C07 Wie schreibt man das?**      |Aakkoset ja tavaaminen                             |Aakkosten nimet erikseen IPA:sta, kirjainsanelut, `ä/ö/ü/ß`-erot, nimien tavaaminen.                           |
|**C08 Noch einmal, bitte!**        |Toistopyynnöt ja luokkahuoneen selviytymisilmaukset|Pyyntöjen ääni eri intonaatioilla, opetukseen sopiva lähde, laitetesti.                                        |
|**C09 Am Montag um drei.**         |Viikonpäivät ja ajankohta                          |Viikonpäivien aito ääni, kuuntelu ja viikkokalenteri, ajanilmausten rajattu vaikeustaso.                       |
|**C10 Schön, dich kennenzulernen!**|Kaiken opitun yhdistäminen                         |Kokoava autenttinen vuorovaikutus, itsenäinen puhe-/kirjoitussuoritus, media- ja kieli-QA.                     |

Lähteiden julkaisuputki: candidate → identified → rights-verified → language-reviewed → integrated → device-tested → published; lähteet eivät saa ohittaa sourcePublicationIssues-tarkistuksia. Jos alkuperäinen lähde ei ole sallittu, valitaan toinen oikea, ihmisen laatima, luvallinen julkaistu alkeisaineisto samasta oppimistavoitteesta. Uusi lähde saa uuden sourceId:n ja manifestiversion. Tekstiä ei generoida tekoälyllä ‘aidoksi’ ja teksti-/äänilähteen erillisiä lisenssejä ei yhdistetä arvauksella.

6.5 Kielioppisisällön uudistettu toimituksellinen sapluuna

Jokainen kielioppisivu sisältää suoraan luettavan opetuksen, ei pelkkää muistisääntöä:

1. Mitä opit ja mihin tarvitset sitä? Lyhyt arkinen esimerkki ja selitys suomeksi.
2. 2–4 kokonaisen saksankielisen mallilauseen sarja, käännökset, lauseiden kuuntelu ja tarvittaessa kohdemuodon IPA.
3. Varsinainen sääntö: selkeä, perusteellinen suomalaiselle oppijalle suunnattu selitys, joka ei jätä perusteluja arvattaviksi.
4. Taulukko tai kaavio: säännön tärkeimmät muodot. Jos kyse on ääntämisestä, ääni on osa esimerkkiä eikä värillinen taulukko riitä.
5. Huomaa / Yleinen virhe: tarkka vastaesimerkki ja selitys, miksi muoto muuttuu.
6. Yksi helppo ja yksi soveltava tehtävä suoraan opetuksen jälkeen. Vastaus tallennetaan samaan tehtävämoottoriin kuin muualla.
7. Kertaa aiempaa: 1–2 muistamisesta palauttavaa tehtävää, jos osaamistavoite on jo aiemmin opetettu.
8. Jatka / Lisäharjoitukset / Kielioppihakemisto. Ei lomakkeiden taakse piilotettua opetuksen ydintä.

Esimerkki heißen-verbistä: näytä ich heiße, du heißt ja mallilauseen tilanne, ero Ich bin ... ja Ich heiße ..., ß:n ääntämiseen liittyvä opetus, äänitteet, virhe-esimerkki ja pieni oma esittäytyminen. Älä silti opeta koko pitkää verbitaulukkoa, jos kirjakohtainen tavoite on tässä vaiheessa vain kaksi persoonamuotoa.

6.6 Sanaston tarkoituksellinen rajaus

Kurssisanasto ei ole sama kuin yleissanakirja. LOS! 1:n aktiivisen sanaston tavoite pysyy vanhan kirjakohtaisen suunnitelman mukaisena 160–190 yksilöityä opetettavaa sanaa tai valmista ilmausta, mutta määrä deduplikoidaan lemman ja fraasin perusteella, ei tekstirivien perusteella. Fraasi voi olla opittava kokonaisuus, vaikka sen sanat olisivat jo erikseen sanakirjassa. Sen status on active, recognition tai support; aktiivista opetusstatusta ei anneta kaikille dialogissa esiintyville muodoille.

Jokainen kurssisanan tietue käy läpi: saksan oikeinkirjoitus, sanaluokka, suku/monikko/verbimuoto, oikea suomennos tässä kontekstissa, IPA, toimiva audio/fallback, yksi mielekäs esimerkki ja tarkistuksen kirjaus. Kappalesanastossa voi kytkeä Piilota suomennokset, Kuuntele kaikki (vain käyttäjän käynnistyksestä), Lisää omiin sanoihin ja Kertaa.

7. Yhteinen tehtävämoottori ja opetuksen arviointi

7.1 Pidetään 16 ensimmäisen version tehtävätyyppiä

Koko sarjan ideapankin 90 tehtävätyyppiä ei tarkoita, että tähän uudistukseen toteutetaan 90 erilaista UI:ta. Käytetään jo sovittuja 16 tärkeintä yhteiseen ExerciseFrame/ExerciseRenderer-malliin:

|Numero|Tyyppi                          |Pakollinen huomio                                                                      |
|-----:|--------------------------------|---------------------------------------------------------------------------------------|
|1     |Etsi ja korosta tussilla        |Tokeni-/tekstialue-ankkurit, ei kuvapikseliä, oma korostus erillään tehtävästä.        |
|2     |Monivalinta                     |Yksi tai useampi vastaus vain, jos tehtävänannossa niin sanotaan.                      |
|3     |Totta/tarua                     |Tekstistä perusteltava vastaus.                                                        |
|4     |Aukkotehtävä                    |Kirjoitusasu, Umlaut, ß, hyväksytyt vaihtoehdot, virhekohtainen palaute.               |
|5     |Sanaparien yhdistäminen         |Käytettävissä myös ilman raahausta.                                                    |
|6     |Sanajärjestys                   |Näppäimistö-/napautusvaihtoehto drag-and-dropille.                                     |
|7     |Rajattu käännöstehtävä          |Hyväksyttyjen muotojen lista; vapaa kirjoittaminen ei saa perusteetonta 0/100-tuomiota.|
|8     |Tekstikohdan etsiminen          |Tarkistetun lohkon/tokeneiden valinta.                                                 |
|9     |Kuuntele ja valitse             |Todella toimiva ääni, litteraatin paljastussäännöt.                                    |
|10    |Kuuntele ja kirjoita            |Audio, tekstin normalisointisäännöt ja aikaisemmin opetettu sisältö.                   |
|11    |Videonymmärtäminen              |Sallittu toimiva embed + asianmukainen fallback.                                       |
|12    |Artikkelien lajittelu           |Saksan suku, selitys, ei kirjan aksentin sekoittamista sukuluokkaan.                   |
|13    |Taivutustaulukko                |Taivutusvaiheen rajaus ja tarkistetut muodot.                                          |
|14    |Virheen korjaaminen             |Ei saa merkitä hyväksyttyä vaihtoehtoa virheeksi.                                      |
|15    |Ohjattu kirjoittaminen          |Tallennus, mallivastaus ja selkeä itsearviointikriteeri.                               |
|16    |Ääneen toistaminen / oma äänitys|Mikrofoni opt-in; mallikuuntelu; itsearviointi, ei konearvosanaa.                      |

Aiemmin rakennettuja 147 rajatusti pisteytettävää osatehtävää, kokeita ja oppitunteja säilytetään ja testataan. Niiden määrää ei käytetä sisällön laadun todistuksena. Virheellinen tai opetustasoon sopimaton yksittäinen tehtävä korjataan, eikä sitä vain siirretä uuteen hienoon korttiin.

7.2 Tehtävän yhteinen rakenne

type Exercise = {
  id: string;
  contentVersion: string;
  bookId: string;
  chapterId?: string;
  type: ExerciseType;
  title: string;
  instructionsFi: string;
  skillIds: string[];
  sourceBlockIds: string[];
  audioIds?: string[];
  difficulty: "supported" | "independent" | "review";
  prompt: unknown;              // tarkempi tyyppikohtainen skeema
  acceptedAnswers?: unknown;     // ei koskaan paljasteta ennen koepalautusta
  feedback: unknown;             // selitys, ei vain oikein/väärin
  scoring: "deterministic" | "constrained" | "self-review";
  publicationStatus: "draft" | "reviewed" | "published";
};

Kukin type validoidaan omalla tarkemmalla skeemallaan; unknown on vain rakenteellinen tilanvaraus, ei lupa ohittaa tyyppiturvaa. Sama tehtävä voi näkyä kirjan alla, erillisessä tehtävälistassa, opetuspolussa ja rinnakkaispaneelissa, mutta sen yritys on identiteetiltään yksi. Tarvittaessa tehtävän uusi harjoitusyritys saa oman attemptId-tunnisteen.

7.3 Vastaus-/palautelogiikan normi

• Harjoituksessa: vastauskenttä suoraan tehtävän alle, Tarkista, Vihje, Yritä uudelleen, oikea selitys palautuksen jälkeen. Virhe ei muutu pysyväksi häpeämerkiksi eikä estä opiskelua.
• Koetilassa: ei vihjeitä eikä mallivastausta ennen palautusta, ei sanakirja- tai litteraattipaneelia, joka paljastaa vastauksen; arvioitava ja itsearvioitava sisältö eritellään.
• Automaattinen tarkistus: sallittu vain deterministisesti oikeassa muodossa oleville vastauksille ja ennalta tarkistetuille vaihtoehdoille. Mikä sinun nimesi on? -käännöksiin voi olla useita oikeita ilmaisuja; koneen on tunnettava ne tai näytettävä malliin perustuva arviointi.
• Kuuntelu: audio pitää olla pelattavissa ennen tehtävän aloittamista; jos ääni hajoaa kesken arvioivan kokeen, kokeen etenemistä ei vääristellä, vaan keskeytys/varatehtävä kirjataan näkyvästi.
• Tekstiin sidonta: jokainen sisältöön perustuva tehtävä viittaa todelliseen lähdetekstin sisältöversioon ja lohkotunnisteeseen, ei vain kappale 1 -nimeen.
• Palaute: vähintään mikä oli oikea ratkaisu, miksi se on oikea, mikä oli tyypillinen väärinkäsitys, miten asiaa voi harjoitella seuraavaksi. Ei näennäisiä AI-selityksiä.
• Kertaustehtävä: muistista palautus ilman näkyvää mallisuomennosta, aiemmin opetettu sisältö, sopiva viive.

7.4 Korostustussi ja opiskelijan omat merkinnät

Nykyiset tokeni-ID:t, etenkin C01:n olemassa olevat korostusankkurit, säilytetään. Uusi sanakortti ei saa rikkoa valintaa tai päinvastoin. Korostusmoodi ja sanan avaus erotetaan selkeästi; kosketusvaihtoehto mobiilissa ja näppäimistövalinta ovat pakollisia. Oma merkintä, tehtävän korostus ja opettamattoman sanan avaus ovat kolme eri tietotyyppiä. Teksti- ja sisältöversion muuttaminen vaatii ankkurimigraation; epäselviä vanhoja merkintöjä ei sidota automaattisesti väärään sanaan.

7.5 Kertaus ja kokeet

LOS! 1:n alkuperäisessä suunnitelmassa on 60 oppituntia, kaksi laajempaa kertausta, 25-osainen välikoe, 50 arvioitavaa osatehtävää sisältävä loppukoe sekä erilliset puhe-/kirjoitustuotokset. Nykykoodissa näille on jo komponentteja; uudistus auditoi ne eikä luo uutta saman nimistä koejärjestelmää. Muistamisen päivävälin aloitusoletus 1/3/7/14/30 vuorokautta, jonka etenemistä voi säätää onnistumisen mukaan, eikä sitä pidetä psykometrisenä arvosanana. Vain todella arvioidut tehtävät lasketaan pistemääriin; puheen ja avoimen kirjoittamisen itsearviointi jää erilliseksi.

8. Sanakirjan ja oppimateriaalin tietomalli sekä integraatiosopimukset

8.1 Entiteetit

Erilliset, mutta linkitetyt tietueet:

|Entiteetti                 |Tarkoitus ja avainkentät                                                                                 |
|---------------------------|---------------------------------------------------------------------------------------------------------|
|`Book`                     |kirjan ID, SAB-koodi, nimi, kansi/banneri, aksentti, julkaisuversio.                                     |
|`Chapter`                  |kirjan ja kappaleen ID, tavoitteet, järjestys, nykyiset osiot.                                           |
|`ContentBlock`             |vakaa blockId, kirja, kappale, sisältötyyppi, lähdeversio, teksti, opetus-/QA-tila.                      |
|`SourceRecord`             |URL, tekijä, lisenssi, tarkka lähdetodiste, teksti/ääni/video erotettuna, tarkistukset ja julkaisuportti.|
|`Lexeme`                   |`lexemeId`, kieli, lemma, sanaluokka, mahdollinen homonyymitunnus.                                       |
|`Sense`                    |`senseId`, `lexemeId`, merkitys, käyttöala, sävy, lähdeviitteet.                                         |
|`Translation`              |`senseId`, `language=fi`, käännösteksti, provenienssi, tarkistuksen tila.                                |
|`WordForm`                 |taivutettu kirjoitusasu, lemma-/merkitysehdokkaat, taivutustagit.                                        |
|`Pronunciation`            |tavoite (`lexeme/form/phrase`), IPA, kielivariantti, tarkistus, äänitiedostot.                           |
|`AudioAsset`               |audio-ID, tarkka lähde/media, kesto vain mitattuna, oikeus, validointi, mahdollinen aika-ankkuri.        |
|`CourseVocabulary`         |missä ensimmäisen kerran opetettu, ydinsana/tunnistettava/tukisana, kontekstimerkitys, taitotagi.        |
|`Exercise`                 |pysyvä tunniste, arviointityyppi, aineistoviite, ohje, hyväksytyt ratkaisut, versio.                     |
|`Attempt`                  |käyttäjän oikea yritys/tila, palaute, palautushetki, tehtäväversio.                                      |
|`ReaderAnnotation`         |käyttäjä, blockId, lähde-/sisältöversio, tekstialue, väri, merkintätyyppi.                               |
|`Lesson` / `LessonProgress`|60 ohjatun oppitunnin viitteet, tavoite, vaiheiden tila ja todellinen suoritus.                          |
|`ReviewState`              |käyttäjän sana-/taitokertaus, edellinen näyttö, seuraava suositus.                                       |

8.2 Tietueiden yhdistämisen kriittiset säännöt

• lemma ei ole yksilöllinen avain; sama sana voi olla monta sanaluokkaa ja merkitystä.
• Sanan näkyvä muoto, lemma ja sanakortin fraasi ovat erillisiä kenttiä.
• Suomenkielinen Translation ei ole sama kuin englanninkielinen gloss; niiden kieltä ei saa päätellä automaattisesti.
• IPA merkitsee täsmällistä sanaa tai muotoa, ei satunnaista tekstirivin yleistä ääntä.
• SourceRecord on tarkin käytetty lähdeversio; kun lähde on CC BY-SA ja toinen GPL, dataa ei yhdistetä yhdeksi lisenssiltään tekaistuksi lähteeksi. Säilytetään aineistojen oikeudellinen erotettavuus ja lisenssikohtaiset attribuutiot.
• Julkaistulla sanakirjalla ja oppikirjasisällöllä on eri versio- ja tarkistustunnisteet. Raakasanakirjan päivitys ei saa muuttaa jo hyväksytyn oppimistehtävän oikeita vastauksia.
• Pysyvien tunnisteiden mahdolliset alias-migraatiot dokumentoidaan; opiskelijan nykyiset korostukset eivät saa kadota, koska uusi sanakirja toi uuden lexemeId:n.

8.3 Sanaa koskettavan lukijan hakualgoritmi

1. Lukija tietää blockId, token-avaimen, ympäröivän lauseen ja mahdollisen toimitetun courseSenseId:n.
2. Jos lähteessä on kontekstin tarkistettu kurssimerkitys, näytä se välittömästi ilman verkkokyselyn odottamista.
3. Muussa tapauksessa tee rajattu taivutetun muodon haku WordForm-indeksistä. Jos vaihtoehtoisia lemmoja on useita, näytä käyttäjälle vaihtoehdot selkein nimiin/sanaluokkiin.
4. Hae Lexeme/Sense/Translation oikealla kielisuunnalla, järjestä ensisijainen merkitys kontekstin mukaan vain jos konteksti on toimitettu tai päätelmä luotettavasti todennettu.
5. Lisää IPA/audio lähde-ID:n perusteella; audio ei saa käynnistyä sanan klikkauksesta ilman käyttäjän erillistä painallusta.
6. Näytä haluttaessa koko sanakirjan merkitykset, lähde ja omiin sanoihin lisäys.
7. Jos mitään ei löydy, tarjoa Etsi samalla hakusanalla sanakirjasta, säilytä lukupaikka, älä generoi selittämätöntä suomennosta.

8.4 Sanakirjan käyttö kurssin ulkopuolella

Yleinen sanakirja toimii myös ilman avoinna olevaa LOS! 1 -kappaletta. Haku toimii kumpaankin suuntaan. Tulossivu tukee hakuehdotuksia (vain laillisesti käytettävistä indekseistä), esimerkiksi lähdetietoa, artikkelia, monikkoa, avattavaa lause-esimerkkiä ja omia sanalistoja. Sanakirjamerkinnän avaaminen ei automaattisesti ole merkki sanan oppimisesta.

9. Media, lähteet, kielentarkistus ja tekijänoikeudet

9.1 Autenttisuuden normi

LOS!:n varsinaisten tekstien on oltava oikean ihmisen kirjoittamia, alkuperäisessä lähteessä julkaistuja ja oikeudellisesti käyttökelpoisia kokonaisia valittuja tekstiyksiköitä. Aiempi masterplan sallii autenttisen alkeisoppimateriaalin, joka on nimenomaan tehty A1-tasolle. Opetuksen suomenkieliset selitykset, itse kehitetyt harjoitukset ja didaktinen jäsentely saavat olla LOS!:n omaa toimituksellista tekstiä; näitä ei pidä esittää keksittyinä ‘Wikibooksin originaaleina’.

Oppikirjassa näkyvät lähtökohtaisesti kaikki tarvittavat tekstit kokonaisuudessaan, ei linkin takana. Videot upotetaan alkuperäisen julkaisijan tarjoamalla tai ehdoin hyväksymällä tavalla. Audiotiedostoja toistetaan tai isännöidään vain tiedoston todellisen lisenssin perusteella. Jos lähde on julkaistu CC-lisenssillä, myös tekijä, lisenssi, linkki alkuperäiseen, muokkaus ja lähdeversio merkitään oikein. Tekijänoikeuden yksityiskäytön poikkeusta ei tulkita automaattiseksi oikeudeksi julkaista tai välittää kaupallista materiaalia internetsivuston kautta.

9.2 Erillinen oikeudellinen tieto jokaista mediaa varten

Jokaiselle tekstille, äänitteelle, kuvalle ja videolle on oma oikeusstatus, ei yhden koko sivuston julistamaa lupaa. Tarkista tarkka lisenssi ja versio, tekijä, attribuution näyttötapa, muokkausoikeus ja sisäisen upotuksen oikeus. SourceRecord-validaatio estää tilan published ilman todennettua oikeus- ja laatutietoa. Ilmoitetut lisenssinumerot dokumenteissa eivät korvaa alkuperäissivun tarkistusta.

Erityisesti massasanakirjassa: ennen sitä, että FreeDictin ja Wiktionaryn yksittäisten sisältöjen tekstit sulautetaan tai julkaistaan uudelleen yhteisenä tietokantana, pitää varmistaa kyseisten osien lisenssiyhteensopivuus. Turvallinen päätös: säilytä lähdedatat ja merkitykset erillisinä attribuoituina lähdekerroksina, liitä ne sovellusnäkymässä, ja julkaise vain se määrä yhdistettyä/transformoitua aineistoa, jolle oikeudellinen peruste on varmennettu. Jos yhteensopivuus jää avoimeksi, sovellus näyttää tiedot erillisinä lähteistettyinä tietueina eikä yhdistä alkuperäisiä tekstejä yhdeksi uudelleenlisensoiduksi teokseksi.

9.3 Kielentarkistus

Yhtään lähdettä tai IPAa ei merkitä native-reviewed ilman todellista saksankielisen pätevän tarkistajan vahvistusta. Pedagogiset opetusvirheet voidaan löytää myös automaattisilla ja manuaalisilla testeillä, mutta ne eivät ole automaattisesti sama kuin asiantuntijan laaduntarkistus. Jokaiselle kappaleelle tehdään lähde- ja saksan kieli-QA, suomennosten tarkistus, opitun asian tasotarkistus sekä oikeiden vastausten testaus.

Sanan äänitteen oikea vastaavuus on tarkistettava: sama sana/muoto/merkitys, puhevariantti tiedossa, ei vieraan kielen ääni tai aivan muu sana. Kuuntelu ja IPA ovat itsenäisen opiskelun ydintä, joten kieli- ja äänivirhe on erityisen vakava.

10. Tallennus, synkronointi, yksityisyys ja vanhan datan säilyttäminen

10.1 Ei vanhan opiskeludatan nollaamista

• Ennen migraatiota ota versionoitu snapshot ja JSON-varmuuskopio nykyisestä käyttäjädatasta, tehtäväsuorituksista, oppitunneista, lukupaikoista, korostuksista, muistiinpanoista ja omista sanoista.
• Tee tietomalliin lisääviä muutoksia (new columns/tables) ennen vanhojen poistamista. Vasta kun uusi luku- ja kirjoitustoiminta on todistettu, vanhoja kenttiä voidaan poistaa myöhemmin oman erillisen päätöksen kautta.
• Säilytä entiset ID:t tai luo erillinen auditoitu oldId → newId -kartta. Ota huomioon lähdetekstin version muutos ja tekstialueen merkintöjen ankkurit.
• attempt-historian jo suoritettuja vastauksia ei pisteytetä hiljaisesti uudelleen uusien hyväksyttyjen vastausten perusteella; uusi uudelleenyritys saa uuden yritystunnuksen.

10.2 Offline, paikallinen tallennus ja pilvi

Ensisijaisesti jokainen vastaus tallennetaan nopeasti laitteeseen, kun verkkoyhteys puuttuu. Palvelimelle synkronoidaan vain toimivan käyttäjä-/omistaja-autentikoinnin ja oikeasti tarkistettujen Supabase RLS -käytäntöjen avulla. Näyttö erottaa: Tallennettu tälle laitteelle, Synkronoitu, Synkronointi epäonnistui. Ei yhtä yleistä vihreää check-ikonia, joka valehtelee pilvitilanteesta.

Jos synkronointi jää teknisesti tai tietoturvan vuoksi kesken, käytetään jo olemassa olevaa käyttäjän käynnistämää suojattua pilvisynkkaa ja JSON-varmuuskopioita. Se merkitään manuaaliseksi, ei automaattiseksi. Kahden laitteen ristiriitoja ei ratkaista sokealla viimeisin voittaa -periaatteella ilman toipumismahdollisuutta; annetaan näkyvä konfliktitila, vaihtoehdot ja ladattava varmuuskopio.

10.3 Mikrofoni ja oppijan tiedot

Oma äänitys on vapaaehtoinen ja alkaa aina painalluksella. Ei mikrofonin jatkuvaa kuuntelua, puhehistorian massalähetystä tai ulkoista puheanalyysipalvelua oletuksena. Oikeiden henkilökohtaisten puhelinnumeroiden ja osoitteiden käyttöä harjoituksissa ei vaadita; fiktiiviset tiedot kelpaavat. Virheloki ei sisällä tarpeettomia vastaussisältöjä, tietokantasalaisuuksia tai tallenteita.

11. Käyttöliittymän visuaalinen toteutus ja saavutettavuus

11.1 V3.3:sta säilyvät näkyvät periaatteet

• Valittu graafinen LOS!-logo. Älä vaihda automaattiseen Takota-fontilla tekstinä ladottuun merkkiin, jos hyväksytty grafiikka on saatavissa. Fontin verkkojakeluoikeus varmistettava.
• LOS! 1:n aksentti #B7473C, vaalea pinta #FCE8E5, muu värijärjestelmä V3.3:n mukaan. Ei vahvistamattoman punaisen pääsävyn arvailua.
• Neutraali sivupohja noin #F5F4F1, valkoinen lukupinta, päätekstiväri noin #222B34. Ei värikäs kortti kaikelle tekstille.
• Kirjakohtaiset kannet ja bannerit säilyvät alkuperäisillä kuvasuhteillaan; LOS! 1:n nykyinen banneri on 1600×900 / 16:9. Ei leikkausta sen sisällä olevaan rasteroituun tekstiin.
• Siisti oppikirjamainen rytmi: pääteksti ja kielioppiselitys ovat luettavia, sivunumerot korvataan digitaalisen sivun selkeällä osiotunnuksella ja kappaleella, ei simuloida paperin kääntöanimointia.
• Tumma tila periytyy Opintopäiväkirjasta, mutta sanastojen opetusvärit eivät saa sekoittua sovelluksen onnistumis-/virheväreihin. Ääntämismerkkejä ei renderöidä pienenä liian vaaleana harmaana.

11.2 Uudet vaadittavat komponentit

|Komponentti             |Rooli                                            |Ohje                                                       |
|------------------------|-------------------------------------------------|-----------------------------------------------------------|
|`LosContentTree`        |vasen sisäkkäinen sisältö ja tehtävien syvälinkit|284 px desktop, aria-expanded, vanha URL yhteensopiva.     |
|`LosReaderHeader`       |otsikko, sijainti, 3–5 tarpeellista toimintoa    |ei kilpailevaa 10 välilehden navia.                        |
|`LosDictionaryCard`     |sanaselitys, IPA, ääni, lähde, muodot            |sama kautta koko sarjan.                                   |
|`LosPronunciationButton`|yhden sanan/fraasin/lausahduksen oikea ääni      |oikea `button`, nimeä lähde ja tila.                       |
|`LosAudioPlayer`        |koko dialogin/kuuntelun toisto                   |todellinen toisto, kesto ja virhe, ilman autoplayta.       |
|`LosPronunciationLesson`|ääntämisen kuvallinen/äänellinen opetussivu      |opetus, ihmisen ääni tai merkitty TTS, IPA, erotustehtävät.|
|`LosVocabularyTable`    |sanojen opettelu ja muistaminen                  |merkitys, suku, IPA, ääni, piilota suomennos, kertaus.     |
|`LosGrammarLesson`      |perusteellinen kielioppi                         |teksti + havainnollistus + harjoitus yhdessä.              |
|`LosExerciseFrame`      |yhteinen tehtävä ja palaute                      |yksi `exerciseId`, myös splitissä.                         |
|`LosSplitWorkspace`     |valinnainen lukija + tehtävä                     |aito tilansäilytys ja erilliset vieritykset.               |
|`LosDictionarySearch`   |de↔fi-sanakirjan laaja haku                      |rajattu backend-indeksi, yksityiskohtaiset hakutulokset.   |
|`LosSourceDetails`      |tekstin, median ja sanakirjasisällön lisenssi    |tarkka lähde ja status, ei tyhjää lupausta.                |

Komponenttinimet ovat toteutusrajapinnan suositusnimiä; käytä repoissa jo olevia vastaavia komponentteja ja refaktoroi niitä, älä luo nimekkäitä duplikaatteja. C01:n nykyinen LosOriginalDialogue on ensisijainen perustana säilytettävä lukija.

11.3 Muotoilun tarkat rajat

• Lukualueen varsinaiset lauseet ~18 px desktopilla, vähintään 17–18 px mobiilissa, riviväli 1,65–1,8; asetuksista säädettävä. UI-opetusteksti 16 px; IPA 15–17 px, riittävä kontrasti; oikeat IPA-merkit luettavalla fontilla, joka tukee Unicodea. Ei erikoisfonttiriippuvuutta ulkoisen palvelun käytöstä.
• Lukija ei käytä sivun jokaiseen pieneen asiaan harmaata korttia: luonnollinen yhtenäinen artikkeli, kortit vain oikeille interaktioille tai huomautuksille.
• Äänipainikkeella on näkyvä ikoni ja saavutettava nimi, esimerkiksi Kuuntele sana Schule, ihmisen lausuma; toistetaan, virhe, ei saatavilla on annettava myös tekstinä/aria-live -tilassa.
• Sanakirjakortin koko desktopissa harkiten 300–400 px, mobiilissa alalehti max noin 85 % näytön korkeudesta; avattavissa myös suuren tekstin asetuksilla.
• Sanastotaulukon sarakejako mobilella siirtyy rivikortteihin, ei pakoteta vaakavieritystä tavalliseen lukemiseen. IPA pidetään äänen vieressä eikä sulauteta suomennoksen päälle.
• Isot otsikot eivät saa tehdä C01:n kappaleavauksesta tyhjää koko näytön osuutta. Ensimmäisessä näytössä tavoite ja todellinen ensimmäinen tehtävä/äänipainike näkyvät mielekkäästi.

11.4 Saavutettavuuden julkaisutaso

Tavoite WCAG 2.2 AA kaikkeen päätoimintaan. 44–48 px on LOS!:n oma mobiilikosketuskohteiden suositus, ei väite että WCAG 2.2 AA edellyttäisi kaikille 44 px; WCAG:n AAA 2.5.5 on 44×44 px erityispoikkeuksin, ja AA:n 2.5.8 vaatii oman minimikoon/välistyksen ehtoineen.

Pakolliset testit: kontrasti, näppäimistö, näkyvä fokus, ruudunlukija, lang="de" saksankielisille lauseille ja lang="fi" opetukselle, äänen käynnistys painikkeesta, sanakortin Escape/sulku, fokus palautuu, 320 px asti toimiva asettelu, 200 % zoom, reflow ja äänite-/videofallback. Korostustehtävässä sama valinta onnistuu raahaamatta näppäimistöllä tai napauttamalla; ei käytetä väriä ainoana oikean ja väärän ilmaisuna. Mediaan tarjotaan saatavilla olevat oikeudellisesti käyttökelpoiset tekstimuodot ja tekstivastineet sen pedagogisen tilanteen sääntöjen puitteissa.

12. Frontend, taustatoteutus, reititys ja suorituskyky

12.1 Koodirakenteen päivityspolku

Säilytä olemassa oleva React + TypeScript + TanStack Router, nykyiset /los-reitit ja opiskelijan tiedot. Ei uutta itsenäistä sovellusta, erillistä kirjautumista tai toista tilanhallintaa LOS!:lle. Laajenna olemassa olevia komponentteja vähitellen:

src/features/los/
  LosBook.tsx                     # säilytetään, ohennetaan reitittäväksi shelliksi
  LosOriginalDialogue.tsx         # nykyinen tokeni-/korostuslukija säilytetään
  LosReferenceTools.tsx           # nykyisen DICTIONARY-listan korvaus oikealla tiedolla
  content/                        # julkaistut tekstilohkot ja sourceRegistry
  components/
    LosContentTree.tsx
    LosDictionaryCard.tsx
    LosPronunciationButton.tsx
    LosAudioPlayer.tsx
    LosExerciseFrame.tsx           # yhdistä olemassa oleva tehtävälogiikka
    LosSplitWorkspace.tsx
  dictionary/
    schema.ts
    dictionaryClient.ts
    search.ts
    morphIndex.ts
    pronunciation.ts
    provenance.ts
  importers/                       # Node/Python build-script, EI selaimessa
    freedictImporter.*
    wiktionaryImporter.*
    buildDictionaryIndex.*
  data/
    los1CoreVocabulary.*           # toimitettu opetuslista, viitteet sanakirjaan
  styles/
    los-*.css                      # V3.4:n tokenit, ei rinnakkaisia ristiriitaisia värejä

Tämä on ehdotettu kohdearkkitehtuuri, ei väite että nämä polut jo olisivat olemassa. Jos nykyisen projektin rakenne tarjoaa vastaavat tiedostot muualta, noudata olemassa olevaa nimeämistä ja päällekkäisten komponenttien välttämistä. Uutta koodia ei lisätä ominaisuus kerrallaan yhteen 1000-riviseen komponenttiin.

12.2 Todelliset riippuvuudet ja riskit

• Lukijan tokenit → sanan kontekstitietue → yleissanakirjan haku: token ID ja sanakortin tapahtumat pitää suunnitella ennen korostusten refaktorointia.
• Sanakirjan lähdeversiot → hyväksyttävät IPA-/audio-tiedot: sanan opetusstatus ja yleissanakirjan raakadata ovat eri kerroksia.
• Media → kuuntelutehtävän pisteytys: varmistettu toimiva lähde ensin, uusi kuuntelutehtävä vasta sen jälkeen.
• Lähdeteksti → ymmärtämistehtävä → ratkaisu: teksti on ensin lukittu versiona, jotta vastaukset eivät riipu muuttuvasta lähteestä.
• Tallennus → navigaatiouudistus: ennen URL-/komponenttien siirtoa varmista että vanhoja tallennusavaimia luetaan oikealla tavalla.
• Uudet UI-komponentit → kaikkien 10 kappaleen laajennus: koko sarjan tyylimuutoksia ei monisteta ennen C01:n oikeaa mobiili-/desktop-pilottia.

12.3 Hakukannan ja median suorituskyky

• Suuret dumpit käsitellään offline-importissa; opiskelijalle julkaistaan vain hakemiseen tarvittavat rajapinnat. Raakadata ei tule JavaScript-bundleen.
• DictionaryEntryCard: nopea lataus paikallisesta kurssiglossista; ison sanakirjan lisätiedot voidaan ladata pyynnöstä. Sanan klikkaus ei käynnistä pitkiä verkkopyyntöketjuja, jotka lukitsevat koko sivun.
• Hakutulosrajat, sivutus, indeksit, kuormitustesti; pelkkä tuhansien korttien renderöinti selaimessa kielletty.
• Audio: preload=none tai harkittu metadata, ei koko kirjan kaikkien sanojen äänitiedostojen massalatausta. Käyttäjän valinnasta vain yksi ääni kerrallaan, edellinen pysähtyy. TTS:n keskeytys ja uusi ääni eivät saa puhua päällekkäin.
• Välimuisti: julkisen/lisensoidun oppimisdatan versioidut assetit; yksityinen opiskelijadata erillään. Offline-käyttö on todettu ominaisuus vasta kun kirjatoisto ja hakufallback on testattu todellisella yhteydettömällä laitteella.
• Suojaus: turvallinen HTML-renderöinti, ei lähde-HTML:n scriptien suoraa injektointia, tietokantakyselyn parametrisointi, audion lähdeosoitteiden sallitut domainit, URL-käsittelyn validointi, RLS käyttäjätauluissa ja rajatut julkiset sanakirjakyselyt.

13. Uudistuksen työpaketit ja riippuvuuksien mukainen toteutusjärjestys

Toteutusperiaate: yksi pieni, palautettavissa oleva ja testattu PR kerrallaan. Työpaketit eivät ole lupauksia tietystä tulevasta valmistumispäivästä. Kukin paketti etenee vasta kun sen hyväksymiskriteerit on oikeasti osoitettu. Käyttäjälle ei avata jokaista suunnitteluyksityiskohtaa uutena päätöskysymyksenä, sillä tämän dokumentin ratkaisut toimivat toteutuksen lähtökohtana.

U0 — Lähtötilan turvaaminen ja näyttöjen tallennus

Työ: hae uusi main-SHA, tarkista LosBook, LosReferenceTools, LosOriginalDialogue, sourceRegistry, lesson engine, progress, storage, nykyinen Opintopäiväkirjan auth, mobiilireitit ja käytössä oleva deployment; ota käyttäjädatasta palautuskelpoinen snapshot. Täsmennä kaikille C01–C10 lähteille nykyinen published/pending-status sekä oikea toimiva media. Tee testien lähtöraportti.

Valmis kun: lähtötilan SHA, nykyiset toimivat/puuttuvat ominaisuudet, palautusohje ja täsmälliset riskit ovat kirjattuina. Ei tuotantodatan menetysriskiä.

U1 — Yhteinen sanakirjakortti, IPA ja äänen peruskomponentti

Työ: versioidut Pronunciation-tietueet, ihmisen/tietokoneen äänen erot, käytettävissä oleva saksankielinen Web Speech -ääni vain oikean tuen jälkeen, virhetilat, sama sanakortti lukijassa ja sanastossa; nykyisen LosOriginalDialogue-sanaglossausta päivitetään ilman vanhojen korostusavainten rikkoutumista.

Valmis kun: C01:n tarkistetuissa opetusilmauksissa IPA ja toimiva kuuntelureitti ovat saman datan kautta sekä tekstissä että sanastossa ja mobiilissa; puuttuva ääni ei esiinny toimivana.

U2 — Oikean laajan sanakirjan datan tuonti ja haku

Työ: FreeDict TEI-importti, varmistettu lisenssi ja checksum, Wiktionary/Kaikki JSONL -täydennys, lemma/muoto/IPA/lähde-erottelu, erilliset suomenkieliset käännökset, indeksit, hakurajapinta, lisenssien näyttö, testaava data-QA. Päivitä LosReferenceTools käyttämään sitä vanhan DICTIONARY-näennäissanakirjan sijaan.

Valmis kun: tietokannassa oikeasti on ladattua, mitattua tietoa; de→fi ja fi→de toimivat perus-/taivutus-/homografitesteissä; laaja data ei ole selaimen bundlessa eikä rikkinäinen lähde aiheuta vääriä suomennoksia.

U3 — Kirjalukijan ja navigaation V3.4-uudistus

Työ: hierarkkinen vasen sisältöpuu ja URL-syvälinkit, tiivis kappaleavaus, tekstin sisäinen sanakortti oikeassa paikassa, sanaston ja kieliopin yhtenäiset näkymät, valinnainen Kirja + tehtävät, mobiilin alalehti ja saavutettavuus. Banneri, kansi, logo ja kirjan aksentti pysyvät alkuperäisinä.

Valmis kun: yhdestä kappaleesta pääsee suoraan yksittäiseen tehtävään; tekstin voi avata rinnakkain siihen liittyvän tehtävän kanssa; mobiili, näppäimistö ja ruudunlukijan polut toimivat.

U4 — C01:n pedagogisesti täydellinen ensimmäinen kappale

Työ: viimeistele ja tarkista Text A, Text B tai hyväksytty korvaava audio, varsinaiset ääntämisen miniopetukset, kaikki 10 sisältöosiota, sanasto, selittävä kielioppi, lähteeseen sidotut monipuoliset tehtävät, kappaletesti, paikalliset tallennukset, opetuspolun L001–L006-viitteet.

Valmis kun: saksaa ennestään osaamaton käyttäjä voi itsenäisesti edetä aloituksesta käytännön tervehdykseen, kuunnella esimerkit, nähdä IPA:t, ymmärtää tekstit, tehdä ja tarkistaa tehtävät sekä palata laitteella tallennettuun kohtaan.

U5 — C02–C10 ja vanhan tehtävä-/opetusdatan integrointi

Työ: siirrä C01:n ratkaisut kaikkiin kappaleisiin, säilytä vanhat tehtävä- ja tekstiversiot, tarkista jokaisen lähteen todellinen source gate ja sen tekstin/äänen vastaavuus, lisää puuttuvat opetussanat IPA/äänineen, viimeistele kieliopit ja asteittain itsenäistyvät harjoitukset. Päivitä lähdeinventaario ja kirjan sanasto.

Valmis kun: kaikissa 10 kappaleessa käyttöliittymä, sanakortti, media, tehtävät, kielioppi, audiofoniikka ja julkaisuportti käyttäytyvät johdonmukaisesti; yksikään keskeneräinen lähde ei naamioidu valmiiksi.

U6 — Kertaus, kokeet, opetuspolku ja synkronointivarmistus

Työ: käytä olemassa olevaa 60 oppitunnin suoritustietoa ja kokeita, tarkista että 25-/50-osaiset arvioinnit noudattavat oikeita sääntöjä, paranna kertausta, varmista tallennuksen palautuminen kahdella laitteella ja yksityisen datan suojaus. Ei uutta erillistä edistymisen pistelaskuria.

Valmis kun: oikea suoritus näkyy oppitunneissa ja osaamisessa, ei teeskentele tekoälyarviointia, vastaukset/korostukset eivät katoa offline-/online-/selaimen reload-tilanteissa ja turvattomia käyttäjäkohtaisia tietoja ei paljastu.

U7 — Julkaisun loppuvarmennus ja sarjan seuraavat kirjat

Työ: sisältö-, audio-, IPA-, sanakirja-, lisenssi-, saavutettavuus-, mobiili-, tietoturva- ja regressiotestit. Julkaise kirjakohtainen valmiusraportti. Vasta läpäistyn LOS! 1:n jälkeen laajenna samoja yhteisiä moottoreita LOS! 2–8:aan.

Valmis kun: hyväksymismatriisin kriittiset kohdat ovat todennettuna läpi, eikä käyttöönotto vaadi aiemman opiskeludatan pyyhkimistä.

14. Testi- ja hyväksymismatriisi

14.1 Pääportit uudistuksen julkaisulle

|Portti                         |Tarkistettava tosiasia                                                                           |Estää julkaisun jos                                                            |
|-------------------------------|-------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
|**R1 Sisältö**                 |jokaisen julkaistun kappaleen oikea kokonainen pääteksti ja lähdeversio                          |teksti on pelkkä linkki, keksitty autenttiseksi tai puutteellinen.             |
|**R2 Oikeudet**                |eri aineistoille oikea lähde-/lisenssikartta                                                     |äänitteen, kuvan, videon tai tuodun sanakirjan oikeus on epäselvä.             |
|**R3 Kieli ja opetus**         |käännökset, ääntämisopetus, kielioppisäännöt ja oikeat vastaukset on oikeasti tarkistettu        |opettamatonta asiaa pisteytetään tai hyväksytty sana tulkitaan väärin.         |
|**R4 IPA**                     |jokaisella julkaistulla aktiivisella sanalla/fraasilla on tarkistettu IPA ja oikea kielivariantti|IPA puuttuu, virheellinen tai esitetään keksittynä.                            |
|**R5 Ääni**                    |pakollisten opetus-/kuuntelukohteiden oikeat ihmisäänet tai testattu TTS-fallback                |painike on rikki, väärä ääni lausuu tai käyttäjä saa tekaistun toistostatuksen.|
|**R6 Sanakirja**               |FreeDict/Wiktionary-importin todellinen aineisto, laskettu peitto, toimiva de↔fi ja lemma-haku   |sanakirja on edelleen vain `catalog.ts`-sanastot tai hakee väärää merkitystä.  |
|**R7 Käyttöliittymä**          |sisältöpuu, reader, sanakortti, split, mobiili ja vaikeat tilat                                  |oppimisen pääpolku ei toimi käytettävällä laitteella.                          |
|**R8 Tehtävät**                |16 tehtävätyypin vaaditut koodipolut, palautteet ja turvallinen koe                              |ratkaisut paljastuvat, oikeita ei hyväksytä tai vastaukset eivät tallennu.     |
|**R9 Saavutettavuus**          |WCAG 2.2 AA -tavoitteen kriittiset polut ja korostustehtävän vaihtoehdot                         |klikkaus, näppäimistö, ruudunlukija tai 200 % zoom rikkoo opiskelun.           |
|**R10 Tietosuoja ja tallennus**|palautus, käyttäjäeristys, RLS, varmuuskopio, konfliktit                                         |tehtäviä tai merkintöjä katoaa tai toisen käyttäjän data näkyy.                |
|**R11 Regressio**              |hostin muut opinnot, opiskelutilat, mobiili ja muut LOS!-kirjat toimivat                         |uudistus rikkoo Opintopäiväkirjan toimivan osan.                               |
|**R12 Viestinnän rehellisyys** |sivu näyttää eron julkaistun, esikatselun, ladatun sanakirjan ja vielä puuttuvan välillä         |käyttöliittymä väittää jotain todistamatta valmiiksi.                          |

14.2 Laitteiden ja käyttötapojen testimatriisi

• Kapeat puhelimet alkaen 320 px, tavalliset iPhone/Android-koot, tabletin pystysuunta, tavallinen koulukannettava, suurikokoinen desktop.
• Chrome/Chromium Linuxilla (käyttäjän koulukone), Safari iOS:ssä ja vähintään yksi toinen moderni selaintoteutus. Testaa puheen toiston oikea ääni, ei vain speechSynthesis-ominaisuuden olemassaoloa.
• 100 %, 125 %, 150 %, 200 % zoom, iso fonttikoko ja tumma tila.
• Media: äänen ei-saatavilla-tila, kaatunut embed, estetty autoplay, hidas yhteys, kokonaan yhteydetön tila, yksi ääni kerrallaan, sekä repliikin/sanan toistamisen keskeytys.
• Sanakirja: Schule, heiße, kommt, Häuser, Straße, Mädchen, Bank, ß/ss, umlautit, suomenkielinen lähtöhaku ja oikea merkitys; nämä ovat testisanavalikoima, eivät väite että jokaisen esimerkin kaikki tiedot on jo saatu tarkistetuista lähteistä.
• Sanakirjakortti: ilman IPAtietoa, ilman audiota, usea IPA, usea merkitys, sama sana eri sanaluokissa, täydennyskäännöksen puuttuminen, offline-fallback.
• Tehtävät: tehtävän suoritus, reload, paluu, toistoyritys, kokeen palautus, keskeytynyt äänite, mukana oikeat skandimerkit ja ß; korostus hiirellä/kosketuksella/näppäimistöllä.
• Synkronointi: paikallinen tallennus → toinen laite, manuaalinen palautus, synkkakonflikti, kirjautumisen epäonnistuminen, yhteys katkeaa kesken, RLS estää väärän käyttäjän pyynnön.
• Sisältö: lähteen julkaisun puuttuminen ei estä muun kirjan navigointia eikä näytä puuttuvaa mediasisältöä valmiina.

14.3 Konkreettinen oppimistesti

Käytä uutta käyttäjää, joka ei osaa saksaa ennalta. Pyydä häntä käymään C01:n ensimmäinen oppimisketju ilman ulkopuolista opettajaa ja ilman puheohjeita. Mittaa vain perusteltuja asioita: osaako hän löytää seuraavan vaiheen, soittaa tervehdyksen, nähdä IPA:n, ymmärtää tekstin, vastata kysymykseen, harjoitella oman tervehdyksen ja palata seuraavana päivänä. Tässä ei ole kyse siitä, millaiseksi opiskelija kokee punaisen värin, vaan siitä, opettiko kirja oikeasti.

15. Ongelma- ja poikkeustilanteiden lopulliset päätökset

|Poikkeustilanne                                           |Päätetty toimintatapa                                                                                                                                          |
|----------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
|Ei FreeDictin lisenssitietoa paikallisessa paketissa      |Tuonti pysähtyy. Lähdehaetaan oikea lisenssimetadata; ei oleteta CC-lisenssiä.                                                                                 |
|FreeDictin ja Wiktionaryn lisenssit ovat ristiriidassa    |Lähteet erotellaan ja näytetään erillisinä lähdekerroksina; ei laittomasti yhteen kopioitua tietuetta.                                                         |
|Wiktionaryssa ei ole sanalle suomennosta                  |Näytä sen lähdekielinen merkitysselite nimenomaisella kielilabelilla tai puuttuva käännös; kurssisanan suomennos toimitetaan erikseen ja tarkistetaan.         |
|Sanalle ei ole IPAa                                       |`IPA puuttuu lähteestä`, ei keksittyä arvausta; opetusydin korjataan ennen valmiutta.                                                                          |
|Saksankielistä selain-TTS-ääntä ei ole                    |Näytä selkeästi ‘Ei saksankielistä ääntä tällä laitteella’; oikea lisensoitu ihmisääni, jos saatavilla, muuten vaihtoehtoinen harjoitus.                       |
|TTS lausuu väärin                                         |Poista kyseisen sanan TTS-reitti, lisää tarkistettu ihmisäänite tai hyväksytty korvaava puhuntamalli; ei automaattista julkaisemista.                          |
|Audio latautuu mutta on eri sana                          |Julkaisun estävä media-QA-virhe, erottele oikea lähde ja tarkista kohde-ID.                                                                                    |
|Lähteen audio ei toimi kaikilla selaimilla                |Tarjoa samaan taitoon toinen luvallinen audio tai laitekohtainen testattu fallback; ei ilmoiteta ensimmäistä toistimeen virhettä opiskelijan syyksi.           |
|Mobiilin split kutistaa lukijan liian kapeaksi            |Vaihda overlay/paneeliin; ei väkisin kahden palstan asettelua.                                                                                                 |
|Sanakortti rikkoo korostustussin                          |Eri käyttötilat ja tapahtumaprioriteetti: sanavalinta vs korostus; vanhat anchor-ID:t säilyvät.                                                                |
|Vanha opetusdata ei vastaa uutta tietomallia              |Läsnä oleva migraatio, vanhan avaimen fallback ja palautus; ei puhdisteta dataa.                                                                               |
|Kaksi laitetta muuttaa samaa vastausta                    |Versiotiedot, näkyvä konflikti ja ladattava varmuuskopio; ei hiljaista ylikirjoitusta.                                                                         |
|Käyttäjä ei myönnä mikrofonilupaa                         |Teksti-/ääneenluku ilman tallennusta mahdollinen; ei rangaistusta.                                                                                             |
|Uusi lähde on liian vaikea A1-oppijalle                   |Vaikeat muodot tukisana-/rakennelaatikkoon, ei pisteytetä opettamattomana; tarvittaessa vaihda samantasoinen aito lähde.                                       |
|Kokeen äänite katoaa kesken                               |Keskeytys tilana, jatkamis-/korvauskäytäntö; ei tekaistua pistettä.                                                                                            |
|Sanakirja importoi tuhansia väärän kielen merkityksiä     |Julkaisu pysäytetään; data erotetaan kielikoodin mukaan, ei lasketa suomennospeittoon.                                                                         |
|Suuren dumpin lataus ei sovi selaimeen                    |Dumpit käsitellään palvelimella eräajona; selain saa vain rajatut hakutulokset.                                                                                |
|Kustannuksia tai käyttörajoja tulee vastaan               |Pidä lukija, ydinsanastot ja C01 audion kanssa toimivina; laajan sanakirjan palvelumallille testattu read-only-vararatkaisu ilman maksullista TTS-riippuvuutta.|
|Näköiskirjan taitto on valmis mutta digikirjan data kesken|Näköiskirja merkitään luonnokseksi, eikä näyttö-/paino-PDF:n valmistumista väitetä koko LOS! 1:n valmistumiseksi.                                              |

16. Valmistumisen määritelmä ja ylläpidon päätökset

16.1 Kolme selkeästi eri valmiustasoa

A. C01:n uudistusbeta: ensimmäinen kappale opettaa itsenäisesti aidon dialogin, sisältää aitoon aineistoon sidotut tehtävät, toimivat saksan ääntämiset ja IPA:t, sanakortin, opetusmateriaalin, kieliopin, harjoitustestin sekä luotettavan palautettavan paikallisen tallennuksen. Pilvisynkka ei saa väittää olevansa valmis, ellei sitä oikeasti ole varmennettu.

B. LOS! 1 valmis: C01–C10:n kaikki päätekstit ja kymmenen perusosiota, toimivat opetusäänet/IPA, kurssin koko hyväksytty sanasto, laitteiltaan testatut vaaditut mediat, 16 tyyppiä kattava yhteinen tehtävämoottori, 60 oikeasti suoritettavaa oppituntia, väli-/loppukoe, kertaus, osaamisnäkymä, laaja todellinen sanakirja, turvallinen tallennus/synkka ja kaikki kriittiset julkaisun R1–R12-portit läpi. Ulkoasu yksin ei riitä.

C. Koko LOS! 1–8 valmis: jokaiselle kirjan SAB-moduulille oma, tarkistettu ja oikeasti toimitettu aineisto, sama UI ja tietomalli, oppimisen johdonmukainen kasvu sekä yhteiset sanakirja-, IPA-, audio-, kertaus-, tallennus- ja saavutettavuustyökalut. Toisten kirjojen tyhjiä kansia ei lasketa valmiiksi oppikirjoiksi.

16.2 Valmiuden näyttöraportti jokaiseen PR:ään

PR:n kuvaukseen merkitään:

• tarkka main-lähtö-SHA ja muutetut komponentit;
• toteutettu pedagoginen tavoite ja sen valmis demonstraatio;
• käytetty data-/lähde-/lisenssiversio ja oikeasti tarkistettu IPA-/audiojoukko;
• automaattisten testien sekä oikean selaimen testien tulokset;
• tallennuksen ja vanhojen ID:iden säilymisen testi;
• mobiili/desktop, ruudunlukija ja tumman tilan tarkistus;
• ominaisuudet, jotka eivät vielä täytä valmiuden määritelmää;
• palautus-/rollback-ohje.

Yksittäisten keskeneräisten uusien sivujen tai äänilähteiden muuttaminen suoraan tuotantoon on estettävä näkyvällä esikatselutilalla tai julkaisuportilla.

16.3 Uudet lähdetiedostot, jotka pitää tuottaa toteutuksessa

Näitä tiedostoja ei pidä korvata pelkillä UI-komponenteilla. Ne ovat toteutuksen sisäisen tarkistettavuuden perusta:

1. LOS_RENEWAL_U1_0.md (tämä dokumentti projektissa, käytä tämän version tunnistetta).
2. LOS_VISUAALINEN_MASTERPLAN_V3_4.md: V3.3:n yhteensopiva päivitys sisältöpuusta, sanakorteista, IPA/audio-UI:sta, mobiilista ja split-tilasta. V3.3:n kansi/banneri/brandiosa säilyy.
3. LOS_DICTIONARY_SOURCE_MANIFEST.json: FreeDictin ja Wiktionaryn tarkat dumpit, versiot, SHA:t, lisenssit, tuontistatus ja peittoraportti.
4. LOS_AUDIO_PRONUNCIATION_MANIFEST.json: jokaisen aktiivisen sanan IPA, audion lähde, puhujatyyppi/variantti, oikeus, toimivuus, fallback.
5. LOS1_CONTENT_QA_REPORT.md: kaikki C01–C10-lähteet, opitut muodot, kielentarkistus, äänitarkistus, tekstin ja tehtävän vastaavuus.
6. LOS_RELEASE_GATE_REPORT.md: läpäistyt/hylätyt testit sekä R1–R12 todelliset todisteet.

Ei tehdä yhtä uutta suunnitelmatiedostoa jokaista pientä komponenttia kohti ilman tarvetta. Dokumentaatio pidetään versionoituna ja todennettavana, ei loputtomana rinnakkaisten masterplanien kerrostumana.

17. Toteuttajalle annettava toimeenpanokäsky

> **Toteuta LOS!-uudistus tässä U1.0-suunnitelmassa olemassa olevaan `solarissongcontest/p-iv-n-opas`-repositorioon.** Tarkista aluksi tuore `main` ja todellinen käyttöympäristö, vertaa tätä U1.0:aa koko sarjan masterplaniin, nykyiseen V3.3-visuaaliseen masterplaniin, LOS! 1:n kirjakohtaiseen suunnitelmaan sekä lähdemanifestiin. Älä rakenna LOS!:a uudestaan; säilytä käytössä olevat C01–C10, oppituntimoottori, 60 tuntia, 147 rajattua osatehtävää, kokeet, korostukset, vastaukset, muistiinpanot ja hyväksytyt kansi-/banneri-/logoassetit.
> 
> Toteuta yhteinen sanakortti, todelliseen IPAan perustuva ääntämistieto ja luotettava ihmisääni / merkitty saksankielinen TTS-fallback. Korvaa kirjaluettelon sanastoriveihin perustuva näennäissanakirja oikealla FreeDict de–fi/fi–de TEI -tuonnilla ja Wiktionary/Kaikki.orgin lisäsanastolla, jonka lisenssit, kielikoodit, lähteet, lemmat, taivutukset ja ääntämiset erotetaan. Lisää siisti sanakirjahaku ja sanakohtaiset lähdetiedot. Uudista navigaatio hierarkkiseksi sisältöpuuksi ja toteuta samalla sisältödatalla toimiva Kirja + tehtävät -tila; mobiilissa käytä yhtä lukupalstaa ja sanakortin alalehteä. Tee kielioppi ja ääntämisen opetus perusteelliseksi. Testaa koko ketju ensin C01:ssä, yleistä C02–C10:een, auditoi kertaus/kokeet/tallennus ja laajenna vasta sen jälkeen muihin kirjoihin.
> 
> Jokaisen muutoksen on läpäistävä oikea lähde-/lisenssi-, kieli-, IPA-, audio-, tietoturva-, tallennus-, laite- ja saavutettavuustesti. Julkaise pienissä palautettavissa PR:issä. Älä väitä aineistoa, puhesynteesiä, sanakirjan tietuemäärää, lisenssiä, laitetoistoa, natiivin tarkistusta tai automaattista synkkaa valmiiksi ilman näyttöä. Jos ulkoinen tekninen tai oikeudellinen ehto ei täyty, toteuta tässä dokumentissa päätetty näkyvä fallback tai pysäytä kyseisen sisällön julkaisu sen sijaan, että korvaisit totuuden paikkamerkillä.

────────

18. Tutkitut lähteet ja selvityksen luotettavuus

18.1 Projektin omat asiakirjat, 10.–12.11.2026

• Los masterplan.txt — koko kahdeksan kirjan yhteinen periaate, sanakirjan FreeDict/Wiktionary-lähdesuunnitelma, 16 tehtävätyypin normi ja tietomalli.
• Los toimintaohjeet.txt — Opintopäiväkirja-integraation perusrajoitukset.
• LOS_VISUAALINEN_MASTERPLAN_V3_3_YHTENAINEN.md — aktiivinen ulkoasun normi, kirjan banneri, lukija ja kaksipalstaisen harjoittelun oletukset.
• Los 1.txt ja LOS1_SOURCE_MANIFEST_v1.0(1).json — LOS! 1:n pedagoginen sisältö, lähteet ja mediaoikeuksien rajat.
• Suunnitelma LOS.txt — aiempi toteutusjärjestys ja laatuportit.
• LOS1_NAKOISKIRJA_MASTERPLAN_v1.0(1).txt — erillisen B5-näköiskirjan rajaus.
• Käyttäjän 12.11.2026 lähettämät LOS!-näkymien ja Otavan New Insights 5 / Fokus 4 -referenssien kuvakaappaukset — niistä tehdyt visuaaliset, eivät tuotannon toimintaa todistavat havainnot.

18.2 Ulkoiset tekniset ja aineistolähteet, 12.11.2026

1. FreeDict: Downloads — https://freedict.org/de/downloads/ (de–fi 13 028, fi–de 12 102 ilmoitettua tietuetta, versio 2025.11.23, TEI-formaatti; tarkat datasetin käyttöehdot tarkistetaan ladatusta lähteestä).
2. FreeDict: TEI- ja dictionary source -ohjeistus — https://github.com/freedict/fd-dictionaries ja https://freedict.org/ .
3. Kaikki.org: German dictionary — https://kaikki.org/dictionary/German/index.html (laajan saksan datan sanamuotomäärä on eri kuin suomenkielisten käännösten määrä; sivustolla ilmoitetut snapshotit muuttuvat).
4. Kaikki.org: German Wiktionary raw downloads — https://kaikki.org/dewiktionary/rawdata.html (JSONL, dump-päivät ja extractor, CC BY-SA / GFDL Wiktionary-lähteen ehdoin; käytä lisenssi-/provenienssitietoa).
5. MediaWiki API:Imageinfo — https://www.mediawiki.org/wiki/API:Imageinfo (Commons-tiedostojen metadataan ja attribuutioon käytettävä rajapinta).
6. MDN: Web Speech API / speechSynthesis — https://developer.mozilla.org/en-US/docs/Web/API/Window/speechSynthesis (selaimen puhesynteesi; oikean de-äänen olemassaolo on laitekohtaisesti varmistettava).
7. W3C WCAG 2.2 — https://www.w3.org/TR/WCAG22/ ja https://www.w3.org/TR/wcag/ (AA-saavutettavuus ja kosketuskohteiden tarkat vaatimukset).
8. GitHubin tarkistetut tiedostot — https://github.com/solarissongcontest/p-iv-n-opas/tree/4b3bb2ebb7f0797c86f25942c698acb33a4d27de/src/features/los (valikoitu koodin tarkistus: LosBook.tsx, LosOriginalDialogue.tsx, LosReferenceTools.tsx, LosC01AuthenticText.tsx, LosGrammarChapters.tsx, catalog.ts, LosVoicePractice.tsx, content/sourceRegistry.ts, content/los1OpenDialogues.ts, los-book.css).

18.3 Mitä ei tässä väitetä varmennetuksi

• Että koko Vercel-tuotantosivu varmasti vastaisi tarkistetun SHA:n käyttöliittymää.
• Että jokainen saksankielinen teksti, sana, IPA, suomennos tai ääni olisi käynyt aidon kieliasiantuntijan tarkistuksen.
• Että kaikki sanakirja- tai media-aineistot olisi jo ladattu, tuotu, testattu tai että niiden yksittäiset lisenssiversiot olisi jo hyväksytty.
• Että käyttäjän automaattinen pilvisynkronointi olisi toimiva, turvallinen ja täysi.
• Että 350 000+ saksan sanamuotoa olisi yhtä monta suomenkielistä käännöstä tai että mikään sanakirja sisältäisi kirjaimellisesti jokaisen mahdollisen saksan sanan.
• Että näköiskirjan PDF olisi tällä suunnitelmalla automaattisesti valmistunut.

Viimeinen periaate: lukija oppii LOS!:lla saksaa, ei vain navigoi oppikirjalta näyttävän sovelluksen sisällä. Tämä laadullinen ero ratkaisee uudistuksen onnistumisen.