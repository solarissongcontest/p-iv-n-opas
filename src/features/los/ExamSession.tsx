import {useState} from 'react';
import {exams,selfAssessment,type ExamId} from './examBank';
import {LOS_VERSION,type Exercise} from './content';
import {gradeExercise} from './engine';
import {useLosStore} from './useLosStore';

type Store=ReturnType<typeof useLosStore>;
const safeNumber=(unknownValue:unknown)=>typeof unknownValue==='number'&&Number.isFinite(unknownValue)?unknownValue:0;
const orderedOptions=(e:Exercise)=> {
 const options=e.options??[];
 const number=Number(e.id.replace(/\D/g,''))||0;
 const rotate=number%options.length||0;
 return options.slice(rotate).concat(options.slice(0,rotate));
};
export function ExamSession({id,store,onExit,onSubmit}:{id:ExamId;store:Store;onExit:()=>void;onSubmit:()=>void}){
 const paper=exams[id];
 const attempt=safeNumber(store.items['exam:no:'+id]);
 const resultKey='exam:result:'+id+':'+attempt;
 const result=store.items[resultKey] as {answers:Record<string,string>;scores:Record<string,boolean>;total:number;max:number;version:string;date:string}|undefined;
 const [page,setPage]=useState(0);
 const [showModel,setShowModel]=useState(false);
 const perPage=10;
 const totalPages=Math.ceil(paper.questions.length/perPage);
 const read=(e:Exercise):string=>{
  const text=store.items['exam:draft:'+id+':'+attempt+':'+e.id];
  return typeof text==='string'?text:'';
 };
 const answer=(e:Exercise,value:string)=>{
  if(result)return;
  store.put('exam:draft:'+id+':'+attempt+':'+e.id,value);
 };
 const count=paper.questions.filter(e=>read(e).trim()).length;
 const submit=()=>{
  const answers=Object.fromEntries(paper.questions.map(q=>[q.id,read(q)]));
  const scores=Object.fromEntries(paper.questions.map(q=>[q.id,gradeExercise(q,answers[q.id]??'').status==='correct']));
  const total=Object.values(scores).filter(Boolean).length;
  store.put(resultKey,{answers,scores,total,max:paper.questions.length,version:LOS_VERSION,date:new Date().toISOString()});
  onSubmit();
 };
 const reset=()=>{
  if(!result)return;
  store.put('exam:no:'+id,attempt+1);
  setPage(0);setShowModel(false);
 };
 return <section className="los-exam" aria-label={paper.title}>
  <span className="los-label">HARJOITUSKOE · {paper.scope} · {paper.questions.length} PISTETTÄ</span>
  <h1>{paper.title}</h1>
  <p>Tehtävät käsittelevät vain kirjan opetettuja alkeita. Koe on alustava: kaikkia lähde-, laite- ja mediasuorituksia ei ole hyväksytty.</p>
  <p>Vastaukset tallennetaan luonnoksiksi. Vihjeitä ja oikeita ratkaisuja ei näytetä ennen koko kokeen palauttamista. Oma kirjoitus tai puhe arvioidaan erikseen.</p>
  {result?<div className="los-exam-result" role="status">
   <h2>Palautettu koe</h2>
   <p><strong>{result.total} / {result.max}</strong> automaattisesti arvioitavaa pistettä ({Math.round(result.total/result.max*100)} %).</p>
   <p>Palautettu {new Date(result.date).toLocaleString('fi-FI')}. Pistettä ei pidä tulkita viralliseksi lukion arvosanaksi.</p>
  </div>:<div className="los-stats"><span>Vastattu <b>{count}/{paper.questions.length}</b></span><span>Sivu <b>{page+1}/{totalPages}</b></span><span>Yritys <b>{attempt+1}</b></span></div>}
  <div className="los-exam-questions">
   {paper.questions.slice(page*perPage,(page+1)*perPage).map((question,offset)=>{
    const response=result?.answers[question.id]??read(question);
    const ordered=response?response.split(' | '):[];
    const remaining=(question.order??[]).filter((word,i)=>ordered.filter(w=>w===word).length<(question.order??[]).filter((w,j)=>w===word&&j<=i).length);
    const checked=result?result.scores[question.id]:undefined;
    return <article className="los-exercise" key={question.id} id={question.id}>
      <span className="los-label">TEHTÄVÄ {page*perPage+offset+1}/{paper.questions.length}</span>
      <h3>{question.prompt}</h3>
      {question.options?<fieldset className="los-options" disabled={Boolean(result)}>
       <legend className="sr-only">Valitse vastaus kysymykseen: {question.prompt}</legend>
       {orderedOptions(question).map(option=><label key={option}>
        <input type="radio" name={question.id} value={option} checked={response===option} onChange={()=>answer(question,option)}/><span>{option}</span>
       </label>)}
      </fieldset>:null}
      {question.type==='fill'||question.type==='translate'?<input lang="de" aria-label={'Vastaus tehtävään '+question.id}
       placeholder="Vastaa tähän…" value={response} disabled={Boolean(result)}
       onChange={e=>answer(question,e.target.value)} autoComplete="off"/>:null}
      {question.type==='ordering'?<div className="los-order">
       <p>Valittu järjestys: <span lang="de">{ordered.join(' ')||'Ei valintoja'}</span></p>
       <div>{remaining.map((word,i)=><button type="button" disabled={Boolean(result)} key={word+i} onClick={()=>answer(question,[...ordered,word].join(' | '))}>{word}</button>)}</div>
       {!result?<button className="los-quiet" onClick={()=>answer(question,'')}>Aloita alusta</button>:null}
      </div>:null}
      {result?<p className={'los-feedback '+(checked?'los-correct':'los-incorrect')} role="status">
       <b>{checked?'Oikein':'Ei oikein'}</b> · {question.explanation}
      </p>:null}
    </article>;
   })}
  </div>
  <nav className="los-exam-pagination" aria-label="Kokeen sivut">
    <button disabled={page===0} className="los-quiet" onClick={()=>setPage(p=>Math.max(0,p-1))}>Edellinen sivu</button>
    {Array.from({length:totalPages},(_,i)=><button key={i} className={page===i?'los-selected-page':''}
      aria-current={page===i?'page':undefined} onClick={()=>setPage(i)}>{i+1}</button>)}
    <button disabled={page===totalPages-1} className="los-quiet" onClick={()=>setPage(p=>Math.min(totalPages-1,p+1))}>Seuraava sivu</button>
  </nav>
  {!result?<div className="los-actions">
   <p>Vastaamatta: {paper.questions.length-count}. Voit palauttaa myös keskeneräisen kokeen. Palautus paljastaa kaikki ratkaisut eikä sitä voi perua.</p>
   <button onClick={submit}>Palauta koko koe ja tarkista {paper.questions.length} tehtävää</button>
  </div>:<div className="los-actions"><button onClick={reset}>Aloita uusi yritys</button><button className="los-quiet" onClick={onExit}>Poistu kokeesta</button></div>}
  <section className="los-exam-self">
   <h2>Oma puhe- ja kirjoitusnäyte (ei automaattipisteitä)</h2>
   <p>{selfAssessment[id].prompt}</p>
   <textarea rows={5} aria-label="Oma kirjoitusnäyte" placeholder="Kirjoita esittely..." value={typeof store.items['exam:self:'+id+':'+attempt]==='string'?store.items['exam:self:'+id+':'+attempt] as string:''}
    onChange={e=>store.put('exam:self:'+id+':'+attempt,e.target.value)}/>
   {result?<><button onClick={()=>setShowModel(!showModel)}>{showModel?'Piilota mallivastaus':'Näytä mallivastaus ja itsearviointi'}</button>
    {showModel?<div className="los-hint"><p lang="de">{selfAssessment[id].model}</p><p>{selfAssessment[id].criteria}</p></div>:null}</>:
    <p className="los-meta">Mallia ei näytetä ennen kokeen palautusta. Itsearviointi ei kasvata eikä vähennä koepisteitä.</p>}
  </section>
 </section>;
}
