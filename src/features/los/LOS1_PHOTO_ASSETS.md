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
