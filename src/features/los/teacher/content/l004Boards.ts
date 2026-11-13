import {type TeacherBoard} from "../boards/boardModel.ts";

/** Only the established L004 vocabulary is used; editorial review is pending.
 * Boards are human-authored deterministic steps without inferred pronunciation.
 */
export const L004_RULE_BOARD:TeacherBoard={
  id:"l004-evening-comparison",
  review:"draft",
  title:"Illalla kohdataan vai mennään nukkumaan?",
  objective:"Ymmärrän eron illan tervehdyksen ja hyvän yön toivotuksen välillä.",
  steps:[
    {id:"meeting",heading:"Ensin tapahtuu kohtaaminen",
     explanation:"Kohtaat ystäväsi illalla seitsemältä. Kumpikaan ei ole vielä lähdössä nukkumaan.",
     parts:[{label:"Tilanne",text:"Tapaaminen"},{label:"Aika",text:"Ilta, kello 19"}]},
    {id:"evening",heading:"Valitsen illan tervehdyksen",
     explanation:"Koska ystävä tulee vastaan illalla, käytän tervehdyksenä ilmaisua Guten Abend!.",
     parts:[{label:"Saksaksi",text:"Guten Abend!",language:"de",emphasis:true},
       {label:"Suomeksi",text:"Hyvää iltaa!",language:"fi"}]},
    {id:"bedtime",heading:"Sama ilta, mutta uusi tilanne",
     explanation:"Myöhemmin ystäväsi sanoo menevänsä nukkumaan. Nyt et enää tervehdi häntä.",
     parts:[{label:"Tilanne",text:"Nukkumaanmeno"},{label:"Tarkoitus",text:"Hyvän yön toivottaminen"}]},
    {id:"night",heading:"Toivotan hyvää yötä",
     explanation:"Kun ystävä menee nukkumaan, sanon Gute Nacht! enkä Guten Abend!.",
     parts:[{label:"Saksaksi",text:"Gute Nacht!",language:"de",emphasis:true},
       {label:"Suomeksi",text:"Hyvää yötä!",language:"fi"}]},
    {id:"contrast",heading:"Vertaan valintoja",
     explanation:"Vuorokaudenaika on kummassakin ilta. Ratkaiseva ero on se, tavataanko vai mennäänkö nukkumaan.",
     parts:[{label:"Illan kohtaaminen",text:"Guten Abend!",language:"de",emphasis:true},
       {label:"Nukkumaanmeno",text:"Gute Nacht!",language:"de",emphasis:true}]}
  ],
  takeaway:"Guten Abend! on illan tervehdys. Gute Nacht! toivotetaan yleensä ennen nukkumaanmenoa."
};
export const L004_MODEL_BOARD:TeacherBoard={
  id:"l004-morning-decision",
  review:"draft",
  title:"Näin opettaja päättää oikean tervehdyksen",
  objective:"Osaan päätellä aamulla sopivan tervehdyksen kohtaamisen ja vuorokaudenajan perusteella.",
  steps:[
    {id:"situation",heading:"Luen ensin tilanteen",
     explanation:"Saavut kouluun aamulla ja näet opettajan käytävällä. Päätän ennen sanaa, mitä tilanteessa tapahtuu.",
     parts:[{label:"Paikka",text:"Koulun käytävä"},{label:"Henkilö",text:"Opettaja"}]},
    {id:"meeting",heading:"Tunnistan tilanteen",
     explanation:"Olet vasta tulossa paikalle. Opettaja tulee vastaan, joten tarvitset tervehdyksen etkä hyvästelyä.",
     parts:[{label:"Tilanne",text:"Kohtaaminen"},{label:"Tarvitsen",text:"Tervehdyksen"}]},
    {id:"morning",heading:"Tarkistan vuorokaudenajan",
     explanation:"Kello on kahdeksan. On aamu, joten etsin aamulla käytettävän tervehdyksen.",
     parts:[{label:"Kellonaika",text:"8.00"},{label:"Vuorokaudenaika",text:"Aamu"}]},
    {id:"answer",heading:"Valitsen ja käännän",
     explanation:"Aamun tervehdys on Guten Morgen!. Voit liittää siihen kohteliaan puhuttelun.",
     parts:[{label:"Saksaksi",text:"Guten Morgen, Frau Müller!",language:"de",emphasis:true},
       {label:"Suomeksi",text:"Hyvää huomenta, rouva Müller!",language:"fi"}]},
    {id:"verify",heading:"Tarkistan, miksi muut eivät sovi",
     explanation:"Guten Abend! liittyy iltaan ja Tschüss! on hyvästely. Kumpikaan ei sovi tähän aamun kohtaamiseen.",
     parts:[{label:"Ilta",text:"Guten Abend!",language:"de"},
       {label:"Lähtötilanne",text:"Tschüss!",language:"de"},
       {label:"Tähän tilanteeseen",text:"Guten Morgen!",language:"de",emphasis:true}]}
  ],
  takeaway:"Ensin tunnistan, onko kyse kohtaamisesta. Sitten tarkistan vuorokaudenajan ja valitsen sopivan tervehdyksen."
};
export const L004_BOARDS:Readonly<Record<"rule"|"model",TeacherBoard>>={
  rule:L004_RULE_BOARD,model:L004_MODEL_BOARD
};
