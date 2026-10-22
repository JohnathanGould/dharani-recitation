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
