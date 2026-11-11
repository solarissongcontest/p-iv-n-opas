# LOS! 1 · Kappaleiden 3–6 opetussisällön lisäys

**Lähtöaineisto:** `Los 1.txt`, kohdat 3.4–3.7 ja 4. LOPS21 / saksa B3 / SAB31. Toteutus täydentää `docs/los-workbook-v3.md` -vaihetta ja säilyttää kirjallisen ulkoasun.

## Mitä tässä muutoksessa toimitetaan

| Kappale | Opetettava taito | Tarkistettavia osatehtäviä | Sanaston ydinkorttiehdokkaita |
|---|---|---:|---:|
| C03, Woher kommst du? | ich komme / du kommst; woher, aus + maa; aus der Schweiz, aus den USA vain tunnistaminen | 15 | 17 |
| C04, Du oder Sie? | du vs kohtelias Sie, Wie heißen Sie?, Woher kommen Sie?, tilanteeseen sopiva puhuttelu | 12 | 16 (osa kertausta) |
| C05, Wie geht’s? | Wie geht's?, Gut, danke, Nicht so gut, und dir/Ihnen; nicht ja sehr | 12 | 16 |
| C06, Wie alt bist du? | numerot 0–20, poikkeukset sechzehn/siebzehn, luvut 21–99, ikälause sein-verbillä | 20 | 26 sanasto/numeroilmausta |

Kappaleissa 1 ja 2 ennestään olevat 12 + 15 osatehtävää säilyvät. Nyt C01–C06:ssa on **86 itsenäisesti tarkistettavaa osatehtävää**.

Kaikki uudet osatehtävät ovat kirjasarjalle itse kirjoitettuja taivutus-, merkitys-, fraasi- ja numeroharjoituksia; ne ovat erillään alkuperäislähteen luetun tai kuullun ymmärtämisen kokeesta. Vastausvertailussa ääkköset, ß, kirjaimet ja verbimuodot ovat merkityksellisiä, mutta loppumerkit ja ylimääräiset välilyönnit eivät vaikuta.

## Kirjalliset lisäykset

- C03:n kulttuurisivulla DACH-alue, Liechtenstein ja alueelliset kielitilanteet. Ei virheellistä väitettä, että kaikki kussakin maassa puhuvat ainoastaan saksaa. Oma karttakuva odottaa hyväksyttyä visuaalista aineistoa.
- C05:n kulttuurisivulla kuulumiskysymysten arkinen käyttö ja kohteliaan vastakysymyksen ero. Ei yleistystä kaikkia tilanteita koskevaksi säännöksi.
- C06:ssa kuvitteelliset ikäesimerkit ja yksityisyyden rajaus: todellista syntymäaikaa tai numeroa ei kysytä.
- Lähdetekstiin sidotut ymmärtämiskysymysten **ennakko-ohjeet** tehty kappalekohtaisiksi; niitä ei voi pisteyttää ennen kuin koko alkuperäisteksti oikeasti sisältyy LOS!:iin.
- Kappaletestin jälkeinen itsenäinen puhe-/kirjoitusarviointi on kappalekohtainen.

## Selkeästi keskeneräiset portit

1. Text A ja Text B eivät vielä sisällä kokonaisia, erikseen lisensoituja alkuperäistekstejä ja kaikkia medioita. Varsinaista kuulunymmärtämistä tai alkuperäistekstin tarkistusta ei ole käytettävissä.
2. C03:n kartta ja muut valitut autenttiset kuvat puuttuvat. Ennen hyväksyntää tarvitaan käyttöoikeus ja laitteen visuaalinen tarkistus.
3. C03:n 15 testikohdan lisäksi kirjan suunnitelma edellyttää erillisen tuotoksen; C04:n kaksi soveltavaa tilannetta, C05:n ääneenpuhumisen arvio ja C06:n ikädialogit eivät muutu automaattipisteiksi.
4. Vastaavan 12–20 osatehtävän pankit C07–C10, välikoe ja loppukoe ovat tekemättä.
5. Pilvisynkronoinnin tuotantoaktivointi tarvitsee erillisen vahvan palvelinsalaisuuden ja vahvistetun julkaisutestin.
6. Älä merkitse C03–C06:ta tai koko LOS! 1:tä valmiiksi tämän muutoksen perusteella.

## Testaus

`tests/los-chapters-03-06.test.ts` tarkistaa lukitut osatehtävämäärät, oikeat vastausavaimet, kirjakohtaiset sanastokoot, saksan erikoismerkkien täsmällisen tarkistuksen ja keskeneräisen autenttisen kuuntelun virheettömän ilmoittamisen.

Opetus perustuu zero-to-A1.1-periaatteeseen, ei LOPS21:n tai oman kirjakohtaisen rungon laajentamiseen ulkopuolisella aineistolla.
