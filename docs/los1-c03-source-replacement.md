# LOS! 1 C03: alkuperätekstin lähdevaihto

Päiväys: 11.11.2026

C03:n aiempi suunniteltu ensisijainen lähde oli `M-DIB-01` (COERLL:n Berna-haastattelu). Siinä esiintyy oikea puhelinnumero, jonka käsittely alkuperäisenä kokonaisena tekstinä ja tehtäväaineistona olisi tarpeetonta ja haittaisi ensimmäisen moduulin henkilötietoja välttävää linjaa. Lähde jää inventaarioon ehdolliseksi lisäaineistoksi; sitä ei pidetä julkaistuna päätekstinä.

Ensisijaiseksi Text A -lähteeksi on siksi valittu uusi `M-WB-07`, Wikibooksin BLL German/A1/Lesson 2:n julkaistu kokonainen kahdeksan repliikin Lisa Müller -dialogi. Pysyvä lähdeversio: [oldid 4581896](https://en.wikibooks.org/w/index.php?title=BLL_German/A1/Lesson_2&oldid=4581896). Tekstin CC BY-SA 4.0 -lisenssi ja tekijäviite näytetään lukijassa. Saman kappaleen toissijainen autenttinen kuuntelu/teksti `M-COM-02` (Ariser, Commons) pysyy ennallaan.

Muutokset: `los1-sources.json` sisältää oman lähdetunnuksen, `sourceCount` kasvaa 24:ään, C03:n `primarySourceId` on `M-WB-07`, sen Text A ja viisi ymmärtämistehtävää renderöidään ja tallennetaan LOS!:ssa; `learningPath.ts` käyttää vastaavaa otsikkoa. Kappaleen sisäinen lähde- ja sanastoversio erotetaan muista eikä vanhoja C01/C02-korostusankkureita muuteta.

**Julkaisuportit:** kielellinen loppueditointi, pedagoginen tasotarkistus ja oikeat laite-/mediatestit ovat edelleen auki. Lähteen käyttölupa ei tarkoita automaattisesti julkaisuvalmiutta. Muuttamaton saksankielinen dialogi erotetaan opetuksen suomenkielisistä selitteistä.


## L013–L016-integraation tarkistus 13.11.2026

**Valinta pysyy voimassa.** C03:n pääteksti on edelleen \`M-WB-07\` ja \`M-DIB-01\` jää ehdolliseksi lisäaineistoksi. Yhdistelmälähteissä edelleen esiintyvä Berna-viittaus on historiallisen suunnitelman viittaus, ei uusi lähdevalinta. C03:n käytössä olevia alkuperäistekstejä, tunnisteita tai tallennettuja vastauksia ei korvattu.

**Sovelluksen tämänhetkinen lähdeversio:**
- \`src/features/los/content/los1OpenDialogues.ts\`: \`sourceId=M-WB-07\`, \`revision=4581896\`, kahdeksan alkuperäistä puheenvuoroa.
- Puhujajärjestys: Stranger 1, Lisa, Stranger 1, Stranger 2, Lisa, Stranger 1, Stranger 2, Lisa. Alkuperäinen teksti on saksaksi eikä käyttäjän henkilökohtaisia numeroita kysytä.
- Viimeisessä vuorossa Lisa sanoo \`ich komme aus Deutschland\` (lähtömaa Saksa) ja \`ich wohne hier in Bern\` (asuinkaupunki Bern). Näitä tietoja ei saa vaihtaa keskenään.
- Tekstikysymykset: \`C03-SOURCE-Q01=a\` (Saksa), \`Q02=b\` (Bern), \`Q03=c\` (\`Woher kommen Sie?\`), \`Q04=a\` (kohtelias \`Sie\`). Kysymysten ja alkuperäisen tekstin vastaavuus tarkistetaan vielä riippumattomasti toimituksessa.
- L013 käyttää kirjan omia \`Q01\` ja \`Q02\`-tehtäviä **vastattu + tarkistettu** -ehtona. L014 opettaa itse \`Woher kommst du?\` -kysymyksen ja \`kommen\`-verbin ich/du-muodot. L015 käyttää olemassa olevan Text B:n \`C03-MCOM02-Q02/Q03\`-tarkistuksia. L016 vaatii kirjan varsinaisen C03-kappaletestin palautuksen, soveltamistekstin ja itsearvioinnin.
- Oikeusmerkintä nykyisessä koodissa: sivuteksti \`CC BY-SA 4.0\`, pysyvä [lähdeversio](https://en.wikibooks.org/w/index.php?title=BLL_German/A1/Lesson_2&oldid=4581896). Lähdesivun tarkka tekijähistoria ja kyseisen version attribuution täydellisyys tarkistettava toimituksessa. Yksittäisten median käyttöoikeudet eivät synny tekstilisenssistä.
- **Avoin julkaisueste:** alkuperäisen julkaisun tekstiversion merkkitarkka vertailu, saksan riippumaton tarkistus, kulttuuri- ja tasotarkistus, attribuution lopullinen hyväksyntä, todellinen mobiili-/desktop-laitekoe ja lähteeseen sidottu opetuspolun opiskelijakoe. \`languageReviewed=false\`, \`deviceTested=false\` ja \`published=false\` säilyvät.
