/**
 * Pre-builds search index JSON files from HTML pages.
 * Reads from the 11ty dist/ output directory.
 * Run as an eleventy.after event or standalone.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, '..', 'dist');

// 11ty outputs pages as slug/index.html directories
const PAGE_SLUGS = [
  'beginning',
  'complete',
  'index',
  'legal-hub',
  'tax_declaration_spain',
  'technical-hub',
  'technical/vscode-remote',
  'modelo-720',
  'return-to-spain',
  'checklist',
  'housing-guide',
  'cost-calculator',
  'technical/kerberos-ssh',
  'technical/root-setup',
  'technical/gitlab-setup',
  'health-insurance',
  'faq',
  'technical/cern-it-basics',
  'contribute',
  'daily-life-hub',
  'banking-setup',
  'transportation',
  'cern-shuttles',
  'cross-border-shopping',
  'childcare-schools',
  'utilities-setup',
  'on-site-services',
  'vehicle-green-plates',
  'language-training',
  'clubs-social',
  'family-support',
  'medical-emergency',
  'permits-registration',
  'cern-taxation',
  'pension-fund',
  'contracts-career',
  'safety-training',
  'access-cards',
  'telework-policy',
  'doctoral-guide',
  'first-weeks-guide',
  'french-swiss-taxes',
  'departure-guide',
  'outdoor-recreation',
  'currency-money',
  'technical/swan-jupyter',
  'frontalier-guide',
  'pre-arrival-guide',
  'relocation-moving',
  'parental-leave',
  'cern-benefits',
  'technical/eos-storage',
  'technical/lxplus-guide',
  'access-card-building-55',
  'shuttle-routes-timetables',
  'cross-border-tax-france-switzerland',
  'first-month-checklist',
  'newcomer-glossary',
];

function extractText(html) {
  // Strip tags, scripts, styles
  let text = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text;
}

function extractTitle(html) {
  const match = html.match(/<title[^>]*>(.*?)<\/title>/i);
  return match ? match[1].trim() : '';
}

function buildIndex(lang) {
  const folder = lang;
  const articles = [];

  for (const slug of PAGE_SLUGS) {
    // 11ty generates slug/index.html
    const filePath = resolve(DIST, folder, slug, 'index.html');
    try {
      const html = readFileSync(filePath, 'utf-8');
      articles.push({
        title: extractTitle(html),
        url: `/${folder}/${slug}/`,
        content: extractText(html),
      });
    } catch {
      // File may not exist for this language
    }
  }

  return articles;
}

// Build for both languages
for (const lang of ['es', 'en', 'it', 'fr']) {
  const articles = buildIndex(lang);
  const outDir = resolve(DIST, 'data');
  mkdirSync(outDir, { recursive: true });
  const outPath = resolve(outDir, `search-index-${lang}.json`);
  writeFileSync(outPath, JSON.stringify(articles));
  console.log(`Built search index: ${outPath} (${articles.length} articles)`);
}
