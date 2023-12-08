import { puzzle } from "./Puzzle";
import { readInput } from "../../../common";

const year = "2021";
const day = "16";

describe("2021-16", () => {
  it("passes part1 examples", () => {
    expect(puzzle.computePart1("8A004A801A8002F478")).toEqual(16);
    expect(puzzle.computePart1("620080001611562C8802118E34")).toEqual(12);
    expect(puzzle.computePart1("C0015000016115A2E0802F182340")).toEqual(23);
    expect(puzzle.computePart1("A0016C880162017C3686B18A3D4780")).toEqual(31);
  });

  it("passes part1", () => {
    const input = readInput(year, day);
    expect(puzzle.computePart1(input)).toEqual(puzzle.part1Answer);
  });

  it("passes part2 example", () => {
    expect(puzzle.computePart2("C200B40A82")).toEqual(3);
    expect(puzzle.computePart2("04005AC33890")).toEqual(54);
    expect(puzzle.computePart2("880086C3E88112")).toEqual(7);
    expect(puzzle.computePart2("CE00C43D881120")).toEqual(9);
    expect(puzzle.computePart2("D8005AC2A8F0")).toEqual(1);
    expect(puzzle.computePart2("F600BC2D8F")).toEqual(0);
    expect(puzzle.computePart2("9C005AC2F8F0")).toEqual(0);
    expect(puzzle.computePart2("9C0141080250320F1802104A08")).toEqual(1);
  });

  it("passes part2", () => {
    const input = readInput(year, day);
    expect(puzzle.computePart2(input)).toEqual(puzzle.part2Answer);
  });
});
