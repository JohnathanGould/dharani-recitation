/* Hear a verse or word with the device's own speech voice. No device ships a Sanskrit voice, so this
   prefers a Hindi (or other Devanagari-script) voice reading the text in Devanagari. Without one, it reads
   the English pronunciation respelling with the default voice. */
import {toDeva} from './translit.js';

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

/* lines: IAST text, one utterance each; respell: the English respelling of each line, for the fallback. */
export function speak(lines, respell, rate) {
  if (!canSpeak) return;
  speechSynthesis.cancel();
  lines.forEach((t, i) => {
    const u = new SpeechSynthesisUtterance(voice ? toDeva(t) : respell[i]);
    if (voice) { u.voice = voice; u.lang = voice.lang; } else u.lang = 'en-US';
    u.rate = rate;
    speechSynthesis.speak(u);
  });
}
