// ファイルI/O ベンチマーク（Bun版）

const start = performance.now();

// 1. 大きなデータ生成
const data = "Hello Bun!\n".repeat(100_000);

// 2. ファイル書き込み
await Bun.write("test-output.txt", data);

// 3. ファイル読み込み
const content = await Bun.file("test-output.txt").text();

// 4. 行数カウント
const lines = content.split("\n").length;

const end = performance.now();

console.log(`処理時間: ${(end - start).toFixed(2)}ms`);
console.log(`書き込み: ${data.length} bytes`);
console.log(`読み込み: ${content.length} bytes`);
console.log(`行数: ${lines}`);
