import {expect,test} from "@playwright/test";
import path from "node:path";

/** This is a local PDF UI test, not a production authentication test. */
test("LOS! 1 opens validated B5 C01 PDF via bundled PDF.js and preserves text layer",async({page})=>{
  await page.addInitScript(()=>{
    if(!["localhost","127.0.0.1"].includes(location.hostname))return;
    localStorage.setItem("opk.device-authorized","Arthur");
    localStorage.setItem("opk.owner-id","00000000-0000-4000-8000-000000000195");
  });
  await page.goto("/los#/1/facsimile-pdf",{waitUntil:"domcontentloaded"});
  await expect(page.locator(".los1-pdf-reader")).toBeVisible({timeout:30_000});
  // Full-book structure must be visible without invented printed page numbers.
  await expect(page.locator(".los1-full-book-outline")).toBeVisible();
  await page.locator(".los1-full-book-outline > summary").click();
  await expect(page.locator(".los1-full-book-outline-chapters > details")).toHaveCount(10);
  await expect(page.locator(".los1-full-book-outline")).toContainText("Ei sivunumeroa");
  await expect(page.locator(".los1-full-book-outline")).toContainText("Julkaisu estetty");
  const file=path.resolve(".artifacts/los1/LOS1_C01_B5_TAITTOLUONNOS.pdf");
  await page.locator(".los1-pdf-file-label input[type=file]").setInputFiles(file);
  await expect(page.locator(".los1-pdf-stage")).toBeVisible({timeout:30_000});
  await expect(page.locator(".los1-pdf-folio").first()).toContainText("1");
  await expect.poll(async()=>page.locator(".los1-pdf-leaf canvas").first().evaluate(
    (canvas:HTMLCanvasElement)=>canvas.width>0&&canvas.height>0)).toBe(true);
  await page.locator("#los1-pdf-jump").fill("5");
  await page.locator(".los1-pdf-footer form button").click();
  await expect(page.locator(".los1-pdf-folio").first()).toContainText("5");
  try{
    await expect.poll(async()=>page.locator(".los1-pdf-textlayer span").count(),
      {timeout:12_000}).toBeGreaterThan(0);
  }catch(e){
    const errors=await page.locator(".los1-pdf-error").allTextContents();
    const layers=await page.locator(".los1-pdf-textlayer").evaluateAll(els=>
      els.map(el=>({html:el.innerHTML.slice(0,250),style:el.getAttribute("style")})));
    console.log("PDFJS_RENDER_DIAGNOSTICS",JSON.stringify({errors,layers}));
    throw e;
  }
  await page.getByRole("button",{name:"Seuraava"}).click();
  await expect(page.locator(".los1-pdf-folio").first()).toContainText("6");
  await page.getByRole("button",{name:"Sisällys",exact:true}).click();
  await expect(page.locator(".los1-pdf-toc")).toBeVisible();
  await page.locator(".los1-pdf-controls").getByRole("button",{name:"Kirjanmerkki",exact:true}).click();
  await expect(page.locator(".los1-pdf-controls").getByRole("button",{name:"Kirjanmerkki",exact:true})).toHaveAttribute("aria-pressed","true");
});
