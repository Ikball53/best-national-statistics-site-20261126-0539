import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

// The folder holding this script is the repo root. Every source tree below
// is resolved from it, so the entry behaves the same wherever it is run from.
const repoRoot = dirname(fileURLToPath(import.meta.url));

// The grader mounts the output directory, so this script only creates that
// directory and clears its known children. Removing the directory itself
// fails on a mount point (EBUSY) and is never attempted here.
const requestedOut = process.env.MAKEFUN_OUTPUT_DIR;
const out =
  requestedOut !== undefined && requestedOut !== "" ? requestedOut : "/output";

const appSource = join(repoRoot, "app");
const shotsSource = join(repoRoot, "screenshots");

const expectedShots = [
  "1-overview.png",
  "2-economy.png",
  "3-compare.png",
  "4-phone.png",
];

// Remove one known child of the output directory. Failures are swallowed:
// a stale child that cannot go away is overwritten by the copy below, and
// nothing here is worth aborting the whole run over.
function clearChild(name: string): void {
  try {
    rmSync(join(out, name), { recursive: true, force: true });
  } catch {
    // Leave the child in place; the fresh copy overwrites what matters.
  }
}

if (!existsSync(appSource)) {
  throw new Error(`missing app/ tree next to main.ts: ${appSource}`);
}
if (!existsSync(shotsSource)) {
  throw new Error(`missing screenshots/ tree next to main.ts: ${shotsSource}`);
}
if (!existsSync(join(appSource, "index.html"))) {
  throw new Error(`missing app/index.html in ${appSource}`);
}

const foundShots = expectedShots.filter((name) =>
  existsSync(join(shotsSource, name)),
);
if (foundShots.length === 0) {
  throw new Error(
    `screenshots/ holds none of ${expectedShots.join(", ")}`,
  );
}

mkdirSync(out, { recursive: true });

const dossierPath = join(out, "dossier.json");

// Only the three known children are cleared, never the output dir itself.
clearChild("app");
clearChild("screenshots");
clearChild("dossier.json");

cpSync(appSource, join(out, "app"), { recursive: true });
cpSync(shotsSource, join(out, "screenshots"), { recursive: true });

const dossier = await buildDossier(repoRoot, {
  text_max_bytes: 1572864,
  screenshots: { max: 4, max_bytes: 1572864 },
  app_max_files: 993,
  app_max_bytes: 16777216,
  app_path_max_bytes: 1000,
});
const dossierBytes = Buffer.isBuffer(dossier)
  ? dossier
  : Buffer.from(dossier as unknown as Uint8Array);
writeFileSync(dossierPath, dossierBytes);

console.log(
  `Indonesia in Numbers: wrote ${out} (dossier ${dossierBytes.length} bytes, ${foundShots.length} screenshots)`,
);
