import { useState } from "react";
import { ArrowRight, BookOpen, Headphones } from "lucide-react";
import { LosC01Understanding } from "./LosC01Understanding";
import { LosVoicePractice } from "./LosVoicePractice";
import { LosC02SecondaryText } from "./LosC02SecondaryText";
import { LosAdditionalTextB } from "./LosAdditionalTextB";
import { useLosChapterDraft } from "./studyState";
import type { LosChapter } from "./catalog";

export function LosUnderstanding({chapter,goToText}:{chapter:LosChapter;goToText:()=>void}) {
  if(chapter.id==="01")return <LosC01Understanding goToText={goToText}/>;
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
    chapter.id==="07"?
    ["Ketkä keskustelevat puhelimessa?", "Missä kohdassa joku pyytää tavaamaan?", "Minkä nimen kirjaimista saat selvää?"]:
    chapter.id==="08"?
    ["Kuka haastattelussa kertoo opiskelustaan?", "Etsi yksi jo tuttu sana, jos aineisto on julkaistu.", "Missä tilanteessa pyytäisit puhujaa toistamaan?"]:
    chapter.id==="09"?
    ["Ketkä sopivat ajankohdasta?", "Mikä päivä tai kellonaika mainitaan?", "Mitkä ajanilmaukset ovat vielä vain tunnistettavia?"]:
    chapter.id==="10"?
    ["Mitä henkilö kertoo omasta nimestään?", "Mitä tietoa hän antaa kotipaikastaan?", "Poimi yksi jo oppimasi esittelyilmaus."]:
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
    {(chapter.id==="02"||chapter.id==="03")?<LosC02SecondaryText chapterId={chapter.id}/>:
      ["01","04","05","06","07","08","09","10"].includes(chapter.id)?
        <LosAdditionalTextB chapterId={chapter.id}/>:
        <div className="los-source-pending"><Headphones size={23}/><div>
          <h2>Toinen lähdeaineisto valmistellaan</h2>
          <p>Tekstin lähde ja käyttöoikeus varmistetaan erikseen.</p>
        </div></div>}
  </section>;
}
const applications:Record<string,{title:string;prompt:string;checklist:string[];example:string}> = {
  "01":{title:"Tervehdi ja hyvästele",prompt:"Kuvittele, että tulet koululle aamulla ja tapaat opettajan. Myöhemmin hyvästelet tutun ystävän. Kirjoita molempiin tilanteisiin sopiva saksankielinen ilmaus omille riveilleen.",checklist:["Valitsinko aamun tervehdyksen?","Onko hyvästely tuttavallinen?","Kirjoitinko ison alkukirjaimen ja tarvittavat merkit?"],example:"Guten Morgen!\nTschüss!"},
  "02":{title:"Esittäydy uudelle tuttavalle",prompt:"Kirjoita kaksi lyhyttä saksankielistä lausetta: kerro kuvitteellinen nimesi ja kysy toisen nimi. Käytä nimiä Mia ja Max, älä omia henkilötietojasi.",checklist:["Käytinkö ich heiße -muotoa?","Käytinkö Wie heißt du? -kysymystä?","Muistinko ß-kirjaimen?"],example:"Ich heiße Mia.\nWie heißt du?"},
  "03":{title:"Kerro mistä olet kotoisin",prompt:"Esittele kuvitteellinen henkilö, jonka kotimaa on Suomi. Kirjoita saksaksi, mistä henkilö on kotoisin.",checklist:["Muistinko komme-muodon?","Muistinko aus-preposition?","Kirjoitinko Finnland isolla?"],example:"Ich komme aus Finnland."},
  "04":{title:"Kaksi erilaista kohtaamista",prompt:"Kirjoita kaksi erillistä lyhyttä keskustelua. Ensimmäisessä tapaat tutun samanikäisen henkilön ja kysyt hänen nimeään. Toisessa asioit virallisesti tuntemattoman aikuisen kanssa ja kysyt nimeä kohteliaasti. Voit käyttää kuvitteellisia nimiä, kuten Mia ja Herr Schmidt.",checklist:["Ystävän kanssa käytin du- ja heißt-muotoa.","Virallisessa tilanteessa käytin isolla kirjoitettua Sie- ja heißen-muotoa.","Molemmissa on sopiva tervehdys ja kysymysmerkki."],example:"Hallo! Wie heißt du?\nIch heiße Mia.\n\nGuten Tag! Wie heißen Sie?\nIch heiße Herr Schmidt."},
  "05":{title:"Kysy ja kerro kuulumiset",prompt:"Kirjoita saksaksi yksinkertainen kuulumiskysymys ja realistinen vastaus.",checklist:["Kysyin kuulumisia.","Vastasin ymmärrettävästi.","Käytin opittua fraasia."],example:"Wie geht's?\nGut, danke."},
  "06":{title:"Kaksi ikäkeskustelua",prompt:"Kirjoita kaksi lyhyttä, erillistä keskustelua kuvitteellisten ihmisten välillä. Ensimmäisessä Mia kysyy ja Max vastaa olevansa 17-vuotias. Toisessa Lena kysyy ja Jonas vastaa olevansa 20-vuotias. Harjoittele ääneen molemmat; oikeaa ikääsi tai syntymäpäivääsi ei kysytä.",checklist:["Kirjoitin molempiin dialogeihin Wie alt bist du? -kysymyksen.","Vastauksissa on bin, ei haben.","Kirjoitin siebzehn ja zwanzig oikein.","Muistin Jahre alt."],example:"Mia: Wie alt bist du?\nMax: Ich bin siebzehn Jahre alt.\n\nLena: Wie alt bist du?\nJonas: Ich bin zwanzig Jahre alt."},
  "07":{title:"Tavaa kahdeksan nimeä ja täytä harjoituslomake",prompt:"Tavaa ääneen kahdeksan kuvitteellista etunimeä: Mia, Lena, Uwe, Leo, Anna, Emil, Greta ja Jonas. Kirjoita jokaisen alle sen kirjaimet väliviivoin ja yritä ensin ilman mallia. Laadi lisäksi harjoituslomake, jossa on kuvitteellinen nimi ja neljä erillistä NUMEROJONOA (esim. 1–0–2–3, 4–0–6–7, 8–1–5–9 ja 2–7–0–4). Ne eivät ole oikeita puhelinnumeroita. Ääntä ja puhettasi ei tarkisteta automaattisesti; sano nimet ja numerot itse ääneen.",checklist:["Kirjoitin kahdeksan nimen kirjaimet oikeassa järjestyksessä.","Tavasin nimet ääneen yksittäisten kirjainten saksankielisiä nimiä käyttäen vain sen verran kuin osaan.","Kirjoitin neljä erillistä kuvitteellista numerojonoa ilman oikeita yhteystietoja.","Harjoittelin kysymystä Wie schreibt man das? ja pyyntöä Bitte buchstabieren Sie.","Huomasin, että kirjoitusasu ja kirjaimen saksankielinen nimi eivät ole sama asia."],example:"Mia: M – I – A\nLena: L – E – N – A\nUwe: U – W – E\nLeo: L – E – O\nAnna: A – N – N – A\nEmil: E – M – I – L\nGreta: G – R – E – T – A\nJonas: J – O – N – A – S\n\nKuvitteellinen harjoituslomake:\nName: Lena\nZahlenfolgen: 1–0–2–3 / 4–0–6–7 / 8–1–5–9 / 2–7–0–4\n\nWie schreibt man das?\nBitte buchstabieren Sie."},
  "08":{title:"Selviä kolmesta oppimistilanteesta",prompt:"Laadi kolme lyhyttä itse kirjoitettua luokkahuonedialogia. (A) Et ymmärrä opettajan ohjetta, joten sanot sen. (B) Et kuule lausetta ja pyydät toistamaan. (C) Et tunne yhden sanan merkitystä ja pyydät selitystä. Käytä kokonaisia opittuja fraaseja. Harjoittele myös neljä reaktiota ääneen: Ich verstehe nicht, Noch einmal, bitte, Bitte langsamer ja Was bedeutet das? Fraasien sisäistä modaaliverbioppia ei tarvitse osata.",checklist:["Tein kolme erilaista tilannetta, en saman lauseen toistoa.","Osasin pyytää toistamaan kokonaisella fraasilla.","Kysyin tuntemattoman sanan merkityksen saksaksi.","Kokeilin neljä reaktiota ääneen ilman mallia.","En väitä puheeni ääntämistä automaattisesti hyväksytyksi."],example:"A: Ich verstehe nicht.\nB: Können Sie das bitte wiederholen?\nC: Was bedeutet das?\n\nNoch einmal, bitte.\nBitte langsamer.\nWie sagt man das auf Deutsch?"},
  "09":{title:"Täytä kuvitteellinen viikkokalenteri",prompt:"Kirjoita maanantaista sunnuntaihin seitsemän kuvitteellista kalenterimerkintää. Käytä kussakin päivän saksankielistä nimeä ja tasatuntia. Tee sen jälkeen kolmen repliikin tapaamisen sopiminen kahden opiskelijan välille. Kaikkia mahdollisia kellonajan ilmaisuja ei tarvitse osata; am + viikonpäivä ja um + tasatunti riittävät.",checklist:["Kalenterissani on Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag ja Sonntag.","Viikonpäivät alkavat isolla kirjaimella.","Kellonajan edellä on um ja viikonpäivän edellä am.","Tapaamiskeskustelussa on kolme vuorosanaa.","Käytin vain harjoiteltuja tasatunteja; Viertel vor/nach eivät ole itsenäisen tuotoksen vaatimus."],example:"Montag – um drei Uhr\nDienstag – um vier Uhr\nMittwoch – um fünf Uhr\nDonnerstag – um zwei Uhr\nFreitag – um sechs Uhr\nSamstag – um zehn Uhr\nSonntag – um elf Uhr\n\nMia: Wann?\nMax: Am Montag um drei Uhr.\nMia: Gut, bis Montag!"},
  "10":{title:"Kaksi kohtaamista ja kolmannen henkilön esittely",prompt:"Kirjoita kaksi ERILLISTÄ 6–8 repliikin kohtaamista. (A) Kaksi samanikäistä nuorta tapaa ensimmäistä kertaa, kysyy nimet, alkuperän ja kuulumiset sekä hyvästelee. (B) Opiskelija tapaa saksankielisen opettajan, käyttää kohteliasta Sie-muotoa ja pyytää tarvittaessa hidastamaan. Kirjoita lopuksi erillinen neljän helpon virkkeen esittely kuvitteellisesta kolmannesta henkilöstä. Harjoittele molemmat keskustelut ääneen, mutta puhetta ei automaattisesti pisteytetä.",checklist:["Kohtaamisessa A on 6–8 repliikkiä sekä du-puhuttelu.","Kohtaamisessa B on 6–8 repliikkiä sekä Sie-puhuttelu.","Molemmissa on tervehdys, perustietoja ja hyvästely.","Esittelin erikseen kolmannen henkilön neljällä yksinkertaisella virkkeellä.","Tarkistin ich, du, er/sie sekä heißen, sein ja kommen -muodot.","Arvioin itse ääneen esittämisen, en pelkän mallin lukemista."],example:"A · Kaksi nuorta\nMia: Hallo! Ich heiße Mia. Wie heißt du?\nLeo: Hallo! Ich heiße Leo.\nMia: Woher kommst du?\nLeo: Ich komme aus Deutschland. Und du?\nMia: Ich komme aus Finnland. Wie geht's?\nLeo: Gut, danke!\nMia: Schön, dich kennenzulernen!\nLeo: Bis morgen!\n\nB · Opiskelija ja opettaja\nMia: Guten Tag!\nLehrer: Guten Tag!\nMia: Ich heiße Mia. Wie heißen Sie?\nLehrer: Ich heiße Herr Schmidt.\nMia: Woher kommen Sie?\nLehrer: Ich komme aus Deutschland.\nMia: Bitte langsamer.\nLehrer: Auf Wiedersehen!\n\nKolmas henkilö (neljä virkettä):\nDas ist Leo.\nEr heißt Leo.\nEr kommt aus Deutschland.\nEr ist siebzehn Jahre alt."},
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
    <p className="los-save-state" role="status">{saved?"Vastaus tallennettu tähän selaimeen. Pilveen siirto on erillinen vapaaehtoinen toiminto.":"Tallennus epäonnistui. Kopioi vastauksesi talteen."}</p>
    <h3>Itsearvioinnin tarkistuslista</h3>
    <ul className="los-application-checks">{item.checklist.map(point=><li key={point}>{point}</li>)}</ul>
    {(chapter.id==="07"||chapter.id==="08"||chapter.id==="10")&&<LosVoicePractice key={chapter.id} chapterId={chapter.id}/>}
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
    </>:chapter.id==="07"?<>
      <h2>Kirjain, kirjainmerkki ja tavaaminen</h2>
      <p>Saksankielisessä puhelussa tai lomakkeen täyttämisessä nimeä voi joutua tavaamaan kirjain kirjaimelta. Kirjaimen <b>nimi</b> ei ole aina sama kuin sen tavallinen äänne sanassa. Tämän vuoksi kirjoitettu kirjainsarja ei yksin korvaa ihmisen lausumaa tavaamisharjoitusta.</p>
      <div className="los-culture-term"><strong lang="de">ä · ö · ü · ß</strong><p>Nämä merkit ovat osa saksan oikeinkirjoitusta. Aina niitä ei voi kirjoittaa kaikilla näppäimistöillä, jolloin teknisessä yhteydessä saatetaan käyttää muotoja ae, oe, ue ja ss. Ne eivät kuitenkaan ole kaikissa sanoissa tai arviointitilanteissa merkitykseltään tai kirjoitusasultaan samanarvoisia.</p></div>
      <p>Opettele ensin erottamaan, mitä näet kirjoitettuna. Tavaamisen ääntämistä harjoitellaan oikean ihmisen puheäänitteellä sen jälkeen, kun C07:n äänilähde on hyväksytty ja lisätty oppikirjaan.</p>
    </>:chapter.id==="08"?<>
      <h2>Kun et ymmärrä vieraskielisessä tilanteessa</h2>
      <p>Kieltä opiskellessa ei tarvitse ymmärtää jokaista lausetta ensimmäisellä kuulemalla. Voit käyttää selkeitä fraaseja: <span lang="de">Ich verstehe nicht.</span>, <span lang="de">Noch einmal, bitte.</span> ja <span lang="de">Bitte langsamer.</span>.</p>
      <div className="los-culture-term"><strong lang="de">Können Sie das bitte wiederholen?</strong><p>Opettele tämä pitkä kohtelias ilmaus yhtenä kokonaisuutena. Se ei tarkoita, että tässä kappaleessa pitäisi vielä osata kaikki können-verbin muodot tai saksan pyyntöjen kielioppi.</p></div>
      <p>Oppilaitosten käytännöt vaihtelevat. Oppikirja opettaa tässä kielellisiä selviytymiskeinoja, ei yhtä kaikissa saksankielisissä kouluissa noudatettavaa toimintatapaa.</p>
    </>:chapter.id==="09"?<>
      <h2>Viikonpäivät ja kalenterin lukeminen</h2>
      <p>Saksankieliset viikonpäivät <span lang="de">Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag</span> ja <span lang="de">Sonntag</span> kirjoitetaan isolla alkukirjaimella. Saksassa ja Suomessa viikkokalenteri esitetään yleisesti maanantaista alkavana.</p>
      <div className="los-culture-term"><strong lang="de">am Montag · um drei Uhr</strong><p>Ensimmäinen ilmaus kertoo päivän ja toinen kellonajan. Oppikirjan harjoituksissa riittävät tasatunnit. Lähdetekstissä mahdollisesti esiintyvät <span lang="de">halb</span> ja <span lang="de">Viertel vor/nach</span> selitetään myöhemmin lukemisen tueksi.</p></div>
      <p>Kalenteriharjoituksissa käytetään kuvitteellisia tapaamisia. Oikeaa henkilökohtaista kalenteriasi ei tarvitse siirtää oppikirjaan.</p>
    </>:chapter.id==="10"?<>
      <h2>Kohtaaminen alusta loppuun</h2>
      <p>Saksankielisessä kohtaamisessa tervehdyksen ja puhuttelun sopivuus riippuu tilanteesta. Tuttava voi kysyä <span lang="de">Wie heißt du?</span>, kun taas virallisessa kohtaamisessa <span lang="de">Wie heißen Sie?</span> voi olla luontevampi.</p>
      <div className="los-culture-term"><strong lang="de">Das ist Leo. Er kommt aus Deutschland.</strong><p>Kolmannen henkilön esitteleminen laajentaa jo opittuja minä- ja sinä-muotoja. Tämä on kertaus, ei lupa alkaa harjoitella koko saksan pronominijärjestelmää.</p></div>
      <p>Kokeile kirjoittaa ja esittää kaksi toisistaan eroavaa tilannetta. Kappaletesti tarkistaa vain rajattuja muotoja; ääneen tapahtuva keskustelu arvioidaan omalla tarkistuslistalla.</p>
    </>:<div className="los-editorial-note"><h2>Kulttuurisivu tarkistetaan</h2><p>Tämän kappaleen erillinen kulttuuriteksti, lähdeviitteet ja oikeuksiltaan hyväksytty kuvitus on vielä toimitettava. Oppikirjaa ei merkitä valmiiksi puuttuvan aineiston perusteella.</p></div>}
    <div className="los-culture-source"><strong>Kuvat ja lähteet</strong><p>Tämän sivun kuvallinen oppimateriaali ja lähdekohtaisten kulttuuriväitteiden toimitukselliset merkinnät ovat vielä valmistelussa. Valmiin kulttuuriosion hyväksyntä edellyttää niitä.</p></div>
  </section>;
}
