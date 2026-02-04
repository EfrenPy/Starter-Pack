import { getSearchIndex, searchArticles, getSnippet } from './search-index.js';

export async function initSearch() {
  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get('query');
  if (!query) return;

  const resultsContainer = document.getElementById('search-results');
  if (!resultsContainer) return;

  const pathLang = window.location.pathname.match(/^\/(es|en|it|fr)\//);
  const lang = pathLang ? pathLang[1] : 'es';
  const msgs = {
    es: { noResults: 'No se encontraron resultados.', error: 'Error al cargar los resultados de busqueda.', result: 'resultado', results: 'resultados', found: 'encontrado', founds: 'encontrados' },
    en: { noResults: 'No results found.', error: 'Error loading search results.', result: 'result', results: 'results', found: 'found', founds: 'found' },
    it: { noResults: 'Nessun risultato trovato.', error: 'Errore nel caricamento dei risultati.', result: 'risultato', results: 'risultati', found: 'trovato', founds: 'trovati' },
    fr: { noResults: 'Aucun resultat trouve.', error: 'Erreur lors du chargement des resultats.', result: 'resultat', results: 'resultats', found: 'trouve', founds: 'trouves' }
  };
  const m = msgs[lang] || msgs.es;
  const noResultsMsg = m.noResults;
  const errorMsg = m.error;

  try {
    await getSearchIndex(lang);
    const results = searchArticles(query, lang);

    const countMsg = `${results.length} ${results.length !== 1 ? m.results : m.result} ${results.length !== 1 ? m.founds : m.found}.`;
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
