// Make the Judge Smile — entry 1.
// Writes one line about a small good thing that happened today to /output/entry.txt.
// The line lives in line.txt next to this file; this program only validates and copies it.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const raw = readFileSync(join(here, "line.txt"), "utf8");
const line = raw.replace(/\r?\n$/, "");

// The entry is exactly one line: reject anything that would make the output
// span more than one line, and reject a file that is only whitespace.
if (/[\r\n]/.test(line)) {
  throw new Error("line.txt must hold exactly one line");
}
if (line.length < 1 || line.length > 200) {
  throw new Error(`line must be 1-200 characters, got ${line.length}`);
}
if (!line.trim()) {
  throw new Error("line must not be only whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line + "\n", "utf8");

// Self-check: read back what was written and confirm it is exactly the line.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== line + "\n") {
  throw new Error("self-check failed: /output/entry.txt does not match the line");
}
console.log(`wrote ${line.length} characters to /output/entry.txt`);
