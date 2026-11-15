import {useState} from "react";
import {BookOpen,CheckCircle2,Headphones,RotateCcw} from "lucide-react";
import {useLosChapterDraft} from "./studyState";
import {LosVoicePractice} from "./LosVoicePractice";
import type {LosNavigate} from "./LosReferenceTools";
import {LOS1_C06_TEXT,LOS1_C08_TEXT,LOS1_C10_TEXT} from "./content/los1OpenDialogues";
import {
 LOS1_FINAL_DRAFT_CHAPTER,LOS1_FINAL_AUDIO_SOURCES,LOS1_FINAL_QUESTIONS,
 LOS1_FINAL_SECTION_TITLES,LOS1_FINAL_WRITING_CHECK,LOS1_FINAL_VOICE_CHECK,
 LOS1_FINAL_WRITING_MODEL_OPENED,LOS1_FINAL_WRITING_ASSISTED,
 LOS1_SUMMARY_GOAL,LOS1_SUMMARY_CARDS,LOS1_SUMMARY_REFLECTION,
 losFinalReadyToSubmit,losFinalScore,losValidSubmittedFinal,losFinalAudioPlayed,type LosFinalSection,
} from "./content/los1FinalExam";
import {losArchiveExamAttempt,losArchivedExamHistory} from "./content/los1ExamArchive";
import { LosMasterySummary } from "./LosMasterySummary.tsx";
import { losCountReviewedWords } from "./losReviewedWords.ts";
import "./los-exams.css";

const sections=Object.keys(LOS1_FINAL_SECTION_TITLES) as LosFinalSection[];
const readingSources=[LOS1_C06_TEXT,LOS1_C08_TEXT,LOS1_C10_TEXT] as const;
const audioEvidence=(id:string)=>"EX-FINAL-AUDIO-"+id;
const sourceLabel=(id:string)=>LOS1_FINAL_AUDIO_SOURCES.find(s=>s.id===id)?.title??id;
const selfRatings=[
 {id:"well",label:"Pystyin tekemään melko itsenäisesti."},
 {id:"some",label:"Tarvitsin hieman mallia tai kertausta."},
 {id:"again",label:"Harjoittelen tämän vielä uudelleen."},
] as const;
const writingLineCount=(text:string)=>text.split(/\n/).map(line=>line.trim()).filter(Boolean).length;

/**
 * A real 50-point final with authenticated-source playback gating.
 * The media can fail in the browser: in that case DO NOT submit fake
 * listening points or claim a released exam. No external text reading link.
 * Free writing/speech are separate non-scored student-owned tasks.
 */
export function LosFinalExam({move}:{move:LosNavigate}){
 const {draft,update,saved}=useLosChapterDraft(1,LOS1_FINAL_DRAFT_CHAPTER);
 const [errors,setErrors]=useState<string[]>([]);
 const [confirmRetake,setConfirmRetake]=useState(false);
 const [archiveError,setArchiveError]=useState("");
 const history=losArchivedExamHistory(draft.practiceAnswers,"EX-FINAL");
 const answers=draft.testAnswers;
 const submitted=losValidSubmittedFinal(draft);
 const invalidSubmission=Boolean(draft.testSubmittedAt)&&!submitted;
 const filled=LOS1_FINAL_QUESTIONS.filter(q=>q.choices.some(c=>c.id===answers[q.id])).length;
 const allPlayed=LOS1_FINAL_AUDIO_SOURCES.every(src=>losFinalAudioPlayed(draft.practiceAnswers,src.id));
 const ready=losFinalReadyToSubmit(answers)&&allPlayed&&saved;
 const result=submitted?losFinalScore(answers):null;
 const change=(id:string,value:string)=>update(current=>current.testSubmittedAt?current:
  {...current,testAnswers:{...current.testAnswers,[id]:value}});
 const recordPlayed=(id:string)=>update(current=>current.testSubmittedAt?current:
  {...current,practiceAnswers:{
    ...current.practiceAnswers,[audioEvidence(id)]:new Date().toISOString(),
  }});
 const submit=()=>{
  if(draft.testSubmittedAt||!ready)return;
  update(current=>current.testSubmittedAt||
    !losFinalReadyToSubmit(current.testAnswers)||
    !LOS1_FINAL_AUDIO_SOURCES.every(src=>losFinalAudioPlayed(current.practiceAnswers,src.id))
      ?current:{...current,testSubmittedAt:new Date().toISOString()});
 };
 const repair=()=>{
  if(!saved||!invalidSubmission)return;
  update(current=>current.testSubmittedAt&&!losValidSubmittedFinal(current)
    ?{...current,testSubmittedAt:null}:current);
 };
 const retake=()=>{
  if(!confirmRetake||!saved||!submitted)return;
  try{
   update(current=>{
    if(!losValidSubmittedFinal(current))
      throw new Error("Nykyinen koeyritys ei ole ehjä. Virheellistä palautusta ei arkistoida.");
    const nextPractice=losArchiveExamAttempt(
     current.practiceAnswers,"EX-FINAL",LOS1_FINAL_QUESTIONS,
     current.testAnswers,current.testSubmittedAt??"");
    for(const source of LOS1_FINAL_AUDIO_SOURCES)delete nextPractice[audioEvidence(source.id)];
    return {...current,testAnswers:{},testSubmittedAt:null,practiceAnswers:nextPractice};
   });
   setArchiveError("");
   setConfirmRetake(false);
  }catch(error){setArchiveError(error instanceof Error?error.message:"Koetta ei voitu arkistoida.");}
 };
 const writingOk=writingLineCount(draft.applicationDraft)>=5&&
  writingLineCount(draft.applicationDraft)<=7&&draft.applicationDraft.trim().length>=80;
 return <section className="los-inner-page los-exam" aria-label="LOS! 1:n koko kirjan loppukoe">
  <p className="los-eyebrow">LOS! 1 / EX-FINAL / 50 PISTETTÄ</p>
  <h1>Koko kirjan loppukoe</h1>
  <p className="los-page-intro">Koe sisältää 50 uutta automaattisesti arvioitavaa tehtävää: 12 kuuntelua, 10 lukemista, 10 sanastoa, 10 kielioppia ja 8 arkitilannetta. Lisäksi teet itsenäisen viestin ja tallennettavan 6–8 repliikin keskustelun. Niitä ei lasketa 50 pisteeseen. Loppukoe ei ole virallinen kielitaitotodistus.</p>
  <div className="los-exam-overview">
   <p><strong>{filled}/50 vastattu</strong> · {submitted?"Palautettu":invalidSubmission?"Tallenteessa ristiriita":"Luonnos tallentuu automaattisesti"} · 1 piste / tehtävä</p>
   <p role="status" className={saved?"los-exam-save":"los-exam-save is-error"}>{saved?
    "EX-FINAL-vastaukset tallennettu paikalliseen LOS!-varmuuskopion arviointipaikkaan 93.":
    "Tallennus epäonnistui. Älä sulje sivua ennen vastausten kopioimista talteen."}</p>
   <p>Oikeat vastaukset näytetään vasta palautuksen jälkeen. Ääni on ulkoisen julkaisijan palvelimella, eikä sen iPhone- tai tietokonetoistoa ole vielä laitetestattu.</p>
   {invalidSubmission&&<section className="los-exam-rubric" role="alert" aria-label="Virheellinen loppukokeen palautus">
    <h2>Palautusmerkintä on ristiriitainen</h2>
    <p>Tallennuksessa on palautusaika, mutta täydet 50 vastausta tai molempien äänitteiden kelvolliset kuuntelumerkinnät puuttuvat. LOS! ei näytä tästä pistemäärää tai oikeita vastauksia.</p>
    <p>Voit palauttaa kokeen luonnokseksi. Nykyiset vastausvalinnat, kirjoitus, puheharjoituksen merkinnät ja aiempien yritysten arkisto säilyvät. Puuttuvat kuuntelut on tehtävä uudelleen ennen palautusta.</p>
    <button type="button" className="los-outline-button" disabled={!saved} onClick={repair}>
      Korjaa palautusmerkintä ja jatka luonnosta
    </button>
   </section>}
  </div>
  {sections.map((section,index)=>{
   const questions=LOS1_FINAL_QUESTIONS.filter(q=>q.section===section);
   return <section key={section} className="los-exam-section" aria-labelledby={"los-final-"+section}>
    <h2 id={"los-final-"+section}>{index+1}. {LOS1_FINAL_SECTION_TITLES[section]}</h2>
    <p>{questions.length} pistettä</p>
    {section==="listening"&&<div className="los-exam-listening">
     <p><strong>Kuuntele molemmat alkuperäiset puheäänitteet ennen vastaamista.</strong> Litteraatit löytyvät erillisiltä kirjan sivuilta, mutta niitä ei näytetä koetehtävien yhteydessä ennen palautusta. Saat tehtävät 1–6 ensimmäisestä ja 7–12 toisesta äänitteestä.</p>
     {LOS1_FINAL_AUDIO_SOURCES.map(src=><div className="los-audio-line" key={src.id}>
      <p><Headphones size={17}/> <strong>{src.title}</strong> · {src.id}</p>
      <audio controls preload="none" src={src.url} onEnded={()=>recordPlayed(src.id)}
       onError={()=>setErrors(old=>old.includes(src.id)?old:[...old,src.id])}
       aria-label={src.title}>Selaimesi ei tue äänentoistoa.</audio>
      <p><a href={src.attributionUrl} target="_blank" rel="noopener noreferrer">Lähdetiedot</a> · {src.author} · <a href={src.licenseUrl} target="_blank" rel="noopener noreferrer">{src.license}</a></p>
      {draft.practiceAnswers[audioEvidence(src.id)]?<p role="status"><CheckCircle2 size={15}/> Tämän äänitteen toisto päättyi selaimessa.</p>:
       errors.includes(src.id)?<p role="alert">Äänite ei latautunut. Kuunteluosuutta ei voi palauttaa ilman toimivaa alkuperäisääntä. Koetulosta ei arvata tekstin perusteella.</p>:
       <p>Äänitettä ei vielä toistettu loppuun.</p>}
     </div>)}
     {!allPlayed&&<p role="status">Kuuntelun 12 pistettä edellyttävät, että molemmat oikeat äänitteet ovat toistuneet loppuun asti. Pelkkä play-painallus ei riitä.</p>}
    </div>}
    {section==="reading"&&<div className="los-exam-reading">
     <p>Avaa kolme koko lähdetekstiä tässä oppikirjassa. Kysymykset 13–15 koskevat ikäkeskusteluja, 16–19 luokkatilannetta ja 20–22 Haraldia.</p>
     {readingSources.map(text=><details key={text.sourceId} className="los-exam-rubric">
      <summary>{text.title} · {text.sourceId} · näytä koko teksti</summary>
      <ol lang="de">{text.originalLines.map(line=><li key={line.id}><strong>{line.speaker}:</strong> {line.text}</li>)}</ol>
      <p>Alkuperäislähde: <a href={text.sourceUrl} target="_blank" rel="noopener noreferrer">{text.author??"Wikibooksin kirjoittajat"}</a>, <a href={text.licenseUrl??"https://creativecommons.org/licenses/by-sa/4.0/"} target="_blank" rel="noopener noreferrer">{text.licenseCode??"CC BY-SA 4.0"}</a>. Ei LOS!:n kirjoittama alkuperäisteksti.</p>
     </details>)}
    </div>}
    <ol>{questions.map(question=><li key={question.id} className="los-exam-question">
     <fieldset disabled={Boolean(draft.testSubmittedAt)}>
      <legend><span>{Number(question.id.slice(-2))}.</span> {question.prompt}</legend>
      {section==="listening"&&<p><small>Kuuntelulähde: {sourceLabel(question.sourceId??"")}</small></p>}
      <div className="los-exam-answers">
       {question.choices.map(choice=><label key={choice.id} className={answers[question.id]===choice.id?"is-selected":""}>
        <input type="radio" name={question.id} value={choice.id} checked={answers[question.id]===choice.id}
         onChange={()=>change(question.id,choice.id)}/>
        <span>{choice.text}</span>
       </label>)}
      </div>
     </fieldset>
     {submitted&&<div role="status" className={"los-exam-feedback "+(answers[question.id]===question.correctId?"is-correct":"is-incorrect")}>
      <strong>{answers[question.id]===question.correctId?"1/1 piste":"0/1 pistettä"}</strong> · {question.explanation}
      {answers[question.id]!==question.correctId&&<p>Oikea vaihtoehto: {question.choices.find(c=>c.id===question.correctId)?.text}</p>}
     </div>}
    </li>)}</ol>
   </section>;
  })}
  {!submitted?<div className="los-exam-submit">
   <h2>Palauta loppukoe</h2>
   <p>Palautus avautuu, kun kaikkiin 50 tehtävään on vastattu, molemmat alkuperäisäänet ovat toistuneet loppuun asti ja vastausten paikallinen tallennus onnistuu.</p>
   <button type="button" className="los-primary" disabled={!ready||Boolean(draft.testSubmittedAt)} onClick={submit}>
    <CheckCircle2 size={18}/> Palauta loppukoe · {filled}/50
   </button>
  </div>:<div className="los-exam-results" aria-label="Koko loppukokeen pisteet">
   <p className="los-overline">EX-FINAL PALAUTETTU · PISTEYTETTY</p>
   <h2>{result?.correct}/{result?.total} pistettä</h2>
   <p>Osioiden objektiiviset vastaukset arvioidaan koneellisesti. Tämä ei ole virallinen A1-todistus, ja vapaan puheen, kirjoittamisen ja ääntämisen laatua ei ole pisteytetty.</p>
   <table><caption>Kokeen pisteet osa-alueittain</caption><thead><tr><th>Osio</th><th>Oikein</th></tr></thead>
    <tbody>{result?.perSection.map(g=><tr key={g.section}><th>{g.title}</th><td>{g.correct}/{g.total}</td></tr>)}</tbody></table>
   <p>Palautettu: {draft.testSubmittedAt?new Date(draft.testSubmittedAt).toLocaleString("fi-FI"):""}</p>
   <div className="los-exam-retake">
    <label><input type="checkbox" checked={confirmRetake} onChange={e=>setConfirmRetake(e.target.checked)}/>
     Voin tehdä JSON-varmuuskopion. Uusinta arkistoi nykyisen tuloksen ja kaikki 50 vastausta, minkä jälkeen aloitan uuden erillisen yrityksen samoista tehtävistä.</label>
    <button disabled={!confirmRetake||!saved} type="button" onClick={retake}><RotateCcw size={16}/> Arkistoi ja aloita uusi koeyritys</button>
   </div>
   {archiveError&&<p role="alert">{archiveError}</p>}
   <p>Uusinnassa 50 kysymyksen pankki on toistaiseksi sama. Vastaukset ja tulokset arkistoidaan erikseen, mutta vaihtuvaa tehtäväpankkia ei vielä ole.</p>
  </div>}
  {history.length>0&&<section className="los-exam-results" aria-label="Loppukokeen aiemmat yritykset">
   <h2>Aiempien loppukokeiden arkisto</h2>
   <p>Tarkat vastaukset, palautusajat ja pistemäärät jäävät talteen myös uusintaa aloittaessasi.</p>
   <ol>{history.map(item=><li key={item.number}>
    <strong>Yritys {item.number}</strong> · {item.correct}/{item.total} pistettä ·
    {" "}{new Date(item.submittedAt).toLocaleString("fi-FI")}
    <details><summary>Vanhan yrityksen vastaukset ja osiot</summary>
     <p>{item.choices.split("").map((choice,i)=>i+1+". "+choice).join(" · ")}</p>
     <ul>{item.sections.map(section=><li key={section.section}>
      {LOS1_FINAL_SECTION_TITLES[section.section as LosFinalSection]??section.section}: {section.correct}/{section.total}
     </li>)}</ul>
    </details>
   </li>)}</ol>
  </section>}
  <section className="los-exam-speaking">
   <h2>Oma 5–7 lauseen viesti</h2>
   <p>Kirjoita 5–7 lyhyttä saksankielistä lausetta kuvitteelliselle uudelle tuttavalle. Kerro nimi, alkuperä, ikä ja tapaamisaika. Kirjoita jokainen virke omalle rivilleen, jotta voit itse tarkistaa määrän. Älä kirjoita oikeita henkilötietoja.</p>
   <label htmlFor="los-final-writing">Oma viesti, jokainen lause omalla rivillään</label>
   <textarea id="los-final-writing" value={draft.applicationDraft} rows={8} maxLength={5000}
    onChange={event=>update(current=>({
      ...current,applicationDraft:event.target.value,
      practiceAnswers:{
        ...current.practiceAnswers,
        [LOS1_FINAL_WRITING_CHECK]:"",
        ...(current.practiceAnswers[LOS1_FINAL_WRITING_MODEL_OPENED]
          ? {[LOS1_FINAL_WRITING_ASSISTED]:"edited-after-model"} : {}),
      },
    }))}
    placeholder="Kirjoita 5–7 omaa lausetta, jokainen omalle rivilleen." />
   <p role="status">{writingLineCount(draft.applicationDraft)} / 5–7 lausetta · {draft.applicationDraft.trim().length} merkkiä. Harjoitus ei saa automaattista kielioppiarvosanaa.</p>
   <button type="button" className="los-outline-button" disabled={!writingOk} onClick={()=>update(current=>({...current,
    practiceAnswers:{...current.practiceAnswers,[LOS1_FINAL_WRITING_CHECK]:"written-and-reviewed"}}))}>
    Vahvista kirjoitusyritys tarkistuslistalla
   </button>
   {draft.practiceAnswers[LOS1_FINAL_WRITING_CHECK]&&<p role="status"><CheckCircle2 size={15}/> Oma kirjoitusyritys on tallennettu ja merkitty itse arvioitavaksi.</p>}
   <ul><li>Kirjoitin 5–7 omaa lausetta.</li><li>Tarkistin ich bin, ich komme ja oikeat alkukirjaimet.</li><li>Käytin am ja um oikeissa paikoissa.</li><li>Viestissä ei ole oikeita henkilötietoja.</li></ul>
   {submitted&&<div className="los-exam-writing-model">
    <p role="status">{draft.practiceAnswers[LOS1_FINAL_WRITING_ASSISTED]
      ? "Mallia on käytetty ennen nykyisen kirjoitusversion valmistumista. Nykyinen viesti on avustettu harjoitus, ei itsenäisesti arvioitu kielioppinäyttö."
      : draft.practiceAnswers[LOS1_FINAL_WRITING_MODEL_OPENED]
        ? "Malliviesti on avattu vasta oman kirjoitusyrityksen vahvistamisen jälkeen. Jos muokkaat tekstiä nyt, yritys merkitään avustetuksi."
        : "Malliviesti avautuu vasta, kun olet kirjoittanut ja itse tarkistanut oman 5–7 lauseen viestisi."}</p>
    {draft.practiceAnswers[LOS1_FINAL_WRITING_CHECK]==="written-and-reviewed"
      ? <details className="los-exam-rubric" onToggle={event=>{
          if (!event.currentTarget.open || draft.practiceAnswers[LOS1_FINAL_WRITING_MODEL_OPENED]) return;
          update(current=>({...current,practiceAnswers:{
            ...current.practiceAnswers,[LOS1_FINAL_WRITING_MODEL_OPENED]:new Date().toISOString(),
          }}));
        }}>
          <summary>Näytä malliviesti oman yrityksen jälkeen</summary>
          <p lang="de">Hallo! Ich heiße Mia. Ich komme aus Finnland. Ich bin siebzehn Jahre alt. Am Montag habe ich Zeit. Wir treffen uns um drei Uhr. Bis morgen!</p>
          <p>Malli on LOS!:n itse laatima opetusesimerkki eikä osa 50 pisteen koetta. Jos muokkaat omaa tekstiäsi sen avaamisen jälkeen, teksti merkitään avustetuksi.</p>
        </details>
      : <p>Vahvista ensin oma kirjoitusyrityksesi yllä olevasta tarkistuslistasta.</p>}
   </div>}
  </section>
  <section className="los-exam-speaking">
   <h2>Äänitä 6–8 repliikin keskustelu</h2>
   <p>Harjoittele kahden kuvitteellisen henkilön tapaamista, nimiä, kuulumisia ja hyvästelyä. Tee 6–8 puheenvuoroa. Äänitä ne tarkoituksellisesti mikrofonilla ja lataa tallenne omalle laitteellesi. Ääni ei siirry pilveen eikä JSON-varmuuskopioon. Tallennuksen tekninen onnistuminen ei ole sama asia kuin kieliopin tai ääntämisen arviointi.</p>
   <LosVoicePractice chapterId="93" onDownloaded={()=>update(current=>({...current,
     practiceAnswers:{...current.practiceAnswers,[LOS1_FINAL_VOICE_CHECK]:"audio-download-started"}}))}/>
   <fieldset className="los-exam-dialogue-self">
    <legend>Oma arvio keskustelun sisällöstä</legend>
    {selfRatings.map(item=><label key={item.id}>
     <input type="radio" name="EX-FINAL-DIALOGUE-SELF" value={item.id}
      checked={draft.practiceAnswers["EX-FINAL-DIALOGUE-SELF"]===item.id}
      onChange={()=>update(current=>({...current,practiceAnswers:{...current.practiceAnswers,"EX-FINAL-DIALOGUE-SELF":item.id}}))}/>
     <span>{item.label}</span>
    </label>)}
   </fieldset>
   <p role="status">{draft.practiceAnswers[LOS1_FINAL_VOICE_CHECK]?
    "Äänitiedoston lataus käynnistetty käyttäjän toiminnosta. Varmista itse, että tallenne löytyy laitteelta.":
    "Puhetallennetta ei ole vielä käynnistetty ladattavaksi. Pelkkä teksti ei korvaa loppukokeen vaadittua äänitettyä keskustelua."}</p>
   <label htmlFor="los-final-self">Kirjaa itsearvio (vähintään 15 merkkiä)</label>
   <textarea id="los-final-self" rows={3} maxLength={5000} value={draft.selfAssessment}
    onChange={event=>update(current=>({...current,selfAssessment:event.target.value}))}
    placeholder="Minkä sanoin ilman mallia ja mitä haluan kerrata?"/>
  </section>
  <div className="los-exam-submit">
   <button type="button" className="los-primary" onClick={()=>move(null,"summary")}>
    Siirry kirjan yhteenvetoon
   </button>
   <p>Ohjatun L059-oppitunnin suoritus vaatii palautetun kokeen, vahvistetun kirjoitusyrityksen, ladatun puheharjoituksen ja oman itsearvion. Tämä ei silti korvaa puheen laatua arvioivaa opettajaa.</p>
  </div>
 </section>;
}

const goalLabels=[
 "C01 · Tervehdin ja hyvästelen",
 "C02 · Kysyn ja kerron nimen",
 "C03 · Kysyn ja kerron lähtömaan",
 "C04 · Valitsen du- ja Sie-muodon",
 "C05 · Kysyn kuulumisia",
 "C06 · Ilmaisen iän ja kirjoitan lukusanat",
 "C07 · Tavaan nimen ja numeroita",
 "C08 · Pyydän apua luokassa",
 "C09 · Kerron päivän ja kellonajan",
 "C10 · Esittelen kolmannen henkilön",
] as const;
export const losFinalSummaryChapterGoalId=(i:number)=>"EX-SUMMARY-C"+String(i+1).padStart(2,"0");
export function LosFinalSummary({move}:{move:LosNavigate}){
 const final=useLosChapterDraft(1,LOS1_FINAL_DRAFT_CHAPTER);
 const d01=useLosChapterDraft(1,"01"),d02=useLosChapterDraft(1,"02"),d03=useLosChapterDraft(1,"03"),
  d04=useLosChapterDraft(1,"04"),d05=useLosChapterDraft(1,"05"),d06=useLosChapterDraft(1,"06"),
  d07=useLosChapterDraft(1,"07"),d08=useLosChapterDraft(1,"08"),d09=useLosChapterDraft(1,"09"),
  d10=useLosChapterDraft(1,"10");
 const drafts=[d01.draft,d02.draft,d03.draft,d04.draft,d05.draft,d06.draft,d07.draft,d08.draft,d09.draft,d10.draft];
 const reviewed=losCountReviewedWords(Object.fromEntries(drafts.map((draft,index)=>
   [String(index+1).padStart(2,"0"),draft])));
 const answers=final.draft.practiceAnswers;
 const goal=answers[LOS1_SUMMARY_GOAL]??"";
 const goalReady=goal.trim().length>=25;
 const chapterCount=goalLabels.filter((_,i)=>Boolean(answers[losFinalSummaryChapterGoalId(i)])).length;
 const archivedExams=losArchivedExamHistory(final.draft.practiceAnswers,"EX-FINAL");
 const latestArchived=archivedExams.at(-1);
 const validCurrent=losValidSubmittedFinal(final.draft);
 const exam=validCurrent?losFinalScore(final.draft.testAnswers):
  latestArchived?{correct:latestArchived.correct,total:latestArchived.total}:null;
 const save=(id:string,text:string)=>final.update(current=>({...current,practiceAnswers:{...current.practiceAnswers,[id]:text}}));
 return <section className="los-inner-page los-exam" aria-label="LOS! 1:n osaamisen yhteenveto">
  <p className="los-eyebrow">LOS! 1 / L060 / SELBSTREFLEXION</p>
  <h1>Mitä osaan nyt saksaksi?</h1>
  <p className="los-page-intro">Käy läpi kaikkien 10 kappaleen tavoitteet, kertaa vähintään viisi eri sanaa kirjan sanakorteilla ja kirjoita seuraava konkreettinen tavoitteesi. Oma arvio erotetaan aina automaattisesti pisteytetystä loppukokeesta.</p>
  <div className="los-exam-overview">
   <p>EX-FINAL: <strong>{exam?exam.correct+"/"+exam.total:"ei vielä palautettu"}</strong> · {validCurrent?"nykyinen palautettu yritys":latestArchived?"viimeisin arkistoitu yritys":"ei tallennettua koeyritystä"}; ei kielitaitotodistus.</p>
   <p>Oma tavoitteiden katselmointi: <strong>{chapterCount}/10</strong> · viivästetyn muistin itsearviot eivät todista kielitasoa.</p>
  </div>
  <section className="los-exam-section">
   <h2>1. Arvioi kaikki 10 tavoitetta</h2>
   <p>Merkitse tavoite katselmoiduksi, vaikka et vielä osaisi sitä. Kyse on rehellisestä itsearviosta, ei todistuksesta.</p>
   <div className="los-exam-answers">{goalLabels.map((label,i)=>{
    const id=losFinalSummaryChapterGoalId(i);
    return <label key={id} className={answers[id]?"is-selected":""}>
     <input type="checkbox" checked={Boolean(answers[id])}
      onChange={e=>save(id,e.target.checked?"reviewed":"")}/><span>{label}</span>
    </label>;
   })}</div>
  </section>
  <section className="los-exam-section">
   <h2>2. Aktivoi sanakorttien kertaus</h2>
   <p>Olet arvioinut {reviewed} eri sanaa tässä laitteessa. Saman sanan kertaaminen molempiin suuntiin lasketaan vain kerran. Avaa kirjan sanakortit ja arvioi vähintään viisi eri sanaa muistamisen mukaan. Vasta sen jälkeen voit vahvistaa kertauksen tähän yhteenvetoon.</p>
   <button type="button" className="los-outline-button" onClick={()=>move("01","cards")}>
    <BookOpen size={16}/> Avaa sanakortit
   </button>
   <button type="button" className="los-outline-button" disabled={reviewed<5}
    onClick={()=>save(LOS1_SUMMARY_CARDS,"reviewed-"+reviewed)}>
    <CheckCircle2 size={16}/> Vahvista vähintään viisi arvioitua sanaa
   </button>
   {answers[LOS1_SUMMARY_CARDS]&&<p role="status">Kertausvahvistus kirjattu. Korttien osaaminen on käyttäjän itse arvioimaa.</p>}
  </section>
  <section className="los-exam-section">
   <h2>3. Aseta seuraava tavoite</h2>
   <label htmlFor="los-final-goal">Kirjoita oma konkreettinen seuraava tavoite (vähintään 25 merkkiä)</label>
   <textarea id="los-final-goal" rows={4} maxLength={500}
    value={goal}
    onChange={e=>final.update(current=>({...current,practiceAnswers:{
      ...current.practiceAnswers,[LOS1_SUMMARY_GOAL]:e.target.value,"EX-SUMMARY-GOAL-OK":""}}))}
    placeholder="Harjoittelen seuraavaksi ..."/>
   <button className="los-outline-button" type="button" disabled={!goalReady}
    onClick={()=>save("EX-SUMMARY-GOAL-OK","confirmed")}>Vahvista seuraava tavoitteeni</button>
  </section>
  <section className="los-exam-section">
   <h2>4. Oma kokonaisarvio</h2>
   <fieldset><legend>Kuinka itsenäisesti pystyt aloittamaan yksinkertaisen saksankielisen keskustelun?</legend>
    {selfRatings.map(item=><label key={item.id}>
     <input type="radio" name="EX-SUMMARY-REFLECTION" value={item.id}
      checked={answers[LOS1_SUMMARY_REFLECTION]===item.id} onChange={()=>save(LOS1_SUMMARY_REFLECTION,item.id)}/>
     <span>{item.label}</span>
    </label>)}
   </fieldset>
   <p>Yhteenveto tallentuu arviointipaikkaan 93. L060-oppitunti vaatii kaikkien kymmenen tavoitteen läpikäynnin, viiden sanakortin arvioinnin, vahvistetun seuraavan tavoitteen ja tämän itsearvion. Loppukokeen pistetulos ei ole oma arvio.</p>
   <p role="status">{final.saved?"Tallennus on toiminnassa.":"Tallennus epäonnistui, kopioi tavoitteesi talteen."}</p>
  </section>
  <LosMasterySummary/>
  <div className="los-exam-submit">
   <button className="los-primary" type="button" onClick={()=>move(null,"path")}>Palaa opetuspolkuun ja viimeistele L060</button>
  </div>
 </section>;
}
