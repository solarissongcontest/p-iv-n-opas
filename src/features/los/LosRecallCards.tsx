import { useMemo, useState } from "react";
import { ArrowLeftRight, BookOpenCheck, RotateCcw } from "lucide-react";
import type { LosChapter } from "./catalog";
import { useLosChapterDraft } from "./studyState";
import {
  losRecallFromVocabulary,losRecallIsDue,losRecallReview,
  type LosRecallDirection,type LosRecallRating,
} from "./recallEngine";
import {losFutureRecallCardsFor} from "./losFutureRecallCards.ts";
import "./los-recall.css";

const REVIEW_LIMIT=10;

/** Chapter-local vocabulary review, no automatic mastery/CEFR or speech score. */
export function LosRecallCards({chapter,onBack,bookId=1}:{
  chapter:LosChapter;onBack?:()=>void;bookId?:number;
}){
  const {draft,update,saved}=useLosChapterDraft(bookId,chapter.id);
  const [direction,setDirection]=useState<LosRecallDirection>("de-fi");
  const [scope,setScope]=useState<"due"|"all">("due");
  const [revealed,setRevealed]=useState(false);
  const [sessionReviewed,setSessionReviewed]=useState<string[]>([]);
  const [date,setDate]=useState(()=>new Date().toISOString());
  const allCards=useMemo(()=>
    bookId===1?losRecallFromVocabulary(chapter.id,chapter.vocabulary):
      losFutureRecallCardsFor(bookId,chapter.id),
    [bookId,chapter.id,chapter.vocabulary]);
  const cards=allCards.filter(card=>card.direction===direction);
  const progress=draft.recallCards??{};
  const due=cards.filter(card=>losRecallIsDue(progress[card.id],date));
  const candidates=scope==="due"?due:cards;
  const available=candidates.filter(card=>!sessionReviewed.includes(card.id));
  const sessionDone=sessionReviewed.length>=REVIEW_LIMIT || available.length===0;
  const card=!sessionDone?available[0]:undefined;
  const remembered=cards.filter(item=>{
    const state=progress[item.id];
    return state?.level!==undefined && state.level>=2 && state.lastRating==="remembered";
  }).length;
  const rate=(rating:LosRecallRating)=>{
    if(!card||!revealed||sessionReviewed.length>=REVIEW_LIMIT)return;
    const now=new Date().toISOString();
    update(current=>{
      const existing=current.recallCards?.[card.id];
      const updated=losRecallReview(existing,rating,now);
      return {...current,recallCards:{...current.recallCards,[card.id]:updated}};
    });
    setSessionReviewed(old=>[...old,card.id]);
    setRevealed(false);
    setDate(now);
  };
  const changeDirection=(value:LosRecallDirection)=>{
    setDirection(value);setSessionReviewed([]);setRevealed(false);setDate(new Date().toISOString());
  };
  const changeScope=(value:"due"|"all")=>{
    setScope(value);setSessionReviewed([]);setRevealed(false);setDate(new Date().toISOString());
  };
  return <section className={bookId===1?"los-inner-page los-recall":"los-recall"}
    aria-label={"Kappaleen "+Number(chapter.id)+" sanaston kertauskortit"}>
    {onBack&&<button type="button" className="los-recall-back" onClick={onBack}>Takaisin kappaleen sanastoon</button>}
    <p className="los-eyebrow">WIEDERHOLEN / KAPITEL {Number(chapter.id)} / SANASTO</p>
    <h1>Sanaston kertauskortit</h1>
    <p className="los-page-intro">Palauta saksan sanoja muistista. Käännä kortti vasta oman yrityksen jälkeen ja arvioi itse, muistitko vastauksen. Korttien väli pitenee alustavasti yhden, kolmen, seitsemän, neljäntoista ja kolmenkymmenen päivän jaksoissa. Tämä ei mittaa ääntämistä eikä automaattisesti vahvista osaamistasoa.</p>
    <div className="los-recall-stats" aria-label="Kertauksen tilanne">
      <div><strong>{cards.length}</strong><span>Korttia tähän suuntaan</span></div>
      <div><strong>{due.length}</strong><span>Kerrattavissa nyt</span></div>
      <div><strong>{remembered}</strong><span>Useamman kerran muistetuiksi arvioitu</span></div>
    </div>
    <div className="los-recall-controls">
      <fieldset><legend>Kertauksen suunta</legend>
        <button type="button" className={direction==="de-fi"?"is-active":""} aria-pressed={direction==="de-fi"} onClick={()=>changeDirection("de-fi")}>Saksa → suomi</button>
        <button type="button" className={direction==="fi-de"?"is-active":""} aria-pressed={direction==="fi-de"} onClick={()=>changeDirection("fi-de")}>Suomi → saksa</button>
      </fieldset>
      <fieldset><legend>Valitse kortit</legend>
        <button type="button" className={scope==="due"?"is-active":""} aria-pressed={scope==="due"} onClick={()=>changeScope("due")}>Kerrattavat nyt</button>
        <button type="button" className={scope==="all"?"is-active":""} aria-pressed={scope==="all"} onClick={()=>changeScope("all")}>Kaikki sanat</button>
      </fieldset>
    </div>
    <p className="los-recall-save" role="status">{saved?
      bookId===1?
      "Kertausajat tallentuvat kappaleen opiskelutietoihin, JSON-varmuuskopioon ja valinnaiseen manuaaliseen pilvisynkronointiin.":
      "Kertausajat tallentuvat tähän selaimeen ja siirtyvät kirjan omassa JSON-varmuuskopiossa. Automaattista laitteiden välistä synkronointia ei ole.":
      "Tallennus epäonnistui. Kertausmerkintää ei ole varmistettu."}</p>
    {!cards.length?<div className="los-recall-empty">
      <BookOpenCheck size={23}/><h2>Sanastokortteja valmistellaan</h2>
      <p>Tässä kappaleessa ei ole vielä tarkistettua sanastoluetteloa. Kortteja ei luoda keksityistä sanoista.</p>
    </div>:sessionDone?<div className="los-recall-empty" role="status">
      <BookOpenCheck size={25}/>
      <h2>{sessionReviewed.length>=REVIEW_LIMIT?"Kymmenen kortin kertaus tehty":"Ei lisää kortteja tällä valinnalla"}</h2>
      <p>{sessionReviewed.length} korttia käsitelty tässä kertausjaksossa. Kertauksen voi lopettaa tähän ilman sarjoja, rangaistuksia tai velkakertymää.</p>
      <button type="button" onClick={()=>{setSessionReviewed([]);setRevealed(false);setDate(new Date().toISOString());}}>
        <RotateCcw size={16}/> Aloita seuraava kertausjakso
      </button>
    </div>:<div className="los-recall-stage" aria-live="polite">
      <p className="los-recall-number">Kortti {sessionReviewed.length+1}/{Math.min(REVIEW_LIMIT,sessionReviewed.length+available.length)} · {direction==="de-fi"?"Saksasta suomeksi":"Suomesta saksaksi"}</p>
      <div className="los-recall-card">
        <span className="los-overline">{revealed?"VASTAUS AVATTU":"MUISTA ILMAN VIHJETTÄ"}</span>
        <p className="los-recall-prompt" lang={direction==="de-fi"?"de":"fi"}>{direction==="de-fi"?card?.german:card?.finnish}</p>
        {!revealed?<button type="button" className="los-primary" onClick={()=>setRevealed(true)}><ArrowLeftRight size={18}/> Näytä vastaus</button>:<>
          <div className="los-recall-answer" role="status"><span>Oikea vastine</span>
            <strong lang={direction==="de-fi"?"fi":"de"}>{direction==="de-fi"?card?.finnish:card?.german}</strong>
          </div>
          {progress[card!.id]&&<p className="los-recall-last">Edellinen itsearvio: {new Date(progress[card!.id]!.lastReviewedAt).toLocaleDateString("fi-FI")} · Seuraava kertaus nykyisen aikataulun mukaan {new Date(progress[card!.id]!.nextDueAt).toLocaleDateString("fi-FI")}</p>}
          <p>Muistitko vastauksen oikein ilman mallia?</p>
          <div className="los-recall-ratings" role="group" aria-label="Oma muistamisen arvio">
            <button type="button" disabled={!saved} onClick={()=>rate("again")}>En muistanut</button>
            <button type="button" disabled={!saved} onClick={()=>rate("uncertain")}>Muistin epäröiden</button>
            <button type="button" disabled={!saved} onClick={()=>rate("remembered")}>Muistin oikein</button>
          </div>
        </>}
      </div>
    </div>}
    {bookId>=2&&<p className="los-recall-footnote">LOS! {bookId}: sanasto on käsikirjoituksen toimituksellinen luonnos.
      Suomenkieliset merkitykset ja saksan oikeinkirjoitus on vielä tarkistettava.
      Kertauksen itsearvio ei osoita hyväksyttyä kielitaitotasoa.</p>}
    <p className="los-recall-footnote">Sanat tulevat vain LOS!:n omasta kappalesanastosta. Samaan sanapariin liittyvät tunnistus- ja tuottamismuisti tallennetaan erikseen. Kortin itsearvio ei korvaa kappaletestiä, alkuperäistekstin ymmärtämistä tai oikeaa puheen arviointia.</p>
  </section>;
}
