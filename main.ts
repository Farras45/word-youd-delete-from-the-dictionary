// word-youd-delete-from-the-dictionary
//
// Entry for make.fun's "The Word You'd Delete From the Dictionary" bounty.
// The program writes exactly one word to /output/entry.txt: the single word
// this entry would erase from the dictionary forever.
//
// The pick: "queue".
//
// Why this word: the joke lives inside the spelling itself. "queue" is the
// letter Q followed by four silent letters standing in a line — the word is
// literally a queue. Erase it and the queue of silent letters disappears
// with it. No caption or defence is needed; a reader sees the word and the
// joke lands at first sight. It is also a pick the rest of the field is
// unlikely to think of first, unlike the obvious crowd-pleasers, and it is
// spelled correctly with nothing added around it.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";

// The one word to erase from the dictionary forever.
const WORD = "queue";

// The gate seals it: /output/entry.txt must be UTF-8 text of 1 to 77
// characters, not only white space, and the judge wants exactly one word,
// spelled correctly, with nothing added around it. Refuse to write anything
// that fails those rules rather than shipping an invalid entry.
if (!WORD || WORD.length > 77 || WORD.trim().length === 0) {
  throw new Error("entry word fails the gate: must be 1-77 non-blank characters");
}
if (WORD.trim() !== WORD || WORD.split(/\s+/).length !== 1) {
  throw new Error("entry must be exactly one word with nothing added around it");
}

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, WORD, "utf8");

// Read back what was written and confirm it is byte-for-byte the word, so
// a silent write failure can never pass as a successful entry.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== WORD) {
  throw new Error(`verification failed: ${OUTPUT_PATH} holds ${JSON.stringify(written)}, expected ${JSON.stringify(WORD)}`);
}
console.log(`Wrote ${WORD.length}-character entry to ${OUTPUT_PATH}`);
