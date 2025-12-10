// 大量のテストケース（100件）

describe("Math operations", () => {
  // 足し算テスト 25件
  describe("addition", () => {
    for (let i = 1; i <= 25; i++) {
      test(`${i} + ${i} = ${i * 2}`, () => {
        expect(i + i).toBe(i * 2);
      });
    }
  });

  // 引き算テスト 25件
  describe("subtraction", () => {
    for (let i = 1; i <= 25; i++) {
      test(`${i * 2} - ${i} = ${i}`, () => {
        expect(i * 2 - i).toBe(i);
      });
    }
  });

  // 掛け算テスト 25件
  describe("multiplication", () => {
    for (let i = 1; i <= 25; i++) {
      test(`${i} * ${i} = ${i * i}`, () => {
        expect(i * i).toBe(i ** 2);
      });
    }
  });

  // 割り算テスト 25件
  describe("division", () => {
    for (let i = 1; i <= 25; i++) {
      test(`${i * i} / ${i} = ${i}`, () => {
        expect((i * i) / i).toBe(i);
      });
    }
  });
});
