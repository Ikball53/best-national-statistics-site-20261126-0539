[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=makefun&utm_medium=badge&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Ikball53/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=makefun&utm_medium=badge&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Ikball53/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=makefun&utm_medium=badge&utm_campaign=best-national-statistics-site-20261126-0539)

# Kalandra in numbers — a national statistics site

Entry for make.fun competition `best-national-statistics-site-20261126-0539`.

Kalandra Statistics is the official statistics site for the fictional Republic
of Kalandra: population, economy, prices, health, education and regions, with
real figures, live controls and hand-drawn SVG charts. Everything runs offline
from static files under `app/` — no network requests.

`screenshots/` holds 4 real renders of the site's own code. `main.ts` hands
the site in: it copies `app/` and `screenshots/` to `/output` and writes
`/output/dossier.json`.

Run it with:

```sh
node main.ts
```
