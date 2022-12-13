import { readFile } from "fs/promises";
import { getAbsolutePath, RelativeTxtPath } from "../_utils/fileIo.js";

/** "#" is a lit pixel, "." is an unlit pixel */
type Pixel = "#" | ".";

const FILE_NAME = "./input.txt" satisfies RelativeTxtPath;

function parseCycleValues(cycleLines: readonly string[]): readonly number[] {
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

function paintPixelsByCycle(cycleLines: readonly string[]): string {
  const lineWidth = 40;

  // Sprite starts off occupying pixels [0, 1, 2]
  let spriteMidpointPosition = 1;

  let currentCrtLine: Pixel[] = [];
  const crtDisplay: Pixel[][] = [currentCrtLine];

  const spriteInstructions = parseCycleValues(cycleLines);
  for (const [crtPaintIndex, spriteMove] of spriteInstructions.entries()) {
    const pixelPosition = crtPaintIndex % lineWidth;

    if (pixelPosition === 0 && crtPaintIndex > 0) {
      currentCrtLine = [];
      crtDisplay.push(currentCrtLine);
    }

    {
      const allSpritePositions = [
        spriteMidpointPosition - 1,
        spriteMidpointPosition,
        spriteMidpointPosition + 1,
      ];

      const newPixel = allSpritePositions.includes(pixelPosition) ? "#" : ".";
      currentCrtLine.push(newPixel);
    }

    spriteMidpointPosition += spriteMove;
  }

  return crtDisplay.map((line) => line.join("")).join("\n");
}

const input = String(
  await readFile(getAbsolutePath(import.meta.url, FILE_NAME))
).split(/\r?\n/);

console.log(`The CRT is displaying:\n${paintPixelsByCycle(input)}`);
