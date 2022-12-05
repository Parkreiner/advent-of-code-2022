import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

export type RelativeTxtPath = `./${string}.txt`;

export function getAbsolutePath(metaUrl: string, relativePath: string): string {
  const __dirname = path.dirname(fileURLToPath(metaUrl));
  return path.resolve(__dirname, relativePath);
}

export function createLineReader(
  metaUrl: string,
  relativePath: string
): readline.Interface {
  return readline.createInterface({
    input: fs.createReadStream(getAbsolutePath(metaUrl, relativePath)),
    terminal: false,
  });
}
