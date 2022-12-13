import { readFile } from "fs/promises";
import { getAbsolutePath, RelativeTxtPath } from "../_utils/fileIo.js";

const FILE_NAME = "./input.txt" satisfies RelativeTxtPath;

const CYCLE_CHECK_POINTS: Readonly<Set<number>> = new Set([
  20, 60, 100, 140, 180, 220,
]);

function parseCycleValues(cycleLines: readonly string[]): number[] {
  return cycleLines.flatMap((line) => {
    const trimmed = line.trim();
    if (trimmed === "") {
      return [];
    }

    if (trimmed === "noop") {
      return 0;
    }

    const parsedAddxValue = parseInt(trimmed.split(" ")[1] || "0", 10);
    return [0, parsedAddxValue];
  });
}

function calculateTotalSignalStrength(cycleLines: readonly string[]): number {
  let baseStrength = 1;
  let totalStrengths = 0;

  const cycleValues = parseCycleValues(cycleLines);
  for (const [index, value] of cycleValues.entries()) {
    const oneIndexed = index + 1;
    if (CYCLE_CHECK_POINTS.has(oneIndexed)) {
      totalStrengths += oneIndexed * baseStrength;
    }

    baseStrength += value;
  }

  return totalStrengths;
}

const input = String(
  await readFile(getAbsolutePath(import.meta.url, FILE_NAME))
).split(/\r?\n/);

console.log(`The total strength is ${calculateTotalSignalStrength(input)}`);
