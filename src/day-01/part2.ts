import fs from "fs";
import readline from "readline";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const inputStream = fs.createReadStream(path.resolve(__dirname, "./input.txt"));
const lineReader = readline.createInterface({
  input: inputStream,
  terminal: false,
});

const topThree: number[] = [];

function updateTopThree(topThree: number[], newEntry: number): void {
  if (topThree.length < 3) {
    topThree.push(newEntry);
    if (topThree.length === 3) {
      topThree.sort((a, b) => a - b);
    }

    return;
  }

  for (let i = topThree.length - 1; i >= 0; i--) {
    if (newEntry <= (topThree[i] as number)) {
      continue;
    }

    for (let j = 0; j < i; j++) {
      topThree[j] = topThree[j + 1] as number;
    }

    topThree[i] = newEntry;
    break;
  }
}

let current = 0;
let index = -1;
for await (const line of lineReader) {
  index++;

  if (line === "") {
    updateTopThree(topThree, current);
    current = 0;
    continue;
  }

  const int = parseInt(line, 10);
  if (Number.isInteger(int)) {
    current += int;
  } else {
    throw new Error(
      `Provided value ${line} on line ${index} is not in valid format`
    );
  }
}

console.log(topThree.reduce((x, y) => x + y, 0));
