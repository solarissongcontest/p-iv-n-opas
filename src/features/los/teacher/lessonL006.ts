import { losExercisesFor } from "../exerciseBank.ts";
import type { TeacherLesson } from "./engine.ts";

/**
 * L006 is a chapter review and assessment session, not a second exam.
 * The 12 scored items, submission timestamp, free-writing and self-assessment
 * live ONLY in the existing C01 textbook draft. This lesson observes real
 * saved evidence and never awards automatic speaking or CEFR proficiency.
 */
const C01_TEST_IDS = losExercisesFor("01").map(item => item.id);
export const LOS1_L006_TEACHER: TeacherLesson = {
  id:"L006",bookId:1,chapterId:"01",version:"2.0.0-preview.1",
  title:"Harjoittele ja testaa C01",
  objective:"Sovellan C01:n tervehdyksiä kahdessa tilanteessa, palautan kappaletestin ja arvioin omaa osaamistani.",
  estimatedMinutes:30,
  requiredQuestionIds:["recall","guided","independent","exit"],
  requiredActivityIds:["culture-reviewed"],
  requiredPracticeIds:[],
  chapterAssessment:{
    requiredTestIds:C01_TEST_IDS,
    requireApplicationDraft:true,
    minSelfAssessmentLength:15,
  },
  scenes:[
    {
      id:"welcome",phase:"Aloitus",kind:"introduction",
      title:"Kertaus ja kappaletesti ovat kaksi eri asiaa",
      paragraphs:[
        "Olet jo tutustunut C01:n sanoihin, kahdeksan repliikin keskusteluun ja tervehdysten käyttötilanteisiin. Tänään harjoittelemme niiden soveltamista ja teemme kappaletestin.",
        "Opettaja kertaa ensin ajattelutavan ja näyttää mallin. Vasta sen jälkeen kirjoitat oman vastauksesi kirjaan, teet 12 osatehtävän testin ilman vihjeitä ja kirjaat itsearvioinnin.",
        "Tunnin läpikäynti merkitään vasta oikeasti palautetun kappaletestin sekä kirjoitetun oman vastauksen ja itsearvioinnin perusteella. Arvosanaa tai CEFR-tasoa ei myönnetä.",
      ],
    },
    {
      id:"recall",phase:"Muistelu",kind:"question",
      title:"Muistatko tervehdyksen ja hyvästelyn eron?",
      paragraphs:["Kokeile ensin ilman sanastolistaa. Tämä on harjoittelukysymys, ei kappaletestin piste."],
      question:{
        type:"choice",skillId:"L1-INT-01",
        prompt:"Ystäväsi on lähdössä pois. Mikä ilmaus sopii tähän tilanteeseen?",
        options:[
          {id:"a",label:"Guten Morgen!",wrongFeedback:"Morgen tarkoittaa aamua. Tämä on aamun tervehdys."},
          {id:"b",label:"Tschüss!"},
          {id:"c",label:"Guten Abend!",wrongFeedback:"Abend tarkoittaa iltaa. Tämä on illan tervehdys, ei arkinen hyvästely."},
        ],
        correctOption:"b",success:"Oikein. Tschüss! on rento hyvästely.",
        hint:"Mieti, kumpi ilmaus päättää kohtaamisen.",
        reteach:"Hallo! aloittaa kohtaamisen. Tschüss! päättää sen. Guten Morgen! ja Guten Abend! aloittavat kohtaamisen vuorokaudenajan mukaan.",
        genericWrong:"Kysymyksessä ystävä lähtee, joten etsi hyvästely.",
      },
    },
    {
      id:"method",phase:"Opetus",kind:"explanation",
      title:"Näin valitset oikean ilmauksen",
      paragraphs:[
        "Ensin kysyn: alkaako vai päättyykö kohtaaminen? Jos alkaakin, voin sanoa Hallo! tai valita vuorokaudenajan tervehdyksen. Jos päättyy, valitsen hyvästelyn.",
        "Seuraavaksi mietin, kenen kanssa puhun. Tutun ystävän voin hyvästellä sanomalla Tschüss!. Kohteliaassa tilanteessa sopii Auf Wiedersehen!.",
        "Guten Abend! tarkoittaa hyvää iltaa. Gute Nacht! tarkoittaa hyvää yötä ja sopii erityisesti nukkumaan menevälle. Niitä ei vaihdeta mielivaltaisesti keskenään.",
        "Tätä kolmen kysymyksen mallia käytät ensin yhdessä opettajan kanssa ja sitten omissa tilanteissasi.",
      ],
      help:[
        {title:"Saanko sanoa aina Hallo?",body:"Monissa arkisissa kohtaamisissa kyllä, mutta harjoittelemme myös vuorokaudenajan ja kohteliaisuuden ilmaisuja. Esimerkiksi Guten Morgen! osoittaa, että kyse on aamusta."},
        {title:"Entä kun joku menee nukkumaan?",body:"Silloin tavallinen toivotus on Gute Nacht!. Se ei tarkoita samaa kuin Guten Abend!, jota käytetään illalla tervehdittäessä."},
      ],
    },
    {
      id:"model",phase:"Mallisuoritus",kind:"board",
      title:"Ratkaise tilanne askel kerrallaan",
      paragraphs:[
        "Tilanne: tulen aamulla koululle ja tapaan opettajan. Myöhemmin hyvästelen ystävän.",
        "Opettaja ei aloita valitsemalla satunnaista saksankielistä fraasia. Seuraa ensin tilannetta ja vasta sitten lopullista ilmaisua.",
      ],
      board:[
        {label:"1 · Koululla aamulla",german:"Guten Morgen!",meaning:"Kohtaaminen alkaa aamulla: hyvää huomenta."},
        {label:"2 · Tarkistan tilanteen",german:"Hallo!",meaning:"Myös yleinen hei voi aloittaa arkisen kohtaamisen, mutta tässä harjoittelemme ajan ilmaisemista."},
        {label:"3 · Ystävä lähtee",german:"Tschüss!",meaning:"Kohtaaminen päättyy tuttavan kanssa: moikka."},
        {label:"4 · Kohteliaampi hyvästely",german:"Auf Wiedersehen!",meaning:"Näkemiin. Tätä ei sekoiteta aamun tervehdykseen."},
      ],
    },
    {
      id:"guided",phase:"Ohjattu harjoitus",kind:"question",
      title:"Kokeile eri vuorokaudenaikaa",
      paragraphs:["Tässä tapaaminen vasta alkaa. Valitse siis tervehdys, ei hyvästely."],
      question:{
        type:"choice",skillId:"L1-INT-01",
        prompt:"Tapaat tuttavan illalla. Mikä ilmaus huomioi illan?",
        options:[
          {id:"a",label:"Gute Nacht!",wrongFeedback:"Tämä on hyvän yön toivotus, ei tavallinen illalla saapuvan tervehdys."},
          {id:"b",label:"Guten Abend!"},
          {id:"c",label:"Auf Wiedersehen!",wrongFeedback:"Tämä on kohtelias hyvästely. Tapaaminen vasta alkaa."},
        ],
        correctOption:"b",success:"Oikein. Guten Abend! on illan tervehdys.",
        hint:"Ilta on Abend. Etsi sitä vastaava tervehdys.",
        reteach:"Guten Abend! on illan tervehdys. Gute Nacht! toivottaa hyvää yötä ja Auf Wiedersehen! päättää tapaamisen.",
        genericWrong:"Keskity siihen, että kohtaaminen alkaa illalla.",
      },
    },
    {
      id:"apply",phase:"Oma sovellus",kind:"book",
      title:"Kirjoita kaksi omaa tilannetta kirjaan",
      paragraphs:[
        "Avaa kirjan Käytä saksaa -osio. Kirjoita omille riveilleen tervehdys aamulla tavatulle opettajalle ja hyvästely tutulle ystävälle. Älä kopioi näkyvää mallia, vaan kokeile ensin itse.",
        "Kirjan oma mallivastaus avautuu vasta oman yrityksesi jälkeen. Tarkista siinä tervehdysten tilanteet ja kirjoitusasu. Sovellusteksti säilyy kirjan nykyisessä tallennuksessa.",
        "Tekstin olemassaolo osoittaa, että harjoitus on kirjoitettu, ei sitä, että sen saksan kieli olisi automaattisesti tarkistettu oikein.",
      ],
      bookLinks:[{label:"C01 · Käytä saksaa",chapterId:"01",section:"apply",instruction:"Kirjoita molemmat ilmaukset ja tarkista itse kirjan tarkistuslistalla."}],
      help:[{title:"En muista ilmausta",body:"Katso opetustaulusta tilanteiden erot. Voit palata kirjaan ja harjoitella uudelleen ennen testin aloittamista."}],
    },
    {
      id:"culture",phase:"Kulttuuri",kind:"book",
      title:"Tunnista, mutta älä vielä opettele kaikkea ulkoa",
      paragraphs:[
        "Saksan tervehdyksissä on alueellista vaihtelua. Voit kohdata esimerkiksi ilmaukset Moin! ja Servus!. Ne voivat näkyä kuvissa tai lähdeteksteissä, vaikka et vielä tarvitsisi niitä aktiiviseen käyttöön.",
        "Lue C01:n Kulttuuri-sivu ja sen lähteet. Keskity ymmärtämään, että tilanteen ja alueen mukaan tervehdys voi vaihdella.",
        "Vahvista lukeneesi sivun. Se on lukemisen harjoittelumerkintä, ei tarkistettu kulttuuritiedon osaamisnäyttö.",
      ],
      bookLinks:[{label:"C01 · Kulttuuri",chapterId:"01",section:"culture",instruction:"Tutustu alueellisiin tervehdyksiin ja kuviin."}],
      activityId:"culture-reviewed",activityLabel:"Tutustuin C01:n kulttuurisivuun",
    },
    {
      id:"independent",phase:"Muistista soveltaminen",kind:"question",
      title:"Valitse itsenäisesti ilman näkyvää mallia",
      paragraphs:["Sulje sanastolista. Tässä sovelletaan hyvästelyä kohteliaassa tilanteessa."],
      question:{
        type:"text",skillId:"L1-INT-01",evidenceRole:"independent",
        prompt:"Kirjoita saksaksi kohtelias hyvästely: Näkemiin!",
        accepted:["Auf Wiedersehen!"],success:"Oikein. Kirjoitit kohteliaan hyvästelyn.",
        hint:"Fraasi alkaa sanalla Auf ja loppuu sanaan Wiedersehen.",
        reteach:"Auf Wiedersehen! tarkoittaa näkemiin. Tschüss! on arkinen vaihtoehto tutulle; tämä tehtävä pyytää kohteliasta ilmausta.",
        genericWrong:"Tarkista molemmat sanat ja isojen alkukirjainten paikat.",
        wrongAnswers:{"tschüss":"Tschüss! on oikein arkisena hyvästelynä, mutta nyt pyydettiin kohteliasta näkemiin-ilmausta.","guten abend":"Guten Abend! tarkoittaa hyvää iltaa ja kuuluu tervehdyksiin."},
      },
    },
    {
      id:"test-info",phase:"Kappaletestin ohje",kind:"explanation",
      title:"Mitä oikea kappaletesti mittaa?",
      paragraphs:[
        "C01:n kirjan kappaletestissä on 12 automaattisesti tarkistettavaa osatehtävää. Ne testaavat opetettuja tervehdyksiä, sanastoa ja muutamaa ääntämissääntöä.",
        "Vastaa tehtäviin ilman avointa mallivastausta. Kirja näyttää yksittäisten tehtävien ratkaisut vasta testin palauttamisen jälkeen.",
        "Vääristä vastauksista saat silloin perustelut. Saat kerrata ja uusia testin niin, että aikaisempi tulos arkistoidaan. Sama tehtäväpankki on kuitenkin toistaiseksi käytössä myös uusinnassa.",
        "Kappaletestin pistemäärä ei ole kielitaitotodistus, eikä testi automaattisesti arvioi puhettasi tai tekstin vapaata tuottamista.",
      ],
      help:[{title:"Pitääkö saada kaikki oikein?",body:"Ei. Tämän tunnin läpikäynti vaatii testin palautuksen, ei keinotekoista 100 prosentin pistemäärää. Palaute auttaa päättämään, mitä harjoittelet uudelleen."}],
    },
    {
      id:"test",phase:"Oikea kappaletesti",kind:"book",
      title:"Palauta C01:n 12 osatehtävän testi",
      paragraphs:[
        "Avaa oppikirjan Kappaletesti. Vastaa kaikkiin 12 osatehtävään itse ja paina Palauta testi. Tämä opetusnäkymä ei luo toista koetta.",
        "Jos osa vastauksista on vielä tyhjiä, kirja ei salli palautusta. Kun testi on oikeasti palautettu, näet kirjan pisteet ja selitykset.",
        "Palattuasi oppitunnille näet tässä tallennetun testin tilan. Pelkkä testin avaaminen tai vastausten kirjoittaminen ilman palautusta ei riitä.",
      ],
      bookLinks:[{label:"C01 · Kappaletesti",chapterId:"01",section:"test",instruction:"Täytä 12 osatehtävää ja paina Palauta testi. Katso perustelut palautuksen jälkeen."}],
    },
    {
      id:"reflection",phase:"Itsearviointi",kind:"book",
      title:"Arvioi oma puhe- ja kirjoitustaitosi",
      paragraphs:[
        "Palautuksen jälkeen samalta testisivulta löytyy Itsearviointi. Kuvittele aamun tervehdys opettajalle ja tuttavan hyvästely. Kokeile sanoa molemmat ilman mallia tai tee harjoitus äänettömästi kirjoittamalla.",
        "Kirjoita, mitä osasit itsenäisesti ja mitä haluat harjoitella lisää. Vähintään 15 merkkiä kertoo, että olet kirjannut havainnon; se ei osoita vastauksesi oikeellisuutta.",
        "LOS! ei pisteytä omaa ääntämistäsi eikä luo oma-aloitteisesta itsearvioinnista ulkopuolista kielitasoa.",
      ],
      bookLinks:[{label:"C01 · Kappaletestin itsearviointi",chapterId:"01",section:"test",instruction:"Palauta testi ensin, kirjoita sitten oma havaintosi itsearviointikenttään."}],
    },
    {
      id:"exit",phase:"Lopputarkistus",kind:"question",
      title:"Viimeinen tilanne ilman mallia",
      paragraphs:["Kokeile vielä yhtä tilanteen vaihtoa. Vastaus ei muuta kirjan kokeen pisteitä."],
      question:{
        type:"choice",skillId:"L1-INT-01",evidenceRole:"exit",
        prompt:"Ystäväsi on menossa nukkumaan. Mitä toivotat hänelle?",
        options:[
          {id:"a",label:"Guten Abend!",wrongFeedback:"Guten Abend! tervehtii illalla. Tässä on kyse hyvän yön toivotuksesta."},
          {id:"b",label:"Gute Nacht!"},
          {id:"c",label:"Guten Morgen!",wrongFeedback:"Guten Morgen! on aamun tervehdys."},
        ],
        correctOption:"b",success:"Oikein. Gute Nacht! tarkoittaa hyvää yötä.",
        hint:"Yö on Nacht. Etsi hyvän yön toivotus.",
        reteach:"Guten Abend! aloittaa illan kohtaamisen. Gute Nacht! sopii nukkumaan menevälle.",
        genericWrong:"Mieti, mikä ilmaus liittyy nukkumaanmenoon.",
      },
    },
    {
      id:"summary",phase:"Yhteenveto",kind:"summary",
      title:"C01 on kerrattu. Mitä seuraavaksi?",
      paragraphs:[
        "Kävit läpi tervehdyksen valinnan, kirjoitit oman sovelluksen, tutustuit kulttuuritekstiin ja palautit kirjan varsinaisen kappaletestin sekä itsearvioinnin.",
        "Jos jokin meni väärin, palaa kirjan perusteluihin ja harjoittele samoja tilanteita myöhemmin. Harjoituskysymyksestä saatu vihje ei ole itsenäinen osaamisnäyttö.",
        "C01:n läpikäyminen ei anna virallista A1- tai CEFR-tasoa. Seuraava kappale C02 opettaa, kuinka nimi kysytään ja kerrotaan.",
      ],
    },
  ],
};
