// Page views for the Kalandra statistics site. Each function returns the
// HTML for one hash route, built from data.js and drawn with charts.js.

import { COUNTRY, YEARS, SERIES, AGE_STRUCTURE_2025, EMPLOYMENT_SECTORS_2025, REGIONS, PRICE_BASKET, EDUCATION_2025, HEALTH_2025, ENVIRONMENT_2025, RELEASES, METHOD_NOTES, seriesAt, pctChange } from './data.js';
import { lineChart, barChart, donutChart, sparkline } from './charts.js';

const fmt = (n, d = 1) => n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
const int = (n) => n.toLocaleString('en-US');

function kpiCard(label, value, unit, changeText, seriesName, color) {
  return '<article class="kpi"><div class="kpi-label">' + label + '</div>'
    + '<div class="kpi-value">' + value + ' <span class="kpi-unit">' + unit + '</span></div>'
    + '<div class="kpi-foot"><span class="kpi-change">' + changeText + '</span>' + sparkline(SERIES[seriesName], { color }) + '</div></article>';
}

function yearSelect(year) {
  return '<label class="year-pick">Year <select id="year-select" aria-label="Select year">'
    + YEARS.map((y) => '<option value="' + y + '"' + (y === year ? ' selected' : '') + '>' + y + '</option>').join('')
    + '</select></label>';
}

function sourceLine(text) {
  return '<p class="source">Source: ' + text + '</p>';
}

function sectionHead(title, sub) {
  return '<div class="section-head"><h2>' + title + '</h2><p>' + sub + '</p></div>';
}

export function renderOverview(year) {
  const i = YEARS.indexOf(year);
  const pop = SERIES.populationMillions[i];
  const gdp = SERIES.gdpPerCapitaUsd[i];
  const unemp = SERIES.unemploymentPct[i];
  const cpi = SERIES.cpiInflationPct[i];
  const life = SERIES.lifeExpectancy[i];
  const gdpChg = pctChange(gdp, SERIES.gdpPerCapitaUsd[i - 1] || gdp);
  return ''
    + '<section class="hero"><div><p class="eyebrow">National Statistics Office · ' + COUNTRY.officeShort + '</p>'
    + '<h1>The Republic of Kalandra<br>in numbers</h1>'
    + '<p class="lede">Official statistics for ' + COUNTRY.name + ' — population, economy, prices, health and education, published free for everyone. Figures for ' + year + ', updated ' + COUNTRY.updated + '.</p>'
    + '<div class="hero-links"><a class="btn primary" href="#/population">Explore the population</a><a class="btn" href="#/explorer">Browse all data</a></div></div>'
    + '<div class="hero-card"><div class="hero-card-title">At a glance · ' + year + '</div>'
    + '<dl><div><dt>Population</dt><dd>' + fmt(pop, 2) + ' million</dd></div>'
    + '<div><dt>GDP per capita</dt><dd>$' + int(gdp) + '</dd></div>'
    + '<div><dt>Unemployment</dt><dd>' + fmt(unemp) + '%</dd></div>'
    + '<div><dt>Life expectancy</dt><dd>' + fmt(life) + ' years</dd></div></dl>'
    + '<a href="#/regions">Compare the six regions →</a></div></section>'
    + '<section class="controls-row">' + yearSelect(year) + '<span class="hint">Change the year to update every figure on this page.</span></section>'
    + '<section class="kpi-grid">'
    + kpiCard('Population', fmt(pop, 2), 'million', '+' + fmt(SERIES.populationGrowthPct[i]) + '% on ' + (year - 1), 'populationMillions', '#0b5fa5')
    + kpiCard('GDP per capita', '$' + int(gdp), 'USD', (gdpChg >= 0 ? '+' : '') + fmt(gdpChg) + '% on ' + (year - 1), 'gdpPerCapitaUsd', '#0e7a5f')
    + kpiCard('Unemployment', fmt(unemp), '%', (SERIES.unemploymentPct[i - 1] - unemp >= 0 ? '−' : '+') + fmt(Math.abs(SERIES.unemploymentPct[i - 1] - unemp)) + ' pts on ' + (year - 1), 'unemploymentPct', '#b54708')
    + kpiCard('Inflation (CPI)', fmt(cpi), '%', (cpi - SERIES.cpiInflationPct[i - 1] >= 0 ? '+' : '') + fmt(cpi - SERIES.cpiInflationPct[i - 1]) + ' pts on ' + (year - 1), 'cpiInflationPct', '#7a3dbb')
    + '</section>'
    + '<section class="chart-grid"><div class="card"><h2>Population, 2015–' + COUNTRY.latestYear + '</h2>'
    + lineChart({ labels: YEARS.map(String), values: SERIES.populationMillions, label: 'Population of Kalandra', unit: 'm', decimals: 2 })
    + sourceLine('KALSTAT population estimates, mid-year. 2015–2025.') + '</div>'
    + '<div class="card"><h2>GDP growth, 2015–' + COUNTRY.latestYear + '</h2>'
    + barChart({ labels: YEARS.map(String), values: SERIES.gdpGrowthPct, label: 'Annual GDP growth', unit: '%', color: '#0e7a5f' })
    + sourceLine('KALSTAT national accounts, chain-linked volumes, base year 2020. The 2020 fall reflects the pandemic year.') + '</div></section>'
    + '<section class="chart-grid"><div class="card"><h2>Who works where · ' + year + '</h2>'
    + donutChart({ label: 'Employment by sector', slices: EMPLOYMENT_SECTORS_2025.map((s, k) => ({ name: s.sector, value: s.pct, color: ['#0b5fa5', '#0e7a5f', '#e8a13a'][k] })) })
    + sourceLine('Labour Force Survey, Q3 ' + year + '. Shares of total employment.') + '</div>'
    + '<div class="card"><h2>Age structure · ' + year + '</h2>'
    + barChart({ labels: AGE_STRUCTURE_2025.map((a) => a.group), values: AGE_STRUCTURE_2025.map((a) => a.pct), label: 'Age structure', unit: '%', color: '#0b5fa5' })
    + sourceLine('KALSTAT population estimates, 1 July ' + year + '.') + '</div></section>'
    + '<section>' + sectionHead('Latest releases', 'New and upcoming publications from Kalandra Statistics.') + '<ul class="releases">'
    + RELEASES.map((r) => '<li><span class="rel-date">' + r.date + '</span><span class="rel-title">' + r.title + '</span><span class="rel-status ' + r.status.toLowerCase() + '">' + r.status + '</span></li>').join('')
    + '</ul></section>';
}

export function renderPopulation(year) {
  const i = YEARS.indexOf(year);
  const pop = SERIES.populationMillions[i];
  const births = SERIES.birthsPer1000[i];
  const deaths = SERIES.deathsPer1000[i];
  const natural = births - deaths;
  return '<section class="page-head"><h1>Population</h1><p>How many people live in Kalandra, how the population is changing, and where people live.</p></section>'
    + '<section class="controls-row">' + yearSelect(year) + '</section>'
    + '<section class="kpi-grid">'
    + kpiCard('Population', fmt(pop, 2), 'million', '+' + fmt(SERIES.populationGrowthPct[i]) + '% on ' + (year - 1), 'populationMillions', '#0b5fa5')
    + kpiCard('Births', fmt(births), 'per 1,000', (births - SERIES.birthsPer1000[i - 1] >= 0 ? '+' : '') + fmt(births - SERIES.birthsPer1000[i - 1]) + ' on ' + (year - 1), 'birthsPer1000', '#0e7a5f')
    + kpiCard('Deaths', fmt(deaths), 'per 1,000', (deaths - SERIES.deathsPer1000[i - 1] >= 0 ? '+' : '') + fmt(deaths - SERIES.deathsPer1000[i - 1]) + ' on ' + (year - 1), 'deathsPer1000', '#b54708')
    + kpiCard('Natural increase', fmt(natural), 'per 1,000', 'births minus deaths', 'lifeExpectancy', '#7a3dbb')
    + '</section>'
    + '<section class="chart-grid"><div class="card"><h2>Population growth, 2015–' + COUNTRY.latestYear + '</h2>'
    + lineChart({ labels: YEARS.map(String), values: SERIES.populationMillions, label: 'Population', unit: 'm', decimals: 2 })
    + sourceLine('KALSTAT population estimates, mid-year.') + '</div>'
    + '<div class="card"><h2>Births and deaths per 1,000 people</h2>'
    + lineChart({ labels: YEARS.map(String), values: SERIES.birthsPer1000, label: 'Births per 1,000', unit: '', color: '#0e7a5f' })
    + '<p class="note">Deaths in ' + year + ': ' + fmt(deaths) + ' per 1,000. The 2020 rise reflects the pandemic year.</p>'
    + sourceLine('Civil register, KALSTAT vital statistics.') + '</div></section>'
    + '<section class="card"><h2>Population by year</h2><p class="note">Tap a column heading to sort the table.</p><table class="data-table sortable"><thead><tr><th data-sort="year">Year</th><th data-sort="pop">Population (millions)</th><th data-sort="growth">Growth (%)</th><th data-sort="births">Births / 1,000</th><th data-sort="deaths">Deaths / 1,000</th></tr></thead><tbody>'
    + YEARS.map((y, k) => '<tr><td>' + y + '</td><td>' + fmt(SERIES.populationMillions[k], 2) + '</td><td>' + fmt(SERIES.populationGrowthPct[k]) + '</td><td>' + fmt(SERIES.birthsPer1000[k]) + '</td><td>' + fmt(SERIES.deathsPer1000[k]) + '</td></tr>').join('')
    + '</tbody></table>' + sourceLine('KALSTAT population estimates and vital statistics, 2015–2025.') + '</section>'
    + '<section class="card"><h2>Age structure · ' + year + '</h2>'
    + barChart({ labels: AGE_STRUCTURE_2025.map((a) => a.group), values: AGE_STRUCTURE_2025.map((a) => a.pct), label: 'Age structure', unit: '%', color: '#0b5fa5' })
    + '<p class="note">One in five Kalandrians is under 15; 11.9% are 65 or older. The working-age share (15–64) is 66.8%.</p>'
    + sourceLine('KALSTAT population estimates, 1 July ' + year + '.') + '</section>';
}

export function renderEconomy(year) {
  const i = YEARS.indexOf(year);
  const gdp = SERIES.gdpPerCapitaUsd[i];
  const growth = SERIES.gdpGrowthPct[i];
  const exp = SERIES.exportsBnUsd[i];
  const imp = SERIES.importsBnUsd[i];
  const balance = exp - imp;
  return '<section class="page-head"><h1>Economy</h1><p>Growth, income and trade for the Republic of Kalandra — what the economy produced, earned and sold abroad.</p></section>'
    + '<section class="controls-row">' + yearSelect(year) + '</section>'
    + '<section class="kpi-grid">'
    + kpiCard('GDP per capita', '$' + int(gdp), 'USD', (growth >= 0 ? '+' : '') + fmt(growth) + '% GDP growth', 'gdpPerCapitaUsd', '#0e7a5f')
    + kpiCard('GDP growth', fmt(growth), '%', 'on ' + (year - 1), 'gdpGrowthPct', '#0b5fa5')
    + kpiCard('Exports', '$' + fmt(exp), 'billion', (exp - SERIES.exportsBnUsd[i - 1] >= 0 ? '+' : '') + fmt(pctChange(exp, SERIES.exportsBnUsd[i - 1])) + '% on ' + (year - 1), 'exportsBnUsd', '#b54708')
    + kpiCard('Trade balance', (balance >= 0 ? '+' : '') + '$' + fmt(balance), 'billion', 'exports minus imports', 'importsBnUsd', '#7a3dbb')
    + '</section>'
    + '<section class="chart-grid"><div class="card"><h2>GDP per capita, 2015–' + COUNTRY.latestYear + ' (USD)</h2>'
    + lineChart({ labels: YEARS.map(String), values: SERIES.gdpPerCapitaUsd, label: 'GDP per capita', unit: '', decimals: 0, color: '#0e7a5f' })
    + sourceLine('KALSTAT national accounts; annual average KLD/USD rate.') + '</div>'
    + '<div class="card"><h2>GDP growth, 2015–' + COUNTRY.latestYear + ' (%)</h2>'
    + barChart({ labels: YEARS.map(String), values: SERIES.gdpGrowthPct, label: 'GDP growth', unit: '%', color: '#0e7a5f' })
    + sourceLine('KALSTAT national accounts, chain-linked volumes, base year 2020.') + '</div></section>'
    + '<section class="card"><h2>Trade in goods, 2015–' + COUNTRY.latestYear + ' (US$ billion)</h2>'
    + '<table class="data-table sortable"><thead><tr><th data-sort="year">Year</th><th data-sort="exp">Exports</th><th data-sort="imp">Imports</th><th data-sort="bal">Balance</th></tr></thead><tbody>'
    + YEARS.map((y, k) => '<tr><td>' + y + '</td><td>$' + fmt(SERIES.exportsBnUsd[k]) + ' bn</td><td>$' + fmt(SERIES.importsBnUsd[k]) + ' bn</td><td>' + (SERIES.exportsBnUsd[k] - SERIES.importsBnUsd[k] >= 0 ? '+' : '') + '$' + fmt(SERIES.exportsBnUsd[k] - SERIES.importsBnUsd[k]) + ' bn</td></tr>').join('')
    + '</tbody></table>' + sourceLine('KALSTAT trade statistics, customs records.') + '</section>'
    + '<section class="card"><h2>What Kalandra sells</h2><p class="note">Main export groups, ' + year + ' (share of exports): machinery and equipment 31%, food and farm goods 24%, textiles 14%, timber and paper 12%, chemicals 11%, other 8%.</p>'
    + barChart({ labels: ['Machinery', 'Food & farm', 'Textiles', 'Timber & paper', 'Chemicals', 'Other'], values: [31, 24, 14, 12, 11, 8], label: 'Export shares', unit: '%', color: '#0b5fa5' })
    + sourceLine('KALSTAT trade statistics, ' + year + '.') + '</section>';
}

export function renderPrices(year) {
  const i = YEARS.indexOf(year);
  const cpi = SERIES.cpiInflationPct[i];
  const wage = SERIES.medianWageKld[i];
  const unemp = SERIES.unemploymentPct[i];
  return '<section class="page-head"><h1>Prices &amp; Labour</h1><p>What things cost, what people earn, and who is in work — the cost of living in Kalandra.</p></section>'
    + '<section class="controls-row">' + yearSelect(year) + '</section>'
    + '<section class="kpi-grid">'
    + kpiCard('Inflation (CPI)', fmt(cpi), '%', (cpi - SERIES.cpiInflationPct[i - 1] >= 0 ? '+' : '') + fmt(cpi - SERIES.cpiInflationPct[i - 1]) + ' pts on ' + (year - 1), 'cpiInflationPct', '#7a3dbb')
    + kpiCard('Median monthly wage', int(wage), 'KLD', '+' + fmt(pctChange(wage, SERIES.medianWageKld[i - 1])) + '% on ' + (year - 1), 'medianWageKld', '#0e7a5f')
    + kpiCard('Unemployment', fmt(unemp), '%', (SERIES.unemploymentPct[i - 1] - unemp >= 0 ? '−' : '+') + fmt(Math.abs(SERIES.unemploymentPct[i - 1] - unemp)) + ' pts on ' + (year - 1), 'unemploymentPct', '#b54708')
    + kpiCard('Real wage change', fmt(pctChange(wage, SERIES.medianWageKld[i - 1]) - cpi), '%', 'nominal wage growth minus inflation', 'medianWageKld', '#0b5fa5')
    + '</section>'
    + '<section class="chart-grid"><div class="card"><h2>Inflation, 2015–' + COUNTRY.latestYear + ' (%)</h2>'
    + lineChart({ labels: YEARS.map(String), values: SERIES.cpiInflationPct, label: 'CPI inflation', unit: '%', color: '#7a3dbb' })
    + sourceLine('KALSTAT consumer price index, annual average.') + '</div>'
    + '<div class="card"><h2>Unemployment, 2015–' + COUNTRY.latestYear + ' (%)</h2>'
    + lineChart({ labels: YEARS.map(String), values: SERIES.unemploymentPct, label: 'Unemployment rate', unit: '%', color: '#b54708' })
    + sourceLine('KALSTAT Labour Force Survey, ILO definition.') + '</div></section>'
    + '<section class="card"><h2>What things cost · average prices, 2024 vs ' + year + '</h2><p class="note">Tap a column heading to sort. Change is the price rise over one year.</p>'
    + '<table class="data-table sortable"><thead><tr><th data-sort="item">Item</th><th data-sort="p2024">2024 (KLD)</th><th data-sort="p2025">2025 (KLD)</th><th data-sort="chg">Change (%)</th></tr></thead><tbody>'
    + PRICE_BASKET.map((p) => '<tr><td>' + p.item + '</td><td>' + fmt(p.price2024, 2) + '</td><td>' + fmt(p.price2025, 2) + '</td><td>' + (p.price2025 >= p.price2024 ? '+' : '') + fmt(pctChange(p.price2025, p.price2024)) + '%</td></tr>').join('')
    + '</tbody></table>' + sourceLine('KALSTAT consumer price survey, 412 items in 38 towns. Unit shown in the item name.') + '</section>'
    + '<section class="card"><h2>Employment by sector · ' + year + '</h2>'
    + donutChart({ label: 'Employment by sector', slices: EMPLOYMENT_SECTORS_2025.map((s, k) => ({ name: s.sector, value: s.pct, color: ['#0b5fa5', '#0e7a5f', '#e8a13a'][k] })) })
    + '<p class="note">Services employ just over half of all workers; agriculture still employs 18.4%, mostly in Telmor Highlands and Southfen.</p>'
    + sourceLine('Labour Force Survey, Q3 ' + year + '.') + '</section>';
}

export function renderHealth(year) {
  const h = HEALTH_2025;
  const life = seriesAt('lifeExpectancy', year);
  const imr = 8.9 - (year - 2015) * 0.21;
  return '<section class="page-head"><h1>Health</h1><p>How long Kalandrians live, and the health services available to them.</p></section>'
    + '<section class="controls-row">' + yearSelect(year) + '</section>'
    + '<section class="kpi-grid">'
    + kpiCard('Life expectancy', fmt(life), 'years', '+' + fmt(life - seriesAt('lifeExpectancy', year - 1)) + ' on ' + (year - 1), 'lifeExpectancy', '#0e7a5f')
    + kpiCard('Infant mortality', fmt(imr), 'per 1,000 births', 'down from 8.9 in 2015', 'lifeExpectancy', '#0b5fa5')
    + kpiCard('Doctors', fmt(h.doctorsPer10000), 'per 10,000 people', h.hospitals + ' hospitals, ' + int(h.clinics) + ' clinics', 'lifeExpectancy', '#7a3dbb')
    + kpiCard('Health spending', fmt(h.healthSpendPctGdp), '% of GDP', 'childhood vaccination ' + fmt(h.vaccinationCoveragePct) + '%', 'lifeExpectancy', '#b54708')
    + '</section>'
    + '<section class="chart-grid"><div class="card"><h2>Life expectancy, 2015–' + COUNTRY.latestYear + ' (years)</h2>'
    + lineChart({ labels: YEARS.map(String), values: SERIES.lifeExpectancy, label: 'Life expectancy', unit: 'yrs', color: '#0e7a5f' })
    + sourceLine('KALSTAT life tables, civil register.') + '</div>'
    + '<div class="card"><h2>Health services · ' + year + '</h2><dl class="facts">'
    + '<div><dt>Hospital beds</dt><dd>' + fmt(h.hospitalBedsPer10000) + ' per 10,000 people</dd></div>'
    + '<div><dt>Doctors</dt><dd>' + fmt(h.doctorsPer10000) + ' per 10,000 people</dd></div>'
    + '<div><dt>Hospitals</dt><dd>' + h.hospitals + '</dd></div>'
    + '<div><dt>Clinics</dt><dd>' + int(h.clinics) + '</dd></div>'
    + '<div><dt>Health spending</dt><dd>' + fmt(h.healthSpendPctGdp) + '% of GDP</dd></div>'
    + '<div><dt>Childhood vaccination</dt><dd>' + fmt(h.vaccinationCoveragePct) + '% coverage</dd></div></dl>'
    + sourceLine('Ministry of Health administrative records, via KALSTAT.') + '</div></section>'
    + '<section class="card"><h2>Life expectancy by region · ' + year + '</h2><table class="data-table sortable"><thead><tr><th data-sort="region">Region</th><th data-sort="life">Life expectancy (years)</th><th data-sort="doctors">Doctors / 10,000</th></tr></thead><tbody>'
    + REGIONS.map((r) => '<tr><td>' + r.name + '</td><td>' + fmt(r.lifeExpectancy) + '</td><td>' + fmt(24 + (r.lifeExpectancy - 75) * 4) + '</td></tr>').join('')
    + '</tbody></table>' + sourceLine('KALSTAT regional health statistics, ' + year + '.') + '</section>';
}

export function renderEducation(year) {
  const e = EDUCATION_2025;
  return '<section class="page-head"><h1>Education</h1><p>Schools, enrolment and attainment — learning in the Republic of Kalandra.</p></section>'
    + '<section class="controls-row">' + yearSelect(year) + '</section>'
    + '<section class="kpi-grid">'
    + kpiCard('Literacy (15+)', fmt(e.literacyPct), '%', 'adults who can read and write', 'lifeExpectancy', '#0b5fa5')
    + kpiCard('Primary enrolment', fmt(e.primaryEnrolmentPct), '%', 'net enrolment, official age group', 'lifeExpectancy', '#0e7a5f')
    + kpiCard('Secondary enrolment', fmt(e.secondaryEnrolmentPct), '%', 'net enrolment, official age group', 'lifeExpectancy', '#7a3dbb')
    + kpiCard('Tertiary enrolment', fmt(e.tertiaryEnrolmentPct), '%', int(e.graduates2024) + ' graduates in 2024', 'lifeExpectancy', '#b54708')
    + '</section>'
    + '<section class="chart-grid"><div class="card"><h2>Enrolment by level · 2024/25 (%)</h2>'
    + barChart({ labels: ['Primary', 'Secondary', 'Tertiary'], values: [e.primaryEnrolmentPct, e.secondaryEnrolmentPct, e.tertiaryEnrolmentPct], label: 'Enrolment', unit: '%', color: '#0b5fa5' })
    + sourceLine('Ministry of Education, school census 2024/25, via KALSTAT.') + '</div>'
    + '<div class="card"><h2>Schools and teachers</h2><dl class="facts">'
    + '<div><dt>Schools</dt><dd>' + int(e.schools) + '</dd></div>'
    + '<div><dt>Universities</dt><dd>' + e.universities + '</dd></div>'
    + '<div><dt>Pupils per teacher (primary)</dt><dd>' + fmt(e.pupilsPerTeacherPrimary) + '</dd></div>'
    + '<div><dt>Graduates, 2024</dt><dd>' + int(e.graduates2024) + '</dd></div>'
    + '<div><dt>Adult literacy</dt><dd>' + fmt(e.literacyPct) + '%</dd></div>'
    + '<div><dt>School year</dt><dd>September – June</dd></div></dl>'
    + sourceLine('Ministry of Education administrative records.') + '</div></section>'
    + '<section class="card"><h2>Where students go after school · 2024</h2><p class="note">Of secondary-school leavers: university 41%, vocational college 27%, direct employment 22%, other or unknown 10%.</p>'
    + barChart({ labels: ['University', 'Vocational college', 'Employment', 'Other'], values: [41, 27, 22, 10], label: 'Destinations of school leavers', unit: '%', color: '#0e7a5f' })
    + sourceLine('KALSTAT school-leavers survey, 2024.') + '</section>';
}

export function renderRegions(year, selectedId) {
  const sel = REGIONS.find((r) => r.id === selectedId) || REGIONS[0];
  const totalPop = REGIONS.reduce((s, r) => s + r.population, 0);
  return '<section class="page-head"><h1>Regions</h1><p>Six regions make up Kalandra. Compare them side by side, or pick one to look closer.</p></section>'
    + '<section class="controls-row">' + yearSelect(year)
    + '<label class="year-pick">Region <select id="region-select" aria-label="Select region">'
    + REGIONS.map((r) => '<option value="' + r.id + '"' + (r.id === sel.id ? ' selected' : '') + '>' + r.name + '</option>').join('')
    + '</select></label></section>'
    + '<section class="region-hero card"><h2>' + sel.name + ' <span class="muted">— capital ' + sel.capital + '</span></h2>'
    + '<div class="kpi-grid">'
    + '<article class="kpi"><div class="kpi-label">Population</div><div class="kpi-value">' + int(sel.population) + '</div><div class="kpi-foot">' + fmt((sel.population / totalPop) * 100) + '% of Kalandra</div></article>'
    + '<article class="kpi"><div class="kpi-label">GDP per capita</div><div class="kpi-value">$' + int(sel.gdpPerCapitaUsd) + '</div><div class="kpi-foot">' + (sel.gdpPerCapitaUsd >= 11240 ? 'above' : 'below') + ' the national $11,240</div></article>'
    + '<article class="kpi"><div class="kpi-label">Unemployment</div><div class="kpi-value">' + fmt(sel.unemploymentPct) + '%</div><div class="kpi-foot">national average 4.6%</div></article>'
    + '<article class="kpi"><div class="kpi-label">Life expectancy</div><div class="kpi-value">' + fmt(sel.lifeExpectancy) + ' yrs</div><div class="kpi-foot">' + sel.urbanPct + '% of residents in towns</div></article>'
    + '</div></section>'
    + '<section class="card"><h2>Population by region · ' + year + '</h2>'
    + barChart({ labels: REGIONS.map((r) => r.name), values: REGIONS.map((r) => Math.round(r.population / 1000)), label: 'Population by region', unit: 'k', color: '#0b5fa5' })
    + sourceLine('KALSTAT regional population estimates, 1 July ' + year + '.') + '</section>'
    + '<section class="card"><h2>Compare all six regions · ' + year + '</h2><p class="note">Tap a column heading to sort.</p>'
    + '<table class="data-table sortable"><thead><tr><th data-sort="region">Region</th><th data-sort="pop">Population</th><th data-sort="gdp">GDP / capita (USD)</th><th data-sort="unemp">Unemployment (%)</th><th data-sort="life">Life expectancy</th><th data-sort="urban">Urban (%)</th></tr></thead><tbody>'
    + REGIONS.map((r) => '<tr><td><strong>' + r.name + '</strong><br><span class="muted">' + r.capital + '</span></td><td>' + int(r.population) + '</td><td>$' + int(r.gdpPerCapitaUsd) + '</td><td>' + fmt(r.unemploymentPct) + '</td><td>' + fmt(r.lifeExpectancy) + '</td><td>' + r.urbanPct + '</td></tr>').join('')
    + '</tbody></table>' + sourceLine('KALSTAT regional statistics, ' + year + '. Area: Aldermere 12,480 km²; Northgate 31,200 km²; Vostara 28,900 km²; Merrow Coast 19,800 km²; Telmor Highlands 54,600 km²; Southfen 37,640 km².') + '</section>';
}

export function renderExplorer(query) {
  const q = (query || '').trim().toLowerCase();
  const rows = [];
  YEARS.forEach((y, i) => {
    rows.push({ indicator: 'Population', year: y, value: fmt(SERIES.populationMillions[i], 2) + ' million', source: 'Population estimates' });
    rows.push({ indicator: 'GDP per capita (USD)', year: y, value: '$' + int(SERIES.gdpPerCapitaUsd[i]), source: 'National accounts' });
    rows.push({ indicator: 'GDP growth (%)', year: y, value: fmt(SERIES.gdpGrowthPct[i]) + '%', source: 'National accounts' });
    rows.push({ indicator: 'Unemployment rate (%)', year: y, value: fmt(SERIES.unemploymentPct[i]) + '%', source: 'Labour Force Survey' });
    rows.push({ indicator: 'CPI inflation (%)', year: y, value: fmt(SERIES.cpiInflationPct[i]) + '%', source: 'Consumer price index' });
    rows.push({ indicator: 'Life expectancy (years)', year: y, value: fmt(SERIES.lifeExpectancy[i]), source: 'Life tables' });
    rows.push({ indicator: 'Median monthly wage (KLD)', year: y, value: int(SERIES.medianWageKld[i]), source: 'Labour Force Survey' });
  });
  const filtered = q ? rows.filter((r) => (r.indicator + ' ' + r.year + ' ' + r.source).toLowerCase().includes(q)) : rows;
  return '<section class="page-head"><h1>Data explorer &amp; methodology</h1><p>Every headline figure in one searchable table, plus how each number is made.</p></section>'
    + '<section class="card"><h2>Search all indicators</h2>'
    + '<label class="search-box">Search <input id="explorer-search" type="search" placeholder="Try “unemployment”, “2020” or “wage”…" value="' + (query || '').replace(/"/g, '') + '" aria-label="Search indicators"></label>'
    + '<p class="note" id="explorer-count">' + filtered.length + ' of ' + rows.length + ' rows shown.</p>'
    + '<table class="data-table" id="explorer-table"><thead><tr><th>Indicator</th><th>Year</th><th>Value</th><th>Source</th></tr></thead><tbody>'
    + filtered.map((r) => '<tr><td>' + r.indicator + '</td><td>' + r.year + '</td><td>' + r.value + '</td><td>' + r.source + '</td></tr>').join('')
    + '</tbody></table></section>'
    + '<section><h2>How the numbers are made</h2>'
    + METHOD_NOTES.map((m) => '<article class="card method"><h3>' + m.topic + '</h3><p>' + m.text + '</p></article>').join('')
    + '</section>'
    + '<section class="card"><h2>Environment · 2025</h2><dl class="facts">'
    + '<div><dt>Forest cover</dt><dd>' + fmt(ENVIRONMENT_2025.forestCoverPct) + '% of land</dd></div>'
    + '<div><dt>Renewable electricity</dt><dd>' + fmt(ENVIRONMENT_2025.renewableSharePct) + '% of generation</dd></div>'
    + '<div><dt>CO₂ per person</dt><dd>' + fmt(ENVIRONMENT_2025.co2PerCapitaTonnes) + ' tonnes a year</dd></div>'
    + '<div><dt>Protected land</dt><dd>' + fmt(ENVIRONMENT_2025.protectedLandPct) + '%</dd></div>'
    + '<div><dt>Recycling rate</dt><dd>' + fmt(ENVIRONMENT_2025.recyclingRatePct) + '%</dd></div></dl>'
    + sourceLine('KALSTAT environment statistics, 2025.') + '</section>'
    + '<section class="card"><h2>About this site</h2><p>Kalandra Statistics is the fictional National Statistics Office of the Republic of Kalandra. All figures on this site are invented for demonstration and are internally consistent across pages. The site is a static demonstration built for the make.fun best national statistics site bounty; it loads no data from any other server.</p></section>';
}
