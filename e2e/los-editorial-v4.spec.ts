import {expect,test} from "@playwright/test";
import {expectNoHorizontalOverflow} from "./helpers";

/** Local-only owner fixture, not a production authentication test. */
async function openReader(page:import("@playwright/test").Page) {
  await page.addInitScript(()=>{
    if(!["localhost","127.0.0.1"].includes(window.location.hostname))return;
    window.localStorage.setItem("opk.device-authorized","Arthur");
    window.localStorage.setItem("opk.owner-id","00000000-0000-4000-8000-000000000195");
  });
  await page.goto("/los#/1/01/text",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-revised-page")).toBeVisible({timeout:30_000});
}

test("editorial v4 uses one section picker and preserves real chapter destinations",async({page},testInfo)=>{
  await page.setViewportSize({width:1440,height:900});
  await openReader(page);
  const section=page.getByRole("combobox",{name:"Valitse kappaleen osio"});
  await expect(section).toHaveValue("text");
  await expect(page.locator(".los-section-nav .los-section-step")).toHaveCount(2);
  await expect(page.locator(".los-book-sidebar")).toBeVisible();
  await expectNoHorizontalOverflow(page);
  await page.screenshot({path:testInfo.outputPath("los-v4-reader-desktop.png"),fullPage:true,animations:"disabled"});
  await section.selectOption("grammar");
  await expect(page).toHaveURL(/\/los#\/1\/01\/grammar/);
  await expect(page.locator(".los-grammar-page")).toBeVisible();
  await page.getByRole("button",{name:"Seuraava osio"}).click();
  await expect(page).toHaveURL(/\/los#\/1\/01\/text-b/);
});

test("editorial v4 mobile controls do not crowd reading or cause horizontal scroll",async({page},testInfo)=>{
  await page.setViewportSize({width:320,height:780});
  await openReader(page);
  await expect(page.locator(".los-book-sidebar")).toBeHidden();
  await expect(page.locator(".los-section-nav .los-section-step")).toHaveCount(2);
  await expect(page.getByRole("combobox",{name:"Valitse kappaleen osio"})).toBeVisible();
  await expect(page.locator(".los-display-settings")).toBeVisible();
  await page.locator(".los-display-settings summary").click();
  const settingsPanel=page.locator(".los-display-settings-panel");
  await expect(settingsPanel).toBeVisible();
  const bounds=await settingsPanel.evaluate(el=>{
    const rect=el.getBoundingClientRect();
    return {left:rect.left,right:rect.right,viewport:window.innerWidth};
  });
  expect(bounds.left).toBeGreaterThanOrEqual(0);
  expect(bounds.right).toBeLessThanOrEqual(bounds.viewport+1);
  await page.locator(".los-display-settings summary").click();
  const fullWidth=await page.locator(".los-book-paper").evaluate(el=>Math.round(el.getBoundingClientRect().width));
  expect(fullWidth).toBeGreaterThanOrEqual(315);
  const firstGermanTurnTop=await page.locator(".los-c01-turn").first().evaluate(el=>el.getBoundingClientRect().top);
  expect(firstGermanTurnTop).toBeLessThan(780);
  await expect(page.locator(".los-revised-disclaimer p")).toBeHidden();
  await expectNoHorizontalOverflow(page);
  await page.screenshot({path:testInfo.outputPath("los-v4-reader-mobile320.png"),fullPage:true,animations:"disabled"});
  await page.locator(".los-revised-disclaimer summary").click();
  await expect(page.locator(".los-revised-disclaimer p")).toBeVisible();
  await expectNoHorizontalOverflow(page);
  await page.goto("/los#/1/overview",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-display-settings")).toHaveCount(0);
  await expectNoHorizontalOverflow(page);
  await page.screenshot({path:testInfo.outputPath("los-v4-bookfront-mobile320.png"),fullPage:true,animations:"disabled"});
});
test("editorial v4 visual inventory covers book, teaching and practice pages at desktop and mobile",async({page},testInfo)=>{
  await page.setViewportSize({width:1440,height:900});
  await openReader(page);
  const screens=[
    {id:"library",route:"/los",ready:".los-library"},
    {id:"chapter",route:"/los#/1/01/chapter",ready:".los-opening"},
    {id:"vocabulary",route:"/los#/1/01/vocabulary",ready:".los-book-paper"},
    {id:"grammar",route:"/los#/1/01/grammar",ready:".los-grammar-page"},
    {id:"practice",route:"/los#/1/01/practice",ready:".los-book-paper"},
    {id:"dictionary",route:"/los#/1/dictionary",ready:".los-book-paper"},
    {id:"learning-path",route:"/los#/1/path",ready:".los-book-paper"}
  ] as const;
  for(const size of [{name:"desktop",width:1440,height:900},{name:"mobile390",width:390,height:844}] as const){
    await page.setViewportSize({width:size.width,height:size.height});
    for(const screen of screens){
      await page.goto(screen.route,{waitUntil:"domcontentloaded"});
      await expect(page.locator(screen.ready).first()).toBeVisible({timeout:30000});
      await page.evaluate(()=>document.fonts.ready);
      await page.screenshot({path:testInfo.outputPath("los-v4-"+size.name+"-"+screen.id+".png"),
        animations:"disabled",fullPage:false});
      const layout=await page.evaluate(()=>({
        viewport:innerWidth,
        pageWidth:document.documentElement.scrollWidth,
        mainWidth:Math.round(document.querySelector(".los-book-main")?.getBoundingClientRect().width||0)
      }));
      console.log("LOS_V4_VISUAL "+JSON.stringify({name:screen.id,size:size.name,...layout}));
    }
  }
});

test("vocabulary, dictionary and learning path are content-first on a narrow phone",async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await openReader(page);
  await page.goto("/los#/1/01/vocabulary",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-word-table tbody tr").first()).toBeVisible();
  const vocabPosition=await page.evaluate(()=>{
    const table=document.querySelector(".los-word-table")!.getBoundingClientRect();
    const picture=document.querySelector(".los-vocab-picture-after-words")!.getBoundingClientRect();
    return {tableTop:table.top,pictureTop:picture.top};
  });
  expect(vocabPosition.pictureTop).toBeGreaterThan(vocabPosition.tableTop);
  await page.goto("/los#/1/dictionary",{waitUntil:"domcontentloaded"});
  const row=page.locator(".los-index-entry").first();
  await expect(row).toBeVisible();
  await expect(row).toHaveCSS("grid-template-columns",/px/);
  const mobileLayout=await row.evaluate(el=>{
    const term=el.querySelector("strong")!.getBoundingClientRect();
    const meaning=el.querySelector(":scope > span:nth-child(2)")!.getBoundingClientRect();
    const source=el.querySelector("button")!.getBoundingClientRect();
    return {termTop:term.top,meaningTop:meaning.top,sourceRight:source.right,viewport:innerWidth};
  });
  expect(mobileLayout.meaningTop).toBeGreaterThan(mobileLayout.termTop);
  expect(mobileLayout.sourceRight).toBeLessThanOrEqual(mobileLayout.viewport+1);
  await expectNoHorizontalOverflow(page);
  await page.goto("/los#/1/path",{waitUntil:"domcontentloaded"});
  const details=page.locator(".los-path-details");
  await expect(details).toBeVisible();
  await expect(details).not.toHaveAttribute("open",/.+/);
  await details.locator("summary").click();
  await expect(details.locator(".los-path-details-body")).toBeVisible();
  await expectNoHorizontalOverflow(page);
});
