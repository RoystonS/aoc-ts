interface ListNode<T> {
  item: T;
  prev?: ListNode<T>;
  next?: ListNode<T>;
}

export class Deque<T> {
  private head: ListNode<T> | undefined;
  private tail: ListNode<T> | undefined;

  public get isEmpty() {
    return !this.head;
  }

  public toArray() {
    const result: T[] = [];
    let node = this.head;
    while (node) {
      result.push(node.item);
      node = node.next;
    }
    return result;
  }

  public push(item: T) {
    const node: ListNode<T> = {
      item,
    };
    if (!this.head) {
      this.head = node;
    }
    if (this.tail) {
      this.tail.next = node;
      node.prev = this.tail;
    }
    this.tail = node;
  }

  public pop(): T | undefined {
    const tail = this.tail;

    if (tail) {
      const prev = tail.prev;
      if (prev) {
        prev.next = undefined;
        this.tail = prev;
      } else {
        // we're now empty
        this.head = this.tail = undefined;
      }
      return tail.item;
    } else {
      return undefined;
    }
  }

  public unshift(item: T) {
    const node: ListNode<T> = {
      item,
    };
    if (!this.tail) {
      this.tail = node;
    }
    if (this.head) {
      this.head.prev = node;
      node.next = this.head;
    }

    this.head = node;
  }

  public shift(): T | undefined {
    const head = this.head;
    if (head) {
      const next = head.next;
      if (next) {
        next.prev = undefined;
        this.head = next;
      } else {
        // we're now empty
        this.head = this.tail = undefined;
      }
      return head.item;
    } else {
      return undefined;
    }
  }
}
