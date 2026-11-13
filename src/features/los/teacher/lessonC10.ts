import type { TeacherLesson, TeacherQuestion, TeacherScene } from "./engine.ts";
import { LOS1_C10_TEXT } from "../content/los1OpenDialogues.ts";
import { LOS1_TEXT_B_SOURCES } from "../content/los1TextBAdditional.ts";
import { losExercisesFor } from "../exerciseBank.ts";

/**
 * LOS! 1, C10: five independent, scripted Teacher Experience 2.0 manuscripts.
 * All text and exercise identifiers refer to the existing C10 reader/workbook.
 * These lessons are editorial previews, not language-approved publications.
 * The M-DIB-02 audio/video gate is deliberately closed: a transcript check
 * cannot masquerade as independently verified listening comprehension.
 */
const version = "2.0.0-preview.1";
const phase = (
  id:string,stage:string,title:string,paragraphs:readonly string[],
  help?:TeacherScene["help"],
):TeacherScene => ({id,phase:stage,title,kind:"explanation",paragraphs,...(help?{help}:{})});
const introduction = (title:string,paragraphs:readonly string[]):TeacherScene => ({
  id:"welcome",phase:"Aloitus",title,kind:"introduction",paragraphs,
});
const board = (
  id:string,title:string,paragraphs:readonly string[],
  steps:NonNullable<TeacherScene["board"]>,
  help?:TeacherScene["help"],
):TeacherScene => ({id,phase:"Opettajan mallisuoritus",title,kind:"board",paragraphs,board:steps,...(help?{help}:{})});
const question = (
  id:string,title:string,paragraphs:readonly string[],data:TeacherQuestion,
):TeacherScene => ({id,phase:id==="exit"?"Osaamistarkistus":id==="recall"?"Muistelu":"Harjoittele ja sovella",
  kind:"question",title,paragraphs,question:data});
const book = (
  id:string,title:string,paragraphs:readonly string[],
  links:NonNullable<TeacherScene["bookLinks"]>,
  activityId?:string,activityLabel?:string,
):TeacherScene => ({id,phase:"Oppikirjan alkuperäinen sisältö",kind:"book",
  title,paragraphs,bookLinks:links,...(activityId?{activityId}:{}),...(activityLabel?{activityLabel}:{})});
const reflect = (
  id:string,title:string,paragraphs:readonly string[],
  prompt:string,placeholder:string,minLength:number,
  activityId?:string,activityLabel?:string,
):TeacherScene => ({id,phase:"Oma harjoittelu",title,kind:"reflection",paragraphs,
  reflection:{prompt,placeholder,minLength},...(activityId?{activityId}:{}),...(activityLabel?{activityLabel}:{})});
const summary = (title:string,paragraphs:readonly string[]):TeacherScene => ({
  id:"summary",phase:"Yhteenveto",title,kind:"summary",paragraphs,
});
const choice = (
  prompt:string,skillId:string,correctOption:string,
  options:NonNullable<TeacherQuestion["options"]>,
  success:string,hint:string,reteach:string,evidenceRole:TeacherQuestion["evidenceRole"]="practice",
):TeacherQuestion => ({type:"choice",prompt,skillId,correctOption,options,
  success,hint,reteach,evidenceRole,genericWrong:"Tarkista, kuka puhuu, mitä kysytään ja mikä verbimuoto kuuluu persoonalle."});
const typed = (
  prompt:string,skillId:string,accepted:readonly string[],
  success:string,hint:string,reteach:string,
  evidenceRole:TeacherQuestion["evidenceRole"]="practice",
  wrongAnswers?:TeacherQuestion["wrongAnswers"],
):TeacherQuestion => ({type:"text",prompt,skillId,accepted,success,hint,reteach,
  evidenceRole,...(wrongAnswers?{wrongAnswers}:{}),genericWrong:"Vertaa lauseen tekijää ja verbimuotoa. Tarkista myös sanajärjestys, paikannimi ja välilyönnit."});
const c10Link=(section:string,label:string,instruction:string)=>({chapterId:"10",section,label,instruction});

export const LOS1_L051_TEACHER:TeacherLesson = {
  id:"L051",bookId:1,chapterId:"10",version,title:"Kokoa esittelyfraasit",
  objective:"Yhdistän tervehdyksen, nimen, alkuperän, iän, voinnin, kysymyksen ja hyvästelyn kokonaiseksi helpoksi esittäytymiseksi.",
  estimatedMinutes:30,
  requiredQuestionIds:["recall","guided","independent","application","exit"],
  requiredActivityIds:["model-spoken"],
  requiredPracticeIds:["C10-EX-01","C10-EX-02","C10-EX-03","C10-EX-04","C10-EX-14","C10-EX-16","C10-EX-20"],
  scenes:[
    introduction("Kymmenen kappaletta, yksi oikea keskustelu",[
      "Olet jo harjoitellut tervehdyksiä, nimiä, kotipaikkoja, ikää, vointia ja kohteliaita hyvästelyjä. Nyt yhdistät ne samaan kohtaamiseen. Tässä tunnissa ei lisätä uutta kielioppia.",
      "Tavoite ei ole ulkoa opeteltu pitkä monologi, vaan muutama lyhyt vuoro, joilla pystyt aloittamaan, jatkamaan ja päättämään keskustelun.",
      "Harjoittelemme ensin tuttuja muotoja, sitten seuraamme koko esittäytymistä opetustaululla, valitsemme oikeita vastauksia ja lopuksi rakennat yhden lyhyen oman kohtaamisen.",
    ]),
    question("recall","Mistä keskustelu alkaa?",[
      "Tapaat uuden samanikäisen ihmisen. Et kysy vielä hänen ikäänsä, vaan aloitat kohteliaasti mutta rennosti.",
    ],choice("Mikä on sopiva aloitus?", "L1-INT-01","a",[
      {id:"a",label:"Hallo!"},
      {id:"b",label:"Auf Wiedersehen!",wrongFeedback:"Auf Wiedersehen! kuuluu kohtaamisen loppuun."},
      {id:"c",label:"Gute Nacht!",wrongFeedback:"Gute Nacht! toivotetaan yleensä nukkumaan mentäessä."},
    ],"Hallo! aloittaa tuttavallisen kohtaamisen.","Etsi tervehdys, ei hyvästely.","Hallo! aloittaa. Tschüss! tai Auf Wiedersehen! lopettaa.")),
    phase("fraases","Opettajan selitys","Viisi asiaa, jotka osaat jo sanoa",[
      "Nimi: Ich heiße Mia. kysymys: Wie heißt du? Kun puhut itsestäsi käytät heiße; kysymyksen du vaatii heißt.",
      "Alkuperä: Ich komme aus Finnland. ja Woher kommst du? Muista, että ich komme ja du kommst ovat eri muotoja.",
      "Ikä: Ich bin siebzehn Jahre alt. ja Wie alt bist du? Se on sama tuttu sein-verbi: ich bin, du bist.",
      "Vointi: Wie geht's? ja Gut, danke. Und dir? ovat opittuja kokonaisfraaseja. Lopetukseen sopii Tschüss! tuttavalle ja Auf Wiedersehen! kohteliaampaan tilanteeseen.",
      "Kaikkea ei tarvitse kysyä jokaiselta. Valitse kohtaamiseen sopivat kysymykset. Jos et ymmärrä, osaat jo sanoa Noch einmal, bitte. tai Bitte langsamer.",
    ],[
      {title:"Miten erotan ikäkysymyksen ja nimikysymyksen?",body:"Wie alt bist du? kysyy ikää. Wie heißt du? kysyy nimeä. Alt tarkoittaa tässä vanhaa, heißt on nimen kertomisen verbi."},
      {title:"Voinko sanoa Ich bin Mia?",body:"Kyllä. Ich bin Mia. ja Ich heiße Mia. ovat molemmat oikein omasta nimestä. Tee kuitenkin heißen-harjoituksessa pyydetty muoto."},
    ]),
    board("malli","Seuraa keskustelua repliikki kerrallaan",[
      "Opettaja kokoaa kahden uuden tuttavan keskustelun. Kunkin vuoron jälkeen näet suomennoksen ja sen, miksi vuoro tulee juuri tähän.",
      "Paina Näytä seuraava ja kokeile ennustaa tuleva vastaus ennen sen paljastamista. Huomaa kysymys ja siihen sopiva vastaus.",
    ],[
      {label:"Mia 1 · Aloitus ja nimi",german:"Hallo! Wie heißt du?",meaning:"Hei! Mikä sinun nimesi on?"},
      {label:"Ben 2 · Nimi ja vastakysymys",german:"Hallo! Ich heiße Ben. Und du?",meaning:"Hei! Olen Ben. Entä sinä?"},
      {label:"Mia 3 · Oma nimi ja jatkokysymys",german:"Ich bin Mia. Woher kommst du?",meaning:"Olen Mia. Mistä olet kotoisin?"},
      {label:"Ben 4 · Alkuperä ja vastakysymys",german:"Ich komme aus Deutschland. Und du?",meaning:"Olen Saksasta. Entä sinä?"},
      {label:"Mia 5 · Alkuperä ja vointi",german:"Ich komme aus Finnland. Wie geht's?",meaning:"Olen Suomesta. Mitä kuuluu?"},
      {label:"Ben 6 · Kuulumiset",german:"Gut, danke. Und dir?",meaning:"Hyvää, kiitos. Entä sinulle?"},
      {label:"Mia 7 · Vastaus ja hyvästely",german:"Gut, danke. Tschüss!",meaning:"Hyvää, kiitos. Moikka!"},
      {label:"Ben 8 · Hyvästely",german:"Tschüss!",meaning:"Moikka!"},
    ]),
    question("guided","Valitse kysymykseen sopiva vastaus",[
      "Kaveri kysyy Woher kommst du? Vastaa lähtöpaikalla, älä nimellä tai iällä.",
    ],choice("Mikä vastaus kertoo sinun olevan kotoisin Suomesta?","L1-INT-03","b",[
      {id:"a",label:"Ich heiße Mia.",wrongFeedback:"Tämä kertoo nimen. Woher kysyy mistä olet kotoisin."},
      {id:"b",label:"Ich komme aus Finnland."},
      {id:"c",label:"Ich bin siebzehn Jahre alt.",wrongFeedback:"Tämä kertoo iän, ei lähtömaan."},
    ],"Oikein. Woher kommst du? kysyy alkuperän ja Ich komme aus Finnland. vastaa siihen.",
      "Woher tarkoittaa mistä.","Woher → aus + paikka. Wie alt → ikä. Wie heißt → nimi.")),
    phase("questions","Opettajan selitys","Keskustelu pysyy käynnissä vastakysymyksellä",[
      "Kun toinen vastaa, voit jatkaa kysymällä seuraavan tutun kysymyksen. Älä vaihda aihetta sokkona: ensin vastaat kysyttyyn asiaan, sitten voit kysyä takaisin.",
      "Und du? on lyhyt tapa sanoa Entä sinä? ja sitä voi käyttää esimerkiksi nimen, lähtöpaikan tai voinnin jälkeen tutussa tilanteessa.",
      "Kun et kuule vastausta, ei tarvitse keksiä vaikeaa kysymystä. Sano Noch einmal, bitte. tai Bitte langsamer. ja anna keskustelun jatkua.",
      "Kohteliaassa tilanteessa käytetään Sie-muotoa ja esimerkiksi Und Ihnen? Voit käyttää tätä valmista ilmausta; sinun ei tarvitse vielä opetella uutta sijamuotojärjestelmää.",
    ]),
    book("practice","Tee seitsemän oikeaa kertausosatehtävää",[
      "Avaa C10:n Harjoittele-sivu. Tee C10-EX-01–04 tervehdyksistä ja nimistä sekä C10-EX-14, C10-EX-16 ja C10-EX-20 alkuperästä, iästä ja hyvästelystä.",
      "Nämä ovat kirjan olemassa olevia tehtävätunnuksia. Sama vastaus tallentuu yhteiseen kappaletilaan eikä oppitunnille luoda rinnakkaista tehtäväpankkia.",
      "Harjoitteluvastaukset voi tarkistaa kirjan perusteluilla. Oma seuraava itsenäinen tarkistus tehdään ilman näkyvää mallia.",
    ],[c10Link("practice","C10 · Harjoittele","Ratkaise C10-EX-01–04, 14, 16 ja 20.")]),
    question("independent","Kysy ikää muistista",[
      "Sulje mallitaulu ja vastaa kokonaisella saksankielisellä kysymyksellä.",
    ],typed("Kirjoita: Kuinka vanha olet?","L1-INT-06",["Wie alt bist du?"],
      "Oikein. Wie alt bist du? kysyy ikää ja tarvitsee du-pronominin kanssa bist-muodon.",
      "Muista Wie alt ja sein-verbin du-muoto.",
      "Wie alt bist du? = Kuinka vanha olet? Wie heißt du? kysyy nimen.","independent",
      {"wie alt bin du":"Bin kuuluu ich-muotoon. Du tarvitsee bist.","wie heißt du":"Tämä kysyy nimeä, ei ikää."})),
    question("application","Jatka keskustelua kohteliaasti",[
      "Kuvittele, että uusi tuttu vastaa Ich heiße Lea. Haluat jatkaa keskustelua ja selvittää hänen alkuperänsä.",
    ],choice("Mikä seuraava repliikki sopii?","L1-INT-03","c",[
      {id:"a",label:"Gute Nacht!",wrongFeedback:"Tämä päättäisi kohtaamisen aivan liian aikaisin."},
      {id:"b",label:"Ich heiße Finnland.",wrongFeedback:"Heißen kertoo nimen, mutta Finnland on maan nimi."},
      {id:"c",label:"Woher kommst du?"},
    ],"Hyvä. Woher kommst du? jatkaa keskustelua uudella tutulla kysymyksellä.",
      "Tarvitset kysymyksen, jossa woher = mistä.",
      "Woher kommst du? kysyy alkuperää. Vastauksena voi olla Ich komme aus Deutschland.","application")),
    reflect("own-voice","Sano kokonainen kohtaaminen omin sanoin",[
      "Muodosta 6–8 puheenvuoron keskustelu kahdelle kuvitteelliselle ihmiselle. Käytä tervehdystä, nimikysymystä, lähtöpaikkaa, yhtä jatkokysymystä ja hyvästelyä.",
      "Voit lukea oman luonnoksen ääneen. Ääntämistä eikä vapaata keskustelua pisteytetä automaattisesti. Tarkista itse: saiko jokainen kysymys sopivan vastauksen ja päättyikö tilanne ystävällisesti?",
    ],"Kirjoita yksi asia, jonka osasit sanoa, ja yksi mahdollinen epävarmuus (vähintään 25 merkkiä).",
       "Osasin kysyä nimen ja kotipaikan. Kertaan vielä...",25,
       "model-spoken","Harjoittelin kohtaamisen ääneen ja tarkistin itse"),
    question("exit","Tarkista, miten kohtaaminen päättyy",[
      "Viimeinen tarkistus ilman mallitaulua. Molemmat osapuolet ovat jo vaihtaneet nimensä ja kuulumisensa.",
    ],choice("Mikä on luonteva tuttavallisen keskustelun viimeinen repliikki?","L1-INT-01","b",[
      {id:"a",label:"Wie heißt du?",wrongFeedback:"Tässä nimi tiedetään jo, joten se aloittaisi uuden kysymyksen."},
      {id:"b",label:"Tschüss!"},
      {id:"c",label:"Guten Morgen!",wrongFeedback:"Tämä olisi aloitustervehdys, ei lopetus."},
    ],"Oikein. Tschüss! lopettaa tuttavallisen tapaamisen.","Etsi hyvästely.","Hallo! aloittaa, Tschüss! lopettaa.","exit")),
    summary("Esittäytymisen osat sopivat nyt yhteen",[
      "Olet kerrannut aloituksen, nimen, alkuperän, iän, voinnin, jatkokysymyksen, selviytymisfraasin ja lopetuksen. Taito rakentuu lyhyistä selkeistä vuoroista.",
      "Itsenäisen tarkistuksen tulos koskee vain tarkistettavia lauseita. Oma vapaampi keskustelu on itsearvioitu eikä sitä nimetä koneellisesti hyväksytyksi kielitaidoksi.",
      "Seuraavaksi luet Haraldin koko oikean haastattelun ja harjoittelet tekstistä tietojen löytämistä. Kuuntelun julkaisulupa on vielä erillinen asia.",
    ]),
  ],
};

const haraldBoard = LOS1_C10_TEXT.originalLines.map((line,index)=>({
  label:(index+1)+" / 14 · "+line.speaker+" · "+line.id,
  german:line.text,
  meaning:line.meaning,
}));
export const LOS1_L052_TEACHER:TeacherLesson = {
  id:"L052",bookId:1,chapterId:"10",version,title:"Kuuntele Haraldin haastattelu",
  objective:"Luen ja erittelen Haraldin alkuperäisen 14-vuoroisen haastattelun ja tarkistan kolme sisältökysymystä. Kuuntelun näyttö odottaa hyväksyttyä mediaa.",
  estimatedMinutes:30,
  // Never treat this as a passed listening lesson until the specific original media
  // rights, playback and a listening-only assessment have all been verified.
  mediaGate:{sourceId:"M-DIB-02",approved:false,reason:"Haraldin alkuperäisen ääni-/videotiedoston käyttöoikeus ja laitteilla toimiva toisto ovat yhä vahvistamatta. Tekstiin perustuvat tehtävät toimivat, mutta kuunteluosuutta ei voi merkitä suoritetuksi."},
  requiredQuestionIds:["recall","guided","independent","application","exit"],
  requiredActivityIds:["full-transcript-read"],
  requiredPracticeIds:[],
  requiredCheckedIds:["C10-HARALD-Q01","C10-HARALD-Q02","C10-HARALD-Q03"],
  scenes:[
    introduction("Harald puhuu oikeaa saksaa, teksti on aito",[
      "C10:n Text A sisältää Harald Beckerin Deutsch im Blick -haastattelun kokonaan: 14 alkuperäistä puheenvuoroa. Siinä kysytään nimi, alkuperä, ikä, puhelinnumero ja lempiväri.",
      "Äänitteen käyttöoikeutta ja toistoa ei ole hyväksytty. Siksi tällä hetkellä harjoittelet haastattelun lukemista ja ymmärtämistä, et todistetusti kuullun ymmärtämistä. Oppitunnin kuuntelusuoritus pysyy estettynä, kunnes oikea media hyväksytään.",
      "Tavoitteena on löytää olennaiset tiedot ilman että opettelet lähteen kaikkia puhekielisiä tai vaikeita rakenteita. Alkuperäisen tekstin numerojono ei ole oma yhteystietosi eikä sitä käytetä harjoituksen henkilötietona.",
    ]),
    question("recall","Tunnista tuttu kysymys",[
      "Olet nähnyt nimikysymyksen ensimmäisistä kappaleista lähtien.",
    ],choice("Mikä kysyy haastateltavan nimeä?","L1-READ-01","b",[
      {id:"a",label:"Woher kommst du?",wrongFeedback:"Tämä kysyy alkuperää."},
      {id:"b",label:"Wie heißt du?"},
      {id:"c",label:"Wie alt bist du?",wrongFeedback:"Tämä kysyy ikää."},
    ],"Oikein. Haastattelun ensimmäinen kysymys on Wie heißt du?.",
      "Nimi liittyy heißen-verbiin.","Wie heißt du? kysyy nimen, woher alkuperän ja wie alt iän.")),
    phase("strategy","Opetus","Kolme lukukierrosta, kolme tavoitetta",[
      "Ensimmäisellä kierroksella etsi puhuja ja haastateltava. Haastattelija esittää kysymyksiä; Harald kertoo itsestään. Sinun ei tarvitse ymmärtää jokaista sanaa.",
      "Toisella kierroksella etsi neljä ankkuria: Ich heiße Harald Becker, Ich komme ursprünglich aus München, Ich bin jetzt so um die fünfzig ja Blau. Sana ursprünglich tarkoittaa alun perin; sitä ei tarvitse käyttää itse.",
      "Kolmannella kierroksella kiinnitä huomiota kysymysten ja vastausten pareihin. Aina kysymys ei johda vain yhteen sanaan, vaan Harald täydentää vastauksensa. Viimeisen pitkän puheenvuoron wegen-rakennetta ei tarvitse muodostaa.",
      "Jos tulossa on joskus hyväksytty äänite, voit kuunnella ensin ilman tekstiä ja tarkistaa vasta sitten. Tällä hetkellä emme teeskentele, että lukeminen olisi kuuntelemista.",
    ],[
      {title:"Miksi tekstissä on vaikeita sanoja?",body:"Harald on aito puhuja eikä hänen haastatteluaan muutettu oppikirjan vuoksi. Työsi on löytää vastaus tuttuihin kysymyksiin, ei oppia kaikkia lauseita aktiivisesti."},
      {title:"Mitä sana ursprünglich tarkoittaa?",body:"Se tarkoittaa alun perin. Ilmaus Ich komme ursprünglich aus München. kertoo Haraldin olevan lähtöisin Münchenistä."},
    ]),
    board("entire-source","Koko alkuperäinen haastattelu, yksi puheenvuoro kerrallaan",[
      "Tässä ovat kaikki 14 alkuperäistä repliikkiä samasta M-DIB-02-tekstistä kuin LOS!:n C10-lukijassa. Ne eivät ole tekoälyn kirjoittama uusi dialogi.",
      "Käy vaiheet 1–14 läpi järjestyksessä. Repliikit 1–4: nimi ja alkuperä; 5–8: München ja ikä; 9–12: numerojono ja lempiväri; 13–14: värin perustelu.",
      "Näet suomennoksen vastaavan repliikin yhteydessä. Opitettava ydin ovat tutut kysymykset; pisimmät vastaukset ovat vain luetun ymmärtämisen tukitekstiä.",
    ],haraldBoard,[
      {title:"Onko tämä lyhennetty dialogi?",body:"Ei. Opetustaulu käyttää LOS!:n kirjan samaa alkuperäistä 14-rivistä lähdeobjektia, eikä kirjoita uusia haastattelurepliikkejä."},
      {title:"Miksi numerojono on mukana?",body:"Siksi, että autenttista lähdetekstiä ei katkaista kesken. Sen numerojonoa ei tarvitse kirjoittaa, muistaa tai käyttää yhteystietona."},
    ]),
    question("guided","Etsi tarkka alkuperä",[
      "Harald vastaa repliikissä u04 kysymykseen Woher kommst du?.",
    ],choice("Mistä kaupungista Harald sanoo tulevansa?","L1-READ-01","c",[
      {id:"a",label:"Wienistä",wrongFeedback:"Wien ei ole Haraldin u04-vastauksessa."},
      {id:"b",label:"Berliinistä",wrongFeedback:"Berlin ei ole Haraldin mainitsema lähtökaupunki."},
      {id:"c",label:"Münchenistä"},
    ],"Oikein. Hän sanoo Ich komme ursprünglich aus München.",
      "Etsi u04 ja sana aus.","Ich komme ursprünglich aus München. kertoo alkuperän. u04 on lähdevuoro.")),
    phase("context","Opetus","Tunnista merkitys, älä opettele vaikeaa taivutusta",[
      "Harald kertoo olevansa so um die fünfzig. Sana fünfzig tarkoittaa viittäkymmentä; ilmauksessa um die on likimääräisyyden merkitys: noin. Tämän rakenteen käyttöä ei testata uutena kielioppina.",
      "Sana Lieblingsfarbe tarkoittaa lempiväriä. Harald vastaa yhdellä sanalla Blau. Hän perustelee valintansa Baijerin väreillä ja sinisellä taivaalla.",
      "Sanat zivilisierten, wegen ja vielleicht esiintyvät lähteessä. Ne ovat nyt ymmärtämisen tukisanoja. Hauska lähdepuhe ei ole sääntö siitä, että jokin osa Saksaa olisi oikeasti muita 'sivistyneempi'.",
      "Haastattelun puhelinnumerokysymys ei ole tämän oppitunnin testattava tavoite. Älä ota alkuperäistä lukusarjaa kuvitteellisen harjoituksen oikeaksi numeroksi.",
    ]),
    book("original","Tarkista kolme autenttista tekstikysymystä kirjassa",[
      "Avaa C10:n Text A ja varmista, että näet koko M-DIB-02-lähteen. Avaa sen jälkeen C10:n Ymmärrä-osio.",
      "Tee kolme kirjan alkuperäisellä tunnisteella olevaa kysymystä: C10-HARALD-Q01 (lähtöpaikka), Q02 (ikä) ja Q03 (väri). Paina jokaisen kohdalla Tarkista vastaus. Q04 (Baijerin perustelu) on vapaaehtoinen lisähaaste.",
      "Näissä kirjatehtävissä vastauksen tallentaminen ja tarkistaminen ovat eri asiat. L052 tarkistaa molemmat, mutta ei laske niitä äänestä ymmärtämiseksi.",
    ],[
      c10Link("text","C10 · Text A / M-DIB-02","Lue kaikki 14 alkuperäisrepliikkiä ja katso lähdemerkintä."),
      c10Link("understand","C10 · Ymmärrä","Tarkista C10-HARALD-Q01, Q02 ja Q03 alkuperäisestä tekstistä."),
    ],"full-transcript-read","Kävin läpi kaikki 14 alkuperäisrepliikkiä"),
    question("independent","Palauta ikätieto ilman suomennosta",[
      "Peitä tekstin suomenkieliset tuet ja palauta Haraldin ikäilmauksen merkitys muistista.",
    ],choice("Mitä Harald tarkoittaa ilmauksella so um die fünfzig?","L1-READ-01","b",[
      {id:"a",label:"Täsmälleen 15-vuotias",wrongFeedback:"Fünfzig on 50, ei 15; ilmaus on lisäksi likimääräinen."},
      {id:"b",label:"Noin 50-vuotias"},
      {id:"c",label:"Yli 70-vuotias",wrongFeedback:"Tekstissä ei mainita seitsemääkymmentä."},
    ],"Oikein. So um die fünfzig tarkoittaa suunnilleen 50-vuotias.",
      "Fünfzig on viisikymmentä.","U08: Ich bin jetzt so um die fünfzig. Harald sanoo olevansa noin 50-vuotias.","independent")),
    question("application","Yhdistä kysymys ja lähteen vastaus",[
      "Muistat Haraldin lempivärin. Valitse mikä kysymys johtaisi tähän vastaukseen.",
    ],choice("Jos Harald vastaa Blau., mitä häneltä on juuri kysytty?","L1-READ-01","a",[
      {id:"a",label:"Was ist deine Lieblingsfarbe?"},
      {id:"b",label:"Wie alt bist du?",wrongFeedback:"Tämä kysyy ikää; vastauksena olisi ikäilmauksia."},
      {id:"c",label:"Woher kommst du?",wrongFeedback:"Tämä kysyy alkuperää, ei väriä."},
    ],"Oikein. Was ist deine Lieblingsfarbe? esiintyy lähteen kohdassa u11. Tunnistaminen riittää.",
      "Lieblingsfarbe = lempiväri.",
      "U11 kysyy värin, u12 vastaa Blau. U13–u14 perustelee valinnan.","application")),
    question("exit","Viimeinen tekstistä todennettava kysymys",[
      "Tämä on luetun ymmärtämisen tarkistus. Kun alkuperäinen äänite hyväksytään, tarvitaan erillinen nimenomaan kuunteluun perustuva näyttö.",
    ],choice("Mikä järjestys vastaa haastattelun rakennetta?","L1-READ-01","b",[
      {id:"a",label:"Lempiväri → nimi → ikä",wrongFeedback:"Haastattelu alkaa nimikysymyksellä, ei lempivärillä."},
      {id:"b",label:"Nimi → lähtöpaikka → ikä → lempiväri"},
      {id:"c",label:"Ikä → hyvästely → nimi",wrongFeedback:"Tekstissä ei edes ole tätä hyvästelyrakennetta."},
    ],"Oikein. Tunnistit haastattelun tärkeimmät asiakokonaisuudet.",
      "Lue u01, u03, u07 ja u11: mitä kysytään?",
      "Ensimmäinen kysymys on nimi, seuraava alkuperä, sitten ikä ja lopuksi lempiväri.","exit")),
    summary("Teksti ymmärretty, kuuntelun hyväksyntä vielä auki",[
      "Olet tutkinut kaikki 14 alkuperäistä vuoroa ja tehnyt kolme kirjan ymmärtämistehtävää. Ne tallentuvat samaan C10-kappaletilaan.",
      "L052:n kuunteluportti pysyy suljettuna, kunnes M-DIB-02:n mediaoikeus ja toiminta on vahvistettu ja kuuntelua arvioidaan aidosti äänestä. Tämä estää valheellisen kuuntelusuorituksen.",
      "Seuraavalla tunnilla opetellaan kolmannen henkilön er/sie-rakenteet. Haraldin vaikeita alkuperäisrakenteita ei tarvitse osata tuottaa.",
    ]),
  ],
};

export const LOS1_L053_TEACHER:TeacherLesson={
  id:"L053",bookId:1,chapterId:"10",version,title:"Esittele kolmas henkilö",
  objective:"Esittelen kuvitteellisen kolmannen henkilön muodolla Das ist ... ja osaan er/sie heißt, ist, kommt.",
  estimatedMinutes:30,
  requiredQuestionIds:["recall","guided","independent","application","exit"],
  requiredActivityIds:["person-presented"],
  requiredPracticeIds:["C10-EX-06","C10-EX-07","C10-EX-08","C10-EX-10"],
  scenes:[
    introduction("Kun kerrot toisesta ihmisestä, verbi muuttuu",[
      "Aiemmin sanoit Ich heiße Mia. ja Du heißt Mia. Nyt haluat esitellä kuvitteellisen ystäväsi: Das ist Mia. Sie heißt Mia.",
      "Opit vain kolmesta jo tutusta verbistä uudet kolmannen persoonan muodot. Keinotekoisia monikko- tai sijamuotoharjoituksia ei lisätä.",
      "Opettaja näyttää muodot taululla, sinä kokeilet niitä ensin tuettuna ja sitten ilman mallia sekä teet kirjan neljä varsinaista tehtävää.",
    ]),
    question("recall","Palauta mieleen minä ja sinä",[
      "Valitse oikea parimuoto C02:n ja C03:n jo opetetuista rakenteista.",
    ],choice("Mitkä muodot ovat oikein: ich ___ / du ___ (heißen)?","L1-GRA-01","a",[
      {id:"a",label:"heiße / heißt"},
      {id:"b",label:"heißt / heiße",wrongFeedback:"Nämä vaihtavat minä- ja sinämuodon väärin päin."},
      {id:"c",label:"heißen / heißen",wrongFeedback:"Heißen on perusmuoto, ei molempien persoonien valmiit muodot."},
    ],"Ich heiße ja du heißt ovat oikein.","Ich saa heiße-muodon.","Ich heiße; du heißt. Nyt lisätään er/sie heißt.")),
    phase("meaning","Opetus","Mitä tarkoittavat er, sie ja Sie?",[
      "Er tarkoittaa hän (mies). Pienellä kirjoitettu sie tarkoittaa hän (nainen). Lause Er ist Ben. tai Sie ist Mia. kertoo kolmannesta henkilöstä, ei suoraan keskustelukumppanista.",
      "Kohtelias isolla kirjoitettava Sie tarkoittaa Te. Se käyttää eri verbimuotoja: Sie sind, Sie heißen ja Sie kommen. Tämä on C04:ssa jo opetettu kohtelias puhuttelu, ei sama asia kuin kolmannen henkilön sie.",
      "Lauseen alussa sekä Sie ist Mia. että Sie heißen Mia. alkavat isolla S:llä. Ero pitää siksi tunnistaa kontekstista ja verbistä: ist on hän, heißen on kohtelias Te.",
      "Kolmannen henkilön esittely voi alkaa valmiilla ilmauksella Das ist Mia. Sana Das toimii tässä kokonaisen tutun esittelyfraasin osana. Sinun ei tarvitse selittää kaikkia demonstratiivipronominin taivutuksia.",
    ],[{title:"Mistä erotan sie ja Sie?",body:"Keskellä lausetta sie on hän (nainen), Sie kohtelias Te. Lauseen alussa seuraa verbiä: Sie kommt = hän tulee, Sie kommen = Te tulette."}]),
    board("persons","Kolmen verbin neljä näkökulmaa",[
      "Seuraa vuorotellen pronominia ja sitä vastaavaa verbiä. Uutta ovat vain er/sie-muodot; muut on opetettu aiemmin.",
      "Katso erityisesti miten heißt on sama muoto sekä du-pronominin että er/sie-pronominin kanssa, mutta sein- ja kommen-verbit muuttuvat.",
    ],[
      {label:"1 · Minä",german:"ich heiße · ich bin · ich komme",meaning:"Nimeni on · olen · tulen"},
      {label:"2 · Sinä",german:"du heißt · du bist · du kommst",meaning:"Nimesi on · olet · tulet"},
      {label:"3 · Hän (mies)",german:"er heißt · er ist · er kommt",meaning:"Hänen nimensä on · hän on · hän tulee"},
      {label:"4 · Hän (nainen)",german:"sie heißt · sie ist · sie kommt",meaning:"Sama kolmikko naisesta puhuttaessa"},
      {label:"5 · Kohtelias Te",german:"Sie heißen · Sie sind · Sie kommen",meaning:"Jo opetettu isolla S:llä kirjoitettava puhuttelu"},
    ]),
    phase("rule","Opettajan selitys","Muodosta kolmannen henkilön lause vaiheittain",[
      "Aloita valitsemalla henkilö: er tai sie. Seuraavaksi päätä, kerrotko nimen, iän vai alkuperän.",
      "Nimi: er/sie heißt. Ikä tai olemisen ilmaus: er/sie ist. Alkuperä: er/sie kommt aus Finnland. Kaikki kolme lausetta käyttävät kolmannessa persoonassa yhtä täsmällistä muotoa.",
      "Miksi Er kommst aus Deutschland. on väärin? Komm-st kuuluu du-persoonalle. Er-persoonassa kirjoitetaan komm-t, siis Er kommt aus Deutschland.",
      "Miksi Sie bin Mia. on väärin, kun puhut naisesta? Bin kuuluu ich-pronominille. Oikea yksikön muoto on Sie ist Mia. tai esittelyssä Das ist Mia.",
    ]),
    board("builder","Rakenna kolmannen henkilön esittely pala palalta",[
      "Lähdetään kuvitteellisesta Miasta, joka on Suomesta ja 17-vuotias. Katso, miten jokaiseen uuteen tietoon tulee juuri oikea muoto.",
      "Harjoittelussa riittää yksi uusi lause kerrallaan. Lopuksi kaikki kolme lausetta muodostavat lyhyen esittelyn.",
    ],[
      {label:"1 · Valitse henkilö",german:"Mia",meaning:"Kuvitteellinen henkilö, josta kerrotaan"},
      {label:"2 · Esittelyfraasi",german:"Das ist Mia.",meaning:"Tämä on Mia. Fraasi aloittaa esittelyn."},
      {label:"3 · Pronomini ja nimi",german:"Sie heißt Mia.",meaning:"Sie viittaa Miaan, heißt on oikea henkilömuoto."},
      {label:"4 · Alkuperä",german:"Sie kommt aus Finnland.",meaning:"Kommt, ei komme tai kommst."},
      {label:"5 · Ikä",german:"Sie ist siebzehn Jahre alt.",meaning:"Ist, ei bin tai bist."},
      {label:"6 · Tarkista",german:"Das ist Mia. Sie kommt aus Finnland. Sie ist siebzehn Jahre alt.",meaning:"Kolme tietoa ja kaikki verbimuodot sopivat henkilöön."},
    ],[{title:"Miksi kaksi lausetta alkavat Sie-sanalla?",body:"Molemmat viittaavat samaan Miaan. Nimen voi välttää toistamasta jokaisessa lauseessa."}]),
    question("guided","Valitse ist eikä bin",[
      "Nyt kuvitteellinen Leo on 17-vuotias. Täydennä lause, jossa puhut hänestä.",
    ],choice("Er ___ siebzehn Jahre alt.","L1-GRA-01","b",[
      {id:"a",label:"bin",wrongFeedback:"Bin kuuluu ich-muotoon: ich bin."},
      {id:"b",label:"ist"},
      {id:"c",label:"bist",wrongFeedback:"Bist kuuluu du-muotoon: du bist."},
    ],"Oikein. Er ist siebzehn Jahre alt.","Kerrotaan hänestä, ei itsestä tai sinusta.","Er/sie ist. Ich bin. Du bist.")),
    book("book-practice","Neljä oikeaa kolmannen persoonan tehtävää",[
      "Avaa C10:n kielioppitaulukko ja tee sitten Harjoittele-sivulla C10-EX-06, 07, 08 ja 10. Kokeile ensin ilman mallia, käytä taulukkoa vain tarvittaessa.",
      "C10-EX-06 ja 07 harjoittavat sein-verbin häntä tarkoittavaa muotoa; C10-EX-08 kysyy heißen-verbiä ja EX-10 kommen-verbiä.",
      "Kirjassa antamasi vastaukset jäävät kappaleen nykyiseen tallennukseen. Niiden tarkistus ei ole sama asia kuin seuraava itsenäinen henkilöesittelyn näyttö.",
    ],[
      c10Link("grammar","C10 · Kielioppi","Vertaa ich, du, er/sie ja kohtelias Sie."),
      c10Link("practice","C10 · Harjoittele","Tee C10-EX-06, 07, 08 ja 10."),
    ]),
    question("independent","Kirjoita hänen alkuperänsä",[
      "Sulje taulukko. Kuvitteellinen Ben on kotoisin Saksasta. Kirjoita kokonainen lause kolmannessa persoonassa.",
    ],typed("Kirjoita saksaksi: Hän (mies) on kotoisin Saksasta.","L1-GRA-01",["Er kommt aus Deutschland."],
      "Oikein. Er kommt aus Deutschland. käyttää er + kommt -paria.",
      "Aloita Er, lisää kommen-verbin hän-muoto ja aus Deutschland.",
      "Er kommt aus Deutschland. Er tarvitsee kommt-muodon.","independent",
      {"er kommst aus deutschland":"Kommst kuuluu du-persoonaan, ei er-persoonaan.","er komme aus deutschland":"Komme kuuluu ich-persoonaan. Er tarvitsee kommt."})),
    question("application","Mikä lause esittelee uuden tuttavan?",[
      "Mia esittelee ystävänsä Leon toiselle ihmiselle. Valitse lyhyt, luonteva aloittava repliikki.",
    ],choice("Mitä Mia sanoo esitellessään Leon?","L1-PROD-01","a",[
      {id:"a",label:"Das ist Leo."},
      {id:"b",label:"Ich bin Leo.",wrongFeedback:"Mia esittelisi näin itsensä Leona. Hän esittelee toista henkilöä."},
      {id:"c",label:"Du bist Leo.",wrongFeedback:"Tämä puhuu suoraan Leolle eikä esittele häntä toiselle."},
    ],"Oikein. Das ist Leo. on tuttu esittelyfraasi kolmannelle henkilölle.",
      "Tarvitset kokonaisen fraasin Tämä on...",
      "Das ist Leo. kertoo keskustelukumppanille, kuka Leo on.","application")),
    reflect("self-intro","Esittele itse kuvitteellinen henkilö",[
      "Muodosta kuvitteelliselle ihmiselle kolme tai neljä helppoa lausetta. Kerro nimi, lähtömaa ja ikä. Pidä verbit er/sie-muodossa.",
      "Käytä oppikirjan Käytä saksaa -sivua tarvittaessa. Tarkista jokaisen pronominin vieressä oleva verbi itse, älä luota automaattiseen vapaatekstin pisteytykseen.",
    ],"Kirjoita oma esittelysi tai sen itsearvio (vähintään 45 merkkiä).",
      "Das ist Leo. Er heißt Leo. Er kommt aus Deutschland. Er ist ...",45,
      "person-presented","Vertasin omaa esittelyäni taulukkoon ja harjoittelin ääneen"),
    question("exit","Tunnistatko kolmannen persoonan muistista?",[
      "Viimeinen lyhyt tarkistus erottaa hän-pronominin du- ja kohteliaasta Sie-muodosta.",
    ],choice("Mikä lause tarkoittaa Hän (nainen) on kotoisin Suomesta?","L1-GRA-01","c",[
      {id:"a",label:"Sie komme aus Finnland.",wrongFeedback:"Komme kuuluu ich-persoonaan."},
      {id:"b",label:"Sie kommen aus Finnland.",wrongFeedback:"Tämä on kohtelias Te-muoto, ei yhden naisen esittely."},
      {id:"c",label:"Sie kommt aus Finnland."},
    ],"Oikein. Sie kommt aus Finnland. kertoo hänestä, ja verbimuoto on kommt.",
      "Hän + kommen käyttää -t-päätettä.",
      "Sie kommt = hän tulee. Sie kommen = Te tulette kohteliaasti.","exit")),
    summary("Osaat kertoa myös toisesta ihmisestä",[
      "Nyt sinulla on kolme opittua paria er/sie heißt, ist ja kommt. Osaat myös esitellä henkilön kiinteällä ilmauksella Das ist ...",
      "Vapaa puhe ja pidempi oma esittely ovat itsearvioituja. Automaattinen pistemerkintä koskee vain rajattuja lauseita.",
      "Seuraavaksi rakennat kaksi erilaista keskustelua, joissa nämä henkilöesittelyt ja aiemmat kysymykset yhdistyvät.",
    ]),
  ],
};

const textBBoard = LOS1_TEXT_B_SOURCES["10"].lines.map((line,index)=>({
  label:(index+1)+" / 4 · "+line.speaker,
  german:line.text,meaning:line.meaning,
}));
export const LOS1_L054_TEACHER:TeacherLesson={
  id:"L054",bookId:1,chapterId:"10",version,title:"Rakenna kaksi keskustelua",
  objective:"Osaan valita kahden erilaisen, valmiiksi käsikirjoitetun tilanteen repliikit ja kirjoittaa itse kaksi helppoa du- ja Sie-keskustelua.",
  estimatedMinutes:30,
  requiredQuestionIds:["recall","guided","independent","application","formal-check","exit"],
  requiredActivityIds:["both-dialogues-reviewed"],
  requiredPracticeIds:["C10-EX-12","C10-EX-13"],
  requiredCheckedIds:["C10-TEXTB-Q01","C10-TEXTB-Q02"],
  scenes:[
    introduction("Kahdenlaisia kohtaamisia",[
      "Kuvittele kaksi eri tilannetta: tutustut uuteen samanikäiseen ja tapaat opettajan. Voit kysyä kummassakin nimen ja alkuperän, mutta puhuttelu vaihtuu.",
      "Tämä ei ole tekoälyn kanssa käytävä vapaa keskustelu. Harjoitus on käsikirjoitettu: näet tilanteen, valitset oikean jatkon ja saat palautteen. Sen jälkeen kirjoitat itse kaksi dialogia ja arvioit ne mallin avulla.",
      "Luemme ensin C10:n toisen aidon tekstin: Thomasin, Takashin ja Peterin alkuperäisen M-COM-02-keskustelun. Lähteen äänen käyttöä ei vielä merkitä varmennetuksi kuuntelusuoritukseksi.",
    ]),
    question("recall","Valitse puhuttelu",[
      "Puhut opettajalle, jonka kanssa et ole sopinut sinuttelusta.",
    ],choice("Kumpi nimikysymys sopii?","L1-INT-04","b",[
      {id:"a",label:"Wie heißt du?",wrongFeedback:"Du on tuttavallinen sinuttelu. Opettajaa voi tilanteessa puhutella kohteliaammin."},
      {id:"b",label:"Wie heißen Sie?"},
      {id:"c",label:"Ich heiße Mia.",wrongFeedback:"Tämä kertoo oman nimen eikä kysy opettajan nimeä."},
    ],"Oikein. Wie heißen Sie? on kohtelias nimikysymys.",
      "Kohtelias Te kirjoitetaan Sie.","Du → heißt; kohtelias Sie → heißen.")),
    board("text-b","C10:n Text B: neljä alkuperäistä repliikkiä",[
      "Lue kaikki neljä repliikkiä ja tutki, kuka puhuu. Thomas esittelee itsensä, Takashi kertoo nimensä ja kolmas henkilö Peter esitellään.",
      "Text B käyttää myös muotoa Wir kommen aus Berlin. Se on tässä vain alkuperäisen tekstin tunnistettava ilmaus; tämän tunnin itsenäisissä tehtävissä ei vaadita uutta wir-taivutusta.",
      "Opetustaulu käyttää kirjan täsmälleen samaa Text B -lähdedataa. Sen äänen toiminta ja laite-QA ovat vielä erillisiä portteja.",
    ],textBBoard),
    book("source","Tarkista Text B:n kaksi sisältökysymystä",[
      "Avaa kirjan C10 Text B ja lue tai luvallisella soittimella kuuntele alkuperäinen keskustelu. Tekstivastine riittää tämän tunnin luetun ymmärtämisen harjoitteluun.",
      "Tee C10-TEXTB-Q01 ja Q02: kuka aloittaa keskustelun ja kenet Thomas esittelee? Paina Tarkista vastaus molempien kohdalla.",
      "Kun löydät ilmauksen Das ist Peter, huomaa että esittelijä kertoo toisesta ihmisestä. Se täydentää L053:n opetusta.",
    ],[c10Link("text-b","C10 · Text B / M-COM-02","Lue kaikki neljä repliikkiä ja tarkista kysymykset 01–02.")]),
    phase("scenario-a","Opetus","Tilanne A: kaksi uutta nuorta tapaa",[
      "Tilanteessa A molemmat ovat samanikäisiä ja sinuttelevat. Tervehdi ensin: Hallo! Esittele sitten itsesi: Ich heiße Mia. Kysy vuorostasi: Wie heißt du?",
      "Kun uusi tuttava vastaa Ich heiße Ben., jatka kysymällä Woher kommst du? ja vastaa itse tarvittaessa Ich komme aus Finnland.",
      "Voit jatkaa yhdellä kuulumiskysymyksellä: Wie geht's? Sopiva vastaus on Gut, danke. Und dir? Lopuksi toinen sanoo Tschüss!, etkä aloita uutta nimikysymystä.",
      "Jokainen repliikki on jo aiemmin opetettua alkeiskieltä. Älä pakota uutta aikamuotoa tai monimutkaista perustelua keskusteluun.",
    ]),
    board("branch-a","Käsikirjoitettu kohtaaminen A",[
      "Opettaja näyttää kuuden puheenvuoron tilanteen. Kuvittele kaksi opiskelijaa ja käy vuorot järjestyksessä.",
    ],[
      {label:"Mia 1 · Aloitus",german:"Hallo! Ich heiße Mia. Wie heißt du?",meaning:"Hei, olen Mia. Mikä sinun nimesi on?"},
      {label:"Ben 2 · Vastaus",german:"Hallo! Ich bin Ben.",meaning:"Hei, olen Ben."},
      {label:"Mia 3 · Jatkokysymys",german:"Woher kommst du?",meaning:"Mistä olet kotoisin?"},
      {label:"Ben 4 · Alkuperä",german:"Ich komme aus Deutschland. Und du?",meaning:"Olen Saksasta. Entä sinä?"},
      {label:"Mia 5 · Vastaus",german:"Ich komme aus Finnland.",meaning:"Olen Suomesta."},
      {label:"Ben 6 · Lopetus",german:"Tschüss!",meaning:"Moikka!"},
    ]),
    question("guided","Haara A: miten jatkat?",[
      "Ben on kertonut nimensä, mutta ei alkuperäänsä. Valitse tilanteeseen sopiva seuraava kysymys. Tämä on ennalta käsikirjoitettu valintahaara, ei tekoälydialogi.",
    ],choice("Mia: Ich heiße Mia. Ben: Ich bin Ben. Mia: ___","L1-INT-03","a",[
      {id:"a",label:"Woher kommst du?"},
      {id:"b",label:"Auf Wiedersehen!",wrongFeedback:"Hyvästely lopettaisi keskustelun heti, vaikka nyt tarkoitus on jatkaa tutustumista."},
      {id:"c",label:"Ich komme aus Finnland.",wrongFeedback:"Tämä kertoo Mian alkuperän, mutta ei kysy Beniltä hänen kotipaikkaansa."},
    ],"Oikein. Woher kommst du? jatkaa keskustelua.",
      "Kysy mistä = woher.","Woher kommst du? kysyy alkuperää. Sen jälkeen Ben voi vastata Ich komme aus Deutschland.")),
    question("independent","Haara A: mikä vastaus sopii?",[
      "Ben kysyy nyt takaisin Woher kommst du?. Kirjoita oma vuorosi Mia-nimisenä kuvitteellisena henkilönä.",
    ],typed("Mia on Suomesta. Kirjoita hänen vuoronsa minämuodossa.","L1-INT-03",["Ich komme aus Finnland."],
      "Oikein. Kun Mia itse vastaa, hän käyttää ich komme -muotoa.",
      "Mia puhuu itsestään: ich.",
      "Ich komme aus Finnland. Er/sie kommt kertoo toisesta henkilöstä.","independent",
      {"sie kommt aus finnland":"Tämä kertoisi Miasta ulkopuolisena, mutta nyt Mia puhuu itse."})),
    phase("scenario-b","Opetus","Tilanne B: kohtelias kohtaaminen ja esittely",[
      "Tilanteessa B oppilas tulee tapaamaan opettajaa ja esittelee kuvitteellisen ystävänsä. Aloita Guten Tag! ja käytä Te-puhuttelua: Wie heißen Sie?",
      "Opettaja voi vastata Ich heiße Frau Weber. Oppilas kertoo itsensä Ich bin Leo. ja esittelee ystävänsä Das ist Mia. Sie kommt aus Finnland.",
      "Jos haluat kysyä opettajan lähtömaasta, kysyt Woher kommen Sie? Tämä on jo C04:ssa opetettu kohtelias kysymys.",
      "Lopetukseen sopii Auf Wiedersehen!, ei tuttavallinen Tschüss! tilanteessa, jossa valittiin muodollinen rekisteri.",
      "C10:n otsikon Schön, dich kennenzulernen! tarkoittaa Hauska tutustua! Opettele se halutessasi valmiina kohteliaisuusfraasina. Sen sisäistä rakennetta ei tarvitse taivuttaa tai käyttää uutena kielioppina.",
    ]),
    board("branch-b","Käsikirjoitettu kohtaaminen B",[
      "Seuraa toista kuuden vuoron käsikirjoitusta. Siinä vuorottelevat kohtelias Te, oppilaan minämuoto ja ystävän kolmas persoona.",
    ],[
      {label:"Leo 1 · Kohtelias alku",german:"Guten Tag! Wie heißen Sie?",meaning:"Hyvää päivää. Mikä Teidän nimenne on?"},
      {label:"Opettaja 2 · Oma nimi",german:"Guten Tag! Ich heiße Frau Weber.",meaning:"Hyvää päivää. Olen rouva Weber."},
      {label:"Leo 3 · Oma ja kolmannen henkilön esittely",german:"Ich bin Leo. Das ist Mia. Sie kommt aus Finnland.",meaning:"Olen Leo. Tässä on Mia. Hän on Suomesta."},
      {label:"Opettaja 4 · Kuulumiskysymys",german:"Wie geht's?",meaning:"Mitä kuuluu?"},
      {label:"Leo 5 · Vastaus ja vastakysymys",german:"Gut, danke. Und Ihnen?",meaning:"Hyvää, kiitos. Entä Teille?"},
      {label:"Opettaja 6 · Vastaus ja kohtelias lopetus",german:"Gut, danke. Auf Wiedersehen!",meaning:"Hyvää, kiitos. Näkemiin!"},
    ]),
    question("application","Haara B: opettajalle oikea kysymys",[
      "Leo haluaa kohteliaasti tietää, mistä opettaja on kotoisin. Älä sekoita tutun du-puhuttelua ja kohteliasta Sie-puhuttelua.",
    ],choice("Mikä repliikki kysyy opettajan alkuperää kohteliaasti?","L1-INT-04","c",[
      {id:"a",label:"Woher kommst du?",wrongFeedback:"Tämä on sinuttelua, ei kohtelias opettajalle osoitettu kysymys."},
      {id:"b",label:"Woher kommt Sie?",wrongFeedback:"Kohtelias Sie tarvitsee kommen-muodon, ei kommt."},
      {id:"c",label:"Woher kommen Sie?"},
    ],"Oikein. Woher kommen Sie? on kohtelias kysymys lähtöpaikasta.",
      "Muista Sie → kommen.","Woher kommen Sie? käyttää isoa Sie-sanaa ja kommen-verbiä.","application")),
    question("formal-check","Haara B: esittele Mia kolmannessa persoonassa",[
      "Leo haluaa kertoa opettajalle Miasta, ei kysyä opettajan nimeä.",
    ],choice("Mikä lause esittelee kuvitteellisen Mian oikein?","L1-GRA-01","b",[
      {id:"a",label:"Sie komme aus Finnland.",wrongFeedback:"Hän-muoto on kommt, ei komme."},
      {id:"b",label:"Das ist Mia. Sie kommt aus Finnland."},
      {id:"c",label:"Sie kommen aus Finnland.",wrongFeedback:"Kohtelias Te-muoto ei kerro tässä Miasta."},
    ],"Oikein. Das ist Mia. Sie kommt aus Finnland. kertoo kolmannesta henkilöstä.",
      "Yhdistä Das ist ja er/sie kommt.",
      "Hänestä kerrotaan sie kommt. Kohtelias Sie kommen puhuttelee toista suoraan.","application")),
    book("formal-practice","Kertaa C10:n kaksi Sie-tehtävää",[
      "Avaa C10:n harjoittelusivu ja tee C10-EX-12 sekä C10-EX-13. Ne tarkistavat kohteliasta Woher kommen Sie? ja Wie heißen Sie? -kysymystä.",
      "Tee nämä ennen omaa vapaata keskustelutekstiä, jotta muodot pysyvät oikeina. Kirjan tehtäväpankki ja tarkistuspalaute toimivat entiseen tapaan.",
    ],[c10Link("practice","C10 · Harjoittele","Ratkaise C10-EX-12 ja C10-EX-13.")]),
    reflect("dialogue-du","Kirjoita ensimmäinen oma keskustelu",[
      "Luo 6–8 vuoron tuttavallinen kohtaaminen kuvitteellisille nuorille. Mukaan tervehdys, nimi, lähtömaa, jatkokysymys ja hyvästely. Älä kopioi pelkkää kuusirivistä esimerkkiä sanasta sanaan, vaan vaihda ainakin nimi tai maa.",
      "Tarkista itse jokainen kysymys ja vastaus. Sovellus tallentaa luonnoksen mutta ei anna vapaan keskustelun kieliopista konearvosanaa.",
    ],"Kirjoita 6–8 repliikin du-keskustelu (vähintään 90 merkkiä).",
       "A: Hallo! Ich heiße ...\nB: Hallo! Ich bin ...",90),
    reflect("dialogue-sie","Kirjoita toinen oma keskustelu",[
      "Kirjoita eri tilanne: opiskelija tapaa opettajan kohteliaasti, kertoo omat perustietonsa, esittelee kolmannen kuvitteellisen ihmisen ja hyvästelee.",
      "Käytä Sie-puhuttelua vain opettajaan, er/sie-muotoa vain kolmanteen henkilöön. Tarkista kaksi dialogiasi itse ja tarvittaessa kopioi valmis versio kirjan Käytä saksaa -luonnoskenttään.",
      "Tällä tunnilla ei ole improvisoidun puheen automaattista arviointia. Tarkistuslista: kaksi erilaista tilannetta, kysymykset, lyhyet vastaukset, kolmannen henkilön esittely, kohtelias lopetus.",
    ],"Kirjoita 6–8 repliikin Sie-keskustelu (vähintään 90 merkkiä).",
       "A: Guten Tag! Wie heißen Sie?\nB: Guten Tag! Ich heiße ...",90,
       "both-dialogues-reviewed","Vertasin molemmat omat keskusteluni malliin"),
    question("exit","Lopetuksen pitää sopia tilanteeseen",[
      "Opettajalle puhuttiin alusta loppuun kohteliaasti. Valitse tilanteeseen kuuluva hyvästely.",
    ],choice("Miten Leo lopettaa keskustelun opettajan kanssa?","L1-INT-04","b",[
      {id:"a",label:"Wie heißt du?",wrongFeedback:"Tämä on sinutteluun kuuluva nimikysymys, ei hyvästely."},
      {id:"b",label:"Auf Wiedersehen!"},
      {id:"c",label:"Gute Nacht!",wrongFeedback:"Tämä tarkoittaa hyvää yötä eikä ole tässä tavallinen koulutapaamisen lopetus."},
    ],"Oikein. Auf Wiedersehen! on kohtelias lopetus.",
      "Etsi hyvästely, ei tervehdystä.","Guten Tag! aloittaa, Auf Wiedersehen! päättää kohteliaasti.","exit")),
    summary("Kaksi erilaista keskustelua tallessa",[
      "Harjoittelit du- ja Sie-kohtaamisia käsikirjoitetuissa valintatilanteissa. Lisäksi kirjoitit kaksi erilaista dialogiluonnosta ja arvioit ne itse.",
      "C10 Text B:n tarkistettavat sisältövastaukset tallentuivat kirjan yhteiseen tehtävätilaan. Ne eivät todista mediakuuntelua ilman hyväksyttyä ääntä.",
      "Seuraavalla tunnilla kokoat aiemmat taitosi kappaletestiin. Vapaiden dialogien laatua ei muuteta automaattiseksi pistemääräksi.",
    ]),
  ],
};

const C10_TEST_IDS=losExercisesFor("10").map(item=>item.id);
export const LOS1_L055_TEACHER:TeacherLesson={
  id:"L055",bookId:1,chapterId:"10",version,title:"Harjoittele ja testaa C10",
  objective:"Kertaan koko LOS! 1:n esittelyketjun, palautan C10:n oikean 20-osaisen kappaletestin, kirjoitan oman sovelluksen ja arvioin osaamiseni.",
  estimatedMinutes:30,
  requiredQuestionIds:["recall","guided","independent","application","exit"],
  requiredActivityIds:["self-checklist"],
  requiredPracticeIds:[],
  chapterAssessment:{requiredTestIds:C10_TEST_IDS,requireApplicationDraft:true,minSelfAssessmentLength:15},
  scenes:[
    introduction("Viimeinen kappale on oikea kohtaaminen",[
      "Kertasit C10:ssa kokonaisen vuorovaikutusketjun ja kirjoitit kaksi erityyppistä keskustelua. Nyt tarkistat opittua itsenäisesti ja palautat kirjan oikean kappaletestin.",
      "C10-testissä on 20 jo olemassa olevaa rajatusti tarkistettavaa osatehtävää. Ne eivät ole sama asia kuin LOS! 1:n erillinen loppukoe, eivätkä ne mittaa vapaata puhetta.",
      "Tähän tuntiin kuuluu itse tehty sovellus ja sanallinen itsearviointi. Älä käytä henkilötietoja, joita et halua tallentaa; keksitty henkilö riittää.",
    ]),
    question("recall","Mikä aloittaa uuden tuttavuuden?",[
      "Kerrataan tutun kohtaamisen ensimmäinen askel ilman mallia.",
    ],choice("Haluat kysyä uuden tuttavan nimeä. Mitä sanot?","L1-INT-02","c",[
      {id:"a",label:"Wie alt bist du?",wrongFeedback:"Tämä kysyy ikää."},
      {id:"b",label:"Woher kommst du?",wrongFeedback:"Tämä kysyy lähtöpaikkaa."},
      {id:"c",label:"Wie heißt du?"},
    ],"Oikein. Wie heißt du? kysyy nimeä.","Nimi → heißen.",
      "Wie heißt du? kysyy nimen; Wie alt bist du? iän; Woher kommst du? alkuperän.")),
    phase("recap","Opetus","Tarkistuslista ennen testiä",[
      "Aloita tervehtimällä: Hallo! tutulle, Guten Tag! kohteliaasti. Nimikysymys on Wie heißt du? tai kohteliaasti Wie heißen Sie?",
      "Kerro oma nimesi Ich heiße ... ja oma alkuperäsi Ich komme aus Finnland. Ikä ilmaistaan Ich bin siebzehn Jahre alt.",
      "Kolmannen henkilön nimi ja alkuperä: Das ist Mia. Sie heißt Mia. Sie kommt aus Finnland. Älä sekoita pienellä kirjoitettavaa hän-muotoa kohteliaaseen Sie-puhutteluun.",
      "Jatka keskustelua tutulla kysymyksellä Woher kommst du? tai Wie geht's?, vastaa tarkoituksenmukaisesti, ja lopeta Tschüss! tai Auf Wiedersehen! tilanteen mukaan.",
      "Jos et ymmärrä toisen puhetta, sano Noch einmal, bitte. tai Bitte langsamer. Nämä ovat kokonaisia aiemmin opittuja selviytymisfraaseja.",
    ]),
    board("last-model","Tarkista oma lause jokaisen henkilön kohdalta",[
      "Käy seuraava malli kerran läpi, sitten piilota se ennen itsenäisiä tarkistuksia.",
    ],[
      {label:"1 · Ich",german:"Ich heiße Leo. Ich komme aus Finnland.",meaning:"Kerron omasta nimestä ja alkuperästä: heiße, komme."},
      {label:"2 · Du",german:"Wie heißt du? Woher kommst du?",meaning:"Kysyn tutulta nimen ja alkuperän: heißt, kommst."},
      {label:"3 · Er",german:"Er heißt Ben. Er ist siebzehn. Er kommt aus Deutschland.",meaning:"Kerron hänestä: heißt, ist, kommt."},
      {label:"4 · Sie (kohtelias)",german:"Wie heißen Sie? Woher kommen Sie?",meaning:"Kysyn kohteliaasti: heißen, kommen."},
      {label:"5 · Lopetus",german:"Auf Wiedersehen!",meaning:"Päätän kohteliaan keskustelun."},
    ]),
    question("guided","Kuka tarvitsee kommt-muodon?",[
      "Valitse muoto seuraavan kuvitteellisen lauseen täydentämiseen.",
    ],choice("Er ___ aus Finnland.","L1-GRA-01","b",[
      {id:"a",label:"komme",wrongFeedback:"Komme kuuluu ich-pronominin kanssa."},
      {id:"b",label:"kommt"},
      {id:"c",label:"kommst",wrongFeedback:"Kommst kuuluu du-pronominin kanssa."},
    ],"Oikein. Er kommt aus Finnland.","Er = hän → kommt.","Ich komme, du kommst, er/sie kommt.")),
    phase("test-instructions","Opettajan ohje","Näin teet kappaletestin itsenäisesti",[
      "Kirjan C10-testissä on 20 osatehtävää tervehdysten, nimen, alkuperän, iän, voinnin, persoonamuotojen, selviytymisfraasien ja hyvästelyjen kertauksesta.",
      "Avaa testi ja vastaa jokaiseen kohtaan ennen Palauta testi -painiketta. Testin ratkaisut eivät avaudu ennen palautusta.",
      "Jos joku kohta tuntuu vaikealta, kertaa se ensin opetusnäkymässä. Tässä opitun muistaminen on tärkeämpää kuin nopeus. Testi palautetaan kuitenkin aidosti kirjan järjestelmään.",
      "Alkuperäisestä Haraldin haastattelusta ei kysytä äänen perusteella testipisteitä, koska kuuntelumedia ei ole vielä hyväksytty. Loppukoe on oma erillinen oppituntinsa.",
    ]),
    book("chapter-test","Palauta C10:n oikea 20-osainen kappaletesti",[
      "Avaa C10:n Kappaletesti ja täytä kaikki C10-EX-01–20. Paina Palauta testi. Teacher tarkistaa olemassa olevasta kappaletilasta, onko kaikkiin vastattu ja onko palautuspäivä tallennettu.",
      "Täytä samalla kirjan Käytä saksaa -sivun sovellusluonnos: kaksi erilaista keskustelua, joissa on tervehdys, kysymyksiä, kolmannen henkilön esittely sekä sopiva lopetus.",
      "Palautuksen jälkeen kirjaa testin itsearviointi. Näitä kahta vapaata kirjoitusta ei automaattisesti kieliopillisesti pisteytetä.",
    ],[
      c10Link("test","C10 · Kappaletesti","Vastaa C10-EX-01–20 ja palauta koko testi."),
      c10Link("apply","C10 · Käytä saksaa","Tallenna kaksi keskustelua yhteiseen sovellusluonnokseen."),
    ]),
    question("independent","Vaihda minä häneksi",[
      "Kirjoita kokonainen uusi lause ilman taulukkoa. Kuvitteellinen Mia on kotoisin Itävallasta.",
    ],typed("Kirjoita saksaksi: Hän (nainen) on kotoisin Itävallasta.","L1-GRA-01",["Sie kommt aus Österreich."],
      "Oikein. Sie kommt aus Österreich. yhdistää pronominin ja oikean verbimuodon.",
      "Hän (nainen) on sie; verbin muoto on kommt.",
      "Sie kommt aus Österreich. Achtung: Sie kommen olisi kohtelias Te-muoto.","independent",
      {"sie kommen aus österreich":"Kommen viittaisi kohteliaaseen Te-puhutteluun. Hän-muoto on kommt."})),
    question("application","Valitse kohteliaan tilanteen lopetus",[
      "Olet esitellyt itsesi opettajalle ja nyt lähdet. Valitse kontekstiin sopiva repliikki.",
    ],choice("Miten päätät kohteliaan keskustelun?","L1-INT-04","a",[
      {id:"a",label:"Auf Wiedersehen!"},
      {id:"b",label:"Wie heißen Sie?",wrongFeedback:"Tämä aloittaisi uuden nimikysymyksen."},
      {id:"c",label:"Guten Morgen!",wrongFeedback:"Tämä on aloitustervehdys aamulla."},
    ],"Oikein. Auf Wiedersehen! lopettaa kohteliaasti.",
      "Valitse hyvästely.","Auf Wiedersehen! on kohteliaan kohtaamisen lopetus.","application")),
    reflect("checklist","Arvioi oma kokonainen keskustelusi",[
      "Kirjoita muistiin, osasitko ilman mallia: tervehtiä, kysyä nimen, vastata nimellä, kysyä lähtöpaikan, esittää jatkokysymyksen, esitellä kolmannen ihmisen ja hyvästellä.",
      "Vertaa L054:n kahta keskusteluasi omaan nykyiseen osaamiseesi. Älä anna itsellesi prosenttiarvosanaa vain siksi, että yksittäiset monivalinnat menivät oikein.",
      "Kirjan itsearviointi on oma erillinen kenttä, joka pitää täyttää, vaikka kirjoitat tähän opetustilan pohdinnan.",
    ],"Kirjoita yksi onnistuminen ja yksi konkreettinen harjoiteltava asia (vähintään 45 merkkiä).",
      "Osasin kysyä nimen ja lähtöpaikan. Haluan vielä harjoitella...",45,
      "self-checklist","Tarkistin oman keskusteluni kaikki seitsemän kohtaa"),
    question("exit","Loppukysymys ilman mallia",[
      "Viimeinen itsenäinen tarkistus. Sinun pitää valita oikea kolmannen henkilön lause.",
    ],choice("Miten kerrot ystävästä nimeltä Ben ja hänen alkuperästään?","L1-PROD-01","b",[
      {id:"a",label:"Ich heiße Ben. Ich komme aus Deutschland.",wrongFeedback:"Tämä olisi Benin oma esittäytyminen, ei toisen henkilön esittely."},
      {id:"b",label:"Das ist Ben. Er kommt aus Deutschland."},
      {id:"c",label:"Das ist Ben. Er kommst aus Deutschland.",wrongFeedback:"Kommst kuuluu du-muotoon. Hän on er kommt."},
    ],"Oikein. Das ist Ben. Er kommt aus Deutschland. esittelee kolmannen henkilön.",
      "Esittely alkaa Das ist, sitten er kommt.",
      "Das ist Ben. Er kommt aus Deutschland. Yhdistä er-pronominiin kommt.","exit")),
    summary("C10:n kappaletesti ja oma arvio",[
      "C10:n koko 20 tehtävän kappaletesti, sovellusluonnos ja itsearviointi tarkistetaan samoista tallennuskentistä kuin kirjan testinäkymässä. Oppitunnille ei tallenneta toista testitulosta.",
      "Tehtävien tulos kuvaa rajattua kielioppi- ja fraasiosaamista. Vapaa keskustelu ja puhe jäävät itsearvioitaviksi, eikä hyväksymätön Haraldin audio anna kuuntelupisteitä.",
      "LOS! 1:n viimeinen oppimisen tavoite on, että osaat yksinkertaisen kokonaisen esittäytymisen ja osaat pyytää apua, jos keskustelu etenee liian nopeasti.",
    ]),
  ],
};

export const LOS1_C10_TEACHER_LESSONS:readonly TeacherLesson[]=[
  LOS1_L051_TEACHER,LOS1_L052_TEACHER,LOS1_L053_TEACHER,
  LOS1_L054_TEACHER,LOS1_L055_TEACHER,
];
