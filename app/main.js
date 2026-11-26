// Router and controls for Indonesia in Numbers.
// Hash routes: #/ home, #/economy, #/people, #/regions, #/sources.
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import { SERIES } from './data.js';
import { drawChart } from './charts.js';
import { homeView, economyView, peopleView, regionsView, sourcesView, missingView } from './views.js';

const app = document.getElementById('app');

// Page state that survives re-renders within one visit.
const state = {
  chartType: 'bar',
  range: 'all',
  metric: 'gdpGrowth',
  query: '',
  sortKey: 'pop',
  selected: 'West Java',
};

function route() {
  const hash = location.hash || '#/';
  if (hash === '#/' || hash === '#') return 'home';
  if (hash.startsWith('#/economy')) return 'economy';
  if (hash.startsWith('#/people')) return 'people';
  if (hash.startsWith('#/regions')) return 'regions';
  if (hash.startsWith('#/sources')) return 'sources';
  return 'missing';
}

function filteredSeries(key) {
  const s = SERIES[key];
  if (state.range === 'recent') {
    return { ...s, data: s.data.filter(([y]) => y >= 2020) };
  }
  return s;
}

function paintCharts() {
  document.querySelectorAll('canvas.chart').forEach((canvas) => {
    const key = canvas.dataset.series;
    if (SERIES[key]) drawChart(canvas, filteredSeries(key), { type: state.chartType });
  });
}

function render() {
  window.__shotReady = false;
  const page = route();
  const titles = {
    home: 'Indonesia in Numbers — National Statistics',
    economy: 'Economy | Indonesia in Numbers',
    people: 'People | Indonesia in Numbers',
    regions: 'Provinces | Indonesia in Numbers',
    sources: 'Sources & Method | Indonesia in Numbers',
  };
  document.title = titles[page] || 'Indonesia in Numbers';
  document.querySelectorAll('.main-nav a').forEach((a) => {
    a.classList.toggle('active', a.dataset.nav === page);
  });
  if (page === 'economy') app.innerHTML = economyView(state);
  else if (page === 'people') app.innerHTML = peopleView(state);
  else if (page === 'regions') app.innerHTML = regionsView(state);
  else if (page === 'sources') app.innerHTML = sourcesView();
  else if (page === 'home') app.innerHTML = homeView(state);
  else app.innerHTML = missingView();
  paintCharts();
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

function rerenderChartsOnly() {
  paintCharts();
}

// One delegated listener for every control on every page.
document.addEventListener('click', (ev) => {
  const typeBtn = ev.target.closest('[data-chart-type]');
  if (typeBtn) {
    state.chartType = typeBtn.dataset.chartType;
    document.querySelectorAll('[data-chart-type]').forEach((b) =>
      b.setAttribute('aria-pressed', String(b === typeBtn)));
    rerenderChartsOnly();
    return;
  }
  const rangeBtn = ev.target.closest('[data-range]');
  if (rangeBtn) {
    state.range = rangeBtn.dataset.range;
    document.querySelectorAll('[data-range]').forEach((b) =>
      b.setAttribute('aria-pressed', String(b === rangeBtn)));
    rerenderChartsOnly();
    return;
  }
  const tab = ev.target.closest('[data-metric]');
  if (tab) {
    state.metric = tab.dataset.metric;
    render();
    return;
  }
  const sortBtn = ev.target.closest('[data-sort]');
  if (sortBtn) {
    state.sortKey = sortBtn.dataset.sort;
    render();
    return;
  }
  const row = ev.target.closest('tr[data-province]');
  if (row) {
    state.selected = row.dataset.province;
    render();
    return;
  }
});

document.addEventListener('input', (ev) => {
  if (ev.target.id === 'province-search') {
    state.query = ev.target.value;
    // Re-render the table without losing the caret: only the table body,
    // the count and the detail box change; the input itself stays put.
    const keep = ev.target.value;
    const caret = ev.target.selectionStart;
    render();
    const again = document.getElementById('province-search');
    if (again) {
      again.focus();
      again.setSelectionRange(caret, caret);
    }
    void keep;
  }
});

window.addEventListener('hashchange', render);
window.addEventListener('resize', () => {
  // Redraw charts at the new width, debounced.
  clearTimeout(window.__resizeTimer);
  window.__resizeTimer = setTimeout(paintCharts, 120);
});
render();
