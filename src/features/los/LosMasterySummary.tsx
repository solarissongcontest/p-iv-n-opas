import { useLosChapterDraft } from "./studyState.ts";
import { summarizeLos1Mastery } from "./masterySummary.ts";
import "./los-mastery.css";

/**
 * One read-only view, also embedded in the existing textbook summary.
 * The book's 13 saved draft slots remain the only persistence source.
 */
export function LosMasterySummary() {
  const c01=useLosChapterDraft(1,"01").draft;
  const c02=useLosChapterDraft(1,"02").draft;
  const c03=useLosChapterDraft(1,"03").draft;
  const c04=useLosChapterDraft(1,"04").draft;
  const c05=useLosChapterDraft(1,"05").draft;
  const c06=useLosChapterDraft(1,"06").draft;
  const c07=useLosChapterDraft(1,"07").draft;
  const c08=useLosChapterDraft(1,"08").draft;
  const c09=useLosChapterDraft(1,"09").draft;
  const c10=useLosChapterDraft(1,"10").draft;
  const c92=useLosChapterDraft(1,"92").draft;
  const c93=useLosChapterDraft(1,"93").draft;
  const result=summarizeLos1Mastery({
    "01":c01,"02":c02,"03":c03,"04":c04,"05":c05,
    "06":c06,"07":c07,"08":c08,"09":c09,"10":c10,"92":c92,"93":c93,
  });
  const statusLabel={
    confirmed:"Vahvistettu myöhemmin",
    independent:"Itsenäinen tarkistus",
    exam:"Rajattu koenäyttö",
    missing:"Ei myönteistä tarkistettua näyttöä",
  } as const;
  return <section className="los-mastery" aria-label="Tallennuksiin perustuva LOS! 1:n osaamisyhteenveto">
    <h2>Osaaminen todellisten tallennusten perusteella</h2>
    <p>Erillään näkyvät käsitellyt sisällöt, ensimmäisellä yrityksellä ilman apua onnistuneet tarkistukset, vähintään vuorokautta myöhemmin eri oppitunnilla vahvistettu osaaminen ja rajattu monivalintakoe. Puuttuva näyttö ei tarkoita automaattisesti, ettet osaisi asiaa.</p>
    <div className="los-mastery-overview" role="status">
      <p><strong>{result.coveredChapters.length}/10</strong> kappaleesta on kirjattua opetus- tai harjoittelutoimintaa.</p>
      <p><strong>{result.skills.filter(s=>s.independentChecks>0).length}/15</strong> tavoitteessa on itsenäinen Teacher-tarkistus.</p>
      <p><strong>{result.skills.filter(s=>s.laterConfirmed).length}/15</strong> tavoitteessa on myöhempi vahvistus.</p>
      <p><strong>{result.exam?result.exam.correct+"/50":"Ei palautettua tulosta"}</strong> · loppukokeen pisteet erillään.</p>
    </div>
    <h3>Käsitellyt opetussisällöt</h3>
    <p>{result.coveredChapters.length ? result.coveredChapters.map(ch=>"C"+ch).join(" · "):
      "Varmennettuja opetuskertoja tai tarkistettuja harjoituksia ei löytynyt tämän laitteen tallennuksista."}</p>
    <h3>Osaamistavoitteiden näyttö</h3>
    <div className="los-mastery-skills">
      {result.skills.map(skill=><article key={skill.id} className="los-mastery-skill">
        <div>
          <strong>{skill.title}</strong>
          <small>{skill.id} · C{skill.chapter} · {skill.covered?"Sisältöä käsitelty":"Ei kirjattua käsittelyä"}</small>
        </div>
        <div>
          <span className={"los-mastery-status is-"+skill.status}>{statusLabel[skill.status]}</span>
          <small>Vihjeettömiä ensimmäisiä onnistumisia: {skill.independentChecks}
            {skill.examTotal>0?" · viimeisen palautetun kokeen tähän taitoon liittyviä oikein "+skill.examCorrect+"/"+skill.examTotal:""}
          </small>
        </div>
      </article>)}
    </div>
    <h3>Mitä kannattaa vielä kerrata?</h3>
    {result.review.length ? <ul>{result.review.map(skill=><li key={skill.id}>
      {skill.title} (C{skill.chapter}): {skill.status==="missing"?
        "myönteinen tarkistettu näyttö puuttuu":"näyttö on toistaiseksi vain rajatusta kokeesta tai osittainen"}.
    </li>)}</ul> :
      <p>Kaikista tavoitteista löytyy jo jotakin tarkistettua näyttöä. Palaa etenkin taitoihin, joita ei ole vielä vahvistettu myöhempänä päivänä.</p>}
    <h3>Oma tuottaminen ja seuraava tavoite</h3>
    <p>{result.writing.recorded ? "Oma kirjoitusyritys on tallennettu. ":
      "Omaa esittelytekstiä ei löytynyt. "}
      {result.writing.assisted ? "Mallia on avattu L058:ssa, joten teksti on avustettu harjoitus. ":
        "Mallin käyttöä ei ole kirjattu L058:n esittelyyn. "}
      Vapaan tekstin ja ääntämisen kielellistä laatua ei ole tarkistettu automaattisesti.</p>
    <p><strong>Sääntöpohjainen seuraava askel:</strong> {result.nextSuggestion}</p>
    {result.ownGoal&&<p><strong>Itse kirjoittamasi tavoite:</strong> {result.ownGoal}</p>}
    <p className="los-mastery-disclaimer">Tämä ei ole CEFR-tasotodistus eikä A1.1-tason virallinen arvio. Näytöt kuvaavat vain näiden tehtävien todellisia tallennuksia ja tarkistuksia.</p>
  </section>;
}
