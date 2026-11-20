# English Master · Alpha 0.8:n toimituksellinen tilanne

**Päivitetty:** 20.11.2026  
**Aineisto:** repositorion `public/english-master/content.manifest.json` ja 16 gzip-osaa  
**Tarkistus:** `python3 scripts/audit_english_master_content.py`  
**Tila:** teknisesti käytettävä luonnosaineisto, **ei pedagogisesti lopputarkistettu oppikirja**

## Mitä todellisesta sisältöpaketista löytyi?

Tarkistus purkaa koko vahvistetun SHA-256-paketin. Numerot eivät perustu keinotekoiseen Playwright-fixtureen.

| Havainto | Määrä |
|---|---:|
| Kirjalukuja | 122 |
| Kirjan alaosioita | 393 |
| Käsiteltyjä esimerkkejä kirjaluvuissa | 791 |
| Opetuspolun oppitunteja | 192 |
| Oppituntien selitysosia | 561 |
| Oppituntien englanninkielisiä esimerkkejä | 1 088 |
| Opettajan opetustilanteita | 2 128 |
| Oppituntien tehtäviä | 1 382 |
| Monivalintoja | 508 |
| Lyhyitä tekstivastauksia | 326 |
| Avoimia, manuaalisesti arvioitavia tehtäviä | 548 |
| `published`-tilaisia oppitunteja | 0 |
| `published`-tilaisia kirjalukuja | 0 |

## Löydökset ja prioriteetit

| Havainto | Kpl | Esimerkkikohteita | Suositeltu työ |
|---|---:|---|---|
| Lyhyitä teoriaosuuksia sisältävä kirjaluku | 33 | G11, G12, G13, G16 | Tarkista selityksen täydellisyys, poikkeukset ja käsitellyt esimerkit |
| Ei alalukujen itsearviointia | 20 | G01, G02, G03, G04 | Kirjoita alkuperäiset tehtävät ja tarkistetut vastausavaimet |
| Erillinen `linked_lesson_ids` puuttuu | 16 | G05, G06, G08, G13 | Käyttöliittymä täydentää navigoinnin olemassa olevista oppituntien `book_refs`-tiedoista; toimituksellinen metadata voidaan korjata myöhemmin |
| Lyhyt oppitunnin yhteenveto | 14 | EM-LP-J03-L01, J03-L02, J03-L03, J03-L05 | Lisää täsmällinen taitokertaus ja tehtävien arvioinnin rajat |

A00 ja A08 **eivät ole virheellisiä 122 luvun viitteitä**. Ne ovat suunnitelman aloitus- ja opetuspolkukohteita. Sovellus avaa niiden osalta suoraan olemassa olevat aloitus- ja Opetuspolku-näkymät. A01–A07-sisältöjä ei ole rakennettu keksityiksi kirjaluvuiksi.

## Julkaisua ei päätellä rakenteesta

Koodi ja automaattinen rakennevalidointi voivat varmistaa, että:
- tarvittavat kirja- ja oppituntitiedot ovat mukana, taitotuntien opetuskohtaukset avautuvat ja opiskelutiedot säilyvät
- vastausavainten viittaukset ovat rakenteellisesti kelvollisia
- puuttuvia harjoituksia ei merkitä tekaistuiksi osaamisnäytöiksi.

Ne **eivät** vielä osoita, että englannin kielioppi, esimerkit, oikeat ja väärät vastausvaihtoehdot, oppimisen siirtovaikutus tai tulevan YO-kokeen kattavuus on laadunvarmistettu. Myös paketin 20 mediaobjektia ovat pilottiäänitteitä, eivät julkaistuja lopullisia kuuntelukokeita.

## Seuraavan sisältötuotannon järjestys

1. **G01–G04:** tarkista jokaisen alaluvun nykyiset tehtävät ja kirjoita puuttuvat, tarkoituksenmukaiset itsearviointitehtävät erillisine hyväksyttyine vastauksineen.
2. **G11–G16:** käy lyhyet teorialuvut läpi sääntö, merkitys, poikkeus, vähintään kaksi todellista työstettyä esimerkkiä ja siirtotehtävä -tasolla.
3. **J03-tuntijakso:** laajenna 14 lyhyttä loppuyhteenvetoa niin, että opiskelija näkee mitä harjoiteltiin ja mitä ei vielä osoitettu.
4. **Lukeminen, kuunteleminen ja kirjoittaminen:** tee YTL-tyyppisille materiaaleille aineistokohtainen oikeellisuus- ja palautetarkistus. Valmistele todelliset audioassetit erillisenä toimituseränä.
5. **Julkaisuportti:** tarkista käsin aineiston oikeellisuus, tekijänoikeus/lisenssiperuste, LOPS21-kattavuus sekä kokeen ajantasaiset arviointisäännöt ennen kuin yksittäinen sisältö muuttuu `published`-tilaan.

**Automaattinen raportti** tallennetaan GitHub Actions -artefaktiksi: `english-master-editorial-inventory`. Siinä on täydellinen JSON-havaintolista ja luettava suomenkielinen yhteenveto.

Tämä on tuotannon toimenpidelista, ei valmis sisältö eikä lupaus, että 122 kirjaluvun ulkoasu todistaisi niiden pedagogisen laadun.
