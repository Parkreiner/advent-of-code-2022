/**
 * @todo Code works with the example input, but not the true input.
 * Previous answers:
 *   - 1778 (too high)
 */
import { readFile } from "fs/promises";
import { getAbsolutePath, RelativeTxtPath } from "../_utils/fileIo.js";

const fileName = `./input.txt` satisfies RelativeTxtPath;

const textBuffer = await readFile(getAbsolutePath(import.meta.url, fileName));
const textInput = String(textBuffer)
  .split(/\r?\n/)
  .map((row) => row.split("").map(Number));

function countTreesOuterEdge(treeGrid: unknown[][]): number {
  if (treeGrid.length === 0) {
    return 0;
  }

  const topRowCount = treeGrid[0]?.length ?? 0;
  const leftColumnCount = treeGrid.length;

  return (topRowCount + leftColumnCount - 2) * 2;
}

const directions = ["up", "down", "left", "right"] as const;
function isVisibleFromDirection(
  treeX: number,
  treeY: number,
  direction: typeof directions[number],
  treeGrid: number[][]
): boolean {
  const treeHeight = treeGrid[treeY]?.[treeX] as number;
  let visible = true;

  switch (direction) {
    case "up": {
      for (let i = treeY - 1; i >= 0; i--) {
        const nextTree = treeGrid[i]?.[treeX] ?? -1;
        if (nextTree >= treeHeight) {
          visible = false;
          break;
        }
      }

      break;
    }

    case "down": {
      for (let i = treeY + 1; i < treeGrid.length; i++) {
        const nextTree = treeGrid[i]?.[treeX] ?? -1;
        if (nextTree >= treeHeight) {
          visible = false;
          break;
        }
      }

      break;
    }

    case "left": {
      for (let i = treeX - 1; i >= 0; i--) {
        const nextTree = treeGrid[treeY]?.[i] ?? -1;
        if (nextTree >= treeHeight) {
          visible = false;
          break;
        }
      }

      break;
    }

    case "right": {
      const row = treeGrid[treeY] as number[];
      for (let i = treeX + 1; i < row.length; i++) {
        const nextTree = treeGrid[treeY]?.[i] ?? -1;
        if (nextTree >= treeHeight) {
          visible = false;
          break;
        }
      }

      break;
    }

    default: {
      throw new Error(`Unkown direction ${direction} encountered`);
    }
  }

  return visible;
}

function countTreesInner(treeGrid: number[][]): number {
  let count = 0;

  for (let y = 1; y < treeGrid.length - 1; y++) {
    const row = treeGrid[y] as number[];

    for (let x = 1; x < row.length - 1; x++) {
      for (const direction of directions) {
        const visible = isVisibleFromDirection(x, y, direction, treeGrid);
        if (visible) {
          count++;
          break;
        }
      }
    }
  }

  return count;
}

const outerCount = countTreesOuterEdge(textInput);
const innerCount = countTreesInner(textInput);
const totalCount = countTreesOuterEdge(textInput) + countTreesInner(textInput);

console.log(`Outer count: ${outerCount}, Inner count: ${innerCount}`);
console.log(`The total number of visible trees is ${totalCount}`);
