/* Hear a verse or word with the device's own speech voice. No device ships a Sanskrit voice, so this
   prefers a Hindi (or other Devanagari-script) voice reading the text in Devanagari. Without one, it reads
   the English pronunciation respelling with the default voice. */
import {toDeva, toDevaSyllables} from './translit.js';

export const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
let voice = null;
function pick() {
  const vs = speechSynthesis.getVoices();
  voice = vs.find(v => /^sa\b/i.test(v.lang)) || vs.find(v => /^hi\b/i.test(v.lang)) || vs.find(v => /^(mr|ne)\b/i.test(v.lang)) || null;
}
if (canSpeak) { pick(); speechSynthesis.addEventListener && speechSynthesis.addEventListener('voiceschanged', pick); }

export const voiceName = () => voice ? voice.name : '';
export const speaking = () => canSpeak && (speechSynthesis.speaking || speechSynthesis.pending);
export const stop = () => { if (canSpeak) speechSynthesis.cancel(); };

/* lines: IAST text, one utterance each; respell: the English respelling of each line.
   style: 'syll' reads Devanagari syllable by syllable (keeps every vowel), 'natural' reads whole words,
   'english' reads the respelling. Without a Hindi voice the respelling is always used. */
export function speak(lines, respell, rate, style) {
  if (!canSpeak) return;
  speechSynthesis.cancel();
  const indic = voice && style !== 'english';
  lines.forEach((t, i) => {
    const u = new SpeechSynthesisUtterance(!indic ? respell[i] : style === 'natural' ? toDeva(t) : toDevaSyllables(t));
    if (indic) { u.voice = voice; u.lang = voice.lang; } else u.lang = 'en-US';
    u.rate = rate;
    speechSynthesis.speak(u);
  });
}
