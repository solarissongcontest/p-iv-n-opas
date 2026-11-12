import { CheckCircle2, BookOpen } from "lucide-react";
import { useLosChapterDraft } from "./studyState";
import type { LosNavigate } from "./LosReferenceTools";
import { LOS1_REVIEW_I_GROUPS, losReviewIQuestionsFor, losReviewIReflectionId } from "./content/los1ReviewI";
import { LOS1_MIDTERM_DRAFT_CHAPTER } from "./content/los1Exams";
import "./los-exams.css";

/** Practice feedback may be viewed after each explicit check.
 * These checks are not EX-MID attempts, which remain locked until submission.
 */
export function LosReviewI({move}:{move:LosNavigate}){
  const {draft,update,saved}=useLosChapterDraft(1,LOS1_MIDTERM_DRAFT_CHAPTER);
  const answers=draft.practiceAnswers;
  const checked=draft.practiceChecked;
  const change=(id:string,value:string)=>update(current=>({
    ...current,practiceAnswers:{...current.practiceAnswers,[id]:value},
    practiceChecked:current.practiceChecked.filter(item=>item!==id),
  }));
  const check=(id:string)=>{
    if(!answers[id])return;
    update(current=>({...current,practiceChecked:Array.from(new Set([...current.practiceChecked,id]))}));
  };
  return <section className="los-inner-page los-exam los-review" aria-label="LOS! 1:n ensimmäinen kertausjakso">
    <p className="los-eyebrow">WIEDERHOLEN · KERTAUS I · L027–L029</p>
    <h1>Kertaa ennen välikoetta</h1>
    <p className="los-page-intro">Kolme omaan tahtiin tehtävää kertausta, joissa on yhteensä 15 kysymystä. Nämä eivät ole välikokeen 25 pisteytettävää tehtävää. Vastaa muistista, tarkista ja arvioi rehellisesti omaa osaamistasi.</p>
    <p className={saved?"los-exam-save":"los-exam-save is-error"} role="status">{saved?
      "Kertausvastaukset ja itsearvioinnit tallennetaan tähän selaimeen ja LOS! 1:n JSON-varmuuskopioon.":
      "Tallennus epäonnistui. Kopioi vastaukset talteen ennen sivun sulkemista."}</p>
    {LOS1_REVIEW_I_GROUPS.map(group=>{
      const questions=losReviewIQuestionsFor(group.id);
      const reflectionId=losReviewIReflectionId(group.id);
      const checkedCount=questions.filter(q=>checked.includes(q.id)).length;
      return <section className="los-exam-section" key={group.id} id={"los-review-"+group.id} aria-labelledby={"los-review-title-"+group.id}>
        <h2 id={"los-review-title-"+group.id}>{group.title}</h2>
        <p>{group.description}</p>
        <div className="los-review-tools">
          <button type="button" className="los-outline-button" onClick={()=>move(group.sourceChapter,"text")}><BookOpen size={16}/> Avaa alkuperäinen teksti</button>
          {group.id==="L029"&&<p>Alkuperäinen C01:n ihmisen tekemä äänite on oppikirjan Text A -sivulla vapaaehtoisena. Äänen teknistä toimivuutta ei ole vielä laitetestattu; jos ääni ei toimi, käytä koko kirjassa näkyvää alkuperäistekstiä. Tekstin lukemista ei merkitä automaattisesti kuunteluksi.</p>}
        </div>
        <p className="los-review-progress" role="status"><strong>{checkedCount}/5 tarkistettu</strong> · Itsearvio {answers[reflectionId]?"kirjattu":"puuttuu"}</p>
        <ol>{questions.map(q=><li className="los-exam-question" key={q.id}>
          <fieldset>
            <legend>{q.prompt}</legend>
            <div className="los-exam-answers">
              {q.answers.map(option=><label key={option.id} className={answers[q.id]===option.id?"is-selected":""}>
                <input type="radio" name={q.id} value={option.id} checked={answers[q.id]===option.id}
                  onChange={()=>change(q.id,option.id)}/>
                <span>{option.text}</span>
              </label>)}
            </div>
          </fieldset>
          <button type="button" className="los-outline-button" disabled={!answers[q.id]} onClick={()=>check(q.id)}>
            Tarkista vastaus
          </button>
          {checked.includes(q.id)&&<p className={"los-exam-feedback "+(answers[q.id]===q.correctId?"is-correct":"is-incorrect")} role="status">
            <strong>{answers[q.id]===q.correctId?"Oikein.":"Kertaa vielä."}</strong> {q.explanation}
          </p>}
        </li>)}</ol>
        <div className="los-review-reflection">
          <h3>Muistamisen itsearvio</h3>
          <p>Miten osasit tämän kokonaisuuden ilman sanakirjaa? Tämä on oma havaintosi, ei automaattinen arvosana.</p>
          <fieldset>
            <legend>Valitse oma arviosi</legend>
            {[
              {id:"well",text:"Osasin pääosin ilman mallia."},
              {id:"some",text:"Muistin osan, mutta tarvitsen kertausta."},
              {id:"again",text:"Tarvitsen lisää harjoitusta."},
            ].map(item=><label key={item.id}>
              <input type="radio" name={reflectionId} value={item.id} checked={answers[reflectionId]===item.id}
                onChange={()=>change(reflectionId,item.id)}/>
              <span>{item.text}</span>
            </label>)}
          </fieldset>
          <p>Oppitunnin suoritus kirjataan ohjatussa opetuspolussa, kun viisi tehtävää on tarkistettu, oma arvio tehty ja tunnin lopputarkistus palautettu.</p>
        </div>
      </section>;
    })}
    <div className="los-exam-submit">
      <h2>Välikoe on erillinen</h2>
      <p>Kun kertaukset on tehty, voit siirtyä välikokeeseen. Kertaustehtävät eivät täytä välikokeen vastauksia, ja välikokeen oikeat ratkaisut pysyvät piilossa sen palautukseen asti.</p>
      <button className="los-primary" type="button" onClick={()=>move(null,"midterm")}>Avaa välikoe EX-MID</button>
    </div>
  </section>;
}
