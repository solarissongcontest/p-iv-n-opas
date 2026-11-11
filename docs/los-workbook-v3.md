# LOS! · Vaihe 3: oppikirjan työskentelysivut

**Perusta:** `Los 1.txt` (luvut 3, 5–7), `LOS_masterplan_v1.1_OPPIKIRJA.txt` ja `LOS_visuaalinen_masterplan_v2.1_OPPIKIRJA.txt`.

Tässä vaiheessa täydennetään kirjan toimivaa lukemisen ja harjoittelun käyttöliittymää. Toteutus **ei ole kirjan julkaisuvalmiuden merkki**.

## Kappaleen kymmenen oppikirjasivua

| Järjestys | LOS!-reitin osio | Sisältö tai valmis tila |
|---|---|---|
| 1 | `chapter` | Aloitus, tavoitteet ja kappaleen avaus |
| 2 | `text` | Text A: odottaa kokonaista luvallista alkuperäistekstiä; saatavissa oleva alkuperäinen äänite erillään |
| 3 | `understand` | Ymmärrä: ennakkokysymykset, alkuperäistekstiin sidottu tarkistus vielä keskeneräinen |
| 4 | `vocabulary` | Sanasto: täydennetyt 16-kohdan C01/C02 ehdokaslistat |
| 5 | `grammar` | Kielioppi: aiemmassa vaiheessa toimitettuja selityksiä |
| 6 | `text-b` | Text B: C01:n Commons-äänite; muu media portitettuna |
| 7 | `practice` | Harjoittele: C01:ssa 12, C02:ssa 15 alkuperäistä tarkistettavaa osatehtävää |
| 8 | `apply` | Käytä saksaa: kirjoitustehtävä, tarkistuslista ja yrittämisen jälkeen avattava esimerkki |
| 9 | `culture` | Kulttuuri: C01:n alueellinen tervehdysero ja C04:n puhuttelu, muiden aineistot keskeneräiset |
| 10 | `test` | Kappaletesti: C01:ssa 12, C02:ssa 15 osatehtävää; kaikki vastattava ennen palautusta, perustelut vasta jälkeenpäin |

Varsinaista hyväksyttyä lähdetekstiä, luotettavaa kuunteluarviointia, kulttuurikuvitusta tai tuotantoarviointia ei keksitä valmiiksi. Erityisesti `understand` ei anna automaattista pistettä ilman alkuperäistekstin vastauksia.

## Paikallinen opiskelijan työskentelytila

- Selaimen localStorageen tallennetaan omistajatunnisteen perusteella rajatut kappalekohtaiset vastaukset, testin palautustieto, itsearviointi, omat tekstit, muistiinpano ja kappaleen kirjanmerkki.
- Sama data avautuu uudelleen samalla selaimella ja oletusarvoisesti samalla laitteella, jos tallennus onnistuu ja selaimen tietoja ei poisteta. Sivun ilmoitus kertoo tallentumisen tai virheen.
- Sivulla kerrotaan **joka kerta**, ettei kyseessä ole puhelimen ja tietokoneen välinen synkronointi. Selaustietojen poistaminen voi kadottaa tiedot. Muistiinpanoille on `.txt`-vientitoiminto.
- Paikallinen käyttäjä-ID:n mukaan erotteleminen ei ole tietoturvallinen palvelinpuolen pääsynhallinta, eikä localStorage ole salattu pilvivarmuuskopio.
- Ennen varsinaista henkilökohtaista tuotantokäyttöä tarvitaan tietokannan omistajakohtainen RLS, synkronointi ja ristiriitojen käsittely sekä automaattinen vahvistus, että palvelin vastaanotti vastaukset.

## Pedagoginen laadunraja

- C01:n tehtäväpankissa on 12 osatehtävää, C02:ssa 15. Ne tarkistavat vain sanasto- ja kielioppiasioita, joita kirjan alussa voi käsitellä deterministisesti.
- Saksankieliset `ß`, umlautit ja verbimuodot tarkistetaan täsmällisesti; ylimääräiset välilyönnit ja lauseen loppumerkki eivät tee oikeasta vastauksesta väärää.
- Ei keinotekoisia pisteitä vapaasta kirjoittamisesta, ääntämisestä tai autenttisen dialogin ymmärtämisestä ennen niihin tarkoitettua arviointia.
- C01/C02:n 16-kohdan sanastolistat ovat **kirjakohtaisen masterplanin alustavia oppimiskohde-ehdokkaita**, eivät 16 erillisen lemman valmista sanakirjajulkaisua.
- Kappaleiden 3–10 testit näyttävät keskeneräisen tehtäväsarjan tilan; niitä ei merkitä suoritetuiksi eikä lopullisiksi.
- LOS!:n oma typografinen ja kirjamainen UI pysyy erillään StudyOS:n dashboard- ja kalenterityyleistä.

## Ennen LOS! 1:n valmis-merkintää

1. Lisää ja kielentarkista **jokaiseen kappaleeseen** kokonaiset, luvalliset, ihmisten laatimat Text A ja Text B -aineistot sekä vaaditut attribuutiot.
2. Avaa media vain silloin, kun toimiva toisto ja oikeudet on vahvistettu sovelluksessa.
3. Lisää tehtävät myös alkuperäistekstin ymmärtämiseen, kuullun ymmärtämiseen, kirjoittamiseen ja puheeseen sekä 12–20 osatehtävän testit joka kappaleeseen.
4. Toteuta turvallinen Supabase-synkronointi (RLS), usean laitteen konfliktit, varmuuskopio ja offline-toiminnan palautus.
5. Lisää hyväksytty LOS!-logo, kansikuva, banneri ja kuvien lähdemerkinnät.
6. Testaa mobile 390 px, desktop 1440 px, ruudunlukijat, näppäimistö, tumman teeman kontrastit sekä ero StudyOS-UI:hin.
7. Tarkista tuotannon oikea deployment-ID ja suorita siinä E2E, ei vain GitHubin kooditesti.
