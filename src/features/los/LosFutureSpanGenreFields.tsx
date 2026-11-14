import type {LosFutureSpanGenreTask,LosFutureSpanGenreAnswer} from "./content/losFutureSpanGenre.ts";
import {losFutureExcerptInTurn,writeLosFutureSpanGenreAnswer} from "./content/losFutureSpanGenre.ts";
import "./los-future-span-genre.css";

/** Manuscript source is rendered directly; saved answers never include a key. */
export function LosFutureSpanGenreFields({task,answer,onChange}:{
  task:LosFutureSpanGenreTask;answer:LosFutureSpanGenreAnswer;onChange:(raw:string)=>void;
}){
  const found=task.kind==="span"&&losFutureExcerptInTurn(task,answer);
  function update(index:number,value:string){
    const answers=[...answer.answers];answers[index]=value;
    onChange(writeLosFutureSpanGenreAnswer(task,answer.selection,answers));
  }
  return <fieldset className="los-future-span-genre">
    <legend>{task.kind==="span"?"Valitse ja perustele täsmällinen tekstinäyttö":"Vertaa tukidialogia ja Text B:tä"}</legend>
    <p>Kirjoita molemmat vastaukset itse ennen mallivastauksen avaamista.
      Tämä on lähdetekstiin perustuva harjoitus, ei automaattinen arvosana.</p>
    {answer.legacyPromptUpdated&&<p className="los-future-span-genre-hint" role="status">
      {task.kind==="span"?"Kysymystä on tarkennettu lähdedialogin perusteella.":"Tekstilajin nimitys ja tehtävänanto on tarkennettu."}
      {" "}Vanha vastauksesi on säilytetty. Tarkista, että omat havainnot ja perustelut sopivat tehtävänantoon.
    </p>}
    {task.kind==="span"?<fieldset className="los-future-span-genre-choices">
      <legend>Valitse lähdedialogista puheenvuoro</legend>
      {task.dialogue.map((line,index)=>{
        const excerpt=answer.selection===index?(answer.answers[0]?.trim()??""):"";
        const at=excerpt?line.toLocaleLowerCase("de").indexOf(excerpt.toLocaleLowerCase("de")):-1;
        return <label key={index}>
          <input type="radio" name={"los-span-"+task.id}
            checked={answer.selection===index}
            onChange={()=>onChange(writeLosFutureSpanGenreAnswer(task,index,answer.answers))}/>
          <span lang="de">{at>=0?<>{line.slice(0,at)}<mark>{line.slice(at,at+excerpt.length)}</mark>{line.slice(at+excerpt.length)}</>:line}</span>
        </label>;
      })}
    </fieldset>:<>
      <div className="los-future-span-genre-source">
        <strong>Tukidialogi</strong>
        <blockquote lang="de">{task.dialogue.join("\n")}</blockquote>
      </div>
      <div className="los-future-span-genre-source">
        <strong>Text B</strong>
        <blockquote lang="de">{task.textB}</blockquote>
      </div>
    </>}
    {task.questions.map((question,index)=><label className="los-future-span-genre-row" key={index}>
      <span>{index+1}. {question}</span>
      <textarea rows={index===1?3:2} maxLength={500} spellCheck={false} autoComplete="off"
        lang={task.kind==="span"&&index===0?"de":"fi"} aria-label={question}
        value={answer.answers[index]??""} onChange={e=>update(index,e.target.value)}/>
    </label>)}
    {task.kind==="span"&&answer.selection!==null&&answer.answers[0]?.trim()&&
      <p className="los-future-span-genre-hint" role="status">
        {found?"Ilmaus löytyy valitusta puheenvuorosta. Arvioi itse sen merkitys.":
          "Ilmaus ei löydy valitusta puheenvuorosta täsmälleen näin. Tarkista lähde."}
      </p>}
  </fieldset>;
}
