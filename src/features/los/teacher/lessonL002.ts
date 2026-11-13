import type { TeacherLesson } from "./engine.ts";

/**
 * LOS! 1 / L002, first pronunciation lesson.
 * No simulated human speech assessment and no invented media recordings.
 * Actual original human audio remains in C01's own textbook reader.
 */
export const LOS1_L002_TEACHER: TeacherLesson = {
  id:"L002",bookId:1,chapterId:"01",version:"2.0.0-preview.1",
  title:"Aloita saksan ääntämisestä",
  objective:"Tunnistan saksan w-, z-, ei-, ie- ja sch-kirjoitusasujen ensimmäisiä ääntämissääntöjä.",
  estimatedMinutes:30,
  requiredQuestionIds:["pre-w","pre-ei","guided","exit"],
  requiredActivityIds:["grammar-reviewed","audio-tried"],
  requiredPracticeIds:[],
  scenes:[
    {
      id:"welcome",kind:"introduction",phase:"Aloitus",title:"Saksaa ei aina lausuta niin kuin kirjoitetaan",
      paragraphs:[
        "Osaat jo muutamia saksankielisiä sanoja. Nyt opit huomaamaan, miksi niiden kirjoitus ja ääntämys voivat poiketa suomalaisesta tavasta lukea sanoja.",
        "Et tarvitse ääntämismerkkejä tai aikaisempaa kielitiedettä. Keskitymme viiteen yleiseen kirjoitusasuun: w, z, ei, ie ja sch.",
        "Ensin kokeilemme kahta ennakkokysymystä. Jos vastaat väärin, se ei haittaa. Kysymykset kertovat, mistä opetuksessa lähdetään.",
      ],
    },
    {
      id:"pre-w",kind:"question",phase:"Ennakkokysymys 1",title:"Arvaatko saksan w-kirjaimen äänen?",
      paragraphs:["Kokeile ensin ilman sääntöä. Hetken kuluttua opettaja näyttää oikean vastauksen ja perustelun."],
      question:{
        type:"choice",skillId:"L1-PHON-01",prompt:"Mitä suomen kielen äännettä saksan w tavallisesti muistuttaa?",
        options:[
          {id:"a",label:"Suomen v-äännettä"},
          {id:"b",label:"Englannin w-äännettä",wrongFeedback:"Monessa englannin sanassa w ääntyy eri tavalla. Saksan tavallinen w muistuttaa suomen v:tä."},
          {id:"c",label:"Suomen u-äännettä",wrongFeedback:"Saksan w ei tavallisesti ole suomen u-äänne. Kokeile lausua v."},
        ],
        correctOption:"a",
        success:"Juuri niin. Saksan w ääntyy yleensä suomen v:n tapaan.",
        hint:"Ajattele saksan sanaa wie. Sen alussa kuulostaa olevan suomalainen v.",
        reteach:"Saksan kirjoitusasussa w tarkoittaa yleensä soinnillista v-äännettä. Esimerkiksi wie alkaa suomalaisen v:n tapaan.",
        genericWrong:"Tarkista w-kirjaimen ääni: se muistuttaa suomen v:tä.",
      },
    },
    {
      id:"pre-ei",kind:"question",phase:"Ennakkokysymys 2",title:"Entä kirjainyhdistelmä ei?",
      paragraphs:["Tämä voi ensin yllättää: saksan ei ei yleensä kuulosta suomen sanalta ei."],
      question:{
        type:"choice",skillId:"L1-PHON-01",prompt:"Mihin saksan ei-äänne tavallisesti vertautuu?",
        options:[
          {id:"a",label:"Suomen pitkään i-äänteeseen",wrongFeedback:"Pitkää i-äännettä merkitään saksassa tavallisesti yhdistelmällä ie."},
          {id:"b",label:"Suunnilleen suomen ai-yhdistelmään"},
          {id:"c",label:"Suomen ei-sanaan",wrongFeedback:"Saksan ei ei tavallisesti äänny suomen sanan ei tapaan."},
        ],
        correctOption:"b",
        success:"Oikein. Esimerkiksi mein sisältää ai-tyyppisen äänteen.",
        hint:"Mieti, kuuluuko sana mein suunnilleen kuten main vai mein.",
        reteach:"Saksan ei ääntyy yleensä ai-tyyppisesti. Muista pari: ei = ai, ie = pitkä i.",
        genericWrong:"Tarkista kirjainjärjestys. Saksassa ei ja ie ääntyvät eri tavoin.",
      },
    },
    {
      id:"consonants",kind:"explanation",phase:"Opetus",title:"w, z ja sch: kolme tärkeää kirjoitusasua",
      paragraphs:[
        "Kun näet saksan w-kirjaimen, ääntäminen muistuttaa yleensä suomen v:tä. Esimerkiksi wie (miten) alkaa v-äänteellä.",
        "Saksan z taas tarkoittaa tavallisesti ts-äännettä. Esimerkiksi Zeit (aika) alkaa ts:llä. Muista lausua alussa molemmat osat: t ja s.",
        "Kirjainyhdistelmä sch ääntyy suunnilleen kuten suomen š. Esimerkiksi Schule (koulu) alkaa tällä äänteellä. Se ei ole sama kuin yksittäinen s.",
        "Älä yritä opetella näitä viittä sääntöä vain ulkoa lukemalla. Seuraavaksi vertaamme kirjoitusasua ja lausumisen ideaa opetustaululla.",
      ],
      help:[
        {title:"Miksi käytämme sanaa 'yleensä'?",body:"Kielten sanoissa on poikkeuksia ja lainasanoja. Nämä ovat aloittelijalle luotettavat pääsäännöt, mutta eivät ehdottomia sääntöjä joka sanassa."},
        {title:"Mikä on š?",body:"Š on suhuäänne, joka esiintyy esimerkiksi englannin sanan she alussa. Saksan sch merkitsee usein tätä samaa äännettä."},
      ],
    },
    {
      id:"board",kind:"board",phase:"Opetustaulu",title:"Viisi kirjoitusasua samassa taulussa",
      paragraphs:[
        "Näytä yksi rivi kerrallaan. Katso ensin kirjoitusasua ja mieti sitten sen tavallista ääntämistä.",
        "Taulun merkinnät ovat ääntämisen suuntaa antavia suomenkielisiä muistivihjeitä, eivät tarkkoja äännetranskriptioita.",
      ],
      board:[
        {label:"w → v",german:"wie",meaning:"miten · alkaa v-äänteellä"},
        {label:"z → ts",german:"Zeit",meaning:"aika · alkaa ts-äänteellä"},
        {label:"ei → ai",german:"mein",meaning:"minun · ai-tyyppinen äänne"},
        {label:"ie → pitkä i",german:"wie",meaning:"miten · pitkä i-äänne"},
        {label:"sch → š",german:"Schule",meaning:"koulu · š-äänne"},
      ],
    },
    {
      id:"vowels",kind:"explanation",phase:"Opetus",title:"ei ja ie: järjestyksellä on väliä",
      paragraphs:[
        "Tämä on yksi ensimmäisistä tärkeistä eroista saksassa. Kirjaimet ovat samoja, mutta niiden järjestys muuttaa ääntämistä.",
        "Sanassa mein (minun) näkyy ei. Se ääntyy suunnilleen ai. Sanassa wie (miten) näkyy ie, joka ilmaisee tässä pitkää i-äännettä.",
        "Voit muistaa näin: sanassa mein näkyy ensin e ja sitten i, mutta kuulet ai-tyyppisen äänteen. Sanassa wie näkyy ensin i ja sitten e, ja kuulet pitkän i:n.",
        "Ääntämisen oppiminen vaatii myös oikean puheen kuuntelemista. Siksi avaamme kohta oppikirjan ihmisäänen, jos se on saatavilla.",
      ],
      help:[
        {title:"Onko saksan ie aina pitkä i?",body:"Ei aivan kaikissa sanoissa tai erisnimissä. Tämä on aloittelijalle keskeinen tavallinen kirjoitus- ja ääntämissääntö."},
        {title:"Miksi kirjoitetaan zwei mutta ei tswai?",body:"Saksan oikeinkirjoitus käyttää omia kirjainmerkintöjään. z vastaa yleensä ts-äännettä, ja ei vastaa ai-tyyppistä äännettä. Ääntämisvihje ei korvaa oikeaa kirjoitusasua."},
      ],
    },
    {
      id:"guided",kind:"question",phase:"Ohjattu harjoitus",title:"Tunnista pitkä i",
      paragraphs:["Valitse oikea vaihtoehto. Älä kiinnitä huomiota sanan merkitykseen, vaan sen kirjoitusasuun."],
      question:{
        type:"choice",skillId:"L1-PHON-01",prompt:"Kumpi yhdistelmä merkitsee saksassa tavallisesti pitkää i-äännettä?",
        options:[
          {id:"a",label:"ie"},
          {id:"b",label:"ei",wrongFeedback:"ei ääntyy yleensä ai-tyyppisesti. Pitkän i:n tavallinen merkintä on ie."},
          {id:"c",label:"sch",wrongFeedback:"sch vastaa š-äännettä. Se ei ole vokaaliyhdistelmä."},
        ],
        correctOption:"a",
        success:"Oikein. ie merkitsee usein pitkää i:tä, kuten sanassa wie.",
        hint:"Vertaa sanoja mein ja wie. Kummassa kuuluu pitkä i?",
        reteach:"Saksan ei on tavallisesti ai, kun taas ie on pitkä i. Kirjainjärjestys on ratkaiseva.",
        genericWrong:"Kokeile vertailua uudelleen: mieti, kumpi järjestys kuuluu sanassa wie.",
      },
    },
    {
      id:"grammar",kind:"book",phase:"Oppikirja",title:"Tarkista säännöt kirjan omasta ääntämisosiosta",
      paragraphs:[
        "Tässä vaiheessa saat tarkistaa opetetut säännöt LOS! 1:n kielioppisivulta. Lue ääntämistaulukosta w, z, ei, ie ja sch.",
        "Kokeile lukea esimerkit itse ääneen. Sen jälkeen avaa sanasto ja etsi sieltä jo tuttu tervehdys.",
        "Opetustila pysyy omassa välilehdessään. Kirjan lukeminen ei automaattisesti todista, että osaat ääntää sanat.",
      ],
      bookLinks:[
        {label:"C01 · Kielioppi ja ääntäminen",chapterId:"01",section:"grammar",instruction:"Vertaa viittä opetettua kirjoitusasua kirjan ääntämisohjeisiin."},
        {label:"C01 · Sanasto",chapterId:"01",section:"vocabulary",instruction:"Etsi yksi tuttu tervehdys ja harjoittele sen kirjoitusasua."},
      ],
      activityId:"grammar-reviewed",activityLabel:"Kävin läpi ääntämissäännöt oppikirjasta",
    },
    {
      id:"audio",kind:"activity",phase:"Aito kuuntelu",title:"Miltä oikea saksa kuulostaa?",
      paragraphs:[
        "Avaa nyt C01:n Teksti A -lukija ja kokeile alkuperäistä Franzin ja Jörgin keskustelua. Se on aidon ihmisen lausumaa saksaa, ei automaattisesti luotua ääntä.",
        "Sinun ei vielä tarvitse ymmärtää koko keskustelua. Kuuntele esimerkiksi, tunnistatko jonkin jo tutun tervehdyksen.",
        "Jos äänite ei ole saatavilla tai toisto ei toimi, voit lukea näkyvän tekstin. Merkitse silloin kuuntelun kokeilu tehdyksi, mutta älä tulkitse sitä kuullun ymmärtämisen osaamisnäytöksi.",
      ],
      bookLinks:[
        {label:"C01 · Teksti A ja ihmisäänite",chapterId:"01",section:"text",instruction:"Kokeile toistaa alkuperäinen keskustelu, jos ääni toimii."},
      ],
      activityId:"audio-tried",activityLabel:"Kokeilin alkuperäistä äänitettä tai totesin sen puuttuvan",
    },
    {
      id:"exit",kind:"question",phase:"Lopputarkistus",title:"Tarkista nyt tärkein kirjainpari",
      paragraphs:["Lopuksi yksi kysymys ilman näkyvää mallia. Tarvittaessa voit käyttää vihjettä ja palata opetustauluun."],
      question:{
        type:"choice",skillId:"L1-PHON-01",prompt:", evidenceRole:"exit"Miten saksan kirjainyhdistelmä ei yleensä ääntyy?",
        options:[
          {id:"a",label:"Kuten suomen pitkä i",wrongFeedback:"Tämä kuvaa paremmin ie-yhdistelmän yleistä ääntämistä."},
          {id:"b",label:"Suunnilleen ai"},
          {id:"c",label:"Kuten suomen ei",wrongFeedback:"Suomen sanan ei ääntäminen ei ole sama kuin saksan ei-yhdistelmän tavallinen ääntämys."},
        ],
        correctOption:"b",
        success:"Oikein. ei ääntyy tavallisesti ai, ja ie taas usein pitkänä i:nä.",
        hint:"Muista: mein ≈ main, wie sisältää pitkän i:n.",
        reteach:"Saksassa kirjainjärjestys on tärkeä. ei → ai, ie → pitkä i. Vertaa mein ja wie.",
        genericWrong:"Kokeile uudelleen: mieti mein-sanan ääntämisvihjettä.",
      },
    },
    {
      id:"summary",kind:"summary",phase:"Yhteenveto",title:"Saksan ääntämisen ensimmäiset rakennuspalikat",
      paragraphs:[
        "Olet harjoitellut viisi tärkeää alkeissääntöä: w vastaa yleensä v:tä, z ts:ää, ei ai:ta, ie pitkää i:tä ja sch š-äännettä.",
        "Palaa vielä myöhemmin näiden sääntöjen pariin. Ääntämisen oppiminen on myös kuuntelemista ja toistamista, ei vain monivalintoihin vastaamista.",
        "Seuraavalla oppitunnilla pääset lukemaan Franzin ja Jörgin keskustelua kokonaisena oppikirjan sisällä.",
      ],
    },
  ],
};
