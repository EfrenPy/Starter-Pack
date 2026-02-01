import { getSearchIndex, searchArticles, getSnippet } from './search-index.js';

export function initLiveSearch() {
  const inputs = document.querySelectorAll('.search-box__input');
  inputs.forEach((input) => setupLiveSearch(input));
}

function setupLiveSearch(input) {
  const isSearchPage = !!document.getElementById('search-results');
  const lang = window.location.pathname.includes('/es/') ? 'es' : 'en';
  let debounceTimer = null;
  let dropdown = null;
  let activeIndex = -1;

  // Preload search index
  getSearchIndex(lang);

  if (!isSearchPage) {
    dropdown = document.createElement('div');
    dropdown.className = 'search-dropdown';
    dropdown.hidden = true;
    dropdown.setAttribute('role', 'listbox');
    input.parentElement.style.position = 'relative';
    input.parentElement.appendChild(dropdown);
  }

  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    const query = input.value.trim();
    if (query.length < 2) {
      hideResults();
      return;
    }
    debounceTimer = setTimeout(() => doSearch(query), 300);
  });

  input.addEventListener('keydown', (e) => {
    if (!dropdown || dropdown.hidden) return;
    const items = dropdown.querySelectorAll('.search-dropdown__item');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, items.length - 1);
      updateActive(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      updateActive(items);
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      const link = items[activeIndex]?.querySelector('a');
      if (link) window.location.href = link.href;
    } else if (e.key === 'Escape') {
      hideResults();
    }
  });

  document.addEventListener('click', (e) => {
    if (dropdown && !input.contains(e.target) && !dropdown.contains(e.target)) {
      hideResults();
    }
  });

  async function doSearch(query) {
    await getSearchIndex(lang);
    const results = searchArticles(query, lang);

    if (isSearchPage) {
      renderInline(results, query);
    } else {
      renderDropdown(results, query);
    }
  }

  function renderDropdown(results, query) {
    if (!dropdown) return;
    dropdown.innerHTML = '';
    activeIndex = -1;

    if (results.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'search-dropdown__item';
      empty.textContent = lang === 'es' ? 'Sin resultados' : 'No results';
      dropdown.appendChild(empty);
    } else {
      results.slice(0, 6).forEach((r) => {
        const item = document.createElement('div');
        item.className = 'search-dropdown__item';
        item.setAttribute('role', 'option');
        const a = document.createElement('a');
        a.href = r.url;
        a.innerHTML = `<strong>${getSnippet(r.title, query)}</strong>`;
        item.appendChild(a);
        dropdown.appendChild(item);
      });
    }

    dropdown.hidden = false;
  }

  function renderInline(results, query) {
    const container = document.getElementById('search-results');
    if (!container) return;
    container.innerHTML = '';

    if (results.length === 0) {
      const p = document.createElement('p');
      p.textContent = lang === 'es' ? 'No se encontraron resultados.' : 'No results found.';
      container.appendChild(p);
      return;
    }

    results.forEach((r) => {
      const el = document.createElement('div');
      el.classList.add('search-result');

      const h3 = document.createElement('h3');
      const a = document.createElement('a');
      a.href = r.url;
      a.innerHTML = getSnippet(r.title, query);
      h3.appendChild(a);

      const p = document.createElement('p');
      p.innerHTML = getSnippet(r.content, query);

      el.appendChild(h3);
      el.appendChild(p);
      container.appendChild(el);
    });
  }

  function hideResults() {
    if (dropdown) {
      dropdown.hidden = true;
      dropdown.innerHTML = '';
      activeIndex = -1;
    }
  }

  function updateActive(items) {
    items.forEach((item, i) => {
      item.classList.toggle('search-dropdown__item--active', i === activeIndex);
    });
  }
}
