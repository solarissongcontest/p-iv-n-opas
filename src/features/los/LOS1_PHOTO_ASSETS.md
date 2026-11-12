# LOS! 1:n digikirjan kuvat · paikalliset julkaisuversiot

**Tilanne:** 10 valittua Pexels-valokuvaa, 20 paikallisesti tarjottavaa optimoitua
WebP-tiedostoa. Erillistä näköiskirjaa ei ole, eikä sitä oteta uudelleen käyttöön.

## Käyttö

Kuvat näytetään **vain LOS! 1:n omissa digitaalisissa kappaleavauksissa**.
Kappaleet C01–C10 käyttävät yksilöityä, aiheen mukaista kuvaa.

- Leveälle näytölle: `LOS1-Cxx-<Pexels-ID>-desktop.webp`, 1440 × 630 px.
- Kapealle mobiilinäytölle: `LOS1-Cxx-<Pexels-ID>-mobile.webp`, 720 × 540 px.
- `<picture>` valitsee oikean tiedoston CSS-mediaehdon mukaan.
- Kuvan todellinen lähde ja valokuvaajan nimi näkyvät kuvatekstissä.
- Jos kuva ei avaudu, sivulla säilyy luettava, teemaan liittyvä
  tekstivastine ja kuvituksen selite.
- Kannen ja LOS! 1:n etusivubannerin nykyisiä kuvia ei muuteta.
- Kuvia ei pidä väittää alkuperäisissä saksankielisissä dialogeissa
  esiintyvien ihmisten tai ympäristöjen valokuviksi.

## Tiedostojen todennus

Lähdekuvien nimet, Pexels-kuvasivut, tiedostojen SHA-256-tiivisteet ja
lopulliset WebP-mitat ovat **automaattisesti muodostetussa** tiedostossa

`public/los/chapters/sources-manifest.json`.

Kaikki 20 kuvaa sijaitsevat `public/los/chapters/`-hakemistossa.
Lukija ei tarvitse ulkoista kuva-CDN:ää ladatakseen kuvia.

`tests/los1-digital-photography.test.ts` tarkistaa, että
kaikki paikalliset kuvat löytyvät ja niiden tavut vastaavat manifestin
tarkkoja SHA-256-tiivisteitä. `e2e/los-full-book.spec.ts` tarkistaa
että kuvat oikeasti avautuvat mobiilissa ja tietokoneella.

## Lisenssi ja kuvattujen henkilöiden yksityisyys

Lähde: [Pexelsin kuvien käyttöehdot](https://www.pexels.com/license/).
Pexels sallii kuvat verkkosivuilla, sovelluksissa ja kirjoissa.
Käyttö ei saa antaa ymmärtää, että valokuvissa näkyvät henkilöt,
yritykset tai tavaramerkit tukisivat LOS!-oppikirjaa.

Kuvien käyttö on osa saksan opetusta, ei kuvien erillistä kauppaamista
tai kuvapankkina tarjoamista. Kuvaajien nimet ja lähdekuvien sivut on
säilytetty kappaleiden kuvituksessa, vaikka Pexelsin peruslisenssi ei
yleensä vaadi nimeämistä.

## Ylläpito

Kuvien optimoija on `scripts/los1-optimize-chapter-photos.py`.
Se käyttää vain nykyisen LOS! 1:n kuvarekisterin 10 jo käsin valittua
Pexels-kuvatunnistetta. Se ei hae tai indeksoi kuvapankkia laajemmin.

Jos kuvitusta vaihdetaan, päivitä ensin
`src/features/los/los1ChapterPhotos.ts` (valittu Pexels-ID,
kuvaaja, lähdesivu ja vaihtoehtoteksti). Tarkista lisenssin ja mahdollisen
tavaramerkin tai kuvatun henkilön oikeuksien soveltuvuus.
Luo kuvat uudelleen erillisellä optimoijalla ja katselmoi erityisesti
kasvojen rajaus kummassakin näkymässä ennen hyväksyntää.

**Älä tuo takaisin** PDF.js-lukijaa, painotaittoeditoria tai
näköiskirjan sivunvaihtomekanismia ilman uutta nimenomaista tuotevaatimusta.

## Kulttuurisivujen seitsemän erillistä kuvaa

Kulttuurisivut eivät käytä automaattisesti kappaleiden avauskuvia. Käytössä
ovat seitsemän todellista ja alkuperäislähteeseen linkitettyä Pexels-valokuvaa:

| Kappale | Kuvan aihe | Pexels-ID | Kuvaaja |
|---|---|---|---|
| C01 | Hampurin satama | 29250831 | Naimish Verma |
| C03 | Wienin katunäkymä | 6063650 | Anton Uniqueton |
| C03 | Thunin järvimaisema | 32379758 | Jean-Paul Wettstein |
| C04 | Berliinissä kuvattu asiakaspalvelutilanne | 6925914 | Tom Tillhub |
| C07 | Düsseldorfer Straße -katukyltti ja ß | 30125064 | Markus Winkler |
| C08 | Luokkahuone, ei maantieteellistä väitettä | 5427660 | Tima Miroshnichenko |
| C09 | Kalenteriin kirjoittaminen, ei maantieteellistä väitettä | 6170644 | RDNE Stock project |

Kaikista seitsemästä on paikallinen WebP-kuva sekä tietokoneelle (1024 × 640)
että mobiiliin (720 × 540). Niiden alkuperäisosoitteet, kuvalähteiden
tiivisteet sekä 14 lopullisen WebP-kuvan SHA-256-tiivisteet ovat tiedostossa
`public/los/culture/sources-manifest.json`. Tarvittaessa kuvat voi luoda
uudelleen komennolla `python scripts/los1-optimize-culture-photos.py`.

**Kulttuurinen tarkkuus:** C04:n asiakaspalvelutilanteesta ei voi tietää
käyttävätkö henkilöt du- vai Sie-muotoa. C07:n autenttisessa Düsseldorfer
Straße -kyltissä näkyy ß. C09:n kalenterikuvaa ei ole paikannettu Saksaan,
eikä sen kalenterimerkintöjä esitetä saksankielisinä. Kaikki kolme
Bildimpuls-harjoitusta viittaavat omaan kulttuurikuvaan, eivätkä toista
kappaleen avauskuvaa. Kuvien osalta ei tehdä oletuksia todellisten
henkilöiden identiteetistä tai kuvattujen henkilöiden kannatuksesta LOS!:lle.
