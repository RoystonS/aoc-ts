import { puzzle } from "./Puzzle";
import { readInput } from "../../../common";

const year = "<YEAR>";
const day = "<DAY>";

describe("<YEAR>-<DAY>", () => {
  const example = readInput(year, day, 'example.txt');

  it("passes part1 example", () => {
    expect(puzzle.computePart1(example)).toEqual("!!!");
  });

  it("passes part1", () => {
    const input = readInput(year, day);
    expect(puzzle.computePart1(input)).toEqual(puzzle.part1Answer);
  });

  it.skip("passes part2 example", () => {
    expect(puzzle.computePart2(example)).toEqual("!!!");
  });

  it.skip("passes part2", () => {
    const input = readInput(year, day);
    expect(puzzle.computePart2(input)).toEqual(puzzle.part2Answer);
  });
});
