import { splitLines } from "../../../common";
import type { Puzzle } from "../../../common";
import { Dijkstra, Graph } from "../../../common/Dijkstra";

export const puzzle: Puzzle<number> = {
  computePart1(input) {
    const lines = splitLines(input);
    const graph = new GraphImpl(lines);
    const colCount = lines[0].length;
    const dij = new Dijkstra(graph, vertexKey(0, 0, colCount));
    const distance = dij.run(vertexKey(graph.rowCount - 1, graph.colCount - 1, colCount));
    return distance;
  },
  part1Answer: 393,

  computePart2(input) {
    const lines = splitLines(input);
    const largerMap: string[] = [];
    lines.forEach((line, i) => {
      let longerLine = line;
      let previousPortion = line;

      for (let j = 0; j < 4; j++) {
        const newPortion = incrementString(previousPortion);
        longerLine = longerLine + newPortion;
        previousPortion = newPortion;
      }

      for (let j = 0; j < 5; j++) {
        largerMap[i + j * lines.length] = longerLine;
        longerLine = incrementString(longerLine);
      }
    });

    const graph = new GraphImpl(largerMap);
    const colCount = largerMap[0].length;
    const dij = new Dijkstra(graph, vertexKey(0, 0, colCount));
    const target = vertexKey(graph.rowCount - 1, graph.colCount - 1, colCount);
    const distance = dij.run(target);

    return distance;
  },
  part2Answer: 2823,
};

class GraphImpl implements Graph<number> {
  private readonly rows: number[][];
  public readonly rowCount: number;
  public readonly colCount: number;

  public constructor(lines: string[]) {
    this.rows = lines.map((line) => line.split("").map((s) => parseInt(s, 10)));

    this.rowCount = this.rows.length;
    this.colCount = this.rows[0].length;
  }

  public *getVertices(): IterableIterator<number> {
    const { rowCount, colCount } = this;

    for (let row = 0; row < rowCount; row++) {
      for (let col = 0; col < colCount; col++) {
        yield vertexKey(row, col, colCount);
      }
    }
  }

  public *getNeighbours(vertex: number): IterableIterator<number> {
    const { rowCount, colCount } = this;
    const { row, col } = splitVertexKey(vertex, colCount);

    if (row < rowCount - 1) {
      yield vertexKey(row + 1, col, colCount);
    }
    if (col < colCount - 1) {
      yield vertexKey(row, col + 1, colCount);
    }
    if (row > 0) {
      yield vertexKey(row - 1, col, colCount);
    }
    if (col > 0) {
      yield vertexKey(row, col - 1, colCount);
    }
  }

  public getWeight(from: number, to: number): number {
    const { colCount } = this;
    const { row, col } = splitVertexKey(to, colCount);
    return this.rows[row][col];
  }
}

function vertexKey(row: number, col: number, colCount: number) {
  return row * colCount + col;
}

function splitVertexKey(key: number, colCount: number) {
  const col = key % colCount;
  const row = Math.floor(key / colCount);
  return { row, col };
}

function incrementString(s: string) {
  return s
    .split("")
    .map((s) => incrementRisk(parseInt(s, 10)).toString())
    .join("");
}

function incrementRisk(risk: number) {
  // 123456789 => 234567891
  const inced = risk + 1;
  return inced === 10 ? 1 : inced;
}
