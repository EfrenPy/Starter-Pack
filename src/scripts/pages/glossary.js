document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('glossary-filter');
  const pills = document.querySelectorAll('.glossary-pill');
  const cards = document.querySelectorAll('.glossary-card');
  const noResults = document.getElementById('glossary-no-results');
  if (!input || !cards.length) return;

  let activeCategory = 'all';

  function filter() {
    const text = input.value.toLowerCase().trim();
    let visible = 0;
    cards.forEach(card => {
      const matchCat = activeCategory === 'all' || card.dataset.category === activeCategory;
      const matchText = !text || card.textContent.toLowerCase().includes(text);
      const show = matchCat && matchText;
      card.hidden = !show;
      if (show) visible++;
    });
    if (noResults) noResults.hidden = visible > 0;
  }

  input.addEventListener('input', filter);

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('glossary-pill--active'));
      pill.classList.add('glossary-pill--active');
      activeCategory = pill.dataset.category;
      filter();
    });
  });
});
