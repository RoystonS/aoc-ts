import { chain, filter, splitLines, lcm } from "../../../common";
import type { Puzzle } from "../../../common";

export const puzzle: Puzzle<number> = {
  computePart1(input) {
    return run(
      input,
      (node) => node === "AAA",
      (node) => node === "ZZZ",
      1,
    );
  },
  part1Answer: 16409,

  computePart2(input) {
    return run(
      input,
      (node) => node.endsWith("A"),
      (node) => node.endsWith("Z"),
      2,
    );
  },
  part2Answer: 11795205644011,
};

interface Data {
  instructions: string[];
  left: Map<string, string>;
  right: Map<string, string>;
}

function parse(input: string): Data {
  const lines = splitLines(input);

  const left = new Map<string, string>();
  const right = new Map<string, string>();

  lines.splice(2).forEach((l) => {
    const [sourceNode, leftNode, rightNode] = Array.from(l.matchAll(/([\dA-Z]+)/g)).map((m) => m[0]);

    left.set(sourceNode, leftNode);
    right.set(sourceNode, rightNode);
  });

  return { instructions: lines[0].split(""), left, right };
}

function run(
  input: string,
  startNodePredicate: (node: string) => boolean,
  endNodePredicate: (node: string) => boolean,
  part: number,
) {
  const data = parse(input);

  const allNodes = new Set(chain(data.left.keys(), data.left.values(), data.right.values()));
  const startNodes = Array.from(filter(allNodes.values(), startNodePredicate));
  const endNodes = new Set(filter(allNodes.values(), endNodePredicate));

  const repeatPeriods = startNodes.map((node) => getNodeFinishRepeatPeriod(node, data, endNodes, part === 2));
  return lcm(repeatPeriods.values());
}

/**
 * Determines how many steps it takes for a node to hit a terminal node.
 *
 * Note that in the general case, we may hit _a_ terminal node and then go off and hit different terminal nodes repeatedly, with
 * varying frequencies. It might take 1000 steps to hit the first terminal node, and then we might loop around between 6 other
 * terminal nodes every 50 steps.
 *
 * That's the general case, but the specific case in the AoC data is that we take N steps to
 * hit _a_ terminal node (where N happens to be an exact multiple of the input instructions length) and then we hit the
 * same terminal node (and no other nodes) every N steps.  That's a _very_ specific case, so, to avoid programming-by-coincidence,
 * we test that this actually appears to be the case by running through the loop 10 times.
 * This is a bit naff. I don't like this sort of 'trial-and-error' coding.
 */
function getNodeFinishRepeatPeriod(node: string, data: Data, endNodes: Set<string>, applySanityCheck: boolean) {
  let steps = 0;
  const endNodePositions: number[] = [];
  const endNodesHit = new Set<string>();

  const testLoops = 10;

  let done = false;

  while (true) {
    for (const direction of data.instructions) {
      steps++;
      node = direction === "L" ? data.left.get(node)! : data.right.get(node)!;
      if (endNodes.has(node)) {
        endNodesHit.add(node);
        endNodePositions.push(steps);
        if (endNodePositions.length > testLoops) {
          done = true;
          break;
        }
      }
    }
    if (done) {
      break;
    }
  }

  const firstLength = endNodePositions[0];
  if (endNodesHit.size !== 1) {
    throw new Error(`We're looping around multiple different terminal nodes.`);
  }

  if (applySanityCheck) {
    if (!endNodePositions.every((p, i) => p === (i + 1) * firstLength)) {
      console.error(endNodePositions);
      throw new Error("Our incredibly specific assumption isn't true for this data.");
    }
  }
  return firstLength;
}
