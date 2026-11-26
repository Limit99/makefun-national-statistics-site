// Canvas charts for Indonesia in Numbers — no library, drawn by hand.
// drawChart(container, series, options) renders one chart with axes, value
// labels and a hover tooltip, and re-renders when its container resizes.

const TEAL = '#0f5751';
const TEAL_DARK = '#0b3d3a';
const AMBER = '#e8a317';
const GRID = '#d9e2df';
const MUTED = '#5b6b68';

function setupCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const w = Math.max(280, Math.round(rect.width));
  const h = Math.max(180, Math.round(rect.height));
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w, h };
}

function niceTicks(min, max) {
  const span = max - min || 1;
  const step = Math.pow(10, Math.floor(Math.log10(span / 4)));
  const lo = Math.floor(min / step) * step;
  const hi = Math.ceil(max / step) * step;
  const ticks = [];
  for (let v = lo; v <= hi + step / 2; v += step) ticks.push(v);
  return { lo, hi, ticks };
}

export function drawChart(canvas, series, opts = {}) {
  const type = opts.type || 'bar';
  const { ctx, w, h } = setupCanvas(canvas);
  const padL = 58, padR = 14, padT = 16, padB = 34;
  const plotW = w - padL - padR;
  const plotH = h - padT - padB;
  const points = series.data;
  const values = points.map((p) => p[1]);
  let min = Math.min(...values);
  let max = Math.max(...values);
  if (min > 0 && type === 'bar') min = 0;
  if (min === max) { min -= 1; max += 1; }
  const pad = (max - min) * 0.08;
  min -= pad; max += pad;
  const { ticks } = niceTicks(min, max);
  const yOf = (v) => padT + plotH - ((v - min) / (max - min)) * plotH;
  const xOf = (i) => padL + (plotW * (i + 0.5)) / points.length;

  ctx.clearRect(0, 0, w, h);
  ctx.font = '12px system-ui, sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ticks.forEach((t) => {
    const y = yOf(t);
    ctx.strokeStyle = GRID;
    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(w - padR, y); ctx.stroke();
    ctx.fillStyle = MUTED;
    ctx.fillText(String(t), padL - 8, y);
  });
  // Zero line, heavier.
  if (min < 0 && max > 0) {
    ctx.strokeStyle = '#9aa8a4';
    ctx.beginPath(); ctx.moveTo(padL, yOf(0)); ctx.lineTo(w - padR, yOf(0)); ctx.stroke();
  }
  // X labels.
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillStyle = MUTED;
  points.forEach((p, i) => {
    ctx.fillText(String(p[0]), xOf(i), h - padB + 8);
  });

  const slot = plotW / points.length;
  const barW = Math.min(46, slot * 0.62);
  points.forEach((p, i) => {
    const v = p[1];
    const x = xOf(i);
    const y = yOf(v);
    const base = yOf(Math.max(0, min));
    if (type === 'bar') {
      ctx.fillStyle = v < 0 ? '#b3372f' : (i === points.length - 1 ? AMBER : TEAL);
      const top = Math.min(y, base);
      const height = Math.abs(base - y);
      ctx.beginPath();
      ctx.roundRect(x - barW / 2, top, barW, Math.max(1, height), 3);
      ctx.fill();
    }
    ctx.fillStyle = TEAL_DARK;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.font = 'bold 12px system-ui, sans-serif';
    const labelY = v < 0 ? Math.min(yOf(0), y) + 16 : y - 4;
    ctx.fillText(series.format(v), x, type === 'bar' ? labelY : y - 8);
    ctx.font = '12px system-ui, sans-serif';
  });

  if (type === 'line') {
    ctx.strokeStyle = TEAL;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    points.forEach((p, i) => {
      const x = xOf(i); const y = yOf(p[1]);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.lineWidth = 1;
    points.forEach((p, i) => {
      ctx.fillStyle = i === points.length - 1 ? AMBER : TEAL;
      ctx.beginPath(); ctx.arc(xOf(i), yOf(p[1]), 4.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(xOf(i), yOf(p[1]), 2, 0, Math.PI * 2); ctx.fill();
    });
  }

  // Hover tooltip: nearest year under the pointer.
  const tip = canvas.parentElement ? canvas.parentElement.querySelector('.chart-tip') : null;
  if (tip) {
    canvas.onmousemove = (ev) => {
      const rect = canvas.getBoundingClientRect();
      const mx = ev.clientX - rect.left;
      let best = 0; let bestD = Infinity;
      points.forEach((p, i) => {
        const d = Math.abs(xOf(i) - mx);
        if (d < bestD) { bestD = d; best = i; }
      });
      const p = points[best];
      tip.textContent = `${p[0]}: ${series.format(p[1])}`;
      tip.style.display = 'block';
      tip.style.left = `${xOf(best)}px`;
      tip.style.top = `${yOf(p[1])}px`;
    };
    canvas.onmouseleave = () => { tip.style.display = 'none'; };
  }
}

// A horizontal share bar (used for age groups and island shares).
export function drawShareBar(container, rows, opts = {}) {
  const max = Math.max(...rows.map((r) => r.share));
  container.innerHTML = rows.map((r) => {
    const pct = ((r.share / max) * 100).toFixed(1);
    const color = opts.amber && r.share === max ? AMBER : TEAL;
    return `<div class="share-row" style="margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;gap:10px;font-weight:700">
        <span>${r.name}</span><span>${r.share.toFixed(1)}%</span></div>
      <div style="background:#e8efed;border-radius:6px;height:14px;margin-top:4px;overflow:hidden">
        <div style="width:${pct}%;height:100%;background:${color};border-radius:6px"></div></div>
      ${r.note ? `<div style="font-size:13.5px;color:#5b6b68">${r.note}</div>` : ''}
    </div>`;
  }).join('');
}
