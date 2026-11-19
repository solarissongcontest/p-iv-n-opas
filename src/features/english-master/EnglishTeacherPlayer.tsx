import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Check, CheckCircle2, ChevronLeft, ChevronRight, HelpCircle, RotateCcw } from "lucide-react";
import type { Lesson, LessonTask } from "./EnglishMasterBook";
import "../los/teacher/teacher.css";
import "./english-teacher.css";

/**
 * English Master shares the actual LOS! Teacher 2.0 visual system and interaction
 * vocabulary. Its content and assessment state remain English-specific: the
 * German Teacher 2.0 engine must NEVER grade an English lesson.
 */
type Scene =
  | { id: string; kind: "intro" | "summary"; title: string; phase: string; text: string }
  | { id: string; kind: "explain"; title: string; phase: string; text: string; examples: NonNullable<NonNullable<Lesson["payload"]["explanations"]>[number]["examples"]> }
  | { id: string; kind: "board"; title: string; phase: string; text: string; english: string; meaning: string }
  | { id: string; kind: "task"; title: string; phase: string; task: LessonTask; number: number };
type Verdict = { ok: boolean | null; explanation: string; checkedAt: string };
type Session = {
  schema: "em-teacher-ui-v1"; signature: string; sceneIndex: number;
  visitedIds: string[]; paused: boolean;
  answers: Record<string, string>; checks: Record<string, Verdict>;
  attempts: Record<string, number>; boardReveal: Record<string, boolean>;
  updatedAt: string;
};
type Props = {
  lesson: Lesson;
  ownerId: string;
  previouslyCompleted: boolean;
  onBack: () => void;
  onComplete: (checked: number) => void;
};

function scriptSignature(lesson: Lesson) {
  // A small content fingerprint prevents claiming that old feedback verifies
  // a newly edited teaching manuscript.
  const input = JSON.stringify(lesson.payload);
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return lesson.content_id + ":" + (hash >>> 0).toString(16);
}
function buildScenes(lesson: Lesson): Scene[] {
  const items: Scene[] = [{
    id: "intro", kind: "intro", title: "Aloitus ja tavoitteet", phase: "ALOITUS",
    text: lesson.payload.hook_fi ?? "Aloita oppitunnin tavoitteista ja siirry sen opetukseen.",
  }];
  for (const [i,ex] of (lesson.payload.explanations ?? []).entries()) {
    items.push({ id: "explanation-"+i, kind:"explain", title: ex.heading_fi ?? "Opetus "+(i+1),
      phase: "OPETUS", text: ex.text_fi, examples: ex.examples ?? [] });
  }
  for (const [i,scene] of (lesson.payload.teacher_scenes ?? []).entries()) {
    items.push({ id:"teacher-"+i, kind:"board", phase:"OPETUSTAULU",
      title:scene.title_fi ?? "Opetustilanne "+(i+1), text:scene.teacher_fi ?? scene.text_fi ?? "",
      english:scene.board?.visible_en ?? "", meaning:scene.board?.teacher_fi ?? "" });
  }
  for (const [i,task] of (lesson.payload.tasks ?? []).entries()) {
    items.push({ id:"task-"+task.task_id, kind:"task",phase:"HARJOITUS",
      title:"Harjoitus "+(i+1), task, number:i+1 });
  }
  items.push({ id:"summary",kind:"summary",phase:"YHTEENVETO",title:"Kertaa ja päätä oppitunti",
    text:lesson.payload.summary_fi ?? "Palaa tavoitteisiin ja kertaa, mitä opit." });
  return items;
}
function freshSession(signature: string, firstId: string): Session {
  return { schema:"em-teacher-ui-v1",signature,sceneIndex:0,visitedIds:[firstId],
    paused:false,answers:{},checks:{},attempts:{},boardReveal:{},updatedAt:new Date().toISOString() };
}
function loadSession(key: string, signature: string, firstId: string): Session {
  if (typeof window === "undefined") return freshSession(signature,firstId);
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return freshSession(signature,firstId);
    const parsed = JSON.parse(raw) as Session;
    if (parsed.schema !== "em-teacher-ui-v1" || parsed.signature !== signature ||
      !Number.isInteger(parsed.sceneIndex) || !parsed.visitedIds || !parsed.answers ||
      !parsed.checks || !parsed.attempts || !parsed.boardReveal) return freshSession(signature,firstId);
    return parsed;
  } catch { return freshSession(signature,firstId); }
}
function checkAnswer(task: LessonTask, value: string): Verdict {
  const normalized = value.trim().toLocaleLowerCase("en");
  const manual = task.requires_manual_review || task.format === "free_response" ||
    (task.format === "single_choice" ? !task.correct_option : !task.acceptable_answers?.length);
  if (manual) return { ok:null,explanation:task.criteria_fi ??
    "Vertaa vastaustasi malliin ja arvioi se itse. Automaattista hyväksyntää ei anneta.",
    checkedAt:new Date().toISOString() };
  const ok = task.format === "single_choice" ? value === task.correct_option :
    (task.acceptable_answers ?? []).some(v=>v.trim().toLocaleLowerCase("en")===normalized);
  return { ok,explanation:ok ? task.feedback_correct_fi ?? "Oikein!" :
    task.wrong_option_feedback_fi?.[value] ?? task.hint_fi ?? "Tarkista sääntö ja yritä uudelleen.",
    checkedAt:new Date().toISOString() };
}

export function EnglishTeacherPlayer({ lesson, ownerId, previouslyCompleted, onBack, onComplete }: Props) {
  const scenes = useMemo(()=>buildScenes(lesson),[lesson]);
  const signature = useMemo(()=>scriptSignature(lesson),[lesson]);
  const key = "em-teacher-v2-"+ownerId+"-"+lesson.content_id;
  const [session,setSession] = useState<Session>(()=>loadSession(key,signature,scenes[0].id));
  const [hintOpen,setHintOpen] = useState(false);
  const [saveError,setSaveError] = useState(false);
  const idx = Math.max(0,Math.min(session.sceneIndex,scenes.length-1));
  const scene = scenes[idx];
  const tasks = lesson.payload.tasks ?? [];
  const checkedCount = tasks.filter(task=>Boolean(session.checks[task.task_id])).length;
  const allVisited = scenes.every(item=>session.visitedIds.includes(item.id));
  const ready = checkedCount===tasks.length && allVisited && idx===scenes.length-1;
  const update = (modify:(old:Session)=>Session) => setSession(old=>({
    ...modify(old),updatedAt:new Date().toISOString(),
  }));
  useEffect(()=>{
    try {localStorage.setItem(key,JSON.stringify(session));setSaveError(false);}
    catch {setSaveError(true);}
  },[key,session]);
  useEffect(()=>{setHintOpen(false);},[idx]);
  const move = (index:number)=>{
    const next=Math.max(0,Math.min(index,scenes.length-1));
    update(old=>({...old,sceneIndex:next,
      visitedIds:old.visitedIds.includes(scenes[next].id)?old.visitedIds:[...old.visitedIds,scenes[next].id]}));
    window.scrollTo({top:0,behavior:"instant"});
  };
  const answer = (taskId:string,value:string)=>update(old=>({
    ...old,answers:{...old.answers,[taskId]:value},
    // Changing an answer invalidates its previous evaluation.
    checks:Object.fromEntries(Object.entries(old.checks).filter(([id])=>id!==taskId)),
  }));
  const submit=(task:LessonTask,value:string)=>{
    if (!value.trim()) return;
    update(old=>({...old,answers:{...old.answers,[task.task_id]:value},
      checks:{...old.checks,[task.task_id]:checkAnswer(task,value)},
      attempts:{...old.attempts,[task.task_id]:(old.attempts[task.task_id]??0)+1}}));
  };
  const goBack=()=>{if(!saveError)onBack();};
  const finish=()=>{
    if (!ready || saveError) return;
    onComplete(checkedCount);
  };
  return <main id="main-content" className="los-app los-teacher-app em-teacher-app" tabIndex={-1}>
    <header className="los-teacher-top">
      <button type="button" className="los-teacher-back" onClick={goBack}><ArrowLeft size={18}/> Opetuspolku</button>
      <div className="los-teacher-brand"><span className="los-teacher-logo">ENGLISH MASTER</span><span>Opetustila</span></div>
      <span className="los-teacher-book">Pitkä englanti · ENA</span>
    </header>
    <div className="los-teacher-progress" role="progressbar" aria-label="Oppitunnin opetustilanteet"
      aria-valuemin={0} aria-valuemax={scenes.length} aria-valuenow={idx+1}>
      <span style={{width:((idx+1)/scenes.length*100)+"%"}}/>
    </div>
    <div className="los-teacher-layout">
      <aside className="los-teacher-sidebar">
        <p className="los-teacher-eyebrow">OPETUSPOLKU · {lesson.content_id}</p>
        <h1>{lesson.title}</h1>
        <p className="los-teacher-sidebar-copy">{lesson.payload.hook_fi ?? "Opetustilassa etenet aihe kerrallaan."}</p>
        <p className="los-teacher-small">
          {previouslyCompleted ? "Merkitty harjoitelluksi" : "Opetustilanne "+(idx+1)+"/"+scenes.length}
          {" · "}{checkedCount}/{tasks.length} harjoitusta tarkistettu
        </p>
        <button className="los-teacher-pause" type="button"
          onClick={()=>update(old=>({...old,paused:!old.paused}))}>
          {session.paused?"Jatka opetusta":"Keskeytä oppitunti"}
        </button>
        <details className="los-teacher-outline" open>
          <summary>Oppitunnin sisältö</summary>
          <nav aria-label="Oppitunnin opetustilanteet">
            {scenes.map((item,i)=><button key={item.id} type="button"
              aria-current={i===idx?"step":undefined}
              className={i===idx?"is-active":""}
              onClick={()=>move(i)}>
              <span>{session.visitedIds.includes(item.id)?<Check size={15}/>:i+1}</span>
              <span>{item.title}</span>
            </button>)}
          </nav>
        </details>
        <p className="los-teacher-save" role="status">{saveError?
          "Tallennus epäonnistui. Älä sulje opetustilaa ennen kuin tallennus toimii.":
          "Opetustilanteet ja vastaukset tallentuvat tälle laitteelle."}</p>
      </aside>
      {session.paused ? <section className="los-teacher-paused" role="status">
        <h2>Oppitunti keskeytetty</h2>
        <p>Opetustilanne ja tähän mennessä tallennetut vastaukset säilyvät tällä laitteella.</p>
        <button type="button" onClick={()=>update(old=>({...old,paused:false}))}>Jatka opetusta</button>
      </section> : <article className="los-teacher-paper em-teacher-paper" key={scene.id}>
        <p className="los-teacher-scene-kicker">{scene.phase} · {idx+1}/{scenes.length}</p>
        <h2>{scene.title}</h2>
        {scene.kind==="intro" && <>
          <div className="los-teacher-prose"><p>{scene.text}</p></div>
          {lesson.payload.objectives_fi?.length ? <section className="em-teacher-goals">
            <h3>Oppitunnin tavoitteet</h3>
            <ul>{lesson.payload.objectives_fi.map((goal,i)=><li key={i}>{goal}</li>)}</ul>
          </section>:null}
        </>}
        {scene.kind==="explain" && <>
          <div className="los-teacher-prose"><p>{scene.text}</p></div>
          {scene.examples.length>0 && <div className="los-teacher-board" aria-label="Opetusesimerkit">
            <p className="los-teacher-board-label">ESIMERKIT</p>
            <div className="los-teacher-board-grid">
              {scene.examples.map((example,i)=><div key={i} className="los-teacher-board-item">
                <strong lang="en">{example.en}</strong>
                {example.meaning_fi&&<small>{example.meaning_fi}</small>}
                {example.why_fi&&<p>{example.why_fi}</p>}
              </div>)}
            </div>
          </div>}
        </>}
        {scene.kind==="board" && <>
          <div className="los-teacher-prose"><p>{scene.text}</p></div>
          {scene.english && <div className="los-teacher-board">
            <p className="los-teacher-board-label">OPETUSTAULU</p>
            <div className="los-teacher-board-grid">
              <div className="los-teacher-board-item">
                <strong lang="en">{scene.english}</strong>
                {scene.meaning && session.boardReveal[scene.id]&&<small>{scene.meaning}</small>}
              </div>
            </div>
            {scene.meaning && <div className="los-teacher-board-actions">
              <button type="button" onClick={()=>update(old=>({...old,boardReveal:{
                ...old.boardReveal,[scene.id]:!old.boardReveal[scene.id]
              }}))}>{session.boardReveal[scene.id]?
                <><RotateCcw size={16}/> Piilota selitys</> :
                <><BookOpen size={16}/> Näytä selitys</>}</button>
            </div>}
          </div>}
          {lesson.payload.alternative_explanation_fi && <section className="los-teacher-help">
            <button type="button" aria-expanded={hintOpen} onClick={()=>setHintOpen(v=>!v)}>
              <HelpCircle size={17}/> En ymmärrä · {hintOpen?"Piilota":"Toinen selitys"}
            </button>
            {hintOpen && <div className="los-teacher-help-entries"><p>{lesson.payload.alternative_explanation_fi}</p></div>}
          </section>}
        </>}
        {scene.kind==="task" && <section className="los-teacher-question em-teacher-question">
          <h3 lang={scene.task.prompt_en?"en":"fi"}>{scene.task.prompt_en??scene.task.prompt_fi}</h3>
          {scene.task.format==="single_choice" && scene.task.options?.length ?
            <div className="los-teacher-options" role="group" aria-label="Valitse vastaus">
              {scene.task.options.map((option,i)=><button type="button" className={
                "los-teacher-option"+(session.answers[scene.task.task_id]===option.id?" is-selected":"")
              } aria-pressed={session.answers[scene.task.task_id]===option.id}
              key={option.id} onClick={()=>submit(scene.task,option.id)}>
                <span className="los-teacher-option-letter">{option.id||String(i+1)}</span>
                <span lang="en">{option.text}</span>
                {session.checks[scene.task.task_id]?.ok && session.answers[scene.task.task_id]===option.id && <Check size={18}/>}
              </button>)}
            </div>:
            <form className="los-teacher-form" onSubmit={event=>{
              event.preventDefault();submit(scene.task,session.answers[scene.task.task_id]??"");
            }}>
              <label htmlFor={"em-teacher-answer-"+scene.number}>Kirjoita vastauksesi</label>
              {scene.task.format==="free_response" ?
                <textarea id={"em-teacher-answer-"+scene.number} rows={5}
                  value={session.answers[scene.task.task_id]??""}
                  onChange={e=>answer(scene.task.task_id,e.target.value)} maxLength={5000}
                  placeholder="Kirjoita oma vastauksesi englanniksi"/>:
                <div className="los-teacher-input-row"><input id={"em-teacher-answer-"+scene.number}
                  type="text" lang="en" autoComplete="off"
                  value={session.answers[scene.task.task_id]??""}
                  onChange={e=>answer(scene.task.task_id,e.target.value)} maxLength={500}
                  placeholder="Vastauksesi englanniksi"/><button type="submit" disabled={!session.answers[scene.task.task_id]?.trim()}>Tarkista</button></div>}
              {scene.task.format==="free_response"&&<button type="submit" className="los-teacher-primary"
                disabled={!session.answers[scene.task.task_id]?.trim()}>Tarkista itse</button>}
            </form>}
          {session.checks[scene.task.task_id] && <div className={"los-teacher-feedback "+
              (session.checks[scene.task.task_id].ok===false?"is-wrong":"is-right")} role="status">
              <strong>{session.checks[scene.task.task_id].ok===null?"Itsearviointi":
                session.checks[scene.task.task_id].ok?"Oikein":"Katsotaan tätä vielä"}</strong>
              <p>{session.checks[scene.task.task_id].explanation}</p>
              {session.checks[scene.task.task_id].ok===null &&
                <p>Vastausta ei ole automaattisesti hyväksytty. Arvioi kieli itse tai opettajan avulla.</p>}
            </div>}
          <div className="los-teacher-question-tools">
            {scene.task.hint_fi && <><button type="button" onClick={()=>setHintOpen(v=>!v)} aria-expanded={hintOpen}>
              <HelpCircle size={16}/> {hintOpen?"Piilota vihje":"Tarvitsen vihjeen"}
            </button>{hintOpen&&<p className="los-teacher-hint">{scene.task.hint_fi}</p>}</>}
            {session.checks[scene.task.task_id] && (scene.task.model_answer_en||scene.task.acceptable_answers?.length) &&
              <details className="em-teacher-model">
                <summary>Näytä mallivastaus</summary>
                <p lang="en">{scene.task.model_answer_en??scene.task.acceptable_answers?.[0]}</p>
              </details>}
          </div>
        </section>}
        {scene.kind==="summary" && <>
          <div className="los-teacher-prose"><p>{scene.text}</p></div>
          <div className="los-teacher-summary">
            <h3>Oppitunnin harjoittelutilanne</h3>
            <p>{checkedCount}/{tasks.length} harjoitusta tarkistettu.</p>
            <p>{allVisited?"Kaikki opetustilanteet avattu.":"Kaikkia opetustilanteita ei ole vielä avattu."}</p>
            <p>Tämä on harjoittelumerkintä, ei automaattinen todiste kielitaidosta.</p>
          </div>
          {!previouslyCompleted && <button className="los-teacher-primary" type="button"
            disabled={!ready||saveError} onClick={finish}>
            <CheckCircle2 size={17}/> Merkitse harjoitelluksi
          </button>}
          {!ready && <p className="los-teacher-small" role="status">
            Käy kaikki opetustilanteet läpi ja tarkista jokainen harjoitus ennen loppumerkintää.
          </p>}
          {previouslyCompleted && <p className="los-teacher-done"><CheckCircle2 size={18}/> Oppitunti merkitty harjoitelluksi.</p>}
        </>}
        <nav className="los-teacher-navigation" aria-label="Opetustilanteiden vaihto">
          <button type="button" disabled={idx===0} onClick={()=>move(idx-1)}><ChevronLeft size={18}/> Edellinen</button>
          {idx<scenes.length-1?<button type="button" className="los-teacher-primary"
            onClick={()=>move(idx+1)}>Seuraava vaihe <ChevronRight size={18}/></button>:
            <button type="button" className="los-teacher-back" onClick={goBack}>Takaisin Opetuspolkuun <ArrowRight size={16}/></button>}
        </nav>
      </article>}
    </div>
  </main>;
}
