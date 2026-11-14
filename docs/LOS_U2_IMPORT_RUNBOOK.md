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

## Eristetty PostgreSQL 17 -staging-QA (12.11.2026)

- [GitHub Actions #43315746358](https://github.com/solarissongcontest/p-iv-n-opas/actions/runs/43315746358) varmisti molempien FreeDict-TEI-lähteiden tarkistussummat, jäsensi NDJSON:n ja suoritti tuotantolataajan kuivan ennakkotarkistuksen.
- Erilliseen **kertakäyttöiseen** PostgreSQL 17 -kantaan ladattiin **25 130 lekseemiä**, **26 637 merkitystä** ja **33 670 käännöstä**. Kaikki lähteet pysyivät julkaisemattomina. Selainroolien pääsy raakatietueisiin estettiin, eikä julkaisematon haku palauttanut tietoja.
- QA:n Python/CSV/SQL-tuonti ei ole sama kuin Supabase-tunnuksia käyttävä todellinen `scripts/los-dictionary-load.mjs --write-staging` -tuotantolataus. **Tuotantokantaan ladattuja sanakirjarivejä 0, julkaistuja 0.**
- FreeDictistä saatiin **0 erillistä taivutusmuotoriviä** ja **0 IPA-ehdokasriviä**. Kaikki.org/Wiktionaryn iso aineisto, lisenssihyväksynnät ja kattavuustarkastus ovat edelleen auki.
- [Commit 84a67993](https://github.com/solarissongcontest/p-iv-n-opas/commit/84a67993cd1834c0a694f95f610d6ba45ef4c16f) muutti vaihtoehtoisten hakumuotojen ehdot GIN-indeksoitavaan muotoon. Kaksi EXPLAIN ANALYZE -mittausta vahvisti Bitmap Index Scan -haun (1,68 ms ja 1,66 ms); tämä ei ole tuotannon kuormitustesti.
- GitHub-artifakteihin ei lähetetä raakakorpusta tai väliaikaisen kannan dataa, vain lähdemanifestit. Julkaisuportit ja oikea varmuuskopion palautustesti pysyvät avoimina.

## Julkaisuportit ja palautus

- **Ennen mitään tuotantomigraatiota:** U0-varmuuskopio ja todellinen palautustesti. Tässä PR:ssä tietokantaan ei ole kirjoitettu opiskelijadataa.
- **Ennen sanakirjan latausta:** SQL-testaus PostgreSQL 17:llä, importer-testit, lisenssin ja lähde-version sekä dumpin todellinen SHA512. Ainakin CI:n `postgres-search-smoke`, `parse-and-license-gates` ja `freedict-source-inspection` tulee läpäistä.
- **Ennen julkaisua:** lähdekohtainen lisenssitarkistus, data-QA (homonyymit, taivutus, käännössuunta, IPA), lähdeviitteiden näyttö ja hakukuorman testit; erillinen hyväksyjä kirjataan kantaan.
- **Jos importti epäonnistuu:** osittain lisätty lähde pysyy julkaisemattomana. Älä tee automaattista `DROP`, `TRUNCATE`, `CASCADE` tai käyttäjän datan nollausta. Korjaus tai lähde-ID:n puhdistus tehdään vasta erillisen tietokantaraportin ja varmuuskopion perusteella.
- **Jos API ei vastaa:** LOS!:n nykyinen paikallinen kappalesanasto jää toimivaksi ja uusi näkymä kertoo sanakirjan puuttumisesta rehellisesti.
- **Vanha tallennus:** `los.local.v1.*`, `los_chapter_drafts`, tehtävä-, korostus- ja oppitunti-ID:t säilytetään täysin ennallaan.

**Ajettava julkaisupäätös:** edelleen `BLOCKED`. Yhteinen integraatio on PR #209, eikä PR #200/#203:n töitä avata uudelleen rinnakkaisina toteutuksina.
