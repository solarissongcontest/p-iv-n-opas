/** Original supplementary practice for the actual G01–G04 Alpha 0.8 grammar
 * chapters. Grounded in their SHA-256-verified source sections.
 * Not derived from an official matriculation examination or other textbook.
 * These items are separate from Teacher 2.0 mastery and never complete a lesson.
 */
export type GrammarSelfCheckItem = readonly [
  promptFi: string, choicesEn: readonly [string,string,string],
  correctIndex: 0|1|2, explanationFi: string
];
export const GRAMMAR_SELF_CHECK_VERSION="g01-g04-edition1" as const;
export const GRAMMAR_SELF_CHECKS:Readonly<Record<string,readonly [GrammarSelfCheckItem,GrammarSelfCheckItem]>>={
"G01.1":[
  ["Mikä on virkkeen ”The research team has published the results” finiittinen osa?",
   ["has","published","results"],0,
   "Has on verbiketjun finiittinen apuverbi, joka ilmaisee tässä preesensin. Published on pääverbin partisiippimuoto."],
  ["Mikä virke sisältää subjektin ja siihen sopivan finiittisen verbin?",
   ["The findings in the report are convincing.","The findings in the report convincing.","The findings in the report is convincing."],0,
   "Subjektin pääsana findings on monikollinen, joten finiittinen verbi on are; in the report on tarkenne."]
],
"G01.2":[
  ["Mikä on lauseen ”The editor checked the sources” objekti?",
   ["The editor","checked","the sources"],2,
   "The sources on tarkistamisen kohde eli objekti. The editor on subjekti, joka tekee toiminnan."],
  ["Missä virkkeessä ”reliable” toimii subjektin predikatiivina?",
   ["The results seem reliable.","The editor considered the results reliable.","Reliable results impressed the editor."],0,
   "Seem liittää reliable-ominaisuuden subjektin results kuvaukseksi. Considered-lauseessa reliable luonnehtii objektia."]
],
"G01.3":[
  ["Mikä on lauseen ”We postponed the trip because the roads were icy” syytä ilmaiseva sivulause?",
   ["We postponed the trip","because the roads were icy","the trip"],1,
   "Because aloittaa syytä ilmaisevan sivulauseen, jolla on oma subjekti (the roads) ja finiittinen verbi (were)."],
  ["Mikä on tavallinen epäsuoran kysymyksen sanajärjestys?",
   ["Do you know where she lives?","Do you know where does she live?","Do you know where lives she?"],0,
   "Epäsuorassa kysymyksessä where she lives säilyttää väitelauseen sanajärjestyksen. Do-apuverbi kuuluu päälauseen kysymykseen."]
],
"G01.4":[
  ["Mikä määrää verbin luvun ilmauksessa ”Each of the students ___ a copy”?",
   ["students","each","copy"],1,
   "Each on koko subjektin pääsana, vaikka students on lähempänä verbiä. Siksi verbin muodoksi tulee has."],
  ["Täydennä päälauseen verbillä: ”The details in the application ___ important.”",
   ["is","are","has"],1,
   "Subjektin pääsana details on monikollinen. In the application on tarkenne, jonka yksikkö ei muuta verbin muotoa."]
],
"G02.1":[
  ["Mikä on neutraali englannin SVO-sanajärjestys?",
   ["The journalist interviewed the scientist.","The scientist the journalist interviewed.","Interviewed the scientist the journalist."],0,
   "Tavallinen väitelause asettaa subjektin ennen verbiä ja suoran objektin verbin jälkeen."],
  ["Mikä lause on kokonainen, vaikka siinä ei ole objektia?",
   ["She laughed.","She the news.","Read the news."],0,
   "Laugh on tässä intransitiivinen verbi. She laughed sisältää subjektin ja finiittisen verbin ilman suoraa objektia."]
],
"G02.2":[
  ["Mikä on luonteva kaksinkertaisen objektin rakenne?",
   ["She sent her tutor a message.","She sent to her tutor a message.","She sent a message her tutor."],0,
   "Kaksinkertaisessa objektirakenteessa vastaanottaja (her tutor) tulee ennen siirtyvää asiaa (a message)."],
  ["Mikä muoto vastaa lausetta ”He gave his colleague a copy” muuttamatta vastaanottajaa?",
   ["He gave a copy to his colleague.","He gave a copy for his colleague.","He gave to a copy his colleague."],0,
   "Give sallii to-vastaanottajarakenteen: asia ensin, sitten to ja vastaanottaja."]
],
"G02.3":[
  ["Mikä prepositio ilmaisee viestin vastaanottajan tässä: ”She emailed the files ___ her tutor”?",
   ["for","to","of"],1,
   "Email the files to somebody ilmaisee, kenelle tiedostot lähetetään. For voi joissakin muissa tilanteissa ilmaista hyötyjän."],
  ["Mikä lause kertoo, että tein kahvia äitini hyväksi?",
   ["I made coffee for my mother.","I made coffee to my mother.","I made my mother to coffee."],0,
   "Make something for somebody ilmaisee tekemisen hyötyjän. To ei tässä mallissa ole neutraali valinta."]
],
"G02.4":[
  ["Mikä on tavallinen yleiskielinen rakenne explain-verbillä?",
   ["She explained me the task.","She explained the task to me.","She explained to me the task to."],1,
   "Explain saa tavallisesti asiasanan ennen to-preposition merkitsemää vastaanottajaa: explain something to somebody."],
  ["Mikä vaihtoehto välttää suggest-verbin virheellisen kaksinkertaisen objektirakenteen?",
   ["He suggested her a solution.","He suggested a solution to her.","He suggested to her a solution to."],1,
   "Suggest an idea to somebody on neutraali yleiskielinen rakenne; se ei yleensä toimi kuten give somebody something."]
],
"G02.5":[
  ["Mitä ”realistic” tekee lauseessa ”They considered the proposal realistic”?",
   ["It describes the object, the proposal.","It is the subject of the sentence.","It names the person receiving the proposal."],0,
   "Realistic on objektin predikatiivi, joka kertoo arvion proposal-objektista. Se ei ole toinen objekti."],
  ["Mikä ilmaisee selkeästi, että opettaja piti vastausta virheellisenä?",
   ["The teacher considered the answer incorrect.","The teacher considered incorrect the answer.","The teacher incorrect considered the answer."],0,
   "Consider + object + object complement on neutraali rakenne: the answer on objekti ja incorrect kuvaa sitä."]
],
"G03.1":[
  ["Mikä vaihtoehto sopii yksikön kolmanteen persoonaan preesensissä?",
   ["She study chemistry.","She studies chemistry.","She studying chemistry."],1,
   "She vaatii preesensin myönteisessä peruslauseessa studies-muodon. Study-pääte muuttuu -ies-muodoksi."],
  ["Mikä kysymys on rakenteellisesti oikein?",
   ["Does he works here?","Do he work here?","Does he work here?"],2,
   "Does kantaa persoonan ja ajan, joten pääverbi pysyy perusmuodossa work ilman s-päätettä."]
],
"G03.2":[
  ["Mikä on tavallinen yleiskielinen kongruenssi ilmauksessa ”Each of the candidates ___ ready”?",
   ["are","is","have"],1,
   "Each on yksiköllinen pääsana, vaikka of-rakenne sisältää monikon candidates. Tässä ei ole monikon varianttikysymystä."],
  ["Mikä on oikein ilmauksessa ”Everybody ___ the rules”?",
   ["know","knows","are knowing"],1,
   "Everybody on kieliopillisesti yksiköllinen, joten preesensin neutraali perusmuoto on knows."]
],
"G03.3":[
  ["Täydennä: ”The number of applications ___ increasing.”",
   ["are","is","have"],1,
   "The number of viittaa yhteen lukumäärään, joten yksiköllinen is on tässä oikea valinta."],
  ["Täydennä: ”A number of applicants ___ already replied.”",
   ["has","have","is"],1,
   "A number of vastaa tavallisesti merkitystä useat, ja lause saa tässä monikollisen have-muodon."]
],
"G03.4":[
  ["Mikä käsittelee komiteaa yhtenä kokonaisuutena tavallisessa amerikanenglannissa?",
   ["The committee has decided.","The committee have decide.","The committee are decides."],0,
   "Amerikanenglannissa komiteaa yhtenä kokonaisuutena käsiteltäessä yksikkö has on tavallisin. Brittienglannissa mahdollinen monikko riippuu merkityksestä."],
  ["Mikä lause korostaa ryhmän jäseniä brittienglannissa?",
   ["The team are arguing among themselves.","The team is argues among themselves.","The team are argues among themselves."],0,
   "Brittienglannin are voi korostaa ryhmän jäseniä. Tämä ei tarkoita, että yksikkö olisi kaikissa konteksteissa väärin."]
],
"G03.5":[
  ["Mikä on lauseen ”A list of the proposals is available” subjektin pääsana?",
   ["proposals","list","available"],1,
   "Subjektin pääsana list on yksikköinen, vaikka sitä seuraavan of-ryhmän proposals on monikossa."],
  ["Mikä täydentää lauseen ”The references in the list ___ reliable”?",
   ["is","has","are"],2,
   "Subjektin pääsana references on monikko. In the list on tarkenne, joka ei muuta sen lukua."]
],
"G04.1":[
  ["Mikä on tavallinen yleiskielinen tapa ilmaista ”neuvoja”?",
   ["some advice","an advice","three advices"],0,
   "Advice on yleisessä neuvon merkityksessä laskematon, joten some advice on neutraali. Yksittäisen neuvon voi ilmaista a piece of advice."],
  ["Mikä vaihtoehto käyttää laskettavaa substantiivia yksikössä?",
   ["a suggestion","an information","an equipment"],0,
   "Suggestion on laskettava ja saa yksikön epämääräisen artikkelin. Information ja equipment ovat näissä merkityksissä laskemattomia."]
],
"G04.2":[
  ["Miten ilmaiset kaksi erillistä tietoa yleiskielisesti?",
   ["two informations","two pieces of information","two information"],1,
   "Information on yleiskielessä laskematon. Pieces of information tekee erilliset tiedot laskettaviksi."],
  ["Mikä virke on oikein matkatavaroista?",
   ["The luggage are heavy.","The luggage is heavy.","The luggages are heavy."],1,
   "Luggage on tavallisessa matkatavaroiden merkityksessä laskematon ja saa yksiköllisen is-verbin."]
],
"G04.3":[
  ["Täydennä: ”How ___ reports did you read?”",
   ["much","many","little"],1,
   "Reports on laskettava monikko, joten määrän kysymiseen käytetään many-sanaa."],
  ["Mikä ilmaisee, että hyviä vaihtoehtoja on jonkin verran saatavilla?",
   ["We have a few good options.","We have few good options.","We have little good options."],0,
   "A few ilmaisee pientä mutta olemassa olevaa määrää. Few ilman artikkelia korostaa vaihtoehtojen niukkuutta."]
],
"G04.4":[
  ["Mikä on oikein yleiskielessä?",
   ["The evidence are limited.","The evidence is limited.","The evidences are limited."],1,
   "Evidence on tässä laskematon ja saa yksiköllisen is-muodon. Muotoa evidences ei pidetä tavallisena neutraalina monikkona."],
  ["Mikä on oikein, vaikka sana päättyy s-kirjaimeen?",
   ["The news are encouraging.","The news is encouraging.","The news have encouraging."],1,
   "News on merkitykseltään ja kongruenssiltaan tavallisesti yksikköinen, vaikka sen kirjoitusasu päättyy s-kirjaimeen."]
],
"G04.5":[
  ["Mitä tarkoittaa ”two coffees” kahvilatilauksessa?",
   ["Two portions of coffee.","Two kinds of paper.","Two pieces of advice."],0,
   "Coffee voi olla laskematon juoma-aineena, mutta kahvilassa coffees ilmaisee tavallisesti annoksia."],
  ["Mitä ”papers” tarkoittaa virkkeessä ”She published two papers”?",
   ["Two research articles.","Two pieces of luggage.","A large amount of paper material."],0,
   "A paper voi tarkoittaa tutkimusartikkelia, jolloin papers on laskettava monikko. Merkitys ratkaisee laskettavuuden."]
]
};

export function gradeGrammarSelfCheck(items:readonly GrammarSelfCheckItem[], selections:readonly (number|null)[]):{
  answered:number; correct:number; total:number;
}{
  return {
    total:items.length,
    answered:items.filter((_,index)=>Number.isInteger(selections[index])&&
      (selections[index]??-1)>=0&&(selections[index]??-1)<items[index][1].length).length,
    correct:items.filter((item,index)=>selections[index]===item[2]).length
  };
}

export function grammarSelfCheckStorageKey(owner:string,sectionId:string):string{
  return "em-grammar-selfcheck:"+encodeURIComponent(owner)+":"+GRAMMAR_SELF_CHECK_VERSION+":"+sectionId;
}
