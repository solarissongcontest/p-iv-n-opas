import { isCorrectCalendarEntry, type TeacherScene } from "./engine.ts";
import "./teacher-calendar.css";

const DAYS = [
  ["Montag","maanantai"],["Dienstag","tiistai"],["Mittwoch","keskiviikko"],
  ["Donnerstag","torstai"],["Freitag","perjantai"],["Samstag","lauantai"],["Sonntag","sunnuntai"],
] as const;
const HOURS = ["09:00","10:00","12:00","14:00","15:00","16:00","17:00","18:00","19:00"] as const;

/** Accessible interactive weekly calendar; only explicit student selections are saved. */
export function TeacherTimeCalendar({scene,value,onChange,disabled}:{
  scene:TeacherScene; value:string; onChange:(value:string)=>void; disabled:boolean;
}) {
  const prompt=scene.calendar;
  if (!prompt) return null;
  const [day,time] = value.split("|");
  const complete=Boolean(day && time);
  const correct=isCorrectCalendarEntry(scene,value);
  return <section className="los-teacher-calendar" aria-label="Harjoitusviikkokalenteri">
    <h3>{prompt.prompt}</h3>
    <p>{prompt.sourceNote}</p>
    <fieldset disabled={disabled}>
      <legend>1. Valitse viikonpäivä</legend>
      <div className="los-teacher-calendar-days">
        {DAYS.map(([name,fi])=><button key={name} type="button"
          aria-pressed={day===name}
          className={day===name?"is-selected":""}
          onClick={()=>onChange(name+"|"+(time||""))}>
          <strong lang="de">{name}</strong><small>{fi}</small>
        </button>)}
      </div>
      <label htmlFor={"los-teacher-calendar-time-"+scene.id}>2. Valitse kellonaika</label>
      <select id={"los-teacher-calendar-time-"+scene.id} value={time||""}
        onChange={event=>onChange((day||"")+"|"+event.target.value)}>
        <option value="">Valitse kellonaika</option>
        {HOURS.map(hour=><option key={hour} value={hour}>{hour}</option>)}
      </select>
    </fieldset>
    {complete && <p className={correct?"los-teacher-calendar-good":"los-teacher-calendar-retry"} role="status">
      {correct?"Oikein! Kalenterimerkintä on "+day+" "+time+". Vahvista se seuraavaksi.":
      "Päivä tai kellonaika ei vastaa annettua tilannetta. Tarkista saksankielinen päivä ja kello."}
    </p>}
    <p className="los-teacher-calendar-saved">Oma valintasi tallentuu tähän oppituntiin. Se ei tarkoita, että olisit kuunnellut äänitteen.</p>
  </section>;
}
