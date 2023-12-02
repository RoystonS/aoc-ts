import { puzzle } from "./Puzzle";
import { readInput } from "../../../common";

const year = "2021";
const day = "12";

describe("2021-12", () => {
  it("passes part1 first example", () => {
    const example = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;
    expect(puzzle.computePart1(example)).toEqual("10");
  });

  it("passes part1 second example", () => {
    const example = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`;
    expect(puzzle.computePart1(example)).toEqual("19");
  });

  it("passes part1", () => {
    const input = readInput(year, day);
    expect(puzzle.computePart1(input)).toEqual(puzzle.part1Answer);
  });

  it("passes part2 example", () => {
    const example = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;
    expect(puzzle.computePart2(example)).toEqual("36");
  });

  it("passes part2", () => {
    const input = readInput(year, day);
    expect(puzzle.computePart2(input)).toEqual(puzzle.part2Answer);
  });
});
