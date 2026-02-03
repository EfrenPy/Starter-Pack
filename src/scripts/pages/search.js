import { initSearch } from '../modules/search.js';
import { initLiveSearch } from '../modules/live-search.js';

document.addEventListener('DOMContentLoaded', async () => {
  await initSearch();
  initLiveSearch();
});
