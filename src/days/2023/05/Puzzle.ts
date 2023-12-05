import { assertDefined, map, min, minNumber, splitLines } from "../../../common";
import type { Puzzle } from "../../../common";

export const puzzle: Puzzle = {
  computePart1(input) {
    const { seeds, sections } = parse(input);
    const seedRanges = seeds.map(
      (s) =>
        ({
          from: s,
          to: s,
        }) as ItemRange,
    );

    const rangeFroms = traverseMultiple("seed", seedRanges, sections).map((r) => r.from);

    return minNumber(rangeFroms.values()).toString();
  },
  part1Answer: "278755257",

  computePart2(input) {
    const { seeds, sections } = parse(input);
    const seedRanges: ItemRange[] = [];
    for (let i = 0; i < seeds.length; i += 2) {
      seedRanges.push({ from: seeds[i], to: seeds[i] + seeds[i + 1] - 1 });
    }

    const rangeFroms = traverseMultiple("seed", seedRanges, sections).map((r) => r.from);

    return minNumber(rangeFroms.values()).toString();
  },
  part2Answer: "26829166",
};

interface Mapping {
  sourceRangeStart: number;
  sourceRangeEnd: number;
  dest: number;
}

interface Section {
  from: string;
  to: string;
  mappings: Mapping[];
}

interface ItemRange {
  from: number;
  to: number;
}

// Map multiple input ranges to their corresponding output ranges so that we don't have
// to process every one of the hundreds of millions of values individually.
function traverseMultiple(startType: string, inputs: ItemRange[], sections: Map<string, Section>) {
  let type = startType;
  let values = inputs;

  do {
    const section = sections.get(type);
    if (!section) {
      return values;
    }
    const outputs: ItemRange[] = [];

    for (const mapping of section.mappings) {
      for (const input of values) {
        const start = Math.max(mapping.sourceRangeStart, input.from);
        const end = Math.min(mapping.sourceRangeEnd, input.to);

        if (start <= end) {
          // We have some overlap between the input and this mapping.
          outputs.push({
            from: start - mapping.sourceRangeStart + mapping.dest,
            to: end - mapping.sourceRangeStart + mapping.dest,
          });

          // How much of the input is left? Did it get split?
          const lowerInput: ItemRange = { from: input.from, to: start - 1 };
          const upperInput: ItemRange = { from: end + 1, to: input.to };
          // Squash the existing value, but don't affect the current iteration.
          input.from = -1;
          input.to = -1;
          if (lowerInput.from <= lowerInput.to) {
            values.push(lowerInput);
          }
          if (upperInput.from <= upperInput.to) {
            values.push(upperInput);
          }
        }
      }
    }

    values = values.filter((i) => i.from >= 0);
    // Any unmapped input values keep their values.
    outputs.push(...values);

    type = section.to;
    values = outputs;
  } while (true);
}

function parse(input: string) {
  const lines = splitLines(input);
  // seeds
  const seeds = lines[0]
    .split(/: /)[1]
    .split(/ +/)
    .map((s) => parseInt(s, 10));

  let from = "";
  let to = "";

  const sections = new Map<string, Section>();

  let mappings: Mapping[] = [];

  for (const line of lines.slice(2)) {
    const sectionHeadingMatch = line.match(/(.*)-to-(.*) map:/);
    if (sectionHeadingMatch) {
      [, from, to] = sectionHeadingMatch;
      mappings = [];
      const section: Section = {
        from,
        to,
        mappings,
      };
      sections.set(from, section);
      continue;
    }

    const mappingMatch = line.match(/^(\d+)\s+(\d+)\s+(\d+)$/);
    if (mappingMatch) {
      const [, destStr, srcStr, sizeStr] = mappingMatch;
      const sourceRangeStart = parseInt(srcStr, 10);
      const rangeSize = parseInt(sizeStr, 10);
      const dest = parseInt(destStr, 10);

      const mapping: Mapping = {
        sourceRangeStart,
        sourceRangeEnd: sourceRangeStart + rangeSize - 1,
        dest,
      };
      mappings.push(mapping);
    }
  }

  return { seeds, sections };
}
