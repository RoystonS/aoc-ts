export type Puzzle<T> = {
  computePart1(input: string): T;
  readonly part1Answer: T;
  computePart2(input: string): T;
  readonly part2Answer: T;
};
