/* Pronunciation respelling: a rough English guide to Indian pronunciation. */
export function respell(part) {
  const s = part.normalize('NFC').toLowerCase().replace(/ṁ/g, 'ṃ');
  const vow = ['ai', 'au', 'ā', 'ī', 'ū', 'ṝ', 'ṛ', 'a', 'i', 'u', 'e', 'o'];
  const con = ['kh', 'gh', 'ch', 'jh', 'ṭh', 'ḍh', 'th', 'dh', 'ph', 'bh', 'k', 'g', 'ṅ', 'c', 'j', 'ñ', 'ṭ', 'ḍ', 'ṇ', 't', 'd', 'n', 'p', 'b', 'm', 'y', 'r', 'l', 'v', 'ś', 'ṣ', 's', 'h'];
  const toks = []; let i = 0;
  while (i < s.length) {
    const two = s.slice(i, i + 2), one = s[i];
    if (one === 'ṃ') { toks.push({t: 'M'}); i++; continue; }
    if (one === 'ḥ') { toks.push({t: 'H'}); i++; continue; }
    const v = vow.find(x => s.startsWith(x, i));
    if (v) { toks.push({t: 'V', s: v}); i += v.length; continue; }
    const c = con.find(x => s.startsWith(x, i));
    if (c) { toks.push({t: 'C', s: c}); i += c.length; continue; }
    i++;
  }
  const cons = {kh: 'kh', gh: 'gh', ch: 'chh', jh: 'jh', 'ṭh': 'th', 'ḍh': 'dh', th: 'th', dh: 'dh', ph: 'ph', bh: 'bh', ṅ: 'ng', c: 'ch', ñ: 'ny', 'ṭ': 't', 'ḍ': 'd', 'ṇ': 'n', 'ś': 'sh', 'ṣ': 'sh'};
  const codaCons = {ṅ: 'ng', ñ: 'n'};
  const cr = (c, coda) => (coda && codaCons[c]) || cons[c] || c;
  const open = {ai: 'eye', au: 'ow', 'ā': 'ah', 'ī': 'ee', 'ū': 'oo', 'ṝ': 'ree', 'ṛ': 'ri', a: 'uh', i: 'ih', u: 'oo', e: 'ay', o: 'oh'};
  const closed = Object.assign({}, open, {a: 'u', i: 'i'});
  const echo = {a: 'huh', 'ā': 'hah', i: 'hih', 'ī': 'hee', u: 'hoo', 'ū': 'hoo', e: 'hay', o: 'hoh', ai: 'heye', au: 'how', 'ṛ': 'hri', 'ṝ': 'hree'};
  const stops = ['k', 'kh', 'g', 'gh', 'c', 'ch', 'j', 'jh', 'ṭ', 'ṭh', 'ḍ', 'ḍh', 't', 'th', 'd', 'dh', 'p', 'ph', 'b', 'bh'];
  const sylls = []; let onset = []; let k = 0;
  while (k < toks.length) {
    if (toks[k].t === 'C') { onset.push(toks[k].s); k++; continue; }
    if (toks[k].t !== 'V') { k++; continue; }
    const syl = {on: onset, v: toks[k].s, coda: [], m: false, h: false}; onset = []; k++;
    while (k < toks.length && (toks[k].t === 'M' || toks[k].t === 'H')) { if (toks[k].t === 'M') syl.m = true; else syl.h = true; k++; }
    const cl = []; while (k < toks.length && toks[k].t === 'C') { cl.push(toks[k].s); k++; }
    const atEnd = k >= toks.length;
    if (atEnd) syl.coda = cl;
    else if (cl.length === 1) onset = cl;
    else if (cl.length === 2 && stops.includes(cl[0]) && ['r', 'y', 'v', 'l'].includes(cl[1])) onset = cl;
    else if (cl.length >= 2) { syl.coda = [cl[0]]; onset = cl.slice(1); }
    sylls.push(syl);
  }
  const out = sylls.map(sy => {
    const closedSyl = sy.coda.length > 0 || sy.m;
    let t = sy.on.map(c => cr(c, false)).join('') + (closedSyl ? closed[sy.v] : open[sy.v]);
    t += sy.coda.map(c => cr(c, true)).join('');
    if (sy.m) t += 'm';
    if (sy.h) t += '-' + (echo[sy.v] || 'huh');
    return t;
  });
  if (onset.length && out.length) out[out.length - 1] += onset.map(c => cr(c, true)).join('');
  return out.join('-').replace(/chchh/g, 'chh');
}
export const pronWord = w => w.split('-').map(respell).join(' ');
export const pronText = sk => sk.split(' ').map(pronWord).join('  ');

/* Marks the sounds that are held longer: long vowels (ā ī ū ṝ, and e o ai au, which are always long)
   and doubled consonants (tt, cch, ddh…). Returns HTML; esc escapes plain text. */
const GEMINATE = /^([kgcjṭḍtdpbnṇmlvśṣs])\1h?/;
const LONG_VOWEL = /^(ai|au|[āīūṝeo])/;
export function lengthHTML(part, esc) {
  const s = part.normalize('NFC');
  let out = '', i = 0;
  while (i < s.length) {
    const rest = s.slice(i).toLowerCase();
    const g = rest.match(GEMINATE);
    if (g) { out += '<span class="gem">' + esc(s.slice(i, i + g[0].length)) + '</span>'; i += g[0].length; continue; }
    const m = rest.match(LONG_VOWEL);
    if (m) { out += '<span class="long">' + esc(s.slice(i, i + m[0].length)) + '</span>'; i += m[0].length; continue; }
    out += esc(s[i]); i++;
  }
  return out;
}
