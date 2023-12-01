import { puzzle } from "./Puzzle";
import { readInput } from "../../../common";

const year = "2023";
const day = "01";

describe("2023-01", () => {
  it("passes part1 example", () => {
    const example = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

    expect(puzzle.computePart1(example)).toEqual("142");
  });

  it("passes part1", () => {
    const input = readInput(year, day);
    expect(puzzle.computePart1(input)).toEqual(puzzle.part1Answer);
  });

  it("passes part2 example", () => {
    const example = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

    expect(puzzle.computePart2(example)).toEqual("281");
  });

  it("passes part2", () => {
    const input = readInput(year, day);
    expect(puzzle.computePart2(input)).toEqual(puzzle.part2Answer);
  });
});
