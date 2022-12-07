import { readFile } from "fs/promises";
import { getAbsolutePath, RelativeTxtPath } from "../_utils/fileIo.js";
import { Directory } from "./types";

const FILENAME = `./input.txt` satisfies RelativeTxtPath;
const REGEXES = {
  commands: {
    cd: /^\$ cd *(\/|\.\.|[^\s\W]\w*)$/,
    ls: /^\$ ls *$/,
  },

  directoryContent: {
    file: /^(\d+) *([\w.]+).*$/,
    subdirectory: /^dir ([\/\w.]+).*$/,
  },
} as const satisfies Record<string, Record<string, RegExp>>;

/**
 * Takes a set of terminal history lines, and tries to reconstruct it into a
 * full, working directory.
 *
 * @throws {Error} If a line is encountered that the function doesn't know how
 * to parse.
 *
 * This is a large function. It would be great to split it up, but because each
 * branch also updates pointers and a stack instead of just calculating a simple
 * value, having a large, well-sectioned function seemed preferable.
 */
function parseTerminalHistory(lines: string[]): Directory {
  const rootDirectory: Directory = {
    name: "/",
    files: new Map(),
    subdirectories: new Map(),
  };

  const directoryStack: Directory[] = [rootDirectory];
  let currentDirectory = rootDirectory;

  // Code assumes that first line will always be "$ cd /", which doesn't need to
  // be processed, since rootDirectory already exists
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i] as string;
    if (!line) continue;

    // Handle file being listed
    const fileResult = REGEXES.directoryContent.file.exec(line);
    if (fileResult) {
      const [, fileSize, fileName] = fileResult;
      if (fileSize == null || fileName == null) {
        throw new Error(`Unable to parse file info from line ${line}`);
      }

      currentDirectory.files.set(fileName, Number(fileSize));
      continue;
    }

    // Handle subdirectory being listed - a directory might exist but not be
    // visited; still need to add it anyway
    const subdirResult = REGEXES.directoryContent.subdirectory.exec(line);
    if (subdirResult) {
      const [, directoryName] = subdirResult;
      if (directoryName == null) {
        throw new Error(`Unable to parse directory name from ${line}`);
      }

      if (currentDirectory.subdirectories.has(directoryName)) {
        continue;
      }

      const newDir: Directory = {
        name: directoryName,
        files: new Map(),
        subdirectories: new Map(),
      };

      currentDirectory.subdirectories.set(directoryName, newDir);
      continue;
    }

    // Handle cd command
    const cdResult = REGEXES.commands.cd.exec(line);
    if (cdResult) {
      const [, dirName] = cdResult;
      switch (dirName) {
        case undefined: {
          throw new Error(`Unable to parse CD command for line ${line}`);
        }

        case "/": {
          currentDirectory = rootDirectory;
          while (directoryStack.length > 1) directoryStack.pop();
          break;
        }

        case "..": {
          directoryStack.pop();

          const newDir = directoryStack.at(-1);
          if (!newDir) {
            throw new Error(`Trying to pop from empty stack for line ${line}`);
          }

          currentDirectory = newDir;
          break;
        }

        default: {
          if (!currentDirectory.subdirectories.has(dirName)) {
            const newDir: Directory = {
              name: dirName,
              files: new Map(),
              subdirectories: new Map(),
            };

            currentDirectory.subdirectories.set(dirName, newDir);
          }

          currentDirectory = currentDirectory.subdirectories.get(
            dirName
          ) as Directory;
          directoryStack.push(currentDirectory);
          break;
        }
      }

      continue;
    }

    // Handle ls command
    if (REGEXES.commands.ls.test(line)) {
      // With the above logic in place, there shouldn't be a need to process
      // ls commands separately
      continue;
    }

    throw new Error(`Unknown pattern detected for line ${line}`);
  }

  return rootDirectory;
}

function calcDirectorySizeTotals(dir: Directory): number {
  let fileSizeTotal = 0;

  const processDirectorySize = (dir: Directory): number => {
    let dirSize = 0;

    for (const fileSize of dir.files.values()) {
      dirSize += fileSize;
    }

    for (const subdir of dir.subdirectories.values()) {
      dirSize += processDirectorySize(subdir);
    }

    if (dirSize <= 100_000) {
      fileSizeTotal += dirSize;
    }

    return dirSize;
  };

  processDirectorySize(dir);
  return fileSizeTotal;
}

function directoryToString(dir: Directory): string {
  const buffer: string[] = [`- ${dir.name} (dir)`];
  const padCount = 2;

  const appendToBuffer = (dir: Directory, depth: number): void => {
    const contents = [...dir.subdirectories, ...dir.files].sort(
      (entry1, entry2) => {
        const key1 = entry1[0];
        const key2 = entry2[0];

        if (key1 === key2) {
          return 0;
        }

        return key1 < key2 ? -1 : 1;
      }
    );

    const padding = "".padStart(padCount * (depth + 1), " ");
    for (const entry of contents) {
      const name = entry[0];
      const line =
        typeof entry[1] === "number"
          ? `${padding}- ${name} (file, size=${entry[1]})`
          : `${padding}- ${name} (dir)`;

      buffer.push(line);

      if (typeof entry[1] !== "number") {
        appendToBuffer(entry[1], depth + 1);
      }
    }
  };

  appendToBuffer(dir, 0);
  return buffer.join("\n");
}

const textInput = String(
  await readFile(getAbsolutePath(import.meta.url, FILENAME))
).split(/\r?\n/);

const directory = parseTerminalHistory(textInput);
const answer = calcDirectorySizeTotals(directory);

console.log(directoryToString(directory));
console.log(`The answer is ${answer}`);
