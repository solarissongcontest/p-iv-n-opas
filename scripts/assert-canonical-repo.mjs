const canonicalOwner = "solarissongcontest";
const canonicalRepo = "p-iv-n-opas";
const canonicalFull = canonicalOwner + "/" + canonicalRepo;

function fail(actual, environment) {
  console.error(
    "[canonical-repo] Refusing " + environment + " build from " + actual +
    ". Opintopäiväkirja production belongs only to " + canonicalFull + ".",
  );
  process.exit(1);
}

const githubRepository = process.env.GITHUB_REPOSITORY;
if (githubRepository && githubRepository !== canonicalFull) {
  fail(githubRepository, "GitHub");
}

const vercelSlug = process.env.VERCEL_GIT_REPO_SLUG;
const vercelOwner = process.env.VERCEL_GIT_REPO_OWNER;
if (process.env.VERCEL === "1" && (vercelSlug || vercelOwner)) {
  const actual = (vercelOwner || "?") + "/" + (vercelSlug || "?");
  if (vercelSlug !== canonicalRepo || (vercelOwner && vercelOwner !== canonicalOwner)) {
    fail(actual, "Vercel");
  }
}

console.log("[canonical-repo] OK: " + canonicalFull);
