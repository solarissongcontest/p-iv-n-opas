import { useState } from "react";
import { BookOpen, CheckCircle2 } from "lucide-react";
import { useLosChapterDraft } from "./studyState";
import type { LosNavigate } from "./LosReferenceTools";
import {
  LOS1_REVIEW_II_DRAFT_CHAPTER, LOS1_REVIEW_II_GROUPS,
  LOS1_REVIEW_II_WRITING_ID, losReviewIIQuestionsFor, losReviewIIReflectionId,
} from "./content/los1ReviewII";
import { markTeacherHelp, emptyTeacherSession } from "./teacher/engine.ts";
import { LOS1_L058_TEACHER } from "./teacher/lessonL056L060.ts";
import "./los-exams.css";

/** Standalone Review II. Its 15 authored practice items never feed EX-FINAL. */
export function LosReviewII({move}:{move:LosNavigate}){
  const {draft,update,saved}=useLosChapterDraft(1,LOS1_REVIEW_II_DRAFT_CHAPTER);
  const [showModel,setShowModel]=useState(false);
  const answers=draft.practiceAnswers;
  const checked=draft.practiceChecked;
  const change=(id:string,value:string)=>update(current=>({
    ...current,
    practiceAnswers:{...current.practiceAnswers,[id]:value},
    practiceChecked:current.practiceChecked.filter(item=>item!==id),
  }));
  const check=(id:string)=>{
    if(!answers[id])return;
    update(current=>({...current,practiceChecked:Array.from(new Set([...current.practiceChecked,id]))}));
  };
  const markWritingModel=()=>update(current=>{
    const now=new Date().toISOString();
    const before=current.teacherSessions?.["L058"]??emptyTeacherSession(LOS1_L058_TEACHER,now);
    return {...current,teacherSessions:{...current.teacherSessions,
      L058:markTeacherHelp(before,"writing-model",now)}};
  });
  const openSource=(groupId:string)=>{
    if(groupId==="L058")markWritingModel();
    if(groupId==="L056")move("06","vocabulary");
    else if(groupId==="L057")move("09","text");
    else move("10","grammar");
  };
  return <section className="los-inner-page los-exam los-review" aria-label="LOS! 1:n toinen kertausjakso">
    <p className="los-eyebrow">WIEDERHOLEN · KERTAUS II · L056–L058</p>
    <h1>Kertaa ennen loppukoetta</h1>
    <p className="los-page-intro">Kolme noin 30 minuutin kertausta, 15 alkuperäistä LOS!-harjoituskysymystä ja oma esittelyteksti. Nämä eivät ole loppukokeen 50 pisteytettävää tehtävää. Vastauksia saa tarkistaa ja yrittää uudelleen. C08:n ja C10:n vielä puuttuvat alkuperäiset päätekstit eivät muutu valmiiksi tämän kertauksen perusteella.</p>
    <p role="status" className={saved?"los-exam-save":"los-exam-save is-error"}>
      {saved?"Kertaus II tallentuu paikallisesti LOS! 1:n omaan varmuuskopioon (tallennuskohde 92).":
        "Tallennus epäonnistui. Kopioi vastauksesi talteen ennen sivun sulkemista."}
    </p>
    {LOS1_REVIEW_II_GROUPS.map(group=>{
      const questions=losReviewIIQuestionsFor(group.id);
      const reflectionId=losReviewIIReflectionId(group.id);
      const checkedCount=questions.filter(q=>checked.includes(q.id)).length;
      const correctCount=questions.filter(q=>checked.includes(q.id)&&answers[q.id]===q.correctId).length;
      return <section key={group.id} id={"los-review-"+group.id} className="los-exam-section"
        aria-labelledby={"los-review-title-"+group.id}>
        <h2 id={"los-review-title-"+group.id}>{group.title}</h2>
        <p>{group.description}</p>
        <div className="los-review-tools">
          <button type="button" className="los-outline-button" onClick={()=>openSource(group.id)}>
            <BookOpen size={16}/> {group.id==="L056"?"Kertaa C06:n sanastoa":group.id==="L057"?"Avaa C09:n alkuperäisteksti":"Kertaa C10:n kielioppia"}
          </button>
        </div>
        <p className="los-review-progress" role="status">
          <CheckCircle2 size={16}/><strong>{checkedCount}/5 tarkistettu</strong> · {correctCount} oikein tarkistetuista · Oma arvio {answers[reflectionId]?"kirjattu":"puuttuu"}
        </p>
        <ol>{questions.map(item=><li key={item.id} className="los-exam-question">
          <fieldset>
            <legend>{item.prompt}</legend>
            <div className="los-exam-answers">
              {item.answers.map(option=><label key={option.id} className={answers[item.id]===option.id?"is-selected":""}>
                <input type="radio" name={item.id} value={option.id} checked={answers[item.id]===option.id}
                  onChange={()=>change(item.id,option.id)}/><span>{option.text}</span>
              </label>)}
            </div>
          </fieldset>
          <button type="button" className="los-outline-button" disabled={!answers[item.id]} onClick={()=>check(item.id)}>
            Tarkista vastaus
          </button>
          {checked.includes(item.id)&&<p role="status" className={"los-exam-feedback "+(answers[item.id]===item.correctId?"is-correct":"is-incorrect")}>
            <strong>{answers[item.id]===item.correctId?"Oikein.":"Kertaa vielä."}</strong> {item.explanation}
          </p>}
        </li>)}</ol>
        {group.id==="L058"&&<section className="los-exam-speaking" aria-label="Oma esittelyharjoitus">
          <h3>Kirjoita 5–7 lauseen esittely</h3>
          <p>Keksi henkilö, jolla on nimi, lähtömaa, ikä ja kuvitteellinen ystävä. Kirjoita hänestä saksaksi 5–7 lyhyttä lausetta. Voit lopuksi lisätä tervehdyksen ja hyvästelyn. Älä kirjoita oikeita yhteystietoja.</p>
          <label htmlFor="los-review-ii-writing">Oma esittely (itsearvioitava, enintään 500 merkkiä)</label>
          <textarea id="los-review-ii-writing" rows={6} maxLength={500}
            value={answers[LOS1_REVIEW_II_WRITING_ID]??""}
            onChange={e=>change(LOS1_REVIEW_II_WRITING_ID,e.target.value)}
            placeholder="Kirjoita tähän 5–7 omaa lausetta ilman mallia."/>
          <p>Tekstiä ei pisteytetä automaattisesti. Oppituntimerkintä kertoo kirjoitusyrityksestä, ei tarkistetusta kielioppiosaamisesta.</p>
          <button className="los-outline-button" type="button" aria-expanded={showModel}
            onClick={()=>{if(!showModel)markWritingModel();setShowModel(old=>!old);}}>
            {showModel?"Piilota tarkistusmalli":"Näytä tarkistusmalli oman yrityksen jälkeen"}
          </button>
          {draft.teacherSessions?.["L058"]?.helpedIds.includes("writing-model")&&<p role="status">Mallia tai vihjettä on käytetty. Tämä merkitään avustetuksi harjoitteluksi, ei itsenäisesti tarkistetuksi kielioppinäytöksi.</p>}
          {showModel&&<div className="los-exam-rubric">
            <h4>Tarkistuslista ja malliteksti</h4>
            <ul>
              <li>Kirjoitin 5–7 ymmärrettävää lausetta.</li>
              <li>Käytin ich bin / er ist / sie heißt / kommt aus oikein.</li>
              <li>Tarkistin lukusanan ja saksan erikoiskirjaimet.</li>
              <li>En käyttänyt oikeita henkilötietoja.</li>
            </ul>
            <p lang="de">Hallo! Ich heiße Mia. Ich komme aus Finnland. Ich bin siebzehn Jahre alt. Das ist Leo. Er heißt Leo. Er kommt aus Deutschland. Tschüss!</p>
            <p>Malli on LOS!:n itse laatima oppimisesimerkki, ei autenttisena julkaistu lähdeteksti.</p>
          </div>}
        </section>}
        <div className="los-review-reflection">
          <h3>Oma muistamisen arvio</h3>
          <fieldset><legend>Valitse arviosi omasta osaamisestasi (ei konearvosana)</legend>
            {[
              {id:"well",text:"Osasin pääosin ilman mallia."},
              {id:"some",text:"Muistin osan, mutta tarvitsen kertausta."},
              {id:"again",text:"Tarvitsen lisää harjoitusta."},
            ].map(option=><label key={option.id}>
              <input type="radio" name={reflectionId} value={option.id}
                checked={answers[reflectionId]===option.id}
                onChange={()=>change(reflectionId,option.id)}/><span>{option.text}</span>
            </label>)}
          </fieldset>
          <p>Opetuspolun oppitunti tulee suoritetuksi vasta, kun kaikki viisi tehtävää on tarkistettu, oma arvio on kirjattu ja tunnin työvaiheet sekä lopputarkistus on tehty. L058 vaatii lisäksi oman kirjoitusyrityksen.</p>
        </div>
      </section>;
    })}
    <div className="los-exam-submit">
      <h2>Loppukoe on erillinen</h2>
      <p>EX-FINAL edellyttää erikseen tarkistettuja kuuntelu- ja lukuaineistoja. Tämä kertaus ei tuota niistä tekaistua tulosta eikä korvaa loppukoetta.</p>
      <button type="button" className="los-primary" onClick={()=>move(null,"path")}>Takaisin ohjattuun opetuspolkuun</button>
    </div>
  </section>;
}
