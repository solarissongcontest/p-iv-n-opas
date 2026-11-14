import type { ReactNode } from "react";

/**
 * LOS! 1:n alkuopetuksen toimitukselliset malliselitykset.
 * Nämä ovat kirjan omaa opetustekstiä ja esimerkkilauseita, eivät
 * nimettyjä autenttisia lähdetekstejä (Text A / B).
 */
function Example({de,fi}:{de:string;fi:string}) {
  return <div className="los-example"><p lang="de">{de}</p><span>{fi}</span></div>;
}
function Note({title,children}:{title:string;children:ReactNode}) {
  return <aside className="los-grammar-aside"><strong>{title}</strong><p>{children}</p></aside>;
}
function Conjugation({rows}:{rows:[string,string,string][]}) {
  return <table className="los-grammar-table">
    <thead><tr><th>Persoona</th><th>Verbi</th><th>Merkitys</th></tr></thead>
    <tbody>{rows.map(([person,word,meaning])=><tr key={person}><td lang="de">{person}</td><td lang="de"><b>{word}</b></td><td>{meaning}</td></tr>)}</tbody>
  </table>;
}
export function LosChapterGrammar({chapterId}:{chapterId:string}) {
  if(chapterId==="02")return <>
    <p>Kun kerrot nimesi saksaksi, voit sanoa <b lang="de">Ich heiße …</b>. Verbi <i lang="de">heißen</i> tarkoittaa tässä ”olla nimeltään”. Saksan verbin muoto muuttuu sen mukaan, kuka tekee tai on jotakin. Aloitamme kahdesta persoonasta.</p>
    <Example de="Ich heiße Greta." fi="Minun nimeni on Greta." />
    <Example de="Wie heißt du?" fi="Mikä sinun nimesi on?" />
    <h3>Heißen-verbin muodot</h3>
    <Conjugation rows={[["ich","heiße","minä olen nimeltäni"],["du","heißt","sinä olet nimeltäsi"]]} />
    <p>Huomaa, että <b lang="de">ich</b> tarkoittaa minää ja <b lang="de">du</b> sinää. Sanassa <i lang="de">heiße</i> on ß-kirjain. Muoto <i lang="de">du heißt</i> ei saa ylimääräistä s-kirjainta.</p>
    <h3>Sein: olla</h3>
    <p>Toinen hyvin tavallinen saksan verbi on <b lang="de">sein</b> (olla). Sen kaksi ensimmäistä muotoa eivät muistuta verbin perusmuotoa, joten ne opetellaan ulkoa.</p>
    <Conjugation rows={[["ich","bin","minä olen"],["du","bist","sinä olet"]]} />
    <Example de="Ich bin Greta." fi="Minä olen Greta." />
    <p><span lang="de">Ich bin Greta.</span> ja <span lang="de">Ich heiße Greta.</span> voivat molemmat olla luontevia esittäytymisiä. Ensimmäinen kertoo ”minä olen Greta”, toinen nimen.</p>
    <Note title="Muista kysymyksen sanajärjestys">Kysymyssana tulee tässä ensin: <span lang="de">Wie heißt du?</span> Kun vastaat, aloita subjektista: <span lang="de">Ich heiße …</span>.</Note>
  </>;
  if(chapterId==="03")return <>
    <p>Kun joku kysyy, mistä olet kotoisin, hän voi sanoa <b lang="de">Woher kommst du?</b> Sana <b lang="de">woher</b> kysyy lähtöpaikkaa: ”mistä”. Vastauksessa käytetään usein rakennetta <span lang="de">ich komme aus …</span>.</p>
    <Example de="Woher kommst du?" fi="Mistä olet kotoisin?" />
    <Example de="Ich komme aus Finnland." fi="Olen kotoisin Suomesta." />
    <h3>Kommen-verbin kaksi muotoa</h3>
    <p>Verbin perusmuoto on <b lang="de">kommen</b> (tulla). Kun puhut itsestäsi, muoto on <span lang="de">ich komme</span>. Kun kysyt toiselta, käytät muotoa <span lang="de">du kommst</span>.</p>
    <Conjugation rows={[["ich","komme","minä tulen"],["du","kommst","sinä tulet"]]} />
    <h3>Wo ja woher</h3>
    <p><b lang="de">Wo?</b> kysyy, missä jokin on. <b lang="de">Woher?</b> kysyy, mistä jokin tai joku tulee. Tässä kappaleessa harjoittelet erityisesti jälkimmäistä.</p>
    <Note title="Maanimen yhteydessä pieni poikkeus">Useimmista maista sanotaan <span lang="de">aus Finnland</span> tai <span lang="de">aus Deutschland</span>. Tunnista poikkeukset <span lang="de">aus der Schweiz</span> ja <span lang="de">aus den USA</span>. Niiden sijamuotoja ei tarvitse vielä muodostaa itse.</Note>
    <p>Kun luet toisen henkilön esittelyä, voit nähdä myös muodon <span lang="de">er/sie kommt</span> (hän tulee). Se riittää tässä vaiheessa tunnistaa, eikä koko taivutusta opetella ulkoa.</p>
  </>;
  if(chapterId==="04")return <>
    <p>Saksassa puhuttelu riippuu tilanteesta, suhteesta ja yhteisön tavoista. <b lang="de">du</b> on tuttavallinen sinä. Isolla alkukirjaimella kirjoitettu <b lang="de">Sie</b> on kohtelias teitittelymuoto.</p>
    <Example de="Wie heißt du?" fi="Mikä sinun nimesi on?" />
    <Example de="Wie heißen Sie?" fi="Mikä Teidän nimenne on?" />
    <p>Teititeltäessä verbi on tavallisesti samassa muodossa kuin perusmuodon näköinen monikon persoonamuoto: <span lang="de">Sie heißen</span>, <span lang="de">Sie kommen</span>.</p>
    <Example de="Woher kommen Sie?" fi="Mistä Te olette kotoisin?" />
    <p>Isolla alkukirjaimella kirjoitettu <b lang="de">Sie</b> tarkoittaa teitittelyä. Pienellä alkukirjaimella kirjoitetulla <span lang="de">sie</span>-pronominilla voi olla toinen merkitys (hän, naisesta, tai he). Tunnista ero, mutta älä opettele tässä vielä kaikkia muotoja.</p>
    <Note title="Miten valitsen puhuttelumuodon?">Nuorten kesken käytetään yleensä du-muotoa. Virallisissa tilanteissa Sie voi olla luonteva. Pelkkä henkilön ikä ei ratkaise asiaa aina.</Note>
  </>;
  if(chapterId==="05")return <>
    <p>Kuulumisia kysytään tavallisesti valmiilla fraasilla <b lang="de">Wie geht's?</b>. Alussa tärkeintä on oppia yleiset kysymykset ja vastaukset kokonaisina ilmauksina.</p>
    <Example de="Wie geht es dir?" fi="Mitä sinulle kuuluu?" />
    <Example de="Mir geht's gut, danke." fi="Minulle kuuluu hyvää, kiitos." />
    <Example de="Nicht so gut." fi="Ei kovin hyvää." />
    <p>Sana <b lang="de">nicht</b> on tavallinen kieltoilmaus. Se vastaa usein suomen sanaa ”ei”. Sana <b lang="de">sehr</b> puolestaan vahvistaa merkitystä: <span lang="de">sehr gut</span> tarkoittaa ”erittäin hyvää”.</p>
    <Note title="Opettele fraasit tässä vaiheessa kokonaisina">Sanojen <span lang="de">mir</span> ja <span lang="de">dir</span> sijamuotoja ei vielä tarvitse osata muodostaa itse.</Note>
  </>;
  if(chapterId==="06")return <>
    <p>Saksassa ikä kerrotaan <b lang="de">sein</b>-verbillä: kirjaimellisesti ”olen … vuotta vanha”. Älä käännä suomen ikälausetta sanasta sanaan tai käytä siihen <span lang="de">haben</span>-verbiä.</p>
    <Example de="Wie alt bist du?" fi="Kuinka vanha olet?" />
    <Example de="Ich bin siebzehn Jahre alt." fi="Olen seitsemäntoista vuotta vanha." />
    <h3>Numerot 0–20</h3>
    <table className="los-grammar-table"><thead><tr><th>Luku</th><th>Saksaksi</th><th>Luku</th><th>Saksaksi</th></tr></thead><tbody>
      {[["0","null","10","zehn"],["1","eins","11","elf"],["2","zwei","12","zwölf"],["3","drei","13","dreizehn"],["4","vier","14","vierzehn"],["5","fünf","15","fünfzehn"],["6","sechs","16","sechzehn"],["7","sieben","17","siebzehn"],["8","acht","18","achtzehn"],["9","neun","19","neunzehn"],["20","zwanzig","21","einundzwanzig"]].map(row=><tr key={row[0]}>{row.map((value,i)=><td key={i} lang={i%2===1?"de":undefined}>{value}</td>)}</tr>)}
    </tbody></table>
    <p>Luvut 21–99 muodostetaan yleensä sanomalla ensin ykköset, sitten <span lang="de">und</span> ja lopuksi kymmenet: <b lang="de">einundzwanzig</b> on 21 ja <b lang="de">zweiunddreißig</b> on 32.</p>
    <Note title="Poikkeuksia">Muista erityisesti <span lang="de">sechzehn</span>, <span lang="de">siebzehn</span> ja <span lang="de">dreißig</span>. Kymmenlukuja 30–100 opetellaan vähitellen.</Note>
  </>;
  if(chapterId==="07")return <>
    <p>Kun nimeä ei kuule oikein, voit pyytää toista tavaamaan sen. Saksassa kirjaimet ääntyvät osin eri tavoin kuin suomessa.</p>
    <Example de="Wie schreibt man das?" fi="Miten se kirjoitetaan?" />
    <Example de="Bitte buchstabieren Sie." fi="Voisitteko tavata nimen, kiitos?" />
    <h3>Kirjoitusasu ja kirjaimen nimi ovat eri asioita</h3>
    <p>Saksan aakkosissa on tutut latinalaiset kirjaimet A–Z. Saksan kirjaimet eivät kuitenkaan välttämättä äänny samoin kuin suomen kirjaimet: esimerkiksi <span lang="de">J</span> on tavallisesti j-äänne sanassa, mutta kirjaimen oma saksankielinen nimi on erillinen opeteltava asia. Oikea tavaaminen kuunnellaan mieluiten ihmisen puheesta.</p>
    <p>Opettele erottamaan myös saksan kirjainmerkit <b lang="de">ä, ö, ü</b> ja <b lang="de">ß</b>. Joissakin teknisissä yhteyksissä käytetään korvaavia merkintöjä <span lang="de">ae, oe, ue</span> ja <span lang="de">ss</span>. Korvausmerkintä ei ole yleispätevästi sama kuin sanan oikea kirjoitusasu.</p>
    <Example de="M – I – A" fi="Kirjaimittain kirjoitettu nimi Mia. Tämä esimerkki näyttää kirjaimet, ei niiden saksalaista ääntämistä." />
    <Example de="Wie schreibt man das? Bitte buchstabieren Sie." fi="Miten se kirjoitetaan? Voisitteko tavata nimen, kiitos?" />
    <Note title="Tavatun nimen kuuntelu ei ole vielä automaattinen testi">Harjoittele kahdeksan kuvitteellista nimeä ja neljä numerosarjaa ääneen. Kun oikea aakkosäänite lisätään luvallisesti oppikirjaan, voit verrata myös ääntämistä. Pelkkä tekstimuoto ei todista ääntämistä.</Note>
  </>;
  if(chapterId==="08")return <>
    <p>Itsenäisessä opiskelussa tarvitaan myös ilmauksia, joilla voi pyytää apua. Nämä ovat käyttövalmiita fraaseja, jotka kannattaa opetella kokonaisina.</p>
    <Example de="Ich verstehe nicht." fi="En ymmärrä." />
    <Example de="Können Sie das bitte wiederholen?" fi="Voitteko toistaa sen, olkaa hyvä?" />
    <Example de="Bitte langsamer." fi="Hitaammin, olkaa hyvä." />
    <Example de="Was bedeutet das?" fi="Mitä se tarkoittaa?" />
    <Example de="Wie sagt man das auf Deutsch?" fi="Miten se sanotaan saksaksi?" />
    <p>Opettele <span lang="de">Können Sie das bitte wiederholen?</span> yhtenä valmiina kohteliaana pyyntönä. Koko <span lang="de">können</span>-verbin taivutusta, imperatiivia tai uusia sijamuotoja ei tarvitse vielä osata. Sana <span lang="de">Wort</span> tarkoittaa sanaa ja <span lang="de">Satz</span> lausetta.</p>
    <h3>Kolme tapaa ratkaista ymmärtämisongelma</h3>
    <ol>
      <li>Jos et ymmärrä, ilmaise se: <span lang="de">Ich verstehe nicht.</span></li>
      <li>Pyydä toistamaan tai hidastamaan: <span lang="de">Noch einmal, bitte.</span> tai <span lang="de">Bitte langsamer.</span></li>
      <li>Jos sana on uusi, kysy: <span lang="de">Was bedeutet das?</span></li>
    </ol>
    <Note title="Oppimisstrategia">Pysäytä äänite, kuuntele uudelleen ja tunnista ensin tutut sanat. Kaikkia sanoja ei tarvitse ymmärtää heti. Tämän kappaleen julkaisematon Text B ei ole vielä oikea kuuntelutehtävä.</Note>
  </>;
  if(chapterId==="09")return <>
    <p>Viikonpäivien kanssa käytetään tavallisesti ilmausta <b lang="de">am Montag</b> (maanantaina). Kellonajan edellä käytetään sanaa <b lang="de">um</b>.</p>
    <Example de="Am Montag um drei Uhr." fi="Maanantaina kello kolmelta." />
    <Example de="Am Freitag um vier Uhr." fi="Perjantaina kello neljä." />
    <h3>Viikonpäivät</h3>
    <table className="los-grammar-table"><thead><tr><th>Suomeksi</th><th lang="de">Deutsch</th></tr></thead><tbody>
      {[["maanantai","Montag"],["tiistai","Dienstag"],["keskiviikko","Mittwoch"],["torstai","Donnerstag"],["perjantai","Freitag"],["lauantai","Samstag"],["sunnuntai","Sonntag"]].map(([fi,de])=><tr key={de}><td>{fi}</td><td lang="de">{de}</td></tr>)}
    </tbody></table>
    <p>Viikonpäivät kirjoitetaan isolla, sillä ne ovat saksassa substantiiveja. Kirjoita <span lang="de">am Montag</span> mutta <span lang="de">um drei Uhr</span>. Sana <b lang="de">wann</b> kysyy <i>milloin</i>.</p>
    <p>Erota <span lang="de">heute</span> (tänään), <span lang="de">morgen</span> (huomenna) ja <span lang="de">gestern</span> (eilen). Isolla kirjoitettu <span lang="de">der Morgen</span> tarkoittaa aamua.</p>
    <Note title="Rajattu ajanilmaisu riittää">Tasatunnit ja am/um ovat aktiivisia tavoitteita. Lähdetekstin muotoja <span lang="de">halb</span>, <span lang="de">Viertel vor</span> ja <span lang="de">Viertel nach</span> saa oppia tunnistamaan, mutta niitä ei vaadita vielä itsenäisessä testissä.</Note>
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
      ].map(([person,named,be,from])=><tr key={person}><td lang="de">{person}</td><td lang="de">{named}</td><td lang="de">{be}</td><td lang="de">{from}</td></tr>)}</tbody>
    </table>
    <p>Kolmannen henkilön esitteleminen onnistuu lyhyillä lauseilla: <span lang="de">Das ist Mia. Sie heißt Mia. Sie kommt aus Finnland.</span> Muista, että kohtelias <span lang="de">Sie</span> ja naisesta käytetty <span lang="de">sie</span> ovat eri käyttötapoja.</p>
    <h3>Harjoittele kaksi erilaista kohtaamista</h3>
    <p>Kirjoita ensin 6–8 repliikin tuttavallinen keskustelu ja sen jälkeen erillinen kohtelias keskustelu opettajan kanssa. Kerro tervehdyksen jälkeen nimet, alkuperä ja jokin tuttu perustieto. Lopeta sopivaan hyvästelyyn. Kirjoita myös erikseen neljä lausetta kolmannesta henkilöstä.</p>
    <Note title="Kappaletesti ei ole kirjan loppukoe">C10 tarkistaa opittuja muotoja ja fraaseja. Täydellinen omien kohtaamisten tuottaminen arvioidaan erillisellä tarkistuslistalla, ja koko kirjan loppukoe on oma osionsa. Ei automaattista kielitaidon prosenttilukua.</Note>
  </>;
  return null;
}
