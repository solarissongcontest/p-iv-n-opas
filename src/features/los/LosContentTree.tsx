import { useEffect, useMemo, useState } from "react";
import { Bookmark, ChevronDown, ChevronRight, Search } from "lucide-react";
import { LOS_BOOKS, type LosBookDefinition } from "./catalog";
import { getDeviceOwnerId } from "@/lib/deviceSession";
import { losDraftKey, parseLosDraft } from "./studyState";
import { summarizeLosTreeEvidence, type LosTreeEvidence } from "./contentTreeEvidence";
import {
  emptyLosContentTreePreferences, losContentTreePrefsKey,
  parseLosContentTreePreferences, type LosContentTreePreferences,
} from "./contentTreePreferences";
import type { LosDestination } from "./LosReferenceTools";
import { losContentTasks, type LosContentTask } from "./contentTreeModel";

const sectionLinks: readonly {id:LosDestination;label:string}[] = [
  {id:"chapter",label:"Aloita"}, {id:"text",label:"Teksti A"},
  {id:"understand",label:"Ymmärrä"}, {id:"vocabulary",label:"Sanasto"},
  {id:"grammar",label:"Kielioppi"}, {id:"text-b",label:"Teksti B"},
  {id:"practice",label:"Harjoittele"}, {id:"apply",label:"Käytä saksaa"},
  {id:"culture",label:"Kulttuuri"}, {id:"test",label:"Kappaletesti"},
];

export function LosContentTree({
  book,chapterId,section,activeTaskId,move,openTask,openBook,
}: {
  book:LosBookDefinition;
  chapterId:string|null;
  section:LosDestination;
  activeTaskId:string|null;
  move:(chapter:string|null,section:LosDestination)=>void;
  openTask:(task:LosContentTask)=>void;
  openBook:(id:number)=>void;
}) {
  const [search,setSearch]=useState("");
  const [evidence,setEvidence]=useState<Record<string,LosTreeEvidence>>({});
  useEffect(()=>{
    const refresh=()=>{
      try {
        const ownerId=getDeviceOwnerId();
        if(!ownerId){setEvidence({});return;}
        const result:Record<string,LosTreeEvidence>={};
        for(const ch of book.chapters) {
          const draft=parseLosDraft(localStorage.getItem(
            losDraftKey(book.id,ch.id,ownerId)));
          result[ch.id]=summarizeLosTreeEvidence(draft);
        }
        setEvidence(result);
      }catch{setEvidence({});}
    };
    refresh();
    // Same local event as the existing workbook, not an alternative store.
    window.addEventListener("los:draft-change",refresh);
    window.addEventListener("storage",refresh);
    return ()=>{
      window.removeEventListener("los:draft-change",refresh);
      window.removeEventListener("storage",refresh);
    };
  },[book.id,book.chapters]);
  const readPreference = (bookId:number, chapters:readonly string[]):LosContentTreePreferences => {
    if(typeof window==="undefined")return emptyLosContentTreePreferences();
    try {
      const ownerId=getDeviceOwnerId();
      if(!ownerId)return emptyLosContentTreePreferences();
      return parseLosContentTreePreferences(
        localStorage.getItem(losContentTreePrefsKey(ownerId,bookId)), chapters);
    } catch { return emptyLosContentTreePreferences(); }
  };
  const [expanded,setExpanded]=useState<Record<string,boolean>>(()=>
    readPreference(book.id,book.chapters.map(ch=>ch.id)).expandedChapters);
  const [tasksExpanded,setTasksExpanded]=useState<Record<string,boolean>>(()=>
    readPreference(book.id,book.chapters.map(ch=>ch.id)).expandedTaskGroups);
  const [prefsBookId,setPrefsBookId]=useState(book.id);

  // A book switch must not overwrite another book\'s saved tree preferences.
  useEffect(()=>{
    const prefs=readPreference(book.id,book.chapters.map(ch=>ch.id));
    setExpanded(prefs.expandedChapters);
    setTasksExpanded(prefs.expandedTaskGroups);
    setPrefsBookId(book.id);
  },[book.id,book.chapters]);

  useEffect(()=>{
    if(prefsBookId!==book.id || typeof window==="undefined")return;
    try {
      const ownerId=getDeviceOwnerId();
      if(!ownerId)return;
      const payload:LosContentTreePreferences={
        version:1,expandedChapters:expanded,expandedTaskGroups:tasksExpanded,
      };
      localStorage.setItem(losContentTreePrefsKey(ownerId,book.id),
        JSON.stringify(payload));
    } catch { /* Reader navigation stays usable without localStorage. */ }
  },[book.id,prefsBookId,expanded,tasksExpanded]);

  // Open the current chapter by default, but respect explicit saved
  // 'false' (closed) instead of re-opening against the student's choice.
  useEffect(()=>{
    if(chapterId) setExpanded(state=>
      Object.prototype.hasOwnProperty.call(state,chapterId)
        ? state : {...state,[chapterId]:true});
  },[chapterId]);
  const needle=search.trim().toLocaleLowerCase("fi");
  const found=useMemo(()=>book.chapters.map(ch=>{
    const tasks:LosContentTask[]=book.id===1 ? [
      ...losContentTasks(ch.id,"practice"),...losContentTasks(ch.id,"test"),
    ] : [];
    const matchingTasks=needle?tasks.filter(t=>t.id.toLowerCase().includes(needle)||
      t.label.toLocaleLowerCase("fi").includes(needle)):[];
    const chapterMatches=!needle||ch.title.toLocaleLowerCase("de").includes(needle)||
      ch.subtitle.toLocaleLowerCase("fi").includes(needle)||ch.id.includes(needle);
    const matchedSections=sectionLinks.filter(item=>item.label.toLocaleLowerCase("fi").includes(needle));
    return {chapter:ch,tasks,matchingTasks,chapterMatches,matchedSections,
      visible:chapterMatches||matchingTasks.length>0||matchedSections.length>0};
  }).filter(row=>row.visible),[book.id,book.chapters,needle]);

  const allExpanded=book.chapters.every(ch=>expanded[ch.id]);
  const toggleAll=()=>{
    setExpanded(Object.fromEntries(book.chapters.map(ch=>[ch.id,!allExpanded])));
  };
  const go=(ch:string,sec:LosDestination)=>move(ch,sec);
  return <div className="los-content-tree">
    <details className="los-tree-books">
      <summary>Kirjasarja · LOS! 1–8</summary>
      <ul>{LOS_BOOKS.map(item=><li key={item.id}>
        <button type="button" aria-current={item.id===book.id ? "page" : undefined}
          onClick={() => openBook(item.id)}>
          <strong>LOS! {item.id}</strong>
          <span>{item.title}</span>
          {item.chapters.length===0&&<small>Ei vielä kappalesisältöä</small>}
        </button>
      </li>)}</ul>
    </details>
    <div className="los-tree-search">
      <Search size={16} aria-hidden="true"/>
      <label className="sr-only" htmlFor="los-tree-search-input">Hae sisältöpuusta</label>
      <input id="los-tree-search-input" type="search" value={search} onChange={e=>setSearch(e.target.value)}
        placeholder="Etsi osiota tai tehtävää"/>
    </div>
    <div className="los-tree-actions">
      <button type="button" onClick={toggleAll}>{allExpanded?"Sulje kaikki":"Avaa kaikki"}</button>
      {chapterId&&<button type="button" onClick={()=>{
        setExpanded(state=>({...state,[chapterId]:!state[chapterId]}));
      }}>{expanded[chapterId]?"Sulje nykyinen":"Avaa nykyinen"}</button>}
    </div>
    <ul className="los-tree-chapters">
      {found.map(({chapter:ch,chapterMatches,matchingTasks,matchedSections})=>{
        const isOpen=Boolean(expanded[ch.id] || needle);
        return <li key={ch.id} className="los-tree-chapter">
          <div className="los-tree-chapter-head">
            <button className="los-tree-expand" type="button"
              aria-expanded={isOpen} aria-controls={`los-tree-children-${ch.id}`}
              aria-label={`${isOpen?"Sulje":"Avaa"} kappale ${Number(ch.id)} ${ch.title}`}
              onClick={()=>setExpanded(state=>({...state,[ch.id]:!isOpen}))}>
              {isOpen?<ChevronDown size={17}/>:<ChevronRight size={17}/>}
            </button>
            <button type="button" className={ch.id===chapterId&&section==="chapter"?"is-active los-tree-chapter-link":"los-tree-chapter-link"}
              onClick={()=>go(ch.id,"chapter")} aria-current={ch.id===chapterId&&section==="chapter"?"page":undefined}>
              <span className="los-sidebar-num">{ch.id}</span><span lang="de">{ch.title}</span>
              {evidence[ch.id]?.bookmarked&&
                <Bookmark size={14} fill="currentColor" aria-label="Kirjanmerkki asetettu"/>}
            </button>
          </div>
          {evidence[ch.id]?.testSubmitted && <p className="los-tree-saved-status">
            Kappaletesti palautettu
          </p>}
          {isOpen&&<ul className="los-tree-sections" id={`los-tree-children-${ch.id}`}>
            {sectionLinks.filter(item=>!needle||chapterMatches||matchedSections.some(s=>s.id===item.id)||
              matchingTasks.some(t=>t.section===item.id)).map(item=>{
              const showTasks=(item.id==="practice"||item.id==="test")&&book.id===1;
              const related=showTasks?losContentTasks(ch.id,item.id as "practice"|"test"):[];
              const visibleTasks=needle&&!chapterMatches?
                related.filter(t=>t.label.toLocaleLowerCase("fi").includes(needle)||t.id.toLowerCase().includes(needle)):related;
              const key=`${ch.id}-${item.id}`;
              const taskOpen=Boolean(tasksExpanded[key] || (activeTaskId&&chapterId===ch.id&&section===item.id) || needle);
              const active=ch.id===chapterId&&item.id===section;
              return <li key={item.id}>
                <div className="los-tree-section-row">
                  {showTasks&&related.length>0&&<button type="button" className="los-tree-expand"
                    aria-expanded={taskOpen} aria-controls={`los-tree-task-list-${key}`}
                    aria-label={`${taskOpen?"Sulje":"Avaa"} ${item.label.toLowerCase()}-osion tehtävät`}
                    onClick={()=>{
                      const expanding=!taskOpen;
                      setTasksExpanded(state=>({...state,[key]:expanding}));
                      if (expanding && window.matchMedia("(max-width: 760px)").matches) {
                        window.requestAnimationFrame(() => {
                          const firstTask=document.getElementById(`los-tree-task-list-${key}`)
                            ?.querySelector("button");
                          firstTask?.scrollIntoView({block:"nearest",inline:"nearest",behavior:"auto"});
                        });
                      }
                    }}>
                    {taskOpen?<ChevronDown size={14}/>:<ChevronRight size={14}/>}
                  </button>}
                  <button type="button" className={active?"is-active los-tree-section-link":"los-tree-section-link"}
                    aria-current={active&&!activeTaskId?"page":undefined} onClick={()=>go(ch.id,item.id)}>
                    {item.label}
                  </button>
                </div>
                {showTasks&&related.length>0&&taskOpen&&<ul className="los-tree-tasks" id={`los-tree-task-list-${key}`}>
                  {visibleTasks.map(task=><li key={task.id}>
                    <button type="button" title={task.label}
                      className={activeTaskId===task.id&&chapterId===ch.id?"is-active los-tree-task-link":"los-tree-task-link"}
                      aria-current={activeTaskId===task.id&&chapterId===ch.id?"location":undefined}
                      onClick={()=>openTask(task)}>
                        <span>{task.label}</span>
                        {(item.id==="practice"?
                          evidence[ch.id]?.practiceAnsweredIds:
                          evidence[ch.id]?.testAnsweredIds)?.includes(task.id) &&
                          <small className="los-tree-saved-status">Vastaus tallennettu</small>}
                      </button>
                  </li>)}
                </ul>}
              </li>;
            })}
          </ul>}
        </li>;
      })}
    </ul>
    {found.length===0&&<p className="los-tree-empty">Hakua vastaavaa kappaletta, osiota tai tehtävää ei löytynyt.</p>}
    <p className="los-tree-note">Sisältöpuu näyttää olemassa olevat tehtävät. Avaaminen ei merkitse tehtävää tehdyksi.</p>
  </div>;
}
