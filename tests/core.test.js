import {test} from 'node:test';
import assert from 'node:assert/strict';
import {DOC} from '../src/data.js';
import {gradeSeq} from '../src/grade.js';
import {pronText, lengthHTML} from '../src/pron.js';

const parts = sk => sk.split(/\s+/).flatMap(w => w.split('-')).filter(Boolean);
const one = v => [[v.sk].concat(v.alts || []).map(parts)];
const esc = s => s;

test('the text has 70 verses with unique ids', () => {
  assert.equal(DOC.length, 70);
  assert.deepEqual(DOC.map(v => v.id), DOC.map((_, i) => i + 1));
});

test('typing a verse exactly is perfect, with or without diacritics', () => {
  const v = DOC[1];
  assert.equal(gradeSeq(v.sk, one(v), true).exact, true);
  assert.equal(gradeSeq('nama aryavalokitesvaraya bodhisattvaya', one(v), false).exact, true);
});

test('common respellings are accepted in lenient mode', () => {
  const v = DOC[4]; // sarva bhava samudraṃ śoṣaṇa-karāya
  assert.equal(gradeSeq('sarva bhava samoodram shoshana karaya', one(v), false).exact, true);
});

test('only the reading in the document is accepted', () => {
  const v = DOC[6]; // sarva mṛtyu upadrava vināśana-karāya
  assert.equal(gradeSeq('sarva mrtyu upadrava vinasana karaya', one(v), false).exact, true);
  assert.equal(gradeSeq('sarv ety upadrava vinasana karaya', one(v), false).exact, false);
});

test('a missing word is marked as missed', () => {
  const v = DOC[3]; // sarva bandhana chedana-karāya
  const r = gradeSeq('sarva chedana karaya', one(v), false);
  assert.equal(r.exact, false);
  assert.deepEqual(r.picks[0].marks, ['ok', 'miss', 'ok', 'ok']);
});

test('pronunciation respelling', () => {
  assert.equal(pronText('namo ratna-trayāya'), 'nuh-moh  rut-nuh truh-yah-yuh');
});

test('long sounds are marked', () => {
  assert.equal(lengthHTML('karāya', esc), 'kar<span class="long">ā</span>ya');
  assert.equal(lengthHTML('sattva', esc), 'sa<span class="gem">tt</span>va');
  assert.equal(lengthHTML('cchedana', esc), '<span class="gem">cch</span><span class="long">e</span>dana');
  assert.equal(lengthHTML('maitrī', esc), 'm<span class="long">ai</span>tr<span class="long">ī</span>');
});

test('every word card is found somewhere in the text', async () => {
  const {DECKS} = await import('../src/words.js');
  for (const d of Object.values(DECKS)) for (const c of d.cards) assert.ok(c.seen.length > 0, c.sk + ' is not found in any verse');
  assert.ok(DECKS.blocks.cards.find(c => c.sk === 'mahā').seen.length >= 10);
});

test('every Sanskrit word is aligned to phrases that exist in its English', async () => {
  const {ALIGN, spans} = await import('../src/align.js');
  for (const v of DOC) {
    const a = ALIGN[v.id];
    assert.ok(a, 'verse ' + v.id + ' has no alignment');
    assert.equal(a.length, parts(v.sk).length, 'verse ' + v.id + ': one entry per word part');
    const s = spans(v.id, v.en);
    a.forEach((e, i) => {
      const want = e == null ? 0 : Array.isArray(e) ? e.length : 1;
      assert.equal(s[i].length, want, 'verse ' + v.id + ', ' + parts(v.sk)[i] + ': phrase not found in "' + v.en + '"');
    });
  }
  const v7 = DOC[6], s7 = spans(7, v7.en);
  assert.equal(v7.en.slice(...s7[0][0]), 'all');
});
