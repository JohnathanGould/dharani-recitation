/* Record yourself with the microphone. Takes live only in memory for this visit. */
export const canRecord = !!(typeof navigator !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia && typeof MediaRecorder !== 'undefined');
const takes = {};
let rec = null, stream = null, chunks = [], recKey = null;

export const recording = () => recKey;
export const take = key => takes[key] || null;
export function drop(key) { if (takes[key]) { URL.revokeObjectURL(takes[key]); delete takes[key]; } }

export async function start(key) {
  if (rec) await stop();
  stream = await navigator.mediaDevices.getUserMedia({audio: true});
  chunks = []; recKey = key;
  rec = new MediaRecorder(stream);
  rec.ondataavailable = e => { if (e.data && e.data.size) chunks.push(e.data); };
  rec.start();
}
export function stop() {
  return new Promise(resolve => {
    if (!rec) return resolve(null);
    const key = recKey, r = rec;
    r.onstop = () => {
      const blob = new Blob(chunks, {type: r.mimeType || 'audio/webm'});
      if (takes[key]) URL.revokeObjectURL(takes[key]);
      takes[key] = URL.createObjectURL(blob);
      stream.getTracks().forEach(t => t.stop());
      rec = null; stream = null; recKey = null;
      resolve(takes[key]);
    };
    r.stop();
  });
}
