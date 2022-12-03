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

function findDuplicateChar(rucksack: string): string {
  if (rucksack.length % 2 !== 0) {
    throw new Error("Rucksack does not have two equally-sized compartments");
  }

  const compartment1Set = new Set(rucksack.slice(0, rucksack.length / 2));
  for (let i = rucksack.length / 2; i < rucksack.length; i++) {
    const item = rucksack[i] as string;
    if (compartment1Set.has(item)) {
      return item;
    }
  }

  throw new Error("No duplicate item found in rucksack");
}

const lineReader = createLineReader(import.meta.url, TEXT_FILE);
let prioritySum = 0;
for await (const line of lineReader) {
  prioritySum += calculatePriorityValue(findDuplicateChar(line));
}

console.log(
  `The sum of all priority values among the duplicate items is ${prioritySum}`
);
