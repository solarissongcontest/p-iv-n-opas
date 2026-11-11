/** LOS! 1 Kertaus I. These 15 tasks are newly authored mixed retrieval,
 * not answer-key copies of source texts or earlier chapter tests.
 * Reflection text is saved via the existing lesson notes record.
 */
import type {ContentBlock,Exercise} from "./model";
const b={version:"0.1.0",difficulty:"applied" as const,objectives:["L1-INT-01","L1-INT-02","L1-INT-03","L1-INT-04","L1-INT-05"]};
const choice=(id:string,promptFi:string,labels:[string,string,string],right:number,explanationFi:string):Exercise=>({
  ...b,id:"los1-review1-"+id,type:"single-choice",promptFi,explanationFi,
  options:labels.map((label,i)=>({id:"choice-"+i,label})),correctOptionId:"choice-"+right,
});
const gap=(id:string,promptFi:string,before:string,after:string,correct:string,explanationFi:string):Exercise=>({
  ...b,id:"los1-review1-"+id,type:"gap-fill",promptFi,
  sentenceBefore:before,sentenceAfter:after,acceptedAnswers:[correct],explanationFi,
});
export const LOS1_REVIEW_ONE_BLOCKS:ContentBlock[]=[
  {id:"los1-review1-intro-a",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Kertaus I 1/3. Nyt haetaan mieleen jo opittuja tervehdyksiä, nimiä ja lähtöpaikkoja "
      +"ilman uusia kielioppisääntöjä. Yritä ensin ilman oppikirjan sanastoa. "
      +"Jos vastaus menee väärin, lue selitys ja palaa C01–C03:n teksteihin. "
      +"Tämän tunnin loppuun riittää tehtävien tarkistaminen sekä yksi oma muistamisen arvio, "
      +"ei täydellinen pistemäärä."},
  {id:"los1-review1-intro-b",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Kertaus I 2/3. Vaihtelet tuttavaa ja kohteliasta puhuttelua, sekä hyvää "
      +"että heikompaa vointia. Älä arvaa vastausta vain ensimmäisestä sanasta: "
      +"tarkista, esiintyvätkö du/dir vai Sie/Ihnen ja millainen verbimuoto tarvitaan. "
      +"Saat harjoitella omassa tahdissa, eikä virhe alenna oppitunnin hyväksymistä."},
  {id:"los1-review1-intro-c",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Kertaus I 3/3. Kuuntele aiemmin opittuja, oikeiden ihmisten nauhoittamia "
      +"ääniä uudelleen: Franzin ja Jörgin dialogi, Franzin ja Gretan toinen dialogi, "
      +"Ariserin kaupunkidialogi ja ihmisen lausuma tervehdyssarja. "
      +"Litteraatit ovat jo oppikirjassa. Voit kuunnella ensin ilman tekstiä "
      +"ja tarkistaa sen jälkeen alkuperäiset repliikit. Ääntä ei ole leikattu "
      +"kuvitteellisiksi lisähaastatteluiksi. Äänitteiden todellinen laitetestaus on kesken."},
];
export const LOS1_REVIEW_ONE_EXERCISES:Exercise[]=[
  choice("a01","Kuvitteellinen uusi tuttava sanoo Hallo!. Mikä vastaus sopii?",
    ["Tschüss!","Hallo!","Gute Nacht!"],1,"Hallo! on tavallinen tervehdys."),
  gap("a02","Täydennä tuttu nimikysymys.","Wie","du?","heißt",
    "Wie heißt du? kysyy tuttavan nimeä."),
  choice("a03","Kuvitteellisen henkilön nimi on Marie. Millä hän esittelee itsensä?",
    ["Ich heiße Marie.","Du heißt Marie.","Ich kommst Marie."],0,
    "Ich heiße Marie. kertoo oman nimen."),
  gap("a04","Täydennä alkuperän kertominen.","Ich","aus Finnland.","komme",
    "Ich komme aus Finnland on oikein."),
  choice("a05","Mikä on kohteliaampi hyvästely kuin Tschüss!?",
    ["Guten Morgen!","Hallo!","Auf Wiedersehen!"],2,
    "Auf Wiedersehen! on tavallinen kohtelias hyvästely."),
  choice("b01","Tutun kysymys 'Mitä kuuluu?' on saksaksi…",
    ["Wie geht es dir?","Wie alt sind Sie?","Woher kommen Sie?"],0,
    "Wie geht es dir? kysyy tuttavan vointia."),
  gap("b02","Täydennä kohtelias nimikysymys.","Wie","Sie?","heißen",
    "Wie heißen Sie? käyttää muotoa heißen."),
  choice("b03","Vieras aikuinen kysyy Woher kommen Sie?. Mikä on sopiva vastaus?",
    ["Wie heißt du?","Ich komme aus Finnland.","Ich kommst aus Finnland."],1,
    "Ich komme aus Finnland. sopii myös kohteliaaseen alkuperäkysymykseen."),
  choice("b04","Mikä tarkoittaa 'ei kovin hyvin'?",
    ["Sehr gut.","Toll!","Nicht so gut."],2,
    "Nicht so gut. kertoo heikommasta voinnista."),
  gap("b05","Täydennä kohtelias vastakysymys.","Und","?","Ihnen",
    "Und Ihnen? tarkoittaa 'Entä teille?'."),
  choice("c01","Franzin ja Jörgin alkuperäinen dialogi: millä Franz aloittaa?",
    ["Hallo, wie heißt du?","Auf Wiedersehen!","Ich komme aus Kiel."],0,
    "Franz aloittaa Hallo, wie heißt du?"),
  choice("c02","Wikibooksin Franz–Greta-dialogissa Greta kertoo nimensä. Mikä on hänen vastauksensa?",
    ["Ich heiße Berna.","Ich heiße Greta.","Ich bin Peter."],1,
    "Greta sanoo Ich heiße Greta."),
  choice("c03","Ariserin alkuperäisdialogissa Takashi on kotoisin mistä kaupungista?",
    ["Kyoto","Kiel","Wien"],0,
    "Takashi sanoo olevansa kotoisin Kiotosta."),
  choice("c04","Ariserin alkuperäisdialogissa Thomas ja Peter ovat kotoisin…",
    ["Zürichistä","Berliinistä","Helsingistä"],1,
    "Thomas ilmoittaa: Wir kommen aus Berlin."),
  choice("c05","Tervehdysäänitteen 20 alkuperäisen ilmauksen joukossa on mikä kohtelias hyvästely?",
    ["Wie heißen Sie?","Woher kommst du?","Auf Wiedersehen!"],2,
    "Äänitteessä esiintyy Auf Wiedersehen!."),
];
