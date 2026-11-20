import type {GrammarSelfCheckItem} from "./englishGrammarSelfChecks.ts";

/** New original exercises tied to the real Alpha 0.8 G05–G07 subsection IDs.
 * The original 16-part content pack stays unchanged, with draft status.
 */
export const GRAMMAR_SELF_CHECKS_G05_G07: Readonly<Record<string,readonly [GrammarSelfCheckItem,GrammarSelfCheckItem]>>={
"G05.1":[
 ["Valitse artikkeli ääntämisen perusteella: ”She applied to ___ university in Scotland.”",
  ["an university","a university","the university"],1,
  "University alkaa /juː/-äänteellä eli konsonanttiäänteellä. Siksi ensimmäisestä maininnasta käytetään a-artikkelia, vaikka sana alkaa kirjoitettuna u-kirjaimella."],
 ["Mikä virke esittelee ammatin ja käyttää oikeaa artikkelia?",
  ["He is an engineer.","He is a engineer.","He is engineer."],0,
  "Engineer alkaa vokaaliäänteellä ja on laskettava ammatinnimike. Tavallinen yleiskielinen rakenne on he is an engineer, ei artikkeliton muoto."]
],
"G05.2":[
 ["Vihko on jo mainittu. Mikä jatkolause viittaa samaan vihkoon?",
  ["A notebook was expensive.","The notebook was expensive.","Notebook was expensive."],1,
  "The notebook osoittaa lukijalle jo tunnetun vihkon. Uusi a notebook -maininta ei yksin kerro, että kyseessä on juuri aiemmin ostettu yksilö."],
 ["Mikä ilmaus rajaa ikkunan tarkenteella juuri tunnistettavaksi?",
  ["Please close window next to the door.","Please close a window next to the door.","Please close the window next to the door."],2,
  "The window next to the door viittaa tarkenteen avulla yksilöityyn ikkunaan. Pelkkä a window jättäisi viittauksen yleensä epämääräisemmäksi."]
],
"G05.3":[
 ["Valitse yleistävä väite kirjoista ilman viittausta tiettyihin kirjoihin.",
  ["Books can change minds.","The books on this shelf can change minds.","A books can change minds."],0,
  "Paljas monikko books kuvaa kirjoja yleisenä joukkona. The books on this shelf viittaa rajattuun joukkoon eikä enää samaan yleiseen väitteeseen."],
 ["Missä lauseessa feedback tarkoittaa palautetta yleisesti?",
  ["The feedback from yesterday matters.","Feedback helps students improve.","A feedback helps students improve."],1,
  "Laskematon feedback voi tarkoittaa palautetta yleisesti ilman artikkelia. The feedback from yesterday rajaa tietyn palautteen; a feedback ei ole tavallinen yleiskielen käyttö."]
],
"G05.4":[
 ["Oppilas käy koulua. Mikä ilmaus korostaa tavanomaista koulunkäyntiä?",
  ["She is at school.","She is at the school building.","She is at a school building."],0,
  "At school viittaa tässä institutionaaliseen koulunkäyntiin. At the school voi puolestaan tarkoittaa tiettyä koulua tai koulurakennusta, eikä eroa ratkaista pelkän paikan perusteella."],
 ["Mikä virke ilmaisee henkilön valitsemisen tehtävään tavallisella tittelirakenteella?",
  ["They elected her the chair of the committee yesterday.","They elected her chair of the committee yesterday.","They elected her a chair of the committee yesterday."],1,
  "Elected her chair of the committee käyttää tehtävään valinnan jälkeistä artikkelitonta titteliä. Artikkeli voi esiintyä muissa konteksteissa, mutta tämä on neutraali asemaan nimittämisen rakenne."]
],
"G06.1":[
 ["Tarjoat vieraalle teetä ja odotat tarjouksen kelpaavan. Mikä kysymys on luontevin?",
  ["Would you like any tea?","Would you like some tea?","Would you like every tea?"],1,
  "Some on luonteva myönteisessä tarjouksessa, vaikka lause on kysymys. Any voi toimia toisissa, esimerkiksi määrän olemassaoloa avoimesti selvittävissä kysymyksissä."],
 ["Mikä virke tarkoittaa, että kuka tahansa kelpoisuusehdot täyttävä saa hakea?",
  ["Some qualified applicant may apply.","No qualified applicant may apply.","Any qualified applicant may apply."],2,
  "Any qualified applicant ilmaisee vapaan valinnan kelpoisuusehdot täyttävien joukosta. Se ei tarkoita vain jotakuta ennakolta valittua hakijaa."]
],
"G06.2":[
 ["Kokouksen alkuun on hieman aikaa. Valitse sävyltään myönteinen vaihtoehto.",
  ["We have a little time.","We have little time.","We have a few time."],0,
  "A little time korostaa käytettävissä olevaa pientä määrää. Little time painottaa ajan niukkuutta, ja time on tässä laskematon substantiivi."],
 ["Mikä kuvaa harvoja ihmisiä ja painottaa ymmärtäjien niukkuutta?",
  ["A few people understood the warning.","Few people understood the warning.","Little people understood the warning."],1,
  "Few people korostaa, että ymmärtäjiä oli vain vähän. A few people kertoo joidenkin ymmärtäneen, eikä little sovi tähän laskettavan monikon merkitykseen."]
],
"G06.3":[
 ["Mikä virke sopii yksilöllisesti tarkasteltujen ratkaisujen heikkouksista?",
  ["Each of the solutions have a weakness.","Each of the solutions has a weakness.","Each of the solutions are a weakness."],1,
  "Each on koko subjektin yksiköllinen ydin, vaikka sen jälkeinen solutions on monikossa. Siksi neutraali verbi on has eikä have."],
 ["Valittavana on tasan kaksi vaihtoehtoa, eikä kumpikaan kelpaa. Mikä lause ilmaisee sen?",
  ["Neither option is suitable.","Either option is suitable.","Both options are suitable."],0,
  "Neither hylkää kaksi vaihtoehtoa. Either tarkoittaa tavallisesti toista tai kumpaa tahansa näistä kahdesta, ja both kattaa molemmat."]
],
"G06.4":[
 ["Mikä ilmaus käsittelee yhtä luokkaa yhtenä kokonaisuutena?",
  ["All class was silent.","The whole class was silent.","The whole classes was silent."],1,
  "The whole class kuvaa yhtä luokkaa kokonaisuutena. Whole yhdistyy tässä yksikölliseen laskettavaan substantiiviin ja sen määritteeseen the."],
 ["Täydennä lukumäärää tarkoittava virke: ”The number of applicants ___ rising.”",
  ["are","have","is"],2,
  "The number of applicants viittaa yhteen lukumäärään, jonka pääsana on number. Siksi yksiköllinen is käy, toisin kuin a number of applicants are."]
],
"G07.1":[
 ["Kuka kutsui kenet? Valitse lause, jossa he kutsuivat meidät.",
  ["Them invited we.","They invited us.","Us invited they."],1,
  "They on tekijää kuvaava subjektimuoto ja us objektimuoto. Lausejärjestys ja pronominien muodot erottavat kutsujat kutsutuista."],
 ["Valitse yleiskielinen virke, jossa minä näin hänet (miespuolisen henkilön).",
  ["Me saw him.","I saw he.","I saw him."],2,
  "I on ensimmäisen persoonan subjektimuoto. Him on miespuoliseen henkilöön viittaava objektimuoto, jota tarvitaan saw-verbin jälkeen."]
],
"G07.2":[
 ["Mikä täydennys toimii itsenäisenä omistuspronominina: ”The published results are ___.”?",
  ["their","theirs","them"],1,
  "Theirs toimii ilman seuraavaa substantiivia. Their olisi omistusmäärite esimerkiksi ilmauksessa their results, joten sitä ei voi jättää tähän yksin."]
],
 ["Mikä virke käyttää substantiivia määrittävää omistusmuotoa oikein?",
  ["Mine essay is ready.","Me essay is ready.","My essay is ready."],2,
  "My on substantiivia essay määrittävä omistusmuoto. Mine voi toimia itsenäisenä esimerkiksi lauseessa the essay is mine, mutta ei tässä ennen substantiivia."]
],
"G07.3":[
 ["Lapsi pukeutui itse. Mikä pronomini ilmaisee, että teko kohdistui lapseen?",
  ["The child dressed herself.","The child dressed her.","The child dressed hers."],0,
  "Herself palauttaa dress-toiminnan saman tekijän kohteeksi. Her viittaisi neutraalisti toiseen henkilöön tai vaatisi erilaisen kontekstin."],
 ["Järjestäjä piti puheen ilman apua. Mikä korostaa teon tekemistä yksin?",
  ["He prepared the speech his.","He prepared the speech himself.","He prepared himself the speech."],1,
  "Himself voi korostaa, että henkilö itse teki työn. He prepared himself the speech ei käytä tätä tavallista korostusrakennetta oikein."]
],
"G07.4":[
 ["Kollegat kannustivat toisiaan. Mikä virke ilmaisee vastavuoroisuuden?",
  ["The colleagues encouraged each other.","The colleagues encouraged themselves.","The colleagues encouraged their own."],0,
  "Each other ilmaisee vastavuoroisen toiminnan kollegojen välillä. Themselves tarkoittaa, että he kannustivat itseään, ei välttämättä toisiaan."],
 ["Kaksi ystävää auttoi toisiaan. Mikä väite each other / one another -eroista on paras?",
  ["Only each other is grammatical with two people.","One another is always forbidden with two people.","Both expressions can describe reciprocal help in modern English."],2,
  "Nykyenglannissa molemmat ilmaukset voivat kuvata vastavuoroisuutta myös kahden ihmisen välillä. Tiukkaa kahden ja useamman henkilön rajaa ei pidä opettaa absoluuttisena."]
],
"G07.5":[
 ["Raportti aiheutti keskustelua. Mikä pronomini viittaa aiemmin mainittuun raporttiin?",
  ["The report was published. There caused debate.","The report was published. It caused debate.","The report was published. This is caused debate."],1,
  "It viittaa aiemmin mainittuun report-sanaan. There puolestaan esittelee olemassaolon esimerkiksi there is a report, eikä korvaa tätä viittausta."],
 ["Mikä virke tuo esiin ongelman olemassaolon eikä viittaa aiempaan ongelmaan?",
  ["There is a problem with the schedule.","It is a problem with the schedule.","They are a problem with the schedule."],0,
  "There is a problem on eksistentiaalinen rakenne, joka esittelee ongelman. It viittaa eri tavalla aiemmin tunnettuun asiaan tai toimii muodollisena subjektina."]
]
};
