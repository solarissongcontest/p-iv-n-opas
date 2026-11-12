# LOS! 1 · koko kirjan painosrekisteri ja automaattinen PDF-avaus

**Tila 12.11.2026: JULKAISU ESTETTY.** Näköiskirjan C01-pilotin 15 sivua
ovat todellinen tekninen taittoluonnos. C01–C10-julkaisusta ei ole
lukittua, oikeuksiltaan hyväksyttyä painettua PDF:ää.

## 1. Käyttöön lisätty rakenne

- `src/features/los/facsimile/los1/fullBookOutline.ts` luettelee
  LOS! 1:n kymmenen kappaletta, niiden kymmenen osiota sekä alku-/loppu-
  osiot, kertaukset, välikokeen ja loppukokeen **ilman sivunumeroita**.
- Jokaisen kappaleen Text A:n ensisijaisen lähteen julkaisutila luetaan
  nykyisestä `content/sourceRegistry.ts`-moduulista, ei käsin keksitystä
  statusmerkinnästä.
- `editionRelease.ts` on valmis muuttumattoman koko kirjan PDF-painoksen
  tietosopimus, validointi ja SHA-256-varmistettu latausrutiini.
- `Los1PdfReader.tsx` käyttää yhä paikallista PDF-tiedostoa C01-pilottia
  varten. **Jos julkaistu painos joskus määritellään ja läpäisee portit**,
  lukija osaa avata sen automaattisesti kirjautumisen vaativalta API-reitiltä
  sekä käyttää sen aitoa sivukarttaa, aukeamia ja kappaleankkureita.
- Luonnoksen selaaminen ei merkitse harjoitusta tai koetta suoritetuksi.

## 2. Pakollinen hyväksyntä ennen julkaisua

Seuraavia ei saa kuitata automaattisesti:

1. Kaikki C01–C10:n oikeat tekstit, sanastot, tehtävät ja alkuperäiset
   keskustelut ovat mukana ja saksan kieli sekä oppimistavoitteet tarkistettu.
2. Tekstien, kuvien, äänitteiden, videoiden ja fonttien käyttöehdot
   hyväksyvät juuri kyseisen digitaalisen levityksen.
3. Oikea B5-painotaitto (176 × 250 mm), kaikki fyysiset sivut,
   sidontapariteetit, hakemistot, ratkaisut ja attribuutiot ovat valmiit.
4. Koko PDF on käyty sivu sivulta läpi kuvina sekä teknisesti:
   PDF-indeksit, näkyvä painettu numerointi ja digikirjan
   `contentBlockId`-ankkurit vastaavat toisiaan.
5. PDF:n valittava tekstikerros, saavutettavuus ja mobiili-/desktop-testit
   ovat hyväksyttyjä; varmistetut sivut eivät leikkaudu tai mene päällekkäin.
6. Painoksen metadata sekä lähdemanifesti lukitaan samaan
   `editionId` + `contentReleaseId` -versioon.
7. Käyttäjän tunnistautuminen ja pääsyoikeus toteutetaan **palvelimessa**
   ennen PDF-tiedoston lähettämistä. Pelkkä React-reitin piilottaminen
   tai samasta alkuperästä tuleva URL ei ole pääsynhallintaa.

## 3. Suojatun PDF-palvelun sopimus

Kun palvelinreitti on toteutettu ja hyväksytty, painos ladattaisiin
osoitteesta:

`/api/los1/facsimile/editions/{editionId}/screen.pdf`

Palvelimen on varmennettava käyttäjä ja oikeus juuri kyseiseen kirjaan.
Sen on palautettava HTTP 200 ja `Content-Type: application/pdf`, eikä
sillä saa paljastaa työkirjoja avoimen `public/`-hakemiston kautta.

Lukija noutaa tiedoston `credentials: include` + `cache: no-store`
-asetuksilla, tarkistaa hyväksytystä painosrekisteristä sen tarkan
tavumäärän ja SHA-256:n sekä varmistaa PDF-sivujen määrän, B5-koon ja
hyväksytyn sivukartan. Jos yksikin poikkeaa, painosta ei näytetä.

## 4. Rekisterin aktivointi

`RELEASED_LOS1_EDITION` on tällä hetkellä tarkoituksella `null`.
Tämä on oikea tila: manifestin tutkimustila ei tarkoita lupaa julkaista.

Vasta kun kaikki edellä mainitut portit ovat oikeasti toteutuneet,
luodaan pysyvä `Los1PublishedEdition`-tietue, jossa ovat:
`editionId`, `contentReleaseId`, sivukartta, sen versio, julkaisupäivä,
tarkat sivut, API-polku, tiedoston SHA-256 ja toimitukselliset hyväksynnät.

**Älä muunna C01:n 15-sivuista luonnosta keinotekoiseksi
208–256-sivuiseksi PDF:ksi, äläkä luo keksittyjä painettuja sivunumeroita.**
208–256 on masterplanin arvio, ei valmiin painoksen todellinen sivumäärä.

## 5. C01:n status

Vanha C01-luonnos:
- PDF-vienti ja 15 B5-sivun preflight toimivat
- PDF.js-lukija ja tekstikerros on testattu
- paikallinen PDF valitaan vielä käyttäjän omalta laitteelta
- se ei ole painovalmis, koko kirjan lopullinen näköisversio eikä
  oikeuksien puolesta valmis automaattisesti jaettavaksi.

Kun oikea koko kirjan julkaisu hyväksytään, sen versiotunnus ja
sivukartta korvaavat luonnoksen viitteet. Vanha C01-taittopilotti
voidaan säilyttää kehitysesikatseluna, mutta sitä ei nimetä
julkaistuksi painokseksi.
