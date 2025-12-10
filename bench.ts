// ランタイム ベンチマーク（Bun/Node 両対応）

const start = performance.now();

// 1. 配列処理（100万件）
const arr = Array.from({ length: 1_000_000 }, (_, i) => i);
const sum = arr.reduce((a, b) => a + b, 0);

// 2. 文字列処理
const str = "hello".repeat(100_000);
const upper = str.toUpperCase();

// 3. JSON処理
const obj = { data: arr.slice(0, 10_000) };
const json = JSON.stringify(obj);
const parsed = JSON.parse(json);

const end = performance.now();

console.log(`処理時間: ${(end - start).toFixed(2)}ms`);
console.log(`配列合計: ${sum}`);
console.log(`文字列長: ${upper.length}`);
console.log(`JSON要素: ${parsed.data.length}`);
