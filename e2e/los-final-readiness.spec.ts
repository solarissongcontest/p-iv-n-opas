import {expect,test} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import {expectNoHorizontalOverflow} from "./helpers";

async function enter(page:import("@playwright/test").Page,location:string){
 await page.addInitScript(()=>{
  if(!["localhost","127.0.0.1"].includes(window.location.hostname))return;
  localStorage.setItem("opk.device-authorized","Arthur");
  localStorage.setItem("opk.owner-id","00000000-0000-4000-8000-000000000195");
 });
 await page.goto("/los#/1/"+location,{waitUntil:"domcontentloaded"});
}

test("calm reading mode survives reload and preserves normal exercises",async({page})=>{
 await enter(page,"01/text");
 await expect(page.locator(".los-revised-page")).toBeVisible({timeout:30000});
 const focus=page.getByRole("button",{name:"Rauhallinen lukutila"});
 await focus.click();
 await expect(page.locator(".los-revised-page.is-reading-focus")).toBeVisible();
 await expect(page.locator(".los-study-questions")).toBeHidden();
 await page.reload({waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-revised-page.is-reading-focus")).toBeVisible();
 await page.getByRole("button",{name:"Sulje lukutila"}).click();
 await expect(page.locator(".los-revised-page.is-reading-focus")).toHaveCount(0);
 await expect(page.locator(".los-revised-page .los-reading-question")).toHaveCount(8);
});

test("readable at narrow phone width, 200% text, keyboard and dark mode",async({page})=>{
 await enter(page,"01/text");
 await expect(page.locator(".los-revised-page")).toBeVisible({timeout:30000});
 for(const width of [320,375,768,1280]){
   await page.setViewportSize({width,height:780});
   await expectNoHorizontalOverflow(page);
 }
 await page.setViewportSize({width:375,height:780});
 await page.evaluate(()=>document.documentElement.style.fontSize="200%");
 const widthDiag=await page.evaluate(()=>({
  viewport:innerWidth,scroll:document.documentElement.scrollWidth,
  offenders:[...document.querySelectorAll("*")].map(el=>{
    const rect=el.getBoundingClientRect();
    return {tag:el.tagName,cls:String(el.className).slice(0,100),parent:String(el.parentElement?.className??"").slice(0,100),grandparent:String(el.parentElement?.parentElement?.className??"").slice(0,100),text:(el.textContent??"").slice(0,45),right:Math.round(rect.right),width:Math.round(rect.width),left:Math.round(rect.left)};
  }).filter(r=>r.right>innerWidth+3 && r.width>0).sort((a,b)=>b.right-a.right).slice(0,16)
 }));
 console.log("LOS_ZOOM_LAYOUT_DIAG "+JSON.stringify(widthDiag));
 await expectNoHorizontalOverflow(page);
 await page.evaluate(()=>{document.documentElement.classList.add("dark");});
 await page.emulateMedia({reducedMotion:"reduce",colorScheme:"dark"});
 await expect(page.getByRole("button",{name:"Kirja + tehtävät"})).toBeVisible();
 await page.getByRole("button",{name:"Rauhallinen lukutila"}).focus();
 await expect(page.getByRole("button",{name:"Rauhallinen lukutila"})).toBeFocused();
 await page.keyboard.press("Enter");
 await expect(page.locator(".los-revised-page.is-reading-focus")).toBeVisible();
 await expectNoHorizontalOverflow(page);
});

test("dictionary errors are disclosed, and optional source/audio QA have accurate status",async({page})=>{
 await enter(page,"dictionary");
 await expect(page.getByRole("heading",{name:"Laaja saksa–suomi-sanakirja"})).toBeVisible({timeout:30000});
 await expect(page.getByRole("button",{name:"Suomi → saksa"})).toBeVisible();
 await expect(page.locator(".los-freedict").getByText("12 998 hakusanaa",{exact:false})).toBeVisible({timeout:30000});
 await page.getByPlaceholder("esimerkiksi Hallo").fill("Hallo");
 await expect(page.locator(".los-freedict-row").first()).toBeVisible();
 await expect(page.locator(".los-freedict-row").first()).toContainText(/hallo/i);
 await page.getByRole("button",{name:"Suomi → saksa"}).click();
 await expect(page.getByPlaceholder("esimerkiksi tervehdys")).toBeVisible();
 await expect(page.locator(".los-freedict").getByText("12 083 hakusanaa",{exact:false})).toBeVisible({timeout:30000});
 await page.getByPlaceholder("esimerkiksi tervehdys").fill("hei");
 await expect(page.locator(".los-freedict-row").first()).toBeVisible();
 await page.goto("/los#/1/appendix",{waitUntil:"domcontentloaded"});
 await expect(page.getByRole("heading",{name:"Tarkista saksan ääntäminen omalla laitteella"})).toBeVisible();
 await expect(page.getByText("31 rekisteröityä aineistoa",{exact:false})).toBeVisible();
 await page.getByText("Näytä jokaisen lähteen tarkka tila").click();
 await expect(page.locator(".los-supplemental-audit li")).toHaveCount(31);
});

test("calm reading controls have no critical accessibility failures",async({page})=>{
 await enter(page,"01/text");
 await expect(page.locator(".los-revised-page")).toBeVisible({timeout:30000});
 await page.getByRole("button",{name:"Rauhallinen lukutila"}).click();
 const results=await new AxeBuilder({page}).include(".los-revised-page")
  .withTags(["wcag2a","wcag2aa","wcag21aa"]).analyze();
 const critical=results.violations.filter(v=>v.impact==="critical");
 expect(critical.map(x=>x.id+" "+x.description)).toEqual([]);
});


test("both real imported dictionary assets are licensed, searchable and visible in the book",async({page})=>{
 await enter(page,"dictionary");
 const deResponse=await page.request.get("/los-dictionary/v1/deu-fin.json");
 const fiResponse=await page.request.get("/los-dictionary/v1/fin-deu.json");
 expect(deResponse.ok()).toBeTruthy();
 expect(fiResponse.ok()).toBeTruthy();
 const de=await deResponse.json();
 const fi=await fiResponse.json();
 for(const [dataset,pair] of [[de,"deu-fin"],[fi,"fin-deu"]] as const){
  expect(dataset.meta.pair).toBe(pair);
  expect(dataset.meta.license.length).toBeGreaterThan(0);
  expect(dataset.entries.length).toBeGreaterThan(8500);
  expect(dataset.meta.entryCount).toBe(dataset.entries.length);
 }
 expect(de.entries.some((x:[string,string])=>x[0].toLocaleLowerCase("de")==="hallo")).toBeTruthy();
 await page.getByRole("button",{name:"Saksa → suomi"}).click();
 await page.getByPlaceholder("esimerkiksi Hallo").fill("Hallo");
 await expect(page.locator(".los-freedict-row").first()).toContainText(/Hallo/i);
 await page.getByRole("button",{name:"Suomi → saksa"}).click();
 await page.getByPlaceholder("esimerkiksi tervehdys").fill("hei");
 await expect(page.locator(".los-freedict-row").first()).toBeVisible();
});

test("all ten chapters expose exact German per-turn and C model listening controls",async({page})=>{
 test.setTimeout(180_000);
 await enter(page,"01/text");
 for(const number of Array.from({length:10},(_,i)=>String(i+1).padStart(2,"0"))){
  for(const kind of ["text","text-b","text-c"] as const){
   await page.goto("/los#/1/"+number+"/"+kind,{waitUntil:"domcontentloaded"});
   const selector=page.locator(".los-revised-speech-segments");
   await expect(selector).toBeVisible({timeout:30000});
   await selector.locator("summary").click();
   const first=kind==="text-c"?"Kuuntele mallilause 1":"Kuuntele puheenvuoro 1";
   await expect(selector.getByRole("button",{name:first,exact:true})).toBeVisible();
   await expect(selector.getByRole("button",{name:first,exact:true})).toHaveCount(1);
  }
 }
});
