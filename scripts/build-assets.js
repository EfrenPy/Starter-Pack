/**
 * Fingerprints CSS/JS so they can be cached immutably while still updating on
 * change (new content -> new filename). Runs BEFORE Eleventy so templates can
 * reference the hashed URLs via a manifest (.asset-manifest.json).
 *
 * - JS entry points are bundled with esbuild (imports inlined, minified) and
 *   emitted as scripts/<name>.<hash>.js.
 * - styles.css is hashed to css/styles.<hash>.css.
 * - Writes .asset-manifest.json mapping the canonical path -> hashed path.
 */
import esbuild from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'fs';
import { resolve, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = resolve(root, 'dist');

// JS entry points (each is bundled standalone; shared modules get inlined).
const JS_ENTRIES = [
  'src/scripts/common.js',
  'src/scripts/pages/home.js',
  'src/scripts/pages/checklist.js',
  'src/scripts/pages/cost-calculator.js',
  'src/scripts/pages/first-month-checklist.js',
  'src/scripts/pages/glossary.js',
  'src/scripts/pages/search.js',
];

function shortHash(buf) {
  return createHash('sha256').update(buf).digest('hex').slice(0, 10);
}

async function run() {
  const manifest = {};

  // Clean previous fingerprinted output so stale hashed files don't accumulate.
  for (const dir of ['scripts', 'css']) {
    rmSync(resolve(DIST, dir), { recursive: true, force: true });
  }
  mkdirSync(resolve(DIST, 'scripts', 'pages'), { recursive: true });
  mkdirSync(resolve(DIST, 'css'), { recursive: true });

  // ---- CSS ----
  const cssSrc = readFileSync(resolve(root, 'src/css/styles.css'));
  const cssHash = shortHash(cssSrc);
  const cssName = `styles.${cssHash}.css`;
  writeFileSync(resolve(DIST, 'css', cssName), cssSrc);
  manifest['/css/styles.css'] = `/css/${cssName}`;

  // ---- JS (bundled + hashed) ----
  const result = await esbuild.build({
    entryPoints: JS_ENTRIES.map((e) => resolve(root, e)),
    bundle: true,
    minify: true,
    format: 'esm',
    target: ['es2020'],
    outdir: resolve(DIST, 'scripts'),
    entryNames: '[dir]/[name].[hash]',
    outbase: resolve(root, 'src/scripts'),
    metafile: true,
    logLevel: 'warning',
  });

  for (const [outPath, meta] of Object.entries(result.metafile.outputs)) {
    if (!meta.entryPoint) continue;
    // canonical URL from the source entry, e.g. src/scripts/pages/home.js -> /scripts/pages/home.js
    const canonical = '/' + meta.entryPoint.replace(/^src\/scripts\//, 'scripts/');
    const hashedUrl = '/' + outPath.replace(/^dist\//, '').replace(/\\/g, '/');
    manifest[canonical] = hashedUrl;
  }

  writeFileSync(resolve(root, '.asset-manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`Built ${Object.keys(manifest).length} fingerprinted assets:`);
  for (const [k, v] of Object.entries(manifest)) console.log(`  ${k} -> ${v}`);
}

run().catch((e) => {
  console.error('Asset build failed:', e);
  process.exit(1);
});
