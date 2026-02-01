# Task: Baby World Sim MVP開発

## Overview

胎児〜4歳（0〜208週）の感覚発達シミュレーターのMVP実装。
週単位のタイムラインで視覚・聴覚・言語発達を可視化するWebアプリ。

## ⚠️ CRITICAL: 毎iteration必須事項

**全てのHatは作業完了後、イベント発行前に必ず実行:**

1. `.agent/iteration.log` に記録を追記
   ```
   [{ISO8601}] iteration #{n} | {Hat名} | {状態} | {概要}
   ```

2. Git commit & push
   ```bash
   git add -A
   git commit -m "[Ralph] {Hat名}: {完了内容}"
   git push origin main
   ```

## ⚠️ LOOP_COMPLETE時の追加処理

LOOP_COMPLETEを発行する前に:
1. `COMPLETION_REPORT.md` を生成
2. 最終 git push

## 技術スタック

- **フレームワーク**: React 18 + TypeScript
- **ビルド**: Vite
- **スタイル**: CSS (global.css)
- **音声**: Web Audio API
- **グラフ**: 検討中（Chart.js or Recharts）

## MVP要件

### 1. タイムラインUI
- [x] 週スライダー（0〜208週）- 基本実装済み
- [ ] 月/年表示の切り替え
- [ ] 現在週のマイルストーン表示

### 2. 視覚シミュレーション
- [ ] 年齢に応じたぼかしフィルタ
- [ ] 彩度・コントラスト調整
- [ ] サンプルシーン画像

### 3. 聴覚シミュレーション
- [ ] Web Audio APIでの音声合成
- [ ] 定位誤差の年齢変化
- [ ] 周波数感度の変化

### 4. 言語・概念パネル
- [ ] マイルストーンカード表示
- [ ] 出典・根拠レベルの明示
- [ ] 週ごとのフィルタリング

### 5. 非再現感覚パネル
- [ ] 触覚/嗅覚/味覚の説明テキスト
- [ ] 発達曲線グラフ

## データ構造

### milestones.sample.json
```json
{
  "id": "string",
  "week": "number (0-208)",
  "domain": "vision | hearing | language | motor | ...",
  "title": "string",
  "description": "string",
  "source": "string (URL)",
  "sourceLevel": "official | medical | peer-reviewed | overview"
}
```

### curves.sample.json
```json
{
  "id": "string",
  "domain": "string",
  "points": [{ "week": "number", "value": "number" }]
}
```

## Hat Roles

### Git Setup
- Git/GitHub初期化、既存リポジトリの確認
- 完了後: ログ記録 → git push → git.ready

### Planner
- PROMPT.mdとdocs/を読み、タスクを分解
- specs/plan.md にタスク一覧を出力
- 完了後: ログ記録 → git push → plan.ready

### Builder
- React/TypeScriptでフロントエンド実装
- 既存コードスタイルに従う
- 完了後: ログ記録 → git push → build.done

### Reviewer
- コードレビュー、ビルド確認
- 問題あり → review.changes_requested
- 全完了 → COMPLETION_REPORT.md生成 → LOOP_COMPLETE

## Success Criteria

- [ ] npm run build が成功する
- [ ] 週スライダーで0〜208週を操作できる
- [ ] 少なくとも1つのシミュレーションパネルが動作する
- [ ] マイルストーンが週に応じて表示される
- [ ] 全変更がremoteにpush済み
- [ ] .agent/iteration.log が最新
- [ ] COMPLETION_REPORT.md が生成済み
- [ ] LOOP_COMPLETE

## 参考ドキュメント

- `docs/OVERVIEW.md` - 企画概要
- `docs/TECHNICAL_DESIGN.md` - 技術設計書
- `docs/ROADMAP.md` - 実装ロードマップ
- `docs/RESEARCH_INITIAL.md` - 初期リサーチ（0〜48ヶ月）
- `docs/REFERENCES.md` - 参考文献一覧
