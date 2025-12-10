# Bun vs Node.js ランタイム性能比較

## 前提条件

### 実行環境

| 項目 | 値 |
|------|-----|
| マシン | MacBook Air (Apple M3) |
| CPU | 8コア (4P + 4E) |
| メモリ | 24GB |
| OS | macOS (Darwin 25.1.0) |

### ランタイムバージョン

| ランタイム | バージョン |
|-----------|-----------|
| Bun | 1.3.3 |
| Node.js | 22.x (npm 10.9.2) |

### 比較方法

- **同一のコード**をBunとNode.jsで実行
- Node.js互換API（`node:fs/promises`）を使用
- `time`コマンドで実行時間を計測

---

## テスト1: 逐次ファイル処理

### 実行コード

```javascript
// bench-heavy.mjs
import { writeFile, readFile, rm, mkdir } from "fs/promises";

const DIR = "bench-files";
const FILE_COUNT = 500;
const FILE_SIZE = 100_000; // 各ファイル100KB

// 50MBのデータを逐次処理
for (let i = 0; i < FILE_COUNT; i++) {
  await writeFile(`${DIR}/file-${i}.txt`, data);
}
for (let i = 0; i < FILE_COUNT; i++) {
  const content = await readFile(`${DIR}/file-${i}.txt`, "utf-8");
}
for (let i = 0; i < FILE_COUNT; i++) {
  const content = await readFile(`${DIR}/file-${i}.txt`, "utf-8");
  await writeFile(`${DIR}/file-${i}-processed.txt`, content.toUpperCase());
}
```

### 実行コマンド

```bash
time bun bench-heavy.mjs
time node bench-heavy.mjs
```

### 結果

| 項目 | Bun | Node.js |
|------|-----|---------|
| 書き込み (500ファイル) | 120ms | 105ms |
| 読み込み | 22ms | 38ms |
| 加工 (読み→書き) | 141ms | 135ms |
| **総処理時間** | **284ms** | **279ms** |

**結論**: 逐次処理ではほぼ互角

---

## テスト2: 並列ファイル処理

### 実行コード

```javascript
// bench-parallel.mjs
import { writeFile, readFile, rm, mkdir } from "fs/promises";

const DIR = "bench-parallel";
const FILE_COUNT = 1000;
const FILE_SIZE = 50_000; // 各ファイル50KB

// 50MBのデータを並列処理（Promise.all）
await Promise.all(
  Array.from({ length: FILE_COUNT }, (_, i) =>
    writeFile(`${DIR}/file-${i}.txt`, data)
  )
);

const contents = await Promise.all(
  Array.from({ length: FILE_COUNT }, (_, i) =>
    readFile(`${DIR}/file-${i}.txt`, "utf-8")
  )
);

await Promise.all(
  Array.from({ length: FILE_COUNT }, async (_, i) => {
    const content = await readFile(`${DIR}/file-${i}.txt`, "utf-8");
    await writeFile(`${DIR}/file-${i}-out.txt`, content.toUpperCase());
  })
);
```

### 実行コマンド

```bash
time bun bench-parallel.mjs
time node bench-parallel.mjs
```

### 結果

| 項目 | Bun | Node.js | 比較 |
|------|-----|---------|------|
| 並列書き込み | 39ms | 99ms | **Bun 2.5倍速** |
| 並列読み込み | 13ms | 41ms | **Bun 3.2倍速** |
| 並列加工 | 57ms | 107ms | **Bun 1.9倍速** |
| **総処理時間** | **110ms** | **248ms** | **Bun 2.3倍速** |

**結論**: 並列処理ではBunが圧倒的に高速

---

## まとめ

### Bunが速いケース

- **並列I/O処理**（Promise.all）
- 大量ファイルの同時読み書き
- 非同期処理の並行実行

### 差が出にくいケース

- 逐次処理（forループ + await）
- 純粋なCPU計算
- 単発のファイル読み書き

### ポイント

1. **Node.js互換APIがそのまま動く**
   - コード変更なしでBunに移行可能
   - `node:fs/promises`などがそのまま使える

2. **Bunの最適化**
   - Node.js互換APIを内部で高度に最適化
   - Bun専用APIより速いケースもある

3. **実用的な結論**
   - 並列I/Oが多いアプリケーションでBunの恩恵大
   - 既存Node.jsプロジェクトの移行は低コスト
