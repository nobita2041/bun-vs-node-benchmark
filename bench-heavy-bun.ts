// 重いファイルI/O ベンチマーク（Bun版）

import { rmdir, mkdir } from "fs/promises";

const DIR = "bench-files";
const FILE_COUNT = 500;
const FILE_SIZE = 100_000; // 各ファイル100KB

console.log("=== Bun Heavy Benchmark ===");
console.log(`${FILE_COUNT}ファイル × ${FILE_SIZE / 1000}KB = ${(FILE_COUNT * FILE_SIZE) / 1_000_000}MB\n`);

// クリーンアップ
try { await rmdir(DIR, { recursive: true }); } catch {}
await mkdir(DIR);

const start = performance.now();

// 1. 大量ファイル書き込み
console.log("書き込み中...");
const writeStart = performance.now();
const data = "x".repeat(FILE_SIZE);
for (let i = 0; i < FILE_COUNT; i++) {
  await Bun.write(`${DIR}/file-${i}.txt`, data);
}
const writeEnd = performance.now();
console.log(`書き込み完了: ${(writeEnd - writeStart).toFixed(0)}ms`);

// 2. 大量ファイル読み込み
console.log("読み込み中...");
const readStart = performance.now();
let totalBytes = 0;
for (let i = 0; i < FILE_COUNT; i++) {
  const content = await Bun.file(`${DIR}/file-${i}.txt`).text();
  totalBytes += content.length;
}
const readEnd = performance.now();
console.log(`読み込み完了: ${(readEnd - readStart).toFixed(0)}ms`);

// 3. 読み込み + 加工 + 書き込み
console.log("加工中...");
const processStart = performance.now();
for (let i = 0; i < FILE_COUNT; i++) {
  const content = await Bun.file(`${DIR}/file-${i}.txt`).text();
  const processed = content.toUpperCase();
  await Bun.write(`${DIR}/file-${i}-processed.txt`, processed);
}
const processEnd = performance.now();
console.log(`加工完了: ${(processEnd - processStart).toFixed(0)}ms`);

const end = performance.now();

console.log("\n=== 結果 ===");
console.log(`総処理時間: ${(end - start).toFixed(0)}ms`);
console.log(`総データ量: ${totalBytes / 1_000_000}MB`);

// クリーンアップ
await rmdir(DIR, { recursive: true });
