/* IAST to Devanagari, so a Hindi (or Sanskrit) speech voice can read the text. */
const VOWELS = {a: ['अ', ''], 'ā': ['आ', 'ा'], i: ['इ', 'ि'], 'ī': ['ई', 'ी'], u: ['उ', 'ु'], 'ū': ['ऊ', 'ू'], 'ṛ': ['ऋ', 'ृ'], 'ṝ': ['ॠ', 'ॄ'], 'ḷ': ['ऌ', 'ॢ'],
  e: ['ए', 'े'], ai: ['ऐ', 'ै'], o: ['ओ', 'ो'], au: ['औ', 'ौ']};
const CONS = {k: 'क', kh: 'ख', g: 'ग', gh: 'घ', 'ṅ': 'ङ', c: 'च', ch: 'छ', j: 'ज', jh: 'झ', 'ñ': 'ञ', 'ṭ': 'ट', 'ṭh': 'ठ', 'ḍ': 'ड', 'ḍh': 'ढ', 'ṇ': 'ण',
  t: 'त', th: 'थ', d: 'द', dh: 'ध', n: 'न', p: 'प', ph: 'फ', b: 'ब', bh: 'भ', m: 'म', y: 'य', r: 'र', l: 'ल', v: 'व', 'ś': 'श', 'ṣ': 'ष', s: 'स', h: 'ह'};
const VIRAMA = '्';

function word(w) {
  const s = w.normalize('NFC').toLowerCase().replace(/-/g, '');
  let out = '', i = 0, afterCons = false;
  while (i < s.length) {
    const two = s.slice(i, i + 2), one = s[i];
    const v = VOWELS[two] && two.length === 2 ? two : VOWELS[one] ? one : null;
    if (v) { out += afterCons ? VOWELS[v][1] : VOWELS[v][0]; afterCons = false; i += v.length; continue; }
    const c = CONS[two] && two.length === 2 ? two : CONS[one] ? one : null;
    if (c) { if (afterCons) out += VIRAMA; out += CONS[c]; afterCons = true; i += c.length; continue; }
    if (afterCons) { out += VIRAMA; afterCons = false; }
    if (one === 'ṃ' || one === 'ṁ') out += 'ं';
    else if (one === 'ḥ') out += 'ः';
    else if (one === "'") out += 'ऽ';
    i++;
  }
  if (afterCons) out += VIRAMA;
  return out;
}
export const toDeva = text => text.split(/\s+/).filter(Boolean).map(word).join(' ');

/* The same text split into syllables, joined by hyphens (सर्-व for sarva). A Hindi voice drops a short a at
   the end of a word and often in the middle (sarva as "sarv", praśamana as "prashman"); read syllable by
   syllable, every vowel is kept. Syllables split as in the respelling: one consonant between vowels starts
   the next syllable, a stop plus r, y, v or l starts it together, and otherwise the first consonant closes
   the syllable before. */
const V_RE = /^(ai|au|[aāiīuūṛṝḷeo])/, C_RE = /^(kh|gh|ch|jh|ṭh|ḍh|th|dh|ph|bh|[kgṅcjñṭḍṇtdnpbmyrlvśṣsh])/;
const STOPS = new Set(['k', 'kh', 'g', 'gh', 'c', 'ch', 'j', 'jh', 'ṭ', 'ṭh', 'ḍ', 'ḍh', 't', 'th', 'd', 'dh', 'p', 'ph', 'b', 'bh']);
function syllables(w) {
  const s = w.normalize('NFC').toLowerCase().replace(/-/g, '').replace(/ṁ/g, 'ṃ');
  const toks = []; let i = 0;
  while (i < s.length) {
    const r = s.slice(i), v = r.match(V_RE), c = !v && r.match(C_RE);
    if (v) { toks.push({t: 'V', s: v[0]}); i += v[0].length; }
    else if (c) { toks.push({t: 'C', s: c[0]}); i += c[0].length; }
    else { if (s[i] === 'ṃ' || s[i] === 'ḥ') toks.push({t: 'X', s: s[i]}); i++; }
  }
  const out = []; let onset = [], k = 0;
  while (k < toks.length) {
    if (toks[k].t === 'C') { onset.push(toks[k].s); k++; continue; }
    if (toks[k].t !== 'V') { if (out.length) out[out.length - 1] += toks[k].s; k++; continue; }
    let syl = onset.join('') + toks[k].s; onset = []; k++;
    while (k < toks.length && toks[k].t === 'X') syl += toks[k++].s;
    const cl = []; while (k < toks.length && toks[k].t === 'C') cl.push(toks[k++].s);
    if (k >= toks.length) syl += cl.join('');
    else if (cl.length === 1) onset = cl;
    else if (cl.length === 2 && STOPS.has(cl[0]) && 'ryvl'.includes(cl[1])) onset = cl;
    else if (cl.length >= 2) { syl += cl[0]; onset = cl.slice(1); }
    out.push(syl);
  }
  if (onset.length && out.length) out[out.length - 1] += onset.join('');
  return out;
}
export const toDevaSyllables = text => text.split(/\s+/).filter(Boolean).map(w => syllables(w).map(word).join('-')).join(' ');
