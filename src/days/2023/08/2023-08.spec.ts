import { puzzle } from "./Puzzle";
import { readInput } from "../../../common";

const year = "2023";
const day = "08";

describe("2023-08", () => {
  it("passes part1 example", () => {
    const example = readInput(year, day, "part1example.txt");
    expect(puzzle.computePart1(example)).toEqual(6);
  });

  it("passes part1", () => {
    const input = readInput(year, day);
    expect(puzzle.computePart1(input)).toEqual(puzzle.part1Answer);
  });

  it("passes part2 example", () => {
    const example = readInput(year, day, "part2example.txt");
    expect(puzzle.computePart2(example)).toEqual(6);
  });

  it("passes part2", () => {
    const input = readInput(year, day);
    expect(puzzle.computePart2(input)).toEqual(puzzle.part2Answer);
  });
});
