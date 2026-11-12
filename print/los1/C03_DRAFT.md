# LOS! 1 · C03 Woher kommst du? · B5-taittoluonnos

**Tila:** 14 luonnoslehteä, **ei hyväksyttyä painettua sivunumeroa**,
ei julkaistua PDF-tiedostoa. Sivumäärä koskee vain tätä kappalepilottia.

## Sisältöjärjestys (ei lopullinen koko kirjan sivutus)

| Luonnoslehti | Sivun sisältö |
|---|---|
| 1–2 | Kaksisivuinen avaus, tavoitteet, kuvan odotuspaikka |
| 3 | Text A: Lisa Müller, M-WB-07, **kaikki kahdeksan alkuperäistä repliikkiä** |
| 4 | Text A:n neljä lähdeperustaista ymmärtämiskysymystä |
| 5 | Kappaleen alkuperäinen 17 kohdan aktiivisanasto |
| 6 | Woher kommst du?, ich komme, du kommst, aus + maa |
| 7 | Text B: M-COM-02, **kaikki neljä alkuperäistä repliikkiä** |
| 8 | Text B:n neljä uudelleen käytettyä C02:n kertauskysymystä |
| 9–10 | Tehtäväpankin C03-EX-01–11 |
| 11 | Soveltavat omat lähtöpaikkaa koskevat lauseet ja kirjoitustila |
| 12 | DACH-kulttuuriteksti ja kolme kulttuurikysymystä |
| 13 | Tehtäväpankin C03-EX-12–15 |
| 14 | Lähteet, lisenssitiedot ja avoimet julkaisuportit |

Kaikki tehtävät ja alkuperäistekstit tulevat **samoista lähdemoduuleista kuin
digikirjassa**. Text A:ssa olevat `Sie`-muodot ovat tunnistustasolla;
teitittelyn aktiivinen opetus kuuluu C04:ään. C03:n aktiivinen
`du kommst` opetetaan erillisenä LOS!-mallilauseena, ei
väitetä kahdeksan repliikin alkuperäistekstin sanamuodoksi.

C03:n Text B on C02:ssa jo käytetty `M-COM-02` (Ariser, 2011,
CC BY-SA 3.0), eikä sille tehdä väärää uutta lähdetunnistetta.
DW:n videota `V-DW-03` ei ole lisätty tai väitetty valmiiksi;
tiedoston käyttöoikeus sekä toisto puuttuvat.

## Lähteet

- Text A: `M-WB-07`, BLL German/A1/Lesson 2, sivuversio 4581896,
  Wikibooks contributors, CC BY-SA 4.0.
- Text B: `M-COM-02`, Wikimedia Commons,
  Deutsch Dialog . Ich bin Peter.ogg, Ariser, CC BY-SA 3.0.
- Kulttuuriosio: nykyinen `LOS1_CULTURE["03"]`-sisältö
  lähdemerkintöineen.

Lähdemanifestin mukaan Text A:n kieli- ja tasotarkistus,
laite- ja mediahyväksyntä sekä julkaisuportti ovat vielä auki.
Todellista painokelpoista kuvamateriaalia ei ole tässä pilotissa.

## PDF-tuotanto vain kehityskäyttöön

Paikallisessa kehitysympäristössä (kun LOS! on käynnissä portissa 5173):

```sh
LOS1_FACSIMILE_CHAPTER=03 node scripts/los1-facsimile-export.mjs
LOS1_FACSIMILE_CHAPTER=03 node scripts/los1-facsimile-pdf-preflight.mjs
```

Tarkistettava paikallinen tulos:
`.artifacts/los1/LOS1_C03_B5_TAITTOLUONNOS.pdf`.

GitHub Actions tarkistaa PDF:n **14 fyysiseksi B5-sivuksi**, sen
haettavan tekstikerroksen sekä Playwrightin sivunvaihto- ja hakutoiminnot.
Kaikkien sivujen visuaalinen, tekstin ylivuodon ja median toimituksellinen
arviointi on vielä erillinen hyväksyntäportti. PDF:tä ei julkaista sivuston
avoimessa hakemistossa tai Githubin julkisena artefaktina.

**C01 + C02 + C03 eivät ole vielä yksi yhtenäinen julkaistu kirja.**
Niiden PDF-indeksit ovat kappalekohtaisia kehityssivuja, eivät koko LOS! 1:n folioita.
