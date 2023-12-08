import { puzzle, getHandType } from "./Puzzle";
import { readInput } from "../../../common";

const year = "2023";
const day = "07";

describe("2023-07", () => {
  const example = readInput(year, day, "example.txt");

  it("passes part1 example", () => {
    expect(puzzle.computePart1(example)).toEqual(6440);
  });

  it("passes part1", () => {
    const input = readInput(year, day);
    expect(puzzle.computePart1(input)).toEqual(puzzle.part1Answer);
  });

  it("passes part2 example", () => {
    expect(puzzle.computePart2(example)).toEqual(5905);
  });

  it("scores KJQJ9 correctly", () => {
    expect(getHandType("KJQJ9", 1)).toEqual(1);
    expect(getHandType("KJQJ9", 2)).toEqual(3);
  });

  it("passes part2", () => {
    const input = readInput(year, day);
    expect(puzzle.computePart2(input)).toEqual(puzzle.part2Answer);
  });
});
