import { assertDefinedAndNotNull, splitLines } from "../../../common";
import type { Puzzle } from "../../../common";

export const puzzle: Puzzle = {
  computePart1(input) {
    const lines = splitLines(input);
    const total = lines
      .map(getNumericDigitsFromLine)
      .reduce((acc, n) => acc + n, 0);
    return total.toString();
  },
  part1Answer: "54953",

  computePart2(input) {
    const lines = splitLines(input);
    const total = lines
      .map(getNumericOrTextualDigitsFromLine)
      .reduce((acc, n) => acc + n, 0);
    return total.toString();
  },
  part2Answer: "53868",
};

function getNumericDigitsFromLine(line: string) {
  let match = line.match(/(\d).*(\d)/); // two digits on the line?
  if (!match) {
    match = line.match(/(\d)/); // just one
    assertDefinedAndNotNull(match);
  }

  const [, d1, d2] = match;
  const combined = d2 ? `${d1}${d2}` : `${d1}${d1}`;
  return parseInt(combined, 10);
}

const textualDigits = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

// Map from "one" -> "1", etc.
const textualDigitMap = new Map(
  textualDigits.map((text, i) => [text, (i + 1).toString()]),
);
// Add in "1" -> "1", etc.
for (let i = 1; i <= 9; i++) {
  textualDigitMap.set(i.toString(), i.toString());
}

// Regex pattern to match all textual digits
const textualDigitPattern =
  "(" + Array.from(textualDigitMap.keys()).join("|") + ")";

// Regex to extract first textual digit
const firstDigitRegex = new RegExp(`${textualDigitPattern}.*`);
// Regex to extract last textual digit
const lastDigitRegex = new RegExp(`.*${textualDigitPattern}`);

function getNumericOrTextualDigitsFromLine(line: string) {
  // We can't easily match these with a single regex because we may have overlap
  // between the textual digits, e.g. "oneight" is both 'one' and 'eight'.

  const firstDigitMatch = line.match(firstDigitRegex);
  assertDefinedAndNotNull(firstDigitMatch);
  const lastDigitMatch = line.match(lastDigitRegex);
  assertDefinedAndNotNull(lastDigitMatch);

  const d1 = textualDigitMap.get(firstDigitMatch[1]);
  const d2 = textualDigitMap.get(lastDigitMatch[1]);

  const combined = d2 ? `${d1}${d2}` : `${d1}${d1}`;
  return parseInt(combined, 10);
}
