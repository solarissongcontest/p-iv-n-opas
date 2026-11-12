# LOS! — Visuaalinen masterplan V3.4: toteutettavat ja toteutetut muutokset

**Versio:** 3.4-delta, 12.11.2026. **Tila: osittain koodattu, ei hyväksytty julkaisutason kokonaisuus.**
Tämä on V3.3:n rinnalle kirjattu U1.0:n nimenomaisten muutosten versioitu toteutussuunnitelma ja tilakuva. V3.3:n muut visuaaliset vaatimukset pysyvät voimassa.

## Säilytettävät invarianssit

- LOS!-sarjan logo, hyväksytyt kannet ja bannerit säilyvät; ei kuvia korvaavaa generointia tai ras­t­er­i­tekstin rajausta.
- Kirjan #1 hyväksytty aksentti `#B7473C`, kirjamainen valkoinen pinta ja tekstin ensisijaisuus.
- Pääsovellus Opintopäiväkirja, ei uutta kirja-alustaa.
- Yksi `exerciseId` / tallennettu vastaus, samaa ei monisteta rinnakkaistilaan.

## 3.4:n kohteet ja toteumat

| Osa | Uusi sääntö | Kooditilanne |
| --- | --- | --- |
| Sisältöpuu | Kirja → kappale → osio → yksittäinen tehtävä. 284px desktop, mobiilissa drawer, hakukenttä ja ryhmien avaus. | `LosContentTree.tsx` + `los-u3-content-tree.css`; tehtävät suoraan `exerciseBank.ts`- ja `los1RichExercises.ts`-pankeista; selaintesti kesken |
| Syvälinkit | Uusi `#/1/01/practice/C01-EX-01`, vanha `#/1/01/practice` toimii edelleen | `LosBook.tsx`, erillinen puhdas `contentTreeModel.ts` ID-tarkastuksille |
| Vaakavälilehdet | Vanhat 10 kappalevälilehteä eivät enää ole ensisijainen valikko | Poistettu navigaatiosta, korvattu sivupuulla |
| Sanakortti | Pienessä näytössä alalehti; kontekstimerkitys ensin, lemma/IPA ja äänitiedot vasta sen jälkeen | `LosDictionaryCard.tsx`, `los-u1-pronunciation.css`; pyyhkäisy ja lopullinen ruudunlukijatesti puuttuvat |
| IPA | Näytä sanatarkistettu IPA sanastossa/sanakortissa, muuten avoin puuttumistila | `pronunciation.ts` sisältää 8 lähteistettyä osamerkintää; koko sanaston QA avoinna |
| Ääni | Ihmisääni ensisijainen, saksankielinen TTS vain erikseen merkittynä, ilmoita virhe/reitittömyys | `LosPronunciationButton.tsx` tekee de-äänirajauksen; todellinen audion kuuntelutesti puuttuu |
| Kirja + tehtävät | Vapaaehtoinen rinnakkaisnäkymä riittävällä työleveydellä; yksi tehtävädata | **EI vielä toteutettu** |
| Lukija ja tehtävät | Jatkuva sisältövirta, toimiva edellinen/seuraava ja tiivis kappaleavaus | Nykyistä toimintaa säilytetty; uudistuksen täydellinen visual QA avoinna |
| Saavutettavuus | WCAG 2.2 AA -tavoitteen mukainen näppäimistöpolku, focus ja 200% zoom | Sanakortin Escape/focus toteutettu; täydet laitetestit avoinna |

## Tekninen rajaus

Sanakortti käyttää edelleen alkuperäisen kappaleen jo tallennettua `glossary`-kontekstia. V3.4-komponentit eivät muuta tallennettua highlight-token-skeemaa tai `studyState`-versiota. Vanha kirjakohtainen sanakirjaluettelo **ei ole** U2-laajasanakirja, ennen kuin todellinen tuontikanta/API toimii.

Ei korvata V3.3:n koko sisältöä tällä delta-asiakirjalla; tämän osan ohjelmointitila on merkitty rehellisesti.
