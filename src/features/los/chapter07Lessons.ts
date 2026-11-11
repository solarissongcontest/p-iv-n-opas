import type {FirstLesson} from './firstLessons';

/** C07 uses the complete Wikibooks Fernsprechauskunft conversation (M-WB-02)
 * and independent human-recorded pronunciation resources. No authentic
 * phone-call audio is claimed or graded until licensed and verified.
 */
export const chapter07Lessons:readonly FirstLesson[]=[
 {id:'L036',title:'Aakkosten ja nimen kertaus',requiredIds:['C07-X01','C07-X03'],steps:[
  {id:'L036-S1',kind:'recall',title:'Muista nimikysymys',minutes:4,instructionFi:'Kertaa Wie heißt du? ja Ich heiße ... ennen kirjan avaamista. Mieti, miksi keskustelukumppani joskus tarvitsee nimen tavaamista.'},
  {id:'L036-S2',kind:'instruction',title:'Kirjoitusasu ja kirjaimet',minutes:8,instructionFi:'Opettele valmiina fraasina Wie schreibt man das? ja Bitte buchstabieren Sie. Ääkkösten ä, ö ja ü sekä ß:n muoto ja äännearvo eroavat tutuista kirjaimista. Älä sekoita saksan ß:ää B-kirjaimeen.',chapterId:'C07'},
  {id:'L036-S3',kind:'read',title:'Tutustu numeropalvelun keskusteluun',minutes:6,instructionFi:'Avaa koko viiden puheenvuoron alkuperäinen Fernsprechauskunft-dialogi kirjan sisältä. Tunnista jo tutut tervehdykset ja uusi tavaamispyyntö. Oikean henkilön puhelinnumeroa ei opetella eikä kysytä sinulta.',chapterId:'C07'},
  {id:'L036-S4',kind:'practice',title:'Kaksi ennakkotehtävää',minutes:9,instructionFi:'Vastaa mitä Wie schreibt man das? tarkoittaa ja tunnista sanasta München saksan ü-kirjain. Palauta molemmat yritykset.',chapterId:'C07',exerciseIds:['C07-X01','C07-X03']},
  {id:'L036-S5',kind:'check',title:'Kysy kirjoitusasu',minutes:3,instructionFi:'Sano ääneen Wie schreibt man das? ja valitse, missä tilanteessa kysyisit näin. Harjoittele samaa lausetta rauhallisessa tahdissa.'}
 ]},
 {id:'L037',title:'Lue tavaamiskeskustelu',requiredIds:['C07-X14','C07-X15','C07-X16'],steps:[
  {id:'L037-S1',kind:'recall',title:'Muista tavaamispyyntö',minutes:4,instructionFi:'Yritä sanoa kysymys Wie schreibt man das? ja pyyntö Bitte buchstabieren Sie ilman mallia.'},
  {id:'L037-S2',kind:'read',title:'Lue koko alkuperäinen Fernsprechauskunft',minutes:9,instructionFi:'Lue kaikki viisi alkuperäistä dialogivuoroa. Seuraa puhujia Auskunft ja Franz ja tavoita nimien Claudia Bolliger kirjoitusasu. Tekstissä oleva Ich hätte gerne ... ja lukuisat esimerkkinimet ovat tunnistus- ja tukirakenteita, eivät vielä aktiivioppia.',chapterId:'C07'},
  {id:'L037-S3',kind:'vocabulary',title:'Nimen kirjoittamisen sanasto',minutes:5,instructionFi:'Kertaa buchstabieren, schreiben, Wie schreibt man das?, die Telefonnummer ja zweimal. Piilota suomennokset ja pyri muistamaan ilmaisut itse.',chapterId:'C07'},
  {id:'L037-S4',kind:'practice',title:'Kolme tarkkaa tekstin ymmärtämistehtävää',minutes:9,instructionFi:'Korosta numeropalvelun kaksi peräkkäistä ilmaisua alkuperäisestä tekstistä ja vastaa, kenestä puhelussa puhutaan. Tässä ei luoda kuvitteellisia alkuperäisvuoroja.',chapterId:'C07',exerciseIds:['C07-X14','C07-X15','C07-X16']},
  {id:'L037-S5',kind:'check',title:'Tee suullinen yhteenveto',minutes:3,instructionFi:'Kerro suomeksi, kuka pyytää tavaamista ja mitä nimeä Franz tavataan. Nimen kirjaimia ei tarvitse opetella kokonaan ulkoa.'}
 ]},
 {id:'L038',title:'Tavaa ja ymmärrä numeroita',requiredIds:['C07-X02','C07-X05','C07-X08','C07-X12'],steps:[
  {id:'L038-S1',kind:'recall',title:'Muista luvut ja kirjaimet',minutes:4,instructionFi:'Muista mikä saksan numero- ja kirjaimistosanastossa on jo tuttua: wie, die Nummer, null–zwanzig ja ß. Älä anna oikeaa numeroasi.'},
  {id:'L038-S2',kind:'grammar',title:'Tavaus, erikoismerkit ja sanakirja-artikkelit',minutes:8,instructionFi:'Opettele Wie schreibt man das? ja Bitte buchstabieren Sie kokonaisina fraaseina. Muista ä → ae, ö → oe, ü → ue teknisinä korvikkeina. Der Name, die Frau ja das Jahr ovat opeteltujen substantiivien perusmuotoja, eivät vielä sijataivutusharjoituksia.',chapterId:'C07'},
  {id:'L038-S3',kind:'instruction',title:'Miten nimen selventäminen toimii?',minutes:5,instructionFi:'Katso tekstistä zweimal L wie Ludwig. Toisinaan kirjain selitetään esimerkkisanalla kuten C wie Cäsar. Se ei ole koko saksan aakkostusjärjestelmän opiskelu eikä velvoita muistamaan kaikkia esimerkkinimiä.',chapterId:'C07'},
  {id:'L038-S4',kind:'practice',title:'Neljä taivutus- ja kirjoitustehtävää',minutes:10,instructionFi:'Täydennä buchstabieren ja schreibt, valitse umlautin tekninen korvausmerkintä ja tunnista kolmen jo opetetun substantiivin artikkelit.',chapterId:'C07',exerciseIds:['C07-X02','C07-X05','C07-X08','C07-X12']},
  {id:'L038-S5',kind:'check',title:'Tarkista yksi vaikea muoto',minutes:3,instructionFi:'Sano muistista Wie schreibt man das? ja Bitte buchstabieren Sie. Osaako myös tunnistaa der Name, die Frau ja das Jahr?'}
 ]},
 {id:'L039',title:'Kuuntele ja täytä lomake',requiredIds:['C07-X19','C07-X20','C07-X26'],requiredMediaIds:['M-COM-07-BUCH','M-COM-07-ABC'],steps:[
  {id:'L039-S1',kind:'recall',title:'Kertaa kirjainten nimet',minutes:4,instructionFi:'Muista mistä buchstabieren tarkoittaa. Tavaa mielessäsi nimi LEA, ennen kuin kuulet mallin.'},
  {id:'L039-S2',kind:'listen',title:'Alkuperäistä ihmisääntä: sana ja aakkoset',minutes:8,instructionFi:'Kuuntele kaksi erillistä luvallista äänitettä kirjan sisällä: Jeuwren 2,2 sekunnin sana buchstabieren ja endymi0nin 61 sekunnin aakkosäänite. Näissä ei kuulla alkuperäistä numeropalvelun keskustelua, joten niistä ei päätellä puhelinnumeroita.',chapterId:'C07'},
  {id:'L039-S3',kind:'practice',title:'Kuule sanan merkitys ja kirjoitusasu',minutes:9,instructionFi:'Kuuntele uudelleen sana buchstabieren ja tunnista se vaihtoehdoista. Kirjoita sitten kuulemasi yksi sana itse. Äänite ei sisällä nimeä eikä koko hakemistopuhelua.',chapterId:'C07',exerciseIds:['C07-X19','C07-X20']},
  {id:'L039-S4',kind:'practice',title:'Täytä kuvitteellisen henkilön nimilomake',minutes:6,instructionFi:'Laadi vain kuvitteellisen henkilön nimi sekä kirjainrivi. Tarkista kohtelias tavaamispyyntö. Lomakkeen nimitiedot perustuvat omaan esimerkkiisi ja lukutekstin malliin, eivät yksiäänitteiseen sanaan. Älä lisää oikeita yhteystietoja.',chapterId:'C07',exerciseIds:['C07-X26']},
  {id:'L039-S5',kind:'check',title:'Kuuntelun todennus',minutes:3,instructionFi:'Tunti kuittaa molemmat autenttiset näytteet kuulluiksi vasta, kun kaksi erillistä äänitettä on oikeasti toistettu loppuun. Jos ne eivät toimi, voit lukea tekstin, mutta et saa kuuntelun suoritusmerkintää.'}
 ]},
 {id:'L040',title:'Harjoittele ja testaa C07',requiredIds:['EX-C07'],steps:[
  {id:'L040-S1',kind:'recall',title:'Kertaa nimen selvittäminen',minutes:4,instructionFi:'Yritä sanoa kirjoitusasun kysymys, kohtelias tavaamispyyntö ja yksi kirjainesimerkki ennen sanaston avaamista.'},
  {id:'L040-S2',kind:'vocabulary',title:'Viimeinen kertaus',minutes:5,instructionFi:'Käy sanat schreiben, buchstabieren, die Nummer ja zweimal läpi. Piilota selitykset ja tarkista erityisesti ß sekä ä/ö/ü.',chapterId:'C07'},
  {id:'L040-S3',kind:'practice',title:'Riippumaton C07-kappaletesti',minutes:13,instructionFi:'Tee oma 15 tehtävän kappaletesti. Oikeat vastaukset ja perustelut avautuvat vasta, kun palautat koko kokeen.',chapterId:'C07',exerciseIds:['EX-C07']},
  {id:'L040-S4',kind:'reflection',title:'Mitä osaat tavata?',minutes:5,instructionFi:'Kirjoita itsearviointiin, miten hyvin osaat kysyä kirjoitusasua, tavata kuvitteellisen nimen ja tunnistaa ä/ö/ü. Nimeä yksi harjoiteltava asia.'},
  {id:'L040-S5',kind:'check',title:'Tunnin päätös',minutes:3,instructionFi:'Oppitunnin voi kuitata sen jälkeen, kun koko kappaletesti on palautettu ja itsearviointi tallennettu. Oikea puhelinnumero ei kuulu näihin tehtäviin.'}
 ]}
];
