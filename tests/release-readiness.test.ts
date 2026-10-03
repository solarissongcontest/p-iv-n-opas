import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path: string) =>
  readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("browser and accessibility tooling are installed only for E2E jobs", () => {
  const pkg = JSON.parse(read("package.json")) as {
    scripts: Record<string,string>;
    devDependencies: Record<string,string>;
  };
  assert.equal(pkg.devDependencies["@playwright/test"], undefined);
  assert.equal(pkg.devDependencies["@axe-core/playwright"], undefined);
  assert.match(pkg.scripts["e2e:install"], /@playwright\/test@/);
  assert.match(pkg.scripts["e2e:install"], /@axe-core\/playwright@/);
  assert.equal(pkg.scripts.e2e, "playwright test");
  assert.ok(pkg.scripts["e2e:cross-device"]);
  assert.ok(pkg.scripts["e2e:visual"]);
  assert.match(read(".github/workflows/iphone-e2e.yml"), /npm run e2e:install/);
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

test("Final Release Gate waits for the exact production commit and runs the browser matrix", () => {
  const workflow = read(".github/workflows/iphone-e2e.yml");
  for (const token of [
    "Wait for this exact commit to reach production",
    "/api/release-info",
    "PRODUCTION_BASE_URL",
    "iphone-smoke.spec.ts",
    "release-gate.spec.ts",
    "v5-cross-device.spec.ts",
    "responsive-visual.spec.ts",
    'REQUIRE_GEMINI: "false"',
  ]) {
    assert.ok(workflow.includes(token), token);
  }
  assert.equal(workflow.includes("Wait for Vercel deployment result"), false);
  assert.equal(workflow.includes("Vercel deployment failed"), false);
  assert.match(workflow, /github\.event\.inputs\.base_url/);
  assert.equal(workflow.includes("${{ inputs.base_url }}"), false);
});

test("physical push delivery is an explicit manual workflow", () => {
  const workflow = read(".github/workflows/push-device-check.yml");
  assert.match(workflow, /workflow_dispatch/);
  assert.match(workflow, /SEND_PUSH_TEST/);
  assert.match(workflow, /push-delivery\.spec\.ts/);
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

test("README documents the simplified four-destination mobile navigation", () => {
  const readme = read("README.md");
  for (const label of ["Tänään", "Opinnot", "Edistyminen", "Lisää"]) {
    assert.ok(readme.includes("**" + label + "**"));
  }
  assert.match(readme, /neljän kohdan tab baria/);
  assert.match(readme, /Suunnitelma, Harjoittelu, Kokeet/);
  assert.match(readme, /Final Release Gate/);
  assert.match(readme, /\/studies\/:courseCode/);
  assert.equal(readme.includes("viiden kohdan tab baria"), false);
});


test("production build is side-effect free and database migration is explicit", () => {
  const pkg = JSON.parse(read("package.json")) as { scripts: Record<string,string> };
  assert.equal(pkg.scripts.build.includes("migrate-db"), false);
  assert.equal(pkg.scripts["db:migrate"], "node scripts/migrate-db.mjs");

  const migrate = read("scripts/migrate-db.mjs");
  assert.match(migrate, /POSTGRES_URL is required/);
  assert.match(migrate, /supabase@2\.117\.0/);
});


test("Quality Gate has a Bun frozen-lockfile parity build for Vercel", () => {
  const workflow = read(".github/workflows/quality.yml");
  assert.match(workflow, /vercel-build-parity/);
  assert.match(workflow, /oven-sh\/setup-bun@v2/);
  assert.match(workflow, /bun install --frozen-lockfile/);
  assert.match(workflow, /bun run build/);
});
