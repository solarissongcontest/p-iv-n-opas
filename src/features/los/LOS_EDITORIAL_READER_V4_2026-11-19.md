# LOS! Editorial Reader v4 · visuaalisen uudistuksen toteutus
**Päivä:** 19.11.2026  
**Tila:** GitHub-ehdokas, ei vielä hyväksytty tai tuotannossa vahvistettu julkaisu.

## Miksi kokonaisuus uudistetaan
PR #281 siisti vanhoja tyylejä, mutta jätti oppikirjan yläpuolelle samanaikaisesti murupolun, 11 vaakavälilehteä, lukuasetukset, sivupalkin ja tekstin omat työkalut. Toimiva koodi ei vielä takaa laadukasta visuaalista kokonaisuutta.

## Päätökset
1. Yksi ensisijainen hierarkkinen sisältöpuu tietokoneella; puhelimessa saavutettava avattava sisältövalikko.
2. Kappaleen 11 vaakapainiketta korvataan nykyisen osion näytöllä, saavutettavalla valintalistalla ja edellinen/seuraava-toiminnoilla. Samat tunnisteet ja reitit säilyvät.
3. Lukuasetukset näytetään lukemisen, sanaston ja kieliopin yhteydessä, ei kirjan kansinäkymän päällä. Tallennus ja asetusten vaihtoehdot pysyvät ennallaan.
4. Oma ja synteettisellä puheäänellä kuunneltava tekstiaineisto merkitään edelleen rehellisesti. Lähdehuomautuksen yksityiskohdat avataan pyydettäessä.
5. Yksi lämmin neutraali pintajärjestelmä. Valkoinen lukupinta, hillityt rajat, ei päällekkäisiä kortteja. Kirjan tunnuspunainen #B7473C pysyy.
6. Moderni toimituksellinen typografia, 68ch tavoiterivi ja säädettävä lukuteksti. Tekstin ja harjoitusten toiminnallisuus säilyy.
7. Hyväksytyt kansi, banneri ja LOS!-logo säilyvät. Muut kirjat jakavat komponentit, mutta eivät kirjaidentiteettiä.
8. Mobiilissa reunaton lukualue ja minimaalinen näkyvä navigaatio; tumma tila käyttää samoja semanttisia muuttujia.

## Suhde aiempiin suunnitelmiin
LOS!-sarjan pedagogiset ja sisältövaatimukset pysyvät voimassa. V3.3:n digikirja, sivupuu ja valinnainen kaksipalstainen opiskelu säilyvät. Tämä v4 tarkentaa visuaalista hierarkiaa käyttäjän 19.11.2026 palautteen jälkeen. Vanhat masterplanit jäävät historiallisiksi lähteiksi.

## Muutetut tiedostot
- LosBook.tsx: lukijan kontekstirivi ja kappaleen osionvaihdin.
- LosRevisedTextPages.tsx: tekstin ja TTS:n lähdetietojen avattava seloste.
- los-design-quality.css: uusi v4:n johdonmukainen ulkoasukokonaisuus, korvaa loppupään v3-tyylikerroksen.
- e2e/los-editorial-v4.spec.ts: navigointi-, mobiili- ja todelliset kuvakaappaukset CI:ssä.

## Hyväksymisportti
TypeScript, lint, build, selain-E2E Chromium/WebKit, 320/390/768/1440 px kuvakaappaukset, tumma tila, 200 % zoom, lukija, sananavaus, korostukset, rinnakkaistila ja manuaalinen visuaalinen katselmointi. Vercelin tuotantoversio tarkistetaan erikseen. Tämä koodiehdokas ei ole valmis oppikirja eikä vahvistettu tuotantojulkaisu.