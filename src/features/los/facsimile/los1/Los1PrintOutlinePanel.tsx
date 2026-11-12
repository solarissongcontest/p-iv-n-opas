import {LOS_BOOKS} from "../../catalog";
import {getLos1UnreadyChapterGates,LOS1_FULL_BOOK_PRINT_OUTLINE,
  LOS1_PRINT_SECTIONS} from "./fullBookOutline";

/** Editorial skeleton only: there are no numbered full-book PDF pages yet. */
export function Los1PrintOutlinePanel(){
  const chapters=LOS_BOOKS.find(book=>book.id===1)?.chapters??[];
  const gates=getLos1UnreadyChapterGates();
  return <details className="los1-full-book-outline">
    <summary>Koko LOS! 1:n painetun kirjan taittorunko · C01–C10</summary>
    <p>Kirjalle on määritelty oikea sisältöjärjestys. Painettuja sivunumeroita
      ei ole vielä olemassa, koska koko kirjaa ei ole taitettu eikä
      hyväksytty julkaistavaksi.</p>
    <p className="los1-full-book-gate-status">
      {gates.length===0?
        "Kappaleiden ensisijaisten lähteiden hyväksyntäportit ovat läpäisseet. Muut julkaisutarkistukset ovat silti erillisiä.":
        gates.length+" / 10 kappaletta odottaa ensisijaisen lähteen julkaisuehtoja."}
    </p>
    <div className="los1-full-book-outline-chapters">
      {chapters.map(ch=>{
        const gate=gates.find(x=>x.chapterId===ch.id);
        return <details key={ch.id}>
          <summary><b>{ch.id} · <span lang="de">{ch.title}</span></b>
            <span>{gate?"Julkaisu estetty":"Ensisijainen lähde tarkistettu"}</span></summary>
          <p>{ch.subtitle}</p>
          <ol>{LOS1_PRINT_SECTIONS.map(section=>
            <li key={section.id}>{section.label} <small>Ei sivunumeroa</small></li>)}</ol>
          {gate&&<p className="los1-full-book-issues">
            Ensisijaisen Text A:n avoimet julkaisuehdot: {gate.issues.join(" ")}</p>}
        </details>;
      })}
    </div>
    <p className="los1-full-book-foot">
      Kertaus I, välikoe, kertaus II, loppukoe, sanastohakemistot,
      kielioppikooste, ratkaisut ja lähde-/kuvatiedot sisältyvät samaan
      taittorunkoon. Yhteensä {LOS1_FULL_BOOK_PRINT_OUTLINE.length} yksilöityä
      suunniteltua sisältöosiota. Tämä ei ole fyysisten sivujen määrä.
    </p>
  </details>;
}
