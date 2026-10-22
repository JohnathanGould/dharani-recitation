/* Matching a typed answer against the text, lenient to diacritics and common respellings. */
export function fold(s, strict) {
  if (strict) return s.normalize('NFC').toLowerCase().replace(/[^\p{L}\p{M}]/gu, '');
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().split(/[^a-z]+/).filter(Boolean)
    .map(t => t.replace(/ee/g, 'i').replace(/oo/g, 'u').replace(/([a-z])\1+/g, '$1')
      .replace(/sh/g, 's').replace(/ch/g, 'c').replace(/ri/g, 'r').replace(/w/g, 'v')).join('');
}
export function lev(a, b) {
  const m = a.length, n = b.length;
  if (!m) return n; if (!n) return m;
  let prev = Array.from({length: n + 1}, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[n];
}
function matchAt(u, f, p) {
  let best = {d: 1e9, len: f.length, off: 0};
  for (let off = 0; off <= 2; off++) {
    for (let len = Math.max(1, f.length - 1); len <= f.length + 1; len++) {
      const d = lev(u.slice(p + off, p + off + len), f);
      if (d < best.d) best = {d, len, off};
    }
  }
  return best;
}
function walk(u, fs, start) {
  let pos = start, cost = 0; const marks = [];
  for (let i = 0; i < fs.length; i++) {
    const f = fs[i], b = matchAt(u, f, pos), tol = Math.max(1, Math.floor(f.length * 0.25));
    if (b.d === 0) { marks.push('ok'); pos += b.off + b.len; cost += b.off; }
    else if (b.d <= tol) { marks.push('close'); pos += b.off + b.len; cost += b.d + b.off; }
    else {
      let skipped = false;
      const nx = fs[i + 1];
      if (nx) { const nb = matchAt(u, nx, pos); if (nb.d <= Math.floor(nx.length * 0.25)) skipped = true; }
      marks.push('miss'); cost += f.length;
      if (!skipped) pos += Math.min(f.length, Math.max(0, u.length - pos));
    }
  }
  return {marks, pos, cost};
}
/* groups: one entry per verse; each entry is a list of candidate readings; each reading is a list of word parts */
export function gradeSeq(raw, groups, strict) {
  const u = fold(raw, strict);
  let pos = 0, all = ''; const picks = [];
  for (const g of groups) {
    let best = null;
    g.forEach((cand, ci) => {
      const fs = cand.map(p => fold(p, strict));
      const r = walk(u, fs, pos);
      if (!best || r.cost < best.cost) best = {ci, fs, marks: r.marks, pos: r.pos, cost: r.cost};
    });
    picks.push({ci: best.ci, marks: best.marks});
    pos = best.pos; all += best.fs.join('');
  }
  const sim = all.length ? Math.max(0, 1 - lev(u, all) / Math.max(all.length, u.length)) : 0;
  return {picks, exact: u.length > 0 && u === all, sim};
}
