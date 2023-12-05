import { PriorityQueueBinaryHeap } from "./PriorityQueueBinaryHeap";

export interface Graph<T> {
  getVertices(): IterableIterator<T>;
  getNeighbours(vertex: T): IterableIterator<T>;
  getWeight(from: T, to: T): number;
}

export class Dijkstra<T> {
  private readonly distance = new Map<T, number>();
  private readonly previous = new Map<T, T>();
  private readonly queue = new PriorityQueueBinaryHeap<T>();

  public constructor(
    private readonly graph: Graph<T>,
    start: T,
  ) {
    this.distance.set(start, 0);

    for (const vertex of graph.getVertices()) {
      if (vertex !== start) {
        this.distance.set(vertex, Infinity);
      }
      this.queue.insert(vertex, Infinity);
    }
  }

  public run(target: T): number {
    while (!this.queue.isEmpty) {
      const vertex = this.queue.removeMinimum();
      const distanceToThisVertex = this.distance.get(vertex)!;
      if (vertex === target) {
        return distanceToThisVertex;
      }

      for (const neighbour of this.graph.getNeighbours(vertex)) {
        const alt = distanceToThisVertex + this.graph.getWeight(vertex, neighbour);
        if (alt < this.distance.get(neighbour)!) {
          this.distance.set(neighbour, alt);
          this.previous.set(neighbour, vertex);
          this.queue.decreasePriority(neighbour, alt);
        }
      }
    }

    throw new Error(`Target vertex not found`);
  }
}
