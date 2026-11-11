import {LOS_VERSION} from './content';
import {germanNumber,numberAnswerAccepted,numberDrillResult,NUMBER_SESSIONS} from './germanNumbers';

type SavedResult={score:number;max:number;at:string;version:string;errors:number[]};
function draftFor(value:unknown):Record<string,string>{
 if(!value||typeof value!=='object'||Array.isArray(value))return {};
 return Object.fromEntries(Object.entries(value).filter((entry):entry is [string,string]=>typeof entry[1]==='string'));
}
function resultFor(value:unknown):SavedResult|null{
 if(!value||typeof value!=='object'||Array.isArray(value))return null;
 const obj=value as Record<string,unknown>;
 if(obj['version']!==LOS_VERSION||typeof obj['score']!=='number'||!Array.isArray(obj['errors']))return null;
 return obj as SavedResult;
}
export function NumberPractice({items,put}:{items:Record<string,unknown>;put:(key:string,value:unknown)=>void}){
 return <section className="los-number-practice">
  <h2>Numerotyöpaja · Zahlen von null bis hundert</h2>
  <p>Kirjoita lukujen saksankieliset sanat. Tämä on LOS!:n oma kirjoitusharjoitus, ei ihmisen ääntä käyttävä kuuntelukoe eikä C06:n puuttuvan alkuperäisen Text A:n korvike.</p>
  <p className="los-meta">Muistisäännöt: <span lang="de">eins → ein</span> yhdysluvussa, <span lang="de">sechzehn</span> ja <span lang="de">siebzehn</span> ilman ylimääräistä vartalon päätettä sekä <span lang="de">dreißig, sechzig, siebzig</span>. Esimerkiksi <span lang="de">einundzwanzig</span> = 21.</p>
  {NUMBER_SESSIONS.map(session=>{
   const draftKey='number:draft:C06:'+session.id;
   const resultKey='number:result:C06:'+session.id;
   const draft=draftFor(items[draftKey]);
   const result=resultFor(items[resultKey]);
   const answered=session.numbers.filter(n=>Boolean(draft[String(n)]?.trim())).length;
   const complete=answered===session.numbers.length;
   const update=(n:number,value:string)=>{
    put(draftKey,{...draft,[String(n)]:value});
    if(result)put(resultKey,null);
   };
   const submit=()=>{
    if(!complete)return;
    const score=numberDrillResult(session.numbers,draft);
    put(resultKey,{score:score.correct,max:score.total,at:new Date().toISOString(),version:LOS_VERSION,errors:score.errors});
   };
   const reset=()=>{
    put(resultKey,null);
    put(draftKey,{});
   };
   return <section className="los-note" key={session.id} aria-labelledby={'los-numbers-'+session.id}>
    <h3 id={'los-numbers-'+session.id}>{session.title}</h3>
    <p className="los-meta" role="status">{answered}/{session.numbers.length} kirjoitettu{result?', tarkistettu '+result.score+'/'+result.max+' oikein.':'.'}</p>
    <div className="los-number-list">
     {session.numbers.map(n=><div key={n} className="los-number-row">
      <label htmlFor={'los-number-'+session.id+'-'+n}><strong>{n}</strong> saksaksi</label>
      <input id={'los-number-'+session.id+'-'+n} lang="de" type="text" spellCheck={false}
       autoComplete="off" autoCapitalize="none" placeholder="Kirjoita saksaksi…"
       value={draft[String(n)]??''} onChange={e=>update(n,e.target.value)}
       aria-describedby={result?'los-number-feedback-'+session.id+'-'+n:undefined}/>
      {result?<p id={'los-number-feedback-'+session.id+'-'+n} className={'los-feedback '+(numberAnswerAccepted(n,draft[String(n)]??'')?'los-correct':'los-incorrect')}>
       {numberAnswerAccepted(n,draft[String(n)]??'')?'Oikein':'Tarkista vielä'}: <span lang="de">{germanNumber(n)}</span>
      </p>:null}
     </div>)}
    </div>
    <div className="los-actions">
     <button type="button" disabled={!complete||Boolean(result)} onClick={submit}>Tarkista kaikki {session.numbers.length} lukua</button>
     <button type="button" className="los-quiet" onClick={reset}>Aloita harjoitus uudelleen</button>
    </div>
    {result?<p className="los-meta">Tarkistuksessa näkyvät kaikki oikeat kirjoitusasut. Voit aloittaa harjoituksen uudelleen, mutta edellinen tarkistettu tulos ei ole C06-kappaletestin suoritus.</p>:null}
   </section>;
  })}
  <p className="los-warning">C06:n itsenäinen, ihmisen kirjoittama ikädialogi ja autenttinen kuunteluaineisto ovat vielä julkaisun tarkistuksessa. Tämä työpaja ei lisää valmista oppituntia eikä kuuntelusuoritusmerkintää.</p>
 </section>;
}
