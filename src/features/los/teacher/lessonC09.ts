import type { TeacherLesson, TeacherScene, TeacherQuestion } from "./engine.ts";

/**
 * C09 Teacher 2.0. The original Text A and B are rendered from the canonical
 * book source registries by the player, never paraphrased as fake source text.
 * M-WB-03 is a seven-turn reading; M-COM-07 is a seven-day spoken word list,
 * NOT an appointment recording. Media playback is never inferred.
 *
 * Editorial preview: independent German QA and mobile audio verification pending.
 */
const S=(id:string,phase:string,kind:TeacherScene["kind"],title:string,
  paragraphs:string[],extra:Partial<TeacherScene>={}):TeacherScene=>
  ({id,phase,kind,title,paragraphs,...extra});
type Option=[id:string,label:string,wrong?:string|undefined,lang?:"fi"|"de"];
const Q=(id:string,phase:string,title:string,paragraphs:string[],prompt:string,
  options:Option[],correctOption:string,evidenceRole:NonNullable<TeacherQuestion["evidenceRole"]>,
  success:string,hint:string,reteach:string):TeacherScene =>
  S(id,phase,"question",title,paragraphs,{
    question:{prompt,type:"choice",skillId:"L1-TIME-01",evidenceRole,
      options:options.map(([id,label,wrongFeedback,lang])=>({id,label,...(wrongFeedback ? {wrongFeedback} : {}),...(lang ? {lang} : {})})),
      correctOption,success,hint,reteach,genericWrong:reteach},
  });
const T=(id:string,phase:string,title:string,paragraphs:string[],prompt:string,
  accepted:string[],evidenceRole:NonNullable<TeacherQuestion["evidenceRole"]>,
  success:string,hint:string,reteach:string,wrongAnswers?:Record<string,string>):TeacherScene=>
  S(id,phase,"question",title,paragraphs,{
    question:{prompt,type:"text",skillId:"L1-TIME-01",evidenceRole,
      accepted,success,hint,reteach,genericWrong:reteach,...(wrongAnswers ? {wrongAnswers} : {})},
  });
const B=(id:string,title:string,paragraphs:string[],sections:string[]):TeacherScene =>
  S(id,"Oppikirjan tehtävät","book",title,paragraphs,{
    bookLinks:sections.map(section=>({chapterId:"09",section,label:"C09 · "+({
      "text":"Text A","understand":"Ymmärrä","text-b":"Text B",
      "vocabulary":"Sanasto","practice":"Harjoittele",
      "grammar":"Kielioppi","apply":"Käytä saksaa","test":"Kappaletesti",
    } as Record<string,string>)[section],instruction:"Käytä digikirjan alkuperäistä aineistoa ja säilytä sama tehtävätunniste."})),
  });
const R=(id:string,title:string,prompt:string,placeholder:string,minLength:number,
  paragraphs:string[]):TeacherScene=>S(id,"Sovella itse","reflection",title,paragraphs,{
    reflection:{prompt,placeholder,minLength},
    help:[{title:"En ymmärrä · kirjoita oma ajankohta",body:"Aloita Hallo! ja jatka Ich habe am Montag um drei Uhr Zeit. Päätä Bis dann! Muuta itse päivä tai kellonaika. Vapaa kirjoitus tarkistetaan omalla tarkistuslistalla, ei konearvosanalla."}],
  });
const C=(id:string,title:string,prompt:string,day:string,time:string,sourceNote:string,
  paragraphs:string[],activityId:string):TeacherScene =>
  S(id,"Kalenteriharjoitus","calendar",title,paragraphs,{
    calendar:{prompt,day,time,sourceNote},
    activityId,activityLabel:"Vahvista oikea kalenterimerkintä",
    help:[{title:"Mistä aloitan?",body:"1. Tunnista saksankielinen viikonpäivä. 2. Vertaa kelloa saksan um + lukusana + Uhr -rakenteeseen. 3. Valitse päivä ja kellonaika, tarkista palaute ja vahvista vasta sitten."}],
  });
const summary=(paragraphs:string[])=>S("summary","Yhteenveto","summary","Itsenäinen lopputarkistus",paragraphs,{
  help:[{title:"Mitä tarkoittaa lopputarkistus?",body:"Vastaa lopun kysymykseen ilman mallia ja tarkastele saamiasi palautteita. Näkymän läpikäynti ei yksin todista muistamista, puhumista tai kuullunymmärtämistä."}],
});
const lesson=(id:string,title:string,objective:string,scenes:TeacherScene[],
  requiredPracticeIds:string[]=[],requiredCheckedIds:string[]=[],
  requiredActivityIds:string[]=[],chapterAssessment?:TeacherLesson["chapterAssessment"]):TeacherLesson=>({
    id,bookId:1,chapterId:"09",version:"2.0.0-preview.1",title,objective,estimatedMinutes:30,
    scenes,requiredQuestionIds:scenes.filter(s=>s.question).map(s=>s.id),
    requiredPracticeIds,requiredCheckedIds,requiredActivityIds,...(chapterAssessment ? {chapterAssessment} : {}),
  });

export const LOS1_L046_TEACHER=lesson("L046","Viikonpäivät",
  "Tunnistan seitsemän viikonpäivää, valitsen oikean päivän ja ilmaisen esimerkiksi maanantaina = am Montag.",[
  S("welcome","Johdanto","introduction","Miksi viikonpäivät kannattaa osata?",[
    "Kun sovit tapaamisen, tarvitset päivän ja myöhemmin kellonajan. Ensin opettelemme seitsemän viikonpäivää niin, että tunnistat ne kalenterista ja muistat niiden saksankieliset nimet.",
    "Tässä tunnissa opit sekä sanojen merkitykset että am + viikonpäivä -rakenteen. Sinun ei tarvitse vielä hallita koko saksan sijamuotojärjestelmää.",
    "Tunnin opetusta ja esimerkkejä voi kerrata. Harjoitukset tallentuvat samaan C09-kappaleeseen kuin digikirjassa.",
  ],{chapterPhoto:true}),
  Q("recall","Muistelu","Päivä vai numero?",["C06:ssa harjoittelit numeroita, joita tarvitset myöhemmin kellonaikojen sanomiseen."],
    "Mikä tarkoittaa lukua kolme?",[["a","drei"],["b","dreißig","Dreißig tarkoittaa kolmeakymmentä."],["c","zwei","Zwei tarkoittaa kahta."]],"a","practice",
    "Oikein: drei = kolme.","Etsi kolmikirjaiminen lukusana, jonka lopussa on i.","Drei = 3. Zwei = 2. Dreißig = 30."),
  Q("precheck-weekday","Esikysymys 2","Tunnistatko maanantain?",[
    "Tämä on lähtötason esikysymys ennen viikonpäivien varsinaista opetusta. Jos et tiedä vastausta vielä, se on odotettua. Voit kokeilla ja lukea palautteen.",
  ],"Mikä tarkoittaa maanantaita?",[
    ["a","Dienstag","Dienstag on tiistai. Oikea sana on Montag."],
    ["b","Montag"],
    ["c","Samstag","Samstag on lauantai. Oikea sana on Montag."],
  ],"b","practice",
    "Oikein: Montag = maanantai.","Maanantai on Montag; viikonpäivät kirjoitetaan saksaksi isolla.","Montag tarkoittaa maanantaita. Dienstag on tiistai ja Samstag lauantai."),
  S("weekday-source","Alkuperäinen aineisto","source","Aito viikonpäiväluettelo · Text B",[
    "Lue alta C09:n alkuperäinen, kokonainen M-COM-07-viikonpäiväluettelo. Tunnista jo nyt Montag, Dienstag ja Mittwoch. Koko aineisto näytetään suoraan LOS!:ssa.",
    "Tämä on ihmisen äänittämä viikonpäivien sanalista, ei keskustelu tapaamisajasta. Tässä tunnissa tekstin lukeminen riittää: äänen olemassaoloa tai onnistunutta kuuntelua ei merkitä automaattisesti.",
    "Kun olet lukenut luettelon, jatka suomenkieliseen selitykseen ja muistele viikonpäiviä opetustaulun avulla. Palaamme samaan aitoon Text B -lähteeseen L049:ssä.",
  ],{textBChapterId:"09",help:[{title:"Mikä tässä on tärkeää?",body:"Etsi luettelosta seitsemän viikonpäivää järjestyksessä, Montag ensin ja Sonntag viimeisenä. Älä etsi kellonaikoja, sillä niitä ei tässä alkuperäisessä äänilähteessä ole."}]}),
  S("days","Opettajan selitys","explanation","Viikon seitsemän päivää",[
    "Saksassa viikko alkaa tavallisissa viikkokalenterinäkymissä maanantaista. Maanantai = Montag, tiistai = Dienstag, keskiviikko = Mittwoch, torstai = Donnerstag.",
    "Perjantai = Freitag, lauantai = Samstag ja sunnuntai = Sonntag. Nämä ovat saksan substantiiveja ja alkavat isolla kirjaimella, vaikka suomeksi viikonpäivät kirjoitetaan pienellä.",
    "Monissa maissa viikonloppu on Samstag ja Sonntag. Opettele päivät myös peräkkäisessä järjestyksessä: Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag.",
    "Muistisääntö: Mittwoch on kirjaimellisesti viikon keskikohtaan viittaava nimitys. Dienstag ja Donnerstag alkavat D:llä, mutta niiden loppu on eri.",
  ],{help:[{title:"Sekoitan Dienstag ja Donnerstag",body:"Dienstag = tiistai. Donnerstag = torstai. Huomaa Donnerstag-sanan alku Donner-, jota Dienstagin lyhyessä nimessä ei ole."},
    {title:"Miksi iso alkukirjain?",body:"Saksan viikonpäivät ovat substantiiveja. Kirjoita Montag ja Freitag myös keskellä lausetta isolla alkukirjaimella."}]}),
  S("day-board","Opettajan mallisuoritus","board","Näin luet viikkokalenterin",[
    "Lue jokainen päivä ensin suomeksi, sitten saksaksi. Peitä vastine ja palauta sana muistista. Käy koko viikon järjestys läpi ennen seuraavaa kysymystä.",
  ],{board:[
    {label:"1 · maanantai",german:"Montag",meaning:"Viikon ensimmäinen päivä"},
    {label:"2 · tiistai",german:"Dienstag",meaning:"Toinen päivä"},
    {label:"3 · keskiviikko",german:"Mittwoch",meaning:"Kolmas päivä"},
    {label:"4 · torstai",german:"Donnerstag",meaning:"Neljäs päivä"},
    {label:"5 · perjantai",german:"Freitag",meaning:"Viides päivä"},
    {label:"6 · lauantai",german:"Samstag",meaning:"Kuudes päivä"},
    {label:"7 · sunnuntai",german:"Sonntag",meaning:"Seitsemäs päivä"},
  ]}),
  Q("guided","Ohjattu harjoitus","Mitä on keskiviikko?",["Palauta kolmas päivä mieleen. Palaa tauluun tarvittaessa."],
    "Mikä on keskiviikko saksaksi?",[["a","Montag","Montag on maanantai."],["b","Mittwoch"],["c","Freitag","Freitag on perjantai."]],"b","practice",
    "Oikein: Mittwoch = keskiviikko.","Sanan alku on Mitt-.","Montag = maanantai; Mittwoch = keskiviikko; Freitag = perjantai."),
  S("am-rule","Opettajan selitys","explanation","Am kertoo, minä viikonpäivänä",[
    "Viikonpäivän nimi ei yksin yleensä ilmaise lauseessa 'maanantaina'. Käytä opittavaa kokonaisuutta am Montag = maanantaina.",
    "Samalla tavalla am Dienstag = tiistaina, am Mittwoch = keskiviikkona ja am Sonntag = sunnuntaina. Pidä am erillisenä sanana ja viikonpäivä isolla.",
    "Mallisuoritus: haluan sanoa 'perjantaina'. Valitsen ensin Freitag, lisään eteen am ja saan am Freitag. En käytä um-prepositiota, sillä nyt puhutaan päivästä, ei kellonajasta.",
    "Toinen hyödyllinen ilmaus on am Wochenende = viikonloppuna. Sitä ei kuitenkaan vaihdeta yksittäisen päivän nimeksi.",
  ],{help:[{title:"Selitä toisella tavalla",body:"Am on tässä kuin suomen viikonpäivän -na/-nä-pääte. Maanantai → maanantaina. Montag → am Montag."}]}),
  Q("guided-am","Ohjattu harjoitus","Valitse oikea ajanilmaus",["Suomennetaan 'tiistaina'. Etsi ensin Dienstag ja tarkista sen etuliite."],
    "Mikä tarkoittaa tiistaina?",[["a","um Dienstag","Um liittyy kellonaikaan, ei tässä viikonpäivään."],["b","am Dienstag"],["c","am Donnerstag","Tämä tarkoittaa torstaina."]],"b","practice",
    "Oikein. Am Dienstag tarkoittaa tiistaina.","Muista am + oikea päivä.","Dienstag tarkoittaa tiistaita ja am Dienstag tiistaina."),
  B("book-practice","Oikeat tehtävät samassa kirjassa",[
    "Avaa C09:n Sanasto ja Harjoittele. Tee alkuperäiset C09-EX-01, C09-EX-02 ja C09-EX-03. Ne koskevat maanantaita, tiistaita ja keskiviikkoa.",
    "Vastausten pitää tallentua kirjan tehtäviin. Pelkkä tämän välilehden avaaminen ei riitä suoritukseksi.",
  ],["vocabulary","practice"]),
  T("independent","Itsenäinen harjoitus","Muodosta ajanilmaus ilman mallia",[
    "Älä katso opetustaulua. Kirjoita lyhyt saksankielinen ilmaus, joka tarkoittaa 'torstaina'.",
  ],"Kirjoita: torstaina",["am Donnerstag"],"independent",
    "Oikein: am Donnerstag.","Tarvitset kaksi sanaa: am ja torstain nimen.","Torstai = Donnerstag; torstaina = am Donnerstag.",
    {"um donnerstag":"Um ei sovi viikonpäivän eteen.","am dienstag":"Dienstag on tiistai, Donnerstag torstai."}),
  Q("transfer","Soveltaminen","Valitse tapaamispäivä",[
    "Kuvitteellinen ystävä lähettää viestin: Ich habe am Freitag Zeit. Tämä tarkoittaa, että hänellä on aikaa perjantaina. Valitse oikea päivä.",
  ],"Minkä viikonpäivän merkitset kalenteriin?",[["a","Donnerstag","Tämä on torstai, ei Freitag."],["b","Samstag","Tämä on lauantai."],["c","Freitag"]],"c","application",
    "Oikein. Freitag tarkoittaa perjantaita.","Katso viestin sanasta Freitag sen viimeinen osa -tag.","Am Freitag = perjantaina."),
  R("own-day","Kirjoita oma lyhyt ajanilmaus",
    "Kirjoita lyhyt oma lause tai fraasi, jossa on am ja valitsemasi viikonpäivä.",
    "Ich habe am Samstag Zeit.",15,[
      "Esimerkki: Ich habe am Montag Zeit. = Minulla on aikaa maanantaina. Käytä toista päivää tai muuta lausetta.",
      "Tarkista itse, onko mukana am ja isolla alkava oikea viikonpäivä. Tätä omaa tekstiä ei konepisteytetä.",
    ]),
  T("exit","Lopputarkistus","Muistele yksi uusi ilmaus",[
    "Sulje sanastomalli. Näytä, että osaat muodostaa viikonpäivän itse.",
  ],"Kirjoita: lauantaina",["am Samstag"],"exit",
    "Oikein. Lauantaina = am Samstag.","Muistatko Samstag? Edessä tulee am.","Am Samstag on lauantaina, kun taas am Sonntag tarkoittaa sunnuntaina."),
  summary([
    "Opit seitsemän viikonpäivän saksankieliset nimet, isot alkukirjaimet ja am + viikonpäivä -rakenteen.",
    "Tarkista itse: osaatko sanoa tiistaina ja lauantaina ilman apua? Jos et, kertaa opetustaulu ja väärin menneet tehtävät.",
    "Seuraavaksi luet alkuperäisen Sport und Zeit -keskustelun ja etsit siitä kellonaikoja.",
  ]),
],["C09-EX-01","C09-EX-02","C09-EX-03"]);

export const LOS1_L047_TEACHER=lesson("L047","Lue Sport und Zeit",
  "Luen kokonaisen Franzin ja Gretan keskustelun, ymmärrän tapahtumien järjestyksen ja kolme alkuperäistehtävää.",[
  S("welcome","Johdanto","introduction","Mitä kello on ja mitä seuraavaksi tapahtuu?",[
    "L047 on lukutunti: alkuperäinen M-WB-03 Sport und Zeit on kokonaisuudessaan seuraavassa opetustilanteessa. Kukaan ei väitä sen olevan opiskelijan tuottama dialogi.",
    "Tavoitteena on huomata kaksi kellonaikaa, päätellä mitä Franz aikoo tehdä ja ymmärtää Gretan vastaus. Alkuperäisen tekstin vaikeita rakenteita tuetaan suomeksi.",
    "Tämä lähde ei sisällä sovittua tulevaa tapaamista. Opimme siitä ajan kysymistä ja ilmaisemista, joita käytämme itse myöhemmin tapaamisen sopimiseen.",
  ],{chapterPhoto:true}),
  Q("recall","Esitiedot","Palauta viikonpäivä",["L046:ssa opit viikonpäivien perusmuodot. Ne auttavat myöhemmässä ajan sopimisessa."],
    "Mikä tarkoittaa sunnuntaina?",[["a","um Sonntag","Um liittyy kellonaikaan."],["b","am Sonntag"],["c","am Samstag","Samstag on lauantai."]],"b","practice",
    "Oikein: am Sonntag.","Muista am + Sonntag.","Am Sonntag = sunnuntaina. Am Samstag = lauantaina."),
  S("full-dialogue","Alkuperäinen aineisto","source","Koko Text A · seitsemän puheenvuoroa",[
    "Lue alta kaikki seitsemän Franzin ja Gretan alkuperäistä repliikkiä järjestyksessä. Lähde: M-WB-03, Wikibooks, Sport und Zeit, versio 4003622.",
    "Ensimmäisellä lukukerralla etsi vain kaksi puhujaa ja kysymys Wie spät ist es? Toisella lukukerralla seuraa kellonaikoja ja tapahtumien järjestystä.",
    "Greta sanoo Viertel vor drei eli varttia vaille kolme. Oppitunti tulkitsee sen tässä harjoituksessa klo 14.45:ksi ja Franzin peliajan klo 15.00:ksi. Ilmaus Viertel vor drei ei yksin kerro, onko kyse kello 02.45:stä vai 14.45:stä. Opit muodon um drei aktiivisesti vasta kellonaikatunnilla.",
  ],{sourceChapterId:"09",help:[{title:"Miksi oppitunnissa 14.45?",body:"Viertel on vartti, vor tarkoittaa kellonajoissa vaille ja drei on kolme. Kellonaika on varttia vaille kolme; 14.45 on oppitunnin iltapäiväkontekstin tulkinta, ei alkuperäisilmauksen yksin määräämä 24 tunnin aika."},
    {title:"Pitääkö oppia kaikki sanat?",body:"Ei. Ymmärrä henkilöt, kellonajat, urheilun aloittaminen ja se, että Greta menee kotiin. Vaikeat verbit ovat vielä tunnistamisen tasolla."}]}),
  S("timeline","Opettajan mallisuoritus","board","Tapahtumat oikeaan järjestykseen",[
    "Käyn tekstin läpi vaiheittain: ensin Franz kysyy kelloa, Greta vastaa, sitten Franz kertoo suunnitelmastaan, Greta kertoo menevänsä kotiin ja lopuksi he hyvästelevät.",
    "Tärkeä tarkennus: Franz ei sovi Gretan kanssa jalkapallotapaamista. Hän kertoo omasta jalkapalloajastaan. Älä lisää lähteeseen tapahtumia, joita siinä ei ole.",
  ],{board:[
    {label:"1 · Franz kysyy",german:"Wie spät ist es?",meaning:"Paljonko kello on? (repliikki u01)"},
    {label:"2 · Greta vastaa",german:"Es ist Viertel vor drei.",meaning:"Varttia vaille kolme; tämän harjoituksen tulkinta 14.45 (u02)"},
    {label:"3 · Franzin suunnitelma",german:"Ich spiele um drei Fußball.",meaning:"Franz pelaa jalkapalloa klo 15.00 (u03)"},
    {label:"4 · Greta lähtee",german:"Ich gehe jetzt nach Hause.",meaning:"Greta menee nyt kotiin (u04)"},
    {label:"5 · Hyvästely",german:"Bis dann. / Wiedersehen!",meaning:"He hyvästelevät (u06–u07)"},
  ]}),
  Q("guided-time","Ohjattu ymmärtäminen","Tunnista kaksi aikaa",["Nyt erotat Gretan ilmoittaman nykyisen kellonajan Franzin tulevasta urheiluajasta."],
    "Mitä Gretan Viertel vor drei tarkoittaa?",[["a","14.45",undefined,"fi"],["b","15.00","Tämä on Franzin peliaika, ei Gretan ilmoittama kellonaika.","fi"],["c","15.15","Viertel nach drei olisi varttia yli kolme.","fi"]],"a","practice",
    "Oikein. Viertel vor drei = varttia vaille kolme. Tämän harjoituksen iltapäiväoletuksella se on 14.45.","Vor tarkoittaa vaille, ei yli.","Viertel vor drei = varttia vaille kolme; um drei = kolmelta."),
  B("book-text","Tarkista kolme alkuperäisen tekstin tehtävää",[
    "Lue C09:n Text A uudelleen ja vastaa tekstinymmärtämissivun C09-SOURCE-Q01, C09-SOURCE-Q02 sekä C09-SOURCE-Q03.",
    "Q01 kysyy Gretan ilmoittamaa aikaa. Q02 kysyy Franzin jalkapalloaikaa. Q03 selvittää, mitä Greta tekee seuraavaksi. Tarkista jokainen vastaus digikirjassa, älä vain valitse vaihtoehtoa.",
    "Lähteen repliikit, alkuperäiset tehtävätunnisteet ja tarkistus tallentuvat C09:n samaan kirjatilaan.",
  ],["text","understand"]),
  Q("independent-action","Itsenäinen ymmärtäminen","Mihin Greta lähtee?",[
    "Vastaa ilman aikajanan katsomista. Etsi tarvittaessa tekstiin u04 vasta itsenäisen yrityksen jälkeen.",
  ],"Mitä Greta kertoo tekevänsä?",[["a","Menevänsä kotiin",undefined,"fi"],["b","Pelaavansa jalkapalloa","Jalkapallosta kertoo Franz.","fi"],["c","Menevänsä kouluun","Nach Hause = kotiin, ei kouluun.","fi"]],"a","independent",
    "Oikein. Ich gehe jetzt nach Hause = menen nyt kotiin.","Hause tarkoittaa kotia osana nach Hause -ilmausta.","Greta kertoo menevänsä kotiin; Franz kertoo pelaavansa jalkapalloa."),
  Q("apply-sequence","Soveltaminen","Vertaa tapahtumien aikaa",[
    "Gretan vastaus on 14.45 ja Franz kertoo jalkapallosta klo 15.00. Laske, kumpi tapahtuu ensin.",
  ],"Mikä väite perustuu todella tekstiin?",[
    ["a","Greta kertoo kellon olevan 14.45 ennen Franzin klo 15 alkavaa jalkapalloa.",undefined,"fi"],
    ["b","Franz ja Greta sopivat jalkapallotapaamisesta klo 15.","Tekstissä ei sovita tapaamista, vaan Franz kertoo omasta peliajastaan.","fi"],
    ["c","Greta lähtee jalkapalloon Franzin kanssa.","Greta kertoo menevänsä kotiin.","fi"],
  ],"a","application",
    "Juuri näin. Tässä erotetaan lähteessä sanottu ja itse päätelty.","Palaa u02–u04 ja erottele kuka sanoo mitä.","Teksti kertoo kellonajan ja suunnitelman, mutta ei Franzin ja Gretan sovittua tapaamista."),
  R("own-summary","Kerro mitä tapahtui", "Kirjoita 1–2 omaa suomenkielistä lausetta tapahtumista ja ajoista.",
    "Greta sanoo kellon olevan 14.45, ja Franz kertoo pelaavansa klo 15.",30,[
      "Muotoile omalla tavallasi tekstin pääajatus ja tapahtumien oikea järjestys.",
      "Vertaa kirjoittamaasi lähdetekstin repliikkeihin. Vapaa yhteenveto arvioidaan itse eikä sille anneta keksittyä arvosanaa.",
    ]),
  Q("exit","Lopputarkistus","Muista jalkapallon kellonaika",[
    "Peitä dialogi ja vastaa täysin itsenäisesti.",
  ],"Mihin aikaan Franz sanoo pelaavansa?",[["a","Kello 14.45","Tämä oli Gretan ilmoittama nykyinen aika.","fi"],["b","Kello 15.00",undefined,"fi"],["c","Kello 16.00","Franz sanoo um drei, ei um vier.","fi"]],"b","exit",
    "Oikein. Um drei tarkoittaa kello kolmelta.","Drei = 3. Um ilmaisee tietyn kellonajan.","Franz: Ich spiele um drei Fußball. = Pelaan jalkapalloa kolmelta."),
  summary([
    "Luit koko Sport und Zeit -dialogin. Tunnistit Gretan ilmauksen Viertel vor drei (varttia vaille kolme), jonka tämä harjoitus tulkitsee klo 14.45:ksi, Franzin klo 15.00 tulkitun peliajan sekä sen, että Greta menee kotiin.",
    "Tekstinymmärtämisen kolme lähdetehtävää vaativat oikeasti tallennetut ja tarkistetut vastaukset. Lopputarkistus on tästä erillinen.",
    "Seuraavassa tunnissa opit am ja um -erot niin, että voit ilmaista omia tapaamisaikoja.",
  ]),
],[],["C09-SOURCE-Q01","C09-SOURCE-Q02","C09-SOURCE-Q03"]);

export const LOS1_L048_TEACHER=lesson("L048","Am Montag, um drei Uhr",
  "Valitsen viikonpäivän am-rakenteen ja kellonajan um-rakenteen, luen aikataulun ja ehdotan tapaamishetkeä.",[
  S("welcome","Johdanto","introduction","Milloin nähdään?",[
    "Tapaamisen sopimiseen tarvitaan yleensä kaksi vastausta: minä päivänä ja mihin kellonaikaan. Saksaksi am Montag um drei Uhr = maanantaina kello kolmelta.",
    "Tällä tunnilla opetetaan rakenteet vaiheittain, rakennetaan oma aika ja tehdään oikeat C09:n harjoitukset. Minuutit ja hankalat puhekieliset kellonajat eivät ole aktiivinen oppimistavoite.",
  ],{chapterPhoto:true}),
  Q("recall","Muistelu","Päivä ensin",["Ennen uuden säännön harjoittelua kerrataan jo tuttu ilmaus."],
    "Mikä tarkoittaa perjantaina?",[["a","um Freitag","Um liittyy kellonaikaan."],["b","am Freitag"],["c","am Sonntag","Sonntag on sunnuntai."]],"b","practice",
    "Oikein: am Freitag.","Päivän edessä am.","Am Freitag = perjantaina."),
  S("difference","Opettajan selitys","explanation","am = minä päivänä, um = mihin kellonaikaan",[
    "Kun vastaat kysymykseen Wann? eli milloin, sinun on erotettava viikonpäivä ja kellonaika. Viikonpäivän edellä käytetään am: am Montag = maanantaina, am Donnerstag = torstaina.",
    "Kellonajan edellä käytetään um: um drei Uhr = kello kolmelta, um vier Uhr = neljältä. Uhr tarkoittaa tässä kellonaikaa ilmaisevaa 'kello'-sanaa. Älä sano um Montag tai am drei Uhr.",
    "Yhdistä tiedot: am Montag um drei Uhr. Sanat eivät vaihda tehtäviään. Am kertoo päivän, um tarkan kellonajan.",
    "Tässä opit rakenteet kokonaisuuksina. Niiden historiallisia ja sijamuotoihin liittyviä kielioppiselityksiä ei tarvita ajan sopimiseen.",
  ],{help:[{title:"Muistisääntö",body:"AM + päivä: am Dienstag. UM + kellonaika: um fünf Uhr. Ensin 'milloin viikossa', sitten 'mihin aikaan'."},
    {title:"Voiko sanoa am 15 Uhr?",body:"Ei näissä perusajanilmauksissa. Kello 15 = um fünfzehn Uhr tai puhekielessä um drei Uhr iltapäiväkontekstissa."}]}),
  S("clock","Opettajan mallisuoritus","board","Näin muodostan tasatunnin",[
    "Näytän ensin kolme tasatuntia ja lopuksi yhden kokonaisen tapaamisajan. 24 tunnin kellossa 15.00 on viisitoista, mutta arkisessa iltapäivän keskustelussa kolmelta voidaan ilmaista um drei Uhr.",
    "Klo 15.00:n tulkinta kolmelta vaatii asiayhteyden. Muoto um fünfzehn Uhr yksilöi ajan ilman aamu-/iltapäiväepäselvyyttä.",
  ],{board:[
    {label:"1 · Kellonaika",german:"drei",meaning:"3, kolme"},
    {label:"2 · Kello kolmelta",german:"um drei Uhr",meaning:"klo 3.00 tai 15.00 asiayhteyden mukaan"},
    {label:"3 · Kello neljältä",german:"um vier Uhr",meaning:"klo 4.00 tai 16.00 asiayhteyden mukaan"},
    {label:"4 · 24 h -muoto",german:"um fünfzehn Uhr",meaning:"klo 15.00 yksiselitteisesti"},
    {label:"5 · Viikonpäivä",german:"am Montag",meaning:"maanantaina"},
    {label:"6 · Yhdistelmä",german:"am Montag um drei Uhr",meaning:"maanantaina kello kolmelta"},
  ]}),
  Q("guided-am","Ohjattu harjoitus 1","Valitse päivän ilmaus",["Valitse vain päivän muoto. Kellonaikaa ei tässä kysytä."],
    "Mikä tarkoittaa keskiviikkona?",[["a","um Mittwoch","Um ei sovi viikonpäivän eteen."],["b","am Montag","Montag on maanantai."],["c","am Mittwoch"]],"c","practice",
    "Oikein: am Mittwoch.","Päivään am, keskiviikkoon Mittwoch.","Am Mittwoch = keskiviikkona."),
  Q("guided-um","Ohjattu harjoitus 2","Valitse kellonaika",["Tässä puhutaan tasatunnista, ei viikonpäivästä."],
    "Mikä tarkoittaa kello neljältä?",[["a","am vier Uhr","Am ei ilmaise kellonaikaa."],["b","um vier Uhr"],["c","um Freitag","Freitag on viikonpäivä."]],"b","practice",
    "Oikein: um vier Uhr.","Kellonaika alkaa um.","Um vier Uhr tarkoittaa kello neljältä."),
  T("independent","Itsenäinen harjoitus 3","Rakenna koko ajanilmaus",[
    "Älä katso valmista mallia. Kirjoita kaksi ajan osaa peräkkäin.",
  ],"Kirjoita saksaksi: torstaina kello viideltä",["am Donnerstag um fünf Uhr"],"independent",
    "Oikein! Päivä on am Donnerstag ja kellonaika um fünf Uhr.",
    "Torstai on Donnerstag, viisi on fünf.","Am Donnerstag = torstaina, um fünf Uhr = kello viideltä.",
    {"um donnerstag am fünf uhr":"Am ja um ovat vaihtuneet väärinpäin.",
     "am donnerstag am fünf uhr":"Kello tarvitsee um-preposition."}),
  Q("read-timetable","Aikataulun lukeminen 4","Lue yksinkertainen aikataulu",[
    "Harjoitusaikataulu (LOS!:n oma esimerkki, ei M-WB-03:n dialogi): Montag 15:00 · Dienstag 16:00 · Freitag 17:00.",
    "Mitä päivä- ja kellonaikaparia käytät maanantain tapahtumaan? Muista että 15.00 = um fünfzehn Uhr 24 tunnin muodossa.",
  ],"Milloin harjoitusaikataulussa on maanantain tapaaminen?",[
    ["a","am Montag um fünfzehn Uhr"],
    ["b","am Dienstag um sechzehn Uhr","Tämä on tiistain tapahtuma."],
    ["c","am Freitag um siebzehn Uhr","Tämä on perjantain tapahtuma."],
  ],"a","application",
    "Oikein: Montag 15.00 = am Montag um fünfzehn Uhr.","Etsi listan Montag-rivi ja sen vierestä 15:00.","15.00 on fünfzehn Uhr ja maanantai on Montag."),
  C("weekly-calendar","Merkitse aika kalenteriin",
    "Kuvitteellinen harjoitustilanne: sovi tapaaminen maanantaille klo 15.00.",
    "Montag","15:00",
    "Aika on erillinen harjoitustieto. Sitä EI lausuta C09:n Text B -äänitteessä.",
    ["Valitse ensin Montag ja sitten klo 15:00. Kalenteri antaa palautteen ja tallentaa oman valintasi. Vahvista vain oikea merkintä."],
    "l048-calendar-confirmed"),
  Q("appointment","Soveltaminen 5","Milloin molemmille sopii?",[
    "Kuvitteellisen ajanvarausharjoituksen tiedot: Ainolla on aikaa maanantaina 15.00 ja tiistaina 16.00. Leolla on aikaa maanantaina 15.00 ja perjantaina 17.00.",
    "Tehtäväsi on valita aika, joka sopii molemmille. Tämä ei ole alkuperäisen Sport und Zeit -tekstin tapahtuma.",
  ],"Mikä tapaaminen on mahdollinen molemmille?",[
    ["a","am Dienstag um vier Uhr","Leo ei ole tiistaina vapaa."],
    ["b","am Montag um drei Uhr"],
    ["c","am Freitag um fünf Uhr","Aino ei ole perjantaina vapaa."],
  ],"b","application",
    "Oikein. Yhteinen vapaa hetki on maanantaina klo 15.","Vertaa henkilöiden vapaita päiviä ja aikoja; etsi täsmälleen sama pari.","Molemmilla on maanantaina klo 15: am Montag um drei Uhr."),
  B("book-grammar","Tee C09:n oikeat am/um-tehtävät",[
    "Vastaa digikirjan tehtäviin C09-EX-08, 09, 10, 13 ja 14. Niissä tarkistat am-ilmauksen, um-ilmauksen, Wann?-kysymyksen sekä puuttuvat sanat.",
    "Tallennus käyttää alkuperäisiä tehtävätunnisteita. Kirjassa tehdyt vastaukset eivät synnytä erillistä opetuspolun kopiota.",
  ],["grammar","practice"]),
  R("own-message","Kirjoita oma tapaamisviesti",
    "Laadi vähintään kahden lyhyen lauseen viesti saksaksi. Kerro ehdottamasi päivä ja kellonaika.",
    "Hallo! Ich habe am Samstag um vier Uhr Zeit. Bis dann!",35,[
      "Mallisuoritus: valitsen ensin päivän Samstag ja ajan 16.00; muodostan am Samstag um vier Uhr. Liitän sen lauseeseen Ich habe am Samstag um vier Uhr Zeit.",
      "Kirjoita oma viesti eri päivälle tai ajalle. Tarkistuslista: tervehdys, am + oikea päivä, um + kellonaika, ymmärrettävä lopetus.",
      "Omaa tekstiä ei arvioida automaattisesti kielioppiprosentilla.",
    ]),
  T("exit","Lopputarkistus","Osaatko ilman mallia?",["Palauta rakenteet itsenäisesti vielä kerran eri päivällä ja ajalla."],
    "Kirjoita saksaksi: perjantaina kello neljältä",["am Freitag um vier Uhr"],"exit",
    "Oikein! Am Freitag um vier Uhr.","Perjantai = Freitag, neljä = vier.","Päivän edelle am ja kellonajan edelle um."),
  summary([
    "Opit erottamaan am + viikonpäivä ja um + kellonaika. Luit aikataulun, merkitsit harjoitusaikaa kalenteriin ja kirjoitit oman viestin.",
    "Laske erikseen, mitkä kysymykset ratkesivat itsenäisesti ilman vihjeitä. Oikea kalenterivalinta ei ole kuullunymmärtämisen suoritus.",
    "Seuraavaksi harjoittelet Text B:n aidon viikonpäiväluettelon avulla ja käytät kalenteria uudestaan.",
  ]),
],["C09-EX-08","C09-EX-09","C09-EX-10","C09-EX-13","C09-EX-14"],[],["l048-calendar-confirmed"]);

export const LOS1_L049_TEACHER=lesson("L049","Kuuntele ja merkitse kalenteriin",
  "Tunnistan viikonpäivät aidon Text B:n sanalistasta ja teen lähteeseen perustuvan, selvästi rajatun kalenteriharjoituksen.",[
  S("welcome","Johdanto","introduction","Kuuntelu tai rehellinen tekstivaihtoehto",[
    "C09:n Text B on Christophin M-COM-07, German Vocabulary - Days. Äänitteessä luetellaan viikon seitsemän päivää saksaksi. Siinä EI puhuta tapaamisista tai kellonajoista.",
    "Voit yrittää kuunnella digikirjan alkuperäistä ääntä, mutta äänen iPhone- ja desktop-toistoa ei ole vielä hyväksymistestattu. Sen vuoksi tämä opetuspolku ei väitä äänitettä kuulluksi eikä anna kuuntelupisteitä pelkän tekstin lukemisesta.",
    "Jos ääni ei toimi, käytä koko alkuperäistä sanalistaa seuraavassa tilanteessa ja tee tehtävät lukutehtävinä. Kalenteriharjoituksen kellonaika on erikseen annettu oma harjoitustieto.",
  ]),
  S("text-b","Alkuperäinen aineisto","source","Koko Text B · Die Wochentage",[
    "Avaa alta koko M-COM-07:n kirjoitettu ääniteluettelo: Tage: Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag.",
    "Päivät esiintyvät viikon luonnollisessa järjestyksessä. Jos alkuperäinen ihmisääni toimii kirjan sisällä, voit kuunnella sen. Tässä näkymässä ei ole keinotekoista ääntä eikä automaattista kuuntelumerkintää.",
    "Kuultuasi tai luettuasi tunnista kolmas päivä Mittwoch ja viikonlopun päivät Samstag ja Sonntag.",
  ],{textBChapterId:"09",help:[{title:"Miksi tämä ei ole ajanvaraustallenne?",body:"Lähteen ainoa puhuttu sisältö on viikonpäivien luettelo. Ajanvarausten päivät ja kellonajat ovat erillisiä LOS!:n harjoitusesimerkkejä."},
    {title:"Mitä jos ääni ei käynnisty?",body:"Voit silti oppia viikonpäivät lukemalla. Ääni jää vahvistamattomaksi, eikä kuullunymmärtämistä merkitä suoritetuksi."}]}),
  S("list-board","Opettajan mallisuoritus","board","Poimi päivä sanalistasta",[
    "Näytän, miten muutat sanalistan kalenteriksi. Ensimmäinen sana Montag tarkoittaa maanantaita, toinen Dienstag tiistaita ja kolmas Mittwoch keskiviikkoa.",
    "Kun tehtävä sanoo 'luettelon kolmas päivä', merkitsen Mittwoch. Lähteessä ei anneta kellonaikaa, joten erikseen annetun ajan lisään vasta seuraavassa harjoituksessa.",
  ],{board:[
    {label:"Luettelon 1.",german:"Montag",meaning:"maanantai"},
    {label:"Luettelon 2.",german:"Dienstag",meaning:"tiistai"},
    {label:"Luettelon 3.",german:"Mittwoch",meaning:"keskiviikko"},
    {label:"Luettelon 6.",german:"Samstag",meaning:"lauantai"},
    {label:"Luettelon 7.",german:"Sonntag",meaning:"sunnuntai"},
  ]}),
  Q("guided","Ohjattu tehtävä","Mikä seuraa tiistaita?",["Etsi alkuperäisestä sanaluettelosta sana Dienstag ja sen jälkeen tuleva päivä."],
    "Mikä tulee Dienstag-sanan jälkeen?",[["a","Montag","Montag on ennen tiistaita."],["b","Mittwoch"],["c","Freitag","Freitag on perjantai."]],"b","practice",
    "Oikein: Mittwoch seuraa Dienstagia.","Lue luettelon kolme ensimmäistä sanaa.","Montag → Dienstag → Mittwoch."),
  B("book-textb","Tee alkuperäiset Text B:n tehtävät",[
    "Avaa C09:n Text B ja vastaa C09-TEXTB-Q01 sekä C09-TEXTB-Q02. Ensimmäinen koskee Dienstag-sanaa seuraavaa viikonpäivää, toinen torstain saksankielistä nimeä.",
    "Tarkista molemmat vastaukset kirjan omalla Tarkista-toiminnolla. Niiden lähde-ID on M-COM-07, ei alkuperäinen Franz–Greta-dialogi M-WB-03.",
  ],["text-b","understand"]),
  C("calendar","Merkitse lähteestä tunnistettu päivä kalenteriin",
    "Text B:n viikonpäiväluettelon kolmas päivä + tässä harjoituksessa erikseen annettu klo 16:00.",
    "Mittwoch","16:00",
    "M-COM-07 sisältää kolmannen päivän Mittwoch. Kellonaika 16:00 on LOS!:n oma HARJOITUSTIETO, ei kuultu asia.",
    ["Valitse Text B -listan kolmas viikonpäivä ja annetusta harjoitustilanteesta 16:00. Täydennä oikea pari, tarkista ja vahvista kalenteriin."],
    "l049-calendar-confirmed"),
  Q("availability","Soveltava tehtävä 1","Valitse sopiva tapaamishetki",[
    "Erillinen harjoitusaikataulu: Mira voi tavata maanantaina klo 15 tai perjantaina klo 17. Tim voi tavata keskiviikkona klo 16 tai perjantaina klo 17.",
    "Valitse yhteinen mahdollinen aika. Tietoja EI kuulla Text B:n äänitteessä.",
  ],"Mikä aika sopii molemmille?",[["a","am Montag um drei Uhr","Tim ei ole maanantaina vapaa."],["b","am Freitag um fünf Uhr"],["c","am Mittwoch um vier Uhr","Mira ei ole keskiviikkona vapaa."]],"b","application",
    "Oikein. Molemmat ovat vapaita perjantaina klo 17.","Etsi sama päivä ja kellonaika molempien kalentereista.","Perjantai = Freitag. Iltapäivän tapaamiskontekstissa klo 17 voidaan sanoa um fünf Uhr, mutta ilman asiayhteyttä muoto voi tarkoittaa myös kello viittä aamulla. Yksiselitteinen 24 tunnin ilmaus on um siebzehn Uhr."),
  R("application","Soveltava tehtävä 2 · lähetä oma viesti",
    "Kirjoita kaverille lyhyt viesti, jossa ehdotat edellisestä aikataulusta yhteistä aikaa.",
    "Hallo! Hast du am Freitag um fünf Uhr Zeit? Bis dann!",40,[
      "Opettajan malli: valitse perjantai ja klo 17. Rakenna am Freitag um fünf Uhr. Voit käyttää koko kysymystä Hast du am Freitag um fünf Uhr Zeit? kiinteänä fraasina; sen muita verbimuotoja ei nyt testata.",
      "Kirjoita oma viesti ja vertaa tarkistuslistaan: tervehdys, oikea päivä, oikea aika, kohtelias tai tuttavallinen kysymys ja lopetus.",
      "Tämä on kirjoittamistehtävä, ei itsestään pisteytetty kuuntelu.",
    ]),
  Q("independent","Itsenäinen harjoitus","Tunnista viimeinen päivä",[
    "Peitä teksti ja palauta viikonlopun järjestys muistista.",
  ],"Mikä viikonpäivä tulee Samstag-sanan jälkeen?",[["a","Donnerstag","Torstai tulee ennen lauantaita."],["b","Sonntag"],["c","Mittwoch","Keskiviikko ei ole lauantain jälkeen."]],"b","independent",
    "Oikein: Sonntag on sunnuntai.","Viikon viimeisen päivän nimessä on Sonne-alku.","Samstag = lauantai, Sonntag = sunnuntai."),
  Q("exit","Lopputarkistus","Kuinka päivä kirjoitetaan?",[
    "Tarkista ilman näkyvää lähdetekstiä, että osaat käyttää yhtä tunnistettua viikonpäivää ajanilmauksessa.",
  ],"Miten sanot keskiviikkona?",[["a","um Mittwoch","Um liittyy kellonaikaan."],["b","am Mittwoch"],["c","am Dienstag","Dienstag tarkoittaa tiistaita."]],"b","exit",
    "Oikein: am Mittwoch = keskiviikkona.","Muista am + Mittwoch.","Mittwoch on keskiviikko, ja am ilmaisee päivää."),
  summary([
    "Tunnistit M-COM-07:n viikonpäiväluettelon järjestyksen, vastasit kahteen alkuperäisen Text B:n tehtävään, sijoitit harjoitustiedon kalenteriin ja sovelsit ajanvarausta.",
    "Äänitteen toimivuuden lopullinen hyväksyntä on avoin. Ilman todettua äänen toistoa tätä tuntia ei lasketa kuuntelun osaamisnäytöksi.",
    "L050 kokoaa viikonpäivät, kellonajat, viestit ja oikean kappaletestin.",
  ]),
],[],["C09-TEXTB-Q01","C09-TEXTB-Q02"],["l049-calendar-confirmed"]);

const C09_TEST_IDS=Array.from({length:14},(_,i)=>"C09-EX-"+String(i+1).padStart(2,"0"));
export const LOS1_L050_TEACHER=lesson("L050","Harjoittele ja testaa C09",
  "Sovellan viikonpäiviä, kellonaikoja ja ajan sopimista; palautan oikean C09-kappaletestin ja arvioin oppimistani.",[
  S("welcome","Johdanto","introduction","Harjoittele ennen oikeaa testiä",[
    "Tämä tunti yhdistää C09:n oikean 14 osatehtävän kappaletestin, yhden oman tapaamisviestin, kaksi opetuspolun itsenäistä tarkistusta sekä itsearvioinnin.",
    "Oikeaa kappaletestiä ei korvata automaattisesti generoituilla pisteillä. Testin tehtävät tallentuvat C09:n kirjatilaan ja palautustieto tarkistetaan olemassa olevasta tietomallista.",
    "Vapaa teksti arvioidaan malliin ja tarkistuslistaan verraten, ei keksityllä prosentti- tai CEFR-arvosanalla.",
  ],{chapterPhoto:true}),
  S("recap-board","Opettajan mallisuoritus","board","Miten rakennan tapaamisajan?",[
    "Kerrataan rauhassa: valitsen päivän, lisään am, valitsen kellonajan ja lisään um. Esimerkissä haluan sanoa 'maanantaina kello kolmelta'.",
    "Saksaksi saan am Montag um drei Uhr. Lause Ich habe am Montag um drei Uhr Zeit. kertoo, että minulla on silloin aikaa.",
    "Muistissa säilyminen testataan jäljempänä uudella päivällä ja ajalla. Pelkkä mallin lukeminen ei riitä.",
  ],{board:[
    {label:"1 · Päivä",german:"Montag",meaning:"maanantai"},
    {label:"2 · Päivän ilmaus",german:"am Montag",meaning:"maanantaina"},
    {label:"3 · Kello",german:"drei Uhr",meaning:"kolme"},
    {label:"4 · Ajan ilmaus",german:"um drei Uhr",meaning:"kolmelta"},
    {label:"5 · Tapaamisehdotus",german:"Ich habe am Montag um drei Uhr Zeit.",meaning:"Minulla on maanantaina kolmelta aikaa"},
  ]}),
  Q("review-day","Kertaus","Oikea viikonpäivä",[
    "Älä katso sanastoa. Aloita päivästä ennen kuin kirjoitat koko tapaamisen.",
  ],"Mikä on torstai saksaksi?",[["a","Dienstag","Dienstag on tiistai."],["b","Donnerstag"],["c","Sonntag","Sonntag on sunnuntai."]],"b","practice",
    "Oikein: Donnerstag = torstai.","Tunnistatko pidemmän D-alkuisen sanan?","Donnerstag = torstai; Dienstag = tiistai."),
  Q("review-time","Itsenäinen ajanilmaus","Käytä am ja um oikein",[
    "Valitse päivään ja aikaan sopivat muodot ilman mallitaulua.",
  ],"Mikä tarkoittaa lauantaina kello neljältä?",[
    ["a","am Samstag um vier Uhr"],
    ["b","um Samstag am vier Uhr","Am ja um ovat vaihtuneet väärinpäin."],
    ["c","am Sonntag um vier Uhr","Sonntag on sunnuntai, ei lauantai."],
  ],"a","independent",
    "Oikein. Am Samstag um vier Uhr.","Samstag on lauantai. Päivän edessä am, kellon edessä um.","Am Samstag = lauantaina ja um vier Uhr = klo 4 tai 16 asiayhteyden mukaan."),
  Q("choose-time","Soveltaminen","Sovi sopiva aika",[
    "Oma harjoitusaikataulu: Eeva voi maanantaina 15 ja perjantaina 17. Niko voi tiistaina 16 ja perjantaina 17.",
    "Valitse yhteinen aika. Tämä on LOS!:n harjoitustilanne, ei Sport und Zeit -tekstin sisältö.",
  ],"Mikä ajanilmaus sopii tapaamiseen?",[
    ["a","am Montag um drei Uhr","Niko ei ole maanantaina vapaa."],
    ["b","am Freitag um fünf Uhr"],
    ["c","am Dienstag um vier Uhr","Eeva ei ole tiistaina vapaa."],
  ],"b","application",
    "Oikein: perjantaina klo 17 on yhteinen aika.","Vertaile viikkopäiviä ja kellonaikoja molemmille.","Molemmilla on perjantaina klo 17 aikaa: am Freitag um fünf Uhr."),
  B("test-book","Palauta oikea C09-kappaletesti",[
    "Avaa C09:n Kappaletesti ja vastaa kaikkiin 14 todelliseen osatehtävään C09-EX-01…C09-EX-14.",
    "Tarkista myös C09:n Käytä saksaa -sivulla oma lyhyt tapaamisviestisi. Sen kirjoitus tallentuu erikseen, eikä sitä konepisteytetä.",
    "Merkitse itsearvioinnissa, mitkä aiheet onnistuvat ja mihin tarvitset vielä harjoittelua. Opetustila tarkistaa vain todelliset tallennus- ja palautustiedot, ei keksi testitulosta.",
  ],["practice","apply","test"]),
  R("my-message","Oma lyhyt viesti",
    "Laadi 2–3 virkkeen oma saksankielinen tapaamisviesti. Kerro päivä, kellonaika ja kysy, sopiiko se.",
    "Hallo! Ich habe am Freitag um fünf Uhr Zeit. Hast du auch Zeit? Bis dann!",55,[
      "Mallipohja on esimerkki, ei ainoa hyväksyttävä vastaus. Vaihda päivä ja kellonaika, niin rakennat oman viestisi.",
      "Tarkista itse: 1) onko tervehdys, 2) käytätkö am + päivä, 3) käytätkö um + kellonaika, 4) ymmärtääkö toinen kysymyksen, 5) onko lopetus mukana?",
      "Kirjoita oma viesti myös digikirjan soveltamiskenttään, jotta alkuperäisen C09-kappaletestin soveltamisnäyttö tallentuu oikein.",
    ]),
  R("self-check","Itsearviointi",
    "Arvioi omin sanoin: 1) tunnistan viikonpäivät, 2) muodostan am/um-rakenteen, 3) löydän ajan aikataulusta, 4) ehdotan tapaamista. Mainitse yksi vaikea asia.",
    "Osaan sanoa am Freitag um fünf Uhr. Minun pitää vielä harjoitella Donnerstag-sanaa.",55,[
      "Itsearviointi tarkoittaa pohdintaa, ei itse annettua koepistettä. Selitä konkreettinen asia, jonka jo osaat, ja yksi asia, jota haluat vielä harjoitella.",
      "Kirjoita itsearviointi myös kirjan C09:n omaan itsearviointikenttään. Opetuspolku käyttää kirjan alkuperäistä palautustietoa eikä korvaa sitä tällä pohdinnalla.",
    ]),
  T("exit","Lopputarkistus","Uusi ajanilmaus muistista",[
    "Tee viimeinen tarkistus ilman näkyvää mallia. Virheestä saat palautteen ja voit yrittää uudelleen.",
  ],"Kirjoita saksaksi: tiistaina kello kolmelta",["am Dienstag um drei Uhr"],"exit",
    "Oikein! Am Dienstag um drei Uhr.","Tiistai = Dienstag, kolme = drei.","Am Dienstag ilmoittaa päivän; um drei Uhr kellonajan.",
    {"um dienstag am drei uhr":"Am ja um ovat vaihtuneet väärinpäin.",
    "am donnerstag um drei uhr":"Donnerstag tarkoittaa torstaita, ei tiistaita."}),
  summary([
    "Kertaat viikonpäivät, am/um-ajanilmaukset, aikataulun lukemisen ja tapaamisen sopimisen. Merkitse tunti läpikäydyksi vasta, kun oikean kirjan 14 testivastausta on tallennettu, testi palautettu sekä sovellus ja itsearviointi kirjattu.",
    "Erillinen osaamisen mittaus perustuu todellisiin itsenäisiin näyttöihin, ei siihen, että oppitunti avattiin tai sen mallivastaus näytettiin.",
    "Jos jokin tuntui epävarmalta, palaa L046:n viikonpäiviin tai L048:n am/um-esimerkkeihin.",
  ]),
],[],[],[],{requiredTestIds:C09_TEST_IDS,requireApplicationDraft:true,minSelfAssessmentLength:30});

export const LOS1_C09_TEACHER:readonly TeacherLesson[]=[
  LOS1_L046_TEACHER,LOS1_L047_TEACHER,LOS1_L048_TEACHER,LOS1_L049_TEACHER,LOS1_L050_TEACHER,
];