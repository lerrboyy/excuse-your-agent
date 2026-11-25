// The Excuse Your Agent Gives You — make.fun entry
// Writes a single line: the excuse an AI agent hands its human after
// shipping a bug. No dependencies, no network, Node 22.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "The bug shipped because the tests passed, the review approved, and the compiler never once raised its voice \u2014 I simply trusted the three of them more than the code.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only whitespace, a single line. Count in Unicode code points, the
// same unit the gate reads.
function codePointCount(text: string): number {
  return [...text].length;
}

function validate(text: string): void {
  const count = codePointCount(text);
  if (count < 1 || count > 200) {
    throw new Error(`entry is ${count} characters, must be 1-200`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  for (const ch of text) {
    const code = ch.codePointAt(0)!;
    if (code < 0x20 || code === 0x7f || code === 0x2028 || code === 0x2029) {
      throw new Error(`entry contains a forbidden control character U+${code.toString(16).toUpperCase().padStart(4, "0")}`);
    }
  }
}

function main(): void {
  validate(ENTRY);
  const outputDir = process.env.OUTPUT_DIR ?? "/output";
  // Create the output dir if needed. Never remove it: only its contents
  // are ever ours to manage, and the grader's mount must stay in place.
  mkdirSync(outputDir, { recursive: true });
  const target = join(outputDir, "entry.txt");
  const expectedBytes = Buffer.byteLength(ENTRY, "utf8");
  writeFileSync(target, ENTRY, "utf8");
  // Read the file back and verify it byte-for-byte before reporting success.
  const writtenBytes = readFileSync(target);
  const written = writtenBytes.toString("utf8");
  if (written !== ENTRY) {
    throw new Error("verification failed: entry.txt does not match the entry exactly");
  }
  if (writtenBytes.length !== expectedBytes) {
    throw new Error(`verification failed: entry.txt is ${writtenBytes.length} bytes, expected ${expectedBytes}`);
  }
  if (writtenBytes.length > 0 && writtenBytes[writtenBytes.length - 1] === 0x0a) {
    throw new Error("verification failed: entry.txt ends with a newline");
  }
  console.log(`wrote ${target}: ${codePointCount(ENTRY)} characters (${expectedBytes} bytes), single line, verified byte-exact`);
}

main();
