export function some<T>(iterator: IterableIterator<T>): boolean {
  const next = iterator.next();
  return !next.done;
}

export function* filter<T>(iterator: IterableIterator<T>, predicate: (value: T) => boolean): IterableIterator<T> {
  for (const item of iterator) {
    if (predicate(item)) {
      yield item;
    }
  }
}

export function* map<T, U>(iterator: IterableIterator<T>, transform: (value: T) => U): IterableIterator<U> {
  for (const item of iterator) {
    yield transform(item);
  }
}

export function reduce<T, U>(
  iterator: IterableIterator<T>,
  reducer: (previousValue: U, currentValue: T) => U,
  initialValue: U,
): U {
  let value = initialValue;

  for (const item of iterator) {
    value = reducer(value, item);
  }
  return value;
}

export function sum<T>(iterator: IterableIterator<number>): number;
export function sum<T>(iterator: IterableIterator<T>, selector: (item: T) => number): number;
export function sum<T>(iterator: IterableIterator<T>, selector?: (item: T) => number): number {
  if (selector) {
    return reduce(iterator, (acc, item) => acc + selector(item), 0);
  } else {
    return reduce(iterator, (acc, n) => acc + (n as number), 0);
  }
}

export function product<T>(iterator: IterableIterator<number>): number;
export function product<T>(iterator: IterableIterator<T>, selector: (item: T) => number): number;
export function product<T>(iterator: IterableIterator<T>, selector?: (item: T) => number): number {
  if (selector) {
    return reduce(iterator, (acc, item) => acc * selector(item), 1);
  } else {
    return reduce(iterator, (acc, n) => acc * (n as number), 1);
  }
}

export type ComparisonResult = -1 | 0 | 1;

export function count(iterator: IterableIterator<any>): number {
  let count = 0;
  for (const item of iterator) {
    count++;
  }
  return count;
}

export function min<T>(iterator: IterableIterator<T>, compare: (a: T, b: T) => ComparisonResult): T {
  const iteratorResult = iterator.next();
  if (iteratorResult.done) {
    throw new Error(`Iterator has no elements`);
  }
  const firstValue = iteratorResult.value;
  return reduce(
    iterator,
    (previous, current) => {
      return compare(current, previous) < 0 ? current : previous;
    },
    firstValue,
  );
}

export function minNumber(iterator: IterableIterator<number>): number {
  return min(iterator, compareNumbers);
}

export function max<T>(iterator: IterableIterator<T>, compare: (a: T, b: T) => ComparisonResult): T {
  const iteratorResult = iterator.next();
  if (iteratorResult.done) {
    throw new Error(`Iterator has no elements`);
  }
  const firstValue = iteratorResult.value;
  return reduce(
    iterator,
    (previous, current) => {
      return compare(current, previous) > 0 ? current : previous;
    },
    firstValue,
  );
}

export function maxNumber(iterator: IterableIterator<number>): number {
  return max(iterator, compareNumbers);
}

function compareNumbers(a: number, b: number) {
  return a < b ? -1 : a > b ? 1 : 0;
}
export function* range(from: number, to: number): IterableIterator<number> {
  for (let i = from; i <= to; i++) {
    yield i;
  }
}

export function* cycle<T>(values: T[]): IterableIterator<T> {
  if (values.length === 0) {
    return;
  }

  while (true) {
    yield* values.values();
  }
}

export function* chain<T>(...iterables: IterableIterator<T>[]): IterableIterator<T> {
  for (const iterable of iterables) {
    yield* iterable;
  }
}

function gcdPair(a: number, b: number): number {
  if (a === 0) {
    return b;
  }

  return gcdPair(b % a, a);
}

function lcmPair(a: number, b: number): number {
  return (a * b) / gcdPair(a, b);
}

export function gcd(values: IterableIterator<number>) {
  let result = values.next().value;

  for (const value of values) {
    result = gcdPair(result, value);
    if (result === 1) {
      return 1;
    }
  }
  return result;
}

export function lcm(values: IterableIterator<number>) {
  let result = values.next().value;

  for (const value of values) {
    result = lcmPair(result, value);
  }
  return result;
}
