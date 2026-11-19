# LOS! 1 – itsenäinen käyttöliittymä- ja luettavuusauditointi

**Päivä:** 19.11.2026  
**Tarkoitus:** vertailla toteutusta paitsi LOS!:n visuaaliseen masterplaniin v3.3 myös masterplanista riippumattomiin käytettävyys- ja saavutettavuusperiaatteisiin.

## Ulkopuoliset vertailuperusteet

1. W3C WCAG 2.2: reflow 320 CSS px, suurennetun tekstin ja näppäimistön toiminta, näkyvä fokus ja kohdekoot. https://www.w3.org/TR/WCAG22/
2. W3C:n reflow-ohje: tekstiä tulee voida suurentaa niin, ettei tieto tai toiminto katoa eikä sivun lukeminen vaadi kahden suunnan vieritystä (poikkeuksena luonteeltaan kaksiulotteiset taulukot). https://www.w3.org/WAI/WCAG22/Understanding/reflow.html
3. Baymard Institute: jatkuvan lukemisen hyödyllinen tekstirivin pituus on tyypillisesti noin 50–75 merkkiä, ei koko työpöytänäytön leveys. https://baymard.com/research-articles/line-length-readability
4. Nielsen Norman Group: mobiilin navigoinnissa näkyvän sisällön priorisointi ja toissijaisten toimintojen asteittainen paljastaminen. https://www.nngroup.com/articles/mobile-navigation-patterns/ ja https://www.nngroup.com/articles/progressive-disclosure/

Nämä ovat perustelulähteitä, eivät osoitus tietyn LOS!-näkymän fyysisesti tehdystä käyttäjätestauksesta.

## Havaitut ongelmat ja koodiratkaisut

| Alue | Koodissa havaittu | Toimenpide | Perustelu |
|---|---|---|---|
| Lukijan henkilökohtainen säädettävyys | Saksankielisen lukutekstin koko ja tekstin riviväli olivat enimmäkseen kiinteät, eikä asetuksille ollut koko kirjan kattavaa ohjainta | Lisää laitteelle säilyvät koon, rivivälin ja leveyden asetukset | Aloittelijoiden, suurennettua tekstiä tarvitsevien ja eri näytöillä lukevien tarpeet eroavat |
| Rivin pituus | Lukijan eri sivutyypit käyttivät erillisiä kiinteitä leveysrajoja | Yhteinen hallittu rivin pituus, oletus 68ch, käyttäjän valitsema 55ch/76ch | Lukemisen sujuvuus ennen keinotekoista koko näytön täyttämistä |
| Mobiilivalikko | Sisältödrawerista puuttui oma näkyvä sulkupainike ja hallittu näppäimistöfokus | Sulkupainike, Escape, rajattu Tab-kierto, fokus ja taustan vierityksen lukitseminen | Näppäimistö- ja mobiilikäyttäjän selkeä poistumisreitti |
| Kaksipalstainen opiskelutila | Rinnakkaisnäkymän vaihto perustui ensisijaisesti selainikkunan 1400 px rajaan | CSS container query lukualueen todellisesta 1000 px sisäleveydestä | Kapeampi kannettava + sivupalkki ei saa tuottaa ahtaita kahta palstaa |
| Sisällön tietohierarkia | Kirjan sisällysluettelo sisälsi tarpeettomasti liitteiden pitkiä lähde- ja testausselostuksia sekä varmuuskopioiden käyttöliittymän | Säilytä nämä liitteissä; sisällysluettelo näyttää kappaleet ja luonnolliset siirtymät | Kirja ensin, tekninen auditointi vasta pyydettäessä |
| Vanhentuneet tilatekstit | Etusivulla puhuttiin erillisten äänitiedostojen ja natiivitarkastuksen puuttumisesta jopa hyväksytyn TTS-suunnitelmamuutoksen jälkeen | Muuta oppijan kannalta ymmärrettäviksi, totuudenmukaisiksi teksteiksi | Vanhat julkaisuehdot eivät kuulu opiskelun aloittamisen esteiksi |
| Kosketus ja kohdistus | Sisältöpuun riveillä oli 41 px minimikorkeus ja muutamalla tehtävä-/otsikkokohdalla puutteellinen scroll-margin | 44 px sisältöpainikkeet, näkyvät focus-outline-tyylit, scroll-margin otsikoihin | Vähentää virhepainalluksia ja sisältöjen peittymistä |
| Visuaalinen yhtenäisyys | Valinta- ja lukijatyökaluilla oli osin erillisiä käännöksiä, reunoja ja painikkeiden mittoja | Yhdenmukaista kirjasivun rytmi, luettava teksti ja asetuspaneeli säilyttäen nykyiset kansikuvat | Ei tarpeetonta graafista uudelleensuunnittelua |

## Tietoiset poikkeamat vanhasta masterplanista

- **Älä tee kolmesta asetuksesta pysyvää suurta työkaluvalikkoa.** Yksi avattava "Lukuasetukset" säilyttää oppikirjan lukutilan. Parempi kuin jokaisen säätimen pysyvä rivi jokaisella sivulla.
- **Älä pakota rinnakkaista tehtäväpaneelia 1400 px työpöytäleveyden perusteella.** Määritä asettelu CSS container queryllä vasta todellisen kirjan leveyden pohjalta.
- **Älä näytä lähde-/laiteauditointia sisällysluettelon päävirtana.** Säilytä se käyttäjän avattavissa kirjan liitteissä ja pidä lukupolku häiriöttömänä.
- **Älä lisää koristeita vain modernin ulkonäön vuoksi.** Typografia, luettavuus, tarkat kohdistukset, vähäinen häly, kontekstissa olevat toiminnot ja pysyvät opiskelumerkinnät ovat tärkeämpiä.

## Todentaminen ja rajat

Kaikki yllä olevat muutokset pitää tarkistaa GitHubin Quality Gate - ja Playwright Chromium/iPhone WebKit -testeillä. Selainkokeet kattavat 320 px reflow'n, 200 % tekstikoon vanhat regressiotestit, asetusten tallentumisen, näppäimistön Escape- ja Tab-toiminnan sekä kapealle/leveälle lukualueelle sopivan asettelun. Selainkoe tallentaa lisäksi sivunäytösten kuvakaappaukset CI-artefakteiksi.

**Ei todisteta:** fyysisen iPhonen haptista tuntumaa, laitteen ääntä, koko sovelluksen täydellistä WCAG-vaatimustenmukaisuutta eikä esteettistä paremmuutta ilman oikeita käyttäjätestejä. Tässä raportissa *parannettu* tarkoittaa toteutettujen korjausten ja testien tukemaa, ei täydellisyyttä.

## Jatkovertailu

Kun versio on julkaistu, hyödyllisin lisänäyttö olisi todellisten laitteiden kuvakaappauksista ja uuden opiskelijan tehtäväsuorituksista tehtävä pieni käytettävyystesti. LOS! 1:n opiskelijaa ei kuitenkaan vaadita saksankieliseksi kielentarkastajaksi eikä kehitystyön testaajaksi ennen opiskelun aloittamista.

## Kuvakaappauskierroksen löydös (19.11.2026)

Ensimmäisen CI-ajon 64/64 läpäissyt asettelu tuotti oikeat, täysmittaiset työpöytä- ja mobiilikuvakaappaukset GitHub Actionsin artefaktiin `los-book-browser-evidence-44555579258`. Niistä ilmeni sellainen käytettävyysongelma, jota testituloksen "PASS" ei pitänyt peittää: saksankielisen päätekstin ensimmäinen oikea repliikki jäi ensimmäisen mobiilinäytön selvästi alapuolelle, koska sen edellä oli paljon kahdentunutta teksti- ja äänityökalujen asetuskäyttöliittymää.

**Tästä seurannut korjaus:** ääni- ja nopeusvalinta avautuu nyt erillisestä "Ääni ja nopeus" -valinnasta, puheenvuoro- ja lausekohtaiset kuunteluluettelot asettuvat tiiviiseen kaksisarakkeiseen yhteenvetoon (itse luettelot avautuvat koko leveydelle), ja LOS!-omien päätekstien lukijan kahdentunut lähdevaroitus/otsikko poistettiin lukupolun yläosasta. Varsinaiset lähde- ja laatutiedot säilyvät kirjan liitteissä ja tekstin lähdetiedoissa.

Tämä muutos perustui **oikean renderöidyn kuvakaappauksen arviointiin**, ei pelkästään masterplaniin tai CSS:n lukemiseen. Uusi regresiotesti edellyttää, että ensimmäinen saksankielinen tekstirepliikki on käytettävissä noin yhden ylimääräisen mobiilinäyttökorkeuden sisällä sivun alusta, eikä puheäänivalinta vie tilaa oletuksena. Kyseessä on näkyvän sisällön priorisointia koskeva käyttökokemustavoite, ei universaali WCAG-numeroarvo.
