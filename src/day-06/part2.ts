import { RelativeTxtPath, getAbsolutePath } from "../_utils/fileIo.js";
import * as fs from "fs/promises";
const FILE_NAME = "./input.txt" satisfies RelativeTxtPath;

function findLengthToPacketStart(windowSize: number, buffer: string): number {
  let windowStartIndex = 0;

  let windowEndIndex = windowSize - 1;
  for (; windowEndIndex < buffer.length; windowEndIndex++) {
    const uniqueCharacters = new Set(
      buffer.slice(windowStartIndex, windowEndIndex + 1)
    );

    if (uniqueCharacters.size === windowSize) {
      break;
    }

    windowStartIndex++;
  }

  return windowEndIndex + 1;
}

const inputBuffer = (
  await fs.readFile(getAbsolutePath(import.meta.url, FILE_NAME))
).toString();

console.log(findLengthToPacketStart(14, inputBuffer));
