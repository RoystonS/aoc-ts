export interface PriorityQueue<T> {
  clear(): void;

  insert(value: T, priority: number): void;
  decreasePriority(value: T, newPriority: number): void;

  removeMinimum(): T;

  readonly isEmpty: boolean;
  readonly length: number;

  getItems(): T[];
}

interface Node<T> {
  value: T;
  priority: number;
}

export class PriorityQueueBinaryHeap<T> implements PriorityQueue<T> {
  // heap is a binary tree, represented as an array such that
  // the children of index N are at 2N+1 and 2N+2.
  // The tree is such that any node's priority is <= all
  // subtree node priorities. (Min-heap)
  private readonly heap: Node<T>[] = [];

  // In order to support decreasing priorities we also keep a map
  // from each item to its index in the tree.

  private readonly indexMap = new Map<T, number>();

  public get length() {
    return this.heap.length;
  }

  public get isEmpty() {
    return this.length === 0;
  }

  public clear() {
    this.heap.length = 0;
    this.indexMap.clear();
  }

  public insert(value: T, priority: number) {
    const node: Node<T> = { value, priority };

    if (this.indexMap.has(value)) {
      throw new Error(`Inserting element which is already present`);
    }

    // Add the new value to the heap.
    this.heap.push(node);
    this.indexMap.set(value, this.heap.length - 1);

    // That may have broken the priority order,
    // so fix up.
    const nodeIndex = this.heap.length - 1;
    this.heapifyUp(node, nodeIndex);
  }

  public removeMinimum(): T {
    const heap = this.heap;
    const indexMap = this.indexMap;

    // The minimum entry is at the top of the tree
    const minimumNode = heap[0];
    indexMap.delete(minimumNode.value);

    // Move the last node to the top of the tree. This may have
    // broken the priority order, so fix up.
    const lastNode = heap.pop()!;

    // this.dump();
    if (heap.length > 0) {
      heap[0] = lastNode;
      indexMap.set(lastNode.value, 0);

      this.heapifyDown(lastNode, 0);
    }

    return minimumNode.value;
  }

  public decreasePriority(value: T, newPriority: number): void {
    const index = this.indexMap.get(value)!;

    const node = this.heap[index];
    node.priority = newPriority;

    this.heapifyUp(node, index);
  }

  private heapifyUp(node: Node<T>, nodeIndex: number) {
    const parentIndex = Math.floor((nodeIndex - 1) / 2);

    if (parentIndex >= 0) {
      const heap = this.heap;
      const indexMap = this.indexMap;

      const parentNode = heap[parentIndex];
      if (parentNode.priority > node.priority) {
        // Wrong way round.
        heap[nodeIndex] = parentNode;
        indexMap.set(parentNode.value, nodeIndex);

        heap[parentIndex] = node;
        indexMap.set(node.value, parentIndex);

        this.heapifyUp(node, parentIndex);
      }
    }
  }

  private heapifyDown(node: Node<T>, nodeIndex: number) {
    // this.dump();

    const child1Index = nodeIndex * 2 + 1;
    const child2Index = child1Index + 1;

    const heap = this.heap;
    const indexMap = this.indexMap;

    let smallestPriorityIndex = nodeIndex;

    const lastIndex = heap.length - 1;
    if (child1Index <= lastIndex && heap[child1Index].priority < node.priority) {
      smallestPriorityIndex = child1Index;
    }

    if (child2Index <= lastIndex && heap[child2Index].priority < heap[smallestPriorityIndex].priority) {
      smallestPriorityIndex = child2Index;
    }

    if (smallestPriorityIndex !== nodeIndex) {
      const smallestNode = heap[smallestPriorityIndex];

      heap[nodeIndex] = smallestNode;
      indexMap.set(smallestNode.value, nodeIndex);

      heap[smallestPriorityIndex] = node;
      indexMap.set(node.value, smallestPriorityIndex);

      this.heapifyDown(node, smallestPriorityIndex);
    }
  }

  public getItems() {
    return this.heap.map((n) => n.value);
  }

  public dump() {
    for (let i = 0; i < this.heap.length; i++) {
      console.log(`heap ${i}: ${this.heap[i].priority} => ${this.heap[i].value}`);
    }
  }
}
