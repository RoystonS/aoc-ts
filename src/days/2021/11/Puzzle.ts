import { splitLines } from "../../../common";
import type { Puzzle } from "../../../common";
import { Deque } from "../../../common/Deque";

export const puzzle: Puzzle = {
  computePart1(input) {
    const initialState = linesToArray(splitLines(input));
    const [totalFlashes, _] = runSteps(initialState, 100);

    return totalFlashes.toString();
  },
  part1Answer: "1719",

  computePart2(input) {
    const initialState = linesToArray(splitLines(input));
    const steps = runStepsUntilSynchronised(initialState);

    return steps.toString();
  },
  part2Answer: "232",
};

export function linesToArray(lines: string[]) {
  return lines.map((line) => line.split("").map((n) => parseInt(n, 10)));
}
export function arrayToLines(array: number[][]) {
  return array.map((inner) => inner.map((n) => n.toString()).join(""));
}

export function step(values: number[][]): [number, number[][]] {
  const rows = values.length;
  const cols = values[0].length;

  const flashedThisStep = createArray<boolean>(values.length, values[0].length);
  let flashesThisStep = 0;
  const outputValues = createArray<number>(values.length, values[0].length);

  const flashQueue = new Deque<[number, number]>();

  function increment(oldValue: number, row: number, col: number) {
    if (flashedThisStep[row][col]) {
      return;
    }

    let newValue = oldValue + 1;
    if (newValue > 9) {
      // Octopus is flashing
      newValue = 0;
      flashesThisStep++;
      flashedThisStep[row][col] = true;
      flashQueue.push([row, col]);
    }
    outputValues[row][col] = newValue;
  }

  for (let row = 0; row < rows; row++) {
    const rowData = values[row];
    for (let col = 0; col < cols; col++) {
      increment(rowData[col], row, col);
    }
  }

  while (!flashQueue.isEmpty) {
    const [row, col] = flashQueue.pop()!;

    for (let rowDelta = -1; rowDelta <= +1; rowDelta++) {
      for (let colDelta = -1; colDelta <= +1; colDelta++) {
        const r = row + rowDelta;
        const c = col + colDelta;

        if (
          r < 0 ||
          c < 0 ||
          r >= rows ||
          c >= cols ||
          (r === row && c === col)
        ) {
          continue;
        }

        increment(outputValues[r][c], r, c);
      }
    }
  }

  return [flashesThisStep, outputValues];
}

function createArray<T>(rows: number, columns: number): T[][] {
  return Array.from(new Array(rows), () => new Array(columns));
}

export function runSteps(
  state: number[][],
  count: number,
): [number, number[][]] {
  let totalFlashes = 0;
  for (let i = 0; i < count; i++) {
    const [flashesThisStep, afterStep] = step(state);
    state = afterStep;
    totalFlashes += flashesThisStep;
  }

  return [totalFlashes, state];
}

export function runStepsUntilSynchronised(state: number[][]): number {
  const rows = state.length;
  const cols = state[0].length;
  const totalOctopuses = rows * cols;

  let steps = 0;
  do {
    const [flashesThisStep, afterStep] = step(state);
    steps++;
    state = afterStep;

    if (flashesThisStep === totalOctopuses) {
      return steps;
    }
  } while (true);
}
