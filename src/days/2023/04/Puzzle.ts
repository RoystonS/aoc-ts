import {
  assertDefinedAndNotNull,
  count,
  filter,
  splitLines,
  sum,
} from "../../../common";
import type { Puzzle } from "../../../common";

export const puzzle: Puzzle = {
  computePart1(input) {
    const lines = splitLines(input);
    const cards = lines.map(parseLine);

    return sum(
      cards
        .map((c) => (c.matches === 0 ? 0 : Math.pow(2, c.matches - 1)))
        .values(),
    ).toString();
  },
  part1Answer: "26346",

  computePart2(input) {
    const lines = splitLines(input);
    const cards = lines.map(parseLine);

    interface CardWithCount {
      card: Card;
      count: number;
    }

    const cardCounts = cards.map(
      (card) => ({ card, count: 1 }) as CardWithCount,
    );

    for (let c = 0; c < cardCounts.length; c++) {
      const { card, count } = cardCounts[c];

      if (card.matches > 0) {
        let firstWinningTicketIndex = c + 1;
        let lastWinningTicketIndex = Math.min(
          cardCounts.length - 1,
          c + card.matches,
        );
        for (
          let i = firstWinningTicketIndex;
          i <= lastWinningTicketIndex;
          i++
        ) {
          cardCounts[i].count += count;
        }
      }
    }

    return sum(cardCounts.map((c) => c.count).values()).toString();
  },
  part2Answer: "8467762",
};

interface Card {
  id: number;
  winningNumbers: Set<number>;
  actualNumbers: Set<number>;
  matches: number;
}

const cardPattern = /^Card +(\d+): ([\d ]+) \| ([\d ]+)$/;

function parseLine(line: string): Card {
  const match = line.match(cardPattern);
  assertDefinedAndNotNull(match);

  const [, cardNumStr, block1, block2] = match;

  const winningNumbers = new Set(parseBlock(block1));
  const actualNumbers = new Set(parseBlock(block2));

  return {
    id: parseInt(cardNumStr),
    winningNumbers,
    actualNumbers,
    matches: count(
      filter(actualNumbers.values(), (n) => winningNumbers.has(n)),
    ),
  };
}

function parseBlock(block: string) {
  return block
    .trim()
    .split(/ +/)
    .map((s) => parseInt(s, 10));
}
