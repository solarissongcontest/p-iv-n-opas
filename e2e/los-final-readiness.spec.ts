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
 const focus=page.getByRole("combobox",{name:"Opiskelutila"});
 await focus.selectOption("focus");
 await expect(page.locator(".los-revised-page.is-reading-focus")).toBeVisible();
 await expect(page.locator(".los-study-questions")).toBeHidden();
 await page.reload({waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-revised-page.is-reading-focus")).toBeVisible();
 await page.getByRole("combobox",{name:"Opiskelutila"}).selectOption("book");
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
 await expect(page.getByRole("combobox",{name:"Opiskelutila"})).toBeVisible();
 await page.getByRole("combobox",{name:"Opiskelutila"}).focus();
 await expect(page.getByRole("combobox",{name:"Opiskelutila"})).toBeFocused();
 await page.getByRole("combobox",{name:"Opiskelutila"}).selectOption("focus");
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
 await expect(page.getByRole("heading",{name:"Kokeile saksankielistä puheääntä"})).toBeVisible();
 await expect(page.getByText("31 rekisteröityä aineistoa",{exact:false})).toBeVisible();
 const updateDismiss=page.locator(".pwa-update-prompt button").filter({hasText:"Myöhemmin"});
 if(await updateDismiss.isVisible())await updateDismiss.click();
 await page.getByText("Näytä jokaisen lähteen tarkka tila").click();
 await expect(page.locator(".los-supplemental-audit li")).toHaveCount(31);
});

test("calm reading controls have no critical accessibility failures",async({page})=>{
 await enter(page,"01/text");
 await expect(page.locator(".los-revised-page")).toBeVisible({timeout:30000});
 await page.getByRole("combobox",{name:"Opiskelutila"}).selectOption("focus");
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
   await page.locator(".los-speech-unit-picker > summary").click();
   const selector=page.locator(".los-revised-speech-segments");
   await expect(selector).toBeVisible({timeout:30000});
   await selector.locator("summary").click();
   const first=kind==="text-c"?"Kuuntele mallilause 1":"Kuuntele puheenvuoro 1";
   await expect(selector.getByRole("button",{name:first,exact:true})).toBeVisible();
   await expect(selector.getByRole("button",{name:first,exact:true})).toHaveCount(1);
  }
 }
});

test("optional German voice test tracks playback events without asking a beginner to certify pronunciation",async({page})=>{
 await page.addInitScript(()=>{
  class FakeUtterance{
   text:string;
   voice:unknown=null;
   lang="";
   rate=1;
   onstart:(()=>void)|null=null;
   onend:(()=>void)|null=null;
   onerror:(()=>void)|null=null;
   constructor(text:string){this.text=text;}
  }
  const mock={
   getVoices:()=>[
    {name:"QA Deutsch",lang:"de-DE",localService:true},
    {name:"QA Österreich",lang:"de-AT",localService:true},
   ],
   addEventListener:()=>{},
   removeEventListener:()=>{},
   cancel:()=>{},
   speak:(utterance:FakeUtterance)=>{
    setTimeout(()=>{
     utterance.onstart?.();
     setTimeout(()=>utterance.onend?.(),70);
    },20);
   },
  };
  Object.defineProperty(window,"speechSynthesis",{configurable:true,value:mock});
  Object.defineProperty(window,"SpeechSynthesisUtterance",{configurable:true,value:FakeUtterance});
 });
 await enter(page,"appendix");
 const diagnostics=page.locator(".los-voice-diagnostics");
 await expect(diagnostics).toBeVisible({timeout:30000});
 await expect(diagnostics.getByText("Sinun ei tarvitse arvioida saksan ääntämisen oikeellisuutta", {exact:false})).toBeVisible();
 await expect(diagnostics.locator("input[type='checkbox']")).toHaveCount(0);
 await expect(diagnostics.getByText("Selaimen ilmoituksen mukaan päättyneitä näytteitä: 0/8.")).toBeVisible();
 await diagnostics.getByRole("button",{name:"Kuuntele",exact:true}).first().click();
 await expect(diagnostics.getByText("Selaimen ilmoituksen mukaan päättyneitä näytteitä: 1/8.")).toBeVisible();
 await diagnostics.locator("select").selectOption({label:"QA Österreich · de-AT"});
 await expect(diagnostics.getByText("Selaimen ilmoituksen mukaan päättyneitä näytteitä: 0/8.")).toBeVisible();
 await page.reload({waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-voice-diagnostics select")).toHaveValue("de-AT / QA Österreich");
 await expect(page.locator(".los-voice-diagnostics").getByText("Selaimen ilmoituksen mukaan päättyneitä näytteitä: 0/8.")).toBeVisible();
});

test("preferred German voice follows the learner across Text A, B, C and appendix",async({page})=>{
 await page.addInitScript(()=>{
  const voices=[
   {name:"QA Deutsch",lang:"de-DE",localService:true},
   {name:"QA Österreich",lang:"de-AT",localService:true},
  ];
  const synthesis={
   getVoices:()=>voices,
   addEventListener:()=>{},
   removeEventListener:()=>{},
   cancel:()=>{},
   speak:(utterance:{voice?:{name:string};lang:string})=>localStorage.setItem("los1.qa.voice-used",(utterance.voice?.name??"")+"|"+utterance.lang),
  };
  Object.defineProperty(window,"speechSynthesis",{configurable:true,value:synthesis});
  Object.defineProperty(window,"SpeechSynthesisUtterance",{configurable:true,value:class {
   constructor(public text:string){}
  }});
 });
 await enter(page,"01/text");
 await page.locator(".los-revised-speech-options summary").click();
 const picker=page.getByLabel("Saksan puheääni");
 await expect(picker).toBeVisible({timeout:30000});
 await picker.selectOption({label:"QA Österreich · de-AT"});
 await expect(picker).toHaveValue("de-AT / QA Österreich");
 await page.getByRole("button",{name:"Kuuntele teksti"}).click();
 await expect.poll(()=>page.evaluate(()=>localStorage.getItem("los1.qa.voice-used"))).toBe("QA Österreich|de-AT");
 await page.goto("/los#/1/02/text-b",{waitUntil:"domcontentloaded"});
 await expect(page.getByLabel("Saksan puheääni")).toHaveValue("de-AT / QA Österreich");
 await page.goto("/los#/1/03/text-c",{waitUntil:"domcontentloaded"});
 await expect(page.getByLabel("Saksan puheääni")).toHaveValue("de-AT / QA Österreich");
 await page.goto("/los#/1/appendix",{waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-voice-diagnostics select")).toHaveValue("de-AT / QA Österreich");
 await page.locator(".los-voice-diagnostics select").selectOption({label:"QA Deutsch · de-DE"});
 await page.goto("/los#/1/04/text",{waitUntil:"domcontentloaded"});
 await expect(page.getByLabel("Saksan puheääni")).toHaveValue("de-DE / QA Deutsch");
});

test("every LOS! 1 vocabulary item has German speech, never an unreviewed eSpeak IPA presented as certain",async({page})=>{
 test.setTimeout(180_000);
 await page.addInitScript(()=>{
  const german={name:"Deutsch QA",lang:"de-DE",localService:true};
  const english={name:"English QA",lang:"en-US",localService:true};
  const synthesis={
   getVoices:()=>[english,german],
   addEventListener:()=>{},
   removeEventListener:()=>{},
   cancel:()=>{},
   speak:(utterance:{text:string;voice:{name:string};lang:string;onend?:()=>void})=>{
    localStorage.setItem("los1.qa.vocab-spoken",JSON.stringify({
     text:utterance.text,voice:utterance.voice?.name,lang:utterance.lang,
    }));
    utterance.onend?.();
   },
  };
  Object.defineProperty(window,"speechSynthesis",{configurable:true,value:synthesis});
  Object.defineProperty(window,"SpeechSynthesisUtterance",{configurable:true,value:class{
   text:string;
   voice:unknown=null;
   lang="";
   rate=1;
   onend:()=>void=()=>{};
   onerror:()=>void=()=>{};
   constructor(text:string){this.text=text;}
  }});
 });
 await enter(page,"01/vocabulary");
 for(let n=1;n<=10;n++){
  const chapter=String(n).padStart(2,"0");
  if(n>1)await page.goto("/los#/1/"+chapter+"/vocabulary",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-vocabulary-page")).toBeVisible({timeout:30000});
  const rows=page.locator(".los-word-table tbody tr");
  const buttons=page.locator(".los-vocab-audio-button");
  const count=await rows.count();
  expect(count).toBeGreaterThan(5);
  await expect(buttons).toHaveCount(count);
  await expect(page.getByText("koneellinen ehdotus",{exact:false})).toHaveCount(0);
  if(n===1){
   await buttons.first().click();
   const spoken=await page.evaluate(()=>JSON.parse(localStorage.getItem("los1.qa.vocab-spoken")??"null"));
   expect(spoken?.lang).toBe("de-DE");
   expect(spoken?.voice).toBe("Deutsch QA");
   expect(spoken?.text?.length).toBeGreaterThan(0);
  }
 }
});

test("vocabulary speech uses the learner's available German voice preference",async({page})=>{
 await page.addInitScript(()=>{
  localStorage.setItem("los1.audio.preferred-german-voice.v1","de-AT / Österreich QA");
  const synthesis={
   getVoices:()=>[
    {name:"Deutsch QA",lang:"de-DE",localService:true},
    {name:"Österreich QA",lang:"de-AT",localService:true},
   ],
   addEventListener:()=>{},
   removeEventListener:()=>{},
   cancel:()=>{},
   speak:(utterance:{voice:{name:string};lang:string;onend?:()=>void})=>{
    localStorage.setItem("los1.qa.vocab-language",utterance.lang+"|"+utterance.voice?.name);
    utterance.onend?.();
   },
  };
  Object.defineProperty(window,"speechSynthesis",{configurable:true,value:synthesis});
  Object.defineProperty(window,"SpeechSynthesisUtterance",{configurable:true,value:class{
   text:string;
   voice:unknown=null;
   lang="";
   rate=1;
   onend:()=>void=()=>{};
   onerror:()=>void=()=>{};
   constructor(text:string){this.text=text;}
  }});
 });
 await enter(page,"02/vocabulary");
 await page.locator(".los-vocab-audio-button").first().click();
 await expect.poll(()=>page.evaluate(()=>localStorage.getItem("los1.qa.vocab-language"))).toBe("de-AT|Österreich QA");
});

test("each of the thirty LOS1 A/B/C texts offers per-sentence speech",async({page})=>{
 test.setTimeout(210_000);
 await enter(page,"01/text");
 for(let n=1;n<=10;n++){
  const ch=String(n).padStart(2,"0");
  for(const kind of ["text","text-b","text-c"] as const){
   await page.goto("/los#/1/"+ch+"/"+kind,{waitUntil:"domcontentloaded"});
   await page.locator(".los-speech-unit-picker > summary").click();
   const panel=page.locator(".los-revised-speech-sentences");
   await expect(panel.locator("summary")).toBeVisible({timeout:30000});
   await panel.locator("summary").click();
   const count=await panel.locator("li").count();
   expect(count).toBeGreaterThan(0);
   await expect(panel.locator("button[aria-label^='Kuuntele saksaksi:']")).toHaveCount(count);
  }
 }
});

test("all ten grammar chapters offer audio for German examples",async({page})=>{
 test.setTimeout(150_000);
 await enter(page,"01/grammar");
 for(let n=1;n<=10;n++){
  const ch=String(n).padStart(2,"0");
  if(n>1)await page.goto("/los#/1/"+ch+"/grammar",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-grammar-page")).toBeVisible({timeout:30000});
  const count=await page.locator(".los-grammar-page button[aria-label^='Kuuntele saksaksi:']").count();
  expect(count,"chapter "+ch+" grammar should offer German TTS").toBeGreaterThan(0);
 }
});

test("reader typography options are persistent, accessible and reflow at 320 pixels",async({page},testInfo)=>{
 await enter(page,"01/text");
 await expect(page.locator(".los-reading-page")).toBeVisible({timeout:30000});
 const options=page.locator(".los-display-settings");
 await expect(options.locator("summary")).toBeVisible();
 await options.locator("summary").click();
 await options.getByLabel("Tekstin koko").selectOption("extra");
 await options.getByLabel("Riviväli").selectOption("relaxed");
 await options.getByLabel("Lukurivin leveys").selectOption("narrow");
 await expect(page.locator(".los-book-workspace")).toHaveAttribute("data-reading-size","extra");
 await expect(page.locator(".los-book-workspace")).toHaveAttribute("data-reading-spacing","relaxed");
 await expect(page.locator(".los-book-workspace")).toHaveAttribute("data-reading-measure","narrow");
 await expect.poll(()=>page.locator(".los-c01-words").first().evaluate(el=>getComputedStyle(el).fontSize)).toBe("24px");
 await page.reload({waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-book-workspace")).toHaveAttribute("data-reading-size","extra");
 await expect(page.locator(".los-book-workspace")).toHaveAttribute("data-reading-spacing","relaxed");
 await page.setViewportSize({width:320,height:780});
 await expectNoHorizontalOverflow(page);
 await page.screenshot({path:testInfo.outputPath("reader-320px-large-text.png"),fullPage:true,animations:"disabled"});
 await page.locator(".los-display-settings summary").click();
 await page.getByRole("button",{name:"Palauta oletukset"}).click();
 await expect(page.locator(".los-book-workspace")).toHaveAttribute("data-reading-size","normal");
 await expect(page.locator(".los-book-workspace")).toHaveAttribute("data-reading-measure","normal");
});

test("mobile chapter drawer traps focus, closes with Escape and does not leave the page inert",async({page},testInfo)=>{
 await enter(page,"01/text");
 await page.setViewportSize({width:390,height:844});
 await expect(page.locator(".los-top-toc")).toBeVisible({timeout:30000});
 await page.locator(".los-top-toc").click();
 const drawer=page.locator(".los-book-sidebar.is-open");
 await expect(drawer).toBeVisible();
 await expect(drawer).toHaveAttribute("role","dialog");
 await expect(drawer).toHaveAttribute("aria-modal","true");
 await expect(drawer.getByRole("button",{name:"Sulje sisällysluettelo"})).toBeFocused();
 await page.keyboard.press("Shift+Tab");
 await expect(drawer.locator("a[href]").last()).toBeFocused();
 await page.keyboard.press("Tab");
 await expect(drawer.getByRole("button",{name:"Sulje sisällysluettelo"})).toBeFocused();
 await page.screenshot({path:testInfo.outputPath("mobile-chapter-drawer.png"),fullPage:false,animations:"disabled"});
 await page.keyboard.press("Escape");
 await expect(drawer).toHaveCount(0);
 await expect(page.locator(".los-top-toc")).toBeFocused();
 await page.locator(".los-top-toc").click();
 await drawer.getByRole("button",{name:"Sisällysluettelo",exact:true}).click();
 await expect(page.locator(".los-book-sidebar.is-open")).toHaveCount(0);
 await expect(page.locator("#main-content")).toBeFocused();
 await expectNoHorizontalOverflow(page);
});

test("desktop reader screenshot and true container-based study layout",async({page},testInfo)=>{
 await enter(page,"01/text");
 await expect(page.locator(".los-revised-page")).toBeVisible({timeout:30000});
 await page.setViewportSize({width:1440,height:900});
 await page.screenshot({path:testInfo.outputPath("textbook-desktop-reading.png"),fullPage:true,animations:"disabled"});
 await page.getByRole("combobox",{name:"Opiskelutila"}).selectOption("split");
 await expect(page.locator(".los-study-layout")).toHaveClass(/is-split/);
 const layout=await page.locator(".los-study-layout").evaluate(el=>getComputedStyle(el).display);
 const available=await page.locator(".los-reading-page").evaluate(el=>el.getBoundingClientRect().width);
 if(available>=1000)expect(layout).toBe("grid");
 else expect(layout).not.toBe("grid");
 await expectNoHorizontalOverflow(page);
});

test("first German sentence is not buried under a tall audio settings dashboard",async({page},testInfo)=>{
 await enter(page,"01/text");
 await page.setViewportSize({width:390,height:844});
 const speechSettings=page.locator(".los-revised-speech-options");
 await expect(speechSettings.locator("summary")).toBeVisible({timeout:30000});
 await expect(speechSettings.getByLabel("Saksan puheääni")).toBeHidden();
 const units=page.locator(".los-speech-unit-picker");
 await expect(units.locator(":scope > summary")).toBeVisible();
 await expect(units).toHaveJSProperty("open",false);
 const firstTurn=page.locator(".los-revised-page .los-c01-turn").first();
 await expect(firstTurn).toBeAttached();
 const top=await firstTurn.evaluate(el=>Math.round(el.getBoundingClientRect().top));
 expect(top,"The first original German turn should appear within about one extra mobile screen").toBeLessThan(1200);
 await page.screenshot({path:testInfo.outputPath("mobile-reader-prioritizes-german-text.png"),fullPage:false,animations:"disabled"});
 await speechSettings.locator("summary").click();
 await expect(speechSettings.getByLabel("Saksan puheääni")).toBeVisible();
 await expectNoHorizontalOverflow(page);
});

test("LOS1 editorial v4 reading design is consistent at desktop, mobile and dark mode",async({page},testInfo)=>{
 await page.setViewportSize({width:1440,height:900});
 await enter(page,"01/text");
 await expect(page.locator(".los-revised-page")).toBeVisible({timeout:30000});
 const title=page.locator(".los-reading-page h1").first();
 const font=await title.evaluate(el=>getComputedStyle(el).fontFamily);
 expect(font).not.toMatch(/Georgia|Times New Roman/);
 await expect.poll(()=>page.locator(".los-book-topbar").evaluate(el=>getComputedStyle(el).borderTopWidth)).toBe("0px");
 await expect.poll(()=>page.locator(".los-book-paper").evaluate(el=>getComputedStyle(el).borderTopLeftRadius)).toBe("10px");
 const textFont=await page.locator(".los-c01-words").first().evaluate(el=>getComputedStyle(el).fontFamily);
 expect(textFont).not.toMatch(/Georgia|Times New Roman/);
 await page.screenshot({path:testInfo.outputPath("los-contemporary-reading-desktop.png"),fullPage:true,animations:"disabled"});
 await page.setViewportSize({width:320,height:780});
 await expectNoHorizontalOverflow(page);
 await expect.poll(()=>page.locator(".los-book-paper").evaluate(el=>getComputedStyle(el).borderTopLeftRadius)).toBe("0px");
 await page.screenshot({path:testInfo.outputPath("los-contemporary-reading-mobile320.png"),fullPage:true,animations:"disabled"});
 await page.evaluate(()=>document.documentElement.classList.add("dark"));
 await expectNoHorizontalOverflow(page);
 await expect.poll(()=>page.locator(".los-book-workspace").evaluate(el=>getComputedStyle(el).color)).not.toBe("rgb(32, 41, 54)");
 await page.screenshot({path:testInfo.outputPath("los-contemporary-reading-dark.png"),fullPage:false,animations:"disabled"});
 await page.evaluate(()=>document.documentElement.classList.remove("dark"));
 await page.goto("/los#/1/overview",{waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-front-banner img")).toBeVisible({timeout:30000});
 await expectNoHorizontalOverflow(page);
 await page.screenshot({path:testInfo.outputPath("los-contemporary-book-landing-mobile.png"),fullPage:true,animations:"disabled"});
 await page.setViewportSize({width:1440,height:900});
 await page.reload({waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-front-banner img")).toBeVisible({timeout:30000});
 await page.screenshot({path:testInfo.outputPath("los-contemporary-book-landing-desktop.png"),fullPage:true,animations:"disabled"});
});
