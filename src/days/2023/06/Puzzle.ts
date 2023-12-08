import { product, splitLines } from "../../../common";
import type { Puzzle } from "../../../common";

export const puzzle: Puzzle<number> = {
  computePart1(input) {
    const lines = splitLines(input);

    const times = Array.from(lines[0].matchAll(/(\d+)/g)).map((m) => parseInt(m[0], 10));
    const distances = Array.from(lines[1].matchAll(/(\d+)/g)).map((m) => parseInt(m[0], 10));

    const waysToBeat = times.map((time, i) => computeWaysToBeatRecord(time, distances[i]));

    return product(waysToBeat.values());
  },

  part1Answer: 275724,

  computePart2(input) {
    return this.computePart1(input.replaceAll(" ", ""));
  },

  part2Answer: 37286485,
};

function computeWaysToBeatRecord(raceTime: number, recordDistance: number) {
  let waysToBeat = 0;

  for (let i = 0; i <= raceTime; i++) {
    const distance = computeDistance(raceTime, i);
    if (distance > recordDistance) {
      waysToBeat++;
    }
  }

  return waysToBeat;
}

function computeDistance(raceTime: number, holdTime: number) {
  const runTime = raceTime - holdTime;
  return runTime * holdTime;
}
