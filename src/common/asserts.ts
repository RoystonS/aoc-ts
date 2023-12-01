export function assertDefined<T>(o: T | undefined): asserts o is T {
  if (o === undefined) {
    throw new Error(`Not defined`);
  }
}

export function assertDefinedAndNotNull<T>(
  o: T | undefined | null
): asserts o is T {
  if (o === undefined || o === null) {
    throw new Error(`Expected a value`);
  }
}
