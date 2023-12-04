export function some<T>(iterator: IterableIterator<T>): boolean {
  const next = iterator.next();
  return !next.done;
}

export function* filter<T>(
  iterator: IterableIterator<T>,
  predicate: (value: T) => boolean,
): IterableIterator<T> {
  for (const item of iterator) {
    if (predicate(item)) {
      yield item;
    }
  }
}

export function* map<T, U>(
  iterator: IterableIterator<T>,
  transform: (value: T) => U,
): IterableIterator<U> {
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

export function sum(iterator: IterableIterator<number>): number {
  return reduce(iterator, (acc, n) => acc + n, 0);
}

export function product(iterator: IterableIterator<number>): number {
  return reduce(iterator, (acc, n) => acc * n, 0);
}

export type ComparisonResult = -1 | 0 | 1;

export function count(iterator: IterableIterator<any>): number {
  let count = 0;
  for (const item of iterator) {
    count++;
  }
  return count;
}

export function min<T>(
  iterator: IterableIterator<T>,
  compare: (a: T, b: T) => ComparisonResult,
): T {
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

export function max<T>(
  iterator: IterableIterator<T>,
  compare: (a: T, b: T) => ComparisonResult,
): T {
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
