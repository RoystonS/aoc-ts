import { assertDefinedAndNotNull, splitLines, sum } from "../../../common";
import type { Puzzle } from "../../../common";

export const puzzle: Puzzle<number> = {
  computePart1(input) {
    return run(input, 1);
  },
  part1Answer: 251058093,

  computePart2(input) {
    return run(input, 2);
  },
  part2Answer: 249781879,
};

function run(input: string, part: number) {
  const lines = splitLines(input);
  const plays = lines.map((l) => {
    const match = l.match(/^(.{5}) (\d+)$/);
    assertDefinedAndNotNull(match);
    const hand = match[1];
    const bid = parseInt(match[2], 10);
    return { hand, bid, score: scoreHand(hand, part) } as Play;
  });

  // Sort in ascending score order
  plays.sort((play1, play2) => play1.score - play2.score);

  return sum(plays.map((play, i) => play.bid * (i + 1)).values());
}
interface Play {
  hand: string;
  bid: number;
  score: number;
}

const cardsPart1 = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
const cardsPart2 = ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"];

const FiveOfKind = 6;
const FourOfKind = 5;
const FullHouse = 4;
const ThreeOfKind = 3;
const TwoPairs = 2;
const OnePair = 1;
const HighCard = 0;

// Score is a single base-13 number consisting of:
// |type|card1|card2|card3|card4|card5|
// type is 0-6 (high card -> five of a kind)

export function getHandType(hand: string, part: number) {
  // Get cards in reverse count order
  const arr = Array.from(countCards(hand).entries());
  arr.sort(([card1, count1], [card2, count2]) => count2 - count1);

  const firstCount = arr[0][1];
  const jokerCount = arr.find(([card, count]) => card === "J")?.[1] ?? 0;

  let score;
  if (firstCount === 5) {
    score = FiveOfKind;
  } else if (firstCount === 4) {
    score = FourOfKind;
  } else if (firstCount === 3) {
    score = arr[1][1] === 2 ? FullHouse : ThreeOfKind;
  } else if (firstCount === 2) {
    score = arr[1][1] === 2 ? TwoPairs : OnePair;
  } else {
    score = HighCard;
  }

  if (part === 2 && jokerCount > 0) {
    switch (score) {
      case FiveOfKind:
      case FourOfKind:
      case FullHouse:
        score = FiveOfKind;
        break;
      case ThreeOfKind:
        score = FourOfKind;
        break;
      case TwoPairs:
        score = jokerCount === 2 ? FourOfKind : FullHouse;
        break;
      case OnePair:
        score = ThreeOfKind;
        break;
      case HighCard:
        score = OnePair;
        break;
    }
  }

  return score;
}

function scoreHand(hand: string, part: number) {
  let score = getHandType(hand, part);

  for (let i = 0; i < hand.length; i++) {
    score = score * 13;
    score = score + (part === 1 ? cardsPart1 : cardsPart2).indexOf(hand[i]);
  }

  return score;
}

function countCards(hand: string) {
  const map = new Map<string, number>();
  for (const card of hand) {
    map.set(card, (map.get(card) ?? 0) + 1);
  }
  return map;
}
