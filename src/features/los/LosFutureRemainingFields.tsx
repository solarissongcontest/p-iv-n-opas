import type {LosFutureRemainingTask,LosFutureRemainingAnswer} from "./content/losFutureRemaining.ts";
import {writeLosFutureRemainingAnswer} from "./content/losFutureRemaining.ts";
import {losFutureWordsEvidenceStatus,type LosFutureWordsEvidenceStatus}
  from "./content/losFutureWordsEvidence.ts";
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
const sourceFeedback:Record<LosFutureWordsEvidenceStatus,string>={
  "word-not-found":"Sanaa ei löydy Text A:sta täsmälleen tässä muodossa. Tarkista sana lähteestä.",
  "excerpt-not-found":"Kopioitua tekstikohtaa ei löydy Text A:sta täsmälleen tässä muodossa.",
  "word-outside-excerpt":"Valitse tekstikohta, jossa valitsemasi sana todella esiintyy.",
  "duplicate-word":"Olet valinnut tämän saman sanan jo aiemmin. Kokeile toista sanaa.",
  located:"Sana ja tekstikohta löytyvät Text A:sta. Suomennos ja merkityspäätelmä on arvioitava itse.",
};
export function LosFutureRemainingFields({task,answer,onChange}:{
  task:LosFutureRemainingTask;answer:LosFutureRemainingAnswer;onChange:(value:string)=>void;
}){
  const sourceStatuses=task.kind==="words"
    ? [0,1,2].map(slot=>losFutureWordsEvidenceStatus(task,answer.answers,slot)):null;
  const readyToRead=task.kind!=="prediction"||
    (Boolean(answer.answers[0]?.trim())&&Boolean(answer.answers[1]?.trim()));
  return <fieldset className="los-future-remaining">
    <legend>{title[task.kind]}</legend>
    {task.kind==="pronunciation"?<p>Hyväksyttyä ääni-, IPA- tai painomallia ei vielä ole.
      Lue alkuperäiset lauseet ääneen kaksi kertaa ja kirjaa omat havaintosi.
      Näistä vastauksista ei päätellä ääntämisen oikeellisuutta.</p>:
      <p>Vastaa ensin itse ja vertaa vasta sitten lähdekäsikirjoituksen itsearviointiohjeeseen.
        Tämä ei ole automaattisesti pisteytettävä koe.</p>}
    {task.kind==="words"&&answer.legacyPromptUpdated&&
      <p className="los-future-remaining-hint" role="status">
        Sanastonvalinnan ohjetta on tarkennettu. Kolme aikaisempaa sanaasi ja
        selityksesi ovat edelleen tallessa. Tarkista, haluatko päivittää valintasi.
      </p>}
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
      {task.kind==="words"&&index%3===1&&sourceStatuses?.[Math.floor(index/3)]&&
        <span className="los-future-remaining-hint" role="status">
          {sourceFeedback[sourceStatuses[Math.floor(index/3)]!]}
        </span>}
    </label>)}
    {task.kind==="summary"&&<p className="los-future-remaining-hint">Kaksi omaa virkettä riittää, kolmas on vapaaehtoinen.
      Vertaa pääasiaa alkuperäiseen tekstiin.</p>}
  </fieldset>;
}
