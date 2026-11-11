# LOS! · oppikirjamaisen käyttöliittymän ensimmäinen toteutus

**Lähteet:** `LOS_visuaalinen_masterplan_v2.1_OPPIKIRJA.txt`, `LOS_masterplan_v1.1_OPPIKIRJA.txt`, `Los 1.txt`. Näitä tiedostoja ei ollut vielä repositorion lähdekoodina.

## Mitä on toteutettu

- Oma `/los`-reitti ja `LosBook`-näkymä, joka ei käytä `AppShell`- tai `StudyOS`-luokkia.
- Kirjasarjan kahdeksan nidettä omilla nimillä, moduuleilla, aksenttiväreillä ja kansi-assetin paikoilla.
- LOS! 1:n 10 suunniteltua kappaletta sisällysluettelossa ja kappaleaukeamissa.
- Kirjallinen etulehti, luvun avaus, sanastosivu, kielioppisivu, harjoitussivu, alkuperäistekstin lukijapaikka ja kirjan liitteet.
- Responsiivinen taitto mobiilille, tabletille ja työpöydälle sekä erillinen tumman tilan pinta.
- Kolme toimivaa, alkuperäistä alkeiden malliharjoitusta ja sanaston suomennosten piilotus.
- Navigointi kirjastosta kirjaan ja takaisin, kappaleiden välillä, sisällysluettelosta osioihin sekä selaimen historiaan lisättävät hash-polut.
- Opintopäiväkirjan nykyisessä Lisää-valikossa linkki LOS!-oppikirjastoon. Muu StudyOS-navigaatio säilyy ennallaan.

## Tärkeä rajaus

Tämä on **toiminnallinen oppikirjamaisen UI:n ensimmäinen toteutus**, ei valmis LOS! 1 -kurssi, eikä kahdeksan valmista kirjaa. Kuvia, lähdetekstejä, äänitteitä, sanakirjatietokantaa, tehtävämoottorin kaikkia tyyppejä, synkronoitua edistymistä tai kokeita **ei ole toteutettu**.

Hyväksyttyä LOS! 1 -kantta/banneria tai sanamerkkiä ei löytynyt GitHub-reposta. Älä korvaa niitä tekoälyn keksimillä lopullisilla kuvilla. Lisää käyttäjän hyväksymistä lähteistä käsitellyt varat:
- `public/los/los-logo.svg` (hyväksytty graafinen LOS!-logo, ei fontin uusi ladonta)
- `public/los/los-1-cover.webp` (hyväksytty punainen kansi). Vastaavasti kirjat 2–8 myöhemmin
- `public/los/los-1-banner.webp` vain kun oikea banneri on toimitettu/luvitettu ja rajaus ratkaistu.

Nyt puuttuvien varojen tilalla on ohjelmallinen **väliaikainen typografinen varanäkymä**, ei uusi hyväksytty kansisuunnitelma. Lähdeaineiston `Text A` -sivu näyttää selkeän puuttuvan aineiston tilan, eikä keksi täytedialogia.

Kirjan URL ei tuo uusia käyttäjätietoja eikä vaadi tietokantamigraatiota. Nykyinen laitteen tunnistuksen tila vaaditaan näkymän avaamiseen, mutta pelkkä selaimen paikallinen tila **ei ole palvelinpuolen pääsynhallinta**. Ennen yksityisen/suojatun tekstiaineiston tai käyttäjän edistymistietojen käyttöönottoa tarvitaan palvelinpuolen oikeustarkastus ja synkronoitu tallennus.

## Visuaalinen hyväksymiskriteeri

1. LOS! ei näytä StudyOS:n Flow/Map-näkymää, sovellusdashboardia tai tuottavuuskortteja kirjasivullaan.
2. Ensimmäisen ruudun päärooli on kirjankannella, sisällöllä ja luvun typografialla, ei tilastoilla.
3. Kirja avautuu pystyyn taitettuna sivuna, sisällysluettelo säilyttää luvut ja sivut; mobiilissa lukualue on yksipalstainen.
4. Tehtävät on numeroitu oppikirjan tapaan, eivät eri sovelluksen tehtävärivejä.
5. Alkuperäisteksti on myöhemmin kokonaan LOS!:n sisällä, ei vain ulkoinen linkki.

## Seuraavat toteutusportit

1. Toimita ja lisää hyväksytty logo, kansi ja banneri.
2. Lisää tarkistetut autenttiset tekstit ja mediat `Los 1.txt`:n lähdekatalogista, käyttölupa ja attribuutio jokaiseen.
3. Toteuta sarjan sanakirja, oppituntipolku, toimiva tehtävä-/kertausmoottori ja synkronoitu tallennus.
4. Todista visuaalinen ero ruutukaappauksilla (desktop 1440 px, iPhone 390 px), kontrastit ja saavutettavuus.
5. Käy läpi PR-laatuportit. Älä väitä koko sarjaa valmiiksi tämän käyttöönoton perusteella.
