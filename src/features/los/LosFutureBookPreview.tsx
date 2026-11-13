import { useState } from "react";
import type { LosBookDefinition, LosChapter } from "./catalog";
import type { LosDestination } from "./LosReferenceTools";
import { LOS_FUTURE_MANUSCRIPTS } from "./content/losFutureManuscripts.ts";
import { LosFutureExercises } from "./LosFutureExercises";

/**
 * Sisältöluonnosten lukija. Näyttää jokaisen luvun kokonaisen käsikirjoituksen
 * LOS!:n sisällä, ilman ulkoisen linkin takana olevaa pakollista tekstiä.
 *
 * Käsikirjoitusten status on PENDING EDITORIAL REVIEW. Ääni, itsenäinen
 * tarkistettu koe, hyväksytyt vastausavaimet ja oppituntisuoritukset EIVÄT
 * kuulu tähän esikatseluun. Ei LOS! 1:n chapter-keyed answer storea.
 */
export function LosFutureBookPreview({book,chapter,section}:{
  book:LosBookDefinition;
  chapter:LosChapter;
  section:LosDestination;
}) {
  const manuscript=LOS_FUTURE_MANUSCRIPTS[book.id]?.[chapter.id];
  const [query,setQuery]=useState("");
  const [showTranslations,setShowTranslations]=useState(true);
  const [activeWord,setActiveWord]=useState(0);
  const [revealCard,setRevealCard]=useState(false);
  const labels:Partial<Record<LosDestination,string>>={
    chapter:"Aloita",text:"Text A",understand:"Ymmärrä",vocabulary:"Sanasto",
    grammar:"Kielioppi","text-b":"Text B",practice:"Harjoittele",
    apply:"Käytä saksaa",culture:"Kulttuuri",test:"Kappaletesti",cards:"Kertauskortit",
  };
  const title=labels[section]??chapter.title;
  const words=manuscript?.vocabulary.filter(word=>`${word.de} ${word.fi}`.toLocaleLowerCase("fi").includes(query.toLocaleLowerCase("fi")))??[];
  const card=manuscript?.vocabulary[activeWord];
  const notice=<div className="los-editorial-note" role="status">
    <h2>Sisältöesikatselu, ei valmis oppikirja</h2>
    <p>Nämä ovat LOS!:n omia 12.11.2026 käsikirjoitusluonnoksia. Niitä ei ole
      vielä riippumattomasti kielentarkistettu, eikä niitä saa kutsua autenttisiksi
      saksankielisten kirjoittajien alkuperäisteksteiksi. Ihmisen äänitteet,
      IPA, tehtävien hyväksytty arviointi, taitotestit sekä synkronoitu opiskelunäyttö
      vaativat erillisen hyväksynnän.</p>
  </div>;
  if(!manuscript) return <section className="los-inner-page">
    <h1>{title}</h1>
    <div className="los-editorial-note"><h2>Käsikirjoitusaineisto puuttuu</h2><p>Kirjan sisältöä ei voida avata. Tietoa ei korvata LOS! 1:n materiaalilla.</p></div>
  </section>;

  return <section className="los-inner-page los-reading-page">
    <p className="los-eyebrow">LOS! {book.id} · {book.code} · KAPITEL {chapter.id} / {title}</p>
    <h1>{section==="chapter" ? manuscript.title : title}</h1>
    <p className="los-page-intro">{manuscript.objective}</p>
    {notice}

    {section==="chapter" && <>
      <h2>Tässä kappaleessa</h2>
      {manuscript.intro.split(/\n\s*\n/).map((para,i)=><p key={i} style={{lineHeight:1.75}}>{para}</p>)}
      <h2>Kieliopin tavoite</h2>
      <p>{manuscript.grammarTopic}</p>
      <p>Text A -osiossa on kokonainen lukuteksti, Text B -osiossa toinen tekstilaji ja tukidialogi.
        Sanasto- ja kielioppisivut on tuotu käsikirjoituksesta.</p>
    </>}

    {section==="text"&&<>
      <h2 lang="de">{manuscript.title}</h2>
      <div lang="de" style={{fontSize:"1.08rem",lineHeight:1.85,maxWidth:"68ch"}}>
        {manuscript.textA.split(/\n\s*\n/).map((para,i)=><p key={i}>{para}</p>)}
      </div>
      <p className="los-page-intro">Lue ensin pääajatus. Etsi sitten tekstin henkilöt, paikka ja tärkeät tapahtumat.
        Tekstiluonnos on kokonaisena LOS!:n sisällä. Äänitettä ei ole hyväksytty.</p>
    </>}

    {section==="text-b"&&<>
      <h2>Toinen tekstilaji</h2>
      <p lang="de" style={{fontSize:"1.06rem",lineHeight:1.8,whiteSpace:"pre-wrap"}}>{manuscript.textB}</p>
      <h2>Tukidialogi</h2>
      <div lang="de" style={{fontSize:"1.03rem",lineHeight:1.75}}>
        {manuscript.dialogue.map((line,i)=><p key={i}>{line}</p>)}
      </div>
      <p>Vertaa Text B:tä pidempään Text A:han. Mitä tietoja tässä tekstilajissa
        ilmaistaan lyhyemmin? Tukidialogin ääntäminen arvioidaan myöhemmin.</p>
    </>}

    {section==="grammar"&&<>
      <h2>{manuscript.grammarTopic}</h2>
      {manuscript.grammarExplanation.split(/\n\s*\n/).filter(Boolean).map((para,i)=>
        /^(Laajennettu opetus kirjassa:|Mallilause:|Suomennos:|Opettajan virheen korjaus:|Oma minikoe:)/.test(para)
          ? <p key={i} style={{lineHeight:1.75}}><strong>{para.split(":")[0]}:</strong>{para.slice(para.indexOf(":")+1)}</p>
          : <p key={i} style={{lineHeight:1.75}}>{para}</p>
      )}
      <p className="los-page-intro">Selitykset on tuotu alkuperäisestä toimituskäsikirjoituksesta.
        Ne eivät vielä ole riippumattoman saksanopettajan hyväksymiä.</p>
    </>}

    {section==="vocabulary"&&<>
      <p>{manuscript.vocabulary.length} kappalekohtaista sanastoehdokasta. Artikkelit on säilytetty
        lähteestä. Sanakirjan täysi morfologia, IPA ja kuunneltava ääntäminen tarkistetaan myöhemmin.</p>
      <div className="los-vocabulary-tools">
        <label><span className="sr-only">Etsi sanastosta</span>
          <input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Etsi sanaa…" />
        </label>
        <button type="button" aria-pressed={!showTranslations}
          onClick={()=>setShowTranslations(v=>!v)}>{showTranslations?"Piilota suomennokset":"Näytä suomennokset"}</button>
      </div>
      <table className="los-word-table">
        <thead><tr><th>Deutsch</th><th>Suomi</th></tr></thead>
        <tbody>{words.map((word,i)=><tr key={word.de+"-"+i}>
          <td lang="de">{word.de}</td>
          <td>{showTranslations?word.fi:"Piilotettu"}</td>
        </tr>)}</tbody>
      </table>
      {!words.length&&<p>Hakusanalle ei löytynyt osumia.</p>}
    </>}

    {(section==="understand"||section==="practice"||section==="apply")&&
      <LosFutureExercises bookId={book.id} chapterId={chapter.id} mode={section} />}

    {section==="culture"&&<>
      <h2>Kulttuurin näkökulma</h2>
      <p>Pohdi, millainen arjen, kielen tai yhteiskunnan tilanne tekstissä näkyy.
        Erota tekstin yksittäinen esimerkki yleisestä väitteestä
        saksankielisestä maailmasta.</p>
      <p>Autenttiset haastattelut ja lähdekuvat julkaistaan vasta niiden
        yksilöllisen lisenssin ja soveltuvuuden tarkistuksen jälkeen.</p>
    </>}

    {section==="cards"&&<>
      <h2>Kokeile sanaston palauttamista</h2>
      <p>Kertauskortit ovat esikatselussa. Näillä ei vielä tallenneta osaamis- tai
        muistamismerkintöjä.</p>
      {card&&<div className="los-editorial-note">
        <p>{activeWord+1} / {manuscript.vocabulary.length}</p>
        <h2 lang="de">{card.de}</h2>
        <button type="button" className="los-outline-button" onClick={()=>setRevealCard(v=>!v)}>
          {revealCard?"Piilota suomennos":"Näytä suomennos"}
        </button>
        {revealCard&&<p>{card.fi}</p>}
        <div style={{display:"flex",gap:12,marginTop:16}}>
          <button type="button" disabled={activeWord===0} onClick={()=>{setActiveWord(v=>Math.max(0,v-1));setRevealCard(false);}}>Edellinen</button>
          <button type="button" disabled={activeWord>=manuscript.vocabulary.length-1}
            onClick={()=>{setActiveWord(v=>Math.min(manuscript.vocabulary.length-1,v+1));setRevealCard(false);}}>Seuraava</button>
        </div>
      </div>}
    </>}

    {section==="test"&&<div className="los-editorial-note">
      <h2>Ei vielä arvioitavissa</h2>
      <p>Kappaletesti valmistellaan alkuperäisen kirjakohtaisen tehtäväpankin,
        vastausavainten ja kielellisen tarkistuksen perusteella. Keskeneräistä
        testikantaa ei käytetä todistamaan kielitaitoa.</p>
    </div>}
  </section>;
}
