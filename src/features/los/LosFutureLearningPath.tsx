import { ArrowRight, BookOpen, LockKeyhole } from "lucide-react";
import type { LosBookDefinition } from "./catalog";
import type { LosNavigate } from "./LosReferenceTools";
import { losFutureLessonOutline, type LosFutureLessonOutline } from "./losFutureLessonOutline";
import "./los-future-path.css";

const chapterBuckets=[{title:"Alkukartoitus",min:1,max:1},
  {title:"Kappaleet 1–5 · ensimmäinen puolisko",min:2,max:26},
  {title:"Kertaus ja välikoe",min:27,max:30},
  {title:"Kappaleet 6–10 · toinen puolisko",min:31,max:55},
  {title:"Loppukertaus ja osaamisen arviointi",min:56,max:60},
] as const;

function LessonItem({lesson,move}:{
  lesson:LosFutureLessonOutline;move:LosNavigate;
}) {
  const body=<>
    <span className="los-path-number">{String(lesson.number).padStart(2,"0")}</span>
    <span className="los-path-copy">
      <strong>{lesson.title}</strong>
      <small>{lesson.chapterId
        ? `Kappale ${Number(lesson.chapterId)} · ${lesson.chapterTitle} · Avaa sisältösivu`
        : "Ohjaus- ja arviointisisältö vielä kesken"}</small>
    </span>
    {lesson.chapterId?<ArrowRight size={18} aria-hidden="true"/>:<LockKeyhole size={17} aria-hidden="true"/>}
  </>;
  const chapterId=lesson.chapterId;
  const destination=lesson.destination;
  return <li key={lesson.id}>
    {chapterId&&destination
      ? <button type="button" onClick={()=>move(chapterId,destination)} aria-label={`Tunti ${lesson.number}: ${lesson.title}. Avaa kirjan sisältösivu`}>{body}</button>
      : <div className="los-future-lessons-pending" aria-label={`Tunti ${lesson.number}: ${lesson.title}. Ei vielä käytettävissä`}>{body}</div>}
  </li>;
}

export function LosFutureLearningPath({book,move}:{
  book:LosBookDefinition;move:LosNavigate;
}) {
  const lessons=losFutureLessonOutline(book);
  return <section className="los-inner-page los-learning-path">
    <p className="los-eyebrow">OHJATTU LUKUJÄRJESTYS / {book.code}</p>
    <h1>Opetuspolku</h1>
    <p className="los-page-intro">{book.title} sisältää käsikirjoitussuunnitelman mukaan
      60 noin 30 minuutin oppituntia. Tässä on niiden oikea järjestys, kappalejaot
      ja suorat siirtymät kirjan omiin teksteihin, kielioppiin ja harjoituksiin.</p>
    <div className="los-path-notice" role="status">
      <BookOpen size={20} aria-hidden="true"/>
      <p><strong>60 suunniteltua tuntia, 0 valmiiksi hyväksyttyä ohjattua oppituntia.</strong>{" "}
        Kappaleiden 50 tuntipaikasta pääsee jo tarvittaville sisältösivuille, mutta
        oppitunnin varsinainen vaiheittainen opettajaohjaus, äänitevaatimukset,
        loppukysymykset ja suorituksen hyväksyntä rakennetaan erikseen. Kertaus- ja
        koetunteja ei vielä väitetä toimiviksi. Pelkkä siirtymä sisältösivulle
        ei muuta oppituntia suoritetuksi.</p>
    </div>
    {chapterBuckets.map((bucket,i)=>{
      const items=lessons.filter(x=>x.number>=bucket.min&&x.number<=bucket.max);
      return <details key={bucket.title} className="los-future-path-group" open={i<=1?true:undefined}>
        <summary><span>{bucket.title}</span><small>{items.length} tuntia</small></summary>
        <div className="los-path-group">
          <ol>{items.map(lesson=><LessonItem key={lesson.id} lesson={lesson} move={move}/>)}</ol>
        </div>
      </details>;
    })}
    <p className="los-page-intro">Opetuspolun tarkistetut tuntikokonaisuudet ja koetehtävät
      edellyttävät edelleen lähdekäsikirjoitusten varsinaisten ohjaustekstien tuomista
      tuntimoottoriin. Älä tulkitse tätä sisällysluetteloa suoritusrekisteriksi.</p>
  </section>;
}
