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
   if(title==="L004"){
    await expect(runner.locator(".los-teacher")).toBeVisible();
    await expect(runner.locator(".los-lesson-steps li").first()).toBeHidden();
    await expect(runner.locator(".los-teacher-completion button")).toBeDisabled();
    await runner.getByRole("button",{name:"Näytä aiemmat oppituntitehtävät"}).click();
   }
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

test("C01–C10 show chapter-specific sourced photos instead of abandoned facsimile",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los#/1/01/chapter",{waitUntil:"domcontentloaded"});
 await expect(page.locator(".los1-digital-photo img")).toHaveAttribute("src",/5537577/);
 await expect(page.getByText("Selaa näköiskirjaa")).toHaveCount(0);
 await expect(page.getByRole("navigation",{name:"Näköiskirjan sisällysluettelo"})).toHaveCount(0);
 for(const chapter of chapters){
   await openChapter(page,chapter,"chapter");
   const figure=page.locator(".los1-digital-photo");
   await expect(figure).toBeVisible();
   await expect(figure.locator("picture source")).toHaveAttribute(
     "srcset",new RegExp("LOS1-C"+chapter+"-.*-mobile[.]webp$"),
   );
   const img=figure.locator("picture img");
   await expect(img).toHaveAttribute("src",
     new RegExp("^/los/chapters/LOS1-C"+chapter+"-.*-desktop[.]webp$"));
   await expect.poll(async()=>img.evaluate(el=>(el as HTMLImageElement).naturalWidth),
     {timeout:15_000}).toBeGreaterThan(0);
   await expect(figure.locator("figcaption a")).toHaveAttribute("href",/pexels[.]com/);
 }
 await page.goto("/los#/1/facsimile",{waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-front")).toBeVisible();
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


test("LOS Teacher 2.0 L004 teaches greetings, saves scenes, and never invents mastery",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los#/1/path",{waitUntil:"domcontentloaded"});
 const runner=page.locator("#los-lesson-runner");
 await runner.locator(".los-lesson-picker button").filter({hasText:"L004"}).click();
 const player=runner.locator(".los-teacher");
 await expect(player).toBeVisible();
 await expect(player).toContainText("Opetuskäsikirjoitus on vielä");
 await player.getByRole("button",{name:"Opetuksen sisällysluettelo"}).click();
 await player.getByRole("button",{name:/6\. Kokeile itse ilman mallia/}).click();
 await player.getByRole("button",{name:"Guten Morgen!"}).click();
 await expect(player).toContainText("Tämä sopii aamuun.");
 await player.getByRole("button",{name:"Guten Abend!"}).click();
 await expect(player).toContainText("ettei tämä ole ensiyrityksen itsenäinen näyttö");
 await expect(player).toContainText("0/3");
 await page.reload({waitUntil:"domcontentloaded"});
 const restored=page.locator(".los-teacher");
 await expect(restored).toContainText("Kokeile itse ilman mallia");
 await expect(restored).toContainText("0/3");
 await restored.getByRole("button",{name:"Keskeytä"}).click();
 await expect(restored).toContainText("Opetus on keskeytetty");
 await page.reload({waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-teacher")).toContainText("Opetus on keskeytetty");
 await page.locator(".los-teacher").getByRole("button",{name:"Jatka opetusta"}).click();
 await expect(page.locator(".los-teacher-book-link a")).toHaveAttribute("target","_blank");
 await expectNoHorizontalOverflow(page);
});


test("LOS Teacher L004 is the primary lesson and finishes despite nonmastered answers",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los#/1/path",{waitUntil:"domcontentloaded"});
 const runner=page.locator("#los-lesson-runner");
 await runner.locator(".los-lesson-picker button").filter({hasText:"L004"}).click();
 const player=runner.locator(".los-teacher");
 await expect(player).toBeVisible();
 await expect(runner.locator(".los-lesson-steps")).toBeHidden();
 await expect(player.getByRole("button",{name:"Merkitse opetuskokonaisuus käsitellyksi"})).toBeDisabled();
 await player.getByRole("button",{name:"Opetuksen sisällysluettelo"}).click();
 const script:[
   string,string|null
 ][]=[
  ["1. Mitä tiedät jo?","Guten Morgen!"],
  ["2. Tilanne ratkaisee",null],
  ["3. Tervehdys vai hyvästely?",null],
  ["4. Opettaja näyttää ratkaisun",null],
  ["5. Harjoittele mallin kanssa","Gute Nacht!"],
  ["6. Kokeile itse ilman mallia","Guten Morgen!"],
  ["7. Sovella kohteliaasti","Guten Tag!"],
  ["8. Tarkista vielä kerran","Guten Tag!"],
  ["9. Kokoa opittu",null]
 ];
 for(const [item,wrong] of script){
  await player.locator("#los-teacher-map").getByRole("button",{name:item,exact:true}).click();
  if(wrong)await player.locator(".los-teacher-choices").getByRole("button",{name:wrong,exact:true}).click();
 }
 await expect(player).toContainText("0/3");
 const finish=player.getByRole("button",{name:"Merkitse opetuskokonaisuus käsitellyksi"});
 await expect(finish).toBeEnabled();
 await finish.click();
 await expect(player).toContainText("Opetuskokonaisuus käyty läpi");
 await expect(runner.locator(".los-lesson-progress")).toContainText("1/60 suoritettu");
 await page.reload({waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-teacher")).toContainText("Opetuskokonaisuus käyty läpi");
 await expect(page.locator(".los-teacher")).toContainText("0/3");
 await expect(page.getByRole("button",{name:/Seuraava oppitunti: L005/})).toBeVisible();
 await page.getByRole("button",{name:/Seuraava oppitunti: L005/}).click();
 await expect(page.locator("#los-lesson-runner .los-lesson-detail .los-overline")).toContainText("L005");
 await expectNoHorizontalOverflow(page);
});


test("L004 opens in a dedicated scene player without the 60-lesson navigation",async({page})=>{
 await enterLocalBook(page);
 await page.goto("/los#/1/path",{waitUntil:"domcontentloaded"});
 const card=page.locator(".los-path-group button").filter({hasText:"Tervehdykset muistista"});
 await expect(card).toHaveCount(1);
 await card.click();
 await expect(page).toHaveURL(/\/los#\/1\/lesson\/L004$/);
 const shell=page.locator(".los-teacher-shell");
 await expect(shell).toBeVisible();
 await expect(shell.getByRole("heading",{name:"Tervehdykset muistista",level:1})).toBeVisible();
 await expect(page.locator(".los-lesson-chapter-picker")).toHaveCount(0);
 await expect(page.locator(".los-book-sidebar")).toHaveCount(0);
 const player=page.locator(".los-teacher");
 await expect(player).toBeVisible();
 await player.getByRole("button",{name:"Opetuksen sisällysluettelo"}).click();
 await player.getByRole("button",{name:/6\. Kokeile itse ilman mallia/}).click();
 await player.getByRole("button",{name:"Guten Abend!"}).click();
 await expect(player).toContainText("1/3");
 await page.reload({waitUntil:"domcontentloaded"});
 await expect(page).toHaveURL(/\/los#\/1\/lesson\/L004$/);
 await expect(page.locator(".los-teacher")).toContainText("Kokeile itse ilman mallia");
 await expect(page.locator(".los-teacher")).toContainText("1/3");
 await shell.locator(".los-teacher-shell-back").click();
 await expect(page).toHaveURL(/\/los#\/1\/path$/);
 await expect(page.locator("#los-lesson-runner")).toBeVisible();
 await expectNoHorizontalOverflow(page);
});
