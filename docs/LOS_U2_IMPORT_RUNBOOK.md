# LOS! U2 — sanakirjan tuonti, turvarajat ja palautus

**Päivitetty:** 12.11.2026  
**Tila:** koodi toteutettu kehityshaarassa, automaattinen julkaisu **ESTETTY**. Tämä ohje ei väitä tuotantotietokannassa olevan sanakirjarivejä.

## Toteutettu putki

1. `scripts/los-dictionary-import.py` tarkistaa lähteen todellisten tavujen SHA512:n. FreeDict-TEI:n tapauksessa myös `teiHeader`-teksti sidotaan hyväksyttyyn SHA256:een. Hyväksytty lähdedata parsitaan suoratoistona erilliseksi `STAGED_NOT_PUBLISHED`-NDJSONiksi ja todelliset määrät lasketaan.
2. Kaikki.org/Wiktionary-JSONL:n `--gloss-language en` tai `de` on pakollinen. Kielitieto kuuluu lähdehyväksyntään; englanninkielisiä glosseja ei saa muuttaa suomennoksiksi.
3. `scripts/los-dictionary-load.mjs` tarkistaa koko vaiheistetun NDJSON:n sisällön, lähdekielen, kielisuunnan, uniikit lähde-ID:t, käännösten määrän ja tarkistussummat **ennen ensimmäistä INSERTiä**.
4. Varsinainen lataus vaatii `LOS_DICTIONARY_STAGING_WRITES=YES` ja palvelinympäristön Supabase-tunnukset. Tuonti luo vain `published=false`-tietoa; todelliset PostgreSQL:n rivi- ja käännösmäärät tarkistetaan ennen `actual_loaded_rows`-merkintää.
5. `supabase/migrations/20261112170000_los_dictionary_search_staging.sql` lisää erilliset lähde-, lekseemi-, merkitys-, käännös-, muoto-, IPA- ja audio-taulut sekä vain julkaistuihin lähteisiin rajatun enintään 20 osuman RPC-haun. Tauluilla on RLS, eikä selaimen `anon`/`authenticated`-rooleilla ole suoria oikeuksia.
6. SQL-julkaisuehto edellyttää oikeasti ladattujen rivien täsmäämistä, erillistä oikeudellista hyväksyntää ja hyväksyjän tietoja. Pelkkä `published=true` ilman niitä on kielletty.

## Tarkistetut lähteet ja määrät

Lue `docs/LOS_U2_DICTIONARY_SOURCE_IMPORT_MANIFEST.json`. FreeDictin virallisista TEI-paketeista mitattiin:

| Lähde | Parsitut lähderivit | Käännösvastineet |
| --- | ---: | ---: |
| Saksa–suomi | 13 028 | 16 511 |
| Suomi–saksa | 12 102 | 17 159 |
| **Yhteensä** | **25 130** | **33 670** |

Nämä ovat CI:n raakadataan perustuvia määrätietoja, eivät tuotantoon ladattujen tai julkaistujen tietueiden määriä. Kaikki.orgin täyden datasetin mitatut importtimäärät ovat vielä **0**, eikä Commons-audiota ole hyväksytty tuotantokäyttöön.

## Julkaisuportit ja palautus

- **Ennen mitään tuotantomigraatiota:** U0-varmuuskopio ja todellinen palautustesti. Tässä PR:ssä tietokantaan ei ole kirjoitettu opiskelijadataa.
- **Ennen sanakirjan latausta:** SQL-testaus PostgreSQL 17:llä, importer-testit, lisenssin ja lähde-version sekä dumpin todellinen SHA512. Ainakin CI:n `postgres-search-smoke`, `parse-and-license-gates` ja `freedict-source-inspection` tulee läpäistä.
- **Ennen julkaisua:** lähdekohtainen lisenssitarkistus, data-QA (homonyymit, taivutus, käännössuunta, IPA), lähdeviitteiden näyttö ja hakukuorman testit; erillinen hyväksyjä kirjataan kantaan.
- **Jos importti epäonnistuu:** osittain lisätty lähde pysyy julkaisemattomana. Älä tee automaattista `DROP`, `TRUNCATE`, `CASCADE` tai käyttäjän datan nollausta. Korjaus tai lähde-ID:n puhdistus tehdään vasta erillisen tietokantaraportin ja varmuuskopion perusteella.
- **Jos API ei vastaa:** LOS!:n nykyinen paikallinen kappalesanasto jää toimivaksi ja uusi näkymä kertoo sanakirjan puuttumisesta rehellisesti.
- **Vanha tallennus:** `los.local.v1.*`, `los_chapter_drafts`, tehtävä-, korostus- ja oppitunti-ID:t säilytetään täysin ennallaan.

**Ajettava julkaisupäätös:** vielä `BLOCKED`. Kumpikaan PR #200/#203 ei ole valmis yhdistettäväksi tuotantoon pelkkien vihreiden teknisten testien perusteella.
