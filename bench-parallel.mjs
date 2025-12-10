// 並列ファイル処理ベンチマーク（Bun/Node 共通）

import { writeFile, readFile, rm, mkdir } from "fs/promises";

const DIR = "bench-parallel";
const FILE_COUNT = 1000;
const FILE_SIZE = 50_000; // 各ファイル50KB

console.log("=== 並列処理 Benchmark ===");
console.log(`${FILE_COUNT}ファイル × ${FILE_SIZE / 1000}KB = ${(FILE_COUNT * FILE_SIZE) / 1_000_000}MB\n`);

// クリーンアップ
try { await rm(DIR, { recursive: true }); } catch {}
await mkdir(DIR);

const start = performance.now();

// 1. 並列書き込み
console.log("並列書き込み中...");
const writeStart = performance.now();
const data = "x".repeat(FILE_SIZE);
await Promise.all(
  Array.from({ length: FILE_COUNT }, (_, i) =>
    writeFile(`${DIR}/file-${i}.txt`, data)
  )
);
const writeEnd = performance.now();
console.log(`書き込み完了: ${(writeEnd - writeStart).toFixed(0)}ms`);

// 2. 並列読み込み
console.log("並列読み込み中...");
const readStart = performance.now();
const contents = await Promise.all(
  Array.from({ length: FILE_COUNT }, (_, i) =>
    readFile(`${DIR}/file-${i}.txt`, "utf-8")
  )
);
const totalBytes = contents.reduce((sum, c) => sum + c.length, 0);
const readEnd = performance.now();
console.log(`読み込み完了: ${(readEnd - readStart).toFixed(0)}ms`);

// 3. 並列加工（読み込み→変換→書き込み）
console.log("並列加工中...");
const processStart = performance.now();
await Promise.all(
  Array.from({ length: FILE_COUNT }, async (_, i) => {
    const content = await readFile(`${DIR}/file-${i}.txt`, "utf-8");
    const processed = content.toUpperCase();
    await writeFile(`${DIR}/file-${i}-out.txt`, processed);
  })
);
const processEnd = performance.now();
console.log(`加工完了: ${(processEnd - processStart).toFixed(0)}ms`);

const end = performance.now();

console.log("\n=== 結果 ===");
console.log(`総処理時間: ${(end - start).toFixed(0)}ms`);
console.log(`総データ量: ${totalBytes / 1_000_000}MB`);

// クリーンアップ
await rm(DIR, { recursive: true });
