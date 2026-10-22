/* Progress, kept on this device in localStorage, with export and import for backups. */
export const DAY = 864e5;
export const INTERVALS = [10 * 60e3, DAY, 3 * DAY, 7 * DAY, 14 * DAY, 30 * DAY];
const KEY = 'dharani-recitation.v1';
const RECENT_MS = 3 * DAY;

const defaults = () => ({
  strict: false, newPerDay: 3, answer: 'say', prompt: 'prev', recRecital: false,
  show: {pron: true, words: true, en: true, len: true},
  days: [], lines: {}, newToday: {date: '', n: 0}, recent: {},
  chain: {from: 1, to: 2}, recitals: [], stumbles: {}
});
function merge(st) {
  // Accept the original study tool's layout too, where progress sat under books.doc.
  if (st.books && st.books.doc) { st = Object.assign({}, st, st.books.doc); delete st.books; }
  const d = defaults(), out = Object.assign(d, st);
  out.show = Object.assign(defaults().show, st.show || {});
  out.chain = Object.assign(defaults().chain, st.chain || {});
  return out;
}

export let S = defaults();
try { const raw = localStorage.getItem(KEY); if (raw) S = merge(JSON.parse(raw)); } catch (e) {}
export const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };

export function exportJSON() {
  return JSON.stringify({app: 'dharani-recitation', version: 1, exported: new Date().toISOString(), state: S}, null, 1);
}
export function importJSON(text) {
  const o = JSON.parse(text), st = o && o.state ? o.state : o;
  if (!st || typeof st !== 'object' || !(st.lines || st.books)) throw new Error('This file does not look like a progress backup.');
  S = merge(st); save();
}
export function resetProgress() {
  const keep = {strict: S.strict, newPerDay: S.newPerDay, answer: S.answer, prompt: S.prompt, show: S.show, recRecital: S.recRecital};
  S = Object.assign(defaults(), keep); save();
}

export const localDate = (d = new Date()) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
export const levelOf = id => { const st = S.lines[id]; if (!st || !st.seen) return 'new'; return st.box >= 3 ? 'known' : 'learning'; };
export function markDay() { const today = localDate(); if (!S.days.includes(today)) S.days.push(today); }
export function streak() {
  const set = new Set(S.days); let d = new Date();
  if (!set.has(localDate(d))) d = new Date(Date.now() - DAY);
  let n = 0;
  while (set.has(localDate(d))) { n++; d = new Date(d.getTime() - DAY); }
  return n;
}

/* Leitner boxes. A perfect answer moves a verse up a box (only to box 1 if hints were used).
   A close or shaky one keeps its box and comes back within a day. A miss starts it over. */
export function applyOutcome(id, outcome, hints) {
  const st = S.lines[id] || (S.lines[id] = {box: 0, due: 0, seen: false, reviews: 0});
  const now = Date.now(), wasNew = !st.seen;
  st.seen = true; st.reviews = (st.reviews || 0) + 1;
  if (outcome === 'perfect') st.box = hints ? Math.max(st.box, 1) : Math.min(5, st.box + 1);
  else if (outcome === 'miss') st.box = 0;
  st.due = now + (outcome === 'miss' ? INTERVALS[0] : outcome === 'close' ? INTERVALS[Math.min(st.box, 1)] : INTERVALS[st.box]);
  const today = localDate();
  markDay();
  if (wasNew) { if (S.newToday.date !== today) S.newToday = {date: today, n: 0}; S.newToday.n++; }
  save();
  return st.due - now;
}
export function setLevel(id, lv) {
  if (lv === 'new') delete S.lines[id];
  else S.lines[id] = {box: lv === 'known' ? 3 : 1, due: Date.now() + (lv === 'known' ? INTERVALS[3] : 0), seen: true, reviews: (S.lines[id] && S.lines[id].reviews) || 0};
  save();
}

/* Latest mistakes per verse. marks is null for spoken attempts, which have no typed words to compare. */
export function recordAttempt(id, marks, text, typed, perfect, src) {
  if (perfect) delete S.recent[id]; else S.recent[id] = {t: Date.now(), marks, text, typed: typed || '', src};
  save();
}
export function recentList(exists) {
  const r = S.recent, now = Date.now();
  return Object.keys(r).filter(id => now - r[id].t <= RECENT_MS && exists(+id)).map(id => Object.assign({id: +id}, r[id])).sort((a, b) => b.t - a.t);
}
export function clearRecent() { S.recent = {}; save(); }

/* Full recitals: time taken, and the verses you stumbled on. */
export function saveRecital(from, to, ms, stumbled, how) {
  markDay();
  S.recitals.push({from, to, ms, stumbled, how, t: Date.now()});
  if (S.recitals.length > 200) S.recitals = S.recitals.slice(-200);
  stumbled.forEach(id => { S.stumbles[id] = (S.stumbles[id] || 0) + 1; });
  save();
}
