import type {ChangeEvent} from 'react';
import {LOS_VERSION} from './content';

import {WEEK_DAYS,TIME_OPTIONS,getWeeklyPlan,completedWeek} from './weekCalendarModel';

/** Editorial, fictional times. The authentic 15-second recording lists
 * the days, not these appointments. Never score it as listening comprehension.
 */
export function WeekCalendarPractice({items,put}:{items:Record<string,unknown>;put:(key:string,value:unknown)=>void}){
 const plan=getWeeklyPlan(items['calendar:C09']);
 const complete=completedWeek(plan);
 const submitted=Boolean(items['latest:C09-SCHEDULE']);
 const onChange=(day:string)=>(event:ChangeEvent<HTMLSelectElement>)=>{
  const updated={...plan,[day]:event.target.value};
  put('calendar:C09',updated);
  put('latest:C09-SCHEDULE',null);
 };
 const clear=()=>{
  put('calendar:C09',{});
  put('latest:C09-SCHEDULE',null);
 };
 return <section className="los-calendar" aria-labelledby="los-week-calendar-title">
  <h3 id="los-week-calendar-title">Kuvitteellisen henkilön esimerkkiviikko</h3>
  <p>Valitse jokaiselle seitsemälle päivälle jokin opetelluista ajoista. Tämä on <b>oma kalenteriharjoitus</b>, eikä alkuperäisessä viikonpäivien äänitteessä luetella kellonaikoja.</p>
  <div className="los-week-grid">
   {WEEK_DAYS.map(day=><div key={day.de} className="los-week-day">
    <label htmlFor={'los-week-'+day.de}><span lang="de">{day.de}</span><small>{day.fi}</small></label>
    <select id={'los-week-'+day.de} aria-label={'Kuvitteellinen tapaamisaika '+day.fi} value={plan[day.de]??''}
     onChange={onChange(day.de)}>
      <option value="">Valitse kellonaika…</option>
      {TIME_OPTIONS.map(time=><option key={time} value={time}>{time}</option>)}
    </select>
    <span lang="de" className="los-week-preview">{plan[day.de]?'Am '+day.de+' '+plan[day.de]+'.':'Ei vielä merkintää'}</span>
   </div>)}
  </div>
  <p className="los-meta" role="status">{WEEK_DAYS.filter(day=>plan[day.de]).length}/7 päivän merkinnät täytetty. {submitted?'Kalenteriharjoitus palautettu.':'Voit muuttaa aikoja ennen palautusta.'}</p>
  <div className="los-actions">
   <button type="button" disabled={!complete||submitted} onClick={()=>put('latest:C09-SCHEDULE',{
    grade:'self-review',version:LOS_VERSION,at:new Date().toISOString(),source:'editorial-calendar',answer:{...plan}
   })}>{submitted?'Harjoitus palautettu':'Palauta seitsemän päivän kalenteri'}</button>
   <button type="button" className="los-quiet" onClick={clear}>Tyhjennä merkinnät</button>
  </div>
  <p className="los-meta">Kalenteriin ei kirjoiteta omaa kouluaikatauluasi eikä oikeita tapaamistietoja. Sanamalli: <span lang="de">Am Montag um drei Uhr.</span></p>
 </section>;
}
