import {useRef, useState} from "react";
import {ArrowLeft,ArrowRight,BookOpen,Check,CheckCircle2,ChevronLeft,ChevronRight,HelpCircle,RotateCcw} from "lucide-react";
import {teacherBuiltNumberCount,isCorrectCalendarEntry,teacherLatestAttempt,teacherRequiresNumericResponse,teacherWrongFeedback,type TeacherScene,type TeacherSession} from "./engine.ts";

export function TeacherSceneQuestion({ scene, session, submit, saveDraft, requestHint, reveal, language = "de" }: {
  scene: TeacherScene;
  session: TeacherSession;
  submit: (value: string) => void;
  saveDraft: (value: string) => void;
  requestHint: () => void;
  reveal: () => void;
  language?: "de" | "en";
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const q = scene.question;
  if (!q) return null;
  const numericResponse = teacherRequiresNumericResponse(q);
  const latest = teacherLatestAttempt(session, scene.id);
  const attempts = session.attempts.filter(item => item.sceneId === scene.id);
  const succeeded = attempts.some(item => item.correct);
  const exhausted = attempts.length >= 3 && !succeeded;
  const helped = session.helpedIds.includes(scene.id);
  const solutionVisible = session.revealedIds.includes(scene.id);
  const drafted = session.draftAnswers[scene.id] ?? "";
  const inputDisabled = succeeded || exhausted || solutionVisible || Boolean(session.completedAt);
  const insertGermanCharacter = (character: string) => {
    if (inputDisabled || numericResponse) return;
    const input = inputRef.current;
    const start = input?.selectionStart ?? drafted.length;
    const end = input?.selectionEnd ?? start;
    const next = drafted.slice(0, start) + character + drafted.slice(end);
    if (next.length > 500) return;
    saveDraft(next);
    requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(start + character.length, start + character.length);
    });
  };
  const solution = q.type === "choice"
    ? q.options?.find(opt => opt.id === q.correctOption)?.label ?? ""
    : q.accepted?.[0] ?? "";
  return <div className="los-teacher-question">
    <h3>{q.prompt}</h3>
    {q.type === "choice" ? <div className="los-teacher-options" role="group" aria-label={q.prompt}>
      {q.options?.map(option => <button key={option.id} type="button"
        className={"los-teacher-option" + (latest?.answer === option.id ? " is-selected" : "")}
        disabled={succeeded || exhausted || solutionVisible || Boolean(session.completedAt)} onClick={() => submit(option.id)}>
        <span className="los-teacher-option-letter">{option.id.toUpperCase()}</span>
        <span lang={option.lang ?? language}>{option.label}</span>
        {latest?.answer === option.id && latest.correct && <Check size={18} aria-hidden="true" />}
      </button>)}
    </div> : <form className="los-teacher-form" onSubmit={event => {
      event.preventDefault();
      if (drafted.trim() && !succeeded && !exhausted && !solutionVisible) submit(drafted);
    }}>
      <label htmlFor="los-teacher-answer">{numericResponse ? "Vastauksesi numeroin" : "Vastauksesi " + (language === "en" ? "englanniksi" : "saksaksi")}</label>
      <div className="los-teacher-input-row">
        <input ref={inputRef} id="los-teacher-answer" lang={numericResponse ? undefined : language}
          inputMode={numericResponse ? "numeric" : "text"}
          autoComplete="off" spellCheck={false}
          value={drafted} maxLength={500} disabled={inputDisabled}
          onChange={event => saveDraft(event.target.value)}
          placeholder={numericResponse ? "Kirjoita numeroina..." : "Kirjoita " + (language === "en" ? "englanniksi..." : "saksaksi...")} />
        <button type="submit" disabled={!drafted.trim() || inputDisabled}>Tarkista</button>
      </div>
      {!numericResponse && language === "de" && <div className="los-teacher-special-keys" role="group" aria-label="Saksan erikoismerkit">
        <span>Lisää merkki</span>
        {(["ä", "ö", "ü", "ß"] as const).map(character =>
          <button key={character} type="button" lang="de" aria-label={"Lisää " + character}
            disabled={inputDisabled || drafted.length >= 500}
            onClick={() => insertGermanCharacter(character)}>{character}</button>)}
      </div>}
    </form>}
    {latest && <div className={"los-teacher-feedback " + (latest.correct ? "is-right" : "is-wrong")}
      role="status" aria-live="polite">
      <strong>{latest.correct ? "Oikein" : "Katsotaan tätä vielä"}</strong>
      <p>{latest.correct ? q.success : teacherWrongFeedback(scene, latest.answer, language)}</p>
      {!latest.correct && attempts.length >= 2 && <p>{q.reteach}</p>}
      {latest.correct && !latest.independent &&
        <p>Tämä oli harjoittelussa oikein. Täysin itsenäinen näyttö arvioidaan erikseen.</p>}
    </div>}
    {exhausted && <p className="los-teacher-hint" role="status">
      Kolme yritystä käytetty. Avaa mallivastaus ja jatka oppimista. Tästä ei synny itsenäisen osaamisen merkintää.
    </p>}
    {!succeeded && !session.completedAt && <div className="los-teacher-question-tools">
      {!exhausted && <button type="button" onClick={requestHint}><HelpCircle size={16}/> Tarvitsen vihjeen</button>}
      {helped && <p className="los-teacher-hint">{q.hint}</p>}
      {attempts.length >= 2 && !solutionVisible && <button type="button" onClick={reveal}>
        <BookOpen size={16} /> Näytä mallivastaus
      </button>}
      {solutionVisible && <p className="los-teacher-solution">Mallivastaus: <strong lang={language}>{solution}</strong>. Voit jatkaa seuraavaan vaiheeseen; mallivastauksen avaamista ei lasketa omaksi osaamisnäytöksi.</p>}
    </div>}
    {succeeded && <p className="los-teacher-ready"><CheckCircle2 size={17}/> Tehtävä tarkistettu. Voit jatkaa.</p>}
  </div>;
}

export function TeacherBoard({ scene, language = "de" }: { scene: TeacherScene; language?: "de" | "en" }) {
  const [visible, setVisible] = useState(1);
  const board = scene.board ?? [];
  return <div className="los-teacher-board">
    <div className="los-teacher-board-label">OPETUSTAULU · {Math.min(visible, board.length)}/{board.length}</div>
    <div className="los-teacher-board-grid">
      {board.slice(0, visible).map((item, index) => <div className="los-teacher-board-item" key={index}>
        <span>{item.label}</span>
        <strong lang={language}>{item.german}</strong>
        <small>{item.meaning}</small>
      </div>)}
    </div>
    <div className="los-teacher-board-actions">
      <button type="button" disabled={visible <= 1} onClick={() => setVisible(n => n - 1)}>
        <ChevronLeft size={17}/> Edellinen
      </button>
      <button type="button" onClick={() => setVisible(n => n >= board.length ? 1 : n + 1)}>
        {visible < board.length ? "Näytä seuraava" : "Aloita alusta"}
        <RotateCcw size={16}/>
      </button>
      {visible < board.length && <button type="button" onClick={() => setVisible(board.length)}>Näytä kaikki</button>}
    </div>
  </div>;
}



/** Shared, real LOS! 1 Teacher 2.0 UI primitives. Use the SAME components in
 * both books. Lesson content and domain-specific evidence stay in each book.
 */
export function TeacherTopbar({ brand, context, onBack, href }: {
  brand: string; context: string; onBack?: () => void; href?: string;
}) {
  return <header className="los-teacher-top">
    {href ? <a className="los-teacher-back" href={href}><ArrowLeft size={18}/> Opetuspolku</a> :
      <button type="button" className="los-teacher-back" onClick={onBack}><ArrowLeft size={18}/> Opetuspolku</button>}
    <div className="los-teacher-brand"><span className="los-teacher-logo">{brand}</span><span>Opetustila</span></div>
    <span className="los-teacher-book">{context}</span>
  </header>;
}

export function TeacherProgressBar({ value, max }: { value: number; max: number }) {
  const ratio = max ? Math.max(0, Math.min(value, max))/max*100 : 0;
  return <div className="los-teacher-progress" role="progressbar" aria-label="Oppitunnin opetustilanteet"
    aria-valuemin={0} aria-valuemax={max} aria-valuenow={value}>
    <span style={{width:ratio+"%"}}/>
  </div>;
}

export function TeacherSceneOutline({ scenes, currentId, visitedIds, onSelect, disabled, open, onToggle }: {
  scenes: readonly { id: string; title: string }[];
  currentId: string; visitedIds: readonly string[]; onSelect: (id: string) => void;
  disabled?: boolean; open?: boolean; onToggle?: (open: boolean) => void;
}) {
  return <details className="los-teacher-outline" open={open ?? true}
    onToggle={onToggle ? (event => onToggle(event.currentTarget.open)) : undefined}>
    <summary>Oppitunnin sisältö</summary>
    <nav aria-label="Oppitunnin opetustilanteet">
      {scenes.map((item, i) => <button key={item.id} type="button" disabled={disabled}
        aria-current={currentId===item.id?"step":undefined}
        className={currentId===item.id?"is-active":""}
        onClick={()=>{
          onSelect(item.id);
          if(typeof window!=="undefined"&&window.innerWidth<=820){
            onToggle?.(false);
            window.requestAnimationFrame(()=>
              document.querySelector(".los-teacher-paper")?.scrollIntoView({block:"start",behavior:"auto"}));
          }
        }}>
        <span>{visitedIds.includes(item.id)?<Check size={15}/>:String(i+1)}</span>
        <span>{item.title}</span>
      </button>)}
    </nav>
  </details>;
}

export function TeacherSceneNavigation({ onReplay, onPrevious, onNext, onReturn, returnHref,
  disablePrevious, disableNext, last }: {
  onReplay?:()=>void; onPrevious:()=>void; onNext:()=>void;
  onReturn?:()=>void; returnHref?:string; disablePrevious:boolean;
  disableNext?:boolean; last:boolean;
}) {
  return <div className="los-teacher-navigation">
    {onReplay && <button type="button" onClick={onReplay}>Toista opetustilanne</button>}
    <button type="button" disabled={disablePrevious} onClick={onPrevious}>
      <ChevronLeft size={18}/> Edellinen
    </button>
    {!last && <button type="button" className="los-teacher-primary" disabled={disableNext}
      onClick={onNext}>Seuraava <ChevronRight size={18}/></button>}
    {last && (returnHref ? <a href={returnHref}>Takaisin Opetuspolkuun <ArrowRight size={17}/></a> :
      <button type="button" onClick={onReturn}>Takaisin Opetuspolkuun <ArrowRight size={17}/></button>)}
  </div>;
}


/** The same controlled reflective-writing field in LOS! and English Master.
 * Written work is recorded, never automatically evaluated for language skill.
 */
export function TeacherSceneReflection({scene,session,completed,onChange,doneMessage}:{
  scene:TeacherScene;session:TeacherSession;completed:boolean;
  onChange:(value:string)=>void;doneMessage?:string;
}){
  if(!scene.reflection)return null;
  const field=scene.reflection;
  const value=session.draftAnswers[scene.id]??"";
  return <div className="los-teacher-reflection">
    <label htmlFor={"los-teacher-reflection-"+scene.id}>{field.prompt}</label>
    <textarea id={"los-teacher-reflection-"+scene.id} rows={4} maxLength={500}
      placeholder={field.placeholder} value={value} disabled={completed}
      onChange={event=>onChange(event.target.value)}/>
    <small role="status">{value.trim().length>=field.minLength
      ?doneMessage??"Tavoite tallennettu. Voit vahvistaa sen alla."
      :"Kirjoita vähintään "+field.minLength+" merkkiä. Tekstisi tallentuu automaattisesti."}</small>
  </div>;
}

/** Shared LOS! Teacher 2.0 activity confirmation. All manuscript prerequisites
 * are checked in the same component; confirmation is not language mastery.
 */
export function TeacherSceneActivity({scene,session,completed,onConfirm,doneLabel}:{
  scene:TeacherScene;session:TeacherSession;completed:boolean;
  onConfirm:(activityId:string)=>void;doneLabel?:string;
}){
  if(!scene.activityId)return null;
  const activityId=scene.activityId;
  const confirmed=session.activityIds.includes(activityId);
  const disabled=confirmed||completed||
    Boolean(scene.reflection&&(session.draftAnswers[scene.id]?.trim().length??0)<scene.reflection.minLength)||
    Boolean(scene.numberBuilder&&teacherBuiltNumberCount(session,scene.id)<4)||
    Boolean(scene.form&&scene.form.some(field=>!session.draftAnswers[scene.id+"."+field.id]?.trim()))||
    Boolean(scene.calendar&&!isCorrectCalendarEntry(scene,session.draftAnswers[scene.id]??""));
  return <div className="los-teacher-activity">
    <button type="button" disabled={disabled} onClick={()=>onConfirm(activityId)}>
      {confirmed?<CheckCircle2 size={18}/>:<Check size={18}/>}
      {confirmed?(doneLabel??"Harjoittelu vahvistettu"):scene.activityLabel}
    </button>
    <p>Tämä on oma vahvistuksesi, ei automaattinen kielitaidon arvio.</p>
  </div>;
}
