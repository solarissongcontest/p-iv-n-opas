import type {TeacherScene} from "../core.ts";

/** First complete, manually authored Teaching Experience 2.0 pilot.
 * L004 is deliberately the only v2 script until editorial, accessibility
 * and pedagogical acceptance of this model. No generated runtime lessons.
 */
export const LOS_L004_V2:readonly TeacherScene[]=[
  {
    id:"welcome",phase:"introducing",title:"Tänään tervehdit oikeassa tilanteessa",
    kicker:"ALOITUS",intro:"Opit valitsemaan tervehdyksen vuorokaudenajan mukaan ja hyvästelemään ystävän. Harjoittelet ensin tuen kanssa ja sitten ilman mallia.",
    explanation:"Ennen tätä oppituntia sinun kannattaa tuntea Hallo, Guten Morgen, Guten Tag ja Tschüss. Jos sanat ovat vieraita, voit kerrata ne oppikirjan sanastosta. Oppitunnin voi tehdä myös täysin ilman ääntä.",
    book:{label:"Kertaa kappaleen 1 sanasto erillisessä välilehdessä",hash:"#/1/01/vocabulary"},
    simple:"Tänään harjoitellaan kahta asiaa: miten sanot hei ja miten sanot näkemiin.",
  },
  {
    id:"activate",phase:"practicing",title:"Mitä muistat ennestään?",
    kicker:"MUISTELU",intro:"Yritä muistaa ensin ilman sanastoa. Virhe ei estä etenemistä.",
    task:{
      kind:"choice",prompt:"Saavut kielikurssille aamulla. Miten tervehdit?",
      options:[{id:"a",label:"Guten Abend!"},{id:"b",label:"Guten Morgen!"},{id:"c",label:"Tschüss!"}],
      answer:"b",hint:"Morgen on aamu, Abend on ilta. Tschüss on hyvästely.",
      remedial:"Guten tarkoittaa tässä hyvää. Morgen liittyy aamuun ja Abend iltaan. Jos olet juuri saapumassa aamulla, tarvitset Guten Morgen!",
      correctFeedback:"Aivan. Guten Morgen! sopii aamun tervehdykseksi.",
      wrongFeedback:"Katso, kysyttiinkö saapumisesta vai lähtemisestä, ja mihin vuorokaudenaikaan tilanne sijoittuu.",
      wrongTypes:{a:"TIME_OF_DAY",c:"GOODBYE_VS_GREETING"}
    },
    simple:"Morgen = aamu. Abend = ilta. Tschüss = moikka, kun lähdet.",
    comparison:"Guten Morgen on saapumistervehdys aamulla. Tschüss ei ole saapumistervehdys vaan hyvästely.",
    book:{label:"Avaa sanasto ilman että tunti sulkeutuu",hash:"#/1/01/vocabulary"},
  },
  {
    id:"why",phase:"teaching",title:"Tervehdys riippuu tilanteesta",
    kicker:"OPETTAJAN SELITYS",intro:"Samaa saksan tervehdystä ei käytetä joka tilanteessa.",
    explanation:"Kun tapaat jonkun, voit käyttää tuttavallista Hallo!-tervehdystä. Vuorokaudenajan voi ilmaista tervehdyksellä: Guten Morgen! aamulla, Guten Tag! päivällä ja Guten Abend! illalla. Kun eroat ystävästä, käytä esimerkiksi Tschüss! Nukkumaan mennessä sanotaan Gute Nacht! eikä tavallisesti tervehditä uutta tulijaa.",
    example:{german:"Guten Morgen, Aino!",finnish:"Hyvää huomenta, Aino!",reason:"Puhuja tervehtii Ainoa aamulla. Morgen kertoo vuorokaudenajan."},
    simple:"Saavut: Guten Morgen, Guten Tag tai Guten Abend. Lähdet: Tschüss. Menet nukkumaan: Gute Nacht.",
    comparison:"Guten Abend! = hyvää iltaa kun kohtaat ihmisen. Gute Nacht! = hyvää yötä kun mennään nukkumaan.",
  },
  {
    id:"board",phase:"teaching",title:"Rakenna tervehdykset taululla",
    kicker:"OPETUSTAULU",intro:"Etene vaihe kerrallaan. Saksankielisen ilmauksen lopussa näet, milloin sitä käytetään.",
    board:{steps:[
      {heading:"1. Aamu",german:"Guten Morgen!",finnish:"Hyvää huomenta!",explanation:"Morgen tarkoittaa aamua."},
      {heading:"2. Päivä",german:"Guten Tag!",finnish:"Hyvää päivää!",explanation:"Tag tarkoittaa päivää."},
      {heading:"3. Ilta",german:"Guten Abend!",finnish:"Hyvää iltaa!",explanation:"Abend tarkoittaa iltaa."},
      {heading:"4. Hyvästely",german:"Tschüss!",finnish:"Moikka!",explanation:"Tschüss sanotaan yleensä erotessa, ei tullessa."}
    ]},
    simple:"Kiinnitä huomiota tervehdyksen viimeiseen sanaan: Morgen, Tag, Abend. Eroaminen on eri asia: Tschüss.",
    comparison:"Gute Nacht on hyvän yön toivotus. Sitä ei pidä sekoittaa Abend-tervehdykseen.",
  },
  {
    id:"worked",phase:"teaching",title:"Näin opettaja ratkaisee tilanteen",
    kicker:"MALLISUORITUS",intro:"Ratkaistaan esimerkkitilanne vaiheittain, ei vain arvata oikeaa sanaa.",
    explanation:"Tilanne: kello on noin kahdeksan aamulla. Aino saapuu kielikurssille ja tapaa Leonin. 1) Aino saapuu, joten hän tervehtii eikä hyvästele. 2) On aamu, joten valitaan Morgen. 3) Yhdistetään Guten ja Morgen. 4) Saadaan Guten Morgen, Leon! 5) Varmistetaan: emme valinneet Abend (ilta) emmekä Tschüss (lähtö).",
    example:{german:"Guten Morgen, Leon!",finnish:"Hyvää huomenta, Leon!",reason:"Aino tulee paikalle aamulla. Molemmat ehdot täyttyvät."},
    simple:"Kysy kaksi kysymystä: tulenko vai lähdenkö? Onko aamu, päivä vai ilta?",
    comparison:"Jos sama henkilö lähtee tapaamisen jälkeen, hän voi sanoa Tschüss! vuorokaudenajasta riippumatta.",
  },
  {
    id:"guided",phase:"practicing",title:"Kokeile opettajan tuella",
    kicker:"OHJATTU HARJOITTELU",intro:"Saat halutessasi vihjeen. Se ei vähennä harjoittelun arvoa, mutta erotetaan itsenäisestä näytöstä.",
    task:{
      kind:"choice",prompt:"On ilta ja saavut tapaamaan Leonin. Mitä sanot?",
      options:[{id:"a",label:"Guten Abend!"},{id:"b",label:"Gute Nacht!"},{id:"c",label:"Tschüss!"}],
      answer:"a",hint:"Saavut paikalle, et ole lähdössä nukkumaan tai hyvästelemässä. Mieti iltaa tarkoittavaa saksankielistä sanaa.",
      remedial:"Abend tarkoittaa iltaa ja sitä käytetään illan tervehdyksessä. Nacht tarkoittaa yötä, ja Gute Nacht! on tavallinen nukkumaanmenotoivotus.",
      correctFeedback:"Oikein! Illalla saapuessa Guten Abend! on luonteva.",
      wrongFeedback:"Ajattele ensin, mikä tilanteen tarkoitus on: saapumistervehdys, nukkumaanmeno vai hyvästely?",
      wrongTypes:{b:"TIME_OF_DAY",c:"GOODBYE_VS_GREETING"}
    },
    simple:"Ilta on Abend, yö on Nacht. Nyt tervehdimme illalla.",
  },
  {
    id:"book",phase:"teaching",title:"Käytä myös oikeaa oppikirjaa",
    kicker:"OPPIKIRJA",intro:"Opettajan oma selitys kuuluu tähän oppituntiin. Oppikirja täydentää sitä sanastolla ja varsinaisilla harjoituksilla.",
    explanation:"Avaa C01:n sanasto ja kokeile peittää suomennokset. Sano Guten Morgen!, Guten Abend! ja Tschüss! ilman käännöksiä. Oppikirja avautuu erilliseen välilehteen, joten palaat tähän samaan opetustilanteeseen.",
    book:{label:"Avaa C01:n sanasto",hash:"#/1/01/vocabulary"},
    simple:"Tunti pysyy auki, vaikka katsot kirjan sanoja.",
  },
  {
    id:"independent",phase:"practicing",title:"Palauta tervehdys muistista",
    kicker:"ITSENÄINEN HARJOITTELU",intro:"Nyt kirjoitat ilmauksen itse ilman näkyviä vastausvaihtoehtoja.",
    task:{
      kind:"short",prompt:"Kirjoita saksaksi: Hyvää huomenta!",
      answer:"Guten Morgen",hint:"Ensimmäinen sana alkaa Gut-, toinen tarkoittaa aamua.",
      remedial:"Oikea ilmaus on Guten Morgen! Voit sanoa sen ääneen ja yrittää uudelleen. Saksan kirjoitusasussa Morgen alkaa isolla M:llä.",
      correctFeedback:"Oikein: Guten Morgen! Muistit ilmauksen ilman valmiita vaihtoehtoja.",
      wrongFeedback:"Tarkista, että käytit aamua tarkoittavaa sanaa Morgen etkä Abend. Voit yrittää uudelleen."
    },
    simple:"Suomen 'hyvää huomenta' on saksaksi Guten Morgen.",
  },
  {
    id:"transfer",phase:"applying",title:"Käytä osaamistasi uudessa tilanteessa",
    kicker:"SOVELTAMINEN",intro:"Tässä valitaan ilmaus tilanteen tarkoituksen eikä vain sanan suomennoksen perusteella.",
    task:{
      kind:"choice",prompt:"Oppitunti päättyy. Lähdet koululta ja hyvästelet kaverisi rennosti. Mitä sanot?",
      options:[{id:"a",label:"Guten Tag!"},{id:"b",label:"Guten Morgen!"},{id:"c",label:"Tschüss!"}],
      answer:"c",hint:"Puhuja lähtee pois. Tarvitset hyvästelyn, et saapumistervehdystä.",
      remedial:"Tschüss tarkoittaa rentoa hyvästelyä. Guten Tag ja Guten Morgen ovat tervehdyksiä, joita käytetään kohdatessa toinen ihminen.",
      correctFeedback:"Oikein. Tschüss! sopii tutun ihmisen hyvästelyyn.",
      wrongFeedback:"Mieti, mitä tilanteessa tapahtuu juuri nyt: tapaaminen alkaa vai päättyy?",
      wrongTypes:{a:"GOODBYE_VS_GREETING",b:"GOODBYE_VS_GREETING"}
    },
    simple:"Kun lähdet kaverin luota, sano Tschüss!",
  },
  {
    id:"check",phase:"reviewing",title:"Lopputarkistus",
    kicker:"ITSENÄINEN TARKISTUS",intro:"Varmistetaan vielä yksi usein sekoittuva asia. Yksi oikea vastaus ei yksin todista koko taidon hallintaa.",
    task:{
      kind:"choice",prompt:"Ystävä on menossa nukkumaan. Mitä toivotat?",
      options:[{id:"a",label:"Gute Nacht!"},{id:"b",label:"Guten Abend!"},{id:"c",label:"Guten Tag!"}],
      answer:"a",hint:"Nacht tarkoittaa yötä. Tässä ei enää tervehditä illalla.",
      remedial:"Gute Nacht! toivotetaan nukkumaan mennessä. Guten Abend! on illan saapumistervehdys. Näitä ei vaihdeta keskenään.",
      correctFeedback:"Juuri niin. Gute Nacht! on hyvän yön toivotus.",
      wrongFeedback:"Tarkista ero: iltatervehdys vai nukkumaanmenotoivotus?",
      wrongTypes:{b:"TIME_OF_DAY",c:"TIME_OF_DAY"}
    },
    simple:"Nukkumaan mennessä: Gute Nacht. Illalla tavatessa: Guten Abend.",
  },
  {
    id:"summary",phase:"reviewing",title:"Mitä opit?",
    kicker:"YHTEENVETO",intro:"Kertasit tervetulo- ja lähtötilanteiden eron, vuorokaudenaikaan liittyvät tervehdykset ja yhden itsenäisen kirjoitusharjoituksen.",
    explanation:"Tärkeimmät ilmaukset: Guten Morgen! (aamulla), Guten Tag! (päivällä), Guten Abend! (illalla), Tschüss! (hyvästeltäessä) ja Gute Nacht! (nukkumaan mennessä). Jos jokin sekoittui, voit palata aiempiin opetustilanteisiin. Seuraavalla opiskelukerralla harjoittele samoja sanoja uudessa tilanteessa.",
    example:{german:"Guten Morgen! … Tschüss!",finnish:"Hyvää huomenta! … Moikka!",reason:"Saapumistervehdys ja hyvästely ovat eri viestintätilanteita."},
    simple:"Tärkeintä on tilanteen tunnistaminen. Saat edetä omaan tahtiin.",
    book:{label:"Kertaa opittua oppikirjan harjoituksissa",hash:"#/1/01/practice"}
  },
];
export function validateL004Script(scenes:readonly TeacherScene[]):string[]{
 const problems:string[]=[];
 const ids=new Set<string>();
 scenes.forEach((scene,index)=>{
  if(!scene.id||ids.has(scene.id))problems.push("Duplicate scene: "+scene.id);
  ids.add(scene.id);
  if(!scene.title||!scene.intro||!scene.kicker)problems.push("Incomplete scene "+index);
  if(scene.task && (!scene.task.prompt||!scene.task.answer||!scene.task.correctFeedback||!scene.task.wrongFeedback||!scene.task.remedial))
    problems.push("Incomplete task "+scene.id);
  if(scene.task?.kind==="choice"&&!scene.task.options?.some(option=>option.id===scene.task?.answer))
    problems.push("Incorrect choice key "+scene.id);
  if(scene.board&&scene.board.steps.length<2)problems.push("Too short teaching board "+scene.id);
 });
 return problems;
}
