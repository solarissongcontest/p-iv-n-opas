# LOS! 1 / C01 Hallo! — U1.0:n sisällöllinen QA

**Tarkistuspäivä:** 12.11.2026  
**Tila:** TOIMITUKSELLINEN QA KESKEN, EI JULKAISUVALMIS C01  
**Yhteys:** LOS_UUDISTUS_MASTERPLAN_U1_0_2026-11-12.md / U4 ja R1–R5, R8–R12.

Tämä raportti on koodin rakenteellisen tarkistuksen tilannekuva. Sitä ei tule esittää saksankielisen asiantuntijan oikoluku- tai todellisen äänenlaatutestin todistuksena.

| Pakollinen C01-osa | Koodista todennettu | Hyväksymisen este |
| --- | --- | --- |
| Alkuopastus | C01 avaus `LosBook.tsx`, tavoitteet `catalog.ts`, itsenäisen opiskelun alkeistaso | Koko aloittelijan suoritettava polku arvioitava pedagogisesti |
| Pääteksti | `content/los1C01.ts`: M-COM-01, 8 repliikkiä Franz ja Jörg, teksti mukana kokonaisena, versiona 1.0.0 | Natiivin/tarkastajan kieli- ja transkriptiokontrolli tekemättä |
| Oikeudet | Commons lähde, Xzapro4 ja Erkan Yilmaz, CC BY-SA 3.0 näkyy `LosC01AuthenticText.tsx`:ssa | Johdannaisattribuution lopullinen tarkastus |
| Ääni | M-COM-01:lle Commons HTML5-äänisoitin, erillinen tervehdyslista M-COM-03:lle | Aidon toiston ja tekstin vastaavuuden varmistus iOS Safarilla ja Linux Chromiumilla puuttuu; TTS vain epävarma varatie |
| Sana-avaukset | `LOS1_C01_GLOSS`: 19 kontekstimerkitystä, samassa alkuperäistekstin tokenilukijassa | Kaikkien merkitysten ja IPA-muotojen tarkistus puuttuu |
| IPA | U1 yhteinen sanakortti ja 15 lähteistettyä C01:n sana- tai kokofraasi-IPAa 16:sta; asiantuntijan tarkistamia 0 ja hyväksyttyjä ääniä 0 | C01:n aktiivinen sanasto (16 ilmaisua) **ei** vielä läpäise 100 % IPA+ääni-QA-porttia; Bis später! tarvitsee täydellisen fraasin lähde-IPAn |
| Ääntämisen opetus | `LosBook.tsx`: w, z, ei, ie ja sch -esimerkit | Kieliohjeiden ja yksittäisten ääni-esimerkkien laatutestaus vaaditaan |
| Kielioppi | Opetetaan tervehdyksiä fraaseina ennen taivutusta; vieraat muodot vain tunnistettavaksi | Didaktisen tason tarkistus vaaditaan |
| Tekstin ymmärtäminen | `content/los1C01.ts` sisältää 4 lähteeseen sidottua monivalintaa ja selittäviä palautteita | Laadullinen ja saavutettavuuden kokonais-QA avoin |
| Harjoittelu | `exerciseBank.ts`: 12 perustason tehtävää C01:ssa; `los1RichExercises.ts`: C01:n 3 erikoistyyppistä esimerkkiä | Kuuntelutehtävää ei saa hyväksyä, jos alkuperäistä audioa ei oikeasti kuulla |
| Oma viestintä | `LosApplication` ja `LosVoicePractice`, vapaaehtoinen itsearviointi | Ei saa väittää automaattiseksi laadulliseksi arvioinniksi |
| Kappaletesti | `LosWorkbook` test-moodilla, ratkaisut vasta palautuksen jälkeen, pysyvät tehtävätunnisteet | Testin toiminta on tarkistettava vielä U1-päivityksen kokonaisregressiossa |
| Tallennus ja kertaus | `studyState.ts` paikalliset draftit, `LosRecallCards`, nykyiset varmuuskopiot | Todellinen palautus uudella laitteella ja tuotannon RLS ei vielä testattu |

## Varmennetun lähdeprovenanssin tekniset tunnisteet

- `sourceId=M-COM-01`, `version=1.0.0`, repliikit `u01–u08`, lähdetokenit `M-COM-01-uXX-tN`.
- Tallennettuja `los1-c01-m-com-01-uXX`-korostusavaimia ei muuteta. U1-sanatuen lisääminen ei muuta lähdetekstin tokenisointia tai tehtävien ID:itä.
- Tekstiin sidottujen kysymysten ID:t `C01-SOURCE-Q01…Q04` pysyvät.

## Julkaisupäätös

**EI HYVÄKSYTTY:** C01:lle ei ole vielä julkaisuportit läpäisevää äänireittiä jokaiselle aktiiviselle sanalle, kaikkia IPA-merkintöjä eikä asiantuntijatarkastettua kielellistä kokonaisuutta. 8 repliikin ihmistekstiä ei korvata generoimalla toinen dialogi. C02–C10:n vanhat tavoitteet ja tehtävät pysyvät ennallaan.

Seuraava sisältötyö: C01:n aktiivisen ja tunnistettavan sanaston lemma- ja lausekohtaisten IPA-tietojen lähdevarmennus, ihmisen ääninäyte- tai rajatusti hyväksytty TTS-polku, todellinen kuuntelu- ja pedagogiikkatesti ennen laajennusta C02–C10:een.
