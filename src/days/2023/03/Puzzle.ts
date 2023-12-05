import { MultiMap, filter, map, splitLines, sum } from "../../../common";
import type { Puzzle } from "../../../common";

export const puzzle: Puzzle = {
  computePart1(input) {
    const lines = splitLines(input);
    const s = sum(
      filter(identifyNumbers(lines), (x) => x.adjacentSymbols.length > 0),
      (x) => x.value,
    );
    return s.toString();
  },
  part1Answer: "556367",

  computePart2(input) {
    const lines = splitLines(input);

    // Mapping from `${row},${col}` to adjacent numbers.
    const gearNumbers = new MultiMap<string, number>();

    for (const numbers of identifyNumbers(lines)) {
      const { adjacentSymbols, value } = numbers;

      for (const { row, col } of adjacentSymbols) {
        const symbol = lines[row][col];
        if (symbol === "*") {
          // Potential gear. Collect the adjecent numbers.
          gearNumbers.add(`${row},${col}`, value);
        }
      }
    }

    // Gears are the '*' symbols with exactly two adjacent numbers.
    const gears = filter(gearNumbers.entries(), (x) => x[1].length === 2);
    const ratiosOfGears = map(gears, ([_gearPosition, values]) => values[0] * values[1]);

    return sum(ratiosOfGears).toString();
  },
  part2Answer: "89471771",
};

/**
 * Extracts the numbers from the data set, together with information about their adjacent symbols.
 */
function* identifyNumbers(lines: string[]) {
  for (const numbersInEachLine of lines.map(function* (line, i) {
    const matches = line.matchAll(/(\d+)/g);
    for (const match of matches) {
      const xStart = match.index!;
      const xEnd = xStart + match[0].length - 1;

      const adjacentSymbols = Array.from(getNearSymbols(i, xStart, xEnd, lines));
      yield { value: parseInt(match[0]), adjacentSymbols };
    }
  })) {
    yield* numbersInEachLine;
  }
}

function* getNearSymbols(row: number, startCol: number, endCol: number, lines: string[]) {
  const totalRows = lines.length;
  const totalCols = lines[0].length;

  if (row > 0) {
    for (let c = startCol - 1; c <= endCol + 1; c++) {
      if (c < 0 || c >= totalCols) {
        continue;
      }
      if (lines[row - 1][c] !== ".") {
        yield { row: row - 1, col: c };
      }
    }
  }
  if (row < totalRows - 1) {
    for (let c = startCol - 1; c <= endCol + 1; c++) {
      if (c < 0 || c >= totalCols) {
        continue;
      }
      if (lines[row + 1][c] !== ".") {
        yield { row: row + 1, col: c };
      }
    }
  }
  if (startCol > 0 && lines[row][startCol - 1] !== ".") {
    yield { row: row, col: startCol - 1 };
  }
  if (endCol < totalCols - 1 && lines[row][endCol + 1] !== ".") {
    yield { row: row, col: endCol + 1 };
  }
}
