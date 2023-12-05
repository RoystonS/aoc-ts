import { Game, parseLine, puzzle } from "./Puzzle";
import { readInput } from "../../../common";

const year = "2023";
const day = "02";

describe("2023-02", () => {
  test("parseLine", () => {
    const result = parseLine("Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green");
    const expected: Game = {
      id: 5,
      handfulls: [
        {
          sets: new Map([
            ["red", 6],
            ["blue", 1],
            ["green", 3],
          ]),
        },
        {
          sets: new Map([
            ["blue", 2],
            ["red", 1],
            ["green", 2],
          ]),
        },
      ],
    };

    expect(result).toEqual(expected);
  });

  const example = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
  Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
  Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
  Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

  it("passes part1 example", () => {
    expect(puzzle.computePart1(example)).toEqual("8");
  });

  it("passes part1", () => {
    const input = readInput(year, day);
    expect(puzzle.computePart1(input)).toEqual(puzzle.part1Answer);
  });

  it("passes part2 example", () => {
    expect(puzzle.computePart2(example)).toEqual("2286");
  });

  it("passes part2", () => {
    const input = readInput(year, day);
    expect(puzzle.computePart2(input)).toEqual(puzzle.part2Answer);
  });
});
