# LOS! 1–8 — kanoninen toteutuksen tilanne

**Päivitetty:** 14.11.2026. **Repository:** `solarissongcontest/p-iv-n-opas`.
**Kanoninen kehityshaara:** `feat/los1-8-safe-integration-20261114`, **PR:** [#264](https://github.com/solarissongcontest/p-iv-n-opas/pull/264), **Draft**.
**Päätös:** EI tuotantoyhdistämistä, tietokantakirjoitusta tai julkaisuvalmiusväitettä.
Tämä tiedosto on ainoa LOS! 1–8:n *toteutuksen* jatkotilaraportti. Visuaalinen V3.3/V3.4, kirjakohtaiset käsikirjoitukset ja olemassa olevat lähde-/lisenssidokumentit pysyvät omissa auktoritatiivisissa tiedostoissaan.

## Koodin ja sisällön todettu tilanne

| Kirja | Moduuli | Kappaleet | Opetustunnit | Tehtävät ja rajat |
| --- | --- | --- | --- | --- |
| LOS! 1 | SAB31 | 10 toimivaa lukurakennetta; Text A/B ja osaharjoituksia | 60 Teacher 2.0 -rekisterissä | Erilliset LOS! 1:n harjoitukset, kokeet ja tilanhallinta; sisältö-, media- ja laiteportit auki |
| LOS! 2 | SAB32 | 10 käsikirjoituskappaletta lukijassa | 50 Teacher 2.0 -kappaletunnin sovitusta, 10 rajoitettua kertaus-/koeluonnosta | 260 lähdetehtävää; osalla interaktiivinen rakenne, osalla toimituksellinen vastausluonnos |
| LOS! 3 | SAB33 | 10 käsikirjoituskappaletta lukijassa | 50 + 10 samalla rajauksella | 260 lähdetehtävää; sama rajaus |
| LOS! 4 | SAB34 | 10 käsikirjoituskappaletta lukijassa | 50 + 10 samalla rajauksella | 260 lähdetehtävää; sama rajaus |
| LOS! 5 | SAB35 | 10 käsikirjoituskappaletta lukijassa | 50 + 10 samalla rajauksella | 260 lähdetehtävää; sama rajaus |
| LOS! 6 | SAB36 | 10 käsikirjoituskappaletta lukijassa | 50 + 10 samalla rajauksella | 260 lähdetehtävää; sama rajaus |
| LOS! 7 | SAB37 | 10 käsikirjoituskappaletta lukijassa | 50 + 10 samalla rajauksella | 260 lähdetehtävää; sama rajaus |
| LOS! 8 | SAB38 | 10 käsikirjoituskappaletta lukijassa | 50 + 10 samalla rajauksella | 260 lähdetehtävää; sama rajaus |

**Yhteensä:** 80 kappaletta; 480 nimettyä tuntia (410 yhteiseen Teacher-soittimeen sovitettua kappaletuntia LOS! 1 mukaan lukien, 70 jatkokirjojen rajoitettua kertaus-/koetuntia). Rekisteröity tunti ei vielä merkitse pedagogisesti valmista tai osaamista todentavaa tuntia.

**LOS! 2–8 tehtävämoottorin tämän haaran tilanne:** 1 820 alkuperäistä tunnistettua tehtävää. Ennen 14.11. korjauksia 276 lähdetehtävää sai rakenteisen interaktion: 66 yhdistelyä (T05), 70 aukkoa (T07), 70 järjestämistä (T08) ja 70 lukutekstin järjestämistä (R02). Nyt lisättiin **70 kuusikenttäistä sanastomuistin palautusharjoitusta (T06)**: yhteensä 346 rakenteista toteutusta, jos niiden uusin QA vahvistuu. Muut tehtävät käyttävät edelleen avoimen vastauksen / lähteen mallivastauksen itsevertailua. Laskelmassa ei luokitella niitä julkaisuvalmiiksi.

## 14.11.2026 tehdyt konkreettiset muutokset (PR #264)

1. `6492cbb6`: `e2e/los-full-book.spec.ts` ohjaa kielimerkintätestin kanonisen Teacher-rekisterin todelliseen kohtaukseen; uudelleennimeämisen palautustesti erottaa todellisen varoituksen tallennusstatuksesta.
2. `9a3c05ab`: `e2e/los-future-books.spec.ts` valitsee nimenomaisen avoimen T18-tehtävän ennen tekstikenttä- ja kirjakohtaista tallennustestiä. Ei korvaa oikeasti interaktiivisia T07/T08-tehtäviä vanhoilla kentillä.
3. `37a50792`, `4f18245c`, `6fb94757`: uusi `src/features/los/content/losFutureRecall.ts`; `LosFutureExercises.tsx` ja CSS näyttävät 70 T06:n kuusi erillistä, tekstinä saavutettavaa vastauskenttää. Vastaus pysyy samassa `practiceAnswers[task.id]`-avaimessa. Vanhan, tunnistamattoman vapaamuotoisen vastauksen kohdalla näytetään alkuperäinen tekstikenttä **ilman automaattista ylikirjoitusta**. Osaamista ei pisteytetä automaattisesti.
4. `1458b9ff`, `a6ac4603`, `3204c1fd`: kuusikenttäisen tehtävän 70 kappaleen rakenne- ja vanhan datan säilytystestit; WebKit/Chromiumin tallennusreittitesti. Osassa tarkistuksia automaatioajo vielä kesken tätä tiedostoa kirjoitettaessa.

## Todellinen QA / versiot

- **Edellinen varmistettu koodi:** `d54769c9229c2b908bf13f7f191fa0fe4917dfb0`: Quality Gate 729/729 yksikkötestiä + lint, TS ja build hyväksytty ([ajo 43533825654](https://github.com/solarissongcontest/p-iv-n-opas/actions/runs/43533825654)). Browser QA ([ajo 43533825781](https://github.com/solarissongcontest/p-iv-n-opas/actions/runs/43533825781)) **150/156**, kuusi epäonnistui.
- **Uusien muutosten viimeinen koodicommitti:** `3204c1fd7bc1a9132401b5cfa03b2e4c728c312f`. Laatutestit käynnistetty: [Quality Gate 43581695328](https://github.com/solarissongcontest/p-iv-n-opas/actions/runs/43581695328), [Browser QA 43581695307](https://github.com/solarissongcontest/p-iv-n-opas/actions/runs/43581695307). **Tulosta ei vielä tässä merkinnässä kuitata hyväksytyksi**.
- Fyysinen iPhone/Linux, oikea ulkoisen audion toisto, riippumaton saksanopettaja, 30 minuutin oppimispilotit sekä manuaalinen ruudunlukija- ja 200 % zoom -auditointi: **ei tehty**.

## Pääominaisuuksien avoimet portit

- **Opetus:** 350 jatkokirjan kappaletunnin sovitukset käyttävät samaa Teacher-soitinta, mutta osa edelleen yleisluonteisia. 70 kertaus-/koetuntia vain rajoitettuina luonnoksina, ei läpikäydyksi merkittäviä. Todellinen osaaminen erotettava näyttöön perustuen.
- **Kokeet:** LOS! 1:ssä toimivia koeosia, mutta kaikki kahdeksan kirjaa kattavaa hyväksyttyä koe-/uusinta-/paljastuslogiikkaa ei ole osoitettu. Jatkokirjojen 14 väli- ja loppukokeen käsikirjoitusta sekä 14 kuuntelukäsikirjoitusta eivät vielä ole julkaistavia kokeita.
- **Sisältö ja oikeudet:** jatkokirjojen Text A/Text B -tekstit ovat LOS!:n omia vielä kielellisesti tarkistamattomia harjoitustekstejä, eivät automaattisesti autenttisia ulkopuolisia tekstejä. Ulkoiset media- ja tekijänoikeusportit auki.
- **Sanakirja:** FreeDictistä vaiheistettu 25 130 lähderiviä (33 670 käännöstä) eristetyssä PostgreSQL-testissä. Todellisia tuotantokantaan ladattuja **0**, julkaistuja **0** vahvistetun dokumentin mukaan. Wiktionary/IPA/täysi kattavuus, oikeudellinen hyväksyntä ja todellinen palautustesti puuttuvat.
- **Audio:** laitteissa hyväksyttyjen luonnollisten äänitteiden ja IPA-peiton julkaisuportit auki, toimimattomia lähteitä ei esitetä toimiviksi.
- **Tallennus:** paikallinen omistaja/kirja/kappale-kohtainen luonnosrekisteri on käytössä; synkronoinnin turvallista tuotantotoimintaa tai varmuuskopion täyttä palautusta ei ole tämän kierroksen perusteella kuitattu.
- **V3.3/V3.4:** yhteinen lukija, hierarkia ja jaettu tehtävätila osittain toteutettu; mobiili-WebKitin, 320 px:n, 200 %:n, tumman teeman ja saavutettavuuden lopullinen kattavuus todentamatta.

## Seuraava ensisijainen toteutustehtävä

1. Tarkista **uusimman HEADin** Quality Gate- ja Chromium/WebKit-ajon tulokset; korjaa todetut viat sovitun testinavigaation, todellisen DOM:n ja tallennusdatan perusteella, suorita uudelleen.
2. Varmista uusimmat PR #253/#258 -muutokset vertaamalla SHAt tämän integraatiohaaran todelliseen historiaan; korjaa mahdolliset päivityserot ilman erillistä rinnakkais-PR:ää.
3. Jatka muiden 1 820 tehtävän oikeaa interaktiota ja palautteen laatua alkuperäisen tehtävätyypin mukaan. Älä luo automaattista pisteytystä avoimille tehtäville.
4. Toteuta 70 jatkokirjan kertaus-/arviointituntia turvalliseen opetus-/koeprosessiin ilman vastauksien ennenaikaista paljastamista.
5. Toteuta kirjakohtaiset oikeat kokeet, kieli- ja lähde-QA, sanakirja, media, synkronointi, koko V3.3/V3.4 ja QA-portit riippuvuusjärjestyksessä.

**Jatkosession sääntö:** lue tämä tiedosto, hae uusin GitHubin HEAD ja Actions-tilanne; jatka PR #264:n omaa kehityshaaraa. Päivitä tätä tiedostoa, älä rakenna uutta rinnakkaista tilaraporttia. Älä yhdistä mainiin ennen julkaisuehtojen hyväksymistä.
