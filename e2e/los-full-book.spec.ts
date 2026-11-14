import {expect,test} from "@playwright/test";
import {getLosTeacherLesson} from "../src/features/los/teacher/lessonRegistry.ts";
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
  if(chapter==="07"){
   // The alphabet audio is intentionally gated pending source/device approval.
   await expect(page.getByText("C07:n aakkosäänite odottaa hyväksyntää.")).toBeVisible();
   await expect(page.locator(".los-secondary-source audio")).toHaveCount(0);
  }else if(chapter==="08"){
   await expect(page.getByText("Haastattelun ääni ei ole vielä käytettävissä.")).toBeVisible();
   await expect(page.locator(".los-secondary-source audio")).toHaveCount(0);
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


/**
 * Keep the full 60-lesson coverage while dividing actual route openings into
 * independent batches. WebKit can otherwise hit the 180s test timeout despite
 * successfully rendering individual teacher lessons. The picker still lists
 * and validates all 60 unique IDs in every batch.
 */
for(const [start,end] of [[1,20],[21,40],[41,60]] as const){
 test(`all 60 guided lessons are selectable; L${String(start).padStart(3,"0")}-L${String(end).padStart(3,"0")} open from the real chapter picker`,async({page})=>{
  test.setTimeout(210_000);
  await enterLocalBook(page);
  await page.goto("/los#/1/path",{waitUntil:"domcontentloaded"});
  const runner=page.locator("#los-lesson-runner");
  await expect(runner).toBeVisible();
  const sections=runner.locator(".los-lesson-chapter-picker button");
  await expect(sections).toHaveCount(13);
  const allTitles=new Set<string>();
  const opened=new Set<string>();
  for(let i=0;i<13;i++){
   await sections.nth(i).click();
   const lessonButtons=runner.locator(".los-lesson-picker button");
   const count=await lessonButtons.count();
   expect(count).toBeGreaterThan(0);
   for(let j=0;j<count;j++){
    const button=lessonButtons.nth(j);
    const title=(await button.innerText()).trim();
    expect(title).toMatch(/^L\d{3}$/);
    expect(allTitles.has(title)).toBe(false);
    allTitles.add(title);
    const number=Number(title.slice(1));
    if(number<start||number>end)continue;
    expect(opened.has(title)).toBe(false);
    opened.add(title);
    await button.click();
    if(getLosTeacherLesson(title)){
     await expect(page).toHaveURL(new RegExp("/los-lessons/"+title+"$"));
     await expect(page.locator(".los-teacher-paper h2")).toBeVisible();
     await expect(page.locator(".los-teacher-sidebar h1")).toBeVisible();
     await page.goto("/los#/1/path",{waitUntil:"domcontentloaded"});
     await expect(runner).toBeVisible();
     await expect(sections).toHaveCount(13);
     await sections.nth(i).click();
    }else{
     await expect(runner.locator(".los-lesson-detail .los-overline")).toContainText(title);
     await expect(runner.locator(".los-lesson-steps li").first()).toBeVisible();
     await expect(runner.locator(".los-lesson-exit")).toBeVisible();
     await expect(runner.getByRole("button",{name:"Merkitse oppitunti suoritetuksi"})).toBeDisabled();
    }
   }
  }
  expect(allTitles.size).toBe(60);
  for(let n=1;n<=60;n++)expect(allTitles.has("L"+String(n).padStart(3,"0"))).toBe(true);
  expect(opened.size).toBe(end-start+1);
  for(let n=start;n<=end;n++)expect(opened.has("L"+String(n).padStart(3,"0"))).toBe(true);
  await expect(runner.locator(".los-lesson-progress")).toContainText("0/60 suoritettu");
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(page.locator("#los-lesson-runner .los-lesson-picker button").last()).toContainText("L060");
  await expectNoHorizontalOverflow(page);
 });
}

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
 await expect(page).toHaveURL(/\/los-lessons\/L001$/);
 const lesson=page.locator(".los-teacher-paper h2");
 await expect(lesson).toContainText("Tervetuloa ensimmäiselle");
 await page.getByRole("button",{name:"Seuraava"}).click();
 await expect(lesson).toContainText("Ensimmäiset kolme");
 await page.reload({waitUntil:"domcontentloaded"});
 await expect(lesson).toContainText("Ensimmäiset kolme");
 await expectNoHorizontalOverflow(page);
});

test("book cover resumes next unfinished lesson after completing L001",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los-lessons/L001",{waitUntil:"domcontentloaded"});
 const paper=page.locator(".los-teacher-paper");
 const outline=page.locator(".los-teacher-outline nav button");
 await expect(outline).toHaveCount(10);
 for(let i=0;i<10;i++){
  await outline.nth(i).click();
  if(i===3)await paper.locator(".los-teacher-option").filter({hasText:"Hallo!"}).click();
  if(i===4)await paper.getByRole("button",{name:"Kokeilin sanaselitystä ja lukijan käyttöä kirjassa"}).click();
  if(i===6)await paper.getByRole("button",{name:"Kokeilin äänentoistoa tai totesin, ettei äänite ollut saatavilla"}).click();
  if(i===7){
   await paper.locator(".los-teacher-reflection textarea").fill("Haluan osata tervehtiä saksaksi itsenäisesti.");
   await paper.getByRole("button",{name:"Tallenna oma oppimistavoitteeni"}).click();
  }
  if(i===8)await paper.locator(".los-teacher-option").filter({hasText:"Napautan sanaa lukijassa."}).click();
 }
 await expect(paper.getByRole("button",{name:"Merkitse oppitunti läpikäydyksi"})).toBeEnabled();
 await paper.getByRole("button",{name:"Merkitse oppitunti läpikäydyksi"}).click();
 await expect(paper).toContainText("Oppitunti merkitty suoritetuksi");
 await page.goto("/los#/1/overview",{waitUntil:"domcontentloaded"});
 const next=page.getByRole("button",{name:"Jatka oppituntia L002"});
 await expect(next).toBeVisible();
 await next.click();
 await expect(page).toHaveURL(/\/los-lessons\/L002$/);
 await expect(page.locator(".los-teacher-sidebar h1")).toContainText("Aloita saksan ääntämisestä");
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
 await expect(guide).toContainText("Malliääni puuttuu");
 await expectNoHorizontalOverflow(page);
});

test("U3 hierarchy links to all eight books and shows later chapters as editorial drafts",async({page,isMobile})=>{
 await enterLocalBook(page);
 if(isMobile)await page.locator(".los-top-toc").click();
 const root=page.locator(".los-tree-books");
 await root.locator("summary").click();
 await expect(root.locator("li")).toHaveCount(8);
 await expect(root.getByRole("button",{name:/LOS! 8/})).not.toContainText("Ei vielä kappalesisältöä");
 await root.getByRole("button",{name:/LOS! 2/}).click();
 await expect(page).toHaveURL(/\/los#\/2\/overview$/);
 await expect(page.locator(".los-book-workspace")).toBeVisible();
 await expect(page.locator(".los-tree-chapter")).toHaveCount(10);
 await page.goto("/los#/2/01/text",{waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-book-paper")).toContainText("Sisältöesikatselu, ei valmis oppikirja");
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


test("L004 Teacher 2.0 opens from the study path and preserves its scene when reading the book",async({page})=>{
  await enterLocalBook(page);
  await page.goto("/los#/1/path",{waitUntil:"domcontentloaded"});
  const row=page.locator(".los-path-group li button").filter({hasText:"Tervehdykset muistista"});
  await expect(row).toHaveCount(1);
  await row.click();
  await expect(page).toHaveURL(/\/los-lessons\/L004$/);
  await expect(page.locator(".los-teacher-paper h2").first()).toContainText("Tänään opit");

  await page.getByRole("button",{name:"Seuraava"}).click();
  await expect(page.locator(".los-teacher-paper h2").first()).toContainText("Mitä muistat");
  await page.locator(".los-teacher-option").filter({hasText:"Hallo!"}).click();
  await expect(page.locator(".los-teacher-feedback")).toContainText("Oikein");
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-teacher-paper h2").first()).toContainText("Mitä muistat");
  await expect(page.locator(".los-teacher-feedback")).toContainText("Oikein");

  await page.getByRole("button",{name:/Avaa oppikirjan sanasto ja tehtävät/}).click();
  const bookLink=page.getByRole("link",{name:/Avaa kirjassa/}).first();
  await expect(bookLink).toHaveAttribute("target","_blank");
  await expect(bookLink).toHaveAttribute("href",/lessonReturn=L004.*vocabulary/);
  await page.goto("/los?lessonReturn=L004#/1/01/vocabulary",{waitUntil:"domcontentloaded"});
  await page.getByRole("link",{name:"Palaa oppitunnille L004"}).click();
  await expect(page).toHaveURL(/\/los-lessons\/L004$/);
  await expect(page.locator(".los-teacher-paper h2").first()).toContainText("Avaa oppikirjan sanasto ja tehtävät");
  await expectNoHorizontalOverflow(page);
});



test("Teacher 2.0 presents one teaching board with one set of controls", async ({page}) => {
  await enterLocalBook(page);
  await page.goto("/los-lessons/L004", {waitUntil:"domcontentloaded"});
  const teachingScene=page.locator(".los-teacher-outline nav button").filter({
    hasText:"Katsotaan ilmaukset opetustaululla"
  });
  await teachingScene.click();
  const paper=page.locator(".los-teacher-paper");
  await expect(paper.getByRole("heading",{name:"Katsotaan ilmaukset opetustaululla"})).toBeVisible();
  const board=paper.locator(".los-teacher-board");
  await expect(board).toHaveCount(1);
  await expect(board.locator(".los-teacher-board-item")).toHaveCount(1);
  await expect(board.getByRole("button",{name:"Näytä seuraava"})).toHaveCount(1);
  await board.getByRole("button",{name:"Näytä seuraava"}).click();
  await expect(board.locator(".los-teacher-board-item")).toHaveCount(2);
  await board.getByRole("button",{name:"Näytä kaikki"}).click();
  await expect(board.locator(".los-teacher-board-item")).toHaveCount(7);
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-teacher-board")).toHaveCount(1);
  await expectNoHorizontalOverflow(page);
});













test("Finnish comprehension options in C01, C03, C09 and C10 have correct speech language",async({page})=>{
  await enterLocalBook(page);
  const targets=[
    ["L001","Viimeinen tarkistus: osaatko käyttää lukijaa?","Napautan sanaa lukijassa."],
    ["L013","Etsi lähdemaan merkitys","Hän on kotoisin Saksasta."],
    ["L047","Mihin Greta lähtee?","Menevänsä kotiin"],
    ["L052","Etsi tarkka alkuperä","Münchenistä"],
  ] as const;
  for(const [lessonId,sceneTitle,correctAnswer] of targets){
    const lesson=getLosTeacherLesson(lessonId);
    expect(lesson,"Teacher lesson must exist: "+lessonId).toBeDefined();
    // Use the canonical scene data to disambiguate the lesson's real navigation.
    // The old exact role-name selector did not account for the outline's step number
    // and confused similar scene titles, without reaching the actual question.
    const sceneIndex=lesson!.scenes.findIndex(scene=>
      scene.title===sceneTitle && scene.question?.type==="choice" &&
      scene.question.options?.some(option=>option.label===correctAnswer));
    expect(sceneIndex,"Expected Finnish comprehension scene in "+lessonId).toBeGreaterThanOrEqual(0);
    await page.goto("/los-lessons/"+lessonId,{waitUntil:"domcontentloaded"});
    const outline=page.locator(".los-teacher-outline nav button");
    await expect(outline).toHaveCount(lesson!.scenes.length);
    await outline.nth(sceneIndex).click();
    await expect(page.locator(".los-teacher-paper h2")).toHaveText(sceneTitle);
    await expect(page.locator(".los-teacher-option span[lang='fi']")).toHaveCount(3);
    await expect(page.locator(".los-teacher-option span[lang='de']")).toHaveCount(0);
    await expect(page.locator(".los-teacher-option").filter({hasText:correctAnswer})
      .locator("span[lang='fi']")).toBeVisible();
    await expectNoHorizontalOverflow(page);
  }
  await page.goto("/los-lessons/L001",{waitUntil:"domcontentloaded"});
  await page.locator(".los-teacher-outline nav").getByRole("button",{name:"Ymmärsitkö tervehdyksen ja hyvästelyn eron?"}).click();
  await expect(page.locator(".los-teacher-option span[lang='de']")).toHaveCount(3);
  await expect(page.locator(".los-teacher-option span[lang='fi']")).toHaveCount(0);
});




test("a renamed teacher scene resumes saved unfinished work without erasing history",async({page})=>{
  await enterLocalBook(page);
  const key="los.local.v1.00000000-0000-4000-8000-000000000195.1.01";
  const at="2026-11-10T15:00:00.000Z";
  const historical={
    schemaVersion:1,lessonId:"L004",contentVersion:"1.9.0-preview.1",
    sceneId:"retired-teaching-scene",visitedIds:["welcome","recall"],
    attempts:[{sceneId:"recall",answer:"b",correct:true,independent:true,at}],
    helpedIds:["guided"],revealedIds:[],activityIds:["vocabulary-reviewed"],
    draftAnswers:{independent:"Guten Abend!"},
    completedAt:null,updatedAt:at,paused:false,
  };
  const draft={
    version:1,note:"",applicationDraft:"",bookmarked:false,practiceAnswers:{},
    practiceChecked:[],testAnswers:{},testSubmittedAt:null,selfAssessment:"",
    teacherSessions:{L004:historical},updatedAt:at,
  };
  await page.evaluate(({key,draft})=>localStorage.setItem(key,JSON.stringify(draft)),{key,draft});
  await page.goto("/los-lessons/L004",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-teacher-paper h2")).toHaveText("Tervehdys valitaan tilanteen mukaan");
  await expect(page.locator(".los-teacher-paper .los-teacher-hint[role='status']")).toContainText(
    "Aiempi opetustilanne ei enää ole käytössä");
  await expect(page.locator(".los-teacher-paper .los-teacher-hint[role='status']")).toContainText(
    "Aiemmat vastaukset ja luonnokset säilyvät");
  await page.getByRole("button",{name:"Seuraava",exact:true}).click();
  await expect(page.locator(".los-teacher-paper h2")).toHaveText("Katsotaan ilmaukset opetustaululla");
  const stored=await page.evaluate(key=>
    JSON.parse(localStorage.getItem(key)??"null")?.teacherSessions?.L004,key);
  expect(stored.sceneId).toBe("board");
  expect(stored.contentVersion).toBe("1.9.0-preview.1");
  expect(stored.visitedIds).toEqual(["welcome","recall","situations","board"]);
  expect(stored.attempts).toEqual(historical.attempts);
  expect(stored.draftAnswers.independent).toBe("Guten Abend!");
  expect(stored.activityIds).toEqual(["vocabulary-reviewed"]);
  expect(stored.helpedIds).toEqual(["guided"]);
  expect(stored.completedAt).toBeNull();
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-teacher-paper h2")).toHaveText("Katsotaan ilmaukset opetustaululla");
  await expectNoHorizontalOverflow(page);
});


test("C07 number choices have Finnish screen-reader language in both number lessons",async({page})=>{
  await enterLocalBook(page);
  await page.goto("/los-lessons/L038",{waitUntil:"domcontentloaded"});
  await page.locator(".los-teacher-outline nav").getByRole("button",{name:"Muistatko lukusanat?"}).click();
  const first=page.locator(".los-teacher-option");
  await expect(first).toHaveCount(3);
  await expect(first.locator("span[lang='fi']")).toHaveCount(3);
  await expect(first.locator("span[lang='de']")).toHaveCount(0);
  await expectNoHorizontalOverflow(page);
  await page.goto("/los-lessons/L039",{waitUntil:"domcontentloaded"});
  await page.locator(".los-teacher-outline nav").getByRole("button",{name:"Mikä numero kirjoitetaan?"}).click();
  const second=page.locator(".los-teacher-option");
  await expect(second).toHaveCount(3);
  await expect(second.locator("span[lang='fi']")).toHaveCount(3);
  await expect(second.locator("span[lang='de']")).toHaveCount(0);
  await expectNoHorizontalOverflow(page);
});

test("C08 screen-reader language follows the actual Finnish or German answer",async({page})=>{
  await enterLocalBook(page);
  await page.goto("/los-lessons/L042",{waitUntil:"domcontentloaded"});
  let outline=page.locator(".los-teacher-outline nav");
  await outline.getByRole("button",{name:"Miten toimia vaikean tekstin äärellä?"}).click();
  const finnish=page.locator(".los-teacher-option").filter({hasText:"Etsin tutut sanat"});
  await expect(finnish.locator("span[lang='fi']")).toHaveCount(1);
  await expect(page.locator(".los-teacher-option span[lang='de']")).toHaveCount(0);
  await expectNoHorizontalOverflow(page);

  await page.goto("/los-lessons/L043",{waitUntil:"domcontentloaded"});
  outline=page.locator(".los-teacher-outline nav");
  await outline.getByRole("button",{name:"Pyydä hidastamaan"}).click();
  const german=page.locator(".los-teacher-option").filter({hasText:"Bitte langsamer."});
  await expect(german.locator("span[lang='de']")).toHaveCount(1);
  await expect(page.locator(".los-teacher-option span[lang='fi']")).toHaveCount(0);
  await expectNoHorizontalOverflow(page);
});


test("stepwise teaching boards begin collapsed after directly switching scenes",async({page})=>{
  await enterLocalBook(page);
  await page.goto("/los-lessons/L032",{waitUntil:"domcontentloaded"});
  const outline=page.locator(".los-teacher-outline nav");
  await outline.getByRole("button",{name:"Opetustaulu: 13–20"}).click();
  await expect(page.locator(".los-teacher-board-item")).toHaveCount(1);
  await page.getByRole("button",{name:"Näytä kaikki",exact:true}).click();
  await expect(page.locator(".los-teacher-board-item")).toHaveCount(8);
  await outline.getByRole("button",{name:"Opettaja rakentaa ikäilmaisun"}).click();
  await expect(page.locator(".los-teacher-board-item")).toHaveCount(1);
  await expect(page.locator(".los-teacher-board-label")).toContainText("1/7");
  await page.getByRole("button",{name:"Näytä seuraava"}).click();
  await expect(page.locator(".los-teacher-board-item")).toHaveCount(2);
  await expectNoHorizontalOverflow(page);
});


test("digits-only L039 answer uses a numeric keypad without German character shortcuts",async({page})=>{
  await enterLocalBook(page);
  await page.goto("/los-lessons/L039",{waitUntil:"domcontentloaded"});
  await page.locator(".los-teacher-outline nav").getByRole("button",{name:"Ymmärrä uusi numerosarja"}).click();
  await expect(page.locator(".los-teacher-question h3")).toContainText("Kirjoita numerosarja numeroina");
  const answer=page.locator(".los-teacher-question input");
  await expect(answer).toHaveAttribute("inputmode","numeric");
  await expect(page.locator("label[for='los-teacher-answer']")).toContainText("Vastauksesi numeroin");
  await expect(page.locator(".los-teacher-special-keys")).toHaveCount(0);
  await answer.fill("4062");
  await page.getByRole("button",{name:"Tarkista",exact:true}).click();
  await expect(page.locator(".los-teacher-feedback.is-right")).toContainText("Vier = 4");
  await expectNoHorizontalOverflow(page);
});


test("C08 through final review teach the task and describe German time without invented certainty",async({page})=>{
  await enterLocalBook(page);

  await page.goto("/los-lessons/L043",{waitUntil:"domcontentloaded"});
  let outline=page.locator(".los-teacher-outline nav");
  await outline.getByRole("button",{name:"Näin kerrot ymmärtäneesi ja kiität"}).click();
  await expect(page.locator(".los-teacher-paper")).toContainText("Danke, jetzt verstehe ich.");
  await outline.getByRole("button",{name:"Lisäselitys auttaa eteenpäin"}).click();
  await page.locator(".los-teacher-option").filter({hasText:"Danke, jetzt verstehe ich."}).click();
  await expect(page.locator(".los-teacher-feedback.is-right")).toContainText("Keskustelu päättyy ymmärrykseen");
  await expectNoHorizontalOverflow(page);

  await page.goto("/los-lessons/L047",{waitUntil:"domcontentloaded"});
  outline=page.locator(".los-teacher-outline nav");
  await outline.getByRole("button",{name:"Koko Text A · seitsemän puheenvuoroa"}).click();
  await expect(page.locator(".los-teacher-paper")).toContainText("ei yksin kerro");
  await outline.getByRole("button",{name:"Tunnista kaksi aikaa"}).click();
  await page.locator(".los-teacher-option").filter({hasText:"14.45"}).click();
  await expect(page.locator(".los-teacher-feedback.is-right")).toContainText("iltapäiväoletuksella");
  await expectNoHorizontalOverflow(page);

  await page.goto("/los-lessons/L057",{waitUntil:"domcontentloaded"});
  await page.locator(".los-teacher-outline nav").getByRole("button",{
    name:"Yhdistä tervehdys, nimi ja lähtömaa ilman sanastoa"
  }).click();
  await expect(page.locator(".los-teacher-question h3")).toContainText("huutomerkillä tai pilkulla");
  await page.locator(".los-teacher-question input").fill("Hallo, ich heiße Mia. Ich komme aus Finnland.");
  await page.getByRole("button",{name:"Tarkista",exact:true}).click();
  await expect(page.locator(".los-teacher-feedback.is-right")).toBeVisible();
  await expectNoHorizontalOverflow(page);
});


test("C07 teaches spelling requests before L036 application and hides the answer in L038",async({page})=>{
  await enterLocalBook(page);
  await page.goto("/los-lessons/L036",{waitUntil:"domcontentloaded"});
  const outline=page.locator(".los-teacher-outline nav");
  await outline.getByRole("button",{name:"Pyydä nimen tavaamista kohteliaasti"}).click();
  await expect(page.locator(".los-teacher-paper")).toContainText("Bitte buchstabieren Sie.");
  await expect(page.locator(".los-teacher-paper")).toContainText("Opettele tässä kokonainen valmis ilmaus");
  await outline.getByRole("button",{name:"Nimikysymys ja tavaus eri tilanteissa"}).click();
  await expect(page.locator(".los-teacher-question h3")).toContainText("haluat nimen kirjaimittain");
  await page.getByRole("button",{name:/Bitte buchstabieren Sie\./}).click();
  await expect(page.locator(".los-teacher-feedback.is-right")).toContainText("kohtelias tavaamispyyntö");
  await expectNoHorizontalOverflow(page);

  await page.goto("/los-lessons/L038",{waitUntil:"domcontentloaded"});
  await page.locator(".los-teacher-outline nav").getByRole("button",{name:"Kirjoita oikein ilman mallia"}).click();
  const question=page.locator(".los-teacher-question h3");
  await expect(question).toContainText("Täydennä lause du");
  await expect(question).not.toContainText("heißt");
  await page.locator(".los-teacher-question input").fill("heißt");
  await page.getByRole("button",{name:"Tarkista",exact:true}).click();
  await expect(page.locator(".los-teacher-feedback.is-right")).toContainText("ß-kirjaimella");
  await expectNoHorizontalOverflow(page);
});


test("L034 explains Franz's age and the intentionally short age answer",async({page})=>{
  await enterLocalBook(page);
  await page.goto("/los-lessons/L034",{waitUntil:"domcontentloaded"});
  const outline=page.locator(".los-teacher-outline nav");
  await outline.getByRole("button",{name:"Kuinka vanha Franz on?"}).click();
  await expect(page.locator(".los-teacher-question h3")).toContainText("Kirjoita numeroin: Franzin neunzehn");
  await page.locator(".los-teacher-question input").fill("18");
  await page.getByRole("button",{name:"Tarkista",exact:true}).click();
  await expect(page.locator(".los-teacher-feedback.is-wrong")).toContainText("Franzin ikää numeroin");
  await outline.getByRole("button",{name:"Leon ikä lyhyenä lauseena"}).click();
  await expect(page.locator(".los-teacher-question h3")).toContainText("ilman Jahre alt -osaa");
  await page.getByRole("button",{name:"Tarvitsen vihjeen"}).click();
  await expect(page.locator(".los-teacher-hint")).toContainText("Jätä Jahre alt pois");
  await outline.getByRole("button",{name:"Lopputarkistus: zwanzig numerona"}).click();
  await expect(page.locator(".los-teacher-question h3")).toContainText("Kirjoita numeroin: zwanzig");
  await page.getByRole("button",{name:"Tarvitsen vihjeen"}).click();
  await expect(page.locator(".los-teacher-hint")).toContainText("Kirjoita pelkkä numero");
  await expectNoHorizontalOverflow(page);
});


test("C06 lessons L032 and L035 show feedback for the actual number or age question",async({page})=>{
  await enterLocalBook(page);
  await page.goto("/los-lessons/L032",{waitUntil:"domcontentloaded"});
  const outline=page.locator(".los-teacher-outline nav");
  await outline.getByRole("button",{name:"Lopputarkistus: siebzehn numerona"}).click();
  await expect(page.locator(".los-teacher-question h3")).toContainText("Kirjoita numeroin: siebzehn");
  await page.getByRole("button",{name:"Tarvitsen vihjeen"}).click();
  await expect(page.locator(".los-teacher-hint")).toContainText("Kirjoita vastaukseksi numero");
  await expectNoHorizontalOverflow(page);

  await page.goto("/los-lessons/L035",{waitUntil:"domcontentloaded"});
  const review=page.locator(".los-teacher-outline nav");
  await review.getByRole("button",{name:"Kertaa zwölf numerona"}).click();
  await expect(page.locator(".los-teacher-question h3")).toContainText("Kirjoita numeroin: zwölf");
  await page.getByRole("button",{name:"Tarvitsen vihjeen"}).click();
  await expect(page.locator(".los-teacher-hint")).toContainText("Vastaa pelkällä numerolla");
  await review.getByRole("button",{name:"Sano ikä kokonaisella lauseella"}).click();
  await expect(page.locator(".los-teacher-question h3")).toContainText("Olen 20-vuotias");
  await page.getByRole("button",{name:"Tarvitsen vihjeen"}).click();
  await expect(page.locator(".los-teacher-hint")).toContainText("Ich bin");
  await expectNoHorizontalOverflow(page);
});


test("L033 keeps tens feedback separate from the 21–99 word-building rule",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los-lessons/L033",{waitUntil:"domcontentloaded"});
 const outline=page.locator(".los-teacher-outline nav");
 await outline.getByRole("button",{name:"Muistatko luvun 20?"}).click();
 await expect(page.locator(".los-teacher-question h3")).toContainText("Kirjoita saksaksi: 20");
 await page.locator(".los-teacher-question input").fill("zwanz");
 await page.getByRole("button",{name:"Tarkista",exact:true}).click();
 await expect(page.locator(".los-teacher-feedback.is-wrong")).toContainText("Luku 20 ei muodostu yksiköistä");
 await outline.getByRole("button",{name:"Lopputarkistus: dreißig"}).click();
 await expect(page.locator(".los-teacher-question h3")).toContainText("Kirjoita saksaksi: 30");
 await page.getByRole("button",{name:"Tarvitsen vihjeen"}).click();
 await expect(page.locator(".los-teacher-hint")).toContainText("Kolmekymmentä alkaa drei-");
 await expect(page.locator(".los-teacher-hint")).not.toContainText("Hajota luku yksiköihin");
 await expectNoHorizontalOverflow(page);
});


test("L031 teaches eins before the first number question and gives specific feedback",async({page})=>{
  await enterLocalBook(page);
  await page.goto("/los-lessons/L031",{waitUntil:"domcontentloaded"});
  const heading=page.locator(".los-teacher-paper h2");
  await expect(heading).toContainText("Saksan numerot alkavat nollasta");
  await page.getByRole("button",{name:"Seuraava",exact:true}).click();
  await expect(heading).toContainText("Ensimmäiset luvut 0–6");
  await page.getByRole("button",{name:"Seuraava",exact:true}).click();
  await expect(heading).toContainText("Opettaja näyttää 0–6");
  await page.getByRole("button",{name:"Seuraava",exact:true}).click();
  await expect(heading).toContainText("Mitä eins tarkoittaa numeroin?");
  const answer=page.locator(".los-teacher-question input");
  await answer.fill("1");
  await page.getByRole("button",{name:"Tarkista",exact:true}).click();
  await expect(page.locator(".los-teacher-feedback.is-right")).toContainText("Eins tarkoittaa yhtä");
  await expectNoHorizontalOverflow(page);
});


test("Teacher 2.0 explains exactly why an unfinished lesson cannot be completed", async ({page}) => {
  await enterLocalBook(page);
  await page.goto("/los-lessons/L004", {waitUntil:"domcontentloaded"});
  const outline=page.locator(".los-teacher-outline nav");
  await outline.getByRole("button",{name:"Mitä opit tänään?"}).click();
  const summary=page.locator(".los-teacher-summary");
  await expect(summary).toBeVisible();
  await expect(summary.locator(".los-teacher-completion-checklist")).toBeVisible();
  await expect(summary.locator(".los-teacher-completion-checklist")).toContainText("C01-EX-01");
  await expect(summary.locator(".los-teacher-completion-checklist")).toContainText("C01-EX-04");
  await expect(summary.locator(".los-teacher-completion-checklist")).toContainText("Vastaa oppitunnin kysymyksiin");
  await expect(summary.getByRole("button",{name:"Merkitse oppitunti läpikäydyksi"})).toBeDisabled();
  await summary.getByRole("button",{name:"Siirry seuraavaan keskeneräiseen vaiheeseen"}).click();
  await expect(page.locator(".los-teacher-paper h2")).toContainText("Mitä muistat edellisiltä tunneilta?");
  await expect(page.locator(".los-teacher-summary")).toHaveCount(0);
  await expectNoHorizontalOverflow(page);
});


test("L004 chapter picker uses the dedicated teacher instead of legacy checklist", async ({page}) => {
  await enterLocalBook(page);
  await page.goto("/los#/1/path", { waitUntil: "domcontentloaded" });
  const teacherChoice = page.locator(".los-lesson-picker button").filter({hasText:"L004"});
  await expect(teacherChoice).toHaveCount(1);
  await teacherChoice.click();
  await expect(page).toHaveURL(/\/los-lessons\/L004$/);
  await expect(page.locator(".los-teacher-paper h2").first()).toContainText("Tänään opit");
  await expectNoHorizontalOverflow(page);
});


test("L001 Teacher 2.0 stores a genuine beginner goal and returns from the book without losing place",async({page})=>{
  await enterLocalBook(page);
  await page.goto("/los#/1/path",{waitUntil:"domcontentloaded"});
  const start=page.locator(".los-lesson-picker button").filter({hasText:"L001"});
  await start.click();
  await expect(page).toHaveURL(/\/los-lessons\/L001$/);
  await expect(page.locator(".los-teacher-paper h2").first()).toContainText("Tervetuloa ensimmäiselle");

  await page.locator(".los-teacher-outline nav button").filter({hasText:"Mitä haluat osata ensimmäiseksi?"}).click();
  const goal=page.locator(".los-teacher-reflection textarea");
  await expect(goal).toBeVisible();
  const save=page.getByRole("button",{name:"Tallenna oma oppimistavoitteeni"});
  await expect(save).toBeDisabled();
  await goal.fill("Haluan oppia tervehtimään ja kertomaan nimeni saksaksi.");
  await expect(save).toBeEnabled();
  await save.click();
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-teacher-paper h2").first()).toContainText("Mitä haluat osata ensimmäiseksi?");
  await expect(goal).toHaveValue("Haluan oppia tervehtimään ja kertomaan nimeni saksaksi.");
  await expect(page.getByText("Harjoittelu vahvistettu")).toBeVisible();

  await page.locator(".los-teacher-outline nav button").filter({hasText:"Oppitunti ja oppikirja tekevät eri asiat"}).click();
  const book=page.getByRole("link",{name:/Avaa kirjassa/}).first();
  await expect(book).toHaveAttribute("target","_blank");
  await expect(book).toHaveAttribute("href",/lessonReturn=L001.*text/);
  await page.goto("/los?lessonReturn=L001#/1/01/text",{waitUntil:"domcontentloaded"});
  await page.getByRole("link",{name:"Palaa oppitunnille L001"}).click();
  await expect(page).toHaveURL(/\/los-lessons\/L001$/);
  await expect(page.locator(".los-teacher-paper h2").first()).toContainText("Oppitunti ja oppikirja tekevät eri asiat");
  await expectNoHorizontalOverflow(page);
});


test("L002 pronunciation lesson gives targeted corrections and opens grammar in the textbook",async({page})=>{
  await enterLocalBook(page);
  await page.goto("/los#/1/path",{waitUntil:"domcontentloaded"});
  await page.locator(".los-lesson-picker button").filter({hasText:"L002"}).click();
  await expect(page).toHaveURL(/\/los-lessons\/L002$/);
  await page.locator(".los-teacher-outline nav button").filter({hasText:"Arvaatko saksan w-kirjaimen äänen?"}).click();
  await page.locator(".los-teacher-option").filter({hasText:"Englannin w-äännettä"}).click();
  await expect(page.locator(".los-teacher-feedback")).toContainText("Saksan tavallinen w");
  await page.locator(".los-teacher-option").filter({hasText:"Suomen v-äännettä"}).click();
  await expect(page.locator(".los-teacher-feedback")).toContainText("Oikein");
  await page.locator(".los-teacher-outline nav button").filter({hasText:"Tarkista säännöt kirjan omasta ääntämisosiosta"}).click();
  await expect(page.getByRole("link",{name:/Avaa kirjassa/}).first()).toHaveAttribute("href",/lessonReturn=L002.*grammar/);
  await expectNoHorizontalOverflow(page);
});


test("L003 original dialogue reading preserves checked source answers across book and teacher",async({page})=>{
  await enterLocalBook(page);
  await page.goto("/los#/1/path",{waitUntil:"domcontentloaded"});
  await page.locator(".los-lesson-picker button").filter({hasText:"L003"}).click();
  await expect(page).toHaveURL(/\/los-lessons\/L003$/);
  await expect(page.locator(".los-teacher-paper h2").first()).toContainText("Ensimmäinen oikea");

  await page.locator(".los-teacher-outline nav button").filter({hasText:"Tee kirjan kaksi oikeaa ymmärtämistehtävää"}).click();
  await expect(page.getByRole("link",{name:/Avaa kirjassa/}).first()).toHaveAttribute("href",/lessonReturn=L003.*understand/);
  await page.goto("/los?lessonReturn=L003#/1/01/understand",{waitUntil:"domcontentloaded"});
  const questions=page.locator(".los-c01-question");
  await questions.nth(0).locator('input[value="a"]').check();
  await questions.nth(0).getByRole("button",{name:"Tarkista vastaus"}).click();
  await questions.nth(1).locator('input[value="b"]').check();
  await questions.nth(1).getByRole("button",{name:"Tarkista vastaus"}).click();
  await page.getByRole("link",{name:"Palaa oppitunnille L003"}).click();
  await expect(page).toHaveURL(/\/los-lessons\/L003$/);
  await expect(page.locator(".los-teacher-paper")).toContainText("C01-SOURCE-Q01: Vastaus tallennettu ja tarvittaessa tarkistettu");
  await expect(page.locator(".los-teacher-paper")).toContainText("C01-SOURCE-Q02: Vastaus tallennettu ja tarvittaessa tarkistettu");
  await expectNoHorizontalOverflow(page);
});


test("L005 Teacher uses the real Text B transcript and checked book answers, never claims listening from text",async({page})=>{
  await enterLocalBook(page);
  await page.goto("/los#/1/path",{waitUntil:"domcontentloaded"});
  await page.locator(".los-lesson-picker button").filter({hasText:"L005"}).click();
  await expect(page).toHaveURL(/\/los-lessons\/L005$/);
  await expect(page.locator(".los-teacher-paper h2").first()).toContainText("Tervehdykset kuuluvat");
  await page.locator(".los-teacher-outline nav button").filter({hasText:"Avaa koko alkuperäinen tervehdysluettelo"}).click();
  const textB=page.getByRole("link",{name:/Avaa kirjassa/}).first();
  await expect(textB).toHaveAttribute("href",/lessonReturn=L005.*text-b/);
  await expect(textB).toHaveAttribute("target","_blank");
  await page.goto("/los?lessonReturn=L005#/1/01/text-b",{waitUntil:"domcontentloaded"});
  await expect(page.getByText("Koko 28 sekunnin German Men92")).toBeVisible();
  const checks=page.locator(".los-secondary-source .los-c01-question");
  await expect(checks).toHaveCount(4);
  await checks.nth(0).locator('input[value="b"]').check();
  await checks.nth(0).getByRole("button",{name:"Tarkista vastaus"}).click();
  await checks.nth(1).locator('input[value="a"]').check();
  await checks.nth(1).getByRole("button",{name:"Tarkista vastaus"}).click();
  await page.getByRole("link",{name:"Palaa oppitunnille L005"}).click();
  await expect(page).toHaveURL(/\/los-lessons\/L005$/);
  await expect(page.locator(".los-teacher-paper")).toContainText("C01-TEXTB-Q01: Vastaus tallennettu ja tarvittaessa tarkistettu");
  await expect(page.locator(".los-teacher-paper")).toContainText("C01-TEXTB-Q02: Vastaus tallennettu ja tarvittaessa tarkistettu");
  await page.locator(".los-teacher-outline nav button").filter({hasText:"Vertaa ilmausluetteloa Franzin ja Jörgin keskusteluun"}).click();
  await page.goto("/los?lessonReturn=L005#/1/01/understand",{waitUntil:"domcontentloaded"});
  const source=page.locator(".los-c01-question");
  await source.nth(2).locator('input[value="c"]').check();
  await source.nth(2).getByRole("button",{name:"Tarkista vastaus"}).click();
  await source.nth(3).locator('input[value="a"]').check();
  await source.nth(3).getByRole("button",{name:"Tarkista vastaus"}).click();
  await page.getByRole("link",{name:"Palaa oppitunnille L005"}).click();
  await expect(page.locator(".los-teacher-paper")).toContainText("C01-SOURCE-Q03: Vastaus tallennettu ja tarvittaessa tarkistettu");
  await expect(page.locator(".los-teacher-paper")).toContainText("C01-SOURCE-Q04: Vastaus tallennettu ja tarvittaessa tarkistettu");
  await page.locator(".los-teacher-outline nav button").filter({hasText:"Osaat valita tervehdyksen tilanteen perusteella"}).click();
  await expect(page.getByRole("button",{name:"Merkitse oppitunti läpikäydyksi"})).toBeDisabled();
  await expect(page.locator(".los-teacher-paper")).toContainText("Jos ääni oli käytettävissä");
  await expectNoHorizontalOverflow(page);
});


test("L006 uses the existing submitted C01 exam and student self-assessment, not a second quiz",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los#/1/path",{waitUntil:"domcontentloaded"});
 await page.locator(".los-lesson-picker button").filter({hasText:"L006"}).click();
 await expect(page).toHaveURL(/\/los-lessons\/L006$/);
 await expect(page.locator(".los-teacher-paper h2")).toContainText("Kertaus ja kappaletesti");
 const outline=page.locator(".los-teacher-outline nav button");
 await outline.filter({hasText:"Palauta C01:n 12 osatehtävän testi"}).click();
 await expect(page.locator(".los-teacher-assessment-status")).toContainText("0/12 vastattu");
 await expect(page.locator(".los-teacher-assessment-status")).toContainText("Ei vielä palautettu");
 const link=page.getByRole("link",{name:/Avaa kirjassa/}).first();
 await expect(link).toHaveAttribute("href",/lessonReturn=L006.*\/01\/test/);
 await page.goto("/los?lessonReturn=L006#/1/01/test",{waitUntil:"domcontentloaded"});
 const questions=page.locator(".los-workbook-question");
 await expect(questions).toHaveCount(12);
 for(let i=0;i<12;i++){
  const item=questions.nth(i);
  const radios=item.locator('input[type="radio"]');
  if(await radios.count())await radios.first().check();
  else await item.locator('input[type="text"]').fill("x");
 }
 await page.locator(".los-test-submit button").click();
 await expect(page.locator(".los-test-result")).toContainText("TESTI PALAUTETTU");
 await page.locator("#los-self-01").fill("Tervehdys onnistui, mutta hyvästelyn muotoa harjoittelen vielä.");
 await page.goto("/los?lessonReturn=L006#/1/01/apply",{waitUntil:"domcontentloaded"});
 await page.locator("#los-application-01").fill("Guten Morgen!\\nTschüss!");
 await page.getByRole("link",{name:"Palaa oppitunnille L006"}).click();
 await expect(page).toHaveURL(/\/los-lessons\/L006$/);
 await outline.filter({hasText:"Palauta C01:n 12 osatehtävän testi"}).click();
 const status=page.locator(".los-teacher-assessment-status");
 await expect(status).toContainText("12/12 vastattu");
 await expect(status).toContainText("Palautettu");
 await expect(status).toContainText("Itsearviointi: Kirjattu");
 await expect(status).toContainText("Oma sovellus: Teksti tallennettu");
 await outline.filter({hasText:"C01 on kerrattu"}).click();
 await expect(page.getByRole("button",{name:"Merkitse oppitunti läpikäydyksi"})).toBeDisabled();
 await expectNoHorizontalOverflow(page);
});


test("L007 Teacher reads C02 draft only, never C01 answers",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los-lessons/L007",{waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-teacher-sidebar h1")).toContainText("Miten kysyn nimen?");
 const outline=page.locator(".los-teacher-outline nav button");
 await outline.filter({hasText:"Etsi nimifraasit kirjan sanastosta ja kieliopista"}).click();
 const paper=page.locator(".los-teacher-paper");
 await expect(paper).toContainText("C02-EX-01: Vastaus vielä puuttuu");
 const bookLink=page.getByRole("link",{name:/Avaa kirjassa/}).last();
 await expect(bookLink).toHaveAttribute("href",/lessonReturn=L007.*\/02\/practice/);
 await page.goto("/los?lessonReturn=L007#/1/02/practice",{waitUntil:"domcontentloaded"});
 await expect(page.locator("#C02-EX-01")).toBeVisible();
 await page.locator('#C02-EX-01 input[value="Ich heiße Greta."]').check();
 await page.getByRole("link",{name:"Palaa oppitunnille L007"}).click();
 await expect(page).toHaveURL(/\/los-lessons\/L007$/);
 await outline.filter({hasText:"Etsi nimifraasit kirjan sanastosta ja kieliopista"}).click();
 await expect(paper).toContainText("C02-EX-01: Vastaus tallennettu ja tarvittaessa tarkistettu");
 await expect(paper).toContainText("C02-EX-02: Vastaus vielä puuttuu");
 await page.goto("/los-lessons/L006",{waitUntil:"domcontentloaded"});
 const c01outline=page.locator(".los-teacher-outline nav button");
 await c01outline.filter({hasText:"Palauta C01:n 12 osatehtävän testi"}).click();
 await expect(page.locator(".los-teacher-assessment-status")).toContainText("0/12 vastattu");
 await expectNoHorizontalOverflow(page);
});


test("L008 checks the real C02 source answers and preserves them across the book/teacher roundtrip",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los-lessons/L008",{waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-teacher-sidebar h1")).toContainText("Franz ja Greta");
 const outline=page.locator(".los-teacher-outline nav button");
 await outline.filter({hasText:"Tee ja tarkista neljä oikeaa lähdetekstikysymystä"}).click();
 const paper=page.locator(".los-teacher-paper");
 await expect(paper).toContainText("C02-SOURCE-Q01: Vastaus vielä puuttuu");
 const link=page.getByRole("link",{name:/Avaa kirjassa/}).first();
 await expect(link).toHaveAttribute("href",/lessonReturn=L008.*\/02\/understand/);
 await page.goto("/los?lessonReturn=L008#/1/02/understand",{waitUntil:"domcontentloaded"});
 const fieldsets=page.locator(".los-c01-question");
 await expect(fieldsets).toHaveCount(5);
 const keys=["a","b","a","b"];
 for(let i=0;i<4;i++){
  await fieldsets.nth(i).locator('input[value="'+keys[i]+'"]').check();
  await fieldsets.nth(i).getByRole("button",{name:"Tarkista vastaus"}).click();
 }
 await page.getByRole("link",{name:"Palaa oppitunnille L008"}).click();
 await expect(page).toHaveURL(/\/los-lessons\/L008$/);
 await outline.filter({hasText:"Tee ja tarkista neljä oikeaa lähdetekstikysymystä"}).click();
 for(const n of ["01","02","03","04"]){
  await expect(page.locator(".los-teacher-paper")).toContainText("C02-SOURCE-Q"+n+": Vastaus tallennettu ja tarvittaessa tarkistettu");
 }
 await outline.filter({hasText:"Olet lukenut ensimmäisen nimidialogin"}).click();
 await expect(page.getByRole("button",{name:"Merkitse oppitunti läpikäydyksi"})).toBeDisabled();
 await expectNoHorizontalOverflow(page);
});


test("L009 grammar lesson uses the four real C02 verb answers across book and Teacher",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los-lessons/L009",{waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-teacher-sidebar h1")).toContainText("Heißen ja sein");
 const outline=page.locator(".los-teacher-outline nav button");
 await outline.filter({hasText:"Tee neljä oikeaa C02:n verbiharjoitusta"}).click();
 const paper=page.locator(".los-teacher-paper");
 await expect(paper).toContainText("C02-EX-03: Vastaus vielä puuttuu");
 const link=page.getByRole("link",{name:/Avaa kirjassa/}).last();
 await expect(link).toHaveAttribute("href",/lessonReturn=L009.*\/02\/practice/);
 await page.goto("/los?lessonReturn=L009#/1/02/practice",{waitUntil:"domcontentloaded"});
 const answers=[["C02-EX-03","heiße"],["C02-EX-04","heißt"],["C02-EX-05","bin"],["C02-EX-06","bist"]];
 for(const [id,value] of answers){
  await page.locator('#'+id+' input[type="text"]').fill(value);
 }
 await page.getByRole("link",{name:"Palaa oppitunnille L009"}).click();
 await expect(page).toHaveURL(/\/los-lessons\/L009$/);
 await outline.filter({hasText:"Tee neljä oikeaa C02:n verbiharjoitusta"}).click();
 for(const [id] of answers){
  await expect(paper).toContainText(id+": Vastaus tallennettu ja tarvittaessa tarkistettu");
 }
 await outline.filter({hasText:"Osaat nyt kaksi minä–sinämuotoparia"}).click();
 await expect(page.getByRole("button",{name:"Merkitse oppitunti läpikäydyksi"})).toBeDisabled();
 await expectNoHorizontalOverflow(page);
});

test("L010 uses the actual C02 Text B answer checks, never a parallel listening score",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los-lessons/L010",{waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-teacher-sidebar h1")).toContainText("Kuuntele ja esittele henkilö");
 const outline=page.locator(".los-teacher-outline nav button");
 await outline.filter({hasText:"Tee ja tarkista kaksi Text B:n ymmärtämiskysymystä"}).click();
 const paper=page.locator(".los-teacher-paper");
 await expect(paper).toContainText("C02-MCOM02-Q01: Vastaus vielä puuttuu");
 const link=page.getByRole("link",{name:/Avaa kirjassa/}).first();
 await expect(link).toHaveAttribute("href",/lessonReturn=L010.*\/02\/text-b/);
 await page.goto("/los?lessonReturn=L010#/1/02/text-b",{waitUntil:"domcontentloaded"});
 const questions=page.locator(".los-secondary-source .los-c01-question");
 await expect(questions).toHaveCount(4);
 await questions.nth(0).locator('input[value="a"]').check();
 await questions.nth(0).getByRole("button",{name:"Tarkista vastaus"}).click();
 await questions.nth(1).locator('input[value="b"]').check();
 await questions.nth(1).getByRole("button",{name:"Tarkista vastaus"}).click();
 await page.getByRole("link",{name:"Palaa oppitunnille L010"}).click();
 await expect(page).toHaveURL(/\/los-lessons\/L010$/);
 await outline.filter({hasText:"Tee ja tarkista kaksi Text B:n ymmärtämiskysymystä"}).click();
 await expect(paper).toContainText("C02-MCOM02-Q01: Vastaus tallennettu ja tarvittaessa tarkistettu");
 await expect(paper).toContainText("C02-MCOM02-Q02: Vastaus tallennettu ja tarvittaessa tarkistettu");
 await outline.filter({hasText:"Osaat tunnistaa kaksi esittäytymistapaa"}).click();
 await expect(page.getByRole("button",{name:"Merkitse oppitunti läpikäydyksi"})).toBeDisabled();
 await expectNoHorizontalOverflow(page);
});

test("L011 uses the real C02 submitted 15-question exam and student writing",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los-lessons/L011",{waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-teacher-sidebar h1")).toContainText("Harjoittele ja testaa C02");
 const outline=page.locator(".los-teacher-outline nav button");
 await outline.filter({hasText:"Palauta oikea C02:n kappaletesti"}).click();
 const status=page.locator(".los-teacher-assessment-status");
 await expect(status).toContainText("0/15 vastattu");
 await expect(status).toContainText("Ei vielä palautettu");
 const link=page.getByRole("link",{name:/Avaa kirjassa/}).first();
 await expect(link).toHaveAttribute("href",/lessonReturn=L011.*\/02\/test/);
 await page.goto("/los?lessonReturn=L011#/1/02/test",{waitUntil:"domcontentloaded"});
 const questions=page.locator(".los-workbook-question");
 await expect(questions).toHaveCount(15);
 for(let i=0;i<15;i++){
  const item=questions.nth(i),radios=item.locator('input[type="radio"]');
  if(await radios.count())await radios.first().check();
  else await item.locator('input[type="text"]').fill("x");
 }
 await page.locator(".los-test-submit button").click();
 await expect(page.locator(".los-test-result")).toContainText("TESTI PALAUTETTU");
 await page.locator("#los-self-02").fill("Osaan kertoa nimen. Haluan kerrata du heißt ja du bist.");
 await page.goto("/los?lessonReturn=L011#/1/02/apply",{waitUntil:"domcontentloaded"});
 await page.locator("#los-application-02").fill("Ich heiße Mia.\\nWie heißt du?");
 await page.getByRole("link",{name:"Palaa oppitunnille L011"}).click();
 await expect(page).toHaveURL(/\/los-lessons\/L011$/);
 await outline.filter({hasText:"Palauta oikea C02:n kappaletesti"}).click();
 await expect(status).toContainText("15/15 vastattu");
 await expect(status).toContainText("Palautettu");
 await expect(status).toContainText("Oma sovellus: Teksti tallennettu");
 await expect(status).toContainText("Itsearviointi: Kirjattu");
 await outline.filter({hasText:"C02:n harjoitukset ja testi on tehty"}).click();
 await expect(page.getByRole("button",{name:"Merkitse oppitunti läpikäydyksi"})).toBeDisabled();
 await expectNoHorizontalOverflow(page);
});

test("L012 countries lesson shares only the C03 workbook and returns to Teacher",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los-lessons/L012",{waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-teacher-sidebar h1")).toContainText("Maat ja paikat");
 const outline=page.locator(".los-teacher-outline nav button");
 await outline.filter({hasText:"Harjoittele maiden nimet kirjassa"}).click();
 const paper=page.locator(".los-teacher-paper");
 await expect(paper).toContainText("C03-EX-03: Vastaus vielä puuttuu");
 await expect(page.getByRole("link",{name:/Avaa kirjassa/}).last()).toHaveAttribute("href",/lessonReturn=L012.*\/03\/practice/);
 await page.goto("/los?lessonReturn=L012#/1/03/practice",{waitUntil:"domcontentloaded"});
 await page.locator('#C03-EX-03 input[value="Finnland"]').check();
 await page.locator('#C03-EX-04 input[value="Deutschland"]').check();
 await page.locator('#C03-EX-05 input[value="Österreich"]').check();
 await page.getByRole("link",{name:"Palaa oppitunnille L012"}).click();
 await expect(page).toHaveURL(/\/los-lessons\/L012$/);
 await outline.filter({hasText:"Harjoittele maiden nimet kirjassa"}).click();
 for(const id of ["C03-EX-03","C03-EX-04","C03-EX-05"]){
  await expect(paper).toContainText(id+": Vastaus tallennettu ja tarvittaessa tarkistettu");
 }
 await outline.filter({hasText:"Nyt tunnistat ensimmäiset maat"}).click();
 await expect(page.getByRole("button",{name:"Merkitse oppitunti läpikäydyksi"})).toBeDisabled();
 await expectNoHorizontalOverflow(page);
});


test("L013 reads canonical Lisa M-WB-07 source, requires actual checked C03 Q01/Q02",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los-lessons/L013",{waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-teacher-sidebar h1")).toContainText("Lisa Müllerin alkuperäkeskustelu");
 const outline=page.locator(".los-teacher-outline nav button");
 await outline.filter({hasText:"Vastaa ja tarkista kaksi oikeaa lähdekysymystä"}).click();
 const paper=page.locator(".los-teacher-paper");
 await expect(paper).toContainText("C03-SOURCE-Q01: Vastaus vielä puuttuu");
 const link=page.getByRole("link",{name:/Avaa kirjassa/}).first();
 await expect(link).toHaveAttribute("href",/lessonReturn=L013.*\/03\/understand/);
 await page.goto("/los?lessonReturn=L013#/1/03/text",{waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-c01-reader")).toContainText("ich komme aus Deutschland");
 await page.goto("/los?lessonReturn=L013#/1/03/understand",{waitUntil:"domcontentloaded"});
 const questions=page.locator(".los-c01-question");
 await expect(questions).toHaveCount(5);
 await questions.nth(0).locator('input[value="a"]').check();
 await questions.nth(1).locator('input[value="b"]').check();
 await page.getByRole("link",{name:"Palaa oppitunnille L013"}).click();
 await outline.filter({hasText:"Vastaa ja tarkista kaksi oikeaa lähdekysymystä"}).click();
 await expect(paper).toContainText("C03-SOURCE-Q01: Vastaus on tallennettu, mutta se pitää vielä tarkistaa kirjassa");
 await expect(paper).toContainText("C03-SOURCE-Q02: Vastaus on tallennettu, mutta se pitää vielä tarkistaa kirjassa");
 await page.goto("/los?lessonReturn=L013#/1/03/understand",{waitUntil:"domcontentloaded"});
 const checked=page.locator(".los-c01-question");
 await checked.nth(0).getByRole("button",{name:"Tarkista vastaus"}).click();
 await checked.nth(1).getByRole("button",{name:"Tarkista vastaus"}).click();
 await page.getByRole("link",{name:"Palaa oppitunnille L013"}).click();
 await outline.filter({hasText:"Vastaa ja tarkista kaksi oikeaa lähdekysymystä"}).click();
 await expect(paper).toContainText("C03-SOURCE-Q01: Vastaus tallennettu ja tarvittaessa tarkistettu");
 await expect(paper).toContainText("C03-SOURCE-Q02: Vastaus tallennettu ja tarvittaessa tarkistettu");
 await outline.filter({hasText:"Ymmärsit autenttisen keskustelun ydintiedot"}).click();
 await expect(page.getByRole("button",{name:"Merkitse oppitunti läpikäydyksi"})).toBeDisabled();
 await expectNoHorizontalOverflow(page);
});

test("L014 teaches kommen and woher before checking real workbook grammar answers",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los-lessons/L014",{waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-teacher-sidebar h1")).toContainText("Kommen ja woher");
 const outline=page.locator(".los-teacher-outline nav button");
 await outline.filter({hasText:"Näin muodostetaan oikea kommen-verbin muoto"}).click();
 await expect(page.locator(".los-teacher-paper")).toContainText("komm + st = kommst");
 await outline.filter({hasText:"Tee kirjan neljä alkuperäistä harjoitusta"}).click();
 const paper=page.locator(".los-teacher-paper");
 await expect(paper).toContainText("C03-EX-06: Vastaus vielä puuttuu");
 await page.goto("/los?lessonReturn=L014#/1/03/practice",{waitUntil:"domcontentloaded"});
 for(const [id,answer] of [["C03-EX-06","komme"],["C03-EX-07","kommst"],["C03-EX-10","aus"],["C03-EX-13","kommst"]]){
  await page.locator("#"+id+' input[type="text"]').fill(answer);
 }
 await page.getByRole("link",{name:"Palaa oppitunnille L014"}).click();
 await outline.filter({hasText:"Tee kirjan neljä alkuperäistä harjoitusta"}).click();
 for(const id of ["C03-EX-06","C03-EX-07","C03-EX-10","C03-EX-13"]){
  await expect(paper).toContainText(id+": Vastaus tallennettu ja tarvittaessa tarkistettu");
 }
 await expectNoHorizontalOverflow(page);
});

test("L015 reuses real C03 M-COM-02 source and requires checked answers",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los-lessons/L015",{waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-teacher-sidebar h1")).toContainText("Alkuperä ja karttatehtävät");
 const outline=page.locator(".los-teacher-outline nav button");
 await outline.filter({hasText:"Tee oikeat Q02 ja Q03"}).click();
 const paper=page.locator(".los-teacher-paper");
 await expect(paper).toContainText("C03-MCOM02-Q02: Vastaus vielä puuttuu");
 await page.goto("/los?lessonReturn=L015#/1/03/text-b",{waitUntil:"domcontentloaded"});
 const questions=page.locator(".los-secondary-source .los-c01-question");
 await expect(questions).toHaveCount(4);
 await questions.nth(1).locator('input[value="b"]').check();
 await questions.nth(2).locator('input[value="c"]').check();
 await questions.nth(1).getByRole("button",{name:"Tarkista vastaus"}).click();
 await questions.nth(2).getByRole("button",{name:"Tarkista vastaus"}).click();
 await page.getByRole("link",{name:"Palaa oppitunnille L015"}).click();
 await outline.filter({hasText:"Tee oikeat Q02 ja Q03"}).click();
 await expect(paper).toContainText("C03-MCOM02-Q02: Vastaus tallennettu ja tarvittaessa tarkistettu");
 await expect(paper).toContainText("C03-MCOM02-Q03: Vastaus tallennettu ja tarvittaessa tarkistettu");
 await expectNoHorizontalOverflow(page);
});

test("L016 does not count draft C03 test as submission or as automatic mastery",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los-lessons/L016",{waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-teacher-sidebar h1")).toContainText("Harjoittele ja testaa C03");
 const outline=page.locator(".los-teacher-outline nav button");
 await outline.filter({hasText:"Palauta C03:n oikea kappaletesti"}).click();
 const status=page.locator(".los-teacher-assessment-status");
 await expect(status).toContainText("Ei vielä palautettu");
 await page.goto("/los?lessonReturn=L016#/1/03/test",{waitUntil:"domcontentloaded"});
 const items=page.locator(".los-workbook-question");
 // Await asynchronous book hydration before counting its test cards.
 await expect(items.first()).toBeVisible({timeout:30_000});
 const n=await items.count();
 expect(n).toBeGreaterThanOrEqual(10);
 await items.first().locator('input[type="radio"]').first().check();
 await page.getByRole("link",{name:"Palaa oppitunnille L016"}).click();
 await outline.filter({hasText:"Palauta C03:n oikea kappaletesti"}).click();
 await expect(status).toContainText("Ei vielä palautettu");
 // Completion is deliberately available only on the lesson's final summary
 // screen. A partly answered real book exam must not enable that button.
 await outline.filter({hasText:"C03:n opetus ja koe ovat eri suorituksia"}).click();
 await expect(page.getByRole("button",{name:"Merkitse oppitunti läpikäydyksi"})).toBeDisabled();
 await expectNoHorizontalOverflow(page);
});


test("L014 En ymmärrä exposes six authored choices and one scene-specific explanation at a time",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los-lessons/L014",{waitUntil:"domcontentloaded"});
 const outline=page.locator(".los-teacher-outline nav button");
 await outline.filter({hasText:"Miksi tarvitaan woher ja kommen?"}).click();
 await page.getByRole("button",{name:"En ymmärrä / haluan lisäselityksen"}).click();
 const choices=page.getByRole("group",{name:"Valitse lisäselityksen tapa"});
 await expect(choices.locator("button")).toHaveCount(6);
 await choices.getByRole("button",{name:"Selitä vaihe vaiheelta"}).click();
 await expect(page.locator(".los-teacher-help-entries section")).toContainText("Woher");
 await choices.getByRole("button",{name:"Näytä toinen esimerkki"}).click();
 await expect(page.locator(".los-teacher-help-entries section")).toContainText("Österreich");
 await expect(page.locator(".los-teacher-help-entries section")).not.toContainText("1. Kysy mistä");
 await expectNoHorizontalOverflow(page);
});


test("C05 Teacher 2.0 five lessons open, provide contextual help and stay readable on phone and desktop",async({page})=>{
 await enterLocalBook(page);
 for(const id of ["L022","L023","L024","L025","L026"]){
  await page.goto("/los-lessons/"+id,{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-teacher-sidebar h1")).toBeVisible();
  await expect(page.locator(".los-teacher-paper h2")).toBeVisible();
  await page.getByRole("button",{name:"En ymmärrä / haluan lisäselityksen"}).click();
  await expect(page.locator(".los-teacher-help-entries")).toBeVisible();
  await expectNoHorizontalOverflow(page);
 }
});

test("C05 Teacher scene and attempts survive pause, refresh, and resume",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los-lessons/L024",{waitUntil:"domcontentloaded"});
 const outline=page.locator(".los-teacher-outline nav button");
 await outline.filter({hasText:"Mihin nicht kuuluu?"}).click();
 await expect(page.locator(".los-teacher-paper h2")).toContainText("Mihin nicht kuuluu?");
 await page.locator(".los-teacher-option").first().click();
 await expect(page.locator(".los-teacher-feedback.is-wrong")).toContainText("nicht");
 await page.getByRole("button",{name:"Keskeytä oppitunti"}).click();
 await expect(page.locator(".los-teacher-paused")).toBeVisible();
 await page.reload({waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-teacher-paused")).toBeVisible();
 await page.getByRole("button",{name:"Jatka opetusta"}).last().click();
 await expect(page.locator(".los-teacher-paper h2")).toContainText("Mihin nicht kuuluu?");
 await expect(page.locator(".los-teacher-feedback.is-wrong")).toBeVisible();
 await expectNoHorizontalOverflow(page);
});

test("C05 Text B presents its own real candidate audio and written fallback with no listening-score claim",async({page})=>{
 await enterLocalBook(page);
 await openChapter(page,"05","text-b");
 await expect(page.locator(".los-secondary-source .los-c01-turn")).toHaveCount(6);
 await expect(page.locator('.los-secondary-source audio[src*="Dialogue_franz_greta_1.ogg"]')).toBeVisible();
 await expect(page.locator(".los-secondary-source fieldset.los-c01-question")).toHaveCount(4);
 await expect(page.locator(".los-secondary-source")).toContainText("eivät automaattiseen kuuntelupisteytykseen");
 await expectNoHorizontalOverflow(page);
});

test("C05 L023 and L026 link original source and the single existing chapter test",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los-lessons/L023",{waitUntil:"domcontentloaded"});
 let outline=page.locator(".los-teacher-outline nav button");
 await outline.filter({hasText:"Kolme tarkistettavaa Text A -kysymystä"}).click();
 for(const id of ["C05-SOURCE-Q01","C05-SOURCE-Q02","C05-SOURCE-Q03"]){
  await expect(page.locator(".los-teacher-paper")).toContainText(id+": Vastaus vielä puuttuu");
 }
 await expect(page.locator(".los-teacher-paper a[href*='/05/understand']")).toHaveCount(1);
 await page.goto("/los-lessons/L026",{waitUntil:"domcontentloaded"});
 outline=page.locator(".los-teacher-outline nav button");
 await outline.filter({hasText:"Palauta C05:n varsinainen 12 tehtävän testi"}).click();
 await expect(page.locator(".los-teacher-assessment-status")).toContainText("Kappaletesti: 0/12 vastattu");
 await expect(page.locator(".los-teacher-paper a[href*='/05/test']")).toHaveCount(1);
 await expectNoHorizontalOverflow(page);
});


test("C05 full chapter retake preserves original 12/12 result, self-assessment and written answers",async({page})=>{
 test.setTimeout(120_000);
 await enterLocalBook(page);
 await openChapter(page,"05","test");
 const answers=[
  {id:"C05-EX-01",option:0},{id:"C05-EX-02",option:0},{id:"C05-EX-03",option:0},
  {id:"C05-EX-04",option:1},{id:"C05-EX-05",option:1},{id:"C05-EX-06",option:0},
  {id:"C05-EX-07",option:1},{id:"C05-EX-08",option:0},{id:"C05-EX-09",option:1},
  {id:"C05-EX-10",text:"gut"},{id:"C05-EX-11",text:"Nicht"},{id:"C05-EX-12",option:0},
 ] as const;
 await expect(page.locator(".los-workbook-question")).toHaveCount(12);
 for(const item of answers){
  const field=page.locator("#"+item.id);
  if("option" in item) await field.locator('input[type="radio"]').nth(item.option).check();
  else await field.locator('input[type="text"]').fill(item.text);
 }
 await page.getByRole("button",{name:"Palauta testi · 12/12"}).click();
 await expect(page.locator(".los-test-result h2").first()).toHaveText("12 / 12 oikein");
 await page.locator("#los-self-05").fill("Osaan kysyä kuulumisia. Kertaan vielä nicht-sanan paikan.");
 await page.getByRole("button",{name:"Arkistoi tulos ja aloita uusinta"}).click();
 const archived=page.locator('[aria-label="Kappaletestin aiemmat yritykset"]');
 await expect(archived).toContainText("Yritys 1:");
 await expect(archived).toContainText("12/12 pistettä");
 await expect(page.getByRole("button",{name:"Palauta testi · 0/12"})).toBeDisabled();
 await page.reload({waitUntil:"domcontentloaded"});
 await expect(archived).toContainText("12/12 pistettä");
 await page.goto("/los-lessons/L026",{waitUntil:"domcontentloaded"});
 const outline=page.locator(".los-teacher-outline nav button");
 await outline.filter({hasText:"Palauta C05:n varsinainen 12 tehtävän testi"}).click();
 await expect(page.locator(".los-teacher-assessment-status")).toContainText("Kappaletesti: 0/12 vastattu");
 await page.goto("/los#/1/05/test",{waitUntil:"domcontentloaded"});
 await expect(page.getByRole("button",{name:"Palauta testi · 0/12"})).toBeDisabled();
 for(const item of answers){
  const field=page.locator("#"+item.id);
  if("option" in item) await field.locator('input[type="radio"]').first().check();
  else await field.locator('input[type="text"]').fill("test");
 }
 await page.getByRole("button",{name:"Palauta testi · 12/12"}).click();
 await expect(archived).toContainText("12/12 pistettä");
 await expect(page.locator("#los-self-05")).toHaveValue("Osaan kysyä kuulumisia. Kertaan vielä nicht-sanan paikan.");
 await expectNoHorizontalOverflow(page);
});

test("C05 L023 real Text A comprehension links, checks, and returns to Teacher with saved evidence",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los-lessons/L023",{waitUntil:"domcontentloaded"});
 await page.locator(".los-teacher-outline nav button").filter({hasText:"Kolme tarkistettavaa Text A -kysymystä"}).click();
 await expect(page.locator(".los-teacher-paper a[href*='/05/understand']")).toBeVisible();
 await page.goto("/los?lessonReturn=L023#/1/05/understand",{waitUntil:"domcontentloaded"});
 await expect(page.getByRole("heading",{name:"Ymmärrä alkuperäisteksti"})).toBeVisible();
 for(const [id,correct] of [["C05-SOURCE-Q01","a"],["C05-SOURCE-Q02","b"],["C05-SOURCE-Q03","a"]] as const){
  const field=page.locator('fieldset.los-c01-question').filter({has:page.locator('input[name="'+id+'"]')});
  await field.locator('input[value="'+correct+'"]').check();
  await field.getByRole("button",{name:"Tarkista vastaus"}).click();
  await expect(field.getByRole("status")).toContainText("Oikein.");
 }
 await page.getByRole("link",{name:"Palaa oppitunnille L023"}).click();
 await expect(page).toHaveURL(/\/los-lessons\/L023$/);
 await page.locator(".los-teacher-outline nav button").filter({hasText:"Kolme tarkistettavaa Text A -kysymystä"}).click();
 for(const id of ["C05-SOURCE-Q01","C05-SOURCE-Q02","C05-SOURCE-Q03"]){
  await expect(page.locator(".los-teacher-paper")).toContainText(id+": Vastaus tallennettu ja tarvittaessa tarkistettu");
 }
 await expectNoHorizontalOverflow(page);
});

test("C05 L025 real Text B checks persist without any listening-completion evidence",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los?lessonReturn=L025#/1/05/text-b",{waitUntil:"domcontentloaded"});
 for(const [id,correct] of [["C05-TEXTB-Q01","a"],["C05-TEXTB-Q02","b"]] as const){
  const field=page.locator('fieldset.los-c01-question').filter({has:page.locator('input[name="'+id+'"]')});
  await field.locator('input[value="'+correct+'"]').check();
  await field.getByRole("button",{name:"Tarkista vastaus"}).click();
  await expect(field.getByRole("status")).toContainText("Oikein.");
 }
 await page.getByRole("link",{name:"Palaa oppitunnille L025"}).click();
 await page.locator(".los-teacher-outline nav button").filter({hasText:"Tee ja tarkista Text B:n kysymykset 1 ja 2"}).click();
 for(const id of ["C05-TEXTB-Q01","C05-TEXTB-Q02"]){
  await expect(page.locator(".los-teacher-paper")).toContainText(id+": Vastaus tallennettu ja tarvittaessa tarkistettu");
 }
 await expect(page.locator(".los-teacher-paper")).not.toContainText("Kuuntelukoe suoritettu");
 await expectNoHorizontalOverflow(page);
});

test("L005 shows genuine 20-item listening source and text inside Teacher 2.0 on desktop and mobile",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los-lessons/L005",{waitUntil:"domcontentloaded"});
 const lesson=page.locator(".los-teacher-paper");
 await expect(page.locator(".los-teacher-sidebar h1")).toContainText("Kuuntele ja valitse tervehdys");
 const outline=page.locator(".los-teacher-outline nav");
 await outline.getByRole("button",{name:"Avaa koko alkuperäinen tervehdysluettelo"}).click();
 const media=lesson.locator(".los-teacher-greeting-media");
 await expect(media).toBeVisible();
 const sources=media.locator("audio source");
 await expect(sources).toHaveCount(2);
 await expect(sources.first()).toHaveAttribute("type","audio/mpeg");
 await expect(sources.first()).toHaveAttribute("src",/German_Vocabulary_-_Greetings[.]ogg[.]mp3$/);
 await expect(sources.last()).toHaveAttribute("type","audio/ogg");
 await expect(sources.last()).toHaveAttribute("src",/German_Vocabulary_-_Greetings[.]ogg$/);
 await expect(media).toContainText("28 sekunnin");
 await expect(media).toContainText("ei todista");
 // Exercise the native media error fallback without relying on Commons/CDN access in CI.
 await media.locator("audio").dispatchEvent("error");
 await expect(media.getByRole("alert")).toContainText("Äänite ei latautunut");
 await media.getByRole("button",{name:"Näytä kaikki 20 ilmausta ja suomennokset"}).click();
 const lines=media.locator(".los-teacher-greeting-transcript li");
 await expect(lines).toHaveCount(20);
 await expect(lines.first()).toContainText("Hallo!");
 await expect(lines.last()).toContainText("Gute Nacht!");
 await expect(media).toContainText("Tekstin lukeminen ei ole kuuntelunäyttö");
 await expect(lesson.locator(".los-teacher-summary")).toHaveCount(0);
 await outline.getByRole("button",{name:"Valitse ääni tai luettavan tekstin varaversio"}).click();
 await expect(lesson.locator(".los-teacher-greeting-media audio")).toBeVisible();
 await expect(lesson.locator(".los-teacher-greeting-transcript")).toBeHidden();
 await expect(lesson.locator(".los-teacher-greeting-media button")).toHaveAttribute("aria-expanded","false");
 await expectNoHorizontalOverflow(page);
});
