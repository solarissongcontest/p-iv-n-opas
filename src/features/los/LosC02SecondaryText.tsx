import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { LosOriginalDialogue } from "./LosOriginalDialogue";
import { LosAuthenticAudio } from "./LosReferenceTools";
import { useLosChapterDraft } from "./studyState";
import {
  LOS1_M_COM_02_ID, LOS1_M_COM_02_VERSION, LOS1_M_COM_02_LINES,
  LOS1_M_COM_02_GLOSS, LOS1_M_COM_02_QUESTIONS,
} from "./content/los1MCom02";

export function LosC02SecondaryText({ chapterId }: {chapterId:"02"|"03"}) {
  return <div className="los-secondary-source">
    <p>Kuuntele Thomasin ja Takashin noin 12 sekunnin alkuperäinen neljän repliikin keskustelu. Sen kaikki neljä repliikkiä ovat myös luettavissa alla, eivät ulkoisen linkin takana. Äänitteen tekninen toimivuus ei ole vielä läpäissyt laitetestejä.</p>
    <LosAuthenticAudio chapterId={chapterId} source="B"/>
    <LosOriginalDialogue
      chapterId={chapterId}
      sourceId={LOS1_M_COM_02_ID}
      version={LOS1_M_COM_02_VERSION}
      lines={LOS1_M_COM_02_LINES}
      glossary={LOS1_M_COM_02_GLOSS}
      heading="Thomas, Takashi ja Peter"
      guidance="Kuuntele ihmisten esittämää lyhyttä keskustelua ja lue kaikki neljä alkuperäistä puheenvuoroa. Yritä ensin ilman käännöstä. Alkuperän ilmaisut ovat C02:ssa tunnistustasoa ja tulevat aktiivisesti C03:ssa."
      author="Ariser (2011)"
      sourceTitle="Deutsch Dialog . Ich bin Peter.ogg, Wikimedia Commons"
      sourceUrl="https://commons.wikimedia.org/wiki/File:Deutsch_Dialog_._Ich_bin_Peter.ogg"
      license="CC BY-SA 3.0"
      licenseUrl="https://creativecommons.org/licenses/by-sa/3.0/"
      sourceDetail="Neljä repliikkiä on säilytetty muuttamattomina. Lähde on lisensoitu Commonsin tiedostosivulla. Ogg-tiedosto toistetaan ulkoiselta palvelimelta, eikä toistoa ole vielä varmennettu iPhonessa."
    />
    <LosC02SecondaryQuestions chapterId={chapterId}/>
  </div>;
}
function LosC02SecondaryQuestions({chapterId}:{chapterId:"02"|"03"}) {
  const {draft,update,saved}=useLosChapterDraft(1,chapterId);
  const [translations,setTranslations]=useState(false);
  const answers=draft.practiceAnswers;
  const checked=draft.practiceChecked;
  const done=LOS1_M_COM_02_QUESTIONS.filter(q=>checked.includes(idFor(chapterId,q.id))).length;
  const correct=LOS1_M_COM_02_QUESTIONS.filter(q=>checked.includes(idFor(chapterId,q.id))&&answers[idFor(chapterId,q.id)]===q.correctId).length;
  const save=(id:string,value:string)=>update(old=>({...old,
    practiceAnswers:{...old.practiceAnswers,[id]:value},
    practiceChecked:old.practiceChecked.filter(x=>x!==id),
  }));
  const check=(id:string)=>update(old=>({...old,practiceChecked:Array.from(new Set([...old.practiceChecked,id]))}));
  return <section className="los-c01-questions" aria-label="Alkuperäisen lisäkuuntelun kysymykset">
    <h2>Ymmärsitkö keskustelun?</h2>
    <p>Vastaa tekstin ja mahdollisen kuuntelun perusteella. Lähteen alkuperäistä ääntä ei ole sidottu automaattiseen pisteytykseen: jos ääni ei toimi, voit tehdä samat tehtävät tekstistä.</p>
    {LOS1_M_COM_02_QUESTIONS.map((q,index)=>{
      const id=idFor(chapterId,q.id);
      return <fieldset key={id} className="los-c01-question">
        <legend><span>{index+1}.</span> {q.question}</legend>
        <div className="los-c01-options">
          {q.options.map(option=><label key={option.id} className={answers[id]===option.id?"is-selected":""}>
            <input type="radio" name={id} value={option.id} checked={answers[id]===option.id}
              onChange={()=>save(id,option.id)}/><span>{option.text}</span>
          </label>)}
        </div>
        <button type="button" className="los-exercise-check" disabled={!answers[id]} onClick={()=>check(id)}>Tarkista vastaus</button>
        {checked.includes(id)&&<p className="los-c01-feedback" role="status">
          <strong>{answers[id]===q.correctId?"Oikein.":"Ei aivan."}</strong> {q.feedback}
        </p>}
      </fieldset>;
    })}
    <div className="los-c01-understanding-summary">
      <p><CheckCircle2 size={18}/> <strong>{done}/4 tarkistettu</strong> · {correct}/{done} oikein</p>
      <button type="button" className="los-outline-button" aria-pressed={translations} onClick={()=>setTranslations(x=>!x)}>
        {translations?"Piilota suomennos":"Näytä koko dialogin suomennos"}
      </button>
      {translations&&<ol className="los-c01-translations">
        {LOS1_M_COM_02_LINES.map(line=><li key={line.id}><strong>{line.speaker}:</strong> {line.meaning}</li>)}
      </ol>}
      <p className="los-c01-saved" role="status">{saved?"Vastaukset on tallennettu kappaleen omaan paikalliseen varmuuskopioitavaan tilaan.":"Tallennus ei onnistunut. Kopioi vastaukset talteen."}</p>
    </div>
  </section>;
}
function idFor(chapterId:"02"|"03",questionId:string):string {
  return chapterId==="02"?questionId:questionId.replace(/^C02/,"C03");
}
