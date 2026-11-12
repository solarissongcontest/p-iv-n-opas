import type { LosLessonBlueprint } from "./lessonEngine";

/**
 * Four clearly delimited, source-INDEPENDENT guided lessons. Full C08 and C10
 * primary reading/listening lessons remain blocked by missing vetted source.
 * The source-ready flag and sourceRegistry stay unchanged. No fabricated A1
 * source interview or unsupported audio is presented as authentic.
 */
export const LOS1_C08_C10_PARTIAL_LESSONS: readonly LosLessonBlueprint[] = [
  {
    id:"L041", title:"Selviytymisfraasit",
    objective:"Osaan pyytää saksaksi toistamaan, hidastamaan ja selittämään.",
    estimatedMinutes:30, contentVersion:"1.0.0",
    steps:[
      {id:"phrases",label:"Opiskele avunpyyntöfraasit",instruction:"Avaa C08:n sanasto. Harjoittele Ich verstehe nicht, Bitte langsamer ja Können Sie das bitte wiederholen? kokonaisina fraaseina. C08:n alkuperäishaastattelu ei ole vielä luettavissa.",chapter:"08",section:"vocabulary",minutes:10},
      {id:"practice",label:"Tunnista viisi käyttötilannetta",instruction:"Vastaa harjoituksiin C08-EX-01, C08-EX-02, C08-EX-03, C08-EX-04 ja C08-EX-05. Tarkista oikeat muodot vasta oman yrityksen jälkeen.",chapter:"08",section:"practice",minutes:12},
      {id:"speak",label:"Käytä pyyntöä ääneen",instruction:"Kuvittele luokkatilanne, jossa et ymmärrä kysymystä. Valitse ja sano yksi sopiva saksankielinen selviytymisfraasi. Ääntämistä ei pisteytetä koneellisesti.",chapter:"08",section:"apply",minutes:4},
    ],
    evidence:[{kind:"answered-practice",ids:["C08-EX-01","C08-EX-02","C08-EX-03","C08-EX-04","C08-EX-05"],label:"Viisi selviytymisfraasien tunnistustehtävää vastattu."}],
    check:{question:"Miten pyydät kohteliaasti puhumaan hitaammin?",answers:[{id:"a",text:"Bitte langsamer."},{id:"b",text:"Guten Morgen!"},{id:"c",text:"Ich komme aus Finnland."}],correctId:"a",explanation:"Bitte langsamer. on lyhyt avunpyyntö, kun puhe etenee liian nopeasti."},
  },
  {
    id:"L043",title:"Kuuntelustrategiat ja selityspyynnöt",
    objective:"Valitsen sopivan avunpyynnön, kun en ymmärrä sanaa tai tarvitsen toiston.",
    estimatedMinutes:30,contentVersion:"1.0.0",
    steps:[
      {id:"strategy",label:"Opiskele kuuntelun selviytymiskeinot",instruction:"Lue C08:n kielioppisivun kolme strategiaa: kerro ettet ymmärrä, pyydä toistoa ja kysy sanan merkitystä. Uutta C08:n kuunteluäänitettä ei ole vielä tarkistettu eikä se ole tämän tunnin suoritusvaatimus.",chapter:"08",section:"grammar",minutes:11},
      {id:"phrases",label:"Kertaa lyhyet pyynnöt",instruction:"Kertaa Ich verstehe nicht, Noch einmal, bitte ja Was bedeutet das? Peitä suomennokset ja tunnista, mitä eri tilanteessa kannattaa sanoa.",chapter:"08",section:"vocabulary",minutes:8},
      {id:"drill",label:"Tarkista neljä selviytymisharjoitusta",instruction:"Vastaa C08-EX-06, C08-EX-07, C08-EX-11 ja C08-EX-12. Kokeile lopuksi lausua kohtelias kysymys ääneen.",chapter:"08",section:"practice",minutes:7},
    ],
    evidence:[{kind:"answered-practice",ids:["C08-EX-06","C08-EX-07","C08-EX-11","C08-EX-12"],label:"Neljä selityspyyntöjen ja sanaston tehtävää vastattu."}],
    check:{question:"Miten kysyt Mitä tämä tarkoittaa?",answers:[{id:"a",text:"Wie heißt du?"},{id:"b",text:"Was bedeutet das?"},{id:"c",text:"Wie alt bist du?"}],correctId:"b",explanation:"Was bedeutet das? kysyy sanan tai ilmauksen merkitystä. Varsinaista kuullunymmärtämistä ei arvioida tässä."},
  },
  {
    id:"L051",title:"Kokoa esittelyfraasit",
    objective:"Yhdistän jo opitut esittäytymisen, nimen, lähtömaan ja kuulumisten fraasit.",
    estimatedMinutes:30,contentVersion:"1.0.0",
    steps:[
      {id:"earlier",label:"Kertaa edellisen kappaleen aito tekstimalli",instruction:"Avaa C02:n Franz–Greta-dialogi ja etsi Ich heiße ja Wie heißt du. C10:n oma uusi alkuperäinen Harald-haastattelu odottaa vielä tarkistettavaa lähdettä, joten aiempaa tekstiä ei kutsuta uudeksi C10:n Text A:ksi.",chapter:"02",section:"text",minutes:10},
      {id:"culture",label:"Vertaa lähtömaan kertomiseen",instruction:"Avaa C03:n Lisa Müllerin alkuperäinen keskustelu. Etsi lähtömaata ilmaiseva Ich komme aus Deutschland ja kerro vasta sitten kuvitteellinen oma lähtömaa.",chapter:"03",section:"text",minutes:9},
      {id:"quick",label:"Vastaa kaksi kertaustehtävää",instruction:"Tee C10-EX-01 ja C10-EX-02 ja kertaa tervehdysten valinta. Ne ovat tämän tunnin itsenäiset harjoitusnäytöt, eivät korvaa puuttuvaa C10-haastattelua.",chapter:"10",section:"practice",minutes:7},
    ],
    evidence:[{kind:"answered-practice",ids:["C10-EX-01","C10-EX-02"],label:"Kaksi esittelyfraasien kertauskysymystä vastattu."}],
    check:{question:"Millä fraasilla kerrot oman kuvitteellisen nimesi?",answers:[{id:"a",text:"Wie heißt du?"},{id:"b",text:"Ich heiße Mia."},{id:"c",text:"Wie geht's?"}],correctId:"b",explanation:"Ich heiße Mia. on mallilause nimen kertomiseen. C10:n uusi Text A on erillinen keskeneräinen lähdetarve."},
  },
  {
    id:"L053",title:"Esittele kolmas henkilö",
    objective:"Osaan valita er- ja sie-pronomineille oikeat sein-, heißen- ja kommen-muodot.",
    estimatedMinutes:30,contentVersion:"1.0.0",
    steps:[
      {id:"grammar",label:"Tutki kolmannen persoonan verbimuotoja",instruction:"Lue C10:n kielioppitaulukko. Vertaa er/sie heißt, er/sie ist ja er/sie kommt. Muista, että pienellä kirjoitettu sie = hän (nainen) on eri kuin kohtelias Sie.",chapter:"10",section:"grammar",minutes:12},
      {id:"drill",label:"Tee neljä kolmannen persoonan tehtävää",instruction:"Vastaa C10-EX-06, C10-EX-07, C10-EX-08 ja C10-EX-10. Kertaa sen jälkeen er/sie-muotojen merkitykset ilman taulukkoa.",chapter:"10",section:"practice",minutes:10},
      {id:"apply",label:"Kirjoita henkilön esittely",instruction:"Tee C10:n soveltamistehtävä kuvitteellisesta henkilöstä: Das ist Mia. Sie heißt Mia. Sie kommt aus Finnland. Älä tallenna oikeita arkaluonteisia tietoja.",chapter:"10",section:"apply",minutes:4},
    ],
    evidence:[{kind:"answered-practice",ids:["C10-EX-06","C10-EX-07","C10-EX-08","C10-EX-10"],label:"Neljä C10:n kolmannen persoonan muototehtävää vastattu."}],
    check:{question:"Mikä lause ilmaisee Hän (mies) tulee Saksasta?",answers:[{id:"a",text:"Er kommst aus Deutschland."},{id:"b",text:"Er komme aus Deutschland."},{id:"c",text:"Er kommt aus Deutschland."}],correctId:"c",explanation:"Er-pronominin kanssa kommen-verbin muoto on kommt: Er kommt aus Deutschland."},
  },
];
