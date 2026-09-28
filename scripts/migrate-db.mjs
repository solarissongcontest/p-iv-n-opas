import { spawnSync } from "node:child_process";

const isVercel = process.env.VERCEL === "1";
const isProduction = process.env.VERCEL_ENV === "production";
const databaseUrl = process.env.POSTGRES_URL;

if (isVercel && !isProduction) {
  console.log("[db] Preview build: skipping production database migrations.");
  process.exit(0);
}

if (!databaseUrl) {
  console.log("[db] POSTGRES_URL is not set; skipping database migrations.");
  process.exit(0);
}

console.log("[db] Applying pending Supabase migrations...");
const command = process.platform === "win32" ? "npx.cmd" : "npx";
const result = spawnSync(
  command,
  [
    "--yes",
    "supabase@2.117.0",
    "db",
    "push",
    "--db-url",
    databaseUrl,
  ],
  {
    stdio: "inherit",
    env: process.env,
  },
);

if (result.error) {
  console.error("[db] Failed to start Supabase CLI:", result.error);
  process.exit(1);
}

if (result.status !== 0) {
  console.error(`[db] Migration failed with exit code ${result.status ?? "unknown"}.`);
  process.exit(result.status ?? 1);
}

console.log("[db] Database schema is up to date.");
