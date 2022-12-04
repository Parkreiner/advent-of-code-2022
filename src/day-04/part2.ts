import { createLineReader, RelativeTxtPath } from "../_utils/fileIo.js";
const FILE_NAME = "./example.txt" satisfies RelativeTxtPath;

type Assignment = [number, number];

function isInt(value: unknown): value is number {
  return Number.isInteger(value);
}

function isPartialOverlap(aOne: Assignment, aTwo: Assignment): boolean {
  const a1StartOverlaps = aOne[0] >= aTwo[0] && aOne[0] <= aTwo[1];
  const a1EndOverlaps = aOne[1] >= aTwo[0] && aOne[1] <= aTwo[1];

  const a2StartOverlaps = aTwo[0] >= aOne[0] && aTwo[0] <= aOne[1];
  const a2EndOverlaps = aTwo[1] >= aOne[0] && aTwo[1] <= aOne[1];

  return a1StartOverlaps || a1EndOverlaps || a2StartOverlaps || a2EndOverlaps;
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
let overlapCount = 0;

try {
  for await (const line of lineReader) {
    lineIndex++;
    if (!line) continue;

    if (isPartialOverlap(...parseIntoAssignments(line))) {
      overlapCount++;
    }
  }

  console.log(
    `After processing ${lineIndex} lines, there were ${overlapCount} assignment(s) with partial overlaps`
  );
} catch (err: unknown) {
  console.error(`Encountered error on line ${lineIndex}: ${err}`);
}
