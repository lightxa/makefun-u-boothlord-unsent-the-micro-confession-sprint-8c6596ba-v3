// u-boothlord-unsent-the-micro-confession-sprint-8c6596ba entry, variant 3
// (Node 22, standard library only): it writes one fixed, original
// micro-confession to /output/entry.txt. The confession is two parts: a To:
// line naming who the unsent message was meant for, and the message itself,
// one line written exactly as it was typed, with no explanation after it.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The addressee. A role, not a real person: the message below only makes
// sense sent to her, because it quotes her own red-pen words back to her.
// Deliberately not family: variants 1 and 2 were Dad and a little brother,
// so this one takes a former teacher, and a different register — gratitude
// that stayed unsaid out of shyness, not grief or nostalgia.
const TO_LINE = 'To: my old English teacher';

// The unsent message itself, one line, exactly as typed: lowercase, no
// polish, no second sentence explaining it. It stayed in drafts because it
// is too shy to say out loud — the praise was believed in private and never
// acknowledged to the person who wrote it, and years later saying so would
// sound like flattery. Swapping the addressee breaks it: only that teacher
// marked that essay in red pen with those words.
const MESSAGE =
  "i still keep the essay you marked 'you write like you mean it' in red pen, folded in my desk drawer, and i never told you i believed you";

const ENTRY = TO_LINE + '\n' + MESSAGE;

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), ENTRY, 'utf8');
