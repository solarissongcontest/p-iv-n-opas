import {expect,test} from "@playwright/test";
import {expectNoHorizontalOverflow} from "./helpers";

/** Local-only authorized student fixture; this does not bypass real production auth. */
async function authorize(page:import("@playwright/test").Page){
  await page.addInitScript(()=>{
    if(!["localhost","127.0.0.1"].includes(location.hostname))return;
    localStorage.setItem("opk.device-authorized","Arthur");
    localStorage.setItem("opk.owner-id","00000000-0000-4000-8000-000000000195");
  });
}
test("Teacher 2.0 is the visible primary LOS path and opens original L001 Player",async({page},testInfo)=>{
  await page.setViewportSize({width:1440,height:900});
  await authorize(page);
  await page.goto("/los#/1/path",{waitUntil:"domcontentloaded"});
  const launch=page.getByRole("link",{name:/Aloita Opetuspolku 2\.0/});
  await expect(launch).toBeVisible({timeout:30_000});
  await expect(launch).toHaveAttribute("href","/los-lessons/L001");
  await launch.click();
  await expect(page).toHaveURL(/\/los-lessons\/L001/);
  await expect(page.getByRole("heading",{level:1})).toBeVisible();
  await expect(page.locator(".los-teacher-paper")).toBeVisible();
  await expect(page.getByRole("button",{name:"Keskeytä oppitunti"})).toBeVisible();
  await expect(page.locator(".los-teacher-sidebar nav button").first()).toBeVisible();
  await expectNoHorizontalOverflow(page);
  await page.screenshot({path:testInfo.outputPath("los-teacher2-original-desktop-L001.png"),animations:"disabled"});
});

test("Teacher 2.0 actual C01 Text C opens the current textbook in a separate tab and resumes after reload",async({page},testInfo)=>{
  await page.setViewportSize({width:390,height:844});
  await authorize(page);
  await page.goto("/los-lessons/L003",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-teacher-paper")).toBeVisible({timeout:30_000});
  await expect(page.locator(".los-teacher-outline")).not.toHaveAttribute("open","");
  await page.locator(".los-teacher-outline summary").click();
  const c=page.locator(".los-teacher-sidebar nav button").filter({hasText:/Text C:/}).first();
  await expect(c).toBeVisible();
  await c.click();
  await expect(page.locator(".los-teacher-scene-kicker")).toContainText(/Nykyinen oppikirja/);
  await expect(page.locator(".los-teacher-paper h2")).toContainText("Text C");
  const book=page.locator(".los-teacher-book-link").filter({hasText:"C01 · Text C"}).first();
  await expect(book).toBeVisible();
  await expect(book.getByRole("link",{name:/Avaa kirjassa/})).toHaveAttribute("href",/\/los\?lessonReturn=L003#\/1\/01\/text-c$/);
  await expect(book.getByRole("link",{name:/Avaa kirjassa/})).toHaveAttribute("target","_blank");
  await expectNoHorizontalOverflow(page);
  await page.screenshot({path:testInfo.outputPath("los-teacher2-original-mobile390-C01-C.png"),animations:"disabled"});
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-teacher-paper h2")).toContainText("Text C");
  await expect(page.locator(".los-teacher-paper")).toBeVisible();
});

test("Teacher 2.0 new texts are reachable at 320px and pause prevents accidental progress",async({page},testInfo)=>{
  await page.setViewportSize({width:320,height:780});
  await authorize(page);
  await page.goto("/los-lessons/L008",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-teacher-paper")).toBeVisible({timeout:30_000});
  await expectNoHorizontalOverflow(page);
  await page.screenshot({path:testInfo.outputPath("los-teacher2-original-mobile320-L008.png"),animations:"disabled"});
  await expect(page.locator(".los-teacher-outline")).not.toHaveAttribute("open","");
  await page.getByRole("button",{name:"Keskeytä oppitunti"}).click();
  await expect(page.getByRole("heading",{name:"Oppitunti keskeytetty"})).toBeVisible();
  await page.locator(".los-teacher-outline summary").click();
  const active=page.locator(".los-teacher-sidebar nav button[aria-current=step]");
  const oldTitle=await active.textContent();
  await page.locator(".los-teacher-sidebar nav button").last().click({force:true});
  await expect(active).toContainText((oldTitle??"").trim().replace(/^\d+\s*/,"").slice(0,16));
  await page.reload({waitUntil:"domcontentloaded"});
  await expect(page.getByRole("heading",{name:"Oppitunti keskeytetty"})).toBeVisible();
  await page.getByRole("button",{name:"Jatka opetusta"}).first().click();
  await expect(page.locator(".los-teacher-paper")).toBeVisible();
  await expectNoHorizontalOverflow(page);
});
