import type { TeacherLesson } from "./engine.ts";

/**
 * LOS! 1 C04 L017: register choice is social context, not an age formula.
 * The source and answer keys remain in the existing C04 reader/workbook.
 */
export const LOS1_L017_TEACHER: TeacherLesson = {
  id:"L017", bookId:1, chapterId:"04", version:"2.0.0-preview.1",
  title:"Milloin du tai Sie?",
  objective:"Valitsen du- tai Sie-puhuttelun puhujien suhteen ja tilanteen perusteella.",
  estimatedMinutes:30,
  requiredQuestionIds:["recall","guided","independent","application","exit"],
  requiredActivityIds:["culture-reviewed"],
  requiredPracticeIds:["C04-EX-01","C04-EX-02","C04-EX-03","C04-EX-04"],
  scenes:[
    {id:"welcome",phase:"Aloitus",kind:"introduction",title:"Yksi ihminen, kaksi puhuttelutapaa",
      paragraphs:[
        "Suomessakin voimme sanoa sinä tai te. Saksassa valinta näkyy selvästi sanoissa du ja Sie. Sinuttelu ei ole epäkunnioittavaa kaikkialla, eikä teitittely ole automaattisesti kaikille aikuisille pakollista.",
        "Tällä tunnilla katsot ensin, millaisessa suhteessa puhujat ovat, ja vasta sitten valitset puhuttelun. L018:ssa näet kohteliaisuuden oikeassa lähdedialogissa.",
        "Harjoitukset tehdään kirjassa samoilla C04-tunnisteilla. Tunnin lopussa vastaat ilman näkyvää mallia."
      ],
      help:[{title:"Yksinkertainen aloitussääntö",body:"Tutun ystävän kanssa du. Virallisessa ensikohtaamisessa Sie on usein turvallinen lähtökohta. Jos osapuolet sopivat sinuttelusta, du käy myös työelämässä."}]
    },
    {id:"recall",phase:"Muistelu",kind:"question",title:"Mitä C02:n du tarkoitti?",
      paragraphs:["Palauta mieleen tuttu nimikysymys. Se on tämän tunnin vertailukohta."],
      question:{type:"choice",skillId:"L1-INT-02",prompt:"Kenelle Wie heißt du? tavallisesti sopii?",
        options:[{id:"a",label:"Tutulle ystävälle"},{id:"b",label:"Virallisessa ensiasioinnissa teititeltävälle vieraalle",wrongFeedback:"Virallisessa ensiasioinnissa käytetään yleensä kohteliasta Sie-puhuttelua."},{id:"c",label:"Vain usealle ihmiselle kerralla",wrongFeedback:"Du tarkoittaa yhtä sinuteltavaa ihmistä, ei monikkoa."}],
        correctOption:"a",success:"Oikein. Du on yhden tuttavallisesti puhuteltavan ihmisen muoto.",
        hint:"Muistele, että du tarkoittaa sinä.",
        reteach:"Wie heißt du? kysyy tuttavan nimeä. Kohtelias vaihtoehto on Wie heißen Sie?",
        genericWrong:"Mieti, onko puhuttelu tuttu vai virallinen."}},
    {id:"rule",phase:"Opettajan selitys",kind:"explanation",title:"Suhde ratkaisee enemmän kuin ikä",
      paragraphs:[
        "Du tarkoittaa sinä. Käytät sitä esimerkiksi ystäväsi, tutun opiskelukaverisi tai sellaisen ihmisen kanssa, jonka kanssa sinuttelu on yhteinen käytäntö. Puhujien välillä on tuttavallinen suhde.",
        "Sie tarkoittaa tässä kohteliasta te-puhuttelua. Se on mahdollinen esimerkiksi asioidessasi tuntemattoman virkailijan kanssa tai muodollisessa ensimmäisessä tapaamisessa. Kirjoita kohtelias Sie aina isolla S-kirjaimella.",
        "Ikä ei yksin määrää puhuttelua. Saksankielisillä alueilla, työpaikoilla ja eri sukupolvilla on erilaisia tapoja. Tuntemattoman kanssa voit aloittaa Sie-muodolla ja siirtyä du-muotoon, jos sinuttelusta sovitaan.",
        "Pieni sie voi tarkoittaa esimerkiksi 'hän' tai 'he'. Tämän tunnin teitittely on iso Sie. Täydellinen pronominijärjestelmä ei ole vielä oppimistavoite.",
        "Malliesimerkki: koulukaveri kysyy Wie heißt du? mutta virallisen tapaamisen vastaanottaja kysyy Wie heißen Sie? Molemmat kysyvät nimeä. Puhujien suhde ja verbinmuoto ovat erilaiset."
      ],
      help:[
        {title:"Onko kaikille opettajille pakko sanoa Sie?",body:"Ei ole yhtä sääntöä, joka toimisi kaikissa kouluissa ja tilanteissa. Noudata opettajan ja koulun käytäntöä. Tässä harjoittelemme tuttavallisen ja muodollisen tilanteen tavallisinta eroa."},
        {title:"Mitä jos en tiedä puhuttelua?",body:"Muodollisessa ensikohtaamisessa Sie on usein luonteva ja kohtelias valinta. Vaihda du-muotoon, kun se sopii yhteiseen käytäntöön."}
      ]},
    {id:"board",phase:"Opetettu malliesimerkki",kind:"board",title:"Näin valitsen puhuttelun",
      paragraphs:["Opettaja ratkaisee ensin puhujien suhteen: keitä he ovat toisilleen? Sitten katsotaan tilannetta ja valitaan koko ilmaus. Taulu on etenevä, ei kokeen ratkaisuavain."],
      board:[
        {label:"1 · Kaverit",german:"du",meaning:"Kaksi läheistä ystävää sinuttelee. Suhde on tuttu."},
        {label:"2 · Kaverin kysymys",german:"Wie heißt du?",meaning:"Mikä sinun nimesi on? Tuttavallinen tapa kysyä."},
        {label:"3 · Virallinen ensikohtaaminen",german:"Sie",meaning:"Puhujat eivät tunne toisiaan ja tilanne on muodollinen."},
        {label:"4 · Kohtelias nimikysymys",german:"Wie heißen Sie?",meaning:"Mikä teidän nimenne on? Sie kirjoitetaan isolla."},
        {label:"5 · Sovittu sinuttelu",german:"du",meaning:"Myös työkaverit voivat käyttää du-muotoa, jos se on yhteinen käytäntö."}
      ]},
    {id:"guided",phase:"Ohjattu harjoitus",kind:"question",title:"Kaksi uutta ystävää",
      paragraphs:["Tarkista ensin suhde: nämä kaksi ihmistä tuntevat toisensa hyvin."],
      question:{type:"choice",skillId:"L1-INT-04",prompt:"Elli ja Ben ovat läheisiä opiskelukavereita. Miten Elli kysyy Benin nimen uudelleen?",
        options:[{id:"a",label:"Wie heißen Sie?",wrongFeedback:"Sie on kohtelias puhuttelu. Tilanteessa kaverit sinuttelevat."},{id:"b",label:"Wie heißt du?"},{id:"c",label:"Wie heiße ich?",wrongFeedback:"Ich tarkoittaa minä. Tämä kysyy puhujan omaa nimeä."}],
        correctOption:"b",success:"Oikein. Kaverit käyttävät tässä du-muotoa.",
        hint:"Kaveri on sinä eli du.",reteach:"Tutun kanssa Wie heißt du?; muodollisessa tapaamisessa Wie heißen Sie?.",
        genericWrong:"Erota puhujan oma nimi vastaanottajan nimestä ja valitse kaverin puhuttelu."}},
    {id:"culture",phase:"Kirjan kulttuuri ja harjoitukset",kind:"book",title:"Vertaa kielenkäytön tilanteita",
      paragraphs:[
        "Avaa C04:n Kulttuuri ja tarkastele, miksi sinuttelua ei päätetä pelkän iän perusteella. Säilytä kirjan kuvat ja kulttuurisisällöt sellaisinaan.",
        "Tee C04-EX-01, C04-EX-02, C04-EX-03 ja C04-EX-04 kirjan Harjoittele-sivulla. Ne tallentuvat nykyiseen kappaleluonnokseen; vihjeen käyttö täällä ei muutu automaattisesti itsenäiseksi näytöksi."
      ],
      bookLinks:[
        {label:"C04 · Kulttuuri",chapterId:"04",section:"culture",instruction:"Vertaa tuttavallista ja muodollista puhuttelua."},
        {label:"C04 · Harjoittele",chapterId:"04",section:"practice",instruction:"Tee nykyiset C04-EX-01–04."}
      ],activityId:"culture-reviewed",activityLabel:"Tutustuin C04:n kulttuuriosioon"},
    {id:"independent",phase:"Itsenäinen harjoitus",kind:"question",title:"Vieraan kohtaaminen",
      paragraphs:["Sulje mallitaulu ja mieti, mitä ilmausta käytät ensimmäisellä virallisella tapaamiskerralla."],
      question:{type:"choice",skillId:"L1-INT-04",evidenceRole:"independent",prompt:"Tapaat pankin virkailijan virallisessa asiassa ensimmäistä kertaa. Mikä puhuttelu on luonteva lähtökohta?",
        options:[{id:"a",label:"du",wrongFeedback:"Du voi olla käytössä yhteisestä sopimuksesta, mutta virallisessa ensikohtaamisessa Sie on tavallisesti turvallisempi lähtökohta."},{id:"b",label:"Sie"},{id:"c",label:"ich",wrongFeedback:"Ich tarkoittaa minä; sillä et puhuttele toista ihmistä."}],
        correctOption:"b",success:"Oikein. Valitsit kohteliaan Sie-muodon tilanteen perusteella.",
        hint:"Virallinen ensikohtaaminen eroaa opiskelukaverin tapaamisesta.",
        reteach:"Suhde ja paikallinen tapa ratkaisevat. Epävarmassa muodollisessa tilanteessa käytä Sie-muotoa.",
        genericWrong:"Tunnista ensin, onko kyse ystävästä vai virallisesta uudesta kontaktista."}},
    {id:"application",phase:"Soveltaminen",kind:"question",title:"Tilanne muuttuu",
      paragraphs:["Virkailija kertoo, että työpaikalla kaikki sinuttelevat ja ehdottaa sinuttelua myös sinulle. Puhuttelutapa voi muuttua."],
      question:{type:"choice",skillId:"L1-INT-04",evidenceRole:"application",prompt:"Kun molemmat sopivat sinuttelusta, mikä on sopiva kysymys?",
        options:[{id:"a",label:"Wie heißt du?"},{id:"b",label:"Wie heißen Sie?",wrongFeedback:"Tämä on kieliopillisesti oikea, mutta tässä sovittiin nimenomaan sinuttelusta."},{id:"c",label:"Wie heißen du?",wrongFeedback:"Du tarvitsee heißen-verbin muodon heißt; heißen kuuluu Sie-puhutteluun."}],
        correctOption:"a",success:"Oikein. Yhteinen käytäntö muuttui ja puhuttelu vaihtui du-muotoon.",
        hint:"Sovittu sinuttelu tarkoittaa du.",
        reteach:"Kun puhuttelu vaihtuu, myös nimi-ilmauksen verbimuoto vaihtuu: Wie heißt du? / Wie heißen Sie?",
        genericWrong:"Valitse juuri sovittuun sinutteluun kuuluva koko nimikysymys."}},
    {id:"exit",phase:"Lopputarkistus",kind:"question",title:"Tunnista iso S",
      paragraphs:["Vastaa ilman mallia. Tämä tarkistaa muodon kirjoitusasun erikseen sosiaalisesta tilanteesta."],
      question:{type:"text",skillId:"L1-INT-04",evidenceRole:"exit",prompt:"Kirjoita kohtelias puhuttelupronomini saksaksi.",
        accepted:["Sie"],success:"Oikein: kohtelias Sie kirjoitetaan isolla S:llä.",
        hint:"Kohteliaan puhuttelun ensimmäinen kirjain on iso S.",
        reteach:"du = sinä, Sie = kohtelias Te. Pieni sie ei ole sama pronominimuoto.",
        genericWrong:"Kirjoita yksi sana, ei koko lausetta."}},
    {id:"summary",phase:"Yhteenveto",kind:"summary",title:"Osaat erottaa tilanteen ja puhuttelun",
      paragraphs:[
        "Tunnistit ystävän ja virallisen ensikohtaamisen eron. Osaat perustella, miksi du tai Sie sopii tilanteeseen ja miksi puhuttelutapa voi muuttua.",
        "Vihjeellä onnistuneet yritykset ovat hyödyllistä harjoittelua, mutta eivät kerrytä itsenäistä näyttöä. L018 jatkaa C04:n oikeaan alkuperäistekstiin."
      ]}
  ],
};
