export function initToc() {
  const container = document.querySelector('main .container');
  if (!container) return;

  const headings = container.querySelectorAll('h2, h3');
  if (headings.length < 3) return;

  const lang = document.documentElement.lang || 'en';
  const tocTitle = lang === 'es' ? 'Tabla de contenidos' : 'Table of Contents';

  // Ensure headings have IDs
  const slugs = new Set();
  headings.forEach((h) => {
    if (!h.id) {
      let slug = h.textContent
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      while (slugs.has(slug)) slug += '-2';
      slugs.add(slug);
      h.id = slug;
    }
  });

  // Build TOC
  const nav = document.createElement('nav');
  nav.className = 'toc';
  nav.setAttribute('aria-label', tocTitle);

  const details = document.createElement('details');
  details.open = true;
  const summary = document.createElement('summary');
  summary.className = 'toc__title';
  summary.textContent = tocTitle;
  details.appendChild(summary);

  const ol = document.createElement('ol');
  ol.className = 'toc__list';
  let currentH2List = ol;

  headings.forEach((h) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#' + h.id;
    a.className = 'toc__link';
    a.textContent = h.textContent.trim();
    li.appendChild(a);

    if (h.tagName === 'H2') {
      ol.appendChild(li);
      const subOl = document.createElement('ol');
      subOl.className = 'toc__sublist';
      li.appendChild(subOl);
      currentH2List = subOl;
    } else {
      currentH2List.appendChild(li);
    }
  });

  details.appendChild(ol);
  nav.appendChild(details);
  container.classList.add('has-toc');
  container.insertBefore(nav, container.children[1] || null);

  // Scroll-spy
  if ('IntersectionObserver' in window) {
    const links = nav.querySelectorAll('.toc__link');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            links.forEach((l) => l.classList.remove('active'));
            const active = nav.querySelector(`a[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
          }
        });
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 },
    );

    headings.forEach((h) => observer.observe(h));
  }
}
