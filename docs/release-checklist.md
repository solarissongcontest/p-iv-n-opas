# Opintopäiväkirja – lopullinen release-checklist

Tämä checklist täydentää automaattista Final Release Gatea niissä kohdissa, joita GitHub Actionsin Linux-runner ei voi todentaa aidolla Apple-laitteella.

## Automaattinen portti

Seuraavien pitää olla vihreitä ennen kuin julkaisu katsotaan teknisesti hyväksytyksi:

- lint
- unit/regression tests
- TypeScript
- production build
- Vercel commit identity
- iPhone WebKit smoke
- desktop production smoke
- deep links
- axe / WCAG serious+critical
- Gemini production provider
- push backend / VAPID / cron protection
- offline → reload → online → second-device sync
- responsive visual layout matrix 320–1440 px

## Fyysinen iPhone / iPad

Aja vähintään kerran merkittävän UI- tai notification-muutoksen jälkeen.

### VoiceOver

1. Ota VoiceOver käyttöön.
2. Avaa Opintopäiväkirja Home Screen PWA:na.
3. Tarkista päänavigaatio: Tänään, Suunnitelma, Opinnot, Harjoittelu, Edistyminen.
4. Tarkista Lisää-sheet, Haku ja Asetukset.
5. Aloita harjoittelu ja varmista, että tehtävä, vastauseditori, vihje ja Tarkista vastaus ovat saavutettavissa oikeassa järjestyksessä.
6. Avaa Kokeet ja koeharjoitus.
7. Varmista, ettei focus jää Liquid Glass -kontrollien tai bottom barin alle.

Hyväksyntä: kaikki keskeiset toiminnot ovat käytettävissä ilman näkemiseen perustuvaa arvaamista.

### Web Push

1. Asenna PWA Home Screenille.
2. Asetukset → Muistutukset → Ota käyttöön.
3. Käynnistä GitHub Actionsin Final Release Gate käsin asetuksella `send_push_test=true`, tai käytä sovelluksen Lähetä testimuistutus -painiketta.
4. Sulje PWA.
5. Varmista, että ilmoitus saapuu taustalla.
6. Avaa ilmoitus.
7. Varmista, että deep link avaa oikean Opintopäiväkirja-näkymän.

Hyväksyntä: provider hyväksyy viestin, käyttöjärjestelmä näyttää ilmoituksen ja deep link toimii.

## Kahden laitteen tarkistus

Automaattinen cross-device-testi kattaa palvelin- ja offlineketjun. Merkittävän synkronointimuutoksen jälkeen tee lisäksi nopea fyysinen tarkistus:

1. muuta yksi asetus puhelimella
2. avaa sovellus tietokoneella
3. varmista muutos ilman uudelleenkirjautumista
4. tee tietokoneella uusi opiskelukirjaus
5. varmista puhelimelta
6. testaa kerran offline → online

## Hyväksyntä

Release on valmis, kun automaattinen Final Release Gate on vihreä ja mahdolliset laitekohtaiset checklist-kohdat on suoritettu muutostyypin mukaan.
