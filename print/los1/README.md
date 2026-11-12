# LOS! 1 · B5-näköiskirjan PDF-tuotannon perusteet

Tämä on **C01:n 15 luonnoslehden tekninen tuotantopolku**, ei julkaistu painos.
Paperin koko on masterplanin mukainen 176 × 250 mm. Nykyisen React-näköiskirjan
`Los1FacsimilePilot` muodostaa samasta kirjadatajoukosta sekä selausnäkymän
että erilliset tulostuslehdet. PDF-vienti ottaa olemassa olevan
`.los-facs-print-only`-lehden, ei luo uutta ristiriitaista C01-tekstiä.

## Paikallinen PDF-vienti

1. Asenna projektin lukitut riippuvuudet ja testiselaimet:
   `bun install --frozen-lockfile`, `bun run e2e:install` ja
   `bunx playwright install chromium`.
2. Käynnistä toisessa terminaalissa `bun run dev -- --host 127.0.0.1 --port 5173`.
3. Vie luonnos: `node scripts/los1-facsimile-export.mjs`.
4. Asenna `poppler-utils` ja tarkista:
   `node scripts/los1-facsimile-pdf-preflight.mjs`.
5. Tutki jokainen PDF-sivu myös visuaalisesti. Automaatio ei huomaa jokaista
   ladonnan, tavutuksen, tekstin katkeamisen tai kuvien ongelmaa.

Oletuspolku on `.artifacts/los1/LOS1_C01_B5_TAITTOLUONNOS.pdf`
(vain paikallinen tiedosto, ei osa julkaistua kirjan aineistoa).
Tarvittaessa ympäristömuuttujat:
`LOS1_FACSIMILE_BASE_URL` (käynnissä olevan LOS!-sivuston osoite) ja
`LOS1_FACSIMILE_PDF_OUTPUT` (paikallinen ulostulotiedosto).

## Mitä testit osoittavat?

- Chromium on pystynyt **tuottamaan** PDF-tiedoston nykyisen näköiskirjan
  sisällöstä (ei kuvakaappausten sarjaa).
- Poppler toteaa 15 fyysistä lehteä ja oikean B5-sivukoon.
- `pdftotext` saa palautettua autenttisen tekstin ja opetuksen otsikoita
  valittavana tekstinä.
- Yksi sivu muunnetaan PNG-kuvaksi teknisen renderöinnin tarkistamiseksi.

Nämä ovat teknisiä portteja. Lähteiden lisenssi, alkuperäisen median toimivuus,
saksan kieli, tyylin oikeellisuus ja todellinen painosivutus eivät tule
hyväksytyiksi vain siksi, että tekninen testikomento onnistuu.

## Julkaisurajat

- Ei yhdistettyä C01–C10-kirjaa, virallisia painettuja sivunumeroita,
  automaattista ladattavaa PDF-linkkiä eikä PDF.js-tuotantolukijaa vielä.
- PDF:lle ei ole rakennettu leikkuuvaraa, sidontamarginaalien lopullista
  mitoitusta, ICC/CMYK-profiilia tai painotalon PDF/X-vahvistusta.
- Ei julkaista PDF:ää GitHubin julkisena artefaktina tai sovelluksen
  avoimessa URL-osoitteessa ennen käyttöoikeus- ja laatuportteja.
- Visuaalinen viimeistely ja sivukartan lukitus tehdään ennen
  `print-ready`-merkintää. Vivliostyle/PDF.js ovat edelleen
  masterplanin seuraavassa vaiheessa arvioitavia ratkaisuja.

## Lopullisen julkaisun suunniteltu polku

`hyväksytty sisältöversio → sivutusmoottori → lukittu PDF + sivukartta
→ PDF-pohjainen näköiskirjalukija → erillinen painotalon esikatselu`.

Nykyinen Playwright-exportti on toteutuksen **todennettava välivaihe**.
