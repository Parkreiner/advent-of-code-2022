/**
 * @todo Flesh out the updatePositions and areRopesTouching methods
 */
import { readFile } from "fs/promises";
import { getAbsolutePath, RelativeTxtPath } from "../_utils/fileIo.js";

const fileName = "./example.txt" satisfies RelativeTxtPath;

const directions = ["u", "d", "l", "r"] as const;
type Direction = typeof directions[number];
type GridCoordinate = [x: number, y: number];
type GridSpace = { visited: boolean };

function assertIsDirection(value: unknown): asserts value is Direction {
  if (typeof value !== "string" || !directions.includes(value as Direction)) {
    throw new Error("Parsed value is not a direction.");
  }
}

function assertIsStep(value: unknown): asserts value is number {
  if (!Number.isInteger(value) || (value as number) <= 0) {
    throw new Error(`Parsed value ${value} is not a valid step.`);
  }
}

class RopeSimulation {
  grid: GridSpace[][];
  head: GridCoordinate;
  tail: GridCoordinate;

  constructor(gridSize: number) {
    if (!Number.isInteger(gridSize) || gridSize < 1) {
      throw new Error(`Provided size ${gridSize} is not a valid integer`);
    }

    this.grid = new Array<GridSpace[]>(gridSize);
    for (let i = 0; i < gridSize; i++) {
      const newRow = new Array<GridSpace>(gridSize);

      for (let j = 0; j < gridSize; j++) {
        const atBottomLeftCorner = j === 0 && i === gridSize - 1;
        newRow[j] = { visited: atBottomLeftCorner };
      }

      this.grid[i] = newRow;
    }

    this.head = [0, gridSize - 1];
    this.tail = [0, gridSize - 1];
  }

  processLines(lines: string[]): void {
    for (const line of lines) {
      const [direction, rawSteps] = line.split(" ");
      const steps = parseInt(rawSteps || "", 10);

      assertIsDirection(direction);
      assertIsStep(steps);

      for (let i = 0; i < steps; i++) {
        this.updatePositions(direction);
      }
    }
  }

  areRopePartsTouching(): boolean {
    const touchingX = false;
    const touchingY = false;
    const touchingDiagonal = false;

    return touchingX || touchingY || touchingDiagonal;
  }

  updatePositions(dir: Direction): void {
    switch (dir) {
      case "u": {
        this.head[1]++;
        if (this.areRopePartsTouching()) break;

        break;
      }

      case "d": {
        this.head[1]--;
        break;
      }

      case "l": {
        this.head[0]--;
        break;
      }

      case "r": {
        this.head[0]++;
        break;
      }

      default: {
        throw new Error(`Provided value ${dir} is not a direction`);
      }
    }
  }

  countVisited(): number {
    const addIfVisited = (prevSum: number, gs: GridSpace) => {
      return prevSum + (gs.visited ? 1 : 0);
    };

    return this.grid.reduce((sum, row) => row.reduce(addIfVisited, sum), 0);
  }
}

const lines = String(
  await readFile(getAbsolutePath(import.meta.url, fileName))
).split(/\r?\n/);

const sim = new RopeSimulation(5);
sim.processLines(lines);

const spacesVisited = sim.countVisited();
console.log(`The tail ended up visiting ${spacesVisited} spaces.`);
