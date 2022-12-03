import { createLineReader } from "../_utils/fileIo.js";
const TEXT_FILE = "./input.txt";

function calculatePriorityValue(letter: string): number {
  const asciiValue = letter.charCodeAt(0);

  let priority: number;
  if (asciiValue >= 65 && asciiValue <= 90) {
    priority = asciiValue - 38;
  } else if (asciiValue >= 97 && asciiValue <= 122) {
    priority = asciiValue - 96;
  } else {
    throw new RangeError(`Provided char ${letter} is not a letter`);
  }

  return priority;
}

function findSharedBadge(rucksackTrio: string[]): string {
  const sack1Set = new Set(rucksackTrio[0] as string);
  const sack2Set = new Set(rucksackTrio[1] as string);

  for (const char of rucksackTrio[2] as string) {
    if (sack1Set.has(char) && sack2Set.has(char)) {
      return char;
    }
  }

  throw new Error(
    `No shared badge found among lines\n${rucksackTrio.join("\n")}`
  );
}

const lineReader = createLineReader(import.meta.url, TEXT_FILE);
let prioritySum = 0;
const rucksackTrio: string[] = [];

let index = -1;
for await (const line of lineReader) {
  index++;

  const mod = index % 3;
  rucksackTrio[mod] = line;

  if (mod === 2) {
    prioritySum += calculatePriorityValue(findSharedBadge(rucksackTrio));
  }
}

console.log(
  `The sum of all priority values among the duplicate items is ${prioritySum}`
);
