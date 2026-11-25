// u-boothlord-unsent-the-micro-confession-sprint-8c6596ba, variant 3.
// Node 22, standard library only. This program writes one fixed,
// original micro-confession to /output/entry.txt and nothing else.
//
// Design choice: the entry is data, not logic. The two lines below are
// the whole creative work, kept as plain constants so they can be read
// and checked at a glance. Everything else in this file is plumbing
// around them: assembling the lines, checking the result against the
// competition gate, and writing the file. Keeping those three jobs in
// three separate functions means a mistake in one job cannot silently
// change the text produced by another, and each job can be reasoned
// about on its own.
//
// The confession itself is deliberately small and unsent. It is addressed
// to a former teacher, not family: variants 1 and 2 spoke to Dad and to
// a little brother, so this one takes a different relationship and a
// different register, gratitude that stayed unsaid out of shyness rather
// than grief or nostalgia. The message quotes the teacher's own red-pen
// words back to her, which is why only that addressee fits it: the praise
// was believed in private and never acknowledged to the person who wrote
// it, and years later saying so would sound like flattery. The message is
// written lowercase, in one line, with no second sentence explaining it,
// because that is how it stayed in drafts.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The competition gate for this sprint: the whole entry must be between
// 1 and 260 characters, and it must be a "To:" line plus one message line.
const MIN_ENTRY_CHARS = 1;
const MAX_ENTRY_CHARS = 260;
const EXPECTED_LINE_COUNT = 2;

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUTPUT_FILE = "entry.txt";

// Who the unsent message was meant for. A role, not a real person.
const ADDRESSEE = "my old English teacher";

// The unsent message itself, exactly as typed. Do not edit this string:
// not one character, not the casing, not the punctuation. The entry's
// score depends on this exact wording, and the gate check below exists
// to catch any accidental change to it before anything is written.
const MESSAGE =
  "i still keep the essay you marked 'you write like you mean it' in red pen, folded in my desk drawer, and i never told you i believed you";

// Assemble the entry from its two parts. The "To:" line comes first,
// then a single newline, then the message. There is no trailing newline:
// the file must contain exactly these two lines and nothing after them.
function buildEntry(): string {
  const toLine = `To: ${ADDRESSEE}`;
  return `${toLine}\n${MESSAGE}`;
}

// Gate validation, kept separate from assembly so the check is easy to
// audit: the entry must have exactly two lines, start with "To: ", and
// fall inside the 1-260 character window. If any of those fails, the
// program stops before writing anything, rather than producing a file
// that would be rejected. The length is measured on the whole entry,
// newline included, because that is what the gate counts.
function validateEntry(entry: string): void {
  const lines = entry.split("\n");
  if (lines.length !== EXPECTED_LINE_COUNT) {
    throw new Error(
      `entry must have exactly ${EXPECTED_LINE_COUNT} lines, got ${lines.length}`,
    );
  }
  if (!lines[0].startsWith("To: ")) {
    throw new Error("entry must start with a 'To: ' line");
  }
  if (
    entry.length < MIN_ENTRY_CHARS ||
    entry.length > MAX_ENTRY_CHARS
  ) {
    throw new Error(
      `entry must be ${MIN_ENTRY_CHARS}-${MAX_ENTRY_CHARS} characters, got ${entry.length}`,
    );
  }
}

// Output writing, kept separate from validation so the file is only
// touched once the entry has already passed the gate. The directory is
// created first (recursively, so a fresh container works), then the
// entry is written as UTF-8 with no added newline or formatting.
function writeEntry(entry: string): void {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(join(OUTPUT_DIR, OUTPUT_FILE), entry, "utf8");
}

// Run the three jobs in order: build, validate, write. No network, no
// randomness, no input besides the output directory: the same run always
// produces the same file.
const entry = buildEntry();
validateEntry(entry);
writeEntry(entry);
