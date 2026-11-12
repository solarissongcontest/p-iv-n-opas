import {expect,test} from "@playwright/test";

test("LOS! 1 C04 shows 16 B5 leaves, Sie-dialogue and full twenty-expression Text B",async({page})=>{
  await page.addInitScript(()=>{
    if(!["localhost","127.0.0.1"].includes(location.hostname))return;
    localStorage.setItem("opk.device-authorized","Arthur");
    localStorage.setItem("opk.owner-id","00000000-0000-4000-8000-000000000404");
  });
  await page.goto("/los#/1/facsimile-c04",{waitUntil:"domcontentloaded"});
  const reader=page.locator(".los-facs-c04-reader");
  await expect(reader).toBeVisible({timeout:30_000});
  await expect(reader.locator(".los-facs-print-only .los-facs-leaf")).toHaveCount(16);
  await expect(reader).toContainText("ei valmis painos");
  await expect(reader.locator(".los-facs-print-only .los-facs-c04-greetings li")).toHaveCount(20);
  await reader.locator("select").selectOption("single");
  await expect(reader.locator(".los-facs-stage .los-facs-leaf")).toHaveCount(1);

  await reader.getByRole("button",{name:"Sisältö"}).click();
  const toc=reader.getByRole("navigation",{name:"C04-luonnoksen sisällysluettelo"});
  await expect(toc).toBeVisible();
  await toc.getByRole("button",{name:/Text A · Herr Schmidt und Herr Standish/}).click();
  await expect(reader.locator(".los-facs-stage")).toContainText("Wie geht es Ihnen?");
  await expect(reader.locator(".los-facs-stage")).toContainText("Auf Wiedersehen, bis morgen.");

  await reader.locator("#los-facs-c04-jump").fill("7");
  await reader.getByRole("button",{name:"Siirry",exact:true}).click();
  await expect(reader.locator(".los-facs-stage")).toContainText("Wie heißen Sie?");
  await expect(reader.locator(".los-facs-stage")).toContainText("Wie heißt du?");

  await reader.locator("#los-facs-c04-jump").fill("9");
  await reader.getByRole("button",{name:"Siirry",exact:true}).click();
  await expect(reader.locator(".los-facs-stage")).toContainText("Auf Wiedersehen!");
  await expect(reader.locator(".los-facs-stage")).toContainText("Gute Nacht!");

  await reader.getByRole("button",{name:"Kirjanmerkki"}).click();
  await expect(reader.getByRole("button",{name:"Merkitty"})).toHaveAttribute("aria-pressed","true");
  await reader.getByRole("button",{name:"Hae",exact:true}).click();
  await reader.locator("#los-facs-c04-search").fill("Moin");
  await expect(reader.locator(".los-facs-search-hits")).toContainText("Text B");
  await reader.getByRole("button",{name:"C03",exact:true}).click();
  await expect(page.locator(".los-facs-c03-reader")).toBeVisible();
});
