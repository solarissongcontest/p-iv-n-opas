import {expect,test} from "@playwright/test";
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

test("C01 B5 facsimile pilot uses original cover and lets readers jump to the real digital chapter",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los#/1/facsimile",{waitUntil:"domcontentloaded"});
 const reader=page.locator(".los-facs-reader");
 await expect(reader).toBeVisible();
 await expect(reader).toContainText("C01-pilotti");
 await expect(reader.locator('.los-facs-stage [data-facsimile-page="cover"] img')).toHaveAttribute("src","/los/los-1-cover.jpeg");
 await expect(reader.locator(".los-facs-bottom")).toContainText("Luonnoslehti 1 / 15");
 await reader.getByRole("button",{name:"Sisältö"}).click();
 await reader.getByRole("navigation",{name:"Näköiskirjan sisällysluettelo"}).getByRole("button",{name:/Text A/}).click();
 await expect(reader.locator('.los-facs-stage [data-facsimile-page="c01-text-a"]')).toBeVisible();
 await expect(reader.locator('.los-facs-stage [data-facsimile-page="c01-text-a"] .los-facs-dialogue li')).toHaveCount(8);
 await reader.getByRole("button",{name:/Avaa sama osio digikirjassa/}).click();
 await expect(page).toHaveURL(/\/los#\/1\/01\/text$/);
 await expect(page.locator(".los-c01-reader")).toBeVisible();
 await expectNoHorizontalOverflow(page);
});
test("C01 facsimile page position survives reload but does not mark a lesson finished",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los#/1/facsimile",{waitUntil:"domcontentloaded"});
 const reader=page.locator(".los-facs-reader");
 await reader.getByRole("button",{name:"Sisältö"}).click();
 await reader.getByRole("navigation",{name:"Näköiskirjan sisällysluettelo"}).getByRole("button",{name:/Land und Leute/}).click();
 await expect(reader.locator('.los-facs-stage [data-facsimile-page="c01-culture"]')).toBeVisible();
 await page.reload({waitUntil:"domcontentloaded"});
 await expect(reader.locator('.los-facs-stage [data-facsimile-page="c01-culture"]')).toBeVisible();
 await page.goto("/los#/1/path",{waitUntil:"domcontentloaded"});
 await expect(page.locator("#los-lesson-runner .los-lesson-progress")).toContainText("0/60 suoritettu");
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
 await page.getByRole("button",{name:"Suomi → saksa"}).click();
 await expect(query).toHaveAttribute("placeholder","Esim. talo");
 await expectNoHorizontalOverflow(page);
});
