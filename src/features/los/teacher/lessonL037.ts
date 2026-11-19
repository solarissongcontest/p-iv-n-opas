import { getLosOpenDialogue } from "../content/los1OpenDialogues.ts";
import type { TeacherLesson } from "./engine.ts";

const textA = getLosOpenDialogue("07");
if (!textA || textA.sourceId !== "M-WB-02" || textA.originalLines.length !== 5) {
  throw new Error("C07 M-WB-02 original five-turn Text A is required for L037");
}
/** One real textbook source and one answer store, not a fabricated teacher dialogue. */
export const LOS1_L037_TEACHER: TeacherLesson = {
  id:"L037",bookId:1,chapterId:"07",version:"2.0.0-preview.1",
  title:"Lue tavaamiskeskustelu",
  objective:"Luen C07:n viisi alkuperäistä puheenvuoroa, löydän tavaamispyynnön ja ymmärrän zweimal L -ilmauksen.",
  estimatedMinutes:30,
  requiredQuestionIds:["recall","guided","independent","application","exit"],
  requiredActivityIds:["read-all-turns"],
  requiredPracticeIds:[],
  requiredCheckedIds:["C07-SOURCE-Q01","C07-SOURCE-Q02","C07-SOURCE-Q03"],
  scenes:[
    {id:"welcome",phase:"Aloitus",kind:"introduction",title:"Tavaamista oikeassa puhelinpalvelussa",
      paragraphs:[
        "Nyt luemme C07:n oikean, Wikibooksissa julkaistun Fernsprechauskunft-keskustelun. Lähdetunnus on M-WB-02, lähdeversio 3504939. Tekstissä on viisi puheenvuoroa, ja ne kaikki ovat kirjassa.",
        "Franz kysyy numerotiedustelusta Claudia Bolliger -nimisen henkilön yhteystietoa. Tehtävänäsi ei ole muistaa tai kertoa kenenkään todellista puhelinnumeroa, vaan ymmärtää, miksi työntekijä pyytää nimen tavaamista.",
        "Osa alkuperäisen tekstin kohteliaasta kielestä on alkeistasoa vaikeampaa. Se selitetään lukemista varten, eikä sinun tarvitse tuottaa Ich hätte gerne -rakenteen kielioppia itse.",
      ]},
    {id:"recall",phase:"Muistelu",kind:"question",title:"Mihin tavataan?",
      paragraphs:["L036:ssa opit erottamaan kirjaimen nimen ja sanan äänen. Muista nyt miksi toista pyydetään tavaamaan."],
      question:{type:"choice",skillId:"L1-INT-06",prompt:"Mitä tarkoittaa buchstabieren?",
        options:[{id:"a",label:"Tavata kirjaimittain", "lang": "fi"},{id:"b",label:"Lukua ääneen numero", "lang": "fi",wrongFeedback:"Numeron kertominen on eri asia; tässä annetaan sanan kirjaimet."},{id:"c",label:"Kertoa kotimaa", "lang": "fi",wrongFeedback:"Kotimaa liittyy woher-kysymykseen, ei nimen tavaamiseen."}],
        correctOption:"a",success:"Kyllä. Buchstabieren tarkoittaa kirjainten luettelemista järjestyksessä.",hint:"Ajattele nimeä U-W-E.",reteach:"Nimen kirjoitusasun voi varmistaa pyytämällä tavaamaan: Bitte buchstabieren Sie.",genericWrong:"Mieti kirjaimia, joita sanotaan yksi kerrallaan."}},
    {id:"context",phase:"Opettajan selitys",kind:"explanation",title:"Kuka puhuu ja miksi?",
      paragraphs:[
        "Auskunft on numerotiedustelu eli palvelu, josta kysytään numerotietoja. Franz on soittaja. Claudia Bolliger ei puhu itse tässä keskustelussa, vaan hänen nimensä mainitaan.",
        "Franzin ilmaus Ich hätte gerne die Telefonnummer ... tarkoittaa tässä Haluaisin puhelinnumeron .... Hätte on vaativampi kohtelias rakenne, joka on nyt vain ymmärtämisen tukisana.",
        "Työntekijä ei vielä tiedä, miten sukunimi kirjoitetaan. Siksi hän kysyy Wie schreibt man das? = Miten se kirjoitetaan? ja lisää Bitte buchstabieren Sie. = Tavatkaa, olkaa hyvä.",
        "Franz vastaa Natürlich. = Tietysti. Hän käyttää kirjainten jälkeen esimerkkisanoja, kuten C wie Cäsar, jolloin kuulija voi erottaa kirjaimen toisesta.",
      ],
      help:[{title:"Onko Claudia keskustelun toinen puhuja?",body:"Ei. Vuorot kuuluvat Auskunftille ja Franzille. Claudia mainitaan henkilönä, jonka nimeä Franz tavaa."},{title:"Mikä on Sie?",body:"Sie on tässä kohtelias puhuttelu. Tunnista tässä valmis pyyntö; sen taivutusta ei tarvitse päätellä jokaisesta verbistä."}]},
    {id:"original",phase:"Koko lähdeteksti",kind:"board",title:"Kaikki viisi alkuperäistä puheenvuoroa",
      paragraphs:[
        "Avaa alla jokainen puheenvuoro järjestyksessä. Saksankieliset repliikit ja suomenkieliset apuselitteet tulevat suoraan C07:n samasta M-WB-02-tekstiaineistosta. Tämä ei ole opettajan sepittämä korvaava dialogi.",
        "Lue ensin saksankielinen repliikki ja yritä päätellä, mitä puhuja tekee. Katso vasta sen jälkeen suomenkielinen apu. Palaa tarvittaessa viidenteen repliikkiin.",
      ],
      board:textA.originalLines.map((line,index)=>({
        label:(index+1)+" · "+line.speaker,
        german:line.text,
        meaning:line.meaning,
      })),
      help:[{title:"Voinko nähdä kaikki repliikit yhdessä?",body:"Paina Näytä kaikki. Oppikirjan Text A -sivulla koko alkuperäisteksti on lisäksi jatkuvana lukutekstinä, jossa voi korostaa sanoja."}]},
    {id:"phrases",phase:"Keskeiset ilmaukset",kind:"explanation",title:"Miten kirjoitetaan? Tavatkaa, olkaa hyvä",
      paragraphs:[
        "Wie schreibt man das? tarkoittaa Miten se kirjoitetaan? Tässä yleisluonteinen man ei ole sama kuin mies, vaan osa valmista kysymystä, joka koskee kirjoitusasua.",
        "Bitte buchstabieren Sie. on kohtelias pyyntö. Sana bitte tekee pyynnöstä kohteliaan. Buchstabieren tarkoittaa tavata ja Sie viittaa kohteliaasti puhuteltavaan henkilöön.",
        "Franz sanoo C wie Cäsar, L wie Ludwig ja niin edelleen. Wie tarkoittaa tässä kuin; C wie Cäsar = C niin kuin Cäsar. Nämä ovat aakkosten tunnistamisen apusanoja, eivät jokaisen kirjaimen ääntäminen sanan sisällä.",
        "Sukunimessä Bolliger on kaksi peräkkäistä L-kirjainta. Franz sanoo zweimal L: kaksi kertaa L. Tällä vältetään kirjaimen tahaton katoaminen.",
      ],
      help:[{title:"Mitä zweimal tarkoittaa?",body:"Zwei on kaksi. Zweimal on kaksi kertaa. Zweimal L tarkoittaa, että sukunimeen kirjoitetaan L-L."},{title:"Miksi ensimmäisessä puheenvuorossa lukee Auskunft?",body:"Se nimeää puhelinpalvelun. Sitä ei pidä sekoittaa Franzin tai Claudian etunimeen."}]},
    {id:"guided",phase:"Ohjattu ymmärtäminen",kind:"question",title:"Kuka pyytää kirjaimet?",
      paragraphs:["Etsi kolmas puheenvuoro. Katso, kenen kohdalla tavaamispyyntö on."],
      question:{type:"choice",skillId:"L1-READ-01",prompt:"Kumpi sanoo Bitte buchstabieren Sie.?",
        options:[{id:"a",label:"Franz",wrongFeedback:"Franz tavaa nimen vasta seuraavassa puheenvuorossa."},{id:"b",label:"Auskunft"},{id:"c",label:"Claudia Bolliger",wrongFeedback:"Claudia mainitaan, mutta hän ei puhu keskustelussa."}],
        correctOption:"b",success:"Kyllä. Auskunft pyytää Franzia tavaamaan.",hint:"Katso alkuperäistekstin kolmatta repliikkiä.",reteach:"Auskunft kysyy ensin Wie schreibt man das? ja pyytää sitten Bitte buchstabieren Sie.",genericWrong:"Tarkista kolmannen puheenvuoron puhuja."}},
    {id:"book",phase:"Oppikirjaharjoittelu",kind:"book",title:"Lue Text A uudelleen ja tarkista kolme tehtävää",
      paragraphs:[
        "Avaa C07:n Text A oppikirjan lukijaan. Lue viisi vuoroa kokonaan. Saat avattua sanaselityksiä ja merkittyä tärkeät kohdat. Alkuperäinen teksti on kirjassa, ei vain ulkoisen linkin takana.",
        "Siirry sitten Ymmärrä-sivulle. Vastaa ja tarkista C07-SOURCE-Q01, C07-SOURCE-Q02 ja C07-SOURCE-Q03. Kaikki kolme ovat kirjan nykyisiä lähdetehtäviä, ja niiden tarkistukset pysyvät samassa C07-tallennuksessa.",
        "Lähdemedian mahdollinen ääni ei ole tässä vielä hyväksyttyä. Nyt arvioidaan tekstin ymmärtämistä, ei kuuntelua.",
      ],
      bookLinks:[{label:"C07 · Text A (M-WB-02)",chapterId:"07",section:"text",instruction:"Lue kaikki viisi alkuperäistä repliikkiä."},
        {label:"C07 · Ymmärrä",chapterId:"07",section:"understand",instruction:"Tee ja tarkista C07-SOURCE-Q01–Q03."}],
      activityId:"read-all-turns",activityLabel:"Luin kaikki viisi alkuperäistä puheenvuoroa"},
    {id:"independent",phase:"Itsenäinen ymmärtäminen",kind:"question",title:"Muistatko zweimal-ilmauksen?",
      paragraphs:["Sulje lähdeteksti ennen vastaamista. Palaa siihen vasta oman yrityksen jälkeen."],
      question:{type:"choice",skillId:"L1-READ-01",evidenceRole:"independent",prompt:"Miksi Franz sanoo zweimal L?",
        options:[{id:"a",label:"Hän tarvitsee kaksi puhelinnumeroa.", "lang": "fi",wrongFeedback:"Zweimal viittaa tässä L-kirjaimen toistumiseen."},{id:"b",label:"Bolliger-sukunimessä on kaksi peräkkäistä L-kirjainta.", "lang": "fi"},{id:"c",label:"Franz haluaa, että nimi sanotaan uudelleen.", "lang": "fi",wrongFeedback:"Vielä kerran olisi noch einmal, mutta zweimal L kertoo kahdesta L-kirjaimesta."}],
        correctOption:"b",success:"Juuri niin. Bolliger = B-O-L-L-I-G-E-R.",hint:"Etsi, mitä zweimal tarkoittaa; katso sitten nimen kirjoitusasua.",reteach:"Zweimal = kaksi kertaa. Bolliger-nimen kaksi L-kirjainta kirjoitetaan peräkkäin.",genericWrong:"Ajattele yhden kirjaimen toistoa."}},
    {id:"application",phase:"Soveltaminen",kind:"question",title:"Uusi nimi uudessa palvelutilanteessa",
      paragraphs:["Henkilö on nimeltään Uwe. Työntekijä haluaa varmistaa kirjoitusasun."],
      question:{type:"text",skillId:"L1-INT-06",evidenceRole:"application",prompt:"Kirjoita saksaksi kohtelias pyyntö: Tavatkaa, olkaa hyvä.",
        accepted:["Bitte buchstabieren Sie","Bitte buchstabieren Sie."],
        success:"Oikein. Pyyntö toimii myös uudessa tilanteessa ilman kenenkään oikeaa nimeä.",
        hint:"Aloita Bitte, sen jälkeen buchstabieren ja kohtelias Sie.",reteach:"Bitte buchstabieren Sie. = Tavatkaa, olkaa hyvä.",genericWrong:"Tarkista kolmen sanan järjestys ja Sie:n iso alkukirjain."}},
    {id:"exit",phase:"Lopputarkistus",kind:"question",title:"Miten kysyt kirjoitusasua?",
      paragraphs:["Tässä kysytään kirjoitusasua, ei esimerkiksi toisen ikää."],
      question:{type:"choice",skillId:"L1-STRAT-01",evidenceRole:"exit",prompt:"Mikä tarkoittaa Miten se kirjoitetaan?",
        options:[{id:"a",label:"Wie schreibt man das?"},{id:"b",label:"Wie alt bist du?",wrongFeedback:"Tämä kysyy ikää."},{id:"c",label:"Wie geht es dir?",wrongFeedback:"Tämä kysyy vointia."}],
        correctOption:"a",success:"Oikein. Wie schreibt man das? pyytää sanan kirjoitusasua.",hint:"Etsi schreibt-verbi.",reteach:"Schreiben = kirjoittaa. Wie schreibt man das? = Miten se kirjoitetaan?",genericWrong:"Muista kirjoittamista tarkoittava verbi."}},
    {id:"summary",phase:"Yhteenveto",kind:"summary",title:"Ymmärsit alkuperäisen tilanteen",
      paragraphs:[
        "Luit viisi alkuperäistä vuoroa, erotit Franzin ja Auskunftin tehtävät ja selvitit, miksi nimeä tavataan sekä mitä zweimal L tarkoittaa.",
        "Kolmen C07-SOURCE-Q01–Q03-tehtävän vastaukset on tarkistettava erikseen oppikirjassa ennen tunnin läpikäyntimerkintää. Tekstin ymmärtäminen ei synnytä kuuntelupisteitä.",
        "L038:ssa siirryt vähitellen kirjaimista omaan tavaukseen ja tuttujen numeroiden tunnistamiseen.",
      ]},
  ],
};
