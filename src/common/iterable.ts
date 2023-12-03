export function some<T>(iterator: IterableIterator<T>): boolean {
  const next = iterator.next();
  return !next.done;
}

export function* filter<T>(
  iterator: IterableIterator<T>,
  predicate: (value: T) => boolean,
) {
  for (const item of iterator) {
    if (predicate(item)) {
      yield item;
    }
  }
}

export function* map<T, U>(
  iterator: IterableIterator<T>,
  transform: (value: T) => U,
) {
  for (const item of iterator) {
    yield transform(item);
  }
}

export function reduce<T, U>(
  iterator: IterableIterator<T>,
  reducer: (previousValue: U, currentValue: T) => U,
  initialValue: U,
) {
  let value = initialValue;

  for (const item of iterator) {
    value = reducer(value, item);
  }
  return value;
}

export function sum(iterator: IterableIterator<number>) {
  return reduce(iterator, (acc, n) => acc + n, 0);
}

export function product(iterator: IterableIterator<number>) {
  return reduce(iterator, (acc, n) => acc * n, 0);
}
