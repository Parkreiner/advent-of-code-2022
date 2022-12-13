import { getAbsolutePath, RelativeTxtPath } from "../_utils/fileIo.js";
import { readFile } from "fs/promises";
const FILE_NAME = "./input.txt" satisfies RelativeTxtPath;

const instructionMatcher = /move (\d+) from (\d+) to (\d+)/i;
const bracketMatcher = /[\[\]]/g;

function parseStackLines(lines: readonly string[]): Map<string, string[]> {
  if (lines.length < 2) {
    throw new Error("Crate input needs at least two lines");
  }

  const labels = lines.at(-1)?.trim().split(/\s+/);
  if (!labels) {
    throw new Error(`Unable to create entries from label line`);
  }

  const mapEntries = labels.map((l): [string, string[]] => [l, []]);
  for (let i = lines.length - 2; i >= 0; i--) {
    const line = lines[i] as string;

    for (const [index, entry] of mapEntries.entries()) {
      const stack = entry[1];
      const offset = index * 4;

      const crate = line.slice(offset, offset + 3).trim();
      if (crate) {
        stack.push(crate);
      }
    }
  }

  return new Map(mapEntries);
}

const textInput = (
  await readFile(getAbsolutePath(import.meta.url, FILE_NAME))
).toString();

const [stackLines, instructionLines] = textInput
  .split("\n\n")
  .map((txt) => txt.split("\n"));

if (!stackLines || !instructionLines) {
  throw new Error("Unable to parse stacks/instructions from input");
}

const allStacks = parseStackLines(stackLines);

for (const line of instructionLines) {
  if (!line) continue;

  const [, rawQty, source, target] = instructionMatcher.exec(line) ?? [];
  if (rawQty == null || source == null || target == null) {
    throw new Error("Unable to parse full data from text line");
  }

  const quantity = parseInt(rawQty, 10);

  const sourceStack = allStacks.get(source);
  if (!sourceStack) {
    throw new Error(`Source stack does not exist for key ${source}`);
  }

  const targetStack = allStacks.get(target);
  if (!targetStack) {
    throw new Error(`Target stack does not exist for key ${target}`);
  }

  for (let i = 0; i < quantity; i++) {
    const popped = sourceStack.pop();
    if (!popped) throw new Error("Popping more crates than available in stack");

    targetStack.push(popped);
  }
}

const topCrates = Array.from(allStacks, ([, stack]) =>
  stack.at(-1)?.replace(bracketMatcher, "")
).join("");

console.log(`The top crates are ${topCrates}`);
