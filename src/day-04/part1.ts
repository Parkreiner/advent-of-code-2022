import { createLineReader } from "../_utils/fileIo.js";
const FILE_NAME = "./input.txt";

type Assignment = [number, number];

function isInt(value: unknown): value is number {
  return Number.isInteger(value);
}

function isFullOverlap(a1: Assignment, a2: Assignment): boolean {
  const a1InsideA2 = a1[0] >= a2[0] && a1[1] <= a2[1];
  const a2InsideA1 = a2[0] >= a1[0] && a2[1] <= a1[1];

  return a1InsideA2 || a2InsideA1;
}

function toAssignment(range: string): Assignment {
  const [start, end] = range.split("-").map((char) => parseInt(char, 10));

  if (!isInt(start) || !isInt(end)) {
    throw new Error(`Range ${range} is malformed (missing full start/end)`);
  }

  if (end < start) {
    throw new Error(
      `Range ${range} is malformed (end ${end} less than start ${start})`
    );
  }

  return [start, end];
}

function parseIntoAssignments(line: string): [Assignment, Assignment] {
  const sectionRanges = line.split(",");
  if (sectionRanges.length !== 2) {
    throw new Error(
      `Input ${line} is malformed and lacks two full assignments`
    );
  }

  return sectionRanges.map(toAssignment) as [Assignment, Assignment];
}

const lineReader = createLineReader(import.meta.url, FILE_NAME);

let lineIndex = 0;
let fullOverlapCount = 0;

try {
  for await (const line of lineReader) {
    lineIndex++;
    if (!line) continue;

    if (isFullOverlap(...parseIntoAssignments(line))) {
      fullOverlapCount++;
    }
  }
} catch (err: unknown) {
  console.log(`Encountered error ${err} on line ${lineIndex}`);
}

console.log(
  `After processing ${lineIndex} lines, there were ${fullOverlapCount} assignments with full overlaps`
);
