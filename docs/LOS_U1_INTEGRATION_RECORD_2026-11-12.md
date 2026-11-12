# LOS! U1.0 – integraation tekninen loki (12.11.2026)

Tämä on toteutusloki, ei uusi masterplan eikä julkaisuvalmiuden hyväksyntä.

- Pohja: main `88d1279411ce4030cf3065b6d296d71ee9855eb2`; näköiskirjan PDF.js-tekniikka (#206) pysyy muuttumattomana.
- Lukija: PR #207 HEAD `0668cb8e20647986da3d478568fd6fcb3de592d1`. GitHub-vertailun mukaan tämä sisältää PR #200 HEADin `10c3700b13f321c59b25a06476533d0e5d4f0b85` kokonaan, kuusi lisäcommittia.
- Sanakirja: PR #203 HEAD `42656d02c4b452df8e101f1c4cfe21f67fc60d11`. Tämän SHA:n PostgreSQL 17 `postgres-search-smoke`, parseri/lisenssit, FreeDict-lähdetesti, selain-QA ja TypeScript/build ovat läpäisseet omat CI-ajonsa. Yhdistelmän testit vaaditaan erikseen.
- Yhteentörmäys `LosBook.tsx`: #207:n sisältöpuu, sanakortti ja rinnakkaistehtävät säilytetty; mainin #206 `facsimile-pdf`-osoite, `Los1PdfReader`, PDF-navigaatio ja pilotin PDF-avaus palautettu samaan komponenttiin.
- Yhteentörmäys `e2e/los-full-book.spec.ts`: #207:n selaintestit säilytetty, #203:n julkaistun sanakirjahaun ja paikallisen sanaston erottava testi lisätty loppuun.
- `LosReferenceTools.tsx` käyttää #203:n hakua ja säilyttää paikallisen kappalesanaston. LOS!:n muut järjestelmät ja käyttäjän nykyiset tallennusavaimet on jätetty ennalleen.
- #189:n G1–G8-julkaisumittaristoa ei sisällytetty: R1–R12:n suhde vaatii tarkoituksellisen yhtenäistämisen.
- Uudet sanakirjataulut ovat vain lähteistetyn staging-/julkaisuportin koodia. Tuotantokannan migraatiota, importtia tai julkaisemista ei ole suoritettu. `RELEASED_LOS1_EDITION = null` pysyy koskemattomana.
- C01:n puuttuva fraasi-IPA, asiantuntijahyväksynnät, ihmisäänitteet, laitteiden TTS-testaus ja koko kirjan sisällöllinen hyväksyntä ovat yhä avoimia.

**Ennen mergeä:** integroidun haaran TypeScript, build, PostgreSQL 17, selain-QA, PDF-reitit, tallennusregressiot ja tietoturvaportit. Testien puuttuminen tai ohittaminen ei ole hyväksyntä.
