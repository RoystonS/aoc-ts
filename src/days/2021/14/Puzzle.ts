import { assertDefinedAndNotNull, max, min, splitLines } from "../../../common";
import type { Puzzle } from "../../../common";

export const puzzle: Puzzle = {
  computePart1(input) {
    return runPolymerization(input, 10);
  },
  part1Answer: "4244",

  computePart2(input) {
    return runPolymerization(input, 40);
  },
  part2Answer: "4807056953866",
};

interface Data {
  elementCounts: Map<string, number>;
  pairCounts: Map<string, number>;
  rules: Map<string, string>;
}

function runPolymerization(input: string, steps: number) {
  let data = parse(input);

  for (let i = 0; i < steps; i++) {
    data = polymeriseChain(data);
  }

  const minimum = min(data.elementCounts.entries(), compareCounts);
  const maximum = max(data.elementCounts.entries(), compareCounts);

  return (maximum[1] - minimum[1]).toString();
}

function parse(input: string): Data {
  const lines = splitLines(input);

  const initialString = lines[0];

  const elementCounts = new Map<string, number>();
  for (const element of initialString) {
    elementCounts.set(element, (elementCounts.get(element) ?? 0) + 1);
  }

  const pairCounts = new Map<string, number>();
  for (let i = 0; i < initialString.length - 1; i++) {
    inc(pairCounts, initialString[i] + initialString[i + 1], 1);
  }

  const rules = new Map(
    lines.slice(2).map((line) => {
      const match = line.match(/(.*) -> (.*)/);
      assertDefinedAndNotNull(match);
      const [, input, output] = match;

      return [input, output];
    }),
  );

  return { pairCounts, elementCounts, rules };
}

function polymeriseChain(data: Data): Data {
  const newPairCounts = new Map<string, number>();
  const newElementCounts = new Map(data.elementCounts);

  const rules = data.rules;

  for (const [pair, count] of data.pairCounts) {
    const newElement = rules.get(pair);
    if (newElement) {
      const newPair1 = `${pair[0]}${newElement}`;
      const newPair2 = `${newElement}${pair[1]}`;

      inc(newPairCounts, newPair1, count);
      inc(newPairCounts, newPair2, count);

      inc(newElementCounts, newElement, count);
    } else {
      inc(newPairCounts, pair, count);
    }
  }

  return { pairCounts: newPairCounts, elementCounts: newElementCounts, rules };
}

function inc<T>(map: Map<T, number>, key: T, delta = 1) {
  map.set(key, (map.get(key) ?? 0) + delta);
}

function compareCounts(
  [_e1, count1]: [string, number],
  [_e2, count2]: [string, number],
) {
  return count1 < count2 ? -1 : count1 > count2 ? 1 : 0;
}
