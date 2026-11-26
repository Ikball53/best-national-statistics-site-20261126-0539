// Kalandra national statistics — all figures are the fictional Republic of
// Kalandra, compiled by its National Statistics Office (Kalandra Statistics).
// Years run 2015-2025; every series below is used by at least one page.

export const COUNTRY = {
  name: 'Republic of Kalandra',
  shortName: 'Kalandra',
  office: 'Kalandra Statistics',
  officeShort: 'KALSTAT',
  capital: 'Aldermere City',
  currency: 'kaland (KLD)',
  language: 'Kalandrian',
  areaKm2: 184620,
  latestYear: 2025,
  firstYear: 2015,
  updated: '14 November 2025',
};

export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

// Annual national series. Index i matches YEARS[i].
export const SERIES = {
  populationMillions: [7.62, 7.7, 7.79, 7.88, 7.97, 8.04, 8.11, 8.19, 8.27, 8.34, 8.42],
  populationGrowthPct: [1.1, 1.0, 1.2, 1.1, 1.1, 0.9, 0.9, 1.0, 1.0, 0.8, 1.0],
  gdpPerCapitaUsd: [6850, 7120, 7480, 7920, 8310, 7980, 8560, 9340, 10120, 10780, 11240],
  gdpGrowthPct: [4.2, 4.6, 5.1, 5.4, 4.8, -3.2, 6.1, 5.8, 5.2, 4.9, 4.7],
  unemploymentPct: [7.8, 7.4, 6.9, 6.3, 5.9, 7.1, 6.2, 5.5, 5.0, 4.8, 4.6],
  cpiInflationPct: [3.4, 2.8, 3.1, 4.0, 3.6, 2.1, 4.8, 6.4, 5.2, 3.9, 3.2],
  lifeExpectancy: [74.2, 74.5, 74.8, 75.1, 75.4, 75.2, 75.6, 76.0, 76.3, 76.6, 76.8],
  birthsPer1000: [13.8, 13.6, 13.4, 13.2, 13.0, 12.4, 12.6, 12.8, 12.7, 12.5, 12.4],
  deathsPer1000: [8.1, 8.0, 7.9, 7.8, 7.7, 8.4, 8.2, 7.9, 7.8, 7.7, 7.6],
  medianWageKld: [4120, 4290, 4510, 4780, 5020, 4980, 5240, 5610, 5980, 6310, 6640],
  exportsBnUsd: [24.1, 25.8, 28.3, 31.2, 33.4, 29.6, 34.8, 38.9, 40.2, 39.1, 38.2],
  importsBnUsd: [22.8, 24.0, 26.1, 28.9, 30.8, 28.1, 31.9, 35.4, 36.8, 35.9, 34.6],
};

export const AGE_STRUCTURE_2025 = [
  { group: '0–14 years', pct: 21.3 },
  { group: '15–24 years', pct: 14.6 },
  { group: '25–54 years', pct: 39.8 },
  { group: '55–64 years', pct: 12.4 },
  { group: '65+ years', pct: 11.9 },
];

export const EMPLOYMENT_SECTORS_2025 = [
  { sector: 'Services', pct: 53.7 },
  { sector: 'Industry', pct: 27.9 },
  { sector: 'Agriculture', pct: 18.4 },
];

export const REGIONS = [
  { id: 'aldermere', name: 'Aldermere', capital: 'Aldermere City', population: 2140000, areaKm2: 12480, gdpPerCapitaUsd: 16480, unemploymentPct: 3.4, lifeExpectancy: 78.1, urbanPct: 91 },
  { id: 'northgate', name: 'Northgate', capital: 'Port Venn', population: 1480000, areaKm2: 31200, gdpPerCapitaUsd: 12320, unemploymentPct: 4.1, lifeExpectancy: 77.2, urbanPct: 74 },
  { id: 'vostara', name: 'Vostara', capital: 'Kessig', population: 1290000, areaKm2: 28900, gdpPerCapitaUsd: 9860, unemploymentPct: 5.2, lifeExpectancy: 76.4, urbanPct: 63 },
  { id: 'merrow', name: 'Merrow Coast', capital: 'Sable Bay', population: 1120000, areaKm2: 19800, gdpPerCapitaUsd: 10440, unemploymentPct: 4.8, lifeExpectancy: 76.9, urbanPct: 68 },
  { id: 'telmor', name: 'Telmor Highlands', capital: 'Dun Telmor', population: 870000, areaKm2: 54600, gdpPerCapitaUsd: 7210, unemploymentPct: 6.3, lifeExpectancy: 75.1, urbanPct: 41 },
  { id: 'southfen', name: 'Southfen', capital: 'Marlow Fen', population: 1520000, areaKm2: 37640, gdpPerCapitaUsd: 8980, unemploymentPct: 5.6, lifeExpectancy: 75.8, urbanPct: 57 },
];

// Consumer prices, kaland (KLD), average national price.
export const PRICE_BASKET = [
  { item: 'White bread, 1 kg', price2024: 3.42, price2025: 3.58, unit: 'KLD' },
  { item: 'Milk, 1 litre', price2024: 2.18, price2025: 2.26, unit: 'KLD' },
  { item: 'Rice, 1 kg', price2024: 2.96, price2025: 3.04, unit: 'KLD' },
  { item: 'Chicken, 1 kg', price2024: 9.84, price2025: 10.31, unit: 'KLD' },
  { item: 'Eggs, dozen', price2024: 4.12, price2025: 4.38, unit: 'KLD' },
  { item: 'Petrol, 1 litre', price2024: 5.67, price2025: 5.82, unit: 'KLD' },
  { item: 'City bus fare', price2024: 2.40, price2025: 2.50, unit: 'KLD' },
  { item: 'Rent, 1-bed flat, city centre', price2024: 1840, price2025: 1925, unit: 'KLD / month' },
  { item: 'Electricity, 1 kWh', price2024: 0.62, price2025: 0.66, unit: 'KLD' },
  { item: 'Mobile data, 10 GB plan', price2024: 48.0, price2025: 46.5, unit: 'KLD / month' },
];

export const EDUCATION_2025 = {
  literacyPct: 98.7,
  primaryEnrolmentPct: 99.2,
  secondaryEnrolmentPct: 94.1,
  tertiaryEnrolmentPct: 58.3,
  pupilsPerTeacherPrimary: 16.4,
  schools: 4218,
  universities: 23,
  graduates2024: 61200,
};

export const HEALTH_2025 = {
  doctorsPer10000: 28.4,
  hospitalBedsPer10000: 42.1,
  infantMortalityPer1000: 6.8,
  healthSpendPctGdp: 7.9,
  hospitals: 312,
  clinics: 1840,
  vaccinationCoveragePct: 96.2,
};

export const ENVIRONMENT_2025 = {
  forestCoverPct: 46.8,
  renewableSharePct: 38.5,
  co2PerCapitaTonnes: 4.1,
  protectedLandPct: 18.2,
  recyclingRatePct: 44.6,
};

export const RELEASES = [
  { date: '14 Nov 2025', title: 'Labour Force Survey, Q3 2025', status: 'Published' },
  { date: '28 Nov 2025', title: 'Consumer Price Index, October 2025', status: 'Upcoming' },
  { date: '05 Dec 2025', title: 'Regional GDP estimates 2024', status: 'Upcoming' },
  { date: '12 Dec 2025', title: 'Population estimates, 1 July 2025', status: 'Upcoming' },
  { date: '19 Dec 2025', title: 'Education statistics 2024/25', status: 'Upcoming' },
  { date: '09 Jan 2026', title: 'Trade in goods, November 2025', status: 'Upcoming' },
];

export const METHOD_NOTES = [
  { topic: 'Population', text: 'Mid-year estimates from the civil register, adjusted with the 2024 census. Births and deaths are registered events; net migration comes from border and residence-permit records.' },
  { topic: 'GDP', text: 'Chain-linked volume measures, base year 2020, compiled under the Kalandrian System of National Accounts (KSNA 2018). Per-capita figures use mid-year population and the annual average KLD/USD rate.' },
  { topic: 'Prices', text: 'The consumer price index tracks 412 representative items in 38 towns. Prices are collected in the first two weeks of each month; weights come from the 2023 household budget survey.' },
  { topic: 'Labour', text: 'The Labour Force Survey interviews 24,000 households each quarter. Unemployment follows the ILO definition: without work, available to start within two weeks, and actively seeking.' },
  { topic: 'Health and education', text: 'Administrative records from the Ministry of Health and the Ministry of Education, cross-checked against survey samples. Enrolment is net enrolment of the official age group.' },
];

export function yearIndex(year) {
  return YEARS.indexOf(year);
}

export function seriesAt(seriesName, year) {
  const i = yearIndex(year);
  return i < 0 ? null : SERIES[seriesName][i];
}

export function pctChange(now, before) {
  return ((now - before) / before) * 100;
}
