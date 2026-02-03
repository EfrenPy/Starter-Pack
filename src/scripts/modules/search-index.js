import Fuse from '../vendor/fuse.min.mjs';

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
];

const fuseCache = {};

function normalize(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

async function loadPrebuiltIndex(folder) {
  const lang = folder === '/es/' ? 'es' : 'en';
  try {
    const response = await fetch(`/data/search-index-${lang}.json`);
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

async function loadFromHTML(folder) {
  const parser = new DOMParser();
  const results = await Promise.all(
    PAGE_SLUGS.map(async (slug) => {
      try {
        const url = `${folder}${slug}/`;
        const response = await fetch(url);
        if (!response.ok) return null;
        const html = await response.text();
        const doc = parser.parseFromString(html, 'text/html');
        return {
          title: doc.querySelector('title')?.textContent || '',
          url: url,
          content: doc.body?.textContent || '',
        };
      } catch {
        return null;
      }
    }),
  );
  return results.filter(Boolean);
}

export async function getSearchIndex(language) {
  const folder = language === 'es' ? '/es/' : '/en/';
  const cacheKey = folder;

  if (fuseCache[cacheKey]) return fuseCache[cacheKey];

  // Try sessionStorage first
  const stored = sessionStorage.getItem('search-index-' + folder);
  if (stored) {
    try {
      const articles = JSON.parse(stored);
      const fuse = buildFuse(articles);
      fuseCache[cacheKey] = { articles, fuse };
      return fuseCache[cacheKey];
    } catch { /* ignore corrupt data, rebuild index below */ }
  }

  // Try pre-built JSON index (fast, no HTML parsing)
  let articles = await loadPrebuiltIndex(folder);

  // Fallback: fetch and parse HTML files at runtime
  if (!articles) {
    articles = await loadFromHTML(folder);
  }

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

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function highlightMatches(text, query) {
  if (!query) return escapeHtml(text);
  const safe = escapeHtml(text);
  const safeQuery = escapeHtml(query);
  const escaped = safeQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  return safe.replace(regex, '<mark>$1</mark>');
}
