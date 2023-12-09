import { splitLines, sum } from "../../../common";
import type { Puzzle } from "../../../common";

export const puzzle: Puzzle<number> = {
  computePart1(input) {
    return run(
      input,
      (vs) => vs.at(-1)!,
      (endValue, diff) => endValue + diff,
    );
  },
  part1Answer: 1819125966,

  computePart2(input) {
    return run(
      input,
      (vs) => vs.at(0)!,
      (endValue, diff) => endValue - diff,
    );
  },
  part2Answer: 1140,
};

function run(
  input: string,
  getEndValue: (values: number[]) => number,
  compute: (endValue: number, difference: number) => number,
) {
  const lines = splitLines(input);
  const numbers = lines.map((line) => line.split(" ").map((t) => parseInt(t, 10)));

  return sum(numbers.map((ns) => getNextDifference(ns, getEndValue, compute)).values());
}

function getNextDifference(
  values: number[],
  getEndValue: (values: number[]) => number,
  compute: (endValue: number, difference: number) => number,
): number {
  if (values.every((v) => v === 0)) {
    return 0;
  }

  const differences = diff(values);

  const endValue = getEndValue(values);
  const nextSubDifference = getNextDifference(differences, getEndValue, compute);
  return compute(endValue, nextSubDifference);
}

function diff(numbers: number[]): number[] {
  let previousNumber: number | undefined;

  const result: number[] = [];

  for (const n of numbers) {
    if (previousNumber !== undefined) {
      result.push(n - previousNumber);
    }
    previousNumber = n;
  }

  return result;
}
