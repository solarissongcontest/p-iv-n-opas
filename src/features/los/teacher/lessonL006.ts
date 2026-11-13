import type { TeacherLesson } from "./engine.ts";

/**
 * LOS! 1 L006: C01 teaching, authentic language in the original book,
 * a new written encounter and the actual submitted chapter test.
 * Textual open responses are NOT automatically scored for proficiency.
 * Editorial preview until language, didactic and hardware review.
 */
export const LOS1_L006_TEACHER: TeacherLesson = {
  id:"L006",bookId:1,chapterId:"01",version:"2.0.0-preview.1",
  title:"Harjoittele ja testaa C01",
  objective:"Käytän tervehdyksiä uusissa tilanteissa, kirjoitan oman kohtaamisen ja palautan C01-kappaletestin itsearviointeineen.",
  estimatedMinutes:30,
  requiredQuestionIds:["recall","guided","transfer","exit"],
  requiredActivityIds:["culture-studied","application-reviewed"],
  requiredPracticeIds:[],
  requiredChapterEvidence:["application-written","test-submitted","self-assessment"],
  scenes:[
    {
      id:"welcome",phase:"Aloitus",kind:"introduction",
      title:"Ensimmäisen kappaleen kertaus on enemmän kuin pisteet",
      paragraphs:[
        "Olet tutustunut ensimmäisen kappaleen tervehdysfraaseihin, ääntämisen alkeisiin ja oikeisiin saksankielisiin lähdeteksteihin. Tänään käytät tuttuja ilmauksia itse ja tarkistat, mitä osaat vielä ilman mallia.",
        "Oppitunti sisältää kolme oikeaa kirjatyötä: kirjoitat lyhyen kohtaamisen Käytä saksaa -sivulla, palautat kappaletestin ja teet sen jälkeen oman itsearviointisi. Kaikki tallennetaan kirjan olemassa oleviin kenttiin.",
        "Kappaletesti tarkistaa rajattuja muoto- ja fraasivalintoja. Sen tulos ei arvioi automaattisesti kirjoitustasi, puhumistasi tai kuunteluasi eikä anna virallista kielitaitotasoa.",
      ],
    },
    {
      id:"recall",phase:"Aktivointi",kind:"question",
      title:"Muistatko vielä, mikä on tervehdys?",
      paragraphs:[
        "Kokeile ilman sanalistaa. Erota kohtaamisen aloitus ja lopetus; mieti ennen kaikkea tilanteen tarkoitusta.",
      ],
      question:{
        type:"choice",skillId:"L1-INT-01",
        prompt:"Tulet kouluun aamulla ja tapaat opettajan. Mitä sanot?",
        options:[
          {id:"a",label:"Guten Morgen!"},
          {id:"b",label:"Gute Nacht!",wrongFeedback:"Gute Nacht! on hyvän yön toivotus, ei aamulla tervehtimistä."},
          {id:"c",label:"Tschüss!",wrongFeedback:"Tschüss! on hyvästely. Olet vasta saapunut kouluun."},
        ],
        correctOption:"a",success:"Oikein. Guten Morgen! on sopiva aamun tervehdys.",
        hint:"Morgen tarkoittaa aamua.",
        reteach:"Guten Morgen! = hyvää huomenta. Gute Nacht! = hyvää yötä. Tschüss! = moikka, kun lähdet.",
        genericWrong:"Etsi aamun alkutervehdys.",
      },
    },
    {
      id:"principle",phase:"Opettajan selitys",kind:"explanation",
      title:"Valitse ilmaus kolmessa vaiheessa",
      paragraphs:[
        "Ensiksi kysy, onko kohtaaminen alkamassa vai päättymässä. Saksaksi Hallo! sopii usein alkutervehdykseksi, mutta Tschüss! kuuluu tavallisesti hyvästelyyn.",
        "Toiseksi huomioi vuorokaudenaika. Aamulla Guten Morgen!, päivällä Guten Tag! ja illalla Guten Abend! ovat tavallisia tervehdyksiä. Gute Nacht! on tavallinen hyvän yön toivotus.",
        "Kolmanneksi huomioi, kuinka hyvin tunnet toisen ihmisen. Tschüss! on tuttavallinen hyvästely. Auf Wiedersehen! on kohteliaampi ja sopii myös virallisiin tilanteisiin.",
        "Esimerkiksi koulupäivän alussa opettajalle voit sanoa Guten Morgen! ja koulupäivän jälkeen ystävälle Tschüss! Sama sana ei ole automaattisesti paras molempiin tilanteisiin.",
      ],
      help:[
        {title:"Miten Guten Abend ja Gute Nacht eroavat?",body:"Guten Abend! tervehditään illalla. Gute Nacht! toivotetaan yleensä nukkumaan mentäessä tai hyvästellessä yöksi. Pelkkä kellonaika ei muuta niitä synonyymeiksi."},
        {title:"Miksi Tschüss ei aina ole paras?",body:"Tschüss! on tavallinen rento hyvästely. Esimerkiksi vieraan aikuisen kohteliaassa hyvästelyssä Auf Wiedersehen! on turvallinen perusilmaus."},
      ],
    },
    {
      id:"board",phase:"Näytetty mallisuoritus",kind:"board",
      title:"Rakenna oikea vastaus tilanteen perusteella",
      paragraphs:[
        "Opettajan taulu näyttää, miten tervehdys valitaan merkityksen perusteella. Lue jokainen tilanne ja sano siihen sopiva ilmaus itse ennen kuin avaat seuraavan kortin.",
        "Tavoitteena ei ole arvata saksalaista sanaa ulkoa vaan perustella, miksi se sopii tilanteeseen.",
      ],
      board:[
        {label:"1. Kohtaaminen alkaa aamulla",german:"Guten Morgen!",meaning:"Hyvää huomenta! · aloitus ja aamu"},
        {label:"2. Kohtaaminen alkaa illalla",german:"Guten Abend!",meaning:"Hyvää iltaa! · aloitus ja ilta"},
        {label:"3. Ystävä lähtee",german:"Tschüss!",meaning:"Moikka! · tuttavallinen hyvästely"},
        {label:"4. Vieras aikuinen lähtee",german:"Auf Wiedersehen!",meaning:"Näkemiin! · kohtelias hyvästely"},
        {label:"5. Ystävä on menossa nukkumaan",german:"Gute Nacht!",meaning:"Hyvää yötä! · yöksi hyvästely"},
      ],
    },
    {
      id:"guided",phase:"Ohjattu harjoittelu",kind:"question",
      title:"Mikä hyvästely sopii uuteen tilanteeseen?",
      paragraphs:[
        "Kuvittele, että puhut ensi kertaa vieraan aikuisen kanssa. Keskustelu päättyy. Valitse kohtelias, tilanteeseen sopiva hyvästely.",
      ],
      question:{
        type:"choice",skillId:"L1-INT-01",
        prompt:"Miten hyvästelet vieraan aikuisen kohteliaasti?",
        options:[
          {id:"a",label:"Auf Wiedersehen!"},
          {id:"b",label:"Guten Tag!",wrongFeedback:"Guten Tag! sopii päiväsaikaan tervehtimiseen. Tässä tilanteessa hyvästellään."},
          {id:"c",label:"Guten Morgen!",wrongFeedback:"Guten Morgen! on aamun alkutervehdys, ei kohtelias hyvästely."},
        ],
        correctOption:"a",success:"Oikein. Auf Wiedersehen! on tavallinen kohtelias hyvästely.",
        hint:"Etsi ilmaus, jonka suomenkielinen merkitys on näkemiin.",
        reteach:"Auf Wiedersehen! tarkoittaa näkemiin. Sen voi sanoa kohteliaasti myös ihmiselle, jota ei tunne ennestään.",
        genericWrong:"Kohtaaminen on päättymässä. Valitse hyvästely.",
      },
    },
    {
      id:"culture",phase:"Kulttuuri",kind:"book",
      title:"Moin ja Servus ovat tunnistamissanastoa",
      paragraphs:[
        "Saksankielisessä maailmassa kaikki eivät tervehdi samalla tavalla. Moin! on tavallinen varsinkin Pohjois-Saksassa ja voi kuulua myös muulloin kuin aamulla.",
        "Servus! on tuttu etenkin eteläisillä saksankielisillä alueilla, ja sitä voidaan käyttää sekä tervehtimiseen että hyvästelyyn.",
        "Näitä alueellisia ilmauksia ei tarvitse vielä itse käyttää tai kirjoittaa kokeessa. Riittää, että tunnistat niitä kirjan kulttuurisivulla.",
      ],
      bookLinks:[{label:"Avaa C01:n kulttuurisivu",chapterId:"01",section:"culture",instruction:"Lue Moin!- ja Servus!-esimerkit ja huomaa, missä yhteydessä niitä käytetään."}],
      activityId:"culture-studied",activityLabel:"Luin kulttuurisivun ja tunnistin kaksi alueellista tervehdystä",
    },
    {
      id:"transfer",phase:"Itsenäinen soveltaminen",kind:"question",
      title:"Kirjoita kohtelias hyvästely muistista",
      paragraphs:[
        "Sulje mallitaulu ja kirjoita sopiva kokonainen ilmaus ilman vihjettä. Jos tarvitset apua, saat sitä, mutta yritys ei silloin ole täysin itsenäinen näyttö.",
      ],
      question:{
        type:"text",skillId:"L1-INT-01",evidenceRole:"independent",
        prompt:"Kirjoita saksaksi kohtelias 'Näkemiin!' vieraan aikuisen kanssa keskusteltuasi.",
        accepted:["Auf Wiedersehen!"],success:"Oikein. Kirjoitit kohteliaan hyvästelyn kokonaisena.",
        hint:"Ilmaus alkaa sanalla Auf ja jatkuu sanalla Wiedersehen.",
        reteach:"Auf Wiedersehen! on kohtelias hyvästely. Tschüss! on arkisempi. Kokeile vielä ilman mallia myöhemmin.",
        genericWrong:"Tarkista, että kirjoitit kaksi sanaa ja valitsit kohteliaan hyvästelyn.",
        wrongAnswers:{"tschüss":"Tschüss! on tavallinen rento hyvästely. Tehtävässä pyydetään kohteliasta näkemiin-ilmausta.",
          "guten tag":"Guten Tag! on alkutervehdys, ei hyvästely."},
      },
    },
    {
      id:"writing",phase:"Käytä saksaa",kind:"book",
      title:"Kirjoita oma kohtaaminen kirjan oikeaan tehtävään",
      paragraphs:[
        "Avaa C01:n Käytä saksaa -sivu. Kirjan tehtävässä tulet kouluun aamulla ja tervehdit opettajaa. Myöhemmin hyvästelet tutun ystävän.",
        "Kirjoita kaksi saksankielistä ilmausta kirjan omaan vastauskenttään eri riveille. Käytä esimerkiksi aamun tervehdystä ja ystävän rentoa hyvästelyä; älä kopioi mallia ennen omaa yritystä.",
        "Tarkista kirjoitusasu ja se, että kumpikin ilmaus sopii tilanteeseen. Voit avata mallivastauksen vasta oman yrityksen jälkeen. Tekstisi tallentuu suoraan kirjan applicationDraft-kenttään.",
        "LOS ei väitä automaattisesti tarkistavansa tämän avoimen kirjavastauksen koko kielioppia. Oma kirjoitus ja sen perustelu ovat osa oppimistasi.",
      ],
      bookLinks:[{label:"Avaa C01 · Käytä saksaa",chapterId:"01",section:"apply",instruction:"Kirjoita kaksi omaa tilanneilmausta ja tarkista niiden sopivuus."}],
      activityId:"application-reviewed",activityLabel:"Kirjoitin ja tarkistin oman kohtaamiseni kirjassa",
    },
    {
      id:"compare",phase:"Kappaletesti",kind:"explanation",
      title:"Mitä kappaletesti mittaa, ja mitä se ei mittaa?",
      paragraphs:[
        "Kirjan C01-kappaletesti sisältää alkeiden muoto-, sanasto- ja fraasivalintoja. Jokaiseen kysymykseen valitaan tai kirjoitetaan vastaus ilman näkyvää mallia.",
        "Käytä testin tulosta ymmärtääksesi, mitkä tilanteet tunnistat jo oikein. Väärän vastauksen perustelu kertoo, mitä pitää vielä harjoitella.",
        "Testi ei mittaa suullista vuorovaikutusta eikä yksin osoita koko saksan kielitaidon tasoa. Äänen kuuntelemista ei myöskään voi päätellä testin kirjallisista vastauksista.",
        "Älä sekoita oppitunnin suoritusmerkintää ja osaamisen näyttöä. Testin palauttaminen on todellinen opiskeluteko, mutta yksittäinen pisteprosentti ei vielä tarkoita pysyvää osaamista.",
      ],
    },
    {
      id:"chapter-test",phase:"Kirjan kappaletesti",kind:"book",
      title:"Tee ja palauta oikea C01-kappaletesti",
      paragraphs:[
        "Avaa oppikirjan Kappaletesti-sivu ja vastaa kaikkiin sen osatehtäviin. Kun kaikki ovat vastattuina, paina Palauta testi.",
        "Palaa sen jälkeen takaisin tähän oppituntiin. Pelkkä testisivun avaaminen tai yksittäisten vastausten kirjoittaminen ei merkitse testiä palautetuksi.",
        "LOS tarkistaa nykyisen C01-testin palautusmerkinnän. Vasta palautettu testi voi täyttää tämän oppitunnin valmistumisehdon.",
      ],
      bookLinks:[{label:"Avaa C01 · Kappaletesti",chapterId:"01",section:"test",instruction:"Vastaa testiin ja paina Palauta testi. Pelkkä luonnos ei riitä."}],
    },
    {
      id:"feedback",phase:"Palautteen käsittely",kind:"book",
      title:"Kirjaa oma arvio palautetun testin jälkeen",
      paragraphs:[
        "Kun olet palauttanut testin, kirjan Kappaletesti-sivulle ilmestyy Itsearviointi-kenttä. Kirjoita sinne, mikä onnistui ilman apua ja mikä kaipaa vielä harjoittelua.",
        "Voit mainita esimerkiksi, osaatko tervehtiä opettajaa aamulla ja hyvästellä ystävän. Kerro myös yksi ilmaus, johon haluat palata.",
        "Itsearviointia ei pisteytetä automaattisesti. Kirjoitettu havainto ja testin tulos voivat ohjata myöhempää kertausta, mutta eivät yksin anna virallista kielitaitotasoa.",
      ],
      bookLinks:[{label:"Avaa palautettu C01-testi ja itsearviointi",chapterId:"01",section:"test",instruction:"Täytä testin jälkeen kenttä 'Mitä osasin? Mitä täytyy vielä harjoitella?'."}],
    },
    {
      id:"exit",phase:"Lopputarkistus",kind:"question",
      title:"Vielä yksi uusi arkinen tilanne",
      paragraphs:[
        "Vastaa ilman näkyvää mallia. Jos vastaus ei onnistu, voit palata opetustauluun ja yrittää uudelleen. Harjoittelu ei ole sama asia kuin itsenäinen osaaminen.",
      ],
      question:{
        type:"choice",skillId:"L1-INT-01",evidenceRole:"exit",
        prompt:"Ystäväsi on menossa nukkumaan. Millä ilmauksella toivotat hyvää yötä?",
        options:[
          {id:"a",label:"Guten Tag!",wrongFeedback:"Guten Tag! on päivätervehdys."},
          {id:"b",label:"Guten Abend!",wrongFeedback:"Guten Abend! tervehditään illalla, mutta se ei tavallisesti tarkoita hyvän yön toivotusta."},
          {id:"c",label:"Gute Nacht!"},
        ],
        correctOption:"c",success:"Oikein. Gute Nacht! on hyvän yön toivotus.",
        hint:"Yötä tarkoittaa Nacht.",
        reteach:"Guten Abend! = hyvää iltaa tervehdyksessä. Gute Nacht! = hyvää yötä hyvästeltäessä tai nukkumaan mentäessä.",
        genericWrong:"Valitse ilmaus, jolla toivotat hyvää yötä.",
      },
    },
    {
      id:"summary",phase:"Yhteenveto",kind:"summary",
      title:"Ensimmäisen kappaleen opetus on käsitelty",
      paragraphs:[
        "Kertasit tervehdyksiä erilaisissa tilanteissa, kirjoitit kirjaan oman kohtaamisen ja palautit rajattuja kielitaitoja mittaavan kappaletestin.",
        "Jos et vielä palauttanut testiä tai kirjoittanut itsearviointia, voit jatkaa tästä myöhemmin. Opettaja tunnistaa kirjaan tallennetut tehtävät ilman erillistä kopiointia.",
        "Tässä on kyse oppitunnin läpikäynnistä. Mahdollinen itsenäinen osaaminen perustuu erillisiin tehtäväyrityksiin ja vahvistetaan myöhemmin muissa tilanteissa.",
        "Seuraavaksi LOS! 1:n toisessa kappaleessa opetellaan esittäytymään ja kertomaan oma tai kuvitteellinen nimi. Et tarvitse siihen ennestään laajaa saksan sanavarastoa.",
      ],
    },
  ],
};
