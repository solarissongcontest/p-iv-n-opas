# LOS! U1.0 — julkaisuportit R1–R12

**Päiväys:** 12.11.2026 · **Tulos: EI JULKAISUVALMIS**
Portti hyväksytään vasta oikealla testinäytöllä. Osittainen koodin olemassaolo ei ole hyväksymismerkintä.

| Portti | Tila | Todellinen näyttö ja puuttuva |
| --- | --- | --- |
| R1 Sisältö | AUKI | C01–C10:ssa kokonaisia lähteistettyjä tekstiesikatseluja, mutta lähderekisterin julkaisuvaihe ja kaikkien tekstien lopullinen tarkastus avoin |
| R2 Oikeudet | AUKI | C01 Commons -oikeustieto koodissa; FreeDictin, Wiktionaryn, kaikki.org:n, puheäänten ja muiden medioiden oikeuksia ei ole auditoitu kokonaisuutena |
| R3 Kieli ja opetus | AUKI | C01:n nollatasokielioppia ja ääntämisopetusta laajennettu `LosC01GrammarGuide.tsx`-komponentilla; pätevän saksantarkastajan ja didaktisen tarkastajan hyväksyntä puuttuu |
| R4 IPA | AUKI | 8 Wiktionary-lähteistettyä yksittäistä perusmuotoa, 0 asiantuntijavarmistettua täyttä C01-aktiivisanastoa |
| R5 Ääni | AUKI | Commons-äänisoittimia on, saksankielisen TTS:n esikatselu lisätty; fyysisten laitteiden äänen laatu/toisto ei vielä tarkistettu |
| R6 Sanakirja | AUKI | Erillisessä luonnos-PR:ssä #203 FreeDict de→fi / fi→de lähdetiedostot käsitelty CI:n tilapäisessä hakemistossa: 13 028 + 12 102 = 25 130 riviä, 33 670 käännösvastinetta. PostgreSQL:n testischema ja hakufunktio testattu. **Tuotannon julkaistuja sanakirjatietueita ei ole tuotu.** Kaikki.org ja audiot kesken |
| R7 Käyttöliittymä | AUKI | U3 sisältöpuu, vanhojen syvälinkkien yhteensopivuus ja Kirja + tehtävät -tila toteutettu; sama `LosWorkbook` säilyttää tallennusavaimet. Uusimman muutoksen mobiili-/desktop-E2E ja saavutettavuustestit ovat vielä julkaisun ehtoja |
| R8 Tehtävät | OSITTAIN TESTATTU | Vanhat 147 + 16 tehtävätyypin toteutukset säilyivät; ei vielä koko U1-uudistuksen piste-/koetilaturvatestiä |
| R9 Saavutettavuus | AUKI | Sanakortin sulku ja fokuksen palautus toteutettu, WCAG 2.2 AA:n kokonaistesti ei tehty |
| R10 Tietosuoja ja tallennus | AUKI | Tallennusavaimia ei muutettu. Opintopäiväkirjan tuotannon `los_chapter_drafts`-taulun RLS ja anon/authenticated-lukuoikeuden puuttuminen **tarkistettu read-only SQL:llä 12.11.2026**. Käyttäjän todellisen varmuuskopion palautus, koko pilvisynkronointi ja usean laitteen turvallinen käytäntö ovat edelleen todentamatta |
| R11 Regressio | OSITTAIN TESTATTU | PR:n laatutarkistuksia ja LOS!-selaintestejä suoritetaan; koko Opintopäiväkirjan loppuregressiota ei tehty |
| R12 Viestinnän rehellisyys | OSITTAIN TESTATTU | Puuttuva IPA, testaa­maton TTS ja kappaleen oma kontekstimerkitys näkyvät; muu lähde- ja sanakirjastatus vaatii vielä työtä |

**Julkaisupäätös:** ei yhdistetä tuotantoon ennen teknisten porttien korjausta ja koulutuksellisen sisällön hyväksyntää. Suurin jäljellä oleva työ on U2: todellinen sanakirja, U4–U5: koko aktiivisanaston IPA + sisältöjen opetus- ja lähde-QA, U6: palautuksen turvallisuus sekä U7: todellisten laitteiden ja a11y:n todentaminen.
