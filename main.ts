// news-image-20261120 entry: the image beside this file IS the entry.
// This program copies entry.png into the grader's output directory.
// Node 22, standard library only, no network, fully deterministic.
//
// Outside the grader:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Inside the grader:   /output is the target (MAKEFUN_OUTPUT_DIR unset).

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const source = new URL("./entry.png", import.meta.url);
const target = join(outDir, "entry.png");
copyFileSync(source, target);

// Self-check: the copy must be byte-complete, or the entry is invalid.
const sourceBytes = statSync(source).size;
const bytes = statSync(target).size;
if (bytes !== sourceBytes) {
  throw new Error(`copy incomplete: ${bytes} of ${sourceBytes} bytes`);
}
console.log(`wrote ${target} (${bytes} bytes)`);
