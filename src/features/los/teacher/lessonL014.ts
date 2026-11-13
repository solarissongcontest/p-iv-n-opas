import type { TeacherLesson } from "./engine.ts";

/**
 * L014 · C03. Entirely scripted Finnish instruction, no runtime AI.
 * The step-controlled TeacherBoard is the existing interactive conjugation /
 * sentence-order board; the four canonical workbook answers stay in C03 storage.
 * No formal Sie production or Swiss dative morphology is required here.
 */
export const LOS1_L014_TEACHER: TeacherLesson = {
  id:"L014",bookId:1,chapterId:"03",version:"2.0.0-preview.1",
  title:"Kommen ja woher",
  objective:"Kysyn sinutellen lähtömaan, taivutan kommen-verbin ich- ja du-muodot ja vastaan aus + maa -rakenteella.",
  estimatedMinutes:30,
  requiredQuestionIds:["recall","guided-verb","guided-question","guided-meaning","independent","application","exit"],
  requiredActivityIds:["sentence-rehearsed"],
  requiredPracticeIds:["C03-EX-06","C03-EX-07","C03-EX-10","C03-EX-13"],
  scenes:[
    {id:"welcome",phase:"Aloitus",kind:"introduction",title:"Osaat pian kysyä, mistä toinen on kotoisin",
     paragraphs:[
      "L013:ssa tunnistit Lisan vastauksesta lähtömaan Deutschland ja asuinpaikan Bern. Tänään opit sanomaan saman asian itse yksinkertaisella sinuttelumuodolla.",
      "Aloitamme merkityksestä, rakennamme sitten kommen-verbin muodot ja kysymyslauseen vaihe kerrallaan. Lopuksi vastaat ilman näkyvää mallia.",
      "Kaikki neljä kirjaharjoitusta tallentuvat C03:n tavalliseen oppikirjaan. Keskeneräisen oppitunnin voi jättää kesken ja siihen voi palata."
     ],
     help:[{title:"Tarvitseeko osata saksaa ennestään?",body:"Ei muuta kuin aikaisempien tuntien nimet, ich ja du. Kertaus on heti seuraavaksi."}]},
    {id:"recall",phase:"Aktivointi",kind:"question",title:"Palauta mieliin, mikä on lähtömaa",
     paragraphs:["Lisa sanoi tulevansa Saksasta ja asuvansa Bernissä. Erota nämä tiedot ennen kielioppia."],
     question:{type:"choice",skillId:"L1-READ-01",prompt:"Mikä ilmaus kertoo lähtömaan eikä nykyistä asuinpaikkaa?",
      options:[{id:"a",label:"Ich wohne in Bern.",wrongFeedback:"Wohne in kertoo, missä asutaan, ei mistä ollaan kotoisin."},
       {id:"b",label:"Ich komme aus Deutschland."},
       {id:"c",label:"Wie heißen Sie?",wrongFeedback:"Tässä kysytään nimeä kohteliaasti."}],
      correctOption:"b",success:"Oikein. Komme aus kertoo alkuperän.",hint:"Etsi ilmaus, jonka perässä on Deutschland.",
      reteach:"Komme aus + maa kertoo alkuperän; wohne in + kaupunki kertoo nykyisen asuinpaikan.",
      genericWrong:"Erota mistä henkilö tulee ja missä hän asuu."}},
    {id:"meaning",phase:"Opettajan selitys",kind:"explanation",title:"Woher = mistä, wo = missä",
     paragraphs:[
      "Saksan woher kysyy lähtöpaikkaa tai alkuperää: Woher kommst du? = Mistä olet kotoisin? Tämä on uusi aktiivinen kysymys.",
      "Wo kysyy sijaintia: Wo wohnst du? = Missä asut? Tätä voit ymmärtää, vaikka wohnen-verbin koko taivutusta ei tällä tunnilla harjoitella.",
      "Vastaus alkaa usein Ich komme aus ... . Aus tarkoittaa tässä -sta/-stä: Ich komme aus Finnland. = Olen kotoisin Suomesta.",
      "Woher ja wo eivät ole vaihtokelpoisia. Jos kysyt Woher, vastaaja kertoo mistä; jos kysyt Wo, hän kertoo missä."
     ],
     help:[{title:"En ymmärrä eroa",body:"Ajattele kahta suomalaista kysymystä: MISTÄ olet kotoisin? = woher. MISSÄ asut? = wo. Alkuperä ei aina ole sama kuin asuinpaikka."},
      {title:"Mitä aus tekee?",body:"Se sitoo lähtöpaikan vastaukseen: komme aus Finnland = tulen Suomesta. Maan nimi pysyy tässä perusmuodossa."}]},
    {id:"verb-rule",phase:"Opettajan selitys",kind:"explanation",title:"Miksi kommen muuttuu?",
     paragraphs:[
      "Kommen on verbin perusmuoto, joka tarkoittaa tulla. Saksassa verbin muoto riippuu persoonasta: ich = minä ja du = sinä.",
      "Poista kommen-sanasta -en, niin saat vartalon komm-. Lisää ich-persoonaan -e: komm + e = komme. Lisää du-persoonaan -st: komm + st = kommst.",
      "Siksi sanot Ich komme aus Finnland. mutta Du kommst aus Deutschland. Kirjoitusasu kommst sisältää kaksi m-kirjainta ja st-päätteen.",
      "Kolmannen persoonan tunnistusesimerkki on er/sie kommt = hän tulee. Kohteliaan Sie-kysymyksen muoto tulee L013:n lähdetekstistä, mutta sen tuottamista harjoitellaan vasta C04:ssä."
     ],
     help:[{title:"Miksi du ei ole komme?",body:"Du vaatii tässä -st-päätteen. Vartalo pysyy komm-: du + kommst."},
      {title:"Entä esimerkki er/sie kommt?",body:"Se on lyhyt tunnistusesimerkki. Tuota tällä tunnilla ensisijaisesti muodot ich komme ja du kommst."}]},
    {id:"conjugation-board",phase:"Interaktiivinen taivutustaulu",kind:"board",title:"Rakenna kommen-verbi vaiheittain",
     paragraphs:["Paina Näytä seuraava ja seuraa, miten sama vartalo saa eri persoonapäätteen. Voit palata edelliseen vaiheeseen tai aloittaa alusta."],
     board:[
      {label:"1 · Perusmuoto",german:"kommen",meaning:"tulla / olla kotoisin; vartalo komm- + pääte -en"},
      {label:"2 · Vartalo",german:"komm-",meaning:"poista perusmuodosta -en"},
      {label:"3 · Minä",german:"ich + komm + e → ich komme",meaning:"Ich komme = minä tulen / olen kotoisin"},
      {label:"4 · Sinä",german:"du + komm + st → du kommst",meaning:"Du kommst = sinä tulet / olet kotoisin"},
      {label:"5 · Tunnista myös hän",german:"er / sie kommt",meaning:"Hän tulee. Ei tämän tunnin itsenäinen tuottamisvaatimus."},
      {label:"6 · Vertaa",german:"Ich komme. · Du kommst.",meaning:"Subjekti ratkaisee verbin päätteen."}
     ]},
    {id:"model",phase:"Opetettu malliesimerkki",kind:"explanation",title:"Mallinnan kaksi lausetta itse",
     paragraphs:[
      "Tehtävä: sano, että kuvitteellinen Mia on puhujana ja tulee Suomesta. Valitsen tekijäksi ich, sitten kommen-verbin ich-muodon komme ja lopuksi aus Finnland: Ich komme aus Finnland.",
      "Toinen tehtävä: kerro sinulle osoitettuna, että toinen henkilö on Saksasta. Tekijä on du, joten sanon Du kommst aus Deutschland. En kirjoita Du kommen, koska du tarvitsee muodon kommst.",
      "Tarkistan lopuksi kaksi asiaa: tuleeko taivutettu verbi tekijän jälkeen väitelauseessa ja seuraako lähtömaan nimeä edeltävä aus.",
      "Maiden Finnland, Deutschland ja Österreich edellä käytetään näissä perusesimerkeissä aus ilman artikkelia. Sveitsistä sanotaan valmiina ilmauksena aus der Schweiz; sen datiivia ei tarvitse vielä itse johtaa."
     ]},
    {id:"guided-verb",phase:"Ohjattu harjoittelu",kind:"question",title:"Valitse ich-muoto",
     paragraphs:["Käytä apuna hetki sitten rakennettua taivutustaulua."],
     question:{type:"choice",skillId:"L1-GRA-01",prompt:"Ich ___ aus Finnland.",
      options:[{id:"a",label:"kommst",wrongFeedback:"Kommst kuuluu du-persoonalle."},
       {id:"b",label:"komme"},{id:"c",label:"kommen",wrongFeedback:"Kommen on perusmuoto, mutta ich tarvitsee taipuneen muodon."}],
      correctOption:"b",success:"Oikein. Ich komme.",hint:"Ich saa komm-vartaloon -e-päätteen.",
      reteach:"komm- + -e = komme. Sano Ich komme aus Finnland.",
      genericWrong:"Tarkista verbin persoona ja pääte."}},
    {id:"sentence-board",phase:"Interaktiivinen lauserakennustaulu",kind:"board",title:"Kokoa lähtömaakysymys sana kerrallaan",
     paragraphs:["Etene nuolilla. Näet ensin tavallisen väitelauseen ja sen jälkeen kysymyksen, jossa kysymyssana on alussa."],
     board:[
      {label:"1 · Kuka?",german:"du",meaning:"sinä, kysymyksen kohde"},
      {label:"2 · Valitse oikea muoto",german:"du kommst",meaning:"du + kommst, ei du komme"},
      {label:"3 · Lisää kysymyssana",german:"woher",meaning:"mistä; kysymys alkuperästä"},
      {label:"4 · Muodosta kysymys",german:"Woher + kommst + du?",meaning:"kysymyssana ensin, taivutettu verbi seuraavaksi, sitten du"},
      {label:"5 · Vastaa",german:"Ich + komme + aus + Finnland.",meaning:"väitelauseessa ich ennen verbiä, sitten aus ja maa"},
      {label:"6 · Vertaa sijaintiin",german:"Wo wohnen Sie? ≠ Woher kommst du?",meaning:"wo = missä, woher = mistä; Sie on lähdetekstin kohtelias muoto"}
     ]},
    {id:"guided-question",phase:"Ohjattu harjoittelu",kind:"question",title:"Mikä kysymys sopii?",
     paragraphs:["Kysyt tutulta, mistä hän on kotoisin. Muistele lauserakennustaulun neljättä vaihetta."],
     question:{type:"choice",skillId:"L1-INT-03",prompt:"Valitse oikein muodostettu alkuperäkysymys.",
      options:[{id:"a",label:"Woher du kommst?",wrongFeedback:"Kysymyssanan jälkeen tulee taivutettu verbi, vasta sitten du."},
       {id:"b",label:"Woher kommst du?"},{id:"c",label:"Wo kommst du?",wrongFeedback:"Tällä tunnilla alkuperän kysymyssana on woher, ei wo."}],
      correctOption:"b",success:"Oikein. Woher kommst du?",
      hint:"Sanajärjestys on woher + kommst + du.",
      reteach:"Kysymys = Woher kommst du? Väitelause = Du kommst aus Finnland.",
      genericWrong:"Muista sekä kysymyssana että sen jälkeinen verbin paikka."}},
    {id:"guided-meaning",phase:"Merkityksen tarkistus",kind:"question",title:"Aus ja lähtömaa",
     paragraphs:["Mia sanoo Ich komme aus Österreich. Sinun ei tarvitse muuttaa Österreich-sanaa."],
     question:{type:"choice",skillId:"L1-INT-03",prompt:"Mitä Mia sanoo?",
      options:[{id:"a",label:"Hän on kotoisin Itävallasta."},{id:"b",label:"Hän asuu Suomessa.",wrongFeedback:"Aus Österreich ei kerro asumisesta Suomessa."},
       {id:"c",label:"Hän kysyy toisen nimeä.",wrongFeedback:"Lause on alkuperää koskeva vastaus, ei nimikysymys."}],
      correctOption:"a",success:"Oikein. Aus Österreich = Itävallasta.",
      hint:"Österreich on Itävalta. Aus ilmaisee mistä.",
      reteach:"Ich komme aus Österreich. = Olen kotoisin Itävallasta.",
      genericWrong:"Tarkista aus-sanan merkitys ja maan nimi."}},
    {id:"book-practice",phase:"Oppikirjan oikeat tehtävät",kind:"book",title:"Ratkaise neljä taivutus- ja aus-harjoitusta",
     paragraphs:[
      "Avaa C03:n Harjoittele-osio. Tee C03-EX-06 (komme), C03-EX-07 (kommst), C03-EX-10 (aus) ja C03-EX-13 (kommst).",
      "Vastaa kirjassa ennen kuin tarkistat ratkaisut. Teacher näyttää vain saman kappaleen oikean vastaustallennuksen tilan.",
      "Jos teet virheen, kertaa kaksi taulua ja ratkaise tehtävä uudelleen. Pelkkä oppikirjan avaaminen ei kirjaa tehtävää vastatuksi."
     ],
     bookLinks:[{label:"C03 · Harjoittele",chapterId:"03",section:"practice",instruction:"Tee C03-EX-06, 07, 10 ja 13. Tarkista vasta oman vastauksen jälkeen."}]},
    {id:"independent",phase:"Itsenäinen harjoittelu",kind:"question",title:"Kirjoita koko kysymys ilman mallia",
     paragraphs:["Sulje taulu. Kirjoita saksaksi kysymys tutulle henkilölle."],
     question:{type:"text",skillId:"L1-INT-03",evidenceRole:"independent",prompt:"Kirjoita: Mistä olet kotoisin?",
      accepted:["Woher kommst du?"],
      success:"Oikein. Kirjoitit woher + kommst + du oikeassa järjestyksessä.",
      hint:"Kolme sanaa: woher, kommst, du.",
      reteach:"Woher = mistä; du saa verbin kommst. Kysymys: Woher kommst du?",
      genericWrong:"Tarkista woher-sana, kommst-muoto ja kysymyksen sanajärjestys.",
      wrongAnswers:{"wo kommst du":"Wo kysyy missä. Alkuperäkysymykseen tarvitset woher.","woher kommen du":"Du-persoonan muoto on kommst.","woher du kommst":"Kysymyksessä verbi tulee ennen du-sanaa.","woher komme du":"Komme kuuluu ich-persoonalle."}}},
    {id:"application",phase:"Soveltaminen",kind:"question",title:"Vastaa uuteen kysymykseen itsenäisesti",
     paragraphs:["Kuvitteellinen henkilö kysyy: Woher kommst du? Vastaa hänen puolestaan niin, että lähtömaa on Saksa."],
     question:{type:"text",skillId:"L1-INT-03",evidenceRole:"application",prompt:"Kirjoita koko vastaus: Olen kotoisin Saksasta.",
      accepted:["Ich komme aus Deutschland."],
      success:"Oikein. Ich + komme + aus Deutschland.",
      hint:"Aloita Ich komme, sitten aus ja maan nimi.",
      reteach:"Ich = minä, komme = tulen, aus Deutschland = Saksasta.",
      genericWrong:"Tarkista tekijä, verbin ich-muoto ja aus.",
      wrongAnswers:{"ich kommst aus deutschland":"Kommst on du-muoto; ich saa komme.","ich komme in deutschland":"In kertoo sijainnista; lähtömaa ilmaistaan tässä aus-sanalla.","ich kommen aus deutschland":"Kommen on perusmuoto; ich tarvitsee komme."}}},
    {id:"rehearsal",phase:"Oma tuotanto",kind:"activity",title:"Harjoittele kysymys ja vastaus ääneen",
     paragraphs:[
      "Lue itse ääneen Woher kommst du? ja Ich komme aus Finnland. Toista sitten kumpikin ilman tekstiä.",
      "Voit myös kirjoittaa ne paperille. Puhetta tai ääntämistä ei pisteytetä automaattisesti.",
      "Vahvista harjoittelu vasta oman yrityksen jälkeen. Ääntämisen ihmistarkistus on edelleen erillinen julkaisuportti."
     ],
     activityId:"sentence-rehearsed",activityLabel:"Harjoittelin kysymyksen ja vastauksen ilman mallia"},
    {id:"exit",phase:"Lopputarkistus",kind:"question",title:"Tunnista vielä wo ja woher",
     paragraphs:["Tee tämä ilman taulua. Nämä kaksi kysymyssanaa tarkoittavat eri asioita."],
     question:{type:"choice",skillId:"L1-INT-03",evidenceRole:"exit",prompt:"Millä kysyt nimenomaan mistä ystäväsi on kotoisin?",
      options:[{id:"a",label:"Wo wohnst du?",wrongFeedback:"Wo wohnst du? kysyy, missä ystävä asuu."},
       {id:"b",label:"Woher kommst du?"},{id:"c",label:"Wie heißt du?",wrongFeedback:"Wie heißt du? kysyy nimeä."}],
      correctOption:"b",success:"Oikein. Woher kommst du? kysyy alkuperää.",
      hint:"Alkuperä = mistä, ei missä eikä mikä nimi.",
      reteach:"Woher kommst du? = Mistä olet kotoisin? Wo wohnst du? = Missä asut?",
      genericWrong:"Tarkista, mitä kysymyksellä halutaan selvittää."}},
    {id:"summary",phase:"Yhteenveto",kind:"summary",title:"Osaat rakentaa ensimmäisen alkuperäkeskustelun",
     paragraphs:[
      "Kertaa pari Woher kommst du? ja Ich komme aus Finnland. Verbin muodot ovat ich komme ja du kommst. Wo kysyy missä, woher mistä.",
      "Kirjan neljä oikeaa C03-harjoitusta ja Teacherin itsenäiset vastaukset säilyvät eri näyttöinä samassa opiskelijakohtaisessa tallennuksessa. Vihjeellä ratkaistu vastaus ei ole itsenäinen näyttö.",
      "L015:ssa luet toisen aidon neljän puheenvuoron keskustelun ja päät­telet kartan avulla, mistä paikkakunnista henkilöt tulevat. Sveitsin artikkelitaivutusta ei tässä edellytetty."
     ]}
  ]
};