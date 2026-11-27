// Indonesia in Numbers — interaction layer.
//
// Hash routing (#/overview, #/economy, #/population, #/prices, #/labour,
// #/trade, #/regions, #/compare, #/sources), the province explorer, the
// country comparison picker, the indicator search and the CSV download.
// All rendering is from data.js; nothing is fetched from the network.

import { AGE_GROUPS, COUNTRIES, EXPORT_GOODS, HEADLINE, LABOUR, META, PROVINCES, SERIES, SOURCES } from "./data.js";
import { barChart, donutChart, hbarChart, lineChart } from "./charts.js";

const $ = (sel) => document.querySelector(sel);
const fmt = (v, d = 0) => v.toLocaleString("en-US", { maximumFractionDigits: d, minimumFractionDigits: d });

const ROUTES = ["overview", "economy", "population", "prices", "labour", "trade", "regions", "compare", "sources"];
const TITLES = {
  overview: "Overview", economy: "Economy", population: "Population",
  prices: "Prices & inflation", labour: "Labour market", trade: "Trade",
  regions: "Regions", compare: "Compare countries", sources: "Data & sources",
};

function kpiCard(k) {
  const up = k.change >= 0;
  const arrow = up ? "▲" : "▼";
  return `<article class="kpi" data-indicator="${k.label.toLowerCase()} ${k.id}">
    <div class="kpi-label">${k.label}</div>
    <div class="kpi-value">${fmt(k.value, k.format === "2dp" ? 2 : k.format === "1dp" ? 1 : 0)} <span class="kpi-unit">${k.unit}</span></div>
    <div class="kpi-meta"><span class="delta ${up ? "up" : "down"}">${arrow} ${up ? "+" : ""}${fmt(k.change, 2)}</span> ${k.changeLabel} · ${k.year}</div>
    <div class="kpi-src">${k.source}</div>
  </article>`;
}

function renderOverview() {
  return `
  <section class="hero">
    <p class="eyebrow">National Statistics Explorer · ${META.updated}</p>
    <h1>Indonesia in Numbers</h1>
    <p class="lede">The country's key statistics in one place — population, economy, prices, work and trade — from the official releases of BPS Statistics Indonesia, the World Bank and the IMF. Every figure below is cited to its source and reference year.</p>
    <div class="kpi-grid">${HEADLINE.map(kpiCard).join("")}</div>
  </section>
  <section class="card">
    <h2>GDP at a glance</h2>
    <p class="chart-note">Gross domestic product, current US$ billion, 2015–2024. Source: World Bank, World Development Indicators.</p>
    <div id="chart-gdp"></div>
    <div class="range-row"><span>Chart range:</span>
      <button class="pill active" data-range="10">10 years</button>
      <button class="pill" data-range="5">5 years</button>
    </div>
  </section>
  <section class="card">
    <h2>What to explore</h2>
    <div class="link-grid">
      <a href="#/economy">Economy — GDP growth and the structure of output</a>
      <a href="#/population">Population — 281.6 million people, by age and province</a>
      <a href="#/prices">Prices — inflation at 1.57%, its lowest in years</a>
      <a href="#/labour">Labour — 152.1 million in the workforce</a>
      <a href="#/trade">Trade — a US$31.0 bn surplus in 2024</a>
      <a href="#/compare">Compare — Indonesia against five neighbours</a>
    </div>
  </section>`;
}

function renderEconomy() {
  return `
  <section class="card"><h2>Economy</h2>
    <p class="lede">Real GDP grew 5.03% in 2024. Nominal GDP reached US$1,396 billion — the largest economy in Southeast Asia — and GDP per capita US$4,926.</p>
    <h3>GDP, 2015–2024 (US$ bn)</h3><div id="chart-gdp2"></div>
    <p class="chart-note">Source: World Bank, World Development Indicators 2024.</p>
    <h3>Real GDP growth, 2015–2024 (%)</h3><div id="chart-growth"></div>
    <p class="chart-note">The 2020 contraction (−2.07%) is the COVID-19 shock; growth has held at or above 5% every year since 2022. Source: BPS, National Accounts.</p>
  </section>
  <section class="card"><h2>How the economy is made up</h2>
    <p class="lede">Manufacturing is the largest single industry at 18.7% of GDP, followed by trade (13.0%) and agriculture (12.5%). Mining and quarrying contribute 10.5%.</p>
    <div id="chart-sectors"></div>
    <p class="chart-note">Shares of GDP at current prices, 2024. Source: BPS, National Accounts 2024.</p>
  </section>`;
}

function renderPopulation() {
  const total = AGE_GROUPS.reduce((a, b) => a + b.value, 0);
  return `
  <section class="card"><h2>Population</h2>
    <p class="lede">281.6 million people in 2024 — the world's fourth-largest population — growing about 0.8% a year. Two in three Indonesians are of working age (15–64).</p>
    <h3>Population, 2015–2024 (millions)</h3><div id="chart-pop"></div>
    <p class="chart-note">Source: BPS, Population Projection 2024.</p>
  </section>
  <section class="card"><h2>Age structure, 2024</h2>
    <div class="split">
      <div id="chart-age"></div>
      <div class="legend">${AGE_GROUPS.map((g, i) => `<div class="legend-row"><span class="swatch" style="background:${["#0b5fa5", "#0e7a5f", "#c2410c", "#7c3aed", "#64748b"][i]}"></span>${g.band} years — <b>${fmt(g.value, 1)}m</b> (${fmt((g.value / total) * 100, 1)}%)</div>`).join("")}</div>
    </div>
    <p class="chart-note">A young population: the median age is about 30. Source: BPS, Population Projection 2024.</p>
  </section>`;
}

function renderPrices() {
  return `
  <section class="card"><h2>Prices &amp; inflation</h2>
    <p class="lede">Consumer-price inflation ended 2024 at 1.57% year on year — down from 5.51% at the end of 2022 and the lowest December reading in the decade.</p>
    <h3>Inflation, December year-on-year (%), 2015–2024</h3><div id="chart-cpi"></div>
    <p class="chart-note">Source: BPS, Consumer Price Index, December releases.</p>
    <div class="fact-row">
      <div class="fact"><b>1.57%</b><span>Headline CPI, Dec 2024</span></div>
      <div class="fact"><b>2.36%</b><span>Core inflation, Dec 2024</span></div>
      <div class="fact"><b>5.51%</b><span>Peak of the decade, Dec 2022</span></div>
      <div class="fact"><b>2.5% ± 1</b><span>Bank Indonesia target band</span></div>
    </div>
  </section>`;
}

function renderLabour() {
  return `
  <section class="card"><h2>Labour market</h2>
    <p class="lede">152.1 million people in the labour force in August 2024; 144.6 million employed and the unemployment rate at 4.91% — the lowest since the 1990s. Informal work still employs 59.2% of workers.</p>
    <h3>Unemployment rate (%), August, 2015–2024</h3><div id="chart-unemp"></div>
    <p class="chart-note">Source: BPS, Sakernas (National Labour Force Survey), August rounds.</p>
    <div class="fact-row">
      <div class="fact"><b>152.1m</b><span>Labour force</span></div>
      <div class="fact"><b>144.6m</b><span>Employed</span></div>
      <div class="fact"><b>16.4%</b><span>Youth unemployment (15–24)</span></div>
      <div class="fact"><b>59.2%</b><span>Informal employment</span></div>
    </div>
  </section>
  <section class="card"><h2>Where people work</h2>
    <div id="chart-labour"></div>
    <p class="chart-note">Share of employment by sector, Aug 2024. Source: BPS, Sakernas.</p>
  </section>`;
}

function renderTrade() {
  const surplus = SERIES.exportsUsdBn[9] - SERIES.importsUsdBn[9];
  return `
  <section class="card"><h2>Trade</h2>
    <p class="lede">Exports of US$264.7 billion against imports of US$233.7 billion in 2024 — a trade surplus of US$${fmt(surplus, 1)} billion, the fifth straight yearly surplus.</p>
    <h3>Exports vs imports (US$ bn), 2015–2024</h3><div id="chart-trade"></div>
    <p class="chart-note">Source: BPS, Foreign Trade Statistics 2024.</p>
  </section>
  <section class="card"><h2>Top export goods, 2024</h2>
    <div id="chart-goods"></div>
    <p class="chart-note">US$ billion. Coal, palm oil and iron &amp; steel together are about one-third of exports. Source: BPS, Foreign Trade Statistics 2024.</p>
  </section>`;
}

function renderRegions() {
  const options = PROVINCES.map((p) => `<option value="${p.name}">${p.name}</option>`).join("");
  return `
  <section class="card"><h2>Regions</h2>
    <p class="lede">Java holds 55% of the population and about 58% of GDP. Jakarta alone produces 16.9% of national output with 10.6 million people.</p>
    <h3>Largest provinces by population, 2024</h3><div id="chart-provinces"></div>
    <p class="chart-note">Population in millions. Source: BPS, Population Projection 2024.</p>
  </section>
  <section class="card"><h2>Province explorer</h2>
    <label class="field">Choose a province
      <select id="province-select">${options}</select>
    </label>
    <div id="province-detail"></div>
  </section>`;
}

function provinceDetail(p) {
  const share = ((p.pop / 281.6) * 100).toFixed(1);
  return `<div class="fact-row">
    <div class="fact"><b>${fmt(p.pop, 1)}m</b><span>Population (${share}% of Indonesia)</span></div>
    <div class="fact"><b>${fmt(p.grdpShare, 1)}%</b><span>Share of national GDP</span></div>
    <div class="fact"><b>${fmt(p.poverty, 1)}%</b><span>Poverty rate, Sep 2024</span></div>
    <div class="fact"><b>${p.capital}</b><span>Provincial capital</span></div>
  </div>
  <p class="chart-note">${p.name} is home to ${fmt(p.pop, 1)} million people — ${share}% of the country — and produces ${fmt(p.grdpShare, 1)}% of national GDP. Its poverty rate of ${fmt(p.poverty, 1)}% compares with 8.57% nationally. Sources: BPS 2024.</p>`;
}

function renderCompare() {
  const opts = (sel) => COUNTRIES.map((c) => `<option value="${c.code}" ${c.code === sel ? "selected" : ""}>${c.name}</option>`).join("");
  return `
  <section class="card"><h2>Compare countries</h2>
    <p class="lede">Indonesia against five Southeast Asian neighbours, 2024. Pick any two countries to compare side by side.</p>
    <div class="compare-pickers">
      <label class="field">Country A <select id="cmp-a">${opts("IDN")}</select></label>
      <label class="field">Country B <select id="cmp-b">${opts("VNM")}</select></label>
    </div>
    <div id="compare-table"></div>
    <div id="compare-chart"></div>
    <p class="chart-note">GDP and population: World Bank WDI 2024. Life expectancy: World Bank 2023. Unemployment: national labour surveys, 2024.</p>
  </section>`;
}

function compareTable(a, b) {
  const rows = [
    ["Population (millions)", fmt(a.pop, 1), fmt(b.pop, 1)],
    ["GDP (US$ bn)", fmt(a.gdp), fmt(b.gdp)],
    ["GDP per capita (US$)", fmt(a.gdpPc), fmt(b.gdpPc)],
    ["Real GDP growth (%)", fmt(a.growth, 2), fmt(b.growth, 2)],
    ["Inflation (% yoy)", fmt(a.inflation, 2), fmt(b.inflation, 2)],
    ["Unemployment (%)", fmt(a.unemp, 2), fmt(b.unemp, 2)],
    ["Life expectancy (years)", fmt(a.life, 1), fmt(b.life, 1)],
  ];
  return `<table class="data-table"><thead><tr><th>Indicator</th><th>${a.name}</th><th>${b.name}</th></tr></thead>
  <tbody>${rows.map(([k, x, y]) => `<tr><td>${k}</td><td>${x}</td><td>${y}</td></tr>`).join("")}</tbody></table>`;
}

function renderSources() {
  return `
  <section class="card"><h2>Data &amp; sources</h2>
    <p class="lede">Every figure on this site comes from a published official release. Figures are rounded for display; the sources below hold the exact values.</p>
    ${SOURCES.map((s) => `<div class="source-block"><h3>${s.name}</h3><p>${s.detail}</p><p class="chart-note">${s.url}</p></div>`).join("")}
    <h3>Methods &amp; notes</h3>
    <ul class="notes">
      <li>GDP is in current US dollars unless labelled "real", which means inflation-adjusted growth.</li>
      <li>Inflation is the December year-on-year change in the consumer price index.</li>
      <li>Unemployment and labour figures are from the August round of Sakernas each year.</li>
      <li>Provincial poverty rates are for September 2024; the national rate is 8.57%.</li>
      <li>Regional comparison figures are World Bank WDI 2024, except life expectancy (2023).</li>
    </ul>
    <button id="download-csv" class="btn">Download the headline indicators as CSV</button>
    <p class="chart-note" id="csv-note"></p>
  </section>`;
}

const RENDER = {
  overview: renderOverview, economy: renderEconomy, population: renderPopulation,
  prices: renderPrices, labour: renderLabour, trade: renderTrade,
  regions: renderRegions, compare: renderCompare, sources: renderSources,
};

function drawCharts(route) {
  const y = SERIES.years;
  if (route === "overview") {
    $("#chart-gdp").innerHTML = lineChart({ labels: y, values: SERIES.gdpUsdBn, unit: "", decimals: 0 });
    document.querySelectorAll("[data-range]").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("[data-range]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const n = Number(btn.dataset.range);
        $("#chart-gdp").innerHTML = lineChart({ labels: y.slice(-n), values: SERIES.gdpUsdBn.slice(-n) });
      });
    });
  }
  if (route === "economy") {
    $("#chart-gdp2").innerHTML = lineChart({ labels: y, values: SERIES.gdpUsdBn });
    $("#chart-growth").innerHTML = barChart({ labels: y.map(String), values: SERIES.gdpGrowthPct, unit: "%", decimals: 2, color: "#0b5fa5", highlightLast: false });
    $("#chart-sectors").innerHTML = hbarChart({
      rows: [
        { label: "Manufacturing", value: 18.7 }, { label: "Trade", value: 13.0 },
        { label: "Agriculture", value: 12.5 }, { label: "Mining & quarrying", value: 10.5 },
        { label: "Construction", value: 10.2 }, { label: "Transport & storage", value: 6.1 },
        { label: "Finance & insurance", value: 4.2 }, { label: "Other services", value: 24.8 },
      ],
      valueFmt: (v) => `${fmt(v, 1)}%`,
    });
  }
  if (route === "population") {
    $("#chart-pop").innerHTML = lineChart({ labels: y, values: SERIES.populationM, decimals: 1 });
    $("#chart-age").innerHTML = donutChart({ rows: AGE_GROUPS, colors: ["#0b5fa5", "#0e7a5f", "#c2410c", "#7c3aed", "#64748b"] });
  }
  if (route === "prices") {
    $("#chart-cpi").innerHTML = barChart({ labels: y.map(String), values: SERIES.inflationPct, unit: "%", decimals: 2 });
  }
  if (route === "labour") {
    $("#chart-unemp").innerHTML = lineChart({ labels: y, values: SERIES.unemploymentPct, unit: "%", decimals: 2 });
    $("#chart-labour").innerHTML = hbarChart({
      rows: LABOUR.bySector.map((s) => ({ label: s.sector, value: s.share })),
      valueFmt: (v) => `${fmt(v, 1)}%`,
    });
  }
  if (route === "trade") {
    $("#chart-trade").innerHTML = barChart({ labels: y.map(String), values: SERIES.exportsUsdBn, unit: "", decimals: 0, color: "#0b5fa5" });
    $("#chart-goods").innerHTML = hbarChart({
      rows: EXPORT_GOODS.map((g) => ({ label: g.good, value: g.value })),
      valueFmt: (v) => `US$${fmt(v, 1)}bn`,
      color: "#0e7a5f",
    });
  }
  if (route === "regions") {
    $("#chart-provinces").innerHTML = hbarChart({
      rows: PROVINCES.map((p) => ({ label: p.name, value: p.pop })),
      valueFmt: (v) => `${fmt(v, 1)}m`,
    });
    const sel = $("#province-select");
    const show = () => { $("#province-detail").innerHTML = provinceDetail(PROVINCES.find((p) => p.name === sel.value)); };
    sel.addEventListener("change", show);
    show();
  }
  if (route === "compare") {
    const update = () => {
      const a = COUNTRIES.find((c) => c.code === $("#cmp-a").value);
      const b = COUNTRIES.find((c) => c.code === $("#cmp-b").value);
      $("#compare-table").innerHTML = compareTable(a, b);
      $("#compare-chart").innerHTML = hbarChart({
        rows: [
          { label: `${a.name} — GDP per capita`, value: a.gdpPc, color: "#0b5fa5" },
          { label: `${b.name} — GDP per capita`, value: b.gdpPc, color: "#c2410c" },
        ],
        valueFmt: (v) => `US$${fmt(v)}`,
      });
    };
    $("#cmp-a").addEventListener("change", update);
    $("#cmp-b").addEventListener("change", update);
    update();
  }
  if (route === "sources") {
    $("#download-csv").addEventListener("click", () => {
      const lines = ["indicator,value,unit,year,source"];
      HEADLINE.forEach((k) => lines.push(`"${k.label}",${k.value},"${k.unit}",${k.year},"${k.source}"`));
      const blob = new Blob([lines.join("\n")], { type: "text/csv" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "indonesia-headline-indicators-2024.csv";
      a.click();
      URL.revokeObjectURL(a.href);
      $("#csv-note").textContent = "Downloaded indonesia-headline-indicators-2024.csv — 8 headline indicators with sources.";
    });
  }
}

function route() {
  const hash = location.hash.replace(/^#\/?/, "") || "overview";
  const name = ROUTES.includes(hash) ? hash : "overview";
  $("#page-title").textContent = TITLES[name];
  document.querySelectorAll("nav a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#/${name}`));
  $("#view").innerHTML = RENDER[name]();
  drawCharts(name);
  window.scrollTo(0, 0);
}

function initSearch() {
  $("#search").addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (location.hash.replace(/^#\/?/, "") !== "overview") location.hash = "#/overview";
    document.querySelectorAll(".kpi").forEach((card) => {
      card.style.display = !q || card.dataset.indicator.includes(q) ? "" : "none";
    });
    const visible = [...document.querySelectorAll(".kpi")].filter((c) => c.style.display !== "none").length;
    $("#search-note").textContent = q ? `${visible} of ${HEADLINE.length} indicators match “${e.target.value.trim()}”.` : "";
  });
}

window.addEventListener("hashchange", route);
document.addEventListener("DOMContentLoaded", () => { route(); initSearch(); });
