# LOS! U1.0 – PR #209:n integraatioloki (12.11.2026)

**Tila:** tekninen integraatiokandidaatti. Ei vielä julkaisu- tai yhdistämishyväksyntää.

- Lähtö: PR #209 HEAD `7c15944770f6bb73b4578e5356950a6ddd360ace`.
- Uusin päähaara: `627d157452d3c801a6260771e0df8919ae9685ec`. Seitsemän lähteistettyä kulttuurikuvaa 14 WebP-versioineen on tuotu integraatiohaaraan Git-objekteja säilyttäen, eikä niitä ole ladattu uudelleen. Lisäksi säilyivät kaikki 20 aiempaa kappalekuvaa ja kymmenen Bildimpuls-harjoitusta.
- Tuotepäätös: PR #212:n mukainen vain interaktiivinen digikirja. Poistettiin 41 aiempaa näköiskirja-, B5-, PDF.js-, export- ja testitiedostoa; myös turha `pdfjs-dist` poistettiin `package.json`- ja `bun.lock`-tiedostoista. Git-historia säilyy.
- Vanhat `/los#/1/facsimile*`-hashit ohjautuvat `#/1/overview`-digikirjaan. Ei opiskelutietojen tai tallennus-ID:iden muutoksia.
- Säilytetty: PR #207:n hierarkkinen sisältöpuu, syvälinkit, pysyvät asetukset, Kirja + tehtävät, C01-kielioppia ja IPAa hyödyntävä sanakortti sekä TTS-fallback; PR #203:n lähteistetty FreeDict/Wiktionary-tuonti, PostgreSQL 17 -skeema, haku, muotojen normalisointi ja julkaisun lähdeportit. PR #189 on edelleen erillinen luonnos eikä luo rinnakkaista G1–G8-portistoa.

## CI ja julkaisu

Aiempi HEAD `7c15944770f6bb73b4578e5356950a6ddd360ace` läpäisi [Quality Gate](https://github.com/solarissongcontest/p-iv-n-opas/actions/runs/43305230391), [Chromium + WebKit Browser QA](https://github.com/solarissongcontest/p-iv-n-opas/actions/runs/43305230023) ja [PostgreSQL/Importer QA](https://github.com/solarissongcontest/p-iv-n-opas/actions/runs/43305229959). Näitä tuloksia **ei lasketa uuden integraatio-HEADin läpäisyksi**. Seuraava uusi CI-ajo on tarkistettava erikseen.

Tuotantokantaan ei ole tehty migraatiota, tuontia, julkaisua eikä poistotoimenpiteitä. FreeDictin lähderivejä ei väitetä julkaistuiksi. C01:n IPA- ja äänitekysymykset sekä R1–R12:n sisällölliset hyväksynnät pysyvät avoimina.

## Erillinen ympäristötodennus, read-only 12.11.2026

- `bun`/Vite/TypeScript-työnkulku ja PostgreSQL 17 -sanakirjasmoke on tarkistettava aina **integraatio-HEADille**, ei aiempien PR:ien tuloksista. Tuotantokanta jätettiin muuttamatta.
- Vercelin deployment-historiassa preview-commit `d1863fabf03039252417d91e17ed64ffd0b9997f` on `READY`. Uuden yhdistelmäcommitin GitHubin Vercel-status ilmoitti `build-rate-limit`; tätä ei korjata muuttamalla opetuksen koodia.
- Vercelin tuotantohistorian viimeisin näkyvä `READY`-deployment on `93ae2d8517c6d290e5629421a7f80220c283dbf7`, ei nykyinen `main`. Siksi viimeisintä LOS!-koodia ei ole todistettu tuotantoon päivitettynä.
- Supabase-projektin `ukjfjxlqmqkxgaspdmdn` read-only-skeematarkistuksessa näkyi `los_chapter_drafts`, mutta **ei** uusia `los_dictionary_*`-tauluja. `los_chapter_drafts`: RLS käytössä; 0 policyä ja 0 selaimen anon/authenticated-grantia. Tämä ei ole tuotantotietojen muutos eikä vielä toimivan synkronoinnin todiste.
- CI:n FreeDict-TEI-tarkastuksen mittaus on de–fi **13 028**, fi–de **12 102** ja yhteensä **33 670 käännösvastinetta**; nämä ovat tiedostosta parsittuja vaiheistettuja rivejä, eivät PostgreSQL:ään ladattuja tai julkaistuja.
- C01 IPA-manifestissa **15/16 lähteistettyä**, **0/16 ihmisarvioitua**, **0/16 hyväksyttyä sanaäänitettä**, **0 todennettua fyysistä TTS-laitetta**. Puuttuva kokonaisfraasi on `Bis später!`.

## U2:n fyysisen testituonnin todiste
- [CI 43315746358](https://github.com/solarissongcontest/p-iv-n-opas/actions/runs/43315746358) vahvisti 25 130 lekseemiä, 26 637 merkitystä ja 33 670 käännöstä väliaikaisessa PostgreSQL-kannassa. 0 todellisessa tuotantokannassa ja 0 julkaistua.
- [GIN-indeksimuutos 84a67993](https://github.com/solarissongcontest/p-iv-n-opas/commit/84a67993cd1834c0a694f95f610d6ba45ef4c16f) todettiin EXPLAIN ANALYZE -hauissa. Testikannan SQL/CSV-tuonti ei todista Supabase REST -tuotantolataajaa tai tuotantokuormaa.
- Uusin main toi lisäksi C04-, C07- ja C09-kulttuurikuvat, yhteensä 14 kulttuuri-WebP:tä ja 20 kappale-WebP:tä. Alkuperäisiä opiskelun sisältö- ja tallennustunnisteita ei muutettu.
