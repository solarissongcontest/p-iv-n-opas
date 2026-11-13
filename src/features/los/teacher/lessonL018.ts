import type { TeacherLesson } from "./engine.ts";

/**
 * L018 teaches the canonical C04 M-WB-06 eight-turn Text A, not C07's
 * M-WB-02 telephone directory dialogue. Source text, glosses and answer keys
 * are read from the existing textbook, never forked into a new source table.
 */
export const LOS1_L018_TEACHER: TeacherLesson = {
  id:"L018",bookId:1,chapterId:"04",version:"2.0.0-preview.1",
  title:"Herr Schmidt ja Herr Standish: koko dialogi",
  objective:"Ymmärrän C04:n kahdeksan alkuperäistä puheenvuoroa ja perustelen kolme tekstihavaintoa.",
  estimatedMinutes:30,
  requiredQuestionIds:["recall","guided","independent","application","exit"],
  requiredActivityIds:["whole-text-read"],
  requiredPracticeIds:[],
  requiredCheckedIds:["C04-SOURCE-Q01","C04-SOURCE-Q02","C04-SOURCE-Q03"],
  scenes:[
    {id:"welcome",phase:"Aloitus",kind:"introduction",title:"Kaksi työtoveria, kahdeksan repliikkiä",
      paragraphs:[
        "C04:n oikea Text A on Wikibooksin julkaistu Gespräch 2-2 ~ Die Geschäftsmänner: Herr Schmidt ja Herr Standish. Se ei ole numerotiedustelupuhelu; se toinen teksti on C07:n aineisto.",
        "Tässä tunnissa luet kirjan koko alkuperäisen kahdeksan repliikin keskustelun. Opettaja auttaa ymmärtämään henkilöt, vointikysymyksen, syyn Schmidtin väsymykseen sekä hyvästelyn.",
        "Avaamme autenttisen tekstin nykyisestä lukijasta, jossa sanat, puhujat ja lähdeviitteet säilyvät. Äänitettä ei ole hyväksytty tähän tekstiin, joten voit tehdä kaiken lukemalla."
      ],
      help:[{title:"Mitä teen ensin?",body:"Lue kaikki kahdeksan puheenvuoroa järjestyksessä. Etsi ensin nimet Herr Schmidt ja Herr Standish. Katso seuraavaksi kysymys, vastaus, syy ja hyvästely."}]},
    {id:"recall",phase:"Esitiedot",kind:"question",title:"Tunnista kohtelias puhuttelu",
      paragraphs:["L017:ssa opit eroittamaan tutun ja muodollisen puhuttelun."],
      question:{type:"choice",skillId:"L1-INT-04",prompt:"Kumpi ilmaus on muodollinen vointikysymys?",
        options:[{id:"a",label:"Wie geht es dir?",wrongFeedback:"Dir liittyy tutun du-puhutteluun."},{id:"b",label:"Wie geht es Ihnen?"},{id:"c",label:"Wie heißt du?",wrongFeedback:"Tämä kysyy nimeä, ei vointia."}],
        correctOption:"b",success:"Oikein. Wie geht es Ihnen? on kohtelias kysymys: Mitä teille kuuluu?",
        hint:"Kohtelias vointikysymys sisältää sanan Ihnen.",
        reteach:"Wie geht es dir? on tuttavallinen. Wie geht es Ihnen? on kohtelias. Älä vielä yritä taivuttaa Ihnen-sanaa.",
        genericWrong:"Etsi ilmaus, joka kysyy vointia ja käyttää kohteliasta puhuttelua."}},
    {id:"read",phase:"Alkuperäisteksti",kind:"book",title:"Lue jokainen repliikki kirjan Text A:sta",
      paragraphs:[
        "Avaa C04:n Text A. Lue kaikki kahdeksan puheenvuoroa u01–u08, älä vain opettajan alla antamia poimintoja. Ensimmäisellä kierroksella selvitä, kuka kysyy ja kuka vastaa. Toisella kertaa tarkista, mistä Schmidtin väsymys johtuu.",
        "Tekstin kahdeksan repliikkiä ja niiden suomennokset ovat kokonaisuudessaan LOSin lukijassa. Verbit habe ja kann sekä ilmaus Zu viel ist zu viel ovat tässä vain ymmärtämisen tukimuotoja.",
        "Merkitse luetuksi vasta, kun olet oikeasti käynyt koko tekstin läpi. Tämä vahvistus ei ole lukemisen automaattinen osaamispistemäärä."
      ],
      bookLinks:[{label:"C04 · Text A · M-WB-06",chapterId:"04",section:"text",instruction:"Lue alkuperäiset u01–u08 ja käytä tarvittaessa sanaselityksiä."}],
      activityId:"whole-text-read",activityLabel:"Luin koko C04 Text A:n kahdeksan puheenvuoroa"},
    {id:"reading-rule",phase:"Opettajan selitys",kind:"explanation",title:"Miten keskustelu rakentuu?",
      paragraphs:[
        "Ensimmäisessä repliikissä Schmidt tervehtii Standishia nimellä ja kysyy Wie geht es Ihnen? Tämä on kohtelias Mitä teille kuuluu? Sen jälkeen Standish sanoo, että hänelle kuuluu hyvää, ja kysyy Und Ihnen? eli Entä teille?",
        "Schmidt vastaa Nicht so gut. Ich bin müde. Hänellä ei siis mene erityisen hyvin, ja hän on väsynyt. Standish kysyy Wie bitte? Müde? Warum? eli anteeksi mitä, väsynyt, miksi?",
        "Schmidt selittää Ich habe so viel Arbeit. Työtä on paljon. Standish vastaa ymmärtävänsä, että liika on liikaa. Sinun ei tarvitse tässä osata kann-verbin tai habe-verbin uutta taivutusta.",
        "Lopuksi molemmat hyvästelevät muodollisesti Auf Wiedersehen. Standish lisää bis morgen eli huomiseen. Koko tekstin idea on ymmärrettävissä, vaikka kaikki sen kielioppirakenteet eivät ole vielä aktiivista osaamista.",
        "Mallisuoritus: kysymys Miksi Schmidt on väsynyt? Etsi ensin hänen oma selityksensä viidennestä puheenvuorosta. Ich habe so viel Arbeit kertoo syyn; älä sekoita sitä Standishin omaan hyvän voinnin vastaukseen."
      ],
      help:[
        {title:"En ymmärrä, kuka on väsynyt",body:"Schmidt sanoo kolmannessa vuorossa Ich bin müde. Standish oli aiemmin sanonut es geht mir gut. Heidän vointinsa ovat erilaiset."},
        {title:"Miksi sanotaan Ihnen eikä Sie?",body:"Ihnen on kohteliaan puhuttelun muoto fraasissa Wie geht es Ihnen?. Nyt opit tämän fraasin kokonaisena. Sijamuotojen sääntö tulee myöhemmin."},
        {title:"Mitä Zu viel ist zu viel tarkoittaa?",body:"Se on kokonainen sanonta: liika on liikaa. Tässä ei opiskella sen kielioppirakennetta erillisenä sääntönä."}
      ]},
    {id:"board",phase:"Mallisuoritus",kind:"board",title:"Kahdeksan repliikin merkityskartta",
      paragraphs:[
        "Etene yksi puheenvuoro kerrallaan. Taulu näyttää kunkin vuoron olennaisen ankkurin ja selityksen, ei toista eikä korvaa koko alkuperäistekstiä.",
        "Kun pääset viimeiseen vuoroon, tarkista alkuperäisestä Text A:sta, mitä kumpikin henkilö sanoo."
      ],
      board:[
        {label:"u01 · Schmidt",german:"Wie geht es Ihnen?",meaning:"Tervehdys ja kohtelias vointikysymys Standishille."},
        {label:"u02 · Standish",german:"es geht mir gut. Und Ihnen?",meaning:"Standishille kuuluu hyvää. Hän kysyy kohteliaasti takaisin."},
        {label:"u03 · Schmidt",german:"Nicht so gut. Ich bin müde.",meaning:"Schmidt ei voi erityisen hyvin ja on väsynyt."},
        {label:"u04 · Standish",german:"Wie bitte? Müde? Warum?",meaning:"Standish hämmästyy ja kysyy syytä."},
        {label:"u05 · Schmidt",german:"Ich habe so viel Arbeit.",meaning:"Schmidt kertoo: työtä on paljon."},
        {label:"u06 · Standish",german:"Zu viel ist zu viel.",meaning:"Standish ymmärtää ja toteaa, että liika on liikaa."},
        {label:"u07 · Schmidt",german:"Auf Wiedersehen, Herr Standish!",meaning:"Schmidt hyvästelee kohteliaasti."},
        {label:"u08 · Standish",german:"Auf Wiedersehen, bis morgen.",meaning:"Standish hyvästelee ja sanoo huomiseen."}
      ]},
    {id:"guided",phase:"Ohjattu harjoittelu",kind:"question",title:"Kuka kysyy vointia ensin?",
      paragraphs:["Vertaile tekstiä ja opetustaulun alkuvaiheita."],
      question:{type:"choice",skillId:"L1-READ-01",prompt:"Kumpi henkilö aloittaa keskustelun vointikysymyksellä?",
        options:[{id:"a",label:"Herr Schmidt"},{id:"b",label:"Herr Standish",wrongFeedback:"Standish vastaa ja kysyy takaisin, mutta Schmidt aloittaa."},{id:"c",label:"Franz",wrongFeedback:"Franz ei esiinny tässä C04:n Text A:ssa."}],
        correctOption:"a",success:"Oikein. Schmidt kysyy ensimmäisessä puheenvuorossa Wie geht es Ihnen?",
        hint:"Katso Text A:n vuoro u01.",
        reteach:"u01 = Schmidt tervehtii ja kysyy. u02 = Standish vastaa ja kysyy takaisin.",
        genericWrong:"Tarkista keskustelun ensimmäisen puheenvuoron puhujan nimi."}},
    {id:"checks",phase:"Lähdetehtävät",kind:"book",title:"Tarkista kolme nykyistä tekstikysymystä",
      paragraphs:[
        "Vastaa kirjan Ymmärrä-sivulla kysymyksiin C04-SOURCE-Q01, C04-SOURCE-Q02 ja C04-SOURCE-Q03. Ne perustuvat tähän samaan alkuperäiseen tekstiin.",
        "Paina kirjassa kunkin kysymyksen tarkistusta. Pelkkä tallennettu valinta ei riitä: opetustila erottaa vastatun ja oikeasti tarkistetun tehtävän. Vastaukset ja selitykset jäävät vain kirjan nykyiseen vastaustietoon."
      ],
      bookLinks:[{label:"C04 · Ymmärrä",chapterId:"04",section:"understand",instruction:"Vastaa ja tarkista kolme alkuperäistekstiin sidottua C04-SOURCE-kysymystä."}]},
    {id:"independent",phase:"Itsenäinen ymmärtäminen 1/3",kind:"question",title:"Schmidtin vointi",
      paragraphs:["Sulje lähdeteksti hetkeksi ja vastaa muistista."],
      question:{type:"choice",skillId:"L1-READ-01",evidenceRole:"independent",prompt:"Miten Herr Schmidt kuvaa vointiaan?",
        options:[{id:"a",label:"Hänelle kuuluu erittäin hyvää.", "lang": "fi",wrongFeedback:"Tämä on Standishin vastaus, ei Schmidtin."},{id:"b",label:"Hän on väsynyt eikä hänelle kuulu kovin hyvää.", "lang": "fi"},{id:"c",label:"Hän ei kerro mitään voinnistaan.", "lang": "fi",wrongFeedback:"Schmidt sanoo suoraan Nicht so gut. Ich bin müde."}],
        correctOption:"b",success:"Oikein. Nicht so gut ja Ich bin müde kertovat Schmidtin voinnista.",
        hint:"Muistele vuoroa u03 ja sanaa müde.",
        reteach:"Standishille kuuluu hyvää; Schmidt on väsynyt. Älä sekoita puhujia.",
        genericWrong:"Palauta mieleen, kuka sanoi Ich bin müde."}},
    {id:"application",phase:"Itsenäinen ymmärtäminen 2/3",kind:"question",title:"Etsi syy tekstistä",
      paragraphs:["Tee päätelmä kahden eri puheenvuoron perusteella."],
      question:{type:"choice",skillId:"L1-READ-01",evidenceRole:"application",prompt:"Mikä tekstissä selittää Schmidtin väsymystä?",
        options:[{id:"a",label:"Hänellä on paljon työtä.", "lang": "fi"},{id:"b",label:"Hän matkusti junalla.", "lang": "fi",wrongFeedback:"Junamatkaa ei mainita alkuperäisessä tekstissä."},{id:"c",label:"Hän unohti Standishin nimen.", "lang": "fi",wrongFeedback:"Nimen unohtaminen ei esiinny tässä keskustelussa."}],
        correctOption:"a",success:"Oikein. Ich habe so viel Arbeit kertoo syyn.",
        hint:"Viidennessä puheenvuorossa Schmidt selittää tilanteensa.",
        reteach:"u03 kertoo väsymyksestä; u05 kertoo paljon työstä. Yhdistä nämä merkitykset.",
        genericWrong:"Etsi syy, joka mainitaan oikeasti lähdetekstissä."}},
    {id:"exit",phase:"Lopputarkistus 3/3",kind:"question",title:"Miten tekstissä päätetään?",
      paragraphs:["Vastaa ilman näkyvää mallia ja varmista, kuka sanoo viimeisen repliikin."],
      question:{type:"choice",skillId:"L1-READ-01",evidenceRole:"exit",prompt:"Mitä Herr Standish sanoo keskustelun lopuksi?",
        options:[{id:"a",label:"Gute Nacht!",wrongFeedback:"Teksti ei pääty hyvän yön toivotukseen."},{id:"b",label:"Tschüss!",wrongFeedback:"Tämä on arkinen hyvästely, ei tekstin viimeinen ilmaus."},{id:"c",label:"Auf Wiedersehen, bis morgen."}],
        correctOption:"c",success:"Oikein. Standish hyvästelee kohteliaasti ja sanoo huomiseen.",
        hint:"Viimeisen vuoron u08 loppu tarkoittaa huomiseen.",
        reteach:"u07 Schmidt sanoo Auf Wiedersehen. u08 Standish vastaa Auf Wiedersehen, bis morgen.",
        genericWrong:"Erota tuttu hyvästely lähteen muodollisesta hyvästelystä."}},
    {id:"summary",phase:"Yhteenveto",kind:"summary",title:"Ymmärsit alkuperäisen kokonaisuuden",
      paragraphs:[
        "Luit C04:n oikean kahdeksan repliikin tekstin, tunnistit puhujat, vointikysymyksen, Schmidtin väsymyksen syyn ja lopun hyvästelyn.",
        "Kolme lopun ymmärtämiskysymystä kirjautuvat itsenäisiksi vain, jos ensimmäinen vastaus on oikein ilman apua. Kirjan kolme tarkistettua lähdetehtävää pysyvät erillisinä harjoitussuorituksina.",
        "L019:ssa opettelet, miksi du heißt ja Sie heißen ovat erilaiset."
      ]}
  ]
};
