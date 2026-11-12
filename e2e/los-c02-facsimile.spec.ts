import {expect,test} from "@playwright/test";

test("LOS! 1 C02 opens 14 B5 sheets, links original dialogue and navigates",async({page})=>{
  await page.addInitScript(()=>{
    if(!["localhost","127.0.0.1"].includes(location.hostname))return;
    localStorage.setItem("opk.device-authorized","Arthur");
    localStorage.setItem("opk.owner-id","00000000-0000-4000-8000-000000000202");
  });
  await page.goto("/los#/1/facsimile-c02",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los-facs-c02-reader")).toBeVisible({timeout:30_000});
  await expect(page.locator(".los-facs-c02-reader .los-facs-print-only .los-facs-leaf")).toHaveCount(14);
  await expect(page.locator(".los-facs-c02-reader")).toContainText("ei valmis painos");
  await page.locator(".los-facs-c02-reader select").selectOption("single");
  await expect(page.locator(".los-facs-stage .los-facs-leaf")).toHaveCount(1);
  await page.getByRole("button",{name:"Sisältö"}).click();
  await expect(page.getByRole("navigation",{name:"C02-luonnoksen sisällysluettelo"})).toBeVisible();
  await page.getByRole("navigation",{name:"C02-luonnoksen sisällysluettelo"})
    .getByRole("button",{name:/Text A · Franz und Greta/}).click();
  await expect(page.locator(".los-facs-stage")).toContainText("Hallo, ich bin Franz.");
  await expect(page.locator(".los-facs-stage")).toContainText("Ich heiße Greta.");
  await page.locator("#los-facs-c02-jump").fill("7");
  await page.getByRole("button",{name:"Siirry"}).click();
  await expect(page.locator(".los-facs-stage")).toContainText("Ich komme aus Kyoto.");
  await expect(page.locator(".los-facs-stage")).toContainText("Das ist Peter.");
  await page.getByRole("button",{name:"Kirjanmerkki"}).click();
  await expect(page.getByRole("button",{name:"Merkitty"})).toHaveAttribute("aria-pressed","true");
  await page.getByRole("button",{name:"Hae",exact:true}).click();
  await page.locator("#los-facs-c02-search").fill("Wie heißt du");
  await expect(page.locator(".los-facs-search-hits")).toContainText("Text A");
  await page.getByRole("button",{name:"C01",exact:true}).click();
  await expect(page.locator(".los-facs-reader")).toContainText("C01-pilotti");
});
