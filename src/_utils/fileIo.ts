import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

export type RelativeTxtPath = `./${string}.txt`;

export function createLineReader(
  metaUrl: string,
  relativePath: string
): readline.Interface {
  const __dirname = path.dirname(fileURLToPath(metaUrl));
  const absolutePath = path.resolve(__dirname, relativePath);

  return readline.createInterface({
    input: fs.createReadStream(absolutePath),
    terminal: false,
  });
}
