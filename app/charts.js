// Indonesia in Numbers — chart builders.
//
// Every chart is drawn as inline SVG from the dataset, with no library and
// no network request. All functions return an SVG string ready to inject.

function niceTicks(min, max, count) {
  const span = max - min || 1;
  const step = span / count;
  const mag = 10 ** Math.floor(Math.log10(step));
  const norm = step / mag;
  const nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const size = nice * mag;
  const start = Math.floor(min / size) * size;
  const ticks = [];
  for (let v = start; v <= max + size * 0.001; v += size) ticks.push(v);
  return { ticks, size };
}

function fmt(v, digits = 0) {
  return v.toLocaleString("en-US", { maximumFractionDigits: digits, minimumFractionDigits: digits });
}

// A line chart with labelled axes and a dot on every year.
export function lineChart({ labels, values, height = 240, color = "#0b5fa5", unit = "", decimals = 0 }) {
  const W = 640, H = height, PL = 56, PR = 18, PT = 16, PB = 30;
  const min = Math.min(...values), max = Math.max(...values);
  const pad = (max - min) * 0.12 || 1;
  const lo = Math.floor(min - pad), hi = Math.ceil(max + pad);
  const { ticks } = niceTicks(lo, hi, 4);
  const x = (i) => PL + (i * (W - PL - PR)) / (labels.length - 1);
  const y = (v) => PT + (1 - (v - lo) / (hi - lo)) * (H - PT - PB);
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Line chart" xmlns="http://www.w3.org/2000/svg">`;
  for (const t of ticks) {
    s += `<line x1="${PL}" y1="${y(t)}" x2="${W - PR}" y2="${y(t)}" stroke="#e3e8ee" stroke-width="1"/>`;
    s += `<text x="${PL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="#64748b">${fmt(t, decimals)}${unit}</text>`;
  }
  const pts = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  s += `<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  values.forEach((v, i) => {
    s += `<circle cx="${x(i)}" cy="${y(v)}" r="3.5" fill="#fff" stroke="${color}" stroke-width="2"/>`;
    s += `<text x="${x(i)}" y="${H - 8}" text-anchor="middle" font-size="11" fill="#64748b">${labels[i]}</text>`;
  });
  const last = values.length - 1;
  s += `<text x="${x(last)}" y="${y(values[last]) - 10}" text-anchor="end" font-size="13" font-weight="700" fill="${color}">${fmt(values[last], decimals)}${unit}</text>`;
  return s + "</svg>";
}

// Vertical bars, one per label, value shown above each bar.
export function barChart({ labels, values, height = 240, color = "#0e7a5f", unit = "", decimals = 1, highlightLast = true }) {
  const W = 640, H = height, PL = 48, PR = 12, PT = 26, PB = 30;
  const lo = Math.min(0, ...values);
  const hi = Math.max(...values) * 1.15;
  const bw = (W - PL - PR) / labels.length;
  const y = (v) => PT + (1 - (v - lo) / (hi - lo)) * (H - PT - PB);
  const zeroY = y(0);
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Bar chart" xmlns="http://www.w3.org/2000/svg">`;
  for (let t = 0; t <= 4; t++) {
    const v = lo + ((hi - lo) / 4) * t;
    s += `<line x1="${PL}" y1="${y(v)}" x2="${W - PR}" y2="${y(v)}" stroke="#e3e8ee" stroke-width="1"/>`;
    s += `<text x="${PL - 8}" y="${y(v) + 4}" text-anchor="end" font-size="11" fill="#64748b">${fmt(v, decimals)}${unit}</text>`;
  }
  s += `<line x1="${PL}" y1="${zeroY}" x2="${W - PR}" y2="${zeroY}" stroke="#94a3b8" stroke-width="1.5"/>`;
  values.forEach((v, i) => {
    const bx = PL + i * bw + bw * 0.18;
    const fill = highlightLast && i === values.length - 1 ? "#c2410c" : color;
    const top = Math.min(y(v), zeroY);
    const hgt = Math.abs(zeroY - y(v));
    s += `<rect x="${bx.toFixed(1)}" y="${top.toFixed(1)}" width="${(bw * 0.64).toFixed(1)}" height="${hgt.toFixed(1)}" rx="3" fill="${fill}"/>`;
    const labelY = v >= 0 ? y(v) - 6 : zeroY - 6;
    s += `<text x="${(bx + bw * 0.32).toFixed(1)}" y="${labelY.toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="#334155">${fmt(v, decimals)}</text>`;
    s += `<text x="${(bx + bw * 0.32).toFixed(1)}" y="${H - 8}" text-anchor="middle" font-size="11" fill="#64748b">${labels[i]}</text>`;
  });
  return s + "</svg>";
}

// Horizontal bars for ranked lists (provinces, export goods, sectors).
export function hbarChart({ rows, valueFmt, maxValue, color = "#0b5fa5" }) {
  const W = 640, rowH = 34, PL = 190, PR = 70, PT = 6;
  const H = rows.length * rowH + PT + 8;
  const max = maxValue || Math.max(...rows.map((r) => r.value));
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Ranked bars" xmlns="http://www.w3.org/2000/svg">`;
  rows.forEach((r, i) => {
    const y = PT + i * rowH;
    const w = ((W - PL - PR) * r.value) / max;
    s += `<text x="${PL - 10}" y="${y + 17}" text-anchor="end" font-size="12" fill="#1e293b">${r.label}</text>`;
    s += `<rect x="${PL}" y="${y + 4}" width="${Math.max(w, 2).toFixed(1)}" height="18" rx="3" fill="${r.color || color}"/>`;
    s += `<text x="${PL + Math.max(w, 2) + 8}" y="${y + 18}" font-size="12" font-weight="700" fill="#0f172a">${valueFmt(r.value)}</text>`;
  });
  return s + "</svg>";
}

// Donut for a share breakdown, with a legend column beside it.
export function donutChart({ rows, colors }) {
  const size = 190, cx = 95, cy = 95, r = 72, hole = 46;
  const total = rows.reduce((a, b) => a + b.value, 0);
  let s = `<svg viewBox="0 0 ${size} ${size}" role="img" aria-label="Share chart" xmlns="http://www.w3.org/2000/svg">`;
  let angle = -90;
  rows.forEach((row, i) => {
    const frac = row.value / total;
    const a0 = angle, a1 = angle + frac * 360;
    const large = frac > 0.5 ? 1 : 0;
    const p = (a) => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)];
    const q = (a) => [cx + hole * Math.cos((a * Math.PI) / 180), cy + hole * Math.sin((a * Math.PI) / 180)];
    const [x0, y0] = p(a0), [x1, y1] = p(a1), [x2, y2] = q(a1), [x3, y3] = q(a0);
    s += `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)} A ${hole} ${hole} 0 ${large} 0 ${x3.toFixed(1)} ${y3.toFixed(1)} Z" fill="${colors[i % colors.length]}"/>`;
    angle = a1;
  });
  s += `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="22" font-weight="800" fill="#0f172a">${fmt(total, 1)}</text>`;
  s += `<text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="11" fill="#64748b">million people</text>`;
  return s + "</svg>";
}
