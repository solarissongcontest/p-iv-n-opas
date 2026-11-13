import {expect,test} from "@playwright/test";
import {expectNoHorizontalOverflow} from "./helpers";

/** Owner cache fixture is limited to localhost, not an auth or security test. */
async function openLocalLos(page:import("@playwright/test").Page){
 await page.addInitScript(()=>{
  if(!["localhost","127.0.0.1"].includes(location.hostname))return;
  localStorage.setItem("opk.device-authorized","Arthur");
  localStorage.setItem("opk.owner-id","00000000-0000-4000-8000-000000000204");
 });
 await page.goto("/los#/1/path",{waitUntil:"domcontentloaded"});
 await expect(page.locator("#los-lesson-runner")).toBeVisible({timeout:30_000});
}
const player=(page:import("@playwright/test").Page)=>page.locator("#los-teacher-player");
const next=async(page:import("@playwright/test").Page)=>{
 await player(page).getByRole("button",{name:"Seuraava",exact:true}).click();
};

test("L004 uses independent Teacher 2.0 view, all teaching scenes and restart-safe completion evidence",async({page})=>{
 await openLocalLos(page);
 await page.locator(".los-lesson-picker").getByRole("button",{name:/L004/}).click();
 await expect(page).toHaveURL(/\/los#\/1\/teacher$/);
 const lesson=player(page);
 await expect(lesson).toBeVisible();
 await expect(lesson.getByRole("heading",{name:"Mitä tänään opitaan?"})).toBeVisible();
 await expect(page.locator(".los-path-group")).toHaveCount(0);
 await expect(lesson.getByRole("progressbar")).toHaveAttribute("aria-valuenow","1");
 await next(page);
 await lesson.getByRole("button",{name:"Guten Abend!"}).click();
 await expect(lesson.getByRole("status").filter({hasText:"Oikein"})).toBeVisible();
 await next(page); // meaning
 await expect(lesson).toContainText("Guten Morgen!");
 await next(page); // contrast
 await expect(lesson).toContainText("Auf Wiedersehen!");
 await next(page); // board
 const board=lesson.locator(".los-teacher-board");
 await expect(board.locator("li")).toHaveCount(0);
 await board.getByRole("button",{name:"Näytä seuraava vaihe"}).click();
 await expect(board.locator("li")).toHaveCount(1);
 await board.getByRole("button",{name:"Näytä koko malli"}).click();
 await expect(board.locator("li")).toHaveCount(4);
 await board.getByRole("button",{name:"Näytä alusta"}).click();
 await expect(board.locator("li")).toHaveCount(0);
 await next(page); // guided
 await lesson.getByRole("button",{name:"Guten Abend!"}).click();
 await expect(lesson).toContainText("Kokeile uudelleen");
 await lesson.getByRole("button",{name:"Tschüss!"}).click();
 await expect(lesson).toContainText("Selitetään toisella tavalla");
 await lesson.getByRole("button",{name:"Guten Morgen!"}).click();
 await expect(lesson).toContainText("Oikein");
 await next(page); // farewell
 await lesson.getByRole("button",{name:"Tschüss!"}).click();
 await next(page); // application
 await lesson.getByRole("button",{name:"Guten Tag!"}).click();
 await next(page); // exit
 await lesson.getByRole("button",{name:"Auf Wiedersehen!"}).click();
 await next(page); // summary
 await expect(lesson.getByRole("heading",{name:"Mitä osaat tämän tunnin jälkeen?"})).toBeVisible();
 await expect(lesson.locator(".los-teacher-summary")).toContainText("3/3");
 const covered=lesson.getByRole("button",{name:"Merkitse opetussisältö käsitellyksi"});
 await expect(covered).toBeEnabled();
 await covered.click();
 await expect(lesson.locator(".los-teacher-summary")).toContainText("Opetussisältö käsitelty");
 await page.reload({waitUntil:"domcontentloaded"});
 await expect(player(page).getByRole("heading",{name:"Mitä osaat tämän tunnin jälkeen?"})).toBeVisible();
 await expect(player(page).locator(".los-teacher-summary")).toContainText("Opetussisältö käsitelty");
 const legacy=await page.evaluate(()=>localStorage.getItem("los.local.v1.00000000-0000-4000-8000-000000000204.1.01"));
 expect(legacy).toBeNull();
 await expectNoHorizontalOverflow(page);
 await lesson.getByRole("button",{name:"Takaisin opiskelupolkuun",exact:true}).click();
 await expect(page).toHaveURL(/\/los#\/1\/path$/);
});

test("Teacher 2.0 help, book reference and free navigation never count as independent evidence",async({page})=>{
 await openLocalLos(page);
 await page.goto("/los#/1/teacher",{waitUntil:"domcontentloaded"});
 const lesson=player(page);
 await lesson.locator(".los-teacher-toc summary").click();
 await lesson.locator(".los-teacher-toc").getByRole("button",{name:/Yritä nyt ilman mallia/}).click();
 await expect(lesson.getByRole("heading",{name:"Yritä nyt ilman mallia"})).toBeVisible();
 await lesson.getByRole("button",{name:/En ymmärrä/}).click();
 await expect(lesson).toContainText("Kun toinen lähtee, sano hyvästely");
 await lesson.getByRole("button",{name:"Tschüss!"}).click();
 await expect(lesson.locator(".los-teacher-feedback")).toContainText("ei ole sama asia kuin itsenäinen");
 const saved=await page.evaluate(()=>{
   const raw=localStorage.getItem("los.teacher.v2.00000000-0000-4000-8000-000000000204.1.L004");
   return raw?JSON.parse(raw):null;
 });
 expect(saved?.answers?.["L004-Q-INDEPENDENT"]?.independentCorrect).toBe(false);
 await expect(lesson.locator(".los-teacher-bookref a")).toHaveAttribute("target","_blank");
 await expect(lesson.locator(".los-teacher-bookref a")).toHaveAttribute("href","/los#/1/01/vocabulary");
 await lesson.locator(".los-teacher-toc").getByRole("button",{name:/Mitä osaat tämän tunnin jälkeen/}).click();
 await expect(lesson.getByRole("button",{name:"Merkitse opetussisältö käsitellyksi"})).toBeDisabled();
 await expectNoHorizontalOverflow(page);
});
