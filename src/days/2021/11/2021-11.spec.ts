import { arrayToLines, linesToArray, puzzle, runSteps, step } from "./Puzzle";
import { readInput, splitLines } from "../../../common";

import * as os from "os";

const year = "2021";
const day = "11";

describe("2021-11", () => {
  it("passes part1 small example", () => {
    const example = `11111
19991
19191
19991
11111`;

    const [_, after1] = step(linesToArray(splitLines(example)));
    expect(arrayToLines(after1).join(os.EOL)).toEqual(`34543
40004
50005
40004
34543`);
  });

  it("passes part1 large example", () => {
    const example = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

    let initialFlashes = 0;
    let state = linesToArray(splitLines(example));

    [initialFlashes, state] = runSteps(state, 10);
    expect(initialFlashes).toEqual(204);

    let extraFlashes = 0;
    [extraFlashes, state] = runSteps(state, 90);

    expect(initialFlashes + extraFlashes).toEqual(1656);
  });

  it("passes part1", () => {
    const input = readInput(year, day);
    expect(puzzle.computePart1(input)).toEqual(puzzle.part1Answer);
  });

  it("passes part2", () => {
    const input = readInput(year, day);
    expect(puzzle.computePart2(input)).toEqual(puzzle.part2Answer);
  });
});
