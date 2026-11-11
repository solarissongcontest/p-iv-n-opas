# LOS! 3.3 — integroidun digioppikirjan käyttöliittymä

Toteutuskohde: \`src/features/los/\`, nykyinen \`/los\`-reitti. Tämä on **käyttöliittymäintegraatio**, ei väite että kaikki kahdeksan kirjaa tai LOS! 1:n autenttiset tekstit olisivat julkaisuvalmiit.

## Toteutetut osat

1. **Kirjan etusivu:** hyväksytyn 16:9-bannerin paikka vasemmalla, kansikuva, moduulitiedot ja aloittaminen oikealla. Pienellä näytöllä nimi ja toimintopainike näkyvät ennen banneria. Bannerin alkuperäinen kuva näytetään rajaamatta.
2. **Sisällysluettelo:** kirjan etusivu, kappaleet, avattavat kappalekohtaiset sivut (teksti, ymmärtäminen, sanasto, kielioppi, Text B, harjoitukset, soveltaminen, kulttuuri ja testi), koko kirjan työkalut. Hakusuodatin, Avaa kaikki, Sulje kaikki ja nykyisen sivun ilmaisu. Desktopin paneeli on suljettavissa; mobiilissa se on avattava laatikko.
3. **Teksti + tehtävät:** valinnainen rinnakkainen näkymä tekstin ja olemassa olevan \`LosWorkbook\`-harjoitteluosion välillä. Kapealla sisältöalueella palstat muuttuvat peräkkäisiksi. Erillistä tehtävätietokantaa tai vastausten kaksinkertaista instanssia ei luoda.
4. **Yhtenäinen ulkoasu:** 284 px sisältöpuu, rauhallinen valkoinen kirjasivu, kirjakohtainen aksenttiväri, kompakti yläpalkki, dark-mode-yhteensopivat pohjat ja mobiiliasettelu.
5. **Regressiot:** \`tests/los-v33-layout.test.ts\` suojaa bannerin näyttötavan, sisällysluettelon ja kaksipalstaisen tilan rakennetta.

## Julkaisuportit ja puuttuvat varat

- LOS! 1:n hyväksytyt kuvat ovat nyt GitHubin päähaaran tiedostoina: `public/los/los-1-cover.jpeg` ja `public/los/los-1-banner.jpeg`. Banneri säilyy 16:9-kuvasuhteessa eikä sitä rajata.
- Hyväksytty sanamerkki on toteutettu päähaaran Takota-fontilla. Fonttia ei jaeta ulos käyttäjälle. Muiden kirjojen puuttuvat kannet saavat olemassa olevan väliaikaisen tilan, eivät keksittyä kuvitusta.
- LOS! 1:n kaikki kymmenen kappaletta ja 147 omaa alkeisharjoitusta säilytetään. Puuttuvat alkuperäiset kokonaiset tekstit ja äänitteet merkitään erikseen keskeneräisiksi.
- Aineistojen lisenssi- ja laatutarkistus tehdään erillisen sisältösuunnitelman mukaisesti. Puuttuvaa alkuperäistekstiä ei vaihdeta keksittyyn tekstiin.
- Aloituspainike avaa kappaleen 1. Oikeaa viimeksi avattua sivua ei väitetä automaattisesti tunnistetuksi ilman varmennettua edistymistietoa.
- Harjoitusvastauksissa käytetään ennestään \`useLosChapterDraft\`-tallennusta. Tämä muutos ei käynnistä pilvisynkronointia eikä muuta identiteetti- tai käyttöoikeusmallia.

## Ennen tuotantoon yhdistämistä

Varmista GitHubin TypeScript-, build-, lint-, yksikkö- ja Playwright-selaintestien onnistuminen sekä mahdollinen Vercelin rakentamisrajoitus. Testaa pöytäkoneella lukija ilman banneria, banneri oikean tiedoston kanssa, mobiilivalikon kosketus/ESC-sulku ja tekstin sekä tehtävän yhteys. Älä julkaise ennen teknisiä portteja.
