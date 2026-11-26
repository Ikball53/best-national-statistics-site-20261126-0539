// Hand-drawn SVG charts for the Kalandra statistics site.
// Every function takes plain data and returns an SVG string; nothing here
// fetches anything or touches the network.

function niceTicks(min, max, count) {
  const span = max - min || 1;
  const step = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(step)));
  const norm = step / mag;
  const nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const s = nice * mag;
  const start = Math.floor(min / s) * s;
  const ticks = [];
  for (let v = start; v <= max + s * 0.01; v += s) ticks.push(v);
  return { ticks, step: s };
}

function fmtNum(v) {
  if (Math.abs(v) >= 1000) return v.toLocaleString('en-US', { maximumFractionDigits: 0 });
  if (Number.isInteger(v)) return String(v);
  return v.toFixed(1);
}

export function lineChart({ labels, values, width = 640, height = 260, color = '#0b5fa5', label = '', unit = '', decimals = 1 }) {
  const padL = 52, padR = 14, padT = 14, padB = 30;
  const w = width - padL - padR, h = height - padT - padB;
  const min = Math.min(...values), max = Math.max(...values);
  const lo = Math.min(0, min - (max - min) * 0.15);
  const hi = max + (max - min) * 0.12;
  const { ticks } = niceTicks(lo, hi, 4);
  const x = (i) => padL + (i / (values.length - 1)) * w;
  const y = (v) => padT + (1 - (v - lo) / (hi - lo)) * h;
  const points = values.map((v, i) => x(i).toFixed(1) + ',' + y(v).toFixed(1)).join(' ');
  const area = 'M' + padL + ',' + y(lo) + ' L' + values.map((v, i) => x(i).toFixed(1) + ' ' + y(v).toFixed(1)).join(' L') + ' L' + x(values.length - 1) + ',' + y(lo) + ' Z';
  let grid = '';
  for (const t of ticks) {
    if (t < lo || t > hi) continue;
    grid += '<line x1="' + padL + '" y1="' + y(t) + '" x2="' + (padL + w) + '" y2="' + y(t) + '" stroke="#e3e8ee" stroke-width="1"/>';
    grid += '<text x="' + (padL - 8) + '" y="' + (y(t) + 4) + '" text-anchor="end" font-size="11" fill="#667085">' + fmtNum(t) + '</text>';
  }
  let xlabels = '';
  labels.forEach((lb, i) => {
    if (i % 2 === 0 || i === labels.length - 1) {
      xlabels += '<text x="' + x(i) + '" y="' + (height - 8) + '" text-anchor="middle" font-size="11" fill="#667085">' + lb + '</text>';
    }
  });
  const last = values[values.length - 1];
  const lastText = last.toLocaleString('en-US', { maximumFractionDigits: decimals }) + (unit ? ' ' + unit : '');
  return '<svg viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="' + label + ' line chart" xmlns="http://www.w3.org/2000/svg">'
    + grid
    + '<path d="' + area + '" fill="' + color + '" fill-opacity="0.08"/>'
    + '<polyline points="' + points + '" fill="none" stroke="' + color + '" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>'
    + values.map((v, i) => '<circle cx="' + x(i) + '" cy="' + y(v) + '" r="3.5" fill="#fff" stroke="' + color + '" stroke-width="2"/>').join('')
    + '<text x="' + (padL + w) + '" y="' + (y(last) - 10) + '" text-anchor="end" font-size="13" font-weight="700" fill="' + color + '">' + lastText + '</text>'
    + xlabels + '</svg>';
}

export function barChart({ labels, values, width = 640, height = 260, color = '#0e7a5f', label = '', unit = '', decimals = 1 }) {
  const padL = 52, padR = 14, padT = 26, padB = 30;
  const w = width - padL - padR, h = height - padT - padB;
  const max = Math.max(...values, 0);
  const min = Math.min(...values, 0);
  const hi = max * 1.15 || 1;
  const lo = min * 1.15 || 0;
  const { ticks } = niceTicks(lo, hi, 4);
  const yOf = (v) => padT + (1 - (v - lo) / (hi - lo)) * h;
  const slot = w / values.length;
  const bw = Math.min(46, slot * 0.62);
  let grid = '';
  for (const t of ticks) {
    const yy = yOf(t);
    grid += '<line x1="' + padL + '" y1="' + yy + '" x2="' + (padL + w) + '" y2="' + yy + '" stroke="#e3e8ee" stroke-width="1"/>';
    grid += '<text x="' + (padL - 8) + '" y="' + (yy + 4) + '" text-anchor="end" font-size="11" fill="#667085">' + fmtNum(t) + '</text>';
  }
  let bars = '';
  values.forEach((v, i) => {
    const top = Math.min(yOf(v), yOf(0));
    const bh = Math.abs(yOf(v) - yOf(0));
    const bx = padL + i * slot + (slot - bw) / 2;
    bars += '<rect x="' + bx.toFixed(1) + '" y="' + top.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + Math.max(bh, 1).toFixed(1) + '" rx="3" fill="' + (v < 0 ? '#b54708' : color) + '"/>';
    const labelY = v < 0 ? top + bh + 14 : top - 6;
    bars += '<text x="' + (bx + bw / 2).toFixed(1) + '" y="' + labelY.toFixed(1) + '" text-anchor="middle" font-size="11" font-weight="600" fill="#344054">' + v.toLocaleString('en-US', { maximumFractionDigits: decimals }) + (unit ? ' ' + unit : '') + '</text>';
    bars += '<text x="' + (padL + i * slot + slot / 2).toFixed(1) + '" y="' + (height - 8) + '" text-anchor="middle" font-size="11" fill="#667085">' + labels[i] + '</text>';
  });
  return '<svg viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="' + label + ' bar chart" xmlns="http://www.w3.org/2000/svg">' + grid + bars + '</svg>';
}

export function donutChart({ slices, width = 300, height = 220, label = '' }) {
  const cx = 90, cy = height / 2, r = 68, ir = 42;
  const total = slices.reduce((s, d) => s + d.value, 0);
  let a0 = -Math.PI / 2;
  let paths = '';
  slices.forEach((d) => {
    const a1 = a0 + (d.value / total) * Math.PI * 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xi1 = cx + ir * Math.cos(a1), yi1 = cy + ir * Math.sin(a1);
    const xi0 = cx + ir * Math.cos(a0), yi0 = cy + ir * Math.sin(a0);
    paths += '<path d="M' + x0.toFixed(1) + ' ' + y0.toFixed(1) + ' A' + r + ' ' + r + ' 0 ' + large + ' 1 ' + x1.toFixed(1) + ' ' + y1.toFixed(1) + ' L' + xi1.toFixed(1) + ' ' + yi1.toFixed(1) + ' A' + ir + ' ' + ir + ' 0 ' + large + ' 0 ' + xi0.toFixed(1) + ' ' + yi0.toFixed(1) + ' Z" fill="' + d.color + '"/>';
    a0 = a1;
  });
  let legend = '';
  slices.forEach((d, i) => {
    const ly = 34 + i * 30;
    legend += '<rect x="186" y="' + (ly - 11) + '" width="12" height="12" rx="2" fill="' + d.color + '"/>';
    legend += '<text x="204" y="' + ly + '" font-size="12.5" fill="#344054">' + d.name + ' — ' + d.value.toFixed(1) + '%</text>';
  });
  return '<svg viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="' + label + '" xmlns="http://www.w3.org/2000/svg">' + paths
    + '<text x="' + cx + '" y="' + (cy - 2) + '" text-anchor="middle" font-size="19" font-weight="700" fill="#101828">' + total.toFixed(0) + '%</text>'
    + '<text x="' + cx + '" y="' + (cy + 16) + '" text-anchor="middle" font-size="11" fill="#667085">of total</text>'
    + legend + '</svg>';
}

export function sparkline(values, { width = 120, height = 36, color = '#0b5fa5' } = {}) {
  const min = Math.min(...values), max = Math.max(...values);
  const span = max - min || 1;
  const pts = values.map((v, i) => ((i / (values.length - 1)) * width).toFixed(1) + ',' + (height - 3 - ((v - min) / span) * (height - 6)).toFixed(1)).join(' ');
  return '<svg viewBox="0 0 ' + width + ' ' + height + '" width="' + width + '" height="' + height + '" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><polyline points="' + pts + '" fill="none" stroke="' + color + '" stroke-width="2" stroke-linejoin="round"/></svg>';
}
