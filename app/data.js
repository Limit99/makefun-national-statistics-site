// Indonesia in Numbers — the data behind the site.
// Every series names its publisher and the year it covers. Figures are the
// published values, rounded as published; nothing here is estimated by us.
// Publishers: BPS (Statistics Indonesia), World Bank, IMF.

export const META = {
  country: 'Indonesia',
  updated: 'November 2026',
  hero: [
    { value: '281.6', unit: 'million', label: 'Population', source: 'BPS, mid-year estimate 2024', delta: '+0.9% on 2023', up: true },
    { value: '1.40', unit: 'US$ tn', label: 'GDP (nominal)', source: 'BPS / World Bank, 2024', delta: 'Rp 22,139 trillion', up: true },
    { value: '5.03', unit: '%', label: 'GDP growth', source: 'BPS, 2024', delta: '5.05% in 2023', up: false },
    { value: '1.57', unit: '%', label: 'Inflation (Dec, yoy)', source: 'BPS, December 2024', delta: 'Down from 2.61% in 2023', up: true },
  ],
};

// Annual series, 2015-2024. Values are the published annual figures.
export const SERIES = {
  population: {
    title: 'Population',
    unit: 'million people',
    source: 'BPS mid-year estimates; 2020 is the census count',
    format: (v) => `${v.toFixed(1)}m`,
    data: [
      [2015, 255.6], [2016, 258.7], [2017, 261.9], [2018, 265.0], [2019, 268.1],
      [2020, 270.2], [2021, 272.7], [2022, 275.8], [2023, 278.7], [2024, 281.6],
    ],
  },
  gdpGrowth: {
    title: 'GDP growth',
    unit: '% per year',
    source: 'BPS, real GDP growth at constant 2010 prices',
    format: (v) => `${v.toFixed(2)}%`,
    data: [
      [2015, 4.88], [2016, 5.03], [2017, 5.07], [2018, 5.17], [2019, 5.02],
      [2020, -2.07], [2021, 3.70], [2022, 5.31], [2023, 5.05], [2024, 5.03],
    ],
  },
  gdpNominal: {
    title: 'GDP, nominal',
    unit: 'Rp trillion',
    source: 'BPS, current prices',
    format: (v) => `Rp ${v.toLocaleString('en-US')}tn`,
    data: [
      [2015, 11526], [2016, 12401], [2017, 13588], [2018, 14839], [2019, 15833],
      [2020, 15434], [2021, 16977], [2022, 19588], [2023, 20892], [2024, 22139],
    ],
  },
  inflation: {
    title: 'Inflation',
    unit: '% (December, year on year)',
    source: 'BPS consumer price index',
    format: (v) => `${v.toFixed(2)}%`,
    data: [
      [2015, 3.35], [2016, 3.02], [2017, 3.61], [2018, 3.13], [2019, 2.72],
      [2020, 1.68], [2021, 1.87], [2022, 5.51], [2023, 2.61], [2024, 1.57],
    ],
  },
  unemployment: {
    title: 'Unemployment rate',
    unit: '% of labour force (August)',
    source: 'BPS Sakernas, August each year',
    format: (v) => `${v.toFixed(2)}%`,
    data: [
      [2015, 6.18], [2016, 5.61], [2017, 5.50], [2018, 5.34], [2019, 5.28],
      [2020, 7.07], [2021, 6.49], [2022, 5.86], [2023, 5.32], [2024, 4.91],
    ],
  },
  poverty: {
    title: 'Poverty rate',
    unit: '% of population (September)',
    source: 'BPS, September each year',
    format: (v) => `${v.toFixed(2)}%`,
    data: [
      [2015, 11.13], [2016, 10.70], [2017, 10.12], [2018, 9.66], [2019, 9.22],
      [2020, 10.19], [2021, 9.71], [2022, 9.57], [2023, 9.36], [2024, 8.57],
    ],
  },
};

// Headline indicators shown on the home page and the People page.
export const INDICATORS = [
  { value: '4.91%', label: 'Unemployment', note: 'Lowest August rate in a decade; 7.47 million people unemployed.', source: 'BPS Sakernas, Aug 2024' },
  { value: '8.57%', label: 'Poverty rate', note: '24.06 million people below the poverty line.', source: 'BPS, Sep 2024' },
  { value: '73.9 years', label: 'Life expectancy', note: 'Up from 71.7 years in 2015.', source: 'BPS, 2024' },
  { value: '75.02', label: 'Human Development Index', note: 'Up from 69.55 in 2015; “high” development band.', source: 'BPS, 2024' },
  { value: 'US$ 264.7bn', label: 'Exports of goods', note: 'Trade surplus of US$ 31.0bn for the year.', source: 'BPS, 2024' },
  { value: '30.5 years', label: 'Median age', note: 'A young population: about 69% are of working age (15–64).', source: 'UN World Population Prospects, 2024' },
];

// Age structure, 2024 (BPS). Shares of the total population.
export const AGE_GROUPS = [
  { group: '0–14 years', share: 24.9, note: 'Children' },
  { group: '15–64 years', share: 68.2, note: 'Working age' },
  { group: '65+ years', share: 6.9, note: 'Older people' },
];

// Population share by island group, 2024 (BPS).
export const ISLANDS = [
  { name: 'Java', share: 55.9, note: 'Six provinces incl. Jakarta; about 157 million people' },
  { name: 'Sumatra', share: 21.6, note: 'Ten provinces; about 61 million people' },
  { name: 'Sulawesi', share: 7.4, note: 'Six provinces; about 21 million people' },
  { name: 'Kalimantan', share: 6.3, note: 'Five provinces; about 18 million people' },
  { name: 'Bali & Nusa Tenggara', share: 5.7, note: 'Three provinces; about 16 million people' },
  { name: 'Papua', share: 1.9, note: 'Six provinces; about 5 million people' },
  { name: 'Maluku', share: 1.2, note: 'Two provinces; about 3 million people' },
];

// Largest provinces by population, 2024 (BPS projections, rounded to 0.1m).
// Density uses each province's published land area.
export const PROVINCES = [
  { name: 'West Java', pop: 50.4, area: 35378, capital: 'Bandung', island: 'Java' },
  { name: 'East Java', pop: 41.8, area: 47922, capital: 'Surabaya', island: 'Java' },
  { name: 'Central Java', pop: 37.9, area: 32801, capital: 'Semarang', island: 'Java' },
  { name: 'North Sumatra', pop: 15.6, area: 72981, capital: 'Medan', island: 'Sumatra' },
  { name: 'Banten', pop: 12.4, area: 9663, capital: 'Serang', island: 'Java' },
  { name: 'Jakarta', pop: 10.7, area: 664, capital: 'Jakarta', island: 'Java' },
  { name: 'South Sulawesi', pop: 9.4, area: 46717, capital: 'Makassar', island: 'Sulawesi' },
  { name: 'Lampung', pop: 9.3, area: 34624, capital: 'Bandar Lampung', island: 'Sumatra' },
  { name: 'South Sumatra', pop: 8.9, area: 91592, capital: 'Palembang', island: 'Sumatra' },
  { name: 'Riau', pop: 6.9, area: 87024, capital: 'Pekanbaru', island: 'Sumatra' },
  { name: 'West Sumatra', pop: 5.8, area: 42013, capital: 'Padang', island: 'Sumatra' },
  { name: 'East Kalimantan', pop: 4.0, area: 129067, capital: 'Samarinda', island: 'Kalimantan' },
];

// Latest statistical releases a visitor may want to read first.
export const RELEASES = [
  { date: 'Nov 2025', title: 'GDP grew 5.03% in 2024', text: 'Full-year growth held at 5.03%, with household consumption contributing the largest share. BPS, February 2025 release.', link: '#/economy' },
  { date: 'Jan 2025', title: 'Inflation ended 2024 at 1.57%', text: 'December year-on-year inflation of 1.57% was the lowest since the pandemic year 2020. BPS, January 2025 release.', link: '#/economy' },
  { date: 'Nov 2024', title: 'Unemployment fell to 4.91%', text: 'The August 2024 rate is the lowest since 2015; informal work still employs about 59% of workers. BPS Sakernas.', link: '#/people' },
  { date: 'Jan 2025', title: 'Poverty at 8.57% in September 2024', text: 'Down from 9.36% a year earlier — the lowest poverty rate BPS has recorded. BPS, January 2025 release.', link: '#/people' },
  { date: '2024', title: 'Population reached 281.6 million', text: 'BPS mid-year estimate for 2024; Java alone holds more people than all of Sumatra, Kalimantan, Sulawesi and Papua combined.', link: '#/regions' },
];
