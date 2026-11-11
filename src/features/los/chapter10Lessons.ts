import type {FirstLesson} from './firstLessons';

/** C10's authentic Harald interview is source M-DIB-02.
 * Text B is the complete previously imported CC BY OER Berna interview.
 * The extra C01 audio is an explicitly labelled review, NOT a fake Harald recording.
 */
export const chapter10Lessons:readonly FirstLesson[]=[
 {id:'L051',title:'Kokoa esittelyfraasit',requiredIds:['C10-X01','C10-X04'],steps:[
  {id:'L051-S1',kind:'recall',title:'Palauta mieleen jo osaamasi',minutes:4,instructionFi:'Kertaa muistinvaraisesti Hallo, Ich heiße ... ja Ich komme aus ... . Yritä myös muistaa tuttavallinen vointikysymys ja kohtelias hyvästely.'},
  {id:'L051-S2',kind:'instruction',title:'Kolmas henkilö ja tutustuminen',minutes:8,instructionFi:'Opi valmiit käyttöfraasit Das ist ... ja Schön, dich kennenzulernen! sekä Er heißt ... ja Sie heißt ... . Nämä ovat LOS!:n opetettavia mallifraaseja eivätkä suoria sitaatteja Haraldin haastattelusta. Tavoitteena on esitellä toinen ihminen lyhyesti.',chapterId:'C10'},
  {id:'L051-S3',kind:'read',title:'Tutustu oikeaan Haraldin haastatteluun',minutes:6,instructionFi:'Lue COERLL:n Haraldin alkuperäisen 14-vuoroisen Wer bin ich? -haastattelun alku. Etsi nimi, kotipaikka, ikä ja lempiväri. Pitkät aluepuheenvuorot ovat tunnistuksen tukea, eivät uusia taivutusvaatimuksia.',chapterId:'C10'},
  {id:'L051-S4',kind:'practice',title:'Esittele uusi tuttava',minutes:9,instructionFi:'Ratkaise kaksi opittujen fraasien tehtävää: miten esittelet ystävän ja miten ilmaiset että on hauska tutustua. Vastaus yritykseen tallennetaan.',chapterId:'C10',exerciseIds:['C10-X01','C10-X04']},
  {id:'L051-S5',kind:'check',title:'Ensimmäinen kokonainen esittely',minutes:3,instructionFi:'Sano itse kuvitellusta henkilöstä Das ist Alex. Er heißt Alex. Lisää oma nimi ja hyvästely oman taitosi mukaan.'}
 ]},
 {id:'L052',title:'Kuuntele Haraldin haastattelu',requiredIds:['C10-X11','C10-X14','C10-X16'],steps:[
  {id:'L052-S1',kind:'recall',title:'Ennusta haastattelun kysymykset',minutes:4,instructionFi:'Miten kysytään nimeä? Miten kysytään kotipaikkaa? Muista erityisesti Wie heißt du? ja Woher kommst du?.'},
  {id:'L052-S2',kind:'read',title:'Lue kaikki Haraldin 14 alkuperäistä vuoroa',minutes:9,instructionFi:'Lue kokonainen 14-vuoroinen alkuperäinen COERLL:n Wer bin ich? -teksti lukijassa, tarvittaessa suomennoksineen. Kanonisen tunnin nimestä huolimatta Haraldin alkuperäistä videota tai puhetta ei ole vielä todettu toimivaksi. Älä merkitse lukemista autenttiseksi Haraldin kuunteluksi.',chapterId:'C10'},
  {id:'L052-S3',kind:'vocabulary',title:'Lue ymmärtämisen tukisanat',minutes:5,instructionFi:'Haraldin kotipaikka on München, hän kertoo olevansa suunnilleen viisikymppinen ja pitää sinisestä. Sanoja ursprünglich, Süddeutschland ja Bayern käytetään tässä vain tunnistukseen. Hänen puhelinnumeronsa ei ole oppimistavoite.',chapterId:'C10'},
  {id:'L052-S4',kind:'practice',title:'Kolme oikeaan litteraattiin sidottua tehtävää',minutes:9,instructionFi:'Korosta Haraldin alkuperäinen nimilause ja vastaa hänen kotikaupunkiaan ja lempiväriään koskeviin kysymyksiin. Vältä puhelinnumeron kopioimista vastauksiisi.',chapterId:'C10',exerciseIds:['C10-X11','C10-X14','C10-X16']},
  {id:'L052-S5',kind:'check',title:'Erottele lähteen väitteet',minutes:3,instructionFi:'Muista, että Haraldin kommentti Münchenin ”sivistyneestä alueesta” on puhujan alueellinen vitsi, ei oppikirjan käsitys muista saksalaisista alueista.'}
 ]},
 {id:'L053',title:'Esittele kolmas henkilö',requiredIds:['C10-X20','C10-X21','C10-X22','C10-X28'],steps:[
  {id:'L053-S1',kind:'recall',title:'Minä ja sinä vaihtuvat hän-muotoon',minutes:4,instructionFi:'Yritä sanoa Ich heiße, Du heißt ja Ich komme. Mieti miten esittelet sen sijaan yhden kuvitteellisen kolmannen henkilön.'},
  {id:'L053-S2',kind:'grammar',title:'Das ist, er heißt, sie kommt',minutes:8,instructionFi:'Harjoittele Das ist ... ja er/sie heißt, er/sie kommt aus sekä er/sie ist. Niillä voi esitellä kolmannen henkilön ilman uuden laajan taivutusjärjestelmän opiskelua. Iso Sie kohteliaana ”te” on erotettava pienestä sie-pronominista, joka voi tarkoittaa ”hän”.',chapterId:'C10'},
  {id:'L053-S3',kind:'instruction',title:'Nimi ja kotimaa yhdessä',minutes:5,instructionFi:'Rakennat neljä lyhyttä virkettä: Das ist Lea. Sie heißt Lea. Sie kommt aus Finnland. Sie ist zwanzig Jahre alt. Numero on lisätietoa, eikä koko C06:n lukusäännöstöä tässä arvioida uudelleen.',chapterId:'C10'},
  {id:'L053-S4',kind:'practice',title:'Kolme taivutustehtävää ja neljän virkkeen itsearviointi',minutes:10,instructionFi:'Valitse oikea kolmannen henkilön esittely, täydennä heißt ja kommt sekä kirjoita oma neljän virkkeen esittely kuvitteellisesta henkilöstä.',chapterId:'C10',exerciseIds:['C10-X20','C10-X21','C10-X22','C10-X28']},
  {id:'L053-S5',kind:'check',title:'Kerro ilman mallia',minutes:3,instructionFi:'Esittele kuvitteellinen henkilö kahdella eri tavalla. Varmista, että er heißt ja sie kommt ovat oikean persoonan muotoja.'}
 ]},
 {id:'L054',title:'Rakenna kaksi keskustelua',requiredIds:['C10-X26','C10-X27','C10-X19'],requiredMediaIds:['review:L054:M-COM-01'],steps:[
  {id:'L054-S1',kind:'recall',title:'Muista kaksi puhuttelutilannetta',minutes:4,instructionFi:'Mieti, miten keskustelu kahden tutun välillä eroaa opiskelijan ja uuden opettajan keskustelusta. Kertaa du ja Sie.'},
  {id:'L054-S2',kind:'listen',title:'Berna-vertailu ja erillinen alkuperäinen kertausääni',minutes:8,instructionFi:'C10:n Teksti B sisältää Bernan alkuperäisen 12 repliikin haastattelun kokonaisena, ja voit verrata sitä Haraldin haastatteluun. Lisäksi kuuntelet C01:stä tutun alkuperäisen Franz–Jörg-äänitteen uudelleen. Se ei ole Haraldin tai Bernan äänite eikä videon korvike.',chapterId:'C10'},
  {id:'L054-S3',kind:'practice',title:'Tee kahden henkilön vertailu',minutes:5,instructionFi:'Vastaa Bernan ja Haraldin oikeiden haastatteluiden pohjalta kotikaupunkeja vertaavaan kysymykseen. Vertailu perustuu vain lähdeteksteihin, ei arvattuihin videohavaintoihin.',chapterId:'C10',exerciseIds:['C10-X19']},
  {id:'L054-S4',kind:'practice',title:'Kirjoita kaksi erilaista kohtaamista',minutes:10,instructionFi:'Kirjoita kaksi erillistä 6–8 repliikin keskustelua kuvitteellisille henkilöille: (A) kaksi samanikäistä tutustuu, (B) opiskelija ja uusi saksankielinen opettaja tapaavat. Tarkista puhuttelut ja oma mallivastaus. Älä anna oikeita nimiä, osoitteita tai puhelinnumeroita.',chapterId:'C10',exerciseIds:['C10-X26','C10-X27']},
  {id:'L054-S5',kind:'check',title:'Erottele lähteet oikein',minutes:3,instructionFi:'Oppitunnin kuuntelumerkintä tulee vain, jos erillinen Franz–Jörg-ääni oikeasti soi loppuun tässä vaiheessa. Haraldin tai Bernan videoista ei synny valheellisia toistomerkintöjä.'}
 ]},
 {id:'L055',title:'Harjoittele ja testaa C10',requiredIds:['EX-C10'],steps:[
  {id:'L055-S1',kind:'recall',title:'Koko kertaus ilman mallia',minutes:4,instructionFi:'Tervehdi, kerro nimi, kysy mistä tullaan, kysy vointia, esittele toinen henkilö ja hyvästele. Muista ainakin er heißt ja Sie heißen.'},
  {id:'L055-S2',kind:'vocabulary',title:'Tarkista oma sanasto',minutes:5,instructionFi:'Kertaa opitut perusfraasit kaikista tähän mennessä toteutetuista kappaleista, varsinkin Das ist, Er kommt aus, Schön, dich kennenzulernen ja kohtelias Sie.',chapterId:'C10'},
  {id:'L055-S3',kind:'practice',title:'C10:n oma 20 kysymyksen kappaletesti',minutes:13,instructionFi:'Tee 20 automaattisesti tarkistettavaa tehtävää. Tämä erillinen kappaletesti ei ole koko LOS! 1:n loppukoe eikä korvaa sitä. Oikeat vastaukset näytetään vasta kokonaisena palauttamisen jälkeen.',chapterId:'C10',exerciseIds:['EX-C10']},
  {id:'L055-S4',kind:'reflection',title:'Arvioi esittelytaitosi',minutes:5,instructionFi:'Kirjoita suomeksi, osaatko muodostaa tuttavallisen ja kohteliaan kohtaamisen. Kirjaa myös, mihin tarvitset vielä kertausta.'},
  {id:'L055-S5',kind:'check',title:'Oppitunnin yhteenveto',minutes:3,instructionFi:'C10 on tässä lähdelitteraatin ja harjoitusmateriaalin ensimmäinen toteutettu versio. Haraldin videon tarkistus, C06 ja C08 sekä koko kirjan loppukoe jäävät vielä erikseen hyväksyttäviksi.'}
 ]}
];
