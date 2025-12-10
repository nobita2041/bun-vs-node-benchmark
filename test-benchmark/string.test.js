// 文字列操作テスト（100件）

describe("String operations", () => {
  // toUpperCase テスト 25件
  describe("toUpperCase", () => {
    const words = ["hello", "world", "test", "bun", "node", "jest", "fast", "slow", "benchmark", "performance",
                   "javascript", "typescript", "runtime", "bundle", "package", "module", "import", "export", "async", "await",
                   "promise", "callback", "function", "object", "array"];
    words.forEach((word, i) => {
      test(`"${word}".toUpperCase() = "${word.toUpperCase()}"`, () => {
        expect(word.toUpperCase()).toBe(word.toUpperCase());
      });
    });
  });

  // includes テスト 25件
  describe("includes", () => {
    for (let i = 1; i <= 25; i++) {
      const str = `test string ${i}`;
      test(`"${str}" includes "${i}"`, () => {
        expect(str.includes(String(i))).toBe(true);
      });
    }
  });

  // split テスト 25件
  describe("split", () => {
    for (let i = 1; i <= 25; i++) {
      const str = Array(i).fill("word").join("-");
      test(`split "${str}" by "-" has ${i} parts`, () => {
        expect(str.split("-").length).toBe(i);
      });
    }
  });

  // repeat テスト 25件
  describe("repeat", () => {
    for (let i = 1; i <= 25; i++) {
      test(`"x".repeat(${i}) has length ${i}`, () => {
        expect("x".repeat(i).length).toBe(i);
      });
    }
  });
});
