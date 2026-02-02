/**
 * Pre-builds search index JSON files from HTML pages.
 * Run during build to avoid runtime HTML fetching/parsing.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_HTML = resolve(__dirname, '..', 'public_html');

const HTML_FILES = [
  'beginning.html',
  'complete.html',
  'index.html',
  'legal-hub.html',
  'tax_declaration_spain.html',
  'technical-hub.html',
  'technical/vscode-remote.html',
  'modelo-720.html',
  'return-to-spain.html',
  'checklist.html',
  'housing-guide.html',
  'cost-calculator.html',
  'technical/kerberos-ssh.html',
  'technical/root-setup.html',
  'technical/gitlab-setup.html',
  'health-insurance.html',
  'faq.html',
  'technical/cern-it-basics.html',
  'contribute.html',
  'daily-life-hub.html',
  'banking-setup.html',
  'transportation.html',
  'cross-border-shopping.html',
  'childcare-schools.html',
  'utilities-setup.html',
  'on-site-services.html',
  'vehicle-green-plates.html',
  'language-training.html',
  'clubs-social.html',
  'family-support.html',
  'medical-emergency.html',
  'permits-registration.html',
  'cern-taxation.html',
  'pension-fund.html',
  'contracts-career.html',
  'safety-training.html',
  'access-cards.html',
  'telework-policy.html',
  'doctoral-guide.html',
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
  const folder = lang === 'es' ? 'es' : 'en';
  const articles = [];

  for (const file of HTML_FILES) {
    const filePath = resolve(PUBLIC_HTML, folder, file);
    try {
      const html = readFileSync(filePath, 'utf-8');
      articles.push({
        title: extractTitle(html),
        url: `/${folder}/${file}`,
        content: extractText(html),
      });
    } catch {
      // File may not exist for this language
    }
  }

  return articles;
}

// Build for both languages
for (const lang of ['es', 'en']) {
  const articles = buildIndex(lang);
  const outDir = resolve(PUBLIC_HTML, 'data');
  mkdirSync(outDir, { recursive: true });
  const outPath = resolve(outDir, `search-index-${lang}.json`);
  writeFileSync(outPath, JSON.stringify(articles));
  console.log(`Built search index: ${outPath} (${articles.length} articles)`);
}
