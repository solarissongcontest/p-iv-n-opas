# LOS! · Suojattu manuaalinen pilvisynkronointi ja varmuuskopiot

Tämä ominaisuus on **ehdollisesti käyttöön otettava**. Se ei aktivoidu pelkällä frontend-muutoksella, koska nykyinen Opintopäiväkirjan laitetunnistus käyttää käyttäjänimeä `Arthur` ilman erillistä vahvaa sisäänkirjautumista.

## Uhkamalli ja ratkaisu

Nykyinen `POST /api/device-auth` myöntää laitteen Supabase-JWT:n käyttäjänimellä. Tätä JWT:tä **ei pidetä riittävänä todisteena** yksityisiin LOS!-pilvitallennuksiin. Vanhat Opintopäiväkirjan tietokantataulut ovat eri asia; tämän ominaisuuden toteutus ei korjaa niitä.

LOS!-pilvidraftit:
- säilytetään uudessa `public.los_chapter_drafts`-taulussa;
- taululla on RLS päällä, ja `anon`- ja `authenticated`-rooleilta on poistettu kaikki oikeudet; käyttäjän JWT:llä ei voi käyttää taulua suoraan PostgREST:n kautta;
- kulkevat vain `GET/PUT /api/los-sync` -palvelinreitin kautta;
- pääsy edellyttää sekä voimassaolevan palvelimen allekirjoittaman laite-JWT:n että **erillisen server-only `LOS_SYNC_PASSPHRASE`-salaisuuden**;
- salaisuutta ei tallenneta localStorageen eikä lähetetä sovelluksen normaaleissa tietokantakutsuissa. Se pysyy ainoastaan nykyisen selainvälilehden JavaScript-muistissa ja kulkee HTTPS-palvelinpyynnön erillisessä otsakkeessa;
- tietueiden omistaja otetaan varmennetun JWT:n `sub`-kentästä, ei selaimen JSON-rungosta;
- kirjoitukset ovat tarkasti versioituja (revision) ja ehdollisia. Jos palvelimella on eri revisio, palvelin vastaa 409 eikä korvaa toisen laitteen tekstiä;
- salasanan pituuden minimiraja on 24 merkkiä. Suositaan satunnaista ainutkertaista salasanaa.

**Tärkeä:** tämä suojaa uuden LOS!-taulun erillissalaisuudella. Se ei vielä korjaa Opintopäiväkirjan laitetunnistuksen yleistä haavoittuvuutta. Se vaatii erillisen, taaksepäin yhteensopivan sisäänkirjautumisen uudistuksen. Salaista arvoa ei pidä sijoittaa julkiseen `VITE_*`-ympäristömuuttujaan.

## Käyttöönotto palvelimella

1. Lisää migraatio `supabase/migrations/20261111133000_los_protected_chapter_drafts.sql` Opintopäiväkirjan **oikeaan** Supabase-projektiin. Varmista rakenteen, oikeuksien ja RLS:n toteutuminen.
2. Määritä Vercelissä vain palvelimelle `LOS_SYNC_PASSPHRASE` vähintään 24 merkin pituisena. Säilytä salasana turvallisesti; älä koskaan lisää sitä GitHubiin tai `VITE_`-prefiksillä.
3. Varmista jo käytössä olevat `SUPABASE_URL`, `SUPABASE_SECRET_KEY` ja `SUPABASE_JWT_SECRET` ovat käytettävissä palvelimella.
4. Julkaise päähaara ja testaa `GET/PUT /api/los-sync`: ilman avainta 401/503, toisella avaimella 401, oikealla avaimella ja tokenilla read/write, vanhentuneella revisiolla 409.
5. Testaa kahdella eri laitteella ja oikealla selainistunnolla. **Älä väitä tuotantosynkronointia käyttöönotetuksi ilman näitä testejä.**

Jos salasana puuttuu, endpoint vastaa 503 ja paikalliset muistiinpanot toimivat entiseen tapaan. Migraation tai ympäristömuuttujan puuttuminen ei saa estää oppikirjan lukemista.

## Käyttö opiskelijalle

- Avaa LOS! 1:n kappale ja kirjoita muistiinpanot tai vastaa harjoituksiin kuten ennenkin.
- Kappaleen muistiinpanoissa on **Pilvisynkronointi**. Anna erillinen pitkä synkronointisalasana, jonka olet määrittänyt palvelimelle.
- Paina **Synkronoi nyt**. Tämä on manuaalinen, ei jatkuva automaattinen taustatallennus.
- Toisella laitteella avaa sama kappale, anna sama salasana ja paina Synkronoi.
- Jos laitteiden vastaukset poikkeavat eikä kumpaakaan voi turvallisesti pitää ainoana uutena, sovellus pyytää nimenomaisen valinnan. Korvauksen yhteydessä edellinen versio tarjotaan ladattavana JSON-varmuuskopiona.

Vara- ja siirtotapa ilman pilveä: avaa **LOS! 1 → Kirjan liitteet → Varmuuskopiot**. Vie JSON-tiedosto toisella laitteella ja tuo toisella. Olemassaolevien kappaleiden korvaaminen vaatii erillisen vahvistuksen ja edellisen kirjan varmuuskopion latauksen.

## Tiedon rajat

Pilvitallennus käsittelee kokonaiset kappaleen opiskelu- ja kirjoitusluonnokset. Yksittäinen tietue saa olla korkeintaan 64 KiB. Tallennus ei sisällä äänitiedostoja, eikä se väitä tarjoavansa päästä päähän -salausta. Vain server-only avain tarkistaa luvan ja kysyy tietoa yksityisestä Supabase-taulusta. Välimuistissa oleva tai tietokannasta palautettu tietue validoidaan ennen kuin sitä käytetään selaimessa.

## Keskeneräistä

- Täysin automaattinen offline-jono + synkronointi ja kolmitie-mergen hienojakoinen konfliktinratkaisu.
- Vahva, laitteita sitova käyttäjän kirjautuminen koko Opintopäiväkirjaan; nykyinen käyttäjänimeen perustuva JWT on edelleen vaarallinen.
- Avaimen vaihto, revokointi, käyttöloki, palvelinpuolinen rate limit ja tuotannon sovellustason E2E.
- Varmentaminen julkisessa tuotanto-osoitteessa Vercelin julkaisuesteen poistamisen jälkeen.
