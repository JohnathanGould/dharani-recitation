import {SECTIONS, DOC, STUDY, GLOSS, keyOf} from './data.js';
import {pronWord, pronText, lengthHTML} from './pron.js';
import {fold, gradeSeq} from './grade.js';
import * as store from './store.js';
import * as rec from './recorder.js';
import {DECKS} from './words.js';

const {DAY, INTERVALS, levelOf} = store;
const V = DOC;
const S = () => store.S;

/* ---------- Helpers on verses ---------- */
const byId = id => V.find(v => v.id === id);
const partsOf = sk => sk.split(/\s+/).flatMap(w => w.split('-')).filter(Boolean);
const readings = v => [{text: v.sk, label: 'document'}].concat((v.alts || []).map(t => ({text: t, label: 'variant'})));
const $ = sel => document.querySelector(sel);
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
const hy = t => esc(t).replace(/-/g, '<span class="hy">-</span>');
function marked(sk, marks, len) {
  let k = 0;
  return sk.split(' ').map(w => '<span class="w">' + w.split('-').map(p =>
    '<span class="p ' + (marks ? marks[k++] : '') + '">' + (len ? lengthHTML(p, esc) : esc(p)) + '</span>').join('<span class="hy">-</span>') + '</span>').join(' ');
}
const levelLabel = {new: 'New', learning: 'Learning', known: 'Known'};

/* Lines that repeat word for word, and lines that start the same way. */
const REPEATS = {}, SAME_START = {};
const start2 = v => v.sk.split(' ').slice(0, 2).join(' ');
V.forEach(v => V.forEach(w => {
  if (w.id === v.id) return;
  if (w.sk === v.sk) (REPEATS[v.id] = REPEATS[v.id] || []).push(w.id);
  else if (start2(w) === start2(v) && v.sk.split(' ').length > 2 && w.sk.split(' ').length > 2) (SAME_START[v.id] = SAME_START[v.id] || []).push(w.id);
}));
/* The svāhā offerings call back to epithets from the mantra. */
const ECHOES = {53: [24, 46], 54: [46], 55: [33, 43], 56: [31], 57: [44], 58: [24], 59: [29], 60: [30], 64: [44], 66: [49]};

/* The verses that come before v, enough of them that the cue points to only one place in the text. */
function contextFor(v) {
  const key = (id, k) => V.slice(id - 1 - k, id - 1).map(x => x.sk).join('|');
  for (let k = 1; k <= 3; k++) {
    if (v.id - 1 - k < 0) return V.slice(0, v.id - 1);
    const mine = key(v.id, k);
    if (!V.some(w => w.id !== v.id && w.id - 1 - k >= 0 && key(w.id, k) === mine)) return V.slice(v.id - 1 - k, v.id - 1);
  }
  return V.slice(Math.max(0, v.id - 4), v.id - 1);
}
function repeatNote(v) {
  const r = REPEATS[v.id], s = SAME_START[v.id];
  const around = id => { const p = byId(id - 1), n = byId(id + 1); return (p ? 'after <i>' + esc(p.sk) + '</i>' : 'at the start') + (n ? ', before <i>' + esc(n.sk) + '</i>' : ', at the end'); };
  let h = '';
  if (r) h += '<p class="rep"><b>Watch out: this line appears again as verse ' + r.join(', ') + '.</b> Here it comes ' + around(v.id) + '. ' +
    r.map(id => 'As verse ' + id + ' it comes ' + around(id) + '.').join(' ') + '</p>';
  if (s) h += '<p class="rep"><b>Starts like verse ' + s.join(', ') + '</b> (<i>' + esc(byId(s[0]).sk) + '</i>). Here it goes on with <i>' + esc(v.sk.split(' ').slice(2).join(' ')) + '</i>.</p>';
  return h;
}
function echoNote(v) {
  const e = ECHOES[v.id]; if (!e) return '';
  return '<p class="echo">Echoes the mantra: ' + e.map(id => '<a href="#learn/' + id + '">verse ' + id + '</a> <i>' + esc(byId(id).sk) + '</i>').join(' · ') + '</p>';
}
function fmtWait(ms) {
  if (ms < 3.6e6) return Math.max(1, Math.round(ms / 6e4)) + ' minutes';
  if (ms < 1.5 * DAY) return Math.round(ms / 3.6e6) + ' hours';
  const d = Math.round(ms / DAY); return d + (d === 1 ? ' day' : ' days');
}
const ago = ms => ms < 6e4 ? 'just now' : fmtWait(ms) + ' ago';
const clock = ms => { const s = Math.floor(ms / 1000); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
function hintText(v, level) {
  if (!level) return '';
  return v.sk.split(' ').map((w, i) => {
    if (level >= 2 && i % 2 === 0) return w;
    return w.split('-').map(p => { const c = Array.from(p); return c[0] + c.slice(1).map(() => '·').join(''); }).join('-');
  }).join('  ');
}
const verseSelect = (id, val, lo = 1) => '<select class="sel" id="' + id + '" aria-label="' + id + '">' +
  V.filter(v => v.id >= lo).map(v => '<option value="' + v.id + '"' + (v.id === val ? ' selected' : '') + '>Verse ' + v.id + '</option>').join('') + '</select>';
const seg = (act, cur, opts, label) => '<div class="seg" role="group" aria-label="' + label + '">' +
  opts.map(o => '<button data-act="' + act + '" data-v="' + o[0] + '" aria-pressed="' + (cur === o[0]) + '">' + o[1] + '</button>').join('') + '</div>';

/* ---------- Session state ---------- */
let tab = 'learn';
const P = {active: false, queue: [], idx: 0, stage: 'recall', hint: 0, results: [], typed: '', outcome: null, wait: 0, flash: '', drillSaid: null, trShown: false, trText: '', meanings: [], confirmReset: false, confirmClear: false};
const R = {mode: 'chain', from: 1, to: 8, hints: false, phase: 'ready', t0: 0, ms: 0, text: '', result: null, stumbled: new Set(), saved: false};
let timerId = null, lastFx = null;

const KEYS = ['ā', 'ī', 'ū', 'ṛ', 'ṝ', 'ḷ', 'ṃ', 'ḥ', 'ś', 'ṣ', 'ṇ', 'ṭ', 'ḍ', 'ñ', 'ṅ'];
const keypad = target => '<div class="keypad" role="group" aria-label="Sanskrit letters">' + KEYS.map(k => '<button type="button" class="chip key" data-act="ins" data-t="' + target + '" data-ch="' + k + '" lang="sa-Latn" aria-label="Insert ' + k + '">' + k + '</button>').join('') + '<button type="button" class="chip key" data-act="ins" data-t="' + target + '" data-ch="-" aria-label="Insert hyphen">-</button></div>';

function recBar(key, label) {
  if (!rec.canRecord) return '';
  const on = rec.recording() === key, url = rec.take(key);
  return '<div class="recbar">' + (on
    ? '<button class="btn" data-act="rec-stop"><span class="dot"></span>Stop recording</button>'
    : '<button class="btn" data-act="rec-start" data-k="' + esc(key) + '">● ' + (url ? 'Record again' : (label || 'Record yourself')) + '</button>') +
    (url && !on ? '<audio controls preload="metadata" src="' + url + '"></audio>' : '') + '</div>';
}

/* ---------- Header ---------- */
function renderMeter() {
  const known = V.filter(v => levelOf(v.id) === 'known').length, s = store.streak();
  $('#meter').innerHTML = '<div class="strip" role="img" aria-label="' + known + ' of ' + V.length + ' verses known">' +
    V.map(v => '<i data-level="' + levelOf(v.id) + '"></i>').join('') + '</div>' +
    '<div>' + known + ' of ' + V.length + ' verses known' + (s ? ' · ' + s + '-day streak' : '') + '</div>';
}
function renderTabs() { document.querySelectorAll('.tab').forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === tab))); }

/* ---------- Learn ---------- */
function tilesHTML(sk) {
  return '<div class="tiles">' + sk.split(' ').map(w => {
    const parts = w.split('-');
    const glosses = parts.map(p => ({p, g: GLOSS[keyOf(p)]})).filter(x => x.g);
    const tm = parts.length === 1 ? (glosses[0] ? esc(glosses[0].g) : '') : glosses.map(x => '<i>' + esc(x.p) + '</i> ' + esc(x.g)).join(' · ');
    return '<div class="tile"><b lang="sa-Latn">' + hy(w) + '</b><span class="tp">' + esc(pronWord(w)) + '</span>' + (tm ? '<span class="tm">' + tm + '</span>' : '') + '</div>';
  }).join('') + '</div>';
}
function leafHTML(v, opts) {
  opts = opts || {};
  const lvl = levelOf(v.id), sh = S().show;
  const others = readings(v).slice(1).map(r => '<span lang="sa-Latn">' + hy(r.text) + '</span>');
  return '<article class="leaf" data-level="' + lvl + '" id="line-' + v.id + '">' +
    '<div class="leaf-top"><span>Verse ' + v.id + '</span><span>' + levelLabel[lvl] + (store.meaningLevel(v.id) === 'known' ? ' · can translate' : '') + '</span></div>' +
    '<p class="sk" lang="sa-Latn">' + marked(v.sk, null, sh.len) + '</p>' +
    (sh.pron ? '<p class="pron">' + esc(pronText(v.sk)) + '</p>' : '') +
    (sh.en ? '<p class="en">' + esc(v.en) + '</p>' : '') +
    repeatNote(v) + echoNote(v) +
    (v.lc ? '<p class="note">Translation uncertain: some words here are obscure.</p>' : '') +
    (sh.words ? tilesHTML(v.sk) : '') +
    (v.note ? '<p class="note">' + esc(v.note) + '</p>' : '') +
    (others.length ? '<p class="alt">Also read as: ' + others.join(' · ') + '</p>' : '') +
    (opts.noActions ? '' : recBar('learn-' + v.id, 'Record yourself reading it') +
      '<div class="actions"><button class="btn quiet" data-act="practice-line" data-id="' + v.id + '">Practice this verse</button></div>' +
      '<div class="chips" style="margin:10px 0 0"><span class="small muted">Mark as:</span>' + [['new', 'New'], ['learning', 'Learning'], ['known', 'Known']].map(x => '<button class="chip" data-act="set-level" data-id="' + v.id + '" data-lv="' + x[0] + '" aria-pressed="' + (lvl === x[0]) + '">' + x[1] + '</button>').join('') + '</div>') +
    '</article>';
}
function viewLearn() {
  const chip = (k, label) => '<button class="chip" data-act="toggle-show" data-k="' + k + '" aria-pressed="' + S().show[k] + '">' + label + '</button>';
  let body = '', cur = 0;
  V.forEach(v => { if (v.sec !== cur) { cur = v.sec; body += '<h3 class="sec">' + esc(SECTIONS[cur]) + '</h3>'; } body += leafHTML(v); });
  return '<details class="about"><summary>About this text</summary><p>This is the text from your printed study document, taught exactly as printed. It is the longer version of the Nīlakaṇṭha Dhāraṇī, written in IAST, the scholarly way of spelling Sanskrit with marks such as ā, ś and ṛ. Under many verses you will see where Lokesh Chandra\'s 1988 reconstruction reads differently. Those other readings are accepted when you practice. See the Sources tab.</p></details>' +
    '<div class="chips"><span class="small muted">Show:</span>' + chip('len', 'Long sounds') + chip('pron', 'Pronunciation') + chip('words', 'Word by word') + chip('en', 'English') + '</div>' +
    (S().show.len ? '<p class="small muted" style="margin:-6px 0 14px">Underlined: long vowels, held about twice as long. Dotted: doubled consonants, held one beat. See the Sounds tab.</p>' : '') +
    '<div class="stack">' + body + '</div>';
}

/* ---------- Practice ---------- */
function dueIds() {
  const now = Date.now();
  return V.filter(v => { const st = S().lines[v.id]; return st && st.seen && st.due <= now; }).sort((a, b) => S().lines[a.id].due - S().lines[b.id].due).map(v => v.id);
}
function newIds() {
  const used = S().newToday.date === store.localDate() ? S().newToday.n : 0;
  return V.filter(v => !(S().lines[v.id] && S().lines[v.id].seen)).slice(0, Math.max(0, S().newPerDay - used)).map(v => v.id);
}
function startSession(ids, all) {
  const queue = ids.map(id => ({id, isNew: !(S().lines[id] && S().lines[id].seen) && !all, retry: false}));
  Object.assign(P, {active: true, queue, idx: 0, results: [], flash: '', drillSaid: null, meanings: []});
  setStageForCurrent();
  go('practice');
}
/* Practice this verse: say it aloud and rate yourself, then write it from memory.
   The two count as one review, scheduled by the weaker of the two. */
function startDrill(id) {
  const queue = [{id, mode: 'say', drill: true, retry: false}, {id, mode: 'write', drill: true, retry: false}];
  Object.assign(P, {active: true, queue, idx: 0, results: [], flash: '', drillSaid: null, meanings: []});
  setStageForCurrent();
  go('practice');
}
function setStageForCurrent() { const it = P.queue[P.idx]; P.stage = it && it.isNew ? 'study' : 'recall'; P.hint = 0; P.typed = ''; P.outcome = null; P.trShown = false; P.trText = ''; }

function promptHTML(v) {
  if (S().prompt === 'meaning') return '<p class="prompt-label">Meaning</p><p class="prompt-body">' + esc(v.en) + '</p>';
  const ctx = contextFor(v);
  if (!ctx.length) return '<p class="prompt-label">Cue</p><p class="prompt-body">The very beginning of the dhāraṇī.</p>';
  return '<p class="prompt-label">' + (ctx.length > 1 ? 'The verses before' : 'The verse before') + '</p>' +
    ctx.map((c, i) => '<p class="ctx' + (i === ctx.length - 1 ? ' last' : '') + '" lang="sa-Latn">' + hy(c.sk) + '</p>').join('');
}
function viewPracticeHome() {
  const due = dueIds().length, nw = newIds().length;
  const anySeen = V.some(v => S().lines[v.id] && S().lines[v.id].seen);
  let nextDue = '';
  if (!due && anySeen) nextDue = 'Next review in ' + fmtWait(Math.min.apply(null, V.filter(v => S().lines[v.id] && S().lines[v.id].seen).map(v => S().lines[v.id].due)) - Date.now()) + '.';
  return '<div class="stats"><div class="stat"><b>' + due + '</b><span>Due now</span></div><div class="stat"><b>' + nw + '</b><span>New today</span></div><div class="stat"><b>' + store.streak() + '</b><span>Day streak</span></div></div>' +
    (!anySeen ? '<div class="card"><h2>What do you already know?</h2><p class="muted small" style="margin:0 0 10px">Tell the app so it can test those verses first instead of teaching them again.</p><div class="row"><button class="btn primary" data-act="know">Verses 1 to 7 (what I have memorized)</button><button class="btn" data-act="start-fresh">Start from the beginning</button></div></div>' : '') +
    '<div class="card"><h2>Today\'s session</h2><p class="muted small" style="margin:0 0 12px">' + (due + nw ? 'New verses are shown first, then you recall them from memory. Ones you miss come back at the end.' : (nextDue || 'Nothing is due.')) + '</p>' +
    '<div class="row"><button class="btn primary" data-act="start" ' + (due + nw ? '' : 'disabled style="opacity:.5"') + '>Start session</button><button class="btn" data-act="start-all">Practice everything</button></div></div>' +
    '<div class="card"><h2>How you practice</h2>' +
    '<p class="small muted" style="margin:0 0 6px">Answer by</p>' + seg('answer', S().answer, [['say', 'Saying it aloud'], ['type', 'Typing it']], 'Answer by') +
    '<p class="small muted" style="margin:12px 0 6px">Cue</p>' + seg('prompt', S().prompt, [['prev', 'The verse before'], ['meaning', 'The meaning']], 'Cue') +
    '<p class="muted small" style="margin:10px 0 0;max-width:62ch">Saying it aloud is closest to reciting: you recall the verse, say it, reveal it, and rate yourself. The verse before is the natural cue for a recitation, since each line leads into the next.</p>' +
    '<div class="chips" style="margin:14px 0 6px"><button class="chip" data-act="toggle-translate" aria-pressed="' + S().translate + '">Translate each verse into English</button><button class="chip" data-act="toggle-strict" aria-pressed="' + S().strict + '">Require diacritics when typing (ā, ś, ṛ…)</button></div>' +
    '<div class="row"><span class="small muted">New verses per day</span><select class="sel" id="npd" aria-label="New per day">' + [2, 3, 5, 8].map(n => '<option' + (n === S().newPerDay ? ' selected' : '') + '>' + n + '</option>').join('') + '</select></div></div>' +
    '<div class="card"><h2>Your progress</h2><p class="muted small" style="margin:0 0 12px;max-width:62ch">Progress is saved in this browser on this device. Download a backup now and then, and load it to move your progress to another device.</p>' +
    '<div class="row"><button class="btn" data-act="export">Download backup</button><label class="btn" style="display:inline-block">Load backup<input type="file" id="importFile" accept="application/json,.json" hidden></label>' +
    '<button class="btn quiet" data-act="reset">' + (P.confirmReset ? 'Click again to erase all progress' : 'Reset progress') + '</button></div><p class="small muted" id="ioMsg" aria-live="polite" style="margin:8px 0 0"></p></div>';
}
function viewPractice() {
  if (!P.active) return viewPracticeHome();
  if (P.idx >= P.queue.length) {
    const c = {perfect: 0, close: 0, miss: 0};
    P.results.forEach(r => c[r.outcome]++);
    return '<div class="card"><h2>Session complete</h2><div class="stats" style="margin:10px 0"><div class="stat"><b>' + c.perfect + '</b><span>Got it</span></div><div class="stat"><b>' + c.close + '</b><span>Shaky</span></div><div class="stat"><b>' + c.miss + '</b><span>Missed</span></div></div>' +
      (P.meanings.length ? '<p class="small muted" style="margin:0 0 12px">Translations: ' + ['perfect', 'close', 'miss'].map(o => P.meanings.filter(m => m === o).length + ' ' + {perfect: 'got it', close: 'partly', miss: 'not yet'}[o]).join(' · ') + '</p>' : '') +
      '<div class="row"><button class="btn primary" data-act="finish">Done</button><button class="btn" data-act="go-recite">Try a full recital</button></div></div>';
  }
  const it = P.queue[P.idx], v = byId(it.id), say = it.mode ? it.mode === 'say' : S().answer === 'say';
  const step = it.drill && !it.retry ? ' · step ' + (it.mode === 'say' ? '1 of 2: say it' : '2 of 2: write it') : '';
  const bar = '<div class="bar" aria-hidden="true"><i style="width:' + Math.round(P.idx / P.queue.length * 100) + '%"></i></div>';
  const head = (P.flash ? '<p class="flash">' + esc(P.flash) + '</p>' : '') + '<div class="row" style="justify-content:space-between;margin:0 0 8px"><span class="small muted">Verse ' + v.id + (it.drill ? step : ' · ' + (P.idx + 1) + ' of ' + P.queue.length) + (it.retry ? ' · second try' : '') + '</span><button class="btn quiet small" data-act="finish">End session</button></div>';
  const switches = '<div class="row" style="margin-top:4px">' + (it.drill ? '' : seg('answer', S().answer, [['say', 'Say it'], ['type', 'Type it']], 'Answer by')) + seg('prompt', S().prompt, [['prev', 'Verse before'], ['meaning', 'Meaning']], 'Cue') + '</div>';
  if (P.stage === 'study') {
    return bar + head + '<div class="stack">' + leafHTML(v, {noActions: true}) + '</div>' + recBar('p-' + v.id, 'Record yourself reading it') +
      '<div class="row"><button class="btn primary" data-act="cover">Cover it and recall</button></div>';
  }
  if (P.stage === 'recall') {
    const what = S().prompt === 'meaning' ? 'verse' : v.id === 1 ? 'first verse' : 'next verse';
    const hint = (P.hint && S().prompt !== 'meaning' ? '<p class="en" style="margin:8px 0 0">' + esc(v.en) + '</p>' : '') +
      '<div class="hint" id="hint" aria-live="polite">' + esc(hintText(v, P.hint)) + '</div>';
    const hintBtn = '<button class="btn" data-act="hint" ' + (P.hint >= 2 ? 'disabled style="opacity:.5"' : '') + '>Hint</button>';
    if (say) return bar + head + '<div class="card">' + promptHTML(v) +
      '<div class="say">Say the ' + what + ' aloud, then reveal it.</div>' + recBar('p-' + v.id) + hint +
      '<div class="row"><button class="btn primary" data-act="reveal">Reveal</button>' + hintBtn + '</div></div>' + switches;
    return bar + head + '<div class="card">' + promptHTML(v) + '<p class="prompt-label">' + (it.drill ? 'Write the ' : 'Type the ') + what + (it.drill ? ' from memory' : '') + '</p>' +
      '<textarea class="field" id="ans" rows="2" autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false" aria-label="Your answer">' + esc(P.typed) + '</textarea>' +
      keypad('ans') + hint +
      '<div class="row"><button class="btn primary" data-act="check">Check</button>' + hintBtn + '<button class="btn quiet" data-act="giveup">Show answer</button></div></div>' + switches;
  }
  if (P.stage === 'reveal') {
    return bar + head + '<div class="card"><p class="prompt-label">The verse</p><div class="res" lang="sa-Latn">' + marked(v.sk, null, true) + '</div>' +
      '<p class="pron">' + esc(pronText(v.sk)) + '</p>' + (willTranslate(it) ? '' : '<p class="en">' + esc(v.en) + '</p>') + repeatNote(v) +
      (readings(v).length > 1 ? '<p class="alt">Also accepted: ' + readings(v).slice(1).map(r => '<span lang="sa-Latn">' + hy(r.text) + '</span>').join(' · ') + '</p>' : '') +
      recBar('p-' + v.id) +
      '<p class="prompt-label" style="margin-top:14px">How did it go?</p><div class="rate"><button class="btn miss" data-act="rate" data-o="miss">Missed</button><button class="btn close" data-act="rate" data-o="close">Shaky</button><button class="btn perfect" data-act="rate" data-o="perfect">Got it</button></div>' +
      '<p class="small muted" style="margin:8px 0 0">Got it: every word, in order, with long sounds held. Shaky: you got there, with pauses or a slip.</p></div>';
  }
  if (P.stage === 'translate') return bar + head + translateHTML(v);
  const g = P.outcome, shown = g.text;
  const label = {perfect: 'Perfect', close: 'Close', miss: 'Not yet'}[g.outcome];
  return bar + head + '<div class="card"><span class="verdict ' + g.outcome + '">' + label + '</span>' +
    '<div class="res" lang="sa-Latn">' + marked(shown, g.gaveUp ? null : g.marks) + '</div>' +
    (g.gaveUp ? '' : '<div class="legend"><span><i style="background:var(--good-soft)"></i>matched</span><span><i style="background:var(--warn-soft)"></i>nearly</span><span><i style="background:var(--bad-soft)"></i>missed</span></div>') +
    (g.gaveUp || !P.typed.trim() ? '' : '<p class="typed">You typed: ' + esc(P.typed) + '</p>') +
    (g.extra ? '<p class="small muted" style="margin:0 0 6px">Every word matched, but you typed extra letters or words around the verse.</p>' : '') +
    (!g.gaveUp && g.label === 'variant' && g.outcome !== 'miss' ? '<p class="small muted" style="margin:0 0 6px">This matched another accepted reading.</p>' : '') +
    '<p class="pron">' + esc(pronText(shown)) + '</p>' + (willTranslate(it) ? '' : '<p class="en">' + esc(v.en) + '</p>') + repeatNote(v) +
    (g.said ? '<p class="small muted" style="margin:10px 0 0">Said aloud: ' + {perfect: 'got it', close: 'shaky', miss: 'missed'}[g.said] + ' · Written: ' + {perfect: 'perfect', close: 'close', miss: 'not yet'}[g.outcome] + '. Scheduled by the weaker of the two.</p>' : '') +
    '<p class="small muted" style="margin:10px 0 12px">Next review in ' + fmtWait(P.wait) + (g.outcome === 'miss' ? '. It will come back at the end of this session.' : '.') + '</p>' +
    '<div class="row"><button class="btn primary" id="next" data-act="next">' + (willTranslate(it) ? 'Translate it' : P.idx + 1 >= P.queue.length ? 'Finish' : P.queue[P.idx + 1].drill ? 'Try writing it again' : 'Next verse') + '</button></div></div>';
}
/* Translation check: after recalling a verse, say what it means, then compare with the English.
   Skipped when the cue was the meaning itself, and on second tries. */
const willTranslate = it => S().translate && S().prompt !== 'meaning' && !it.retry;
const STOP = new Set(['with', 'from', 'that', 'this', 'which', 'whose', 'into', 'upon', 'have', 'also', 'more', 'than']);
const contentWords = s => s.toLowerCase().replace(/\(.*?\)/g, ' ').split(/[^a-z]+/).filter(w => w.length >= 4 && !STOP.has(w));
/* A rough check of which glossed words a typed translation touches on: a gloss word counts if a word
   you typed starts with its first five letters (so "compassion" covers "compassionate"). */
function coverage(v, text) {
  const mine = contentWords(text);
  const seen = new Set();
  return partsOf(v.sk).map(p => ({p, g: GLOSS[keyOf(p)]})).filter(x => x.g && contentWords(x.g).length && !seen.has(x.p) && seen.add(x.p))
    .map(x => ({p: x.p, g: x.g, ok: contentWords(x.g).some(w => mine.some(m => m.startsWith(w.slice(0, 5)) || w.startsWith(m.slice(0, 5)) && m.length >= 5))}));
}
function translateHTML(v) {
  let h = '<div class="card"><p class="prompt-label">Translate into English</p><div class="res" lang="sa-Latn">' + hy(v.sk) + '</div>';
  if (!P.trShown) return h + '<textarea class="field sans" id="tr" rows="2" aria-label="Your translation" placeholder="Type your translation, or say it to yourself">' + esc(P.trText) + '</textarea>' +
    '<div class="row" style="margin-top:10px"><button class="btn primary" data-act="tr-show">Show the meaning</button><button class="btn quiet" data-act="tr-skip">Skip</button></div></div>';
  const cov = P.trText.trim() ? coverage(v, P.trText) : [];
  return h + (P.trText.trim() ? '<p class="typed">You wrote: ' + esc(P.trText) + '</p>' : '') +
    '<p class="prompt-label" style="margin-top:12px">Translation</p><p class="en" style="font-size:1.1rem;margin-top:0">' + esc(v.en) + '</p>' +
    (v.lc ? '<p class="note">Translation uncertain: some words here are obscure.</p>' : '') +
    (cov.length ? '<p class="prompt-label" style="margin-top:12px">Key words (rough check)</p><div class="chips">' + cov.map(c => '<span class="chip cov' + (c.ok ? ' ok' : '') + '" style="cursor:default"><span lang="sa-Latn">' + esc(c.p) + '</span> · ' + esc(c.g) + '</span>').join('') + '</div>' : '') +
    tilesHTML(v.sk) +
    '<p class="prompt-label" style="margin-top:14px">Did you have the meaning?</p><div class="rate"><button class="btn miss" data-act="tr-rate" data-o="miss">Not yet</button><button class="btn close" data-act="tr-rate" data-o="close">Partly</button><button class="btn perfect" data-act="tr-rate" data-o="perfect">Got it</button></div></div>';
}
function advance() { P.idx++; if (P.idx < P.queue.length) setStageForCurrent(); render(); scrollTo(0, 0); }

function finishItem(v, outcome) {
  P.results.push({id: v.id, outcome});
  const it = P.queue[P.idx];
  if (outcome === 'miss' && !it.retry) P.queue.push({id: v.id, isNew: false, retry: true, mode: it.mode, drill: it.drill});
}
const RANK = {miss: 0, close: 1, perfect: 2};
const weaker = (a, b) => RANK[a] <= RANK[b] ? a : b;
function doCheck(gaveUp) {
  const v = byId(P.queue[P.idx].id);
  const a = $('#ans'), val = a ? a.value : '';
  if (!gaveUp && !val.trim()) { $('#hint').textContent = 'Type your answer first, or choose Show answer.'; return; }
  const rds = readings(v);
  let outcome, pick = {ci: 0, marks: partsOf(rds[0].text).map(() => 'miss')}, g = {exact: false, sim: 0};
  if (gaveUp) outcome = 'miss';
  else {
    g = gradeSeq(val, [rds.map(r => partsOf(r.text))], S().strict);
    pick = g.picks[0];
    outcome = g.exact ? 'perfect' : g.sim >= .9 ? 'close' : 'miss';
  }
  const said = P.drillSaid; P.drillSaid = null;
  P.typed = val;
  P.outcome = {marks: pick.marks, outcome, gaveUp: !!gaveUp, text: rds[pick.ci].text, label: rds[pick.ci].label, said,
    extra: !gaveUp && !g.exact && pick.marks.every(m => m === 'ok')};
  store.recordAttempt(v.id, pick.marks, rds[pick.ci].text, gaveUp ? '' : val, outcome === 'perfect', gaveUp ? 'gave up' : P.queue[P.idx].drill ? 'written practice' : 'typed practice');
  P.wait = store.applyOutcome(v.id, said ? weaker(said, outcome) : outcome, P.hint > 0 ? 1 : 0);
  finishItem(v, outcome);
  P.flash = ''; P.stage = 'result'; render();
}
async function rate(outcome) {
  const it = P.queue[P.idx], v = byId(it.id);
  if (rec.recording()) await rec.stop();
  if (it.drill) {
    // The spoken half of a drill is scheduled together with the written half that follows.
    P.drillSaid = outcome;
    P.flash = 'Said aloud: ' + {perfect: 'got it', close: 'shaky', miss: 'missed'}[outcome] + '. Now write it from memory.';
    P.idx++; setStageForCurrent();
    render(); window.scrollTo(0, 0);
    return;
  }
  store.recordAttempt(v.id, null, v.sk, '', outcome === 'perfect', outcome === 'miss' ? 'said: missed' : 'said: shaky');
  const wait = store.applyOutcome(v.id, outcome, P.hint > 0 ? 1 : 0);
  finishItem(v, outcome);
  P.flash = 'Verse ' + v.id + ': ' + {perfect: 'got it', close: 'shaky', miss: 'missed'}[outcome] + '. Next review in ' + fmtWait(wait) + (outcome === 'miss' ? ', and again at the end of this session.' : '.');
  if (willTranslate(it)) { P.stage = 'translate'; render(); scrollTo(0, 0); return; }
  advance();
}

/* ---------- Words ---------- */
const W = {active: false, queue: [], idx: 0, options: [], answered: null, results: []};
const deckOf = key => key.startsWith('b:') ? DECKS.blocks : DECKS.text;
const cardBy = key => deckOf(key).cards.find(c => c.key === key);
const pronOf = c => c.sk.split(' / ').map(pronWord).join(' / ');
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function dealCard() {
  W.answered = null;
  const it = W.queue[W.idx]; if (!it) return;
  const c = cardBy(it.key);
  const others = shuffle(deckOf(c.key).cards.filter(x => x.key !== c.key && x.en !== c.en && x.sk !== c.sk)).slice(0, 3);
  W.options = shuffle([c].concat(others)).map(x => x.key);
}
function startWords(cards) {
  Object.assign(W, {active: true, queue: cards.map(c => ({key: c.key, retry: false})), idx: 0, results: []});
  dealCard(); go('words');
}
const wordDue = d => d.cards.filter(c => { const st = S().words[c.key]; return st && st.seen && st.due <= Date.now(); });
const wordNew = d => d.cards.filter(c => !(S().words[c.key] && S().words[c.key].seen));
function seenIn(c, max) {
  return c.seen.slice(0, max).map(o => {
    const v = byId(o.id), hits = new Set(o.hits);
    return '<p class="ctx" lang="sa-Latn" style="margin:2px 0"><a href="#learn/' + v.id + '" class="small" style="font-family:var(--sans);margin-right:6px">' + v.id + '</a>' +
      v.sk.split(' ').map(w => w.split('-').map(p => hits.has(p) ? '<mark class="hl">' + esc(p) + '</mark>' : esc(p)).join('<span class="hy">-</span>')).join(' ') + '</p>';
  }).join('') + (c.seen.length > max ? '<p class="small muted" style="margin:2px 0">and ' + (c.seen.length - max) + ' more</p>' : '');
}
function viewWords() {
  const d = DECKS[S().wordDeck], sk2en = S().wordDir === 'sk2en';
  if (!W.active) {
    const due = wordDue(d).length, nw = wordNew(d).length, known = d.cards.filter(c => store.wordLevel(c.key) === 'known').length;
    const rows = d.cards.map(c => '<div class="wrow"><span class="lv" data-level="' + store.wordLevel(c.key) + '"></span><span><b lang="sa-Latn">' + esc(c.sk) + '</b> <span class="tp">' + esc(pronOf(c)) + '</span><br>' +
      esc(c.en) + (c.note ? ' <span class="muted small">' + esc(c.note) + '</span>' : '') + ' <span class="muted small">· ' + c.seen.length + (c.seen.length === 1 ? ' verse' : ' verses') + '</span></span></div>').join('');
    return '<div class="card"><h2>Word learner</h2><p class="muted small" style="margin:0 0 12px;max-width:62ch">Learn the words the dhāraṇī is made of. <b>Building blocks</b> are the roots that recur: once you know mahā is "great" and īśvara is "lord", mahākāruṇika and lokeśvara read themselves. <b>Words in the text</b> are the full words of your document, most frequent first.</p>' +
      '<div class="row" style="margin-bottom:10px">' + seg('wdeck', S().wordDeck, [['blocks', 'Building blocks'], ['text', 'Words in the text']], 'Deck') + '</div>' +
      '<div class="row" style="margin-bottom:14px">' + seg('wdir', S().wordDir, [['sk2en', 'Sanskrit → English'], ['en2sk', 'English → Sanskrit']], 'Direction') + '</div>' +
      '<div class="stats"><div class="stat"><b>' + due + '</b><span>Due now</span></div><div class="stat"><b>' + nw + '</b><span>New</span></div><div class="stat"><b>' + known + ' / ' + d.cards.length + '</b><span>Known</span></div></div>' +
      '<div class="row"><button class="btn primary" data-act="w-learn" ' + (due + nw ? '' : 'disabled style="opacity:.5"') + '>Learn words</button><button class="btn" data-act="w-all">Quiz 20 at random</button></div>' +
      '<p class="small muted" style="margin:8px 0 0">Learn words: everything due, then up to 8 new ones.</p></div>' +
      '<details class="card" ' + (d.cards.length <= 60 ? 'open' : '') + '><summary style="cursor:pointer;font-weight:600">All ' + d.cards.length + ' words in this deck</summary><div style="margin-top:10px">' + rows + '</div></details>';
  }
  if (W.idx >= W.queue.length) {
    const right = W.results.filter(Boolean).length;
    return '<div class="card"><h2>Done</h2><p>' + right + ' of ' + W.results.length + ' right first time.</p><div class="row"><button class="btn primary" data-act="w-end">Back to the word list</button></div></div>';
  }
  const it = W.queue[W.idx], c = cardBy(it.key), a = W.answered;
  const bar = '<div class="bar" aria-hidden="true"><i style="width:' + Math.round(W.idx / W.queue.length * 100) + '%"></i></div>';
  const head = '<div class="row" style="justify-content:space-between;margin:0 0 8px"><span class="small muted">Word ' + (W.idx + 1) + ' of ' + W.queue.length + (it.retry ? ' · second try' : '') + '</span><button class="btn quiet small" data-act="w-end">End</button></div>';
  const front = sk2en
    ? '<p class="prompt-label">What does it mean?</p><p class="sk" lang="sa-Latn" style="margin:0">' + esc(c.sk) + '</p><p class="pron">' + esc(pronOf(c)) + '</p>'
    : '<p class="prompt-label">Which Sanskrit word means</p><p class="prompt-body" style="font-size:1.4rem">' + esc(c.en) + '</p>';
  const opts = '<div class="opts">' + W.options.map(k => {
    const o = cardBy(k), cls = a ? (k === c.key ? ' right' : k === a.pick ? ' wrong' : '') : '';
    return '<button class="btn opt' + cls + '" data-act="w-pick" data-k="' + esc(k) + '"' + (a ? ' disabled' : '') + (sk2en ? '' : ' lang="sa-Latn"') + '>' + esc(sk2en ? o.en : o.sk) + '</button>';
  }).join('') + '</div>';
  const back = !a ? '' : '<div style="margin-top:14px"><span class="verdict ' + (a.right ? 'perfect' : 'miss') + '">' + (a.right ? 'Right' : 'Not quite') + '</span>' +
    '<p style="margin:4px 0"><b lang="sa-Latn" style="font-family:var(--serif);font-size:1.2rem">' + esc(c.sk) + '</b> <span class="pron" style="display:inline">' + esc(pronOf(c)) + '</span> = ' + esc(c.en) + '</p>' +
    (c.note ? '<p class="small muted" style="margin:0 0 6px">' + esc(c.note) + '</p>' : '') +
    '<p class="prompt-label" style="margin-top:10px">In the dhāraṇī</p>' + seenIn(c, 3) +
    '<div class="row" style="margin-top:12px"><button class="btn primary" id="next" data-act="w-next">' + (W.idx + 1 >= W.queue.length ? 'Finish' : 'Next word') + '</button></div></div>';
  return bar + head + '<div class="card">' + front + opts + back + '</div>';
}

/* ---------- Recite ---------- */
function reciteRange() {
  const from = R.mode === 'chain' ? S().chain.from : R.from, to = R.mode === 'chain' ? S().chain.to : R.to;
  return {from, to, verses: V.filter(v => v.id >= from && v.id <= to)};
}
function troubleSpots() {
  const top = Object.keys(S().stumbles).map(Number).filter(byId).sort((a, b) => S().stumbles[b] - S().stumbles[a]).slice(0, 5);
  if (!top.length) return '';
  return '<div class="card"><h2>Where you stumble</h2><p class="muted small" style="margin:0 0 8px">The verses you most often get stuck on in a recital. Usually the trouble is the step from the verse before.</p><ul class="trouble">' +
    top.map(id => { const p = byId(id - 1); return '<li><b>Verse ' + id + '</b> (' + S().stumbles[id] + '×)' + (p ? ', after <i lang="sa-Latn" style="font-family:var(--serif)">' + esc(p.sk) + '</i>' : '') + ' <button class="btn quiet" data-act="practice-pair" data-id="' + id + '">Practice the step</button></li>'; }).join('') +
    '</ul></div>';
}
function paceHTML(from, to) {
  const past = S().recitals.filter(r => r.from === from && r.to === to).slice(-5);
  if (!past.length) return '';
  return '<p class="small muted" style="margin:8px 0 0">Your recent times for verses ' + from + ' to ' + to + ': ' +
    past.map(r => clock(r.ms) + (r.stumbled.length ? ' (' + r.stumbled.length + ' stumble' + (r.stumbled.length > 1 ? 's' : '') + ')' : ' clean')).join(' · ') + '</p>';
}
function viewRecite() {
  const {from, to, verses} = reciteRange(), say = S().answer === 'say';
  const modeRow = '<div class="row" style="margin-bottom:12px">' + seg('rmode', R.mode, [['chain', 'Build the chain'], ['range', 'Any range']], 'Recital mode') + seg('answer', S().answer, [['say', 'Say it'], ['type', 'Type it']], 'Answer by') + '</div>';
  let h = '<div class="card"><h2>Recite from memory</h2>' + modeRow;
  if (R.mode === 'chain') {
    h += '<p class="muted small" style="margin:0 0 10px;max-width:62ch">Recite from the start verse up to the end of your chain. A clean recital adds the next verse, so the whole text grows one link at a time and every step from one verse to the next gets practised.</p>' +
      '<div class="row" style="margin-bottom:10px"><span class="small muted">Start at</span>' + verseSelect('cfrom', from) +
      '<span class="small muted">Chain ends at verse <b>' + to + '</b></span><button class="chip" data-act="chain-len" data-d="-1" aria-label="Shorten the chain">−</button><button class="chip" data-act="chain-len" data-d="1" aria-label="Lengthen the chain">+</button></div>';
  } else {
    h += '<div class="row" style="margin-bottom:10px"><span class="small muted">From</span>' + verseSelect('from', R.from) + '<span class="small muted">to</span>' + verseSelect('to', R.to) + '</div>';
  }
  h += '<div class="chips"><button class="chip" data-act="toggle-rhints" aria-pressed="' + R.hints + '">First letters</button>' +
    (say && rec.canRecord ? '<button class="chip" data-act="toggle-rrec" aria-pressed="' + S().recRecital + '">Record while reciting</button>' : '') + '</div>';
  if (R.hints) h += '<div class="card" style="background:var(--bg)"><p class="prompt-label">First letters</p>' + verses.map(v => '<div class="hint" style="margin:2px 0;font-size:1.05rem">' + esc(hintText(v, 1)) + '</div>').join('') + '</div>';

  if (say) {
    if (R.phase === 'ready') h += '<button class="btn primary" data-act="r-start">Start reciting verses ' + from + ' to ' + to + '</button>' + paceHTML(from, to);
    else if (R.phase === 'running') h += '<div class="timer" id="timer">' + clock(Date.now() - R.t0) + '</div>' + (rec.recording() ? '<p class="small muted" style="text-align:center"><span class="dot"></span>Recording</p>' : '') +
      '<div class="row" style="justify-content:center"><button class="btn primary" data-act="r-done">Finished</button><button class="btn quiet" data-act="r-cancel">Cancel</button></div>';
    else {
      h += '<div class="timer">' + clock(R.ms) + '</div>' + (rec.take('recital') ? '<div class="recbar"><span class="small muted">Your recital:</span><audio controls preload="metadata" src="' + rec.take('recital') + '"></audio></div>' : '') +
        '<p class="prompt-label">Tap each verse where you stumbled, paused or slipped</p>' +
        verses.map(v => '<button class="vline" data-act="stumble" data-id="' + v.id + '" aria-pressed="' + R.stumbled.has(v.id) + '"><span class="n">' + v.id + '</span><span lang="sa-Latn">' + marked(v.sk, null, true) + '</span></button>').join('') +
        (R.saved ? '<p class="small" style="margin:12px 0 0">' + esc(R.savedMsg) + '</p><div class="row" style="margin-top:10px"><button class="btn primary" data-act="r-again">Recite again</button></div>'
          : '<div class="row" style="margin-top:12px"><button class="btn primary" data-act="r-save">' + (R.stumbled.size ? 'Save: ' + R.stumbled.size + ' stumble' + (R.stumbled.size > 1 ? 's' : '') : 'Save: clean recital') + '</button><button class="btn quiet" data-act="r-cancel">Discard</button></div>');
    }
  } else {
    h += '<textarea class="field" id="recital" rows="6" autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false" aria-label="Your recital">' + esc(R.text) + '</textarea>' + keypad('recital') +
      '<div class="row" style="margin-top:10px"><button class="btn primary" data-act="check-recital">Check recital</button></div>' + (R.savedMsg && R.result ? '' : paceHTML(from, to));
  }
  h += '</div>';
  if (!say && R.result) {
    const r = R.result, pct = Math.round(r.sim * 100);
    h += '<div class="card"><span class="verdict ' + (r.exact ? 'perfect' : r.sim >= .9 ? 'close' : 'miss') + '">' + (r.exact ? 'Perfect recital' : pct + '% match') + '</span>' +
      verses.map((v, i) => '<div class="res" style="font-size:1.25rem" lang="sa-Latn"><span class="small muted" style="font-family:var(--sans);margin-right:6px">' + v.id + '</span>' + marked(readings(v)[r.picks[i].ci].text, r.picks[i].marks) + '</div>').join('') +
      '<div class="legend"><span><i style="background:var(--good-soft)"></i>matched</span><span><i style="background:var(--warn-soft)"></i>nearly</span><span><i style="background:var(--bad-soft)"></i>missed</span></div>' +
      (R.savedMsg ? '<p class="small" style="margin:6px 0 0">' + esc(R.savedMsg) + '</p>' : '') + '</div>';
  }
  return h + troubleSpots();
}
function afterRecital(from, to, stumbled) {
  if (R.mode !== 'chain') return stumbled.length ? 'Saved. The verses you stumbled on are listed under Where you stumble and in the Spelling tab.' : 'Saved. A clean recital.';
  if (stumbled.length) return 'Saved. The chain stays at verses ' + from + ' to ' + to + ' until you recite it cleanly.';
  if (to >= V.length) return 'Clean, all the way to the end. The chain is complete.';
  S().chain.to = to + 1; store.save();
  return 'Clean. Your chain now runs from verse ' + from + ' to verse ' + (to + 1) + '.';
}
function tick() {
  clearInterval(timerId); timerId = null;
  if (tab === 'recite' && R.phase === 'running') timerId = setInterval(() => { const t = $('#timer'); if (t) t.textContent = clock(Date.now() - R.t0); }, 250);
}

/* ---------- Spelling ---------- */
function fixRows(e) {
  const parts = partsOf(e.text), rows = [];
  parts.forEach((w, k) => { const m = e.marks[k]; if (m && m !== 'ok') rows.push({w, k, m}); });
  if (!rows.length) return '';
  return '<div class="lab" style="margin-top:10px">Type the correct spelling of each word you missed</div>' + rows.map(r =>
    '<div class="fxrow row" style="margin:6px 0"><span class="badge ' + (r.m === 'miss' ? 'slip' : 'key') + '">' + (r.m === 'miss' ? 'missed' : 'nearly') + '</span>' +
    '<input class="field fx" id="fx-' + e.id + '-' + r.k + '" data-want="' + esc(r.w) + '" lang="sa-Latn" autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false" style="width:11rem;min-height:40px" aria-label="Correct spelling of word ' + (r.k + 1) + '">' +
    '<button class="btn" data-act="fx-check" data-t="fx-' + e.id + '-' + r.k + '">Check</button><span class="small muted fxmsg" aria-live="polite"></span></div>').join('') + keypad('fxlast');
}
function fxCheck(id) {
  const inp = document.getElementById(id); if (!inp) return;
  const msg = inp.parentNode.querySelector('.fxmsg'), want = inp.dataset.want, got = inp.value.trim();
  const n = x => x.normalize('NFC').toLowerCase();
  if (!got) { msg.textContent = 'Type the word first.'; return; }
  if (n(got) === n(want)) { inp.disabled = true; inp.style.opacity = .6; msg.textContent = 'Correct. ✓'; msg.style.color = 'var(--good)'; }
  else if (fold(got) === fold(want)) msg.textContent = 'The letters are right, but check the marks (ā, ś, ṇ…). Look at the word above.';
  else msg.textContent = 'Not quite. Look at the word above and try again.';
}
function currentMistakes() {
  const list = store.recentList(id => !!byId(id));
  const words = {};
  list.filter(e => e.marks).forEach(e => { let k = 0; e.text.split(' ').forEach(w => w.split('-').forEach(part => { const m = e.marks[k++]; if (m && m !== 'ok') { const w2 = words[part] = words[part] || {n: 0}; w2.n++; } })); });
  const wl = Object.keys(words).sort((a, b) => words[b].n - words[a].n || a.localeCompare(b));
  let h = '<div class="card"><h2>Your current mistakes</h2><p class="muted small" style="margin:0 0 10px;max-width:62ch">The verses you missed or found shaky on your latest try, from practice or a recital. A verse leaves this list as soon as you get it right, and anything older than 3 days is dropped, so this shows what needs work now.</p>';
  if (!list.length) return h + '<p style="margin:0">Nothing to fix right now. Mistakes from your next practice session will show up here.</p></div>';
  if (wl.length) h += '<div class="lab">Words to watch</div><div class="chips" style="margin:6px 0 14px">' + wl.map(w => '<span class="chip" lang="sa-Latn" style="cursor:default">' + esc(w) + (words[w].n > 1 ? ' ×' + words[w].n : '') + '</span>').join('') + '</div>';
  h += list.map(e => {
    const v = byId(e.id);
    return '<div class="fix"><div class="head"><span class="badge slip">Verse ' + v.id + '</span><span class="small muted">' + esc(e.src) + ' · ' + ago(Date.now() - e.t) + '</span></div>' +
      '<div class="res" style="font-size:1.25rem" lang="sa-Latn">' + marked(e.text, e.marks, !e.marks) + '</div>' +
      (e.typed ? '<p class="typed">You typed: ' + esc(e.typed) + '</p>' : '') +
      '<p class="pron">' + esc(pronText(e.text)) + '</p>' + (e.marks ? fixRows(e) : '') +
      '<div class="actions"><button class="btn quiet" data-act="practice-line" data-id="' + v.id + '">Practice this verse</button></div></div>';
  }).join('');
  return h + '<div class="row" style="margin-top:12px"><button class="btn quiet" data-act="clear-mistakes">' + (P.confirmClear ? 'Click again to clear all ' + list.length + ' mistakes' : 'Reset mistakes') + '</button></div></div>';
}
function viewSpelling() {
  const label = {key: 'Pronunciation spelling', slip: 'Spelling slip', sound: 'Vowel length', ok: 'Matches', var: 'Valid variant'};
  return currentMistakes() + '<div class="card"><h2>Your spelling when you started</h2><p class="muted small" style="margin:0;max-width:62ch">Some of what you wrote is a <b>pronunciation key</b> (spelling how it sounds in English letters) and some is a small <b>spelling slip</b>. Sanskrit spelling in IAST uses extra marks so each letter has exactly one sound. A pronunciation key is not wrong for reciting; the Sanskrit spelling just shows which sound is really meant, and which vowels are long.</p></div>' +
    Object.keys(STUDY).map(id => {
      const st = STUDY[id], v = byId(+id);
      return '<div class="card"><div class="pair"><div><div class="lab">You wrote (verse ' + id + ')</div><div class="val">' + esc(st.yours) + '</div></div><div><div class="lab">Sanskrit (IAST)</div><div class="val" lang="sa-Latn">' + esc(v.sk) + '</div></div></div>' +
        st.fixes.map(f => '<div class="fix"><div class="head"><span class="badge ' + f.kind + '">' + label[f.kind] + '</span><span class="y' + (f.kind === 'ok' || f.kind === 'var' ? ' plain' : '') + '">' + esc(f.y) + '</span><span class="s" lang="sa-Latn">' + esc(f.s) + '</span></div><p>' + esc(f.t) + '</p></div>').join('') + '</div>';
    }).join('');
}

/* ---------- Sounds ---------- */
function viewSounds() {
  const items = [
    ['a', 'short, like u in "but"', 'sarva, kara'], ['ā', 'long, like a in "father"', 'karāya, mahā'], ['i', 'short, like i in "bit"', 'bodhi'], ['ī', 'long, like ee in "feet"', 'nīla'],
    ['u', 'like oo in "put"', 'upadrava'], ['ū', 'long, like oo in "pool"', 'mūrte'], ['ṛ', 'a vowel sounding like "ri" in "rid"', 'mṛtyu, hṛdayaṃ'], ['e', 'always "ay" as in "say", and always long', 'chedana'], ['ai', 'like "eye"', 'maitrī'], ['o', 'like "oh", and always long', 'namo'],
    ['ś  ṣ', 'both are "sh"', 'śoṣaṇa'], ['ch', 'ch with a puff of breath ("chh")', 'chedana'], ['bh  dh', 'b or d plus a puff of breath, as in "club house", "mad house"', 'bhava, bandhana'],
    ['ṇ  ṭ  ḍ', 'tongue curled back; ṇ sounds like n', 'kāruṇika, kaṇṭha'], ['ṃ', 'nasal hum, like m or ng', 'idaṃ'], ['ḥ', 'a light echo of the vowel', 'manaḥ is muh-nuh-huh'],
    ['tt  dd', 'a doubled consonant is held one beat longer', 'sattva, siddha'], ['v', 'between English v and w', 'sarva, vyādhi'], ['ñ  ṅ', 'n before c or g, like "inch", "ink"', 'muñca, śaṅkha']
  ];
  return '<div class="card"><h2>Reading the marks</h2><p class="muted small" style="margin:0 0 8px;max-width:62ch">A short a is the biggest surprise for English speakers: it sounds like the u in "but", so sarva is "sur-vuh", not "sar-vah". A long ā is the open sound of "father". When you recite in a plain speaking voice, getting short and long vowels right is most of what makes the Sanskrit sound right: hold a long vowel about twice as long as a short one.</p>' +
    '<p class="muted small" style="margin:0;max-width:62ch">Turn on <b>Long sounds</b> in the Learn tab to see every long vowel <span class="long">underlined</span> and every doubled consonant <span class="gem">dotted</span>. The pronunciation lines are an automatic English respelling, so treat them as a guide and follow your teacher or tradition where they differ.</p></div>' +
    '<div class="sound-grid">' + items.map(i => '<div class="snd"><div class="g" lang="sa-Latn">' + esc(i[0]) + '</div><div class="d">' + esc(i[1]) + '</div><div class="e" lang="sa-Latn">' + esc(i[2]) + '</div></div>').join('') + '</div>';
}

/* ---------- Sources ---------- */
function viewSources() {
  const row = (head, a, b, t) => '<div class="fix"><div class="head"><span class="badge var">' + head + '</span></div><p><b>Your document:</b> <span lang="sa-Latn" style="font-family:var(--serif)">' + esc(a) + '</span><br><b>Chandra:</b> <span lang="sa-Latn" style="font-family:var(--serif)">' + esc(b) + '</span></p><p class="muted">' + esc(t) + '</p></div>';
  const link = (u, t) => '<a href="' + u + '" target="_blank" rel="noopener">' + t + '</a>';
  return '<div class="card src"><h2>What this app teaches</h2><p>Your printed study document, line by line, exactly as printed. It was checked against the longer reconstruction by Lokesh Chandra (1988), as quoted on ' + link('https://kinhsach.wordpress.com/2019/12/30/hoc-chu-dai-bi-tieng-phan-the-great-compassion-dharani-mantra-sound-listening/', 'this page') + ' and ' + link('https://essenceofbuddhism.wordpress.com/2018/03/02/the-great-compassion-mantra-in-sanskrit/', 'this one') + ' (both trace to the same Wikipedia section, so they count as one source). The two texts have the same structure and mostly the same words, so your document is a real version of the longer dhāraṇī. It is not the shorter 84-line version used in many temples.</p>' +
    '<p>Where your document came from, and whether it is the only correct text, could not be confirmed. No single canonical Sanskrit exists. Where it differs from Chandra both readings are accepted when you practice, and the notes under each verse say what differs.</p></div>' +
    '<div class="card src"><h2>Where your document differs from Chandra</h2>' +
    row('Verses 4 and 5', 'sarva bandhana chedana-karāya / samudraṃ', 'sarva-bandhana-cchedana-karāya / samudra', 'Spelling and the nasal ṃ. Both are attested, and neither changes the meaning.') +
    row('Verse 7', 'mṛtyu upadrava', 'sarv-ety-upadrava', 'Mṛtyu ("death") is the chant reading. Chandra reads ety ("calamity").') +
    row('Verses 9 and 10', 'tasmān namas-kṛtvā idam / nīlakaṇṭhaṃ api nāma hṛdayam', 'tasmai namaskṛtvā imaṃ / nīlakaṇṭha-nāma, then hṛdayaṃ vartayiṣyāmi', 'Both are grammatical. Your document has the chant wording and moves hṛdayam to the end of the line.') +
    row('Verse 17', 'hi hi hare … parama-maitra-citta', 'ehy-ehi hare … paramārtha-citta', 'The ending ("of kind mind" versus "of highest-truth mind") is a real difference.') +
    row('Verses 20 to 24', 'dhuru dhuru vīryanti … cala cala vimala amala mūrte / āryāvalokiteśvara jina kṛṣṇa-jaṭā-makuṭa-valam / mā pralamba', 'dhuru-dhuru viyanta e … cala-cala vimal-āmala āryāvalokiteśvara jina / kṛṣṇa-jaṭā-makuṭā \'varama prarama virama', 'Chandra\'s words here are obscure. Your document seems to read them as more regular Sanskrit (vīryanti, mā pralamba), which could not be checked against a manuscript.') +
    row('Verses 25 to 27', 'vara vara mahāvara / bala bala mahābala / cala cala mahācala', 'bala-bala mahābala malla-malla mahāmalla cala-cala mahācala', 'Your document adds vara vara mahāvara and leaves out malla-malla mahāmalla.') +
    row('Verse 29', 'deśa-careśvara', 'niśācareśvara', '"Lord of those who roam the lands" versus "lord of night-roamers".') +
    row('Verse 32', 'nārāyaṇa-varūpa vara-mārga-ari', 'nārāyaṇa-balopabala-veśa-dhara', 'The second half of the line is quite different.') +
    row('Verses 38 to 41', 'huru huru māla / śrī śrī / suru suru bhūru bhūru', 'hulu-hulu malla / siri-siri suru-suru muru-muru', 'Mostly sound syllables, so small differences are expected.') +
    row('Verse 46', 'ehyehi pa mahāsiddha-yogeśvara', 'ehy-ehi bho mahāsiddha-yogeśvara', 'Pa is unexplained. Bho ("O!") is probably what is meant.') +
    row('Verses 57 to 64', 'mahādara-siṃhamukhāya / cakrayuddhāya / śaṅkha-śabdāni bodhanāya / kṛṣṇa-jināya', 'mahā-narasiṃha-mukhāya / cakr-āyudhāya / śaṅkha-śabda-nibodhanāya / kṛṣṇ-ājināya', 'Several of these look like small copying changes.') + '</div>' +
    '<div class="card src"><h2>Where your document\'s English needs a second look</h2><ul>' +
    '<li><b>Verse 20 (vīryanti):</b> not found as a Sanskrit word, so "sustain great courage and energy" may be a guess.</li>' +
    '<li><b>Verse 21 (dharendreśvara):</b> "bearer of the Dharma" is not in the word. It literally says "lord of the earth-bearers".</li>' +
    '<li><b>Verse 27 (mahācala):</b> "unshakable" would be acala. Cala means "moving".</li>' +
    '<li><b>Verse 34 (hala hala viṣa):</b> Chandra reads halāhala-viṣa, the name of the deadly poison in the Śiva story.</li>' +
    '<li><b>Verse 61 (mahālakūṭadhara):</b> "bearer of the poison" does not fit. Chandra\'s lakuṭa means "staff".</li>' +
    '<li><b>Verse 62 (cakrayuddhāya):</b> yuddha means "battle", so this was probably meant as cakr-āyudhāya ("weapon: the wheel").</li>' +
    '<li><b>Verse 64 (kṛṣṇa-jināya):</b> Chandra\'s ajina would mean "black antelope skin", not "victorious".</li></ul>' +
    '<p class="muted">Those verses are marked "translation uncertain" in the Learn tab. The Sanskrit of your document is kept exactly, and translated carefully from the words themselves.</p></div>' +
    '<div class="card src"><h2>What could not be verified</h2><ul><li>Chandra\'s book, the Peking palace manuscripts and the Taishō texts were not available. Everything here comes from web pages quoting them.</li>' +
    '<li>Who made your document, or which source it follows, is unknown. Its Sanskrit is a mix of Chandra\'s wording, chant wording and a few readings that could not be traced.</li>' +
    '<li>Some words are obscure even to scholars (dhuru, viyanta, hulu, suru and others).</li>' +
    '<li>The pronunciation lines in this app are generated by a rule-based respelling, not recorded, so they differ a little from the pronunciation lines in your document.</li></ul>' +
    '<p class="muted">Other pages consulted: ' + link('https://astr.ac.cn/note/2304/', 'astr.ac.cn') + ' (the shorter 84-line text), ' + link('https://fr.wikipedia.org/wiki/Nilakantha_Dharani', 'French Wikipedia') + ' and ' + link('https://en.wikipedia.org/wiki/N%C4%ABlaka%E1%B9%87%E1%B9%ADha_Dh%C4%81ra%E1%B9%87%C4%AB', 'English Wikipedia') + '. Please check the text against your teacher\'s or tradition\'s version.</p></div>';
}

/* ---------- Render and routing ---------- */
const VIEWS = {learn: viewLearn, practice: viewPractice, words: viewWords, recite: viewRecite, spelling: viewSpelling, sounds: viewSounds, sources: viewSources};
function render() {
  renderTabs(); renderMeter();
  $('#view').innerHTML = VIEWS[tab]();
  tick();
  const a = $('#ans'); if (a) a.focus();
  const n = $('#next'); if (n) n.focus();
}
function go(t) {
  if (location.hash !== '#' + t) { tab = t; history.pushState(null, '', '#' + t); }
  tab = t; render(); window.scrollTo(0, 0);
}
function fromHash() {
  const [t, id] = location.hash.slice(1).split('/');
  tab = VIEWS[t] ? t : 'learn';
  render();
  if (id) { const el = document.getElementById('line-' + id); if (el) el.scrollIntoView({block: 'start'}); } else window.scrollTo(0, 0);
}
window.addEventListener('popstate', fromHash);
window.addEventListener('hashchange', fromHash);

/* ---------- Events ---------- */
document.addEventListener('click', async e => {
  const t = e.target.closest('[data-act], .tab'); if (!t) return;
  if (t.classList.contains('tab')) { P.confirmReset = false; P.confirmClear = false; go(t.dataset.tab); return; }
  const act = t.dataset.act;
  if (act !== 'reset') P.confirmReset = false;
  if (act !== 'clear-mistakes') P.confirmClear = false;
  const keepTyped = () => { const a = $('#ans'); if (a) P.typed = a.value; const r = $('#recital'); if (r) R.text = r.value; };
  switch (act) {
    case 'toggle-show': S().show[t.dataset.k] = !S().show[t.dataset.k]; store.save(); { const y = scrollY; render(); scrollTo(0, y); } break;
    case 'toggle-strict': S().strict = !S().strict; store.save(); render(); break;
    case 'answer': keepTyped(); S().answer = t.dataset.v; store.save(); if (R.phase !== 'running') R.phase = 'ready'; render(); break;
    case 'prompt': keepTyped(); S().prompt = t.dataset.v; store.save(); render(); break;
    case 'practice-line': startDrill(+t.dataset.id); break;
    case 'practice-pair': { const id = +t.dataset.id; startSession(id > 1 ? [id - 1, id] : [id], true); break; }
    case 'set-level': { const y = scrollY; store.setLevel(+t.dataset.id, t.dataset.lv); render(); scrollTo(0, y); break; }
    case 'clear-mistakes':
      if (!P.confirmClear) { P.confirmClear = true; render(); } else { store.clearRecent(); render(); }
      break;
    case 'fx-check': fxCheck(t.dataset.t); break;
    case 'ins': {
      const ta = t.dataset.t === 'fxlast' ? (lastFx && document.body.contains(lastFx) ? lastFx : null) : $('#' + t.dataset.t); if (!ta) break;
      const a = ta.selectionStart == null ? ta.value.length : ta.selectionStart, b = ta.selectionEnd == null ? a : ta.selectionEnd;
      ta.value = ta.value.slice(0, a) + t.dataset.ch + ta.value.slice(b);
      ta.focus(); ta.setSelectionRange(a + 1, a + 1); break;
    }
    case 'know': for (let i = 1; i <= 7; i++) S().lines[i] = {box: 1, due: 0, seen: true, reviews: 0}; S().chain.to = Math.max(S().chain.to, 7); store.save(); render(); break;
    case 'start-fresh': render(); break;
    case 'start': startSession(dueIds().concat(newIds()), false); break;
    case 'start-all': startSession(V.map(v => v.id), true); break;
    case 'cover': if (rec.recording()) await rec.stop(); P.stage = 'recall'; render(); break;
    case 'hint': keepTyped(); P.hint = Math.min(2, P.hint + 1); render(); break;
    case 'reveal': if (rec.recording()) await rec.stop(); P.stage = 'reveal'; render(); break;
    case 'rate': await rate(t.dataset.o); break;
    case 'check': doCheck(false); break;
    case 'giveup': doCheck(true); break;
    case 'next': if (P.stage === 'result' && willTranslate(P.queue[P.idx])) { P.flash = ''; P.stage = 'translate'; render(); scrollTo(0, 0); } else advance(); break;
    case 'tr-show': { const a = $('#tr'); P.trText = a ? a.value : ''; P.trShown = true; render(); break; }
    case 'tr-skip': P.flash = ''; advance(); break;
    case 'tr-rate': store.applyMeaning(P.queue[P.idx].id, t.dataset.o); P.meanings.push(t.dataset.o); P.flash = ''; advance(); break;
    case 'toggle-translate': S().translate = !S().translate; store.save(); render(); break;
    case 'finish': if (rec.recording()) await rec.stop(); P.active = false; P.flash = ''; render(); scrollTo(0, 0); break;
    case 'go-recite': P.active = false; P.flash = ''; go('recite'); break;
    case 'reset':
      if (!P.confirmReset) { P.confirmReset = true; render(); } else { store.resetProgress(); P.confirmReset = false; render(); }
      break;
    case 'export': {
      const url = URL.createObjectURL(new Blob([store.exportJSON()], {type: 'application/json'}));
      const a = document.createElement('a'); a.href = url; a.download = 'dharani-progress-' + store.localDate() + '.json';
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
      break;
    }
    case 'rec-start':
      try { await rec.start(t.dataset.k); } catch (err) { alert('Could not use the microphone: ' + (err && err.message || err)); }
      keepTyped(); render(); break;
    case 'rec-stop': await rec.stop(); keepTyped(); render(); break;

    case 'wdeck': S().wordDeck = t.dataset.v; store.save(); render(); break;
    case 'wdir': S().wordDir = t.dataset.v; store.save(); render(); break;
    case 'w-learn': { const d = DECKS[S().wordDeck]; startWords(wordDue(d).concat(wordNew(d).slice(0, 8))); break; }
    case 'w-all': startWords(shuffle(DECKS[S().wordDeck].cards.slice()).slice(0, 20)); break;
    case 'w-pick': {
      if (W.answered) break;
      const it = W.queue[W.idx], right = t.dataset.k === it.key;
      W.answered = {pick: t.dataset.k, right};
      store.applyWord(it.key, right);
      if (!it.retry) W.results.push(right);
      if (!right && !it.retry) W.queue.push({key: it.key, retry: true});
      render(); break;
    }
    case 'w-next': W.idx++; dealCard(); render(); scrollTo(0, 0); break;
    case 'w-end': W.active = false; render(); scrollTo(0, 0); break;
    case 'rmode': R.mode = t.dataset.v; R.phase = 'ready'; R.result = null; R.savedMsg = ''; render(); break;
    case 'toggle-rhints': keepTyped(); R.hints = !R.hints; render(); break;
    case 'toggle-rrec': S().recRecital = !S().recRecital; store.save(); render(); break;
    case 'chain-len': { const c = S().chain; c.to = Math.min(V.length, Math.max(c.from, c.to + +t.dataset.d)); store.save(); R.phase = 'ready'; render(); break; }
    case 'r-start':
      Object.assign(R, {phase: 'running', t0: Date.now(), stumbled: new Set(), saved: false, savedMsg: ''});
      rec.drop('recital');
      if (S().recRecital && rec.canRecord) { try { await rec.start('recital'); } catch (err) { /* reciting works without the mic */ } }
      render(); break;
    case 'r-done': R.ms = Date.now() - R.t0; R.phase = 'done'; if (rec.recording()) await rec.stop(); render(); break;
    case 'r-cancel': if (rec.recording()) await rec.stop(); R.phase = 'ready'; render(); break;
    case 'r-again': R.phase = 'ready'; render(); break;
    case 'stumble': { if (R.saved) break; const id = +t.dataset.id; R.stumbled.has(id) ? R.stumbled.delete(id) : R.stumbled.add(id); const y = scrollY; render(); scrollTo(0, y); break; }
    case 'r-save': {
      const {from, to, verses} = reciteRange(), st = [...R.stumbled].sort((a, b) => a - b);
      store.saveRecital(from, to, R.ms, st, 'said');
      verses.forEach(v => store.recordAttempt(v.id, null, v.sk, '', !R.stumbled.has(v.id), 'recital: stumbled'));
      R.savedMsg = afterRecital(from, to, st); R.saved = true; render(); break;
    }
    case 'check-recital': {
      const {from, to, verses} = reciteRange();
      const val = $('#recital').value; R.text = val;
      if (!val.trim()) break;
      R.result = gradeSeq(val, verses.map(v => readings(v).map(r => partsOf(r.text))), S().strict);
      const st = [];
      verses.forEach((v, i) => { const pk = R.result.picks[i], ok = pk.marks.every(m => m === 'ok'); if (!ok) st.push(v.id); store.recordAttempt(v.id, pk.marks, readings(v)[pk.ci].text, '', ok, 'typed recital'); });
      store.saveRecital(from, to, 0, st, 'typed');
      R.savedMsg = afterRecital(from, to, st);
      render(); break;
    }
  }
});
document.addEventListener('change', async e => {
  const id = e.target.id;
  if (id === 'from' || id === 'to') {
    const r = $('#recital'); if (r) R.text = r.value;
    R.from = +$('#from').value; R.to = +$('#to').value;
    if (R.to < R.from) { if (id === 'from') R.to = R.from; else R.from = R.to; }
    R.result = null; R.phase = 'ready'; render();
  }
  if (id === 'cfrom') { const c = S().chain, f = +e.target.value; c.to = Math.min(V.length, f + Math.max(1, c.to - c.from)); c.from = f; store.save(); R.phase = 'ready'; R.result = null; render(); }
  if (id === 'npd') { S().newPerDay = +e.target.value; store.save(); render(); }
  if (id === 'importFile' && e.target.files[0]) {
    try { store.importJSON(await e.target.files[0].text()); render(); $('#ioMsg').textContent = 'Backup loaded.'; }
    catch (err) { $('#ioMsg').textContent = 'Could not load that file. ' + (err && err.message || ''); }
  }
});
document.addEventListener('focusin', e => { if (e.target.classList && e.target.classList.contains('fx')) lastFx = e.target; });
document.addEventListener('mousedown', e => { if (e.target.closest('.key')) e.preventDefault(); });
document.addEventListener('keydown', e => {
  if (e.target.id === 'ans' && e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); doCheck(false); }
  if (e.target.classList && e.target.classList.contains('fx') && e.key === 'Enter') { e.preventDefault(); fxCheck(e.target.id); }
});

$('#kicker').textContent = 'Nīlakaṇṭha Dhāraṇī · your study document, ' + V.length + ' verses';
fromHash();
if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('sw.js').catch(() => {});
