// Page templates for Indonesia in Numbers. Every value shown comes from
// data.js; views only lay it out. Charts are drawn by main.js after insert.

import { META, SERIES, INDICATORS, AGE_GROUPS, ISLANDS, PROVINCES, RELEASES } from './data.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export function heroStatCards() {
  return META.hero.map((s) => `<div class="stat-card">
    <div class="value">${esc(s.value)} <small>${esc(s.unit)}</small></div>
    <div class="label">${esc(s.label)}</div>
    <div class="source">${esc(s.source)}</div>
    <div class="delta ${s.up ? 'up' : 'down'}">${esc(s.delta)}</div>
  </div>`).join('');
}

export function homeView(state) {
  const kpis = INDICATORS.map((k) => `<div class="kpi">
    <div class="value">${esc(k.value)}</div>
    <div class="label">${esc(k.label)}</div>
    <div class="source">${esc(k.source)}</div>
    <div class="note">${esc(k.note)}</div>
  </div>`).join('');
  const releases = RELEASES.map((r) => `<li>
    <span class="badge">${esc(r.date)}</span><a href="${esc(r.link)}">${esc(r.title)}</a>
    <p>${esc(r.text)}</p>
  </li>`).join('');
  return `
  <div class="hero">
    <h1>Indonesia<br>in <span class="accent">Numbers</span></h1>
    <p class="lede">The country, measured: 281.6 million people, the world&rsquo;s 16th-largest
    economy, spread over 17,500 islands. Every figure below is a published statistic,
    with its source and year attached.</p>
    <div class="stat-grid">${heroStatCards()}</div>
    <p class="hero-note"><b>Latest:</b> GDP grew 5.03% in 2024 &middot; inflation 1.57% &middot;
    unemployment 4.91% &middot; poverty 8.57%. All BPS.</p>
  </div>

  <section>
    <div class="card">
      <div class="card-head">
        <div><h2>GDP growth, 2015–2024</h2>
        <p>Real GDP growth, % per year. The 2020 bar is the pandemic contraction.</p></div>
      </div>
      <div class="controls" role="group" aria-label="Chart controls">
        <span class="group-label">Show:</span>
        <button class="btn" data-chart-type="bar" aria-pressed="${state.chartType === 'bar'}">Bars</button>
        <button class="btn" data-chart-type="line" aria-pressed="${state.chartType === 'line'}">Line</button>
        <span class="group-label" style="margin-left:10px">Years:</span>
        <button class="btn" data-range="all" aria-pressed="${state.range === 'all'}">2015–2024</button>
        <button class="btn" data-range="recent" aria-pressed="${state.range === 'recent'}">2020–2024</button>
      </div>
      <div class="chart-wrap">
        <canvas class="chart" data-series="gdpGrowth" aria-label="Bar chart of GDP growth 2015 to 2024"></canvas>
        <div class="chart-tip" aria-hidden="true"></div>
      </div>
      <p class="source-line"><b>Source:</b> BPS, real GDP growth at constant 2010 prices.
      2024: 5.03%. Hover over a bar to read its value.</p>
    </div>
  </section>

  <section>
    <h2>Headline indicators</h2>
    <p class="section-intro">The six numbers most visitors come for, each with its source and year.</p>
    <div class="grid-3">${kpis}</div>
  </section>

  <section>
    <div class="card">
      <h2>Latest releases</h2>
      <p class="section-intro">What the newest statistics say, in one line each.</p>
      <ul class="link-list">${releases}</ul>
    </div>
    <div class="grid-2">
      <div class="card">
        <h3>Explore by topic</h3>
        <ul class="link-list">
          <li><a href="#/economy">Economy &rarr;</a><p>Growth, inflation, unemployment and poverty, 2015–2024.</p></li>
          <li><a href="#/people">People &rarr;</a><p>Population growth, age structure and where Indonesians live.</p></li>
          <li><a href="#/regions">Provinces &rarr;</a><p>The 12 largest provinces, searchable and sortable.</p></li>
        </ul>
      </div>
      <div class="card">
        <h3>How to read this site</h3>
        <p>Figures are the published values, rounded as published. A figure&rsquo;s
        source and year sit directly under it — if a number has no source line,
        it is not on this site. See <a href="#/sources">Sources &amp; method</a>
        for the full list and the rounding rules.</p>
        <p><span class="badge amber">38 provinces</span><span class="badge">17,508 islands</span>
        <span class="badge">1.90m km&sup2;</span></p>
      </div>
    </div>
  </section>`;
}

const ECONOMY_METRICS = ['gdpGrowth', 'inflation', 'unemployment', 'poverty', 'gdpNominal'];

export function economyView(state) {
  const metric = SERIES[state.metric];
  const tabs = ECONOMY_METRICS.map((key) => `<button class="tab" role="tab"
    data-metric="${key}" aria-selected="${state.metric === key}">${esc(SERIES[key].title)}</button>`).join('');
  const rows = metric.data.map(([y, v]) => `<tr>
    <td>${y}</td><td class="num">${esc(metric.format(v))}</td>
  </tr>`).join('');
  return `
  <section>
    <h2>The economy, 2015–2024</h2>
    <p class="section-intro">Pick an indicator to chart it. The table below follows the chart,
    and every figure names its source.</p>
    <div class="card">
      <div class="tabs" role="tablist" aria-label="Economic indicators">${tabs}</div>
      <div class="controls" role="group" aria-label="Chart controls">
        <span class="group-label">Show:</span>
        <button class="btn" data-chart-type="bar" aria-pressed="${state.chartType === 'bar'}">Bars</button>
        <button class="btn" data-chart-type="line" aria-pressed="${state.chartType === 'line'}">Line</button>
        <span class="group-label" style="margin-left:10px">Years:</span>
        <button class="btn" data-range="all" aria-pressed="${state.range === 'all'}">2015–2024</button>
        <button class="btn" data-range="recent" aria-pressed="${state.range === 'recent'}">2020–2024</button>
      </div>
      <div class="chart-wrap">
        <canvas class="chart" data-series="${esc(state.metric)}" aria-label="Chart of ${esc(metric.title)}"></canvas>
        <div class="chart-tip" aria-hidden="true"></div>
      </div>
      <p class="source-line"><b>Source:</b> ${esc(metric.source)}. Unit: ${esc(metric.unit)}.</p>
    </div>
    <div class="grid-2">
      <div class="card">
        <h3>${esc(metric.title)} by year</h3>
        <table class="data"><thead><tr><th>Year</th><th class="num">${esc(metric.title)}</th></tr></thead>
        <tbody>${rows}</tbody></table>
        <p class="source-line"><b>Source:</b> ${esc(metric.source)}.</p>
      </div>
      <div class="card">
        <h3>Reading the decade</h3>
        <p><b>Growth never stopped for long.</b> Apart from the pandemic year 2020
        (&minus;2.07%), growth stayed between 4.88% and 5.31% for the whole decade.</p>
        <p><b>Inflation cooled fast.</b> After spiking to 5.51% in 2022, December
        inflation fell to 2.61% in 2023 and 1.57% in 2024.</p>
        <p><b>Jobs recovered.</b> Unemployment peaked at 7.07% in August 2020 and
        fell every year after, to 4.91% in August 2024 — the lowest in the series.</p>
        <p><b>Poverty is at its lowest.</b> 8.57% in September 2024, down from
        11.13% in 2015 and 10.19% at the pandemic peak in 2020.</p>
        <p class="source-line"><b>Sources:</b> BPS (GDP, CPI, Sakernas, poverty). Years as labelled.</p>
      </div>
    </div>
  </section>`;
}

export function peopleView(state) {
  const kpis = INDICATORS.slice(0, 4).map((k) => `<div class="kpi">
    <div class="value">${esc(k.value)}</div>
    <div class="label">${esc(k.label)}</div>
    <div class="source">${esc(k.source)}</div>
    <div class="note">${esc(k.note)}</div>
  </div>`).join('');
  const ages = AGE_GROUPS.map((a) => `<div style="margin-bottom:12px">
    <div style="display:flex;justify-content:space-between;font-weight:700">
      <span>${esc(a.group)} — ${esc(a.note)}</span><span>${a.share.toFixed(1)}%</span></div>
    <div style="background:#e8efed;border-radius:6px;height:14px;margin-top:4px;overflow:hidden">
      <div style="width:${((a.share / 68.2) * 100).toFixed(1)}%;height:100%;background:#0f5751;border-radius:6px"></div></div>
  </div>`).join('');
  const islands = ISLANDS.map((r) => `<div style="margin-bottom:12px">
    <div style="display:flex;justify-content:space-between;font-weight:700">
      <span>${esc(r.name)}</span><span>${r.share.toFixed(1)}%</span></div>
    <div style="background:#e8efed;border-radius:6px;height:14px;margin-top:4px;overflow:hidden">
      <div style="width:${((r.share / 55.9) * 100).toFixed(1)}%;height:100%;background:#e8a317;border-radius:6px"></div></div>
    <div style="font-size:13.5px;color:#5b6b68">${esc(r.note)}</div>
  </div>`).join('');
  return `
  <section>
    <h2>People</h2>
    <p class="section-intro">281.6 million people in 2024 — the world&rsquo;s fourth-largest
    population — young, urbanising, and unevenly spread across the archipelago.</p>
    <div class="card">
      <div class="card-head"><div><h3>Population, 2015–2024</h3>
      <p>Millions of people, mid-year estimates. 2020 is the census count.</p></div></div>
      <div class="controls" role="group" aria-label="Chart controls">
        <span class="group-label">Show:</span>
        <button class="btn" data-chart-type="bar" aria-pressed="${state.chartType === 'bar'}">Bars</button>
        <button class="btn" data-chart-type="line" aria-pressed="${state.chartType === 'line'}">Line</button>
      </div>
      <div class="chart-wrap">
        <canvas class="chart" data-series="population" aria-label="Chart of population 2015 to 2024"></canvas>
        <div class="chart-tip" aria-hidden="true"></div>
      </div>
      <p class="source-line"><b>Source:</b> BPS mid-year estimates; 2020 census: 270.2 million.
      Population grew by about 26 million people over the decade.</p>
    </div>
    <div class="grid-2">
      <div class="card">
        <h3>Age structure, 2024</h3>
        <p style="color:#5b6b68;font-size:14px">Share of the total population. The working-age
        bulge is the demographic dividend economists talk about.</p>
        ${ages}
        <p class="source-line"><b>Source:</b> BPS, 2024. Shares sum to 100%.</p>
      </div>
      <div class="card">
        <h3>Where people live, 2024</h3>
        <p style="color:#5b6b68;font-size:14px">Share of the population by island group.
        Java holds more people than Sumatra, Kalimantan, Sulawesi and Papua combined.</p>
        ${islands}
        <p class="source-line"><b>Source:</b> BPS, 2024.</p>
      </div>
    </div>
    <div class="grid-2">${kpis}</div>
  </section>`;
}

export function regionsView(state) {
  const q = (state.query || '').toLowerCase();
  let rows = PROVINCES.filter((p) => !q || p.name.toLowerCase().includes(q)
    || p.capital.toLowerCase().includes(q) || p.island.toLowerCase().includes(q));
  const key = state.sortKey || 'pop';
  rows = [...rows].sort((a, b) => {
    if (key === 'name') return a.name.localeCompare(b.name);
    if (key === 'density') return (b.pop * 1e6 / b.area) - (a.pop * 1e6 / a.area);
    if (key === 'area') return b.area - a.area;
    return b.pop - a.pop;
  });
  const maxPop = Math.max(...PROVINCES.map((p) => p.pop));
  const body = rows.map((p) => {
    const density = Math.round((p.pop * 1e6) / p.area);
    return `<tr data-province="${esc(p.name)}" class="${state.selected === p.name ? 'selected' : ''}">
      <td><strong>${esc(p.name)}</strong><br><span style="color:#5b6b68;font-size:13px">${esc(p.capital)} &middot; ${esc(p.island)}</span></td>
      <td class="num">${p.pop.toFixed(1)}</td>
      <td class="num hide-phone">${p.area.toLocaleString('en-US')}</td>
      <td class="num">${density.toLocaleString('en-US')}</td>
      <td class="hide-phone"><span class="bar-cell"><span class="bar" style="width:${((p.pop / maxPop) * 90).toFixed(0)}px"></span></span></td>
    </tr>`;
  }).join('');
  const sel = PROVINCES.find((p) => p.name === state.selected);
  const detail = sel ? `<div class="detail-box" role="status">
    <h3>${esc(sel.name)}</h3>
    <p><b>Population (2024):</b> ${sel.pop.toFixed(1)} million &middot;
    <b>Capital:</b> ${esc(sel.capital)} &middot; <b>Island:</b> ${esc(sel.island)}</p>
    <p><b>Land area:</b> ${sel.area.toLocaleString('en-US')} km&sup2; &middot;
    <b>Density:</b> ${Math.round((sel.pop * 1e6) / sel.area).toLocaleString('en-US')} people per km&sup2; &middot;
    <b>Share of Indonesia:</b> ${((sel.pop / 281.6) * 100).toFixed(1)}% of the national population.</p>
    <p style="font-size:13.5px;color:#5b6b68">Source: BPS 2024 projections, rounded. Tap another row to compare.</p>
  </div>` : `<p style="color:#5b6b68">Tap a province row to see its detail here.</p>`;
  return `
  <section>
    <h2>Provinces</h2>
    <p class="section-intro">Indonesia has 38 provinces. The 12 largest hold about
    213 million people — three in four Indonesians. Search, sort, and tap a row for detail.</p>
    <div class="card">
      <div class="search-row">
        <input type="search" id="province-search" placeholder="Search a province, capital or island…" value="${esc(state.query || '')}" aria-label="Search provinces">
        <span class="count">${rows.length} of ${PROVINCES.length} shown</span>
      </div>
      <div class="controls" role="group" aria-label="Sort provinces">
        <span class="group-label">Sort by:</span>
        <button class="btn" data-sort="pop" aria-pressed="${key === 'pop'}">Population</button>
        <button class="btn" data-sort="density" aria-pressed="${key === 'density'}">Density</button>
        <button class="btn" data-sort="area" aria-pressed="${key === 'area'}">Area</button>
        <button class="btn" data-sort="name" aria-pressed="${key === 'name'}">Name A–Z</button>
      </div>
      <table class="data">
        <thead><tr>
          <th>Province</th><th class="num">Pop. (m)</th>
          <th class="num hide-phone">Area (km&sup2;)</th><th class="num">Density /km&sup2;</th>
          <th class="hide-phone">Share</th>
        </tr></thead>
        <tbody>${body || '<tr><td colspan="5">No province matches that search.</td></tr>'}</tbody>
      </table>
      <p class="source-line"><b>Source:</b> BPS 2024 population projections (rounded to 0.1m) and
      published provincial land areas. Density is population divided by land area.</p>
      ${detail}
    </div>
    <div class="callout">
      <p><b>Jakarta is the densest place in the country</b> — about 16,000 people per
      km&sup2;, against a national average near 150. East Kalimantan, home of the new
      capital Nusantara, is among the emptiest of the large provinces at about 31 per km&sup2;.</p>
    </div>
  </section>`;
}

export function sourcesView() {
  return `
  <section>
    <h2>Sources &amp; method</h2>
    <p class="section-intro">Where every number on this site comes from, and how it was handled.</p>
    <div class="card">
      <h3>Publishers</h3>
      <ul class="method">
        <li><b>BPS — Statistics Indonesia (Badan Pusat Statistik).</b> Population estimates and
        the 2020 census, GDP and growth, consumer prices and inflation, Sakernas labour-force
        surveys, poverty rates, life expectancy and the Human Development Index, trade figures
        and provincial projections. The primary source for nearly every figure here.</li>
        <li><b>World Bank.</b> GDP in US dollars and GDP per capita for cross-country comparison
        (World Development Indicators, 2024).</li>
        <li><b>IMF.</b> Cross-checks on growth and inflation in the World Economic Outlook.</li>
        <li><b>UN World Population Prospects 2024.</b> Median age.</li>
      </ul>
      <h3>Method</h3>
      <ol class="method">
        <li>Figures are the published values, rounded as published — population to 0.1 million,
        rates to two decimals, rupiah GDP to the nearest trillion.</li>
        <li>Nothing is estimated by this site. Where a publisher revises a series, the latest
        published revision is used and the year is labelled.</li>
        <li>Each figure carries its source and year on the page where it appears; the full
        series sit in the site&rsquo;s data file with their publishers named.</li>
        <li>Provincial populations are BPS 2024 projections; densities are those populations
        divided by the provinces&rsquo; published land areas.</li>
      </ol>
      <h3>What this site is not</h3>
      <p>An independent reference site. It is not affiliated with BPS, the World Bank, the IMF
      or the Government of Indonesia, and it does not republish any of their branding, text or
      images. For official releases, visit <b>bps.go.id</b>.</p>
      <p class="source-line">Data as published for 2024 unless a figure names another year.
      Site updated November 2026.</p>
    </div>
  </section>`;
}

export function missingView() {
  return `<section><div class="card">
    <h2>Page not found</h2>
    <p>There is no page at this address. Try one of the sections:</p>
    <ul class="link-list">
      <li><a href="#/">Overview</a><p>The country at a glance.</p></li>
      <li><a href="#/economy">Economy</a><p>Growth, inflation, unemployment and poverty.</p></li>
      <li><a href="#/people">People</a><p>Population, age and where people live.</p></li>
      <li><a href="#/regions">Provinces</a><p>The 12 largest provinces.</p></li>
    </ul>
  </div></section>`;
}
