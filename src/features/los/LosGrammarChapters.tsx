import type { ReactNode } from "react";
import {LosVocabularyAudio} from "./LosVocabularyAudio";

/**
 * LOS! 1:n alkuopetuksen toimitukselliset malliselitykset.
 * Nämä ovat kirjan omaa opetustekstiä ja esimerkkilauseita, eivät
 * nimettyjä autenttisia lähdetekstejä (Text A / B).
 */
function Example({de,fi}:{de:string;fi:string}) {
  return <div className="los-example"><p lang="de">{de}</p><LosVocabularyAudio word={de} kind="lause"/><span>{fi}</span></div>;
}
function GermanInline({de,as="span"}:{de:string;as?:"span"|"b"|"i"}){
 const Tag=as;
 return <span className="los-grammar-inline-speech"><Tag lang="de">{de}</Tag><LosVocabularyAudio word={de} kind="ilmaus"/></span>;
}
function Note({title,children}:{title:string;children:ReactNode}) {
  return <aside className="los-grammar-aside"><strong>{title}</strong><p>{children}</p></aside>;
}
function Conjugation({rows}:{rows:[string,string,string][]}) {
  return <table className="los-grammar-table">
    <thead><tr><th>Persoona</th><th>Verbi</th><th>Merkitys</th></tr></thead>
    <tbody>{rows.map(([person,word,meaning])=><tr key={person}><td lang="de">{person}</td><td><GermanInline as="b" de="{word}" /><LosVocabularyAudio word={word}/></td><td>{meaning}</td></tr>)}</tbody>
  </table>;
}
export function LosChapterGrammar({chapterId}:{chapterId:string}) {
  if(chapterId==="02")return <>
    <p>Kun kerrot nimesi saksaksi, voit sanoa <GermanInline as="b" de="Ich heiße …" />. Verbi <GermanInline as="i" de="heißen" /> tarkoittaa tässä ”olla nimeltään”. Saksan verbin muoto muuttuu sen mukaan, kuka tekee tai on jotakin. Aloitamme kahdesta persoonasta.</p>
    <Example de="Ich heiße Greta." fi="Minun nimeni on Greta." />
    <Example de="Wie heißt du?" fi="Mikä sinun nimesi on?" />
    <h3>Heißen-verbin muodot</h3>
    <Conjugation rows={[["ich","heiße","minä olen nimeltäni"],["du","heißt","sinä olet nimeltäsi"]]} />
    <p>Huomaa, että <GermanInline as="b" de="ich" /> tarkoittaa minää ja <GermanInline as="b" de="du" /> sinää. Sanassa <GermanInline as="i" de="heiße" /> on ß-kirjain. Muoto <GermanInline as="i" de="du heißt" /> ei saa ylimääräistä s-kirjainta.</p>
    <h3>Sein: olla</h3>
    <p>Toinen hyvin tavallinen saksan verbi on <GermanInline as="b" de="sein" /> (olla). Sen kaksi ensimmäistä muotoa eivät muistuta verbin perusmuotoa, joten ne opetellaan ulkoa.</p>
    <Conjugation rows={[["ich","bin","minä olen"],["du","bist","sinä olet"]]} />
    <Example de="Ich bin Greta." fi="Minä olen Greta." />
    <p><GermanInline as="span" de="Ich bin Greta." /> ja <GermanInline as="span" de="Ich heiße Greta." /> voivat molemmat olla luontevia esittäytymisiä. Ensimmäinen kertoo ”minä olen Greta”, toinen nimen.</p>
    <Note title="Muista kysymyksen sanajärjestys">Kysymyssana tulee tässä ensin: <GermanInline as="span" de="Wie heißt du?" /> Kun vastaat, aloita subjektista: <GermanInline as="span" de="Ich heiße …" />.</Note>
  </>;
  if(chapterId==="03")return <>
    <p>Kun joku kysyy, mistä olet kotoisin, hän voi sanoa <GermanInline as="b" de="Woher kommst du?" /> Sana <GermanInline as="b" de="woher" /> kysyy lähtöpaikkaa: ”mistä”. Vastauksessa käytetään usein rakennetta <GermanInline as="span" de="ich komme aus …" />.</p>
    <Example de="Woher kommst du?" fi="Mistä olet kotoisin?" />
    <Example de="Ich komme aus Finnland." fi="Olen kotoisin Suomesta." />
    <h3>Kommen-verbin kaksi muotoa</h3>
    <p>Verbin perusmuoto on <GermanInline as="b" de="kommen" /> (tulla). Kun puhut itsestäsi, muoto on <GermanInline as="span" de="ich komme" />. Kun kysyt toiselta, käytät muotoa <GermanInline as="span" de="du kommst" />.</p>
    <Conjugation rows={[["ich","komme","minä tulen"],["du","kommst","sinä tulet"]]} />
    <h3>Wo ja woher</h3>
    <p><GermanInline as="b" de="Wo?" /> kysyy, missä jokin on. <GermanInline as="b" de="Woher?" /> kysyy, mistä jokin tai joku tulee. Tässä kappaleessa harjoittelet erityisesti jälkimmäistä.</p>
    <Note title="Maanimen yhteydessä pieni poikkeus">Useimmista maista sanotaan <GermanInline as="span" de="aus Finnland" /> tai <GermanInline as="span" de="aus Deutschland" />. Tunnista poikkeukset <GermanInline as="span" de="aus der Schweiz" /> ja <GermanInline as="span" de="aus den USA" />. Niiden sijamuotoja ei tarvitse vielä muodostaa itse.</Note>
    <p>Kun luet toisen henkilön esittelyä, voit nähdä myös muodon <GermanInline as="span" de="er/sie kommt" /> (hän tulee). Se riittää tässä vaiheessa tunnistaa, eikä koko taivutusta opetella ulkoa.</p>
  </>;
  if(chapterId==="04")return <>
    <p>Saksassa puhuttelu riippuu tilanteesta, suhteesta ja yhteisön tavoista. <GermanInline as="b" de="du" /> on tuttavallinen sinä. Isolla alkukirjaimella kirjoitettu <GermanInline as="b" de="Sie" /> on kohtelias teitittelymuoto.</p>
    <Example de="Wie heißt du?" fi="Mikä sinun nimesi on?" />
    <Example de="Wie heißen Sie?" fi="Mikä Teidän nimenne on?" />
    <p>Teititeltäessä verbi on tavallisesti samassa muodossa kuin perusmuodon näköinen monikon persoonamuoto: <GermanInline as="span" de="Sie heißen" />, <GermanInline as="span" de="Sie kommen" />.</p>
    <Example de="Woher kommen Sie?" fi="Mistä Te olette kotoisin?" />
    <p>Isolla alkukirjaimella kirjoitettu <GermanInline as="b" de="Sie" /> tarkoittaa teitittelyä. Pienellä alkukirjaimella kirjoitetulla <GermanInline as="span" de="sie" />-pronominilla voi olla toinen merkitys (hän, naisesta, tai he). Tunnista ero, mutta älä opettele tässä vielä kaikkia muotoja.</p>
    <Note title="Miten valitsen puhuttelumuodon?">Nuorten kesken käytetään yleensä du-muotoa. Virallisissa tilanteissa Sie voi olla luonteva. Pelkkä henkilön ikä ei ratkaise asiaa aina.</Note>
  </>;
  if(chapterId==="05")return <>
    <p>Kuulumisia kysytään tavallisesti valmiilla fraasilla <GermanInline as="b" de="Wie geht's?" />. Alussa tärkeintä on oppia yleiset kysymykset ja vastaukset kokonaisina ilmauksina.</p>
    <Example de="Wie geht es dir?" fi="Mitä sinulle kuuluu?" />
    <Example de="Mir geht's gut, danke." fi="Minulle kuuluu hyvää, kiitos." />
    <Example de="Nicht so gut." fi="Ei kovin hyvää." />
    <p>Sana <GermanInline as="b" de="nicht" /> on tavallinen kieltoilmaus. Se vastaa usein suomen sanaa ”ei”. Sana <GermanInline as="b" de="sehr" /> puolestaan vahvistaa merkitystä: <GermanInline as="span" de="sehr gut" /> tarkoittaa ”erittäin hyvää”.</p>
    <Note title="Opettele fraasit tässä vaiheessa kokonaisina">Sanojen <GermanInline as="span" de="mir" /> ja <GermanInline as="span" de="dir" /> sijamuotoja ei vielä tarvitse osata muodostaa itse.</Note>
  </>;
  if(chapterId==="06")return <>
    <p>Saksassa ikä kerrotaan <GermanInline as="b" de="sein" />-verbillä: kirjaimellisesti ”olen … vuotta vanha”. Älä käännä suomen ikälausetta sanasta sanaan tai käytä siihen <GermanInline as="span" de="haben" />-verbiä.</p>
    <Example de="Wie alt bist du?" fi="Kuinka vanha olet?" />
    <Example de="Ich bin siebzehn Jahre alt." fi="Olen seitsemäntoista vuotta vanha." />
    <h3>Numerot 0–20</h3>
    <table className="los-grammar-table"><thead><tr><th>Luku</th><th>Saksaksi</th><th>Luku</th><th>Saksaksi</th></tr></thead><tbody>
      {[["0","null","10","zehn"],["1","eins","11","elf"],["2","zwei","12","zwölf"],["3","drei","13","dreizehn"],["4","vier","14","vierzehn"],["5","fünf","15","fünfzehn"],["6","sechs","16","sechzehn"],["7","sieben","17","siebzehn"],["8","acht","18","achtzehn"],["9","neun","19","neunzehn"],["20","zwanzig","21","einundzwanzig"]].map(row=><tr key={row[0]}>{row.map((value,i)=><td key={i} lang={i%2===1?"de":undefined}>{value}{i%2===1&&<LosVocabularyAudio word={value}/>}</td>)}</tr>)}
    </tbody></table>
    <p>Luvut 21–99 muodostetaan yleensä sanomalla ensin ykköset, sitten <GermanInline as="span" de="und" /> ja lopuksi kymmenet: <GermanInline as="b" de="einundzwanzig" /> on 21 ja <GermanInline as="b" de="zweiunddreißig" /> on 32.</p>
    <Note title="Poikkeuksia">Muista erityisesti <GermanInline as="span" de="sechzehn" />, <GermanInline as="span" de="siebzehn" /> ja <GermanInline as="span" de="dreißig" />. Kymmenlukuja 30–100 opetellaan vähitellen.</Note>
  </>;
  if(chapterId==="07")return <>
    <p>Kun nimeä ei kuule oikein, voit pyytää toista tavaamaan sen. Saksassa kirjaimet ääntyvät osin eri tavoin kuin suomessa.</p>
    <Example de="Wie schreibt man das?" fi="Miten se kirjoitetaan?" />
    <Example de="Bitte buchstabieren Sie." fi="Tavatkaa, olkaa hyvä." />
    <h3>Kirjoitusasu ja kirjaimen nimi ovat eri asioita</h3>
    <p>Saksan aakkosissa on tutut latinalaiset kirjaimet A–Z. Saksan kirjaimet eivät kuitenkaan välttämättä äänny samoin kuin suomen kirjaimet: esimerkiksi <GermanInline as="span" de="J" /> on tavallisesti j-äänne sanassa, mutta kirjaimen oma saksankielinen nimi on erillinen opeteltava asia. Oikea tavaaminen kuunnellaan mieluiten ihmisen puheesta.</p>
    <p>Opettele erottamaan myös saksan kirjainmerkit <GermanInline as="b" de="ä, ö, ü" /> ja <GermanInline as="b" de="ß" />. Joissakin teknisissä yhteyksissä käytetään korvaavia merkintöjä <GermanInline as="span" de="ae, oe, ue" /> ja <GermanInline as="span" de="ss" />. Korvausmerkintä ei ole yleispätevästi sama kuin sanan oikea kirjoitusasu.</p>
    <Example de="M – I – A" fi="Kirjaimittain kirjoitettu nimi Mia. Tämä esimerkki näyttää kirjaimet, ei niiden saksalaista ääntämistä." />
    <Example de="Wie schreibt man das? Bitte buchstabieren Sie." fi="Miten se kirjoitetaan? Tavatkaa, olkaa hyvä." />
    <Note title="Tavatun nimen kuuntelu ei ole vielä automaattinen testi">Harjoittele kahdeksan kuvitteellista nimeä ja neljä numerosarjaa ääneen. Kun oikea aakkosäänite lisätään luvallisesti oppikirjaan, voit verrata myös ääntämistä. Pelkkä tekstimuoto ei todista ääntämistä.</Note>
  </>;
  if(chapterId==="08")return <>
    <p>Itsenäisessä opiskelussa tarvitaan myös ilmauksia, joilla voi pyytää apua. Nämä ovat käyttövalmiita fraaseja, jotka kannattaa opetella kokonaisina.</p>
    <Example de="Ich verstehe nicht." fi="En ymmärrä." />
    <Example de="Können Sie das bitte wiederholen?" fi="Voitteko toistaa sen, olkaa hyvä?" />
    <Example de="Bitte langsamer." fi="Hitaammin, olkaa hyvä." />
    <Example de="Was bedeutet das?" fi="Mitä se tarkoittaa?" />
    <Example de="Wie sagt man das auf Deutsch?" fi="Miten se sanotaan saksaksi?" />
    <p>Opettele <GermanInline as="span" de="Können Sie das bitte wiederholen?" /> yhtenä valmiina kohteliaana pyyntönä. Koko <GermanInline as="span" de="können" />-verbin taivutusta, imperatiivia tai uusia sijamuotoja ei tarvitse vielä osata. Sana <GermanInline as="span" de="Wort" /> tarkoittaa sanaa ja <GermanInline as="span" de="Satz" /> lausetta.</p>
    <h3>Kolme tapaa ratkaista ymmärtämisongelma</h3>
    <ol>
      <li>Jos et ymmärrä, ilmaise se: <GermanInline as="span" de="Ich verstehe nicht." /></li>
      <li>Pyydä toistamaan tai hidastamaan: <GermanInline as="span" de="Noch einmal, bitte." /> tai <GermanInline as="span" de="Bitte langsamer." /></li>
      <li>Jos sana on uusi, kysy: <GermanInline as="span" de="Was bedeutet das?" /></li>
    </ol>
    <Note title="Oppimisstrategia">Pysäytä äänite, kuuntele uudelleen ja tunnista ensin tutut sanat. Kaikkia sanoja ei tarvitse ymmärtää heti. Tämän kappaleen julkaisematon Text B ei ole vielä oikea kuuntelutehtävä.</Note>
  </>;
  if(chapterId==="09")return <>
    <p>Viikonpäivien kanssa käytetään tavallisesti ilmausta <GermanInline as="b" de="am Montag" /> (maanantaina). Kellonajan edellä käytetään sanaa <GermanInline as="b" de="um" />.</p>
    <Example de="Am Montag um drei Uhr." fi="Maanantaina kello kolme." />
    <Example de="Am Freitag um vier Uhr." fi="Perjantaina kello neljä." />
    <h3>Viikonpäivät</h3>
    <table className="los-grammar-table"><thead><tr><th>Suomeksi</th><th lang="de">Deutsch</th></tr></thead><tbody>
      {[["maanantai","Montag"],["tiistai","Dienstag"],["keskiviikko","Mittwoch"],["torstai","Donnerstag"],["perjantai","Freitag"],["lauantai","Samstag"],["sunnuntai","Sonntag"]].map(([fi,de])=><tr key={de}><td>{fi}</td><td lang="de">{de}<LosVocabularyAudio word={de}/></td></tr>)}
    </tbody></table>
    <p>Viikonpäivät kirjoitetaan isolla, sillä ne ovat saksassa substantiiveja. Kirjoita <GermanInline as="span" de="am Montag" /> mutta <GermanInline as="span" de="um drei Uhr" />. Sana <GermanInline as="b" de="wann" /> kysyy <i>milloin</i>.</p>
    <p>Erota <GermanInline as="span" de="heute" /> (tänään), <GermanInline as="span" de="morgen" /> (huomenna) ja <GermanInline as="span" de="gestern" /> (eilen). Isolla kirjoitettu <GermanInline as="span" de="der Morgen" /> tarkoittaa aamua.</p>
    <Note title="Rajattu ajanilmaisu riittää">Tasatunnit ja am/um ovat aktiivisia tavoitteita. Lähdetekstin muotoja <GermanInline as="span" de="halb" />, <GermanInline as="span" de="Viertel vor" /> ja <GermanInline as="span" de="Viertel nach" /> saa oppia tunnistamaan, mutta niitä ei vaadita vielä itsenäisessä testissä.</Note>
  </>;
  if(chapterId==="10")return <>
    <p>Viimeisessä kappaleessa kokoat opitut perusilmaukset yhdeksi kohtaamiseksi: tervehtiminen, nimen kysyminen, kotipaikka, ikä ja hyvästely.</p>
    <Example de="Hallo! Ich heiße Mia." fi="Hei! Nimeni on Mia." />
    <Example de="Ich komme aus Finnland." fi="Olen kotoisin Suomesta." />
    <Example de="Schön, dich kennenzulernen!" fi="Hauska tutustua!" />
    <h3>Kolmen tärkeän verbin kertaus</h3>
    <table className="los-grammar-table">
      <thead><tr><th>Persoona</th><th lang="de">heißen</th><th lang="de">sein</th><th lang="de">kommen</th></tr></thead>
      <tbody>{[
        ["ich","heiße","bin","komme"],
        ["du","heißt","bist","kommst"],
        ["er/sie","heißt","ist","kommt"],
        ["Sie (kohtelias)","heißen","sind","kommen"],
      ].map(([person,named,be,from])=><tr key={person}><td lang="de">{person}</td><td lang="de">{named}<LosVocabularyAudio word={named}/></td><td lang="de">{be}<LosVocabularyAudio word={be}/></td><td lang="de">{from}<LosVocabularyAudio word={from}/></td></tr>)}</tbody>
    </table>
    <p>Kolmannen henkilön esitteleminen onnistuu lyhyillä lauseilla: <GermanInline as="span" de="Das ist Mia. Sie heißt Mia. Sie kommt aus Finnland." /> Muista, että kohtelias <GermanInline as="span" de="Sie" /> ja naisesta käytetty <GermanInline as="span" de="sie" /> ovat eri käyttötapoja.</p>
    <h3>Harjoittele kaksi erilaista kohtaamista</h3>
    <p>Kirjoita ensin 6–8 repliikin tuttavallinen keskustelu ja sen jälkeen erillinen kohtelias keskustelu opettajan kanssa. Kerro tervehdyksen jälkeen nimet, alkuperä ja jokin tuttu perustieto. Lopeta sopivaan hyvästelyyn. Kirjoita myös erikseen neljä lausetta kolmannesta henkilöstä.</p>
    <Note title="Kappaletesti ei ole kirjan loppukoe">C10 tarkistaa opittuja muotoja ja fraaseja. Täydellinen omien kohtaamisten tuottaminen arvioidaan erillisellä tarkistuslistalla, ja koko kirjan loppukoe on oma osionsa. Ei automaattista kielitaidon prosenttilukua.</Note>
  </>;
  return null;
}
