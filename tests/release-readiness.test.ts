import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";

const read = (path: string) =>
  readFileSync(new URL("../" + path, import.meta.url), "utf8");

function browserSourceFiles(root: string): string[] {
  const absolute = new URL("../" + root, import.meta.url);
  const output: string[] = [];
  for (const name of readdirSync(absolute)) {
    const relative = root + "/" + name;
    const url = new URL("../" + relative, import.meta.url);
    if (statSync(url).isDirectory()) {
      output.push(...browserSourceFiles(relative));
      continue;
    }
    if (!/\.(ts|tsx)$/.test(name) || name.includes(".server.")) continue;
    output.push(relative);
  }
  return output;
}

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

test("visual regression has a deterministic baseline generator before it becomes release-blocking", () => {
  const spec = read("e2e/visual-regression.spec.ts");
  const workflow = read(".github/workflows/visual-baselines.yml");
  const pkg = JSON.parse(read("package.json")) as { scripts: Record<string,string> };

  assert.match(spec, /toHaveScreenshot/);
  assert.match(spec, /mobile-tabbar-390\.png/);
  assert.match(spec, /tablet-sidebar-768\.png/);
  assert.match(spec, /desktop-sidebar-1440\.png/);
  assert.match(spec, /planner-month-1280\.png/);
  assert.match(spec, /mobile-practice-focus-390\.png/);
  assert.match(workflow, /workflow_dispatch/);
  assert.match(workflow, /base_url/);
  assert.match(workflow, /Verify exact deployed commit/);
  assert.match(workflow, /\/api\/release-info/);
  assert.match(workflow, /EXPECTED_SHA/);
  assert.match(workflow, /Baseline URL serves/);
  assert.match(workflow, /--update-snapshots|e2e:visual:baseline/);
  assert.match(workflow, /upload-artifact@v4/);
  assert.match(pkg.scripts["e2e:visual:baseline"], /visual-regression\.spec\.ts/);
  assert.match(pkg.scripts["e2e:visual:baseline"], /--update-snapshots/);
});

test("Final Release Gate automatically uses committed visual baselines when available", () => {
  const workflow = read(".github/workflows/iphone-e2e.yml");
  assert.match(workflow, /Detect committed visual baselines/);
  assert.match(workflow, /visual-regression\.spec\.ts-snapshots/);
  assert.match(workflow, /available=true/);
  assert.match(workflow, /Visual regression against committed baselines/);
  assert.match(workflow, /e2e\/visual-regression\.spec\.ts/);
  assert.match(workflow, /steps\.visual_baselines\.outputs\.available == 'true'/);
});

test("physical push delivery is an explicit manual workflow", () => {
  const workflow = read(".github/workflows/push-device-check.yml");
  assert.match(workflow, /workflow_dispatch/);
  assert.match(workflow, /SEND_PUSH_TEST/);
  assert.match(workflow, /push-delivery\.spec\.ts/);
});

test("browser-facing source cannot reference server-only secrets", () => {
  const roots = ["src/app", "src/components", "src/features", "src/lib"];
  const files = roots.flatMap(browserSourceFiles);
  const forbidden = [
    "SUPABASE_SERVICE_ROLE_KEY",
    "POSTGRES_URL",
    "SUPABASE_JWT_SECRET",
  ];

  for (const path of files) {
    const content = read(path);
    for (const token of forbidden) {
      assert.equal(
        content.includes(token),
        false,
        path + " must not reference server-only secret " + token,
      );
    }
  }
});

test("browser-facing source cannot import server-only modules", () => {
  const roots = ["src/app", "src/components", "src/features", "src/lib"];
  const files = roots.flatMap(browserSourceFiles);

  for (const path of files) {
    const content = read(path);
    assert.doesNotMatch(
      content,
      /from\s+["'][^"']*\.server(?:\.[^"']*)?["']/,
      path + " must not import a server-only module",
    );
    assert.doesNotMatch(
      content,
      /import\(["'][^"']*\.server(?:\.[^"']*)?["']\)/,
      path + " must not dynamically import a server-only module",
    );
  }
});

test("secure study migration revokes anonymous access and binds planner rows to the authenticated owner", () => {
  const migration = read("supabase/migrations/20260928190000_secure_study_data.sql");
  assert.match(migration, /REVOKE ALL ON[\s\S]*FROM anon;/);
  assert.match(migration, /ALTER TABLE public\.plan_items ALTER COLUMN owner_id SET DEFAULT auth\.uid\(\)/);
  assert.match(migration, /CREATE POLICY "personal study data" ON public\.plan_items FOR ALL TO authenticated/);
  assert.match(migration, /USING \(owner_id = \(select auth\.uid\(\)\)\)/);
  assert.match(migration, /WITH CHECK \(owner_id = \(select auth\.uid\(\)\)[\s\S]*EXISTS \(SELECT 1 FROM public\.courses c/);
});

test("Study OS browser flows never fall back to blocking native prompt confirm or alert dialogs", () => {
  const roots = ["src/app", "src/features"];
  const files = roots.flatMap(browserSourceFiles);
  const forbidden = /\b(?:window\.)?(?:prompt|confirm|alert)\s*\(/;

  for (const path of files) {
    assert.doesNotMatch(
      read(path),
      forbidden,
      path + " must use an in-app dialog, sheet, or toast instead of a blocking browser dialog",
    );
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
