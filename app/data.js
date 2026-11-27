// Indonesia in Numbers — the dataset.
//
// Every figure below is a real published statistic. The `source` field on
// each group names the publisher and the reference year so the site can cite
// it next to the number. Figures are rounded for display; exact values live
// in the sources named in the Sources section of the site.

export const META = {
  country: "Indonesia",
  updated: "26 November 2026",
  currency: "IDR",
  currencyName: "Indonesian rupiah",
};

// Headline indicators shown on the Overview hero.
export const HEADLINE = [
  { id: "population", label: "Population", value: 281.6, unit: "million", year: 2024, change: 0.8, changeLabel: "vs 2023", source: "BPS, Population Projection 2024", format: "1dp" },
  { id: "gdp", label: "GDP", value: 1396, unit: "US$ bn", year: 2024, change: 1.8, changeLabel: "vs 2023", source: "World Bank, WDI 2024", format: "int" },
  { id: "gdp-pc", label: "GDP per capita", value: 4926, unit: "US$", year: 2024, change: 1.1, changeLabel: "vs 2023", source: "World Bank, WDI 2024", format: "int" },
  { id: "growth", label: "Real GDP growth", value: 5.03, unit: "%", year: 2024, change: -0.02, changeLabel: "pts vs 2023", source: "BPS, National Accounts 2024", format: "2dp" },
  { id: "inflation", label: "Inflation (CPI, Dec)", value: 1.57, unit: "% yoy", year: 2024, change: -1.04, changeLabel: "pts vs Dec 2023", source: "BPS, Consumer Price Index, Dec 2024", format: "2dp" },
  { id: "unemployment", label: "Unemployment rate", value: 4.91, unit: "%", year: 2024, change: -0.41, changeLabel: "pts vs Aug 2023", source: "BPS, Sakernas, Aug 2024", format: "2dp" },
  { id: "poverty", label: "Poverty rate", value: 8.57, unit: "%", year: 2024, change: -0.47, changeLabel: "pts vs Sep 2023", source: "BPS, Poverty Profile, Sep 2024", format: "2dp" },
  { id: "life", label: "Life expectancy", value: 74.1, unit: "years", year: 2024, change: 0.2, changeLabel: "vs 2023", source: "BPS, Human Development 2024", format: "1dp" },
];

// Ten-year series, 2015-2024. Sources: World Bank WDI (GDP), BPS (CPI,
// unemployment, population, trade). Values are the published headline series.
export const SERIES = {
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  gdpUsdBn: [861, 932, 1016, 1042, 1119, 1059, 1186, 1319, 1371, 1396],
  gdpGrowthPct: [4.88, 5.03, 5.07, 5.17, 5.02, -2.07, 3.70, 5.31, 5.05, 5.03],
  inflationPct: [3.35, 3.02, 3.61, 3.13, 2.72, 1.68, 1.87, 5.51, 2.61, 1.57],
  unemploymentPct: [6.18, 5.61, 5.50, 5.34, 5.28, 7.07, 6.49, 5.86, 5.32, 4.91],
  populationM: [255.5, 258.7, 261.9, 265.0, 268.1, 271.1, 273.9, 276.4, 279.4, 281.6],
  exportsUsdBn: [150.4, 145.2, 168.8, 180.0, 167.7, 163.2, 231.6, 291.9, 258.8, 264.7],
  importsUsdBn: [142.7, 135.7, 156.9, 188.7, 171.3, 141.6, 196.2, 237.4, 221.9, 233.7],
};

// Age structure, 2024 (BPS). Millions of people per band.
export const AGE_GROUPS = [
  { band: "0–14", value: 68.6 },
  { band: "15–24", value: 46.8 },
  { band: "25–54", value: 118.9 },
  { band: "55–64", value: 27.0 },
  { band: "65+", value: 20.3 },
];

// Ten largest provinces by 2024 population (BPS). GRDP share is the
// province's share of national GDP at current prices, 2024 (BPS).
export const PROVINCES = [
  { name: "West Java", pop: 50.3, grdpShare: 14.3, poverty: 7.5, capital: "Bandung" },
  { name: "East Java", pop: 41.8, grdpShare: 14.4, poverty: 10.3, capital: "Surabaya" },
  { name: "Central Java", pop: 37.9, grdpShare: 8.4, poverty: 10.5, capital: "Semarang" },
  { name: "North Sumatra", pop: 15.6, grdpShare: 4.9, poverty: 8.2, capital: "Medan" },
  { name: "Banten", pop: 12.4, grdpShare: 3.2, poverty: 5.8, capital: "Serang" },
  { name: "Jakarta", pop: 10.6, grdpShare: 16.9, poverty: 4.2, capital: "Jakarta" },
  { name: "South Sulawesi", pop: 9.4, grdpShare: 3.2, poverty: 8.2, capital: "Makassar" },
  { name: "Lampung", pop: 9.3, grdpShare: 1.8, poverty: 11.5, capital: "Bandar Lampung" },
  { name: "South Sumatra", pop: 8.8, grdpShare: 2.7, poverty: 11.6, capital: "Palembang" },
  { name: "West Sumatra", pop: 6.0, grdpShare: 1.4, poverty: 5.8, capital: "Padang" },
];

// Regional comparison, 2024 (World Bank WDI; life expectancy 2023).
// GDP per capita in current US$.
export const COUNTRIES = [
  { code: "IDN", name: "Indonesia", pop: 281.6, gdp: 1396, gdpPc: 4926, growth: 5.03, inflation: 1.57, unemp: 4.91, life: 74.1 },
  { code: "VNM", name: "Vietnam", pop: 101.0, gdp: 476, gdpPc: 4711, growth: 7.09, inflation: 3.63, unemp: 2.23, life: 75.8 },
  { code: "THA", name: "Thailand", pop: 71.7, gdp: 526, gdpPc: 7337, growth: 2.50, inflation: 0.42, unemp: 0.90, life: 76.9 },
  { code: "MYS", name: "Malaysia", pop: 34.1, gdp: 421, gdpPc: 12347, growth: 5.13, inflation: 1.79, unemp: 3.21, life: 76.2 },
  { code: "PHL", name: "Philippines", pop: 114.9, gdp: 461, gdpPc: 4014, growth: 5.69, inflation: 3.20, unemp: 3.76, life: 72.3 },
  { code: "SGP", name: "Singapore", pop: 6.1, gdp: 531, gdpPc: 86879, growth: 4.37, inflation: 2.39, unemp: 2.81, life: 84.2 },
];

// Top export goods, 2024 (BPS), US$ bn.
export const EXPORT_GOODS = [
  { good: "Coal and solid fuels", value: 44.9 },
  { good: "Palm oil and derivatives", value: 27.4 },
  { good: "Iron and steel", value: 27.8 },
  { good: "Electrical machinery", value: 15.2 },
  { good: "Footwear and apparel", value: 12.6 },
  { good: "Rubber and articles", value: 9.8 },
  { good: "Vehicles and parts", value: 9.4 },
  { good: "Copper and ores", value: 8.9 },
];

// Labour market, August 2024 (BPS Sakernas).
export const LABOUR = {
  workforceM: 152.1,
  employedM: 144.6,
  informalPct: 59.2,
  youthUnempPct: 16.4,
  bySector: [
    { sector: "Agriculture, forestry & fishing", share: 28.5 },
    { sector: "Trade, hotels & restaurants", share: 25.4 },
    { sector: "Manufacturing", share: 18.8 },
    { sector: "Community & personal services", share: 15.9 },
    { sector: "Construction", share: 6.2 },
    { sector: "Other (mining, utilities, finance)", share: 5.2 },
  ],
};

// Sources cited across the site.
export const SOURCES = [
  { name: "BPS — Statistics Indonesia", detail: "Population Projection 2024; National Accounts 2024; Consumer Price Index Dec 2024; Sakernas Aug 2024; Poverty Profile Sep 2024; Human Development 2024; Foreign Trade Statistics 2024.", url: "bps.go.id" },
  { name: "World Bank — World Development Indicators", detail: "GDP, GDP per capita, population and growth series 2015–2024; life expectancy 2023 for the regional comparison.", url: "data.worldbank.org" },
  { name: "IMF — World Economic Outlook, Oct 2024", detail: "Cross-check for GDP and inflation figures used in the comparison table.", url: "imf.org" },
];
