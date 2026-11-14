import type {LosFutureRemainingTask,LosFutureRemainingAnswer} from "./content/losFutureRemaining.ts";
import {writeLosFutureRemainingAnswer} from "./content/losFutureRemaining.ts";
import "./los-future-remaining.css";

const title:Record<LosFutureRemainingTask["kind"],string>={
  prediction:"Ennakoi ensin, lue vasta sitten",
  pronunciation:"Harjoittele lausepainoa ääneen ilman konearvosanaa",
  question:"Muodosta oma kysymys",
  transform:"Muuta yksi tieto mallilauseessa",
  writing:"Kirjoita, tarkista ja korjaa oma teksti",
  words:"Kolme sanaa alkuperäisessä sanayhteydessä",
  summary:"Tiivistä Text A kahteen tai kolmeen virkkeeseen",
};
export function LosFutureRemainingFields({task,answer,onChange}:{
  task:LosFutureRemainingTask;answer:LosFutureRemainingAnswer;onChange:(value:string)=>void;
}){
  const readyToRead=task.kind!=="prediction"||
    (Boolean(answer.answers[0]?.trim())&&Boolean(answer.answers[1]?.trim()));
  return <fieldset className="los-future-remaining">
    <legend>{title[task.kind]}</legend>
    {task.kind==="pronunciation"?<p>Hyväksyttyä ääni-, IPA- tai painomallia ei vielä ole.
      Lue alkuperäiset lauseet ääneen kaksi kertaa ja kirjaa omat havaintosi.
      Näistä vastauksista ei päätellä ääntämisen oikeellisuutta.</p>:
      <p>Vastaa ensin itse ja vertaa vasta sitten lähdekäsikirjoituksen itsearviointiohjeeseen.
        Tämä ei ole automaattisesti pisteytettävä koe.</p>}
    {task.kind==="prediction"&&task.intro&&<>
      <strong>Kappaleen tilannekuvaus</strong>
      <p className="los-future-remaining-intro">{task.intro}</p>
    </>}
    {task.sourceText&&<div className="los-future-remaining-source">
      {readyToRead?<details open={task.kind==="words"||task.kind==="summary"}>
        <summary>{task.sourceTitle}</summary>
        <blockquote lang={task.kind==="writing"?"fi":"de"}>{task.sourceText}</blockquote>
      </details>:<p role="status">Text A avautuu tähän, kun kirjoitat kaksi erilaista ennustusta.</p>}
    </div>}
    {task.fields.map((field,index)=><label key={index} className="los-future-remaining-row">
      <span>{index+1}. {field.label}{field.optional?" (valinnainen)":""}</span>
      <textarea rows={field.rows} maxLength={field.max} spellCheck={false} autoComplete="off"
        lang={field.lang} disabled={task.kind==="prediction"&&index===2&&!readyToRead}
        aria-label={field.label} value={answer.answers[index]??""}
        onChange={e=>{
          const answers=[...answer.answers];answers[index]=e.target.value;
          onChange(writeLosFutureRemainingAnswer(task,answers));
        }}/>
    </label>)}
    {task.kind==="summary"&&<p className="los-future-remaining-hint">Kaksi omaa virkettä riittää, kolmas on vapaaehtoinen.
      Vertaa pääasiaa alkuperäiseen tekstiin.</p>}
  </fieldset>;
}
