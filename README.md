[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=makefun&utm_medium=badge&utm_campaign=best-national-statistics-site-20261126-0539)

[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Ikball53/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=makefun&utm_medium=badge&utm_campaign=best-national-statistics-site-20261126-0539)

[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Ikball53/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=makefun&utm_medium=badge&utm_campaign=best-national-statistics-site-20261126-0539)


# Indonesia in Numbers — National Statistics Explorer

A national statistics site for Indonesia: population, economy, prices, labour
market, trade, regions and a country comparison tool — all from real published
figures, cited to source and year.

## What it is

- **Overview** — 8 headline indicators (population 281.6m, GDP US$1,396bn,
  GDP per capita US$4,926, growth 5.03%, inflation 1.57%, unemployment 4.91%,
  poverty 8.57%, life expectancy 74.1 years), each with its year-on-year
  change and its source; a 10-year GDP chart with a 5/10-year range switch.
- **Economy** — GDP and real-growth series 2015–2024, industry shares.
- **Population** — 10-year population series and the 2024 age structure.
- **Prices** — December CPI inflation 2015–2024 (1.57% in 2024).
- **Labour** — unemployment series, workforce facts, employment by sector.
- **Trade** — exports vs imports 2015–2024, top export goods.
- **Regions** — the 10 largest provinces and a province explorer that updates
  population, GDP share and poverty for the chosen province.
- **Compare** — Indonesia against Vietnam, Thailand, Malaysia, the
  Philippines and Singapore, with a two-country picker and table.
- **Data & sources** — BPS, World Bank WDI and IMF references, methods notes,
  and a working CSV download of the headline indicators.

## Sources

BPS — Statistics Indonesia (Population Projection, National Accounts,
Consumer Price Index, Sakernas, Poverty Profile, Human Development and
Foreign Trade Statistics, 2024); World Bank — World Development Indicators
2024; IMF — World Economic Outlook, October 2024. Figures are rounded for
display; the site names the exact release for each number.

## Running it

Serve `app/` with any static server, e.g. `python3 -m http.server` inside
`app/`, then open `index.html`. No build step, no network requests, no
external libraries — charts are inline SVG drawn from `data.js`.

## Hand-in

`main.ts` copies `app/` and `screenshots/` to the output directory and writes
`dossier.json` with the kit's `vendor/makefun-frontend.ts`:

```
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see `LICENSE`.
