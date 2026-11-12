# LOS! 1 · C04 Du oder Sie? · B5-näköiskirjan taittoluonnos

**Tila:** C04:n 16 B5-luonnoslehteä (176 × 250 mm). Tämä ei ole lopullinen
julkaisu, eikä 1–16 ole koko LOS! 1:n painettu sivunumerointi.

## Tarkka sisältöjärjestys

| Luonnoslehti | Sisältö |
|---|---|
| 1–2 | Kaksisivuinen avaus: Du oder Sie?, tavoitteet ja kuvapaikka |
| 3 | Text A: Herr Schmidt / Herr Standish, kaikki 8 alkuperäistä puheenvuoroa |
| 4 | Alkuperäistekstin 4 ymmärtämistehtävää |
| 5 | C04:n 16 kohdan aktiivisanasto |
| 6 | Sie ja du, heißen- ja kommen-verbien kohteliaat muodot |
| 7 | Sinuttelun ja teitittelyn täsmällinen rinnakkaisvertailu |
| 8 | Text B M-COM-03, alkuperäisluettelon ilmaukset 1–10 |
| 9 | Text B M-COM-03, alkuperäisluettelon ilmaukset 11–20 |
| 10 | Neljä rekisteriä ja kohteliaisuutta käsittelevää Text B:n kysymystä |
| 11–12 | C04-EX-01–09, alkuperäinen digikirjan tehtäväpankki |
| 13 | Soveltavat du- ja Sie-esittäytymisharjoitukset |
| 14 | Land und Leute: duzen / siezen, kolme lähteistettyä kysymystä |
| 15 | C04-EX-10–12: itsearviointi |
| 16 | Alkuperäislähteet, lisenssit, uudelleenkäyttö ja avoimet julkaisuportit |

## Lähdeuskollisuus

Text A: `M-WB-06`, `German/Lesson_2`, Wikibooksin vanha sivuversio
`3823654`. Koko Herr Schmidt–Herr Standish -dialogi säilyy.
Sen sanastossa esiintyy C04:n aktiivista tasoa vaikeampia rakenteita,
jotka opetetaan tunnistuksena eikä tässä vaadita itsenäiseen tuotantoon.

Text B: `M-COM-03`, German Men92:n `German Vocabulary - Greetings.ogg`,
julkinen domain. Tässä kirjassa näkyvät lähdemoduulista suoraan
**kaikki kaksikymmentä lausuttua tervehdys-/hyvästelyilmausta**.
Tämä ei ole keskustelu. Se on **sama lähde, joka oli jo C01:n Text B:ssä**,
mutta nyt sitä tarkastellaan du/Sie-tilanteiden näkökulmasta.

Land und Leute: nykyinen `LOS1_CULTURE["04"]` ja Dudenin
`Duzen oder Siezen?` -lähde. Kulttuuriset säännöt eivät perustu
pelkkään ikään; henkilön omat mieltymykset on huomioitava.

## Turvalliset rajaukset

- Valokuvien käyttöoikeuksia ei väitetä vahvistetuiksi.
- C04:lle ei luoda uutta omaa äänitettä tai feikkiä autenttista dialogia.
- Äänitteen iOS-/desktop-toistoa ja Text A:n pedagogista vaikeustasoa
  ei ole vielä hyväksytty julkaistavaksi.
- Painettu harjoitussivu ei tallenna vastauksia tai suorituspisteitä.
- Koko kirjan lopullista 208–256-sivuista PDF:ää ei ole olemassa.
  Tuo määrä on arvio, ei sidottu taittopäätös.

## Kehityskäyttöinen PDF-vienti

Kun paikallinen LOS!-kehityspalvelin toimii portissa 5173:

```sh
LOS1_FACSIMILE_CHAPTER=04 node scripts/los1-facsimile-export.mjs
LOS1_FACSIMILE_CHAPTER=04 node scripts/los1-facsimile-pdf-preflight.mjs
```

Tuloksena syntyy paikalliseen artefaktihakemistoon
`.artifacts/los1/LOS1_C04_B5_TAITTOLUONNOS.pdf`, jota ei ladata
julkiselle palvelimelle. PDF-vienti varmistaa 16 fyysistä B5-sivua,
tekstikerroksen ja olennaisten alkuperäis- ja opetustekstien esiintymisen.
Sivukohtainen visuaalinen hyväksyntä on edelleen erillinen toimenpide.
