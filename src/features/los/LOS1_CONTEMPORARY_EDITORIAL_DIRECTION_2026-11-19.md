# LOS! 1 · Contemporary Editorial -visuaalinen suunta (19.11.2026)

## Ongelma

LOS! 1:n oikeat Chromium/WebKit-kuvakaappaukset paljastivat toimivasta käyttöliittymästä huolimatta vanhahtavan kokonaisuuden: harmaan taustapinnan, lähes kulmikkaan valkoisen työarkki-ikkunan, Georgian käytön monissa näyttävissä otsikoissa ja saksankielisen dialogin leipätekstissä, pitkän hallintavalikkosivupalkin, alleviivatut selainhenkiset välilehdet ja liian monta erillistä ohjainlaatikkoa. Toteutus täytti edellisen version toiminnalliset testit, mutta **toiminnallinen läpäisy ei todista esteettistä laatua**.

## Visuaalinen tavoite

Tyylisuunta: **Contemporary Editorial**. LOS!:n tulee näyttää vuonna 2026 suunnitellulta premium-tason lukemis- ja kielenoppimistuotteelta, jossa tekstit, oma kansi ja kuuntelu ovat keskiössä. Inspiraation luokka on modernit digilukijat, ei vanha verkko-oppimisympäristö eikä pelillistetty mobiilipeli.

Vertailuperusteina esimerkiksi [Readwise Readerin mukautettava typografia](https://docs.readwise.io/reader/docs/faqs/appearance), [LingQ:n riisuttu lukija](https://www.lingq.com/blog/introducing-lingq-5-0/) ja [DAISY Consortiumin lukusovellusten käyttäjävaatimukset](https://daisy.github.io/reading-apps-ux-reqs/requirements/published/FINAL-20251031/). Näistä ei kopioida brändiä tai yksittäisiä käyttöliittymäkuvia. [W3C:n reflow-ohje](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) määrää piennäytön toimivuuden, [NN/g:n aesthetic-usability effect](https://www.nngroup.com/articles/aesthetic-usability-effect/) muistuttaa, että kauneus ja toiminta pitää todentaa erikseen.

## Päätökset ja perustelut

| Osa | Uusi suunta | Miksi |
|---|---|---|
| Fonttihierarkia | Moderni Inter/system sans suurissa otsikoissa, saksankielisessä lukutekstissä ja käyttöliittymässä. LOS!-logo ja alkuperäiset kirjakannet säilyvät | Poistaa epäyhtenäisen Georgian tuoman perinteisen verkkolehtimäisyyden |
| Paletti | Luettava lämminsävyinen siniharmaa/valkoinen, oppikirjan olemassa oleva tunnuspunainen vain päätoiminnoissa | Kontrasti ja typografia ovat ensisijaisia, ei monivärinen korttikaruselli |
| Yläpalkki | Moderni, kevyt läpikuultava kirjapalkki, ohut reunaviiva, ei paksua punaista yläraitaa | Brändi löytyy logosta, ei jokaisen sivun koristeviivasta |
| Sivupalkki | Hiljainen valkoinen sisällysluettelo, selkeät pyöristetyt aktiiviset kohdat ja hakukenttä | Navigointi on työväline, ei pitkä hallintataulukko |
| Lukupinta | Ilmava valkoinen pinta, 20 px kulmat ja tuskin havaittava syvyys työpöydällä; mobiilissa täysin reunaton | Moderni tilantuntu ilman keinotekoista pahvimaista korttipinoa |
| Teksti | 68ch oletusrivipituus, henkilökohtainen koko ja riviväli entiseen tapaan, moderni dialogitypografia | Saksankielinen sisältö on kaiken keskipiste |
| Painikkeet | Yhtenäiset 11–12 px kulmat, vähäeleiset sekundääriset toiminnot; täytetty pääkuuntelupainike | Vähentää eri vuosikymmeniltä näyttäviä painiketyylejä |
| Harjoitukset | Pehmeämmät valintarivit ja oppituntikortit, säilyvät oikeat palautteet ja tilat | Sama muotokieli opetusteksteistä kokeisiin |
| Sarjan kirjasto | Tilavat kansikortit, hyväksytyt 5:7-kuvat säilyvät | Kuvallinen identiteetti tekee kirjasarjasta kiinnostavan |

**Tärkeä vasta-argumentti:** klassinen serif-typografia ei itsessään ole vanhanaikaista. Tätä päätöstä ei ole tehty väitteellä, että serif olisi huono, vaan koska juuri nykyinen Georgialla ladottu kokonaisuus yhdessä laatikkomaisten ohjaimien ja harmaan sivupohjan kanssa näytti vanhalta. Kansikuvissa ja brändissä säilyy kirjamaisuus.

## Arkkitehtuurisääntö

Toteutetaan osana olemassa olevaa `src/features/los/los-design-quality.css` -kokonaisuutta. Väripaletti, rajaus ja valitun kirjan aksentti määritetään tämän tyylikerroksen nimettyinä tokeneina. Älä lisäile uusia komponenttikirjastoja, kolmannen osapuolen kirjainfontteja, kuvitusta tai korvaa käyttäjän hyväksymää LOS!-logo-/kansi-/banneria. Nykyisen toimivan lukijan, äänitoimintojen, oppimispolun, tallennuksen ja navigaation toiminta säilyy.

## Laadunvarmistuksen rajat

Vähimmäisehto: Quality Gate (yksikkötestit, lint, typecheck, build) ja LOS Book Browser QA (desktop Chromium + mobiili-WebKit) läpäisevät. Uusi Playwright-testi ottaa modernista lukijasta työpöytä-, kapea puhelin- ja tumma tila -kuvat sekä kirjan avaussivusta mobiili- ja työpöytänäkymät. Tarkista nämä oikeat kuvakaappaukset myös silmämääräisesti.

Nämä testit eivät todista tietyn käyttäjän esteettistä mieltymystä tai visuaalista universaalia parasta. Tässä versiossa tehty muutos on **perusteltu uusi suunnittelusuunta**, ei julistus että kaikki design-päätökset olisivat objektiivisesti parhaat mahdolliset.

## Hyväksymiskriteeri

Älä kuvaile LOS!:a premium-tasoiseksi vain tyylitiedoston nimen perusteella. Arvioi nimenomaan luettavaa sisältöä, tasapainoa, asettelun yhtenäisyyttä, oikean logon ja kansikuvan sopivuutta, napin kosketuspintoja, tummaa tilaa, 320px reflow'ta ja otsikon/tekstin suhdetta julkaistun ehdokkaan kuvakaappauksista. Jos versio on yhä vanhan koulusivuston näköinen, jatka muotoilua ennen valmistumisväitettä.
