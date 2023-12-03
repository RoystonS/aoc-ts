export class MultiMap<K, V> {
  private readonly map = new Map<K, V[]>();

  public add(key: K, value: V) {
    let arr = this.map.get(key);
    if (!arr) {
      arr = [];
      this.map.set(key, arr);
    }
    arr.push(value);
  }

  public get(key: K): readonly V[] {
    return this.map.get(key) ?? [];
  }

  public entries(): IterableIterator<[K, readonly V[]]> {
    return this.map.entries();
  }

  [Symbol.iterator]() {
    return this.entries();
  }
}
