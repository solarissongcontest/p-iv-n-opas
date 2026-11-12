import {BookOpen,CheckCircle2} from "lucide-react";
import {LosAuthenticAudio} from "./LosReferenceTools";
import {LosOriginalDialogue} from "./LosOriginalDialogue";
import {useLosChapterDraft} from "./studyState";
import {LOS1_TEXT_B_SOURCES,isLosTextBChapter} from "./content/los1TextBAdditional";

/**
 * Text B uses a REAL source, complete original transcript (when documented),
 * publisher-sourced audio and exactly four independently written checks.
 * Correct answers can be obtained by reading; no fictitious listening score.
 */
export function LosAdditionalTextB({chapterId}:{chapterId:string}){
 if(!isLosTextBChapter(chapterId))return null;
 return <LosAdditionalTextBContent chapterId={chapterId}/>;
}
function LosAdditionalTextBContent({chapterId}:{chapterId:"04"|"06"|"07"|"10"}){
 const source=LOS1_TEXT_B_SOURCES[chapterId];
 const {draft,update,saved}=useLosChapterDraft(1,chapterId);
 const checked=draft.practiceChecked;
 const answers=draft.practiceAnswers;
 const count=source.questions.filter(item=>checked.includes(item.id)).length;
 const correct=source.questions.filter(item=>checked.includes(item.id)&&answers[item.id]===item.correctId).length;
 const change=(id:string,value:string)=>update(current=>({
  ...current,practiceAnswers:{...current.practiceAnswers,[id]:value},
  practiceChecked:current.practiceChecked.filter(q=>q!==id),
 }));
 const check=(id:string)=>{
  if(!answers[id])return;
  update(current=>({...current,practiceChecked:Array.from(new Set([...current.practiceChecked,id]))}));
 };
 return <div className="los-secondary-source" aria-label={"C"+chapterId+" toinen alkuperäinen lähde"}>
  <p>{source.summary}</p>
  <LosAuthenticAudio chapterId={chapterId} source="B"/>
  {source.transcriptIsExact&&source.lines.length>0?
   <LosOriginalDialogue
    chapterId={chapterId} sourceId={source.sourceId} version="1.0.0"
    lines={source.lines} glossary={source.glossary}
    heading={source.title} usageLabel="ORIGINALTEXT · TEXT B"
    guidance="Lue koko autenttinen teksti tässä oppikirjassa. Kokeile ensin ymmärtää ilman sanaselityksiä. Äänitteen toimivuutta ei ole vielä testattu oikealla laitteella."
    author={source.attribution.author} sourceTitle={source.attribution.title}
    sourceUrl={source.attribution.url} license={source.attribution.license}
    licenseUrl={source.attribution.licenseUrl}
    sourceDetail="Alkuperäinen lähde on luettu kokonaisena, ei tekoälyn kirjoittama mallidialogi. Tämä lähde esiintyy myös toisessa LOS!:n kappaleessa mutta uudella oppimistavoitteella."
   />:
   <section className="los-editorial-note" aria-label="Aakkosten oppijan oma harjoittelulista">
    <h2>Kirjainrivi lausunnan tueksi</h2>
    <p lang="de">A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</p>
    <p lang="de">Ä Ö Ü ß</p>
    <p>Tämä on LOS!:n laatima kirjoitusasujen muistilista, <strong>ei</strong> äänitteen sanatarkka transkriptio. Kuuntele koko alkuperäinen aakkosäänite, jos toisto toimii, ja vertaa kirjainasujen lausumista. Äänitteen avaaminen ei yksin tarkoita, että ääntämisesi olisi tarkistettu.</p>
   </section>}
  <section className="los-c01-questions" aria-label={"Kappaleen "+chapterId+" Text B -tehtävät"}>
   <h2>Tarkista neljä lähde- tai kirjainharjoitusta</h2>
   <p>Vastaa ensin itse ja paina Tarkista vastaus jokaisessa tehtävässä. Nämä tehtävät voi tehdä myös luetun tekstin perusteella; niitä ei saa tulkita todistetuksi kuullunymmärtämiseksi. Oikeat vastaukset ja perustelut näytetään vasta tarkistuksessa.</p>
   {source.questions.map((item,i)=><fieldset key={item.id} className="los-c01-question">
    <legend><span>{i+1}.</span> {item.prompt}</legend>
    <div className="los-c01-options">{item.options.map(option=><label key={option.id}
     className={answers[item.id]===option.id?"is-selected":""}>
      <input type="radio" name={item.id} value={option.id}
       checked={answers[item.id]===option.id} onChange={()=>change(item.id,option.id)}/>
      <span>{option.text}</span>
     </label>)}</div>
    <button className="los-exercise-check" type="button" disabled={!answers[item.id]} onClick={()=>check(item.id)}>
     Tarkista vastaus
    </button>
    {checked.includes(item.id)&&<p role="status" className="los-c01-feedback">
     <strong>{answers[item.id]===item.correctId?"Oikein.":"Kokeile vielä."}</strong> {item.explanation}
    </p>}
   </fieldset>)}
   <div className="los-c01-understanding-summary">
    <p><CheckCircle2 size={18}/><strong>{count}/4 tarkistettu</strong> · {correct}/{count} oikein tarkistetuista</p>
    <p role="status">{saved?"Vastaukset ovat paikallisessa luonnoksessa ja mukana LOS!:n JSON-varmuuskopiossa.":
     "Tallennus epäonnistui. Kopioi vastauksesi talteen ennen sivun sulkemista."}</p>
    <p><BookOpen size={16}/> Lähde: <a href={source.attribution.url} target="_blank" rel="noopener noreferrer">
     {source.attribution.title}</a> · {source.attribution.author} · <a href={source.attribution.licenseUrl} target="_blank" rel="noopener noreferrer">
     {source.attribution.license}</a>. Lähdelinkki on attribuutio, ei varsinainen lukutehtävä.</p>
   </div>
  </section>
 </div>;
}
