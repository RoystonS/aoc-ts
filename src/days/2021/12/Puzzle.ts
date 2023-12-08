import { splitLines } from "../../../common";
import type { Puzzle } from "../../../common";
import { Deque } from "../../../common/Deque";

export class Graph<TNodeItem = undefined, TEdgeItem = undefined> {
  public addNode(item: TNodeItem) {
    return new Node(item);
  }

  public addEdge(node1: Node<TNodeItem, TEdgeItem>, node2: Node<TNodeItem, TEdgeItem>, item: TEdgeItem) {
    const edge = new Edge(item, node1, node2);
    node1.edges.push(edge);
    node2.edges.push(edge);
    return edge;
  }
}

export class Node<TNodeItem = undefined, TEdgeItem = undefined> {
  public constructor(public readonly item: TNodeItem) {
    this.edges = [];
  }

  public readonly edges: Edge<TNodeItem, TEdgeItem>[];

  public get otherEnds() {
    return this.edges.map((e) => (this === e.end1 ? e.end2 : e.end1));
  }
}

export class Edge<TNodeItem = undefined, TEdgeItem = undefined> {
  public constructor(
    public readonly item: TEdgeItem,
    public readonly end1: Node<TNodeItem, TEdgeItem>,
    public readonly end2: Node<TNodeItem, TEdgeItem>,
  ) {}
}

export const puzzle: Puzzle<number> = {
  computePart1(input) {
    return run(input, false);
  },

  part1Answer: 4495,

  computePart2(input) {
    return run(input, true);
  },
  part2Answer: 131254,
};

function isLowerCase(ch: string) {
  return ch === ch.toLowerCase();
}

interface PathWithStatus {
  nodes: Node<string>[];
  hasSmallCaveTwice: boolean;
}

function run(input: string, allowOneSmallCaveTwice: boolean) {
  const lines = splitLines(input);

  const graph = new Graph<string>();

  const nodeMap = new Map<string, Node<string>>();

  for (const line of lines) {
    const [nodeId1, nodeId2] = line.split(/-/);

    let node1 = nodeMap.get(nodeId1);
    if (!node1) {
      node1 = graph.addNode(nodeId1);
      nodeMap.set(nodeId1, node1);
    }
    let node2 = nodeMap.get(nodeId2);
    if (!node2) {
      node2 = graph.addNode(nodeId2);
      nodeMap.set(nodeId2, node2);
    }

    graph.addEdge(node1, node2, undefined);
  }

  const finalPaths = new Set<string>();
  const analysedPaths = new Set<string>();
  const pathQueue = new Deque<PathWithStatus>();

  const startNode = nodeMap.get("start")!;
  const endNode = nodeMap.get("end")!;

  pathQueue.push({
    nodes: [startNode],
    hasSmallCaveTwice: false,
  });

  while (!pathQueue.isEmpty) {
    const entry = pathQueue.pop()!;

    const pathString = entry.nodes.map((n) => n.item).join(",");
    if (analysedPaths.has(pathString)) {
      continue;
    }

    analysedPaths.add(pathString);
    const lastNode = entry.nodes.at(-1)!;
    if (lastNode === endNode) {
      finalPaths.add(pathString);
      continue;
    }

    for (const nextStep of lastNode.otherEnds) {
      if (nextStep === startNode) {
        continue;
      }
      let pathHasSmallCaveTwice = entry.hasSmallCaveTwice;

      if (isLowerCase(nextStep.item[0])) {
        // Small cave.
        const thisCaveAlreadyOnPath = entry.nodes.some((n) => n === nextStep);
        if (allowOneSmallCaveTwice) {
          if (pathHasSmallCaveTwice && thisCaveAlreadyOnPath) {
            continue;
          }
          if (thisCaveAlreadyOnPath) {
            pathHasSmallCaveTwice = true;
          }
        } else {
          if (thisCaveAlreadyOnPath) {
            continue;
          }
        }
      }

      pathQueue.push({
        nodes: [...entry.nodes, nextStep],
        hasSmallCaveTwice: pathHasSmallCaveTwice,
      });
    }
  }

  return finalPaths.size;
}
