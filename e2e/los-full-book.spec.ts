import {expect,test} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import {expectNoHorizontalOverflow} from "./helpers";

/**
 * Local-only UI fixture, NEVER an authentication or cloud security test.
 * Uses the existing reader's already-supported offline owner cache, and only
 * on loopback. Does not hit or bypass the production auth endpoint.
 */
async function enterLocalBook(page:import("@playwright/test").Page){
 await page.addInitScript(()=>{
  if(!["localhost","127.0.0.1"].includes(window.location.hostname))return;
  window.localStorage.setItem("opk.device-authorized","Arthur");
  window.localStorage.setItem("opk.owner-id","00000000-0000-4000-8000-000000000195");
 });
 await page.goto("/los#/1/01/chapter",{waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-book-workspace")).toBeVisible({timeout:30_000});
}


const chapters=["01","02","03","04","05","06","07","08","09","10"] as const;
const openChapter=async(page:import("@playwright/test").Page,ch:string,section:string)=>{
 await page.goto("/los#/1/"+ch+"/"+section,{waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-book-paper")).toBeVisible();
};

test("all ten chapters provide complete Text B readers inside the book, not link-only placeholders",async({page})=>{
 await enterLocalBook(page);
 for(const chapter of chapters){
  await openChapter(page,chapter,"text-b");
  await expect(page.locator("fieldset.los-c01-question")).toHaveCount(4);
  const sourceLinks=page.locator(".los-secondary-source a[href^='https://']");
  await expect(sourceLinks.first()).toBeVisible();
  if(chapter==="07"){
   await expect(page.getByRole("heading",{name:"Kirjainrivi lausunnan tueksi"})).toBeVisible();
  }else{
   await expect(page.locator(".los-secondary-source .los-c01-turn").first()).toBeVisible();
  }
  if(chapter==="08"){
   await expect(page.getByText("Haastattelun ääni ei ole vielä käytettävissä.")).toBeVisible();
  }else{
   await expect(page.locator(".los-secondary-source audio").first()).toBeVisible();
  }
  await expectNoHorizontalOverflow(page);
 }
});
test("all ten culture pages render sourced explanations, original diagrams and three responsive exercises",async({page})=>{
 await enterLocalBook(page);
 for(const chapter of chapters){
  await openChapter(page,chapter,"culture");
  await expect(page.locator(".los-culture-exercises")).toBeVisible();
  await expect(page.locator(".los-culture-exercises fieldset.los-c01-question")).toHaveCount(3);
  await expect(page.locator(".los-culture-diagram svg")).toBeVisible();
  await expect(page.locator(".los-culture-editorial a[href^='https://']")).toHaveCount(1);
  await expectNoHorizontalOverflow(page);
 }
});
test("clearing chapter practice does not delete saved Text B or culture answers",async({page})=>{
 await enterLocalBook(page);
 await openChapter(page,"01","text-b");
 const sourceAnswer=page.locator(".los-secondary-source fieldset.los-c01-question").first();
 await sourceAnswer.locator("input[type='radio']").first().check();
 await sourceAnswer.getByRole("button",{name:"Tarkista vastaus"}).click();
 await expect(sourceAnswer.getByRole("status")).toBeVisible();
 await openChapter(page,"01","culture");
 const cultureAnswer=page.locator(".los-culture-exercises fieldset.los-c01-question").first();
 await cultureAnswer.locator("input[type='radio']").first().check();
 await cultureAnswer.getByRole("button",{name:"Tarkista vastaus"}).click();
 await expect(cultureAnswer.getByRole("status")).toBeVisible();
 await openChapter(page,"01","practice");
 const exercise=page.locator(".los-workbook-question").first();
 await exercise.locator("input[type='radio']").first().check();
 await page.getByRole("button",{name:/Tyhjennä vain tämän harjoitussarjan vastaukset/}).click();
 await expect(exercise.locator("input[type='radio']").first()).not.toBeChecked();
 await openChapter(page,"01","text-b");
 await expect(page.locator(".los-secondary-source fieldset.los-c01-question").first()
  .locator("input[type='radio']").first()).toBeChecked();
 await openChapter(page,"01","culture");
 await expect(page.locator(".los-culture-exercises fieldset.los-c01-question").first()
  .locator("input[type='radio']").first()).toBeChecked();
 await page.reload({waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-culture-exercises fieldset.los-c01-question").first()
  .locator("input[type='radio']").first()).toBeChecked();
});
test("C01 real original token highlight, C08 gated video and responsive exercise frame",async({page})=>{
 await enterLocalBook(page);
 await openChapter(page,"01","practice");
 const highlight=page.locator("#RICH-C01-HIGHLIGHT");
 await expect(highlight).toBeVisible();
 await highlight.getByRole("button",{name:"Moin!"}).click();
 await highlight.getByRole("button",{name:"Tarkista harjoitus"}).click();
 await expect(highlight).toContainText("Oikein.");
 await page.reload({waitUntil:"domcontentloaded"});
 await expect(page.locator("#RICH-C01-HIGHLIGHT")).toContainText("Oikein.");
 await openChapter(page,"08","practice");
 const video=page.locator("#RICH-C08-VIDEO");
 await expect(video).toBeVisible();
 await expect(video).toContainText("Videotehtävää ei ole avattu.");
 await expect(video.locator("input")).toHaveCount(0);
 await expectNoHorizontalOverflow(page);
});


test("every one of the 60 guided lessons opens from its actual chapter picker on iPhone and desktop",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los#/1/path",{waitUntil:"domcontentloaded"});
 const runner=page.locator("#los-lesson-runner");
 await expect(runner).toBeVisible();
 const sections=runner.locator(".los-lesson-chapter-picker button");
 await expect(sections).toHaveCount(13);
 const seen=new Set<string>();
 for(let i=0;i<13;i++){
  await sections.nth(i).click();
  const lessonButtons=runner.locator(".los-lesson-picker button");
  const count=await lessonButtons.count();
  expect(count).toBeGreaterThan(0);
  for(let j=0;j<count;j++){
   const button=lessonButtons.nth(j);
   const title=(await button.innerText()).trim();
   expect(title).toMatch(/^L\d{3}$/);
   expect(seen.has(title)).toBe(false);
   seen.add(title);
   await button.click();
   await expect(runner.locator(".los-lesson-detail .los-overline")).toContainText(title);
   await expect(runner.locator(".los-lesson-steps li").first()).toBeVisible();
   await expect(runner.locator(".los-lesson-exit")).toBeVisible();
   await expect(runner.getByRole("button",{name:"Merkitse oppitunti suoritetuksi"})).toBeDisabled();
  }
 }
 expect(seen.size).toBe(60);
 for(let n=1;n<=60;n++)expect(seen.has("L"+String(n).padStart(3,"0"))).toBe(true);
 await expect(runner.locator(".los-lesson-progress")).toContainText("0/60 suoritettu");
 await page.reload({waitUntil:"domcontentloaded"});
 await expect(page.locator("#los-lesson-runner .los-lesson-detail .los-overline")).toContainText("L060");
 await expectNoHorizontalOverflow(page);
});


test("search finds actual C08 German source dialogue and Finnish meaning without leaving LOS!",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los#/1/search",{waitUntil:"domcontentloaded"});
 const search=page.getByPlaceholder("Hae sanaa, kappaletta tai kielioppia");
 await expect(search).toBeVisible();
 await search.fill("Was studierst du?");
 const hit=page.locator(".los-search-results li button").filter({hasText:"C08"}).first();
 await expect(hit).toContainText("Teksti B");
 await hit.click();
 await expect(page).toHaveURL(/\/los#\/1\/08\/text-b$/);
 await expect(page.locator(".los-secondary-source .los-c01-turns")).toContainText("Was studierst du?");
 await page.goto("/los#/1/search",{waitUntil:"domcontentloaded"});
 const second=page.getByPlaceholder("Hae sanaa, kappaletta tai kielioppia");
 await second.fill("Minun nimeni on");
 await expect(page.locator(".los-search-results li").first()).toContainText("Alkuperäisteksti");
 await expectNoHorizontalOverflow(page);
});

test("book cover opens real L001 and remembers its position",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los#/1/overview");
 const start=page.getByRole("button",{name:"Aloita nollasta"});
 await expect(start).toBeVisible();
 await start.click();
 const lesson=page.locator("#los-lesson-runner .los-lesson-detail .los-overline");
 await expect(lesson).toContainText("L001");
 await page.reload();
 await expect(lesson).toContainText("L001");
 await expectNoHorizontalOverflow(page);
});

test("book cover resumes next unfinished lesson after completing L001",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los#/1/path");
 const runner=page.locator("#los-lesson-runner");
 await expect(runner).toBeVisible();
 for(let i=0;i<3;i++){
  await runner.getByRole("button",{name:"Tein tämän vaiheen"}).first().click();
 }
 await runner.getByLabel("Napautan sanaa lukijassa.").check();
 await runner.getByRole("button",{name:"Palauta lopputarkistus"}).click();
 await runner.getByRole("button",{name:"Merkitse oppitunti suoritetuksi"}).click();
 await expect(runner).toContainText("L001 suoritettu");
 await page.goto("/los#/1/overview");
 const next=page.getByRole("button",{name:"Jatka oppituntia L002"});
 await expect(next).toBeVisible();
 await next.click();
 await expect(page.locator("#los-lesson-runner .los-lesson-detail .los-overline")).toContainText("L002");
});

test("legacy facsimile and PDF.js links safely open the digital reader",async({page})=>{
 await enterLocalBook(page);
 for(const legacy of ["facsimile","facsimile-pdf","facsimile-c02","facsimile-c03","facsimile-c04"]){
  await page.goto("/los#/1/"+legacy,{waitUntil:"domcontentloaded"});
  await expect(page).toHaveURL(new RegExp("#/1/overview$"));
  await expect(page.getByRole("heading",{name:"Tutustu ja ihastu saksan kieleen"})).toBeVisible();
  await expect(page.locator(".los-facs-reader")).toHaveCount(0);
 }
 await page.reload({waitUntil:"domcontentloaded"});
 await expect(page).toHaveURL(new RegExp("#/1/overview$"));
});

test("U1/U3: chapter tree links to persisted exercise and shared IPA word card on desktop and iPhone",async({page,isMobile})=>{
 await enterLocalBook(page);
 if(isMobile){
  await page.locator(".los-top-toc").click();
 }
 const tree=page.locator(".los-content-tree");
 await expect(tree).toBeVisible();
 await expect(tree.locator(".los-tree-chapter")).toHaveCount(10);
 const practice=tree.locator("#los-tree-children-01").getByRole("button",{name:"Avaa harjoittele-osion tehtävät"});
 await practice.click();
 const first=tree.locator("#los-tree-task-list-01-practice button").first();
 await expect(first).toBeVisible();
 await first.click();
 await expect(page).toHaveURL(/C01-EX-01$/);
 await expect(page.locator("#C01-EX-01")).toBeVisible();
 await page.reload({waitUntil:"domcontentloaded"});
 await expect(page.locator("#C01-EX-01")).toBeVisible();
 await page.goto("/los#/1/01/text",{waitUntil:"domcontentloaded"});
 const token=page.locator(".los-c01-reader .los-c01-token").first();
 await expect(token).toBeVisible();
 await token.click();
 const card=page.getByRole("dialog",{name:/sanan .* selitys/i});
 await expect(card).toBeVisible();
 await expect(card).toContainText("Kappaleen kontekstimerkitys");
 await expect(card).toContainText("IPA");
 // An unavailable published dictionary must not replace the chapter gloss.
 const lookup=card.getByRole("button",{name:"Hae julkaistusta yleissanakirjasta"});
 await expect(lookup).toBeVisible();
 await lookup.click();
 await expect(card.locator(".los-dictionary-remote-status"))
   .toContainText(/(?:hakua ei ole käytettävissä|Julkaistun aineiston osumat|ei löytynyt osumia)/i,{timeout:10_000});
 await expect(card).toContainText("Kappaleen kontekstimerkitys");
 await card.getByRole("button",{name:"Sulje sanan selitys"}).click();
 await expect(card).toHaveCount(0);
 await expect(token).toBeFocused();
 await expectNoHorizontalOverflow(page);
});

test("U3 Book + exercises reuses saved C01 answer and remains usable on both layouts",async({page,isMobile})=>{
 await enterLocalBook(page);
 await page.goto("/los#/1/01/text",{waitUntil:"domcontentloaded"});
 const open=page.getByRole("button",{name:"Kirja + tehtävät"});
 await expect(open).toBeVisible();
 await open.click();
 const panel=page.locator("#los-split-workbook");
 await expect(panel).toBeVisible();
 await expect(panel.getByRole("heading",{name:"Harjoittele"})).toBeVisible();
 if(isMobile)await expect(panel).toHaveAttribute("role","dialog");
 const answer=panel.locator("#C01-EX-01 input[type='radio'][value='Guten Morgen!']");
 await answer.check();
 await expect(answer).toBeChecked();
 await panel.getByRole("button",{name:"Sulje",exact:true}).click();
 await expect(panel).toHaveCount(0);
 await expect(open).toBeFocused();
 await page.goto("/los#/1/01/practice",{waitUntil:"domcontentloaded"});
 await expect(page.locator("#C01-EX-01 input[type='radio'][value='Guten Morgen!']")).toBeChecked();
 await page.reload({waitUntil:"domcontentloaded"});
 await expect(page.locator("#C01-EX-01 input[type='radio'][value='Guten Morgen!']")).toBeChecked();
 await expectNoHorizontalOverflow(page);
});

test("U4 C01 teaches greetings and pronunciation without requiring prior German",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los#/1/01/chapter",{waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-opening-lead")).toContainText("aivan nollasta");
 await page.goto("/los#/1/01/grammar",{waitUntil:"domcontentloaded"});
 const guide=page.locator(".los-c01-grammar-guide");
 await expect(guide).toBeVisible();
 await expect(guide.getByRole("heading",{name:/Aloitat aivan nollasta/})).toBeVisible();
 await expect(guide.getByRole("heading",{name:/Näin luet Franzin ja Jörgin keskustelua/})).toBeVisible();
 await expect(guide.locator(".los-c01-greetings-table tbody tr")).toHaveCount(8);
 await expect(guide.locator(".los-c01-phonetics article")).toHaveCount(4);
 await expect(guide).toContainText("ei arvostella automaattisesti");
 await expect(guide).toContainText("synteettinen");
 await expectNoHorizontalOverflow(page);
});

test("U3 hierarchy has all eight real books and does not invent unpublished chapters",async({page,isMobile})=>{
 await enterLocalBook(page);
 if(isMobile)await page.locator(".los-top-toc").click();
 const root=page.locator(".los-tree-books");
 await root.locator("summary").click();
 await expect(root.locator("li")).toHaveCount(8);
 await expect(root.getByRole("button",{name:/LOS! 8/})).toContainText("Ei vielä kappalesisältöä");
 await root.getByRole("button",{name:/LOS! 2/}).click();
 await expect(page).toHaveURL(/\/los#\/2\/overview$/);
 await expect(page.locator(".los-book-workspace")).toBeVisible();
 await expectNoHorizontalOverflow(page);
});

test("U3 section pager advances inside a chapter without changing saved task answers",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los#/1/01/chapter",{waitUntil:"domcontentloaded"});
 const pager=page.getByRole("navigation",{name:"Siirry kappaleen edelliseen tai seuraavaan osioon"});
 await expect(pager.getByRole("button",{name:/Seuraava osio Teksti A/})).toBeVisible();
 await pager.getByRole("button",{name:/Seuraava osio Teksti A/}).click();
 await expect(page).toHaveURL(/\/los#\/1\/01\/text$/);
 await expect(page.locator(".los-c01-reader")).toBeVisible();
 await page.getByRole("button",{name:/Seuraava osio Ymmärrä/}).click();
 await expect(page).toHaveURL(/\/los#\/1\/01\/understand$/);
 await page.reload({waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-section-pager")).toBeVisible();
 await expectNoHorizontalOverflow(page);
});

test("U3 content-tree open/closed state persists per book without changing chapter progress",async({page,isMobile})=>{
 await enterLocalBook(page);
 await page.goto("/los#/1/01/chapter",{waitUntil:"domcontentloaded"});
 if(isMobile)await page.locator(".los-top-toc").click();
 const second=page.locator('.los-content-tree .los-tree-chapter-head > button[aria-controls="los-tree-children-02"]');
 await expect(second).toHaveAttribute("aria-expanded","false");
 await second.click();
 await expect(second).toHaveAttribute("aria-expanded","true");
 await page.waitForFunction(()=>{
   const owner=localStorage.getItem("opk.owner-id");
   if(!owner)return false;
   const value=localStorage.getItem(`los.navigation.u1.${owner}.1`);
   try{return Boolean(value&&JSON.parse(value).expandedChapters?.["02"]===true);}
   catch{return false;}
 });
 await page.reload({waitUntil:"domcontentloaded"});
 if(isMobile)await page.locator(".los-top-toc").click();
 const after=page.locator('.los-content-tree .los-tree-chapter-head > button[aria-controls="los-tree-children-02"]');
 await expect(after).toHaveAttribute("aria-expanded","true");
 await after.click();
 await expect(after).toHaveAttribute("aria-expanded","false");
 await page.waitForFunction(()=>{
   const owner=localStorage.getItem("opk.owner-id");
   const value=owner&&localStorage.getItem(`los.navigation.u1.${owner}.1`);
   try{return Boolean(value&&JSON.parse(value).expandedChapters?.["02"]===false);}
   catch{return false;}
 });
 await page.reload({waitUntil:"domcontentloaded"});
 if(isMobile)await page.locator(".los-top-toc").click();
 await expect(page.locator('.los-content-tree .los-tree-chapter-head > button[aria-controls="los-tree-children-02"]'))
   .toHaveAttribute("aria-expanded","false");
 await page.goto("/los#/1/path",{waitUntil:"domcontentloaded"});
 await expect(page.locator("#los-lesson-runner .los-lesson-progress")).toContainText("0/60 suoritettu");
});

test("U3 tree shows saved answer but never an unsubmitted test result",async({page,isMobile})=>{
 await enterLocalBook(page);
 await page.goto("/los#/1/01/practice",{waitUntil:"domcontentloaded"});
 const question=page.locator("#C01-EX-01");
 await question.locator("input[type='radio'][value='Guten Morgen!']").check();
 await expect(question.locator("input[type='radio'][value='Guten Morgen!']")).toBeChecked();
 if(isMobile)await page.locator(".los-top-toc").click();
 const tree=page.locator(".los-content-tree");
 await expect(tree).toBeVisible();
 await tree.locator("#los-tree-children-01").getByRole("button",{
   name:"Avaa harjoittele-osion tehtävät"
 }).click();
 const task=tree.locator("#los-tree-task-list-01-practice button").first();
 await expect(task).toContainText("Vastaus tallennettu");
 await expect(tree.locator(".los-tree-chapter").first()).not.toContainText("Kappaletesti palautettu");
 await page.reload({waitUntil:"domcontentloaded"});
 if(isMobile)await page.locator(".los-top-toc").click();
 const reloadTask=page.locator("#los-tree-task-list-01-practice button").first();
 await expect(reloadTask).toContainText("Vastaus tallennettu");
 await expectNoHorizontalOverflow(page);
});

test("U2 dictionary clearly separates remote published search from chapter vocabulary",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los#/1/dictionary",{waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-dict-search")).toBeVisible();
 const query=page.locator(".los-dict-query input");
 await expect(query).toHaveAttribute("maxlength","80");
 await query.fill("Haus");
 await expect(page.locator(".los-dict-live")).toContainText(
   /Laitetunnistus|sanakirjapalvelua|Sanakirjapalvelu|ei ole vielä käytettävissä/i,
   {timeout:10_000});
 await expect(page.getByRole("heading",{name:"Kappalesanasto"})).toBeVisible();
 await expect(page.locator(".los-index-entry").first()).toBeVisible();
 const localWord=page.locator(".los-index-entry .los-index-word-card").first();
 await localWord.click();
 const localCard=page.getByRole("dialog",{name:/sanan .* selitys/i});
 await expect(localCard).toContainText("Kappaleen kontekstimerkitys");
 await localCard.getByRole("button",{name:"Sulje sanan selitys"}).click();
 await expect(localWord).toBeFocused();
 await page.getByRole("button",{name:"Suomi → saksa"}).click();
 await expect(query).toHaveAttribute("placeholder","Esim. talo");
 await expectNoHorizontalOverflow(page);
});


test("U1/U2: a published-source result opens the shared word card without changing chapter meanings",async({page})=>{
 await page.addInitScript(()=>{
  if(!["localhost","127.0.0.1"].includes(location.hostname))return;
  localStorage.setItem("opk.device-authorized","Arthur");
  localStorage.setItem("opk.owner-id","00000000-0000-4000-8000-000000000195");
  localStorage.setItem("opk.device-token","local-e2e-fixture-only");
  localStorage.setItem("opk.device-token-expires",String(Date.now()+3_600_000));
 });
 // Stub the browser fetch boundary, not a service-worker-dependent network route.
 // The fixture is loopback-only and never publishes a real dictionary record.
 await page.addInitScript(()=>{
  if(!["localhost","127.0.0.1"].includes(location.hostname))return;
  const originalFetch=window.fetch.bind(window);
  window.fetch=(input,init)=>{
   const url=new URL(typeof input==="string"||input instanceof URL?String(input):input.url,location.href);
   if(url.pathname!=="/api/los-dictionary")return originalFetch(input,init);
   const q=url.searchParams.get("q")??"";
   const direction=url.searchParams.get("direction")??"de-fi";
   const entry={source_id:"synthetic-qa-only",source_entry_id:"haus",
    lemma:"Haus",language:"de",part_of_speech:"noun",gender:"n",source_kind:"freedict",
    license_code:"test-only",license_url:"https://example.org/license",
    evidence_url:"https://example.org/fixture",match_type:"lemma",
    senses:[{senseIndex:1,glosses:[],glossLanguage:null,formOfCandidates:[],
      translations:[{language:"fi",value:"talo"}]}],forms:[],pronunciations:[]};
   return Promise.resolve(new Response(JSON.stringify({
    status:"ready",query:q,direction,limit:20,sourcesPublished:1,
    results:q==="Haus"&&direction==="de-fi"?[entry]:[],
    note:"Synthetic local-only browser fixture",
   }),{status:200,headers:{"content-type":"application/json"}}));
  };
 });
 await page.goto("/los#/1/dictionary",{waitUntil:"domcontentloaded"});
 expect(await page.evaluate(()=>localStorage.getItem("opk.device-token")))
  .toBe("local-e2e-fixture-only");
 const query=page.locator(".los-dict-query input");
 await query.fill("Haus");
 const row=page.locator(".los-dict-search .los-dict-result");
 await expect(row).toHaveCount(1,{timeout:15_000});
 const open=row.getByRole("button",{name:"Avaa sanakortti: Haus"});
 await expect(open).toBeVisible();
 await open.click();
 const card=page.getByRole("dialog",{name:"Sanan Haus selitys"});
 await expect(card).toBeVisible();
 await expect(card).toContainText("Julkaistu lähdetietue");
 await expect(card).toContainText("talo");
 await expect(card).not.toContainText("Kappaleen kontekstimerkitys");
 await card.getByRole("button",{name:"Sulje sanan selitys"}).click();
 await expect(open).toBeFocused();
 await page.goto("/los#/1/01/text",{waitUntil:"domcontentloaded"});
 await page.locator(".los-c01-reader .los-c01-token").first().click();
 await expect(page.getByRole("dialog",{name:/sanan .* selitys/i}))
   .toContainText("Kappaleen kontekstimerkitys");
 await expectNoHorizontalOverflow(page);
});

/**
 * R9 partial automation. Axe detects a subset of WCAG 2.2 AA issues in the
 * actual reader; a green result does NOT constitute a human/device signoff.
 */
test("U1 R9: chapter content tree has no automatic WCAG A/AA violations",async({page,isMobile})=>{
 await enterLocalBook(page);
 if(isMobile) await page.locator(".los-top-toc").click();
 const tree=page.locator(".los-content-tree");
 await expect(tree).toBeVisible();
 const result=await new AxeBuilder({page})
  .include(".los-content-tree")
  .withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa","wcag22aa"])
  .analyze();
 expect(result.violations.map(v=>({id:v.id,impact:v.impact,
  elements:v.nodes.map(n=>n.target).slice(0,5)}))).toEqual([]);
});

test("U1 R9: shared C01 word card has no automatic WCAG A/AA violations",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los#/1/01/text",{waitUntil:"domcontentloaded"});
 await page.locator(".los-c01-reader .los-c01-token").first().click();
 const card=page.getByRole("dialog",{name:/Sanan .* selitys/i});
 await expect(card).toBeVisible();
 const result=await new AxeBuilder({page})
  .include(".los-dictionary-card")
  .withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa","wcag22aa"])
  .analyze();
 expect(result.violations.map(v=>({id:v.id,impact:v.impact,
  elements:v.nodes.map(n=>n.target).slice(0,5)}))).toEqual([]);
});

test("LOS! 1 sourced photos survive on all ten digital chapters",async({page})=>{
 await enterLocalBook(page);
 for(const chapter of chapters){
  await page.goto("/los#/1/"+chapter+"/chapter",{waitUntil:"domcontentloaded"});
  const figure=page.locator(".los1-digital-photo");
  await expect(figure).toBeVisible();
  await expect(figure.locator("source")).toHaveAttribute("srcset",
    new RegExp("^/los/chapters/LOS1-C"+chapter+"-.*-mobile[.]webp$"));
  await expect(figure.locator("img")).toHaveAttribute("src",
    new RegExp("^/los/chapters/LOS1-C"+chapter+"-.*-desktop[.]webp$"));
  await figure.scrollIntoViewIfNeeded();
  await expect.poll(async()=>figure.locator("img").evaluate(img=>
    img instanceof HTMLImageElement && img.complete && img.naturalWidth>0),
    {timeout:15_000}).toBe(true);
  await expect(figure.locator("figcaption a")).toHaveAttribute("href",/pexels[.]com/);
  await expectNoHorizontalOverflow(page);
 }
 await page.goto("/los#/1/01/vocabulary",{waitUntil:"domcontentloaded"});
 await expect(page.locator(".los1-visual-learning")).toBeVisible();
});

/** R10 synthetic browser storage-failure test, not a real cross-device restore signoff. */
test("R10: failed two-chapter local backup import rolls back, then safely retries",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los#/1/appendix",{waitUntil:"domcontentloaded"});
 const owner=await page.evaluate(()=>localStorage.getItem("opk.owner-id"));
 expect(owner).toBeTruthy();
 const keys=["01","02"].map(id=>`los.local.v1.${owner}.1.${id}`);
 const before=await page.evaluate(keys=>keys.map(key=>localStorage.getItem(key)),keys);
 const draft=(note:string)=>({version:1,note,applicationDraft:"",bookmarked:true,
  practiceAnswers:{},practiceChecked:[],testAnswers:{},testSubmittedAt:null,
  selfAssessment:"",updatedAt:new Date().toISOString()});
 const backup={format:"los-book-backup-v1",bookId:1,exportedAt:new Date().toISOString(),
  chapters:{"01":draft("R10 first chapter"),"02":draft("R10 second chapter")}};
 const file={name:"LOS-1-test-only.json",mimeType:"application/json",buffer:Buffer.from(JSON.stringify(backup))};
 await page.locator(".los-backup-upload input[type=file]").setInputFiles(file);
 await expect(page.locator(".los-backup-preview")).toBeVisible();
 await page.evaluate(failKey=>{
  const real=Storage.prototype.setItem;
  Reflect.set(window,"__losBackupOriginalSetItem",real);
  Storage.prototype.setItem=function(key,value){
   if(key===failKey)throw new DOMException("synthetic failure","QuotaExceededError");
   return real.call(this,key,value);
  };
 },keys[1]);
 await page.getByRole("button",{name:/Tuo vain puuttuvat/}).click();
 await expect(page.locator(".los-backup-status")).toContainText("Tuonti keskeytyi");
 const after=await page.evaluate(keys=>{
  const state=keys.map(key=>localStorage.getItem(key));
  const real=Reflect.get(window,"__losBackupOriginalSetItem") as typeof Storage.prototype.setItem;
  Storage.prototype.setItem=real;
  return state;
 },keys);
 expect(after).toEqual(before);
 await page.getByRole("button",{name:/Tuo vain puuttuvat/}).click();
 await expect(page.locator(".los-backup-status")).toContainText("Tuotu 2 tallennuskohdetta");
 await page.reload({waitUntil:"domcontentloaded"});
 const restored=await page.evaluate(keys=>keys.map(key=>JSON.parse(localStorage.getItem(key)??"null")?.note),keys);
 expect(restored).toEqual(["R10 first chapter","R10 second chapter"]);
});

/** R10: even a chapter with only practiceChecked IDs must survive JSON export. */
test("R10: checked-only chapter work survives backup export and blocks missing-only overwrite",async({page})=>{
 await enterLocalBook(page);
 const key="los.local.v1.00000000-0000-4000-8000-000000000195.1.03";
 const draft={
  version:1,note:"",applicationDraft:"",bookmarked:false,
  practiceAnswers:{},practiceChecked:["C03-PRACTICE-01"],
  testAnswers:{},testSubmittedAt:null,selfAssessment:"",updatedAt:new Date().toISOString(),
 };
 await page.evaluate(({key,draft})=>localStorage.setItem(key,JSON.stringify(draft)),{key,draft});
 await page.goto("/los#/1/appendix",{waitUntil:"domcontentloaded"});
 const downloadPromise=page.waitForEvent("download");
 await page.getByRole("button",{name:"Vie koko LOS! 1:n varmuuskopio"}).click();
 const downloaded=await downloadPromise;
 const {readFile}=await import("node:fs/promises");
 const backup=JSON.parse(await readFile(await downloaded.path(),"utf8"));
 expect(backup.chapters["03"].practiceChecked).toEqual(["C03-PRACTICE-01"]);
 const incoming={
  ...backup,exportedAt:new Date().toISOString(),
  chapters:{"03":{...draft,note:"incoming would overwrite checked-only work",practiceChecked:[]}},
 };
 await page.locator(".los-backup-upload input[type=file]").setInputFiles({
  name:"r10-checked-only.json",mimeType:"application/json",
  buffer:Buffer.from(JSON.stringify(incoming)),
 });
 await expect(page.locator(".los-backup-preview")).toContainText("1 tallennuskohteessa on jo omia tallennuksia");
 await expect(page.getByRole("button",{name:/Tuo vain puuttuvat/})).toBeDisabled();
 const stored=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)??"null"),key);
 expect(stored.practiceChecked).toEqual(["C03-PRACTICE-01"]);
 expect(stored.note).toBe("");
});

test("LOS! 1 culture and vocabulary photos are usable as recall tasks on mobile and desktop",async({page})=>{
 await enterLocalBook(page);
 await openChapter(page,"03","culture");
 const culture=page.locator(".los1-visual-learning");
 await expect(culture).toBeVisible();
 const gallery=page.locator(".los1-culture-gallery");
 await expect(gallery.locator(".los1-culture-gallery-card")).toHaveCount(2);
 await expect(gallery).toContainText("Wien, Österreich");
 await expect(gallery).toContainText("Thun, die Schweiz");
 await expect(gallery.locator("picture img").first()).toHaveAttribute("src",/LOS1-C03-CULTURE-6063650-desktop[.]webp$/);
 await expect(gallery.locator("figcaption a")).toHaveCount(2);
 await expect(culture.locator("picture img")).toHaveCount(0);
 const reveal=culture.getByRole("button",{name:"Näytä mallifraasit"});
 await expect(reveal).toHaveAttribute("aria-expanded","false");
 await expect(culture.locator(".los1-visual-learning-phrases li")).toHaveCount(0);
 await reveal.click();
 await expect(culture.getByRole("button",{name:"Piilota mallifraasit"})).toHaveAttribute("aria-expanded","true");
 await expect(culture.locator(".los1-visual-learning-phrases li")).toHaveCount(3);
 await expect(culture.locator(".los1-visual-learning-phrases")).toContainText("Österreich");
 await culture.getByRole("button",{name:"Piilota mallifraasit"}).click();
 await expect(culture.locator(".los1-visual-learning-phrases li")).toHaveCount(0);
 await openChapter(page,"06","vocabulary");
 const vocabulary=page.locator(".los1-visual-learning");
 await expect(vocabulary).toBeVisible();
 await vocabulary.getByRole("button",{name:"Näytä mallifraasit"}).click();
 await expect(vocabulary.locator(".los1-visual-learning-phrases li")).toHaveCount(3);
 await expect(vocabulary.locator(".los1-visual-learning-phrases")).toContainText("siebzehn");
 await expect(vocabulary).toContainText("ikiä ei päätellä");
 await openChapter(page,"04","culture");
 await expect(page.locator(".los1-visual-learning")).toBeVisible();
 await openChapter(page,"01","culture");
 await expect(page.locator(".los1-visual-learning")).toHaveCount(0);
 await expect(page.locator(".los1-culture-gallery-card")).toHaveCount(1);
 await expect(page.locator(".los1-culture-gallery")).toContainText("Hamburg");
 await openChapter(page,"08","culture");
 await expect(page.locator(".los1-culture-gallery-card")).toHaveCount(1);
 await expect(page.locator(".los1-culture-gallery")).toContainText("Havainnekuva");
 await openChapter(page,"02","culture");
 await expect(page.locator(".los1-culture-gallery")).toHaveCount(0);
 await expectNoHorizontalOverflow(page);
});

test("four new culture photos are locally served, decoded and credited on desktop and iPhone",async({page})=>{
 await enterLocalBook(page);
 for(const [chapter,photos] of [["01",["29250831"]],["03",["6063650","32379758"]],["08",["5427660"]]] as const){
   await openChapter(page,chapter,"culture");
   const gallery=page.locator(".los1-culture-gallery");
   await expect(gallery).toBeVisible();
   await expect(gallery.locator(".los1-culture-gallery-card")).toHaveCount(photos.length);
   const images=gallery.locator("picture img");
   for(let i=0;i<photos.length;i++){
     const image=images.nth(i);
     await expect(image).toHaveAttribute("src",new RegExp(photos[i]+"-desktop[.]webp$"));
     await image.scrollIntoViewIfNeeded();
     await expect.poll(async()=>image.evaluate(el=>(el as HTMLImageElement).naturalWidth),
       {timeout:15_000}).toBeGreaterThan(0);
     await expect(gallery.locator("picture source").nth(i)).toHaveAttribute(
       "srcset",new RegExp(photos[i]+"-mobile[.]webp$"));
   }
   await expectNoHorizontalOverflow(page);
 }
});

test("C04, C07 and C09 culture pages use three new self-hosted photographs with truthful source captions",async({page})=>{
 await enterLocalBook(page);
 for(const [chapter,id,expected] of [
   ["04","6925914","Ein Gespräch am Empfang"],
   ["07","30125064","Düsseldorfer Straße"],
   ["09","6170644","Die Woche planen"],
 ] as const){
   await openChapter(page,chapter,"culture");
   const gallery=page.locator(".los1-culture-gallery");
   await expect(gallery).toBeVisible();
   await expect(gallery.locator(".los1-culture-gallery-card")).toHaveCount(1);
   await expect(gallery).toContainText(expected);
   const picture=gallery.locator("picture");
   const img=picture.locator("img");
   await expect(img).toHaveAttribute("src",new RegExp(
     "LOS1-C"+chapter+"-CULTURE-"+id+"-desktop[.]webp$"));
   await expect(picture.locator("source")).toHaveAttribute("srcset",new RegExp(
     "LOS1-C"+chapter+"-CULTURE-"+id+"-mobile[.]webp$"));
   await img.scrollIntoViewIfNeeded();
   await expect.poll(async()=>img.evaluate(el=>(el as HTMLImageElement).naturalWidth),
     {timeout:15_000}).toBeGreaterThan(0);
   await expect(gallery.locator("figcaption a")).toHaveAttribute("href",/pexels[.]com/);
   const lesson=page.locator(".los1-visual-learning");
   await expect(lesson).toBeVisible();
   await expect(lesson.locator("picture")).toHaveCount(0);
   await lesson.getByRole("button",{name:"Näytä mallifraasit"}).click();
   await expect(lesson.locator(".los1-visual-learning-phrases li")).toHaveCount(3);
   await expectNoHorizontalOverflow(page);
 }
 await openChapter(page,"07","culture");
 await expect(page.locator(".los1-culture-gallery")).toContainText("Straße");
 await openChapter(page,"09","culture");
 await expect(page.locator(".los1-culture-gallery")).toContainText("eikä lähde vahvista saksankielistä kalenteria");
});
