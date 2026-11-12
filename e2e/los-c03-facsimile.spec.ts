import {expect,test} from "@playwright/test";

test("LOS! 1 C03 reader displays all 14 B5 draft leaves and both source texts",async({page})=>{
  await page.addInitScript(()=>{
    if(!["localhost","127.0.0.1"].includes(location.hostname))return;
    localStorage.setItem("opk.device-authorized","Arthur");
    localStorage.setItem("opk.owner-id","00000000-0000-4000-8000-000000000303");
  });
  await page.goto("/los#/1/facsimile-c03",{waitUntil:"domcontentloaded"});
  const reader=page.locator(".los-facs-c03-reader");
  await expect(reader).toBeVisible({timeout:30_000});
  await expect(reader.locator(".los-facs-print-only .los-facs-leaf")).toHaveCount(14);
  await expect(reader).toContainText("ei valmis painos");
  await reader.locator("select").selectOption("single");
  await expect(reader.locator(".los-facs-stage .los-facs-leaf")).toHaveCount(1);
  await reader.getByRole("button",{name:"Sisältö"}).click();
  const toc=reader.getByRole("navigation",{name:"C03-luonnoksen sisällysluettelo"});
  await expect(toc).toBeVisible();
  await toc.getByRole("button",{name:/Text A · Lisa Müller/}).click();
  await expect(reader.locator(".los-facs-stage")).toContainText("Guten Tag! Ich suche Lisa Müller.");
  await expect(reader.locator(".los-facs-stage")).toContainText("Woher kommen Sie?");
  await expect(reader.locator(".los-facs-stage")).toContainText("ich komme aus Deutschland");
  await reader.locator("#los-facs-c03-jump").fill("7");
  await reader.getByRole("button",{name:"Siirry",exact:true}).click();
  await expect(reader.locator(".los-facs-stage")).toContainText("Wir kommen aus Berlin");
  await expect(reader.locator(".los-facs-stage")).toContainText("Ich komme aus Kyoto");
  await reader.getByRole("button",{name:"Kirjanmerkki"}).click();
  await expect(reader.getByRole("button",{name:"Merkitty"})).toHaveAttribute("aria-pressed","true");
  await reader.getByRole("button",{name:"Hae",exact:true}).click();
  await reader.locator("#los-facs-c03-search").fill("Lisa Müller");
  await expect(reader.locator(".los-facs-search-hits")).toContainText("Text A");
  await reader.getByRole("button",{name:"C02",exact:true}).click();
  await expect(page.locator(".los-facs-c02-reader")).toBeVisible();
});
