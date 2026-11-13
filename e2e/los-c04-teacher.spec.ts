import {expect,test,type Page} from "@playwright/test";
import {expectNoHorizontalOverflow} from "./helpers";

/** Local preview only: synthetic browser-local marker never authorizes backend access. */
async function enterLocalTeacher(page:Page){
 await page.addInitScript(()=>{
   localStorage.setItem("opk.device-authorized","Arthur");
   localStorage.setItem("opk.owner-id","00000000-0000-4000-8000-000000000404");
   localStorage.setItem("opk.device-token","los-c04-browser-mock-not-a-jwt");
   localStorage.setItem("opk.device-token-expires",String(Date.now()+60*60*1000));
 });
}
const nav=(page:Page)=>page.getByRole("navigation",{name:"Oppitunnin opetustilanteet"});

test("C04 L017 uses the shared Teacher Player, persists pause and opens its actual book",async({page})=>{
 await enterLocalTeacher(page);
 await page.goto("/los-lessons/L017",{waitUntil:"domcontentloaded"});
 await expect(page.getByRole("heading",{name:"Milloin du tai Sie?"})).toBeVisible();
 await page.getByRole("button",{name:"Keskeytä oppitunti"}).click();
 await expect(page.getByRole("heading",{name:"Oppitunti keskeytetty"})).toBeVisible();
 await page.reload({waitUntil:"domcontentloaded"});
 await expect(page.getByRole("heading",{name:"Oppitunti keskeytetty"})).toBeVisible();
 await page.getByRole("button",{name:"Jatka opetusta"}).first().click();
 await nav(page).getByRole("button",{name:"Vertaillaan tilanteet ja ilmaukset"}).click();
 await page.getByRole("button",{name:"Näytä kaikki"}).click();
 await expect(page.locator(".los-teacher-board-item")).toHaveCount(6);
 await expect(page.locator(".los-teacher-board")).toContainText("Wie heißen Sie?");
 await nav(page).getByRole("button",{name:"Harjoittele kirjan oikeilla C04-tehtävillä"}).click();
 const link=page.getByRole("link",{name:/Avaa kirjassa/}).first();
 await expect(link).toHaveAttribute("href",/lessonReturn=L017.*#\/1\/04\/vocabulary/);
 const [book]=await Promise.all([page.waitForEvent("popup"),link.click()]);
 await expect(book).toHaveURL(/\/los\?lessonReturn=L017#\/1\/04\/vocabulary/);
 await expect(book.getByRole("link",{name:/Palaa oppitunnille L017/})).toBeVisible();
 await book.close();
 await expectNoHorizontalOverflow(page);
});

test("C04 L018 reads all 8 real M-WB-06 turns and keeps textbook comprehension checks",async({page})=>{
 await enterLocalTeacher(page);
 await page.goto("/los-lessons/L018",{waitUntil:"domcontentloaded"});
 await nav(page).getByRole("button",{name:"Alkuperäiset kahdeksan puheenvuoroa"}).click();
 await page.getByRole("button",{name:"Näytä kaikki"}).click();
 await expect(page.locator(".los-teacher-board-item")).toHaveCount(8);
 await expect(page.locator(".los-teacher-board")).toContainText("Wie geht es Ihnen?");
 await expect(page.locator(".los-teacher-board")).toContainText("Ich habe so viel Arbeit.");
 await page.goto("/los#/1/04/text",{waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-c01-turn")).toHaveCount(8);
 await expect(page.locator(".los-c01-attribution")).toContainText("Wikibooks");
 await page.goto("/los#/1/04/understand",{waitUntil:"domcontentloaded"});
 await expect(page.locator("fieldset.los-c01-question")).toHaveCount(5);
 await expectNoHorizontalOverflow(page);
});

test("C04 L019 teaches Sie questions and case-sensitive choice separately",async({page})=>{
 await enterLocalTeacher(page);
 await page.goto("/los-lessons/L019",{waitUntil:"domcontentloaded"});
 await nav(page).getByRole("button",{name:"Iso S merkitsee kohteliasta puhuttelua"}).click();
 await expect(page.getByText("Wie heißen sie?",{exact:true})).toBeVisible();
 await expect(page.getByText("Wie heißen Sie?",{exact:true})).toBeVisible();
 await nav(page).getByRole("button",{name:"Muodosta nimikysymys ja alkuperäkysymys"}).click();
 await page.getByRole("button",{name:"Näytä kaikki"}).click();
 await expect(page.locator(".los-teacher-board-item")).toHaveCount(6);
 await expect(page.locator(".los-teacher-board")).toContainText("Woher kommen Sie?");
 await expectNoHorizontalOverflow(page);
});

test("C04 L020 preserves all 20 M-COM-03 text items, no invented dialogue",async({page})=>{
 await enterLocalTeacher(page);
 await page.goto("/los-lessons/L020",{waitUntil:"domcontentloaded"});
 await nav(page).getByRole("button",{name:"Kaikki 20 lähdeilmausta"}).click();
 await page.getByRole("button",{name:"Näytä kaikki"}).click();
 await expect(page.locator(".los-teacher-board-item")).toHaveCount(20);
 await expect(page.locator(".los-teacher-board")).toContainText("Bis bald!");
 await page.goto("/los#/1/04/text-b",{waitUntil:"domcontentloaded"});
 await expect(page.locator(".los-secondary-source .los-c01-turn")).toHaveCount(20);
 await expect(page.locator(".los-secondary-source")).toContainText("M-COM-03");
 await expectNoHorizontalOverflow(page);
});

test("C04 L021 shows real 12-question assessment, without automatic completion",async({page})=>{
 await enterLocalTeacher(page);
 await page.goto("/los-lessons/L021",{waitUntil:"domcontentloaded"});
 await nav(page).getByRole("button",{name:"Palauta C04:n kaikki 12 tehtävää"}).click();
 await expect(page.getByRole("region",{name:"Kappaletestin ja itsearvioinnin tilanne"})).toContainText("Kappaletesti: 0/12");
 await page.goto("/los#/1/04/test",{waitUntil:"domcontentloaded"});
 await expect(page.getByRole("heading",{name:"Kappaletesti",exact:true})).toBeVisible();
 await expect(page.locator("fieldset")).toHaveCount(12);
 await expectNoHorizontalOverflow(page);
});
