import {BookOpen,CheckCircle2} from "lucide-react";
import {useLosChapterDraft} from "./studyState";
import {LOS1_CULTURE,type LosCultureChapter} from "./content/los1Culture";
import "./los-culture-questions.css";

const comparison:Record<LosCultureChapter,readonly [string,string,string]>={
 "01":["Moin!","Guten Tag!","Servus!"],
 "02":["Vorname","Herr Weiß","Frau Müller"],
 "03":["Deutschland","Österreich","die Schweiz"],
 "04":["du","Sie","tilanne"],
 "05":["Wie geht's?","Gut, danke.","Und dir?"],
 "06":["Wie alt?","Ich bin ...","Jahre alt"],
 "07":["ä · ö · ü","ß","ae · oe · ue"],
 "08":["Noch einmal","Bitte langsamer","Was bedeutet?"],
 "09":["am Montag","um drei Uhr","Sonntag"],
 "10":["Wie heißt du?","Das ist Leo.","Wie heißen Sie?"],
};

/** Original vector teaching aid and source-attributed comprehension checks. */
export function LosCultureChecks({chapterId}:{chapterId:string}){
 if(!(chapterId in LOS1_CULTURE))return null;
 return <LosCultureChecksContent chapterId={chapterId as LosCultureChapter}/>;
}
function LosCultureChecksContent({chapterId}:{chapterId:LosCultureChapter}){
 const source=LOS1_CULTURE[chapterId];
 const {draft,update,saved}=useLosChapterDraft(1,chapterId);
 const answers=draft.practiceAnswers;
 const checked=draft.practiceChecked;
 const totalChecked=source.questions.filter(q=>checked.includes(q.id)).length;
 const correct=source.questions.filter(q=>checked.includes(q.id)&&answers[q.id]===q.correctId).length;
 const select=(id:string,value:string)=>update(current=>({
  ...current,
  practiceAnswers:{...current.practiceAnswers,[id]:value},
  practiceChecked:current.practiceChecked.filter(existing=>existing!==id),
 }));
 const check=(id:string)=>{
  if(!answers[id])return;
  update(current=>({...current,practiceChecked:Array.from(new Set([...current.practiceChecked,id]))}));
 };
 return <section className="los-culture-exercises" aria-label={"Kappaleen "+chapterId+" kulttuuritieto ja harjoitukset"}>
  <figure className="los-culture-diagram">
   <svg viewBox="0 0 660 115" role="img" aria-label={"Kappaleen "+chapterId+" kolme kulttuuriin liittyvää avainsanaa"} preserveAspectRatio="xMidYMid meet">
    <title>Kolme opittavaa ilmausta rinnakkain</title>
    {comparison[chapterId].map((label,i)=><g key={i} transform={`translate(${8+i*220} 12)`}>
     <rect x="0" y="0" rx="12" width="202" height="82" fill={i===1?"#B7473C":"#F4EFEB"} stroke={i===1?"#B7473C":"#DDD2CC"} strokeWidth="1"/>
     <circle cx="22" cy="21" r="5" fill={i===1?"#FFFFFF":"#B7473C"}/>
     <text x="101" y="49" fill={i===1?"#FFFFFF":"#342D2C"} textAnchor="middle"
      fontSize={label.length>13?13:16} fontWeight="600">{label}</text>
    </g>)}
   </svg>
   <figcaption>LOS!:n oma havainnekuva: vertaile sanojen merkityksiä ja käyttötilanteita. Kuva ei ole autenttisen lähdemedian litteraatti.</figcaption>
  </figure>
  <div className="los-culture-editorial">
   <h2>Kulttuurihuomio ja sen lähde</h2>
   <p>{source.note}</p>
   <p><BookOpen size={15}/> <a href={source.sourceUrl} target="_blank" rel="noopener noreferrer">{source.sourceTitle}</a> · {source.sourceNote}</p>
  </div>
  <h2>Kokeile ymmärtämistä: kolme kysymystä</h2>
  <p>Vastaa oman tietosi perusteella ja tarkista. Kulttuurin ymmärtäminen on muutakin kuin kolmen monivalinnan pisteet; vastaukset ovat vain harjoituksia.</p>
  <div className="los-culture-checklist">{source.questions.map((q,i)=><fieldset key={q.id} className="los-c01-question">
   <legend><span>{i+1}.</span> {q.prompt}</legend>
   <div className="los-c01-options">{q.options.map(option=><label key={option.id}
    className={answers[q.id]===option.id?"is-selected":""}>
    <input type="radio" name={q.id} value={option.id} checked={answers[q.id]===option.id}
     onChange={()=>select(q.id,option.id)}/>
    <span>{option.text}</span>
   </label>)}</div>
   <button type="button" className="los-exercise-check" disabled={!answers[q.id]} onClick={()=>check(q.id)}>Tarkista vastaus</button>
   {checked.includes(q.id)&&<p role="status" className="los-c01-feedback">
    <strong>{answers[q.id]===q.correctId?"Oikein.":"Kokeile uudelleen."}</strong> {q.explanation}
   </p>}
  </fieldset>)}</div>
  <div className="los-c01-understanding-summary">
   <p><CheckCircle2 size={17}/><strong>{totalChecked}/3 tarkistettu</strong> · {correct}/{totalChecked} oikein tarkistetuista.</p>
   <p role="status">{saved?
     "Kulttuuriharjoituksen vastaukset tallentuvat tämän kappaleen luonnokseen ja kirjan JSON-varmuuskopioon.":
     "Tallennus epäonnistui. Kopioi vastaukset talteen ennen sulkemista."}</p>
  </div>
 </section>;
}
