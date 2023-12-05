import { splitLines } from "../../../common";
import type { Puzzle } from "../../../common";
import * as os from "os";

export const puzzle: Puzzle = {
  computePart1(input) {
    const instructions = parse(input);

    runFolds(instructions.points, instructions.folds.slice(0, 1));

    const uniqueCoords = new Set(instructions.points.map(({ x, y }) => `${x},${y}`));

    return uniqueCoords.size.toString();
  },

  part1Answer: "942",

  computePart2(input) {
    const instructions = parse(input);

    runFolds(instructions.points, instructions.folds);

    return dumpPoints(instructions.points).join(os.EOL);
  },
  part2Answer: `
..##.####..##..#..#..##..###..###..###.
...#....#.#..#.#..#.#..#.#..#.#..#.#..#
...#...#..#....#..#.#..#.#..#.#..#.###.
...#..#...#.##.#..#.####.###..###..#..#
#..#.#....#..#.#..#.#..#.#....#.#..#..#
.##..####..###..##..#..#.#....#..#.###.`.trim(),
};

interface Instructions {
  points: Point[];
  folds: Fold[];
}

interface Point {
  x: number;
  y: number;
}

interface Fold {
  axis: "x" | "y";
  at: number;
}

function runFolds(points: Point[], folds: Fold[]) {
  for (const fold of folds) {
    // 0 1 2 3 4 5
    // folded at 4
    // 0 1 2 3 | 3
    // 6 7 8 9 10 11 12 13 14
    // 6 | 6 5  4  3  2  1  0
    // 6 - (10 - 7)
    // new position is fold-1 - ((x-fold)-1) == 2 * fold - x

    points.forEach((point) => {
      if (fold.axis === "x" && point.x >= fold.at) {
        point.x = fold.at * 2 - point.x;
      }
      if (fold.axis === "y" && point.y >= fold.at) {
        point.y = fold.at * 2 - point.y;
      }
      if (point.x < 0 || point.y < 0) {
        throw new Error("WRONG");
      }
    });
  }
}

function dumpPoints(points: Point[]): string[] {
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const point of points) {
    maxX = Math.max(maxX, point.x);
    maxY = Math.max(maxY, point.y);
  }

  const arr = Array.from(new Array(maxY + 1), () => new Array(maxX + 1).fill("."));

  for (const point of points) {
    arr[point.y][point.x] = "#";
  }

  return arr.map((l) => l.join(""));
}

export function parse(input: string): Instructions {
  const lines = splitLines(input);

  const points: Point[] = [];
  const folds: Fold[] = [];

  for (const line of lines) {
    const pointMatch = line.match(/(\d+),(\d+)/);
    if (pointMatch) {
      const [, xStr, yStr] = pointMatch;
      points.push({ x: parseInt(xStr, 10), y: parseInt(yStr, 10) });
      continue;
    }

    const foldMatch = line.match(/fold along (x|y)=(\d+)/);
    if (foldMatch) {
      const [, axis, atStr] = foldMatch;
      folds.push({ axis: axis as "x" | "y", at: parseInt(atStr, 10) });
    }
  }

  return {
    points,
    folds,
  };
}
