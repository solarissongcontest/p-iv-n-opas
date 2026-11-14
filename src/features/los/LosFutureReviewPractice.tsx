import { ArrowLeft, ArrowRight, BookOpen, ClipboardCheck } from "lucide-react";
import { useLosChapterDraft } from "./studyState.ts";
import { LosFutureExercises } from "./LosFutureExercises.tsx";
import type { LosFutureLessonContent } from "./content/losFutureLessonTypes.ts";
import type { LosNavigate } from "./LosReferenceTools.tsx";
import { losFutureReviewPlan } from "./losFutureReviewPlan.ts";

const stages=["Muistista palautus","Opettajan kertaus","Ohjattu harjoittelu","Sovella ja arvioi itse"] as const;

export function LosFutureReviewPractice({bookId,script,move}:{
  bookId:number;script:LosFutureLessonContent;move:LosNavigate;
}){
  const plan=losFutureReviewPlan(bookId,script.number);
  if(!plan)return <p role="alert">Kertauksen kirjakohtaista sisältöä ei löydy.</p>;
  return <FormativeReview bookId={bookId} script={script} move={move} plan={plan}/>;
}

function FormativeReview({bookId,script,move,plan}:{
  bookId:number;script:LosFutureLessonContent;move:LosNavigate;
  plan:NonNullable<ReturnType<typeof losFutureReviewPlan>>;
}){
  const {draft,update,saved}=useLosChapterDraft(bookId,plan.chapterId);
  const raw=Number(draft.practiceAnswers[plan.keys.stage]??"0");
  const stageIndex=Number.isInteger(raw)&&raw>=0&&raw<stages.length?raw:0;
  const recall=draft.practiceAnswers[plan.keys.recall]??"";
  const transfer=draft.practiceAnswers[plan.keys.transfer]??"";
  const reflection=draft.practiceAnswers[plan.keys.reflection]??"";
  function save(key:string,value:string){
    update(current=>({...current,practiceAnswers:{
      ...current.practiceAnswers,[key]:value.slice(0,3000),
    }}));
  }
  function choose(index:number){save(plan.keys.stage,String(Math.max(0,Math.min(index,stages.length-1))));}
  const samples=plan.chapter.vocabulary.slice(0,4);
  return <div className="los-guided-review los-review-practice">
    <p className="los-guided-lesson-status">
      <BookOpen size={17} aria-hidden="true"/>
      <strong>Harjoituskertaus · LOS! {bookId}, kappale {Number(plan.chapterId)}</strong>
      <span role="status">{saved?"Omat tekstit tallennettu tähän selaimeen":"Tallennus epäonnistui"}</span>
    </p>
    <p className="los-guided-lesson-goal"><strong>Tavoite:</strong> {plan.objective}</p>
    <p>{script.reviewTiming}</p>
    <nav aria-label="Kertausoppitunnin vaiheet" className="los-guided-lesson-stage-nav">
      {stages.map((title,index)=><button key={title} type="button"
        className={stageIndex===index?"is-current":undefined}
        aria-current={stageIndex===index?"step":undefined}
        onClick={()=>choose(index)}><span aria-hidden="true">{index+1}</span>{title}</button>)}
    </nav>
    <section className="los-guided-lesson-stage" aria-labelledby="los-review-stage-heading">
      <p className="los-eyebrow">KERTAUS {stageIndex+1}/4 · EI PISTEYTETTÄVÄ KOE</p>
      <h3 id="los-review-stage-heading">{stages[stageIndex]}</h3>
      {stageIndex===0&&<>
        <p>{script.intro}</p>
        <p>{script.number===1
          ?"Tämä on alkukartoitus. Kirjoita, mitä osaat jo saksaksi, vaikka muistaisit vain yhden tervehdyksen. Jos aloitat täysin nollasta, kirjoita se. Sinun ei tarvitse osata ensimmäisen kappaleen sisältöä etukäteen."
          :`Palauta mieleen aiemmin opittua kappaleista ${Number(plan.compareId)}–${Number(plan.chapterId)}. Kirjoita vähintään kaksi sanaa tai rakennetta ja yksi asia, jota haluat vielä harjoitella. Tämä on muistista palauttamista, ei arvosana.`}</p>
        <label className="los-guided-reflection">
          <strong>Omat aikaisemmat tiedot ja kysymykset</strong>
          <textarea rows={5} maxLength={3000} value={recall}
            onChange={e=>save(plan.keys.recall,e.target.value)}
            placeholder="Muistan jo... Minulle on vielä epäselvää..." />
        </label>
      </>}
      {stageIndex===1&&<>
        <p>{script.reviewTeaching}</p>
        <p><strong>Kappaleen {Number(plan.chapterId)} kielioppiaihe:</strong> {plan.chapter.grammarTopic}</p>
        <p>{plan.chapter.grammarExplanation}</p>
        <div className="los-review-vocab-board" aria-label="Neljä kappaleen sanastoesimerkkiä">
          {samples.map((word,index)=><div key={index}>
            <strong lang="de">{word.de}</strong><span lang="fi">{word.fi}</span>
          </div>)}
        </div>
        <p><strong>Harjoittele lukemalla seuraava aito LOS!-käsikirjoituksen Text B:</strong></p>
        <blockquote lang="de" className="los-guided-review-model">{plan.chapter.textB}</blockquote>
        <button type="button" className="los-review-source-button"
          onClick={()=>move(plan.chapterId,"grammar")}>Avaa saman kappaleen koko kielioppisivu <ArrowRight size={16} aria-hidden="true"/></button>
      </>}
      {stageIndex===2&&<>
        <p>{script.reviewTask}</p>
        <p>Seuraavat tehtävät käyttävät kirjan alkuperäisiä tehtävätunnisteita.
          Kirjoittamasi vastaukset näkyvät myös oppikirjan tehtäväsivuilla.
          Kertaus ei luo automaattista koearvosanaa.</p>
        <LosFutureExercises bookId={bookId} chapterId={plan.chapterId} mode="guided" taskIds={plan.taskIds}/>
        <button type="button" className="los-review-source-button"
          onClick={()=>move(plan.chapterId,"practice")}>Avaa kappaleen muut harjoitukset <ArrowRight size={16} aria-hidden="true"/></button>
      </>}
      {stageIndex===3&&<>
        <p>Muodosta oma esimerkki, jossa käytät saman kirjan kappaleen
          {Number(plan.chapterId)} aihetta ja vähintään kahta juuri kerrattua sanaa.
          Voit tehdä siitä lyhyen viestin tai kaksivuoroisen keskustelun.
          Tarkista sen jälkeen kielioppi ja merkitykset oppikirjasta.</p>
        <label className="los-guided-reflection">
          <strong>Oma uusi saksankielinen esimerkki</strong>
          <textarea lang="de" rows={5} maxLength={3000} value={transfer}
            onChange={e=>save(plan.keys.transfer,e.target.value)}
            placeholder="Kirjoita oma lause tai lyhyt vuoropuhelu saksaksi..." />
        </label>
        <label className="los-guided-reflection">
          <strong>Itsearviointi suomeksi ja seuraava kertaus</strong>
          <textarea lang="fi" rows={3} maxLength={3000} value={reflection}
            onChange={e=>save(plan.keys.reflection,e.target.value)}
            placeholder="Mitä tarkistit? Mikä virhe korjaantui? Mitä kerrat seuraavaksi?" />
        </label>
        <p><ClipboardCheck size={17} aria-hidden="true"/>{" "}
          {transfer.trim()&&reflection.trim()
            ?"Olet kirjoittanut esimerkin ja itsearvioinnin. Niitä ei ole arvioitu automaattisesti."
            :"Kirjoita oma esimerkki ja sen tarkistus ennen kuin pidät harjoitusta loppuun käsiteltynä."}</p>
      </>}
      <div className="los-guided-lesson-next">
        <button type="button" disabled={stageIndex===0} onClick={()=>choose(stageIndex-1)}>
          <ArrowLeft size={16} aria-hidden="true"/> Edellinen
        </button>
        <button type="button" disabled={stageIndex===stages.length-1} onClick={()=>choose(stageIndex+1)}>
          Seuraava <ArrowRight size={16} aria-hidden="true"/>
        </button>
      </div>
    </section>
    <p className="los-guided-lesson-disclaimer">Tämä on toimituksellinen kertausversio. Et ole
      saanut pisteitä, kielitaitotodistusta tai hyväksyttyä kokeen suoritusta.
      Opettajan ja käsikirjoituksen kielentarkistus sekä varsinaiset kokeet ovat vielä erillisiä.</p>
  </div>;
}
