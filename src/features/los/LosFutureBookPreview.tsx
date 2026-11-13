import { useState } from "react";
import type { LosBookDefinition, LosChapter } from "./catalog";
import type { LosDestination } from "./LosReferenceTools";
import { LOS_FUTURE_FIRST_CHAPTERS } from "./content/losFutureC01Drafts";

/**
 * Editorial preview only. Never routes into LOS! 1's exercise bank, source
 * registry, chapter answers, teacher state or chapter-keyed notebook storage.
 */
export function LosFutureBookPreview({book, chapter, section}:{
  book: LosBookDefinition;
  chapter: LosChapter;
  section: LosDestination;
}) {
  const [showAnswer, setShowAnswer] = useState(false);
  const draft = chapter.id === "01" ? LOS_FUTURE_FIRST_CHAPTERS[book.id] : undefined;
  const labels: Partial<Record<LosDestination,string>> = {
    text:"Text A",understand:"Ymmärrä",vocabulary:"Sanasto",
    grammar:"Kielioppi","text-b":"Text B",practice:"Harjoittele",
    apply:"Käytä saksaa",culture:"Kulttuuri",test:"Kappaletesti",cards:"Kertauskortit",
  };
  return <section className="los-inner-page los-reading-page">
    <p className="los-eyebrow">LOS! {book.id} · {book.code} · KAPITEL {chapter.id}</p>
    <h1>{labels[section] ?? chapter.title}</h1>
    <p className="los-page-intro"><span lang="de">{chapter.title}</span> · {chapter.subtitle}</p>
    <div className="los-editorial-note" role="status">
      <h2>Toimituksellinen käsikirjoitusluonnos</h2>
      <p>LOS! 2–8:n tekstejä ja tehtäviä tuodaan oppikirjaan vaiheittain.
      Tämä osio ei ole vielä julkaisuvalmista saksanopetusta.
      Tekstiluonnokset ovat LOS!:n omia harjoitustekstejä, eivät autenttisia ulkopuolisen
      kirjoittamia saksankielisiä lähdetekstejä. Äänen, tehtävien ja kieliasun tarkistus on kesken.</p>
    </div>
    {!draft ? <div className="los-editorial-note">
      <h2>Käsikirjoituksen tuonti kesken</h2>
      <p>Tämän kappaleen nimi, tavoite ja kielioppiaihe on tuotu hyväksytystä
      kirjakohtaisesta sisältörungosta. Kokonainen lukuteksti, tehtävät ja oppitunnit
      siirretään seuraavassa sisältöversiossa. LOS! 1:n tekstejä tai vastauksia
      ei käytetä tässä paikalla.</p>
      <p><strong>Kappaleen tavoite:</strong> {chapter.objectives.join(" ")}</p>
      <p><strong>Kieliopin aihe:</strong> {chapter.grammar}</p>
    </div> : section==="text" ? <>
      <h2 lang="de">{chapter.title}</h2>
      <p lang="de" className="los-book-paragraph" style={{fontSize:"1.1rem",lineHeight:1.8,whiteSpace:"pre-wrap"}}>{draft.textA}</p>
      <p>Luonnos: lähde LOS! {book.id}:n oma kirjakohtainen käsikirjoitus, C01 Text A. Ei ihmisen äänitettä eikä ulkoisen autenttisen tekstin statusta.</p>
    </> : section==="text-b" ? <>
      <h2>Lyhyt teksti B</h2>
      <p lang="de" style={{fontSize:"1.1rem",lineHeight:1.8}}>{draft.textB}</p>
      <h2>Tukidialogi</h2>
      <div lang="de">{draft.dialogue.map((line,i)=><p key={i} style={{lineHeight:1.7}}>{line}</p>)}</div>
      <p>Text B ja dialogi ovat eri luonnostekstejä. Äänitteitä ei ole hyväksytty.</p>
    </> : section==="vocabulary" ? <>
      <p>Tämän ensimmäisen kappaleen kuusi käsikirjoituksesta poimittua sanastoehdokasta. Monikkojen, IPA:n ja ääntämisen julkaisuhyväksyntä puuttuu.</p>
      <table className="los-word-table"><thead><tr><th>Saksa</th><th>Suomi</th></tr></thead><tbody>
        {draft.vocabulary.map(([de,fi])=><tr key={de}><td lang="de">{de}</td><td>{fi}</td></tr>)}
      </tbody></table>
    </> : section==="understand" ? <>
      <h2>Ensimmäinen ymmärtämistehtävä</h2>
      <p>Lue Text A ja tukidialogi Text B -sivulta. Vastaa suomeksi ennen mallivastauksen katsomista.</p>
      <p><strong>{draft.question}</strong></p>
      <button type="button" className="los-outline-button" aria-expanded={showAnswer}
        onClick={()=>setShowAnswer(v=>!v)}>{showAnswer ? "Piilota mallivastaus" : "Näytä mallivastaus"}</button>
      {showAnswer&&<p role="status"><strong>Mallivastaus:</strong> {draft.answer} Tätä tehtävää ei vielä pisteytetä eikä merkitä suoritetuksi.</p>}
    </> : section==="grammar" ? <>
      <h2>{chapter.grammar}</h2>
      <p>Kieliopin täydellinen, malliesimerkeillä ja korjaavalla palautteella varustettu opetus on käsikirjoituksessa. Sen interaktiivinen käyttöönotto ja kielellinen tarkistus ovat vielä kesken.</p>
    </> : <>
      <h2>Tätä osiota ei ole vielä avattu opiskeluun</h2>
      <p>Tehtävämoottorin vastauksia, pisteitä, oppituntisuorituksia tai kokeita ei näytetä valmiina ennen kuin ne on tuotu ja tarkistettu juuri tälle kirjalle.</p>
    </>}
  </section>;
}
