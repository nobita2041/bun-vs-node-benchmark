// テスト用モジュール生成スクリプト
import { writeFileSync, mkdirSync } from "fs";

const MODULE_COUNT = 100;

// src ディレクトリ作成
try { mkdirSync("src", { recursive: true }); } catch {}

// ユーティリティモジュールを生成
for (let i = 0; i < MODULE_COUNT; i++) {
  const code = `
// module${i}.ts
export const value${i} = ${i};
export function calc${i}(x) {
  return x * ${i} + ${Math.random().toFixed(4)};
}
export const array${i} = Array.from({ length: ${i + 1} }, (_, j) => j * ${i});
export class Module${i} {
  constructor() {
    this.id = ${i};
    this.name = "module${i}";
  }
  process(data) {
    return data.map(x => x + this.id);
  }
}
`;
  writeFileSync(`src/module${i}.ts`, code.trim());
}

// エントリーポイント生成
const imports = Array.from({ length: MODULE_COUNT }, (_, i) =>
  `import { value${i}, calc${i}, Module${i} } from "./module${i}";`
).join("\n");

const usage = Array.from({ length: MODULE_COUNT }, (_, i) =>
  `sum += value${i} + calc${i}(${i});`
).join("\n  ");

const instances = Array.from({ length: MODULE_COUNT }, (_, i) =>
  `new Module${i}()`
).join(", ");

const entryCode = `
${imports}

let sum = 0;
${usage}

const modules = [${instances}];

console.log("Sum:", sum);
console.log("Modules:", modules.length);
`;

writeFileSync("src/index.ts", entryCode.trim());

console.log(`Generated ${MODULE_COUNT} modules + 1 entry point`);
