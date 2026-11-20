import type {GrammarSelfCheckItem} from "./englishGrammarSelfChecks.ts";

/** Original G08–G10 grammar practice based on the actual Alpha 0.8
 * indefinite-pronoun, relative-clause and advanced-precision manuscripts.
 * These supplement, not silently overwrite, the original draft package.
 */
export const GRAMMAR_SELF_CHECKS_G08_G10: Readonly<Record<string,readonly [GrammarSelfCheckItem,GrammarSelfCheckItem]>>={
"G08.1":[
 ["Mikä virke ilmaisee, ettei kukaan tiedä koko vastausta, ilman ylimääräistä kieltoa?",
  ["Nobody doesn't know the answer.","Nobody knows the complete answer.","Nobody don't know the answer."],1,
  "Nobody sisältää kiellon jo itsessään ja saa tavallisesti yksiköllisen knows-verbin. Erillinen don't-kielto ei kuulu tavalliseen standardirakenteeseen."],
 ["Kysy avoimesti, soittiko kukaan ovikelloa, ilman oletusta tietystä soittajasta.",
  ["Did somebody ring the bell?","Did nobody ring the bell?","Did anybody ring the bell?"],2,
  "Anybody on neutraali avoimessa kysymyksessä, jossa ei ennakoida vastausta. Somebody voi vihjata oletukseen, että joku todella soitti."]
],
"G08.2":[
 ["Puhutaan kahdesta hakijasta: ensimmäinen vastasi, toinen vaikeni. Mikä ilmaus on täsmällisin?",
  ["One applicant answered; the other remained silent.","One applicant answered; others remained silent.","One applicant answered; another ones remained silent."],0,
  "The other viittaa jäljellä olevaan yhteen tietyn kahden henkilön joukossa. Others voisi viitata useampaan määrittelemättömään henkilöön."],
 ["Täydennä ilman uutta substantiivia: ”Some reviewers agreed; ___ disagreed.”",
  ["other","others","another reviewers"],1,
  "Others on itsenäinen monikollinen pronomini. Other tarvitsee tavallisesti peräänsä määritettävän substantiivin, esimerkiksi other reviewers."]
],
"G08.3":[
 ["Kahdesta ehdotetusta päivämäärästä kumpikaan ei sovi. Mikä kuvaa tilannetta?",
  ["Either date works for me.","Both dates work for me.","Neither date works for me."],2,
  "Neither date sulkee pois kummankin kahdesta päivämäärästä. Either date viittaisi jompaankumpaan tai kumpaan tahansa, ei kummankin hylkäämiseen."],
 ["Millä muodolla sanot muodollisessa yleiskielessä, että jompikumpi vastauksista on mahdollinen?",
  ["Either of the answers is possible.","Either of the answers are possible.","Neither of the answers are possible."],0,
  "Either of the answers rakentuu neutraalissa muodollisessa ilmaisussa yksiköllisen is-verbin kanssa. Arkisessa kielessä esiintyy vaihtelua, mutta myös either/neither-merkitysero ratkaisee."]
],
"G08.4":[
 ["Lause ”Not everyone supported the proposal” tarkoittaa mitä täsmällisimmin?",
  ["Nobody supported the proposal.","At least one person did not support the proposal.","Every person supported the proposal."],1,
  "Not everyone tarkoittaa, ettei tuki ollut kaikkien yhteinen. Se ei väitä, ettei kukaan kannattanut, sillä osa saattoi kannattaa ehdotusta."],
 ["Mikä ilmaus jättää pienen osallistujamäärän mahdolliseksi, muttei väitä tarkkaa nollaa?",
  ["Hardly anyone attended.","Nobody attended.","Everyone attended."],0,
  "Hardly anyone ilmaisee lähes olematonta osallistujamäärää. Nobody esittää täsmällisemmän nollaväitteen, joten sanojen looginen ala eroaa."]
],
"G09.1":[
 ["Tarkastele ”The student who asked the question was curious.” Mikä on relatiivin korrelaatti?",
  ["question","was curious","student"],2,
  "Student on se henkilö, jota who asked the question määrittää. Päälauseeseen jää väite the student was curious, kun relatiivilause jätetään analyysissa pois."],
 ["Mikä on lauseen ”The proposal that we discussed was accepted” päälauseen ydin?",
  ["That we discussed was accepted.","The proposal was accepted.","We discussed was accepted."],1,
  "Kun that we discussed erotetaan määrittäväksi sivulauseeksi, päälauseen subjekti on the proposal ja finiittinen predikaatti was accepted."]
],
"G09.2":[
 ["Mikä relatiivi käy ihmiseen viittaavaan määrittävään subjektirelatiiviin tässä virkkeessä?",
  ["The journalist who interviewed the scientist asked a question.","The journalist which interviewed the scientist asked a question.","The journalist whom interviewed the scientist asked a question."],0,
  "Who on tavallinen ihmisviitteinen subjektirelatiivi. Whom on objektimuoto eikä sovi tämän relatiivilauseen subjektin tehtävään."],
 ["Valitse pilkuilla erotettuun lisätietolauseeseen neutraali relatiivi.",
  ["The report, that was revised, is online.","The report, which was revised, is online.","The report, what was revised, is online."],1,
  "Lisätietoa antavassa relatiivilauseessa which sopii asiaan viittaavaksi subjektiksi. That ei tavallisesti esiinny tällaisessa pilkuilla erotetussa rakenteessa."]
],
"G09.3":[
 ["Rakennuksen katto vahingoittui. Mikä relatiivi ilmaisee katon ja rakennuksen suhteen?",
  ["The building which roof was damaged was repaired.","The building that roof was damaged was repaired.","The building whose roof was damaged was repaired."],2,
  "Whose toimii myös elottomaan rakennukseen viittaavana omistusmääritteenä ja kytkee katon rakennukseen. Pelkkä which ei määritä roof-sanaa."],
 ["Mikä virke tarkoittaa lainattua kirjaa eikä kirjan omistussuhdetta?",
  ["The book which I borrowed was useful.","The book whose I borrowed was useful.","The book whose cover I borrowed was useful."],0,
  "Which on tässä lainattavan kirjan objekti. Whose loisi suhteen seuraavaan substantiiviin, esimerkiksi whose cover, ja muuttaisi merkityksen."]
],
"G09.4":[
 ["Millä virkkeellä tarkoitetaan vain niitä opiskelijoita, jotka palauttivat ajoissa?",
  ["The students, who submitted early, got feedback.","The students who submitted early got feedback.","The students that, submitted early, got feedback."],1,
  "Ilman pilkkuja who submitted early rajaa opiskelijoiden ryhmää. Pilkuilla erotettu lisätieto käsittelee jo tunnistettua joukkoa, mikä muuttaa väitteen laajuuden."],
 ["Mikä virke sisältää jo tunnistetusta Helsingistä lisätietoa antavan relatiivilauseen?",
  ["Helsinki which is the capital of Finland lies on the coast.","Helsinki that is the capital of Finland lies on the coast.","Helsinki, which is the capital of Finland, lies on the coast."],2,
  "Helsinki on tässä jo nimetty ja yksilöity. Which-lisätietolause erotetaan pilkuilla eikä siinä korvata which-muotoa that-sanalla."]
],
"G09.5":[
 ["Miksi relatiivin saa jättää pois lauseesta ”The book (that) I borrowed was useful”?",
  ["Relatiivi on sivulauseen objekti ja sivulauseessa on oma subjekti I.","Relatiivi on sivulauseen ainoa subjekti.","Kaikki that-relatiivit voi aina jättää pois."],0,
  "I toimii borrowed-verbin subjektina ja book vastaa objektia. Määrittävän objektirelatiivin poisjättö ei siis jätä sivulausetta vaille subjektia."],
 ["Mihin which viittaa lauseessa ”He ignored the warning, which proved costly” tässä merkityksessä?",
  ["Only to the word warning as a physical object.","To his ignoring of the warning.","To an unmentioned second warning."],1,
  "Which proved costly voi viitata koko edeltävään ajatukseen eli varoituksen sivuuttamiseen. Viittaus ei automaattisesti kohdistu lähimpään substantiiviin."]
],
"G10.1":[
 ["Penkki, jolla istuimme, oli märkä. Mikä muodollinen prepositiorelatiivi sopii?",
  ["The bench in which we sat was wet.","The bench on which we sat was wet.","The bench to which we sat was wet."],1,
  "Englannissa sanotaan tavallisesti sit on a bench, joten relatiivin suhde on on which. Kaikkiin paikkarelatiiveihin ei käytetä automaattisesti in-prepositiota."],
 ["Kaupunki, jossa asun, on muuttunut. Mikä muoto vastaa tavallista live in -rakennetta?",
  ["The city in which I live has changed.","The city to which I live has changed.","The city on which I live has changed."],0,
  "Live in a city antaa muodollisen vastineen in which I live. Preposition valitsemiseen tarvitaan alkuperäisen verbirakenteen merkitys."]
],
"G10.2":[
 ["Tehtaan koneet vahingoittuivat. Mikä relatiivilause ilmaisee niiden kuuluvan tehtaan yhteyteen?",
  ["The factory which machines were damaged closed.","The factory whom machines were damaged closed.","The factory whose machines were damaged closed."],2,
  "Whose voi liittää machines-sanan myös elottomaan factory-sanaan. Pelkkä which ei toimi samassa paikassa omistussuhteen määritteenä."],
 ["Mikä muodostaa whose-rakenteelle mahdollisen muodollisen vastineen, jossa myös sanajärjestys muuttuu?",
  ["The building, which windows were broken, was repaired.","The building, the windows of which were broken, was repaired.","The building, of which the windows were broken of, was repaired."],1,
  "Muodollisessa the windows of which -rakenteessa substantiivi windows siirtyy relatiivirakenteen alkuun. Pelkkä whose-sanan korvaaminen which-sanalla ei riitä."]
],
"G10.3":[
 ["Osa tutkijoista oli työskennellyt ulkomailla. Mikä tarkka pilkullinen osajoukkorelatiivi sopii?",
  ["The researchers, three of whom had worked abroad, spoke.","The researchers, three of which had worked abroad, spoke.","The researchers, three of that had worked abroad, spoke."],0,
  "Three of whom kertoo kolmesta ihmisestä suuren tutkijajoukon osana. Muodollinen whom viittaa henkilöihin; which viittaisi asioihin."]
],
 ["Useimmat tutkimuksista olivat epäselviä. Mikä partitiivirelatiivi viittaa tutkimuksiin asioina?",
  ["The studies, most of whom were inconclusive, were reviewed.","The studies, most of that were inconclusive, were reviewed.","The studies, most of which were inconclusive, were reviewed."],2,
  "Most of which rajaa suurimman osan aiemmin mainituista studies-kohteista. Which viittaa asioihin, ja pilkullisessa rakenteessa that ei korvaa sitä."]
],
"G10.4":[
 ["Mikä relatiivilause käyttää muodollista preposition eteen siirtämistä henkilöstä?",
  ["The colleague to who I spoke replied.","The colleague to whom I spoke replied.","The colleague whom I spoke to to replied."],1,
  "Preposition frontingissa to tulee whom-sanan eteen, kun kyse on henkilön kanssa puhumisesta. Rakenteen verbisuhde on speak to."],
 ["Mikä seuraavista on täysin kieliopillinen, luonnollinen loppuprepositiorakenne?",
  ["The colleague I spoke to replied.","The colleague I spoke replied to.","The colleague I spoke to to replied."],0,
  "The colleague I spoke to on neutraali määrittävä objektirelatiivi, jossa prepositio jää loppuun. Loppuprepositio ei tee rakenteesta virheellistä."]
],
"G10.5":[
 ["Mikä aloittaa vapaan relatiivilauseen ilman erillistä näkyvää korrelaattia?",
  ["Everything what she discovered surprised us.","What she discovered surprised us.","The thing what she discovered surprised us."],1,
  "What she discovered muodostaa kokonaisen substantiivin asemassa olevan sivulauseen ilman erillistä thing- tai everything-korrelaattia."],
 ["Valitse neutraali standardikielinen muoto, jossa everything on näkyvä korrelaatti.",
  ["Everything what the witness said was recorded.","Everything which the witness said was recorded of.","Everything that the witness said was recorded."],2,
  "Everything on jo korrelaatti, jota määrittävä that-relatiivi tarkentaa. Everything what ei ole tavallinen neutraalin standardikielen rakenne."]
],
"G10.6":[
 ["Virkkeessä ”The scientists, some of whom questioned the results, revised the method” ketkä kyseenalaistivat tulokset?",
  ["Only some of the scientists.","Every scientist in the group.","The method, not the scientists."],0,
  "Some of whom tarkoittaa vain osaa scientists-joukosta. Päälauseen revised the method ei tarkoita, että jokainen tutkija olisi kyseenalaistanut tulokset."],
 ["Mikä on päälauseen perusväite virkkeessä ”The scientists, two of whom disagreed, revised the method on which the study relied”?",
  ["Two scientists relied on a method.","The scientists revised the method.","The study disagreed with the scientists."],1,
  "Päälauseen ydin on the scientists revised the method. Two of whom antaa lisätietoa kahdesta tutkijasta, ja on which tarkentaa menetelmän ja tutkimuksen suhdetta."]
]
};
