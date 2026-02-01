#!/usr/bin/env node
/**
 * context_pack.mjs
 * AIに渡すための“必要ファイルだけ”を1つのフォルダに集める簡易スクリプト。
 *
 * 使い方:
 *   node scripts/context_pack.mjs --out ./.context --include src/App.tsx src/features/simulation/VisualSimCanvas.tsx
 *
 * NOTE:
 * - 現状は最小実装。将来は tree/diff 生成やサイズ制限を追加する。
 */
import fs from "node:fs";
import path from "node:path";

function parseArgs(argv) {
  const args = { out: ".context", include: [] };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--out") args.out = argv[++i];
    else if (a === "--include") {
      while (argv[i + 1] && !argv[i + 1].startsWith("--")) args.include.push(argv[++i]);
    }
  }
  return args;
}

const args = parseArgs(process.argv);
if (args.include.length === 0) {
  console.error("No --include files specified. Example:\n  node scripts/context_pack.mjs --include README.md docs/TECHNICAL_DESIGN.md src/App.tsx");
  process.exit(1);
}

fs.rmSync(args.out, { recursive: true, force: true });
fs.mkdirSync(args.out, { recursive: true });

const root = process.cwd();

for (const rel of args.include) {
  const src = path.join(root, rel);
  if (!fs.existsSync(src)) {
    console.warn("Skip (not found):", rel);
    continue;
  }
  const dest = path.join(args.out, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

const meta = {
  createdAt: new Date().toISOString(),
  include: args.include,
};
fs.writeFileSync(path.join(args.out, "context_pack.meta.json"), JSON.stringify(meta, null, 2));

console.log("Packed context into:", args.out);
