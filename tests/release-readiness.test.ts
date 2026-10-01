import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path: string) =>
  readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("browser and accessibility tooling are first-class dependencies", () => {
  const pkg = JSON.parse(read("package.json")) as {
    scripts: Record<string,string>;
    devDependencies: Record<string,string>;
  };
  assert.ok(pkg.devDependencies["@playwright/test"]);
  assert.ok(pkg.devDependencies["@axe-core/playwright"]);
  assert.equal(pkg.scripts.e2e, "playwright test");
  assert.ok(pkg.scripts["e2e:cross-device"]);
  assert.ok(pkg.scripts["e2e:visual"]);
});

test("Quality Gate includes lint before tests typecheck and build", () => {
  const workflow = read(".github/workflows/quality.yml");
  const lint = workflow.indexOf("npm run lint");
  const tests = workflow.indexOf("npm test");
  const typecheck = workflow.indexOf("npm run typecheck");
  const build = workflow.indexOf("npm run build");
  assert.ok(lint >= 0);
  assert.ok(lint < tests && tests < typecheck && typecheck < build);
});

test("Final Release Gate waits for the deployed commit and runs the full browser matrix", () => {
  const workflow = read(".github/workflows/iphone-e2e.yml");
  for (const token of [
    "Wait for this exact commit to reach Vercel",
    "/api/release-info",
    "iphone-smoke.spec.ts",
    "release-gate.spec.ts",
    "v5-cross-device.spec.ts",
    "responsive-visual.spec.ts",
    "REQUIRE_GEMINI",
    "SEND_PUSH_TEST",
  ]) {
    assert.ok(workflow.includes(token), token);
  }
});

test("release identity endpoint never exposes secrets and disables caching", () => {
  const route = read("src/routes/api.release-info.ts");
  assert.match(route, /VERCEL_GIT_COMMIT_SHA/);
  assert.match(route, /Cache-Control/);
  assert.match(route, /no-store/);
  assert.equal(route.includes("SUPABASE_SECRET_KEY"), false);
  assert.equal(route.includes("GEMINI_API_KEY"), false);
});

test("push notifications deep-link to Structure V4 destinations", () => {
  const cron = read("src/routes/api.push.cron.ts");
  const pushTest = read("src/routes/api.push.test.ts");
  assert.match(cron, /\/today\?source=push/);
  assert.match(cron, /\/exams\/\$\{exams\[0\]\.id\}\?source=push/);
  assert.match(cron, /\/progress\?source=push/);
  assert.match(cron, /\/plan\?source=push/);
  assert.match(pushTest, /\/today\?source=push-test/);
  assert.match(cron, /response\.status === 404 \|\| response\.status === 410/);
  assert.match(cron, /quiet_hours_start/);
  assert.match(cron, /delivery_key/);
});

test("README documents current Structure V4 navigation instead of the legacy five-tab model", () => {
  const readme = read("README.md");
  for (const label of ["Tänään", "Suunnitelma", "Opinnot", "Harjoittelu", "Edistyminen"]) {
    assert.ok(readme.includes("**" + label + "**"));
  }
  assert.match(readme, /Final Release Gate/);
  assert.match(readme, /\/studies\/:courseCode/);
  assert.equal(readme.includes("Tänään | Suunnitelma | + | Kurssit | Kehitys"), false);
});
