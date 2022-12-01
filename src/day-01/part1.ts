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

let max = -Infinity;
let current = 0;
let index = -1;

lineReader.on("line", (line) => {
  index++;

  if (line === "") {
    max = Math.max(max, current);
    current = 0;
    return;
  }

  const int = parseInt(line, 10);
  if (Number.isInteger(int)) {
    current += int;
  } else {
    throw new Error(
      `Provided value ${line} on line ${index} is not in valid format`
    );
  }
});

lineReader.on("close", () => console.log(max));
