import { puzzle } from "./Puzzle";
import { readInput } from "../../../common";

const year = "2023";
const day = "03";

describe("2023-03", () => {
  const example = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`.trim();

  it("passes part1 example", () => {
    expect(puzzle.computePart1(example)).toEqual("4361");
  });

  it("passes part1", () => {
    const input = readInput(year, day);
    expect(puzzle.computePart1(input)).toEqual(puzzle.part1Answer);
  });

  it("passes part2 example", () => {
    expect(puzzle.computePart2(example)).toEqual("467835");
  });

  it("passes part2", () => {
    const input = readInput(year, day);
    expect(puzzle.computePart2(input)).toEqual(puzzle.part2Answer);
  });
});
