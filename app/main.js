// Router and controls for the Kalandra statistics site.
// Hash routes: #/ (overview), #/population, #/economy, #/prices,
// #/health, #/education, #/regions, #/explorer.
// Every control on every page works: the year selector re-renders the page,
// the region selector switches the featured region, table headings sort,
// and the explorer search filters rows live.

import { YEARS, COUNTRY } from './data.js';
import { renderOverview, renderPopulation, renderEconomy, renderPrices, renderHealth, renderEducation, renderRegions, renderExplorer } from './views.js';

const app = document.getElementById('app');
const navLinks = Array.from(document.querySelectorAll('.main-nav a'));

let currentYear = COUNTRY.latestYear;
let currentRegion = 'aldermere';
let explorerQuery = '';

const ROUTES = {
  '': renderOverview,
  population: renderPopulation,
  economy: renderEconomy,
  prices: renderPrices,
  health: renderHealth,
  education: renderEducation,
  regions: renderRegions,
  explorer: renderExplorer,
};

const TITLES = {
  '': 'Kalandra in numbers',
  population: 'Population',
  economy: 'Economy',
  prices: 'Prices & Labour',
  health: 'Health',
  education: 'Education',
  regions: 'Regions',
  explorer: 'Data explorer & methodology',
};

function routeName() {
  const hash = window.location.hash.replace(/^#\/?/, '');
  return ROUTES[hash] ? hash : '';
}

function render() {
  const route = routeName();
  let html;
  if (route === 'regions') html = renderRegions(currentYear, currentRegion);
  else if (route === 'explorer') html = renderExplorer(explorerQuery);
  else html = ROUTES[route](currentYear);
  app.innerHTML = html;
  document.title = TITLES[route] + ' · Kalandra Statistics';
  navLinks.forEach((a) => {
    const target = a.getAttribute('href').replace(/^#\/?/, '');
    a.classList.toggle('active', target === route);
    if (target === route) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  wireControls(route);
  window.scrollTo(0, 0);
}

function wireControls(route) {
  const yearSelect = document.getElementById('year-select');
  if (yearSelect) {
    yearSelect.addEventListener('change', () => {
      const y = Number(yearSelect.value);
      if (YEARS.includes(y)) {
        currentYear = y;
        render();
      }
    });
  }
  const regionSelect = document.getElementById('region-select');
  if (regionSelect) {
    regionSelect.addEventListener('change', () => {
      currentRegion = regionSelect.value;
      render();
    });
  }
  const search = document.getElementById('explorer-search');
  if (search) {
    search.addEventListener('input', () => {
      explorerQuery = search.value;
      const pos = search.selectionStart;
      render();
      const again = document.getElementById('explorer-search');
      if (again) {
        again.focus();
        again.setSelectionRange(pos, pos);
      }
    });
  }
  document.querySelectorAll('table.sortable').forEach((table) => {
    table.querySelectorAll('th[data-sort]').forEach((th) => {
      th.addEventListener('click', () => sortTable(table, th));
      th.setAttribute('tabindex', '0');
      th.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          sortTable(table, th);
        }
      });
    });
  });
}

function cellValue(row, colIndex) {
  const text = row.cells[colIndex].textContent.trim();
  const num = Number(text.replace(/[$,%]/g, '').replace(/,/g, ''));
  return Number.isNaN(num) || text === '' ? text.toLowerCase() : num;
}

function sortTable(table, th) {
  const colIndex = Array.from(th.parentElement.children).indexOf(th);
  const ascending = th.getAttribute('data-dir') !== 'asc';
  table.querySelectorAll('th').forEach((h) => h.removeAttribute('data-dir'));
  th.setAttribute('data-dir', ascending ? 'asc' : 'desc');
  const rows = Array.from(table.tBodies[0].rows);
  rows.sort((a, b) => {
    const va = cellValue(a, colIndex);
    const vb = cellValue(b, colIndex);
    if (typeof va === 'number' && typeof vb === 'number') return ascending ? va - vb : vb - va;
    return ascending ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
  });
  rows.forEach((r) => table.tBodies[0].appendChild(r));
}

window.addEventListener('hashchange', render);
render();
