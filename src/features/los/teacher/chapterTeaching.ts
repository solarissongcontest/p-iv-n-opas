/** Editorially authored B3-level explanations for the revised C01–C10.
 * These are teaching, not release notes. Verify examples against canonical
 * A/B and Text C and keep the originals unchanged in archived sessions.
 */
export type LosChapterTeaching = {
  goal:string;rule:string;contrast:string;apply:string;example:string;
};
const topics:Readonly<Record<string,LosChapterTeaching>>={
  "01":{
    goal:"Opit valitsemaan tervehdyksen tilanteen ja vuorokaudenajan perusteella.",
    example:"Guten Morgen!",
    rule:"Aamulla sopii Guten Morgen!, päivällä Guten Tag! ja illalla Guten Abend!. Kun lähdet tutun luota, voit sanoa Tschüss!.",
    contrast:"Guten Abend! on illan tervehdys, mutta Gute Nacht! toivotetaan nukkumaan mennessä. Ne eivät tarkoita samaa asiaa.",
    apply:"Kuvittele saapuvasi kurssille aamulla. Minkä tervehdyksen valitset? Entä mitä sanot lähtiessäsi?"
  },
  "02":{
    goal:"Opit kysymään toisen nimeä ja kertomaan oman nimesi.",
    example:"Wie heißt du?",
    rule:"Wie heißt du? tarkoittaa Mikä sinun nimesi on? Voit vastata Ich heiße Aino. Myös Ich bin Aino toimii esittäytyessä.",
    contrast:"Ich heiße tarkoittaa nimeni on, kun taas Ich bin on yleisempi ilmaus minä olen. Molempia voi käyttää esittäytymisessä.",
    apply:"Esittäydy yhdellä saksankielisellä virkkeellä ja kysy sitten uuden tuttavan nimeä."
  },
  "03":{
    goal:"Opit kertomaan alkuperäsi ja erottamaan sen asuinpaikastasi.",
    example:"Ich komme aus Finnland.",
    rule:"Woher kommst du? kysyy, mistä olet kotoisin. Vastaus voi olla Ich komme aus Finnland.",
    contrast:"Woher tarkoittaa mistä, mutta wo tarkoittaa missä. Wo wohnst du? kysyy asuinpaikkaa, ei alkuperää.",
    apply:"Kysy, mistä uusi kurssikaveri on kotoisin, ja vastaa itse kokonaisella Ich komme aus -lauseella."
  },
  "04":{
    goal:"Opit sinuttelemaan tuttua ja puhuttelemaan kohteliaasti.",
    example:"Wie heißen Sie?",
    rule:"Tuttua voit sinutella: Wie heißt du? Kohteliaasti voit kysyä Wie heißen Sie?",
    contrast:"Sie kirjoitetaan tässä isolla alkukirjaimella. Myös verbimuoto muuttuu: heißt du mutta heißen Sie.",
    apply:"Kuvittele kysyväsi ensin ystäväsi, sitten opettajan nimeä. Mitä kysymyksessä pitää vaihtaa?"
  },
  "05":{
    goal:"Opit kysymään kuulumisia ja vastaamaan erilaisissa tilanteissa.",
    example:"Wie geht’s?",
    rule:"Wie geht's? kysyy kuulumisia tutulta. Voit vastata Gut, danke. tai esimerkiksi Nicht so gut.",
    contrast:"Kuulumiskysymykseen ei tarvitse aina vastata gut. Valitse vastaus tilanteen mukaan.",
    apply:"Kysy ystävältä, miten hän voi, ja harjoittele kahta erilaista vastausta."
  },
  "06":{
    goal:"Opit kysymään ikää ja kertomaan sen saksaksi.",
    example:"Ich bin siebzehn Jahre alt",
    rule:"Wie alt bist du? tarkoittaa Kuinka vanha olet? Voit vastata Ich bin siebzehn Jahre alt.",
    contrast:"Saksassa ikä ilmaistaan sein-verbillä aivan kuten suomessa olla-verbillä: Ich bin siebzehn Jahre alt. Älä korvaa bin-muotoa haben-verbillä (ich habe).",
    apply:"Kerro oma ikäsi kokonaisena saksankielisenä lauseena. Harjoittele sen jälkeen ikäkysymys."
  },
  "07":{
    goal:"Opit pyytämään nimen tavaamista ja tarkistamaan kirjoitusasun.",
    example:"Bitte buchstabieren Sie.",
    rule:"Wie schreibt man das? kysyy, miten sana kirjoitetaan. Bitte buchstabieren Sie! on kohtelias pyyntö tavata.",
    contrast:"Tavaaminen tarkoittaa kirjainten kertomista järjestyksessä. Se ei ole sama asia kuin koko sanan toistaminen.",
    apply:"Sano oma nimesi ja kokeile tavata kirjaimet hitaasti oikeassa järjestyksessä."
  },
  "08":{
    goal:"Opit pyytämään apua, kun et ymmärrä jotakin saksaksi.",
    example:"Ich verstehe nicht.",
    rule:"Ich verstehe nicht. tarkoittaa En ymmärrä. Bitte langsamer! pyytää puhumaan hitaammin.",
    contrast:"Selityksen tai toiston pyytäminen auttaa jatkamaan keskustelua. Älä arvaa, jos tarvitset lisäapua.",
    apply:"Harjoittele pyytämään toistoa, hitaampaa puhetta ja vaikean sanan selitystä."
  },
  "09":{
    goal:"Opit sopimaan tapaamisen viikonpäivän ja kellonajan avulla.",
    example:"am Donnerstag um vier Uhr",
    rule:"am Montag kertoo viikonpäivän ja um vier Uhr kertoo kellonajan. Voit yhdistää ne samaan tapaamisehdotukseen.",
    contrast:"am liittyy viikonpäivään, um kellonaikaan. Näitä ei käytetä toistensa tilalla tässä rakenteessa.",
    apply:"Ehdota tapaamista maanantaille kello neljä ja tarkista, käytitkö molempia ilmauksia oikein."
  },
  "10":{
    goal:"Yhdistät tervehdyksen, esittäytymisen ja jo oppimasi kysymykset keskusteluksi.",
    example:"Ich heiße Aino.",
    rule:"Voit aloittaa Hallo!, kertoa nimesi Ich heiße ... ja alkuperäsi Ich komme aus ... sekä kysyä toisen nimeä.",
    contrast:"Kokonainen keskustelu ei ole irrallinen sanalista. Valitse repliikit loogiseen järjestykseen ja hyvästele lopuksi.",
    apply:"Rakenna kohtaaminen: tervehdi, esittele itsesi, kysy yksi asia ja hyvästele."
  }
};
export function losTeacherChapterTeaching(chapterId:string):LosChapterTeaching {
 return topics[chapterId]??topics["01"]!;
}
