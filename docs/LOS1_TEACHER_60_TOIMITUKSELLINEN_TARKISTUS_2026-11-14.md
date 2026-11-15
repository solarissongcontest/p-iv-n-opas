# LOS! 1 · Teacher 2.0 · L001–L060 toimituksellinen tarkistuskierros

**Päivä:** 14.11.2026  
**Integraatio:** PR #264, `feat/los1-8-safe-integration-20261114`  
**Taso:** rajattu sisäinen tarkistus ja automaattiset regressiot, **ei** riippumaton saksan kielentarkistus eikä julkaisuvalmiushyväksyntä.

## Mitä tällä kierroksella todellisuudessa tarkistettiin?

1. L001–L040:n erilliset käsikirjoitustiedostot sekä L041–L045:n, L046–L050:n, L051–L055:n ja L056–L060:n koostetut käsikirjoitustiedostot avattiin nykyisestä kehityshaarasta. Niistä tehtiin rakenteellinen ja tunnistettuihin suomenkielisiin merkitysongelmiin kohdistuva tekstihaku. **Tämä ei ollut 60 käsikirjoituksen riippumaton rivi riviltä tehty didaktinen vertaisarviointi.**
2. L036:n ja L037:n C07-tavaamispyynnöt, L056–L058:n kertauksen sanasto ja L053:n kolmannen henkilön esittely luettiin lähemmin. Niihin tehtiin täsmäkorjaukset ilman alkuperäisten lähdetekstien tai tallennus-ID:iden muokkausta.
3. Testi `tests/los1-teacher-editorial-consistency-60.test.ts` käy läpi rekisterin kaikki **60** opetuskäsikirjoitusta, validoi niiden rakenteen ja tarkistaa tunnetut vanhentuneet suomennokset. Lisäksi se suojaa L037:n hyväksytyt saksankieliset vastausmuodot, L057:n ajanilmauksen ja L053:n merkitysselityksen.
4. Osien C01–C10 sanastorivejä tai 60 tunnin pituutta ei päätellä opetuksen laadun todisteeksi. Aikamerkinnät ovat suunnitteluarvioita, eivät opiskelijoilla mitattuja.

## Opetuspolun kartta ja seuraavat käsintarkistuksen painopisteet

| Tunnit | Sisältö | Kohdennettu havainto / tehty muutos | Jäljellä oleva laadullinen tarkistus |
| --- | --- | --- | --- |
| L001–L006 | C01 · tervehdykset | Gute Nacht erotetaan saapumistervehdyksestä; C01:n kirjan oma itsearviointi lisätty aiemmin | Ihmisäänten laatu, ääntämismallin toimivuus, nollasta aloittavan ymmärtäminen |
| L007–L011 | C02 · nimi | Herrn Weißin suomennos yhtenäistetty; `ich heiße` / `du heißt` opetetaan vaiheittain kirjassa | Alkuperäistekstin vaikeampien rakenteiden tunnistamisen todellinen kuormitus |
| L012–L016 | C03 · alkuperä | `Woher kommst du?` erotettu `Wo wohnst du?` -kysymyksestä; sovellus ensimmäisessä persoonassa | Maa-, kaupunki- ja `aus`-rakenteiden tehtäväkohtainen kielentarkastus |
| L017–L021 | C04 · du / Sie | Kirjan puhuttelutilanteita laajennettu; ikä ei yksin määrää puhuttelua | Formaliteetin kulttuurinen konteksti, autenttisen yrityskeskustelun taso |
| L022–L026 | C05 · kuulumiset | Kaksi vaihtoehtoista omaa vointikeskustelua; myönteinen ja kielteinen vastaus | Lyhyen alkuperäistekstin vähäinen sanastollinen kirjo ja C02:n Text B -toiston tarkoituksenmukaisuus |
| L027–L030 | Kertaus I ja välikoe | Yhteinen Teacher- ja olemassa oleva koetila, ei uutta kysymyspankkia | Välikokeen koko vaikeusjärjestys, yksilöllinen korjaava palaute |
| L031–L035 | C06 · numerot ja ikä | C06:ssa 16–19-vuotiaiden kuvitteelliset esimerkit ja itsenäinen ikäharjoitus | Lukusanojen itsenäinen muistaminen, alkuperäisen lapsidialogin siirtovaikutus nuoren tilanteeseen |
| L036–L040 | C07 · aakkoset ja tavaaminen | **L036/L037:** `Bitte buchstabieren Sie.` yhtenäistetty muotoon *Voisitteko tavata nimen, kiitos?* | Ihmisäänen, aakkosten kirjainten nimien ja Text B:n transkription hyväksyntä; modernin sähköpostiharjoituksen opiskelijakoe |
| L041–L045 | C08 · oppimistilanteesta selviäminen | Kirjaan lisätty nelivaiheinen lukutuki pitkälle 26-riviselle lähteelle | Pitkän, A1.1-tasoa vaikeamman lähteen kuormituksen ja fraasien siirtovaikutuksen mittaus |
| L046–L050 | C09 · päivät ja kellonajat | `um drei Uhr` käännetty johdonmukaisesti tapahtuma-ajaksi, 03/15-epäselvyys selitetty | Kelloajan lähdekonteksti, lukuvastausten oikeellisuus ilman oletettua äänitettä |
| L051–L055 | C10 · kohtaamisten yhdistäminen | **L053:** sanaston `mein Freund / meine Freundin` voi viitata ystävään tai seurustelukumppaniin; ero tunnistamista, ei uutta sijamuoto-opetusta | Kaksi erilaista omaa keskustelua, kolmannen henkilön esittely, itsenäinen suullinen soveltaminen |
| L056–L060 | Kertaus II ja loppukoe | **L056–L058:** C07-pyyntö yhtenäistetty; **L057:** `am Montag um drei Uhr` = *maanantaina kello kolmelta* | Kertauksen tehtäväkohtainen palaute, loppukokeen kattavuus, palautusten säilyminen |

## Toteutetun korjaussarjan tietojen säilyminen

- Opetustuntien `L001`–`L060` tunnisteita, järjestystä tai olemassa olevien opetuskohtausten `scene.id`-tunnisteita **ei muutettu tämän kierroksen sisältökorjauksissa**.
- L037:n itsenäinen soveltamiskysymys hyväksyy yhä alkuperäiset muodot `Bitte buchstabieren Sie` ja `Bitte buchstabieren Sie.`. Vain kysymyksen ja selityksen suomea tarkennettiin.
- L057:n opetusmerkitys muutettiin; kellonajan alkuperäinen saksankielinen teksti säilyy.
- L053:n aiempaan `meaning`-opetustilanteeseen lisättiin asiayhteyttä koskeva kappale ilman uutta suoritusta tai tallennusavainta.
- C07:n viiden puheenvuoron `M-WB-02` ja C10:n 14 puheenvuoron `M-DIB-02` autenttista saksankielistä tekstiä ei tällä kierroksella muokattu.

## Selvä hyväksymisjärjestys ennen julkaisua

1. **Automaattiset tarkistukset:** uusimman commitin Quality Gate, kaikki uudet regressiotestit sekä Chromium/WebKit-selaintestit. Aiemman commitin onnistumista ei pidä merkitä uusimman commitin hyväksynnäksi.
2. **Sisältöjen rivikohtainen tarkistus:** jokaisen 60 käsikirjoituksen saksalaiset lauseet, suomennokset, opetuksen järjestys, vastausvaihtoehdot ja virhepalautteet tarkistetaan yksitellen. Ilmeisen virheen puuttuminen tekstihakusäännöillä ei riitä.
3. **Oppijan käytettävyys:** kokeillaan nollasta aloittavalla oppijalla aloittamisen ymmärrettävyys, oman yrittämisen suojaaminen mallivastauksilta ja kunkin tunnin todellinen kesto.
4. **Lähde- ja mediaportit:** lisenssien yksilöllinen tarkistus, oikea lisenssimerkintä, audion toimivuus ja äidinkielisen tai opettajan hyväksymä ääntäminen. Tekstiin perustuvia tehtäviä ei nimitetä kuullunymmärtämistodisteeksi.
5. **Tallennuksen turvallisuus:** harjoitusten paluu, JSON-varmuuskopion vienti ja palautus erillisellä oikealla laitteella; vasta sitten pilvisynkronoinnin ja julkaisutason ratkaisut.

**Tämän raportin status:** tavoitteena mahdollisimman pieni turvallinen korjausjono; se ei oikeuta julkaisemaan, merkitsemään 60/60 tuntia pedagogisesti hyväksytyiksi tai yhdistämään PR:ää tuotantoon.
