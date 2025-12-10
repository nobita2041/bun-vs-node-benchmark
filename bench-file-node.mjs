// ファイルI/O ベンチマーク（Node版）

import { writeFile, readFile } from "fs/promises";

const start = performance.now();

// 1. 大きなデータ生成
const data = "Hello Node!\n".repeat(100_000);

// 2. ファイル書き込み
await writeFile("test-output.txt", data);

// 3. ファイル読み込み
const content = await readFile("test-output.txt", "utf-8");

// 4. 行数カウント
const lines = content.split("\n").length;

const end = performance.now();

console.log(`処理時間: ${(end - start).toFixed(2)}ms`);
console.log(`書き込み: ${data.length} bytes`);
console.log(`読み込み: ${content.length} bytes`);
console.log(`行数: ${lines}`);
