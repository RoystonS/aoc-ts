import { puzzle } from "./Puzzle";
import { readInput } from "../../../common";

const year = "2021";
const day = "17";

describe("2021-17", () => {
  const example = readInput(year, day, "example.txt");

  it("passes part1 example", () => {
    expect(puzzle.computePart1(example)).toEqual(45);
  });

  it("passes part1", () => {
    const input = readInput(year, day);
    expect(puzzle.computePart1(input)).toEqual(puzzle.part1Answer);
  });

  it("passes part2 example", () => {
    expect(puzzle.computePart2(example)).toEqual(112);
  });

  it("passes part2", () => {
    const input = readInput(year, day);
    expect(puzzle.computePart2(input)).toEqual(puzzle.part2Answer);
  });
});
