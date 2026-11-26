# Indonesia in Numbers

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Limit99/makefun-national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Limit99/makefun-national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

Indonesia in Numbers is a national statistics site for Indonesia: population,
GDP, inflation, unemployment, poverty and the provinces, 2015–2024, from BPS
(Statistics Indonesia), the World Bank and the IMF. Every figure on the site
names its source and year.

## What it has

- **Overview** — hero stats (population 281.6m, GDP US$1.40tn, growth 5.03%,
  inflation 1.57%, all 2024), an interactive GDP-growth chart, headline
  indicators and the latest releases.
- **Economy** — five indicators (GDP growth, inflation, unemployment, poverty,
  nominal GDP) as switchable charts with bar/line toggle, year-range filter
  and a full annual data table.
- **People** — population 2015–2024, age structure and where Indonesians live
  by island group.
- **Provinces** — the 12 largest provinces, searchable, sortable by population,
  density, area or name, with a detail panel per province.
- **Sources & method** — publishers, rounding rules and what the site is not.

## Run it

```sh
node serve.ts
```

Then open http://localhost:8080. Static files only — no build step, no network
requests, no framework. Charts are hand-drawn on canvas; all data lives in
`app/data.js`.

---

<sub>Entered on [make.fun](https://make.fun/?ref=0gynx1gq&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
