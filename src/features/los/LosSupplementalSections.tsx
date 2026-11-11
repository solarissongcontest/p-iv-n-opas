import { useState } from "react";
import { ArrowRight, BookOpen, Headphones } from "lucide-react";
import { LosAuthenticAudio } from "./LosReferenceTools";
import { useLosChapterDraft } from "./studyState";
import type { LosChapter } from "./catalog";

export function LosUnderstanding({chapter,goToText}:{chapter:LosChapter;goToText:()=>void}) {
  const probes=chapter.id==="01"?
    ["Ketkä ihmiset keskustelevat?", "Mikä tervehdys esiintyy keskustelussa?", "Millä ilmauksella he hyvästelevät toisensa?"]:
    chapter.id==="02"?
    ["Kuka kertoo nimensä?", "Miten nimeä kysytään?", "Mikä kysymyksen vastaus on?"]:
    chapter.id==="03"?
    ["Mistä maasta Berna sanoo olevansa kotoisin?", "Mikä kaupunki tekstissä nimetään?", "Missä kohdassa esiintyy aus-ilmaus?"]:
    chapter.id==="04"?
    ["Ketkä henkilöt käyvät keskustelun?", "Missä repliikissä käytetään kohteliasta puhuttelua?", "Mitä vointiin liittyvää ilmausta tunnistat?"]:
    chapter.id==="05"?
    ["Ketkä kaksi henkilöä puhuvat?", "Millä kysymyksellä toisen vointia kysytään?", "Miten vastauksen sävyä voi kuvata suomeksi?"]:
    chapter.id==="06"?
    ["Löydätkö keskustelusta ikään liittyvän kysymyksen?", "Mikä lukusana esiintyy?", "Miten kysymys eroaa nimikysymyksestä?"]:
    ["Etsi tekstistä kappaleen aiheeseen liittyvä nimi tai ilmaus.", "Etsi yksi jo tuntemasi saksankielinen rakenne.", "Kuvaile omin sanoin, mistä keskustelu kertoo."];
  return <section className="los-inner-page los-understanding">
    <p className="los-eyebrow">VERSTEHEN / KAPITEL {Number(chapter.id)}</p>
    <h1>Ymmärrä</h1>
    <p className="los-page-intro">Lue ensin kappaleen Text A. Ymmärtämisessä ei tarvitse tunnistaa vielä kaikkia tuntemattomia sanoja.</p>
    <h2>Kun teksti on käytettävissä</h2>
    <ol className="los-understanding-probes">{probes.map((prompt,i)=><li key={prompt}><span>{i+1}.</span>{prompt}</li>)}</ol>
    <div className="los-editorial-note">
      <h2>Tekstiin sidottu tarkistus valmistellaan</h2>
      <p>Näitä kysymyksiä ei vielä pisteytetä, sillä kokonainen luvallinen lähdeteksti ja siihen sidotut tarkistettavat vastaukset puuttuvat lukijasta. Vastauksia ei arvata ilman alkuperäislähdettä.</p>
    </div>
    <button className="los-outline-button" onClick={goToText}><BookOpen size={17}/> Siirry Text A:han <ArrowRight size={16}/></button>
  </section>;
}
export function LosTextB({chapter}:{chapter:LosChapter}) {
  return <section className="los-inner-page los-text-b">
    <p className="los-eyebrow">TEXT B / KAPITEL {Number(chapter.id)}</p>
    <h1>Kuuntele tai katso</h1>
    <p className="los-page-intro">Toinen lähdeteksti tai kuuntelu tuo kappaleen aiheen uuteen tilanteeseen. Media toistetaan oppikirjan omalla sivulla.</p>
    {chapter.id==="01"?<>
      <p>Kuuntele aito, ihmisen lausuma luettelo tavallisista tervehdyksistä. Keskity tunnistamaan jo opitut ilmaukset. Äänite ei ole keskustelu.</p>
      <LosAuthenticAudio chapterId={chapter.id} source="B" />
      <h2>Mitä huomasit?</h2>
      <p>Toistuvatko kaikki tutut tervehdykset? Voit käyttää sanastosivua tarkistamiseen, mutta älä luokittele sanoja opituiksi pelkän kuulemisen perusteella.</p>
    </>:<div className="los-source-pending"><Headphones size={23}/><div><h2>Toinen lähdeaineisto valmistellaan</h2><p>Kirjakohtaisessa aineistoluettelossa on tälle kappaleelle ehdokkaita, mutta kokonaisen median käyttö ja upotus varmistetaan erikseen.</p></div></div>}
  </section>;
}
const applications:Record<string,{title:string;prompt:string;checklist:string[];example:string}> = {
  "01":{title:"Tervehdi ja hyvästele",prompt:"Kuvittele, että tulet koululle aamulla ja tapaat opettajan. Myöhemmin hyvästelet tutun ystävän. Kirjoita molempiin tilanteisiin sopiva saksankielinen ilmaus omille riveilleen.",checklist:["Valitsinko aamun tervehdyksen?","Onko hyvästely tuttavallinen?","Kirjoitinko ison alkukirjaimen ja tarvittavat merkit?"],example:"Guten Morgen!\nTschüss!"},
  "02":{title:"Esittäydy uudelle tuttavalle",prompt:"Kirjoita kaksi lyhyttä saksankielistä lausetta: kerro kuvitteellinen nimesi ja kysy toisen nimi. Käytä nimiä Mia ja Max, älä omia henkilötietojasi.",checklist:["Käytinkö ich heiße -muotoa?","Käytinkö Wie heißt du? -kysymystä?","Muistinko ß-kirjaimen?"],example:"Ich heiße Mia.\nWie heißt du?"},
  "03":{title:"Kerro mistä olet kotoisin",prompt:"Esittele kuvitteellinen henkilö, jonka kotimaa on Suomi. Kirjoita saksaksi, mistä henkilö on kotoisin.",checklist:["Muistinko komme-muodon?","Muistinko aus-preposition?","Kirjoitinko Finnland isolla?"],example:"Ich komme aus Finnland."},
  "04":{title:"Kysy nimi kohteliaasti",prompt:"Olet virallisessa tilanteessa. Kirjoita saksaksi kohtelias nimikysymys.",checklist:["Käytinkö isoa Sie-muotoa?","Käytinkö heißen-verbin oikeaa muotoa?","Muistinko kysymysmerkin?"],example:"Wie heißen Sie?"},
  "05":{title:"Kysy ja kerro kuulumiset",prompt:"Kirjoita saksaksi yksinkertainen kuulumiskysymys ja realistinen vastaus.",checklist:["Kysyin kuulumisia.","Vastasin ymmärrettävästi.","Käytin opittua fraasia."],example:"Wie geht's?\nGut, danke."},
  "06":{title:"Kaksi ikäkeskustelua",prompt:"Kirjoita kaksi lyhyttä, erillistä keskustelua kuvitteellisten ihmisten välillä. Ensimmäisessä Mia kysyy ja Max vastaa olevansa 17-vuotias. Toisessa Lena kysyy ja Jonas vastaa olevansa 20-vuotias. Harjoittele ääneen molemmat; oikeaa ikääsi tai syntymäpäivääsi ei kysytä.",checklist:["Kirjoitin molempiin dialogeihin Wie alt bist du? -kysymyksen.","Vastauksissa on bin, ei haben.","Kirjoitin siebzehn ja zwanzig oikein.","Muistin Jahre alt."],example:"Mia: Wie alt bist du?\nMax: Ich bin siebzehn Jahre alt.\n\nLena: Wie alt bist du?\nJonas: Ich bin zwanzig Jahre alt."},
  "07":{title:"Pyydä tavaamaan",prompt:"Kysy, miten jokin kirjoitetaan, ja pyydä kohteliaasti tavaamaan se.",checklist:["Pyysin kirjoitusasun.","Käytin kohteliasta fraasia.","Muistin kysymysmerkin."],example:"Wie schreibt man das?\nBitte buchstabieren Sie."},
  "08":{title:"Pyydä apua",prompt:"Kirjoita saksaksi kaksi fraasia: kerro, ettet ymmärrä, ja pyydä puhumaan hitaammin.",checklist:["Käytin Ich verstehe nicht. -fraasia.","Pyysin hitaammin.","Muistin pisteet."],example:"Ich verstehe nicht.\nBitte langsamer."},
  "09":{title:"Sovi tapaamisaika",prompt:"Kirjoita saksaksi lyhyesti, että tapaaminen on maanantaina kello kolme.",checklist:["Viikonpäivän edellä on am.","Kellonajan edellä on um.","Montag alkaa isolla kirjaimella."],example:"Am Montag um drei Uhr."},
  "10":{title:"Kokoa esittely",prompt:"Kirjoita kuvitteellisesta henkilöstä lyhyt esittäytyminen käyttäen kirjan opittuja tervehdyksiä, nimeä ja kotimaata.",checklist:["Aloitin tervehdyksellä.","Kerroin nimen.","Kerroin kotimaan."],example:"Hallo! Ich heiße Mia. Ich komme aus Finnland."},
};
export function LosApplication({chapter}:{chapter:LosChapter}) {
  const {draft,update,saved}=useLosChapterDraft(1,chapter.id);
  const [showExample,setShowExample]=useState(false);
  const item=applications[chapter.id];
  if(!item)return null;
  return <section className="los-inner-page los-application-page">
    <p className="los-eyebrow">ANWENDEN / KAPITEL {Number(chapter.id)}</p>
    <h1>Käytä saksaa</h1>
    <h2>{item.title}</h2>
    <p>{item.prompt}</p>
    <label className="los-application-label" htmlFor={`los-application-${chapter.id}`}>Oma vastaus</label>
    <textarea id={`los-application-${chapter.id}`} value={draft.applicationDraft} rows={6} maxLength={5000}
      spellCheck={false} placeholder="Kirjoita oma saksankielinen vastauksesi…"
      onChange={event=>update(current=>({...current,applicationDraft:event.target.value}))}/>
    <p className="los-save-state" role="status">{saved?"Vastaus tallennettu tähän selaimeen. Ei vielä synkronointia.":"Tallennus epäonnistui. Kopioi vastauksesi talteen."}</p>
    <h3>Itsearvioinnin tarkistuslista</h3>
    <ul className="los-application-checks">{item.checklist.map(point=><li key={point}>{point}</li>)}</ul>
    <button className="los-outline-button" disabled={!draft.applicationDraft.trim()} onClick={()=>setShowExample(v=>!v)}>
      {showExample?"Piilota mallivastaus":"Näytä mallivastaus oman yrityksen jälkeen"}
    </button>
    {showExample&&<div className="los-model-answer"><p className="los-overline">YKSI MAHDOLLINEN MALLIVASTAUS</p><p lang="de">{item.example}</p><small>Omaa tekstiä ei pisteytetä automaattisesti. Muitakin oikeita vastauksia voi olla.</small></div>}
  </section>;
}
export function LosCulture({chapter}:{chapter:LosChapter}) {
  return <section className="los-inner-page los-culture-page">
    <p className="los-eyebrow">LAND UND LEUTE / KAPITEL {Number(chapter.id)}</p>
    <h1>Kulttuuri</h1>
    {chapter.id==="01"?<>
      <h2>Miten saksankielisessä maailmassa tervehditään?</h2>
      <p>Opetuksessa aloitetaan yleisistä ilmauksista <span lang="de">Guten Morgen</span>, <span lang="de">Guten Tag</span> ja <span lang="de">Guten Abend</span>. Myös alueellisia tervehdysmuotoja voi kuulla.</p>
      <div className="los-culture-term"><strong lang="de">Moin!</strong><p>Tervehdys, jota kuulee varsinkin Pohjois-Saksassa. Sitä käytetään usein muulloinkin kuin aamulla.</p></div>
      <div className="los-culture-term"><strong lang="de">Servus!</strong><p>Varsinkin eteläisillä saksankielisillä alueilla käytetty tuttavallinen tervehdys. Se voi toimia myös hyvästelynä.</p></div>
      <p>Nämä alueelliset fraasit ovat nyt <b>tunnistamissanastoa</b>: niiden käyttäminen ei ole kappaleen kokeen vaatimus.</p>
    </>:chapter.id==="03"?<>
      <h2>DACH ja saksankieliset alueet</h2>
      <p>Lyhenne <strong>DACH</strong> viittaa Saksaan (<span lang="de">Deutschland</span>), Itävaltaan (<span lang="de">Österreich</span>) ja Sveitsiin (<span lang="de">die Schweiz</span>). Näillä alueilla saksaa käytetään monissa arjen ja julkisen elämän tilanteissa.</p>
      <p>Sveitsissä on myös muita kansalliskieliä, eikä siellä tai muissakaan maissa jokainen puhu vain saksaa. Saksaa puhutaan myös pienessä Liechtensteinissa. Puhuttu saksa vaihtelee alueittain, joten myöhemmin kuulet erilaisia ääntämistapoja.</p>
      <div className="los-culture-term"><strong lang="de">Deutschland · Österreich · die Schweiz</strong><p>Muista maiden saksankieliset nimet. Alkeissa harjoitellaan erityisesti ilmaukset <span lang="de">aus Deutschland</span>, <span lang="de">aus Österreich</span> ja <span lang="de">aus der Schweiz</span>.</p></div>
      <p>Harjoittele kirjoittamalla näiden maiden nimet oikein ja nimeämällä ne kuvitteellisen matkareitin pysähdyksiksi. Oikeuksiltaan hyväksytty karttakuva lisätään myöhemmin.</p>
    </>:chapter.id==="04"?<>
      <h2>Sinuttelu ja teitittely</h2>
      <p>Saksassa <span lang="de">du</span> ja <span lang="de">Sie</span> valitaan suhteessa tilanteeseen ja ihmisten keskinäiseen sopimukseen. Nuorten keskinäisissä keskusteluissa <span lang="de">du</span> on tavallinen. Virallisessa asioinnissa <span lang="de">Sie</span> voi olla luonteva.</p>
      <p>Myös työpaikkojen ja koulujen tavat vaihtelevat. Pelkästään iästä ei voi päätellä sopivaa muotoa joka tilanteeseen.</p>
    </>:chapter.id==="05"?<>
      <h2>Kuulumisten kysyminen arjessa</h2>
      <p><span lang="de">Wie geht's?</span> on tavallinen kuulumiskysymys. Sitä voi käyttää lyhyenä tervehdyksen jatkona, mutta läheisen ystävän kanssa vastauksesta voi syntyä myös pidempi keskustelu. Yhtä ainoaa kaikissa tilanteissa toimivaa vastauspituutta ei ole.</p>
      <p>Alkeissa riittää vastata tilanteeseen sopivalla tutulla fraasilla, esimerkiksi <span lang="de">Gut, danke.</span> tai <span lang="de">Nicht so gut.</span>. Vastakysymys <span lang="de">Und dir?</span> sopii tuttavalliseen tilanteeseen, <span lang="de">Und Ihnen?</span> kohteliaaseen puhutteluun.</p>
      <div className="los-culture-term"><strong lang="de">Und dir? / Und Ihnen?</strong><p>Valinta kertoo puhetilanteesta. Kummankaan fraasin taustalla olevaa sijamuoto-opillista järjestelmää ei tarvitse tässä kappaleessa osata.</p></div>
    </>:chapter.id==="06"?<>
      <h2>Ikä ja henkilötiedot</h2>
      <p>Saksaksi ikää kysytään <span lang="de">Wie alt bist du?</span> ja kerrotaan <span lang="de">Ich bin … Jahre alt.</span>. Harjoittele kuvitteellisilla henkilöillä, jotta sinun ei tarvitse ilmoittaa oppikirjaan oikeaa syntymäaikaasi.</p>
      <p>Ikä voi kuulua esittäytymiseen, mutta toiselta kysyminen ei ole tarpeen jokaisessa tapaamisessa. Harjoituksen tavoitteena on osata lause, ei kerätä henkilötietoja.</p>
      <div className="los-culture-term"><strong lang="de">siebzehn · zwanzig · einundzwanzig</strong><p>Harjoittele muotoja lukusanoina. Ikälauseessa käytetään <span lang="de">bin</span>-muotoa.</p></div>
    </>:<div className="los-editorial-note"><h2>Kulttuurisivu tarkistetaan</h2><p>Tämän kappaleen erillinen kulttuuriteksti, lähdeviitteet ja oikeuksiltaan hyväksytty kuvitus on vielä toimitettava. Oppikirjaa ei merkitä valmiiksi puuttuvan aineiston perusteella.</p></div>}
    <div className="los-culture-source"><strong>Kuvat ja lähteet</strong><p>Tämän sivun kuvallinen oppimateriaali ja lähdekohtaisten kulttuuriväitteiden toimitukselliset merkinnät ovat vielä valmistelussa. Valmiin kulttuuriosion hyväksyntä edellyttää niitä.</p></div>
  </section>;
}
