# LOS! 1 C01 · PDF.js-lukijan ensimmäinen toteutus

## Tila

LOS! 1:n oma reitti #/1/facsimile-pdf käyttää samaa
käyttäjän laitetunnistusta kuin koko LOS!-oppikirja. Kyseessä on
**paikallisen C01-PDF-taittoluonnoksen esikatselulukija**.

Aiempi #/1/facsimile (HTML-pohjainen taittopilotti) säilyy.
Kumpikaan ei ole hyväksytty julkaistu näköiskirjapainos.

## Käyttö

1. Tuota C01-PDF paikallisessa kehitysympäristössä:
   node scripts/los1-facsimile-export.mjs.
2. Tarkista se: node scripts/los1-facsimile-pdf-preflight.mjs.
3. Avaa LOS! 1 → Näköiskirja → PDF.js-lukija (paikallinen PDF).
4. Valitse 15-sivuinen B5-PDF omalta laitteelta. PDF:n sisältö käsitellään
   selaimen muistissa. Tiedostoa ei lähetetä palvelimelle.
5. Käytä sivunvaihtoa, zoomausta, tekstin valintaa, hakua ja kirjanmerkkejä.
   Sivukartasta on linkit vastaaviin digikirjan C01-osioihin.

## Tekniikka

- pdfjs-dist@5.7.284:n legacy ESM -versio ja vastaava worker bundlataan
  projektin omaksi resurssiksi. Ulkoista CDN:ää ei käytetä.
- Luonnos tarkistetaan: 15 sivua, 176 × 250 mm ja C01:n alkuperäisen
  Text A -keskustelun tekstikerros. Muut PDF:t hylätään.
- PDF-sivut muodostetaan canvas-kerroksena, ja PDF.js:n TextLayer
  asetetaan päälle. Ruudunlukijalle kannattaa käyttää tavallista
  saavutettavaa HTML-digikirjaa, kunnes PDF-tagien auditointi on tehty.
- Kansilehti ja sisäkansi ovat erillisiä, siitä eteenpäin seuraavat
  todellisen C01-pilotin vasen/oikea-aukeamat.
- Kirjanmerkit tallennetaan laitteen omistajatunnuksen ja paikallisen PDF:n
  SHA-256-tiivisteen mukaan. PDF-tiedostoa ei tallenneta pysyvästi.
- Väärää tai hyväksymätöntä PDF:ää ei julkaista latauslinkkinä.

## Seuraavat julkaisun ennakkoehdot

Tämä ei vielä julkaise virallista tai painokelpoista kirjaa.
Julkaisua varten on tehtävä täydellinen sisältö- ja kuvien oikeustarkistus,
kaikkien sivujen visuaalinen preflight, painosivukartan lukitus,
tuotantotiedoston eheystarkistus ja turvallinen saman alkuperän PDF-jakelu.
Sen jälkeen lukija voidaan avata hyväksyttyyn PDF:ään ilman tiedostovalintaa.