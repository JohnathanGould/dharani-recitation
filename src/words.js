/* Decks for the word learner.
   Building blocks: the roots and words the dhāraṇī is built from, each with a pattern that finds it
   inside the word parts of the text. Words in the text: every glossed word part of the document. */
import {DOC, GLOSS, keyOf} from './data.js';

const BLOCKS = [
  ['mahā', 'great', /^mahā/],
  ['sarva', 'all, every', /^sarv/],
  ['ārya', 'noble', /^āry/, 'ārya + avalokita merge into āryāvalokita.'],
  ['avalokita', 'looking down (on the world)', /valokit/, 'Written -valokita after ārya, whose a merges with it.'],
  ['īśvara', 'lord', /[eī]śvar/, 'After a, a + ī becomes e, so it is written -eśvara.'],
  ['bodhi', 'awakening', /^bodhi/],
  ['sattva', 'being', /sattv/],
  ['kāruṇika', 'compassionate', /^(mahā)?k[āa]ruṇik/],
  ['namo / namaḥ', 'homage', /^nam(o|a|as)$/],
  ['svāhā', 'hail! (closes an offering)', /^svāhā$/],
  ['siddha', 'accomplished, perfected', /^(mahā|sarva)?sid{1,2}h/],
  ['nīla', 'blue', /^nīla/],
  ['kaṇṭha', 'throat', /kaṇṭh/],
  ['padma', 'lotus', /padma/],
  ['hasta', 'hand', /^hast/],
  ['mukha', 'face', /mukh/],
  ['siṃha', 'lion', /siṃha/],
  ['varāha', 'boar', /varāha/],
  ['kṛṣṇa', 'black, dark', /^kṛṣṇa/],
  ['sarpa', 'serpent', /^sarpa$/],
  ['viṣa', 'poison', /^viṣa$/],
  ['kara', 'doer, maker', /^karāya$/, 'karāya means "to the one who does".'],
  ['vidyā', 'knowledge, spell', /vidy/],
  ['dhara', 'holding, bearer', /dhar[aāe]/],
  ['yoga', 'yoga, discipline', /yog/],
  ['loka', 'world', /^lok(asya|eśvar|ātikrānt)/],
  ['hṛdaya', 'heart, essence', /^hṛdaya/],
  ['ratna', 'jewel', /^ratna$/],
  ['traya', 'three, triad', /^tray/],
  ['bhava', 'existence, becoming', /^bhava$/],
  ['bhaya', 'fear', /^bhaye/],
  ['mṛtyu', 'death', /^mṛtyu$/],
  ['vināśana', 'destroying', /^vināśana$/],
  ['bhagavat', 'blessed one', /^bhagava/],
  ['tathāgata', 'thus-gone one (a buddha)', /^tathāgat/],
  ['vīrya', 'heroic energy', /vīry/],
  ['jina', 'conqueror', /^jin/],
  ['darśana', 'seeing, vision', /^darśan/],
  ['maitra / maitrī', 'kindness, friendliness', /^maitr/],
  ['citta', 'mind', /^citta$/],
  ['manaḥ', 'mind', /^manaḥ$/],
  ['mantra', 'sacred formula', /^mantra$/],
  ['vāma', 'left', /^vāma$/],
  ['sthita', 'standing', /^sthita$/],
  ['he', 'O! (calling out)', /^he$/],
  ['ehi', 'come!', /^ehi$|^ehyehi$/],
  ['hare', 'O Hari', /^hare$/],
  ['kuru', 'do!', /^kuru$/],
  ['sādhaya', 'accomplish!', /^sādhaya$/],
  ['smara', 'remember!', /^smara/],
  ['cala', 'move!', /^(mahā)?cala$/],
  ['bala', 'strength', /^(mahā)?bala$/],
  ['hasa', 'laugh!', /^hasa$/],
  ['muñca', 'release!', /^muñca$/]
];

const partsOf = sk => sk.split(/\s+/).flatMap(w => w.split('-')).filter(Boolean);
const norm = p => p.normalize('NFC').toLowerCase();

/* Verses a card appears in, with the matching word parts. */
function occurrences(test) {
  const out = [];
  DOC.forEach(v => { const hits = partsOf(v.sk).filter(p => test(norm(p))); if (hits.length) out.push({id: v.id, hits}); });
  return out;
}

export const DECKS = {
  blocks: {label: 'Building blocks', cards: BLOCKS.map(([w, en, re, note]) => ({key: 'b:' + w, sk: w, en, note, seen: occurrences(p => re.test(p))}))},
  text: {label: 'Words in the text', cards: (() => {
    const by = {};
    DOC.forEach(v => partsOf(v.sk).forEach(p => {
      const k = keyOf(p), en = GLOSS[k];
      // Sound syllables and obscure words make poor quiz cards.
      if (!en || /^\(|sound syllable|obscure|unclear/.test(en)) return;
      (by[k] = by[k] || {key: 'w:' + k, sk: p, en, seen: []});
      const last = by[k].seen[by[k].seen.length - 1];
      if (last && last.id === v.id) last.hits.push(p); else by[k].seen.push({id: v.id, hits: [p]});
    }));
    return Object.values(by).sort((a, b) => b.seen.length - a.seen.length || DOC.findIndex(v => v.id === a.seen[0].id) - DOC.findIndex(v => v.id === b.seen[0].id));
  })()}
};
