# Opintopäiväkirja

Opintopäiväkirja on suomalainen Study OS, jonka ydinsykli on:

**suunnittele → opiskele → kirjaa → arvioi → mukauta suunnitelmaa**

Canonical production repository: `solarissongcontest/p-iv-n-opas`.

## Päänavigaatio

Mobiilin neljä pääkohdetta ovat:

- **Tänään** – yksi selkeä seuraava opiskelutoiminto
- **Opinnot** – kurssit, aiheet ja historia
- **Edistyminen** – nopea yhteenveto, osaaminen ja tarkempi analyysi
- **Lisää** – Suunnitelma, Harjoittelu, Kokeet, Kirjaa opiskelu, Haku ja Asetukset

**Suunnitelma** ja **Kokeet** ovat desktopilla näkyvässä suunnitteluryhmässä. **Harjoittelu** on ensisijaisesti toiminto, johon tullaan Tänään-näkymästä tai kurssikontekstista, mutta se säilyy myös suoraan saavutettavana Lisää-valikosta.

Mobiilissa käytetään neljän kohdan tab baria ja desktopilla sivupalkkia. Liquid Glass on rajattu navigaatio- ja kontrollikerrokseen.

## Route-arkkitehtuuri

Keskeiset osoitteet:

```text
/today

/plan
/plan/day/:date
/plan/week/:week
/plan/month/:month

/studies
/studies/:courseCode
/studies/:courseCode/content
/studies/:courseCode/history
/studies/:courseCode/analysis

/practice
/practice/:courseCode/:topicId

/progress
/progress/mastery
/progress/analysis

/exams
/exams/:examId

/settings
/settings/study
/settings/notifications
/settings/app
```

Root `/` ohjaa Tänään-näkymään.

## Oppimisjärjestelmä

Learning OS erottaa toisistaan muun muassa:

- sisällön etenemisen
- itsearvion
- todennetun osaamisen
- myöhemmän muistamisen
- virheistä palautumisen
- koetason näytön
- kuormituksen ja palautumisen
- kertausvelan
- aikataulu-, osaamis- ja unohtamisriskin

Todennettu osaaminen ei nouse pelkän itsearvion perusteella.

## Suunnittelu

Planner huomioi:

- valitut opiskelupäivät
- arjen ja viikonlopun kapasiteetin
- kiireiset päivät
- kokeiden ajankohdat
- kurssien kuormituksen
- kertaukset ja virheistä palautumisen
- viimeisten päivien kevyen koetilan

Opiskelupäivien muuttaminen tallennetaan yhtenä muutoksena ja tulevat suunnitellut tehtävät siirretään valituille opiskelupäiville kapasiteetti- ja koerajat huomioiden.

## Harjoittelu ja koeharjoitus

Harjoittelu käyttää rajattua kolmen tilan flow’ta:

```text
SETUP → ACTIVE → SUMMARY
```

Palaute, vihjeet ja mahdollinen uusi yritys tapahtuvat ACTIVE-tilan sisällä. Aktiivisen harjoittelun aikana normaali sovellusnavigaatio piilotetaan.

Aktiivisen tehtävän aikana asetukset ja toissijaiset paneelit väistyvät.

YO / Abitti 2 -koeharjoitus tukee tehtävävalintaa, ajastusta, vastauseditoria, piirrosvastauksia, autosavea, jatkamista ja vasta suorituksen jälkeen näkyvää palautetta.

## Opiskelukerta

Suunniteltu opiskelukerta avautuu focus workspacena, jossa normaali sovellusnavigaatio ei kilpaile tehtävän kanssa. Tallennus päivittää opiskeluhistorian ja oppimisnäytön.

## Laitteiden välinen synkronointi

Puhelin ja tietokone käyttävät samaa Arthur-owneria ja samaa Supabase-dataa.

- palvelindata on yhteinen source of truth
- aktiivinen sovellus refetchoi tiedot säännöllisesti
- näkyviin palaaminen ja verkkoyhteyden palautuminen käynnistävät päivityksen
- offline-kirjaukset säilyvät paikallisessa jonossa reloadin yli
- jonossa olevat muutokset synkronoituvat verkon palatessa
- cross-device E2E varmistaa offline → reload → online → toinen laite -ketjun

Teema ja muu puhtaasti laitekohtainen UI-tila voivat säilyä paikallisina.

## Opiskeluohjaaja ja Gemini

Opiskeluohjaajalla on aina paikallinen deterministinen fallback. Geminiä käytetään vain, kun käyttäjä antaa siihen istuntokohtaisen luvan.

Remote provider:

- `gemini-3.8-flash`
- autentikoitu server route `/api/ai/coach`
- timeout ja quota fallback
- rajattu opiskelukonteksti
- henkilötietojen automaattinen peittäminen
- answer firewall
- provider- ja interaction-auditointi

Final Release Gate varmistaa tuotannossa, että Gemini on määritetty ja pystyy palauttamaan hyväksytyn ohjausstrategian.

## Taustailmoitukset

Web Push sisältää:

- subscribe / unsubscribe
- testiviestin
- VAPID-avaimen
- quiet hours
- deduplikoinnin
- vanhentuneen subscriptionin deaktivoinnin
- reminder tapering -logiikan
- päivittäisen Vercel cronin

Ilmoitus avaa asian kannalta oikean reitin, esimerkiksi kokeen, suunnitelman, edistymisen tai Tänään-näkymän.

## Offline ja PWA

Opintopäiväkirja toimii asennettavana PWA:na. Opiskelukerran ja muiden tuettujen kirjoitusten pending-versio säilytetään paikallisesti, jos verkko katoaa.

## Kehitys

Vaatii Node.js 22+.

```bash
npm install
npm run dev
```

Keskeiset komennot:

```bash
npm run lint
npm test
npm run typecheck
npm run build

# Selain-E2E-työkalut pidetään erillään production/Bun-riippuvuuksista.
npm run e2e:install
npm run e2e
npm run e2e:smoke
npm run e2e:cross-device
npm run e2e:visual
```

Playwright käyttää ympäristömuuttujaa:

```bash
E2E_BASE_URL=https://... npm run e2e
```

## CI ja release-valmius

### Quality Gate

Jokaiselle PR:lle ja `main`-muutokselle ajetaan:

```text
lint → unit/regression → typecheck → production build
```

### Final Release Gate

Jokaiselle `main`-pushille:

1. ajetaan vielä kerran lint, testit, typecheck ja build
2. odotetaan, että Vercel kertoo `/api/release-info`-reitillä juuri saman commit SHA:n
3. ajetaan iPhone/WebKit-smoke
4. ajetaan desktop production smoke
5. ajetaan WCAG/axe-tarkistus
6. varmennetaan Gemini-provider
7. varmennetaan push-backend
8. ajetaan offline + reload + second-device -synkka
9. ajetaan responsive visual layout -matriisi 320–1440 px
10. tallennetaan selaintestien screenshot-evidence GitHub Actions -artifactiksi

Production URL voidaan asettaa repository variableen `PRODUCTION_BASE_URL`. Muuten workflow käyttää Vercel-projektin oletusosoitetta `https://opiskelupaivakirja.vercel.app`.

Final Release Gate voidaan käynnistää myös käsin tiettyä production-URL:ia vasten. Oikean Web Push -viestin lähettämiseen on erillinen **Physical Push Delivery Check** -workflow, jotta automaattinen release-testi ei lähetä käyttäjän laitteille yllätysilmotuksia.

## Saavutettavuus

Tavoite on WCAG 2.2 AA.

Toteutuksessa on muun muassa:

- skip link
- näkyvät focus-tilat
- keyboard navigation
- Escape-sulkeminen
- focus trap ja focus restoration väliaikaisissa käyttöliittymissä
- vähintään käytännössä 44 px kontrollikoot tärkeissä mobiilikontrolleissa
- drag & dropille vaihtoehtoinen painiketoiminto
- reduced motion / reduced transparency
- automaattinen axe-tarkistus Final Release Gatessa

Fyysinen iOS VoiceOver ja oikean laitteen notification-renderöinti kuuluvat release-checklistin laitetarkistuksiin, koska niitä ei voi luotettavasti emuloida Linux-pohjaisessa GitHub Actions -runnerissa.

## Deployment

Production-build ei aja tietokantamigraatioita. Buildin pitää olla deterministinen ja sivuvaikutukseton, joten schema-muutokset ajetaan erillisenä release-toimintona:

```bash
POSTGRES_URL=... npm run db:migrate
```

Migraatioiden pitää onnistua ennen sellaisen koodin julkaisua, joka tarvitsee uuden scheman. Pelkkä Vercel-build ei saa enää epäonnistua tai muuttaa tietokantaa puuttuvan `POSTGRES_URL`-asetuksen vuoksi.

Vercel deployaa automaattisesti vain `main`-haaran. Feature-branchit eivät luo automaattisia Vercel deploymentteja, jotta Hobby-planin deployment quota ei kulu branch-committeihin.

Vercel cron:

```text
0 6 * * *
```

→ `/api/push/cron`

Älä deployaa tuotantoa vanhoista Opintopäiväkirja-repokopioista.


## Tietokantamigraatioiden julkaisu

Tuotantotietokannan migraatiot eivät kuulu tavalliseen Vercel-buildiin. Ne ajetaan erillisestä GitHub Actions -workflow’sta **Production Database Migrations**.

Turvallinen järjestys:

1. käynnistä workflow tilassa `preview`; tämä ajaa `supabase db push --dry-run`
2. tarkista pending-migraatiot ja tulostettu tietokantahosti
3. vasta sen jälkeen käynnistä workflow tilassa `apply` ja kirjoita vahvistukseksi täsmälleen `APPLY`
4. applyn jälkeen workflow listaa paikallisen ja remote migration historyn

Workflow ei käytä `--include-seed`-valintaa eikä käynnisty pushista. Repository secret `POSTGRES_URL` pitää osoittaa nimenomaan Opintopäiväkirjan tuotantotietokantaan.
