/* Which words of each verse's English translate each Sanskrit word.
   One entry per word part of the verse, in order (words are split at spaces and hyphens).
   An entry is a phrase of the English, a list of phrases, or null when the English leaves the word out.
   Phrases match whole words; "O#2" means the second "O". */
export const ALIGN = {
  1: ['Homage', 'Jewels', 'to the Three'],
  2: ['Homage', 'to the noble Avalokiteśvara', 'the bodhisattva'],
  3: ['the great being', 'the greatly compassionate one'],
  4: ['all', 'bonds', 'cuts through', 'To the one who'],
  5: ['all', 'existence', 'the ocean', 'dries up', 'To the one who'],
  6: ['all', 'illness', 'calms', 'To the one who'],
  7: ['all', 'of death', 'the dangers and calamities', 'destroys', 'To the one who'],
  8: ['every', 'fear', 'protects from', 'To the one who'],
  9: [null, 'homage', 'Having paid', 'this'],
  10: ['by Avalokiteśvara', 'spoken', 'Nīlakaṇṭha ("Blue-Throated")', 'also', 'named', 'the heart [dhāraṇī]'],
  11: ['I shall recite it', 'every aim', 'accomplishing', 'auspicious'],
  12: ['unconquerable', 'all', 'beings', 'of existence', 'the path', 'purifying'],
  13: ['Thus', 'Oṃ!', 'O light', 'O one whose mind is light', 'O one who has gone beyond the world'],
  14: ['O', 'Hari', 'noble Avalokiteśvara', 'great bodhisattva'],
  15: ['O', 'bodhisattva', 'O#2', 'great bodhisattva'],
  16: ['O', 'heroic', 'bodhisattva', 'O#2', 'greatly compassionate one', 'remember', 'the heart [dhāraṇī]'],
  17: ['Hi', 'hi', 'O Hari', 'noble Avalokiteśvara', 'great lord', 'supremely', 'kind', 'whose mind', 'O greatly compassionate one'],
  18: ['Do', 'do', 'the work'],
  19: ['Accomplish', 'accomplish', 'the spell (vidyā)'],
  20: ['Dhuru', 'dhuru', 'vīryanti', 'mahāvīryanti'],
  21: ['Hold', 'hold', 'O lord of the earth-bearers'],
  22: ['Move', 'move', 'pure', 'stainless', ['O', 'embodiment']],
  23: ['Noble Avalokiteśvara', 'conqueror (jina)', 'dark', 'matted hair', 'crowned', null],
  24: ['do not', 'delay', 'O great accomplished one', 'holder of knowledge'],
  25: ['Boon', 'boon', 'great boon'],
  26: ['Strength', 'strength', 'great strength'],
  27: ['Move', 'move', 'great mover'],
  28: ['dark', 'hued one', 'nigha', 'dark#2', 'side', 'destroyer'],
  29: ['O', 'lotus', 'handed one', 'roam', 'roam#2', 'the lands', 'lord of those who roam'],
  30: ['black', 'serpent', 'made from', 'O one wearing the sacred thread'],
  31: ['Come, come', 'great boar', 'faced one'],
  32: ['the three cities', 'Lord who burns', 'Nārāyaṇa', 'form', 'excellent', 'path', 'enemy'],
  33: ['O', 'Blue-Throated one', 'O#2', 'great doer'],
  34: ['Hala', 'hala', 'poison', 'conquered', 'of the world'],
  35: ['craving', 'the poison', 'Destroy'],
  36: ['aversion', 'the poison', 'Destroy'],
  37: ['delusion', 'the poison', 'Destroy'],
  38: ['Huru', 'huru', 'māla'],
  39: ['Huru', 'huru', 'O Hari', 'O great lotus-naveled one'],
  40: ['Flow', 'flow', 'auspicious radiance', 'auspicious radiance'],
  41: [['Suru', 'flow'], ['suru', 'flow#2'], 'bhūru', 'bhūru#2'],
  42: ['Awaken', 'awaken', 'cause to awaken', 'cause to awaken#2'],
  43: ['kind', 'Blue-Throated one', 'come'],
  44: ['the left', 'standing', 'lion', 'faced one'],
  45: ['Laugh', 'laugh', 'release', 'release#2'],
  46: ['Great laughter', 'come', '[pa]', 'great accomplished', 'lord of yogis'],
  47: ['Speak', 'speak', 'the words'],
  48: ['Accomplish', 'accomplish', 'the spell (vidyā)'],
  49: ['Remember', 'remember', 'the Blessed One', 'is seen', 'the one who sees', 'the Lord of the World', 'the Thus-Gone One'],
  50: ['Grant', 'me', 'to see you', 'who longs', 'a vision of you'],
  51: ['Gladden', 'my mind', 'Svāhā!'],
  52: ['To the Accomplished One', 'Svāhā!'],
  53: ['To the Greatly Accomplished One', 'Svāhā!'],
  54: ['To the Accomplished Lord of Yoga', 'Svāhā!'],
  55: ['To the Blue-Throated One', 'Svāhā!'],
  56: ['To the Boar-Faced One', 'Svāhā!'],
  57: ['Great', 'Lion-Faced One', 'Svāhā!'],
  58: ['To the Accomplished Bearer of Sacred Knowledge', 'Svāhā!'],
  59: ['To the Lotus-Handed One', 'Svāhā!'],
  60: ['dark', 'serpent', 'made from', 'To the one wearing the sacred thread', 'Svāhā!'],
  61: ['To the great bearer of the lakūṭa', 'Svāhā!'],
  62: ['To the one armed with the wheel (cakra)', 'Svāhā!'],
  63: ['the conch', 'the sound', 'To the one who awakens', 'Svāhā!'],
  64: ['left', 'shoulder', null, 'To the one at', 'black', ['[clad in]', 'skin'], 'Svāhā!'],
  65: ['tiger', 'skin', 'To the one clothed in', 'Svāhā!'],
  66: ['To the Lord of the World', 'Svāhā!'],
  67: ['To the Lord of all the Accomplished', 'Svāhā!'],
  68: ['Homage', 'to the Blessed', 'Avalokiteśvara', 'the bodhisattva'],
  69: ['the great being', 'the greatly compassionate one'],
  70: [['May', 'be accomplished'], null, 'this mantra', 'the words', 'Svāhā!']
};

/* Finds the n-th whole-word occurrence of phrase in text. Returns [start, end] or null. */
function find(text, phrase) {
  const m = phrase.match(/^(.*)#(\d+)$/), want = m ? +m[2] : 1, p = m ? m[1] : phrase;
  const isL = c => !!c && /\p{L}/u.test(c);
  let from = 0, seen = 0;
  for (;;) {
    const i = text.indexOf(p, from);
    if (i < 0) return null;
    if (!isL(text[i - 1]) && !isL(text[i + p.length]) && ++seen === want) return [i, i + p.length];
    from = i + 1;
  }
}

/* For each word part, the ranges of the English it translates. */
export function spans(id, en) {
  return (ALIGN[id] || []).map(e => e == null ? [] : (Array.isArray(e) ? e : [e]).map(ph => find(en, ph)).filter(Boolean));
}
