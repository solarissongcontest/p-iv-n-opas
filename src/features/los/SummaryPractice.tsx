import {LOS_VERSION,allWords,chapters} from './content';
import {FINAL_SKILLS,eligibleSummary,normalizedRatings,type SelfRating} from './summaryModel';
import {createReviewEntry,readReviewEntry} from './reviewSchedule';

const choices:{value:SelfRating;title:string}[]=[
 {value:'harjoittelen',title:'Harjoittelen vielä'},
 {value:'kertaan',title:'Osaan osan, kertaan'},
 {value:'osaan',title:'Osaan jo mallin'}
];
/**
 * A private and honest personal review. Not an official A1 evaluation,
 * and not a shortcut to certify any unreviewed source rights or media.
 */
export function SummaryPractice({items,put}:{items:Record<string,unknown>;put:(key:string,value:unknown)=>void}){
 const ratings=normalizedRatings(items['summary:skills']);
 const rawGoal=items['summary:nextGoal'];
 const goal=typeof rawGoal==='string'?rawGoal:'';
 const submitted=Boolean(items['latest:SUMMARY-CHECK']&&items['latest:SUMMARY-GOAL']);
 const ready=eligibleSummary(ratings,goal);
 const updateSkill=(id:string,value:SelfRating|'')=>{
  const next={...ratings};
  if(value)next[id as keyof typeof ratings]=value;
  else delete next[id as keyof typeof ratings];
  put('summary:skills',next);
  put('latest:SUMMARY-CHECK',null);
  put('latest:SUMMARY-GOAL',null);
 };
 const updateGoal=(text:string)=>{
  put('summary:nextGoal',text);
  put('latest:SUMMARY-CHECK',null);
  put('latest:SUMMARY-GOAL',null);
 };
 const save=()=>{
  if(!ready)return;
  const receipt={version:LOS_VERSION,submittedAt:new Date().toISOString(),type:'self-assessment'};
  put('latest:SUMMARY-CHECK',{...receipt,ratings:{...ratings}});
  put('latest:SUMMARY-GOAL',{...receipt,goal:goal.trim()});
 };
 const activateReviews=()=>{
  if(!submitted)return;
  const candidates=allWords.filter(w=>w.tier==='ydin');
  const seen=new Set<string>();
  const unique=candidates.filter(w=>{
   const key=w.de.normalize('NFC').toLocaleLowerCase('de');
   if(seen.has(key))return false;
   seen.add(key);return true;
  }).slice(0,8);
  for(const w of unique){
   const key='review:'+w.de;
   // Existing cards keep their original interval, including old date-field data.
   if(!readReviewEntry(items[key]))put(key,createReviewEntry());
  }
  put('summary:reviewsActivated',{at:new Date().toISOString(),count:unique.length,version:LOS_VERSION});
 };
 return <section className="los-summary-practice" aria-labelledby="los-skill-summary-heading">
  <h3 id="los-skill-summary-heading">Kymmenen taitoa, oma tilanne</h3>
  <p>Arvioi omaa osaamistasi, älä pelkkiä tehtäväpisteitä. Tähänkään arvioon ei liity virallista kielitaitoluokitusta. Kaikki kymmenen alkuperäistekstikokonaisuutta on nyt tuotu oppikirjaan, mutta tekstien toimituksellinen laadunvarmistus, media, esteettömyys ja synkronoinnin laitetestit ovat yhä kesken.</p>
  <div className="los-skill-list">{FINAL_SKILLS.map(skill=>{
   const source=chapters.find(c=>c.id===skill.id);
   const unavailable=source?.status==='source-pending';
   return <div key={skill.id} className="los-skill-row">
    <label htmlFor={'los-skill-'+skill.id}><strong>{skill.id}</strong> {skill.title}
     {unavailable?<span className="los-meta"> · alkuperäisteksti odottaa lähdettä</span>:null}
     <span className="los-meta" lang="de">{skill.sample}</span>
    </label>
    <select id={'los-skill-'+skill.id} value={ratings[skill.id]??''}
     onChange={e=>updateSkill(skill.id,e.target.value as SelfRating|'')}>
     <option value="">Valitse oma arviosi…</option>
     {choices.map(o=><option value={o.value} key={o.value}>{o.title}</option>)}
    </select>
   </div>;
  })}</div>
  <label htmlFor="los-summary-next-goal"><strong>Seuraava oma oppimistavoite</strong></label>
  <textarea id="los-summary-next-goal" rows={4} value={goal} onChange={e=>updateGoal(e.target.value)}
   placeholder="Seuraavaksi haluan harjoitella lukujen muodostamista ja oppia kertomaan kellonajat ilman mallia."/>
  <p className="los-meta" role="status">{FINAL_SKILLS.filter(s=>ratings[s.id]).length}/10 taitoa arvioitu. Tavoite {goal.trim().length}/20 merkkiä vähintään. {submitted?'Itsearviointi palautettu.':'Itsearvioinnin palautus odottaa.'}</p>
  <div className="los-actions">
   <button type="button" disabled={!ready||submitted} onClick={save}>{submitted?'Itsearviointi tallennettu':'Palauta itsearviointi ja seuraava tavoite'}</button>
   <button type="button" className="los-quiet" disabled={!submitted} onClick={activateReviews}>Aktivoi 8 sanakertauskorttia</button>
  </div>
  {items['summary:reviewsActivated']?<p role="status" className="los-meta">Kertauskortit aktivoitu. Jo olemassa olevien korttien seuraavaa kertausaikaa ei nollattu.</p>:null}
 </section>;
}
