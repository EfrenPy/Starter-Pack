import { getSearchIndex, searchArticles, getSnippet } from './search-index.js';

export async function initSearch() {
  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get('query');
  if (!query) return;

  const resultsContainer = document.getElementById('search-results');
  if (!resultsContainer) return;

  const isSpanish = window.location.pathname.includes('/es/');
  const lang = isSpanish ? 'es' : 'en';

  const noResultsMsg = isSpanish ? 'No se encontraron resultados.' : 'No results found.';
  const errorMsg = isSpanish
    ? 'Error al cargar los resultados de busqueda.'
    : 'Error loading search results.';

  try {
    await getSearchIndex(lang);
    const results = searchArticles(query, lang);

    const countMsg = isSpanish
      ? `${results.length} resultado${results.length !== 1 ? 's' : ''} encontrado${results.length !== 1 ? 's' : ''}.`
      : `${results.length} result${results.length !== 1 ? 's' : ''} found.`;
    resultsContainer.setAttribute('aria-label', countMsg);

    if (results.length > 0) {
      results.forEach((article) => {
        const el = document.createElement('div');
        el.classList.add('search-result');

        const h3 = document.createElement('h3');
        const a = document.createElement('a');
        a.href = article.url;
        a.innerHTML = getSnippet(article.title, query);
        h3.appendChild(a);

        const p = document.createElement('p');
        p.innerHTML = getSnippet(article.content, query);

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
