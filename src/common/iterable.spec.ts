import { gcd, lcm } from "./iterable";

describe("gcd", () => {
  it("computes value correctly", () => {
    expect(gcd([2 * 3 * 3 * 5, 3 * 3 * 5 * 7, 3 * 3 * 5 * 11].values())).toEqual(3 * 3 * 5);
  });

  it("returns 1 for coprime values", () => {
    expect(gcd([2 * 3, 5 * 7, 11 * 13].values())).toEqual(1);
  });
});

describe("lcm", () => {
  it("computes value correctly", () => {
    expect(lcm([2 * 3 * 3 * 5, 3 * 3 * 7, 3 * 3 * 11].values())).toEqual(2 * 3 * 3 * 5 * 7 * 11);
  });

  it("returns product for coprime values", () => {
    expect(lcm([2 * 3, 5 * 7, 11 * 13].values())).toEqual(2 * 3 * 5 * 7 * 11 * 13);
  });
});
