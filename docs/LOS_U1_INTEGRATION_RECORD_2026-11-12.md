# LOS! U1.0 – PR #209:n integraatioloki (12.11.2026)

**Tila:** tekninen integraatiokandidaatti. Ei vielä julkaisu- tai yhdistämishyväksyntää.

- Lähtö: PR #209 HEAD `7c15944770f6bb73b4578e5356950a6ddd360ace`.
- Uusi päähaara: `94c08f823a748171e458ab57f5c8c527ad1bfb8f`. Sen neljä uutta, lähteistettyä kulttuurikuvaa kahdeksine WebP-versioineen on tuotu integraatiohaaraan Git-objekteja säilyttäen, eikä niitä ole ladattu uudelleen. Lisäksi säilyivät kaikki 20 aiempaa kappalekuvaa ja kymmenen Bildimpuls-harjoitusta.
- Tuotepäätös: PR #212:n mukainen vain interaktiivinen digikirja. Poistettiin 41 aiempaa näköiskirja-, B5-, PDF.js-, export- ja testitiedostoa; myös turha `pdfjs-dist` poistettiin `package.json`- ja `bun.lock`-tiedostoista. Git-historia säilyy.
- Vanhat `/los#/1/facsimile*`-hashit ohjautuvat `#/1/overview`-digikirjaan. Ei opiskelutietojen tai tallennus-ID:iden muutoksia.
- Säilytetty: PR #207:n hierarkkinen sisältöpuu, syvälinkit, pysyvät asetukset, Kirja + tehtävät, C01-kielioppia ja IPAa hyödyntävä sanakortti sekä TTS-fallback; PR #203:n lähteistetty FreeDict/Wiktionary-tuonti, PostgreSQL 17 -skeema, haku, muotojen normalisointi ja julkaisun lähdeportit. PR #189 on edelleen erillinen luonnos eikä luo rinnakkaista G1–G8-portistoa.

## CI ja julkaisu

Aiempi HEAD `7c15944770f6bb73b4578e5356950a6ddd360ace` läpäisi [Quality Gate](https://github.com/solarissongcontest/p-iv-n-opas/actions/runs/43305230391), [Chromium + WebKit Browser QA](https://github.com/solarissongcontest/p-iv-n-opas/actions/runs/43305230023) ja [PostgreSQL/Importer QA](https://github.com/solarissongcontest/p-iv-n-opas/actions/runs/43305229959). Näitä tuloksia **ei lasketa uuden integraatio-HEADin läpäisyksi**. Seuraava uusi CI-ajo on tarkistettava erikseen.

Tuotantokantaan ei ole tehty migraatiota, tuontia, julkaisua eikä poistotoimenpiteitä. FreeDictin lähderivejä ei väitetä julkaistuiksi. C01:n IPA- ja äänitekysymykset sekä R1–R12:n sisällölliset hyväksynnät pysyvät avoimina.
