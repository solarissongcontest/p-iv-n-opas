import { ArrowRight, BookOpen, CheckCircle2, Clock3, ClipboardCheck, RotateCcw } from "lucide-react";
import type { LosBookDefinition } from "./catalog";
import type { LosNavigate } from "./LosReferenceTools";
import type { LosChapterDraft } from "./studyState";
import { useLosChapterDraft } from "./studyState";






import { getLosStudyProgressSnapshot } from "./progressSnapshot";
import "./los-progress.css";

export function LosStudyProgress({book,move}:{book:LosBookDefinition;move:LosNavigate}) {
  // Hook order never depends on active chapter or loading status.
  const d01=useLosChapterDraft(1,"01"),d02=useLosChapterDraft(1,"02"),
    d03=useLosChapterDraft(1,"03"),d04=useLosChapterDraft(1,"04"),
    d05=useLosChapterDraft(1,"05"),d06=useLosChapterDraft(1,"06"),
    d07=useLosChapterDraft(1,"07"),d08=useLosChapterDraft(1,"08"),
    d09=useLosChapterDraft(1,"09"),d10=useLosChapterDraft(1,"10"),
    d91=useLosChapterDraft(1,"91");
  const drafts:Record<string,LosChapterDraft>={
    "01":d01.draft,"02":d02.draft,"03":d03.draft,"04":d04.draft,"05":d05.draft,
    "06":d06.draft,"07":d07.draft,"08":d08.draft,"09":d09.draft,"10":d10.draft,
    "91":d91.draft,
  };
  const data=getLosStudyProgressSnapshot(book,drafts,new Date().toISOString());
  return <section className="los-inner-page los-study-progress" aria-label="LOS! 1:n opiskelun eteneminen">
    <p className="los-eyebrow">LOS! 1 / OMA OPISKELU</p>
    <h1>Osaaminen ja eteneminen</h1>
    <p className="los-page-intro">Oppituntien valmistuminen, kokeessa oikein vastatut tehtävät ja kertauskorttien oma muistamisen arvio ovat eri asioita. Näytän ne erillään. Tämä sivu ei laske näennäisen tarkkaa kielitasoa, anna lukion arvosanaa eikä väitä puhetta automaattisesti arvioiduksi.</p>
    <div className="los-progress-metrics">
      <div><CheckCircle2 size={20}/><strong>{data.completed}/{data.available}</strong><span>Toteutettua oppituntia suoritettu</span></div>
      <div><ClipboardCheck size={20}/><strong>{data.total?data.correct+"/"+data.total:"Ei tulosta"}</strong><span>Palautettujen kappaletestien objektiiviset pisteet ({data.scoredChapters}/10 kappaletta)</span></div>
      <div><RotateCcw size={20}/><strong>{data.delayedSelfRemembered}</strong><span>Sanakorttisuuntaa itse muistetuiksi arvioitu vähintään kahdesti</span></div>
    </div>
    <div className="los-progress-line" role="progressbar" aria-label="Toteutettujen oppituntien suoritus" aria-valuemin={0} aria-valuemax={data.available} aria-valuenow={data.completed}>
      <span style={{width:(data.available?100*data.completed/data.available:0)+"%"}}/>
    </div>
    <p className="los-progress-caption">{data.completed} tehtyä ohjattua oppituntia · {data.available} toteutettua · {data.planned} koko kirjan suunnitelmassa. Puuttuvia 60 tunnin sisältöjä ei lasketa valmiiksi.</p>
    <div className="los-progress-recall-note">
      <Clock3 size={20}/>
      <div><h2>Sanaston kertaus</h2><p>{data.pendingScheduled} jo harjoiteltua sanakorttisuuntaa on erääntynyt kerrattavaksi, ja {data.newCards} sanakorttisuuntaa on vielä aloittamatta. Päivän ehdotus on enintään kymmenen korttia, ei koko kertyneen määrän pakollinen suorittaminen.</p></div>
    </div>
    {data.midterm&&<div className="los-progress-midterm">
      <h2>Välikoe EX-MID</h2>
      <p>Automaattiset tehtävät: <strong>{data.midterm.correct}/{data.midterm.total}</strong> oikein. Itsearvioitu keskustelu ei sisälly tähän tulokseen.</p>
      <button type="button" className="los-outline-button" onClick={()=>move(null,"midterm")}>Avaa välikokeen palaute <ArrowRight size={16}/></button>
    </div>}
    <h2>Kappaleittain</h2>
    <div className="los-progress-chapters">
      {data.chapters.map(ch=><article key={ch.id} className="los-progress-chapter">
        <div className="los-progress-chapter-head"><span className="los-progress-num">{ch.id}</span><div><h3>{ch.title}</h3><p>{ch.completed}/{ch.available} toteutetusta oppitunnista suoritettu · Kappaletesti {ch.scored?ch.scored.correct+"/"+ch.scored.total:"ei palautettu"}</p></div></div>
        <p className="los-progress-source">{ch.sourceReady?"Päätekstin kaikki julkaisuportit täyttyvät.":"Päätekstin julkaisu- tai laadunvarmistusportteja on vielä kesken."}</p>
        <div className="los-progress-actions">
          <button type="button" onClick={()=>move(ch.id,"chapter")}><BookOpen size={15}/> Avaa kappale</button>
          <button type="button" onClick={()=>move(ch.id,"cards")}><RotateCcw size={15}/> Kertaa sanastoa</button>
        </div>
      </article>)}
    </div>
    <div className="los-progress-pending">
      <h2>Vielä toteuttamatta opetukseen</h2>
      <p>Seuraavat {data.unfinished.length} suunniteltua tuntia ovat vielä toimituksellisia sisältömerkintöjä. Niiden avaaminen ei merkitse niitä suoritetuiksi, ja C08:n ja C10:n julkaisemattomat alkuperäistekstit pysyvät avoimina lähdevaatimuksina.</p>
      <ul>{data.unfinished.map(item=><li key={item.id}><strong>{item.id}</strong> · {item.title}</li>)}</ul>
    </div>
    <p className="los-progress-foot">Tiedot perustuvat tämän laitteen LOS!-luonnoksiin ja mahdollisesti erikseen tuotuihin tai synkronoituihin kappaletietoihin. Jos et ole siirtänyt aiempia tietoja tähän selaimeen, se ei voi näyttää niitä automaattisesti.</p>
  </section>;
}
