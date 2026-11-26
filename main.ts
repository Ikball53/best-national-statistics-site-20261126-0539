import { cpSync, existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = dirname(fileURLToPath(import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR || '/output';

const appIndex = join(repoRoot, 'app', 'index.html');
if (!existsSync(appIndex)) {
  throw new Error('entry is incomplete: app/index.html is missing');
}

mkdirSync(out, { recursive: true });

for (const dir of ['app', 'screenshots']) {
  const src = join(repoRoot, dir);
  if (existsSync(src)) cpSync(src, join(out, dir), { recursive: true });
}

writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);

const appCount = readdirSync(join(out, 'app')).length;
const shotCount = existsSync(join(out, 'screenshots')) ? readdirSync(join(out, 'screenshots')).length : 0;
console.log('wrote dossier to ' + join(out, 'dossier.json') + ' (' + appCount + ' app entries, ' + shotCount + ' screenshots)');
