import { puzzle } from "./Puzzle";
import { readInput } from "../../../common";

const year = "2021";
const day = "15";

describe("2021-15", () => {
  const example = `
1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`.trim();

  it("passes part1 example", () => {
    expect(puzzle.computePart1(example)).toEqual(40);
  });

  it("passes part1", () => {
    const input = readInput(year, day);
    expect(puzzle.computePart1(input)).toEqual(puzzle.part1Answer);
  });

  it("passes part2 example", () => {
    expect(puzzle.computePart2(example)).toEqual(315);
  });

  it("passes part2", () => {
    const input = readInput(year, day);
    expect(puzzle.computePart2(input)).toEqual(puzzle.part2Answer);
  });
});
