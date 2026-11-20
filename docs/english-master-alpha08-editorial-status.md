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

## G01–G04 itsearviointitäydennys (20.11.2026)

Alkuperäinen Alpha 0.8 -gzip-sisältöpaketti säilyy muuttumattomana. Sen 20 kirjaluvusta edelleen puuttuu alkuperäisessä datassa alaosioiden `self_check`, joten SHA-256:lla varmennettu toimituksellinen auditointi raportoi edelleen 20 alkuperäisdatan puutetta. Tämä on tarkoituksellista eikä tarkoita, etteikö sovelluksessa voisi nyt harjoitella.

**Uusi erillinen toimituksellinen täydennys:**
- G01–G04: **4 kirjalukua, 19 alaosiota ja 38 tarkistettavaa omaa itsearviointitehtävää**.
- Jokaisessa alaosiossa on kaksi uutta kontekstisidonnaista kysymystä, kolme vastausvaihtoehtoa sekä selittävä palaute.
- Vastausvalinnat ja tarkistetut tulokset tallennetaan käyttäjäkohtaisesti laitteen localStorageen versioidulla avaimella. Pilvisynkronointi tai tämän täydennyksen vienti vanhoihin varmuuskopioihin ei vielä ole toteutettu.
- Täydennykset näkyvät suoraan alkuperäisessä LOS! v4 -tyylisessä kirjalukijassa. Ne **eivät** muuta 192 Teacher 2.0 -oppitunnin suoritusvaatimuksia tai todista kielitaidon hallintaa.
- Näin 20 alkuperäisdatan itsearviointipuutteesta **4 kirjalukua on nyt toiminnallisesti täydennetty**. Jäljellä on 16 kirjalukua, joissa ei vielä ole vastaavaa toimituksellisesti kirjoitettua täydennystä.
- Uudet tehtävät ovat projektissa kirjoitettua alkuperäistä sisältöä, eivät julkaisemattomien tai nykyisten YO-kokeiden autenttisia tehtäviä.

**Tilannetieto 20.11.2026:** G05–G10 on nyt täydennetty, joten tämän aiemman G01–G04-vaiheen jälkeinen 16 luvun puutelista on päivitetty G05–G10-osiossa. Päätelmät on erotettava alkuperäisen lähdepaketin ja sovelluksen lisäsisältöjen välillä.

## G05–G10:n lähdelähtöiset itsearvioinnit (20.11.2026)

Alkuperäiset G05–G10-lukujen täydet teoriat, 28 alaosion otsikot ja esimerkit avattiin **oikeasta SHA-256-varmennetusta** Alpha 0.8 -paketista. Jokaisen alaosion kaksi uutta harjoitusta perustuvat sen todelliseen aiheeseen. Alkuperäisiä gzip-osia tai niiden `draft`-tilaa ei muutettu.

- G05 Articles (4 alaosiota, 8 tehtävää): ensimmäinen maininta, määräisyys, yleistävä nolla-artikkeli, instituutiot ja tehtävään valinta.
- G06 Determiners & Quantifiers (4, 8): some/any, määrän sävy, each/every/either/neither, all/whole.
- G07 Personal, Possessive & Reflexive Pronouns (5, 10): subjekti ja objekti, omistusmuodot, refleksiivit, vastavuoroisuus ja viittaussuhteet.
- G08 Indefinite & Negative Pronouns (4, 8): somebody/nobody, another/other, either/neither ja kielteisen ilmauksen ala.
- G09 Relative Clauses I (5, 10): korrelaatti, who/which/that, whose, määrittävät ja lisätietoa antavat relatiivit, objektirelatiivin poisjättö.
- G10 Relative Clauses II (6, 12): paikkarelatiivit, the ... of which, osajoukkoilmaukset, preposition sijoittaminen, vapaat relatiivit ja pitkän virkkeen pääväite.

**Yhteensä:** G05–G10: 6 kirjalukua, 28 oikeaa alaosiota ja **56 uutta tehtävää**. G01–G10: 10 kirjalukua, 47 alaosiota ja **94 tehtävää**. Nämä näkyvät suoraan kirjan teoriaosuuksissa alkuperäisen LOS! v4 -lukijan kautta; sama käyttäjäkohtainen tallennus, tarkistus ja uusintayritys toimivat uusissa alaosioissa. Tehtävistä ei kirjata automaattista Teacher 2.0 -osaamisnäyttöä.

**Tarkistuksen kaksi lukua on pidettävä erillään:** Alkuperäisen paketin automaattinen auditointi löytää edelleen 20 lukua ilman lähdedatan `self_check`-kenttää. Niistä **10 luvun harjoitukset on nyt toimitettu sovelluksen erilliseen sisältökerrokseen**. Toimituksellista täydennystä puuttuu vielä 10 luvusta: **G13, G14, G15, G16, G17, G18, G19, G31, R02 ja R03**. Nämä tunnisteet on tarkistettu alkuperäisen paketin auditointiraportista. Kyse ei ole siitä, että nämä luvut puuttuisivat kokonaan, vaan niiltä puuttuu vielä vastaava lisätty itsearviointi.

## Julkaisua ei päätellä rakenteesta

Koodi ja automaattinen rakennevalidointi voivat varmistaa, että:
- tarvittavat kirja- ja oppituntitiedot ovat mukana, taitotuntien opetuskohtaukset avautuvat ja opiskelutiedot säilyvät
- vastausavainten viittaukset ovat rakenteellisesti kelvollisia
- puuttuvia harjoituksia ei merkitä tekaistuiksi osaamisnäytöiksi.

Ne **eivät** vielä osoita, että englannin kielioppi, esimerkit, oikeat ja väärät vastausvaihtoehdot, oppimisen siirtovaikutus tai tulevan YO-kokeen kattavuus on laadunvarmistettu. Myös paketin 20 mediaobjektia ovat pilottiäänitteitä, eivät julkaistuja lopullisia kuuntelukokeita.

## Seuraavan sisältötuotannon järjestys

1. **G13–G19, G31, R02–R03:** käy läpi jäljellä olevat 10 itsearviointia vailla olevaa lukua, lisää omat tehtävät oikeisiin alaosioihin ja varmista yksiselitteiset vastausavaimet.
2. **G11–G16:** käy lyhyet teorialuvut läpi sääntö, merkitys, poikkeus, vähintään kaksi todellista työstettyä esimerkkiä ja siirtotehtävä -tasolla.
3. **J03-tuntijakso:** laajenna 14 lyhyttä loppuyhteenvetoa niin, että opiskelija näkee mitä harjoiteltiin ja mitä ei vielä osoitettu.
4. **Lukeminen, kuunteleminen ja kirjoittaminen:** tee YTL-tyyppisille materiaaleille aineistokohtainen oikeellisuus- ja palautetarkistus. Valmistele todelliset audioassetit erillisenä toimituseränä.
5. **Julkaisuportti:** tarkista käsin aineiston oikeellisuus, tekijänoikeus/lisenssiperuste, LOPS21-kattavuus sekä kokeen ajantasaiset arviointisäännöt ennen kuin yksittäinen sisältö muuttuu `published`-tilaan.

**Automaattinen raportti** tallennetaan GitHub Actions -artefaktiksi: `english-master-editorial-inventory`. Siinä on täydellinen JSON-havaintolista ja luettava suomenkielinen yhteenveto.

Tämä on tuotannon toimenpidelista, ei valmis sisältö eikä lupaus, että 122 kirjaluvun ulkoasu todistaisi niiden pedagogisen laadun.
