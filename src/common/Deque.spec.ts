import { Deque } from "./Deque";

describe("Queue", () => {
  it("returns undefined when empty", () => {
    const deque = new Deque<number>();
    expect(deque.pop()).toEqual(undefined);
    expect(deque.shift()).toEqual(undefined);
  });
  it("inserts items to the end with push", () => {
    const deque = new Deque<number>();

    deque.push(1);
    deque.push(2);
    deque.push(3);

    expect(deque.toArray()).toEqual([1, 2, 3]);

    expect(deque.pop()).toEqual(3);
    expect(deque.pop()).toEqual(2);
    expect(deque.pop()).toEqual(1);
    expect(deque.pop()).toEqual(undefined);

    deque.push(1);
    deque.push(2);
    deque.push(3);

    expect(deque.shift()).toEqual(1);
    expect(deque.shift()).toEqual(2);
    expect(deque.shift()).toEqual(3);
    expect(deque.shift()).toEqual(undefined);
  });
  it("inserts items to the front with unshift", () => {
    const deque = new Deque<number>();

    deque.unshift(1);
    deque.unshift(2);
    deque.unshift(3);

    expect(deque.shift()).toEqual(3);
    expect(deque.shift()).toEqual(2);
    expect(deque.shift()).toEqual(1);
    expect(deque.shift()).toEqual(undefined);

    deque.unshift(1);
    deque.unshift(2);
    deque.unshift(3);

    expect(deque.pop()).toEqual(1);
    expect(deque.pop()).toEqual(2);
    expect(deque.pop()).toEqual(3);
    expect(deque.pop()).toEqual(undefined);
  });
});
