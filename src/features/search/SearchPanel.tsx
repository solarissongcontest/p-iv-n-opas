import { useRef, useState } from "react";
import type { Course, Exam, Session, Topic } from "@/lib/domain";
import { shortDate } from "@/lib/fi";
import { Dialog, input } from "@/features/shared/DialogPrimitives";

type SearchPanelProps = {
  courses: Course[];
  topics: Topic[];
  exams: Exam[];
  sessions: Session[];
  onClose: () => void;
  onNavigate: (page: string) => void;
  onCourse: (id: string) => void;
  onTopic: (courseId: string, topicId: string) => void;
  onExam: (examId: string) => void;
  onLog: () => void;
};

const destinations = [
  ["today", "Tänään", "Päivän seuraava opiskelutoiminto"],
  ["plan", "Suunnitelma", "Päivä, viikko ja kuukausi"],
  ["courses", "Opinnot", "Kurssit ja aiheet"],
  ["practice", "Harjoittelu", "Tehtävät ja kertaus"],
  ["progress", "Edistyminen", "Yhteenveto ja osaaminen"],
  ["exams", "Kokeet", "Valmistautuminen ja koeharjoitus"],
  ["settings", "Asetukset", "Opiskelurytmi, muistutukset ja sovellus"],
] as const;

export function SearchPanel({
  courses,
  topics,
  exams,
  sessions,
  onClose,
  onNavigate,
  onCourse,
  onTopic,
  onExam,
  onLog,
}: SearchPanelProps) {
  const [q,setQ]=useState("");
  const listRef=useRef<HTMLDivElement>(null);
  const normalized=q.trim().toLowerCase();
  const commandProps={"data-command-result":true} as const;

  const courseHits=courses
    .filter(course=>(course.code+" "+course.name).toLowerCase().includes(normalized))
    .slice(0,8);
  const topicHits=normalized
    ? topics.filter(topic=>(topic.name+" "+(topic.materials??"")).toLowerCase().includes(normalized)).slice(0,8)
    : [];
  const examHits=normalized
    ? exams.filter(exam=>exam.name.toLowerCase().includes(normalized)).slice(0,8)
    : [];
  const sessionHits=normalized
    ? sessions.filter(session=>[
        session.note??"",
        session.did??"",
        session.unclear??"",
        session.tasks??"",
        session.method??"",
      ].join(" ").toLowerCase().includes(normalized)).slice(0,8)
    : [];
  const destinationHits=destinations.filter(([,label,detail])=>
    !normalized || (label+" "+detail).toLowerCase().includes(normalized)
  );

  function moveFocus(direction:1|-1) {
    const buttons=[...(listRef.current?.querySelectorAll<HTMLButtonElement>("button[data-command-result]")??[])];
    if(!buttons.length)return;
    const index=buttons.indexOf(document.activeElement as HTMLButtonElement);
    const next=index<0
      ? direction===1?0:buttons.length-1
      : (index+direction+buttons.length)%buttons.length;
    buttons[next]?.focus();
  }

  const handleArrowKeys=(event:React.KeyboardEvent)=>{
    if(event.key==="ArrowDown"){
      event.preventDefault();
      moveFocus(1);
    }else if(event.key==="ArrowUp"){
      event.preventDefault();
      moveFocus(-1);
    }
  };

  const hasSearchResults=courseHits.length+topicHits.length+examHits.length+sessionHits.length+destinationHits.length>0;

  return (
    <Dialog title="Haku ja pikatoiminnot" onClose={onClose}>
      <div className="search-panel">
        <input
          autoFocus
          className={input}
          aria-label="Hae"
          placeholder="Hae kurssia, aihetta, opiskelukertaa tai koetta…"
          value={q}
          onChange={event=>setQ(event.target.value)}
          onKeyDown={handleArrowKeys}
        />

        <div ref={listRef} className="search-results mt-4 max-h-[65dvh] overflow-y-auto" onKeyDown={handleArrowKeys}>
          {!normalized&&<section className="search-group" aria-labelledby="search-quick-actions">
            <h3 id="search-quick-actions" className="search-group-title">Pikatoiminnot</h3>
            <button {...commandProps} className="search-result" onClick={onLog}>
              <span><b>Kirjaa opiskelu</b><small className="block">Lisää tehty opiskelukerta jälkikäteen</small></span>
              <span aria-hidden="true">+</span>
            </button>
          </section>}

          {destinationHits.length>0&&<section className="search-group" aria-labelledby="search-destinations">
            <h3 id="search-destinations" className="search-group-title">Näkymät</h3>
            <div>
              {destinationHits.map(([id,label,detail])=><button {...commandProps} key={id} className="search-result" onClick={()=>onNavigate(id)}>
                <span><b>{label}</b><small className="block">{detail}</small></span>
                <span aria-hidden="true">›</span>
              </button>)}
            </div>
          </section>}

          {courseHits.length>0&&<section className="search-group" aria-labelledby="search-courses">
            <h3 id="search-courses" className="search-group-title">Kurssit</h3>
            <div>
              {courseHits.map(course=><button {...commandProps} key={course.id} className="search-result" onClick={()=>onCourse(course.id)}>
                <span><b>{course.code}</b><small className="block">{course.name}</small></span>
                <span aria-hidden="true">›</span>
              </button>)}
            </div>
          </section>}

          {topicHits.length>0&&<section className="search-group" aria-labelledby="search-topics">
            <h3 id="search-topics" className="search-group-title">Aiheet</h3>
            <div>
              {topicHits.map(topic=><button {...commandProps} key={topic.id} className="search-result" onClick={()=>onTopic(topic.course_id,topic.id)}>
                <span><b>{topic.name}</b><small className="block">{courses.find(course=>course.id===topic.course_id)?.code??"Kurssi"} · harjoittele tätä aihetta</small></span>
                <span aria-hidden="true">›</span>
              </button>)}
            </div>
          </section>}

          {examHits.length>0&&<section className="search-group" aria-labelledby="search-exams">
            <h3 id="search-exams" className="search-group-title">Kokeet</h3>
            <div>
              {examHits.map(exam=><button {...commandProps} key={exam.id} className="search-result" onClick={()=>onExam(exam.id)}>
                <span><b>{exam.name}</b><small className="block">{courses.find(course=>course.id===exam.course_id)?.code??"Kurssi"} · {shortDate(exam.date)}</small></span>
                <span aria-hidden="true">›</span>
              </button>)}
            </div>
          </section>}

          {sessionHits.length>0&&<section className="search-group" aria-labelledby="search-history">
            <h3 id="search-history" className="search-group-title">Opiskeluhistoria</h3>
            <div>
              {sessionHits.map(session=><button {...commandProps} key={session.id} className="search-result" onClick={()=>onCourse(session.course_id)}>
                <span className="min-w-0"><b>{shortDate(session.date)} · {courses.find(course=>course.id===session.course_id)?.code??"Opiskelu"}</b><small className="block truncate">{session.note||session.did||session.unclear||session.tasks||"Opiskelukerta"}</small></span>
                <span aria-hidden="true">›</span>
              </button>)}
            </div>
          </section>}

          {normalized&&!hasSearchResults&&<p className="rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground">Ei hakutuloksia. Kokeile kurssikoodia, aiheen nimeä tai kokeen nimeä.</p>}
        </div>
      </div>
    </Dialog>
  );
}
