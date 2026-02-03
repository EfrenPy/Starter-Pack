const STORAGE_KEY = 'cern-checklist-progress';

export function initChecklist() {
  const checkboxes = document.querySelectorAll('[data-checklist-id]');
  if (!checkboxes.length) return;

  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { /* ignore corrupt data */ }
  checkboxes.forEach(cb => {
    const id = cb.dataset.checklistId;
    if (saved[id]) cb.checked = true;
    cb.addEventListener('change', () => {
      saved[id] = cb.checked;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
      updateProgress(checkboxes);
    });
  });

  updateProgress(checkboxes);

  const resetBtn = document.getElementById('reset-checklist');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      localStorage.removeItem(STORAGE_KEY);
      checkboxes.forEach(cb => { cb.checked = false; });
      updateProgress(checkboxes);
    });
  }
}

function updateProgress(checkboxes) {
  const total = checkboxes.length;
  const checked = [...checkboxes].filter(cb => cb.checked).length;
  const pct = Math.round((checked / total) * 100);

  const fill = document.querySelector('.checklist-progress__fill');
  const text = document.querySelector('.checklist-progress__text');
  const bar = document.querySelector('.checklist-progress__bar');

  if (fill) fill.style.width = pct + '%';
  if (bar) bar.setAttribute('aria-valuenow', pct);
  if (text) {
    const lang = document.documentElement.lang || 'en';
    text.textContent = lang === 'es'
      ? `${checked} / ${total} completados`
      : `${checked} / ${total} completed`;
  }
}
