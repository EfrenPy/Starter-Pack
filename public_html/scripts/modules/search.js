export async function initSearch() {
  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get('query');
  if (!query) return;

  const resultsContainer = document.getElementById('search-results');
  if (!resultsContainer) return;

  const isSpanish = window.location.pathname.includes('/es/');
  const languageFolder = isSpanish ? '/es/' : '/en/';

  const noResultsMsg = isSpanish ? 'No se encontraron resultados.' : 'No results found.';
  const errorMsg = isSpanish
    ? 'Error al cargar los resultados de busqueda.'
    : 'Error loading search results.';

  try {
    const normalize = (str) =>
      str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
    const normalizedQuery = normalize(query);

    const htmlFiles = [
      'beginning.html',
      'complete.html',
      'index.html',
      'legal-hub.html',
      'tax_declaration_spain.html',
      'technical-hub.html',
      'technical/vscode-remote.html',
    ];

    const parser = new DOMParser();
    const articles = await Promise.all(
      htmlFiles.map(async (file) => {
        const response = await fetch(`${languageFolder}${file}`);
        const content = await response.text();
        const doc = parser.parseFromString(content, 'text/html');
        return {
          title: doc.querySelector('title')?.textContent || '',
          url: `${languageFolder}${file}`,
          content: doc.body.textContent || '',
        };
      }),
    );

    const filtered = articles.filter(
      (article) =>
        normalize(article.title).includes(normalizedQuery) ||
        normalize(article.content).includes(normalizedQuery),
    );

    if (filtered.length > 0) {
      filtered.forEach((article) => {
        const el = document.createElement('div');
        el.classList.add('search-result');

        const h3 = document.createElement('h3');
        const a = document.createElement('a');
        a.href = article.url;
        a.textContent = article.title;
        h3.appendChild(a);

        const p = document.createElement('p');
        p.textContent = article.content.substring(0, 200) + '...';

        el.appendChild(h3);
        el.appendChild(p);
        resultsContainer.appendChild(el);
      });
    } else {
      const p = document.createElement('p');
      p.textContent = noResultsMsg;
      resultsContainer.appendChild(p);
    }
  } catch (error) {
    const p = document.createElement('p');
    p.textContent = errorMsg;
    resultsContainer.appendChild(p);
    console.error('Error searching articles:', error);
  }
}
