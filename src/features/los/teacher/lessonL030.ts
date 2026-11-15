import type { TeacherLesson } from "./engine.ts";

/**
 * EX-MID is the existing 25-item book exam and its existing saved archive.
 * This lesson has no replacement question bank or hidden marking logic.
 */
export const LOS1_L030_TEACHER: TeacherLesson = {
  id:"L030",bookId:1,chapterId:"91",version:"2.0.0-preview.1",
  title:"Välikoe: kappaleet 1–5",
  objective:"Palautan nykyisen 25 osatehtävän EX-MID-kokeen ja arvioin 4–6 repliikin keskusteluni.",
  estimatedMinutes:30,
  requiredQuestionIds:[],requiredActivityIds:[],requiredPracticeIds:[],
  examAssessment:{id:"EX-MID"},
  scenes:[
    {id:"welcome",phase:"Aloitus",kind:"introduction",title:"Näin välikoe toimii",
      paragraphs:["Tämä on sama EX-MID-välikoe, joka on jo LOS! 1:n oppikirjassa. Teacher-opetustila ei luo tai pisteytä uusia koetehtäviä.",
        "Kokeessa on 25 pisteytettävää monivalintatehtävää: tervehdykset 5, nimet ja verbit 7, lähtömaa 5, du/Sie 4 sekä vointi 4. Vastaukset tallentuvat koko ajan nykyiseen kirjan koeluonnokseen.",
        "Ratkaisut ja osioittaiset pisteet näkyvät vasta, kun olet palauttanut kokeen. Voit palata tähän opetustilaan milloin vain. Aikarajaa tai pakollista arvosanarajaa ei ole."]},
    {id:"prepare",phase:"Koeohje",kind:"explanation",title:"Testaa itsenäistä osaamista",
      paragraphs:["Vastaa ensiksi ilman mallia tai sanakirjaa, jos haluat mitata muistamistasi. Kokeessa valitset yhden vastauksen jokaiseen 25 kohtaan ja palautat koko kokeen yhdellä toiminnolla.",
        "Kokeen 25 tehtävää ovat samat kuin kirjan EX-MID-osiossa, joten kaikki pisteet, tarkistusmallit ja arkistoidut uusinnat tulevat yhdestä moottorista.",
        "Puhetta tai vapaata tekstiä ei pisteytetä automaattisesti. Sen sijaan teet keskustelun ja täytät itsearvioinnin erikseen." ]},
    {id:"exam",phase:"Varsinainen välikoe",kind:"book",title:"Avaa oikea EX-MID-koe",
      paragraphs:["Avaa alla oleva välikoe oppikirjan omassa näkymässä. Vastaa kaikkiin 25 tehtävään ja paina Palauta välikoe. Älä lähetä vastaustasi tätä oppituntia varten toistamiseen.",
        "Voit palata opettajaan linkistä tai erillisestä välilehdestä. Pelkkä koesivun avaaminen ei riitä: palautusajan ja kaikkien vastausten on löydyttävä todellisesta koeluonnoksesta."],
      bookLinks:[{label:"EX-MID · 25 pisteytettävää tehtävää",chapterId:"91",section:"midterm",instruction:"Tee ja palauta olemassa oleva välikoe. Ratkaisut tulevat näkyviin vasta palautuksen jälkeen."}]},
    {id:"dialogue",phase:"Puhe tai kirjoitus",kind:"book",title:"Tee oma 4–6 repliikin keskustelu",
      paragraphs:["Samalla EX-MID-sivulla voit kirjoittaa kuvitteellisen keskustelun tai puhua sen ääneen. Käsittele tervehdyksen lisäksi nimeä, lähtömaata ja kuulumisia tilanteeseen sopivalla puhuttelulla.",
        "Kirjaa rehellinen oma arvio ja valitse yksi kolmesta itsearviointivaihtoehdosta. Jos puhut ääneen ilman tekstiä, merkitse se itsearvioosi. Sovellus ei väitä tallentaneensa tai arvioineensa äänitettä.",
        "Palautuksen jälkeen näkyvä tarkistuslista on itsearviointia varten. Sen onnistuminen ei muuta 25 pisteen tulosta."],
      bookLinks:[{label:"EX-MID · oma keskustelu ja itsearvio",chapterId:"91",section:"midterm",instruction:"Kirjaa tai esitä keskustelu, täytä itsearviointiteksti ja valitse oma suoritustaso."}]},
    {id:"retakes",phase:"Tulokset ja uusinta",kind:"explanation",title:"Uusinta säilyttää aiemman yrityksen",
      paragraphs:["EX-MID tallentaa ensimmäisen vastauksesi, palautusajan ja pisteet yritysarkistoon ennen uutta yritystä. Myös oma keskusteluteksti ja itsearviointi tulee säilyttää uusinnan yhteydessä.",
        "Uusinnan kysymykset eivät nykyisessä pankissa vaihdu. Katso aiempia tuloksia arkistosta; älä tulkitse samaa kysymyssarjaa uudeksi riippumattomaksi taitokokeeksi."]},
    {id:"summary",phase:"Yhteenveto",kind:"summary",title:"Merkitse välikoe opetuspolussa läpikäydyksi",
      paragraphs:["Opetuspolun merkintä avautuu vasta, kun kaikki 25 oikean EX-MID:n vastausta ovat tallessa, koe on palautettu ja oma itsearviointi on kirjattu.",
        "Kokeen pisteet, henkilökohtainen keskusteluarvio ja tämän opetustilan läpikäynti ovat kolme erillistä asiaa. Vähäiset pisteet eivät estä sinua jatkamasta harjoittelua."]},
  ],
};
