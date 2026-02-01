import Fuse from 'fuse.js';

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

const fuseCache = {};

function normalize(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export async function getSearchIndex(language) {
  const folder = language === 'es' ? '/es/' : '/en/';
  const cacheKey = folder;

  if (fuseCache[cacheKey]) return fuseCache[cacheKey];

  // Try sessionStorage
  const stored = sessionStorage.getItem('search-index-' + folder);
  if (stored) {
    const articles = JSON.parse(stored);
    const fuse = buildFuse(articles);
    fuseCache[cacheKey] = { articles, fuse };
    return fuseCache[cacheKey];
  }

  const parser = new DOMParser();
  const articles = await Promise.all(
    HTML_FILES.map(async (file) => {
      const response = await fetch(`${folder}${file}`);
      const html = await response.text();
      const doc = parser.parseFromString(html, 'text/html');
      return {
        title: doc.querySelector('title')?.textContent || '',
        url: `${folder}${file}`,
        content: doc.body?.textContent || '',
      };
    }),
  );

  sessionStorage.setItem('search-index-' + folder, JSON.stringify(articles));
  const fuse = buildFuse(articles);
  fuseCache[cacheKey] = { articles, fuse };
  return fuseCache[cacheKey];
}

function buildFuse(articles) {
  return new Fuse(articles, {
    keys: [
      { name: 'title', weight: 2 },
      { name: 'content', weight: 1 },
    ],
    threshold: 0.3,
    includeMatches: true,
    ignoreLocation: true,
    minMatchCharLength: 2,
    getFn: (obj, path) => normalize(Fuse.config.getFn(obj, path) || ''),
  });
}

export function searchArticles(query, language) {
  const cacheKey = language === 'es' ? '/es/' : '/en/';
  const cached = fuseCache[cacheKey];
  if (!cached) return [];

  const results = cached.fuse.search(normalize(query));
  return results.map((r) => ({
    title: r.item.title,
    url: r.item.url,
    content: r.item.content,
    score: r.score,
    matches: r.matches,
  }));
}

export function getSnippet(content, query, length = 120) {
  const normalContent = normalize(content);
  const normalQuery = normalize(query);
  const idx = normalContent.indexOf(normalQuery);

  let start = 0;
  let snippet;
  if (idx >= 0) {
    start = Math.max(0, idx - 60);
    const end = Math.min(content.length, idx + query.length + 60);
    snippet = (start > 0 ? '...' : '') + content.slice(start, end) + (end < content.length ? '...' : '');
  } else {
    snippet = content.substring(0, length) + '...';
  }

  return highlightMatches(snippet, query);
}

export function highlightMatches(text, query) {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}
