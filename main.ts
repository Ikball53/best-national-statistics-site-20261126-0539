// Indonesia in Numbers — entry hand-in program.
//
// Copies the static site (app/) and its screenshots (screenshots/) from this
// repository into the output directory and writes the dossier.json for the
// entry, built with the kit's makefun-frontend library.
//
// Run outside the grader with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Inside the grader /output is used instead of MAKEFUN_OUTPUT_DIR.

import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)));

function outputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv !== undefined && fromEnv !== "") return resolve(fromEnv);
  return "/output";
}

function copyTree(source: string, target: string): void {
  if (!existsSync(source)) {
    throw new Error(`Indonesia in Numbers: missing ${source}`);
  }
  cpSync(source, target, { recursive: true });
}

function main(): void {
  const out = outputDir();
  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });

  copyTree(join(repoRoot, "app"), join(out, "app"));
  copyTree(join(repoRoot, "screenshots"), join(out, "screenshots"));

  const dossier = buildDossier(repoRoot, {
    text_max_bytes: 1572864,
    screenshots: { max: 4, max_bytes: 1572864 },
    app_max_files: 993,
    app_max_bytes: 16777216,
    app_path_max_bytes: 1000,
  });
  writeFileSync(join(out, "dossier.json"), dossier);

  // The dossier embeds the screenshots, so refuse a hand-in with none.
  const shotNames = ["1-overview.png", "2-economy.png", "3-compare.png", "4-phone.png"];
  const shotCount = shotNames.filter((name) => existsSync(join(repoRoot, "screenshots", name))).length;
  if (shotCount === 0) {
    throw new Error("Indonesia in Numbers: no screenshots in screenshots/ — take 3 or 4 real renders first");
  }
  console.log(`Indonesia in Numbers: wrote ${out} (dossier ${dossier.length} bytes, ${shotCount} screenshots)`);
}

main();
