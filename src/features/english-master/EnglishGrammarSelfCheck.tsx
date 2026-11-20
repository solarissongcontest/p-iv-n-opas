import {useEffect,useMemo,useState} from "react";
import {CheckCircle2,RotateCcw} from "lucide-react";
import {
  GRAMMAR_SELF_CHECKS,grammarSelfCheckStorageKey,gradeGrammarSelfCheck,
} from "./englishGrammarSelfChecks.ts";
import "./english-grammar-selfchecks.css";

type SavedPractice={schema:1;selected:(number|null)[];checked:boolean};
const EMPTY:(number|null)[]=[null,null];

function checkedSelections(value:unknown,n:number):(number|null)[]|null{
  if(!Array.isArray(value)||value.length!==n)return null;
  if(!value.every(item=>item===null||(Number.isInteger(item)&&item>=0&&item<3)))return null;
  return value as (number|null)[];
}

/** These native textbook practice items do not complete Teacher 2.0 lessons.
 * Persist only the learner's explicit selections within their local owner ID.
 * No answer is submitted to any server.
 */
export function EnglishGrammarSelfCheck({sectionId,owner}:{
  sectionId:string;owner:string|null|undefined;
}){
  const items=GRAMMAR_SELF_CHECKS[sectionId];
  const key=owner?grammarSelfCheckStorageKey(owner,sectionId):null;
  const [selected,setSelected]=useState<(number|null)[]>(EMPTY);
  const [checked,setChecked]=useState(false);

  useEffect(()=>{
    const blank=Array.from({length:items?.length??2},()=>null);
    if(!items||!key){setSelected(blank);setChecked(false);return;}
    try{
      const raw=localStorage.getItem(key);
      if(raw){
        const data=JSON.parse(raw) as Partial<SavedPractice>;
        const valid=checkedSelections(data.selected,items.length);
        if(data.schema===1&&valid&&typeof data.checked==="boolean"){
          setSelected(valid);
          setChecked(data.checked&&valid.every(x=>x!==null));
          return;
        }
      }
    }catch{/* private browsing and malformed stored values must not prevent studying */}
    setSelected(blank);
    setChecked(false);
  },[key,items,sectionId]);

  const result=useMemo(()=>items?gradeGrammarSelfCheck(items,selected):null,[items,selected]);
  if(!items)return null;

  const save=(choices:(number|null)[],isChecked:boolean)=>{
    setSelected(choices);
    setChecked(isChecked);
    if(!key)return;
    try{
      const state:SavedPractice={schema:1,selected:choices,checked:isChecked};
      localStorage.setItem(key,JSON.stringify(state));
    }catch{/* studying remains possible when storage is unavailable */}
  };

  const canCheck=Boolean(result&&result.answered===items.length);
  const allCorrect=checked&&result?.correct===items.length;

  return <section className="em-grammar-practice" aria-label={"Osion "+sectionId+" itsearviointi"}>
    <div className="em-grammar-practice-intro">
      <span className="em-overline">KERTAUS · {sectionId}</span>
      <h3>Tarkista, ymmärsitkö</h3>
      <p>Vastaa kahteen uuteen soveltavaan kysymykseen. Tarkistus antaa perustelut, mutta tämä itsearviointi ei merkitse oppituntia suoritetuksi.</p>
    </div>
    <div className="em-grammar-practice-items">
      {items.map(([question,choices,correct,reason],index)=><fieldset className="em-grammar-question" key={sectionId+"-"+index}>
        <legend><span>{index+1}.</span> {question}</legend>
        <div className="em-grammar-options">
          {choices.map((choice,choiceIndex)=>{
            const chosen=selected[index]===choiceIndex;
            const answerShown=checked&&choiceIndex===correct;
            const wrongChosen=checked&&chosen&&choiceIndex!==correct;
            return <label className={answerShown?"is-correct":wrongChosen?"is-incorrect":chosen?"is-selected":""}
              key={choiceIndex}>
              <input type="radio" name={"em-grammar-"+sectionId+"-"+index}
                checked={chosen} disabled={checked}
                onChange={()=>{const next=[...selected];next[index]=choiceIndex;save(next,false);}}/>
              <span lang="en">{choice}</span>
            </label>;
          })}
        </div>
        {checked&&<p className={selected[index]===correct?"em-grammar-answer-correct":"em-grammar-answer-review"}>
          <strong>{selected[index]===correct?"Oikein.":"Tarkista tämä kohta."}</strong> {reason}
        </p>}
      </fieldset>)}
    </div>
    <div className="em-grammar-practice-footer">
      {!checked?<button className="los-primary" type="button" disabled={!canCheck}
        onClick={()=>save(selected,true)}>Tarkista vastaukset</button>:
        <button className="em-grammar-retry" type="button"
          onClick={()=>save(Array.from({length:items.length},()=>null),false)}>
          <RotateCcw size={16}/> Harjoittele uudelleen
        </button>}
      <p aria-live="polite" role="status">
        {checked?<><CheckCircle2 size={16} aria-hidden="true"/>
          {result?.correct}/{items.length} oikein. {allCorrect?"Hyvä, tarkista seuraavaksi pystytkö soveltamaan taitoa uudessa tilanteessa.":"Lue perustelut ja kokeile uudelleen."}</>:
          String(result?.answered??0)+"/"+items.length+" vastausta valittu"}
      </p>
    </div>
    <p className="em-grammar-practice-note">Vastaukset tallentuvat vain tämän laitteen paikalliseen tallennustilaan ja omaan käyttäjäprofiiliin. Opetuspolun osaamisnäyttöä ei myönnetä tässä.</p>
  </section>;
}
