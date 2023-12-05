import { assertDefinedAndNotNull, product, splitLines, sum } from "../../../common";
import type { Puzzle } from "../../../common";

export const puzzle: Puzzle = {
  computePart1(input) {
    const lines = splitLines(input);
    const games = lines.map(parseLine);

    let idTotal = 0;
    for (const game of games) {
      if (
        game.handfulls.every((handfull) => {
          const redCount = handfull.sets.get("red") ?? 0;
          const greenCount = handfull.sets.get("green") ?? 0;
          const blueCount = handfull.sets.get("blue") ?? 0;

          return redCount <= 12 && greenCount <= 13 && blueCount <= 14;
        })
      ) {
        idTotal += game.id;
      }
    }
    return idTotal.toString();
  },
  part1Answer: "2439",

  computePart2(input) {
    const lines = splitLines(input);
    const games = lines.map(parseLine);

    const powerTotal = sum(games.values(), (game) => {
      // Compute the minimum cubes for this game
      const min = new Map<CubeColour, number>();
      for (const handful of game.handfulls) {
        for (const [colour, count] of handful.sets) {
          const existingMin = min.get(colour) ?? 0;
          if (count > existingMin) {
            min.set(colour, count);
          }
        }
      }

      // Multiply the cube counts together
      const gamePower = product(min.values());
      return gamePower;
    });
    return powerTotal.toString();
  },
  part2Answer: "63711",
};

// Game N: X blue, Y red; Z green, A blue
export function parseLine(line: string): Game {
  const gameMatch = line.match(/Game (\d+): (.*)/);
  assertDefinedAndNotNull(gameMatch);
  const [, gameIdString, restOfLine] = gameMatch;
  const gameId = parseInt(gameIdString, 10);

  const handfullsStrings = restOfLine.split("; ");
  const handfulls: Handfull[] = handfullsStrings.map((handfullString) => {
    const setsStrings = handfullString.split(", ");

    const map = new Map<CubeColour, number>();

    const sets = setsStrings.reduce<Map<CubeColour, number>>((m, setString) => {
      const [countString, colourString] = setString.split(" ");
      m.set(colourString as CubeColour, parseInt(countString, 10));
      return m;
    }, map);

    return { sets } satisfies Handfull;
  });

  return { id: gameId, handfulls } as Game;
}

type CubeColour = "red" | "green" | "blue";

export interface Game {
  id: number;
  handfulls: Handfull[];
}
export interface Handfull {
  sets: Map<CubeColour, number>;
}
