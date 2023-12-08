import { assertDefinedAndNotNull, splitLines } from "../../../common";
import type { Puzzle } from "../../../common";

export const puzzle: Puzzle<number> = {
  computePart1(input) {
    return run(input).maxHeight;
  },

  part1Answer: 11781,

  computePart2(input) {
    return run(input).totalGoodShots;
  },
  part2Answer: 4531,
};

function run(input: string) {
  const match = input.match(/target area: x=([-\d]+)\.\.([-\d]+), y=([-\d]+)\.\.([-\d]+)/);
  assertDefinedAndNotNull(match);
  const [, ...strs] = match;
  const [minX, maxX, minY, maxY] = strs.map((s) => parseInt(s, 10));

  let maxHeight = 0;
  let totalGoodShots = 0;

  for (let initialDx = 1; initialDx <= maxX; initialDx++) {
    for (let initialDy = minY; initialDy < Math.abs(maxY) * 2; initialDy++) {
      let x = 0,
        y = 0;
      let maxHeightForThisShot = y;

      let dx = initialDx,
        dy = initialDy;

      while (true) {
        if (x > maxX || y < minY) {
          break;
        }

        if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
          // Shot hit.
          totalGoodShots++;
          maxHeight = Math.max(maxHeight, maxHeightForThisShot);
          break;
        }

        x += dx;
        y += dy;

        maxHeightForThisShot = Math.max(maxHeightForThisShot, y);

        dy -= 1;
        if (dx > 0) {
          dx--;
        }
        if (dx < 0) {
          dx++;
        }
      }
    }
  }

  return { maxHeight, totalGoodShots };
}
