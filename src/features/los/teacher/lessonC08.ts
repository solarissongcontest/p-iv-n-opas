import { losExercisesFor } from "../exerciseBank.ts";
import type { TeacherLesson, TeacherScene, TeacherQuestion } from "./engine.ts";

/**
 * LOS! 1 C08, L041-L045. Five deterministic, self-contained Teacher 2.0
 * manuscripts. All German example conversations below are explicitly LOS!
 * teaching scenarios, NOT passed off as Wikibooks or COERLL quotations.
 * The two entire historical source texts remain exclusively in the book.
 *
 * Publication is gated on independent German QA, rights/attribution review
 * and actual device testing; NO source audio or speech recognition is assumed.
 */
const S = "L1-STRAT-01";
const intro = (id:string,title:string,paragraphs:string[]):TeacherScene =>
  ({ id,phase:"Aloitus",kind:"introduction",title,paragraphs });
const explain = (id:string,title:string,paragraphs:string[],
  help?:{title:string;body:string}[]):TeacherScene =>
  ({ id,phase:"Opettajan selitys",kind:"explanation",title,paragraphs,...(help ? {help} : {}) });
const model = (id:string,title:string,paragraphs:string[],
  rows:[string,string,string][]):TeacherScene =>
  ({ id,phase:"Opetustaulu",kind:"board",title,paragraphs,
    board:rows.map(([label,german,meaning])=>({label,german,meaning})) });
const book = (id:string,title:string,paragraphs:string[],
  links:[string,string,string][]):TeacherScene =>
  ({ id,phase:"Oppikirja ja oikeat tehtävät",kind:"book",title,paragraphs,
    bookLinks:links.map(([label,section,instruction])=>({label,chapterId:"08",section,instruction})) });
const activity = (id:string,title:string,paragraphs:string[],action:string):TeacherScene =>
  ({ id,phase:"Harjoittelun vahvistus",kind:"activity",title,paragraphs,
    activityId:id,activityLabel:action });
const reflection = (id:string,title:string,paragraphs:string[],prompt:string,minLength:number):TeacherScene =>
  ({ id,phase:"Oma harjoittelu",kind:"reflection",title,paragraphs,
    reflection:{prompt,placeholder:"Kirjoita oma havainto tai mallikeskustelu...",minLength} });
const summary = (paragraphs:string[]):TeacherScene =>
  ({ id:"summary",phase:"Yhteenveto",kind:"summary",title:"Mitä osaat ja mitä vielä harjoittelet?",paragraphs });
/** Choice-specific replies are the prewritten branches of the dialogue.
 * Nothing is generated, inferred from speech, or fetched from a chat service.
 * An incorrect turn shows the counterpart's specific repair and invites retry.
 */
function dialogue(id:string,phase:string,title:string,opening:string,prompt:string,
  options:[string,string,string],correct:"a"|"b"|"c",
  partner:[string,string,string],success:string,hint:string,reteach:string,
  evidenceRole:TeacherQuestion["evidenceRole"]="practice",skillId=S):TeacherScene {
  return {id,phase,kind:"question",title,
    paragraphs:[opening,"Valitse oma repliikkisi. Keskustelukumppanin vastaus on käsikirjoitettu valintasi mukaan. Jos keskustelu ei etene, saat selityksen ja voit yrittää uudelleen."],
    question:{type:"choice",skillId,evidenceRole,prompt,
      options:options.map((label,i)=>({id:(["a","b","c"] as const)[i]!,
        label,wrongFeedback:partner[i] ?? ""})),
      correctOption:correct,success,hint,reteach,
      genericWrong:"Tässä tilanteessa toinen tarvitsee tietynlaisen avunpyynnön. Mieti, haluatko hidastamista, toistoa vai merkityksen selitystä."}};
}
const testIds = losExercisesFor("08").map(item=>item.id);

export const LOS1_L041_TEACHER:TeacherLesson = {
 id:"L041",bookId:1,chapterId:"08",version:"2.0.0-preview.1",
 title:"Selviytymisfraasit",
 objective:"Osaan ilmoittaa etten ymmärrä ja valita tilanteeseen sopivan toisto-, hidastamis- tai selityspyynnön.",
 estimatedMinutes:30,
 requiredQuestionIds:["recall","guided","did-not-understand","independent","exit"],
 requiredActivityIds:["say-it"],
 requiredPracticeIds:["C08-EX-01","C08-EX-02","C08-EX-03","C08-EX-04","C08-EX-05"],
 scenes:[
  intro("welcome","Saksa jatkuu, vaikka et ymmärtäisi kaikkea",[
    "Luokassa tai matkalla et aina ymmärrä ensimmäisellä kerralla. Tavoite ei ole arvata hiljaa vaan kertoa, mitä apua tarvitset.",
    "Opit neljä käyttövalmista lausetta: Ich verstehe nicht. (En ymmärrä.), Noch einmal, bitte. (Vielä kerran, kiitos.), Bitte langsamer. (Hitaammin, kiitos.) ja Was bedeutet das? (Mitä se tarkoittaa?).",
    "Nämä ovat valmiita puheenvuoroja. Sinun ei tarvitse taivuttaa uusia modaaliverbejä tai hallita kaikkia sanoja erikseen. Tunnin lopussa osaat käyttää niitä aidon keskustelun jatkamiseen."
  ]),
  dialogue("recall","Aktivointi","Muistatko edellisen kappaleen?","Kuvitteellinen opettaja sanoo nimen liian nopeasti.",
    "Mikä jo C07:ssa opetettu fraasi pyytää kuulemaan saman uudelleen?",
    ["Noch einmal, bitte.","Guten Morgen!","Ich heiße Mia."],"a",
    ["","Opettaja: Guten Morgen! kertoo tervehdyksestä, mutta nimi jäi edelleen epäselväksi.","Opettaja: Mia? Kysymys ei koskenut sinun nimeäsi."],
    "Opettaja: Natürlich. Ich wiederhole es. (Totta kai. Toistan sen.) Toistopyyntö jatkoi keskustelua.",
    "Tarvitset saman asian vielä kerran, et uutta tervehdystä.",
    "Noch einmal, bitte. pyytää saman sanoman toistamista. Jos sitä ei kuule, ei tarvitse teeskennellä ymmärtävänsä."),
  explain("why","Kerro ongelma ensin, pyydä sitten oikeaa apua",[
    "Ich verstehe nicht. kertoo keskustelukumppanille, että jokin meni ohi. Se ei vielä kerro, miksi. Voit jatkaa yhdellä täsmentävällä pyynnöllä.",
    "Jos et kuullut ohjetta, sano Noch einmal, bitte. Jos puhe oli liian nopeaa, sano Bitte langsamer. Jos yksittäinen sana oli vieras, osoita sitä ja kysy Was bedeutet das?",
    "Voit myös sanoa Ich verstehe das nicht. Molemmat ilmaukset viestivät ongelmasta, mutta ensimmäinen lyhyempi malli riittää aluksi.",
    "Bitte tekee lyhyestä pyynnöstä kohteliaan. Opettajalle voit käyttää kokonaisena opittua fraasia Können Sie das bitte wiederholen? eli Voisitteko toistaa sen?"
  ],[{title:"Miten valitsen oikein?",body:"Kysy itseltäsi: enkö kuullut, menikö liian nopeasti vai enkö tiedä sanan merkitystä? Ne tarvitsevat eri korjauspyynnön."},
      {title:"Mitä jos pelkään virheitä?",body:"Voit aloittaa turvallisesti lauseella Ich verstehe nicht. Sen jälkeen voit sanoa vain Noch einmal, bitte. Tarkoitus on saada keskustelu jatkumaan."}]),
  model("board","Tee avunpyynnöstä kaksivaiheinen",[
    "Seuraa kahta keskustelun osaa: ensin kerrot ongelman, sitten pyydät oikeaa apua. Opettaja mallintaa myös toisen henkilön vastauksen."
  ],[
    ["1 · Ongelma","Ich verstehe nicht.","En ymmärrä. Et teeskentele ymmärtäväsi."],
    ["2 · Sama ohje","Noch einmal, bitte.","Pyydät toistamaan, mitä äsken sanottiin."],
    ["3 · Puhe liian nopeaa","Bitte langsamer.","Pyydät hitaampaa puhetta."],
    ["4 · Vieras sana","Was bedeutet das?","Kysyt juuri tämän ilmauksen merkitystä."],
    ["5 · Kohtelias täyspyyntö","Können Sie das bitte wiederholen?","Opettajalle: Voisitteko toistaa sen? Opettele yhtenä kokonaisuutena."],
    ["6 · Vastapuoli auttaa","Ja, natürlich. Noch einmal.","Totta kai, vielä kerran. Keskustelu jatkuu."]
  ]),
  dialogue("guided","Ohjattu harjoitus","Nopeus vai merkitys?","Opettaja antaa pitkän ohjeen nopeasti. Tunnet suurimman osan sanoista.",
    "Mitä pyydät?",
    ["Was bedeutet das?","Bitte langsamer.","Auf Wiedersehen!"],"b",
    ["Opettaja: Welches Wort? (Mikä sana?) Mutta ongelma oli nopeus, ei yksi sana.","","Opettaja: Auf Wiedersehen! lopettaisi keskustelun, eikä hidastaisi ohjetta."],
    "Opettaja: Ja, ich spreche langsamer. (Kyllä, puhun hitaammin.) Pyyntösi kohdistui ongelmaan.",
    "Mikä saksalainen sana vastaa suomen sanaa hitaammin?",
    "Bitte langsamer. on hyvä lyhyt pyyntö. Noch einmal, bitte. taas pyytää toistamaan."),
  dialogue("did-not-understand","Käsikirjoitettu dialogi","Et ymmärrä ohjetta","Opettaja: Bearbeitet bitte Aufgabe zwei. (Tehkää tehtävä kaksi.) Sinulta menee koko ohje ohi.",
    "Mikä on ensimmäinen luonteva repliikkisi?",
    ["Ich verstehe nicht.","Wie alt bist du?","Sehr gut!"],"a",
    ["","Opettaja: Ich bin vierzig. (Olen neljäkymmentä.) Vastaus ei ratkaise tehtäväohjetta.","Opettaja: Gut? Oletko varma? Sehr gut! antaa ymmärtää, että tehtävä on jo selvä."],
    "Opettaja: Kein Problem. (Ei haittaa.) Hän tietää nyt, että tarvitset tukea. Seuraavaksi voit pyytää toistoa.",
    "Kerro ensin, ettei ohje auennut.",
    "Ich verstehe nicht. ei ole pahoittelu vaan hyödyllinen viesti: tarvitset selityksen tai toiston.",
    "application"),
  book("practice","Harjoittele kirjan oikeissa C08-tehtävissä",[
    "Avaa Sanasto ja katso, missä tilanteessa kukin fraasi toimii. Tee C08-EX-01...05 kirjan Harjoittele-osiossa.",
    "Ne ovat jo olemassa olevia tehtäviä. Vastaukset tallentuvat oppikirjaan, eivät uuteen tunnin vastauskantaan. Valmiin mallin avaaminen on harjoittelua, ei itsenäinen näyttö."
  ],[["C08 · Sanasto","vocabulary","Opettele valmiit ilmaukset, ei irrallisia sanoja."],
     ["C08 · Harjoittele","practice","Vastaa tehtäviin C08-EX-01...05."]]),
  dialogue("independent","Itsenäinen soveltaminen","Ohje on hukassa bussiasemalla","Kuvitteellinen lipunmyyjä sanoo sinulle uuden ohjeen. Et kuullut ohjetta kunnolla, mutta puhenopeus ei ole ongelma.",
    "Miten jatkat saksaksi niin, että kuulet saman uudelleen?",
    ["Bitte langsamer.","Noch einmal, bitte.","Wie heißt du?"],"b",
    ["Myyjä: Langsamer? Voin kyllä hidastaa puhetta, mutta halusit kuulla saman ohjeen uudelleen.","","Myyjä: Ich heiße Jonas. Saat nimen, et ohjetta."],
    "Myyjä: Ja, gern. Ich wiederhole das. (Toki. Toistan sen.) Oikea avunpyyntö pitää tilanteen käynnissä.",
    "Ongelma ei ollut nopeus vaan kuulematta jäänyt sisältö.",
    "Noch einmal, bitte. pyytää saman ohjeen uudelleen. Hitaammin puhuminen ei ole täysin sama pyyntö.",
    "independent"),
  activity("say-it","Kokeile avunpyyntöä ääneen",[
    "Valitse yksi oma tilanne: et ymmärrä, puhe etenee liian nopeasti tai pyydät toistoa. Kuvittele ensin toinen ihminen ja sano avunpyyntö ääneen tai hiljaa mielessäsi.",
    "Sano sitten jatko: Danke! Et tarvitse mikrofonia eikä ääntämistä pisteytetä. Vahvista harjoittelu vain, jos yritit todella."
  ],"Harjoittelin ongelman kertomisen ja avunpyynnön"),
  dialogue("exit","Lopputarkistus","Vieraan sanan merkitys","Keskustelukumppani käyttää sanaa Aufgabe. Kuulet sanan selvästi, mutta et tiedä sen merkitystä.",
    "Mitä kysyt?",
    ["Was bedeutet das?","Bitte langsamer.","Ich komme aus Finnland."],"a",
    ["","Kumppani: Langsamer? Nopeus ei auta, jos sana on tuntematon.","Kumppani: Aha, Finnland. Nyt keskustelu siirtyy kotimaahasi eikä sanan merkitykseen."],
    "Kumppani: Aufgabe heißt Übung. (Suomeksi: tehtävä.) Saat sanalle selityksen.",
    "Etsi merkitystä kysyvä fraasi.",
    "Was bedeutet das? on sanan tai ilmauksen merkityksen kysymiseen. Ich verstehe nicht. on hyvä alku, mutta tarkempi kysymys auttaa paremmin.",
    "exit"),
  summary([
    "Osaat erottaa neljä avuntarvetta: en ymmärrä, toista, hidasta ja selitä sana. Harjoittelit niitä oikeina keskustelun repliikkeinä.",
    "Seuraavaksi L042:ssa luetaan ihmisen kirjoittama kokonainen luokkakohtaus. Vaikeaa alkuperäiskieltä ei tarvitse osata itse tuottaa."
  ])
 ]
};

export const LOS1_L042_TEACHER:TeacherLesson = {
 id:"L042",bookId:1,chapterId:"08",version:"2.0.0-preview.1",
 title:"Luokkatilanteen alkuperäisteksti",
 objective:"Luen C08:n 26 tekstiyksikön alkuperäisen Schule-kohtauksen kokonaan ja tulkitsen tilanteen sekä kolme oikeaa ymmärtämistehtävää.",
 estimatedMinutes:30,
 requiredQuestionIds:["recall","guided","independent","application","exit"],
 requiredActivityIds:["read-whole-text"],
 requiredPracticeIds:[],
 requiredCheckedIds:["C08-SCHOOL-Q01","C08-SCHOOL-Q02","C08-SCHOOL-Q03"],
 scenes:[
  intro("welcome","Luetaan oikea, kokonainen luokkakohtaus",[
    "C08:n Text A on Wikibooksin German/Level I/Schule, versio oldid 4520956, M-WB-08, CC BY-SA 4.0. Sen kaikki 26 tekstiyksikköä on jo kirjoitettu oppikirjan lukijaan.",
    "Kohdassa on oppilaiden puhetta, opettaja, neljä taululaskua, välitunti ja myöhempi kouluhetki. Lähteessä on paljon A1-tason ylittävää kielioppia; tehtävänä on poimia merkitys, ei opetella kaikkia rakenteita ulkoa.",
    "Tämä lähde on nykykoodin dokumentoitu tekstikorvaus aiemmin suunnitellulle vielä yksilöimättömälle COERLL Im Unterricht -haastattelulle. Se ei ole sama aineisto. Julkaisun riippumaton kieli- ja laitehyväksyntä on avoin; äänitettyä alkuperäiskohtausta ei tässä ole."
  ]),
  dialogue("recall","Aktivointi","Miten toimia vaikean tekstin äärellä?","Lähdeteksti alkaa vieraalla lauseella, etkä ymmärrä kaikkia sanoja.",
    "Mikä on järkevin ensimmäinen lukustrategia?",
    ["Lopetan, koska en ymmärrä heti.","Etsin tutut sanat, henkilöt ja tapahtumat.","Yritän taivuttaa jokaisen vieraan verbin ulkoa."],"b",
    ["Lukijan sanaselitykset ja lausekäännökset ovat käytettävissä. Voit selvittää ydintiedot.","","Tämä ei ole kielioppikoe eikä vielä monimutkaisten verbien taivutusharjoitus."],
    "Oikein. Henkilöt, Mathe ja Guten Morgen auttavat ymmärtämään kokonaisuuden.",
    "Lue ensin sen perusteella, mitä jo ymmärrät.",
    "Autenttisessa tekstissä on vieraita muotoja. Etsi ensin kuka puhuu, missä ollaan ja mitä tapahtuu. Sitten voit avata selityksiä.",
    "practice","L1-READ-01"),
  explain("reading-map","Mistä tapahtumaketju koostuu?",[
    "Alku u01–u05: Silke kertoo, että seuraavaksi on matematiikkaa. Torsten ei innostu, mutta on tehnyt tehtävät bussissa. Silke pyytää saada kopioida ne.",
    "u06–u10: opettaja saapuu, sanoo Guten Morgen!, luokka vastaa samoin. Opettaja pyytää Floriania taululle laskemaan.",
    "u11–u15: Florian lukee neljä laskua. Opettaja kehuu: Sehr gut, Florian! Tunnistamisessa riittää, että huomaat laskujen ja kiitoksen yhteyden.",
    "u16–u22: kello soi ja oppilaat siirtyvät musiikkiin. He keskustelevat laulamisesta. Älä opettele monimutkaista wollen- tai müssen-taivutusta tämän tehtävän vuoksi.",
    "u23–u26: musiikin jälkeen puhutaan historian tunnista ja lintsausehdotuksesta. Teema on koulupäivä, ei ohje tehdä kuten henkilöt.",
    "Kirjan suomennokset ovat erillisiä tukitekstejä. Älä sekoita niitä saksankieliseen muuttamattomaan alkuperäiseen kohtaukseen."
  ],[{title:"Miksi teksti on näin pitkä?",body:"Se on lähteen koko valittu 26 yksikön luokkakohtaus. Kaikkia sanoja ei testata; luetun ymmärtämisen tavoitteena on pääajatus ja tietyt avaintiedot."},
      {title:"Mikä on tekstin lähde ja oikeus?",body:"M-WB-08 on Wikibooks German/Level I/Schule, pysyvä versio oldid 4520956 ja tekstin lisenssimerkintä CC BY-SA 4.0. Kirjassa on tekijä- ja lisenssilinkit. Uutta audiota ei ole hyväksytty."}]),
  model("map-board","Lähdetekstin tapahtumat järjestyksessä",[
    "Opettajan taulu näyttää alkuperäistekstin lyhyet ydinkohdat. Tämä EI korvaa kaikkien 26 yksikön lukemista kirjasta."
  ],[
    ["u01 · Aloitus","Jetzt haben wir Mathe.","Nyt on matematiikkaa."],
    ["u07–u08 · Aamutervehdys","Guten Morgen!","Opettaja ja oppilaat tervehtivät toisiaan."],
    ["u11–u14 · Taulutyö","5 plus 8 ist gleich 13","Florian tekee laskuja taululla."],
    ["u15 · Palaute","Sehr gut, Florian!","Opettaja kehuu Florianin laskemista."],
    ["u17 · Seuraava tunti","Schnell, wir müssen zu Musik!","Silke kertoo, että pitää mennä musiikkiin."],
    ["u24 · Myöhemmin","Jetzt haben wir nur noch Geschichte...","Koulupäivä jatkuu historialla."]
  ]),
  book("whole-text","Lue kaikki 26 yksikköä nyt",[
    "Avaa Text A, lähteenä M-WB-08. Lue ensimmäisellä kierroksella u01–u10, toisella u11–u18 ja kolmannella u19–u26. Näin yhtäkään puheenvuoroa tai kertojaa ei ohiteta.",
    "Katso puhujanimet ja merkitykset. Jos jokin lause ei aukea, käytä lukijan sanaselitystä. Tässä ei vaadita kuuntelua, koska Text A:n alkuperäisääntä ei ole hyväksytty."
  ],[["C08 · Koko Text A","text","Lue kaikki u01–u26, myös kertojan rivit."]]),
  activity("read-whole-text","Vahvista vasta kokonaisen tekstin jälkeen",[
    "Tarkista, että luit myös neljä Florianin laskua ja musiikkitunnin jälkeiset rivit. Palaa tarvittaessa oppikirjaan.",
    "Vahvistus kertoo vain, että luit tekstin; se ei väitä saksan puheen kuullunymmärtämistä."
  ],"Luin alkuperäistekstin kaikki 26 yksikköä"),
  dialogue("guided","Ohjattu ymmärtäminen","Aloituksen oppiaine","Silke: Jetzt haben wir Mathe. Opettaja auttaa: Mathe on matematiikka.",
    "Mikä oppiaine mainitaan alussa?",
    ["Historia","Matematiikka","Musiikki"],"b",
    ["Historia mainitaan vasta koulupäivän myöhemmässä osassa.","","Musiikkiin siirrytään kellon soitua, ei alussa."],
    "Oikein. Mathe tarkoittaa matematiikkaa. Etsi kirjan Q01 ja tarkista se erikseen.",
    "Aloitus u01 sisältää sanan Mathe.",
    "Tekstin u01 kertoo matematiikasta. Älä sekoita myöhempää Musik-sanaa alkuun.",
    "practice","L1-READ-01"),
  book("questions","Tarkista kolme alkuperäistä ymmärtämistehtävää",[
    "Vastaa oikeisiin C08-SCHOOL-Q01-, Q02- ja Q03-tehtäviin kirjan Ymmärrä-osiossa. Tarkista kukin painikkeella Tarkista vastaus. Pelkkä vastaus ilman tarkistusta ei riitä.",
    "Q01 koskee matematiikkaa, Q02 Guten Morgen -tervehdystä ja Q03 musiikkituntia. Käytä alkuperäisen tekstin kohtia perusteluna. Näiden kirjatallennus on tunnin vaatima näyttö, ei oma rinnakkainen tehtäväkopio."
  ],[["C08 · Kolme tarkistettua ymmärtämistehtävää","understand","Vastaa ja tarkista C08-SCHOOL-Q01, Q02 ja Q03."]]),
  dialogue("independent","Itsenäinen ymmärtäminen","Tunnista puhujien tehtävä","Luit koko kohtauksen. Muista tilanne, jossa Florian menee taululle.",
    "Mitä Florian tekee ennen kuin opettaja sanoo Sehr gut?",
    ["Laskee neljä laskua taululla","Esittelee itsensä","Pyytää hitaampaa puhetta"],"a",
    ["","Florianin nimi ei kuulu esittäytymisdialogiin tässä kohdassa.","Tämä on LOSin harjoitusfraasi, ei Florianin lähderepliikki."],
    "Oikein. Laskut ovat u11–u14, ja kehu on u15.",
    "Mitä lukusanat, plus ja minus viestivät?",
    "Florian laskee taululla. Sehr gut! on onnistumisesta annettu myönteinen palaute.",
    "independent","L1-READ-01"),
  dialogue("application","Soveltaminen","Milloin käytät opittua fraasia?","Olet itse uudessa luokassa. Opettaja sanoo monta sanaa, mutta tärkein toimintaohje jäi kokonaan kuulematta.",
    "Mitä sanot niin, että saat uudelleen saman ohjeen?",
    ["Sehr gut, Florian!","Noch einmal, bitte.","Wir müssen zu Musik!"],"b",
    ["Opettajan kehuminen ei auta sinua kuulemaan ohjetta.","","Tämä on lähdetekstin puhe musiikkiin siirtymisestä, ei toistopyyntö."],
    "Opettaja: Ja, natürlich. Ich wiederhole das. Opit soveltamaan omaa selviytymisfraasia tekstin kaltaiseen tilanteeseen.",
    "Palaa L041:n käyttövalmiiseen toistopyyntöön.",
    "Noch einmal, bitte. pyytää toistamaan. Autenttisen kohtauksen vaikeaa kielioppia ei tarvitse käyttää.",
    "application"),
  dialogue("exit","Lopputarkistus","Kuka tervehtii ketä?","Muista lähteen u07–u08 ja pohdi, miksi sama ilmaus esiintyy peräkkäin.",
    "Mikä on oikea tulkinta?",
    ["Opettaja ja luokka tervehtivät aamulla toisiaan.","Luokka hyvästelee opettajan nukkumaan mennessään.","Oppilaat kysyvät toisiltaan nimeä."],"a",
    ["","Gute Nacht! olisi hyvän yön toivotus. Lähteessä on Guten Morgen!.","Kumpikaan ei kysy nimeä: sanotaan Guten Morgen!."],
    "Oikein. Guten Morgen! on molempien osapuolten aamutervehdys.",
    "Muista sana Morgen.",
    "Tekstissä opettaja sanoo Guten Morgen! ja koko luokka vastaa samalla tervehdyksellä.",
    "exit","L1-READ-01"),
  summary([
    "Luit lähteen koko 26-yksikköisen kohtauksen. Kolme kirjan ymmärtämistehtävää on tarkistettava erikseen ennen tunnin läpikäyntiä.",
    "Tämän tunnin alkuperäisteksti ei ole opettajan keksimä harjoitusdialogi. Sen vaikeat muodot ovat tunnistamista, eivät A1-tason tuottamisvaatimuksia. L043:ssa opit korjaamaan ymmärtämisvaikeuden itse saksaksi."
  ])
 ]
};

export const LOS1_L043_TEACHER:TeacherLesson = {
 id:"L043",bookId:1,chapterId:"08",version:"2.0.0-preview.1",
 title:"Kuuntelustrategiat ja selityspyynnöt",
 objective:"Pyydän hitaampaa puhetta, toistoa ja sanan selitystä vaiheittaisessa keskustelussa, myös silloin kun toinen vastaa lisäselityksellä.",
 estimatedMinutes:30,
 requiredQuestionIds:["recall","guided","speed","repeat","meaning","independent","application","exit"],
 requiredActivityIds:["replay-dialogue"],
 requiredPracticeIds:["C08-EX-06","C08-EX-07","C08-EX-11","C08-EX-12"],
 scenes:[
  intro("welcome","Et tarvitse jokaista sanaa ymmärtääksesi",[
    "Tällä tunnilla harjoittelet tilannetta, jossa puhuttu saksa tuntuu liian nopealta tai tuntemattomalta. Pelkkä passiivinen kuunteleminen ei ratkaise sitä: voit vaikuttaa keskusteluun.",
    "Strategia on kolmivaiheinen: 1) pysäytä väärinymmärrys (Ich verstehe nicht.), 2) pyydä oikea korjaus (Bitte langsamer / Noch einmal, bitte / Was bedeutet das?), 3) kuuntele tai lue uusi selitys ja vahvista, että ymmärsit (Danke!).",
    "Tässä ei ole todistettua C08-ääntä eikä puheentunnistusta. Mallikeskustelut ovat LOSin omia ennalta kirjoitettuja opetusdialogeja, eivät autenttisen Text A:n tai Text B:n litteraatteja."
  ]),
  dialogue("recall","Aktivointi","Mikä pyyntö palauttaa saman ohjeen?","Opettaja: Die Aufgabe drei. Et kuullut ohjetta kunnolla.",
    "Minkä fraasin sanot?",
    ["Noch einmal, bitte.","Wie geht's?","Guten Morgen!"],"a",
    ["","Opettaja: Mir geht's gut. Kuulumiset eivät palauta ohjetta.","Opettaja: Guten Morgen! Tervehdys ei pyydä uutta ohjetta."],
    "Opettaja: Ich sage es noch einmal. Sait saman ohjeen uudelleen.",
    "Mikä tarkoittaa vielä kerran?",
    "Noch einmal, bitte. sopii silloin, kun haluat saman tiedon toistettuna."),
  explain("three-steps","Selviytymisstrategia ei ole vain sanalista",[
    "Kun et ymmärrä, viesti ensin Ich verstehe nicht. Vastapuoli tietää, että tarvitsemaasi tietoa puuttuu.",
    "Valitse tarkennus: Bitte langsamer. hidastaa puheen tahtia; Können Sie das bitte wiederholen? pyytää kohteliaasti toistoa; Was bedeutet das? pyytää sanan tai ilmauksen merkitystä.",
    "Jos toinen sanoo Das bedeutet ... ja antaa selityksen, voit vahvistaa Danke! tai kysyä vielä kerran. Uusi selityskään ei aina ratkea yhdellä yrittämällä.",
    "Können Sie ...? on tässä valmis kohtelias kaava. Emme opeta können-verbin kokonaista taivutusjärjestelmää."
  ],[{title:"Miten erotan hitaammin ja uudestaan?",body:"Bitte langsamer. pyytää vaihtamaan puhenopeutta. Noch einmal, bitte. pyytää sanomaan saman asian uudelleen. Voit käyttää myös molemmat."},
      {title:"Mitä tarkoittaa bedeutet?",body:"Was bedeutet das? on käyttövalmis kysymys Mitä se tarkoittaa? Vastaukseen voi tulla Das bedeutet ... eli Se tarkoittaa ..."}]),
  model("strategy-board","Mallikeskustelu etenee vuoro kerrallaan",[
    "Ensin oppija sanoo, ettei ymmärrä. Seuraavaksi hän kohdistaa pyynnön ongelmaan. Lopussa keskustelukumppani selittää, mitä sana tarkoittaa."
  ],[
    ["1 · Opettaja","Bearbeitet bitte Aufgabe fünf.","Tehkää tehtävä viisi."],
    ["2 · Oppija","Ich verstehe nicht.","En ymmärrä."],
    ["3 · Oppija","Können Sie das bitte wiederholen?","Voisitteko toistaa sen?"],
    ["4 · Opettaja","Ja, Aufgabe fünf.","Kyllä, tehtävä viisi."],
    ["5 · Oppija","Was bedeutet Aufgabe?","Mitä Aufgabe tarkoittaa? Fraasin Was bedeutet ...? sovellus."],
    ["6 · Opettaja","Aufgabe heißt Übung.","Opettaja selittää sanan toisella saksankielisellä sanalla. Suomeksi: tehtävä."],
    ["7 · Oppija","Danke!","Kiitos, keskustelu jatkuu."]
  ]),
  dialogue("guided","Ohjattu harjoitus 1/4","Pyydä hidastamaan","Opettaja puhuu saksaa nopeasti. Tunnistat sanoja, kun ne sanotaan hitaammin.",
    "Mikä on oikea pyyntö?",
    ["Bitte langsamer.","Was bedeutet das?","Bis morgen!"],"a",
    ["","Opettaja: Was genau? Yksi sanaselitys ei korjaa koko puheen tahtia.","Opettaja: Bis morgen! Nyt keskustelu päättyisi."],
    "Opettaja: Ja, ich spreche langsamer. Hän hidastaa puhetta.",
    "Käännä tilanne, älä yksittäistä sanaa: ongelma on tempo.",
    "Bitte langsamer. tarkoittaa Hitaammin, kiitos."),
  dialogue("speed","Käsikirjoitettu haarautuminen","Opettaja on edelleen liian nopea","Opettaja yrittää uudelleen, mutta sanat tulevat edelleen nopeasti.",
    "Miten tarkennat tarvitsevasi hitaampaa puhetta?",
    ["Sehr gut!","Bitte langsamer.","Ich heiße Tom."],"b",
    ["Opettaja: Gut? Kehuminen voi antaa väärän kuvan ymmärtämisestä.","","Opettaja: Hallo, Tom. Nimi ei ratkaise nopeutta."],
    "Opettaja: Entschuldigung. Ich spreche langsam. (Anteeksi, puhun hitaasti.) Keskustelu korjautuu.",
    "Sano sama hidastamispyyntö uudelleen, se on sallittua.",
    "Voit rauhallisesti toistaa Bitte langsamer. Tämä on tilanteesta selviytymistä, ei virhe."),
  dialogue("repeat","Ohjattu harjoitus 2/4","Ohje täytyy toistaa","Keskustelukumppani: Nehmen Sie das Buch. Kuulet vain osan lauseesta ja tarvitset saman ohjeen uudelleen.",
    "Mikä kohtelias täysi pyyntö toimii?",
    ["Wie heißt du?","Können Sie das bitte wiederholen?","Gute Nacht!"],"b",
    ["Kumppani: Ich heiße Paul. Nimi ei ole nyt kysymys.","","Kumppani: Gute Nacht! Et pyytänyt ohjetta uudelleen."],
    "Kumppani: Natürlich. Nehmen Sie das Buch. Saat koko ohjeen uudelleen.",
    "Können Sie ... wiederholen? on toistamiseen liittyvä kokonainen fraasi.",
    "Können Sie das bitte wiederholen? on kohtelias. Lyhyempi Noch einmal, bitte. on myös hyvä."),
  dialogue("meaning","Ohjattu harjoitus 3/4","Mitä sana tarkoittaa?","Opettaja toistaa selvästi sanan Aufgabe, mutta et tunne sitä.",
    "Mitä voit kysyä juuri sen merkityksestä?",
    ["Was bedeutet Aufgabe?","Bitte langsamer.","Woher kommst du?"],"a",
    ["","Opettaja: Langsamer? Sama vieras sana ei muutu tutuksi vain hitaammalla puheella.","Opettaja: Ich komme aus Berlin. Saat kotipaikkatiedon, et selitystä."],
    "Opettaja: Aufgabe heißt Übung. (Suomeksi: tehtävä.) Saat sanalle yksinkertaisen selityksen.",
    "Was bedeutet + sana + ? kysyy sanan merkitystä.",
    "Was bedeutet das? toimii osoittaessasi sanaa. Was bedeutet Aufgabe? toimii nimetessäsi sanan."),
  explain("acknowledge","Näin kerrot ymmärtäneesi ja kiität",[
    "Kun saat toiston tai sanan merkityksen ja asia selviää, voit sanoa Danke! = Kiitos. Jos haluat samalla kertoa ymmärtäneesi, käytä valmista ilmausta Danke, jetzt verstehe ich. = Kiitos, nyt ymmärrän.",
    "Jetzt tarkoittaa nyt. Verstehe ich on ilmauksen loppuosa; sinun ei tarvitse johtaa sanajärjestystä uutena kielioppisääntönä. Opettele koko vastaus ensin tilanteeseen sopivana fraasina.",
    "Erota kolme tilannetta: Noch einmal, bitte. pyytää toistoa; Was bedeutet das? pyytää merkitystä; Danke, jetzt verstehe ich. vahvistaa, että selitys auttoi.",
    "Kuvitteellinen malli: Opettaja: Aufgabe heißt Übung. Oppilas: Danke, jetzt verstehe ich. Tämä on LOS!:n opetustilanne eikä alkuperäisen lähdetekstin repliikki."
  ]),
  dialogue("independent","Itsenäinen valinta 4/4","Lisäselitys auttaa eteenpäin","Kumppani selittää suomeksi: Aufgabe tarkoittaa tehtävää. Ymmärsit nyt sanan ja haluat vahvistaa kohteliaasti, että selitys auttoi.",
    "Mikä repliikki sopii?",
    ["Danke, jetzt verstehe ich.","Noch einmal, bitte.","Gute Nacht!"],"a",
    ["","Kumppani: Noch einmal? Voit tietysti pyytää toistoa, mutta tässä kerroit jo ymmärtäväsi.","Kumppani: Gute Nacht? Se päättää kohtaamisen."],
    "Kumppani: Gern! (Eipä kestä.) Sinä: Danke, jetzt verstehe ich. Keskustelu päättyy ymmärrykseen.",
    "Valitse kiitos ja ymmärtämisen vahvistus.",
    "Danke, jetzt verstehe ich. on hyödyllinen valmis lisäfraasi: Kiitos, nyt ymmärrän.",
    "independent"),
  book("book-practice","Neljä oikeaa harjoitusta ja lähdetuki",[
    "Avaa kirjan C08:n Kielitaito/Harjoittele ja Sanasto. Tee C08-EX-06, C08-EX-07, C08-EX-11 ja C08-EX-12.",
    "Kirjan tehtäväpankki kysyy muun muassa Wort / Satz sekä fraasien täydentämistä. Nämä tukevat sanojen tunnistamista, mutta itsenäiset tilanteenvalintakysymykset ovat tässä oppitunnissa.",
    "Alkuperäisen Eva-haastattelun videota ei ole integroitu: tämän harjoituksen suorittamista ei lasketa kuuntelutaitotestiksi."
  ],[["C08 · Kieliopin fraasistrategia","grammar","Lue kohteliaan pyynnön käyttö ilman modaaliverbitaulukkoa."],
     ["C08 · Harjoittele","practice","Vastaa C08-EX-06, 07, 11 ja 12."]]),
  activity("replay-dialogue","Harjoittele kokonainen kolmen vaiheen keskustelu",[
    "Sano tai lue ääneen: Ich verstehe nicht. / Noch einmal, bitte. / Danke, jetzt verstehe ich. Lisää välissä kumppanin kuvitteellinen toisto.",
    "Kokeile samaa vaihtaen toistopyyntö hidastamis- tai selityspyynnöksi. Vahvista vasta oman yrityksen jälkeen. Ääntä ei tallenneta eikä arvioida automaattisesti."
  ],"Kokeilin kolme erilaista tilanteeseen sopivaa avunpyyntöä"),
  dialogue("application","Soveltaminen","Uusi tilanne koulun ulkopuolella","Museon työntekijä selittää karttaa, mutta käyttää sanaa Ausgang. Kuulet sen hyvin etkä tunne merkitystä.",
    "Mitä kysyt saadaksesi juuri tämän tiedon?",
    ["Bitte langsamer.","Was bedeutet Ausgang?","Noch einmal, bitte."],"b",
    ["Työntekijä: Langsamer? Vieras sana jäisi silti selittämättä.","","Työntekijä toistaa Ausgang, mutta sen merkitys jää puuttumaan."],
    "Työntekijä: Ausgang ist der Weg nach draußen. (Suomeksi: uloskäynti.) Saat selityksen ja voit jatkaa.",
    "Kysy sanan merkitystä nimeämällä se.",
    "Was bedeutet Ausgang? kysyy sanan tarkoitusta. Et tarvitse täydellistä lausetta uloskäynnin löytämiseen.",
    "application"),
  dialogue("exit","Lopputarkistus","Keskustelu jatkuu selityksellä","Opettaja sanoo liian nopeasti jotain, minkä sanavalinnat ovat sinulle tuttuja.",
    "Mikä on ensisijainen korjauspyyntö?",
    ["Was bedeutet das?","Bitte langsamer.","Ich verstehe das Wort nicht."],"b",
    ["Opettaja: Welches Wort? Nyt kysyit merkitystä, vaikka ongelma oli puhenopeus.","","Opettaja: Welches Wort? Yksittäinen sana ei ollut ongelma."],
    "Opettaja: Ja, langsam. Pyyntösi korjasi puhenopeuden ja saat mahdollisuuden ymmärtää.",
    "Vertaa nopeutta ja tuntematonta sanaa.",
    "Bitte langsamer. korjaa puhenopeuden. Jos et vieläkään ymmärrä sanaa, voit sen jälkeen kysyä Was bedeutet das?.",
    "exit"),
  summary([
    "Harjoittelit kuuntelustrategiaa, jossa ongelma ilmaistaan, täsmällinen avunpyyntö tehdään ja toinen vastaa lisäselityksellä.",
    "Tässä ei tehty todelliseen C08-äänitteeseen perustuvaa kuullunymmärtämiskoetta. L044:ssa sovellat samaa selviytymistaitoa Text B:n luetunymmärtämiseen ja uusiin vuorovaikutustilanteisiin."
  ])
 ]
};

export const LOS1_L044_TEACHER:TeacherLesson = {
 id:"L044",bookId:1,chapterId:"08",version:"2.0.0-preview.1",
 title:"Harjoittele vuorovaikutusta",
 objective:"Luen C08:n koko Eva-haastattelun Text B:n, tarkistan sen tehtävät ja valitsen sopivan avunpyynnön kahdessa uudessa vuorovaikutustilanteessa.",
 estimatedMinutes:30,
 requiredQuestionIds:["recall","guided","independent","application","exit"],
 requiredActivityIds:["read-eva-text"],
 requiredPracticeIds:["C08-EX-07","C08-EX-08"],
 requiredCheckedIds:["C08-TEXTB-Q01","C08-TEXTB-Q02","C08-TEXTB-Q03","C08-TEXTB-Q04"],
 scenes:[
  intro("welcome","Mitä tehdä, kun ihminen kertoo jotain monimutkaista?",[
    "C08:n Text B on COERLL/University of Texas at Austinin Eva Kunkelin Studium & Wohnen -haastattelu, M-DIB-03. Koko kahdeksan puheenvuoron saksankielinen litteraatti on jo kirjassa, CC BY 4.0 -lähdemerkinnällä.",
    "Eva puhuu opiskelusta ja asumisesta. Teksti sisältää alkeita vaikeampia ilmauksia. Sinun ei tarvitse osata käyttää niitä itse; harjoittelet tunnistamista ja osaat pyytää apua vastaavassa tilanteessa.",
    "Videon ja alkuperäisen äänen yksilöllinen käyttöoikeus tai toisto ei ole hyväksytty. Tämä on tekstin lukemista ja vuorovaikutusharjoittelua, ei varmennettu kuuntelutunti."
  ]),
  dialogue("recall","Aktivointi","Miten kysyä merkitystä?","Eva käyttää sanaa Erdkunde. Se kuuluu selvästi mutta on uusi.",
    "Mitä kysyt?",
    ["Noch einmal, bitte.","Was bedeutet Erdkunde?","Bis morgen!"],"b",
    ["Eva toistaa Erdkunde. Saat saman sanan, et merkitystä.","","Eva: Bis morgen! Keskustelu päättyisi ennen selitystä."],
    "Eva: Erdkunde ist Geographie. (Suomeksi: maantieto.) Saat sanan merkityksen myös alkuperäisessä Text B:ssä.",
    "Kysy vieraan sanan merkitystä.",
    "Was bedeutet Erdkunde? on tilanteeseen sopiva kysymys."),
  explain("text-b-map","Text B:n kahdeksan puheenvuoron sisältö",[
    "u01–u02: haastattelija kysyy Was studierst du? Eva vastaa opiskelevansa Englisch und Erdkunde, englantia ja maantietoa, opettajaksi.",
    "u03–u04: haastattelija pyytää selittämään, mitä Erdkunde on: Kannst du erklären, was Erdkunde ist? Eva antaa pidemmän selityksen. Tämä on aito esimerkki siitä, että keskustelukumppani voi pyytää ja antaa lisäselityksen.",
    "u05–u06: haastattelija kysyy asuinpaikkaa. Eva sanoo asuvansa vanhempiensa luona Zell am Mainissa, Würzburgin lähellä.",
    "u07–u08: Eva selittää, miksi hän asuu siellä: oman asunnon maksaminen olisi vaikeaa, ja hän osallistuu aktiivisesti urheiluseuran ja yhteisön toimintaan.",
    "Saat käyttää kirjan yksittäisten lauseiden suomennoksia, mutta aloita tuttuja sanoja etsimällä. Älä sekoita lähteen kahdeksaa aitoa repliikkiä tämän oppitunnin itse kirjoitettuihin esimerkkidialogeihin."
  ]),
  model("eva-board","Miten selityspyyntö toimii jo alkuperäisessä haastattelussa?",[
    "Katso kaksi suoraan alkuperäiseen Text B:hen perustuvaa lyhyttä kohtaa ja erottele sen jälkeen LOSin omat selviytymisfraasit."
  ],[
    ["Haastattelija · u03","Kannst du erklären, was Erdkunde ist?","Voitko selittää, mitä Erdkunde on?"],
    ["Eva · u04, aloitus","Erdkunde ist Geographie, Länderkunde","Eva alkaa selittää maantietoa."],
    ["LOSin oma harjoitus","Was bedeutet Erdkunde?","Opiskelijan yksinkertaisempi pyyntö merkityksestä."],
    ["LOSin oma jatkovastaus","Danke, jetzt verstehe ich.","Kiitos, nyt ymmärrän."]
  ]),
  book("text-b","Koko Text B ja sen neljä omaa tehtävää",[
    "Avaa Text B ja lue kaikki Evan kahdeksan puheenvuoroa, u01–u08. Vastaa ja tarkista C08-TEXTB-Q01...04. Kysymykset mittaavat luetun sisällön poimimista.",
    "Tarkista, mitä Eva opiskelee, mihin ammattiin hän tähtää, missä hän asuu ja miksi. Oikeat vastaukset tallentuvat samoihin kirjan C08:n tehtävätiloihin. Pidä erillään mahdollinen audio, jota ei ole vahvistettu."
  ],[["C08 · Koko Text B","text-b","Lue Evan koko haastattelu ja tarkista kaikki neljä kysymystä."]]),
  activity("read-eva-text","Tarkista että luit myös pitkät vastaukset",[
    "Varmista, että luit u04:n Erdkunde-selityksen sekä u08:n asumisesta kertovan vastauksen. Ne ovat pitkiä, mutta niistä tarvitsee tunnistaa vain pääajatus.",
    "Tämä on oma lukemisvahvistus, ei väite että olisit kuunnellut Evan puheääntä."
  ],"Luin Evan kaikki kahdeksan puheenvuoroa"),
  dialogue("guided","Ohjattu harjoitus","Mitä haastattelija pyytää?", "Haastattelija: Kannst du erklären, was Erdkunde ist?",
    "Minkä asian hän haluaa Evan tekevän?",
    ["Toistavan oman nimensä","Selittävän, mitä maantieto on","Puhuvan hitaammin"],"b",
    ["Eva kertoisi nimensä, mutta kysymyksessä mainitaan Erdkunde.","","Pyyntö koskee sanan selittämistä, ei puhenopeutta."],
    "Oikein. Eva vastaa avaamalla maantiedon merkitystä.",
    "Selittämiseen liittyy erklären.",
    "Kannst du erklären ... pyytää selitystä. Tunnista rakenne, älä opettele koko kannst-taivutusta.",
    "practice","L1-READ-01"),
  dialogue("independent","Soveltava vuorovaikutus 1/2","Et ymmärrä vastapuolen puhetta","Kuvitteellinen opiskelija antaa sinulle kokonaisen ohjeen. Et ymmärrä sitä lainkaan ja haluat kertoa tästä ennen uutta kysymystä.",
    "Mitä sanot ensimmäiseksi?",
    ["Ich verstehe nicht.","Sehr gut!","Wie alt bist du?"],"a",
    ["","Opiskelija: Wirklich gut? Hän voi luulla, että asia on selvää.","Opiskelija: Ich bin siebzehn. Saat iän, et ohjeen."],
    "Opiskelija: Kein Problem. Soll ich es erklären? (Ei haittaa. Selitänkö?) Nyt keskustelu voi jatkua.",
    "Kerro ensin rehellisesti ymmärtämisen ongelmasta.",
    "Ich verstehe nicht. avaa mahdollisuuden toistoon tai selittämiseen.",
    "independent"),
  explain("partner-response","Toisen lisäselitys voi auttaa enemmän kuin sama lause",[
    "Jos toinen kysyy Soll ich es erklären?, hän tarjoaa lisäselitystä. Voit vastata Ja, bitte. Silloin keskustelukumppani ei vain toista vanhaa lausetta vaan auttaa uudella tavalla.",
    "Jos et ymmärrä selitystäkään, voit sanoa uudelleen Ich verstehe nicht. tai Noch einmal, bitte. Avunpyyntöjä saa ketjuttaa: ensiksi ymmärtämisen ongelma, sen jälkeen täsmällisempi pyyntö.",
    "Käytännön onnistuminen on sitä, että saat ohjeen tai merkityksen selville. Täydellinen kielioppi ei ole tämän kappaleen ensimmäinen tavoite."
  ]),
  dialogue("application","Soveltava vuorovaikutus 2/2","Puhuja antaa lisäselityksen","Museossa kuulet sanan Eintritt, et tiedä mitä se tarkoittaa. Kumppani tarjoutuu selittämään.",
    "Mikä aloittaa oikean selityspyynnön?",
    ["Bitte langsamer.","Was bedeutet Eintritt?","Ich heiße Eva."],"b",
    ["Kumppani: Langsamer? Sana on silti vieras.","","Kumppani: Hallo Eva! Tämä ei kerro epäselvästä sanasta."],
    "Kumppani: Eintritt heißt, dass du hineingehen darfst. (Suomeksi: sisäänpääsy.) Sinä: Danke, jetzt verstehe ich. Koko keskustelu sai ratkaisun.",
    "Mitä kysyt, kun haluat tietää sanan tarkoituksen?",
    "Was bedeutet Eintritt? pyytää merkitystä. Kumppani voi vastata selittämällä, ei vain toistamalla.",
    "application"),
  book("apply-book","Kaksi kirjan tehtävää ja oma dialogi",[
    "Tee C08-EX-07 ja C08-EX-08 Harjoittele-osiossa. Avaa myös Käytä saksaa ja kirjoita yksi lyhyt kolmen vuoron harjoitus: ongelma, toisen selitys, oma kuittaus.",
    "Kirjan sovellus on vapaata kirjoittamista ja itsearviointia. Sitä ei pisteytetä koneella, eikä opetuspolku luo itsenäistä varjokopiota C08:n vastauksista."
  ],[["C08 · Harjoittele","practice","Tee C08-EX-07 ja C08-EX-08."],
     ["C08 · Käytä saksaa","apply","Kirjoita oma lyhyt auttamisdialogi."]]),
  reflection("own-dialogue","Kirjoita kaksi mahdollista keskustelupolkua",[
    "Kirjoita itse kaksi 2–3 repliikin pientä dialogia (yhteensä vähintään 80 merkkiä). Ensimmäisessä et ymmärrä ohjetta ja pyydät toistoa. Toisessa kysyt sanan merkitystä ja saat kumppanilta selityksen.",
    "Säilytä selvä ero puhujien välillä. Voit käyttää LOSin valmiita mallifraaseja. Tämä teksti tallentuu tunnin omaan luonnokseen, ei automaattiseksi saksan arvosanaksi."
  ],"Kirjoita kaksi erilaista dialogia: puhuja A/B, pyyntö, lisäselitys ja kiitos.",80),
  dialogue("exit","Lopputarkistus","Mitä tehdä selityksen jälkeen?","Keskustelukumppani kertoo nyt sanan merkityksen niin, että ymmärrät.",
    "Mikä repliikki vahvistaa asian ymmärtämisen?",
    ["Noch einmal, bitte.","Danke, jetzt verstehe ich.","Was bedeutet das?"],"b",
    ["Haluat toki tarvittaessa toiston, mutta nyt jo ymmärsit selityksen.","","Tämä kysyy merkityksen uudelleen, vaikka se on jo selitetty."],
    "Kumppani: Gern! Onnistuit saamaan lisäselityksen ja kiittämään.",
    "Etsi fraasi, joka kertoo nyt ymmärtäväsi.",
    "Danke, jetzt verstehe ich. tarkoittaa Kiitos, nyt ymmärrän.",
    "exit"),
  summary([
    "Luit autenttisen Evan haastattelun ja harjoittelit kahta erilaista tilannevalintaa. Neljä Text B:n oikeaa kysymystä pitää vastata ja tarkistaa kirjassa.",
    "Oman dialogin harjoittelu on itsearvioitavaa. L045:ssa yhdistät selviytymisfraasit koko C08:n kappaletestiin ilman automaattista puheentunnistusta."
  ])
 ]
};

export const LOS1_L045_TEACHER:TeacherLesson = {
 id:"L045",bookId:1,chapterId:"08",version:"2.0.0-preview.1",
 title:"Harjoittele ja testaa C08",
 objective:"Selviän saksaksi ymmärtämisvaikeudesta, teen olemassa olevan 12-osaisen kappaletestin ja kirjoitan itsenäisen itsearvioinnin.",
 estimatedMinutes:30,
 requiredQuestionIds:["recall","guided","independent","application","exit"],
 requiredActivityIds:["review-phrases"],
 requiredPracticeIds:[],
 chapterAssessment:{requiredTestIds:testIds,requireApplicationDraft:true,minSelfAssessmentLength:15},
 scenes:[
  intro("welcome","Osoita, että osaat jatkaa keskustelua",[
    "C08:n tavoite ei ole irrallinen sanastokoe vaan toimiminen myös silloin, kun saksa ei heti aukea. Aloitat muistamalla tärkeimmät avunpyynnöt ja soveltamalla niitä uuteen tilanteeseen.",
    "Lopuksi teet saman C08:n olemassa olevan 12 osatehtävän kappaletestin, joka on oppikirjassa. Opetuspolku ei laadi uusia koevastauksia eikä muuta kokeen pisteitä.",
    "Kirjoitat myös oman soveltavan tekstin ja itsearvioinnin kirjaan. Äänen toistoa, ääntämisen pistelaskua tai tarkistamattomia videoita ei vaadita."
  ]),
  dialogue("recall","Muistin aktivointi","Mitä sanot kun et ymmärrä?","Opettaja on juuri antanut vieraskielisen ohjeen, jonka merkitys jäi täysin epäselväksi.",
    "Mikä ilmaus tekee ongelman selväksi?",
    ["Ich verstehe nicht.","Ich komme aus Finnland.","Sehr gut!"],"a",
    ["","Opettaja: Finnland? Lähtömaasi ei ratkaise ohjetta.","Opettaja voi luulla, että ymmärsit."],
    "Opettaja: Kein Problem. Hän tietää nyt, että tarvitset tukea.",
    "Ilmoita ensin ymmärtämisen puutteesta.",
    "Ich verstehe nicht. on sopiva ensimmäinen repliikki."),
  explain("review","Neljä erilaista korjausstrategiaa",[
    "Ich verstehe nicht. ilmaisee, ettei ymmärrä. Noch einmal, bitte. pyytää toistamaan. Bitte langsamer. pyytää hitaampaa puhetta. Was bedeutet das? kysyy sanan tai ilmauksen merkitystä.",
    "Kohteliaalle opettajalle on myös käyttövalmis kokonaisfraasi Können Sie das bitte wiederholen? Se ei tarkoita, että opettelisit tässä koko können-verbin taivutuksen.",
    "Oikea toiminta alkaa tilanteen havainnoinnista: kuulitko, ymmärsitkö, tarvitseeko vaihtaa nopeutta vai selittää sana? Pyyntö voi muuttua keskustelun edetessä."
  ],[{title:"Mikä ero tehtävän tekemisellä ja kielitaidon hallinnalla on?",body:"Tässä tallennetaan oma suoritus ja kokeen tarkistetut vastaukset. Yksittäinen läpikäynti ei vielä osoita pysyvää puhe- tai kuuntelutaitoa."}]),
  model("review-board","Kertaustaulu: viisi keskustelun käännettä",[
    "Kertaa ennen testiä neljä tavallisinta ongelmaa ja yksi kohtelias täyspyyntö."
  ],[
    ["En ymmärrä","Ich verstehe nicht.","Kumppani tietää, että tarvitsen apua."],
    ["Tarvitsen toiston","Noch einmal, bitte.","Kumppani sanoo saman uudelleen."],
    ["Liian nopea puhe","Bitte langsamer.","Kumppani hidastaa tahtia."],
    ["Uusi sana","Was bedeutet das?","Kumppani selittää merkityksen."],
    ["Kohtelias toistopyyntö","Können Sie das bitte wiederholen?","Kokonainen valmis pyyntö opettajalle."]
  ]),
  dialogue("guided","Ohjattu kertaus","Sama pyyntö, eri syy","Kuulet koko lauseen tarkasti, mutta puhuja käyttää sinulle vierasta sanaa. Keskustelukumppani voi selittää sen.",
    "Minkä kysymyksen valitset?",
    ["Bitte langsamer.","Was bedeutet das?","Noch einmal, bitte."],"b",
    ["Hidastaminen ei muuta sanan merkitystä.","","Saman vieraan sanan toistaminen ei vielä selitä sitä."],
    "Kumppani selittää sanan. Voit sanoa Danke, jetzt verstehe ich.",
    "Kysy merkitystä.",
    "Was bedeutet das? on täsmällinen merkityksen kysymys."),
  activity("review-phrases","Palauta kaikki fraasit ilman mallia",[
    "Peitä opetustaulu ja yritä sanoa tai kirjoittaa muistista neljä tilannetta vastaavaa fraasia. Paljasta taulu vasta oman yrityksen jälkeen.",
    "Jos jokin jäi epävarmaksi, palauta L041:n tai L043:n mallikeskustelu. Vahvista vain todellisen kertausyrityksen jälkeen."
  ],"Kertaisin neljä avunpyyntöä muistista"),
  dialogue("independent","Itsenäinen kysymys","Kun ohje täytyy kuulla uudelleen","Lentokentällä henkilökunnan jäsen antaa sinulle lyhyen ohjeen. Et kuullut sen loppua.",
    "Mikä on sopivin repliikki?",
    ["Noch einmal, bitte.","Was bedeutet das?","Wie heißt du?"],"a",
    ["","Virkailija: Was genau? Merkityksen pyytäminen ei suoraan toista loppua.","Virkailija kertoo nimensä eikä toista ohjetta."],
    "Virkailija: Ja, ich wiederhole das. Sait ohjeen uudelleen.",
    "Ongelma on puuttuva osa, ei vieras sana.",
    "Noch einmal, bitte. sopii toistopyyntöön myös luokkahuoneen ulkopuolella.",
    "independent"),
  dialogue("application","Uuden tilanteen soveltaminen","Liian nopea selitys neuvojalla","Viranomainen puhuu selvästi mutta hyvin nopeasti. Tunnistaisit sanat hitaammasta puheesta.",
    "Mitä pyydät?",
    ["Ich heiße Mia.","Bitte langsamer.","Guten Tag!"],"b",
    ["Hän tietää nimesi, mutta ei hidasta puhetta.","","Tervehdys ei korjaa nopeutta."],
    "Neuvoja: Ja, ich spreche langsamer. Pystyit pyytämään tarvitsemiasi muutoksia.",
    "Pyyntö koskee puhenopeutta.",
    "Bitte langsamer. auttaa hitaampaan puheeseen. Voit pyytää myös toistoa, jos osa jäi kuulematta.",
    "application"),
  book("test","Palauta C08:n oikea kappaletesti ja oma teksti",[
    "Avaa C08:n Kappaletesti. Vastaa kaikkiin kahteentoista olemassa olevaan C08-EX-01...12-osatehtävään ja paina Palauta testi. Tarkistus käyttää vain kirjan varsinaista testitallennusta.",
    "Kirjoita myös Käytä saksaa -sivulle oma kolmen tilanteen dialogiharjoitus ja Kappaletesti-sivulle itsearviointi vähintään 15 merkkiä. Oma vapaa teksti ei saa automaattista kielioppiprosenttia.",
    "Vaaditut näytöt ovat: kaikki testivastaukset, todellinen palautusaika, oma sovellusluonnos ja itsearviointi. Jos jokin puuttuu, tuntia ei voi merkitä läpikäydyksi."
  ],[["C08 · Kappaletesti","test","Vastaa kaikkiin 12 tehtävään, palauta testi ja kirjoita itsearviointi."],
     ["C08 · Käytä saksaa","apply","Kirjoita kolme erilaista avunpyyntötilannetta."]]),
  dialogue("exit","Itsenäinen lopputarkistus","Lisäselitys auttaa","Opettaja on toistanut ohjeen, mutta et vieläkään tiedä, mitä sana Aufgabe tarkoittaa.",
    "Mitä kysyt nyt?",
    ["Bitte langsamer.","Was bedeutet Aufgabe?","Bis morgen!"],"b",
    ["Hitaammin lausuttu vieras sana ei aina riitä.","","Keskustelun päättäminen ei anna merkitystä."],
    "Opettaja: Aufgabe heißt Übung. (Suomeksi: tehtävä.) Sait tiedon, jota tarvitset tehtävän aloittamiseen.",
    "Kysy tietyn sanan merkitystä.",
    "Was bedeutet Aufgabe? tarkoittaa Mitä Aufgabe tarkoittaa? Voit myös osoittaa sanaa ja kysyä Was bedeutet das?.",
    "exit"),
  summary([
    "C08:n todellinen kappaletesti on sama 12-osatehtäväinen testi kuin oppikirjassa. Valinnat, palautus ja oma itsearviointi säilyvät samassa kirjan tilassa.",
    "Jos puheen nopeus, toisto tai sanan merkitys tuntui epävarmalta, kertaa erityisesti L041:n ja L043:n soveltavat dialogit. Tavoitteena on osata pyytää apua saksaksi, ei vain muistaa oikeaa vaihtoehtoa."
  ])
 ]
};

export const LOS1_C08_TEACHER_LESSONS:readonly TeacherLesson[]=[
 LOS1_L041_TEACHER,LOS1_L042_TEACHER,LOS1_L043_TEACHER,LOS1_L044_TEACHER,LOS1_L045_TEACHER
];
