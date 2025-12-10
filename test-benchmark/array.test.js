// 配列操作テスト（100件）

describe("Array operations", () => {
  // map テスト 25件
  describe("map", () => {
    for (let i = 1; i <= 25; i++) {
      const arr = Array.from({ length: i }, (_, j) => j);
      test(`map array of ${i} elements`, () => {
        const result = arr.map(x => x * 2);
        expect(result.length).toBe(i);
        expect(result[0]).toBe(0);
      });
    }
  });

  // filter テスト 25件
  describe("filter", () => {
    for (let i = 1; i <= 25; i++) {
      const arr = Array.from({ length: i * 2 }, (_, j) => j);
      test(`filter even numbers from ${i * 2} elements`, () => {
        const result = arr.filter(x => x % 2 === 0);
        expect(result.length).toBe(i);
      });
    }
  });

  // reduce テスト 25件
  describe("reduce", () => {
    for (let i = 1; i <= 25; i++) {
      const arr = Array.from({ length: i }, (_, j) => j + 1);
      const expected = (i * (i + 1)) / 2;
      test(`sum of 1 to ${i} = ${expected}`, () => {
        const result = arr.reduce((a, b) => a + b, 0);
        expect(result).toBe(expected);
      });
    }
  });

  // find テスト 25件
  describe("find", () => {
    for (let i = 1; i <= 25; i++) {
      const arr = Array.from({ length: 100 }, (_, j) => j);
      test(`find ${i} in array`, () => {
        const result = arr.find(x => x === i);
        expect(result).toBe(i);
      });
    }
  });
});
