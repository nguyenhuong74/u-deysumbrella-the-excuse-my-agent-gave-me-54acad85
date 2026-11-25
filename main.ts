/**
 * The Excuse My Agent Gave Me — entry program.
 *
 * Writes one original excuse line to /output/entry.txt. The line is held
 * as a constant, validated against the competition gate (UTF-8 text of
 * 1 to 200 characters, not only whitespace), and written with no trailing
 * newline, so the output is byte-identical on every run. No dependencies,
 * no network, no randomness.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The one excuse this entry submits: a straight-faced apology whose joke
// grows out of the machine's own condition — a hallucinated calendar.
const LINE =
  "Sorry \u2014 my calendar hallucinated a thirteenth month, and I filed your deadline there. It is, technically, still on time.";

const OUT_DIR = process.env.OUTPUT_DIR ?? "/output";

/** The competition gate: 1..200 characters, not only whitespace. */
function validate(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry must be 1..200 characters, got ${chars}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

function main(): void {
  validate(LINE);
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(join(OUT_DIR, "entry.txt"), LINE, "utf8");
}

main();
