import { useState } from "react";
import { getDeviceOwnerId } from "@/lib/deviceSession";
import { losFutureStageCursorKey } from "./losFutureSessionKeys.ts";
import { ArrowLeft, ArrowRight, BookOpen, Check, CircleAlert, ClipboardList, LockKeyhole } from "lucide-react";
import { getLosFutureLesson } from "./content/losFutureLessons.ts";
import type { LosFutureLessonContent } from "./content/losFutureLessonTypes.ts";
import { LosFutureExercises } from "./LosFutureExercises";
import { useLosChapterDraft } from "./studyState";
import type { LosNavigate } from "./LosReferenceTools";

type Stage={id:string;label:string;description:string;section:"chapter"|"text"|"grammar"|"practice"|"apply"|"text-b";};
const stagesFor=(script:LosFutureLessonContent):Stage[]=>[
  {id:"start",label:"Opettajan aloitus",description:script.intro,section:"chapter"},
  {id:"model",label:"Mallin purku",description:script.model,section:"grammar"},
  {id:"guide",label:"Vaiheittainen ohjaus",description:script.guidance,section:"text"},
  {id:"attempt",label:"Ohjattu yritys",description:script.attempt,section:"practice"},
  {id:"tasks",label:"Tehtävät ja itsekorjaus",description:"Tee tämän tunnin tehtävät ensin omatoimisesti. Vastausten vertailu ei ole kielitaidon automaattista arviointia.",section:"practice"},
  {id:"check",label:"Tunnin lopputarkistus",description:script.exitCheck,section:"apply"},
];

function GuidedChapterLesson({bookId,chapterId,script,move}:{
  bookId:number;chapterId:string;script:LosFutureLessonContent;move:LosNavigate;
}){
  const {draft,update,saved}=useLosChapterDraft(bookId,chapterId);
  const stageStorageKey=losFutureStageCursorKey(getDeviceOwnerId(),script.id);
  const [stageIndex,setStageIndex]=useState(()=>{
    try {
      const raw=!stageStorageKey||typeof sessionStorage==="undefined"?null:sessionStorage.getItem(stageStorageKey);
      const value=Number(raw);
      return raw!==null&&Number.isInteger(value)&&value>=0&&value<6?value:0;
    }catch{return 0;}
  });
  const stages=stagesFor(script);
  function chooseStage(index:number){
    const next=Math.max(0,Math.min(index,stages.length-1));
    setStageIndex(next);
    try{if(stageStorageKey)sessionStorage.setItem(stageStorageKey,String(next));}
    catch{/* tuntia voi käyttää myös ilman sessionStoragea */}
  }
  const stage=stages[stageIndex]!;
  const marker=(s:Stage)=>`los.future.guided:${script.id}:${s.id}`;
  const checked=stages.filter(s=>draft.practiceChecked.includes(marker(s))).length;
  const reflectionId=`${script.id}:own-reflection`;
  const reflection=draft.practiceAnswers[reflectionId]??"";
  const marked=draft.practiceChecked.includes(marker(stage));
  function toggleStage(){
    update(current=>({
      ...current,
      practiceChecked:marked
        ? current.practiceChecked.filter(id=>id!==marker(stage))
        : [...current.practiceChecked,marker(stage)],
    }));
  }
  function updateReflection(value:string){
    update(current=>({
      ...current,practiceAnswers:{...current.practiceAnswers,[reflectionId]:value.slice(0,3000)},
    }));
  }
  return <div className="los-guided-lesson">
    <div className="los-guided-lesson-status">
      <span><BookOpen size={16} aria-hidden="true"/> Kappale {Number(chapterId)} · {checked}/{stages.length} vaihetta kokeiltu</span>
      <span role="status">{saved?"Muistiinpanot paikallisesti tallennettu":"Tallentaminen epäonnistui"}</span>
    </div>
    <p className="los-guided-lesson-goal"><strong>Osaamistavoite:</strong> {script.objective}</p>
    <details className="los-guided-lesson-timetable">
      <summary>Tunnin ajankäyttö: {script.timings.reduce((sum,item)=>sum+item.minutes,0)} min</summary>
      <ol>{script.timings.map((step,i)=><li key={i}><strong>{step.minutes} min</strong> · {step.activity}</li>)}</ol>
    </details>
    <nav className="los-guided-lesson-stage-nav" aria-label="Oppitunnin vaiheet">
      {stages.map((item,i)=><button type="button" key={item.id}
        className={stageIndex===i?"is-current":""}
        aria-current={stageIndex===i?"step":undefined}
        onClick={()=>chooseStage(i)}>
        <span>{draft.practiceChecked.includes(marker(item))?<Check size={13} aria-label="Vaihe kokeiltu"/>:i+1}</span>
        <span>{item.label}</span>
      </button>)}
    </nav>
    <section className="los-guided-lesson-stage" aria-labelledby="los-guided-lesson-stage-title">
      <p className="los-eyebrow">VAIHE {stageIndex+1} / {stages.length} · KÄSIKIRJOITUSLUONNOS</p>
      <h3 id="los-guided-lesson-stage-title">{stage.label}</h3>
      <p>{stage.description}</p>
      {stage.id==="start"&&script.resource&&<p className="los-guided-lesson-source"><strong>Kirjan aineisto:</strong> {script.resource}</p>}
      {stage.id==="guide"&&script.teacherTip&&<details><summary>Opettajan lisävinkki</summary><p>{script.teacherTip}</p></details>}
      {stage.id==="tasks"&&<LosFutureExercises
        bookId={bookId} chapterId={chapterId} mode="guided" taskIds={script.exerciseIds}/>}
      {stage.id==="check"&&<>
        <label className="los-guided-reflection">
          <strong>Oma korjausohje tai reflektio</strong>
          <textarea rows={3} value={reflection} maxLength={3000}
            onChange={event=>updateReflection(event.target.value)}
            placeholder="Mikä onnistui? Mitä harjoittelet seuraavaksi?" />
        </label>
        {script.extra&&<details><summary>Lisähaaste nopeammin valmistuvalle</summary><p>{script.extra}</p></details>}
      </>}
      <div className="los-guided-lesson-actions">
        <button type="button" onClick={()=>move(chapterId,stage.section)}>
          Avaa vastaava kirjan sivu <ArrowRight size={16} aria-hidden="true"/>
        </button>
        <button type="button" className={marked?"is-checked":""} onClick={toggleStage}>
          <Check size={16} aria-hidden="true"/>
          {marked?"Vaihe merkitty kokeilluksi":"Merkitse vaihe kokeilluksi"}
        </button>
      </div>
      <div className="los-guided-lesson-next">
        <button type="button" disabled={stageIndex===0} onClick={()=>chooseStage(stageIndex-1)}>
          <ArrowLeft size={16} aria-hidden="true"/> Edellinen vaihe
        </button>
        <button type="button" disabled={stageIndex>=stages.length-1} onClick={()=>chooseStage(stageIndex+1)}>
          Seuraava vaihe <ArrowRight size={16} aria-hidden="true"/>
        </button>
      </div>
    </section>
    <p className="los-guided-lesson-disclaimer"><CircleAlert size={16} aria-hidden="true"/>
      Vaiheen kokeilluksi merkitseminen ei tarkoita oppitunnin hyväksyttyä suoritusta.
      Virallisen lopputarkistuksen arviointi, ääni ja mahdolliset oppimistulokset
      edellyttävät vielä erillisen julkaisuhyväksynnän.</p>
  </div>;
}

function ReviewLesson({script}: {script:LosFutureLessonContent}){
  const isExam=script.number===30||script.number===59;
  return <div className="los-guided-review">
    <div className="los-guided-lesson-status">
      {isExam?<LockKeyhole size={19} aria-hidden="true"/>:<ClipboardList size={19} aria-hidden="true"/>}
      <strong>{isExam?"Kokeen ohje, ei avattu arvioitava koe":"Kertauksen käsikirjoitusluonnos"}</strong>
    </div>
    <h3>Opettajan aloitus</h3><p>{script.intro}</p>
    <h3>Opetus ja palaute</h3><p>{script.reviewTeaching}</p>
    <h3>Ohjattu tehtävä</h3><p>{script.reviewTask}</p>
    <h3>Ajanjako</h3><p>{script.reviewTiming}</p>
    <div className="los-editorial-note"><strong>Kertauksen ja kokeen sääntö:</strong> {script.reviewRule}</div>
    {isExam&&<p className="los-guided-lesson-disclaimer">
      <LockKeyhole size={16} aria-hidden="true"/>
      Varsinaista koetta ei ole tässä toteutettu: testikysymyksiä, turvallista palautusta,
      vastausten paljastusta tai pisteytystä ei käynnistetä tästä ohjesivusta.</p>}
  </div>;
}

/** Hakee pelkästään valitun kirjan hyväksyntää odottavan v1.0-käsikirjoitusskriptin.
 * Kappaletunnin itsearvioidut vaiheet eivät koskaan kirjoita lessonProgress.completedAt-kenttään.
 */
export function LosFutureLessonRunner({bookId,number,chapterId,move}:{
  bookId:number;number:number;chapterId:string|null;move:LosNavigate;
}){
  const script=getLosFutureLesson(bookId,number);
  if(!script)return <div role="alert">Tämän oppitunnin käsikirjoitusta ei löydy valitusta kirjasta.</div>;
  return <section id="los-future-lesson-runner" className="los-future-lesson-runner">
    <p className="los-eyebrow">{script.id} · KÄSIKIRJOITUSLUONNOS</p>
    <h2>{script.title}</h2>
    {script.kind==="chapter"&&chapterId
      ? <GuidedChapterLesson key={script.id} bookId={bookId} chapterId={chapterId} script={script} move={move}/>
      : <ReviewLesson script={script}/>}
  </section>;
}
