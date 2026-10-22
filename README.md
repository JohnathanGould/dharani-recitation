# Dhāraṇī Recitation

A web app for learning the Great Compassionate Dhāraṇī (Nīlakaṇṭha Dhāraṇī) well enough to recite it
from memory. It teaches the 70 verses of a printed study document, in IAST, exactly as printed.

It installs on a phone or computer, works offline after the first visit, and keeps your progress on
your device.

## What it does

- **Learn**: every verse with pronunciation, word-by-word meanings and English. Long vowels are
  underlined and doubled consonants dotted, because holding them is most of what makes spoken Sanskrit
  sound right.
  Tap any Sanskrit word to highlight the English it becomes, or tap the English to find its Sanskrit.
  **Hear** reads a verse or word aloud with the device's speech voice: a Hindi voice reading the text
  converted to Devanagari (no device has a Sanskrit voice), or the English respelling where there is no
  Hindi voice. Slow or normal speed. It is a guide to the sounds, not a recording of a reciter.
- **Practice**: spaced repetition, one verse at a time. By default the cue is the verse before (with
  more lines when one line is not enough to tell where you are), and you **say** the verse aloud,
  reveal it, and rate yourself Missed, Shaky or Got it. You can also type answers, which are graded
  word by word against your document's text and accept plain letters and common respellings. Record yourself to hear how you sounded. A hint shows the English meaning with the first letters.
  After each verse, a **translation check** asks what it means: translate it (typed or in your head),
  then compare with the English and the word-by-word meanings and rate yourself. Typed translations get a
  rough check of which key words they cover. It can be turned off, and is skipped when the cue was the meaning.
  **Practice this verse** (on any verse) drills one verse on one card: say it aloud, write it from memory
  and have it graded, then rate how saying it went. The two count as one review, scheduled by the weaker.
- **Words**: a word learner with two decks. *Building blocks* are the 54 roots that recur (mahā = great,
  sarva = all, īśvara = lord…); *Words in the text* are the full glossed words. Multiple-choice quizzes in
  either direction, with their own spaced review, and every card shows the verses it appears in.
- **Recite**: *Build the chain* recites from a start verse to the end of your chain; a clean recital adds
  the next verse. Recitals are timed, you mark the verses you stumbled on, and the app shows where you
  stumble most and lets you practise that step.
- **Spelling**, **Sounds**: your current mistakes, and a guide to the IAST marks.

## Your progress

Progress is saved in the browser's local storage on each device. Use **Practice → Your progress →
Download backup** to save it as a file, and **Load backup** to restore it or move it to another
device. Recordings are not saved; they last until you close the page.

## Running it

It is plain HTML, CSS and JavaScript modules, with no build step.

```bash
npm start          # serves the folder at http://localhost:8080
npm test           # unit tests for grading, pronunciation and length marks
```

Any static web server works. The service worker needs `http://localhost` or HTTPS.

## Deploying

`.github/workflows/pages.yml` runs the tests and deploys to GitHub Pages on every push to `main`.
Turn Pages on once under **Settings → Pages → Build and deployment → Source: GitHub Actions**.

When online, the app always loads its newest files, so a deploy shows on the next open. When you change
which files the app uses, update the list in `sw.js` and bump its `VERSION`.

## Files

| Path | What it holds |
| --- | --- |
| `src/data.js` | The text, alternate readings, notes, word meanings and spelling notes |
| `src/app.js` | Views and interactions |
| `src/store.js` | Progress, spaced repetition, backups |
| `src/grade.js` | Matching typed answers against the text |
| `src/pron.js` | Pronunciation respelling and long-sound marking |
| `src/align.js` | Which words of each verse's English translate each Sanskrit word |
| `src/words.js` | The word learner's decks |
| `src/speech.js`, `src/translit.js` | Hear buttons: speech voice, and IAST to Devanagari |
| `src/recorder.js` | Recording yourself with the microphone |
| `sw.js`, `manifest.webmanifest`, `icons/` | Offline support and installing |
