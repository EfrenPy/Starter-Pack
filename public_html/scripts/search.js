document.addEventListener('DOMContentLoaded', async () => {
  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get('query');

  if (query) {
    const resultsContainer = document.getElementById('search-results');

    try {
      console.log('Searching through articles...');

      // Normalize query for comparison
      const normalize = str => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      const normalizedQuery = normalize(query);

      // Predefined list of files in the language folder
      const languageFolder = window.location.pathname.includes('/es/') ? '/es/' : '/en/';
      const htmlFiles = [
        'beginning.html',
        'coffee.html',
        'index.html',
        'legal-hub.html',
        'tax_declaration_spain.html'
      ];

      const articles = [];
      const parser = new DOMParser();

      for (const file of htmlFiles) {
        const fileResponse = await fetch(`${languageFolder}${file}`);
        const fileContent = await fileResponse.text();
        const doc = parser.parseFromString(fileContent, 'text/html');

        const title = doc.querySelector('title')?.textContent || '';
        const bodyContent = doc.body.textContent || '';

        articles.push({
          title,
          url: `${languageFolder}${file}`,
          content: bodyContent
        });
      }

      // Filter articles based on the normalized query in titles or content
      const filteredArticles = articles.filter(article =>
        normalize(article.title).includes(normalizedQuery) ||
        normalize(article.content).includes(normalizedQuery)
      );

      console.log('Filtered articles:', filteredArticles);

      if (filteredArticles.length > 0) {
        filteredArticles.forEach(article => {
          const articleElement = document.createElement('div');
          articleElement.classList.add('search-result');
          articleElement.innerHTML = `
            <h3><a href="${article.url}">${article.title}</a></h3>
            <p>${article.content.substring(0, 200)}...</p>
          `;
          resultsContainer.appendChild(articleElement);
        });
      } else {
        resultsContainer.innerHTML = '<p>No se encontraron resultados.</p>';
      }
    } catch (error) {
      resultsContainer.innerHTML = '<p>Error al cargar los resultados de búsqueda.</p>';
      console.error('Error searching articles:', error);
    }
  }
});